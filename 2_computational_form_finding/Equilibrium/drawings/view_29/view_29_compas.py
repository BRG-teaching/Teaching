"""
COMPAS translation of GeoGebra applet: Constant force bottom chord truss
Source: https://block.arch.ethz.ch/eq/drawing/view/29
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
LL0 = Point(21.0, 10.0, 0.0)  # LL0
G2 = Point(13.0, 6.5, 0.0)  # G2
G1 = Point(1.0, 6.5, 0.0)  # G1
J = Point(3.0, 7.75, 0.0)  # J
L = Point(5.0, 8.5, 0.0)  # L
frameBL = Point(-0.42159, 0.12659, 0.0)  # frameBL
fBR = Point(23.920714, 0.12659, 0.0)  # fBR
frameTR = Point(23.920714, 12.297742, 0.0)  # frameTR
fTL = Point(-0.42159, 12.297742, 0.0)  # fTL
A = Point(3.0, 6.5, 0.0)  # A
B = Point(5.0, 6.5, 0.0)  # B
C = Point(7.0, 6.5, 0.0)  # C
D = Point(9.0, 6.5, 0.0)  # D
E = Point(11.0, 6.5, 0.0)  # E
H = Point(21.0, 7.5, 0.0)  # H
N = Point(7.0, 8.75, 0.0)  # N
P = Point(9.0, 8.5, 0.0)  # P
R = Point(11.0, 7.75, 0.0)  # R
T = Point(17.0, 10.0, 0.0)  # T
U = Point(17.0, 9.0, 0.0)  # U
LL5 = Point(21.0, 9.0, 0.0)  # LL5
V = Point(17.0, 9.0, 0.0)  # V
W = Point(17.0, 8.0, 0.0)  # W
Z = Point(17.0, 8.0, 0.0)  # Z
LL4 = Point(21.0, 8.0, 0.0)  # LL4
A_1 = Point(17.0, 7.0, 0.0)  # A_1
LL3 = Point(21.0, 7.0, 0.0)  # LL3
B_1 = Point(17.0, 7.0, 0.0)  # B_1
LL2 = Point(21.0, 6.0, 0.0)  # LL2
C_1 = Point(17.0, 6.0, 0.0)  # C_1
D_1 = Point(17.0, 6.0, 0.0)  # D_1
E_1 = Point(17.0, 5.0, 0.0)  # E_1
LL1 = Point(21.0, 5.0, 0.0)  # LL1
J_1 = Point(1.0, 11.149141, 0.0)  # J_1
K_1 = Point(1.0, 1.0, 0.0)  # K_1
L_1 = Point(13.0, 1.0, 0.0)  # L_1
M_1 = Point(13.0, 11.149141, 0.0)  # M_1
O_1 = Point(21.6, 10.0, 0.0)  # O_1
P_1 = Point(21.6, 7.5, 0.0)  # P_1
Q_1 = Point(21.6, 5.0, 0.0)  # Q_1
R_1 = Point(21.0, 10.622737, 0.0)  # R_1
S_1 = Point(17.0, 10.622737, 0.0)  # S_1

# --- geometry ---
S.add(LL0, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(G2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(G1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(G1, G2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(J, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(L, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Polyline([frameBL, fBR, frameTR, fTL, frameBL]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(3.0, 6.0, 0.0), Point(3.0, 5.2, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.0, 5.2, 0.0), Point(2.49243, 6.400517, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 5.2, 0.0), Point(3.50757, 6.400517, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 6.0, 0.0), Point(5.0, 5.2, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.0, 5.2, 0.0), Point(4.49243, 6.400517, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 5.2, 0.0), Point(5.50757, 6.400517, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 6.0, 0.0), Point(7.0, 5.2, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.0, 5.2, 0.0), Point(6.49243, 6.400517, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 5.2, 0.0), Point(7.50757, 6.400517, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 6.0, 0.0), Point(9.0, 5.2, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.0, 5.2, 0.0), Point(8.49243, 6.400517, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 5.2, 0.0), Point(9.50757, 6.400517, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 6.0, 0.0), Point(11.0, 5.2, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.0, 5.2, 0.0), Point(10.49243, 6.400517, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 5.2, 0.0), Point(11.50757, 6.400517, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 11.149141, 0.0), Point(3.0, 1.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(5.0, 11.149141, 0.0), Point(5.0, 1.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(7.0, 11.149141, 0.0), Point(7.0, 1.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(9.0, 11.149141, 0.0), Point(9.0, 1.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(11.0, 11.149141, 0.0), Point(11.0, 1.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(21.0, 10.0, 0.0), Point(21.0, 9.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 9.0, 0.0), Point(20.49243, 10.200517, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 9.0, 0.0), Point(21.50757, 10.200517, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 9.0, 0.0), Point(21.0, 8.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 8.0, 0.0), Point(20.49243, 9.200517, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 8.0, 0.0), Point(21.50757, 9.200517, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 8.0, 0.0), Point(21.0, 7.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 7.0, 0.0), Point(20.49243, 8.200517, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 7.0, 0.0), Point(21.50757, 8.200517, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 7.0, 0.0), Point(21.0, 6.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 6.0, 0.0), Point(20.49243, 7.200517, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 6.0, 0.0), Point(21.50757, 7.200517, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 6.0, 0.0), Point(21.0, 5.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 5.0, 0.0), Point(20.49243, 6.200517, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 5.0, 0.0), Point(21.50757, 6.200517, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(A, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(B, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(C, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(D, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(E, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(H, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(Line(G1, J), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A, J), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J, L), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B, L), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A, L), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(N, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(L, N), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B, N), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C, N), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(P, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(N, P), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D, P), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N, D), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P, E), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(R, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(P, R), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E, R), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R, G2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL0, T), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T, U), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL5, V), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V, U), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V, W), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W, Z), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL4, Z), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z, A_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL3, A_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H, B_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_1, A_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL2, C_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_1, B_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_1, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_1, C_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_1, E_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_1, LL1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_1, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(1.0, 5.2, 0.0), Point(1.0, 6.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(1.0, 6.0, 0.0), Point(1.50757, 4.799483, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(1.0, 6.0, 0.0), Point(0.49243, 4.799483, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 5.2, 0.0), Point(13.0, 6.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.0, 6.0, 0.0), Point(13.50757, 4.799483, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 6.0, 0.0), Point(12.49243, 4.799483, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 5.2, 0.0), Point(3.0, 4.4, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.0, 4.4, 0.0), Point(2.49243, 5.600517, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 4.4, 0.0), Point(3.50757, 5.600517, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Polygon([G1, J, H, E_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([G1, A, E_1, LL1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([J, A, D_1, E_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([J, L, H, D_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([A, L, D_1, C_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([A, B, C_1, LL2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([L, B, B_1, C_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([L, N, H, B_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([B, N, B_1, A_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([B, C, A_1, LL3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([N, C, Z, A_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([N, P, H, W]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([N, D, W, Z]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([C, D, Z, LL4]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([P, D, V, W]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([P, R, H, U]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([P, E, U, V]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([D, E, V, LL5]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([R, E, T, U]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([R, G2, H, T]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([E, G2, T, LL0]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Line(J_1, K_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_1, M_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(21.6, 5.0, 0.0), Point(21.6, 7.5, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.6, 7.5, 0.0), Point(22.10757, 6.299483, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.6, 7.5, 0.0), Point(21.09243, 6.299483, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.6, 7.5, 0.0), Point(21.6, 10.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.6, 10.0, 0.0), Point(22.10757, 8.799483, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.6, 10.0, 0.0), Point(21.09243, 8.799483, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(LL0, O_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H, P_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL1, Q_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(R_1, pointcolor=Color(0.502, 0.502, 0.502), pointsize=3.0)
S.add(S_1, pointcolor=Color(0.502, 0.502, 0.502), pointsize=3.0)
S.add(Line(R_1, S_1), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(R_1, LL0), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_1, T), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)

if __name__ == "__main__":
    viewer.show()
