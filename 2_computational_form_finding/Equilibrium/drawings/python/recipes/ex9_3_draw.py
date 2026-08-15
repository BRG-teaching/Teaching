"""EX 9.3 — one load, followed all the way down

Auto-generated from ops/ex9_3.json — the drawing as literal COMPAS
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
add(0, 'label', Point(8.75, 14, 0), text='Grundriss 1:500 — floor plan')
add(0, 'label', Point(-12.75, -9.8, 0), text='subsystem B — two longitudinal beams — Ansicht 1:200, span 24.50 m')
add(0, 'label', Point(14, -15.6, 0), text='Kräfteplan — force diagram')

# step 1 — The structure
add(1, 'segment', Line((2.5, 12.4, 0), (15, 12.4, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((15, 12.4, 0), (15, 4.9, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((15, 4.9, 0), (2.5, 4.9, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((2.5, 4.9, 0), (2.5, 12.4, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'polyline', Polyline([(3.75, 12.4, 0), (3.75, 4.9, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'polyline', Polyline([(6.25, 12.4, 0), (6.25, 4.9, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'polyline', Polyline([(8.75, 12.4, 0), (8.75, 4.9, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'polyline', Polyline([(11.25, 12.4, 0), (11.25, 4.9, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'polyline', Polyline([(13.75, 12.4, 0), (13.75, 4.9, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'polyline', Polyline([(2.5, 12.275, 0), (15, 12.275, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'polyline', Polyline([(2.5, 5.025, 0), (15, 5.025, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(1, 'polygon', Polygon([(2.5, 12.4, 0), (2.75, 12.4, 0), (2.75, 12.15, 0), (2.5, 12.15, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(14.75, 12.4, 0), (15, 12.4, 0), (15, 12.15, 0), (14.75, 12.15, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(2.5, 5.15, 0), (2.75, 5.15, 0), (2.75, 4.9, 0), (2.5, 4.9, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(14.75, 5.15, 0), (15, 5.15, 0), (15, 4.9, 0), (14.75, 4.9, 0)]), color=Color.from_hex("#111111"))

# step 3 — a) Tributary width
add(3, 'polygon', Polygon([(7.5, 12.4, 0), (10, 12.4, 0), (10, 4.9, 0), (7.5, 4.9, 0)]), color=Color.from_hex("#3f9c20"), opacity=0.16)
add(3, 'segment', Line((7.5, 12.4, 0), (7.5, 4.9, 0)), color=Color.from_hex("#3f9c20"), width=0.06048)
add(3, 'segment', Line((10, 12.4, 0), (10, 4.9, 0)), color=Color.from_hex("#3f9c20"), width=0.06048)
add(3, 'label', Point(8.75, 8.65, 0), color=Color.from_hex("#3f9c20"), text='5.00 × 15.00 = 75.0 m²')

# step 4 — b) Subsystem A
add(4, 'segment', Line((-24, -4.8, 0), (-1.5, -4.8, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(4, 'segment', Line((-1.5, -4.8, 0), (-1.5, -2.1, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(4, 'segment', Line((-1.5, -2.1, 0), (-24, -2.1, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(4, 'segment', Line((-24, -2.1, 0), (-24, -4.8, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(4, 'polyline', Polyline([(-24, -1.65, 0), (-1.5, -1.65, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3304)
add(4, 'point', Point(-23.775, -4.8, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(4, 'segment', Line((-24.735, -5.3, 0), (-25.3714, -4.6636, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(4, 'segment', Line((-24.095, -5.3, 0), (-24.7314, -4.6636, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(4, 'segment', Line((-23.455, -5.3, 0), (-24.0914, -4.6636, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(4, 'segment', Line((-22.815, -5.3, 0), (-23.4514, -4.6636, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(4, 'segment', Line((-22.175, -5.3, 0), (-22.8114, -4.6636, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(4, 'point', Point(-1.725, -4.8, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(4, 'segment', Line((-2.685, -5.3, 0), (-3.3214, -4.6636, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(4, 'segment', Line((-2.045, -5.3, 0), (-2.6814, -4.6636, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(4, 'segment', Line((-1.405, -5.3, 0), (-2.0414, -4.6636, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(4, 'segment', Line((-0.765, -5.3, 0), (-1.4014, -4.6636, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(4, 'segment', Line((-0.125, -5.3, 0), (-0.761396, -4.6636, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(4, 'label', Point(-25.44, 0.06, 0), color=Color.from_hex("#3f9c20"), text='5 × 50.625 kN')
add(4, 'arrow', Line((-21.75, 0.6, 0), (-21.75, -1.785, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(4, 'label', Point(-20.76, -0.3, 0), color=Color.from_hex("#3f9c20"), text='50.63')
add(4, 'arrow', Line((-17.25, 0.6, 0), (-17.25, -1.785, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(4, 'label', Point(-16.26, -0.3, 0), color=Color.from_hex("#3f9c20"), text='50.63')
add(4, 'arrow', Line((-12.75, 0.6, 0), (-12.75, -1.785, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(4, 'label', Point(-11.76, -0.3, 0), color=Color.from_hex("#3f9c20"), text='50.63')
add(4, 'arrow', Line((-8.25, 0.6, 0), (-8.25, -1.785, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(4, 'label', Point(-7.26, -0.3, 0), color=Color.from_hex("#3f9c20"), text='50.63')
add(4, 'arrow', Line((-3.75, 0.6, 0), (-3.75, -1.785, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(4, 'label', Point(-2.76, -0.3, 0), color=Color.from_hex("#3f9c20"), text='50.63')

# step 5 — c) What lands on subsystem B
add(5, 'arrow', Line((-23.775, -9.4, 0), (-23.775, -5.8, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'label', Point(-27.375, -8, 0), color=Color.from_hex("#3f9c20"), text='126.56')
add(5, 'arrow', Line((-1.725, -9.4, 0), (-1.725, -5.8, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'label', Point(1.875, -8, 0), color=Color.from_hex("#3f9c20"), text='126.56')
add(5, 'arrow', Line((15, 2.6, 0), (15, 0.490625, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((15, 0.490625, 0), (15, -1.61875, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((15, -1.61875, 0), (15, -3.72812, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((15, -3.72812, 0), (15, -5.8375, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((15, -5.8375, 0), (15, -7.94688, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'label', Point(18.4, -2.67344, 0), color=Color.from_hex("#3f9c20"), text='load line 253.13 kN')

# step 6 — c) The 310 kN fixes the shape
add(6, 'segment', Line((-23.775, -4.8, 0), (-21.75, -3.89434, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'segment', Line((-21.75, -3.89434, 0), (-17.25, -2.68681, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'segment', Line((-17.25, -2.68681, 0), (-12.75, -2.28429, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'segment', Line((-12.75, -2.28429, 0), (-8.25, -2.68681, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'segment', Line((-8.25, -2.68681, 0), (-3.75, -3.89434, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'segment', Line((-3.75, -3.89434, 0), (-1.725, -4.8, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'segment', Line((-23.775, -4.8, 0), (-1.725, -4.8, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(6, 'label', Point(-12.75, -6.24, 0), color=Color.from_hex("#ce4095"), text='tie 282.99 kN tension')
add(6, 'segment', Line((-21.75, -2.1, 0), (-21.75, -3.89434, 0)), color=Color.from_hex("#1a1eb2"), width=0.06048)
add(6, 'segment', Line((-17.25, -2.1, 0), (-17.25, -2.68681, 0)), color=Color.from_hex("#1a1eb2"), width=0.06048)
add(6, 'segment', Line((-12.75, -2.1, 0), (-12.75, -2.28429, 0)), color=Color.from_hex("#1a1eb2"), width=0.06048)
add(6, 'segment', Line((-8.25, -2.1, 0), (-8.25, -2.68681, 0)), color=Color.from_hex("#1a1eb2"), width=0.06048)
add(6, 'segment', Line((-3.75, -2.1, 0), (-3.75, -3.89434, 0)), color=Color.from_hex("#1a1eb2"), width=0.06048)
add(6, 'segment', Line((-12.21, -4.8, 0), (-12.21, -2.28429, 0)), color=Color.from_hex("#3f9c20"), width=0.042336)
add(6, 'label', Point(-10.41, -3.54215, 0), color=Color.from_hex("#3f9c20"), text='f = 2.795 m in 3.00 m ✓')
add(6, 'point', Point(3.20885, -2.67344, 0), color=Color.from_hex("#ffffff"), width=0.33152)
add(6, 'label', Point(1.80885, -1.87344, 0), text='o')
add(6, 'segment', Line((15, 4.2, 0), (3.20885, 4.2, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(6, 'label', Point(9.10443, 5.3, 0), color=Color.from_hex("#aaaaaa"), text='H = 282.99 kN')
add(6, 'segment', Line((3.20885, -2.67344, 0), (15, 2.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(6, 'segment', Line((3.20885, -2.67344, 0), (15, 0.490625, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(6, 'segment', Line((3.20885, -2.67344, 0), (15, -1.61875, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(6, 'segment', Line((3.20885, -2.67344, 0), (15, -3.72812, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(6, 'segment', Line((3.20885, -2.67344, 0), (15, -5.8375, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(6, 'segment', Line((3.20885, -2.67344, 0), (15, -7.94688, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)

# step 7 — c) The chords
add(7, 'label', Point(-22.7625, -2.94717, 0), color=Color.from_hex("#1a1eb2"), text='310.0')
add(7, 'label', Point(-19.5, -1.89057, 0), color=Color.from_hex("#1a1eb2"), text='293.0')
add(7, 'label', Point(-15, -1.08555, 0), color=Color.from_hex("#1a1eb2"), text='284.1')
add(7, 'label', Point(-10.5, -1.08555, 0), color=Color.from_hex("#1a1eb2"), text='284.1')
add(7, 'label', Point(-6, -1.89057, 0), color=Color.from_hex("#1a1eb2"), text='293.0')
add(7, 'label', Point(-2.7375, -2.94717, 0), color=Color.from_hex("#1a1eb2"), text='310.0')

# step 8 — Everything, checked
add(8, 'label', Point(14, -13.6, 0), color=Color.from_hex("#aaaaaa"), text='plate 506.3 = 5 × 101.25 = 2 × 253.13 = 4 × 126.56 kN')


if __name__ == "__main__":
    print("EX 9.3 — one load, followed all the way down —", len(ops), "operations")
