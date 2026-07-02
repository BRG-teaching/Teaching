"""
COMPAS translation of GeoGebra applet: Burgo Factory, P. L. Nervi
Source: https://block.arch.ethz.ch/eq/drawing/view/51
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
P_1 = Point(8.5, 10.982348, 0.0)  # P_1
P_2 = Point(8.5, 7.133909, 0.0)  # P_2
M_7 = Point(8.5, 8.0, 0.0)  # M_7
H_1 = Point(5.0, 10.982348, 0.0)  # H_1
H_2 = Point(5.0, 7.133909, 0.0)  # H_2
O_8 = Point(5.0, 10.0, 0.0)  # O_8
frameBL = Point(2.0, 2.0, 0.0)  # frameBL
fBR = Point(22.0, 2.0, 0.0)  # fBR
frameTR = Point(22.0, 12.0, 0.0)  # frameTR
fTL = Point(2.0, 12.0, 0.0)  # fTL
U = Point(3.25, 10.0, 0.0)  # U
V = Point(3.25, 8.549508, 0.0)  # V
W = Point(3.25, 9.1, 0.0)  # W
A = Point(8.5, 9.758488, 0.0)  # A
B = Point(8.5, 8.549508, 0.0)  # B
E_3 = Point(3.691952, 6.646517, 0.0)  # E_3
Z_3 = Point(8.5, 9.17, 0.0)  # Z_3
D = Point(5.0, 10.153137, 0.0)  # D
A_4 = Point(8.5, 8.186863, 0.0)  # A_4
E = Point(12.0, 10.153137, 0.0)  # E
B_4 = Point(7.251986, 4.646517, 0.0)  # B_4
W_3 = Point(3.691952, 2.646517, 0.0)  # W_3
F_3 = Point(3.691952, 6.521517, 0.0)  # F_3
G_3 = Point(3.691952, 6.271517, 0.0)  # G_3
H_3 = Point(3.691952, 6.021517, 0.0)  # H_3
I_3 = Point(3.691952, 5.771517, 0.0)  # I_3
J_3 = Point(3.691952, 5.521517, 0.0)  # J_3
K_3 = Point(3.691952, 5.271517, 0.0)  # K_3
L_3 = Point(3.691952, 5.021517, 0.0)  # L_3
M_3 = Point(3.691952, 4.771517, 0.0)  # M_3
O_3 = Point(3.691952, 4.521517, 0.0)  # O_3
P_3 = Point(3.691952, 4.271517, 0.0)  # P_3
Q_3 = Point(3.691952, 4.021517, 0.0)  # Q_3
R_3 = Point(3.691952, 3.771517, 0.0)  # R_3
S_3 = Point(3.691952, 3.521517, 0.0)  # S_3
T_3 = Point(3.691952, 3.271517, 0.0)  # T_3
U_3 = Point(3.691952, 3.021517, 0.0)  # U_3
V_3 = Point(3.691952, 2.771517, 0.0)  # V_3
C_4 = Point(5.4375, 9.922714, 0.0)  # C_4
I_4 = Point(5.875, 9.723014, 0.0)  # I_4
H_4 = Point(6.3125, 9.554038, 0.0)  # H_4
G_4 = Point(6.75, 9.415784, 0.0)  # G_4
F_4 = Point(7.1875, 9.308254, 0.0)  # F_4
E_4 = Point(7.625, 9.231446, 0.0)  # E_4
D_4 = Point(8.0625, 9.185362, 0.0)  # D_4
J_4 = Point(8.9375, 9.185362, 0.0)  # J_4
K_4 = Point(9.375, 9.231446, 0.0)  # K_4
L_4 = Point(9.8125, 9.308254, 0.0)  # L_4
M_4 = Point(10.25, 9.415784, 0.0)  # M_4
N_4 = Point(10.6875, 9.554038, 0.0)  # N_4
O_4 = Point(11.125, 9.723014, 0.0)  # O_4
P_4 = Point(11.5625, 9.922714, 0.0)  # P_4
Q_4 = Point(10.762753, 5.62011, 0.0)  # Q_4
Z_4 = Point(9.931902, 4.62011, 0.0)  # Z_4
R_4 = Point(10.762753, 5.49511, 0.0)  # R_4
S_4 = Point(10.762753, 5.24511, 0.0)  # S_4
T_4 = Point(10.762753, 4.99511, 0.0)  # T_4
U_4 = Point(10.762753, 4.74511, 0.0)  # U_4
A_5 = Point(3.6875, 9.165821, 0.0)  # A_5
B_5 = Point(4.125, 9.363284, 0.0)  # B_5
C_5 = Point(4.5625, 9.692389, 0.0)  # C_5
D_5 = Point(12.4375, 9.692389, 0.0)  # D_5
E_5 = Point(12.875, 9.363284, 0.0)  # E_5
F_5 = Point(13.3125, 9.165821, 0.0)  # F_5
W_p = Point(13.75, 9.1, 0.0)  # W'
H_5 = Point(15.457613, 10.524053, 0.0)  # H_5
Q_5 = Point(5.087588, 10.186108, 0.0)  # Q_5
S_5 = Point(5.088438, 9.075863, 0.0)  # S_5
K_5 = Point(5.741817, 8.182519, 0.0)  # K_5
P_5 = Point(5.841817, 8.182519, 0.0)  # P_5
T_5 = Point(11.912412, 10.186108, 0.0)  # T_5
D_p = Point(12.0, 10.153137, 0.0)  # D'
U_5 = Point(11.911562, 9.075863, 0.0)  # U_5
V_5 = Point(11.258183, 8.182519, 0.0)  # V_5
W_5 = Point(11.158183, 8.182519, 0.0)  # W_5
B_1 = Point(3.25, 10.982348, 0.0)  # B_1
C_1 = Point(3.25, 7.133909, 0.0)  # C_1
D_1 = Point(3.6875, 10.982348, 0.0)  # D_1
E_2 = Point(3.6875, 7.133909, 0.0)  # E_2
E_1 = Point(4.125, 10.982348, 0.0)  # E_1
F_2 = Point(4.125, 7.133909, 0.0)  # F_2
G_1 = Point(4.5625, 10.982348, 0.0)  # G_1
G_2 = Point(4.5625, 7.133909, 0.0)  # G_2
I_1 = Point(5.4375, 10.982348, 0.0)  # I_1
I_2 = Point(5.4375, 7.133909, 0.0)  # I_2
J_1 = Point(5.875, 10.982348, 0.0)  # J_1
J_2 = Point(5.875, 7.133909, 0.0)  # J_2
K_1 = Point(6.3125, 10.982348, 0.0)  # K_1
K_2 = Point(6.3125, 7.133909, 0.0)  # K_2
L_2 = Point(6.75, 7.133909, 0.0)  # L_2
L_1 = Point(6.75, 10.982348, 0.0)  # L_1
M_1 = Point(7.1875, 10.982348, 0.0)  # M_1
M_2 = Point(7.1875, 7.133909, 0.0)  # M_2
N_1 = Point(7.625, 10.982348, 0.0)  # N_1
N_2 = Point(7.625, 7.133909, 0.0)  # N_2
O_1 = Point(8.0625, 10.982348, 0.0)  # O_1
O_2 = Point(8.0625, 7.133909, 0.0)  # O_2
Q_1 = Point(8.9375, 10.982348, 0.0)  # Q_1
Q_2 = Point(8.9375, 7.133909, 0.0)  # Q_2
R_1 = Point(9.375, 10.982348, 0.0)  # R_1
R_2 = Point(9.375, 7.133909, 0.0)  # R_2
S_1 = Point(9.8125, 10.982348, 0.0)  # S_1
S_2 = Point(9.8125, 7.133909, 0.0)  # S_2
T_1 = Point(10.25, 10.982348, 0.0)  # T_1
T_2 = Point(10.25, 7.133909, 0.0)  # T_2
U_1 = Point(10.6875, 10.982348, 0.0)  # U_1
U_2 = Point(10.6875, 7.133909, 0.0)  # U_2
V_1 = Point(11.125, 10.982348, 0.0)  # V_1
V_2 = Point(11.125, 7.133909, 0.0)  # V_2
W_1 = Point(11.5625, 10.982348, 0.0)  # W_1
W_2 = Point(11.5625, 7.133909, 0.0)  # W_2
Z_1 = Point(12.0, 10.982348, 0.0)  # Z_1
Z_2 = Point(12.0, 7.133909, 0.0)  # Z_2
A_2 = Point(12.4375, 10.982348, 0.0)  # A_2
A_3 = Point(12.4375, 7.133909, 0.0)  # A_3
B_2 = Point(12.875, 10.982348, 0.0)  # B_2
B_3 = Point(12.875, 7.133909, 0.0)  # B_3
C_2 = Point(13.3125, 10.982348, 0.0)  # C_2
C_3 = Point(13.3125, 7.133909, 0.0)  # C_3
D_2 = Point(13.75, 10.982348, 0.0)  # D_2
D_3 = Point(13.75, 7.133909, 0.0)  # D_3
G_5 = Point(3.6875, 9.1, 0.0)  # G_5
Z_5 = Point(4.125, 9.1, 0.0)  # Z_5
A_6 = Point(4.5625, 9.1, 0.0)  # A_6
B_6 = Point(5.0, 9.1, 0.0)  # B_6
C_6 = Point(5.4375, 9.1, 0.0)  # C_6
D_6 = Point(5.875, 9.1, 0.0)  # D_6
E_6 = Point(6.3125, 9.1, 0.0)  # E_6
F_6 = Point(6.75, 9.1, 0.0)  # F_6
G_6 = Point(7.1875, 9.1, 0.0)  # G_6
H_6 = Point(7.625, 9.1, 0.0)  # H_6
I_6 = Point(8.0625, 9.1, 0.0)  # I_6
J_6 = Point(8.5, 9.1, 0.0)  # J_6
K_6 = Point(8.9375, 9.1, 0.0)  # K_6
L_6 = Point(9.375, 9.1, 0.0)  # L_6
M_6 = Point(9.8125, 9.1, 0.0)  # M_6
N_6 = Point(10.25, 9.1, 0.0)  # N_6
O_6 = Point(10.6875, 9.1, 0.0)  # O_6
P_6 = Point(11.125, 9.1, 0.0)  # P_6
Q_6 = Point(11.5625, 9.1, 0.0)  # Q_6
R_6 = Point(12.0, 9.1, 0.0)  # R_6
S_6 = Point(12.4375, 9.1, 0.0)  # S_6
T_6 = Point(12.875, 9.1, 0.0)  # T_6
U_6 = Point(13.3125, 9.1, 0.0)  # U_6
G_7 = Point(5.0, 8.9625, 0.0)  # G_7
H_7 = Point(12.0, 8.9625, 0.0)  # H_7
E_7 = Point(3.25, 8.9625, 0.0)  # E_7
F_7 = Point(13.75, 8.9625, 0.0)  # F_7
K_7 = Point(4.78125, 8.9625, 0.0)  # K_7
I_7 = Point(4.78125, 9.1, 0.0)  # I_7
J_7 = Point(5.21875, 9.1, 0.0)  # J_7
L_7 = Point(5.21875, 8.9625, 0.0)  # L_7
N_3 = Point(3.691952, 4.646517, 0.0)  # N_3
B_8 = Point(9.111594, 4.62011, 0.0)  # B_8
V_4 = Point(10.762753, 4.62011, 0.0)  # V_4
C_8 = Point(2.689521, 9.1, 0.0)  # C_8
F_8 = Point(11.51626, 5.62011, 0.0)  # F_8
J_8 = Point(12.269766, 5.49511, 0.0)  # J_8
I_8 = Point(13.100617, 4.62011, 0.0)  # I_8
K_8 = Point(12.269766, 5.24511, 0.0)  # K_8
M_8 = Point(12.269766, 4.99511, 0.0)  # M_8
N_8 = Point(12.269766, 4.74511, 0.0)  # N_8
L_8 = Point(12.269766, 5.12011, 0.0)  # L_8
A_8 = Point(9.538461, 4.38334, 0.0)  # A_8
W_4 = Point(10.762753, 5.12011, 0.0)  # W_4
S_8 = Point(11.51626, 5.12011, 0.0)  # S_8
T_8 = Point(11.51626, 4.62011, 0.0)  # T_8

# --- geometry ---
S.add(Line(P_1, P_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(M_7, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(H_1, H_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(O_8, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Polyline([frameBL, fBR, frameTR, fTL, frameBL]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U, V), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(W, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(A, B), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(E_3, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Z_3, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(D, A_4), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(A_4, E), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(E_3, B_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_4, W_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_3, B_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(G_3, B_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_3, B_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(I_3, B_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(J_3, B_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_3, B_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(L_3, B_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_3, B_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(O_3, B_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_3, B_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Q_3, B_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(R_3, B_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(S_3, B_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(T_3, B_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(U_3, B_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(V_3, B_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(D, C_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_4, I_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_4, H_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_4, G_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_4, F_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_4, E_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_4, D_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_4, Z_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_3, J_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_4, K_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_4, L_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_4, M_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_4, N_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_4, O_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_4, P_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_4, E), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Q_4, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(W, D), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_4, Q_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_4, R_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Z_4, S_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Z_4, T_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Z_4, U_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(W, A_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_5, B_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_5, C_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_5, D), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E, D_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_5, E_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_5, F_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_5, W_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(H_5, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(15.457613, 10.524053, 0.0), Point(19.017647, 8.524053, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.017647, 8.524053, 0.0), Point(18.095446, 8.627635, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(19.017647, 8.524053, 0.0), Point(18.449449, 9.257766, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(19.017647, 8.524053, 0.0), Point(19.017647, 8.274053, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.017647, 8.274053, 0.0), Point(18.656267, 9.128798, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(19.017647, 8.274053, 0.0), Point(19.379028, 9.128798, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(19.017647, 8.274053, 0.0), Point(19.017647, 4.274053, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.017647, 4.274053, 0.0), Point(18.656267, 5.128798, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(19.017647, 4.274053, 0.0), Point(19.379028, 5.128798, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(19.017647, 4.274053, 0.0), Point(18.186796, 3.274053, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(18.186796, 3.274053, 0.0), Point(18.455068, 4.16243, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(18.186796, 3.274053, 0.0), Point(19.010986, 3.700545, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(18.186796, 3.274053, 0.0), Point(15.457613, 10.524053, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.457613, 10.524053, 0.0), Point(16.096954, 9.851425, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(15.457613, 10.524053, 0.0), Point(15.420533, 9.596794, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Polygon([Q_5, D, S_5, K_5, P_5]), linecolor=Color(0.0, 0.0, 0.0), facecolor=Color(0.0, 0.0, 0.0), linewidth=1.2, opacity=0.15)
S.add(Polygon([T_5, D_p, U_5, V_5, W_5]), linecolor=Color(0.0, 0.0, 0.0), facecolor=Color(0.0, 0.0, 0.0), linewidth=1.2, opacity=0.15)
S.add(Line(B_1, C_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_1, E_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_1, F_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_1, G_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_1, I_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_1, J_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_1, K_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_2, L_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_1, M_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_1, N_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_1, O_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_1, Q_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_1, R_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_1, S_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_1, T_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_1, U_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V_1, V_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W_1, W_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_1, Z_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_2, A_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_2, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_2, C_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_2, D_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_5, A_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_5, B_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_6, C_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_6, D), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_6, C_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_6, I_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_6, H_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_6, G_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_6, F_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_6, E_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_6, D_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_6, Z_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_6, J_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_6, K_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_6, L_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_6, M_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_6, N_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_6, O_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_6, P_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_6, E), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_6, D_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_6, E_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_6, F_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W, W_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(3.691952, 6.646517, 0.0), Point(3.691952, 2.646517, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.691952, 2.646517, 0.0), Point(3.330572, 3.501262, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(3.691952, 2.646517, 0.0), Point(4.053332, 3.501262, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(10.762753, 5.62011, 0.0), Point(10.762753, 4.62011, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.762753, 4.62011, 0.0), Point(10.401373, 5.474855, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(10.762753, 4.62011, 0.0), Point(11.124134, 5.474855, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 10.153137, 0.0), Point(4.520489, 10.422523, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.520489, 10.422523, 0.0), Point(5.44269, 10.31894, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(4.520489, 10.422523, 0.0), Point(5.088687, 9.68881, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 10.153137, 0.0), Point(5.479511, 9.883751, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.479511, 9.883751, 0.0), Point(4.55731, 9.987333, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(5.479511, 9.883751, 0.0), Point(4.911313, 10.617464, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 10.153137, 0.0), Point(5.351481, 10.576174, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.351481, 10.576174, 0.0), Point(5.08321, 9.687797, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(5.351481, 10.576174, 0.0), Point(4.527292, 10.149682, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 10.153137, 0.0), Point(4.648519, 9.730099, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.648519, 9.730099, 0.0), Point(4.91679, 10.618476, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(4.648519, 9.730099, 0.0), Point(5.472708, 10.156591, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(8.5, 8.0, 0.0), Point(8.5, 7.45, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.5, 7.45, 0.0), Point(8.13862, 8.304745, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(8.5, 7.45, 0.0), Point(8.86138, 8.304745, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(12.0, 10.153137, 0.0), Point(12.479511, 10.422523, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.479511, 10.422523, 0.0), Point(11.911313, 9.68881, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(12.479511, 10.422523, 0.0), Point(11.55731, 10.31894, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Polygon([G_7, B_6, R_6, H_7]), linecolor=Color(0.0, 0.3922, 0.0), facecolor=Color(0.0, 0.3922, 0.0), linewidth=1.2, opacity=0.15)
S.add(Line(Point(4.125, 8.0, 0.0), Point(4.125, 7.45, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.125, 7.45, 0.0), Point(3.76362, 8.304745, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(4.125, 7.45, 0.0), Point(4.48638, 8.304745, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Polygon([E_7, W, B_6, G_7]), linecolor=Color(0.0, 0.3922, 0.0), facecolor=Color(0.0, 0.3922, 0.0), linewidth=1.2, opacity=0.15)
S.add(Polygon([H_7, R_6, W_p, F_7]), linecolor=Color(0.0, 0.3922, 0.0), facecolor=Color(0.0, 0.3922, 0.0), linewidth=1.2, opacity=0.15)
S.add(Line(Point(3.691952, 2.646517, 0.0), Point(7.251986, 4.646517, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.251986, 4.646517, 0.0), Point(6.683788, 3.912804, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(7.251986, 4.646517, 0.0), Point(6.329785, 4.542935, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(7.251986, 4.646517, 0.0), Point(3.691952, 6.646517, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.691952, 6.646517, 0.0), Point(4.614153, 6.542935, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(3.691952, 6.646517, 0.0), Point(4.260151, 5.912804, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(10.762753, 4.62011, 0.0), Point(9.931902, 4.62011, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.931902, 4.62011, 0.0), Point(10.786647, 4.98149, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(9.931902, 4.62011, 0.0), Point(10.786647, 4.25873, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(9.931902, 4.62011, 0.0), Point(10.762753, 5.62011, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.762753, 5.62011, 0.0), Point(10.494482, 4.731733, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(10.762753, 5.62011, 0.0), Point(9.938564, 5.193618, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Polygon([K_7, I_7, J_7, L_7]), linecolor=Color(0.0, 0.3922, 0.0), facecolor=Color(0.0, 0.3922, 0.0), linewidth=1.2, opacity=0.2)
S.add(Line(Point(5.935585, 7.667782, 0.0), Point(5.741817, 8.182519, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.741817, 8.182519, 0.0), Point(6.381158, 7.509891, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(5.741817, 8.182519, 0.0), Point(5.704737, 7.25526, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(D, K_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(11.064415, 7.667782, 0.0), Point(11.258183, 8.182519, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.258183, 8.182519, 0.0), Point(11.295263, 7.25526, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(11.258183, 8.182519, 0.0), Point(10.618842, 7.509891, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Polygon([H_7, R_6, W_p, F_7]), linecolor=Color(0.0, 0.3922, 0.0), facecolor=Color(0.0, 0.3922, 0.0), linewidth=1.2, opacity=0.15)
S.add(Line(B_4, N_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(12.0, 10.153137, 0.0), Point(11.648519, 10.576174, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.648519, 10.576174, 0.0), Point(12.472708, 10.149682, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(11.648519, 10.576174, 0.0), Point(11.91679, 9.687797, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(B_8, V_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_8, B_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(12.875, 8.0, 0.0), Point(12.875, 7.45, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.875, 7.45, 0.0), Point(12.51362, 8.304745, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(12.875, 7.45, 0.0), Point(13.23638, 8.304745, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(F_8, pointcolor=Color(0.502, 0.502, 0.502), pointsize=4.5)
S.add(Line(Point(12.269766, 5.62011, 0.0), Point(12.269766, 4.62011, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.269766, 4.62011, 0.0), Point(11.908386, 5.474855, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(12.269766, 4.62011, 0.0), Point(12.631146, 5.474855, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(12.269766, 4.62011, 0.0), Point(13.100617, 4.62011, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.100617, 4.62011, 0.0), Point(12.245873, 4.25873, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(13.100617, 4.62011, 0.0), Point(12.245873, 4.98149, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(13.100617, 4.62011, 0.0), Point(12.269766, 5.62011, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.269766, 5.62011, 0.0), Point(13.093955, 5.193618, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(12.269766, 5.62011, 0.0), Point(12.538037, 4.731733, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(J_8, I_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_8, I_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_8, I_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N_8, I_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(L_8, I_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_8, W_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(5.0, 10.0, 0.0), Point(5.0, 9.45, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.0, 9.45, 0.0), Point(4.63862, 10.304745, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 9.45, 0.0), Point(5.36138, 10.304745, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(S_8, pointcolor=Color(0.502, 0.502, 0.502), pointsize=4.5)
S.add(T_8, pointcolor=Color(0.502, 0.502, 0.502), pointsize=4.5)
S.add(Line(F_8, S_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(S_8, T_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Q_4, F_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(W_4, S_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(V_4, T_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(3.25, 9.1, 0.0), Point(2.689521, 9.1, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(2.689521, 9.1, 0.0), Point(3.544265, 9.46138, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(2.689521, 9.1, 0.0), Point(3.544265, 8.73862, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(13.75, 9.1, 0.0), Point(14.310479, 9.1, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.310479, 9.1, 0.0), Point(13.455735, 8.73862, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(14.310479, 9.1, 0.0), Point(13.455735, 9.46138, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 9.45, 0.0), Point(5.0, 8.9, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.0, 8.9, 0.0), Point(4.63862, 9.754745, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 8.9, 0.0), Point(5.36138, 9.754745, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)

if __name__ == "__main__":
    viewer.show()
