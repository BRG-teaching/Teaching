#!/usr/bin/env python3
"""Open a translated eQUILIBRIUM applet in compas_viewer.

    python run.py 46            # open drawings/view_46/view_46_compas.py
    python run.py 46 --png      # render a PNG preview instead (no OpenGL needed)

Run with the project virtual environment, e.g.:
    ..\.venv\Scripts\python.exe run.py 46
"""
import sys, os, runpy, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def main():
    if len(sys.argv) < 2:
        print(__doc__); return
    n = int(sys.argv[1])
    if "--png" in sys.argv:
        subprocess.run([sys.executable, os.path.join(ROOT, "compas_port", "preview.py"), str(n)])
        print(f"-> compas_port/previews/view_{n}.png")
        return
    script = os.path.join(ROOT, "drawings", f"view_{n}", f"view_{n}_compas.py")
    if not os.path.exists(script):
        print("not found:", script); return
    runpy.run_path(script, run_name="__main__")

if __name__ == "__main__":
    main()
