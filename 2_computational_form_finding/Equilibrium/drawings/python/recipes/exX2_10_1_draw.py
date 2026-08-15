"""EX X · 10.1 — the windward foot is held down

Auto-generated from ops/exX2_10_1.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-10.185, 1, 0), text='Lageplan 1:100 — the given internal force distribution')
add(0, 'label', Point(15.5, 14.6, 0), text='Kräfteplan — force diagram, one closed polygon per node')
add(0, 'label', Point(15.5, 13, 0), text='1 drawing unit ≙ 13 kN   (the sheet says 1 cm ≙ 10 kN)')

# step 1 — The frame
add(1, 'polygon', Polygon([(-20.8514, -1.87829, 0), (-20.8514, -2.65577, 0), (-18.4772, -2.95475, 0), (-19.264, -9.2, 0), (-17.936, -9.2, 0), (-16.7782, -4.72454, 0), (-14.5197, -3.20819, 0), (-10.2758, -3.20819, 0), (-8.0169, -4.72454, 0), (-6.85909, -9.2, 0), (-5.53134, -9.2, 0), (-6.31822, -2.95475, 0), (-3.94371, -2.65577, 0), (-3.94371, -1.87829, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.12)
add(1, 'segment', Line((-20.8514, -1.87829, 0), (-20.8514, -2.65577, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((-20.8514, -2.65577, 0), (-18.4772, -2.95475, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((-18.4772, -2.95475, 0), (-19.264, -9.2, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((-19.264, -9.2, 0), (-17.936, -9.2, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((-17.936, -9.2, 0), (-16.7782, -4.72454, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((-16.7782, -4.72454, 0), (-14.5197, -3.20819, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((-14.5197, -3.20819, 0), (-10.2758, -3.20819, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((-10.2758, -3.20819, 0), (-8.0169, -4.72454, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((-8.0169, -4.72454, 0), (-6.85909, -9.2, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((-6.85909, -9.2, 0), (-5.53134, -9.2, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((-5.53134, -9.2, 0), (-6.31822, -2.95475, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((-6.31822, -2.95475, 0), (-3.94371, -2.65577, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((-3.94371, -2.65577, 0), (-3.94371, -1.87829, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((-3.94371, -1.87829, 0), (-20.8514, -1.87829, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((-19.62, -9.75, 0), (-20.2918, -9.07825, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-18.94, -9.75, 0), (-19.6118, -9.07825, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-18.26, -9.75, 0), (-18.9318, -9.07825, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-17.58, -9.75, 0), (-18.2518, -9.07825, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-16.9, -9.75, 0), (-17.5718, -9.07825, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-7.2153, -9.75, 0), (-7.88705, -9.07825, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-6.5353, -9.75, 0), (-7.20705, -9.07825, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-5.8553, -9.75, 0), (-6.52705, -9.07825, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-5.1753, -9.75, 0), (-5.84705, -9.07825, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-4.4953, -9.75, 0), (-5.16705, -9.07825, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)

# step 2 — What is given
add(2, 'segment', Line((-18.6, -9.2, 0), (-18.4787, -4.46087, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(2, 'segment', Line((-18.4787, -4.46087, 0), (-16.2253, -2.17942, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(2, 'segment', Line((-18.6, -9.2, 0), (-16.2253, -2.17942, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(2, 'segment', Line((-18.4787, -4.46087, 0), (-12.3977, -2.17942, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(2, 'segment', Line((-16.2253, -2.17942, 0), (-12.3977, -2.17942, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(2, 'segment', Line((-12.3977, -2.17942, 0), (-6.52035, -2.17942, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(2, 'segment', Line((-12.3977, -2.17942, 0), (-8.0136, -3.82414, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(2, 'segment', Line((-6.52035, -2.17942, 0), (-8.0136, -3.82414, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(2, 'segment', Line((-6.52035, -2.17942, 0), (-6.1953, -9.2, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(2, 'segment', Line((-8.0136, -3.82414, 0), (-6.1953, -9.2, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(2, 'point', Point(-18.6, -9.2, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(2, 'label', Point(-18.6, -11.2, 0), text='P1')
add(2, 'point', Point(-18.4787, -4.46087, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(2, 'label', Point(-20.6787, -5.86087, 0), text='P2')
add(2, 'point', Point(-16.2253, -2.17942, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(2, 'label', Point(-16.9253, -0.779415, 0), text='P3')
add(2, 'point', Point(-12.3977, -2.17942, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(2, 'label', Point(-12.3977, -0.779415, 0), text='P4')
add(2, 'point', Point(-6.52035, -2.17942, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(2, 'label', Point(-4.62035, -1.27941, 0), text='P5')
add(2, 'point', Point(-8.0136, -3.82414, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(2, 'label', Point(-6.1136, -3.22413, 0), text='P6')
add(2, 'point', Point(-6.1953, -9.2, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(2, 'label', Point(-5.1953, -11.2, 0), text='P7')
add(2, 'circle', Circle(0.5016, frame=Frame((-16.7807, -3.81737, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#111111"))
add(2, 'polyline', Polyline([(-22.3514, -2.19658, 0), (-2.5953, -2.19658, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(2, 'arrow', Line((-25.5514, -2.19658, 0), (-21.3514, -2.19658, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(2, 'label', Point(-23.4514, -0.696575, 0), color=Color.from_hex("#3f9c20"), text='Q_d = 35.0 kN')

# step 3 — Global equilibrium first
add(3, 'arrow', Line((-15.8192, -6.0524, 0), (-17.9379, -8.45057, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(3, 'label', Point(-22, -10.5, 0), color=Color.from_hex("#3f9c20"), text='26.43')
add(3, 'arrow', Line((-3.41454, -12.3476, 0), (-5.53322, -9.94943, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(3, 'label', Point(-2.5953, -10.3, 0), color=Color.from_hex("#3f9c20"), text='26.43')
add(3, 'segment', Line((-3.7953, -9.2, 0), (-3.7953, -2.17942, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(3, 'segment', Line((-18.6, -11.9, 0), (-6.1953, -11.9, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(3, 'label', Point(-0.8953, -5.68971, 0), color=Color.from_hex("#aaaaaa"), text='4.255 m')
add(3, 'label', Point(-12.3977, -11.2, 0), color=Color.from_hex("#aaaaaa"), text='base 7.518 m')
add(3, 'arrow', Line((12.6538, -14.2381, 0), (15.3462, -14.2381, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(3, 'arrow', Line((15.3462, -14.2381, 0), (14, -15.7619, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(3, 'arrow', Line((14, -15.7619, 0), (12.6538, -14.2381, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(3, 'label', Point(14, -12.2381, 0), color=Color.from_hex("#aaaaaa"), text='global: Q_d + R(P1) + R(P7) closes')

# step 4 — Close the left half
add(4, 'label', Point(-21.1688, -7.94871, 0), color=Color.from_hex("#1a1eb2"), text='1: 34.6')
add(4, 'label', Point(-19.2018, -1.49307, 0), color=Color.from_hex("#1a1eb2"), text='2: 76.4')
add(4, 'label', Point(-19.8748, -3.91804, 0), color=Color.from_hex("#ce4095"), text='3: 57.4')
add(4, 'label', Point(-14.5952, -5.56721, 0), color=Color.from_hex("#ce4095"), text='4: 56.4')
add(4, 'label', Point(-14.3115, -4.47942, 0), color=Color.from_hex("#1a1eb2"), text='5: 35.3')
add(4, 'label', Point(4.5, 7.79042, 0), text='P1: R(P1) + 3 + 1')
add(4, 'arrow', Line((5.13908, 3.43332, 0), (3.79292, 1.90958, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((3.79292, 1.90958, 0), (5.20707, 6.09042, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((5.20707, 6.09042, 0), (5.13908, 3.43332, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((5.13908, 3.43332, 0), (5.13908, 3.43332, 0)), color=Color.from_hex("#aaaaaa"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((5.13908, 3.43332, 0), (5.13908, 3.43332, 0)), color=Color.from_hex("#aaaaaa"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'label', Point(14, 7.79042, 0), text='P2: 1 + 4 + 2')
add(4, 'arrow', Line((11.9353, 1.90958, 0), (12.0033, 4.56668, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((12.0033, 4.56668, 0), (16.0647, 6.09042, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((16.0647, 6.09042, 0), (11.9353, 1.90958, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((11.9353, 1.90958, 0), (11.9353, 1.90958, 0)), color=Color.from_hex("#aaaaaa"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((11.9353, 1.90958, 0), (11.9353, 1.90958, 0)), color=Color.from_hex("#aaaaaa"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'label', Point(23.5, 7.79042, 0), text='P3: 2 + 3 + 5')
add(4, 'arrow', Line((21.4353, 1.90958, 0), (25.5647, 6.09042, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((25.5647, 6.09042, 0), (24.1506, 1.90958, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((24.1506, 1.90958, 0), (21.4353, 1.90958, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((21.4353, 1.90958, 0), (21.4353, 1.90958, 0)), color=Color.from_hex("#aaaaaa"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((21.4353, 1.90958, 0), (21.4353, 1.90958, 0)), color=Color.from_hex("#aaaaaa"), width=0.110477, head=(0.357235, 0.153216))

# step 5 — Close the right half
add(5, 'label', Point(-9.459, -4.07942, 0), color=Color.from_hex("#ce4095"), text='6: 35.3')
add(5, 'label', Point(-11.2243, -5.71699, 0), color=Color.from_hex("#1a1eb2"), text='7: 56.4')
add(5, 'label', Point(-4.74969, -5.28723, 0), color=Color.from_hex("#1a1eb2"), text='8: 50.0')
add(5, 'label', Point(-3.84187, -3.81431, 0), color=Color.from_hex("#ce4095"), text='9: 37.0')
add(5, 'label', Point(-9.75684, -7.4092, 0), color=Color.from_hex("#1a1eb2"), text='10: 60.0')
add(5, 'label', Point(4.5, -3.03813, 0), text='P4: Q_d + 4 + 7 + 6 + 5')
add(5, 'arrow', Line((5.8692, -4.73813, 0), (8.56151, -4.73813, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((8.56151, -4.73813, 0), (4.50007, -6.26187, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((4.50007, -6.26187, 0), (0.438488, -4.73813, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((0.438488, -4.73813, 0), (3.15392, -4.73813, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((3.15392, -4.73813, 0), (5.8692, -4.73813, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'label', Point(14, -2.37712, 0), text='P5: 8 + 9 + 6')
add(5, 'arrow', Line((12.6423, -6.92288, 0), (15.226, -4.07712, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((15.226, -4.07712, 0), (15.3577, -6.92288, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((15.3577, -6.92288, 0), (12.6423, -6.92288, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((12.6423, -6.92288, 0), (12.6423, -6.92288, 0)), color=Color.from_hex("#aaaaaa"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((12.6423, -6.92288, 0), (12.6423, -6.92288, 0)), color=Color.from_hex("#aaaaaa"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'label', Point(23.5, -1.61525, 0), text='P6: 10 + 8 + 7')
add(5, 'arrow', Line((25.5308, -7.68475, 0), (24.0529, -3.31525, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((24.0529, -3.31525, 0), (21.4692, -6.161, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((21.4692, -6.161, 0), (25.5308, -7.68475, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((25.5308, -7.68475, 0), (25.5308, -7.68475, 0)), color=Color.from_hex("#aaaaaa"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((25.5308, -7.68475, 0), (25.5308, -7.68475, 0)), color=Color.from_hex("#aaaaaa"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'label', Point(4.5, -11.1153, 0), text='P7: R(P7) + 9 + 10')
add(5, 'arrow', Line((5.23895, -17.1847, 0), (3.8928, -15.661, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((3.8928, -15.661, 0), (3.76105, -12.8153, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((3.76105, -12.8153, 0), (5.23895, -17.1847, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((5.23895, -17.1847, 0), (5.23895, -17.1847, 0)), color=Color.from_hex("#aaaaaa"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((5.23895, -17.1847, 0), (5.23895, -17.1847, 0)), color=Color.from_hex("#aaaaaa"), width=0.110477, head=(0.357235, 0.153216))


if __name__ == "__main__":
    print("EX X · 10.1 — the windward foot is held down —", len(ops), "operations")
