"""EX X · 6 — one beam, five force paths, one chord force

Auto-generated from ops/exX2_6.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-14, -14.4, 0), text='a) — Form diagram 1:100')
add(0, 'label', Point(16, 20.6, 0), text='Force diagram — one closed polygon per joint')
add(0, 'label', Point(16, 19.35, 0), text='1 unit ≙ 14 kN  (sheet: 1 cm ≙ 10 kN)')
add(0, 'label', Point(-14, -16.1, 0), color=Color.from_hex("#aaaaaa"), text='the tie takes the whole thrust, so the pin carries no horizontal force')

# step 1 — The beam
add(1, 'polygon', Polygon([(-25.8551, -8.29145, 0), (-26.1449, -7.70855, 0), (-20.6125, -4.95718, 0), (-20.3226, -5.54007, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-26, -8, 0), (-20.4676, -5.24862, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(1, 'polygon', Polygon([(-20.4386, -5.54007, 0), (-20.4966, -4.95718, 0), (-14.9641, -4.4069, 0), (-14.9062, -4.9898, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-20.4676, -5.24862, 0), (-14.9352, -4.69835, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(1, 'polygon', Polygon([(-15.0221, -4.9898, 0), (-14.8482, -4.4069, 0), (-3.78335, -7.70855, 0), (-3.95729, -8.29145, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-14.9352, -4.69835, 0), (-3.87032, -8, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(1, 'polygon', Polygon([(-26, -8.29145, 0), (-26, -7.70855, 0), (-3.87032, -7.70855, 0), (-3.87032, -8.29145, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-26, -8, 0), (-3.87032, -8, 0)), color=Color.from_hex("#ce4095"), width=0.141062)
add(1, 'point', Point(-26, -8, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-28.6, -9.6, 0), text='A')
add(1, 'point', Point(-20.4676, -5.24862, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-20.4676, -3.04862, 0), text='n1')
add(1, 'point', Point(-14.9352, -4.69835, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-14.9352, -2.49835, 0), text='n2')
add(1, 'point', Point(-3.87032, -8, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-1.27032, -9.6, 0), text='B')
add(1, 'segment', Line((-27.08, -8.55, 0), (-27.7518, -7.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-26.36, -8.55, 0), (-27.0318, -7.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-25.64, -8.55, 0), (-26.3118, -7.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-24.92, -8.55, 0), (-25.5918, -7.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-24.2, -8.55, 0), (-24.8718, -7.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-4.95032, -8.55, 0), (-5.62207, -7.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-4.23032, -8.55, 0), (-4.90207, -7.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-3.51032, -8.55, 0), (-4.18207, -7.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-2.79032, -8.55, 0), (-3.46207, -7.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-2.07032, -8.55, 0), (-2.74207, -7.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-5.77032, -9.5, 0), (-1.97032, -9.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.06696)
add(1, 'arrow', Line((-20.4676, -0.248625, 0), (-20.4676, -4.64863, 0)), color=Color.from_hex("#3f9c20"), width=0.169632, head=(0.584784, 0.225878))
add(1, 'label', Point(-17.6676, 0.251375, 0), color=Color.from_hex("#3f9c20"), text='25.0 kN')
add(1, 'arrow', Line((-14.9352, 0.30165, 0), (-14.9352, -4.09835, 0)), color=Color.from_hex("#3f9c20"), width=0.169632, head=(0.584784, 0.225878))
add(1, 'label', Point(-12.1352, 0.80165, 0), color=Color.from_hex("#3f9c20"), text='25.0 kN')
add(1, 'segment', Line((-26.3328, -8.33062, 0), (-3.53751, -8.33062, 0)), color=Color.from_hex("#aaaaaa"), width=0.06696)
add(1, 'segment', Line((-3.53751, -8.33062, 0), (-3.53751, -4.36773, 0)), color=Color.from_hex("#aaaaaa"), width=0.06696)
add(1, 'segment', Line((-3.53751, -4.36773, 0), (-26.3328, -4.36773, 0)), color=Color.from_hex("#aaaaaa"), width=0.06696)
add(1, 'segment', Line((-26.3328, -4.36773, 0), (-26.3328, -8.33062, 0)), color=Color.from_hex("#aaaaaa"), width=0.06696)

# step 2 — The reactions
add(2, 'arrow', Line((-26, -12.8, 0), (-26, -9.2, 0)), color=Color.from_hex("#3f9c20"), width=0.122314, head=(0.39551, 0.169632))
add(2, 'label', Point(-29.8, -12.8, 0), color=Color.from_hex("#3f9c20"), text='A = 31.25')
add(2, 'arrow', Line((-3.87032, -12.8, 0), (-3.87032, -9.2, 0)), color=Color.from_hex("#3f9c20"), width=0.122314, head=(0.39551, 0.169632))
add(2, 'label', Point(-0.07032, -12.8, 0), color=Color.from_hex("#3f9c20"), text='B = 18.75')

# step 3 — The internal forces
add(3, 'label', Point(-14, -17.8, 0), color=Color.from_hex("#b9b9bd"), text='no zero-force members')
add(3, 'label', Point(-24.2807, -4.51926, 0), color=Color.from_hex("#1a1eb2"), text='-70.2')
add(3, 'label', Point(-17.9276, -2.69894, 0), color=Color.from_hex("#1a1eb2"), text='-63.1')
add(3, 'label', Point(-8.74272, -4.13725, 0), color=Color.from_hex("#1a1eb2"), text='-65.6')
add(3, 'label', Point(-14.9352, -10.2829, 0), color=Color.from_hex("#ce4095"), text='62.8')

# step 4 — The force diagram
add(4, 'segment', Line((8, 10, 0), (3.51164, 7.76786, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((3.51164, 7.76786, 0), (8, 7.76786, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((8, 7.76786, 0), (8, 10, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((8, 10, 0), (3.51164, 7.76786, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((3.51164, 7.76786, 0), (8, 7.76786, 0)), color=Color.from_hex("#ce4095"), width=0.119903)
add(4, 'segment', Line((8, 7.76786, 0), (8, 10, 0)), color=Color.from_hex("#3f9c20"), width=0.119903)
add(4, 'point', Point(8, 10, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(8, 15, 0), color=Color.from_hex("#aaaaaa"), text='joint A')
add(4, 'segment', Line((24, 10, 0), (19.5116, 9.55357, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((19.5116, 9.55357, 0), (19.5116, 7.76786, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((19.5116, 7.76786, 0), (24, 10, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((24, 10, 0), (19.5116, 9.55357, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((19.5116, 9.55357, 0), (19.5116, 7.76786, 0)), color=Color.from_hex("#3f9c20"), width=0.119903)
add(4, 'segment', Line((19.5116, 7.76786, 0), (24, 10, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'point', Point(24, 10, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(24, 15, 0), color=Color.from_hex("#aaaaaa"), text='joint n1')
add(4, 'segment', Line((8, -4, 0), (8, -5.78571, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((8, -5.78571, 0), (12.4884, -5.33929, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((12.4884, -5.33929, 0), (8, -4, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((8, -4, 0), (8, -5.78571, 0)), color=Color.from_hex("#3f9c20"), width=0.119903)
add(4, 'segment', Line((8, -5.78571, 0), (12.4884, -5.33929, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((12.4884, -5.33929, 0), (8, -4, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'point', Point(8, -4, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(8, 1, 0), color=Color.from_hex("#aaaaaa"), text='joint n2')
add(4, 'segment', Line((24, -4, 0), (28.4884, -5.33929, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((28.4884, -5.33929, 0), (28.4884, -4, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((28.4884, -4, 0), (24, -4, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((24, -4, 0), (28.4884, -5.33929, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((28.4884, -5.33929, 0), (28.4884, -4, 0)), color=Color.from_hex("#3f9c20"), width=0.119903)
add(4, 'segment', Line((28.4884, -4, 0), (24, -4, 0)), color=Color.from_hex("#ce4095"), width=0.119903)
add(4, 'point', Point(24, -4, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(24, 1, 0), color=Color.from_hex("#aaaaaa"), text='joint B')


if __name__ == "__main__":
    print("EX X · 6 — one beam, five force paths, one chord force —", len(ops), "operations")
