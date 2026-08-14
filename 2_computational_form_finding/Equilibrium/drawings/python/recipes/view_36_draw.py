"""Drawing 36 — Single Panel Truss

Auto-generated from ops/view_36.json — the drawing as literal COMPAS
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


# step 0 — How to draw this scheme
add(0, 'label', Point(2.2, 6.15, 0), text='Form Diagram')
add(0, 'label', Point(11, 6.15, 0), text='Force Diagram')
add(0, 'label', Point(11, 5.78, 0), text='1 unit :: 1.00 kN')

# step 1 — The panel
add(1, 'point', Point(2, 2, 0), color=Color.from_hex("#ffffff"), width=0.1)
add(1, 'point', Point(6, 2, 0), color=Color.from_hex("#ffffff"), width=0.1)
add(1, 'point', Point(3.61166, 3.99607, 0), color=Color.from_hex("#ffffff"), width=0.1)
add(1, 'label', Point(1.58, 2.22, 0), text='A')
add(1, 'label', Point(6.42, 2.22, 0), text='B')
add(1, 'label', Point(3.97166, 4.21607, 0), text='C')

# step 2 — The load — in both diagrams
add(2, 'polyline', Polyline([(3.00137, 5.82777, 0), (5.20468, -0.785155, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.15, until=8)
add(2, 'arrow', Line((3.29556, 4.9448, 0), (3.61166, 3.99607, 0)), color=Color.from_hex("#3f9c20"), width=0.054, head=(0.1872, 0.072))
add(2, 'arrow', Line((10, 5, 0), (11.4224, 0.730732, 0)), color=Color.from_hex("#3f9c20"), width=0.054, head=(0.1872, 0.072))
add(2, 'label', Point(3.7572, 4.57159, 0), color=Color.from_hex("#3f9c20"), text='F')
add(2, 'label', Point(10.4076, 2.76421, 0), color=Color.from_hex("#3f9c20"), text='F')
add(2, 'point', Point(3.29556, 4.9448, 0), color=Color.from_hex("#ffffff"), width=0.1)
add(2, 'point', Point(10, 5, 0), color=Color.from_hex("#ffffff"), width=0.1)
add(2, 'point', Point(11.4224, 0.730732, 0), color=Color.from_hex("#ffffff"), width=0.075)

# step 3 — The antiresultant F′
add(3, 'arrow', Line((3.92776, 3.04735, 0), (3.61166, 3.99607, 0)), color=Color.from_hex("#3f9c20"), width=0.054, head=(0.1872, 0.072), until=7)
add(3, 'arrow', Line((11.7071, 0.825561, 0), (10.2846, 5.09483, 0)), color=Color.from_hex("#3f9c20"), width=0.054, head=(0.1872, 0.072), until=7)
add(3, 'label', Point(3.48509, 3.42688, 0), color=Color.from_hex("#3f9c20"), text='F′', until=7)
add(3, 'label', Point(11.3184, 3.06767, 0), color=Color.from_hex("#3f9c20"), text='F′', until=7)
add(3, 'polyline', Polyline([(10, 5, 0), (10.2846, 5.09483, 0)]), color=Color.from_hex("#111111"), dash=0.12, until=10)
add(3, 'polyline', Polyline([(11.4224, 0.730732, 0), (11.7071, 0.825561, 0)]), color=Color.from_hex("#111111"), dash=0.12, until=10)

# step 4 — Trial pole o′
add(4, 'polyline', Polyline([(0.724654, 5.82777, 0), (2.92796, -0.785155, 0)]), color=Color.from_hex("#111111"), dash=0.15, until=10)
add(4, 'polyline', Polyline([(4.72465, 5.82777, 0), (6.92796, -0.785155, 0)]), color=Color.from_hex("#111111"), dash=0.15, until=10)
add(4, 'segment', Line((10, 5, 0), (14.1821, 3.97422, 0)), color=Color.from_hex("#aaaaaa"), width=0.0216, until=8)
add(4, 'segment', Line((14.1821, 3.97422, 0), (11.4224, 0.730732, 0)), color=Color.from_hex("#aaaaaa"), width=0.0216, until=8)
add(4, 'point', Point(14.1821, 3.97422, 0), color=Color.from_hex("#ffffff"), width=0.1, until=8)
add(4, 'label', Point(14.5021, 4.25422, 0), text='o′', until=8)

# step 5 — Trial funicular
add(5, 'segment', Line((4.98194, -0.116656, 0), (2.50261, 0.491473, 0)), color=Color.from_hex("#aaaaaa"), width=0.0324, until=8)
add(5, 'segment', Line((4.98194, -0.116656, 0), (6.2203, 1.33881, 0)), color=Color.from_hex("#aaaaaa"), width=0.0324, until=8)
add(5, 'point', Point(4.98194, -0.116656, 0), color=Color.from_hex("#ffffff"), width=0.1, until=8)
add(5, 'point', Point(2.50261, 0.491473, 0), color=Color.from_hex("#ffffff"), width=0.075, until=8)
add(5, 'point', Point(6.2203, 1.33881, 0), color=Color.from_hex("#ffffff"), width=0.075, until=8)
add(5, 'label', Point(5.32195, -0.336656, 0), text='Q', until=8)
add(5, 'label', Point(2.16261, 0.651473, 0), text='S', until=8)
add(5, 'label', Point(6.5803, 1.4988, 0), text='T', until=8)

# step 6 — Closing → division point i
add(6, 'polyline', Polyline([(2.50261, 0.491473, 0), (6.2203, 1.33881, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.15, until=8)
add(6, 'polyline', Polyline([(14.1821, 3.97422, 0), (10.6128, 3.16071, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.15, until=8)
add(6, 'polyline', Polyline([(10.6128, 3.16071, 0), (10.8974, 3.25554, 0)]), color=Color.from_hex("#111111"), dash=0.12, until=10)
add(6, 'point', Point(10.6128, 3.16071, 0), color=Color.from_hex("#ffffff"), width=0.075, until=12)
add(6, 'label', Point(10.7128, 2.80071, 0), text='i', until=12)

# step 7 — Reactions parallel to F
add(7, 'arrow', Line((10.8974, 3.25554, 0), (10.2846, 5.09483, 0)), color=Color.from_hex("#3f9c20"), width=0.054, head=(0.1872, 0.072), until=10)
add(7, 'arrow', Line((11.7071, 0.825561, 0), (10.8974, 3.25554, 0)), color=Color.from_hex("#3f9c20"), width=0.054, head=(0.1872, 0.072), until=10)
add(7, 'arrow', Line((2.3161, 1.05127, 0), (2, 2, 0)), color=Color.from_hex("#3f9c20"), width=0.054, head=(0.1872, 0.072), until=10)
add(7, 'arrow', Line((6.3161, 1.05127, 0), (6, 2, 0)), color=Color.from_hex("#3f9c20"), width=0.054, head=(0.1872, 0.072), until=10)
add(7, 'label', Point(10.9136, 4.28266, 0), color=Color.from_hex("#3f9c20"), text='A', until=10)
add(7, 'label', Point(11.6248, 2.14802, 0), color=Color.from_hex("#3f9c20"), text='B', until=10)
add(7, 'label', Point(2.4806, 1.50662, 0), color=Color.from_hex("#3f9c20"), text='A', until=10)
add(7, 'label', Point(6.4806, 1.50662, 0), color=Color.from_hex("#3f9c20"), text='B', until=10)

# step 8 — Node C closes — members 2 and 3
add(8, 'segment', Line((2, 2, 0), (3.61166, 3.99607, 0)), color=Color.from_hex("#1a1eb2"), width=0.0432)
add(8, 'segment', Line((3.61166, 3.99607, 0), (6, 2, 0)), color=Color.from_hex("#1a1eb2"), width=0.0432)
add(8, 'segment', Line((10, 5, 0), (8.51493, 3.16071, 0)), color=Color.from_hex("#1a1eb2"), width=0.0432)
add(8, 'segment', Line((8.51493, 3.16071, 0), (11.4224, 0.730732, 0)), color=Color.from_hex("#1a1eb2"), width=0.0432)
add(8, 'label', Point(2.51948, 3.08751, 0), color=Color.from_hex("#1a1eb2"), text='2')
add(8, 'label', Point(9.10547, 4.31551, 0), color=Color.from_hex("#1a1eb2"), text='2')
add(8, 'label', Point(5.08848, 3.09857, 0), color=Color.from_hex("#1a1eb2"), text='3')
add(8, 'label', Point(9.96581, 1.66573, 0), color=Color.from_hex("#1a1eb2"), text='3')
add(8, 'point', Point(8.51493, 3.16071, 0), color=Color.from_hex("#ffffff"), width=0.075)

# step 9 — Member 1 — the bottom chord
add(9, 'segment', Line((2, 2, 0), (6, 2, 0)), color=Color.from_hex("#ce4095"), width=0.0432)
add(9, 'segment', Line((10.6128, 3.16071, 0), (8.51493, 3.16071, 0)), color=Color.from_hex("#ce4095"), width=0.0432, until=10)
add(9, 'label', Point(4.05729, 1.70552, 0), color=Color.from_hex("#ce4095"), text='1')
add(9, 'label', Point(9.98351, 2.8811, 0), color=Color.from_hex("#ce4095"), text='1')

# step 10 — The roller at B
add(10, 'segment', Line((11.4224, 3.16071, 0), (8.51493, 3.16071, 0)), color=Color.from_hex("#ce4095"), width=0.0432)
add(10, 'circle', Circle(0.129904, frame=Frame((6, 1.8701, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#111111"))
add(10, 'polygon', Polygon([(6.1299, 1.8701, 0), (6.12002, 1.91981, 0), (6.09186, 1.96195, 0), (6.04971, 1.99011, 0), (6, 2, 0), (5.95029, 1.99011, 0), (5.90814, 1.96195, 0), (5.87998, 1.91981, 0), (5.8701, 1.8701, 0), (5.87998, 1.82038, 0), (5.90814, 1.77824, 0), (5.95029, 1.75008, 0), (6, 1.74019, 0), (6.04971, 1.75008, 0), (6.09186, 1.77824, 0), (6.12002, 1.82038, 0)]), color=Color.from_hex("#111111"), opacity=0.12)
add(10, 'segment', Line((5.7, 1.74019, 0), (6.3, 1.74019, 0)), color=Color.from_hex("#111111"), width=0.02304)
add(10, 'segment', Line((5.7, 1.74019, 0), (5.63938, 1.63519, 0)), color=Color.from_hex("#111111"), width=0.01152)
add(10, 'segment', Line((5.78571, 1.74019, 0), (5.72509, 1.63519, 0)), color=Color.from_hex("#111111"), width=0.01152)
add(10, 'segment', Line((5.87143, 1.74019, 0), (5.81081, 1.63519, 0)), color=Color.from_hex("#111111"), width=0.01152)
add(10, 'segment', Line((5.95714, 1.74019, 0), (5.89652, 1.63519, 0)), color=Color.from_hex("#111111"), width=0.01152)
add(10, 'segment', Line((6.04286, 1.74019, 0), (5.98224, 1.63519, 0)), color=Color.from_hex("#111111"), width=0.01152)
add(10, 'segment', Line((6.12857, 1.74019, 0), (6.06795, 1.63519, 0)), color=Color.from_hex("#111111"), width=0.01152)
add(10, 'segment', Line((6.21429, 1.74019, 0), (6.15366, 1.63519, 0)), color=Color.from_hex("#111111"), width=0.01152)
add(10, 'segment', Line((6.3, 1.74019, 0), (6.23938, 1.63519, 0)), color=Color.from_hex("#111111"), width=0.01152)
add(10, 'polyline', Polyline([(10.6128, 3.16071, 0), (11.4224, 3.16071, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.12, until=12)
add(10, 'arrow', Line((11.4224, 0.730732, 0), (11.4224, 3.16071, 0)), color=Color.from_hex("#3f9c20"), width=0.054, head=(0.1872, 0.072))
add(10, 'arrow', Line((6, 0.53, 0), (6, 1.53, 0)), color=Color.from_hex("#3f9c20"), width=0.054, head=(0.1872, 0.072))
add(10, 'label', Point(11.8024, 1.94572, 0), color=Color.from_hex("#3f9c20"), text='B_V')
add(10, 'label', Point(6.42, 0.95, 0), color=Color.from_hex("#3f9c20"), text='B_V')
add(10, 'point', Point(11.4224, 3.16071, 0), color=Color.from_hex("#ffffff"), width=0.075)

# step 11 — Pin at A: A_V and A_H
add(11, 'polygon', Polygon([(2, 2, 0), (1.85, 1.74019, 0), (2.15, 1.74019, 0)]), color=Color.from_hex("#111111"), opacity=0.12)
add(11, 'segment', Line((2, 2, 0), (1.85, 1.74019, 0)), color=Color.from_hex("#111111"), width=0.01584)
add(11, 'segment', Line((1.85, 1.74019, 0), (2.15, 1.74019, 0)), color=Color.from_hex("#111111"), width=0.01584)
add(11, 'segment', Line((2.15, 1.74019, 0), (2, 2, 0)), color=Color.from_hex("#111111"), width=0.01584)
add(11, 'segment', Line((1.7, 1.74019, 0), (2.3, 1.74019, 0)), color=Color.from_hex("#111111"), width=0.02304)
add(11, 'segment', Line((1.7, 1.74019, 0), (1.63938, 1.63519, 0)), color=Color.from_hex("#111111"), width=0.01152)
add(11, 'segment', Line((1.78571, 1.74019, 0), (1.72509, 1.63519, 0)), color=Color.from_hex("#111111"), width=0.01152)
add(11, 'segment', Line((1.87143, 1.74019, 0), (1.81081, 1.63519, 0)), color=Color.from_hex("#111111"), width=0.01152)
add(11, 'segment', Line((1.95714, 1.74019, 0), (1.89652, 1.63519, 0)), color=Color.from_hex("#111111"), width=0.01152)
add(11, 'segment', Line((2.04286, 1.74019, 0), (1.98223, 1.63519, 0)), color=Color.from_hex("#111111"), width=0.01152)
add(11, 'segment', Line((2.12857, 1.74019, 0), (2.06795, 1.63519, 0)), color=Color.from_hex("#111111"), width=0.01152)
add(11, 'segment', Line((2.21429, 1.74019, 0), (2.15366, 1.63519, 0)), color=Color.from_hex("#111111"), width=0.01152)
add(11, 'segment', Line((2.3, 1.74019, 0), (2.23938, 1.63519, 0)), color=Color.from_hex("#111111"), width=0.01152)
add(11, 'arrow', Line((11.4224, 3.16071, 0), (11.4224, 5, 0)), color=Color.from_hex("#3f9c20"), width=0.054, head=(0.1872, 0.072))
add(11, 'arrow', Line((11.4224, 5, 0), (10, 5, 0)), color=Color.from_hex("#3f9c20"), width=0.054, head=(0.1872, 0.072))
add(11, 'arrow', Line((2, 0.53, 0), (2, 1.53, 0)), color=Color.from_hex("#3f9c20"), width=0.054, head=(0.1872, 0.072))
add(11, 'arrow', Line((0.79, 2, 0), (1.79, 2, 0)), color=Color.from_hex("#3f9c20"), width=0.054, head=(0.1872, 0.072))
add(11, 'label', Point(11.8024, 4.08035, 0), color=Color.from_hex("#3f9c20"), text='A_V')
add(11, 'label', Point(10.7112, 5.3, 0), color=Color.from_hex("#3f9c20"), text='A_H')
add(11, 'label', Point(1.56, 0.95, 0), color=Color.from_hex("#3f9c20"), text='A_V')
add(11, 'label', Point(0.95, 2.26, 0), color=Color.from_hex("#3f9c20"), text='A_H')
add(11, 'point', Point(11.4224, 5, 0), color=Color.from_hex("#ffffff"), width=0.075)

# step 12 — Compression and tension
add(12, 'label', Point(14.35, 2.2, 0), color=Color.from_hex("#ce4095"), text='N₁ = 2.9 kN')
add(12, 'label', Point(14.35, 0.7, 0), color=Color.from_hex("#3f9c20"), text='A_H = 1.4 kN')
add(12, 'polygon', Polygon([(2, 1.92731, 0), (2, 2.07269, 0), (6, 2.07269, 0), (6, 1.92731, 0)]), color=Color.from_hex("#ce4095"))
add(12, 'label', Point(14.35, 1.78, 0), color=Color.from_hex("#1a1eb2"), text='N₂ = 2.4 kN')
add(12, 'label', Point(14.35, 0.28, 0), color=Color.from_hex("#3f9c20"), text='A_V = 1.8 kN')
add(12, 'polygon', Polygon([(2.04598, 1.96287, 0), (1.95402, 2.03713, 0), (3.56568, 4.0332, 0), (3.65764, 3.95894, 0)]), color=Color.from_hex("#1a1eb2"))
add(12, 'label', Point(14.35, 1.36, 0), color=Color.from_hex("#1a1eb2"), text='N₃ = 3.8 kN')
add(12, 'label', Point(14.35, -0.14, 0), color=Color.from_hex("#3f9c20"), text='B_V = 2.4 kN')
add(12, 'polygon', Polygon([(3.55091, 3.92338, 0), (3.67241, 4.06876, 0), (6.06075, 2.07269, 0), (5.93925, 1.92731, 0)]), color=Color.from_hex("#1a1eb2"))


if __name__ == "__main__":
    print("Drawing 36 — Single Panel Truss —", len(ops), "operations")
