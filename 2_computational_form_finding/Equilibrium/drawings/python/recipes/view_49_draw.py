"""Drawing 49 — Moment from force pair

Auto-generated from ops/view_49.json — the drawing as literal COMPAS
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


# step 1 — The upper force F₀
add(1, 'label', Point(3.4, 11.2, 0), text='Form Diagram')
add(1, 'arrow', Line((4.65, 10, 0), (7.35, 10, 0)), color=Color.from_hex("#3f9c20"), width=0.0504, head=(0.2016, 0.1008))
add(1, 'label', Point(6.15, 10.32, 0), color=Color.from_hex("#3f9c20"), text='F₀')
add(1, 'polyline', Polyline([(6, 10, 0), (6, 5, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.18)
add(1, 'point', Point(6, 8, 0), color=Color.from_hex("#ffffff"), width=0.09)
add(1, 'point', Point(6, 10, 0), color=Color.from_hex("#ffffff"), width=0.07)

# step 2 — The lower force Fᵤ
add(2, 'arrow', Line((7.35, 6, 0), (4.65, 6, 0)), color=Color.from_hex("#3f9c20"), width=0.0504, head=(0.2016, 0.1008))
add(2, 'label', Point(6.2, 5.66, 0), color=Color.from_hex("#3f9c20"), text='Fᵤ')
add(2, 'point', Point(6, 6, 0), color=Color.from_hex("#ffffff"), width=0.07)

# step 3 — The arm d
add(3, 'segment', Line((7.819, 10, 0), (7.819, 6, 0)), color=Color.from_hex("#aaaaaa"), width=0.0216)
add(3, 'segment', Line((7.739, 9.92, 0), (7.899, 10.08, 0)), color=Color.from_hex("#aaaaaa"), width=0.0216)
add(3, 'segment', Line((7.739, 10.08, 0), (7.899, 9.92, 0)), color=Color.from_hex("#aaaaaa"), width=0.0216)
add(3, 'segment', Line((7.739, 5.92, 0), (7.899, 6.08, 0)), color=Color.from_hex("#aaaaaa"), width=0.0216)
add(3, 'segment', Line((7.739, 6.08, 0), (7.899, 5.92, 0)), color=Color.from_hex("#aaaaaa"), width=0.0216)
add(3, 'label', Point(7.269, 8, 0), text='d = 4')

# step 4 — The moment M = F · d
add(4, 'segment', Line((15.836, 10.069, 0), (15.927, 10.0618, 0)), color=Color.from_hex("#111111"), width=0.0252)
add(4, 'segment', Line((15.927, 10.0618, 0), (16.0158, 10.0405, 0)), color=Color.from_hex("#111111"), width=0.0252)
add(4, 'segment', Line((16.0158, 10.0405, 0), (16.1002, 10.0056, 0)), color=Color.from_hex("#111111"), width=0.0252)
add(4, 'segment', Line((16.1002, 10.0056, 0), (16.1781, 9.95785, 0)), color=Color.from_hex("#111111"), width=0.0252)
add(4, 'segment', Line((16.1781, 9.95785, 0), (16.2475, 9.89854, 0)), color=Color.from_hex("#111111"), width=0.0252)
add(4, 'segment', Line((16.2475, 9.89854, 0), (16.3068, 9.82909, 0)), color=Color.from_hex("#111111"), width=0.0252)
add(4, 'segment', Line((16.3068, 9.82909, 0), (16.3546, 9.75122, 0)), color=Color.from_hex("#111111"), width=0.0252)
add(4, 'segment', Line((16.3546, 9.75122, 0), (16.3895, 9.66685, 0)), color=Color.from_hex("#111111"), width=0.0252)
add(4, 'segment', Line((16.3895, 9.66685, 0), (16.4108, 9.57804, 0)), color=Color.from_hex("#111111"), width=0.0252)
add(4, 'segment', Line((16.4108, 9.57804, 0), (16.418, 9.487, 0)), color=Color.from_hex("#111111"), width=0.0252)
add(4, 'segment', Line((16.418, 9.487, 0), (16.4108, 9.39596, 0)), color=Color.from_hex("#111111"), width=0.0252)
add(4, 'segment', Line((16.4108, 9.39596, 0), (16.3895, 9.30715, 0)), color=Color.from_hex("#111111"), width=0.0252)
add(4, 'segment', Line((16.3895, 9.30715, 0), (16.3546, 9.22278, 0)), color=Color.from_hex("#111111"), width=0.0252)
add(4, 'segment', Line((16.3546, 9.22278, 0), (16.3068, 9.14491, 0)), color=Color.from_hex("#111111"), width=0.0252)
add(4, 'segment', Line((16.3068, 9.14491, 0), (16.2475, 9.07546, 0)), color=Color.from_hex("#111111"), width=0.0252)
add(4, 'segment', Line((16.2475, 9.07546, 0), (16.1781, 9.01615, 0)), color=Color.from_hex("#111111"), width=0.0252)
add(4, 'segment', Line((16.1781, 9.01615, 0), (16.1002, 8.96843, 0)), color=Color.from_hex("#111111"), width=0.0252)
add(4, 'segment', Line((16.1002, 8.96843, 0), (16.0158, 8.93348, 0)), color=Color.from_hex("#111111"), width=0.0252)
add(4, 'segment', Line((16.0158, 8.93348, 0), (15.927, 8.91216, 0)), color=Color.from_hex("#111111"), width=0.0252)
add(4, 'segment', Line((15.927, 8.91216, 0), (15.836, 8.905, 0)), color=Color.from_hex("#111111"), width=0.0252)
add(4, 'polygon', Polygon([(15.936, 9.025, 0), (15.936, 8.785, 0), (15.616, 8.905, 0)]), color=Color.from_hex("#111111"))
add(4, 'label', Point(15.486, 9.487, 0), text='+')
add(4, 'label', Point(12.6, 8.9, 0), text='F · d = 8 kNm')

# step 5 — A reference line through J
add(5, 'polyline', Polyline([(4.8, 8, 0), (9.4, 8, 0)]), color=Color.from_hex("#111111"), dash=0.18)
add(5, 'label', Point(5.65, 8.22, 0), text='J')
add(5, 'point', Point(6, 8, 0), color=Color.from_hex("#ffffff"), width=0.09)

# step 6 — The upper share d₀
add(6, 'segment', Line((8.78044, 10, 0), (8.78044, 8, 0)), color=Color.from_hex("#aaaaaa"), width=0.0216)
add(6, 'segment', Line((8.70044, 9.92, 0), (8.86044, 10.08, 0)), color=Color.from_hex("#aaaaaa"), width=0.0216)
add(6, 'segment', Line((8.70044, 10.08, 0), (8.86044, 9.92, 0)), color=Color.from_hex("#aaaaaa"), width=0.0216)
add(6, 'segment', Line((8.70044, 7.92, 0), (8.86044, 8.08, 0)), color=Color.from_hex("#aaaaaa"), width=0.0216)
add(6, 'segment', Line((8.70044, 8.08, 0), (8.86044, 7.92, 0)), color=Color.from_hex("#aaaaaa"), width=0.0216)
add(6, 'polyline', Polyline([(8.19182, 10, 0), (8.78044, 10, 0)]), color=Color.from_hex("#111111"), dash=0.09)
add(6, 'label', Point(9.40044, 9, 0), text='d₀ = 2')
add(6, 'point', Point(8.78044, 10, 0), color=Color.from_hex("#ffffff"), width=0.09)

# step 7 — The lower share dᵤ
add(7, 'segment', Line((9, 8, 0), (9, 6, 0)), color=Color.from_hex("#aaaaaa"), width=0.0216)
add(7, 'segment', Line((8.92, 7.92, 0), (9.08, 8.08, 0)), color=Color.from_hex("#aaaaaa"), width=0.0216)
add(7, 'segment', Line((8.92, 8.08, 0), (9.08, 7.92, 0)), color=Color.from_hex("#aaaaaa"), width=0.0216)
add(7, 'segment', Line((8.92, 5.92, 0), (9.08, 6.08, 0)), color=Color.from_hex("#aaaaaa"), width=0.0216)
add(7, 'segment', Line((8.92, 6.08, 0), (9.08, 5.92, 0)), color=Color.from_hex("#aaaaaa"), width=0.0216)
add(7, 'polyline', Polyline([(8.19182, 6, 0), (9, 6, 0)]), color=Color.from_hex("#111111"), dash=0.09)
add(7, 'label', Point(9.62, 7, 0), text='dᵤ = 2')
add(7, 'point', Point(9, 8, 0), color=Color.from_hex("#ffffff"), width=0.09)

# step 8 — M = F₀·d₀ + Fᵤ·dᵤ
add(8, 'label', Point(13.35, 10.35, 0), text='M = F₀·d₀ + Fᵤ·dᵤ')
add(8, 'label', Point(13.35, 9.7, 0), text='= 2 · 2 + 2 · 2 =')


if __name__ == "__main__":
    print("Drawing 49 — Moment from force pair —", len(ops), "operations")
