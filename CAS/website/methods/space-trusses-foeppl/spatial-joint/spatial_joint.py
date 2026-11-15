"""Reconstruct Föppl's spatial three-bar joint and skew force quadrilateral.

Source: August Föppl, The Space Truss (1892), Part I, Chapter 5, §§20–25.
Run this file to validate the geometry and regenerate all figures. Use --interactive
for a compas_viewer window after the figures have been written.
"""

import argparse
from dataclasses import dataclass
from pathlib import Path

import matplotlib
import numpy as np
from compas.colors import Color
from compas.datastructures import Mesh
from compas.geometry import Line, Point
from compas_viewer import Viewer
from compas_viewer.commands import clear_scene
from compas_viewer.scene.tagobject import Tag, TagObject
from PIL import Image, ImageDraw, ImageFont, ImageOps

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager
from matplotlib.patches import ConnectionPatch

ROOT = Path(__file__).resolve().parent
TOLERANCE = 1e-9
NAVY = "#1a1eb2"
PINK = "#ce4095"
GREEN = "#3f9c20"
GREY = "#aaaaaa"
DARK = "#262626"


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
class TrussSolution:
    nodes: dict
    bars: list
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


def solve_spatial_joint(directions, load):
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


def independent_nullspace_forces(solution):
    augmented = np.column_stack([solution.directions.T, solution.load])
    _, _, vh = np.linalg.svd(augmented)
    null_vector = vh[-1]
    if abs(null_vector[-1]) < TOLERANCE:
        raise ValueError("The independent nullspace check requires a nonzero external load")
    return null_vector[:3] / null_vector[-1]


def validate_joint(solution, expected=None):
    assert solution.residual < TOLERANCE, solution.residual
    assert solution.closure_error < TOLERANCE, solution.closure_error
    assert solution.parallel_error < TOLERANCE, solution.parallel_error
    assert np.allclose(solution.forces, independent_nullspace_forces(solution), atol=TOLERANCE)
    elevation = solution.polygon[:, [0, 2]]
    plan = solution.polygon[:, [0, 1]]
    assert np.array_equal(elevation[:, 0], plan[:, 0])
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
        "A": np.array([0.0, 0.0, 0.0]),
        "B": np.array([2.0, 0.0, 0.0]),
        "C": np.array([0.0, 2.0, 0.0]),
        "D": np.array([0.2, 0.3, 1.5]),
        "E": np.array([0.5, 0.4, 2.7]),
    }
    bars = [("AD", "A", "D"), ("BD", "B", "D"), ("CD", "C", "D"),
            ("AE", "A", "E"), ("BE", "B", "E"), ("DE", "D", "E")]
    loads = {"D": np.array([-0.05, 0.10, -0.40]), "E": np.array([0.15, -0.10, -0.80])}

    solution_e = solve_spatial_joint([nodes["A"] - nodes["E"], nodes["B"] - nodes["E"], nodes["D"] - nodes["E"]], loads["E"])
    direction_de = unit(nodes["E"] - nodes["D"])
    load_d = loads["D"] + solution_e.forces[2] * direction_de
    solution_d = solve_spatial_joint([nodes["A"] - nodes["D"], nodes["B"] - nodes["D"], nodes["C"] - nodes["D"]], load_d)
    validate_joint(solution_e)
    validate_joint(solution_d)

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
    return TrussSolution(nodes, bars, {"D": solution_d, "E": solution_e}, forces,
                         global_forces, equilibrium, right_hand_side, residual)


def rgba(hex_color, alpha=1.0):
    value = hex_color.lstrip("#")
    return Color(*(int(value[i:i + 2], 16) / 255 for i in (0, 2, 4)), alpha)


def add_line(viewer, start, end, color, width=2.0):
    viewer.scene.add(Line(Point(*start), Point(*end)), linecolor=rgba(color), linewidth=width)


