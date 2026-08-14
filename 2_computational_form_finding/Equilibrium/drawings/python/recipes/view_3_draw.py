"""Drawing 3 — Pedestrian Bridge 2

Auto-generated from ops/view_3.json — the drawing as literal COMPAS
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
add(0, 'label', Point(4, 27.2, 0), text='Form Diagram')
add(0, 'label', Point(4, 25.8, 0), text='1 unit :: 1 m')

# step 1 — The site
add(1, 'segment', Line((2.06, 4, 0), (1.6561, 6.2375, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((1.6561, 6.2375, 0), (1.9233, 10.1128, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((1.9233, 10.1128, 0), (1.7006, 12.6518, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((1.7006, 12.6518, 0), (-0.3484, 22.8524, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((17.91, 4, 0), (18.1818, 5.7921, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((18.1818, 5.7921, 0), (17.7809, 7.3957, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((17.7809, 7.3957, 0), (18.4491, 12.2064, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((18.4491, 12.2064, 0), (18.5382, 15.1017, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((18.5382, 15.1017, 0), (18.0482, 18.888, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((18.0482, 18.888, 0), (15.9101, 21.3379, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((15.9101, 21.3379, 0), (16.0437, 22.8078, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((2.06, 4, 0), (4, 4, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((4, 4, 0), (4.0831, 1.7728, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((4.0831, 1.7728, 0), (4.3369, -1.5692, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((4.3369, -1.5692, 0), (4.4215, -2.3306, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((17.94, 4, 0), (16, 4, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((16, 4, 0), (15.9169, 1.7728, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((15.9169, 1.7728, 0), (15.6631, -1.5692, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((15.6631, -1.5692, 0), (15.5785, -2.3306, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((1.9694, 4.50189, 0), (1.31222, 4.95809, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((1.81841, 5.33837, 0), (1.16123, 5.79457, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((1.66741, 6.17485, 0), (1.01023, 6.63105, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((1.69118, 6.74629, 0), (1.16575, 7.34955, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((1.74965, 7.59428, 0), (1.22422, 8.19754, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((1.80812, 8.44227, 0), (1.28268, 9.04552, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((1.86659, 9.29025, 0), (1.34115, 9.89351, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((1.87874, 10.6208, 0), (1.26579, 11.1349, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((1.80447, 11.4676, 0), (1.19152, 11.9817, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((1.7302, 12.3143, 0), (1.11725, 12.8284, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((1.60016, 13.1518, 0), (0.934151, 13.595, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((1.43277, 13.9852, 0), (0.766755, 14.4284, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((1.26537, 14.8185, 0), (0.599358, 15.2617, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((1.09797, 15.6519, 0), (0.431962, 16.0951, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((0.930577, 16.4852, 0), (0.264566, 16.9284, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((0.763181, 17.3186, 0), (0.09717, 17.7618, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((0.595785, 18.1519, 0), (-0.070226, 18.5951, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((0.428389, 18.9853, 0), (-0.237623, 19.4285, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((0.260993, 19.8186, 0), (-0.405019, 20.2618, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((0.093596, 20.652, 0), (-0.572415, 21.0952, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((-0.0738, 21.4854, 0), (-0.739811, 21.9286, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((-0.241196, 22.3187, 0), (-0.907208, 22.7619, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((17.9865, 4.50423, 0), (18.6306, 4.9787, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((18.1139, 5.34462, 0), (18.758, 5.81909, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((18.0581, 6.28687, 0), (18.4697, 6.97287, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((17.852, 7.11149, 0), (18.2635, 7.79749, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((17.8511, 7.90085, 0), (18.4892, 8.38333, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((17.968, 8.74277, 0), (18.6061, 9.22525, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((18.0849, 9.58469, 0), (18.7231, 10.0672, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((18.2019, 10.4266, 0), (18.84, 10.9091, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((18.3188, 11.2685, 0), (18.957, 11.751, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((18.4358, 12.1104, 0), (19.0739, 12.5929, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((18.4648, 12.7162, 0), (19.0476, 13.2642, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((18.4909, 13.5658, 0), (19.0738, 14.1138, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((18.5171, 14.4154, 0), (19.0999, 14.9634, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((18.4727, 15.6075, 0), (18.9611, 16.2411, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((18.3637, 16.4505, 0), (18.8521, 17.0841, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((18.2546, 17.2934, 0), (18.743, 17.927, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((18.1455, 18.1364, 0), (18.6339, 18.77, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((17.7129, 19.2722, 0), (17.7671, 20.0704, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((17.154, 19.9127, 0), (17.2082, 20.7108, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((16.595, 20.5531, 0), (16.6493, 21.3512, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((16.0361, 21.1935, 0), (16.0904, 21.9916, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((15.9563, 21.8458, 0), (16.5708, 22.358, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((16.0332, 22.6923, 0), (16.6478, 23.2045, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((2.57, 4, 0), (3.13569, 3.43431, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((3.42, 4, 0), (3.98569, 3.43431, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((4.01902, 3.49036, 0), (3.47481, 2.90397, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((4.05071, 2.64095, 0), (3.50651, 2.05456, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((4.0824, 1.79154, 0), (3.5382, 1.20515, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((4.12172, 1.26426, 0), (3.6005, 0.657367, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((4.18609, 0.416705, 0), (3.66486, -0.190193, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((4.25045, -0.430855, 0), (3.72923, -1.03775, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((4.31482, -1.27841, 0), (3.79359, -1.88531, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((4.39322, -2.07608, 0), (3.89346, -2.70078, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((17.43, 4, 0), (16.8643, 3.43431, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((16.58, 4, 0), (16.0143, 3.43431, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((15.981, 3.49036, 0), (16.5252, 2.90397, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((15.9493, 2.64095, 0), (16.4935, 2.05456, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((15.9176, 1.79154, 0), (16.4618, 1.20515, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((15.8783, 1.26426, 0), (16.3995, 0.657367, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((15.8139, 0.416705, 0), (16.3351, -0.190193, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((15.7495, -0.430855, 0), (16.2708, -1.03775, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((15.6852, -1.27841, 0), (16.2064, -1.88531, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((15.6068, -2.07608, 0), (16.1065, -2.70078, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'polygon', Polygon([(2.06, 3.83, 0), (17.91, 3.83, 0), (17.91, 4.17, 0), (2.06, 4.17, 0)]), color=Color.from_hex("#ffffff"))
add(1, 'segment', Line((2.06, 3.83, 0), (17.91, 3.83, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((17.91, 3.83, 0), (17.91, 4.17, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((17.91, 4.17, 0), (2.06, 4.17, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((2.06, 4.17, 0), (2.06, 3.83, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((4, -4.8165, 0), (16, -4.8165, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(1, 'segment', Line((4, -5.0965, 0), (4, -4.5365, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(1, 'segment', Line((16, -5.0965, 0), (16, -4.5365, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(1, 'label', Point(10, -5.6665, 0), color=Color.from_hex("#aaaaaa"), text='12 m')
add(1, 'point', Point(1.79726, 11.5498, 0), color=Color.from_hex("#ffffff"), width=0.35)
add(1, 'point', Point(18.3802, 11.71, 0), color=Color.from_hex("#ffffff"), width=0.35)
add(1, 'label', Point(0.597259, 10.7498, 0), text='R₁')
add(1, 'label', Point(19.6802, 10.91, 0), text='S₁')

# step 2 — The loads — in both diagrams
add(2, 'label', Point(44, 27.2, 0), text='Force Diagram')
add(2, 'label', Point(44, 25.8, 0), text='1 unit :: 0.75 kN')
add(2, 'segment', Line((4, -3.41, 0), (8, -3.41, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(2, 'segment', Line((8, -3.41, 0), (12, -3.41, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(2, 'segment', Line((12, -3.41, 0), (16, -3.41, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(2, 'segment', Line((4, -3.69, 0), (4, -3.13, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(2, 'segment', Line((8, -3.69, 0), (8, -3.13, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(2, 'segment', Line((12, -3.69, 0), (12, -3.13, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(2, 'segment', Line((16, -3.69, 0), (16, -3.13, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(2, 'label', Point(6, -2.61, 0), color=Color.from_hex("#aaaaaa"), text='4 m')
add(2, 'label', Point(10, -2.61, 0), color=Color.from_hex("#aaaaaa"), text='4 m')
add(2, 'label', Point(14, -2.61, 0), color=Color.from_hex("#aaaaaa"), text='4 m')
add(2, 'polyline', Polyline([(8, -2.2818, 0), (8, 22.8911, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.5)
add(2, 'polyline', Polyline([(12, -2.2818, 0), (12, 22.8911, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.5)
add(2, 'arrow', Line((8, 4, 0), (8, 2, 0)), color=Color.from_hex("#3f9c20"), width=0.2088, head=(0.648, 0.2448))
add(2, 'arrow', Line((12, 4, 0), (12, 2, 0)), color=Color.from_hex("#3f9c20"), width=0.2088, head=(0.648, 0.2448))
add(2, 'polyline', Polyline([(46.3339, -2.2818, 0), (46.3339, 22.8911, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.5)
add(2, 'arrow', Line((46.9939, 20.9594, 0), (46.9939, 10.2927, 0)), color=Color.from_hex("#3f9c20"), width=0.2088, head=(0.648, 0.2448))
add(2, 'arrow', Line((46.9939, 10.2927, 0), (46.9939, -0.373933, 0)), color=Color.from_hex("#3f9c20"), width=0.2088, head=(0.648, 0.2448))
add(2, 'label', Point(7.15, 2.35, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(2, 'label', Point(12.85, 2.35, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(2, 'label', Point(48.0439, 15.6261, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(2, 'label', Point(48.0439, 4.9594, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(2, 'point', Point(8, 4, 0), color=Color.from_hex("#ffffff"), width=0.35)
add(2, 'point', Point(12, 4, 0), color=Color.from_hex("#ffffff"), width=0.35)
add(2, 'point', Point(46.3339, 20.9594, 0), color=Color.from_hex("#ffffff"), width=0.35)
add(2, 'point', Point(46.3339, 10.2927, 0), color=Color.from_hex("#ffffff"), width=0.27)
add(2, 'point', Point(46.3339, -0.373933, 0), color=Color.from_hex("#ffffff"), width=0.27)
add(2, 'label', Point(7, 3.2, 0), text='L₁')
add(2, 'label', Point(13, 3.2, 0), text='M₁')
add(2, 'label', Point(47.9339, 21.3594, 0), text='O₁')
add(2, 'label', Point(48.0339, 9.39273, 0), text='P₁')
add(2, 'label', Point(47.9339, -0.873933, 0), text='Q₁')

# step 3 — Trial pole o′
add(3, 'point', Point(60.8804, 7.9474, 0), color=Color.from_hex("#ffffff"), width=0.35, until=15)
add(3, 'label', Point(62.1804, 7.9474, 0), text='o′', until=15)

# step 4 — Trial ray o′–Q₁
add(4, 'polyline', Polyline([(1.79726, -2.2818, 0), (1.79726, 22.8911, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.5)
add(4, 'segment', Line((46.3339, -0.373933, 0), (60.8804, 7.9474, 0)), color=Color.from_hex("#aaaaaa"), width=0.0792, until=15)
add(4, 'segment', Line((1.79726, 16.353, 0), (8, 19.9013, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152, until=15)
add(4, 'point', Point(1.79726, 16.353, 0), color=Color.from_hex("#ffffff"), width=0.35, until=15)
add(4, 'point', Point(8, 19.9013, 0), color=Color.from_hex("#ffffff"), width=0.27, until=15)

# step 5 — Trial ray o′–P₁
add(5, 'segment', Line((46.3339, 10.2927, 0), (60.8804, 7.9474, 0)), color=Color.from_hex("#aaaaaa"), width=0.0792, until=15)
add(5, 'segment', Line((8, 19.9013, 0), (12, 19.2564, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152, until=15)
add(5, 'point', Point(12, 19.2564, 0), color=Color.from_hex("#ffffff"), width=0.27, until=15)

# step 6 — Trial ray o′–O₁
add(6, 'polyline', Polyline([(18.3802, -2.2818, 0), (18.3802, 22.8911, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.5)
add(6, 'segment', Line((60.8804, 7.9474, 0), (46.3339, 20.9594, 0)), color=Color.from_hex("#aaaaaa"), width=0.0792, until=15)
add(6, 'segment', Line((12, 19.2564, 0), (18.3802, 13.5492, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152, until=15)
add(6, 'point', Point(18.3802, 13.5492, 0), color=Color.from_hex("#ffffff"), width=0.27, until=15)

# step 7 — The resultant, located
add(7, 'polyline', Polyline([(8, 19.9013, 0), (10, 21.0454, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.5, until=15)
add(7, 'polyline', Polyline([(12, 19.2564, 0), (10, 21.0454, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.5, until=15)
add(7, 'polyline', Polyline([(10, -2.2818, 0), (10, 22.8911, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.5)
add(7, 'arrow', Line((46.3339, 20.9594, 0), (46.3339, -0.373933, 0)), color=Color.from_hex("#3f9c20"), width=0.288, dash=0.66, head=(0.936, 0.36))
add(7, 'arrow', Line((10, 2.54538, 0), (10, -1.45462, 0)), color=Color.from_hex("#3f9c20"), width=0.288, dash=0.66, head=(0.936, 0.36))
add(7, 'label', Point(44.8339, 12.7927, 0), color=Color.from_hex("#3f9c20"), text='R')
add(7, 'label', Point(11.2, 0.545383, 0), color=Color.from_hex("#3f9c20"), text='R')
add(7, 'point', Point(10, 21.0454, 0), color=Color.from_hex("#ffffff"), width=0.27, until=15)
add(7, 'point', Point(10, 2.54538, 0), color=Color.from_hex("#ffffff"), width=0.35)

# step 8 — Trial closing string
add(8, 'polyline', Polyline([(1.79726, 16.353, 0), (18.3802, 13.5492, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.5, until=15)
add(8, 'polyline', Polyline([(60.8804, 7.9474, 0), (46.3339, 10.4068, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.5, until=15)
add(8, 'point', Point(46.3339, 10.4068, 0), color=Color.from_hex("#ffffff"), width=0.27)
add(8, 'label', Point(45.1339, 10.9068, 0), text='i')

# step 9 — The real chord → pole o
add(9, 'polyline', Polyline([(1.79726, 11.5498, 0), (18.3802, 11.71, 0)]), color=Color.from_hex("#111111"), dash=0.5)
add(9, 'polyline', Polyline([(47.7338, 10.4204, 0), (29.4079, 10.2433, 0)]), color=Color.from_hex("#111111"), dash=0.5)
add(9, 'point', Point(34.4077, 10.2916, 0), color=Color.from_hex("#ffffff"), width=0.35)
add(9, 'label', Point(34.0077, 8.99164, 0), text='o')

# step 10 — Cable 5 — form and force
add(10, 'segment', Line((46.3339, -0.373933, 0), (34.4077, 10.2916, 0)), color=Color.from_hex("#ce4095"), width=0.1728)
add(10, 'segment', Line((1.79726, 11.5498, 0), (8, 6.00272, 0)), color=Color.from_hex("#ce4095"), width=0.1728)
add(10, 'point', Point(8, 6.00272, 0), color=Color.from_hex("#ffffff"), width=0.27)
add(10, 'label', Point(6.6, 6.35272, 0), text='C₂')
add(10, 'label', Point(5.39863, 9.67626, 0), color=Color.from_hex("#ce4095"), text='5')
add(10, 'label', Point(40.7549, 5.9896, 0), color=Color.from_hex("#ce4095"), text='5')

# step 11 — Cable 2 — form and force
add(11, 'segment', Line((34.4077, 10.2916, 0), (46.3339, 10.2927, 0)), color=Color.from_hex("#ce4095"), width=0.1728)
add(11, 'segment', Line((8, 6.00272, 0), (12, 6.00309, 0)), color=Color.from_hex("#ce4095"), width=0.1728)
add(11, 'point', Point(12, 6.00309, 0), color=Color.from_hex("#ffffff"), width=0.27)
add(11, 'label', Point(13.4, 6.35309, 0), text='D₂')
add(11, 'label', Point(10, 6.9029, 0), color=Color.from_hex("#ce4095"), text='2')
add(11, 'label', Point(40.3708, 11.0922, 0), color=Color.from_hex("#ce4095"), text='2')

# step 12 — Cable 3 — form and force
add(12, 'segment', Line((34.4077, 10.2916, 0), (46.3339, 20.9594, 0)), color=Color.from_hex("#ce4095"), width=0.1728)
add(12, 'segment', Line((12, 6.00309, 0), (18.3802, 11.71, 0)), color=Color.from_hex("#ce4095"), width=0.1728)
add(12, 'polyline', Polyline([(8, 6.00272, 0), (10, 4.21413, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.5)
add(12, 'polyline', Polyline([(10, 4.21413, 0), (12, 6.00309, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.5)
add(12, 'point', Point(10, 4.21413, 0), color=Color.from_hex("#ffffff"), width=0.27)
add(12, 'label', Point(14.4901, 9.75654, 0), color=Color.from_hex("#ce4095"), text='3')
add(12, 'label', Point(40.7549, 14.5948, 0), color=Color.from_hex("#ce4095"), text='3')

# step 13 — Hangers 4 and 1
add(13, 'segment', Line((8, 6.00272, 0), (8, 4, 0)), color=Color.from_hex("#ce4095"), width=0.1728)
add(13, 'segment', Line((12, 6.00309, 0), (12, 4, 0)), color=Color.from_hex("#ce4095"), width=0.1728)
add(13, 'segment', Line((46.3339, 10.2927, 0), (46.3339, -0.373933, 0)), color=Color.from_hex("#ce4095"), width=0.1728)
add(13, 'segment', Line((46.3339, 20.9594, 0), (46.3339, 10.2927, 0)), color=Color.from_hex("#ce4095"), width=0.1728)
add(13, 'label', Point(7.1, 5.00136, 0), color=Color.from_hex("#ce4095"), text='4')
add(13, 'label', Point(12.9, 5.00154, 0), color=Color.from_hex("#ce4095"), text='1')
add(13, 'label', Point(45.2339, 4.9594, 0), color=Color.from_hex("#ce4095"), text='4')
add(13, 'label', Point(45.2339, 15.6261, 0), color=Color.from_hex("#ce4095"), text='1')

# step 14 — Reactions
add(14, 'arrow', Line((1.79726, 11.5498, 0), (0.306448, 12.883, 0)), color=Color.from_hex("#3f9c20"), width=0.2088, head=(0.648, 0.2448))
add(14, 'arrow', Line((18.3802, 11.71, 0), (19.8708, 13.0434, 0)), color=Color.from_hex("#3f9c20"), width=0.2088, head=(0.648, 0.2448))
add(14, 'arrow', Line((45.8939, -0.865901, 0), (33.9677, 9.79967, 0)), color=Color.from_hex("#3f9c20"), width=0.2088, head=(0.648, 0.2448))
add(14, 'arrow', Line((33.9676, 10.7836, 0), (45.8939, 21.4513, 0)), color=Color.from_hex("#3f9c20"), width=0.2088, head=(0.648, 0.2448))
add(14, 'label', Point(0.310701, 11.5377, 0), color=Color.from_hex("#3f9c20"), text='A')
add(14, 'label', Point(19.8667, 11.698, 0), color=Color.from_hex("#3f9c20"), text='B')
add(14, 'label', Point(38.9976, 3.42332, 0), color=Color.from_hex("#3f9c20"), text='A')
add(14, 'label', Point(38.9974, 17.1609, 0), color=Color.from_hex("#3f9c20"), text='B')

# step 15 — Tension
add(15, 'label', Point(55, 6.8, 0), color=Color.from_hex("#ce4095"), text='A = N₅ = 12.0 kN')
add(15, 'label', Point(55, 5.2, 0), color=Color.from_hex("#ce4095"), text='N₂ = 8.9 kN')
add(15, 'label', Point(55, 3.6, 0), color=Color.from_hex("#ce4095"), text='B = N₃ = 12.0 kN')
add(15, 'polygon', Polygon([(8.23997, 6.27106, 0), (7.76002, 5.73438, 0), (1.55728, 11.2815, 0), (2.03723, 11.8181, 0)]), color=Color.from_hex("#ce4095"))
add(15, 'polygon', Polygon([(8.00003, 5.73438, 0), (7.99998, 6.27106, 0), (12, 6.27143, 0), (12, 5.73475, 0)]), color=Color.from_hex("#ce4095"))
add(15, 'polygon', Polygon([(12.24, 5.73475, 0), (11.76, 6.27143, 0), (18.1401, 11.9783, 0), (18.6202, 11.4417, 0)]), color=Color.from_hex("#ce4095"))
add(15, 'polygon', Polygon([(8.24, 4, 0), (7.76, 4, 0), (7.76, 6.00272, 0), (8.24, 6.00272, 0)]), color=Color.from_hex("#ce4095"))
add(15, 'polygon', Polygon([(12.24, 4, 0), (11.76, 4, 0), (11.76, 6.00309, 0), (12.24, 6.00309, 0)]), color=Color.from_hex("#ce4095"))


if __name__ == "__main__":
    print("Drawing 3 — Pedestrian Bridge 2 —", len(ops), "operations")
