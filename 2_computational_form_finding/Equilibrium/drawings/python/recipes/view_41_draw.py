"""Drawing 41 — Continuous beam, cantilever

Auto-generated from ops/view_41.json — the drawing as literal COMPAS
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


# step 0 — How to draw this scheme
add(0, 'label', Point(2.4, 10.25, 0), text='Form Diagram')
add(0, 'label', Point(12.7, 10.25, 0), text='Force Diagram')
add(0, 'label', Point(12.7, 9.9, 0), text='1 unit :: 11.1 kN')

# step 1 — A beam with a cantilever
add(1, 'polygon', Polygon([(4.11085, 6.80218, 0), (9.72007, 6.80218, 0), (9.72007, 6.26567, 0), (4.11085, 6.26567, 0)]), color=Color.from_hex("#555555"), opacity=0.1)
add(1, 'segment', Line((4.11085, 6.80218, 0), (9.72007, 6.80218, 0)), color=Color.from_hex("#111111"), width=0.00864)
add(1, 'segment', Line((9.72007, 6.80218, 0), (9.72007, 6.26567, 0)), color=Color.from_hex("#111111"), width=0.00864)
add(1, 'segment', Line((9.72007, 6.26567, 0), (4.11085, 6.26567, 0)), color=Color.from_hex("#111111"), width=0.00864)
add(1, 'segment', Line((4.11085, 6.26567, 0), (4.11085, 6.80218, 0)), color=Color.from_hex("#111111"), width=0.00864)
add(1, 'polygon', Polygon([(4.11085, 9.0315, 0), (9.72007, 9.0315, 0), (9.72007, 9.4515, 0), (4.11085, 9.4515, 0)]), color=Color.from_hex("#3f9c20"), opacity=0.13)
add(1, 'segment', Line((4.11085, 9.0315, 0), (9.72007, 9.0315, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(1, 'segment', Line((9.72007, 9.0315, 0), (9.72007, 9.4515, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(1, 'segment', Line((9.72007, 9.4515, 0), (4.11085, 9.4515, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(1, 'segment', Line((4.11085, 9.4515, 0), (4.11085, 9.0315, 0)), color=Color.from_hex("#3f9c20"), width=0.0144)
add(1, 'label', Point(3.66085, 9.2315, 0), color=Color.from_hex("#3f9c20"), text='q')
add(1, 'segment', Line((3.93085, 5.81567, 0), (4.11085, 6.26567, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((4.11085, 6.26567, 0), (4.29085, 5.81567, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((3.85085, 5.81567, 0), (4.37085, 5.81567, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((3.91085, 5.70568, 0), (4.03085, 5.70568, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((4.09085, 5.70568, 0), (4.21085, 5.70568, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((4.25085, 5.70568, 0), (4.37085, 5.70568, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((7.78037, 5.81567, 0), (7.96037, 6.26567, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((7.96037, 6.26567, 0), (8.14037, 5.81567, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((7.70037, 5.81567, 0), (8.22037, 5.81567, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'segment', Line((7.70037, 5.68567, 0), (8.22037, 5.68567, 0)), color=Color.from_hex("#111111"), width=0.0144)
add(1, 'label', Point(2.51085, 5.36568, 0), color=Color.from_hex("#3f9c20"), text='A_H = 0')
add(1, 'point', Point(4.11085, 6.26567, 0), color=Color.from_hex("#ffffff"), width=0.07)
add(1, 'label', Point(3.81085, 6.40567, 0), text='A')
add(1, 'point', Point(7.96037, 6.26567, 0), color=Color.from_hex("#ffffff"), width=0.07)
add(1, 'label', Point(8.06037, 6.46568, 0), text='B')
add(1, 'point', Point(9.72007, 6.26567, 0), color=Color.from_hex("#ffffff"), width=0.07)
add(1, 'label', Point(9.86007, 6.40567, 0), text='C')

# step 2 — Two resultants
add(2, 'arrow', Line((6.03561, 8.8815, 0), (6.03561, 7.40218, 0)), color=Color.from_hex("#3f9c20"), width=0.0324, head=(0.144, 0.0576))
add(2, 'arrow', Line((8.84022, 8.8815, 0), (8.84022, 7.40218, 0)), color=Color.from_hex("#3f9c20"), width=0.0324, head=(0.144, 0.0576))
add(2, 'label', Point(6.17561, 8.4315, 0), color=Color.from_hex("#3f9c20"), text='R₁')
add(2, 'label', Point(8.98022, 8.4315, 0), color=Color.from_hex("#3f9c20"), text='R₂')
add(2, 'arrow', Line((14.0544, 9.40479, 0), (14.0544, 8.01896, 0)), color=Color.from_hex("#3f9c20"), width=0.0324, head=(0.144, 0.0576))
add(2, 'arrow', Line((14.0544, 8.01896, 0), (14.0544, 7.38547, 0)), color=Color.from_hex("#3f9c20"), width=0.0324, head=(0.144, 0.0576))
add(2, 'label', Point(14.2344, 8.71188, 0), color=Color.from_hex("#3f9c20"), text='R₁')
add(2, 'label', Point(14.2344, 7.70222, 0), color=Color.from_hex("#3f9c20"), text='R₂')

# step 3 — The funicular tent and the tie
add(3, 'point', Point(6.91546, 7.12746, 0), color=Color.from_hex("#ffffff"), width=0.07)
add(3, 'point', Point(4.11085, 6.41343, 0), color=Color.from_hex("#ffffff"), width=0.07)
add(3, 'label', Point(3.76085, 6.53343, 0), text='A″')
add(3, 'label', Point(7.01546, 7.30746, 0), text='P₁')
add(3, 'polyline', Polyline([(6.91546, 6.51339, 0), (6.91546, 7.20608, 0)]), color=Color.from_hex("#afafaf"), dash=0.06)
add(3, 'point', Point(11.9014, 8.85667, 0), color=Color.from_hex("#ffffff"), width=0.05)
add(3, 'label', Point(11.5014, 8.99667, 0), text='J₁')
add(3, 'segment', Line((4.11085, 6.41343, 0), (7.96037, 6.41343, 0)), color=Color.from_hex("#da2020"), width=0.036)
add(3, 'label', Point(5.26571, 6.09343, 0), color=Color.from_hex("#da2020"), text='H_tension')

# step 4 — The reactions and the H rail
add(4, 'arrow', Line((14.4044, 8.85667, 0), (14.4044, 9.40479, 0)), color=Color.from_hex("#3f9c20"), width=0.0324, head=(0.144, 0.0576))
add(4, 'arrow', Line((11.9014, 7.38547, 0), (11.9014, 8.85667, 0)), color=Color.from_hex("#3f9c20"), width=0.0324, head=(0.144, 0.0576))
add(4, 'label', Point(14.5844, 9.13073, 0), color=Color.from_hex("#3f9c20"), text='A_V')
add(4, 'label', Point(12.0614, 8.12107, 0), color=Color.from_hex("#3f9c20"), text='B')
add(4, 'arrow', Line((4.11085, 4.91568, 0), (4.11085, 5.64567, 0)), color=Color.from_hex("#3f9c20"), width=0.0324, head=(0.144, 0.0576))
add(4, 'arrow', Line((7.96037, 4.91568, 0), (7.96037, 5.64567, 0)), color=Color.from_hex("#3f9c20"), width=0.0324, head=(0.144, 0.0576))
add(4, 'label', Point(4.25085, 5.21568, 0), color=Color.from_hex("#3f9c20"), text='A_V')
add(4, 'label', Point(8.10037, 5.21568, 0), color=Color.from_hex("#3f9c20"), text='B')
add(4, 'polyline', Polyline([(11.2014, 4.2357, 0), (16.9073, 4.2357, 0)]), color=Color.from_hex("#9db8d2"), dash=0.1)
add(4, 'segment', Line((11.9014, 4.2357, 0), (14.0544, 4.2357, 0)), color=Color.from_hex("#da2020"), width=0.036)
add(4, 'label', Point(12.4779, 3.9357, 0), color=Color.from_hex("#da2020"), text='H_tension')
add(4, 'polyline', Polyline([(11.9014, 8.85667, 0), (11.9014, 4.2357, 0)]), color=Color.from_hex("#9a9a9a"), dash=0.05)
add(4, 'label', Point(17.2, 10.25, 0), color=Color.from_hex("#3f9c20"), text='A_V = 6.1 kN')
add(4, 'label', Point(17.2, 9.9, 0), color=Color.from_hex("#3f9c20"), text='B = 16.3 kN')
add(4, 'label', Point(17.2, 9.55, 0), color=Color.from_hex("#3f9c20"), text='A_V₂ = -1.6 kN (uplift)')
add(4, 'label', Point(17.2, 9.2, 0), color=Color.from_hex("#3f9c20"), text='R₁ = 15.4, R₂ = 7.0 kN')
add(4, 'label', Point(17.2, 8.85, 0), color=Color.from_hex("#da2020"), text='H = 23.9 kN — tension = compression')

# step 5 — Subsystem 1 — the back span alone
add(5, 'segment', Line((11.9014, 8.71188, 0), (14.0544, 8.85667, 0)), color=Color.from_hex("#da2020"), width=0.01008)
add(5, 'segment', Line((4.11085, 6.41343, 0), (6.03561, 7.0329, 0)), color=Color.from_hex("#1a1eb2"), width=0.0252)
add(5, 'segment', Line((6.03561, 7.0329, 0), (7.96037, 6.41343, 0)), color=Color.from_hex("#1a1eb2"), width=0.0252)
add(5, 'point', Point(11.9014, 8.71188, 0), color=Color.from_hex("#ffffff"), width=0.05)
add(5, 'label', Point(11.5214, 8.81188, 0), text='H')
add(5, 'segment', Line((14.0544, 9.40479, 0), (11.9014, 8.71188, 0)), color=Color.from_hex("#1a1eb2"), width=0.01008)
add(5, 'segment', Line((14.0544, 8.01896, 0), (11.9014, 8.71188, 0)), color=Color.from_hex("#1a1eb2"), width=0.01008)

# step 6 — Subsystem 2 — the cantilever alone
add(6, 'segment', Line((7.96037, 6.41343, 0), (8.84022, 6.73149, 0)), color=Color.from_hex("#1a1eb2"), width=0.0252)
add(6, 'segment', Line((4.11085, 6.41343, 0), (9.72007, 6.79066, 0)), color=Color.from_hex("#da2020"), width=0.0252)
add(6, 'point', Point(8.84022, 6.73149, 0), color=Color.from_hex("#ffffff"), width=0.05)
add(6, 'label', Point(8.92022, 6.45149, 0), text='H₁')
add(6, 'segment', Line((14.0544, 4.2357, 0), (16.2073, 4.2357, 0)), color=Color.from_hex("#1a1eb2"), width=0.036)
add(6, 'label', Point(14.5809, 3.9357, 0), color=Color.from_hex("#1a1eb2"), text='H_compression')
add(6, 'polyline', Polyline([(16.2073, 7.38547, 0), (16.2073, 4.2357, 0)]), color=Color.from_hex("#9a9a9a"), dash=0.05)

# step 8 — Eight strips per span
add(8, 'segment', Line((4.11085, 6.41343, 0), (4.59204, 6.5683, 0)), color=Color.from_hex("#1a1eb2"), width=0.0324)
add(8, 'segment', Line((4.59204, 6.5683, 0), (5.07323, 6.67892, 0)), color=Color.from_hex("#1a1eb2"), width=0.0324)
add(8, 'segment', Line((5.07323, 6.67892, 0), (5.55442, 6.74529, 0)), color=Color.from_hex("#1a1eb2"), width=0.0324)
add(8, 'segment', Line((5.55442, 6.74529, 0), (6.03561, 6.76741, 0)), color=Color.from_hex("#1a1eb2"), width=0.0324)
add(8, 'segment', Line((6.03561, 6.76741, 0), (6.5168, 6.74529, 0)), color=Color.from_hex("#1a1eb2"), width=0.0324)
add(8, 'segment', Line((6.5168, 6.74529, 0), (6.99799, 6.67892, 0)), color=Color.from_hex("#1a1eb2"), width=0.0324)
add(8, 'segment', Line((6.99799, 6.67892, 0), (7.47918, 6.5683, 0)), color=Color.from_hex("#1a1eb2"), width=0.0324)
add(8, 'segment', Line((7.47918, 6.5683, 0), (7.96037, 6.41343, 0)), color=Color.from_hex("#1a1eb2"), width=0.0324)
add(8, 'segment', Line((7.96037, 6.41343, 0), (8.18033, 6.49294, 0)), color=Color.from_hex("#1a1eb2"), width=0.0324)
add(8, 'segment', Line((8.18033, 6.49294, 0), (8.4003, 6.56321, 0)), color=Color.from_hex("#1a1eb2"), width=0.0324)
add(8, 'segment', Line((8.4003, 6.56321, 0), (8.62026, 6.62424, 0)), color=Color.from_hex("#1a1eb2"), width=0.0324)
add(8, 'segment', Line((8.62026, 6.62424, 0), (8.84022, 6.67601, 0)), color=Color.from_hex("#1a1eb2"), width=0.0324)
add(8, 'segment', Line((8.84022, 6.67601, 0), (9.06018, 6.71854, 0)), color=Color.from_hex("#1a1eb2"), width=0.0324)
add(8, 'segment', Line((9.06018, 6.71854, 0), (9.28014, 6.75183, 0)), color=Color.from_hex("#1a1eb2"), width=0.0324)
add(8, 'segment', Line((9.28014, 6.75183, 0), (9.50011, 6.77587, 0)), color=Color.from_hex("#1a1eb2"), width=0.0324)
add(8, 'segment', Line((9.50011, 6.77587, 0), (9.72007, 6.79066, 0)), color=Color.from_hex("#1a1eb2"), width=0.0324)


if __name__ == "__main__":
    print("Drawing 41 — Continuous beam, cantilever —", len(ops), "operations")
