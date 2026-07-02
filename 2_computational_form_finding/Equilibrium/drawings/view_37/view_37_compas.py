"""
COMPAS translation of GeoGebra applet: Pratt / Howe truss
Source: https://block.arch.ethz.ch/eq/drawing/view/37
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
A = Point(1.0, 9.0, 0.0)  # A
B = Point(3.0, 9.0, 0.0)  # B
D = Point(5.0, 9.0, 0.0)  # D
E = Point(7.0, 9.0, 0.0)  # E
F = Point(9.0, 9.0, 0.0)  # F
G = Point(11.0, 9.0, 0.0)  # G
H = Point(13.0, 9.0, 0.0)  # H
J_1 = Point(1.0, 3.213164, 0.0)  # J_1
Z = Point(21.1, 12.2, 0.0)  # Z
I_1 = Point(14.728795, 8.671696, 0.0)  # I_1
H_1 = Point(21.1, 3.8, 0.0)  # H_1
G_1 = Point(21.1, 5.0, 0.0)  # G_1
E_1 = Point(21.1, 6.2, 0.0)  # E_1
D_1 = Point(21.1, 7.4, 0.0)  # D_1
C_1 = Point(21.1, 8.6, 0.0)  # C_1
B_1 = Point(21.1, 9.8, 0.0)  # B_1
A_1 = Point(21.1, 11.0, 0.0)  # A_1
K_1 = Point(3.0, 3.944047, 0.0)  # K_1
L_1 = Point(5.0, 4.298236, 0.0)  # L_1
M_1 = Point(7.0, 4.275729, 0.0)  # M_1
N_1 = Point(9.0, 3.876528, 0.0)  # N_1
O_1 = Point(11.0, 3.100632, 0.0)  # O_1
P_1 = Point(13.0, 1.948041, 0.0)  # P_1
Q_1 = Point(7.0, 6.535898, 0.0)  # Q_1
Z_6 = Point(7.0, 12.851242, 0.0)  # Z_6
A_7 = Point(7.0, 1.573226, 0.0)  # A_7
C = Point(1.0, 7.0, 0.0)  # C
I = Point(3.0, 7.0, 0.0)  # I
J = Point(5.0, 7.0, 0.0)  # J
K = Point(7.0, 7.0, 0.0)  # K
L = Point(9.0, 7.0, 0.0)  # L
M = Point(11.0, 7.0, 0.0)  # M
N = Point(13.0, 7.0, 0.0)  # N
R_1 = Point(21.1, 8.0, 0.0)  # R_1
S_1 = Point(18.1, 8.0, 0.0)  # S_1
T_1 = Point(18.1, 9.8, 0.0)  # T_1
U_1 = Point(16.3, 8.0, 0.0)  # U_1
V_1 = Point(16.3, 8.6, 0.0)  # V_1
W_1 = Point(15.7, 8.0, 0.0)  # W_1
Z_1 = Point(16.3, 7.4, 0.0)  # Z_1
B_2 = Point(18.1, 11.0, 0.0)  # B_2
C_2 = Point(18.1, 8.0, 0.0)  # C_2
D_2 = Point(16.3, 9.8, 0.0)  # D_2
E_2 = Point(16.3, 8.0, 0.0)  # E_2
G_2 = Point(15.7, 8.6, 0.0)  # G_2
H_2 = Point(15.7, 7.4, 0.0)  # H_2
I_2 = Point(16.3, 8.0, 0.0)  # I_2
J_2 = Point(16.3, 6.2, 0.0)  # J_2
K_2 = Point(18.1, 8.0, 0.0)  # K_2
L_2 = Point(18.1, 5.0, 0.0)  # L_2
A_2 = Point(16.3, 8.0, 0.0)  # A_2
M_2 = Point(18.1, 6.2, 0.0)  # M_2
N_2 = Point(18.1, 8.0, 0.0)  # N_2
J_5 = Point(1.0, 12.851242, 0.0)  # J_5
R_5 = Point(1.0, 1.573226, 0.0)  # R_5
K_5 = Point(3.0, 12.851242, 0.0)  # K_5
S_5 = Point(3.0, 1.573226, 0.0)  # S_5
L_5 = Point(5.0, 12.851242, 0.0)  # L_5
T_5 = Point(5.0, 1.573226, 0.0)  # T_5
M_5 = Point(7.0, 12.851242, 0.0)  # M_5
U_5 = Point(7.0, 1.573226, 0.0)  # U_5
N_5 = Point(9.0, 12.851242, 0.0)  # N_5
V_5 = Point(9.0, 1.573226, 0.0)  # V_5
O_5 = Point(11.0, 12.851242, 0.0)  # O_5
W_5 = Point(11.0, 1.573226, 0.0)  # W_5
P_5 = Point(13.0, 12.851242, 0.0)  # P_5
Z_5 = Point(13.0, 1.573226, 0.0)  # Z_5
Q_5 = Point(21.1, 12.851242, 0.0)  # Q_5
A_6 = Point(21.1, 1.573226, 0.0)  # A_6
D_6 = Point(7.0, 3.518969, 0.0)  # D_6
K_6 = Point(21.7, 3.8, 0.0)  # K_6
L_6 = Point(21.7, 8.0, 0.0)  # L_6
N_6 = Point(21.1, 3.8, 0.0)  # N_6
O_6 = Point(21.1, 5.0, 0.0)  # O_6
P_6 = Point(21.1, 6.2, 0.0)  # P_6
Q_6 = Point(21.1, 7.4, 0.0)  # Q_6
R_6 = Point(21.1, 8.6, 0.0)  # R_6
S_6 = Point(21.1, 9.8, 0.0)  # S_6
T_6 = Point(21.1, 11.0, 0.0)  # T_6
M_6 = Point(21.1, 12.2, 0.0)  # M_6
J_6 = Point(21.7, 12.2, 0.0)  # J_6
frameBL = Point(-0.976199, 0.952098, 0.0)  # frameBL
G_6 = Point(-0.976199, 14.168265, 0.0)  # G_6
frameTR = Point(25.456136, 14.168265, 0.0)  # frameTR
E_6 = Point(25.456136, 0.952098, 0.0)  # E_6

# --- geometry ---
S.add(A, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(B, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(D, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(E, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(F, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(G, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(H, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(J_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Z, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(I_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(H_1, I_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(G_1, I_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(E_1, I_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(D_1, I_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(C_1, I_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(B_1, I_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(A_1, I_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(K_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(L_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(M_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(N_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(O_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(P_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(Z, I_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Q_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(Z_6, A_7), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(C, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(I, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(J, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(K, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(L, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(M, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(N, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(Point(1.0, 10.0, 0.0), Point(1.0, 9.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(1.0, 9.0, 0.0), Point(0.522394, 10.129645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(1.0, 9.0, 0.0), Point(1.477606, 10.129645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 10.0, 0.0), Point(3.0, 9.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.0, 9.0, 0.0), Point(2.522394, 10.129645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 9.0, 0.0), Point(3.477606, 10.129645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 10.0, 0.0), Point(5.0, 9.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.0, 9.0, 0.0), Point(4.522394, 10.129645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 9.0, 0.0), Point(5.477606, 10.129645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 10.0, 0.0), Point(7.0, 9.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.0, 9.0, 0.0), Point(6.522394, 10.129645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 9.0, 0.0), Point(7.477606, 10.129645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 10.0, 0.0), Point(9.0, 9.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.0, 9.0, 0.0), Point(8.522394, 10.129645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 9.0, 0.0), Point(9.477606, 10.129645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 10.0, 0.0), Point(11.0, 9.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.0, 9.0, 0.0), Point(10.522394, 10.129645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 9.0, 0.0), Point(11.477606, 10.129645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 10.0, 0.0), Point(13.0, 9.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.0, 9.0, 0.0), Point(12.522394, 10.129645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 9.0, 0.0), Point(13.477606, 10.129645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(1.0, 6.0, 0.0), Point(1.0, 7.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(1.0, 7.0, 0.0), Point(1.477606, 5.870355, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(1.0, 7.0, 0.0), Point(0.522394, 5.870355, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 6.0, 0.0), Point(13.0, 7.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.0, 7.0, 0.0), Point(13.477606, 5.870355, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 7.0, 0.0), Point(12.522394, 5.870355, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(C, A), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A, B), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B, D), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D, E), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E, F), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F, G), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H, N), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N, M), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M, L), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L, K), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K, J), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J, I), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I, C), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B, I), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D, J), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E, K), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F, L), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G, M), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I, D), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J, E), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E, L), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F, M), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G, N), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A, I), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B, J), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D, K), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K, F), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L, G), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([J_1, K_1, L_1, M_1, N_1, O_1, P_1]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(J_1, Q_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(P_1, Q_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(J_1, P_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(I_1, R_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(C, B), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_1, S_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_1, R_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_1, T_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_1, S_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_1, U_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_1, R_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_1, V_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V_1, U_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V_1, W_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W_1, R_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_1, W_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_1, B_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_2, R_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_2, C_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_2, R_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_1, D_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_2, C_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_2, E_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_2, R_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_1, G_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_2, E_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_1, H_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_2, G_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_2, I_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_2, R_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_1, J_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_2, I_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_2, K_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_2, R_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_1, L_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_2, K_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_1, L_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_1, A_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_2, R_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_1, W_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_1, Z_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_1, M_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_2, A_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_1, N_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_2, R_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_2, M_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([A, C, A_1, Z]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([C, B, A_1, S_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([C, I, S_1, R_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B, I, T_1, S_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B, D, B_1, T_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([I, D, T_1, U_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([I, J, U_1, R_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([J, D, U_1, V_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([D, E, C_1, V_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([J, E, V_1, W_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([J, K, W_1, R_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([E, F, D_1, Z_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([F, G, E_1, M_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([E, L, Z_1, W_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([K, L, W_1, R_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([L, M, U_1, R_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([M, N, S_1, R_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([N, H, G_1, H_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([C, A, Z, A_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([A, B, A_1, B_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([A, I, B_2, R_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([I, B, B_2, C_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B, D, B_1, D_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B, J, D_2, C_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([I, J, C_2, R_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([D, J, E_2, D_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([D, E, C_1, G_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([D, K, G_2, E_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([J, K, E_2, R_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([E, K, H_2, G_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([E, F, D_1, H_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([K, L, E_2, R_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([F, G, E_1, J_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([L, M, C_2, R_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([G, H, G_1, L_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([M, H, L_2, R_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([H, N, H_1, G_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([F, L, A_2, Z_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([F, M, M_2, A_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([G, N, G_1, N_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([M, G, M_2, N_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([K, F, H_2, I_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([F, L, J_2, I_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([L, G, J_2, K_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([G, M, L_2, K_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Line(Point(1.0, 8.0, 0.0), Point(1.0, 9.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(1.0, 9.0, 0.0), Point(1.477606, 7.870355, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(1.0, 9.0, 0.0), Point(0.522394, 7.870355, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(1.0, 8.0, 0.0), Point(1.0, 7.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(1.0, 7.0, 0.0), Point(0.522394, 8.129645, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(1.0, 7.0, 0.0), Point(1.477606, 8.129645, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(1.707107, 7.707107, 0.0), Point(1.0, 7.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(1.0, 7.0, 0.0), Point(1.461061, 8.136498, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(1.0, 7.0, 0.0), Point(2.136498, 7.461061, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(1.0, 7.0, 0.0), Point(2.0, 7.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(2.0, 7.0, 0.0), Point(0.870355, 6.522394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(2.0, 7.0, 0.0), Point(0.870355, 7.477606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(2.292893, 8.292893, 0.0), Point(3.0, 9.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.0, 9.0, 0.0), Point(2.538939, 7.863502, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 9.0, 0.0), Point(1.863502, 8.538939, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(4.0, 9.0, 0.0), Point(3.0, 9.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.0, 9.0, 0.0), Point(4.129645, 9.477606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 9.0, 0.0), Point(4.129645, 8.522394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 7.0, 0.0), Point(2.0, 7.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(2.0, 7.0, 0.0), Point(3.129645, 7.477606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(2.0, 7.0, 0.0), Point(3.129645, 6.522394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(3.707107, 7.707107, 0.0), Point(3.0, 7.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.0, 7.0, 0.0), Point(3.461061, 8.136498, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 7.0, 0.0), Point(4.136498, 7.461061, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 7.0, 0.0), Point(4.0, 7.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.0, 7.0, 0.0), Point(2.870355, 6.522394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(4.0, 7.0, 0.0), Point(2.870355, 7.477606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(4.292893, 8.292893, 0.0), Point(5.0, 9.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.0, 9.0, 0.0), Point(4.538939, 7.863502, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 9.0, 0.0), Point(3.863502, 8.538939, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(4.0, 9.0, 0.0), Point(5.0, 9.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.0, 9.0, 0.0), Point(3.870355, 8.522394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 9.0, 0.0), Point(3.870355, 9.477606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(6.0, 9.0, 0.0), Point(5.0, 9.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.0, 9.0, 0.0), Point(6.129645, 9.477606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 9.0, 0.0), Point(6.129645, 8.522394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 7.0, 0.0), Point(4.0, 7.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.0, 7.0, 0.0), Point(5.129645, 7.477606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(4.0, 7.0, 0.0), Point(5.129645, 6.522394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 7.0, 0.0), Point(6.0, 7.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(6.0, 7.0, 0.0), Point(4.870355, 6.522394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(6.0, 7.0, 0.0), Point(4.870355, 7.477606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(6.0, 9.0, 0.0), Point(7.0, 9.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.0, 9.0, 0.0), Point(5.870355, 8.522394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 9.0, 0.0), Point(5.870355, 9.477606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(8.0, 9.0, 0.0), Point(7.0, 9.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.0, 9.0, 0.0), Point(8.129645, 9.477606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 9.0, 0.0), Point(8.129645, 8.522394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 7.0, 0.0), Point(8.0, 7.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.0, 7.0, 0.0), Point(6.870355, 6.522394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(8.0, 7.0, 0.0), Point(6.870355, 7.477606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(8.0, 9.0, 0.0), Point(9.0, 9.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.0, 9.0, 0.0), Point(7.870355, 8.522394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 9.0, 0.0), Point(7.870355, 9.477606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(10.0, 9.0, 0.0), Point(9.0, 9.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.0, 9.0, 0.0), Point(10.129645, 9.477606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 9.0, 0.0), Point(10.129645, 8.522394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 7.0, 0.0), Point(8.0, 7.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.0, 7.0, 0.0), Point(9.129645, 7.477606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(8.0, 7.0, 0.0), Point(9.129645, 6.522394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 7.0, 0.0), Point(10.0, 7.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.0, 7.0, 0.0), Point(8.870355, 6.522394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(10.0, 7.0, 0.0), Point(8.870355, 7.477606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 7.0, 0.0), Point(10.0, 7.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.0, 7.0, 0.0), Point(11.129645, 7.477606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(10.0, 7.0, 0.0), Point(11.129645, 6.522394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(9.707107, 8.292893, 0.0), Point(9.0, 9.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.0, 9.0, 0.0), Point(10.136498, 8.538939, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 9.0, 0.0), Point(9.461061, 7.863502, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(10.292893, 7.707107, 0.0), Point(11.0, 7.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.0, 7.0, 0.0), Point(9.863502, 7.461061, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 7.0, 0.0), Point(10.538939, 8.136498, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(10.0, 9.0, 0.0), Point(11.0, 9.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.0, 9.0, 0.0), Point(9.870355, 8.522394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 9.0, 0.0), Point(9.870355, 9.477606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(11.707107, 8.292893, 0.0), Point(11.0, 9.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.0, 9.0, 0.0), Point(12.136498, 8.538939, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 9.0, 0.0), Point(11.461061, 7.863502, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 7.0, 0.0), Point(12.0, 7.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.0, 7.0, 0.0), Point(10.870355, 6.522394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.0, 7.0, 0.0), Point(10.870355, 7.477606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 7.0, 0.0), Point(12.0, 7.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.0, 7.0, 0.0), Point(13.129645, 7.477606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.0, 7.0, 0.0), Point(13.129645, 6.522394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.292893, 7.707107, 0.0), Point(13.0, 7.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.0, 7.0, 0.0), Point(11.863502, 7.461061, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 7.0, 0.0), Point(12.538939, 8.136498, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 8.0, 0.0), Point(13.0, 7.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.0, 7.0, 0.0), Point(12.522394, 8.129645, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 7.0, 0.0), Point(13.477606, 8.129645, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 8.0, 0.0), Point(13.0, 9.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.0, 9.0, 0.0), Point(13.477606, 7.870355, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 9.0, 0.0), Point(12.522394, 7.870355, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(1.0, 9.0, 0.0), Point(1.707107, 8.292893, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(1.707107, 8.292893, 0.0), Point(0.570609, 8.753954, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(1.707107, 8.292893, 0.0), Point(1.246046, 9.429391, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 7.0, 0.0), Point(2.292893, 7.707107, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(2.292893, 7.707107, 0.0), Point(3.429391, 7.246046, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(2.292893, 7.707107, 0.0), Point(2.753954, 6.570609, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 9.0, 0.0), Point(3.707107, 8.292893, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.707107, 8.292893, 0.0), Point(2.570609, 8.753954, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(3.707107, 8.292893, 0.0), Point(3.246046, 9.429391, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 7.0, 0.0), Point(4.292893, 7.707107, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.292893, 7.707107, 0.0), Point(5.429391, 7.246046, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(4.292893, 7.707107, 0.0), Point(4.753954, 6.570609, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 7.0, 0.0), Point(9.707107, 7.707107, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.707107, 7.707107, 0.0), Point(9.246046, 6.570609, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(9.707107, 7.707107, 0.0), Point(8.570609, 7.246046, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 9.0, 0.0), Point(10.292893, 8.292893, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.292893, 8.292893, 0.0), Point(10.753954, 9.429391, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(10.292893, 8.292893, 0.0), Point(11.429391, 8.753954, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 7.0, 0.0), Point(11.707107, 7.707107, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.707107, 7.707107, 0.0), Point(11.246046, 6.570609, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(11.707107, 7.707107, 0.0), Point(10.570609, 7.246046, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 9.0, 0.0), Point(12.292893, 8.292893, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.292893, 8.292893, 0.0), Point(12.753954, 9.429391, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.292893, 8.292893, 0.0), Point(13.429391, 8.753954, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(2.0, 9.0, 0.0), Point(1.0, 9.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(1.0, 9.0, 0.0), Point(2.129645, 9.477606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(1.0, 9.0, 0.0), Point(2.129645, 8.522394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(2.0, 9.0, 0.0), Point(3.0, 9.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.0, 9.0, 0.0), Point(1.870355, 8.522394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 9.0, 0.0), Point(1.870355, 9.477606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.0, 9.0, 0.0), Point(11.0, 9.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.0, 9.0, 0.0), Point(12.129645, 9.477606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 9.0, 0.0), Point(12.129645, 8.522394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.0, 9.0, 0.0), Point(13.0, 9.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.0, 9.0, 0.0), Point(11.870355, 8.522394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 9.0, 0.0), Point(11.870355, 9.477606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 8.0, 0.0), Point(7.0, 9.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.0, 9.0, 0.0), Point(7.477606, 7.870355, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 9.0, 0.0), Point(6.522394, 7.870355, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 8.0, 0.0), Point(7.0, 7.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.0, 7.0, 0.0), Point(6.522394, 8.129645, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 7.0, 0.0), Point(7.477606, 8.129645, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Z, A_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_1, H_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(3.0, 9.0, 0.0), Point(3.0, 8.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.0, 8.0, 0.0), Point(2.522394, 9.129645, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 8.0, 0.0), Point(3.477606, 9.129645, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 7.0, 0.0), Point(3.0, 8.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.0, 8.0, 0.0), Point(3.477606, 6.870355, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 8.0, 0.0), Point(2.522394, 6.870355, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 9.0, 0.0), Point(11.0, 8.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.0, 8.0, 0.0), Point(10.522394, 9.129645, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 8.0, 0.0), Point(11.477606, 9.129645, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 7.0, 0.0), Point(11.0, 8.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.0, 8.0, 0.0), Point(11.477606, 6.870355, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 8.0, 0.0), Point(10.522394, 6.870355, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Z, R_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_1, R_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_5, R_5), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(K_5, S_5), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(L_5, T_5), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(M_5, U_5), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(N_5, V_5), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(O_5, W_5), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(P_5, Z_5), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(Q_5, A_6), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(5.0, 9.0, 0.0), Point(5.707107, 8.292893, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.707107, 8.292893, 0.0), Point(4.570609, 8.753954, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(5.707107, 8.292893, 0.0), Point(5.246046, 9.429391, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 7.0, 0.0), Point(6.292893, 7.707107, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(6.292893, 7.707107, 0.0), Point(7.429391, 7.246046, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(6.292893, 7.707107, 0.0), Point(6.753954, 6.570609, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 7.0, 0.0), Point(7.707107, 7.707107, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.707107, 7.707107, 0.0), Point(7.246046, 6.570609, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(7.707107, 7.707107, 0.0), Point(6.570609, 7.246046, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 9.0, 0.0), Point(8.292893, 8.292893, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.292893, 8.292893, 0.0), Point(8.753954, 9.429391, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(8.292893, 8.292893, 0.0), Point(9.429391, 8.753954, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(5.707107, 7.707107, 0.0), Point(5.0, 7.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.0, 7.0, 0.0), Point(5.461061, 8.136498, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 7.0, 0.0), Point(6.136498, 7.461061, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(6.292893, 8.292893, 0.0), Point(7.0, 9.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.0, 9.0, 0.0), Point(6.538939, 7.863502, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 9.0, 0.0), Point(5.863502, 8.538939, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(7.707107, 8.292893, 0.0), Point(7.0, 9.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.0, 9.0, 0.0), Point(8.136498, 8.538939, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 9.0, 0.0), Point(7.461061, 7.863502, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(8.292893, 7.707107, 0.0), Point(9.0, 7.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.0, 7.0, 0.0), Point(7.863502, 7.461061, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 7.0, 0.0), Point(8.538939, 8.136498, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 7.0, 0.0), Point(5.0, 8.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.0, 8.0, 0.0), Point(5.477606, 6.870355, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 8.0, 0.0), Point(4.522394, 6.870355, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 9.0, 0.0), Point(5.0, 8.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.0, 8.0, 0.0), Point(4.522394, 9.129645, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 8.0, 0.0), Point(5.477606, 9.129645, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 7.0, 0.0), Point(9.0, 8.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.0, 8.0, 0.0), Point(9.477606, 6.870355, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 8.0, 0.0), Point(8.522394, 6.870355, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 9.0, 0.0), Point(9.0, 8.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.0, 8.0, 0.0), Point(8.522394, 9.129645, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 8.0, 0.0), Point(9.477606, 9.129645, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(D_6, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(7.0, 4.518969, 0.0), Point(7.0, 3.518969, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.0, 3.518969, 0.0), Point(6.522394, 4.648614, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 3.518969, 0.0), Point(7.477606, 4.648614, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(21.7, 8.0, 0.0), Point(21.7, 12.2, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.7, 12.2, 0.0), Point(22.177606, 11.070355, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.7, 12.2, 0.0), Point(21.222394, 11.070355, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.7, 3.8, 0.0), Point(21.7, 8.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.7, 8.0, 0.0), Point(22.177606, 6.870355, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.7, 8.0, 0.0), Point(21.222394, 6.870355, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(H_1, K_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_1, L_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_1, N_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_1, O_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_1, P_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_1, Q_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_1, R_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_1, S_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_1, T_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(21.1, 12.2, 0.0), Point(21.1, 11.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.1, 11.0, 0.0), Point(20.622394, 12.129645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.1, 11.0, 0.0), Point(21.577606, 12.129645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.1, 11.0, 0.0), Point(21.1, 9.8, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.1, 9.8, 0.0), Point(20.622394, 10.929645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.1, 9.8, 0.0), Point(21.577606, 10.929645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.1, 9.8, 0.0), Point(21.1, 8.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.1, 8.6, 0.0), Point(20.622394, 9.729645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.1, 8.6, 0.0), Point(21.577606, 9.729645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.1, 8.6, 0.0), Point(21.1, 7.4, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.1, 7.4, 0.0), Point(20.622394, 8.529645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.1, 7.4, 0.0), Point(21.577606, 8.529645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.1, 7.4, 0.0), Point(21.1, 6.2, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.1, 6.2, 0.0), Point(20.622394, 7.329645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.1, 6.2, 0.0), Point(21.577606, 7.329645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.1, 6.2, 0.0), Point(21.1, 5.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.1, 5.0, 0.0), Point(20.622394, 6.129645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.1, 5.0, 0.0), Point(21.577606, 6.129645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.1, 5.0, 0.0), Point(21.1, 3.8, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.1, 3.8, 0.0), Point(20.622394, 4.929645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.1, 3.8, 0.0), Point(21.577606, 4.929645, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Z, M_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z, J_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(21.1, 12.2, 0.0), Point(21.1, 3.8, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.1, 3.8, 0.0), Point(20.622394, 4.929645, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(21.1, 3.8, 0.0), Point(21.577606, 4.929645, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Polyline([frameBL, G_6, frameTR, E_6, frameBL]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)

if __name__ == "__main__":
    viewer.show()
