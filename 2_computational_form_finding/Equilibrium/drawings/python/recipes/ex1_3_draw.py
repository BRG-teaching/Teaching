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
add(0, 'label', Point(38, -33, 0), text='Form Diagram')
add(0, 'label', Point(57, -33, 0), text='Force Diagram')
add(0, 'label', Point(57, -34.3, 0), text='1 unit :: 8 kN')

# step 1 — The sculpture and its weights
add(1, 'segment', Line((16, -18, 0), (54, -18, 0)), color=Color.from_hex("#aaaaaa"), width=0.127411)
add(1, 'segment', Line((17.4615, -18, 0), (16.5423, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((18.9231, -18, 0), (18.0038, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((20.3846, -18, 0), (19.4654, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((21.8462, -18, 0), (20.9269, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((23.3077, -18, 0), (22.3885, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((24.7692, -18, 0), (23.85, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((26.2308, -18, 0), (25.3115, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((27.6923, -18, 0), (26.7731, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((29.1538, -18, 0), (28.2346, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((30.6154, -18, 0), (29.6961, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((32.0769, -18, 0), (31.1577, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((33.5385, -18, 0), (32.6192, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((35, -18, 0), (34.0808, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((36.4615, -18, 0), (35.5423, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((37.9231, -18, 0), (37.0038, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((39.3846, -18, 0), (38.4654, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((40.8462, -18, 0), (39.9269, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((42.3077, -18, 0), (41.3885, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((43.7692, -18, 0), (42.85, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((45.2308, -18, 0), (44.3115, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((46.6923, -18, 0), (45.7731, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((48.1538, -18, 0), (47.2346, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((49.6154, -18, 0), (48.6961, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((51.0769, -18, 0), (50.1577, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((52.5385, -18, 0), (51.6192, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((54, -18, 0), (53.0808, -18.9192, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'polygon', Polygon([(22.58, -7.8, 0), (32.78, -7.8, 0), (32.78, -1.01, 0), (22.58, -1.01, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.1)
add(1, 'segment', Line((22.58, -7.8, 0), (32.78, -7.8, 0)), color=Color.from_hex("#111111"), width=0.116928)
add(1, 'segment', Line((32.78, -7.8, 0), (32.78, -1.01, 0)), color=Color.from_hex("#111111"), width=0.116928)
add(1, 'segment', Line((32.78, -1.01, 0), (22.58, -1.01, 0)), color=Color.from_hex("#111111"), width=0.116928)
add(1, 'segment', Line((22.58, -1.01, 0), (22.58, -7.8, 0)), color=Color.from_hex("#111111"), width=0.116928)
add(1, 'polyline', Polyline([(27.68, -0.71, 0), (27.68, -26, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.413)
add(1, 'arrow', Line((27.68, -0.6618, 0), (27.68, -3.8618, 0)), color=Color.from_hex("#3f9c20"), width=0.19152, head=(0.66024, 0.255024))
add(1, 'label', Point(29.18, -2.1618, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(1, 'polygon', Polygon([(26.62, -11.21, 0), (47.02, -11.21, 0), (47.02, -7.8, 0), (26.62, -7.8, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.1)
add(1, 'segment', Line((26.62, -11.21, 0), (47.02, -11.21, 0)), color=Color.from_hex("#111111"), width=0.116928)
add(1, 'segment', Line((47.02, -11.21, 0), (47.02, -7.8, 0)), color=Color.from_hex("#111111"), width=0.116928)
add(1, 'segment', Line((47.02, -7.8, 0), (26.62, -7.8, 0)), color=Color.from_hex("#111111"), width=0.116928)
add(1, 'segment', Line((26.62, -7.8, 0), (26.62, -11.21, 0)), color=Color.from_hex("#111111"), width=0.116928)
add(1, 'polyline', Polyline([(36.82, -7.5, 0), (36.82, -26, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.413)
add(1, 'arrow', Line((36.82, -6.0322, 0), (36.82, -9.2322, 0)), color=Color.from_hex("#3f9c20"), width=0.19152, head=(0.66024, 0.255024))
add(1, 'label', Point(38.32, -7.5322, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(1, 'polygon', Polygon([(36.29, -18, 0), (43.09, -18, 0), (43.09, -11.21, 0), (36.29, -11.21, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.1)
add(1, 'segment', Line((36.29, -18, 0), (43.09, -18, 0)), color=Color.from_hex("#111111"), width=0.116928)
add(1, 'segment', Line((43.09, -18, 0), (43.09, -11.21, 0)), color=Color.from_hex("#111111"), width=0.116928)
add(1, 'segment', Line((43.09, -11.21, 0), (36.29, -11.21, 0)), color=Color.from_hex("#111111"), width=0.116928)
add(1, 'segment', Line((36.29, -11.21, 0), (36.29, -18, 0)), color=Color.from_hex("#111111"), width=0.116928)
add(1, 'polyline', Polyline([(39.69, -10.91, 0), (39.69, -26, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.413)
add(1, 'arrow', Line((39.69, -10.8618, 0), (39.69, -14.0618, 0)), color=Color.from_hex("#3f9c20"), width=0.19152, head=(0.66024, 0.255024))
add(1, 'label', Point(41.19, -12.3618, 0), color=Color.from_hex("#3f9c20"), text='F₃')

# step 2 — The load line
add(2, 'arrow', Line((61.5, -1, 0), (61.5, -8.5, 0)), color=Color.from_hex("#3f9c20"), width=0.19152, head=(0.66024, 0.255024))
add(2, 'label', Point(63, -4.75, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(2, 'arrow', Line((61.5, -8.5, 0), (61.5, -16, 0)), color=Color.from_hex("#3f9c20"), width=0.19152, head=(0.66024, 0.255024))
add(2, 'label', Point(63, -12.25, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(2, 'arrow', Line((61.5, -16, 0), (61.5, -21, 0)), color=Color.from_hex("#3f9c20"), width=0.19152, head=(0.66024, 0.255024))
add(2, 'label', Point(63, -18.5, 0), color=Color.from_hex("#3f9c20"), text='F₃')

# step 3 — Pick any pole o
add(3, 'point', Point(53, -9, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(3, 'label', Point(53.6, -8.1, 0), text='o')
add(3, 'label', Point(62.4, -0.9, 0), color=Color.from_hex("#aaaaaa"), text='0')
add(3, 'segment', Line((53, -9, 0), (61.5, -8.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.074592)
add(3, 'label', Point(62.4, -8.4, 0), color=Color.from_hex("#aaaaaa"), text='1')
add(3, 'segment', Line((53, -9, 0), (61.5, -16, 0)), color=Color.from_hex("#aaaaaa"), width=0.074592)
add(3, 'label', Point(62.4, -15.9, 0), color=Color.from_hex("#aaaaaa"), text='2')
add(3, 'label', Point(62.4, -20.9, 0), color=Color.from_hex("#aaaaaa"), text='3')

# step 4 — The trial funicular
add(4, 'segment', Line((27.68, -22, 0), (36.82, -21.4624, 0)), color=Color.from_hex("#aaaaaa"), width=0.116928)
add(4, 'segment', Line((36.82, -21.4624, 0), (39.69, -23.8259, 0)), color=Color.from_hex("#aaaaaa"), width=0.116928)

# step 5 — Close it: the point S
add(5, 'segment', Line((53, -9, 0), (61.5, -1, 0)), color=Color.from_hex("#aaaaaa"), width=0.074592)
add(5, 'segment', Line((53, -9, 0), (61.5, -21, 0)), color=Color.from_hex("#aaaaaa"), width=0.074592)
add(5, 'polyline', Polyline([(34.11, -15.9482, 0), (27.68, -22, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.413)
add(5, 'polyline', Polyline([(39.69, -23.8259, 0), (34.11, -15.9482, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.413)
add(5, 'point', Point(34.11, -15.9482, 0), color=Color.from_hex("#ffffff"), width=0.518)
add(5, 'label', Point(35.21, -15.0482, 0), text='S')

# step 6 — The resultant — in both diagrams
add(6, 'polyline', Polyline([(34.11, 8, 0), (34.11, -17.9482, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.413)
add(6, 'arrow', Line((34.11, 6, 0), (34.11, 0.6, 0)), color=Color.from_hex("#3f9c20"), width=0.220248, dash=0.6608, head=(0.66024, 0.255024))
add(6, 'arrow', Line((62.1405, -1, 0), (62.1405, -21, 0)), color=Color.from_hex("#3f9c20"), width=0.220248, dash=0.6608, head=(0.66024, 0.255024))
add(6, 'label', Point(36.51, 3.3, 0), color=Color.from_hex("#3f9c20"), text='R')
add(6, 'label', Point(63.8405, -11, 0), color=Color.from_hex("#3f9c20"), text='R')

# step 7 — Stable or not?
add(7, 'segment', Line((36.29, -18.35, 0), (43.09, -18.35, 0)), color=Color.from_hex("#111111"), width=0.254822)
add(7, 'label', Point(39.69, -19.9, 0), text='contact patch')
add(7, 'label', Point(33.61, -21.4, 0), color=Color.from_hex("#ce4095"), text='NOT STABLE — it tips')


if __name__ == "__main__":
    print("EX 1.3 — Resultant of several parallel forces —", len(ops), "operations")
