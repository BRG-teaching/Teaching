"""Drawing 6 — Funicular Line Through Two Points 2

Auto-generated from ops/view_6.json — the drawing as literal COMPAS
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
add(0, 'label', Point(7, 77.5, 0), text='Form Diagram')
add(0, 'label', Point(77, 77.5, 0), text='Force Diagram')
add(0, 'label', Point(77, 75.3, 0), text='1 unit :: 0.22 kN')

# step 1 — The loads — in both diagrams
add(1, 'polyline', Polyline([(17.4022, 76.0106, 0), (5.63935, 17.1975, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.85)
add(1, 'arrow', Line((13, 54, 0), (12.0194, 49.0971, 0)), color=Color.from_hex("#3f9c20"), width=0.36, head=(1.152, 0.432))
add(1, 'arrow', Line((99.6739, 46.7919, 0), (97.3792, 35.3191, 0)), color=Color.from_hex("#3f9c20"), width=0.36, head=(1.152, 0.432))
add(1, 'polyline', Polyline([(20.2719, 76.0106, 0), (21.9182, 17.1975, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.85)
add(1, 'arrow', Line((21, 50, 0), (21.1399, 45.002, 0)), color=Color.from_hex("#3f9c20"), width=0.36, head=(1.152, 0.432))
add(1, 'arrow', Line((99.422, 55.7884, 0), (99.6739, 46.7919, 0)), color=Color.from_hex("#3f9c20"), width=0.36, head=(1.152, 0.432))
add(1, 'polyline', Polyline([(33.554, 76.0106, 0), (48.1058, 17.1975, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.85)
add(1, 'arrow', Line((39, 54, 0), (40.2009, 49.1464, 0)), color=Color.from_hex("#3f9c20"), width=0.36, head=(1.152, 0.432))
add(1, 'arrow', Line((96.6119, 67.1459, 0), (99.422, 55.7884, 0)), color=Color.from_hex("#3f9c20"), width=0.36, head=(1.152, 0.432))
add(1, 'label', Point(10.8427, 51.882, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(1, 'label', Point(100.488, 40.6633, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(1, 'label', Point(19.3706, 47.4534, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(1, 'label', Point(101.547, 51.3461, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(1, 'label', Point(37.9502, 51.1649, 0), color=Color.from_hex("#3f9c20"), text='F₃')
add(1, 'label', Point(99.9584, 61.9475, 0), color=Color.from_hex("#3f9c20"), text='F₃')
add(1, 'point', Point(13, 54, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(1, 'point', Point(12.0194, 49.0971, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(1, 'point', Point(21, 50, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(1, 'point', Point(39, 54, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(1, 'point', Point(40.2009, 49.1464, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(1, 'point', Point(96.6119, 67.1459, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(1, 'point', Point(99.422, 55.7884, 0), color=Color.from_hex("#ffffff"), width=0.47)
add(1, 'point', Point(99.6739, 46.7919, 0), color=Color.from_hex("#ffffff"), width=0.47)
add(1, 'point', Point(97.3792, 35.3191, 0), color=Color.from_hex("#ffffff"), width=0.47)
add(1, 'label', Point(98.3119, 67.8459, 0), text='I')

# step 2 — Two points to pass through
add(2, 'polyline', Polyline([(3.7187, 76.0106, 0), (5.13669, 17.1975, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.85)
add(2, 'polyline', Polyline([(51.8635, 76.0106, 0), (53.2815, 17.1975, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.85)
add(2, 'point', Point(3.9914, 64.7, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(2, 'point', Point(52.1721, 63.2101, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(2, 'label', Point(2.2914, 63.4, 0), text='E₃')
add(2, 'label', Point(53.8721, 61.9101, 0), text='G₃')

# step 3 — Trial pole o′
add(3, 'point', Point(117.487, 52.9398, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(3, 'label', Point(119.287, 52.9398, 0), text='o′')

# step 4 — Trial ray o′–L
add(4, 'segment', Line((97.3792, 35.3191, 0), (117.487, 52.9398, 0)), color=Color.from_hex("#aaaaaa"), width=0.1296)
add(4, 'segment', Line((4.96685, 24.2418, 0), (7.49055, 26.4533, 0)), color=Color.from_hex("#aaaaaa"), width=0.2304)
add(4, 'point', Point(4.96685, 24.2418, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(4, 'point', Point(7.49055, 26.4533, 0), color=Color.from_hex("#ffffff"), width=0.47)

# step 5 — Trial ray o′–K
add(5, 'segment', Line((99.6739, 46.7919, 0), (117.487, 52.9398, 0)), color=Color.from_hex("#aaaaaa"), width=0.1296)
add(5, 'segment', Line((7.49055, 26.4533, 0), (21.5235, 31.2965, 0)), color=Color.from_hex("#aaaaaa"), width=0.2304)
add(5, 'point', Point(21.5235, 31.2965, 0), color=Color.from_hex("#ffffff"), width=0.47)

# step 6 — Trial ray o′–J
add(6, 'segment', Line((99.422, 55.7884, 0), (117.487, 52.9398, 0)), color=Color.from_hex("#aaaaaa"), width=0.1296)
add(6, 'segment', Line((21.5235, 31.2965, 0), (45.555, 27.5071, 0)), color=Color.from_hex("#aaaaaa"), width=0.2304)
add(6, 'point', Point(45.555, 27.5071, 0), color=Color.from_hex("#ffffff"), width=0.47)

# step 7 — Trial ray o′–I
add(7, 'segment', Line((96.6119, 67.1459, 0), (117.487, 52.9398, 0)), color=Color.from_hex("#aaaaaa"), width=0.1296)
add(7, 'segment', Line((45.555, 27.5071, 0), (53.1576, 22.3333, 0)), color=Color.from_hex("#aaaaaa"), width=0.2304)
add(7, 'point', Point(53.1576, 22.3333, 0), color=Color.from_hex("#ffffff"), width=0.47)

# step 8 — The resultant, located
add(8, 'arrow', Line((96.6119, 67.1459, 0), (97.3792, 35.3191, 0)), color=Color.from_hex("#3f9c20"), width=0.504, dash=1.1, head=(1.584, 0.612))
add(8, 'polyline', Polyline([(7.49055, 26.4533, 0), (24.8062, 41.6272, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.85)
add(8, 'polyline', Polyline([(24.8062, 41.6272, 0), (45.555, 27.5071, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.85)
add(8, 'polyline', Polyline([(23.9772, 76.0106, 0), (25.3952, 17.1975, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.85)
add(8, 'arrow', Line((24.6903, 46.4358, 0), (24.9313, 36.4387, 0)), color=Color.from_hex("#3f9c20"), width=0.504, dash=1.1, head=(1.584, 0.612))
add(8, 'point', Point(24.8062, 41.6272, 0), color=Color.from_hex("#ffffff"), width=0.47)
add(8, 'point', Point(24.6903, 46.4358, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(8, 'label', Point(95.1956, 51.2325, 0), color=Color.from_hex("#3f9c20"), text='R')
add(8, 'label', Point(26.5108, 41.4372, 0), color=Color.from_hex("#3f9c20"), text='R')

# step 9 — Choose M₁
add(9, 'point', Point(24.6285, 49, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(9, 'label', Point(26.3285, 49.4, 0), text='M₁')

# step 10 — The funicular of R alone
add(10, 'polyline', Polyline([(3.9914, 64.7, 0), (52.1721, 63.2101, 0)]), color=Color.from_hex("#111111"), dash=1.1)
add(10, 'polyline', Polyline([(24.6285, 49, 0), (3.9914, 64.7, 0)]), color=Color.from_hex("#aaaaaa"), dash=1.1, until=12)
add(10, 'polyline', Polyline([(24.6285, 49, 0), (52.1721, 63.2101, 0)]), color=Color.from_hex("#aaaaaa"), dash=1.1, until=12)

# step 11 — The pole o
add(11, 'polyline', Polyline([(97.3792, 35.3191, 0), (72.1398, 54.5204, 0)]), color=Color.from_hex("#aaaaaa"), dash=1.1, until=12)
add(11, 'polyline', Polyline([(96.6119, 67.1459, 0), (72.1398, 54.5204, 0)]), color=Color.from_hex("#aaaaaa"), dash=1.1, until=12)
add(11, 'point', Point(72.1398, 54.5204, 0), color=Color.from_hex("#ffffff"), width=0.47)
add(11, 'label', Point(71.5398, 52.7204, 0), text='o')

# step 12 — Segment 1 — form and force
add(12, 'segment', Line((97.3792, 35.3191, 0), (72.1398, 54.5204, 0)), color=Color.from_hex("#ce4095"), width=0.288)
add(12, 'segment', Line((3.9914, 64.7, 0), (13.6677, 57.3386, 0)), color=Color.from_hex("#ce4095"), width=0.288)
add(12, 'point', Point(13.6677, 57.3386, 0), color=Color.from_hex("#ffffff"), width=0.47)
add(12, 'label', Point(12.0677, 56.2386, 0), text='I')
add(12, 'label', Point(9.79832, 62.2927, 0), color=Color.from_hex("#ce4095"), text='1')
add(12, 'label', Point(85.5594, 46.4198, 0), color=Color.from_hex("#ce4095"), text='1')

# step 13 — Segment 2 — form and force
add(13, 'segment', Line((99.6739, 46.7919, 0), (72.1398, 54.5204, 0)), color=Color.from_hex("#ce4095"), width=0.288)
add(13, 'segment', Line((13.6677, 57.3386, 0), (20.851, 55.3223, 0)), color=Color.from_hex("#ce4095"), width=0.288)
add(13, 'point', Point(20.851, 55.3223, 0), color=Color.from_hex("#ffffff"), width=0.47)
add(13, 'label', Point(19.251, 54.3223, 0), text='II')
add(13, 'label', Point(17.6918, 57.8709, 0), color=Color.from_hex("#ce4095"), text='2')
add(13, 'label', Point(87.3668, 51.5271, 0), color=Color.from_hex("#ce4095"), text='2')

# step 14 — Segment 3 — form and force
add(14, 'segment', Line((99.422, 55.7884, 0), (72.1398, 54.5204, 0)), color=Color.from_hex("#ce4095"), width=0.288)
add(14, 'segment', Line((20.851, 55.3223, 0), (38.4702, 56.1411, 0)), color=Color.from_hex("#ce4095"), width=0.288)
add(14, 'point', Point(38.4702, 56.1411, 0), color=Color.from_hex("#ffffff"), width=0.47)
add(14, 'label', Point(40.0702, 55.0411, 0), text='III')
add(14, 'label', Point(29.5863, 57.33, 0), color=Color.from_hex("#ce4095"), text='3')
add(14, 'label', Point(87.0044, 53.9741, 0), color=Color.from_hex("#ce4095"), text='3')

# step 15 — Segment 4 — form and force
add(15, 'segment', Line((96.6119, 67.1459, 0), (72.1398, 54.5204, 0)), color=Color.from_hex("#ce4095"), width=0.288)
add(15, 'segment', Line((38.4702, 56.1411, 0), (52.1721, 63.2101, 0)), color=Color.from_hex("#ce4095"), width=0.288)
add(15, 'polyline', Polyline([(13.6677, 57.3386, 0), (24.6285, 49, 0)]), color=Color.from_hex("#111111"), dash=0.85)
add(15, 'polyline', Polyline([(24.6285, 49, 0), (38.4702, 56.1411, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.85)
add(15, 'label', Point(44.5876, 61.0975, 0), color=Color.from_hex("#ce4095"), text='4')
add(15, 'label', Point(85.1478, 59.3185, 0), color=Color.from_hex("#ce4095"), text='4')

# step 16 — Tension
add(16, 'arrow', Line((3.9914, 64.7, 0), (0.012058, 67.7273, 0)), color=Color.from_hex("#3f9c20"), width=0.36, head=(1.152, 0.432))
add(16, 'arrow', Line((52.1721, 63.2101, 0), (56.6156, 65.5026, 0)), color=Color.from_hex("#3f9c20"), width=0.36, head=(1.152, 0.432))
add(16, 'arrow', Line((97.016, 34.8416, 0), (71.7765, 54.0429, 0)), color=Color.from_hex("#3f9c20"), width=0.36, head=(1.152, 0.432))
add(16, 'arrow', Line((71.8647, 55.0537, 0), (96.3368, 67.6791, 0)), color=Color.from_hex("#3f9c20"), width=0.36, head=(1.152, 0.432))
add(16, 'polyline', Polyline([(97.3792, 35.3191, 0), (97.016, 34.8416, 0)]), color=Color.from_hex("#111111"), dash=0.35)
add(16, 'polyline', Polyline([(72.1398, 54.5204, 0), (71.7765, 54.0429, 0)]), color=Color.from_hex("#111111"), dash=0.35)
add(16, 'polyline', Polyline([(72.1398, 54.5204, 0), (71.8647, 55.0537, 0)]), color=Color.from_hex("#111111"), dash=0.35)
add(16, 'polyline', Polyline([(96.6119, 67.1459, 0), (96.3368, 67.6791, 0)]), color=Color.from_hex("#111111"), dash=0.35)
add(16, 'label', Point(-1.26133, 68.6961, 0), color=Color.from_hex("#3f9c20"), text='A')
add(16, 'label', Point(58.0375, 66.2361, 0), color=Color.from_hex("#3f9c20"), text='B')
add(16, 'label', Point(83.3064, 43.0097, 0), color=Color.from_hex("#3f9c20"), text='A')
add(16, 'label', Point(83.2755, 62.9661, 0), color=Color.from_hex("#3f9c20"), text='B')
add(16, 'label', Point(104, 26, 0), color=Color.from_hex("#ce4095"), text='N₁ = 7.0 kN')
add(16, 'label', Point(104, 23.6, 0), color=Color.from_hex("#ce4095"), text='N₂ = 6.4 kN')
add(16, 'label', Point(104, 21.2, 0), color=Color.from_hex("#ce4095"), text='N₃ = 6.1 kN')
add(16, 'label', Point(104, 18.8, 0), color=Color.from_hex("#ce4095"), text='N₄ = 6.1 kN')
add(16, 'polygon', Polygon([(3.67138, 64.2793, 0), (4.31142, 65.1207, 0), (13.9878, 57.7592, 0), (13.3477, 56.9179, 0)]), color=Color.from_hex("#ce4095"))
add(16, 'polygon', Polygon([(13.5389, 56.8797, 0), (13.7965, 57.7975, 0), (20.9798, 55.7812, 0), (20.7222, 54.8634, 0)]), color=Color.from_hex("#ce4095"))
add(16, 'polygon', Polygon([(20.8722, 54.8676, 0), (20.8299, 55.777, 0), (38.4491, 56.5959, 0), (38.4914, 55.6864, 0)]), color=Color.from_hex("#ce4095"))
add(16, 'polygon', Polygon([(38.6807, 55.7333, 0), (38.2598, 56.549, 0), (51.9617, 63.618, 0), (52.3825, 62.8022, 0)]), color=Color.from_hex("#ce4095"))


if __name__ == "__main__":
    print("Drawing 6 — Funicular Line Through Two Points 2 —", len(ops), "operations")
