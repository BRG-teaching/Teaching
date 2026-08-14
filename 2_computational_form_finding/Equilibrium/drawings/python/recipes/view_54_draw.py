"""Drawing 54 — Cathedral of Laon

Auto-generated from ops/view_54.json — the drawing as literal COMPAS
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
add(0, 'label', Point(3.8, 12.05, 0), text='Form Diagram')
add(0, 'label', Point(14.2, 12.05, 0), text='Force Diagram')

# step 1 — The cathedral and the roof load
add(1, 'image', Polygon([(5, 2.6, 0), (10.8, 2.6, 0), (10.8, 11.4666, 0), (5, 11.4666, 0)]), opacity=0.55)
add(1, 'polyline', Polyline([(4.2, 2.75319, 0), (11.6, 2.75319, 0)]), color=Color.from_hex("#9a9a9a"), dash=0.1)
add(1, 'polygon', Polygon([(5.39873, 11.55, 0), (8.08095, 11.55, 0), (8.08095, 11.89, 0), (5.39873, 11.89, 0)]), color=Color.from_hex("#3f9c20"), opacity=0.13)
add(1, 'segment', Line((5.39873, 11.55, 0), (8.08095, 11.55, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(1, 'segment', Line((8.08095, 11.55, 0), (8.08095, 11.89, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(1, 'segment', Line((8.08095, 11.89, 0), (5.39873, 11.89, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(1, 'segment', Line((5.39873, 11.89, 0), (5.39873, 11.55, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(1, 'label', Point(4.84873, 11.72, 0), color=Color.from_hex("#3f9c20"), text='q₁')
add(1, 'arrow', Line((17.1062, 10.6692, 0), (17.1062, 8.66922, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1584, 0.0648))
add(1, 'label', Point(17.3262, 9.66922, 0), color=Color.from_hex("#3f9c20"), text='R₁')
add(1, 'point', Point(5.69873, 11.011, 0), color=Color.from_hex("#ffffff"), width=0.06)
add(1, 'label', Point(5.34873, 11.111, 0), text='A')
add(1, 'point', Point(7.78095, 8.32898, 0), color=Color.from_hex("#ffffff"), width=0.06)
add(1, 'label', Point(7.36095, 8.34898, 0), text='C')
add(1, 'point', Point(9.24248, 7.08837, 0), color=Color.from_hex("#ffffff"), width=0.06)
add(1, 'label', Point(9.40248, 7.16837, 0), text='E')
add(1, 'point', Point(7.78095, 4.986, 0), color=Color.from_hex("#ffffff"), width=0.06)
add(1, 'label', Point(7.40095, 4.936, 0), text='F')
add(1, 'point', Point(9.6316, 4.986, 0), color=Color.from_hex("#ffffff"), width=0.06)
add(1, 'label', Point(9.7916, 4.936, 0), text='H')
add(1, 'point', Point(10.1909, 2.75319, 0), color=Color.from_hex("#ffffff"), width=0.06)
add(1, 'label', Point(10.3509, 2.65319, 0), text='J')
add(1, 'point', Point(17.1062, 10.6692, 0), color=Color.from_hex("#ffffff"), width=0.07)
add(1, 'label', Point(17.2662, 10.7892, 0), text='K')

# step 2 — The flyer’s sag
add(2, 'polyline', Polyline([(6.73984, 9.77, 0), (6.73984, 11.17, 0)]), color=Color.from_hex("#afafaf"), dash=0.07)
add(2, 'point', Point(6.73984, 10.3405, 0), color=Color.from_hex("#ffffff"), width=0.08)
add(2, 'label', Point(6.89984, 10.4005, 0), text='B')
add(2, 'polyline', Polyline([(5.69873, 11.011, 0), (6.73984, 11.011, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.14)
add(2, 'polyline', Polyline([(6.73984, 11.011, 0), (7.78095, 8.32898, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.14)

# step 3 — The flyer’s thrust line
add(3, 'segment', Line((17.1062, 10.6692, 0), (16.3299, 10.6692, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(3, 'segment', Line((17.1062, 10.5026, 0), (16.3299, 10.6692, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(3, 'segment', Line((17.1062, 10.3359, 0), (16.3299, 10.6692, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(3, 'segment', Line((17.1062, 10.1692, 0), (16.3299, 10.6692, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(3, 'segment', Line((17.1062, 10.0026, 0), (16.3299, 10.6692, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(3, 'segment', Line((17.1062, 9.83589, 0), (16.3299, 10.6692, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(3, 'segment', Line((17.1062, 9.66922, 0), (16.3299, 10.6692, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(3, 'segment', Line((17.1062, 9.50255, 0), (16.3299, 10.6692, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(3, 'segment', Line((17.1062, 9.33589, 0), (16.3299, 10.6692, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(3, 'segment', Line((17.1062, 9.16922, 0), (16.3299, 10.6692, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(3, 'segment', Line((17.1062, 9.00255, 0), (16.3299, 10.6692, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(3, 'segment', Line((17.1062, 8.83589, 0), (16.3299, 10.6692, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(3, 'segment', Line((17.1062, 8.66922, 0), (16.3299, 10.6692, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(3, 'point', Point(16.3299, 10.6692, 0), color=Color.from_hex("#ffffff"), width=0.05)
add(3, 'label', Point(15.9299, 10.7192, 0), text='M')
add(3, 'segment', Line((5.69873, 11.011, 0), (5.78549, 11.011, 0)), color=Color.from_hex("#111111"), width=0.036)
add(3, 'segment', Line((5.78549, 11.011, 0), (5.95901, 10.9738, 0)), color=Color.from_hex("#111111"), width=0.036)
add(3, 'segment', Line((5.95901, 10.9738, 0), (6.13252, 10.8993, 0)), color=Color.from_hex("#111111"), width=0.036)
add(3, 'segment', Line((6.13252, 10.8993, 0), (6.30604, 10.7875, 0)), color=Color.from_hex("#111111"), width=0.036)
add(3, 'segment', Line((6.30604, 10.7875, 0), (6.47956, 10.6385, 0)), color=Color.from_hex("#111111"), width=0.036)
add(3, 'segment', Line((6.47956, 10.6385, 0), (6.65308, 10.4523, 0)), color=Color.from_hex("#111111"), width=0.036)
add(3, 'segment', Line((6.65308, 10.4523, 0), (6.8266, 10.2288, 0)), color=Color.from_hex("#111111"), width=0.036)
add(3, 'segment', Line((6.8266, 10.2288, 0), (7.00011, 9.968, 0)), color=Color.from_hex("#111111"), width=0.036)
add(3, 'segment', Line((7.00011, 9.968, 0), (7.17363, 9.67, 0)), color=Color.from_hex("#111111"), width=0.036)
add(3, 'segment', Line((7.17363, 9.67, 0), (7.34715, 9.33474, 0)), color=Color.from_hex("#111111"), width=0.036)
add(3, 'segment', Line((7.34715, 9.33474, 0), (7.52067, 8.96224, 0)), color=Color.from_hex("#111111"), width=0.036)
add(3, 'segment', Line((7.52067, 8.96224, 0), (7.69419, 8.55249, 0)), color=Color.from_hex("#111111"), width=0.036)
add(3, 'segment', Line((7.69419, 8.55249, 0), (7.78095, 8.32898, 0)), color=Color.from_hex("#111111"), width=0.036)
add(3, 'label', Point(17.9, 12.05, 0), color=Color.from_hex("#3f9c20"), text='R₁ = 2.0')
add(3, 'label', Point(17.9, 11.7, 0), color=Color.from_hex("#3f9c20"), text='R₂ = 2.92')
add(3, 'label', Point(17.9, 11.35, 0), color=Color.from_hex("#3f9c20"), text='R₃ = 2.67')

# step 4 — Onto the buttress
add(4, 'polygon', Polygon([(7.53095, 8.9, 0), (9.54248, 8.9, 0), (9.54248, 9.24, 0), (7.53095, 9.24, 0)]), color=Color.from_hex("#3f9c20"), opacity=0.13)
add(4, 'segment', Line((7.53095, 8.9, 0), (9.54248, 8.9, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(4, 'segment', Line((9.54248, 8.9, 0), (9.54248, 9.24, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(4, 'segment', Line((9.54248, 9.24, 0), (7.53095, 9.24, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(4, 'segment', Line((7.53095, 9.24, 0), (7.53095, 8.9, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(4, 'label', Point(9.74248, 9.06, 0), color=Color.from_hex("#3f9c20"), text='q₂')
add(4, 'arrow', Line((17.1062, 8.66922, 0), (17.1062, 5.75147, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1584, 0.0648))
add(4, 'label', Point(17.3262, 7.21035, 0), color=Color.from_hex("#3f9c20"), text='R₂')

# step 5 — The buttress sag
add(5, 'polyline', Polyline([(8.51171, 7.80868, 0), (8.51171, 9.20868, 0)]), color=Color.from_hex("#afafaf"), dash=0.07)
add(5, 'point', Point(8.51171, 8.39528, 0), color=Color.from_hex("#ffffff"), width=0.08)
add(5, 'label', Point(8.67171, 8.45528, 0), text='D')
add(5, 'polyline', Polyline([(7.78095, 8.32898, 0), (8.51171, 9.08188, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.14)
add(5, 'polyline', Polyline([(8.51171, 9.08188, 0), (9.24248, 7.08837, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.14)

# step 6 — The buttress thrust — the poles align
add(6, 'segment', Line((17.1062, 8.66922, 0), (16.3299, 7.86935, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(6, 'segment', Line((17.1062, 8.42608, 0), (16.3299, 7.86935, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(6, 'segment', Line((17.1062, 8.18293, 0), (16.3299, 7.86935, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(6, 'segment', Line((17.1062, 7.93978, 0), (16.3299, 7.86935, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(6, 'segment', Line((17.1062, 7.69664, 0), (16.3299, 7.86935, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(6, 'segment', Line((17.1062, 7.45349, 0), (16.3299, 7.86935, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(6, 'segment', Line((17.1062, 7.21035, 0), (16.3299, 7.86935, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(6, 'segment', Line((17.1062, 6.9672, 0), (16.3299, 7.86935, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(6, 'segment', Line((17.1062, 6.72405, 0), (16.3299, 7.86935, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(6, 'segment', Line((17.1062, 6.48091, 0), (16.3299, 7.86935, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(6, 'segment', Line((17.1062, 6.23776, 0), (16.3299, 7.86935, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(6, 'segment', Line((17.1062, 5.99461, 0), (16.3299, 7.86935, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(6, 'segment', Line((17.1062, 5.75147, 0), (16.3299, 7.86935, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(6, 'point', Point(16.3299, 7.86935, 0), color=Color.from_hex("#ffffff"), width=0.05)
add(6, 'label', Point(15.9299, 7.91935, 0), text='N')
add(6, 'polyline', Polyline([(16.3299, 10.9692, 0), (16.3299, 3.91813, 0)]), color=Color.from_hex("#bdbdbd"), dash=0.08)
add(6, 'segment', Line((7.78095, 8.32898, 0), (7.84184, 8.39172, 0)), color=Color.from_hex("#111111"), width=0.036)
add(6, 'segment', Line((7.84184, 8.39172, 0), (7.96364, 8.47906, 0)), color=Color.from_hex("#111111"), width=0.036)
add(6, 'segment', Line((7.96364, 8.47906, 0), (8.08543, 8.52826, 0)), color=Color.from_hex("#111111"), width=0.036)
add(6, 'segment', Line((8.08543, 8.52826, 0), (8.20723, 8.53931, 0)), color=Color.from_hex("#111111"), width=0.036)
add(6, 'segment', Line((8.20723, 8.53931, 0), (8.32902, 8.51221, 0)), color=Color.from_hex("#111111"), width=0.036)
add(6, 'segment', Line((8.32902, 8.51221, 0), (8.45082, 8.44697, 0)), color=Color.from_hex("#111111"), width=0.036)
add(6, 'segment', Line((8.45082, 8.44697, 0), (8.57261, 8.34359, 0)), color=Color.from_hex("#111111"), width=0.036)
add(6, 'segment', Line((8.57261, 8.34359, 0), (8.6944, 8.20206, 0)), color=Color.from_hex("#111111"), width=0.036)
add(6, 'segment', Line((8.6944, 8.20206, 0), (8.8162, 8.02238, 0)), color=Color.from_hex("#111111"), width=0.036)
add(6, 'segment', Line((8.8162, 8.02238, 0), (8.93799, 7.80457, 0)), color=Color.from_hex("#111111"), width=0.036)
add(6, 'segment', Line((8.93799, 7.80457, 0), (9.05979, 7.54861, 0)), color=Color.from_hex("#111111"), width=0.036)
add(6, 'segment', Line((9.05979, 7.54861, 0), (9.18158, 7.2545, 0)), color=Color.from_hex("#111111"), width=0.036)
add(6, 'segment', Line((9.18158, 7.2545, 0), (9.24248, 7.08837, 0)), color=Color.from_hex("#111111"), width=0.036)
add(6, 'point', Point(17.1062, 5.75147, 0), color=Color.from_hex("#ffffff"), width=0.05)
add(6, 'label', Point(17.2862, 5.75147, 0), text='O')

# step 7 — Straight to the arch
add(7, 'segment', Line((7.78095, 8.32898, 0), (7.78095, 4.986, 0)), color=Color.from_hex("#111111"), width=0.036)
add(7, 'segment', Line((9.24248, 7.08837, 0), (9.6316, 4.986, 0)), color=Color.from_hex("#111111"), width=0.036)
add(7, 'segment', Line((16.3299, 7.86935, 0), (17.1062, 3.67476, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(7, 'point', Point(17.1062, 3.67476, 0), color=Color.from_hex("#ffffff"), width=0.05)
add(7, 'label', Point(17.2862, 3.67476, 0), text='P')

# step 8 — The nave vault q₃
add(8, 'polygon', Polygon([(7.58095, 6.65, 0), (9.8316, 6.65, 0), (9.8316, 6.99, 0), (7.58095, 6.99, 0)]), color=Color.from_hex("#3f9c20"), opacity=0.13)
add(8, 'segment', Line((7.58095, 6.65, 0), (9.8316, 6.65, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(8, 'segment', Line((9.8316, 6.65, 0), (9.8316, 6.99, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(8, 'segment', Line((9.8316, 6.99, 0), (7.58095, 6.99, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(8, 'segment', Line((7.58095, 6.99, 0), (7.58095, 6.65, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(8, 'label', Point(10.0716, 6.82, 0), color=Color.from_hex("#3f9c20"), text='q₃')
add(8, 'arrow', Line((17.1062, 5.75147, 0), (17.1062, 3.0848, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1584, 0.0648))
add(8, 'label', Point(17.3262, 4.41813, 0), color=Color.from_hex("#3f9c20"), text='R₃')

# step 9 — The arch sag
add(9, 'polyline', Polyline([(8.70627, 5.086, 0), (8.70627, 6.486, 0)]), color=Color.from_hex("#afafaf"), dash=0.07)
add(9, 'point', Point(8.70627, 5.78059, 0), color=Color.from_hex("#ffffff"), width=0.08)
add(9, 'label', Point(8.86627, 5.84059, 0), text='G')
add(9, 'polyline', Polyline([(7.78095, 4.986, 0), (8.70627, 6.57518, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.14)
add(9, 'polyline', Polyline([(8.70627, 6.57518, 0), (9.6316, 4.986, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.14)

# step 10 — The arch thrust
add(10, 'segment', Line((17.1062, 5.75147, 0), (16.3299, 4.41813, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(10, 'segment', Line((17.1062, 5.52925, 0), (16.3299, 4.41813, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(10, 'segment', Line((17.1062, 5.30702, 0), (16.3299, 4.41813, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(10, 'segment', Line((17.1062, 5.0848, 0), (16.3299, 4.41813, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(10, 'segment', Line((17.1062, 4.86258, 0), (16.3299, 4.41813, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(10, 'segment', Line((17.1062, 4.64035, 0), (16.3299, 4.41813, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(10, 'segment', Line((17.1062, 4.41813, 0), (16.3299, 4.41813, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(10, 'segment', Line((17.1062, 4.19591, 0), (16.3299, 4.41813, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(10, 'segment', Line((17.1062, 3.97369, 0), (16.3299, 4.41813, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(10, 'segment', Line((17.1062, 3.75146, 0), (16.3299, 4.41813, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(10, 'segment', Line((17.1062, 3.52924, 0), (16.3299, 4.41813, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(10, 'segment', Line((17.1062, 3.30702, 0), (16.3299, 4.41813, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(10, 'segment', Line((17.1062, 3.0848, 0), (16.3299, 4.41813, 0)), color=Color.from_hex("#aaaaaa"), width=0.00864)
add(10, 'point', Point(16.3299, 4.41813, 0), color=Color.from_hex("#ffffff"), width=0.05)
add(10, 'label', Point(15.8499, 4.46813, 0), text='M₃')
add(10, 'segment', Line((7.78095, 4.986, 0), (7.85806, 5.11843, 0)), color=Color.from_hex("#111111"), width=0.036)
add(10, 'segment', Line((7.85806, 5.11843, 0), (8.01228, 5.33915, 0)), color=Color.from_hex("#111111"), width=0.036)
add(10, 'segment', Line((8.01228, 5.33915, 0), (8.1665, 5.51572, 0)), color=Color.from_hex("#111111"), width=0.036)
add(10, 'segment', Line((8.1665, 5.51572, 0), (8.32072, 5.64816, 0)), color=Color.from_hex("#111111"), width=0.036)
add(10, 'segment', Line((8.32072, 5.64816, 0), (8.47494, 5.73644, 0)), color=Color.from_hex("#111111"), width=0.036)
add(10, 'segment', Line((8.47494, 5.73644, 0), (8.62916, 5.78059, 0)), color=Color.from_hex("#111111"), width=0.036)
add(10, 'segment', Line((8.62916, 5.78059, 0), (8.78338, 5.78059, 0)), color=Color.from_hex("#111111"), width=0.036)
add(10, 'segment', Line((8.78338, 5.78059, 0), (8.9376, 5.73644, 0)), color=Color.from_hex("#111111"), width=0.036)
add(10, 'segment', Line((8.9376, 5.73644, 0), (9.09183, 5.64816, 0)), color=Color.from_hex("#111111"), width=0.036)
add(10, 'segment', Line((9.09183, 5.64816, 0), (9.24605, 5.51572, 0)), color=Color.from_hex("#111111"), width=0.036)
add(10, 'segment', Line((9.24605, 5.51572, 0), (9.40027, 5.33915, 0)), color=Color.from_hex("#111111"), width=0.036)
add(10, 'segment', Line((9.40027, 5.33915, 0), (9.55449, 5.11843, 0)), color=Color.from_hex("#111111"), width=0.036)
add(10, 'segment', Line((9.55449, 5.11843, 0), (9.6316, 4.986, 0)), color=Color.from_hex("#111111"), width=0.036)

# step 11 — Into the ground
add(11, 'segment', Line((7.78095, 4.986, 0), (7.48454, 2.75319, 0)), color=Color.from_hex("#111111"), width=0.036)
add(11, 'segment', Line((9.6316, 4.986, 0), (10.1909, 2.75319, 0)), color=Color.from_hex("#111111"), width=0.036)
add(11, 'point', Point(7.48454, 2.75319, 0), color=Color.from_hex("#ffffff"), width=0.08)
add(11, 'label', Point(7.13454, 2.63319, 0), text='I')
add(11, 'arrow', Line((7.3661, 1.86101, 0), (7.47138, 2.65406, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1584, 0.0648))
add(11, 'arrow', Line((10.4096, 1.88016, 0), (10.2152, 2.65618, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1584, 0.0648))
add(11, 'arrow', Line((16.4481, 5.71197, 0), (17.1062, 10.6692, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1584, 0.0648))
add(11, 'arrow', Line((17.1062, 3.0848, 0), (16.4481, 5.71197, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1584, 0.0648))
add(11, 'label', Point(7.38584, 2.00971, 0), color=Color.from_hex("#3f9c20"), text='Rᴵ')
add(11, 'label', Point(10.3731, 2.02566, 0), color=Color.from_hex("#3f9c20"), text='Rᴶ')


if __name__ == "__main__":
    print("Drawing 54 — Cathedral of Laon —", len(ops), "operations")
