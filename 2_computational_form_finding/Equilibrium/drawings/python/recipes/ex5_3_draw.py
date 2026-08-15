"""EX 5 Creative — which way does the support push?

Auto-generated from ops/ex5_3.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-2, -8.9, 0), text='Lageplan 1:100 — form diagram (qualitative, no force diagram)')

# step 1 — What is given
add(1, 'segment', Line((-18.62, 1, 0), (0.82, 1, 0)), color=Color.from_hex("#aaaaaa"), width=0.04968)
add(1, 'point', Point(-17, 1, 0), color=Color.from_hex("#ffffff"), width=0.3404)
add(1, 'label', Point(-18.6, -0.2, 0), text='A')
add(1, 'segment', Line((-18.08, 0.5, 0), (-18.7518, 1.17175, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'segment', Line((-17.36, 0.5, 0), (-18.0318, 1.17175, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'segment', Line((-16.64, 0.5, 0), (-17.3118, 1.17175, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'segment', Line((-15.92, 0.5, 0), (-16.5918, 1.17175, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'segment', Line((-15.2, 0.5, 0), (-15.8718, 1.17175, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'point', Point(-0.8, 1, 0), color=Color.from_hex("#ffffff"), width=0.3404)
add(1, 'label', Point(0.8, -0.2, 0), text='B')
add(1, 'segment', Line((-1.88, -0.5, 0), (-2.55175, 0.171751, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'segment', Line((-1.16, -0.5, 0), (-1.83175, 0.171751, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'segment', Line((-0.44, -0.5, 0), (-1.11175, 0.171751, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'segment', Line((0.28, -0.5, 0), (-0.391751, 0.171751, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'segment', Line((1, -0.5, 0), (0.328249, 0.171751, 0)), color=Color.from_hex("#aaaaaa"), width=0.034776)
add(1, 'segment', Line((-2.6, -0.2, 0), (1, -0.2, 0)), color=Color.from_hex("#aaaaaa"), width=0.04968)
add(1, 'polyline', Polyline([(-8.9, 9.7, 0), (-8.9, -3, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2714)
add(1, 'arrow', Line((-8.9, 8.5, 0), (-8.9, 5.3, 0)), color=Color.from_hex("#3f9c20"), width=0.125856, head=(0.433872, 0.167587))
add(1, 'label', Point(-6.7, 6.9, 0), color=Color.from_hex("#3f9c20"), text='F_d')

# step 2 — Where does the load sit?
add(2, 'polyline', Polyline([(-8.9, 11.1, 0), (-8.9, -3.2, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2714)
add(2, 'arrow', Line((-8.9, 10.9, 0), (-8.9, 7.7, 0)), color=Color.from_hex("#3f9c20"), width=0.144734, dash=0.43424, head=(0.433872, 0.167587))
add(2, 'label', Point(-6.9, 9.3, 0), color=Color.from_hex("#3f9c20"), text='R')

# step 3 — The reactions
add(3, 'arrow', Line((-17, -2.6, 0), (-17, 1, 0)), color=Color.from_hex("#3f9c20"), width=0.125856, head=(0.433872, 0.167587))
add(3, 'label', Point(-20.4, -0.8, 0), color=Color.from_hex("#3f9c20"), text='A = 0.50 F')
add(3, 'arrow', Line((-0.8, -2.6, 0), (-0.8, 1, 0)), color=Color.from_hex("#3f9c20"), width=0.125856, head=(0.433872, 0.167587))
add(3, 'label', Point(2.6, -0.8, 0), color=Color.from_hex("#3f9c20"), text='B = 0.50 F')

# step 4 — The force flow
add(4, 'segment', Line((-17, 1, 0), (-16.73, 1.072, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-16.73, 1.072, 0), (-16.46, 1.144, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-16.46, 1.144, 0), (-16.19, 1.216, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-16.19, 1.216, 0), (-15.92, 1.288, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-15.92, 1.288, 0), (-15.65, 1.36, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-15.65, 1.36, 0), (-15.38, 1.432, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-15.38, 1.432, 0), (-15.11, 1.504, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-15.11, 1.504, 0), (-14.84, 1.576, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-14.84, 1.576, 0), (-14.57, 1.648, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-14.57, 1.648, 0), (-14.3, 1.72, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-14.3, 1.72, 0), (-14.03, 1.792, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-14.03, 1.792, 0), (-13.76, 1.864, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-13.76, 1.864, 0), (-13.49, 1.936, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-13.49, 1.936, 0), (-13.22, 2.008, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-13.22, 2.008, 0), (-12.95, 2.08, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-12.95, 2.08, 0), (-12.68, 2.152, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-12.68, 2.152, 0), (-12.41, 2.224, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-12.41, 2.224, 0), (-12.14, 2.296, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-12.14, 2.296, 0), (-11.87, 2.368, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-11.87, 2.368, 0), (-11.6, 2.44, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-11.6, 2.44, 0), (-11.33, 2.512, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-11.33, 2.512, 0), (-11.06, 2.584, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-11.06, 2.584, 0), (-10.79, 2.656, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-10.79, 2.656, 0), (-10.52, 2.728, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-10.52, 2.728, 0), (-10.25, 2.8, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-10.25, 2.8, 0), (-9.98, 2.872, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-9.98, 2.872, 0), (-9.71, 2.944, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-9.71, 2.944, 0), (-9.44, 3.016, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-9.44, 3.016, 0), (-9.17, 3.088, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-9.17, 3.088, 0), (-8.9, 3.16, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-8.9, 3.16, 0), (-8.63, 3.088, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-8.63, 3.088, 0), (-8.36, 3.016, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-8.36, 3.016, 0), (-8.09, 2.944, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-8.09, 2.944, 0), (-7.82, 2.872, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-7.82, 2.872, 0), (-7.55, 2.8, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-7.55, 2.8, 0), (-7.28, 2.728, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-7.28, 2.728, 0), (-7.01, 2.656, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-7.01, 2.656, 0), (-6.74, 2.584, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-6.74, 2.584, 0), (-6.47, 2.512, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-6.47, 2.512, 0), (-6.2, 2.44, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-6.2, 2.44, 0), (-5.93, 2.368, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-5.93, 2.368, 0), (-5.66, 2.296, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-5.66, 2.296, 0), (-5.39, 2.224, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-5.39, 2.224, 0), (-5.12, 2.152, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-5.12, 2.152, 0), (-4.85, 2.08, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-4.85, 2.08, 0), (-4.58, 2.008, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-4.58, 2.008, 0), (-4.31, 1.936, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-4.31, 1.936, 0), (-4.04, 1.864, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-4.04, 1.864, 0), (-3.77, 1.792, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-3.77, 1.792, 0), (-3.5, 1.72, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-3.5, 1.72, 0), (-3.23, 1.648, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-3.23, 1.648, 0), (-2.96, 1.576, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-2.96, 1.576, 0), (-2.69, 1.504, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-2.69, 1.504, 0), (-2.42, 1.432, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-2.42, 1.432, 0), (-2.15, 1.36, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-2.15, 1.36, 0), (-1.88, 1.288, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-1.88, 1.288, 0), (-1.61, 1.216, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-1.61, 1.216, 0), (-1.34, 1.144, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-1.34, 1.144, 0), (-1.07, 1.072, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-1.07, 1.072, 0), (-0.8, 1, 0)), color=Color.from_hex("#1a1eb2"), width=0.104659)
add(4, 'segment', Line((-17, 1, 0), (-0.8, 1, 0)), color=Color.from_hex("#ce4095"), width=0.104659)
add(4, 'label', Point(-8.9, 4.86, 0), color=Color.from_hex("#1a1eb2"), text='thrust line — compression')
add(4, 'label', Point(-8.9, -0.9, 0), color=Color.from_hex("#ce4095"), text='tie — tension')


if __name__ == "__main__":
    print("EX 5 Creative — which way does the support push? —", len(ops), "operations")
