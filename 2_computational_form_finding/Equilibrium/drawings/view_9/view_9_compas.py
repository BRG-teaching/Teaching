"""
COMPAS translation of GeoGebra applet: Parabola Construction
Source: https://block.arch.ethz.ch/eq/drawing/view/9
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
F_5 = Point(22.0, 17.134204, 0.0)  # F_5
L_5 = Point(22.0, -4.0, 0.0)  # L_5
D_5 = Point(6.0, 17.134204, 0.0)  # D_5
J_5 = Point(6.0, -4.0, 0.0)  # J_5
C_1 = Point(6.0, 6.385077, 0.0)  # C_1
D_1 = Point(22.0, 10.105045, 0.0)  # D_1
F_12 = Point(14.0, 3.81912, 0.0)  # F_{12}
G_1 = Point(14.0, 8.245061, 0.0)  # G_1
I_1 = Point(14.0, -0.606821, 0.0)  # I_1
E_1 = Point(10.0, 5.102098, 0.0)  # E_1
M_1 = Point(10.0, 2.889128, 0.0)  # M_1
Q_1 = Point(10.0, 3.995613, 0.0)  # Q_1
S_1 = Point(8.0, 5.190345, 0.0)  # S_1
T_1 = Point(8.0, 4.637102, 0.0)  # T_1
U_1 = Point(8.0, 4.913724, 0.0)  # U_1
V_1 = Point(12.0, 3.907367, 0.0)  # V_1
W_1 = Point(12.0, 3.354124, 0.0)  # W_1
Z_1 = Point(12.0, 3.630745, 0.0)  # Z_1
B_2 = Point(16.0, 4.284116, 0.0)  # B_2
E_2 = Point(20.0, 7.427078, 0.0)  # E_2
P_1 = Point(18.0, 6.962082, 0.0)  # P_1
R_1 = Point(18.0, 5.855597, 0.0)  # R_1
A_2 = Point(16.0, 4.837359, 0.0)  # A_2
C_2 = Point(16.0, 4.560737, 0.0)  # C_2
D_2 = Point(20.0, 7.980321, 0.0)  # D_2
F_2 = Point(20.0, 7.7037, 0.0)  # F_2
A = Point(6.0, 14.0, 0.0)  # A
T_7 = Point(6.0, 13.48, 0.0)  # T_7
P_2 = Point(22.0, 13.48, 0.0)  # P_2
Q_6 = Point(22.0, 14.0, 0.0)  # Q_6
Q_2 = Point(35.431692, 14.777233, 0.0)  # Q_2
L_3 = Point(8.0, 4.637102, 0.0)  # L_3
M_3 = Point(10.0, 2.889128, 0.0)  # M_3
N_3 = Point(12.0, 1.141154, 0.0)  # N_3
O_3 = Point(16.0, 2.071146, 0.0)  # O_3
Q_3 = Point(20.0, 7.427078, 0.0)  # Q_3
R_3 = Point(7.0, 5.51109, 0.0)  # R_3
S_3 = Point(9.0, 3.763115, 0.0)  # S_3
T_3 = Point(11.0, 2.015141, 0.0)  # T_3
U_3 = Point(13.0, 0.267167, 0.0)  # U_3
V_3 = Point(15.0, 0.732163, 0.0)  # V_3
W_3 = Point(17.0, 3.410129, 0.0)  # W_3
Z_3 = Point(19.0, 6.088095, 0.0)  # Z_3
A_4 = Point(21.0, 8.766061, 0.0)  # A_4
P_3 = Point(18.0, 4.749112, 0.0)  # P_3
B_4 = Point(6.0, 15.0, 0.0)  # B_4
C_4 = Point(22.0, 15.0, 0.0)  # C_4
D_4 = Point(14.0, 15.0, 0.0)  # D_4
E_4 = Point(6.0, 16.0, 0.0)  # E_4
F_4 = Point(22.0, 16.0, 0.0)  # F_4
G_4 = Point(24.0, 8.245061, 0.0)  # G_4
H_4 = Point(24.0, 3.81912, 0.0)  # H_4
J_4 = Point(25.0, 8.245061, 0.0)  # J_4
K_4 = Point(25.0, -0.606821, 0.0)  # K_4
I_4 = Point(6.0, 15.0, 0.0)  # I_4
L_4 = Point(10.0, 15.0, 0.0)  # L_4
M_4 = Point(14.0, 15.0, 0.0)  # M_4
N_4 = Point(18.0, 15.0, 0.0)  # N_4
O_4 = Point(22.0, 15.0, 0.0)  # O_4
P_4 = Point(6.0, 15.0, 0.0)  # P_4
Q_4 = Point(8.0, 15.0, 0.0)  # Q_4
R_4 = Point(10.0, 15.0, 0.0)  # R_4
S_4 = Point(12.0, 15.0, 0.0)  # S_4
T_4 = Point(14.0, 15.0, 0.0)  # T_4
U_4 = Point(16.0, 15.0, 0.0)  # U_4
V_4 = Point(18.0, 15.0, 0.0)  # V_4
W_4 = Point(20.0, 15.0, 0.0)  # W_4
Z_4 = Point(22.0, 15.0, 0.0)  # Z_4
E_5 = Point(14.0, 17.134204, 0.0)  # E_5
K_5 = Point(14.0, -4.0, 0.0)  # K_5
G_5 = Point(4.0, 8.245061, 0.0)  # G_5
M_5 = Point(27.231193, 8.245061, 0.0)  # M_5
H_5 = Point(4.0, 3.81912, 0.0)  # H_5
N_5 = Point(27.231193, 3.81912, 0.0)  # N_5
O_5 = Point(4.0, 1.49414, 0.0)  # O_5
P_5 = Point(27.231193, 6.895346, 0.0)  # P_5
Q_5 = Point(10.0, 17.134204, 0.0)  # Q_5
S_5 = Point(10.0, -4.0, 0.0)  # S_5
R_5 = Point(18.0, 17.134204, 0.0)  # R_5
T_5 = Point(18.0, -4.0, 0.0)  # T_5
U_5 = Point(8.0, 17.134204, 0.0)  # U_5
A_6 = Point(8.0, -4.0, 0.0)  # A_6
V_5 = Point(12.0, 17.134204, 0.0)  # V_5
B_6 = Point(12.0, -4.0, 0.0)  # B_6
W_5 = Point(16.0, 17.134204, 0.0)  # W_5
C_6 = Point(16.0, -4.0, 0.0)  # C_6
Z_5 = Point(20.0, 17.134204, 0.0)  # Z_5
D_6 = Point(20.0, -4.0, 0.0)  # D_6
E_6 = Point(7.0, 17.134204, 0.0)  # E_6
G_7 = Point(7.0, -4.0, 0.0)  # G_7
F_6 = Point(9.0, 17.134204, 0.0)  # F_6
H_7 = Point(9.0, -4.0, 0.0)  # H_7
G_6 = Point(11.0, 17.134204, 0.0)  # G_6
I_7 = Point(11.0, -4.0, 0.0)  # I_7
H_6 = Point(13.0, 17.134204, 0.0)  # H_6
J_7 = Point(13.0, -4.0, 0.0)  # J_7
K_7 = Point(17.0, -4.0, 0.0)  # K_7
J_6 = Point(17.0, 17.134204, 0.0)  # J_6
K_6 = Point(19.0, 17.134204, 0.0)  # K_6
L_7 = Point(19.0, -4.0, 0.0)  # L_7
L_6 = Point(21.0, 17.134204, 0.0)  # L_6
M_7 = Point(21.0, -4.0, 0.0)  # M_7
N_7 = Point(15.0, -4.0, 0.0)  # N_7
I_6 = Point(15.0, 17.134204, 0.0)  # I_6
frameBL = Point(0.374417, -5.420785, 0.0)  # frameBL
R_7 = Point(50.281188, -5.420785, 0.0)  # R_7
S_7 = Point(0.374417, 19.5326, 0.0)  # S_7
frameTR = Point(50.281188, 19.5326, 0.0)  # frameTR
F_3 = Point(35.431692, 7.277233, 0.0)  # F_3
E_3 = Point(42.209912, 8.853155, 0.0)  # E_3
S_2 = Point(35.431692, 13.839733, 0.0)  # S_2
T_2 = Point(35.431692, 11.964733, 0.0)  # T_2
U_2 = Point(35.431692, 10.089733, 0.0)  # U_2
V_2 = Point(35.431692, 8.214733, 0.0)  # V_2
W_2 = Point(35.431692, 6.339733, 0.0)  # W_2
Z_2 = Point(35.431692, 4.464733, 0.0)  # Z_2
A_3 = Point(35.431692, 2.589733, 0.0)  # A_3
B_3 = Point(35.431692, 0.714733, 0.0)  # B_3
D_3 = Point(35.431692, -0.222767, 0.0)  # D_3
G_3 = Point(35.431692, 17.134204, 0.0)  # G_3
H_3 = Point(35.431692, -4.0, 0.0)  # H_3
C_3 = Point(7.0, 5.51109, 0.0)  # C_3
K_3 = Point(9.0, 4.316358, 0.0)  # K_3
N_6 = Point(11.0, 3.674869, 0.0)  # N_6
O_6 = Point(13.0, 3.586622, 0.0)  # O_6
P_6 = Point(15.0, 4.051618, 0.0)  # P_6
R_6 = Point(17.0, 5.069857, 0.0)  # R_6
S_6 = Point(19.0, 6.641338, 0.0)  # S_6
T_6 = Point(35.431692, 12.902233, 0.0)  # T_6
W_6 = Point(35.431692, 11.027233, 0.0)  # W_6
Z_6 = Point(35.431692, 9.152233, 0.0)  # Z_6
A_7 = Point(35.431692, 5.402233, 0.0)  # A_7
B_7 = Point(35.431692, 3.527233, 0.0)  # B_7
C_7 = Point(35.431692, 1.652233, 0.0)  # C_7
S_8 = Point(7.0, 14.0, 0.0)  # S
N_1 = Point(7.0, 13.48, 0.0)  # N_1
C = Point(8.0, 14.0, 0.0)  # C
W_7 = Point(8.0, 13.48, 0.0)  # W_7
T = Point(9.0, 14.0, 0.0)  # T
Z_7 = Point(9.0, 13.48, 0.0)  # Z_7
E = Point(10.0, 14.0, 0.0)  # E
A_8 = Point(10.0, 13.48, 0.0)  # A_8
U = Point(11.0, 14.0, 0.0)  # U
C_8 = Point(11.0, 13.48, 0.0)  # C_8
G = Point(12.0, 14.0, 0.0)  # G
D_8 = Point(12.0, 13.48, 0.0)  # D_8
V = Point(13.0, 14.0, 0.0)  # V
F_8 = Point(13.0, 13.48, 0.0)  # F_8
I = Point(14.0, 14.0, 0.0)  # I
E_8 = Point(14.0, 13.48, 0.0)  # E_8
W = Point(15.0, 14.0, 0.0)  # W
G_8 = Point(15.0, 13.48, 0.0)  # G_8
K = Point(16.0, 14.0, 0.0)  # K
H_8 = Point(16.0, 13.48, 0.0)  # H_8
Z = Point(17.0, 14.0, 0.0)  # Z
I_8 = Point(17.0, 13.48, 0.0)  # I_8
M = Point(18.0, 14.0, 0.0)  # M
J_8 = Point(18.0, 13.48, 0.0)  # J_8
A_1 = Point(19.0, 14.0, 0.0)  # A_1
K_8 = Point(19.0, 13.48, 0.0)  # K_8
O = Point(20.0, 14.0, 0.0)  # O
L_8 = Point(20.0, 13.48, 0.0)  # L_8
B_1 = Point(21.0, 14.0, 0.0)  # B_1
M_8 = Point(21.0, 13.48, 0.0)  # M_8
A_10 = Point(13.144506, -1.585661, 0.0)  # A_{10}
D_10 = Point(23.04158, 9.327156, 0.0)  # D_{10}
G_10 = Point(5.144506, 5.406236, 0.0)  # G_{10}
E_10 = Point(23.56237, 8.938211, 0.0)  # E_{10}
C_10 = Point(12.716758, -2.075082, 0.0)  # C_{10}
F_10 = Point(4.716758, 4.916816, 0.0)  # F_{10}
Z_9 = Point(15.04158, -1.384709, 0.0)  # Z_9
N_10 = Point(5.716758, 4.042828, 0.0)  # N_{10}
O_10 = Point(6.716758, 3.168841, 0.0)  # O_{10}
M_10 = Point(7.716758, 2.294854, 0.0)  # M_{10}
L_10 = Point(8.716758, 1.420867, 0.0)  # L_{10}
K_10 = Point(9.716758, 0.54688, 0.0)  # K_{10}
J_10 = Point(10.716758, -0.327108, 0.0)  # J_{10}
I_10 = Point(11.716758, -1.201095, 0.0)  # I_{10}
P_10 = Point(16.56237, -0.434671, 0.0)  # P_{10}
Q_10 = Point(17.56237, 0.904312, 0.0)  # Q_{10}
R_10 = Point(18.56237, 2.243296, 0.0)  # R_{10}
S_10 = Point(19.56237, 3.582279, 0.0)  # S_{10}
V_10 = Point(20.56237, 4.921262, 0.0)  # V_{10}
T_10 = Point(21.56237, 6.260245, 0.0)  # T_{10}
U_10 = Point(22.56237, 7.599228, 0.0)  # U_{10}
W_10 = Point(12.144506, -0.711674, 0.0)  # W_{10}
Z_10 = Point(11.144506, 0.162313, 0.0)  # Z_{10}
A_11 = Point(10.144506, 1.0363, 0.0)  # A_{11}
B_11 = Point(9.144506, 1.910287, 0.0)  # B_{11}
C_11 = Point(8.144506, 2.784274, 0.0)  # C_{11}
D_11 = Point(7.144506, 3.658262, 0.0)  # D_{11}
E_11 = Point(6.144506, 4.532249, 0.0)  # E_{11}
F_11 = Point(16.04158, -0.045726, 0.0)  # F_{11}
G_11 = Point(17.04158, 1.293257, 0.0)  # G_{11}
H_11 = Point(18.04158, 2.63224, 0.0)  # H_{11}
I_11 = Point(19.04158, 3.971223, 0.0)  # I_{11}
J_11 = Point(20.04158, 5.310206, 0.0)  # J_{11}
K_11 = Point(21.04158, 6.649189, 0.0)  # K_{11}
L_11 = Point(22.04158, 7.988173, 0.0)  # L_{11}
B_10 = Point(15.56237, -1.773654, 0.0)  # B_{10}
Q = Point(14.0, -1.845613, 0.0)  # Q
H_10 = Point(18.0, -1.845613, 0.0)  # H_{10}
M_11 = Point(22.0, -1.845613, 0.0)  # M_{11}
N_11 = Point(20.813478, 4.749112, 0.0)  # N_{11}
O_11 = Point(20.813478, 5.855597, 0.0)  # O_{11}
P_11 = Point(20.813478, 6.962082, 0.0)  # P_{11}
O_1 = Point(18.0, 4.749112, 0.0)  # O_1

# --- geometry ---
S.add(Line(F_5, L_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_5, J_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(C_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(D_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(F_12, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(C_1, D_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(G_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(I_1, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(C_1, F_12), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(F_12, D_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(E_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=1.5)
S.add(M_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=1.5)
S.add(Line(E_1, M_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Q_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(Line(C_1, Q_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(S_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=1.5)
S.add(T_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(Line(S_1, T_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(U_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(Line(Q_1, F_12), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(V_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=1.5)
S.add(W_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=1.5)
S.add(Line(V_1, W_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Z_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(B_2, pointcolor=Color(0.251, 0.251, 0.251), pointsize=1.5)
S.add(E_2, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(P_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=1.5)
S.add(R_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(Line(F_12, R_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(A_2, pointcolor=Color(0.251, 0.251, 0.251), pointsize=1.5)
S.add(Line(A_2, B_2), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(C_2, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(Line(R_1, D_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(D_2, pointcolor=Color(0.251, 0.251, 0.251), pointsize=1.5)
S.add(Line(D_2, E_2), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(F_2, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(Polygon([A, T_7, P_2, Q_6]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.2, opacity=0.15)
S.add(Q_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(L_3, pointcolor=Color(0.0, 0.0, 0.0), pointsize=1.5)
S.add(M_3, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(N_3, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(O_3, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Q_3, pointcolor=Color(0.0, 0.0, 0.0), pointsize=1.5)
S.add(R_3, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(S_3, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(T_3, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(U_3, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(V_3, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(W_3, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Z_3, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(A_4, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(R_3, V_3), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(L_3, O_3), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(S_3, W_3), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(M_3, P_3), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.8)
S.add(Line(T_3, Z_3), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(N_3, Q_3), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(U_3, A_4), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.8)
S.add(B_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(C_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(D_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(Line(B_4, D_4), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(D_4, C_4), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(E_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(F_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(Line(E_4, F_4), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(G_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(H_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(Line(G_4, H_4), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(J_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(K_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(Line(J_4, K_4), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(I_4, pointcolor=Color(0.7529, 0.7529, 0.7529), pointsize=4.5)
S.add(L_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(M_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(N_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(O_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(Line(I_4, L_4), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(L_4, M_4), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(M_4, N_4), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(N_4, O_4), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(P_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(Q_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(R_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(S_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(T_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(U_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(V_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(W_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(Z_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(Line(P_4, Q_4), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Q_4, R_4), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(R_4, S_4), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(S_4, T_4), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(T_4, U_4), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(U_4, V_4), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(V_4, W_4), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(W_4, Z_4), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(E_5, K_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(G_5, M_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(H_5, N_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(O_5, P_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(Q_5, S_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(R_5, T_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(U_5, A_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(V_5, B_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(W_5, C_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Z_5, D_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(E_6, G_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(F_6, H_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(G_6, I_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_6, J_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_7, J_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_6, L_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(L_6, M_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N_7, I_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_1, I_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(I_1, D_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(frameBL, R_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([frameBL, S_7, frameTR, R_7]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_3, E_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_2, E_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_2, E_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(T_2, E_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(U_2, E_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(V_2, E_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(W_2, E_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Z_2, E_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(A_3, E_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(B_3, E_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(D_3, E_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_3, H_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(35.431692, 14.777233, 0.0), Point(35.431692, 13.839733, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, 13.839733, 0.0), Point(34.52316, 15.988611, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 13.839733, 0.0), Point(36.340223, 15.988611, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 13.839733, 0.0), Point(35.431692, 11.964733, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, 11.964733, 0.0), Point(34.52316, 14.113611, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 11.964733, 0.0), Point(36.340223, 14.113611, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 11.964733, 0.0), Point(35.431692, 10.089733, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, 10.089733, 0.0), Point(34.52316, 12.238611, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 10.089733, 0.0), Point(36.340223, 12.238611, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 10.089733, 0.0), Point(35.431692, 8.214733, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, 8.214733, 0.0), Point(34.52316, 10.363611, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 8.214733, 0.0), Point(36.340223, 10.363611, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 8.214733, 0.0), Point(35.431692, 6.339733, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, 6.339733, 0.0), Point(34.52316, 8.488611, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 6.339733, 0.0), Point(36.340223, 8.488611, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 6.339733, 0.0), Point(35.431692, 4.464733, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, 4.464733, 0.0), Point(34.52316, 6.613611, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 4.464733, 0.0), Point(36.340223, 6.613611, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 4.464733, 0.0), Point(35.431692, 2.589733, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, 2.589733, 0.0), Point(34.52316, 4.738611, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 2.589733, 0.0), Point(36.340223, 4.738611, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 2.589733, 0.0), Point(35.431692, 0.714733, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, 0.714733, 0.0), Point(34.52316, 2.863611, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 0.714733, 0.0), Point(36.340223, 2.863611, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 0.714733, 0.0), Point(35.431692, -0.222767, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, -0.222767, 0.0), Point(34.52316, 1.926111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, -0.222767, 0.0), Point(36.340223, 1.926111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, -0.222767, 0.0), Point(42.209912, 8.853155, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(42.209912, 8.853155, 0.0), Point(41.652004, 6.587797, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(42.209912, 8.853155, 0.0), Point(40.196145, 7.675084, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(42.209912, 8.853155, 0.0), Point(35.431692, 14.777233, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, 14.777233, 0.0), Point(37.647579, 14.047197, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 14.777233, 0.0), Point(36.45182, 12.679032, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(P_1, P_3), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Polyline([C_1, C_3, K_3, N_6, O_6, P_6, R_6, S_6, A_4, D_1]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(35.431692, 14.777233, 0.0), Point(35.431692, 12.902233, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, 12.902233, 0.0), Point(34.52316, 15.051111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 12.902233, 0.0), Point(36.340223, 15.051111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 12.902233, 0.0), Point(35.431692, 11.027233, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, 11.027233, 0.0), Point(34.52316, 13.176111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 11.027233, 0.0), Point(36.340223, 13.176111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 11.027233, 0.0), Point(35.431692, 9.152233, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, 9.152233, 0.0), Point(34.52316, 11.301111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 9.152233, 0.0), Point(36.340223, 11.301111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 9.152233, 0.0), Point(35.431692, 7.277233, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, 7.277233, 0.0), Point(34.52316, 9.426111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 7.277233, 0.0), Point(36.340223, 9.426111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 7.277233, 0.0), Point(35.431692, 5.402233, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, 5.402233, 0.0), Point(34.52316, 7.551111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 5.402233, 0.0), Point(36.340223, 7.551111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 5.402233, 0.0), Point(35.431692, 3.527233, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, 3.527233, 0.0), Point(34.52316, 5.676111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 3.527233, 0.0), Point(36.340223, 5.676111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 3.527233, 0.0), Point(35.431692, 1.652233, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, 1.652233, 0.0), Point(34.52316, 3.801111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 1.652233, 0.0), Point(36.340223, 3.801111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 1.652233, 0.0), Point(35.431692, -0.222767, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, -0.222767, 0.0), Point(34.52316, 1.926111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, -0.222767, 0.0), Point(36.340223, 1.926111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(T_6, E_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(W_6, E_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(Z_6, E_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(A_7, E_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(B_7, E_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(C_7, E_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Polyline([C_1, U_1, Q_1, Z_1, F_12, C_2, R_1, F_2, D_1]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(7.0, 12.561465, 0.0), Point(7.0, 11.261465, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.0, 11.261465, 0.0), Point(6.091469, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 11.261465, 0.0), Point(7.908531, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.0, 12.561465, 0.0), Point(8.0, 11.261465, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.0, 11.261465, 0.0), Point(7.091469, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.0, 11.261465, 0.0), Point(8.908531, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 12.561465, 0.0), Point(9.0, 11.261465, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.0, 11.261465, 0.0), Point(8.091469, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 11.261465, 0.0), Point(9.908531, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.0, 12.561465, 0.0), Point(10.0, 11.261465, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.0, 11.261465, 0.0), Point(9.091469, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.0, 11.261465, 0.0), Point(10.908531, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 12.561465, 0.0), Point(11.0, 11.261465, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.0, 11.261465, 0.0), Point(10.091469, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 11.261465, 0.0), Point(11.908531, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.0, 12.561465, 0.0), Point(12.0, 11.261465, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.0, 11.261465, 0.0), Point(11.091469, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.0, 11.261465, 0.0), Point(12.908531, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 12.561465, 0.0), Point(13.0, 11.261465, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.0, 11.261465, 0.0), Point(12.091469, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 11.261465, 0.0), Point(13.908531, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.0, 12.561465, 0.0), Point(14.0, 11.261465, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.0, 11.261465, 0.0), Point(13.091469, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.0, 11.261465, 0.0), Point(14.908531, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.0, 12.561465, 0.0), Point(15.0, 11.261465, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.0, 11.261465, 0.0), Point(14.091469, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.0, 11.261465, 0.0), Point(15.908531, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.0, 12.561465, 0.0), Point(16.0, 11.261465, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.0, 11.261465, 0.0), Point(15.091469, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.0, 11.261465, 0.0), Point(16.908531, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.0, 12.561465, 0.0), Point(17.0, 11.261465, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(17.0, 11.261465, 0.0), Point(16.091469, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.0, 11.261465, 0.0), Point(17.908531, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.0, 12.561465, 0.0), Point(18.0, 11.261465, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(18.0, 11.261465, 0.0), Point(17.091469, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.0, 11.261465, 0.0), Point(18.908531, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.0, 12.561465, 0.0), Point(19.0, 11.261465, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.0, 11.261465, 0.0), Point(18.091469, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.0, 11.261465, 0.0), Point(19.908531, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(20.0, 12.561465, 0.0), Point(20.0, 11.261465, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(20.0, 11.261465, 0.0), Point(19.091469, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(20.0, 11.261465, 0.0), Point(20.908531, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 12.561465, 0.0), Point(21.0, 11.261465, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 11.261465, 0.0), Point(20.091469, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 11.261465, 0.0), Point(21.908531, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(22.0, 12.561465, 0.0), Point(22.0, 11.261465, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(22.0, 11.261465, 0.0), Point(21.091469, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(22.0, 11.261465, 0.0), Point(22.908531, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.0, 12.561465, 0.0), Point(6.0, 11.261465, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(6.0, 11.261465, 0.0), Point(5.091469, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.0, 11.261465, 0.0), Point(6.908531, 13.410343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(S_8, N_1), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(C, W_7), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(T, Z_7), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(E, A_8), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(U, C_8), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(G, D_8), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(V, F_8), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(I, E_8), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(W, G_8), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(K, H_8), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Z, I_8), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(M, J_8), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(A_1, K_8), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(O, L_8), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(B_1, M_8), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Q_6, P_2), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(35.431692, 14.777233, 0.0), Point(35.431692, -0.222767, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, -0.222767, 0.0), Point(34.52316, 1.926111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, -0.222767, 0.0), Point(36.340223, 1.926111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 14.777233, 0.0), Point(35.431692, 12.902233, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, 12.902233, 0.0), Point(34.52316, 15.051111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 12.902233, 0.0), Point(36.340223, 15.051111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 12.902233, 0.0), Point(35.431692, 9.152233, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, 9.152233, 0.0), Point(34.52316, 11.301111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 9.152233, 0.0), Point(36.340223, 11.301111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 9.152233, 0.0), Point(35.431692, 5.402233, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, 5.402233, 0.0), Point(34.52316, 7.551111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 5.402233, 0.0), Point(36.340223, 7.551111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 5.402233, 0.0), Point(35.431692, 1.652233, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, 1.652233, 0.0), Point(34.52316, 3.801111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 1.652233, 0.0), Point(36.340223, 3.801111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, 1.652233, 0.0), Point(35.431692, -0.222767, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.431692, -0.222767, 0.0), Point(34.52316, 1.926111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.431692, -0.222767, 0.0), Point(36.340223, 1.926111, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(T_6, E_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_6, E_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_7, E_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_7, E_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(A_10, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(D_10, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(G_10, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(Line(D_1, E_10), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(I_1, C_10), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(F_10, C_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Z_9, D_10), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(A_10, G_10), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(N_10, C_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(O_10, T_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(M_10, S_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(L_10, M_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(K_10, T_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(J_10, N_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(I_10, U_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(P_10, V_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Q_10, O_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(R_10, W_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(S_10, P_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(V_10, Z_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(T_10, E_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(U_10, A_4), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(W_10, pointcolor=Color(1.0, 0.498, 0.0), pointsize=4.5)
S.add(Z_10, pointcolor=Color(1.0, 0.498, 0.0), pointsize=4.5)
S.add(A_11, pointcolor=Color(1.0, 0.498, 0.0), pointsize=4.5)
S.add(B_11, pointcolor=Color(1.0, 0.498, 0.0), pointsize=4.5)
S.add(C_11, pointcolor=Color(1.0, 0.498, 0.0), pointsize=4.5)
S.add(D_11, pointcolor=Color(1.0, 0.498, 0.0), pointsize=4.5)
S.add(E_11, pointcolor=Color(1.0, 0.498, 0.0), pointsize=4.5)
S.add(F_11, pointcolor=Color(1.0, 0.498, 0.0), pointsize=4.5)
S.add(G_11, pointcolor=Color(1.0, 0.498, 0.0), pointsize=4.5)
S.add(H_11, pointcolor=Color(1.0, 0.498, 0.0), pointsize=4.5)
S.add(I_11, pointcolor=Color(1.0, 0.498, 0.0), pointsize=4.5)
S.add(J_11, pointcolor=Color(1.0, 0.498, 0.0), pointsize=4.5)
S.add(K_11, pointcolor=Color(1.0, 0.498, 0.0), pointsize=4.5)
S.add(L_11, pointcolor=Color(1.0, 0.498, 0.0), pointsize=4.5)
S.add(Line(I_1, B_10), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(F_3, E_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Q, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(H_10, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(M_11, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(Line(Q, H_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(H_10, M_11), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(N_11, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(O_11, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(P_11, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(Line(N_11, O_11), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(O_11, P_11), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(P_1, P_11), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(R_1, O_11), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(O_1, N_11), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(6.0, 6.385077, 0.0), Point(5.021159, 7.240571, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.021159, 7.240571, 0.0), Point(7.237047, 6.510536, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.021159, 7.240571, 0.0), Point(6.041287, 5.14237, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(22.0, 10.105045, 0.0), Point(22.777889, 11.146625, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(22.777889, 11.146625, 0.0), Point(22.219981, 8.881266, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(22.777889, 11.146625, 0.0), Point(20.764122, 9.968553, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)

if __name__ == "__main__":
    viewer.show()
