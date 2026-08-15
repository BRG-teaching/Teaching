"""EX 6.4 — a truss that spans and cantilevers at once

Auto-generated from ops/ex6_4.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-16, -13.5, 0), text='Form diagram 1:100')
add(0, 'label', Point(15, 15.4, 0), text='Force diagram — one polygon per joint')
add(0, 'label', Point(15, 14, 0), text='1 unit ≙ 16 kN  (sheet: 1 cm ≙ 10 kN)')

# step 1 — The truss
add(1, 'polygon', Polygon([(-24, -6.16928, 0), (-24, -5.83072, 0), (-19, -5.83072, 0), (-19, -6.16928, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-24, -6, 0), (-19, -6, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-19, -6.08464, 0), (-19, -5.91536, 0), (-14, -5.91536, 0), (-14, -6.08464, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-19, -6, 0), (-14, -6, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-14, -6.08464, 0), (-14, -5.91536, 0), (-9, -5.91536, 0), (-9, -6.08464, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-14, -6, 0), (-9, -6, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-9, -6.0001, 0), (-9, -5.9999, 0), (-4, -5.9999, 0), (-4, -6.0001, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-9, -6, 0), (-4, -6, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-24, -1.0001, 0), (-24, -0.9999, 0), (-19, -0.9999, 0), (-19, -1.0001, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-24, -1, 0), (-19, -1, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-19, -1.16928, 0), (-19, -0.830719, 0), (-14, -0.830719, 0), (-14, -1.16928, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-19, -1, 0), (-14, -1, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-14, -1.12696, 0), (-14, -0.873039, 0), (-9, -0.873039, 0), (-9, -1.12696, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-14, -1, 0), (-9, -1, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-9, -1.12696, 0), (-9, -0.873039, 0), (-4, -0.873039, 0), (-4, -1.12696, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-9, -1, 0), (-4, -1, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-23.9999, -6, 0), (-24.0001, -6, 0), (-24.0001, -1, 0), (-23.9999, -1, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-24, -6, 0), (-24, -1, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-18.9154, -6, 0), (-19.0846, -6, 0), (-19.0846, -1, 0), (-18.9154, -1, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-19, -6, 0), (-19, -1, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-13.9999, -6, 0), (-14.0001, -6, 0), (-14.0001, -1, 0), (-13.9999, -1, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-14, -6, 0), (-14, -1, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-8.9999, -6, 0), (-9.0001, -6, 0), (-9.0001, -1, 0), (-8.9999, -1, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-9, -6, 0), (-9, -1, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-3.9999, -6, 0), (-4.0001, -6, 0), (-4.0001, -1, 0), (-3.9999, -1, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-4, -6, 0), (-4, -1, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-23.8307, -6.16928, 0), (-24.1693, -5.83072, 0), (-19.1693, -0.830719, 0), (-18.8307, -1.16928, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-24, -6, 0), (-19, -1, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-18.9154, -6.08464, 0), (-19.0846, -5.91536, 0), (-14.0846, -0.915359, 0), (-13.9154, -1.08464, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-19, -6, 0), (-14, -1, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-8.7884, -5.7884, 0), (-9.2116, -6.2116, 0), (-14.2116, -1.2116, 0), (-13.7884, -0.788398, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-9, -6, 0), (-14, -1, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-8.87304, -6.12696, 0), (-9.12696, -5.87304, 0), (-4.12696, -0.873039, 0), (-3.87304, -1.12696, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-9, -6, 0), (-4, -1, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'point', Point(-24, -6, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-24, -8, 0), text='B0')
add(1, 'point', Point(-19, -6, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-19, -8, 0), text='B1')
add(1, 'point', Point(-14, -6, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-14, -8, 0), text='B2')
add(1, 'point', Point(-9, -6, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-9, -8, 0), text='B3')
add(1, 'point', Point(-4, -6, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-4, -8, 0), text='B4')
add(1, 'point', Point(-24, -1, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-24, 1, 0), text='T0')
add(1, 'point', Point(-19, -1, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-19, 1, 0), text='T1')
add(1, 'point', Point(-14, -1, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-14, 1, 0), text='T2')
add(1, 'point', Point(-9, -1, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-9, 1, 0), text='T3')
add(1, 'point', Point(-4, -1, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-4, 1, 0), text='T4')
add(1, 'segment', Line((-25.08, -6.55, 0), (-25.7518, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-24.36, -6.55, 0), (-25.0318, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-23.64, -6.55, 0), (-24.3118, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-22.92, -6.55, 0), (-23.5918, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-22.2, -6.55, 0), (-22.8718, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-10.08, -6.55, 0), (-10.7518, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-9.36, -6.55, 0), (-10.0318, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-8.64, -6.55, 0), (-9.31175, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-7.92, -6.55, 0), (-8.59175, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-7.2, -6.55, 0), (-7.87175, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-10.9, -7.5, 0), (-7.1, -7.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.06156)
add(1, 'arrow', Line((-19, 3, 0), (-19, -1, 0)), color=Color.from_hex("#3f9c20"), width=0.155952, head=(0.537624, 0.207662))
add(1, 'label', Point(-16.8, 3.4, 0), color=Color.from_hex("#3f9c20"), text='60 kN')
add(1, 'arrow', Line((-14, 3, 0), (-14, -1, 0)), color=Color.from_hex("#3f9c20"), width=0.155952, head=(0.537624, 0.207662))
add(1, 'label', Point(-11.8, 3.4, 0), color=Color.from_hex("#3f9c20"), text='30 kN')
add(1, 'arrow', Line((-4, 3, 0), (-4, -1, 0)), color=Color.from_hex("#3f9c20"), width=0.155952, head=(0.537624, 0.207662))
add(1, 'label', Point(-1.8, 3.4, 0), color=Color.from_hex("#3f9c20"), text='30 kN')

# step 2 — a) Global equilibrium
add(2, 'arrow', Line((-24, -10.6, 0), (-24, -7.1, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(-27.6, -10.8, 0), color=Color.from_hex("#3f9c20"), text='B0 = 40.0')
add(2, 'arrow', Line((-9, -10.6, 0), (-9, -7.1, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(-12.6, -10.8, 0), color=Color.from_hex("#3f9c20"), text='B3 = 80.0')

# step 3 — b) The zero members
add(3, 'label', Point(-16, -16, 0), color=Color.from_hex("#b9b9bd"), text='6 zero-force members')

# step 5 — Joint B4
add(5, 'label', Point(-6.5, -7.7, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(5, 'label', Point(-5.7, -3.5, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(5, 'segment', Line((8, 8, 0), (8, 8, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(5, 'segment', Line((8, 8, 0), (8, 8, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(5, 'label', Point(8, 11.4, 0), color=Color.from_hex("#aaaaaa"), text='joint B4')
add(5, 'point', Point(8, 8, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 6 — Joint T0
add(6, 'label', Point(-21.5, 0.7, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(6, 'label', Point(-25.7, -3.5, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(6, 'segment', Line((23, 8, 0), (23, 8, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(6, 'segment', Line((23, 8, 0), (23, 8, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(6, 'label', Point(23, 11.4, 0), color=Color.from_hex("#aaaaaa"), text='joint T0')
add(6, 'point', Point(23, 8, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 7 — Joint T4
add(7, 'label', Point(-6.5, 0.953922, 0), color=Color.from_hex("#ce4095"), text='30.0')
add(7, 'label', Point(-5.044, -4.956, 0), color=Color.from_hex("#1a1eb2"), text='-42.4')
add(7, 'segment', Line((8, 0, 0), (8, -1.875, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(7, 'segment', Line((8, -1.875, 0), (9.875, 0, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(7, 'segment', Line((9.875, 0, 0), (8, 0, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(7, 'segment', Line((8, 0, 0), (8, -1.875, 0)), color=Color.from_hex("#3f9c20"), width=0.110233)
add(7, 'segment', Line((8, -1.875, 0), (8, -1.875, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(7, 'segment', Line((8, -1.875, 0), (9.875, 0, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(7, 'segment', Line((9.875, 0, 0), (8, 0, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(7, 'label', Point(8, 3.4, 0), color=Color.from_hex("#aaaaaa"), text='joint T4')
add(7, 'point', Point(8, 0, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 8 — Joint B0
add(8, 'label', Point(-21.5, -8.03856, 0), color=Color.from_hex("#ce4095"), text='40.0')
add(8, 'label', Point(-19.9594, -5.04064, 0), color=Color.from_hex("#1a1eb2"), text='-56.6')
add(8, 'segment', Line((23, 0, 0), (20.5, -2.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(8, 'segment', Line((20.5, -2.5, 0), (23, -2.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(8, 'segment', Line((23, -2.5, 0), (23, 0, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(8, 'segment', Line((23, 0, 0), (20.5, -2.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(8, 'segment', Line((20.5, -2.5, 0), (23, -2.5, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(8, 'segment', Line((23, -2.5, 0), (23, -2.5, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(8, 'segment', Line((23, -2.5, 0), (23, 0, 0)), color=Color.from_hex("#3f9c20"), width=0.110233)
add(8, 'label', Point(23, 3.4, 0), color=Color.from_hex("#aaaaaa"), text='joint B0')
add(8, 'point', Point(23, 0, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 9 — Joint T1
add(9, 'label', Point(-16.5, 1.03856, 0), color=Color.from_hex("#1a1eb2"), text='-40.0')
add(9, 'label', Point(-20.8693, -3.5, 0), color=Color.from_hex("#1a1eb2"), text='-20.0')
add(9, 'segment', Line((8, -8, 0), (5.5, -8, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(9, 'segment', Line((5.5, -8, 0), (5.5, -11.75, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(9, 'segment', Line((5.5, -11.75, 0), (8, -9.25, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(9, 'segment', Line((8, -9.25, 0), (8, -8, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(9, 'segment', Line((8, -8, 0), (5.5, -8, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(9, 'segment', Line((5.5, -8, 0), (5.5, -11.75, 0)), color=Color.from_hex("#3f9c20"), width=0.110233)
add(9, 'segment', Line((5.5, -11.75, 0), (8, -9.25, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(9, 'segment', Line((8, -9.25, 0), (8, -8, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(9, 'segment', Line((8, -8, 0), (8, -8, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(9, 'label', Point(8, -4.6, 0), color=Color.from_hex("#aaaaaa"), text='joint T1')
add(9, 'point', Point(8, -8, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 10 — Joint T3
add(10, 'label', Point(-11.5, 0.953922, 0), color=Color.from_hex("#ce4095"), text='30.0')
add(10, 'label', Point(-10.7, -3.5, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(10, 'segment', Line((23, -8, 0), (24.875, -8, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(10, 'segment', Line((24.875, -8, 0), (23, -8, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(10, 'segment', Line((23, -8, 0), (24.875, -8, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(10, 'segment', Line((24.875, -8, 0), (24.875, -8, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(10, 'segment', Line((24.875, -8, 0), (23, -8, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(10, 'label', Point(23, -4.6, 0), color=Color.from_hex("#aaaaaa"), text='joint T3')
add(10, 'point', Point(23, -8, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 11 — Joint B1
add(11, 'label', Point(-16.5, -7.86928, 0), color=Color.from_hex("#ce4095"), text='20.0')
add(11, 'label', Point(-15.1286, -4.87136, 0), color=Color.from_hex("#ce4095"), text='28.3')
add(11, 'segment', Line((8, -16, 0), (8, -17.25, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(11, 'segment', Line((8, -17.25, 0), (9.25, -17.25, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(11, 'segment', Line((9.25, -17.25, 0), (10.5, -16, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(11, 'segment', Line((10.5, -16, 0), (8, -16, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(11, 'segment', Line((8, -16, 0), (8, -17.25, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(11, 'segment', Line((8, -17.25, 0), (9.25, -17.25, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(11, 'segment', Line((9.25, -17.25, 0), (10.5, -16, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(11, 'segment', Line((10.5, -16, 0), (8, -16, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(11, 'label', Point(8, -12.6, 0), color=Color.from_hex("#aaaaaa"), text='joint B1')
add(11, 'point', Point(8, -16, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 12 — Joint B2
add(12, 'label', Point(-11.5, -7.86928, 0), color=Color.from_hex("#ce4095"), text='20.0')
add(12, 'label', Point(-15.7, -3.5, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(12, 'segment', Line((23, -16, 0), (24.25, -16, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(12, 'segment', Line((24.25, -16, 0), (23, -16, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(12, 'segment', Line((23, -16, 0), (24.25, -16, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(12, 'segment', Line((24.25, -16, 0), (24.25, -16, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(12, 'segment', Line((24.25, -16, 0), (23, -16, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(12, 'label', Point(23, -12.6, 0), color=Color.from_hex("#aaaaaa"), text='joint B2')
add(12, 'point', Point(23, -16, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 13 — Joint B3
add(13, 'label', Point(-9.87472, -1.87471, 0), color=Color.from_hex("#1a1eb2"), text='-70.7')
add(13, 'segment', Line((8, -24, 0), (6.125, -25.875, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(13, 'segment', Line((6.125, -25.875, 0), (9.25, -29, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(13, 'segment', Line((9.25, -29, 0), (9.25, -24, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(13, 'segment', Line((9.25, -24, 0), (8, -24, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(13, 'segment', Line((8, -24, 0), (6.125, -25.875, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(13, 'segment', Line((6.125, -25.875, 0), (9.25, -29, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(13, 'segment', Line((9.25, -29, 0), (9.25, -29, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(13, 'segment', Line((9.25, -29, 0), (9.25, -29, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(13, 'segment', Line((9.25, -29, 0), (9.25, -24, 0)), color=Color.from_hex("#3f9c20"), width=0.110233)
add(13, 'segment', Line((9.25, -24, 0), (8, -24, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(13, 'label', Point(8, -20.6, 0), color=Color.from_hex("#aaaaaa"), text='joint B3')
add(13, 'point', Point(8, -24, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 14 — Joint T2
add(14, 'segment', Line((23, -24, 0), (21.75, -25.25, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(14, 'segment', Line((21.75, -25.25, 0), (21.75, -27.125, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(14, 'segment', Line((21.75, -27.125, 0), (24.25, -27.125, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(14, 'segment', Line((24.25, -27.125, 0), (26.125, -27.125, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(14, 'segment', Line((26.125, -27.125, 0), (23, -24, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(14, 'segment', Line((23, -24, 0), (21.75, -25.25, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(14, 'segment', Line((21.75, -25.25, 0), (21.75, -27.125, 0)), color=Color.from_hex("#3f9c20"), width=0.110233)
add(14, 'segment', Line((21.75, -27.125, 0), (24.25, -27.125, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(14, 'segment', Line((24.25, -27.125, 0), (26.125, -27.125, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(14, 'segment', Line((26.125, -27.125, 0), (26.125, -27.125, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(14, 'segment', Line((26.125, -27.125, 0), (23, -24, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(14, 'label', Point(23, -20.6, 0), color=Color.from_hex("#aaaaaa"), text='joint T2')
add(14, 'point', Point(23, -24, 0), color=Color.from_hex("#ffffff"), width=0.25308)


if __name__ == "__main__":
    print("EX 6.4 — a truss that spans and cantilevers at once —", len(ops), "operations")
