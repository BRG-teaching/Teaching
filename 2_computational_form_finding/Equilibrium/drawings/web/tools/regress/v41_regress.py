#!/usr/bin/env python3
"""View 41 (Continuous beam - cantilever) - python port + regression.
Chain per web/notes/view_41_analysis.md (agent decode, verified here)."""
import json, math, pathlib

SP = pathlib.Path(__file__).parent


def inter(p1, d1, p2, d2):
    det = d1[0] * d2[1] - d1[1] * d2[0]
    t = ((p2[0] - p1[0]) * d2[1] - (p2[1] - p1[1]) * d2[0]) / det
    return (p1[0] + t * d1[0], p1[1] + t * d1[1])


def sub(a, b): return (a[0] - b[0], a[1] - b[1])


def compute(s):
    A, C = s["A"], s["C"]
    B = s["B"]
    App = s["App"]                          # A'' on the slab left edge
    P1 = s["P1"]                            # coarse-tent apex
    FD0 = s["FD0"]
    i_len = abs(B[0] - A[0]); n_len = abs(C[0] - B[0])
    g1 = s["R1"] * i_len / 2 * s["sFD"] / 100
    g2 = s["R1"] * n_len / 2 * s["sFD"] / 100
    FD1 = (FD0[0], FD0[1] - g1)
    FD2 = (FD1[0], FD1[1] - g2)
    Bpp = (B[0], App[1])                    # B'' at A'' level on the B vertical
    # coarse tent + main pole
    J1 = inter(FD0, sub(P1, App), FD2, sub(Bpp, P1))
    K1 = (FD0[0], J1[1])                    # H_tension on the load line level
    # subsystem 1: pole H at mid FD0-FD1 on J1's vertical
    H = (J1[0], (FD0[1] + FD1[1]) / 2)
    G1 = inter(App, sub(FD0, H), Bpp, sub(H, FD1))
    # subsystem 2: strings through H_1 on E's vertical
    E = ((B[0] + C[0]) / 2, A[1])
    # H_1 from: through B'' parallel to [W_2 L_3]... geometric equivalent:
    # sub-2 is a cantilever propped at A and B: its funicular strings from
    # B'' to H_1 (on E vertical) and A''-H_1 the closing chord; pole L_3 at
    # (J1.x mirrored?, ...). Use the decode: H_1 = j_6 (thru B'' par i_6) ∩ j.
    # i_6 = [W_2 L_3] with L_3 = Z_2 + (Hlen, 0). Equivalent force relations:
    Hlen = abs(J1[0] - FD0[0])              # pole distance = H force (units)
    # sub-2 reactions from statics: w = load/unit = R1*sFD/100/2 per x-unit
    w = s["R1"] * s["sFD"] / 100 / 2
    AV2 = -w * n_len ** 2 / 2 / i_len       # uplift (negative up-value)
    B2 = g2 - AV2
    # string through B'' with slope = B2/Hlen falling toward E? direction from
    # force diagram: ray [W_2 L_3] has run Hlen, rise B2 -> slope B2/Hlen.
    H_1 = inter(Bpp, (Hlen, B2), (E[0], 0), (0, 1))
    # closing chord A''-H_1 extended to the C vertical
    C1p = inter(App, sub(H_1, App), (C[0], 0), (0, 1))
    # main reactions
    AV = g1 / 2 + AV2                       # A_V1 + A_V2 (A_V1 = R1/2)
    Bv = (g1 + g2) - AV
    # refined funicular back span (8 strips)
    B1 = Bpp
    al = [(App[0] + (B[0] - App[0]) * k / 8, 0) for k in range(1, 8)]
    ll1 = [(FD0[0], FD0[1] - g1 * k / 7) for k in range(8)]
    # f_1 string (A''->G1) and g_1 (G1->B'')
    P11 = inter(App, sub(G1, App), al[0], (0, 1))
    walk = [P11]
    for k in range(1, 6):
        walk.append(inter(walk[-1], sub(ll1[k], H), al[k], (0, 1)))
    P17 = inter(G1, sub(Bpp, G1), al[6], (0, 1))
    a_1 = [App] + walk + [P17, B1]
    # cantilever pole L_5 (on the mirrored pole x) + walk
    L5 = inter(FD2, sub(H_1, Bpp), FD1, sub(C1p, App))
    gl = [(B[0] + (C[0] - B[0]) * k / 8, 0) for k in range(1, 8)]
    ll2 = [(FD0[0], FD1[1] - g2 * k / 7) for k in range(8)]
    Q11 = inter(Bpp, sub(H_1, Bpp), gl[0], (0, 1))
    walk2 = [Q11]
    for k in range(1, 7):
        walk2.append(inter(walk2[-1], sub(ll2[7 - k], L5), gl[k], (0, 1)))
    f_9 = [B1] + walk2 + [C1p]
    # mirrors
    Hp = (2 * FD0[0] - H[0], H[1])
    P_1m = (2 * FD0[0] - L5[0], L5[1])
    return dict(FD_1=FD1, FD_2=FD2, J_1=J1, K_1=K1, H=H, G_1=G1, H_1=H_1,
                AV=AV, Bv=Bv, AV2=AV2, B2=B2, a_1=a_1, f_9=f_9, L_5=L5,
                Hp=Hp, P_1m=P_1m, C1p=C1p, Bpp=Bpp)


def check(fname):
    d = json.loads((SP / "live41" / fname).read_text())
    def pt(n): return (d[n]["x"], d[n]["y"])
    s = dict(A=pt("A"), B=pt("B"), C=pt("C"), App=pt("A''"), P1=pt("P1"),
             FD0=pt("FD_0"), R1=d["R1"]["val"], sFD=d["scaleForceDiagram"]["val"])
    r = compute(s)
    worst = ("", 0.0)
    for k in ("FD_1", "FD_2", "J_1", "H", "G_1", "H_1", "L_5"):
        key = {"H": "H", "Hp": "H'"}.get(k, k)
        if key in d and "x" in d[key]:
            e = math.hypot(r[k][0] - d[key]["x"], r[k][1] - d[key]["y"])
            if e > worst[1]:
                worst = (k, e)
    # walk vertices vs live PL points
    for k in range(1, 8):
        for nm, arr, idx in ((f"PL1_{k}'", "a_1", k), (f"PL4_{k}'", "f_9", k)):
            if nm in d and "x" in d[nm]:
                e = math.hypot(r[arr][idx][0] - d[nm]["x"], r[arr][idx][1] - d[nm]["y"])
                if e > worst[1]:
                    worst = (nm, e)
    print(f"{fname}: worst {worst[0]} = {worst[1]:.3g}")
    return worst[1]


if __name__ == "__main__":
    bad = max(check(f) for f in ["s0.json", "s7.json", "r1lo.json", "r1hi.json"])
    print("WORST:", f"{bad:.3g}", "OK" if bad < 1e-9 else "INVESTIGATE")
