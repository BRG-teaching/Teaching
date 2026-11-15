"""Reconstruct Föppl's spatial three-bar joint and skew force quadrilateral.

Source: August Föppl, The Space Truss (1892), Part I, Chapter 5, §§20–25.
Run this file to validate the geometry and regenerate all figures. Use --interactive
for a compas_viewer window after the figures have been written.
"""

import argparse
from dataclasses import dataclass
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent
TOLERANCE = 1e-9
NAVY = "#2563eb"
PINK = "#dc4b8d"
GREEN = "#2ea043"
AMBER = "#d9822b"
GREY = "#8b95a3"
DARK = "#1f2937"

JOINT_ORIGIN = np.array([0.0, 0.0, 2.0])
JOINT_ANCHORS = {
    "A": np.array([2.0, 1.0, 0.0]),
    "B": np.array([-1.0, -2.0, 0.0]),
    "C": np.array([-2.0, 1.0, 0.0]),
}
JOINT_DIRECTIONS = np.array([JOINT_ANCHORS[key] - JOINT_ORIGIN for key in ("A", "B", "C")])
JOINT_LOAD = np.array([5.0, -1.0, -4.0])


@dataclass
class JointSolution:
    directions: np.ndarray
    load: np.ndarray
    forces: np.ndarray
    intersection: np.ndarray
    resultant_ab: np.ndarray
    resultant_cp: np.ndarray
    polygon: np.ndarray
    determinant: float
    condition: float
    residual: float
    closure_error: float
    parallel_error: float


@dataclass
class GroundTraces:
    origin: np.ndarray
    anchors: dict
    pierce_load: np.ndarray
    trace_intersection: np.ndarray


@dataclass
class TrussSolution:
    nodes: dict
    bars: list
    loads: dict
    effective_load_d: np.ndarray
    local_solutions: dict
    forces: np.ndarray
    global_forces: np.ndarray
    equilibrium_matrix: np.ndarray
    right_hand_side: np.ndarray
    residual: float


def unit(vector):
    vector = np.asarray(vector, dtype=float)
    length = np.linalg.norm(vector)
    if length < TOLERANCE:
        raise ValueError("A zero direction vector is not allowed")
    return vector / length


def directions_unit(directions):
    directions = np.asarray(directions, dtype=float)
    if directions.shape != (3, 3):
        raise ValueError("Exactly three 3D bar directions are required")
    return np.array([unit(direction) for direction in directions])


def solve_spatial_joint(directions=JOINT_DIRECTIONS, load=JOINT_LOAD):
    directions = directions_unit(directions)
    load = np.asarray(load, dtype=float)
    if load.shape != (3,):
        raise ValueError("The external force must be a 3D vector")
    matrix = directions.T
    determinant = float(np.linalg.det(matrix))
    condition = float(np.linalg.cond(matrix))
    if abs(determinant) < 1e-10 or condition > 1e10:
        raise ValueError("The three bars must be non-coplanar and well conditioned")
    if np.linalg.norm(load) < TOLERANCE:
        return JointSolution(
            directions, load, np.zeros(3), np.zeros(3), np.zeros(3), np.zeros(3), np.zeros((5, 3)),
            determinant, condition, 0.0, 0.0, 0.0,
        )
    normal_ab = np.cross(directions[0], directions[1])
    normal_cp = np.cross(directions[2], load)
    if np.linalg.norm(normal_ab) < TOLERANCE or np.linalg.norm(normal_cp) < TOLERANCE:
        raise ValueError("The auxiliary planes require non-parallel bar and load directions")
    intersection = np.cross(normal_ab, normal_cp)
    if np.linalg.norm(intersection) < TOLERANCE:
        raise ValueError("The auxiliary planes do not define a unique intersection line")
    intersection = unit(intersection)
    forces = np.linalg.solve(matrix, -load)
    resultant_ab = forces[0] * directions[0] + forces[1] * directions[1]
    resultant_cp = forces[2] * directions[2] + load
    polygon = np.array([
        np.zeros(3),
        load,
        load + forces[2] * directions[2],
        load + forces[2] * directions[2] + forces[1] * directions[1],
        load + forces[2] * directions[2] + forces[1] * directions[1] + forces[0] * directions[0],
    ])
    residual = float(np.linalg.norm(matrix @ forces + load))
    closure_error = float(np.linalg.norm(resultant_ab + resultant_cp))
    parallel_error = float(max(
        np.linalg.norm(np.cross(intersection, resultant_ab)),
        np.linalg.norm(np.cross(intersection, resultant_cp)),
    ))
    return JointSolution(
        directions, load, forces, intersection, resultant_ab, resultant_cp, polygon,
        determinant, condition, residual, closure_error, parallel_error,
    )


