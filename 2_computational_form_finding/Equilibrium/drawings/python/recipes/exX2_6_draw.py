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
add(0, 'label', Point(16, 21.4, 0), text='Force diagram — one closed polygon per joint')
add(0, 'label', Point(16, 19.8, 0), text='1 unit ≙ 14 kN  (sheet: 1 cm ≙ 10 kN)')
add(0, 'label', Point(-14, -16.1, 0), color=Color.from_hex("#aaaaaa"), text='the tie takes the whole thrust, so the pin carries no horizontal force')

# step 1 — The beam
add(1, 'polygon', Polygon([(-25.8551, -6.29145, 0), (-26.1449, -5.70855, 0), (-20.6125, -2.95718, 0), (-20.3226, -3.54007, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-26, -6, 0), (-20.4676, -3.24863, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(1, 'polygon', Polygon([(-20.4386, -3.54007, 0), (-20.4966, -2.95718, 0), (-14.9641, -2.4069, 0), (-14.9062, -2.9898, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-20.4676, -3.24863, 0), (-14.9352, -2.69835, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(1, 'polygon', Polygon([(-15.0221, -2.9898, 0), (-14.8482, -2.4069, 0), (-3.78335, -5.70855, 0), (-3.95729, -6.29145, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-14.9352, -2.69835, 0), (-3.87032, -6, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(1, 'polygon', Polygon([(-26, -6.29145, 0), (-26, -5.70855, 0), (-3.87032, -5.70855, 0), (-3.87032, -6.29145, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-26, -6, 0), (-3.87032, -6, 0)), color=Color.from_hex("#ce4095"), width=0.141062)
add(1, 'point', Point(-26, -6, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-28.6, -7.6, 0), text='A')
add(1, 'point', Point(-20.4676, -3.24863, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-20.4676, -1.04862, 0), text='n1')
add(1, 'point', Point(-14.9352, -2.69835, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-14.9352, -0.49835, 0), text='n2')
add(1, 'point', Point(-3.87032, -6, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-1.27032, -7.6, 0), text='B')
add(1, 'segment', Line((-27.08, -6.55, 0), (-27.7518, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-26.36, -6.55, 0), (-27.0318, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-25.64, -6.55, 0), (-26.3118, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-24.92, -6.55, 0), (-25.5918, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-24.2, -6.55, 0), (-24.8718, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-4.95032, -6.55, 0), (-5.62207, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-4.23032, -6.55, 0), (-4.90207, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-3.51032, -6.55, 0), (-4.18207, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-2.79032, -6.55, 0), (-3.46207, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-2.07032, -6.55, 0), (-2.74207, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-5.77032, -7.5, 0), (-1.97032, -7.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.06696)
add(1, 'arrow', Line((-20.4676, 1.75137, 0), (-20.4676, -2.64863, 0)), color=Color.from_hex("#3f9c20"), width=0.169632, head=(0.584784, 0.225878))
add(1, 'label', Point(-17.6676, 2.25137, 0), color=Color.from_hex("#3f9c20"), text='25.0 kN')
add(1, 'arrow', Line((-14.9352, 2.30165, 0), (-14.9352, -2.09835, 0)), color=Color.from_hex("#3f9c20"), width=0.169632, head=(0.584784, 0.225878))
add(1, 'label', Point(-12.1352, 2.80165, 0), color=Color.from_hex("#3f9c20"), text='25.0 kN')
add(1, 'segment', Line((-26.3328, -6.33063, 0), (-3.53751, -6.33063, 0)), color=Color.from_hex("#aaaaaa"), width=0.06696)
add(1, 'segment', Line((-3.53751, -6.33063, 0), (-3.53751, -2.36773, 0)), color=Color.from_hex("#aaaaaa"), width=0.06696)
add(1, 'segment', Line((-3.53751, -2.36773, 0), (-26.3328, -2.36773, 0)), color=Color.from_hex("#aaaaaa"), width=0.06696)
add(1, 'segment', Line((-26.3328, -2.36773, 0), (-26.3328, -6.33063, 0)), color=Color.from_hex("#aaaaaa"), width=0.06696)

# step 2 — The reactions
add(2, 'arrow', Line((-26, -10.8, 0), (-26, -7.2, 0)), color=Color.from_hex("#3f9c20"), width=0.122314, head=(0.39551, 0.169632))
add(2, 'label', Point(-29.8, -10.8, 0), color=Color.from_hex("#3f9c20"), text='A = 31.25')
add(2, 'arrow', Line((-3.87032, -10.8, 0), (-3.87032, -7.2, 0)), color=Color.from_hex("#3f9c20"), width=0.122314, head=(0.39551, 0.169632))
add(2, 'label', Point(-0.07032, -10.8, 0), color=Color.from_hex("#3f9c20"), text='B = 18.75')

# step 3 — The internal forces
add(3, 'label', Point(-14, -17.8, 0), color=Color.from_hex("#b9b9bd"), text='no zero-force members')
add(3, 'label', Point(-24.2807, -2.51926, 0), color=Color.from_hex("#1a1eb2"), text='-70.2')
add(3, 'label', Point(-17.9276, -0.698939, 0), color=Color.from_hex("#1a1eb2"), text='-63.1')
add(3, 'label', Point(-8.74272, -2.13726, 0), color=Color.from_hex("#1a1eb2"), text='-65.6')
add(3, 'label', Point(-14.9352, -8.2829, 0), color=Color.from_hex("#ce4095"), text='62.8')

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
