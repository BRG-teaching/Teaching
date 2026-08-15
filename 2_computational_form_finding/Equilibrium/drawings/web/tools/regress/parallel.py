#!/usr/bin/env python3
"""Insist that everything a view CALLS a counterpart is actually drawn parallel.

A form-diagram member and the force-diagram ray that represents it must be
parallel. That reciprocity is the whole subject: it is what lets you read a
force off a drawing instead of computing it. When it is broken the drawing
still looks like a force diagram, every ray is simply wrong, and nothing on
screen says so.

The views already declare which elements are counterparts, by calling
dw.link(...) so that hovering one highlights them all. Those groups are
exported with the ops, and this walks them and measures the angle between
every pair.

Two modes:

  offline (default)  read python/ops/ex*.json — fast, but only ever sees the
                     DEFAULT state of each view.

  --live             drive the real page in headless Chrome and re-check after
                     flipping EACH boolean in the view's own state object, one
                     at a time. This is the mode that matters: a pole put on
                     the correct side for the arch can still be mirrored for
                     the cable, and only the live pass sees it.

Run from drawings/, with a server on 8741:
    uv run python web/tools/regress/parallel.py
    uv run python web/tools/regress/parallel.py --live
    uv run python web/tools/regress/parallel.py --live 4_1 5_1
"""
import glob
import json
import math
import os
import sys
import time
from pathlib import Path

TOL = 1.0          # degrees
MIN_LEN = 0.012    # of the frame width — shorter than this and the angle is noise

VIEWS = ['1_1', '1_2', '1_3', '1_4', '1_5', '2_1', '2_2', '2_3', '3_1a',
         '3_1b', '3_2', '3_3', '3_4', '4_1', '4_2', '4_3', '5_1', '5_2',
         '5_3', '6_1', '6_2', '6_3', '6_4', '6_5', '7_1', '7_3', '7_4']

# never worth flipping: they change what is LABELLED, not what is drawn, and
# _k is the step index, which the player owns
SKIP_KEYS = {'_k', 'lbl', 'labels', 'show', 'sIF'}


def ang(a, b):
    return math.degrees(math.atan2(b[1] - a[1], b[0] - a[0])) % 180.0


def longest(pts):
    """The longest leg of a polyline, as the direction that represents it."""
    best, bl = None, 0.0
    for i in range(len(pts) - 1):
        L = math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1])
        if L > bl:
            bl, best = L, (pts[i], pts[i + 1])
    return best, bl


def check(groups, dirs, fw):
    """Compare every pair inside every declared link group."""
    bad = []
    for g in groups:
        have = [(n, dirs[n]) for n in g if n in dirs and dirs[n][1] >= fw * MIN_LEN]
        if len(have) < 2:
            continue
        base_name, (base_ang, _) = have[0]
        for n, (a, _) in have[1:]:
            diff = abs(a - base_ang)
            diff = min(diff, 180 - diff)
            if diff > TOL:
                bad.append((base_name, base_ang, n, a, diff))
    return bad


# --------------------------------------------------------------- offline ----

LINEAR = ('seg', 'arrow', 'darrow', 'dline', 'strokes')


def pts_of(geom):
    d, t = geom['data'], geom['dtype']
    if t.endswith('Line'):
        return [d['start'][:2], d['end'][:2]]
    if t.endswith(('Polyline', 'Polygon')):
        return [p[:2] for p in d['points']]
    return []


def from_ops(path):
    D = json.load(open(path))['data']
    fw = D['frame'][1][0] - D['frame'][0][0]
    dirs = {}
    for op in D['ops']:
        o = op['data']
        if o['kind'] not in LINEAR or not o.get('geometry'):
            continue
        seg, L = longest(pts_of(o['geometry']))
        if seg is None:
            continue
        dirs.setdefault(o['name'].split('[')[0], (ang(*seg), L))
    return D.get('links', []), dirs, fw


# ------------------------------------------------------------------ live ----

# pulled straight out of the live drawing rather than out of the ops file, so
# that a state the exporter never visits is still measured
# The RAW export keys its operations by `op` (segment / arrow / polyline), not
# by the `kind` the ops database uses. Pulled from the live drawing rather than
# from the ops file so that a state the exporter never visits is still measured.
LIVE_OPS = ('segment', 'arrow', 'polyline', 'polygon')

