"""EX X · 17 — the sheet checks our arithmetic

Auto-generated from ops/exX2_17.json — the drawing as literal COMPAS
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
add(0, 'label', Point(7.875, 15.4, 0), text='Lageplan 1:100 — span 7.497 m')
add(0, 'label', Point(14.5, 2.2, 0), text='Kräfteplan — 1 unit ≙ 55.6 kN (sheet: 1 cm ≙ 100 kN)')
add(0, 'label', Point(-13.8, 4.4, 0), text='the two elements in section — 1 mm ≙ 0.055 units')

# step 1 — The truss
add(1, 'segment', Line((1.5, 7.2, 0), (4.8677, 11.4483, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(1, 'segment', Line((1.5, 7.2, 0), (7.87245, 8.9, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(1, 'segment', Line((4.8677, 11.4483, 0), (7.87245, 8.9, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(1, 'segment', Line((4.8677, 11.4483, 0), (10.8772, 11.4483, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(1, 'segment', Line((7.87245, 8.9, 0), (10.8772, 11.4483, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(1, 'segment', Line((7.87245, 8.9, 0), (14.2449, 7.2, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(1, 'segment', Line((10.8772, 11.4483, 0), (14.2449, 7.2, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(1, 'point', Point(1.5, 7.2, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'label', Point(0.2, 6, 0), text='A')
add(1, 'point', Point(4.8677, 11.4483, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'label', Point(3.5677, 12.6483, 0), text='C')
add(1, 'point', Point(7.87245, 8.9, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'label', Point(7.87245, 7.4, 0), text='D')
add(1, 'point', Point(10.8772, 11.4483, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'label', Point(12.1772, 12.6483, 0), text='E')
add(1, 'point', Point(14.2449, 7.2, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'label', Point(15.5449, 6, 0), text='B')
add(1, 'segment', Line((0.66, 6.7, 0), (0.094315, 7.26569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((1.22, 6.7, 0), (0.654315, 7.26569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((1.78, 6.7, 0), (1.21432, 7.26569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((2.34, 6.7, 0), (1.77432, 7.26569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((2.9, 6.7, 0), (2.33432, 7.26569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((13.4049, 6.7, 0), (12.8392, 7.26569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((13.9649, 6.7, 0), (13.3992, 7.26569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((14.5249, 6.7, 0), (13.9592, 7.26569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((15.0849, 6.7, 0), (14.5192, 7.26569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((15.6449, 6.7, 0), (15.0792, 7.26569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)

# step 2 — The loads
add(2, 'arrow', Line((4.8677, 14.0483, 0), (4.8677, 12.3483, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(2, 'label', Point(1.5677, 13.4483, 0), color=Color.from_hex("#3f9c20"), text='F1d = 300')
add(2, 'arrow', Line((10.8772, 14.0483, 0), (10.8772, 12.3483, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(2, 'label', Point(14.1772, 13.4483, 0), color=Color.from_hex("#3f9c20"), text='F2d = 300')

# step 3 — The reactions
add(3, 'arrow', Line((1.5, 3.4, 0), (1.5, 6.2, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(3, 'label', Point(-1.4, 4.6, 0), color=Color.from_hex("#3f9c20"), text='300.00')
add(3, 'arrow', Line((14.2449, 3.4, 0), (14.2449, 6.2, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(3, 'label', Point(17.1449, 4.6, 0), color=Color.from_hex("#3f9c20"), text='300.00')

# step 4 — Start at the support
add(4, 'label', Point(1.3031, 10.8151, 0), color=Color.from_hex("#1a1eb2"), text='1: 485.5')
add(4, 'label', Point(5.30485, 5.7311, 0), color=Color.from_hex("#ce4095"), text='2: 312.1')
add(4, 'label', Point(4.5, 0.924118, 0), text='A: R(A) + 2 + 1')
add(4, 'arrow', Line((1.78564, -7.42412, 0), (1.78564, -2.02412, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((1.78564, -2.02412, 0), (7.21436, -0.575882, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((7.21436, -0.575882, 0), (1.78564, -7.42412, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((1.78564, -7.42412, 0), (1.78564, -7.42412, 0)), color=Color.from_hex("#aaaaaa"), width=0.110477, head=(0.357235, 0.153216))

# step 5 — The rest of the diagram
add(5, 'label', Point(7.66368, 11.6995, 0), color=Color.from_hex("#ce4095"), text='C–D: 124.4')
add(5, 'label', Point(7.87245, 13.4483, 0), color=Color.from_hex("#1a1eb2"), text='C–E: 396.5')
add(5, 'label', Point(10.6684, 8.64884, 0), color=Color.from_hex("#ce4095"), text='D–E: 124.4')
add(5, 'label', Point(11.6773, 10.3689, 0), color=Color.from_hex("#ce4095"), text='D–B: 312.1')
add(5, 'label', Point(10.6803, 7.83325, 0), color=Color.from_hex("#1a1eb2"), text='E–B: 485.5')
add(5, 'label', Point(14.5, 0.924118, 0), text='C: F + 1 + C–D + C–E')
add(5, 'arrow', Line((10.9318, -2.02412, 0), (10.9318, -7.42412, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((10.9318, -7.42412, 0), (16.3605, -0.575882, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((16.3605, -0.575882, 0), (18.0682, -2.02412, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((18.0682, -2.02412, 0), (10.9318, -2.02412, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'label', Point(24.5, -1.05176, 0), text='D: 2 + D–B + D–E + C–D')
add(5, 'arrow', Line((26.3605, -2.55176, 0), (20.9318, -4, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((20.9318, -4, 0), (26.3605, -5.44824, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((26.3605, -5.44824, 0), (28.0682, -4, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((28.0682, -4, 0), (26.3605, -2.55176, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'label', Point(9.5, -10.0759, 0), text='E: F + D–E + E–B + C–E')
add(5, 'arrow', Line((13.0682, -11.5759, 0), (13.0682, -16.9759, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((13.0682, -16.9759, 0), (11.3605, -18.4241, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((11.3605, -18.4241, 0), (5.93182, -11.5759, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((5.93182, -11.5759, 0), (13.0682, -11.5759, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'label', Point(19.5, -10.0759, 0), text='B: R(B) + E–B + D–B')
add(5, 'arrow', Line((16.7856, -16.9759, 0), (16.7856, -11.5759, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((16.7856, -11.5759, 0), (22.2144, -18.4241, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((22.2144, -18.4241, 0), (16.7856, -16.9759, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((16.7856, -16.9759, 0), (16.7856, -16.9759, 0)), color=Color.from_hex("#aaaaaa"), width=0.110477, head=(0.357235, 0.153216))

# step 6 — And now the sheet marks our work
add(6, 'label', Point(17, -20.6, 0), color=Color.from_hex("#3f9c20"), text="the sheet's own printed working uses 485 and 312 kN — this solve gives 485.50 and 312.14")

# step 7 — b) Size them for strength
add(7, 'polygon', Polygon([(-16.8625, -1.6, 0), (-16.898, -1.1941, 0), (-17.0035, -0.800528, 0), (-17.1757, -0.43125, 0), (-17.4094, -0.097484, 0), (-17.6975, 0.190629, 0), (-18.0312, 0.424334, 0), (-18.4005, 0.596532, 0), (-18.7941, 0.701988, 0), (-19.2, 0.7375, 0), (-19.6059, 0.701988, 0), (-19.9995, 0.596532, 0), (-20.3687, 0.424334, 0), (-20.7025, 0.190629, 0), (-20.9906, -0.097484, 0), (-21.2243, -0.43125, 0), (-21.3965, -0.800528, 0), (-21.502, -1.1941, 0), (-21.5375, -1.6, 0), (-21.502, -2.0059, 0), (-21.3965, -2.39947, 0), (-21.2243, -2.76875, 0), (-20.9906, -3.10252, 0), (-20.7025, -3.39063, 0), (-20.3687, -3.62433, 0), (-19.9995, -3.79653, 0), (-19.6059, -3.90199, 0), (-19.2, -3.9375, 0), (-18.7941, -3.90199, 0), (-18.4005, -3.79653, 0), (-18.0312, -3.62433, 0), (-17.6975, -3.39063, 0), (-17.4094, -3.10252, 0), (-17.1757, -2.76875, 0), (-17.0035, -2.39947, 0), (-16.898, -2.0059, 0)]), color=Color.from_hex("#bdbfe8"), opacity=0.5)
add(7, 'circle', Circle(2.3375, frame=Frame((-19.2, -1.6, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#1a1eb2"))
add(7, 'circle', Circle(1.44525, frame=Frame((-19.2, -1.6, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#aaaaaa"), dash=0.4)
add(7, 'label', Point(-19.2, -5.0375, 0), text='element 1: built Ø85 mm')
add(7, 'label', Point(-19.2, 1.8375, 0), color=Color.from_hex("#aaaaaa"), text='needs Ø52.55 → 53 mm')
add(7, 'polygon', Polygon([(-6.0625, -1.6, 0), (-6.09801, -1.1941, 0), (-6.20347, -0.800528, 0), (-6.37567, -0.43125, 0), (-6.60937, -0.097484, 0), (-6.89748, 0.190629, 0), (-7.23125, 0.424334, 0), (-7.60053, 0.596532, 0), (-7.9941, 0.701988, 0), (-8.4, 0.7375, 0), (-8.8059, 0.701988, 0), (-9.19947, 0.596532, 0), (-9.56875, 0.424334, 0), (-9.90252, 0.190629, 0), (-10.1906, -0.097484, 0), (-10.4243, -0.43125, 0), (-10.5965, -0.800528, 0), (-10.702, -1.1941, 0), (-10.7375, -1.6, 0), (-10.702, -2.0059, 0), (-10.5965, -2.39947, 0), (-10.4243, -2.76875, 0), (-10.1906, -3.10252, 0), (-9.90252, -3.39063, 0), (-9.56875, -3.62433, 0), (-9.19947, -3.79653, 0), (-8.8059, -3.90199, 0), (-8.4, -3.9375, 0), (-7.9941, -3.90199, 0), (-7.60053, -3.79653, 0), (-7.23125, -3.62433, 0), (-6.89748, -3.39063, 0), (-6.60937, -3.10252, 0), (-6.37567, -2.76875, 0), (-6.20347, -2.39947, 0), (-6.09801, -2.0059, 0)]), color=Color.from_hex("#f0bcdb"), opacity=0.5)
add(7, 'circle', Circle(2.3375, frame=Frame((-8.4, -1.6, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#ce4095"))
add(7, 'circle', Circle(1.15884, frame=Frame((-8.4, -1.6, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#aaaaaa"), dash=0.4)
add(7, 'label', Point(-8.4, -5.0375, 0), text='element 2: built Ø85 mm')
add(7, 'label', Point(-8.4, 1.8375, 0), color=Color.from_hex("#aaaaaa"), text='needs Ø42.14 → 43 mm')

# step 8 — c) Now let it buckle
add(8, 'label', Point(-13.8, -6.4, 0), color=Color.from_hex("#ce4095"), text='element 1 buckling: 0.382 > 0.296 — KNICKVERSAGEN (element 2 is a tie)')


if __name__ == "__main__":
    print("EX X · 17 — the sheet checks our arithmetic —", len(ops), "operations")
