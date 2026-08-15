"""EX X · 14 — three walls, and one of them does nothing

Auto-generated from ops/exX2_14.json — the drawing as literal COMPAS
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
add(0, 'label', Point(16.9981, 14.1962, 0), text='Grundriss 1:200 — arrows here at 1 unit ≙ 20 kN')
add(0, 'label', Point(14, -7, 0), text='Wandansichten 1:100 — panels 4.998 × 2.999 m, force in at 2.599 m')
add(0, 'label', Point(-14, 3.4, 0), text="Kräfteplan — the sheet's own 1 cm ≙ 10 kN (0.15 units/kN)")

# step 1 — The plan
add(1, 'segment', Line((11, 1, 0), (22.9962, 1, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((22.9962, 1, 0), (22.9962, 9.99625, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((22.9962, 9.99625, 0), (11, 9.99625, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((11, 9.99625, 0), (11, 1, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'polyline', Polyline([(11.3, 2.12425, 0), (17.4477, 2.12425, 0), (17.4477, 7.372, 0), (11.3, 7.372, 0), (11.3, 2.12425, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'polygon', Polygon([(11, 9.69625, 0), (14.7485, 9.69625, 0), (14.7485, 9.99625, 0), (11, 9.99625, 0)]), color=Color.from_hex("#111111"), opacity=0.9)
add(1, 'polygon', Polygon([(12.8742, 11.1212, 0), (12.6185, 10.4612, 0), (13.13, 10.4612, 0)]), color=Color.from_hex("#111111"))
add(1, 'label', Point(12.8742, 9.13375, 0), text='A')
add(1, 'polygon', Polygon([(17.7477, 3.6235, 0), (17.7477, 7.372, 0), (17.4477, 7.372, 0), (17.4477, 3.6235, 0)]), color=Color.from_hex("#111111"), opacity=0.9)
add(1, 'polygon', Polygon([(18.8727, 5.49775, 0), (18.2127, 5.7535, 0), (18.2127, 5.242, 0)]), color=Color.from_hex("#111111"))
add(1, 'label', Point(18.2727, 7.89775, 0), text='B')
add(1, 'polygon', Polygon([(11, 1, 0), (14.7485, 1, 0), (14.7485, 1.3, 0), (11, 1.3, 0)]), color=Color.from_hex("#111111"), opacity=0.9)
add(1, 'polygon', Polygon([(12.8742, -0.125, 0), (13.13, 0.535, 0), (12.6185, 0.535, 0)]), color=Color.from_hex("#111111"))
add(1, 'label', Point(12.8742, 1.8625, 0), text='C')

# step 2 — Draw the axes first
add(2, 'polyline', Polyline([(9.35, 9.84625, 0), (24.6462, 9.84625, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(2, 'polyline', Polyline([(17.5978, -0.65, 0), (17.5978, 11.6463, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(2, 'polyline', Polyline([(9.35, 1.15, 0), (24.6462, 1.15, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(2, 'point', Point(17.5978, 9.84625, 0), color=Color.from_hex("#ffffff"), width=0.3108)
add(2, 'point', Point(17.5978, 1.15, 0), color=Color.from_hex("#ffffff"), width=0.3108)
add(2, 'label', Point(16.9981, -2.4, 0), color=Color.from_hex("#aaaaaa"), text='2 distinct axis intersections → properly braced')

# step 3 — The load
add(3, 'polyline', Polyline([(8.75, 8.497, 0), (25.2462, 8.497, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(3, 'arrow', Line((6, 8.497, 0), (11, 8.497, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(3, 'label', Point(8.5, 9.797, 0), color=Color.from_hex("#3f9c20"), text='F = 100.0 kN')

# step 4 — Three equations, three walls
add(4, 'arrow', Line((17.0985, 11.1212, 0), (12.8742, 11.1212, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'label', Point(14.9864, 12.4213, 0), color=Color.from_hex("#3f9c20"), text='A = 84.48 kN')
add(4, 'arrow', Line((16.3227, 5.49775, 0), (16.3227, 5.49775, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'label', Point(19.1227, 5.49775, 0), color=Color.from_hex("#3f9c20"), text='B = 0.00 kN')
add(4, 'arrow', Line((13.65, -0.125, 0), (12.8742, -0.125, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'label', Point(13.2621, -1.425, 0), color=Color.from_hex("#3f9c20"), text='C = 15.52 kN')

# step 5 — The force diagram
add(5, 'arrow', Line((-21.5, -1, 0), (-6.5, -1, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(5, 'arrow', Line((-6.5, -3.2, 0), (-19.1727, -3.2, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((-19.1727, -5.4, 0), (-21.5, -5.4, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'label', Point(-14, 0.4, 0), color=Color.from_hex("#3f9c20"), text='F = 100.00')
add(5, 'label', Point(-12.8364, -4.6, 0), color=Color.from_hex("#3f9c20"), text='A = 84.48')
add(5, 'label', Point(-20.3364, -6.8, 0), color=Color.from_hex("#3f9c20"), text='C = 15.52')
add(5, 'label', Point(-14, -8.4, 0), color=Color.from_hex("#b9b9bd"), text='B = 0.00 kN — a point, not a line')

# step 6 — Inside walls A and C
add(6, 'segment', Line((3.6, -15.6, 0), (11.097, -15.6, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'segment', Line((11.097, -15.6, 0), (11.097, -11.1015, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'segment', Line((11.097, -11.1015, 0), (3.6, -11.1015, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'segment', Line((3.6, -11.1015, 0), (3.6, -15.6, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'polygon', Polygon([(3.6, -11.7015, 0), (11.097, -11.7015, 0), (11.097, -11.1015, 0), (3.6, -11.1015, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.35)
add(6, 'segment', Line((3.24, -16.1, 0), (2.70967, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((3.68, -16.1, 0), (3.14967, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((4.12, -16.1, 0), (3.58967, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((4.56, -16.1, 0), (4.02967, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((5, -16.1, 0), (4.46967, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((10.137, -16.1, 0), (9.60667, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((10.577, -16.1, 0), (10.0467, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((11.017, -16.1, 0), (10.4867, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((11.457, -16.1, 0), (10.9267, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((11.897, -16.1, 0), (11.3667, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'arrow', Line((-0.624235, -11.1015, 0), (3.6, -11.1015, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'label', Point(1.48788, -10.1015, 0), color=Color.from_hex("#3f9c20"), text='84.48 kN')
add(6, 'arrow', Line((3.9, -19.0877, 0), (3.9, -16.7, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'arrow', Line((10.797, -16.7, 0), (10.797, -19.0877, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'label', Point(7.3485, -20.3877, 0), color=Color.from_hex("#3f9c20"), text='base couple ±47.75 kN')
add(6, 'label', Point(7.3485, -9.7015, 0), text='wall A — braced frame')
add(6, 'segment', Line((12.6, -15.6, 0), (20.097, -15.6, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'segment', Line((20.097, -15.6, 0), (20.097, -11.1015, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'segment', Line((20.097, -11.1015, 0), (12.6, -11.1015, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'segment', Line((12.6, -11.1015, 0), (12.6, -15.6, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'polygon', Polygon([(12.6, -11.7015, 0), (20.097, -11.7015, 0), (20.097, -11.1015, 0), (12.6, -11.1015, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.35)
add(6, 'segment', Line((12.24, -16.1, 0), (11.7097, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((12.68, -16.1, 0), (12.1497, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((13.12, -16.1, 0), (12.5897, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((13.56, -16.1, 0), (13.0297, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((14, -16.1, 0), (13.4697, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((19.137, -16.1, 0), (18.6067, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((19.577, -16.1, 0), (19.0467, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((20.017, -16.1, 0), (19.4867, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((20.457, -16.1, 0), (19.9267, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((20.897, -16.1, 0), (20.3667, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'arrow', Line((12.6, -11.2515, 0), (12.6, -11.2515, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'label', Point(12.6, -10.1015, 0), color=Color.from_hex("#3f9c20"), text='0.00 kN')
add(6, 'arrow', Line((16.3485, -15.6, 0), (16.3485, -15.6, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'arrow', Line((16.3485, -15.6, 0), (16.3485, -15.6, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'label', Point(16.3485, -18, 0), color=Color.from_hex("#3f9c20"), text='no base couple')
add(6, 'label', Point(16.3485, -9.7015, 0), text='wall B — arch')
add(6, 'segment', Line((21.6, -15.6, 0), (29.097, -15.6, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'segment', Line((29.097, -15.6, 0), (29.097, -11.1015, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'segment', Line((29.097, -11.1015, 0), (21.6, -11.1015, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'segment', Line((21.6, -11.1015, 0), (21.6, -15.6, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'polygon', Polygon([(21.6, -11.7015, 0), (29.097, -11.7015, 0), (29.097, -11.1015, 0), (21.6, -11.1015, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.35)
add(6, 'segment', Line((21.24, -16.1, 0), (20.7097, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((21.68, -16.1, 0), (21.1497, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((22.12, -16.1, 0), (21.5897, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((22.56, -16.1, 0), (22.0297, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((23, -16.1, 0), (22.4697, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((28.137, -16.1, 0), (27.6067, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((28.577, -16.1, 0), (28.0467, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((29.017, -16.1, 0), (28.4867, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((29.457, -16.1, 0), (28.9267, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'segment', Line((29.897, -16.1, 0), (29.3667, -15.5697, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'arrow', Line((20.8242, -11.1015, 0), (21.6, -11.1015, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'label', Point(21.2121, -10.1015, 0), color=Color.from_hex("#3f9c20"), text='15.52 kN')
add(6, 'arrow', Line((21.9, -17.1385, 0), (21.9, -16.7, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'arrow', Line((28.797, -16.7, 0), (28.797, -17.1385, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'label', Point(25.3485, -18.4385, 0), color=Color.from_hex("#3f9c20"), text='base couple ±8.77 kN')
add(6, 'label', Point(25.3485, -9.7015, 0), text='wall C — panel with a hole')
add(6, 'segment', Line((3.9, -15.6, 0), (10.305, -11.7015, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(6, 'segment', Line((10.797, -15.6, 0), (10.797, -11.7015, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'label', Point(4.9025, -12.6508, 0), color=Color.from_hex("#ce4095"), text='98.9')
add(6, 'label', Point(8.597, -13.6508, 0), color=Color.from_hex("#1a1eb2"), text='51.4')
add(6, 'segment', Line((13.2, -15.6, 0), (13.8297, -14.2505, 0)), color=Color.from_hex("#b9b9bd"), width=0.127411)
add(6, 'segment', Line((13.8297, -14.2505, 0), (14.4594, -13.201, 0)), color=Color.from_hex("#b9b9bd"), width=0.127411)
add(6, 'segment', Line((14.4594, -13.201, 0), (15.0891, -12.4513, 0)), color=Color.from_hex("#b9b9bd"), width=0.127411)
add(6, 'segment', Line((15.0891, -12.4513, 0), (15.7188, -12.0014, 0)), color=Color.from_hex("#b9b9bd"), width=0.127411)
add(6, 'segment', Line((15.7188, -12.0014, 0), (16.3485, -11.8515, 0)), color=Color.from_hex("#b9b9bd"), width=0.127411)
add(6, 'segment', Line((16.3485, -11.8515, 0), (16.9782, -12.0014, 0)), color=Color.from_hex("#b9b9bd"), width=0.127411)
add(6, 'segment', Line((16.9782, -12.0014, 0), (17.6079, -12.4513, 0)), color=Color.from_hex("#b9b9bd"), width=0.127411)
add(6, 'segment', Line((17.6079, -12.4513, 0), (18.2376, -13.201, 0)), color=Color.from_hex("#b9b9bd"), width=0.127411)
add(6, 'segment', Line((18.2376, -13.201, 0), (18.8673, -14.2505, 0)), color=Color.from_hex("#b9b9bd"), width=0.127411)
add(6, 'segment', Line((18.8673, -14.2505, 0), (19.497, -15.6, 0)), color=Color.from_hex("#b9b9bd"), width=0.127411)
add(6, 'circle', Circle(1.19962, frame=Frame((25.3485, -13.5, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#111111"))
add(6, 'segment', Line((21.9, -11.7015, 0), (25.3485, -11.8804, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'segment', Line((25.3485, -11.8804, 0), (28.797, -15.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'segment', Line((21.9, -15.6, 0), (28.797, -15.6, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(6, 'segment', Line((21.9, -15.6, 0), (21.9, -11.7015, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(6, 'label', Point(27.9735, -14.9554, 0), color=Color.from_hex("#aaaaaa"), text='over the hole')

# step 7 — And wall B does nothing
add(7, 'label', Point(16.3485, -14.775, 0), color=Color.from_hex("#b9b9bd"), text='0 — every member')


if __name__ == "__main__":
    print("EX X · 14 — three walls, and one of them does nothing —", len(ops), "operations")
