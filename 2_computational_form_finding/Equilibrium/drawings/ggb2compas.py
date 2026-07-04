"""
Runtime support for GeoGebra -> COMPAS conversions of the eQUILIBRIUM drawings
(https://block.arch.ethz.ch/eq). Shared by all drawings/view_N/view_N_compas.py scripts,
which then only contain their own construction logic.

Two parts:

1. GeoGebra semantics that COMPAS does not provide (pure math, no Qt):
   - ccw angles in [0, 2pi) as GeoGebra's Angle[] defines them
   - the dynamic-color triangle-wave mapping from GeoGebra's GeoElement.getRGBFromList
     (blue = compression, red = tension in the eq drawings)
   - point builders for handle disks, internal-force rectangles, vector arrows and
     dashed circles
   Everything else (reflections, intersections, vector algebra) is used directly from
   compas.geometry in the drawing scripts.

2. ``Drawing2D``: an interactive 2D drawing wrapper around ``compas_viewer`` that hides
   all Qt/OpenGL details:
   - orthographic top view, white background, no grid
   - add_/set_ methods for segments, (convex) polygons, dashes and text tags,
     with fast constant-topology buffer updates (no earclip re-triangulation)
   - side-dock sliders, checkboxes and buttons bound to a plain state dict
   - GeoGebra-style dragging of control points (``enable_drag``)
   - ``run()`` with an optional ``--screenshot`` mode for automated visual checks
"""

import math
import sys

import numpy as np

from compas.colors import Color
from compas.datastructures import Graph
from compas.geometry import Line, Point, Polygon, Polyline, Vector, angle_vectors_signed

TWO_PI = 2.0 * math.pi
Z_AXIS = Vector(0.0, 0.0, 1.0)

# ============================================================================
# GeoGebra semantics
# ============================================================================


def ggb_angle(u, v):
    """GeoGebra Angle[line1, line2]: ccw angle from direction u to direction v, in [0, 2pi)."""
    return angle_vectors_signed(u, v, Z_AXIS) % TWO_PI


def ggb_component(value):
    """GeoGebra dynamic-color mapping (GeoElement.getRGBFromList): triangle wave, period 2."""
    t = value / 2.0 - math.floor(value / 2.0)
    return 2.0 * (1.0 - t) if t > 0.5 else 2.0 * t


def ggb_color(w):
    """Dynamic color (w - pi, 0, w): blue for compression (w=pi), red for tension (w=0)."""
    return Color(ggb_component(w - math.pi), 0.0, ggb_component(w))


def disk_points(center, radius, z, count=24):
    """Corner points of a disk-shaped point handle (n-gon)."""
    ngon = Polygon.from_sides_and_radius_xy(count, radius)
    return [Point(p.x + center[0], p.y + center[1], z) for p in ngon.points]


def rect_points(node, end, halfwidth, z):
    """Rectangle of the internalForce macro: along the bar node->end, given half-width."""
    offset = Z_AXIS.cross(end - node)
    offset.unitize()
    offset *= max(halfwidth, 1e-4)
    return [Point(p.x, p.y, z) for p in
            (node - offset, node + offset, end + offset, end - offset)]


def arrow_parts(tail, tip, z, head_len=1.7, head_w=0.65):
    """GeoGebra vector: shaft (two points) + solid triangular head (three points)."""
    direction = tip - tail
    length = direction.length
    u = direction.unitized() if length > 1e-12 else Vector(1.0, 0.0, 0.0)
    base = tip - u * min(head_len, 0.5 * length + 1e-4)
    offset = Z_AXIS.cross(u) * head_w
    shaft = (Point(tail.x, tail.y, z), Point(base.x, base.y, z))
    head = [Point(tip.x, tip.y, z),
            Point(*(base + offset)[:2], z),
            Point(*(base - offset)[:2], z)]
    return shaft, head


def dash_circle_nodes(center, radius, z, count=60):
    """Endpoints of the dashes of a dashed circle (count dashes, 50% duty cycle)."""
    coords = []
    for i in range(count):
        for a in (TWO_PI * i / count, TWO_PI * (i + 0.5) / count):
            coords.append((center[0] + radius * math.cos(a),
                           center[1] + radius * math.sin(a), z))
    return coords


# ============================================================================
# interactive 2D drawing (all Qt / compas_viewer code lives below)
# ============================================================================


