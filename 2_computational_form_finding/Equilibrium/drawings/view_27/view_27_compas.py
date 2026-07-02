"""
COMPAS translation of GeoGebra applet: Constant force top chord truss
Source: https://block.arch.ethz.ch/eq/drawing/view/27
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
G2 = Point(13.0, 8.5, 0.0)  # G2
G1 = Point(1.0, 8.5, 0.0)  # G1
H = Point(21.0, 7.5, 0.0)  # H
frameBL = Point(-0.421592, 0.126594, 0.0)  # frameBL
fBR = Point(23.936462, 0.126594, 0.0)  # fBR
frameTR = Point(23.936462, 12.305621, 0.0)  # frameTR
fTL = Point(-0.421592, 12.305621, 0.0)  # fTL
A = Point(3.0, 8.5, 0.0)  # A
B = Point(5.0, 8.5, 0.0)  # B
C = Point(7.0, 8.5, 0.0)  # C
D = Point(9.0, 8.5, 0.0)  # D
E = Point(11.0, 8.5, 0.0)  # E
J = Point(3.0, 7.25, 0.0)  # J
L = Point(5.0, 6.5, 0.0)  # L
N = Point(7.0, 6.25, 0.0)  # N
P = Point(9.0, 6.5, 0.0)  # P
R = Point(11.0, 7.25, 0.0)  # R
T = Point(17.0, 10.0, 0.0)  # T
U = Point(17.0, 9.0, 0.0)  # U
LL1 = Point(21.0, 9.0, 0.0)  # LL1
V = Point(17.0, 9.0, 0.0)  # V
W = Point(17.0, 8.0, 0.0)  # W
Z = Point(17.0, 8.0, 0.0)  # Z
LL2 = Point(21.0, 8.0, 0.0)  # LL2
A_1 = Point(17.0, 7.0, 0.0)  # A_1
LL3 = Point(21.0, 7.0, 0.0)  # LL3
B_1 = Point(17.0, 7.0, 0.0)  # B_1
LL4 = Point(21.0, 6.0, 0.0)  # LL4
C_1 = Point(17.0, 6.0, 0.0)  # C_1
D_1 = Point(17.0, 6.0, 0.0)  # D_1
E_1 = Point(17.0, 5.0, 0.0)  # E_1
LL5 = Point(21.0, 5.0, 0.0)  # LL5
J_1 = Point(1.0, 11.097159, 0.0)  # J_1
K_1 = Point(1.0, 1.03294, 0.0)  # K_1
L_1 = Point(13.0, 1.03294, 0.0)  # L_1
M_1 = Point(13.0, 11.097159, 0.0)  # M_1
O_1 = Point(21.6, 10.0, 0.0)  # O_1
P_1 = Point(21.6, 7.5, 0.0)  # P_1
Q_1 = Point(21.6, 5.0, 0.0)  # Q_1
R_1 = Point(21.0, 10.567505, 0.0)  # R_1
S_1 = Point(17.0, 10.567505, 0.0)  # S_1

# --- geometry ---
S.add(LL0, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(G2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(G1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(G1, G2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(H, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(Polyline([frameBL, fBR, frameTR, fTL, frameBL]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(3.0, 10.0, 0.0), Point(3.0, 9.2, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.0, 9.2, 0.0), Point(2.559874, 10.240996, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 9.2, 0.0), Point(3.440126, 10.240996, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 10.0, 0.0), Point(5.0, 9.2, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.0, 9.2, 0.0), Point(4.559874, 10.240996, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 9.2, 0.0), Point(5.440126, 10.240996, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 10.0, 0.0), Point(7.0, 9.2, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.0, 9.2, 0.0), Point(6.559874, 10.240996, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 9.2, 0.0), Point(7.440126, 10.240996, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 10.0, 0.0), Point(9.0, 9.2, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.0, 9.2, 0.0), Point(8.559874, 10.240996, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 9.2, 0.0), Point(9.440126, 10.240996, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 10.0, 0.0), Point(11.0, 9.2, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.0, 9.2, 0.0), Point(10.559874, 10.240996, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 9.2, 0.0), Point(11.440126, 10.240996, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 11.097159, 0.0), Point(3.0, 1.03294, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(5.0, 11.097159, 0.0), Point(5.0, 1.03294, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(7.0, 11.097159, 0.0), Point(7.0, 1.03294, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(9.0, 11.097159, 0.0), Point(9.0, 1.03294, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(11.0, 11.097159, 0.0), Point(11.0, 1.03294, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(21.0, 10.0, 0.0), Point(21.0, 9.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 9.0, 0.0), Point(20.559874, 10.040996, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 9.0, 0.0), Point(21.440126, 10.040996, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 9.0, 0.0), Point(21.0, 8.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 8.0, 0.0), Point(20.559874, 9.040996, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 8.0, 0.0), Point(21.440126, 9.040996, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 8.0, 0.0), Point(21.0, 7.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 7.0, 0.0), Point(20.559874, 8.040996, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 7.0, 0.0), Point(21.440126, 8.040996, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 7.0, 0.0), Point(21.0, 6.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 6.0, 0.0), Point(20.559874, 7.040996, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 6.0, 0.0), Point(21.440126, 7.040996, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 6.0, 0.0), Point(21.0, 5.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 5.0, 0.0), Point(20.559874, 6.040996, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 5.0, 0.0), Point(21.440126, 6.040996, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(A, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(B, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(C, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(D, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(E, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(J, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(G1, J), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A, J), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(L, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
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
S.add(Line(LL1, V), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V, U), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V, W), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W, Z), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL2, Z), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z, A_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL3, A_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H, B_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_1, A_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL4, C_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_1, B_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_1, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_1, C_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_1, E_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_1, LL5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_1, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(1.0, 6.95, 0.0), Point(1.0, 7.75, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(1.0, 7.75, 0.0), Point(1.440126, 6.709004, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(1.0, 7.75, 0.0), Point(0.559874, 6.709004, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 6.95, 0.0), Point(13.0, 7.75, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.0, 7.75, 0.0), Point(13.440126, 6.709004, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 7.75, 0.0), Point(12.559874, 6.709004, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Polygon([G1, A, LL0, T]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([G1, J, T, H]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([A, J, U, T]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([A, B, LL1, V]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([A, L, V, U]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([J, L, U, H]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([B, L, W, V]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([B, C, LL2, Z]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([B, N, Z, W]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([L, N, W, H]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([C, N, A_1, Z]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([C, D, LL3, A_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([N, D, A_1, B_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([N, P, B_1, H]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([D, P, C_1, B_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([D, E, LL4, C_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([P, E, C_1, D_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([P, R, D_1, H]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([E, R, E_1, D_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([E, G2, LL5, E_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([R, G2, E_1, H]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Line(Point(3.0, 10.8, 0.0), Point(3.0, 10.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.0, 10.0, 0.0), Point(2.559874, 11.040996, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 10.0, 0.0), Point(3.440126, 11.040996, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(J_1, K_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_1, M_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(21.6, 5.0, 0.0), Point(21.6, 7.5, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.6, 7.5, 0.0), Point(22.040126, 6.459004, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.6, 7.5, 0.0), Point(21.159874, 6.459004, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.6, 7.5, 0.0), Point(21.6, 10.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.6, 10.0, 0.0), Point(22.040126, 8.959004, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.6, 10.0, 0.0), Point(21.159874, 8.959004, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(LL0, O_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H, P_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL5, Q_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(R_1, pointcolor=Color(0.502, 0.502, 0.502), pointsize=3.0)
S.add(S_1, pointcolor=Color(0.502, 0.502, 0.502), pointsize=3.0)
S.add(Line(S_1, T), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_1, LL0), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_1, S_1), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)

if __name__ == "__main__":
    viewer.show()
