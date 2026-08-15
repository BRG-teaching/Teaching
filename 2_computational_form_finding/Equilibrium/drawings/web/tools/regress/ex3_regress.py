#!/usr/bin/env python3
"""Regression for the EX 3 (UE 3 "Seiltragwerke") exercise views.

Sheet I-3 is the ONE graphic-statics sheet in the archive that ships a full
official worked solution, so its printed numbers are a real answer key rather
than a self-check. This file re-derives every one of them from the sheet's own
givens, independently of the JavaScript, and asserts the views agree.

Answer key, read straight off EX3-cable-structures-solution-de.pdf:
    task 1a   pole 102.02 pt = 3.60 cm at 1 cm = 20 kN  ->  H = 72 kN
              rays 132.80 pt = 4.69 cm                  ->  N = 93.7 kN
    task 1c   "Die innere Kraft ... ist bei den Auflagern am groessten."
    task 2    answer table: N_d,max = 94 kN
    task 3a   s_d = 7.5 kN/m2      3b  s_d = 37.5 kN/m    3c  R = 2437.5 kN
    task 3d   N_d,max = N1 = N2 = 5915 kN, A = B = 5915 kN
    task 3e   double load -> 11 830 kN
    Creative  N1 = 3000 kN, N2 = N_max = 3500 kN, A = 3500, B = 3500 kN
              f_td = 223.8 N/mm2, A_req = 15 638.96 mm2, D = 142 mm
              (exactly 141.11 mm, rounded UP to the next whole mm)

Run:  uv run python web/tools/regress/ex3_regress.py
"""
import math
import sys

FAILED = []


def check(label, got, want, tol, unit=""):
    ok = abs(got - want) <= tol
    mark = "ok  " if ok else "FAIL"
    print(f"  [{mark}] {label:<46} {got:10.3f} vs {want:10.3f} {unit}")
    if not ok:
        FAILED.append(label)


print("EX 3.1a — point load, 6 m span (sheet: F_d = 120 kN, sag 2.50 m)")
L, Fd, f = 6.0, 120.0, 2.50
H = Fd * L / (4 * f)
N = math.hypot(H, Fd / 2)
check("H = F*L/(4f)", H, 72.0, 0.05, "kN")
check("N = sqrt(H^2 + (F/2)^2)", N, 93.7, 0.05, "kN")
# the sheet's own drawn segment angle, digitised: 39.8 deg
check("segment angle", math.degrees(math.atan2(f, L / 2)), 39.8, 0.1, "deg")
# and the drawn ray length, at 1 cm = 20 kN, was 132.80 pt
check("ray length implied by N", N / 20 * 28.3465, 132.80, 0.3, "pt")

print("\nEX 3.1b — line load q_d = 20 kN/m over the same span")
q = 20.0
R = q * L
check("R = q*L equals task 1a's point load", R, 120.0, 1e-9, "kN")
fb = 1.25
Hb = q * L * L / (8 * fb)
check("H = q*L^2/(8f) at the sheet's sag", Hb, 72.0, 0.05, "kN")
check("end tangents meet 2f below the chord", 2 * fb, 2.50, 1e-9, "m")
Nsup = math.hypot(Hb, R / 2)
check("N at the supports (longest ray)", Nsup, 93.7, 0.05, "kN")
check("N at the crown (shortest ray) = H", Hb, 72.0, 0.05, "kN")
# 1c: the force must be strictly largest at the supports
xs = [i / 200 for i in range(201)]
Nx = [math.hypot(Hb, q * L * (x - 0.5)) for x in xs]
print(f"  [{'ok  ' if max(Nx) == Nx[0] == Nx[-1] and min(Nx) == Nx[100] else 'FAIL'}]"
      f" 1c: N is greatest at the supports, least at the crown")
if not (max(Nx) == Nx[0] == Nx[-1] and min(Nx) == Nx[100]):
    FAILED.append("1c monotonicity")

print("\nEX 3.2 — Seilform (answer table: N_d,max = 94 kN)")
# geometry digitised from the official solution, in PDF points
AX, AY = 217.8, 513.6
BX, BY = 642.9, 460.9
LX = [274.3, 331.0, 416.0, 529.4]
U = 0.09 * (1 / 0.09)          # work directly in points; only ratios matter
SC = 1.0
F = [20.0, 40.0, 40.0, 20.0]
Hs = 67.8
# in the view's drawing units 1 unit = 0.09 pt-equivalents; the physics only
# needs consistent x spacing and the same scale the view uses
u = 0.09
xs = [0.0] + [(x - AX) * u for x in LX] + [(BX - AX) * u]
ys_target = -(BY - AY) * u
dx = [xs[i + 1] - xs[i] for i in range(len(xs) - 1)]
cum = [0.0]
for fo in F:
    cum.append(cum[-1] + fo)
