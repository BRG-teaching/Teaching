#!/usr/bin/env python3
"""View 40 (Continuous beam - symmetrical) - python port + regression.
See web/notes/view_40_analysis.md for the full decode."""
import json, math, pathlib, sys

SP = pathlib.Path(__file__).parent


def inter(p1, d1, p2, d2):
    det = d1[0] * d2[1] - d1[1] * d2[0]
    t = ((p2[0] - p1[0]) * d2[1] - (p2[1] - p1[1]) * d2[0]) / det
    return (p1[0] + t * d1[0], p1[1] + t * d1[1])


def sub(a, b): return (a[0] - b[0], a[1] - b[1])


def compute(s):
    A1, C1 = s["A1"], (2 * s["xB"] - s["A1"][0], s["A1"][1])   # symmetric top line
    R12 = s["R12"]
    R2 = (2 * s["xB"] - R12[0], R12[1])
    I = (s["xB"], s["Iy"])
    # force diagram
    FD0 = s["FD0"]
    g = s["R1"] * s["sFD"] / 100
    FD1 = (FD0[0], FD0[1] - g)
    FD2 = (FD1[0], FD1[1] - g)
    H = inter(FD1, sub(I, R12), FD0, sub(R12, A1))
    Vp = inter(FD1, sub(R2, I), H, (0, 1))
    J = (FD0[0], H[1])
    C_1 = (FD0[0], Vp[1])
    # strips span 1: stations = 8-division of [A1, B1]; B1 = beam top at xB
    B1 = (s["xB"], A1[1])
    st = [(A1[0] + (B1[0] - A1[0]) * k / 8, A1[1]) for k in range(1, 8)]
    ll = [(FD0[0], FD0[1] - g * k / 7) for k in range(8)]   # FD0..FD1 in 7
    # walk backward from Z1 on the tent string g_1 (R12 -> I)
    Z1 = inter(R12, sub(I, R12), st[6], (0, 1))
    W1 = inter(A1, sub(R12, A1), st[0], (0, 1))
    walk = [Z1]
    # rays H->ll[6], H->ll[5], ..., H->ll[2] used for al6..al2
    for k in range(5, 0, -1):
        nxt = inter(walk[-1], sub(ll[k + 1], H), st[k], (0, 1))
        walk.append(nxt)
    O1, A2, B2, C2, D2 = walk[1], walk[2], walk[3], walk[4], walk[5]
    return dict(A1=A1, C1=C1, R2=R2, FD1=FD1, FD2=FD2, H=H, V=Vp, J=J,
                C_1=C_1, Z_1=Z1, W_1=W1, O_1=O1, A_2=A2, B_2=B2, C_2=C2, D_2=D2)


def check(fname):
    d = json.loads((SP / "live40" / fname).read_text())
    def pt(n): return (d[n]["x"], d[n]["y"])
    s = dict(A1=pt("A1"), xB=pt("B")[0], R12=pt("R1_2"), Iy=pt("I")[1],
             FD0=pt("FD_0"), R1=d["R1"]["val"], sFD=d["scaleForceDiagram"]["val"])
    r = compute(s)
    worst = ("", 0.0)
    for k, v in r.items():
        key = k if k in d else k.replace("_", "")
        if key in d and "x" in d[key]:
            e = math.hypot(v[0] - d[key]["x"], v[1] - d[key]["y"])
            if e > worst[1]:
                worst = (k, e)
    print(f"{fname}: worst {worst[0]} = {worst[1]:.3g}")
    return worst[1]


if __name__ == "__main__":
    bad = max(check(f) for f in ["s0.json", "s6.json", "r1lo.json", "r1hi.json"])
    print("WORST:", f"{bad:.3g}", "OK" if bad < 1e-9 else "INVESTIGATE")
