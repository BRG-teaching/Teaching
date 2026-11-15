"""Author the step-by-step Föppl presentation in Force-Density Session Viewer style."""

import argparse
import shutil
import sys
import webbrowser
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent
VIEWER = ROOT.parents[2] / "session-viewer"
WHEEL = VIEWER / "session_py-0.260.0-py3-none-any.whl"
OUTPUT = VIEWER / "methods" / "space-trusses-foeppl"
sys.path.insert(0, str(WHEEL))

from session_py.matrix import Matrix
from session_py.mesh import Mesh
from session_py.point import Point
from session_py.slides import Presentation, _color
from session_py.viewer import serve
from session_py.xform import Xform
from spatial_joint import (
    JOINT_ANCHORS,
    JOINT_DIRECTIONS,
    JOINT_LOAD,
    JOINT_ORIGIN,
    render_method_diagram,
    solve_ground_traces,
    solve_simple_truss,
    solve_spatial_joint,
    validate_joint,
)

# Force-Density dark-mode palette
INK = "#e8edf3"
MUTED = "#8b96a5"
DIM = "#4a5565"
PALE = "#252b35"
FREE = "#dc4b8d"      # Free joints & tension (+)
FIXED = "#62a0ff"     # Fixed supports & compression (-)
LOAD = "#4acb6a"      # External applied loads
AMBER = "#f2ad2e"     # Auxiliary plane intersection d = OT & resultant R
AXIS_X = "#ef7770"
AXIS_Y = "#62cc7c"
AXIS_Z = "#72a4ef"
PLANE_AB = "#62a0ff44"
PLANE_CP = "#4acb6a40"
GRID_COLOR = (0.32, 0.42, 0.52, 0.50)


def iso_project(vec):
    """Project a 3D vector onto Session Viewer's default orthographic screen axes (sx right, sy down)."""
    dx, dy, dz = map(float, vec)
    sx = 0.866025403784 * dx - 0.5 * dy
    sy = -(0.25 * dx + 0.433012701892 * dy + 0.866025403784 * dz)
    return np.array([sx, sy], dtype=float)


def add_ground_grid(step, x_range=(-2, 3), y_range=(-2, 2), z=0.0, prefix="grid"):
    """Draw the horizontal z = 0 datum grid matching Force Density's spatial floor."""
    x0, x1 = x_range
    y0, y1 = y_range
    for gx in range(x0, x1 + 1):
        step.line3d(f"{prefix}-x-{gx}", [gx, y0 - 0.4, z], [gx, y1 + 0.4, z], width=0.85, color=GRID_COLOR)
    for gy in range(y0, y1 + 1):
        step.line3d(f"{prefix}-y-{gy}", [x0 - 0.4, gy, z], [x1 + 0.4, gy, z], width=0.85, color=GRID_COLOR)


def add_tri_surface(step, name, p0, p1, p2, fill_color, border_color=None, rulings=7):
    """Render a crisp graphic-statics planar fan (translucent rulings from p0 to p1..p2 + border)."""
    p0 = np.asarray(p0, dtype=float)
    p1 = np.asarray(p1, dtype=float)
    p2 = np.asarray(p2, dtype=float)
    for k in range(1, rulings + 1):
        t = k / (rulings + 1)
        q = (1.0 - t) * p1 + t * p2
        step.line3d(f"{name}-rule-{k}", p0, q, width=1.05, color=fill_color)
    if border_color is not None:
        step.polyline3d(f"{name}-edge", [p0, p1, p2, p0], width=1.4, color=border_color)


def add_matrix_card(step, name, values, at, cell=54.0, title=None, title_offset=None, colored=None, text_scale=0.33):
    """Add a Force-Density rounded matrix card whose rows step downward in screen space."""
    numeric_rows = [
        [float(val) if isinstance(val, (int, float, np.floating, np.integer)) else 0.0 for val in row]
        for row in values
    ]
    matrix = Matrix.from_rows(numeric_rows)
    matrix.name = name
    matrix.cell = float(cell)
    matrix.mincolor = _color(PALE)
    matrix.maxcolor = _color(PALE)
    matrix.zerocolor = _color(PALE)
    matrix.textcolor = _color(INK)
    matrix.linecolor = _color(INK)
    session = step._session(name)
    session.add_matrix(matrix, None)
    xf = Xform.translation(*step._xy(at))
    xf.m[5] = -1.0
    session.set_xform(matrix.guid, xf)
    step._files.append((session, ""))

    x0, y0 = float(at[0]), float(at[1])
    if title is not None:
        tx, ty = title_offset if title_offset is not None else (x0 - cell * 0.45, y0 - cell * 0.82)
        step.math(f"{name}-title", title, (tx, ty), cell * 0.48, INK, fixed=True)

    ncols = len(values[0])
    for r, row_vals in enumerate(values):
        for c, val in enumerate(row_vals):
            tex = val if isinstance(val, str) else f"{val:g}"
            is_num = isinstance(val, (int, float, np.floating, np.integer))
            active = (is_num and abs(float(val)) > 1e-12) if colored is None else bool(colored(r, c, val))
            if active:
                idx = r * ncols + c
                if idx < 64:
                    step.deck._colored.setdefault(name, []).append(idx)
            step.math(
                f"{name}[{r},{c}]",
                tex,
                (x0 + c * cell, y0 + r * cell),
                cell * text_scale,
                "#ffffff" if active else INK,
                center=True,
                center_ink=True,
                max_width=cell * 0.86,
                fixed=True,
            )
    return name


def add_tripod_base(
    step,
    traces,
    bar_colors=None,
    bar_width=4.6,
    show_anchors=True,
    show_bar_labels=True,
    show_load=True,
    load_scale=0.38,
    label_size=24.0,
    mobile=False,
):
    origin = traces.origin
    anchors = traces.anchors
    bar_colors = bar_colors or {"A": INK, "B": INK, "C": INK}
    anchor_offsets = {
        "A": np.array([0.34, 0.36, 0.08]),
        "B": np.array([-0.46, 0.22, 0.58 if mobile else 0.36]),
        "C": np.array([-0.36, 0.24, 0.22 if mobile else 0.12]),
    }
    mid_offsets = {
        "A": np.array([0.22, 0.24, 0.18]),
        "B": np.array([-0.30, -0.14, 0.10]),
        "C": np.array([-0.28, 0.22, 0.20]),
    }
    for key in ("A", "B", "C"):
        anc = anchors[key]
        col = bar_colors[key]
        step.line3d(f"bar-{key}", origin, anc, width=bar_width, color=col)
        if show_anchors:
            step.point3d(f"anchor-{key}", anc, radius=5.5, color=FIXED)
            step.math3d(f"anchor-lbl-{key}", key, anc + anchor_offsets[key], label_size - 2.0, FIXED)
        if show_bar_labels:
            mid = 0.52 * origin + 0.48 * anc + mid_offsets[key]
            step.math3d(f"bar-lbl-{key}", key.lower(), mid, label_size, col if col != DIM else MUTED)

    step.point3d("joint-O", origin, radius=6.5, color=FREE)
    step.math3d("label-O", "O", origin + np.array([-0.16, 0.18, 0.34]), label_size + 2.0, FREE)

    if show_load:
        p_end = origin + load_scale * JOINT_LOAD
        step.arrow3d("load-P", origin, p_end, width=4.6, color=LOAD)
        step.math3d("load-lbl-P", r"\mathbf{P}", p_end + np.array([0.30, -0.20, 0.06 if mobile else -0.06]), label_size + 2.0, LOAD)


