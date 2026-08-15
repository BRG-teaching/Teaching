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
add(0, 'label', Point(-14.3, -10.15, 0), text='14.2  a) + b) combined   ·   Form diagram 1:100')
add(0, 'label', Point(13.5, 13.1, 0), text='Force diagram   1 cm ≙ 10 kN')

# step 1 — a) What is given
add(1, 'segment', Line((-25.5, -5.6, 0), (-26.676, -6.776, 0)), color=Color.from_hex("#111111"), width=0.122861)
add(1, 'segment', Line((-26.676, -6.776, 0), (-24.324, -6.776, 0)), color=Color.from_hex("#111111"), width=0.122861)
add(1, 'segment', Line((-24.324, -6.776, 0), (-25.5, -5.6, 0)), color=Color.from_hex("#111111"), width=0.122861)
add(1, 'segment', Line((-26.382, -6.776, 0), (-27.2136, -5.94444, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-25.794, -6.776, 0), (-26.6256, -5.94444, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-25.206, -6.776, 0), (-26.0376, -5.94444, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-24.618, -6.776, 0), (-25.4496, -5.94444, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-24.03, -6.776, 0), (-24.8616, -5.94444, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'label', Point(-27, -5.4, 0), text='A')
add(1, 'segment', Line((-8.7, -5.6, 0), (-9.876, -6.776, 0)), color=Color.from_hex("#111111"), width=0.122861)
add(1, 'segment', Line((-9.876, -6.776, 0), (-7.524, -6.776, 0)), color=Color.from_hex("#111111"), width=0.122861)
add(1, 'segment', Line((-7.524, -6.776, 0), (-8.7, -5.6, 0)), color=Color.from_hex("#111111"), width=0.122861)
add(1, 'segment', Line((-9.582, -7.616, 0), (-10.4136, -6.78444, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-8.994, -7.616, 0), (-9.82556, -6.78444, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-8.406, -7.616, 0), (-9.23756, -6.78444, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-7.818, -7.616, 0), (-8.64956, -6.78444, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-7.23, -7.616, 0), (-8.06156, -6.78444, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'label', Point(-7.2, -5.4, 0), text='B')
add(1, 'segment', Line((-10.24, -7.168, 0), (-7.16, -7.168, 0)), color=Color.from_hex("#111111"), width=0.040824)
add(1, 'polyline', Polyline([(-22.7, -6.5, 0), (-22.7, 4.29409, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3186)
add(1, 'arrow', Line((-22.7, 3.74409, 0), (-22.7, 2.19409, 0)), color=Color.from_hex("#3f9c20"), width=0.147744, head=(0.509328, 0.196733))
add(1, 'label', Point(-20.95, 3.19409, 0), color=Color.from_hex("#3f9c20"), text='F1 = 60')
add(1, 'polyline', Polyline([(-18.5, -6.5, 0), (-18.5, 4.29409, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3186)
add(1, 'arrow', Line((-18.5, 3.74409, 0), (-18.5, 2.19409, 0)), color=Color.from_hex("#3f9c20"), width=0.147744, head=(0.509328, 0.196733))
add(1, 'label', Point(-16.75, 3.19409, 0), color=Color.from_hex("#3f9c20"), text='F2 = 30')
add(1, 'polyline', Polyline([(-4.5, -6.5, 0), (-4.5, 4.29409, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3186)
add(1, 'arrow', Line((-4.5, 3.74409, 0), (-4.5, 2.19409, 0)), color=Color.from_hex("#3f9c20"), width=0.147744, head=(0.509328, 0.196733))
add(1, 'label', Point(-2.75, 3.19409, 0), color=Color.from_hex("#3f9c20"), text='F3 = 30')

# step 2 — a) The reactions come first
add(2, 'arrow', Line((-25.5, -9.8, 0), (-25.5, -7.45, 0)), color=Color.from_hex("#3f9c20"), width=0.147744, head=(0.509328, 0.196733))
add(2, 'label', Point(-29.8, -8.7425, 0), color=Color.from_hex("#3f9c20"), text='A = 60.00 ↑')
add(2, 'arrow', Line((-8.7, -9.8, 0), (-8.7, -7.45, 0)), color=Color.from_hex("#3f9c20"), width=0.147744, head=(0.509328, 0.196733))
add(2, 'label', Point(-4.4, -8.7425, 0), color=Color.from_hex("#3f9c20"), text='B = 60.00 ↑')

# step 3 — a) Choose the thrust, get the form
add(3, 'segment', Line((-25.5, -5.6, 0), (-22.7, -0.480823, 0)), color=Color.from_hex("#1a1eb2"), width=0.122861)
add(3, 'label', Point(-25.4244, -2.64854, 0), color=Color.from_hex("#1a1eb2"), text='1 · 76.9 C')
add(3, 'segment', Line((-22.7, -0.480823, 0), (-18.5, 0.372373, 0)), color=Color.from_hex("#1a1eb2"), width=0.122861)
add(3, 'label', Point(-20.3312, -1.3772, 0), color=Color.from_hex("#1a1eb2"), text='2 · 37.7 C')
add(3, 'segment', Line((-18.5, 0.372373, 0), (-8.7, -5.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.122861)
add(3, 'label', Point(-9.95746, -3.25273, 0), color=Color.from_hex("#1a1eb2"), text='3 · 43.2 C')
add(3, 'segment', Line((-25.5, -5.6, 0), (-4.5, 1.22409, 0)), color=Color.from_hex("#ce4095"), width=0.122861)
add(3, 'label', Point(-19.6228, -5.10965, 0), color=Color.from_hex("#ce4095"), text='4 · 24.3 T')
add(3, 'segment', Line((-25.5, -5.6, 0), (-8.7, -5.6, 0)), color=Color.from_hex("#ce4095"), width=0.122861)
add(3, 'label', Point(-17.1, -6.95, 0), color=Color.from_hex("#ce4095"), text='5 · 13.8 T')
add(3, 'segment', Line((-8.7, -5.6, 0), (-4.5, 1.22409, 0)), color=Color.from_hex("#1a1eb2"), width=0.122861)
add(3, 'label', Point(-4.9463, -2.07666, 0), color=Color.from_hex("#1a1eb2"), text='6 · 44.0 C')
add(3, 'point', Point(-25.5, -5.6, 0), color=Color.from_hex("#ffffff"), width=0.31968)
add(3, 'point', Point(-8.7, -5.6, 0), color=Color.from_hex("#ffffff"), width=0.31968)
add(3, 'point', Point(-22.7, -0.480823, 0), color=Color.from_hex("#ffffff"), width=0.31968)
add(3, 'label', Point(-24.2, 0.419177, 0), text='I')
add(3, 'point', Point(-18.5, 0.372373, 0), color=Color.from_hex("#ffffff"), width=0.31968)
add(3, 'label', Point(-17.8, 1.87237, 0), text='II')
add(3, 'point', Point(-4.5, 1.22409, 0), color=Color.from_hex("#ffffff"), width=0.31968)
add(3, 'label', Point(-3, 2.12409, 0), text='T')

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
