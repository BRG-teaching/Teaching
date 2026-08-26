"""Attach the parametric section to drawing 1 for the JSON-driven website.

The ops database (drawings/python/ops/view_1.json) stores the drawing's baked
geometry.  This script adds the WHY, GeoGebra-style:

- each op carries its own formula (`op.define`) — an element IS its rule;
- B, C, D are handles sliding ON the guide circle (constraint read live);
- a handful of rules rebuild the construction (the load along bar 3, the
  parallels through F4 and G, their intersection H) — in any order, the
  viewer sorts the dependency graph;
- the `member` macro colors each bar blue/pink by the sense of its
  force-polygon edge.

The result is written to the website's data folder — dragging B, C or D in
the browser re-solves the whole form AND force diagram.

Run with any COMPAS Python:  python make_view_1_parametric.py
"""

import pathlib
import sys

HERE = pathlib.Path(__file__).resolve().parent
REPO = HERE.parents[1]  # .../Teaching
EQ = REPO / "2_computational_form_finding" / "Equilibrium"   # where eqdraw_ops lives
sys.path.insert(0, str(EQ / "drawings" / "python"))
sys.path.insert(0, str(HERE))

import compas  # noqa: E402
from eqdraw_ops import Drawing  # noqa: E402,F401  (registers the dtypes)
from eqdraw_params import (  # noqa: E402
    at, band, circle, handle, intersection, line, member, midpoint, offset, point, through,
)

drawing = compas.json_load(str(EQ / "drawings" / "python" / "ops" / "view_1.json"))
op = {o.name: o for o in drawing.ops}

LOAD_LEN = 7.0     # length of the load arrow in the form diagram
FORCE_LEN = 16.0   # F4 -> G, the load vector in the force diagram
ASIDE = 2.4258     # the load arrow steps aside from edge 3 (declutter)
BAND_W = 0.65      # width of the answer bands

# ---- each element carries its own formula (GeoGebra-style) ------------------

op["circle"].define = circle("A")
op["bar3"].define = line("A", "B")
op["bar1"].define = line("C", "A")
op["bar2"].define = line("D", "A")
op["load"].define = line("T", "B")            # the load arrow enters at B
op["force3"].define = line("F4", "G")
op["loadF"].define = line("LF1", "LF2")       # its force-diagram twin, aside
op["aux_j"].define = through("J1", "J2")      # dashed parallel to bar 1
op["aux_i"].define = through("K1", "K2")      # dashed parallel to bar 2
op["force2"].define = line("G", "H")
op["force1"].define = line("H", "F4")

op["pt_B"].define = at("B")
op["pt_C"].define = at("C")
op["pt_D"].define = at("D")
op["pt_G"].define = at("G")
op["pt_H"].define = at("H")

op["lbl_B"].define = at("B", 1.4, 1.0)
op["lbl_C"].define = at("C", -2.6, -0.6)
op["lbl_D"].define = at("D", 1.4, -0.6)
op["lbl_G"].define = at("G", 1.4, -1.0)
op["lbl_H"].define = at("H", -0.8, 2.0)
op["f3"].define = at("M3", -1.6, -1.0)        # number labels at midpoints
op["f1"].define = at("M1", 0.0, 1.2)
op["f2"].define = at("M2", -0.6, 1.0)
op["s3"].define = at("MS3", 1.2, -0.1)
op["s2"].define = at("MS2", 0.0, -2.0)
op["s1"].define = at("MS1", 0.0, 1.4)

op["V3"].define = band("A", "B", BAND_W)      # the compression/tension bands
op["V1"].define = band("A", "C", BAND_W)
op["V2"].define = band("A", "D", BAND_W)

# ---- the construction knowledge ---------------------------------------------

drawing.params = {
    "points": [point("A", 24, 48), point("F4", 96, 58)],
    # draggable, sliding ON the guide circle (read live from the circle op)
    "handles": [
        handle("B", op="pt_B", on="circle"),
        handle("C", op="pt_C", on="circle"),
        handle("D", op="pt_D", on="circle"),
    ],
    # any order — the viewer sorts the dependency graph
    "rules": [
        offset("T", "B", "A", "B", LOAD_LEN),           # load tail beyond B
        offset("G", "F4", "B", "A", FORCE_LEN),         # the load vector
        intersection("H", "F4", "C", "A", "G", "D", "A"),
        # the load vector steps aside from edge 3, away from the polygon
        offset("LF1", "F4", "A", "B", ASIDE, rotate=-90, away_from="H"),
        offset("LF2", "G", "F4", "LF1", ASIDE),
        # the dashed parallels extend a little past their defining points
        offset("J1", "F4", "C", "A", 6.0),
        offset("J2", "H", "A", "C", 8.0),
        offset("K1", "G", "A", "D", 6.0),
        offset("K2", "H", "D", "A", 8.0),
        midpoint("M3", "A", "B"), midpoint("M1", "A", "C"), midpoint("M2", "A", "D"),
        midpoint("MS3", "F4", "G"), midpoint("MS2", "G", "H"), midpoint("MS1", "H", "F4"),
    ],
    # blue = compression, pink = tension, per member (bar + labels + band)
    "colors": [
        member("3", bar=("A", "B"), force=("F4", "G")),
        member("1", bar=("A", "C"), force=("H", "F4")),
        member("2", bar=("A", "D"), force=("G", "H")),
    ],
}

out = HERE.parent / "data" / "view_1.json"
compas.json_dump(drawing, str(out), pretty=True)
print("wrote", out)
