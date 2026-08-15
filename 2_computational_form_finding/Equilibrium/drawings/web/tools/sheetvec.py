#!/usr/bin/env python3
"""Pull the real vector geometry out of one page of an exercise sheet.

Every view in this project is digitised from the PDF rather than eyeballed off
a screenshot, because the sheets are drawn to a stated scale and the numbers
have to come out round. This is the tool that reads them.

    uv run python drawings/web/tools/sheetvec.py <pdf> <page> [--scale 100]

It prints every stroked path in METRES at the sheet's stated scale, grouped by
stroke width (the sheets use width to separate structure from annotation), with
each path's start, end, length and angle. `--cluster` additionally reports the
distinct x and y coordinates that appear, which is usually how a grid, a set of
load axes or a row of supports reveals itself.

TWO THINGS THAT WILL BITE YOU, both of which have already cost this project a
day between them:

  1. These are InDesign PDFs and they carry HIDDEN artwork -- duplicated
     drawings and text that `pdftotext` happily returns and that never renders.
     Nothing here can tell the difference. ALWAYS confirm a claim against a
     real render:  pdftoppm -r 300 -f N -l N -png sheet.pdf out

  2. pdftocairo closes outlines with `Z`, and a rectangle drawn as
     "M a L b L c L d Z" has FOUR edges, not three. A parser that ignores the
     closepath silently loses one edge of every closed shape -- which once made
     a perfectly determinate truss read as a mechanism. `Z` is handled here.

Scale: 1 pt = 0.3527778 mm, so at 1:100 one point is 0.035278 m on the
building, at 1:200 0.070556 m, at 1:500 0.17639 m.
"""
import argparse
import math
import re
import subprocess
import sys
import tempfile
from collections import defaultdict
from pathlib import Path

PT_MM = 0.3527778                       # one PostScript point in millimetres


