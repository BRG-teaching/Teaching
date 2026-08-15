"""EX 4.1 — finding an arch to fit a constraint

Auto-generated from ops/ex4_1.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-9, -10.4, 0), text='Lageplan 1:100 — form diagram')
add(0, 'label', Point(12, -10.4, 0), text='Kräfteplan — force diagram')
add(0, 'label', Point(12, -11.8, 0), text='to scale · 1 unit ≙ 10 kN  (sheet: 1 cm ≙ 20 kN)')

# step 1 — What is given
add(1, 'point', Point(-18, -6.5, 0), color=Color.from_hex("#ffffff"), width=0.3256)
add(1, 'label', Point(-19.5, -7.4, 0), text='A')
add(1, 'segment', Line((-19.2, -7.05, 0), (-19.9425, -6.30754, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-18.4, -7.05, 0), (-19.1425, -6.30754, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-17.6, -7.05, 0), (-18.3425, -6.30754, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-16.8, -7.05, 0), (-17.5425, -6.30754, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-16, -7.05, 0), (-16.7425, -6.30754, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'point', Point(0, -6.5, 0), color=Color.from_hex("#ffffff"), width=0.3256)
add(1, 'label', Point(1.5, -7.4, 0), text='B')
add(1, 'segment', Line((-1.2, -7.05, 0), (-1.94246, -6.30754, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-0.4, -7.05, 0), (-1.14246, -6.30754, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((0.4, -7.05, 0), (-0.342462, -6.30754, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((1.2, -7.05, 0), (0.457538, -6.30754, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((2, -7.05, 0), (1.25754, -6.30754, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'polyline', Polyline([(-20.4, -6.5, 0), (2.4, -6.5, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2596)
add(1, 'label', Point(-9, -8.1, 0), color=Color.from_hex("#aaaaaa"), text='CS / SL')
add(1, 'polyline', Polyline([(-13.5, 2.8, 0), (-13.5, -8.9, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2596)
add(1, 'arrow', Line((-13.5, 1.175, 0), (-13.5, -2.625, 0)), color=Color.from_hex("#3f9c20"), width=0.120384, head=(0.415008, 0.160301))
add(1, 'label', Point(-10.5, -0.575, 0), color=Color.from_hex("#3f9c20"), text='F₁d')
add(1, 'polyline', Polyline([(-9, 2.8, 0), (-9, -8.9, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2596)
add(1, 'arrow', Line((-9, 2.3, 0), (-9, -1.5, 0)), color=Color.from_hex("#3f9c20"), width=0.120384, head=(0.415008, 0.160301))
add(1, 'label', Point(-6, 0.55, 0), color=Color.from_hex("#3f9c20"), text='F₂d')
add(1, 'polyline', Polyline([(-4.5, 2.8, 0), (-4.5, -8.9, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2596)
add(1, 'arrow', Line((-4.5, 1.175, 0), (-4.5, -2.625, 0)), color=Color.from_hex("#3f9c20"), width=0.120384, head=(0.415008, 0.160301))
add(1, 'label', Point(-1.5, -0.575, 0), color=Color.from_hex("#3f9c20"), text='F₃d')

# step 2 — The load line
add(2, 'arrow', Line((18, 6, 0), (18, 2, 0)), color=Color.from_hex("#3f9c20"), width=0.120384, head=(0.415008, 0.160301))
add(2, 'label', Point(20.2, 4, 0), color=Color.from_hex("#3f9c20"), text='F₁d')
add(2, 'arrow', Line((18, 2, 0), (18, -2, 0)), color=Color.from_hex("#3f9c20"), width=0.120384, head=(0.415008, 0.160301))
add(2, 'label', Point(20.2, 0, 0), color=Color.from_hex("#3f9c20"), text='F₂d')
add(2, 'arrow', Line((18, -2, 0), (18, -6, 0)), color=Color.from_hex("#3f9c20"), width=0.120384, head=(0.415008, 0.160301))
add(2, 'label', Point(20.2, -4, 0), color=Color.from_hex("#3f9c20"), text='F₃d')

# step 3 — The constraint fixes the pole
add(3, 'polyline', Polyline([(10, 0, 0), (18, 0, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2596)
add(3, 'label', Point(14, 1.2, 0), color=Color.from_hex("#aaaaaa"), text='CS / SL')
add(3, 'point', Point(10, 0, 0), color=Color.from_hex("#ffffff"), width=0.26048)
add(3, 'label', Point(8.6, 0.7, 0), text='o')
add(3, 'segment', Line((18, 7.7, 0), (10, 7.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(3, 'label', Point(14, 8.8, 0), color=Color.from_hex("#aaaaaa"), text='H = 80.0 kN')
add(3, 'point', Point(18, 0, 0), color=Color.from_hex("#ffffff"), width=0.22792)
add(3, 'label', Point(19.3, 0, 0), text='i')

# step 4 — The arch draws itself
add(4, 'polygon', Polygon([(-17.8614, -6.6848, 0), (-18.1386, -6.3152, 0), (-13.6386, -2.9402, 0), (-13.3614, -3.3098, 0)]), color=Color.from_hex("#bdbfe8"))
add(4, 'segment', Line((-18, -6.5, 0), (-13.5, -3.125, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(4, 'segment', Line((10, 0, 0), (18, 6, 0)), color=Color.from_hex("#1a1eb2"), width=0.046886)
add(4, 'polygon', Polygon([(-13.4538, -3.3098, 0), (-13.5462, -2.9402, 0), (-9.0462, -1.8152, 0), (-8.9538, -2.1848, 0)]), color=Color.from_hex("#bdbfe8"))
add(4, 'segment', Line((-13.5, -3.125, 0), (-9, -2, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(4, 'segment', Line((10, 0, 0), (18, 2, 0)), color=Color.from_hex("#1a1eb2"), width=0.046886)
add(4, 'polygon', Polygon([(-9.0462, -2.1848, 0), (-8.9538, -1.8152, 0), (-4.4538, -2.9402, 0), (-4.5462, -3.3098, 0)]), color=Color.from_hex("#bdbfe8"))
add(4, 'segment', Line((-9, -2, 0), (-4.5, -3.125, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(4, 'segment', Line((10, 0, 0), (18, -2, 0)), color=Color.from_hex("#1a1eb2"), width=0.046886)
add(4, 'polygon', Polygon([(-4.6386, -3.3098, 0), (-4.3614, -2.9402, 0), (0.1386, -6.3152, 0), (-0.1386, -6.6848, 0)]), color=Color.from_hex("#bdbfe8"))
add(4, 'segment', Line((-4.5, -3.125, 0), (0, -6.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(4, 'segment', Line((10, 0, 0), (18, -6, 0)), color=Color.from_hex("#1a1eb2"), width=0.046886)
add(4, 'segment', Line((-8, -6.5, 0), (-8, -2, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(4, 'label', Point(-5.8, -4.25, 0), color=Color.from_hex("#aaaaaa"), text='f = 1.50 m')

# step 5 — Global equilibrium
add(5, 'arrow', Line((-20.72, -8.54, 0), (-18, -6.5, 0)), color=Color.from_hex("#3f9c20"), width=0.086803, head=(0.280685, 0.120384))
add(5, 'arrow', Line((9.329, 0, 0), (17.7584, 6.32208, 0)), color=Color.from_hex("#3f9c20"), width=0.086803, head=(0.280685, 0.120384))
add(5, 'label', Point(-22.92, -9.14, 0), color=Color.from_hex("#3f9c20"), text='A = 100')
add(5, 'arrow', Line((2.72, -8.54, 0), (0, -6.5, 0)), color=Color.from_hex("#3f9c20"), width=0.086803, head=(0.280685, 0.120384))
add(5, 'arrow', Line((17.7584, -6.32208, 0), (9.329, 0, 0)), color=Color.from_hex("#3f9c20"), width=0.086803, head=(0.280685, 0.120384))
add(5, 'label', Point(4.92, -9.14, 0), color=Color.from_hex("#3f9c20"), text='B = 100')

# step 6 — The member forces
add(6, 'label', Point(-16.8672, -3.3229, 0), color=Color.from_hex("#1a1eb2"), text='100')
add(6, 'label', Point(-11.682, -0.8347, 0), color=Color.from_hex("#1a1eb2"), text='82')
add(6, 'label', Point(-6.31805, -0.8347, 0), color=Color.from_hex("#1a1eb2"), text='82')
add(6, 'label', Point(-1.1328, -3.3229, 0), color=Color.from_hex("#1a1eb2"), text='100')
add(6, 'label', Point(-17.9472, -1.8829, 0), color=Color.from_hex("#1a1eb2"), text='relevant force 100 kN')

# step 7 — c) Other possible solutions
add(7, 'segment', Line((-18, -6.5, 0), (-13.5, -0.425, 0)), color=Color.from_hex("#b9b9bd"), width=0.04752)
add(7, 'segment', Line((-13.5, -0.425, 0), (-9, 1.6, 0)), color=Color.from_hex("#b9b9bd"), width=0.04752)
add(7, 'segment', Line((-9, 1.6, 0), (-4.5, -0.425, 0)), color=Color.from_hex("#b9b9bd"), width=0.04752)
add(7, 'segment', Line((-4.5, -0.425, 0), (0, -6.5, 0)), color=Color.from_hex("#b9b9bd"), width=0.04752)
add(7, 'label', Point(-9, -5, 0), color=Color.from_hex("#aaaaaa"), text='a 1.8× higher arch carries the same load with 56 % of the thrust — the shape is not unique')


if __name__ == "__main__":
    print("EX 4.1 — finding an arch to fit a constraint —", len(ops), "operations")
