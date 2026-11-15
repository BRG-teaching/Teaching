"""Author the Föppl presentation with the Session Viewer shipped on Teaching."""

import argparse
import sys
import webbrowser
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent
VIEWER = ROOT.parents[2] / "session-viewer"
WHEEL = VIEWER / "session_py-0.260.0-py3-none-any.whl"
OUTPUT = VIEWER / "methods" / "space-trusses-foeppl"
sys.path.insert(0, str(WHEEL))

from session_py.mesh import Mesh
from session_py.point import Point
from session_py.slides import Presentation, _color
from session_py.viewer import serve
from spatial_joint import (
    render_method_diagram,
    solve_simple_truss,
    solve_spatial_joint,
    unit,
    validate_joint,
)

INK = "#26313d"
MUTED = "#89949f"
PINK = "#ce4095"
NAVY = "#1a1eb2"
GREEN = "#27965a"
DIRECTIONS = [[1.0, 0.0, 1.0], [0.0, 1.0, 0.6], [-0.8, 0.2, 1.0]]
LOAD = [0.35, -0.25, -1.2]


def mesh3d(step, name, vertices, color):
    mesh = Mesh.from_vertices_and_faces([Point(*map(float, vertex)) for vertex in vertices], [[0, 1, 2, 3]])
    mesh.name = name
    mesh.set_objectcolor(_color(color))
    mesh.set_linecolors([_color(MUTED)] * mesh.number_of_edges())
    session = step._session(name)
    session.add_mesh(mesh, None)
    step._files.append((session, ""))
    step.deck._spatial.append(name)


def joint(step, solution, planes=False):
    origin = np.zeros(3)
    step.point3d("joint-O", origin, radius=7, color=INK)
    step.math3d("label-O", "O", [0.08, -0.10, 0.20], 28.0, INK)
    for name, direction in zip("ABC", solution.directions):
        end = 2.2 * direction
        step.arrow3d(f"bar-{name}", origin, end, width=4, color=INK)
        step.point3d(f"anchor-{name}", end, radius=5, color=MUTED)
        step.math3d(f"label-{name}", name.lower(), end + 0.17 * direction, 28.0, NAVY)
    load_end = 2.0 * unit(solution.load)
    step.arrow3d("external-load", origin, load_end, width=5, color=GREEN)
    step.math3d("load-label", r"\mathbf{P}", load_end + [0.0, 0.0, -0.25], 30.0, GREEN)
    if not planes:
        return
    for name, first, second, color in (
        ("ab", solution.directions[0], solution.directions[1], "#cbd6e828"),
        ("cp", solution.directions[2], solution.load, "#d9e4d528"),
    ):
        u = unit(first)
        v = unit(second - np.dot(second, u) * u)
        corners = np.array([2.6 * u + 1.7 * v, -1.4 * u + 1.7 * v, -1.4 * u - 1.7 * v, 2.6 * u - 1.7 * v])
        mesh3d(step, f"plane-{name}", corners, color)
        step.polyline3d(f"outline-{name}", [*corners, corners[0]], width=1.4, color=MUTED)
        step.math3d(f"plane-label-{name}", rf"\Pi_{{{name if name == 'ab' else 'cP'}}}", corners[0], 26.0, MUTED)
    direction = solution.intersection
    step.polyline3d("plane-intersection", [-3.5 * direction, 3.5 * direction], width=2, color=INK, dash=[0.16, 0.10])
    step.math3d("intersection-label", "d", 1.65 * direction + [0.0, 0.0, 0.18], 28.0, INK)


def source_note(step, text="Föppl §23 · added numerical example"):
    step.text("source-note", text, (960, 670), 22, MUTED)


