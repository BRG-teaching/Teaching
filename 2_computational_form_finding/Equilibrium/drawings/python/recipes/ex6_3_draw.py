"""EX 6.3 — a cantilevering truss, joint by joint

Auto-generated from ops/ex6_3.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-16, -12.5, 0), text='Form diagram 1:100')
add(0, 'label', Point(15, 15.4, 0), text='Force diagram — one polygon per joint')
add(0, 'label', Point(15, 14, 0), text='1 unit ≙ 16 kN  (sheet: 1 cm ≙ 10 kN)')

# step 1 — The truss
add(1, 'polygon', Polygon([(-22, -4.14963, 0), (-22, -3.85038, 0), (-16.5, -3.85038, 0), (-16.5, -4.14963, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-22, -4, 0), (-16.5, -4, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-16.5, -4.04988, 0), (-16.5, -3.95012, 0), (-11, -3.95012, 0), (-11, -4.04988, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-16.5, -4, 0), (-11, -4, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-11, -4.0001, 0), (-11, -3.9999, 0), (-5.5, -3.9999, 0), (-5.5, -4.0001, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-11, -4, 0), (-5.5, -4, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-22, 1.20075, 0), (-22, 1.79925, 0), (-16.5, 1.79925, 0), (-16.5, 1.20075, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-22, 1.5, 0), (-16.5, 1.5, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-16.5, 1.35038, 0), (-16.5, 1.64962, 0), (-11, 1.64962, 0), (-11, 1.35038, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-16.5, 1.5, 0), (-11, 1.5, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-11, 1.45013, 0), (-11, 1.54987, 0), (-5.5, 1.54987, 0), (-5.5, 1.45013, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-11, 1.5, 0), (-5.5, 1.5, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-21.9999, -4, 0), (-22.0001, -4, 0), (-22.0001, 1.5, 0), (-21.9999, 1.5, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-22, -4, 0), (-22, 1.5, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-16.4002, -4, 0), (-16.5998, -4, 0), (-16.5998, 1.5, 0), (-16.4002, 1.5, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-16.5, -4, 0), (-16.5, 1.5, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-10.9501, -4, 0), (-11.0499, -4, 0), (-11.0499, 1.5, 0), (-10.9501, 1.5, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-11, -4, 0), (-11, 1.5, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-5.4999, -4, 0), (-5.5001, -4, 0), (-5.5001, 1.5, 0), (-5.4999, 1.5, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-5.5, -4, 0), (-5.5, 1.5, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-21.8504, -4.14963, 0), (-22.1496, -3.85038, 0), (-16.6496, 1.64962, 0), (-16.3504, 1.35038, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-22, -4, 0), (-16.5, 1.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-16.4002, -4.09975, 0), (-16.5998, -3.90025, 0), (-11.0998, 1.59975, 0), (-10.9002, 1.40025, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-16.5, -4, 0), (-11, 1.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-10.9501, -4.04988, 0), (-11.0499, -3.95012, 0), (-5.54988, 1.54987, 0), (-5.45012, 1.45013, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-11, -4, 0), (-5.5, 1.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'point', Point(-22, -4, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-22, -6, 0), text='B0')
add(1, 'point', Point(-16.5, -4, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-16.5, -6, 0), text='B1')
add(1, 'point', Point(-11, -4, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-11, -6, 0), text='B2')
add(1, 'point', Point(-5.5, -4, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-5.5, -6, 0), text='B3')
add(1, 'point', Point(-22, 1.5, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-22, 3.5, 0), text='T0')
add(1, 'point', Point(-16.5, 1.5, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-16.5, 3.5, 0), text='T1')
add(1, 'point', Point(-11, 1.5, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-11, 3.5, 0), text='T2')
add(1, 'point', Point(-5.5, 1.5, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-5.5, 3.5, 0), text='T3')
add(1, 'segment', Line((-22.6, -2.6, 0), (-23.4, -2, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-22.6, -3.3, 0), (-23.4, -2.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-22.6, -4, 0), (-23.4, -3.4, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-22.6, -4.7, 0), (-23.4, -4.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-22.6, -5.4, 0), (-23.4, -4.8, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-22.6, 2.9, 0), (-23.4, 3.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-22.6, 2.2, 0), (-23.4, 2.8, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-22.6, 1.5, 0), (-23.4, 2.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-22.6, 0.8, 0), (-23.4, 1.4, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-22.6, 0.1, 0), (-23.4, 0.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-23.5, 3.4, 0), (-23.5, -0.4, 0)), color=Color.from_hex("#aaaaaa"), width=0.06156)
add(1, 'arrow', Line((-16.5, 5.5, 0), (-16.5, 1.5, 0)), color=Color.from_hex("#3f9c20"), width=0.155952, head=(0.537624, 0.207662))
add(1, 'label', Point(-14.3, 5.9, 0), color=Color.from_hex("#3f9c20"), text='15 kN')
add(1, 'arrow', Line((-11, 5.5, 0), (-11, 1.5, 0)), color=Color.from_hex("#3f9c20"), width=0.155952, head=(0.537624, 0.207662))
add(1, 'label', Point(-8.8, 5.9, 0), color=Color.from_hex("#3f9c20"), text='15 kN')
add(1, 'arrow', Line((-5.5, 5.5, 0), (-5.5, 1.5, 0)), color=Color.from_hex("#3f9c20"), width=0.155952, head=(0.537624, 0.207662))
add(1, 'label', Point(-3.3, 5.9, 0), color=Color.from_hex("#3f9c20"), text='15 kN')

# step 2 — a) Global equilibrium
add(2, 'arrow', Line((-25.7566, -5.8783, 0), (-22, -4, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(-29.3566, -6.8783, 0), color=Color.from_hex("#3f9c20"), text='B0 = 100.6')
add(2, 'arrow', Line((-17.8, 2.02155, 0), (-22, 2.02155, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(-21.4, 2.9, 0), color=Color.from_hex("#3f9c20"), text='T0 = 90.0')

# step 3 — b) The zero members
add(3, 'label', Point(-16, -15, 0), color=Color.from_hex("#b9b9bd"), text='3 zero-force members')

# step 4 — c) Now joint by joint
add(4, 'label', Point(-19.25, -5.99925, 0), color=Color.from_hex("#1a1eb2"), text='-45.0')
add(4, 'label', Point(-13.75, -5.79975, 0), color=Color.from_hex("#1a1eb2"), text='-15.0')
add(4, 'label', Point(-8.25, -5.7, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(4, 'label', Point(-19.25, 3.7985, 0), color=Color.from_hex("#ce4095"), text='90.0')
add(4, 'label', Point(-13.75, 3.49925, 0), color=Color.from_hex("#ce4095"), text='45.0')
add(4, 'label', Point(-8.25, 3.29975, 0), color=Color.from_hex("#ce4095"), text='15.0')
add(4, 'label', Point(-23.7, -1.25, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(4, 'label', Point(-18.3995, -1.25, 0), color=Color.from_hex("#ce4095"), text='30.0')
add(4, 'label', Point(-12.7997, -1.25, 0), color=Color.from_hex("#ce4095"), text='15.0')
add(4, 'label', Point(-7.2, -1.25, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(4, 'label', Point(-17.7487, -2.75133, 0), color=Color.from_hex("#1a1eb2"), text='-63.6')
add(4, 'label', Point(-12.3484, -2.65158, 0), color=Color.from_hex("#1a1eb2"), text='-42.4')
add(4, 'label', Point(-6.94817, -2.55183, 0), color=Color.from_hex("#1a1eb2"), text='-21.2')

# step 5 — Joint B3
add(5, 'segment', Line((8, 8, 0), (8, 8, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(5, 'segment', Line((8, 8, 0), (8, 8, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(5, 'label', Point(8, 11.4, 0), color=Color.from_hex("#aaaaaa"), text='joint B3')
add(5, 'point', Point(8, 8, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 6 — Joint T0
add(6, 'segment', Line((23, 8, 0), (28.625, 8, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(6, 'segment', Line((28.625, 8, 0), (23, 8, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(6, 'segment', Line((23, 8, 0), (28.625, 8, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(6, 'segment', Line((28.625, 8, 0), (23, 8, 0)), color=Color.from_hex("#3f9c20"), width=0.110233)
add(6, 'segment', Line((23, 8, 0), (23, 8, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(6, 'label', Point(23, 11.4, 0), color=Color.from_hex("#aaaaaa"), text='joint T0')
add(6, 'point', Point(23, 8, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 7 — Joint T3
add(7, 'segment', Line((8, -1, 0), (8, -1.9375, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(7, 'segment', Line((8, -1.9375, 0), (8.9375, -1, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(7, 'segment', Line((8.9375, -1, 0), (8, -1, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(7, 'segment', Line((8, -1, 0), (8, -1.9375, 0)), color=Color.from_hex("#3f9c20"), width=0.110233)
add(7, 'segment', Line((8, -1.9375, 0), (8, -1.9375, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(7, 'segment', Line((8, -1.9375, 0), (8.9375, -1, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(7, 'segment', Line((8.9375, -1, 0), (8, -1, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(7, 'label', Point(8, 2.4, 0), color=Color.from_hex("#aaaaaa"), text='joint T3')
add(7, 'point', Point(8, -1, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 8 — Joint B0
add(8, 'segment', Line((23, -1, 0), (20.1875, -1, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(8, 'segment', Line((20.1875, -1, 0), (17.375, -3.8125, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(8, 'segment', Line((17.375, -3.8125, 0), (23, -1, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(8, 'segment', Line((23, -1, 0), (20.1875, -1, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(8, 'segment', Line((20.1875, -1, 0), (20.1875, -1, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(8, 'segment', Line((20.1875, -1, 0), (17.375, -3.8125, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(8, 'segment', Line((17.375, -3.8125, 0), (23, -1, 0)), color=Color.from_hex("#3f9c20"), width=0.110233)
add(8, 'label', Point(23, 2.4, 0), color=Color.from_hex("#aaaaaa"), text='joint B0')
add(8, 'point', Point(23, -1, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 9 — Joint B2
add(9, 'segment', Line((8, -10, 0), (7.0625, -10.9375, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(9, 'segment', Line((7.0625, -10.9375, 0), (8, -10.9375, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(9, 'segment', Line((8, -10.9375, 0), (8, -10, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(9, 'segment', Line((8, -10, 0), (7.0625, -10.9375, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(9, 'segment', Line((7.0625, -10.9375, 0), (8, -10.9375, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(9, 'segment', Line((8, -10.9375, 0), (8, -10.9375, 0)), color=Color.from_hex("#b9b9bd"), width=0.110233)
add(9, 'segment', Line((8, -10.9375, 0), (8, -10, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(9, 'label', Point(8, -6.6, 0), color=Color.from_hex("#aaaaaa"), text='joint B2')
add(9, 'point', Point(8, -10, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 10 — Joint T1
add(10, 'segment', Line((23, -10, 0), (23, -10.9375, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(10, 'segment', Line((23, -10.9375, 0), (23, -12.8125, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(10, 'segment', Line((23, -12.8125, 0), (25.8125, -12.8125, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(10, 'segment', Line((25.8125, -12.8125, 0), (28.625, -10, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(10, 'segment', Line((28.625, -10, 0), (23, -10, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(10, 'segment', Line((23, -10, 0), (23, -10.9375, 0)), color=Color.from_hex("#3f9c20"), width=0.110233)
add(10, 'segment', Line((23, -10.9375, 0), (23, -12.8125, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(10, 'segment', Line((23, -12.8125, 0), (25.8125, -12.8125, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(10, 'segment', Line((25.8125, -12.8125, 0), (28.625, -10, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(10, 'segment', Line((28.625, -10, 0), (23, -10, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(10, 'label', Point(23, -6.6, 0), color=Color.from_hex("#aaaaaa"), text='joint T1')
add(10, 'point', Point(23, -10, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 11 — Joint T2
add(11, 'segment', Line((8, -19, 0), (8, -19.9375, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(11, 'segment', Line((8, -19.9375, 0), (8, -20.875, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(11, 'segment', Line((8, -20.875, 0), (8.9375, -20.875, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(11, 'segment', Line((8.9375, -20.875, 0), (10.8125, -19, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(11, 'segment', Line((10.8125, -19, 0), (8, -19, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(11, 'segment', Line((8, -19, 0), (8, -19.9375, 0)), color=Color.from_hex("#3f9c20"), width=0.110233)
add(11, 'segment', Line((8, -19.9375, 0), (8, -20.875, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(11, 'segment', Line((8, -20.875, 0), (8.9375, -20.875, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(11, 'segment', Line((8.9375, -20.875, 0), (10.8125, -19, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(11, 'segment', Line((10.8125, -19, 0), (8, -19, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(11, 'label', Point(8, -15.6, 0), color=Color.from_hex("#aaaaaa"), text='joint T2')
add(11, 'point', Point(8, -19, 0), color=Color.from_hex("#ffffff"), width=0.25308)

# step 12 — Joint B1
add(12, 'segment', Line((23, -19, 0), (22.0625, -19, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(12, 'segment', Line((22.0625, -19, 0), (20.1875, -20.875, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(12, 'segment', Line((20.1875, -20.875, 0), (23, -20.875, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(12, 'segment', Line((23, -20.875, 0), (23, -19, 0)), color=Color.from_hex("#aaaaaa"), width=0.095213)
add(12, 'segment', Line((23, -19, 0), (22.0625, -19, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(12, 'segment', Line((22.0625, -19, 0), (20.1875, -20.875, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(12, 'segment', Line((20.1875, -20.875, 0), (23, -20.875, 0)), color=Color.from_hex("#1a1eb2"), width=0.110233)
add(12, 'segment', Line((23, -20.875, 0), (23, -19, 0)), color=Color.from_hex("#ce4095"), width=0.110233)
add(12, 'label', Point(23, -15.6, 0), color=Color.from_hex("#aaaaaa"), text='joint B1')
add(12, 'point', Point(23, -19, 0), color=Color.from_hex("#ffffff"), width=0.25308)


if __name__ == "__main__":
    print("EX 6.3 — a cantilevering truss, joint by joint —", len(ops), "operations")
