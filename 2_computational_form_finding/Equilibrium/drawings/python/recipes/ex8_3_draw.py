"""EX 8.3 + 8.4 — sizing the bar, and proving it

Auto-generated from ops/ex8_3.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-6, 1.6, 0), text='the tie, and the bar that has to carry it')
add(0, 'label', Point(13, 1.6, 0), text='the round section, drawn to size')

# step 1 — Where the force comes from
add(1, 'segment', Line((-17, -3, 0), (5, -3, 0)), color=Color.from_hex("#ce4095"), width=0.196577)
add(1, 'arrow', Line((-22.4, -3, 0), (-17.6, -3, 0)), color=Color.from_hex("#3f9c20"), width=0.131328, head=(0.452736, 0.174874))
add(1, 'arrow', Line((10.4, -3, 0), (5.6, -3, 0)), color=Color.from_hex("#3f9c20"), width=0.131328, head=(0.452736, 0.174874))
add(1, 'label', Point(-6, -1.1, 0), color=Color.from_hex("#ce4095"), text='N_d = 49.56 kN, tension')
add(1, 'label', Point(-6, -5, 0), color=Color.from_hex("#aaaaaa"), text='from task 2a) — element C–K, the upper inner face of the right half')

# step 2 — The strength of the steel
add(2, 'segment', Line((-17, -7.2, 0), (5, -7.2, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(2, 'label', Point(-6, -8.6, 0), color=Color.from_hex("#aaaaaa"), text='S235: f_td = 235 / 1.05 = 223.81 N/mm²')

# step 3 — Area, then diameter
add(3, 'circle', Circle(3.52622, frame=Frame((9, -4, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#aaaaaa"))
add(3, 'circle', Circle(3.52622, frame=Frame((9, -4, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#aaaaaa"), dash=0.2832)
add(3, 'label', Point(9, -9.12622, 0), color=Color.from_hex("#aaaaaa"), text='needed ⌀16.79 mm · A = 221.4 mm²')

# step 4 — The answer
add(4, 'circle', Circle(3.57, frame=Frame((9, -4, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#3f9c20"))
add(4, 'label', Point(9, 1.17, 0), color=Color.from_hex("#3f9c20"), text='chosen ⌀17 mm · A = 227.0 mm²')
add(4, 'segment', Line((5.43, -4, 0), (12.57, -4, 0)), color=Color.from_hex("#aaaaaa"), width=0.036288)
add(4, 'polygon', Polygon([(-17, -9.4, 0), (3, -9.4, 0), (3, -7.8, 0), (-17, -7.8, 0)]), color=Color.from_hex("#e4e4e7"))
add(4, 'polygon', Polygon([(-17, -9.4, 0), (2.51248, -9.4, 0), (2.51248, -7.8, 0), (-17, -7.8, 0)]), color=Color.from_hex("#3f9c20"))
add(4, 'segment', Line((-17, -9.4, 0), (3, -9.4, 0)), color=Color.from_hex("#111111"), width=0.05184)
add(4, 'segment', Line((3, -9.4, 0), (3, -7.8, 0)), color=Color.from_hex("#111111"), width=0.05184)
add(4, 'segment', Line((3, -7.8, 0), (-17, -7.8, 0)), color=Color.from_hex("#111111"), width=0.05184)
add(4, 'segment', Line((-17, -7.8, 0), (-17, -9.4, 0)), color=Color.from_hex("#111111"), width=0.05184)
add(4, 'label', Point(10.2, -8.6, 0), color=Color.from_hex("#3f9c20"), text='97.6 % of 50.80 kN')
add(4, 'label', Point(-7, -6.3, 0), color=Color.from_hex("#aaaaaa"), text='how much of the bar is used')

# step 5 — One bar, both frames
add(5, 'label', Point(13, -13.2, 0), color=Color.from_hex("#3f9c20"), text='D = 16.79 → ⌀17 mm')
add(5, 'label', Point(13, -15, 0), color=Color.from_hex("#aaaaaa"), text='one size down, ⌀16 mm, carries only 45.00 kN')


if __name__ == "__main__":
    print("EX 8.3 + 8.4 — sizing the bar, and proving it —", len(ops), "operations")
