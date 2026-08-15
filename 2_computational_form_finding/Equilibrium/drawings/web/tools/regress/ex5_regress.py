#!/usr/bin/env python3
"""Regression for the EX 5 (Arch-Cable) exercise views.

EX 5 prints no answers either, and its Creative task prints no load magnitudes
at all — only the two relations F1d = F2d and R = Fd. So the targets here are
derived, and the Creative ones are expressed as multiples of one unknown load.

Run:  uv run python web/tools/regress/ex5_regress.py
"""
import math
import sys

FAILED = []


def check(label, got, want, tol, unit=""):
    ok = abs(got - want) <= tol
    print(f"  [{'ok  ' if ok else 'FAIL'}] {label:<52} {got:10.4f} vs {want:10.4f} {unit}")
    if not ok:
        FAILED.append(label)


print("EX 5.1 — 70 kN over a 7 m span, three sets of supports")
L, F = 7.0, 70.0
check("a/b/c: each vertical reaction", F / 2, 35.0, 1e-9, "kN")
check("a) at f = 1.75 m, H = F*L/(4f)", F * L / (4 * 1.75), 70.0, 1e-9, "kN")
check("a) at f = 1.75 m, member force", math.hypot(70, 35), 78.262, 0.001, "kN")
check("a) at f = 3.50 m, H halves", F * L / (4 * 3.5), 35.0, 1e-9, "kN")
check("c) uniform load: H = q*L^2/(8f)", 10.0 * L * L / (8 * 1.75), 35.0, 1e-9, "kN")
check("c) member at the support", math.hypot(35, 35), 49.497, 0.001, "kN")
print("         b) and c): the roller gives SumH = 0, so both reactions are")
print("            purely vertical and the thrust is carried by an internal tie")

print("\nEX 5.2 — cantilever off a wall, supports 3 m apart")
SEP = 3.0
for tag, xs, Fs, q, Lq in [("a)", [4.0], [40.0], None, None),
                           ("b)", [0.0, 8 / 3, 16 / 3, 8.0], [10.0] * 4, None, None),
                           ("c)", None, None, 5.0, 8.0)]:
    if q is None:
        tot = sum(Fs)
        xR = sum(x * f for x, f in zip(xs, Fs)) / tot
    else:
        tot = q * Lq
        xR = Lq / 2
    H = tot * xR / SEP
    check(f"{tag} resultant", tot, 40.0, 1e-9, "kN")
    check(f"{tag} its position from the wall", xR, 4.0, 1e-9, "m")
    check(f"{tag} H (roller push / pin pull)", H, 53.3333, 0.001, "kN")
    check(f"{tag} pin reaction", math.hypot(H, tot), 66.6667, 0.001, "kN")
    check(f"{tag} its angle", math.degrees(math.atan2(tot, H)), 36.870, 0.001, "deg")
H = 53.3333333333
shear, y, prev = 40.0, 0.0, 0.0
for x, f in zip([0.0, 8 / 3, 16 / 3, 8.0], [10.0] * 4):
    y -= (shear / H) * (x - prev)
    prev = x
    shear -= f
check("b) the cable arrives at the strut", y, -3.0, 1e-6, "m")
q, Lq = 5.0, 8.0
check("c) the parabola arrives at the strut",
      -(40.0 / H) * Lq + (q / (2 * H)) * Lq * Lq, -3.0, 1e-6, "m")
check("c) and arrives with zero slope", -(40.0 / H) + (q / H) * Lq, 0.0, 1e-9, "")

print("\nEX 5 Creative — five load cases, reactions as multiples of one load")
SPAN = 12.0
for tag, pts, udl, wA, wB in [
        ("a)", [(6.0, 1.0)], None, 0.50, 0.50),
        ("b)", [(15.0, 1.0)], None, -0.25, 1.25),
        ("c)", [(6.0, 1.0), (15.0, 1.0)], None, 0.25, 1.75),
        ("d)", [(15.0, 1.0)], (0.0, 12.0, 1 / 12), 0.25, 1.75),
        ("e)", [], (0.0, 18.0, 1.0), 4.50, 13.50)]:
    tot = sum(w for _, w in pts)
    mom = sum(x * w for x, w in pts)
    if udl:
        x0, x1, q = udl
        w = q * (x1 - x0)
        tot += w
        mom += w * (x0 + x1) / 2
    RB = mom / SPAN
    RA = tot - RB
    check(f"{tag} A", RA, wA, 1e-9)
    check(f"{tag} B", RB, wB, 1e-9)
    check(f"{tag} vertical equilibrium", RA + RB, tot, 1e-9)
print("         b) is the only reversed reaction: A acts DOWNWARD")
print("         c) and d) are identical, which is why the sheet prints R = F_d")

print()
if FAILED:
    print(f"{len(FAILED)} FAILED: " + ", ".join(FAILED))
    sys.exit(1)
print("all EX 5 checks pass")
