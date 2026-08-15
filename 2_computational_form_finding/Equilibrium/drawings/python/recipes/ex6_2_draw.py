"""EX 6.2 — a spanning truss, joint by joint

Auto-generated from ops/ex6_2.json — the drawing as literal COMPAS
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
add(0, 'label', Point(16, 10.2, 0), text='1 unit ≙ 3.5 kN  (sheet: 1 cm ≙ 10 kN)')

# step 1 — The truss
add(1, 'polygon', Polygon([(-27.5, -12.2116, 0), (-27.5, -11.7884, 0), (-21.5, -11.7884, 0), (-21.5, -12.2116, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-27.5, -12, 0), (-21.5, -12, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-21.5, -12.2821, 0), (-21.5, -11.7179, 0), (-15.5, -11.7179, 0), (-15.5, -12.2821, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-21.5, -12, 0), (-15.5, -12, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-15.5, -12.2821, 0), (-15.5, -11.7179, 0), (-9.5, -11.7179, 0), (-9.5, -12.2821, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-15.5, -12, 0), (-9.5, -12, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-9.5, -12.2116, 0), (-9.5, -11.7884, 0), (-3.5, -11.7884, 0), (-3.5, -12.2116, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-9.5, -12, 0), (-3.5, -12, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-27.5, -6.0001, 0), (-27.5, -5.9999, 0), (-21.5, -5.9999, 0), (-21.5, -6.0001, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-27.5, -6, 0), (-21.5, -6, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-21.5, -6.2116, 0), (-21.5, -5.7884, 0), (-15.5, -5.7884, 0), (-15.5, -6.2116, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-21.5, -6, 0), (-15.5, -6, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-15.5, -6.2116, 0), (-15.5, -5.7884, 0), (-9.5, -5.7884, 0), (-9.5, -6.2116, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-15.5, -6, 0), (-9.5, -6, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-9.5, -6.0001, 0), (-9.5, -5.9999, 0), (-3.5, -5.9999, 0), (-3.5, -6.0001, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-9.5, -6, 0), (-3.5, -6, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-27.4999, -12, 0), (-27.5001, -12, 0), (-27.5001, -6, 0), (-27.4999, -6, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-27.5, -12, 0), (-27.5, -6, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-21.4295, -12, 0), (-21.5705, -12, 0), (-21.5705, -6, 0), (-21.4295, -6, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-21.5, -12, 0), (-21.5, -6, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-15.4999, -12, 0), (-15.5001, -12, 0), (-15.5001, -6, 0), (-15.4999, -6, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-15.5, -12, 0), (-15.5, -6, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-9.42947, -12, 0), (-9.57053, -12, 0), (-9.57053, -6, 0), (-9.42947, -6, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-9.5, -12, 0), (-9.5, -6, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-3.4999, -12, 0), (-3.5001, -12, 0), (-3.5001, -6, 0), (-3.4999, -6, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-3.5, -12, 0), (-3.5, -6, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-27.2884, -12.2116, 0), (-27.7116, -11.7884, 0), (-21.7116, -5.7884, 0), (-21.2884, -6.2116, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-27.5, -12, 0), (-21.5, -6, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-21.4295, -12.0705, 0), (-21.5705, -11.9295, 0), (-15.5705, -5.92947, 0), (-15.4295, -6.07053, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-21.5, -12, 0), (-15.5, -6, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-9.42947, -11.9295, 0), (-9.57053, -12.0705, 0), (-15.5705, -6.07053, 0), (-15.4295, -5.92947, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-9.5, -12, 0), (-15.5, -6, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-3.2884, -11.7884, 0), (-3.7116, -12.2116, 0), (-9.7116, -6.2116, 0), (-9.2884, -5.7884, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-3.5, -12, 0), (-9.5, -6, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
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
add(1, 'segment', Line((-4.58, -12.55, 0), (-5.25175, -11.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-3.86, -12.55, 0), (-4.53175, -11.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-3.14, -12.55, 0), (-3.81175, -11.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-2.42, -12.55, 0), (-3.09175, -11.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-1.7, -12.55, 0), (-2.37175, -11.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-5.4, -13.5, 0), (-1.6, -13.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.06156)
add(1, 'arrow', Line((-21.5, -2.8, 0), (-21.5, -6, 0)), color=Color.from_hex("#3f9c20"), width=0.155952, head=(0.537624, 0.207662))
add(1, 'label', Point(-19.3, -2.4, 0), color=Color.from_hex("#3f9c20"), text='30 kN')
add(1, 'arrow', Line((-15.5, -2.8, 0), (-15.5, -6, 0)), color=Color.from_hex("#3f9c20"), width=0.155952, head=(0.537624, 0.207662))
add(1, 'label', Point(-13.3, -2.4, 0), color=Color.from_hex("#3f9c20"), text='30 kN')
add(1, 'arrow', Line((-9.5, -2.8, 0), (-9.5, -6, 0)), color=Color.from_hex("#3f9c20"), width=0.155952, head=(0.537624, 0.207662))
add(1, 'label', Point(-7.3, -2.4, 0), color=Color.from_hex("#3f9c20"), text='30 kN')

# step 2 — a) Global equilibrium — and the load line
add(2, 'arrow', Line((-27.5, -16, 0), (-27.5, -13, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(-30.9, -16.3, 0), color=Color.from_hex("#3f9c20"), text='B0 = 45.0')
add(2, 'arrow', Line((-3.5, -16, 0), (-3.5, -13, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(-6.9, -16.3, 0), color=Color.from_hex("#3f9c20"), text='B4 = 45.0')
add(2, 'arrow', Line((24.0714, 4.85714, 0), (24.0714, -3.71429, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(23.4714, 0.571429, 0), color=Color.from_hex("#3f9c20"), text='30')
add(2, 'arrow', Line((24.0714, -3.71429, 0), (24.0714, -12.2857, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(23.4714, -8, 0), color=Color.from_hex("#3f9c20"), text='30')
add(2, 'arrow', Line((24.0714, -12.2857, 0), (24.0714, -20.8571, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(23.4714, -16.5714, 0), color=Color.from_hex("#3f9c20"), text='30')
add(2, 'arrow', Line((25.0714, -20.8571, 0), (25.0714, -8, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(25.6714, -14.4286, 0), color=Color.from_hex("#3f9c20"), text='B4 45.0')
add(2, 'arrow', Line((25.0714, -8, 0), (25.0714, 4.85714, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(25.6714, -1.57143, 0), color=Color.from_hex("#3f9c20"), text='B0 45.0')
add(2, 'point', Point(24.5714, 4.85714, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(2, 'label', Point(25.3015, 6.28085, 0), color=Color.from_hex("#aaaaaa"), text='a=5')
add(2, 'label', Point(-30.7527, -2.74731, 0), color=Color.from_hex("#aaaaaa"), text='a')
add(2, 'point', Point(24.5714, -3.71429, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(2, 'label', Point(25.9129, -2.8423, 0), color=Color.from_hex("#aaaaaa"), text='b')
add(2, 'label', Point(-18.5, -1.4, 0), color=Color.from_hex("#aaaaaa"), text='b')
add(2, 'point', Point(24.5714, -12.2857, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(2, 'label', Point(25.9129, -13.1577, 0), color=Color.from_hex("#aaaaaa"), text='c')
add(2, 'label', Point(-12.5, -1.4, 0), color=Color.from_hex("#aaaaaa"), text='c')
add(2, 'point', Point(24.5714, -20.8571, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(2, 'label', Point(25.3015, -22.2809, 0), color=Color.from_hex("#aaaaaa"), text='d=8')
add(2, 'label', Point(-0.247309, -2.74731, 0), color=Color.from_hex("#aaaaaa"), text='d')
add(2, 'point', Point(24.5714, -8, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(2, 'label', Point(26.1714, -8, 0), color=Color.from_hex("#aaaaaa"), text='e')
add(2, 'label', Point(-15.5, -16.6, 0), color=Color.from_hex("#aaaaaa"), text='e')
add(2, 'label', Point(-25.3, -10.9, 0), color=Color.from_hex("#aaaaaa"), text='1')
add(2, 'label', Point(-19.3, -10.9, 0), color=Color.from_hex("#aaaaaa"), text='2')
add(2, 'label', Point(-11.7, -10.9, 0), color=Color.from_hex("#aaaaaa"), text='3')
add(2, 'label', Point(-8.4, -8.2, 0), color=Color.from_hex("#aaaaaa"), text='4')
add(2, 'label', Point(-26.4, -9.8, 0), color=Color.from_hex("#aaaaaa"), text='5')
add(2, 'label', Point(-20.4, -9.8, 0), color=Color.from_hex("#aaaaaa"), text='6')
add(2, 'label', Point(-13.3, -7.1, 0), color=Color.from_hex("#aaaaaa"), text='7')
add(2, 'label', Point(-4.6, -9.8, 0), color=Color.from_hex("#aaaaaa"), text='8')

# step 3 — b) The zero members
add(3, 'label', Point(-7, -18.6, 0), color=Color.from_hex("#b9b9bd"), text='5 zero-force members')

# step 5 — Joint T0
add(5, 'label', Point(-24.5, -4.3, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(5, 'label', Point(-29.2, -9, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(5, 'segment', Line((11.7143, -3.71429, 0), (7.42857, -8, 0)), color=Color.from_hex("#aaaaaa"), width=0.060329)
add(5, 'segment', Line((7.42857, -8, 0), (11.7143, -12.2857, 0)), color=Color.from_hex("#aaaaaa"), width=0.060329)
add(5, 'segment', Line((11.7143, -12.2857, 0), (24.5714, -12.2857, 0)), color=Color.from_hex("#aaaaaa"), width=0.060329)
add(5, 'segment', Line((24.5714, -12.2857, 0), (24.5714, -3.71429, 0)), color=Color.from_hex("#aaaaaa"), width=0.060329)
add(5, 'segment', Line((24.5714, -3.71429, 0), (11.7143, -3.71429, 0)), color=Color.from_hex("#aaaaaa"), width=0.060329)
add(5, 'segment', Line((24.5714, 4.85714, 0), (24.5714, 4.85714, 0)), color=Color.from_hex("#b9b9bd"), width=0.116718)
add(5, 'segment', Line((24.5714, 4.85714, 0), (24.5714, 4.85714, 0)), color=Color.from_hex("#b9b9bd"), width=0.116718)
add(5, 'point', Point(24.5714, 4.85714, 0), color=Color.from_hex("#ffffff"), width=0.2109)

# step 6 — Joint T4
add(6, 'label', Point(-6.5, -4.3, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(6, 'label', Point(-5.2, -9, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(6, 'segment', Line((24.5714, -20.8571, 0), (24.5714, -20.8571, 0)), color=Color.from_hex("#b9b9bd"), width=0.116718)
add(6, 'segment', Line((24.5714, -20.8571, 0), (24.5714, -20.8571, 0)), color=Color.from_hex("#b9b9bd"), width=0.116718)
add(6, 'point', Point(24.5714, -20.8571, 0), color=Color.from_hex("#ffffff"), width=0.2109)

# step 7 — Joint B0
add(7, 'label', Point(-24.5, -14.1232, 0), color=Color.from_hex("#ce4095"), text='45.0')
add(7, 'label', Point(-22.8747, -10.6253, 0), color=Color.from_hex("#1a1eb2"), text='-63.6')
add(7, 'segment', Line((11.7143, -8, 0), (24.5714, -8, 0)), color=Color.from_hex("#ce4095"), width=0.116718)
add(7, 'segment', Line((24.5714, 4.85714, 0), (11.7143, -8, 0)), color=Color.from_hex("#1a1eb2"), width=0.116718)
add(7, 'point', Point(11.7143, -8, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(7, 'label', Point(10.1143, -8, 0), color=Color.from_hex("#aaaaaa"), text='1=4')

# step 8 — Joint B4
add(8, 'label', Point(-6.5, -14.1232, 0), color=Color.from_hex("#ce4095"), text='45.0')
add(8, 'label', Point(-4.87472, -7.37472, 0), color=Color.from_hex("#1a1eb2"), text='-63.6')
add(8, 'segment', Line((11.7143, -8, 0), (24.5714, -8, 0)), color=Color.from_hex("#ce4095"), width=0.116718)
add(8, 'segment', Line((11.7143, -8, 0), (24.5714, -20.8571, 0)), color=Color.from_hex("#1a1eb2"), width=0.116718)
add(8, 'point', Point(11.7143, -8, 0), color=Color.from_hex("#ffffff"), width=0.2109)

# step 9 — Joint T1
add(9, 'label', Point(-18.5, -3.8768, 0), color=Color.from_hex("#1a1eb2"), text='-45.0')
add(9, 'label', Point(-23.3411, -9, 0), color=Color.from_hex("#ce4095"), text='15.0')
add(9, 'segment', Line((24.5714, -3.71429, 0), (11.7143, -3.71429, 0)), color=Color.from_hex("#1a1eb2"), width=0.116718)
add(9, 'segment', Line((11.7143, -8, 0), (11.7143, -3.71429, 0)), color=Color.from_hex("#ce4095"), width=0.116718)
add(9, 'point', Point(11.7143, -3.71429, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(9, 'label', Point(10.3938, -2.81079, 0), color=Color.from_hex("#aaaaaa"), text='6')

# step 10 — Joint T3
add(10, 'label', Point(-12.5, -3.8768, 0), color=Color.from_hex("#1a1eb2"), text='-45.0')
add(10, 'label', Point(-11.3411, -9, 0), color=Color.from_hex("#ce4095"), text='15.0')
add(10, 'segment', Line((24.5714, -12.2857, 0), (11.7143, -12.2857, 0)), color=Color.from_hex("#1a1eb2"), width=0.116718)
add(10, 'segment', Line((11.7143, -12.2857, 0), (11.7143, -8, 0)), color=Color.from_hex("#ce4095"), width=0.116718)
add(10, 'point', Point(11.7143, -12.2857, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(10, 'label', Point(10.3938, -13.1892, 0), color=Color.from_hex("#aaaaaa"), text='7')

# step 11 — Joint B1
add(11, 'label', Point(-18.5, -14.2643, 0), color=Color.from_hex("#ce4095"), text='60.0')
add(11, 'label', Point(-17.1569, -10.3431, 0), color=Color.from_hex("#1a1eb2"), text='-21.2')
add(11, 'segment', Line((7.42857, -8, 0), (24.5714, -8, 0)), color=Color.from_hex("#ce4095"), width=0.116718)
add(11, 'segment', Line((11.7143, -3.71429, 0), (7.42857, -8, 0)), color=Color.from_hex("#1a1eb2"), width=0.116718)
add(11, 'point', Point(7.42857, -8, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(11, 'label', Point(5.82857, -8, 0), color=Color.from_hex("#aaaaaa"), text='2=3')

# step 12 — Joint B2
add(12, 'label', Point(-12.5, -14.2643, 0), color=Color.from_hex("#ce4095"), text='60.0')
add(12, 'label', Point(-17.2, -9, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(12, 'segment', Line((7.42857, -8, 0), (24.5714, -8, 0)), color=Color.from_hex("#ce4095"), width=0.116718)
add(12, 'segment', Line((7.42857, -8, 0), (7.42857, -8, 0)), color=Color.from_hex("#b9b9bd"), width=0.116718)
add(12, 'point', Point(7.42857, -8, 0), color=Color.from_hex("#ffffff"), width=0.2109)

# step 13 — Joint B3
add(13, 'label', Point(-11.1569, -7.65685, 0), color=Color.from_hex("#1a1eb2"), text='-21.2')
add(13, 'segment', Line((7.42857, -8, 0), (11.7143, -12.2857, 0)), color=Color.from_hex("#1a1eb2"), width=0.116718)


if __name__ == "__main__":
    print("EX 6.2 — a spanning truss, joint by joint —", len(ops), "operations")
