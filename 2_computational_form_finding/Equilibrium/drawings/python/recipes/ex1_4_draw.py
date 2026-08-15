"""EX 1.4 — Single node equilibrium

Auto-generated from ops/ex1_4.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-30, -28.5, 0), text='Form Diagram — the six subsystems')
add(0, 'label', Point(18, -28.5, 0), text='Force Diagram — the six polygons')
add(0, 'label', Point(18, -30.2, 0), text='1 unit :: 3.2 kN')

# step 1 — The six subsystems
add(1, 'label', Point(-44.5, 12.5, 0), text='a)')
add(1, 'polyline', Polyline([(-38, 13, 0), (-38, -4, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6844)
add(1, 'segment', Line((-38, 5, 0), (-44.0622, 8.5, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(1, 'segment', Line((-38, 5, 0), (-31.9378, 8.5, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(1, 'arrow', Line((-38, 5, 0), (-38, -2, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(1, 'label', Point(-36.5, 1.5, 0), color=Color.from_hex("#3f9c20"), text='F')
add(1, 'point', Point(-38, 5, 0), color=Color.from_hex("#ffffff"), width=0.68672)
add(1, 'label', Point(-28.5, 12.5, 0), text='b)')
add(1, 'polyline', Polyline([(-22, 13, 0), (-22, -4, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6844)
add(1, 'segment', Line((-22, 5, 0), (-28.0622, 1.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.263923)
add(1, 'segment', Line((-22, 5, 0), (-15.9378, 1.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.263923)
add(1, 'arrow', Line((-22, 5, 0), (-22, -2, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(1, 'label', Point(-20.5, 1.5, 0), color=Color.from_hex("#3f9c20"), text='F')
add(1, 'point', Point(-22, 5, 0), color=Color.from_hex("#ffffff"), width=0.68672)
add(1, 'label', Point(-12.5, 12.5, 0), text='c)')
add(1, 'polyline', Polyline([(-6, 13, 0), (-6, -4, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6844)
add(1, 'segment', Line((-6, 5, 0), (-12.0622, 8.5, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(1, 'segment', Line((-6, 5, 0), (1, 5, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(1, 'arrow', Line((-6, 5, 0), (-6, -2, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(1, 'label', Point(-4.5, 1.5, 0), color=Color.from_hex("#3f9c20"), text='F')
add(1, 'point', Point(-6, 5, 0), color=Color.from_hex("#ffffff"), width=0.68672)
add(1, 'label', Point(-44.5, -8.5, 0), text='d)')
add(1, 'polyline', Polyline([(-38, -8, 0), (-38, -25, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6844)
add(1, 'segment', Line((-38, -16, 0), (-31.9378, -19.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.263923)
add(1, 'segment', Line((-38, -16, 0), (-31.9378, -12.5, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(1, 'arrow', Line((-38, -16, 0), (-38, -23, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(1, 'label', Point(-36.5, -19.5, 0), color=Color.from_hex("#3f9c20"), text='F')
add(1, 'point', Point(-38, -16, 0), color=Color.from_hex("#ffffff"), width=0.68672)
add(1, 'label', Point(-28.5, -8.5, 0), text='e)')
add(1, 'polyline', Polyline([(-22, -8, 0), (-22, -25, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6844)
add(1, 'segment', Line((-22, -16, 0), (-15, -16, 0)), color=Color.from_hex("#b9b9bd"), width=0.263923)
add(1, 'segment', Line((-22, -16, 0), (-29, -16, 0)), color=Color.from_hex("#b9b9bd"), width=0.263923)
add(1, 'arrow', Line((-22, -16, 0), (-22, -23, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(1, 'label', Point(-20.5, -19.5, 0), color=Color.from_hex("#3f9c20"), text='F')
add(1, 'point', Point(-22, -16, 0), color=Color.from_hex("#ffffff"), width=0.68672)
add(1, 'label', Point(-12.5, -8.5, 0), text='f)')
add(1, 'polyline', Polyline([(-6, -8, 0), (-6, -25, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6844)
add(1, 'segment', Line((-6, -16, 0), (0.062178, -19.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.263923)
add(1, 'segment', Line((-6, -16, 0), (0.062178, -12.5, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(1, 'arrow', Line((-6, -9, 0), (-6, -16, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(1, 'label', Point(-4.5, -12.5, 0), color=Color.from_hex("#3f9c20"), text='F')
add(1, 'point', Point(-6, -16, 0), color=Color.from_hex("#ffffff"), width=0.68672)

# step 2 — a) and b) — the load between the members
add(2, 'label', Point(5.5, 10.2, 0), text='a)')
add(2, 'polygon', Polygon([(-37.8477, 5.2637, 0), (-38.1523, 4.7363, 0), (-44.2144, 8.2363, 0), (-43.9099, 8.7637, 0)]), color=Color.from_hex("#f0bcdb"))
add(2, 'polygon', Polygon([(-37.8477, 4.7363, 0), (-38.1523, 5.2637, 0), (-32.0901, 8.7637, 0), (-31.7856, 8.2363, 0)]), color=Color.from_hex("#f0bcdb"))
add(2, 'arrow', Line((11, 9, 0), (11, -0.375, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(2, 'segment', Line((11, -0.375, 0), (2.88101, 4.3125, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(2, 'segment', Line((2.88101, 4.3125, 0), (11, 9, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(2, 'label', Point(6.94051, 0.36875, 0), color=Color.from_hex("#ce4095"), text='30')
add(2, 'label', Point(6.94051, 8.25625, 0), color=Color.from_hex("#ce4095"), text='30')
add(2, 'label', Point(28.5, 10.2, 0), text='b)')
add(2, 'polygon', Polygon([(-22.1522, 5.2637, 0), (-21.8478, 4.7363, 0), (-27.9099, 1.23629, 0), (-28.2144, 1.76371, 0)]), color=Color.from_hex("#bdbfe8"))
add(2, 'polygon', Polygon([(-22.1522, 4.7363, 0), (-21.8478, 5.2637, 0), (-15.7856, 1.76371, 0), (-16.0901, 1.23629, 0)]), color=Color.from_hex("#bdbfe8"))
add(2, 'arrow', Line((34, 9, 0), (34, -0.375, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(2, 'segment', Line((34, -0.375, 0), (42.119, 4.3125, 0)), color=Color.from_hex("#1a1eb2"), width=0.263923)
add(2, 'segment', Line((42.119, 4.3125, 0), (34, 9, 0)), color=Color.from_hex("#1a1eb2"), width=0.263923)
add(2, 'label', Point(38.0595, 0.36875, 0), color=Color.from_hex("#1a1eb2"), text='30')
add(2, 'label', Point(38.0595, 8.25625, 0), color=Color.from_hex("#1a1eb2"), text='30')

# step 3 — c) — one inclined, one horizontal
add(3, 'label', Point(51.5, 10.2, 0), text='c)')
add(3, 'polygon', Polygon([(-5.6955, 5.52741, 0), (-6.3045, 4.47259, 0), (-12.3667, 7.97259, 0), (-11.7577, 9.02741, 0)]), color=Color.from_hex("#f0bcdb"))
add(3, 'polygon', Polygon([(-6, 4.47259, 0), (-6, 5.52741, 0), (1, 5.52741, 0), (1, 4.47259, 0)]), color=Color.from_hex("#f0bcdb"))
add(3, 'arrow', Line((57, 9, 0), (57, -0.375, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(3, 'segment', Line((57, -0.375, 0), (40.762, 9, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(3, 'segment', Line((40.762, 9, 0), (57, 9, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(3, 'label', Point(48.881, 2.7125, 0), color=Color.from_hex("#ce4095"), text='60')
add(3, 'label', Point(48.881, 10.6, 0), color=Color.from_hex("#ce4095"), text='52')

# step 4 — d) — both members on one side
add(4, 'label', Point(5.5, -10.8, 0), text='d)')
add(4, 'polygon', Polygon([(-38.1523, -16.2637, 0), (-37.8477, -15.7363, 0), (-31.7856, -19.2363, 0), (-32.0901, -19.7637, 0)]), color=Color.from_hex("#bdbfe8"))
add(4, 'polygon', Polygon([(-37.8477, -16.2637, 0), (-38.1523, -15.7363, 0), (-32.0901, -12.2363, 0), (-31.7856, -12.7637, 0)]), color=Color.from_hex("#f0bcdb"))
add(4, 'arrow', Line((11, -12, 0), (11, -21.375, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(4, 'segment', Line((11, -21.375, 0), (2.88101, -16.6875, 0)), color=Color.from_hex("#1a1eb2"), width=0.263923)
add(4, 'segment', Line((2.88101, -16.6875, 0), (11, -12, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(4, 'label', Point(6.94051, -20.6313, 0), color=Color.from_hex("#1a1eb2"), text='30')
add(4, 'label', Point(6.94051, -12.7438, 0), color=Color.from_hex("#ce4095"), text='30')

# step 5 — e) — no solution
add(5, 'label', Point(28.5, -10.8, 0), text='e)')
add(5, 'polygon', Polygon([(-22, -16.0001, 0), (-22, -15.9999, 0), (-15, -15.9999, 0), (-15, -16.0001, 0)]), color=Color.from_hex("#e4e4e7"))
add(5, 'polygon', Polygon([(-22, -15.9999, 0), (-22, -16.0001, 0), (-29, -16.0001, 0), (-29, -15.9999, 0)]), color=Color.from_hex("#e4e4e7"))
add(5, 'arrow', Line((34, -12, 0), (34, -21.375, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(5, 'segment', Line((34, -21.375, 0), (39, -21.375, 0)), color=Color.from_hex("#b9b9bd"), width=0.263923)
add(5, 'segment', Line((34, -12, 0), (29, -12, 0)), color=Color.from_hex("#b9b9bd"), width=0.263923)
add(5, 'label', Point(34.5, -23.1875, 0), color=Color.from_hex("#b9b9bd"), text='the polygon cannot close')
add(5, 'polyline', Polyline([(34, -12, 0), (34, -21.375, 0)]), color=Color.from_hex("#b9b9bd"), dash=0.6844)

# step 6 — f) — the same as d)
add(6, 'label', Point(51.5, -10.8, 0), text='f)')
add(6, 'polygon', Polygon([(-6.15225, -16.2637, 0), (-5.84775, -15.7363, 0), (0.214428, -19.2363, 0), (-0.090072, -19.7637, 0)]), color=Color.from_hex("#bdbfe8"))
add(6, 'polygon', Polygon([(-5.84775, -16.2637, 0), (-6.15225, -15.7363, 0), (-0.090072, -12.2363, 0), (0.214428, -12.7637, 0)]), color=Color.from_hex("#f0bcdb"))
add(6, 'arrow', Line((57, -12, 0), (57, -21.375, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(6, 'segment', Line((57, -21.375, 0), (48.881, -16.6875, 0)), color=Color.from_hex("#1a1eb2"), width=0.263923)
add(6, 'segment', Line((48.881, -16.6875, 0), (57, -12, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(6, 'label', Point(52.9405, -20.6313, 0), color=Color.from_hex("#1a1eb2"), text='30')
add(6, 'label', Point(52.9405, -12.7438, 0), color=Color.from_hex("#ce4095"), text='30')


if __name__ == "__main__":
    print("EX 1.4 — Single node equilibrium —", len(ops), "operations")
