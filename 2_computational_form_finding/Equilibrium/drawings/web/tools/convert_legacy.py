"""
LEGACY converter (superseded by convert.py, kept until every view is migrated).

Convert the auto-generated view_N_compas.py GeoGebra dumps into web view modules.

Each dump adds geometry in GeoGebra construction order; this converter parses the
S.add(...) calls and emits web/views/view_N.js with a flat element list that
lib/staticview.js replays step by step.

Clean-up applied on top of the raw dumps (they contain a lot of baked noise):
  - vector arrowheads: the dumps draw heads as two long V-prong strokes -- these
    are dropped; the runtime draws a proper filled triangular head instead
  - state ghosts: identical geometry re-added in another color (grey copies of
    vectors, re-colored lines) is deduplicated; the most saturated color wins
    but the element keeps its earliest construction step
  - runaway construction lines are clipped to the drawing frame
  - colors are mapped onto the palette of the reference video

Usage (from the drawings/ directory):
    python3 web/tools/convert_legacy.py            # convert all view_N except view_1
    python3 web/tools/convert_legacy.py 2 5 19     # convert selected views
"""

import re
import sys
from pathlib import Path

DRAWINGS = Path(__file__).resolve().parents[2]
OUT = DRAWINGS / "web" / "views"

NUM = r"[-+0-9.eE]+"
RE_NAMED_POINT = re.compile(rf"^(\w+) = Point\(({NUM}), ({NUM}), {NUM}\)")
RE_ADD_POINT = re.compile(rf"^S\.add\((\w+), pointcolor=Color\(({NUM}), ({NUM}), ({NUM})\), pointsize=({NUM})\)")
RE_ADD_LINE = re.compile(rf"^S\.add\(Line\((.+)\), linecolor=Color\(({NUM}), ({NUM}), ({NUM})\), linewidth=({NUM})\)(\s*#\s*vector)?")
RE_ADD_PLINE = re.compile(rf"^S\.add\(Polyline\(\[(.+)\]\), linecolor=Color\(({NUM}), ({NUM}), ({NUM})\), linewidth=({NUM})\)")
RE_ADD_POLY = re.compile(rf"^S\.add\(Polygon\(\[(.+)\]\), linecolor=Color\({NUM}, {NUM}, {NUM}\), facecolor=Color\(({NUM}), ({NUM}), ({NUM})\), linewidth=({NUM})(?:, opacity=({NUM}))?\)")
RE_ADD_CIRCLE = re.compile(rf"^S\.add\(Circle\.from_point_and_radius\(Point\(({NUM}), ({NUM}), {NUM}\), ({NUM})\), linecolor=Color\(({NUM}), ({NUM}), ({NUM})\), linewidth=({NUM})\)")
RE_POINT_EXPR = re.compile(rf"^Point\(({NUM}), ({NUM}), {NUM}\)$")
RE_TITLE = re.compile(r"GeoGebra applet:\s*(.+)$")

SUB = str.maketrans("0123456789", "₀₁₂₃₄₅₆₇₈₉")

# saturated palette colors beat black, black beats grey (state-ghost dedupe)
COLOR_RANK = {0x51923D: 3, 0xE07A26: 3, 0x2563EB: 3, 0xA52B30: 3, 0xC23D88: 3,
              0x111111: 2, 0xA0A0A0: 1}


def pretty(name):
    """GeoGebra label C_2 -> C₂."""
    if "_" in name:
        base, _, suffix = name.partition("_")
        if suffix.isdigit():
            return base + suffix.translate(SUB)
    return name


def map_color(r, g, b):
    """Map GeoGebra colors onto the video palette; keep unknown colors as-is."""
    if r > 0.9 and g > 0.9 and b > 0.9:
        return 0xFFFFFF
    if abs(r - g) < 0.06 and abs(g - b) < 0.06:                 # greyscale
        return 0x111111 if r < 0.3 else 0xA0A0A0
    if b > 0.55 and r < 0.15 and g < 0.15:
        return 0x2563EB                                          # compression blue
    if r > 0.55 and g < 0.15 and b < 0.15:
        return 0xA52B30                                          # tension red
    if g > 0.45 and r < 0.15 and b < 0.15:
        return 0x51923D                                          # load green
    if r > 0.9 and 0.3 < g < 0.7 and b < 0.2:
        return 0xE07A26                                          # force orange
    if r > 0.8 and b > 0.8 and g < 0.3:
        return 0xC23D88                                          # pink
    return (round(r * 255) << 16) | (round(g * 255) << 8) | round(b * 255)


def rank(color):
    return COLOR_RANK.get(color, 3)


def js_num(x):
    v = round(float(x), 4)
    s = f"{v:.4f}".rstrip("0").rstrip(".")
    return s if s not in ("-0", "") else "0"


def rkey(*vals):
    return tuple(round(float(v), 3) for v in vals)


def split_args(text):
    """Split 'A, Point(1, 2, 0), B' at top-level commas."""
    parts, depth, cur = [], 0, ""
    for ch in text:
        if ch == "(":
            depth += 1
        elif ch == ")":
            depth -= 1
        if ch == "," and depth == 0:
            parts.append(cur.strip())
            cur = ""
        else:
            cur += ch
    if cur.strip():
        parts.append(cur.strip())
    return parts


