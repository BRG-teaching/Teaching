"""EX X · 1.1–1.3 — the same 60 kN, three ways

Auto-generated from ops/exX2_1.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-15, -16, 0), text='1.1 — Form diagram 1:100')
add(0, 'label', Point(16, 21.4, 0), text='Force diagram — one closed polygon per joint')
add(0, 'label', Point(16, 19.8, 0), text='1 unit ≙ 14 kN  (sheet: 1 cm ≙ 10 kN)')
add(0, 'label', Point(-15, -17.8, 0), color=Color.from_hex("#aaaaaa"), text='one member short of a truss — this shape is found, not analysed')

# step 1 — The structure
add(1, 'polygon', Polygon([(-25.8047, -10.2604, 0), (-26.1953, -9.7396, 0), (-20.8639, -5.74105, 0), (-20.4733, -6.26185, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-26, -10, 0), (-20.6686, -6.00145, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(1, 'polygon', Polygon([(-20.6035, -6.26185, 0), (-20.7337, -5.74105, 0), (-15.4023, -4.4082, 0), (-15.2721, -4.929, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-20.6686, -6.00145, 0), (-15.3372, -4.6686, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(1, 'polygon', Polygon([(-15.4023, -4.929, 0), (-15.2721, -4.4082, 0), (-9.9407, -5.74105, 0), (-10.0709, -6.26185, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-15.3372, -4.6686, 0), (-10.0058, -6.00145, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(1, 'polygon', Polygon([(-10.2011, -6.26185, 0), (-9.8105, -5.74105, 0), (-4.4791, -9.7396, 0), (-4.8697, -10.2604, 0)]), color=Color.from_hex("#bdbfe8"))
add(1, 'segment', Line((-10.0058, -6.00145, 0), (-4.6744, -10, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(1, 'polygon', Polygon([(-26, -10.2604, 0), (-26, -9.7396, 0), (-4.6744, -9.7396, 0), (-4.6744, -10.2604, 0)]), color=Color.from_hex("#f0bcdb"))
add(1, 'segment', Line((-26, -10, 0), (-4.6744, -10, 0)), color=Color.from_hex("#ce4095"), width=0.141062)
add(1, 'point', Point(-26, -10, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-28.6, -11.4, 0), text='A')
add(1, 'point', Point(-20.6686, -6.00145, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-20.6686, -8.30145, 0), text='n1')
add(1, 'point', Point(-15.3372, -4.6686, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-15.3372, -6.9686, 0), text='n2')
add(1, 'point', Point(-10.0058, -6.00145, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-10.0058, -8.30145, 0), text='n3')
add(1, 'point', Point(-4.6744, -10, 0), color=Color.from_hex("#ffffff"), width=0.3441)
add(1, 'label', Point(-2.0744, -11.4, 0), text='B')
add(1, 'segment', Line((-27.08, -10.55, 0), (-27.7518, -9.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-26.36, -10.55, 0), (-27.0318, -9.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-25.64, -10.55, 0), (-26.3118, -9.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-24.92, -10.55, 0), (-25.5918, -9.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-24.2, -10.55, 0), (-24.8718, -9.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-5.7544, -10.55, 0), (-6.42615, -9.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-5.0344, -10.55, 0), (-5.70615, -9.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-4.3144, -10.55, 0), (-4.98615, -9.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-3.5944, -10.55, 0), (-4.26615, -9.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-2.8744, -10.55, 0), (-3.54615, -9.87825, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-6.5744, -11.5, 0), (-2.7744, -11.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.06696)
add(1, 'arrow', Line((-20.6686, -1.00145, 0), (-20.6686, -5.40145, 0)), color=Color.from_hex("#3f9c20"), width=0.169632, head=(0.584784, 0.225878))
add(1, 'label', Point(-17.8686, -0.50145, 0), color=Color.from_hex("#3f9c20"), text='30.0 kN')
add(1, 'arrow', Line((-15.3372, 0.3314, 0), (-15.3372, -4.0686, 0)), color=Color.from_hex("#3f9c20"), width=0.169632, head=(0.584784, 0.225878))
add(1, 'label', Point(-12.5372, 0.8314, 0), color=Color.from_hex("#3f9c20"), text='30.0 kN')
add(1, 'arrow', Line((-10.0058, -1.00145, 0), (-10.0058, -5.40145, 0)), color=Color.from_hex("#3f9c20"), width=0.169632, head=(0.584784, 0.225878))
add(1, 'label', Point(-7.2058, -0.50145, 0), color=Color.from_hex("#3f9c20"), text='30.0 kN')

# step 2 — Global equilibrium first
add(2, 'arrow', Line((-26, -14.8, 0), (-26, -11.2, 0)), color=Color.from_hex("#3f9c20"), width=0.122314, head=(0.39551, 0.169632))
add(2, 'label', Point(-29.8, -14.8, 0), color=Color.from_hex("#3f9c20"), text='A = 45.00')
add(2, 'arrow', Line((-4.6744, -14.8, 0), (-4.6744, -11.2, 0)), color=Color.from_hex("#3f9c20"), width=0.122314, head=(0.39551, 0.169632))
add(2, 'label', Point(-0.8744, -14.8, 0), color=Color.from_hex("#3f9c20"), text='B = 45.00')

# step 3 — Find the shape
add(3, 'label', Point(-15, -19.5, 0), color=Color.from_hex("#b9b9bd"), text='no zero-force members')
add(3, 'label', Point(-24.7449, -6.11993, 0), color=Color.from_hex("#1a1eb2"), text='-75.0')
add(3, 'label', Point(-18.5454, -3.16498, 0), color=Color.from_hex("#1a1eb2"), text='-61.8')
add(3, 'label', Point(-12.129, -3.16498, 0), color=Color.from_hex("#1a1eb2"), text='-61.8')
add(3, 'label', Point(-5.9295, -6.11993, 0), color=Color.from_hex("#1a1eb2"), text='-75.0')
add(3, 'label', Point(-15.3372, -12.2208, 0), color=Color.from_hex("#ce4095"), text='60.0')
add(3, 'polyline', Polyline([(-27, -4.6686, 0), (-3.6744, -4.6686, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3658)
add(3, 'label', Point(0.1256, -4.6686, 0), color=Color.from_hex("#aaaaaa"), text='truss depth 2.6657 m')
add(3, 'segment', Line((-14.7372, -10, 0), (-14.7372, -4.6686, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(3, 'label', Point(-11.7572, -8.18732, 0), color=Color.from_hex("#aaaaaa"), text='crown 2.6657 m')

# step 4 — The force diagram
add(4, 'segment', Line((8, 13, 0), (3.71429, 9.78571, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((3.71429, 9.78571, 0), (8, 9.78571, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((8, 9.78571, 0), (8, 13, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((8, 13, 0), (3.71429, 9.78571, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((3.71429, 9.78571, 0), (8, 9.78571, 0)), color=Color.from_hex("#ce4095"), width=0.119903)
add(4, 'segment', Line((8, 9.78571, 0), (8, 13, 0)), color=Color.from_hex("#3f9c20"), width=0.119903)
add(4, 'point', Point(8, 13, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(8, 17.4, 0), color=Color.from_hex("#aaaaaa"), text='joint A')
add(4, 'segment', Line((24, 13, 0), (19.7143, 11.9286, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((19.7143, 11.9286, 0), (19.7143, 9.78571, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((19.7143, 9.78571, 0), (24, 13, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((24, 13, 0), (19.7143, 11.9286, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((19.7143, 11.9286, 0), (19.7143, 9.78571, 0)), color=Color.from_hex("#3f9c20"), width=0.119903)
add(4, 'segment', Line((19.7143, 9.78571, 0), (24, 13, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'point', Point(24, 13, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(24, 17.4, 0), color=Color.from_hex("#aaaaaa"), text='joint n1')
add(4, 'segment', Line((8, 4, 0), (8, 1.85714, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((8, 1.85714, 0), (12.2857, 2.92857, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((12.2857, 2.92857, 0), (8, 4, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((8, 4, 0), (8, 1.85714, 0)), color=Color.from_hex("#3f9c20"), width=0.119903)
add(4, 'segment', Line((8, 1.85714, 0), (12.2857, 2.92857, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((12.2857, 2.92857, 0), (8, 4, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'point', Point(8, 4, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(8, 8.4, 0), color=Color.from_hex("#aaaaaa"), text='joint n2')
add(4, 'segment', Line((24, 4, 0), (24, 1.85714, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((24, 1.85714, 0), (28.2857, 0.785714, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((28.2857, 0.785714, 0), (24, 4, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((24, 4, 0), (24, 1.85714, 0)), color=Color.from_hex("#3f9c20"), width=0.119903)
add(4, 'segment', Line((24, 1.85714, 0), (28.2857, 0.785714, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((28.2857, 0.785714, 0), (24, 4, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'point', Point(24, 4, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(24, 8.4, 0), color=Color.from_hex("#aaaaaa"), text='joint n3')
add(4, 'segment', Line((8, -5, 0), (12.2857, -8.21429, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((12.2857, -8.21429, 0), (12.2857, -5, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((12.2857, -5, 0), (8, -5, 0)), color=Color.from_hex("#aaaaaa"), width=0.103565)
add(4, 'segment', Line((8, -5, 0), (12.2857, -8.21429, 0)), color=Color.from_hex("#1a1eb2"), width=0.119903)
add(4, 'segment', Line((12.2857, -8.21429, 0), (12.2857, -5, 0)), color=Color.from_hex("#3f9c20"), width=0.119903)
add(4, 'segment', Line((12.2857, -5, 0), (8, -5, 0)), color=Color.from_hex("#ce4095"), width=0.119903)
add(4, 'point', Point(8, -5, 0), color=Color.from_hex("#ffffff"), width=0.27528)
add(4, 'label', Point(8, -0.6, 0), color=Color.from_hex("#aaaaaa"), text='joint B')


if __name__ == "__main__":
    print("EX X · 1.1–1.3 — the same 60 kN, three ways —", len(ops), "operations")
