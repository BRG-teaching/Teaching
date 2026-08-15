"""EX 5.2 — a cantilever off a wall, three ways

Auto-generated from ops/ex5_2.json — the drawing as literal COMPAS
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
add(0, 'label', Point(2, -15.4, 0), text='Lageplan 1:100 — form diagram')
add(0, 'label', Point(8, -12.4, 0), text='Kräfteplan — force diagram')
add(0, 'label', Point(8, -13.8, 0), text='to scale · 1 unit ≙ 8 kN  (sheet: 1 cm ≙ 10 kN)')

# step 1 — What is given
add(1, 'segment', Line((-17, 9.18, 0), (-17, -4.88, 0)), color=Color.from_hex("#111111"), width=0.100109)
add(1, 'segment', Line((-17, 8.8, 0), (-17.9, 9.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-17, 7.59091, 0), (-17.9, 8.49091, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-17, 6.38182, 0), (-17.9, 7.28182, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-17, 5.17273, 0), (-17.9, 6.07273, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-17, 3.96364, 0), (-17.9, 4.86364, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-17, 2.75454, 0), (-17.9, 3.65455, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-17, 1.54546, 0), (-17.9, 2.44545, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-17, 0.336364, 0), (-17.9, 1.23636, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-17, -0.872727, 0), (-17.9, 0.027273, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-17, -2.08182, 0), (-17.9, -1.18182, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-17, -3.29091, 0), (-17.9, -2.39091, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-17, -4.5, 0), (-17.9, -3.6, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'point', Point(-17, 5, 0), color=Color.from_hex("#ffffff"), width=0.3256)
add(1, 'label', Point(-20.2, 5.9, 0), text='pin')
add(1, 'point', Point(-17, -0.7, 0), color=Color.from_hex("#ffffff"), width=0.3256)
add(1, 'label', Point(-20.4, -1.6, 0), text='roller')
add(1, 'segment', Line((-15.9, -2.4, 0), (-15.9, 1, 0)), color=Color.from_hex("#aaaaaa"), width=0.04752)
add(1, 'polyline', Polyline([(-9.4, 11.14, 0), (-9.4, -2.7, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2596)
add(1, 'arrow', Line((-9.4, 9.94, 0), (-9.4, 6.94, 0)), color=Color.from_hex("#3f9c20"), width=0.120384, head=(0.415008, 0.160301))
add(1, 'label', Point(-7.2, 8.44, 0), color=Color.from_hex("#3f9c20"), text='40 kN')

# step 2 — The reactions come first
add(2, 'polyline', Polyline([(-9.4, 12.34, 0), (-9.4, -3.1, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2596)
add(2, 'arrow', Line((-9.4, 12.14, 0), (-9.4, 9.14, 0)), color=Color.from_hex("#3f9c20"), width=0.138442, dash=0.41536, head=(0.415008, 0.160301))
add(2, 'label', Point(-7, 10.64, 0), color=Color.from_hex("#3f9c20"), text='R = 40 kN')
add(2, 'arrow', Line((14, 1, 0), (14, -4, 0)), color=Color.from_hex("#3f9c20"), width=0.120384, head=(0.415008, 0.160301))
add(2, 'label', Point(16.4, -1.5, 0), color=Color.from_hex("#3f9c20"), text='40')

# step 3 — The strut and the cable
add(3, 'point', Point(7.33333, 1, 0), color=Color.from_hex("#ffffff"), width=0.26048)
add(3, 'label', Point(5.93333, 1.7, 0), text='o')
add(3, 'segment', Line((7.33333, 2.8, 0), (14, 2.8, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(3, 'label', Point(10.6667, 3.9, 0), color=Color.from_hex("#aaaaaa"), text='H = 53.33 kN')
add(3, 'polygon', Polygon([(-16.7228, 5.3696, 0), (-9.1228, -0.3304, 0), (-9.6772, -1.0696, 0), (-17.2772, 4.6304, 0)]), color=Color.from_hex("#f0bcdb"))
add(3, 'segment', Line((-17, 5, 0), (-9.4, -0.7, 0)), color=Color.from_hex("#ce4095"), width=0.100109)
add(3, 'segment', Line((-17, 5, 0), (-9.4, -0.7, 0)), color=Color.from_hex("#ce4095"), width=0.100109)
add(3, 'segment', Line((-17, 5, 0), (-9.4, -0.7, 0)), color=Color.from_hex("#ce4095"), width=0.100109)
add(3, 'segment', Line((-17, 5, 0), (-9.4, -0.7, 0)), color=Color.from_hex("#ce4095"), width=0.100109)
add(3, 'segment', Line((-17, 5, 0), (-9.4, -0.7, 0)), color=Color.from_hex("#ce4095"), width=0.100109)
add(3, 'segment', Line((-17, 5, 0), (-9.4, -0.7, 0)), color=Color.from_hex("#ce4095"), width=0.100109)
add(3, 'segment', Line((-17, 5, 0), (-9.4, -0.7, 0)), color=Color.from_hex("#ce4095"), width=0.100109)
add(3, 'segment', Line((-17, 5, 0), (-9.4, -0.7, 0)), color=Color.from_hex("#ce4095"), width=0.100109)
add(3, 'segment', Line((-17, 5, 0), (-9.4, -0.7, 0)), color=Color.from_hex("#ce4095"), width=0.100109)
add(3, 'segment', Line((-17, 5, 0), (-9.4, -0.7, 0)), color=Color.from_hex("#ce4095"), width=0.100109)
add(3, 'segment', Line((-17, 5, 0), (-9.4, -0.7, 0)), color=Color.from_hex("#ce4095"), width=0.100109)
add(3, 'segment', Line((-17, 5, 0), (-9.4, -0.7, 0)), color=Color.from_hex("#ce4095"), width=0.100109)
add(3, 'segment', Line((-17, 5, 0), (-9.4, -0.7, 0)), color=Color.from_hex("#ce4095"), width=0.100109)
add(3, 'segment', Line((-17, 5, 0), (-9.4, -0.7, 0)), color=Color.from_hex("#ce4095"), width=0.100109)
add(3, 'segment', Line((-17, 5, 0), (-9.4, -0.7, 0)), color=Color.from_hex("#ce4095"), width=0.100109)
add(3, 'segment', Line((-17, 5, 0), (-9.4, -0.7, 0)), color=Color.from_hex("#ce4095"), width=0.100109)
add(3, 'segment', Line((-17, 5, 0), (-9.4, -0.7, 0)), color=Color.from_hex("#ce4095"), width=0.100109)
add(3, 'segment', Line((-17, 5, 0), (-9.4, -0.7, 0)), color=Color.from_hex("#ce4095"), width=0.100109)
add(3, 'segment', Line((-17, 5, 0), (-9.4, -0.7, 0)), color=Color.from_hex("#ce4095"), width=0.100109)
add(3, 'segment', Line((-17, 5, 0), (-9.4, -0.7, 0)), color=Color.from_hex("#ce4095"), width=0.100109)
add(3, 'segment', Line((7.33333, 1, 0), (14, 1, 0)), color=Color.from_hex("#ce4095"), width=0.046886)
add(3, 'segment', Line((7.33333, 1, 0), (14, 1, 0)), color=Color.from_hex("#ce4095"), width=0.046886)
add(3, 'segment', Line((7.33333, 1, 0), (14, 1, 0)), color=Color.from_hex("#ce4095"), width=0.046886)
add(3, 'segment', Line((7.33333, 1, 0), (14, 1, 0)), color=Color.from_hex("#ce4095"), width=0.046886)
add(3, 'segment', Line((7.33333, 1, 0), (14, 1, 0)), color=Color.from_hex("#ce4095"), width=0.046886)
add(3, 'segment', Line((7.33333, 1, 0), (14, 1, 0)), color=Color.from_hex("#ce4095"), width=0.046886)
add(3, 'segment', Line((7.33333, 1, 0), (14, 1, 0)), color=Color.from_hex("#ce4095"), width=0.046886)
add(3, 'segment', Line((7.33333, 1, 0), (14, 1, 0)), color=Color.from_hex("#ce4095"), width=0.046886)
add(3, 'segment', Line((7.33333, 1, 0), (14, 1, 0)), color=Color.from_hex("#ce4095"), width=0.046886)
add(3, 'segment', Line((7.33333, 1, 0), (14, 1, 0)), color=Color.from_hex("#ce4095"), width=0.046886)
add(3, 'segment', Line((7.33333, 1, 0), (14, 1, 0)), color=Color.from_hex("#ce4095"), width=0.046886)
add(3, 'segment', Line((7.33333, 1, 0), (14, 1, 0)), color=Color.from_hex("#ce4095"), width=0.046886)
add(3, 'segment', Line((7.33333, 1, 0), (14, 1, 0)), color=Color.from_hex("#ce4095"), width=0.046886)
add(3, 'segment', Line((7.33333, 1, 0), (14, 1, 0)), color=Color.from_hex("#ce4095"), width=0.046886)
add(3, 'segment', Line((7.33333, 1, 0), (14, 1, 0)), color=Color.from_hex("#ce4095"), width=0.046886)
add(3, 'segment', Line((7.33333, 1, 0), (14, 1, 0)), color=Color.from_hex("#ce4095"), width=0.046886)
add(3, 'segment', Line((7.33333, 1, 0), (14, 1, 0)), color=Color.from_hex("#ce4095"), width=0.046886)
add(3, 'segment', Line((7.33333, 1, 0), (14, 1, 0)), color=Color.from_hex("#ce4095"), width=0.046886)
add(3, 'segment', Line((7.33333, 1, 0), (14, 1, 0)), color=Color.from_hex("#ce4095"), width=0.046886)
add(3, 'segment', Line((7.33333, 1, 0), (14, 1, 0)), color=Color.from_hex("#ce4095"), width=0.046886)
add(3, 'polygon', Polygon([(-17, -0.8848, 0), (-17, -0.5152, 0), (-9.4, -0.5152, 0), (-9.4, -0.8848, 0)]), color=Color.from_hex("#bdbfe8"))
add(3, 'segment', Line((-17, -0.7, 0), (-9.4, -0.7, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(3, 'segment', Line((7.33333, 1, 0), (14, 1, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)

# step 4 — It lands on the strut
add(4, 'point', Point(-9.4, -0.7, 0), color=Color.from_hex("#ffffff"), width=0.26048)
add(4, 'label', Point(-5.8, -1.9, 0), color=Color.from_hex("#aaaaaa"), text='the cable lands here')

# step 5 — The forces
add(5, 'label', Point(-13.2, -3.1, 0), color=Color.from_hex("#1a1eb2"), text='strut 53.33 kN compression')
add(5, 'label', Point(-10.2, 3.55, 0), color=Color.from_hex("#ce4095"), text='66.7 kN tension')

# step 6 — And the reactions close it
add(6, 'arrow', Line((-17, 5, 0), (-19.4, 6.8, 0)), color=Color.from_hex("#3f9c20"), width=0.086803, head=(0.280685, 0.120384))
add(6, 'arrow', Line((14, -4, 0), (7.33333, 1, 0)), color=Color.from_hex("#3f9c20"), width=0.086803, head=(0.280685, 0.120384))
add(6, 'label', Point(-20.4, 8, 0), color=Color.from_hex("#3f9c20"), text='66.7')
add(6, 'arrow', Line((-17, -1.1026, 0), (-14, -1.1026, 0)), color=Color.from_hex("#3f9c20"), width=0.086803, head=(0.280685, 0.120384))
add(6, 'arrow', Line((7.33333, 0.5974, 0), (14, 0.5974, 0)), color=Color.from_hex("#3f9c20"), width=0.086803, head=(0.280685, 0.120384))
add(6, 'label', Point(-11.4, -1.6, 0), color=Color.from_hex("#3f9c20"), text='53.3')


if __name__ == "__main__":
    print("EX 5.2 — a cantilever off a wall, three ways —", len(ops), "operations")
