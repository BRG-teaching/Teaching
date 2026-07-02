"""
COMPAS translation of GeoGebra applet: Single panel truss
Source: https://block.arch.ethz.ch/eq/drawing/view/36
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
O = Point(10.0, 5.0, 0.0)  # O
C = Point(3.611657, 3.996072, 0.0)  # C
N = Point(3.29528, 4.944706, 0.0)  # N
B = Point(6.0, 2.0, 0.0)  # B
A = Point(2.0, 2.0, 0.0)  # A
R = Point(14.182103, 3.974216, 0.0)  # R
O_p = Point(11.423698, 0.73115, 0.0)  # O'
Q = Point(4.982953, -0.115652, 0.0)  # Q
S_2 = Point(2.502696, 0.492705, 0.0)  # S
T = Point(6.220383, 1.339199, 0.0)  # T
U = Point(10.613128, 3.161582, 0.0)  # U
V = Point(8.515635, 3.161582, 0.0)  # V
U_1 = Point(0.723404, 5.827774, 0.0)  # U_1
D_2 = Point(2.928873, -0.785155, 0.0)  # D_2
B_2 = Point(4.723404, 5.827774, 0.0)  # B_2
F_2 = Point(6.928873, -0.785155, 0.0)  # F_2
W = Point(11.423698, 3.161582, 0.0)  # W
C_3 = Point(10.897718, 3.256495, 0.0)  # C_3
frameBL = Point(-0.437236, -1.453431, 0.0)  # frameBL
A_3 = Point(-0.437236, 6.575281, 0.0)  # A_3
frameTR = Point(15.620187, 6.575281, 0.0)  # frameTR
Z_2 = Point(15.620187, -1.453431, 0.0)  # Z_2
B_3 = Point(11.708288, 0.826063, 0.0)  # B_3

# --- geometry ---
S.add(O, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(C, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(N, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(3.29528, 4.944706, 0.0), Point(3.611657, 3.996072, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.611657, 3.996072, 0.0), Point(3.119305, 4.555277, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.611657, 3.996072, 0.0), Point(3.669782, 4.738866, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(B, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(C, B), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(A, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(A, C), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(R, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(O, R), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(R, O_p), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Q, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(S_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(T, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(S_2, T), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(S_2, Q), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(Q, T), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(U, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Line(R, U), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(V, O_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O, V), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(3.928035, 3.047439, 0.0), Point(3.611657, 3.996072, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.611657, 3.996072, 0.0), Point(4.104009, 3.436867, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.611657, 3.996072, 0.0), Point(3.553533, 3.253278, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Polygon([C, B, O_p, V]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([A, C, O, V]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Line(U_1, D_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_2, F_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(6.189826, 1.43082, 0.0), Point(6.0, 2.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(6.0, 2.0, 0.0), Point(6.492352, 1.440795, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.0, 2.0, 0.0), Point(5.941876, 1.257206, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(2.189826, 1.43082, 0.0), Point(2.0, 2.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(2.0, 2.0, 0.0), Point(2.492352, 1.440795, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(2.0, 2.0, 0.0), Point(1.941876, 1.257206, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(W, V), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U, C_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(11.423698, 3.161582, 0.0), Point(11.423698, 5.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.423698, 5.0, 0.0), Point(11.71384, 4.31375, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.423698, 5.0, 0.0), Point(11.133556, 4.31375, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.423698, 5.0, 0.0), Point(10.0, 5.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.0, 5.0, 0.0), Point(10.68625, 5.290142, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.0, 5.0, 0.0), Point(10.68625, 4.709858, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.708288, 0.826063, 0.0), Point(10.28459, 5.094913, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.28459, 5.094913, 0.0), Point(10.776942, 4.535708, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.28459, 5.094913, 0.0), Point(10.226466, 4.352119, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.897718, 3.256495, 0.0), Point(10.28459, 5.094913, 0.0)), linecolor=Color(0.0, 0.6, 0.2), linewidth=3.0)  # vector
S.add(Line(Point(10.28459, 5.094913, 0.0), Point(10.776942, 4.535708, 0.0)), linecolor=Color(0.0, 0.6, 0.2), linewidth=3.0)
S.add(Line(Point(10.28459, 5.094913, 0.0), Point(10.226466, 4.352119, 0.0)), linecolor=Color(0.0, 0.6, 0.2), linewidth=3.0)
S.add(Polyline([frameBL, A_3, frameTR, Z_2, frameBL]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(10.0, 5.0, 0.0), Point(11.423698, 0.73115, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.423698, 0.73115, 0.0), Point(10.931346, 1.290355, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.423698, 0.73115, 0.0), Point(11.481822, 1.473943, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(O_p, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(11.423698, 0.73115, 0.0), Point(11.423698, 3.161582, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.423698, 3.161582, 0.0), Point(11.71384, 2.475332, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.423698, 3.161582, 0.0), Point(11.133556, 2.475332, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Polygon([B, A, W, V]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Circle.from_point_and_radius(Point(6.0, 1.870096, 0.0), 0.129904), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(5.50359, 1.4, 0.0), Point(6.19641, 2.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.0)
S.add(Line(Point(5.589304, 1.4, 0.0), Point(6.282124, 2.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.0)
S.add(Line(Point(5.675018, 1.4, 0.0), Point(6.367839, 2.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.0)
S.add(Line(Point(5.760733, 1.4, 0.0), Point(6.453553, 2.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.0)
S.add(Line(Point(5.846447, 1.4, 0.0), Point(6.539267, 2.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.0)
S.add(Line(Point(6.6, 2.556731, 0.0), Point(5.932161, 1.4, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.0)
S.add(Line(Point(6.6, 2.408269, 0.0), Point(6.017876, 1.4, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.0)
S.add(Line(Point(6.6, 2.259808, 0.0), Point(6.10359, 1.4, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.0)
S.add(Line(Point(5.4, 1.740192, 0.0), Point(6.6, 1.740192, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.8)
S.add(Line(Point(1.4, 1.740192, 0.0), Point(2.6, 1.740192, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.8)
S.add(Line(Point(1.50359, 1.4, 0.0), Point(2.19641, 2.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.0)
S.add(Line(Point(1.589304, 1.4, 0.0), Point(2.282124, 2.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.0)
S.add(Line(Point(1.675018, 1.4, 0.0), Point(2.367839, 2.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.0)
S.add(Line(Point(1.760733, 1.4, 0.0), Point(2.453553, 2.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.0)
S.add(Line(Point(1.846447, 1.4, 0.0), Point(2.539267, 2.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.0)
S.add(Line(Point(2.6, 2.556731, 0.0), Point(1.932161, 1.4, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.0)
S.add(Line(Point(2.6, 2.408269, 0.0), Point(2.017876, 1.4, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.0)
S.add(Line(Point(2.6, 2.259808, 0.0), Point(2.10359, 1.4, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.0)
S.add(Line(Point(0.79, 2.0, 0.0), Point(1.79, 2.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(1.79, 2.0, 0.0), Point(1.10375, 1.709858, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(1.79, 2.0, 0.0), Point(1.10375, 2.290142, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(2.0, 0.530192, 0.0), Point(2.0, 1.530192, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(2.0, 1.530192, 0.0), Point(2.290142, 0.843943, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(2.0, 1.530192, 0.0), Point(1.709858, 0.843943, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.0, 0.530192, 0.0), Point(6.0, 1.530192, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(6.0, 1.530192, 0.0), Point(6.290142, 0.843943, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.0, 1.530192, 0.0), Point(5.709858, 0.843943, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)

if __name__ == "__main__":
    viewer.show()
