"""EX 3.1a — a cable under a point load

Auto-generated from ops/ex3_1a.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-16, -8, 0), text='Lageplan — form diagram')
add(0, 'label', Point(-16, -9.3, 0), text='arrows are symbols, not to scale')
add(0, 'label', Point(1, 13.2, 0), text='Kräfteplan — force diagram')
add(0, 'label', Point(9, 11.9, 0), text='to scale · 1 unit ≙ 10 kN  (sheet: 1 cm ≙ 20 kN)')

# step 1 — What is given
add(1, 'point', Point(-16, 0.5, 0), color=Color.from_hex("#ffffff"), width=0.3108)
add(1, 'label', Point(-17.4, 1.5, 0), text='A')
add(1, 'point', Point(-6.4, 0.5, 0), color=Color.from_hex("#ffffff"), width=0.3108)
add(1, 'label', Point(-5, 1.5, 0), text='B')
add(1, 'polyline', Polyline([(-18.2, 0.5, 0), (-4.2, 0.5, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2478)
add(1, 'polyline', Polyline([(-11.2, 3.5, 0), (-11.2, -6.1, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2478)
add(1, 'arrow', Line((-11.2, 0.9, 0), (-11.2, -3.3, 0)), color=Color.from_hex("#3f9c20"), width=0.114912, head=(0.396144, 0.153014))
add(1, 'label', Point(-13.2, -0.99, 0), color=Color.from_hex("#3f9c20"), text='F_d')

# step 2 — The load line
add(2, 'arrow', Line((6.7686, 8, 0), (6.7686, -4, 0)), color=Color.from_hex("#3f9c20"), width=0.114912, head=(0.396144, 0.153014))
add(2, 'label', Point(4, 2, 0), color=Color.from_hex("#3f9c20"), text='F_d')

# step 3 — Now design: choose the sag
add(3, 'polygon', Polygon([(-16.1412, 0.330607, 0), (-15.8588, 0.669393, 0), (-11.0588, -3.33061, 0), (-11.3412, -3.66939, 0)]), color=Color.from_hex("#f0bcdb"))
add(3, 'segment', Line((-16, 0.5, 0), (-11.2, -3.5, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((13.2, 2, 0), (6, 8, 0)), color=Color.from_hex("#ce4095"), width=0.044755)
add(3, 'label', Point(-12.3574, -0.008882, 0), color=Color.from_hex("#ce4095"), text='1')
add(3, 'label', Point(9.6, 6.1, 0), color=Color.from_hex("#ce4095"), text='1')
add(3, 'polygon', Polygon([(-11.0588, -3.66939, 0), (-11.3412, -3.33061, 0), (-6.54116, 0.669393, 0), (-6.25884, 0.330607, 0)]), color=Color.from_hex("#f0bcdb"))
add(3, 'segment', Line((-11.2, -3.5, 0), (-6.4, 0.5, 0)), color=Color.from_hex("#ce4095"), width=0.095558)
add(3, 'segment', Line((13.2, 2, 0), (6, -4, 0)), color=Color.from_hex("#ce4095"), width=0.044755)
add(3, 'label', Point(-7.5574, -2.99112, 0), color=Color.from_hex("#ce4095"), text='2')
add(3, 'label', Point(9.6, -2.1, 0), color=Color.from_hex("#ce4095"), text='2')
add(3, 'point', Point(13.2, 2, 0), color=Color.from_hex("#ffffff"), width=0.24864)
add(3, 'label', Point(14.7, 2.7, 0), text='o')
add(3, 'point', Point(-11.2, -3.5, 0), color=Color.from_hex("#ffffff"), width=0.21756)
add(3, 'label', Point(-12.7, -4.7, 0), text='I')
add(3, 'segment', Line((-10.2, 0.5, 0), (-10.2, -3.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(3, 'label', Point(-8, -1.5, 0), color=Color.from_hex("#aaaaaa"), text='f = 2.50 m')

# step 4 — The horizontal thrust
add(4, 'segment', Line((6, 9.7, 0), (13.2, 9.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(4, 'label', Point(9.6, 10.8, 0), color=Color.from_hex("#aaaaaa"), text='H = 72.0 kN')

# step 5 — Global equilibrium
add(5, 'arrow', Line((-16, 0.5, 0), (-19.2265, 3.18877, 0)), color=Color.from_hex("#3f9c20"), width=0.082858, head=(0.267926, 0.114912))
add(5, 'arrow', Line((13.9686, 2, 0), (6.7686, 8, 0)), color=Color.from_hex("#3f9c20"), width=0.082858, head=(0.267926, 0.114912))
add(5, 'label', Point(-20.4265, 4.08877, 0), color=Color.from_hex("#3f9c20"), text='A')
add(5, 'arrow', Line((-6.4, 0.5, 0), (-3.17347, 3.18877, 0)), color=Color.from_hex("#3f9c20"), width=0.082858, head=(0.267926, 0.114912))
add(5, 'arrow', Line((6.7686, -4, 0), (13.9686, 2, 0)), color=Color.from_hex("#3f9c20"), width=0.082858, head=(0.267926, 0.114912))
add(5, 'label', Point(-1.97347, 4.08877, 0), color=Color.from_hex("#3f9c20"), text='B')

# step 6 — Check the low point
add(6, 'circle', Circle(2.7, frame=Frame((4, -9.2, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#aaaaaa"), dash=0.2478)
add(6, 'point', Point(4, -9.2, 0), color=Color.from_hex("#ffffff"), width=0.21756)
add(6, 'label', Point(-1.1, -9.2, 0), color=Color.from_hex("#aaaaaa"), text='node I')
add(6, 'label', Point(1.08076, -6.7673, 0), color=Color.from_hex("#ce4095"), text='1')
add(6, 'label', Point(6.91924, -6.7673, 0), color=Color.from_hex("#ce4095"), text='2')
add(6, 'label', Point(4, -13, 0), color=Color.from_hex("#3f9c20"), text='F_d')
add(6, 'circle', Circle(1.541, frame=Frame((-11.2, -3.5, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#aaaaaa"), dash=0.2478)

# step 7 — What the shape costs
add(7, 'label', Point(-15.4188, -3.68252, 0), color=Color.from_hex("#ce4095"), text='N = 93.7 kN')


if __name__ == "__main__":
    print("EX 3.1a — a cable under a point load —", len(ops), "operations")
