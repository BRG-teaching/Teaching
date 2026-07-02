"""
COMPAS translation of GeoGebra applet: Internal forces in a three-hinged frame – line load
Source: https://block.arch.ethz.ch/eq/drawing/view/43
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
A = Point(0.0, 2.098138, 0.0)  # A
C = Point(8.0, 2.098138, 0.0)  # C
B_p = Point(0.01, 10.098138, 0.0)  # B'
D_p = Point(7.99, 10.098138, 0.0)  # D'
B = Point(0.0, 10.098138, 0.0)  # B
D = Point(8.0, 10.098138, 0.0)  # D
I = Point(4.006553, 10.098138, 0.0)  # I
P_3 = Point(4.006553, 12.556198, 0.0)  # P_3
Q = Point(4.006553, 12.106198, 0.0)  # Q
O = Point(8.0, 12.106198, 0.0)  # O
L2 = Point(8.0, 12.556198, 0.0)  # L2
L1 = Point(0.0, 12.556198, 0.0)  # L1
N_5 = Point(0.0, 12.106198, 0.0)  # N_5
F = Point(-2.3603, 10.098138, 0.0)  # F
H = Point(-2.3603, 2.098138, 0.0)  # H
LL0 = Point(18.0, 8.0, 0.0)  # LL0
B_1 = Point(0.0, 0.196673, 0.0)  # B_1
E = Point(0.0, -0.817282, 0.0)  # E
G = Point(8.0, -0.817282, 0.0)  # G
C_1 = Point(4.006553, 0.196673, 0.0)  # C_1
K_1 = Point(16.400004, 8.0, 0.0)  # K_1
D_1 = Point(8.0, 0.196673, 0.0)  # D_1
K = Point(18.0, -4.8, 0.0)  # K
J_1 = Point(16.400004, -4.8, 0.0)  # J_1
Z = Point(2.003277, 14.111266, 0.0)  # Z
A_1 = Point(6.003277, 14.085053, 0.0)  # A_1
A_N = Point(0.0, -12.901862, 0.0)  # A_N
C_N = Point(8.0, -12.901862, 0.0)  # C_N
B_N = Point(0.0, -4.901862, 0.0)  # B_N
D_N = Point(8.0, -4.901862, 0.0)  # D_N
O_2 = Point(2.133333, -12.901862, 0.0)  # O_2
K_2 = Point(2.133333, -4.90187, 0.0)  # K_2
C_2 = Point(-2e-06, -5.435194, 0.0)  # C_2
E_2 = Point(8.000002, -5.435194, 0.0)  # E_2
N_2 = Point(5.866667, -4.90187, 0.0)  # N_2
P_2 = Point(5.866667, -12.901862, 0.0)  # P_2
B_6 = Point(4.006553, -12.901862, 0.0)  # B_6
M_5 = Point(4.006553, 11.20533, 0.0)  # M_5
J_5 = Point(0.0, 11.20533, 0.0)  # J_5
K_5 = Point(0.0, -12.901862, 0.0)  # K_5
P_5 = Point(8.0, 11.20533, 0.0)  # P_5
D_6 = Point(8.0, -12.901862, 0.0)  # D_6
B_2 = Point(18.0, -6.76463, 0.0)  # B_2
D_2 = Point(16.400004, -6.76463, 0.0)  # D_2
frameBL = Point(-18.389161, -14.982149, 0.0)  # frameBL
fBR = Point(40.520671, -14.982149, 0.0)  # fBR
fTL = Point(-18.389161, 14.472767, 0.0)  # fTL
frameTR = Point(40.520671, 14.472767, 0.0)  # frameTR
T = Point(18.5, 8.0, 0.0)  # T
U = Point(18.5, -4.8, 0.0)  # U

# --- geometry ---
S.add(A, pointcolor=Color(0.7529, 0.7529, 0.7529), pointsize=4.5)
S.add(C, pointcolor=Color(0.7529, 0.7529, 0.7529), pointsize=4.5)
S.add(Line(B_p, D_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(B, D), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(I, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Polygon([P_3, Q, O, L2]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.2, opacity=0.15)
S.add(Polygon([L1, N_5, Q, P_3]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.2, opacity=0.15)
S.add(F, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(H, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(Line(F, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(LL0, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(B_1, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(E, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(G, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(Line(E, G), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(C_1, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(Line(B_1, C_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(16.400004, -4.8, 0.0), Point(16.400004, 1.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.400004, 1.6, 0.0), Point(17.464447, -0.917643, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.400004, 1.6, 0.0), Point(15.335562, -0.917643, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.400004, 8.0, 0.0), Point(18.0, 8.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(18.0, 8.0, 0.0), Point(15.482357, 6.935558, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.0, 8.0, 0.0), Point(15.482357, 9.064442, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.0, -4.8, 0.0), Point(16.400004, -4.8, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.400004, -4.8, 0.0), Point(18.917647, -3.735558, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.400004, -4.8, 0.0), Point(18.917647, -5.864442, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.400004, 1.6, 0.0), Point(16.400004, 8.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.400004, 8.0, 0.0), Point(17.464447, 5.482357, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.400004, 8.0, 0.0), Point(15.335562, 5.482357, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(K_1, LL0), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A, B), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(D, C), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(D_1, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(Line(C_1, D_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_1, D_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K, J_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(-1.2, 2.098138, 0.0), Point(0.0, 2.098138, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 2.098138, 0.0), Point(-2.517643, 1.033696, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 2.098138, 0.0), Point(-2.517643, 3.16258, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 0.898138, 0.0), Point(0.0, 2.098138, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 2.098138, 0.0), Point(1.064442, -0.419505, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 2.098138, 0.0), Point(-1.064442, -0.419505, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.0, 0.898138, 0.0), Point(8.0, 2.098138, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.0, 2.098138, 0.0), Point(9.064442, -0.419505, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.0, 2.098138, 0.0), Point(6.935558, -0.419505, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.2, 2.098138, 0.0), Point(8.0, 2.098138, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.0, 2.098138, 0.0), Point(10.517643, 3.16258, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.0, 2.098138, 0.0), Point(10.517643, 1.033696, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(A, Z), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Z, C), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(A_1, C), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(A_N, pointcolor=Color(0.7529, 0.7529, 0.7529), pointsize=4.5)
S.add(C_N, pointcolor=Color(0.7529, 0.7529, 0.7529), pointsize=4.5)
S.add(Line(A_N, B_N), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(B_N, D_N), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(D_N, C_N), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(A_N, O_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(O_2, K_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(K_2, B_N), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_N, C_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_2, E_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(E_2, D_N), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_N, N_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_2, P_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(P_2, C_N), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(B_6, M_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_5, K_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_5, D_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(B_2, pointcolor=Color(0.502, 0.502, 0.502), pointsize=3.0)
S.add(D_2, pointcolor=Color(0.502, 0.502, 0.502), pointsize=3.0)
S.add(Line(B_2, D_2), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(K, B_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(J_1, D_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(frameBL, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(fBR, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Polyline([frameBL, fTL, frameTR, fBR]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(frameBL, fBR), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L1, P_3), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(P_3, Q), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Q, N_5), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(N_5, L1), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(P_3, L2), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(L2, O), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(O, Q), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(2.003277, 11.644943, 0.0), Point(2.003277, 10.444943, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(2.003277, 10.444943, 0.0), Point(0.938834, 12.962586, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(2.003277, 10.444943, 0.0), Point(3.067719, 12.962586, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.003277, 11.644943, 0.0), Point(6.003277, 10.444943, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(6.003277, 10.444943, 0.0), Point(4.938834, 12.962586, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.003277, 10.444943, 0.0), Point(7.067719, 12.962586, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.0, 8.0, 0.0), Point(18.0, 1.589515, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(18.0, 1.589515, 0.0), Point(16.935558, 4.107158, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.0, 1.589515, 0.0), Point(19.064442, 4.107158, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.0, 1.589515, 0.0), Point(18.0, -4.8, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(18.0, -4.8, 0.0), Point(16.935558, -2.282357, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.0, -4.8, 0.0), Point(19.064442, -2.282357, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(LL0, T), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K, U), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)

if __name__ == "__main__":
    viewer.show()
