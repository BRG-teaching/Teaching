"""
COMPAS translation of GeoGebra applet: Continuous beam – cantilever
Source: https://block.arch.ethz.ch/eq/drawing/view/41
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
FD_0 = Point(14.054434, 9.40477, 0.0)  # FD_0
D_2 = Point(14.054434, 4.235702, 0.0)  # D_2
Q_2 = Point(13.704434, 5.522527, 0.0)  # Q_2
A = Point(4.110852, 6.265675, 0.0)  # A
C = Point(9.720069, 6.265675, 0.0)  # C
G = Point(9.720069, 6.802238, 0.0)  # G
F = Point(4.110852, 6.802238, 0.0)  # F
U_4 = Point(6.915461, 6.265675, 0.0)  # U_4
B = Point(7.960373, 6.265675, 0.0)  # B
A_p_p = Point(4.110852, 6.41343, 0.0)  # A''
E_1 = Point(6.915461, 7.206088, 0.0)  # E_1
C_1 = Point(6.915461, 6.51343, 0.0)  # C_1
P1 = Point(6.915461, 7.127457, 0.0)  # P1
B_p_p = Point(7.960373, 6.41343, 0.0)  # B''
A_2 = Point(11.901477, 4.235702, 0.0)  # A_2
F_1 = Point(14.054434, 9.937283, 0.0)  # F_1
K_3 = Point(16.207392, 4.235702, 0.0)  # K_3
W_2 = Point(14.054434, 6.215441, 0.0)  # W_2
L_3 = Point(16.207392, 6.993723, 0.0)  # L_3
H_1 = Point(8.840221, 6.73149, 0.0)  # H_1
W_3 = Point(14.054434, 7.837945, 0.0)  # W_3
L_5 = Point(16.207392, 8.163734, 0.0)  # L_5
T_3 = Point(14.054434, 7.47595, 0.0)  # T_3
O_2 = Point(14.054434, 7.566449, 0.0)  # O_2
P_2 = Point(14.054434, 7.656948, 0.0)  # P_2
U_3 = Point(14.054434, 7.747447, 0.0)  # U_3
FD_2 = Point(14.054434, 7.385452, 0.0)  # FD_2
V = Point(14.404434, 7.385452, 0.0)  # V
V_3 = Point(14.054434, 7.928444, 0.0)  # V_3
M_2 = Point(14.054434, 8.361091, 0.0)  # M_2
H = Point(11.901477, 8.711856, 0.0)  # H
FD_1 = Point(14.054434, 8.018943, 0.0)  # FD_1
frameBL = Point(2.589981, 2.903628, 0.0)  # frameBL
fBR = Point(19.443155, 2.903628, 0.0)  # fBR
frameTR = Point(19.443155, 11.330215, 0.0)  # frameTR
fTL = Point(2.589981, 11.330215, 0.0)  # fTL
K = Point(4.110852, 9.031508, 0.0)  # K
L = Point(9.720069, 9.031508, 0.0)  # L
O = Point(9.720069, 9.301508, 0.0)  # O
M = Point(4.110852, 9.301508, 0.0)  # M
G_1 = Point(6.035612, 7.0329, 0.0)  # G_1
P = Point(14.404434, 9.40477, 0.0)  # P
J_1 = Point(11.901477, 8.856647, 0.0)  # J_1
K_1 = Point(14.054434, 8.856647, 0.0)  # K_1
T = Point(14.404434, 8.856647, 0.0)  # T
J = Point(14.054434, 8.711856, 0.0)  # J
O_1 = Point(11.901477, 9.937283, 0.0)  # O_1
Z_2 = Point(14.054434, 6.993723, 0.0)  # Z_2
J_3 = Point(14.054434, 9.054004, 0.0)  # J_3
M_3 = Point(16.207392, 9.054004, 0.0)  # M_3
F_3 = Point(14.054434, 8.909213, 0.0)  # F_3
I_3 = Point(6.035612, 9.937283, 0.0)  # I_3
S_3 = Point(6.035612, 4.235702, 0.0)  # S_3
O_3 = Point(6.915461, 9.937283, 0.0)  # O_3
R_3 = Point(6.915461, 4.235702, 0.0)  # R_3
P_3 = Point(8.840221, 9.937283, 0.0)  # P_3
Q_3 = Point(8.840221, 4.235702, 0.0)  # Q_3
C1_p = Point(9.720069, 6.790662, 0.0)  # C1'
A_3 = Point(14.054434, 9.206795, 0.0)  # A_3
B_3 = Point(14.054434, 9.008819, 0.0)  # B_3
C_3 = Point(14.054434, 8.810844, 0.0)  # C_3
D_3 = Point(14.054434, 8.612869, 0.0)  # D_3
S_2 = Point(14.054434, 8.414893, 0.0)  # S_2
T_2 = Point(14.054434, 8.216918, 0.0)  # T_2
PL1_1_p = Point(4.592042, 6.568298, 0.0)  # PL1_1'
PL1_2_p = Point(5.073232, 6.678917, 0.0)  # PL1_2'
PL1_3_p = Point(5.554422, 6.745289, 0.0)  # PL1_3'
PL1_4_p = Point(6.035612, 6.767413, 0.0)  # PL1_4'
PL1_5_p = Point(6.516802, 6.745289, 0.0)  # PL1_5'
PL1_6_p = Point(6.997992, 6.678917, 0.0)  # PL1_6'
PL1_7_p = Point(7.479183, 6.568298, 0.0)  # PL1_7'
B1 = Point(7.960373, 6.41343, 0.0)  # B1
PL4_1_p = Point(8.180335, 6.492945, 0.0)  # PL4_1'
PL4_2_p = Point(8.400297, 6.563214, 0.0)  # PL4_2'
PL4_3_p = Point(8.620259, 6.624237, 0.0)  # PL4_3'
PL4_4_p = Point(8.840221, 6.676014, 0.0)  # PL4_4'
PL4_5_p = Point(9.060183, 6.718545, 0.0)  # PL4_5'
PL4_6_p = Point(9.280145, 6.75183, 0.0)  # PL4_6'
PL4_7_p = Point(9.500107, 6.775869, 0.0)  # PL4_7'
R_4 = Point(16.207392, 9.937283, 0.0)  # R_4
K_2 = Point(14.404434, 8.018943, 0.0)  # K_2
N_3 = Point(13.704434, 9.054004, 0.0)  # N_3
V_4 = Point(4.592042, 6.258563, 0.0)  # V_4
W_4 = Point(5.073232, 6.147943, 0.0)  # W_4
Z_4 = Point(5.554422, 6.081571, 0.0)  # Z_4
A_5 = Point(6.035612, 6.059447, 0.0)  # A_5
B_5 = Point(6.516802, 6.081571, 0.0)  # B_5
C_5 = Point(6.997992, 6.147943, 0.0)  # C_5
D_5 = Point(7.479183, 6.258563, 0.0)  # D_5
E_5 = Point(8.180335, 6.333915, 0.0)  # E_5
F_5 = Point(8.400297, 6.263646, 0.0)  # F_5
G_5 = Point(8.620259, 6.202623, 0.0)  # G_5
H_5 = Point(8.840221, 6.150846, 0.0)  # H_5
I_5 = Point(9.060183, 6.108315, 0.0)  # I_5
J_5 = Point(9.280145, 6.07503, 0.0)  # J_5
K_5 = Point(9.500107, 6.050991, 0.0)  # K_5
C1_p_p = Point(9.720069, 6.036199, 0.0)  # C1''
Z_3 = Point(13.354434, 5.522527, 0.0)  # Z_3
N_5 = Point(13.704434, 6.215441, 0.0)  # N_5
M_5 = Point(13.354434, 6.993723, 0.0)  # M_5
O_5 = Point(13.354434, 8.361091, 0.0)  # O_5
G_3 = Point(13.704434, 8.361091, 0.0)  # G_3
R_5 = Point(13.354434, 8.909213, 0.0)  # R_5
P_5 = Point(14.054434, 8.856647, 0.0)  # P_5
V_5 = Point(11.901477, 7.874152, 0.0)  # V_5
S_5 = Point(11.901477, 7.240661, 0.0)  # S_5
U_5 = Point(11.551477, 7.874152, 0.0)  # U_5
T_5 = Point(11.551477, 7.240661, 0.0)  # T_5
M_1 = Point(14.404434, 7.385452, 0.0)  # M_1
I_1 = Point(7.960373, 9.031508, 0.0)  # I_1
D_1 = Point(7.960373, 9.301508, 0.0)  # D_1
H_p = Point(16.207392, 8.711856, 0.0)  # H'
P_1 = Point(11.901477, 8.163734, 0.0)  # P_1
P_p = Point(13.704434, 9.40477, 0.0)  # P'
T_p = Point(13.704434, 8.856647, 0.0)  # T'
Q_1 = Point(13.704434, 7.385452, 0.0)  # Q_1
R_1 = Point(16.207392, 7.240661, 0.0)  # R_1
V_1 = Point(16.207392, 7.874152, 0.0)  # V_1
U_1 = Point(16.557392, 7.874152, 0.0)  # U_1
T_1 = Point(16.557392, 7.240661, 0.0)  # T_1

# --- geometry ---
S.add(FD_0, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(D_2, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Q_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Polygon([A, C, G, F]), linecolor=Color(0.0, 0.0, 0.0), facecolor=Color(0.0, 0.0, 0.0), linewidth=1.2, opacity=0.15)
S.add(Line(U_4, C), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(B, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(A_p_p, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(E_1, C_1), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(P1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(P1, B_p_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_p_p, P1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(A_2, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(Point(14.404434, 7.385452, 0.0), Point(14.404434, 8.856647, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.404434, 8.856647, 0.0), Point(14.755753, 8.025701, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.404434, 8.856647, 0.0), Point(14.053116, 8.025701, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.404434, 8.018943, 0.0), Point(14.404434, 8.711856, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.404434, 8.711856, 0.0), Point(14.755753, 7.88091, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.404434, 8.711856, 0.0), Point(14.053116, 7.88091, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(F_1, D_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(K_3, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(W_2, L_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_p_p, H_1), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(A_p_p, H_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W_3, L_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(T_3, L_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(O_2, L_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_2, L_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(U_3, L_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(FD_2, V), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V_3, L_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(A_2, D_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(M_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(14.404434, 8.711856, 0.0), Point(14.404434, 9.40477, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.404434, 9.40477, 0.0), Point(14.755753, 8.573823, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.404434, 9.40477, 0.0), Point(14.053116, 8.573823, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(H, FD_0), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(FD_1, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(frameBL, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(fBR, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Polyline([frameBL, fBR, frameTR, fTL, frameBL]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C, G), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(F, A), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Polygon([K, L, O, M]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.8, opacity=0.15)
S.add(Line(A_p_p, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_1, B_p_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_p_p, H_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(14.054434, 9.40477, 0.0), Point(14.054434, 8.018943, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.054434, 8.018943, 0.0), Point(13.703116, 8.849889, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.054434, 8.018943, 0.0), Point(14.405753, 8.849889, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.404434, 8.856647, 0.0), Point(14.404434, 9.40477, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.404434, 9.40477, 0.0), Point(14.755753, 8.573823, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.404434, 9.40477, 0.0), Point(14.053116, 8.573823, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(FD_0, P), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(FD_2, V), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(6.915461, 7.802457, 0.0), Point(6.915461, 7.127457, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(6.915461, 7.127457, 0.0), Point(6.564142, 7.958404, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.915461, 7.127457, 0.0), Point(7.266779, 7.958404, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.035612, 7.7079, 0.0), Point(6.035612, 7.0329, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(6.035612, 7.0329, 0.0), Point(5.684294, 7.863847, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.035612, 7.0329, 0.0), Point(6.386931, 7.863847, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.840221, 7.40649, 0.0), Point(8.840221, 6.73149, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.840221, 6.73149, 0.0), Point(8.488902, 7.562437, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.840221, 6.73149, 0.0), Point(9.19154, 7.562437, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(J_1, FD_0), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_1, FD_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(K_1, pointcolor=Color(1.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(J_1, K_1), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_1, T), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(H, J), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(3.381852, 6.265675, 0.0), Point(3.921852, 6.265675, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.921852, 6.265675, 0.0), Point(3.090905, 5.914357, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.921852, 6.265675, 0.0), Point(3.090905, 6.616994, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.510852, 6.031848, 0.0), Point(4.710852, 6.031848, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(Point(3.629442, 5.665675, 0.0), Point(4.322262, 6.865675, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(3.706585, 5.665675, 0.0), Point(4.399405, 6.865675, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(3.783728, 5.665675, 0.0), Point(4.476548, 6.865675, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(3.86087, 5.665675, 0.0), Point(4.553691, 6.865675, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(3.938013, 5.665675, 0.0), Point(4.630834, 6.865675, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(4.015156, 5.665675, 0.0), Point(4.707976, 6.865675, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(4.710852, 6.737041, 0.0), Point(4.092299, 5.665675, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(4.710852, 6.603425, 0.0), Point(4.169442, 5.665675, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(4.110852, 5.302848, 0.0), Point(4.110852, 5.842848, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.110852, 5.842848, 0.0), Point(4.462171, 5.011902, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.110852, 5.842848, 0.0), Point(3.759533, 5.011902, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.960373, 5.302848, 0.0), Point(7.960373, 5.842848, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.960373, 5.842848, 0.0), Point(8.311691, 5.011902, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.960373, 5.842848, 0.0), Point(7.609054, 5.011902, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Circle.from_point_and_radius(Point(7.960373, 6.148762, 0.0), 0.116913), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(7.478962, 5.665675, 0.0), Point(8.171783, 6.865675, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(7.556105, 5.665675, 0.0), Point(8.248926, 6.865675, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(7.633248, 5.665675, 0.0), Point(8.326069, 6.865675, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(7.710391, 5.665675, 0.0), Point(8.403211, 6.865675, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(7.787534, 5.665675, 0.0), Point(8.480354, 6.865675, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(7.864677, 5.665675, 0.0), Point(8.557497, 6.865675, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(8.560373, 6.737041, 0.0), Point(7.94182, 5.665675, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(8.560373, 6.603425, 0.0), Point(8.018962, 5.665675, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(7.360373, 6.031848, 0.0), Point(8.560373, 6.031848, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(A_p_p, B_p_p), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_1, A_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(4.110852, 5.302848, 0.0), Point(4.110852, 5.842848, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.110852, 5.842848, 0.0), Point(4.462171, 5.011902, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.110852, 5.842848, 0.0), Point(3.759533, 5.011902, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.960373, 5.302848, 0.0), Point(7.960373, 5.842848, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.960373, 5.842848, 0.0), Point(8.311691, 5.011902, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.960373, 5.842848, 0.0), Point(7.609054, 5.011902, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.960373, 5.302848, 0.0), Point(7.960373, 5.842848, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.960373, 5.842848, 0.0), Point(8.311691, 5.011902, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.960373, 5.842848, 0.0), Point(7.609054, 5.011902, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.110852, 5.842848, 0.0), Point(4.110852, 5.302848, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.110852, 5.302848, 0.0), Point(3.759533, 6.133795, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.110852, 5.302848, 0.0), Point(4.462171, 6.133795, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.054434, 6.215441, 0.0), Point(14.054434, 6.993723, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.054434, 6.993723, 0.0), Point(14.405753, 6.162776, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.054434, 6.993723, 0.0), Point(13.703116, 6.162776, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.054434, 9.054004, 0.0), Point(14.054434, 8.909213, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.054434, 8.909213, 0.0), Point(13.703116, 9.74016, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.054434, 8.909213, 0.0), Point(14.405753, 9.74016, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(D_2, K_3), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(Z_2, L_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_3, M_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_3, M_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_3, S_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_3, R_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_3, Q_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(14.054434, 8.018943, 0.0), Point(14.054434, 7.385452, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.054434, 7.385452, 0.0), Point(13.703116, 8.216398, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.054434, 7.385452, 0.0), Point(14.405753, 8.216398, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(A_p_p, B_p_p), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_1, C1_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_p_p, C1_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_p_p, B_p_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_p_p, G_1), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(G_1, B_p_p), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(FD_0, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H, FD_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H, A_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H, C_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H, D_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H, S_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H, T_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Polyline([A_p_p, PL1_1_p, PL1_2_p, PL1_3_p, PL1_4_p, PL1_5_p, PL1_6_p, PL1_7_p, B1]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([B1, PL4_1_p, PL4_2_p, PL4_3_p, PL4_4_p, PL4_5_p, PL4_6_p, PL4_7_p, C1_p]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_3, R_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(13.704434, 8.361091, 0.0), Point(13.704434, 9.054004, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.704434, 9.054004, 0.0), Point(14.055753, 8.223058, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.704434, 9.054004, 0.0), Point(13.353116, 8.223058, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(FD_2, V), linecolor=Color(0.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(FD_0, P), linecolor=Color(0.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(FD_1, K_2), linecolor=Color(0.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(J_3, N_3), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(A_p_p, H_1), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B1, H_1), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([A_p_p, V_4, W_4, Z_4, A_5, B_5, C_5, D_5, B1]), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([B1, E_5, F_5, G_5, H_5, I_5, J_5, K_5, C1_p_p]), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_p_p, C1_p_p), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(Point(14.054434, 9.40477, 0.0), Point(14.054434, 7.385452, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.054434, 7.385452, 0.0), Point(13.703116, 8.216398, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(14.054434, 7.385452, 0.0), Point(14.405753, 8.216398, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(FD_2, L_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(13.354434, 5.522527, 0.0), Point(13.354434, 6.993723, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.354434, 6.993723, 0.0), Point(13.705753, 6.162776, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.354434, 6.993723, 0.0), Point(13.003116, 6.162776, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.704434, 5.522527, 0.0), Point(13.704434, 6.215441, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.704434, 6.215441, 0.0), Point(14.055753, 5.384494, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.704434, 6.215441, 0.0), Point(13.353116, 5.384494, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.354434, 8.361091, 0.0), Point(13.354434, 8.909213, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.354434, 8.909213, 0.0), Point(13.705753, 8.078267, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.354434, 8.909213, 0.0), Point(13.003116, 8.078267, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Z_3, Q_2), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(N_5, W_2), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(M_5, Z_2), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(O_5, G_3), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(R_5, F_3), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(H, P_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_5, T), linecolor=Color(0.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(11.901477, 7.240661, 0.0), Point(11.901477, 8.711856, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.901477, 8.711856, 0.0), Point(12.252795, 7.88091, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.901477, 8.711856, 0.0), Point(11.550158, 7.88091, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.551477, 7.874152, 0.0), Point(11.551477, 7.240661, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.551477, 7.240661, 0.0), Point(11.200158, 8.071607, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.551477, 7.240661, 0.0), Point(11.902795, 8.071607, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(V_5, FD_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_5, FD_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_5, V_5), linecolor=Color(0.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(T_5, S_5), linecolor=Color(0.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(14.404434, 7.385452, 0.0), Point(14.404434, 8.856647, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.404434, 8.856647, 0.0), Point(14.755753, 8.025701, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.404434, 8.856647, 0.0), Point(14.053116, 8.025701, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(FD_2, M_1), linecolor=Color(0.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(14.404434, 8.856647, 0.0), Point(14.404434, 9.40477, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.404434, 9.40477, 0.0), Point(14.755753, 8.573823, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.404434, 9.40477, 0.0), Point(14.053116, 8.573823, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.054434, 9.40477, 0.0), Point(14.054434, 7.385452, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.054434, 7.385452, 0.0), Point(13.703116, 8.216398, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.054434, 7.385452, 0.0), Point(14.405753, 8.216398, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(FD_0, P), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(6.915461, 7.802457, 0.0), Point(6.915461, 7.127457, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(6.915461, 7.127457, 0.0), Point(6.564142, 7.958404, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(6.915461, 7.127457, 0.0), Point(7.266779, 7.958404, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(7.960373, 5.302848, 0.0), Point(7.960373, 5.842848, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.960373, 5.842848, 0.0), Point(8.311691, 5.011902, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(7.960373, 5.842848, 0.0), Point(7.609054, 5.011902, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(4.110852, 5.302848, 0.0), Point(4.110852, 5.842848, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.110852, 5.842848, 0.0), Point(4.462171, 5.011902, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.110852, 5.842848, 0.0), Point(3.759533, 5.011902, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Polygon([K, I_1, D_1, M]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.2, opacity=0.15)
S.add(Polygon([I_1, L, O, D_1]), linecolor=Color(1.0, 1.0, 1.0), facecolor=Color(1.0, 1.0, 1.0), linewidth=1.2, opacity=0.15)
S.add(Polygon([I_1, L, O, D_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.2, opacity=0.15)
S.add(Polygon([K, I_1, D_1, M]), linecolor=Color(1.0, 1.0, 1.0), facecolor=Color(1.0, 1.0, 1.0), linewidth=1.8, opacity=0.15)
S.add(Line(FD_0, H_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_3, H_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(B_3, H_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_5, H_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_3, H_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(D_3, H_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(S_2, H_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(T_2, H_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(FD_1, H_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(FD_1, P_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_1, FD_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_1, V_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_1, W_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_1, U_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_1, P_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_1, O_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_1, T_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(13.704434, 7.385452, 0.0), Point(13.704434, 8.856647, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.704434, 8.856647, 0.0), Point(14.055753, 8.025701, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.704434, 8.856647, 0.0), Point(13.353116, 8.025701, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.704434, 8.856647, 0.0), Point(13.704434, 9.40477, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.704434, 9.40477, 0.0), Point(14.055753, 8.573823, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.704434, 9.40477, 0.0), Point(13.353116, 8.573823, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(FD_0, P_p), linecolor=Color(0.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(P_5, T_p), linecolor=Color(0.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(FD_2, Q_1), linecolor=Color(0.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(FD_1, R_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(FD_1, V_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(16.557392, 7.874152, 0.0), Point(16.557392, 7.240661, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.557392, 7.240661, 0.0), Point(16.206074, 8.071607, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.557392, 7.240661, 0.0), Point(16.908711, 8.071607, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(V_1, U_1), linecolor=Color(0.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(R_1, T_1), linecolor=Color(0.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(16.207392, 7.240661, 0.0), Point(16.207392, 8.711856, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.207392, 8.711856, 0.0), Point(16.558711, 7.88091, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.207392, 8.711856, 0.0), Point(15.856074, 7.88091, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(A_p_p, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H, FD_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H, P_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(FD_0, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)

if __name__ == "__main__":
    viewer.show()
