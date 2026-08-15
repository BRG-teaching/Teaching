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
add(0, 'label', Point(-22, -19.6, 0), text='Form diagram 1:100')
add(0, 'label', Point(17, 11.6, 0), text='Force diagram — one Cremona diagram')
add(0, 'label', Point(17, 10.2, 0), text='1 unit ≙ 3.2 kN  (sheet: 1 cm ≙ 10 kN)')

# step 1 — The truss
add(1, 'polygon', Polygon([(-25, -13.6496, 0), (-25, -13.3504, 0), (-18.25, -13.3504, 0), (-18.25, -13.6496, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-25, -13.5, 0), (-18.25, -13.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-18.25, -13.5499, 0), (-18.25, -13.4501, 0), (-11.5, -13.4501, 0), (-11.5, -13.5499, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-18.25, -13.5, 0), (-11.5, -13.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-11.5, -13.5001, 0), (-11.5, -13.4999, 0), (-4.75, -13.4999, 0), (-4.75, -13.5001, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-11.5, -13.5, 0), (-4.75, -13.5, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-25, -7.04925, 0), (-25, -6.45075, 0), (-18.25, -6.45075, 0), (-18.25, -7.04925, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-25, -6.75, 0), (-18.25, -6.75, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-18.25, -6.89963, 0), (-18.25, -6.60037, 0), (-11.5, -6.60037, 0), (-11.5, -6.89963, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-18.25, -6.75, 0), (-11.5, -6.75, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-11.5, -6.79988, 0), (-11.5, -6.70012, 0), (-4.75, -6.70012, 0), (-4.75, -6.79988, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-11.5, -6.75, 0), (-4.75, -6.75, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-24.9999, -13.5, 0), (-25.0001, -13.5, 0), (-25.0001, -6.75, 0), (-24.9999, -6.75, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-25, -13.5, 0), (-25, -6.75, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-18.1502, -13.5, 0), (-18.3498, -13.5, 0), (-18.3498, -6.75, 0), (-18.1502, -6.75, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-18.25, -13.5, 0), (-18.25, -6.75, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-11.4501, -13.5, 0), (-11.5499, -13.5, 0), (-11.5499, -6.75, 0), (-11.4501, -6.75, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-11.5, -13.5, 0), (-11.5, -6.75, 0)), color=Color.from_hex("#ce4095"), width=0.129686)
add(1, 'polygon', Polygon([(-4.7499, -13.5, 0), (-4.7501, -13.5, 0), (-4.7501, -6.75, 0), (-4.7499, -6.75, 0)]), color=Color.from_hex("#e4e4e7"))
add(1, 'segment', Line((-4.75, -13.5, 0), (-4.75, -6.75, 0)), color=Color.from_hex("#b9b9bd"), width=0.129686)
add(1, 'polygon', Polygon([(-24.8504, -13.6496, 0), (-25.1496, -13.3504, 0), (-18.3996, -6.60037, 0), (-18.1004, -6.89963, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-25, -13.5, 0), (-18.25, -6.75, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-18.1502, -13.5998, 0), (-18.3498, -13.4002, 0), (-11.5998, -6.65025, 0), (-11.4002, -6.84975, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-18.25, -13.5, 0), (-11.5, -6.75, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'polygon', Polygon([(-11.4501, -13.5499, 0), (-11.5499, -13.4501, 0), (-4.79988, -6.70012, 0), (-4.70012, -6.79988, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-11.5, -13.5, 0), (-4.75, -6.75, 0)), color=Color.from_hex("#1a1eb2"), width=0.129686)
add(1, 'point', Point(-25, -13.5, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-25, -15.5, 0), text='B0')
add(1, 'point', Point(-18.25, -13.5, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-18.25, -15.5, 0), text='B1')
add(1, 'point', Point(-11.5, -13.5, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-11.5, -15.5, 0), text='B2')
add(1, 'point', Point(-4.75, -13.5, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-4.75, -15.5, 0), text='B3')
add(1, 'point', Point(-25, -6.75, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-25, -4.75, 0), text='T0')
add(1, 'point', Point(-18.25, -6.75, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-18.25, -4.75, 0), text='T1')
add(1, 'point', Point(-11.5, -6.75, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-11.5, -4.75, 0), text='T2')
add(1, 'point', Point(-4.75, -6.75, 0), color=Color.from_hex("#ffffff"), width=0.31635)
add(1, 'label', Point(-4.75, -4.75, 0), text='T3')
add(1, 'segment', Line((-25.55, -12.42, 0), (-24.8782, -11.7482, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-25.55, -13.14, 0), (-24.8782, -12.4682, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-25.55, -13.86, 0), (-24.8782, -13.1882, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-25.55, -14.58, 0), (-24.8782, -13.9082, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-25.55, -15.3, 0), (-24.8782, -14.6282, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-25.55, -5.67, 0), (-24.8782, -4.99825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-25.55, -6.39, 0), (-24.8782, -5.71825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-25.55, -7.11, 0), (-24.8782, -6.43825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-25.55, -7.83, 0), (-24.8782, -7.15825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-25.55, -8.55, 0), (-24.8782, -7.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043092)
add(1, 'segment', Line((-26.5, -4.85, 0), (-26.5, -8.65, 0)), color=Color.from_hex("#aaaaaa"), width=0.06156)
add(1, 'arrow', Line((-18.25, -3.55, 0), (-18.25, -6.75, 0)), color=Color.from_hex("#3f9c20"), width=0.155952, head=(0.537624, 0.207662))
add(1, 'label', Point(-16.05, -3.15, 0), color=Color.from_hex("#3f9c20"), text='15 kN')
add(1, 'arrow', Line((-11.5, -3.55, 0), (-11.5, -6.75, 0)), color=Color.from_hex("#3f9c20"), width=0.155952, head=(0.537624, 0.207662))
add(1, 'label', Point(-9.3, -3.15, 0), color=Color.from_hex("#3f9c20"), text='15 kN')
add(1, 'arrow', Line((-4.75, -3.55, 0), (-4.75, -6.75, 0)), color=Color.from_hex("#3f9c20"), width=0.155952, head=(0.537624, 0.207662))
add(1, 'label', Point(-2.55, -3.15, 0), color=Color.from_hex("#3f9c20"), text='15 kN')

# step 2 — a) Global equilibrium — and the load line
add(2, 'arrow', Line((-28.5777, -15.2889, 0), (-25.8944, -13.9472, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(-30.9094, -16.7547, 0), color=Color.from_hex("#3f9c20"), text='B0 = 100.6')
add(2, 'arrow', Line((-26, -4.15, 0), (-29, -4.15, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(-30.1, -2.55, 0), color=Color.from_hex("#3f9c20"), text='T0 = 90.0')
add(2, 'arrow', Line((31.0625, 1.53125, 0), (2.9375, 1.53125, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(17, 2.13125, 0), color=Color.from_hex("#3f9c20"), text='T0 90.0')
add(2, 'arrow', Line((2.4375, 1.03125, 0), (2.4375, -3.65625, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(1.8375, -1.3125, 0), color=Color.from_hex("#3f9c20"), text='15')
add(2, 'arrow', Line((2.4375, -3.65625, 0), (2.4375, -8.34375, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(1.8375, -6, 0), color=Color.from_hex("#3f9c20"), text='15')
add(2, 'arrow', Line((2.4375, -8.34375, 0), (2.4375, -13.0312, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(1.8375, -10.6875, 0), color=Color.from_hex("#3f9c20"), text='15')
add(2, 'arrow', Line((3.16111, -13.4785, 0), (31.2861, 0.584036, 0)), color=Color.from_hex("#3f9c20"), width=0.11245, head=(0.363614, 0.155952))
add(2, 'label', Point(17.4919, -6.98387, 0), color=Color.from_hex("#3f9c20"), text='B0 100.6')
add(2, 'point', Point(31.0625, 1.03125, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(2, 'label', Point(32.5525, 1.61429, 0), color=Color.from_hex("#aaaaaa"), text='a=4')
add(2, 'label', Point(-29.6, -10.125, 0), color=Color.from_hex("#aaaaaa"), text='a')
add(2, 'point', Point(2.9375, 1.03125, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(2, 'label', Point(1.74823, 2.10159, 0), color=Color.from_hex("#aaaaaa"), text='b')
add(2, 'label', Point(-21.625, -2.15, 0), color=Color.from_hex("#aaaaaa"), text='b')
add(2, 'point', Point(2.9375, -3.65625, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(2, 'label', Point(1.42733, -3.12769, 0), color=Color.from_hex("#aaaaaa"), text='c')
add(2, 'label', Point(-14.875, -2.15, 0), color=Color.from_hex("#aaaaaa"), text='c')
add(2, 'point', Point(2.9375, -8.34375, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(2, 'label', Point(1.36857, -8.65754, 0), color=Color.from_hex("#aaaaaa"), text='d')
add(2, 'label', Point(-8.125, -2.15, 0), color=Color.from_hex("#aaaaaa"), text='d')
add(2, 'point', Point(2.9375, -13.0312, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(2, 'label', Point(1.6575, -13.9913, 0), color=Color.from_hex("#aaaaaa"), text='e=3')
add(2, 'label', Point(-10.0454, -17.8639, 0), color=Color.from_hex("#aaaaaa"), text='e')
add(2, 'label', Point(-22.525, -12.2625, 0), color=Color.from_hex("#aaaaaa"), text='1')
add(2, 'label', Point(-15.775, -12.2625, 0), color=Color.from_hex("#aaaaaa"), text='2')
add(2, 'label', Point(-9.025, -12.2625, 0), color=Color.from_hex("#aaaaaa"), text='3')
add(2, 'label', Point(-23.7625, -11.025, 0), color=Color.from_hex("#aaaaaa"), text='4')
add(2, 'label', Point(-17.0125, -11.025, 0), color=Color.from_hex("#aaaaaa"), text='5')
add(2, 'label', Point(-7.225, -7.9875, 0), color=Color.from_hex("#aaaaaa"), text='6')

# step 3 — b) The zero members
add(3, 'label', Point(-8, -19.6, 0), color=Color.from_hex("#b9b9bd"), text='3 zero-force members')

# step 5 — Joint B3
add(5, 'label', Point(-8.125, -15.2, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(5, 'label', Point(-6.45, -10.125, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(5, 'segment', Line((2.9375, -13.0312, 0), (7.625, -13.0312, 0)), color=Color.from_hex("#aaaaaa"), width=0.060329)
add(5, 'segment', Line((7.625, -13.0312, 0), (17, -3.65625, 0)), color=Color.from_hex("#aaaaaa"), width=0.060329)
add(5, 'segment', Line((17, -3.65625, 0), (17, -13.0312, 0)), color=Color.from_hex("#aaaaaa"), width=0.060329)
add(5, 'segment', Line((17, -13.0312, 0), (2.9375, -13.0312, 0)), color=Color.from_hex("#aaaaaa"), width=0.060329)
add(5, 'segment', Line((2.9375, -13.0312, 0), (2.9375, -13.0312, 0)), color=Color.from_hex("#b9b9bd"), width=0.116718)
add(5, 'segment', Line((2.9375, -13.0312, 0), (2.9375, -13.0312, 0)), color=Color.from_hex("#b9b9bd"), width=0.116718)
add(5, 'point', Point(2.9375, -13.0312, 0), color=Color.from_hex("#ffffff"), width=0.2109)

# step 6 — Joint T0
add(6, 'label', Point(-21.625, -4.4515, 0), color=Color.from_hex("#ce4095"), text='90.0')
add(6, 'label', Point(-26.7, -10.125, 0), color=Color.from_hex("#b9b9bd"), text='0')
add(6, 'segment', Line((2.9375, 1.03125, 0), (31.0625, 1.03125, 0)), color=Color.from_hex("#ce4095"), width=0.116718)
add(6, 'segment', Line((31.0625, 1.03125, 0), (31.0625, 1.03125, 0)), color=Color.from_hex("#b9b9bd"), width=0.116718)
add(6, 'point', Point(31.0625, 1.03125, 0), color=Color.from_hex("#ffffff"), width=0.2109)

# step 7 — Joint T3
add(7, 'label', Point(-8.125, -4.95025, 0), color=Color.from_hex("#ce4095"), text='15.0')
add(7, 'label', Point(-6.82317, -11.4268, 0), color=Color.from_hex("#1a1eb2"), text='-21.2')
add(7, 'segment', Line((2.9375, -8.34375, 0), (7.625, -8.34375, 0)), color=Color.from_hex("#ce4095"), width=0.116718)
add(7, 'segment', Line((7.625, -8.34375, 0), (2.9375, -13.0312, 0)), color=Color.from_hex("#1a1eb2"), width=0.116718)
add(7, 'point', Point(7.625, -8.34375, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(7, 'label', Point(6.1629, -8.99357, 0), color=Color.from_hex("#aaaaaa"), text='6')

# step 8 — Joint B0
add(8, 'label', Point(-21.625, -15.4992, 0), color=Color.from_hex("#1a1eb2"), text='-45.0')
add(8, 'label', Point(-20.1237, -11.6263, 0), color=Color.from_hex("#1a1eb2"), text='-63.6')
add(8, 'segment', Line((17, -13.0312, 0), (2.9375, -13.0312, 0)), color=Color.from_hex("#1a1eb2"), width=0.116718)
add(8, 'segment', Line((31.0625, 1.03125, 0), (17, -13.0312, 0)), color=Color.from_hex("#1a1eb2"), width=0.116718)
add(8, 'point', Point(17, -13.0312, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(8, 'label', Point(18.0479, -14.2404, 0), color=Color.from_hex("#aaaaaa"), text='1')

# step 9 — Joint B2
add(9, 'label', Point(-14.875, -15.2997, 0), color=Color.from_hex("#1a1eb2"), text='-15.0')
add(9, 'label', Point(-13.2997, -10.125, 0), color=Color.from_hex("#ce4095"), text='15.0')
add(9, 'segment', Line((7.625, -13.0312, 0), (2.9375, -13.0312, 0)), color=Color.from_hex("#1a1eb2"), width=0.116718)
add(9, 'segment', Line((7.625, -13.0312, 0), (7.625, -8.34375, 0)), color=Color.from_hex("#ce4095"), width=0.116718)
add(9, 'point', Point(7.625, -13.0312, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(9, 'label', Point(6.80181, -14.4032, 0), color=Color.from_hex("#aaaaaa"), text='2')

# step 10 — Joint T1
add(10, 'label', Point(-14.875, -4.75075, 0), color=Color.from_hex("#ce4095"), text='45.0')
add(10, 'label', Point(-20.1495, -10.125, 0), color=Color.from_hex("#ce4095"), text='30.0')
add(10, 'segment', Line((2.9375, -3.65625, 0), (17, -3.65625, 0)), color=Color.from_hex("#ce4095"), width=0.116718)
add(10, 'segment', Line((17, -13.0312, 0), (17, -3.65625, 0)), color=Color.from_hex("#ce4095"), width=0.116718)
add(10, 'point', Point(17, -3.65625, 0), color=Color.from_hex("#ffffff"), width=0.2109)
add(10, 'label', Point(18.4088, -2.89769, 0), color=Color.from_hex("#aaaaaa"), text='5')

# step 11 — Joint T2
add(11, 'label', Point(-13.4734, -11.5266, 0), color=Color.from_hex("#1a1eb2"), text='-42.4')
add(11, 'segment', Line((17, -3.65625, 0), (7.625, -13.0312, 0)), color=Color.from_hex("#1a1eb2"), width=0.116718)


if __name__ == "__main__":
    print("EX 6.3 — a cantilevering truss, joint by joint —", len(ops), "operations")
