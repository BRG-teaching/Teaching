"""EX 1.2 — Resultant of several non-parallel forces

Auto-generated from ops/ex1_2.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-21, -12.5, 0), text='Form Diagram')
add(0, 'label', Point(17, -12.5, 0), text='Force Diagram')
add(0, 'label', Point(17, -13.6, 0), text='1 unit :: 6 kN')

# step 1 — The four given forces
add(1, 'polyline', Polyline([(-20.5567, 9.96107, 0), (-16.9382, -15.7859, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'arrow', Line((-20, 6, 0), (-19.4155, 1.84087, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(1, 'label', Point(-18.4204, 4.10136, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(1, 'polyline', Polyline([(-10.74, 13.32, 0), (-10.74, -12.68, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'arrow', Line((-10.74, 9.32, 0), (-10.74, 5.12, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(1, 'label', Point(-9.44, 7.22, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(1, 'polyline', Polyline([(-5.94862, 8.88478, 0), (-3.68257, -17.0163, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'arrow', Line((-5.6, 4.9, 0), (-5.23395, 0.715982, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(1, 'label', Point(-4.12192, 2.92129, 0), color=Color.from_hex("#3f9c20"), text='F₃')
add(1, 'polyline', Polyline([(5.26808, 0.43877, 0), (-3.62444, -23.9932, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'arrow', Line((3.9, -3.32, 0), (2.46352, -7.26671, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(1, 'label', Point(4.40336, -5.73798, 0), color=Color.from_hex("#3f9c20"), text='F₄')

# step 2 — The load line
add(2, 'arrow', Line((17.5, 10.5, 0), (18.5438, 3.07299, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(2, 'label', Point(19.3719, 6.7865, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(2, 'arrow', Line((18.5438, 3.07299, 0), (18.5438, -1.92701, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(2, 'label', Point(19.8938, 0.572989, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(2, 'arrow', Line((18.5438, -1.92701, 0), (18.7617, -4.4175, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(2, 'label', Point(20.0027, -3.17225, 0), color=Color.from_hex("#3f9c20"), text='F₃')
add(2, 'arrow', Line((18.7617, -4.4175, 0), (17.0516, -9.11596, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(2, 'label', Point(19.2566, -6.76673, 0), color=Color.from_hex("#3f9c20"), text='F₄')

# step 3 — Pick any pole o
add(3, 'point', Point(8.5, 1, 0), color=Color.from_hex("#ffffff"), width=0.33152)
add(3, 'label', Point(7.4, 1.6, 0), text='o')
add(3, 'label', Point(18.35, 10.65, 0), color=Color.from_hex("#aaaaaa"), text='0')
add(3, 'segment', Line((8.5, 1, 0), (18.5438, 3.07299, 0)), color=Color.from_hex("#aaaaaa"), width=0.059674)
add(3, 'label', Point(19.3938, 3.22299, 0), color=Color.from_hex("#aaaaaa"), text='1')
add(3, 'segment', Line((8.5, 1, 0), (18.5438, -1.92701, 0)), color=Color.from_hex("#aaaaaa"), width=0.059674)
add(3, 'label', Point(19.3938, -1.77701, 0), color=Color.from_hex("#aaaaaa"), text='2')
add(3, 'segment', Line((8.5, 1, 0), (18.7617, -4.4175, 0)), color=Color.from_hex("#aaaaaa"), width=0.059674)
add(3, 'label', Point(19.6117, -4.2675, 0), color=Color.from_hex("#aaaaaa"), text='3')
add(3, 'label', Point(17.9016, -8.96596, 0), color=Color.from_hex("#aaaaaa"), text='4')

# step 4 — The trial funicular
add(4, 'segment', Line((-18.6083, -3.90268, 0), (-10.74, -2.27871, 0)), color=Color.from_hex("#aaaaaa"), width=0.093542)
add(4, 'segment', Line((-10.74, -2.27871, 0), (-4.82103, -4.00364, 0)), color=Color.from_hex("#aaaaaa"), width=0.093542)
add(4, 'segment', Line((-4.82103, -4.00364, 0), (2.28561, -7.75549, 0)), color=Color.from_hex("#aaaaaa"), width=0.093542)

# step 5 — Close the funicular
add(5, 'segment', Line((8.5, 1, 0), (17.5, 10.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.059674)
add(5, 'segment', Line((8.5, 1, 0), (17.0516, -9.11596, 0)), color=Color.from_hex("#aaaaaa"), width=0.059674)
add(5, 'polyline', Polyline([(-9.28802, 5.93536, 0), (-18.6083, -3.90268, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(5, 'polyline', Polyline([(2.28561, -7.75549, 0), (-9.28802, 5.93536, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)

# step 6 — Their meeting point S
add(6, 'point', Point(-9.28802, 5.93536, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(6, 'label', Point(-8.08802, 6.83536, 0), text='S')

# step 7 — The resultant — in both diagrams
add(7, 'arrow', Line((-9.1535, 11.8201, 0), (-9.60191, -7.79581, 0)), color=Color.from_hex("#3f9c20"), width=0.176198, dash=0.52864, head=(0.528192, 0.204019))
add(7, 'arrow', Line((17.5, 10.5, 0), (17.0516, -9.11596, 0)), color=Color.from_hex("#3f9c20"), width=0.176198, dash=0.52864, head=(0.528192, 0.204019))
add(7, 'label', Point(-8.20191, -8.29581, 0), color=Color.from_hex("#3f9c20"), text='R')
add(7, 'label', Point(15.6758, 0.69202, 0), color=Color.from_hex("#3f9c20"), text='R')

# step 8 — The answer
add(8, 'label', Point(0.5, -12.5, 0), color=Color.from_hex("#3f9c20"), text='R = 117.7 kN at 91.3°')


if __name__ == "__main__":
    print("EX 1.2 — Resultant of several non-parallel forces —", len(ops), "operations")
