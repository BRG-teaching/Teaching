"""EX X · 13 — the roller that has to hold down, and the columns that pull

Auto-generated from ops/exX2_13.json — the drawing as literal COMPAS
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


# step 0 — The exercise, and the number that is missing
add(0, 'label', Point(-14.6036, 3.4, 0), text='Subsystem B — Ansicht 1:200, 24.99 m long, 2.999 m deep')
add(0, 'label', Point(7.84811, 12.5975, 0), text='Grundriss 1:500')
add(0, 'label', Point(22, 14.2, 0), text='Kräfteplan — 1 unit ≙ 33.3 kN (sheet: 1 cm ≙ 50 kN)')
add(0, 'label', Point(15, -3.2, 0), text='Subsystems D and C — Ansicht 1:200')

# step 1 — Subsystem B, and where its supports are
add(1, 'segment', Line((2.6, 4.6, 0), (13.0962, 4.6, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(1, 'segment', Line((13.0962, 4.6, 0), (13.0962, 10.8975, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(1, 'segment', Line((13.0962, 10.8975, 0), (2.6, 10.8975, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(1, 'segment', Line((2.6, 10.8975, 0), (2.6, 4.6, 0)), color=Color.from_hex("#111111"), width=0.06048)
add(1, 'segment', Line((3.64979, 4.6, 0), (3.64979, 10.8975, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((5.74895, 4.6, 0), (5.74895, 10.8975, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((7.84832, 4.6, 0), (7.84832, 10.8975, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((9.94748, 4.6, 0), (9.94748, 10.8975, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((12.0471, 4.6, 0), (12.0471, 10.8975, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((2.6, 4.705, 0), (13.0962, 4.705, 0)), color=Color.from_hex("#111111"), width=0.127411)
add(1, 'segment', Line((2.6, 10.7925, 0), (13.0962, 10.7925, 0)), color=Color.from_hex("#111111"), width=0.127411)
add(1, 'segment', Line((2.705, 4.6, 0), (2.705, 10.8975, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'segment', Line((6.79853, 4.6, 0), (6.79853, 10.8975, 0)), color=Color.from_hex("#aaaaaa"), width=0.06048)
add(1, 'point', Point(2.705, 6.28, 0), color=Color.from_hex("#ffffff"), width=0.29008)
add(1, 'point', Point(2.705, 9.22, 0), color=Color.from_hex("#ffffff"), width=0.29008)
add(1, 'point', Point(6.79853, 6.28, 0), color=Color.from_hex("#ffffff"), width=0.29008)
add(1, 'point', Point(6.79853, 9.22, 0), color=Color.from_hex("#ffffff"), width=0.29008)
add(1, 'label', Point(7.84811, 3.676, 0), color=Color.from_hex("#aaaaaa"), text='25.00 × 15.00 m · A ⟂ B ⟂ C/D · 4 columns')
add(1, 'segment', Line((-24.6, -3.6, 0), (-4.6072, -3.6, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((-4.6072, -3.6, 0), (-4.6072, -1.2008, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((-4.6072, -1.2008, 0), (-24.6, -1.2008, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'segment', Line((-24.6, -1.2008, 0), (-24.6, -3.6, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(1, 'point', Point(-24.4, -3.6, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'segment', Line((-25.12, -4.1, 0), (-25.6857, -3.53431, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-24.64, -4.1, 0), (-25.2057, -3.53431, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-24.16, -4.1, 0), (-24.7257, -3.53431, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-23.68, -4.1, 0), (-24.2457, -3.53431, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-23.2, -4.1, 0), (-23.7657, -3.53431, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'label', Point(-24.4, -6, 0), color=Color.from_hex("#aaaaaa"), text='roller')
add(1, 'point', Point(-16.6028, -3.6, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(1, 'segment', Line((-17.3228, -4.1, 0), (-17.8885, -3.53431, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-16.8428, -4.1, 0), (-17.4085, -3.53431, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-16.3628, -4.1, 0), (-16.9285, -3.53431, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-15.8828, -4.1, 0), (-16.4485, -3.53431, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'segment', Line((-15.4028, -4.1, 0), (-15.9685, -3.53431, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(1, 'label', Point(-16.6028, -6, 0), color=Color.from_hex("#aaaaaa"), text='pin')

# step 2 — The five loads
add(2, 'arrow', Line((-22.6004, 1.5192, 0), (-22.6004, -0.9208, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(2, 'label', Point(-21.1004, 0.5592, 0), color=Color.from_hex("#3f9c20"), text='A1')
add(2, 'arrow', Line((-18.602, 1.5192, 0), (-18.602, -0.9208, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(2, 'label', Point(-17.102, 0.5592, 0), color=Color.from_hex("#3f9c20"), text='A2')
add(2, 'arrow', Line((-14.6032, 1.5192, 0), (-14.6032, -0.9208, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(2, 'label', Point(-13.1032, 0.5592, 0), color=Color.from_hex("#3f9c20"), text='A3')
add(2, 'arrow', Line((-10.6048, 1.5192, 0), (-10.6048, -0.9208, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(2, 'label', Point(-9.1048, 0.5592, 0), color=Color.from_hex("#3f9c20"), text='A4')
add(2, 'arrow', Line((-6.6056, 1.5192, 0), (-6.6056, -0.9208, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(2, 'label', Point(-5.1056, 0.5592, 0), color=Color.from_hex("#3f9c20"), text='A5')

# step 3 — And the roller pulls down
add(3, 'arrow', Line((-24.4, -7, 0), (-24.4, -9.2, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(3, 'label', Point(-27.3, -8.1, 0), color=Color.from_hex("#3f9c20"), text='64.11 ↓')
add(3, 'arrow', Line((-16.6028, -9.2, 0), (-16.6028, -7, 0)), color=Color.from_hex("#3f9c20"), width=0.153216, head=(0.528192, 0.204019))
add(3, 'label', Point(-13.5028, -8.1, 0), color=Color.from_hex("#3f9c20"), text='314.11')

# step 4 — The flow inside the beam
add(4, 'segment', Line((-24.6, -1.2008, 0), (-24.4, -1.2008, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(4, 'segment', Line((-24.4, -1.2008, 0), (-22.6004, -1.50846, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(4, 'segment', Line((-22.6004, -1.50846, 0), (-18.602, -2.72512, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(4, 'segment', Line((-18.602, -2.72512, 0), (-16.6028, -3.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(4, 'segment', Line((-16.6028, -3.6, 0), (-14.6032, -2.8002, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(4, 'segment', Line((-14.6032, -2.8002, 0), (-10.6048, -1.734, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(4, 'segment', Line((-10.6048, -1.734, 0), (-6.6056, -1.2008, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(4, 'segment', Line((-6.6056, -1.2008, 0), (-4.6072, -1.2008, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(4, 'segment', Line((-24.6, -1.2008, 0), (-4.6072, -1.2008, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(4, 'label', Point(-12.2036, -4.8, 0), color=Color.from_hex("#ce4095"), text='tie along the TOP: 375.02 kN tension')
add(4, 'segment', Line((-22.6004, -1.2008, 0), (-22.6004, -1.50846, 0)), color=Color.from_hex("#1a1eb2"), width=0.06048)
add(4, 'segment', Line((-18.602, -1.2008, 0), (-18.602, -2.72512, 0)), color=Color.from_hex("#1a1eb2"), width=0.06048)
add(4, 'segment', Line((-14.6032, -1.2008, 0), (-14.6032, -2.8002, 0)), color=Color.from_hex("#1a1eb2"), width=0.06048)
add(4, 'segment', Line((-10.6048, -1.2008, 0), (-10.6048, -1.734, 0)), color=Color.from_hex("#1a1eb2"), width=0.06048)
add(4, 'segment', Line((-6.6056, -1.2008, 0), (-6.6056, -1.2008, 0)), color=Color.from_hex("#1a1eb2"), width=0.06048)
add(4, 'segment', Line((-3.6472, -3.6, 0), (-3.6472, -1.2008, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(4, 'label', Point(-1.0472, -2.4004, 0), color=Color.from_hex("#aaaaaa"), text='z = 2.999 m')

# step 5 — The force diagram
add(5, 'arrow', Line((28, 7, 0), (28, 5.07662, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((28, 5.07662, 0), (28, 3.57662, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((28, 3.57662, 0), (28, 2.07662, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((28.5124, 2.07662, 0), (28.5124, 11.5, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((28, 11.5, 0), (28, 10, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((28, 10, 0), (28, 8.5, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'arrow', Line((28, 8.5, 0), (28, 7, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(5, 'point', Point(16.7495, 7, 0), color=Color.from_hex("#ffffff"), width=0.33152)
add(5, 'label', Point(15.4495, 7.9, 0), text='o')
add(5, 'segment', Line((16.7495, 0.576617, 0), (28, 0.576617, 0)), color=Color.from_hex("#aaaaaa"), width=0.042336)
add(5, 'label', Point(22.3747, -0.323383, 0), color=Color.from_hex("#aaaaaa"), text='H = 375.02 kN')
add(5, 'segment', Line((16.7495, 7, 0), (28, 7, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(5, 'segment', Line((16.7495, 7, 0), (28, 5.07662, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(5, 'segment', Line((16.7495, 7, 0), (28, 3.57662, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(5, 'segment', Line((16.7495, 7, 0), (28, 2.07662, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(5, 'segment', Line((16.7495, 7, 0), (28, 11.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(5, 'segment', Line((16.7495, 7, 0), (28, 10, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(5, 'segment', Line((16.7495, 7, 0), (28, 8.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)
add(5, 'segment', Line((16.7495, 7, 0), (28, 7, 0)), color=Color.from_hex("#1a1eb2"), width=0.059674)

# step 6 — Subsystems C and D
add(6, 'segment', Line((4.25125, -12, 0), (11.7487, -12, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'segment', Line((11.7487, -12, 0), (11.7487, -10.751, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'segment', Line((11.7487, -10.751, 0), (4.25125, -10.751, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'segment', Line((4.25125, -10.751, 0), (4.25125, -12, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'label', Point(8, -4.751, 0), color=Color.from_hex("#aaaaaa"), text='subsystem D (x = 0.250 m)')
add(6, 'arrow', Line((4.37625, -10.351, 0), (4.37625, -8.25342, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'segment', Line((6.2505, -12.6, 0), (6.2505, -15.6, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(6, 'point', Point(6.2505, -12, 0), color=Color.from_hex("#ffffff"), width=0.29008)
add(6, 'arrow', Line((11.6237, -10.351, 0), (11.6237, -8.25342, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'segment', Line((9.7495, -12.6, 0), (9.7495, -15.6, 0)), color=Color.from_hex("#ce4095"), width=0.127411)
add(6, 'point', Point(9.7495, -12, 0), color=Color.from_hex("#ffffff"), width=0.29008)
add(6, 'label', Point(8, -16.7, 0), color=Color.from_hex("#ce4095"), text='columns: 64.11 kN TENSION')
add(6, 'label', Point(8, -6.351, 0), color=Color.from_hex("#3f9c20"), text='64.11 kN UP at each end')
add(6, 'segment', Line((18.2512, -12, 0), (25.7488, -12, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'segment', Line((25.7488, -12, 0), (25.7488, -10.751, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'segment', Line((25.7488, -10.751, 0), (18.2512, -10.751, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'segment', Line((18.2512, -10.751, 0), (18.2512, -12, 0)), color=Color.from_hex("#111111"), width=0.093542)
add(6, 'label', Point(22, -4.751, 0), color=Color.from_hex("#aaaaaa"), text='subsystem C (x = 9.996 m)')
add(6, 'arrow', Line((18.3762, -7.351, 0), (18.3762, -10.351, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'segment', Line((20.2505, -12.6, 0), (20.2505, -15.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'point', Point(20.2505, -12, 0), color=Color.from_hex("#ffffff"), width=0.29008)
add(6, 'arrow', Line((25.6238, -7.351, 0), (25.6238, -10.351, 0)), color=Color.from_hex("#3f9c20"), width=0.110477, head=(0.357235, 0.153216))
add(6, 'segment', Line((23.7495, -12.6, 0), (23.7495, -15.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.127411)
add(6, 'point', Point(23.7495, -12, 0), color=Color.from_hex("#ffffff"), width=0.29008)
add(6, 'label', Point(22, -16.7, 0), color=Color.from_hex("#1a1eb2"), text='columns: 314.11 kN COMPRESSION')
add(6, 'label', Point(22, -6.351, 0), color=Color.from_hex("#3f9c20"), text='314.11 kN down at each end')
add(6, 'circle', Circle(0.24975, frame=Frame((5.77325, -11.2933, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#aaaaaa"))
add(6, 'label', Point(8, -18.3, 0), color=Color.from_hex("#aaaaaa"), text='a 1.0 m hole the task never mentions')

# step 7 — Columns that pull, and a chain that closes
add(7, 'label', Point(15, -19.6, 0), color=Color.from_hex("#3f9c20"), text='chain: 500.00 kN in  =  2 × 314.11 − 2 × 64.11 = 500.00 kN out')


if __name__ == "__main__":
    print("EX X · 13 — the roller that has to hold down, and the columns that pull —", len(ops), "operations")