def add_planes_and_traces(step, traces, show_ab=True, show_cp=True, show_d=True, label_size=23.0, mobile=False):
    origin = traces.origin
    A0, B0, C0 = traces.anchors["A"], traces.anchors["B"], traces.anchors["C"]
    P0 = traces.pierce_load
    T = traces.trace_intersection

    if show_ab:
        add_tri_surface(step, "plane-ab", origin, A0, B0, PLANE_AB, "#62a0ff55")
        ab_vec = B0 - A0
        step.polyline3d("trace-ab", [A0 - 0.16 * ab_vec, B0 + 0.16 * ab_vec], width=2.5, color=FIXED, dash=[0.18, 0.10])
        step.math3d("trace-lbl-ab", "ab", 0.64 * A0 + 0.36 * B0 + np.array([0.34, -0.18, 0.32 if mobile else 0.12]), label_size - 1.0, FIXED)

    if show_cp:
        add_tri_surface(step, "plane-cp", origin, C0, P0, PLANE_CP, "#4acb6a55")
        cp_vec = P0 - C0
        step.polyline3d("load-ray", [origin, P0], width=1.5, color=LOAD, dash=[0.12, 0.10])
        step.point3d("pierce-P0", P0, radius=4.8, color=LOAD)
        step.math3d("lbl-P0", "P_{0}", P0 + np.array([0.30, -0.22, 0.10]), label_size - 2.0, LOAD)
        step.polyline3d("trace-cp", [C0 - 0.10 * cp_vec, P0 + 0.12 * cp_vec], width=2.5, color=LOAD, dash=[0.18, 0.10])
        step.math3d("trace-lbl-cp", "cP", 0.28 * C0 + 0.72 * P0 + np.array([0.10, -0.28, 0.08]), label_size - 1.0, LOAD)

    if show_d:
        ot = T - origin
        step.point3d("point-T", T, radius=6.2, color=AMBER)
        step.math3d("lbl-T", "T", T + np.array([0.20, 0.16, 0.16]), label_size, AMBER)
        step.polyline3d("line-d", [origin - 0.28 * ot, T + 0.30 * ot], width=3.4, color=AMBER, dash=[0.20, 0.10])
        step.math3d("lbl-d", "d", origin + 0.45 * ot + np.array([-0.24, 0.14, 0.12]), label_size + 2.0, AMBER)


def draw_2d_polygon_panel(step, poly3d, center_xy, scale_px, upto_edge=4, show_diag=True, show_construction=None, label_size=26.0):
    """Project 3D force polygon onto 2D slide panel using Session Viewer's exact camera axes."""
    pts2 = np.array([iso_project(v) for v in poly3d])
    lo, hi = pts2[:4].min(axis=0), pts2[:4].max(axis=0)
    mid = 0.5 * (lo + hi)
    pts_px = (pts2 - mid) * scale_px + np.asarray(center_xy, dtype=float)

    if show_diag:
        step.polyline(
            "diag-R-2d",
            [pts_px[0], pts_px[2]],
            width=2.6,
            color=AMBER,
            dash=[8.0, 6.0],
        )
        rmid = 0.5 * (pts_px[0] + pts_px[2]) + np.array([-26.0, 12.0])
        step.math("diag-lbl-2d", r"\mathbf{R}", rmid, label_size - 2.0, AMBER, center=True)

    if show_construction == "tri1":
        dir_c = pts_px[2] - pts_px[1]
        dir_d = pts_px[2] - pts_px[0]
        step.polyline("ray-c-2d", [pts_px[1] - 0.15 * dir_c, pts_px[2] + 0.25 * dir_c], width=1.8, color=FREE, dash=[6.0, 5.0])
        step.polyline("ray-d-2d", [pts_px[0] - 0.12 * dir_d, pts_px[2] + 0.22 * dir_d], width=1.8, color=AMBER, dash=[6.0, 5.0])
    elif show_construction == "tri2":
        dir_b = pts_px[3] - pts_px[2]
        dir_a = pts_px[0] - pts_px[3]
        step.polyline("ray-b-2d", [pts_px[2] - 0.15 * dir_b, pts_px[3] + 0.25 * dir_b], width=1.8, color=FIXED, dash=[6.0, 5.0])
        step.polyline("ray-a-2d", [pts_px[3] - 0.12 * dir_a, pts_px[0] + 0.18 * dir_a], width=1.8, color=FIXED, dash=[6.0, 5.0])

    specs = [
        ("P", r"\mathbf{P}", LOAD, np.array([18.0, -20.0])),
        ("C", r"\mathbf{F}_{c}", FREE, np.array([24.0, 18.0])),
        ("B", r"\mathbf{F}_{b}", FIXED, np.array([26.0, 2.0])),
        ("A", r"\mathbf{F}_{a}", FIXED, np.array([-18.0, -22.0])),
    ]
    for idx in range(upto_edge):
        key, tex, col, off = specs[idx]
        p0, p1 = pts_px[idx], pts_px[idx + 1]
        step.arrow(f"poly2d-{key}", p0, p1, width=4.8, color=col)
        step.math(f"poly2d-lbl-{key}", tex, 0.5 * (p0 + p1) + off, label_size, col, center=True)

    for v_idx in range(min(upto_edge + 1, 4)):
        step.point(f"poly2d-v{v_idx}", pts_px[v_idx], radius=4.2, color=INK)
    return pts_px


def center_text(step, name, text, xy, size, color):
    step.text(name, text, xy, size, color)
    step._texts[-1]["center"] = True


