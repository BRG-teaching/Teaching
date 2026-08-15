"""EX X · 10.2 — one bar, one bearing, and a reference that points nowhere

Auto-generated from ops/exX2_10_2.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-20.5, 1.1, 0), text='a) the bar — S235')
add(0, 'label', Point(-3, 1.1, 0), text='b) the bearing — C12/15')
add(0, 'label', Point(16, 11.2, 0), text='Strength, capacity and demand')
add(0, 'label', Point(16, 10.2, 0), text='sections at 1 mm ≙ 0.32 / 0.1 units · bars: N/mm² at 0.088, kN at 0.185')

# step 1 — Two materials, two strengths
add(1, 'segment', Line((4, -12.3, 0), (28.05, -12.3, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((4, -12.3, 0), (4, -13, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'label', Point(4, -13.8, 0), color=Color.from_hex("#aaaaaa"), text='0')
add(1, 'segment', Line((8.625, -12.3, 0), (8.625, -13, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'label', Point(8.625, -13.8, 0), color=Color.from_hex("#aaaaaa"), text='25')
add(1, 'segment', Line((13.25, -12.3, 0), (13.25, -13, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'label', Point(13.25, -13.8, 0), color=Color.from_hex("#aaaaaa"), text='50')
add(1, 'segment', Line((17.875, -12.3, 0), (17.875, -13, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'label', Point(17.875, -13.8, 0), color=Color.from_hex("#aaaaaa"), text='75')
add(1, 'segment', Line((22.5, -12.3, 0), (22.5, -13, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'label', Point(22.5, -13.8, 0), color=Color.from_hex("#aaaaaa"), text='100')
add(1, 'segment', Line((27.125, -12.3, 0), (27.125, -13, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'label', Point(27.125, -13.8, 0), color=Color.from_hex("#aaaaaa"), text='125')
add(1, 'polygon', Polygon([(4, 6.9, 0), (23.6952, 6.9, 0), (23.6952, 9.5, 0), (4, 9.5, 0)]), color=Color.from_hex("#ce4095"), opacity=0.35)
add(1, 'label', Point(29.0952, 8.2, 0), color=Color.from_hex("#ce4095"), text='S235  f_d = 223.81 N/mm²')
add(1, 'polygon', Polygon([(4, 4.1, 0), (4.704, 4.1, 0), (4.704, 6.7, 0), (4, 6.7, 0)]), color=Color.from_hex("#1a1eb2"), opacity=0.35)
add(1, 'label', Point(12.104, 5.4, 0), color=Color.from_hex("#1a1eb2"), text='C12/15  f_cd = 8.00 N/mm²  (28.0× less)')

# step 2 — a) The demand
add(2, 'polygon', Polygon([(4, 0.724, 0), (14.6146, 0.724, 0), (14.6146, 2.076, 0), (4, 2.076, 0)]), color=Color.from_hex("#ce4095"), opacity=0.3)
add(2, 'label', Point(14.4146, 4.2, 0), color=Color.from_hex("#ce4095"), text='demand 57.38 kN')

# step 3 — a) The area, then the diameter
add(3, 'circle', Circle(2.89069, frame=Frame((-20.5, -4.4, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#aaaaaa"), dash=0.55)
add(3, 'label', Point(-20.5, -0.16, 0), color=Color.from_hex("#aaaaaa"), text='required Ø 18.07 mm')

# step 4 — a) Round UP, and see why
add(4, 'polygon', Polygon([(-17.46, -4.4, 0), (-17.4974, -3.92444, 0), (-17.6088, -3.46059, 0), (-17.7913, -3.01987, 0), (-18.0406, -2.61313, 0), (-18.3504, -2.2504, 0), (-18.7131, -1.94059, 0), (-19.1199, -1.69134, 0), (-19.5606, -1.50879, 0), (-20.0244, -1.39743, 0), (-20.5, -1.36, 0), (-20.9756, -1.39743, 0), (-21.4394, -1.50879, 0), (-21.8801, -1.69134, 0), (-22.2869, -1.94059, 0), (-22.6496, -2.2504, 0), (-22.9594, -2.61313, 0), (-23.2087, -3.01987, 0), (-23.3912, -3.46059, 0), (-23.5026, -3.92444, 0), (-23.54, -4.4, 0), (-23.5026, -4.87556, 0), (-23.3912, -5.33941, 0), (-23.2087, -5.78013, 0), (-22.9594, -6.18687, 0), (-22.6496, -6.5496, 0), (-22.2869, -6.85941, 0), (-21.8801, -7.10866, 0), (-21.4394, -7.29121, 0), (-20.9756, -7.40257, 0), (-20.5, -7.44, 0), (-20.0244, -7.40257, 0), (-19.5606, -7.29121, 0), (-19.1199, -7.10866, 0), (-18.7131, -6.85941, 0), (-18.3504, -6.5496, 0), (-18.0406, -6.18687, 0), (-17.7913, -5.78013, 0), (-17.6088, -5.33941, 0), (-17.4974, -4.87556, 0)]), color=Color.from_hex("#f0bcdb"), opacity=0.55)
add(4, 'circle', Circle(3.04, frame=Frame((-20.5, -4.4, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#ce4095"))
add(4, 'segment', Line((-23.54, -8.64, 0), (-17.46, -8.64, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(4, 'label', Point(-20.5, -9.54, 0), color=Color.from_hex("#aaaaaa"), text='Ø 19 mm · A = 283.5 mm²')
add(4, 'polygon', Polygon([(4, 0.1, 0), (15.7394, 0.1, 0), (15.7394, 2.7, 0), (4, 2.7, 0)]), color=Color.from_hex("#f0bcdb"), opacity=0.75)
add(4, 'segment', Line((14.6146, -0.6, 0), (14.6146, 3.4, 0)), color=Color.from_hex("#3f9c20"), width=0.127411)
add(4, 'label', Point(21.3394, 1.4, 0), color=Color.from_hex("#3f9c20"), text='a) Ø19 carries 63.46 kN — 90.4 %')

# step 5 — b) The bearing area
add(5, 'circle', Circle(2.88, frame=Frame((-20.5, -4.4, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#b9b9bd"))
add(5, 'label', Point(-20.5, -6.3, 0), color=Color.from_hex("#b9b9bd"), text='Ø18 fails')
add(5, 'polygon', Polygon([(-12, -8, 0), (-2, -8, 0), (-2, 0, 0), (-12, 0, 0)]), color=Color.from_hex("#bdbfe8"), opacity=0.55)
add(5, 'segment', Line((-12, -8, 0), (-2, -8, 0)), color=Color.from_hex("#1a1eb2"), width=0.093542)
add(5, 'segment', Line((-2, -8, 0), (-2, 0, 0)), color=Color.from_hex("#1a1eb2"), width=0.093542)
add(5, 'segment', Line((-2, 0, 0), (-12, 0, 0)), color=Color.from_hex("#1a1eb2"), width=0.093542)
add(5, 'segment', Line((-12, 0, 0), (-12, -8, 0)), color=Color.from_hex("#1a1eb2"), width=0.093542)
add(5, 'segment', Line((-10.5714, -8, 0), (-11.2078, -8.6364, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(5, 'segment', Line((-9.14286, -8, 0), (-9.77925, -8.6364, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(5, 'segment', Line((-7.71429, -8, 0), (-8.35068, -8.6364, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(5, 'segment', Line((-6.28571, -8, 0), (-6.92211, -8.6364, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(5, 'segment', Line((-4.85714, -8, 0), (-5.49354, -8.6364, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(5, 'segment', Line((-3.42857, -8, 0), (-4.06497, -8.6364, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(5, 'segment', Line((-2, -8, 0), (-2.6364, -8.6364, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(5, 'arrow', Line((-7, 2.6, 0), (-7, 0.4, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'label', Point(-3.6, 2, 0), color=Color.from_hex("#3f9c20"), text='76.4 kN')
add(5, 'segment', Line((-12, -9.1, 0), (-2, -9.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(5, 'segment', Line((-0.8, -8, 0), (-0.8, 0, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(5, 'label', Point(-7, -9.9, 0), color=Color.from_hex("#aaaaaa"), text='100 mm wide')
add(5, 'label', Point(1, -4, 0), color=Color.from_hex("#aaaaaa"), text='80 mm')
add(5, 'polygon', Polygon([(4, -4.1, 0), (15.84, -4.1, 0), (15.84, -1.5, 0), (4, -1.5, 0)]), color=Color.from_hex("#bdbfe8"), opacity=0.75)
add(5, 'segment', Line((18.1327, -4.8, 0), (18.1327, -0.8, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(5, 'label', Point(23.7327, -2.8, 0), color=Color.from_hex("#ce4095"), text='b) bearing 64.00 kN — 119.4 %')

# step 6 — b) And it fails
add(6, 'polygon', Polygon([(4, -3.476, 0), (18.1327, -3.476, 0), (18.1327, -2.124, 0), (4, -2.124, 0)]), color=Color.from_hex("#1a1eb2"), opacity=0.3)
add(6, 'label', Point(17.9327, 0, 0), color=Color.from_hex("#1a1eb2"), text='demand 76.39 kN')

# step 7 — Which force did it mean?
add(7, 'segment', Line((15.84, -10.2, 0), (15.84, -5.2, 0)), color=Color.from_hex("#3f9c20"), width=0.06048)
add(7, 'label', Point(16.44, -11, 0), color=Color.from_hex("#3f9c20"), text='the 64.00 kN limit')
add(7, 'polygon', Polygon([(4, -6.75, 0), (18.1327, -6.75, 0), (18.1327, -5.65, 0), (4, -5.65, 0)]), color=Color.from_hex("#ce4095"), opacity=0.55)
add(7, 'label', Point(23.7327, -6.2, 0), color=Color.from_hex("#ce4095"), text='76.39 kN → 119 %')
add(7, 'polygon', Polygon([(4, -8.35, 0), (10.5303, -8.35, 0), (10.5303, -7.25, 0), (4, -7.25, 0)]), color=Color.from_hex("#3f9c20"), opacity=0.55)
add(7, 'label', Point(21.44, -7.8, 0), color=Color.from_hex("#3f9c20"), text='35.30 kN → 55 %')
add(7, 'polygon', Polygon([(4, -9.95, 0), (11.9263, -9.95, 0), (11.9263, -8.85, 0), (4, -8.85, 0)]), color=Color.from_hex("#3f9c20"), opacity=0.55)
add(7, 'label', Point(21.44, -9.4, 0), color=Color.from_hex("#3f9c20"), text='42.84 kN → 67 %')


if __name__ == "__main__":
    print("EX X · 10.2 — one bar, one bearing, and a reference that points nowhere —", len(ops), "operations")
