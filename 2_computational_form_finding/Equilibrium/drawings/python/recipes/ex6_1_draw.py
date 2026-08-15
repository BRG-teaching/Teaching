"""EX 6.1 — is it determinate? Count it

Auto-generated from ops/ex6_1.json — the drawing as literal COMPAS
calls, one operation per line, in construction order. Regenerate with
web/tools/export_ops.py; edit the web view, not this file.
"""
from compas.colors import Color
from compas.geometry import Circle, Frame, Line, Point, Polygon, Polyline  # noqa: F401

ops = []


def add(step, kind, geometry, color=None, **style):
    """One drawing operation; style: width, dash, opacity, text, head, until."""
    ops.append({"step": step, "kind": kind, "geometry": geometry,
                "color": color, **style})


# step 0 — The exercise
add(0, 'label', Point(-4, 8, 0), text='Form diagrams — no loads, no scale: this task is a count')

# step 1 — The rule
add(1, 'label', Point(0, 5.6, 0), color=Color.from_hex("#aaaaaa"), text='S members + A reaction components  vs  2 × K joints')

# step 2 — A — the Warren truss
add(2, 'segment', Line((-22, -3, 0), (-15.0684, -3, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(2, 'segment', Line((-15.0684, -3, 0), (-8.1316, -3, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(2, 'segment', Line((-8.1316, -3, 0), (-1.2, -3, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(2, 'segment', Line((-18.5212, 3.006, 0), (-11.5896, 3.006, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(2, 'segment', Line((-11.5896, 3.006, 0), (-4.6528, 3.006, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(2, 'segment', Line((-22, -3, 0), (-18.5212, 3.006, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(2, 'segment', Line((-18.5212, 3.006, 0), (-15.0684, -3, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(2, 'segment', Line((-15.0684, -3, 0), (-11.5896, 3.006, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(2, 'segment', Line((-11.5896, 3.006, 0), (-8.1316, -3, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(2, 'segment', Line((-8.1316, -3, 0), (-4.6528, 3.006, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(2, 'segment', Line((-4.6528, 3.006, 0), (-1.2, -3, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(2, 'point', Point(-22, -3, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(2, 'point', Point(-15.0684, -3, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(2, 'point', Point(-8.1316, -3, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(2, 'point', Point(-1.2, -3, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(2, 'point', Point(-18.5212, 3.006, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(2, 'point', Point(-11.5896, 3.006, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(2, 'point', Point(-4.6528, 3.006, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(2, 'segment', Line((-23.3, -3.6, 0), (-23.85, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(2, 'segment', Line((-22.65, -3.6, 0), (-23.2, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(2, 'segment', Line((-22, -3.6, 0), (-22.55, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(2, 'segment', Line((-21.35, -3.6, 0), (-21.9, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(2, 'segment', Line((-20.7, -3.6, 0), (-21.25, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(2, 'segment', Line((-2.5, -3.6, 0), (-3.05, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(2, 'segment', Line((-1.85, -3.6, 0), (-2.4, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(2, 'segment', Line((-1.2, -3.6, 0), (-1.75, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(2, 'segment', Line((-0.55, -3.6, 0), (-1.1, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(2, 'segment', Line((0.1, -3.6, 0), (-0.45, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(2, 'segment', Line((-3, -4.5, 0), (0.6, -4.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.05616)
add(2, 'label', Point(-23, 5, 0), text='A')
add(2, 'label', Point(-16.8, -7.4, 0), color=Color.from_hex("#3f9c20"), text='S 11 + A 3 − 2K 14 = +0  determinate')
add(2, 'label', Point(-16.8, 5, 0), text='Warren truss')

# step 3 — B — the stepped truss
add(3, 'segment', Line((-6, -3, 0), (-0.7844, 2.2156, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((-0.7844, 2.2156, 0), (4.4104, 2.2156, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((4.4104, 2.2156, 0), (9.6052, 2.2156, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((-6, -3, 0), (-0.7844, -3, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((-0.7844, -3, 0), (4.4104, -3, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((4.4104, -3, 0), (9.6052, -3, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((9.6052, -3, 0), (14.8, -3, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((9.6052, -7.862, 0), (14.8, -7.862, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((-0.7844, 2.2156, 0), (-0.7844, -3, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((4.4104, 2.2156, 0), (4.4104, -3, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((9.6052, 2.2156, 0), (9.6052, -3, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((9.6052, -3, 0), (9.6052, -7.862, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((14.8, -3, 0), (14.8, -7.862, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((-0.7844, 2.2156, 0), (4.4104, -3, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((4.4104, -3, 0), (9.6052, 2.2156, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((4.4104, -3, 0), (9.6052, -7.862, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((9.6052, -7.862, 0), (14.8, -3, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'point', Point(-6, -3, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(3, 'point', Point(-0.7844, 2.2156, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(3, 'point', Point(4.4104, 2.2156, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(3, 'point', Point(9.6052, 2.2156, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(3, 'point', Point(-0.7844, -3, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(3, 'point', Point(4.4104, -3, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(3, 'point', Point(9.6052, -3, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(3, 'point', Point(14.8, -3, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(3, 'point', Point(9.6052, -7.862, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(3, 'point', Point(14.8, -7.862, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(3, 'segment', Line((-7.3, -3.6, 0), (-7.85, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(3, 'segment', Line((-6.65, -3.6, 0), (-7.2, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(3, 'segment', Line((-6, -3.6, 0), (-6.55, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(3, 'segment', Line((-5.35, -3.6, 0), (-5.9, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(3, 'segment', Line((-4.7, -3.6, 0), (-5.25, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(3, 'segment', Line((14.305, -9.2055, 0), (14.4464, -10.1247, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(3, 'segment', Line((14.7646, -8.74588, 0), (14.9061, -9.66512, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(3, 'segment', Line((15.2243, -8.28626, 0), (15.3657, -9.2055, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(3, 'segment', Line((15.6839, -7.82665, 0), (15.8253, -8.74588, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(3, 'segment', Line((16.1435, -7.36702, 0), (16.2849, -8.28626, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(3, 'segment', Line((14.5879, -10.1955, 0), (17.1335, -7.64987, 0)), color=Color.from_hex("#aaaaaa"), width=0.05616)
add(3, 'label', Point(-7, 5, 0), text='B')
add(3, 'label', Point(-0.8, -7.4, 0), color=Color.from_hex("#3f9c20"), text='S 17 + A 3 − 2K 20 = +0  determinate')
add(3, 'label', Point(-0.8, 5, 0), text='stepped truss')

# step 4 — C — the X-braced panels
add(4, 'segment', Line((11, -3, 0), (18.7896, -3, 0)), color=Color.from_hex("#ce4095"), width=0.11831)
add(4, 'segment', Line((18.7896, -3, 0), (26.5792, -3, 0)), color=Color.from_hex("#ce4095"), width=0.11831)
add(4, 'segment', Line((11, 2.2156, 0), (18.7896, 2.2156, 0)), color=Color.from_hex("#ce4095"), width=0.11831)
add(4, 'segment', Line((18.7896, 2.2156, 0), (26.5792, 2.2156, 0)), color=Color.from_hex("#ce4095"), width=0.11831)
add(4, 'segment', Line((11, -3, 0), (11, 2.2156, 0)), color=Color.from_hex("#ce4095"), width=0.11831)
add(4, 'segment', Line((18.7896, -3, 0), (18.7896, 2.2156, 0)), color=Color.from_hex("#ce4095"), width=0.11831)
add(4, 'segment', Line((26.5792, -3, 0), (26.5792, 2.2156, 0)), color=Color.from_hex("#ce4095"), width=0.11831)
add(4, 'segment', Line((11, 2.2156, 0), (18.7896, -3, 0)), color=Color.from_hex("#ce4095"), width=0.11831)
add(4, 'segment', Line((11, -3, 0), (18.7896, 2.2156, 0)), color=Color.from_hex("#b9b9bd"), width=0.11831)
add(4, 'segment', Line((18.7896, 2.2156, 0), (26.5792, -3, 0)), color=Color.from_hex("#ce4095"), width=0.11831)
add(4, 'segment', Line((18.7896, -3, 0), (26.5792, 2.2156, 0)), color=Color.from_hex("#b9b9bd"), width=0.11831)
add(4, 'point', Point(11, -3, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(4, 'point', Point(18.7896, -3, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(4, 'point', Point(26.5792, -3, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(4, 'point', Point(11, 2.2156, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(4, 'point', Point(18.7896, 2.2156, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(4, 'point', Point(26.5792, 2.2156, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(4, 'segment', Line((9.7, -3.6, 0), (9.15, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(4, 'segment', Line((10.35, -3.6, 0), (9.8, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(4, 'segment', Line((11, -3.6, 0), (10.45, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(4, 'segment', Line((11.65, -3.6, 0), (11.1, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(4, 'segment', Line((12.3, -3.6, 0), (11.75, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(4, 'segment', Line((25.2792, -3.6, 0), (24.7292, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(4, 'segment', Line((25.9292, -3.6, 0), (25.3792, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(4, 'segment', Line((26.5792, -3.6, 0), (26.0292, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(4, 'segment', Line((27.2292, -3.6, 0), (26.6792, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(4, 'segment', Line((27.8792, -3.6, 0), (27.3292, -4.35, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(4, 'segment', Line((24.7792, -4.5, 0), (28.3792, -4.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.05616)
add(4, 'label', Point(10, 5, 0), text='C')
add(4, 'label', Point(16.2, -7.4, 0), color=Color.from_hex("#ce4095"), text='S 11 + A 3 − 2K 12 = +2  over-determined ×2')
add(4, 'label', Point(16.2, 5, 0), text='two X-braced panels')


if __name__ == "__main__":
    print("EX 6.1 — is it determinate? Count it —", len(ops), "operations")
