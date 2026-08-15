"""EX 9.1 — where does each support’s load come from?

Auto-generated from ops/ex9_1.json — the drawing as literal COMPAS
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


# step 0 — The exercise
add(0, 'label', Point(13.5, 5.75, 0), text='a) plate 1 — two walls on opposite edges')
add(0, 'label', Point(11.5, 15.628, 0), text='the ten plates of task 1')

# step 1 — The plates
add(1, 'segment', Line((-3.992, 13.492, 0), (-0.208, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-0.208, 13.492, 0), (-0.208, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-0.208, 9.708, 0), (-3.992, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-3.992, 9.708, 0), (-3.992, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-3.992, 13.492, 0), (-3.7082, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-3.7082, 13.492, 0), (-3.7082, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-3.7082, 9.708, 0), (-3.992, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-3.992, 9.708, 0), (-3.992, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-0.4918, 13.492, 0), (-0.208, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-0.208, 13.492, 0), (-0.208, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-0.208, 9.708, 0), (-0.4918, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-0.4918, 9.708, 0), (-0.4918, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'label', Point(-2.1, 7.872, 0), color=Color.from_hex("#aaaaaa"), text='a1')
add(1, 'segment', Line((2.808, 13.492, 0), (6.592, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((6.592, 13.492, 0), (6.592, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((6.592, 9.708, 0), (2.808, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((2.808, 9.708, 0), (2.808, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((2.808, 13.492, 0), (3.0918, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((3.0918, 13.492, 0), (3.0918, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((3.0918, 9.708, 0), (2.808, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((2.808, 9.708, 0), (2.808, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((6.3082, 13.492, 0), (6.592, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((6.592, 13.492, 0), (6.592, 13.2082, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((6.592, 13.2082, 0), (6.3082, 13.2082, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((6.3082, 13.2082, 0), (6.3082, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((6.3082, 9.9918, 0), (6.592, 9.9918, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((6.592, 9.9918, 0), (6.592, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((6.592, 9.708, 0), (6.3082, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((6.3082, 9.708, 0), (6.3082, 9.9918, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'label', Point(4.7, 7.872, 0), color=Color.from_hex("#aaaaaa"), text='a2')
add(1, 'segment', Line((9.608, 13.492, 0), (13.392, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((13.392, 13.492, 0), (13.392, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((13.392, 9.708, 0), (9.608, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((9.608, 9.708, 0), (9.608, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((9.608, 13.492, 0), (9.8918, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((9.8918, 13.492, 0), (9.8918, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((9.8918, 9.708, 0), (9.608, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((9.608, 9.708, 0), (9.608, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((9.8918, 13.492, 0), (13.392, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((13.392, 13.492, 0), (13.392, 13.2082, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((13.392, 13.2082, 0), (9.8918, 13.2082, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((9.8918, 13.2082, 0), (9.8918, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((13.1082, 9.9918, 0), (13.392, 9.9918, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((13.392, 9.9918, 0), (13.392, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((13.392, 9.708, 0), (13.1082, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((13.1082, 9.708, 0), (13.1082, 9.9918, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'label', Point(11.5, 7.872, 0), color=Color.from_hex("#aaaaaa"), text='a3')
add(1, 'segment', Line((16.408, 13.492, 0), (20.192, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((20.192, 13.492, 0), (20.192, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((20.192, 9.708, 0), (16.408, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((16.408, 9.708, 0), (16.408, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((16.408, 13.492, 0), (16.6918, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((16.6918, 13.492, 0), (16.6918, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((16.6918, 9.708, 0), (16.408, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((16.408, 9.708, 0), (16.408, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((16.6918, 13.492, 0), (19.9082, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((19.9082, 13.492, 0), (19.9082, 13.2082, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((19.9082, 13.2082, 0), (16.6918, 13.2082, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((16.6918, 13.2082, 0), (16.6918, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((19.9082, 13.2082, 0), (20.192, 13.2082, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((20.192, 13.2082, 0), (20.192, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((20.192, 9.708, 0), (19.9082, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((19.9082, 9.708, 0), (19.9082, 13.2082, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'label', Point(18.3, 7.872, 0), color=Color.from_hex("#aaaaaa"), text='a4')
add(1, 'segment', Line((23.208, 13.492, 0), (26.992, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((26.992, 13.492, 0), (26.992, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((26.992, 9.708, 0), (23.208, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((23.208, 9.708, 0), (23.208, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((23.208, 13.492, 0), (23.4918, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((23.4918, 13.492, 0), (23.4918, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((23.4918, 9.708, 0), (23.208, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((23.208, 9.708, 0), (23.208, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((23.4918, 13.492, 0), (26.7082, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((26.7082, 13.492, 0), (26.7082, 13.2082, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((26.7082, 13.2082, 0), (23.4918, 13.2082, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((23.4918, 13.2082, 0), (23.4918, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((26.7082, 13.492, 0), (26.992, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((26.992, 13.492, 0), (26.992, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((26.992, 9.708, 0), (26.7082, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((26.7082, 9.708, 0), (26.7082, 13.492, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((23.4918, 9.9918, 0), (26.7082, 9.9918, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((26.7082, 9.9918, 0), (26.7082, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((26.7082, 9.708, 0), (23.4918, 9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((23.4918, 9.708, 0), (23.4918, 9.9918, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'label', Point(25.1, 7.872, 0), color=Color.from_hex("#aaaaaa"), text='a5')
add(1, 'segment', Line((-5.4, 8.872, 0), (1.2, 8.872, 0)), color=Color.from_hex("#3f9c20"), width=0.06048)
add(1, 'segment', Line((1.2, 8.872, 0), (1.2, 14.328, 0)), color=Color.from_hex("#3f9c20"), width=0.06048)
add(1, 'segment', Line((1.2, 14.328, 0), (-5.4, 14.328, 0)), color=Color.from_hex("#3f9c20"), width=0.06048)
add(1, 'segment', Line((-5.4, 14.328, 0), (-5.4, 8.872, 0)), color=Color.from_hex("#3f9c20"), width=0.06048)
add(1, 'segment', Line((3.75, 2.75, 0), (23.25, 2.75, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((23.25, 2.75, 0), (23.25, -16.75, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((23.25, -16.75, 0), (3.75, -16.75, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((3.75, -16.75, 0), (3.75, 2.75, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'polygon', Polygon([(3.75, 2.75, 0), (5.2125, 2.75, 0), (5.2125, -16.75, 0), (3.75, -16.75, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(21.7875, 2.75, 0), (23.25, 2.75, 0), (23.25, -16.75, 0), (21.7875, -16.75, 0)]), color=Color.from_hex("#111111"))

# step 2 — Halve the distance
add(2, 'segment', Line((4.48125, -13.24, 0), (13.5, -13.24, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(2, 'segment', Line((4.48125, -13.94, 0), (4.48125, -12.54, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(2, 'segment', Line((13.5, -13.94, 0), (13.5, -12.54, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(2, 'segment', Line((13.5, -13.24, 0), (22.5188, -13.24, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(2, 'segment', Line((13.5, -13.94, 0), (13.5, -12.54, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(2, 'segment', Line((22.5188, -13.94, 0), (22.5188, -12.54, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(2, 'label', Point(8.99062, -14.49, 0), color=Color.from_hex("#aaaaaa"), text='0.463')
add(2, 'label', Point(18.0094, -14.49, 0), color=Color.from_hex("#aaaaaa"), text='0.463')

# step 3 — The boundaries
add(3, 'segment', Line((13.5, 2.75, 0), (13.5, -16.75, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(3, 'segment', Line((13.5, -16.75, 0), (13.5, 2.75, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)

# step 4 — The areas
add(4, 'polygon', Polygon([(3.75, 2.75, 0), (13.5, 2.75, 0), (13.5, -16.75, 0), (3.75, -16.75, 0)]), color=Color.from_hex("#3f9c20"), opacity=0.13)
add(4, 'label', Point(8.625, -7, 0), color=Color.from_hex("#3f9c20"), text='0.500')
add(4, 'polygon', Polygon([(13.5, 2.75, 0), (23.25, 2.75, 0), (23.25, -16.75, 0), (13.5, -16.75, 0)]), color=Color.from_hex("#3f9c20"), opacity=0.13)
add(4, 'label', Point(18.375, -7, 0), color=Color.from_hex("#3f9c20"), text='0.500')

# step 6 — The check that costs nothing
add(6, 'label', Point(13.5, -19.15, 0), color=Color.from_hex("#111111"), text='Σ = 1.0000 a² = the whole plate (1.00 × 1.00) ✓')


if __name__ == "__main__":
    print("EX 9.1 — where does each support’s load come from? —", len(ops), "operations")
