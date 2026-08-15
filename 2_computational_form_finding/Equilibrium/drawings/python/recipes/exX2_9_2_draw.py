"""EX X · 9.2 — a capacity you can compute, a demand nobody printed

Auto-generated from ops/exX2_9_2.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-17, -15.6, 0), text='The bar section, to scale')
add(0, 'label', Point(16, 21.4, 0), text='Capacity against diameter — N_R = π D² f_td / 4')
add(0, 'label', Point(16, 19.8, 0), text='S235: f_tk = 235 N/mm², γ_M = 1.05 → f_td = 223.8095 N/mm²')
add(0, 'label', Point(-17, -17.4, 0), color=Color.from_hex("#aaaaaa"), text='the sheet gives no tension force to check this against')

# step 1 — The bar
add(1, 'circle', Circle(3.36, frame=Frame((-22, -2, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(-18.64, -2, 0), (-18.7545, -1.13037, 0), (-19.0902, -0.32, 0), (-19.6241, 0.375879, 0), (-20.32, 0.909845, 0), (-21.1304, 1.24551, 0), (-22, 1.36, 0), (-22.8696, 1.24551, 0), (-23.68, 0.909845, 0), (-24.3759, 0.375879, 0), (-24.9098, -0.32, 0), (-25.2455, -1.13037, 0), (-25.36, -2, 0), (-25.2455, -2.86963, 0), (-24.9098, -3.68, 0), (-24.3759, -4.37588, 0), (-23.68, -4.90984, 0), (-22.8696, -5.24551, 0), (-22, -5.36, 0), (-21.1304, -5.24551, 0), (-20.32, -4.90984, 0), (-19.6241, -4.37588, 0), (-19.0902, -3.68, 0), (-18.7545, -2.86963, 0)]), color=Color.from_hex("#f0bcdb"), opacity=0.55)
add(1, 'segment', Line((-25.36, -7.16, 0), (-18.64, -7.16, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'label', Point(-22, -8.36, 0), color=Color.from_hex("#aaaaaa"), text='D = 16 mm')
add(1, 'label', Point(-10.5, 1.2, 0), color=Color.from_hex("#ce4095"), text='A = π D²/4 = 201.06 mm²')

# step 2 — The material
add(2, 'label', Point(-10.5, -0.7, 0), color=Color.from_hex("#aaaaaa"), text='f_td = 223.81 N/mm²')

# step 3 — The capacity
add(3, 'label', Point(-10.5, -2.6, 0), color=Color.from_hex("#3f9c20"), text='N_allow = 45.000 kN')
add(3, 'segment', Line((5, -17, 0), (32, -17, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(3, 'segment', Line((5, -17, 0), (5, 10, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(3, 'label', Point(18.5, -22.4, 0), color=Color.from_hex("#aaaaaa"), text='bar diameter D [mm]')
add(3, 'label', Point(0.4, 11.4, 0), color=Color.from_hex("#aaaaaa"), text='N_R [kN]')
add(3, 'label', Point(5, -18.5, 0), color=Color.from_hex("#aaaaaa"), text='6')
add(3, 'label', Point(2.4, -17, 0), color=Color.from_hex("#aaaaaa"), text='0')
add(3, 'label', Point(11.75, -18.5, 0), color=Color.from_hex("#aaaaaa"), text='11')
add(3, 'label', Point(2.4, -10.25, 0), color=Color.from_hex("#aaaaaa"), text='30')
add(3, 'label', Point(18.5, -18.5, 0), color=Color.from_hex("#aaaaaa"), text='16')
add(3, 'label', Point(2.4, -3.5, 0), color=Color.from_hex("#aaaaaa"), text='60')
add(3, 'label', Point(25.25, -18.5, 0), color=Color.from_hex("#aaaaaa"), text='21')
add(3, 'label', Point(2.4, 3.25, 0), color=Color.from_hex("#aaaaaa"), text='90')
add(3, 'label', Point(32, -18.5, 0), color=Color.from_hex("#aaaaaa"), text='26')
add(3, 'label', Point(2.4, 10, 0), color=Color.from_hex("#aaaaaa"), text='120')
add(3, 'segment', Line((5, -15.5762, 0), (5.675, -15.329, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((5.675, -15.329, 0), (6.35, -15.062, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((6.35, -15.062, 0), (7.025, -14.7753, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((7.025, -14.7753, 0), (7.7, -14.4688, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((7.7, -14.4688, 0), (8.375, -14.1425, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((8.375, -14.1425, 0), (9.05, -13.7964, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((9.05, -13.7964, 0), (9.725, -13.4306, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((9.725, -13.4306, 0), (10.4, -13.045, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((10.4, -13.045, 0), (11.075, -12.6396, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((11.075, -12.6396, 0), (11.75, -12.2144, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((11.75, -12.2144, 0), (12.425, -11.7695, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((12.425, -11.7695, 0), (13.1, -11.3047, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((13.1, -11.3047, 0), (13.775, -10.8202, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((13.775, -10.8202, 0), (14.45, -10.316, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((14.45, -10.316, 0), (15.125, -9.79194, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((15.125, -9.79194, 0), (15.8, -9.24812, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((15.8, -9.24812, 0), (16.475, -8.68453, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((16.475, -8.68453, 0), (17.15, -8.10116, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((17.15, -8.10116, 0), (17.825, -7.49801, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((17.825, -7.49801, 0), (18.5, -6.8751, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((18.5, -6.8751, 0), (19.175, -6.2324, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((19.175, -6.2324, 0), (19.85, -5.56993, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((19.85, -5.56993, 0), (20.525, -4.88769, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((20.525, -4.88769, 0), (21.2, -4.18567, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((21.2, -4.18567, 0), (21.875, -3.46387, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((21.875, -3.46387, 0), (22.55, -2.7223, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((22.55, -2.7223, 0), (23.225, -1.96096, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((23.225, -1.96096, 0), (23.9, -1.17984, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((23.9, -1.17984, 0), (24.575, -0.378941, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((24.575, -0.378941, 0), (25.25, 0.44173, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((25.25, 0.44173, 0), (25.925, 1.28218, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((25.925, 1.28218, 0), (26.6, 2.1424, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((26.6, 2.1424, 0), (27.275, 3.02239, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((27.275, 3.02239, 0), (27.95, 3.92217, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((27.95, 3.92217, 0), (28.625, 4.84171, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((28.625, 4.84171, 0), (29.3, 5.78104, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((29.3, 5.78104, 0), (29.975, 6.74013, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((29.975, 6.74013, 0), (30.65, 7.71901, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((30.65, 7.71901, 0), (31.325, 8.71765, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'segment', Line((31.325, 8.71765, 0), (32, 9.73607, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(3, 'point', Point(18.5, -6.8751, 0), color=Color.from_hex("#ffffff"), width=0.4588)
add(3, 'label', Point(25.5, -6.0751, 0), color=Color.from_hex("#3f9c20"), text='16 mm → 45.00 kN')
add(3, 'polyline', Polyline([(18.5, -17, 0), (18.5, -6.8751, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3658)

# step 5 — The check
add(5, 'polygon', Polygon([(-27, -11.5, 0), (-15.4972, -11.5, 0), (-15.4972, -9.6, 0), (-27, -9.6, 0)]), color=Color.from_hex("#f0bcdb"), opacity=0.85)
add(5, 'segment', Line((-27, -11.5, 0), (-7, -11.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.06696)
add(5, 'segment', Line((-7, -11.5, 0), (-7, -9.6, 0)), color=Color.from_hex("#aaaaaa"), width=0.06696)
add(5, 'segment', Line((-7, -9.6, 0), (-27, -9.6, 0)), color=Color.from_hex("#aaaaaa"), width=0.06696)
add(5, 'segment', Line((-27, -9.6, 0), (-27, -11.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.06696)
add(5, 'segment', Line((-7, -12.4, 0), (-7, -8.7, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(5, 'label', Point(-21.2486, -13.1, 0), color=Color.from_hex("#3f9c20"), text='N_d = 25.88 kN → 57.5 %  ✓ passes')
add(5, 'label', Point(-10, -7.6, 0), color=Color.from_hex("#3f9c20"), text='N_allow = 45.00 kN')
add(5, 'polyline', Polyline([(5, -11.1768, 0), (13.281, -11.1768, 0)]), color=Color.from_hex("#ce4095"), dash=0.3658)
add(5, 'label', Point(10.4, -9.87678, 0), color=Color.from_hex("#ce4095"), text='N_d = 25.88 kN')
add(5, 'polyline', Polyline([(13.281, -17, 0), (13.281, -11.1768, 0)]), color=Color.from_hex("#1a1eb2"), dash=0.3658)
add(5, 'label', Point(13.281, -20.2, 0), color=Color.from_hex("#1a1eb2"), text='needs 12.13 → 13 mm')


if __name__ == "__main__":
    print("EX X · 9.2 — a capacity you can compute, a demand nobody printed —", len(ops), "operations")
