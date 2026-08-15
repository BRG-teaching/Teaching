"""Drawing 47 — Internal forces in a beam: line load

Auto-generated from ops/view_47.json — the drawing as literal COMPAS
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


# step 1 — The beam on two supports
add(1, 'label', Point(-4.9, 5.4, 0), text='Form Diagram')
add(1, 'label', Point(-4.9, 4.6, 0), text='1 unit :: 1 m')
add(1, 'segment', Line((0, -0.942226, 0), (10, -0.942226, 0)), color=Color.from_hex("#111111"), width=0.108)
add(1, 'polyline', Polyline([(0, 2.17078, 0), (0, -17.67, 0)]), color=Color.from_hex("#111111"), dash=0.28)
add(1, 'polyline', Polyline([(10, 2.17078, 0), (10, -17.67, 0)]), color=Color.from_hex("#111111"), dash=0.28)
add(1, 'polyline', Polyline([(2.83446, 2.17078, 0), (2.83446, -17.67, 0)]), color=Color.from_hex("#111111"), dash=0.28)
add(1, 'polyline', Polyline([(7.12682, 2.17078, 0), (7.12682, -17.67, 0)]), color=Color.from_hex("#111111"), dash=0.28)
add(1, 'segment', Line((0, 4.77082, 0), (10, 4.77082, 0)), color=Color.from_hex("#aaaaaa"), width=0.036)
add(1, 'segment', Line((-0.22, 4.55082, 0), (0.22, 4.99082, 0)), color=Color.from_hex("#aaaaaa"), width=0.036)
add(1, 'segment', Line((-0.22, 4.99082, 0), (0.22, 4.55082, 0)), color=Color.from_hex("#aaaaaa"), width=0.036)
add(1, 'segment', Line((9.78, 4.55082, 0), (10.22, 4.99082, 0)), color=Color.from_hex("#aaaaaa"), width=0.036)
add(1, 'segment', Line((9.78, 4.99082, 0), (10.22, 4.55082, 0)), color=Color.from_hex("#aaaaaa"), width=0.036)
add(1, 'label', Point(5, 5.32082, 0), color=Color.from_hex("#aaaaaa"), text='l = 10 m')
add(1, 'point', Point(2.83446, -0.942226, 0), color=Color.from_hex("#ffffff"), width=0.24)
add(1, 'point', Point(7.12682, -0.942226, 0), color=Color.from_hex("#ffffff"), width=0.24)

# step 2 — The line load q
add(2, 'polygon', Polygon([(0, 3.63965, 0), (0, 3.11465, 0), (10, 3.11465, 0), (10, 3.63965, 0)]), color=Color.from_hex("#3f9c20"), opacity=0.16)
add(2, 'segment', Line((0, 3.63965, 0), (10, 3.63965, 0)), color=Color.from_hex("#3f9c20"), width=0.0396)
add(2, 'segment', Line((10, 3.63965, 0), (10, 3.11465, 0)), color=Color.from_hex("#3f9c20"), width=0.0396)
add(2, 'segment', Line((10, 3.11465, 0), (0, 3.11465, 0)), color=Color.from_hex("#3f9c20"), width=0.0396)
add(2, 'segment', Line((0, 3.11465, 0), (0, 3.63965, 0)), color=Color.from_hex("#3f9c20"), width=0.0396)
add(2, 'label', Point(-0.6, 3.37716, 0), color=Color.from_hex("#3f9c20"), text='q')
add(2, 'label', Point(17.9, 2.4, 0), text='q = 0.30 kN / m')

# step 3 — Discretize into ten strips
add(3, 'label', Point(17.9, 5.4, 0), text='Force Diagram')
add(3, 'label', Point(17.9, 4.6, 0), text='1 unit :: 0.3 kN')
add(3, 'polyline', Polyline([(0.5, 2.17078, 0), (0.5, -17.67, 0)]), color=Color.from_hex("#111111"), dash=0.22)
add(3, 'polyline', Polyline([(1.5, 2.17078, 0), (1.5, -17.67, 0)]), color=Color.from_hex("#111111"), dash=0.22)
add(3, 'polyline', Polyline([(2.5, 2.17078, 0), (2.5, -17.67, 0)]), color=Color.from_hex("#111111"), dash=0.22)
add(3, 'polyline', Polyline([(3.5, 2.17078, 0), (3.5, -17.67, 0)]), color=Color.from_hex("#111111"), dash=0.22)
add(3, 'polyline', Polyline([(4.5, 2.17078, 0), (4.5, -17.67, 0)]), color=Color.from_hex("#111111"), dash=0.22)
add(3, 'polyline', Polyline([(5.5, 2.17078, 0), (5.5, -17.67, 0)]), color=Color.from_hex("#111111"), dash=0.22)
add(3, 'polyline', Polyline([(6.5, 2.17078, 0), (6.5, -17.67, 0)]), color=Color.from_hex("#111111"), dash=0.22)
add(3, 'polyline', Polyline([(7.5, 2.17078, 0), (7.5, -17.67, 0)]), color=Color.from_hex("#111111"), dash=0.22)
add(3, 'polyline', Polyline([(8.5, 2.17078, 0), (8.5, -17.67, 0)]), color=Color.from_hex("#111111"), dash=0.22)
add(3, 'polyline', Polyline([(9.5, 2.17078, 0), (9.5, -17.67, 0)]), color=Color.from_hex("#111111"), dash=0.22)
add(3, 'point', Point(24.1979, -0.316368, 0), color=Color.from_hex("#ffffff"), width=0.18)
add(3, 'point', Point(24.1979, -1.31637, 0), color=Color.from_hex("#ffffff"), width=0.18)
add(3, 'point', Point(24.1979, -2.31637, 0), color=Color.from_hex("#ffffff"), width=0.18)
add(3, 'point', Point(24.1979, -3.31637, 0), color=Color.from_hex("#ffffff"), width=0.18)
add(3, 'point', Point(24.1979, -4.31637, 0), color=Color.from_hex("#ffffff"), width=0.18)
add(3, 'point', Point(24.1979, -5.31637, 0), color=Color.from_hex("#ffffff"), width=0.18)
add(3, 'point', Point(24.1979, -6.31637, 0), color=Color.from_hex("#ffffff"), width=0.18)
add(3, 'point', Point(24.1979, -7.31637, 0), color=Color.from_hex("#ffffff"), width=0.18)
add(3, 'point', Point(24.1979, -8.31637, 0), color=Color.from_hex("#ffffff"), width=0.18)
add(3, 'point', Point(24.1979, -9.31637, 0), color=Color.from_hex("#ffffff"), width=0.18)
add(3, 'point', Point(24.1979, -10.3164, 0), color=Color.from_hex("#ffffff"), width=0.18)
add(3, 'label', Point(24.5179, -0.196368, 0), text='a')
add(3, 'label', Point(24.5179, -1.19637, 0), text='b')
add(3, 'label', Point(24.5179, -2.19637, 0), text='c')
add(3, 'label', Point(24.5179, -3.19637, 0), text='d')
add(3, 'label', Point(24.5179, -4.19637, 0), text='e')
add(3, 'label', Point(24.5179, -5.19637, 0), text='f')
add(3, 'label', Point(24.5179, -6.19637, 0), text='g')
add(3, 'label', Point(24.5179, -7.19637, 0), text='h')
add(3, 'label', Point(24.5179, -8.19637, 0), text='i')
add(3, 'label', Point(24.5179, -9.19637, 0), text='j')
add(3, 'label', Point(24.5179, -10.1964, 0), text='k')

# step 4 — The resultant R
add(4, 'polyline', Polyline([(5, 2.17078, 0), (5, -17.67, 0)]), color=Color.from_hex("#111111"), dash=0.28)
add(4, 'arrow', Line((5, 2.17078, 0), (5, 0.770784, 0)), color=Color.from_hex("#3f9c20"), width=0.144, head=(0.396, 0.1728))
add(4, 'label', Point(5.68, 1.47078, 0), color=Color.from_hex("#3f9c20"), text='R')
add(4, 'arrow', Line((24.8585, -0.316368, 0), (24.8585, -10.3164, 0)), color=Color.from_hex("#3f9c20"), width=0.1872, head=(0.4464, 0.216))
add(4, 'label', Point(23.6979, -5.31637, 0), color=Color.from_hex("#3f9c20"), text='R')

# step 5 — Pole o′ at distance H
add(5, 'segment', Line((20.1979, -11.9309, 0), (24.1979, -11.9309, 0)), color=Color.from_hex("#ff0000"), width=0.108)
add(5, 'label', Point(22.1979, -12.4809, 0), color=Color.from_hex("#ff0000"), text='H')
add(5, 'polyline', Polyline([(24.1979, -11.9309, 0), (24.1979, -10.3164, 0)]), color=Color.from_hex("#111111"), dash=0.22)
add(5, 'polyline', Polyline([(20.1979, -5.11313, 0), (20.1979, -11.9309, 0)]), color=Color.from_hex("#111111"), dash=0.22)
add(5, 'label', Point(19.4479, -4.96313, 0), text='o′')
add(5, 'point', Point(24.1979, -11.9309, 0), color=Color.from_hex("#ffffff"), width=0.24)
add(5, 'point', Point(20.1979, -11.9309, 0), color=Color.from_hex("#ffffff"), width=0.18)
add(5, 'point', Point(20.1979, -5.11313, 0), color=Color.from_hex("#ffffff"), width=0.24)

# step 6 — Rays a…k → o′
add(6, 'segment', Line((24.1979, -0.316368, 0), (20.1979, -5.11313, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)
add(6, 'segment', Line((24.1979, -1.31637, 0), (20.1979, -5.11313, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)
add(6, 'segment', Line((24.1979, -2.31637, 0), (20.1979, -5.11313, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)
add(6, 'segment', Line((24.1979, -3.31637, 0), (20.1979, -5.11313, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)
add(6, 'segment', Line((24.1979, -4.31637, 0), (20.1979, -5.11313, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)
add(6, 'segment', Line((24.1979, -5.31637, 0), (20.1979, -5.11313, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)
add(6, 'segment', Line((24.1979, -6.31637, 0), (20.1979, -5.11313, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)
add(6, 'segment', Line((24.1979, -7.31637, 0), (20.1979, -5.11313, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)
add(6, 'segment', Line((24.1979, -8.31637, 0), (20.1979, -5.11313, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)
add(6, 'segment', Line((24.1979, -9.31637, 0), (20.1979, -5.11313, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)
add(6, 'segment', Line((24.1979, -10.3164, 0), (20.1979, -5.11313, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)

# step 7 — The funicular polygon
add(7, 'label', Point(-4.9, -4.6, 0), text='Trial Funicular')
add(7, 'label', Point(-4.9, -5.4, 0), text='Construction')
add(7, 'segment', Line((0, -5.60466, 0), (0.5, -5.00506, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)
add(7, 'segment', Line((0.5, -5.00506, 0), (1.5, -4.05587, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)
add(7, 'segment', Line((1.5, -4.05587, 0), (2.5, -3.35668, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)
add(7, 'segment', Line((2.5, -3.35668, 0), (3.5, -2.90749, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)
add(7, 'segment', Line((3.5, -2.90749, 0), (4.5, -2.7083, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)
add(7, 'segment', Line((4.5, -2.7083, 0), (5.5, -2.75911, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)
add(7, 'segment', Line((5.5, -2.75911, 0), (6.5, -3.05992, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)
add(7, 'segment', Line((6.5, -3.05992, 0), (7.5, -3.61074, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)
add(7, 'segment', Line((7.5, -3.61074, 0), (8.5, -4.41155, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)
add(7, 'segment', Line((8.5, -4.41155, 0), (9.5, -5.46235, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)
add(7, 'segment', Line((9.5, -5.46235, 0), (10, -6.11276, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)
add(7, 'label', Point(-0.85, -5.75466, 0), text='FP₀')
add(7, 'point', Point(0, -5.60466, 0), color=Color.from_hex("#ffffff"), width=0.24)
add(7, 'point', Point(10, -6.11276, 0), color=Color.from_hex("#ffffff"), width=0.18)

# step 8 — The closing line
add(8, 'segment', Line((0, -5.60466, 0), (2.83446, -2.2056, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)
add(8, 'polyline', Polyline([(2.83446, -2.2056, 0), (7.12682, -2.37529, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.5)
add(8, 'segment', Line((7.12682, -2.37529, 0), (10, -6.11276, 0)), color=Color.from_hex("#aaaaaa"), width=0.0612)

# step 9 — Division point l
add(9, 'polyline', Polyline([(20.1979, -5.11313, 0), (24.1979, -5.27126, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.5)
add(9, 'label', Point(23.6979, -4.93126, 0), text='l')
add(9, 'point', Point(24.1979, -5.27126, 0), color=Color.from_hex("#ffffff"), width=0.18)

# step 10 — Reactions A and B
add(10, 'arrow', Line((2.83446, -2.34223, 0), (2.83446, -0.942226, 0)), color=Color.from_hex("#3f9c20"), width=0.144, head=(0.396, 0.1728))
add(10, 'arrow', Line((7.12682, -2.34223, 0), (7.12682, -0.942226, 0)), color=Color.from_hex("#3f9c20"), width=0.144, head=(0.396, 0.1728))
add(10, 'label', Point(2.28446, -1.78223, 0), color=Color.from_hex("#3f9c20"), text='A')
add(10, 'label', Point(7.67682, -1.78223, 0), color=Color.from_hex("#3f9c20"), text='B')
add(10, 'arrow', Line((25.3979, -10.3164, 0), (25.3979, -5.27126, 0)), color=Color.from_hex("#3f9c20"), width=0.1872, head=(0.4464, 0.216))
add(10, 'arrow', Line((25.3979, -5.27126, 0), (25.3979, -0.316368, 0)), color=Color.from_hex("#3f9c20"), width=0.1872, head=(0.4464, 0.216))
add(10, 'label', Point(25.9479, -2.79381, 0), color=Color.from_hex("#3f9c20"), text='A')
add(10, 'label', Point(25.9479, -7.79381, 0), color=Color.from_hex("#3f9c20"), text='B')
add(10, 'polyline', Polyline([(24.1979, -0.316368, 0), (25.3979, -0.316368, 0)]), color=Color.from_hex("#3f9c20"), dash=0.3)
add(10, 'polyline', Polyline([(24.1979, -10.3164, 0), (25.3979, -10.3164, 0)]), color=Color.from_hex("#3f9c20"), dash=0.3)

# step 11 — V-diagram — the baseline
add(11, 'label', Point(-4.9, -9.5, 0), text='V - Diagram')
add(11, 'label', Point(-4.9, -10.3, 0), text='1 unit :: 1 kN')
add(11, 'segment', Line((0, -9.86361, 0), (10, -9.86361, 0)), color=Color.from_hex("#111111"), width=0.108)

# step 12 — V-diagram — overhang and jump A
add(12, 'segment', Line((0, -9.86361, 0), (2.83446, -10.7139, 0)), color=Color.from_hex("#ff0000"), width=0.108)
add(12, 'segment', Line((2.83446, -10.7139, 0), (2.83446, -9.22748, 0)), color=Color.from_hex("#ff0000"), width=0.108)

# step 13 — V-diagram — span and jump B
add(13, 'segment', Line((2.83446, -9.22748, 0), (7.12682, -10.5152, 0)), color=Color.from_hex("#ff0000"), width=0.108)
add(13, 'segment', Line((7.12682, -10.5152, 0), (7.12682, -9.00165, 0)), color=Color.from_hex("#ff0000"), width=0.108)
add(13, 'segment', Line((7.12682, -9.00165, 0), (10, -9.86361, 0)), color=Color.from_hex("#ff0000"), width=0.108)

# step 14 — M-diagram — the baseline
add(14, 'label', Point(-4.9, -14.5, 0), text='M - Diagram')
add(14, 'label', Point(-4.9, -15.3, 0), text='1 unit :: 1 kNm')
add(14, 'segment', Line((0, -15.3778, 0), (10, -15.3778, 0)), color=Color.from_hex("#111111"), width=0.108)

# step 15 — Ordinates y between funicular and closing
add(15, 'segment', Line((1.5, -3.80587, 0), (1.5, -4.05587, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(15, 'segment', Line((2.5, -2.60668, 0), (2.5, -3.35668, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(15, 'segment', Line((3.5, -2.23191, 0), (3.5, -2.90749, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(15, 'segment', Line((4.5, -2.27145, 0), (4.5, -2.7083, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(15, 'segment', Line((5.5, -2.31098, 0), (5.5, -2.75911, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(15, 'segment', Line((6.5, -2.35051, 0), (6.5, -3.05992, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(15, 'segment', Line((7.5, -2.86074, 0), (7.5, -3.61074, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(15, 'segment', Line((8.5, -4.16155, 0), (8.5, -4.41155, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(15, 'segment', Line((2.83446, -2.2056, 0), (2.83446, -3.20645, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)
add(15, 'segment', Line((7.12682, -2.37529, 0), (7.12682, -3.40518, 0)), color=Color.from_hex("#aaaaaa"), width=0.0504)

# step 16 — M = H · y
add(16, 'segment', Line((1.5, -15.3778, 0), (1.5, -15.0778, 0)), color=Color.from_hex("#ff0000"), width=0.0504)
add(16, 'segment', Line((2.5, -15.3778, 0), (2.5, -14.4778, 0)), color=Color.from_hex("#ff0000"), width=0.0504)
add(16, 'segment', Line((3.5, -15.3778, 0), (3.5, -14.5671, 0)), color=Color.from_hex("#ff0000"), width=0.0504)
add(16, 'segment', Line((4.5, -15.3778, 0), (4.5, -14.8536, 0)), color=Color.from_hex("#ff0000"), width=0.0504)
add(16, 'segment', Line((5.5, -15.3778, 0), (5.5, -14.8401, 0)), color=Color.from_hex("#ff0000"), width=0.0504)
add(16, 'segment', Line((6.5, -15.3778, 0), (6.5, -14.5265, 0)), color=Color.from_hex("#ff0000"), width=0.0504)
add(16, 'segment', Line((7.5, -15.3778, 0), (7.5, -14.4778, 0)), color=Color.from_hex("#ff0000"), width=0.0504)
add(16, 'segment', Line((8.5, -15.3778, 0), (8.5, -15.0778, 0)), color=Color.from_hex("#ff0000"), width=0.0504)
add(16, 'segment', Line((2.83446, -15.3778, 0), (2.83446, -14.1768, 0)), color=Color.from_hex("#ff0000"), width=0.0504)
add(16, 'segment', Line((7.12682, -15.3778, 0), (7.12682, -14.142, 0)), color=Color.from_hex("#ff0000"), width=0.0504)

# step 17 — The M-diagram
add(17, 'segment', Line((0, -15.3778, 0), (0.5, -15.3778, 0)), color=Color.from_hex("#ff0000"), width=0.108)
add(17, 'segment', Line((0.5, -15.3778, 0), (1.5, -15.0778, 0)), color=Color.from_hex("#ff0000"), width=0.108)
add(17, 'segment', Line((1.5, -15.0778, 0), (2.5, -14.4778, 0)), color=Color.from_hex("#ff0000"), width=0.108)
add(17, 'segment', Line((2.5, -14.4778, 0), (2.83446, -14.1768, 0)), color=Color.from_hex("#ff0000"), width=0.108)
add(17, 'segment', Line((2.83446, -14.1768, 0), (3.5, -14.5671, 0)), color=Color.from_hex("#ff0000"), width=0.108)
add(17, 'segment', Line((3.5, -14.5671, 0), (4.5, -14.8536, 0)), color=Color.from_hex("#ff0000"), width=0.108)
add(17, 'segment', Line((4.5, -14.8536, 0), (5.5, -14.8401, 0)), color=Color.from_hex("#ff0000"), width=0.108)
add(17, 'segment', Line((5.5, -14.8401, 0), (6.5, -14.5265, 0)), color=Color.from_hex("#ff0000"), width=0.108)
add(17, 'segment', Line((6.5, -14.5265, 0), (7.12682, -14.142, 0)), color=Color.from_hex("#ff0000"), width=0.108)
add(17, 'segment', Line((7.12682, -14.142, 0), (7.5, -14.4778, 0)), color=Color.from_hex("#ff0000"), width=0.108)
add(17, 'segment', Line((7.5, -14.4778, 0), (8.5, -15.0778, 0)), color=Color.from_hex("#ff0000"), width=0.108)
add(17, 'segment', Line((8.5, -15.0778, 0), (9.5, -15.3778, 0)), color=Color.from_hex("#ff0000"), width=0.108)
add(17, 'segment', Line((9.5, -15.3778, 0), (10, -15.3778, 0)), color=Color.from_hex("#ff0000"), width=0.108)

# step 18 — Internal forces from the funicular
add(18, 'label', Point(13.2, -8.6, 0), color=Color.from_hex("#3f9c20"), text='R = 3.0 kN')
add(18, 'label', Point(13.2, -9.6, 0), color=Color.from_hex("#3f9c20"), text='A = 1.49 kN')
add(18, 'label', Point(13.2, -10.6, 0), color=Color.from_hex("#3f9c20"), text='B = 1.51 kN')
add(18, 'label', Point(13.2, -11.6, 0), color=Color.from_hex("#ff0000"), text='H = 1.20 kN')
add(18, 'label', Point(13.2, -12.6, 0), color=Color.from_hex("#ff0000"), text='M(A) = -1.20 kNm')
add(18, 'label', Point(13.2, -13.6, 0), color=Color.from_hex("#ff0000"), text='M(B) = -1.24 kNm')


if __name__ == "__main__":
    print("Drawing 47 — Internal forces in a beam: line load —", len(ops), "operations")
