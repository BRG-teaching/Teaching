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
add(0, 'label', Point(12, 12.4, 0), text='Form diagrams — no loads, no scale: this task is a count')

# step 1 — The rule
add(1, 'label', Point(12, 10.6, 0), color=Color.from_hex("#aaaaaa"), text='S members + A reaction components  vs  2 × K joints')

# step 2 — A — the Warren truss
add(2, 'segment', Line((-23, -2, 0), (-18.4678, -2, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(2, 'segment', Line((-18.4678, -2, 0), (-13.9322, -2, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(2, 'segment', Line((-13.9322, -2, 0), (-9.4, -2, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(2, 'segment', Line((-20.7254, 1.927, 0), (-16.1932, 1.927, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(2, 'segment', Line((-16.1932, 1.927, 0), (-11.6576, 1.927, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(2, 'segment', Line((-23, -2, 0), (-20.7254, 1.927, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(2, 'segment', Line((-20.7254, 1.927, 0), (-18.4678, -2, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(2, 'segment', Line((-18.4678, -2, 0), (-16.1932, 1.927, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(2, 'segment', Line((-16.1932, 1.927, 0), (-13.9322, -2, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(2, 'segment', Line((-13.9322, -2, 0), (-11.6576, 1.927, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(2, 'segment', Line((-11.6576, 1.927, 0), (-9.4, -2, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(2, 'point', Point(-23, -2, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(2, 'point', Point(-18.4678, -2, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(2, 'point', Point(-13.9322, -2, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(2, 'point', Point(-9.4, -2, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(2, 'point', Point(-20.7254, 1.927, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(2, 'point', Point(-16.1932, 1.927, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(2, 'point', Point(-11.6576, 1.927, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(2, 'segment', Line((-24.02, -2.55, 0), (-24.6564, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(2, 'segment', Line((-23.34, -2.55, 0), (-23.9764, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(2, 'segment', Line((-22.66, -2.55, 0), (-23.2964, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(2, 'segment', Line((-21.98, -2.55, 0), (-22.6164, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(2, 'segment', Line((-21.3, -2.55, 0), (-21.9364, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(2, 'segment', Line((-10.42, -2.55, 0), (-11.0564, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(2, 'segment', Line((-9.74, -2.55, 0), (-10.3764, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(2, 'segment', Line((-9.06, -2.55, 0), (-9.6964, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(2, 'segment', Line((-8.38, -2.55, 0), (-9.0164, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(2, 'segment', Line((-7.7, -2.55, 0), (-8.3364, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(2, 'segment', Line((-11.2, -3.5, 0), (-7.6, -3.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.05616)
add(2, 'label', Point(-24.4, 4.2, 0), text='A')
add(2, 'label', Point(-16.2, -10.2, 0), color=Color.from_hex("#3f9c20"), text='11 + 3 − 14 = +0 determinate')
add(2, 'label', Point(-15.2, 4.2, 0), text='Warren truss')

# step 3 — B — the stepped truss
add(3, 'segment', Line((-6.4, -2, 0), (-2.9898, 1.4102, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((-2.9898, 1.4102, 0), (0.4068, 1.4102, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((0.4068, 1.4102, 0), (3.8034, 1.4102, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((-6.4, -2, 0), (-2.9898, -2, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((-2.9898, -2, 0), (0.4068, -2, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((0.4068, -2, 0), (3.8034, -2, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((3.8034, -2, 0), (7.2, -2, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((3.8034, -5.179, 0), (7.2, -5.179, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((-2.9898, 1.4102, 0), (-2.9898, -2, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((0.4068, 1.4102, 0), (0.4068, -2, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((3.8034, 1.4102, 0), (3.8034, -2, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((3.8034, -2, 0), (3.8034, -5.179, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((7.2, -2, 0), (7.2, -5.179, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((-2.9898, 1.4102, 0), (0.4068, -2, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((0.4068, -2, 0), (3.8034, 1.4102, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((0.4068, -2, 0), (3.8034, -5.179, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((3.8034, -5.179, 0), (7.2, -2, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'point', Point(-6.4, -2, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(3, 'point', Point(-2.9898, 1.4102, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(3, 'point', Point(0.4068, 1.4102, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(3, 'point', Point(3.8034, 1.4102, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(3, 'point', Point(-2.9898, -2, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(3, 'point', Point(0.4068, -2, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(3, 'point', Point(3.8034, -2, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(3, 'point', Point(7.2, -2, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(3, 'point', Point(3.8034, -5.179, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(3, 'point', Point(7.2, -5.179, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(3, 'segment', Line((-7.42, -2.55, 0), (-8.0564, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(3, 'segment', Line((-6.74, -2.55, 0), (-7.3764, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(3, 'segment', Line((-6.06, -2.55, 0), (-6.6964, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(3, 'segment', Line((-5.38, -2.55, 0), (-6.0164, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(3, 'segment', Line((-4.7, -2.55, 0), (-5.3364, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(3, 'segment', Line((6.86766, -6.28916, 0), (5.96766, -6.28916, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(3, 'segment', Line((7.34849, -5.80832, 0), (6.44849, -5.80832, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(3, 'segment', Line((7.82932, -5.32749, 0), (6.92933, -5.32749, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(3, 'segment', Line((8.31016, -4.84666, 0), (7.41016, -4.84666, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(3, 'segment', Line((8.79099, -4.36583, 0), (7.89099, -4.36583, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(3, 'segment', Line((6.98787, -7.51245, 0), (9.53345, -4.96687, 0)), color=Color.from_hex("#aaaaaa"), width=0.05616)
add(3, 'label', Point(-7.8, 4.2, 0), text='B')
add(3, 'label', Point(0.4, -12.6, 0), color=Color.from_hex("#3f9c20"), text='17 + 3 − 20 = +0 determinate')
add(3, 'label', Point(1.4, 4.2, 0), text='stepped truss')

# step 4 — C — the X-braced panels
add(4, 'segment', Line((10.2, -2, 0), (15.2932, -2, 0)), color=Color.from_hex("#ce4095"), width=0.11831)
add(4, 'segment', Line((15.2932, -2, 0), (20.3864, -2, 0)), color=Color.from_hex("#ce4095"), width=0.11831)
add(4, 'segment', Line((10.2, 1.4102, 0), (15.2932, 1.4102, 0)), color=Color.from_hex("#ce4095"), width=0.11831)
add(4, 'segment', Line((15.2932, 1.4102, 0), (20.3864, 1.4102, 0)), color=Color.from_hex("#ce4095"), width=0.11831)
add(4, 'segment', Line((10.2, -2, 0), (10.2, 1.4102, 0)), color=Color.from_hex("#ce4095"), width=0.11831)
add(4, 'segment', Line((15.2932, -2, 0), (15.2932, 1.4102, 0)), color=Color.from_hex("#ce4095"), width=0.11831)
add(4, 'segment', Line((20.3864, -2, 0), (20.3864, 1.4102, 0)), color=Color.from_hex("#ce4095"), width=0.11831)
add(4, 'segment', Line((10.2, 1.4102, 0), (15.2932, -2, 0)), color=Color.from_hex("#ce4095"), width=0.11831)
add(4, 'segment', Line((10.2, -2, 0), (15.2932, 1.4102, 0)), color=Color.from_hex("#b9b9bd"), width=0.11831)
add(4, 'segment', Line((15.2932, 1.4102, 0), (20.3864, -2, 0)), color=Color.from_hex("#ce4095"), width=0.11831)
add(4, 'segment', Line((15.2932, -2, 0), (20.3864, 1.4102, 0)), color=Color.from_hex("#b9b9bd"), width=0.11831)
add(4, 'point', Point(10.2, -2, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(4, 'point', Point(15.2932, -2, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(4, 'point', Point(20.3864, -2, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(4, 'point', Point(10.2, 1.4102, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(4, 'point', Point(15.2932, 1.4102, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(4, 'point', Point(20.3864, 1.4102, 0), color=Color.from_hex("#ffffff"), width=0.26936)
add(4, 'segment', Line((9.18, -2.55, 0), (8.5436, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(4, 'segment', Line((9.86, -2.55, 0), (9.2236, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(4, 'segment', Line((10.54, -2.55, 0), (9.9036, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(4, 'segment', Line((11.22, -2.55, 0), (10.5836, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(4, 'segment', Line((11.9, -2.55, 0), (11.2636, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(4, 'segment', Line((19.3664, -2.55, 0), (18.73, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(4, 'segment', Line((20.0464, -2.55, 0), (19.41, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(4, 'segment', Line((20.7264, -2.55, 0), (20.09, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(4, 'segment', Line((21.4064, -2.55, 0), (20.77, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(4, 'segment', Line((22.0864, -2.55, 0), (21.45, -1.9136, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(4, 'segment', Line((18.5864, -3.5, 0), (22.1864, -3.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.05616)
add(4, 'label', Point(8.8, 4.2, 0), text='C')
add(4, 'label', Point(15.2932, -10.2, 0), color=Color.from_hex("#ce4095"), text='11 + 3 − 12 = +2 OVER-determined ×2')
add(4, 'label', Point(16.2932, 4.2, 0), text='two X-braced panels')


if __name__ == "__main__":
    print("EX 6.1 — is it determinate? Count it —", len(ops), "operations")
