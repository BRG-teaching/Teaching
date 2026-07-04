"""
Interactive COMPAS translation of the GeoGebra applet "Subsystem" (drawing view/1)
Source: https://block.arch.ethz.ch/eq/drawing/view/1  (applet_0/geogebra.xml)

This file contains ONLY the construction logic of this drawing. All viewer/Qt
infrastructure (camera, sliders, dragging, fast buffer updates) lives in the shared
module ``drawings/ggb2compas.py``.

Behaves like the GeoGebra original:
- drag A, B, C, D (on the circle) and F4 directly in the canvas
- side panel with the same controls as the web page
- GeoGebra dynamic colors: blue = compression, red = tension
- the internalForce macro (force-flow rectangles), 1 & 2 symmetrical / mode variants

Not reproduced: the background photo (placed at NaN in the applet) and the hidden
frame "handles" (p_4), which only trim invisible construction lines.

Usage:
    python view_1_compas.py                    # interactive viewer
    python view_1_compas.py --selftest         # check math against geogebra.xml values
    python view_1_compas.py --screenshot p.png # save screenshot(s) and exit (debug)
"""

import math
import os
import sys

from compas.colors import Color
from compas.geometry import Line, Point, intersection_line_line_xy, mirror_points_line

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
from ggb2compas import (  # noqa: E402
    Drawing2D,
    arrow_parts,
    dash_circle_nodes,
    disk_points,
    ggb_angle,
    ggb_color,
    rect_points,
)

# ============================================================================
# state (the free numbers/booleans of the GeoGebra construction)
# ============================================================================

DEFAULTS = {
    "ax": 24.0, "ay": 48.0,               # point A
    "radius": 21.0,                        # slider Radius   [20, 30]
    "th_b": math.atan2(20.99964, -0.123),  # B on circle (angle, ~90.34 deg)
    "th_c": math.radians(210.0),           # C on circle
    "th_d": math.radians(-30.0),           # D on circle
    "f4x": 96.0, "f4y": 58.0,             # point F4 (force diagram pole)
    "F": 5.0,                              # slider F        [1, 10]
    "sFD": 3.2,                            # scaleForceDiagram [1, 5]
    "sLS": 7.0,                            # scaleLoadSymbol   [1, 10]
    "sIF": 0.13,                           # scaleInternalForces [0.01, 1]
    "mode": 0,                             # slider mode 0/1 (flips force diagram)
    "n": False,                            # checkbox "1 & 2 symmetrical"
    "o1": False,                           # checkbox "show internal Forces"
    "o2": False,                           # checkbox "hide external force in force diagram"
    "n4": True,                            # checkbox "show points" (A, G, H)
}
STATE = dict(DEFAULTS)

# frame of the drawing (static polyline in the applet)
FRAME_BL = (-5.208831012957312, 15.25568282774946)
FRAME_TR = (127.35263214113445, 81.53641440479535)

GREEN = Color(0.0, 0.6, 0.0)          # GeoGebra (0, 153, 0), load vectors
GREY = Color(0.6275, 0.6275, 0.6275)  # GeoGebra (160, 160, 160)
WHITE = Color(1.0, 1.0, 1.0)
BLACK = Color(0.0, 0.0, 0.0)

_H_CACHE = Point(82.19, 50.03, 0)  # last valid H, reused if bars 1 and 2 become parallel


# ============================================================================
# the construction (mirrors applet_0/geogebra.xml)
# ============================================================================


