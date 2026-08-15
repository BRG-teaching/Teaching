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
add(0, 'label', Point(-12.9474, 4, 0), text='Längsbalken 1:100 — 15.24 m, 2.499 m deep')
add(0, 'label', Point(7, 14.4, 0), text='Kräfteplan a) — 1 unit ≙ 90.9 kN')
add(0, 'label', Point(20.998, -1, 0), text='Querbalken 1:100 — ONE central support')
add(0, 'label', Point(9.8, -7.4, 0), text='Kräfteplan b) — the udl in 8 strips')

# step 1 — The longitudinal beam
add(1, 'segment', Line((-24, -4.4, 0), (-1.89475, -4.4, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((-1.89475, -4.4, 0), (-1.89475, -0.77645, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((-1.89475, -0.77645, 0), (-24, -0.77645, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((-24, -0.77645, 0), (-24, -4.4, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'point', Point(-23.8188, -4.4, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'segment', Line((-24.5987, -4.9, 0), (-25.1644, -4.33432, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-24.0787, -4.9, 0), (-24.6444, -4.33432, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-23.5587, -4.9, 0), (-24.1244, -4.33432, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-23.0388, -4.9, 0), (-23.6044, -4.33432, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-22.5188, -4.9, 0), (-23.0844, -4.33432, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'point', Point(-2.076, -4.4, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'segment', Line((-2.856, -4.9, 0), (-3.42169, -4.33432, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-2.336, -4.9, 0), (-2.90169, -4.33432, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-1.816, -4.9, 0), (-2.38169, -4.33432, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-1.296, -4.9, 0), (-1.86169, -4.33432, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-0.776, -4.9, 0), (-1.34169, -4.33432, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)

# step 2 — Third points, and why they matter
add(2, 'arrow', Line((-23.8188, -8.8, 0), (-23.8188, -5.5, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(2, 'label', Point(-26.7188, -7.4, 0), color=Color.from_hex("#3f9c20"), text='400.0')
add(2, 'arrow', Line((-2.076, -8.8, 0), (-2.076, -5.5, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(2, 'label', Point(0.824, -7.4, 0), color=Color.from_hex("#3f9c20"), text='400.0')
add(2, 'arrow', Line((-16.5717, 2.82355, 0), (-16.5717, -0.27645, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(2, 'label', Point(-13.1716, 1.72355, 0), color=Color.from_hex("#3f9c20"), text='C1 = 400.0')
add(2, 'arrow', Line((-9.3231, 2.82355, 0), (-9.3231, -0.27645, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(2, 'label', Point(-5.9231, 1.72355, 0), color=Color.from_hex("#3f9c20"), text='C2 = 400.0')

# step 3 — The flow inside the Längsbalken
add(3, 'segment', Line((-23.8188, -4.4, 0), (-2.076, -4.4, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(3, 'label', Point(-12.9474, -5.8, 0), color=Color.from_hex("#ce4095"), text='tie 800.0 kN T')
add(3, 'segment', Line((-23.8188, -4.4, 0), (-16.5717, -0.77645, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'label', Point(-19.3455, -4.28764, 0), color=Color.from_hex("#1a1eb2"), text='894.4')
add(3, 'segment', Line((-16.5717, -0.77645, 0), (-9.3231, -0.77645, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'label', Point(-12.9474, 0.72355, 0), color=Color.from_hex("#1a1eb2"), text='800.0')
add(3, 'segment', Line((-9.3231, -0.77645, 0), (-2.076, -4.4, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(3, 'label', Point(-6.54926, -4.28764, 0), color=Color.from_hex("#1a1eb2"), text='894.4')
add(3, 'segment', Line((-1.02475, -4.4, 0), (-1.02475, -0.77645, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(3, 'label', Point(1.37525, -2.58822, 0), color=Color.from_hex("#aaaaaa"), text='z = 2.499 m')

# step 4 — a) The force diagram
add(4, 'arrow', Line((10, 8, 0), (10, 12.4, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((10.5124, 12.4, 0), (10.5124, 8, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((10, 8, 0), (10, 3.6, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((10.5124, 3.6, 0), (10.5124, 8, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'point', Point(1.2, 8, 0), color=Color.from_hex("#ffffff"), width=0.33152)
add(4, 'label', Point(-0.1, 8.9, 0), text='o')
add(4, 'segment', Line((1.2, 2.1, 0), (10, 2.1, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(4, 'label', Point(5.6, 1.2, 0), color=Color.from_hex("#aaaaaa"), text='H = 800.0 kN')
add(4, 'segment', Line((1.2, 8, 0), (10, 12.4, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(4, 'segment', Line((1.2, 8, 0), (10, 8, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(4, 'segment', Line((1.2, 8, 0), (10, 3.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)

# step 5 — b) The crossbeam
add(5, 'segment', Line((14.5, -9, 0), (27.4961, -9, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(5, 'segment', Line((27.4961, -9, 0), (27.4961, -5.7513, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(5, 'segment', Line((27.4961, -5.7513, 0), (14.5, -5.7513, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(5, 'segment', Line((14.5, -5.7513, 0), (14.5, -9, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(5, 'segment', Line((14.5, -3.5413, 0), (27.4961, -3.5413, 0)), color=Color.from_hex("#3f9c20"), width=0.06048)
add(5, 'point', Point(20.9974, -9, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(5, 'segment', Line((20.2174, -9.5, 0), (19.6517, -8.93431, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(5, 'segment', Line((20.7374, -9.5, 0), (20.1717, -8.93431, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(5, 'segment', Line((21.2574, -9.5, 0), (20.6917, -8.93431, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(5, 'segment', Line((21.7774, -9.5, 0), (21.2117, -8.93431, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(5, 'segment', Line((22.2974, -9.5, 0), (21.7317, -8.93431, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(5, 'arrow', Line((20.9974, -13.4, 0), (20.9974, -10.1, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(5, 'label', Point(24.3974, -12, 0), color=Color.from_hex("#3f9c20"), text='C = 400.0 kN')

# step 6 — b) The line load
add(6, 'label', Point(20.998, -2.5013, 0), color=Color.from_hex("#3f9c20"), text='g_d = 40.012 kN/m')

# step 7 — b) And the flow turns over
add(7, 'segment', Line((14.5, -5.7513, 0), (27.4961, -5.7513, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(7, 'label', Point(9.9, -5.7513, 0), color=Color.from_hex("#ce4095"), text='tie on TOP: 200.0 kN T')
add(7, 'segment', Line((14.5, -5.7526, 0), (15.3123, -5.7526, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(7, 'segment', Line((15.3123, -5.7526, 0), (16.9368, -6.15861, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(7, 'segment', Line((16.9368, -6.15861, 0), (18.5613, -6.97062, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(7, 'segment', Line((18.5613, -6.97062, 0), (20.1858, -8.18864, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(7, 'segment', Line((20.1858, -8.18864, 0), (20.9974, -9, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(7, 'segment', Line((20.9974, -9, 0), (21.8103, -8.18734, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(7, 'segment', Line((21.8103, -8.18734, 0), (23.4348, -6.96932, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(7, 'segment', Line((23.4348, -6.96932, 0), (25.0593, -6.15731, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(7, 'segment', Line((25.0593, -6.15731, 0), (26.6838, -5.7513, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(7, 'segment', Line((26.6838, -5.7513, 0), (27.4961, -5.7513, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(7, 'label', Point(17.1, -10.6, 0), color=Color.from_hex("#1a1eb2"), text='arch below: 200.0 kN C')
add(7, 'arrow', Line((12, -13, 0), (12, -14.1, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(7, 'arrow', Line((12, -14.1, 0), (12, -15.2, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(7, 'arrow', Line((12, -15.2, 0), (12, -16.3, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(7, 'arrow', Line((12, -16.3, 0), (12, -17.4, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(7, 'arrow', Line((11.4876, -17.4, 0), (11.4876, -8.6, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(7, 'arrow', Line((12, -8.6, 0), (12, -9.7, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(7, 'arrow', Line((12, -9.7, 0), (12, -10.8, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(7, 'arrow', Line((12, -10.8, 0), (12, -11.9, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(7, 'arrow', Line((12, -11.9, 0), (12, -13, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(7, 'point', Point(7.59868, -13, 0), color=Color.from_hex("#ffffff"), width=0.33152)
add(7, 'segment', Line((7.59868, -13, 0), (12, -13, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((7.59868, -13, 0), (12, -14.1, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((7.59868, -13, 0), (12, -15.2, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((7.59868, -13, 0), (12, -16.3, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((7.59868, -13, 0), (12, -17.4, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((7.59868, -13, 0), (12, -8.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((7.59868, -13, 0), (12, -9.7, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((7.59868, -13, 0), (12, -10.8, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((7.59868, -13, 0), (12, -11.9, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'segment', Line((7.59868, -13, 0), (12, -13, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(7, 'label', Point(9.79934, -18.8, 0), color=Color.from_hex("#aaaaaa"), text='H = 200.1 kN')

# step 8 — The chain, closed
add(8, 'label', Point(15, -20.2, 0), color=Color.from_hex("#3f9c20"), text='chain: 2 × 40.012 × 9.997 = 800.00 kN in = A + B = 800.00 kN out')


if __name__ == "__main__":
    print("EX X · 18 — run the building backwards from one column —", len(ops), "operations")
