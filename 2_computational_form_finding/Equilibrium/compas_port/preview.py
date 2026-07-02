#!/usr/bin/env python3
"""Render each applet's extracted geometry to a PNG with matplotlib (no OpenGL),
as an independent visual check that the COMPAS translation is faithful.
Also builds a contact sheet."""
import os, sys, glob, re, math, json
sys.path.insert(0, os.path.dirname(__file__))
import ggb2compas as G
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.collections import LineCollection
from matplotlib.patches import Polygon as MPolygon, Circle as MCircle

ROOT = "C:/brg/Teaching/2_computational_form_finding/Equilibrium"
OUT = f"{ROOT}/compas_port/previews"
os.makedirs(OUT, exist_ok=True)
man = json.load(open(f"{ROOT}/MANIFEST.json", encoding="utf-8"))
titles = {d["view"]: d["title"] for d in man["drawings"]}


def render(n, xp, ax=None):
    box, pts, instr, warns = G.analyze(xp)
    own = ax is None
    if own:
        fig, ax = plt.subplots(figsize=(7, 7))
    segs, segcols, seglw = [], [], []

    def C(st):
        return (st[0], st[1], st[2])

    for ins in instr:
        k = ins[0]
        if k == "point":
            x, y = pts[ins[1]]
            ax.plot([x], [y], "o", color=C(ins[2]), ms=max(2, ins[2][5] * 0.4), zorder=5)
        elif k == "seg":
            r1, r2, st = ins[1], ins[2], ins[3]
            p1 = pts[r1[1]] if r1[0] == "L" else r1[1]
            p2 = pts[r2[1]] if r2[0] == "L" else r2[1]
            segs.append([p1, p2]); segcols.append(C(st)); seglw.append(st[4] * 0.6)
        elif k == "line":
            segs.append([ins[1], ins[2]]); segcols.append(C(ins[3])); seglw.append(ins[3][4] * 0.6)
        elif k == "vector":
            tail, tip, st = ins[1], ins[2], ins[3]
            ax.annotate("", xy=tip, xytext=tail,
                        arrowprops=dict(arrowstyle="-|>", color=C(st), lw=st[4] * 0.6), zorder=4)
        elif k in ("polyline", "polyline_lit", "conic"):
            if k == "polyline":
                P = [pts[l] for l in ins[1]]
            else:
                P = ins[1]
            xs = [p[0] for p in P]; ys = [p[1] for p in P]
            ax.plot(xs, ys, "-", color=C(ins[2]), lw=ins[2][4] * 0.6, zorder=3)
        elif k == "polygon":
            P = [pts[l] for l in ins[1]]
            ax.add_patch(MPolygon(P, closed=True, facecolor=C(ins[2]),
                                  edgecolor=C(ins[2]), alpha=0.35, lw=ins[2][4] * 0.6, zorder=1))
        elif k == "circle":
            (cx, cy, r), st = ins[1], ins[2]
            ax.add_patch(MCircle((cx, cy), r, fill=False, edgecolor=C(st), lw=st[4] * 0.6, zorder=3))

    if segs:
        ax.add_collection(LineCollection(segs, colors=segcols, linewidths=seglw, zorder=3))
    ax.set_xlim(box[0], box[2]); ax.set_ylim(box[1], box[3])
    ax.set_aspect("equal"); ax.axis("off")
    ax.set_title(f"{n}. {titles.get(n,'')}", fontsize=8)
    if own:
        fig.savefig(f"{OUT}/view_{n}.png", dpi=110, bbox_inches="tight")
        plt.close(fig)
    return len(instr), len(warns)


def main():
    only = set(int(x) for x in sys.argv[1:]) if len(sys.argv) > 1 else None
    files = sorted(glob.glob(f"{ROOT}/drawings/view_*/applet_0/geogebra.xml"),
                   key=lambda p: int(re.search(r"view_(\d+)", p).group(1)))
    sheet = [(int(re.search(r"view_(\d+)", p).group(1)), p) for p in files]
    if only:
        sheet = [(n, p) for n, p in sheet if n in only]
    for n, p in sheet:
        ni, nw = render(n, p)
        print(f"view_{n:>2}: {ni} objects, {nw} warns -> previews/view_{n}.png")

    # contact sheet
    if not only:
        cols = 6
        rows = math.ceil(len(sheet) / cols)
        fig, axes = plt.subplots(rows, cols, figsize=(cols * 3, rows * 3))
        axes = axes.flatten()
        for ax in axes:
            ax.axis("off")
        for i, (n, p) in enumerate(sheet):
            try:
                render(n, p, ax=axes[i])
            except Exception as e:
                axes[i].set_title(f"{n} ERR", fontsize=7)
        fig.tight_layout()
        fig.savefig(f"{ROOT}/compas_port/contact_sheet.png", dpi=90, bbox_inches="tight")
        plt.close(fig)
        print("contact sheet -> compas_port/contact_sheet.png")


if __name__ == "__main__":
    main()