def clip_segment(p0, p1, box):
    """Liang-Barsky clip of segment p0-p1 to box ((x0,y0),(x1,y1)); None if outside."""
    (x0, y0), (x1, y1) = box
    dx, dy = p1[0] - p0[0], p1[1] - p0[1]
    t0, t1 = 0.0, 1.0
    for p, q in ((-dx, p0[0] - x0), (dx, x1 - p0[0]), (-dy, p0[1] - y0), (dy, y1 - p0[1])):
        if abs(p) < 1e-12:
            if q < 0:
                return None
            continue
        t = q / p
        if p < 0:
            t0 = max(t0, t)
        else:
            t1 = min(t1, t)
        if t0 > t1:
            return None
    return ((p0[0] + t0 * dx, p0[1] + t0 * dy), (p0[0] + t1 * dx, p0[1] + t1 * dy))


def convert(view_dir):
    src = view_dir / f"{view_dir.name}_compas.py"
    lines = src.read_text().splitlines()

    title = None
    for line in lines[:6]:
        if (m := RE_TITLE.search(line)):
            title = m.group(1).strip()

    points = {}
    for line in lines:
        if (m := RE_NAMED_POINT.match(line.strip())):
            points[m.group(1)] = (float(m.group(2)), float(m.group(3)))

    frame = None
    if "frameBL" in points and "frameTR" in points:
        frame = (points["frameBL"], points["frameTR"])

    def resolve(expr):
        expr = expr.strip()
        if (m := RE_POINT_EXPR.match(expr)):
            return (float(m.group(1)), float(m.group(2)))
        if expr in points:
            return points[expr]
        raise ValueError(f"unknown point expr: {expr}")

    def on_frame(pts):
        if frame is None:
            return False
        (x0, y0), (x1, y1) = frame
        eps = 1e-4
        return all(
            (abs(x - x0) < eps or abs(x - x1) < eps) and (abs(y - y0) < eps or abs(y - y1) < eps)
            for x, y in pts
        )

    elems = []   # dicts: kind, frame, color, w, geometry
    seen = {}    # geometry key -> element index (state-ghost dedupe)
    unparsed = []

    def dedupe(key, color, make):
        if key in seen:
            old = elems[seen[key]]
            if old is not None and rank(color) > rank(old["color"]):
                old["color"] = color
            return
        seen[key] = len(elems)
        elems.append(make())

    i = 0
    while i < len(lines):
        line = lines[i].strip()
        i += 1
        if not line.startswith("S.add("):
            continue

        if (m := RE_ADD_POINT.match(line)):
            name = m.group(1)
            if name not in points:
                unparsed.append(line)
                continue
            x, y = points[name]
            style = "w" if float(m.group(2)) > 0.9 else "g"
            dedupe(("p", rkey(x, y)), 0,
                   lambda: {"kind": "p", "frame": False, "color": 0, "x": x, "y": y,
                            "label": pretty(name), "style": style})
            continue

        if (m := RE_ADD_LINE.match(line)):
            p0 = resolve(split_args(m.group(1))[0])
            p1 = resolve(split_args(m.group(1))[1])
            color = map_color(float(m.group(2)), float(m.group(3)), float(m.group(4)))
            w = float(m.group(5))
            if m.group(6):
                # vector: drop the two V-prong head strokes that follow from the tip;
                # the runtime draws a filled triangular head on the shaft instead
                while i < len(lines):
                    m2 = RE_ADD_LINE.match(lines[i].strip())
                    if (not m2 or m2.group(6)
                            or (m2.group(2), m2.group(3), m2.group(4), m2.group(5))
                            != (m.group(2), m.group(3), m.group(4), m.group(5))):
                        break
                    q0 = resolve(split_args(m2.group(1))[0])
                    if abs(q0[0] - p1[0]) > 0.6 or abs(q0[1] - p1[1]) > 0.6:
                        break
                    i += 1
                dedupe(("a", rkey(*p0, *p1)), color,
                       lambda: {"kind": "a", "frame": False, "color": color, "w": w,
                                "p0": p0, "p1": p1})
            else:
                dedupe(("s", tuple(sorted((rkey(*p0), rkey(*p1))))), color,
                       lambda: {"kind": "s", "frame": on_frame([p0, p1]), "color": color,
                                "w": w, "p0": p0, "p1": p1})
            continue

        if (m := RE_ADD_PLINE.match(line)):
            pts = [resolve(e) for e in split_args(m.group(1))]
            color = map_color(float(m.group(2)), float(m.group(3)), float(m.group(4)))
            dedupe(("l", tuple(rkey(*p) for p in pts)), color,
                   lambda: {"kind": "l", "frame": on_frame(pts), "color": color,
                            "w": float(m.group(5)), "pts": pts})
            continue

        if RE_ADD_POLY.match(line):
            # baked GeoGebra region fills carry no meaning in the replay -- skip them
            continue

        if (m := RE_ADD_CIRCLE.match(line)):
            c = (float(m.group(1)), float(m.group(2)))
            r = float(m.group(3))
            color = map_color(float(m.group(4)), float(m.group(5)), float(m.group(6)))
            dedupe(("c", rkey(*c, r)), color,
                   lambda: {"kind": "c", "frame": False, "color": color,
                            "w": float(m.group(7)), "c": c, "r": r})
            continue

        unparsed.append(line)

    if frame is None:  # fall back to the bounding box of everything drawn
        xs = [p[0] for p in points.values()]
        ys = [p[1] for p in points.values()]
        for e in elems:
            for x, y in geometry_coords(e):
                xs.append(x)
                ys.append(y)
        mx, my = 0.05 * (max(xs) - min(xs)), 0.05 * (max(ys) - min(ys))
        frame = ((min(xs) - mx, min(ys) - my), (max(xs) + mx, max(ys) + my))

    # clip runaway segments/arrows to the frame (with a small margin)
    (fx0, fy0), (fx1, fy1) = frame
    mx, my = 0.03 * (fx1 - fx0), 0.03 * (fy1 - fy0)
    box = ((fx0 - mx, fy0 - my), (fx1 + mx, fy1 + my))
    kept = []
    for e in elems:
        if e["kind"] in ("s", "a") and not e["frame"]:
            clipped = clip_segment(e["p0"], e["p1"], box)
            if clipped is None:
                continue
            e["p0"], e["p1"] = clipped
        kept.append(e)
    elems = kept

    encoded = [(e["frame"], encode(e)) for e in elems]
    n = view_dir.name.split("_")[1]
    ordered = [enc for f, enc in encoded if f] + [enc for f, enc in encoded if not f]
    n_frame = sum(1 for f, _ in encoded if f)
    body = ",\n  ".join(ordered)
    js = f"""// Auto-generated by tools/convert.py from ../../{view_dir.name}/{src.name} -- do not edit.
import {{ createStatic }} from '../lib/staticview.js';

export const meta = {{
  title: 'Drawing {n} — {(title or f"view {n}").replace("'", "\\'")}',
  subtitle: 'step-by-step replay of the GeoGebra construction',
  frame: [[{js_num(frame[0][0])}, {js_num(frame[0][1])}], [{js_num(frame[1][0])}, {js_num(frame[1][1])}]],
  nFrame: {n_frame},
}};

const E = [
  {body},
];

export function create(dw, panel, makePlayer) {{
  return createStatic(dw, panel, makePlayer, meta, E);
}}
"""
    out = OUT / f"view_{n}.js"
    if out.exists() and not out.read_text().startswith("// Auto-generated"):
        return None  # hand-written module: never overwrite
    out.write_text(js)
    return len(elems), n_frame, unparsed


