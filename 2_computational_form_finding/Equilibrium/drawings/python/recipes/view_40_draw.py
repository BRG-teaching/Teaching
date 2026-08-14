"""Drawing 40 — Continuous beam, symmetrical

Auto-generated from ops/view_40.json — the drawing as literal COMPAS
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
add(0, 'label', Point(0.4, 11.05, 0), text='Form Diagram')
add(0, 'label', Point(13.4, 11.05, 0), text='Force Diagram')
add(0, 'label', Point(13.4, 10.7, 0), text='1 unit :: 18.2 kN')

# step 1 — Two spans, three supports
add(1, 'polygon', Polygon([(0.859629, 6.01809, 0), (10.2057, 6.01809, 0), (10.2057, 5.46809, 0), (0.859629, 5.46809, 0)]), color=Color.from_hex("#555555"), opacity=0.1)
add(1, 'segment', Line((0.859629, 6.01809, 0), (10.2057, 6.01809, 0)), color=Color.from_hex("#111111"), width=0.00864)
add(1, 'segment', Line((10.2057, 6.01809, 0), (10.2057, 5.46809, 0)), color=Color.from_hex("#111111"), width=0.00864)
add(1, 'segment', Line((10.2057, 5.46809, 0), (0.859629, 5.46809, 0)), color=Color.from_hex("#111111"), width=0.00864)
add(1, 'segment', Line((0.859629, 5.46809, 0), (0.859629, 6.01809, 0)), color=Color.from_hex("#111111"), width=0.00864)
add(1, 'segment', Line((1.10963, 6.01809, 0), (9.95568, 6.01809, 0)), color=Color.from_hex("#da2020"), width=0.0144)
add(1, 'polygon', Polygon([(0.859629, 9.05, 0), (10.2057, 9.05, 0), (10.2057, 9.47, 0), (0.859629, 9.47, 0)]), color=Color.from_hex("#3f9c20"), opacity=0.13)
add(1, 'segment', Line((0.859629, 9.05, 0), (10.2057, 9.05, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(1, 'segment', Line((10.2057, 9.05, 0), (10.2057, 9.47, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(1, 'segment', Line((10.2057, 9.47, 0), (0.859629, 9.47, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(1, 'segment', Line((0.859629, 9.47, 0), (0.859629, 9.05, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(1, 'label', Point(0.409629, 9.25, 0), color=Color.from_hex("#3f9c20"), text='q')
add(1, 'segment', Line((0.889629, 4.91809, 0), (1.10963, 5.46809, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((1.10963, 5.46809, 0), (1.32963, 4.91809, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((0.789629, 4.91809, 0), (1.42963, 4.91809, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((0.869629, 4.78809, 0), (1.00963, 4.78809, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((1.07963, 4.78809, 0), (1.21963, 4.78809, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((1.28963, 4.78809, 0), (1.42963, 4.78809, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((5.31265, 4.91809, 0), (5.53265, 5.46809, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((5.53265, 5.46809, 0), (5.75265, 4.91809, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((5.21265, 4.91809, 0), (5.85265, 4.91809, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((5.29265, 4.78809, 0), (5.43265, 4.78809, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((5.50265, 4.78809, 0), (5.64265, 4.78809, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((5.71265, 4.78809, 0), (5.85265, 4.78809, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((9.73568, 4.91809, 0), (9.95568, 5.46809, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((9.95568, 5.46809, 0), (10.1757, 4.91809, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((9.63568, 4.91809, 0), (10.2757, 4.91809, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((9.71568, 4.78809, 0), (9.85568, 4.78809, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((9.92568, 4.78809, 0), (10.0657, 4.78809, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((10.1357, 4.78809, 0), (10.2757, 4.78809, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'label', Point(-0.790371, 5.11809, 0), color=Color.from_hex("#3f9c20"), text='A_H = 0')

# step 2 — Each span as one resultant
add(2, 'polyline', Polyline([(1.50963, 7.90008, 0), (5.13265, 7.90008, 0)]), color=Color.from_hex("#afafaf"), dash=0.06)
add(2, 'arrow', Line((3.32124, 8.52508, 0), (3.32124, 7.90008, 0)), color=Color.from_hex("#3f9c20"), width=0.0324, head=(0.1368, 0.054))
add(2, 'arrow', Line((7.74407, 8.52508, 0), (7.74407, 7.90008, 0)), color=Color.from_hex("#3f9c20"), width=0.0324, head=(0.1368, 0.054))
add(2, 'label', Point(3.48124, 8.22508, 0), color=Color.from_hex("#3f9c20"), text='R₁')
add(2, 'label', Point(7.90407, 8.22508, 0), color=Color.from_hex("#3f9c20"), text='R₂')
add(2, 'arrow', Line((15.582, 9.28159, 0), (15.582, 7.35659, 0)), color=Color.from_hex("#3f9c20"), width=0.0324, head=(0.1368, 0.054))
add(2, 'arrow', Line((15.582, 7.35659, 0), (15.582, 5.43159, 0)), color=Color.from_hex("#3f9c20"), width=0.0324, head=(0.1368, 0.054))
add(2, 'label', Point(15.782, 8.31909, 0), color=Color.from_hex("#3f9c20"), text='R₁')
add(2, 'label', Point(15.782, 6.39409, 0), color=Color.from_hex("#3f9c20"), text='R₂')

# step 3 — The funicular tent
add(3, 'polyline', Polyline([(5.53265, 6.16809, 0), (5.53265, 4.89642, 0)]), color=Color.from_hex("#afafaf"), dash=0.06)
add(3, 'segment', Line((1.10963, 6.01809, 0), (3.32124, 7.90008, 0)), color=Color.from_hex("#1a1eb2"), width=0.0252)
add(3, 'segment', Line((3.32124, 7.90008, 0), (5.53265, 5.79642, 0)), color=Color.from_hex("#1a1eb2"), width=0.0252)
add(3, 'segment', Line((5.53265, 5.79642, 0), (7.74407, 7.90008, 0)), color=Color.from_hex("#1a1eb2"), width=0.0252)
add(3, 'segment', Line((7.74407, 7.90008, 0), (9.95568, 6.01809, 0)), color=Color.from_hex("#1a1eb2"), width=0.0252)
add(3, 'point', Point(3.32124, 7.90008, 0), color=Color.from_hex("#ffffff"), width=0.07)
add(3, 'point', Point(5.53265, 5.79642, 0), color=Color.from_hex("#ffffff"), width=0.07)
add(3, 'label', Point(5.67265, 5.51642, 0), text='I')
add(3, 'segment', Line((15.582, 9.28159, 0), (14.5139, 8.37267, 0)), color=Color.from_hex("#aaaaaa"), width=0.0144)
add(3, 'segment', Line((15.582, 7.35659, 0), (14.5139, 8.37267, 0)), color=Color.from_hex("#aaaaaa"), width=0.0144)
add(3, 'segment', Line((15.582, 7.35659, 0), (14.5139, 6.34052, 0)), color=Color.from_hex("#aaaaaa"), width=0.0144)
add(3, 'segment', Line((15.582, 5.43159, 0), (14.5139, 6.34052, 0)), color=Color.from_hex("#aaaaaa"), width=0.0144)
add(3, 'point', Point(14.5139, 8.37267, 0), color=Color.from_hex("#ffffff"), width=0.05)
add(3, 'point', Point(14.5139, 6.34052, 0), color=Color.from_hex("#ffffff"), width=0.05)
add(3, 'label', Point(14.1939, 8.49267, 0), text='H')
add(3, 'label', Point(14.1939, 6.16052, 0), text='V')

# step 4 — B is the distance between the poles
add(4, 'arrow', Line((14.5139, 6.34052, 0), (14.5139, 8.37267, 0)), color=Color.from_hex("#3f9c20"), width=0.0324, head=(0.1368, 0.054))
add(4, 'label', Point(14.1739, 7.35659, 0), color=Color.from_hex("#3f9c20"), text='B')
add(4, 'arrow', Line((15.832, 8.37267, 0), (15.832, 9.28159, 0)), color=Color.from_hex("#3f9c20"), width=0.0324, head=(0.1368, 0.054))
add(4, 'arrow', Line((15.832, 5.43159, 0), (15.832, 6.34052, 0)), color=Color.from_hex("#3f9c20"), width=0.0324, head=(0.1368, 0.054))
add(4, 'label', Point(16.052, 8.82713, 0), color=Color.from_hex("#3f9c20"), text='A_V')
add(4, 'label', Point(16.052, 5.88605, 0), color=Color.from_hex("#3f9c20"), text='C')
add(4, 'point', Point(15.582, 8.37267, 0), color=Color.from_hex("#ffffff"), width=0.05)
add(4, 'label', Point(15.282, 8.32267, 0), text='J')
add(4, 'polyline', Polyline([(14.5139, 8.37267, 0), (15.832, 8.37267, 0)]), color=Color.from_hex("#afafaf"), dash=0.07)
add(4, 'polyline', Polyline([(14.5139, 6.34052, 0), (15.832, 6.34052, 0)]), color=Color.from_hex("#afafaf"), dash=0.07)
add(4, 'arrow', Line((1.10963, 3.96809, 0), (1.10963, 4.74809, 0)), color=Color.from_hex("#3f9c20"), width=0.0324, head=(0.1368, 0.054))
add(4, 'arrow', Line((5.53265, 3.96809, 0), (5.53265, 4.74809, 0)), color=Color.from_hex("#3f9c20"), width=0.0324, head=(0.1368, 0.054))
add(4, 'arrow', Line((9.95568, 3.96809, 0), (9.95568, 4.74809, 0)), color=Color.from_hex("#3f9c20"), width=0.0324, head=(0.1368, 0.054))
add(4, 'label', Point(1.28963, 4.31809, 0), color=Color.from_hex("#3f9c20"), text='A_V')
add(4, 'label', Point(5.71265, 4.31809, 0), color=Color.from_hex("#3f9c20"), text='B')
add(4, 'label', Point(10.1357, 4.31809, 0), color=Color.from_hex("#3f9c20"), text='C')
add(4, 'label', Point(17.4, 11.05, 0), color=Color.from_hex("#3f9c20"), text='A_V = C = 16.5 kN')
add(4, 'label', Point(17.4, 10.7, 0), color=Color.from_hex("#3f9c20"), text='B = 36.9 kN')
add(4, 'label', Point(17.4, 10.35, 0), color=Color.from_hex("#3f9c20"), text='R₁ = R₂ = 35 kN')

# step 5 — Eight strips per span
add(5, 'segment', Line((15.582, 9.00659, 0), (14.5139, 8.37267, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(5, 'segment', Line((15.582, 8.73159, 0), (14.5139, 8.37267, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(5, 'segment', Line((15.582, 8.45659, 0), (14.5139, 8.37267, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(5, 'segment', Line((15.582, 8.18159, 0), (14.5139, 8.37267, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(5, 'segment', Line((15.582, 7.90659, 0), (14.5139, 8.37267, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(5, 'segment', Line((15.582, 7.63159, 0), (14.5139, 8.37267, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(5, 'segment', Line((15.582, 7.08159, 0), (14.5139, 6.34052, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(5, 'segment', Line((15.582, 6.80659, 0), (14.5139, 6.34052, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(5, 'segment', Line((15.582, 6.53159, 0), (14.5139, 6.34052, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(5, 'segment', Line((15.582, 6.25659, 0), (14.5139, 6.34052, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(5, 'segment', Line((15.582, 5.98159, 0), (14.5139, 6.34052, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(5, 'segment', Line((15.582, 5.70659, 0), (14.5139, 6.34052, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(5, 'segment', Line((1.10963, 6.01809, 0), (1.66251, 6.48856, 0)), color=Color.from_hex("#1a1eb2"), width=0.0288)
add(5, 'segment', Line((1.66251, 6.48856, 0), (2.21538, 6.81687, 0)), color=Color.from_hex("#1a1eb2"), width=0.0288)
add(5, 'segment', Line((2.21538, 6.81687, 0), (2.76826, 7.00266, 0)), color=Color.from_hex("#1a1eb2"), width=0.0288)
add(5, 'segment', Line((2.76826, 7.00266, 0), (3.32114, 7.0461, 0)), color=Color.from_hex("#1a1eb2"), width=0.0288)
add(5, 'segment', Line((3.32114, 7.0461, 0), (3.87402, 6.9472, 0)), color=Color.from_hex("#1a1eb2"), width=0.0288)
add(5, 'segment', Line((3.87402, 6.9472, 0), (4.4269, 6.70595, 0)), color=Color.from_hex("#1a1eb2"), width=0.0288)
add(5, 'segment', Line((4.4269, 6.70595, 0), (4.97978, 6.32235, 0)), color=Color.from_hex("#1a1eb2"), width=0.0288)
add(5, 'segment', Line((4.97978, 6.32235, 0), (5.53265, 5.79642, 0)), color=Color.from_hex("#1a1eb2"), width=0.0288)
add(5, 'segment', Line((5.53265, 5.79642, 0), (6.08553, 6.32235, 0)), color=Color.from_hex("#1a1eb2"), width=0.0288)
add(5, 'segment', Line((6.08553, 6.32235, 0), (6.63841, 6.70595, 0)), color=Color.from_hex("#1a1eb2"), width=0.0288)
add(5, 'segment', Line((6.63841, 6.70595, 0), (7.19129, 6.9472, 0)), color=Color.from_hex("#1a1eb2"), width=0.0288)
add(5, 'segment', Line((7.19129, 6.9472, 0), (7.74417, 7.0461, 0)), color=Color.from_hex("#1a1eb2"), width=0.0288)
add(5, 'segment', Line((7.74417, 7.0461, 0), (8.29704, 7.00266, 0)), color=Color.from_hex("#1a1eb2"), width=0.0288)
add(5, 'segment', Line((8.29704, 7.00266, 0), (8.84992, 6.81687, 0)), color=Color.from_hex("#1a1eb2"), width=0.0288)
add(5, 'segment', Line((8.84992, 6.81687, 0), (9.4028, 6.48856, 0)), color=Color.from_hex("#1a1eb2"), width=0.0288)
add(5, 'segment', Line((9.4028, 6.48856, 0), (9.95568, 6.01809, 0)), color=Color.from_hex("#1a1eb2"), width=0.0288)

# step 6 — The moment diagram
add(6, 'segment', Line((1.10963, 6.01809, 0), (1.66251, 5.54761, 0)), color=Color.from_hex("#da2020"), width=0.0288)
add(6, 'segment', Line((1.66251, 5.54761, 0), (2.21538, 5.2193, 0)), color=Color.from_hex("#da2020"), width=0.0288)
add(6, 'segment', Line((2.21538, 5.2193, 0), (2.76826, 5.03351, 0)), color=Color.from_hex("#da2020"), width=0.0288)
add(6, 'segment', Line((2.76826, 5.03351, 0), (3.32114, 4.99007, 0)), color=Color.from_hex("#da2020"), width=0.0288)
add(6, 'segment', Line((3.32114, 4.99007, 0), (3.87402, 5.08898, 0)), color=Color.from_hex("#da2020"), width=0.0288)
add(6, 'segment', Line((3.87402, 5.08898, 0), (4.4269, 5.33023, 0)), color=Color.from_hex("#da2020"), width=0.0288)
add(6, 'segment', Line((4.4269, 5.33023, 0), (4.97978, 5.71382, 0)), color=Color.from_hex("#da2020"), width=0.0288)
add(6, 'segment', Line((4.97978, 5.71382, 0), (5.53265, 6.23976, 0)), color=Color.from_hex("#da2020"), width=0.0288)
add(6, 'segment', Line((5.53265, 6.23976, 0), (6.08553, 5.71382, 0)), color=Color.from_hex("#da2020"), width=0.0288)
add(6, 'segment', Line((6.08553, 5.71382, 0), (6.63841, 5.33023, 0)), color=Color.from_hex("#da2020"), width=0.0288)
add(6, 'segment', Line((6.63841, 5.33023, 0), (7.19129, 5.08898, 0)), color=Color.from_hex("#da2020"), width=0.0288)
add(6, 'segment', Line((7.19129, 5.08898, 0), (7.74417, 4.99007, 0)), color=Color.from_hex("#da2020"), width=0.0288)
add(6, 'segment', Line((7.74417, 4.99007, 0), (8.29704, 5.03351, 0)), color=Color.from_hex("#da2020"), width=0.0288)
add(6, 'segment', Line((8.29704, 5.03351, 0), (8.84992, 5.2193, 0)), color=Color.from_hex("#da2020"), width=0.0288)
add(6, 'segment', Line((8.84992, 5.2193, 0), (9.4028, 5.54761, 0)), color=Color.from_hex("#da2020"), width=0.0288)
add(6, 'segment', Line((9.4028, 5.54761, 0), (9.95568, 6.01809, 0)), color=Color.from_hex("#da2020"), width=0.0288)
add(6, 'segment', Line((1.10963, 6.01809, 0), (9.95568, 6.01809, 0)), color=Color.from_hex("#da2020"), width=0.0144)
add(6, 'label', Point(3.32114, 5.29007, 0), color=Color.from_hex("#da2020"), text='M')

# step 7 — The symmetric check
add(7, 'segment', Line((15.582, 9.28159, 0), (16.6501, 8.37267, 0)), color=Color.from_hex("#da2020"), width=0.0144)
add(7, 'segment', Line((15.582, 7.35659, 0), (16.6501, 8.37267, 0)), color=Color.from_hex("#da2020"), width=0.0144)
add(7, 'segment', Line((15.582, 7.35659, 0), (16.6501, 6.34052, 0)), color=Color.from_hex("#da2020"), width=0.0144)
add(7, 'segment', Line((15.582, 5.43159, 0), (16.6501, 6.34052, 0)), color=Color.from_hex("#da2020"), width=0.0144)
add(7, 'arrow', Line((16.6501, 6.34052, 0), (16.6501, 8.37267, 0)), color=Color.from_hex("#3f9c20"), width=0.0324, head=(0.1368, 0.054))
add(7, 'label', Point(16.8501, 7.35659, 0), color=Color.from_hex("#3f9c20"), text='B')


if __name__ == "__main__":
    print("Drawing 40 — Continuous beam, symmetrical —", len(ops), "operations")
