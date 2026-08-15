"""EX X · 8 — the thrust line, found with a trial funicular

Auto-generated from ops/exX1_8.json — the drawing as literal COMPAS
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
add(0, 'label', Point(13, -11.6, 0), text='Form diagram 1:250')
add(0, 'label', Point(-18.4, -12.6, 0), text='Force diagram 1 cm ≙ 10 kN — R = 119.30 kN, not 120')

# step 1 — What is given
add(1, 'point', Point(-1, -2, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'segment', Line((-1.9, -2.45, 0), (-2.50104, -1.84896, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-1.3, -2.45, 0), (-1.90104, -1.84896, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-0.7, -2.45, 0), (-1.30104, -1.84896, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-0.1, -2.45, 0), (-0.701041, -1.84896, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((0.5, -2.45, 0), (-0.101041, -1.84896, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'label', Point(-2.5, -3.5, 0), text='A')
add(1, 'point', Point(21.4925, -2, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'segment', Line((20.5925, -2.45, 0), (19.9915, -1.84896, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((21.1925, -2.45, 0), (20.5915, -1.84896, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((21.7925, -2.45, 0), (21.1915, -1.84896, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((22.3925, -2.45, 0), (21.7915, -1.84896, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((22.9925, -2.45, 0), (22.3915, -1.84896, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'label', Point(22.9925, -3.5, 0), text='B')
add(1, 'polyline', Polyline([(2.54724, -10.25, 0), (5.64616, 11.8, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'arrow', Line((5.45643, 10.45, 0), (5.05589, 7.6, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(1, 'label', Point(6.40616, 9.375, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(1, 'polyline', Polyline([(7.9415, -10.25, 0), (7.9415, 11.8, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'arrow', Line((7.9415, 10.45, 0), (7.9415, 7.6, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(1, 'label', Point(9.0915, 9.375, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(1, 'polyline', Polyline([(11.741, -10.25, 0), (13.6701, 11.8, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'arrow', Line((13.552, 10.45, 0), (13.3027, 7.6, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(1, 'label', Point(14.5774, 9.375, 0), color=Color.from_hex("#3f9c20"), text='F₃')
add(1, 'polyline', Polyline([(17.8893, -10.25, 0), (14.9707, 11.8, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'arrow', Line((15.1494, 10.45, 0), (15.5267, 7.6, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(1, 'label', Point(16.4881, 9.375, 0), color=Color.from_hex("#3f9c20"), text='F₄')
add(1, 'point', Point(4.57545, 4.1815, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'label', Point(3.17545, 4.6815, 0), text='C')

# step 2 — The load line, and R
add(2, 'arrow', Line((-19, -0.2, 0), (-19.5965, -4.44401, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(2, 'label', Point(-20.6982, -2.322, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(2, 'arrow', Line((-19.5965, -4.44401, 0), (-19.5965, -7.30115, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(2, 'label', Point(-20.9965, -5.87258, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(2, 'arrow', Line((-19.5965, -7.30115, 0), (-19.721, -8.72428, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(2, 'label', Point(-21.0587, -8.01272, 0), color=Color.from_hex("#3f9c20"), text='F₃')
add(2, 'arrow', Line((-19.721, -8.72428, 0), (-19.3461, -11.5567, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(2, 'label', Point(-20.9335, -10.1405, 0), color=Color.from_hex("#3f9c20"), text='F₄')
add(2, 'arrow', Line((-17.3, -0.2, 0), (-17.6461, -11.5567, 0)), color=Color.from_hex("#3f9c20"), width=0.176198, dash=0.52864, head=(0.528192, 0.204019))
add(2, 'label', Point(-16.373, -5.87836, 0), color=Color.from_hex("#3f9c20"), text='R')

# step 3 — Pick ANY pole o′
add(3, 'point', Point(-14.7143, -3.91429, 0), color=Color.from_hex("#ffffff"), width=0.35224)
add(3, 'label', Point(-12.1143, -3.26429, 0), text='o′  (trial)')
add(3, 'segment', Line((-14.7143, -3.91429, 0), (-19, -0.2, 0)), color=Color.from_hex("#aaaaaa"), width=0.059674)
add(3, 'segment', Line((-14.7143, -3.91429, 0), (-19.5965, -4.44401, 0)), color=Color.from_hex("#aaaaaa"), width=0.059674)
add(3, 'segment', Line((-14.7143, -3.91429, 0), (-19.5965, -7.30115, 0)), color=Color.from_hex("#aaaaaa"), width=0.059674)
add(3, 'segment', Line((-14.7143, -3.91429, 0), (-19.721, -8.72428, 0)), color=Color.from_hex("#aaaaaa"), width=0.059674)
add(3, 'segment', Line((-14.7143, -3.91429, 0), (-19.3461, -11.5567, 0)), color=Color.from_hex("#aaaaaa"), width=0.059674)

# step 4 — The trial funicular
add(4, 'segment', Line((-1, -2, 0), (3.19566, -5.63624, 0)), color=Color.from_hex("#aaaaaa"), width=0.059674)
add(4, 'segment', Line((3.19566, -5.63624, 0), (7.9415, -5.12131, 0)), color=Color.from_hex("#aaaaaa"), width=0.059674)
add(4, 'segment', Line((7.9415, -5.12131, 0), (12.4642, -1.98381, 0)), color=Color.from_hex("#aaaaaa"), width=0.059674)
add(4, 'segment', Line((12.4642, -1.98381, 0), (16.3066, 1.70763, 0)), color=Color.from_hex("#aaaaaa"), width=0.059674)
add(4, 'segment', Line((16.3066, 1.70763, 0), (21.886, 10.9137, 0)), color=Color.from_hex("#aaaaaa"), width=0.059674)

# step 5 — Close it — and R appears
add(5, 'polyline', Polyline([(8.87349, -10.557, 0), (-1, -2, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(5, 'polyline', Polyline([(16.3066, 1.70763, 0), (8.87349, -10.557, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(5, 'point', Point(8.87349, -10.557, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(5, 'label', Point(10.0735, -9.85703, 0), text='S')
add(5, 'polyline', Polyline([(8.88285, -10.25, 0), (9.61873, 13.9, 0)]), color=Color.from_hex("#3f9c20"), dash=0.3304)
add(5, 'arrow', Line((9.60959, 13.6, 0), (9.47247, 9.1, 0)), color=Color.from_hex("#3f9c20"), width=0.176198, dash=0.52864, head=(0.528192, 0.204019))
add(5, 'label', Point(10.7456, 11.5, 0), color=Color.from_hex("#3f9c20"), text='R')
add(5, 'polyline', Polyline([(-1.27412, -10.9958, 0), (-0.570553, 12.0935, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(5, 'polyline', Polyline([(21.2184, -10.9958, 0), (21.9219, 12.0935, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)

# step 6 — The closing strings, and i
add(6, 'polyline', Polyline([(-1, -2, 0), (21.4925, -2, 0)]), color=Color.from_hex("#111111"), dash=0.3304)
add(6, 'label', Point(10.2462, -1.05, 0), text='CS')
add(6, 'polyline', Polyline([(-1, -2, 0), (21.886, 10.9137, 0)]), color=Color.from_hex("#111111"), dash=0.3304)
add(6, 'label', Point(10.043, 3.30683, 0), text='CS′')
add(6, 'polyline', Polyline([(-14.7143, -3.91429, 0), (-19.1901, -6.43983, 0)]), color=Color.from_hex("#111111"), dash=0.3304)
add(6, 'point', Point(-19.1901, -6.43983, 0), color=Color.from_hex("#ffffff"), width=0.35224)
add(6, 'label', Point(-18.6401, -7.28983, 0), text='i')

# step 7 — C fixes the pole
add(7, 'polyline', Polyline([(-24.6281, -6.43983, 0), (-19.1901, -6.43983, 0)]), color=Color.from_hex("#111111"), dash=0.3304)
add(7, 'polyline', Polyline([(-6.62605, -8.23759, 0), (8.99592, 9.08247, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(7, 'point', Point(-24.6281, -6.43983, 0), color=Color.from_hex("#ffffff"), width=0.35224)
add(7, 'label', Point(-27.2281, -5.73983, 0), text='o  (real)')
add(7, 'segment', Line((-24.6281, -6.43983, 0), (-19, -0.2, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((-24.6281, -6.43983, 0), (-19.5965, -4.44401, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((-24.6281, -6.43983, 0), (-19.5965, -7.30115, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((-24.6281, -6.43983, 0), (-19.721, -8.72428, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((-24.6281, -6.43983, 0), (-19.3461, -11.5567, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'arrow', Line((-6.22419, -7.79205, 0), (-1, -2, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(7, 'arrow', Line((27.0948, -7.42717, 0), (21.4925, -2, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(7, 'label', Point(-6.72419, -8.89205, 0), color=Color.from_hex("#3f9c20"), text='A = 88.23 kN')
add(7, 'label', Point(27.9948, -8.52717, 0), color=Color.from_hex("#3f9c20"), text='B = 77.22 kN')
add(7, 'point', Point(9.48858, 9.62867, 0), color=Color.from_hex("#ffffff"), width=0.29008)
add(7, 'label', Point(10.7886, 10.5287, 0), color=Color.from_hex("#aaaaaa"), text='P')

# step 8 — The arch
add(8, 'label', Point(-22.6344, -3.25896, 0), color=Color.from_hex("#1a1eb2"), text='1')
add(8, 'segment', Line((-1, -2, 0), (4.57545, 4.1815, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(8, 'label', Point(1.78773, -0.20925, 0), color=Color.from_hex("#1a1eb2"), text='88.2')
add(8, 'label', Point(-22.6538, -4.95746, 0), color=Color.from_hex("#1a1eb2"), text='2')
add(8, 'segment', Line((4.57545, 4.1815, 0), (7.9415, 5.51667, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(8, 'label', Point(6.25848, 6.04908, 0), color=Color.from_hex("#1a1eb2"), text='56.8')
add(8, 'label', Point(-22.3045, -6.17813, 0), color=Color.from_hex("#1a1eb2"), text='3')
add(8, 'segment', Line((7.9415, 5.51667, 0), (13.044, 4.64321, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(8, 'label', Point(10.4928, 6.27994, 0), color=Color.from_hex("#1a1eb2"), text='53.6')
add(8, 'label', Point(-22.1946, -6.85572, 0), color=Color.from_hex("#1a1eb2"), text='4')
add(8, 'segment', Line((13.044, 4.64321, 0), (16.1068, 3.21738, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(8, 'label', Point(14.5754, 5.13029, 0), color=Color.from_hex("#1a1eb2"), text='56.8')
add(8, 'label', Point(-21.8517, -8.22441, 0), color=Color.from_hex("#1a1eb2"), text='5')
add(8, 'segment', Line((16.1068, 3.21738, 0), (21.4925, -2, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(8, 'label', Point(18.7996, -0.691312, 0), color=Color.from_hex("#1a1eb2"), text='77.2')
add(8, 'point', Point(4.57545, 4.1815, 0), color=Color.from_hex("#ffffff"), width=0.33152)
add(8, 'point', Point(7.9415, 5.51667, 0), color=Color.from_hex("#ffffff"), width=0.33152)
add(8, 'point', Point(13.044, 4.64321, 0), color=Color.from_hex("#ffffff"), width=0.33152)
add(8, 'point', Point(16.1068, 3.21738, 0), color=Color.from_hex("#ffffff"), width=0.33152)


if __name__ == "__main__":
    print("EX X · 8 — the thrust line, found with a trial funicular —", len(ops), "operations")
