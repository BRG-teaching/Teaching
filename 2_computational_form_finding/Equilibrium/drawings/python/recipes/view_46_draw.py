"""Drawing 46 — Internal forces in a beam: point load

Auto-generated from ops/view_46.json — the drawing as literal COMPAS
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
add(1, 'label', Point(-4.6, 0.85, 0), text='Form Diagram')
add(1, 'label', Point(-4.6, 0.05, 0), text='1 unit :: 1 m')
add(1, 'segment', Line((0, 0, 0), (9.90549, 0, 0)), color=Color.from_hex("#111111"), width=0.1152)
add(1, 'polyline', Polyline([(0, 1.9687, 0), (0, -18.589, 0)]), color=Color.from_hex("#111111"), dash=0.28)
add(1, 'polyline', Polyline([(9.90549, 1.9687, 0), (9.90549, -18.589, 0)]), color=Color.from_hex("#111111"), dash=0.28)
add(1, 'label', Point(-0.65, 0.4, 0), text='A')
add(1, 'label', Point(10.5555, 0.4, 0), text='B')
add(1, 'point', Point(0, 0, 0), color=Color.from_hex("#ffffff"), width=0.28)
add(1, 'point', Point(9.90549, 0, 0), color=Color.from_hex("#ffffff"), width=0.28)

# step 2 — The load — in both diagrams
add(2, 'label', Point(17, 0.85, 0), text='Force Diagram')
add(2, 'label', Point(17, 0.05, 0), text='1 unit :: 0.5 kN')
add(2, 'polyline', Polyline([(4.8676, 1.9687, 0), (4.8676, -18.589, 0)]), color=Color.from_hex("#111111"), dash=0.28)
add(2, 'arrow', Line((4.8676, 1.3, 0), (4.8676, 0, 0)), color=Color.from_hex("#3f9c20"), width=0.1584, head=(0.432, 0.1872))
add(2, 'label', Point(5.3676, 1.014, 0), color=Color.from_hex("#3f9c20"), text='F')
add(2, 'arrow', Line((18.9807, -4.60884, 0), (18.9807, -8.60884, 0)), color=Color.from_hex("#3f9c20"), width=0.1584, head=(0.432, 0.1872))
add(2, 'label', Point(18.4307, -7.62603, 0), color=Color.from_hex("#3f9c20"), text='F')
add(2, 'label', Point(5.4176, -0.5, 0), text='C')
add(2, 'label', Point(19.5307, -4.25884, 0), text='a')
add(2, 'label', Point(18.5807, -9.22884, 0), text='b')
add(2, 'point', Point(4.8676, 0, 0), color=Color.from_hex("#ffffff"), width=0.28)
add(2, 'point', Point(18.9807, -4.60884, 0), color=Color.from_hex("#ffffff"), width=0.28)
add(2, 'point', Point(18.9807, -8.60884, 0), color=Color.from_hex("#ffffff"), width=0.21)

# step 3 — Trial pole o′
add(3, 'segment', Line((18.9807, -4.60884, 0), (24.8125, -6.8175, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(3, 'segment', Line((24.8125, -6.8175, 0), (18.9807, -8.60884, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(3, 'label', Point(25.5125, -6.5675, 0), text='o′')
add(3, 'point', Point(24.8125, -6.8175, 0), color=Color.from_hex("#ffffff"), width=0.28)

# step 4 — Trial string 1
add(4, 'label', Point(-4.6, -3.15, 0), text='Trial Funicular')
add(4, 'label', Point(-4.6, -3.95, 0), text='Construction')
add(4, 'segment', Line((0, -2.07184, 0), (4.8676, -3.91535, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(4, 'label', Point(-0.65, -1.97184, 0), text='D')
add(4, 'point', Point(0, -2.07184, 0), color=Color.from_hex("#ffffff"), width=0.28)
add(4, 'point', Point(4.8676, -3.91535, 0), color=Color.from_hex("#ffffff"), width=0.21)

# step 5 — Trial string 2
add(5, 'segment', Line((4.8676, -3.91535, 0), (9.90549, -2.36786, 0)), color=Color.from_hex("#aaaaaa"), width=0.0648)
add(5, 'point', Point(9.90549, -2.36786, 0), color=Color.from_hex("#ffffff"), width=0.21)

# step 6 — Closing the trial → point c
add(6, 'polyline', Polyline([(9.90549, -2.36786, 0), (0, -2.07184, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.5)
add(6, 'polyline', Polyline([(24.8125, -6.8175, 0), (18.9807, -6.64323, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.5)
add(6, 'label', Point(5.52437, -2.88502, 0), color=Color.from_hex("#aaaaaa"), text='O′')
add(6, 'label', Point(18.4307, -6.22323, 0), text='c')
add(6, 'point', Point(18.9807, -6.64323, 0), color=Color.from_hex("#ffffff"), width=0.21)

# step 7 — Reactions A_V and B_V
add(7, 'arrow', Line((0, -1.3, 0), (0, 0, 0)), color=Color.from_hex("#3f9c20"), width=0.1584, head=(0.432, 0.1872))
add(7, 'arrow', Line((9.90549, -1.3, 0), (9.90549, 0, 0)), color=Color.from_hex("#3f9c20"), width=0.1584, head=(0.432, 0.1872))
add(7, 'label', Point(-0.85, -0.936, 0), color=Color.from_hex("#3f9c20"), text='A_V')
add(7, 'label', Point(10.7555, -0.936, 0), color=Color.from_hex("#3f9c20"), text='B_V')
add(7, 'arrow', Line((19.4807, -8.60884, 0), (19.4807, -6.64323, 0)), color=Color.from_hex("#3f9c20"), width=0.1584, head=(0.432, 0.1872))
add(7, 'arrow', Line((19.4807, -6.64323, 0), (19.4807, -4.60884, 0)), color=Color.from_hex("#3f9c20"), width=0.1584, head=(0.432, 0.1872))
add(7, 'label', Point(20.0807, -7.62603, 0), color=Color.from_hex("#3f9c20"), text='B_V')
add(7, 'label', Point(20.0807, -5.62603, 0), color=Color.from_hex("#3f9c20"), text='A_V')
add(7, 'polyline', Polyline([(18.9807, -4.60884, 0), (19.4807, -4.60884, 0)]), color=Color.from_hex("#3f9c20"), dash=0.3)
add(7, 'polyline', Polyline([(18.9807, -8.60884, 0), (19.4807, -8.60884, 0)]), color=Color.from_hex("#3f9c20"), dash=0.3)
add(7, 'polyline', Polyline([(18.9807, -6.64323, 0), (19.4807, -6.64323, 0)]), color=Color.from_hex("#3f9c20"), dash=0.3)

# step 8 — V-diagram — the baseline
add(8, 'label', Point(-4.6, -7.65, 0), text='V - Diagram')
add(8, 'label', Point(-4.6, -8.45, 0), text='1 unit :: 1 kN')
add(8, 'segment', Line((0, -6.64323, 0), (9.90549, -6.64323, 0)), color=Color.from_hex("#111111"), width=0.1152)

# step 9 — V-diagram — left of the load
add(9, 'segment', Line((0, -6.64323, 0), (0, -4.60884, 0)), color=Color.from_hex("#ff0000"), width=0.1152)
add(9, 'segment', Line((0, -4.60884, 0), (4.8676, -4.60884, 0)), color=Color.from_hex("#ff0000"), width=0.1152)
add(9, 'polyline', Polyline([(4.8676, -4.60884, 0), (18.9807, -4.60884, 0)]), color=Color.from_hex("#111111"), dash=0.28)

# step 10 — V-diagram — right of the load
add(10, 'segment', Line((4.8676, -4.60884, 0), (4.8676, -8.60884, 0)), color=Color.from_hex("#ff0000"), width=0.1152)
add(10, 'segment', Line((4.8676, -8.60884, 0), (9.90549, -8.60884, 0)), color=Color.from_hex("#ff0000"), width=0.1152)
add(10, 'segment', Line((9.90549, -8.60884, 0), (9.90549, -6.64323, 0)), color=Color.from_hex("#ff0000"), width=0.1152)
add(10, 'polyline', Polyline([(18.9807, -8.60884, 0), (9.90549, -8.60884, 0)]), color=Color.from_hex("#111111"), dash=0.28)

# step 11 — Pole distance H
add(11, 'segment', Line((18.9807, -8.60884, 0), (15.9807, -8.60884, 0)), color=Color.from_hex("#ff0000"), width=0.1152)
add(11, 'label', Point(17.4807, -9.10884, 0), color=Color.from_hex("#ff0000"), text='H')
add(11, 'point', Point(15.9807, -8.60884, 0), color=Color.from_hex("#ffffff"), width=0.21)

# step 12 — The pole o
add(12, 'polyline', Polyline([(15.9807, -8.60884, 0), (15.9807, -6.64323, 0)]), color=Color.from_hex("#111111"), dash=0.28)
add(12, 'polyline', Polyline([(18.9807, -6.64323, 0), (15.9807, -6.64323, 0)]), color=Color.from_hex("#111111"), dash=0.5)
add(12, 'polyline', Polyline([(15.9807, -6.64323, 0), (9.90549, -6.64323, 0)]), color=Color.from_hex("#111111"), dash=0.28)
add(12, 'label', Point(15.3807, -6.24322, 0), text='o')
add(12, 'point', Point(15.9807, -6.64323, 0), color=Color.from_hex("#ffffff"), width=0.28)

# step 13 — M-diagram — the closing line
add(13, 'label', Point(-4.6, -12.65, 0), text='M - Diagram')
add(13, 'label', Point(-4.6, -13.45, 0), text='1 unit :: 1 kNm')
add(13, 'segment', Line((0, -13.1885, 0), (9.90549, -13.1885, 0)), color=Color.from_hex("#111111"), width=0.1152)
add(13, 'point', Point(0, -13.1885, 0), color=Color.from_hex("#ffffff"), width=0.28)
add(13, 'point', Point(9.90549, -13.1885, 0), color=Color.from_hex("#ffffff"), width=0.21)

# step 14 — String 1 — form and force
add(14, 'segment', Line((15.9807, -6.64323, 0), (18.9807, -4.60884, 0)), color=Color.from_hex("#111111"), width=0.0828)
add(14, 'segment', Line((0, -13.1885, 0), (4.8676, -9.88766, 0)), color=Color.from_hex("#111111"), width=0.0828)
add(14, 'label', Point(17.022, -5.27255, 0), text='1')
add(14, 'label', Point(2.0138, -11.1381, 0), text='1')
add(14, 'point', Point(4.8676, -9.88766, 0), color=Color.from_hex("#ffffff"), width=0.21)

# step 15 — String 2 — form and force
add(15, 'segment', Line((15.9807, -6.64323, 0), (18.9807, -8.60884, 0)), color=Color.from_hex("#111111"), width=0.0828)
add(15, 'segment', Line((4.8676, -9.88766, 0), (9.90549, -13.1885, 0)), color=Color.from_hex("#111111"), width=0.0828)
add(15, 'label', Point(17.0293, -7.9878, 0), text='2')
add(15, 'label', Point(7.80655, -11.1381, 0), text='2')

# step 16 — The funicular ordinates y
add(16, 'segment', Line((0.495275, -13.1885, 0), (0.495275, -12.8527, 0)), color=Color.from_hex("#111111"), width=0.054)
add(16, 'segment', Line((1.48582, -13.1885, 0), (1.48582, -12.1809, 0)), color=Color.from_hex("#111111"), width=0.054)
add(16, 'segment', Line((2.47637, -13.1885, 0), (2.47637, -11.5092, 0)), color=Color.from_hex("#111111"), width=0.054)
add(16, 'segment', Line((3.46692, -13.1885, 0), (3.46692, -10.8375, 0)), color=Color.from_hex("#111111"), width=0.054)
add(16, 'segment', Line((4.45747, -13.1885, 0), (4.45747, -10.1658, 0)), color=Color.from_hex("#111111"), width=0.054)
add(16, 'segment', Line((5.44802, -13.1885, 0), (5.44802, -10.2679, 0)), color=Color.from_hex("#111111"), width=0.054)
add(16, 'segment', Line((6.43857, -13.1885, 0), (6.43857, -10.917, 0)), color=Color.from_hex("#111111"), width=0.054)
add(16, 'segment', Line((7.42912, -13.1885, 0), (7.42912, -11.566, 0)), color=Color.from_hex("#111111"), width=0.054)
add(16, 'segment', Line((8.41967, -13.1885, 0), (8.41967, -12.215, 0)), color=Color.from_hex("#111111"), width=0.054)
add(16, 'segment', Line((9.41022, -13.1885, 0), (9.41022, -12.864, 0)), color=Color.from_hex("#111111"), width=0.054)

# step 17 — M = H · y
add(17, 'segment', Line((0.495275, -13.1885, 0), (0.495275, -13.6923, 0)), color=Color.from_hex("#ff0000"), width=0.054)
add(17, 'segment', Line((1.48582, -13.1885, 0), (1.48582, -14.6999, 0)), color=Color.from_hex("#ff0000"), width=0.054)
add(17, 'segment', Line((2.47637, -13.1885, 0), (2.47637, -15.7075, 0)), color=Color.from_hex("#ff0000"), width=0.054)
add(17, 'segment', Line((3.46692, -13.1885, 0), (3.46692, -16.715, 0)), color=Color.from_hex("#ff0000"), width=0.054)
add(17, 'segment', Line((4.45747, -13.1885, 0), (4.45747, -17.7226, 0)), color=Color.from_hex("#ff0000"), width=0.054)
add(17, 'segment', Line((5.44802, -13.1885, 0), (5.44802, -17.5694, 0)), color=Color.from_hex("#ff0000"), width=0.054)
add(17, 'segment', Line((6.43857, -13.1885, 0), (6.43857, -16.5958, 0)), color=Color.from_hex("#ff0000"), width=0.054)
add(17, 'segment', Line((7.42912, -13.1885, 0), (7.42912, -15.6223, 0)), color=Color.from_hex("#ff0000"), width=0.054)
add(17, 'segment', Line((8.41967, -13.1885, 0), (8.41967, -14.6488, 0)), color=Color.from_hex("#ff0000"), width=0.054)
add(17, 'segment', Line((9.41022, -13.1885, 0), (9.41022, -13.6753, 0)), color=Color.from_hex("#ff0000"), width=0.054)

# step 18 — The M-diagram
add(18, 'segment', Line((0, -13.1885, 0), (0.495275, -13.6923, 0)), color=Color.from_hex("#ff0000"), width=0.1152)
add(18, 'segment', Line((0.495275, -13.6923, 0), (1.48582, -14.6999, 0)), color=Color.from_hex("#ff0000"), width=0.1152)
add(18, 'segment', Line((1.48582, -14.6999, 0), (2.47637, -15.7075, 0)), color=Color.from_hex("#ff0000"), width=0.1152)
add(18, 'segment', Line((2.47637, -15.7075, 0), (3.46692, -16.715, 0)), color=Color.from_hex("#ff0000"), width=0.1152)
add(18, 'segment', Line((3.46692, -16.715, 0), (4.45747, -17.7226, 0)), color=Color.from_hex("#ff0000"), width=0.1152)
add(18, 'segment', Line((4.45747, -17.7226, 0), (4.8676, -18.1398, 0)), color=Color.from_hex("#ff0000"), width=0.1152)
add(18, 'segment', Line((4.8676, -18.1398, 0), (5.44802, -17.5694, 0)), color=Color.from_hex("#ff0000"), width=0.1152)
add(18, 'segment', Line((5.44802, -17.5694, 0), (6.43857, -16.5958, 0)), color=Color.from_hex("#ff0000"), width=0.1152)
add(18, 'segment', Line((6.43857, -16.5958, 0), (7.42912, -15.6223, 0)), color=Color.from_hex("#ff0000"), width=0.1152)
add(18, 'segment', Line((7.42912, -15.6223, 0), (8.41967, -14.6488, 0)), color=Color.from_hex("#ff0000"), width=0.1152)
add(18, 'segment', Line((8.41967, -14.6488, 0), (9.41022, -13.6753, 0)), color=Color.from_hex("#ff0000"), width=0.1152)
add(18, 'segment', Line((9.41022, -13.6753, 0), (9.90549, -13.1885, 0)), color=Color.from_hex("#ff0000"), width=0.1152)
add(18, 'label', Point(12.0055, -15.6642, 0), color=Color.from_hex("#ff0000"), text='M_max = 5.0 kNm')

# step 19 — Internal forces from the funicular
add(19, 'label', Point(24.2, -10.4, 0), color=Color.from_hex("#3f9c20"), text='A_V = 1.0 kN')
add(19, 'label', Point(24.2, -11.5, 0), color=Color.from_hex("#3f9c20"), text='B_V = 1.0 kN')
add(19, 'label', Point(24.2, -12.6, 0), color=Color.from_hex("#ff0000"), text='H = 1.5 kN')


if __name__ == "__main__":
    print("Drawing 46 — Internal forces in a beam: point load —", len(ops), "operations")
