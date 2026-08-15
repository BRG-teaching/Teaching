#!/usr/bin/env python3
"""Regression for the EX 4 (Arch structures) exercise views.

EX 4 prints NO answers anywhere — not one number in an answer table on any of
its three pages. So unlike EX 3 there is no key to check against, and the
targets below are independent derivations from the sheet's own givens and its
digitised geometry. They were produced twice, once here and once by a separate
pass over the PDFs, and they agree.

Run:  uv run python web/tools/regress/ex4_regress.py
"""
import math
import sys

FAILED = []


def check(label, got, want, tol, unit=""):
    ok = abs(got - want) <= tol
    print(f"  [{'ok  ' if ok else 'FAIL'}] {label:<50} {got:11.3f} vs {want:11.3f} {unit}")
    if not ok:
        FAILED.append(label)


print("EX 4.1 — three 40 kN loads on a 6 m span, four equal bays")
L, F = 6.0, 40.0
tot = 3 * F
# a) the relevant force is the end segment = the reaction, and must be 100 kN
Va = tot / 2
Ha = math.sqrt(100.0 ** 2 - Va ** 2)
check("a) V at each support", Va, 60.0, 1e-9, "kN")
check("a) H from the 100 kN constraint", Ha, 80.0, 1e-9, "kN")
fa = (Va * 3.0 - F * 1.5) / Ha
check("a) rise from the mid-span moment", fa, 1.500, 1e-9, "m")
inner = math.hypot(Ha, Va - F)
check("a) inner segment force", inner, 82.462, 0.001, "kN")
# the funicular must land back on the far support
xs, sh, y = [0, 1.5, 3.0, 4.5, 6.0], Va, 0.0
for i in range(4):
    y += (sh / Ha) * (xs[i + 1] - xs[i])
    sh -= F if i < 3 else 0
check("a) funicular closes on B", y, 0.0, 1e-9, "m")

# b) the thrust is given as 120 kN and B sits 2 m below A
Hb, drop = 120.0, -2.0
Mload = F * (1.5 + 3.0 + 4.5)
Bv = (Mload - Hb * drop) / L
Av = tot - Bv
check("b) A_v", Av, 20.0, 1e-9, "kN")
check("b) B_v", Bv, 100.0, 1e-9, "kN")
check("b) reaction at A", math.hypot(Hb, Av), 121.655, 0.001, "kN")
check("b) reaction at B", math.hypot(Hb, Bv), 156.205, 0.001, "kN")
sh, y = Av, 0.0
nodes = []
for i in range(4):
    y += (sh / Hb) * (xs[i + 1] - xs[i])
    nodes.append(y)
    sh -= F
check("b) node at 1.5 m", nodes[0], 0.250, 1e-9, "m")
check("b) node at 3.0 m", nodes[1], 0.000, 1e-9, "m")
check("b) node at 4.5 m", nodes[2], -0.750, 1e-9, "m")
check("b) funicular closes on B, 2 m down", nodes[3], -2.000, 1e-9, "m")
# c) the inverted cable swaps the two vertical reactions
BvC = (Mload + Hb * drop) / L
check("c) cable A_v (swapped)", tot - BvC, 100.0, 1e-9, "kN")
check("c) cable B_v (swapped)", BvC, 20.0, 1e-9, "kN")

print("\nEX 4.2 — two parabolic arches, g_d = 4 kN/m over 24 m")
q = 4.0


def arch(span, rise):
    return (q * span * span) / (8 * rise), (q * span) / 2


for tag, L1, L2, f1, f2, tA, tB, tC in [
        ("a)", 12, 12, 3.0, 3.0, 33.941, 48.000, 33.941),
        ("b)", 14, 10, 3.0, 3.0, 43.025, 50.596, 26.034)]:
    H1, V1 = arch(L1, f1)
    H2, V2 = arch(L2, f2)
    check(f"{tag} H1", H1, 24.0 if tag == "a)" else 32.667, 0.001, "kN")
    check(f"{tag} H2", H2, 24.0 if tag == "a)" else 16.667, 0.001, "kN")
    check(f"{tag} A", math.hypot(H1, V1), tA, 0.001, "kN")
    check(f"{tag} B", math.hypot(H2 - H1, V1 + V2), tB, 0.001, "kN")
    check(f"{tag} C", math.hypot(H2, V2), tC, 0.001, "kN")
    check(f"{tag} vertical equilibrium", V1 * 2 + V2 * 2, q * 24, 1e-9, "kN")
# c) what actually changes at B
Ha1, _ = arch(12, 3.0)
Hb1, _ = arch(14, 3.0)
Hb2, _ = arch(10, 3.0)
print(f"         c) B_v is 48.00 kN in BOTH cases; only the horizontal appears:"
      f" 0 -> {Hb2 - Hb1:.2f} kN")
check("c) |B| grows by", math.hypot(Hb2 - Hb1, 48) - 48, 2.596, 0.001, "kN")
# d) the roller at B forces the thrusts to match
H2d, _ = arch(10, 3.0)
f1d = (q * 14 * 14) / (8 * H2d)
check("d) rise of the missing arch", f1d, 5.880, 0.001, "m")
check("d) B is vertical again", arch(14, f1d)[0] - H2d, 0.0, 1e-9, "kN")

print("\nEX 4 Creative — the cathedral")
g1, g2, nave, aisle, spr = 160.0, 80.0, 5.0, 5.0, 6.956
riseN = 4.398
Hn = (g1 * nave * nave) / (8 * riseN)
check("nave thrust H", Hn, 113.688, 0.001, "kN")
check("R_1d is g_1d's resultant", g1 * nave, 800.0, 1e-9, "kN")
check("springing reaction", math.hypot(Hn, 400), 415.842, 0.001, "kN")
check("its angle off vertical", math.degrees(math.atan2(Hn, 400)), 15.866, 0.001, "deg")
fa2 = (g2 * aisle * aisle / 8) / Hn
check("a) aisle rise for a vertical pier", fa2, 2.199, 0.001, "m")
check("a) exactly half the nave's rise", fa2 * 2, riseN, 0.002, "m")
check("a) pier head, vertical", g1 * nave / 2 + g2 * aisle / 2, 600.0, 1e-9, "kN")
M = Hn * spr
check("b) overturning at the buttress base", M, 790.8, 0.1, "kNm")
for b, want in [(2.0, 590.8), (3.0, 327.2), (4.0, 195.4)]:
    check(f"b) minimum G at b = {b} m", 2 * M / b - g2 * aisle / 2, want, 0.1, "kN")

print()
if FAILED:
    print(f"{len(FAILED)} FAILED: " + ", ".join(FAILED))
    sys.exit(1)
print("all EX 4 checks pass")
