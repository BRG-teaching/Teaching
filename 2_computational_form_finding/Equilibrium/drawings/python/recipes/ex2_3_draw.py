"""EX 2 Creative — re-anchoring a suspension bridge

Auto-generated from ops/ex2_3.json — the drawing as literal COMPAS
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
add(0, 'label', Point(4, -26.5, 0), text='Form diagram 1:500')
add(0, 'label', Point(4, 22, 0), text='Force diagram')
add(0, 'label', Point(4, 20.6, 0), text='1 unit ≙ 5 kN  (sheet: 1 cm ≙ 10 kN)')

# step 1 — What survives from task 2
add(1, 'segment', Line((-12.736, -18.044, 0), (14.684, -18.044, 0)), color=Color.from_hex("#aaaaaa"), width=0.10921)
add(1, 'segment', Line((-12.736, -18.544, 0), (-12.736, -17.544, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(1, 'segment', Line((14.684, -18.544, 0), (14.684, -17.544, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(1, 'segment', Line((-3.592, -18.044, 0), (-3.592, -11.3848, 0)), color=Color.from_hex("#ce4095"), width=0.05184)
add(1, 'polyline', Polyline([(-3.592, -4.88477, 0), (-3.592, -21.544, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2832)
add(1, 'arrow', Line((-3.592, -18.044, 0), (-3.592, -21.444, 0)), color=Color.from_hex("#3f9c20"), width=0.131328, head=(0.452736, 0.174874))
add(1, 'label', Point(-1.192, -19.944, 0), color=Color.from_hex("#3f9c20"), text='F₁d')
add(1, 'segment', Line((5.54, -18.044, 0), (5.54, -13.5901, 0)), color=Color.from_hex("#ce4095"), width=0.05184)
add(1, 'polyline', Polyline([(5.54, -7.09006, 0), (5.54, -21.544, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2832)
add(1, 'arrow', Line((5.54, -18.044, 0), (5.54, -21.444, 0)), color=Color.from_hex("#3f9c20"), width=0.131328, head=(0.452736, 0.174874))
add(1, 'label', Point(7.94, -19.944, 0), color=Color.from_hex("#3f9c20"), text='F₂d')

# step 2 — The resultant first
add(2, 'arrow', Line((8, -4, 0), (8, -12, 0)), color=Color.from_hex("#3f9c20"), width=0.131328, head=(0.452736, 0.174874))
add(2, 'label', Point(5.6, -8, 0), color=Color.from_hex("#3f9c20"), text='F₁d')
add(2, 'arrow', Line((8, -12, 0), (8, -20, 0)), color=Color.from_hex("#3f9c20"), width=0.131328, head=(0.452736, 0.174874))
add(2, 'label', Point(5.6, -16, 0), color=Color.from_hex("#3f9c20"), text='F₂d')
add(2, 'polyline', Polyline([(0.974, 14, 0), (0.974, -24.044, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2832)
add(2, 'arrow', Line((0.974, -19.244, 0), (0.974, -24.044, 0)), color=Color.from_hex("#3f9c20"), width=0.151027, dash=0.45312, head=(0.452736, 0.174874))
add(2, 'arrow', Line((8.4392, -3.81788, 0), (8.4392, -20.2677, 0)), color=Color.from_hex("#3f9c20"), width=0.151027, dash=0.45312, head=(0.452736, 0.174874))
add(2, 'label', Point(3.574, -21.644, 0), color=Color.from_hex("#3f9c20"), text='R')
add(2, 'label', Point(10.4, -12, 0), color=Color.from_hex("#3f9c20"), text='R')

# step 3 — Place the anchors
add(3, 'point', Point(-19, 4, 0), color=Color.from_hex("#ffffff"), width=0.3552)
add(3, 'label', Point(-20.8, 5, 0), text='A')
add(3, 'segment', Line((-17.92, 4.55, 0), (-17.2482, 3.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(3, 'segment', Line((-18.64, 4.55, 0), (-17.9682, 3.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(3, 'segment', Line((-19.36, 4.55, 0), (-18.6882, 3.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(3, 'segment', Line((-20.08, 4.55, 0), (-19.4082, 3.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(3, 'segment', Line((-20.8, 4.55, 0), (-20.1282, 3.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(3, 'point', Point(19.34, -6.476, 0), color=Color.from_hex("#ffffff"), width=0.3552)
add(3, 'label', Point(21.14, -5.476, 0), text='B')
add(3, 'segment', Line((20.42, -5.926, 0), (21.0918, -6.59775, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(3, 'segment', Line((19.7, -5.926, 0), (20.3718, -6.59775, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(3, 'segment', Line((18.98, -5.926, 0), (19.6518, -6.59775, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(3, 'segment', Line((18.26, -5.926, 0), (18.9318, -6.59775, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(3, 'segment', Line((17.54, -5.926, 0), (18.2118, -6.59775, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)

# step 4 — Choose the thrust
add(4, 'point', Point(18.568, -14.5521, 0), color=Color.from_hex("#ffffff"), width=0.28416)
add(4, 'label', Point(19.968, -13.8521, 0), text='o')
add(4, 'segment', Line((8, -2.2, 0), (18.568, -2.2, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(4, 'label', Point(13.284, -1.1, 0), color=Color.from_hex("#aaaaaa"), text='H = 52.8 kN')

# step 5 — Node by node
add(5, 'polygon', Polygon([(-19.1781, 3.82167, 0), (-18.8219, 4.17833, 0), (-3.41394, -11.2064, 0), (-3.77006, -11.5631, 0)]), color=Color.from_hex("#f0bcdb"))
add(5, 'segment', Line((-19, 4, 0), (-3.592, -11.3848, 0)), color=Color.from_hex("#ce4095"), width=0.10921)
add(5, 'segment', Line((18.568, -14.5521, 0), (8, -4, 0)), color=Color.from_hex("#ce4095"), width=0.051149)
add(5, 'label', Point(-9.80937, -2.20351, 0), color=Color.from_hex("#ce4095"), text='74.7')
add(5, 'polygon', Polygon([(-3.63506, -11.5631, 0), (-3.54894, -11.2064, 0), (5.58306, -13.4117, 0), (5.49694, -13.7684, 0)]), color=Color.from_hex("#f0bcdb"))
add(5, 'segment', Line((-3.592, -11.3848, 0), (5.54, -13.5901, 0)), color=Color.from_hex("#ce4095"), width=0.10921)
add(5, 'segment', Line((18.568, -14.5521, 0), (8, -12, 0)), color=Color.from_hex("#ce4095"), width=0.051149)
add(5, 'label', Point(1.43572, -10.5755, 0), color=Color.from_hex("#ce4095"), text='54.4')
add(5, 'polygon', Polygon([(5.63193, -13.7684, 0), (5.44807, -13.4117, 0), (19.2481, -6.29767, 0), (19.4319, -6.65433, 0)]), color=Color.from_hex("#f0bcdb"))
add(5, 'segment', Line((5.54, -13.5901, 0), (19.34, -6.476, 0)), color=Color.from_hex("#ce4095"), width=0.10921)
add(5, 'segment', Line((18.568, -14.5521, 0), (8, -20, 0)), color=Color.from_hex("#ce4095"), width=0.051149)
add(5, 'label', Point(11.523, -8.25423, 0), color=Color.from_hex("#ce4095"), text='59.4')

# step 6 — The anchors pull back
add(6, 'arrow', Line((-19, 4, 0), (-21.9721, 6.96761, 0)), color=Color.from_hex("#3f9c20"), width=0.094694, head=(0.306202, 0.131328))
add(6, 'arrow', Line((19.3043, -14.6666, 0), (8.4392, -3.81788, 0)), color=Color.from_hex("#3f9c20"), width=0.094694, head=(0.306202, 0.131328))
add(6, 'label', Point(-24.5721, 7.76761, 0), color=Color.from_hex("#3f9c20"), text='A = 74.7')
add(6, 'arrow', Line((19.34, -6.476, 0), (23.0731, -4.55152, 0)), color=Color.from_hex("#3f9c20"), width=0.094694, head=(0.306202, 0.131328))
add(6, 'arrow', Line((8.4392, -20.2677, 0), (19.3043, -14.6666, 0)), color=Color.from_hex("#3f9c20"), width=0.094694, head=(0.306202, 0.131328))
add(6, 'label', Point(25.6731, -3.75152, 0), color=Color.from_hex("#3f9c20"), text='B = 59.4')

# step 7 — b) Choosing the cable
add(7, 'segment', Line((-19, 4, 0), (-3.592, -11.3848, 0)), color=Color.from_hex("#ce4095"), width=0.218419)
add(7, 'label', Point(-13.7718, -6.17196, 0), color=Color.from_hex("#ce4095"), text='governing 74.7 kN')
add(7, 'circle', Circle(0.16, frame=Frame((19.684, -22.044, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#ce4095"))
add(7, 'label', Point(24.084, -22.044, 0), color=Color.from_hex("#ce4095"), text='Ø 21 mm S235')


if __name__ == "__main__":
    print("EX 2 Creative — re-anchoring a suspension bridge —", len(ops), "operations")
