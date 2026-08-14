#!/usr/bin/env python3
"""View 53 (Expo Pavillon Lisbon, A. Siza) - python port + regression.

Roof: cable C-D (D on the horizontal through C), midpoint E, draggable sag F
on the mid vertical; E' = Mirror[E, F] (doubled sag); chords C-E' and E'-D.
Force: G, N on a vertical (R = G->N); through G parallel to chord E'-D,
through N parallel to chord C-E' -> pole O. A = O->G, B = N->O.
Cable drawn as the circumcircle arc through C, F, D.
Wall: polygon R_2 P_2 N_1 M_1 I_1 L_1 O_1 S_2; cable pull A' enters at
Q_1 = wall-top(r_1) ∩ line through B ∥ chord c; force polygon translated to
Z_1: A' = Z_1->A_2 (= N->O copied), member 1 ∥ the wall diagonal P_2-S_2
through Z_1, member 2 vertical (∥ g_1) through A_2 -> B_2; C = D_2->G_2
offset at B_2, D = the wall weight at V_2.
"""
import json, math, pathlib

SP = pathlib.Path(__file__).parent


def inter(p1, d1, p2, d2):
    det = d1[0] * d2[1] - d1[1] * d2[0]
    t = ((p2[0] - p1[0]) * d2[1] - (p2[1] - p1[1]) * d2[0]) / det
    return (p1[0] + t * d1[0], p1[1] + t * d1[1])


def sub(a, b): return (a[0] - b[0], a[1] - b[1])


def compute(s):
    C, D = s["C"], s["D"]
    E = ((C[0] + D[0]) / 2, (C[1] + D[1]) / 2)
    F = s["F"]
    Ep = (2 * F[0] - E[0], 2 * F[1] - E[1])
    G, N = s["G"], s["N"]                    # force-side load anchors (R = G->N)
    # pole: through G ∥ chord d = E'-D; through N ∥ chord c = C-E'
    O = inter(G, sub(D, Ep), N, sub(Ep, C))
    # wall: Q_1 = r_1(vertical through I_1) ∩ line through B ∥ chord c
    Q1 = inter(s["B"], sub(Ep, C), (s["I1"][0], 0), (0, 1))
    # force polygon at the wall: A2 = Z1 + (O - N); B2 = line through Z1 ∥
    # d_2 (P_2->S_2 wall diagonal) ∩ vertical through A2
    Z1 = s["Z1"]
    A2 = (Z1[0] + O[0] - N[0], Z1[1] + O[1] - N[1])
    B2 = inter(Z1, sub(s["S2"], s["P2"]), A2, (0, 1))
    return dict(Ep=Ep, O=O, Q_1=Q1, A_2=A2, B_2=B2)


def check(fname):
    d = json.loads((SP / "live53" / fname).read_text())
    def pt(n): return (d[n]["x"], d[n]["y"])
    s = dict(C=pt("C"), D=pt("D"), F=pt("F"), G=pt("G"), N=pt("N"), B=pt("B"),
             I1=pt("I_1"), Z1=pt("Z_1"), S2=pt("S_2"), P2=pt("P_2"))
    r = compute(s)
    worst = ("", 0.0)
    for k, key in (("Ep", "E'"), ("O", "O"), ("Q_1", "Q_1"), ("A_2", "A_2"), ("B_2", "B_2")):
        if key in d and "x" in d[key]:
            e = math.hypot(r[k][0] - d[key]["x"], r[k][1] - d[key]["y"])
            if e > worst[1]:
                worst = (k, e)
    print(f"{fname}: worst {worst[0]} = {worst[1]:.3g}")
    return worst[1]


if __name__ == "__main__":
    bad = max(check(f) for f in ["s0.json", "s7.json", "mode1.json"])
    print("WORST:", f"{bad:.3g}", "OK" if bad < 1e-9 else "INVESTIGATE")
