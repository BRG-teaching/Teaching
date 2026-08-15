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
add(0, 'label', Point(-2.6, -1.9, 0), text='Form Diagram')
add(0, 'label', Point(6.3, -1.9, 0), text='Force Diagram')
add(0, 'label', Point(6.3, -2.28, 0), text='1 unit :: 20 kN')
add(0, 'label', Point(-2.6, -2.28, 0), text='the lines of action')

# step 1 — The two given forces
add(1, 'polyline', Polyline([(-2.85138, 0.932527, 0), (0.950461, -0.310842, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.28)
add(1, 'polyline', Polyline([(0, 2.4, 0), (0, -1.2, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.28)
add(1, 'arrow', Line((-1.09303, 0.357469, 0), (-0.285138, 0.093253, 0)), color=Color.from_hex("#3f9c20"), width=0.1152, head=(0.3024, 0.1224))
add(1, 'arrow', Line((0, 1.15, 0), (0, 0.3, 0)), color=Color.from_hex("#3f9c20"), width=0.1152, head=(0.3024, 0.1224))
add(1, 'label', Point(-0.447046, 0.482882, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(1, 'label', Point(0.32, 0.575, 0), color=Color.from_hex("#3f9c20"), text='F₂')

# step 2 — Lay off F₁
add(2, 'arrow', Line((4.6, 1.9, 0), (5.55046, 1.58916, 0)), color=Color.from_hex("#3f9c20"), width=0.1152, head=(0.3024, 0.1224))
add(2, 'label', Point(5.18092, 2.06774, 0), color=Color.from_hex("#3f9c20"), text='F₁')

# step 3 — F₂ tip to tail
add(3, 'arrow', Line((5.55046, 1.58916, 0), (5.55046, 0.089158, 0)), color=Color.from_hex("#3f9c20"), width=0.1152, head=(0.3024, 0.1224))
add(3, 'label', Point(5.19046, 0.839158, 0), color=Color.from_hex("#3f9c20"), text='F₂')

# step 4 — Where do the lines cross?
add(4, 'polyline', Polyline([(0, 0, 0), (1.80588, -0.5906, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.28)
add(4, 'polyline', Polyline([(0, 0, 0), (0, -1.6, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.28)
add(4, 'point', Point(0, 0, 0), color=Color.from_hex("#ffffff"), width=0.11)
add(4, 'label', Point(0.3, 0.3, 0), text='P')

# step 5 — The resultant — in both diagrams
add(5, 'arrow', Line((-0.332662, 0.633795, 0), (0.6178, -1.17705, 0)), color=Color.from_hex("#3f9c20"), width=0.144, dash=0.3, head=(0.36, 0.1512))
add(5, 'label', Point(0.9778, -1.33705, 0), color=Color.from_hex("#3f9c20"), text='R')
add(5, 'arrow', Line((4.6, 1.9, 0), (5.55046, 0.089158, 0)), color=Color.from_hex("#3f9c20"), width=0.144, dash=0.3, head=(0.36, 0.1512))
add(5, 'label', Point(5.49523, 1.09458, 0), color=Color.from_hex("#3f9c20"), text='R')

# step 6 — The answer
add(6, 'label', Point(3, -1.9, 0), color=Color.from_hex("#3f9c20"), text='R = 40.9 kN')
add(6, 'label', Point(3, -2.28, 0), color=Color.from_hex("#3f9c20"), text='62.3° below horizontal')


if __name__ == "__main__":
    print("EX 1.1 — Resultant of two non-parallel forces —", len(ops), "operations")
