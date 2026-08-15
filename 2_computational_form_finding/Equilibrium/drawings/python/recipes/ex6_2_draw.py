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
add(0, 'label', Point(-16, -14.5, 0), text='Form diagram 1:100')
add(0, 'label', Point(15, 15.4, 0), text='Force diagram — one polygon per joint')
add(0, 'label', Point(15, 14, 0), text='1 unit ≙ 14 kN  (sheet: 1 cm ≙ 10 kN)')

# step 1 — The truss
add(1, 'polygon', Polygon([(-24, -8.2116, 0), (-24, -7.7884, 0), (-19, -7.7884, 0), (-19, -8.2116, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-24, -8, 0), (-19, -8, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-19, -8.28214, 0), (-19, -7.71786, 0), (-14, -7.71786, 0), (-14, -8.28214, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-19, -8, 0), (-14, -8, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-14, -8.28214, 0), (-14, -7.71786, 0), (-9, -7.71786, 0), (-9, -8.28214, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-14, -8, 0), (-9, -8, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-9, -8.2116, 0), (-9, -7.7884, 0), (-4, -7.7884, 0), (-4, -8.2116, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-9, -8, 0), (-4, -8, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-24, -3.0001, 0), (-24, -2.9999, 0), (-19, -2.9999, 0), (-19, -3.0001, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-24, -3, 0), (-19, -3, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-19, -3.2116, 0), (-19, -2.7884, 0), (-14, -2.7884, 0), (-14, -3.2116, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-19, -3, 0), (-14, -3, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-14, -3.2116, 0), (-14, -2.7884, 0), (-9, -2.7884, 0), (-9, -3.2116, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-14, -3, 0), (-9, -3, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-9, -3.0001, 0), (-9, -2.9999, 0), (-4, -2.9999, 0), (-4, -3.0001, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-9, -3, 0), (-4, -3, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-23.9999, -8, 0), (-24.0001, -8, 0), (-24.0001, -3, 0), (-23.9999, -3, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-24, -8, 0), (-24, -3, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-18.9295, -8, 0), (-19.0705, -8, 0), (-19.0705, -3, 0), (-18.9295, -3, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-19, -8, 0), (-19, -3, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-13.9999, -8, 0), (-14.0001, -8, 0), (-14.0001, -3, 0), (-13.9999, -3, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-14, -8, 0), (-14, -3, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-8.92947, -8, 0), (-9.07053, -8, 0), (-9.07053, -3, 0), (-8.92947, -3, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-9, -8, 0), (-9, -3, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-3.9999, -8, 0), (-4.0001, -8, 0), (-4.0001, -3, 0), (-3.9999, -3, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-4, -8, 0), (-4, -3, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-23.7884, -8.2116, 0), (-24.2116, -7.7884, 0), (-19.2116, -2.7884, 0), (-18.7884, -3.2116, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-24, -8, 0), (-19, -3, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-18.9295, -8.07053, 0), (-19.0705, -7.92947, 0), (-14.0705, -2.92947, 0), (-13.9295, -3.07053, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-19, -8, 0), (-14, -3, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-8.92947, -7.92947, 0), (-9.07053, -8.07053, 0), (-14.0705, -3.07053, 0), (-13.9295, -2.92947, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-9, -8, 0), (-14, -3, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-3.7884, -7.7884, 0), (-4.2116, -8.2116, 0), (-9.2116, -3.2116, 0), (-8.7884, -2.7884, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-4, -8, 0), (-9, -3, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'point', Point(-24, -8, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-24, -10, 0), text='B0')
add(1, 'point', Point(-19, -8, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-19, -10, 0), text='B1')
add(1, 'point', Point(-14, -8, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-14, -10, 0), text='B2')
add(1, 'point', Point(-9, -8, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-9, -10, 0), text='B3')
add(1, 'point', Point(-4, -8, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-4, -10, 0), text='B4')
add(1, 'point', Point(-24, -3, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-24, -1, 0), text='T0')
add(1, 'point', Point(-19, -3, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-19, -1, 0), text='T1')
add(1, 'point', Point(-14, -3, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-14, -1, 0), text='T2')
add(1, 'point', Point(-9, -3, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-9, -1, 0), text='T3')
add(1, 'point', Point(-4, -3, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-4, -1, 0), text='T4')
add(1, 'segment', Line((-25.08, -8.55, 0), (-25.7518, -7.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-24.36, -8.55, 0), (-25.0318, -7.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-23.64, -8.55, 0), (-24.3118, -7.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-22.92, -8.55, 0), (-23.5918, -7.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-22.2, -8.55, 0), (-22.8718, -7.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-5.08, -8.55, 0), (-5.75175, -7.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-4.36, -8.55, 0), (-5.03175, -7.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-3.64, -8.55, 0), (-4.31175, -7.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-2.92, -8.55, 0), (-3.59175, -7.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-2.2, -8.55, 0), (-2.87175, -7.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-5.9, -9.5, 0), (-2.1, -9.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.06156)
add(1, 'arrow', Line((-19, 1, 0), (-19, -3, 0)), color=Color.from_hex("#3f9c20"), width=0.155952, head=(0.537624, 0.207662))
add(1, 'label', Point(-16.8, 1.4, 0), color=Color.from_hex("#3f9c20"), text='30 kN')
add(1, 'arrow', Line((-14, 1, 0), (-14, -3, 0)), color=Color.from_hex("#3f9c20"), width=0.155952, head=(0.537624, 0.207662))
add(1, 'label', Point(-11.8, 1.4, 0), color=Color.from_hex("#3f9c20"), text='30 kN')
add(1, 'arrow', Line((-9, 1, 0), (-9, -3, 0)), color=Color.from_hex("#3f9c20"), width=0.155952, head=(0.537624, 0.207662))
add(1, 'label', Point(-6.8, 1.4, 0), color=Color.from_hex("#3f9c20"), text='30 kN')

# step 2 — a) Global equilibrium
add(2, 'arrow', Line((-24, -12.6, 0), (-24, -9.1, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(-27.4, -12.8, 0), color=Color.from_hex("#3f9c20"), text='B0 = 45.0')
add(2, 'arrow', Line((-4, -12.6, 0), (-4, -9.1, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(-7.4, -12.8, 0), color=Color.from_hex("#3f9c20"), text='B4 = 45.0')

# step 3 — b) The zero members
add(3, 'label', Point(-16, -17, 0), color=Color.from_hex("#b9b9bd"), text='5 zero-force members')

# step 5 — Joint T0
add(5, 'label', Point(-21.5, -1.3, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(5, 'label', Point(-25.7, -5.5, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(5, 'segment', Line((8, 8, 0), (8, 8, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(5, 'segment', Line((8, 8, 0), (8, 8, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(5, 'label', Point(8, 11.4, 0), color=Color.from_hex("#aaaaaa"), text='joint T0')
add(5, 'point', Point(8, 8, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 6 — Joint T4
add(6, 'label', Point(-6.5, -1.3, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(6, 'label', Point(-5.7, -5.5, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(6, 'segment', Line((22, 8, 0), (22, 8, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(6, 'segment', Line((22, 8, 0), (22, 8, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(6, 'label', Point(22, 11.4, 0), color=Color.from_hex("#aaaaaa"), text='joint T4')
add(6, 'point', Point(22, 8, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 7 — Joint B0
add(7, 'label', Point(-21.5, -10.1232, 0), color=Color.from_hex("#ce4095"), text='45.0')
add(7, 'label', Point(-19.8747, -7.12528, 0), color=Color.from_hex("#1a1eb2"), text='-63.6')
add(7, 'segment', Line((8, 0, 0), (4.78571, -3.21429, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(7, 'segment', Line((4.78571, -3.21429, 0), (8, -3.21429, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(7, 'segment', Line((8, -3.21429, 0), (8, 0, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(7, 'segment', Line((8, 0, 0), (4.78571, -3.21429, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(7, 'segment', Line((4.78571, -3.21429, 0), (8, -3.21429, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(7, 'segment', Line((8, -3.21429, 0), (8, -3.21429, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(7, 'segment', Line((8, -3.21429, 0), (8, 0, 0)), color=Color.from_hex("#3f9c20"), width=0.110233)
add(7, 'label', Point(8, 3.4, 0), color=Color.from_hex("#aaaaaa"), text='joint B0')
add(7, 'point', Point(8, 0, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 8 — Joint B4
add(8, 'label', Point(-6.5, -10.1232, 0), color=Color.from_hex("#ce4095"), text='45.0')
add(8, 'label', Point(-4.87472, -3.87472, 0), color=Color.from_hex("#1a1eb2"), text='-63.6')
add(8, 'segment', Line((22, 0, 0), (25.2143, -3.21429, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(8, 'segment', Line((25.2143, -3.21429, 0), (25.2143, 0, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(8, 'segment', Line((25.2143, 0, 0), (22, 0, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(8, 'segment', Line((22, 0, 0), (25.2143, -3.21429, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(8, 'segment', Line((25.2143, -3.21429, 0), (25.2143, -3.21429, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(8, 'segment', Line((25.2143, -3.21429, 0), (25.2143, 0, 0)), color=Color.from_hex("#3f9c20"), width=0.110233)
add(8, 'segment', Line((25.2143, 0, 0), (22, 0, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(8, 'label', Point(22, 3.4, 0), color=Color.from_hex("#aaaaaa"), text='joint B4')
add(8, 'point', Point(22, 0, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 9 — Joint T1
add(9, 'label', Point(-16.5, -0.876797, 0), color=Color.from_hex("#1a1eb2"), text='-45.0')
add(9, 'label', Point(-20.8411, -5.5, 0), color=Color.from_hex("#ce4095"), text='15.0')
add(9, 'segment', Line((8, -8, 0), (4.78571, -8, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(9, 'segment', Line((4.78571, -8, 0), (4.78571, -10.1429, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(9, 'segment', Line((4.78571, -10.1429, 0), (4.78571, -11.2143, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(9, 'segment', Line((4.78571, -11.2143, 0), (8, -8, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(9, 'segment', Line((8, -8, 0), (4.78571, -8, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(9, 'segment', Line((4.78571, -8, 0), (4.78571, -10.1429, 0)), color=Color.from_hex("#3f9c20"), width=0.110233)
add(9, 'segment', Line((4.78571, -10.1429, 0), (4.78571, -11.2143, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(9, 'segment', Line((4.78571, -11.2143, 0), (8, -8, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(9, 'segment', Line((8, -8, 0), (8, -8, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(9, 'label', Point(8, -4.6, 0), color=Color.from_hex("#aaaaaa"), text='joint T1')
add(9, 'point', Point(8, -8, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 10 — Joint T3
add(10, 'label', Point(-11.5, -0.876797, 0), color=Color.from_hex("#1a1eb2"), text='-45.0')
add(10, 'label', Point(-10.8411, -5.5, 0), color=Color.from_hex("#ce4095"), text='15.0')
add(10, 'segment', Line((22, -8, 0), (22, -10.1429, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(10, 'segment', Line((22, -10.1429, 0), (22, -11.2143, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(10, 'segment', Line((22, -11.2143, 0), (25.2143, -11.2143, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(10, 'segment', Line((25.2143, -11.2143, 0), (22, -8, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(10, 'segment', Line((22, -8, 0), (22, -10.1429, 0)), color=Color.from_hex("#3f9c20"), width=0.110233)
add(10, 'segment', Line((22, -10.1429, 0), (22, -11.2143, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(10, 'segment', Line((22, -11.2143, 0), (25.2143, -11.2143, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(10, 'segment', Line((25.2143, -11.2143, 0), (25.2143, -11.2143, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(10, 'segment', Line((25.2143, -11.2143, 0), (22, -8, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(10, 'label', Point(22, -4.6, 0), color=Color.from_hex("#aaaaaa"), text='joint T3')
add(10, 'point', Point(22, -8, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 11 — Joint B1
add(11, 'label', Point(-16.5, -10.2643, 0), color=Color.from_hex("#ce4095"), text='60.0')
add(11, 'label', Point(-15.1569, -6.84315, 0), color=Color.from_hex("#1a1eb2"), text='-21.2')
add(11, 'segment', Line((8, -16, 0), (6.92857, -17.0714, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(11, 'segment', Line((6.92857, -17.0714, 0), (11.2143, -17.0714, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(11, 'segment', Line((11.2143, -17.0714, 0), (11.2143, -16, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(11, 'segment', Line((11.2143, -16, 0), (8, -16, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(11, 'segment', Line((8, -16, 0), (6.92857, -17.0714, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(11, 'segment', Line((6.92857, -17.0714, 0), (11.2143, -17.0714, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(11, 'segment', Line((11.2143, -17.0714, 0), (11.2143, -16, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(11, 'segment', Line((11.2143, -16, 0), (8, -16, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(11, 'label', Point(8, -12.6, 0), color=Color.from_hex("#aaaaaa"), text='joint B1')
add(11, 'point', Point(8, -16, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 12 — Joint B2
add(12, 'label', Point(-11.5, -10.2643, 0), color=Color.from_hex("#ce4095"), text='60.0')
add(12, 'label', Point(-15.7, -5.5, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(12, 'segment', Line((22, -16, 0), (26.2857, -16, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(12, 'segment', Line((26.2857, -16, 0), (22, -16, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(12, 'segment', Line((22, -16, 0), (26.2857, -16, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(12, 'segment', Line((26.2857, -16, 0), (26.2857, -16, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(12, 'segment', Line((26.2857, -16, 0), (22, -16, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(12, 'label', Point(22, -12.6, 0), color=Color.from_hex("#aaaaaa"), text='joint B2')
add(12, 'point', Point(22, -16, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 13 — Joint B3
add(13, 'label', Point(-10.1569, -4.15685, 0), color=Color.from_hex("#1a1eb2"), text='-21.2')
add(13, 'segment', Line((8, -24, 0), (9.07143, -25.0714, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(13, 'segment', Line((9.07143, -25.0714, 0), (12.2857, -25.0714, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(13, 'segment', Line((12.2857, -25.0714, 0), (12.2857, -24, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(13, 'segment', Line((12.2857, -24, 0), (8, -24, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(13, 'segment', Line((8, -24, 0), (9.07143, -25.0714, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(13, 'segment', Line((9.07143, -25.0714, 0), (12.2857, -25.0714, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(13, 'segment', Line((12.2857, -25.0714, 0), (12.2857, -24, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(13, 'segment', Line((12.2857, -24, 0), (8, -24, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(13, 'label', Point(8, -20.6, 0), color=Color.from_hex("#aaaaaa"), text='joint B3')
add(13, 'point', Point(8, -24, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 14 — Joint T2
add(14, 'segment', Line((22, -24, 0), (18.7857, -24, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(14, 'segment', Line((18.7857, -24, 0), (18.7857, -26.1429, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(14, 'segment', Line((18.7857, -26.1429, 0), (22, -26.1429, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(14, 'segment', Line((22, -26.1429, 0), (23.0714, -25.0714, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(14, 'segment', Line((23.0714, -25.0714, 0), (22, -24, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(14, 'segment', Line((22, -24, 0), (18.7857, -24, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(14, 'segment', Line((18.7857, -24, 0), (18.7857, -26.1429, 0)), color=Color.from_hex("#3f9c20"), width=0.110233)
add(14, 'segment', Line((18.7857, -26.1429, 0), (22, -26.1429, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(14, 'segment', Line((22, -26.1429, 0), (22, -26.1429, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(14, 'segment', Line((22, -26.1429, 0), (23.0714, -25.0714, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(14, 'segment', Line((23.0714, -25.0714, 0), (22, -24, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(14, 'label', Point(22, -20.6, 0), color=Color.from_hex("#aaaaaa"), text='joint T2')
add(14, 'point', Point(22, -24, 0), color=Color.from_hex("#ffffff"), width=0.25308)


if __name__ == "__main__":
    print("EX 6.2 — a spanning truss, joint by joint —", len(ops), "operations")