PROBE = """(() => {
  const raw = window.__exportOps();
  const LIN = %s;
  const dirs = {};
  for (const o of raw.ops) {
    if (!LIN.includes(o.op) || !o.p || o.p.length < 2) continue;
    let best = null, bl = 0;
    for (let i = 0; i < o.p.length - 1; i++) {
      const L = Math.hypot(o.p[i+1][0]-o.p[i][0], o.p[i+1][1]-o.p[i][1]);
      if (L > bl) { bl = L; best = [o.p[i], o.p[i+1]]; }
    }
    const nm = o.name.split('[')[0];
    if (best && !(nm in dirs)) dirs[nm] = [best, bl];
  }
  return JSON.stringify({links: raw.links || [], dirs,
    fw: raw.frame[1][0] - raw.frame[0][0]});
})()""" % json.dumps(list(LIVE_OPS))


def live_dirs(chrome):
    raw = json.loads(chrome.evaluate(PROBE))
    dirs = {k: (ang(*v[0]), v[1]) for k, v in raw['dirs'].items()}
    return raw['links'], dirs, raw['fw']


def live_states(chrome):
    """Every boolean the view's own panel can flip, one at a time."""
    keys = json.loads(chrome.evaluate(
        "JSON.stringify(Object.entries(window.__dw._lastApply.state)"
        ".filter(([k, v]) => typeof v === 'boolean').map(([k]) => k))"))
    return [k for k in keys if k not in SKIP_KEYS]


def run_live(views):
    sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
    from make_movies import BASE, Chrome                       # noqa: E402
    total = 0
    chrome = Chrome()
    try:
        for v in views:
            chrome.goto(f"{BASE}/?ex={v}&step=last")
            time.sleep(0.35)
            cur = json.loads(chrome.evaluate(
                "JSON.stringify(window.__dw._lastApply.state)"))
            probes = [('default', {})]
            for k in live_states(chrome):
                probes.append((f"{k}={not cur[k]}", {k: not cur[k]}))
            hits = []
            for name, patch in probes:
                if patch:
                    chrome.evaluate(
                        f"JSON.stringify(window.__set({json.dumps(patch)}) ? 1 : 1)")
                    time.sleep(0.2)
                links, dirs, fw = live_dirs(chrome)
                for row in check(links, dirs, fw):
                    hits.append((name, row))
                if patch:            # put it back before the next probe
                    chrome.evaluate(
                        f"JSON.stringify(window.__set({json.dumps({list(patch)[0]: cur[list(patch)[0]]})}) ? 1 : 1)")
                    time.sleep(0.15)
            if not links:
                print(f"ex{v:<6} — no dw.link() groups declared, nothing checked")
                continue
            if not hits:
                print(f"ex{v:<6} ok — {len(links)} groups × {len(probes)} states")
                continue
            total += len(hits)
            print(f"\nex{v}")
            for name, (a, aa, b, bb, dd) in sorted(hits, key=lambda x: -x[1][4]):
                print(f"   [{name:<14}] {a:<12} {aa:7.3f}°  vs  {b:<12}"
                      f" {bb:7.3f}°   OFF BY {dd:6.2f}°")
    finally:
        chrome.close()
    return total


# ------------------------------------------------------------------ main ----

def main():
    args = sys.argv[1:]
    live = '--live' in args
    if live:
        args.remove('--live')
    views = args or VIEWS
    if live:
        total = run_live(views)
    else:
        total = 0
        for v in views:
            f = f"python/ops/ex{v}.json"
            if not os.path.exists(f):
                continue
            links, dirs, fw = from_ops(f)
            bad = check(links, dirs, fw)
            if not bad:
                continue
            total += len(bad)
            print(f"\nex{v}")
            for a, aa, b, bb, dd in sorted(bad, key=lambda x: -x[4]):
                print(f"   {a:<12} {aa:7.3f}°   vs   {b:<12} {bb:7.3f}°"
                      f"   OFF BY {dd:6.2f}°")
    print(f"\n{total} linked pairs are not drawn parallel (tolerance {TOL}°)")
    return 1 if total else 0


if __name__ == '__main__':
    sys.exit(main())
