"""EX 3.2 — Seilform: designing a cable form

Auto-generated from ops/ex3_2.json — the drawing as literal COMPAS
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
add(0, 'label', Point(0, 15.5, 0), text='Lageplan — form diagram')
add(0, 'label', Point(-22, -30, 0), text='Kräfteplan — force diagram')
add(0, 'label', Point(-22, -31.6, 0), text='1 unit :: 7 kN')

# step 1 — What is given
add(1, 'point', Point(-2, 3, 0), color=Color.from_hex("#ffffff"), width=0.5032)
add(1, 'label', Point(-3.8, 3.9, 0), text='A')
add(1, 'point', Point(36.259, 7.743, 0), color=Color.from_hex("#ffffff"), width=0.5032)
add(1, 'label', Point(38.059, 8.643, 0), text='B')
add(1, 'polyline', Polyline([(3.085, 9, 0), (3.085, -7, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.4012)
add(1, 'arrow', Line((3.085, 4.38401, 0), (3.085, 1.32686, 0)), color=Color.from_hex("#3f9c20"), width=0.186048, head=(0.641376, 0.247738))
add(1, 'label', Point(4.685, 3.75543, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(1, 'polyline', Polyline([(8.188, 9, 0), (8.188, -7, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.4012)
add(1, 'arrow', Line((8.188, 3.85607, 0), (8.188, -2.05821, 0)), color=Color.from_hex("#3f9c20"), width=0.186048, head=(0.641376, 0.247738))
add(1, 'label', Point(9.788, 1.79893, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(1, 'polyline', Polyline([(15.838, 9, 0), (15.838, -7, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.4012)
add(1, 'arrow', Line((15.838, 3.29472, 0), (15.838, -2.61957, 0)), color=Color.from_hex("#3f9c20"), width=0.186048, head=(0.641376, 0.247738))
add(1, 'label', Point(17.438, 1.23757, 0), color=Color.from_hex("#3f9c20"), text='F₃')
add(1, 'polyline', Polyline([(26.044, 9, 0), (26.044, -7, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.4012)
add(1, 'arrow', Line((26.044, 5.7099, 0), (26.044, 2.65275, 0)), color=Color.from_hex("#3f9c20"), width=0.186048, head=(0.641376, 0.247738))
add(1, 'label', Point(27.644, 5.08132, 0), color=Color.from_hex("#3f9c20"), text='F₄')

# step 2 — The load line
add(2, 'arrow', Line((-14, -9, 0), (-14, -11.8571, 0)), color=Color.from_hex("#3f9c20"), width=0.186048, head=(0.641376, 0.247738))
add(2, 'label', Point(-12.1, -10.4286, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(2, 'arrow', Line((-14, -11.8571, 0), (-14, -17.5714, 0)), color=Color.from_hex("#3f9c20"), width=0.186048, head=(0.641376, 0.247738))
add(2, 'label', Point(-12.1, -14.7143, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(2, 'arrow', Line((-14, -17.5714, 0), (-14, -23.2857, 0)), color=Color.from_hex("#3f9c20"), width=0.186048, head=(0.641376, 0.247738))
add(2, 'label', Point(-12.1, -20.4286, 0), color=Color.from_hex("#3f9c20"), text='F₃')
add(2, 'arrow', Line((-14, -23.2857, 0), (-14, -26.1429, 0)), color=Color.from_hex("#3f9c20"), width=0.186048, head=(0.641376, 0.247738))
add(2, 'label', Point(-12.1, -24.7143, 0), color=Color.from_hex("#3f9c20"), text='F₄')

# step 3 — The auxiliary construction
add(3, 'point', Point(-22, -17.5714, 0), color=Color.from_hex("#ffffff"), width=0.35224, until=6)
add(3, 'label', Point(-23.3, -16.8714, 0), text='o′', until=6)
add(3, 'segment', Line((-22, -17.5714, 0), (-14, -9, 0)), color=Color.from_hex("#aaaaaa"), width=0.072461, until=6)
add(3, 'segment', Line((-22, -17.5714, 0), (-14, -11.8571, 0)), color=Color.from_hex("#aaaaaa"), width=0.072461, until=6)
add(3, 'segment', Line((-22, -17.5714, 0), (-14, -17.5714, 0)), color=Color.from_hex("#aaaaaa"), width=0.072461, until=6)
add(3, 'segment', Line((-22, -17.5714, 0), (-14, -23.2857, 0)), color=Color.from_hex("#aaaaaa"), width=0.072461, until=6)
add(3, 'segment', Line((-22, -17.5714, 0), (-14, -26.1429, 0)), color=Color.from_hex("#aaaaaa"), width=0.072461, until=6)
add(3, 'segment', Line((3.085, -1.5, 0), (8.188, 2.145, 0)), color=Color.from_hex("#aaaaaa"), width=0.113587, until=6)
add(3, 'segment', Line((8.188, 2.145, 0), (15.838, 2.145, 0)), color=Color.from_hex("#aaaaaa"), width=0.113587, until=6)
add(3, 'segment', Line((15.838, 2.145, 0), (26.044, -5.145, 0)), color=Color.from_hex("#aaaaaa"), width=0.113587, until=6)
add(3, 'polyline', Polyline([(12.8635, 8.97696, 0), (3.085, -1.5, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.4012, until=6)
add(3, 'polyline', Polyline([(26.044, -5.145, 0), (12.8635, 8.97696, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.4012, until=6)

# step 4 — The resultant
add(4, 'point', Point(12.8635, 8.97696, 0), color=Color.from_hex("#ffffff"), width=0.40256, until=6)
add(4, 'polyline', Polyline([(12.8635, 10, 0), (12.8635, -8, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.4012)
add(4, 'arrow', Line((12.8635, 8, 0), (12.8635, -9.14286, 0)), color=Color.from_hex("#3f9c20"), width=0.213955, dash=0.64192, head=(0.641376, 0.247738))
add(4, 'arrow', Line((-15.2444, -9, 0), (-15.2444, -26.1429, 0)), color=Color.from_hex("#3f9c20"), width=0.213955, dash=0.64192, head=(0.641376, 0.247738))
add(4, 'label', Point(14.5635, -0.571429, 0), color=Color.from_hex("#3f9c20"), text='R')
add(4, 'label', Point(-17.0444, -17.5714, 0), color=Color.from_hex("#3f9c20"), text='R')

# step 5 — Now choose: the thrust H
add(5, 'point', Point(-4.31429, -18.2822, 0), color=Color.from_hex("#ffffff"), width=0.40256)
add(5, 'label', Point(-2.81429, -17.6822, 0), text='o')
add(5, 'segment', Line((-14, -7, 0), (-4.31429, -7, 0)), color=Color.from_hex("#aaaaaa"), width=0.051408)
add(5, 'label', Point(-9.15714, -5.9, 0), color=Color.from_hex("#aaaaaa"), text='H = 67.8 kN')

# step 6 — Global equilibrium
add(6, 'arrow', Line((-2, 3, 0), (-7.19831, 7.98172, 0)), color=Color.from_hex("#3f9c20"), width=0.13415, head=(0.433786, 0.186048))
add(6, 'arrow', Line((-5.55869, -18.2822, 0), (-15.2444, -9, 0)), color=Color.from_hex("#3f9c20"), width=0.13415, head=(0.433786, 0.186048))
add(6, 'label', Point(-8.59831, 8.78172, 0), color=Color.from_hex("#3f9c20"), text='A')
add(6, 'arrow', Line((36.259, 7.743, 0), (41.8495, 12.2802, 0)), color=Color.from_hex("#3f9c20"), width=0.13415, head=(0.433786, 0.186048))
add(6, 'arrow', Line((-15.2444, -26.1429, 0), (-5.55869, -18.2822, 0)), color=Color.from_hex("#3f9c20"), width=0.13415, head=(0.433786, 0.186048))
add(6, 'label', Point(43.2495, 13.0802, 0), color=Color.from_hex("#3f9c20"), text='B')

# step 7 — The cable segments
add(7, 'segment', Line((-2, 3, 0), (3.085, -1.87314, 0)), color=Color.from_hex("#ce4095"), width=0.154714)
add(7, 'segment', Line((-4.31429, -18.2822, 0), (-14, -9, 0)), color=Color.from_hex("#ce4095"), width=0.072461)
add(7, 'label', Point(-9.15714, -12.7411, 0), color=Color.from_hex("#ce4095"), text='94')
add(7, 'segment', Line((3.085, -1.87314, 0), (8.188, -5.25821, 0)), color=Color.from_hex("#ce4095"), width=0.154714)
add(7, 'segment', Line((-4.31429, -18.2822, 0), (-14, -11.8571, 0)), color=Color.from_hex("#ce4095"), width=0.072461)
add(7, 'label', Point(-9.15714, -14.1697, 0), color=Color.from_hex("#ce4095"), text='81')
add(7, 'segment', Line((8.188, -5.25821, 0), (15.838, -5.81957, 0)), color=Color.from_hex("#ce4095"), width=0.154714)
add(7, 'segment', Line((-4.31429, -18.2822, 0), (-14, -17.5714, 0)), color=Color.from_hex("#ce4095"), width=0.072461)
add(7, 'label', Point(-9.15714, -17.0268, 0), color=Color.from_hex("#ce4095"), text='68')
add(7, 'segment', Line((15.838, -5.81957, 0), (26.044, -0.547247, 0)), color=Color.from_hex("#ce4095"), width=0.154714)
add(7, 'segment', Line((-4.31429, -18.2822, 0), (-14, -23.2857, 0)), color=Color.from_hex("#ce4095"), width=0.072461)
add(7, 'label', Point(-9.15714, -19.8839, 0), color=Color.from_hex("#ce4095"), text='76')
add(7, 'segment', Line((26.044, -0.547247, 0), (36.259, 7.743, 0)), color=Color.from_hex("#ce4095"), width=0.154714)
add(7, 'segment', Line((-4.31429, -18.2822, 0), (-14, -26.1429, 0)), color=Color.from_hex("#ce4095"), width=0.072461)
add(7, 'label', Point(-9.15714, -21.3125, 0), color=Color.from_hex("#ce4095"), text='87')

# step 8 — The governing force
add(8, 'polygon', Polygon([(-2.32488, 2.661, 0), (-1.67512, 3.339, 0), (3.40988, -1.53414, 0), (2.76012, -2.21214, 0)]), color=Color.from_hex("#ce4095"))
add(8, 'polygon', Polygon([(2.86012, -2.21214, 0), (3.30988, -1.53414, 0), (8.41288, -4.91921, 0), (7.96312, -5.59721, 0)]), color=Color.from_hex("#ce4095"))
add(8, 'polygon', Polygon([(8.16312, -5.59721, 0), (8.21288, -4.91921, 0), (15.8629, -5.48057, 0), (15.8131, -6.15857, 0)]), color=Color.from_hex("#ce4095"))
add(8, 'polygon', Polygon([(16.0131, -6.15857, 0), (15.6629, -5.48057, 0), (25.8689, -0.208247, 0), (26.2191, -0.886247, 0)]), color=Color.from_hex("#ce4095"))
add(8, 'polygon', Polygon([(26.3191, -0.886247, 0), (25.7689, -0.208247, 0), (35.9839, 8.082, 0), (36.5341, 7.404, 0)]), color=Color.from_hex("#ce4095"))
add(8, 'segment', Line((-2, 3, 0), (3.085, -1.87314, 0)), color=Color.from_hex("#ce4095"), width=0.324899)
add(8, 'label', Point(-1.9575, -1.13657, 0), color=Color.from_hex("#ce4095"), text='N_d,max = 94 kN')


if __name__ == "__main__":
    print("EX 3.2 — Seilform: designing a cable form —", len(ops), "operations")
