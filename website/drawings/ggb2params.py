"""ggb2params — draft the parametric section of a drawing from its original
GeoGebra applet.

The 53 original applets live in Equilibrium/drawings/view_N/applet_0/
geogebra.xml, and GeoGebra's construction commands map almost one-to-one to
the website's parametric vocabulary:

    GeoGebra                          website params
    ------------------------------    ---------------------------------------
    free <point> with coords          point(...) / free handle
    Point(c)          (point on path) handle(..., on="c")
    Midpoint(A, B)                    midpoint(...)
    Segment(A, B) / Ray / Vector      op.define = line("A", "B")
    Line(A, B), Line(P, g) (parallel) direction bookkeeping for Intersect
    Intersect(g, h)                   intersection(...)
    Circle(A, r)                      op.define = circle("A")
    dynamic color "w - pi ... w"      member(...) color rule
    If / Rotate / Mirror / macros     NOT converted -> listed for hand-work

This is an ASSISTANT, not a compiler: it prints a draft params script plus a
list of everything it could not translate.  GeoGebra labels (d, c, J_3...)
are its own — map them to the web op names (bar3, circle...) by hand, using
drawings/python/recipes/view_N_draw.py as the dictionary.

Usage:  python ggb2params.py 1        (drafts drawings/view_1)
"""

import io
import pathlib
import re
import sys
import xml.etree.ElementTree as ET

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

REPO = pathlib.Path(__file__).resolve().parents[2]  # .../Equilibrium


def load(view):
    path = REPO / "drawings" / ("view_%s" % view) / "applet_0" / "geogebra.xml"
    text = path.read_text(encoding="utf8", errors="replace")
    # the file is a full ggb workspace; grab the <construction> block
    m = re.search(r"<construction.*?</construction>", text, re.S)
    return ET.fromstring(m.group(0))


def draft(view):
    root = load(view)
    lines_by_label = {}   # label -> ("pts", a, b) line through two points/dirs
    handles, rules, defines, colors, skipped = [], [], [], [], []
    free_points, dependent = [], set()

    items = list(root)
    for i, node in enumerate(items):
        if node.tag == "command":
            name = node.get("name")
            inp = [v for _, v in sorted(node.find("input").attrib.items())]
            out = [v for _, v in sorted(node.find("output").attrib.items())]
            label = out[0] if out else "?"
            dependent.update(out)

            if name == "Point" and len(inp) == 1:
                handles.append('handle("%s", on="%s")' % (label, inp[0]))
            elif name == "Midpoint" and len(inp) == 2:
                rules.append('midpoint("%s", "%s", "%s")' % (label, inp[0], inp[1]))
            elif name in ("Segment", "Ray", "Vector") and len(inp) == 2:
                defines.append('op["%s"].define = line("%s", "%s")' % (label, inp[0], inp[1]))
                lines_by_label[label] = (inp[0], inp[1])
            elif name == "Line" and len(inp) == 2:
                if inp[1] in lines_by_label:      # Line(P, g): through P parallel to g
                    a, b = lines_by_label[inp[1]]
                    lines_by_label[label] = (inp[0], "dir(%s,%s)" % (a, b))
                else:                              # Line(A, B)
                    lines_by_label[label] = (inp[0], inp[1])
            elif name == "Intersect" and len(inp) >= 2 and inp[0] in lines_by_label \
                    and inp[1] in lines_by_label:
                (p1, d1), (p2, d2) = lines_by_label[inp[0]], lines_by_label[inp[1]]
                da1, db1 = d1[4:-1].split(",") if d1.startswith("dir(") else (p1, d1)
                da2, db2 = d2[4:-1].split(",") if d2.startswith("dir(") else (p2, d2)
                rules.append('intersection("%s", "%s", "%s", "%s", "%s", "%s", "%s")'
                             % (label, p1, da1, db1, p2, da2, db2))
            elif name == "Circle" and len(inp) == 2:
                defines.append('op["%s"].define = circle("%s")  # radius %s'
                               % (label, inp[0], inp[1]))
            else:
                skipped.append("%s(%s) -> %s" % (name, ", ".join(inp), ", ".join(out)))

        elif node.tag == "element" and node.get("type") == "point":
            label = node.get("label")
            coords = node.find("coords")
            if label not in dependent and coords is not None:
                free_points.append('point("%s", %.4g, %.4g)'
                                   % (label, float(coords.get("x")), float(coords.get("y"))))
            # dynamic colors mark internal-force elements
        elif node.tag == "element":
            oc = node.find("objColor")
            if oc is not None and oc.get("dynamicr"):
                colors.append("%s: dynamic color %r / %r -> member(...) rule"
                              % (node.get("label"), oc.get("dynamicr"), oc.get("dynamicb")))

    print("# ---- draft params for view", view, "(GeoGebra labels!) ----------")
    print("points  = [%s]" % (",\n           ".join(free_points)))
    print("handles = [%s]" % (",\n           ".join(handles)))
    print("rules   = [%s]" % (",\n           ".join(rules)))
    print("\n# op-level defines (rename GGB labels to web op names):")
    for d in defines:
        print("  " + d)
    print("\n# dynamic-color elements (turn into member(...) rules):")
    for c in colors:
        print("  " + c)
    print("\n# NOT converted — needs hand-work:")
    for s in skipped:
        print("  " + s)


if __name__ == "__main__":
    draft(sys.argv[1] if len(sys.argv) > 1 else "1")