class Drawing2D:
    """A GeoGebra-like interactive 2D drawing in compas_viewer.

    Parameters
    ----------
    center : point
        World point at the center of the view.
    half_width : float
        Half of the visible world width (orthographic zoom).
    window : (int, int), optional
        Window size in pixels.
    """

    def __init__(self, center, half_width, window=(1500, 850)):
        from compas_viewer import Viewer
        from compas_viewer.config import Config

        config = Config()
        config.window.width, config.window.height = window
        config.renderer.show_grid = False
        config.renderer.view = "top"
        config.renderer.backgroundcolor = Color(1.0, 1.0, 1.0)
        config.camera.position = [center[0], center[1], half_width]
        config.camera.target = [center[0], center[1], 0.0]
        config.ui.sidebar.show = False
        config.ui.sidedock.show = True

        self.viewer = Viewer(config=config)

        # straight top-down 2D camera (orthographic in "top" view)
        camera = self.viewer.renderer.camera
        camera.reset_position("top")
        camera.distance = half_width
        camera.target.set(center[0], center[1], 0.0)

        self.objects = {}
        self.tags = {}
        self._dirty = []
        self._drag = None

    # ------------------------------------------------------------------
    # building the scene
    # ------------------------------------------------------------------

    @staticmethod
    def _fan_faces(obj):
        """Constant fan triangulation for convex polygons.

        PolygonObject re-runs compas' earclip on every buffer update (~10 ms per polygon);
        a fan over the unchanged topology makes updates ~instant.
        """

        def faces(reverse):
            def read():
                pts = obj.geometry.points
                tris = [[0, i, i + 1] for i in range(1, len(pts) - 1)]
                if reverse:
                    tris = [t[::-1] for t in tris]
                return pts, [obj.facecolor] * len(pts), tris

            return read

        obj._read_frontfaces_data = faces(False)
        obj._read_backfaces_data = faces(True)
        return obj

    def add_segment(self, name, p0, p1, color, width=2, z=0.0, show=True):
        line = Line(Point(p0[0], p0[1], z), Point(p1[0], p1[1], z))
        self.objects[name] = self.viewer.scene.add(
            line, name=name, linecolor=color, linewidth=width, show_points=False, show=show)

    def add_polyline(self, name, points, color, width=2, z=0.0):
        pline = Polyline([Point(p[0], p[1], z) for p in points])
        self.objects[name] = self.viewer.scene.add(
            pline, name=name, linecolor=color, linewidth=width, show_points=False)

    def add_polygon(self, name, points, facecolor, linecolor=None, linewidth=1.2,
                    opacity=1.0, show=True):
        """Filled CONVEX polygon (fan-triangulated); outline drawn if linecolor is given."""
        poly = Polygon(list(points))
        self.objects[name] = self._fan_faces(self.viewer.scene.add(
            poly, name=name, facecolor=facecolor, linecolor=linecolor or facecolor,
            linewidth=linewidth, opacity=opacity, show_lines=linecolor is not None,
            show_points=False, show=show))

    def add_dashes(self, name, coords, color, width=1.5):
        """Disconnected dash segments (pairs of coords) as a Graph: one edge per dash."""
        graph = Graph()
        for i, xyz in enumerate(coords):
            graph.add_node(i, x=xyz[0], y=xyz[1], z=xyz[2])
        for i in range(0, len(coords), 2):
            graph.add_edge(i, i + 1)
        self.objects[name] = self.viewer.scene.add(
            graph, name=name, linecolor=color, linewidth=width, show_points=False)

    def add_tag(self, name, text, pos, height=15, align="left", z=0.2):
        from compas_viewer.scene import Tag

        tag = Tag(text, Point(pos[0], pos[1], z), color=Color(0.0, 0.0, 0.0), height=height,
                  horizontal_align=align, vertical_align="center")
        self.tags[name] = tag
        self.viewer.scene.add(tag, name="tag_" + name)

    # ------------------------------------------------------------------
    # dynamic updates (call flush() once per change)
    # ------------------------------------------------------------------

    def set_segment(self, name, p0, p1, color=None):
        obj = self.objects[name]
        z = obj.geometry.start.z
        obj.geometry.start = Point(p0[0], p0[1], z)
        obj.geometry.end = Point(p1[0], p1[1], z)
        if color is not None:
            obj.linecolor = color
        self._dirty.append(obj)

    def set_polygon(self, name, points, facecolor=None):
        obj = self.objects[name]
        obj.geometry.points = list(points)
        if facecolor is not None:
            obj.surfacecolor = facecolor
        self._dirty.append(obj)

    def set_dashes(self, name, coords):
        obj = self.objects[name]
        for i, xyz in enumerate(coords):
            obj.graph.node_attributes(i, "xyz", list(xyz))
        self._dirty.append(obj)

    def set_tag(self, name, pos):
        tag = self.tags[name]  # position is a shader uniform: no buffer update needed
        tag.position = Point(pos[0], pos[1], tag.position.z)

    def set_visible(self, name, visible):
        self.objects[name].show = visible

    def flush(self):
        """Upload all changed geometry to the GPU and repaint."""
        for obj in self._dirty:
            obj.update(update_data=True)
        self._dirty.clear()
        self.viewer.renderer.update()

    # ------------------------------------------------------------------
    # side panel widgets (bound to a plain dict)
    # ------------------------------------------------------------------

    def add_button(self, title, action):
        from compas_viewer.components import Button

        self.viewer.ui.sidedock.add(Button(text=title, action=action))

    def add_slider(self, state, key, title, min_val, max_val, step, action):
        from compas_viewer.components import Slider

        self.viewer.ui.sidedock.add(Slider(state, key, title=title, min_val=min_val,
                                           max_val=max_val, step=step, action=action))

    def add_toggle(self, state, key, title, action):
        # BooleanToggle is not exported in compas_viewer.components.__init__
        from compas_viewer.components.booleantoggle import BooleanToggle

        self.viewer.ui.sidedock.add(BooleanToggle(state, key, title=title, action=action))

    # ------------------------------------------------------------------
    # GeoGebra-style dragging of control points
    # ------------------------------------------------------------------

    def enable_drag(self, hit, on_drag):
        """Make points draggable.

        Parameters
        ----------
        hit : callable
            ``hit(wx, wy, tolerance) -> key or None``: which control point is at
            world position (wx, wy).
        on_drag : callable
            ``on_drag(key, wx, wy)``: update the construction state and redraw.
        """
        self._drag = _make_drag_controller()(self.viewer.renderer, hit, on_drag)

    # ------------------------------------------------------------------
    # main loop
    # ------------------------------------------------------------------

    def run(self, screenshot_mutate=None):
        """Show the viewer. With ``--screenshot out.png`` on the command line, save the
        canvas and exit; ``screenshot_mutate`` (optional) is called to change the state
        for a second ``*_changed.png`` capture (exercises the dynamic-update path)."""
        if "--screenshot" in sys.argv:
            idx = sys.argv.index("--screenshot")
            path = sys.argv[idx + 1] if len(sys.argv) > idx + 1 else "drawing.png"
            from PySide6.QtCore import QTimer

            def grab_default():
                self.viewer.renderer.grabFramebuffer().save(path)
                if screenshot_mutate is None:
                    self.viewer.app.quit()
                    return
                screenshot_mutate()
                QTimer.singleShot(500, grab_changed)

            def grab_changed():
                self.viewer.renderer.grabFramebuffer().save(path.replace(".png", "_changed.png"))
                self.viewer.app.quit()

            QTimer.singleShot(1500, grab_default)

        self.viewer.show()


