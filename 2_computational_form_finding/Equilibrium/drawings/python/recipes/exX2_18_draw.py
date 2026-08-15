"""EX X · 18 — run the building backwards from one column

Auto-generated from ops/exX2_18.json — the drawing as literal COMPAS
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


# step 0 — The exercise, and the number that was dropped
add(0, 'label', Point(12.3568, 13.6, 0), text='Längsbalken 1:100 — 15.24 m, 2.499 m deep')
add(0, 'label', Point(-12.2, 1.2, 0), text='Kräfteplan a) — 1 unit ≙ 125.0 kN')
add(0, 'label', Point(8.99808, -0.4, 0), text='Querbalken 1:100 — ONE central support')
add(0, 'label', Point(24.1, -3.4, 0), text='Kräfteplan b) — the udl in 8 strips')

# step 1 — The longitudinal beam
add(1, 'segment', Line((2.6, 6, 0), (22.1136, 6, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((22.1136, 6, 0), (22.1136, 9.19872, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((22.1136, 9.19872, 0), (2.6, 9.19872, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((2.6, 9.19872, 0), (2.6, 6, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'point', Point(2.76, 6, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'segment', Line((1.98, 5.5, 0), (1.41431, 6.06569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((2.5, 5.5, 0), (1.93432, 6.06569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((3.02, 5.5, 0), (2.45431, 6.06569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((3.54, 5.5, 0), (2.97431, 6.06569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((4.06, 5.5, 0), (3.49431, 6.06569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'point', Point(21.9536, 6, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'segment', Line((21.1736, 5.5, 0), (20.6079, 6.06569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((21.6936, 5.5, 0), (21.1279, 6.06569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((22.2136, 5.5, 0), (21.6479, 6.06569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((22.7336, 5.5, 0), (22.1679, 6.06569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((23.2536, 5.5, 0), (22.6879, 6.06569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)

# step 2 — Third points, and why they matter
add(2, 'arrow', Line((2.76, 2, 0), (2.76, 5, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(2, 'label', Point(-0.14, 3.2, 0), color=Color.from_hex("#3f9c20"), text='400.0')
add(2, 'arrow', Line((21.9536, 2, 0), (21.9536, 5, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(2, 'label', Point(24.8536, 3.2, 0), color=Color.from_hex("#3f9c20"), text='400.0')
add(2, 'arrow', Line((9.15744, 12.1987, 0), (9.15744, 9.69872, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(2, 'label', Point(12.5574, 11.2987, 0), color=Color.from_hex("#3f9c20"), text='C1 = 400.0')
add(2, 'arrow', Line((15.5562, 12.1987, 0), (15.5562, 9.69872, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(2, 'label', Point(18.9562, 11.2987, 0), color=Color.from_hex("#3f9c20"), text='C2 = 400.0')

# step 3 — The flow inside the Längsbalken
add(3, 'segment', Line((2.76, 6, 0), (21.9536, 6, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(3, 'label', Point(12.3568, 4.6, 0), color=Color.from_hex("#ce4095"), text='tie 800.0 kN T')
add(3, 'segment', Line((2.76, 6, 0), (9.15744, 9.19872, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'label', Point(6.80843, 5.89995, 0), color=Color.from_hex("#1a1eb2"), text='894.4')
add(3, 'segment', Line((9.15744, 9.19872, 0), (15.5562, 9.19872, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'label', Point(12.3568, 10.6987, 0), color=Color.from_hex("#1a1eb2"), text='800.0')
add(3, 'segment', Line((15.5562, 9.19872, 0), (21.9536, 6, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'label', Point(17.9052, 5.89995, 0), color=Color.from_hex("#1a1eb2"), text='894.4')
add(3, 'segment', Line((22.8816, 6, 0), (22.8816, 9.19872, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(3, 'label', Point(25.2816, 7.59936, 0), color=Color.from_hex("#aaaaaa"), text='z = 2.499 m')

# step 4 — a) The force diagram
add(4, 'arrow', Line((-9, -2.4, 0), (-9, 0.8, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((-8.4876, 0.8, 0), (-8.4876, -2.4, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((-9, -2.4, 0), (-9, -5.6, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((-8.4876, -5.6, 0), (-8.4876, -2.4, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'point', Point(-15.4, -2.4, 0), color=Color.from_hex("#ffffff"), width=0.33152)
add(4, 'label', Point(-16.7, -1.5, 0), text='o')
add(4, 'segment', Line((-15.4, -7.1, 0), (-9, -7.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(4, 'label', Point(-12.2, -8, 0), color=Color.from_hex("#aaaaaa"), text='H = 800.0 kN')
add(4, 'segment', Line((-15.4, -2.4, 0), (-9, 0.8, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(4, 'segment', Line((-15.4, -2.4, 0), (-9, -2.4, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(4, 'segment', Line((-15.4, -2.4, 0), (-9, -5.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)

# step 5 — b) The crossbeam
add(5, 'segment', Line((2.6, -8.2, 0), (15.3962, -8.2, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(5, 'segment', Line((15.3962, -8.2, 0), (15.3962, -5.00128, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(5, 'segment', Line((15.3962, -5.00128, 0), (2.6, -5.00128, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(5, 'segment', Line((2.6, -5.00128, 0), (2.6, -8.2, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(5, 'segment', Line((2.6, -2.82528, 0), (15.3962, -2.82528, 0)), color=Color.from_hex("#3f9c20"), width=0.06048)
add(5, 'point', Point(8.99744, -8.2, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(5, 'segment', Line((8.21744, -8.7, 0), (7.65175, -8.13432, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(5, 'segment', Line((8.73744, -8.7, 0), (8.17175, -8.13432, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(5, 'segment', Line((9.25744, -8.7, 0), (8.69176, -8.13432, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(5, 'segment', Line((9.77744, -8.7, 0), (9.21176, -8.13432, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(5, 'segment', Line((10.2974, -8.7, 0), (9.73175, -8.13432, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(5, 'arrow', Line((8.99744, -12.6, 0), (8.99744, -9.3, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(5, 'label', Point(12.3974, -11.2, 0), color=Color.from_hex("#3f9c20"), text='C = 400.0 kN')

# step 6 — b) The line load
add(6, 'label', Point(8.99808, -1.80128, 0), color=Color.from_hex("#3f9c20"), text='g_d = 40.012 kN/m')

# step 7 — b) And the flow turns over
add(7, 'segment', Line((2.6, -5.00128, 0), (15.3962, -5.00128, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(7, 'label', Point(-2.4, -5.00128, 0), color=Color.from_hex("#ce4095"), text='tie on TOP: 200.0 kN T')
add(7, 'segment', Line((2.6, -5.00256, 0), (3.39976, -5.00256, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(7, 'segment', Line((3.39976, -5.00256, 0), (4.99928, -5.40232, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(7, 'segment', Line((4.99928, -5.40232, 0), (6.5988, -6.20184, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(7, 'segment', Line((6.5988, -6.20184, 0), (8.19832, -7.40112, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(7, 'segment', Line((8.19832, -7.40112, 0), (8.99744, -8.2, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(7, 'segment', Line((8.99744, -8.2, 0), (9.79784, -7.39984, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(7, 'segment', Line((9.79784, -7.39984, 0), (11.3974, -6.20056, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(7, 'segment', Line((11.3974, -6.20056, 0), (12.9969, -5.40104, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(7, 'segment', Line((12.9969, -5.40104, 0), (14.5964, -5.00128, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(7, 'segment', Line((14.5964, -5.00128, 0), (15.3962, -5.00128, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(7, 'label', Point(4, -9.8, 0), color=Color.from_hex("#1a1eb2"), text='arch below: 200.0 kN C')
add(7, 'arrow', Line((26.5, -10.5, 0), (26.5, -11.5, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(7, 'arrow', Line((26.5, -11.5, 0), (26.5, -12.5, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(7, 'arrow', Line((26.5, -12.5, 0), (26.5, -13.5, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(7, 'arrow', Line((26.5, -13.5, 0), (26.5, -14.5, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(7, 'arrow', Line((27.0124, -14.5, 0), (27.0124, -6.5, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(7, 'arrow', Line((26.5, -6.5, 0), (26.5, -7.5, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(7, 'arrow', Line((26.5, -7.5, 0), (26.5, -8.5, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(7, 'arrow', Line((26.5, -8.5, 0), (26.5, -9.5, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(7, 'arrow', Line((26.5, -9.5, 0), (26.5, -10.5, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(7, 'point', Point(22.4988, -10.5, 0), color=Color.from_hex("#ffffff"), width=0.33152)
add(7, 'segment', Line((22.4988, -10.5, 0), (26.5, -10.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((22.4988, -10.5, 0), (26.5, -11.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((22.4988, -10.5, 0), (26.5, -12.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((22.4988, -10.5, 0), (26.5, -13.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((22.4988, -10.5, 0), (26.5, -14.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((22.4988, -10.5, 0), (26.5, -6.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((22.4988, -10.5, 0), (26.5, -7.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((22.4988, -10.5, 0), (26.5, -8.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((22.4988, -10.5, 0), (26.5, -9.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((22.4988, -10.5, 0), (26.5, -10.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'label', Point(24.4994, -16.6, 0), color=Color.from_hex("#aaaaaa"), text='H = 200.1 kN')

# step 8 — The chain, closed
add(8, 'label', Point(12, -19.8, 0), color=Color.from_hex("#3f9c20"), text='chain: 2 × 40.012 × 9.997 = 800.00 kN in = A + B = 800.00 kN out')


if __name__ == "__main__":
    print("EX X · 18 — run the building backwards from one column —", len(ops), "operations")