def geometry_coords(e):
    if e["kind"] == "p":
        return [(e["x"], e["y"])]
    if e["kind"] in ("s", "a"):
        return [e["p0"], e["p1"]]
    if e["kind"] in ("l", "g"):
        return e["pts"]
    if e["kind"] == "c":
        return [e["c"]]
    return []


def encode(e):
    k = e["kind"]
    if k == "p":
        return f'["p", {js_num(e["x"])}, {js_num(e["y"])}, "{e["label"]}", "{e["style"]}"]'
    if k in ("s", "a"):
        seg = f'[{js_num(e["p0"][0])}, {js_num(e["p0"][1])}, {js_num(e["p1"][0])}, {js_num(e["p1"][1])}]'
        return f'["{k}", {seg}, 0x{e["color"]:06X}, {e["w"]}]'
    if k == "l":
        arr = ", ".join(f"[{js_num(x)}, {js_num(y)}]" for x, y in e["pts"])
        return f'["l", [{arr}], 0x{e["color"]:06X}, {e["w"]}]'
    if k == "g":
        arr = ", ".join(f"[{js_num(x)}, {js_num(y)}]" for x, y in e["pts"])
        return f'["g", [{arr}], 0x{e["color"]:06X}, {e["op"]}]'
    if k == "c":
        return f'["c", [{js_num(e["c"][0])}, {js_num(e["c"][1])}, {js_num(e["r"])}], 0x{e["color"]:06X}, {e["w"]}]'
    raise ValueError(k)


def main():
    only = set(sys.argv[1:])
    report = []
    for view_dir in sorted(DRAWINGS.glob("view_*"), key=lambda p: int(p.name.split("_")[1])):
        n = view_dir.name.split("_")[1]
        if n == "1" or (only and n not in only):
            continue  # view_1 is hand-written
        result = convert(view_dir)
        if result is None:
            print(f"  view_{n}: hand-written module kept")
            continue
        total, n_frame, unparsed = result
        report.append((n, total, n_frame, len(unparsed)))
        for u in unparsed[:3]:
            print(f"  view_{n} UNPARSED: {u[:110]}")
    print(f"{'view':>6} {'elems':>6} {'frame':>6} {'unparsed':>9}")
    for n, total, n_frame, bad in report:
        flag = " <-- check" if bad else ""
        print(f"{n:>6} {total:>6} {n_frame:>6} {bad:>9}{flag}")


if __name__ == "__main__":
    main()