def add_plane(viewer, point, normal, size, color, opacity=0.14):
    normal = unit(normal)
    helper = np.array([0.0, 0.0, 1.0]) if abs(normal[2]) < 0.9 else np.array([0.0, 1.0, 0.0])
    u = unit(np.cross(normal, helper)) * size
    v = unit(np.cross(normal, u)) * size
    point = np.asarray(point, dtype=float)
    vertices = [point - u - v, point + u - v, point + u + v, point - u + v]
    mesh = Mesh.from_vertices_and_faces(vertices, [[0, 1, 2, 3]])
    viewer.scene.add(mesh, facecolor=rgba(color), opacity=opacity, show_lines=False)


def make_viewer():
    viewer = Viewer()
    viewer.config.window.width = 900
    viewer.config.window.height = 900
    viewer.config.ui.menubar.show = False
    viewer.config.ui.statusbar.show = False
    viewer.config.ui.sidebar.show = False
    viewer.config.renderer.show_grid = False
    viewer.config.renderer.show_gridz = False
    viewer.config.renderer.backgroundcolor = Color(1.0, 1.0, 1.0, 1.0)
    return viewer


def initialize_tags(viewer):
    for scene_object in viewer.scene.objects:
        if isinstance(scene_object, TagObject) and not scene_object._inited:
            scene_object.init()


def capture(viewer, path):
    viewer.ui.init()
    viewer.renderer.resize(900, 900)
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
        crop = (max(0, bounds[0] - margin), max(0, bounds[1] - margin),
                min(image.width, bounds[2] + margin), min(image.height, bounds[3] + margin))
        image = image.crop(crop)
    image.save(path)


def add_spatial_scene(viewer, solution):
    origin = np.zeros(3)
    for label, direction, force in zip("ABC", solution.directions, solution.forces):
        color = NAVY if force < 0 else PINK
        add_line(viewer, origin, 2.2 * direction, color, 4.0)
        viewer.scene.add(Tag(label, 1.15 * direction, rgba(color), height=28))
    add_line(viewer, origin, 2.0 * unit(solution.load), GREEN, 4.0)
    viewer.scene.add(Tag("P", 1.2 * unit(solution.load), rgba(GREEN), height=28))
    add_plane(viewer, origin, np.cross(*solution.directions[:2]), 2.0, "#8ea9cf", 0.35)
    add_plane(viewer, origin, np.cross(solution.directions[2], solution.load), 2.0, "#a6c89a", 0.25)
    add_line(viewer, -3.0 * solution.intersection, 3.0 * solution.intersection, DARK, 2.0)
    viewer.scene.add(Tag("intersection", 1.6 * solution.intersection, rgba(DARK), height=22))
    offset = np.array([3.0, 0.0, 0.0])
    display = 1.8 * solution.polygon
    edge_colors = [GREEN] + [NAVY if force < 0 else PINK for force in solution.forces[::-1]]
    for index, color in enumerate(edge_colors):
        add_line(viewer, offset + display[index], offset + display[index + 1], color, 4.0)
        viewer.scene.add(Tag("PCBA"[index], offset + (display[index] + display[index + 1]) / 2, rgba(color), height=28))
    add_line(viewer, offset + display[0], offset + display[2], GREY, 1.5)
    add_line(viewer, offset + display[2], offset + display[4], GREY, 1.5)
    viewer.scene.add(Point(*origin), pointcolor=rgba(DARK), pointsize=10)
    for point in display[:-1]:
        viewer.scene.add(Point(*(offset + point)), pointcolor=rgba(DARK), pointsize=6)
    viewer.renderer.view = "ortho"
    viewer.renderer.camera.target = [1.2, 0.0, 0.4]
    viewer.renderer.camera.position = [-7.0, -8.0, 6.0]
    viewer.renderer.camera.distance = 5.5