def solve_ground_traces(origin=JOINT_ORIGIN, anchors=None, load=JOINT_LOAD, datum_z=0.0):
    origin = np.asarray(origin, dtype=float)
    anchors = {key: np.asarray(val, dtype=float) for key, val in (anchors or JOINT_ANCHORS).items()}
    load = np.asarray(load, dtype=float)
    if abs(load[2]) < TOLERANCE:
        raise ValueError("Load must intersect the horizontal datum plane")
    scale_p = (datum_z - origin[2]) / load[2]
    pierce_load = origin + scale_p * load
    a2 = anchors["A"][:2]
    b2 = anchors["B"][:2]
    c2 = anchors["C"][:2]
    p2 = pierce_load[:2]
    dir_ab = b2 - a2
    dir_cp = p2 - c2
    denom = dir_ab[0] * dir_cp[1] - dir_ab[1] * dir_cp[0]
    if abs(denom) < TOLERANCE:
        raise ValueError("Ground traces are parallel")
    param = ((c2[0] - a2[0]) * dir_cp[1] - (c2[1] - a2[1]) * dir_cp[0]) / denom
    inter_xy = a2 + param * dir_ab
    trace_intersection = np.array([inter_xy[0], inter_xy[1], float(datum_z)])
    return GroundTraces(origin=origin, anchors=anchors, pierce_load=pierce_load, trace_intersection=trace_intersection)


def independent_nullspace_forces(solution):
    augmented = np.column_stack([solution.directions.T, solution.load])
    _, _, vh = np.linalg.svd(augmented)
    null_vector = vh[-1]
    if abs(null_vector[-1]) < TOLERANCE:
        raise ValueError("The independent nullspace check requires a nonzero external load")
    return null_vector[:3] / null_vector[-1]


def validate_joint(solution, expected=None, traces=None):
    assert solution.residual < TOLERANCE, solution.residual
    assert solution.closure_error < TOLERANCE, solution.closure_error
    assert solution.parallel_error < TOLERANCE, solution.parallel_error
    assert np.allclose(solution.forces, independent_nullspace_forces(solution), atol=TOLERANCE)
    elevation = solution.polygon[:, [0, 2]]
    plan = solution.polygon[:, [0, 1]]
    assert np.array_equal(elevation[:, 0], plan[:, 0])
    if traces is not None:
        ot = unit(traces.trace_intersection - traces.origin)
        assert np.linalg.norm(np.cross(ot, solution.intersection)) < TOLERANCE
    if expected is not None:
        assert np.allclose(solution.forces, expected, atol=TOLERANCE), solution.forces


def zero_force_members(directions, load, tolerance=1e-9):
    directions = np.asarray(directions, dtype=float)
    if directions.shape != (4, 3):
        raise ValueError("The zero-force rule requires three coplanar bars and a fourth bar")
    directions = np.array([unit(direction) for direction in directions])
    load = np.asarray(load, dtype=float)
    zero = []
    for index in range(4):
        others = np.delete(directions, index, axis=0).T
        if np.linalg.matrix_rank(others, tol=tolerance) > 2:
            continue
        if np.linalg.matrix_rank(directions.T, tol=tolerance) < 3:
            continue
        remainder = load - others @ np.linalg.lstsq(others, load, rcond=None)[0]
        if np.linalg.norm(remainder) < tolerance:
            zero.append(index)
    return zero


