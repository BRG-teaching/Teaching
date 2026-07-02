"""
COMPAS translation of GeoGebra applet: Golden Gate Bridge
Source: https://block.arch.ethz.ch/eq/drawing/view/11
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
V = Point(12.38, 2.179784, 0.0)  # V
B_3 = Point(12.38, 9.0, 0.0)  # B_3
Z_17 = Point(12.38, 4.221006, 0.0)  # Z_{17}
D_2 = Point(2.7, 2.179784, 0.0)  # D_2
F_2 = Point(2.7, 9.0, 0.0)  # F_2
H_8 = Point(2.48, 5.1, 0.0)  # H_8
C_6 = Point(6.0, 5.1, 0.0)  # C_6
B = Point(6.0, 5.0, 0.0)  # B
I_8 = Point(2.48, 5.0, 0.0)  # I_8
M_16 = Point(3.793692, 0.849165, 0.0)  # M_{16}
L_13 = Point(8.532061, -0.781982, 0.0)  # L_{13}
A_2 = Point(4.02, 2.179784, 0.0)  # A_2
I_2 = Point(4.02, 9.0, 0.0)  # I_2
T_21 = Point(6.0, 7.335387, 0.0)  # T_{21}
G_8 = Point(2.48, 2.179784, 0.0)  # G_8
L_8 = Point(2.48, 9.0, 0.0)  # L_8
K_13 = Point(3.793692, -0.494835, 0.0)  # K_{13}
F_22 = Point(4.24, 7.941254, 0.0)  # F_{22}
M_22 = Point(4.24, 4.221006, 0.0)  # M_{22}
O_8 = Point(23.0, 0.5, 0.0)  # O_8
N_16 = Point(3.793692, 1.270842, 0.0)  # N_{16}
O_16 = Point(3.793692, -5.014966, 0.0)  # O_{16}
E_22 = Point(2.48, 8.04791, 0.0)  # E_{22}
E = Point(6.0, 2.179784, 0.0)  # E
G = Point(6.0, 9.0, 0.0)  # G
P_12 = Point(2.48, 4.4, 0.0)  # P_{12}
Q_12 = Point(2.48, 6.1, 0.0)  # Q_{12}
U_12 = Point(2.48, 5.012766, 0.0)  # U_{12}
U_9 = Point(25.177701, -0.799776, 0.0)  # U_9
M_1 = Point(18.76, 2.179784, 0.0)  # M_1
Q_3 = Point(18.76, 9.0, 0.0)  # Q_3
M_8 = Point(18.76, 7.105528, 0.0)  # M_8
W_5 = Point(12.38, 7.736351, 0.0)  # W_5
C = Point(6.0, 6.57, 0.0)  # C
M_10 = Point(12.38, 3.8, 0.0)  # M_{10}
N_10 = Point(12.38, 6.2, 0.0)  # N_{10}
B_6 = Point(12.38, 5.166184, 0.0)  # B_6
Z_5 = Point(18.76, 6.57, 0.0)  # Z_5
W_9 = Point(24.937246, -3.068607, 0.0)  # W_9
P_8 = Point(23.0, 0.332, 0.0)  # P_8
Q_8 = Point(23.0, 0.164, 0.0)  # Q_8
R_8 = Point(23.0, -0.004, 0.0)  # R_8
S_8 = Point(23.0, -0.172, 0.0)  # S_8
T_8 = Point(23.0, -0.34, 0.0)  # T_8
U_8 = Point(23.0, -0.508, 0.0)  # U_8
V_8 = Point(23.0, -0.676, 0.0)  # V_8
W_8 = Point(23.0, -0.844, 0.0)  # W_8
Z_8 = Point(23.0, -1.012, 0.0)  # Z_8
A_9 = Point(23.0, -1.18, 0.0)  # A_9
B_9 = Point(23.0, -1.348, 0.0)  # B_9
C_9 = Point(23.0, -1.516, 0.0)  # C_9
D_9 = Point(23.0, -1.684, 0.0)  # D_9
E_9 = Point(23.0, -1.852, 0.0)  # E_9
P_10 = Point(12.38, 7.349348, 0.0)  # P_{10}
G_9 = Point(23.0, -2.188, 0.0)  # G_9
H_9 = Point(23.0, -2.356, 0.0)  # H_9
I_9 = Point(23.0, -2.524, 0.0)  # I_9
J_9 = Point(23.0, -2.692, 0.0)  # J_9
K_9 = Point(23.0, -2.86, 0.0)  # K_9
L_9 = Point(23.0, -3.028, 0.0)  # L_9
M_9 = Point(23.0, -3.196, 0.0)  # M_9
N_9 = Point(23.0, -3.364, 0.0)  # N_9
O_9 = Point(23.0, -3.532, 0.0)  # O_9
P_9 = Point(23.0, -3.7, 0.0)  # P_9
Q_9 = Point(23.0, -3.868, 0.0)  # Q_9
R_9 = Point(23.0, -4.036, 0.0)  # R_9
S_9 = Point(23.0, -4.204, 0.0)  # S_9
F_9 = Point(23.0, -2.02, 0.0)  # F_9
T_9 = Point(23.0, -4.372, 0.0)  # T_9
H_11 = Point(6.0, 7.450354, 0.0)  # H_{11}
K_11 = Point(17.457906, -1.936, 0.0)  # K_{11}
Z_13 = Point(3.793692, 0.177165, 0.0)  # Z_{13}
S_14 = Point(-1.748402, -2.274636, 0.0)  # S_{14}
D_6 = Point(6.22, 2.179784, 0.0)  # D_6
E_6 = Point(6.22, 9.0, 0.0)  # E_6
L_1 = Point(18.54, 2.179784, 0.0)  # L_1
P_3 = Point(18.54, 9.0, 0.0)  # P_3
K_1 = Point(18.1, 2.179784, 0.0)  # K_1
O_3 = Point(18.1, 9.0, 0.0)  # O_3
J_1 = Point(17.66, 2.179784, 0.0)  # J_1
N_3 = Point(17.66, 9.0, 0.0)  # N_3
I_1 = Point(17.22, 2.179784, 0.0)  # I_1
M_3 = Point(17.22, 9.0, 0.0)  # M_3
H_1 = Point(16.78, 2.179784, 0.0)  # H_1
L_3 = Point(16.78, 9.0, 0.0)  # L_3
G_1 = Point(16.34, 2.179784, 0.0)  # G_1
K_3 = Point(16.34, 9.0, 0.0)  # K_3
F_1 = Point(15.9, 2.179784, 0.0)  # F_1
J_3 = Point(15.9, 9.0, 0.0)  # J_3
E_1 = Point(15.46, 2.179784, 0.0)  # E_1
I_3 = Point(15.46, 9.0, 0.0)  # I_3
D_1 = Point(15.02, 2.179784, 0.0)  # D_1
H_3 = Point(15.02, 9.0, 0.0)  # H_3
C_1 = Point(14.58, 2.179784, 0.0)  # C_1
G_3 = Point(14.58, 9.0, 0.0)  # G_3
B_1 = Point(14.14, 2.179784, 0.0)  # B_1
F_3 = Point(14.14, 9.0, 0.0)  # F_3
A_1 = Point(13.7, 2.179784, 0.0)  # A_1
E_3 = Point(13.7, 9.0, 0.0)  # E_3
Z = Point(13.26, 2.179784, 0.0)  # Z
D_3 = Point(13.26, 9.0, 0.0)  # D_3
W = Point(12.82, 2.179784, 0.0)  # W
C_3 = Point(12.82, 9.0, 0.0)  # C_3
U = Point(11.94, 2.179784, 0.0)  # U
A_3 = Point(11.94, 9.0, 0.0)  # A_3
T = Point(11.5, 2.179784, 0.0)  # T
Z_2 = Point(11.5, 9.0, 0.0)  # Z_2
S_2 = Point(11.06, 2.179784, 0.0)  # S
W_2 = Point(11.06, 9.0, 0.0)  # W_2
R = Point(10.62, 2.179784, 0.0)  # R
V_2 = Point(10.62, 9.0, 0.0)  # V_2
Q = Point(10.18, 2.179784, 0.0)  # Q
U_2 = Point(10.18, 9.0, 0.0)  # U_2
P = Point(9.74, 2.179784, 0.0)  # P
T_2 = Point(9.74, 9.0, 0.0)  # T_2
O = Point(9.3, 2.179784, 0.0)  # O
S_2_2 = Point(9.3, 9.0, 0.0)  # S_2
N = Point(8.86, 2.179784, 0.0)  # N
R_2 = Point(8.86, 9.0, 0.0)  # R_2
M = Point(8.42, 2.179784, 0.0)  # M
Q_2 = Point(8.42, 9.0, 0.0)  # Q_2
L = Point(7.98, 2.179784, 0.0)  # L
P_2 = Point(7.98, 9.0, 0.0)  # P_2
K = Point(7.54, 2.179784, 0.0)  # K
O_2 = Point(7.54, 9.0, 0.0)  # O_2
J = Point(7.1, 2.179784, 0.0)  # J
N_2 = Point(7.1, 9.0, 0.0)  # N_2
I = Point(6.66, 2.179784, 0.0)  # I
M_2 = Point(6.66, 9.0, 0.0)  # M_2
T_1 = Point(22.06, 2.179784, 0.0)  # T_1
Z_3 = Point(22.06, 9.0, 0.0)  # Z_3
R_12 = Point(22.28, 4.4, 0.0)  # R_{12}
S_12 = Point(22.28, 6.1, 0.0)  # S_{12}
E_2 = Point(5.78, 2.179784, 0.0)  # E_2
D = Point(5.78, 9.0, 0.0)  # D
C_2 = Point(3.14, 2.179784, 0.0)  # C_2
G_2 = Point(3.14, 9.0, 0.0)  # G_2
B_2 = Point(3.58, 2.179784, 0.0)  # B_2
H_2 = Point(3.58, 9.0, 0.0)  # H_2
Z_1 = Point(4.46, 2.179784, 0.0)  # Z_1
J_2 = Point(4.46, 9.0, 0.0)  # J_2
W_1 = Point(4.9, 2.179784, 0.0)  # W_1
K_2 = Point(4.9, 9.0, 0.0)  # K_2
V_1 = Point(5.34, 2.179784, 0.0)  # V_1
L_2 = Point(5.34, 9.0, 0.0)  # L_2
N_1 = Point(19.42, 2.179784, 0.0)  # N_1
R_3 = Point(19.42, 9.0, 0.0)  # R_3
O_1 = Point(19.86, 2.179784, 0.0)  # O_1
S_3 = Point(19.86, 9.0, 0.0)  # S_3
P_1 = Point(20.3, 2.179784, 0.0)  # P_1
T_3 = Point(20.3, 9.0, 0.0)  # T_3
Q_1 = Point(20.74, 2.179784, 0.0)  # Q_1
U_3 = Point(20.74, 9.0, 0.0)  # U_3
R_1 = Point(21.18, 2.179784, 0.0)  # R_1
V_3 = Point(21.18, 9.0, 0.0)  # V_3
S_1 = Point(21.62, 2.179784, 0.0)  # S_1
W_3 = Point(21.62, 9.0, 0.0)  # W_3
U_1 = Point(18.98, 2.179784, 0.0)  # U_1
A_4 = Point(18.98, 9.0, 0.0)  # A_4
F_7 = Point(12.82, 5.1, 0.0)  # F_7
P_4 = Point(12.82, 5.0, 0.0)  # P_4
S_7 = Point(18.76, 5.1, 0.0)  # S_7
F_5 = Point(18.76, 5.0, 0.0)  # F_5
E_8 = Point(22.28, 5.1, 0.0)  # E_8
F_8 = Point(22.28, 5.0, 0.0)  # F_8
D_8 = Point(22.28, 2.179784, 0.0)  # D_8
K_8 = Point(22.28, 9.0, 0.0)  # K_8
V_9 = Point(23.0, -1.936, 0.0)  # V_9
Z_9 = Point(18.54, 7.236836, 0.0)  # Z_9
A_10 = Point(18.1, 7.465509, 0.0)  # A_{10}
B_10 = Point(17.66, 7.660238, 0.0)  # B_{10}
C_10 = Point(17.22, 7.821023, 0.0)  # C_{10}
D_10 = Point(16.78, 7.947864, 0.0)  # D_{10}
E_10 = Point(16.34, 8.04076, 0.0)  # E_{10}
F_10 = Point(15.9, 8.099713, 0.0)  # F_{10}
G_10 = Point(15.46, 8.124721, 0.0)  # G_{10}
H_10 = Point(15.02, 8.115786, 0.0)  # H_{10}
I_10 = Point(14.58, 8.072906, 0.0)  # I_{10}
J_10 = Point(14.14, 7.996083, 0.0)  # J_{10}
K_10 = Point(13.7, 7.885315, 0.0)  # K_{10}
L_10 = Point(13.26, 7.740604, 0.0)  # L_{10}
A_6 = Point(12.82, 7.561948, 0.0)  # A_6
Q_10 = Point(15.566207, 9.011765, 0.0)  # Q_{10}
I_11 = Point(9.193793, 9.599161, 0.0)  # I_{11}
R_10 = Point(11.94, 7.974518, 0.0)  # R_{10}
S_10 = Point(11.5, 8.174527, 0.0)  # S_{10}
T_10 = Point(11.06, 8.336379, 0.0)  # T_{10}
U_10 = Point(10.62, 8.460074, 0.0)  # U_{10}
V_10 = Point(10.18, 8.545611, 0.0)  # V_{10}
W_10 = Point(9.74, 8.592992, 0.0)  # W_{10}
Z_10 = Point(9.3, 8.602215, 0.0)  # Z_{10}
A_11 = Point(8.86, 8.57328, 0.0)  # A_{11}
B_11 = Point(8.42, 8.506189, 0.0)  # B_{11}
C_11 = Point(7.98, 8.40094, 0.0)  # C_{11}
D_11 = Point(7.54, 8.257534, 0.0)  # D_{11}
E_11 = Point(7.1, 8.07597, 0.0)  # E_{11}
F_11 = Point(6.66, 7.85625, 0.0)  # F_{11}
G_11 = Point(6.22, 7.598372, 0.0)  # G_{11}
O_10 = Point(23.0, -0.716552, 0.0)  # O_{10}
J_11 = Point(23.0, -3.155448, 0.0)  # J_{11}
L_11 = Point(12.82, 5.172853, 0.0)  # L_{11}
M_11 = Point(13.26, 5.19286, 0.0)  # M_{11}
N_11 = Point(13.7, 5.226205, 0.0)  # N_{11}
O_11 = Point(14.14, 5.272887, 0.0)  # O_{11}
P_11 = Point(14.58, 5.332908, 0.0)  # P_{11}
Q_11 = Point(15.02, 5.406267, 0.0)  # Q_{11}
R_11 = Point(15.46, 5.492963, 0.0)  # R_{11}
S_11 = Point(15.9, 5.592997, 0.0)  # S_{11}
T_11 = Point(16.34, 5.70637, 0.0)  # T_{11}
U_11 = Point(16.78, 5.83308, 0.0)  # U_{11}
V_11 = Point(17.22, 5.973128, 0.0)  # V_{11}
W_11 = Point(17.66, 6.126514, 0.0)  # W_{11}
Z_11 = Point(18.1, 6.293238, 0.0)  # Z_{11}
A_12 = Point(18.54, 6.4733, 0.0)  # A_{12}
B_12 = Point(11.94, 5.172853, 0.0)  # B_{12}
C_12 = Point(11.5, 5.19286, 0.0)  # C_{12}
D_12 = Point(11.06, 5.226205, 0.0)  # D_{12}
E_12 = Point(10.62, 5.272887, 0.0)  # E_{12}
F_12 = Point(10.18, 5.332908, 0.0)  # F_{12}
G_12 = Point(9.74, 5.406267, 0.0)  # G_{12}
H_12 = Point(9.3, 5.492963, 0.0)  # H_{12}
I_12 = Point(8.86, 5.592997, 0.0)  # I_{12}
J_12 = Point(8.42, 5.70637, 0.0)  # J_{12}
K_12 = Point(7.98, 5.83308, 0.0)  # K_{12}
L_12 = Point(7.54, 5.973128, 0.0)  # L_{12}
M_12 = Point(7.1, 6.126514, 0.0)  # M_{12}
N_12 = Point(6.66, 6.293238, 0.0)  # N_{12}
O_12 = Point(6.22, 6.4733, 0.0)  # O_{12}
E_5 = Point(18.54, 5.0, 0.0)  # E_5
D_5 = Point(18.1, 5.0, 0.0)  # D_5
C_5 = Point(17.66, 5.0, 0.0)  # C_5
B_5 = Point(17.22, 5.0, 0.0)  # B_5
A_5 = Point(16.78, 5.0, 0.0)  # A_5
Z_4 = Point(16.34, 5.0, 0.0)  # Z_4
W_4 = Point(15.9, 5.0, 0.0)  # W_4
V_4 = Point(15.46, 5.0, 0.0)  # V_4
T_4 = Point(14.58, 5.0, 0.0)  # T_4
S_4 = Point(14.14, 5.0, 0.0)  # S_4
R_4 = Point(13.7, 5.0, 0.0)  # R_4
Q_4 = Point(13.26, 5.0, 0.0)  # Q_4
O_4 = Point(12.38, 5.0, 0.0)  # O_4
N_4 = Point(11.94, 5.0, 0.0)  # N_4
M_4 = Point(11.5, 5.0, 0.0)  # M_4
L_4 = Point(11.06, 5.0, 0.0)  # L_4
K_4 = Point(10.62, 5.0, 0.0)  # K_4
J_4 = Point(10.18, 5.0, 0.0)  # J_4
I_4 = Point(9.74, 5.0, 0.0)  # I_4
H_4 = Point(9.3, 5.0, 0.0)  # H_4
F_4 = Point(8.42, 5.0, 0.0)  # F_4
E_4 = Point(7.98, 5.0, 0.0)  # E_4
D_4 = Point(7.54, 5.0, 0.0)  # D_4
C_4 = Point(7.1, 5.0, 0.0)  # C_4
B_4 = Point(6.66, 5.0, 0.0)  # B_4
J_8 = Point(6.22, 5.0, 0.0)  # J_8
G_4 = Point(8.86, 5.0, 0.0)  # G_4
U_4 = Point(15.02, 5.0, 0.0)  # U_4
D_13 = Point(3.793692, 0.681165, 0.0)  # D_{13}
E_13 = Point(3.793692, 0.513165, 0.0)  # E_{13}
F_13 = Point(3.793692, 0.345165, 0.0)  # F_{13}
G_13 = Point(3.793692, 0.177165, 0.0)  # G_{13}
A_14 = Point(-1.748402, -2.274636, 0.0)  # A_{14}
H_13 = Point(3.793692, 0.009165, 0.0)  # H_{13}
I_13 = Point(3.793692, -0.158835, 0.0)  # I_{13}
J_13 = Point(3.793692, -0.326835, 0.0)  # J_{13}
I_14 = Point(2.7, 5.083417, 0.0)  # I_{14}
H_14 = Point(3.14, 5.238057, 0.0)  # H_{14}
G_14 = Point(3.58, 5.406036, 0.0)  # G_{14}
F_14 = Point(4.02, 5.587352, 0.0)  # F_{14}
E_14 = Point(4.46, 5.782007, 0.0)  # E_{14}
D_14 = Point(4.9, 5.989999, 0.0)  # D_{14}
C_14 = Point(5.34, 6.211329, 0.0)  # C_{14}
B_14 = Point(5.78, 6.445997, 0.0)  # B_{14}
U_5 = Point(2.7, 5.0, 0.0)  # U_5
T_5 = Point(3.14, 5.0, 0.0)  # T_5
S_5 = Point(3.58, 5.0, 0.0)  # S_5
R_5 = Point(4.02, 5.0, 0.0)  # R_5
Q_5 = Point(4.46, 5.0, 0.0)  # Q_5
P_5 = Point(4.9, 5.0, 0.0)  # P_5
O_5 = Point(5.34, 5.0, 0.0)  # O_5
V_5 = Point(5.78, 5.0, 0.0)  # V_5
J_14 = Point(18.98, 6.445997, 0.0)  # J_{14}
K_14 = Point(19.42, 6.211329, 0.0)  # K_{14}
L_14 = Point(19.86, 5.989999, 0.0)  # L_{14}
M_14 = Point(20.3, 5.782007, 0.0)  # M_{14}
N_14 = Point(20.74, 5.587352, 0.0)  # N_{14}
O_14 = Point(21.18, 5.406036, 0.0)  # O_{14}
P_14 = Point(21.62, 5.238057, 0.0)  # P_{14}
Q_14 = Point(22.06, 5.083417, 0.0)  # Q_{14}
T_12 = Point(22.28, 5.012766, 0.0)  # T_{12}
N_5 = Point(18.98, 5.0, 0.0)  # N_5
G_5 = Point(19.42, 5.0, 0.0)  # G_5
H_5 = Point(19.86, 5.0, 0.0)  # H_5
I_5 = Point(20.3, 5.0, 0.0)  # I_5
J_5 = Point(20.74, 5.0, 0.0)  # J_5
K_5 = Point(21.18, 5.0, 0.0)  # K_5
L_5 = Point(21.62, 5.0, 0.0)  # L_5
M_5 = Point(22.06, 5.0, 0.0)  # M_5
W_13 = Point(-1.748402, -5.014966, 0.0)  # W_{13}
N_13 = Point(-1.748402, 1.270842, 0.0)  # N_{13}
P_16 = Point(2.48, 2.857466, 0.0)  # P_{16}
Q_16 = Point(6.0, 2.857466, 0.0)  # Q_{16}
R_16 = Point(12.38, 2.857466, 0.0)  # R_{16}
S_16 = Point(18.76, 2.857466, 0.0)  # S_{16}
T_16 = Point(22.28, 2.857466, 0.0)  # T_{16}
W_22 = Point(12.38, 3.765702, 0.0)  # W_{22}
M_25 = Point(23.0, -5.365119, 0.0)  # M_{25}
A_26 = Point(17.457906, -5.365119, 0.0)  # A_{26}
T_29 = Point(15.54468, 0.421585, 0.0)  # T_{29}
Z_29 = Point(10.002586, -2.702216, 0.0)  # Z_{29}
N_6 = Point(6.44, 5.1, 0.0)  # N_6
G_20 = Point(6.44, 5.0, 0.0)  # G_{20}
O_6 = Point(6.88, 5.1, 0.0)  # O_6
H_20 = Point(6.88, 5.0, 0.0)  # H_{20}
P_6 = Point(7.32, 5.1, 0.0)  # P_6
I_20 = Point(7.32, 5.0, 0.0)  # I_{20}
Q_6 = Point(7.76, 5.1, 0.0)  # Q_6
J_20 = Point(7.76, 5.0, 0.0)  # J_{20}
R_6 = Point(8.2, 5.1, 0.0)  # R_6
K_20 = Point(8.2, 5.0, 0.0)  # K_{20}
S_6 = Point(8.64, 5.1, 0.0)  # S_6
L_20 = Point(8.64, 5.0, 0.0)  # L_{20}
T_6 = Point(9.08, 5.1, 0.0)  # T_6
M_20 = Point(9.08, 5.0, 0.0)  # M_{20}
U_6 = Point(9.52, 5.1, 0.0)  # U_6
N_20 = Point(9.52, 5.0, 0.0)  # N_{20}
V_6 = Point(9.96, 5.1, 0.0)  # V_6
O_20 = Point(9.96, 5.0, 0.0)  # O_{20}
W_6 = Point(10.4, 5.1, 0.0)  # W_6
P_20 = Point(10.4, 5.0, 0.0)  # P_{20}
Z_6 = Point(10.84, 5.1, 0.0)  # Z_6
Q_20 = Point(10.84, 5.0, 0.0)  # Q_{20}
A_7 = Point(11.28, 5.1, 0.0)  # A_7
R_20 = Point(11.28, 5.0, 0.0)  # R_{20}
B_7 = Point(11.72, 5.1, 0.0)  # B_7
S_20 = Point(11.72, 5.0, 0.0)  # S_{20}
C_7 = Point(12.16, 5.1, 0.0)  # C_7
T_20 = Point(12.16, 5.0, 0.0)  # T_{20}
D_7 = Point(12.6, 5.1, 0.0)  # D_7
U_20 = Point(12.6, 5.0, 0.0)  # U_{20}
V_20 = Point(13.04, 5.1, 0.0)  # V_{20}
W_20 = Point(13.04, 5.0, 0.0)  # W_{20}
E_7 = Point(13.48, 5.1, 0.0)  # E_7
Z_20 = Point(13.48, 5.0, 0.0)  # Z_{20}
G_7 = Point(13.92, 5.1, 0.0)  # G_7
A_21 = Point(13.92, 5.0, 0.0)  # A_{21}
H_7 = Point(14.36, 5.1, 0.0)  # H_7
frameBL = Point(-3.006773, -6.300184, 0.0)  # frameBL
C_21 = Point(28.755583, -6.300184, 0.0)  # C_{21}
D_21 = Point(-3.006773, 9.580994, 0.0)  # D_{21}
frameTR = Point(28.755583, 9.580994, 0.0)  # frameTR
I_21 = Point(23.799058, 0.5, 0.0)  # I_{21}
J_21 = Point(23.799058, -1.936, 0.0)  # J_{21}
K_21 = Point(23.799058, -4.372, 0.0)  # K_{21}
O_21 = Point(5.290477, 0.849165, 0.0)  # O_{21}
M_21 = Point(4.605851, -0.494835, 0.0)  # M_{21}
N_21 = Point(4.605851, -2.274636, 0.0)  # N_{21}
P_21 = Point(5.290477, -2.274636, 0.0)  # P_{21}
S_21 = Point(16.285249, 0.421585, 0.0)  # S_{21}
W_29 = Point(15.54468, -5.138216, 0.0)  # W_{29}
Q_21 = Point(16.285249, -5.138216, 0.0)  # Q_{21}
K_22 = Point(4.24, 9.0, 0.0)  # K_{22}
L_22 = Point(4.24, 2.179784, 0.0)  # L_{22}
O_13 = Point(20.52, 9.0, 0.0)  # O_{13}
P_13 = Point(20.52, 2.179784, 0.0)  # P_{13}
Q_13 = Point(20.52, 4.221006, 0.0)  # Q_{13}
S_13 = Point(9.335786, -5.014966, 0.0)  # S_{13}
T_13 = Point(9.335786, 1.270842, 0.0)  # T_{13}
U_13 = Point(9.335786, -2.274636, 0.0)  # U_{13}

# --- geometry ---
S.add(Line(V, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Z_17, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(D_2, F_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Polygon([H_8, C_6, B, I_8]), linecolor=Color(0.1255, 0.1255, 0.1255), facecolor=Color(0.1255, 0.1255, 0.1255), linewidth=1.2, opacity=0.15)
S.add(M_16, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(L_13, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(L_13, M_16), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(A_2, I_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(T_21, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(G_8, L_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_13, K_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(F_22, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(M_22, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(O_8, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(N_16, O_16), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(E_22, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(E_22, T_21), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(E, G), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_12, Q_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(U_12, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(U_9, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(M_1, Q_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(M_8, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(W_5, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(U_12, C), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(M_10, N_10), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(B_6, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Z_5, B_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C, B_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(W_9, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(U_9, O_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(U_9, P_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(U_9, Q_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(U_9, R_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(U_9, S_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(U_9, T_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(U_9, U_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(U_9, V_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(U_9, W_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(U_9, Z_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(U_9, A_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(U_9, B_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(U_9, C_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(U_9, D_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(U_9, E_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(P_10, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(P_10, M_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_9, G_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_9, H_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_9, I_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_9, J_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_9, K_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_9, L_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_9, M_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_9, N_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_9, O_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_9, P_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_9, Q_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_9, R_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_9, S_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_9, F_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_9, T_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(H_11, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(H_11, W_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(K_11, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(Z_13, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(S_14, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(Line(D_6, E_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(L_1, P_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_1, O_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(J_1, N_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(I_1, M_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_1, L_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(G_1, K_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(F_1, J_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(E_1, I_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(D_1, H_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_1, G_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(B_1, F_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(A_1, E_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Z, D_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(W, C_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(U, A_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(T, Z_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(S_2, W_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(R, V_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Q, U_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P, T_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(O, S_2_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N, R_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M, Q_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(L, P_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K, O_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(J, N_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(I, M_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(T_1, Z_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(R_12, S_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C, B), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_2, D), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_2, G_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(B_2, H_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Z_1, J_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(W_1, K_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(V_1, L_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N_1, R_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(O_1, S_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_1, T_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Q_1, U_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(R_1, V_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(S_1, W_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(U_1, A_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(F_7, P_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_7, F_5), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(E_8, F_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([C_6, B, F_5, S_7]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.2, opacity=0.15)
S.add(Polygon([F_5, F_8, E_8, S_7]), linecolor=Color(0.1255, 0.1255, 0.1255), facecolor=Color(0.1255, 0.1255, 0.1255), linewidth=1.2, opacity=0.15)
S.add(Line(D_8, K_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_9, V_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_9, V_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(M_8, Z_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(Z_9, A_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(A_10, B_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(B_10, C_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(C_10, D_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(D_10, E_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(E_10, F_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(F_10, G_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(G_10, H_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(H_10, I_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(I_10, J_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(J_10, K_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(K_10, L_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(L_10, A_6), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Q_10, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(A_6, P_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(P_10, Q_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(M_8, Q_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(I_11, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(H_11, I_11), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(I_11, W_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_5, R_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(R_10, S_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(S_10, T_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(T_10, U_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(U_10, V_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(V_10, W_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_10, Z_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(Z_10, A_11), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(A_11, B_11), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(C_11, D_11), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(D_11, E_11), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(E_11, F_11), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(F_11, G_11), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(G_11, H_11), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(U_9, O_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_9, J_11), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(K_11, J_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_11, O_10), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_11, O_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_11, P_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Q_8, K_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_11, R_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(S_8, K_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_11, T_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(U_8, K_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_11, V_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(W_8, K_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_11, Z_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(A_9, K_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_11, B_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, K_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_11, D_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(E_9, K_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_11, F_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(G_9, K_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_11, H_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(I_9, K_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_11, J_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_9, K_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_11, M_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N_9, K_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_11, O_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(L_9, K_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_11, P_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Q_9, K_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_11, R_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(S_9, K_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_11, T_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(B_6, L_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_11, M_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_11, N_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_11, O_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_11, P_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_11, Q_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_11, R_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_11, S_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_11, T_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_11, U_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_11, V_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V_11, W_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W_11, Z_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_11, A_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_12, Z_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_6, B_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_12, C_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_12, D_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_12, E_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_12, F_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_12, G_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_12, H_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_12, I_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_12, J_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_12, K_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_12, L_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_12, M_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_12, N_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_12, O_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_12, E_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_11, D_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W_11, C_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V_11, B_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_11, A_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_11, Z_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_11, W_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_11, V_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_11, T_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_11, S_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_11, R_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_11, Q_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_11, P_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_6, O_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_12, N_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_12, M_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_12, L_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_12, K_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_12, J_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_12, I_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_12, H_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_12, F_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_12, E_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_12, D_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_12, C_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_12, B_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_12, J_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_12, G_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_11, U_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_12, C), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_14, M_16), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Z_13, L_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(S_14, D_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(S_14, E_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(S_14, F_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(S_14, G_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Z_13, A_14), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(S_14, H_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(I_13, S_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(S_14, J_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_13, S_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(U_12, I_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_14, H_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_14, G_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_14, F_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_14, E_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_14, D_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_14, C_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_14, B_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_14, C), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_8, U_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_5, I_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_5, H_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_5, G_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_5, F_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_5, E_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_5, D_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_5, C_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V_5, B_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_5, J_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_14, K_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_14, L_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_14, M_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_14, N_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_14, O_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_14, P_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_14, Q_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_14, T_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_14, N_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_14, G_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_14, H_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_14, I_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_14, J_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_14, K_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_14, L_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_14, M_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_12, F_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(6.0, 6.57, 0.0), Point(5.0, 6.57, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(5.0, 6.57, 0.0), Point(6.619741, 7.254816, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(5.0, 6.57, 0.0), Point(6.619741, 5.885184, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(6.0, 6.57, 0.0), Point(7.0, 6.57, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(7.0, 6.57, 0.0), Point(5.380259, 5.885184, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(7.0, 6.57, 0.0), Point(5.380259, 7.254816, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(6.0, 6.57, 0.0), Point(5.084532, 6.97239, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(5.084532, 6.97239, 0.0), Point(6.842916, 6.94755, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(5.084532, 6.97239, 0.0), Point(6.291791, 5.693696, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(18.76, 6.57, 0.0), Point(19.675468, 6.97239, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(19.675468, 6.97239, 0.0), Point(18.468209, 5.693696, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(19.675468, 6.97239, 0.0), Point(17.917084, 6.94755, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(23.0, 0.5, 0.0), Point(23.0, -4.372, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(23.0, -4.372, 0.0), Point(22.315184, -2.752259, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(23.0, -4.372, 0.0), Point(23.684816, -2.752259, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(23.0, -4.372, 0.0), Point(17.457906, -1.936, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(17.457906, -1.936, 0.0), Point(19.216291, -1.96084, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(17.457906, -1.936, 0.0), Point(18.665165, -3.214694, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(17.457906, -1.936, 0.0), Point(23.0, 0.5, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(23.0, 0.5, 0.0), Point(21.792741, -0.778694, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(23.0, 0.5, 0.0), Point(21.241615, 0.47516, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(6.0, 6.57, 0.0), Point(6.871147, 7.061022, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(6.871147, 7.061022, 0.0), Point(5.796374, 5.669118, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(6.871147, 7.061022, 0.0), Point(5.123855, 6.862269, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(3.793692, -0.494835, 0.0), Point(-1.748402, -2.274636, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(-1.748402, -2.274636, 0.0), Point(-0.415624, -1.127362, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(-1.748402, -2.274636, 0.0), Point(0.003157, -2.431399, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(6.0, 6.57, 0.0), Point(6.0, 7.57, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=4.2)  # vector
S.add(Line(Point(6.0, 7.57, 0.0), Point(6.684816, 5.950259, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=4.2)
S.add(Line(Point(6.0, 7.57, 0.0), Point(5.315184, 5.950259, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=4.2)
S.add(Line(Point(2.48, 5.012766, 0.0), Point(2.48, 4.012766, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(2.48, 4.012766, 0.0), Point(1.795184, 5.632507, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(2.48, 4.012766, 0.0), Point(3.164816, 5.632507, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Z_5, F_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(2.48, 5.012766, 0.0), Point(1.48, 5.012766, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(1.48, 5.012766, 0.0), Point(3.099741, 5.697581, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(1.48, 5.012766, 0.0), Point(3.099741, 4.32795, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(18.76, 6.57, 0.0), Point(17.76, 6.57, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(17.76, 6.57, 0.0), Point(19.379741, 7.254816, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(17.76, 6.57, 0.0), Point(19.379741, 5.885184, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(18.76, 6.57, 0.0), Point(19.76, 6.57, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(19.76, 6.57, 0.0), Point(18.140259, 5.885184, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(19.76, 6.57, 0.0), Point(18.140259, 7.254816, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(22.28, 5.012766, 0.0), Point(23.28, 5.012766, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(23.28, 5.012766, 0.0), Point(21.660259, 4.32795, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(23.28, 5.012766, 0.0), Point(21.660259, 5.697581, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(-1.748402, -5.014966, 0.0), Point(3.793692, -5.014966, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(3.793692, -5.014966, 0.0), Point(2.173951, -5.699782, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(3.793692, -5.014966, 0.0), Point(2.173951, -4.330151, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(W_13, N_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(P_16, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(Q_16, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(R_16, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(S_16, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(T_16, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(Line(P_16, T_16), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Z_5, W_22), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(W_22, C), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(Z_5, C), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(18.76, 6.57, 0.0), Point(18.76, 7.57, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(18.76, 7.57, 0.0), Point(19.444816, 5.950259, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(18.76, 7.57, 0.0), Point(18.075184, 5.950259, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(3.793692, 0.849165, 0.0), Point(3.793692, -0.494835, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(3.793692, -0.494835, 0.0), Point(3.108877, 1.124906, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(3.793692, -0.494835, 0.0), Point(4.478508, 1.124906, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(23.0, -5.365119, 0.0), Point(17.457906, -5.365119, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(17.457906, -5.365119, 0.0), Point(19.077647, -4.680304, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(17.457906, -5.365119, 0.0), Point(19.077647, -6.049935, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(M_25, V_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(A_26, K_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(-1.748402, -2.274636, 0.0), Point(3.793692, 0.849165, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(3.793692, 0.849165, 0.0), Point(2.718919, -0.542739, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(3.793692, 0.849165, 0.0), Point(2.0464, 0.650411, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(18.76, 6.57, 0.0), Point(17.888853, 7.061022, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(17.888853, 7.061022, 0.0), Point(19.636145, 6.862269, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(17.888853, 7.061022, 0.0), Point(18.963626, 5.669118, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(22.28, 5.012766, 0.0), Point(23.232108, 4.707003, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(23.232108, 4.707003, 0.0), Point(21.480549, 4.550241, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(23.232108, 4.707003, 0.0), Point(21.89933, 5.854277, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(T_29, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(15.54468, -5.138216, 0.0), Point(15.54468, 0.421585, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(15.54468, 0.421585, 0.0), Point(16.229495, -1.198157, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(15.54468, 0.421585, 0.0), Point(14.859864, -1.198157, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Z_29, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(Line(Point(10.002586, -2.702216, 0.0), Point(15.54468, -5.138216, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(15.54468, -5.138216, 0.0), Point(13.786295, -5.113376, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(15.54468, -5.138216, 0.0), Point(14.337421, -3.859522, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(15.54468, 0.421585, 0.0), Point(10.002586, -2.702216, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(10.002586, -2.702216, 0.0), Point(11.077359, -1.310313, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(10.002586, -2.702216, 0.0), Point(11.749878, -2.503463, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(6.0, 6.57, 0.0), Point(5.128853, 6.078978, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(5.128853, 6.078978, 0.0), Point(6.203626, 7.470882, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(5.128853, 6.078978, 0.0), Point(6.876145, 6.277731, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(6.0, 6.57, 0.0), Point(6.915468, 6.16761, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(6.915468, 6.16761, 0.0), Point(5.157084, 6.19245, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(6.915468, 6.16761, 0.0), Point(5.708209, 7.446304, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(22.28, 5.012766, 0.0), Point(22.28, 4.012766, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(22.28, 4.012766, 0.0), Point(21.595184, 5.632507, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(22.28, 4.012766, 0.0), Point(22.964816, 5.632507, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(12.38, 4.221006, 0.0), Point(12.38, 3.221006, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(12.38, 3.221006, 0.0), Point(11.695184, 4.840747, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(12.38, 3.221006, 0.0), Point(13.064816, 4.840747, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(18.54, 5.05, 0.0), Point(18.54, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(18.54, 4.55, 0.0), Point(17.855184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(18.54, 4.55, 0.0), Point(19.224816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(18.1, 5.05, 0.0), Point(18.1, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(18.1, 4.55, 0.0), Point(17.415184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(18.1, 4.55, 0.0), Point(18.784816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(17.66, 5.05, 0.0), Point(17.66, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(17.66, 4.55, 0.0), Point(16.975184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(17.66, 4.55, 0.0), Point(18.344816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(17.22, 5.05, 0.0), Point(17.22, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(17.22, 4.55, 0.0), Point(16.535184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(17.22, 4.55, 0.0), Point(17.904816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(16.78, 5.05, 0.0), Point(16.78, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(16.78, 4.55, 0.0), Point(16.095184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(16.78, 4.55, 0.0), Point(17.464816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(16.34, 5.05, 0.0), Point(16.34, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(16.34, 4.55, 0.0), Point(15.655184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(16.34, 4.55, 0.0), Point(17.024816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(15.9, 5.05, 0.0), Point(15.9, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(15.9, 4.55, 0.0), Point(15.215184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(15.9, 4.55, 0.0), Point(16.584816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(15.46, 5.05, 0.0), Point(15.46, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(15.46, 4.55, 0.0), Point(14.775184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(15.46, 4.55, 0.0), Point(16.144816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(15.02, 5.05, 0.0), Point(15.02, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(15.02, 4.55, 0.0), Point(14.335184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(15.02, 4.55, 0.0), Point(15.704816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(14.58, 5.05, 0.0), Point(14.58, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(14.58, 4.55, 0.0), Point(13.895184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(14.58, 4.55, 0.0), Point(15.264816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(14.14, 5.05, 0.0), Point(14.14, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(14.14, 4.55, 0.0), Point(13.455184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(14.14, 4.55, 0.0), Point(14.824816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(13.7, 5.05, 0.0), Point(13.7, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(13.7, 4.55, 0.0), Point(13.015184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(13.7, 4.55, 0.0), Point(14.384816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(13.26, 5.05, 0.0), Point(13.26, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(13.26, 4.55, 0.0), Point(12.575184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(13.26, 4.55, 0.0), Point(13.944816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(12.82, 5.05, 0.0), Point(12.82, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(12.82, 4.55, 0.0), Point(12.135184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(12.82, 4.55, 0.0), Point(13.504816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(12.38, 5.05, 0.0), Point(12.38, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(12.38, 4.55, 0.0), Point(11.695184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(12.38, 4.55, 0.0), Point(13.064816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(11.94, 5.05, 0.0), Point(11.94, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(11.94, 4.55, 0.0), Point(11.255184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(11.94, 4.55, 0.0), Point(12.624816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(11.5, 5.05, 0.0), Point(11.5, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(11.5, 4.55, 0.0), Point(10.815184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(11.5, 4.55, 0.0), Point(12.184816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(11.06, 5.05, 0.0), Point(11.06, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(11.06, 4.55, 0.0), Point(10.375184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(11.06, 4.55, 0.0), Point(11.744816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(10.62, 5.05, 0.0), Point(10.62, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(10.62, 4.55, 0.0), Point(9.935184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(10.62, 4.55, 0.0), Point(11.304816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(10.18, 5.05, 0.0), Point(10.18, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(10.18, 4.55, 0.0), Point(9.495184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(10.18, 4.55, 0.0), Point(10.864816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(9.74, 5.05, 0.0), Point(9.74, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(9.74, 4.55, 0.0), Point(9.055184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(9.74, 4.55, 0.0), Point(10.424816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(9.3, 5.05, 0.0), Point(9.3, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(9.3, 4.55, 0.0), Point(8.615184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(9.3, 4.55, 0.0), Point(9.984816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(8.86, 5.05, 0.0), Point(8.86, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(8.86, 4.55, 0.0), Point(8.175184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(8.86, 4.55, 0.0), Point(9.544816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(8.42, 5.05, 0.0), Point(8.42, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(8.42, 4.55, 0.0), Point(7.735184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(8.42, 4.55, 0.0), Point(9.104816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(7.98, 5.05, 0.0), Point(7.98, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(7.98, 4.55, 0.0), Point(7.295184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(7.98, 4.55, 0.0), Point(8.664816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(7.54, 5.05, 0.0), Point(7.54, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(7.54, 4.55, 0.0), Point(6.855184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(7.54, 4.55, 0.0), Point(8.224816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(7.1, 5.05, 0.0), Point(7.1, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(7.1, 4.55, 0.0), Point(6.415184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(7.1, 4.55, 0.0), Point(7.784816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(6.66, 5.05, 0.0), Point(6.66, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(6.66, 4.55, 0.0), Point(5.975184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(6.66, 4.55, 0.0), Point(7.344816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(6.22, 5.05, 0.0), Point(6.22, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(6.22, 4.55, 0.0), Point(5.535184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(6.22, 4.55, 0.0), Point(6.904816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(5.78, 5.05, 0.0), Point(5.78, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(5.78, 4.55, 0.0), Point(5.095184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(5.78, 4.55, 0.0), Point(6.464816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(5.34, 5.05, 0.0), Point(5.34, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(5.34, 4.55, 0.0), Point(4.655184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(5.34, 4.55, 0.0), Point(6.024816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(4.9, 5.05, 0.0), Point(4.9, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(4.9, 4.55, 0.0), Point(4.215184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(4.9, 4.55, 0.0), Point(5.584816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(4.46, 5.05, 0.0), Point(4.46, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(4.46, 4.55, 0.0), Point(3.775184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(4.46, 4.55, 0.0), Point(5.144816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(4.02, 5.05, 0.0), Point(4.02, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(4.02, 4.55, 0.0), Point(3.335184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(4.02, 4.55, 0.0), Point(4.704816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(3.58, 5.05, 0.0), Point(3.58, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(3.58, 4.55, 0.0), Point(2.895184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(3.58, 4.55, 0.0), Point(4.264816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(3.14, 5.05, 0.0), Point(3.14, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(3.14, 4.55, 0.0), Point(2.455184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(3.14, 4.55, 0.0), Point(3.824816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(2.7, 5.05, 0.0), Point(2.7, 4.55, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(2.7, 4.55, 0.0), Point(2.015184, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(2.7, 4.55, 0.0), Point(3.384816, 6.169741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(N_6, G_20), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(O_6, H_20), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(P_6, I_20), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Q_6, J_20), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(R_6, K_20), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(S_6, L_20), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(T_6, M_20), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(U_6, N_20), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(V_6, O_20), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(W_6, P_20), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Z_6, Q_20), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(A_7, R_20), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(B_7, S_20), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(C_7, T_20), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(D_7, U_20), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(V_20, W_20), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(E_7, Z_20), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(G_7, A_21), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(H_7, Point(14.36, 5.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(14.8, 5.1, 0.0), Point(14.8, 5.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(15.24, 5.1, 0.0), Point(15.24, 5.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(15.68, 5.1, 0.0), Point(15.68, 5.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(16.12, 5.1, 0.0), Point(16.12, 5.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(16.56, 5.1, 0.0), Point(16.56, 5.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(17.0, 5.1, 0.0), Point(17.0, 5.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(17.44, 5.1, 0.0), Point(17.44, 5.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(17.88, 5.1, 0.0), Point(17.88, 5.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(18.32, 5.1, 0.0), Point(18.32, 5.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(19.2, 5.1, 0.0), Point(19.2, 5.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(19.64, 5.1, 0.0), Point(19.64, 5.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(20.08, 5.1, 0.0), Point(20.08, 5.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(20.52, 5.1, 0.0), Point(20.52, 5.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(20.96, 5.1, 0.0), Point(20.96, 5.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(21.4, 5.1, 0.0), Point(21.4, 5.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(21.84, 5.1, 0.0), Point(21.84, 5.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(3.36, 5.1, 0.0), Point(3.36, 5.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(3.8, 5.1, 0.0), Point(3.8, 5.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(4.24, 5.1, 0.0), Point(4.24, 5.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(4.68, 5.1, 0.0), Point(4.68, 5.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(5.12, 5.1, 0.0), Point(5.12, 5.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(5.56, 5.1, 0.0), Point(5.56, 5.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(frameBL, C_21), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([frameBL, D_21, frameTR, C_21]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(6.0, 4.05, 0.0), Point(6.0, 5.05, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(6.0, 5.05, 0.0), Point(6.684816, 3.430259, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(6.0, 5.05, 0.0), Point(5.315184, 3.430259, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(18.76, 4.05, 0.0), Point(18.76, 5.05, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(18.76, 5.05, 0.0), Point(19.444816, 3.430259, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(18.76, 5.05, 0.0), Point(18.075184, 3.430259, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(3.793692, -4.267586, 0.0), Point(-1.748402, -4.267586, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(-1.748402, -4.267586, 0.0), Point(-0.128661, -3.582771, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(-1.748402, -4.267586, 0.0), Point(-0.128661, -4.952402, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(17.457906, -4.803596, 0.0), Point(23.0, -4.803596, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(23.0, -4.803596, 0.0), Point(21.380259, -5.488412, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(23.0, -4.803596, 0.0), Point(21.380259, -4.118781, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(23.799058, -4.372, 0.0), Point(23.799058, -1.936, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(23.799058, -1.936, 0.0), Point(24.483873, -3.555741, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(23.799058, -1.936, 0.0), Point(23.114242, -3.555741, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(23.799058, -1.936, 0.0), Point(23.799058, 0.5, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(23.799058, 0.5, 0.0), Point(24.483873, -1.119741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(23.799058, 0.5, 0.0), Point(23.114242, -1.119741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(O_8, I_21), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(V_9, J_21), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(T_9, K_21), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(5.290477, -2.274636, 0.0), Point(5.290477, 0.849165, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(5.290477, 0.849165, 0.0), Point(5.975293, -0.770576, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(5.290477, 0.849165, 0.0), Point(4.605662, -0.770576, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(4.605851, -0.494835, 0.0), Point(4.605851, -2.274636, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(4.605851, -2.274636, 0.0), Point(3.921036, -0.654895, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(4.605851, -2.274636, 0.0), Point(5.290667, -0.654895, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(O_21, M_16), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_21, K_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N_21, A_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_21, A_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(16.285249, -5.138216, 0.0), Point(16.285249, -2.702216, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(16.285249, -2.702216, 0.0), Point(16.970064, -4.321957, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(16.285249, -2.702216, 0.0), Point(15.600433, -4.321957, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(16.285249, -2.702216, 0.0), Point(16.285249, 0.421585, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(16.285249, 0.421585, 0.0), Point(16.970064, -1.198157, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(16.285249, 0.421585, 0.0), Point(15.600433, -1.198157, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(T_29, S_21), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(W_29, Q_21), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Polyline([E_22, F_22, T_21]), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(K_22, L_22), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(4.24, 4.221006, 0.0), Point(4.24, 3.221006, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(4.24, 3.221006, 0.0), Point(3.555184, 4.840747, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(4.24, 3.221006, 0.0), Point(4.924816, 4.840747, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Polygon([H_8, C_6, B, I_8]), linecolor=Color(1.0, 0.498, 0.0), facecolor=Color(1.0, 0.498, 0.0), linewidth=1.2, opacity=0.15)
S.add(Line(O_13, P_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Q_13, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(Point(20.52, 4.221006, 0.0), Point(20.52, 3.221006, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(20.52, 3.221006, 0.0), Point(19.835184, 4.840747, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(20.52, 3.221006, 0.0), Point(21.204816, 4.840747, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(S_13, T_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(U_13, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(Line(Point(3.793692, -0.494835, 0.0), Point(9.335786, -2.274636, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(9.335786, -2.274636, 0.0), Point(7.584227, -2.431399, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(9.335786, -2.274636, 0.0), Point(8.003008, -1.127362, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(9.335786, -2.274636, 0.0), Point(3.793692, 0.849165, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(3.793692, 0.849165, 0.0), Point(5.540984, 0.650411, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(3.793692, 0.849165, 0.0), Point(4.868465, -0.542739, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(9.335786, -5.014966, 0.0), Point(3.793692, -5.014966, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(3.793692, -5.014966, 0.0), Point(5.413433, -4.330151, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(3.793692, -5.014966, 0.0), Point(5.413433, -5.699782, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)

if __name__ == "__main__":
    viewer.show()
