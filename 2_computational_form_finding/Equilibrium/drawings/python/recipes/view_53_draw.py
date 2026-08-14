"""Drawing 53 — Expo Pavillon Lisbon, A. Siza

Auto-generated from ops/view_53.json — the drawing as literal COMPAS
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
add(0, 'label', Point(0.2, 11.8, 0), text='Form Diagram')
add(0, 'label', Point(15.6, 11.8, 0), text='Force Diagram')

# step 1 — The pavilion
add(1, 'image', Polygon([(2.5, 8, 0), (12.6, 8.05, 0), (12.5903, 10.004, 0), (2.4903, 9.954, 0)]), opacity=0.85)
add(1, 'image', Polygon([(3.28506, 7.78573, 0), (3.28506, 3.09642, 0), (6.80123, 3.09642, 0), (6.80123, 7.78573, 0)]), opacity=0.85)
add(1, 'segment', Line((4, 4, 0), (4, 7.39463, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((4, 7.39463, 0), (5.63212, 7.09435, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((5.63212, 7.09435, 0), (5.63212, 7.39463, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((5.63212, 7.39463, 0), (6.43982, 7.39463, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((6.43982, 7.39463, 0), (6.43982, 7.28653, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((6.43982, 7.28653, 0), (5.75982, 7.25653, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((5.75982, 7.25653, 0), (5.75982, 4, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((5.75982, 4, 0), (4, 4, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'polyline', Polyline([(2.24018, 4, 0), (4, 4, 0), (4, 2.30268, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.1)
add(1, 'polygon', Polygon([(3.62279, 10.05, 0), (10.9786, 10.05, 0), (10.9786, 10.45, 0), (3.62279, 10.45, 0)]), color=Color.from_hex("#3f9c20"), opacity=0.13)
add(1, 'segment', Line((3.62279, 10.05, 0), (10.9786, 10.05, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(1, 'segment', Line((10.9786, 10.05, 0), (10.9786, 10.45, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(1, 'segment', Line((10.9786, 10.45, 0), (3.62279, 10.45, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(1, 'segment', Line((3.62279, 10.45, 0), (3.62279, 10.05, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(1, 'label', Point(3.12279, 10.25, 0), color=Color.from_hex("#3f9c20"), text='q')
add(1, 'point', Point(4, 4, 0), color=Color.from_hex("#ffffff"), width=0.09)
add(1, 'label', Point(3.55, 3.85, 0), text='R₂')
add(1, 'point', Point(3.62279, 9.66658, 0), color=Color.from_hex("#ffffff"), width=0.07)
add(1, 'label', Point(3.22279, 9.81658, 0), text='C')
add(1, 'point', Point(10.9786, 9.66658, 0), color=Color.from_hex("#ffffff"), width=0.07)
add(1, 'label', Point(11.1785, 9.81658, 0), text='D')

# step 2 — The roof weight R
add(2, 'arrow', Line((7.30067, 10.4082, 0), (7.30067, 9.75815, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1584, 0.0648))
add(2, 'label', Point(7.50067, 10.0832, 0), color=Color.from_hex("#3f9c20"), text='R')
add(2, 'arrow', Line((21, 11, 0), (21, 9.8, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1584, 0.0648))
add(2, 'label', Point(21.25, 10.4, 0), color=Color.from_hex("#3f9c20"), text='R')
add(2, 'point', Point(21, 11, 0), color=Color.from_hex("#ffffff"), width=0.07)
add(2, 'label', Point(21.15, 11.15, 0), text='G')

# step 3 — Double the sag
add(3, 'point', Point(7.30067, 9.32094, 0), color=Color.from_hex("#ffffff"), width=0.09)
add(3, 'label', Point(7.45067, 9.02094, 0), text='F')
add(3, 'polyline', Polyline([(7.30067, 8.41608, 0), (7.30067, 9.59648, 0)]), color=Color.from_hex("#afafaf"), dash=0.07)
add(3, 'polyline', Polyline([(3.62279, 9.66658, 0), (7.30067, 8.9753, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.14)
add(3, 'polyline', Polyline([(7.30067, 8.9753, 0), (10.9786, 9.66658, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.14)
add(3, 'point', Point(7.30067, 8.9753, 0), color=Color.from_hex("#ffffff"), width=0.06)
add(3, 'label', Point(7.45067, 8.6753, 0), text='E′')

# step 4 — The cable and its triangle
add(4, 'segment', Line((3.62279, 9.66658, 0), (3.92612, 9.61151, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((3.92612, 9.61151, 0), (4.23027, 9.56119, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((4.23027, 9.56119, 0), (4.53517, 9.51562, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((4.53517, 9.51562, 0), (4.84075, 9.47481, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((4.84075, 9.47481, 0), (5.14692, 9.43878, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((5.14692, 9.43878, 0), (5.45362, 9.40754, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((5.45362, 9.40754, 0), (5.76078, 9.3811, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((5.76078, 9.3811, 0), (6.0683, 9.35945, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((6.0683, 9.35945, 0), (6.37613, 9.3426, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((6.37613, 9.3426, 0), (6.68419, 9.33057, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((6.68419, 9.33057, 0), (6.99239, 9.32335, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((6.99239, 9.32335, 0), (7.30067, 9.32094, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((7.30067, 9.32094, 0), (7.60895, 9.32335, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((7.60895, 9.32335, 0), (7.91715, 9.33057, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((7.91715, 9.33057, 0), (8.22521, 9.3426, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((8.22521, 9.3426, 0), (8.53303, 9.35945, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((8.53303, 9.35945, 0), (8.84056, 9.3811, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((8.84056, 9.3811, 0), (9.14771, 9.40754, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((9.14771, 9.40754, 0), (9.45441, 9.43878, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((9.45441, 9.43878, 0), (9.76059, 9.47481, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((9.76059, 9.47481, 0), (10.0662, 9.51562, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((10.0662, 9.51562, 0), (10.3711, 9.56119, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((10.3711, 9.56119, 0), (10.6752, 9.61151, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((10.6752, 9.61151, 0), (10.9786, 9.66658, 0)), color=Color.from_hex("#111111"), width=0.0432)
add(4, 'segment', Line((17.8078, 10.4, 0), (21, 11, 0)), color=Color.from_hex("#ce4095"), width=0.0252)
add(4, 'segment', Line((21, 9.8, 0), (17.8078, 10.4, 0)), color=Color.from_hex("#ce4095"), width=0.0252)
add(4, 'arrow', Line((17.7524, 10.6948, 0), (20.9446, 11.2948, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1584, 0.0648))
add(4, 'arrow', Line((20.9446, 9.50516, 0), (17.7524, 10.1052, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1584, 0.0648))
add(4, 'label', Point(19.1985, 11.2948, 0), color=Color.from_hex("#3f9c20"), text='A')
add(4, 'label', Point(19.1985, 9.45516, 0), color=Color.from_hex("#3f9c20"), text='B')
add(4, 'arrow', Line((3.62279, 9.66658, 0), (2.98397, 9.78665, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1584, 0.0648))
add(4, 'arrow', Line((10.9786, 9.66658, 0), (11.6174, 9.78665, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1584, 0.0648))
add(4, 'point', Point(17.8078, 10.4, 0), color=Color.from_hex("#ffffff"), width=0.07)
add(4, 'label', Point(17.4078, 10.4, 0), text='O')
add(4, 'label', Point(19.4, 11.8, 0), color=Color.from_hex("#3f9c20"), text='A = 27.1, B = 27.1 kN')
add(4, 'label', Point(19.4, 11.35, 0), color=Color.from_hex("#3f9c20"), text='R = 10.0 kN')

# step 5 — The pull walks into the wall
add(5, 'arrow', Line((6.43982, 6.89544, 0), (5.80101, 7.01551, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1584, 0.0648))
add(5, 'label', Point(6.78982, 7.24544, 0), color=Color.from_hex("#3f9c20"), text='A′')
add(5, 'segment', Line((18, 4, 0), (14.8078, 4.6, 0)), color=Color.from_hex("#ce4095"), width=0.0252)
add(5, 'arrow', Line((18, 4, 0), (14.8078, 4.6, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1584, 0.0648))
add(5, 'label', Point(16.5039, 4, 0), color=Color.from_hex("#3f9c20"), text='A′')
add(5, 'segment', Line((6.43982, 6.89544, 0), (4.05, 7.34463, 0)), color=Color.from_hex("#ce4095"), width=0.036)
add(5, 'point', Point(6.43982, 6.89544, 0), color=Color.from_hex("#ffffff"), width=0.06)
add(5, 'label', Point(6.63982, 6.99544, 0), text='Q₁')
add(5, 'point', Point(18, 4, 0), color=Color.from_hex("#ffffff"), width=0.08)

# step 6 — The wall block
add(6, 'segment', Line((4.05, 7.34463, 0), (5.75982, 4, 0)), color=Color.from_hex("#1a1eb2"), width=0.036)
add(6, 'segment', Line((4.05, 7.34463, 0), (4.05, 4, 0)), color=Color.from_hex("#ce4095"), width=0.036)
add(6, 'label', Point(5.10491, 5.77231, 0), color=Color.from_hex("#1a1eb2"), text='1')
add(6, 'label', Point(3.8, 5.67232, 0), color=Color.from_hex("#ce4095"), text='2')
add(6, 'segment', Line((14.8078, 10.1577, 0), (18, 4, 0)), color=Color.from_hex("#1a1eb2"), width=0.0252)
add(6, 'segment', Line((14.8078, 4.6, 0), (14.8078, 10.1577, 0)), color=Color.from_hex("#ce4095"), width=0.0252)
add(6, 'label', Point(16.6539, 7.07883, 0), color=Color.from_hex("#1a1eb2"), text='1')
add(6, 'label', Point(14.5078, 7.37883, 0), color=Color.from_hex("#ce4095"), text='2')
add(6, 'arrow', Line((15.222, 9.35864, 0), (14.8078, 10.1577, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1584, 0.0648))
add(6, 'arrow', Line((14.8078, 11.0577, 0), (14.8078, 10.1577, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1584, 0.0648))
add(6, 'label', Point(15.3078, 9.65765, 0), color=Color.from_hex("#3f9c20"), text='C')
add(6, 'label', Point(14.9578, 10.8077, 0), color=Color.from_hex("#3f9c20"), text='D')
add(6, 'arrow', Line((6.12397, 3.28768, 0), (5.75982, 4, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1584, 0.0648))
add(6, 'arrow', Line((4.05, 4.9, 0), (4.05, 4, 0)), color=Color.from_hex("#3f9c20"), width=0.036, head=(0.1584, 0.0648))
add(6, 'label', Point(6.20982, 3.55, 0), color=Color.from_hex("#3f9c20"), text='C')
add(6, 'label', Point(3.7, 4.5, 0), color=Color.from_hex("#3f9c20"), text='D')


if __name__ == "__main__":
    print("Drawing 53 — Expo Pavillon Lisbon, A. Siza —", len(ops), "operations")
