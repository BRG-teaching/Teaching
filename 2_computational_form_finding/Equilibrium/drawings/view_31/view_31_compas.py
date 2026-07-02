"""
COMPAS translation of GeoGebra applet: Eiffel Tower, G. Eiffel
Source: https://block.arch.ethz.ch/eq/drawing/view/31
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
W = Point(14.0, 3.0, 0.0)  # W
F_1 = Point(15.451074, 6.117226, 0.0)  # F_1
A = Point(5.0, 3.0, 0.0)  # A
G_1 = Point(10.785379, 4.250337, 0.0)  # G_1
B = Point(7.18, 3.0, 0.0)  # B
R_1 = Point(6.09, 10.502024, 0.0)  # R_1
Z = Point(14.6, 3.0, 0.0)  # Z
H_1 = Point(11.12675, 5.500675, 0.0)  # H_1
A_1 = Point(15.2, 3.0, 0.0)  # A_1
I_1 = Point(11.227457, 6.751012, 0.0)  # I_1
B_1 = Point(15.8, 3.0, 0.0)  # B_1
J_1 = Point(11.087501, 8.001349, 0.0)  # J_1
C_1 = Point(16.4, 3.0, 0.0)  # C_1
D_1 = Point(17.0, 3.0, 0.0)  # D_1
E_1 = Point(17.6, 3.0, 0.0)  # E_1
O_1 = Point(6.09, 7.376181, 0.0)  # O_1
B_2 = Point(5.311429, 4.250337, 0.0)  # B_2
frameBL = Point(1.637146, 1.269901, 0.0)  # frameBL
fBR = Point(23.193017, 1.269901, 0.0)  # fBR
frameTR = Point(23.193017, 12.047836, 0.0)  # frameTR
fTL = Point(1.637146, 12.047836, 0.0)  # fTL
K_1 = Point(10.706881, 9.251687, 0.0)  # K_1
L_1 = Point(10.085598, 10.502024, 0.0)  # L_1
M_1 = Point(12.240465, 7.376181, 0.0)  # M_1
A_2 = Point(17.3, 10.22672, 0.0)  # A_2
P_1 = Point(15.8, 10.22672, 0.0)  # P_1
T_1 = Point(16.1, 10.22672, 0.0)  # T_1
U_1 = Point(16.4, 10.22672, 0.0)  # U_1
W_1 = Point(16.7, 10.22672, 0.0)  # W_1
Z_1 = Point(17.0, 10.22672, 0.0)  # Z_1
C_2 = Point(5.570952, 5.500675, 0.0)  # C_2
D_2 = Point(5.778571, 6.751012, 0.0)  # D_2
E_2 = Point(5.934286, 8.001349, 0.0)  # E_2
F_2 = Point(6.038095, 9.251687, 0.0)  # F_2
G_2 = Point(6.868571, 4.250337, 0.0)  # G_2
H_2 = Point(6.141905, 9.251687, 0.0)  # H_2
I_2 = Point(6.245714, 8.001349, 0.0)  # I_2
J_2 = Point(6.401429, 6.751012, 0.0)  # J_2
K_2 = Point(6.609048, 5.500675, 0.0)  # K_2
V_2 = Point(2.697184, 4.250337, 0.0)  # V_2
W_2 = Point(12.363894, 4.250337, 0.0)  # W_2
U_2 = Point(2.697184, 5.500675, 0.0)  # U_2
Z_2 = Point(12.363894, 5.500675, 0.0)  # Z_2
T_2 = Point(2.697184, 6.751012, 0.0)  # T_2
A_3 = Point(12.363894, 6.751012, 0.0)  # A_3
S_2 = Point(2.697184, 7.376181, 0.0)  # S_2
B_3 = Point(12.363894, 7.376181, 0.0)  # B_3
R_2 = Point(2.697184, 8.001349, 0.0)  # R_2
C_3 = Point(12.363894, 8.001349, 0.0)  # C_3
Q_2 = Point(2.697184, 9.251687, 0.0)  # Q_2
D_3 = Point(12.363894, 9.251687, 0.0)  # D_3
P_2 = Point(2.697184, 10.502024, 0.0)  # P_2
E_3 = Point(12.363894, 10.502024, 0.0)  # E_3
H_3 = Point(5.109688, 7.376181, 0.0)  # H_3
K_3 = Point(5.0, 2.176456, 0.0)  # K_3
N_3 = Point(6.09, 3.0, 0.0)  # N_3
L_3 = Point(6.09, 2.176456, 0.0)  # L_3
M_3 = Point(7.18, 2.176456, 0.0)  # M_3
Q_3 = Point(17.6, 2.176456, 0.0)  # Q_3
O_3 = Point(14.0, 2.176456, 0.0)  # O_3
P_3 = Point(15.8, 2.176456, 0.0)  # P_3
S_3 = Point(14.6, 2.176456, 0.0)  # S_3
T_3 = Point(16.1, 2.176456, 0.0)  # T_3
R_3 = Point(16.1, 3.0, 0.0)  # R_3
A_4 = Point(14.0, 2.2, 0.0)  # A_4
F_4 = Point(17.6, 2.2, 0.0)  # F_4
U_3 = Point(13.611859, 3.096677, 0.0)  # U_3
C_4 = Point(17.988141, 3.096677, 0.0)  # C_4
Z_3 = Point(15.411859, 10.323397, 0.0)  # Z_3
D_4 = Point(16.188141, 10.323397, 0.0)  # D_4

# --- geometry ---
S.add(W, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(F_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(F_1, W), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(A, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(G_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(B, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(R_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(F_1, Z), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(H_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(F_1, A_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(I_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(F_1, B_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(J_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(F_1, C_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(F_1, D_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(F_1, E_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(A, O_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(B_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Polyline([frameBL, fBR, frameTR, fTL, frameBL]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(3.367144, 10.502024, 0.0), Point(4.367144, 10.502024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.367144, 10.502024, 0.0), Point(3.375939, 10.082949, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.367144, 10.502024, 0.0), Point(3.375939, 10.921099, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.367144, 9.251687, 0.0), Point(4.367144, 9.251687, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.367144, 9.251687, 0.0), Point(3.375939, 8.832612, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.367144, 9.251687, 0.0), Point(3.375939, 9.670762, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.367144, 8.001349, 0.0), Point(4.367144, 8.001349, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.367144, 8.001349, 0.0), Point(3.375939, 7.582275, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.367144, 8.001349, 0.0), Point(3.375939, 8.420424, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.367144, 6.751012, 0.0), Point(4.367144, 6.751012, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.367144, 6.751012, 0.0), Point(3.375939, 6.331937, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.367144, 6.751012, 0.0), Point(3.375939, 7.170087, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.367144, 5.500675, 0.0), Point(4.367144, 5.500675, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.367144, 5.500675, 0.0), Point(3.375939, 5.0816, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.367144, 5.500675, 0.0), Point(3.375939, 5.91975, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.367144, 4.250337, 0.0), Point(4.367144, 4.250337, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.367144, 4.250337, 0.0), Point(3.375939, 3.831262, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.367144, 4.250337, 0.0), Point(3.375939, 4.669412, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.0, 3.0, 0.0), Point(14.6, 3.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.6, 3.0, 0.0), Point(13.608795, 2.580925, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.6, 3.0, 0.0), Point(13.608795, 3.419075, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.6, 3.0, 0.0), Point(15.2, 3.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.2, 3.0, 0.0), Point(14.208795, 2.580925, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.2, 3.0, 0.0), Point(14.208795, 3.419075, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.2, 3.0, 0.0), Point(15.8, 3.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.8, 3.0, 0.0), Point(14.808795, 2.580925, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.8, 3.0, 0.0), Point(14.808795, 3.419075, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.8, 3.0, 0.0), Point(16.4, 3.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.4, 3.0, 0.0), Point(15.408795, 2.580925, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.4, 3.0, 0.0), Point(15.408795, 3.419075, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.4, 3.0, 0.0), Point(17.0, 3.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(17.0, 3.0, 0.0), Point(16.008795, 2.580925, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.0, 3.0, 0.0), Point(16.008795, 3.419075, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.0, 3.0, 0.0), Point(17.6, 3.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(17.6, 3.0, 0.0), Point(16.608795, 2.580925, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.6, 3.0, 0.0), Point(16.608795, 3.419075, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Polyline([G_1, H_1, I_1, J_1, K_1, L_1]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(G_1, M_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(M_1, L_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(L_1, G_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(B, O_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(E_1, A_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_1, E_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_1, E_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_1, U_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W_1, E_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_1, E_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W, P_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z, T_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_1, U_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_1, W_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_1, Z_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_1, A_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(C_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(D_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(E_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(F_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(G_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(H_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(I_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(J_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(K_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(B_2, G_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_2, K_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_2, J_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_2, I_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_2, H_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_1, T_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_1, U_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_1, W_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W_1, Z_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_1, A_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(7.421691, 2.029647, 0.0), Point(7.18, 3.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.18, 3.0, 0.0), Point(7.826216, 2.139468, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.18, 3.0, 0.0), Point(7.012915, 1.936894, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(V_2, W_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_2, Z_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_2, A_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_2, B_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.8)
S.add(Line(R_2, C_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_2, D_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_2, E_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(H_3, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(4.109688, 7.376181, 0.0), Point(5.109688, 7.376181, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.109688, 7.376181, 0.0), Point(4.118483, 6.957106, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.109688, 7.376181, 0.0), Point(4.118483, 7.795256, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Polygon([A, B_2, W, P_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_2, C_2, Z, T_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([C_2, D_2, A_1, U_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([D_2, E_2, B_1, W_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([E_2, F_2, C_1, Z_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([F_2, R_1, D_1, A_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_2, G_2, T_1, P_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([C_2, K_2, U_1, T_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([D_2, J_2, W_1, U_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([E_2, I_2, Z_1, W_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([F_2, H_2, A_2, Z_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B, G_2, P_1, E_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([G_2, K_2, T_1, E_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([K_2, J_2, U_1, E_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([J_2, I_2, W_1, E_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([I_2, H_2, Z_1, E_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([H_2, R_1, A_2, E_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Line(A, B_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_2, G_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B, G_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_2, K_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_2, J_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_2, I_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_2, H_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_2, R_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_2, C_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_2, D_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_2, E_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_2, F_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_2, R_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(K_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(N_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(K_3, L_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(L_3, M_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(K_3, A), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(M_3, B), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(L_3, N_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Q_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(W, O_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(O_3, P_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(P_3, Q_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Q_3, E_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(P_3, B_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(B_1, P_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(S_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(T_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(Q_3, T_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(T_3, S_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(S_3, Z), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(T_3, R_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(R_3, T_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(15.411859, 10.323397, 0.0), Point(13.611859, 3.096677, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.611859, 3.096677, 0.0), Point(13.444774, 4.159783, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.611859, 3.096677, 0.0), Point(14.258075, 3.957209, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.988141, 3.096677, 0.0), Point(16.188141, 10.323397, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.188141, 10.323397, 0.0), Point(16.834358, 9.462865, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.188141, 10.323397, 0.0), Point(16.021056, 9.260291, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(A_4, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(F_4, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(Line(Point(14.0, 2.2, 0.0), Point(17.6, 2.2, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(17.6, 2.2, 0.0), Point(16.608795, 1.780925, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(17.6, 2.2, 0.0), Point(16.608795, 2.619075, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(A_4, W), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_4, E_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W, U_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_1, C_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_3, P_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_4, P_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(4.758309, 2.029647, 0.0), Point(5.0, 3.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.0, 3.0, 0.0), Point(5.167085, 1.936894, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 3.0, 0.0), Point(4.353784, 2.139468, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(B_2, G_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(B_2, G_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)

if __name__ == "__main__":
    viewer.show()
