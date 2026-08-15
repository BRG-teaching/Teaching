"""EX 2.2 — Dimensioning of a suspension bridge

Auto-generated from ops/ex2_2.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-8, -20.5, 0), text='Form Diagram')
add(0, 'label', Point(24, -20.5, 0), text='Force Diagram')
add(0, 'label', Point(24, -22.1, 0), text='1 unit :: 5 kN')

# step 1 — The bridge
add(1, 'segment', Line((-12.736, -18.044, 0), (14.684, -18.044, 0)), color=Color.from_hex("#aaaaaa"), width=0.163814)
add(1, 'segment', Line((-12.736, -18.044, 0), (-12.736, -19.144, 0)), color=Color.from_hex("#aaaaaa"), width=0.054432)
add(1, 'segment', Line((14.684, -18.044, 0), (14.684, -19.144, 0)), color=Color.from_hex("#aaaaaa"), width=0.054432)
add(1, 'point', Point(-19, 4, 0), color=Color.from_hex("#ffffff"), width=0.5328)
add(1, 'label', Point(-20.7, 4.9, 0), text='A')
add(1, 'polyline', Polyline([(-19, 9, 0), (-19, 2, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.4248)
add(1, 'point', Point(19.34, -6.476, 0), color=Color.from_hex("#ffffff"), width=0.5328)
add(1, 'label', Point(21.04, -5.576, 0), text='B')
add(1, 'polyline', Polyline([(19.34, -1.476, 0), (19.34, -8.476, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.4248)
add(1, 'segment', Line((-19, 4, 0), (-3.592, -11.384, 0)), color=Color.from_hex("#ce4095"), width=0.163814)
add(1, 'segment', Line((-3.592, -11.384, 0), (5.54, -13.5893, 0)), color=Color.from_hex("#ce4095"), width=0.163814)
add(1, 'segment', Line((5.54, -13.5893, 0), (19.34, -6.476, 0)), color=Color.from_hex("#ce4095"), width=0.163814)
add(1, 'segment', Line((-3.592, -11.384, 0), (-3.592, -18.044, 0)), color=Color.from_hex("#ce4095"), width=0.07776)
add(1, 'point', Point(-3.592, -11.384, 0), color=Color.from_hex("#ffffff"), width=0.42624)
add(1, 'segment', Line((5.54, -13.5893, 0), (5.54, -18.044, 0)), color=Color.from_hex("#ce4095"), width=0.07776)
add(1, 'point', Point(5.54, -13.5893, 0), color=Color.from_hex("#ffffff"), width=0.42624)

# step 2 — The loads
add(2, 'arrow', Line((-3.592, -18.044, 0), (-3.592, -23.644, 0)), color=Color.from_hex("#3f9c20"), width=0.196992, head=(0.679104, 0.26231))
add(2, 'label', Point(-1.692, -20.844, 0), color=Color.from_hex("#3f9c20"), text='F₂d')
add(2, 'arrow', Line((30, 1, 0), (30, -7, 0)), color=Color.from_hex("#3f9c20"), width=0.196992, head=(0.679104, 0.26231))
add(2, 'label', Point(27.8, -3, 0), color=Color.from_hex("#3f9c20"), text='F₂d')
add(2, 'arrow', Line((5.54, -18.044, 0), (5.54, -23.644, 0)), color=Color.from_hex("#3f9c20"), width=0.196992, head=(0.679104, 0.26231))
add(2, 'label', Point(7.44, -20.844, 0), color=Color.from_hex("#3f9c20"), text='F₁d')
add(2, 'arrow', Line((30, -7, 0), (30, -15, 0)), color=Color.from_hex("#3f9c20"), width=0.196992, head=(0.679104, 0.26231))
add(2, 'label', Point(27.8, -11, 0), color=Color.from_hex("#3f9c20"), text='F₁d')

# step 3 — The shape fixes the pole
add(3, 'segment', Line((40.5687, -9.55227, 0), (30, 1, 0)), color=Color.from_hex("#aaaaaa"), width=0.076723)
add(3, 'segment', Line((40.5687, -9.55227, 0), (30, -15, 0)), color=Color.from_hex("#aaaaaa"), width=0.076723)
add(3, 'point', Point(40.5687, -9.55227, 0), color=Color.from_hex("#ffffff"), width=0.42624)
add(3, 'label', Point(42.0687, -8.85227, 0), text='o')
add(3, 'segment', Line((30, 3.2, 0), (40.5687, 3.2, 0)), color=Color.from_hex("#aaaaaa"), width=0.054432)
add(3, 'label', Point(35.2844, 4.4, 0), color=Color.from_hex("#aaaaaa"), text='H = 52.8 kN')

# step 4 — The middle ray
add(4, 'segment', Line((40.5687, -9.55227, 0), (30, -7, 0)), color=Color.from_hex("#aaaaaa"), width=0.076723)

# step 5 — The three cable forces
add(5, 'polygon', Polygon([(-19.3166, 3.68294, 0), (-18.6834, 4.31706, 0), (-3.27543, -11.0669, 0), (-3.90857, -11.7011, 0)]), color=Color.from_hex("#ce4095"))
add(5, 'segment', Line((30, 1, 0), (40.5687, -9.55227, 0)), color=Color.from_hex("#ce4095"), width=0.163814)
add(5, 'label', Point(36.3442, -3.21465, 0), color=Color.from_hex("#ce4095"), text='74.7')
add(5, 'polygon', Polygon([(-3.66857, -11.7011, 0), (-3.51543, -11.0669, 0), (5.61657, -13.2722, 0), (5.46343, -13.9064, 0)]), color=Color.from_hex("#ce4095"))
add(5, 'segment', Line((30, -7, 0), (40.5687, -9.55227, 0)), color=Color.from_hex("#ce4095"), width=0.163814)
add(5, 'label', Point(35.6365, -6.81805, 0), color=Color.from_hex("#ce4095"), text='54.4')
add(5, 'polygon', Polygon([(5.70343, -13.9064, 0), (5.37657, -13.2722, 0), (19.1766, -6.15894, 0), (19.5034, -6.79306, 0)]), color=Color.from_hex("#ce4095"))
add(5, 'segment', Line((30, -15, 0), (40.5687, -9.55227, 0)), color=Color.from_hex("#ce4095"), width=0.163814)
add(5, 'label', Point(34.5971, -10.9428, 0), color=Color.from_hex("#ce4095"), text='59.5')

# step 6 — a) The relevant force
add(6, 'segment', Line((-19, 4, 0), (-3.592, -11.384, 0)), color=Color.from_hex("#ce4095"), width=0.34401)
add(6, 'label', Point(-16.5422, -5.74144, 0), color=Color.from_hex("#ce4095"), text='N_d,max = 74.7 kN')


if __name__ == "__main__":
    print("EX 2.2 — Dimensioning of a suspension bridge —", len(ops), "operations")
