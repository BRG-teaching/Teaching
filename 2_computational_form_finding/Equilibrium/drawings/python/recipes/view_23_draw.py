"""Drawing 23 — Cable-stayed bridge

Auto-generated from ops/view_23.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-1.35, 14.2, 0), text='Form Diagram')
add(0, 'label', Point(-1.55, 13.55, 0), text='1 :: 200 m')
add(0, 'label', Point(19.65, 14.2, 0), text='Force Diagram')
add(0, 'label', Point(19.55, 13.55, 0), text='1 unit :: 50 kN')

# step 1 — The gorge
add(1, 'polygon', Polygon([(-0.005335, 4.62216, 0), (-1.1017, 4.62216, 0), (-0.974291, 0.160901, 0), (1.27961, 0.225272, 0), (1.01654, 1.03392, 0), (1.09327, 1.70825, 0), (0.780879, 2.5635, 0), (0.520551, 3.27621, 0), (0.071143, 3.8875, 0)]), color=Color.from_hex("#808080"), opacity=0.1)
add(1, 'segment', Line((-0.005335, 4.62216, 0), (-1.1017, 4.62216, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'segment', Line((1.27961, 0.225272, 0), (1.01654, 1.03392, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'segment', Line((1.01654, 1.03392, 0), (1.09327, 1.70825, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'segment', Line((1.09327, 1.70825, 0), (0.780879, 2.5635, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'segment', Line((0.780879, 2.5635, 0), (0.520551, 3.27621, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'segment', Line((0.520551, 3.27621, 0), (0.071143, 3.8875, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'segment', Line((0.071143, 3.8875, 0), (-0.005335, 4.62216, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'polygon', Polygon([(16.6494, 9.64442, 0), (16.1217, 9.16452, 0), (16.1697, 8.68462, 0), (15.7379, 7.91678, 0), (15.642, 7.19693, 0), (15.4021, 6.52507, 0), (15.4501, 6.09316, 0), (15.0183, 5.70924, 0), (14.6345, 5.08537, 0), (14.6345, 4.41351, 0), (14.4906, 3.78964, 0), (14.1547, 3.40571, 0), (14.0108, 2.87783, 0), (13.9149, 2.15797, 0), (12.4756, 2.15797, 0), (12.4277, 1.48611, 0), (12.2358, 0.910233, 0), (12.0439, 0.286363, 0), (17.3211, 0.238373, 0), (17.3211, 9.54844, 0)]), color=Color.from_hex("#808080"), opacity=0.1)
add(1, 'segment', Line((16.6494, 9.64442, 0), (16.1217, 9.16452, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'segment', Line((16.1217, 9.16452, 0), (16.1697, 8.68462, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'segment', Line((16.1697, 8.68462, 0), (15.7379, 7.91678, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'segment', Line((15.7379, 7.91678, 0), (15.642, 7.19693, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'segment', Line((15.642, 7.19693, 0), (15.4021, 6.52507, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'segment', Line((15.4021, 6.52507, 0), (15.4501, 6.09316, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'segment', Line((15.4501, 6.09316, 0), (15.0183, 5.70924, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'segment', Line((15.0183, 5.70924, 0), (14.6345, 5.08537, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'segment', Line((14.6345, 5.08537, 0), (14.6345, 4.41351, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'segment', Line((14.6345, 4.41351, 0), (14.4906, 3.78964, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'segment', Line((14.4906, 3.78964, 0), (14.1547, 3.40571, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'segment', Line((14.1547, 3.40571, 0), (14.0108, 2.87783, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'segment', Line((14.0108, 2.87783, 0), (13.9149, 2.15797, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'segment', Line((13.9149, 2.15797, 0), (12.4756, 2.15797, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'segment', Line((12.4756, 2.15797, 0), (12.4277, 1.48611, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'segment', Line((12.4277, 1.48611, 0), (12.2358, 0.910233, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'segment', Line((12.2358, 0.910233, 0), (12.0439, 0.286363, 0)), color=Color.from_hex("#808080"), width=0.02016)
add(1, 'segment', Line((17.3211, 9.54844, 0), (16.6494, 9.64442, 0)), color=Color.from_hex("#808080"), width=0.02016)

# step 2 — The deck
add(2, 'polyline', Polyline([(-0.005335, 2.12216, 0), (-0.005335, 4.62216, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.22)
add(2, 'polyline', Polyline([(-0.045811, -1.11792, 0), (-0.045811, 9.69389, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.22)
add(2, 'polyline', Polyline([(12.4652, -1.11792, 0), (12.4652, 9.69389, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.22)
add(2, 'polyline', Polyline([(1.24466, -1.11792, 0), (1.24466, 9.69389, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.13)
add(2, 'polyline', Polyline([(3.74466, -1.11792, 0), (3.74466, 9.69389, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.13)
add(2, 'polyline', Polyline([(6.24467, -1.11792, 0), (6.24467, 9.69389, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.13)
add(2, 'polyline', Polyline([(8.74466, -1.11792, 0), (8.74466, 9.69389, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.13)
add(2, 'polyline', Polyline([(11.2447, -1.11792, 0), (11.2447, 9.69389, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.13)
add(2, 'segment', Line((-0.005335, 4.62216, 0), (1.24466, 4.37216, 0)), color=Color.from_hex("#aaaaaa"), width=0.02016)
add(2, 'segment', Line((1.24466, 4.37216, 0), (3.74466, 3.87216, 0)), color=Color.from_hex("#aaaaaa"), width=0.02016)
add(2, 'segment', Line((3.74466, 3.87216, 0), (6.24467, 3.37216, 0)), color=Color.from_hex("#aaaaaa"), width=0.02016)
add(2, 'segment', Line((6.24467, 3.37216, 0), (8.74466, 2.87216, 0)), color=Color.from_hex("#aaaaaa"), width=0.02016)
add(2, 'segment', Line((8.74466, 2.87216, 0), (11.2447, 2.37216, 0)), color=Color.from_hex("#aaaaaa"), width=0.02016)
add(2, 'segment', Line((11.2447, 2.37216, 0), (12.4947, 2.12216, 0)), color=Color.from_hex("#aaaaaa"), width=0.02016)
add(2, 'point', Point(-0.005335, 4.62216, 0), color=Color.from_hex("#ffffff"), width=0.16)
add(2, 'point', Point(12.4947, 2.12216, 0), color=Color.from_hex("#ffffff"), width=0.12)
add(2, 'point', Point(1.24466, 4.37216, 0), color=Color.from_hex("#ffffff"), width=0.12)
add(2, 'point', Point(3.74466, 3.87216, 0), color=Color.from_hex("#ffffff"), width=0.12)
add(2, 'point', Point(6.24467, 3.37216, 0), color=Color.from_hex("#ffffff"), width=0.12)
add(2, 'point', Point(8.74466, 2.87216, 0), color=Color.from_hex("#ffffff"), width=0.12)
add(2, 'point', Point(11.2447, 2.37216, 0), color=Color.from_hex("#ffffff"), width=0.12)
add(2, 'label', Point(-0.505335, 4.97216, 0), text='A₆')
add(2, 'label', Point(12.0447, 2.50216, 0), text='B₃')

# step 3 — The mast
add(3, 'segment', Line((12.1447, 8.21216, 0), (14.1618, 3.31969, 0)), color=Color.from_hex("#aaaaaa"), width=0.02016)
add(3, 'segment', Line((12.2371, 8.25027, 0), (14.2543, 3.35781, 0)), color=Color.from_hex("#aaaaaa"), width=0.02016)
add(3, 'point', Point(12.1447, 8.21216, 0), color=Color.from_hex("#ffffff"), width=0.16)
add(3, 'point', Point(14.1618, 3.31969, 0), color=Color.from_hex("#ffffff"), width=0.12)
add(3, 'label', Point(11.6947, 8.51216, 0), text='D₂')
add(3, 'label', Point(13.8618, 2.83969, 0), text='B₁₄')

# step 4 — Five stays
add(4, 'segment', Line((12.1447, 8.21216, 0), (1.24466, 4.37216, 0)), color=Color.from_hex("#aaaaaa"), width=0.02016)
add(4, 'segment', Line((12.1447, 8.21216, 0), (3.74466, 3.87216, 0)), color=Color.from_hex("#aaaaaa"), width=0.02016)
add(4, 'segment', Line((12.1447, 8.21216, 0), (6.24467, 3.37216, 0)), color=Color.from_hex("#aaaaaa"), width=0.02016)
add(4, 'segment', Line((12.1447, 8.21216, 0), (8.74466, 2.87216, 0)), color=Color.from_hex("#aaaaaa"), width=0.02016)
add(4, 'segment', Line((12.1447, 8.21216, 0), (11.2447, 2.37216, 0)), color=Color.from_hex("#aaaaaa"), width=0.02016)

# step 5 — The backstay
add(5, 'segment', Line((12.1447, 8.21216, 0), (15.4037, 6.52096, 0)), color=Color.from_hex("#aaaaaa"), width=0.02016)
add(5, 'point', Point(15.4037, 6.52096, 0), color=Color.from_hex("#ffffff"), width=0.16)
add(5, 'label', Point(15.7237, 6.80096, 0), text='K')

# step 6 — The loads and the load line
add(6, 'arrow', Line((11.2447, 2.37216, 0), (11.2447, 0.872157, 0)), color=Color.from_hex("#3f9c20"), width=0.072, head=(0.3024, 0.1296))
add(6, 'label', Point(11.5747, 1.44216, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(6, 'arrow', Line((19.8975, 9.80197, 0), (19.8975, 8.45294, 0)), color=Color.from_hex("#3f9c20"), width=0.072, head=(0.3024, 0.1296))
add(6, 'label', Point(19.5175, 9.12745, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(6, 'arrow', Line((8.74466, 2.87216, 0), (8.74466, 1.37216, 0)), color=Color.from_hex("#3f9c20"), width=0.072, head=(0.3024, 0.1296))
add(6, 'label', Point(9.07466, 1.94216, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(6, 'arrow', Line((19.8975, 8.45294, 0), (19.8975, 7.10392, 0)), color=Color.from_hex("#3f9c20"), width=0.072, head=(0.3024, 0.1296))
add(6, 'label', Point(19.5175, 7.77843, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(6, 'arrow', Line((6.24467, 3.37216, 0), (6.24467, 1.87216, 0)), color=Color.from_hex("#3f9c20"), width=0.072, head=(0.3024, 0.1296))
add(6, 'label', Point(6.57467, 2.44216, 0), color=Color.from_hex("#3f9c20"), text='F₃')
add(6, 'arrow', Line((19.8975, 7.10392, 0), (19.8975, 5.75489, 0)), color=Color.from_hex("#3f9c20"), width=0.072, head=(0.3024, 0.1296))
add(6, 'label', Point(19.5175, 6.42941, 0), color=Color.from_hex("#3f9c20"), text='F₃')
add(6, 'arrow', Line((3.74466, 3.87216, 0), (3.74466, 2.37216, 0)), color=Color.from_hex("#3f9c20"), width=0.072, head=(0.3024, 0.1296))
add(6, 'label', Point(4.07467, 2.94216, 0), color=Color.from_hex("#3f9c20"), text='F₄')
add(6, 'arrow', Line((19.8975, 5.75489, 0), (19.8975, 4.40587, 0)), color=Color.from_hex("#3f9c20"), width=0.072, head=(0.3024, 0.1296))
add(6, 'label', Point(19.5175, 5.08038, 0), color=Color.from_hex("#3f9c20"), text='F₄')
add(6, 'arrow', Line((1.24466, 4.37216, 0), (1.24466, 2.87216, 0)), color=Color.from_hex("#3f9c20"), width=0.072, head=(0.3024, 0.1296))
add(6, 'label', Point(1.57466, 3.44216, 0), color=Color.from_hex("#3f9c20"), text='F₅')
add(6, 'arrow', Line((20.5795, 4.40587, 0), (20.5795, 3.05685, 0)), color=Color.from_hex("#3f9c20"), width=0.072, head=(0.3024, 0.1296))
add(6, 'label', Point(19.5175, 3.73136, 0), color=Color.from_hex("#3f9c20"), text='F₅')
add(6, 'point', Point(19.8975, 9.80197, 0), color=Color.from_hex("#ffffff"), width=0.16)
add(6, 'label', Point(19.7975, 10.152, 0), text='R')
add(6, 'label', Point(19.5775, 8.67294, 0), text='S')
add(6, 'label', Point(19.5775, 7.32392, 0), text='T')
add(6, 'label', Point(19.5775, 5.97489, 0), text='U')
add(6, 'label', Point(19.5775, 4.62587, 0), text='V')
add(6, 'label', Point(19.5775, 2.80685, 0), text='W')
add(6, 'label', Point(28.6, 13.9, 0), color=Color.from_hex("#3f9c20"), text='Q_d = 67.5 kN / node')

# step 7 — Joint B₁₀ — members 1 and 2
add(7, 'segment', Line((-0.005335, 4.62216, 0), (1.24466, 4.37216, 0)), color=Color.from_hex("#1a1eb2"), width=0.0612)
add(7, 'segment', Line((1.24466, 4.37216, 0), (12.1447, 8.21216, 0)), color=Color.from_hex("#ce4095"), width=0.0612)
add(7, 'segment', Line((19.8975, 3.05685, 0), (22.34, 3.91735, 0)), color=Color.from_hex("#ce4095"), width=0.036)
add(7, 'label', Point(6.59498, 6.57511, 0), color=Color.from_hex("#ce4095"), text='1')
add(7, 'label', Point(21.2184, 3.20414, 0), color=Color.from_hex("#ce4095"), text='1')
add(7, 'segment', Line((1.24466, 4.37216, 0), (3.74466, 3.87216, 0)), color=Color.from_hex("#1a1eb2"), width=0.0612)
add(7, 'segment', Line((22.34, 3.91735, 0), (19.8975, 4.40587, 0)), color=Color.from_hex("#1a1eb2"), width=0.036)
add(7, 'label', Point(2.49466, 3.79216, 0), color=Color.from_hex("#1a1eb2"), text='2')
add(7, 'label', Point(21.1776, 4.45578, 0), color=Color.from_hex("#1a1eb2"), text='2')
add(7, 'point', Point(22.34, 3.91735, 0), color=Color.from_hex("#ffffff"), width=0.12)
add(7, 'label', Point(22.64, 3.63735, 0), text='Z')

# step 8 — Joint B₁ — members 3 and 4
add(8, 'segment', Line((3.74466, 3.87216, 0), (12.1447, 8.21216, 0)), color=Color.from_hex("#ce4095"), width=0.0612)
add(8, 'segment', Line((22.34, 3.91735, 0), (24.2224, 4.8899, 0)), color=Color.from_hex("#ce4095"), width=0.036)
add(8, 'label', Point(7.80696, 6.30868, 0), color=Color.from_hex("#ce4095"), text='3')
add(8, 'label', Point(23.4189, 4.1371, 0), color=Color.from_hex("#ce4095"), text='3')
add(8, 'segment', Line((3.74466, 3.87216, 0), (6.24467, 3.37216, 0)), color=Color.from_hex("#1a1eb2"), width=0.0612)
add(8, 'segment', Line((24.2224, 4.8899, 0), (19.8975, 5.75489, 0)), color=Color.from_hex("#1a1eb2"), width=0.036)
add(8, 'label', Point(4.99467, 3.29216, 0), color=Color.from_hex("#1a1eb2"), text='4')
add(8, 'label', Point(22.1188, 5.61657, 0), color=Color.from_hex("#1a1eb2"), text='4')
add(8, 'point', Point(24.2224, 4.8899, 0), color=Color.from_hex("#ffffff"), width=0.12)
add(8, 'label', Point(24.5424, 4.5899, 0), text='C₁')

# step 9 — Joint B₁₃ — members 5 and 6
add(9, 'segment', Line((6.24467, 3.37216, 0), (12.1447, 8.21216, 0)), color=Color.from_hex("#ce4095"), width=0.0612)
add(9, 'segment', Line((24.2224, 4.8899, 0), (25.5445, 5.9745, 0)), color=Color.from_hex("#ce4095"), width=0.036)
add(9, 'label', Point(9.00439, 6.0241, 0), color=Color.from_hex("#ce4095"), text='5')
add(9, 'label', Point(25.0737, 5.20026, 0), color=Color.from_hex("#ce4095"), text='5')
add(9, 'segment', Line((6.24467, 3.37216, 0), (8.74466, 2.87216, 0)), color=Color.from_hex("#1a1eb2"), width=0.0612)
add(9, 'segment', Line((25.5445, 5.9745, 0), (19.8975, 7.10392, 0)), color=Color.from_hex("#1a1eb2"), width=0.036)
add(9, 'label', Point(7.49467, 2.79216, 0), color=Color.from_hex("#1a1eb2"), text='6')
add(9, 'label', Point(22.7798, 6.83338, 0), color=Color.from_hex("#1a1eb2"), text='6')
add(9, 'point', Point(25.5445, 5.9745, 0), color=Color.from_hex("#ffffff"), width=0.12)
add(9, 'label', Point(25.9945, 5.6545, 0), text='D₁')

# step 10 — Joint B₁₂ — members 7 and 8
add(10, 'segment', Line((8.74466, 2.87216, 0), (12.1447, 8.21216, 0)), color=Color.from_hex("#ce4095"), width=0.0612)
add(10, 'segment', Line((25.5445, 5.9745, 0), (26.3064, 7.17115, 0)), color=Color.from_hex("#ce4095"), width=0.036)
add(10, 'label', Point(10.1916, 5.70328, 0), color=Color.from_hex("#ce4095"), text='7')
add(10, 'label', Point(26.1785, 6.4117, 0), color=Color.from_hex("#ce4095"), text='7')
add(10, 'segment', Line((8.74466, 2.87216, 0), (11.2447, 2.37216, 0)), color=Color.from_hex("#1a1eb2"), width=0.0612)
add(10, 'segment', Line((26.3064, 7.17115, 0), (19.8975, 8.45294, 0)), color=Color.from_hex("#1a1eb2"), width=0.036)
add(10, 'label', Point(9.99466, 2.29216, 0), color=Color.from_hex("#1a1eb2"), text='8')
add(10, 'label', Point(23.1608, 8.10622, 0), color=Color.from_hex("#1a1eb2"), text='8')
add(10, 'point', Point(26.3064, 7.17115, 0), color=Color.from_hex("#ffffff"), width=0.12)
add(10, 'label', Point(26.7864, 6.97114, 0), text='G₁')

# step 11 — Joint B₁₁ — members 9 and 10
add(11, 'segment', Line((11.2447, 2.37216, 0), (12.1447, 8.21216, 0)), color=Color.from_hex("#ce4095"), width=0.0612)
add(11, 'segment', Line((26.3064, 7.17115, 0), (26.5081, 8.47983, 0)), color=Color.from_hex("#ce4095"), width=0.036)
add(11, 'label', Point(11.3982, 5.33785, 0), color=Color.from_hex("#ce4095"), text='9')
add(11, 'label', Point(26.7038, 7.7798, 0), color=Color.from_hex("#ce4095"), text='9')
add(11, 'segment', Line((11.2447, 2.37216, 0), (12.4947, 2.12216, 0)), color=Color.from_hex("#1a1eb2"), width=0.0612)
add(11, 'segment', Line((26.5081, 8.47983, 0), (19.8975, 9.80197, 0)), color=Color.from_hex("#1a1eb2"), width=0.036)
add(11, 'label', Point(11.8697, 1.91716, 0), color=Color.from_hex("#1a1eb2"), text='10')
add(11, 'label', Point(23.2616, 9.43507, 0), color=Color.from_hex("#1a1eb2"), text='10')
add(11, 'point', Point(26.5081, 8.47983, 0), color=Color.from_hex("#ffffff"), width=0.12)
add(11, 'label', Point(27.0081, 8.27983, 0), text='H₁')

# step 12 — The fan node closes — members 11 and 12
add(12, 'segment', Line((12.1447, 8.21216, 0), (14.1618, 3.31969, 0)), color=Color.from_hex("#1a1eb2"), width=0.0612)
add(12, 'segment', Line((31.152, -2.78348, 0), (26.5081, 8.47983, 0)), color=Color.from_hex("#1a1eb2"), width=0.036)
add(12, 'label', Point(13.4676, 5.89553, 0), color=Color.from_hex("#1a1eb2"), text='11')
add(12, 'label', Point(28.5527, 2.73383, 0), color=Color.from_hex("#1a1eb2"), text='11')
add(12, 'segment', Line((12.1447, 8.21216, 0), (15.4037, 6.52096, 0)), color=Color.from_hex("#ce4095"), width=0.0612)
add(12, 'segment', Line((19.8975, 3.05685, 0), (31.152, -2.78348, 0)), color=Color.from_hex("#ce4095"), width=0.036)
add(12, 'label', Point(13.9308, 7.66835, 0), color=Color.from_hex("#ce4095"), text='12')
add(12, 'label', Point(25.6629, 0.402967, 0), color=Color.from_hex("#ce4095"), text='12')
add(12, 'segment', Line((12.2371, 8.25027, 0), (14.2543, 3.35781, 0)), color=Color.from_hex("#1a1eb2"), width=0.0306)
add(12, 'point', Point(31.152, -2.78348, 0), color=Color.from_hex("#ffffff"), width=0.12)
add(12, 'label', Point(31.302, -3.18348, 0), text='I₁')

# step 13 — The rock reactions A, B, C
add(13, 'polyline', Polyline([(19.8975, 9.80197, 0), (19.9563, 10.0961, 0)]), color=Color.from_hex("#006400"), dash=0.16)
add(13, 'polyline', Polyline([(26.5081, 8.47983, 0), (26.567, 8.77401, 0)]), color=Color.from_hex("#006400"), dash=0.16)
add(13, 'arrow', Line((26.7007, 9.4428, 0), (20.09, 10.7649, 0)), color=Color.from_hex("#3f9c20"), width=0.0936, head=(0.36, 0.1584))
add(13, 'arrow', Line((13.9655, 1.82798, 0), (12.4947, 2.12216, 0)), color=Color.from_hex("#3f9c20"), width=0.0936, head=(0.36, 0.1584))
add(13, 'label', Point(14.1155, 1.44798, 0), color=Color.from_hex("#3f9c20"), text='A')
add(13, 'label', Point(23.2616, 9.83507, 0), color=Color.from_hex("#3f9c20"), text='A')
add(13, 'polyline', Polyline([(26.5081, 8.47983, 0), (26.7855, 8.59418, 0)]), color=Color.from_hex("#006400"), dash=0.16)
add(13, 'polyline', Polyline([(31.152, -2.78348, 0), (31.4294, -2.66912, 0)]), color=Color.from_hex("#006400"), dash=0.16)
add(13, 'arrow', Line((32.0599, -2.40915, 0), (27.416, 8.85416, 0)), color=Color.from_hex("#3f9c20"), width=0.0936, head=(0.36, 0.1584))
add(13, 'arrow', Line((14.7336, 1.93294, 0), (14.1618, 3.31969, 0)), color=Color.from_hex("#3f9c20"), width=0.0936, head=(0.36, 0.1584))
add(13, 'label', Point(15.1136, 1.78294, 0), color=Color.from_hex("#3f9c20"), text='B')
add(13, 'label', Point(29.5574, 3.06253, 0), color=Color.from_hex("#3f9c20"), text='B')
add(13, 'polyline', Polyline([(19.8975, 3.05685, 0), (19.7593, 2.79056, 0)]), color=Color.from_hex("#006400"), dash=0.16)
add(13, 'polyline', Polyline([(31.152, -2.78348, 0), (31.0138, -3.04976, 0)]), color=Color.from_hex("#006400"), dash=0.16)
add(13, 'arrow', Line((19.4451, 2.18518, 0), (30.6997, -3.65514, 0)), color=Color.from_hex("#3f9c20"), width=0.0936, head=(0.36, 0.1584))
add(13, 'arrow', Line((15.4037, 6.52096, 0), (16.7351, 5.83006, 0)), color=Color.from_hex("#3f9c20"), width=0.0936, head=(0.36, 0.1584))
add(13, 'label', Point(17.1151, 5.88006, 0), color=Color.from_hex("#3f9c20"), text='C')
add(13, 'label', Point(25.2865, -0.579597, 0), color=Color.from_hex("#3f9c20"), text='C')

# step 14 — Tension and compression
add(14, 'polygon', Polygon([(1.27909, 4.27445, 0), (1.21024, 4.46986, 0), (12.1102, 8.30986, 0), (12.1791, 8.11445, 0)]), color=Color.from_hex("#ce4095"))
add(14, 'polygon', Polygon([(1.23489, 4.32331, 0), (1.25443, 4.42101, 0), (3.75443, 3.92101, 0), (3.73489, 3.8233, 0)]), color=Color.from_hex("#1a1eb2"))
add(14, 'polygon', Polygon([(3.78357, 3.79686, 0), (3.70576, 3.94745, 0), (12.1058, 8.28745, 0), (12.1836, 8.13686, 0)]), color=Color.from_hex("#ce4095"))
add(14, 'polygon', Polygon([(3.72736, 3.78566, 0), (3.76196, 3.95865, 0), (6.26196, 3.45865, 0), (6.22736, 3.28566, 0)]), color=Color.from_hex("#1a1eb2"))
add(14, 'polygon', Polygon([(6.28805, 3.31927, 0), (6.20128, 3.42504, 0), (12.1013, 8.26504, 0), (12.188, 8.15927, 0)]), color=Color.from_hex("#ce4095"))
add(14, 'polygon', Polygon([(6.22208, 3.25922, 0), (6.26725, 3.4851, 0), (8.76725, 2.9851, 0), (8.72208, 2.75922, 0)]), color=Color.from_hex("#1a1eb2"))
add(14, 'polygon', Polygon([(8.79253, 2.84168, 0), (8.6968, 2.90263, 0), (12.0968, 8.24263, 0), (12.1925, 8.18168, 0)]), color=Color.from_hex("#ce4095"))
add(14, 'polygon', Polygon([(8.71903, 2.74398, 0), (8.7703, 3.00034, 0), (11.2703, 2.50034, 0), (11.219, 2.24398, 0)]), color=Color.from_hex("#1a1eb2"))
add(14, 'polygon', Polygon([(11.297, 2.36409, 0), (11.1923, 2.38022, 0), (12.0923, 8.22022, 0), (12.197, 8.20409, 0)]), color=Color.from_hex("#ce4095"))
add(14, 'polygon', Polygon([(11.2182, 2.23994, 0), (11.2711, 2.50437, 0), (12.5211, 2.25437, 0), (12.4682, 1.98994, 0)]), color=Color.from_hex("#1a1eb2"))
add(14, 'polygon', Polygon([(11.9194, 8.11928, 0), (12.3699, 8.30503, 0), (14.3871, 3.41257, 0), (13.9366, 3.22682, 0)]), color=Color.from_hex("#1a1eb2"))
add(14, 'polygon', Polygon([(12.0279, 7.98707, 0), (12.2615, 8.43725, 0), (15.5205, 6.74605, 0), (15.2869, 6.29587, 0)]), color=Color.from_hex("#ce4095"))
add(14, 'label', Point(28.6, 13.2, 0), color=Color.from_hex("#3f9c20"), text='A = 337 kN')
add(14, 'label', Point(28.6, 12.5, 0), color=Color.from_hex("#3f9c20"), text='B = 609 kN')
add(14, 'label', Point(28.6, 11.8, 0), color=Color.from_hex("#3f9c20"), text='C = 634 kN')


if __name__ == "__main__":
    print("Drawing 23 — Cable-stayed bridge —", len(ops), "operations")