def add_simple_scene(viewer, truss):
    for name, start, end in truss.bars:
        index = [bar[0] for bar in truss.bars].index(name)
        add_line(viewer, truss.nodes[start], truss.nodes[end], NAVY if truss.forces[index] < 0 else PINK, 3.0)
    for joint in ("D", "E"):
        add_line(viewer, truss.nodes[joint], truss.nodes[joint] + 0.8 * unit(truss.local_solutions[joint].load), GREEN, 3.0)
        viewer.scene.add(Point(*truss.nodes[joint]), pointcolor=rgba(DARK), pointsize=8)
    for joint in ("A", "B", "C"):
        viewer.scene.add(Point(*truss.nodes[joint]), pointcolor=rgba(GREY), pointsize=8)
    for joint, point in truss.nodes.items():
        viewer.scene.add(Tag(joint, point, rgba(DARK), height=22))
    viewer.renderer.view = "ortho"
    viewer.renderer.camera.target = [0.6, 0.5, 1.2]
    viewer.renderer.camera.position = [-5.0, -6.0, 5.0]
    viewer.renderer.camera.distance = 4.0


def projection_limits(solution):
    intersection = np.array([-1.6 * solution.intersection, 1.6 * solution.intersection])
    points = np.vstack([solution.polygon, intersection])
    xmin, xmax = points[:, 0].min(), points[:, 0].max()
    zmin, zmax = points[:, 2].min(), points[:, 2].max()
    ymin, ymax = points[:, 1].min(), points[:, 1].max()
    xpad = max((xmax - xmin) * 0.15, 0.15)
    zpad = max((zmax - zmin) * 0.15, 0.15)
    ypad = max((ymax - ymin) * 0.15, 0.15)
    return (xmin - xpad, xmax + xpad), (zmin - zpad, zmax + zpad), (ymin - ypad, ymax + ypad)


def draw_force_panel(axis, solution, coordinates, title, xlim, ylim):
    colors = [GREEN] + [NAVY if force < 0 else PINK for force in solution.forces[::-1]]
    labels = ["P", "C", "B", "A"]
    axis.set_facecolor("#f5f5f5")
    axis.set_aspect("equal", adjustable="box")
    axis.set_xlim(*xlim)
    axis.set_ylim(*ylim)
    axis.set_title(title, loc="left", fontsize=12, fontweight="bold", color=DARK)
    for index, color in enumerate(colors):
        start = solution.polygon[index][coordinates]
        end = solution.polygon[index + 1][coordinates]
        axis.annotate("", xy=end, xytext=start,
                      arrowprops={"arrowstyle": "->", "color": color, "lw": 2.2, "shrinkA": 0, "shrinkB": 0})
        midpoint = (start + end) / 2
        axis.text(midpoint[0], midpoint[1], labels[index], color=color, fontsize=12, fontweight="bold",
                  ha="right", va="bottom")
    axis.plot(solution.polygon[[0, 2], coordinates[0]], solution.polygon[[0, 2], coordinates[1]],
              color=GREY, linestyle="--", linewidth=1.2)
    axis.plot(solution.polygon[[2, 4], coordinates[0]], solution.polygon[[2, 4], coordinates[1]],
              color=GREY, linestyle="--", linewidth=1.2)
    intersection = np.array([-1.6 * solution.intersection, 1.6 * solution.intersection])
    axis.plot(intersection[:, 0], intersection[:, coordinates[1]], color=DARK, linestyle="-.", linewidth=1.0)
    axis.scatter(solution.polygon[:-1, coordinates[0]], solution.polygon[:-1, coordinates[1]],
                 s=16, color=DARK, zorder=5)
    axis.axis("off")


def render_projections(solution):
    xlim, zlim, ylim = projection_limits(solution)
    fig, (elevation, plan) = plt.subplots(2, 1, figsize=(7, 9), sharex=True)
    draw_force_panel(elevation, solution, [0, 2], "ELEVATION · x–z", xlim, zlim)
    draw_force_panel(plan, solution, [0, 1], "PLAN · x–y", xlim, ylim)
    for point in solution.polygon[:-1]:
        connection = ConnectionPatch((point[0], zlim[0]), (point[0], ylim[1]), "data", "data",
                                     axesA=elevation, axesB=plan, color=GREY, linestyle=":", linewidth=0.8)
        fig.add_artist(connection)
    fig.text(0.06, 0.025, "Added numerical reconstruction · not an original scan", color="#666666", fontsize=9)
    fig.text(0.06, 0.055, "TENSION pink · COMPRESSION navy · EXTERNAL FORCE green", color="#666666", fontsize=9)
    fig.subplots_adjust(left=0.06, right=0.98, top=0.95, bottom=0.10, hspace=0.22)
    fig.savefig(ROOT / "projections.svg")
    fig.savefig(ROOT / "projections.png", dpi=200)
    plt.close(fig)


