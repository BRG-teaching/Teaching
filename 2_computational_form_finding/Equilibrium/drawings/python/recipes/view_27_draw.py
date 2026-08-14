"""Drawing 27 — Constant Force Top Chord Truss

Auto-generated from ops/view_27.json — the drawing as literal COMPAS
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
add(0, 'label', Point(1.75, 11.45, 0), text='Form Diagram')
add(0, 'label', Point(15.45, 11.45, 0), text='Force Diagram')
add(0, 'label', Point(15.42, 11.1, 0), text='1 unit :: 1.00 kN')

# step 1 — The top chord
add(1, 'segment', Line((1, 8.5, 0), (3, 8.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.02736)
add(1, 'segment', Line((3, 8.5, 0), (5, 8.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.02736)
add(1, 'segment', Line((5, 8.5, 0), (7, 8.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.02736)
add(1, 'segment', Line((7, 8.5, 0), (9, 8.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.02736)
add(1, 'segment', Line((9, 8.5, 0), (11, 8.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.02736)
add(1, 'segment', Line((11, 8.5, 0), (13, 8.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.02736)
add(1, 'point', Point(1, 8.5, 0), color=Color.from_hex("#ffffff"), width=0.06)
add(1, 'point', Point(3, 8.5, 0), color=Color.from_hex("#ffffff"), width=0.06)
add(1, 'point', Point(5, 8.5, 0), color=Color.from_hex("#ffffff"), width=0.06)
add(1, 'point', Point(7, 8.5, 0), color=Color.from_hex("#ffffff"), width=0.06)
add(1, 'point', Point(9, 8.5, 0), color=Color.from_hex("#ffffff"), width=0.06)
add(1, 'point', Point(11, 8.5, 0), color=Color.from_hex("#ffffff"), width=0.06)
add(1, 'point', Point(13, 8.5, 0), color=Color.from_hex("#ffffff"), width=0.06)

# step 2 — The loads — in both diagrams
add(2, 'polyline', Polyline([(3, 1.03294, 0), (3, 11.0972, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.08)
add(2, 'arrow', Line((3, 10, 0), (3, 9.2, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1296, 0.054))
add(2, 'label', Point(3.22, 9.62, 0), color=Color.from_hex("#3f9c20"), text='G₁')
add(2, 'arrow', Line((21, 10, 0), (21, 9, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1296, 0.054))
add(2, 'label', Point(21.28, 9.5, 0), color=Color.from_hex("#3f9c20"), text='G₁')
add(2, 'polyline', Polyline([(5, 1.03294, 0), (5, 11.0972, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.08)
add(2, 'arrow', Line((5, 10, 0), (5, 9.2, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1296, 0.054))
add(2, 'label', Point(5.22, 9.62, 0), color=Color.from_hex("#3f9c20"), text='G₂')
add(2, 'arrow', Line((21, 9, 0), (21, 8, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1296, 0.054))
add(2, 'label', Point(21.28, 8.5, 0), color=Color.from_hex("#3f9c20"), text='G₂')
add(2, 'polyline', Polyline([(7, 1.03294, 0), (7, 11.0972, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.08)
add(2, 'arrow', Line((7, 10, 0), (7, 9.2, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1296, 0.054))
add(2, 'label', Point(7.22, 9.62, 0), color=Color.from_hex("#3f9c20"), text='G₃')
add(2, 'arrow', Line((21, 8, 0), (21, 7, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1296, 0.054))
add(2, 'label', Point(21.28, 7.26, 0), color=Color.from_hex("#3f9c20"), text='G₃')
add(2, 'polyline', Polyline([(9, 1.03294, 0), (9, 11.0972, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.08)
add(2, 'arrow', Line((9, 10, 0), (9, 9.2, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1296, 0.054))
add(2, 'label', Point(9.22, 9.62, 0), color=Color.from_hex("#3f9c20"), text='G₄')
add(2, 'arrow', Line((21, 7, 0), (21, 6, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1296, 0.054))
add(2, 'label', Point(21.28, 6.5, 0), color=Color.from_hex("#3f9c20"), text='G₄')
add(2, 'polyline', Polyline([(11, 1.03294, 0), (11, 11.0972, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.08)
add(2, 'arrow', Line((11, 10, 0), (11, 9.2, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1296, 0.054))
add(2, 'label', Point(11.22, 9.62, 0), color=Color.from_hex("#3f9c20"), text='G₅')
add(2, 'arrow', Line((21, 6, 0), (21, 5, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1296, 0.054))
add(2, 'label', Point(21.28, 5.5, 0), color=Color.from_hex("#3f9c20"), text='G₅')
add(2, 'point', Point(21, 10, 0), color=Color.from_hex("#ffffff"), width=0.075)
add(2, 'label', Point(20.8, 10.14, 0), text='a')
add(2, 'point', Point(21, 9, 0), color=Color.from_hex("#ffffff"), width=0.055)
add(2, 'label', Point(20.8, 9.14, 0), text='b')
add(2, 'point', Point(21, 8, 0), color=Color.from_hex("#ffffff"), width=0.055)
add(2, 'label', Point(20.8, 8.14, 0), text='c')
add(2, 'point', Point(21, 7, 0), color=Color.from_hex("#ffffff"), width=0.055)
add(2, 'label', Point(20.8, 7.14, 0), text='d')
add(2, 'point', Point(21, 6, 0), color=Color.from_hex("#ffffff"), width=0.055)
add(2, 'label', Point(20.8, 6.14, 0), text='e')
add(2, 'point', Point(21, 5, 0), color=Color.from_hex("#ffffff"), width=0.055)
add(2, 'label', Point(20.8, 5.14, 0), text='f')

# step 3 — The reactions
add(3, 'polyline', Polyline([(21, 10, 0), (21.6, 10, 0)]), color=Color.from_hex("#111111"), dash=0.09)
add(3, 'polyline', Polyline([(21, 5, 0), (21.6, 5, 0)]), color=Color.from_hex("#111111"), dash=0.09)
add(3, 'polyline', Polyline([(21, 7.5, 0), (21.6, 7.5, 0)]), color=Color.from_hex("#111111"), dash=0.09)
add(3, 'arrow', Line((21.6, 5, 0), (21.6, 7.5, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1296, 0.054))
add(3, 'arrow', Line((21.6, 7.5, 0), (21.6, 10, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1296, 0.054))
add(3, 'label', Point(21.86, 8.75, 0), color=Color.from_hex("#3f9c20"), text='A')
add(3, 'label', Point(21.86, 6.25, 0), color=Color.from_hex("#3f9c20"), text='B')
add(3, 'arrow', Line((1, 6.95, 0), (1, 7.75, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1296, 0.054))
add(3, 'arrow', Line((13, 6.95, 0), (13, 7.75, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1296, 0.054))
add(3, 'label', Point(0.72, 7.33, 0), color=Color.from_hex("#3f9c20"), text='A')
add(3, 'label', Point(13.28, 7.33, 0), color=Color.from_hex("#3f9c20"), text='B')
add(3, 'point', Point(21, 7.5, 0), color=Color.from_hex("#ffffff"), width=0.055)
add(3, 'label', Point(20.8, 7.66, 0), text='i')

# step 4 — Choose the top chord force
add(4, 'polyline', Polyline([(17, 10, 0), (17, 10.5675, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.09)
add(4, 'polyline', Polyline([(21, 10, 0), (21, 10.5675, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.09)
add(4, 'segment', Line((17, 10.5675, 0), (21, 10.5675, 0)), color=Color.from_hex("#aaaaaa"), width=0.0144)
add(4, 'segment', Line((17, 10.4675, 0), (17, 10.6675, 0)), color=Color.from_hex("#aaaaaa"), width=0.0144)
add(4, 'segment', Line((21, 10.4675, 0), (21, 10.6675, 0)), color=Color.from_hex("#aaaaaa"), width=0.0144)
add(4, 'label', Point(19, 10.8475, 0), color=Color.from_hex("#aaaaaa"), text='F top chord = 4.00 kN')
add(4, 'segment', Line((21, 10, 0), (17, 10, 0)), color=Color.from_hex("#1a1eb2"), width=0.02736)
add(4, 'point', Point(17, 10, 0), color=Color.from_hex("#ffffff"), width=0.05)
add(4, 'label', Point(16.82, 10.16, 0), text='T')
add(4, 'label', Point(17.35, 10.16, 0), color=Color.from_hex("#1a1eb2"), text='1')

# step 5 — The cable sets off — member 2
add(5, 'segment', Line((1, 8.5, 0), (3, 7.25, 0)), color=Color.from_hex("#ce4095"), width=0.02736)
add(5, 'segment', Line((17, 10, 0), (21, 7.5, 0)), color=Color.from_hex("#ce4095"), width=0.02736)
add(5, 'point', Point(3, 7.25, 0), color=Color.from_hex("#ffffff"), width=0.06)
add(5, 'label', Point(17.6, 9.3125, 0), color=Color.from_hex("#ce4095"), text='2')

# step 6 — Strut 3 — and chord 4 repeats
add(6, 'segment', Line((21, 9, 0), (17, 9, 0)), color=Color.from_hex("#1a1eb2"), width=0.02736)
add(6, 'segment', Line((3, 8.5, 0), (3, 7.25, 0)), color=Color.from_hex("#1a1eb2"), width=0.02736)
add(6, 'segment', Line((17, 9, 0), (17, 10, 0)), color=Color.from_hex("#1a1eb2"), width=0.02736)
add(6, 'point', Point(17, 9, 0), color=Color.from_hex("#ffffff"), width=0.05)
add(6, 'point', Point(17, 9, 0), color=Color.from_hex("#ffffff"), width=0.05)
add(6, 'label', Point(17.35, 9.16, 0), color=Color.from_hex("#1a1eb2"), text='4')
add(6, 'label', Point(16.8, 9.5, 0), color=Color.from_hex("#1a1eb2"), text='3')

# step 7 — Cable member 6
add(7, 'segment', Line((3, 7.25, 0), (5, 6.5, 0)), color=Color.from_hex("#ce4095"), width=0.02736)
add(7, 'segment', Line((17, 9, 0), (21, 7.5, 0)), color=Color.from_hex("#ce4095"), width=0.02736)
add(7, 'label', Point(17.6, 8.3875, 0), color=Color.from_hex("#ce4095"), text='6')

# step 8 — Strut 7, chord 8
add(8, 'segment', Line((21, 8, 0), (17, 8, 0)), color=Color.from_hex("#1a1eb2"), width=0.02736)
add(8, 'segment', Line((5, 8.5, 0), (5, 6.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.02736)
add(8, 'segment', Line((17, 8, 0), (17, 9, 0)), color=Color.from_hex("#1a1eb2"), width=0.02736)
add(8, 'point', Point(17, 8, 0), color=Color.from_hex("#ffffff"), width=0.05)
add(8, 'point', Point(17, 8, 0), color=Color.from_hex("#ffffff"), width=0.05)
add(8, 'label', Point(17.35, 8.16, 0), color=Color.from_hex("#1a1eb2"), text='8')
add(8, 'label', Point(16.8, 8.5, 0), color=Color.from_hex("#1a1eb2"), text='7')

# step 9 — Cable member 10
add(9, 'segment', Line((5, 6.5, 0), (7, 6.25, 0)), color=Color.from_hex("#ce4095"), width=0.02736)
add(9, 'segment', Line((17, 8, 0), (21, 7.5, 0)), color=Color.from_hex("#ce4095"), width=0.02736)
add(9, 'point', Point(7, 6.25, 0), color=Color.from_hex("#ffffff"), width=0.06)
add(9, 'label', Point(17.6, 7.4625, 0), color=Color.from_hex("#ce4095"), text='10')

# step 10 — Strut 11, chord 12
add(10, 'segment', Line((21, 7, 0), (17, 7, 0)), color=Color.from_hex("#1a1eb2"), width=0.02736)
add(10, 'segment', Line((7, 8.5, 0), (7, 6.25, 0)), color=Color.from_hex("#1a1eb2"), width=0.02736)
add(10, 'segment', Line((17, 7, 0), (17, 8, 0)), color=Color.from_hex("#1a1eb2"), width=0.02736)
add(10, 'point', Point(17, 7, 0), color=Color.from_hex("#ffffff"), width=0.05)
add(10, 'label', Point(17.35, 7.16, 0), color=Color.from_hex("#1a1eb2"), text='12')
add(10, 'label', Point(16.8, 7.5, 0), color=Color.from_hex("#1a1eb2"), text='11')

# step 11 — Cable member 14
add(11, 'segment', Line((7, 6.25, 0), (9, 6.5, 0)), color=Color.from_hex("#ce4095"), width=0.02736)
add(11, 'segment', Line((17, 7, 0), (21, 7.5, 0)), color=Color.from_hex("#ce4095"), width=0.02736)
add(11, 'point', Point(17, 7, 0), color=Color.from_hex("#ffffff"), width=0.05)
add(11, 'point', Point(9, 6.5, 0), color=Color.from_hex("#ffffff"), width=0.06)
add(11, 'label', Point(17.6, 6.5375, 0), color=Color.from_hex("#ce4095"), text='14')

# step 12 — Strut 15, chord 16
add(12, 'segment', Line((21, 6, 0), (17, 6, 0)), color=Color.from_hex("#1a1eb2"), width=0.02736)
add(12, 'segment', Line((9, 8.5, 0), (9, 6.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.02736)
add(12, 'segment', Line((17, 6, 0), (17, 7, 0)), color=Color.from_hex("#1a1eb2"), width=0.02736)
add(12, 'point', Point(17, 6, 0), color=Color.from_hex("#ffffff"), width=0.05)
add(12, 'label', Point(17.35, 6.16, 0), color=Color.from_hex("#1a1eb2"), text='16')
add(12, 'label', Point(16.8, 6.5, 0), color=Color.from_hex("#1a1eb2"), text='15')

# step 13 — Cable member 18
add(13, 'segment', Line((9, 6.5, 0), (11, 7.25, 0)), color=Color.from_hex("#ce4095"), width=0.02736)
add(13, 'segment', Line((17, 6, 0), (21, 7.5, 0)), color=Color.from_hex("#ce4095"), width=0.02736)
add(13, 'point', Point(11, 7.25, 0), color=Color.from_hex("#ffffff"), width=0.06)
add(13, 'point', Point(17, 6, 0), color=Color.from_hex("#ffffff"), width=0.05)
add(13, 'label', Point(17.6, 5.6125, 0), color=Color.from_hex("#ce4095"), text='18')

# step 14 — Strut 19, chord 20 — member 21 closes
add(14, 'segment', Line((21, 5, 0), (17, 5, 0)), color=Color.from_hex("#1a1eb2"), width=0.02736)
add(14, 'segment', Line((11, 7.25, 0), (13, 8.5, 0)), color=Color.from_hex("#ce4095"), width=0.02736)
add(14, 'segment', Line((17, 5, 0), (21, 7.5, 0)), color=Color.from_hex("#ce4095"), width=0.02736)
add(14, 'segment', Line((11, 8.5, 0), (11, 7.25, 0)), color=Color.from_hex("#1a1eb2"), width=0.02736)
add(14, 'segment', Line((17, 5, 0), (17, 6, 0)), color=Color.from_hex("#1a1eb2"), width=0.02736)
add(14, 'point', Point(17, 5, 0), color=Color.from_hex("#ffffff"), width=0.05)
add(14, 'label', Point(17.35, 4.82, 0), color=Color.from_hex("#1a1eb2"), text='20')
add(14, 'label', Point(17.6, 5.1875, 0), color=Color.from_hex("#ce4095"), text='21')
add(14, 'label', Point(16.8, 5.5, 0), color=Color.from_hex("#1a1eb2"), text='19')

# step 15 — The silent diagonals
add(15, 'segment', Line((3, 8.5, 0), (5, 6.5, 0)), color=Color.from_hex("#b9b9bd"), width=0.02736)
add(15, 'segment', Line((17, 9, 0), (17, 9, 0)), color=Color.from_hex("#b9b9bd"), width=0.02736)
add(15, 'segment', Line((5, 8.5, 0), (7, 6.25, 0)), color=Color.from_hex("#b9b9bd"), width=0.02736)
add(15, 'segment', Line((17, 8, 0), (17, 8, 0)), color=Color.from_hex("#b9b9bd"), width=0.02736)
add(15, 'segment', Line((7, 6.25, 0), (9, 8.5, 0)), color=Color.from_hex("#b9b9bd"), width=0.02736)
add(15, 'segment', Line((17, 7, 0), (17, 7, 0)), color=Color.from_hex("#b9b9bd"), width=0.02736)
add(15, 'segment', Line((9, 6.5, 0), (11, 8.5, 0)), color=Color.from_hex("#b9b9bd"), width=0.02736)
add(15, 'segment', Line((17, 6, 0), (17, 6, 0)), color=Color.from_hex("#b9b9bd"), width=0.02736)

# step 16 — Compression, tension — and Q
add(16, 'label', Point(19.2, 2.35, 0), color=Color.from_hex("#1a1eb2"), text='top chord = 4.00 kN (constant — your choice)')
add(16, 'label', Point(19.2, 2, 0), color=Color.from_hex("#1a1eb2"), text='struts = G = 1.00 kN')
add(16, 'label', Point(19.2, 1.65, 0), color=Color.from_hex("#ce4095"), text='cable = 4.03…4.72 kN')
add(16, 'label', Point(19.2, 1.3, 0), color=Color.from_hex("#111111"), text='diagonals = 0 (uniform load)')
add(16, 'label', Point(19.2, 0.95, 0), color=Color.from_hex("#3f9c20"), text='A = B = 2.50 kN')
add(16, 'polygon', Polygon([(1, 8.46, 0), (1, 8.54, 0), (3, 8.54, 0), (3, 8.46, 0)]), color=Color.from_hex("#1a1eb2"))
add(16, 'polygon', Polygon([(0.975, 8.46, 0), (1.025, 8.54, 0), (3.025, 7.29, 0), (2.975, 7.21, 0)]), color=Color.from_hex("#ce4095"))
add(16, 'polygon', Polygon([(3, 8.46, 0), (3, 8.54, 0), (5, 8.54, 0), (5, 8.46, 0)]), color=Color.from_hex("#1a1eb2"))
add(16, 'polygon', Polygon([(2.985, 7.21, 0), (3.015, 7.29, 0), (5.015, 6.54, 0), (4.985, 6.46, 0)]), color=Color.from_hex("#ce4095"))
add(16, 'polygon', Polygon([(5, 8.46, 0), (5, 8.54, 0), (7, 8.54, 0), (7, 8.46, 0)]), color=Color.from_hex("#1a1eb2"))
add(16, 'polygon', Polygon([(4.995, 6.46, 0), (5.005, 6.54, 0), (7.005, 6.29, 0), (6.995, 6.21, 0)]), color=Color.from_hex("#ce4095"))
add(16, 'polygon', Polygon([(7, 8.46, 0), (7, 8.54, 0), (9, 8.54, 0), (9, 8.46, 0)]), color=Color.from_hex("#1a1eb2"))
add(16, 'polygon', Polygon([(7.005, 6.21, 0), (6.995, 6.29, 0), (8.995, 6.54, 0), (9.005, 6.46, 0)]), color=Color.from_hex("#ce4095"))
add(16, 'polygon', Polygon([(9, 8.46, 0), (9, 8.54, 0), (11, 8.54, 0), (11, 8.46, 0)]), color=Color.from_hex("#1a1eb2"))
add(16, 'polygon', Polygon([(9.015, 6.46, 0), (8.985, 6.54, 0), (10.985, 7.29, 0), (11.015, 7.21, 0)]), color=Color.from_hex("#ce4095"))
add(16, 'polygon', Polygon([(11, 8.46, 0), (11, 8.54, 0), (13, 8.54, 0), (13, 8.46, 0)]), color=Color.from_hex("#1a1eb2"))
add(16, 'polygon', Polygon([(11.025, 7.21, 0), (10.975, 7.29, 0), (12.975, 8.54, 0), (13.025, 8.46, 0)]), color=Color.from_hex("#ce4095"))
add(16, 'polygon', Polygon([(2.99, 8.5, 0), (3.01, 8.5, 0), (3.01, 7.25, 0), (2.99, 7.25, 0)]), color=Color.from_hex("#1a1eb2"))
add(16, 'polygon', Polygon([(4.99, 8.5, 0), (5.01, 8.5, 0), (5.01, 6.5, 0), (4.99, 6.5, 0)]), color=Color.from_hex("#1a1eb2"))
add(16, 'polygon', Polygon([(6.99, 8.5, 0), (7.01, 8.5, 0), (7.01, 6.25, 0), (6.99, 6.25, 0)]), color=Color.from_hex("#1a1eb2"))
add(16, 'polygon', Polygon([(8.99, 8.5, 0), (9.01, 8.5, 0), (9.01, 6.5, 0), (8.99, 6.5, 0)]), color=Color.from_hex("#1a1eb2"))
add(16, 'polygon', Polygon([(10.99, 8.5, 0), (11.01, 8.5, 0), (11.01, 7.25, 0), (10.99, 7.25, 0)]), color=Color.from_hex("#1a1eb2"))


if __name__ == "__main__":
    print("Drawing 27 — Constant Force Top Chord Truss —", len(ops), "operations")
