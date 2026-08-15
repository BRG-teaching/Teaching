"""EX 8.5 — the frame that follows the loads

Auto-generated from ops/ex8_5.json — the drawing as literal COMPAS
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
add(0, 'label', Point(16, -16.2, 0), text='form diagram 1:100 · portal 12.00 m span, 0.50 m members')
add(0, 'label', Point(24.5, -5.2, 0), text='Kräfteplan — force diagram')
add(0, 'label', Point(20, 14.2, 0), text='c) will it fit on A4?')

# step 1 — What page 3 gives
add(1, 'segment', Line((4.8, -11.5, 0), (16.8, -11.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'segment', Line((5.34546, -11.5, 0), (4.77977, -10.9343, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((5.89091, -11.5, 0), (5.32522, -10.9343, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((6.43636, -11.5, 0), (5.87068, -10.9343, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((6.98182, -11.5, 0), (6.41613, -10.9343, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((7.52727, -11.5, 0), (6.96159, -10.9343, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((8.07273, -11.5, 0), (7.50704, -10.9343, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((8.61818, -11.5, 0), (8.0525, -10.9343, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((9.16364, -11.5, 0), (8.59795, -10.9343, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((9.70909, -11.5, 0), (9.1434, -10.9343, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((10.2545, -11.5, 0), (9.68886, -10.9343, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((10.8, -11.5, 0), (10.2343, -10.9343, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((11.3455, -11.5, 0), (10.7798, -10.9343, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((11.8909, -11.5, 0), (11.3252, -10.9343, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((12.4364, -11.5, 0), (11.8707, -10.9343, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((12.9818, -11.5, 0), (12.4161, -10.9343, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((13.5273, -11.5, 0), (12.9616, -10.9343, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((14.0727, -11.5, 0), (13.507, -10.9343, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((14.6182, -11.5, 0), (14.0525, -10.9343, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((15.1636, -11.5, 0), (14.598, -10.9343, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((15.7091, -11.5, 0), (15.1434, -10.9343, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((16.2545, -11.5, 0), (15.6889, -10.9343, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((16.8, -11.5, 0), (16.2343, -10.9343, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'polyline', Polyline([(6.8, -11.5, 0), (14.8, -11.5, 0), (14.8, -7.5, 0), (6.8, -7.5, 0), (6.8, -11.5, 0)]), color=Color.from_hex("#3f9c20"), dash=0.3304)
add(1, 'label', Point(10.8, -13.1, 0), color=Color.from_hex("#3f9c20"), text='10.00 × 5.000 m')

# step 2 — A frame around the room
add(2, 'polygon', Polygon([(5.8, -11.5, 0), (5.8, -8.9, 0), (5.8, -6.3, 0), (8.3, -6.3, 0), (10.8, -6.3, 0), (13.3, -6.3, 0), (15.8, -6.3, 0), (15.8, -8.9, 0), (15.8, -11.5, 0), (15.4, -11.5, 0), (15.4, -7.5, 0), (13.1, -7.1, 0), (10.8, -6.7, 0), (8.5, -7.1, 0), (6.2, -7.5, 0), (6.2, -11.5, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.11)
add(2, 'segment', Line((5.8, -11.5, 0), (5.8, -6.3, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(2, 'segment', Line((5.8, -6.3, 0), (10.8, -6.3, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(2, 'segment', Line((10.8, -6.3, 0), (15.8, -6.3, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(2, 'segment', Line((15.8, -6.3, 0), (15.8, -11.5, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(2, 'segment', Line((15.8, -11.5, 0), (15.4, -11.5, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(2, 'segment', Line((15.4, -11.5, 0), (15.4, -7.5, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(2, 'segment', Line((15.4, -7.5, 0), (10.8, -6.7, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(2, 'segment', Line((10.8, -6.7, 0), (6.2, -7.5, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(2, 'segment', Line((6.2, -7.5, 0), (6.2, -11.5, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(2, 'segment', Line((6.2, -11.5, 0), (5.8, -11.5, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(2, 'point', Point(6, -11.5, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(2, 'label', Point(4.3, -12.5, 0), text='A')
add(2, 'segment', Line((5.04, -11.95, 0), (4.4036, -11.3136, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(2, 'segment', Line((5.68, -11.95, 0), (5.0436, -11.3136, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(2, 'segment', Line((6.32, -11.95, 0), (5.6836, -11.3136, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(2, 'segment', Line((6.96, -11.95, 0), (6.3236, -11.3136, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(2, 'segment', Line((7.6, -11.95, 0), (6.9636, -11.3136, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(2, 'point', Point(15.6, -11.5, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(2, 'label', Point(17.3, -12.5, 0), text='B')
add(2, 'segment', Line((14.64, -11.95, 0), (14.0036, -11.3136, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(2, 'segment', Line((15.28, -11.95, 0), (14.6436, -11.3136, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(2, 'segment', Line((15.92, -11.95, 0), (15.2836, -11.3136, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(2, 'segment', Line((16.56, -11.95, 0), (15.9236, -11.3136, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(2, 'segment', Line((17.2, -11.95, 0), (16.5636, -11.3136, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(2, 'point', Point(10.8, -6.5, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(2, 'label', Point(9.3, -5.6, 0), text='C')

# step 3 — The loads, both through the crown
add(3, 'arrow', Line((10.8, -1.1, 0), (10.8, -5.4, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(3, 'label', Point(6.6, -2.1, 0), color=Color.from_hex("#3f9c20"), text='G_d = 40.0 kN')
add(3, 'polyline', Polyline([(10.8, -1.1, 0), (10.8, -12.7, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(3, 'arrow', Line((1.8, -6.5, 0), (6.2, -6.5, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(3, 'label', Point(4, -5.4, 0), color=Color.from_hex("#3f9c20"), text='Q_d = 35.0 kN')
add(3, 'polyline', Polyline([(1.8, -6.5, 0), (17.1, -6.5, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)

# step 4 — Read the reactions
add(4, 'arrow', Line((23.5, -6, 0), (23.5, -11.7143, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(4, 'arrow', Line((23.5, -11.7143, 0), (28.5, -11.7143, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(4, 'label', Point(20.5, -8.85714, 0), color=Color.from_hex("#3f9c20"), text='G_d 40')
add(4, 'label', Point(26, -12.9143, 0), color=Color.from_hex("#3f9c20"), text='Q_d 35')
add(4, 'segment', Line((28.5, -11.7143, 0), (28.7429, -11.4613, 0)), color=Color.from_hex("#3f9c20"), width=0.127411)
add(4, 'segment', Line((28.7429, -11.4613, 0), (23.5, -6, 0)), color=Color.from_hex("#3f9c20"), width=0.127411)
add(4, 'label', Point(30.2214, -12.7878, 0), color=Color.from_hex("#3f9c20"), text='A = 2.45')
add(4, 'label', Point(29.3214, -8.33066, 0), color=Color.from_hex("#3f9c20"), text='B = 52.99')
add(4, 'arrow', Line((3.22987, -14.3855, 0), (5.30747, -12.2214, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'label', Point(1.8, -14.9855, 0), color=Color.from_hex("#3f9c20"), text='A = 2.45')
add(4, 'arrow', Line((18.3701, -14.3855, 0), (16.2925, -12.2214, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'label', Point(20.5701, -14.9855, 0), color=Color.from_hex("#3f9c20"), text='B = 52.99')

# step 5 — Does the thrust line stay inside?
add(5, 'segment', Line((6, -11.5, 0), (10.8, -6.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.127411)
add(5, 'segment', Line((10.8, -6.5, 0), (15.6, -11.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.127411)
add(5, 'label', Point(4, -7.4, 0), color=Color.from_hex("#aaaaaa"), text='thrust line')
add(5, 'segment', Line((13.38, -9.1875, 0), (13.7242, -7.20855, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(5, 'label', Point(17.1521, -7.59802, 0), color=Color.from_hex("#ce4095"), text='2.51 m outside')

# step 6 — The corner pays for it
add(6, 'segment', Line((10.8, -6.5, 0), (15.8, -6.3, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(6, 'label', Point(13.1801, -3.4024, 0), color=Color.from_hex("#ce4095"), text='118')
add(6, 'segment', Line((10.8, -6.5, 0), (5.8, -6.3, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(6, 'segment', Line((10.8, -6.5, 0), (15.4, -7.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'label', Point(12.4202, -10.127, 0), color=Color.from_hex("#1a1eb2"), text='158')
add(6, 'segment', Line((10.8, -6.5, 0), (6.2, -7.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'segment', Line((15.4, -7.5, 0), (15.8, -6.3, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'label', Point(13.7026, -6.26754, 0), color=Color.from_hex("#1a1eb2"), text='419')
add(6, 'segment', Line((6.2, -7.5, 0), (5.8, -6.3, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'segment', Line((15.4, -7.5, 0), (15.6, -11.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'label', Point(11.9045, -9.67977, 0), color=Color.from_hex("#1a1eb2"), text='432')
add(6, 'segment', Line((6.2, -7.5, 0), (6, -11.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'segment', Line((15.8, -6.3, 0), (15.6, -11.5, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(6, 'label', Point(19.2973, -9.03836, 0), color=Color.from_hex("#ce4095"), text='394')
add(6, 'segment', Line((5.8, -6.3, 0), (6, -11.5, 0)), color=Color.from_hex("#ce4095"), width=0.127411)

# step 7 — How big is the force diagram?
add(7, 'segment', Line((27.3981, -2.94481, 0), (28.2137, -3.79434, 0)), color=Color.from_hex("#3f9c20"), width=0.059674)
add(7, 'segment', Line((27.3981, -2.94481, 0), (24.7863, -3.04928, 0)), color=Color.from_hex("#ce4095"), width=0.059674)
add(7, 'segment', Line((28.2137, -3.79434, 0), (24.7863, -3.04928, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((24.7863, -3.04928, 0), (27.7342, 5.79434, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((28.2137, -3.79434, 0), (27.7342, 5.79434, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((27.3981, -2.94481, 0), (27.7342, 5.79434, 0)), color=Color.from_hex("#ce4095"), width=0.059674)
add(7, 'point', Point(27.3981, -2.94481, 0), color=Color.from_hex("#ffffff"), width=0.29008)
add(7, 'point', Point(28.2137, -3.79434, 0), color=Color.from_hex("#ffffff"), width=0.29008)
add(7, 'point', Point(24.7863, -3.04928, 0), color=Color.from_hex("#ffffff"), width=0.29008)
add(7, 'point', Point(27.7342, 5.79434, 0), color=Color.from_hex("#ffffff"), width=0.29008)
add(7, 'label', Point(26.5, 7.19434, 0), color=Color.from_hex("#aaaaaa"), text='1 unit ≙ 45 kN')

# step 8 — c) Against an A4 sheet
add(8, 'segment', Line((17, 0.5, 0), (22.46, 0.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(8, 'segment', Line((22.46, 0.5, 0), (22.46, 8.222, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(8, 'segment', Line((22.46, 8.222, 0), (17, 8.222, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(8, 'segment', Line((17, 8.222, 0), (17, 0.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(8, 'label', Point(21.46, 1.3, 0), color=Color.from_hex("#aaaaaa"), text='A4')
add(8, 'segment', Line((17, 0.5, 0), (21.0099, 0.5, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(8, 'segment', Line((21.0099, 0.5, 0), (21.0099, 11.7188, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(8, 'segment', Line((21.0099, 11.7188, 0), (17, 11.7188, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(8, 'segment', Line((17, 11.7188, 0), (17, 0.5, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(8, 'label', Point(19.005, 12.6188, 0), color=Color.from_hex("#ce4095"), text='15.42 × 43.15 cm')
add(8, 'label', Point(20, -1.4, 0), color=Color.from_hex("#ce4095"), text='does NOT fit on A4 ✗  (1.45 × too tall)')


if __name__ == "__main__":
    print("EX 8.5 — the frame that follows the loads —", len(ops), "operations")
