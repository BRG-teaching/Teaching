"""
COMPAS translation of GeoGebra applet: Cable-stayed bridge
Source: https://block.arch.ethz.ch/eq/drawing/view/23
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
B_3 = Point(12.494665, 2.122157, 0.0)  # B_3
C = Point(-0.005335, 4.622157, 0.0)  # C
B = Point(-0.005335, 2.122157, 0.0)  # B
A_6 = Point(-0.005335, 4.622157, 0.0)  # A_6
R = Point(19.897452, 9.801966, 0.0)  # R
B_10 = Point(1.244665, 4.372157, 0.0)  # B_{10}
B_1 = Point(3.744665, 3.872157, 0.0)  # B_1
B_13 = Point(6.244665, 3.372157, 0.0)  # B_{13}
P_12 = Point(6.244665, -1.117924, 0.0)  # P_{12}
P_5 = Point(6.244665, 9.69389, 0.0)  # P_5
B_14 = Point(14.161838, 3.319694, 0.0)  # B_{14}
B_12 = Point(8.744665, 2.872157, 0.0)  # B_{12}
B_11 = Point(11.244665, 2.372157, 0.0)  # B_{11}
D_2 = Point(12.144665, 8.212157, 0.0)  # D_2
B_15 = Point(12.236147, 7.990276, 0.0)  # B_{15}
B_17 = Point(12.323817, 7.77764, 0.0)  # B_{17}
B_18 = Point(12.41911, 7.546514, 0.0)  # B_{18}
B_16 = Point(12.506781, 7.333879, 0.0)  # B_{16}
H = Point(14.254288, 3.357812, 0.0)  # H
G = Point(12.237115, 8.250274, 0.0)  # G
J = Point(-0.034753, 4.475069, 0.0)  # J
K = Point(15.403669, 6.520963, 0.0)  # K
P_1 = Point(-0.045811, 9.69389, 0.0)  # P_1
P_2 = Point(-0.045811, -1.117924, 0.0)  # P_2
P_14 = Point(1.244665, -1.117924, 0.0)  # P_{14}
P_3 = Point(1.244665, 9.69389, 0.0)  # P_3
P_4 = Point(3.744665, 9.69389, 0.0)  # P_4
P_13 = Point(3.744665, -1.117924, 0.0)  # P_{13}
P_6 = Point(8.744665, 9.69389, 0.0)  # P_6
P_11 = Point(8.744665, -1.117924, 0.0)  # P_{11}
P_7 = Point(11.244665, 9.69389, 0.0)  # P_7
P_10 = Point(11.244665, -1.117924, 0.0)  # P_{10}
P_9 = Point(12.465247, -1.117924, 0.0)  # P_9
P_8 = Point(12.465247, 9.69389, 0.0)  # P_8
V = Point(19.897452, 4.405869, 0.0)  # V
Z = Point(22.340037, 3.917352, 0.0)  # Z
W = Point(19.897452, 3.056845, 0.0)  # W
C_1 = Point(24.222397, 4.889904, 0.0)  # C_1
U = Point(19.897452, 5.754893, 0.0)  # U
D_1 = Point(25.54453, 5.974502, 0.0)  # D_1
T = Point(19.897452, 7.103917, 0.0)  # T
G_1 = Point(26.306437, 7.171145, 0.0)  # G_1
S_2 = Point(19.897452, 8.452942, 0.0)  # S
H_1 = Point(26.508119, 8.479833, 0.0)  # H_1
I_1 = Point(31.152005, -2.783475, 0.0)  # I_1
T_1 = Point(-2.545811, 4.622157, 0.0)  # T_1
U_1 = Point(-2.545811, 2.122157, 0.0)  # U_1
W_1 = Point(-1.101705, 4.622157, 0.0)  # W_1
C_2 = Point(-0.974291, 0.160901, 0.0)  # C_2
G_2 = Point(1.279609, 0.225272, 0.0)  # G_2
H_2 = Point(1.016542, 1.033923, 0.0)  # H_2
I_2 = Point(1.093272, 1.708249, 0.0)  # I_2
J_2 = Point(0.780879, 2.5635, 0.0)  # J_2
L_2 = Point(0.520551, 3.276209, 0.0)  # L_2
M_2 = Point(0.071143, 3.887499, 0.0)  # M_2
O_2 = Point(-3.308101, 0.286363, 0.0)  # O_2
Q_2 = Point(1.777233, 0.286363, 0.0)  # Q_2
R_2 = Point(1.777233, -2.449069, 0.0)  # R_2
S_2_2 = Point(-3.308101, -2.449069, 0.0)  # S_2
T_2 = Point(16.649438, 9.64442, 0.0)  # T_2
U_2 = Point(16.121715, 9.16452, 0.0)  # U_2
V_2 = Point(16.16969, 8.684619, 0.0)  # V_2
W_2 = Point(15.737916, 7.916779, 0.0)  # W_2
Z_2 = Point(15.641966, 7.196928, 0.0)  # Z_2
C_3 = Point(15.402092, 6.525068, 0.0)  # C_3
D_3 = Point(15.450067, 6.093157, 0.0)  # D_3
G_3 = Point(15.018293, 5.709237, 0.0)  # G_3
H_3 = Point(14.634494, 5.085367, 0.0)  # H_3
I_3 = Point(14.634494, 4.413506, 0.0)  # I_3
J_3 = Point(14.49057, 3.789636, 0.0)  # J_3
L_3 = Point(14.154746, 3.405715, 0.0)  # L_3
M_3 = Point(14.010821, 2.877825, 0.0)  # M_3
N_3 = Point(13.914871, 2.157974, 0.0)  # N_3
O_3 = Point(12.475626, 2.157974, 0.0)  # O_3
Q_3 = Point(12.427651, 1.486114, 0.0)  # Q_3
R_3 = Point(12.235752, 0.910233, 0.0)  # R_3
S_3 = Point(12.043852, 0.286363, 0.0)  # S_3
T_3 = Point(17.321086, 0.238373, 0.0)  # T_3
U_3 = Point(17.321086, 9.54844, 0.0)  # U_3
frameBL = Point(-3.891907, -3.81281, 0.0)  # frameBL
W_3 = Point(33.384698, -3.81281, 0.0)  # W_3
Z_3 = Point(-3.891907, 14.825493, 0.0)  # Z_3
frameTR = Point(33.384698, 14.825493, 0.0)  # frameTR
G_4 = Point(26.78547, 8.594185, 0.0)  # G_4
H_4 = Point(31.429356, -2.669122, 0.0)  # H_4
I_4 = Point(19.75927, 2.790563, 0.0)  # I_4
L_4 = Point(31.013824, -3.049756, 0.0)  # L_4
C_4 = Point(19.956286, 10.09614, 0.0)  # C_4
D_4 = Point(26.566954, 8.774007, 0.0)  # D_4

# --- geometry ---
S.add(B_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(C, B), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(A_6, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(R, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(B_10, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(B_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(B_13, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(P_12, P_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(B_14, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(B_12, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(B_11, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(D_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(D_2, B_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(B_15, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=4.5)
S.add(B_17, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=4.5)
S.add(B_18, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=4.5)
S.add(B_16, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=4.5)
S.add(Line(B_10, D_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_1, D_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_13, D_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_12, D_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_11, D_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([H, B_14, D_2, G]), linecolor=Color(1.0, 1.0, 1.0), facecolor=Color(1.0, 1.0, 1.0), linewidth=1.2, opacity=0.15)
S.add(Line(A_6, J), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(K, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(D_2, K), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(1.244665, 4.372157, 0.0), Point(1.244665, 2.872157, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(1.244665, 2.872157, 0.0), Point(0.465503, 4.715047, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(1.244665, 2.872157, 0.0), Point(2.023826, 4.715047, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.744665, 3.872157, 0.0), Point(3.744665, 2.372157, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.744665, 2.372157, 0.0), Point(2.965503, 4.215047, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.744665, 2.372157, 0.0), Point(4.523826, 4.215047, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.244665, 3.372157, 0.0), Point(6.244665, 1.872157, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(6.244665, 1.872157, 0.0), Point(5.465503, 3.715047, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.244665, 1.872157, 0.0), Point(7.023826, 3.715047, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.744665, 2.872157, 0.0), Point(8.744665, 1.372157, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.744665, 1.372157, 0.0), Point(7.965503, 3.215047, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.744665, 1.372157, 0.0), Point(9.523826, 3.215047, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.244665, 2.372157, 0.0), Point(11.244665, 0.872157, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.244665, 0.872157, 0.0), Point(10.465503, 2.715047, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.244665, 0.872157, 0.0), Point(12.023826, 2.715047, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(P_1, P_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_14, P_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_4, P_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_6, P_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_7, P_10), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_9, P_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(V, Z), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W, Z), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z, C_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_1, U), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_1, D_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T, D_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_1, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_1, S_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_1, R), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_1, H_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W, I_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_1, I_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(15.403669, 6.520963, 0.0), Point(16.735077, 5.830056, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.735077, 5.830056, 0.0), Point(14.740432, 5.987312, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.735077, 5.830056, 0.0), Point(15.458203, 7.370488, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Polygon([B_10, D_2, W, Z]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.502)
S.add(Polygon([B_1, D_2, Z, C_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_13, D_2, C_1, D_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_12, D_2, D_1, G_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_11, D_2, G_1, H_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([D_2, B_14, I_1, H_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([D_2, K, W, I_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_10, B_1, Z, V]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_1, B_13, C_1, U]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_13, B_12, D_1, T]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_12, B_11, G_1, S_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_11, B_3, H_1, R]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(T_1, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(U_1, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(T_1, U_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Polygon([A_6, W_1, C_2, G_2, H_2, I_2, J_2, L_2, M_2]), linecolor=Color(0.502, 0.502, 0.502), facecolor=Color(0.502, 0.502, 0.502), linewidth=1.8, opacity=0.15)
S.add(Polygon([O_2, Q_2, R_2, S_2_2]), linecolor=Color(1.0, 1.0, 1.0), facecolor=Color(1.0, 1.0, 1.0), linewidth=1.0, opacity=1.0)
S.add(Polygon([T_2, U_2, V_2, W_2, Z_2, C_3, D_3, G_3, H_3, I_3, J_3, L_3, M_3, N_3, O_3, Q_3, R_3, S_3, T_3, U_3]), linecolor=Color(0.502, 0.502, 0.502), facecolor=Color(0.502, 0.502, 0.502), linewidth=1.8, opacity=0.15)
S.add(Line(Point(19.897452, 9.801966, 0.0), Point(19.897452, 8.452942, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.897452, 8.452942, 0.0), Point(19.11829, 10.295832, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.897452, 8.452942, 0.0), Point(20.676613, 10.295832, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.897452, 8.452942, 0.0), Point(19.897452, 7.103917, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.897452, 7.103917, 0.0), Point(19.11829, 8.946808, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.897452, 7.103917, 0.0), Point(20.676613, 8.946808, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.897452, 7.103917, 0.0), Point(19.897452, 5.754893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.897452, 5.754893, 0.0), Point(19.11829, 7.597784, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.897452, 5.754893, 0.0), Point(20.676613, 7.597784, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.897452, 5.754893, 0.0), Point(19.897452, 4.405869, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.897452, 4.405869, 0.0), Point(19.11829, 6.248759, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.897452, 4.405869, 0.0), Point(20.676613, 6.248759, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.897452, 4.405869, 0.0), Point(19.897452, 3.056845, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.897452, 3.056845, 0.0), Point(19.11829, 4.899735, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.897452, 3.056845, 0.0), Point(20.676613, 4.899735, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(frameBL, W_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([frameBL, Z_3, frameTR, W_3]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_6, B_10), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(31.429356, -2.669122, 0.0), Point(26.78547, 8.594185, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(26.78547, 8.594185, 0.0), Point(28.20827, 7.187424, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(26.78547, 8.594185, 0.0), Point(26.767595, 6.59343, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(H_1, G_4), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(I_1, H_4), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(19.75927, 2.790563, 0.0), Point(31.013824, -3.049756, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(31.013824, -3.049756, 0.0), Point(29.019179, -2.8925, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(31.013824, -3.049756, 0.0), Point(29.736949, -1.509324, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(W, I_4), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(I_1, L_4), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(26.566954, 8.774007, 0.0), Point(19.956286, 10.09614, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.956286, 10.09614, 0.0), Point(21.916195, 10.49875, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.956286, 10.09614, 0.0), Point(21.610583, 8.970689, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(R, C_4), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(H_1, D_4), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(B_10, B_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_1, B_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_13, B_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_12, B_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_3, B_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(12.494665, 2.122157, 0.0), Point(13.965536, 1.827982, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.965536, 1.827982, 0.0), Point(12.005627, 1.425372, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.965536, 1.827982, 0.0), Point(12.311239, 2.953434, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.965536, 1.827982, 0.0), Point(12.494665, 2.122157, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.494665, 2.122157, 0.0), Point(14.454574, 2.524767, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.494665, 2.122157, 0.0), Point(14.148961, 0.996705, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.7336, 1.93294, 0.0), Point(14.161838, 3.319694, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.161838, 3.319694, 0.0), Point(15.584638, 1.912933, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.161838, 3.319694, 0.0), Point(14.143963, 1.31894, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)

if __name__ == "__main__":
    viewer.show()
