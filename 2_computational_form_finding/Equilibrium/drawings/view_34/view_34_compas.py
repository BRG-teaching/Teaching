"""
COMPAS translation of GeoGebra applet: Supersam
Source: https://block.arch.ethz.ch/eq/drawing/view/34
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
A = Point(0.0, 0.0, 0.0)  # A
B = Point(2.25, 0.0, 0.0)  # B
D = Point(3.75, 0.0, 0.0)  # D
F = Point(7.5, 0.0, 0.0)  # F
H_1 = Point(0.0, 0.725925, 0.0)  # H_1
A_1 = Point(7.5, 1.168184, 0.0)  # A_1
LL_8 = Point(16.772579, 4.456675, 0.0)  # LL_8
I_2 = Point(7.5, 5.435615, 0.0)  # I_2
U_1 = Point(0.0, 4.303065, 0.0)  # U_1
S_4 = Point(16.772579, 5.688059, 0.0)  # S_4
R_4 = Point(16.772579, -3.296563, 0.0)  # R_4
N = Point(16.772579, -2.754211, 0.0)  # N
O_7 = Point(22.620579, 3.246138, 0.0)  # O_7
I_1 = Point(13.291176, 3.703437, 0.0)  # I_1
L = Point(13.058318, 2.031093, 0.0)  # L
J_1 = Point(0.0, 3.986151, 0.0)  # J_1
I = Point(2.25, 0.3, 0.0)  # I
I_p = Point(3.75, 0.3, 0.0)  # I'
M = Point(3.75, 3.97103, 0.0)  # M
N_1 = Point(2.25, 4.085187, 0.0)  # N_1
O_1 = Point(16.772579, 3.856675, 0.0)  # O_1
V = Point(7.5, 4.198783, 0.0)  # V
W = Point(16.772579, 2.256675, 0.0)  # W
P_1 = Point(11.524579, 4.850122, 0.0)  # P_1
Z = Point(11.524579, 1.04168, 0.0)  # Z
O = Point(11.524579, -2.754211, 0.0)  # O
Q = Point(4.125, 4.094768, 0.0)  # Q
R = Point(4.875, 4.261473, 0.0)  # R
S_2 = Point(5.625, 4.347408, 0.0)  # S
T = Point(6.375, 4.352574, 0.0)  # T
U = Point(7.125, 4.27697, 0.0)  # U
LL_7 = Point(16.772579, 1.256675, 0.0)  # LL_7
LL_6 = Point(16.772579, 1.656675, 0.0)  # LL_6
LL_5 = Point(16.772579, 2.056675, 0.0)  # LL_5
LL_4 = Point(16.772579, 2.456675, 0.0)  # LL_4
LL_3 = Point(16.772579, 2.856675, 0.0)  # LL_3
LL_2 = Point(16.772579, 3.256675, 0.0)  # LL_2
B_1 = Point(4.125, 0.458274, 0.0)  # B_1
C_1 = Point(4.875, 0.717658, 0.0)  # C_1
E_1 = Point(5.625, 0.919877, 0.0)  # E_1
F_1 = Point(6.375, 1.064932, 0.0)  # F_1
G_1 = Point(7.125, 1.152822, 0.0)  # G_1
K_1 = Point(0.375, 4.067286, 0.0)  # K_1
L_1 = Point(1.125, 4.143384, 0.0)  # L_1
M_1 = Point(1.875, 4.13331, 0.0)  # M_1
LL_0 = Point(16.772579, 4.056675, 0.0)  # LL_0
LL_1 = Point(16.772579, 3.656675, 0.0)  # LL_1
Q_1 = Point(0.375, 0.697811, 0.0)  # Q_1
R_1 = Point(1.125, 0.584418, 0.0)  # R_1
S_1 = Point(1.875, 0.413861, 0.0)  # S_1
V_1 = Point(0.375, 4.24145, 0.0)  # V_1
W_1 = Point(1.125, 4.180453, 0.0)  # W_1
B_2 = Point(1.875, 4.18169, 0.0)  # B_2
C_2 = Point(4.125, 4.372096, 0.0)  # C_2
D_2 = Point(4.875, 4.497797, 0.0)  # D_2
E_2 = Point(5.625, 4.685732, 0.0)  # E_2
F_2 = Point(6.375, 4.935899, 0.0)  # F_2
G_2 = Point(7.125, 5.248298, 0.0)  # G_2
L_2 = Point(0.375, 0.639425, 0.0)  # L_2
M_2 = Point(1.125, 0.52359, 0.0)  # M_2
N_2 = Point(1.875, 0.46492, 0.0)  # N_2
O_2 = Point(4.125, 0.460402, 0.0)  # O_2
P_2 = Point(4.875, 0.516061, 0.0)  # P_2
Q_2 = Point(5.625, 0.628885, 0.0)  # Q_2
R_2 = Point(6.375, 0.798873, 0.0)  # R_2
S_2_2 = Point(7.125, 1.026026, 0.0)  # S_2
V_2 = Point(-0.947184, 0.0, 0.0)  # V_2
W_2 = Point(8.326731, 0.0, 0.0)  # W_2
T_4 = Point(11.524579, 5.688059, 0.0)  # T_4
U_4 = Point(11.524579, -3.296563, 0.0)  # U_4
F_4 = Point(0.0, 5.688059, 0.0)  # F_4
Q_5 = Point(0.0, -3.296563, 0.0)  # Q_5
G_4 = Point(0.375, 5.688059, 0.0)  # G_4
P_5 = Point(0.375, -3.296563, 0.0)  # P_5
H_4 = Point(1.125, 5.688059, 0.0)  # H_4
O_5 = Point(1.125, -3.296563, 0.0)  # O_5
I_4 = Point(1.875, 5.688059, 0.0)  # I_4
N_5 = Point(1.875, -3.296563, 0.0)  # N_5
P_4 = Point(2.25, 5.688059, 0.0)  # P_4
M_5 = Point(2.25, -3.296563, 0.0)  # M_5
Q_4 = Point(3.75, 5.688059, 0.0)  # Q_4
L_5 = Point(3.75, -3.296563, 0.0)  # L_5
Z_4 = Point(4.125, 5.688059, 0.0)  # Z_4
K_5 = Point(4.125, -3.296563, 0.0)  # K_5
A_5 = Point(4.875, 5.688059, 0.0)  # A_5
J_5 = Point(4.875, -3.296563, 0.0)  # J_5
B_5 = Point(5.625, 5.688059, 0.0)  # B_5
I_5 = Point(5.625, -3.296563, 0.0)  # I_5
C_5 = Point(6.375, 5.688059, 0.0)  # C_5
H_5 = Point(6.375, -3.296563, 0.0)  # H_5
D_5 = Point(7.125, 5.688059, 0.0)  # D_5
G_5 = Point(7.125, -3.296563, 0.0)  # G_5
E_5 = Point(7.5, 5.688059, 0.0)  # E_5
F_5 = Point(7.5, -3.296563, 0.0)  # F_5
frameBL = Point(-2.115992, -5.614923, 0.0)  # frameBL
S_5 = Point(25.710983, -5.614923, 0.0)  # S_5
frameTR = Point(25.710983, 8.298564, 0.0)  # frameTR
R_5 = Point(-2.115992, 8.298564, 0.0)  # R_5
K_2 = Point(22.020579, 3.246138, 0.0)  # K_2
B_7 = Point(23.558079, 3.246138, 0.0)  # B_7
G_6 = Point(16.772579, -0.305825, 0.0)  # G_6
U_5 = Point(16.772579, 0.319175, 0.0)  # U_5
J_6 = Point(11.524579, -0.305825, 0.0)  # J_6
V_5 = Point(11.524579, 0.319175, 0.0)  # V_5
N_6 = Point(11.524579, 5.787622, 0.0)  # N_6
I_6 = Point(11.524579, 6.412622, 0.0)  # I_6
C_6 = Point(16.772579, 5.787622, 0.0)  # C_6
D_7 = Point(16.772579, 6.412622, 0.0)  # D_7
E_6 = Point(10.587079, 4.850122, 0.0)  # E_6
B_6 = Point(10.587079, 1.04168, 0.0)  # B_6
H_7 = Point(22.620579, 5.787622, 0.0)  # H_7
Q_3 = Point(22.620579, 4.456675, 0.0)  # Q_3
D_6 = Point(10.587079, 4.456675, 0.0)  # D_6
A_6 = Point(10.587079, 1.256675, 0.0)  # A_6
A_7 = Point(23.558079, 1.256675, 0.0)  # A_7
R_6 = Point(9.962079, 3.256675, 0.0)  # R_6
H_6 = Point(9.962079, 4.850122, 0.0)  # H_6
LL_0_p = Point(17.372579, 4.056675, 0.0)  # LL_0'
LL_1_p = Point(17.372579, 3.656675, 0.0)  # LL_1'
LL_2_p = Point(17.372579, 3.256675, 0.0)  # LL_2'
LL_3_p = Point(17.372579, 2.856675, 0.0)  # LL_3'
LL_4_p = Point(17.372579, 2.456675, 0.0)  # LL_4'
LL_5_p = Point(17.372579, 2.056675, 0.0)  # LL_5'
LL_6_p = Point(17.372579, 1.656675, 0.0)  # LL_6'
LL_7_p = Point(17.372579, 1.256675, 0.0)  # LL_7'
N_p = Point(17.372579, -2.754211, 0.0)  # N'
P_p = Point(22.620579, -2.754211, 0.0)  # P'
W_6 = Point(17.372579, 5.688059, 0.0)  # W_6
U_6 = Point(17.372579, -3.296563, 0.0)  # U_6
LL_p = Point(17.372579, 4.456675, 0.0)  # LL'
T_1 = Point(21.593192, 3.66462, 0.0)  # T_1
F_7 = Point(17.372579, 2.936675, 0.0)  # F_7
V_6 = Point(23.558079, 4.456675, 0.0)  # V_6
J_7 = Point(22.620579, 5.688059, 0.0)  # J_7
K_7 = Point(22.620579, -3.296563, 0.0)  # K_7
P_7 = Point(17.372579, 2.936675, 0.0)  # P_7
M_6 = Point(22.620579, 0.319175, 0.0)  # M_6
S_6 = Point(9.962079, 1.04168, 0.0)  # S_6
Z_6 = Point(13.291176, 3.703437, 0.0)  # Z_6
L_p = Point(13.058318, 2.031093, 0.0)  # L'

# --- geometry ---
S.add(A, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(B, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(D, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(F, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(H_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(A_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(LL_8, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(I_2, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(U_1, I_2), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(S_4, R_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(N, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(O_7, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(I_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(L, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(J_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(I, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(I, H_1), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(I_p, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(M, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(I_p, A_1), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(N_1, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(J_1, N_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(O_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(V, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(M, V), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(W, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(P_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(Z, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(Line(Point(0.375, 3.396136, 0.0), Point(0.375, 2.596136, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.375, 2.596136, 0.0), Point(-0.131357, 3.793782, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.375, 2.596136, 0.0), Point(0.881357, 3.793782, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(1.125, 3.396136, 0.0), Point(1.125, 2.596136, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(1.125, 2.596136, 0.0), Point(0.618643, 3.793782, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(1.125, 2.596136, 0.0), Point(1.631357, 3.793782, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(1.875, 3.396136, 0.0), Point(1.875, 2.596136, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(1.875, 2.596136, 0.0), Point(1.368643, 3.793782, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(1.875, 2.596136, 0.0), Point(2.381357, 3.793782, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.125, 3.396136, 0.0), Point(4.125, 2.596136, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.125, 2.596136, 0.0), Point(3.618643, 3.793782, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.125, 2.596136, 0.0), Point(4.631357, 3.793782, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.875, 3.396136, 0.0), Point(4.875, 2.596136, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.875, 2.596136, 0.0), Point(4.368643, 3.793782, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.875, 2.596136, 0.0), Point(5.381357, 3.793782, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.625, 3.396136, 0.0), Point(5.625, 2.596136, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.625, 2.596136, 0.0), Point(5.118643, 3.793782, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.625, 2.596136, 0.0), Point(6.131357, 3.793782, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.375, 3.396136, 0.0), Point(6.375, 2.596136, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(6.375, 2.596136, 0.0), Point(5.868643, 3.793782, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.375, 2.596136, 0.0), Point(6.881357, 3.793782, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.125, 3.396136, 0.0), Point(7.125, 2.596136, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.125, 2.596136, 0.0), Point(6.618643, 3.793782, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.125, 2.596136, 0.0), Point(7.631357, 3.793782, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(N, O), linecolor=Color(0.0, 0.0, 1.0), linewidth=3.0)
S.add(Polyline([M, Q, R, S_2, T, U, V]), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(Z, LL_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z, LL_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z, LL_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z, LL_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z, LL_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z, LL_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z, W), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Polyline([I_p, B_1, C_1, E_1, F_1, G_1, A_1]), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.8)
S.add(Polyline([J_1, K_1, L_1, M_1, N_1]), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(P_1, O_1), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(LL_8, P_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL_0, P_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL_1, P_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL_2, P_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([H_1, Q_1, R_1, S_1, I]), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.8)
S.add(Line(Point(-0.797761, 0.785734, 0.0), Point(0.0, 0.725925, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 0.725925, 0.0), Point(-1.232151, 0.310523, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 0.725925, 0.0), Point(-1.156439, 1.320402, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(-0.8, 0.725925, 0.0), Point(0.0, 0.725925, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 0.725925, 0.0), Point(-1.197646, 0.219568, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 0.725925, 0.0), Point(-1.197646, 1.232282, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.015492, 0.067574, 0.0), Point(2.25, 0.3, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(2.25, 0.3, 0.0), Point(3.543099, 0.43656, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(2.25, 0.3, 0.0), Point(3.248873, -0.53247, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.012959, -0.011079, 0.0), Point(3.75, 0.3, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.75, 0.3, 0.0), Point(2.843503, -0.632211, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.75, 0.3, 0.0), Point(2.44971, 0.300804, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.05, 0.3, 0.0), Point(2.25, 0.3, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(2.25, 0.3, 0.0), Point(3.447646, 0.806357, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(2.25, 0.3, 0.0), Point(3.447646, -0.206357, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(2.25, -0.5, 0.0), Point(2.25, 0.3, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(2.25, 0.3, 0.0), Point(2.756357, -0.897646, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(2.25, 0.3, 0.0), Point(1.743643, -0.897646, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(2.95, 0.3, 0.0), Point(3.75, 0.3, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.75, 0.3, 0.0), Point(2.552354, -0.206357, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.75, 0.3, 0.0), Point(2.552354, 0.806357, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.75, -0.5, 0.0), Point(3.75, 0.3, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.75, 0.3, 0.0), Point(4.256357, -0.897646, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.75, 0.3, 0.0), Point(3.243643, -0.897646, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.29933, 1.20093, 0.0), Point(7.5, 1.168184, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.5, 1.168184, 0.0), Point(8.675916, 1.72314, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.5, 1.168184, 0.0), Point(8.717369, 0.711275, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.3, 1.168184, 0.0), Point(7.5, 1.168184, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.5, 1.168184, 0.0), Point(8.697646, 1.674541, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.5, 1.168184, 0.0), Point(8.697646, 0.661827, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.5, 1.968184, 0.0), Point(7.5, 1.168184, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.5, 1.168184, 0.0), Point(6.993643, 2.365831, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.5, 1.168184, 0.0), Point(8.006357, 2.365831, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Polyline([U_1, V_1, W_1, B_2, C_2, D_2, E_2, F_2, G_2, I_2]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Polyline([H_1, L_2, M_2, N_2, O_2, P_2, Q_2, R_2, S_2_2, A_1]), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(V_2, W_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(0.8, 0.725925, 0.0), Point(0.0, 0.725925, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 0.725925, 0.0), Point(1.197646, 1.232282, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 0.725925, 0.0), Point(1.197646, 0.219568, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.7, 1.168184, 0.0), Point(7.5, 1.168184, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.5, 1.168184, 0.0), Point(6.302354, 0.661827, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.5, 1.168184, 0.0), Point(6.302354, 1.674541, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 1.525925, 0.0), Point(0.0, 0.725925, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 0.725925, 0.0), Point(-0.506357, 1.923572, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 0.725925, 0.0), Point(0.506357, 1.923572, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.779531, 0.546114, 0.0), Point(0.0, 0.725925, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 0.725925, 0.0), Point(1.280813, 0.950138, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 0.725925, 0.0), Point(1.053192, -0.036664, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.751947, 0.884605, 0.0), Point(7.5, 1.168184, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.5, 1.168184, 0.0), Point(6.559612, 0.270173, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.5, 1.168184, 0.0), Point(6.200631, 1.217127, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, -0.074075, 0.0), Point(0.0, 0.725925, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 0.725925, 0.0), Point(0.506357, -0.471721, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 0.725925, 0.0), Point(-0.506357, -0.471721, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.5, 0.368184, 0.0), Point(7.5, 1.168184, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.5, 1.168184, 0.0), Point(8.006357, -0.029462, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.5, 1.168184, 0.0), Point(6.993643, -0.029462, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(I, I_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(Point(0.0, -0.8, 0.0), Point(0.0, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 0.0, 0.0), Point(0.506357, -1.197646, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 0.0, 0.0), Point(-0.506357, -1.197646, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(H_1, A), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(I_p, D), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(Point(2.25, -0.8, 0.0), Point(2.25, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(2.25, 0.0, 0.0), Point(2.756357, -1.197646, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(2.25, 0.0, 0.0), Point(1.743643, -1.197646, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.75, -0.8, 0.0), Point(3.75, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.75, 0.0, 0.0), Point(4.256357, -1.197646, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.75, 0.0, 0.0), Point(3.243643, -1.197646, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(T_4, U_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(16.772579, 1.256675, 0.0), Point(11.524579, 1.04168, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.524579, 1.04168, 0.0), Point(12.700495, 1.596635, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.524579, 1.04168, 0.0), Point(12.741948, 0.58477, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.524579, 1.04168, 0.0), Point(16.772579, 3.256675, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.772579, 3.256675, 0.0), Point(15.866081, 2.324464, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.772579, 3.256675, 0.0), Point(15.472289, 3.257479, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.772579, 3.256675, 0.0), Point(11.524579, 4.850122, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.524579, 4.850122, 0.0), Point(12.817678, 4.986682, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.524579, 4.850122, 0.0), Point(12.523452, 4.017652, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.524579, 4.850122, 0.0), Point(16.772579, 4.456675, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.772579, 4.456675, 0.0), Point(15.540428, 4.041272, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.772579, 4.456675, 0.0), Point(15.61614, 5.051152, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(F_4, Q_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(G_4, P_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_4, O_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(I_4, N_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_4, M_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Q_4, L_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Z_4, K_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(A_5, J_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(B_5, I_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_5, H_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(D_5, G_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(E_5, F_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(frameBL, S_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_5, frameTR), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(frameTR, R_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_5, frameBL), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(16.772579, 4.456675, 0.0), Point(16.772579, 3.256675, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.772579, 3.256675, 0.0), Point(16.266222, 4.454321, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.772579, 3.256675, 0.0), Point(17.278935, 4.454321, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.772579, 3.256675, 0.0), Point(16.772579, 1.256675, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.772579, 1.256675, 0.0), Point(16.266222, 2.454321, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.772579, 1.256675, 0.0), Point(17.278935, 2.454321, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.772579, 0.319175, 0.0), Point(11.524579, 0.319175, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.524579, 0.319175, 0.0), Point(12.722225, 0.825532, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.524579, 0.319175, 0.0), Point(12.722225, -0.187182, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.524579, -0.305825, 0.0), Point(16.772579, -0.305825, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.772579, -0.305825, 0.0), Point(15.574932, -0.812182, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.772579, -0.305825, 0.0), Point(15.574932, 0.200532, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(23.558079, 3.246138, 0.0), Point(23.558079, 4.456675, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(23.558079, 4.456675, 0.0), Point(24.064435, 3.259028, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(23.558079, 4.456675, 0.0), Point(23.051722, 3.259028, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(23.558079, 1.256675, 0.0), Point(23.558079, 3.246138, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(23.558079, 3.246138, 0.0), Point(24.064435, 2.048492, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(23.558079, 3.246138, 0.0), Point(23.051722, 2.048492, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(K_2, B_7), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(G_6, U_5), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(J_6, V_5), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(U_5, LL_7), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(N_6, I_6), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(C_6, LL_8), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(D_7, C_6), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(10.587079, 1.256675, 0.0), Point(10.587079, 1.04168, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.587079, 1.04168, 0.0), Point(10.080722, 2.239326, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.587079, 1.04168, 0.0), Point(11.093435, 2.239326, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.587079, 4.850122, 0.0), Point(10.587079, 4.456675, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.587079, 4.456675, 0.0), Point(10.080722, 5.654321, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.587079, 4.456675, 0.0), Point(11.093435, 5.654321, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(E_6, P_1), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(B_6, Z), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(11.524579, 5.787622, 0.0), Point(16.772579, 5.787622, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.772579, 5.787622, 0.0), Point(15.574932, 5.281265, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.772579, 5.787622, 0.0), Point(15.574932, 6.293979, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.772579, 6.412622, 0.0), Point(11.524579, 6.412622, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.524579, 6.412622, 0.0), Point(12.722225, 6.918979, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.524579, 6.412622, 0.0), Point(12.722225, 5.906265, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(H_7, Q_3), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(P_1, N_6), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(D_6, LL_8), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(LL_7, A_6), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(LL_7, A_7), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(9.962079, 1.04168, 0.0), Point(9.962079, 3.256675, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.962079, 3.256675, 0.0), Point(10.468435, 2.059028, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.962079, 3.256675, 0.0), Point(9.455722, 2.059028, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.962079, 3.256675, 0.0), Point(9.962079, 4.850122, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.962079, 4.850122, 0.0), Point(10.468435, 3.652475, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.962079, 4.850122, 0.0), Point(9.455722, 3.652475, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(R_6, LL_2), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(H_6, E_6), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(LL_0, LL_0_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(LL_1, LL_1_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(LL_2, LL_2_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(LL_3, LL_3_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(LL_4, LL_4_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(LL_5, LL_5_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(LL_6, LL_6_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(LL_7, LL_7_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(17.372579, 4.456675, 0.0), Point(17.372579, 3.256675, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(17.372579, 3.256675, 0.0), Point(16.866222, 4.454321, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.372579, 3.256675, 0.0), Point(17.878935, 4.454321, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.372579, 3.256675, 0.0), Point(17.372579, 1.256675, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(17.372579, 1.256675, 0.0), Point(16.866222, 2.454321, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.372579, 1.256675, 0.0), Point(17.878935, 2.454321, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(N_p, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(N_p, P_p), linecolor=Color(1.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(W_6, U_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(LL_8, LL_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(LL_7_p, T_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(LL_6_p, T_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(LL_5_p, T_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(LL_4_p, T_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(LL_3_p, T_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(LL_2_p, T_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(LL_1_p, T_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(LL_0_p, T_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(LL_p, T_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(F_7, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(F_7, T_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(LL_p, V_6), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(17.372579, 0.319175, 0.0), Point(22.620579, 0.319175, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(22.620579, 0.319175, 0.0), Point(21.422932, -0.187182, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(22.620579, 0.319175, 0.0), Point(21.422932, 0.825532, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(LL_p, O_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL_0_p, O_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL_1_p, O_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL_2_p, O_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL_3_p, O_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL_4_p, O_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL_5_p, O_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL_6_p, O_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL_7_p, O_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_7, K_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_7, O_7), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(17.372579, 1.256675, 0.0), Point(22.620579, 3.246138, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(22.620579, 3.246138, 0.0), Point(21.680191, 2.348127, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(22.620579, 3.246138, 0.0), Point(21.32121, 3.295081, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(22.620579, 3.246138, 0.0), Point(17.372579, 4.456675, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(17.372579, 4.456675, 0.0), Point(18.653392, 4.680888, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.372579, 4.456675, 0.0), Point(18.42577, 3.694086, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(M_6, O_7), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(S_6, B_6), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(LL_8, Z_6), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(LL_0, Z_6), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(LL_1, Z_6), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(LL_2, Z_6), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(LL_2, L_p), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(LL_3, L_p), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(LL_4, L_p), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(LL_5, L_p), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(LL_7, L_p), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(O_1, Z_6), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(W, L_p), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(7.5, -0.8, 0.0), Point(7.5, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.5, 0.0, 0.0), Point(8.006357, -1.197646, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.5, 0.0, 0.0), Point(6.993643, -1.197646, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)

if __name__ == "__main__":
    viewer.show()
