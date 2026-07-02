"""
COMPAS translation of GeoGebra applet: Cable For Non-uniformly Distributed Load
Source: https://block.arch.ethz.ch/eq/drawing/view/15
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
S_2 = Point(93.806364, 62.304262, 0.0)  # S_2
A = Point(10.0, 55.14, 0.0)  # A
B = Point(69.990931, 55.14, 0.0)  # B
Q_6 = Point(21.2483, 70.0, 0.0)  # Q_6
U_7 = Point(21.2483, 6.576962, 0.0)  # U_7
M_7 = Point(69.990931, 70.0, 0.0)  # M_7
Q_8 = Point(69.990931, 6.576962, 0.0)  # Q_8
V_1 = Point(10.0, 66.706582, 0.0)  # V_1
W_1 = Point(34.996221, 66.706582, 0.0)  # W_1
T_2 = Point(34.996221, 51.38652, 0.0)  # T_2
U_2 = Point(34.996221, 25.200582, 0.0)  # U_2
V_3 = Point(34.996221, 35.182646, 0.0)  # V_3
W_8 = Point(22.498111, 28.055019, 0.0)  # W_8
C_9 = Point(105.0286, 37.984262, 0.0)  # C_9
Z_8 = Point(52.493576, 21.212497, 0.0)  # Z_8
D_9 = Point(98.716092, 27.664262, 0.0)  # D_9
E_9 = Point(109.938329, 34.064262, 0.0)  # E_9
H_3 = Point(93.806364, 30.624262, 0.0)  # H_3
G_3 = Point(93.806364, 31.584262, 0.0)  # G_3
F_3 = Point(93.806364, 34.656262, 0.0)  # F_3
E_3 = Point(93.806364, 37.728262, 0.0)  # E_3
D_3 = Point(93.806364, 40.800262, 0.0)  # D_3
C_3 = Point(93.806364, 43.872262, 0.0)  # C_3
B_3 = Point(93.806364, 46.944262, 0.0)  # B_3
A_3 = Point(93.806364, 50.016262, 0.0)  # A_3
Z_2 = Point(93.806364, 53.088262, 0.0)  # Z_2
W_2 = Point(93.806364, 56.160262, 0.0)  # W_2
V_2 = Point(93.806364, 59.232262, 0.0)  # V_2
I_3 = Point(93.806364, 29.664262, 0.0)  # I_3
O_3 = Point(93.806364, 23.904262, 0.0)  # O_3
M_3 = Point(93.806364, 25.824262, 0.0)  # M_3
N_3 = Point(93.806364, 24.864262, 0.0)  # N_3
L_3 = Point(93.806364, 26.784262, 0.0)  # L_3
K_3 = Point(93.806364, 27.744262, 0.0)  # K_3
J_3 = Point(93.806364, 28.704262, 0.0)  # J_3
U_3 = Point(93.806364, 18.144262, 0.0)  # U_3
T_3 = Point(93.806364, 19.104262, 0.0)  # T_3
S_3 = Point(93.806364, 20.064262, 0.0)  # S_3
R_3 = Point(93.806364, 21.024262, 0.0)  # R_3
Q_3 = Point(93.806364, 21.984262, 0.0)  # Q_3
P_3 = Point(93.806364, 22.944262, 0.0)  # P_3
J_5 = Point(11.249811, 52.952129, 0.0)  # J_5
K_5 = Point(13.749433, 49.052387, 0.0)  # K_5
L_5 = Point(16.249055, 45.628647, 0.0)  # L_5
M_5 = Point(18.748677, 42.680909, 0.0)  # M_5
N_5 = Point(21.2483, 40.209172, 0.0)  # N_5
O_5 = Point(23.747922, 38.213436, 0.0)  # O_5
P_5 = Point(26.247544, 36.693702, 0.0)  # P_5
Q_5 = Point(28.747166, 35.64997, 0.0)  # Q_5
R_5 = Point(31.246788, 35.082239, 0.0)  # R_5
S_5 = Point(33.74641, 34.990509, 0.0)  # S_5
T_5 = Point(36.246032, 35.374782, 0.0)  # T_5
U_5 = Point(38.745654, 35.907804, 0.0)  # U_5
V_5 = Point(41.245277, 36.589577, 0.0)  # V_5
W_5 = Point(43.744899, 37.4201, 0.0)  # W_5
Z_5 = Point(46.244521, 38.399374, 0.0)  # Z_5
A_6 = Point(48.744143, 39.527399, 0.0)  # A_6
B_6 = Point(51.243765, 40.804174, 0.0)  # B_6
C_6 = Point(53.743387, 42.229699, 0.0)  # C_6
D_6 = Point(56.243009, 43.803975, 0.0)  # D_6
E_6 = Point(58.742631, 45.527001, 0.0)  # E_6
F_6 = Point(61.242254, 47.398778, 0.0)  # F_6
G_6 = Point(63.741876, 49.419305, 0.0)  # G_6
H_6 = Point(66.241498, 51.588583, 0.0)  # H_6
I_6 = Point(68.74112, 53.906611, 0.0)  # I_6
L_6 = Point(10.0, 70.0, 0.0)  # L_6
P_7 = Point(10.0, 6.576962, 0.0)  # P_7
M_6 = Point(11.249811, 70.0, 0.0)  # M_6
Q_7 = Point(11.249811, 6.576962, 0.0)  # Q_7
N_6 = Point(13.749433, 70.0, 0.0)  # N_6
R_7 = Point(13.749433, 6.576962, 0.0)  # R_7
O_6 = Point(16.249055, 70.0, 0.0)  # O_6
S_7 = Point(16.249055, 6.576962, 0.0)  # S_7
P_6 = Point(18.748677, 70.0, 0.0)  # P_6
T_7 = Point(18.748677, 6.576962, 0.0)  # T_7
R_6 = Point(23.747922, 70.0, 0.0)  # R_6
V_7 = Point(23.747922, 6.576962, 0.0)  # V_7
S_6 = Point(26.247544, 70.0, 0.0)  # S_6
W_7 = Point(26.247544, 6.576962, 0.0)  # W_7
T_6 = Point(28.747166, 70.0, 0.0)  # T_6
Z_7 = Point(28.747166, 6.576962, 0.0)  # Z_7
U_6 = Point(31.246788, 70.0, 0.0)  # U_6
A_8 = Point(31.246788, 6.576962, 0.0)  # A_8
V_6 = Point(33.74641, 70.0, 0.0)  # V_6
B_8 = Point(33.74641, 6.576962, 0.0)  # B_8
W_6 = Point(36.246032, 70.0, 0.0)  # W_6
C_8 = Point(36.246032, 6.576962, 0.0)  # C_8
Z_6 = Point(38.745654, 70.0, 0.0)  # Z_6
D_8 = Point(38.745654, 6.576962, 0.0)  # D_8
A_7 = Point(41.245277, 70.0, 0.0)  # A_7
E_8 = Point(41.245277, 6.576962, 0.0)  # E_8
B_7 = Point(43.744899, 70.0, 0.0)  # B_7
F_8 = Point(43.744899, 6.576962, 0.0)  # F_8
C_7 = Point(46.244521, 70.0, 0.0)  # C_7
G_8 = Point(46.244521, 6.576962, 0.0)  # G_8
D_7 = Point(48.744143, 70.0, 0.0)  # D_7
H_8 = Point(48.744143, 6.576962, 0.0)  # H_8
E_7 = Point(51.243765, 70.0, 0.0)  # E_7
I_8 = Point(51.243765, 6.576962, 0.0)  # I_8
F_7 = Point(53.743387, 70.0, 0.0)  # F_7
J_8 = Point(53.743387, 6.576962, 0.0)  # J_8
G_7 = Point(56.243009, 70.0, 0.0)  # G_7
K_8 = Point(56.243009, 6.576962, 0.0)  # K_8
H_7 = Point(58.742631, 70.0, 0.0)  # H_7
L_8 = Point(58.742631, 6.576962, 0.0)  # L_8
I_7 = Point(61.242254, 70.0, 0.0)  # I_7
M_8 = Point(61.242254, 6.576962, 0.0)  # M_8
J_7 = Point(63.741876, 70.0, 0.0)  # J_7
N_8 = Point(63.741876, 6.576962, 0.0)  # N_8
K_7 = Point(66.241498, 70.0, 0.0)  # K_7
O_8 = Point(66.241498, 6.576962, 0.0)  # O_8
L_7 = Point(68.74112, 70.0, 0.0)  # L_7
P_8 = Point(68.74112, 6.576962, 0.0)  # P_8
N_7 = Point(93.806364, 70.0, 0.0)  # N_7
O_7 = Point(93.806364, 6.576962, 0.0)  # O_7
A_9 = Point(93.806364, 31.584262, 0.0)  # A_9
W_3 = Point(22.498111, 70.0, 0.0)  # W_3
B_4 = Point(22.498111, 6.576962, 0.0)  # B_4
A_4 = Point(34.996221, 70.0, 0.0)  # A_4
C_4 = Point(34.996221, 6.576962, 0.0)  # C_4
Z_3 = Point(52.493576, 70.0, 0.0)  # Z_3
D_4 = Point(52.493576, 6.576962, 0.0)  # D_4
F_4 = Point(10.0, 61.640074, 0.0)  # F_4
G_5 = Point(69.990931, 61.640074, 0.0)  # G_5
frameBL = Point(1.435921, 4.431539, 0.0)  # frameBL
P_10 = Point(144.756695, 4.431539, 0.0)  # P_{10}
Q_10 = Point(1.435921, 76.091927, 0.0)  # Q_{10}
frameTR = Point(144.756695, 76.091927, 0.0)  # frameTR
B_11 = Point(31.627165, 70.0, 0.0)  # B_{11}
A_11 = Point(31.627165, 6.576962, 0.0)  # A_{11}
R_2 = Point(34.996221, 65.306582, 0.0)  # R_2
Q_2 = Point(10.0, 65.306582, 0.0)  # Q_2
I_5 = Point(10.0, 60.240074, 0.0)  # I_5
F_10 = Point(69.990931, 60.240074, 0.0)  # F_{10}
T_11 = Point(31.627165, 17.280311, 0.0)  # T_{11}
P_2 = Point(22.498111, 33.261285, 0.0)  # P_2
H_11 = Point(52.493576, 37.87255, 0.0)  # H_{11}
K_11 = Point(93.806364, 62.304262, 0.0)  # K_{11}
J_11 = Point(109.938329, 34.064262, 0.0)  # J_{11}
L_11 = Point(109.938329, 34.064262, 0.0)  # L_{11}
M_11 = Point(93.806364, 18.144262, 0.0)  # M_{11}

# --- geometry ---
S.add(S_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(A, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(B, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(Q_6, U_7), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(M_7, Q_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(V_1, W_1), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(T_2, U_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(V_3, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(W_8, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(C_9, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Z_8, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(Z_8, B), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(D_9, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(E_9, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(Line(S_2, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_3, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(G_3, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(F_3, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(E_3, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(D_3, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_3, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(B_3, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(A_3, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Z_2, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(W_2, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(V_2, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(I_3, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(O_3, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_3, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N_3, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(L_3, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_3, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(J_3, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(U_3, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_3, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(S_3, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(R_3, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Q_3, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_3, E_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Polyline([A, J_5, K_5, L_5, M_5, N_5, O_5, P_5, Q_5, R_5, S_5, T_5, U_5, V_5, W_5, Z_5, A_6, B_6, C_6, D_6, E_6, F_6, G_6, H_6, I_6, B]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_2, V_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V_2, W_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W_2, Z_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_2, A_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_3, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_3, C_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_3, D_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_3, E_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_3, F_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_3, G_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_3, H_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_3, I_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_3, J_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_3, K_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_3, L_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_3, M_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_3, N_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_3, O_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_3, P_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_3, Q_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_3, R_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_3, S_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_3, T_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_3, U_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_6, P_7), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(M_6, Q_7), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(N_6, R_7), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(O_6, S_7), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(P_6, T_7), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(R_6, V_7), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(S_6, W_7), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(T_6, Z_7), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(U_6, A_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(V_6, B_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(W_6, C_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Z_6, D_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(A_7, E_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(B_7, F_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(C_7, G_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(D_7, H_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(E_7, I_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(F_7, J_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(G_7, K_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(H_7, L_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(I_7, M_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(J_7, N_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(K_7, O_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(L_7, P_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(N_7, O_7), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(10.0, 55.14, 0.0), Point(7.916721, 58.786909, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.916721, 58.786909, 0.0), Point(13.265912, 54.705314, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.916721, 58.786909, 0.0), Point(8.715581, 52.10596, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(69.990931, 55.14, 0.0), Point(72.980354, 58.090144, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(72.980354, 58.090144, 0.0), Point(70.40973, 51.872013, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(72.980354, 58.090144, 0.0), Point(66.728769, 55.601984, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(A_9, C_9), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(C_9, E_9), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(W_8, B), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(W_3, B_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_4, C_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_3, D_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_4, G_5), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(52.493576, 54.91202, 0.0), Point(52.493576, 50.71202, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(52.493576, 50.71202, 0.0), Point(49.873359, 56.909416, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(52.493576, 50.71202, 0.0), Point(55.113793, 56.909416, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(frameBL, P_10), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([frameBL, Q_10, frameTR, P_10]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(31.627165, 56.31202, 0.0), Point(31.627165, 50.71202, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(31.627165, 50.71202, 0.0), Point(29.006948, 56.909416, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(31.627165, 50.71202, 0.0), Point(34.247383, 56.909416, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(B_11, A_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(10.0, 55.14, 0.0), Point(6.717815, 57.760546, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(6.717815, 57.760546, 0.0), Point(13.195768, 55.941374, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.717815, 57.760546, 0.0), Point(9.926054, 51.846117, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(98.716092, 27.664262, 0.0), Point(93.806364, 31.584262, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(93.806364, 31.584262, 0.0), Point(100.284317, 29.76509, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(93.806364, 31.584262, 0.0), Point(97.014604, 25.669834, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(93.806364, 62.304262, 0.0), Point(93.806364, 18.144262, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(93.806364, 18.144262, 0.0), Point(91.186147, 24.341658, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(93.806364, 18.144262, 0.0), Point(96.426581, 24.341658, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(W_1, R_2), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(V_1, Q_2), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Polygon([V_1, Q_2, R_2, W_1]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.2, opacity=0.15)
S.add(Line(F_4, I_5), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(G_5, F_10), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Polygon([F_4, I_5, F_10, G_5]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.2, opacity=0.15)
S.add(Line(T_11, B), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(U_3, E_9), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(E_9, S_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(A_9, E_9), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(P_2, H_11), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(109.938329, 34.064262, 0.0), Point(93.806364, 62.304262, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(93.806364, 62.304262, 0.0), Point(99.155555, 58.222667, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(93.806364, 62.304262, 0.0), Point(94.605225, 55.623313, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(93.806364, 18.144262, 0.0), Point(109.938329, 34.064262, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(109.938329, 34.064262, 0.0), Point(107.367704, 27.846131, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(109.938329, 34.064262, 0.0), Point(103.686743, 31.576101, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(S_2, K_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_9, J_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_9, L_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_3, M_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)

if __name__ == "__main__":
    viewer.show()