def _screen_to_world_xy(renderer, x, y):
    """Unproject a screen pixel to the z=0 world plane (works with pan/zoom)."""
    w, h = max(renderer.width(), 1), max(renderer.height(), 1)
    P = np.array(renderer.camera.projection(w, h), dtype=float)
    V = np.array(renderer.camera.viewworld(), dtype=float)
    M = np.linalg.inv(P @ V)
    ndc = [2.0 * x / w - 1.0, 1.0 - 2.0 * y / h]

    def unproject(zn):
        v = M @ np.array([ndc[0], ndc[1], zn, 1.0])
        return v[:3] / v[3]

    p0, p1 = unproject(-1.0), unproject(1.0)
    direction = p1 - p0
    if abs(direction[2]) < 1e-12:
        return p0[0], p0[1]
    t = -p0[2] / direction[2]
    hit = p0 + t * direction
    return hit[0], hit[1]


def _make_drag_controller():
    from PySide6.QtCore import QEvent, QObject, Qt

    class DragController(QObject):
        """Event filter on the render widget: consumes left-drag on control points
        (so the camera/selection never sees it) and shows a hand cursor on hover."""

        def __init__(self, renderer, hit, on_drag):
            super().__init__()
            self.renderer = renderer
            self.hit = hit
            self.on_drag = on_drag
            self.dragging = None
            renderer.setMouseTracking(True)
            renderer.installEventFilter(self)

        def _world(self, event):
            pos = event.position()
            return _screen_to_world_xy(self.renderer, pos.x(), pos.y())

        def _tolerance(self):
            return 12.0 * 2.0 * self.renderer.camera.distance / max(self.renderer.width(), 1)

        def eventFilter(self, _watched, event):
            etype = event.type()
            if etype == QEvent.Type.MouseButtonPress and event.button() == Qt.MouseButton.LeftButton:
                wx, wy = self._world(event)
                key = self.hit(wx, wy, self._tolerance())
                if key:
                    self.dragging = key
                    return True
            elif etype == QEvent.Type.MouseMove:
                wx, wy = self._world(event)
                if self.dragging:
                    self.on_drag(self.dragging, wx, wy)
                    return True
                hovering = self.hit(wx, wy, self._tolerance())
                cursor = Qt.CursorShape.OpenHandCursor if hovering else Qt.CursorShape.ArrowCursor
                self.renderer.setCursor(cursor)
            elif etype == QEvent.Type.MouseButtonRelease and self.dragging:
                self.dragging = None
                return True
            return False

    return DragController
