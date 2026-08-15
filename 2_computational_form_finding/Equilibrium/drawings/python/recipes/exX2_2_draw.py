"""EX X · 2 — the truss whose roller lifts off

Auto-generated from ops/exX2_2.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-15, -13.4, 0), text='Form diagram 1:100 — the sheet prints no dimensions')
add(0, 'label', Point(16, 21.4, 0), text='Force diagram — one closed polygon per joint')
add(0, 'label', Point(16, 19.8, 0), text='1 unit ≙ 14 kN  (sheet: 1 cm ≙ 10 kN)')
add(0, 'label', Point(-15, -15.4, 0), color=Color.from_hex("#aaaaaa"), text='the roller at B comes out in UPLIFT — as drawn, this truss lifts off its right-hand bearing')

# step 1 — The truss
add(1, 'polygon', Polygon([(-25.7464, -6.20406, 0), (-26.2536, -5.79594, 0), (-19.8672, 2.14086, 0), (-19.36, 1.73274, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-26, -6, 0), (-19.6136, 1.9368, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(1, 'polygon', Polygon([(-19.7568, 1.9368, 0), (-19.4704, 1.9368, 0), (-19.4704, -4.1496, 0), (-19.7568, -4.1496, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-19.6136, 1.9368, 0), (-19.6136, -4.1496, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(1, 'polygon', Polygon([(-25.9284, -6.24717, 0), (-26.0716, -5.75283, 0), (-19.6852, -3.90243, 0), (-19.542, -4.39677, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-26, -6, 0), (-19.6136, -4.1496, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(1, 'polygon', Polygon([(-19.6852, -4.39677, 0), (-19.542, -3.90243, 0), (-5.53081, -7.96083, 0), (-5.67399, -8.45517, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-19.6136, -4.1496, 0), (-5.6024, -8.208, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(1, 'polygon', Polygon([(-19.7926, 1.68963, 0), (-19.4346, 2.18397, 0), (-5.42344, -7.96083, 0), (-5.78136, -8.45517, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-19.6136, 1.9368, 0), (-5.6024, -8.208, 0)), color=Color.from_hex("#ce4095"), width=0.141062)
add(1, 'point', Point(-26, -6, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-29.2, -6.4, 0), text='A')
add(1, 'point', Point(-19.6136, 1.9368, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-22.2136, 3.7368, 0), text='T')
add(1, 'point', Point(-19.6136, -4.1496, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-17.2136, -2.9496, 0), text='M')
add(1, 'point', Point(-5.6024, -8.208, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-2.8024, -9.608, 0), text='B')
add(1, 'segment', Line((-27.08, -6.55, 0), (-27.7518, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-26.36, -6.55, 0), (-27.0318, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-25.64, -6.55, 0), (-26.3118, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-24.92, -6.55, 0), (-25.5918, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-24.2, -6.55, 0), (-24.8718, -5.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-6.6824, -8.758, 0), (-7.35415, -8.08625, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-5.9624, -8.758, 0), (-6.63415, -8.08625, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-5.2424, -8.758, 0), (-5.91415, -8.08625, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-4.5224, -8.758, 0), (-5.19415, -8.08625, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-3.8024, -8.758, 0), (-4.47415, -8.08625, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-7.5024, -9.708, 0), (-3.7024, -9.708, 0)), color=Color.from_hex("#aaaaaa"), width=0.06696)
add(1, 'arrow', Line((-15.1109, 4.1106, 0), (-19.0733, 2.19766, 0)), color=Color.from_hex("#3f9c20"), width=0.169632, head=(0.584784, 0.225878))
add(1, 'label', Point(-18.3109, 4.9106, 0), color=Color.from_hex("#3f9c20"), text='100.0 kN')
add(1, 'polyline', Polyline([(-27.7185, -1.97604, 0), (-7.90649, 7.58868, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3658)
add(1, 'label', Point(-3.5065, 8.08868, 0), color=Color.from_hex("#aaaaaa"), text='F: line of action')

# step 2 — Global equilibrium
add(2, 'arrow', Line((-29.894, -8.80652, 0), (-26.9735, -6.70163, 0)), color=Color.from_hex("#3f9c20"), width=0.122314, head=(0.39551, 0.169632))
add(2, 'label', Point(-33.3695, -9.57264, 0), color=Color.from_hex("#3f9c20"), text='A = 111.01')
add(2, 'arrow', Line((-5.6024, -3.408, 0), (-5.6024, -7.008, 0)), color=Color.from_hex("#3f9c20"), width=0.122314, head=(0.39551, 0.169632))
add(2, 'label', Point(-1.6024, -3.208, 0), color=Color.from_hex("#3f9c20"), text='B = 21.43')

# step 3 — The member forces
add(3, 'label', Point(-15, -17.4, 0), color=Color.from_hex("#b9b9bd"), text='no zero-force members')
add(3, 'label', Point(-24.6385, -0.557747, 0), color=Color.from_hex("#1a1eb2"), text='-65.0')
add(3, 'label', Point(-17.6272, -1.1064, 0), color=Color.from_hex("#1a1eb2"), text='-28.6')
add(3, 'label', Point(-22.1905, -7.20199, 0), color=Color.from_hex("#1a1eb2"), text='-51.4')
add(3, 'label', Point(-13.2242, -8.30602, 0), color=Color.from_hex("#1a1eb2"), text='-51.4')
add(3, 'label', Point(-11.2531, -1.2643, 0), color=Color.from_hex("#ce4095"), text='60.9')

# step 4 — The force diagram
add(4, 'segment', Line((8, 10, 0), (4.47646, 8.97909, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((4.47646, 8.97909, 0), (1.56752, 5.36396, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((1.56753, 5.36396, 0), (8, 10, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((8, 10, 0), (4.47646, 8.97909, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((4.47646, 8.97909, 0), (1.56752, 5.36396, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((1.56753, 5.36396, 0), (8, 10, 0)), color=Color.from_hex("#3f9c20"), width=0.119903)
add(4, 'point', Point(8, 10, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(8, 15.6, 0), color=Color.from_hex("#aaaaaa"), text='joint A')
add(4, 'segment', Line((24, 10, 0), (17.5675, 6.89457, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((17.5675, 6.89457, 0), (21.0911, 4.34336, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((21.0911, 4.34336, 0), (24, 7.95848, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((24, 7.95848, 0), (24, 10, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((24, 10, 0), (17.5675, 6.89457, 0)), color=Color.from_hex("#3f9c20"), width=0.119903)
add(4, 'segment', Line((17.5675, 6.89457, 0), (21.0911, 4.34336, 0)), color=Color.from_hex("#ce4095"), width=0.119903)
add(4, 'segment', Line((21.0911, 4.34336, 0), (24, 7.95848, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((24, 7.95848, 0), (24, 10, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'point', Point(24, 10, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(24, 15.6, 0), color=Color.from_hex("#aaaaaa"), text='joint T')
add(4, 'segment', Line((8, -5, 0), (8, -7.04152, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((8, -7.04152, 0), (11.5235, -6.02061, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((11.5235, -6.02061, 0), (8, -5, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((8, -5, 0), (8, -7.04152, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((8, -7.04152, 0), (11.5235, -6.02061, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((11.5235, -6.02061, 0), (8, -5, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'point', Point(8, -5, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(8, 0.6, 0), color=Color.from_hex("#aaaaaa"), text='joint M')
add(4, 'segment', Line((24, -5, 0), (24, -6.53061, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((24, -6.53061, 0), (27.5235, -7.55122, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((27.5235, -7.55122, 0), (24, -5, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((24, -5, 0), (24, -6.53061, 0)), color=Color.from_hex("#3f9c20"), width=0.119903)
add(4, 'segment', Line((24, -6.53061, 0), (27.5235, -7.55122, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((27.5235, -7.55122, 0), (24, -5, 0)), color=Color.from_hex("#ce4095"), width=0.119903)
add(4, 'point', Point(24, -5, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(24, 0.6, 0), color=Color.from_hex("#aaaaaa"), text='joint B')


if __name__ == "__main__":
    print("EX X · 2 — the truss whose roller lifts off —", len(ops), "operations")
