"""Drawing 2 — the smallest possible drawing: a rectangle, one edge per step.

This is the worked example of section 4 of the website README.  It is here to
show the WHOLE loop with nothing else in the way:

    edit this file  ->  python make_view_2.py  ->  refresh the browser

Run it with any COMPAS Python:  python make_view_2.py
"""

import pathlib
import sys

VIEW = 2        # <<< THE ONLY NUMBER TO CHANGE when you copy this file <<<

# --- the paths (leave them alone if the script stays in drawings/) -----------
HERE = pathlib.Path(__file__).resolve().parent               # .../website/drawings
DATA = HERE.parent / "data"                                  # what the website reads
EQ = HERE.parents[1] / "2_computational_form_finding" / "Equilibrium"

sys.path.insert(0, str(EQ / "drawings" / "python"))          # to import eqdraw_ops

import compas  # noqa: E402
from compas.colors import Color  # noqa: E402
from compas.geometry import Line, Point  # noqa: E402
from eqdraw_ops import PALETTE, Drawing, Op  # noqa: E402

BLUE = Color.from_hex(PALETTE["compression"])

# --- the geometry: four corners ---------------------------------------------

A = (20.0, 20.0)
B = (80.0, 20.0)
C = (80.0, 60.0)
D = (20.0, 80.0)

# --- the drawing: one Op per element, `step` = when it appears ---------------

ops = [
    Op("label", Point(50, 70, 0), step=0, text="A rectangle", style="title"),

    Op("segment", Line((*A, 0), (*B, 0)), step=1, color=BLUE, width=0.25),
    Op("segment", Line((*B, 0), (*C, 0)), step=2, color=BLUE, width=0.25),
    Op("segment", Line((*C, 0), (*D, 0)), step=3, color=BLUE, width=0.25),
    Op("segment", Line((*D, 0), (*A, 0)), step=4, color=BLUE, width=0.25),
]

# --- one caption per step, plus the index-0 intro ----------------------------

steps = [
    {"title": "A rectangle", "caption": "press play, or step with the slider"},
    {"title": "Bottom", "caption": "draw the bottom edge, from A to B"},
    {"title": "Right", "caption": "draw the right edge, from B to C"},
    {"title": "Top", "caption": "draw the top edge, from C to D"},
    {"title": "Left", "caption": "close the rectangle, from D back to A"},
]

drawing = Drawing(
    view=VIEW,
    title="Drawing {} — A rectangle".format(VIEW),
    about="The smallest possible drawing: four edges, one per construction step.",
    frame=[[10, 10], [90, 78]],     # [[xmin, ymin], [xmax, ymax]] — the camera fits this
    steps=steps,
    ops=ops,
)

out = DATA / "view_{}.json".format(VIEW)
compas.json_dump(drawing, str(out), pretty=True)
print("wrote", out, "-", len(ops), "ops,", len(steps), "steps")