def compute(s):
    global _H_CACHE
    A = Point(s["ax"], s["ay"], 0)

    def on_circle(angle):
        return Point(A.x + s["radius"] * math.cos(angle), A.y + s["radius"] * math.sin(angle), 0)

    B, C, D = on_circle(s["th_b"]), on_circle(s["th_c"]), on_circle(s["th_d"])
    Cm = Point(*mirror_points_line([C], Line(A, B))[0])   # C' = Mirror[C, Ray[A, B]]
    F4 = Point(s["f4x"], s["f4y"], 0)
    u = (B - A).unitized()                                # direction of bar 3

    # angles at the node (GeoGebra Angle[B, A, X], ccw in [0, 2pi))
    W13 = ggb_angle(u, C - A)
    b_end = Cm if s["n"] else D                           # outer end of bar 2
    W23 = ggb_angle(u, b_end - A)
    cond = W23 > W13

    # force diagram: G on circle(F4, F*sFD) along the line through F4 parallel to AB
    sign = -1.0 if s["mode"] == 0 else 1.0
    G = F4 + u * (sign * s["F"] * s["sFD"])

    # H = Intersect[i, j]; i parallel to bar 2, j parallel to bar 1 (swapped by cond)
    Pi, Pj = (G, F4) if cond else (F4, G)
    xyz = intersection_line_line_xy(Line(Pi, Pi + (A - b_end)), Line(Pj, Pj + (A - C)))
    _H_CACHE = H = Point(*xyz) if xyz else _H_CACHE

    E = B + u * s["sLS"]                                  # load symbol endpoint above B

    # force-diagram segments (k = force in bar 2, l = force in bar 1)
    seg_k = (G, H) if cond else (H, F4)
    seg_l = (H, F4) if cond else (H, G)

    # dynamic-color angles: internalForce macro -> Angle[Line[node, end], Line[p, q]]
    w3 = ggb_angle(B - A, G - F4)
    w1 = ggb_angle(C - A, F4 - H)
    w1A = ggb_angle(C - A, H - G)
    w2 = ggb_angle(D - A, H - G)
    w2A = ggb_angle(D - A, F4 - H)
    w2S = ggb_angle(Cm - A, H - G)
    w2SA = ggb_angle(Cm - A, F4 - H)
    wb = (w2S if cond else w2SA) if s["n"] else (w2 if cond else w2A)
    wa = w1 if cond else w1A

    # internal-force rectangles: (bar end, force segment, w, visible)
    o1, n = s["o1"], s["n"]
    rects = {
        "V3": (B, (F4, G), w3, o1),
        "V2": (D, (G, H), w2, o1 and cond and not n),
        "V2A": (D, (H, F4), w2A, o1 and not cond and not n),
        "V2S": (Cm, (G, H), w2S, o1 and cond and n),
        "V2SA": (Cm, (H, F4), w2SA, o1 and not cond and n),
        "V1": (C, (H, F4), w1, o1 and cond),
        "V1A": (C, (G, H), w1A, o1 and not cond),
    }

    return {
        "A": A, "B": B, "C": C, "D": D, "Cm": Cm, "F4": F4, "G": G, "H": H, "E": E,
        "b_end": b_end, "W13": W13, "W23": W23,
        "seg_k": seg_k, "seg_l": seg_l,
        "col_3": ggb_color(w3), "col_2": ggb_color(wb), "col_1": ggb_color(wa),
        "rects": rects,
    }


# ----------------------------------------------------------------------------
# what gets drawn, from a computed state (shared by first build and updates)
# ----------------------------------------------------------------------------


def segments(d):
    """(name, start, end, color): the three bars and the closed force polygon."""
    return [
        ("bar3", d["A"], d["B"], d["col_3"]),
        ("bar2", d["b_end"], d["A"], d["col_2"]),
        ("bar1", d["C"], d["A"], d["col_1"]),
        ("force3", d["F4"], d["G"], d["col_3"]),
        ("force2", d["seg_k"][0], d["seg_k"][1], d["col_2"]),
        ("force1", d["seg_l"][0], d["seg_l"][1], d["col_1"]),
    ]


def arrows(d, s):
    """(name, tail, tip, visible): green load vectors u (at node B) and v (F4->G)."""
    tail, tip = (d["B"], d["E"]) if s["mode"] else (d["E"], d["B"])
    return [("u", tail, tip, True), ("v", d["F4"], d["G"], not s["o2"])]


def disks(d, s):
    """(name, center, radius, face, edge, visible): white handles + grey derived points."""
    return [
        ("pt_A", d["A"], 0.65, WHITE, BLACK, s["n4"]),
        ("pt_B", d["B"], 0.65, WHITE, BLACK, True),
        ("pt_C", d["C"], 0.65, WHITE, BLACK, True),
        ("pt_D", d["D"], 0.65, WHITE, BLACK, not s["n"]),
        ("pt_F4", d["F4"], 0.65, WHITE, BLACK, True),
        ("pt_Cm", d["Cm"], 0.42, GREY, GREY, s["n"]),
        ("pt_G", d["G"], 0.42, GREY, GREY, s["n4"]),
        ("pt_H", d["H"], 0.42, GREY, GREY, s["n4"]),
    ]


