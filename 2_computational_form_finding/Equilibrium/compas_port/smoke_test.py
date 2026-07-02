#!/usr/bin/env python3
"""Build each generated view_*_compas.py scene WITHOUT opening a window.
Patches Viewer.show to a no-op, runs the script, reports scene object count + errors."""
import os, sys, glob, runpy, re
os.environ.setdefault("QT_QPA_PLATFORM", "offscreen")

import compas_viewer
from compas_viewer import Viewer

counts = {}
def fake_show(self, *a, **k):
    # count children added to the scene
    try:
        counts["n"] = len(list(self.scene.objects))
    except Exception:
        counts["n"] = -1
Viewer.show = fake_show

ROOT = "C:/brg/Teaching/2_computational_form_finding/Equilibrium/drawings"
only = set(int(x) for x in sys.argv[1:]) if len(sys.argv) > 1 else None
files = sorted(glob.glob(ROOT + "/view_*/view_*_compas.py"),
               key=lambda p: int(re.search(r"view_(\d+)_compas", p).group(1)))
ok = bad = 0
for f in files:
    n = int(re.search(r"view_(\d+)_compas", f).group(1))
    if only and n not in only:
        continue
    counts["n"] = None
    # fresh module namespace each run; force show() by appending nothing (script calls show in __main__)
    try:
        g = runpy.run_path(f, run_name="__main__")
        c = counts.get("n")
        print(f"view_{n:>2}: OK  scene_objects={c}")
        ok += 1
    except Exception as e:
        import traceback
        print(f"view_{n:>2}: FAIL {type(e).__name__}: {e}")
        traceback.print_exc()
        bad += 1
print(f"\n{ok} ok, {bad} failed")
