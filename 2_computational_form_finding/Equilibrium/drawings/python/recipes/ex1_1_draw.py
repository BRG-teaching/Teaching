"""EX 1.1 — Resultant of two non-parallel forces

Auto-generated from ops/ex1_1.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-13.5, -7.2, 0), text='Form Diagram')
add(0, 'label', Point(19, -7.2, 0), text='Force Diagram')
add(0, 'label', Point(19, -8.3, 0), text='1 unit :: 5 kN')
add(0, 'label', Point(-13.5, -8.3, 0), text='the lines of action')

# step 1 — The two given forces
add(1, 'polyline', Polyline([(-12.8312, 4.19637, 0), (4.27708, -1.39879, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.28)
add(1, 'polyline', Polyline([(0, 9.5, 0), (0, -5.5, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.28)
add(1, 'arrow', Line((-4.9424, 1.61638, 0), (-1.2356, 0.404095, 0)), color=Color.from_hex("#3f9c20"), width=0.1296, head=(0.4464, 0.1728))
add(1, 'arrow', Line((0, 5.2, 0), (0, 1.3, 0)), color=Color.from_hex("#3f9c20"), width=0.1296, head=(0.4464, 0.1728))
add(1, 'label', Point(-2.09819, 1.94874, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(1, 'label', Point(1.2, 2.6, 0), color=Color.from_hex("#3f9c20"), text='F₂')

# step 2 — Lay off F₁
add(2, 'arrow', Line((19.5, 7, 0), (23.3018, 5.75663, 0)), color=Color.from_hex("#3f9c20"), width=0.1296, head=(0.4464, 0.1728))
add(2, 'label', Point(21.7895, 7.56639, 0), color=Color.from_hex("#3f9c20"), text='F₁')

# step 3 — F₂ tip to tail
add(3, 'arrow', Line((23.3018, 5.75663, 0), (23.3018, -0.243369, 0)), color=Color.from_hex("#3f9c20"), width=0.1296, head=(0.4464, 0.1728))
add(3, 'label', Point(22.0018, 2.75663, 0), color=Color.from_hex("#3f9c20"), text='F₂')

# step 4 — Where do the lines cross?
add(4, 'polyline', Polyline([(0, 0, 0), (7.60369, -2.48674, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.28)
add(4, 'polyline', Polyline([(0, 0, 0), (0, -6.5, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.28)
add(4, 'point', Point(0, 0, 0), color=Color.from_hex("#ffffff"), width=0.42)
add(4, 'label', Point(1.1, 1.1, 0), text='P')

# step 5 — The resultant — in both diagrams
add(5, 'arrow', Line((-1.33065, 2.53518, 0), (2.4712, -4.70819, 0)), color=Color.from_hex("#3f9c20"), width=0.144, dash=1, head=(0.4896, 0.1872))
add(5, 'label', Point(3.7712, -5.30819, 0), color=Color.from_hex("#3f9c20"), text='R')
add(5, 'arrow', Line((19.5, 7, 0), (23.3018, -0.243369, 0)), color=Color.from_hex("#3f9c20"), width=0.144, dash=1, head=(0.4896, 0.1872))
add(5, 'label', Point(22.9009, 3.67832, 0), color=Color.from_hex("#3f9c20"), text='R')

# step 6 — The answer
add(6, 'label', Point(2, -7.2, 0), color=Color.from_hex("#3f9c20"), text='R = 40.9 kN')
add(6, 'label', Point(2, -8.3, 0), color=Color.from_hex("#3f9c20"), text='62.3° below horizontal')


if __name__ == "__main__":
    print("EX 1.1 — Resultant of two non-parallel forces —", len(ops), "operations")