def solve_simple_truss():
    nodes = {
        "A": np.array([2.0, 1.0, 0.0]),
        "B": np.array([-1.0, -2.0, 0.0]),
        "C": np.array([-2.0, 1.0, 0.0]),
        "D": np.array([0.0, 0.0, 2.0]),
        "E": np.array([2.0, -1.0, 2.0]),
    }
    bars = [
        ("AD", "A", "D"), ("BD", "B", "D"), ("CD", "C", "D"),
        ("AE", "A", "E"), ("BE", "B", "E"), ("DE", "D", "E"),
    ]
    loads = {
        "D": np.array([0.0, 0.0, -4.0]),
        "E": np.array([0.0, 0.0, -6.0]),
    }

    solution_e = solve_spatial_joint(
        [nodes["A"] - nodes["E"], nodes["B"] - nodes["E"], nodes["D"] - nodes["E"]],
        loads["E"],
    )
    direction_de = unit(nodes["E"] - nodes["D"])
    load_d = loads["D"] + solution_e.forces[2] * direction_de
    solution_d = solve_spatial_joint(
        [nodes["A"] - nodes["D"], nodes["B"] - nodes["D"], nodes["C"] - nodes["D"]],
        load_d,
    )
    validate_joint(solution_e)
    validate_joint(solution_d, expected=[-5.0, -4.0, 3.0])

    equilibrium = np.zeros((6, 6))
    right_hand_side = np.zeros(6)
    for row, joint in enumerate(["D", "E"]):
        right_hand_side[3 * row:3 * row + 3] = -loads[joint]
        for column, (_, start, end) in enumerate(bars):
            if joint in (start, end):
                other = end if joint == start else start
                equilibrium[3 * row:3 * row + 3, column] = unit(nodes[other] - nodes[joint])
    global_forces = np.linalg.solve(equilibrium, right_hand_side)
    forces = np.array([
        solution_d.forces[0], solution_d.forces[1], solution_d.forces[2],
        solution_e.forces[0], solution_e.forces[1], solution_e.forces[2],
    ])
    residual = float(np.linalg.norm(equilibrium @ forces - right_hand_side))
    assert residual < TOLERANCE, residual
    assert np.allclose(forces, global_forces, atol=TOLERANCE), (forces, global_forces)
    return TrussSolution(
        nodes, bars, loads, load_d, {"D": solution_d, "E": solution_e},
        forces, global_forces, equilibrium, right_hand_side, residual,
    )


def rgba(hex_color, alpha=1.0):
    from compas.colors import Color

    value = hex_color.lstrip("#")
    return Color(*(int(value[i:i + 2], 16) / 255 for i in (0, 2, 4)), alpha)


def add_line(viewer, start, end, color, width=2.0):
    from compas.geometry import Line, Point

    viewer.scene.add(Line(Point(*start), Point(*end)), linecolor=rgba(color), linewidth=width)


def add_triangle_plane(viewer, p0, p1, p2, color, opacity=0.18):
    from compas.datastructures import Mesh

    mesh = Mesh.from_vertices_and_faces([list(p0), list(p1), list(p2)], [[0, 1, 2]])
    viewer.scene.add(mesh, facecolor=rgba(color), opacity=opacity, show_lines=False)


def make_viewer():
    from compas.colors import Color
    from compas_viewer import Viewer

    viewer = Viewer()
    viewer.config.window.width = 960
    viewer.config.window.height = 900
    viewer.config.ui.menubar.show = False
    viewer.config.ui.statusbar.show = False
    viewer.config.ui.sidebar.show = False
    viewer.config.renderer.show_grid = False
    viewer.config.renderer.show_gridz = False
    viewer.config.renderer.backgroundcolor = Color(1.0, 1.0, 1.0, 1.0)
    return viewer


def initialize_tags(viewer):
    from compas_viewer.scene.tagobject import TagObject

    for scene_object in viewer.scene.objects:
        if isinstance(scene_object, TagObject) and not scene_object._inited:
            scene_object.init()


