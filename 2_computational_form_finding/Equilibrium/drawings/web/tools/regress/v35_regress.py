#!/usr/bin/env python3
"""View 35 (Lufthansa Hangar V) — python port of the applet construction,
regression-checked against live state dumps (live35/*.json).

Chain (from geogebra.xml commands):
  truss: A free; B = A+(22,0); C = A+(0,34); D = (B.x, C.y); E = mid(C,D)
         F = Intersect[Circle[E,geom], Circle[C,geom]] (lower); G symm. from E,D
         members: l=FC(1) m=CE(2) ?=F-?(3) s=FG(4) t=FE(5)? n=ED(6) p=DG(7)
                  q=GB(8) r=AF(9)? j=BF(?) p_2=BA(11)  -- numbering via texts, TBD
  F3 direction: H draggable on arc around D; b_1 = Line[H D]
  force diagram: O free-ish (80,60); P = O - (0, F1/sFD); Q = P - (0, F2/sFD)
                 S = Q + (F3/sFD)·unit(D->K dir along b_1)
  trial: T free pole; U free on b (vertical through A/C);
         strings parallel to TO,TP,TQ,TS from U -> V -> W -> Z; Z = e_2 ∩ h_2
         l_2 = line through Z parallel O->S = R123 action line
  reactions (three-force): B support takes B_H horizontal + B_V vertical;
         A takes A_V vertical: n_4 = Line[N_1 O_1] (l_2 hits the two support
         horizontals? -- actually via m_4/l_4 free horizontals) ... resolved in
         the force diagram: g_3 = horizontal through S; E_1 = load line ∩ g_3
         (bottom of B_V); C_1 = Intersect[Line[S ∥ S_3-B], Line[O ∥ S_3-A]]
  cremona: G_1 = Line[P ∥ m] ∩ Line[O ∥ l]        (joint C: members 2,1)
           D_1 = Line[O b(vert)] ∩ Line[C_1 ∥ AB]  (A_V / B_V split)
           H_1 = Line[O ∥ r] ∩ Line[D_1 ∥ AB]      (joint A: member 9/r)
           I_1 = Line[H_1 ∥ j] ∩ Line[S ∥ q]       (joint B: members j,q)
           J_1 = Line[G_1 ∥ t] ∩ Line[I_1 ∥ s]     (joint F)
           K_1 = Line[Q ∥ n] ∩ Line[J_1 ∥ a_1]     (joint E)
"""
import json, math, pathlib, sys

SP = pathlib.Path(__file__).parent
LIVE = SP / "live35"


def unit(v):
    l = math.hypot(*v)
    return (v[0] / l, v[1] / l)


def inter(p1, d1, p2, d2):
    """Intersection of p1+t*d1 with p2+s*d2."""
    det = d1[0] * d2[1] - d1[1] * d2[0]
    t = ((p2[0] - p1[0]) * d2[1] - (p2[1] - p1[1]) * d2[0]) / det
    return (p1[0] + t * d1[0], p1[1] + t * d1[1])


