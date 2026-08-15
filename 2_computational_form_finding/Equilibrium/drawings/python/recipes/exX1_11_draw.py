"""EX X.11 — one arch, four supports

Auto-generated from ops/exX1_11.json — the drawing as literal COMPAS
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
add(0, 'label', Point(6.5, 6.4, 0), text='form diagram 1:100')

# step 1 — The load, and the thrust it needs
add(1, 'segment', Line((4.6, 0, 0), (4.85454, 0.213223, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((4.85454, 0.213223, 0), (5.10909, 0.416529, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((5.10909, 0.416529, 0), (5.36364, 0.609917, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((5.36364, 0.609917, 0), (5.61818, 0.793388, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((5.61818, 0.793388, 0), (5.87273, 0.966942, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((5.87273, 0.966942, 0), (6.12727, 1.13058, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((6.12727, 1.13058, 0), (6.38182, 1.2843, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((6.38182, 1.2843, 0), (6.63636, 1.4281, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((6.63636, 1.4281, 0), (6.89091, 1.56198, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((6.89091, 1.56198, 0), (7.14546, 1.68595, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((7.14546, 1.68595, 0), (7.4, 1.8, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((7.4, 1.8, 0), (7.65454, 1.90413, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((7.65454, 1.90413, 0), (7.90909, 1.99835, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((7.90909, 1.99835, 0), (8.16364, 2.08264, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((8.16364, 2.08264, 0), (8.41818, 2.15702, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((8.41818, 2.15702, 0), (8.67273, 2.22149, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((8.67273, 2.22149, 0), (8.92727, 2.27603, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((8.92727, 2.27603, 0), (9.18182, 2.32066, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((9.18182, 2.32066, 0), (9.43636, 2.35537, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((9.43636, 2.35537, 0), (9.69091, 2.38016, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((9.69091, 2.38016, 0), (9.94546, 2.39504, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((9.94546, 2.39504, 0), (10.2, 2.4, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((10.2, 2.4, 0), (10.4545, 2.39504, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((10.4545, 2.39504, 0), (10.7091, 2.38016, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((10.7091, 2.38016, 0), (10.9636, 2.35537, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((10.9636, 2.35537, 0), (11.2182, 2.32066, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((11.2182, 2.32066, 0), (11.4727, 2.27603, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((11.4727, 2.27603, 0), (11.7273, 2.22149, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((11.7273, 2.22149, 0), (11.9818, 2.15702, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((11.9818, 2.15702, 0), (12.2364, 2.08264, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((12.2364, 2.08264, 0), (12.4909, 1.99835, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((12.4909, 1.99835, 0), (12.7455, 1.90413, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((12.7455, 1.90413, 0), (13, 1.8, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((13, 1.8, 0), (13.2545, 1.68595, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((13.2545, 1.68595, 0), (13.5091, 1.56198, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((13.5091, 1.56198, 0), (13.7636, 1.4281, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((13.7636, 1.4281, 0), (14.0182, 1.2843, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((14.0182, 1.2843, 0), (14.2727, 1.13058, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((14.2727, 1.13058, 0), (14.5273, 0.966942, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((14.5273, 0.966942, 0), (14.7818, 0.793388, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((14.7818, 0.793388, 0), (15.0364, 0.609917, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((15.0364, 0.609917, 0), (15.2909, 0.416529, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((15.2909, 0.416529, 0), (15.5455, 0.213223, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((15.5455, 0.213223, 0), (15.8, 0, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'label', Point(6.25, 2.15, 0), color=Color.from_hex("#1a1eb2"), text='2 · 26.89')
add(1, 'label', Point(14.15, 2.15, 0), color=Color.from_hex("#1a1eb2"), text='1 · 26.89')
add(1, 'segment', Line((4.6, 0, 0), (15.8, 0, 0)), color=Color.from_hex("#b9b9bd"), width=0.106934)
add(1, 'label', Point(10.2, -0.95, 0), color=Color.from_hex("#b9b9bd"), text='3 · 0.00 — zero-force member')
add(1, 'polyline', Polyline([(4.6, 0, 0), (15.8, 0, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2773)
add(1, 'segment', Line((4.6, 4.96, 0), (15.8, 4.96, 0)), color=Color.from_hex("#3f9c20"), width=0.05076)
add(1, 'label', Point(17.95, 4.96, 0), color=Color.from_hex("#3f9c20"), text='q₁ = 5.00 kN/m')
add(1, 'arrow', Line((10.2, 7.84, 0), (10.2, 5.6, 0)), color=Color.from_hex("#3f9c20"), width=0.092722, dash=0.2773, head=(0.299822, 0.128592))
add(1, 'label', Point(12.4, 6.72, 0), color=Color.from_hex("#3f9c20"), text='R = 35.00 kN')
add(1, 'point', Point(4.6, 0, 0), color=Color.from_hex("#ffffff"), width=0.3478)
add(1, 'label', Point(3.6, 0.55, 0), text='A')
add(1, 'point', Point(15.8, 0, 0), color=Color.from_hex("#ffffff"), width=0.3478)
add(1, 'label', Point(16.8, 0.55, 0), text='B')

# step 2 — What the support at A is allowed to do
add(2, 'segment', Line((4.6, 0, 0), (3.39929, -0.212592, 0)), color=Color.from_hex("#111111"), width=0.035532)
add(2, 'segment', Line((3.39929, -0.212592, 0), (4.20627, -1.15407, 0)), color=Color.from_hex("#111111"), width=0.035532)
add(2, 'segment', Line((4.20627, -1.15407, 0), (4.6, 0, 0)), color=Color.from_hex("#111111"), width=0.035532)
add(2, 'segment', Line((2.91922, -0.174954, 0), (4.17004, -1.63425, 0)), color=Color.from_hex("#111111"), width=0.035532)
add(2, 'segment', Line((3.96157, -1.39103, 0), (3.91402, -2.0092, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'segment', Line((3.7531, -1.14782, 0), (3.70555, -1.76599, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'segment', Line((3.54463, -0.9046, 0), (3.49708, -1.52277, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'segment', Line((3.33616, -0.661385, 0), (3.28861, -1.27956, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'segment', Line((3.12769, -0.41817, 0), (3.08014, -1.03634, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'segment', Line((2.91922, -0.174954, 0), (2.87167, -0.793128, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'segment', Line((15.8, 0, 0), (15.18, -1.05, 0)), color=Color.from_hex("#111111"), width=0.035532)
add(2, 'segment', Line((15.18, -1.05, 0), (16.42, -1.05, 0)), color=Color.from_hex("#111111"), width=0.035532)
add(2, 'segment', Line((16.42, -1.05, 0), (15.8, 0, 0)), color=Color.from_hex("#111111"), width=0.035532)
add(2, 'segment', Line((14.839, -1.05, 0), (16.761, -1.05, 0)), color=Color.from_hex("#111111"), width=0.035532)
add(2, 'segment', Line((16.4407, -1.05, 0), (16.8791, -1.48841, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'segment', Line((16.1203, -1.05, 0), (16.5587, -1.48841, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'segment', Line((15.8, -1.05, 0), (16.2384, -1.48841, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'segment', Line((15.4797, -1.05, 0), (15.9181, -1.48841, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'segment', Line((15.1593, -1.05, 0), (15.5977, -1.48841, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'segment', Line((14.839, -1.05, 0), (15.2774, -1.48841, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'polyline', Polyline([(-0.866648, -4.6857, 0), (7.02962, 2.08253, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2773)

# step 3 — The force diagram: pole and the two arch rays
add(3, 'label', Point(25.4, 6.3, 0), text='force diagram 1 cm ≙ 5 kN')
add(3, 'arrow', Line((28.5333, 4.6, 0), (28.5333, -6.6, 0)), color=Color.from_hex("#3f9c20"), width=0.092722, head=(0.299822, 0.128592))
add(3, 'label', Point(30.5833, -1, 0), color=Color.from_hex("#3f9c20"), text='R = 35.00')
add(3, 'segment', Line((22, -1, 0), (28.5333, -6.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.050083)
add(3, 'segment', Line((22, -1, 0), (28.5333, 4.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.050083)
add(3, 'label', Point(26.1167, -3.45, 0), color=Color.from_hex("#1a1eb2"), text='1')
add(3, 'label', Point(26.1167, 1.45, 0), color=Color.from_hex("#1a1eb2"), text='2')
add(3, 'point', Point(22, -1, 0), color=Color.from_hex("#ffffff"), width=0.27824)
add(3, 'label', Point(21.45, -0.5, 0), color=Color.from_hex("#aaaaaa"), text='o')

# step 4 — Closing it: A, B and the string
add(4, 'arrow', Line((0.879643, -3.18888, 0), (2.77778, -1.5619, 0)), color=Color.from_hex("#3f9c20"), width=0.128592, head=(0.443304, 0.17123))
add(4, 'label', Point(-0.779614, -4.13967, 0), color=Color.from_hex("#3f9c20"), text='A = 26.89 kN')
add(4, 'arrow', Line((19.5204, -3.18888, 0), (17.6222, -1.5619, 0)), color=Color.from_hex("#3f9c20"), width=0.128592, head=(0.443304, 0.17123))
add(4, 'label', Point(18.8796, -4.13967, 0), color=Color.from_hex("#3f9c20"), text='B = 26.89 kN')
add(4, 'segment', Line((22, -1, 0), (22, -1, 0)), color=Color.from_hex("#b9b9bd"), width=0.050083)
add(4, 'label', Point(22, -1.75, 0), color=Color.from_hex("#b9b9bd"), text='3 · 0.00')
add(4, 'arrow', Line((21.3392, -1, 0), (28.2535, 4.92652, 0)), color=Color.from_hex("#3f9c20"), width=0.092722, head=(0.299822, 0.128592))
add(4, 'arrow', Line((28.2535, -6.92652, 0), (21.3392, -1, 0)), color=Color.from_hex("#3f9c20"), width=0.092722, head=(0.299822, 0.128592))
add(4, 'label', Point(23.5167, 2.3, 0), color=Color.from_hex("#3f9c20"), text='A 26.89')
add(4, 'label', Point(23.5167, -4.3, 0), color=Color.from_hex("#3f9c20"), text='B 26.89')

# step 5 — The subsystem at B
add(5, 'label', Point(11.5, -12.4, 0), text='subsystem — node B')
add(5, 'point', Point(11.5, -16, 0), color=Color.from_hex("#ffffff"), width=0.27824)
add(5, 'arrow', Line((11.5, -16, 0), (13.3981, -17.627, 0)), color=Color.from_hex("#1a1eb2"), width=0.092722, head=(0.299822, 0.128592))
add(5, 'arrow', Line((11.5, -16, 0), (11.5, -16, 0)), color=Color.from_hex("#b9b9bd"), width=0.092722, head=(0.299822, 0.128592))
add(5, 'arrow', Line((11.5, -16, 0), (9.60186, -14.373, 0)), color=Color.from_hex("#3f9c20"), width=0.092722, head=(0.299822, 0.128592))
add(5, 'label', Point(14.0055, -18.1476, 0), color=Color.from_hex("#1a1eb2"), text='1')
add(5, 'label', Point(11.5, -16, 0), color=Color.from_hex("#b9b9bd"), text='3')
add(5, 'label', Point(8.99445, -13.8524, 0), color=Color.from_hex("#3f9c20"), text='B')

# step 6 — All four, side by side
add(6, 'label', Point(24, -9.6, 0), color=Color.from_hex("#111111"), text='▶ a) ⟂ tangent · A = B = 26.89 kN · string 0.00 kN')
add(6, 'label', Point(24, -11.1, 0), color=Color.from_hex("#aaaaaa"), text='b) 65° · A = B = 19.31 kN · string 12.26 kN tens.')
add(6, 'label', Point(24, -12.6, 0), color=Color.from_hex("#aaaaaa"), text='c) vertical · A = B = 17.50 kN · string 20.42 kN tens.')
add(6, 'label', Point(24, -14.1, 0), color=Color.from_hex("#aaaaaa"), text='d) hanging · A = B = 17.50 kN · string 20.42 kN comp.')


if __name__ == "__main__":
    print("EX X.11 — one arch, four supports —", len(ops), "operations")
