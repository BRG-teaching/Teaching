"""EX X · 11 — the same plate, four times, four different beams

Auto-generated from ops/exX2_11.json — the drawing as literal COMPAS
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
add(0, 'label', Point(13.8875, 12.55, 0), text='Grundriss 1:200 — a) one beam across the middle')
add(0, 'label', Point(-15, 2.8, 0), text='a) the single beam on its own')
add(0, 'label', Point(10.2, -6.4, 0), text='R on every beam of every case — 1 unit ≙ 2.94 kN')

# step 1 — The plate and its design load
add(1, 'segment', Line((3.2, -3.4, 0), (24.575, -3.4, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((24.575, -3.4, 0), (24.575, 10.85, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((24.575, 10.85, 0), (3.2, 10.85, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((3.2, 10.85, 0), (3.2, -3.4, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'label', Point(13.8875, 11.648, 0), color=Color.from_hex("#aaaaaa"), text='7.5 × 5 m · s_d = 1.350 kN/m² · 50.625 kN in total')

# step 2 — The beams
add(2, 'polygon', Polygon([(3.2, 3.0125, 0), (24.575, 3.0125, 0), (24.575, 4.4375, 0), (3.2, 4.4375, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.85)

# step 3 — The tributary area
add(3, 'polygon', Polygon([(3.2, -3.4, 0), (24.575, -3.4, 0), (24.575, 10.85, 0), (3.2, 10.85, 0)]), color=Color.from_hex("#3f9c20"), opacity=0.07)
add(3, 'polyline', Polyline([(3.2, -3.4, 0), (24.575, -3.4, 0), (24.575, 10.85, 0), (3.2, 10.85, 0), (3.2, -3.4, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(3, 'polygon', Polygon([(3.2, -3.4, 0), (24.575, -3.4, 0), (24.575, 10.85, 0), (3.2, 10.85, 0)]), color=Color.from_hex("#3f9c20"), opacity=0.24)
add(3, 'segment', Line((3.2, 3.725, 0), (24.575, 3.725, 0)), color=Color.from_hex("#3f9c20"), width=0.203858)
add(3, 'label', Point(13.8875, 5.8625, 0), color=Color.from_hex("#3f9c20"), text='A = 37.500 m²')

# step 4 — The line load
add(4, 'segment', Line((-22.6875, -6.6, 0), (-7.3125, -6.6, 0)), color=Color.from_hex("#111111"), width=0.127411)
add(4, 'segment', Line((-22.6875, -0.6, 0), (-7.3125, -0.6, 0)), color=Color.from_hex("#3f9c20"), width=0.06048)
add(4, 'label', Point(-15, 0.4, 0), color=Color.from_hex("#3f9c20"), text='g = 6.7500 kN/m')
add(4, 'segment', Line((-22.6875, -12.2, 0), (-7.3125, -12.2, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(4, 'label', Point(-15, -13, 0), color=Color.from_hex("#aaaaaa"), text='L = 7.500 m')

# step 5 — The point load
add(5, 'arrow', Line((-15, -8.2, 0), (-15, -11.2, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'label', Point(-10.4, -10, 0), color=Color.from_hex("#3f9c20"), text='R = 50.6250 kN')

# step 7 — Four answers from one plate
add(7, 'polygon', Polygon([(3.2, -9.65, 0), (20.4125, -9.65, 0), (20.4125, -8.15, 0), (3.2, -8.15, 0)]), color=Color.from_hex("#3f9c20"), opacity=0.8)
add(7, 'label', Point(25.3125, -8.9, 0), color=Color.from_hex("#3f9c20"), text='a) 7.5 m — 50.6250 kN')
add(7, 'polygon', Polygon([(3.2, -11.95, 0), (11.8063, -11.95, 0), (11.8063, -10.45, 0), (3.2, -10.45, 0)]), color=Color.from_hex("#b9b9bd"), opacity=0.8)
add(7, 'label', Point(25.3125, -11.2, 0), color=Color.from_hex("#aaaaaa"), text='b) 2× 7.5 m — 25.3125 kN')
add(7, 'polygon', Polygon([(3.2, -14.25, 0), (11.8063, -14.25, 0), (11.8063, -12.75, 0), (3.2, -12.75, 0)]), color=Color.from_hex("#b9b9bd"), opacity=0.8)
add(7, 'label', Point(25.3125, -13.5, 0), color=Color.from_hex("#aaaaaa"), text='c) 2× 5.0 m — 25.3125 kN')
add(7, 'polygon', Polygon([(3.2, -16.55, 0), (8.9375, -16.55, 0), (8.9375, -15.05, 0), (3.2, -15.05, 0)]), color=Color.from_hex("#b9b9bd"), opacity=0.8)
add(7, 'label', Point(25.3125, -15.8, 0), color=Color.from_hex("#aaaaaa"), text='d) 2× 7.5 m — 16.8750 kN')
add(7, 'polygon', Polygon([(3.2, -18.85, 0), (6.06875, -18.85, 0), (6.06875, -17.35, 0), (3.2, -17.35, 0)]), color=Color.from_hex("#b9b9bd"), opacity=0.8)
add(7, 'label', Point(25.3125, -18.1, 0), color=Color.from_hex("#aaaaaa"), text='d) 2× 5.0 m — 8.4375 kN')
add(7, 'segment', Line((20.4125, -7.5, 0), (20.4125, -19.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(7, 'label', Point(23.8125, -20.1, 0), color=Color.from_hex("#aaaaaa"), text='the whole plate, 50.625 kN')


if __name__ == "__main__":
    print("EX X · 11 — the same plate, four times, four different beams —", len(ops), "operations")
