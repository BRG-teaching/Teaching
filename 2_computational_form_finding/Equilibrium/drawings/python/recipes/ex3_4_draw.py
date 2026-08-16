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
add(1, 'segment', Line((-20.5286, -5, 0), (-21.2003, -5.67175, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-18.8571, -5, 0), (-19.5289, -5.67175, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-17.1857, -5, 0), (-17.8575, -5.67175, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-15.5143, -5, 0), (-16.186, -5.67175, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-13.8429, -5, 0), (-14.5146, -5.67175, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-12.1714, -5, 0), (-12.8432, -5.67175, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-10.5, -5, 0), (-11.1718, -5.67175, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-8.82857, -5, 0), (-9.50032, -5.67175, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-7.15714, -5, 0), (-7.82889, -5.67175, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-5.48571, -5, 0), (-6.15747, -5.67175, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-3.81429, -5, 0), (-4.48604, -5.67175, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-2.14286, -5, 0), (-2.81461, -5.67175, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-0.471429, -5, 0), (-1.14318, -5.67175, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((1.2, -5, 0), (0.528249, -5.67175, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'polygon', Polygon([(-20.9, -5, 0), (-19, -5, 0), (-19, -1.46923, 0), (-20.9, -1.46923, 0)]), color=Color.from_hex("#aaaaaa"))
add(1, 'polygon', Polygon([(-2, -5, 0), (-0.1, -5, 0), (-0.1, -1.46923, 0), (-2, -1.46923, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'point', Point(-19, -1.46923, 0), color=Color.from_hex("#ffffff"), width=0.3108)
add(1, 'label', Point(-19.6, -0.369231, 0), text='A')
add(1, 'segment', Line((-19, 3.6, 0), (-2, 3.6, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'label', Point(-14.6, 2.2, 0), color=Color.from_hex("#3f9c20"), text='s_d = 37.5 kN/m')

# step 2 — The resultant
add(2, 'polyline', Polyline([(-10.5, 4.4, 0), (-10.5, -5.5, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2478)
add(2, 'arrow', Line((-10.5, 2.4, 0), (-10.5, 0.2, 0)), color=Color.from_hex("#3f9c20"), width=0.132149, dash=0.39648, head=(0.396144, 0.153014))
add(2, 'arrow', Line((4, 4.44977, 0), (4, -5.30023, 0)), color=Color.from_hex("#3f9c20"), width=0.132149, dash=0.39648, head=(0.396144, 0.153014))
add(2, 'label', Point(-9.3, 1.3, 0), color=Color.from_hex("#3f9c20"), text='R')
add(2, 'label', Point(2, -0.425225, 0), color=Color.from_hex("#3f9c20"), text='R')

# step 3 — a) Raise the right wall
add(3, 'polygon', Polygon([(-2, -5, 0), (-0.1, -5, 0), (-0.1, 2.14785, 0), (-2, 2.14785, 0)]), color=Color.from_hex("#aaaaaa"))
add(3, 'point', Point(-2, 2.14785, 0), color=Color.from_hex("#ffffff"), width=0.3108)
add(3, 'label', Point(-1.4, 3.24785, 0), text='B')
add(3, 'polyline', Polyline([(-21, -1.46923, 0), (0, 2.14785, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2478)
add(3, 'label', Point(-10.5, 1.53931, 0), color=Color.from_hex("#aaaaaa"), text='CS / SL')
add(3, 'segment', Line((0.6, -1.46923, 0), (0.6, 2.14785, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(3, 'label', Point(2.9, 1.24785, 0), color=Color.from_hex("#aaaaaa"), text='raised +13.83 m')

# step 4 — a) Choose the sag
add(4, 'polygon', Polygon([(-18.9261, -1.09665, 0), (-18.2786, -1.22764, 0), (-17.6369, -1.3359, 0), (-16.9953, -1.42265, 0), (-16.3537, -1.48788, 0), (-15.712, -1.53161, 0), (-15.0704, -1.55383, 0), (-14.4288, -1.55453, 0), (-13.7872, -1.53372, 0), (-13.1455, -1.49141, 0), (-12.5039, -1.42758, 0), (-11.8623, -1.34224, 0), (-11.2206, -1.23538, 0), (-10.579, -1.10702, 0), (-9.93739, -0.957147, 0), (-9.29576, -0.785762, 0), (-8.65413, -0.592866, 0), (-8.0125, -0.378458, 0), (-7.37087, -0.14254, 0), (-6.72924, 0.11489, 0), (-6.08762, 0.393831, 0), (-5.44599, 0.694283, 0), (-4.80436, 1.01625, 0), (-4.16273, 1.35972, 0), (-3.5211, 1.72471, 0), (-2.87947, 2.1112, 0), (-2.23346, 2.52198, 0), (-1.76654, 1.77371, 0), (-2.42822, 1.36848, 0), (-3.09428, 0.981978, 0), (-3.76035, 0.616993, 0), (-4.42641, 0.273518, 0), (-5.09248, -0.048445, 0), (-5.75854, -0.348897, 0), (-6.4246, -0.627838, 0), (-7.09067, -0.885267, 0), (-7.75673, -1.12119, 0), (-8.42279, -1.33559, 0), (-9.08886, -1.52849, 0), (-9.75492, -1.69988, 0), (-10.421, -1.84975, 0), (-11.087, -1.97811, 0), (-11.7531, -2.08496, 0), (-12.4192, -2.1703, 0), (-13.0852, -2.23413, 0), (-13.7513, -2.27645, 0), (-14.4174, -2.29726, 0), (-15.0834, -2.29655, 0), (-15.7495, -2.27434, 0), (-16.4156, -2.23061, 0), (-17.0816, -2.16537, 0), (-17.7477, -2.07863, 0), (-18.4138, -1.97037, 0), (-19.0739, -1.84181, 0)]), color=Color.from_hex("#f0bcdb"))
add(4, 'segment', Line((-19, -1.46923, 0), (-18.3462, -1.599, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-18.3462, -1.599, 0), (-17.6923, -1.70726, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-17.6923, -1.70726, 0), (-17.0385, -1.79401, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-17.0385, -1.79401, 0), (-16.3846, -1.85925, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-16.3846, -1.85925, 0), (-15.7308, -1.90298, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-15.7308, -1.90298, 0), (-15.0769, -1.92519, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-15.0769, -1.92519, 0), (-14.4231, -1.92589, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-14.4231, -1.92589, 0), (-13.7692, -1.90509, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-13.7692, -1.90509, 0), (-13.1154, -1.86277, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-13.1154, -1.86277, 0), (-12.4615, -1.79894, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-12.4615, -1.79894, 0), (-11.8077, -1.7136, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-11.8077, -1.7136, 0), (-11.1538, -1.60675, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-11.1538, -1.60675, 0), (-10.5, -1.47839, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-10.5, -1.47839, 0), (-9.84615, -1.32851, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-9.84615, -1.32851, 0), (-9.19231, -1.15713, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-9.19231, -1.15713, 0), (-8.53846, -0.964229, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-8.53846, -0.964229, 0), (-7.88462, -0.749822, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-7.88462, -0.749822, 0), (-7.23077, -0.513904, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-7.23077, -0.513904, 0), (-6.57692, -0.256474, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-6.57692, -0.256474, 0), (-5.92308, 0.022467, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-5.92308, 0.022467, 0), (-5.26923, 0.322919, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-5.26923, 0.322919, 0), (-4.61538, 0.644882, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-4.61538, 0.644882, 0), (-3.96154, 0.988356, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-3.96154, 0.988356, 0), (-3.30769, 1.35334, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-3.30769, 1.35334, 0), (-2.65385, 1.73984, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-2.65385, 1.73984, 0), (-2, 2.14785, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'polyline', Polyline([(-19, -1.46923, 0), (-10.5, -3.29608, 0)]), color=Color.from_hex("#ce4095"), dash=0.2478)
add(4, 'segment', Line((15.3984, 2, 0), (4, 4.44977, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'label', Point(-15.2543, -4.72907, 0), color=Color.from_hex("#ce4095"), text='1')
add(4, 'label', Point(11.8992, 4.12489, 0), color=Color.from_hex("#ce4095"), text='1')
add(4, 'polyline', Polyline([(-2, 2.14785, 0), (-10.5, -3.29608, 0)]), color=Color.from_hex("#ce4095"), dash=0.2478)
add(4, 'segment', Line((15.3984, 2, 0), (4, -5.30023, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'label', Point(-4.95561, -2.59514, 0), color=Color.from_hex("#ce4095"), text='2')
add(4, 'label', Point(11.8992, -2.55011, 0), color=Color.from_hex("#ce4095"), text='2')
add(4, 'point', Point(15.3984, 2, 0), color=Color.from_hex("#ffffff"), width=0.24864)
add(4, 'label', Point(16.7984, 2.7, 0), text='o')
add(4, 'segment', Line((4, 6.14977, 0), (15.3984, 6.14977, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(4, 'label', Point(9.69919, 7.24977, 0), color=Color.from_hex("#aaaaaa"), text='H = 2850 kN')
add(4, 'point', Point(-14.7286, -1.92824, 0), color=Color.from_hex("#ffffff"), width=0.21756)
add(4, 'label', Point(-17.5286, -3.52824, 0), color=Color.from_hex("#aaaaaa"), text='lowest: 11.7 m')

# step 5 — a) The two reactions
add(5, 'point', Point(4, 2, 0), color=Color.from_hex("#ffffff"), width=0.21756)
add(5, 'label', Point(2.7, 2, 0), text='i')
add(5, 'arrow', Line((-19, -1.46923, 0), (-22.3241, -0.754806, 0)), color=Color.from_hex("#3f9c20"), width=0.082858, head=(0.267926, 0.114912))
add(5, 'arrow', Line((16.3914, 2.17965, 0), (4.08075, 4.8255, 0)), color=Color.from_hex("#3f9c20"), width=0.082858, head=(0.267926, 0.114912))
add(5, 'label', Point(-20.9241, 0.345194, 0), color=Color.from_hex("#3f9c20"), text='A = 2915')
add(5, 'arrow', Line((-2, 2.14785, 0), (0.863123, 3.98157, 0)), color=Color.from_hex("#3f9c20"), width=0.082858, head=(0.267926, 0.114912))
add(5, 'arrow', Line((4.20726, -5.62384, 0), (16.3914, 2.17965, 0)), color=Color.from_hex("#3f9c20"), width=0.082858, head=(0.267926, 0.114912))
add(5, 'label', Point(2.66312, 4.88157, 0), color=Color.from_hex("#3f9c20"), text='B = 3384')

# step 6 — a) The governing force
add(6, 'label', Point(-4.30769, -0.803636, 0), color=Color.from_hex("#ce4095"), text='N_max = 3384 kN')
add(6, 'label', Point(9.8, -6.80023, 0), color=Color.from_hex("#aaaaaa"), text='the key prints 3000 / 3500 kN off this geometry:')
add(6, 'label', Point(9.8, -7.80023, 0), color=Color.from_hex("#aaaaaa"), text='its R is drawn 5.00 cm ≙ 2500 kN, 2.56 % over 2437.5 kN')

# step 7 — b) The cable diameter
add(7, 'circle', Circle(0.1, frame=Frame((-4, -7.4, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#ce4095"))
add(7, 'label', Point(-0.4, -7.4, 0), color=Color.from_hex("#ce4095"), text='Ø 139 mm')

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
