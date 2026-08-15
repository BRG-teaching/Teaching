"""EX X · 3 — a shallow truss, and the price of being shallow

Auto-generated from ops/exX2_3.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-15, -15.8, 0), text='Form diagram 1:100 — the sheet prints no dimensions')
add(0, 'label', Point(16, 21.4, 0), text='Force diagram — one closed polygon per joint')
add(0, 'label', Point(16, 19.8, 0), text='1 unit ≙ 17 kN  (sheet: 1 cm ≙ 10 kN)')
add(0, 'label', Point(-15, -17.5, 0), color=Color.from_hex("#aaaaaa"), text='rise 2.941 m → rafter 85.68 kN, while the reactions stay at 25.00 kN')

# step 1 — The truss
add(1, 'polygon', Polygon([(-25.837, -10.2817, 0), (-26.163, -9.71826, 0), (-15.997, -3.83626, 0), (-15.671, -4.39974, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-26, -10, 0), (-15.834, -4.118, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(1, 'polygon', Polygon([(-15.997, -4.39974, 0), (-15.671, -3.83626, 0), (-5.50499, -9.71826, 0), (-5.83101, -10.2817, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-15.834, -4.118, 0), (-5.668, -10, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(1, 'polygon', Polygon([(-25.932, -10.2817, 0), (-26.068, -9.71826, 0), (-18.2, -7.81826, 0), (-18.064, -8.38174, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-26, -10, 0), (-18.132, -8.1, 0)), color=Color.from_hex("#ce4095"), width=0.141062)
add(1, 'polygon', Polygon([(-13.604, -8.38174, 0), (-13.468, -7.81826, 0), (-5.59996, -9.71826, 0), (-5.73604, -10.2817, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-13.536, -8.1, 0), (-5.668, -10, 0)), color=Color.from_hex("#ce4095"), width=0.141062)
add(1, 'polygon', Polygon([(-18.132, -8.34248, 0), (-18.132, -7.85752, 0), (-13.536, -7.85752, 0), (-13.536, -8.34248, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-18.132, -8.1, 0), (-13.536, -8.1, 0)), color=Color.from_hex("#ce4095"), width=0.141062)
add(1, 'polygon', Polygon([(-15.902, -4.07874, 0), (-15.766, -4.15726, 0), (-18.064, -8.13926, 0), (-18.2, -8.06074, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-15.834, -4.118, 0), (-18.132, -8.1, 0)), color=Color.from_hex("#ce4095"), width=0.141062)
add(1, 'polygon', Polygon([(-15.902, -4.15726, 0), (-15.766, -4.07874, 0), (-13.468, -8.06074, 0), (-13.604, -8.13926, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-15.834, -4.118, 0), (-13.536, -8.1, 0)), color=Color.from_hex("#ce4095"), width=0.141062)
add(1, 'point', Point(-26, -10, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-29, -10.6, 0), text='A')
add(1, 'point', Point(-18.132, -8.1, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-18.732, -10.5, 0), text='Ln')
add(1, 'point', Point(-15.834, -4.118, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-15.834, -1.518, 0), text='T')
add(1, 'point', Point(-13.536, -8.1, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-12.936, -10.5, 0), text='Rn')
add(1, 'point', Point(-5.668, -10, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-2.668, -10.6, 0), text='B')
add(1, 'segment', Line((-27.08, -10.55, 0), (-27.7518, -9.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-26.36, -10.55, 0), (-27.0318, -9.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-25.64, -10.55, 0), (-26.3118, -9.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-24.92, -10.55, 0), (-25.5918, -9.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-24.2, -10.55, 0), (-24.8718, -9.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-6.748, -10.55, 0), (-7.41975, -9.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-6.028, -10.55, 0), (-6.69975, -9.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-5.308, -10.55, 0), (-5.97975, -9.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-4.588, -10.55, 0), (-5.25975, -9.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-3.868, -10.55, 0), (-4.53975, -9.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-7.568, -11.5, 0), (-3.768, -11.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.06696)
add(1, 'arrow', Line((-15.834, 0.882, 0), (-15.834, -3.518, 0)), color=Color.from_hex("#3f9c20"), width=0.169632, head=(0.584784, 0.225878))
add(1, 'label', Point(-12.834, 1.382, 0), color=Color.from_hex("#3f9c20"), text='50.0 kN')

# step 2 — Global equilibrium
add(2, 'arrow', Line((-26, -14.8, 0), (-26, -11.2, 0)), color=Color.from_hex("#3f9c20"), width=0.122314, head=(0.39551, 0.169632))
add(2, 'label', Point(-29.8, -14.8, 0), color=Color.from_hex("#3f9c20"), text='A = 25.00')
add(2, 'arrow', Line((-5.668, -14.8, 0), (-5.668, -11.2, 0)), color=Color.from_hex("#3f9c20"), width=0.122314, head=(0.39551, 0.169632))
add(2, 'label', Point(-1.868, -14.8, 0), color=Color.from_hex("#3f9c20"), text='B = 25.00')

# step 3 — The member forces
add(3, 'label', Point(-15, -19.2, 0), color=Color.from_hex("#b9b9bd"), text='no zero-force members')
add(3, 'label', Point(-22.0944, -5.02407, 0), color=Color.from_hex("#1a1eb2"), text='-85.7')
add(3, 'label', Point(-9.5736, -5.02407, 0), color=Color.from_hex("#1a1eb2"), text='-85.7')
add(3, 'label', Point(-21.5309, -11.266, 0), color=Color.from_hex("#ce4095"), text='76.3')
add(3, 'label', Point(-10.1371, -11.266, 0), color=Color.from_hex("#ce4095"), text='76.3')
add(3, 'label', Point(-15.834, -10.285, 0), color=Color.from_hex("#ce4095"), text='63.8')
add(3, 'label', Point(-18.5915, -5.18075, 0), color=Color.from_hex("#ce4095"), text='20.7')
add(3, 'label', Point(-13.0765, -5.18075, 0), color=Color.from_hex("#ce4095"), text='20.7')

# step 4 — The force diagram
add(4, 'segment', Line((8, 13, 0), (3.67221, 10.496, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((3.67221, 10.496, 0), (8, 11.5411, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((8, 11.5411, 0), (8, 13, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((8, 13, 0), (3.67221, 10.496, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((3.67221, 10.496, 0), (8, 11.5411, 0)), color=Color.from_hex("#ce4095"), width=0.119903)
add(4, 'segment', Line((8, 11.5411, 0), (8, 13, 0)), color=Color.from_hex("#3f9c20"), width=0.119903)
add(4, 'point', Point(8, 13, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(8, 18.4, 0), color=Color.from_hex("#aaaaaa"), text='joint A')
add(4, 'segment', Line((24, 13, 0), (19.6722, 11.9549, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((19.6722, 11.9549, 0), (23.3969, 11.9549, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((23.3969, 11.9549, 0), (24, 13, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((24, 13, 0), (19.6722, 11.9549, 0)), color=Color.from_hex("#ce4095"), width=0.119903)
add(4, 'segment', Line((19.6722, 11.9549, 0), (23.3969, 11.9549, 0)), color=Color.from_hex("#ce4095"), width=0.119903)
add(4, 'segment', Line((23.3969, 11.9549, 0), (24, 13, 0)), color=Color.from_hex("#ce4095"), width=0.119903)
add(4, 'point', Point(24, 13, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(24, 18.4, 0), color=Color.from_hex("#aaaaaa"), text='joint Ln')
add(4, 'segment', Line((8, 1, 0), (7.39688, -0.045095, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((7.39688, -0.045095, 0), (7.39688, -2.96299, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((7.39688, -2.96299, 0), (8, -4.00808, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((8, -4.00808, 0), (12.3278, -1.50404, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((12.3278, -1.50404, 0), (8, 1, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((8, 1, 0), (7.39688, -0.045095, 0)), color=Color.from_hex("#ce4095"), width=0.119903)
add(4, 'segment', Line((7.39688, -0.045095, 0), (7.39688, -2.96299, 0)), color=Color.from_hex("#3f9c20"), width=0.119903)
add(4, 'segment', Line((7.39688, -2.96299, 0), (8, -4.00808, 0)), color=Color.from_hex("#ce4095"), width=0.119903)
add(4, 'segment', Line((8, -4.00808, 0), (12.3278, -1.50404, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((12.3278, -1.50404, 0), (8, 1, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'point', Point(8, 1, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(8, 6.4, 0), color=Color.from_hex("#aaaaaa"), text='joint T')
add(4, 'segment', Line((24, 1, 0), (28.3278, -0.045095, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((28.3278, -0.045095, 0), (27.7247, 1, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((27.7247, 1, 0), (24, 1, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((24, 1, 0), (28.3278, -0.045095, 0)), color=Color.from_hex("#ce4095"), width=0.119903)
add(4, 'segment', Line((28.3278, -0.045095, 0), (27.7247, 1, 0)), color=Color.from_hex("#ce4095"), width=0.119903)
add(4, 'segment', Line((27.7247, 1, 0), (24, 1, 0)), color=Color.from_hex("#ce4095"), width=0.119903)
add(4, 'point', Point(24, 1, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(24, 6.4, 0), color=Color.from_hex("#aaaaaa"), text='joint Rn')
add(4, 'segment', Line((8, -12, 0), (12.3278, -14.504, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((12.3278, -14.504, 0), (12.3278, -13.0451, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((12.3278, -13.0451, 0), (8, -12, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((8, -12, 0), (12.3278, -14.504, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((12.3278, -14.504, 0), (12.3278, -13.0451, 0)), color=Color.from_hex("#3f9c20"), width=0.119903)
add(4, 'segment', Line((12.3278, -13.0451, 0), (8, -12, 0)), color=Color.from_hex("#ce4095"), width=0.119903)
add(4, 'point', Point(8, -12, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(8, -6.6, 0), color=Color.from_hex("#aaaaaa"), text='joint B')


if __name__ == "__main__":
    print("EX X · 3 — a shallow truss, and the price of being shallow —", len(ops), "operations")