def labels(d):
    """(name, text, position): bar numbers at midpoints (offsets as in the applet)."""
    def mid(p, q, dx, dy):
        return (0.5 * (p.x + q.x) + dx, 0.5 * (p.y + q.y) + dy)

    return [
        ("f3", "3", mid(d["A"], d["B"], -1.4, -0.9)),
        ("f2", "2", mid(d["b_end"], d["A"], -0.5, 0.6)),
        ("f1", "1", mid(d["C"], d["A"], 0.0, 0.8)),
        ("s3", "3", mid(d["F4"], d["G"], 0.6, -0.1)),
        ("s2", "2", mid(*d["seg_k"], 0.0, -2.0)),
        ("s1", "1", mid(*d["seg_l"], 0.0, 0.9)),
    ]


def rect_halfwidth(force_seg, s):
    """internalForce macro: half-width = scaleInternalForces * |force| / scaleForceDiagram."""
    return s["sIF"] * (force_seg[1] - force_seg[0]).length / s["sFD"]


# ============================================================================
# viewer wiring
# ============================================================================


def build():
    center = (0.5 * (FRAME_BL[0] + FRAME_TR[0]), 0.5 * (FRAME_BL[1] + FRAME_TR[1]))
    dw = Drawing2D(center=center, half_width=76.0)
    d = compute(STATE)

    dw.add_polyline("frame", [FRAME_BL, (FRAME_BL[0], FRAME_TR[1]), FRAME_TR,
                              (FRAME_TR[0], FRAME_BL[1]), FRAME_BL], BLACK)
    dw.add_dashes("circle", dash_circle_nodes(d["A"], STATE["radius"], -0.05), GREY)
    for name, (end, fseg, w, vis) in d["rects"].items():
        dw.add_polygon(name, rect_points(d["A"], end, rect_halfwidth(fseg, STATE), -0.15),
                       ggb_color(w), opacity=0.498, show=vis)
    for name, p0, p1, color in segments(d):
        dw.add_segment(name, p0, p1, color, width=2, z=0.02)
    for name, tail, tip, vis in arrows(d, STATE):
        shaft, head = arrow_parts(tail, tip, 0.06)
        dw.add_segment(name + "_shaft", shaft[0], shaft[1], GREEN, width=5, z=0.06, show=vis)
        dw.add_polygon(name + "_head", head, GREEN, show=vis)
    for name, p, radius, face, edge, vis in disks(d, STATE):
        dw.add_polygon(name, disk_points(p, radius, 0.1), face, linecolor=edge, show=vis)
    dw.add_tag("form_title", "Form Diagram", (0.541, 79.4), height=17)
    dw.add_tag("force_title", "Force Diagram", (71.24, 79.3), height=17)
    for name, text, pos in labels(d):
        dw.add_tag(name, text, pos, align="center")

    def refresh(*_):
        d = compute(STATE)
        for name, p0, p1, color in segments(d):
            dw.set_segment(name, p0, p1, color)
        for name, tail, tip, vis in arrows(d, STATE):
            shaft, head = arrow_parts(tail, tip, 0.06)
            dw.set_segment(name + "_shaft", shaft[0], shaft[1])
            dw.set_polygon(name + "_head", head)
            dw.set_visible(name + "_shaft", vis)
            dw.set_visible(name + "_head", vis)
        dw.set_dashes("circle", dash_circle_nodes(d["A"], STATE["radius"], -0.05))
        for name, (end, fseg, w, vis) in d["rects"].items():
            dw.set_visible(name, vis)
            if vis:  # hidden rectangles get refreshed by the toggle's own refresh()
                dw.set_polygon(name, rect_points(d["A"], end, rect_halfwidth(fseg, STATE), -0.15),
                               ggb_color(w))
        for name, p, radius, _face, _edge, vis in disks(d, STATE):
            dw.set_visible(name, vis)
            if vis:
                dw.set_polygon(name, disk_points(p, radius, 0.1))
        for name, _text, pos in labels(d):
            dw.set_tag(name, pos)
        dw.flush()

    # side panel: same controls as the web page
    def reset(*_):
        STATE.update(DEFAULTS)
        refresh()

    dw.add_button("Return to start", reset)
    dw.add_slider(STATE, "mode", "mode", 0, 1, 1, refresh)
    dw.add_toggle(STATE, "n", "1 & 2 symmetrical", refresh)
    dw.add_toggle(STATE, "o2", "hide external force in force diagram", refresh)
    dw.add_toggle(STATE, "o1", "show internal Forces", refresh)
    dw.add_slider(STATE, "sIF", "scaleInternalForces", 0.01, 1, 0.01, refresh)
    dw.add_slider(STATE, "sFD", "scaleForceDiagram", 1, 5, 0.1, refresh)
    dw.add_slider(STATE, "sLS", "scaleLoadSymbol", 1, 10, 0.1, refresh)
    dw.add_slider(STATE, "F", "F", 1, 10, 0.1, refresh)
    dw.add_slider(STATE, "radius", "Radius", 20, 30, 1, refresh)
    dw.add_toggle(STATE, "n4", "show points", refresh)

    # dragging: A and F4 are free, B/C/D stay on the circle (as in GeoGebra)
    def hit(wx, wy, tolerance):
        d = compute(STATE)
        names = ["B", "C", "F4", "A"] if STATE["n"] else ["B", "C", "D", "F4", "A"]
        best = None
        for name in names:
            dist = math.hypot(d[name].x - wx, d[name].y - wy)
            if dist < tolerance:
                best, tolerance = name, dist
        return best

    def on_drag(name, wx, wy):
        if name == "A":
            STATE["ax"], STATE["ay"] = wx, wy
        elif name == "F4":
            STATE["f4x"], STATE["f4y"] = wx, wy
        else:
            key = {"B": "th_b", "C": "th_c", "D": "th_d"}[name]
            STATE[key] = math.atan2(wy - STATE["ay"], wx - STATE["ax"])
        refresh()

    dw.enable_drag(hit, on_drag)
    dw._refresh = refresh  # debug hook
    return dw