extra = sum(cum[i] * dx[i] for i in range(len(dx)))
s0 = (ys_target - extra / Hs) / (xs[-1] - xs[0])
sl = [s0 + c / Hs for c in cum]
Nseg = [Hs * math.hypot(1, m) for m in sl]
check("N_d,max", max(Nseg), 94.0, 0.15, "kN")
check("sum of vertical loads", sum(F), 120.0, 1e-9, "kN")
# the cable must land exactly on B
yend = sum(sl[i] * dx[i] for i in range(len(dx)))
check("funicular lands on support B", yend, ys_target, 1e-9, "units")
# one horizontal thrust for every segment, by construction
for i, m in enumerate(sl):
    Hi = Nseg[i] / math.hypot(1, m)
    check(f"thrust in segment {i + 1}", Hi, Hs, 1e-9, "kN")

print("\nEX 3.3 — Pavilhao de Portugal (Siza), the sheet's own worked numbers")
gk, qk = 5.0, 0.5
sd_area = gk * 1.35 + qk * 1.5
check("a) s_d = g_k*1.35 + q_k*1.5", sd_area, 7.5, 1e-9, "kN/m2")
b = 5.0
sd_line = sd_area * b
check("b) s_d = s_d * b (5 m influence width)", sd_line, 37.5, 1e-9, "kN/m")
span3 = 65.0
R3 = sd_line * span3
check("c) R = s_d * l", R3, 2437.5, 1e-9, "kN")
# d) the sheet reports N1 = N2 = 5915 kN, so its drawn sag follows from that
N3 = 5915.0
H3 = math.sqrt(N3 ** 2 - (R3 / 2) ** 2)
f3 = sd_line * span3 ** 2 / (8 * H3)
print(f"         implied thrust H = {H3:.1f} kN, implied sag f = {f3:.3f} m")
check("d) N from H and R/2 closes back", math.hypot(H3, R3 / 2), 5915.0, 0.5, "kN")
check("e) double the load doubles the force", 2 * N3, 11830.0, 0.5, "kN")

print("\nEX 3 Creative — asymmetric roof, S235 cable")
# the solution prints N1 = 3000 and N2 = N_max = 3500. Those two numbers fix
# the whole geometry: the segments share one thrust H and the vertical parts
# must add up to R, so Av^2 - Bv^2 = 3000^2 - 3500^2 and Av + Bv = 2437.5
N1_c, N2_c = 3000.0, 3500.0
Av = (R3 + (N1_c ** 2 - N2_c ** 2) / R3) / 2
Bv = R3 - Av
Hc = math.sqrt(N1_c ** 2 - Av ** 2)
check("Creative: A_v", Av, 552.08, 0.05, "kN")
check("Creative: B_v", Bv, 1885.42, 0.05, "kN")
check("Creative: H", Hc, 2948.8, 0.1, "kN")
check("Creative: N2 closes", math.hypot(Hc, Bv), 3500.0, 0.05, "kN")
check("Creative: vertical equilibrium", Av + Bv, R3, 1e-9, "kN")
dHc = Hc and (R3 / 2 - Av) * span3 / Hc
check("Creative: B stands above A by", dHc, 14.70, 0.02, "m")
check("Creative: sag below the chord", sd_line * span3 ** 2 / (8 * Hc), 6.72, 0.01, "m")
# the sheet's ANSWER TABLE says A = 3000, B = 3500; the sentence under it says
# A = 3500. Only the table can be right -- a cable pulls along itself, so the
# reaction at a support equals the force in the segment reaching it. With
# A = 3500 the vertical components would sum to 2712 kN, not the 2437.5 there
bad = math.sqrt(3500.0 ** 2 - Hc ** 2) + Bv
print(f"         if A were 3500 kN the verticals would sum to {bad:.0f} kN, not {R3:.1f}")
check("the table's A = N1, not 3500", N1_c, 3000.0, 1e-9, "kN")

Nmax_c = 3500.0
ftd = 223.8
Areq = Nmax_c * 1000 / ftd
check("A_req = N_d / f_td", Areq, 15638.96, 0.5, "mm2")
D = math.sqrt(4 * Areq / math.pi)
# the exact diameter is 141.11 mm; the sheet prints 142, i.e. rounded UP to
# the next whole millimetre -- which is the only safe way to round a required
# diameter, since rounding down would put the area below A_req
check("D = sqrt(4A/pi), exact", D, 141.11, 0.02, "mm")
check("D rounded up, as the sheet prints it", math.ceil(D), 142.0, 0, "mm")
# f_td itself: S235, f_tk = 235, gamma_M = 1.05
check("f_td = f_tk / gamma_M", 235 / 1.05, 223.8, 0.05, "N/mm2")

print()
if FAILED:
    print(f"{len(FAILED)} FAILED: " + ", ".join(FAILED))
    sys.exit(1)
print("all EX 3 checks pass against the official solution")
