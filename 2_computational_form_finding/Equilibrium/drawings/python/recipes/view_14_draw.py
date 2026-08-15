"""Drawing 14 — Prestress

Auto-generated from ops/view_14.json — the drawing as literal COMPAS
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
add(0, 'label', Point(7.53, 87.22, 0), text='Form Diagram')
add(0, 'label', Point(108.23, 87.22, 0), text='Force Diagram')
add(0, 'label', Point(160, 87.22, 0), text='1 unit :: 0.15 kN')

# step 1 — Two anchors, a node, a ground anchor
add(1, 'polyline', Polyline([(45.4359, 5.46551, 0), (45.4359, 82.7078, 0)]), color=Color.from_hex("#aaaaaa"), dash=1.1)
add(1, 'polyline', Polyline([(108.445, 5.46551, 0), (108.445, 82.7078, 0)]), color=Color.from_hex("#aaaaaa"), dash=1.1)
add(1, 'point', Point(15.4918, 76.0956, 0), color=Color.from_hex("#ffffff"), width=0.85)
add(1, 'point', Point(75.38, 76.0956, 0), color=Color.from_hex("#ffffff"), width=0.85)
add(1, 'point', Point(45.4359, 60.6171, 0), color=Color.from_hex("#ffffff"), width=0.85)
add(1, 'point', Point(45.4359, 29.5098, 0), color=Color.from_hex("#ffffff"), width=0.85)

# step 2 — The cables 2 and 3
add(2, 'segment', Line((15.4918, 76.0956, 0), (45.4359, 60.6171, 0)), color=Color.from_hex("#ce4095"), width=0.2448)
add(2, 'segment', Line((75.38, 76.0956, 0), (45.4359, 60.6171, 0)), color=Color.from_hex("#ce4095"), width=0.2448)
add(2, 'label', Point(29.8639, 69.9563, 0), color=Color.from_hex("#ce4095"), text='2')
add(2, 'label', Point(61.008, 69.9563, 0), color=Color.from_hex("#ce4095"), text='3')

# step 3 — The tie 1
add(3, 'segment', Line((45.4359, 60.6171, 0), (45.4359, 29.5098, 0)), color=Color.from_hex("#ce4095"), width=0.2448)
add(3, 'label', Point(46.9359, 45.0634, 0), color=Color.from_hex("#ce4095"), text='1')

# step 4 — The prestress C
add(4, 'arrow', Line((45.4359, 29.5098, 0), (45.4359, 21.5098, 0)), color=Color.from_hex("#3f9c20"), width=0.396, head=(1.512, 0.612))
add(4, 'label', Point(47.0359, 23.1098, 0), color=Color.from_hex("#3f9c20"), text='C')

# step 6 — The load Q
add(6, 'arrow', Line((45.4359, 68.6171, 0), (45.4359, 60.6171, 0)), color=Color.from_hex("#3f9c20"), width=0.396, head=(1.512, 0.612))
add(6, 'label', Point(47.0359, 65.2171, 0), color=Color.from_hex("#3f9c20"), text='Q')
add(6, 'arrow', Line((108.445, 58.408, 0), (108.445, 38.308, 0)), color=Color.from_hex("#3f9c20"), width=0.396, head=(1.512, 0.612))
add(6, 'label', Point(106.445, 48.358, 0), color=Color.from_hex("#3f9c20"), text='Q')
add(6, 'point', Point(108.445, 58.408, 0), color=Color.from_hex("#ffffff"), width=0.62)
add(6, 'point', Point(108.445, 38.308, 0), color=Color.from_hex("#ffffff"), width=0.62)

# step 7 — Cable 2 keeps its force
add(7, 'polyline', Polyline([(108.445, 58.408, 0), (154.329, 34.69, 0)]), color=Color.from_hex("#aaaaaa"), dash=1.1)
add(7, 'segment', Line((108.445, 58.408, 0), (147.329, 38.308, 0)), color=Color.from_hex("#ce4095"), width=0.2448)
add(7, 'label', Point(121.11, 54.278, 0), color=Color.from_hex("#ce4095"), text='2')
add(7, 'point', Point(147.329, 38.308, 0), color=Color.from_hex("#ffffff"), width=0.62)

# step 8 — Cable 3
add(8, 'polyline', Polyline([(108.445, 38.308, 0), (154.329, 62.026, 0)]), color=Color.from_hex("#aaaaaa"), dash=1.1)
add(8, 'polyline', Polyline([(147.329, 38.308, 0), (147.329, 61.408, 0)]), color=Color.from_hex("#aaaaaa"), dash=1.1)
add(8, 'segment', Line((108.445, 38.308, 0), (147.329, 58.408, 0)), color=Color.from_hex("#ce4095"), width=0.2448)
add(8, 'label', Point(118.91, 42.438, 0), color=Color.from_hex("#ce4095"), text='3')
add(8, 'point', Point(147.329, 58.408, 0), color=Color.from_hex("#ffffff"), width=0.62)

# step 9 — The tie closes the polygon
add(9, 'segment', Line((147.329, 58.408, 0), (147.329, 38.308, 0)), color=Color.from_hex("#ce4095"), width=0.2448)
add(9, 'label', Point(145.529, 48.358, 0), color=Color.from_hex("#ce4095"), text='1')
add(9, 'arrow', Line((150.47, 58.408, 0), (150.47, 38.308, 0)), color=Color.from_hex("#3f9c20"), width=0.396, head=(1.512, 0.612))
add(9, 'label', Point(149.329, 48.358, 0), color=Color.from_hex("#3f9c20"), text='C')

# step 10 — Reactions A and B
add(10, 'arrow', Line((15.4918, 76.0956, 0), (8.38512, 79.7691, 0)), color=Color.from_hex("#3f9c20"), width=0.396, head=(1.512, 0.612))
add(10, 'arrow', Line((75.38, 76.0956, 0), (82.4867, 79.7691, 0)), color=Color.from_hex("#3f9c20"), width=0.396, head=(1.512, 0.612))
add(10, 'arrow', Line((148.771, 41.0976, 0), (109.887, 61.1976, 0)), color=Color.from_hex("#3f9c20"), width=0.396, head=(1.512, 0.612))
add(10, 'arrow', Line((109.887, 35.5184, 0), (148.771, 55.6184, 0)), color=Color.from_hex("#3f9c20"), width=0.396, head=(1.512, 0.612))
add(10, 'label', Point(6.98512, 81.3691, 0), color=Color.from_hex("#3f9c20"), text='A')
add(10, 'label', Point(83.8867, 81.3691, 0), color=Color.from_hex("#3f9c20"), text='B')
add(10, 'label', Point(115.966, 51.583, 0), color=Color.from_hex("#3f9c20"), text='A')
add(10, 'label', Point(139.808, 51.583, 0), color=Color.from_hex("#3f9c20"), text='B')

# step 11 — Pure tension
add(11, 'polygon', Polygon([(44.8832, 60.6171, 0), (45.9887, 60.6171, 0), (45.9887, 29.5098, 0), (44.8832, 29.5098, 0)]), color=Color.from_hex("#ce4095"))
add(11, 'polygon', Polygon([(14.9391, 75.0263, 0), (16.0446, 77.1649, 0), (45.9887, 61.6864, 0), (44.8832, 59.5478, 0)]), color=Color.from_hex("#ce4095"))
add(11, 'polygon', Polygon([(74.8273, 77.1649, 0), (75.9327, 75.0263, 0), (45.9887, 59.5478, 0), (44.8832, 61.6864, 0)]), color=Color.from_hex("#ce4095"))
add(11, 'label', Point(160, 84.5, 0), color=Color.from_hex("#3f9c20"), text='A = 6.5 kN')
add(11, 'label', Point(160, 81.6, 0), color=Color.from_hex("#3f9c20"), text='B = 6.5 kN')
add(11, 'label', Point(160, 78.7, 0), color=Color.from_hex("#ce4095"), text='N₁ = 3.0 kN')
add(11, 'label', Point(160, 75.8, 0), color=Color.from_hex("#3f9c20"), text='Q = 3.0 kN')
add(11, 'label', Point(160, 72.9, 0), color=Color.from_hex("#3f9c20"), text='C = 6.0 kN')


if __name__ == "__main__":
    print("Drawing 14 — Prestress —", len(ops), "operations")