# ============================================================================
# self test against the values saved in applet_0/geogebra.xml
# ============================================================================


def selftest():
    d = compute(dict(DEFAULTS))
    expected = {
        "B": (23.876999724612542, 68.99963978101184),
        "C": (5.8134665205267915, 37.49999999999999),
        "D": (42.18653347947321, 37.50000000000001),
        "Cm": (42.30828382052539, 37.7137595037308),
        "G": (96.0937144955333, 42.000274452562415),
        "H": (82.190688, 50.027190),  # from saved homogeneous coords
        "E": (23.835999632816726, 75.9995197080157),
    }
    ok = True
    for key, (ex, ey) in expected.items():
        if abs(d[key].x - ex) > 1e-4 or abs(d[key].y - ey) > 1e-4:
            print(f"FAIL {key}: got ({d[key].x:.6f}, {d[key].y:.6f}), expected ({ex:.6f}, {ey:.6f})")
            ok = False
    for key, exp in (("W13", 2.0885379129323125), ("W23", 4.182933015325508)):
        if abs(d[key] - exp) > 1e-6:
            print(f"FAIL {key}: got {d[key]:.8f}, expected {exp:.8f}")
            ok = False
    # dynamic colors: all bars in compression -> blue (0, 0, 0.858)
    if not (abs(d["col_3"].b - 0.8584073464102069) < 1e-6 and d["col_3"].r < 1e-9):
        print(f"FAIL color: {d['col_3']}")
        ok = False
    print("selftest:", "PASS" if ok else "FAIL")
    return 0 if ok else 1


def main():
    if "--selftest" in sys.argv:
        sys.exit(selftest())

    dw = build()

    def screenshot_mutate():  # second capture: exercises the dynamic-update path
        STATE.update(o1=True, radius=26.0, th_d=math.radians(-60.0))
        dw._refresh()

    dw.run(screenshot_mutate=screenshot_mutate)


if __name__ == "__main__":
    main()
