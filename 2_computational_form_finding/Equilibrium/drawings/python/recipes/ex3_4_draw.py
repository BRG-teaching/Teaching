"""EX 3 Creative — an asymmetric hanging roof

Auto-generated from ops/ex3_4.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-19, -6.6, 0), text='Lageplan 1:500 — form diagram')
add(0, 'label', Point(1, 13.2, 0), text='Kräfteplan — force diagram')
add(0, 'label', Point(9, 11.9, 0), text='to scale · 1 unit ≙ 250 kN  (sheet: 1 cm ≙ 500 kN)')

# step 1 — What carries over
add(1, 'segment', Line((-22.4, -5, 0), (1.4, -5, 0)), color=Color.from_hex("#111111"), width=0.095558)
add(1, 'segment', Line((-22, -5, 0), (-22.5, -5.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-20.2308, -5, 0), (-20.7308, -5.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-18.4615, -5, 0), (-18.9615, -5.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-16.6923, -5, 0), (-17.1923, -5.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-14.9231, -5, 0), (-15.4231, -5.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-13.1538, -5, 0), (-13.6538, -5.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-11.3846, -5, 0), (-11.8846, -5.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-9.61538, -5, 0), (-10.1154, -5.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-7.84615, -5, 0), (-8.34615, -5.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-6.07692, -5, 0), (-6.57692, -5.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-4.30769, -5, 0), (-4.80769, -5.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-2.53846, -5, 0), (-3.03846, -5.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-0.769231, -5, 0), (-1.26923, -5.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((1, -5, 0), (0.5, -5.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'polygon', Polygon([(-20.9, -5, 0), (-19, -5, 0), (-19, -1.46923, 0), (-20.9, -1.46923, 0)]), color=Color.from_hex("#aaaaaa"))
add(1, 'polygon', Polygon([(-2, -5, 0), (-0.1, -5, 0), (-0.1, -1.46923, 0), (-2, -1.46923, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'point', Point(-19, -1.46923, 0), color=Color.from_hex("#ffffff"), width=0.3108)
add(1, 'label', Point(-19.6, -0.369231, 0), text='A')
add(1, 'segment', Line((-19, 4.77538, 0), (-2, 4.77538, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-19, 4.77538, 0), (-19, 3.87539, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-17.6923, 4.77538, 0), (-17.6923, 3.87539, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-16.3846, 4.77538, 0), (-16.3846, 3.87539, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-15.0769, 4.77538, 0), (-15.0769, 3.87539, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-13.7692, 4.77538, 0), (-13.7692, 3.87539, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-12.4615, 4.77538, 0), (-12.4615, 3.87539, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-11.1538, 4.77538, 0), (-11.1538, 3.87539, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-9.84615, 4.77538, 0), (-9.84615, 3.87539, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-8.53846, 4.77538, 0), (-8.53846, 3.87539, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-7.23077, 4.77538, 0), (-7.23077, 3.87539, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-5.92308, 4.77538, 0), (-5.92308, 3.87539, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-4.61538, 4.77538, 0), (-4.61538, 3.87539, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-3.30769, 4.77538, 0), (-3.30769, 3.87539, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-2, 4.77538, 0), (-2, 3.87539, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'label', Point(-14.6, 5.47539, 0), color=Color.from_hex("#3f9c20"), text='s_d = 37.5 kN/m')

# step 2 — The resultant
add(2, 'polyline', Polyline([(-10.5, 5.57538, 0), (-10.5, -5.5, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2478)
add(2, 'arrow', Line((-10.5, 3.57538, 0), (-10.5, 1.37539, 0)), color=Color.from_hex("#3f9c20"), width=0.132149, dash=0.39648, head=(0.396144, 0.153014))
add(2, 'arrow', Line((4.41418, 3.56152, 0), (4.41418, -6.18848, 0)), color=Color.from_hex("#3f9c20"), width=0.132149, dash=0.39648, head=(0.396144, 0.153014))
add(2, 'label', Point(-9.3, 2.47539, 0), color=Color.from_hex("#3f9c20"), text='R')
add(2, 'label', Point(2, -0.666016, 0), color=Color.from_hex("#3f9c20"), text='R')

# step 3 — a) Raise the right wall
add(3, 'polygon', Polygon([(-2, -5, 0), (-0.1, -5, 0), (-0.1, 2.37539, 0), (-2, 2.37539, 0)]), color=Color.from_hex("#aaaaaa"))
add(3, 'point', Point(-2, 2.37539, 0), color=Color.from_hex("#ffffff"), width=0.3108)
add(3, 'label', Point(-1.4, 3.47539, 0), text='B')
add(3, 'polyline', Polyline([(-21, -1.46923, 0), (0, 2.37539, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2478)
add(3, 'label', Point(-10.5, 1.65308, 0), color=Color.from_hex("#aaaaaa"), text='CS / SL')
add(3, 'segment', Line((0.6, -1.46923, 0), (0.6, 2.37539, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(3, 'label', Point(2.9, 1.47538, 0), color=Color.from_hex("#aaaaaa"), text='raised +14.70 m')

# step 4 — a) Choose the sag
add(4, 'polygon', Polygon([(-18.9361, -1.09671, 0), (-18.2884, -1.20986, 0), (-17.6463, -1.30118, 0), (-17.0043, -1.3717, 0), (-16.3623, -1.42143, 0), (-15.7202, -1.45035, 0), (-15.0782, -1.45847, 0), (-14.4362, -1.4458, 0), (-13.7942, -1.41233, 0), (-13.1521, -1.35805, 0), (-12.5101, -1.28298, 0), (-11.8681, -1.18711, 0), (-11.226, -1.07044, 0), (-10.584, -0.932968, 0), (-9.94199, -0.774699, 0), (-9.29996, -0.59563, 0), (-8.65793, -0.395762, 0), (-8.0159, -0.175094, 0), (-7.37387, 0.066372, 0), (-6.73184, 0.328638, 0), (-6.08981, 0.611703, 0), (-5.44778, 0.915567, 0), (-4.80576, 1.24023, 0), (-4.16373, 1.58569, 0), (-3.5217, 1.95196, 0), (-2.87967, 2.33902, 0), (-2.2334, 2.74956, 0), (-1.7666, 2.00121, 0), (-2.42802, 1.59603, 0), (-3.09369, 1.20897, 0), (-3.75935, 0.842707, 0), (-4.42501, 0.497244, 0), (-5.09068, 0.17258, 0), (-5.75634, -0.131284, 0), (-6.422, -0.414349, 0), (-7.08767, -0.676615, 0), (-7.75333, -0.918082, 0), (-8.41899, -1.13875, 0), (-9.08466, -1.33862, 0), (-9.75032, -1.51769, 0), (-10.416, -1.67596, 0), (-11.0816, -1.81343, 0), (-11.7473, -1.9301, 0), (-12.413, -2.02597, 0), (-13.0786, -2.10104, 0), (-13.7443, -2.15531, 0), (-14.41, -2.18879, 0), (-15.0756, -2.20146, 0), (-15.7413, -2.19334, 0), (-16.407, -2.16441, 0), (-17.0726, -2.11469, 0), (-17.7383, -2.04417, 0), (-18.4039, -1.95284, 0), (-19.0639, -1.84175, 0)]), color=Color.from_hex("#f0bcdb"))
add(4, 'segment', Line((-19, -1.46923, 0), (-18.3462, -1.58135, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-18.3462, -1.58135, 0), (-17.6923, -1.67267, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-17.6923, -1.67267, 0), (-17.0385, -1.7432, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-17.0385, -1.7432, 0), (-16.3846, -1.79292, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-16.3846, -1.79292, 0), (-15.7308, -1.82184, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-15.7308, -1.82184, 0), (-15.0769, -1.82997, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-15.0769, -1.82997, 0), (-14.4231, -1.81729, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-14.4231, -1.81729, 0), (-13.7692, -1.78382, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-13.7692, -1.78382, 0), (-13.1154, -1.72955, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-13.1154, -1.72955, 0), (-12.4615, -1.65447, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-12.4615, -1.65447, 0), (-11.8077, -1.5586, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-11.8077, -1.5586, 0), (-11.1538, -1.44193, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-11.1538, -1.44193, 0), (-10.5, -1.30446, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-10.5, -1.30446, 0), (-9.84615, -1.14619, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-9.84615, -1.14619, 0), (-9.19231, -0.967123, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-9.19231, -0.967123, 0), (-8.53846, -0.767255, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-8.53846, -0.767255, 0), (-7.88462, -0.546588, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-7.88462, -0.546588, 0), (-7.23077, -0.305122, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-7.23077, -0.305122, 0), (-6.57692, -0.042856, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-6.57692, -0.042856, 0), (-5.92308, 0.240209, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-5.92308, 0.240209, 0), (-5.26923, 0.544074, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-5.26923, 0.544074, 0), (-4.61538, 0.868737, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-4.61538, 0.868737, 0), (-3.96154, 1.2142, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-3.96154, 1.2142, 0), (-3.30769, 1.58046, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-3.30769, 1.58046, 0), (-2.65385, 1.96752, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-2.65385, 1.96752, 0), (-2, 2.37539, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'polyline', Polyline([(-19, -1.46923, 0), (-10.5, -3.062, 0)]), color=Color.from_hex("#ce4095"), dash=0.2478)
add(4, 'segment', Line((15.7885, 2, 0), (4, 4.20898, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'label', Point(-15.192, -4.62456, 0), color=Color.from_hex("#ce4095"), text='1')
add(4, 'label', Point(12.0943, 4.00449, 0), color=Color.from_hex("#ce4095"), text='1')
add(4, 'polyline', Polyline([(-2, 2.37539, 0), (-10.5, -3.062, 0)]), color=Color.from_hex("#ce4095"), dash=0.2478)
add(4, 'segment', Line((15.7885, 2, 0), (4, -5.54102, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'label', Point(-4.95671, -2.36504, 0), color=Color.from_hex("#ce4095"), text='2')
add(4, 'label', Point(12.0943, -2.67051, 0), color=Color.from_hex("#ce4095"), text='2')
add(4, 'point', Point(15.7885, 2, 0), color=Color.from_hex("#ffffff"), width=0.24864)
add(4, 'label', Point(17.1885, 2.7, 0), text='o')
add(4, 'segment', Line((4, 5.90898, 0), (15.7885, 5.90898, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(4, 'label', Point(9.89425, 7.00898, 0), color=Color.from_hex("#aaaaaa"), text='H = 2947 kN')
add(4, 'point', Point(-15.1484, -1.83009, 0), color=Color.from_hex("#ffffff"), width=0.21756)
add(4, 'label', Point(-17.9484, -3.43009, 0), color=Color.from_hex("#aaaaaa"), text='lowest: 12.1 m')

# step 5 — a) The two reactions
add(5, 'point', Point(4, 2, 0), color=Color.from_hex("#ffffff"), width=0.21756)
add(5, 'label', Point(2.7, 2, 0), text='i')
add(5, 'arrow', Line((-19, -1.46923, 0), (-22.3418, -0.843022, 0)), color=Color.from_hex("#3f9c20"), width=0.082858, head=(0.267926, 0.114912))
add(5, 'arrow', Line((16.2027, 1.35254, 0), (4.41418, 3.56152, 0)), color=Color.from_hex("#3f9c20"), width=0.082858, head=(0.267926, 0.114912))
add(5, 'label', Point(-20.9418, 0.256978, 0), color=Color.from_hex("#3f9c20"), text='A = 2998')
add(5, 'arrow', Line((-2, 2.37539, 0), (0.864123, 4.20754, 0)), color=Color.from_hex("#3f9c20"), width=0.082858, head=(0.267926, 0.114912))
add(5, 'arrow', Line((4.41418, -6.18848, 0), (16.2027, 1.35254, 0)), color=Color.from_hex("#3f9c20"), width=0.082858, head=(0.267926, 0.114912))
add(5, 'label', Point(2.66412, 5.10754, 0), color=Color.from_hex("#3f9c20"), text='B = 3499')

# step 6 — a) The governing force
add(6, 'label', Point(-4.30769, -0.577939, 0), color=Color.from_hex("#ce4095"), text='N_max = 3499 kN')

# step 7 — b) The cable diameter
add(7, 'circle', Circle(0.1, frame=Frame((-4, -7.4, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#ce4095"))
add(7, 'label', Point(-0.4, -7.4, 0), color=Color.from_hex("#ce4095"), text='Ø 142 mm')

# step 8 — c) Bracing the roof
add(8, 'polygon', Polygon([(2.5, -8.6, 0), (17.5, -8.6, 0), (17.5, -12, 0), (2.5, -12, 0)]), color=Color.from_hex("#f1f1f4"))
add(8, 'segment', Line((2.5, -8.94, 0), (17.5, -8.94, 0)), color=Color.from_hex("#ce4095"), width=0.04536)
add(8, 'segment', Line((2.5, -9.62, 0), (17.5, -9.62, 0)), color=Color.from_hex("#ce4095"), width=0.04536)
add(8, 'segment', Line((2.5, -10.3, 0), (17.5, -10.3, 0)), color=Color.from_hex("#ce4095"), width=0.04536)
add(8, 'segment', Line((2.5, -10.98, 0), (17.5, -10.98, 0)), color=Color.from_hex("#ce4095"), width=0.04536)
add(8, 'segment', Line((2.5, -11.66, 0), (17.5, -11.66, 0)), color=Color.from_hex("#ce4095"), width=0.04536)
add(8, 'segment', Line((2.5, -8.94, 0), (7.5, -9.62, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((2.5, -9.62, 0), (7.5, -8.94, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((7.5, -8.94, 0), (12.5, -9.62, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((7.5, -9.62, 0), (12.5, -8.94, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((12.5, -8.94, 0), (17.5, -9.62, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((12.5, -9.62, 0), (17.5, -8.94, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((2.5, -9.62, 0), (7.5, -10.3, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((2.5, -10.3, 0), (7.5, -9.62, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((7.5, -9.62, 0), (12.5, -10.3, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((7.5, -10.3, 0), (12.5, -9.62, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((12.5, -9.62, 0), (17.5, -10.3, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((12.5, -10.3, 0), (17.5, -9.62, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((2.5, -10.3, 0), (7.5, -10.98, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((2.5, -10.98, 0), (7.5, -10.3, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((7.5, -10.3, 0), (12.5, -10.98, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((7.5, -10.98, 0), (12.5, -10.3, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((12.5, -10.3, 0), (17.5, -10.98, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((12.5, -10.98, 0), (17.5, -10.3, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((2.5, -10.98, 0), (7.5, -11.66, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((2.5, -11.66, 0), (7.5, -10.98, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((7.5, -10.98, 0), (12.5, -11.66, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((7.5, -11.66, 0), (12.5, -10.98, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((12.5, -10.98, 0), (17.5, -11.66, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((12.5, -11.66, 0), (17.5, -10.98, 0)), color=Color.from_hex("#1a1eb2"), width=0.04536)
add(8, 'segment', Line((2.5, -8.6, 0), (2.5, -12, 0)), color=Color.from_hex("#aaaaaa"), width=0.095558)
add(8, 'segment', Line((17.5, -8.6, 0), (17.5, -12, 0)), color=Color.from_hex("#aaaaaa"), width=0.095558)
add(8, 'label', Point(10, -13.2, 0), color=Color.from_hex("#aaaaaa"), text='c) plan: cross-ties brace the row of cables into one surface')


if __name__ == "__main__":
    print("EX 3 Creative — an asymmetric hanging roof —", len(ops), "operations")