def capture(viewer, path):
    from PIL import Image

    viewer.ui.init()
    viewer.renderer.resize(960, 900)
    initialize_tags(viewer)
    viewer.renderer.rebuild_buffers()
    viewer.app.processEvents()
    viewer.renderer.update()
    viewer.app.processEvents()
    if not viewer.renderer.grabFramebuffer().save(str(path)):
        raise RuntimeError(f"Could not save compas_viewer image: {path}")
    image = Image.open(path).convert("RGB")
    mask = image.convert("L").point(lambda pixel: 255 if pixel < 248 else 0)
    bounds = mask.getbbox()
    if bounds:
        margin = 35
        crop = (
            max(0, bounds[0] - margin),
            max(0, bounds[1] - margin),
            min(image.width, bounds[2] + margin),
            min(image.height, bounds[3] + margin),
        )
        image = image.crop(crop)
    image.save(path)


def add_spatial_scene(viewer, solution, traces):
    from compas.geometry import Point
    from compas_viewer.scene.tagobject import Tag

    origin = traces.origin
    for label, force in zip(("A", "B", "C"), solution.forces):
        anchor = traces.anchors[label]
        color = NAVY if force < 0 else PINK
        add_line(viewer, origin, anchor, color, 4.0)
        viewer.scene.add(Point(*anchor), pointcolor=rgba(GREY), pointsize=8)
        viewer.scene.add(Tag(label, anchor + np.array([0.0, 0.0, 0.18]), rgba(color), height=24))
    add_line(viewer, origin, traces.pierce_load, GREEN, 4.0)
    viewer.scene.add(Tag("P", (origin + traces.pierce_load) / 2, rgba(GREEN), height=26))
    add_triangle_plane(viewer, origin, traces.anchors["A"], traces.anchors["B"], "#8ea9cf", 0.25)
    add_triangle_plane(viewer, origin, traces.anchors["C"], traces.pierce_load, "#9ad0a8", 0.22)
    add_line(viewer, traces.anchors["A"], traces.anchors["B"], "#5b7fb2", 2.0)
    add_line(viewer, traces.anchors["C"], traces.pierce_load, "#4c9a63", 2.0)
    ot = traces.trace_intersection - origin
    add_line(viewer, origin - 0.35 * ot, traces.trace_intersection + 0.35 * ot, AMBER, 3.0)
    viewer.scene.add(Point(*traces.trace_intersection), pointcolor=rgba(AMBER), pointsize=10)
    viewer.scene.add(Tag("T", traces.trace_intersection + np.array([0.1, 0.1, 0.15]), rgba(AMBER), height=22))
    viewer.scene.add(Point(*origin), pointcolor=rgba(DARK), pointsize=10)
    viewer.scene.add(Tag("O", origin + np.array([0.0, 0.0, 0.22]), rgba(DARK), height=26))

    offset = np.array([4.6, 1.2, 2.8])
    display = 0.45 * solution.polygon
    edge_colors = [GREEN] + [NAVY if force < 0 else PINK for force in solution.forces[::-1]]
    for index, color in enumerate(edge_colors):
        p0 = offset + display[index]
        p1 = offset + display[index + 1]
        add_line(viewer, p0, p1, color, 4.0)
        viewer.scene.add(Tag("PCBA"[index], (p0 + p1) / 2, rgba(color), height=24))
    add_line(viewer, offset + display[0], offset + display[2], AMBER, 2.5)
    for point in display[:-1]:
        viewer.scene.add(Point(*(offset + point)), pointcolor=rgba(DARK), pointsize=7)
    viewer.renderer.view = "ortho"
    viewer.renderer.camera.target = [2.0, 0.2, 1.0]
    viewer.renderer.camera.position = [-6.5, -9.0, 6.5]
    viewer.renderer.camera.distance = 7.2


