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
import re
import sys
import time
from pathlib import Path

TOL = 1.0          # degrees
MIN_LEN = 0.012    # of the frame width — shorter than this and the angle is noise

def all_views():
    """Every exercise view on disk, in sheet order.

    Hardcoding this list meant new views were silently not checked, which is
    the one thing a regression must never do."""
    ids = [os.path.basename(f)[2:-3] for f in glob.glob("web/views/ex*.js")]
    ids = [i for i in ids if i != "6_common"]

    def key(i):
        parts = re.findall(r"\d+|[a-zA-Z]+", i)
        return (i.startswith("X"), [int(p) if p.isdigit() else p for p in parts])
    return sorted(ids, key=key)

# never worth flipping: they change what is LABELLED, not what is drawn, and
# _k is the step index, which the player owns
SKIP_KEYS = {'_k', 'lbl', 'labels', 'show', 'sIF'}

# Views with nothing to check, and why. Without this the run ends in a row of
# "no link groups declared" lines that read like an oversight, and the next
# person spends an afternoon establishing that they are not.
NO_FORCE_DIAGRAM = {
    '5_3': 'reactions only — the sheet asks for no force diagram',
    '6_1': 'a determinacy count: no loads, no forces, nothing to pair',
    '7_3': 'qualitative colouring of a force flow, no force diagram',
    '8_3': 'dimensioning and a proof: a bar, a section and a utilisation',
    'X2_9_2': 'a capacity check — section, utilisation, capacity curve',
    'X2_10_2': 'a bar and a bearing: dimensioning, not a force diagram',
    'X2_11': 'tributary areas over one plate, four times: no forces drawn',
    'X2_12': 'the sheet prints no magnitudes at all; the answer is qualitative',
    'X2_16_1': 'buckling lengths: a table of columns, not a force diagram',
    'X2_16_2': 'one point read off a buckling chart',
    '10_1': 'a purely topological test of wall axes: no load, no force diagram',
    '10_4': 'a buckling chart with a demand point: no force polygon to pair',
    '9_1': 'tributary AREAS: no forces anywhere on the sheet, nothing to pair',
    '9_2': 'EX 9 task 2 is qualitative — no magnitudes and no force diagram',
    'X1_2': 'material properties: strengths, square sections and stress-strain '
            'curves. There is no form diagram and no force diagram on the page',
}


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
                why = NO_FORCE_DIAGRAM.get(v)
                print(f"ex{v:<6} — {why}" if why else
                      f"ex{v:<6} — NO dw.link() GROUPS: this view has a force "
                      f"diagram and declares no counterparts, so nothing about "
                      f"it is being checked")
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
    views = args or all_views()
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
