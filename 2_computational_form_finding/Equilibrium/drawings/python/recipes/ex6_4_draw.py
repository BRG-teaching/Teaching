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
add(0, 'label', Point(-22, -18.6, 0), text='Form diagram 1:100')
add(0, 'label', Point(16, 11.6, 0), text='Force diagram — one Cremona diagram')
add(0, 'label', Point(16, 10.2, 0), text='1 unit ≙ 4 kN  (sheet: 1 cm ≙ 10 kN)')

# step 1 — The truss
add(1, 'polygon', Polygon([(-27.5, -12.1693, 0), (-27.5, -11.8307, 0), (-21.5, -11.8307, 0), (-21.5, -12.1693, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-27.5, -12, 0), (-21.5, -12, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-21.5, -12.0846, 0), (-21.5, -11.9154, 0), (-15.5, -11.9154, 0), (-15.5, -12.0846, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-21.5, -12, 0), (-15.5, -12, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-15.5, -12.0846, 0), (-15.5, -11.9154, 0), (-9.5, -11.9154, 0), (-9.5, -12.0846, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-15.5, -12, 0), (-9.5, -12, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-9.5, -12.0001, 0), (-9.5, -11.9999, 0), (-3.5, -11.9999, 0), (-3.5, -12.0001, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-9.5, -12, 0), (-3.5, -12, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-27.5, -6.0001, 0), (-27.5, -5.9999, 0), (-21.5, -5.9999, 0), (-21.5, -6.0001, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-27.5, -6, 0), (-21.5, -6, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-21.5, -6.16928, 0), (-21.5, -5.83072, 0), (-15.5, -5.83072, 0), (-15.5, -6.16928, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-21.5, -6, 0), (-15.5, -6, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-15.5, -6.12696, 0), (-15.5, -5.87304, 0), (-9.5, -5.87304, 0), (-9.5, -6.12696, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-15.5, -6, 0), (-9.5, -6, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-9.5, -6.12696, 0), (-9.5, -5.87304, 0), (-3.5, -5.87304, 0), (-3.5, -6.12696, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-9.5, -6, 0), (-3.5, -6, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-27.4999, -12, 0), (-27.5001, -12, 0), (-27.5001, -6, 0), (-27.4999, -6, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-27.5, -12, 0), (-27.5, -6, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-21.4154, -12, 0), (-21.5846, -12, 0), (-21.5846, -6, 0), (-21.4154, -6, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-21.5, -12, 0), (-21.5, -6, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-15.4999, -12, 0), (-15.5001, -12, 0), (-15.5001, -6, 0), (-15.4999, -6, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-15.5, -12, 0), (-15.5, -6, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-9.4999, -12, 0), (-9.5001, -12, 0), (-9.5001, -6, 0), (-9.4999, -6, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-9.5, -12, 0), (-9.5, -6, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-3.4999, -12, 0), (-3.5001, -12, 0), (-3.5001, -6, 0), (-3.4999, -6, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-3.5, -12, 0), (-3.5, -6, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-27.3307, -12.1693, 0), (-27.6693, -11.8307, 0), (-21.6693, -5.83072, 0), (-21.3307, -6.16928, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-27.5, -12, 0), (-21.5, -6, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-21.4154, -12.0846, 0), (-21.5846, -11.9154, 0), (-15.5846, -5.91536, 0), (-15.4154, -6.08464, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-21.5, -12, 0), (-15.5, -6, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-9.2884, -11.7884, 0), (-9.7116, -12.2116, 0), (-15.7116, -6.2116, 0), (-15.2884, -5.7884, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-9.5, -12, 0), (-15.5, -6, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-9.37304, -12.127, 0), (-9.62696, -11.873, 0), (-3.62696, -5.87304, 0), (-3.37304, -6.12696, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-9.5, -12, 0), (-3.5, -6, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'point', Point(-27.5, -12, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-27.5, -14, 0), text='B0')
add(1, 'point', Point(-21.5, -12, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-21.5, -14, 0), text='B1')
add(1, 'point', Point(-15.5, -12, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-15.5, -14, 0), text='B2')
add(1, 'point', Point(-9.5, -12, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-9.5, -14, 0), text='B3')
add(1, 'point', Point(-3.5, -12, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-3.5, -14, 0), text='B4')
add(1, 'point', Point(-27.5, -6, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-27.5, -4, 0), text='T0')
add(1, 'point', Point(-21.5, -6, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-21.5, -4, 0), text='T1')
add(1, 'point', Point(-15.5, -6, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-15.5, -4, 0), text='T2')
add(1, 'point', Point(-9.5, -6, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-9.5, -4, 0), text='T3')
add(1, 'point', Point(-3.5, -6, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-3.5, -4, 0), text='T4')
add(1, 'segment', Line((-28.58, -12.55, 0), (-29.2518, -11.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-27.86, -12.55, 0), (-28.5318, -11.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-27.14, -12.55, 0), (-27.8118, -11.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-26.42, -12.55, 0), (-27.0918, -11.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-25.7, -12.55, 0), (-26.3718, -11.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-10.58, -12.55, 0), (-11.2518, -11.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-9.86, -12.55, 0), (-10.5318, -11.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-9.14, -12.55, 0), (-9.81175, -11.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-8.42, -12.55, 0), (-9.09175, -11.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-7.7, -12.55, 0), (-8.37175, -11.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-11.4, -13.5, 0), (-7.6, -13.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.06156)
add(1, 'arrow', Line((-21.5, -2.8, 0), (-21.5, -6, 0)), color=Color.from_hex("#3f9c20"), width=0.155952, head=(0.537624, 0.207662))
add(1, 'label', Point(-19.3, -2.4, 0), color=Color.from_hex("#3f9c20"), text='60 kN')
add(1, 'arrow', Line((-15.5, -2.8, 0), (-15.5, -6, 0)), color=Color.from_hex("#3f9c20"), width=0.155952, head=(0.537624, 0.207662))
add(1, 'label', Point(-13.3, -2.4, 0), color=Color.from_hex("#3f9c20"), text='30 kN')
add(1, 'arrow', Line((-3.5, -2.8, 0), (-3.5, -6, 0)), color=Color.from_hex("#3f9c20"), width=0.155952, head=(0.537624, 0.207662))
add(1, 'label', Point(-1.3, -2.4, 0), color=Color.from_hex("#3f9c20"), text='30 kN')

# step 2 — a) Global equilibrium — and the load line
add(2, 'arrow', Line((-27.5, -16, 0), (-27.5, -13, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(-31.1, -16.3, 0), color=Color.from_hex("#3f9c20"), text='B0 = 40.0')
add(2, 'arrow', Line((-9.5, -16, 0), (-9.5, -13, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(-13.1, -16.3, 0), color=Color.from_hex("#3f9c20"), text='B3 = 80.0')
add(2, 'arrow', Line((16.75, 6, 0), (16.75, -9, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(16.15, -1.5, 0), color=Color.from_hex("#3f9c20"), text='60')
add(2, 'arrow', Line((16.75, -9, 0), (16.75, -16.5, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(16.15, -12.75, 0), color=Color.from_hex("#3f9c20"), text='30')
add(2, 'arrow', Line((16.75, -16.5, 0), (16.75, -24, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(16.15, -20.25, 0), color=Color.from_hex("#3f9c20"), text='30')
add(2, 'arrow', Line((17.75, -24, 0), (17.75, -4, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(18.35, -14, 0), color=Color.from_hex("#3f9c20"), text='B3 80.0')
add(2, 'arrow', Line((17.75, -4, 0), (17.75, 6, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(18.35, 1, 0), color=Color.from_hex("#3f9c20"), text='B0 40.0')
add(2, 'point', Point(17.25, 6, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(2, 'label', Point(17.3712, 7.59541, 0), color=Color.from_hex("#aaaaaa"), text='a=5')
add(2, 'label', Point(-30.7527, -2.74731, 0), color=Color.from_hex("#aaaaaa"), text='a')
add(2, 'point', Point(17.25, -9, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(2, 'label', Point(18.8282, -8.73696, 0), color=Color.from_hex("#aaaaaa"), text='b')
add(2, 'label', Point(-18.5, -1.4, 0), color=Color.from_hex("#aaaaaa"), text='b')
add(2, 'point', Point(17.25, -16.5, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(2, 'label', Point(17.4995, -18.0804, 0), color=Color.from_hex("#aaaaaa"), text='c')
add(2, 'label', Point(-9.5, -1.4, 0), color=Color.from_hex("#aaaaaa"), text='c')
add(2, 'point', Point(17.25, -24, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(2, 'label', Point(17.3743, -25.5952, 0), color=Color.from_hex("#aaaaaa"), text='d=4')
add(2, 'label', Point(-0.247309, -15.2527, 0), color=Color.from_hex("#aaaaaa"), text='d')
add(2, 'point', Point(17.25, -4, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(2, 'label', Point(17.5971, -2.4381, 0), color=Color.from_hex("#aaaaaa"), text='e')
add(2, 'label', Point(-18.5, -16.6, 0), color=Color.from_hex("#aaaaaa"), text='e')
add(2, 'label', Point(-25.3, -10.9, 0), color=Color.from_hex("#aaaaaa"), text='1')
add(2, 'label', Point(-19.3, -10.9, 0), color=Color.from_hex("#aaaaaa"), text='2')
add(2, 'label', Point(-11.7, -10.9, 0), color=Color.from_hex("#aaaaaa"), text='3')
add(2, 'label', Point(-4.6, -8.2, 0), color=Color.from_hex("#aaaaaa"), text='4')
add(2, 'label', Point(-26.4, -9.8, 0), color=Color.from_hex("#aaaaaa"), text='5')
add(2, 'label', Point(-20.4, -9.8, 0), color=Color.from_hex("#aaaaaa"), text='6')
add(2, 'label', Point(-13.3, -7.1, 0), color=Color.from_hex("#aaaaaa"), text='7')
add(2, 'label', Point(-8.4, -9.8, 0), color=Color.from_hex("#aaaaaa"), text='8')

# step 3 — b) The zero members
add(3, 'label', Point(-7, -18.6, 0), color=Color.from_hex("#b9b9bd"), text='6 zero-force members')

# step 5 — Joint B4
add(5, 'label', Point(-6.5, -13.7, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(5, 'label', Point(-5.2, -9, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(5, 'segment', Line((7.25, -9, 0), (12.25, -4, 0)), color=Color.from_hex("#aaaaaa"), width=0.060329)
add(5, 'segment', Line((12.25, -4, 0), (24.75, -16.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.060329)
add(5, 'segment', Line((24.75, -16.5, 0), (17.25, -16.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.060329)
add(5, 'segment', Line((17.25, -16.5, 0), (17.25, -9, 0)), color=Color.from_hex("#aaaaaa"), width=0.060329)
add(5, 'segment', Line((17.25, -9, 0), (7.25, -9, 0)), color=Color.from_hex("#aaaaaa"), width=0.060329)
add(5, 'segment', Line((17.25, -24, 0), (17.25, -24, 0)), color=Color.from_hex("#b9b9bd"), width=0.116718)
add(5, 'segment', Line((17.25, -24, 0), (17.25, -24, 0)), color=Color.from_hex("#b9b9bd"), width=0.116718)
add(5, 'point', Point(17.25, -24, 0), color=Color.from_hex("#ffffff"), width=0.2109)

# step 6 — Joint T0
add(6, 'label', Point(-24.5, -4.3, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(6, 'label', Point(-29.2, -9, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(6, 'segment', Line((17.25, 6, 0), (17.25, 6, 0)), color=Color.from_hex("#b9b9bd"), width=0.116718)
add(6, 'segment', Line((17.25, 6, 0), (17.25, 6, 0)), color=Color.from_hex("#b9b9bd"), width=0.116718)
add(6, 'point', Point(17.25, 6, 0), color=Color.from_hex("#ffffff"), width=0.2109)

# step 7 — Joint T4
add(7, 'label', Point(-6.5, -4.04608, 0), color=Color.from_hex("#ce4095"), text='30.0')
add(7, 'label', Point(-5.044, -10.456, 0), color=Color.from_hex("#1a1eb2"), text='-42.4')
add(7, 'segment', Line((17.25, -16.5, 0), (24.75, -16.5, 0)), color=Color.from_hex("#ce4095"), width=0.116718)
add(7, 'segment', Line((24.75, -16.5, 0), (17.25, -24, 0)), color=Color.from_hex("#1a1eb2"), width=0.116718)
add(7, 'point', Point(24.75, -16.5, 0), color=Color.from_hex("#ffffff"), width=0.2109)

# step 8 — Joint B0
add(8, 'label', Point(-24.5, -14.0386, 0), color=Color.from_hex("#ce4095"), text='40.0')
add(8, 'label', Point(-22.9594, -10.5406, 0), color=Color.from_hex("#1a1eb2"), text='-56.6')
add(8, 'segment', Line((7.25, -4, 0), (17.25, -4, 0)), color=Color.from_hex("#ce4095"), width=0.116718)
add(8, 'segment', Line((17.25, 6, 0), (7.25, -4, 0)), color=Color.from_hex("#1a1eb2"), width=0.116718)
add(8, 'point', Point(7.25, -4, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(8, 'label', Point(5.87014, -3.19008, 0), color=Color.from_hex("#aaaaaa"), text='1')

# step 9 — Joint T1
add(9, 'label', Point(-18.5, -3.96144, 0), color=Color.from_hex("#1a1eb2"), text='-40.0')
add(9, 'label', Point(-23.3693, -9, 0), color=Color.from_hex("#1a1eb2"), text='-20.0')
add(9, 'segment', Line((17.25, -9, 0), (7.25, -9, 0)), color=Color.from_hex("#1a1eb2"), width=0.116718)
add(9, 'segment', Line((7.25, -4, 0), (7.25, -9, 0)), color=Color.from_hex("#1a1eb2"), width=0.116718)
add(9, 'point', Point(7.25, -9, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(9, 'label', Point(5.65038, -8.96523, 0), color=Color.from_hex("#aaaaaa"), text='6')

# step 10 — Joint T3
add(10, 'label', Point(-12.5, -4.04608, 0), color=Color.from_hex("#ce4095"), text='30.0')
add(10, 'label', Point(-11.2, -9, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(10, 'segment', Line((17.25, -16.5, 0), (24.75, -16.5, 0)), color=Color.from_hex("#ce4095"), width=0.116718)
add(10, 'segment', Line((24.75, -16.5, 0), (24.75, -16.5, 0)), color=Color.from_hex("#b9b9bd"), width=0.116718)
add(10, 'point', Point(24.75, -16.5, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(10, 'label', Point(25.9724, -17.5323, 0), color=Color.from_hex("#aaaaaa"), text='7=8')

# step 11 — Joint B1
add(11, 'label', Point(-18.5, -13.8693, 0), color=Color.from_hex("#ce4095"), text='20.0')
add(11, 'label', Point(-17.1286, -10.3714, 0), color=Color.from_hex("#ce4095"), text='28.3')
add(11, 'segment', Line((12.25, -4, 0), (17.25, -4, 0)), color=Color.from_hex("#ce4095"), width=0.116718)
add(11, 'segment', Line((7.25, -9, 0), (12.25, -4, 0)), color=Color.from_hex("#ce4095"), width=0.116718)
add(11, 'point', Point(12.25, -4, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(11, 'label', Point(11.2976, -2.71431, 0), color=Color.from_hex("#aaaaaa"), text='2=3')

# step 12 — Joint B2
add(12, 'label', Point(-12.5, -13.8693, 0), color=Color.from_hex("#ce4095"), text='20.0')
add(12, 'label', Point(-17.2, -9, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(12, 'segment', Line((12.25, -4, 0), (17.25, -4, 0)), color=Color.from_hex("#ce4095"), width=0.116718)
add(12, 'segment', Line((12.25, -4, 0), (12.25, -4, 0)), color=Color.from_hex("#b9b9bd"), width=0.116718)
add(12, 'point', Point(12.25, -4, 0), color=Color.from_hex("#ffffff"), width=0.2109)

# step 13 — Joint B3
add(13, 'label', Point(-10.8747, -7.37472, 0), color=Color.from_hex("#1a1eb2"), text='-70.7')
add(13, 'segment', Line((12.25, -4, 0), (24.75, -16.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.116718)


if __name__ == "__main__":
    print("EX 6.4 — a truss that spans and cantilevers at once —", len(ops), "operations")
