#!/usr/bin/env python
"""Screenshot one or more views at a chosen step.

The quickest way to actually LOOK at a drawing while building it, instead of
guessing from the source. Same headless-Chrome driver the movie renderer uses,
so what you see is what the site draws.

Requires the web app served locally (python3 -m http.server 8741 from web/).

Usage (from the drawings/ directory):
    uv run python web/tools/shot.py 9 14           # views 9 and 14, final step
    uv run python web/tools/shot.py 3_1a --step 4  # exercise view, step 4
    uv run python web/tools/shot.py 12 --out /tmp  # choose the output folder
"""
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from make_movies import BASE, Chrome  # noqa: E402


def shot(chrome, view, step, outdir):
    ex = isinstance(view, str) and not str(view).isdigit()
    q = f"ex={view}" if ex else f"view={view}"
    stem = f"ex{view}" if ex else f"view_{view}"
    chrome.goto(f"{BASE}/?{q}&step=0")
    last = chrome.evaluate("window.__player.steps.length - 1")
    k = last if step is None else min(step, last)
    chrome.evaluate(f"window.__player.set({k})")
    time.sleep(1.4)                    # let the draw-in of that step finish
    out = Path(outdir) / f"{stem}_s{k}.png"
    chrome.screenshot(out)
    print(f"{stem}: step {k}/{last} -> {out}")
    return out


def main():
    args = sys.argv[1:]
    step = None
    outdir = Path.cwd()
    if "--step" in args:
        i = args.index("--step")
        step = int(args[i + 1])
        del args[i:i + 2]
    if "--out" in args:
        i = args.index("--out")
        outdir = Path(args[i + 1])
        del args[i:i + 2]
    if not args:
        raise SystemExit(__doc__)
    views = [a if not a.isdigit() else int(a) for a in args]
    chrome = Chrome()
    try:
        for v in views:
            shot(chrome, v, step, outdir)
    finally:
        chrome.close()


if __name__ == "__main__":
    main()