def add_simple_scene(viewer, truss):
    from compas.geometry import Point
    from compas_viewer.scene.tagobject import Tag

    for index, (_, start, end) in enumerate(truss.bars):
        color = NAVY if truss.forces[index] < 0 else PINK
        add_line(viewer, truss.nodes[start], truss.nodes[end], color, 3.5)
    for joint in ("D", "E"):
        load_vec = unit(truss.loads[joint])
        add_line(viewer, truss.nodes[joint], truss.nodes[joint] + 0.9 * load_vec, GREEN, 3.5)
        viewer.scene.add(Point(*truss.nodes[joint]), pointcolor=rgba(PINK), pointsize=9)
    for joint in ("A", "B", "C"):
        viewer.scene.add(Point(*truss.nodes[joint]), pointcolor=rgba(NAVY), pointsize=8)
    for joint, point in truss.nodes.items():
        viewer.scene.add(Tag(joint, point + np.array([0.0, 0.0, 0.18]), rgba(DARK), height=24))
    viewer.renderer.view = "ortho"
    viewer.renderer.camera.target = [0.4, -0.2, 1.0]
    viewer.renderer.camera.position = [-6.0, -8.0, 5.8]
    viewer.renderer.camera.distance = 5.4


def projection_limits(solution):
    points = solution.polygon
    xmin, xmax = points[:, 0].min(), points[:, 0].max()
    zmin, zmax = points[:, 2].min(), points[:, 2].max()
    ymin, ymax = points[:, 1].min(), points[:, 1].max()
    xpad = max((xmax - xmin) * 0.18, 0.6)
    zpad = max((zmax - zmin) * 0.18, 0.6)
    ypad = max((ymax - ymin) * 0.24, 0.6)
    return (xmin - xpad, xmax + xpad), (zmin - zpad, zmax + zpad), (ymin - ypad, ymax + ypad)


def draw_force_panel(axis, solution, coordinates, title, xlim, ylim):
    colors = [GREEN] + [NAVY if force < 0 else PINK for force in solution.forces[::-1]]
    labels = ["P", "C (+3)", "B (−3)", "A (−6)"]
    if coordinates[1] == 2:
        offsets = [(0.35, 0.32), (0.58, -0.28), (-0.62, 0.12), (-0.58, -0.35)]
    else:
        offsets = [(-0.20, -0.36), (0.55, 0.22), (0.62, -0.08), (-0.38, 0.36)]
    axis.set_facecolor("#f7f8fa")
    axis.set_xlim(*xlim)
    axis.set_ylim(*ylim)
    axis.set_aspect("equal", adjustable="box")
    axis.set_title(title, loc="left", fontsize=12, fontweight="bold", color=DARK)
    axis.plot(
        solution.polygon[[0, 2], coordinates[0]],
        solution.polygon[[0, 2], coordinates[1]],
        color=AMBER,
        linestyle="--",
        linewidth=1.9,
    )
    for index, color in enumerate(colors):
        start = solution.polygon[index][coordinates]
        end = solution.polygon[index + 1][coordinates]
        axis.annotate(
            "",
            xy=end,
            xytext=start,
            arrowprops={"arrowstyle": "-|>,head_length=0.65,head_width=0.32", "color": color, "lw": 2.7, "shrinkA": 0, "shrinkB": 0},
        )
        midpoint = (start + end) / 2
        pos = midpoint + np.asarray(offsets[index])
        axis.text(pos[0], pos[1], labels[index], color=color, fontsize=11.5, fontweight="bold", ha="center", va="center")
    axis.scatter(solution.polygon[:-1, coordinates[0]], solution.polygon[:-1, coordinates[1]], s=26, color=DARK, zorder=5)
    axis.axis("off")


