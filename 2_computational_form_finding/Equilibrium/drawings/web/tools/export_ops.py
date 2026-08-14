#!/usr/bin/env python
"""Export the drawing-operations database: one compas-serialized JSON per
view (drawings/python/ops/view_N.json) plus a readable auto-generated
COMPAS recipe (drawings/python/recipes/view_N_draw.py).

Drives the LIVE web viewer headless (server on 8741, like make_movies)
and calls window.__exportOps() at the final step of the default state,
so the database is exactly what the site draws and cannot drift from it.

Usage: export_ops.py [N ...]        (no args = all 53 views)
"""
import json
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from make_movies import BASE, Chrome  # noqa: E402

WEB = Path(__file__).resolve().parents[1]
PYDIR = WEB.parent / "python"
sys.path.insert(0, str(PYDIR))
import compas  # noqa: E402
from eqdraw_ops import Drawing  # noqa: E402

VIEWS = [*range(1, 30), *range(31, 55)]


def export(chrome, view):
    chrome.goto(f"{BASE}/?view={view}&step=last")
    time.sleep(0.4)                                   # let refresh settle
    raw = chrome.evaluate("JSON.stringify(window.__exportOps())")
    raw = json.loads(raw)
    validate(raw, view)
    drawing = Drawing.from_export(raw)
    out = PYDIR / "ops" / f"view_{view}.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    compas.json_dump(drawing, out, pretty=True)
    write_recipe(drawing, PYDIR / "recipes" / f"view_{view}_draw.py")
    return drawing


def validate(raw, view):
    assert raw["view"] == view, f"view mismatch: {raw['view']} != {view}"
    assert raw["ops"], f"view {view}: no ops"
    for o in raw["ops"]:
        for key in ("p", "c", "at", "corners"):
            for v in flatten(o.get(key, [])):
                assert isinstance(v, (int, float)) and abs(v) < 1e6, \
                    f"view {view} op {o['name']}: bad coordinate {v!r}"
        if "color" in o:
            assert o["color"].startswith("#") and len(o["color"]) == 7, \
                f"view {view} op {o['name']}: bad color {o['color']!r}"


def flatten(x):
    if isinstance(x, (list, tuple)):
        for v in x:
            yield from flatten(v)
    else:
        yield x


def fmt_pt(p):
    return f"({p.x:g}, {p.y:g}, 0)"


def fmt_geometry(op):
    g = op.geometry
    if op.kind in ("segment", "arrow"):
        return f"Line({fmt_pt(g.start)}, {fmt_pt(g.end)})"
    if op.kind == "polyline":
        pts = ", ".join(fmt_pt(p) for p in g.points)
        return f"Polyline([{pts}])"
    if op.kind == "circle":
        c = g.frame.point
        return f"Circle({g.radius:g}, frame=Frame({fmt_pt(c)}, [1, 0, 0], [0, 1, 0]))"
    if op.kind in ("polygon", "image"):
        pts = ", ".join(fmt_pt(p) for p in g.points)
        return f"Polygon([{pts}])"
    return f"Point{fmt_pt(g)}"


def write_recipe(drawing, path):
    """A readable auto-generated recipe: the same operations as literal
    COMPAS calls, one add() per element, grouped by construction step."""
    lines = [
        '"""%s' % drawing.title,
        "",
        "Auto-generated from ops/view_%d.json — the drawing as literal COMPAS" % drawing.view,
        "calls, one operation per line, in construction order. Regenerate with",
        "web/tools/export_ops.py; edit the web view, not this file.",
        '"""',
        "from compas.colors import Color",
        "from compas.geometry import Circle, Frame, Line, Point, Polygon, Polyline  # noqa: F401",
        "",
        "ops = []",
        "",
        "",
        "def add(step, kind, geometry, color=None, **style):",
        '    """One drawing operation; style: width, dash, opacity, text, head, until."""',
        '    ops.append({"step": step, "kind": kind, "geometry": geometry,',
        '                "color": color, **style})',
        "",
    ]
    step = None
    for op in drawing.ops:
        if op.step != step:
            step = op.step
            title = drawing.steps[step]["title"] if step < len(drawing.steps) else ""
            lines += ["", f"# step {step} — {title}"]
        args = [str(op.step), repr(op.kind), fmt_geometry(op)]
        if op.color is not None:
            args.append(f'color=Color.from_hex("{op.color.hex}")')
        if op.width:
            args.append(f"width={op.width:g}")
        if op.dash is not None:
            args.append(f"dash={op.dash:g}")
        if op.opacity != 1.0:
            args.append(f"opacity={op.opacity:g}")
        if op.text is not None:
            args.append(f"text={op.text!r}")
        if op.head is not None:
            args.append(f"head=({op.head[0]:g}, {op.head[1]:g})")
        if op.until is not None:
            args.append(f"until={op.until}")
        lines.append(f"add({', '.join(args)})")
    lines += ["", "", 'if __name__ == "__main__":',
              f'    print("{drawing.title} —", len(ops), "operations")', ""]
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines))


def main():
    views = [int(a) for a in sys.argv[1:]] or VIEWS
    chrome = Chrome()
    try:
        for view in views:
            d = export(chrome, view)
            print(f"view {view}: {len(d.ops)} ops, {len(d.steps) - 1} steps")
    finally:
        chrome.close()


if __name__ == "__main__":
    main()
