"""Drawing 5 — Funicular Line Through Two Points 1

Auto-generated from ops/view_5.json — the drawing as literal COMPAS
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
add(1, 'arrow', Line((98.6894, 45.501, 0), (96.3947, 34.0282, 0)), color=Color.from_hex("#3f9c20"), width=0.36, head=(1.152, 0.432))
add(1, 'polyline', Polyline([(20.2719, 76.0106, 0), (21.9182, 17.1975, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.85)
add(1, 'arrow', Line((21, 50, 0), (21.1399, 45.002, 0)), color=Color.from_hex("#3f9c20"), width=0.36, head=(1.152, 0.432))
add(1, 'arrow', Line((98.4375, 54.4975, 0), (98.6894, 45.501, 0)), color=Color.from_hex("#3f9c20"), width=0.36, head=(1.152, 0.432))
add(1, 'polyline', Polyline([(33.554, 76.0106, 0), (48.1058, 17.1975, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.85)
add(1, 'arrow', Line((39, 54, 0), (40.2009, 49.1464, 0)), color=Color.from_hex("#3f9c20"), width=0.36, head=(1.152, 0.432))
add(1, 'arrow', Line((95.6274, 65.855, 0), (98.4375, 54.4975, 0)), color=Color.from_hex("#3f9c20"), width=0.36, head=(1.152, 0.432))
add(1, 'label', Point(10.8427, 51.882, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(1, 'label', Point(99.5032, 39.3724, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(1, 'label', Point(19.3706, 47.4534, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(1, 'label', Point(100.563, 50.0552, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(1, 'label', Point(37.9502, 51.1649, 0), color=Color.from_hex("#3f9c20"), text='F₃')
add(1, 'label', Point(98.9739, 60.6566, 0), color=Color.from_hex("#3f9c20"), text='F₃')
add(1, 'point', Point(13, 54, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(1, 'point', Point(12.0194, 49.0971, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(1, 'point', Point(21, 50, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(1, 'point', Point(39, 54, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(1, 'point', Point(40.2009, 49.1464, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(1, 'point', Point(95.6274, 65.855, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(1, 'point', Point(98.4375, 54.4975, 0), color=Color.from_hex("#ffffff"), width=0.47)
add(1, 'point', Point(98.6894, 45.501, 0), color=Color.from_hex("#ffffff"), width=0.47)
add(1, 'point', Point(96.3947, 34.0282, 0), color=Color.from_hex("#ffffff"), width=0.47)
add(1, 'label', Point(97.3274, 66.555, 0), text='I')

# step 2 — Two points to pass through
add(2, 'polyline', Polyline([(3.7187, 76.0106, 0), (5.13669, 17.1975, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.85)
add(2, 'polyline', Polyline([(51.8635, 76.0106, 0), (53.2815, 17.1975, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.85)
add(2, 'point', Point(3.9914, 64.7, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(2, 'point', Point(52.1721, 63.2101, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(2, 'label', Point(2.2914, 63.4, 0), text='E₃')
add(2, 'label', Point(53.8721, 61.9101, 0), text='G₃')

# step 3 — Trial pole o′
add(3, 'point', Point(117, 52, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(3, 'label', Point(118.8, 52, 0), text='o′')

# step 4 — Trial ray o′–L
add(4, 'segment', Line((96.3947, 34.0282, 0), (117, 52, 0)), color=Color.from_hex("#aaaaaa"), width=0.1296)
add(4, 'segment', Line((5.03651, 21.3526, 0), (6.77337, 22.8675, 0)), color=Color.from_hex("#aaaaaa"), width=0.2304)
add(4, 'point', Point(5.03651, 21.3526, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(4, 'point', Point(6.77337, 22.8675, 0), color=Color.from_hex("#ffffff"), width=0.47)

# step 5 — Trial ray o′–K
add(5, 'segment', Line((98.6894, 45.501, 0), (117, 52, 0)), color=Color.from_hex("#aaaaaa"), width=0.1296)
add(5, 'segment', Line((6.77337, 22.8675, 0), (21.6121, 28.1342, 0)), color=Color.from_hex("#aaaaaa"), width=0.2304)
add(5, 'point', Point(21.6121, 28.1342, 0), color=Color.from_hex("#ffffff"), width=0.47)

# step 6 — Trial ray o′–J
add(6, 'segment', Line((98.4375, 54.4975, 0), (117, 52, 0)), color=Color.from_hex("#aaaaaa"), width=0.1296)
add(6, 'segment', Line((21.6121, 28.1342, 0), (46.219, 24.8234, 0)), color=Color.from_hex("#aaaaaa"), width=0.2304)
add(6, 'point', Point(46.219, 24.8234, 0), color=Color.from_hex("#ffffff"), width=0.47)

# step 7 — Trial ray o′–I
add(7, 'segment', Line((95.6274, 65.855, 0), (117, 52, 0)), color=Color.from_hex("#aaaaaa"), width=0.1296)
add(7, 'segment', Line((46.219, 24.8234, 0), (53.2068, 20.2935, 0)), color=Color.from_hex("#aaaaaa"), width=0.2304)
add(7, 'point', Point(53.2068, 20.2935, 0), color=Color.from_hex("#ffffff"), width=0.47)

# step 8 — The resultant, located
add(8, 'arrow', Line((95.6274, 65.855, 0), (96.3947, 34.0282, 0)), color=Color.from_hex("#3f9c20"), width=0.504, dash=1.1, head=(1.584, 0.612))
add(8, 'polyline', Polyline([(6.77337, 22.8675, 0), (24.8778, 38.6581, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.85)
add(8, 'polyline', Polyline([(24.8778, 38.6581, 0), (46.219, 24.8234, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.85)
add(8, 'polyline', Polyline([(23.9772, 76.0106, 0), (25.3952, 17.1975, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.85)
add(8, 'arrow', Line((24.705, 45.826, 0), (24.946, 35.8289, 0)), color=Color.from_hex("#3f9c20"), width=0.504, dash=1.1, head=(1.584, 0.612))
add(8, 'point', Point(24.8778, 38.6581, 0), color=Color.from_hex("#ffffff"), width=0.47)
add(8, 'point', Point(24.705, 45.826, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(8, 'label', Point(94.2111, 49.9416, 0), color=Color.from_hex("#3f9c20"), text='R')
add(8, 'label', Point(26.5255, 40.8274, 0), color=Color.from_hex("#3f9c20"), text='R')

# step 9 — Trial closing chord
add(9, 'polyline', Polyline([(5.03651, 21.3526, 0), (53.2068, 20.2935, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.85)
add(9, 'polyline', Polyline([(117, 52, 0), (95.9503, 52.4628, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.85)
add(9, 'point', Point(95.9503, 52.4628, 0), color=Color.from_hex("#ffffff"), width=0.47)
add(9, 'label', Point(97.5503, 53.7628, 0), text='i')

# step 10 — The chord E₃–G₃ → pole o
add(10, 'polyline', Polyline([(3.9914, 64.7, 0), (52.1721, 63.2101, 0)]), color=Color.from_hex("#111111"), dash=1.1)
add(10, 'polyline', Polyline([(95.9503, 52.4628, 0), (72.5415, 53.1867, 0)]), color=Color.from_hex("#111111"), dash=1.1)
add(10, 'point', Point(72.5415, 53.1867, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(10, 'label', Point(71.9415, 51.3867, 0), text='o')

# step 11 — Segment 1 — form and force
add(11, 'segment', Line((96.3947, 34.0282, 0), (72.5415, 53.1867, 0)), color=Color.from_hex("#ce4095"), width=0.288)
add(11, 'segment', Line((3.9914, 64.7, 0), (13.597, 56.985, 0)), color=Color.from_hex("#ce4095"), width=0.288)
add(11, 'point', Point(13.597, 56.985, 0), color=Color.from_hex("#ffffff"), width=0.47)
add(11, 'label', Point(11.997, 55.885, 0), text='I')
add(11, 'label', Point(9.79613, 62.0899, 0), color=Color.from_hex("#ce4095"), text='1')
add(11, 'label', Point(85.2303, 45.127, 0), color=Color.from_hex("#ce4095"), text='1')

# step 12 — Segment 2 — form and force
add(12, 'segment', Line((98.6894, 45.501, 0), (72.5415, 53.1867, 0)), color=Color.from_hex("#ce4095"), width=0.288)
add(12, 'segment', Line((13.597, 56.985, 0), (20.8643, 54.8489, 0)), color=Color.from_hex("#ce4095"), width=0.288)
add(12, 'point', Point(20.8643, 54.8489, 0), color=Color.from_hex("#ffffff"), width=0.47)
add(12, 'label', Point(19.2643, 53.8489, 0), text='II')
add(12, 'label', Point(17.6818, 57.452, 0), color=Color.from_hex("#ce4095"), text='2')
add(12, 'label', Point(87.0389, 50.2732, 0), color=Color.from_hex("#ce4095"), text='2')

# step 13 — Segment 3 — form and force
add(13, 'segment', Line((98.4375, 54.4975, 0), (72.5415, 53.1867, 0)), color=Color.from_hex("#ce4095"), width=0.288)
add(13, 'segment', Line((20.8643, 54.8489, 0), (38.5682, 55.745, 0)), color=Color.from_hex("#ce4095"), width=0.288)
add(13, 'point', Point(38.5682, 55.745, 0), color=Color.from_hex("#ffffff"), width=0.47)
add(13, 'label', Point(40.1682, 54.645, 0), text='III')
add(13, 'label', Point(29.6354, 56.8949, 0), color=Color.from_hex("#ce4095"), text='3')
add(13, 'label', Point(86.6651, 52.6141, 0), color=Color.from_hex("#ce4095"), text='3')

# step 14 — Segment 4 — form and force
add(14, 'segment', Line((95.6274, 65.855, 0), (72.5415, 53.1867, 0)), color=Color.from_hex("#ce4095"), width=0.288)
add(14, 'segment', Line((38.5682, 55.745, 0), (52.1721, 63.2101, 0)), color=Color.from_hex("#ce4095"), width=0.288)
add(14, 'polyline', Polyline([(13.597, 56.985, 0), (24.65, 48.1074, 0)]), color=Color.from_hex("#111111"), dash=0.85)
add(14, 'polyline', Polyline([(24.65, 48.1074, 0), (38.5682, 55.745, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.85)
add(14, 'point', Point(24.65, 48.1074, 0), color=Color.from_hex("#ffffff"), width=0.47)
add(14, 'label', Point(26.45, 47.2074, 0), text='M₁')
add(14, 'label', Point(44.6004, 60.8803, 0), color=Color.from_hex("#ce4095"), text='4')
add(14, 'label', Point(84.8237, 57.99, 0), color=Color.from_hex("#ce4095"), text='4')

# step 15 — Tension
add(15, 'arrow', Line((3.9914, 64.7, 0), (0.09311, 67.831, 0)), color=Color.from_hex("#3f9c20"), width=0.36, head=(1.152, 0.432))
add(15, 'arrow', Line((52.1721, 63.2101, 0), (56.5555, 65.6155, 0)), color=Color.from_hex("#3f9c20"), width=0.36, head=(1.152, 0.432))
add(15, 'arrow', Line((96.019, 33.5604, 0), (72.1658, 52.7189, 0)), color=Color.from_hex("#3f9c20"), width=0.36, head=(1.152, 0.432))
add(15, 'arrow', Line((72.2528, 53.7127, 0), (95.3388, 66.381, 0)), color=Color.from_hex("#3f9c20"), width=0.36, head=(1.152, 0.432))
add(15, 'polyline', Polyline([(96.3947, 34.0282, 0), (96.019, 33.5604, 0)]), color=Color.from_hex("#111111"), dash=0.35)
add(15, 'polyline', Polyline([(72.5415, 53.1867, 0), (72.1658, 52.7189, 0)]), color=Color.from_hex("#111111"), dash=0.35)
add(15, 'polyline', Polyline([(72.5415, 53.1867, 0), (72.2528, 53.7127, 0)]), color=Color.from_hex("#111111"), dash=0.35)
add(15, 'polyline', Polyline([(95.6274, 65.855, 0), (95.3388, 66.381, 0)]), color=Color.from_hex("#111111"), dash=0.35)
add(15, 'label', Point(-1.15434, 68.833, 0), color=Color.from_hex("#3f9c20"), text='A')
add(15, 'label', Point(57.9582, 66.3852, 0), color=Color.from_hex("#3f9c20"), text='B')
add(15, 'label', Point(82.9652, 41.7363, 0), color=Color.from_hex("#3f9c20"), text='A')
add(15, 'label', Point(82.9299, 61.6249, 0), color=Color.from_hex("#3f9c20"), text='B')
add(15, 'label', Point(104, 26, 0), color=Color.from_hex("#ce4095"), text='N₁ = 6.8 kN')
add(15, 'label', Point(104, 23.6, 0), color=Color.from_hex("#ce4095"), text='N₂ = 6.1 kN')
add(15, 'label', Point(104, 21.2, 0), color=Color.from_hex("#ce4095"), text='N₃ = 5.8 kN')
add(15, 'label', Point(104, 18.8, 0), color=Color.from_hex("#ce4095"), text='N₄ = 5.9 kN')
add(15, 'polygon', Polygon([(3.67209, 64.3024, 0), (4.31071, 65.0976, 0), (13.9163, 57.3825, 0), (13.2777, 56.5874, 0)]), color=Color.from_hex("#ce4095"))
add(15, 'polygon', Polygon([(13.4689, 56.5492, 0), (13.7251, 57.4208, 0), (20.9924, 55.2847, 0), (20.7362, 54.4131, 0)]), color=Color.from_hex("#ce4095"))
add(15, 'polygon', Polygon([(20.8861, 54.4173, 0), (20.8424, 55.2805, 0), (38.5464, 56.1766, 0), (38.5901, 55.3134, 0)]), color=Color.from_hex("#ce4095"))
add(15, 'polygon', Polygon([(38.7794, 55.3603, 0), (38.3571, 56.1298, 0), (51.961, 63.5949, 0), (52.3832, 62.8253, 0)]), color=Color.from_hex("#ce4095"))


if __name__ == "__main__":
    print("Drawing 5 — Funicular Line Through Two Points 1 —", len(ops), "operations")
