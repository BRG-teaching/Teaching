"""EX X.12 — from arch-cable to truss

Auto-generated from ops/exX1_12.json — the drawing as literal COMPAS
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
add(0, 'label', Point(5, -7.6, 0), text='form diagram 1:100')
add(0, 'label', Point(25, -7.6, 0), text='force diagram 1 cm ≙ 10 kN')
add(0, 'label', Point(9, 15.4, 0), text='situation 1 of 4 — arch-cable, load on the apex')

# step 1 — The structure
add(1, 'segment', Line((5, 6.45, 0), (12.05, -0.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.159264)
add(1, 'label', Point(9.72708, 4.12708, 0), color=Color.from_hex("#1a1eb2"), text='1: 42.43')
add(1, 'segment', Line((5, 6.45, 0), (-2.05, -0.6, 0)), color=Color.from_hex("#1a1eb2"), width=0.159264)
add(1, 'label', Point(0.272918, 4.12708, 0), color=Color.from_hex("#1a1eb2"), text='2: 42.43')
add(1, 'segment', Line((-2.05, -0.6, 0), (12.05, -0.6, 0)), color=Color.from_hex("#ce4095"), width=0.159264)
add(1, 'label', Point(5, -2.3, 0), color=Color.from_hex("#ce4095"), text='3: 30.00')
add(1, 'point', Point(-2.05, -0.6, 0), color=Color.from_hex("#ffffff"), width=0.518)
add(1, 'label', Point(-4.65, 0.7, 0), text='III')
add(1, 'segment', Line((-3.07, -1.15, 0), (-3.74175, -0.478249, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((-2.39, -1.15, 0), (-3.06175, -0.478249, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((-1.71, -1.15, 0), (-2.38175, -0.478249, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((-1.03, -1.15, 0), (-1.70175, -0.478249, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((-0.35, -1.15, 0), (-1.02175, -0.478249, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'point', Point(12.05, -0.6, 0), color=Color.from_hex("#ffffff"), width=0.518)
add(1, 'label', Point(14.65, 0.7, 0), text='II')
add(1, 'segment', Line((11.03, -1.15, 0), (10.3582, -0.478249, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((11.71, -1.15, 0), (11.0382, -0.478249, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((12.39, -1.15, 0), (11.7182, -0.478249, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((13.07, -1.15, 0), (12.3982, -0.478249, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'segment', Line((13.75, -1.15, 0), (13.0782, -0.478249, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(1, 'point', Point(5, 6.45, 0), color=Color.from_hex("#ffffff"), width=0.518)
add(1, 'label', Point(6.55563, 8.00563, 0), text='I')
add(1, 'arrow', Line((5, 12.05, 0), (5, 6.45, 0)), color=Color.from_hex("#3f9c20"), width=0.19152, head=(0.66024, 0.255024))
add(1, 'label', Point(9.4, 10.65, 0), color=Color.from_hex("#3f9c20"), text='F₁ = 60.0 kN')
add(1, 'polyline', Polyline([(5, 13.65, 0), (5, 4.65, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.413)

# step 2 — The reactions
add(2, 'arrow', Line((-2.05, -6.2, 0), (-2.05, -1.6, 0)), color=Color.from_hex("#3f9c20"), width=0.138096, head=(0.446544, 0.19152))
add(2, 'label', Point(-4.95, -4.4, 0), color=Color.from_hex("#3f9c20"), text='A = 30.00')
add(2, 'arrow', Line((12.05, -6.2, 0), (12.05, -1.6, 0)), color=Color.from_hex("#3f9c20"), width=0.138096, head=(0.446544, 0.19152))
add(2, 'label', Point(14.95, -4.4, 0), color=Color.from_hex("#3f9c20"), text='B = 30.00')

# step 3 — The load line
add(3, 'arrow', Line((25.6405, 10.9, 0), (25.6405, -4.1, 0)), color=Color.from_hex("#3f9c20"), width=0.138096, head=(0.446544, 0.19152))
add(3, 'label', Point(28.2, 3.4, 0), color=Color.from_hex("#3f9c20"), text='F₁ = 60.00')
add(3, 'arrow', Line((25, 3.4, 0), (25, 10.9, 0)), color=Color.from_hex("#3f9c20"), width=0.138096, head=(0.446544, 0.19152))
add(3, 'label', Point(28.2, 7.15, 0), color=Color.from_hex("#3f9c20"), text='A = 30.00')
add(3, 'arrow', Line((25, -4.1, 0), (25, 3.4, 0)), color=Color.from_hex("#3f9c20"), width=0.138096, head=(0.446544, 0.19152))
add(3, 'label', Point(28.2, -0.35, 0), color=Color.from_hex("#3f9c20"), text='B = 30.00')

# step 4 — Closing every joint
add(4, 'segment', Line((25, -4.1, 0), (17.5, 3.4, 0)), color=Color.from_hex("#1a1eb2"), width=0.074592)
add(4, 'label', Point(20.1893, -1.41066, 0), color=Color.from_hex("#1a1eb2"), text='1: 42.43')
add(4, 'segment', Line((25, 10.9, 0), (17.5, 3.4, 0)), color=Color.from_hex("#1a1eb2"), width=0.074592)
add(4, 'label', Point(20.1893, 8.21066, 0), color=Color.from_hex("#1a1eb2"), text='2: 42.43')
add(4, 'segment', Line((25, 3.4, 0), (17.5, 3.4, 0)), color=Color.from_hex("#ce4095"), width=0.074592)
add(4, 'label', Point(21.25, 1.9, 0), color=Color.from_hex("#ce4095"), text='3: 30.00')
add(4, 'point', Point(17.5, 3.4, 0), color=Color.from_hex("#ffffff"), width=0.4144)
add(4, 'label', Point(15.9, 4.4, 0), color=Color.from_hex("#aaaaaa"), text='o')
add(4, 'segment', Line((25, 13.3, 0), (17.5, 13.3, 0)), color=Color.from_hex("#aaaaaa"), width=0.05292)
add(4, 'label', Point(21.25, 14.6, 0), color=Color.from_hex("#aaaaaa"), text='H = 30.00 kN')

# step 6 — Joint by joint
add(6, 'label', Point(16, -10.4, 0), text='subsystem — each joint alone')
add(6, 'circle', Circle(0.4, frame=Frame((5, -14, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#aaaaaa"))
add(6, 'label', Point(5, -18.2, 0), text='joint III')
add(6, 'arrow', Line((6.5, -12.5, 0), (3.5, -15.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.138096, head=(0.446544, 0.19152))
add(6, 'arrow', Line((3.5, -15.5, 0), (6.5, -15.5, 0)), color=Color.from_hex("#ce4095"), width=0.138096, head=(0.446544, 0.19152))
add(6, 'arrow', Line((6.5, -15.5, 0), (6.5, -12.5, 0)), color=Color.from_hex("#3f9c20"), width=0.138096, head=(0.446544, 0.19152))
add(6, 'circle', Circle(0.4, frame=Frame((13, -14, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#aaaaaa"))
add(6, 'label', Point(13, -18.2, 0), text='joint II')
add(6, 'arrow', Line((11.5, -12.5, 0), (14.5, -15.5, 0)), color=Color.from_hex("#1a1eb2"), width=0.138096, head=(0.446544, 0.19152))
add(6, 'arrow', Line((14.5, -15.5, 0), (14.5, -12.5, 0)), color=Color.from_hex("#3f9c20"), width=0.138096, head=(0.446544, 0.19152))
add(6, 'arrow', Line((14.5, -12.5, 0), (11.5, -12.5, 0)), color=Color.from_hex("#ce4095"), width=0.138096, head=(0.446544, 0.19152))
add(6, 'circle', Circle(0.4, frame=Frame((21, -14, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#aaaaaa"))
add(6, 'label', Point(21, -18.2, 0), text='joint I')
add(6, 'arrow', Line((19.5, -11, 0), (19.5, -17, 0)), color=Color.from_hex("#3f9c20"), width=0.138096, head=(0.446544, 0.19152))
add(6, 'arrow', Line((19.5, -17, 0), (22.5, -14, 0)), color=Color.from_hex("#1a1eb2"), width=0.138096, head=(0.446544, 0.19152))
add(6, 'arrow', Line((22.5, -14, 0), (19.5, -11, 0)), color=Color.from_hex("#1a1eb2"), width=0.138096, head=(0.446544, 0.19152))


if __name__ == "__main__":
    print("EX X.12 — from arch-cable to truss —", len(ops), "operations")
