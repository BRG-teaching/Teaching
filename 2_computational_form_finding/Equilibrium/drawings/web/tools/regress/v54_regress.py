#!/usr/bin/env python3
"""View 54 (Cathedral of Laon) - python port + regression.

Three chained three-point funicular problems over one load line (x = K.x):
  stage 1 (flying buttress A->C): sag B on GuideB; B_p = Circle[B, mid(A,C)]
    ∩ vertical through the guide; pole M from K ∥ A-B_p, L ∥ B_p-C;
    thrust a_1 = 12-strip walk A -> C (stations uniform, half strips at ends,
    strings ∥ M-rays to the 12 uniform divisions of K->L).
  stage 2 (buttress C->E): sag D on GuideD, D_p likewise; pole N on M's
    vertical (Line[L ∥ C-D_p] ∩ M_y); loads L->O (12 divisions);
    thrust t_3 = walk C -> E.
  stage 3 (nave arch F->H): sag G on GuideL, G_p likewise; loads O->P where
    P = load line ∩ Line[N ∥ E-H]; pole solved from the walk (verified to be
    the point on N's vertical: Line[O ∥ F-G_p] ∩ N_y);
    thrust b_5 = walk F -> H. E->H and the ground legs F->I, H->J straight.
"""
import json, math, pathlib

SP = pathlib.Path(__file__).parent


def inter(p1, d1, p2, d2):
    det = d1[0] * d2[1] - d1[1] * d2[0]
    t = ((p2[0] - p1[0]) * d2[1] - (p2[1] - p1[1]) * d2[0]) / det
    return (p1[0] + t * d1[0], p1[1] + t * d1[1])


def sub(a, b): return (a[0] - b[0], a[1] - b[1])


def mirror_pt(P, mid, guide_x):
    """B_p: on the vertical x=guide_x, at distance |P-mid| from P (upper)."""
    r = math.dist(P, mid)
    dy = math.sqrt(max(r * r - (guide_x - P[0]) ** 2, 0))
    return (guide_x, P[1] + dy)


def walk_thrust(A, C, pole, ll_top, ll_bot, n=12):
    """Funicular of n equal strip loads between A and C: stations at strip
    midpoints (half strips at the ends), strings ∥ pole-rays to the uniform
    divisions of the load-line piece ll_top -> ll_bot."""
    xs = [A[0] + (C[0] - A[0]) * (k + 0.5) / n for k in range(n)]  # wait: kinks at strip borders
    # kinks: first at A.x + half strip? measured: dx = h/2 then h...: kink k at
    # A.x + (k - 0.5)*h for k=1..n-1 with h = span/(n-1)?? measured pattern:
    # 13 pieces over 12 stations -> stations at A.x + h/2 + k*h, h = span/12? measured
    # dx: 0.0868 = h/2 with h = 0.1735 = span/12 (span 2.0822/12 = 0.1735 OK)
    span = C[0] - A[0]
    h = span / 12
    stations = [A[0] + h / 2 + k * h for k in range(12)]
    g = (ll_bot[1] - ll_top[1]) / 12
    pts = [A]
    cur = A
    for k in range(12):
        ray = (ll_top[0], ll_top[1] + g * k)         # ray k feeds piece k
        nxt_x = stations[k] if k < 12 else C[0]
        cur = inter(cur, sub(ray, pole), (stations[k], 0), (0, 1))
        pts.append(cur)
    # last piece parallel to the final ray, ending on C's vertical
    cur = inter(cur, sub((ll_top[0], ll_top[1] + g * 12), pole), (C[0], 0), (0, 1))
    pts.append(cur)
    return pts


def compute(s):
    A, C, E, F, H = s["A"], s["C"], s["E"], s["F"], s["H"]
    K, L = s["K"], s["L"]
    Bp = mirror_pt(s["B"], ((A[0] + C[0]) / 2, (A[1] + C[1]) / 2), s["gBx"])
    M = inter(K, sub(Bp, A), L, sub(C, Bp))
    Dp = mirror_pt(s["D"], ((C[0] + E[0]) / 2, (C[1] + E[1]) / 2), s["gDx"])
    N = inter(L, sub(Dp, C), (M[0], 0), (0, 1))
    O = inter(L, (0, -1), N, (1, 0)) if False else None
    # O: the stage-2 load-line end. From the applet: O = K_y ∩ NO_1 where
    # NO_1 = line through N ∥ D_p-E (the last stage-2 string!)
    O = inter(N, sub(E, Dp), (K[0], 0), (0, 1))
    P = inter(N, sub(H, E), (K[0], 0), (0, 1))
    Gp = mirror_pt(s["G"], ((F[0] + H[0]) / 2, (F[1] + H[1]) / 2), s["gLx"])
    # stage-3 pole: on N's vertical, from O ∥ F-G_p; its load piece ends where
    # the ray ∥ the last tangent G_p-H hits the load line (self-consistent,
    # same pattern as O for stage 2)
    M3 = inter(O, sub(Gp, F), (N[0], 0), (0, 1))
    P3 = inter(M3, sub(H, Gp), (K[0], 0), (0, 1))
    a1 = walk_thrust(A, C, M, K, L)
    t3 = walk_thrust(C, E, N, L, O)
    b5 = walk_thrust(F, H, M3, O, P3)
    return dict(B_p=Bp, M=M, D_p=Dp, N=N, O=O, P=P, P3=P3, G_p=Gp, M3=M3,
                a1=a1, t3=t3, b5=b5)


def check(fname):
    d = json.loads((SP / "live54" / fname).read_text())
    def pt(n): return (d[n]["x"], d[n]["y"])
    s = dict(A=pt("A"), B=pt("B"), C=pt("C"), D=pt("D"), E=pt("E"),
             F=pt("F"), G=pt("G"), H=pt("H"), K=pt("K"), L=pt("L"),
             gBx=pt("GuidePtB_1")[0], gDx=pt("GuidePtD_1")[0], gLx=pt("GuidePtL_1")[0])
    r = compute(s)
    worst = ("", 0.0)
    for k in ("B_p", "M", "D_p", "N", "O", "P", "G_p"):
        if k in d and "x" in d[k]:
            e = math.hypot(r[k][0] - d[k]["x"], r[k][1] - d[k]["y"])
            if e > worst[1]:
                worst = (k, e)
    for arr, names in (("a1", ["A", "N_1", "P_3", "Q_2", "R_2", "S", "T", "U", "V", "W", "A_1", "Z", "O_1", "C"]),
                       ("t3", ["C", "D_2", "F_2", "H_2", "J_2", "L_2", "N_2", "O_2", "M_2", "K_2", "I_2", "G_2", "E_8", "E"]),
                       ("b5", ["F", "S_3", "U_3", "W_3", "A_4", "C_4", "E_4", "F_4", "D_4", "B_4", "Z_3", "V_3", "T_3", "H"])):
        for i, nm in enumerate(names):
            if nm in d and "x" in d[nm] and i < len(r[arr]):
                e = math.hypot(r[arr][i][0] - d[nm]["x"], r[arr][i][1] - d[nm]["y"])
                if e > worst[1]:
                    worst = (f"{arr}[{i}]={nm}", e)
    print(f"{fname}: worst {worst[0]} = {worst[1]:.3g}")
    return worst[1]


if __name__ == "__main__":
    bad = max(check(f) for f in ["s0.json", "s15.json", "mode1.json"])
    print("WORST:", f"{bad:.3g}", "OK" if bad < 1e-9 else "INVESTIGATE")
