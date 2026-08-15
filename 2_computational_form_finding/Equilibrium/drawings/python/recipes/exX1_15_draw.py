"""EX X · 15.1 + 15.2 — the roller that must not be pushed

Auto-generated from ops/exX1_15.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-15.58, -9.15, 0), text='15.2  the whole form, F4 added   ·   Form diagram 1:100')
add(0, 'label', Point(11, 16, 0), text='Force diagram   1 cm ≙ 15 kN')

# step 1 — 15.1 The arch is GIVEN — and it is a funicular
add(1, 'segment', Line((-26.5, -4.4, 0), (-27.319, -5.219, 0)), color=Color.from_hex("#111111"), width=0.131962)
add(1, 'segment', Line((-27.319, -5.219, 0), (-25.681, -5.219, 0)), color=Color.from_hex("#111111"), width=0.131962)
add(1, 'segment', Line((-25.681, -5.219, 0), (-26.5, -4.4, 0)), color=Color.from_hex("#111111"), width=0.131962)
add(1, 'segment', Line((-27.1142, -5.219, 0), (-27.6934, -4.63988, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((-26.7048, -5.219, 0), (-27.2839, -4.63988, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((-26.2952, -5.219, 0), (-26.8744, -4.63988, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((-25.8858, -5.219, 0), (-26.4649, -4.63988, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((-25.4763, -5.219, 0), (-26.0554, -4.63988, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'label', Point(-28.6, -4.1, 0), text='A')
add(1, 'segment', Line((-8.95, -4.4, 0), (-9.769, -5.219, 0)), color=Color.from_hex("#111111"), width=0.131962)
add(1, 'segment', Line((-9.769, -5.219, 0), (-8.131, -5.219, 0)), color=Color.from_hex("#111111"), width=0.131962)
add(1, 'segment', Line((-8.131, -5.219, 0), (-8.95, -4.4, 0)), color=Color.from_hex("#111111"), width=0.131962)
add(1, 'segment', Line((-9.56425, -5.804, 0), (-10.1434, -5.22488, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((-9.15475, -5.804, 0), (-9.73387, -5.22488, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((-8.74525, -5.804, 0), (-9.32437, -5.22488, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((-8.33575, -5.804, 0), (-8.91487, -5.22488, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'segment', Line((-7.92625, -5.804, 0), (-8.50537, -5.22488, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(1, 'label', Point(-6.85, -5.4, 0), text='B')
add(1, 'segment', Line((-10.0225, -5.492, 0), (-7.8775, -5.492, 0)), color=Color.from_hex("#111111"), width=0.043848)
add(1, 'polyline', Polyline([(-23.575, -5.3, 0), (-23.575, 3.66969, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3422)
add(1, 'arrow', Line((-23.575, 3.11969, 0), (-23.575, 1.51969, 0)), color=Color.from_hex("#3f9c20"), width=0.158688, head=(0.547056, 0.211306))
add(1, 'label', Point(-21.675, 2.51969, 0), color=Color.from_hex("#3f9c20"), text='F1 = 60')
add(1, 'polyline', Polyline([(-19.1875, -5.3, 0), (-19.1875, 3.66969, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3422)
add(1, 'arrow', Line((-19.1875, 3.11969, 0), (-19.1875, 1.51969, 0)), color=Color.from_hex("#3f9c20"), width=0.158688, head=(0.547056, 0.211306))
add(1, 'label', Point(-17.2875, 2.51969, 0), color=Color.from_hex("#3f9c20"), text='F2 = 30')
add(1, 'polyline', Polyline([(-4.5625, -5.3, 0), (-4.5625, 3.66969, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3422)
add(1, 'arrow', Line((-4.5625, 3.11969, 0), (-4.5625, 1.51969, 0)), color=Color.from_hex("#3f9c20"), width=0.158688, head=(0.547056, 0.211306))
add(1, 'label', Point(-2.6625, 2.51969, 0), color=Color.from_hex("#3f9c20"), text='F3 = 30')
add(1, 'polyline', Polyline([(-14.8, -5.3, 0), (-14.8, 3.66969, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3422)
add(1, 'arrow', Line((-14.8, 3.11969, 0), (-14.8, 1.51969, 0)), color=Color.from_hex("#3f9c20"), width=0.158688, head=(0.547056, 0.211306))
add(1, 'label', Point(-12.9, 2.51969, 0), color=Color.from_hex("#3f9c20"), text='F4 = 45')
add(1, 'segment', Line((-26.5, -4.4, 0), (-23.575, -0.378125, 0)), color=Color.from_hex("#1a1eb2"), width=0.131962)
add(1, 'label', Point(-26.1293, -1.59503, 0), color=Color.from_hex("#1a1eb2"), text='1 · 102.0 C')
add(1, 'segment', Line((-23.575, -0.378125, 0), (-19.1875, 1.26719, 0)), color=Color.from_hex("#1a1eb2"), width=0.131962)
add(1, 'label', Point(-22.0746, 1.62631, 0), color=Color.from_hex("#1a1eb2"), text='2 · 64.1 C')
add(1, 'segment', Line((-19.1875, 1.26719, 0), (-14.8, 0.71875, 0)), color=Color.from_hex("#1a1eb2"), width=0.131962)
add(1, 'label', Point(-17.1612, -0.346606, 0), color=Color.from_hex("#1a1eb2"), text='3 · 60.5 C')
add(1, 'segment', Line((-14.8, 0.71875, 0), (-8.95, -4.4, 0)), color=Color.from_hex("#1a1eb2"), width=0.131962)
add(1, 'label', Point(-10.518, -1.23415, 0), color=Color.from_hex("#1a1eb2"), text='4 · 79.7 C')
add(1, 'segment', Line((-26.5, -4.4, 0), (-4.5625, -1.65781, 0)), color=Color.from_hex("#ce4095"), width=0.131962)
add(1, 'label', Point(-17.1188, -4.58786, 0), color=Color.from_hex("#ce4095"), text='5 · 60.5 T')
add(1, 'segment', Line((-8.95, -4.4, 0), (-4.5625, -1.65781, 0)), color=Color.from_hex("#1a1eb2"), width=0.131962)
add(1, 'label', Point(-5.68975, -3.95433, 0), color=Color.from_hex("#1a1eb2"), text='6 · 70.8 C')
add(1, 'point', Point(-26.5, -4.4, 0), color=Color.from_hex("#ffffff"), width=0.34336)
add(1, 'point', Point(-8.95, -4.4, 0), color=Color.from_hex("#ffffff"), width=0.34336)
add(1, 'point', Point(-4.5625, -1.65781, 0), color=Color.from_hex("#ffffff"), width=0.34336)
add(1, 'point', Point(-23.575, -0.378125, 0), color=Color.from_hex("#ffffff"), width=0.34336)
add(1, 'point', Point(-19.1875, 1.26719, 0), color=Color.from_hex("#ffffff"), width=0.34336)
add(1, 'point', Point(-14.8, 0.71875, 0), color=Color.from_hex("#ffffff"), width=0.34336)

# step 2 — 15.1 The reactions
add(2, 'arrow', Line((-26.5, -8.55, 0), (-26.5, -6.25, 0)), color=Color.from_hex("#3f9c20"), width=0.158688, head=(0.547056, 0.211306))
add(2, 'label', Point(-30.4, -7.515, 0), color=Color.from_hex("#3f9c20"), text='A = 75.00 ↑')
add(2, 'arrow', Line((-8.95, -8.55, 0), (-8.95, -6.25, 0)), color=Color.from_hex("#3f9c20"), width=0.158688, head=(0.547056, 0.211306))
add(2, 'label', Point(-5.05, -7.515, 0), color=Color.from_hex("#3f9c20"), text='B = 90.00 ↑')

# step 5 — 15.1 The force diagram
add(5, 'arrow', Line((11, 13.6, 0), (11, 2.69091, 0)), color=Color.from_hex("#3f9c20"), width=0.114422, head=(0.369994, 0.158688))
add(5, 'label', Point(9.4, 8.14546, 0), color=Color.from_hex("#3f9c20"), text='F1')
add(5, 'arrow', Line((11, 2.69091, 0), (11, -2.76364, 0)), color=Color.from_hex("#3f9c20"), width=0.114422, head=(0.369994, 0.158688))
add(5, 'label', Point(9.4, -0.036364, 0), color=Color.from_hex("#3f9c20"), text='F2')
add(5, 'arrow', Line((11, -2.76364, 0), (11, -10.9455, 0)), color=Color.from_hex("#3f9c20"), width=0.114422, head=(0.369994, 0.158688))
add(5, 'label', Point(9.4, -6.85454, 0), color=Color.from_hex("#3f9c20"), text='F4')
add(5, 'arrow', Line((11, -10.9455, 0), (11, -16.4, 0)), color=Color.from_hex("#3f9c20"), width=0.114422, head=(0.369994, 0.158688))
add(5, 'label', Point(9.4, -13.6727, 0), color=Color.from_hex("#3f9c20"), text='F3')
add(5, 'arrow', Line((11.4, -0.036364, 0), (11.4, 13.6, 0)), color=Color.from_hex("#3f9c20"), width=0.114422, head=(0.369994, 0.158688))
add(5, 'label', Point(13.15, 6.78182, 0), color=Color.from_hex("#3f9c20"), text='A 75.00')
add(5, 'point', Point(0.090909, -1.4, 0), color=Color.from_hex("#ffffff"), width=0.3219)
add(5, 'label', Point(-1.20909, -2.35, 0), color=Color.from_hex("#aaaaaa"), text='o')
add(5, 'arrow', Line((11.4, -16.4, 0), (11.4, -0.036364, 0)), color=Color.from_hex("#3f9c20"), width=0.114422, head=(0.369994, 0.158688))
add(5, 'label', Point(13.15, -8.21818, 0), color=Color.from_hex("#3f9c20"), text='B 90.00')
add(5, 'point', Point(21.9091, -9.58182, 0), color=Color.from_hex("#ffffff"), width=0.3219)
add(5, 'label', Point(23.2091, -10.5318, 0), color=Color.from_hex("#aaaaaa"), text='o′')
add(5, 'point', Point(11, -0.036364, 0), color=Color.from_hex("#ffffff"), width=0.30044)
add(5, 'label', Point(9.9, 0.913636, 0), color=Color.from_hex("#aaaaaa"), text='i')
add(5, 'segment', Line((0.090909, -17.8545, 0), (11, -17.8545, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(5, 'segment', Line((11, -17.8545, 0), (21.9091, -17.8545, 0)), color=Color.from_hex("#aaaaaa"), width=0.043848)
add(5, 'label', Point(11, -19.0045, 0), color=Color.from_hex("#aaaaaa"), text='both poles 60.00 kN from the load line  →  ΣH at the roller B = 0.00 kN')
add(5, 'segment', Line((0.090909, -1.4, 0), (11, 13.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.061805)
add(5, 'label', Point(4.89091, 6.1, 0), color=Color.from_hex("#aaaaaa"), text='1')
add(5, 'segment', Line((0.090909, -1.4, 0), (11, 2.69091, 0)), color=Color.from_hex("#1a1eb2"), width=0.061805)
add(5, 'label', Point(7.29091, 2.2, 0), color=Color.from_hex("#aaaaaa"), text='2')
add(5, 'segment', Line((0.090909, -1.4, 0), (11, -2.76364, 0)), color=Color.from_hex("#1a1eb2"), width=0.061805)
add(5, 'label', Point(3.36364, -0.909091, 0), color=Color.from_hex("#aaaaaa"), text='3')
add(5, 'segment', Line((0.090909, -1.4, 0), (11, -10.9455, 0)), color=Color.from_hex("#1a1eb2"), width=0.061805)
add(5, 'label', Point(8.6, -7.94545, 0), color=Color.from_hex("#aaaaaa"), text='4')
add(5, 'segment', Line((0.090909, -1.4, 0), (11, -0.036364, 0)), color=Color.from_hex("#ce4095"), width=0.061805)
add(5, 'label', Point(5.76364, 0.209091, 0), color=Color.from_hex("#aaaaaa"), text='5')
add(5, 'segment', Line((11, -16.4, 0), (21.9091, -9.58182, 0)), color=Color.from_hex("#1a1eb2"), width=0.061805)
add(5, 'label', Point(17.7636, -11.2727, 0), color=Color.from_hex("#aaaaaa"), text='6')
add(5, 'segment', Line((21.9091, -9.58182, 0), (11, -10.9455, 0)), color=Color.from_hex("#ce4095"), width=0.061805)
add(5, 'segment', Line((11, -0.036364, 0), (21.9091, -9.58182, 0)), color=Color.from_hex("#1a1eb2"), width=0.061805)

# step 7 — 15.2 A fourth load, and nothing drawn
add(7, 'polyline', Polyline([(-16.9273, -8, 0), (-16.9273, 3.11969, 0)]), color=Color.from_hex("#3f9c20"), dash=0.3422)
add(7, 'arrow', Line((-16.9273, -5.5, 0), (-16.9273, -8.3, 0)), color=Color.from_hex("#3f9c20"), width=0.158688, head=(0.547056, 0.211306))
add(7, 'label', Point(-21.8273, -7, 0), color=Color.from_hex("#3f9c20"), text='R = 165 at x̄ = 4.909 m')


if __name__ == "__main__":
    print("EX X · 15.1 + 15.2 — the roller that must not be pushed —", len(ops), "operations")
