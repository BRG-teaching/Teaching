"""EX 5.1 — the same load, three sets of supports

Auto-generated from ops/ex5_1.json — the drawing as literal COMPAS
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
add(0, 'label', Point(7, -12.4, 0), text='Kräfteplan — force diagram')
add(0, 'label', Point(7, -13.8, 0), text='to scale · 1 unit ≙ 6 kN  (sheet: 1 cm ≙ 10 kN)')

# step 1 — What is given
add(1, 'point', Point(-19, 0, 0), color=Color.from_hex("#ffffff"), width=0.3256)
add(1, 'label', Point(-20.6, -1, 0), text='A')
add(1, 'segment', Line((-20.5, -0.5, 0), (-21.1, -1.3, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-19.75, -0.5, 0), (-20.35, -1.3, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-19, -0.5, 0), (-19.6, -1.3, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-18.25, -0.5, 0), (-18.85, -1.3, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-17.5, -0.5, 0), (-18.1, -1.3, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'point', Point(-5.7, 0, 0), color=Color.from_hex("#ffffff"), width=0.3256)
add(1, 'label', Point(-4.1, -1, 0), text='B')
add(1, 'segment', Line((-7.2, -0.5, 0), (-7.8, -1.3, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-6.45, -0.5, 0), (-7.05, -1.3, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-5.7, -0.5, 0), (-6.3, -1.3, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-4.95, -0.5, 0), (-5.55, -1.3, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'segment', Line((-4.2, -0.5, 0), (-4.8, -1.3, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(1, 'polyline', Polyline([(-21.6, 0, 0), (-3.1, 0, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2596)
add(1, 'arrow', Line((-12.35, 6.325, 0), (-12.35, 3.125, 0)), color=Color.from_hex("#3f9c20"), width=0.120384, head=(0.415008, 0.160301))
add(1, 'label', Point(-9.95, 4.725, 0), color=Color.from_hex("#3f9c20"), text='F_d = 70 kN')
add(1, 'polyline', Polyline([(-12.35, 7.525, 0), (-12.35, -2.2, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2596)

# step 2 — The load line
add(2, 'arrow', Line((5, 6, 0), (5, -5.66667, 0)), color=Color.from_hex("#3f9c20"), width=0.120384, head=(0.415008, 0.160301))

# step 3 — Choose the shape
add(3, 'polygon', Polygon([(-19.2066, 0.413225, 0), (-18.5416, 0.745725, 0), (-17.8766, 1.07822, 0), (-17.2116, 1.41073, 0), (-16.5466, 1.74323, 0), (-15.8816, 2.07572, 0), (-15.2166, 2.40822, 0), (-14.5516, 2.74072, 0), (-13.8866, 3.07322, 0), (-13.2216, 3.40572, 0), (-12.35, 3.787, 0), (-11.4784, 3.40572, 0), (-10.8134, 3.07322, 0), (-10.1484, 2.74072, 0), (-9.48339, 2.40822, 0), (-8.81839, 2.07572, 0), (-8.15339, 1.74323, 0), (-7.48839, 1.41073, 0), (-6.82339, 1.07822, 0), (-6.15839, 0.745725, 0), (-5.49339, 0.413225, 0), (-5.90661, -0.413225, 0), (-6.57161, -0.080725, 0), (-7.23661, 0.251775, 0), (-7.90161, 0.584275, 0), (-8.56661, 0.916775, 0), (-9.23161, 1.24927, 0), (-9.89661, 1.58177, 0), (-10.5616, 1.91427, 0), (-11.2266, 2.24677, 0), (-11.8916, 2.57927, 0), (-12.35, 2.863, 0), (-12.8084, 2.57927, 0), (-13.4734, 2.24677, 0), (-14.1384, 1.91427, 0), (-14.8034, 1.58177, 0), (-15.4684, 1.24927, 0), (-16.1334, 0.916775, 0), (-16.7984, 0.584275, 0), (-17.4634, 0.251775, 0), (-18.1284, -0.080725, 0), (-18.7934, -0.413225, 0)]), color=Color.from_hex("#bdbfe8"))
add(3, 'segment', Line((-19, 0, 0), (-18.335, 0.3325, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(3, 'segment', Line((-18.335, 0.3325, 0), (-17.67, 0.665, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(3, 'segment', Line((-17.67, 0.665, 0), (-17.005, 0.9975, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(3, 'segment', Line((-17.005, 0.9975, 0), (-16.34, 1.33, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(3, 'segment', Line((-16.34, 1.33, 0), (-15.675, 1.6625, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(3, 'segment', Line((-15.675, 1.6625, 0), (-15.01, 1.995, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(3, 'segment', Line((-15.01, 1.995, 0), (-14.345, 2.3275, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(3, 'segment', Line((-14.345, 2.3275, 0), (-13.68, 2.66, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(3, 'segment', Line((-13.68, 2.66, 0), (-13.015, 2.9925, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(3, 'segment', Line((-13.015, 2.9925, 0), (-12.35, 3.325, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(3, 'segment', Line((-12.35, 3.325, 0), (-11.685, 2.9925, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(3, 'segment', Line((-11.685, 2.9925, 0), (-11.02, 2.66, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(3, 'segment', Line((-11.02, 2.66, 0), (-10.355, 2.3275, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(3, 'segment', Line((-10.355, 2.3275, 0), (-9.69, 1.995, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(3, 'segment', Line((-9.69, 1.995, 0), (-9.025, 1.6625, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(3, 'segment', Line((-9.025, 1.6625, 0), (-8.36, 1.33, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(3, 'segment', Line((-8.36, 1.33, 0), (-7.695, 0.9975, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(3, 'segment', Line((-7.695, 0.9975, 0), (-7.03, 0.665, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(3, 'segment', Line((-7.03, 0.665, 0), (-6.365, 0.3325, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(3, 'segment', Line((-6.365, 0.3325, 0), (-5.7, 0, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(3, 'segment', Line((5, 6, 0), (16.6667, 0.166667, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(3, 'segment', Line((16.6667, 0.166667, 0), (5, -5.66667, 0)), color=Color.from_hex("#1a1eb2"), width=0.100109)
add(3, 'point', Point(16.6667, 0.166667, 0), color=Color.from_hex("#ffffff"), width=0.26048)
add(3, 'label', Point(18.0667, 0.866667, 0), text='o')
add(3, 'segment', Line((5, 7.7, 0), (16.6667, 7.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(3, 'label', Point(10.8333, 8.8, 0), color=Color.from_hex("#aaaaaa"), text='H = 70.0 kN')
add(3, 'segment', Line((-11.15, 0, 0), (-11.15, 3.325, 0)), color=Color.from_hex("#aaaaaa"), width=0.033264)
add(3, 'label', Point(-8.75, 1.6625, 0), color=Color.from_hex("#aaaaaa"), text='f = 1.75 m')

# step 6 — The reactions
add(6, 'arrow', Line((-16.1378, -1.43108, 0), (-19, 0, 0)), color=Color.from_hex("#3f9c20"), width=0.086803, head=(0.280685, 0.120384))
add(6, 'arrow', Line((17.5669, 0.166667, 0), (5.18005, 6.3601, 0)), color=Color.from_hex("#3f9c20"), width=0.086803, head=(0.280685, 0.120384))
add(6, 'label', Point(-18.7378, -1.83108, 0), color=Color.from_hex("#3f9c20"), text='A = 78.3')
add(6, 'arrow', Line((-8.56217, -1.43108, 0), (-5.7, 0, 0)), color=Color.from_hex("#3f9c20"), width=0.086803, head=(0.280685, 0.120384))
add(6, 'arrow', Line((5.18005, -6.02676, 0), (17.5669, 0.166667, 0)), color=Color.from_hex("#3f9c20"), width=0.086803, head=(0.280685, 0.120384))
add(6, 'label', Point(-5.96217, -1.83108, 0), color=Color.from_hex("#3f9c20"), text='B = 78.3')

# step 7 — What it cost
add(7, 'label', Point(-12.35, 5.125, 0), color=Color.from_hex("#1a1eb2"), text='78.3 kN')


if __name__ == "__main__":
    print("EX 5.1 — the same load, three sets of supports —", len(ops), "operations")
