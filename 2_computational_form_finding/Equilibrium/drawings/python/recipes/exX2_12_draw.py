"""EX X · 12 — a page with no numbers on it

Auto-generated from ops/exX2_12.json — the drawing as literal COMPAS
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
add(0, 'label', Point(14.5, 11.2, 0), text='a) isometric — 30 / 150 / 90°, foreshortening 0.8165')
add(0, 'label', Point(-15, 1, 0), text='one deep beam, unrolled — 10.00 long × 1.21 deep')
add(0, 'label', Point(14.5, 10, 0), text='no scale and no load magnitude are printed on this page')

# step 1 — The skeleton
add(1, 'segment', Line((14.5, -5.60263, 0), (23.9753, -0.132082, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'segment', Line((23.9753, -0.132082, 0), (14.5, 5.33847, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'segment', Line((14.5, 5.33847, 0), (5.02473, -0.132082, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'segment', Line((5.02473, -0.132082, 0), (14.5, -5.60263, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'segment', Line((14.5, -6.9265, 0), (23.9753, -1.45596, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'segment', Line((23.9753, -1.45596, 0), (14.5, 4.01459, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'segment', Line((14.5, 4.01459, 0), (5.02473, -1.45596, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'segment', Line((5.02473, -1.45596, 0), (14.5, -6.9265, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'segment', Line((14.5, -10.2088, 0), (23.9753, -4.73829, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'segment', Line((23.9753, -4.73829, 0), (14.5, 0.732265, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'segment', Line((14.5, 0.732265, 0), (5.02473, -4.73829, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'segment', Line((5.02473, -4.73829, 0), (14.5, -10.2088, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'segment', Line((14.5, -5.60263, 0), (14.5, -6.9265, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'segment', Line((23.9753, -0.132082, 0), (23.9753, -1.45596, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'segment', Line((14.5, 5.33847, 0), (14.5, 4.01459, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'segment', Line((5.02473, -0.132082, 0), (5.02473, -1.45596, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'segment', Line((14.5, -2.05772, 0), (14.5, -3.69888, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'segment', Line((14.5, -2.05772, 0), (14.5, 2.58416, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'segment', Line((14.5, -2.05772, 0), (14.5, -6.69959, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)

# step 2 — The loads
add(2, 'label', Point(19.2376, -0.022671, 0), color=Color.from_hex("#3f9c20"), text='g3')
add(2, 'label', Point(19.2376, 5.44788, 0), color=Color.from_hex("#3f9c20"), text='g4')
add(2, 'label', Point(9.76237, 5.44788, 0), color=Color.from_hex("#3f9c20"), text='g2')
add(2, 'label', Point(9.76237, -0.022671, 0), color=Color.from_hex("#3f9c20"), text='g1')

# step 3 — Inside a deep beam
add(3, 'segment', Line((14.5, -6.9265, 0), (16.0792, -5.27926, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((16.0792, -5.27926, 0), (17.6584, -3.92621, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((17.6584, -3.92621, 0), (19.2376, -2.86736, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((19.2376, -2.86736, 0), (20.8168, -2.1027, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((20.8168, -2.1027, 0), (22.3961, -1.63223, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((22.3961, -1.63223, 0), (23.9753, -1.45596, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((14.5, -6.9265, 0), (23.9753, -1.45596, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(3, 'segment', Line((23.9753, -1.45596, 0), (22.3961, 0.191288, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((22.3961, 0.191288, 0), (20.8168, 1.54434, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((20.8168, 1.54434, 0), (19.2376, 2.60319, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((19.2376, 2.60319, 0), (17.6584, 3.36785, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((17.6584, 3.36785, 0), (16.0792, 3.83832, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((16.0792, 3.83832, 0), (14.5, 4.01459, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((23.9753, -1.45596, 0), (14.5, 4.01459, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(3, 'segment', Line((14.5, 4.01459, 0), (12.9208, 3.83832, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((12.9208, 3.83832, 0), (11.3416, 3.36785, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((11.3416, 3.36785, 0), (9.76237, 2.60319, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((9.76237, 2.60319, 0), (8.18315, 1.54434, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((8.18315, 1.54434, 0), (6.60394, 0.191288, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((6.60394, 0.191288, 0), (5.02473, -1.45595, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((14.5, 4.01459, 0), (5.02473, -1.45596, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(3, 'segment', Line((5.02473, -1.45596, 0), (6.60394, -1.63223, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((6.60394, -1.63223, 0), (8.18315, -2.1027, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((8.18315, -2.1027, 0), (9.76237, -2.86736, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((9.76237, -2.86736, 0), (11.3416, -3.92621, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((11.3416, -3.92621, 0), (12.9208, -5.27926, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((12.9208, -5.27926, 0), (14.5, -6.9265, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((5.02473, -1.45596, 0), (14.5, -6.9265, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(3, 'segment', Line((-21.5, -5.6, 0), (-8.5, -5.6, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(3, 'segment', Line((-8.5, -5.6, 0), (-8.5, -4.027, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(3, 'segment', Line((-8.5, -4.027, 0), (-21.5, -4.027, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(3, 'segment', Line((-21.5, -4.027, 0), (-21.5, -5.6, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(3, 'segment', Line((-21.5, -5.6, 0), (-19.3333, -4.72611, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((-19.3333, -4.72611, 0), (-17.1667, -4.20178, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((-17.1667, -4.20178, 0), (-15, -4.027, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((-15, -4.027, 0), (-12.8333, -4.20178, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((-12.8333, -4.20178, 0), (-10.6667, -4.72611, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((-10.6667, -4.72611, 0), (-8.5, -5.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'segment', Line((-21.5, -5.6, 0), (-8.5, -5.6, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(3, 'label', Point(-3.8, -4.6562, 0), color=Color.from_hex("#1a1eb2"), text='compression arch')
add(3, 'label', Point(-5, -7.3, 0), color=Color.from_hex("#ce4095"), text='tension tie')
add(3, 'label', Point(-15, -1.727, 0), color=Color.from_hex("#3f9c20"), text='g3 — no value is given')

# step 4 — Where it lands
add(4, 'arrow', Line((15.0124, -6.9265, 0), (15.0124, -8.56767, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((25.0001, -1.45596, 0), (25.0001, -3.09712, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((24.4877, -1.45596, 0), (24.4877, -3.09712, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((15.5248, 4.01459, 0), (15.5248, 2.37343, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((15.0124, 4.01459, 0), (15.0124, 2.37343, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((3.99993, -1.45596, 0), (3.99993, -3.09712, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((4.51233, -1.45596, 0), (4.51233, -3.09712, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((15.5248, -6.9265, 0), (15.5248, -8.56767, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((-21.5, -6.2, 0), (-21.5, -8.4, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((-8.5, -6.2, 0), (-8.5, -8.4, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'label', Point(-15, -9.2, 0), color=Color.from_hex("#3f9c20"), text='g·L/2 into each corner')

# step 5 — Down to the ground
add(5, 'segment', Line((14.5, -6.9265, 0), (14.5, -10.2088, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(5, 'segment', Line((14.5, -10.2088, 0), (14.5, -11.85, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(5, 'segment', Line((23.9753, -1.45596, 0), (23.9753, -4.73829, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(5, 'segment', Line((23.9753, -4.73829, 0), (23.9753, -6.37945, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(5, 'segment', Line((14.5, 4.01459, 0), (14.5, 0.732265, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(5, 'segment', Line((14.5, 0.732265, 0), (14.5, -0.9089, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(5, 'segment', Line((5.02473, -1.45596, 0), (5.02473, -4.73829, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(5, 'segment', Line((5.02473, -4.73829, 0), (5.02473, -6.37945, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)

# step 6 — What cannot be answered
add(6, 'circle', Circle(2.2, frame=Frame((14.5, -2.05772, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#e07a26"), dash=0.5)
add(6, 'label', Point(14.5, -13.4, 0), color=Color.from_hex("#e07a26"), text='the fifth column — role undefined')


if __name__ == "__main__":
    print("EX X · 12 — a page with no numbers on it —", len(ops), "operations")