def make_thumbnail():
    viewer_image = ImageOps.contain(Image.open(ROOT / "viewer.png").convert("RGB"), (900, 900))
    projections = ImageOps.contain(Image.open(ROOT / "projections.png").convert("RGB"), (900, 900))
    thumbnail = Image.new("RGB", (1800, 950), "white")
    thumbnail.paste(viewer_image, ((900 - viewer_image.width) // 2, 50 + (900 - viewer_image.height) // 2))
    thumbnail.paste(projections, (900 + (900 - projections.width) // 2, 50 + (900 - projections.height) // 2))
    draw = ImageDraw.Draw(thumbnail)
    try:
        title_font = ImageFont.truetype(font_manager.findfont("DejaVu Sans:weight=bold"), 28)
        subtitle_font = ImageFont.truetype(font_manager.findfont("DejaVu Sans"), 20)
    except OSError:
        title_font = subtitle_font = ImageFont.load_default()
    draw.text((24, 12), "FÖPPL · SPATIAL JOINT EQUILIBRIUM", fill=DARK, font=title_font)
    draw.text((920, 18), "Skew force quadrilateral · elevation + plan", fill="#666666", font=subtitle_font)
    thumbnail.save(ROOT / "thumbnail.webp", quality=92)


def print_report(baseline, example, truss, zero_demo):
    for name, solution in [("orthogonal baseline", baseline), ("main example", example)]:
        print(f"\n{name}")
        print("  forces A, B, C:", np.round(solution.forces, 8))
        print("  determinant / condition:", round(solution.determinant, 8), round(solution.condition, 8))
        print("  residual / closure / parallel errors:", solution.residual, solution.closure_error, solution.parallel_error)
    print("\nsimple truss forces AD, BD, CD, AE, BE, DE")
    print("  local :", np.round(truss.forces, 8))
    print("  global:", np.round(truss.global_forces, 8))
    print("  residual:", truss.residual)
    print("\nzero-force demonstration: member index", zero_demo)


def main(interactive=False):
    baseline = solve_spatial_joint(np.eye(3), np.array([0.4, -0.2, -1.0]))
    example = solve_spatial_joint([
        [1.0, 0.0, 1.0],
        [0.0, 1.0, 0.6],
        [-0.8, 0.2, 1.0],
    ], np.array([0.35, -0.25, -1.2]))
    validate_joint(baseline, expected=[-0.4, 0.2, 1.0])
    validate_joint(example, expected=[0.447834286143, 0.097182529684, 1.080123451260])
    truss = solve_simple_truss()
    zero_load = solve_spatial_joint(np.eye(3), np.zeros(3))
    assert np.allclose(zero_load.forces, np.zeros(3))
    first = solve_spatial_joint(np.eye(3), np.array([0.2, 0.1, -0.4]))
    second = solve_spatial_joint(np.eye(3), np.array([-0.1, 0.3, 0.2]))
    combined = solve_spatial_joint(np.eye(3), np.array([0.1, 0.4, -0.2]))
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

    print_report(baseline, example, truss, zero_demo)
    viewer = make_viewer()
    add_spatial_scene(viewer, example)
    capture(viewer, ROOT / "viewer.png")
    clear_scene(viewer)
    add_simple_scene(viewer, truss)
    capture(viewer, ROOT / "simple-truss.png")
    clear_scene(viewer)
    add_spatial_scene(viewer, example)
    render_projections(example)
    make_thumbnail()
    print("\nWrote viewer.png, simple-truss.png, projections.svg, projections.png, thumbnail.webp")
    if interactive:
        initialize_tags(viewer)
        viewer.show()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--interactive", action="store_true", help="show the compas_viewer window after writing figures")
    args = parser.parse_args()
    main(interactive=args.interactive)
