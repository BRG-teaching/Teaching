#!/usr/bin/env python3
"""View 39 (Constant force bottom chord truss - construction) - python port.

Chain (geogebra.xml):
  force: load line down from O_1 (on b_1, vertical through N_1) by loadG*sFD
         five times -> P_1 Q_1 R_1 S_1 T_1; U_1 = mid(Q_1, R_1) (= centre);
         t_1 = Circle[U_1, BC*sFD]; levels through each load point cut the
         circle LEFT: G_2(O_1) F_2(P_1) E_2(Q_1) D_2(R_1) B_2(S_1) C_2(T_1);
         deck forces  = [circlePt -> loadPt] horizontals;
         cable forces = [circlePt -> U_1] rays (all = radius = constant);
         web forces   = [consecutive circle points].
  form:  deck = stab_1 on the deck level, panel points H_2 I_2 J_2 K_2 L_2 on
         the station verticals; supports R (left) S (right);
         cable kinks by walking: M_2 = Line[R || q_2(G_2-U_1)] ∩
         Line[H_2 || r_2(G_2-F_2)], N_2 = Line[M_2 || p_2(F_2-U_1)] ∩
         Line[I_2 || s_2(F_2-E_2)], ... Q_2; last piece Q_2->S || k_2(C_2-U_1).
"""
import json, math, pathlib, sys

SP = pathlib.Path(__file__).parent


def inter(p1, d1, p2, d2):
    det = d1[0] * d2[1] - d1[1] * d2[0]
    t = ((p2[0] - p1[0]) * d2[1] - (p2[1] - p1[1]) * d2[0]) / det
    return (p1[0] + t * d1[0], p1[1] + t * d1[1])


def circle_left(c, r, y):
    """Leftmost intersection of circle (c, r) with horizontal y."""
    dy = y - c[1]
    dx = math.sqrt(max(r * r - dy * dy, 0))
    return (c[0] - dx, y)


def compute(s):
    g = s["loadG"] * s["sFD"]
    O1 = (s["llx"], s["lly"])
    P1 = (O1[0], O1[1] - g)
    Q1 = (O1[0], P1[1] - g)
    R1 = (O1[0], Q1[1] - g)
    S1 = (O1[0], R1[1] - g)
    T1 = (O1[0], S1[1] - g)
    U1 = ((Q1[0] + R1[0]) / 2, (Q1[1] + R1[1]) / 2)
    r = s["BC"] * s["sFD"]
    G2 = circle_left(U1, r, O1[1])
    F2 = circle_left(U1, r, P1[1])
    E2 = circle_left(U1, r, Q1[1])
    D2 = circle_left(U1, r, R1[1])
    B2 = circle_left(U1, r, S1[1])
    C2 = circle_left(U1, r, T1[1])

    # form: deck level + station verticals + supports
    R = (s["xR"], s["deckY"])
    S = (s["xS"], s["deckY"])
    H2 = (s["st"][0], s["deckY"])
    I2 = (s["st"][1], s["deckY"])
    J2 = (s["st"][2], s["deckY"])
    K2 = (s["st"][3], s["deckY"])
    L2 = (s["st"][4], s["deckY"])

    def d(a, b):
        return (b[0] - a[0], b[1] - a[1])
    M2 = inter(R, d(G2, U1), H2, d(G2, F2))
    N2 = inter(M2, d(F2, U1), I2, d(F2, E2))
    O2 = inter(N2, d(E2, U1), J2, d(E2, D2))
    P2 = inter(O2, d(D2, U1), K2, d(D2, B2))
    Q2 = inter(P2, d(B2, U1), L2, d(B2, C2))
    return dict(O_1=O1, P_1=P1, Q_1=Q1, R_1=R1, S_1=S1, T_1=T1, U_1=U1,
                G_2=G2, F_2=F2, E_2=E2, D_2=D2, B_2=B2, C_2=C2,
                M_2=M2, N_2=N2, O_2=O2, P_2=P2, Q_2=Q2)


def check(fname):
    d = json.loads((SP / "live39" / fname).read_text())
    def pt(n): return (d[n]["x"], d[n]["y"])
    s = dict(loadG=d["loadG"]["val"], sFD=d["scaleForceDiagram"]["val"],
             BC=d["BottomChordForce"]["val"],
             llx=pt("O_1")[0], lly=pt("O_1")[1],
             deckY=pt("R")[1], xR=pt("R")[0], xS=pt("S")[0],
             st=[pt(n)[0] for n in ("H_2", "I_2", "J_2", "K_2", "L_2")])
    r = compute(s)
    worst = ("", 0.0)
    for k, v in r.items():
        if k in d and "x" in d[k]:
            e = math.hypot(v[0] - d[k]["x"], v[1] - d[k]["y"])
            if e > worst[1]:
                worst = (k, e)
    print(f"{fname}: worst {worst[0]} = {worst[1]:.3g}")
    return worst[1]


if __name__ == "__main__":
    bad = max(check(f) for f in ["s0.json", "s9.json", "bc4.json", "g04.json"])
    print("WORST:", f"{bad:.3g}", "OK" if bad < 1e-9 else "INVESTIGATE")
