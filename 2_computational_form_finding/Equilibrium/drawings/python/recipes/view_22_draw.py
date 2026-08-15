"""Drawing 22 — Cantilevered fan bridge

Auto-generated from ops/view_22.json — the drawing as literal COMPAS
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


# step 0 — How to draw this scheme
add(0, 'label', Point(-40.4, 49.6, 0), text='Form Diagram')
add(0, 'label', Point(57.5, 49.55, 0), text='Force Diagram')
add(0, 'label', Point(58.6, 47.4, 0), text='1 unit :: 65 kN')

# step 1 — The deck and the mast
add(1, 'circle', Circle(12, frame=Frame((-25.8906, 30.4715, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#aaaaaa"), dash=1.3)
add(1, 'polyline', Polyline([(43.75, 0, 0), (50, 0, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.55)
add(1, 'polyline', Polyline([(-19.0714, 27.2368, 0), (-21.7959, 31.1278, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.55)
add(1, 'polyline', Polyline([(43.75, -13.0429, 0), (43.75, 42.9556, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.55)
add(1, 'polyline', Polyline([(31.25, -13.0429, 0), (31.25, 42.9556, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.55)
add(1, 'polyline', Polyline([(18.75, -13.0429, 0), (18.75, 42.9556, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.55)
add(1, 'polyline', Polyline([(6.25, -13.0429, 0), (6.25, 42.9556, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.55)
add(1, 'polyline', Polyline([(-2.72449, -13.0429, 0), (-2.72449, 42.9556, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.55)
add(1, 'polyline', Polyline([(-8.17346, -13.0429, 0), (-8.17346, 42.9556, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.55)
add(1, 'polyline', Polyline([(-13.6224, -13.0429, 0), (-13.6224, 42.9556, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.55)
add(1, 'polyline', Polyline([(-19.0714, -13.0429, 0), (-19.0714, 42.9556, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.55)
add(1, 'polyline', Polyline([(0, -13.0429, 0), (0, 42.9556, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.55)
add(1, 'segment', Line((0, 0, 0), (6.25, 0, 0)), color=Color.from_hex("#aaaaaa"), width=0.0792)
add(1, 'segment', Line((6.25, 0, 0), (18.75, 0, 0)), color=Color.from_hex("#aaaaaa"), width=0.0792)
add(1, 'segment', Line((18.75, 0, 0), (31.25, 0, 0)), color=Color.from_hex("#aaaaaa"), width=0.0792)
add(1, 'segment', Line((31.25, 0, 0), (43.75, 0, 0)), color=Color.from_hex("#aaaaaa"), width=0.0792)
add(1, 'segment', Line((0, 0, 0), (-2.72449, 3.89097, 0)), color=Color.from_hex("#aaaaaa"), width=0.0792)
add(1, 'segment', Line((-2.72449, 3.89097, 0), (-8.17346, 11.6729, 0)), color=Color.from_hex("#aaaaaa"), width=0.0792)
add(1, 'segment', Line((-8.17346, 11.6729, 0), (-13.6224, 19.4549, 0)), color=Color.from_hex("#aaaaaa"), width=0.0792)
add(1, 'segment', Line((-13.6224, 19.4549, 0), (-19.0714, 27.2368, 0)), color=Color.from_hex("#aaaaaa"), width=0.0792)
add(1, 'point', Point(0, 0, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(1, 'point', Point(-21.7959, 31.1278, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(1, 'point', Point(50, 0, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(1, 'point', Point(6.25, 0, 0), color=Color.from_hex("#ffffff"), width=0.48)
add(1, 'label', Point(7.05, 1, 0), text='J')
add(1, 'point', Point(18.75, 0, 0), color=Color.from_hex("#ffffff"), width=0.48)
add(1, 'label', Point(19.55, 1, 0), text='K')
add(1, 'point', Point(31.25, 0, 0), color=Color.from_hex("#ffffff"), width=0.48)
add(1, 'label', Point(32.05, 1, 0), text='L')
add(1, 'point', Point(43.75, 0, 0), color=Color.from_hex("#ffffff"), width=0.48)
add(1, 'label', Point(44.55, 1, 0), text='M')
add(1, 'point', Point(-2.72449, 3.89097, 0), color=Color.from_hex("#ffffff"), width=0.48)
add(1, 'label', Point(-1.57449, 4.64097, 0), text='N')
add(1, 'point', Point(-8.17346, 11.6729, 0), color=Color.from_hex("#ffffff"), width=0.48)
add(1, 'label', Point(-7.02346, 12.4229, 0), text='O')
add(1, 'point', Point(-13.6224, 19.4549, 0), color=Color.from_hex("#ffffff"), width=0.48)
add(1, 'label', Point(-12.4724, 20.2049, 0), text='P')
add(1, 'point', Point(-19.0714, 27.2368, 0), color=Color.from_hex("#ffffff"), width=0.48)
add(1, 'label', Point(-17.9214, 27.9868, 0), text='Q')
add(1, 'label', Point(-1.5, -1, 0), text='A')
add(1, 'label', Point(-22.4959, 32.3278, 0), text='H')
add(1, 'label', Point(51.1, 1, 0), text='B')

# step 2 — Four fan stays
add(2, 'segment', Line((-2.72449, 3.89097, 0), (6.25, 0, 0)), color=Color.from_hex("#aaaaaa"), width=0.0792)
add(2, 'segment', Line((-8.17346, 11.6729, 0), (18.75, 0, 0)), color=Color.from_hex("#aaaaaa"), width=0.0792)
add(2, 'segment', Line((-13.6224, 19.4549, 0), (31.25, 0, 0)), color=Color.from_hex("#aaaaaa"), width=0.0792)
add(2, 'segment', Line((-19.0714, 27.2368, 0), (43.75, 0, 0)), color=Color.from_hex("#aaaaaa"), width=0.0792)

# step 3 — The deck loads and the load line
add(3, 'arrow', Line((43.75, -2.07446, 0), (43.75, -7.07446, 0)), color=Color.from_hex("#3f9c20"), width=0.216, head=(1.152, 0.468))
add(3, 'label', Point(45.1, -4.82446, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(3, 'arrow', Line((60, 0, 0), (60, -3.07692, 0)), color=Color.from_hex("#3f9c20"), width=0.216, head=(1.152, 0.468))
add(3, 'label', Point(58.65, -1.53846, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(3, 'arrow', Line((31.25, -2.07446, 0), (31.25, -7.07446, 0)), color=Color.from_hex("#3f9c20"), width=0.216, head=(1.152, 0.468))
add(3, 'label', Point(32.6, -4.82446, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(3, 'arrow', Line((60, -3.07692, 0), (60, -6.15385, 0)), color=Color.from_hex("#3f9c20"), width=0.216, head=(1.152, 0.468))
add(3, 'label', Point(58.65, -4.61538, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(3, 'arrow', Line((18.75, -2.07446, 0), (18.75, -7.07446, 0)), color=Color.from_hex("#3f9c20"), width=0.216, head=(1.152, 0.468))
add(3, 'label', Point(20.1, -4.82446, 0), color=Color.from_hex("#3f9c20"), text='F₃')
add(3, 'arrow', Line((60, -6.15385, 0), (60, -9.23077, 0)), color=Color.from_hex("#3f9c20"), width=0.216, head=(1.152, 0.468))
add(3, 'label', Point(58.65, -7.69231, 0), color=Color.from_hex("#3f9c20"), text='F₃')
add(3, 'arrow', Line((6.25, -2.07446, 0), (6.25, -7.07446, 0)), color=Color.from_hex("#3f9c20"), width=0.216, head=(1.152, 0.468))
add(3, 'label', Point(7.6, -4.82446, 0), color=Color.from_hex("#3f9c20"), text='F₄')
add(3, 'arrow', Line((62.7972, -9.23077, 0), (62.7972, -12.3077, 0)), color=Color.from_hex("#3f9c20"), width=0.216, head=(1.152, 0.468))
add(3, 'label', Point(58.65, -10.7692, 0), color=Color.from_hex("#3f9c20"), text='F₄')
add(3, 'point', Point(60, 0, 0), color=Color.from_hex("#ffffff"), width=0.62)

# step 4 — Joint M — members 8 and 12
add(4, 'segment', Line((31.25, 0, 0), (43.75, 0, 0)), color=Color.from_hex("#1a1eb2"), width=0.2448)
add(4, 'segment', Line((67.0969, -3.07692, 0), (60, -3.07692, 0)), color=Color.from_hex("#1a1eb2"), width=0.144)
add(4, 'label', Point(37.5, -1.15, 0), color=Color.from_hex("#1a1eb2"), text='8')
add(4, 'label', Point(63.5484, -4.07692, 0), color=Color.from_hex("#1a1eb2"), text='8')
add(4, 'segment', Line((43.75, 0, 0), (-19.0714, 27.2368, 0)), color=Color.from_hex("#ce4095"), width=0.2448)
add(4, 'segment', Line((67.0969, -3.07692, 0), (60, 0, 0)), color=Color.from_hex("#ce4095"), width=0.144)
add(4, 'label', Point(12.7769, 14.6276, 0), color=Color.from_hex("#ce4095"), text='12')
add(4, 'label', Point(63.9263, -0.666856, 0), color=Color.from_hex("#ce4095"), text='12')
add(4, 'point', Point(67.0969, -3.07692, 0), color=Color.from_hex("#ffffff"), width=0.48)
add(4, 'label', Point(68.3469, -2.92692, 0), text='R')

# step 5 — Joint L — members 7 and 11
add(5, 'segment', Line((18.75, 0, 0), (31.25, 0, 0)), color=Color.from_hex("#1a1eb2"), width=0.2448)
add(5, 'segment', Line((74.1938, -6.15385, 0), (60, -6.15385, 0)), color=Color.from_hex("#1a1eb2"), width=0.144)
add(5, 'label', Point(25, -1.15, 0), color=Color.from_hex("#1a1eb2"), text='7')
add(5, 'label', Point(67.0969, -7.15385, 0), color=Color.from_hex("#1a1eb2"), text='7')
add(5, 'segment', Line((31.25, 0, 0), (-13.6224, 19.4549, 0)), color=Color.from_hex("#ce4095"), width=0.2448)
add(5, 'segment', Line((74.1938, -6.15385, 0), (67.0969, -3.07692, 0)), color=Color.from_hex("#ce4095"), width=0.144)
add(5, 'label', Point(9.25134, 10.7367, 0), color=Color.from_hex("#ce4095"), text='11')
add(5, 'label', Point(71.0232, -3.74378, 0), color=Color.from_hex("#ce4095"), text='11')
add(5, 'point', Point(74.1938, -6.15385, 0), color=Color.from_hex("#ffffff"), width=0.48)
add(5, 'label', Point(75.4438, -6.00385, 0), text='S')

# step 6 — Joint K — members 6 and 10
add(6, 'segment', Line((6.25, 0, 0), (18.75, 0, 0)), color=Color.from_hex("#1a1eb2"), width=0.2448)
add(6, 'segment', Line((81.2907, -9.23077, 0), (60, -9.23077, 0)), color=Color.from_hex("#1a1eb2"), width=0.144)
add(6, 'label', Point(12.5, -1.15, 0), color=Color.from_hex("#1a1eb2"), text='6')
add(6, 'label', Point(70.6453, -10.2308, 0), color=Color.from_hex("#1a1eb2"), text='6')
add(6, 'segment', Line((18.75, 0, 0), (-8.17346, 11.6729, 0)), color=Color.from_hex("#ce4095"), width=0.2448)
add(6, 'segment', Line((81.2907, -9.23077, 0), (74.1938, -6.15385, 0)), color=Color.from_hex("#ce4095"), width=0.144)
add(6, 'label', Point(5.72583, 6.84569, 0), color=Color.from_hex("#ce4095"), text='10')
add(6, 'label', Point(78.1201, -6.8207, 0), color=Color.from_hex("#ce4095"), text='10')
add(6, 'point', Point(81.2907, -9.23077, 0), color=Color.from_hex("#ffffff"), width=0.48)
add(6, 'label', Point(82.5407, -9.08077, 0), text='T')

# step 7 — Joint J — members 5 and 9
add(7, 'segment', Line((0, 0, 0), (6.25, 0, 0)), color=Color.from_hex("#1a1eb2"), width=0.2448)
add(7, 'segment', Line((88.3876, -12.3077, 0), (60, -12.3077, 0)), color=Color.from_hex("#1a1eb2"), width=0.144)
add(7, 'label', Point(3.125, -1.15, 0), color=Color.from_hex("#1a1eb2"), text='5')
add(7, 'label', Point(74.1938, -13.3077, 0), color=Color.from_hex("#1a1eb2"), text='5')
add(7, 'segment', Line((6.25, 0, 0), (-2.72449, 3.89097, 0)), color=Color.from_hex("#ce4095"), width=0.2448)
add(7, 'segment', Line((88.3876, -12.3077, 0), (81.2907, -9.23077, 0)), color=Color.from_hex("#ce4095"), width=0.144)
add(7, 'label', Point(2.20032, 2.95471, 0), color=Color.from_hex("#ce4095"), text='9')
add(7, 'label', Point(85.217, -9.89762, 0), color=Color.from_hex("#ce4095"), text='9')
add(7, 'point', Point(88.3876, -12.3077, 0), color=Color.from_hex("#ffffff"), width=0.48)
add(7, 'label', Point(89.7376, -12.5077, 0), text='U')

# step 8 — Parallels to the mast
add(8, 'polyline', Polyline([(88.3876, -12.3077, 0), (52.2143, 39.3531, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.7, until=9)
add(8, 'polyline', Polyline([(81.2907, -9.23077, 0), (52.2143, 32.2946, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.7, until=9)
add(8, 'polyline', Polyline([(74.1938, -6.15385, 0), (52.2143, 25.2361, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.7, until=10)
add(8, 'polyline', Polyline([(67.0969, -3.07692, 0), (52.2143, 18.1776, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.7, until=10)
add(8, 'polyline', Polyline([(60, 0, 0), (60, 39.3531, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.7, until=12)
add(8, 'point', Point(60, 7.05849, 0), color=Color.from_hex("#ffffff"), width=0.48)
add(8, 'label', Point(61.15, 7.60849, 0), text='V')
add(8, 'point', Point(60, 14.117, 0), color=Color.from_hex("#ffffff"), width=0.48)
add(8, 'label', Point(61.15, 14.667, 0), text='W')
add(8, 'point', Point(60, 21.1755, 0), color=Color.from_hex("#ffffff"), width=0.48)
add(8, 'label', Point(61.15, 21.7255, 0), text='Z')
add(8, 'point', Point(60, 28.234, 0), color=Color.from_hex("#ffffff"), width=0.48)
add(8, 'label', Point(61.3, 28.834, 0), text='A₁')

# step 9 — Joint N — mast pieces 4 and 3
add(9, 'arrow', Line((-2.72449, -2.07446, 0), (-2.72449, -7.07446, 0)), color=Color.from_hex("#3f9c20"), width=0.216, head=(1.152, 0.468))
add(9, 'label', Point(-4.07449, -4.82446, 0), color=Color.from_hex("#3f9c20"), text='F₅')
add(9, 'arrow', Line((60, 28.234, 0), (60, 21.1755, 0)), color=Color.from_hex("#3f9c20"), width=0.216, head=(1.152, 0.468))
add(9, 'label', Point(58.65, 24.7047, 0), color=Color.from_hex("#3f9c20"), text='F₅')
add(9, 'segment', Line((-2.72449, 3.89097, 0), (-8.17346, 11.6729, 0)), color=Color.from_hex("#1a1eb2"), width=0.2448)
add(9, 'segment', Line((60, 21.1755, 0), (81.2907, -9.23077, 0)), color=Color.from_hex("#1a1eb2"), width=0.144)
add(9, 'label', Point(-6.35004, 7.15101, 0), color=Color.from_hex("#1a1eb2"), text='3')
add(9, 'label', Point(71.4645, 6.54593, 0), color=Color.from_hex("#1a1eb2"), text='3')
add(9, 'segment', Line((0, 0, 0), (-2.72449, 3.89097, 0)), color=Color.from_hex("#1a1eb2"), width=0.2448)
add(9, 'segment', Line((60, 28.234, 0), (88.3876, -12.3077, 0)), color=Color.from_hex("#1a1eb2"), width=0.144)
add(9, 'label', Point(-2.26331, 1.31455, 0), color=Color.from_hex("#1a1eb2"), text='4')
add(9, 'label', Point(75.0129, 8.53671, 0), color=Color.from_hex("#1a1eb2"), text='4')

# step 10 — Joints O and P — pieces 2 and 1
add(10, 'arrow', Line((-8.17346, -2.07446, 0), (-8.17346, -7.07446, 0)), color=Color.from_hex("#3f9c20"), width=0.216, head=(1.152, 0.468))
add(10, 'label', Point(-9.52346, -4.82446, 0), color=Color.from_hex("#3f9c20"), text='F₆')
add(10, 'arrow', Line((60, 21.1755, 0), (60, 14.117, 0)), color=Color.from_hex("#3f9c20"), width=0.216, head=(1.152, 0.468))
add(10, 'label', Point(58.65, 17.6462, 0), color=Color.from_hex("#3f9c20"), text='F₆')
add(10, 'arrow', Line((-13.6224, -2.07446, 0), (-13.6224, -7.07446, 0)), color=Color.from_hex("#3f9c20"), width=0.216, head=(1.152, 0.468))
add(10, 'label', Point(-14.9724, -4.82446, 0), color=Color.from_hex("#3f9c20"), text='F₇')
add(10, 'arrow', Line((60, 14.117, 0), (60, 7.05849, 0)), color=Color.from_hex("#3f9c20"), width=0.216, head=(1.152, 0.468))
add(10, 'label', Point(58.65, 10.5877, 0), color=Color.from_hex("#3f9c20"), text='F₇')
add(10, 'segment', Line((-13.6224, 19.4549, 0), (-19.0714, 27.2368, 0)), color=Color.from_hex("#1a1eb2"), width=0.2448)
add(10, 'segment', Line((60, 7.05849, 0), (67.0969, -3.07692, 0)), color=Color.from_hex("#1a1eb2"), width=0.144)
add(10, 'label', Point(-17.248, 22.7149, 0), color=Color.from_hex("#1a1eb2"), text='1')
add(10, 'label', Point(64.3676, 2.56436, 0), color=Color.from_hex("#1a1eb2"), text='1')
add(10, 'segment', Line((-8.17346, 11.6729, 0), (-13.6224, 19.4549, 0)), color=Color.from_hex("#1a1eb2"), width=0.2448)
add(10, 'segment', Line((60, 14.117, 0), (74.1938, -6.15385, 0)), color=Color.from_hex("#1a1eb2"), width=0.144)
add(10, 'label', Point(-11.799, 14.933, 0), color=Color.from_hex("#1a1eb2"), text='2')
add(10, 'label', Point(67.916, 4.55514, 0), color=Color.from_hex("#1a1eb2"), text='2')

# step 11 — Joint Q closes the polygon
add(11, 'arrow', Line((-19.0714, -2.07446, 0), (-19.0714, -7.07446, 0)), color=Color.from_hex("#3f9c20"), width=0.216, head=(1.152, 0.468))
add(11, 'label', Point(-20.4214, -4.82446, 0), color=Color.from_hex("#3f9c20"), text='F₈')
add(11, 'arrow', Line((60, 7.05849, 0), (60, 0, 0)), color=Color.from_hex("#3f9c20"), width=0.216, head=(1.152, 0.468))
add(11, 'label', Point(58.65, 3.52924, 0), color=Color.from_hex("#3f9c20"), text='F₈')

# step 12 — The reaction A
add(12, 'polyline', Polyline([(60, -12.3077, 0), (56, -12.3077, 0)]), color=Color.from_hex("#006400"), dash=0.55)
add(12, 'polyline', Polyline([(60, 28.234, 0), (56, 28.234, 0)]), color=Color.from_hex("#006400"), dash=0.55)
add(12, 'arrow', Line((56, -12.3077, 0), (56, 28.234, 0)), color=Color.from_hex("#3f9c20"), width=0.3024, head=(1.368, 0.576))
add(12, 'arrow', Line((0, -9.57446, 0), (0, -2.07446, 0)), color=Color.from_hex("#3f9c20"), width=0.3024, head=(1.368, 0.576))
add(12, 'label', Point(1.3, -5.82446, 0), color=Color.from_hex("#3f9c20"), text='A')
add(12, 'label', Point(54.95, 7.96313, 0), color=Color.from_hex("#3f9c20"), text='A')

# step 13 — Compression and tension
add(13, 'polygon', Polygon([(-13.5211, 19.5258, 0), (-13.7238, 19.3839, 0), (-19.1728, 27.1658, 0), (-18.9701, 27.3078, 0)]), color=Color.from_hex("#1a1eb2"))
add(13, 'polygon', Polygon([(-7.97076, 11.8149, 0), (-8.37617, 11.531, 0), (-13.8251, 19.3129, 0), (-13.4197, 19.5968, 0)]), color=Color.from_hex("#1a1eb2"))
add(13, 'polygon', Polygon([(-2.42043, 4.10388, 0), (-3.02855, 3.67807, 0), (-8.47753, 11.46, 0), (-7.8694, 11.8858, 0)]), color=Color.from_hex("#1a1eb2"))
add(13, 'polygon', Polygon([(0.405416, 0.283876, 0), (-0.405416, -0.283876, 0), (-3.1299, 3.6071, 0), (-2.31907, 4.17485, 0)]), color=Color.from_hex("#1a1eb2"))
add(13, 'polygon', Polygon([(0, -0.283876, 0), (0, 0.283876, 0), (6.25, 0.283876, 0), (6.25, -0.283876, 0)]), color=Color.from_hex("#1a1eb2"))
add(13, 'polygon', Polygon([(6.25, -0.212907, 0), (6.25, 0.212907, 0), (18.75, 0.212907, 0), (18.75, -0.212907, 0)]), color=Color.from_hex("#1a1eb2"))
add(13, 'polygon', Polygon([(18.75, -0.141938, 0), (18.75, 0.141938, 0), (31.25, 0.141938, 0), (31.25, -0.141938, 0)]), color=Color.from_hex("#1a1eb2"))
add(13, 'polygon', Polygon([(31.25, -0.070969, 0), (31.25, 0.070969, 0), (43.75, 0.070969, 0), (43.75, -0.070969, 0)]), color=Color.from_hex("#1a1eb2"))
add(13, 'polygon', Polygon([(6.28077, 0.070969, 0), (6.21923, -0.070969, 0), (-2.75526, 3.82, 0), (-2.69372, 3.96194, 0)]), color=Color.from_hex("#ce4095"))
add(13, 'polygon', Polygon([(18.7808, 0.070969, 0), (18.7192, -0.070969, 0), (-8.20423, 11.6019, 0), (-8.14269, 11.7439, 0)]), color=Color.from_hex("#ce4095"))
add(13, 'polygon', Polygon([(31.2808, 0.070969, 0), (31.2192, -0.070969, 0), (-13.6532, 19.3839, 0), (-13.5917, 19.5258, 0)]), color=Color.from_hex("#ce4095"))
add(13, 'polygon', Polygon([(43.7808, 0.070969, 0), (43.7192, -0.070969, 0), (-19.1022, 27.1658, 0), (-19.0406, 27.3078, 0)]), color=Color.from_hex("#ce4095"))
add(13, 'label', Point(83, 38.6, 0), color=Color.from_hex("#3f9c20"), text='F₅ = F₆ = F₇ = F₈ = 458.8 kN')
add(13, 'label', Point(83, 36.2, 0), color=Color.from_hex("#3f9c20"), text='A = ΣFᵢ = 2635.2 kN')


if __name__ == "__main__":
    print("Drawing 22 — Cantilevered fan bridge —", len(ops), "operations")
