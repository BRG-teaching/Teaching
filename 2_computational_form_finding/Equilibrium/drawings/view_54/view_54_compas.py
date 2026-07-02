"""
COMPAS translation of GeoGebra applet: Cathedral of Laon
Source: https://block.arch.ethz.ch/eq/drawing/view/54
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
C = Point(7.780946, 8.328982, 0.0)  # C
A = Point(5.698728, 11.011009, 0.0)  # A
GuidePtB_1 = Point(6.739837, 11.169996, 0.0)  # GuidePtB_1
GuidePtB_2 = Point(6.739837, 9.769996, 0.0)  # GuidePtB_2
B = Point(6.739837, 10.340502, 0.0)  # B
B_p = Point(6.739837, 11.011009, 0.0)  # B_p
K = Point(17.106215, 10.669222, 0.0)  # K
H = Point(9.631599, 4.986, 0.0)  # H
E = Point(9.242479, 7.088374, 0.0)  # E
GuidePtD_1 = Point(8.511712, 9.208678, 0.0)  # GuidePtD_1
GuidePtD_2 = Point(8.511712, 7.808678, 0.0)  # GuidePtD_2
D = Point(8.511712, 8.395279, 0.0)  # D
D_p = Point(8.511712, 9.081879, 0.0)  # D_p
F = Point(7.780946, 4.986, 0.0)  # F
I_reset = Point(7.484539, 2.753186, 0.0)  # I_{reset}
A_6 = Point(7.780846, 2.753186, 0.0)  # A_6
I = Point(7.484539, 2.753186, 0.0)  # I
frameBL = Point(2.0, 2.0, 0.0)  # frameBL
fBR = Point(22.0, 2.0, 0.0)  # fBR
frameTR = Point(22.0, 12.0, 0.0)  # frameTR
fTL = Point(2.0, 12.0, 0.0)  # fTL
GuidePtL_1 = Point(8.706272, 6.486, 0.0)  # GuidePtL_1
GuidePtL_2 = Point(8.706272, 5.086, 0.0)  # GuidePtL_2
G = Point(8.706272, 5.780588, 0.0)  # G
G_p = Point(8.706272, 6.575176, 0.0)  # G_p
L = Point(17.106215, 8.669222, 0.0)  # L
M = Point(16.329855, 10.669222, 0.0)  # M
R1_1 = Point(17.106215, 10.502555, 0.0)  # R1_1
R1_2 = Point(17.106215, 10.335889, 0.0)  # R1_2
R1_3 = Point(17.106215, 10.169222, 0.0)  # R1_3
R1_4 = Point(17.106215, 10.002555, 0.0)  # R1_4
R1_5 = Point(17.106215, 9.835889, 0.0)  # R1_5
R1_6 = Point(17.106215, 9.669222, 0.0)  # R1_6
R1_7 = Point(17.106215, 9.502555, 0.0)  # R1_7
R1_8 = Point(17.106215, 9.335889, 0.0)  # R1_8
R1_9 = Point(17.106215, 9.169222, 0.0)  # R1_9
R1_10 = Point(17.106215, 9.002555, 0.0)  # R1_{10}
R1_11 = Point(17.106215, 8.835889, 0.0)  # R1_{11}
N_1 = Point(5.785487, 11.011009, 0.0)  # N_1
P_3 = Point(5.959005, 10.973759, 0.0)  # P_3
Q_2 = Point(6.132523, 10.899258, 0.0)  # Q_2
R_2 = Point(6.306041, 10.787507, 0.0)  # R_2
S_2 = Point(6.47956, 10.638505, 0.0)  # S
T = Point(6.653078, 10.452254, 0.0)  # T
U = Point(6.826596, 10.228751, 0.0)  # U
V = Point(7.000114, 9.967999, 0.0)  # V
W = Point(7.173632, 9.669996, 0.0)  # W
A_1 = Point(7.34715, 9.334742, 0.0)  # A_1
Z = Point(7.520668, 8.962239, 0.0)  # Z
O_1 = Point(7.694187, 8.552485, 0.0)  # O_1
O = Point(17.106215, 5.751469, 0.0)  # O
N = Point(16.329855, 7.869351, 0.0)  # N
B_1 = Point(17.106215, 8.426076, 0.0)  # B_1
C_1 = Point(17.106215, 8.18293, 0.0)  # C_1
D_1 = Point(17.106215, 7.939784, 0.0)  # D_1
F_3 = Point(17.106215, 7.696638, 0.0)  # F_3
G_1 = Point(17.106215, 7.453492, 0.0)  # G_1
H_1 = Point(17.106215, 7.210346, 0.0)  # H_1
I_1 = Point(17.106215, 6.9672, 0.0)  # I_1
J_1 = Point(17.106215, 6.724054, 0.0)  # J_1
K_1 = Point(17.106215, 6.480908, 0.0)  # K_1
L_1 = Point(17.106215, 6.237761, 0.0)  # L_1
M_1 = Point(17.106215, 5.994615, 0.0)  # M_1
D_2 = Point(7.841843, 8.391724, 0.0)  # D_2
F_2 = Point(7.963637, 8.479062, 0.0)  # F_2
H_2 = Point(8.085432, 8.528256, 0.0)  # H_2
J_2 = Point(8.207226, 8.539305, 0.0)  # J_2
L_2 = Point(8.329021, 8.51221, 0.0)  # L_2
N_2 = Point(8.450815, 8.446971, 0.0)  # N_2
O_2 = Point(8.572609, 8.343587, 0.0)  # O_2
M_2 = Point(8.694404, 8.202058, 0.0)  # M_2
K_2 = Point(8.816198, 8.022385, 0.0)  # K_2
I_2 = Point(8.937993, 7.804568, 0.0)  # I_2
G_2 = Point(9.059787, 7.548606, 0.0)  # G_2
E_8 = Point(9.181581, 7.254499, 0.0)  # E_8
P = Point(17.106215, 3.674763, 0.0)  # P
J = Point(10.190891, 2.753186, 0.0)  # J
Q = Point(15.848408, 8.696199, 0.0)  # Q
R = Point(15.848408, 7.042503, 0.0)  # R
P_2 = Point(15.848408, 8.558391, 0.0)  # P_2
S_2_2 = Point(15.848408, 8.420583, 0.0)  # S_2
T_2 = Point(15.848408, 8.282775, 0.0)  # T_2
U_2 = Point(15.848408, 8.144967, 0.0)  # U_2
V_2 = Point(15.848408, 8.007159, 0.0)  # V_2
W_2 = Point(15.848408, 7.869351, 0.0)  # W_2
Z_2 = Point(15.848408, 7.731543, 0.0)  # Z_2
A_3 = Point(15.848408, 7.593735, 0.0)  # A_3
B_3 = Point(15.848408, 7.455927, 0.0)  # B_3
C_3 = Point(15.848408, 7.318119, 0.0)  # C_3
D_3 = Point(15.848408, 7.180311, 0.0)  # D_3
S_3 = Point(7.858056, 5.118431, 0.0)  # S_3
U_3 = Point(8.012277, 5.33915, 0.0)  # U_3
W_3 = Point(8.166498, 5.515725, 0.0)  # W_3
A_4 = Point(8.320719, 5.648157, 0.0)  # A_4
C_4 = Point(8.474941, 5.736444, 0.0)  # C_4
E_4 = Point(8.629162, 5.780588, 0.0)  # E_4
F_4 = Point(8.783383, 5.780588, 0.0)  # F_4
D_4 = Point(8.937604, 5.736444, 0.0)  # D_4
B_4 = Point(9.091825, 5.648157, 0.0)  # B_4
Z_3 = Point(9.246046, 5.515725, 0.0)  # Z_3
V_3 = Point(9.400267, 5.33915, 0.0)  # V_3
T_3 = Point(9.554488, 5.118431, 0.0)  # T_3
R_4 = Point(5.698728, 11.332691, 0.0)  # R_4
S_4 = Point(7.780946, 11.332691, 0.0)  # S_4
T_4 = Point(7.780946, 11.532691, 0.0)  # T_4
Q_4 = Point(5.698728, 11.532691, 0.0)  # Q_4
U_4 = Point(7.780946, 9.644755, 0.0)  # U_4
Z_4 = Point(9.242479, 9.644755, 0.0)  # Z_4
W_4 = Point(9.242479, 9.844755, 0.0)  # W_4
V_4 = Point(7.780946, 9.844755, 0.0)  # V_4
A_5 = Point(7.780946, 6.725281, 0.0)  # A_5
C_5 = Point(9.631599, 6.725281, 0.0)  # C_5
D_5 = Point(9.631599, 6.925281, 0.0)  # D_5
B_5 = Point(7.780946, 6.925281, 0.0)  # B_5
N_5 = Point(6.739837, 11.732691, 0.0)  # N_5
F_5 = Point(6.739837, 9.469996, 0.0)  # F_5
M_5 = Point(5.698728, 11.732691, 0.0)  # M_5
O_5 = Point(7.780946, 11.732691, 0.0)  # O_5
P_5 = Point(8.511712, 10.044755, 0.0)  # P_5
R_5 = Point(8.511712, 7.508678, 0.0)  # R_5
Q_5 = Point(9.242479, 10.044755, 0.0)  # Q_5
U_5 = Point(8.706272, 7.125281, 0.0)  # U_5
S_5 = Point(8.706272, 4.786, 0.0)  # S_5
V_5 = Point(9.631599, 7.125281, 0.0)  # V_5
T_5 = Point(7.780946, 7.125281, 0.0)  # T_5
Q_6 = Point(17.106215, 10.669222, 0.0)  # Q_6
R_6 = Point(17.106215, 8.669222, 0.0)  # R_6
S_6 = Point(17.106215, 5.751469, 0.0)  # S_6
T_6 = Point(17.106215, 3.674763, 0.0)  # T_6
Z_6 = Point(17.106215, 10.669222, 0.0)  # Z_6
A_7 = Point(16.329855, 10.669222, 0.0)  # A_7
C_7 = Point(17.106215, 8.669222, 0.0)  # C_7
J_7 = Point(16.329855, 7.869351, 0.0)  # J_7
L_7 = Point(16.329855, 7.869351, 0.0)  # L_7
M_7 = Point(17.106215, 5.751469, 0.0)  # M_7
O_7 = Point(15.848408, 8.696199, 0.0)  # O_7
P_7 = Point(15.848408, 7.042503, 0.0)  # P_7
Z_7 = Point(16.329855, 10.669222, 0.0)  # Z_7
W_7 = Point(15.848408, 7.042503, 0.0)  # W_7
U_7 = Point(15.848408, 8.696199, 0.0)  # U_7
V_7 = Point(17.106215, 3.674763, 0.0)  # V_7
F_8 = Point(16.329855, 10.669222, 0.0)  # F_8
D_8 = Point(17.106215, 3.674763, 0.0)  # D_8
L_8 = Point(15.848408, 8.696199, 0.0)  # L_8
N_8 = Point(15.848408, 7.042503, 0.0)  # N_8
B_7 = Point(16.329855, 10.669222, 0.0)  # B_7
K_7 = Point(17.106215, 8.669222, 0.0)  # K_7
C_8 = Point(16.329855, 7.869351, 0.0)  # C_8
G_8 = Point(16.329855, 7.869351, 0.0)  # G_8
M_8 = Point(16.329855, 7.869351, 0.0)  # M_8
O_8 = Point(16.329855, 7.869351, 0.0)  # O_8

# --- geometry ---
S.add(C, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(A, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(GuidePtB_1, GuidePtB_2), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(B, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(B_p, C), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(K, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(H, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(E, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(GuidePtD_1, GuidePtD_2), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(D, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(C, D_p), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(E, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=2.4)
S.add(F, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(I_reset, A_6), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.8)
S.add(I, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(F, I), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Polyline([frameBL, fBR, frameTR, fTL, frameBL]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GuidePtL_1, GuidePtL_2), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(G, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(A, B), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(B, C), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(A, C), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(C, E), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(C, D), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(D, E), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(F, G), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(G, H), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(F, H), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(D_p, E), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(F, G_p), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(G_p, H), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(K, L), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M, R1_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M, R1_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M, R1_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M, R1_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M, R1_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M, R1_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M, R1_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M, R1_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M, R1_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M, R1_10), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M, R1_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M, L), linecolor=Color(0.0, 0.0, 0.0), linewidth=2.4)
S.add(Line(M, K), linecolor=Color(0.0, 0.0, 0.0), linewidth=2.4)
S.add(Line(A, B_p), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Polyline([A, N_1, P_3, Q_2, R_2, S_2, T, U, V, W, A_1, Z, O_1, C]), linecolor=Color(0.0, 0.0, 0.0), linewidth=2.4)
S.add(Line(L, O), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N, L), linecolor=Color(0.0, 0.0, 0.0), linewidth=2.4)
S.add(Line(N, B_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N, C_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N, D_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N, F_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N, H_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N, I_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N, J_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N, K_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N, L_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N, M_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N, O), linecolor=Color(0.0, 0.0, 0.0), linewidth=2.4)
S.add(Polyline([C, D_2, F_2, H_2, J_2, L_2, N_2, O_2, M_2, K_2, I_2, G_2, E_8, E]), linecolor=Color(0.0, 0.0, 0.0), linewidth=2.4)
S.add(Line(M, N), linecolor=Color(0.0, 0.0, 0.0), linewidth=2.4)
S.add(Line(N, P), linecolor=Color(0.0, 0.0, 0.0), linewidth=2.4)
S.add(J, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(H, J), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Q, R), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N, Q), linecolor=Color(0.0, 0.0, 0.0), linewidth=2.4)
S.add(Line(N, R), linecolor=Color(0.0, 0.0, 0.0), linewidth=2.4)
S.add(Line(Point(9.242479, 7.688374, 0.0), Point(9.242479, 7.188374, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.242479, 7.188374, 0.0), Point(8.731977, 8.395824, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.242479, 7.188374, 0.0), Point(9.75298, 8.395824, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(N, P_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N, S_2_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N, T_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N, U_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N, V_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N, W_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N, Z_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N, A_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N, C_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N, D_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Polyline([F, S_3, U_3, W_3, A_4, C_4, E_4, F_4, D_4, B_4, Z_3, V_3, T_3, H]), linecolor=Color(0.0, 0.0, 0.0), linewidth=2.4)
S.add(Line(C, F), linecolor=Color(0.0, 0.0, 0.0), linewidth=2.4)
S.add(Line(Point(5.198728, 11.011009, 0.0), Point(5.698728, 11.011009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.698728, 11.011009, 0.0), Point(4.491278, 10.500507, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.698728, 11.011009, 0.0), Point(4.491278, 11.521511, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.418742, 2.257534, 0.0), Point(7.484539, 2.753186, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.484539, 2.753186, 0.0), Point(7.831706, 1.489057, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.484539, 2.753186, 0.0), Point(6.819582, 1.623417, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.312381, 2.26817, 0.0), Point(10.190891, 2.753186, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.190891, 2.753186, 0.0), Point(10.97948, 1.705964, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.190891, 2.753186, 0.0), Point(9.989075, 1.45788, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.739837, 11.232691, 0.0), Point(6.739837, 10.732691, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(6.739837, 10.732691, 0.0), Point(6.229335, 11.94014, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.739837, 10.732691, 0.0), Point(7.250338, 11.94014, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.511712, 9.544755, 0.0), Point(8.511712, 9.044755, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.511712, 9.044755, 0.0), Point(8.001211, 10.252204, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.511712, 9.044755, 0.0), Point(9.022214, 10.252204, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.706272, 6.625281, 0.0), Point(8.706272, 6.125281, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.706272, 6.125281, 0.0), Point(8.195771, 7.332731, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.706272, 6.125281, 0.0), Point(9.216774, 7.332731, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Polygon([R_4, S_4, T_4, Q_4]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.2, opacity=0.15)
S.add(Polygon([U_4, Z_4, W_4, V_4]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.2, opacity=0.15)
S.add(Polygon([A_5, C_5, D_5, B_5]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.2, opacity=0.15)
S.add(Line(N_5, F_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_5, A), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_5, C), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_5, R_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Q_5, E), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_5, S_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(V_5, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F, T_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(7.961882, 7.862868, 0.0), Point(7.780946, 8.328982, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.780946, 8.328982, 0.0), Point(8.693792, 7.3881, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.780946, 8.328982, 0.0), Point(7.741984, 7.018628, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.432705, 7.970195, 0.0), Point(7.780946, 8.328982, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.780946, 8.328982, 0.0), Point(7.306301, 7.106992, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.780946, 8.328982, 0.0), Point(6.573656, 7.818103, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.414568, 6.618922, 0.0), Point(9.242479, 7.088374, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.242479, 7.088374, 0.0), Point(10.137368, 6.130397, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.242479, 7.088374, 0.0), Point(9.178744, 5.778991, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.780946, 7.828982, 0.0), Point(7.777485, 8.325417, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.777485, 8.325417, 0.0), Point(8.296391, 7.121555, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.777485, 8.325417, 0.0), Point(7.275412, 7.114438, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.333476, 6.596724, 0.0), Point(9.242479, 7.088374, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.242479, 7.088374, 0.0), Point(9.964204, 5.993998, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.242479, 7.088374, 0.0), Point(8.960253, 5.808181, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.780946, 4.486, 0.0), Point(7.780946, 4.986, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.780946, 4.986, 0.0), Point(8.291447, 3.77855, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.780946, 4.986, 0.0), Point(7.270444, 3.77855, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.72348, 4.489577, 0.0), Point(9.631599, 4.986, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.631599, 4.986, 0.0), Point(10.353325, 3.891624, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.631599, 4.986, 0.0), Point(9.349373, 3.705807, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.529354, 4.553911, 0.0), Point(7.780946, 4.986, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.780946, 4.986, 0.0), Point(7.614541, 3.685671, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.780946, 4.986, 0.0), Point(6.732211, 4.199423, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.885489, 4.549964, 0.0), Point(9.631599, 4.986, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.631599, 4.986, 0.0), Point(10.680333, 4.199423, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.631599, 4.986, 0.0), Point(9.798003, 3.685671, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.715148, 4.490348, 0.0), Point(7.780946, 4.986, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.780946, 4.986, 0.0), Point(8.128113, 3.721871, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.780946, 4.986, 0.0), Point(7.115989, 3.856231, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.754266, 4.496285, 0.0), Point(9.634754, 4.980582, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.634754, 4.980582, 0.0), Point(10.419677, 3.93061, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.634754, 4.980582, 0.0), Point(9.428411, 3.685989, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.106215, 10.669222, 0.0), Point(17.106215, 8.669222, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(17.106215, 8.669222, 0.0), Point(16.595713, 9.876672, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.106215, 8.669222, 0.0), Point(17.616716, 9.876672, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.106215, 8.669222, 0.0), Point(17.106215, 5.751469, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(17.106215, 5.751469, 0.0), Point(16.595713, 6.958919, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.106215, 5.751469, 0.0), Point(17.616716, 6.958919, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.106215, 5.751469, 0.0), Point(17.106215, 3.674763, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(17.106215, 3.674763, 0.0), Point(16.595713, 4.882212, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.106215, 3.674763, 0.0), Point(17.616716, 4.882212, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(O, P), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K, Q_6), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(L, R_6), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(O, S_6), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(P, T_6), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(16.329855, 10.669222, 0.0), Point(17.106215, 10.669222, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(17.106215, 10.669222, 0.0), Point(15.898765, 10.15872, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.106215, 10.669222, 0.0), Point(15.898765, 11.179723, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.106215, 8.669222, 0.0), Point(16.329855, 10.669222, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.329855, 10.669222, 0.0), Point(17.242701, 9.72834, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.329855, 10.669222, 0.0), Point(16.290894, 9.358867, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(K, Z_6), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(M, A_7), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(L, C_7), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(16.329855, 7.869351, 0.0), Point(17.106215, 8.669222, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(17.106215, 8.669222, 0.0), Point(16.63157, 7.447232, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.106215, 8.669222, 0.0), Point(15.898925, 8.158342, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.106215, 5.751469, 0.0), Point(16.329855, 7.869351, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.329855, 7.869351, 0.0), Point(17.224744, 6.911374, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.329855, 7.869351, 0.0), Point(16.26612, 6.559968, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(J_7, N), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(L_7, N), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(M_7, O), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(15.848408, 8.696199, 0.0), Point(15.848408, 7.042503, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.848408, 7.042503, 0.0), Point(15.337906, 8.249953, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.848408, 7.042503, 0.0), Point(16.358909, 8.249953, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(O_7, Q), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(P_7, R), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Q, P), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(R, M), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Q, P), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R, M), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(17.106215, 3.674763, 0.0), Point(15.848408, 8.696199, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.848408, 8.696199, 0.0), Point(16.636997, 7.648977, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.848408, 8.696199, 0.0), Point(15.646592, 7.400893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.848408, 7.042503, 0.0), Point(16.329855, 10.669222, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.329855, 10.669222, 0.0), Point(16.677022, 9.405093, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.329855, 10.669222, 0.0), Point(15.664898, 9.539452, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Z_7, M), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(W_7, R), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(U_7, Q), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(V_7, P), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(16.329855, 7.869351, 0.0), Point(16.329855, 10.669222, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.329855, 10.669222, 0.0), Point(16.840356, 9.461772, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.329855, 10.669222, 0.0), Point(15.819353, 9.461772, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.106215, 3.674763, 0.0), Point(16.329855, 7.869351, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.329855, 7.869351, 0.0), Point(17.051581, 6.774975, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.329855, 7.869351, 0.0), Point(16.047629, 6.589158, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(F_8, M), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(D_8, P), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(16.329855, 7.869351, 0.0), Point(15.848408, 8.696199, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.848408, 8.696199, 0.0), Point(16.897142, 7.909622, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.848408, 8.696199, 0.0), Point(16.014812, 7.39587, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.848408, 7.042503, 0.0), Point(16.329855, 7.869351, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.329855, 7.869351, 0.0), Point(16.16345, 6.569022, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.329855, 7.869351, 0.0), Point(15.28112, 7.082774, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(L_8, Q), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(N_8, R), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(17.106215, 3.674763, 0.0), Point(15.848408, 8.696199, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.848408, 8.696199, 0.0), Point(16.636997, 7.648977, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.848408, 8.696199, 0.0), Point(15.646592, 7.400893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.848408, 7.042503, 0.0), Point(16.329855, 10.669222, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.329855, 10.669222, 0.0), Point(16.677022, 9.405093, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.329855, 10.669222, 0.0), Point(15.664898, 9.539452, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(P, N), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N, O), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(M, K), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(M, L), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(M, B_7), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(M, R1_6), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(L, N), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(K_7, L), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(M, R1_3), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(M, R1_9), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(C_8, N), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(G_8, N), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(M_8, N), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(O_8, N), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Q, N), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(N, R), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(T_2, N), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(W_2, N), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(B_3, N), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(N, D_1), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(N, H_1), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(N, K_1), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)

# transpiler notes:
#   - segment i_{11}: endpoints unresolved (Segment)

if __name__ == "__main__":
    viewer.show()