def make_deck(solution, truss):
    deck = Presentation("Föppl · Spatial joint equilibrium", dark=False, head_scale=0.85)

    step = deck.topic("1 · Three bars and a load").step(
        "A spatial joint", "Three non-coplanar bars meet one external force. Drag to orbit; use the arrow keys to change slides."
    )
    joint(step, solution)
    step.math("equilibrium", r"A\mathbf{a}+B\mathbf{b}+C\mathbf{c}+\mathbf{P}=\mathbf{0}", (960, 190), 36, INK)
    step.text("known", "Known: bar directions a, b, c and load P.", (960, 290), 27, INK)
    step.text("unknown", "Unknown: signed bar forces A, B, C.", (960, 340), 27, INK)
    source_note(step)
    step.animate("external-load")

    step = deck.topic("2 · Two auxiliary planes").step(
        "Auxiliary planes", "One plane contains a and b; the other contains c and P. Their intersection carries both resultants."
    )
    joint(step, solution, planes=True)
    step.math("normal-ab", r"\mathbf{n}_{ab}=\mathbf{a}\times\mathbf{b}", (960, 170), 34, INK)
    step.math("normal-cp", r"\mathbf{n}_{cP}=\mathbf{c}\times\mathbf{P}", (960, 235), 34, INK)
    step.math("intersection", r"\mathbf{d}=\mathbf{n}_{ab}\times\mathbf{n}_{cP}", (960, 320), 34, INK)
    step.text("resultants", "Both resultants are parallel to d.", (960, 420), 27, INK)
    source_note(step)

    step = deck.topic("3 · Close the force polygon").step(
        "Skew force quadrilateral", "The four force vectors close in space. The two diagonals are the opposite resultants."
    )
    points = solution.polygon
    center = points[:-1].mean(axis=0)
    for index, (name, color) in enumerate(zip("PCBA", [GREEN, PINK, PINK, PINK])):
        start, end = points[index], points[index + 1]
        step.arrow3d(f"force-{name}", start, end, width=5, color=color)
        label_at = (start + end) / 2
        offset = label_at - center
        label_at += 0.28 * unit(offset)
        step.math3d(f"force-label-{name}", rf"\mathbf{{{name}}}", label_at, 28.0, color)
    for name, start, end in (("CP", points[0], points[2]), ("AB", points[2], points[4])):
        step.polyline3d(f"resultant-{name}", [start, end], width=1.6, color=MUTED, dash=[0.12, 0.08])
        step.math3d(f"resultant-label-{name}", rf"\mathbf{{R}}_{{{name}}}", (start + end) / 2 + [0.0, 0.0, 0.22], 22.0, MUTED)
    step.math("closure", r"\mathbf{P}+\mathbf{C}+\mathbf{B}+\mathbf{A}=\mathbf{0}", (960, 160), 36, INK)
    step.math("resultants-equal", r"\mathbf{R}_{AB}+\mathbf{R}_{CP}=\mathbf{0}", (960, 230), 32, INK)
    for index, (name, force) in enumerate(zip("ABC", solution.forces)):
        step.math(f"value-{name}", rf"{name}={force:.4f}", (960, 330 + 65 * index), 32, PINK)
    source_note(step, "Tension positive · true 3D lengths, not projected lengths")

    step = deck.topic("4 · A simple space truss").step(
        "Two free joints and six bars", "Each new joint has three non-coplanar bars. Local joint solutions agree with the global equilibrium matrix."
    )
    for index, (name, start, end) in enumerate(truss.bars):
        color = NAVY if truss.forces[index] < 0 else PINK
        step.line3d(f"member-{name}", truss.nodes[start], truss.nodes[end], width=4, color=color)
    for name, point in truss.nodes.items():
        fixed = name in "ABC"
        step.point3d(f"truss-node-{name}", point, radius=6, color=MUTED if fixed else INK)
        label_offset = [-0.35, 0.0, 0.45] if name == "A" else [0.10, 0.0, 0.20]
        step.math3d(f"truss-label-{name}", name, np.asarray(point) + label_offset, 28.0, INK)
    for name in ("D", "E"):
        load = truss.local_solutions[name].load
        end = np.asarray(truss.nodes[name]) + 0.8 * unit(load)
        step.arrow3d(f"truss-load-{name}", truss.nodes[name], end, width=4, color=GREEN)
    step.math("truss-count", r"m=3n_f=6", (960, 170), 38, INK)
    for index, name in enumerate(("AD", "BD", "CD", "AE", "BE", "DE")):
        force = truss.forces[index]
        color = NAVY if force < 0 else PINK
        step.math(f"truss-value-{name}", rf"{name}={force:+.4f}", (960, 270 + 52 * index), 28, color)
    source_note(step, "Local = global · equilibrium residual 6.94 × 10⁻¹⁷")
    return deck


def portrait(deck, solution):
    deck.width = 760
    deck.height = 1200
    deck.head_scale = 0.55
    captions = {
        "known": "Known: a, b, c, P.",
        "unknown": "Unknown: A, B, C.",
        "resultants": "Resultants lie on d.",
    }
    summaries = [
        "Three bars and one external force.",
        "Two planes share the intersection d.",
        "P, C, B and A form a closed polygon.",
        "Two free joints; six bars. Local = global.",
    ]
    for index, topic in enumerate(deck.topics):
        for step in topic.steps:
            step.caption = summaries[index]
            texts = []
            for text in step._texts:
                name = text["name"]
                if name in ("source-note", "resultant-label-AB", "resultant-label-CP"):
                    continue
                if not text.get("spatial"):
                    text["at"][0] -= 480
                if name in captions:
                    text["text"] = captions[name]
                elif name in ("label-A", "label-B", "label-C"):
                    text["at"] = list(2.45 * solution.directions["ABC".index(name[-1])])
                elif name == "intersection-label":
                    text["at"] = list(2.7 * solution.intersection + [0.0, 0.0, 0.18])
                texts.append(text)
            step._texts = texts
    return deck


def main(serve_locally=False):
    solution = solve_spatial_joint(DIRECTIONS, LOAD)
    validate_joint(solution)
    truss = solve_simple_truss()
    deck = make_deck(solution, truss)
    path = deck.write(OUTPUT)
    mobile_path = portrait(make_deck(solution, truss), solution).write(OUTPUT / "mobile")
    render_method_diagram(solution)
    print(f"Wrote {path} and {mobile_path} with {len(deck.topics)} slides")
    if serve_locally:
        viewer = serve(deck, viewer=VIEWER, port=8000)
        webbrowser.open(viewer.url)
        print(viewer.url)
        try:
            import threading
            threading.Event().wait()
        except KeyboardInterrupt:
            pass
        finally:
            viewer.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--serve", action="store_true", help="open the deck in the existing Teaching Session Viewer")
    arguments = parser.parse_args()
    main(serve_locally=arguments.serve)
