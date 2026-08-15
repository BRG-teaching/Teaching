"""EX X · 15 — one wall takes the force, two more take the twist

Auto-generated from ops/exX2_15.json — the drawing as literal COMPAS
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
add(0, 'label', Point(14, -5.6, 0), text='Wandansichten 1:100 — the arrows are symbols, the numbers exact')
add(0, 'label', Point(-14, 3.1, 0), text='Kräfteplan — this page says 1 cm ≙ 20 kN')

# step 1 — The plan
add(1, 'segment', Line((11, 1, 0), (22.9962, 1, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((22.9962, 1, 0), (22.9962, 9.99625, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((22.9962, 9.99625, 0), (11, 9.99625, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((11, 9.99625, 0), (11, 1, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'polygon', Polygon([(17.1485, 1, 0), (17.1485, 4.7485, 0), (16.8485, 4.7485, 0), (16.8485, 1, 0)]), color=Color.from_hex("#111111"), opacity=0.9)
add(1, 'polygon', Polygon([(18.2735, 2.87425, 0), (17.6135, 3.13, 0), (17.6135, 2.6185, 0)]), color=Color.from_hex("#111111"))
add(1, 'label', Point(16.286, 2.87425, 0), text='A')
add(1, 'polygon', Polygon([(19.247, 9.69625, 0), (22.9962, 9.69625, 0), (22.9962, 9.99625, 0), (19.247, 9.99625, 0)]), color=Color.from_hex("#111111"), opacity=0.9)
add(1, 'polygon', Polygon([(21.1216, 8.57125, 0), (21.3774, 9.23125, 0), (20.8659, 9.23125, 0)]), color=Color.from_hex("#111111"))
add(1, 'label', Point(21.1216, 9.13375, 0), text='B')
add(1, 'polygon', Polygon([(22.9962, 1, 0), (22.9962, 4.7485, 0), (22.6962, 4.7485, 0), (22.6962, 1, 0)]), color=Color.from_hex("#111111"), opacity=0.9)
add(1, 'polygon', Polygon([(21.5712, 2.87425, 0), (22.2312, 2.6185, 0), (22.2312, 3.13, 0)]), color=Color.from_hex("#111111"))
add(1, 'label', Point(23.5587, 2.87425, 0), text='C')

# step 2 — The axes, and whether it stands up
add(2, 'polyline', Polyline([(16.9985, -0.65, 0), (16.9985, 11.6463, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(2, 'polyline', Polyline([(9.35, 9.84625, 0), (24.6462, 9.84625, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(2, 'polyline', Polyline([(22.8463, -0.65, 0), (22.8463, 11.6463, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(2, 'point', Point(16.9985, 9.84625, 0), color=Color.from_hex("#ffffff"), width=0.3108)
add(2, 'point', Point(22.8463, 9.84625, 0), color=Color.from_hex("#ffffff"), width=0.3108)
add(2, 'label', Point(16.9981, -2.4, 0), color=Color.from_hex("#aaaaaa"), text='2 distinct axis intersections → properly braced')

# step 3 — The load
add(3, 'polyline', Polyline([(8.75, 5.49775, 0), (25.2462, 5.49775, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(3, 'arrow', Line((6, 5.49775, 0), (11, 5.49775, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(3, 'label', Point(8.5, 6.79775, 0), color=Color.from_hex("#3f9c20"), text='F = 100.0 kN')
add(3, 'segment', Line((9.95, 5.49775, 0), (9.95, 9.84625, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(3, 'label', Point(6.95, 7.672, 0), color=Color.from_hex("#aaaaaa"), text='5.798 m')

# step 4 — One force, then one couple
add(4, 'arrow', Line((15.7235, -0.843847, 0), (15.7235, 2.87425, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'label', Point(12.5235, 0.115202, 0), color=Color.from_hex("#3f9c20"), text='A = 74.36 kN')
add(4, 'arrow', Line((26.1216, 11.1212, 0), (21.1216, 11.1212, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'label', Point(23.6216, 12.4213, 0), color=Color.from_hex("#3f9c20"), text='B = 100.00 kN')
add(4, 'arrow', Line((24.1212, 6.59235, 0), (24.1212, 2.87425, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'label', Point(27.3212, 4.7333, 0), color=Color.from_hex("#3f9c20"), text='C = 74.36 kN')

# step 5 — The force diagram is a rectangle
add(5, 'arrow', Line((-17.75, -3.38857, 0), (-10.25, -3.38857, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'label', Point(-14, -1.88857, 0), color=Color.from_hex("#3f9c20"), text='F = 100.00')
add(5, 'arrow', Line((-10.25, -3.38857, 0), (-10.25, 2.18857, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'label', Point(-7.35, -0.6, 0), color=Color.from_hex("#3f9c20"), text='A = 74.36')
add(5, 'arrow', Line((-10.25, 2.18857, 0), (-17.75, 2.18857, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'label', Point(-14, 0.688573, 0), color=Color.from_hex("#3f9c20"), text='B = 100.00')
add(5, 'arrow', Line((-17.75, 2.18857, 0), (-17.75, -3.38857, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'label', Point(-20.65, -0.6, 0), color=Color.from_hex("#3f9c20"), text='C = 74.36')
add(5, 'label', Point(-14, -6.58857, 0), color=Color.from_hex("#aaaaaa"), text='it closes as a rectangle — and would close just as well if A and C were wrong')

# step 6 — Inside the three walls
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
add(6, 'point', Point(3.9, -15.6, 0), color=Color.from_hex("#ffffff"), width=0.29008)
add(6, 'arrow', Line((1.2, -11.0015, 0), (3.6, -11.0015, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'label', Point(2.4, -9.9015, 0), color=Color.from_hex("#3f9c20"), text='74.36 kN')
add(6, 'arrow', Line((3.9, -18.5, 0), (3.9, -16.7, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'arrow', Line((10.797, -16.7, 0), (10.797, -18.5, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'label', Point(7.3485, -19.8, 0), color=Color.from_hex("#3f9c20"), text='base couple ±42.03 kN')
add(6, 'label', Point(7.3485, -8.1015, 0), text='wall A — plain panel')
add(6, 'segment', Line((3.9, -11.7015, 0), (7.3485, -13.6508, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'segment', Line((7.3485, -13.6508, 0), (10.797, -15.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'segment', Line((3.9, -15.6, 0), (10.797, -15.6, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(6, 'segment', Line((3.9, -15.6, 0), (3.9, -11.7015, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(6, 'label', Point(9.7485, -12.4507, 0), color=Color.from_hex("#1a1eb2"), text='85.4')
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
add(6, 'point', Point(12.9, -15.6, 0), color=Color.from_hex("#ffffff"), width=0.29008)
add(6, 'arrow', Line((10.2, -11.0015, 0), (12.6, -11.0015, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'label', Point(11.4, -9.9015, 0), color=Color.from_hex("#3f9c20"), text='100.00 kN')
add(6, 'arrow', Line((12.9, -18.5, 0), (12.9, -16.7, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'arrow', Line((19.797, -16.7, 0), (19.797, -18.5, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'label', Point(16.3485, -19.8, 0), color=Color.from_hex("#3f9c20"), text='base couple ±56.52 kN')
add(6, 'label', Point(16.3485, -8.1015, 0), text='wall B — door opening')
add(6, 'segment', Line((12.9, -11.7015, 0), (16.3486, -12.7515, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'segment', Line((16.3486, -12.7515, 0), (19.797, -15.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'segment', Line((12.9, -15.6, 0), (19.797, -15.6, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(6, 'segment', Line((12.9, -15.6, 0), (12.9, -11.7015, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(6, 'label', Point(18.7487, -11.5515, 0), color=Color.from_hex("#1a1eb2"), text='over the door')
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
add(6, 'point', Point(28.797, -15.6, 0), color=Color.from_hex("#ffffff"), width=0.29008)
add(6, 'arrow', Line((19.2, -11.0015, 0), (21.6, -11.0015, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'label', Point(20.4, -9.9015, 0), color=Color.from_hex("#3f9c20"), text='74.36 kN')
add(6, 'arrow', Line((21.9, -18.5, 0), (21.9, -16.7, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'arrow', Line((28.797, -16.7, 0), (28.797, -18.5, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'label', Point(25.3485, -19.8, 0), color=Color.from_hex("#3f9c20"), text='base couple ±42.03 kN')
add(6, 'label', Point(25.3485, -8.1015, 0), text='wall C — X-braced')
add(6, 'segment', Line((21.9, -15.6, 0), (28.797, -15.6, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(6, 'segment', Line((21.6, -15.6, 0), (21.6, -15.6, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(6, 'segment', Line((14.6992, -15.6, 0), (14.6992, -13.2015, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'segment', Line((14.6992, -13.2015, 0), (17.998, -13.2015, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'segment', Line((17.998, -13.2015, 0), (17.998, -15.6, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'segment', Line((22.6389, -15.1088, 0), (27.9903, -11.8516, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(6, 'segment', Line((22.6389, -11.8516, 0), (27.9903, -15.1088, 0)), color=Color.from_hex("#b9b9bd"), width=0.127411)
add(6, 'segment', Line((22.6389, -15.1088, 0), (27.9903, -15.1088, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(6, 'segment', Line((27.9903, -15.1088, 0), (27.9903, -11.8516, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(6, 'segment', Line((27.9903, -11.8516, 0), (22.6389, -11.8516, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(6, 'segment', Line((22.6389, -11.8516, 0), (22.6389, -15.1088, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(6, 'label', Point(24.2139, -14.6587, 0), color=Color.from_hex("#ce4095"), text='87.1')
add(6, 'label', Point(24.2139, -12.3017, 0), color=Color.from_hex("#b9b9bd"), text='0 — slack')
add(6, 'label', Point(14, -21.2, 0), color=Color.from_hex("#e07a26"), text='E18: this panel’s supports are swapped — roller left, pin right')


if __name__ == "__main__":
    print("EX X · 15 — one wall takes the force, two more take the twist —", len(ops), "operations")
