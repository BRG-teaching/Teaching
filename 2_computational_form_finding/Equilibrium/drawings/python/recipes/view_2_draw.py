"""Drawing 2 — Pedestrian Bridge 1

Auto-generated from ops/view_2.json — the drawing as literal COMPAS
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
add(0, 'label', Point(12.9, 32.9, 0), text='Form Diagram')
add(0, 'label', Point(12.9, 31.4, 0), text='1 unit :: 1 m')

# step 1 — The site
add(1, 'segment', Line((5, 10.5, 0), (4.5734, 12.6843, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((4.5734, 12.6843, 0), (4.8787, 16.3483, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((4.8787, 16.3483, 0), (4.5729, 19.3284, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((4.5729, 19.3284, 0), (2.5946, 29.1644, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((20.83, 10.5, 0), (21.0615, 12.3026, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((21.0615, 12.3026, 0), (20.6798, 13.9056, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((20.6798, 13.9056, 0), (21.2905, 18.0277, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((21.2905, 18.0277, 0), (21.4431, 21.4627, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((21.4431, 21.4627, 0), (20.9088, 25.432, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((20.9088, 25.432, 0), (18.8478, 27.7984, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((18.8478, 27.7984, 0), (18.9871, 29.274, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((5, 10.5, 0), (6.89, 10.5, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((6.89, 10.5, 0), (6.9809, 8.4608, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((6.9809, 8.4608, 0), (7.2878, 4.6247, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((20.83, 10.5, 0), (18.89, 10.5, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((18.89, 10.5, 0), (18.6428, 8.5375, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((18.6428, 8.5375, 0), (18.1057, 6.5427, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((18.1057, 6.5427, 0), (18.1057, 4.548, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((4.90224, 11.0005, 0), (4.23862, 11.4473, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((4.73931, 11.8348, 0), (4.07569, 12.2815, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((4.57638, 12.669, 0), (3.91276, 13.1158, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((4.61575, 13.1925, 0), (4.09899, 13.8032, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((4.68633, 14.0396, 0), (4.16957, 14.6503, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((4.75691, 14.8867, 0), (4.24015, 15.4974, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((4.82749, 15.7337, 0), (4.31073, 16.3444, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((4.82664, 16.8556, 0), (4.20617, 17.3606, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((4.73987, 17.7012, 0), (4.1194, 18.2062, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((4.65311, 18.5468, 0), (4.03263, 19.0517, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((4.47234, 19.8284, 0), (3.80622, 20.2714, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((4.30473, 20.6617, 0), (3.63861, 21.1047, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((4.13713, 21.495, 0), (3.47101, 21.9381, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((3.96953, 22.3283, 0), (3.30341, 22.7714, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((3.80193, 23.1616, 0), (3.13581, 23.6047, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((3.63432, 23.9949, 0), (2.9682, 24.438, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((3.46672, 24.8283, 0), (2.8006, 25.2713, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((3.29912, 25.6616, 0), (2.633, 26.1046, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((3.13152, 26.4949, 0), (2.46539, 26.9379, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((2.96391, 27.3282, 0), (2.29779, 27.7712, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((2.79631, 28.1615, 0), (2.13019, 28.6045, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((2.62871, 28.9948, 0), (1.96259, 29.4379, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((20.895, 11.0058, 0), (21.5281, 11.4949, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((21.0032, 11.8489, 0), (21.6364, 12.3379, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((20.9434, 12.7987, 0), (21.3626, 13.4801, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((20.7465, 13.6256, 0), (21.1657, 14.3069, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((20.7545, 14.4101, 0), (21.397, 14.8868, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((20.8791, 15.2509, 0), (21.5216, 15.7276, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((21.0037, 16.0917, 0), (21.6462, 16.5684, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((21.1283, 16.9326, 0), (21.7707, 17.4092, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((21.2528, 17.7734, 0), (21.8953, 18.2501, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((21.3131, 18.5372, 0), (21.9034, 19.0772, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((21.3509, 19.3864, 0), (21.9411, 19.9264, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((21.3886, 20.2355, 0), (21.9788, 20.7755, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((21.4263, 21.0847, 0), (22.0165, 21.6247, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((21.3751, 21.9681, 0), (21.8602, 22.6042, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((21.2617, 22.8105, 0), (21.7468, 23.4466, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((21.1483, 23.6529, 0), (21.6334, 24.289, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((21.0349, 24.4953, 0), (21.52, 25.1314, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((20.9215, 25.3378, 0), (21.4067, 25.9738, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((20.5738, 25.8166, 0), (20.6289, 26.6147, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((20.0156, 26.4576, 0), (20.0706, 27.2557, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((19.4573, 27.0985, 0), (19.5124, 27.8966, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((18.8991, 27.7395, 0), (18.9541, 28.5376, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((18.8957, 28.3061, 0), (19.5121, 28.8162, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((18.9756, 29.1524, 0), (19.592, 29.6624, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((5.51, 10.5, 0), (6.07569, 9.93431, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((6.36, 10.5, 0), (6.92568, 9.93431, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((6.91271, 9.99051, 0), (6.37278, 9.40019, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((6.95056, 9.14135, 0), (6.41063, 8.55103, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((7.02157, 7.95242, 0), (6.5028, 7.34343, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((7.08936, 7.10513, 0), (6.57059, 6.49613, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((7.15714, 6.25784, 0), (6.63837, 5.64884, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((7.22493, 5.41055, 0), (6.70616, 4.80155, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((20.32, 10.5, 0), (19.7543, 9.93431, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((19.47, 10.5, 0), (18.9043, 9.93431, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((18.8263, 9.994, 0), (19.3168, 9.36205, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((18.72, 9.15066, 0), (19.2106, 8.51872, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((18.5102, 8.04504, 0), (18.9094, 7.35173, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((18.2892, 7.22427, 0), (18.6884, 6.53096, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((18.1057, 6.0327, 0), (18.6714, 5.46701, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'segment', Line((18.1057, 5.1827, 0), (18.6714, 4.61702, 0)), color=Color.from_hex("#b9b9b9"), width=0.0396)
add(1, 'polygon', Polygon([(6.89, 10.32, 0), (18.89, 10.32, 0), (18.89, 10.68, 0), (6.89, 10.68, 0)]), color=Color.from_hex("#ffffff"))
add(1, 'segment', Line((6.89, 10.32, 0), (18.89, 10.32, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((18.89, 10.32, 0), (18.89, 10.68, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((18.89, 10.68, 0), (6.89, 10.68, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((6.89, 10.68, 0), (6.89, 10.32, 0)), color=Color.from_hex("#111111"), width=0.1008)
add(1, 'segment', Line((6.89, 1.9, 0), (18.89, 1.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(1, 'segment', Line((6.89, 1.62, 0), (6.89, 2.18, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(1, 'segment', Line((18.89, 1.62, 0), (18.89, 2.18, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(1, 'label', Point(12.89, 1.15, 0), color=Color.from_hex("#aaaaaa"), text='12.0 m')

# step 2 — The load — in both diagrams
add(2, 'label', Point(41, 32.9, 0), text='Force Diagram')
add(2, 'label', Point(41, 31.4, 0), text='1 unit :: 0.70 kN')
add(2, 'segment', Line((6.89, 3.17, 0), (12.89, 3.17, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(2, 'segment', Line((12.89, 3.17, 0), (18.89, 3.17, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(2, 'segment', Line((6.89, 2.89, 0), (6.89, 3.45, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(2, 'segment', Line((12.89, 2.89, 0), (12.89, 3.45, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(2, 'segment', Line((18.89, 2.89, 0), (18.89, 3.45, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(2, 'label', Point(9.89, 3.82, 0), color=Color.from_hex("#aaaaaa"), text='6.0 m')
add(2, 'label', Point(15.89, 3.82, 0), color=Color.from_hex("#aaaaaa"), text='6.0 m')
add(2, 'arrow', Line((12.89, 10.5, 0), (12.89, 7.5, 0)), color=Color.from_hex("#3f9c20"), width=0.2088, head=(0.648, 0.2448))
add(2, 'polyline', Polyline([(48.3749, 4.1079, 0), (48.3749, 29.199, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.5)
add(2, 'arrow', Line((49.2249, 25.7185, 0), (49.2249, 8.57564, 0)), color=Color.from_hex("#3f9c20"), width=0.2088, head=(0.648, 0.2448))
add(2, 'label', Point(11.69, 9, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(2, 'label', Point(50.5749, 17.1471, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(2, 'point', Point(12.89, 10.5, 0), color=Color.from_hex("#ffffff"), width=0.35)
add(2, 'point', Point(48.3749, 25.7185, 0), color=Color.from_hex("#ffffff"), width=0.35)
add(2, 'point', Point(48.3749, 8.57564, 0), color=Color.from_hex("#ffffff"), width=0.27)
add(2, 'label', Point(11.79, 9.9, 0), text='C₂')
add(2, 'label', Point(49.8749, 26.7185, 0), text='Z')
add(2, 'label', Point(49.9749, 7.57564, 0), text='A₁')

# step 3 — Hanger 1 — form and force
add(3, 'polyline', Polyline([(12.89, 4.1079, 0), (12.89, 29.199, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.5)
add(3, 'segment', Line((12.89, 10.5, 0), (12.89, 13.0028, 0)), color=Color.from_hex("#ce4095"), width=0.1728)
add(3, 'segment', Line((48.3749, 25.7185, 0), (48.3749, 8.57564, 0)), color=Color.from_hex("#ce4095"), width=0.1728)
add(3, 'point', Point(12.89, 13.0028, 0), color=Color.from_hex("#ffffff"), width=0.35)
add(3, 'label', Point(13.99, 12.5028, 0), text='C₃')
add(3, 'label', Point(11.99, 11.8514, 0), color=Color.from_hex("#ce4095"), text='1')
add(3, 'label', Point(47.2749, 17.1475, 0), color=Color.from_hex("#ce4095"), text='1')

# step 4 — Cable 2 — form and force
add(4, 'segment', Line((12.89, 13.0028, 0), (4.73898, 17.7099, 0)), color=Color.from_hex("#ce4095"), width=0.1728)
add(4, 'polyline', Polyline([(51.8388, 6.57529, 0), (28.3253, 20.154, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.5)
add(4, 'point', Point(4.73898, 17.7099, 0), color=Color.from_hex("#ffffff"), width=0.35)
add(4, 'label', Point(3.53898, 16.8099, 0), text='V')
add(4, 'label', Point(8.51449, 16.3563, 0), color=Color.from_hex("#ce4095"), text='2')

# step 5 — Cable 3 — form and force
add(5, 'segment', Line((12.89, 13.0028, 0), (21.2612, 17.8298, 0)), color=Color.from_hex("#ce4095"), width=0.1728)
add(5, 'polyline', Polyline([(51.8401, 27.7166, 0), (28.3233, 14.1563, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.5)
add(5, 'point', Point(21.2612, 17.8298, 0), color=Color.from_hex("#ffffff"), width=0.35)
add(5, 'label', Point(22.4612, 16.9298, 0), text='W')
add(5, 'label', Point(17.3756, 16.4163, 0), color=Color.from_hex("#ce4095"), text='3')

# step 6 — Point B₁
add(6, 'point', Point(33.5211, 17.1535, 0), color=Color.from_hex("#ffffff"), width=0.27)
add(6, 'label', Point(32.1211, 17.1535, 0), text='B₁')

# step 7 — Cable forces
add(7, 'segment', Line((48.3749, 8.57564, 0), (33.5211, 17.1535, 0)), color=Color.from_hex("#ce4095"), width=0.1728)
add(7, 'segment', Line((33.5211, 17.1535, 0), (48.3749, 25.7185, 0)), color=Color.from_hex("#ce4095"), width=0.1728)
add(7, 'label', Point(41.4983, 13.817, 0), color=Color.from_hex("#ce4095"), text='2')
add(7, 'label', Point(41.4981, 20.4834, 0), color=Color.from_hex("#ce4095"), text='3')

# step 8 — Follow the arrows
add(8, 'arrow', Line((47.9498, 7.83956, 0), (33.096, 16.4174, 0)), color=Color.from_hex("#3f9c20"), width=0.2088, head=(0.648, 0.2448))
add(8, 'arrow', Line((33.0965, 17.8898, 0), (47.9503, 26.4549, 0)), color=Color.from_hex("#3f9c20"), width=0.2088, head=(0.648, 0.2448))
add(8, 'arrow', Line((4.73898, 17.7099, 0), (2.14106, 19.2102, 0)), color=Color.from_hex("#3f9c20"), width=0.2088, head=(0.648, 0.2448))
add(8, 'arrow', Line((21.2612, 17.8298, 0), (23.8601, 19.3284, 0)), color=Color.from_hex("#3f9c20"), width=0.2088, head=(0.648, 0.2448))
add(8, 'label', Point(2.81004, 17.6691, 0), color=Color.from_hex("#3f9c20"), text='A')
add(8, 'label', Point(23.1901, 17.7877, 0), color=Color.from_hex("#3f9c20"), text='B')
add(8, 'label', Point(39.7978, 10.8728, 0), color=Color.from_hex("#3f9c20"), text='A')
add(8, 'label', Point(39.7991, 23.4285, 0), color=Color.from_hex("#3f9c20"), text='B')

# step 9 — Tension
add(9, 'label', Point(56.5, 7.6, 0), color=Color.from_hex("#ce4095"), text='A = N₂ = 12.0 kN')
add(9, 'label', Point(56.5, 5.8, 0), color=Color.from_hex("#ce4095"), text='B = N₃ = 12.0 kN')
add(9, 'polygon', Polygon([(12.53, 13.0028, 0), (13.25, 13.0028, 0), (13.25, 10.5, 0), (12.53, 10.5, 0)]), color=Color.from_hex("#ce4095"))
add(9, 'polygon', Polygon([(13.0701, 13.3147, 0), (12.7099, 12.6909, 0), (4.55885, 17.398, 0), (4.91912, 18.0218, 0)]), color=Color.from_hex("#ce4095"))
add(9, 'polygon', Polygon([(13.0699, 12.6909, 0), (12.7101, 13.3147, 0), (21.0813, 18.1417, 0), (21.441, 17.5179, 0)]), color=Color.from_hex("#ce4095"))


if __name__ == "__main__":
    print("Drawing 2 — Pedestrian Bridge 1 —", len(ops), "operations")
