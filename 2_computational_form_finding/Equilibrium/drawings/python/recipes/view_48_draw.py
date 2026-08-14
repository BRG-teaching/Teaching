"""Drawing 48 — Internal forces in a beam: superposition

Auto-generated from ops/view_48.json — the drawing as literal COMPAS
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


# step 1 — The beam
add(1, 'label', Point(-3.7, 3.3, 0), text='Form Diagram')
add(1, 'label', Point(-3.7, 2.6, 0), text='1 unit :: 1 m')
add(1, 'segment', Line((0, 0, 0), (10, 0, 0)), color=Color.from_hex("#111111"), width=0.0936)
add(1, 'polyline', Polyline([(0, 1.30032, 0), (0, -13.555, 0)]), color=Color.from_hex("#111111"), dash=0.25)
add(1, 'polyline', Polyline([(10, 1.30032, 0), (10, -13.555, 0)]), color=Color.from_hex("#111111"), dash=0.25)
add(1, 'segment', Line((0, -1.45463, 0), (10, -1.45463, 0)), color=Color.from_hex("#aaaaaa"), width=0.0324)
add(1, 'segment', Line((-0.18, -1.63463, 0), (0.18, -1.27463, 0)), color=Color.from_hex("#aaaaaa"), width=0.0324)
add(1, 'segment', Line((-0.18, -1.27463, 0), (0.18, -1.63463, 0)), color=Color.from_hex("#aaaaaa"), width=0.0324)
add(1, 'segment', Line((9.82, -1.63463, 0), (10.18, -1.27463, 0)), color=Color.from_hex("#aaaaaa"), width=0.0324)
add(1, 'segment', Line((9.82, -1.27463, 0), (10.18, -1.63463, 0)), color=Color.from_hex("#aaaaaa"), width=0.0324)
add(1, 'label', Point(5, -1.00463, 0), color=Color.from_hex("#aaaaaa"), text='l = 10')
add(1, 'point', Point(0, 0, 0), color=Color.from_hex("#ffffff"), width=0.2)
add(1, 'point', Point(10, 0, 0), color=Color.from_hex("#ffffff"), width=0.2)

# step 2 — The line load q
add(2, 'label', Point(20.7, 3.3, 0), text='q = 0.2 kN / m')
add(2, 'polygon', Polygon([(0, 2.49944, 0), (0, 1.95551, 0), (10, 1.95551, 0), (10, 2.49944, 0)]), color=Color.from_hex("#3f9c20"), opacity=0.16)
add(2, 'segment', Line((0, 2.49944, 0), (10, 2.49944, 0)), color=Color.from_hex("#3f9c20"), width=0.036)
add(2, 'segment', Line((10, 2.49944, 0), (10, 1.95551, 0)), color=Color.from_hex("#3f9c20"), width=0.036)
add(2, 'segment', Line((10, 1.95551, 0), (0, 1.95551, 0)), color=Color.from_hex("#3f9c20"), width=0.036)
add(2, 'segment', Line((0, 1.95551, 0), (0, 2.49944, 0)), color=Color.from_hex("#3f9c20"), width=0.036)
add(2, 'label', Point(-0.55, 2.22748, 0), color=Color.from_hex("#3f9c20"), text='q')
add(2, 'polyline', Polyline([(0.5, 1.30032, 0), (0.5, -13.555, 0)]), color=Color.from_hex("#111111"), dash=0.2)
add(2, 'polyline', Polyline([(1.5, 1.30032, 0), (1.5, -13.555, 0)]), color=Color.from_hex("#111111"), dash=0.2)
add(2, 'polyline', Polyline([(2.5, 1.30032, 0), (2.5, -13.555, 0)]), color=Color.from_hex("#111111"), dash=0.2)
add(2, 'polyline', Polyline([(3.5, 1.30032, 0), (3.5, -13.555, 0)]), color=Color.from_hex("#111111"), dash=0.2)
add(2, 'polyline', Polyline([(4.5, 1.30032, 0), (4.5, -13.555, 0)]), color=Color.from_hex("#111111"), dash=0.2)
add(2, 'polyline', Polyline([(5.5, 1.30032, 0), (5.5, -13.555, 0)]), color=Color.from_hex("#111111"), dash=0.2)
add(2, 'polyline', Polyline([(6.5, 1.30032, 0), (6.5, -13.555, 0)]), color=Color.from_hex("#111111"), dash=0.2)
add(2, 'polyline', Polyline([(7.5, 1.30032, 0), (7.5, -13.555, 0)]), color=Color.from_hex("#111111"), dash=0.2)
add(2, 'polyline', Polyline([(8.5, 1.30032, 0), (8.5, -13.555, 0)]), color=Color.from_hex("#111111"), dash=0.2)
add(2, 'polyline', Polyline([(9.5, 1.30032, 0), (9.5, -13.555, 0)]), color=Color.from_hex("#111111"), dash=0.2)

# step 3 — Two point loads
add(3, 'arrow', Line((0.5, 3.49944, 0), (0.5, 2.49944, 0)), color=Color.from_hex("#3f9c20"), width=0.1224, head=(0.3456, 0.1512))
add(3, 'arrow', Line((9.5, 3.49944, 0), (9.5, 2.49944, 0)), color=Color.from_hex("#3f9c20"), width=0.1224, head=(0.3456, 0.1512))
add(3, 'label', Point(-0.05, 3.29944, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(3, 'label', Point(10.05, 3.29944, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(3, 'polyline', Polyline([(0.5, 3.49944, 0), (0.5, -13.555, 0)]), color=Color.from_hex("#111111"), dash=0.25)
add(3, 'polyline', Polyline([(9.5, 3.49944, 0), (9.5, -13.555, 0)]), color=Color.from_hex("#111111"), dash=0.25)
add(3, 'point', Point(0.5, 2.49944, 0), color=Color.from_hex("#ffffff"), width=0.2)
add(3, 'point', Point(9.5, 2.49944, 0), color=Color.from_hex("#ffffff"), width=0.2)

# step 4 — Superposition on the load line
add(4, 'label', Point(15.2, 3.3, 0), text='Force Diagram')
add(4, 'label', Point(15.2, 2.6, 0), text='1 unit :: 0.3 kN')
add(4, 'arrow', Line((18.5589, 1.29854, 0), (18.5589, -6.70146, 0)), color=Color.from_hex("#3f9c20"), width=0.144, head=(0.396, 0.18))
add(4, 'label', Point(18.0589, -2.15146, 0), color=Color.from_hex("#3f9c20"), text='R')
add(4, 'label', Point(17.5089, 0.63187, 0), color=Color.from_hex("#3f9c20"), text='q+F₁')
add(4, 'label', Point(17.5089, -6.0348, 0), color=Color.from_hex("#3f9c20"), text='q+F₂')
add(4, 'point', Point(18.5589, 1.29854, 0), color=Color.from_hex("#ffffff"), width=0.15)
add(4, 'point', Point(18.5589, -0.034796, 0), color=Color.from_hex("#ffffff"), width=0.15)
add(4, 'point', Point(18.5589, -0.701463, 0), color=Color.from_hex("#ffffff"), width=0.15)
add(4, 'point', Point(18.5589, -1.36813, 0), color=Color.from_hex("#ffffff"), width=0.15)
add(4, 'point', Point(18.5589, -2.0348, 0), color=Color.from_hex("#ffffff"), width=0.15)
add(4, 'point', Point(18.5589, -2.70146, 0), color=Color.from_hex("#ffffff"), width=0.15)
add(4, 'point', Point(18.5589, -3.36813, 0), color=Color.from_hex("#ffffff"), width=0.15)
add(4, 'point', Point(18.5589, -4.0348, 0), color=Color.from_hex("#ffffff"), width=0.15)
add(4, 'point', Point(18.5589, -4.70146, 0), color=Color.from_hex("#ffffff"), width=0.15)
add(4, 'point', Point(18.5589, -5.36813, 0), color=Color.from_hex("#ffffff"), width=0.15)
add(4, 'point', Point(18.5589, -6.70146, 0), color=Color.from_hex("#ffffff"), width=0.15)
add(4, 'label', Point(18.8189, 1.41854, 0), text='a')
add(4, 'label', Point(18.8189, 0.085204, 0), text='b')
add(4, 'label', Point(18.8189, -0.581463, 0), text='c')
add(4, 'label', Point(18.8189, -1.24813, 0), text='d')
add(4, 'label', Point(18.8189, -1.9148, 0), text='e')
add(4, 'label', Point(18.8189, -2.58146, 0), text='f')
add(4, 'label', Point(18.8189, -3.24813, 0), text='g')
add(4, 'label', Point(18.8189, -3.9148, 0), text='h')
add(4, 'label', Point(18.8189, -4.58146, 0), text='i')
add(4, 'label', Point(18.8189, -5.24813, 0), text='j')
add(4, 'label', Point(18.8189, -6.58146, 0), text='k')

# step 5 — Trial pole o′ at distance H
add(5, 'segment', Line((18.5589, -7.39561, 0), (14.5589, -7.39561, 0)), color=Color.from_hex("#ff0000"), width=0.0936)
add(5, 'label', Point(16.5589, -7.89561, 0), color=Color.from_hex("#ff0000"), text='H')
add(5, 'polyline', Polyline([(18.5589, -6.70146, 0), (18.5589, -7.39561, 0)]), color=Color.from_hex("#111111"), dash=0.25)
add(5, 'polyline', Polyline([(14.5589, -2.73226, 0), (14.5589, -7.39561, 0)]), color=Color.from_hex("#111111"), dash=0.25)
add(5, 'label', Point(13.8589, -2.58226, 0), text='o′')
add(5, 'point', Point(14.5589, -2.73226, 0), color=Color.from_hex("#ffffff"), width=0.2)
add(5, 'point', Point(18.5589, -7.39561, 0), color=Color.from_hex("#ffffff"), width=0.2)

# step 6 — Rays a…k → o′
add(6, 'segment', Line((18.5589, 1.29854, 0), (14.5589, -2.73226, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(6, 'segment', Line((18.5589, -0.034796, 0), (14.5589, -2.73226, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(6, 'segment', Line((18.5589, -0.701463, 0), (14.5589, -2.73226, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(6, 'segment', Line((18.5589, -1.36813, 0), (14.5589, -2.73226, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(6, 'segment', Line((18.5589, -2.0348, 0), (14.5589, -2.73226, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(6, 'segment', Line((18.5589, -2.70146, 0), (14.5589, -2.73226, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(6, 'segment', Line((18.5589, -3.36813, 0), (14.5589, -2.73226, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(6, 'segment', Line((18.5589, -4.0348, 0), (14.5589, -2.73226, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(6, 'segment', Line((18.5589, -4.70146, 0), (14.5589, -2.73226, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(6, 'segment', Line((18.5589, -5.36813, 0), (14.5589, -2.73226, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(6, 'segment', Line((18.5589, -6.70146, 0), (14.5589, -2.73226, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)

# step 7 — The trial funicular
add(7, 'label', Point(-3.7, -3.6, 0), text='Trial Funicular')
add(7, 'label', Point(-3.7, -4.3, 0), text='Construction')
add(7, 'segment', Line((0, -4.14454, 0), (0.5, -3.64069, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(7, 'segment', Line((0.5, -3.64069, 0), (1.5, -2.96633, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(7, 'segment', Line((1.5, -2.96633, 0), (2.5, -2.45863, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(7, 'segment', Line((2.5, -2.45863, 0), (3.5, -2.11759, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(7, 'segment', Line((3.5, -2.11759, 0), (4.5, -1.94323, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(7, 'segment', Line((4.5, -1.94323, 0), (5.5, -1.93553, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(7, 'segment', Line((5.5, -1.93553, 0), (6.5, -2.09449, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(7, 'segment', Line((6.5, -2.09449, 0), (7.5, -2.42013, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(7, 'segment', Line((7.5, -2.42013, 0), (8.5, -2.91242, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(7, 'segment', Line((8.5, -2.91242, 0), (9.5, -3.57139, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(7, 'segment', Line((9.5, -3.57139, 0), (10, -4.06754, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(7, 'label', Point(-0.8, -4.29454, 0), text='FP₀')
add(7, 'point', Point(0, -4.14454, 0), color=Color.from_hex("#ffffff"), width=0.2)
add(7, 'point', Point(10, -4.06754, 0), color=Color.from_hex("#ffffff"), width=0.15)

# step 8 — Closing the trial → R
add(8, 'polyline', Polyline([(0, -4.14454, 0), (10, -4.06754, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.5)
add(8, 'arrow', Line((5, 1.30032, 0), (5, 0.300325, 0)), color=Color.from_hex("#3f9c20"), width=0.1224, head=(0.3456, 0.1512))
add(8, 'label', Point(5.55, 0.650325, 0), color=Color.from_hex("#3f9c20"), text='R')
add(8, 'polyline', Polyline([(5, 1.30032, 0), (5, -13.555, 0)]), color=Color.from_hex("#111111"), dash=0.2)

# step 9 — Division point l
add(9, 'polyline', Polyline([(14.5589, -2.73226, 0), (18.5589, -2.70146, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.5)
add(9, 'label', Point(18.1089, -2.36146, 0), text='l')
add(9, 'point', Point(18.5589, -2.70146, 0), color=Color.from_hex("#ffffff"), width=0.15)

# step 10 — Reactions A and B
add(10, 'arrow', Line((0, -1, 0), (0, 0, 0)), color=Color.from_hex("#3f9c20"), width=0.1224, head=(0.3456, 0.1512))
add(10, 'arrow', Line((10, -1, 0), (10, 0, 0)), color=Color.from_hex("#3f9c20"), width=0.1224, head=(0.3456, 0.1512))
add(10, 'label', Point(-0.55, -0.6, 0), color=Color.from_hex("#3f9c20"), text='A')
add(10, 'label', Point(10.55, -0.6, 0), color=Color.from_hex("#3f9c20"), text='B')
add(10, 'arrow', Line((19.0589, -6.70146, 0), (19.0589, -2.70146, 0)), color=Color.from_hex("#3f9c20"), width=0.1224, head=(0.3456, 0.1512))
add(10, 'arrow', Line((19.0589, -2.70146, 0), (19.0589, 1.29854, 0)), color=Color.from_hex("#3f9c20"), width=0.1224, head=(0.3456, 0.1512))
add(10, 'label', Point(19.5589, -0.701463, 0), color=Color.from_hex("#3f9c20"), text='A')
add(10, 'label', Point(19.5589, -4.70146, 0), color=Color.from_hex("#3f9c20"), text='B')
add(10, 'polyline', Polyline([(18.5589, 1.29854, 0), (19.0589, 1.29854, 0)]), color=Color.from_hex("#111111"), dash=0.2)
add(10, 'polyline', Polyline([(18.5589, -2.70146, 0), (19.0589, -2.70146, 0)]), color=Color.from_hex("#111111"), dash=0.2)
add(10, 'polyline', Polyline([(18.5589, -6.70146, 0), (19.0589, -6.70146, 0)]), color=Color.from_hex("#111111"), dash=0.2)

# step 11 — V-diagram — the baseline
add(11, 'label', Point(-3.7, -6.6, 0), text='V Diagram')
add(11, 'label', Point(-3.7, -7.3, 0), text='1 unit :: 1 kN')
add(11, 'segment', Line((0, -6.93851, 0), (10, -6.93851, 0)), color=Color.from_hex("#111111"), width=0.0936)
add(11, 'point', Point(0, -6.93851, 0), color=Color.from_hex("#ffffff"), width=0.2)

# step 12 — V-diagram — jump A, slope −q, drop F₁
add(12, 'segment', Line((0, -6.93851, 0), (0, -5.73851, 0)), color=Color.from_hex("#ff0000"), width=0.0936)
add(12, 'segment', Line((0, -5.73851, 0), (0.5, -5.83851, 0)), color=Color.from_hex("#ff0000"), width=0.0936)
add(12, 'segment', Line((0.5, -5.83851, 0), (0.5, -6.03851, 0)), color=Color.from_hex("#ff0000"), width=0.0936)

# step 13 — V-diagram — drop F₂, close with B
add(13, 'segment', Line((0.5, -6.03851, 0), (9.5, -7.83851, 0)), color=Color.from_hex("#ff0000"), width=0.0936)
add(13, 'segment', Line((9.5, -7.83851, 0), (9.5, -8.03851, 0)), color=Color.from_hex("#ff0000"), width=0.0936)
add(13, 'segment', Line((9.5, -8.03851, 0), (10, -8.13851, 0)), color=Color.from_hex("#ff0000"), width=0.0936)
add(13, 'segment', Line((10, -8.13851, 0), (10, -6.93851, 0)), color=Color.from_hex("#ff0000"), width=0.0936)

# step 14 — The mirror pole o
add(14, 'polyline', Polyline([(18.5589, -2.70146, 0), (22.5589, -2.70146, 0)]), color=Color.from_hex("#111111"), dash=0.45)
add(14, 'segment', Line((18.5589, -7.39561, 0), (22.5589, -7.39561, 0)), color=Color.from_hex("#ff0000"), width=0.0936)
add(14, 'label', Point(20.5589, -7.89561, 0), color=Color.from_hex("#ff0000"), text='H')
add(14, 'polyline', Polyline([(22.5589, -2.70146, 0), (22.5589, -7.39561, 0)]), color=Color.from_hex("#111111"), dash=0.25)
add(14, 'label', Point(23.1089, -2.40146, 0), text='o')
add(14, 'point', Point(22.5589, -2.70146, 0), color=Color.from_hex("#ffffff"), width=0.15)

# step 15 — M-diagram — the baseline
add(15, 'label', Point(-3.7, -10.1, 0), text='M Diagram')
add(15, 'label', Point(-3.7, -10.8, 0), text='1 unit :: 1 kNm')
add(15, 'segment', Line((0, -10, 0), (10, -10, 0)), color=Color.from_hex("#111111"), width=0.0936)
add(15, 'point', Point(0, -10, 0), color=Color.from_hex("#ffffff"), width=0.2)

# step 16 — The moment funicular
add(16, 'segment', Line((18.5589, 1.29854, 0), (22.5589, -2.70146, 0)), color=Color.from_hex("#111111"), width=0.036)
add(16, 'segment', Line((18.5589, -0.034796, 0), (22.5589, -2.70146, 0)), color=Color.from_hex("#111111"), width=0.036)
add(16, 'segment', Line((18.5589, -0.701463, 0), (22.5589, -2.70146, 0)), color=Color.from_hex("#111111"), width=0.036)
add(16, 'segment', Line((18.5589, -1.36813, 0), (22.5589, -2.70146, 0)), color=Color.from_hex("#111111"), width=0.036)
add(16, 'segment', Line((18.5589, -2.0348, 0), (22.5589, -2.70146, 0)), color=Color.from_hex("#111111"), width=0.036)
add(16, 'segment', Line((18.5589, -2.70146, 0), (22.5589, -2.70146, 0)), color=Color.from_hex("#111111"), width=0.036)
add(16, 'segment', Line((18.5589, -3.36813, 0), (22.5589, -2.70146, 0)), color=Color.from_hex("#111111"), width=0.036)
add(16, 'segment', Line((18.5589, -4.0348, 0), (22.5589, -2.70146, 0)), color=Color.from_hex("#111111"), width=0.036)
add(16, 'segment', Line((18.5589, -4.70146, 0), (22.5589, -2.70146, 0)), color=Color.from_hex("#111111"), width=0.036)
add(16, 'segment', Line((18.5589, -5.36813, 0), (22.5589, -2.70146, 0)), color=Color.from_hex("#111111"), width=0.036)
add(16, 'segment', Line((18.5589, -6.70146, 0), (22.5589, -2.70146, 0)), color=Color.from_hex("#111111"), width=0.036)
add(16, 'segment', Line((0, -10, 0), (0.5, -10.5, 0)), color=Color.from_hex("#111111"), width=0.0648)
add(16, 'segment', Line((0.5, -10.5, 0), (1.5, -11.1667, 0)), color=Color.from_hex("#111111"), width=0.0648)
add(16, 'segment', Line((1.5, -11.1667, 0), (2.5, -11.6667, 0)), color=Color.from_hex("#111111"), width=0.0648)
add(16, 'segment', Line((2.5, -11.6667, 0), (3.5, -12, 0)), color=Color.from_hex("#111111"), width=0.0648)
add(16, 'segment', Line((3.5, -12, 0), (4.5, -12.1667, 0)), color=Color.from_hex("#111111"), width=0.0648)
add(16, 'segment', Line((4.5, -12.1667, 0), (5.5, -12.1667, 0)), color=Color.from_hex("#111111"), width=0.0648)
add(16, 'segment', Line((5.5, -12.1667, 0), (6.5, -12, 0)), color=Color.from_hex("#111111"), width=0.0648)
add(16, 'segment', Line((6.5, -12, 0), (7.5, -11.6667, 0)), color=Color.from_hex("#111111"), width=0.0648)
add(16, 'segment', Line((7.5, -11.6667, 0), (8.5, -11.1667, 0)), color=Color.from_hex("#111111"), width=0.0648)
add(16, 'segment', Line((8.5, -11.1667, 0), (9.5, -10.5, 0)), color=Color.from_hex("#111111"), width=0.0648)
add(16, 'segment', Line((9.5, -10.5, 0), (10, -10, 0)), color=Color.from_hex("#111111"), width=0.0648)
add(16, 'polyline', Polyline([(0, -10, 0), (10, -10, 0)]), color=Color.from_hex("#111111"), dash=0.45)

# step 17 — Ordinates y on the trial
add(17, 'segment', Line((0.5, -4.14069, 0), (0.5, -3.64069, 0)), color=Color.from_hex("#aaaaaa"), width=0.0432)
add(17, 'segment', Line((1.5, -4.13299, 0), (1.5, -2.96633, 0)), color=Color.from_hex("#aaaaaa"), width=0.0432)
add(17, 'segment', Line((2.5, -4.12529, 0), (2.5, -2.45863, 0)), color=Color.from_hex("#aaaaaa"), width=0.0432)
add(17, 'segment', Line((3.5, -4.11759, 0), (3.5, -2.11759, 0)), color=Color.from_hex("#aaaaaa"), width=0.0432)
add(17, 'segment', Line((4.5, -4.10989, 0), (4.5, -1.94323, 0)), color=Color.from_hex("#aaaaaa"), width=0.0432)
add(17, 'segment', Line((5.5, -4.10219, 0), (5.5, -1.93553, 0)), color=Color.from_hex("#aaaaaa"), width=0.0432)
add(17, 'segment', Line((6.5, -4.09449, 0), (6.5, -2.09449, 0)), color=Color.from_hex("#aaaaaa"), width=0.0432)
add(17, 'segment', Line((7.5, -4.08679, 0), (7.5, -2.42013, 0)), color=Color.from_hex("#aaaaaa"), width=0.0432)
add(17, 'segment', Line((8.5, -4.07909, 0), (8.5, -2.91242, 0)), color=Color.from_hex("#aaaaaa"), width=0.0432)
add(17, 'segment', Line((9.5, -4.07139, 0), (9.5, -3.57139, 0)), color=Color.from_hex("#aaaaaa"), width=0.0432)

# step 18 — M = H · y
add(18, 'segment', Line((0.5, -10, 0), (0.5, -10.6, 0)), color=Color.from_hex("#ff0000"), width=0.0432)
add(18, 'segment', Line((1.5, -10, 0), (1.5, -11.4, 0)), color=Color.from_hex("#ff0000"), width=0.0432)
add(18, 'segment', Line((2.5, -10, 0), (2.5, -12, 0)), color=Color.from_hex("#ff0000"), width=0.0432)
add(18, 'segment', Line((3.5, -10, 0), (3.5, -12.4, 0)), color=Color.from_hex("#ff0000"), width=0.0432)
add(18, 'segment', Line((4.5, -10, 0), (4.5, -12.6, 0)), color=Color.from_hex("#ff0000"), width=0.0432)
add(18, 'segment', Line((5.5, -10, 0), (5.5, -12.6, 0)), color=Color.from_hex("#ff0000"), width=0.0432)
add(18, 'segment', Line((6.5, -10, 0), (6.5, -12.4, 0)), color=Color.from_hex("#ff0000"), width=0.0432)
add(18, 'segment', Line((7.5, -10, 0), (7.5, -12, 0)), color=Color.from_hex("#ff0000"), width=0.0432)
add(18, 'segment', Line((8.5, -10, 0), (8.5, -11.4, 0)), color=Color.from_hex("#ff0000"), width=0.0432)
add(18, 'segment', Line((9.5, -10, 0), (9.5, -10.6, 0)), color=Color.from_hex("#ff0000"), width=0.0432)
add(18, 'segment', Line((0, -10, 0), (0.5, -10.6, 0)), color=Color.from_hex("#ff0000"), width=0.0936)
add(18, 'segment', Line((0.5, -10.6, 0), (1.5, -11.4, 0)), color=Color.from_hex("#ff0000"), width=0.0936)
add(18, 'segment', Line((1.5, -11.4, 0), (2.5, -12, 0)), color=Color.from_hex("#ff0000"), width=0.0936)
add(18, 'segment', Line((2.5, -12, 0), (3.5, -12.4, 0)), color=Color.from_hex("#ff0000"), width=0.0936)
add(18, 'segment', Line((3.5, -12.4, 0), (4.5, -12.6, 0)), color=Color.from_hex("#ff0000"), width=0.0936)
add(18, 'segment', Line((4.5, -12.6, 0), (5.5, -12.6, 0)), color=Color.from_hex("#ff0000"), width=0.0936)
add(18, 'segment', Line((5.5, -12.6, 0), (6.5, -12.4, 0)), color=Color.from_hex("#ff0000"), width=0.0936)
add(18, 'segment', Line((6.5, -12.4, 0), (7.5, -12, 0)), color=Color.from_hex("#ff0000"), width=0.0936)
add(18, 'segment', Line((7.5, -12, 0), (8.5, -11.4, 0)), color=Color.from_hex("#ff0000"), width=0.0936)
add(18, 'segment', Line((8.5, -11.4, 0), (9.5, -10.6, 0)), color=Color.from_hex("#ff0000"), width=0.0936)
add(18, 'segment', Line((9.5, -10.6, 0), (10, -10, 0)), color=Color.from_hex("#ff0000"), width=0.0936)

# step 19 — Superposition
add(19, 'label', Point(12.6, -6.4, 0), color=Color.from_hex("#3f9c20"), text='R = 2.40 kN')
add(19, 'label', Point(12.6, -7.3, 0), color=Color.from_hex("#3f9c20"), text='A = 1.20 kN')
add(19, 'label', Point(12.6, -8.2, 0), color=Color.from_hex("#3f9c20"), text='B = 1.20 kN')
add(19, 'label', Point(12.6, -9.1, 0), color=Color.from_hex("#ff0000"), text='H = 1.20 kN')
add(19, 'label', Point(12.6, -10, 0), color=Color.from_hex("#ff0000"), text='M(F₁) = 0.60 kNm')
add(19, 'label', Point(12.6, -10.9, 0), color=Color.from_hex("#ff0000"), text='M(F₂) = 0.60 kNm')


if __name__ == "__main__":
    print("Drawing 48 — Internal forces in a beam: superposition —", len(ops), "operations")
