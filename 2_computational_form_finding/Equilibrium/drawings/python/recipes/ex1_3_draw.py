"""EX 1.3 — Resultant of several parallel forces

Auto-generated from ops/ex1_3.json — the drawing as literal COMPAS
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
add(0, 'label', Point(10, -23.5, 0), text='Form Diagram')
add(0, 'label', Point(45, -23.5, 0), text='Force Diagram')
add(0, 'label', Point(45, -24.7, 0), text='1 unit :: 8 kN')

# step 1 — The sculpture and its weights
add(1, 'segment', Line((6, -8, 0), (42, -8, 0)), color=Color.from_hex("#aaaaaa"), width=0.105569)
add(1, 'segment', Line((6.4, -8, 0), (5.7, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((7.75, -8, 0), (7.05, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((9.1, -8, 0), (8.4, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((10.45, -8, 0), (9.75, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((11.8, -8, 0), (11.1, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((13.15, -8, 0), (12.45, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((14.5, -8, 0), (13.8, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((15.85, -8, 0), (15.15, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((17.2, -8, 0), (16.5, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((18.55, -8, 0), (17.85, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((19.9, -8, 0), (19.2, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((21.25, -8, 0), (20.55, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((22.6, -8, 0), (21.9, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((23.95, -8, 0), (23.25, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((25.3, -8, 0), (24.6, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((26.65, -8, 0), (25.95, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((28, -8, 0), (27.3, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((29.35, -8, 0), (28.65, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((30.7, -8, 0), (30, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((32.05, -8, 0), (31.35, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((33.4, -8, 0), (32.7, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((34.75, -8, 0), (34.05, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((36.1, -8, 0), (35.4, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((37.45, -8, 0), (36.75, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((38.8, -8, 0), (38.1, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((40.15, -8, 0), (39.45, -8.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'polygon', Polygon([(12.58, 2.2, 0), (22.78, 2.2, 0), (22.78, 8.99, 0), (12.58, 8.99, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.1)
add(1, 'segment', Line((12.58, 2.2, 0), (22.78, 2.2, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'segment', Line((22.78, 2.2, 0), (22.78, 8.99, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'segment', Line((22.78, 8.99, 0), (12.58, 8.99, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'segment', Line((12.58, 8.99, 0), (12.58, 2.2, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'polyline', Polyline([(17.68, 13.99, 0), (17.68, -16, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3422)
add(1, 'arrow', Line((17.68, 10.7382, 0), (17.68, 6.1382, 0)), color=Color.from_hex("#3f9c20"), width=0.158688, head=(0.547056, 0.211306))
add(1, 'label', Point(19.08, 8.5382, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(1, 'polygon', Polygon([(16.62, -1.21, 0), (37.02, -1.21, 0), (37.02, 2.2, 0), (16.62, 2.2, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.1)
add(1, 'segment', Line((16.62, -1.21, 0), (37.02, -1.21, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'segment', Line((37.02, -1.21, 0), (37.02, 2.2, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'segment', Line((37.02, 2.2, 0), (16.62, 2.2, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'segment', Line((16.62, 2.2, 0), (16.62, -1.21, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'polyline', Polyline([(26.82, 7.2, 0), (26.82, -16, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3422)
add(1, 'arrow', Line((26.82, 5.3678, 0), (26.82, 0.7678, 0)), color=Color.from_hex("#3f9c20"), width=0.158688, head=(0.547056, 0.211306))
add(1, 'label', Point(28.22, 3.1678, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(1, 'polygon', Polygon([(26.29, -8, 0), (33.09, -8, 0), (33.09, -1.21, 0), (26.29, -1.21, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.1)
add(1, 'segment', Line((26.29, -8, 0), (33.09, -8, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'segment', Line((33.09, -8, 0), (33.09, -1.21, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'segment', Line((33.09, -1.21, 0), (26.29, -1.21, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'segment', Line((26.29, -1.21, 0), (26.29, -8, 0)), color=Color.from_hex("#111111"), width=0.096883)
add(1, 'polyline', Polyline([(29.69, 3.79, 0), (29.69, -16, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3422)
add(1, 'arrow', Line((29.69, 0.5382, 0), (29.69, -4.0618, 0)), color=Color.from_hex("#3f9c20"), width=0.158688, head=(0.547056, 0.211306))
add(1, 'label', Point(31.09, -1.6618, 0), color=Color.from_hex("#3f9c20"), text='F₃')

# step 2 — The load line
add(2, 'arrow', Line((49.5, 9, 0), (49.5, 1.5, 0)), color=Color.from_hex("#3f9c20"), width=0.158688, head=(0.547056, 0.211306))
add(2, 'label', Point(51, 5.25, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(2, 'arrow', Line((49.5, 1.5, 0), (49.5, -6, 0)), color=Color.from_hex("#3f9c20"), width=0.158688, head=(0.547056, 0.211306))
add(2, 'label', Point(51, -2.25, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(2, 'arrow', Line((49.5, -6, 0), (49.5, -11, 0)), color=Color.from_hex("#3f9c20"), width=0.158688, head=(0.547056, 0.211306))
add(2, 'label', Point(51, -8.5, 0), color=Color.from_hex("#3f9c20"), text='F₃')

# step 3 — Pick any pole o
add(3, 'point', Point(41, 1, 0), color=Color.from_hex("#ffffff"), width=0.34336)
add(3, 'label', Point(41.6, 1.9, 0), text='o')
add(3, 'label', Point(50.4, 9.1, 0), color=Color.from_hex("#aaaaaa"), text='0')
add(3, 'segment', Line((41, 1, 0), (49.5, 1.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.061805)
add(3, 'label', Point(50.4, 1.6, 0), color=Color.from_hex("#aaaaaa"), text='1')
add(3, 'segment', Line((41, 1, 0), (49.5, -6, 0)), color=Color.from_hex("#aaaaaa"), width=0.061805)
add(3, 'label', Point(50.4, -5.9, 0), color=Color.from_hex("#aaaaaa"), text='2')
add(3, 'label', Point(50.4, -10.9, 0), color=Color.from_hex("#aaaaaa"), text='3')

# step 4 — The trial funicular
add(4, 'segment', Line((17.68, -12, 0), (26.82, -11.4624, 0)), color=Color.from_hex("#aaaaaa"), width=0.096883)
add(4, 'segment', Line((26.82, -11.4624, 0), (29.69, -13.8259, 0)), color=Color.from_hex("#aaaaaa"), width=0.096883)

# step 5 — Close it: the point S
add(5, 'segment', Line((41, 1, 0), (49.5, 9, 0)), color=Color.from_hex("#aaaaaa"), width=0.061805)
add(5, 'segment', Line((41, 1, 0), (49.5, -11, 0)), color=Color.from_hex("#aaaaaa"), width=0.061805)
add(5, 'polyline', Polyline([(24.11, -5.94824, 0), (17.68, -12, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3422)
add(5, 'polyline', Polyline([(29.69, -13.8259, 0), (24.11, -5.94824, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3422)
add(5, 'point', Point(24.11, -5.94824, 0), color=Color.from_hex("#ffffff"), width=0.4292)
add(5, 'label', Point(25.21, -5.04824, 0), text='S')

# step 6 — The resultant — in both diagrams
add(6, 'polyline', Polyline([(24.11, 7, 0), (24.11, -7.94824, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3422)
add(6, 'arrow', Line((24.11, 4, 0), (24.11, -16, 0)), color=Color.from_hex("#3f9c20"), width=0.182491, dash=0.54752, head=(0.547056, 0.211306))
add(6, 'arrow', Line((52.7, 9, 0), (52.7, -11, 0)), color=Color.from_hex("#3f9c20"), width=0.182491, dash=0.54752, head=(0.547056, 0.211306))
add(6, 'label', Point(22.21, -6, 0), color=Color.from_hex("#3f9c20"), text='R')
add(6, 'label', Point(54.4, -1, 0), color=Color.from_hex("#3f9c20"), text='R')

# step 7 — Stable or not?
add(7, 'segment', Line((26.29, -8.35, 0), (33.09, -8.35, 0)), color=Color.from_hex("#232327"), width=0.211139)
add(7, 'label', Point(29.69, -9.9, 0), text='contact patch')
add(7, 'label', Point(23.61, -11.4, 0), text='NOT STABLE — it tips')


if __name__ == "__main__":
    print("EX 1.3 — Resultant of several parallel forces —", len(ops), "operations")
