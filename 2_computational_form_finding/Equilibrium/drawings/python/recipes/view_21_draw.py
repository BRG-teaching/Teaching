"""Drawing 21 — Fan-harp bridge

Auto-generated from ops/view_21.json — the drawing as literal COMPAS
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
add(0, 'label', Point(1.5, 25.4, 0), text='Form Diagram')
add(0, 'label', Point(45.5, 25.4, 0), text='Force Diagram')
add(0, 'label', Point(46.2, 24.3, 0), text='1 unit :: 0.67 kN')

# step 1 — Mast, deck and anchor
add(1, 'polyline', Polyline([(8, 0, 0), (32, 0, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.45)
add(1, 'polyline', Polyline([(35, 0, 0), (35, 20, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.45)
add(1, 'polyline', Polyline([(20, 7.83333, 0), (20, 21.5, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.45)
add(1, 'polyline', Polyline([(33, 7.33333, 0), (35, 7.33333, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.45)
add(1, 'segment', Line((7, 7.33333, 0), (12, 7.33333, 0)), color=Color.from_hex("#aaaaaa"), width=0.036)
add(1, 'segment', Line((12, 7.33333, 0), (17, 7.33333, 0)), color=Color.from_hex("#aaaaaa"), width=0.036)
add(1, 'segment', Line((17, 7.33333, 0), (20, 7.33333, 0)), color=Color.from_hex("#aaaaaa"), width=0.036)
add(1, 'segment', Line((20, 7.33333, 0), (23, 7.33333, 0)), color=Color.from_hex("#aaaaaa"), width=0.036)
add(1, 'segment', Line((23, 7.33333, 0), (28, 7.33333, 0)), color=Color.from_hex("#aaaaaa"), width=0.036)
add(1, 'segment', Line((28, 7.33333, 0), (33, 7.33333, 0)), color=Color.from_hex("#aaaaaa"), width=0.036)
add(1, 'segment', Line((20, 0, 0), (20, 7.33333, 0)), color=Color.from_hex("#aaaaaa"), width=0.036)
add(1, 'segment', Line((20, 7.33333, 0), (20, 17.3333, 0)), color=Color.from_hex("#aaaaaa"), width=0.036)
add(1, 'point', Point(20, 0, 0), color=Color.from_hex("#ffffff"), width=0.34)
add(1, 'point', Point(20, 22, 0), color=Color.from_hex("#ffffff"), width=0.34)
add(1, 'point', Point(20, 7.33333, 0), color=Color.from_hex("#ffffff"), width=0.34)
add(1, 'point', Point(35, 7.33333, 0), color=Color.from_hex("#ffffff"), width=0.34)
add(1, 'point', Point(7, 7.33333, 0), color=Color.from_hex("#ffffff"), width=0.26)
add(1, 'point', Point(12, 7.33333, 0), color=Color.from_hex("#ffffff"), width=0.26)
add(1, 'point', Point(17, 7.33333, 0), color=Color.from_hex("#ffffff"), width=0.26)
add(1, 'point', Point(23, 7.33333, 0), color=Color.from_hex("#ffffff"), width=0.26)
add(1, 'point', Point(28, 7.33333, 0), color=Color.from_hex("#ffffff"), width=0.26)
add(1, 'point', Point(33, 7.33333, 0), color=Color.from_hex("#ffffff"), width=0.26)

# step 2 — Six stays — fan, semifan, harp
add(2, 'segment', Line((20, 17.3333, 0), (7, 7.33333, 0)), color=Color.from_hex("#aaaaaa"), width=0.036)
add(2, 'segment', Line((20, 17.3333, 0), (12, 7.33333, 0)), color=Color.from_hex("#aaaaaa"), width=0.036)
add(2, 'segment', Line((20, 17.3333, 0), (17, 7.33333, 0)), color=Color.from_hex("#aaaaaa"), width=0.036)
add(2, 'segment', Line((20, 17.3333, 0), (23, 7.33333, 0)), color=Color.from_hex("#aaaaaa"), width=0.036)
add(2, 'segment', Line((20, 17.3333, 0), (28, 7.33333, 0)), color=Color.from_hex("#aaaaaa"), width=0.036)
add(2, 'segment', Line((20, 17.3333, 0), (33, 7.33333, 0)), color=Color.from_hex("#aaaaaa"), width=0.036)
add(2, 'point', Point(20, 17.3333, 0), color=Color.from_hex("#ffffff"), width=0.34)
add(2, 'point', Point(20, 17.3333, 0), color=Color.from_hex("#ffffff"), width=0.34)
add(2, 'point', Point(20, 17.3333, 0), color=Color.from_hex("#ffffff"), width=0.34)

# step 3 — The loads and the load line
add(3, 'polyline', Polyline([(7, -4.99632, 0), (7, 22.6329, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3)
add(3, 'arrow', Line((7, 7.33333, 0), (7, 5.33333, 0)), color=Color.from_hex("#3f9c20"), width=0.1008, head=(0.54, 0.216))
add(3, 'label', Point(6.38, 6.23333, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(3, 'arrow', Line((47, 11.6, 0), (47, 8.6, 0)), color=Color.from_hex("#3f9c20"), width=0.1008, head=(0.54, 0.216))
add(3, 'label', Point(46.25, 10.1, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(3, 'polyline', Polyline([(12, -4.99632, 0), (12, 22.6329, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3)
add(3, 'arrow', Line((12, 7.33333, 0), (12, 5.33333, 0)), color=Color.from_hex("#3f9c20"), width=0.1008, head=(0.54, 0.216))
add(3, 'label', Point(11.38, 6.23333, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(3, 'arrow', Line((47, 14.6, 0), (47, 11.6, 0)), color=Color.from_hex("#3f9c20"), width=0.1008, head=(0.54, 0.216))
add(3, 'label', Point(46.25, 13.1, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(3, 'polyline', Polyline([(17, -4.99632, 0), (17, 22.6329, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3)
add(3, 'arrow', Line((17, 7.33333, 0), (17, 5.33333, 0)), color=Color.from_hex("#3f9c20"), width=0.1008, head=(0.54, 0.216))
add(3, 'label', Point(16.38, 6.23333, 0), color=Color.from_hex("#3f9c20"), text='F₃')
add(3, 'arrow', Line((47, 17.6, 0), (47, 14.6, 0)), color=Color.from_hex("#3f9c20"), width=0.1008, head=(0.54, 0.216))
add(3, 'label', Point(46.25, 16.1, 0), color=Color.from_hex("#3f9c20"), text='F₃')
add(3, 'polyline', Polyline([(23, -4.99632, 0), (23, 22.6329, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3)
add(3, 'arrow', Line((23, 7.33333, 0), (23, 5.33333, 0)), color=Color.from_hex("#3f9c20"), width=0.1008, head=(0.54, 0.216))
add(3, 'label', Point(22.38, 6.23333, 0), color=Color.from_hex("#3f9c20"), text='F₄')
add(3, 'polyline', Polyline([(28, -4.99632, 0), (28, 22.6329, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3)
add(3, 'arrow', Line((28, 7.33333, 0), (28, 5.33333, 0)), color=Color.from_hex("#3f9c20"), width=0.1008, head=(0.54, 0.216))
add(3, 'label', Point(27.38, 6.23333, 0), color=Color.from_hex("#3f9c20"), text='F₅')
add(3, 'polyline', Polyline([(33, -4.99632, 0), (33, 22.6329, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3)
add(3, 'arrow', Line((33, 7.33333, 0), (33, 5.33333, 0)), color=Color.from_hex("#3f9c20"), width=0.1008, head=(0.54, 0.216))
add(3, 'label', Point(32.38, 6.23333, 0), color=Color.from_hex("#3f9c20"), text='F₆')
add(3, 'point', Point(47, 8.6, 0), color=Color.from_hex("#ffffff"), width=0.34)
add(3, 'label', Point(46.4, 8.2, 0), text='O')

# step 4 — Joint deck1 — members 1, 2
add(4, 'segment', Line((20, 17.3333, 0), (7, 7.33333, 0)), color=Color.from_hex("#ce4095"), width=0.1152)
add(4, 'segment', Line((50.9, 11.6, 0), (47, 8.6, 0)), color=Color.from_hex("#ce4095"), width=0.0648)
add(4, 'label', Point(13.1037, 12.8485, 0), color=Color.from_hex("#ce4095"), text='1')
add(4, 'label', Point(48.6147, 10.5359, 0), color=Color.from_hex("#ce4095"), text='1')
add(4, 'segment', Line((7, 7.33333, 0), (12, 7.33333, 0)), color=Color.from_hex("#1a1eb2"), width=0.1152)
add(4, 'segment', Line((50.9, 11.6, 0), (47, 11.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.0648)
add(4, 'label', Point(9.5, 4.68333, 0), color=Color.from_hex("#1a1eb2"), text='2')
add(4, 'label', Point(48.95, 12.1, 0), color=Color.from_hex("#1a1eb2"), text='2')
add(4, 'point', Point(50.9, 11.6, 0), color=Color.from_hex("#ffffff"), width=0.26)
add(4, 'label', Point(51.45, 11.9, 0), text='T')

# step 5 — Joint deck2 — members 3, 4
add(5, 'segment', Line((20, 17.3333, 0), (12, 7.33333, 0)), color=Color.from_hex("#ce4095"), width=0.1152)
add(5, 'segment', Line((53.3, 14.6, 0), (50.9, 11.6, 0)), color=Color.from_hex("#ce4095"), width=0.0648)
add(5, 'label', Point(15.4924, 12.7394, 0), color=Color.from_hex("#ce4095"), text='3')
add(5, 'label', Point(51.6705, 13.4436, 0), color=Color.from_hex("#ce4095"), text='3')
add(5, 'segment', Line((12, 7.33333, 0), (17, 7.33333, 0)), color=Color.from_hex("#1a1eb2"), width=0.1152)
add(5, 'segment', Line((53.3, 14.6, 0), (47, 14.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.0648)
add(5, 'label', Point(14.5, 4.68333, 0), color=Color.from_hex("#1a1eb2"), text='4')
add(5, 'label', Point(50.15, 15.1, 0), color=Color.from_hex("#1a1eb2"), text='4')
add(5, 'point', Point(53.3, 14.6, 0), color=Color.from_hex("#ffffff"), width=0.26)
add(5, 'label', Point(53.9, 14.9, 0), text='U₂')

# step 6 — Joint deck3 — members 5, 6
add(6, 'segment', Line((20, 17.3333, 0), (17, 7.33333, 0)), color=Color.from_hex("#ce4095"), width=0.1152)
add(6, 'segment', Line((54.2, 17.6, 0), (53.3, 14.6, 0)), color=Color.from_hex("#ce4095"), width=0.0648)
add(6, 'label', Point(17.8774, 12.5201, 0), color=Color.from_hex("#ce4095"), text='5')
add(6, 'label', Point(53.2232, 16.258, 0), color=Color.from_hex("#ce4095"), text='5')
add(6, 'segment', Line((17, 7.33333, 0), (20, 7.33333, 0)), color=Color.from_hex("#1a1eb2"), width=0.1152)
add(6, 'segment', Line((54.2, 17.6, 0), (47, 17.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.0648)
add(6, 'label', Point(18.5, 4.68333, 0), color=Color.from_hex("#1a1eb2"), text='6')
add(6, 'label', Point(50.6, 18.1, 0), color=Color.from_hex("#1a1eb2"), text='6')
add(6, 'point', Point(54.2, 17.6, 0), color=Color.from_hex("#ffffff"), width=0.26)
add(6, 'label', Point(54.8, 17.9, 0), text='V₂')

# step 7 — Joint tower1 — members 13, 15
add(7, 'segment', Line((20, 17.3333, 0), (33, 7.33333, 0)), color=Color.from_hex("#ce4095"), width=0.1152)
add(7, 'segment', Line((47, 8.6, 0), (50.9, 5.6, 0)), color=Color.from_hex("#ce4095"), width=0.0648)
add(7, 'label', Point(26.8963, 12.8485, 0), color=Color.from_hex("#ce4095"), text='13')
add(7, 'label', Point(49.2853, 7.53594, 0), color=Color.from_hex("#ce4095"), text='13')
add(7, 'segment', Line((20, 17.3333, 0), (20, 17.3333, 0)), color=Color.from_hex("#ce4095"), width=0.1152)
add(7, 'segment', Line((50.9, 5.6, 0), (50.9, 11.6, 0)), color=Color.from_hex("#ce4095"), width=0.0648)
add(7, 'point', Point(50.9, 5.6, 0), color=Color.from_hex("#ffffff"), width=0.26)
add(7, 'label', Point(51.5, 5.25, 0), text='W₂')

# step 8 — Joint tower2 — members 11, 14
add(8, 'segment', Line((20, 17.3333, 0), (28, 7.33333, 0)), color=Color.from_hex("#ce4095"), width=0.1152)
add(8, 'segment', Line((50.9, 5.6, 0), (53.3, 2.6, 0)), color=Color.from_hex("#ce4095"), width=0.0648)
add(8, 'label', Point(24.5076, 12.7394, 0), color=Color.from_hex("#ce4095"), text='11')
add(8, 'label', Point(52.5295, 4.44358, 0), color=Color.from_hex("#ce4095"), text='11')
add(8, 'segment', Line((20, 17.3333, 0), (20, 17.3333, 0)), color=Color.from_hex("#ce4095"), width=0.1152)
add(8, 'segment', Line((53.3, 14.6, 0), (53.3, 2.6, 0)), color=Color.from_hex("#ce4095"), width=0.0648)
add(8, 'point', Point(53.3, 2.6, 0), color=Color.from_hex("#ffffff"), width=0.26)
add(8, 'label', Point(53.9, 2.25, 0), text='Z₂')

# step 9 — Joint tower3 — members 9, 7
add(9, 'segment', Line((20, 17.3333, 0), (20, 7.33333, 0)), color=Color.from_hex("#1a1eb2"), width=0.1152)
add(9, 'segment', Line((54.2, -0.4, 0), (54.2, 17.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.0648)
add(9, 'label', Point(20.9, 12.3333, 0), color=Color.from_hex("#1a1eb2"), text='7')
add(9, 'label', Point(54.75, 8.6, 0), color=Color.from_hex("#1a1eb2"), text='7')
add(9, 'segment', Line((20, 17.3333, 0), (23, 7.33333, 0)), color=Color.from_hex("#ce4095"), width=0.1152)
add(9, 'segment', Line((53.3, 2.6, 0), (54.2, -0.4, 0)), color=Color.from_hex("#ce4095"), width=0.0648)
add(9, 'label', Point(22.1226, 12.5201, 0), color=Color.from_hex("#ce4095"), text='9')
add(9, 'label', Point(54.2768, 1.25804, 0), color=Color.from_hex("#ce4095"), text='9')
add(9, 'point', Point(54.2, -0.4, 0), color=Color.from_hex("#ffffff"), width=0.26)
add(9, 'label', Point(54.85, -0.75, 0), text='A₃')

# step 10 — The tower deck node closes — members 16, 8
add(10, 'segment', Line((20, 7.33333, 0), (23, 7.33333, 0)), color=Color.from_hex("#1a1eb2"), width=0.1152)
add(10, 'segment', Line((54.2, -0.4, 0), (47, -0.4, 0)), color=Color.from_hex("#1a1eb2"), width=0.0648)
add(10, 'label', Point(21.5, 4.68333, 0), color=Color.from_hex("#1a1eb2"), text='8')
add(10, 'label', Point(50.6, -0.9, 0), color=Color.from_hex("#1a1eb2"), text='8')
add(10, 'segment', Line((20, 7.33333, 0), (20, 0, 0)), color=Color.from_hex("#1a1eb2"), width=0.1152)
add(10, 'segment', Line((47, -0.4, 0), (47, 17.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.0648)
add(10, 'label', Point(20.9, 3.66667, 0), color=Color.from_hex("#1a1eb2"), text='16')
add(10, 'label', Point(46.45, 16.85, 0), color=Color.from_hex("#1a1eb2"), text='16')
add(10, 'point', Point(47, -0.4, 0), color=Color.from_hex("#ffffff"), width=0.26)
add(10, 'label', Point(47.9, -0.9, 0), text='LF₄')

# step 11 — The right-span loads
add(11, 'arrow', Line((47, 2.6, 0), (47, -0.4, 0)), color=Color.from_hex("#3f9c20"), width=0.1008, head=(0.54, 0.216))
add(11, 'label', Point(46.25, 1.1, 0), color=Color.from_hex("#3f9c20"), text='F₄')
add(11, 'arrow', Line((47, 5.6, 0), (47, 2.6, 0)), color=Color.from_hex("#3f9c20"), width=0.1008, head=(0.54, 0.216))
add(11, 'label', Point(46.25, 4.1, 0), color=Color.from_hex("#3f9c20"), text='F₅')
add(11, 'arrow', Line((47, 8.6, 0), (47, 5.6, 0)), color=Color.from_hex("#3f9c20"), width=0.1008, head=(0.54, 0.216))
add(11, 'label', Point(46.25, 7.1, 0), color=Color.from_hex("#3f9c20"), text='F₆')

# step 12 — Joints deck4, deck5 — members 10, 12
add(12, 'segment', Line((23, 7.33333, 0), (28, 7.33333, 0)), color=Color.from_hex("#1a1eb2"), width=0.1152)
add(12, 'segment', Line((53.3, 2.6, 0), (47, 2.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.0648)
add(12, 'label', Point(25.5, 4.68333, 0), color=Color.from_hex("#1a1eb2"), text='10')
add(12, 'label', Point(50.15, 2.1, 0), color=Color.from_hex("#1a1eb2"), text='10')
add(12, 'segment', Line((28, 7.33333, 0), (33, 7.33333, 0)), color=Color.from_hex("#1a1eb2"), width=0.1152)
add(12, 'segment', Line((50.9, 5.6, 0), (47, 5.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.0648)
add(12, 'label', Point(30.5, 4.68333, 0), color=Color.from_hex("#1a1eb2"), text='12')
add(12, 'label', Point(48.95, 5.1, 0), color=Color.from_hex("#1a1eb2"), text='12')

# step 14 — The reaction A
add(14, 'polyline', Polyline([(47, 17.6, 0), (44.5, 17.6, 0)]), color=Color.from_hex("#006400"), dash=0.35)
add(14, 'polyline', Polyline([(47, -0.4, 0), (44.5, -0.4, 0)]), color=Color.from_hex("#006400"), dash=0.35)
add(14, 'arrow', Line((44.5, -0.4, 0), (44.5, 17.6, 0)), color=Color.from_hex("#3f9c20"), width=0.1008, head=(0.54, 0.216))
add(14, 'arrow', Line((20, -2, 0), (20, 0, 0)), color=Color.from_hex("#3f9c20"), width=0.1008, head=(0.54, 0.216))
add(14, 'label', Point(20.65, -1.6, 0), color=Color.from_hex("#3f9c20"), text='A')
add(14, 'label', Point(43.9, 8.6, 0), color=Color.from_hex("#3f9c20"), text='A')

# step 15 — Tension and compression
add(15, 'polygon', Polygon([(19.96, 17.3853, 0), (20.04, 17.2813, 0), (7.04, 7.28133, 0), (6.96, 7.38533, 0)]), color=Color.from_hex("#ce4095"))
add(15, 'polygon', Polygon([(7, 7.28133, 0), (7, 7.38533, 0), (12, 7.38533, 0), (12, 7.28133, 0)]), color=Color.from_hex("#1a1eb2"))
add(15, 'polygon', Polygon([(19.96, 17.3653, 0), (20.04, 17.3013, 0), (12.04, 7.30133, 0), (11.96, 7.36533, 0)]), color=Color.from_hex("#ce4095"))
add(15, 'polygon', Polygon([(12, 7.24933, 0), (12, 7.41733, 0), (17, 7.41733, 0), (17, 7.24933, 0)]), color=Color.from_hex("#1a1eb2"))
add(15, 'polygon', Polygon([(19.96, 17.3453, 0), (20.04, 17.3213, 0), (17.04, 7.32133, 0), (16.96, 7.34533, 0)]), color=Color.from_hex("#ce4095"))
add(15, 'polygon', Polygon([(17, 7.23733, 0), (17, 7.42933, 0), (20, 7.42933, 0), (20, 7.23733, 0)]), color=Color.from_hex("#1a1eb2"))
add(15, 'polygon', Polygon([(19.76, 17.3333, 0), (20.24, 17.3333, 0), (20.24, 7.33333, 0), (19.76, 7.33333, 0)]), color=Color.from_hex("#1a1eb2"))
add(15, 'polygon', Polygon([(20, 7.23733, 0), (20, 7.42933, 0), (23, 7.42933, 0), (23, 7.23733, 0)]), color=Color.from_hex("#1a1eb2"))
add(15, 'polygon', Polygon([(19.96, 17.3213, 0), (20.04, 17.3453, 0), (23.04, 7.34533, 0), (22.96, 7.32133, 0)]), color=Color.from_hex("#ce4095"))
add(15, 'polygon', Polygon([(23, 7.24933, 0), (23, 7.41733, 0), (28, 7.41733, 0), (28, 7.24933, 0)]), color=Color.from_hex("#1a1eb2"))
add(15, 'polygon', Polygon([(19.96, 17.3013, 0), (20.04, 17.3653, 0), (28.04, 7.36533, 0), (27.96, 7.30133, 0)]), color=Color.from_hex("#ce4095"))
add(15, 'polygon', Polygon([(28, 7.28133, 0), (28, 7.38533, 0), (33, 7.38533, 0), (33, 7.28133, 0)]), color=Color.from_hex("#1a1eb2"))
add(15, 'polygon', Polygon([(19.96, 17.2813, 0), (20.04, 17.3853, 0), (33.04, 7.38533, 0), (32.96, 7.28133, 0)]), color=Color.from_hex("#ce4095"))
add(15, 'polygon', Polygon([(20, 17.1733, 0), (20, 17.4933, 0)]), color=Color.from_hex("#ce4095"))
add(15, 'polygon', Polygon([(20, 17.2533, 0), (20, 17.4133, 0)]), color=Color.from_hex("#ce4095"))
add(15, 'polygon', Polygon([(19.76, 7.33333, 0), (20.24, 7.33333, 0), (20.24, 0, 0), (19.76, 0, 0)]), color=Color.from_hex("#1a1eb2"))
add(15, 'label', Point(57.5, 22.3, 0), color=Color.from_hex("#3f9c20"), text='A = 12.0 kN')
add(15, 'label', Point(57.5, 21.1, 0), color=Color.from_hex("#3f9c20"), text='B = 0.00 kN')


if __name__ == "__main__":
    print("Drawing 21 — Fan-harp bridge —", len(ops), "operations")
