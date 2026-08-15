"""EX 3.1b — a cable under a line load, and where it works hardest

Auto-generated from ops/ex3_1b.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-16, -8, 0), text='Lageplan — form diagram')
add(0, 'label', Point(-16, -9.3, 0), text='arrows are symbols, not to scale')
add(0, 'label', Point(1, 13.2, 0), text='Kräfteplan — force diagram')
add(0, 'label', Point(9, 11.9, 0), text='to scale · 1 unit ≙ 10 kN  (sheet: 1 cm ≙ 20 kN)')

# step 1 — What is given
add(1, 'point', Point(-16, 2, 0), color=Color.from_hex("#ffffff"), width=0.3108)
add(1, 'label', Point(-17.4, 3, 0), text='A')
add(1, 'point', Point(-6.4, 2, 0), color=Color.from_hex("#ffffff"), width=0.3108)
add(1, 'label', Point(-5.1, 0.7, 0), text='B')
add(1, 'segment', Line((-16, 5.4, 0), (-6.4, 5.4, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-16, 5.4, 0), (-16, 3.9, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-15.04, 5.4, 0), (-15.04, 3.9, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-14.08, 5.4, 0), (-14.08, 3.9, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-13.12, 5.4, 0), (-13.12, 3.9, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-12.16, 5.4, 0), (-12.16, 3.9, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-11.2, 5.4, 0), (-11.2, 3.9, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-10.24, 5.4, 0), (-10.24, 3.9, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-9.28, 5.4, 0), (-9.28, 3.9, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-8.32, 5.4, 0), (-8.32, 3.9, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-7.36, 5.4, 0), (-7.36, 3.9, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'segment', Line((-6.4, 5.4, 0), (-6.4, 3.9, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'label', Point(-20.2, 5.4, 0), color=Color.from_hex("#3f9c20"), text='q_d = 20 kN/m')

# step 2 — First the resultant
add(2, 'polyline', Polyline([(-18.4, 2, 0), (-4, 2, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2478)
add(2, 'label', Point(-3, 2.9, 0), color=Color.from_hex("#aaaaaa"), text='CS / SL')
add(2, 'polyline', Polyline([(-11.2, 6.4, 0), (-11.2, -4.2, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2478)
add(2, 'arrow', Line((-11.2, 5.2, 0), (-11.2, 1, 0)), color=Color.from_hex("#3f9c20"), width=0.132149, dash=0.39648, head=(0.396144, 0.153014))
add(2, 'arrow', Line((6.7686, 8, 0), (6.7686, -4, 0)), color=Color.from_hex("#3f9c20"), width=0.132149, dash=0.39648, head=(0.396144, 0.153014))
add(2, 'label', Point(-9.6, 3.1, 0), color=Color.from_hex("#3f9c20"), text='R')
add(2, 'label', Point(4, 2, 0), color=Color.from_hex("#3f9c20"), text='R')

# step 3 — Now design: choose the sag
add(3, 'polygon', Polygon([(-15.3567, 2.80559, 0), (-14.995, 2.47256, 0), (-14.65, 2.18089, 0), (-14.305, 1.917, 0), (-13.96, 1.68089, 0), (-13.615, 1.47256, 0), (-13.27, 1.292, 0), (-12.925, 1.13922, 0), (-12.58, 1.01422, 0), (-12.235, 0.917, 0), (-11.89, 0.847556, 0), (-11.545, 0.805889, 0), (-11.2, 0.792, 0), (-10.855, 0.805889, 0), (-10.51, 0.847556, 0), (-10.165, 0.917, 0), (-9.82, 1.01422, 0), (-9.475, 1.13922, 0), (-9.13, 1.292, 0), (-8.785, 1.47256, 0), (-8.44, 1.68089, 0), (-8.095, 1.917, 0), (-7.75, 2.18089, 0), (-7.405, 2.47256, 0), (-7.04335, 2.80559, 0), (-5.75665, 1.19442, 0), (-6.195, 0.888556, 0), (-6.65, 0.596889, 0), (-7.105, 0.333, 0), (-7.56, 0.096889, 0), (-8.015, -0.111444, 0), (-8.47, -0.292, 0), (-8.925, -0.444778, 0), (-9.38, -0.569778, 0), (-9.835, -0.667, 0), (-10.29, -0.736444, 0), (-10.745, -0.778111, 0), (-11.2, -0.792, 0), (-11.655, -0.778111, 0), (-12.11, -0.736444, 0), (-12.565, -0.667, 0), (-13.02, -0.569778, 0), (-13.475, -0.444778, 0), (-13.93, -0.292, 0), (-14.385, -0.111444, 0), (-14.84, 0.096889, 0), (-15.295, 0.333, 0), (-15.75, 0.596889, 0), (-16.205, 0.888556, 0), (-16.6433, 1.19442, 0)]), color=Color.from_hex("#ce4095"))
add(3, 'segment', Line((-16, 2, 0), (-15.6, 1.68056, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((-15.6, 1.68056, 0), (-15.2, 1.38889, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((-15.2, 1.38889, 0), (-14.8, 1.125, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((-14.8, 1.125, 0), (-14.4, 0.888889, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((-14.4, 0.888889, 0), (-14, 0.680556, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((-14, 0.680556, 0), (-13.6, 0.5, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((-13.6, 0.5, 0), (-13.2, 0.347222, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((-13.2, 0.347222, 0), (-12.8, 0.222222, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((-12.8, 0.222222, 0), (-12.4, 0.125, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((-12.4, 0.125, 0), (-12, 0.055556, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((-12, 0.055556, 0), (-11.6, 0.013889, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((-11.6, 0.013889, 0), (-11.2, 0, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((-11.2, 0, 0), (-10.8, 0.013889, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((-10.8, 0.013889, 0), (-10.4, 0.055556, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((-10.4, 0.055556, 0), (-10, 0.125, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((-10, 0.125, 0), (-9.6, 0.222222, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((-9.6, 0.222222, 0), (-9.2, 0.347222, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((-9.2, 0.347222, 0), (-8.8, 0.5, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((-8.8, 0.5, 0), (-8.4, 0.680556, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((-8.4, 0.680556, 0), (-8, 0.888889, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((-8, 0.888889, 0), (-7.6, 1.125, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((-7.6, 1.125, 0), (-7.2, 1.38889, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((-7.2, 1.38889, 0), (-6.8, 1.68056, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((-6.8, 1.68056, 0), (-6.4, 2, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'polyline', Polyline([(-16, 2, 0), (-11.2, -2, 0)]), color=Color.from_hex("#ce4095"), dash=0.2478)
add(3, 'segment', Line((13.2, 2, 0), (6, 8, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'label', Point(-15.1, -0.3, 0), color=Color.from_hex("#ce4095"), text='1')
add(3, 'label', Point(12, 6, 0), color=Color.from_hex("#ce4095"), text='1')
add(3, 'polyline', Polyline([(-6.4, 2, 0), (-11.2, -2, 0)]), color=Color.from_hex("#ce4095"), dash=0.2478)
add(3, 'segment', Line((13.2, 2, 0), (6, -4, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'label', Point(-7.3, -0.3, 0), color=Color.from_hex("#ce4095"), text='2')
add(3, 'label', Point(12, -2, 0), color=Color.from_hex("#ce4095"), text='2')
add(3, 'point', Point(-11.2, -2, 0), color=Color.from_hex("#ffffff"), width=0.21756)
add(3, 'label', Point(-11.2, -3.4, 0), text='I')
add(3, 'point', Point(13.2, 2, 0), color=Color.from_hex("#ffffff"), width=0.24864)
add(3, 'label', Point(14.7, 2.7, 0), text='o')
add(3, 'segment', Line((-10.2, 2, 0), (-10.2, 0, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(3, 'label', Point(-7.8, 1.3, 0), color=Color.from_hex("#aaaaaa"), text='f = 1.25 m')

# step 4 — The horizontal thrust
add(4, 'segment', Line((6, 9.7, 0), (13.2, 9.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(4, 'label', Point(9.6, 10.8, 0), color=Color.from_hex("#aaaaaa"), text='H = 72.0 kN')

# step 5 — Global equilibrium
add(5, 'arrow', Line((-16, 2, 0), (-19.2265, 4.68877, 0)), color=Color.from_hex("#3f9c20"), width=0.082858, head=(0.267926, 0.114912))
add(5, 'arrow', Line((13.9686, 2, 0), (6.7686, 8, 0)), color=Color.from_hex("#3f9c20"), width=0.082858, head=(0.267926, 0.114912))
add(5, 'label', Point(-20.4265, 5.58877, 0), color=Color.from_hex("#3f9c20"), text='A')
add(5, 'arrow', Line((-6.4, 2, 0), (-3.17347, 4.68877, 0)), color=Color.from_hex("#3f9c20"), width=0.082858, head=(0.267926, 0.114912))
add(5, 'arrow', Line((6.7686, -4, 0), (13.9686, 2, 0)), color=Color.from_hex("#3f9c20"), width=0.082858, head=(0.267926, 0.114912))
add(5, 'label', Point(-1.97347, 5.58877, 0), color=Color.from_hex("#3f9c20"), text='B')

# step 6 — c) Is the force constant?
add(6, 'segment', Line((13.2, 2, 0), (6, 7.4, 0)), color=Color.from_hex("#ce4095"), width=0.044755)
add(6, 'segment', Line((13.2, 2, 0), (6, 6.8, 0)), color=Color.from_hex("#ce4095"), width=0.044755)
add(6, 'segment', Line((13.2, 2, 0), (6, 6.2, 0)), color=Color.from_hex("#ce4095"), width=0.044755)
add(6, 'segment', Line((13.2, 2, 0), (6, 5.6, 0)), color=Color.from_hex("#ce4095"), width=0.044755)
add(6, 'segment', Line((13.2, 2, 0), (6, 5, 0)), color=Color.from_hex("#ce4095"), width=0.044755)
add(6, 'segment', Line((13.2, 2, 0), (6, 4.4, 0)), color=Color.from_hex("#ce4095"), width=0.044755)
add(6, 'segment', Line((13.2, 2, 0), (6, 3.8, 0)), color=Color.from_hex("#ce4095"), width=0.044755)
add(6, 'segment', Line((13.2, 2, 0), (6, 3.2, 0)), color=Color.from_hex("#ce4095"), width=0.044755)
add(6, 'segment', Line((13.2, 2, 0), (6, 2.6, 0)), color=Color.from_hex("#ce4095"), width=0.044755)
add(6, 'segment', Line((13.2, 2, 0), (6, 2, 0)), color=Color.from_hex("#ce4095"), width=0.044755)
add(6, 'segment', Line((13.2, 2, 0), (6, 1.4, 0)), color=Color.from_hex("#ce4095"), width=0.044755)
add(6, 'segment', Line((13.2, 2, 0), (6, 0.8, 0)), color=Color.from_hex("#ce4095"), width=0.044755)
add(6, 'segment', Line((13.2, 2, 0), (6, 0.2, 0)), color=Color.from_hex("#ce4095"), width=0.044755)
add(6, 'segment', Line((13.2, 2, 0), (6, -0.4, 0)), color=Color.from_hex("#ce4095"), width=0.044755)
add(6, 'segment', Line((13.2, 2, 0), (6, -1, 0)), color=Color.from_hex("#ce4095"), width=0.044755)
add(6, 'segment', Line((13.2, 2, 0), (6, -1.6, 0)), color=Color.from_hex("#ce4095"), width=0.044755)
add(6, 'segment', Line((13.2, 2, 0), (6, -2.2, 0)), color=Color.from_hex("#ce4095"), width=0.044755)
add(6, 'segment', Line((13.2, 2, 0), (6, -2.8, 0)), color=Color.from_hex("#ce4095"), width=0.044755)
add(6, 'segment', Line((13.2, 2, 0), (6, -3.4, 0)), color=Color.from_hex("#ce4095"), width=0.044755)

# step 7 — c) Draw one more tangent
add(7, 'segment', Line((-17.0955, 2.32508, 0), (-11.4485, -0.686682, 0)), color=Color.from_hex("#ce4095"), width=0.143338)
add(7, 'segment', Line((13.2, 2, 0), (6, 5.84, 0)), color=Color.from_hex("#ce4095"), width=0.143338)
add(7, 'point', Point(-14.272, 0.8192, 0), color=Color.from_hex("#ffffff"), width=0.24864)
add(7, 'label', Point(-17.672, -1.5808, 0), color=Color.from_hex("#ce4095"), text='tangent at 1.08 m')
add(7, 'label', Point(3.4, 5.84, 0), color=Color.from_hex("#ce4095"), text='81.6 kN')

# step 8 — c) The answer
add(8, 'label', Point(9.6, -6.2, 0), color=Color.from_hex("#ce4095"), text='shortest ray = H = 72.0 kN')
add(8, 'label', Point(9.6, 8.6, 0), color=Color.from_hex("#ce4095"), text='longest = 93.7 kN')


if __name__ == "__main__":
    print("EX 3.1b — a cable under a line load, and where it works hardest —", len(ops), "operations")
