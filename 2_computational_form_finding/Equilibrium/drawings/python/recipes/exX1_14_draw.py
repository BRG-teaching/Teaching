"""EX X · 14.1 + 14.2 — two structures, added

Auto-generated from ops/exX1_14.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-15.7, -11.9, 0), text='14.2  a) + b) combined   ·   Form diagram 1:100')
add(0, 'label', Point(13.5, 13.1, 0), text='Force diagram   1 cm ≙ 10 kN')

# step 1 — a) What is given
add(1, 'segment', Line((-25.5, -7.35, 0), (-26.529, -8.379, 0)), color=Color.from_hex("#111111"), width=0.122861)
add(1, 'segment', Line((-26.529, -8.379, 0), (-24.471, -8.379, 0)), color=Color.from_hex("#111111"), width=0.122861)
add(1, 'segment', Line((-24.471, -8.379, 0), (-25.5, -7.35, 0)), color=Color.from_hex("#111111"), width=0.122861)
add(1, 'segment', Line((-26.2718, -8.379, 0), (-26.9994, -7.65139, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-25.7572, -8.379, 0), (-26.4849, -7.65139, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-25.2428, -8.379, 0), (-25.9704, -7.65139, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-24.7282, -8.379, 0), (-25.4559, -7.65139, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-24.2138, -8.379, 0), (-24.9414, -7.65139, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'label', Point(-27, -7.15, 0), text='A')
add(1, 'segment', Line((-10.8, -7.35, 0), (-11.829, -8.379, 0)), color=Color.from_hex("#111111"), width=0.122861)
add(1, 'segment', Line((-11.829, -8.379, 0), (-9.771, -8.379, 0)), color=Color.from_hex("#111111"), width=0.122861)
add(1, 'segment', Line((-9.771, -8.379, 0), (-10.8, -7.35, 0)), color=Color.from_hex("#111111"), width=0.122861)
add(1, 'segment', Line((-11.5717, -9.114, 0), (-12.2994, -8.38639, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-11.0572, -9.114, 0), (-11.7849, -8.38639, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-10.5427, -9.114, 0), (-11.2704, -8.38639, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-10.0282, -9.114, 0), (-10.7559, -8.38639, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-9.51375, -9.114, 0), (-10.2414, -8.38639, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'label', Point(-9.3, -7.15, 0), text='B')
add(1, 'segment', Line((-12.1475, -8.722, 0), (-9.4525, -8.722, 0)), color=Color.from_hex("#111111"), width=0.040824)
add(1, 'polyline', Polyline([(-23.05, -8.25, 0), (-23.05, 1.37608, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3186)
add(1, 'arrow', Line((-23.05, 0.826079, 0), (-23.05, -0.723921, 0)), color=Color.from_hex("#3f9c20"), width=0.147744, head=(0.509328, 0.196733))
add(1, 'label', Point(-21.3, 0.276079, 0), color=Color.from_hex("#3f9c20"), text='F1 = 60')
add(1, 'polyline', Polyline([(-19.375, -8.25, 0), (-19.375, 1.37608, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3186)
add(1, 'arrow', Line((-19.375, 0.826079, 0), (-19.375, -0.723921, 0)), color=Color.from_hex("#3f9c20"), width=0.147744, head=(0.509328, 0.196733))
add(1, 'label', Point(-17.625, 0.276079, 0), color=Color.from_hex("#3f9c20"), text='F2 = 30')
add(1, 'polyline', Polyline([(-7.125, -8.25, 0), (-7.125, 1.37608, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3186)
add(1, 'arrow', Line((-7.125, 0.826079, 0), (-7.125, -0.723921, 0)), color=Color.from_hex("#3f9c20"), width=0.147744, head=(0.509328, 0.196733))
add(1, 'label', Point(-5.375, 0.276079, 0), color=Color.from_hex("#3f9c20"), text='F3 = 30')

# step 2 — a) The reactions come first
add(2, 'arrow', Line((-25.5, -11.55, 0), (-25.5, -9.2, 0)), color=Color.from_hex("#3f9c20"), width=0.147744, head=(0.509328, 0.196733))
add(2, 'label', Point(-29.8, -10.4925, 0), color=Color.from_hex("#3f9c20"), text='A = 60.00 ↑')
add(2, 'arrow', Line((-10.8, -11.55, 0), (-10.8, -9.2, 0)), color=Color.from_hex("#3f9c20"), width=0.147744, head=(0.509328, 0.196733))
add(2, 'label', Point(-6.5, -10.4925, 0), color=Color.from_hex("#3f9c20"), text='B = 60.00 ↑')

# step 3 — a) Choose the thrust, get the form
add(3, 'segment', Line((-25.5, -7.35, 0), (-23.05, -2.87072, 0)), color=Color.from_hex("#1a1eb2"), width=0.122861)
add(3, 'label', Point(-25.5819, -4.6865, 0), color=Color.from_hex("#1a1eb2"), text='1 · 76.9 C')
add(3, 'segment', Line((-23.05, -2.87072, 0), (-19.375, -2.12417, 0)), color=Color.from_hex("#1a1eb2"), width=0.122861)
add(3, 'label', Point(-20.9437, -3.82043, 0), color=Color.from_hex("#1a1eb2"), text='2 · 37.7 C')
add(3, 'segment', Line((-19.375, -2.12417, 0), (-10.8, -7.35, 0)), color=Color.from_hex("#1a1eb2"), width=0.122861)
add(3, 'label', Point(-11.8125, -5.15204, 0), color=Color.from_hex("#1a1eb2"), text='3 · 43.2 C')
add(3, 'segment', Line((-25.5, -7.35, 0), (-7.125, -1.37892, 0)), color=Color.from_hex("#ce4095"), width=0.122861)
add(3, 'label', Point(-20.3053, -7.08143, 0), color=Color.from_hex("#ce4095"), text='4 · 24.3 T')
add(3, 'segment', Line((-25.5, -7.35, 0), (-10.8, -7.35, 0)), color=Color.from_hex("#ce4095"), width=0.122861)
add(3, 'label', Point(-18.15, -8.7, 0), color=Color.from_hex("#ce4095"), text='5 · 13.8 T')
add(3, 'segment', Line((-10.8, -7.35, 0), (-7.125, -1.37892, 0)), color=Color.from_hex("#1a1eb2"), width=0.122861)
add(3, 'label', Point(-7.3718, -4.35553, 0), color=Color.from_hex("#1a1eb2"), text='6 · 44.0 C')
add(3, 'point', Point(-25.5, -7.35, 0), color=Color.from_hex("#ffffff"), width=0.31968)
add(3, 'point', Point(-10.8, -7.35, 0), color=Color.from_hex("#ffffff"), width=0.31968)
add(3, 'point', Point(-23.05, -2.87072, 0), color=Color.from_hex("#ffffff"), width=0.31968)
add(3, 'label', Point(-24.55, -1.97072, 0), text='I')
add(3, 'point', Point(-19.375, -2.12417, 0), color=Color.from_hex("#ffffff"), width=0.31968)
add(3, 'label', Point(-18.675, -0.624174, 0), text='II')
add(3, 'point', Point(-7.125, -1.37892, 0), color=Color.from_hex("#ffffff"), width=0.31968)
add(3, 'label', Point(-5.625, -0.478921, 0), text='T')

# step 4 — a) The force diagram
add(4, 'arrow', Line((13.5, 10.5, 0), (13.5, -2.83333, 0)), color=Color.from_hex("#3f9c20"), width=0.106531, head=(0.344477, 0.147744))
add(4, 'label', Point(11.95, 3.83333, 0), color=Color.from_hex("#3f9c20"), text='F1')
add(4, 'arrow', Line((13.5, -2.83333, 0), (13.5, -9.5, 0)), color=Color.from_hex("#3f9c20"), width=0.106531, head=(0.344477, 0.147744))
add(4, 'label', Point(11.95, -6.16667, 0), color=Color.from_hex("#3f9c20"), text='F2')
add(4, 'arrow', Line((13.5, -9.5, 0), (13.5, -16.1667, 0)), color=Color.from_hex("#3f9c20"), width=0.106531, head=(0.344477, 0.147744))
add(4, 'label', Point(11.95, -12.8333, 0), color=Color.from_hex("#3f9c20"), text='F3')
add(4, 'arrow', Line((14.1319, -2.83333, 0), (14.1319, 10.5, 0)), color=Color.from_hex("#3f9c20"), width=0.106531, head=(0.344477, 0.147744))
add(4, 'label', Point(15.1878, 3.83333, 0), color=Color.from_hex("#3f9c20"), text='A 60.00')
add(4, 'arrow', Line((14.1319, -16.1667, 0), (14.1319, -2.83333, 0)), color=Color.from_hex("#3f9c20"), width=0.106531, head=(0.344477, 0.147744))
add(4, 'label', Point(15.1878, -9.5, 0), color=Color.from_hex("#3f9c20"), text='B 60.00')
add(4, 'point', Point(5.29556, -4.5, 0), color=Color.from_hex("#ffffff"), width=0.2997)
add(4, 'label', Point(4.04556, -5.45, 0), color=Color.from_hex("#aaaaaa"), text='o₁')
add(4, 'point', Point(18.6289, -7.83333, 0), color=Color.from_hex("#ffffff"), width=0.2997)
add(4, 'label', Point(19.8789, -8.78333, 0), color=Color.from_hex("#aaaaaa"), text='o₂')
add(4, 'segment', Line((5.29556, -4.5, 0), (13.5, 10.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.057542)
add(4, 'label', Point(8.74142, 2.7, 0), color=Color.from_hex("#aaaaaa"), text='1')
add(4, 'segment', Line((5.29556, -4.5, 0), (13.5, -2.83333, 0)), color=Color.from_hex("#1a1eb2"), width=0.057542)
add(4, 'label', Point(10.3823, -2.56667, 0), color=Color.from_hex("#aaaaaa"), text='2')
add(4, 'segment', Line((5.29556, -4.5, 0), (13.5, -9.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.057542)
add(4, 'label', Point(8.24916, -5.4, 0), color=Color.from_hex("#aaaaaa"), text='3')
add(4, 'segment', Line((5.29556, -4.5, 0), (10.4244, -2.83333, 0)), color=Color.from_hex("#ce4095"), width=0.057542)
add(4, 'label', Point(8.11644, -2.68333, 0), color=Color.from_hex("#aaaaaa"), text='4')
add(4, 'segment', Line((10.4244, -2.83333, 0), (13.5, -2.83333, 0)), color=Color.from_hex("#ce4095"), width=0.057542)
add(4, 'label', Point(11.2856, -1.93333, 0), color=Color.from_hex("#aaaaaa"), text='5')
add(4, 'segment', Line((13.5, -16.1667, 0), (18.6289, -7.83333, 0)), color=Color.from_hex("#1a1eb2"), width=0.057542)
add(4, 'label', Point(16.3209, -10.6833, 0), color=Color.from_hex("#aaaaaa"), text='6')

# step 11 — 14.2 The force diagram is the two, stacked
add(11, 'segment', Line((13.5, -9.5, 0), (18.6289, -7.83333, 0)), color=Color.from_hex("#ce4095"), width=0.057542)
add(11, 'segment', Line((10.4244, -2.83333, 0), (18.6289, -7.83333, 0)), color=Color.from_hex("#1a1eb2"), width=0.057542)
add(11, 'segment', Line((5.29556, -4.5, 0), (13.5, -4.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.103576)
add(11, 'segment', Line((18.6289, -7.83333, 0), (13.5, -7.83333, 0)), color=Color.from_hex("#aaaaaa"), width=0.103576)
add(11, 'label', Point(12.9, -17.2, 0), color=Color.from_hex("#aaaaaa"), text='grey: a)’s tie ray 36.92 → · b)’s strut ray 23.08 ←')

# step 12 — 14.2 The one member that changes
add(12, 'arrow', Line((8.3, -18.5, 0), (16.5044, -18.5, 0)), color=Color.from_hex("#ce4095"), width=0.106531, head=(0.344477, 0.147744))
add(12, 'arrow', Line((16.5044, -18.5, 0), (11.3756, -18.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.106531, head=(0.344477, 0.147744))
add(12, 'arrow', Line((8.3, -20, 0), (11.3756, -20, 0)), color=Color.from_hex("#ce4095"), width=0.147744, head=(0.509328, 0.196733))
add(12, 'label', Point(16.9, -19.25, 0), color=Color.from_hex("#ce4095"), text='5 = H_a − H_b = 36.92 − 23.08 = 13.84 kN T')


if __name__ == "__main__":
    print("EX X · 14.1 + 14.2 — two structures, added —", len(ops), "operations")
