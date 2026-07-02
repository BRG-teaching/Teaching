"""
COMPAS translation of GeoGebra applet: Freeform Truss
Source: https://block.arch.ethz.ch/eq/drawing/view/52
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
I_3 = Point(14.0, 0.0, 0.0)  # I_3
H_3 = Point(4.0, 0.0, 0.0)  # H_3
frameBL = Point(3.0, -4.5, 0.0)  # frameBL
fBR = Point(23.474154, -4.5, 0.0)  # fBR
frameTR = Point(23.474154, 5.737077, 0.0)  # frameTR
fTL = Point(3.0, 5.737077, 0.0)  # fTL
P_1 = Point(13.5, -0.140312, 0.0)  # P_1
Q_1 = Point(12.5, -0.362312, 0.0)  # Q_1
R_1 = Point(11.5, -0.4, 0.0)  # R_1
S_1 = Point(10.5, -0.202312, 0.0)  # S_1
U_1 = Point(8.5, 0.612312, 0.0)  # U_1
T_1 = Point(9.5, 0.179688, 0.0)  # T_1
V_1 = Point(7.5, 0.930312, 0.0)  # V_1
W_1 = Point(6.5, 1.0, 0.0)  # W_1
Z_1 = Point(5.5, 0.770312, 0.0)  # Z_1
A_2 = Point(4.5, 0.292312, 0.0)  # A_2
D_2 = Point(19.0, 4.0, 0.0)  # D_2
E_2 = Point(19.0, 3.4, 0.0)  # E_2
N_2 = Point(15.940415, 1.937518, 0.0)  # N_2
G_2 = Point(19.0, 2.8, 0.0)  # G_2
O_2 = Point(15.99894, 2.110692, 0.0)  # O_2
I_2 = Point(19.0, 2.2, 0.0)  # I_2
P_2 = Point(16.122749, 2.40051, 0.0)  # P_2
J_2 = Point(19.0, 1.6, 0.0)  # J_2
Q_2 = Point(16.172832, 2.49904, 0.0)  # Q_2
K_2 = Point(19.0, 1.0, 0.0)  # K_2
A_3 = Point(16.063062, 2.270589, 0.0)  # A_3
R_2 = Point(19.0, 0.4, 0.0)  # R_2
C_3 = Point(15.856881, 1.600671, 0.0)  # C_3
T_2 = Point(19.0, -0.2, 0.0)  # T_2
D_3 = Point(15.852596, 0.422204, 0.0)  # D_3
U_2 = Point(19.0, -0.8, 0.0)  # U_2
F_3 = Point(16.423, -0.897122, 0.0)  # F_3
V_2 = Point(19.0, -1.4, 0.0)  # V_2
G_3 = Point(17.380003, -1.759639, 0.0)  # G_3
K_3 = Point(16.070322, 2.287241, 0.0)  # K_3
Z_2 = Point(19.0, -2.0, 0.0)  # Z_2
J_3 = Point(18.45432, -2.153131, 0.0)  # J_3
L_3 = Point(4.336498, -0.14785, 0.0)  # L_3
M_3 = Point(5.109641, -0.384757, 0.0)  # M_3
N_3 = Point(5.799382, -0.64003, 0.0)  # N_3
O_3 = Point(6.522809, -0.99216, 0.0)  # O_3
P_3 = Point(7.484138, -1.501883, 0.0)  # P_3
Q_3 = Point(8.806405, -2.073926, 0.0)  # Q_3
R_3 = Point(10.492022, -2.396059, 0.0)  # R_3
S_3 = Point(12.225409, -2.077847, 0.0)  # S_3
T_3 = Point(13.424238, -1.195299, 0.0)  # T_3
U_3 = Point(13.947361, -0.304167, 0.0)  # U_3
T_4 = Point(4.5, 4.736728, 0.0)  # T_4
P_5 = Point(4.5, -3.939387, 0.0)  # P_5
U_4 = Point(5.5, 4.736728, 0.0)  # U_4
O_5 = Point(5.5, -3.939387, 0.0)  # O_5
V_4 = Point(6.5, 4.736728, 0.0)  # V_4
N_5 = Point(6.5, -3.939387, 0.0)  # N_5
W_4 = Point(7.5, 4.736728, 0.0)  # W_4
M_5 = Point(7.5, -3.939387, 0.0)  # M_5
A_5 = Point(8.5, 4.736728, 0.0)  # A_5
L_5 = Point(8.5, -3.939387, 0.0)  # L_5
B_5 = Point(9.5, 4.736728, 0.0)  # B_5
K_5 = Point(9.5, -3.939387, 0.0)  # K_5
C_5 = Point(10.5, 4.736728, 0.0)  # C_5
J_5 = Point(10.5, -3.939387, 0.0)  # J_5
D_5 = Point(11.5, 4.736728, 0.0)  # D_5
I_5 = Point(11.5, -3.939387, 0.0)  # I_5
E_5 = Point(12.5, 4.736728, 0.0)  # E_5
H_5 = Point(12.5, -3.939387, 0.0)  # H_5
F_5 = Point(13.5, 4.736728, 0.0)  # F_5
G_5 = Point(13.5, -3.939387, 0.0)  # G_5
A_6 = Point(19.4, 4.0, 0.0)  # A_6
B_6 = Point(19.4, 1.0, 0.0)  # B_6
C_6 = Point(19.4, -2.0, 0.0)  # C_6

# --- geometry ---
S.add(I_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(H_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Polyline([frameBL, fBR, frameTR, fTL, frameBL]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(P_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Q_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(R_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(S_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(U_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(T_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(V_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(W_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Z_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(A_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(D_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(A_2, Z_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_1, W_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W_1, V_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V_1, U_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_1, T_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_1, S_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_1, R_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_1, Q_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_1, P_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Circle.from_point_and_radius(Point(19.0, 1.0, 0.0), 3.2), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(E_2, N_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_2, O_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_2, P_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_2, Q_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_2, A_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_2, C_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_2, D_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_2, F_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V_2, G_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_2, O_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_2, P_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_2, Q_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_3, C_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_3, D_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_3, F_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_3, G_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_2, A_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_2, K_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_2, K_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_2, K_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_2, K_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_3, K_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_3, K_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_3, K_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_3, K_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_3, K_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_3, A_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_1, I_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_2, K_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_3, K_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_2, J_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_3, K_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_3, G_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_3, N_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(L_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(M_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(N_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(O_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(P_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Q_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(R_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(S_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(T_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(U_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(A_2, L_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_1, M_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W_1, N_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V_1, O_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_1, P_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_1, Q_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_1, R_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_1, S_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_1, T_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_1, U_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_3, L_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_3, M_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_3, N_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_3, O_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_3, P_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_3, Q_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_3, R_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_3, S_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_3, T_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_3, U_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_3, I_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(19.0, 4.0, 0.0), Point(19.0, 3.4, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.0, 3.4, 0.0), Point(18.630052, 4.275009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.0, 3.4, 0.0), Point(19.369948, 4.275009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.0, 3.4, 0.0), Point(19.0, 2.8, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.0, 2.8, 0.0), Point(18.630052, 3.675009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.0, 2.8, 0.0), Point(19.369948, 3.675009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.0, 2.8, 0.0), Point(19.0, 2.2, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.0, 2.2, 0.0), Point(18.630052, 3.075009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.0, 2.2, 0.0), Point(19.369948, 3.075009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.0, 2.2, 0.0), Point(19.0, 1.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.0, 1.6, 0.0), Point(18.630052, 2.475009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.0, 1.6, 0.0), Point(19.369948, 2.475009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.0, 1.6, 0.0), Point(19.0, 1.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.0, 1.0, 0.0), Point(18.630052, 1.875009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.0, 1.0, 0.0), Point(19.369948, 1.875009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.0, 1.0, 0.0), Point(19.0, 0.4, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.0, 0.4, 0.0), Point(18.630052, 1.275009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.0, 0.4, 0.0), Point(19.369948, 1.275009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.0, 0.4, 0.0), Point(19.0, -0.2, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.0, -0.2, 0.0), Point(18.630052, 0.675009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.0, -0.2, 0.0), Point(19.369948, 0.675009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.0, -0.2, 0.0), Point(19.0, -0.8, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.0, -0.8, 0.0), Point(18.630052, 0.075009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.0, -0.8, 0.0), Point(19.369948, 0.075009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.0, -0.8, 0.0), Point(19.0, -1.4, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.0, -1.4, 0.0), Point(18.630052, -0.524991, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.0, -1.4, 0.0), Point(19.369948, -0.524991, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.0, -1.4, 0.0), Point(19.0, -2.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.0, -2.0, 0.0), Point(18.630052, -1.124991, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.0, -2.0, 0.0), Point(19.369948, -1.124991, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Polygon([A_2, H_3, K_3, D_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([A_2, Z_1, E_2, N_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([W_1, Z_1, O_2, G_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([W_1, V_1, I_2, P_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([U_1, V_1, Q_2, J_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([T_1, U_1, A_3, K_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([S_1, T_1, C_3, R_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([R_1, S_1, D_3, T_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([Q_1, R_1, F_3, U_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([P_1, Q_1, G_3, V_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([P_1, I_3, Z_2, J_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([A_2, L_3, N_2, K_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([Z_1, M_3, O_2, N_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([W_1, N_3, P_2, O_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([V_1, O_3, Q_2, P_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([U_1, P_3, A_3, Q_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([T_1, Q_3, C_3, A_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([S_1, R_3, D_3, C_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([R_1, S_3, F_3, D_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([Q_1, T_3, G_3, F_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([P_1, U_3, J_3, G_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([L_3, H_3, K_2, K_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([L_3, M_3, N_2, K_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([N_3, M_3, K_2, O_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([O_3, N_3, K_2, P_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([P_3, O_3, K_2, Q_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([Q_3, P_3, K_2, A_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([R_3, Q_3, K_2, C_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([S_3, R_3, K_2, D_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([T_3, S_3, K_2, F_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([U_3, T_3, K_2, G_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([U_3, I_3, J_3, K_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Line(T_4, P_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_4, O_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V_4, N_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W_4, M_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_5, L_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_5, K_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_5, J_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_5, I_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_5, H_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_5, G_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(13.5, 3.85, 0.0), Point(13.5, 3.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.5, 3.0, 0.0), Point(13.130052, 3.875009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.5, 3.0, 0.0), Point(13.869948, 3.875009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.5, 3.85, 0.0), Point(12.5, 3.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.5, 3.0, 0.0), Point(12.130052, 3.875009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.5, 3.0, 0.0), Point(12.869948, 3.875009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.5, 3.85, 0.0), Point(11.5, 3.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.5, 3.0, 0.0), Point(11.130052, 3.875009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.5, 3.0, 0.0), Point(11.869948, 3.875009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.5, 3.85, 0.0), Point(10.5, 3.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.5, 3.0, 0.0), Point(10.130052, 3.875009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.5, 3.0, 0.0), Point(10.869948, 3.875009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.5, 3.85, 0.0), Point(9.5, 3.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.5, 3.0, 0.0), Point(9.130052, 3.875009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.5, 3.0, 0.0), Point(9.869948, 3.875009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.5, 3.85, 0.0), Point(8.5, 3.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.5, 3.0, 0.0), Point(8.130052, 3.875009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.5, 3.0, 0.0), Point(8.869948, 3.875009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.5, 3.85, 0.0), Point(7.5, 3.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.5, 3.0, 0.0), Point(7.130052, 3.875009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.5, 3.0, 0.0), Point(7.869948, 3.875009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.5, 3.85, 0.0), Point(6.5, 3.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(6.5, 3.0, 0.0), Point(6.130052, 3.875009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.5, 3.0, 0.0), Point(6.869948, 3.875009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.5, 3.85, 0.0), Point(5.5, 3.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.5, 3.0, 0.0), Point(5.130052, 3.875009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.5, 3.0, 0.0), Point(5.869948, 3.875009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.5, 3.85, 0.0), Point(4.5, 3.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.5, 3.0, 0.0), Point(4.130052, 3.875009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.5, 3.0, 0.0), Point(4.869948, 3.875009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.4, -2.0, 0.0), Point(19.4, 1.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.4, 1.0, 0.0), Point(19.769948, 0.124991, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.4, 1.0, 0.0), Point(19.030052, 0.124991, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.4, 1.0, 0.0), Point(19.4, 4.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.4, 4.0, 0.0), Point(19.769948, 3.124991, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.4, 4.0, 0.0), Point(19.030052, 3.124991, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(D_2, A_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_2, B_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_2, C_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(4.0, -1.35, 0.0), Point(4.0, -0.5, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.0, -0.5, 0.0), Point(4.369948, -1.375009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.0, -0.5, 0.0), Point(3.630052, -1.375009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.0, -1.35, 0.0), Point(14.0, -0.5, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.0, -0.5, 0.0), Point(14.369948, -1.375009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.0, -0.5, 0.0), Point(13.630052, -1.375009, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)

if __name__ == "__main__":
    viewer.show()
