"""EX 10.1 — three walls, and whether they hold

Auto-generated from ops/ex10_1.json — the drawing as literal COMPAS
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
add(0, 'label', Point(10, 14.6, 0), text='the six layouts of the sheet')
add(0, 'label', Point(-29.6, -7.7, 0), text='panel e) — enlarged')

# step 1 — The six layouts
add(1, 'segment', Line((-2, 1, 0), (4, 1, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'segment', Line((4, 1, 0), (4, 13, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'segment', Line((4, 13, 0), (-2, 13, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'segment', Line((-2, 13, 0), (-2, 1, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'polygon', Polygon([(4.001, 1, 0), (4.001, 13, 0), (3.801, 13, 0), (3.801, 1, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(-2, 0.99996, 0), (4, 0.99996, 0), (4, 1.19996, 0), (-2, 1.19996, 0)]), color=Color.from_hex("#111111"))
add(1, 'segment', Line((7, 1, 0), (13, 1, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'segment', Line((13, 1, 0), (13, 13, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'segment', Line((13, 13, 0), (7, 13, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'segment', Line((7, 13, 0), (7, 1, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'polygon', Polygon([(8.5, 8.4, 0), (11.5, 8.4, 0), (11.5, 8.6, 0), (8.5, 8.6, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(8.5, 5.4, 0), (11.5, 5.4, 0), (11.5, 5.6, 0), (8.5, 5.6, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(11.6, 5.5, 0), (11.6, 8.5, 0), (11.4, 8.5, 0), (11.4, 5.5, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(8.6, 5.5, 0), (8.6, 6.1072, 0), (8.4, 6.1072, 0), (8.4, 5.5, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(8.6, 7.8928, 0), (8.6, 8.5, 0), (8.4, 8.5, 0), (8.4, 7.8928, 0)]), color=Color.from_hex("#111111"))
add(1, 'segment', Line((16, 1, 0), (22, 1, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'segment', Line((22, 1, 0), (22, 13, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'segment', Line((22, 13, 0), (16, 13, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'segment', Line((16, 13, 0), (16, 1, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'polygon', Polygon([(16, 6.9, 0), (22, 6.9, 0), (22, 7.1, 0), (16, 7.1, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(19.1, 9.22, 0), (19.1, 13, 0), (18.9, 13, 0), (18.9, 9.22, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(19.1, 1, 0), (19.1, 4.78, 0), (18.9, 4.78, 0), (18.9, 1, 0)]), color=Color.from_hex("#111111"))
add(1, 'segment', Line((-2, -15, 0), (4, -15, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'segment', Line((4, -15, 0), (4, -3, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'segment', Line((4, -3, 0), (-2, -3, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'segment', Line((-2, -3, 0), (-2, -15, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'polygon', Polygon([(-0.5, -3.19996, 0), (2.5, -3.19996, 0), (2.5, -2.99996, 0), (-0.5, -2.99996, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(-0.5, -15, 0), (2.5, -15, 0), (2.5, -14.8, 0), (-0.5, -14.8, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(-0.702644, -7.51078, 0), (2.49536, -10.7028, 0), (2.63664, -10.5612, 0), (-0.561356, -7.36922, 0)]), color=Color.from_hex("#111111"))
add(1, 'segment', Line((7, -15, 0), (13, -15, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'segment', Line((13, -15, 0), (13, -3, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'segment', Line((13, -3, 0), (7, -3, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'segment', Line((7, -3, 0), (7, -15, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'polygon', Polygon([(7, -9.1, 0), (13, -9.1, 0), (13, -8.9, 0), (7, -8.9, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(8.0162, -3.19354, 0), (11.8802, -5.53354, 0), (11.9838, -5.36246, 0), (8.1198, -3.02246, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(8.1198, -14.9775, 0), (11.9838, -12.6375, 0), (11.8802, -12.4665, 0), (8.0162, -14.8065, 0)]), color=Color.from_hex("#111111"))
add(1, 'segment', Line((16, -15, 0), (22, -15, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'segment', Line((22, -15, 0), (22, -3, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'segment', Line((22, -3, 0), (16, -3, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'segment', Line((16, -3, 0), (16, -15, 0)), color=Color.from_hex("#111111"), width=0.06696)
add(1, 'polygon', Polygon([(16, -3.19996, 0), (22, -3.19996, 0), (22, -2.99996, 0), (16, -2.99996, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(16, -15, 0), (22, -15, 0), (22, -14.8, 0), (16, -14.8, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(16.2, -9, 0), (16.2, -3, 0), (16, -3, 0), (16, -9, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(22, -15, 0), (22, -9, 0), (21.8, -9, 0), (21.8, -15, 0)]), color=Color.from_hex("#111111"))

# step 2 — One panel, enlarged
add(2, 'segment', Line((-33, -6.2, 0), (-26.2, -6.2, 0)), color=Color.from_hex("#111111"), width=0.077584)
add(2, 'segment', Line((-26.2, -6.2, 0), (-26.2, 7.4, 0)), color=Color.from_hex("#111111"), width=0.077584)
add(2, 'segment', Line((-26.2, 7.4, 0), (-33, 7.4, 0)), color=Color.from_hex("#111111"), width=0.077584)
add(2, 'segment', Line((-33, 7.4, 0), (-33, -6.2, 0)), color=Color.from_hex("#111111"), width=0.077584)
add(2, 'polygon', Polygon([(-33, 0.486667, 0), (-26.2, 0.486667, 0), (-26.2, 0.713333, 0), (-33, 0.713333, 0)]), color=Color.from_hex("#111111"))
add(2, 'polygon', Polygon([(-31.8483, 7.18066, 0), (-27.4691, 4.52866, 0), (-27.3517, 4.72254, 0), (-31.7309, 7.37454, 0)]), color=Color.from_hex("#111111"))
add(2, 'polygon', Polygon([(-31.7309, -6.17454, 0), (-27.3517, -3.52254, 0), (-27.4691, -3.32866, 0), (-31.8483, -5.98066, 0)]), color=Color.from_hex("#111111"))
add(2, 'point', Point(-29.6, 0.6, 0), color=Color.from_hex("#ffffff"), width=0.36704)
add(2, 'point', Point(-29.6, 5.9516, 0), color=Color.from_hex("#ffffff"), width=0.36704)
add(2, 'point', Point(-29.6, -4.7516, 0), color=Color.from_hex("#ffffff"), width=0.36704)
add(2, 'label', Point(-29.6, -10.3, 0), text='drag any pink handle — the verdict recomputes')

# step 3 — Extend the axes
add(3, 'polyline', Polyline([(-40, 0.6, 0), (-14.5, 0.6, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3658)
add(3, 'polyline', Polyline([(-32.9825, 8, 0), (-14.5, -3.19281, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3658)
add(3, 'polyline', Polyline([(-33.3127, -7, 0), (-14.5, 4.39281, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3658)

# step 4 — They all meet — it does not hold
add(4, 'point', Point(-20.763, 0.6, 0), color=Color.from_hex("#ffffff"), width=0.52762)
add(4, 'label', Point(-20.763, 1.9, 0), color=Color.from_hex("#ce4095"), text='pole (1.80, 0.50)')
add(4, 'segment', Line((-26.2, -0.42, 0), (-20.763, -0.42, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(4, 'segment', Line((-26.2, 0.6, 0), (-26.2, -0.675, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(4, 'segment', Line((-20.763, 0.6, 0), (-20.763, -0.675, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(4, 'segment', Line((-26.4404, -0.660416, 0), (-25.9596, -0.179584, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(4, 'segment', Line((-21.0034, -0.660416, 0), (-20.5226, -0.179584, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(4, 'label', Point(-23.4815, -1.372, 0), color=Color.from_hex("#aaaaaa"), text='0.80 panel-widths off the edge')
add(4, 'label', Point(-29.6, -9, 0), color=Color.from_hex("#ce4095"), text='✗ the bracing does NOT work')

# step 5 — Now all six
add(5, 'polyline', Polyline([(3.901, -0.56, 0), (3.901, 14.56, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.1829)
add(5, 'polyline', Polyline([(-3.56, 1.09996, 0), (5.56, 1.09996, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.1829)
add(5, 'polyline', Polyline([(5.44, 8.5, 0), (14.56, 8.5, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.1829)
add(5, 'polyline', Polyline([(5.44, 5.5, 0), (14.56, 5.5, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.1829)
add(5, 'polyline', Polyline([(11.5, -0.56, 0), (11.5, 14.56, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.1829)
add(5, 'polyline', Polyline([(8.5, -0.56, 0), (8.5, 14.56, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.1829)
add(5, 'polyline', Polyline([(14.44, 7, 0), (23.56, 7, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.1829)
add(5, 'polyline', Polyline([(19, -0.56, 0), (19, 14.56, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.1829)
add(5, 'polyline', Polyline([(19, -0.56, 0), (19, 14.56, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.1829)
add(5, 'polyline', Polyline([(-3.56, -3.09996, 0), (5.56, -3.09996, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.1829)
add(5, 'polyline', Polyline([(-3.56, -14.9, 0), (5.56, -14.9, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.1829)
add(5, 'polyline', Polyline([(-3.56, -4.51749, 0), (5.56, -13.6204, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.1829)
add(5, 'polyline', Polyline([(5.44, -9, 0), (14.56, -9, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.1829)
add(5, 'polyline', Polyline([(5.44, -1.51651, 0), (14.56, -7.03949, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.1829)
add(5, 'polyline', Polyline([(5.44, -16.4835, 0), (14.56, -10.9605, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.1829)
add(5, 'polyline', Polyline([(14.44, -3.09996, 0), (23.56, -3.09996, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.1829)
add(5, 'polyline', Polyline([(14.44, -14.9, 0), (23.56, -14.9, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.1829)
add(5, 'polyline', Polyline([(16.1, -16.56, 0), (16.1, -1.44, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.1829)
add(5, 'polyline', Polyline([(21.9, -16.56, 0), (21.9, -1.44, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.1829)

# step 6 — The answer key
add(6, 'label', Point(1, -0.5, 0), color=Color.from_hex("#ce4095"), text='a)  ✗ not braced')
add(6, 'label', Point(10, -0.5, 0), color=Color.from_hex("#3f9c20"), text='b)  ✓ braced')
add(6, 'label', Point(19, -0.5, 0), color=Color.from_hex("#ce4095"), text='c)  ✗ not braced')
add(6, 'label', Point(1, -16.5, 0), color=Color.from_hex("#3f9c20"), text='d)  ✓ braced')
add(6, 'label', Point(10, -16.5, 0), color=Color.from_hex("#ce4095"), text='e)  ✗ not braced')
add(6, 'label', Point(19, -16.5, 0), color=Color.from_hex("#3f9c20"), text='f)  ✓ braced')


if __name__ == "__main__":
    print("EX 10.1 — three walls, and whether they hold —", len(ops), "operations")
