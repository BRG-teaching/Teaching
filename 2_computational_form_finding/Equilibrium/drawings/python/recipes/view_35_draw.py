"""Drawing 35 — Lufthansa Hangar V

Auto-generated from ops/view_35.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-10.6276, 78, 0), text='Form Diagram')
add(0, 'label', Point(-10.6276, 74.8, 0), text='1 unit :: 1 m')
add(0, 'label', Point(72, 78, 0), text='Force Diagram')
add(0, 'label', Point(72, 74.8, 0), text='1 unit :: 50 kN')

# step 1 — The hangar truss
add(1, 'polyline', Polyline([(7.37243, 4.21218, 0), (7.37243, 58.2122, 0)]), color=Color.from_hex("#bdbdbd"), dash=0.45)
add(1, 'polyline', Polyline([(18.3724, 4.21218, 0), (18.3724, 58.2122, 0)]), color=Color.from_hex("#bdbdbd"), dash=0.45)
add(1, 'polyline', Polyline([(-1.21242, 57.1938, 0), (56.199, 36.58, 0)]), color=Color.from_hex("#9a9a9a"), dash=0.45)
add(1, 'polyline', Polyline([(9.01683, 63.1745, 0), (8.1945, 62.1359, 0), (7.42512, 61.0575, 0), (6.71059, 59.9421, 0), (6.0527, 58.7923, 0), (5.4531, 57.6111, 0), (4.91328, 56.4014, 0), (4.4346, 55.1662, 0), (4.01825, 53.9086, 0), (3.66528, 52.6318, 0), (3.37656, 51.339, 0), (3.15281, 50.0333, 0), (2.9946, 48.7181, 0), (2.90232, 47.3966, 0), (2.87621, 46.0722, 0)]), color=Color.from_hex("#bdbdbd"), dash=0.35)
add(1, 'segment', Line((7.37243, 46.2122, 0), (12.8724, 36.6859, 0)), color=Color.from_hex("#1a1eb2"), width=0.2448)
add(1, 'label', Point(11.5081, 42.249, 0), color=Color.from_hex("#1a1eb2"), text='1')
add(1, 'segment', Line((7.37243, 46.2122, 0), (18.3724, 46.2122, 0)), color=Color.from_hex("#ce4095"), width=0.2448)
add(1, 'label', Point(12.8724, 47.8122, 0), color=Color.from_hex("#ce4095"), text='2')
add(1, 'segment', Line((12.8724, 36.6859, 0), (18.3724, 46.2122, 0)), color=Color.from_hex("#1a1eb2"), width=0.2448)
add(1, 'label', Point(14.2368, 42.249, 0), color=Color.from_hex("#1a1eb2"), text='3')
add(1, 'segment', Line((12.8724, 36.6859, 0), (23.8724, 36.6859, 0)), color=Color.from_hex("#ce4095"), width=0.2448)
add(1, 'label', Point(18.3724, 35.0859, 0), color=Color.from_hex("#ce4095"), text='4')
add(1, 'segment', Line((18.3724, 46.2122, 0), (23.8724, 36.6859, 0)), color=Color.from_hex("#1a1eb2"), width=0.2448)
add(1, 'label', Point(22.5081, 42.249, 0), color=Color.from_hex("#1a1eb2"), text='5')
add(1, 'segment', Line((18.3724, 46.2122, 0), (29.3724, 46.2122, 0)), color=Color.from_hex("#ce4095"), width=0.2448)
add(1, 'label', Point(23.8724, 47.8122, 0), color=Color.from_hex("#ce4095"), text='6')
add(1, 'segment', Line((23.8724, 36.6859, 0), (29.3724, 46.2122, 0)), color=Color.from_hex("#1a1eb2"), width=0.2448)
add(1, 'label', Point(25.2368, 42.249, 0), color=Color.from_hex("#1a1eb2"), text='7')
add(1, 'segment', Line((29.3724, 12.2122, 0), (23.8724, 36.6859, 0)), color=Color.from_hex("#1a1eb2"), width=0.2448)
add(1, 'label', Point(25.0614, 24.0982, 0), color=Color.from_hex("#1a1eb2"), text='8')
add(1, 'segment', Line((29.3724, 12.2122, 0), (12.8724, 36.6859, 0)), color=Color.from_hex("#1a1eb2"), width=0.2448)
add(1, 'label', Point(19.7958, 23.5546, 0), color=Color.from_hex("#1a1eb2"), text='9')
add(1, 'segment', Line((7.37243, 12.2122, 0), (12.8724, 36.6859, 0)), color=Color.from_hex("#1a1eb2"), width=0.2448)
add(1, 'segment', Line((7.37243, 12.2122, 0), (29.3724, 12.2122, 0)), color=Color.from_hex("#ce4095"), width=0.2448)
add(1, 'point', Point(7.37243, 12.2122, 0), color=Color.from_hex("#ffffff"), width=0.5)
add(1, 'label', Point(5.37243, 11.0122, 0), text='A')
add(1, 'point', Point(29.3724, 12.2122, 0), color=Color.from_hex("#ffffff"), width=0.5)
add(1, 'label', Point(30.7724, 11.0122, 0), text='B')
add(1, 'point', Point(7.37243, 46.2122, 0), color=Color.from_hex("#ffffff"), width=0.5)
add(1, 'label', Point(5.37243, 47.0122, 0), text='C')
add(1, 'point', Point(29.3724, 46.2122, 0), color=Color.from_hex("#ffffff"), width=0.5)
add(1, 'label', Point(30.7724, 47.0122, 0), text='D')
add(1, 'point', Point(18.3724, 46.2122, 0), color=Color.from_hex("#ffffff"), width=0.5)
add(1, 'label', Point(17.9724, 47.8122, 0), text='E')
add(1, 'point', Point(12.8724, 36.6859, 0), color=Color.from_hex("#ffffff"), width=0.5)
add(1, 'label', Point(10.6724, 36.2859, 0), text='F')
add(1, 'point', Point(23.8724, 36.6859, 0), color=Color.from_hex("#ffffff"), width=0.5)
add(1, 'label', Point(25.4724, 36.2859, 0), text='G')
add(1, 'point', Point(4.4346, 55.1662, 0), color=Color.from_hex("#ffffff"), width=0.55)
add(1, 'label', Point(2.8346, 56.2662, 0), text='H')

# step 2 — Three loads
add(2, 'arrow', Line((7.37243, 52.2122, 0), (7.37243, 46.2122, 0)), color=Color.from_hex("#3f9c20"), width=0.2448, head=(1.08, 0.4176))
add(2, 'arrow', Line((18.3724, 52.2122, 0), (18.3724, 46.2122, 0)), color=Color.from_hex("#3f9c20"), width=0.2448, head=(1.08, 0.4176))
add(2, 'arrow', Line((29.3724, 46.2122, 0), (35.0195, 44.1846, 0)), color=Color.from_hex("#3f9c20"), width=0.2448, head=(1.08, 0.4176))
add(2, 'label', Point(5.67243, 50.6122, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(2, 'label', Point(19.6724, 50.6122, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(2, 'label', Point(35.4195, 45.5846, 0), color=Color.from_hex("#3f9c20"), text='F₃')
add(2, 'arrow', Line((80, 60, 0), (80, 42, 0)), color=Color.from_hex("#3f9c20"), width=0.2448, head=(1.08, 0.4176))
add(2, 'arrow', Line((80, 42, 0), (80, 19.8, 0)), color=Color.from_hex("#3f9c20"), width=0.2448, head=(1.08, 0.4176))
add(2, 'arrow', Line((80, 19.8, 0), (98.8234, 13.0414, 0)), color=Color.from_hex("#3f9c20"), width=0.2448, head=(1.08, 0.4176))
add(2, 'label', Point(77.8, 51, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(2, 'label', Point(77.8, 30.9, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(2, 'label', Point(90.0117, 14.8207, 0), color=Color.from_hex("#3f9c20"), text='F₃')
add(2, 'point', Point(80, 60, 0), color=Color.from_hex("#ffffff"), width=0.42)
add(2, 'label', Point(78.2, 60.6, 0), text='O')
add(2, 'point', Point(80, 42, 0), color=Color.from_hex("#ffffff"), width=0.42)
add(2, 'label', Point(78.2, 42.6, 0), text='P')
add(2, 'point', Point(80, 19.8, 0), color=Color.from_hex("#ffffff"), width=0.42)
add(2, 'label', Point(78.2, 20.4, 0), text='Q')
add(2, 'point', Point(98.8234, 13.0414, 0), color=Color.from_hex("#ffffff"), width=0.42)
add(2, 'label', Point(100.023, 12.4414, 0), text='S')

# step 3 — The resultant R₁₂₃
add(3, 'arrow', Line((80, 60, 0), (98.8234, 13.0414, 0)), color=Color.from_hex("#3f9c20"), width=0.2448, dash=0.55, head=(1.08, 0.4176))
add(3, 'label', Point(91.6117, 37.9207, 0), color=Color.from_hex("#3f9c20"), text='R₁₂₃')

# step 4 — A trial funicular
add(4, 'segment', Line((80, 60, 0), (135.33, 49.5762, 0)), color=Color.from_hex("#aaaaaa"), width=0.072, until=7)
add(4, 'segment', Line((80, 42, 0), (135.33, 49.5762, 0)), color=Color.from_hex("#aaaaaa"), width=0.072, until=7)
add(4, 'segment', Line((80, 19.8, 0), (135.33, 49.5762, 0)), color=Color.from_hex("#aaaaaa"), width=0.072, until=7)
add(4, 'segment', Line((98.8234, 13.0414, 0), (135.33, 49.5762, 0)), color=Color.from_hex("#aaaaaa"), width=0.072, until=7)
add(4, 'point', Point(135.33, 49.5762, 0), color=Color.from_hex("#ffffff"), width=0.55, until=7)
add(4, 'label', Point(136.53, 50.3762, 0), text='T', until=7)
add(4, 'segment', Line((7.37243, 6.95403, 0), (18.3724, 8.46024, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152, until=7)
add(4, 'segment', Line((18.3724, 8.46024, 0), (64.8514, 33.4733, 0)), color=Color.from_hex("#aaaaaa"), width=0.1152, until=7)
add(4, 'point', Point(7.37243, 6.95403, 0), color=Color.from_hex("#ffffff"), width=0.55, until=7)
add(4, 'label', Point(5.37243, 6.35403, 0), text='U', until=7)

# step 5 — The line of action
add(5, 'polyline', Polyline([(7.37243, 6.95403, 0), (33.4448, 2.04214, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.9, until=7)
add(5, 'polyline', Polyline([(64.8514, 33.4733, 0), (33.4448, 2.04214, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.9, until=7)
add(5, 'point', Point(33.4448, 2.04214, 0), color=Color.from_hex("#ffffff"), width=0.45)
add(5, 'label', Point(34.2448, 0.642144, 0), text='Z')
add(5, 'polyline', Polyline([(28.2358, 15.037, 0), (43.1186, -22.0912, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.55)
add(5, 'arrow', Line((29.724, 11.3242, 0), (38.1946, -9.80719, 0)), color=Color.from_hex("#3f9c20"), width=0.2448, dash=0.55, head=(1.08, 0.4176))
add(5, 'label', Point(32.0682, 10.8678, 0), color=Color.from_hex("#3f9c20"), text='R₁₂₃')

# step 6 — The three-force rule
add(6, 'polyline', Polyline([(7.37243, 6.21218, 0), (7.37243, 73.0845, 0)]), color=Color.from_hex("#111111"), dash=0.9, until=7)
add(6, 'polyline', Polyline([(5.51175, 71.7254, 0), (31.9774, 5.71493, 0)]), color=Color.from_hex("#111111"), dash=0.9, until=7)
add(6, 'point', Point(7.37243, 67.0845, 0), color=Color.from_hex("#ffffff"), width=0.45)
add(6, 'label', Point(5.17243, 67.6845, 0), text='S₃')
add(6, 'point', Point(80, 59.9907, 0), color=Color.from_hex("#ffffff"), width=0.42)
add(6, 'label', Point(77.6, 59.1907, 0), text='C₁')

# step 7 — The reactions
add(7, 'arrow', Line((7.37243, 6.21218, 0), (7.37243, 12.2122, 0)), color=Color.from_hex("#3f9c20"), width=0.2448, head=(1.08, 0.4176))
add(7, 'arrow', Line((29.3724, 6.21218, 0), (29.3724, 12.2122, 0)), color=Color.from_hex("#3f9c20"), width=0.2448, head=(1.08, 0.4176))
add(7, 'arrow', Line((35.3724, 12.2122, 0), (29.3724, 12.2122, 0)), color=Color.from_hex("#3f9c20"), width=0.2448, head=(1.08, 0.4176))
add(7, 'label', Point(4.77243, 9.61218, 0), color=Color.from_hex("#3f9c20"), text='A_V')
add(7, 'label', Point(28.7724, 9.21218, 0), color=Color.from_hex("#3f9c20"), text='B_V')
add(7, 'label', Point(32.3724, 13.2122, 0), color=Color.from_hex("#3f9c20"), text='B_H')
add(7, 'arrow', Line((76, 13.0414, 0), (76, 59.9907, 0)), color=Color.from_hex("#3f9c20"), width=0.2448, head=(1.08, 0.4176))
add(7, 'arrow', Line((98.8234, 13.0414, 0), (80, 13.0414, 0)), color=Color.from_hex("#3f9c20"), width=0.2448, head=(1.08, 0.4176))
add(7, 'label', Point(73.6, 36.5161, 0), color=Color.from_hex("#3f9c20"), text='B_V')
add(7, 'label', Point(90.0117, 11.3414, 0), color=Color.from_hex("#3f9c20"), text='B_H')
add(7, 'polyline', Polyline([(76, 59.9907, 0), (80, 59.9907, 0)]), color=Color.from_hex("#bdbdbd"), dash=0.35)
add(7, 'polyline', Polyline([(76, 13.0414, 0), (80, 13.0414, 0)]), color=Color.from_hex("#bdbdbd"), dash=0.35)
add(7, 'label', Point(106, 76, 0), color=Color.from_hex("#3f9c20"), text='A_V = 0 kN')
add(7, 'label', Point(106, 72.8, 0), color=Color.from_hex("#3f9c20"), text='B_V = 2347 kN')
add(7, 'label', Point(106, 69.6, 0), color=Color.from_hex("#3f9c20"), text='B_H = 941 kN')

# step 8 — Joint C — members 1 and 2
add(8, 'segment', Line((90.3923, 42, 0), (80, 60, 0)), color=Color.from_hex("#1a1eb2"), width=0.1872)
add(8, 'label', Point(83.8971, 50.25, 0), color=Color.from_hex("#1a1eb2"), text='1')
add(8, 'segment', Line((80, 42, 0), (90.3923, 42, 0)), color=Color.from_hex("#ce4095"), width=0.1872)
add(8, 'label', Point(85.1962, 43.5, 0), color=Color.from_hex("#ce4095"), text='2')
add(8, 'point', Point(90.3923, 42, 0), color=Color.from_hex("#ffffff"), width=0.42)
add(8, 'label', Point(91.4923, 42.7, 0), text='G₁')

# step 9 — Joint A — nothing to carry
add(9, 'segment', Line((80, 60, 0), (79.9979, 59.9907, 0)), color=Color.from_hex("#1a1eb2"), width=0.1872)
add(9, 'segment', Line((79.9979, 59.9907, 0), (80, 59.9907, 0)), color=Color.from_hex("#ce4095"), width=0.1872)
add(9, 'point', Point(79.9979, 59.9907, 0), color=Color.from_hex("#ffffff"), width=0.42)
add(9, 'label', Point(81.0979, 60.6907, 0), text='H₁')
add(9, 'label', Point(6.72243, 24.449, 0), color=Color.from_hex("#b9b9bd"), text='10 = 0')
add(9, 'label', Point(18.3724, 10.4122, 0), color=Color.from_hex("#b9b9bd"), text='11 = 0')
add(9, 'label', Point(0.97243, 13.8122, 0), color=Color.from_hex("#b9b9bd"), text='A_V = 0')

# step 10 — Joint B — members 8 and 9
add(10, 'segment', Line((92.4097, 41.5809, 0), (98.8234, 13.0414, 0)), color=Color.from_hex("#1a1eb2"), width=0.1872)
add(10, 'label', Point(97.0801, 27.64, 0), color=Color.from_hex("#1a1eb2"), text='8')
add(10, 'segment', Line((79.9979, 59.9907, 0), (92.4097, 41.5809, 0)), color=Color.from_hex("#1a1eb2"), width=0.1872)
add(10, 'label', Point(87.4476, 51.6243, 0), color=Color.from_hex("#1a1eb2"), text='9')
add(10, 'point', Point(92.4097, 41.5809, 0), color=Color.from_hex("#ffffff"), width=0.42)
add(10, 'label', Point(93.5097, 42.2809, 0), text='I₁')

# step 11 — Joint F — members 3 and 4
add(11, 'segment', Line((90.3923, 42, 0), (90.1503, 41.5809, 0)), color=Color.from_hex("#1a1eb2"), width=0.1872)
add(11, 'label', Point(91.5703, 41.0404, 0), color=Color.from_hex("#1a1eb2"), text='3')
add(11, 'segment', Line((90.1503, 41.5809, 0), (92.4097, 41.5809, 0)), color=Color.from_hex("#ce4095"), width=0.1872)
add(11, 'label', Point(91.28, 43.0809, 0), color=Color.from_hex("#ce4095"), text='4')
add(11, 'point', Point(90.1503, 41.5809, 0), color=Color.from_hex("#ffffff"), width=0.42)
add(11, 'label', Point(91.2503, 42.2809, 0), text='J₁')

# step 12 — Joint E — members 5 and 6
add(12, 'segment', Line((102.726, 19.8, 0), (90.1503, 41.5809, 0)), color=Color.from_hex("#1a1eb2"), width=0.1872)
add(12, 'label', Point(95.1389, 29.9404, 0), color=Color.from_hex("#1a1eb2"), text='5')
add(12, 'segment', Line((80, 19.8, 0), (102.726, 19.8, 0)), color=Color.from_hex("#ce4095"), width=0.1872)
add(12, 'label', Point(91.3628, 21.3, 0), color=Color.from_hex("#ce4095"), text='6')
add(12, 'point', Point(102.726, 19.8, 0), color=Color.from_hex("#ffffff"), width=0.42)
add(12, 'label', Point(103.826, 20.5, 0), text='K₁')

# step 13 — Joint D closes — member 7
add(13, 'segment', Line((102.726, 19.8, 0), (98.8234, 13.0414, 0)), color=Color.from_hex("#1a1eb2"), width=0.1872)
add(13, 'label', Point(102.074, 15.6707, 0), color=Color.from_hex("#1a1eb2"), text='7')

# step 14 — The check: R₁₂₃ again
add(14, 'arrow', Line((80, 60, 0), (98.8234, 13.0414, 0)), color=Color.from_hex("#3f9c20"), width=0.2448, dash=0.55, head=(1.08, 0.4176))

# step 15 — Compression and tension
add(15, 'polygon', Polygon([(7.73243, 46.42, 0), (13.2324, 36.8937, 0), (12.5124, 36.4781, 0), (7.01243, 46.0043, 0)]), color=Color.from_hex("#1a1eb2"))
add(15, 'polygon', Polygon([(7.37243, 46.42, 0), (18.3724, 46.42, 0), (18.3724, 46.0043, 0), (7.37243, 46.0043, 0)]), color=Color.from_hex("#ce4095"))
add(15, 'polygon', Polygon([(12.864, 36.6907, 0), (18.364, 46.217, 0), (18.3808, 46.2073, 0), (12.8808, 36.6811, 0)]), color=Color.from_hex("#1a1eb2"))
add(15, 'polygon', Polygon([(12.8724, 36.7311, 0), (23.8724, 36.7311, 0), (23.8724, 36.6407, 0), (12.8724, 36.6407, 0)]), color=Color.from_hex("#ce4095"))
add(15, 'polygon', Polygon([(18.808, 46.4637, 0), (24.308, 36.9374, 0), (23.4368, 36.4344, 0), (17.9368, 45.9607, 0)]), color=Color.from_hex("#1a1eb2"))
add(15, 'polygon', Polygon([(18.3724, 46.6667, 0), (29.3724, 46.6667, 0), (29.3724, 45.7577, 0), (18.3724, 45.7577, 0)]), color=Color.from_hex("#ce4095"))
add(15, 'polygon', Polygon([(23.7373, 36.7639, 0), (29.2373, 46.2902, 0), (29.5076, 46.1341, 0), (24.0076, 36.6079, 0)]), color=Color.from_hex("#1a1eb2"))
add(15, 'polygon', Polygon([(28.8016, 12.0839, 0), (23.3016, 36.5576, 0), (24.4432, 36.8142, 0), (29.9432, 12.3405, 0)]), color=Color.from_hex("#1a1eb2"))
add(15, 'polygon', Polygon([(29.0042, 11.9639, 0), (12.5042, 36.4377, 0), (13.2406, 36.9341, 0), (29.7406, 12.4604, 0)]), color=Color.from_hex("#1a1eb2"))
add(15, 'polygon', Polygon([(7.37225, 12.2122, 0), (12.8722, 36.6859, 0), (12.8726, 36.6859, 0), (7.37261, 12.2121, 0)]), color=Color.from_hex("#1a1eb2"))
add(15, 'polygon', Polygon([(7.37243, 12.2122, 0), (29.3724, 12.2122, 0), (29.3724, 12.2121, 0), (7.37243, 12.2121, 0)]), color=Color.from_hex("#ce4095"))


if __name__ == "__main__":
    print("Drawing 35 — Lufthansa Hangar V —", len(ops), "operations")
