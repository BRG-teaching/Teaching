"""Drawing 8 — Funicular For Vertical Forces

Auto-generated from ops/view_8.json — the drawing as literal COMPAS
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
add(0, 'label', Point(4.5, 23, 0), text='Form Diagram')
add(0, 'label', Point(50, 23, 0), text='Force Diagram')
add(0, 'label', Point(50, 21.5, 0), text='1 unit :: 0.83 kN')

# step 1 — Two supports
add(1, 'polyline', Polyline([(0, 15, 0), (0, -10, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6)
add(1, 'polyline', Polyline([(23.6682, 15, 0), (23.6682, -10, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6)
add(1, 'point', Point(0, 0, 0), color=Color.from_hex("#ffffff"), width=0.42)
add(1, 'point', Point(23.6682, 5.10817, 0), color=Color.from_hex("#ffffff"), width=0.42)
add(1, 'label', Point(-1.4, 0.7, 0), text='A')
add(1, 'label', Point(24.9682, 3.90817, 0), text='B')

# step 2 — The loads — in both diagrams
add(2, 'polyline', Polyline([(3.00475, 21.2965, 0), (3.00475, -10, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6)
add(2, 'arrow', Line((3.00475, 19.5, 0), (3.00475, 17, 0)), color=Color.from_hex("#3f9c20"), width=0.2304, head=(0.756, 0.288))
add(2, 'arrow', Line((45, 15, 0), (45, 11.52, 0)), color=Color.from_hex("#3f9c20"), width=0.2304, head=(0.756, 0.288))
add(2, 'label', Point(4.00475, 18.8, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(2, 'label', Point(43.65, 13.26, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(2, 'polyline', Polyline([(10.9119, 21.2965, 0), (10.9119, -10, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6)
add(2, 'arrow', Line((10.9119, 19.5, 0), (10.9119, 17, 0)), color=Color.from_hex("#3f9c20"), width=0.2304, head=(0.756, 0.288))
add(2, 'arrow', Line((45, 11.52, 0), (45, 5.64, 0)), color=Color.from_hex("#3f9c20"), width=0.2304, head=(0.756, 0.288))
add(2, 'label', Point(11.9119, 18.8, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(2, 'label', Point(43.65, 8.58, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(2, 'polyline', Polyline([(16.2447, 21.2965, 0), (16.2447, -10, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6)
add(2, 'arrow', Line((16.2447, 19.5, 0), (16.2447, 17, 0)), color=Color.from_hex("#3f9c20"), width=0.2304, head=(0.756, 0.288))
add(2, 'arrow', Line((45, 5.64, 0), (45, 2.04, 0)), color=Color.from_hex("#3f9c20"), width=0.2304, head=(0.756, 0.288))
add(2, 'label', Point(17.2447, 18.8, 0), color=Color.from_hex("#3f9c20"), text='F₃')
add(2, 'label', Point(43.65, 3.84, 0), color=Color.from_hex("#3f9c20"), text='F₃')
add(2, 'polyline', Polyline([(21.6387, 21.2965, 0), (21.6387, -10, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6)
add(2, 'arrow', Line((21.6387, 19.5, 0), (21.6387, 17, 0)), color=Color.from_hex("#3f9c20"), width=0.2304, head=(0.756, 0.288))
add(2, 'arrow', Line((45, 2.04, 0), (45, -3.24, 0)), color=Color.from_hex("#3f9c20"), width=0.2304, head=(0.756, 0.288))
add(2, 'label', Point(22.6387, 18.8, 0), color=Color.from_hex("#3f9c20"), text='F₄')
add(2, 'label', Point(43.65, -0.6, 0), color=Color.from_hex("#3f9c20"), text='F₄')
add(2, 'point', Point(3.00475, 17, 0), color=Color.from_hex("#ffffff"), width=0.42)
add(2, 'point', Point(10.9119, 17, 0), color=Color.from_hex("#ffffff"), width=0.42)
add(2, 'point', Point(16.2447, 17, 0), color=Color.from_hex("#ffffff"), width=0.42)
add(2, 'point', Point(21.6387, 17, 0), color=Color.from_hex("#ffffff"), width=0.42)
add(2, 'point', Point(45, 15, 0), color=Color.from_hex("#ffffff"), width=0.42)
add(2, 'point', Point(45, 11.52, 0), color=Color.from_hex("#ffffff"), width=0.32)
add(2, 'point', Point(45, 5.64, 0), color=Color.from_hex("#ffffff"), width=0.32)
add(2, 'point', Point(45, 2.04, 0), color=Color.from_hex("#ffffff"), width=0.32)
add(2, 'point', Point(45, -3.24, 0), color=Color.from_hex("#ffffff"), width=0.32)

# step 3 — Trial pole o′
add(3, 'segment', Line((57.5, 3.5, 0), (45, 15, 0)), color=Color.from_hex("#aaaaaa"), width=0.0864)
add(3, 'segment', Line((57.5, 3.5, 0), (45, 11.52, 0)), color=Color.from_hex("#aaaaaa"), width=0.0864)
add(3, 'segment', Line((57.5, 3.5, 0), (45, 5.64, 0)), color=Color.from_hex("#aaaaaa"), width=0.0864)
add(3, 'segment', Line((57.5, 3.5, 0), (45, 2.04, 0)), color=Color.from_hex("#aaaaaa"), width=0.0864)
add(3, 'segment', Line((57.5, 3.5, 0), (45, -3.24, 0)), color=Color.from_hex("#aaaaaa"), width=0.0864)
add(3, 'point', Point(57.5, 3.5, 0), color=Color.from_hex("#ffffff"), width=0.42)
add(3, 'label', Point(58.9, 3.9, 0), text='o′')

# step 4 — Trial string 1
add(4, 'segment', Line((0, -1, 0), (3.00475, -3.76437, 0)), color=Color.from_hex("#aaaaaa"), width=0.1368)
add(4, 'point', Point(0, -1, 0), color=Color.from_hex("#ffffff"), width=0.42)
add(4, 'point', Point(3.00475, -3.76437, 0), color=Color.from_hex("#ffffff"), width=0.32)
add(4, 'label', Point(-1.8, -1.8, 0), text='K₁')

# step 5 — Trial string 2
add(5, 'segment', Line((3.00475, -3.76437, 0), (10.9119, -8.83761, 0)), color=Color.from_hex("#aaaaaa"), width=0.1368)
add(5, 'point', Point(10.9119, -8.83761, 0), color=Color.from_hex("#ffffff"), width=0.32)

# step 6 — Trial string 3
add(6, 'segment', Line((10.9119, -8.83761, 0), (16.2447, -9.75058, 0)), color=Color.from_hex("#aaaaaa"), width=0.1368)
add(6, 'point', Point(16.2447, -9.75058, 0), color=Color.from_hex("#ffffff"), width=0.32)

# step 7 — Trial string 4
add(7, 'segment', Line((16.2447, -9.75058, 0), (21.6387, -9.12056, 0)), color=Color.from_hex("#aaaaaa"), width=0.1368)
add(7, 'point', Point(21.6387, -9.12056, 0), color=Color.from_hex("#ffffff"), width=0.32)

# step 8 — Trial string 5
add(8, 'segment', Line((21.6387, -9.12056, 0), (23.6682, -8.02624, 0)), color=Color.from_hex("#aaaaaa"), width=0.1368)
add(8, 'point', Point(23.6682, -8.02624, 0), color=Color.from_hex("#ffffff"), width=0.32)

# step 9 — Trial closing → division point i
add(9, 'polyline', Polyline([(0, -1, 0), (23.6682, -8.02624, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6)
add(9, 'polyline', Polyline([(57.5, 3.5, 0), (45, 7.2108, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6)
add(9, 'point', Point(45, 7.2108, 0), color=Color.from_hex("#ffffff"), width=0.32)
add(9, 'label', Point(43.8, 6.4608, 0), text='i')

# step 10 — The closing line A–B
add(10, 'polyline', Polyline([(0, 0, 0), (23.6682, 5.10817, 0)]), color=Color.from_hex("#111111"), dash=0.8)
add(10, 'polyline', Polyline([(42.5563, 6.68338, 0), (57.7074, 9.95336, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6)

# step 11 — The pole o
add(11, 'polyline', Polyline([(53.2659, 8.99478, 0), (45, 7.2108, 0)]), color=Color.from_hex("#111111"), dash=0.8)
add(11, 'point', Point(53.2659, 8.99478, 0), color=Color.from_hex("#ffffff"), width=0.42)
add(11, 'label', Point(54.1659, 7.79478, 0), text='o')

# step 12 — String 1 — form and force
add(12, 'segment', Line((53.2659, 8.99478, 0), (45, 15, 0)), color=Color.from_hex("#ce4095"), width=0.1872)
add(12, 'segment', Line((0, 0, 0), (3.00475, -2.18296, 0)), color=Color.from_hex("#ce4095"), width=0.1872)
add(12, 'label', Point(2.20769, -0.120641, 0), color=Color.from_hex("#ce4095"), text='1')
add(12, 'label', Point(48.8188, 10.8392, 0), color=Color.from_hex("#ce4095"), text='1')
add(12, 'point', Point(3.00475, -2.18296, 0), color=Color.from_hex("#ffffff"), width=0.32)
add(12, 'label', Point(3.00475, -3.48296, 0), text='I')

# step 13 — String 2 — form and force
add(13, 'segment', Line((53.2659, 8.99478, 0), (45, 11.52, 0)), color=Color.from_hex("#ce4095"), width=0.1872)
add(13, 'segment', Line((3.00475, -2.18296, 0), (10.9119, -4.59858, 0)), color=Color.from_hex("#ce4095"), width=0.1872)
add(13, 'label', Point(7.30894, -2.24313, 0), color=Color.from_hex("#ce4095"), text='2')
add(13, 'label', Point(48.6753, 9.14809, 0), color=Color.from_hex("#ce4095"), text='2')
add(13, 'point', Point(10.9119, -4.59858, 0), color=Color.from_hex("#ffffff"), width=0.32)
add(13, 'label', Point(10.9119, -5.89858, 0), text='II')

# step 14 — String 3 — form and force
add(14, 'segment', Line((53.2659, 8.99478, 0), (45, 5.64, 0)), color=Color.from_hex("#ce4095"), width=0.1872)
add(14, 'segment', Line((10.9119, -4.59858, 0), (16.2447, -2.43425, 0)), color=Color.from_hex("#ce4095"), width=0.1872)
add(14, 'label', Point(13.127, -2.4045, 0), color=Color.from_hex("#ce4095"), text='3')
add(14, 'label', Point(47.9804, 6.98346, 0), color=Color.from_hex("#ce4095"), text='3')
add(14, 'point', Point(16.2447, -2.43425, 0), color=Color.from_hex("#ffffff"), width=0.32)
add(14, 'label', Point(16.2447, -3.73425, 0), text='III')

# step 15 — String 4 — form and force
add(15, 'segment', Line((53.2659, 8.99478, 0), (45, 2.04, 0)), color=Color.from_hex("#ce4095"), width=0.1872)
add(15, 'segment', Line((16.2447, -2.43425, 0), (21.6387, 2.10419, 0)), color=Color.from_hex("#ce4095"), width=0.1872)
add(15, 'label', Point(18.1691, 0.75319, 0), color=Color.from_hex("#ce4095"), text='4')
add(15, 'label', Point(48.2916, 6.37298, 0), color=Color.from_hex("#ce4095"), text='4')
add(15, 'point', Point(21.6387, 2.10419, 0), color=Color.from_hex("#ffffff"), width=0.32)
add(15, 'label', Point(22.0387, 0.804187, 0), text='IV')

# step 16 — String 5 — form and force
add(16, 'segment', Line((53.2659, 8.99478, 0), (45, -3.24, 0)), color=Color.from_hex("#ce4095"), width=0.1872)
add(16, 'segment', Line((21.6387, 2.10419, 0), (23.6682, 5.10817, 0)), color=Color.from_hex("#ce4095"), width=0.1872)
add(16, 'label', Point(21.6591, 4.27796, 0), color=Color.from_hex("#ce4095"), text='5')
add(16, 'label', Point(48.7457, 4.0132, 0), color=Color.from_hex("#ce4095"), text='5')

# step 17 — Reactions A and B
add(17, 'arrow', Line((55.3111, 10.2728, 0), (47.0451, 16.278, 0)), color=Color.from_hex("#3f9c20"), width=0.2304, head=(0.756, 0.288))
add(17, 'arrow', Line((46.2803, -3.01472, 0), (54.5463, 9.22006, 0)), color=Color.from_hex("#3f9c20"), width=0.2304, head=(0.756, 0.288))
add(17, 'arrow', Line((0, 0, 0), (-2.62935, 1.91023, 0)), color=Color.from_hex("#3f9c20"), width=0.2304, head=(0.756, 0.288))
add(17, 'arrow', Line((23.6682, 5.10817, 0), (25.4876, 7.80117, 0)), color=Color.from_hex("#3f9c20"), width=0.2304, head=(0.756, 0.288))
add(17, 'label', Point(51.0011, 13.0317, 0), color=Color.from_hex("#3f9c20"), text='A')
add(17, 'label', Point(51.2419, 2.54285, 0), color=Color.from_hex("#3f9c20"), text='B')

# step 18 — Tension
add(18, 'label', Point(60.6, 1.6, 0), color=Color.from_hex("#ce4095"), text='N₁ = A = 8.5 kN')
add(18, 'polygon', Polygon([(-0.15013, -0.206648, 0), (0.15013, 0.206648, 0), (3.15488, -1.97631, 0), (2.85462, -2.38961, 0)]), color=Color.from_hex("#ce4095"))
add(18, 'label', Point(60.6, -0.15, 0), color=Color.from_hex("#ce4095"), text='N₂ = 7.2 kN')
add(18, 'polygon', Polygon([(2.94162, -2.38961, 0), (3.06788, -1.97631, 0), (10.9751, -4.39193, 0), (10.8488, -4.80523, 0)]), color=Color.from_hex("#ce4095"))
add(18, 'label', Point(60.6, -1.9, 0), color=Color.from_hex("#ce4095"), text='N₃ = 7.4 kN')
add(18, 'polygon', Polygon([(10.9958, -4.80523, 0), (10.8281, -4.39193, 0), (16.1608, -2.2276, 0), (16.3285, -2.6409, 0)]), color=Color.from_hex("#ce4095"))
add(18, 'label', Point(60.6, -3.65, 0), color=Color.from_hex("#ce4095"), text='N₄ = 9.0 kN')
add(18, 'polygon', Polygon([(16.4185, -2.6409, 0), (16.0708, -2.2276, 0), (21.4648, 2.31083, 0), (21.8126, 1.89754, 0)]), color=Color.from_hex("#ce4095"))
add(18, 'label', Point(60.6, -5.4, 0), color=Color.from_hex("#ce4095"), text='N₅ = B = 12.3 kN')
add(18, 'polygon', Polygon([(21.9446, 1.89754, 0), (21.3328, 2.31083, 0), (23.3624, 5.31482, 0), (23.9741, 4.90152, 0)]), color=Color.from_hex("#ce4095"))


if __name__ == "__main__":
    print("Drawing 8 — Funicular For Vertical Forces —", len(ops), "operations")
