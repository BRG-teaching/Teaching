#!/usr/bin/env python3
"""Drive a view headlessly, poke its state, and read the answer back.

The exported ops database only ever captures the DEFAULT state, so it cannot
check what a view says when a toggle is flipped or a slider moved. This does:
it loads the page, calls window.__set({...}) to patch the view's own state
object, and prints the RESULT lines the view then displays plus any computed
values asked for.

Usage (from drawings/, with the server on 8741):
    uv run python web/tools/regress/live.py 4_1
    uv run python web/tools/regress/live.py 4_1 --set '{"caseB":true}' \
        --get 'H,NA,NB,Nmax'
"""
import json
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from make_movies import BASE, Chrome  # noqa: E402


def run(chrome, view, patch, gets):
    ex = isinstance(view, str) and not str(view).isdigit()
    q = f"ex={view}" if ex else f"view={view}"
    chrome.goto(f"{BASE}/?{q}&step=last")
    if patch:
        chrome.evaluate(f"JSON.stringify(window.__set({json.dumps(patch)}) ? 1 : 1)")
    time.sleep(0.3)
    lines = chrome.evaluate(
        "(() => {const e = document.querySelector('.eq-result');"
        " return e ? e.innerText : '(no result bar)';})()")
    print(f"--- {view}  state {patch or '(default)'}")
    for ln in str(lines).splitlines():
        if ln.strip():
            print("   ", ln)
    if gets:
        vals = chrome.evaluate(
            "(() => {const d = window.__dw._lastApply.d; const o = {};"
            f" for (const k of {json.dumps(gets)}) o[k] = d[k];"
            " return JSON.stringify(o);})()")
        print("    computed:", vals)


def main():
    args = sys.argv[1:]
    patch, gets = None, None
    if "--set" in args:
        i = args.index("--set"); patch = json.loads(args[i + 1]); del args[i:i + 2]
    if "--get" in args:
        i = args.index("--get"); gets = args[i + 1].split(","); del args[i:i + 2]
    if not args:
        raise SystemExit(__doc__)
    chrome = Chrome()
    try:
        for v in args:
            run(chrome, v if not v.isdigit() else int(v), patch, gets)
    finally:
        chrome.close()


if __name__ == "__main__":
    main()
