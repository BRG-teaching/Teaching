"""
COMPAS translation of GeoGebra applet: PAT Center, R. Rogers
Source: https://block.arch.ethz.ch/eq/drawing/view/28
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
B_6 = Point(7.920179, 2.114669, 0.0)  # B_6
B_2 = Point(10.060179, 2.114669, 0.0)  # B_2
M_3 = Point(10.060179, 0.614669, 0.0)  # M_3
W_1 = Point(7.920179, 0.614669, 0.0)  # W_1
B_8 = Point(14.740179, 2.114669, 0.0)  # B_8
B_4 = Point(3.240179, 2.114669, 0.0)  # B_4
B_7 = Point(13.020179, 2.114669, 0.0)  # B_7
B_5 = Point(4.960179, 2.114669, 0.0)  # B_5
B_9 = Point(17.550179, 2.114669, 0.0)  # B_9
P_2 = Point(17.550179, -7.594276, 0.0)  # P_2
B_3 = Point(0.430179, 2.114669, 0.0)  # B_3
D = Point(21.0, 4.0, 0.0)  # D
G_26 = Point(3.240179, -1.498107, 0.0)  # G_{26}
M = Point(24.330515, 0.52962, 0.0)  # M
F = Point(21.0, 3.333333, 0.0)  # F
T_2 = Point(14.740179, -5.228746, 0.0)  # T_2
H = Point(21.0, 2.0, 0.0)  # H
U_2 = Point(13.020179, -4.469388, 0.0)  # U_2
I = Point(21.0, 0.666667, 0.0)  # I
V_2 = Point(4.960179, -4.137729, 0.0)  # V_2
J = Point(21.0, -0.666667, 0.0)  # J
W_2 = Point(3.240179, -4.755536, 0.0)  # W_2
K = Point(21.0, -2.0, 0.0)  # K
H_3 = Point(0.430179, -6.88981, 0.0)  # H_3
L = Point(21.0, -2.666667, 0.0)  # L
I_3 = Point(8.990179, 1.325201, 0.0)  # I_3
G_1 = Point(0.430179, -1.498107, 0.0)  # G_1
G_25 = Point(4.960179, -1.498107, 0.0)  # G_{25}
G_5 = Point(8.990179, 2.913893, 0.0)  # G_5
G_8 = Point(8.990179, 8.535313, 0.0)  # G_8
G_19 = Point(13.020179, -1.498107, 0.0)  # G_{19}
G_18 = Point(14.740179, -1.498107, 0.0)  # G_{18}
G_17 = Point(17.550179, -1.498107, 0.0)  # G_{17}
I_1 = Point(8.990179, 4.742728, 0.0)  # I_1
G_9 = Point(5.755044, 8.535313, 0.0)  # G_9
G_4 = Point(5.755044, 2.913893, 0.0)  # G_4
G_6 = Point(12.225314, 2.913893, 0.0)  # G_6
G_7 = Point(12.225314, 8.535313, 0.0)  # G_7
G_23 = Point(7.920179, -1.498107, 0.0)  # G_{23}
G_21 = Point(10.060179, -1.498107, 0.0)  # G_{21}
D_2 = Point(5.755044, 3.303403, 0.0)  # D_2
D_1 = Point(8.990179, 6.978361, 0.0)  # D_1
D_3 = Point(12.225314, 3.303403, 0.0)  # D_3
J_1 = Point(19.642851, 0.666667, 0.0)  # J_1
F_1 = Point(21.0, -2.666667, 0.0)  # F_1
K_1 = Point(21.0, 0.666667, 0.0)  # K_1
A_1 = Point(21.0, 1.333333, 0.0)  # A_1
Q_1 = Point(23.986293, 1.333333, 0.0)  # Q_1
a = Point(21.0, 2.0, 0.0)  # a
A = Point(21.0, 0.0, 0.0)  # A
R_1 = Point(26.807069, 0.0, 0.0)  # R_1
C = Point(21.0, -1.333333, 0.0)  # C
S_1 = Point(27.698622, -1.333333, 0.0)  # S_1
T_1 = Point(25.160929, -2.726615, 0.0)  # T_1
O_1 = Point(21.0, 2.0, 0.0)  # O_1
U_1 = Point(24.121086, 2.0, 0.0)  # U_1
V_1 = Point(25.160929, 6.726615, 0.0)  # V_1
P_1 = Point(21.0, 5.333333, 0.0)  # P_1
Z_1 = Point(27.698622, 5.333333, 0.0)  # Z_1
I_2 = Point(26.807069, 4.0, 0.0)  # I_2
F_2 = Point(21.0, 4.0, 0.0)  # F_2
H_2 = Point(21.0, 2.666667, 0.0)  # H_2
J_2 = Point(23.986293, 2.666667, 0.0)  # J_2
B_10 = Point(0.430179, 8.535313, 0.0)  # B_{10}
B_11 = Point(3.240179, 8.535313, 0.0)  # B_{11}
B_12 = Point(4.960179, 8.535313, 0.0)  # B_{12}
B_13 = Point(7.920179, 8.535313, 0.0)  # B_{13}
B_14 = Point(10.060179, 8.535313, 0.0)  # B_{14}
B_15 = Point(13.020179, 8.535313, 0.0)  # B_{15}
B_16 = Point(14.740179, 8.535313, 0.0)  # B_{16}
B_20 = Point(17.550179, 8.535313, 0.0)  # B_{20}
J_3 = Point(8.990179, 8.535313, 0.0)  # J_3
K_3 = Point(8.990179, -1.498107, 0.0)  # K_3
N_3 = Point(20.0, -1.333333, 0.0)  # N_3
L_1 = Point(20.0, 5.333333, 0.0)  # L_1
P_3 = Point(21.0, 5.333333, 0.0)  # P_3
R_3 = Point(21.0, 4.0, 0.0)  # R_3
S_3 = Point(21.0, 2.666667, 0.0)  # S_3
U_3 = Point(21.0, 1.333333, 0.0)  # U_3
V_3 = Point(21.0, 0.0, 0.0)  # V_3
W_3 = Point(21.0, -1.333333, 0.0)  # W_3
C_4 = Point(22.0, 4.0, 0.0)  # C_4
D_4 = Point(22.0, -2.666667, 0.0)  # D_4
T_3 = Point(21.0, 2.0, 0.0)  # T_3
O_3 = Point(20.0, 2.0, 0.0)  # O_3

# --- geometry ---
S.add(B_6, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(B_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(M_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(W_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(B_8, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(B_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(B_7, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(B_5, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(B_9, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(P_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(B_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(D, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(B_4, G_26), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(M, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(D, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(M, F), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(T_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(H, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(U_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(I, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(V_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(M, J), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(W_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(K, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(H_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(L, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(I_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(B_3, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_5, G_25), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_5, G_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(B_7, G_19), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_6, B_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_8, G_18), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_9, G_17), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(I_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(I_1, B_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(B_6, I_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(G_9, G_4), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(G_6, G_7), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(B_6, G_23), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_2, G_21), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(D_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(D_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(D_3, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(B_3, D_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_4, D_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_5, D_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_2, B_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_2, D_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_1, B_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_1, B_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_1, D_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_3, B_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_3, B_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_3, B_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_3, B_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(0.430179, 2.114669, 0.0), Point(0.430179, 1.114669, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.430179, 1.114669, 0.0), Point(-0.276494, 2.786106, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.430179, 1.114669, 0.0), Point(1.136851, 2.786106, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.240179, 2.114669, 0.0), Point(3.240179, 1.114669, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.240179, 1.114669, 0.0), Point(2.533506, 2.786106, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.240179, 1.114669, 0.0), Point(3.946851, 2.786106, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.960179, 2.114669, 0.0), Point(4.960179, 1.114669, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.960179, 1.114669, 0.0), Point(4.253506, 2.786106, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.960179, 1.114669, 0.0), Point(5.666851, 2.786106, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.020179, 2.114669, 0.0), Point(13.020179, 1.114669, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.020179, 1.114669, 0.0), Point(12.313506, 2.786106, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.020179, 1.114669, 0.0), Point(13.726851, 2.786106, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.740179, 2.114669, 0.0), Point(14.740179, 1.114669, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.740179, 1.114669, 0.0), Point(14.033506, 2.786106, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.740179, 1.114669, 0.0), Point(15.446851, 2.786106, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.550179, 2.114669, 0.0), Point(17.550179, 1.114669, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(17.550179, 1.114669, 0.0), Point(16.843506, 2.786106, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.550179, 1.114669, 0.0), Point(18.256851, 2.786106, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(D, J_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(J_1, F_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(J_1, K_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(A_1, Q_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(a, Q_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A, R_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_1, Q_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C, S_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_1, S_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(a, T_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_1, S_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_1, U_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_1, T_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_1, V_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_1, Z_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V_1, Z_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_1, I_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_2, I_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_2, J_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_2, I_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(a, J_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([B_3, D_2, a, J_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.502)
S.add(Polygon([D_2, D_1, a, V_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Line(a, V_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([B_4, D_2, J_2, I_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_5, D_2, I_2, Z_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_6, D_2, Z_1, V_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_6, D_1, V_1, U_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_2, D_1, U_1, T_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([D_1, D_3, a, T_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_2, D_3, T_1, S_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_7, D_3, S_1, R_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_8, D_3, R_1, Q_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_9, D_3, Q_1, a]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_8, B_7, A, R_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_9, B_8, A_1, Q_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_7, B_2, C, S_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_5, B_6, Z_1, P_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_4, B_5, I_2, F_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_4, B_3, H_2, J_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Line(B_3, B_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_4, B_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_5, B_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_2, B_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_7, B_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_8, B_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_3, B_10), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_4, B_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_12, B_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_6, B_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_14, B_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_15, B_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_16, B_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_20, B_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([B_6, B_2, U_1, O_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Line(Point(21.0, 4.0, 0.0), Point(21.0, 3.333333, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 3.333333, 0.0), Point(20.293328, 5.004771, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 3.333333, 0.0), Point(21.706672, 5.004771, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 3.333333, 0.0), Point(21.0, 2.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 2.0, 0.0), Point(20.293328, 3.671437, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 2.0, 0.0), Point(21.706672, 3.671437, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 2.0, 0.0), Point(21.0, 0.666667, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 0.666667, 0.0), Point(20.293328, 2.338104, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 0.666667, 0.0), Point(21.706672, 2.338104, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 0.666667, 0.0), Point(21.0, -0.666667, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, -0.666667, 0.0), Point(20.293328, 1.004771, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, -0.666667, 0.0), Point(21.706672, 1.004771, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, -0.666667, 0.0), Point(21.0, -2.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, -2.0, 0.0), Point(20.293328, -0.328563, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, -2.0, 0.0), Point(21.706672, -0.328563, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, -2.0, 0.0), Point(21.0, -2.666667, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, -2.666667, 0.0), Point(20.293328, -0.995229, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, -2.666667, 0.0), Point(21.706672, -0.995229, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 4.0, 0.0), Point(21.0, -2.666667, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, -2.666667, 0.0), Point(20.293328, -0.995229, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, -2.666667, 0.0), Point(21.706672, -0.995229, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Polyline([P_2, T_2, U_2, V_2, W_2, H_3]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Polyline([P_2, I_3, H_3]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(8.990179, 6.742728, 0.0), Point(8.990179, 4.742728, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.990179, 4.742728, 0.0), Point(8.283506, 6.414165, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.990179, 4.742728, 0.0), Point(9.696851, 6.414165, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(J_3, K_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(7.920179, -0.385331, 0.0), Point(7.920179, 0.614669, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.920179, 0.614669, 0.0), Point(8.626851, -1.056769, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.920179, 0.614669, 0.0), Point(7.213506, -1.056769, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.060179, -0.385331, 0.0), Point(10.060179, 0.614669, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.060179, 0.614669, 0.0), Point(10.766851, -1.056769, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.060179, 0.614669, 0.0), Point(9.353506, -1.056769, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(B_6, W_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_2, M_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([B_6, W_1, O_1, P_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_2, M_3, C, O_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Line(C, O_1), linecolor=Color(0.4902, 0.4902, 1.0), linewidth=1.2)
S.add(Line(O_1, P_1), linecolor=Color(0.4902, 0.4902, 1.0), linewidth=1.2)
S.add(Line(L, K_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(K_1, D), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(B_3, D_2), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(B_4, D_2), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(B_5, D_2), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(B_6, D_2), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(D_2, D_1), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(B_6, D_1), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(B_2, D_1), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(D_1, D_3), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(B_2, D_3), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(D_3, B_7), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(D_3, B_8), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(D_3, B_9), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(B_9, B_8), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(B_8, B_7), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(B_7, B_2), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(B_2, B_6), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(B_6, B_5), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(B_5, B_4), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(B_4, B_3), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(B_6, W_1), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(B_2, M_3), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(Point(20.0, -1.333333, 0.0), Point(20.0, 2.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(20.0, 2.0, 0.0), Point(20.706672, 0.328563, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(20.0, 2.0, 0.0), Point(19.293328, 0.328563, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(N_3, C), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(21.0, 5.333333, 0.0), Point(21.0, 4.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 4.0, 0.0), Point(20.293328, 5.671437, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 4.0, 0.0), Point(21.706672, 5.671437, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 4.0, 0.0), Point(21.0, 2.666667, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 2.666667, 0.0), Point(20.293328, 4.338104, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 2.666667, 0.0), Point(21.706672, 4.338104, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 2.666667, 0.0), Point(21.0, 2.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 2.0, 0.0), Point(20.293328, 3.671437, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 2.0, 0.0), Point(21.706672, 3.671437, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 2.0, 0.0), Point(21.0, 1.333333, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 1.333333, 0.0), Point(20.293328, 3.004771, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 1.333333, 0.0), Point(21.706672, 3.004771, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 1.333333, 0.0), Point(21.0, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 0.0, 0.0), Point(20.293328, 1.671437, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 0.0, 0.0), Point(21.706672, 1.671437, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 0.0, 0.0), Point(21.0, -1.333333, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, -1.333333, 0.0), Point(20.293328, 0.338104, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, -1.333333, 0.0), Point(21.706672, 0.338104, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(P_1, L_1), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(P_1, P_3), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(F_2, R_3), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(H_2, S_3), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(A_1, U_3), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(A, V_3), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(C, W_3), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(22.0, 0.666667, 0.0), Point(22.0, 4.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(22.0, 4.0, 0.0), Point(22.706672, 2.328563, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(22.0, 4.0, 0.0), Point(21.293328, 2.328563, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(22.0, -2.666667, 0.0), Point(22.0, 0.666667, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(22.0, 0.666667, 0.0), Point(22.706672, -1.004771, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(22.0, 0.666667, 0.0), Point(21.293328, -1.004771, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(D, C_4), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(L, D_4), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(a, T_3), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(O_1, O_3), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)

if __name__ == "__main__":
    viewer.show()
