#!/usr/bin/env python3
"""Flag drawing content hidden behind the two UI cards.

The step caption sits over the top-left of the canvas and, in the exercise
views, a RESULT card sits over the bottom-left. Both are opaque. Composing
around them by eye does not scale, and content has repeatedly ended up
underneath -- a support, a title, half a subsystem.

This reads the exported ops database (python/ops/*.json), maps every drawn
point into canvas fractions, and reports anything landing inside either card.
Cheap enough to run over all 60+ views after any layout change.

Two modes.

  offline (default)  reads the exported ops database and tests against card
                     rectangles measured once from screenshots. Fast, and good
                     enough to catch gross mistakes -- but the caption card is
                     as tall as its text, so a view with a long final caption
                     is judged against a card smaller than the one it will
                     actually get. It reports the DEFAULT state only.

  --live             drives the page and measures `.eq-caption` and
                     `.eq-result` with getBoundingClientRect AT EVERY STEP,
                     then tests the real screen position of every label and
                     every drawn point against them. This is the one to
                     believe. It is what caught a form-diagram title sitting
                     under the RESULT card in a view the offline pass called
                     clean.

Titles are reported separately from geometry, since a hidden title is a
smaller sin than a hidden support.

Run:  uv run python web/tools/regress/occlusion.py [view ...]
      uv run python web/tools/regress/occlusion.py --live [view ...]
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


# --------------------------------------------------------------- live ------

# Measures what is actually on the screen. Labels are DOM nodes, so their
# rectangle can simply be read; geometry has to be projected through the
# camera, which for an orthographic camera is one linear map.
LIVE_PROBE = """(() => {
  const dw = window.__dw, cam = dw.camera;
  const cv = dw.renderer.domElement.getBoundingClientRect();
  const cards = ['.eq-caption', '.eq-result'].map((sel) => {
    const el = document.querySelector(sel);
    if (!el || el.offsetParent === null) return null;
    const r = el.getBoundingClientRect();
    return {sel, x0: r.left, y0: r.top, x1: r.right, y1: r.bottom};
  }).filter(Boolean);
  // the camera is orthographic and axis-aligned, so the projection is one
  // linear map and needs no THREE reference
  const toScreen = (x, y) => {
    const nx = ((x - cam.position.x) / ((cam.right - cam.left) / 2)) * cam.zoom;
    const ny = ((y - cam.position.y) / ((cam.top - cam.bottom) / 2)) * cam.zoom;
    return [cv.left + ((nx + 1) / 2) * cv.width,
            cv.top + ((1 - ny) / 2) * cv.height];
  };
  const hits = [];
  // WHICH card, if any, a screen point falls inside
  const over = (sx, sy) => cards.find((c) =>
    sx >= c.x0 && sx <= c.x1 && sy >= c.y0 && sy <= c.y1) || null;
  for (const [name, e] of dw.elems) {
    if (e.objs && e.objs.length && e.objs.every((o) => !o.visible)) continue;
    if (e.kind === 'label') {
      if (!e.el || !e.el.textContent.trim()) continue;
      const st = getComputedStyle(e.el);
      if (st.display === 'none' || st.opacity === '0') continue;
      const r = e.el.getBoundingClientRect();
      if (r.width === 0) continue;
      // how much of the label's box a card actually eats: text is unreadable
      // well before it is fully covered, but a two-pixel clip is not a defect
      let worst = null, wf = 0;
      for (const c of cards) {
        const w = Math.max(0, Math.min(r.right, c.x1) - Math.max(r.left, c.x0));
        const h = Math.max(0, Math.min(r.bottom, c.y1) - Math.max(r.top, c.y0));
        const f = (w * h) / (r.width * r.height || 1);
        if (f > wf) { wf = f; worst = c; }
      }
      if (worst && wf > 0.12) hits.push([name, 'label', worst.sel, Math.round(wf * 100)]);
      continue;
    }
    const g = e.geo;
    if (!g) continue;
    let pts = [];
    if (Array.isArray(g) && Array.isArray(g[0])) {
      pts = Array.isArray(g[0][0]) ? g.flat() : g;
    } else if (g.p0) pts = [g.p0, g.p1];
    else if (g.tail) pts = [g.tail, g.tip];
    else if (Array.isArray(g) && typeof g[0] === 'number') pts = [g];
    else if (g.c) pts = [g.c];
    // walk the element rather than testing its corners, so "the tail of an
    // arrow is clipped" and "the whole support is buried" stop looking alike
    let n = 0, covered = 0, card = null;
    const test = (x, y) => {
      const [sx, sy] = toScreen(x, y);
      const c = over(sx, sy);
      n++;
      if (c) { covered++; card = card || c; }
    };
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      if (!p || p.length < 2) continue;
      test(p[0], p[1]);
      const q = pts[i + 1];
      if (!q || q.length < 2) continue;
      for (let t = 1; t < 8; t++) {
        test(p[0] + ((q[0] - p[0]) * t) / 8, p[1] + ((q[1] - p[1]) * t) / 8);
      }
    }
    if (card && n && covered / n > 0.25) {
      hits.push([name, e.kind, card.sel, Math.round((covered / n) * 100)]);
    }
  }
  return JSON.stringify({cards: cards.map((c) => c.sel), hits});
})()"""


# Where the cards actually are, in the view's OWN coordinates. Placing a
# caption by trial and error costs a headless run per guess; this prints the
# forbidden rectangles once and the placement follows from them.
CARD_PROBE = """(() => {
  const dw = window.__dw, cam = dw.camera;
  const cv = dw.renderer.domElement.getBoundingClientRect();
  const toWorld = (sx, sy) => {
    const nx = ((sx - cv.left) / cv.width) * 2 - 1;
    const ny = 1 - ((sy - cv.top) / cv.height) * 2;
    return [cam.position.x + (nx * (cam.right - cam.left)) / 2 / cam.zoom,
            cam.position.y + (ny * (cam.top - cam.bottom)) / 2 / cam.zoom];
  };
  const out = {};
  for (const sel of ['.eq-caption', '.eq-result']) {
    const el = document.querySelector(sel);
    if (!el || el.offsetParent === null) continue;
    const r = el.getBoundingClientRect();
    const a = toWorld(r.left, r.bottom), b = toWorld(r.right, r.top);
    out[sel] = [a[0], a[1], b[0], b[1]];      // x0, y0, x1, y1 in world units
  }
  return JSON.stringify(out);
})()"""


def all_views():
    """Every exercise view on disk, in sheet order — not a hardcoded list, so a
    new view cannot quietly escape the check."""
    import re
    ids = [os.path.basename(f)[2:-3] for f in glob.glob("web/views/ex*.js")]
    ids = [i for i in ids if i != "6_common"]

    def key(i):
        parts = re.findall(r"\d+|[a-zA-Z]+", i)
        return (i.startswith("X"), [int(p) if p.isdigit() else p for p in parts])
    return sorted(ids, key=key)


def run_cards(views):
    import time
    from pathlib import Path
    sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
    from make_movies import BASE, Chrome                        # noqa: E402
    chrome = Chrome()
    try:
        for v in views:
            chrome.goto(f"{BASE}/?ex={v}&step=last")
            time.sleep(0.6)
            boxes = json.loads(chrome.evaluate(CARD_PROBE))
            print(f"ex{v}")
            for sel, (x0, y0, x1, y1) in boxes.items():
                print(f"   {sel:<12} x {x0:8.2f} … {x1:8.2f}   "
                      f"y {y0:8.2f} … {y1:8.2f}")
            if ".eq-result" in boxes:
                print(f"   → a caption under the form diagram needs "
                      f"y > {boxes['.eq-result'][3]:.2f} "
                      f"or x > {boxes['.eq-result'][2]:.2f}")
            if ".eq-caption" in boxes:
                print(f"   → the top of the form diagram needs "
                      f"y < {boxes['.eq-caption'][1]:.2f} "
                      f"or x > {boxes['.eq-caption'][2]:.2f}")
    finally:
        chrome.close()


def run_live(views):
    import time
    from pathlib import Path
    sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
    from make_movies import BASE, Chrome                        # noqa: E402
    total = 0
    chrome = Chrome()
    try:
        for v in views:
            chrome.goto(f"{BASE}/?ex={v}&step=last")
            time.sleep(0.5)
            nsteps = int(json.loads(chrome.evaluate(
                "JSON.stringify(window.__player.steps.length)")))
            seen = {}
            for k in range(nsteps):
                chrome.evaluate(
                    f"JSON.stringify(window.__player.set({k}) ? 1 : 1)")
                time.sleep(0.18)
                raw = chrome.evaluate(LIVE_PROBE)
                if not raw:
                    continue
                for name, kind, card, pct in json.loads(raw)["hits"]:
                    e = seen.setdefault((name, kind, card), [[], 0])
                    e[0].append(k)
                    e[1] = max(e[1], pct)
            if not seen:
                print(f"ex{v:<6} ok — {nsteps} steps, nothing under a card")
                continue
            geom = {k: v2 for k, v2 in seen.items() if k[1] != "label"}
            total += len(geom)
            print(f"\nex{v}")
            for (name, kind, card), (ks, pct) in sorted(
                    seen.items(), key=lambda i: (i[0][1] == "label", -i[1][1])):
                tag = "GEOMETRY" if kind != "label" else "label   "
                rng = f"step {ks[0]}" if len(ks) == 1 else f"steps {ks[0]}-{ks[-1]}"
                print(f"   {tag}  {name:<14} {kind:<8} {pct:3d}% under "
                      f"{card:<12} {rng}")
    finally:
        chrome.close()
    return total


def main():
    if "--cards" in sys.argv:
        args = [a for a in sys.argv[1:] if not a.startswith("--")]
        run_cards(args or [os.path.basename(f)[2:-5]
                           for f in sorted(glob.glob("python/ops/ex*.json"))])
        return
    if "--live" in sys.argv:
        args = [a for a in sys.argv[1:] if not a.startswith("--")]
        views = args or all_views()
        n = run_live(views)
        print(f"\n{n} pieces of GEOMETRY hidden behind a card"
              f" (labels listed separately)")
        return
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
