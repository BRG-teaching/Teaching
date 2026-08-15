"""EX 2.1 — Analysing cables with a given geometry

Auto-generated from ops/ex2_1.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-30, -41.5, 0), text='Form Diagram')
add(0, 'label', Point(14, -41.5, 0), text='Force Diagram')
add(0, 'label', Point(14, -43.1, 0), text='1 unit :: 8 kN')

# step 1 — Two cables, same span
add(1, 'label', Point(-35.5, 1.4, 0), text='a)')
add(1, 'segment', Line((-32, -2, 0), (-19.25, -12.63, 0)), color=Color.from_hex("#ce4095"), width=0.159264)
add(1, 'segment', Line((-19.25, -12.63, 0), (-6.5, -2, 0)), color=Color.from_hex("#ce4095"), width=0.159264)
add(1, 'point', Point(-19.25, -12.63, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'point', Point(-32, -2, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'point', Point(-6.5, -2, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'label', Point(-33.6, -0.9, 0), text='A')
add(1, 'label', Point(-4.9, -0.9, 0), text='B')
add(1, 'label', Point(-20.95, -13.23, 0), text='I')
add(1, 'segment', Line((-32, 1.2, 0), (-6.5, 1.2, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'polyline', Polyline([(-19.25, -2, 0), (-19.25, -12.63, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.413)
add(1, 'label', Point(-17.75, -7.315, 0), color=Color.from_hex("#aaaaaa"), text='h')
add(1, 'label', Point(-35.5, -22.6, 0), text='b)')
add(1, 'segment', Line((-32, -26, 0), (-19.25, -31.31, 0)), color=Color.from_hex("#ce4095"), width=0.159264)
add(1, 'segment', Line((-19.25, -31.31, 0), (-6.5, -26, 0)), color=Color.from_hex("#ce4095"), width=0.159264)
add(1, 'point', Point(-19.25, -31.31, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'point', Point(-32, -26, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'point', Point(-6.5, -26, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'label', Point(-33.6, -24.9, 0), text='A')
add(1, 'label', Point(-4.9, -24.9, 0), text='B')
add(1, 'label', Point(-20.95, -31.91, 0), text='I')
add(1, 'segment', Line((-32, -22.8, 0), (-6.5, -22.8, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'polyline', Polyline([(-19.25, -26, 0), (-19.25, -31.31, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.413)
add(1, 'label', Point(-17.75, -28.655, 0), color=Color.from_hex("#aaaaaa"), text='h/2')

# step 2 — The load at the middle node
add(2, 'arrow', Line((-19.25, -12.63, 0), (-19.25, -19.505, 0)), color=Color.from_hex("#3f9c20"), width=0.19152, head=(0.66024, 0.255024))
add(2, 'arrow', Line((28.281, -3, 0), (28.281, -15.5, 0)), color=Color.from_hex("#3f9c20"), width=0.19152, head=(0.66024, 0.255024))
add(2, 'label', Point(-17.55, -16.0675, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(2, 'label', Point(28.8, -9.25, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(2, 'arrow', Line((-19.25, -31.31, 0), (-19.25, -38.185, 0)), color=Color.from_hex("#3f9c20"), width=0.19152, head=(0.66024, 0.255024))
add(2, 'arrow', Line((26.5075, -28.1825, 0), (26.5075, -40.6825, 0)), color=Color.from_hex("#3f9c20"), width=0.19152, head=(0.66024, 0.255024))
add(2, 'label', Point(-17.55, -34.7475, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(2, 'label', Point(28.8, -33.25, 0), color=Color.from_hex("#3f9c20"), text='F₁')

# step 3 — a) Node I closes
add(3, 'polygon', Polygon([(-32.275, -2.32985, 0), (-31.725, -1.67016, 0), (-18.975, -12.3002, 0), (-19.525, -12.9598, 0)]), color=Color.from_hex("#ce4095"))
add(3, 'segment', Line((27, -15.5, 0), (19.5035, -9.25, 0)), color=Color.from_hex("#ce4095"), width=0.159264)
add(3, 'polygon', Polygon([(-18.975, -12.9598, 0), (-19.525, -12.3002, 0), (-6.775, -1.67016, 0), (-6.225, -2.32985, 0)]), color=Color.from_hex("#ce4095"))
add(3, 'segment', Line((19.5035, -9.25, 0), (27, -3, 0)), color=Color.from_hex("#ce4095"), width=0.159264)
add(3, 'label', Point(17.3035, -9.25, 0), color=Color.from_hex("#ce4095"), text='78')

# step 4 — a) The supports
add(4, 'arrow', Line((-32, -2, 0), (-37.2805, 2.40249, 0)), color=Color.from_hex("#3f9c20"), width=0.138096, head=(0.446544, 0.19152))
add(4, 'arrow', Line((28.281, -15.5, 0), (20.7845, -9.25, 0)), color=Color.from_hex("#3f9c20"), width=0.138096, head=(0.446544, 0.19152))
add(4, 'arrow', Line((-6.5, -2, 0), (-1.2195, 2.40249, 0)), color=Color.from_hex("#3f9c20"), width=0.138096, head=(0.446544, 0.19152))
add(4, 'arrow', Line((20.7845, -9.25, 0), (28.281, -3, 0)), color=Color.from_hex("#3f9c20"), width=0.138096, head=(0.446544, 0.19152))
add(4, 'label', Point(23.2518, -1.4, 0), color=Color.from_hex("#3f9c20"), text='H = 60 kN')

# step 5 — b) The same, with half the sag
add(5, 'polygon', Polygon([(-32.275, -26.6603, 0), (-31.725, -25.3397, 0), (-18.975, -30.6497, 0), (-19.525, -31.9703, 0)]), color=Color.from_hex("#ce4095"))
add(5, 'segment', Line((27, -39.5, 0), (11.9929, -33.25, 0)), color=Color.from_hex("#ce4095"), width=0.159264)
add(5, 'polygon', Polygon([(-18.975, -31.9703, 0), (-19.525, -30.6497, 0), (-6.775, -25.3397, 0), (-6.225, -26.6603, 0)]), color=Color.from_hex("#ce4095"))
add(5, 'segment', Line((11.9929, -33.25, 0), (27, -27, 0)), color=Color.from_hex("#ce4095"), width=0.159264)
add(5, 'arrow', Line((-32, -26, 0), (-38.3466, -23.3568, 0)), color=Color.from_hex("#3f9c20"), width=0.138096, head=(0.446544, 0.19152))
add(5, 'arrow', Line((26.5075, -40.6825, 0), (11.5004, -34.4325, 0)), color=Color.from_hex("#3f9c20"), width=0.138096, head=(0.446544, 0.19152))
add(5, 'arrow', Line((-6.5, -26, 0), (-0.153404, -23.3568, 0)), color=Color.from_hex("#3f9c20"), width=0.138096, head=(0.446544, 0.19152))
add(5, 'arrow', Line((11.5004, -34.4325, 0), (26.5075, -28.1825, 0)), color=Color.from_hex("#3f9c20"), width=0.138096, head=(0.446544, 0.19152))
add(5, 'label', Point(19.4965, -25.4, 0), color=Color.from_hex("#3f9c20"), text='H = 120 kN')
add(5, 'label', Point(9.79294, -33.25, 0), color=Color.from_hex("#ce4095"), text='130')


if __name__ == "__main__":
    print("EX 2.1 — Analysing cables with a given geometry —", len(ops), "operations")
