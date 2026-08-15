"""EX X · 9.1 — the thrust line, and the number the sheet forgot

Auto-generated from ops/exX2_9_1.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-14, -16.4, 0), text='a) — Form diagram 1:100')
add(0, 'label', Point(17, 21.4, 0), text='Force diagram — the closing triangle')
add(0, 'label', Point(17, 19.8, 0), text='1 unit ≙ 8.33 kN — the sheet asks for 1 cm ≙ 10 kN and gives no load')
add(0, 'label', Point(-14, -18.2, 0), color=Color.from_hex("#aaaaaa"), text='three hinges: two pins and the crown — statically determinate')

# step 1 — The number that is missing
add(1, 'polygon', Polygon([(-26, -13, 0), (-22.3566, -13, 0), (-22.3566, -5.6814, 0), (-17.8354, -5.6814, 0), (-15.0678, -2.9582, 0), (-14.953, -2.9582, 0), (-12.1856, -5.6814, 0), (-7.6644, -5.6814, 0), (-7.6644, -13, 0), (-4.021, -13, 0), (-4.021, -2.181, 0), (-26, -2.181, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.12)
add(1, 'segment', Line((-26, -13, 0), (-22.3566, -13, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-22.3566, -13, 0), (-22.3566, -5.6814, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-22.3566, -5.6814, 0), (-17.8354, -5.6814, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-17.8354, -5.6814, 0), (-15.0678, -2.9582, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-15.0678, -2.9582, 0), (-14.953, -2.9582, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-14.953, -2.9582, 0), (-12.1856, -5.6814, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-12.1856, -5.6814, 0), (-7.6644, -5.6814, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-7.6644, -5.6814, 0), (-7.6644, -13, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-7.6644, -13, 0), (-4.021, -13, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-4.021, -13, 0), (-4.021, -2.181, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-4.021, -2.181, 0), (-26, -2.181, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-26, -2.181, 0), (-26, -13, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'circle', Circle(0.2, frame=Frame((-15.0104, -2.5648, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#111111"))
add(1, 'label', Point(-23.2104, -1.1648, 0), color=Color.from_hex("#aaaaaa"), text='hinge')
add(1, 'point', Point(-25.7002, -13, 0), color=Color.from_hex("#ffffff"), width=0.4588)
add(1, 'segment', Line((-26.7802, -13.6, 0), (-27.452, -12.9282, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-26.0602, -13.6, 0), (-26.732, -12.9282, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-25.3402, -13.6, 0), (-26.012, -12.9282, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-24.6202, -13.6, 0), (-25.292, -12.9282, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-23.9002, -13.6, 0), (-24.572, -12.9282, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'label', Point(-28.3002, -14.6, 0), text='A')
add(1, 'point', Point(-4.3208, -13, 0), color=Color.from_hex("#ffffff"), width=0.4588)
add(1, 'segment', Line((-5.4008, -13.6, 0), (-6.07255, -12.9282, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-4.6808, -13.6, 0), (-5.35255, -12.9282, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-3.9608, -13.6, 0), (-4.63255, -12.9282, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-3.2408, -13.6, 0), (-3.91255, -12.9282, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-2.5208, -13.6, 0), (-3.19255, -12.9282, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'label', Point(-1.7208, -14.6, 0), text='B')
add(1, 'arrow', Line((-15.0104, 4.1352, 0), (-15.0104, -1.8648, 0)), color=Color.from_hex("#3f9c20"), width=0.169632, head=(0.584784, 0.225878))
add(1, 'label', Point(-8.4104, 2.3352, 0), color=Color.from_hex("#3f9c20"), text='G_d = 100 kN')
add(1, 'polyline', Polyline([(-15.0104, 5.1352, 0), (-15.0104, -15.8, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3658)

# step 2 — Three hinges make it determinate
add(2, 'arrow', Line((-29.4212, -16.6324, 0), (-26.5589, -13.8382, 0)), color=Color.from_hex("#3f9c20"), width=0.122314, head=(0.39551, 0.169632))
add(2, 'label', Point(-33.6212, -17.6324, 0), color=Color.from_hex("#3f9c20"), text='A = 71.58')
add(2, 'arrow', Line((-0.599834, -16.6324, 0), (-3.46212, -13.8382, 0)), color=Color.from_hex("#3f9c20"), width=0.122314, head=(0.39551, 0.169632))
add(2, 'label', Point(3.60017, -17.6324, 0), color=Color.from_hex("#3f9c20"), text='B = 71.58')
add(2, 'arrow', Line((13, 14, 0), (13, 2, 0)), color=Color.from_hex("#3f9c20"), width=0.169632, head=(0.584784, 0.225878))
add(2, 'segment', Line((13, 2, 0), (19.1463, 7.99994, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(2, 'segment', Line((19.1463, 7.99994, 0), (13, 14, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(2, 'label', Point(5.4, 8, 0), color=Color.from_hex("#3f9c20"), text='G_d = 100')
add(2, 'label', Point(20.4732, 3.99997, 0), color=Color.from_hex("#3f9c20"), text='A = 71.58')
add(2, 'label', Point(20.4732, 12, 0), color=Color.from_hex("#3f9c20"), text='B = 71.58')
add(2, 'segment', Line((13, 16.6, 0), (19.1463, 16.6, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(2, 'label', Point(16.0732, 18, 0), color=Color.from_hex("#aaaaaa"), text='H = 51.22 kN = 0.5122 × load')

# step 3 — The thrust line
add(3, 'segment', Line((-25.7002, -13, 0), (-15.0104, -2.5648, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(3, 'segment', Line((-15.0104, -2.5648, 0), (-4.3208, -13, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(3, 'segment', Line((-4.3208, -13, 0), (-4.3208, -13, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(3, 'segment', Line((-4.3208, -13, 0), (-4.3208, -13, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(3, 'label', Point(-26.9553, -7.1824, 0), color=Color.from_hex("#1a1eb2"), text='thrust line')


if __name__ == "__main__":
    print("EX X · 9.1 — the thrust line, and the number the sheet forgot —", len(ops), "operations")
