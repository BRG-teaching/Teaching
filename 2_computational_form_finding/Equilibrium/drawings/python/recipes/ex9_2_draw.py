"""EX 9.2 — a load looking for the ground

Auto-generated from ops/ex9_2.json — the drawing as literal COMPAS
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
add(0, 'label', Point(14.5, 11.4, 0), text='a) the symmetric structure — axonometric drawing (no scale on the sheet)')
add(0, 'label', Point(14.5, 9.9, 0), text='blue = compression · red = tension · green = external forces, loads included (German)')

# step 1 — The structure
add(1, 'polygon', Polygon([(9.295, -5.295, 0), (24.795, -5.295, 0), (24.795, -1.42, 0), (9.295, -1.42, 0)]), color=Color.from_hex("#f2f2f4"), opacity=0.94)
add(1, 'segment', Line((9.295, -5.295, 0), (24.795, -5.295, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((24.795, -5.295, 0), (24.795, -1.42, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((24.795, -1.42, 0), (9.295, -1.42, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((9.295, -1.42, 0), (9.295, -5.295, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'polygon', Polygon([(4.18, -0.18, 0), (19.68, -0.18, 0), (19.68, 3.695, 0), (4.18, 3.695, 0)]), color=Color.from_hex("#f2f2f4"), opacity=0.94)
add(1, 'segment', Line((4.18, -0.18, 0), (19.68, -0.18, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((19.68, -0.18, 0), (19.68, 3.695, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((19.68, 3.695, 0), (4.18, 3.695, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((4.18, 3.695, 0), (4.18, -0.18, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'polygon', Polygon([(13.325, -11.65, 0), (4.8, -3.125, 0), (4.8, 1.525, 0), (13.325, -7, 0)]), color=Color.from_hex("#f2f2f4"), opacity=0.94)
add(1, 'segment', Line((13.325, -11.65, 0), (4.8, -3.125, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((4.8, -3.125, 0), (4.8, 1.525, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((4.8, 1.525, 0), (13.325, -7, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((13.325, -7, 0), (13.325, -11.65, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'polygon', Polygon([(24.175, -11.65, 0), (15.65, -3.125, 0), (15.65, 1.525, 0), (24.175, -7, 0)]), color=Color.from_hex("#f2f2f4"), opacity=0.94)
add(1, 'segment', Line((24.175, -11.65, 0), (15.65, -3.125, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((15.65, -3.125, 0), (15.65, 1.525, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((15.65, 1.525, 0), (24.175, -7, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((24.175, -7, 0), (24.175, -11.65, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'polygon', Polygon([(11.6975, -11.9213, 0), (12.395, -11.9213, 0), (12.395, -10.3712, 0), (11.6975, -10.3712, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(5.73, -5.95375, 0), (6.4275, -5.95375, 0), (6.4275, -4.40375, 0), (5.73, -4.40375, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(22.5475, -11.9213, 0), (23.245, -11.9213, 0), (23.245, -10.3712, 0), (22.5475, -10.3712, 0)]), color=Color.from_hex("#111111"))
add(1, 'polygon', Polygon([(16.58, -5.95375, 0), (17.2775, -5.95375, 0), (17.2775, -4.40375, 0), (16.58, -4.40375, 0)]), color=Color.from_hex("#111111"))

# step 2 — The load
add(2, 'segment', Line((9.295, 0.6725, 0), (24.795, 0.6725, 0)), color=Color.from_hex("#3f9c20"), width=0.06048)
add(2, 'segment', Line((4.18, 5.7875, 0), (19.68, 5.7875, 0)), color=Color.from_hex("#3f9c20"), width=0.06048)
add(2, 'label', Point(27.795, 1.3725, 0), color=Color.from_hex("#3f9c20"), text='g = 10.0 kN/m')

# step 3 — Where the upper wall puts it
add(3, 'label', Point(14.5, -17.4, 0), color=Color.from_hex("#3f9c20"), text='each upper wall: 50.0 % near · 50.0 % far')

# step 4 — The flow inside a wall
add(4, 'segment', Line((11.62, -5.295, 0), (22.47, -5.295, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(4, 'label', Point(17.045, -6.395, 0), color=Color.from_hex("#ce4095"), text='20.0')
add(4, 'segment', Line((11.62, -5.295, 0), (13.8343, -1.42, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(4, 'segment', Line((13.8343, -1.42, 0), (20.2557, -1.42, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(4, 'label', Point(17.045, -0.32, 0), color=Color.from_hex("#1a1eb2"), text='20.0')
add(4, 'segment', Line((20.2557, -1.42, 0), (22.47, -5.295, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(4, 'segment', Line((10.4575, -1.42, 0), (11.62, -1.42, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(4, 'label', Point(11.0388, -2.52, 0), color=Color.from_hex("#ce4095"), text='4.5')
add(4, 'segment', Line((10.4575, -1.42, 0), (11.62, -5.295, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(4, 'segment', Line((22.47, -1.42, 0), (23.6325, -1.42, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(4, 'label', Point(23.0512, -2.52, 0), color=Color.from_hex("#ce4095"), text='4.5')
add(4, 'segment', Line((23.6325, -1.42, 0), (22.47, -5.295, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(4, 'segment', Line((6.505, -0.18, 0), (17.355, -0.18, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(4, 'segment', Line((6.505, -0.18, 0), (8.71929, 3.695, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(4, 'segment', Line((8.71929, 3.695, 0), (15.1407, 3.695, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(4, 'segment', Line((15.1407, 3.695, 0), (17.355, -0.18, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(4, 'segment', Line((5.3425, 3.695, 0), (6.505, 3.695, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(4, 'segment', Line((5.3425, 3.695, 0), (6.505, -0.18, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(4, 'segment', Line((17.355, 3.695, 0), (18.5175, 3.695, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(4, 'segment', Line((18.5175, 3.695, 0), (17.355, -0.18, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)

# step 5 — And again, one level down
add(5, 'segment', Line((12.0463, -10.3712, 0), (6.07875, -4.40375, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(5, 'label', Point(9.84032, -6.60968, 0), color=Color.from_hex("#ce4095"), text='8.3')
add(5, 'segment', Line((12.0463, -10.3712, 0), (11.62, -5.295, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(5, 'segment', Line((11.62, -5.295, 0), (6.505, -0.18, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(5, 'label', Point(8.28468, -3.51532, 0), color=Color.from_hex("#1a1eb2"), text='8.3')
add(5, 'segment', Line((6.505, -0.18, 0), (6.07875, -4.40375, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(5, 'segment', Line((22.8962, -10.3712, 0), (16.9288, -4.40375, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(5, 'segment', Line((22.8962, -10.3712, 0), (22.47, -5.295, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(5, 'segment', Line((22.47, -5.295, 0), (17.355, -0.18, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(5, 'segment', Line((17.355, -0.18, 0), (16.9288, -4.40375, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(5, 'arrow', Line((11.62, -2.895, 0), (11.62, -4.945, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'label', Point(8.02, -2.795, 0), color=Color.from_hex("#3f9c20"), text='50.00')
add(5, 'arrow', Line((22.47, -2.895, 0), (22.47, -4.945, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'label', Point(26.07, -2.795, 0), color=Color.from_hex("#3f9c20"), text='50.00')
add(5, 'arrow', Line((6.505, 2.22, 0), (6.505, 0.17, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'label', Point(2.905, 2.32, 0), color=Color.from_hex("#3f9c20"), text='50.00')
add(5, 'arrow', Line((17.355, 2.22, 0), (17.355, 0.17, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'label', Point(20.955, 2.32, 0), color=Color.from_hex("#3f9c20"), text='50.00')

# step 6 — The reactions, and the check
add(6, 'arrow', Line((12.0463, -16.3212, 0), (12.0463, -12.7212, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'label', Point(8.84625, -14.9213, 0), color=Color.from_hex("#3f9c20"), text='50.00')
add(6, 'arrow', Line((6.07875, -10.3537, 0), (6.07875, -6.75375, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'label', Point(9.27875, -8.95375, 0), color=Color.from_hex("#3f9c20"), text='50.00')
add(6, 'arrow', Line((22.8962, -16.3212, 0), (22.8962, -12.7212, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'label', Point(19.6962, -14.9213, 0), color=Color.from_hex("#3f9c20"), text='50.00')
add(6, 'arrow', Line((16.9288, -10.3537, 0), (16.9288, -6.75375, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'label', Point(20.1288, -8.95375, 0), color=Color.from_hex("#3f9c20"), text='50.00')
add(6, 'label', Point(14.5, -19.2, 0), color=Color.from_hex("#111111"), text='Σ columns 200.00 kN = W = 200.00 kN ✓')


if __name__ == "__main__":
    print("EX 9.2 — a load looking for the ground —", len(ops), "operations")