def render_projections(solution):
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    from matplotlib.patches import ConnectionPatch

    xlim, zlim, ylim = projection_limits(solution)
    zspan = zlim[1] - zlim[0]
    yspan = ylim[1] - ylim[0]
    fig, (elevation, plan) = plt.subplots(
        2, 1, figsize=(7.5, 8.6), sharex=True, facecolor="#ffffff",
        gridspec_kw={"height_ratios": [zspan, yspan]},
    )
    draw_force_panel(elevation, solution, [0, 2], "ELEVATION · x–z", xlim, zlim)
    draw_force_panel(plan, solution, [0, 1], "PLAN · x–y", xlim, ylim)
    for point in solution.polygon[:-1]:
        connection = ConnectionPatch(
            (point[0], point[2]),
            (point[0], point[1]),
            "data",
            "data",
            axesA=elevation,
            axesB=plan,
            color=GREY,
            linestyle=":",
            linewidth=1.2,
        )
        fig.add_artist(connection)
    fig.lines.append(plt.Line2D([0.08, 0.94], [0.435, 0.435], transform=fig.transFigure, color=DARK, linestyle="-.", linewidth=1.1))
    fig.text(0.08, 0.03, "Föppl §23 · added integer example · tension (+) pink, compression (−) blue, resultant R amber", color="#555e6b", fontsize=9.5)
    fig.subplots_adjust(left=0.06, right=0.96, top=0.94, bottom=0.09, hspace=0.20)
    fig.savefig(ROOT / "projections.svg", facecolor="#ffffff")
    fig.savefig(ROOT / "projections.png", dpi=200, facecolor="#ffffff")
    plt.close(fig)