def make_deck(solution, traces, truss, mobile=False):
    width = 760 if mobile else 1600
    height = 1220 if mobile else 760
    split = 0.80 if mobile else 0.56
    deck = Presentation(
        "Föppl · Spatial joint equilibrium",
        width=width,
        height=height,
        dark=True,
        stroke_scale=1.0,
        head_scale=0.68 if mobile else 0.72,
        spatial_split=split,
    )

    lbl3d = 14.0 if mobile else 24.0
    eq_sz = 23.0 if mobile else 30.0
    sm_sz = 19.0 if mobile else 24.0
    rx = 68.0 if mobile else 950.0

    def cap(desktop_text, mobile_text):
        return mobile_text if mobile else desktop_text

    def ttl(desktop_title, mobile_title):
        return mobile_title if mobile else desktop_title

    origin = traces.origin
    poly = solution.polygon  # V0(0,0,0), V1=P, V2=P+Fc=R_cP, V3=V2+Fb, V4=0
    fa = solution.forces[0] * solution.directions[0]  # (-4, -2, 4)
    fb = solution.forces[1] * solution.directions[1]  # ( 1,  2, 2)
    fc = solution.forces[2] * solution.directions[2]  # (-2,  1,-2)

    # =========================================================================
    # SLIDE 1 — Equilibrium
    # =========================================================================
    t1 = ttl("1 Equilibrium", "1 Equilibrium")
    s1 = deck.topic(t1).step(
        t1,
        cap(
            "Three bar forces and the external load form a closed spatial polygon.",
            "Closed 3D force polygon at joint O.",
        ),
    )
    add_ground_grid(s1)
    add_tripod_base(s1, traces, bar_colors={"A": DIM, "B": DIM, "C": DIM}, bar_width=2.8, show_bar_labels=False, show_load=False, label_size=lbl3d, mobile=mobile)

    vec_scale_3d = 0.34
    f_specs = [
        ("P", JOINT_LOAD, LOAD, np.array([0.28, -0.22, -0.10])),
        ("C", fc, FREE, np.array([-0.28, 0.22, -0.14])),
        ("B", fb, FIXED, np.array([0.24, 0.24, 0.16])),
        ("A", fa, FIXED, np.array([-0.28, -0.22, 0.18])),
    ]
    for key, vec, col, off in f_specs:
        end3 = origin + vec_scale_3d * vec
        s1.arrow3d(f"f3d-{key}", origin, end3, width=4.8, color=col)
        tex = r"\mathbf{P}" if key == "P" else rf"\mathbf{{F}}_{{{key.lower()}}}"
        s1.math3d(f"f3d-lbl-{key}", tex, end3 + off, lbl3d, col)

    if not mobile:
        draw_2d_polygon_panel(s1, poly, center_xy=(1235.0, 330.0), scale_px=42.0, upto_edge=4, show_diag=False, label_size=26.0)
        for idx, (key, _, _, _) in enumerate(f_specs):
            s1.morph(f"f3d-{key}", f"poly2d-{key}", duration_ms=1150, delay_ms=idx * 850)
        s1.math("eq-sum", r"\mathbf{F}_{a}+\mathbf{F}_{b}+\mathbf{F}_{c}+\mathbf{P}=\mathbf{0}", (1235, 600), eq_sz, INK, center=True)
        s1.animate("eq-sum", "grow", duration=700)
    else:
        s1.math("eq-sum-m", r"\mathbf{F}_{a}+\mathbf{F}_{b}+\mathbf{F}_{c}+\mathbf{P}=\mathbf{0}", (380, 290), eq_sz + 1, INK, center=True)
        s1.math("eq-sub-m", r"\text{Pink: tension (+)}\quad\text{Blue: compression (-)}\quad\text{Green: }\mathbf{P}", (380, 990), 18, MUTED, center=True)

    # =========================================================================
    # SLIDE 2 — Given
    # =========================================================================
    t2 = ttl("2 Given", "2 Given")
    s2 = deck.topic(t2).step(
        t2,
        cap(
            "Anchor coordinates and load P are known; signed stresses A, B, C are unknown.",
            "Known geometry & load P; find A, B, C.",
        ),
    )
    add_ground_grid(s2)
    add_tripod_base(s2, traces, bar_colors={"A": INK, "B": INK, "C": INK}, bar_width=4.8, label_size=lbl3d, mobile=mobile)

    if not mobile:
        s2.math("g-joint", r"O=(0,0,2),\quad \mathbf{P}=(5,-1,-4)", (rx, 185), eq_sz - 2, LOAD)
        s2.math("g-anc-a", r"A=(2,1,0),\quad B=(-1,-2,0)", (rx, 260), sm_sz + 1, FIXED)
        s2.math("g-anc-c", r"C=(-2,1,0)\quad\text{on datum }z=0", (rx, 320), sm_sz + 1, FIXED)
        s2.math("g-eq", r"A\mathbf{a}+B\mathbf{b}+C\mathbf{c}+\mathbf{P}=\mathbf{0}", (rx, 430), eq_sz + 2, INK)
        s2.text("g-unk", "Unknowns: scalar stresses A, B, C", (rx, 520), sm_sz, FREE)
        s2.text("g-conv", "Tension (+) pulls O toward anchor; compression (−) pushes.", (rx, 575), 20, MUTED)
    else:
        s2.math("g-eq-m", r"A\mathbf{a}+B\mathbf{b}+C\mathbf{c}+\mathbf{P}=\mathbf{0}", (380, 285), eq_sz + 1, INK, center=True)
        s2.math("g-joint-m", r"O=(0,0,2),\quad \mathbf{P}=(5,-1,-4)", (380, 350), sm_sz + 1, LOAD, center=True)
        s2.math("g-unk-m", r"\text{Unknown stresses: }A,B,C\quad(+\text{ tension, }-\text{ compression})", (380, 990), 18, FREE, center=True)

    # =========================================================================
    # SLIDE 3 — Direction cosines (Föppl §20 eq. 9)
    # =========================================================================
    t3 = ttl("3 Direction cosines", "3 Unit vectors")
    s3 = deck.topic(t3).step(
        t3,
        cap(
            "One bar, one coordinate box: length 3 gives the unit vector a away from O.",
            "Coordinate box gives unit bar vector a.",
        ),
    )
    add_ground_grid(s3)
    s3.line3d("dim-b", origin, traces.anchors["B"], width=2.0, color=DIM)
    s3.line3d("dim-c", origin, traces.anchors["C"], width=2.0, color=DIM)
    s3.point3d("joint-O", origin, radius=6.5, color=FREE)
    s3.math3d("label-O", "O", origin + np.array([-0.18, 0.18, 0.30]), lbl3d, FREE)
    A0 = traces.anchors["A"]
    s3.point3d("anchor-A", A0, radius=6.0, color=FIXED)
    s3.math3d("anchor-lbl-A", "A", A0 + np.array([0.30, 0.24, 0.18 if mobile else 0.10]), lbl3d, FIXED)
    s3.arrow3d("bar-a-unit", origin, A0, width=5.4, color=INK)
    s3.math3d("lbl-la", "l_{a}=3", 0.5 * (origin + A0) + np.array([-0.28, -0.22, -0.10 if mobile else -0.20]), lbl3d - 1, INK)

    p_x = np.array([2.0, 0.0, 2.0])
    p_xy = np.array([2.0, 1.0, 2.0])
    s3.arrow3d("comp-x", origin, p_x, width=4.0, color=AXIS_X)
    s3.arrow3d("comp-y", p_x, p_xy, width=4.0, color=AXIS_Y)
    s3.arrow3d("comp-z", p_xy, A0, width=4.0, color=AXIS_Z)
    s3.math3d("lbl-dx", "+2", 0.5 * (origin + p_x) + np.array([-0.10, 0.22, 0.22]), lbl3d - 2, AXIS_X)
    s3.math3d("lbl-dy", "+1", 0.5 * (p_x + p_xy) + np.array([0.30, 0.08, 0.18]), lbl3d - 2, AXIS_Y)
    s3.math3d("lbl-dz", "-2", np.array([2.48, 0.72, 0.95]), lbl3d - 2, AXIS_Z)

    box_pts = [
        (origin, [0, 1, 2]), ([0, 1, 2], p_xy), (origin, [0, 0, 0]), ([0, 0, 0], [2, 0, 0]),
        ([2, 0, 0], A0), ([2, 0, 0], p_x), ([0, 0, 0], [0, 1, 0]), ([0, 1, 0], A0), ([0, 1, 2], [0, 1, 0]),
    ]
    for bi, (u0, u1) in enumerate(box_pts):
        s3.polyline3d(f"box-{bi}", [u0, u1], width=1.1, color=DIM, dash=[0.12, 0.10])

    s3.animate("comp-x", "grow", duration=650)
    s3.animate("comp-y", "grow", duration=650)
    s3.animate("comp-z", "grow", duration=650)

    if not mobile:
        s3.math("dc-len", r"l_{a}=\sqrt{2^{2}+1^{2}+(-2)^{2}}=3", (rx, 200), eq_sz - 1, INK)
        s3.math("dc-vec", r"\mathbf{a}=\dfrac{\mathbf{x}_{A}-\mathbf{x}_{O}}{l_{a}}=\left(\dfrac{2}{3},\dfrac{1}{3},-\dfrac{2}{3}\right)", (rx, 325), eq_sz - 2, INK)
        s3.math("dc-force", r"\mathbf{F}_{a}=A\mathbf{a}\quad\text{(Föppl §20, eq. 9)}", (rx, 465), eq_sz - 2, FREE)
        s3.math("dc-bc", r"l_{b}=3,\quad l_{c}=3\quad\text{(all three lengths exact)}", (rx, 555), sm_sz - 1, MUTED)
    else:
        s3.math("dc-len-m", r"l_{a}=\sqrt{2^{2}+1^{2}+(-2)^{2}}=3", (380, 295), eq_sz - 1, INK, center=True)
        s3.math("dc-vec-m", r"\mathbf{a}=\left(\dfrac{2}{3},\dfrac{1}{3},-\dfrac{2}{3}\right),\quad \mathbf{F}_{a}=A\mathbf{a}", (380, 990), eq_sz - 2, INK, center=True)

    # =========================================================================
    # SLIDE 4 — Pair the four forces (Föppl §23 core idea)
    # =========================================================================
    t4 = ttl("4 Pair the four forces", "4 Force pairing")
    s4 = deck.topic(t4).step(
        t4,
        cap(
            "Split the balance into (A, B) and (C, P): their resultants must be opposite and collinear.",
            "Both resultants share intersection line d.",
        ),
    )
    add_ground_grid(s4)
    add_tripod_base(s4, traces, bar_colors={"A": FIXED, "B": FIXED, "C": LOAD}, bar_width=4.8, label_size=lbl3d, mobile=mobile)
    ot = traces.trace_intersection - origin
    s4.polyline3d("line-d-preview", [origin - 0.55 * ot, origin + 0.85 * ot], width=2.4, color=AMBER, dash=[0.18, 0.10])
    s4.arrow3d("res-cp-3d", origin, origin + 0.24 * solution.resultant_cp, width=5.2, color=AMBER)
    s4.arrow3d("res-ab-3d", origin, origin + 0.24 * solution.resultant_ab, width=5.2, color=AMBER)
    s4.math3d("lbl-rcp", r"\mathbf{R}_{cP}", origin + 0.24 * solution.resultant_cp + np.array([0.22, -0.18, 0.08 if mobile else -0.22]), lbl3d, AMBER)
    s4.math3d("lbl-rab", r"\mathbf{R}_{ab}", origin + 0.24 * solution.resultant_ab + np.array([-0.28, 0.20, 0.16]), lbl3d, AMBER)
    s4.animate("res-cp-3d", "grow", duration=750)
    s4.animate("res-ab-3d", "grow", duration=750)

    if not mobile:
        s4.math("p4-1", r"\mathbf{R}_{ab}=A\mathbf{a}+B\mathbf{b}\quad\text{(in plane of }a,b\text{)}", (rx, 195), eq_sz - 2, FIXED)
        s4.math("p4-2", r"\mathbf{R}_{cP}=C\mathbf{c}+\mathbf{P}\quad\text{(in plane of }c,\mathbf{P}\text{)}", (rx, 285), eq_sz - 2, LOAD)
        s4.math("p4-3", r"\mathbf{R}_{ab}+\mathbf{R}_{cP}=\mathbf{0}\quad\longrightarrow\quad\mathbf{R}_{ab}=-\mathbf{R}_{cP}", (rx, 405), eq_sz - 1, AMBER)
        s4.text("p4-4", "To lie in BOTH planes at once, both resultants", (rx, 505), sm_sz, INK)
        s4.text("p4-5", "must act along the plane intersection line d.", (rx, 548), sm_sz, AMBER)
    else:
        s4.math("p4-1m", r"\mathbf{R}_{ab}=A\mathbf{a}+B\mathbf{b},\quad \mathbf{R}_{cP}=C\mathbf{c}+\mathbf{P}", (380, 295), sm_sz + 2, INK, center=True)
        s4.math("p4-3m", r"\mathbf{R}_{ab}=-\mathbf{R}_{cP}\quad\longrightarrow\quad\text{both on }d=\Pi_{ab}\cap\Pi_{cP}", (380, 990), sm_sz + 1, AMBER, center=True)

    # =========================================================================
    # SLIDE 5 — Plane ab and trace ab (Föppl Fig. 2, step 1)
    # =========================================================================
    t5 = ttl("5 Plane ab and trace ab", "5 Plane ab")
    s5 = deck.topic(t5).step(
        t5,
        cap(
            "Bars a and b pierce the ground plane z = 0 at A and B, defining trace line ab.",
            "Plane ab pierces ground z = 0 along ab.",
        ),
    )
    add_ground_grid(s5)
    add_tripod_base(s5, traces, bar_colors={"A": FIXED, "B": FIXED, "C": DIM}, bar_width=4.6, show_load=False, label_size=lbl3d, mobile=mobile)
    add_planes_and_traces(s5, traces, show_ab=True, show_cp=False, show_d=False, label_size=lbl3d, mobile=mobile)
    s5.math3d("lbl-pi-ab", r"\Pi_{ab}", np.array([0.45, -0.55, 0.95]), lbl3d + 2, FIXED)

    if not mobile:
        s5.math("s5-1", r"\Pi_{ab}=\mathrm{span}(\mathbf{a},\mathbf{b})\text{ through }O", (rx, 200), eq_sz - 1, FIXED)
        s5.math("s5-2", r"a\cap(z=0)=A(2,1,0)", (rx, 300), sm_sz + 2, INK)
        s5.math("s5-3", r"b\cap(z=0)=B(-1,-2,0)", (rx, 365), sm_sz + 2, INK)
        s5.math("s5-4", r"\text{Ground trace }ab:\quad x-y=1", (rx, 465), eq_sz - 1, FIXED)
        s5.math("s5-5", r"\mathbf{n}_{ab}=\mathbf{a}\times\mathbf{b}", (rx, 555), sm_sz + 1, MUTED)
    else:
        s5.math("s5-1m", r"\Pi_{ab}\text{ pierces }z=0\text{ at }A(2,1,0),\;B(-1,-2,0)".replace(r"\;", " "), (380, 295), sm_sz + 1, INK, center=True)
        s5.math("s5-4m", r"\text{Ground trace }ab:\quad x-y=1", (380, 990), eq_sz, FIXED, center=True)

    # =========================================================================
    # SLIDE 6 — Plane cP and intersection line d = OT (Föppl Fig. 2, step 2)
    # =========================================================================
    t6 = ttl("6 Plane cP and line d", "6 Plane cP & d")
    s6 = deck.topic(t6).step(
        t6,
        cap(
            "Traces ab and cP cross at T(1, 0, 0); joining O to T gives the intersection line d.",
            "Traces ab and cP cross at T; line d = OT.",
        ),
    )
    add_ground_grid(s6)
    add_tripod_base(s6, traces, bar_colors={"A": FIXED, "B": FIXED, "C": LOAD}, bar_width=4.4, label_size=lbl3d, mobile=mobile)
    add_planes_and_traces(s6, traces, show_ab=True, show_cp=True, show_d=True, label_size=lbl3d, mobile=mobile)
    s6.animate("line-d", "grow", duration=850)

    if not mobile:
        s6.math("s6-1", r"\mathbf{P}\text{ pierces }z=0\text{ at }P_{0}=(2.5,-0.5,0)", (rx, 185), sm_sz + 1, LOAD)
        s6.math("s6-2", r"\text{Trace }cP\text{ meets trace }ab\text{ at }T=(1,0,0)", (rx, 275), eq_sz - 2, AMBER)
        s6.math("s6-3", r"\mathbf{d}_{OT}=\mathbf{x}_{T}-\mathbf{x}_{O}=(1,0,-2)", (rx, 380), eq_sz, AMBER)
        s6.math("s6-4", r"\mathbf{n}_{ab}\times\mathbf{n}_{cP}\text{ gives the same direction }\mathbf{d}_{OT}", (rx, 475), sm_sz + 1, INK)
        s6.text("s6-5", "Line OT = d is known before solving any force!", (rx, 565), 22, MUTED)
    else:
        s6.math("s6-2m", r"T = ab \cap cP = (1,0,0)", (380, 295), eq_sz, AMBER, center=True)
        s6.math("s6-3m", r"\mathbf{d}_{OT}=\mathbf{x}_{T}-\mathbf{x}_{O}=(1,0,-2)", (380, 990), eq_sz - 1, AMBER, center=True)

    # =========================================================================
    # SLIDE 7 — First force triangle in Pi_cP: solve C and R_cP (Fig. 2a, part 1)
    # =========================================================================
    t7 = ttl("7 First triangle: P, C, R", "7 Triangle P, C, R")
    s7 = deck.topic(t7).step(
        t7,
        cap(
            "In plane cP, draw parallels to c and d from the ends of known P to find C and R.",
            "Plane cP: parallels to c and d give C, R.",
        ),
    )
    add_tri_surface(s7, "tri1-face", poly[0], poly[1], poly[2], PLANE_CP, "#4acb6a55")
    s7.arrow3d("tri1-P", poly[0], poly[1], width=5.2, color=LOAD)
    s7.arrow3d("tri1-C", poly[1], poly[2], width=5.2, color=FREE)
    s7.arrow3d("tri1-R", poly[0], poly[2], width=4.6, color=AMBER)
    s7.point3d("v0", poly[0], radius=5.5, color=INK)
    s7.point3d("v1", poly[1], radius=5.5, color=INK)
    s7.point3d("v2", poly[2], radius=6.0, color=AMBER)
    s7.math3d("t1-lbl-P", r"\mathbf{P}", 0.5 * (poly[0] + poly[1]) + np.array([0.35, -0.30, 0.32]), lbl3d + 2, LOAD)
    s7.math3d("t1-lbl-C", r"\mathbf{F}_{c}", 0.65 * poly[1] + 0.35 * poly[2] + np.array([0.45, 0.22, 0.15]), lbl3d + 2, FREE)
    s7.math3d("t1-lbl-R", r"\mathbf{R}_{cP}\text{ on }d", 0.5 * (poly[0] + poly[2]) + np.array([-0.55, 0.25, -0.05]), lbl3d + 1, AMBER)
    s7.animate("tri1-C", "grow", duration=750)
    s7.animate("tri1-R", "grow", duration=750)

    if not mobile:
        draw_2d_polygon_panel(s7, poly, center_xy=(1235.0, 270.0), scale_px=34.0, upto_edge=2, show_diag=True, show_construction="tri1", label_size=24.0)
        s7.math("s7-1", r"\mathbf{P}+C\mathbf{c}=\mathbf{R}_{cP}=k\mathbf{d}_{OT}", (rx, 470), eq_sz - 2, INK)
        s7.math("s7-2", r"C=+3\text{ (tension: pulls }O\longrightarrow C\text{)},\quad \mathbf{F}_{c}=(-2,1,-2)", (rx, 545), sm_sz - 1, FREE)
        s7.math("s7-3", r"\mathbf{R}_{cP}=3\mathbf{d}_{OT}=(3,0,-6)", (rx, 610), sm_sz + 1, AMBER)
    else:
        s7.math("s7-1m", r"\mathbf{P}+C\mathbf{c}=\mathbf{R}_{cP}=3\mathbf{d}_{OT}", (380, 295), eq_sz, INK, center=True)
        s7.math("s7-2m", r"C=+3\text{ (tension)},\quad \mathbf{R}_{cP}=(3,0,-6)", (380, 990), sm_sz + 2, FREE, center=True)

    # =========================================================================
    # SLIDE 8 — Second force triangle in Pi_ab: solve B and A (Fig. 2a, part 2)
    # =========================================================================
    t8 = ttl("8 Second triangle: R, B, A", "8 Triangle R, B, A")
    s8 = deck.topic(t8).step(
        t8,
        cap(
            "Attach the second triangle in plane ab along shared diagonal R to solve B and A.",
            "Plane ab: attach along R to solve B, A.",
        ),
    )
    add_tri_surface(s8, "tri1-face-8", poly[0], poly[1], poly[2], PLANE_CP, "#4acb6a44")
    add_tri_surface(s8, "tri2-face-8", poly[0], poly[2], poly[3], PLANE_AB, "#62a0ff55")
    s8.polyline3d("hinge-R", [poly[0], poly[2]], width=3.6, color=AMBER, dash=[0.22, 0.12])
    s8.arrow3d("q-P", poly[0], poly[1], width=5.0, color=LOAD)
    s8.arrow3d("q-C", poly[1], poly[2], width=5.0, color=FREE)
    s8.arrow3d("q-B", poly[2], poly[3], width=5.2, color=FIXED)
    s8.arrow3d("q-A", poly[3], poly[4], width=5.2, color=FIXED)
    for vi in range(4):
        s8.point3d(f"qv-{vi}", poly[vi], radius=5.2, color=INK)
    s8.math3d("ql-P", r"\mathbf{P}", 0.5 * (poly[0] + poly[1]) + np.array([0.35, -0.30, 0.32]), lbl3d + 2, LOAD)
    s8.math3d("ql-C", r"\mathbf{F}_{c}", 0.65 * poly[1] + 0.35 * poly[2] + np.array([0.45, 0.22, 0.15]), lbl3d + 2, FREE)
    s8.math3d("ql-B", r"\mathbf{F}_{b}", 0.40 * poly[2] + 0.60 * poly[3] + np.array([0.32, 0.22, 0.18]), lbl3d + 2, FIXED)
    s8.math3d("ql-A", r"\mathbf{F}_{a}", 0.5 * (poly[3] + poly[4]) + np.array([-0.28, 0.38, 0.32]), lbl3d + 2, FIXED)
    s8.math3d("ql-R", r"\mathbf{R}", 0.5 * (poly[0] + poly[2]) + np.array([-0.52, 0.18, 0.08]), lbl3d + 2, AMBER)
    s8.animate("q-B", "grow", duration=750)
    s8.animate("q-A", "grow", duration=750)

    if not mobile:
        draw_2d_polygon_panel(s8, poly, center_xy=(1235.0, 265.0), scale_px=34.0, upto_edge=4, show_diag=True, show_construction="tri2", label_size=24.0)
        s8.math("s8-1", r"B\mathbf{b}+A\mathbf{a}=\mathbf{R}_{ab}=-\mathbf{R}_{cP}=(-3,0,6)", (rx, 465), sm_sz + 1, AMBER)
        s8.math("s8-2", r"B=-3\text{ (compression)},\quad \mathbf{F}_{b}=(1,2,2)", (rx, 535), sm_sz, FIXED)
        s8.math("s8-3", r"A=-6\text{ (compression)},\quad \mathbf{F}_{a}=(-4,-2,4)", (rx, 600), sm_sz, FIXED)
    else:
        s8.math("s8-1m", r"B\mathbf{b}+A\mathbf{a}=-\mathbf{R}_{cP}=(-3,0,6)", (380, 295), eq_sz - 1, AMBER, center=True)
        s8.math("s8-2m", r"B=-3,\quad A=-6\quad\text{(both compression)}", (380, 990), eq_sz - 1, FIXED, center=True)

    # =========================================================================
    # SLIDE 9 — Elevation, plan & true 3D length (Föppl Fig. 2a check)
    # =========================================================================
    t9 = ttl("9 Elevation, plan & true length", "9 Monge views")
    s9 = deck.topic(t9).step(
        t9,
        cap(
            "Matching corners align vertically in elevation and plan; true 3D lengths give magnitudes.",
            "Vertical projectors & true 3D lengths.",
        ),
    )
    z_floor = -8.2 if mobile else -9.6
    add_tri_surface(s9, "s9-f1", poly[0], poly[1], poly[2], PLANE_CP)
    add_tri_surface(s9, "s9-f2", poly[0], poly[2], poly[3], PLANE_AB)
    s9.polyline3d("s9-R", [poly[0], poly[2]], width=2.8, color=AMBER, dash=[0.20, 0.12])
    for idx, (key, col) in enumerate([("P", LOAD), ("C", FREE), ("B", FIXED), ("A", FIXED)]):
        p0, p1 = poly[idx], poly[idx + 1]
        s9.arrow3d(f"s9-{key}", p0, p1, width=4.8, color=col)
        s9.arrow3d(f"s9-plan-{key}", [p0[0], p0[1], z_floor], [p1[0], p1[1], z_floor], width=2.8, color=col)
    for vi in range(4):
        pv = poly[vi]
        s9.polyline3d(f"s9-drop-{vi}", [pv, [pv[0], pv[1], z_floor]], width=1.2, color=DIM, dash=[0.16, 0.12])

    m_scale = 54.0
    x_left = 1045.0
    y_elev_0 = 136.0
    y_plan_0 = 504.0
    s_z = 27.0
    s_y = 32.0

    def elev_xy(pt):
        return (x_left + pt[0] * m_scale, y_elev_0 - pt[2] * s_z)

    def plan_xy(pt):
        return (x_left + pt[0] * m_scale, y_plan_0 - pt[1] * s_y)

    if not mobile:
        s9.text("monge-e-lbl", "Elevation (x–z)", (940, 88), 20, MUTED)
        s9.text("monge-p-lbl", "Plan (x–y)", (940, 412), 20, MUTED)
        s9.polyline("ground-line", [(940, 382), (1495, 382)], width=1.6, color=MUTED, dash=[12.0, 5.0, 3.0, 5.0])
        for vi in range(4):
            pe = elev_xy(poly[vi])
            pp = plan_xy(poly[vi])
            s9.polyline(f"proj-v-{vi}", [pe, pp], width=1.4, color=DIM, dash=[5.0, 5.0])
            s9.point(f"pe-{vi}", pe, radius=3.8, color=INK)
            s9.point(f"pp-{vi}", pp, radius=3.8, color=INK)
        s9.polyline("elev-R", [elev_xy(poly[0]), elev_xy(poly[2])], width=2.0, color=AMBER, dash=[7.0, 5.0])
        s9.polyline("plan-R", [plan_xy(poly[0]), plan_xy(poly[2])], width=2.0, color=AMBER, dash=[7.0, 5.0])
        for idx, (key, col) in enumerate([("P", LOAD), ("C", FREE), ("B", FIXED), ("A", FIXED)]):
            s9.arrow(f"elev-{key}", elev_xy(poly[idx]), elev_xy(poly[idx + 1]), width=3.8, color=col)
            s9.arrow(f"plan-{key}", plan_xy(poly[idx]), plan_xy(poly[idx + 1]), width=3.8, color=col)
        s9.math("true-len", r"|A|=|\mathbf{F}_{a}|_{3\mathrm{D}}=\sqrt{(-4)^{2}+(-2)^{2}+4^{2}}=6", (940, 628), 24, INK)
    else:
        s9.math("true-len-m1", r"x\text{-projectors align corners: }x=(0,5,3,4)", (380, 290), 20, MUTED, center=True)
        s9.math("true-len-m2", r"|A|=\sqrt{(-4)^{2}+(-2)^{2}+4^{2}}=6,\quad |B|=3,\quad |C|=3", (380, 990), 20, INK, center=True)

    # =========================================================================
    # SLIDE 10 — Joint matrix check (Föppl §20 eq. 11)
    # =========================================================================
    t10 = ttl("10 Joint matrix check", "10 Matrix check")
    s10 = deck.topic(t10).step(
        t10,
        cap(
            "The graphical construction solves the exact 3 × 3 direction-cosine system Ds = −P.",
            "Exact 3 × 3 direction-cosine system Ds = −P.",
        ),
    )
    add_ground_grid(s10)
    add_tripod_base(s10, traces, bar_colors={"A": FIXED, "B": FIXED, "C": FREE}, bar_width=5.2, show_bar_labels=False, label_size=lbl3d, mobile=mobile)
    s10.math3d("val-a", "A=-6", 0.5 * (origin + traces.anchors["A"]) + np.array([0.42, -0.22, -0.06]), lbl3d, FIXED)
    s10.math3d("val-b", "B=-3", 0.5 * (origin + traces.anchors["B"]) + np.array([-0.42, -0.18, 0.16]), lbl3d, FIXED)
    s10.math3d("val-c", "C=+3", 0.5 * (origin + traces.anchors["C"]) + np.array([-0.44, 0.28, 0.22]), lbl3d, FREE)

    mat_3D = [[2, -1, -2], [1, -2, 1], [-2, -2, -2]]
    vec_s = [[-6], [-3], [3]]
    vec_rhs = [[-15], [3], [12]]

    if not mobile:
        s10.math("m10-eq", r"(3\mathbf{D})\mathbf{s}=-3\mathbf{P}", (rx, 155), eq_sz, INK)
        add_matrix_card(s10, "D3", mat_3D, (1000, 265), cell=62.0, title=r"3\mathbf{D}", title_offset=(1040, 205), colored=lambda r, c, v: False)
        s10.math("m10-times", r"\times", (1188, 327), 28, INK, center=True)
        add_matrix_card(s10, "svec", vec_s, (1252, 265), cell=62.0, title=r"\mathbf{s}", title_offset=(1252, 205))
        s10.math("m10-equals", "=", (1330, 327), 28, INK, center=True)
        add_matrix_card(s10, "rhs3", vec_rhs, (1395, 265), cell=62.0, title=r"-3\mathbf{P}", title_offset=(1372, 205), colored=lambda r, c, v: False)
        s10.math("m10-chk-x", r"\sum F_{x}:\quad -4+1-2+5=0", (rx, 495), sm_sz, INK)
        s10.math("m10-chk-y", r"\sum F_{y}:\quad -2+2+1-1=0", (rx, 548), sm_sz, INK)
        s10.math("m10-chk-z", r"\sum F_{z}:\quad +4+2-2-4=0", (rx, 601), sm_sz, INK)
    else:
        add_matrix_card(s10, "D3m", mat_3D, (220, 278), cell=42.0, colored=lambda r, c, v: False)
        s10.math("m10-tm", r"\times", (354, 320), 22, INK, center=True)
        add_matrix_card(s10, "svecm", vec_s, (408, 278), cell=42.0)
        s10.math("m10-em", "=", (466, 320), 22, INK, center=True)
        add_matrix_card(s10, "rhs3m", vec_rhs, (522, 278), cell=42.0, colored=lambda r, c, v: False)
        s10.math("m10-eq-m", r"(3\mathbf{D})\mathbf{s}=-3\mathbf{P}\quad\longrightarrow\quad\mathbf{s}=[-6,-3,+3]^{T}", (380, 990), 20, INK, center=True)

    # =========================================================================
    # SLIDE 11 — Space truss: joint by joint (Föppl §23 p. 36)
    # =========================================================================
    t11 = ttl("11 Space truss: joint by joint", "11 Six-bar truss")
    s11 = deck.topic(t11).step(
        t11,
        cap(
            "Solve degree-3 tip joint E first, pass tie force DE to joint D, then solve D.",
            "Solve tip E first, pass DE to joint D.",
        ),
    )
    add_ground_grid(s11)
    tnodes = truss.nodes
    node_offs = {
        "A": np.array([0.36, -0.26, 0.14 if mobile else -0.08]),
        "B": np.array([-0.46, 0.22, 0.58 if mobile else 0.36]),
        "C": np.array([-0.36, 0.24, 0.22 if mobile else 0.14]),
        "D": np.array([-0.24, 0.22, 0.26]),
        "E": np.array([0.28, -0.22, 0.26]),
    }
    for idx, (bname, u, v) in enumerate(truss.bars):
        col = FIXED if truss.forces[idx] < 0 else FREE
        w = 5.4 if "E" in bname else 3.8
        s11.line3d(f"t11-{bname}", tnodes[u], tnodes[v], width=w, color=col)
    for k in ("A", "B", "C"):
        s11.point3d(f"t11-n-{k}", tnodes[k], radius=5.5, color=FIXED)
        s11.math3d(f"t11-l-{k}", k, tnodes[k] + node_offs[k], lbl3d - 1, FIXED)
    for k in ("D", "E"):
        s11.point3d(f"t11-n-{k}", tnodes[k], radius=6.8, color=FREE)
        s11.math3d(f"t11-l-{k}", k, tnodes[k] + node_offs[k], lbl3d + 1, FREE)
        lvec = 0.22 * truss.loads[k]
        s11.arrow3d(f"t11-load-{k}", tnodes[k], tnodes[k] + lvec, width=4.4, color=LOAD)
    pull_end = tnodes["D"] + 0.60 * (tnodes["E"] - tnodes["D"])
    s11.arrow3d("t11-transfer", tnodes["D"], pull_end, width=4.4, color=AMBER)
    s11.math3d("t11-tr-lbl", r"S_{DE}\mathbf{u}_{ED}", pull_end + np.array([0.05, 0.26, 0.24]), lbl3d - 1, AMBER)
    s11.animate("t11-transfer", "grow", duration=850)

    if not mobile:
        s11.math("s11-0", r"m=3n_{f}=6\text{ bars}\quad(n_{f}=2\text{ free joints }E,D)", (rx, 155), sm_sz + 2, INK)
        s11.math("s11-h1", r"\text{1. Solve tip joint }E\text{ first (3 bars }AE,BE,DE\text{):}", (rx, 240), 22, FREE)
        s11.math("s11-e", r"S_{AE}=-4.71,\quad S_{BE}=-4.99,\quad S_{DE}=+4.47", (rx, 294), sm_sz, INK)
        s11.math("s11-h2", r"\text{2. Pass tie pull }DE=(4,-2,0)\text{ to joint }D\text{:}", (rx, 392), 22, AMBER)
        s11.math("s11-pd", r"\mathbf{p}_{D}^{\mathrm{eff}}=(0,0,-4)+(4,-2,0)=(4,-2,-4)", (rx, 452), sm_sz - 1, AMBER)
        s11.math("s11-h3", r"\text{3. Solve joint }D\text{ (3 bars }AD,BD,CD\text{):}", (rx, 544), 22, FIXED)
        s11.math("s11-d", r"S_{AD}=-5,\quad S_{BD}=-4,\quad S_{CD}=+3", (rx, 598), eq_sz - 2, INK)
    else:
        s11.math("s11-m1", r"1.\text{ Joint }E:\quad S_{AE}=-4.71,\quad S_{BE}=-4.99,\quad S_{DE}=+4.47", (380, 295), 19, INK, center=True)
        s11.math("s11-m2", r"2.\text{ Pass }DE\longrightarrow D:\quad S_{AD}=-5,\quad S_{BD}=-4,\quad S_{CD}=+3", (380, 990), 19, AMBER, center=True)

    # =========================================================================
    # SLIDE 12 — Local rule = global matrix (Föppl §§20–21)
    # =========================================================================
    t12 = ttl("12 Local rule = global matrix", "12 Global matrix")
    s12 = deck.topic(t12).step(
        t12,
        cap(
            "Sequential §23 joint solutions and the 6 × 6 global equilibrium matrix match identically.",
            "Local §23 rule matches global 6 × 6 matrix.",
        ),
    )
    add_ground_grid(s12)
    bar_mid_pts = {
        "AD": 0.5 * (tnodes["A"] + tnodes["D"]) + np.array([-0.14, -0.24, -0.10]),
        "BD": 0.45 * tnodes["B"] + 0.55 * tnodes["D"] + np.array([-0.34, -0.16, 0.14]),
        "CD": 0.5 * (tnodes["C"] + tnodes["D"]) + np.array([-0.34, 0.22, 0.16]),
        "AE": 0.5 * (tnodes["A"] + tnodes["E"]) + np.array([0.44, -0.20, 0.04]),
        "BE": 0.30 * tnodes["B"] + 0.70 * tnodes["E"] + np.array([0.32, -0.24, 0.14]),
        "DE": 0.5 * (tnodes["D"] + tnodes["E"]) + np.array([-0.08, 0.24, 0.26]),
    }
    for idx, (bname, u, v) in enumerate(truss.bars):
        val = truss.forces[idx]
        col = FIXED if val < 0 else FREE
        s12.line3d(f"t12-{bname}", tnodes[u], tnodes[v], width=4.8, color=col)
        txt_val = f"{val:+.0f}" if abs(val - round(val)) < 1e-6 else f"{val:+.2f}"
        s12.math3d(f"t12-v-{bname}", txt_val, bar_mid_pts[bname], lbl3d - 1, col)
    for k in ("A", "B", "C"):
        s12.point3d(f"t12-n-{k}", tnodes[k], radius=5.5, color=FIXED)
        s12.math3d(f"t12-l-{k}", k, tnodes[k] + node_offs[k], lbl3d - 1, FIXED)
    for k in ("D", "E"):
        s12.point3d(f"t12-n-{k}", tnodes[k], radius=6.5, color=FREE)
        s12.math3d(f"t12-l-{k}", k, tnodes[k] + node_offs[k], lbl3d, FREE)
        s12.arrow3d(f"t12-load-{k}", tnodes[k], tnodes[k] + 0.22 * truss.loads[k], width=4.2, color=LOAD)

    eq_disp = [[round(float(val), 2) if abs(val) > 1e-9 else 0 for val in row] for row in truss.equilibrium_matrix]
    s_disp = [[int(round(val))] if abs(val - round(val)) < 1e-6 else [round(float(val), 2)] for val in truss.forces]

    if not mobile:
        s12.math("s12-eq", r"\mathbf{A}\mathbf{s}=-\mathbf{p}\quad(\text{local §23}=\text{global §20})", (rx, 148), sm_sz + 2, INK)
        add_matrix_card(
            s12,
            "A6",
            eq_disp,
            (980, 232),
            cell=54.0,
            title=r"\mathbf{A}",
            title_offset=(1095, 188),
            text_scale=0.29,
        )
        s12.math("s12-times", r"\times", (1310, 367), 26, INK, center=True)
        add_matrix_card(
            s12,
            "s6",
            s_disp,
            (1372, 232),
            cell=54.0,
            title=r"\mathbf{s}",
            title_offset=(1372, 188),
            text_scale=0.31,
        )
        bar_names = ["AD", "BD", "CD", "AE", "BE", "DE"]
        for r, bname in enumerate(bar_names):
            col = FIXED if truss.forces[r] < 0 else FREE
            s12.text(f"s12-bn-{bname}", bname, (1438, 240 + r * 54), 19, col)
        s12.math("s12-res", r"|\mathbf{A}\mathbf{s}+\mathbf{p}|_{2}=6.4\times10^{-16}", (rx, 588), 22, MUTED)
    else:
        s_row1 = [[-5, -4, 3]]
        s_row2 = [[-4.71, -4.99, 4.47]]
        s12.math("s12-ml1", r"\text{D }(AD,BD,CD)\text{:}", (215, 292), 18, MUTED, center=True)
        add_matrix_card(s12, "sDm", s_row1, (425, 292), cell=48.0, text_scale=0.31)
        s12.math("s12-ml2", r"\text{E }(AE,BE,DE)\text{:}", (215, 352), 18, MUTED, center=True)
        add_matrix_card(s12, "sEm", s_row2, (425, 352), cell=48.0, text_scale=0.29)
        s12.math("s12-eq-m", r"\mathbf{A}\mathbf{s}=-\mathbf{p}\quad(|\mathbf{A}\mathbf{s}+\mathbf{p}|_{2}<10^{-15})", (380, 990), 20, INK, center=True)

    return deck


def clean_steps(directory: Path):
    steps_dir = directory / "steps"
    if steps_dir.exists():
        shutil.rmtree(steps_dir)


def main(serve_locally=False):
    solution = solve_spatial_joint(JOINT_DIRECTIONS, JOINT_LOAD)
    traces = solve_ground_traces(JOINT_ORIGIN, JOINT_ANCHORS, JOINT_LOAD)
    validate_joint(solution, expected=[-6.0, -3.0, 3.0], traces=traces)
    truss = solve_simple_truss()

    clean_steps(OUTPUT)
    clean_steps(OUTPUT / "mobile")

    deck = make_deck(solution, traces, truss, mobile=False)
    path = deck.write(OUTPUT)
    mobile_deck = make_deck(solution, traces, truss, mobile=True)
    mobile_path = mobile_deck.write(OUTPUT / "mobile")

    try:
        render_method_diagram(solution, traces)
    except ModuleNotFoundError:
        pass
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
