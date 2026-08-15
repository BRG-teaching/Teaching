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
add(0, 'label', Point(-20.5, 3.4, 0), text='a) the bar — S235')
add(0, 'label', Point(-7, 4.2, 0), text='b) the bearing — C12/15')
add(0, 'label', Point(16, 15, 0), text='Strength, capacity and demand')
add(0, 'label', Point(16, 13.6, 0), text='sections at 1 mm ≙ 0.4 / 0.1 units · bars: N/mm² at 0.088, kN at 0.185')

# step 1 — Two materials, two strengths
add(1, 'segment', Line((4, -10, 0), (28.05, -10, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((4, -10, 0), (4, -10.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'label', Point(4, -11.5, 0), color=Color.from_hex("#aaaaaa"), text='0')
add(1, 'segment', Line((8.625, -10, 0), (8.625, -10.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'label', Point(8.625, -11.5, 0), color=Color.from_hex("#aaaaaa"), text='25')
add(1, 'segment', Line((13.25, -10, 0), (13.25, -10.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'label', Point(13.25, -11.5, 0), color=Color.from_hex("#aaaaaa"), text='50')
add(1, 'segment', Line((17.875, -10, 0), (17.875, -10.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'label', Point(17.875, -11.5, 0), color=Color.from_hex("#aaaaaa"), text='75')
add(1, 'segment', Line((22.5, -10, 0), (22.5, -10.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'label', Point(22.5, -11.5, 0), color=Color.from_hex("#aaaaaa"), text='100')
add(1, 'segment', Line((27.125, -10, 0), (27.125, -10.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'label', Point(27.125, -11.5, 0), color=Color.from_hex("#aaaaaa"), text='125')
add(1, 'polygon', Polygon([(4, 10.2, 0), (23.6952, 10.2, 0), (23.6952, 12.8, 0), (4, 12.8, 0)]), color=Color.from_hex("#ce4095"), opacity=0.35)
add(1, 'label', Point(29.0952, 11.5, 0), color=Color.from_hex("#ce4095"), text='S235  f_d = 223.81 N/mm²')
add(1, 'polygon', Polygon([(4, 7.2, 0), (4.704, 7.2, 0), (4.704, 9.8, 0), (4, 9.8, 0)]), color=Color.from_hex("#1a1eb2"), opacity=0.35)
add(1, 'label', Point(12.104, 8.5, 0), color=Color.from_hex("#1a1eb2"), text='C12/15  f_cd = 8.00 N/mm²  (28.0× less)')

# step 2 — a) The demand
add(2, 'polygon', Polygon([(4, 3.324, 0), (14.6146, 3.324, 0), (14.6146, 4.676, 0), (4, 4.676, 0)]), color=Color.from_hex("#ce4095"), opacity=0.3)
add(2, 'label', Point(14.4146, 6.8, 0), color=Color.from_hex("#ce4095"), text='demand 57.38 kN')

# step 3 — a) The area, then the diameter
add(3, 'circle', Circle(3.61336, frame=Frame((-20.5, -3.6, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#aaaaaa"), dash=0.55)
add(3, 'label', Point(-20.5, 1.4, 0), color=Color.from_hex("#aaaaaa"), text='required Ø 18.07 mm')

# step 4 — a) Round UP, and see why
add(4, 'polygon', Polygon([(-16.7, -3.6, 0), (-16.7468, -3.00555, 0), (-16.886, -2.42573, 0), (-17.1142, -1.87484, 0), (-17.4257, -1.36642, 0), (-17.813, -0.912994, 0), (-18.2664, -0.525735, 0), (-18.7748, -0.214175, 0), (-19.3257, 0.014015, 0), (-19.9055, 0.153216, 0), (-20.5, 0.2, 0), (-21.0945, 0.153216, 0), (-21.6743, 0.014015, 0), (-22.2252, -0.214175, 0), (-22.7336, -0.525735, 0), (-23.187, -0.912994, 0), (-23.5743, -1.36642, 0), (-23.8858, -1.87484, 0), (-24.114, -2.42573, 0), (-24.2532, -3.00555, 0), (-24.3, -3.6, 0), (-24.2532, -4.19445, 0), (-24.114, -4.77426, 0), (-23.8858, -5.32516, 0), (-23.5743, -5.83358, 0), (-23.187, -6.28701, 0), (-22.7336, -6.67427, 0), (-22.2252, -6.98583, 0), (-21.6743, -7.21401, 0), (-21.0945, -7.35322, 0), (-20.5, -7.4, 0), (-19.9055, -7.35322, 0), (-19.3257, -7.21401, 0), (-18.7748, -6.98583, 0), (-18.2664, -6.67427, 0), (-17.813, -6.28701, 0), (-17.4257, -5.83358, 0), (-17.1142, -5.32516, 0), (-16.886, -4.77426, 0), (-16.7468, -4.19445, 0)]), color=Color.from_hex("#f0bcdb"), opacity=0.55)
add(4, 'circle', Circle(3.8, frame=Frame((-20.5, -3.6, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#ce4095"))
add(4, 'segment', Line((-24.3, -8.6, 0), (-16.7, -8.6, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(4, 'label', Point(-20.5, -9.5, 0), color=Color.from_hex("#aaaaaa"), text='Ø 19 mm · A = 283.5 mm²')
add(4, 'polygon', Polygon([(4, 2.7, 0), (15.7394, 2.7, 0), (15.7394, 5.3, 0), (4, 5.3, 0)]), color=Color.from_hex("#f0bcdb"), opacity=0.75)
add(4, 'segment', Line((14.6146, 2, 0), (14.6146, 6, 0)), color=Color.from_hex("#3f9c20"), width=0.127411)
add(4, 'label', Point(21.3394, 4, 0), color=Color.from_hex("#3f9c20"), text='a) Ø19 carries 63.46 kN — 90.4 %')

# step 5 — b) The bearing area
add(5, 'circle', Circle(3.6, frame=Frame((-20.5, -3.6, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#b9b9bd"))
add(5, 'label', Point(-20.5, -5.5, 0), color=Color.from_hex("#b9b9bd"), text='Ø18 fails')
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
add(5, 'polygon', Polygon([(4, -1.8, 0), (15.84, -1.8, 0), (15.84, 0.8, 0), (4, 0.8, 0)]), color=Color.from_hex("#bdbfe8"), opacity=0.75)
add(5, 'segment', Line((18.1327, -2.5, 0), (18.1327, 1.5, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(5, 'label', Point(23.7327, -0.5, 0), color=Color.from_hex("#ce4095"), text='b) bearing 64.00 kN — 119.4 %')

# step 6 — b) And it fails
add(6, 'polygon', Polygon([(4, -1.176, 0), (18.1327, -1.176, 0), (18.1327, 0.176, 0), (4, 0.176, 0)]), color=Color.from_hex("#1a1eb2"), opacity=0.3)
add(6, 'label', Point(17.9327, 2.3, 0), color=Color.from_hex("#1a1eb2"), text='demand 76.39 kN')

# step 7 — Which force did it mean?
add(7, 'segment', Line((15.84, -7.9, 0), (15.84, -2.9, 0)), color=Color.from_hex("#3f9c20"), width=0.06048)
add(7, 'label', Point(16.44, -8.7, 0), color=Color.from_hex("#3f9c20"), text='the 64.00 kN limit')
add(7, 'polygon', Polygon([(4, -4.45, 0), (18.1327, -4.45, 0), (18.1327, -3.35, 0), (4, -3.35, 0)]), color=Color.from_hex("#ce4095"), opacity=0.55)
add(7, 'label', Point(23.7327, -3.9, 0), color=Color.from_hex("#ce4095"), text='76.39 kN → 119 %')
add(7, 'polygon', Polygon([(4, -6.05, 0), (10.5303, -6.05, 0), (10.5303, -4.95, 0), (4, -4.95, 0)]), color=Color.from_hex("#3f9c20"), opacity=0.55)
add(7, 'label', Point(21.44, -5.5, 0), color=Color.from_hex("#3f9c20"), text='35.30 kN → 55 %')
add(7, 'polygon', Polygon([(4, -7.65, 0), (11.9263, -7.65, 0), (11.9263, -6.55, 0), (4, -6.55, 0)]), color=Color.from_hex("#3f9c20"), opacity=0.55)
add(7, 'label', Point(21.44, -7.1, 0), color=Color.from_hex("#3f9c20"), text='42.84 kN → 67 %')


if __name__ == "__main__":
    print("EX X · 10.2 — one bar, one bearing, and a reference that points nowhere —", len(ops), "operations")
