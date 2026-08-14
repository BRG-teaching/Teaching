"""
eqdraw_ops
==========

The eQUILIBRIUM teaching drawings as data.

Every view of the step-by-step web viewer
(https://brg-teaching.github.io/Teaching/2_computational_form_finding/Equilibrium/drawings/web/gallery.html)
is stored in ``ops/view_N.json`` as an ordered series of drawing
operations — geometry, color, stroke width and the construction step at
which each element appears — written with :func:`compas.json_dump`.
This module provides the two classes those files deserialize into, so a
drawing is recreated with nothing but::

    >>> import compas
    >>> drawing = compas.json_load("ops/view_8.json")
    >>> drawing.title
    'Drawing 8 — Funicular For Vertical Forces'
    >>> for op in drawing.ops:
    ...     print(op.step, op.kind, op.geometry, op.color, op.width)

The database is generated from the running web views themselves
(``web/tools/export_ops.py``), so it cannot drift from the site.
Geometry is baked at each view's default parameter state, in drawing
units in the XY plane.  The web viewer's interactive machinery (node
inspector, ghost previews, hover) is not part of the recipe.
"""

from compas.colors import Color
from compas.data import Data
from compas.geometry import Circle
from compas.geometry import Frame
from compas.geometry import Line
from compas.geometry import Point
from compas.geometry import Polygon
from compas.geometry import Polyline

__all__ = ["Op", "Drawing", "PALETTE"]

#: The house palette of the drawings (hex), sampled in the 2026-08 restyle.
PALETTE = {
    "compression": "#1a1eb2",
    "tension": "#ce4095",
    "load": "#3f9c20",
    "guide": "#aaaaaa",
    "zero": "#b9b9bd",
    "current": "#111111",
}


class Op(Data):
    """A single drawing operation: one geometry with its style, appearing
    at a construction step.

    Parameters
    ----------
    kind : str
        One of ``"segment"``, ``"arrow"``, ``"polyline"``, ``"circle"``,
        ``"polygon"``, ``"point"``, ``"label"``, ``"image"``.
    geometry : :class:`compas.data.Data`
        The geometry of the operation: a :class:`compas.geometry.Line`
        (segments and arrows, start = tail), :class:`Polyline`,
        :class:`Circle`, :class:`Polygon` (filled outlines and image
        rectangles) or :class:`Point` (points and label anchors).
    step : int
        The construction step at which the element appears.
    until : int, optional
        The step at which the original applet retires it (trial
        apparatus); ``None`` means it stays to the end.
    color : :class:`compas.colors.Color`, optional
        The element's resolved final color.
    width : float, optional
        Stroke width in drawing units; ``0.0`` means hairline.
        For ``"point"`` operations this is the marker radius.
    dash : float, optional
        Dash length in drawing units for dashed strokes; ``None`` = solid.
    opacity : float, optional
        Fill opacity of polygons and images.
    text : str, optional
        The text of a label.
    style : str, optional
        Label style tag of the web viewer (``"point"``, ``"num"``,
        ``"title"``).
    head : [float, float], optional
        Arrowhead [length, width] in drawing units.
    url : str, optional
        Source path of an embedded image, relative to ``web/``.
    name : str, optional
        The element's name in the web view (stable identifier).

    """

    def __init__(self, kind, geometry=None, step=0, until=None, color=None,
                 width=0.0, dash=None, opacity=1.0, text=None, style=None,
                 head=None, url=None, name=None):
        super().__init__(name=name)
        self.kind = kind
        self.geometry = geometry
        self.step = step
        self.until = until
        self.color = color
        self.width = width
        self.dash = dash
        self.opacity = opacity
        self.text = text
        self.style = style
        self.head = head
        self.url = url

    @property
    def __data__(self):
        return {
            "kind": self.kind,
            "geometry": self.geometry,
            "step": self.step,
            "until": self.until,
            "color": self.color,
            "width": self.width,
            "dash": self.dash,
            "opacity": self.opacity,
            "text": self.text,
            "style": self.style,
            "head": self.head,
            "url": self.url,
            "name": self.name,
        }

    def __repr__(self):
        return "Op({0!r}, {1!r}, step={2})".format(self.kind, self.name, self.step)


class Drawing(Data):
    """An eQUILIBRIUM drawing: its metadata, the step captions, and the
    ordered series of drawing operations that recreate it.

    Parameters
    ----------
    view : int
        The drawing number (1..54, there is no 30).
    title : str
        The drawing's title.
    about : str
        A short description of the construction.
    frame : [[float, float], [float, float]]
        The drawing extents ``[[xmin, ymin], [xmax, ymax]]``.
    steps : list[dict]
        One ``{"title": str, "caption": str}`` per construction step;
        index 0 is the empty-canvas intro.
    ops : list[:class:`Op`]
        The drawing operations, ordered by construction: reading the
        list top to bottom is the drawing recipe.

    """

    def __init__(self, view=0, title="", about="", frame=None, steps=None,
                 ops=None, name=None):
        super().__init__(name=name)
        self.view = view
        self.title = title
        self.about = about
        self.frame = frame or [[0, 0], [1, 1]]
        self.steps = steps or []
        self.ops = ops or []

    @property
    def __data__(self):
        return {
            "view": self.view,
            "title": self.title,
            "about": self.about,
            "frame": self.frame,
            "steps": self.steps,
            "ops": self.ops,
        }

    def __repr__(self):
        return "Drawing({0}, {1!r}, {2} ops)".format(self.view, self.title, len(self.ops))

    def at_step(self, k):
        """The operations visible at construction step ``k``.

        Parameters
        ----------
        k : int

        Returns
        -------
        list[:class:`Op`]

        """
        return [op for op in self.ops
                if op.step <= k and (op.until is None or k < op.until)]

    @classmethod
    def from_export(cls, raw):
        """Construct a drawing from the web viewer's raw export
        (``window.__exportOps()`` via ``web/tools/export_ops.py``).

        Parameters
        ----------
        raw : dict

        Returns
        -------
        :class:`Drawing`

        """
        def xy(p):
            return Point(p[0], p[1], 0)

        ops = []
        for o in raw["ops"]:
            kind = o["op"]
            if kind in ("segment", "arrow"):
                geometry = Line(xy(o["p"][0]), xy(o["p"][1]))
            elif kind == "polyline":
                geometry = Polyline([xy(p) for p in o["p"]])
            elif kind == "circle":
                geometry = Circle(o["r"], frame=Frame(xy(o["c"]), [1, 0, 0], [0, 1, 0]))
            elif kind == "polygon":
                geometry = Polygon([xy(p) for p in o["p"]])
            elif kind in ("point", "label"):
                geometry = xy(o.get("c") or o.get("at"))
            elif kind == "image":
                bl, br, tl = (xy(p) for p in o["corners"])
                tr = Point(br.x + tl.x - bl.x, br.y + tl.y - bl.y, 0)
                geometry = Polygon([bl, br, tr, tl])
            else:
                raise ValueError("unknown op kind: {0}".format(kind))
            ops.append(Op(
                kind,
                geometry=geometry,
                step=o["step"],
                until=o.get("until"),
                color=Color.from_hex(o["color"]) if "color" in o else None,
                width=o.get("width", o.get("r", 0.0) if kind == "point" else 0.0),
                dash=o.get("dash"),
                opacity=o.get("opacity", 1.0),
                text=o.get("text"),
                style=o.get("cls"),
                head=o.get("head"),
                url=o.get("url"),
                name=o["name"],
            ))
        return cls(view=raw["view"], title=raw["title"], about=raw["about"],
                   frame=raw["frame"], steps=raw["steps"], ops=ops)
