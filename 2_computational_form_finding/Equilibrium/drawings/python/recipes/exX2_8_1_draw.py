"""EX X · 8.1 — three frames, one drawing, three different answers

Auto-generated from ops/exX2_8_1.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-11, -19.8, 0), text='b) θ = 47.12° — form diagram')
add(0, 'label', Point(17, 21.4, 0), text='Force diagram — the three-force triangle')
add(0, 'label', Point(17, 19.8, 0), text='every length is a multiple of the load F · F drawn as 10 units')
add(0, 'label', Point(15, -4, 0), color=Color.from_hex("#aaaaaa"), text='all six support symbols on the sheet are pins — only the arrows differ')
add(0, 'label', Point(15, -6.4, 0), color=Color.from_hex("#aaaaaa"), text='the concurrency point is inside the beam')

# step 1 — The frame
add(1, 'polygon', Polygon([(-26, -14, 0), (-26, -1.1892, 0), (-1.972, -1.1892, 0), (-1.972, -14, 0), (-4.858, -14, 0), (-4.858, -4.1884, 0), (-23.1136, -4.1884, 0), (-23.1136, -14, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.13)
add(1, 'segment', Line((-26, -14, 0), (-26, -1.1892, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-26, -1.1892, 0), (-1.972, -1.1892, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-1.972, -1.1892, 0), (-1.972, -14, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-1.972, -14, 0), (-4.858, -14, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-4.858, -14, 0), (-4.858, -4.1884, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-4.858, -4.1884, 0), (-23.1136, -4.1884, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-23.1136, -4.1884, 0), (-23.1136, -14, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'segment', Line((-23.1136, -14, 0), (-26, -14, 0)), color=Color.from_hex("#111111"), width=0.103565)
add(1, 'point', Point(-24.5568, -14, 0), color=Color.from_hex("#ffffff"), width=0.4588)
add(1, 'segment', Line((-25.6368, -14.6, 0), (-26.3086, -13.9282, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-24.9168, -14.6, 0), (-25.5886, -13.9282, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-24.1968, -14.6, 0), (-24.8686, -13.9282, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-23.4768, -14.6, 0), (-24.1486, -13.9282, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-22.7568, -14.6, 0), (-23.4286, -13.9282, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'label', Point(-26.9568, -15.6, 0), text='A')
add(1, 'point', Point(-3.4152, -14, 0), color=Color.from_hex("#ffffff"), width=0.4588)
add(1, 'segment', Line((-4.4952, -14.6, 0), (-5.16695, -13.9282, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-3.7752, -14.6, 0), (-4.44695, -13.9282, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-3.0552, -14.6, 0), (-3.72695, -13.9282, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-2.3352, -14.6, 0), (-3.00695, -13.9282, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'segment', Line((-1.6152, -14.6, 0), (-2.28695, -13.9282, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(1, 'label', Point(-1.0152, -15.6, 0), text='B')
add(1, 'arrow', Line((-13.9856, 4.8108, 0), (-13.9856, -0.6892, 0)), color=Color.from_hex("#3f9c20"), width=0.169632, head=(0.584784, 0.225878))
add(1, 'label', Point(-11.3856, 3.2108, 0), color=Color.from_hex("#3f9c20"), text='F')
add(1, 'polyline', Polyline([(-13.9856, 5.2108, 0), (-13.9856, -19.6, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3658)

# step 2 — Three forces must be concurrent
add(2, 'polyline', Polyline([(-25.9568, -15.5074, 0), (-13.9856, -2.61892, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3658)
add(2, 'polyline', Polyline([(-2.0152, -15.5074, 0), (-13.9856, -2.61892, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3658)
add(2, 'point', Point(-13.9856, -2.61892, 0), color=Color.from_hex("#ffffff"), width=0.41292)
add(2, 'label', Point(-2.9856, 0.581079, 0), color=Color.from_hex("#aaaaaa"), text='they meet 2.845 m up')
add(2, 'arrow', Line((-28.2317, -17.9567, 0), (-25.3734, -14.8793, 0)), color=Color.from_hex("#3f9c20"), width=0.122314, head=(0.39551, 0.169632))
add(2, 'label', Point(-31.8317, -19.1567, 0), color=Color.from_hex("#3f9c20"), text='A = 0.682 F')
add(2, 'arrow', Line((0.259657, -17.9567, 0), (-2.59856, -14.8793, 0)), color=Color.from_hex("#3f9c20"), width=0.122314, head=(0.39551, 0.169632))
add(2, 'label', Point(3.85966, -19.1567, 0), color=Color.from_hex("#3f9c20"), text='B = 0.682 F')
add(2, 'arrow', Line((11, 12, 0), (11, 2, 0)), color=Color.from_hex("#3f9c20"), width=0.169632, head=(0.584784, 0.225878))
add(2, 'segment', Line((11, 2, 0), (15.6438, 7, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(2, 'segment', Line((15.6438, 7, 0), (11, 12, 0)), color=Color.from_hex("#3f9c20"), width=0.141062)
add(2, 'label', Point(14.2, 7, 0), color=Color.from_hex("#3f9c20"), text='F = 1')
add(2, 'label', Point(14.7219, 2.5, 0), color=Color.from_hex("#3f9c20"), text='A = 0.682 F')
add(2, 'label', Point(14.7219, 11.5, 0), color=Color.from_hex("#3f9c20"), text='B = 0.682 F')
add(2, 'segment', Line((11, 14.2, 0), (15.6438, 14.2, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(2, 'label', Point(13.3219, 15.6, 0), color=Color.from_hex("#aaaaaa"), text='H = 0.4644 F')

# step 3 — Where the load actually goes
add(3, 'segment', Line((-23.1136, -14, 0), (-23.1136, -12.4461, 0)), color=Color.from_hex("#ce4095"), width=0.046872)
add(3, 'label', Point(-16.1136, -17.4, 0), color=Color.from_hex("#ce4095"), text='the ray is out of the leg above 0.388 m')

# step 4 — The internal force flow
add(4, 'segment', Line((-24.5568, -14, 0), (-24.5568, -3.8884, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(4, 'segment', Line((-3.4152, -14, 0), (-3.4152, -3.8884, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(4, 'segment', Line((-24.5568, -3.8884, 0), (-3.4152, -3.8884, 0)), color=Color.from_hex("#ce4095"), width=0.141062)
add(4, 'segment', Line((-24.5568, -1.4892, 0), (-3.4152, -1.4892, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(4, 'segment', Line((-13.9856, -1.4892, 0), (-24.5568, -3.8884, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(4, 'segment', Line((-13.9856, -1.4892, 0), (-3.4152, -3.8884, 0)), color=Color.from_hex("#1a1eb2"), width=0.141062)
add(4, 'label', Point(-30.7568, -8.9442, 0), color=Color.from_hex("#1a1eb2"), text='leg 0.500 F')
add(4, 'label', Point(2.7848, -8.9442, 0), color=Color.from_hex("#1a1eb2"), text='leg 0.500 F')
add(4, 'label', Point(-13.9856, -6.2884, 0), color=Color.from_hex("#ce4095"), text='bottom chord 0.014 F T')
add(4, 'label', Point(-23.5856, 0.9108, 0), color=Color.from_hex("#1a1eb2"), text='top chord 0.014 F C')
add(4, 'label', Point(-19.2712, -9.0888, 0), color=Color.from_hex("#1a1eb2"), text='2.259 F')
add(4, 'label', Point(-8.7004, -9.0888, 0), color=Color.from_hex("#1a1eb2"), text='2.259 F')
add(4, 'segment', Line((-23.3568, -3.8884, 0), (-23.3568, -1.4892, 0)), color=Color.from_hex("#aaaaaa"), width=0.046872)
add(4, 'label', Point(-31.7568, -2.6888, 0), color=Color.from_hex("#aaaaaa"), text='z = 0.5998 m')


if __name__ == "__main__":
    print("EX X · 8.1 — three frames, one drawing, three different answers —", len(ops), "operations")
