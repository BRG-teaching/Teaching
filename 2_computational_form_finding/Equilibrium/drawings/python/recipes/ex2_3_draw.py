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
add(1, 'segment', Line((-12.736, -22.644, 0), (14.684, -22.644, 0)), color=Color.from_hex("#aaaaaa"), width=0.10921)
add(1, 'segment', Line((-12.736, -23.144, 0), (-12.736, -22.144, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(1, 'segment', Line((14.684, -23.144, 0), (14.684, -22.144, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(1, 'segment', Line((-3.592, -22.644, 0), (-3.592, -15.9848, 0)), color=Color.from_hex("#ce4095"), width=0.05184)
add(1, 'polyline', Polyline([(-3.592, -9.48477, 0), (-3.592, -26.144, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2832)
add(1, 'arrow', Line((-3.592, -22.644, 0), (-3.592, -26.044, 0)), color=Color.from_hex("#3f9c20"), width=0.131328, head=(0.452736, 0.174874))
add(1, 'label', Point(-1.192, -24.544, 0), color=Color.from_hex("#3f9c20"), text='F₁d')
add(1, 'segment', Line((5.54, -22.644, 0), (5.54, -18.1901, 0)), color=Color.from_hex("#ce4095"), width=0.05184)
add(1, 'polyline', Polyline([(5.54, -11.6901, 0), (5.54, -26.144, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2832)
add(1, 'arrow', Line((5.54, -22.644, 0), (5.54, -26.044, 0)), color=Color.from_hex("#3f9c20"), width=0.131328, head=(0.452736, 0.174874))
add(1, 'label', Point(7.94, -24.544, 0), color=Color.from_hex("#3f9c20"), text='F₂d')

# step 2 — The resultant first
add(2, 'arrow', Line((8, -4, 0), (8, -12, 0)), color=Color.from_hex("#3f9c20"), width=0.131328, head=(0.452736, 0.174874))
add(2, 'label', Point(5.6, -8, 0), color=Color.from_hex("#3f9c20"), text='F₁d')
add(2, 'arrow', Line((8, -12, 0), (8, -20, 0)), color=Color.from_hex("#3f9c20"), width=0.131328, head=(0.452736, 0.174874))
add(2, 'label', Point(5.6, -16, 0), color=Color.from_hex("#3f9c20"), text='F₂d')
add(2, 'polyline', Polyline([(0.974, 14, 0), (0.974, -28.644, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2832)
add(2, 'arrow', Line((0.974, -23.844, 0), (0.974, -28.644, 0)), color=Color.from_hex("#3f9c20"), width=0.151027, dash=0.45312, head=(0.452736, 0.174874))
add(2, 'arrow', Line((7.5608, -2.94081, 0), (7.5608, -20.7205, 0)), color=Color.from_hex("#3f9c20"), width=0.151027, dash=0.45312, head=(0.452736, 0.174874))
add(2, 'label', Point(3.574, -26.244, 0), color=Color.from_hex("#3f9c20"), text='R')
add(2, 'label', Point(10.4, -12, 0), color=Color.from_hex("#3f9c20"), text='R')

# step 3 — Place the anchors
add(3, 'point', Point(-19, -0.6, 0), color=Color.from_hex("#ffffff"), width=0.3552)
add(3, 'label', Point(-20.8, 0.4, 0), text='A')
add(3, 'segment', Line((-17.92, -0.05, 0), (-17.2482, -0.721751, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(3, 'segment', Line((-18.64, -0.05, 0), (-17.9682, -0.721751, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(3, 'segment', Line((-19.36, -0.05, 0), (-18.6882, -0.721751, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(3, 'segment', Line((-20.08, -0.05, 0), (-19.4082, -0.721751, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(3, 'segment', Line((-20.8, -0.05, 0), (-20.1282, -0.721751, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(3, 'point', Point(19.34, -11.076, 0), color=Color.from_hex("#ffffff"), width=0.3552)
add(3, 'label', Point(21.14, -10.076, 0), text='B')
add(3, 'segment', Line((20.42, -10.526, 0), (21.0918, -11.1978, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(3, 'segment', Line((19.7, -10.526, 0), (20.3718, -11.1978, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(3, 'segment', Line((18.98, -10.526, 0), (19.6518, -11.1978, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(3, 'segment', Line((18.26, -10.526, 0), (18.9318, -11.1978, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(3, 'segment', Line((17.54, -10.526, 0), (18.2118, -11.1978, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)

# step 4 — Choose the thrust
add(4, 'point', Point(18.568, -14.5521, 0), color=Color.from_hex("#ffffff"), width=0.28416)
add(4, 'label', Point(19.968, -13.8521, 0), text='o')
add(4, 'segment', Line((8, -2.2, 0), (18.568, -2.2, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(4, 'label', Point(13.284, -1.1, 0), color=Color.from_hex("#aaaaaa"), text='H = 52.8 kN')

# step 5 — Node by node
add(5, 'polygon', Polygon([(-19.1781, -0.778325, 0), (-18.8219, -0.421675, 0), (-3.41394, -15.8064, 0), (-3.77006, -16.1631, 0)]), color=Color.from_hex("#f0bcdb"))
add(5, 'segment', Line((-19, -0.6, 0), (-3.592, -15.9848, 0)), color=Color.from_hex("#ce4095"), width=0.10921)
add(5, 'segment', Line((18.568, -14.5521, 0), (8, -4, 0)), color=Color.from_hex("#ce4095"), width=0.051149)
add(5, 'label', Point(-9.80937, -6.80351, 0), color=Color.from_hex("#ce4095"), text='74.7')
add(5, 'polygon', Polygon([(-3.63506, -16.1631, 0), (-3.54894, -15.8064, 0), (5.58306, -18.0117, 0), (5.49694, -18.3684, 0)]), color=Color.from_hex("#f0bcdb"))
add(5, 'segment', Line((-3.592, -15.9848, 0), (5.54, -18.1901, 0)), color=Color.from_hex("#ce4095"), width=0.10921)
add(5, 'segment', Line((18.568, -14.5521, 0), (8, -12, 0)), color=Color.from_hex("#ce4095"), width=0.051149)
add(5, 'label', Point(1.43572, -15.1755, 0), color=Color.from_hex("#ce4095"), text='54.4')
add(5, 'polygon', Polygon([(5.63193, -18.3684, 0), (5.44807, -18.0117, 0), (19.2481, -10.8977, 0), (19.4319, -11.2543, 0)]), color=Color.from_hex("#f0bcdb"))
add(5, 'segment', Line((5.54, -18.1901, 0), (19.34, -11.076, 0)), color=Color.from_hex("#ce4095"), width=0.10921)
add(5, 'segment', Line((18.568, -14.5521, 0), (8, -20, 0)), color=Color.from_hex("#ce4095"), width=0.051149)
add(5, 'label', Point(11.523, -12.8542, 0), color=Color.from_hex("#ce4095"), text='59.4')

# step 6 — The anchors pull back
add(6, 'arrow', Line((-19, -0.6, 0), (-21.9721, 2.36761, 0)), color=Color.from_hex("#3f9c20"), width=0.094694, head=(0.306202, 0.131328))
add(6, 'arrow', Line((19.3043, -14.6666, 0), (7.5608, -2.94081, 0)), color=Color.from_hex("#3f9c20"), width=0.094694, head=(0.306202, 0.131328))
add(6, 'label', Point(-24.5721, 0.767608, 0), color=Color.from_hex("#3f9c20"), text='A = 74.7')
add(6, 'arrow', Line((19.34, -11.076, 0), (23.0731, -9.15152, 0)), color=Color.from_hex("#3f9c20"), width=0.094694, head=(0.306202, 0.131328))
add(6, 'arrow', Line((7.5608, -20.7205, 0), (19.3043, -14.6666, 0)), color=Color.from_hex("#3f9c20"), width=0.094694, head=(0.306202, 0.131328))
add(6, 'label', Point(25.6731, -8.35152, 0), color=Color.from_hex("#3f9c20"), text='B = 59.4')

# step 7 — b) Choosing the cable
add(7, 'segment', Line((-19, -0.6, 0), (-3.592, -15.9848, 0)), color=Color.from_hex("#ce4095"), width=0.218419)
add(7, 'label', Point(-13.7718, -10.772, 0), color=Color.from_hex("#ce4095"), text='governing 74.7 kN')
add(7, 'circle', Circle(0.16, frame=Frame((19.684, -26.644, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#ce4095"))
add(7, 'label', Point(24.084, -26.644, 0), color=Color.from_hex("#ce4095"), text='Ø 21 mm S235')


if __name__ == "__main__":
    print("EX 2 Creative — re-anchoring a suspension bridge —", len(ops), "operations")
