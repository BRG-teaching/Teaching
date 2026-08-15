#!/usr/bin/env python3
"""Flag drawing content hidden behind the two UI cards.

The step caption sits over the top-left of the canvas and, in the exercise
views, a RESULT card sits over the bottom-left. Both are opaque. Composing
around them by eye does not scale, and content has repeatedly ended up
underneath -- a support, a title, half a subsystem.

This reads the exported ops database (python/ops/*.json), maps every drawn
point into canvas fractions, and reports anything landing inside either card.
Cheap enough to run over all 60+ views after any layout change.

Card geometry is measured from rendered screenshots at the 1500x900 window
make_movies uses, as a FRACTION of the canvas (the canvas is the viewport
minus the 250 px sidebar). Titles are reported separately from geometry,
since a hidden title is a smaller sin than a hidden support.

Run:  uv run python web/tools/regress/occlusion.py [view ...]
"""
import glob
import json
import os
import sys

# fractions of the canvas, x from the left, y from the TOP
CAPTION = (0.00, 0.00, 0.435, 0.295)      # step caption card
RESULT = (0.00, 0.835, 0.435, 1.00)       # RESULT card (exercise views only)
CANVAS_ASPECT = (1500 - 250) / 900.0      # the movie window's canvas


def pts_of(geom):
    d, t = geom["data"], geom["dtype"]
    if t.endswith("Point"):
        return [d[:2]]
    if t.endswith("Line"):
        return [d["start"][:2], d["end"][:2]]
    if t.endswith(("Polyline", "Polygon")):
        return [p[:2] for p in d["points"]]
    if t.endswith("Circle"):
        c = d["point"][:2] if "point" in d else d.get("plane", {}).get("point", [0, 0])[:2]
        return [c]
    return []


def report(path):
    D = json.load(open(path))["data"]
    (x0, y0), (x1, y1) = D["frame"]
    fw, fh = x1 - x0, y1 - y0
    # the camera fits the whole frame, letterboxing whichever axis is slack
    if fw / fh > CANVAS_ASPECT:
        vw, vh = fw, fw / CANVAS_ASPECT          # width-limited
    else:
        vw, vh = fh * CANVAS_ASPECT, fh          # height-limited
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    # the RESULT card is an exercise-view feature; the id says which
    has_result = str(D.get("view", "")).startswith("ex")

    def frac(p):
        return ((p[0] - (cx - vw / 2)) / vw, ((cy + vh / 2) - p[1]) / vh)

    def inside(box, f):
        return box[0] <= f[0] <= box[2] and box[1] <= f[1] <= box[3]

    hits = []
    for op in D["ops"]:
        o = op["data"]
        if o["kind"] == "label":
            ps = pts_of(o["geometry"])
        else:
            ps = pts_of(o["geometry"]) if o.get("geometry") else []
        if not ps:
            continue
        for p in ps:
            f = frac(p)
            where = ("caption" if inside(CAPTION, f)
                     else "result" if (has_result and inside(RESULT, f)) else None)
            if where:
                hits.append((o["name"], o["kind"], where, o.get("step") or 0, f))
                break
    return hits


def main():
    want = [a for a in sys.argv[1:] if a != "--all"]
    # the 54 drawing views were composed against their own captions and signed
    # off; the exercise wing is what this guards, unless --all is asked for
    pat = "python/ops/*.json" if "--all" in sys.argv else "python/ops/ex*.json"
    files = sorted(glob.glob(pat))
    if want:
        files = [f for f in files
                 if os.path.basename(f)[:-5] in want
                 or os.path.basename(f)[:-5].removeprefix("ex") in want]
    total = 0
    for f in files:
        name = os.path.basename(f)[:-5]
        hits = report(f)
        if not hits:
            continue
        titles = [h for h in hits if h[1] == "label"]
        geom = [h for h in hits if h[1] != "label"]
        total += len(geom)
        print(f"\n{name}")
        for n, k, w, st, fr in sorted(geom, key=lambda h: h[0]):
            print(f"   GEOMETRY  {n:<14} {k:<8} under the {w:<7} "
                  f"at ({fr[0]*100:4.1f}%, {fr[1]*100:4.1f}%) from step {st}")
        for n, k, w, st, fr in sorted(titles, key=lambda h: h[0]):
            print(f"   label     {n:<14} {'':8} under the {w:<7} "
                  f"at ({fr[0]*100:4.1f}%, {fr[1]*100:4.1f}%) from step {st}")
    print(f"\n{total} pieces of GEOMETRY hidden behind a card"
          f" (labels listed separately above)")


if __name__ == "__main__":
    main()
