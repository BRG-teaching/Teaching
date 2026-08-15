"""EX 4.2 — what the middle support of two arches feels

Auto-generated from ops/ex4_2.json — the drawing as literal COMPAS
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
add(0, 'label', Point(3, -16.4, 0), text='Lageplan 1:200 — form diagram')
add(0, 'label', Point(7, -14.4, 0), text='Kräfteplan — force diagram')
add(0, 'label', Point(7, -15.8, 0), text='to scale · 1 unit ≙ 7 kN  (sheet: 1 cm ≙ 10 kN)')

# step 1 — What is given
add(1, 'segment', Line((-22, -3, 0), (-0.16, -3, 0)), color=Color.from_hex("#aaaaaa"), width=0.083727)
add(1, 'point', Point(-19, -3, 0), color=Color.from_hex("#ffffff"), width=0.3404)
add(1, 'label', Point(-19, -5.2, 0), text='A')
add(1, 'segment', Line((-20.4, -3.4, 0), (-20.9, -4.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'segment', Line((-19.7, -3.4, 0), (-20.2, -4.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'segment', Line((-19, -3.4, 0), (-19.5, -4.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'segment', Line((-18.3, -3.4, 0), (-18.8, -4.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'segment', Line((-17.6, -3.4, 0), (-18.1, -4.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'polyline', Polyline([(-19, 4.2, 0), (-19, -4.4, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2714)
add(1, 'point', Point(-11.08, -3, 0), color=Color.from_hex("#ffffff"), width=0.3404)
add(1, 'label', Point(-11.08, -5.2, 0), text='B')
add(1, 'segment', Line((-12.48, -3.4, 0), (-12.98, -4.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'segment', Line((-11.78, -3.4, 0), (-12.28, -4.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'segment', Line((-11.08, -3.4, 0), (-11.58, -4.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'segment', Line((-10.38, -3.4, 0), (-10.88, -4.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'segment', Line((-9.68, -3.4, 0), (-10.18, -4.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'polyline', Polyline([(-11.08, 4.2, 0), (-11.08, -4.4, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2714)
add(1, 'point', Point(-3.16, -3, 0), color=Color.from_hex("#ffffff"), width=0.3404)
add(1, 'label', Point(-3.16, -5.2, 0), text='C')
add(1, 'segment', Line((-4.56, -3.4, 0), (-5.06, -4.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'segment', Line((-3.86, -3.4, 0), (-4.36, -4.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'segment', Line((-3.16, -3.4, 0), (-3.66, -4.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'segment', Line((-2.46, -3.4, 0), (-2.96, -4.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'segment', Line((-1.76, -3.4, 0), (-2.26, -4.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'polyline', Polyline([(-3.16, 4.2, 0), (-3.16, -4.4, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2714)
add(1, 'segment', Line((-19, 4, 0), (-3.16, 4, 0)), color=Color.from_hex("#3f9c20"), width=0.04968)
add(1, 'label', Point(-22.6, 4, 0), color=Color.from_hex("#3f9c20"), text='g_d = 4 kN/m')

# step 2 — The load line
add(2, 'arrow', Line((5, 7, 0), (5, 0.142857, 0)), color=Color.from_hex("#3f9c20"), width=0.125856, head=(0.433872, 0.167587))
add(2, 'label', Point(2.4, 3.57143, 0), color=Color.from_hex("#3f9c20"), text='48')
add(2, 'arrow', Line((5, 0.142857, 0), (5, -6.71429, 0)), color=Color.from_hex("#3f9c20"), width=0.125856, head=(0.433872, 0.167587))
add(2, 'label', Point(2.4, -3.28571, 0), color=Color.from_hex("#3f9c20"), text='48')

# step 3 — Each arch has its own pole
add(3, 'point', Point(8.42857, 3.57143, 0), color=Color.from_hex("#ffffff"), width=0.27232)
add(3, 'label', Point(9.82857, 4.27143, 0), text='o1')
add(3, 'segment', Line((5, 3.57143, 0), (8.42857, 3.57143, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(3, 'label', Point(6.71429, 4.87143, 0), color=Color.from_hex("#aaaaaa"), text='H1 = 24.0')
add(3, 'polygon', Polygon([(-19.1882, -2.80191, 0), (-18.7779, -2.4306, 0), (-18.3626, -2.094, 0), (-17.9472, -1.797, 0), (-17.5319, -1.5396, 0), (-17.1166, -1.3218, 0), (-16.7013, -1.1436, 0), (-16.286, -1.005, 0), (-15.8706, -0.906, 0), (-15.4553, -0.8466, 0), (-15.04, -0.8268, 0), (-14.6247, -0.8466, 0), (-14.2094, -0.906, 0), (-13.794, -1.005, 0), (-13.3787, -1.1436, 0), (-12.9634, -1.3218, 0), (-12.5481, -1.5396, 0), (-12.1328, -1.797, 0), (-11.7174, -2.094, 0), (-11.3021, -2.4306, 0), (-10.8918, -2.80191, 0), (-11.2682, -3.19809, 0), (-11.6499, -2.817, 0), (-12.0266, -2.4804, 0), (-12.4032, -2.1834, 0), (-12.7799, -1.926, 0), (-13.1566, -1.7082, 0), (-13.5333, -1.53, 0), (-13.91, -1.3914, 0), (-14.2866, -1.2924, 0), (-14.6633, -1.233, 0), (-15.04, -1.2132, 0), (-15.4167, -1.233, 0), (-15.7934, -1.2924, 0), (-16.17, -1.3914, 0), (-16.5467, -1.53, 0), (-16.9234, -1.7082, 0), (-17.3001, -1.926, 0), (-17.6768, -2.1834, 0), (-18.0534, -2.4804, 0), (-18.4301, -2.817, 0), (-18.8118, -3.19809, 0)]), color=Color.from_hex("#bdbfe8"))
add(3, 'segment', Line((-19, -3, 0), (-18.604, -2.6238, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-18.604, -2.6238, 0), (-18.208, -2.2872, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-18.208, -2.2872, 0), (-17.812, -1.9902, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-17.812, -1.9902, 0), (-17.416, -1.7328, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-17.416, -1.7328, 0), (-17.02, -1.515, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-17.02, -1.515, 0), (-16.624, -1.3368, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-16.624, -1.3368, 0), (-16.228, -1.1982, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-16.228, -1.1982, 0), (-15.832, -1.0992, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-15.832, -1.0992, 0), (-15.436, -1.0398, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-15.436, -1.0398, 0), (-15.04, -1.02, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-15.04, -1.02, 0), (-14.644, -1.0398, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-14.644, -1.0398, 0), (-14.248, -1.0992, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-14.248, -1.0992, 0), (-13.852, -1.1982, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-13.852, -1.1982, 0), (-13.456, -1.3368, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-13.456, -1.3368, 0), (-13.06, -1.515, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-13.06, -1.515, 0), (-12.664, -1.7328, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-12.664, -1.7328, 0), (-12.268, -1.9902, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-12.268, -1.9902, 0), (-11.872, -2.2872, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-11.872, -2.2872, 0), (-11.476, -2.6238, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-11.476, -2.6238, 0), (-11.08, -3, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-15.04, -3, 0), (-15.04, -1.02, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(3, 'label', Point(-12.04, -2.01, 0), color=Color.from_hex("#aaaaaa"), text='f1 = 3.00 m')
add(3, 'point', Point(8.42857, -3.28571, 0), color=Color.from_hex("#ffffff"), width=0.27232)
add(3, 'label', Point(9.82857, -2.58571, 0), text='o2')
add(3, 'segment', Line((5, -3.28571, 0), (8.42857, -3.28571, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(3, 'label', Point(6.71429, -4.58571, 0), color=Color.from_hex("#aaaaaa"), text='H2 = 24.0')
add(3, 'polygon', Polygon([(-11.2682, -2.80191, 0), (-10.8579, -2.4306, 0), (-10.4426, -2.094, 0), (-10.0272, -1.797, 0), (-9.61192, -1.5396, 0), (-9.1966, -1.3218, 0), (-8.78128, -1.1436, 0), (-8.36596, -1.005, 0), (-7.95064, -0.906, 0), (-7.53532, -0.8466, 0), (-7.12, -0.8268, 0), (-6.70468, -0.8466, 0), (-6.28936, -0.906, 0), (-5.87404, -1.005, 0), (-5.45872, -1.1436, 0), (-5.0434, -1.3218, 0), (-4.62808, -1.5396, 0), (-4.21276, -1.797, 0), (-3.79744, -2.094, 0), (-3.38212, -2.4306, 0), (-2.97182, -2.80191, 0), (-3.34818, -3.19809, 0), (-3.72988, -2.817, 0), (-4.10656, -2.4804, 0), (-4.48324, -2.1834, 0), (-4.85992, -1.926, 0), (-5.2366, -1.7082, 0), (-5.61328, -1.53, 0), (-5.98996, -1.3914, 0), (-6.36664, -1.2924, 0), (-6.74332, -1.233, 0), (-7.12, -1.2132, 0), (-7.49668, -1.233, 0), (-7.87336, -1.2924, 0), (-8.25004, -1.3914, 0), (-8.62672, -1.53, 0), (-9.0034, -1.7082, 0), (-9.38008, -1.926, 0), (-9.75676, -2.1834, 0), (-10.1334, -2.4804, 0), (-10.5101, -2.817, 0), (-10.8918, -3.19809, 0)]), color=Color.from_hex("#bdbfe8"))
add(3, 'segment', Line((-11.08, -3, 0), (-10.684, -2.6238, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-10.684, -2.6238, 0), (-10.288, -2.2872, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-10.288, -2.2872, 0), (-9.892, -1.9902, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-9.892, -1.9902, 0), (-9.496, -1.7328, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-9.496, -1.7328, 0), (-9.1, -1.515, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-9.1, -1.515, 0), (-8.704, -1.3368, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-8.704, -1.3368, 0), (-8.308, -1.1982, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-8.308, -1.1982, 0), (-7.912, -1.0992, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-7.912, -1.0992, 0), (-7.516, -1.0398, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-7.516, -1.0398, 0), (-7.12, -1.02, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-7.12, -1.02, 0), (-6.724, -1.0398, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-6.724, -1.0398, 0), (-6.328, -1.0992, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-6.328, -1.0992, 0), (-5.932, -1.1982, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-5.932, -1.1982, 0), (-5.536, -1.3368, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-5.536, -1.3368, 0), (-5.14, -1.515, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-5.14, -1.515, 0), (-4.744, -1.7328, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-4.744, -1.7328, 0), (-4.348, -1.9902, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-4.348, -1.9902, 0), (-3.952, -2.2872, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-3.952, -2.2872, 0), (-3.556, -2.6238, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-3.556, -2.6238, 0), (-3.16, -3, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(3, 'segment', Line((-7.12, -3, 0), (-7.12, -1.02, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(3, 'label', Point(-4.12, -2.01, 0), color=Color.from_hex("#aaaaaa"), text='f2 = 3.00 m')

# step 4 — The outer supports
add(4, 'segment', Line((5, 0.142857, 0), (8.42857, 3.57143, 0)), color=Color.from_hex("#3f9c20"), width=0.049018)
add(4, 'segment', Line((8.42857, -3.28571, 0), (5, 0.142857, 0)), color=Color.from_hex("#3f9c20"), width=0.049018)
add(4, 'arrow', Line((-19, -3, 0), (-16.7373, -0.737258, 0)), color=Color.from_hex("#3f9c20"), width=0.090749, head=(0.293443, 0.125856))
add(4, 'label', Point(-14.1373, -0.337258, 0), color=Color.from_hex("#3f9c20"), text='A = 33.9')
add(4, 'arrow', Line((-3.16, -3, 0), (-5.42274, -0.737258, 0)), color=Color.from_hex("#3f9c20"), width=0.090749, head=(0.293443, 0.125856))
add(4, 'label', Point(-8.02274, -0.337258, 0), color=Color.from_hex("#3f9c20"), text='C = 33.9')

# step 5 — The middle support
add(5, 'segment', Line((8.42857, 3.57143, 0), (5, 7, 0)), color=Color.from_hex("#3f9c20"), width=0.049018)
add(5, 'segment', Line((5, -6.71429, 0), (8.42857, -3.28571, 0)), color=Color.from_hex("#3f9c20"), width=0.049018)
add(5, 'arrow', Line((-11.08, -3, 0), (-11.08, 0.2, 0)), color=Color.from_hex("#3f9c20"), width=0.090749, head=(0.293443, 0.125856))
add(5, 'label', Point(-8.48, 0.6, 0), color=Color.from_hex("#3f9c20"), text='B = 48.0')
add(5, 'segment', Line((14.9286, 3.14286, 0), (14.9286, 3.14286, 0)), color=Color.from_hex("#3f9c20"), width=0.104659)
add(5, 'arrow', Line((14.9286, 3.14286, 0), (14.9286, -3.71429, 0)), color=Color.from_hex("#3f9c20"), width=0.090749, head=(0.293443, 0.125856))
add(5, 'label', Point(17.7286, -0.285714, 0), color=Color.from_hex("#3f9c20"), text='B = 48.00')


if __name__ == "__main__":
    print("EX 4.2 — what the middle support of two arches feels —", len(ops), "operations")
