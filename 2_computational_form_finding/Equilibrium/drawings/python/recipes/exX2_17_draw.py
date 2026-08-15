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
add(0, 'label', Point(6.75, 11, 0), text='Lageplan 1:100 — span 7.497 m')
add(0, 'label', Point(23, 11, 0), text='Kräfteplan — 1 cm ≙ 100 kN')
add(0, 'label', Point(-13.8, 1.15, 0), text='the two elements in section — 1 mm ≙ 0.036 units')

# step 1 — The truss
add(1, 'segment', Line((1.5, 4.2, 0), (4.2734, 7.6986, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(1, 'segment', Line((1.5, 4.2, 0), (6.7479, 5.6, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(1, 'segment', Line((4.2734, 7.6986, 0), (6.7479, 5.6, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(1, 'segment', Line((4.2734, 7.6986, 0), (9.2224, 7.6986, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(1, 'segment', Line((6.7479, 5.6, 0), (9.2224, 7.6986, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(1, 'segment', Line((6.7479, 5.6, 0), (11.9958, 4.2, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(1, 'segment', Line((9.2224, 7.6986, 0), (11.9958, 4.2, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(1, 'point', Point(1.5, 4.2, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'label', Point(0.2, 3, 0), text='A')
add(1, 'point', Point(4.2734, 7.6986, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'label', Point(2.9734, 8.8986, 0), text='C')
add(1, 'point', Point(6.7479, 5.6, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'label', Point(6.7479, 4.1, 0), text='D')
add(1, 'point', Point(9.2224, 7.6986, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'label', Point(10.5224, 8.8986, 0), text='E')
add(1, 'point', Point(11.9958, 4.2, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'label', Point(13.2958, 3, 0), text='B')
add(1, 'segment', Line((0.66, 3.7, 0), (0.094315, 4.26569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((1.22, 3.7, 0), (0.654315, 4.26569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((1.78, 3.7, 0), (1.21432, 4.26569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((2.34, 3.7, 0), (1.77432, 4.26569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((2.9, 3.7, 0), (2.33432, 4.26569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((11.1558, 3.7, 0), (10.5901, 4.26569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((11.7158, 3.7, 0), (11.1501, 4.26569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((12.2758, 3.7, 0), (11.7101, 4.26569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((12.8358, 3.7, 0), (12.2701, 4.26569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((13.3958, 3.7, 0), (12.8301, 4.26569, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)

# step 2 — The loads
add(2, 'arrow', Line((4.2734, 10.2986, 0), (4.2734, 8.5986, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(2, 'label', Point(0.9734, 9.6986, 0), color=Color.from_hex("#3f9c20"), text='F1d = 300')
add(2, 'arrow', Line((9.2224, 10.2986, 0), (9.2224, 8.5986, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(2, 'label', Point(12.5224, 9.6986, 0), color=Color.from_hex("#3f9c20"), text='F2d = 300')

# step 3 — The reactions
add(3, 'arrow', Line((1.5, 0.4, 0), (1.5, 3.2, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(3, 'label', Point(-1.4, 1.6, 0), color=Color.from_hex("#3f9c20"), text='300.00')
add(3, 'arrow', Line((11.9958, 0.4, 0), (11.9958, 3.2, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(3, 'label', Point(14.8958, 1.6, 0), color=Color.from_hex("#3f9c20"), text='300.00')

# step 4 — Start at the support
add(4, 'label', Point(1.00595, 7.4402, 0), color=Color.from_hex("#1a1eb2"), text='1: 485.5')
add(4, 'label', Point(4.74257, 2.5811, 0), color=Color.from_hex("#ce4095"), text='2: 312.1')
add(4, 'label', Point(4.5, -0.575882, 0), text='A: R(A) + 2 + 1')
add(4, 'arrow', Line((1.78564, -8.92412, 0), (1.78564, -3.52412, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((1.78564, -3.52412, 0), (7.21436, -2.07588, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((7.21436, -2.07588, 0), (1.78564, -8.92412, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(4, 'arrow', Line((1.78564, -8.92412, 0), (1.78564, -8.92412, 0)), color=Color.from_hex("#aaaaaa"), width=0.110477, head=(0.357235, 0.153216))

# step 5 — The rest of the diagram
add(5, 'label', Point(6.80426, 8.17461, 0), color=Color.from_hex("#ce4095"), text='C–D: 124.4')
add(5, 'label', Point(6.7479, 9.6986, 0), color=Color.from_hex("#1a1eb2"), text='C–E: 396.5')
add(5, 'label', Point(9.27876, 5.12399, 0), color=Color.from_hex("#ce4095"), text='D–E: 124.4')
add(5, 'label', Point(9.99047, 7.2189, 0), color=Color.from_hex("#ce4095"), text='D–B: 312.1')
add(5, 'label', Point(8.72835, 4.4584, 0), color=Color.from_hex("#1a1eb2"), text='E–B: 485.5')
add(5, 'label', Point(14.5, -0.575882, 0), text='C: F + 1 + C–D + C–E')
add(5, 'arrow', Line((10.9318, -3.52412, 0), (10.9318, -8.92412, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((10.9318, -8.92412, 0), (16.3605, -2.07588, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((16.3605, -2.07588, 0), (18.0682, -3.52412, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((18.0682, -3.52412, 0), (10.9318, -3.52412, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'label', Point(24.5, -2.55176, 0), text='D: 2 + D–B + D–E + C–D')
add(5, 'arrow', Line((26.3605, -4.05176, 0), (20.9318, -5.5, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((20.9318, -5.5, 0), (26.3605, -6.94824, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((26.3605, -6.94824, 0), (28.0682, -5.5, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((28.0682, -5.5, 0), (26.3605, -4.05176, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'label', Point(9.5, -11.0759, 0), text='E: F + D–E + E–B + C–E')
add(5, 'arrow', Line((13.0682, -12.5759, 0), (13.0682, -17.9759, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((13.0682, -17.9759, 0), (11.3605, -19.4241, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((11.3605, -19.4241, 0), (5.93182, -12.5759, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((5.93182, -12.5759, 0), (13.0682, -12.5759, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'label', Point(19.5, -11.0759, 0), text='B: R(B) + E–B + D–B')
add(5, 'arrow', Line((16.7856, -17.9759, 0), (16.7856, -12.5759, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((16.7856, -12.5759, 0), (22.2144, -19.4241, 0)), color=Color.from_hex("#1a1eb2"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((22.2144, -19.4241, 0), (16.7856, -17.9759, 0)), color=Color.from_hex("#ce4095"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((16.7856, -17.9759, 0), (16.7856, -17.9759, 0)), color=Color.from_hex("#aaaaaa"), width=0.110477, head=(0.357235, 0.153216))

# step 6 — And now the sheet marks our work
add(6, 'label', Point(17, -21.6, 0), color=Color.from_hex("#3f9c20"), text="the sheet's own printed working uses 485 and 312 kN — this solve gives 485.50 and 312.14")

# step 7 — b) Size them for strength
add(7, 'polygon', Polygon([(-17.67, -2.6, 0), (-17.6932, -2.33432, 0), (-17.7623, -2.07671, 0), (-17.875, -1.835, 0), (-18.028, -1.61654, 0), (-18.2165, -1.42795, 0), (-18.435, -1.27498, 0), (-18.6767, -1.16227, 0), (-18.9343, -1.09324, 0), (-19.2, -1.07, 0), (-19.4657, -1.09324, 0), (-19.7233, -1.16227, 0), (-19.965, -1.27498, 0), (-20.1835, -1.42795, 0), (-20.372, -1.61654, 0), (-20.525, -1.835, 0), (-20.6377, -2.07671, 0), (-20.7068, -2.33432, 0), (-20.73, -2.6, 0), (-20.7068, -2.86568, 0), (-20.6377, -3.12329, 0), (-20.525, -3.365, 0), (-20.372, -3.58346, 0), (-20.1835, -3.77205, 0), (-19.965, -3.92502, 0), (-19.7233, -4.03773, 0), (-19.4657, -4.10676, 0), (-19.2, -4.13, 0), (-18.9343, -4.10676, 0), (-18.6767, -4.03773, 0), (-18.435, -3.92502, 0), (-18.2165, -3.77205, 0), (-18.028, -3.58346, 0), (-17.875, -3.365, 0), (-17.7623, -3.12329, 0), (-17.6932, -2.86568, 0)]), color=Color.from_hex("#bdbfe8"), opacity=0.5)
add(7, 'circle', Circle(1.53, frame=Frame((-19.2, -2.6, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#1a1eb2"))
add(7, 'circle', Circle(0.945979, frame=Frame((-19.2, -2.6, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#aaaaaa"), dash=0.4)
add(7, 'label', Point(-19.2, -5.43, 0), text='element 1: built Ø85 mm')
add(7, 'label', Point(-19.2, 0.23, 0), color=Color.from_hex("#aaaaaa"), text='needs Ø52.55 → 53 mm')
add(7, 'polygon', Polygon([(-6.87, -2.6, 0), (-6.89324, -2.33432, 0), (-6.96227, -2.07671, 0), (-7.07498, -1.835, 0), (-7.22795, -1.61654, 0), (-7.41653, -1.42795, 0), (-7.635, -1.27498, 0), (-7.87671, -1.16227, 0), (-8.13432, -1.09324, 0), (-8.4, -1.07, 0), (-8.66568, -1.09324, 0), (-8.92329, -1.16227, 0), (-9.165, -1.27498, 0), (-9.38346, -1.42795, 0), (-9.57205, -1.61654, 0), (-9.72502, -1.835, 0), (-9.83773, -2.07671, 0), (-9.90676, -2.33432, 0), (-9.93, -2.6, 0), (-9.90676, -2.86568, 0), (-9.83773, -3.12329, 0), (-9.72502, -3.365, 0), (-9.57205, -3.58346, 0), (-9.38346, -3.77205, 0), (-9.165, -3.92502, 0), (-8.92329, -4.03773, 0), (-8.66568, -4.10676, 0), (-8.4, -4.13, 0), (-8.13432, -4.10676, 0), (-7.87671, -4.03773, 0), (-7.635, -3.92502, 0), (-7.41653, -3.77205, 0), (-7.22795, -3.58346, 0), (-7.07498, -3.365, 0), (-6.96227, -3.12329, 0), (-6.89324, -2.86568, 0)]), color=Color.from_hex("#f0bcdb"), opacity=0.5)
add(7, 'circle', Circle(1.53, frame=Frame((-8.4, -2.6, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#ce4095"))
add(7, 'circle', Circle(0.758516, frame=Frame((-8.4, -2.6, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#aaaaaa"), dash=0.4)
add(7, 'label', Point(-8.4, -5.43, 0), text='element 2: built Ø85 mm')
add(7, 'label', Point(-8.4, 0.23, 0), color=Color.from_hex("#aaaaaa"), text='needs Ø42.14 → 43 mm')

# step 8 — c) Now let it buckle
add(8, 'label', Point(16, -20.2, 0), color=Color.from_hex("#ce4095"), text='element 1 buckling: 0.382 > 0.296 — KNICKVERSAGEN (element 2 is a tie)')


if __name__ == "__main__":
    print("EX X · 17 — the sheet checks our arithmetic —", len(ops), "operations")