def render_method_diagram(solution, traces=None):
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    from mpl_toolkits.mplot3d.art3d import Poly3DCollection
    from PIL import Image

    if traces is None:
        traces = solve_ground_traces()

    background = "#f3f4f6"
    fig = plt.figure(figsize=(16, 10), facecolor=background)
    joint_axis = fig.add_axes([-0.03, -0.02, 0.58, 1.04], projection="3d", facecolor=background)
    force_axis = fig.add_axes([0.49, -0.02, 0.54, 1.04], projection="3d", facecolor=background)

    joint_axis.set_proj_type("ortho")
    joint_axis.view_init(elev=25, azim=-58)
    joint_axis.set_box_aspect((1, 1, 0.82))
    joint_axis.set_axis_off()

    force_axis.set_proj_type("ortho")
    force_axis.view_init(elev=24, azim=-118)
    force_axis.set_box_aspect((1, 0.85, 1))
    force_axis.set_axis_off()

    # Ground grid on z = 0 for spatial joint
    for gx in range(-2, 4):
        joint_axis.plot([gx, gx], [-2.2, 1.6], [0, 0], color="#d5dae2", linewidth=1.0, zorder=1)
    for gy in range(-2, 2):
        joint_axis.plot([-2.2, 2.8], [gy, gy], [0, 0], color="#d5dae2", linewidth=1.0, zorder=1)

    origin = traces.origin
    A0, B0, C0 = traces.anchors["A"], traces.anchors["B"], traces.anchors["C"]
    P0, T = traces.pierce_load, traces.trace_intersection

    # Auxiliary planes Pi_ab and Pi_cP
    joint_axis.add_collection3d(Poly3DCollection(
        [[origin, A0, B0]], facecolor="#93b4eb", edgecolor="none", alpha=0.25,
    ))
    joint_axis.add_collection3d(Poly3DCollection(
        [[origin, C0, P0]], facecolor="#8fd1a6", edgecolor="none", alpha=0.23,
    ))

    # Ground traces ab and cP
    ab_dir = B0 - A0
    cp_dir = P0 - C0
    joint_axis.plot(*zip(A0 - 0.14 * ab_dir, B0 + 0.14 * ab_dir), color=NAVY, linewidth=2.4, linestyle=(0, (5, 3)))
    joint_axis.plot(*zip(C0 - 0.08 * cp_dir, P0 + 0.10 * cp_dir), color=GREEN, linewidth=2.4, linestyle=(0, (5, 3)))

    # Intersection line d = OT
    ot = T - origin
    joint_axis.plot(*zip(origin - 0.28 * ot, T + 0.28 * ot), color=AMBER, linewidth=3.8, linestyle=(0, (6, 3)))
    joint_axis.scatter(*T, s=85, color=AMBER, zorder=8)
    joint_axis.text(*(T + [0.16, -0.26, 0.08]), "T", fontsize=24, fontweight="bold", color=AMBER)
    joint_axis.text(*(origin + 0.48 * ot + [0.14, 0.06, 0.12]), "d", fontsize=26, fontweight="bold", color=AMBER)

    # Structural bars a, b, c
    bar_offsets = {"A": [0.18, 0.18, 0.08], "B": [-0.30, -0.26, 0.06], "C": [-0.38, 0.24, 0.14]}
    for key, force in zip(("A", "B", "C"), solution.forces):
        anchor = traces.anchors[key]
        bar_color = NAVY if force < 0 else PINK
        joint_axis.plot(*zip(origin, anchor), color=bar_color, linewidth=5.2, zorder=6)
        joint_axis.scatter(*anchor, s=60, color=NAVY, zorder=7)
        joint_axis.text(*(anchor + bar_offsets[key]), key.lower(), fontsize=26, fontweight="bold", color=DARK)

    # External load arrow P from O toward P0
    load_vec = 0.62 * (P0 - origin)
    joint_axis.quiver(*origin, *load_vec, color=GREEN, linewidth=5.2, arrow_length_ratio=0.18, zorder=7)
    joint_axis.plot(*zip(origin + load_vec, P0), color=GREEN, linewidth=1.7, linestyle=":")
    joint_axis.scatter(*P0, s=46, color=GREEN, zorder=7)
    joint_axis.text(*(origin + load_vec + [0.16, -0.22, 0.02]), "P", fontsize=26, fontweight="bold", color=GREEN)

    joint_axis.scatter(*origin, s=95, color=PINK, zorder=9)
    joint_axis.text(*(origin + [-0.12, 0.12, 0.22]), "O", fontsize=26, fontweight="bold", color=DARK)
    joint_axis.set_xlim(-2.05, 2.75)
    joint_axis.set_ylim(-2.05, 1.55)
    joint_axis.set_zlim(-0.1, 2.30)

    # Right panel: Hinged skew force quadrilateral (two triangles sharing diagonal d)
    pts = solution.polygon
    force_axis.add_collection3d(Poly3DCollection(
        [[pts[0], pts[1], pts[2]]], facecolor="#8fd1a6", edgecolor="none", alpha=0.23,
    ))
    force_axis.add_collection3d(Poly3DCollection(
        [[pts[0], pts[2], pts[3]]], facecolor="#93b4eb", edgecolor="none", alpha=0.25,
    ))
    force_axis.plot(*zip(pts[0], pts[2]), color=AMBER, linewidth=3.8, linestyle=(0, (6, 3)))
    force_axis.text(*((pts[0] + pts[2]) / 2 + [-0.55, 0.15, 0.10]), "R", fontsize=24, fontweight="bold", color=AMBER)

    edge_specs = [
        ("P", GREEN, [0.32, -0.32, 0.28]),
        ("C", PINK, [0.35, 0.20, -0.35]),
        ("B", NAVY, [0.35, 0.25, 0.05]),
        ("A", NAVY, [-0.20, 0.42, -0.52]),
    ]
    for index, (label, color, offset) in enumerate(edge_specs):
        start, end = pts[index], pts[index + 1]
        force_axis.quiver(*start, *(end - start), color=color, linewidth=5.2, arrow_length_ratio=0.14)
        force_axis.scatter(*start, s=48, color=DARK, zorder=7)
        force_axis.text(*((start + end) / 2 + offset), label, fontsize=26, fontweight="bold", color=color)

    force_axis.set_xlim(0.2, 4.8)
    force_axis.set_ylim(-1.1, 2.1)
    force_axis.set_zlim(-5.6, -0.2)

    fig.savefig(ROOT / "method-diagram.svg", facecolor=background)
    fig.savefig(ROOT / "method-diagram.png", dpi=110, facecolor=background)
    plt.close(fig)
    Image.open(ROOT / "method-diagram.png").convert("RGB").save(ROOT / "thumbnail.webp", quality=94)


