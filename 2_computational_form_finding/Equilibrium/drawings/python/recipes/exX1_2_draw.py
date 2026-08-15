"""EX X.2 — the same 12 kN, in three materials

Auto-generated from ops/exX1_2.json — the drawing as literal COMPAS
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
add(0, 'label', Point(8.6, 14.5, 0), text='a) Materialkennwerte — the formulary table (compendium 2.6)')
add(0, 'label', Point(16.5, -1, 0), text='b) and c) — the required square, N_d = 12 kN, all three at one scale')
add(0, 'label', Point(-17.5, 0.9, 0), text='e) σ–ε, schematic, each normalised to its own f_k')

# step 1 — a) The safety factor γ_M
add(1, 'segment', Line((0, 11.5, 0), (30.6, 11.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(1, 'segment', Line((0, 9.73, 0), (30.6, 9.73, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(1, 'segment', Line((0, 8.11, 0), (30.6, 8.11, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(1, 'segment', Line((0, 6.49, 0), (30.6, 6.49, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(1, 'segment', Line((0, 4.87, 0), (30.6, 4.87, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(1, 'segment', Line((0, 3.25, 0), (30.6, 3.25, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(1, 'segment', Line((0, 13.9, 0), (30.6, 13.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(1, 'segment', Line((7.2, 13.9, 0), (7.2, 3.25, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(1, 'label', Point(8.6, 13, 0), text='Timber')
add(1, 'label', Point(8.6, 12, 0), color=Color.from_hex("#aaaaaa"), text='Spruce · Fichte')
add(1, 'label', Point(16.6, 13, 0), text='Steel')
add(1, 'label', Point(16.6, 12, 0), color=Color.from_hex("#aaaaaa"), text='S 235')
add(1, 'label', Point(24.6, 13, 0), text='Concrete')
add(1, 'label', Point(24.6, 12, 0), color=Color.from_hex("#aaaaaa"), text='C20/25')
add(1, 'label', Point(1.6, 10.48, 0), text='γ_M')
add(1, 'label', Point(8.6, 10.48, 0), text='1.7')
add(1, 'label', Point(16.6, 10.48, 0), text='1.05')
add(1, 'label', Point(24.6, 10.48, 0), text='1.5')
add(1, 'label', Point(1.6, 8.86, 0), text='f_tk')
add(1, 'label', Point(1.6, 7.24, 0), text='f_td')
add(1, 'label', Point(1.6, 5.62, 0), text='f_ck')
add(1, 'label', Point(1.6, 4, 0), text='f_cd')

# step 2 — a) The characteristic strengths
add(2, 'label', Point(8.6, 8.86, 0), text='14 N/mm²')
add(2, 'label', Point(16.6, 8.86, 0), text='235 N/mm²')
add(2, 'label', Point(24.6, 8.86, 0), text='1.5 N/mm²')
add(2, 'label', Point(8.6, 5.62, 0), text='20 N/mm²')
add(2, 'label', Point(16.6, 5.62, 0), text='235 N/mm²')
add(2, 'label', Point(24.6, 5.62, 0), text='20 N/mm²')

# step 3 — a) Down to design level
add(3, 'label', Point(8.6, 7.24, 0), color=Color.from_hex("#f0bcdb"), text='8.235 N/mm²')
add(3, 'label', Point(16.6, 7.24, 0), color=Color.from_hex("#f0bcdb"), text='223.8 N/mm²')
add(3, 'label', Point(24.6, 7.24, 0), color=Color.from_hex("#f0bcdb"), text='1.000 N/mm²')
add(3, 'label', Point(8.6, 4, 0), color=Color.from_hex("#bdbfe8"), text='11.76 N/mm²')
add(3, 'label', Point(16.6, 4, 0), color=Color.from_hex("#bdbfe8"), text='223.8 N/mm²')
add(3, 'label', Point(24.6, 4, 0), color=Color.from_hex("#bdbfe8"), text='13.33 N/mm²')

# step 4 — b) Tension
add(4, 'segment', Line((1.5, -12.6, 0), (31.5, -12.6, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(4, 'polygon', Polygon([(4.36221, -12.6, 0), (7.63779, -12.6, 0), (7.63779, -9.32442, 0), (4.36221, -9.32442, 0)]), color=Color.from_hex("#ce4095"), opacity=0.15)
add(4, 'segment', Line((4.36221, -12.6, 0), (7.63779, -12.6, 0)), color=Color.from_hex("#f0bcdb"), width=0.06372)
add(4, 'segment', Line((7.63779, -12.6, 0), (7.63779, -9.32442, 0)), color=Color.from_hex("#f0bcdb"), width=0.06372)
add(4, 'segment', Line((7.63779, -9.32442, 0), (4.36221, -9.32442, 0)), color=Color.from_hex("#f0bcdb"), width=0.06372)
add(4, 'segment', Line((4.36221, -9.32442, 0), (4.36221, -12.6, 0)), color=Color.from_hex("#f0bcdb"), width=0.06372)
add(4, 'label', Point(6, -14, 0), text='Timber · Spruce · Fichte')
add(4, 'label', Point(6, -15.5, 0), color=Color.from_hex("#f0bcdb"), text='b) 1457 mm² → 39 mm')
add(4, 'polygon', Polygon([(14.6858, -12.6, 0), (15.3142, -12.6, 0), (15.3142, -11.9717, 0), (14.6858, -11.9717, 0)]), color=Color.from_hex("#ce4095"), opacity=0.15)
add(4, 'segment', Line((14.6858, -12.6, 0), (15.3142, -12.6, 0)), color=Color.from_hex("#f0bcdb"), width=0.06372)
add(4, 'segment', Line((15.3142, -12.6, 0), (15.3142, -11.9717, 0)), color=Color.from_hex("#f0bcdb"), width=0.06372)
add(4, 'segment', Line((15.3142, -11.9717, 0), (14.6858, -11.9717, 0)), color=Color.from_hex("#f0bcdb"), width=0.06372)
add(4, 'segment', Line((14.6858, -11.9717, 0), (14.6858, -12.6, 0)), color=Color.from_hex("#f0bcdb"), width=0.06372)
add(4, 'label', Point(15, -14, 0), text='Steel · S 235')
add(4, 'label', Point(15, -15.5, 0), color=Color.from_hex("#f0bcdb"), text='b) 54 mm² → 8 mm')
add(4, 'polygon', Polygon([(21.3, -12.6, 0), (30.7, -12.6, 0), (30.7, -3.2, 0), (21.3, -3.2, 0)]), color=Color.from_hex("#ce4095"), opacity=0.15)
add(4, 'segment', Line((21.3, -12.6, 0), (30.7, -12.6, 0)), color=Color.from_hex("#f0bcdb"), width=0.06372)
add(4, 'segment', Line((30.7, -12.6, 0), (30.7, -3.2, 0)), color=Color.from_hex("#f0bcdb"), width=0.06372)
add(4, 'segment', Line((30.7, -3.2, 0), (21.3, -3.2, 0)), color=Color.from_hex("#f0bcdb"), width=0.06372)
add(4, 'segment', Line((21.3, -3.2, 0), (21.3, -12.6, 0)), color=Color.from_hex("#f0bcdb"), width=0.06372)
add(4, 'label', Point(26, -14, 0), text='Concrete · C20/25')
add(4, 'label', Point(26, -15.5, 0), color=Color.from_hex("#f0bcdb"), text='b) 12000 mm² → 110 mm')
add(4, 'label', Point(16.5, -18.5, 0), color=Color.from_hex("#aaaaaa"), text='1 mm ≙ 0.086 units · red = tension b), blue = compression c)')

# step 5 — c) Compression
add(5, 'polygon', Polygon([(4.62973, -12.6, 0), (7.37027, -12.6, 0), (7.37027, -9.85945, 0), (4.62973, -9.85945, 0)]), color=Color.from_hex("#1a1eb2"), opacity=0.22)
add(5, 'segment', Line((4.62973, -12.6, 0), (7.37027, -12.6, 0)), color=Color.from_hex("#bdbfe8"), width=0.06372)
add(5, 'segment', Line((7.37027, -12.6, 0), (7.37027, -9.85945, 0)), color=Color.from_hex("#bdbfe8"), width=0.06372)
add(5, 'segment', Line((7.37027, -9.85945, 0), (4.62973, -9.85945, 0)), color=Color.from_hex("#bdbfe8"), width=0.06372)
add(5, 'segment', Line((4.62973, -9.85945, 0), (4.62973, -12.6, 0)), color=Color.from_hex("#bdbfe8"), width=0.06372)
add(5, 'label', Point(6, -16.9, 0), color=Color.from_hex("#bdbfe8"), text='c) 1020 mm² → 32 mm')
add(5, 'polygon', Polygon([(14.6858, -12.6, 0), (15.3142, -12.6, 0), (15.3142, -11.9717, 0), (14.6858, -11.9717, 0)]), color=Color.from_hex("#1a1eb2"), opacity=0.22)
add(5, 'segment', Line((14.6858, -12.6, 0), (15.3142, -12.6, 0)), color=Color.from_hex("#bdbfe8"), width=0.06372)
add(5, 'segment', Line((15.3142, -12.6, 0), (15.3142, -11.9717, 0)), color=Color.from_hex("#bdbfe8"), width=0.06372)
add(5, 'segment', Line((15.3142, -11.9717, 0), (14.6858, -11.9717, 0)), color=Color.from_hex("#bdbfe8"), width=0.06372)
add(5, 'segment', Line((14.6858, -11.9717, 0), (14.6858, -12.6, 0)), color=Color.from_hex("#bdbfe8"), width=0.06372)
add(5, 'label', Point(15, -16.9, 0), color=Color.from_hex("#bdbfe8"), text='c) 54 mm² → 8 mm')
add(5, 'polygon', Polygon([(24.7129, -12.6, 0), (27.2871, -12.6, 0), (27.2871, -10.0257, 0), (24.7129, -10.0257, 0)]), color=Color.from_hex("#1a1eb2"), opacity=0.22)
add(5, 'segment', Line((24.7129, -12.6, 0), (27.2871, -12.6, 0)), color=Color.from_hex("#bdbfe8"), width=0.06372)
add(5, 'segment', Line((27.2871, -12.6, 0), (27.2871, -10.0257, 0)), color=Color.from_hex("#bdbfe8"), width=0.06372)
add(5, 'segment', Line((27.2871, -10.0257, 0), (24.7129, -10.0257, 0)), color=Color.from_hex("#bdbfe8"), width=0.06372)
add(5, 'segment', Line((24.7129, -10.0257, 0), (24.7129, -12.6, 0)), color=Color.from_hex("#bdbfe8"), width=0.06372)
add(5, 'label', Point(26, -16.9, 0), color=Color.from_hex("#bdbfe8"), text='c) 900 mm² → 30 mm')

# step 7 — e) Brittle or ductile
add(7, 'arrow', Line((-26, -9, 0), (-6.5, -9, 0)), color=Color.from_hex("#aaaaaa"), width=0.116395, head=(0.376373, 0.161424))
add(7, 'arrow', Line((-26, -9, 0), (-26, 0.4, 0)), color=Color.from_hex("#aaaaaa"), width=0.116395, head=(0.376373, 0.161424))
add(7, 'label', Point(-5.6, -9.9, 0), color=Color.from_hex("#aaaaaa"), text='ε [‰]')
add(7, 'label', Point(-23.6, -0.3, 0), color=Color.from_hex("#aaaaaa"), text='σ / f_k')
add(7, 'segment', Line((-26, -9, 0), (-26, -9.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(7, 'segment', Line((-20.6, -9, 0), (-20.6, -9.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(7, 'segment', Line((-15.2, -9, 0), (-15.2, -9.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(7, 'segment', Line((-12.8322, -9, 0), (-12.8322, -9.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(7, 'segment', Line((-10.4161, -9, 0), (-10.4161, -9.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(7, 'segment', Line((-8, -9, 0), (-8, -9.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(7, 'label', Point(-26, -10.3, 0), color=Color.from_hex("#aaaaaa"), text='0')
add(7, 'label', Point(-20.6, -10.3, 0), color=Color.from_hex("#aaaaaa"), text='1')
add(7, 'label', Point(-15.2, -10.3, 0), color=Color.from_hex("#aaaaaa"), text='2')
add(7, 'label', Point(-12.8322, -10.3, 0), color=Color.from_hex("#aaaaaa"), text='100')
add(7, 'label', Point(-10.4161, -10.3, 0), color=Color.from_hex("#aaaaaa"), text='200')
add(7, 'label', Point(-8, -10.3, 0), color=Color.from_hex("#aaaaaa"), text='300')
add(7, 'segment', Line((-15.75, -9.5, 0), (-15.25, -8.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(7, 'segment', Line((-15.15, -9.5, 0), (-14.65, -8.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(7, 'label', Point(-11.8, -0.3, 0), color=Color.from_hex("#aaaaaa"), text='yield → failure · the ε axis is broken at 2 ‰')
add(7, 'polyline', Polyline([(-26, -2.27869, 0), (-8, -2.27869, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3481)
add(7, 'segment', Line((-26, -9, 0), (-19.1273, -2.27869, 0)), color=Color.from_hex("#f0bcdb"), width=0.098554)
add(7, 'segment', Line((-19.1273, -2.27869, 0), (-18.44, -2.27869, 0)), color=Color.from_hex("#f0bcdb"), width=0.098554)
add(7, 'segment', Line((-18.44, -2.27869, 0), (-18.44, -9, 0)), color=Color.from_hex("#f0bcdb"), width=0.098554)
add(7, 'point', Point(-18.44, -2.27869, 0), color=Color.from_hex("#ffffff"), width=0.24013)
add(7, 'segment', Line((-22.4262, -5.50492, 0), (-18.1987, -5.50492, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(7, 'label', Point(-13.7987, -5.50492, 0), color=Color.from_hex("#f0bcdb"), text='Timber 1.27 → 1.40 ‰')
add(7, 'segment', Line((-26, -9, 0), (-19.9571, -2.27869, 0)), color=Color.from_hex("#f0bcdb"), width=0.134237)
add(7, 'segment', Line((-19.9571, -2.27869, 0), (-14.7651, -2.27869, 0)), color=Color.from_hex("#f0bcdb"), width=0.134237)
add(7, 'segment', Line((-14.7651, -2.27869, 0), (-8.96644, -1.60656, 0)), color=Color.from_hex("#f0bcdb"), width=0.134237)
add(7, 'segment', Line((-8.96644, -1.60656, 0), (-8.96644, -9, 0)), color=Color.from_hex("#f0bcdb"), width=0.134237)
add(7, 'point', Point(-8.96644, -1.60656, 0), color=Color.from_hex("#ffffff"), width=0.24013)
add(7, 'segment', Line((-21.2866, -3.75738, 0), (-16.0242, -3.75738, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(7, 'label', Point(-11.6242, -3.75738, 0), color=Color.from_hex("#f0bcdb"), text='Steel 1.12 → 260 ‰')
add(7, 'segment', Line((-26, -9, 0), (-25.73, -2.27869, 0)), color=Color.from_hex("#f0bcdb"), width=0.06372)
add(7, 'segment', Line((-25.73, -2.27869, 0), (-25.406, -2.27869, 0)), color=Color.from_hex("#f0bcdb"), width=0.06372)
add(7, 'segment', Line((-25.406, -2.27869, 0), (-25.406, -9, 0)), color=Color.from_hex("#f0bcdb"), width=0.06372)
add(7, 'point', Point(-25.406, -2.27869, 0), color=Color.from_hex("#ffffff"), width=0.24013)
add(7, 'segment', Line((-25.9298, -7.25246, 0), (-18.1987, -7.25246, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(7, 'label', Point(-13.7987, -7.25246, 0), color=Color.from_hex("#f0bcdb"), text='Concrete 0.05 → 0.11 ‰')
add(7, 'label', Point(-6.5, -1.77869, 0), color=Color.from_hex("#aaaaaa"), text='f_k')


if __name__ == "__main__":
    print("EX X.2 — the same 12 kN, in three materials —", len(ops), "operations")
