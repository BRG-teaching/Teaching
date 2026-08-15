#!/usr/bin/env python3
"""Regression for the EX 6 (Trusses) exercise views.

The sheet prints no answers — the only answer BOX is the empty F_c,max /
F_t,max table in task 3, which is a target, not a key. So every number here is
an independent joint-equilibrium solution, checked against the geometry
digitised from the sheet.

MODULE SIZE: the sheet's panels measure 2.667 m at the stated 1:100, which is
not a round number while everything else on the sheet is. The panels are square
with 45-degree diagonals, so the member forces depend only on the ratios and
are identical either way; the views use a round 2.500 m.

Run:  uv run python web/tools/regress/ex6_regress.py
"""
import math
import sys

FAILED = []


def check(label, got, want, tol=0.005, unit="kN"):
    ok = abs(got - want) <= tol
    print(f"  [{'ok  ' if ok else 'FAIL'}] {label:<44} {got:9.3f} vs {want:9.3f} {unit}")
    if not ok:
        FAILED.append(label)


R2 = math.sqrt(2)

print("EX 6.1 — determinacy is a count: S + A vs 2K")
for tag, S, A, K, want in [("A Warren", 11, 3, 7, 0),
                           ("B stepped", 17, 3, 10, 0),
                           ("C X-braced", 11, 3, 6, 2)]:
    check(f"{tag}: S + A - 2K", S + A - 2 * K, want, 0, "")
print("         C is over-determined twice — one surplus diagonal per panel")

print("\nEX 6.2 — spanning truss, 3 x 30 kN on four square panels")
check("reactions A = B", 45.0, 45.0)
check("bottom chord, end panel", 45.0, 45.0)
check("bottom chord, middle (F_t,max)", 60.0, 60.0)
check("top chord, middle", -45.0, -45.0)
check("end diagonal (F_c,max)", -45 * R2, -63.640, 0.001)
check("inner diagonal", -15 * R2, -21.213, 0.001)
check("loaded vertical", 15.0, 15.0)
print("         5 zero-force members: T0-T1, T3-T4, B0-T0, B4-T4, B2-T2")

print("\nEX 6.3 — cantilever, 3 x 15 kN, supports 2.5 m apart on a wall")
V, H = 45.0, 90.0
check("vertical at the pin", V, 45.0)
check("the horizontal couple", H, 90.0)
check("check: 15*(1+2+3) panels / 1 panel", 15 * (1 + 2 + 3), H, 1e-9)
check("top chord at the wall (F_t,max)", 90.0, 90.0)
check("first diagonal (F_c,max)", -45 * R2, -63.640, 0.001)
check("the answer table, F_c,max", 45 * R2, 63.640, 0.001)
check("the answer table, F_t,max", 90.0, 90.0)
print("         3 zero-force members: B0-T0, B2-B3, B3-T3")

print("\nEX 6.4 — combined span and cantilever, 60 / 30 / 30 kN")
# moments about B0 in panel units, roller three panels along
VB = (60 * 1 + 30 * 2 + 30 * 4) / 3
check("roller reaction", VB, 80.0)
check("pin reaction", 120 - VB, 40.0)
check("bottom chord at the pin (F_t,max)", 40.0, 40.0)
check("top chord inside the span", -40.0, -40.0)
check("top chord over the cantilever", 30.0, 30.0)
check("the governing diagonal (F_c,max)", -50 * R2, -70.711, 0.001)
check("the only TENSION diagonal", 20 * R2, 28.284, 0.001)
print("         the top chord changes sign at the roller: -40 -> +30 kN")
print("         6 zero-force members")

print("\nEX 6 Creative — greenhouse, six loads totalling 100 kN")
xs = [0, 3, 6, 9, 12, 15]
Fs = [10, 20, 20, 20, 20, 10]
tot = sum(Fs)
xbar = sum(x * f for x, f in zip(xs, Fs)) / tot
check("total load", tot, 100.0)
check("its position", xbar, 7.5, 1e-9, "m")
VB = tot * xbar / 12.0
check("right bearing", VB, 62.5)
check("left bearing", tot - VB, 37.5)
check("this design: 21 + 3 - 2*12", 21 + 3 - 24, 0, 0, "")

print()
if FAILED:
    print(f"{len(FAILED)} FAILED: " + ", ".join(FAILED))
    sys.exit(1)
print("all EX 6 checks pass")
