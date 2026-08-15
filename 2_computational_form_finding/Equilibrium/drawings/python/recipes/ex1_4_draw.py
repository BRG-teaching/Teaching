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
add(0, 'label', Point(-30, -24.2, 0), text='Form Diagram — the six subsystems')
add(0, 'label', Point(24, -28.5, 0), text='Force Diagram — the six polygons')
add(0, 'label', Point(24, -30.2, 0), text='1 unit :: 3.2 kN')

# step 1 — The six subsystems
add(1, 'label', Point(-44.5, 5.2, 0), text='a)')
add(1, 'polyline', Polyline([(-38, 5.8, 0), (-38, -9, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6844)
add(1, 'segment', Line((-38, -1, 0), (-44.0622, 2.5, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(1, 'segment', Line((-38, -1, 0), (-31.9378, 2.5, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(1, 'arrow', Line((-38, -1, 0), (-38, -8, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(1, 'label', Point(-36.5, -4.5, 0), color=Color.from_hex("#3f9c20"), text='F')
add(1, 'point', Point(-38, -1, 0), color=Color.from_hex("#ffffff"), width=0.68672)
add(1, 'label', Point(-28.5, 5.2, 0), text='b)')
add(1, 'polyline', Polyline([(-22, 5.8, 0), (-22, -9, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6844)
add(1, 'segment', Line((-22, -1, 0), (-28.0622, -4.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.263923)
add(1, 'segment', Line((-22, -1, 0), (-15.9378, -4.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.263923)
add(1, 'arrow', Line((-22, -1, 0), (-22, -8, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(1, 'label', Point(-20.5, -4.5, 0), color=Color.from_hex("#3f9c20"), text='F')
add(1, 'point', Point(-22, -1, 0), color=Color.from_hex("#ffffff"), width=0.68672)
add(1, 'label', Point(-12.5, 5.2, 0), text='c)')
add(1, 'polyline', Polyline([(-6, 5.8, 0), (-6, -9, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6844)
add(1, 'segment', Line((-6, -1, 0), (-12.0622, 2.5, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(1, 'segment', Line((-6, -1, 0), (1, -1, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(1, 'arrow', Line((-6, -1, 0), (-6, -8, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(1, 'label', Point(-4.5, -4.5, 0), color=Color.from_hex("#3f9c20"), text='F')
add(1, 'point', Point(-6, -1, 0), color=Color.from_hex("#ffffff"), width=0.68672)
add(1, 'label', Point(-44.5, -12.8, 0), text='d)')
add(1, 'polyline', Polyline([(-38, -12.2, 0), (-38, -27, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6844)
add(1, 'segment', Line((-38, -19, 0), (-31.9378, -15.5, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(1, 'segment', Line((-38, -19, 0), (-31.9378, -22.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.263923)
add(1, 'arrow', Line((-38, -19, 0), (-38, -26, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(1, 'label', Point(-36.5, -22.5, 0), color=Color.from_hex("#3f9c20"), text='F')
add(1, 'point', Point(-38, -19, 0), color=Color.from_hex("#ffffff"), width=0.68672)
add(1, 'label', Point(-28.5, -12.8, 0), text='e)')
add(1, 'polyline', Polyline([(-22, -12.2, 0), (-22, -27, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6844)
add(1, 'segment', Line((-22, -19, 0), (-15, -19, 0)), color=Color.from_hex("#b9b9bd"), width=0.263923)
add(1, 'segment', Line((-22, -19, 0), (-29, -19, 0)), color=Color.from_hex("#b9b9bd"), width=0.263923)
add(1, 'arrow', Line((-22, -19, 0), (-22, -26, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(1, 'label', Point(-20.5, -22.5, 0), color=Color.from_hex("#3f9c20"), text='F')
add(1, 'point', Point(-22, -19, 0), color=Color.from_hex("#ffffff"), width=0.68672)
add(1, 'label', Point(-12.5, -12.8, 0), text='f)')
add(1, 'polyline', Polyline([(-6, -12.2, 0), (-6, -27, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.6844)
add(1, 'segment', Line((-6, -19, 0), (0.062178, -15.5, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(1, 'segment', Line((-6, -19, 0), (0.062178, -22.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.263923)
add(1, 'arrow', Line((-6, -12, 0), (-6, -19, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(1, 'label', Point(-4.5, -15.5, 0), color=Color.from_hex("#3f9c20"), text='F')
add(1, 'point', Point(-6, -19, 0), color=Color.from_hex("#ffffff"), width=0.68672)

# step 2 — a) and b) — the load between the members
add(2, 'label', Point(5.5, 10.2, 0), text='a)')
add(2, 'polygon', Polygon([(-37.8477, -0.736295, 0), (-38.1523, -1.26371, 0), (-44.2144, 2.2363, 0), (-43.9099, 2.7637, 0)]), color=Color.from_hex("#f0bcdb"))
add(2, 'polygon', Polygon([(-37.8477, -1.26371, 0), (-38.1523, -0.736295, 0), (-32.0901, 2.7637, 0), (-31.7856, 2.2363, 0)]), color=Color.from_hex("#f0bcdb"))
add(2, 'arrow', Line((11, 9, 0), (11, -0.375, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(2, 'segment', Line((11, -0.375, 0), (2.88101, 4.3125, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(2, 'segment', Line((2.88101, 4.3125, 0), (11, 9, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(2, 'label', Point(6.94051, 0.36875, 0), color=Color.from_hex("#ce4095"), text='30')
add(2, 'label', Point(6.94051, 8.25625, 0), color=Color.from_hex("#ce4095"), text='30')
add(2, 'label', Point(28.5, 10.2, 0), text='b)')
add(2, 'polygon', Polygon([(-22.1522, -0.736295, 0), (-21.8478, -1.26371, 0), (-27.9099, -4.7637, 0), (-28.2144, -4.2363, 0)]), color=Color.from_hex("#bdbfe8"))
add(2, 'polygon', Polygon([(-22.1522, -1.26371, 0), (-21.8478, -0.736295, 0), (-15.7856, -4.2363, 0), (-16.0901, -4.7637, 0)]), color=Color.from_hex("#bdbfe8"))
add(2, 'arrow', Line((34, 9, 0), (34, -0.375, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(2, 'segment', Line((34, -0.375, 0), (42.119, 4.3125, 0)), color=Color.from_hex("#1a1eb2"), width=0.263923)
add(2, 'segment', Line((42.119, 4.3125, 0), (34, 9, 0)), color=Color.from_hex("#1a1eb2"), width=0.263923)
add(2, 'label', Point(38.0595, 0.36875, 0), color=Color.from_hex("#1a1eb2"), text='30')
add(2, 'label', Point(38.0595, 8.25625, 0), color=Color.from_hex("#1a1eb2"), text='30')

# step 3 — c) — one inclined, one horizontal
add(3, 'label', Point(51.5, 10.2, 0), text='c)')
add(3, 'polygon', Polygon([(-5.6955, -0.472591, 0), (-6.3045, -1.52741, 0), (-12.3667, 1.97259, 0), (-11.7577, 3.02741, 0)]), color=Color.from_hex("#f0bcdb"))
add(3, 'polygon', Polygon([(-6, -1.52741, 0), (-6, -0.472591, 0), (1, -0.472591, 0), (1, -1.52741, 0)]), color=Color.from_hex("#f0bcdb"))
add(3, 'arrow', Line((57, 9, 0), (57, -0.375, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(3, 'segment', Line((57, -0.375, 0), (40.762, 9, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(3, 'segment', Line((40.762, 9, 0), (57, 9, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(3, 'label', Point(48.881, 2.7125, 0), color=Color.from_hex("#ce4095"), text='60')
add(3, 'label', Point(48.881, 10.6, 0), color=Color.from_hex("#ce4095"), text='52')

# step 4 — d) — both members on one side
add(4, 'label', Point(5.5, -10.8, 0), text='d)')
add(4, 'polygon', Polygon([(-37.8477, -19.2637, 0), (-38.1523, -18.7363, 0), (-32.0901, -15.2363, 0), (-31.7856, -15.7637, 0)]), color=Color.from_hex("#f0bcdb"))
add(4, 'polygon', Polygon([(-38.1523, -19.2637, 0), (-37.8477, -18.7363, 0), (-31.7856, -22.2363, 0), (-32.0901, -22.7637, 0)]), color=Color.from_hex("#bdbfe8"))
add(4, 'arrow', Line((11, -12, 0), (11, -21.375, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(4, 'segment', Line((11, -21.375, 0), (19.119, -16.6875, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(4, 'segment', Line((19.119, -16.6875, 0), (11, -12, 0)), color=Color.from_hex("#1a1eb2"), width=0.263923)
add(4, 'label', Point(15.0595, -20.6313, 0), color=Color.from_hex("#ce4095"), text='30')
add(4, 'label', Point(15.0595, -12.7438, 0), color=Color.from_hex("#1a1eb2"), text='30')

# step 5 — e) — no solution
add(5, 'label', Point(28.5, -10.8, 0), text='e)')
add(5, 'polygon', Polygon([(-22, -19.0001, 0), (-22, -18.9999, 0), (-15, -18.9999, 0), (-15, -19.0001, 0)]), color=Color.from_hex("#e4e4e7"))
add(5, 'polygon', Polygon([(-22, -18.9999, 0), (-22, -19.0001, 0), (-29, -19.0001, 0), (-29, -18.9999, 0)]), color=Color.from_hex("#e4e4e7"))
add(5, 'arrow', Line((34, -12, 0), (34, -21.375, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(5, 'segment', Line((34, -21.375, 0), (39, -21.375, 0)), color=Color.from_hex("#b9b9bd"), width=0.263923)
add(5, 'segment', Line((34, -12, 0), (29, -12, 0)), color=Color.from_hex("#b9b9bd"), width=0.263923)
add(5, 'label', Point(34.5, -23.1875, 0), color=Color.from_hex("#b9b9bd"), text='the polygon cannot close')
add(5, 'polyline', Polyline([(34, -12, 0), (34, -21.375, 0)]), color=Color.from_hex("#b9b9bd"), dash=0.6844)

# step 6 — f) — the same as d)
add(6, 'label', Point(51.5, -10.8, 0), text='f)')
add(6, 'polygon', Polygon([(-5.84775, -19.2637, 0), (-6.15225, -18.7363, 0), (-0.090072, -15.2363, 0), (0.214428, -15.7637, 0)]), color=Color.from_hex("#f0bcdb"))
add(6, 'polygon', Polygon([(-6.15225, -19.2637, 0), (-5.84775, -18.7363, 0), (0.214428, -22.2363, 0), (-0.090072, -22.7637, 0)]), color=Color.from_hex("#bdbfe8"))
add(6, 'arrow', Line((57, -12, 0), (57, -21.375, 0)), color=Color.from_hex("#3f9c20"), width=0.228845, head=(0.739987, 0.317376))
add(6, 'segment', Line((57, -21.375, 0), (65.119, -16.6875, 0)), color=Color.from_hex("#ce4095"), width=0.263923)
add(6, 'segment', Line((65.119, -16.6875, 0), (57, -12, 0)), color=Color.from_hex("#1a1eb2"), width=0.263923)
add(6, 'label', Point(61.0595, -20.6313, 0), color=Color.from_hex("#ce4095"), text='30')
add(6, 'label', Point(61.0595, -12.7438, 0), color=Color.from_hex("#1a1eb2"), text='30')


if __name__ == "__main__":
    print("EX 1.4 — Single node equilibrium —", len(ops), "operations")
