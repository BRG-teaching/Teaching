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
add(1, 'segment', Line((4.6, -1.6, 0), (4.85454, -1.38678, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((4.85454, -1.38678, 0), (5.10909, -1.18347, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((5.10909, -1.18347, 0), (5.36364, -0.990083, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((5.36364, -0.990083, 0), (5.61818, -0.806612, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((5.61818, -0.806612, 0), (5.87273, -0.633058, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((5.87273, -0.633058, 0), (6.12727, -0.469421, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((6.12727, -0.469421, 0), (6.38182, -0.315702, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((6.38182, -0.315702, 0), (6.63636, -0.171901, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((6.63636, -0.171901, 0), (6.89091, -0.038017, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((6.89091, -0.038017, 0), (7.14546, 0.08595, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((7.14546, 0.08595, 0), (7.4, 0.2, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((7.4, 0.2, 0), (7.65454, 0.304132, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((7.65454, 0.304132, 0), (7.90909, 0.398347, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((7.90909, 0.398347, 0), (8.16364, 0.482645, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((8.16364, 0.482645, 0), (8.41818, 0.557025, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((8.41818, 0.557025, 0), (8.67273, 0.621488, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((8.67273, 0.621488, 0), (8.92727, 0.676033, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((8.92727, 0.676033, 0), (9.18182, 0.720661, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((9.18182, 0.720661, 0), (9.43636, 0.755372, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((9.43636, 0.755372, 0), (9.69091, 0.780165, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((9.69091, 0.780165, 0), (9.94546, 0.795041, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((9.94546, 0.795041, 0), (10.2, 0.8, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((10.2, 0.8, 0), (10.4545, 0.795041, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((10.4545, 0.795041, 0), (10.7091, 0.780165, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((10.7091, 0.780165, 0), (10.9636, 0.755372, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((10.9636, 0.755372, 0), (11.2182, 0.720661, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((11.2182, 0.720661, 0), (11.4727, 0.676033, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((11.4727, 0.676033, 0), (11.7273, 0.621488, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((11.7273, 0.621488, 0), (11.9818, 0.557025, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((11.9818, 0.557025, 0), (12.2364, 0.482645, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((12.2364, 0.482645, 0), (12.4909, 0.398347, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((12.4909, 0.398347, 0), (12.7455, 0.304132, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((12.7455, 0.304132, 0), (13, 0.2, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((13, 0.2, 0), (13.2545, 0.08595, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((13.2545, 0.08595, 0), (13.5091, -0.038017, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((13.5091, -0.038017, 0), (13.7636, -0.171901, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((13.7636, -0.171901, 0), (14.0182, -0.315702, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((14.0182, -0.315702, 0), (14.2727, -0.469421, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((14.2727, -0.469421, 0), (14.5273, -0.633058, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((14.5273, -0.633058, 0), (14.7818, -0.806612, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((14.7818, -0.806612, 0), (15.0364, -0.990083, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((15.0364, -0.990083, 0), (15.2909, -1.18347, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((15.2909, -1.18347, 0), (15.5455, -1.38678, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'segment', Line((15.5455, -1.38678, 0), (15.8, -1.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.078509)
add(1, 'label', Point(6.25, 0.55, 0), color=Color.from_hex("#1a1eb2"), text='2 · 26.89')
add(1, 'label', Point(14.15, 0.55, 0), color=Color.from_hex("#1a1eb2"), text='1 · 26.89')
add(1, 'segment', Line((4.6, -1.6, 0), (15.8, -1.6, 0)), color=Color.from_hex("#b9b9bd"), width=0.106934)
add(1, 'label', Point(10.2, -2.55, 0), color=Color.from_hex("#b9b9bd"), text='3 · 0.00 — zero-force member')
add(1, 'polyline', Polyline([(4.6, -1.6, 0), (15.8, -1.6, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2773)
add(1, 'segment', Line((4.6, 3.36, 0), (15.8, 3.36, 0)), color=Color.from_hex("#3f9c20"), width=0.05076)
add(1, 'label', Point(17.95, 3.36, 0), color=Color.from_hex("#3f9c20"), text='q₁ = 5.00 kN/m')
add(1, 'arrow', Line((10.2, 6.24, 0), (10.2, 4, 0)), color=Color.from_hex("#3f9c20"), width=0.092722, dash=0.2773, head=(0.299822, 0.128592))
add(1, 'label', Point(12.4, 5.12, 0), color=Color.from_hex("#3f9c20"), text='R = 35.00 kN')
add(1, 'point', Point(4.6, -1.6, 0), color=Color.from_hex("#ffffff"), width=0.3478)
add(1, 'label', Point(3.6, -1.05, 0), text='A')
add(1, 'point', Point(15.8, -1.6, 0), color=Color.from_hex("#ffffff"), width=0.3478)
add(1, 'label', Point(16.8, -1.05, 0), text='B')

# step 2 — What the support at A is allowed to do
add(2, 'segment', Line((4.6, -1.6, 0), (3.39929, -1.81259, 0)), color=Color.from_hex("#111111"), width=0.035532)
add(2, 'segment', Line((3.39929, -1.81259, 0), (4.20627, -2.75407, 0)), color=Color.from_hex("#111111"), width=0.035532)
add(2, 'segment', Line((4.20627, -2.75407, 0), (4.6, -1.6, 0)), color=Color.from_hex("#111111"), width=0.035532)
add(2, 'segment', Line((2.91922, -1.77495, 0), (4.17004, -3.23425, 0)), color=Color.from_hex("#111111"), width=0.035532)
add(2, 'segment', Line((3.96157, -2.99103, 0), (3.91402, -3.6092, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'segment', Line((3.7531, -2.74782, 0), (3.70555, -3.36599, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'segment', Line((3.54463, -2.5046, 0), (3.49708, -3.12277, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'segment', Line((3.33616, -2.26139, 0), (3.28861, -2.87956, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'segment', Line((3.12769, -2.01817, 0), (3.08014, -2.63634, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'segment', Line((2.91922, -1.77495, 0), (2.87167, -2.39313, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'segment', Line((15.8, -1.6, 0), (15.18, -2.65, 0)), color=Color.from_hex("#111111"), width=0.035532)
add(2, 'segment', Line((15.18, -2.65, 0), (16.42, -2.65, 0)), color=Color.from_hex("#111111"), width=0.035532)
add(2, 'segment', Line((16.42, -2.65, 0), (15.8, -1.6, 0)), color=Color.from_hex("#111111"), width=0.035532)
add(2, 'segment', Line((14.839, -2.65, 0), (16.761, -2.65, 0)), color=Color.from_hex("#111111"), width=0.035532)
add(2, 'segment', Line((16.4407, -2.65, 0), (16.8791, -3.08841, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'segment', Line((16.1203, -2.65, 0), (16.5587, -3.08841, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'segment', Line((15.8, -2.65, 0), (16.2384, -3.08841, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'segment', Line((15.4797, -2.65, 0), (15.9181, -3.08841, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'segment', Line((15.1593, -2.65, 0), (15.5977, -3.08841, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'segment', Line((14.839, -2.65, 0), (15.2774, -3.08841, 0)), color=Color.from_hex("#aaaaaa"), width=0.035532)
add(2, 'polyline', Polyline([(-0.866648, -6.2857, 0), (7.02962, 0.482532, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2773)

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
add(4, 'arrow', Line((0.879643, -4.78888, 0), (2.77778, -3.1619, 0)), color=Color.from_hex("#3f9c20"), width=0.128592, head=(0.443304, 0.17123))
add(4, 'label', Point(-0.779614, -5.73967, 0), color=Color.from_hex("#3f9c20"), text='A = 26.89 kN')
add(4, 'arrow', Line((19.5204, -4.78888, 0), (17.6222, -3.1619, 0)), color=Color.from_hex("#3f9c20"), width=0.128592, head=(0.443304, 0.17123))
add(4, 'label', Point(18.8796, -5.73967, 0), color=Color.from_hex("#3f9c20"), text='B = 26.89 kN')
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
