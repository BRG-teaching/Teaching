"""EX 3.3 — the Pavilhão de Portugal: finding the roof form

Auto-generated from ops/ex3_3.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-19, -8.7, 0), text='Lageplan 1:500 — form diagram')
add(0, 'label', Point(1, 13.2, 0), text='Kräfteplan — force diagram')
add(0, 'label', Point(9, 11.9, 0), text='to scale · 1 unit ≙ 400 kN  (sheet: 1 cm ≙ 500 kN)')

# step 1 — a) The design area load
add(1, 'segment', Line((-22.4, -2.33077, 0), (1.4, -2.33077, 0)), color=Color.from_hex("#111111"), width=0.095558)
add(1, 'segment', Line((-20.5286, -2.33077, 0), (-21.2003, -3.00252, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-18.8571, -2.33077, 0), (-19.5289, -3.00252, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-17.1857, -2.33077, 0), (-17.8575, -3.00252, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-15.5143, -2.33077, 0), (-16.186, -3.00252, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-13.8429, -2.33077, 0), (-14.5146, -3.00252, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-12.1714, -2.33077, 0), (-12.8432, -3.00252, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-10.5, -2.33077, 0), (-11.1718, -3.00252, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-8.82857, -2.33077, 0), (-9.50032, -3.00252, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-7.15714, -2.33077, 0), (-7.82889, -3.00252, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-5.48571, -2.33077, 0), (-6.15747, -3.00252, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-3.81429, -2.33077, 0), (-4.48604, -3.00252, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-2.14286, -2.33077, 0), (-2.81461, -3.00252, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-0.471429, -2.33077, 0), (-1.14318, -3.00252, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((1.2, -2.33077, 0), (0.528249, -3.00252, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'polygon', Polygon([(-21, -2.33077, 0), (-19, -2.33077, 0), (-19, 1.2, 0), (-21, 1.2, 0)]), color=Color.from_hex("#aaaaaa"))
add(1, 'point', Point(-19, 1.2, 0), color=Color.from_hex("#ffffff"), width=0.3108)
add(1, 'label', Point(-19.5, 2.3, 0), text='A')
add(1, 'polygon', Polygon([(-2, -2.33077, 0), (0, -2.33077, 0), (0, 1.2, 0), (-2, 1.2, 0)]), color=Color.from_hex("#aaaaaa"))
add(1, 'point', Point(-2, 1.2, 0), color=Color.from_hex("#ffffff"), width=0.3108)
add(1, 'label', Point(-1.5, 2.3, 0), text='B')
add(1, 'polygon', Polygon([(-19, -4.8, 0), (-2, -4.8, 0), (-2, -7.41538, 0), (-19, -7.41538, 0)]), color=Color.from_hex("#f1f1f4"))
add(1, 'segment', Line((-19, -4.8, 0), (-19, -7.41538, 0)), color=Color.from_hex("#aaaaaa"), width=0.04536)
add(1, 'segment', Line((-2, -4.8, 0), (-2, -7.41538, 0)), color=Color.from_hex("#aaaaaa"), width=0.04536)
add(1, 'label', Point(-10.5, -3.9, 0), color=Color.from_hex("#aaaaaa"), text='the roof in plan · one element spans the 65 m')
add(1, 'label', Point(-10.5, -8.61538, 0), color=Color.from_hex("#aaaaaa"), text='l = 65 m')
add(1, 'segment', Line((-19, 3, 0), (-2, 3, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'label', Point(0.6, 3, 0), color=Color.from_hex("#3f9c20"), text='g_d = 6.75 kN/m²')
add(1, 'segment', Line((-19, 4.4, 0), (-2, 4.4, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(1, 'label', Point(0.6, 4.4, 0), color=Color.from_hex("#3f9c20"), text='q_d = 0.75 kN/m²')

# step 2 — b) The load influence zone
add(2, 'polygon', Polygon([(-19, -5.45385, 0), (-2, -5.45385, 0), (-2, -6.76154, 0), (-19, -6.76154, 0)]), color=Color.from_hex("#3f9c20"))
add(2, 'segment', Line((-19, -5.45385, 0), (-2, -5.45385, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(2, 'segment', Line((-19, -6.76154, 0), (-2, -6.76154, 0)), color=Color.from_hex("#3f9c20"), width=0.04536)
add(2, 'segment', Line((-1, -5.45385, 0), (-1, -6.76154, 0)), color=Color.from_hex("#3f9c20"), width=0.031752)
add(2, 'label', Point(0.6, -6.10769, 0), color=Color.from_hex("#3f9c20"), text='b = 5 m')

# step 3 — c) The resultant
add(3, 'polyline', Polyline([(-21.6, 1.2, 0), (0.6, 1.2, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2478)
add(3, 'label', Point(-9, 1.7, 0), color=Color.from_hex("#aaaaaa"), text='CS / SL')
add(3, 'polyline', Polyline([(-10.5, 5, 0), (-10.5, -2.93077, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2478)
add(3, 'arrow', Line((-10.5, 2.6, 0), (-10.5, 0.1, 0)), color=Color.from_hex("#3f9c20"), width=0.132149, dash=0.39648, head=(0.396144, 0.153014))
add(3, 'arrow', Line((4, 5.04688, 0), (4, -1.04688, 0)), color=Color.from_hex("#3f9c20"), width=0.132149, dash=0.39648, head=(0.396144, 0.153014))
add(3, 'label', Point(-9.3, 1.5, 0), color=Color.from_hex("#3f9c20"), text='R')
add(3, 'label', Point(2, 2, 0), color=Color.from_hex("#3f9c20"), text='R')

# step 4 — d) The form: the crown is the brief
add(4, 'polygon', Polygon([(-18.9106, 1.63184, 0), (-18.2604, 1.4957, 0), (-17.6137, 1.37112, 0), (-16.967, 1.25738, 0), (-16.3203, 1.15446, 0), (-15.6736, 1.06238, 0), (-15.0269, 0.981136, 0), (-14.3802, 0.910722, 0), (-13.7335, 0.851141, 0), (-13.0868, 0.802393, 0), (-12.4401, 0.764477, 0), (-11.7934, 0.737395, 0), (-11.1467, 0.721145, 0), (-10.5, 0.715729, 0), (-9.8533, 0.721145, 0), (-9.20659, 0.737395, 0), (-8.55989, 0.764477, 0), (-7.91319, 0.802393, 0), (-7.26648, 0.851141, 0), (-6.61978, 0.910722, 0), (-5.97308, 0.981136, 0), (-5.32637, 1.06238, 0), (-4.67967, 1.15446, 0), (-4.03297, 1.25738, 0), (-3.38626, 1.37112, 0), (-2.73956, 1.4957, 0), (-2.08943, 1.63184, 0), (-1.91057, 0.768164, 0), (-2.56813, 0.633475, 0), (-3.22912, 0.508896, 0), (-3.89011, 0.39515, 0), (-4.5511, 0.292236, 0), (-5.21209, 0.200156, 0), (-5.87308, 0.118909, 0), (-6.53407, 0.048495, 0), (-7.19506, -0.011086, 0), (-7.85604, -0.059835, 0), (-8.51703, -0.09775, 0), (-9.17802, -0.124832, 0), (-9.83901, -0.141082, 0), (-10.5, -0.146498, 0), (-11.161, -0.141082, 0), (-11.822, -0.124832, 0), (-12.483, -0.09775, 0), (-13.144, -0.059835, 0), (-13.8049, -0.011086, 0), (-14.4659, 0.048495, 0), (-15.1269, 0.118909, 0), (-15.7879, 0.200156, 0), (-16.4489, 0.292236, 0), (-17.1099, 0.39515, 0), (-17.7709, 0.508896, 0), (-18.4319, 0.633475, 0), (-19.0894, 0.768164, 0)]), color=Color.from_hex("#f0bcdb"))
add(4, 'segment', Line((-19, 1.2, 0), (-18.3462, 1.06459, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-18.3462, 1.06459, 0), (-17.6923, 0.940009, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-17.6923, 0.940009, 0), (-17.0385, 0.826263, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-17.0385, 0.826263, 0), (-16.3846, 0.72335, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-16.3846, 0.72335, 0), (-15.7308, 0.63127, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-15.7308, 0.63127, 0), (-15.0769, 0.550023, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-15.0769, 0.550023, 0), (-14.4231, 0.479609, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-14.4231, 0.479609, 0), (-13.7692, 0.420027, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-13.7692, 0.420027, 0), (-13.1154, 0.371279, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-13.1154, 0.371279, 0), (-12.4615, 0.333364, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-12.4615, 0.333364, 0), (-11.8077, 0.306281, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-11.8077, 0.306281, 0), (-11.1538, 0.290032, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-11.1538, 0.290032, 0), (-10.5, 0.284615, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-10.5, 0.284615, 0), (-9.84615, 0.290032, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-9.84615, 0.290032, 0), (-9.19231, 0.306281, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-9.19231, 0.306281, 0), (-8.53846, 0.333364, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-8.53846, 0.333364, 0), (-7.88462, 0.371279, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-7.88462, 0.371279, 0), (-7.23077, 0.420027, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-7.23077, 0.420027, 0), (-6.57692, 0.479609, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-6.57692, 0.479609, 0), (-5.92308, 0.550023, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-5.92308, 0.550023, 0), (-5.26923, 0.63127, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-5.26923, 0.63127, 0), (-4.61538, 0.72335, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-4.61538, 0.72335, 0), (-3.96154, 0.826263, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-3.96154, 0.826263, 0), (-3.30769, 0.940009, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-3.30769, 0.940009, 0), (-2.65385, 1.06459, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'segment', Line((-2.65385, 1.06459, 0), (-2, 1.2, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'polyline', Polyline([(-19, 1.2, 0), (-10.5, -0.630769, 0)]), color=Color.from_hex("#ce4095"), dash=0.2478)
add(4, 'segment', Line((18.1462, 2, 0), (4, 5.04688, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'label', Point(-14.75, -0.715385, 0), color=Color.from_hex("#ce4095"), text='1')
add(4, 'label', Point(13.2731, 4.42344, 0), color=Color.from_hex("#ce4095"), text='1')
add(4, 'polyline', Polyline([(-2, 1.2, 0), (-10.5, -0.630769, 0)]), color=Color.from_hex("#ce4095"), dash=0.2478)
add(4, 'segment', Line((18.1462, 2, 0), (4, -1.04688, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(4, 'label', Point(-6.25, -0.715385, 0), color=Color.from_hex("#ce4095"), text='2')
add(4, 'label', Point(13.2731, -0.423438, 0), color=Color.from_hex("#ce4095"), text='2')
add(4, 'point', Point(-10.5, -0.630769, 0), color=Color.from_hex("#ffffff"), width=0.21756)
add(4, 'point', Point(18.1462, 2, 0), color=Color.from_hex("#ffffff"), width=0.24864)
add(4, 'label', Point(19.5462, 2.7, 0), text='o')
add(4, 'segment', Line((-18.1, -2.33077, 0), (-18.1, 0.284615, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(4, 'label', Point(-16.4, -1.73077, 0), color=Color.from_hex("#aaaaaa"), text='h = 10 m')
add(4, 'segment', Line((-7.5, 1.2, 0), (-7.5, 0.284615, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(4, 'label', Point(-5.5, 1.8, 0), color=Color.from_hex("#aaaaaa"), text='f = 3.50 m')
add(4, 'polyline', Polyline([(-18.4, 0.284615, 0), (-6.9, 0.284615, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2478)

# step 5 — d) The horizontal thrust
add(5, 'segment', Line((4, 6.74688, 0), (18.1462, 6.74688, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(5, 'label', Point(11.0731, 7.84687, 0), color=Color.from_hex("#aaaaaa"), text='H = 5658 kN')

# step 6 — d) Global equilibrium
add(6, 'arrow', Line((-19, 1.2, 0), (-22.5193, 1.958, 0)), color=Color.from_hex("#3f9c20"), width=0.082858, head=(0.267926, 0.114912))
add(6, 'arrow', Line((19.9714, 2, 0), (4.08092, 5.42256, 0)), color=Color.from_hex("#3f9c20"), width=0.082858, head=(0.267926, 0.114912))
add(6, 'label', Point(-23.6193, 2.858, 0), color=Color.from_hex("#3f9c20"), text='A')
add(6, 'arrow', Line((-2, 1.2, 0), (1.51929, 1.958, 0)), color=Color.from_hex("#3f9c20"), width=0.082858, head=(0.267926, 0.114912))
add(6, 'arrow', Line((4.08092, -1.42256, 0), (19.9714, 2, 0)), color=Color.from_hex("#3f9c20"), width=0.082858, head=(0.267926, 0.114912))
add(6, 'label', Point(2.61929, 2.858, 0), color=Color.from_hex("#3f9c20"), text='B')

# step 7 — d) The governing force
add(7, 'label', Point(-10.5, -1.31539, 0), color=Color.from_hex("#ce4095"), text='N_max = 5788 kN')

# step 8 — e) Twice the load
add(8, 'label', Point(12.1462, -3.44687, 0), color=Color.from_hex("#aaaaaa"), text='× 2 load → same shape, every force doubled: 11576 kN')


if __name__ == "__main__":
    print("EX 3.3 — the Pavilhão de Portugal: finding the roof form —", len(ops), "operations")
