"""EX 9.4 — ten loads and nowhere to put them

Auto-generated from ops/ex9_4.json — the drawing as literal COMPAS
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
add(0, 'label', Point(7.625, 8, 0), text='floor plan 1:100 — the existing pavilion and the new beam grid')
add(0, 'label', Point(13.8, -13.3, 0), text='Views beams 1:100 — a transverse beam, 9.00 m × 2.00 m')
add(0, 'label', Point(22, 6, 0), text='Kräfteplan — force diagram')

# step 1 — What exists
add(1, 'segment', Line((2, 6, 0), (13.25, 6, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'segment', Line((13.25, 6, 0), (13.25, -9, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'segment', Line((13.25, -9, 0), (2, -9, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'segment', Line((2, -9, 0), (2, 6, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'polyline', Polyline([(2, 6, 0), (2, -9, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'polyline', Polyline([(5.75, 6, 0), (5.75, -9, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'polyline', Polyline([(9.5, 6, 0), (9.5, -9, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'polyline', Polyline([(13.25, 6, 0), (13.25, -9, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'polyline', Polyline([(2, 6, 0), (13.25, 6, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'polyline', Polyline([(2, 2.25, 0), (13.25, 2.25, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'polyline', Polyline([(2, -1.5, 0), (13.25, -1.5, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'polyline', Polyline([(2, -5.25, 0), (13.25, -5.25, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'polyline', Polyline([(2, -9, 0), (13.25, -9, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'polygon', Polygon([(1.875, -5.25, 0), (1.875, -9, 0), (2.125, -9, 0), (2.125, -5.25, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(2, -9.125, 0), (5.75, -9.125, 0), (5.75, -8.875, 0), (2, -8.875, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(13.125, 2.25, 0), (13.125, -5.25, 0), (13.375, -5.25, 0), (13.375, 2.25, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(1.875, 6.125, 0), (2.125, 6.125, 0), (2.125, 5.875, 0), (1.875, 5.875, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(13.125, 6.125, 0), (13.375, 6.125, 0), (13.375, 5.875, 0), (13.125, 5.875, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(13.125, -8.875, 0), (13.375, -8.875, 0), (13.375, -9.125, 0), (13.125, -9.125, 0)]), color=Color.from_hex("#111111"))
add(1, 'label', Point(7.625, -10.0625, 0), color=Color.from_hex("#aaaaaa"), text='solid black = existing walls and columns · outlined = the new beam grid')

# step 2 — The ten loads
add(2, 'point', Point(5.75, 6, 0), color=Color.from_hex("#3f9c20"), width=0.256928)
add(2, 'point', Point(5.75, 2.25, 0), color=Color.from_hex("#3f9c20"), width=0.256928)
add(2, 'point', Point(5.75, -1.5, 0), color=Color.from_hex("#3f9c20"), width=0.256928)
add(2, 'point', Point(5.75, -5.25, 0), color=Color.from_hex("#3f9c20"), width=0.256928)
add(2, 'point', Point(5.75, -9, 0), color=Color.from_hex("#3f9c20"), width=0.256928)
add(2, 'point', Point(9.5, 6, 0), color=Color.from_hex("#3f9c20"), width=0.256928)
add(2, 'point', Point(9.5, 2.25, 0), color=Color.from_hex("#3f9c20"), width=0.256928)
add(2, 'point', Point(9.5, -1.5, 0), color=Color.from_hex("#3f9c20"), width=0.256928)
add(2, 'point', Point(9.5, -5.25, 0), color=Color.from_hex("#3f9c20"), width=0.256928)
add(2, 'point', Point(9.5, -9, 0), color=Color.from_hex("#3f9c20"), width=0.256928)
add(2, 'label', Point(10.25, 4.125, 0), color=Color.from_hex("#3f9c20"), text='10 × F = 200.0 kN')

# step 4 — Five beams across
add(4, 'polygon', Polygon([(2, 5.75, 0), (13.25, 5.75, 0), (13.25, 6.25, 0), (2, 6.25, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.3)
add(4, 'segment', Line((2, 5.75, 0), (13.25, 5.75, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(4, 'segment', Line((13.25, 5.75, 0), (13.25, 6.25, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(4, 'segment', Line((13.25, 6.25, 0), (2, 6.25, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(4, 'segment', Line((2, 6.25, 0), (2, 5.75, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(4, 'label', Point(7.625, 5.05, 0), color=Color.from_hex("#3f9c20"), text='9.00 m')
add(4, 'polygon', Polygon([(2, 2, 0), (13.25, 2, 0), (13.25, 2.5, 0), (2, 2.5, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.3)
add(4, 'segment', Line((2, 2, 0), (13.25, 2, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(4, 'segment', Line((13.25, 2, 0), (13.25, 2.5, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(4, 'segment', Line((13.25, 2.5, 0), (2, 2.5, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(4, 'segment', Line((2, 2.5, 0), (2, 2, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(4, 'polygon', Polygon([(2, -1.75, 0), (13.25, -1.75, 0), (13.25, -1.25, 0), (2, -1.25, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.3)
add(4, 'segment', Line((2, -1.75, 0), (13.25, -1.75, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(4, 'segment', Line((13.25, -1.75, 0), (13.25, -1.25, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(4, 'segment', Line((13.25, -1.25, 0), (2, -1.25, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(4, 'segment', Line((2, -1.25, 0), (2, -1.75, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(4, 'polygon', Polygon([(2, -5.5, 0), (13.25, -5.5, 0), (13.25, -5, 0), (2, -5, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.3)
add(4, 'segment', Line((2, -5.5, 0), (13.25, -5.5, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(4, 'segment', Line((13.25, -5.5, 0), (13.25, -5, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(4, 'segment', Line((13.25, -5, 0), (2, -5, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(4, 'segment', Line((2, -5, 0), (2, -5.5, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(4, 'polygon', Polygon([(2, -9.25, 0), (13.25, -9.25, 0), (13.25, -8.75, 0), (2, -8.75, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.3)
add(4, 'segment', Line((2, -9.25, 0), (13.25, -9.25, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(4, 'segment', Line((13.25, -9.25, 0), (13.25, -8.75, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(4, 'segment', Line((13.25, -8.75, 0), (2, -8.75, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(4, 'segment', Line((2, -8.75, 0), (2, -9.25, 0)), color=Color.from_hex("#111111"), width=0.06048)

# step 5 — And one spine for the other two
add(5, 'polygon', Polygon([(1.75, 6, 0), (1.75, -5.25, 0), (2.25, -5.25, 0), (2.25, 6, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.3)
add(5, 'segment', Line((1.75, 6, 0), (1.75, -5.25, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(5, 'segment', Line((1.75, -5.25, 0), (2.25, -5.25, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(5, 'segment', Line((2.25, -5.25, 0), (2.25, 6, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(5, 'segment', Line((2.25, 6, 0), (1.75, 6, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(5, 'label', Point(4.9, 1.475, 0), color=Color.from_hex("#3f9c20"), text='9.00 m')
add(5, 'point', Point(2, 6, 0), color=Color.from_hex("#ffffff"), width=0.33152)
add(5, 'label', Point(-0.6, 6.9, 0), color=Color.from_hex("#3f9c20"), text='2.00 F')
add(5, 'point', Point(13.25, 6, 0), color=Color.from_hex("#ffffff"), width=0.33152)
add(5, 'label', Point(15.85, 6.9, 0), color=Color.from_hex("#3f9c20"), text='1.00 F')
add(5, 'point', Point(13.25, -9, 0), color=Color.from_hex("#ffffff"), width=0.33152)
add(5, 'label', Point(15.85, -8.1, 0), color=Color.from_hex("#3f9c20"), text='1.00 F')
add(5, 'point', Point(13.25, -1.5, 0), color=Color.from_hex("#ffffff"), width=0.33152)
add(5, 'label', Point(15.85, -0.6, 0), color=Color.from_hex("#3f9c20"), text='3.00 F')
add(5, 'point', Point(2, -5.25, 0), color=Color.from_hex("#ffffff"), width=0.33152)
add(5, 'label', Point(-0.6, -4.35, 0), color=Color.from_hex("#3f9c20"), text='2.00 F')
add(5, 'point', Point(2, -9, 0), color=Color.from_hex("#ffffff"), width=0.33152)
add(5, 'label', Point(-0.6, -8.1, 0), color=Color.from_hex("#3f9c20"), text='1.00 F')
add(5, 'label', Point(12.125, -11.3, 0), color=Color.from_hex("#111111"), text='Σ = 10.00 F = 200.0 kN ✓ · longest beam 9.00 m ≤ 9 m ✓')

# step 6 — The force flow in one beam
add(6, 'segment', Line((5, -18, 0), (17.6, -18, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'segment', Line((17.6, -18, 0), (17.6, -15.2, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'segment', Line((17.6, -15.2, 0), (5, -15.2, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'segment', Line((5, -15.2, 0), (5, -18, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'point', Point(5, -18, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(6, 'segment', Line((4.1, -18.45, 0), (3.49896, -17.849, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((4.7, -18.45, 0), (4.09896, -17.849, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((5.3, -18.45, 0), (4.69896, -17.849, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((5.9, -18.45, 0), (5.29896, -17.849, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((6.5, -18.45, 0), (5.89896, -17.849, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'arrow', Line((5, -21.4, 0), (5, -18.9, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'label', Point(2, -20.4, 0), color=Color.from_hex("#3f9c20"), text='20.00')
add(6, 'point', Point(17.6, -18, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(6, 'segment', Line((16.7, -18.45, 0), (16.099, -17.849, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((17.3, -18.45, 0), (16.699, -17.849, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((17.9, -18.45, 0), (17.299, -17.849, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((18.5, -18.45, 0), (17.899, -17.849, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((19.1, -18.45, 0), (18.499, -17.849, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'arrow', Line((17.6, -21.4, 0), (17.6, -18.9, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'label', Point(20.6, -20.4, 0), color=Color.from_hex("#3f9c20"), text='20.00')
add(6, 'arrow', Line((9.2, -11.56, 0), (9.2, -14.99, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(6, 'label', Point(11.4, -12.54, 0), color=Color.from_hex("#3f9c20"), text='F = 20.0')
add(6, 'arrow', Line((13.4, -11.56, 0), (13.4, -14.99, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(6, 'label', Point(15.6, -12.54, 0), color=Color.from_hex("#3f9c20"), text='F = 20.0')
add(6, 'segment', Line((5, -18, 0), (9.2, -15.2, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'label', Point(7.1, -15.5, 0), color=Color.from_hex("#1a1eb2"), text='36.06')
add(6, 'segment', Line((9.2, -15.2, 0), (13.4, -15.2, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'label', Point(11.3, -14.1, 0), color=Color.from_hex("#1a1eb2"), text='30.00')
add(6, 'segment', Line((13.4, -15.2, 0), (17.6, -18, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'label', Point(15.5, -15.5, 0), color=Color.from_hex("#1a1eb2"), text='36.06')
add(6, 'segment', Line((5, -18, 0), (17.6, -18, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(6, 'label', Point(11.3, -19.61, 0), color=Color.from_hex("#ce4095"), text='tie 30.00 kN = 1.500 F, tension')
add(6, 'segment', Line((18.09, -18, 0), (18.09, -15.2, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'label', Point(20.39, -16.6, 0), color=Color.from_hex("#aaaaaa"), text='z = 2.00 m')

# step 7 — The force diagram
add(7, 'arrow', Line((25, 2, 0), (25, -2, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(7, 'arrow', Line((25, -2, 0), (25, -6, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(7, 'label', Point(27.6, -2, 0), color=Color.from_hex("#3f9c20"), text='load line 2F')
add(7, 'point', Point(19, -2, 0), color=Color.from_hex("#ffffff"), width=0.33152)
add(7, 'label', Point(17.7, -1.2, 0), text='o')
add(7, 'segment', Line((25, -2, 0), (19, -2, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(7, 'label', Point(22, -0.9, 0), color=Color.from_hex("#aaaaaa"), text='H = 1.500 F')
add(7, 'segment', Line((19, -2, 0), (25, 2, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((19, -2, 0), (25, -2, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((19, -2, 0), (25, -6, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)


if __name__ == "__main__":
    print("EX 9.4 — ten loads and nowhere to put them —", len(ops), "operations")
