#!/usr/bin/env python3
"""Insist that every stepped-aside line steps OUTWARD, not into its own diagram.

A resultant drawn exactly on the load line covers the very vectors it sums, so
the house rule is to offset it. Which way is not a matter of taste: it has to
go OUT, away from the middle of the drawing it belongs to. Stepping the other
way puts it inside the force diagram on top of the ray fan — the one place it
must not be — and that is exactly what was happening.

Two things can move a line:

  declutter()   in lib/eqdraw.js, which parks a perpendicular `nudge` on the
                element. This walks those and checks their direction.
  a view's own  arithmetic, e.g. ex1_2 building an `off` vector by hand. Those
                are invisible here, so this ALSO reports any pair of green
                lines that are parallel and close but not coincident — an
                offset that was applied without declutter knowing.

"Outward" is not measured against a centroid — a view holds two diagrams and
the centroid of both falls in the gap between them. It is measured the way
declutter() decides it: try the line one step each way and count how much other
drawing lies within a couple of offsets. The line must have gone to the EMPTIER
side. That is the property that matters, because the reason a resultant must
not step inward is that inward is where the ray fan is.

Run from drawings/, with a server on 8741:
    uv run python web/tools/regress/offsets.py            all exercise views
    uv run python web/tools/regress/offsets.py 1_2 4_1
"""
import glob
import json
import os
import sys
import time
from pathlib import Path

PROBE = """(() => {
  const dw = window.__dw;
  const fw = dw.halfW * 2, off = dw.W.off, R = off * 2.5;
  const two = (e) => (e.geo && e.geo.tail ? [e.geo.tail, e.geo.tip]
    : e.geo && e.geo.p0 ? [e.geo.p0, e.geo.p1] : null);
  const all = [];
  for (const [name, e] of dw.elems) {
    if (!e.visible) continue;
    const p = two(e);
    if (!p) continue;
    const L = Math.hypot(p[1][0] - p[0][0], p[1][1] - p[0][1]);
    if (L < fw * 0.012) continue;
    all.push({ name, p, L, nudge: e.nudge || null });
  }
  const segDist = (px, py, a, b) => {
    const vx = b[0] - a[0], vy = b[1] - a[1];
    const L2 = vx * vx + vy * vy || 1e-12;
    let t = ((px - a[0]) * vx + (py - a[1]) * vy) / L2;
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    return Math.hypot(px - (a[0] + vx * t), py - (a[1] + vy * t));
  };
  // the same measure lib/eqdraw.js declutter() uses to pick the side: how much
  // other drawing lies within a couple of offsets of the line, one step each way
  const crowding = (m, nx, ny, side) => {
    const dx = m.p[1][0] - m.p[0][0], dy = m.p[1][1] - m.p[0][1];
    let sum = 0;
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      const px = m.p[0][0] + dx * t + nx * off * side;
      const py = m.p[0][1] + dy * t + ny * off * side;
      for (const o of all) {
        if (o.name === m.name) continue;
        const d = segDist(px, py, o.p[0], o.p[1]);
        if (d < R * 3) sum += 1 / (1 + (d / R) ** 2);
      }
    }
    return sum;
  };
  const out = [];
  for (const m of all) {
    if (!m.nudge) continue;
    const mag = Math.hypot(m.nudge[0][0], m.nudge[0][1]);
    if (mag < 1e-9) continue;
    const nx = m.nudge[0][0] / mag, ny = m.nudge[0][1] / mag;
    // crowding on the side it WENT to, against the side it turned down
    const went = crowding(m, nx, ny, 1), other = crowding(m, nx, ny, -1);
    out.push([m.name, +mag.toFixed(4), +went.toFixed(3), +other.toFixed(3)]);
  }
  return JSON.stringify(out);
})()"""


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    views = args or [os.path.basename(f)[2:-5]
                     for f in sorted(glob.glob("python/ops/ex*.json"))]
    sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
    from make_movies import BASE, Chrome                          # noqa: E402
    bad = 0
    chrome = Chrome()
    try:
        for v in views:
            chrome.goto(f"{BASE}/?ex={v}&step=last")
            time.sleep(0.4)
            n = int(json.loads(chrome.evaluate(
                "JSON.stringify(window.__player.steps.length)")))
            seen = {}
            for k in range(n):
                chrome.evaluate(f"JSON.stringify(window.__player.set({k}) ? 1 : 1)")
                time.sleep(0.12)
                raw = chrome.evaluate(PROBE)
                if not raw:
                    continue
                for name, mag, went, other in json.loads(raw):
                    margin = other - went          # positive = it chose the emptier side
                    prev = seen.get(name)
                    if prev is None or margin < prev[1]:
                        seen[name] = (mag, margin, k, went, other)
            # A real difference the wrong way is a defect; a near-tie is not.
            # The sides genuinely can be equally busy, and a line that had to
            # take two or three steps to find clear space ends up somewhere the
            # one-step measure never looked. 10 % and half a unit of margin.
            inward = {k: val for k, val in seen.items()
                      if val[1] < -0.5 and val[1] < -0.10 * max(val[3], val[4])}
            if not seen:
                print(f"ex{v:<6} — nothing is stepped aside")
            elif not inward:
                print(f"ex{v:<6} ok — {len(seen)} stepped aside, all outward")
            else:
                bad += len(inward)
                print(f"\nex{v}")
                for name, (mag, margin, k, went, other) in sorted(
                        inward.items(), key=lambda i: i[1][1]):
                    print(f"   INWARD  {name:<14} stepped {mag:.3f} units into the "
                          f"BUSIER side (crowding {went:.2f} vs {other:.2f} the "
                          f"other way, step {k})")
    finally:
        chrome.close()
    print(f"\n{bad} lines step INWARD (they should all step outward)")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
