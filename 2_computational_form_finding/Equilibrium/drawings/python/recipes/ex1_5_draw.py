"""EX 1 Creative — stacking boxes, and whether they stand up

Auto-generated from ops/ex1_5.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-16, -11.6, 0), text='Form diagram 1:50')
add(0, 'label', Point(6, -12.4, 0), text='Force diagram')
add(0, 'label', Point(6, -13.7, 0), text='1 unit ≙ 16 kN  (sheet: 1 cm ≙ 20 kN)')

# step 1 — The stack and its weights
add(1, 'segment', Line((-24, -4, 0), (2, -4, 0)), color=Color.from_hex("#aaaaaa"), width=0.076447)
add(1, 'segment', Line((-23.6, -4, 0), (-24.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-22.6, -4, 0), (-23.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-21.6, -4, 0), (-22.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-20.6, -4, 0), (-21.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-19.6, -4, 0), (-20.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-18.6, -4, 0), (-19.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-17.6, -4, 0), (-18.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-16.6, -4, 0), (-17.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-15.6, -4, 0), (-16.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-14.6, -4, 0), (-15.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-13.6, -4, 0), (-14.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-12.6, -4, 0), (-13.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-11.6, -4, 0), (-12.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-10.6, -4, 0), (-11.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-9.6, -4, 0), (-10.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-8.6, -4, 0), (-9.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-7.6, -4, 0), (-8.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-6.6, -4, 0), (-7.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-5.6, -4, 0), (-6.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-4.6, -4, 0), (-5.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-3.6, -4, 0), (-4.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-2.6, -4, 0), (-3.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-1.6, -4, 0), (-2.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((-0.6, -4, 0), (-1.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((0.4, -4, 0), (-0.15, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'segment', Line((1.4, -4, 0), (0.85, -4.7, 0)), color=Color.from_hex("#aaaaaa"), width=0.031752)
add(1, 'polygon', Polygon([(-16.2416, -0.1, 0), (-12.3416, -0.1, 0), (-12.3416, 2.5, 0), (-16.2416, 2.5, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.12)
add(1, 'segment', Line((-16.2416, -0.1, 0), (-12.3416, -0.1, 0)), color=Color.from_hex("#111111"), width=0.070157)
add(1, 'segment', Line((-12.3416, -0.1, 0), (-12.3416, 2.5, 0)), color=Color.from_hex("#111111"), width=0.070157)
add(1, 'segment', Line((-12.3416, 2.5, 0), (-16.2416, 2.5, 0)), color=Color.from_hex("#111111"), width=0.070157)
add(1, 'segment', Line((-16.2416, 2.5, 0), (-16.2416, -0.1, 0)), color=Color.from_hex("#111111"), width=0.070157)
add(1, 'polyline', Polyline([(-14.2916, 4.7, 0), (-14.2916, -11.6, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2478)
add(1, 'arrow', Line((-14.2916, 4.53, 0), (-14.2916, 1.33, 0)), color=Color.from_hex("#3f9c20"), width=0.114912, head=(0.396144, 0.153014))
add(1, 'label', Point(-12.9916, 3.25, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(1, 'polygon', Polygon([(-14.6972, -1.4, 0), (-6.8972, -1.4, 0), (-6.8972, -0.1, 0), (-14.6972, -0.1, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.12)
add(1, 'segment', Line((-14.6972, -1.4, 0), (-6.8972, -1.4, 0)), color=Color.from_hex("#111111"), width=0.070157)
add(1, 'segment', Line((-6.8972, -1.4, 0), (-6.8972, -0.1, 0)), color=Color.from_hex("#111111"), width=0.070157)
add(1, 'segment', Line((-6.8972, -0.1, 0), (-14.6972, -0.1, 0)), color=Color.from_hex("#111111"), width=0.070157)
add(1, 'segment', Line((-14.6972, -0.1, 0), (-14.6972, -1.4, 0)), color=Color.from_hex("#111111"), width=0.070157)
add(1, 'polyline', Polyline([(-10.7972, 2.1, 0), (-10.7972, -11.6, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2478)
add(1, 'arrow', Line((-10.7972, 2.515, 0), (-10.7972, -0.685, 0)), color=Color.from_hex("#3f9c20"), width=0.114912, head=(0.396144, 0.153014))
add(1, 'label', Point(-9.4972, 1.235, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(1, 'polygon', Polygon([(-13.8444, -4, 0), (-11.2444, -4, 0), (-11.2444, -1.4, 0), (-13.8444, -1.4, 0)]), color=Color.from_hex("#aaaaaa"), opacity=0.12)
add(1, 'segment', Line((-13.8444, -4, 0), (-11.2444, -4, 0)), color=Color.from_hex("#111111"), width=0.070157)
add(1, 'segment', Line((-11.2444, -4, 0), (-11.2444, -1.4, 0)), color=Color.from_hex("#111111"), width=0.070157)
add(1, 'segment', Line((-11.2444, -1.4, 0), (-13.8444, -1.4, 0)), color=Color.from_hex("#111111"), width=0.070157)
add(1, 'segment', Line((-13.8444, -1.4, 0), (-13.8444, -4, 0)), color=Color.from_hex("#111111"), width=0.070157)
add(1, 'polyline', Polyline([(-12.5444, 0.8, 0), (-12.5444, -11.6, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2478)
add(1, 'arrow', Line((-12.5444, 0.63, 0), (-12.5444, -2.57, 0)), color=Color.from_hex("#3f9c20"), width=0.114912, head=(0.396144, 0.153014))
add(1, 'label', Point(-11.2444, -0.65, 0), color=Color.from_hex("#3f9c20"), text='F₃')

# step 2 — The load line
add(2, 'arrow', Line((4.7686, 6, 0), (4.7686, 2.25, 0)), color=Color.from_hex("#3f9c20"), width=0.114912, head=(0.396144, 0.153014))
add(2, 'label', Point(5.5, 4.125, 0), color=Color.from_hex("#3f9c20"), text='F₁')
add(2, 'arrow', Line((4.7686, -0.25, 0), (4.7686, -4, 0)), color=Color.from_hex("#3f9c20"), width=0.114912, head=(0.396144, 0.153014))
add(2, 'label', Point(5.5, -2.125, 0), color=Color.from_hex("#3f9c20"), text='F₂')
add(2, 'arrow', Line((4.7686, 2.25, 0), (4.7686, -0.25, 0)), color=Color.from_hex("#3f9c20"), width=0.114912, head=(0.396144, 0.153014))
add(2, 'label', Point(5.5, 1, 0), color=Color.from_hex("#3f9c20"), text='F₃')

# step 3 — A trial pole
add(3, 'point', Point(15, 0, 0), color=Color.from_hex("#ffffff"), width=0.24864)
add(3, 'label', Point(15.8, 0.9, 0), text='o')
add(3, 'segment', Line((15, 0, 0), (4, 6, 0)), color=Color.from_hex("#aaaaaa"), width=0.044755)
add(3, 'segment', Line((15, 0, 0), (4, 2.25, 0)), color=Color.from_hex("#aaaaaa"), width=0.044755)
add(3, 'segment', Line((15, 0, 0), (4, -0.25, 0)), color=Color.from_hex("#aaaaaa"), width=0.044755)
add(3, 'segment', Line((15, 0, 0), (4, -4, 0)), color=Color.from_hex("#aaaaaa"), width=0.044755)

# step 4 — The trial funicular
add(4, 'segment', Line((-14.2916, -8.6, 0), (-12.5444, -8.95738, 0)), color=Color.from_hex("#aaaaaa"), width=0.070157)
add(4, 'segment', Line((-12.5444, -8.95738, 0), (-10.7972, -8.91767, 0)), color=Color.from_hex("#aaaaaa"), width=0.070157)

# step 5 — Close it: the point S
add(5, 'polyline', Polyline([(-12.5444, -9.55302, 0), (-14.2916, -8.6, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2478)
add(5, 'polyline', Polyline([(-10.7972, -8.91767, 0), (-12.5444, -9.55302, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2478)
add(5, 'point', Point(-12.5444, -9.55302, 0), color=Color.from_hex("#ffffff"), width=0.3108)
add(5, 'label', Point(-11.4444, -10.553, 0), text='S')
add(5, 'polyline', Polyline([(-12.5444, 4.84, 0), (-12.5444, -11.153, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.2478)
add(5, 'arrow', Line((-12.5444, 4.84, 0), (-12.5444, 0.68, 0)), color=Color.from_hex("#3f9c20"), width=0.132149, dash=0.39648, head=(0.396144, 0.153014))
add(5, 'arrow', Line((4, 6, 0), (4, -4, 0)), color=Color.from_hex("#3f9c20"), width=0.132149, dash=0.39648, head=(0.396144, 0.153014))
add(5, 'label', Point(-11.1444, 2.76, 0), color=Color.from_hex("#3f9c20"), text='R')
add(5, 'label', Point(2.2, 1, 0), color=Color.from_hex("#3f9c20"), text='R')

# step 6 — The verdict
add(6, 'segment', Line((-13.8444, -4.3, 0), (-11.2444, -4.3, 0)), color=Color.from_hex("#111111"), width=0.172005)
add(6, 'label', Point(-17.1444, -5.4, 0), text='contact patch')
add(6, 'label', Point(-7.5444, -6.6, 0), color=Color.from_hex("#3f9c20"), text='STABLE — 0.500 m to spare')


if __name__ == "__main__":
    print("EX 1 Creative — stacking boxes, and whether they stand up —", len(ops), "operations")
