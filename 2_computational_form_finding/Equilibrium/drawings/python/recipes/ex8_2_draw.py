"""EX 8.2 — a frame corner has to be paid for

Auto-generated from ops/ex8_2.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-14.0759, -14.6, 0), text='a) a horizontal live load only — Lageplan 1:100')
add(0, 'label', Point(16, -16.4, 0), text='Kräfteplan — force diagram')
add(0, 'label', Point(16, -17.8, 0), text='global 1 unit ≙ 4 kN · joints 1 unit ≙ 12 kN  (sheet: 1 cm ≙ 10 kN)')

# step 1 — What is given
add(1, 'polygon', Polygon([(-21.2025, -8, 0), (-21.2025, -4.34825, 0), (-21.2025, -0.6965, 0), (-17.513, -0.6965, 0), (-13.8234, -0.6965, 0), (-13.7356, -0.6965, 0), (-10.3424, -2.45622, 0), (-6.9492, -4.21595, 0), (-6.9492, -7.92103, 0), (-6.9492, -11.6261, 0), (-7.365, -11.6261, 0), (-9.38325, -5.5106, 0), (-13.7464, -1.22165, 0), (-13.8234, -1.1312, 0), (-18.7901, -3.0158, 0), (-20.7827, -8, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.11)
add(1, 'segment', Line((-21.2025, -8, 0), (-21.2025, -0.6965, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'segment', Line((-21.2025, -0.6965, 0), (-13.8234, -0.6965, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'segment', Line((-13.8234, -0.6965, 0), (-13.7356, -0.6965, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'segment', Line((-13.7356, -0.6965, 0), (-6.9492, -4.21595, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'segment', Line((-6.9492, -4.21595, 0), (-6.9492, -11.6261, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'segment', Line((-6.9492, -11.6261, 0), (-7.365, -11.6261, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'segment', Line((-7.365, -11.6261, 0), (-9.38325, -5.5106, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'segment', Line((-9.38325, -5.5106, 0), (-13.7464, -1.22165, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'segment', Line((-13.7464, -1.22165, 0), (-13.8234, -1.1312, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'segment', Line((-13.8234, -1.1312, 0), (-18.7901, -3.0158, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'segment', Line((-18.7901, -3.0158, 0), (-20.7827, -8, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'segment', Line((-20.7827, -8, 0), (-21.2025, -8, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'point', Point(-21, -8, 0), color=Color.from_hex("#ffffff"), width=0.4292)
add(1, 'label', Point(-22.8, -9, 0), text='A')
add(1, 'segment', Line((-22.02, -8.5, 0), (-22.6918, -7.82825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((-21.34, -8.5, 0), (-22.0118, -7.82825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((-20.66, -8.5, 0), (-21.3318, -7.82825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((-19.98, -8.5, 0), (-20.6518, -7.82825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((-19.3, -8.5, 0), (-19.9718, -7.82825, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'point', Point(-7.1517, -11.6261, 0), color=Color.from_hex("#ffffff"), width=0.4292)
add(1, 'label', Point(-5.3517, -12.6261, 0), text='B')
add(1, 'segment', Line((-8.1717, -12.1261, 0), (-8.84345, -11.4543, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((-7.4917, -12.1261, 0), (-8.16345, -11.4543, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((-6.8117, -12.1261, 0), (-7.48345, -11.4543, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((-6.1317, -12.1261, 0), (-6.80345, -11.4543, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((-5.4517, -12.1261, 0), (-6.12345, -11.4543, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'point', Point(-13.7789, -0.899, 0), color=Color.from_hex("#ffffff"), width=0.4292)
add(1, 'label', Point(-15.3788, 0.001, 0), text='C')
add(1, 'arrow', Line((-17.9789, -0.899, 0), (-14.7789, -0.899, 0)), color=Color.from_hex("#3f9c20"), width=0.158688, head=(0.547056, 0.211306))
add(1, 'label', Point(-21.5788, 0.001, 0), color=Color.from_hex("#3f9c20"), text='Q_d = 45.0 kN')
add(1, 'polyline', Polyline([(-22.7788, -0.899, 0), (-4.77885, -0.899, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3422)

# step 3 — Three hinges, one drawing
add(3, 'arrow', Line((14, 6, 0), (2.75, 6, 0)), color=Color.from_hex("#3f9c20"), width=0.158688, head=(0.547056, 0.211306))
add(3, 'label', Point(8.375, 7.4, 0), color=Color.from_hex("#3f9c20"), text='Q_d = 45.0')

# step 4 — Read the reactions
add(4, 'segment', Line((2.75, 6, 0), (9.74838, 12.8819, 0)), color=Color.from_hex("#3f9c20"), width=0.131962)
add(4, 'segment', Line((9.74838, 12.8819, 0), (14, 6, 0)), color=Color.from_hex("#3f9c20"), width=0.131962)
add(4, 'label', Point(3.44919, 8.84097, 0), color=Color.from_hex("#3f9c20"), text='A = 39.3')
add(4, 'label', Point(14.6742, 10.041, 0), color=Color.from_hex("#3f9c20"), text='B = 32.4')
add(4, 'segment', Line((-21, -8, 0), (-13.7789, -0.899, 0)), color=Color.from_hex("#aaaaaa"), width=0.131962)
add(4, 'segment', Line((-13.7789, -0.899, 0), (-7.1517, -11.6261, 0)), color=Color.from_hex("#aaaaaa"), width=0.131962)
add(4, 'label', Point(-22.7894, -3.0495, 0), color=Color.from_hex("#aaaaaa"), text='thrust line')
add(4, 'arrow', Line((-23.2816, -10.2437, 0), (-21.713, -8.70115, 0)), color=Color.from_hex("#3f9c20"), width=0.114422, head=(0.369994, 0.158688))
add(4, 'label', Point(-26.2816, -10.8437, 0), color=Color.from_hex("#3f9c20"), text='A = 39.3')
add(4, 'arrow', Line((-8.83357, -8.90373, 0), (-7.67728, -10.7754, 0)), color=Color.from_hex("#3f9c20"), width=0.114422, head=(0.369994, 0.158688))
add(4, 'label', Point(-5.83357, -9.50373, 0), color=Color.from_hex("#3f9c20"), text='B = 32.4')

# step 5 — But it does not fit
add(5, 'segment', Line((-17.3386, -4.39949, 0), (-17.9802, -2.70851, 0)), color=Color.from_hex("#ce4095"), width=0.131962)
add(5, 'label', Point(-18.6594, -5.354, 0), color=Color.from_hex("#ce4095"), text='1.34 m outside the concrete')
add(5, 'segment', Line((-13.7789, -0.899, 0), (-6.9492, -4.21595, 0)), color=Color.from_hex("#1a1eb2"), width=0.131962)
add(5, 'label', Point(-9.22816, -0.218712, 0), color=Color.from_hex("#1a1eb2"), text='19.1')
add(5, 'segment', Line((-13.7789, -0.899, 0), (-9.38325, -5.5106, 0)), color=Color.from_hex("#ce4095"), width=0.131962)
add(5, 'label', Point(-13.4631, -4.99867, 0), color=Color.from_hex("#ce4095"), text='49.6')
add(5, 'label', Point(-9.38718, -2.56778, 0), color=Color.from_hex("#ce4095"), text='20.0')
add(5, 'label', Point(-10.7099, -9.45961, 0), color=Color.from_hex("#ce4095"), text='48.2')
add(5, 'label', Point(-4.45142, -7.99205, 0), color=Color.from_hex("#1a1eb2"), text='17.8')
add(5, 'label', Point(5, -6.70517, 0), text='joint C: load + C–O + C–K')
add(5, 'arrow', Line((6.42481, -11.4948, 0), (5.00761, -9.20085, 0)), color=Color.from_hex("#3f9c20"), width=0.114422, head=(0.369994, 0.158688))
add(5, 'arrow', Line((5.00761, -9.20085, 0), (3.57518, -8.50517, 0)), color=Color.from_hex("#1a1eb2"), width=0.114422, head=(0.369994, 0.158688))
add(5, 'arrow', Line((3.57518, -8.50517, 0), (6.42481, -11.4948, 0)), color=Color.from_hex("#ce4095"), width=0.114422, head=(0.369994, 0.158688))
add(5, 'label', Point(16, -7.46046, 0), text='joint O: C–O + K–O + O–S')
add(5, 'arrow', Line((15.304, -9.26046, 0), (16.7364, -9.95615, 0)), color=Color.from_hex("#1a1eb2"), width=0.114422, head=(0.369994, 0.158688))
add(5, 'arrow', Line((16.7364, -9.95615, 0), (15.2636, -10.7395, 0)), color=Color.from_hex("#ce4095"), width=0.114422, head=(0.369994, 0.158688))
add(5, 'arrow', Line((15.2636, -10.7395, 0), (15.304, -9.26046, 0)), color=Color.from_hex("#1a1eb2"), width=0.114422, head=(0.369994, 0.158688))
add(5, 'label', Point(27, -6.31347, 0), text='joint K: C–K + K–O + K–S')
add(5, 'arrow', Line((28.4248, -11.8865, 0), (25.5752, -8.89687, 0)), color=Color.from_hex("#ce4095"), width=0.114422, head=(0.369994, 0.158688))
add(5, 'arrow', Line((25.5752, -8.89687, 0), (27.048, -8.11347, 0)), color=Color.from_hex("#ce4095"), width=0.114422, head=(0.369994, 0.158688))
add(5, 'arrow', Line((27.048, -8.11347, 0), (28.4248, -11.8865, 0)), color=Color.from_hex("#ce4095"), width=0.114422, head=(0.369994, 0.158688))

# step 6 — Redirect it
add(6, 'segment', Line((-9.38325, -5.5106, 0), (-6.9492, -4.21595, 0)), color=Color.from_hex("#ce4095"), width=0.131962)
add(6, 'segment', Line((-9.38325, -5.5106, 0), (-7.1517, -11.6261, 0)), color=Color.from_hex("#ce4095"), width=0.131962)
add(6, 'segment', Line((-6.9492, -4.21595, 0), (-7.1517, -11.6261, 0)), color=Color.from_hex("#1a1eb2"), width=0.131962)


if __name__ == "__main__":
    print("EX 8.2 — a frame corner has to be paid for —", len(ops), "operations")
