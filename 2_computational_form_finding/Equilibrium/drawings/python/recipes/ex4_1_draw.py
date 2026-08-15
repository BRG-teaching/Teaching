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
add(0, 'label', Point(2, -14.4, 0), text='Lageplan 1:100 — form diagram')
add(0, 'label', Point(8, -12.4, 0), text='Kräfteplan — force diagram')
add(0, 'label', Point(8, -13.8, 0), text='to scale · 1 unit ≙ 10 kN  (sheet: 1 cm ≙ 20 kN)')

# step 1 — What is given
add(1, 'point', Point(-18, -4, 0), color=Color.from_hex("#ffffff"), width=0.3256)
add(1, 'label', Point(-19.5, -4.9, 0), text='A')
add(1, 'segment', Line((-19.6, -4.5, 0), (-20.2, -5.3, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-18.8, -4.5, 0), (-19.4, -5.3, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-18, -4.5, 0), (-18.6, -5.3, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-17.2, -4.5, 0), (-17.8, -5.3, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-16.4, -4.5, 0), (-17, -5.3, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'point', Point(0, -4, 0), color=Color.from_hex("#ffffff"), width=0.3256)
add(1, 'label', Point(1.5, -4.9, 0), text='B')
add(1, 'segment', Line((-1.6, -4.5, 0), (-2.2, -5.3, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-0.8, -4.5, 0), (-1.4, -5.3, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((0, -4.5, 0), (-0.6, -5.3, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((0.8, -4.5, 0), (0.2, -5.3, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((1.6, -4.5, 0), (1, -5.3, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'polyline', Polyline([(-20.4, -4, 0), (2.4, -4, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2596)
add(1, 'polyline', Polyline([(-13.5, 5.3, 0), (-13.5, -6.4, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2596)
add(1, 'arrow', Line((-13.5, 3.675, 0), (-13.5, -0.125, 0)), color=Color.from_hex("#3f9c20"), width=0.120384, head=(0.415008, 0.160301))
add(1, 'label', Point(-11.5, 2.945, 0), color=Color.from_hex("#3f9c20"), text='F₁d')
add(1, 'polyline', Polyline([(-9, 5.3, 0), (-9, -6.4, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2596)
add(1, 'arrow', Line((-9, 4.8, 0), (-9, 1, 0)), color=Color.from_hex("#3f9c20"), width=0.120384, head=(0.415008, 0.160301))
add(1, 'label', Point(-7, 4.07, 0), color=Color.from_hex("#3f9c20"), text='F₂d')
add(1, 'polyline', Polyline([(-4.5, 5.3, 0), (-4.5, -6.4, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2596)
add(1, 'arrow', Line((-4.5, 3.675, 0), (-4.5, -0.125, 0)), color=Color.from_hex("#3f9c20"), width=0.120384, head=(0.415008, 0.160301))
add(1, 'label', Point(-2.5, 2.945, 0), color=Color.from_hex("#3f9c20"), text='F₃d')

# step 2 — The load line
add(2, 'arrow', Line((6, 6, 0), (6, 2, 0)), color=Color.from_hex("#3f9c20"), width=0.120384, head=(0.415008, 0.160301))
add(2, 'label', Point(3.8, 4, 0), color=Color.from_hex("#3f9c20"), text='F₁d')
add(2, 'arrow', Line((6, 2, 0), (6, -2, 0)), color=Color.from_hex("#3f9c20"), width=0.120384, head=(0.415008, 0.160301))
add(2, 'label', Point(3.8, 0, 0), color=Color.from_hex("#3f9c20"), text='F₂d')
add(2, 'arrow', Line((6, -2, 0), (6, -6, 0)), color=Color.from_hex("#3f9c20"), width=0.120384, head=(0.415008, 0.160301))
add(2, 'label', Point(3.8, -4, 0), color=Color.from_hex("#3f9c20"), text='F₃d')

# step 3 — The constraint fixes the pole
add(3, 'point', Point(14, 0, 0), color=Color.from_hex("#ffffff"), width=0.26048)
add(3, 'label', Point(15.4, 0.7, 0), text='o')
add(3, 'segment', Line((6, 7.7, 0), (14, 7.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(3, 'label', Point(10, 8.8, 0), color=Color.from_hex("#aaaaaa"), text='H = 80.0 kN')
add(3, 'point', Point(6, 0, 0), color=Color.from_hex("#ffffff"), width=0.22792)
add(3, 'label', Point(4.7, 0, 0), text='i')

# step 4 — The arch draws itself
add(4, 'polygon', Polygon([(-17.8614, -4.1848, 0), (-18.1386, -3.8152, 0), (-13.6386, -0.4402, 0), (-13.3614, -0.8098, 0)]), color=Color.from_hex("#bdbfe8"))
add(4, 'segment', Line((-18, -4, 0), (-13.5, -0.625, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(4, 'segment', Line((14, 0, 0), (6, 6, 0)), color=Color.from_hex("#1a1eb2"), width=0.046886)
add(4, 'polygon', Polygon([(-13.4538, -0.8098, 0), (-13.5462, -0.4402, 0), (-9.0462, 0.6848, 0), (-8.9538, 0.3152, 0)]), color=Color.from_hex("#bdbfe8"))
add(4, 'segment', Line((-13.5, -0.625, 0), (-9, 0.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(4, 'segment', Line((14, 0, 0), (6, 2, 0)), color=Color.from_hex("#1a1eb2"), width=0.046886)
add(4, 'polygon', Polygon([(-9.0462, 0.3152, 0), (-8.9538, 0.6848, 0), (-4.4538, -0.4402, 0), (-4.5462, -0.8098, 0)]), color=Color.from_hex("#bdbfe8"))
add(4, 'segment', Line((-9, 0.5, 0), (-4.5, -0.625, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(4, 'segment', Line((14, 0, 0), (6, -2, 0)), color=Color.from_hex("#1a1eb2"), width=0.046886)
add(4, 'polygon', Polygon([(-4.6386, -0.8098, 0), (-4.3614, -0.4402, 0), (0.1386, -3.8152, 0), (-0.1386, -4.1848, 0)]), color=Color.from_hex("#bdbfe8"))
add(4, 'segment', Line((-4.5, -0.625, 0), (0, -4, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(4, 'segment', Line((14, 0, 0), (6, -6, 0)), color=Color.from_hex("#1a1eb2"), width=0.046886)
add(4, 'segment', Line((-8, -4, 0), (-8, 0.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(4, 'label', Point(-5.8, -1.75, 0), color=Color.from_hex("#aaaaaa"), text='f = 1.50 m')

# step 5 — Global equilibrium
add(5, 'arrow', Line((-20.72, -6.04, 0), (-18, -4, 0)), color=Color.from_hex("#3f9c20"), width=0.086803, head=(0.280685, 0.120384))
add(5, 'arrow', Line((14.671, 0, 0), (6.24156, 6.32208, 0)), color=Color.from_hex("#3f9c20"), width=0.086803, head=(0.280685, 0.120384))
add(5, 'label', Point(-22.92, -6.64, 0), color=Color.from_hex("#3f9c20"), text='A = 100')
add(5, 'arrow', Line((2.72, -6.04, 0), (0, -4, 0)), color=Color.from_hex("#3f9c20"), width=0.086803, head=(0.280685, 0.120384))
add(5, 'arrow', Line((6.24156, -6.32208, 0), (14.671, 0, 0)), color=Color.from_hex("#3f9c20"), width=0.086803, head=(0.280685, 0.120384))
add(5, 'label', Point(4.92, -6.64, 0), color=Color.from_hex("#3f9c20"), text='B = 100')

# step 6 — The member forces
add(6, 'label', Point(-16.8672, -0.8229, 0), color=Color.from_hex("#1a1eb2"), text='100')
add(6, 'label', Point(-11.682, 1.6653, 0), color=Color.from_hex("#1a1eb2"), text='82')
add(6, 'label', Point(-6.31805, 1.6653, 0), color=Color.from_hex("#1a1eb2"), text='82')
add(6, 'label', Point(-1.1328, -0.8229, 0), color=Color.from_hex("#1a1eb2"), text='100')
add(6, 'label', Point(-17.9472, 0.6171, 0), color=Color.from_hex("#1a1eb2"), text='relevant force 100 kN')

# step 7 — c) The other solution
add(7, 'segment', Line((-18, -4, 0), (-13.5, -7.375, 0)), color=Color.from_hex("#b9b9bd"), width=0.04752)
add(7, 'segment', Line((-13.5, -7.375, 0), (-9, -8.5, 0)), color=Color.from_hex("#b9b9bd"), width=0.04752)
add(7, 'segment', Line((-9, -8.5, 0), (-4.5, -7.375, 0)), color=Color.from_hex("#b9b9bd"), width=0.04752)
add(7, 'segment', Line((-4.5, -7.375, 0), (0, -4, 0)), color=Color.from_hex("#b9b9bd"), width=0.04752)
add(7, 'label', Point(11, -11.9, 0), color=Color.from_hex("#aaaaaa"), text='the cable does the same job in tension')


if __name__ == "__main__":
    print("EX 4.1 — finding an arch to fit a constraint —", len(ops), "operations")
