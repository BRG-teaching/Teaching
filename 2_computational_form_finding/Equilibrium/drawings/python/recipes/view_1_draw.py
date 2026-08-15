"""Drawing 1 — Subsystem

Auto-generated from ops/view_1.json — the drawing as literal COMPAS
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
add(0, 'label', Point(18, 79.4, 0), text='Form Diagram')

# step 1 — Node A
add(1, 'point', Point(24, 48, 0), color=Color.from_hex("#ffffff"), width=0.65)
add(1, 'label', Point(21.6, 46.2, 0), text='A')

# step 2 — Guide circle
add(2, 'circle', Circle(21, frame=Frame((24, 48, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#aaaaaa"), dash=1.2)

# step 3 — Bar 3
add(3, 'segment', Line((24, 48, 0), (23.877, 68.9996, 0)), color=Color.from_hex("#1a1eb2"), width=0.288)
add(3, 'point', Point(23.877, 68.9996, 0), color=Color.from_hex("#ffffff"), width=0.65)
add(3, 'label', Point(25.277, 69.9996, 0), text='B')
add(3, 'label', Point(22.3385, 57.4998, 0), color=Color.from_hex("#1a1eb2"), text='3')

# step 4 — The load — in both diagrams
add(4, 'label', Point(89, 79.3, 0), text='Force Diagram')
add(4, 'segment', Line((96, 58, 0), (96.0937, 42.0003, 0)), color=Color.from_hex("#1a1eb2"), width=0.288)
add(4, 'arrow', Line((23.836, 75.9995, 0), (23.877, 68.9996, 0)), color=Color.from_hex("#3f9c20"), width=0.396, head=(1.224, 0.468))
add(4, 'arrow', Line((98.4258, 58.0142, 0), (98.5195, 42.0145, 0)), color=Color.from_hex("#3f9c20"), width=0.396, head=(1.224, 0.468))
add(4, 'point', Point(96, 58, 0), color=Color.from_hex("#ffffff"), width=0.65)
add(4, 'point', Point(96.0937, 42.0003, 0), color=Color.from_hex("#ffffff"), width=0.42)
add(4, 'label', Point(97.2, 56.2, 0), text='F4')
add(4, 'label', Point(97.4937, 41.0003, 0), text='G')
add(4, 'label', Point(97.2469, 49.9001, 0), color=Color.from_hex("#1a1eb2"), text='3')

# step 5 — Bar 1 — form and parallel
add(5, 'segment', Line((5.81347, 37.5, 0), (24, 48, 0)), color=Color.from_hex("#1a1eb2"), width=0.288)
add(5, 'polyline', Polyline([(101.196, 61, 0), (75.2625, 46.0272, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.9)
add(5, 'point', Point(5.81347, 37.5, 0), color=Color.from_hex("#ffffff"), width=0.65)
add(5, 'label', Point(3.21347, 36.9, 0), text='C')
add(5, 'label', Point(14.9067, 43.95, 0), color=Color.from_hex("#1a1eb2"), text='1')

# step 6 — Bar 2 — form and parallel
add(6, 'segment', Line((42.1865, 37.5, 0), (24, 48, 0)), color=Color.from_hex("#1a1eb2"), width=0.288)
add(6, 'polyline', Polyline([(101.29, 39.0003, 0), (75.2625, 54.0272, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.9)
add(6, 'point', Point(42.1865, 37.5, 0), color=Color.from_hex("#ffffff"), width=0.65)
add(6, 'label', Point(43.5865, 36.9, 0), text='D')
add(6, 'label', Point(32.4933, 43.75, 0), color=Color.from_hex("#1a1eb2"), text='2')

# step 7 — Point H
add(7, 'point', Point(82.1907, 50.0272, 0), color=Color.from_hex("#ffffff"), width=0.42)
add(7, 'label', Point(81.3907, 52.0272, 0), text='H')

# step 8 — Forces in bars 1 and 2
add(8, 'segment', Line((96.0937, 42.0003, 0), (82.1907, 50.0272, 0)), color=Color.from_hex("#1a1eb2"), width=0.288)
add(8, 'segment', Line((82.1907, 50.0272, 0), (96, 58, 0)), color=Color.from_hex("#1a1eb2"), width=0.288)
add(8, 'label', Point(89.1422, 44.0137, 0), color=Color.from_hex("#1a1eb2"), text='2')
add(8, 'label', Point(89.0953, 55.4136, 0), color=Color.from_hex("#1a1eb2"), text='1')

# step 9 — Compression / tension
add(9, 'polygon', Polygon([(24.325, 48.0019, 0), (23.675, 47.9981, 0), (23.552, 68.9977, 0), (24.202, 69.0015, 0)]), color=Color.from_hex("#1a1eb2"))
add(9, 'polygon', Polygon([(23.837, 47.7176, 0), (24.163, 48.2824, 0), (42.3496, 37.7824, 0), (42.0235, 37.2176, 0)]), color=Color.from_hex("#1a1eb2"))
add(9, 'polygon', Polygon([(23.8381, 48.2805, 0), (24.1619, 47.7195, 0), (5.97541, 37.2195, 0), (5.65152, 37.7805, 0)]), color=Color.from_hex("#1a1eb2"))


if __name__ == "__main__":
    print("Drawing 1 — Subsystem —", len(ops), "operations")