def print_report(baseline, example, traces, truss, zero_demo):
    for name, solution in [("orthogonal baseline", baseline), ("main integer example", example)]:
        print(f"\n{name}")
        print("  forces A, B, C:", np.round(solution.forces, 8))
        print("  determinant / condition:", round(solution.determinant, 8), round(solution.condition, 8))
        print("  residual / closure / parallel errors:", solution.residual, solution.closure_error, solution.parallel_error)
    print("  ground pierce P0:", np.round(traces.pierce_load, 6))
    print("  ground trace intersection T:", np.round(traces.trace_intersection, 6))
    print("\nsimple truss forces AD, BD, CD, AE, BE, DE")
    print("  local :", np.round(truss.forces, 8))
    print("  global:", np.round(truss.global_forces, 8))
    print("  residual:", truss.residual)
    print("\nzero-force demonstration: member index", zero_demo)


def main(interactive=False):
    baseline = solve_spatial_joint(np.eye(3), np.array([0.4, -0.2, -1.0]))
    example = solve_spatial_joint(JOINT_DIRECTIONS, JOINT_LOAD)
    traces = solve_ground_traces(JOINT_ORIGIN, JOINT_ANCHORS, JOINT_LOAD)
    validate_joint(baseline, expected=[-0.4, 0.2, 1.0])
    validate_joint(example, expected=[-6.0, -3.0, 3.0], traces=traces)
    assert np.allclose(traces.trace_intersection, [1.0, 0.0, 0.0], atol=TOLERANCE)

    truss = solve_simple_truss()
    zero_load = solve_spatial_joint(np.eye(3), np.zeros(3))
    assert np.allclose(zero_load.forces, np.zeros(3))

    first = solve_spatial_joint(JOINT_DIRECTIONS, np.array([2.0, 1.0, -2.0]))
    second = solve_spatial_joint(JOINT_DIRECTIONS, np.array([3.0, -2.0, -2.0]))
    combined = solve_spatial_joint(JOINT_DIRECTIONS, JOINT_LOAD)
    assert np.allclose(first.forces + second.forces, combined.forces, atol=TOLERANCE)

    zero_demo = zero_force_members([
        [1.0, 0.0, 0.0],
        [0.0, 1.0, 0.0],
        [-1.0, -1.0, 0.0],
        [0.0, 0.0, 1.0],
    ], np.array([1.0, -1.0, 0.0]))
    assert zero_demo == [3], zero_demo
    assert not zero_force_members([
        [1.0, 0.0, 0.0],
        [0.0, 1.0, 0.0],
        [0.0, 0.0, 1.0],
        [1.0, 1.0, 1.0],
    ], np.array([1.0, 1.0, -1.0]))
    try:
        solve_spatial_joint([[1.0, 0.0, 0.0], [0.0, 1.0, 0.0], [1.0, 1.0, 0.0]], [0.0, 0.0, -1.0])
    except ValueError:
        pass
    else:
        raise AssertionError("Coplanar bars were not rejected")
    try:
        solve_spatial_joint(np.eye(3), np.array([0.0, 0.0, -1.0]))
    except ValueError:
        pass
    else:
        raise AssertionError("An undefined auxiliary plane was not rejected")

    print_report(baseline, example, traces, truss, zero_demo)
    from compas_viewer.commands import clear_scene

    viewer = make_viewer()
    add_spatial_scene(viewer, example, traces)
    capture(viewer, ROOT / "viewer.png")
    clear_scene(viewer)
    add_simple_scene(viewer, truss)
    capture(viewer, ROOT / "simple-truss.png")
    clear_scene(viewer)
    add_spatial_scene(viewer, example, traces)
    render_projections(example)
    render_method_diagram(example, traces)
    print("\nWrote viewer.png, simple-truss.png, projections.svg, projections.png, method-diagram.svg, method-diagram.png, thumbnail.webp")
    if interactive:
        initialize_tags(viewer)
        viewer.show()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--interactive", action="store_true", help="show the compas_viewer window after writing figures")
    args = parser.parse_args()
    main(interactive=args.interactive)
