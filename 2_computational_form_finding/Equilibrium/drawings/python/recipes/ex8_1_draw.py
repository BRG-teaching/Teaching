"""EX 8.1 — four frames, one equilibrium

Auto-generated from ops/ex8_1.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-13.1, -11, 0), text='d) a portal with 1 m members — Lageplan 1:100')
add(0, 'label', Point(12.5, -11, 0), text='Kräfteplan — force diagram')
add(0, 'label', Point(12.5, -12.4, 0), text='to scale · 1 unit ≙ 2.4 kN  (sheet: 1 cm ≙ 10 kN)')

# step 1 — What is given
add(1, 'polygon', Polygon([(-21.425, -8.5, 0), (-21.425, -4.33935, 0), (-21.425, -0.1787, 0), (-17.7259, -0.1787, 0), (-14.0268, -0.1787, 0), (-13.1832, -1.1, 0), (-14.0268, -2.0287, 0), (-16.8009, -2.0287, 0), (-19.575, -2.0287, 0), (-19.575, -5.26435, 0), (-19.575, -8.5, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.1)
add(1, 'segment', Line((-21.425, -8.5, 0), (-21.425, -0.1787, 0)), color=Color.from_hex("#111111"), width=0.086861)
add(1, 'segment', Line((-21.425, -0.1787, 0), (-14.0268, -0.1787, 0)), color=Color.from_hex("#111111"), width=0.086861)
add(1, 'segment', Line((-14.0268, -0.1787, 0), (-13.1832, -1.1, 0)), color=Color.from_hex("#111111"), width=0.086861)
add(1, 'segment', Line((-13.1832, -1.1, 0), (-14.0268, -2.0287, 0)), color=Color.from_hex("#111111"), width=0.086861)
add(1, 'segment', Line((-14.0268, -2.0287, 0), (-19.575, -2.0287, 0)), color=Color.from_hex("#111111"), width=0.086861)
add(1, 'segment', Line((-19.575, -2.0287, 0), (-19.575, -8.5, 0)), color=Color.from_hex("#111111"), width=0.086861)
add(1, 'segment', Line((-19.575, -8.5, 0), (-21.425, -8.5, 0)), color=Color.from_hex("#111111"), width=0.086861)
add(1, 'segment', Line((-20.5, -8.5, 0), (-20.5, -1.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(1, 'segment', Line((-20.5, -1.1, 0), (-13.1832, -1.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(1, 'polygon', Polygon([(-4.775, -8.5, 0), (-4.775, -4.33935, 0), (-4.775, -0.1787, 0), (-8.47407, -0.1787, 0), (-12.1731, -0.1787, 0), (-13.0168, -1.1, 0), (-12.1731, -2.0287, 0), (-9.39907, -2.0287, 0), (-6.625, -2.0287, 0), (-6.625, -5.26435, 0), (-6.625, -8.5, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.1)
add(1, 'segment', Line((-4.775, -8.5, 0), (-4.775, -0.1787, 0)), color=Color.from_hex("#111111"), width=0.086861)
add(1, 'segment', Line((-4.775, -0.1787, 0), (-12.1731, -0.1787, 0)), color=Color.from_hex("#111111"), width=0.086861)
add(1, 'segment', Line((-12.1731, -0.1787, 0), (-13.0168, -1.1, 0)), color=Color.from_hex("#111111"), width=0.086861)
add(1, 'segment', Line((-13.0168, -1.1, 0), (-12.1731, -2.0287, 0)), color=Color.from_hex("#111111"), width=0.086861)
add(1, 'segment', Line((-12.1731, -2.0287, 0), (-6.625, -2.0287, 0)), color=Color.from_hex("#111111"), width=0.086861)
add(1, 'segment', Line((-6.625, -2.0287, 0), (-6.625, -8.5, 0)), color=Color.from_hex("#111111"), width=0.086861)
add(1, 'segment', Line((-6.625, -8.5, 0), (-4.775, -8.5, 0)), color=Color.from_hex("#111111"), width=0.086861)
add(1, 'segment', Line((-5.7, -8.5, 0), (-5.7, -1.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(1, 'segment', Line((-5.7, -1.1, 0), (-13.0168, -1.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(1, 'point', Point(-20.5, -8.5, 0), color=Color.from_hex("#ffffff"), width=0.3848)
add(1, 'label', Point(-22.3, -9.5, 0), text='A')
add(1, 'segment', Line((-21.64, -9, 0), (-22.3471, -8.29289, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(1, 'segment', Line((-20.88, -9, 0), (-21.5871, -8.29289, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(1, 'segment', Line((-20.12, -9, 0), (-20.8271, -8.29289, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(1, 'segment', Line((-19.36, -9, 0), (-20.0671, -8.29289, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(1, 'segment', Line((-18.6, -9, 0), (-19.3071, -8.29289, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(1, 'point', Point(-5.7, -8.5, 0), color=Color.from_hex("#ffffff"), width=0.3848)
add(1, 'label', Point(-3.9, -9.5, 0), text='B')
add(1, 'segment', Line((-6.84, -9, 0), (-7.54711, -8.29289, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(1, 'segment', Line((-6.08, -9, 0), (-6.78711, -8.29289, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(1, 'segment', Line((-5.32, -9, 0), (-6.02711, -8.29289, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(1, 'segment', Line((-4.56, -9, 0), (-5.26711, -8.29289, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(1, 'segment', Line((-3.8, -9, 0), (-4.50711, -8.29289, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(1, 'point', Point(-13.1, -1.1, 0), color=Color.from_hex("#ffffff"), width=0.3848)
add(1, 'label', Point(-13.1, 0.9, 0), text='crown hinge')
add(1, 'polyline', Polyline([(-13.1, -11.5, 0), (-13.1, 5.3, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3068)
add(1, 'arrow', Line((-13.1, 2.7, 0), (-13.1, -0.1, 0)), color=Color.from_hex("#3f9c20"), width=0.142272, head=(0.490464, 0.189446))
add(1, 'label', Point(-9.7, 1.58, 0), color=Color.from_hex("#3f9c20"), text='G_d = 30 kN')
add(1, 'polyline', Polyline([(-13.1, 3.3, 0), (-13.1, -11.1, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3068)

# step 2 — Three hinges
add(2, 'arrow', Line((15.5, 6, 0), (15.5, -6.5, 0)), color=Color.from_hex("#3f9c20"), width=0.142272, head=(0.490464, 0.189446))
add(2, 'label', Point(17.9, -0.25, 0), color=Color.from_hex("#3f9c20"), text='G_d = 30')

# step 3 — Global equilibrium
add(3, 'point', Point(9.25, -0.25, 0), color=Color.from_hex("#ffffff"), width=0.30784)
add(3, 'label', Point(7.85, 0.55, 0), text='o')
add(3, 'segment', Line((15.5, 7.7, 0), (9.25, 7.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.039312)
add(3, 'label', Point(12.375, 8.8, 0), color=Color.from_hex("#aaaaaa"), text='H = 15.0 kN')
add(3, 'segment', Line((9.25, -0.25, 0), (15.5, 6, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(3, 'segment', Line((15.5, -6.5, 0), (9.25, -0.25, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)

# step 4 — The force diagram
add(4, 'polygon', Polygon([(-20.307, -8.69304, 0), (-20.693, -8.30696, 0), (-13.293, -0.90696, 0), (-12.907, -1.29304, 0)]), color=Color.from_hex("#bdbfe8"))
add(4, 'polygon', Polygon([(-13.293, -1.29304, 0), (-12.907, -0.90696, 0), (-5.50696, -8.30696, 0), (-5.89304, -8.69304, 0)]), color=Color.from_hex("#bdbfe8"))
add(4, 'segment', Line((-20.5, -8.5, 0), (-13.1, -1.1, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(4, 'segment', Line((-13.1, -1.1, 0), (-5.7, -8.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.11831)
add(4, 'label', Point(-20.4, -6.4, 0), color=Color.from_hex("#1a1eb2"), text='21.21 kN')

# step 5 — The thrust line
add(5, 'arrow', Line((-22.4799, -10.4799, 0), (-21.2071, -9.20711, 0)), color=Color.from_hex("#3f9c20"), width=0.102586, head=(0.331718, 0.142272))
add(5, 'arrow', Line((9.92288, -0.25, 0), (15.8364, 5.66356, 0)), color=Color.from_hex("#3f9c20"), width=0.102586, head=(0.331718, 0.142272))
add(5, 'label', Point(-25.4799, -10.0799, 0), color=Color.from_hex("#3f9c20"), text='A = 21.2')
add(5, 'arrow', Line((-3.7201, -10.4799, 0), (-4.99289, -9.20711, 0)), color=Color.from_hex("#3f9c20"), width=0.102586, head=(0.331718, 0.142272))
add(5, 'arrow', Line((15.8364, -6.16356, 0), (9.92288, -0.25, 0)), color=Color.from_hex("#3f9c20"), width=0.102586, head=(0.331718, 0.142272))
add(5, 'label', Point(-0.720101, -10.0799, 0), color=Color.from_hex("#3f9c20"), text='B = 21.2')

# step 6 — Where the shape comes in
add(6, 'segment', Line((-16.8, -4.8, 0), (-16.8, -2.0287, 0)), color=Color.from_hex("#ce4095"), width=0.11831)
add(6, 'label', Point(-13, -4.51435, 0), color=Color.from_hex("#ce4095"), text='1.50 m outside')
add(6, 'segment', Line((-20.5, -1.1, 0), (-16.8, -4.8, 0)), color=Color.from_hex("#ce4095"), width=0.039312)
add(6, 'label', Point(-22.05, -2.05, 0), color=Color.from_hex("#ce4095"), text='e = 2.83 m')


if __name__ == "__main__":
    print("EX 8.1 — four frames, one equilibrium —", len(ops), "operations")
