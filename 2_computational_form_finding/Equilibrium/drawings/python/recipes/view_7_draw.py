"""Drawing 7 — Funicular Line Through Three Points 1

Auto-generated from ops/view_7.json — the drawing as literal COMPAS
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
add(0, 'label', Point(4.5, 31.6, 0), text='Form Diagram')
add(0, 'label', Point(61, 31.6, 0), text='Force Diagram')
add(0, 'label', Point(61, 29.9, 0), text='1 unit :: 0.59 kN')

# step 1 — Three points to pass through
add(1, 'polyline', Polyline([(0, 0, 0), (0, 15, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6)
add(1, 'polyline', Polyline([(40, 0, 0), (40, 15, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6)
add(1, 'polyline', Polyline([(20, 0, 0), (20, 19.6, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6)
add(1, 'point', Point(0, 12.5637, 0), color=Color.from_hex("#ffffff"), width=0.45)
add(1, 'point', Point(40, 11.8519, 0), color=Color.from_hex("#ffffff"), width=0.45)
add(1, 'point', Point(20, 3.7055, 0), color=Color.from_hex("#ffffff"), width=0.45)
add(1, 'label', Point(-1.7, 12.7637, 0), text='E')
add(1, 'label', Point(41.7, 12.0519, 0), text='F')
add(1, 'label', Point(21.5, 2.8055, 0), text='N')

# step 2 — Span E–N: loads 1 and 2
add(2, 'polyline', Polyline([(5.44743, 21.5, 0), (7.63882, -7.5, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6)
add(2, 'arrow', Line((5.2896, 23.5886, 0), (5.591, 19.6, 0)), color=Color.from_hex("#3f9c20"), width=0.2592, head=(0.828, 0.3096))
add(2, 'label', Point(6.7903, 21.7943, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(2, 'label', Point(64.074, 20.785, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(2, 'polyline', Polyline([(15.1725, 21.5, 0), (14.387, -7.5, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6)
add(2, 'arrow', Line((15.2293, 23.5985, 0), (15.121, 19.6, 0)), color=Color.from_hex("#3f9c20"), width=0.2592, head=(0.828, 0.3096))
add(2, 'label', Point(16.5252, 21.7993, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(2, 'label', Point(64.3206, 13.8281, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(2, 'arrow', Line((62.4038, 24.8229, 0), (63.0443, 16.3471, 0)), color=Color.from_hex("#3f9c20"), width=0.2592, head=(0.828, 0.3096))
add(2, 'arrow', Line((63.0443, 16.3471, 0), (62.897, 10.9091, 0)), color=Color.from_hex("#3f9c20"), width=0.2592, head=(0.828, 0.3096))
add(2, 'arrow', Line((62.4038, 24.8229, 0), (62.897, 10.9091, 0)), color=Color.from_hex("#aaaaaa"), width=0.2448, dash=0.8, head=(0.00072, 0.00072), until=22)
add(2, 'polyline', Polyline([(-0.316756, 21.5, 0), (0.711178, -7.5, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6, until=22)
add(2, 'polyline', Polyline([(19.3693, 21.5, 0), (20.3972, -7.5, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6, until=22)
add(2, 'point', Point(5.591, 19.6, 0), color=Color.from_hex("#ffffff"), width=0.45)
add(2, 'point', Point(5.2896, 23.5886, 0), color=Color.from_hex("#ffffff"), width=0.45)
add(2, 'point', Point(15.121, 19.6, 0), color=Color.from_hex("#ffffff"), width=0.45)
add(2, 'point', Point(15.2293, 23.5985, 0), color=Color.from_hex("#ffffff"), width=0.45)
add(2, 'point', Point(62.4038, 24.8229, 0), color=Color.from_hex("#ffffff"), width=0.45)
add(2, 'point', Point(63.0443, 16.3471, 0), color=Color.from_hex("#ffffff"), width=0.34)
add(2, 'point', Point(62.897, 10.9091, 0), color=Color.from_hex("#ffffff"), width=0.34)
add(2, 'label', Point(63.9038, 25.5229, 0), text='I₁')

# step 3 — Trial pole o′₁
add(3, 'segment', Line((62.4038, 24.8229, 0), (80.7799, 14.541, 0)), color=Color.from_hex("#aaaaaa"), width=0.0936, until=22)
add(3, 'segment', Line((63.0443, 16.3471, 0), (80.7799, 14.541, 0)), color=Color.from_hex("#aaaaaa"), width=0.0936, until=22)
add(3, 'segment', Line((62.897, 10.9091, 0), (80.7799, 14.541, 0)), color=Color.from_hex("#aaaaaa"), width=0.0936, until=22)
add(3, 'point', Point(80.7799, 14.541, 0), color=Color.from_hex("#ffffff"), width=0.45, until=22)
add(3, 'label', Point(82.3799, 14.741, 0), text='o′₁', until=22)

# step 4 — Trial string ∥ o′₁–I₁
add(4, 'segment', Line((0.44634, -0.028392, 0), (7.36683, -3.90058, 0)), color=Color.from_hex("#aaaaaa"), width=0.1584, until=22)
add(4, 'point', Point(0.44634, -0.028392, 0), color=Color.from_hex("#ffffff"), width=0.45, until=22)
add(4, 'point', Point(7.36683, -3.90058, 0), color=Color.from_hex("#ffffff"), width=0.34, until=22)

# step 5 — Trial string ∥ o′₁–V₁
add(5, 'segment', Line((7.36683, -3.90058, 0), (14.4649, -4.6234, 0)), color=Color.from_hex("#aaaaaa"), width=0.1584, until=22)
add(5, 'point', Point(14.4649, -4.6234, 0), color=Color.from_hex("#ffffff"), width=0.34, until=22)

# step 6 — Trial string ∥ o′₁–W₁
add(6, 'segment', Line((14.4649, -4.6234, 0), (20.2536, -3.44775, 0)), color=Color.from_hex("#aaaaaa"), width=0.1584, until=22)
add(6, 'point', Point(20.2536, -3.44775, 0), color=Color.from_hex("#ffffff"), width=0.34, until=22)

# step 7 — Closing → division point i₁
add(7, 'polyline', Polyline([(0.44634, -0.028392, 0), (20.2536, -3.44775, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6, until=22)
add(7, 'polyline', Polyline([(80.7799, 14.541, 0), (62.6574, 17.6695, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6, until=22)
add(7, 'point', Point(62.6574, 17.6695, 0), color=Color.from_hex("#ffffff"), width=0.34, until=22)
add(7, 'label', Point(64.2574, 18.1695, 0), color=Color.from_hex("#aaaaaa"), text='i₁', until=22)

# step 8 — Span N–F: loads 3 and 4
add(8, 'polyline', Polyline([(25.8731, 21.5, 0), (31.0224, -7.5, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6)
add(8, 'arrow', Line((25.5112, 23.5384, 0), (26.2105, 19.6, 0)), color=Color.from_hex("#3f9c20"), width=0.2592, head=(0.828, 0.3096))
add(8, 'label', Point(27.2109, 21.7692, 0), color=Color.from_hex("#3f9c20"), text='F₃')
add(8, 'label', Point(64.8117, 7.9288, 0), color=Color.from_hex("#3f9c20"), text='F₃')
add(8, 'polyline', Polyline([(35.4942, 21.5, 0), (32.6039, -7.5, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6)
add(8, 'arrow', Line((35.7015, 23.5803, 0), (35.3048, 19.6, 0)), color=Color.from_hex("#3f9c20"), width=0.2592, head=(0.828, 0.3096))
add(8, 'label', Point(36.8531, 21.7901, 0), color=Color.from_hex("#3f9c20"), text='F₄')
add(8, 'label', Point(65.0897, 1.87279, 0), color=Color.from_hex("#3f9c20"), text='F₄')
add(8, 'arrow', Line((62.897, 10.9091, 0), (64.0264, 4.54855, 0)), color=Color.from_hex("#3f9c20"), width=0.2592, head=(0.828, 0.3096))
add(8, 'arrow', Line((64.0264, 4.54855, 0), (63.4531, -1.20296, 0)), color=Color.from_hex("#3f9c20"), width=0.2592, head=(0.828, 0.3096))
add(8, 'arrow', Line((62.897, 10.9091, 0), (63.4531, -1.20296, 0)), color=Color.from_hex("#aaaaaa"), width=0.2448, dash=0.8, head=(0.00072, 0.00072), until=22)
add(8, 'polyline', Polyline([(19.1829, 21.5, 0), (20.5145, -7.5, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6, until=22)
add(8, 'polyline', Polyline([(39.557, 21.5, 0), (40.8886, -7.5, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6, until=22)
add(8, 'point', Point(26.2105, 19.6, 0), color=Color.from_hex("#ffffff"), width=0.45)
add(8, 'point', Point(25.5112, 23.5384, 0), color=Color.from_hex("#ffffff"), width=0.45)
add(8, 'point', Point(35.3048, 19.6, 0), color=Color.from_hex("#ffffff"), width=0.45)
add(8, 'point', Point(64.0264, 4.54855, 0), color=Color.from_hex("#ffffff"), width=0.34)
add(8, 'point', Point(63.4531, -1.20296, 0), color=Color.from_hex("#ffffff"), width=0.34)

# step 9 — Trial pole o′₂
add(9, 'segment', Line((62.897, 10.9091, 0), (80.7799, 5.4455, 0)), color=Color.from_hex("#aaaaaa"), width=0.0936, until=22)
add(9, 'segment', Line((64.0264, 4.54855, 0), (80.7799, 5.4455, 0)), color=Color.from_hex("#aaaaaa"), width=0.0936, until=22)
add(9, 'segment', Line((63.4531, -1.20296, 0), (80.7799, 5.4455, 0)), color=Color.from_hex("#aaaaaa"), width=0.0936, until=22)
add(9, 'point', Point(80.7799, 5.4455, 0), color=Color.from_hex("#ffffff"), width=0.45, until=22)
add(9, 'label', Point(82.3799, 5.6455, 0), text='o′₂', until=22)

# step 10 — Trial string ∥ o′₂–W₁
add(10, 'segment', Line((20.2844, -2.48798, 0), (30.6973, -5.66932, 0)), color=Color.from_hex("#aaaaaa"), width=0.1584, until=22)
add(10, 'point', Point(20.2844, -2.48798, 0), color=Color.from_hex("#ffffff"), width=0.45, until=22)
add(10, 'point', Point(30.6973, -5.66932, 0), color=Color.from_hex("#ffffff"), width=0.34, until=22)

# step 11 — Trial string ∥ o′₂–U₂
add(11, 'segment', Line((30.6973, -5.66932, 0), (32.7975, -5.55687, 0)), color=Color.from_hex("#aaaaaa"), width=0.1584, until=22)
add(11, 'point', Point(32.7975, -5.55687, 0), color=Color.from_hex("#ffffff"), width=0.34, until=22)

# step 12 — Trial string ∥ o′₂–V₂
add(12, 'segment', Line((32.7975, -5.55687, 0), (40.6608, -2.53965, 0)), color=Color.from_hex("#aaaaaa"), width=0.1584, until=22)
add(12, 'point', Point(40.6608, -2.53965, 0), color=Color.from_hex("#ffffff"), width=0.34, until=22)

# step 13 — Closing → division point i₂
add(13, 'polyline', Polyline([(20.2844, -2.48798, 0), (40.6608, -2.53965, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6, until=22)
add(13, 'polyline', Polyline([(80.7799, 5.4455, 0), (63.1458, 5.49022, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6, until=22)
add(13, 'point', Point(63.1458, 5.49022, 0), color=Color.from_hex("#ffffff"), width=0.34, until=22)
add(13, 'label', Point(64.7458, 5.99022, 0), color=Color.from_hex("#aaaaaa"), text='i₂', until=22)

# step 14 — The chords → the pole o
add(14, 'polyline', Polyline([(0, 12.5637, 0), (20, 3.7055, 0)]), color=Color.from_hex("#111111"), dash=0.8, until=22)
add(14, 'polyline', Polyline([(20, 3.7055, 0), (40, 11.8519, 0)]), color=Color.from_hex("#111111"), dash=0.8, until=22)
add(14, 'polyline', Polyline([(62.6574, 17.6695, 0), (77.2161, 11.2213, 0)]), color=Color.from_hex("#111111"), dash=0.8, until=22)
add(14, 'polyline', Polyline([(63.1458, 5.49022, 0), (77.2161, 11.2213, 0)]), color=Color.from_hex("#111111"), dash=0.8, until=22)
add(14, 'point', Point(77.2161, 11.2213, 0), color=Color.from_hex("#ffffff"), width=0.34)
add(14, 'label', Point(78.2161, 9.82132, 0), text='o')

# step 15 — Segment 1 — form and force
add(15, 'segment', Line((77.2161, 11.2213, 0), (62.4038, 24.8229, 0)), color=Color.from_hex("#ce4095"), width=0.2088)
add(15, 'segment', Line((0, 12.5637, 0), (6.57923, 6.52224, 0)), color=Color.from_hex("#ce4095"), width=0.2088)
add(15, 'point', Point(6.57923, 6.52224, 0), color=Color.from_hex("#ffffff"), width=0.34)
add(15, 'label', Point(4.16889, 10.5005, 0), color=Color.from_hex("#ce4095"), text='1')
add(15, 'label', Point(69.4018, 16.7878, 0), color=Color.from_hex("#ce4095"), text='1')

# step 16 — Segment 2 — form and force
add(16, 'segment', Line((77.2161, 11.2213, 0), (63.0443, 16.3471, 0)), color=Color.from_hex("#ce4095"), width=0.2088)
add(16, 'segment', Line((6.57923, 6.52224, 0), (14.6874, 3.58964, 0)), color=Color.from_hex("#ce4095"), width=0.2088)
add(16, 'point', Point(14.6874, 3.58964, 0), color=Color.from_hex("#ffffff"), width=0.34)
add(16, 'label', Point(11.0755, 6.27844, 0), color=Color.from_hex("#ce4095"), text='2')
add(16, 'label', Point(69.159, 12.92, 0), color=Color.from_hex("#ce4095"), text='2')

# step 17 — Straight through N
add(17, 'segment', Line((77.2161, 11.2213, 0), (62.897, 10.9091, 0)), color=Color.from_hex("#ce4095"), width=0.2088)
add(17, 'segment', Line((14.6874, 3.58964, 0), (20, 3.7055, 0)), color=Color.from_hex("#ce4095"), width=0.2088)
add(17, 'segment', Line((20, 3.7055, 0), (28.9979, 3.90172, 0)), color=Color.from_hex("#ce4095"), width=0.2088)
add(17, 'point', Point(28.9979, 3.90172, 0), color=Color.from_hex("#ffffff"), width=0.34)
add(17, 'label', Point(17.3153, 4.94726, 0), color=Color.from_hex("#ce4095"), text='3')
add(17, 'label', Point(24.4706, 5.1033, 0), color=Color.from_hex("#ce4095"), text='4')
add(17, 'label', Point(68.7901, 11.3589, 0), color=Color.from_hex("#ce4095"), text='3·4')

# step 18 — Segment 5 — form and force
add(18, 'segment', Line((77.2161, 11.2213, 0), (64.0264, 4.54855, 0)), color=Color.from_hex("#ce4095"), width=0.2088)
add(18, 'segment', Line((28.9979, 3.90172, 0), (33.992, 6.4283, 0)), color=Color.from_hex("#ce4095"), width=0.2088)
add(18, 'point', Point(33.992, 6.4283, 0), color=Color.from_hex("#ffffff"), width=0.34)
add(18, 'label', Point(30.9081, 6.32501, 0), color=Color.from_hex("#ce4095"), text='5')
add(18, 'label', Point(69.818, 8.90709, 0), color=Color.from_hex("#ce4095"), text='5')

# step 19 — Segment 6 — form and force
add(19, 'segment', Line((77.2161, 11.2213, 0), (63.4531, -1.20296, 0)), color=Color.from_hex("#ce4095"), width=0.2088)
add(19, 'segment', Line((33.992, 6.4283, 0), (40, 11.8519, 0)), color=Color.from_hex("#ce4095"), width=0.2088)
add(19, 'label', Point(36.1249, 10.1051, 0), color=Color.from_hex("#ce4095"), text='6')
add(19, 'label', Point(69.8515, 6.21609, 0), color=Color.from_hex("#ce4095"), text='6')

# step 20 — Reactions
add(20, 'arrow', Line((0, 12.5637, 0), (-4.71404, 16.8924, 0)), color=Color.from_hex("#3f9c20"), width=0.2592, head=(0.828, 0.3096))
add(20, 'arrow', Line((40, 11.8519, 0), (44.7506, 16.1404, 0)), color=Color.from_hex("#3f9c20"), width=0.2592, head=(0.828, 0.3096))
add(20, 'label', Point(-5.81889, 17.907, 0), color=Color.from_hex("#3f9c20"), text='A')
add(20, 'label', Point(45.864, 17.1456, 0), color=Color.from_hex("#3f9c20"), text='B')

# step 21 — Reaction components
add(21, 'arrow', Line((65.0531, -1.20975, 0), (78.8161, -1.20975, 0)), color=Color.from_hex("#3f9c20"), width=0.2592, head=(0.828, 0.3096))
add(21, 'arrow', Line((78.8161, -1.20975, 0), (78.8161, 11.2145, 0)), color=Color.from_hex("#3f9c20"), width=0.2592, head=(0.828, 0.3096))
add(21, 'arrow', Line((78.8161, 11.2145, 0), (78.8161, 24.8161, 0)), color=Color.from_hex("#3f9c20"), width=0.2592, head=(0.828, 0.3096))
add(21, 'arrow', Line((78.8161, 24.8161, 0), (64.0038, 24.8161, 0)), color=Color.from_hex("#3f9c20"), width=0.2592, head=(0.828, 0.3096))
add(21, 'arrow', Line((0, 12.5637, 0), (0, 16.8924, 0)), color=Color.from_hex("#3f9c20"), width=0.2592, head=(0.828, 0.3096))
add(21, 'arrow', Line((0, 16.8924, 0), (-4.71404, 16.8924, 0)), color=Color.from_hex("#3f9c20"), width=0.2592, head=(0.828, 0.3096))
add(21, 'arrow', Line((40, 16.1404, 0), (44.7506, 16.1404, 0)), color=Color.from_hex("#3f9c20"), width=0.2592, head=(0.828, 0.3096))
add(21, 'arrow', Line((40, 11.8519, 0), (40, 16.1404, 0)), color=Color.from_hex("#3f9c20"), width=0.2592, head=(0.828, 0.3096))
add(21, 'label', Point(80.0661, 18.0153, 0), color=Color.from_hex("#3f9c20"), text='Aᵥ')
add(21, 'label', Point(71.4099, 26.0161, 0), color=Color.from_hex("#3f9c20"), text='Aₕ')
add(21, 'label', Point(71.9346, -2.40975, 0), color=Color.from_hex("#3f9c20"), text='Bₕ')
add(21, 'label', Point(80.0661, 5.00239, 0), color=Color.from_hex("#3f9c20"), text='Bᵥ')
add(21, 'label', Point(1.3, 14.7281, 0), color=Color.from_hex("#3f9c20"), text='Aᵥ')
add(21, 'label', Point(-2.35702, 18.0924, 0), color=Color.from_hex("#3f9c20"), text='Aₕ')
add(21, 'label', Point(42.3753, 17.3404, 0), color=Color.from_hex("#3f9c20"), text='Bₕ')
add(21, 'label', Point(38.6, 13.9962, 0), color=Color.from_hex("#3f9c20"), text='Bᵥ')

# step 22 — Tension
add(22, 'label', Point(75, -4.4, 0), color=Color.from_hex("#ce4095"), text='N₁ = 11.8 kN')
add(22, 'label', Point(75, -6.3, 0), color=Color.from_hex("#ce4095"), text='N₂ = 8.9 kN')
add(22, 'label', Point(75, -8.2, 0), color=Color.from_hex("#ce4095"), text='N₃ = N₄ = 8.4 kN')
add(22, 'label', Point(75, -10.1, 0), color=Color.from_hex("#ce4095"), text='N₅ = 8.7 kN')
add(22, 'label', Point(75, -12, 0), color=Color.from_hex("#ce4095"), text='N₆ = 10.9 kN')
add(22, 'polygon', Polygon([(-0.480056, 12.0409, 0), (0.480056, 13.0865, 0), (7.05928, 7.04502, 0), (6.09917, 5.99945, 0)]), color=Color.from_hex("#ce4095"))
add(22, 'polygon', Polygon([(6.39832, 6.02206, 0), (6.76013, 7.02242, 0), (14.8683, 4.08983, 0), (14.5064, 3.08946, 0)]), color=Color.from_hex("#ce4095"))
add(22, 'polygon', Polygon([(14.6984, 3.08426, 0), (14.6763, 4.09502, 0), (19.989, 4.21088, 0), (20.011, 3.20012, 0)]), color=Color.from_hex("#ce4095"))
add(22, 'polygon', Polygon([(20.011, 3.20012, 0), (19.989, 4.21088, 0), (28.9869, 4.4071, 0), (29.0089, 3.39634, 0)]), color=Color.from_hex("#ce4095"))
add(22, 'polygon', Polygon([(29.2334, 3.4362, 0), (28.7624, 4.36724, 0), (33.7565, 6.89382, 0), (34.2275, 5.96278, 0)]), color=Color.from_hex("#ce4095"))
add(22, 'polygon', Polygon([(34.4305, 5.94255, 0), (33.5535, 6.91405, 0), (39.5615, 12.3377, 0), (40.4385, 11.3661, 0)]), color=Color.from_hex("#ce4095"))


if __name__ == "__main__":
    print("Drawing 7 — Funicular Line Through Three Points 1 —", len(ops), "operations")