def svg_of(pdf, page):
    with tempfile.TemporaryDirectory() as td:
        out = Path(td) / "p.svg"
        subprocess.run(["pdftocairo", "-svg", "-f", str(page), "-l", str(page),
                        str(pdf), str(out)], check=True,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        return out.read_text()


def matrix(s):
    if not s or "matrix" not in s:
        return (1, 0, 0, 1, 0, 0)
    return tuple(float(v) for v in re.findall(r"-?\d*\.?\d+(?:e-?\d+)?",
                                              s[s.index("matrix"):])[:6])


def apply(m, p):
    a, b, c, d, e, f = m
    return (a * p[0] + c * p[1] + e, b * p[0] + d * p[1] + f)


NUM = r"-?\d*\.?\d+(?:e-?\d+)?"


def points_of(d):
    """Every subpath of a path's `d`, as a list of point lists.

    Handles M/L/C/Z. A curve contributes its endpoint only -- these sheets draw
    structure with straight lines, and a curve is either a support symbol or a
    genuine arc that has to be looked at in the render anyway.
    """
    subs, cur, start = [], [], None
    for m in re.finditer(rf"([MLCZmlcz])((?:\s*{NUM})*)", d):
        op = m.group(1)
        v = [float(x) for x in re.findall(NUM, m.group(2))]
        if op in "Mm":
            if len(cur) > 1:
                subs.append(cur)
            cur = [(v[0], v[1])] if len(v) >= 2 else []
            start = cur[0] if cur else None
            for i in range(2, len(v) - 1, 2):          # implicit lineto
                cur.append((v[i], v[i + 1]))
        elif op in "Ll":
            for i in range(0, len(v) - 1, 2):
                cur.append((v[i], v[i + 1]))
        elif op in "Cc":
            for i in range(0, len(v) - 5, 6):
                cur.append((v[i + 4], v[i + 5]))
        elif op in "Zz" and start is not None:
            cur.append(start)                          # THE CLOSING EDGE
    if len(cur) > 1:
        subs.append(cur)
    return subs


def read(pdf, page, scale):
    svg = svg_of(pdf, page)
    m2 = PT_MM / 1000.0 * scale                        # points -> metres
    # pdftocairo emits a top-level transform; y grows downward in SVG
    out = []
    for tag in re.finditer(r"<(path|g)\b([^>]*)>", svg):
        attrs = tag.group(2)
        if tag.group(1) == "g":
            continue
        d = re.search(r'\sd="([^"]*)"', attrs)
        if not d:
            continue
        mt = matrix(re.search(r'transform="([^"]*)"', attrs).group(1)
                    if 'transform="' in attrs else "")
        st = re.search(r"stroke-width:\s*(" + NUM + ")", attrs)
        stroke = re.search(r"stroke:\s*([^;\"]+)", attrs)
        fill = re.search(r"fill:\s*([^;\"]+)", attrs)
        if stroke and "none" in stroke.group(1):
            continue                                   # a fill, not a stroke
        w = float(st.group(1)) if st else 0.0
        for sub in points_of(d.group(1)):
            pts = [apply(mt, p) for p in sub]
            for i in range(len(pts) - 1):
                (x0, y0), (x1, y1) = pts[i], pts[i + 1]
                L = math.hypot(x1 - x0, y1 - y0)
                if L < 0.05:                           # sub-0.05 pt: noise
                    continue
                out.append({
                    "w": round(w * m2 * 1000 / scale, 3),   # width in mm on paper
                    "wpt": round(w, 3),
                    "a": (x0 * m2, -y0 * m2), "b": (x1 * m2, -y1 * m2),
                    "len": L * m2,
                    "ang": math.degrees(math.atan2(-(y1 - y0), x1 - x0)) % 180,
                    "fill": fill.group(1).strip() if fill else "",
                })
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("pdf")
    ap.add_argument("page", type=int)
    ap.add_argument("--scale", type=float, default=100,
                    help="drawing scale denominator: 100 for 1:100 (default)")
    ap.add_argument("--min", type=float, default=0.0,
                    help="ignore segments shorter than this many metres")
    ap.add_argument("--cluster", action="store_true",
                    help="also report the distinct x and y coordinates")
    ap.add_argument("--width", type=float,
                    help="only segments of this stroke width in points")
    a = ap.parse_args()

    segs = [s for s in read(a.pdf, a.page, a.scale) if s["len"] >= a.min]
    if a.width is not None:
        segs = [s for s in segs if abs(s["wpt"] - a.width) < 0.02]
    if not segs:
        print("no stroked geometry found — is the page number right?")
        return 1

    # the sheets separate structure from annotation by stroke width
    by_w = defaultdict(list)
    for s in segs:
        by_w[s["wpt"]].append(s)
    x0 = min(min(s["a"][0], s["b"][0]) for s in segs)
    y0 = min(min(s["a"][1], s["b"][1]) for s in segs)
    print(f"{len(segs)} segments, page origin shifted to "
          f"({x0:.3f}, {y0:.3f}) m; all coordinates below are relative to it\n")
    for w in sorted(by_w, reverse=True):
        g = by_w[w]
        print(f"--- stroke {w:.3f} pt : {len(g)} segments "
              f"({sum(s['len'] for s in g):.2f} m total) ---")
        for s in sorted(g, key=lambda s: (-s["len"], s["a"])):
            (ax, ay), (bx, by) = s["a"], s["b"]
            print(f"  ({ax - x0:8.3f},{ay - y0:8.3f}) -> "
                  f"({bx - x0:8.3f},{by - y0:8.3f})   "
                  f"len {s['len']:7.3f}  ang {s['ang']:6.2f}")
        print()

    if a.cluster:
        for axis, idx in (("x", 0), ("y", 1)):
            vals = sorted({round(p[idx] - (x0 if idx == 0 else y0), 3)
                           for s in segs for p in (s["a"], s["b"])})
            merged = []
            for v in vals:
                if merged and v - merged[-1][-1] < 0.02:
                    merged[-1].append(v)
                else:
                    merged.append([v])
            print(f"distinct {axis}: " +
                  "  ".join(f"{sum(g) / len(g):.3f}" for g in merged))
    return 0


if __name__ == "__main__":
    sys.exit(main())
