"""
COMPAS translation of GeoGebra applet: Complex Prestress
Source: https://block.arch.ethz.ch/eq/drawing/view/12
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
C = Point(8.81, 64.87, 0.0)  # C
D = Point(8.80681, 38.194773, 0.0)  # D
E = Point(80.087818, 64.868639, 0.0)  # E
F_4 = Point(80.087818, 38.194773, 0.0)  # F_4
G_1 = Point(98.585507, 54.390227, 0.0)  # G_1
T = Point(127.985507, 40.519277, 0.0)  # T
S_2 = Point(127.985507, 45.139277, 0.0)  # S
R = Point(127.985507, 49.759277, 0.0)  # R
P = Point(127.985507, 54.379277, 0.0)  # P
O = Point(127.985507, 58.999277, 0.0)  # O
N = Point(127.985507, 63.619277, 0.0)  # N
M = Point(127.985507, 68.239277, 0.0)  # M
H_1 = Point(21.766993, 58.756878, 0.0)  # H_1
I_1 = Point(30.808982, 55.911742, 0.0)  # I_1
J_1 = Point(39.85097, 54.487491, 0.0)  # J_1
K_1 = Point(48.892958, 54.484123, 0.0)  # K_1
L_1 = Point(58.085646, 55.925265, 0.0)  # L_1
M_1 = Point(67.127635, 58.763665, 0.0)  # M_1
N_1 = Point(157.385507, 54.389104, 0.0)  # N_1
O_1 = Point(21.766993, 44.308906, 0.0)  # O_1
P_1 = Point(30.808982, 47.153696, 0.0)  # P_1
Q_1 = Point(39.85097, 48.577602, 0.0)  # Q_1
R_1 = Point(48.892958, 48.580624, 0.0)  # R_1
S_1 = Point(58.085646, 47.139132, 0.0)  # S_1
T_1 = Point(67.127635, 44.300386, 0.0)  # T_1
F_1 = Point(127.985507, 54.389665, 0.0)  # F_1
Z_1 = Point(21.766993, 82.379956, 0.0)  # Z_1
I_2 = Point(21.766993, 9.290551, 0.0)  # I_2
A_2 = Point(30.808982, 82.379956, 0.0)  # A_2
J_2 = Point(30.808982, 9.290551, 0.0)  # J_2
B_2 = Point(39.85097, 82.379956, 0.0)  # B_2
K_2 = Point(39.85097, 9.290551, 0.0)  # K_2
C_2 = Point(48.892958, 82.379956, 0.0)  # C_2
L_2 = Point(48.892958, 9.290551, 0.0)  # L_2
D_2 = Point(58.085646, 82.379956, 0.0)  # D_2
M_2 = Point(58.085646, 9.290551, 0.0)  # M_2
E_2 = Point(67.127635, 82.379956, 0.0)  # E_2
N_2 = Point(67.127635, 9.290551, 0.0)  # N_2
G_2 = Point(127.985507, 82.379956, 0.0)  # G_2
P_2 = Point(127.985507, 9.290551, 0.0)  # P_2
frameBL = Point(-2.998516, 6.069003, 0.0)  # frameBL
S_3 = Point(171.541259, 6.069003, 0.0)  # S_3
T_3 = Point(-2.998516, 93.338891, 0.0)  # T_3
frameTR = Point(171.541259, 93.338891, 0.0)  # frameTR
R_3 = Point(127.985507, 36.312227, 0.0)  # R_3
U_3 = Point(98.585507, 36.312227, 0.0)  # U_3
V_3 = Point(157.385507, 36.312227, 0.0)  # V_3

# --- geometry ---
S.add(C, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(D, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(E, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(F_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(G_1, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(Line(T, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_2, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(H_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(I_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(J_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(K_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(L_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(M_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Polyline([C, H_1, I_1, J_1, K_1, L_1, M_1, E]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(N_1, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(Line(T, N_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_2, N_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R, N_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P, N_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O, N_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M, N_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(O_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(P_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Q_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(R_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(S_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(T_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Polyline([D, O_1, P_1, Q_1, R_1, S_1, T_1, F_4]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_1, O_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(I_1, P_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(J_1, Q_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(K_1, R_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(L_1, S_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(M_1, T_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(F_1, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_1, N_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_1, I_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_2, J_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_2, K_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_2, L_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_2, M_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_2, N_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_2, P_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M, N), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(N, O), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(O, P), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(P, R), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(R, S_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(S_2, T), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(Point(8.81, 64.87, 0.0), Point(2.47923, 67.856864, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(2.47923, 67.856864, 0.0), Point(10.571124, 67.526247, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(2.47923, 67.856864, 0.0), Point(7.879738, 61.821751, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(80.087818, 64.868639, 0.0), Point(86.420407, 67.851644, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(86.420407, 67.851644, 0.0), Point(81.016223, 61.819824, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(86.420407, 67.851644, 0.0), Point(78.328313, 67.525959, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.80681, 38.194773, 0.0), Point(2.475947, 35.208108, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(2.475947, 35.208108, 0.0), Point(7.876643, 41.243051, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(2.475947, 35.208108, 0.0), Point(10.567852, 35.538471, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(80.087818, 38.194773, 0.0), Point(86.420369, 35.211688, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(86.420369, 35.211688, 0.0), Point(78.328279, 35.537476, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(86.420369, 35.211688, 0.0), Point(81.016261, 41.243577, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 40.519277, 0.0), Point(98.585507, 54.390227, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(98.585507, 54.390227, 0.0), Point(106.677401, 54.05961, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(98.585507, 54.390227, 0.0), Point(103.986015, 48.355114, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(98.585507, 54.390227, 0.0), Point(127.985507, 68.239277, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(127.985507, 68.239277, 0.0), Point(122.581323, 62.207457, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 68.239277, 0.0), Point(119.893413, 67.913592, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 68.239277, 0.0), Point(157.385507, 54.389104, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(157.385507, 54.389104, 0.0), Point(149.293423, 54.715042, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(157.385507, 54.389104, 0.0), Point(151.981511, 60.421093, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(157.385507, 54.389104, 0.0), Point(127.985507, 40.519277, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(127.985507, 40.519277, 0.0), Point(133.386203, 46.554221, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 40.519277, 0.0), Point(136.077412, 40.849641, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.766993, 75.281201, 0.0), Point(21.766993, 68.281201, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.766993, 68.281201, 0.0), Point(18.613232, 75.740547, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.766993, 68.281201, 0.0), Point(24.920754, 75.740547, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.766993, 58.756878, 0.0), Point(21.766993, 51.756878, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.766993, 51.756878, 0.0), Point(18.613232, 59.216224, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(21.766993, 51.756878, 0.0), Point(24.920754, 59.216224, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(30.808982, 55.911742, 0.0), Point(30.808982, 48.911742, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(30.808982, 48.911742, 0.0), Point(27.655221, 56.371089, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(30.808982, 48.911742, 0.0), Point(33.962743, 56.371089, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(39.85097, 54.487491, 0.0), Point(39.85097, 47.487491, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(39.85097, 47.487491, 0.0), Point(36.697209, 54.946837, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(39.85097, 47.487491, 0.0), Point(43.004731, 54.946837, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(48.892958, 54.484123, 0.0), Point(48.892958, 47.484123, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(48.892958, 47.484123, 0.0), Point(45.739197, 54.94347, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(48.892958, 47.484123, 0.0), Point(52.046719, 54.94347, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(58.085646, 55.925265, 0.0), Point(58.085646, 48.925265, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(58.085646, 48.925265, 0.0), Point(54.931885, 56.384611, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(58.085646, 48.925265, 0.0), Point(61.239408, 56.384611, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(67.127635, 58.763665, 0.0), Point(67.127635, 51.763665, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(67.127635, 51.763665, 0.0), Point(63.973874, 59.223012, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(67.127635, 51.763665, 0.0), Point(70.281396, 59.223012, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 68.239277, 0.0), Point(127.985507, 63.619277, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(127.985507, 63.619277, 0.0), Point(124.831746, 71.078624, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 63.619277, 0.0), Point(131.139268, 71.078624, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 63.619277, 0.0), Point(127.985507, 58.999277, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(127.985507, 58.999277, 0.0), Point(124.831746, 66.458624, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 58.999277, 0.0), Point(131.139268, 66.458624, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 58.999277, 0.0), Point(127.985507, 54.379277, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(127.985507, 54.379277, 0.0), Point(124.831746, 61.838624, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 54.379277, 0.0), Point(131.139268, 61.838624, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 54.379277, 0.0), Point(127.985507, 49.759277, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(127.985507, 49.759277, 0.0), Point(124.831746, 57.218624, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 49.759277, 0.0), Point(131.139268, 57.218624, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 49.759277, 0.0), Point(127.985507, 45.139277, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(127.985507, 45.139277, 0.0), Point(124.831746, 52.598624, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 45.139277, 0.0), Point(131.139268, 52.598624, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 45.139277, 0.0), Point(127.985507, 40.519277, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(127.985507, 40.519277, 0.0), Point(124.831746, 47.978624, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 40.519277, 0.0), Point(131.139268, 47.978624, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(21.766993, 44.308906, 0.0), Point(21.766993, 51.308906, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.766993, 51.308906, 0.0), Point(24.920754, 43.849559, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(21.766993, 51.308906, 0.0), Point(18.613232, 43.849559, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(30.808982, 47.153696, 0.0), Point(30.808982, 54.153696, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(30.808982, 54.153696, 0.0), Point(33.962743, 46.694349, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(30.808982, 54.153696, 0.0), Point(27.655221, 46.694349, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(39.85097, 48.577602, 0.0), Point(39.85097, 55.577602, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(39.85097, 55.577602, 0.0), Point(43.004731, 48.118256, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(39.85097, 55.577602, 0.0), Point(36.697209, 48.118256, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(48.892958, 48.580624, 0.0), Point(48.892958, 55.580624, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(48.892958, 55.580624, 0.0), Point(52.046719, 48.121278, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(48.892958, 55.580624, 0.0), Point(45.739197, 48.121278, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(58.085646, 47.139132, 0.0), Point(58.085646, 54.139132, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(58.085646, 54.139132, 0.0), Point(61.239408, 46.679785, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(58.085646, 54.139132, 0.0), Point(54.931885, 46.679785, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(67.127635, 44.300386, 0.0), Point(67.127635, 51.300386, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(67.127635, 51.300386, 0.0), Point(70.281396, 43.84104, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(67.127635, 51.300386, 0.0), Point(63.973874, 43.84104, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 40.519277, 0.0), Point(127.985507, 45.139277, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(127.985507, 45.139277, 0.0), Point(131.139268, 37.67993, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 45.139277, 0.0), Point(124.831746, 37.67993, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 45.139277, 0.0), Point(127.985507, 49.759277, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(127.985507, 49.759277, 0.0), Point(131.139268, 42.29993, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 49.759277, 0.0), Point(124.831746, 42.29993, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 49.759277, 0.0), Point(127.985507, 54.379277, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(127.985507, 54.379277, 0.0), Point(131.139268, 46.91993, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 54.379277, 0.0), Point(124.831746, 46.91993, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 54.379277, 0.0), Point(127.985507, 58.999277, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(127.985507, 58.999277, 0.0), Point(131.139268, 51.53993, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 58.999277, 0.0), Point(124.831746, 51.53993, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 58.999277, 0.0), Point(127.985507, 63.619277, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(127.985507, 63.619277, 0.0), Point(131.139268, 56.15993, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 63.619277, 0.0), Point(124.831746, 56.15993, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 63.619277, 0.0), Point(127.985507, 68.239277, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(127.985507, 68.239277, 0.0), Point(131.139268, 60.77993, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(127.985507, 68.239277, 0.0), Point(124.831746, 60.77993, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(frameBL, S_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([frameBL, T_3, frameTR, S_3]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([C, H_1, G_1, T]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([H_1, I_1, G_1, S_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([I_1, J_1, G_1, R]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([J_1, K_1, G_1, P]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([K_1, L_1, G_1, O]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([L_1, M_1, G_1, N]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([M_1, E, G_1, M]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([H_1, O_1, M, N]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([I_1, P_1, N, O]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([J_1, Q_1, O, P]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([K_1, R_1, P, R]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([L_1, S_1, R, S_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([M_1, T_1, S_2, T]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([D, O_1, T, N_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([O_1, P_1, S_2, N_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([P_1, Q_1, R, N_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([Q_1, R_1, P, N_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([R_1, S_1, O, N_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([S_1, T_1, N, N_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([T_1, F_4, M, N_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(R_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(U_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(V_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(Line(U_3, R_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(R_3, V_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(U_3, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V_3, N_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_3, V_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)

if __name__ == "__main__":
    viewer.show()
