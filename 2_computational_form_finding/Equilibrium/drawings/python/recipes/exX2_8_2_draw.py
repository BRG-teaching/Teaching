"""EX X · 8.2 — an indeterminate frame, where the designer chooses

Auto-generated from ops/exX2_8_2.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-14, -14.6, 0), text='a) — Form diagram 1:100')
add(0, 'label', Point(16, 21.4, 0), text='Force diagram — one closed polygon per joint')
add(0, 'label', Point(16, 19.8, 0), text='1 unit ≙ 12 kN  (sheet: 1 cm ≙ 10 kN)')
add(0, 'label', Point(-14, -16.3, 0), color=Color.from_hex("#aaaaaa"), text='the three lines of action meet 2.684 m up — inside the beam, so an arch fits')

# step 1 — The frame
add(1, 'polygon', Polygon([(-25.886, -11.1853, 0), (-26.114, -10.8147, 0), (-14.3287, -3.56831, 0), (-14.1008, -3.93898, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-26, -11, 0), (-14.2148, -3.75365, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(1, 'polygon', Polygon([(-14.3287, -3.93898, 0), (-14.1008, -3.56831, 0), (-2.31558, -10.8147, 0), (-2.5435, -11.1853, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-14.2148, -3.75365, 0), (-2.42954, -11, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(1, 'point', Point(-26, -11, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-28.6, -12.8, 0), text='A')
add(1, 'point', Point(-14.2148, -3.75365, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-15.6148, -1.35365, 0), text='C')
add(1, 'point', Point(-2.42954, -11, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(0.17046, -12.8, 0), text='B')
add(1, 'segment', Line((-27.08, -11.55, 0), (-27.7518, -10.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-26.36, -11.55, 0), (-27.0318, -10.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-25.64, -11.55, 0), (-26.3118, -10.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-24.92, -11.55, 0), (-25.5918, -10.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-24.2, -11.55, 0), (-24.8718, -10.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-3.50954, -11.55, 0), (-4.18129, -10.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-2.78954, -11.55, 0), (-3.46129, -10.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-2.06954, -11.55, 0), (-2.74129, -10.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-1.34954, -11.55, 0), (-2.02129, -10.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-0.62954, -11.55, 0), (-1.30129, -10.8782, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'arrow', Line((-14.2148, 1.24635, 0), (-14.2148, -3.15365, 0)), color=Color.from_hex("#3f9c20"), width=0.169632, head=(0.584784, 0.225878))
add(1, 'label', Point(-11.2148, 1.74635, 0), color=Color.from_hex("#3f9c20"), text='30.0 kN')
add(1, 'polygon', Polygon([(-26.3607, -11, 0), (-26.3607, -2.64998, 0), (-2.06882, -2.64998, 0), (-2.06882, -11, 0), (-5.69033, -11, 0), (-5.69627, -5.36429, 0), (-22.7333, -5.36429, 0), (-22.7333, -11, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.12)
add(1, 'segment', Line((-26.3607, -11, 0), (-26.3607, -2.64998, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-26.3607, -2.64998, 0), (-2.06882, -2.64998, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-2.06882, -2.64998, 0), (-2.06882, -11, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-2.06882, -11, 0), (-5.69033, -11, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-5.69033, -11, 0), (-5.69627, -5.36429, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-5.69627, -5.36429, 0), (-22.7333, -5.36429, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-22.7333, -5.36429, 0), (-22.7333, -11, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-22.7333, -11, 0), (-26.3607, -11, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'polyline', Polyline([(-14.2148, 4.37002, 0), (-14.2148, -14.24, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3658)

# step 2 — What the drawing decides
add(2, 'arrow', Line((-30.0889, -13.5141, 0), (-27.0222, -11.6285, 0)), color=Color.from_hex("#3f9c20"), width=0.122314, head=(0.39551, 0.169632))
add(2, 'label', Point(-34.3482, -14.9046, 0), color=Color.from_hex("#3f9c20"), text='A = 28.64')
add(2, 'arrow', Line((1.65936, -13.5141, 0), (-1.40731, -11.6285, 0)), color=Color.from_hex("#3f9c20"), width=0.122314, head=(0.39551, 0.169632))
add(2, 'label', Point(5.91862, -14.9046, 0), color=Color.from_hex("#3f9c20"), text='B = 28.64')

# step 3 — The member forces
add(3, 'label', Point(-14, -18, 0), color=Color.from_hex("#b9b9bd"), text='no zero-force members')
add(3, 'label', Point(-21.2257, -5.558, 0), color=Color.from_hex("#1a1eb2"), text='-28.6')
add(3, 'label', Point(-7.20382, -5.558, 0), color=Color.from_hex("#1a1eb2"), text='-28.6')

# step 4 — The force diagram
add(4, 'segment', Line((8, 11, 0), (5.96704, 9.75, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((5.96704, 9.75, 0), (8, 11, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((8, 11, 0), (5.96704, 9.75, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((5.96704, 9.75, 0), (8, 11, 0)), color=Color.from_hex("#3f9c20"), width=0.119903)
add(4, 'point', Point(8, 11, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(8, 15.8, 0), color=Color.from_hex("#aaaaaa"), text='joint A')
add(4, 'segment', Line((24, 11, 0), (24, 8.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((24, 8.5, 0), (26.033, 9.75, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((26.033, 9.75, 0), (24, 11, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((24, 11, 0), (24, 8.5, 0)), color=Color.from_hex("#3f9c20"), width=0.119903)
add(4, 'segment', Line((24, 8.5, 0), (26.033, 9.75, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((26.033, 9.75, 0), (24, 11, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'point', Point(24, 11, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(24, 15.8, 0), color=Color.from_hex("#aaaaaa"), text='joint C')
add(4, 'segment', Line((8, -5, 0), (10.033, -6.25, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((10.033, -6.25, 0), (8, -5, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((8, -5, 0), (10.033, -6.25, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((10.033, -6.25, 0), (8, -5, 0)), color=Color.from_hex("#3f9c20"), width=0.119903)
add(4, 'point', Point(8, -5, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(8, -0.2, 0), color=Color.from_hex("#aaaaaa"), text='joint B')


if __name__ == "__main__":
    print("EX X · 8.2 — an indeterminate frame, where the designer chooses —", len(ops), "operations")
