"""
COMPAS translation of GeoGebra applet: Subsystem
Source: https://block.arch.ethz.ch/eq/drawing/view/1
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
A = Point(24.0, 48.0, 0.0)  # A
D = Point(42.186533, 37.5, 0.0)  # D
B = Point(23.877, 68.99964, 0.0)  # B
C = Point(5.813467, 37.5, 0.0)  # C
F_4 = Point(96.0, 58.0, 0.0)  # F_4
G = Point(96.093714, 42.000274, 0.0)  # G
frameBL = Point(-5.208831, 15.255683, 0.0)  # frameBL
I_3 = Point(127.352632, 15.255683, 0.0)  # I_3
J_3 = Point(-5.208831, 81.536414, 0.0)  # J_3
frameTR = Point(127.352632, 81.536414, 0.0)  # frameTR
H = Point(82.190688, 50.02719, 0.0)  # H

# --- geometry ---
S.add(A, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Circle.from_point_and_radius(Point(24.0, 48.0, 0.0), 21.0), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(D, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(B, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(C, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(A, B), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(F_4, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(D, A), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(G, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(frameBL, I_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([frameBL, J_3, frameTR, I_3]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C, A), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(96.0, 58.0, 0.0), Point(96.093714, 42.000274, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(96.093714, 42.000274, 0.0), Point(-89.687352, 474.336193, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(96.093714, 42.000274, 0.0), Point(276.797603, 476.482789, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(H, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(F_4, G), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H, F_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([A, C, G, H]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Line(Point(23.836, 75.99952, 0.0), Point(23.877, 68.99964, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(23.877, 68.99964, 0.0), Point(-161.904067, 501.335558, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(23.877, 68.99964, 0.0), Point(204.580889, 503.482155, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)

if __name__ == "__main__":
    viewer.show()
