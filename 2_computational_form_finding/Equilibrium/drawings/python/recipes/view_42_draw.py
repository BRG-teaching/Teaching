"""Drawing 42 — Internal forces in a fixed frame

Auto-generated from ops/view_42.json — the drawing as literal COMPAS
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
add(0, 'label', Point(3, 11.45, 0), text='Form Diagram')
add(0, 'label', Point(13.06, 11.45, 0), text='Force Diagram')

# step 1 — The girder
add(1, 'segment', Line((5, 8, 0), (10, 8, 0)), color=Color.from_hex("#111111"), width=0.02016)
add(1, 'segment', Line((5, 7, 0), (10, 7, 0)), color=Color.from_hex("#111111"), width=0.02016)
add(1, 'segment', Line((5, 7, 0), (5, 8, 0)), color=Color.from_hex("#111111"), width=0.02016)
add(1, 'segment', Line((10, 8, 0), (10, 7, 0)), color=Color.from_hex("#111111"), width=0.02016)
add(1, 'segment', Line((7.5, 8, 0), (7.5, 7, 0)), color=Color.from_hex("#111111"), width=0.02016)
add(1, 'point', Point(5, 8, 0), color=Color.from_hex("#ffffff"), width=0.085)
add(1, 'point', Point(5, 7, 0), color=Color.from_hex("#ffffff"), width=0.085)

# step 2 — Fixed corners and legs
add(2, 'segment', Line((5, 8, 0), (4, 8, 0)), color=Color.from_hex("#111111"), width=0.02016)
add(2, 'segment', Line((4, 8, 0), (4, 7, 0)), color=Color.from_hex("#111111"), width=0.02016)
add(2, 'segment', Line((4, 7, 0), (5, 7, 0)), color=Color.from_hex("#111111"), width=0.02016)
add(2, 'segment', Line((4, 7, 0), (5, 8, 0)), color=Color.from_hex("#111111"), width=0.02016)
add(2, 'segment', Line((11, 8, 0), (10, 8, 0)), color=Color.from_hex("#111111"), width=0.02016)
add(2, 'segment', Line((11, 7, 0), (11, 8, 0)), color=Color.from_hex("#111111"), width=0.02016)
add(2, 'segment', Line((10, 7, 0), (11, 7, 0)), color=Color.from_hex("#111111"), width=0.02016)
add(2, 'segment', Line((10, 8, 0), (11, 7, 0)), color=Color.from_hex("#111111"), width=0.02016)
add(2, 'segment', Line((5, 4, 0), (5, 7, 0)), color=Color.from_hex("#111111"), width=0.02016)
add(2, 'segment', Line((4, 7, 0), (5, 4, 0)), color=Color.from_hex("#111111"), width=0.02016)
add(2, 'segment', Line((10, 7, 0), (10, 4, 0)), color=Color.from_hex("#111111"), width=0.02016)
add(2, 'segment', Line((10, 4, 0), (11, 7, 0)), color=Color.from_hex("#111111"), width=0.02016)
add(2, 'polyline', Polyline([(4, 4, 0), (8.80211, 4, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.16)
add(2, 'polyline', Polyline([(5, 5.90515, 0), (5, 7.57928, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.16)
add(2, 'point', Point(5, 4, 0), color=Color.from_hex("#ffffff"), width=0.085)
add(2, 'point', Point(10, 4, 0), color=Color.from_hex("#ffffff"), width=0.085)
add(2, 'label', Point(4.72, 8.26, 0), text='C')
add(2, 'label', Point(4.72, 6.72, 0), text='D')

# step 3 — The height of the frame
add(3, 'segment', Line((3.5, 4, 0), (3.5, 7.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.01152)
add(3, 'segment', Line((3.41, 3.91, 0), (3.59, 4.09, 0)), color=Color.from_hex("#aaaaaa"), width=0.01152)
add(3, 'segment', Line((3.41, 4.09, 0), (3.59, 3.91, 0)), color=Color.from_hex("#aaaaaa"), width=0.01152)
add(3, 'segment', Line((3.41, 7.41, 0), (3.59, 7.59, 0)), color=Color.from_hex("#aaaaaa"), width=0.01152)
add(3, 'segment', Line((3.41, 7.59, 0), (3.59, 7.41, 0)), color=Color.from_hex("#aaaaaa"), width=0.01152)
add(3, 'segment', Line((3, 4, 0), (3, 7.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.01152)
add(3, 'segment', Line((2.91, 3.91, 0), (3.09, 4.09, 0)), color=Color.from_hex("#aaaaaa"), width=0.01152)
add(3, 'segment', Line((2.91, 4.09, 0), (3.09, 3.91, 0)), color=Color.from_hex("#aaaaaa"), width=0.01152)
add(3, 'segment', Line((2.91, 7.41, 0), (3.09, 7.59, 0)), color=Color.from_hex("#aaaaaa"), width=0.01152)
add(3, 'segment', Line((2.91, 7.59, 0), (3.09, 7.41, 0)), color=Color.from_hex("#aaaaaa"), width=0.01152)
add(3, 'segment', Line((5, 4, 0), (3, 4, 0)), color=Color.from_hex("#aaaaaa"), width=0.01152)
add(3, 'segment', Line((3, 7.5, 0), (7.5, 7.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.01152)
add(3, 'label', Point(3.78, 5.75, 0), color=Color.from_hex("#777777"), text='h')
add(3, 'label', Point(2.45, 5.75, 0), color=Color.from_hex("#777777"), text='1 · h')
add(3, 'point', Point(7.5, 7.5, 0), color=Color.from_hex("#ffffff"), width=0.06)
add(3, 'label', Point(4.64, 4.16, 0), text='A')
add(3, 'label', Point(10.38, 4.16, 0), text='B')

# step 4 — The load 2Q and the budget Nₘₐₓ
add(4, 'arrow', Line((7.5, 9.1, 0), (7.5, 8.3, 0)), color=Color.from_hex("#3f9c20"), width=0.0504, head=(0.1872, 0.072))
add(4, 'arrow', Line((7.5, 8.3, 0), (7.5, 7.5, 0)), color=Color.from_hex("#3f9c20"), width=0.0504, head=(0.1872, 0.072))
add(4, 'label', Point(7.8, 8.7, 0), color=Color.from_hex("#3f9c20"), text='Q')
add(4, 'label', Point(7.8, 7.9, 0), color=Color.from_hex("#3f9c20"), text='Q')
add(4, 'segment', Line((15.5111, 9.41405, 0), (18, 9.41405, 0)), color=Color.from_hex("#aaaaaa"), width=0.01152)
add(4, 'segment', Line((15.4211, 9.32405, 0), (15.6011, 9.50405, 0)), color=Color.from_hex("#aaaaaa"), width=0.01152)
add(4, 'segment', Line((15.4211, 9.50405, 0), (15.6011, 9.32405, 0)), color=Color.from_hex("#aaaaaa"), width=0.01152)
add(4, 'segment', Line((17.91, 9.32405, 0), (18.09, 9.50405, 0)), color=Color.from_hex("#aaaaaa"), width=0.01152)
add(4, 'segment', Line((17.91, 9.50405, 0), (18.09, 9.32405, 0)), color=Color.from_hex("#aaaaaa"), width=0.01152)
add(4, 'label', Point(16.7556, 9.75405, 0), color=Color.from_hex("#777777"), text='Nₘₐₓ')
add(4, 'polyline', Polyline([(15.5111, 10, 0), (15.5111, 4, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.045)
add(4, 'polyline', Polyline([(19.8667, 10, 0), (19.8667, 4, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.045)
add(4, 'point', Point(18, 9, 0), color=Color.from_hex("#ffffff"), width=0.085)
add(4, 'label', Point(7.16, 7.76, 0), text='N')

# step 5 — Lines of action of the reactions
add(5, 'polyline', Polyline([(5, 4, 0), (7.5, 7.5, 0)]), color=Color.from_hex("#111111"), dash=0.18)
add(5, 'polyline', Polyline([(7.5, 7.5, 0), (10, 4, 0)]), color=Color.from_hex("#111111"), dash=0.18)
add(5, 'arrow', Line((4.53501, 3.34901, 0), (5, 4, 0)), color=Color.from_hex("#3f9c20"), width=0.0504, head=(0.1872, 0.072))
add(5, 'arrow', Line((10.465, 3.34901, 0), (10, 4, 0)), color=Color.from_hex("#3f9c20"), width=0.0504, head=(0.1872, 0.072))
add(5, 'label', Point(4.23501, 3.36901, 0), color=Color.from_hex("#3f9c20"), text='A')
add(5, 'label', Point(10.765, 3.36901, 0), color=Color.from_hex("#3f9c20"), text='B')
add(5, 'polyline', Polyline([(18.2034, 9.28481, 0), (17.0581, 7.68133, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.12)
add(5, 'label', Point(18.36, 9.1, 0), text='R₂')

# step 6 — O and P: zero-moment points
add(6, 'polyline', Polyline([(3.7, 7.5, 0), (11.3, 7.5, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.1)
add(6, 'segment', Line((3.5, 7.5, 0), (7.5, 7.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.01152)
add(6, 'point', Point(7.5, 7.5, 0), color=Color.from_hex("#ffffff"), width=0.06)
add(6, 'point', Point(7.5, 7.5, 0), color=Color.from_hex("#ffffff"), width=0.06)

# step 7 — The tension resultant (pink)
add(7, 'segment', Line((5, 8, 0), (7.5, 7.5, 0)), color=Color.from_hex("#ce4095"), width=0.03024)
add(7, 'segment', Line((7.5, 7.5, 0), (7.5, 7, 0)), color=Color.from_hex("#ce4095"), width=0.03024)
add(7, 'segment', Line((18, 9, 0), (19.8667, 8.62667, 0)), color=Color.from_hex("#ce4095"), width=0.03024)
add(7, 'polygon', Polygon([(4.99067, 7.95333, 0), (5.00933, 8.04667, 0), (7.50933, 7.54667, 0), (7.49067, 7.45333, 0)]), color=Color.from_hex("#ce4095"), opacity=0.3)
add(7, 'polygon', Polygon([(7.4999, 7.5, 0), (7.5001, 7.5, 0), (7.5001, 7, 0), (7.4999, 7, 0)]), color=Color.from_hex("#ce4095"), opacity=0.3)
add(7, 'polygon', Polygon([(7.4999, 8, 0), (7.5001, 8, 0), (7.5001, 7.5, 0), (7.4999, 7.5, 0)]), color=Color.from_hex("#1a1eb2"), opacity=0.3)
add(7, 'polygon', Polygon([(7.48756, 7.56222, 0), (7.51244, 7.43778, 0), (5.01244, 6.93778, 0), (4.98756, 7.06222, 0)]), color=Color.from_hex("#1a1eb2"), opacity=0.3)
add(7, 'polygon', Polygon([(7.4999, 8, 0), (7.5001, 8, 0), (7.5001, 7.5, 0), (7.4999, 7.5, 0)]), color=Color.from_hex("#1a1eb2"), opacity=0.3)
add(7, 'polygon', Polygon([(7.4999, 7.5, 0), (7.5001, 7.5, 0), (7.5001, 7, 0), (7.4999, 7, 0)]), color=Color.from_hex("#ce4095"), opacity=0.3)
add(7, 'polygon', Polygon([(7.50933, 7.45333, 0), (7.49067, 7.54667, 0), (9.99067, 8.04667, 0), (10.0093, 7.95333, 0)]), color=Color.from_hex("#ce4095"), opacity=0.3)
add(7, 'polygon', Polygon([(7.48756, 7.43778, 0), (7.51244, 7.56222, 0), (10.0124, 7.06222, 0), (9.98756, 6.93778, 0)]), color=Color.from_hex("#1a1eb2"), opacity=0.3)
add(7, 'polygon', Polygon([(5.06844, 4, 0), (4.93156, 4, 0), (4.93156, 7, 0), (5.06844, 7, 0)]), color=Color.from_hex("#1a1eb2"), opacity=0.3)
add(7, 'polygon', Polygon([(3.95333, 6.98444, 0), (4.04667, 7.01556, 0), (5.04667, 4.01556, 0), (4.95333, 3.98444, 0)]), color=Color.from_hex("#1a1eb2"), opacity=0.3)
add(7, 'polygon', Polygon([(9.93156, 7, 0), (10.0684, 7, 0), (10.0684, 4, 0), (9.93156, 4, 0)]), color=Color.from_hex("#1a1eb2"), opacity=0.3)
add(7, 'polygon', Polygon([(10.0467, 3.98444, 0), (9.95333, 4.01556, 0), (10.9533, 7.01556, 0), (11.0467, 6.98444, 0)]), color=Color.from_hex("#1a1eb2"), opacity=0.3)
add(7, 'label', Point(7.12, 7.34, 0), text='O')
add(7, 'label', Point(7.9, 7.34, 0), text='P')

# step 8 — The compression resultant (blue)
add(8, 'segment', Line((7.5, 8, 0), (7.5, 7.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.03024)
add(8, 'segment', Line((7.5, 7.5, 0), (5, 7, 0)), color=Color.from_hex("#1a1eb2"), width=0.03024)
add(8, 'segment', Line((19.8667, 8.62667, 0), (17.3778, 8.12889, 0)), color=Color.from_hex("#1a1eb2"), width=0.03024)

# step 9 — Reaction A = Q + H
add(9, 'arrow', Line((17.3778, 8.12889, 0), (18, 9, 0)), color=Color.from_hex("#3f9c20"), width=0.0504, head=(0.1872, 0.072))
add(9, 'arrow', Line((18, 9, 0), (18, 8.12889, 0)), color=Color.from_hex("#3f9c20"), width=0.0504, head=(0.1872, 0.072))
add(9, 'arrow', Line((18, 8.12889, 0), (17.3778, 8.12889, 0)), color=Color.from_hex("#3f9c20"), width=0.0504, head=(0.1872, 0.072))
add(9, 'label', Point(17.4089, 8.64444, 0), color=Color.from_hex("#3f9c20"), text='A')
add(9, 'label', Point(18.26, 8.56444, 0), color=Color.from_hex("#3f9c20"), text='Q')
add(9, 'label', Point(17.6889, 7.76889, 0), color=Color.from_hex("#3f9c20"), text='H')
add(9, 'label', Point(11.4, 5.5, 0), text='λ = Q / Qref = 1.00')
add(9, 'label', Point(11.4, 5, 0), color=Color.from_hex("#777777"), text='(Qref = Q at h = 1)')

# step 10 — The quadrilateral closes
add(10, 'segment', Line((17.3778, 7.62889, 0), (19.8667, 7.62889, 0)), color=Color.from_hex("#aaaaaa"), width=0.01152)
add(10, 'segment', Line((17.2878, 7.53889, 0), (17.4678, 7.71889, 0)), color=Color.from_hex("#aaaaaa"), width=0.01152)
add(10, 'segment', Line((17.2878, 7.71889, 0), (17.4678, 7.53889, 0)), color=Color.from_hex("#aaaaaa"), width=0.01152)
add(10, 'segment', Line((19.7767, 7.53889, 0), (19.9567, 7.71889, 0)), color=Color.from_hex("#aaaaaa"), width=0.01152)
add(10, 'segment', Line((19.7767, 7.71889, 0), (19.9567, 7.53889, 0)), color=Color.from_hex("#aaaaaa"), width=0.01152)
add(10, 'label', Point(18.6222, 7.26889, 0), color=Color.from_hex("#777777"), text='Nₘₐₓ')

# step 11 — The right half mirrors
add(11, 'segment', Line((7.5, 8, 0), (7.5, 7.5, 0)), color=Color.from_hex("#111111"), width=0.03024)
add(11, 'segment', Line((7.5, 7, 0), (7.5, 7.5, 0)), color=Color.from_hex("#111111"), width=0.03024)
add(11, 'segment', Line((7.5, 7.5, 0), (10, 8, 0)), color=Color.from_hex("#111111"), width=0.03024)
add(11, 'segment', Line((7.5, 7.5, 0), (10, 7, 0)), color=Color.from_hex("#111111"), width=0.03024)


if __name__ == "__main__":
    print("Drawing 42 — Internal forces in a fixed frame —", len(ops), "operations")
