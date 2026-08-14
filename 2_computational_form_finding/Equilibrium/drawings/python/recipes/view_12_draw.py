"""Drawing 12 — Complex Prestress

Auto-generated from ops/view_12.json — the drawing as literal COMPAS
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
add(0, 'label', Point(8, 88.9, 0), text='Form Diagram')
add(0, 'label', Point(110, 88.9, 0), text='Force Diagram')
add(0, 'label', Point(110, 86.5, 0), text='1 unit :: 1.43 kN')

# step 1 — Four anchors
add(1, 'segment', Line((8.92457, 67.6908, 0), (6.70576, 62.9879, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((8.92457, 67.6908, 0), (7.32449, 67.1166, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((8.55477, 66.907, 0), (6.95469, 66.3327, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((8.18497, 66.1232, 0), (6.58489, 65.5489, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((7.81517, 65.3394, 0), (6.21509, 64.7651, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((7.44536, 64.5556, 0), (5.84528, 63.9813, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((7.07556, 63.7717, 0), (5.47548, 63.1975, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((6.70576, 62.9879, 0), (5.10568, 62.4137, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((82.1909, 62.9853, 0), (79.975, 67.6895, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((82.1909, 62.9853, 0), (82.7661, 64.585, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((81.8216, 63.7693, 0), (82.3968, 65.3691, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((81.4523, 64.5534, 0), (82.0275, 66.1531, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((81.0829, 65.3374, 0), (81.6582, 66.9371, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((80.7136, 66.1214, 0), (81.2888, 67.7212, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((80.3443, 66.9055, 0), (80.9195, 68.5052, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((79.975, 67.6895, 0), (80.5502, 69.2892, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((6.70263, 40.0769, 0), (8.92129, 35.374, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((6.70263, 40.0769, 0), (6.12834, 38.4768, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((7.0724, 39.2931, 0), (6.49812, 37.693, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((7.44218, 38.5093, 0), (6.8679, 36.9092, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((7.81196, 37.7254, 0), (7.23768, 36.1254, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((8.18174, 36.9416, 0), (7.60745, 35.3416, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((8.55152, 36.1578, 0), (7.97723, 34.5577, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((8.92129, 35.374, 0), (8.34701, 33.7739, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((79.9749, 35.3739, 0), (82.191, 40.078, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((79.9749, 35.3739, 0), (81.5746, 35.9491, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((80.3442, 36.1579, 0), (81.944, 36.7331, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((80.7136, 36.942, 0), (82.3133, 37.5171, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((81.0829, 37.726, 0), (82.6827, 38.3011, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((81.4523, 38.51, 0), (83.052, 39.0851, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((81.8216, 39.294, 0), (83.4214, 39.8692, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'segment', Line((82.191, 40.078, 0), (83.7907, 40.6532, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(1, 'point', Point(8.81, 64.87, 0), color=Color.from_hex("#ffffff"), width=0.72)
add(1, 'point', Point(80.0878, 64.8686, 0), color=Color.from_hex("#ffffff"), width=0.72)
add(1, 'point', Point(8.80681, 38.1948, 0), color=Color.from_hex("#ffffff"), width=0.72)
add(1, 'point', Point(80.0878, 38.1948, 0), color=Color.from_hex("#ffffff"), width=0.72)
add(1, 'label', Point(6.91, 66.07, 0), text='C')
add(1, 'label', Point(81.9878, 66.0686, 0), text='E')
add(1, 'label', Point(6.90681, 36.9948, 0), text='D')
add(1, 'label', Point(81.9878, 36.9948, 0), text='F')

# step 2 — Six ties → the load line
add(2, 'polyline', Polyline([(21.767, 82.38, 0), (21.767, 9.29055, 0)]), color=Color.from_hex("#aaaaaa"), dash=1)
add(2, 'segment', Line((127.986, 45.1393, 0), (127.986, 40.5193, 0)), color=Color.from_hex("#ce4095"), width=0.396)
add(2, 'label', Point(130.286, 42.8293, 0), color=Color.from_hex("#ce4095"), text='F₁')
add(2, 'polyline', Polyline([(30.809, 82.38, 0), (30.809, 9.29055, 0)]), color=Color.from_hex("#aaaaaa"), dash=1)
add(2, 'segment', Line((127.986, 49.7593, 0), (127.986, 45.1393, 0)), color=Color.from_hex("#ce4095"), width=0.396)
add(2, 'label', Point(130.286, 47.4493, 0), color=Color.from_hex("#ce4095"), text='F₂')
add(2, 'polyline', Polyline([(39.851, 82.38, 0), (39.851, 9.29055, 0)]), color=Color.from_hex("#aaaaaa"), dash=1)
add(2, 'segment', Line((127.986, 54.3793, 0), (127.986, 49.7593, 0)), color=Color.from_hex("#ce4095"), width=0.396)
add(2, 'label', Point(130.286, 52.0693, 0), color=Color.from_hex("#ce4095"), text='F₃')
add(2, 'polyline', Polyline([(48.893, 82.38, 0), (48.893, 9.29055, 0)]), color=Color.from_hex("#aaaaaa"), dash=1)
add(2, 'segment', Line((127.986, 58.9993, 0), (127.986, 54.3793, 0)), color=Color.from_hex("#ce4095"), width=0.396)
add(2, 'label', Point(130.286, 56.6893, 0), color=Color.from_hex("#ce4095"), text='F₄')
add(2, 'polyline', Polyline([(58.0856, 82.38, 0), (58.0856, 9.29055, 0)]), color=Color.from_hex("#aaaaaa"), dash=1)
add(2, 'segment', Line((127.986, 63.6193, 0), (127.986, 58.9993, 0)), color=Color.from_hex("#ce4095"), width=0.396)
add(2, 'label', Point(130.286, 61.3093, 0), color=Color.from_hex("#ce4095"), text='F₅')
add(2, 'polyline', Polyline([(67.1276, 82.38, 0), (67.1276, 9.29055, 0)]), color=Color.from_hex("#aaaaaa"), dash=1)
add(2, 'segment', Line((127.986, 68.2393, 0), (127.986, 63.6193, 0)), color=Color.from_hex("#ce4095"), width=0.396)
add(2, 'label', Point(130.286, 65.9293, 0), color=Color.from_hex("#ce4095"), text='F₆')
add(2, 'polyline', Polyline([(127.986, 82.38, 0), (127.986, 9.29055, 0)]), color=Color.from_hex("#aaaaaa"), dash=1)
add(2, 'point', Point(127.986, 40.5193, 0), color=Color.from_hex("#ffffff"), width=0.54)
add(2, 'point', Point(127.986, 45.1393, 0), color=Color.from_hex("#ffffff"), width=0.54)
add(2, 'point', Point(127.986, 49.7593, 0), color=Color.from_hex("#ffffff"), width=0.54)
add(2, 'point', Point(127.986, 54.3793, 0), color=Color.from_hex("#ffffff"), width=0.54)
add(2, 'point', Point(127.986, 58.9993, 0), color=Color.from_hex("#ffffff"), width=0.54)
add(2, 'point', Point(127.986, 63.6193, 0), color=Color.from_hex("#ffffff"), width=0.54)
add(2, 'point', Point(127.986, 68.2393, 0), color=Color.from_hex("#ffffff"), width=0.54)

# step 3 — Trial pole o′
add(3, 'segment', Line((127.986, 40.5193, 0), (92.2041, 58.4187, 0)), color=Color.from_hex("#aaaaaa"), width=0.144, until=32)
add(3, 'segment', Line((127.986, 45.1393, 0), (92.2041, 58.4187, 0)), color=Color.from_hex("#aaaaaa"), width=0.144, until=32)
add(3, 'segment', Line((127.986, 49.7593, 0), (92.2041, 58.4187, 0)), color=Color.from_hex("#aaaaaa"), width=0.144, until=32)
add(3, 'segment', Line((127.986, 54.3793, 0), (92.2041, 58.4187, 0)), color=Color.from_hex("#aaaaaa"), width=0.144, until=32)
add(3, 'segment', Line((127.986, 58.9993, 0), (92.2041, 58.4187, 0)), color=Color.from_hex("#aaaaaa"), width=0.144, until=32)
add(3, 'segment', Line((127.986, 63.6193, 0), (92.2041, 58.4187, 0)), color=Color.from_hex("#aaaaaa"), width=0.144, until=32)
add(3, 'segment', Line((127.986, 68.2393, 0), (92.2041, 58.4187, 0)), color=Color.from_hex("#aaaaaa"), width=0.144, until=32)
add(3, 'point', Point(92.2041, 58.4187, 0), color=Color.from_hex("#ffffff"), width=0.72, until=32)
add(3, 'label', Point(90.1041, 58.7187, 0), text='o′', until=32)

# step 4 — Trial string ∥ first ray
add(4, 'segment', Line((8.81, 33, 0), (21.767, 26.5184, 0)), color=Color.from_hex("#aaaaaa"), width=0.2448, until=32)
add(4, 'point', Point(8.81, 33, 0), color=Color.from_hex("#ffffff"), width=0.72, until=32)
add(4, 'point', Point(21.767, 26.5184, 0), color=Color.from_hex("#ffffff"), width=0.54, until=32)

# step 5 — Trial string ∥ next ray
add(5, 'segment', Line((21.767, 26.5184, 0), (30.809, 23.1626, 0)), color=Color.from_hex("#aaaaaa"), width=0.2448, until=32)
add(5, 'point', Point(30.809, 23.1626, 0), color=Color.from_hex("#ffffff"), width=0.54, until=32)

# step 6 — Trial string ∥ next ray
add(6, 'segment', Line((30.809, 23.1626, 0), (39.851, 20.9744, 0)), color=Color.from_hex("#aaaaaa"), width=0.2448, until=32)
add(6, 'point', Point(39.851, 20.9744, 0), color=Color.from_hex("#ffffff"), width=0.54, until=32)

# step 7 — Trial string ∥ next ray
add(7, 'segment', Line((39.851, 20.9744, 0), (48.893, 19.9536, 0)), color=Color.from_hex("#aaaaaa"), width=0.2448, until=32)
add(7, 'point', Point(48.893, 19.9536, 0), color=Color.from_hex("#ffffff"), width=0.54, until=32)

# step 8 — Trial string ∥ next ray
add(8, 'segment', Line((48.893, 19.9536, 0), (58.0856, 20.1028, 0)), color=Color.from_hex("#aaaaaa"), width=0.2448, until=32)
add(8, 'point', Point(58.0856, 20.1028, 0), color=Color.from_hex("#ffffff"), width=0.54, until=32)

# step 9 — Trial string ∥ next ray
add(9, 'segment', Line((58.0856, 20.1028, 0), (67.1276, 21.417, 0)), color=Color.from_hex("#aaaaaa"), width=0.2448, until=32)
add(9, 'point', Point(67.1276, 21.417, 0), color=Color.from_hex("#ffffff"), width=0.54, until=32)

# step 10 — Trial string ∥ last ray
add(10, 'segment', Line((67.1276, 21.417, 0), (80.0878, 24.9741, 0)), color=Color.from_hex("#aaaaaa"), width=0.2448, until=32)
add(10, 'point', Point(80.0878, 24.9741, 0), color=Color.from_hex("#ffffff"), width=0.54, until=32)

# step 11 — Closing → division point i
add(11, 'polyline', Polyline([(8.81, 33, 0), (80.0878, 24.9741, 0)]), color=Color.from_hex("#aaaaaa"), dash=1, until=32)
add(11, 'polyline', Polyline([(92.2041, 58.4187, 0), (127.986, 54.3897, 0)]), color=Color.from_hex("#aaaaaa"), dash=1, until=32)
add(11, 'point', Point(127.986, 54.3897, 0), color=Color.from_hex("#ffffff"), width=0.54)
add(11, 'label', Point(126.086, 52.5897, 0), text='i')

# step 12 — Chord → pole line
add(12, 'polyline', Polyline([(8.81, 64.87, 0), (80.0878, 64.8686, 0)]), color=Color.from_hex("#111111"), dash=1.3, until=32)
add(12, 'polyline', Polyline([(91.5855, 54.3904, 0), (164.386, 54.389, 0)]), color=Color.from_hex("#111111"), dash=1.3, until=32)

# step 13 — Prestress picks the pole o₁
add(13, 'polyline', Polyline([(127.986, 54.3897, 0), (98.5855, 54.3902, 0)]), color=Color.from_hex("#111111"), dash=1.3)
add(13, 'segment', Line((98.5855, 36.3122, 0), (127.986, 36.3122, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(13, 'segment', Line((98.5855, 35.4122, 0), (98.5855, 37.2122, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(13, 'segment', Line((127.986, 35.4122, 0), (127.986, 37.2122, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(13, 'polyline', Polyline([(98.5855, 36.3122, 0), (98.5855, 54.3902, 0)]), color=Color.from_hex("#111111"), dash=1)
add(13, 'label', Point(113.286, 34.4122, 0), color=Color.from_hex("#aaaaaa"), text='P_upper = 42.0 kN')
add(13, 'point', Point(98.5855, 54.3902, 0), color=Color.from_hex("#ffffff"), width=0.54)
add(13, 'point', Point(127.986, 36.3122, 0), color=Color.from_hex("#ffffff"), width=0.72)
add(13, 'label', Point(97.3855, 56.0902, 0), text='o₁')

# step 14 — Upper cable 1
add(14, 'segment', Line((98.5855, 54.3902, 0), (127.986, 40.5193, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(14, 'segment', Line((8.81, 64.87, 0), (21.767, 58.7569, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(14, 'label', Point(15.9285, 63.17, 0), color=Color.from_hex("#ce4095"), text='1')
add(14, 'label', Point(120.342, 42.9257, 0), color=Color.from_hex("#ce4095"), text='1')
add(14, 'point', Point(21.767, 58.7569, 0), color=Color.from_hex("#ffffff"), width=0.54)

# step 15 — Upper cable 2
add(15, 'segment', Line((98.5855, 54.3902, 0), (127.986, 45.1393, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(15, 'segment', Line((21.767, 58.7569, 0), (30.809, 55.9117, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(15, 'label', Point(26.7382, 58.7651, 0), color=Color.from_hex("#ce4095"), text='2')
add(15, 'label', Point(120.342, 46.3445, 0), color=Color.from_hex("#ce4095"), text='2')
add(15, 'point', Point(30.809, 55.9117, 0), color=Color.from_hex("#ffffff"), width=0.54)

# step 16 — Upper cable 3
add(16, 'segment', Line((98.5855, 54.3902, 0), (127.986, 49.7593, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(16, 'segment', Line((30.809, 55.9117, 0), (39.851, 54.4875, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(16, 'label', Point(35.5634, 56.6813, 0), color=Color.from_hex("#ce4095"), text='3')
add(16, 'label', Point(120.342, 49.7633, 0), color=Color.from_hex("#ce4095"), text='3')
add(16, 'point', Point(39.851, 54.4875, 0), color=Color.from_hex("#ffffff"), width=0.54)

# step 17 — Upper cable 4
add(17, 'segment', Line((98.5855, 54.3902, 0), (127.986, 54.3793, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(17, 'segment', Line((39.851, 54.4875, 0), (48.893, 54.4841, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(17, 'label', Point(44.3725, 55.9858, 0), color=Color.from_hex("#ce4095"), text='4')
add(17, 'label', Point(120.342, 55.5821, 0), color=Color.from_hex("#ce4095"), text='4')
add(17, 'point', Point(48.893, 54.4841, 0), color=Color.from_hex("#ffffff"), width=0.54)

# step 18 — Upper cable 5
add(18, 'segment', Line((98.5855, 54.3902, 0), (127.986, 58.9993, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(18, 'segment', Line((48.893, 54.4841, 0), (58.0856, 55.9253, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(18, 'label', Point(53.257, 56.6866, 0), color=Color.from_hex("#ce4095"), text='5')
add(18, 'label', Point(120.342, 59.0009, 0), color=Color.from_hex("#ce4095"), text='5')
add(18, 'point', Point(58.0856, 55.9253, 0), color=Color.from_hex("#ffffff"), width=0.54)

# step 19 — Upper cable 6
add(19, 'segment', Line((98.5855, 54.3902, 0), (127.986, 63.6193, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(19, 'segment', Line((58.0856, 55.9253, 0), (67.1276, 58.7637, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(19, 'label', Point(62.1574, 58.7756, 0), color=Color.from_hex("#ce4095"), text='6')
add(19, 'label', Point(120.342, 62.4197, 0), color=Color.from_hex("#ce4095"), text='6')
add(19, 'point', Point(67.1276, 58.7637, 0), color=Color.from_hex("#ffffff"), width=0.54)

# step 20 — Upper cable 7
add(20, 'segment', Line((98.5855, 54.3902, 0), (127.986, 68.2393, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(20, 'segment', Line((67.1276, 58.7637, 0), (80.0878, 64.8686, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(20, 'label', Point(72.9685, 63.1731, 0), color=Color.from_hex("#ce4095"), text='7')
add(20, 'label', Point(120.342, 65.8385, 0), color=Color.from_hex("#ce4095"), text='7')

# step 21 — Reactions A and B
add(21, 'arrow', Line((8.81, 64.87, 0), (2.47923, 67.8569, 0)), color=Color.from_hex("#3f9c20"), width=0.396, head=(1.368, 0.5184))
add(21, 'arrow', Line((80.0878, 64.8686, 0), (86.4204, 67.8516, 0)), color=Color.from_hex("#3f9c20"), width=0.396, head=(1.368, 0.5184))
add(21, 'arrow', Line((127.986, 40.5193, 0), (98.5855, 54.3902, 0)), color=Color.from_hex("#3f9c20"), width=0.396, head=(1.368, 0.5184))
add(21, 'arrow', Line((98.5855, 54.3902, 0), (127.986, 68.2393, 0)), color=Color.from_hex("#3f9c20"), width=0.396, head=(1.368, 0.5184))
add(21, 'label', Point(1.0322, 67.1396, 0), color=Color.from_hex("#3f9c20"), text='A')
add(21, 'label', Point(87.8679, 67.1335, 0), color=Color.from_hex("#3f9c20"), text='B')
add(21, 'label', Point(112.086, 45.8548, 0), color=Color.from_hex("#3f9c20"), text='A')
add(21, 'label', Point(111.586, 62.7148, 0), color=Color.from_hex("#3f9c20"), text='B')

# step 22 — Prestress picks the pole o₂
add(22, 'polyline', Polyline([(127.986, 54.3897, 0), (157.386, 54.3891, 0)]), color=Color.from_hex("#111111"), dash=1.3)
add(22, 'segment', Line((127.986, 36.3122, 0), (157.386, 36.3122, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(22, 'segment', Line((127.986, 35.4122, 0), (127.986, 37.2122, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(22, 'segment', Line((157.386, 35.4122, 0), (157.386, 37.2122, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152)
add(22, 'polyline', Polyline([(157.386, 36.3122, 0), (157.386, 54.3891, 0)]), color=Color.from_hex("#111111"), dash=1)
add(22, 'label', Point(142.686, 34.4122, 0), color=Color.from_hex("#aaaaaa"), text='P_lower = 42.0 kN')
add(22, 'point', Point(157.386, 54.3891, 0), color=Color.from_hex("#ffffff"), width=0.54)
add(22, 'label', Point(158.786, 56.0891, 0), text='o₂')

# step 23 — Lower cable 8
add(23, 'segment', Line((157.386, 54.3891, 0), (127.986, 40.5193, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(23, 'segment', Line((8.80681, 38.1948, 0), (21.767, 44.3089, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(23, 'label', Point(15.9269, 39.8952, 0), color=Color.from_hex("#ce4095"), text='8')
add(23, 'label', Point(135.63, 42.9254, 0), color=Color.from_hex("#ce4095"), text='8')
add(23, 'point', Point(21.767, 44.3089, 0), color=Color.from_hex("#ffffff"), width=0.54)

# step 24 — Lower cable 9
add(24, 'segment', Line((157.386, 54.3891, 0), (127.986, 45.1393, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(24, 'segment', Line((21.767, 44.3089, 0), (30.809, 47.1537, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(24, 'label', Point(26.7382, 44.3004, 0), color=Color.from_hex("#ce4095"), text='9')
add(24, 'label', Point(135.63, 46.3442, 0), color=Color.from_hex("#ce4095"), text='9')
add(24, 'point', Point(30.809, 47.1537, 0), color=Color.from_hex("#ffffff"), width=0.54)

# step 25 — Lower cable 10
add(25, 'segment', Line((157.386, 54.3891, 0), (127.986, 49.7593, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(25, 'segment', Line((30.809, 47.1537, 0), (39.851, 48.5776, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(25, 'label', Point(35.5633, 46.3839, 0), color=Color.from_hex("#ce4095"), text='10')
add(25, 'label', Point(135.63, 49.763, 0), color=Color.from_hex("#ce4095"), text='10')
add(25, 'point', Point(39.851, 48.5776, 0), color=Color.from_hex("#ffffff"), width=0.54)

# step 26 — Lower cable 11
add(26, 'segment', Line((157.386, 54.3891, 0), (127.986, 54.3793, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(26, 'segment', Line((39.851, 48.5776, 0), (48.893, 48.5806, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(26, 'label', Point(44.3725, 47.0791, 0), color=Color.from_hex("#ce4095"), text='11')
add(26, 'label', Point(135.63, 55.5818, 0), color=Color.from_hex("#ce4095"), text='11')
add(26, 'point', Point(48.893, 48.5806, 0), color=Color.from_hex("#ffffff"), width=0.54)

# step 27 — Lower cable 12
add(27, 'segment', Line((157.386, 54.3891, 0), (127.986, 58.9993, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(27, 'segment', Line((48.893, 48.5806, 0), (58.0856, 47.1391, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(27, 'label', Point(53.2569, 46.378, 0), color=Color.from_hex("#ce4095"), text='12')
add(27, 'label', Point(135.63, 59.0006, 0), color=Color.from_hex("#ce4095"), text='12')
add(27, 'point', Point(58.0856, 47.1391, 0), color=Color.from_hex("#ffffff"), width=0.54)

# step 28 — Lower cable 13
add(28, 'segment', Line((157.386, 54.3891, 0), (127.986, 63.6193, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(28, 'segment', Line((58.0856, 47.1391, 0), (67.1276, 44.3004, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(28, 'label', Point(62.1573, 44.2886, 0), color=Color.from_hex("#ce4095"), text='13')
add(28, 'label', Point(135.63, 62.4194, 0), color=Color.from_hex("#ce4095"), text='13')
add(28, 'point', Point(67.1276, 44.3004, 0), color=Color.from_hex("#ffffff"), width=0.54)

# step 29 — Lower cable 14
add(29, 'segment', Line((157.386, 54.3891, 0), (127.986, 68.2393, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(29, 'segment', Line((67.1276, 44.3004, 0), (80.0878, 38.1948, 0)), color=Color.from_hex("#ce4095"), width=0.3024)
add(29, 'label', Point(72.9685, 39.8906, 0), color=Color.from_hex("#ce4095"), text='14')
add(29, 'label', Point(135.63, 65.8382, 0), color=Color.from_hex("#ce4095"), text='14')

# step 30 — Reactions C and D
add(30, 'arrow', Line((8.80681, 38.1948, 0), (2.47595, 35.2081, 0)), color=Color.from_hex("#3f9c20"), width=0.396, head=(1.368, 0.5184))
add(30, 'arrow', Line((80.0878, 38.1948, 0), (86.4203, 35.2115, 0)), color=Color.from_hex("#3f9c20"), width=0.396, head=(1.368, 0.5184))
add(30, 'arrow', Line((157.386, 54.3891, 0), (127.986, 40.5193, 0)), color=Color.from_hex("#3f9c20"), width=0.396, head=(1.368, 0.5184))
add(30, 'arrow', Line((127.986, 68.2393, 0), (157.386, 54.3891, 0)), color=Color.from_hex("#3f9c20"), width=0.396, head=(1.368, 0.5184))
add(30, 'label', Point(1.02889, 35.9254, 0), color=Color.from_hex("#3f9c20"), text='C')
add(30, 'label', Point(87.8677, 35.9296, 0), color=Color.from_hex("#3f9c20"), text='D')
add(30, 'label', Point(143.886, 45.8542, 0), color=Color.from_hex("#3f9c20"), text='C')
add(30, 'label', Point(144.386, 62.7142, 0), color=Color.from_hex("#3f9c20"), text='D')

# step 31 — The six ties
add(31, 'segment', Line((21.767, 58.7569, 0), (21.767, 44.3089, 0)), color=Color.from_hex("#ce4095"), width=0.396)
add(31, 'segment', Line((30.809, 55.9117, 0), (30.809, 47.1537, 0)), color=Color.from_hex("#ce4095"), width=0.396)
add(31, 'segment', Line((39.851, 54.4875, 0), (39.851, 48.5776, 0)), color=Color.from_hex("#ce4095"), width=0.396)
add(31, 'segment', Line((48.893, 54.4841, 0), (48.893, 48.5806, 0)), color=Color.from_hex("#ce4095"), width=0.396)
add(31, 'segment', Line((58.0856, 55.9253, 0), (58.0856, 47.1391, 0)), color=Color.from_hex("#ce4095"), width=0.396)
add(31, 'segment', Line((67.1276, 58.7637, 0), (67.1276, 44.3004, 0)), color=Color.from_hex("#ce4095"), width=0.396)

# step 32 — Tension everywhere
add(32, 'polygon', Polygon([(8.41369, 64.03, 0), (9.20631, 65.71, 0), (22.1633, 59.5969, 0), (21.3707, 57.9169, 0)]), color=Color.from_hex("#ce4095"))
add(32, 'polygon', Polygon([(21.5027, 57.9169, 0), (22.0313, 59.5969, 0), (31.0733, 56.7517, 0), (30.5447, 55.0717, 0)]), color=Color.from_hex("#ce4095"))
add(32, 'polygon', Polygon([(30.6767, 55.0717, 0), (30.9413, 56.7517, 0), (39.9833, 55.3275, 0), (39.7187, 53.6475, 0)]), color=Color.from_hex("#ce4095"))
add(32, 'polygon', Polygon([(39.8507, 53.6475, 0), (39.8513, 55.3275, 0), (48.8933, 55.3241, 0), (48.8926, 53.6441, 0)]), color=Color.from_hex("#ce4095"))
add(32, 'polygon', Polygon([(49.0246, 53.6441, 0), (48.7613, 55.3241, 0), (57.954, 56.7653, 0), (58.2173, 55.0853, 0)]), color=Color.from_hex("#ce4095"))
add(32, 'polygon', Polygon([(58.3493, 55.0853, 0), (57.822, 56.7653, 0), (66.8639, 59.6037, 0), (67.3913, 57.9237, 0)]), color=Color.from_hex("#ce4095"))
add(32, 'polygon', Polygon([(67.5233, 57.9237, 0), (66.7319, 59.6037, 0), (79.6921, 65.7086, 0), (80.4835, 64.0286, 0)]), color=Color.from_hex("#ce4095"))
add(32, 'polygon', Polygon([(21.635, 58.7569, 0), (21.899, 58.7569, 0), (21.899, 44.3089, 0), (21.635, 44.3089, 0)]), color=Color.from_hex("#ce4095"))
add(32, 'polygon', Polygon([(30.677, 55.9117, 0), (30.941, 55.9117, 0), (30.941, 47.1537, 0), (30.677, 47.1537, 0)]), color=Color.from_hex("#ce4095"))
add(32, 'polygon', Polygon([(39.719, 54.4875, 0), (39.983, 54.4875, 0), (39.983, 48.5776, 0), (39.719, 48.5776, 0)]), color=Color.from_hex("#ce4095"))
add(32, 'polygon', Polygon([(48.761, 54.4841, 0), (49.025, 54.4841, 0), (49.025, 48.5806, 0), (48.761, 48.5806, 0)]), color=Color.from_hex("#ce4095"))
add(32, 'polygon', Polygon([(57.9536, 55.9253, 0), (58.2176, 55.9253, 0), (58.2176, 47.1391, 0), (57.9536, 47.1391, 0)]), color=Color.from_hex("#ce4095"))
add(32, 'polygon', Polygon([(66.9956, 58.7637, 0), (67.2596, 58.7637, 0), (67.2596, 44.3004, 0), (66.9956, 44.3004, 0)]), color=Color.from_hex("#ce4095"))
add(32, 'polygon', Polygon([(9.20309, 37.3548, 0), (8.41053, 39.0348, 0), (21.3707, 45.1489, 0), (22.1633, 43.4689, 0)]), color=Color.from_hex("#ce4095"))
add(32, 'polygon', Polygon([(22.0313, 43.4689, 0), (21.5027, 45.1489, 0), (30.5447, 47.9937, 0), (31.0733, 46.3137, 0)]), color=Color.from_hex("#ce4095"))
add(32, 'polygon', Polygon([(30.9413, 46.3137, 0), (30.6767, 47.9937, 0), (39.7187, 49.4176, 0), (39.9833, 47.7376, 0)]), color=Color.from_hex("#ce4095"))
add(32, 'polygon', Polygon([(39.8513, 47.7376, 0), (39.8507, 49.4176, 0), (48.8927, 49.4206, 0), (48.8932, 47.7406, 0)]), color=Color.from_hex("#ce4095"))
add(32, 'polygon', Polygon([(48.7612, 47.7406, 0), (49.0247, 49.4206, 0), (58.2174, 47.9791, 0), (57.9539, 46.2991, 0)]), color=Color.from_hex("#ce4095"))
add(32, 'polygon', Polygon([(57.8219, 46.2991, 0), (58.3494, 47.9791, 0), (67.3914, 45.1404, 0), (66.8639, 43.4604, 0)]), color=Color.from_hex("#ce4095"))
add(32, 'polygon', Polygon([(66.7319, 43.4604, 0), (67.5234, 45.1404, 0), (80.4835, 39.0348, 0), (79.6921, 37.3548, 0)]), color=Color.from_hex("#ce4095"))
add(32, 'label', Point(96, 31, 0), color=Color.from_hex("#ce4095"), text='N₁ = 46.4 kN')
add(32, 'label', Point(96, 28.8, 0), color=Color.from_hex("#ce4095"), text='N₂ = 44.0 kN')
add(32, 'label', Point(96, 26.6, 0), color=Color.from_hex("#ce4095"), text='N₃ = 42.5 kN')
add(32, 'label', Point(96, 24.4, 0), color=Color.from_hex("#ce4095"), text='N₄ = 42.0 kN')
add(32, 'label', Point(96, 22.2, 0), color=Color.from_hex("#ce4095"), text='N₅ = 42.5 kN')
add(32, 'label', Point(96, 20, 0), color=Color.from_hex("#ce4095"), text='N₆ = 44.0 kN')
add(32, 'label', Point(96, 17.8, 0), color=Color.from_hex("#ce4095"), text='N₇ = 46.4 kN')
add(32, 'label', Point(133, 31, 0), color=Color.from_hex("#ce4095"), text='N₈ = 46.4 kN')
add(32, 'label', Point(133, 28.8, 0), color=Color.from_hex("#ce4095"), text='N₉ = 44.0 kN')
add(32, 'label', Point(133, 26.6, 0), color=Color.from_hex("#ce4095"), text='N₁₀ = 42.5 kN')
add(32, 'label', Point(133, 24.4, 0), color=Color.from_hex("#ce4095"), text='N₁₁ = 42.0 kN')
add(32, 'label', Point(133, 22.2, 0), color=Color.from_hex("#ce4095"), text='N₁₂ = 42.5 kN')
add(32, 'label', Point(133, 20, 0), color=Color.from_hex("#ce4095"), text='N₁₃ = 44.0 kN')
add(32, 'label', Point(133, 17.8, 0), color=Color.from_hex("#ce4095"), text='N₁₄ = 46.4 kN')
add(32, 'label', Point(96, 15.6, 0), color=Color.from_hex("#ce4095"), text='ties: N = 6.6 kN')


if __name__ == "__main__":
    print("Drawing 12 — Complex Prestress —", len(ops), "operations")
