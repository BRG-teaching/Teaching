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
add(3, 'polygon', Polygon([(-15.7248, 2.3446, 0), (-15.3412, 2.01934, 0), (-14.9647, 1.72767, 0), (-14.5883, 1.46379, 0), (-14.2118, 1.22767, 0), (-13.8353, 1.01934, 0), (-13.4588, 0.838786, 0), (-13.0824, 0.686008, 0), (-12.7059, 0.561008, 0), (-12.3294, 0.463786, 0), (-11.9529, 0.394341, 0), (-11.5765, 0.352674, 0), (-11.2, 0.338786, 0), (-10.8235, 0.352674, 0), (-10.4471, 0.394341, 0), (-10.0706, 0.463786, 0), (-9.69411, 0.561008, 0), (-9.31763, 0.686008, 0), (-8.94116, 0.838786, 0), (-8.56469, 1.01934, 0), (-8.18821, 1.22767, 0), (-7.81174, 1.46379, 0), (-7.43527, 1.72767, 0), (-7.05879, 2.01934, 0), (-6.6752, 2.3446, 0), (-6.1248, 1.6554, 0), (-6.5412, 1.34177, 0), (-6.96473, 1.0501, 0), (-7.38826, 0.786214, 0), (-7.81179, 0.550103, 0), (-8.23531, 0.34177, 0), (-8.65884, 0.161214, 0), (-9.08237, 0.008437, 0), (-9.50589, -0.116563, 0), (-9.92942, -0.213786, 0), (-10.3529, -0.28323, 0), (-10.7765, -0.324897, 0), (-11.2, -0.338786, 0), (-11.6235, -0.324897, 0), (-12.0471, -0.28323, 0), (-12.4706, -0.213786, 0), (-12.8941, -0.116563, 0), (-13.3176, 0.008437, 0), (-13.7412, 0.161214, 0), (-14.1647, 0.34177, 0), (-14.5882, 0.550103, 0), (-15.0117, 0.786214, 0), (-15.4353, 1.0501, 0), (-15.8588, 1.34177, 0), (-16.2752, 1.6554, 0)]), color=Color.from_hex("#f0bcdb"))
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
