"""EX X · 7 — four identical wall slabs, four different answers

Auto-generated from ops/exX2_7.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-15, -16.4, 0), text='a) — Form diagram 1:100')
add(0, 'label', Point(16, 21.4, 0), text='Force diagram — one closed polygon per joint')
add(0, 'label', Point(16, 19.8, 0), text='1 unit ≙ 10 kN  (sheet: 1 cm ≙ 10 kN)')
add(0, 'label', Point(-15, -18.1, 0), color=Color.from_hex("#aaaaaa"), text='B is in UPLIFT: 16.50 kN downward, which the drawn roller cannot deliver')

# step 1 — The slab
add(1, 'polygon', Polygon([(-25.4818, -7.23418, 0), (-25.934, -6.76582, 0), (-18.5648, 0.348084, 0), (-18.1126, -0.120284, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-25.7079, -7, 0), (-18.3387, 0.1139, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(1, 'polygon', Polygon([(-18.4416, -0.070498, 0), (-18.2358, 0.298298, 0), (-5.48462, -6.8156, 0), (-5.69038, -7.1844, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-18.3387, 0.1139, 0), (-5.5875, -7, 0)), color=Color.from_hex("#ce4095"), width=0.141062)
add(1, 'polygon', Polygon([(-25.7079, -7.1844, 0), (-25.7079, -6.8156, 0), (-5.5875, -6.8156, 0), (-5.5875, -7.1844, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-25.7079, -7, 0), (-5.5875, -7, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(1, 'point', Point(-25.7079, -7, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-28.3079, -8.6, 0), text='A')
add(1, 'point', Point(-18.3387, 0.1139, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-16.9387, 2.3139, 0), text='Q')
add(1, 'point', Point(-5.5875, -7, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-2.9875, -8.6, 0), text='B')
add(1, 'segment', Line((-26.7879, -7.55, 0), (-27.4597, -6.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-26.0679, -7.55, 0), (-26.7397, -6.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-25.3479, -7.55, 0), (-26.0197, -6.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-24.6279, -7.55, 0), (-25.2997, -6.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-23.9079, -7.55, 0), (-24.5797, -6.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-6.6675, -7.55, 0), (-7.33925, -6.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-5.9475, -7.55, 0), (-6.61925, -6.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-5.2275, -7.55, 0), (-5.89925, -6.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-4.5075, -7.55, 0), (-5.17925, -6.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-3.7875, -7.55, 0), (-4.45925, -6.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-7.4875, -8.5, 0), (-3.6875, -8.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.06696)
add(1, 'arrow', Line((-13.5421, 1.52561, 0), (-17.7631, 0.283305, 0)), color=Color.from_hex("#3f9c20"), width=0.169632, head=(0.584784, 0.225878))
add(1, 'label', Point(-10.9421, 1.92561, 0), color=Color.from_hex("#3f9c20"), text='70.0 kN')
add(1, 'segment', Line((-26, -7, 0), (-5.3069, -7, 0)), color=Color.from_hex("#aaaaaa"), width=0.06696)
add(1, 'segment', Line((-5.3069, -7, 0), (-5.3069, 0.1139, 0)), color=Color.from_hex("#aaaaaa"), width=0.06696)
add(1, 'segment', Line((-5.3069, 0.1139, 0), (-26, 0.1139, 0)), color=Color.from_hex("#aaaaaa"), width=0.06696)
add(1, 'segment', Line((-26, 0.1139, 0), (-26, -7, 0)), color=Color.from_hex("#aaaaaa"), width=0.06696)
add(1, 'polygon', Polygon([(-26, -7, 0), (-5.3069, -7, 0), (-5.3069, 0.1139, 0), (-26, 0.1139, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.09)
add(1, 'polyline', Polyline([(-29.8505, -3.2742, 0), (-12.5828, 1.80795, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3658)
add(1, 'label', Point(-7.58282, 2.40795, 0), color=Color.from_hex("#aaaaaa"), text='F: line of action')

# step 2 — The reactions
add(2, 'arrow', Line((-29.9313, -9.281, 0), (-26.7637, -7.57025, 0)), color=Color.from_hex("#3f9c20"), width=0.122314, head=(0.39551, 0.169632))
add(2, 'label', Point(-34.9793, -10.8909, 0), color=Color.from_hex("#3f9c20"), text='A = 76.32')
add(2, 'arrow', Line((-5.5875, -2.2, 0), (-5.5875, -5.8, 0)), color=Color.from_hex("#3f9c20"), width=0.122314, head=(0.39551, 0.169632))
add(2, 'label', Point(-1.3875, -2, 0), color=Color.from_hex("#3f9c20"), text='B = 16.50')

# step 3 — A possible force path
add(3, 'label', Point(-15, -19.8, 0), color=Color.from_hex("#b9b9bd"), text='no zero-force members')
add(3, 'label', Point(-23.6562, -1.7516, 0), color=Color.from_hex("#1a1eb2"), text='-52.2')
add(3, 'label', Point(-10.9291, -1.58967, 0), color=Color.from_hex("#ce4095"), text='33.9')
add(3, 'label', Point(-15.6477, -9.0688, 0), color=Color.from_hex("#1a1eb2"), text='-29.6')

# step 4 — The force diagram
add(4, 'segment', Line((8, 11, 0), (5.04176, 11, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((5.04176, 11, 0), (1.2848, 7.3732, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((1.2848, 7.3732, 0), (8, 11, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((8, 11, 0), (5.04176, 11, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((5.04176, 11, 0), (1.2848, 7.3732, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((1.2848, 7.3732, 0), (8, 11, 0)), color=Color.from_hex("#3f9c20"), width=0.119903)
add(4, 'point', Point(8, 11, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(8, 15.6, 0), color=Color.from_hex("#aaaaaa"), text='joint A')
add(4, 'segment', Line((24, 11, 0), (17.2848, 9.02361, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((17.2848, 9.02361, 0), (20.243, 7.3732, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((20.243, 7.3732, 0), (24, 11, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((24, 11, 0), (17.2848, 9.02361, 0)), color=Color.from_hex("#3f9c20"), width=0.119903)
add(4, 'segment', Line((17.2848, 9.02361, 0), (20.243, 7.3732, 0)), color=Color.from_hex("#ce4095"), width=0.119903)
add(4, 'segment', Line((20.243, 7.3732, 0), (24, 11, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'point', Point(24, 11, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(24, 15.6, 0), color=Color.from_hex("#aaaaaa"), text='joint Q')
add(4, 'segment', Line((8, -2, 0), (8, -3.65041, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((8, -3.65041, 0), (10.9582, -3.65041, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((10.9582, -3.65041, 0), (8, -2, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((8, -2, 0), (8, -3.65041, 0)), color=Color.from_hex("#3f9c20"), width=0.119903)
add(4, 'segment', Line((8, -3.65041, 0), (10.9582, -3.65041, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((10.9582, -3.65041, 0), (8, -2, 0)), color=Color.from_hex("#ce4095"), width=0.119903)
add(4, 'point', Point(8, -2, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(8, 2.6, 0), color=Color.from_hex("#aaaaaa"), text='joint B')


if __name__ == "__main__":
    print("EX X · 7 — four identical wall slabs, four different answers —", len(ops), "operations")
