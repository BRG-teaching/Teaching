"""EX X · 6 — a suspended roof, shaped by its own maximum force

Auto-generated from ops/exX1_6.json — the drawing as literal COMPAS
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


# step 1 — The situation
add(1, 'label', Point(17, 4.58525, 0), text='form diagram 1:500')
add(1, 'polygon', Polygon([(6.05825, 6.08525, 0), (8.875, 6.08525, 0), (8.875, 10, 0), (6.05825, 10, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.45)
add(1, 'polygon', Polygon([(25.125, 6.08525, 0), (27.9417, 6.08525, 0), (27.9417, 10, 0), (25.125, 10, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.45)
add(1, 'segment', Line((4.65825, 6.08525, 0), (29.3418, 6.08525, 0)), color=Color.from_hex("#111111"), width=0.127411)
add(1, 'polyline', Polyline([(8.875, 5.48525, 0), (8.875, 15.3, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'polyline', Polyline([(25.125, 5.48525, 0), (25.125, 15.3, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'point', Point(8.875, 10, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'point', Point(25.125, 10, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'label', Point(9.425, 10.55, 0), text='A')
add(1, 'label', Point(24.575, 10.55, 0), text='B')
add(1, 'segment', Line((8.875, 12, 0), (25.125, 12, 0)), color=Color.from_hex("#3f9c20"), width=0.06048)
add(1, 'label', Point(21.725, 12.62, 0), color=Color.from_hex("#3f9c20"), text='g_d = 33.75 kN/m')
add(1, 'segment', Line((8.875, 14.4, 0), (25.125, 14.4, 0)), color=Color.from_hex("#3f9c20"), width=0.06048)
add(1, 'label', Point(21.725, 15.02, 0), color=Color.from_hex("#3f9c20"), text='q_d = 3.75 kN/m')

# step 2 — The resultant, and its two halves
add(2, 'arrow', Line((17, 15.7, 0), (17, 10.18, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, dash=0.55, head=(0.528192, 0.204019))
add(2, 'label', Point(13.8, 15.45, 0), color=Color.from_hex("#3f9c20"), text='R = 2437.5 kN')

# step 4 — The thrust draws the roof
add(4, 'polyline', Polyline([(8.875, 10, 0), (25.125, 10, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(4, 'segment', Line((8.875, 10, 0), (9.28125, 9.8239, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((9.28125, 9.8239, 0), (9.6875, 9.65683, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((9.6875, 9.65683, 0), (10.0938, 9.49879, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((10.0938, 9.49879, 0), (10.5, 9.34979, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((10.5, 9.34979, 0), (10.9062, 9.20981, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((10.9062, 9.20981, 0), (11.3125, 9.07886, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((11.3125, 9.07886, 0), (11.7188, 8.95695, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((11.7188, 8.95695, 0), (12.125, 8.84406, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((12.125, 8.84406, 0), (12.5312, 8.74021, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((12.5312, 8.74021, 0), (12.9375, 8.64539, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((12.9375, 8.64539, 0), (13.3438, 8.5596, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((13.3438, 8.5596, 0), (13.75, 8.48283, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((13.75, 8.48283, 0), (14.1562, 8.4151, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((14.1562, 8.4151, 0), (14.5625, 8.3564, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((14.5625, 8.3564, 0), (14.9688, 8.30673, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((14.9688, 8.30673, 0), (15.375, 8.2661, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((15.375, 8.2661, 0), (15.7812, 8.23449, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((15.7812, 8.23449, 0), (16.1875, 8.21191, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((16.1875, 8.21191, 0), (16.5938, 8.19837, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((16.5938, 8.19837, 0), (17, 8.19385, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((17, 8.19385, 0), (17.4062, 8.19837, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((17.4062, 8.19837, 0), (17.8125, 8.21191, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((17.8125, 8.21191, 0), (18.2188, 8.23449, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((18.2188, 8.23449, 0), (18.625, 8.2661, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((18.625, 8.2661, 0), (19.0312, 8.30673, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((19.0312, 8.30673, 0), (19.4375, 8.3564, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((19.4375, 8.3564, 0), (19.8438, 8.4151, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((19.8438, 8.4151, 0), (20.25, 8.48283, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((20.25, 8.48283, 0), (20.6562, 8.5596, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((20.6562, 8.5596, 0), (21.0625, 8.64539, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((21.0625, 8.64539, 0), (21.4688, 8.74021, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((21.4688, 8.74021, 0), (21.875, 8.84406, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((21.875, 8.84406, 0), (22.2812, 8.95695, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((22.2812, 8.95695, 0), (22.6875, 9.07886, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((22.6875, 9.07886, 0), (23.0938, 9.20981, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((23.0938, 9.20981, 0), (23.5, 9.34979, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((23.5, 9.34979, 0), (23.9062, 9.49879, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((23.9062, 9.49879, 0), (24.3125, 9.65683, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((24.3125, 9.65683, 0), (24.7188, 9.8239, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((24.7188, 9.8239, 0), (25.125, 10, 0)), color=Color.from_hex("#ce4095"), width=0.093542)
add(4, 'segment', Line((8.875, 10, 0), (17, 6.3877, 0)), color=Color.from_hex("#ce4095"), width=0.059674)
add(4, 'segment', Line((17, 6.3877, 0), (25.125, 10, 0)), color=Color.from_hex("#ce4095"), width=0.059674)
add(4, 'point', Point(17, 6.3877, 0), color=Color.from_hex("#ffffff"), width=0.33152)
add(4, 'label', Point(16.1, 6.9377, 0), color=Color.from_hex("#aaaaaa"), text='I')
add(4, 'label', Point(12.6375, 7.44385, 0), color=Color.from_hex("#ce4095"), text='1')
add(4, 'label', Point(21.3625, 7.44385, 0), color=Color.from_hex("#ce4095"), text='2')
add(4, 'segment', Line((18.5, 10, 0), (18.5, 8.19385, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(4, 'segment', Line((18.5, 8.19385, 0), (18.5, 6.3877, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(4, 'label', Point(20.4, 9.09693, 0), color=Color.from_hex("#aaaaaa"), text='f = 7.225 m')
add(4, 'label', Point(19.5, 7.29078, 0), color=Color.from_hex("#aaaaaa"), text='f')

# step 5 — The reactions come for free
add(5, 'arrow', Line((5.0372, 11.7063, 0), (8.875, 10, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(5, 'arrow', Line((28.9628, 11.7063, 0), (25.125, 10, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(5, 'label', Point(5.0372, 12.5563, 0), color=Color.from_hex("#3f9c20"), text='A = 3000 kN')
add(5, 'label', Point(28.9628, 12.5563, 0), color=Color.from_hex("#3f9c20"), text='B = 3000 kN')

# step 6 — The force diagram
add(6, 'label', Point(9.6, -1.1, 0), text='force diagram  1 cm ≙ 250 kN')
add(6, 'arrow', Line((10, -2.2, 0), (10, -9.81719, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'label', Point(5.6, -6.00859, 0), color=Color.from_hex("#3f9c20"), text='R = 2437.5 kN')
add(6, 'point', Point(10, -6.00859, 0), color=Color.from_hex("#ffffff"), width=0.33152)
add(6, 'label', Point(9.25, -5.90859, 0), color=Color.from_hex("#aaaaaa"), text='i')
add(6, 'point', Point(18.5665, -6.00859, 0), color=Color.from_hex("#ffffff"), width=0.33152)
add(6, 'label', Point(19.4165, -5.45859, 0), color=Color.from_hex("#aaaaaa"), text='o')
add(6, 'polyline', Polyline([(10, -6.00859, 0), (18.5665, -6.00859, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(6, 'label', Point(13.2833, -5.25859, 0), color=Color.from_hex("#aaaaaa"), text='H = 2741.3 kN')
add(6, 'segment', Line((10, -2.2, 0), (18.5665, -6.00859, 0)), color=Color.from_hex("#ce4095"), width=0.059674)
add(6, 'segment', Line((18.5665, -6.00859, 0), (10, -9.81719, 0)), color=Color.from_hex("#ce4095"), width=0.059674)
add(6, 'label', Point(14.3833, -3.3543, 0), color=Color.from_hex("#ce4095"), text='1')
add(6, 'label', Point(14.3833, -8.76289, 0), color=Color.from_hex("#ce4095"), text='2')
add(6, 'arrow', Line((18.1086, -7.03866, 0), (9.54204, -3.23007, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'arrow', Line((10.458, -10.8473, 0), (19.0245, -7.03866, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'label', Point(13.1833, -2.4543, 0), color=Color.from_hex("#3f9c20"), text='A = 3000')
add(6, 'label', Point(12.3833, -9.46289, 0), color=Color.from_hex("#3f9c20"), text='B = 3000')

# step 7 — b) The diameter
add(7, 'label', Point(21, -13.4, 0), text='b)  dimensioning the cable — steel S235')
add(7, 'label', Point(21, -14.9, 0), color=Color.from_hex("#111111"), text='N_d,max = 3000000 N')
add(7, 'label', Point(21, -16.05, 0), color=Color.from_hex("#111111"), text='f_td = 235/1.05 = 223.81 N/mm²')
add(7, 'label', Point(21, -17.2, 0), color=Color.from_hex("#111111"), text='A_req = N/f_td = 13404.26 mm²')
add(7, 'label', Point(21, -18.35, 0), color=Color.from_hex("#111111"), text='D = √(4A/π) = 130.64 → 131 mm')
add(7, 'label', Point(21, -19.5, 0), color=Color.from_hex("#111111"), text='key: f_td≈223.8 → 13404.8 mm²')


if __name__ == "__main__":
    print("EX X · 6 — a suspended roof, shaped by its own maximum force —", len(ops), "operations")
