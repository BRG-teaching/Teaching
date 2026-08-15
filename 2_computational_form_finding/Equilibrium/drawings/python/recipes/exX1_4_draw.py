"""EX X · Task 4 — a possible funicular, four ways

Auto-generated from ops/exX1_4.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-21.3, -10.8, 0), text='form diagram 1:100 — a)')
add(0, 'label', Point(7, 15.4, 0), text='force diagram  1 cm ≙ 20 kN')

# step 1 — The span and the loads
add(1, 'point', Point(-28.5, 2, 0), color=Color.from_hex("#ffffff"), width=0.3996)
add(1, 'segment', Line((-29.4, 1.55, 0), (-30.001, 2.15104, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-28.8, 1.55, 0), (-29.401, 2.15104, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-28.2, 1.55, 0), (-28.801, 2.15104, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-27.6, 1.55, 0), (-28.201, 2.15104, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-27, 1.55, 0), (-27.601, 2.15104, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'label', Point(-30, 2.9, 0), text='A')
add(1, 'point', Point(-14.1, 2, 0), color=Color.from_hex("#ffffff"), width=0.3996)
add(1, 'segment', Line((-15, 1.55, 0), (-15.601, 2.15104, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-14.4, 1.55, 0), (-15.001, 2.15104, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-13.8, 1.55, 0), (-14.401, 2.15104, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-13.2, 1.55, 0), (-13.801, 2.15104, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'segment', Line((-12.6, 1.55, 0), (-13.201, 2.15104, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(1, 'label', Point(-12.6, 2.9, 0), text='B')
add(1, 'polyline', Polyline([(-28.5, 2, 0), (-14.1, 2, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3186)
add(1, 'polyline', Polyline([(-21.3, 4.4, 0), (-21.3, -5.68, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3186)
add(1, 'arrow', Line((-21.3, 4.4, 0), (-21.3, 2.8, 0)), color=Color.from_hex("#3f9c20"), width=0.147744, head=(0.509328, 0.196733))
add(1, 'label', Point(-20.45, 3.6, 0), color=Color.from_hex("#3f9c20"), text='F1')
add(1, 'label', Point(7, 12.8, 0), color=Color.from_hex("#3f9c20"), text='F1 = 120 kN')

# step 2 — The resultant, and the reactions that do not move
add(2, 'arrow', Line((-21.3, -0.476, 0), (-21.3, -3.376, 0)), color=Color.from_hex("#3f9c20"), width=0.147744, dash=1.1, head=(0.509328, 0.196733))
add(2, 'label', Point(-21.3, 0.524, 0), color=Color.from_hex("#3f9c20"), text='R = 120 kN')
add(2, 'label', Point(7, 14.1, 0), color=Color.from_hex("#3f9c20"), text='A_v = B_v = 60.00 kN, whatever the pole')

# step 3 — The load line
add(3, 'arrow', Line((-2, 10, 0), (-2, -8, 0)), color=Color.from_hex("#3f9c20"), width=0.106531, head=(0.344477, 0.147744))
add(3, 'label', Point(-3.4, 1, 0), color=Color.from_hex("#3f9c20"), text='120')
add(3, 'arrow', Line((-2, 10, 0), (-2, 10, 0)), color=Color.from_hex("#3f9c20"), width=0.106531, head=(0.344477, 0.147744))
add(3, 'arrow', Line((-2, 10, 0), (-2, 10, 0)), color=Color.from_hex("#3f9c20"), width=0.106531, head=(0.344477, 0.147744))
add(3, 'label', Point(1.2, -9.8, 0), color=Color.from_hex("#3f9c20"), text='load line 1 × 120 = 120 kN')

# step 4 — The pole is FREE — that is the exercise
add(4, 'point', Point(8.8, 1, 0), color=Color.from_hex("#ffffff"), width=0.33966)
add(4, 'label', Point(9.9, 1.9, 0), text='o')
add(4, 'segment', Line((-2, 10.6, 0), (8.8, 10.6, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(4, 'label', Point(3.4, 11.5, 0), color=Color.from_hex("#aaaaaa"), text='H = 72.00 kN')

# step 5 — The rays
add(5, 'segment', Line((8.8, 1, 0), (-2, 10, 0)), color=Color.from_hex("#ce4095"), width=0.057542)
add(5, 'segment', Line((8.8, 1, 0), (8.8, 1, 0)), color=Color.from_hex("#ce4095"), width=0.057542)
add(5, 'segment', Line((8.8, 1, 0), (8.8, 1, 0)), color=Color.from_hex("#ce4095"), width=0.057542)
add(5, 'segment', Line((8.8, 1, 0), (-2, -8, 0)), color=Color.from_hex("#ce4095"), width=0.057542)

# step 6 — The funicular form
add(6, 'segment', Line((-28.5, 2, 0), (-21.3, -4, 0)), color=Color.from_hex("#ce4095"), width=0.122861)
add(6, 'segment', Line((-28.5, 2, 0), (-28.5, 2, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(6, 'segment', Line((-28.5, 2, 0), (-28.5, 2, 0)), color=Color.from_hex("#ce4095"), width=0.122861)
add(6, 'segment', Line((-28.5, 2, 0), (-28.5, 2, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(6, 'segment', Line((-28.5, 2, 0), (-28.5, 2, 0)), color=Color.from_hex("#ce4095"), width=0.122861)
add(6, 'segment', Line((-28.5, 2, 0), (-28.5, 2, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(6, 'segment', Line((-21.3, -4, 0), (-14.1, 2, 0)), color=Color.from_hex("#ce4095"), width=0.122861)
add(6, 'segment', Line((-28.5, 2, 0), (-28.5, 2, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(6, 'point', Point(-21.3, -4, 0), color=Color.from_hex("#ffffff"), width=0.31968)
add(6, 'segment', Line((-12.3, 2, 0), (-12.3, -4, 0)), color=Color.from_hex("#aaaaaa"), width=0.040824)
add(6, 'label', Point(-9.2, -1, 0), color=Color.from_hex("#aaaaaa"), text='f = 2.5000 m')

# step 7 — The forces, and the one that never changes
add(7, 'label', Point(-25.7642, -2.0371, 0), color=Color.from_hex("#ce4095"), text='93.72')
add(7, 'label', Point(-16.8358, -2.0371, 0), color=Color.from_hex("#ce4095"), text='93.72')
add(7, 'arrow', Line((-28.8841, 2.32009, 0), (-30.6121, 3.76009, 0)), color=Color.from_hex("#3f9c20"), width=0.147744, head=(0.509328, 0.196733))
add(7, 'label', Point(-30.9962, 4.08018, 0), color=Color.from_hex("#3f9c20"), text='A = 93.72')
add(7, 'arrow', Line((-13.7159, 2.32009, 0), (-11.9879, 3.76009, 0)), color=Color.from_hex("#3f9c20"), width=0.147744, head=(0.509328, 0.196733))
add(7, 'label', Point(-11.6038, 4.08018, 0), color=Color.from_hex("#3f9c20"), text='B = 93.72')

# step 8 — a) → d): the polygon becomes the parabola
add(8, 'polyline', Polyline([(-28.5, 2, 0), (-28.2, 1.75521, 0), (-27.9, 1.52083, 0), (-27.6, 1.29688, 0), (-27.3, 1.08333, 0), (-27, 0.880208, 0), (-26.7, 0.6875, 0), (-26.4, 0.505208, 0), (-26.1, 0.333333, 0), (-25.8, 0.171875, 0), (-25.5, 0.020833, 0), (-25.2, -0.119792, 0), (-24.9, -0.25, 0), (-24.6, -0.369792, 0), (-24.3, -0.479167, 0), (-24, -0.578125, 0), (-23.7, -0.666667, 0), (-23.4, -0.744792, 0), (-23.1, -0.8125, 0), (-22.8, -0.869792, 0), (-22.5, -0.916667, 0), (-22.2, -0.953125, 0), (-21.9, -0.979167, 0), (-21.6, -0.994792, 0), (-21.3, -1, 0), (-21, -0.994792, 0), (-20.7, -0.979167, 0), (-20.4, -0.953125, 0), (-20.1, -0.916667, 0), (-19.8, -0.869792, 0), (-19.5, -0.8125, 0), (-19.2, -0.744792, 0), (-18.9, -0.666667, 0), (-18.6, -0.578125, 0), (-18.3, -0.479167, 0), (-18, -0.369792, 0), (-17.7, -0.25, 0), (-17.4, -0.119792, 0), (-17.1, 0.020833, 0), (-16.8, 0.171875, 0), (-16.5, 0.333333, 0), (-16.2, 0.505208, 0), (-15.9, 0.6875, 0), (-15.6, 0.880208, 0), (-15.3, 1.08333, 0), (-15, 1.29688, 0), (-14.7, 1.52083, 0), (-14.4, 1.75521, 0), (-14.1, 2, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3186)
add(8, 'label', Point(-21.3, -6, 0), color=Color.from_hex("#aaaaaa"), text='parabola of d): f = 1.2500 m')
add(8, 'polyline', Polyline([(-28.5, 2, 0), (-27.3923, 1.07692, 0), (-26.2846, 0.307692, 0), (-25.1769, -0.307692, 0), (-24.0692, -0.769231, 0), (-22.9615, -1.07692, 0), (-21.8538, -1.23077, 0), (-20.7462, -1.23077, 0), (-19.6385, -1.07692, 0), (-18.5308, -0.769231, 0), (-17.4231, -0.307692, 0), (-16.3154, 0.307692, 0), (-15.2077, 1.07692, 0), (-14.1, 2, 0)]), color=Color.from_hex("#b9b9bd"), dash=0.3186)
add(8, 'label', Point(-21.3, -7.4, 0), color=Color.from_hex("#aaaaaa"), text='n = 12 equal loads: f = 1.3462 m')


if __name__ == "__main__":
    print("EX X · Task 4 — a possible funicular, four ways —", len(ops), "operations")