def compute(s):
    A = s["A"]; geom = s["geom"]; sFD = s["sFD"]
    F1, F2, F3 = s["F1"], s["F2"], s["F3"]
    B = (A[0] + 22, A[1])
    C = (A[0], A[1] + 34)
    D = (B[0], C[1])
    E = ((C[0] + D[0]) / 2, C[1])
    # F: intersect circles (E,geom),(C,geom) -> lower point
    half = (E[0] - C[0]) / 2
    mid = ((C[0] + E[0]) / 2, C[1])
    dy = math.sqrt(max(geom * geom - half * half * 4 / 4 * 0 - ((E[0]-C[0])/2)**2, 0))
    # distance C-E = E[0]-C[0]; F is geom from both -> x = midpoint, y = C[1] - sqrt(geom^2 - (CE/2)^2)
    ce = E[0] - C[0]
    F = (mid[0], C[1] - math.sqrt(geom * geom - (ce / 2) ** 2))
    de = D[0] - E[0]
    G = ((E[0] + D[0]) / 2, C[1] - math.sqrt(geom * geom - (de / 2) ** 2))
    # F3 direction: along H->D (H draggable); direction = unit(D - H)
    H = s["H"]
    dir3 = unit((D[0] - H[0], D[1] - H[1]))
    # force diagram
    O = s["O"]
    P = (O[0], O[1] - F1 / sFD)
    Q = (P[0], P[1] - F2 / sFD)
    S = (Q[0] + dir3[0] * F3 / sFD, Q[1] + dir3[1] * F3 / sFD)
    # trial funicular
    T = s["T"]; U = s["U"]
    dOT = (T[0] - O[0], T[1] - O[1])
    dPT = (T[0] - P[0], T[1] - P[1])
    dQT = (T[0] - Q[0], T[1] - Q[1])
    dST = (T[0] - S[0], T[1] - S[1])
    # strings hang from U on the vertical through A(C); load verticals:
    # F1 acts on C's vertical (x=A.x), F2 on E's vertical, F3 on D's line b_1
    vC = (C[0], 0); vE = (E[0], 0)
    V = inter(U, dOT, (E[0], 0), (0, 1))     # string ∥ T-P from U? see below
    # e_2 = Line[U a_2]: through U ∥ O-T ... intersected with F1's vertical? No:
    # P(applet) = Intersect[k_1 i_1]... strings: e_2 through U ∥ OT;
    # V = Intersect[c_1(vertical through E) f_2(through U ∥ TP)]  (from XML)
    V = inter(U, dPT, (E[0], 0), (0, 1))
    # W = Intersect[b_1(line H-D) g_2(through V ∥ TQ)]
    W = inter(V, dQT, H, (D[0] - H[0], D[1] - H[1]))
    # Z = e_2 ∩ h_2: e_2 through U ∥ OT ... but e_2 = Line[U a_2] with a_2=Seg[O T]
    Z = inter(U, dOT, W, dST)
    # R123 line of action: through Z ∥ O->S
    dOS = (S[0] - O[0], S[1] - O[1])
    # reactions in the force diagram (three-force):
    # g_3 horizontal through S; E_1 = vertical load line ∩ g_3
    E_1 = (O[0], S[1])
    # S_3 = intersect of R123 action line with b (vertical through A)
    S_3 = inter(Z, dOS, (A[0], 0), (0, 1))
    # C_1 = Intersect[r_2 s_2]; r_2 = Line[S m_2], m_2 = Segment[S_3 B]
    #                            s_2 = Line[O n_2], n_2 = Segment[S_3 A]
    dS3B = (B[0] - S_3[0], B[1] - S_3[1])
    dS3A = (A[0] - S_3[0], A[1] - S_3[1])
    C_1 = inter(S, dS3B, O, dS3A)
    # D_1 = Intersect[t_2 a_3]; t_2 = Line[O b] (vertical), a_3 = Line[C_1 i_7] (∥ AB horizontal)
    D_1 = (O[0], C_1[1])
    # cremona
    dm = (E[0] - C[0], 0)           # member m = C-E (horizontal)
    dl = (C[0] - F[0], C[1] - F[1])  # member l = F-C
    G_1 = inter(P, dm, O, dl)
    dr = (F[0] - A[0], F[1] - A[1])  # member r = A-F
    H_1 = inter(O, dr, D_1, (1, 0))
    dj = (F[0] - B[0], F[1] - B[1])  # member j = B-F
    dq = (B[0] - G[0], B[1] - G[1])  # member q = G-B
    I_1 = inter(H_1, dj, S, dq)
    dt = (E[0] - F[0], E[1] - F[1])  # member t = F-E
    ds = (G[0] - F[0], G[1] - F[1])  # member s = F-G
    J_1 = inter(G_1, dt, I_1, ds)
    dn = (D[0] - E[0], D[1] - E[1])  # member n = E-D (horizontal)
    da1 = (E[0] - G[0], E[1] - G[1])  # member a_1 = G-E
    K_1 = inter(Q, dn, J_1, da1)
    return dict(A=A, B=B, C=C, D=D, E=E, F=F, G=G, O=O, P=P, Q=Q, S=S,
                V=V, W=W, Z=Z, E_1=E_1, S_3=S_3, C_1=C_1, D_1=D_1,
                G_1=G_1, H_1=H_1, I_1=I_1, J_1=J_1, K_1=K_1)


def check(state_file):
    d = json.loads((LIVE / state_file).read_text())
    def pt(n):
        return (d[n]["x"], d[n]["y"])
    s = dict(A=pt("A"), H=pt("H"), O=pt("O"), T=pt("T"), U=pt("U"),
             geom=d["ChangeGeometryofTruss"]["val"], sFD=d["scaleForceDiagram"]["val"],
             F1=d["F_{1}"]["val"], F2=d["F_{2}"]["val"], F3=d["F_{3}"]["val"])
    r = compute(s)
    worst = ("", 0.0)
    n = 0
    for k, v in r.items():
        if k not in d or "x" not in d[k]:
            continue
        err = math.hypot(v[0] - d[k]["x"], v[1] - d[k]["y"])
        n += 1
        if err > worst[1]:
            worst = (k, err)
    print(f"{state_file}: {n} points checked, worst {worst[0]} = {worst[1]:.3g}")
    return worst[1]


if __name__ == "__main__":
    bad = 0.0
    for f in ["default.json", "s4.json", "s12.json", "geom6.json", "geom16.json"]:
        bad = max(bad, check(f))
    print("WORST:", f"{bad:.3g}", "OK" if bad < 1e-9 else "INVESTIGATE")
