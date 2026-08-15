"""Drawing 4 — Resultant of Non-concurrent Forces

Auto-generated from ops/view_4.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-5, 23.8, 0), text='Form Diagram')
add(0, 'label', Point(95, 23.8, 0), text='Force Diagram')
add(0, 'label', Point(95, 20.6, 0), text='1 unit :: 0.40 kN')

# step 1 — Force 1 — in both diagrams
add(1, 'polyline', Polyline([(-19.3806, 19.6294, 0), (-14.1428, -55.2746, 0)]), color=Color.from_hex("#aaaaaa"), dash=1.1)
add(1, 'arrow', Line((-21.797, 10.5272, 0), (-21.3087, 3.54426, 0)), color=Color.from_hex("#3f9c20"), width=0.4752, head=(1.512, 0.576))
add(1, 'arrow', Line((80.2804, 12.9387, 0), (80.978, 2.9631, 0)), color=Color.from_hex("#3f9c20"), width=0.4752, head=(1.512, 0.576))
add(1, 'point', Point(-18.2707, 3.7567, 0), color=Color.from_hex("#ffffff"), width=0.8)
add(1, 'point', Point(-18.759, 10.7396, 0), color=Color.from_hex("#ffffff"), width=0.8)
add(1, 'point', Point(77.94, 2.75066, 0), color=Color.from_hex("#ffffff"), width=0.55)
add(1, 'point', Point(77.2424, 12.7263, 0), color=Color.from_hex("#ffffff"), width=0.8)
add(1, 'label', Point(-20.3656, 3.61021, 0), text='A')
add(1, 'label', Point(78.8424, 14.3263, 0), text='H₁')
add(1, 'label', Point(-16.6195, 7.38071, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(1, 'label', Point(75.3965, 7.58501, 0), color=Color.from_hex("#3f9c20"), text='F₁')

# step 2 — Force 2
add(2, 'polyline', Polyline([(-9.27487, 19.6294, 0), (-5.86104, -55.2746, 0)]), color=Color.from_hex("#aaaaaa"), dash=1.1)
add(2, 'arrow', Line((-11.915, 10.6667, 0), (-11.5963, 3.67394, 0)), color=Color.from_hex("#3f9c20"), width=0.4752, head=(1.512, 0.576))
add(2, 'arrow', Line((80.9822, 2.88931, 0), (81.5514, -9.59772, 0)), color=Color.from_hex("#3f9c20"), width=0.4752, head=(1.512, 0.576))
add(2, 'point', Point(-8.554, 3.8126, 0), color=Color.from_hex("#ffffff"), width=0.8)
add(2, 'point', Point(-8.8727, 10.8053, 0), color=Color.from_hex("#ffffff"), width=0.8)
add(2, 'point', Point(78.5091, -9.73638, 0), color=Color.from_hex("#ffffff"), width=0.55)
add(2, 'label', Point(-10.6518, 3.71699, 0), text='B')
add(2, 'label', Point(-6.81532, 7.39548, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(2, 'label', Point(76.0268, -3.59302, 0), color=Color.from_hex("#3f9c20"), text='F₂')

# step 3 — Force 3
add(3, 'polyline', Polyline([(3.05682, 19.6294, 0), (-8.60774, -55.2746, 0)]), color=Color.from_hex("#aaaaaa"), dash=1.1)
add(3, 'arrow', Line((-1.93205, 7.38524, 0), (-3.00916, 0.468606, 0)), color=Color.from_hex("#3f9c20"), width=0.4752, head=(1.512, 0.576))
add(3, 'arrow', Line((81.5182, -10.205, 0), (79.7872, -21.321, 0)), color=Color.from_hex("#3f9c20"), width=0.4752, head=(1.512, 0.576))
add(3, 'point', Point(0, 0, 0), color=Color.from_hex("#ffffff"), width=0.8)
add(3, 'point', Point(1.0771, 6.91664, 0), color=Color.from_hex("#ffffff"), width=0.8)
add(3, 'point', Point(76.778, -20.8524, 0), color=Color.from_hex("#ffffff"), width=0.55)
add(3, 'label', Point(-2.07499, 0.323132, 0), text='C')
add(3, 'label', Point(2.41593, 3.16596, 0), color=Color.from_hex("#3f9c20"), text='F₃')
add(3, 'label', Point(75.4698, -14.9559, 0), color=Color.from_hex("#3f9c20"), text='F₃')

# step 4 — Force 4
add(4, 'polyline', Polyline([(12.5769, 19.6294, 0), (4.42015, -55.2746, 0)]), color=Color.from_hex("#aaaaaa"), dash=1.1)
add(4, 'arrow', Line((8.53837, 10.6746, 0), (7.78057, 3.71579, 0)), color=Color.from_hex("#3f9c20"), width=0.4752, head=(1.512, 0.576))
add(4, 'arrow', Line((79.8056, -21.1821, 0), (78.723, -31.1233, 0)), color=Color.from_hex("#3f9c20"), width=0.4752, head=(1.512, 0.576))
add(4, 'point', Point(10.8081, 3.3861, 0), color=Color.from_hex("#ffffff"), width=0.8)
add(4, 'point', Point(11.5659, 10.345, 0), color=Color.from_hex("#ffffff"), width=0.8)
add(4, 'point', Point(75.6955, -30.7936, 0), color=Color.from_hex("#ffffff"), width=0.55)
add(4, 'label', Point(8.72044, 3.61344, 0), text='D')
add(4, 'label', Point(13.0758, 6.65984, 0), color=Color.from_hex("#3f9c20"), text='F₄')
add(4, 'label', Point(74.0497, -25.5848, 0), color=Color.from_hex("#3f9c20"), text='F₄')

# step 5 — Force 5
add(5, 'polyline', Polyline([(25.4888, 19.6294, 0), (1.14523, -55.2746, 0)]), color=Color.from_hex("#aaaaaa"), dash=1.1)
add(5, 'arrow', Line((15.2703, -1.95925, 0), (17.4339, 4.69799, 0)), color=Color.from_hex("#3f9c20"), width=0.4752, head=(1.512, 0.576))
add(5, 'arrow', Line((78.5918, -31.7349, 0), (84.0007, -15.0918, 0)), color=Color.from_hex("#3f9c20"), width=0.4752, head=(1.512, 0.576))
add(5, 'point', Point(20.3302, 3.7567, 0), color=Color.from_hex("#ffffff"), width=0.8)
add(5, 'point', Point(18.1666, -2.90055, 0), color=Color.from_hex("#ffffff"), width=0.8)
add(5, 'point', Point(81.1044, -14.1505, 0), color=Color.from_hex("#ffffff"), width=0.55)
add(5, 'label', Point(22.3274, 3.10763, 0), text='E')
add(5, 'label', Point(17.4414, 1.01534, 0), color=Color.from_hex("#3f9c20"), text='F₅')
add(5, 'label', Point(80.4922, -23.1521, 0), color=Color.from_hex("#3f9c20"), text='F₅')

# step 6 — Force 6
add(6, 'polyline', Polyline([(14.1859, 19.6294, 0), (71.8043, -55.2746, 0)]), color=Color.from_hex("#aaaaaa"), dash=1.1)
add(6, 'arrow', Line((24.3632, 1.40394, 0), (28.6312, -4.14443, 0)), color=Color.from_hex("#3f9c20"), width=0.4752, head=(1.512, 0.576))
add(6, 'arrow', Line((83.5183, -12.2937, 0), (94.1882, -26.1646, 0)), color=Color.from_hex("#3f9c20"), width=0.4752, head=(1.512, 0.576))
add(6, 'point', Point(31.0451, -2.2876, 0), color=Color.from_hex("#ffffff"), width=0.8)
add(6, 'point', Point(26.7771, 3.26077, 0), color=Color.from_hex("#ffffff"), width=0.8)
add(6, 'point', Point(91.7744, -28.0214, 0), color=Color.from_hex("#ffffff"), width=0.55)
add(6, 'label', Point(29.3806, -3.56799, 0), text='F')
add(6, 'label', Point(30.4171, 1.64503, 0), color=Color.from_hex("#3f9c20"), text='F₆')
add(6, 'label', Point(84.6956, -22.4273, 0), color=Color.from_hex("#3f9c20"), text='F₆')

# step 7 — Pole o′ and rays
add(7, 'segment', Line((120.216, -5.2445, 0), (77.2424, 12.7263, 0)), color=Color.from_hex("#aaaaaa"), width=0.1584)
add(7, 'segment', Line((120.216, -5.2445, 0), (77.94, 2.75066, 0)), color=Color.from_hex("#aaaaaa"), width=0.1584)
add(7, 'segment', Line((120.216, -5.2445, 0), (78.5091, -9.73638, 0)), color=Color.from_hex("#aaaaaa"), width=0.1584)
add(7, 'segment', Line((120.216, -5.2445, 0), (76.778, -20.8524, 0)), color=Color.from_hex("#aaaaaa"), width=0.1584)
add(7, 'segment', Line((120.216, -5.2445, 0), (75.6955, -30.7936, 0)), color=Color.from_hex("#aaaaaa"), width=0.1584)
add(7, 'segment', Line((120.216, -5.2445, 0), (81.1044, -14.1505, 0)), color=Color.from_hex("#aaaaaa"), width=0.1584)
add(7, 'segment', Line((120.216, -5.2445, 0), (91.7744, -28.0214, 0)), color=Color.from_hex("#aaaaaa"), width=0.1584)
add(7, 'point', Point(120.216, -5.2445, 0), color=Color.from_hex("#ffffff"), width=0.8)
add(7, 'label', Point(122.816, -4.6445, 0), text='o′')
add(7, 'label', Point(99.3079, 5.12477, 0), color=Color.from_hex("#aaaaaa"), text='1')
add(7, 'label', Point(99.3567, 0.226955, 0), color=Color.from_hex("#aaaaaa"), text='2')
add(7, 'label', Point(99.5231, -8.98181, 0), color=Color.from_hex("#aaaaaa"), text='3')
add(7, 'label', Point(99.0042, -14.4601, 0), color=Color.from_hex("#aaaaaa"), text='4')
add(7, 'label', Point(98.7023, -19.3201, 0), color=Color.from_hex("#aaaaaa"), text='5')
add(7, 'label', Point(100.993, -11.1601, 0), color=Color.from_hex("#aaaaaa"), text='6')
add(7, 'label', Point(106.933, -17.8038, 0), color=Color.from_hex("#aaaaaa"), text='7')

# step 8 — String ∥ ray o′–H₁
add(8, 'segment', Line((-25.2688, -19.1522, 0), (-16.4097, -22.8569, 0)), color=Color.from_hex("#aaaaaa"), width=0.288)
add(8, 'point', Point(-16.4097, -22.8569, 0), color=Color.from_hex("#ffffff"), width=0.55)
add(8, 'point', Point(-25.2688, -19.1522, 0), color=Color.from_hex("#ffffff"), width=0.8)
add(8, 'label', Point(-27.9688, -19.1522, 0), text='O₆')
add(8, 'label', Point(-21.4951, -22.573, 0), color=Color.from_hex("#aaaaaa"), text='1')

# step 9 — String ∥ ray o′–I₁
add(9, 'segment', Line((-16.4097, -22.8569, 0), (-7.25964, -24.5874, 0)), color=Color.from_hex("#aaaaaa"), width=0.288)
add(9, 'point', Point(-7.25964, -24.5874, 0), color=Color.from_hex("#ffffff"), width=0.55)
add(9, 'label', Point(-12.1506, -25.3926, 0), color=Color.from_hex("#aaaaaa"), text='2')

# step 10 — String ∥ ray o′–J₁
add(10, 'segment', Line((-7.25964, -24.5874, 0), (-3.77039, -24.2116, 0)), color=Color.from_hex("#aaaaaa"), width=0.288)
add(10, 'point', Point(-3.77039, -24.2116, 0), color=Color.from_hex("#ffffff"), width=0.55)
add(10, 'label', Point(-5.33298, -26.0897, 0), color=Color.from_hex("#aaaaaa"), text='3')

# step 11 — String ∥ ray o′–K₁
add(11, 'segment', Line((-3.77039, -24.2116, 0), (8.27409, -19.8838, 0)), color=Color.from_hex("#aaaaaa"), width=0.288)
add(11, 'point', Point(8.27409, -19.8838, 0), color=Color.from_hex("#ffffff"), width=0.55)
add(11, 'label', Point(2.8267, -23.6476, 0), color=Color.from_hex("#aaaaaa"), text='4')

# step 12 — String ∥ ray o′–L₁
add(12, 'segment', Line((8.27409, -19.8838, 0), (13.6497, -16.7989, 0)), color=Color.from_hex("#aaaaaa"), width=0.288)
add(12, 'point', Point(13.6497, -16.7989, 0), color=Color.from_hex("#ffffff"), width=0.55)
add(12, 'label', Point(11.808, -19.8158, 0), color=Color.from_hex("#aaaaaa"), text='5')

# step 13 — String ∥ ray o′–M₁
add(13, 'segment', Line((13.6497, -16.7989, 0), (37.951, -11.2653, 0)), color=Color.from_hex("#aaaaaa"), width=0.288)
add(13, 'point', Point(37.951, -11.2653, 0), color=Color.from_hex("#ffffff"), width=0.55)
add(13, 'label', Point(25.4229, -12.3745, 0), color=Color.from_hex("#aaaaaa"), text='6')

# step 14 — Close the funicular
add(14, 'polyline', Polyline([(37.951, -11.2653, 0), (9.79356, -33.8147, 0)]), color=Color.from_hex("#aaaaaa"), dash=1.1)
add(14, 'polyline', Polyline([(-16.4097, -22.8569, 0), (9.79356, -33.8147, 0)]), color=Color.from_hex("#aaaaaa"), dash=1.1)
add(14, 'point', Point(9.79356, -33.8147, 0), color=Color.from_hex("#ffffff"), width=0.55)
add(14, 'label', Point(11.1936, -36.0147, 0), text='T₂')
add(14, 'label', Point(24.9349, -23.8669, 0), color=Color.from_hex("#aaaaaa"), text='7')

# step 15 — The resultant — in both diagrams
add(15, 'arrow', Line((77.2424, 12.7263, 0), (91.7744, -28.0214, 0)), color=Color.from_hex("#3f9c20"), width=0.576, dash=1.1, head=(1.872, 0.72))
add(15, 'segment', Line((37.951, -11.2653, 0), (45.7097, -5.05187, 0)), color=Color.from_hex("#aaaaaa"), width=0.288)
add(15, 'polyline', Polyline([(-9.26632, 19.6294, 0), (17.4469, -55.2746, 0)]), color=Color.from_hex("#aaaaaa"), dash=1.1)
add(15, 'arrow', Line((-0.552456, -4.80436, 0), (4.15028, -17.9909, 0)), color=Color.from_hex("#3f9c20"), width=0.576, dash=1.1, head=(1.872, 0.72))
add(15, 'point', Point(-0.552456, -4.80436, 0), color=Color.from_hex("#ffffff"), width=0.8)
add(15, 'label', Point(3.87108, -10.6586, 0), color=Color.from_hex("#3f9c20"), text='R')
add(15, 'label', Point(82.0595, -8.52093, 0), color=Color.from_hex("#3f9c20"), text='R')
add(15, 'label', Point(113, 17, 0), color=Color.from_hex("#3f9c20"), text='R = 17.3 kN')


if __name__ == "__main__":
    print("Drawing 4 — Resultant of Non-concurrent Forces —", len(ops), "operations")
