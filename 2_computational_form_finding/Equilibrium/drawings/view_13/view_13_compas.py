"""
COMPAS translation of GeoGebra applet: Tower Bridge
Source: https://block.arch.ethz.ch/eq/drawing/view/13
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
G = Point(0.0, 7.325643, 0.0)  # G
H = Point(82.3, 7.325643, 0.0)  # H
L_1 = Point(150.497264, 74.871631, 0.0)  # L_1
F = Point(0.0, 20.0, 0.0)  # F
E = Point(30.176667, 11.950864, 0.0)  # E
Z_16 = Point(176.960092, 66.05364, 0.0)  # Z_{16}
B_4 = Point(150.497264, 74.871631, 0.0)  # B_4
I = Point(82.3, 37.397087, 0.0)  # I
E_18 = Point(82.3, 69.905031, 0.0)  # E_{18}
C_4 = Point(150.497264, 72.402631, 0.0)  # C_4
D_4 = Point(150.497264, 69.933631, 0.0)  # D_4
E_4 = Point(150.497264, 67.464631, 0.0)  # E_4
F_4 = Point(150.497264, 64.995631, 0.0)  # F_4
G_4 = Point(150.497264, 62.526631, 0.0)  # G_4
H_4 = Point(150.497264, 55.119631, 0.0)  # H_4
I_4 = Point(150.497264, 52.650631, 0.0)  # I_4
J_4 = Point(150.497264, 50.181631, 0.0)  # J_4
K_4 = Point(150.497264, 47.712631, 0.0)  # K_4
O_18 = Point(30.176667, 60.142444, 0.0)  # O_{18}
A_17 = Point(176.427034, 42.898593, 0.0)  # A_{17}
Q_18 = Point(30.176667, 69.76069, 0.0)  # Q_{18}
L_4 = Point(150.497264, 45.243631, 0.0)  # L_4
M_4 = Point(150.497264, 42.774631, 0.0)  # M_4
N_4 = Point(150.497264, 40.305631, 0.0)  # N_4
O_4 = Point(150.497264, 37.836631, 0.0)  # O_4
P_4 = Point(150.497264, 35.367631, 0.0)  # P_4
Q_4 = Point(150.497264, 32.898631, 0.0)  # Q_4
W_18 = Point(0.0, 65.959391, 0.0)  # W_{18}
L_9 = Point(150.497264, 9.196231, 0.0)  # L_9
Q_13 = Point(164.233927, 45.002256, 0.0)  # Q_{13}
P_13 = Point(170.743684, 62.39774, 0.0)  # P_{13}
W_6 = Point(0.0, 83.818289, 0.0)  # W_6
Z_6 = Point(0.0, -15.880159, 0.0)  # Z_6
L_12 = Point(82.3, 83.818289, 0.0)  # L_{12}
F_13 = Point(82.3, -15.880159, 0.0)  # F_{13}
S_13 = Point(82.3, 48.731527, 0.0)  # S_{13}
D_2 = Point(150.497264, 37.836631, 0.0)  # D_2
C_2 = Point(150.497264, 40.305631, 0.0)  # C_2
B_2 = Point(150.497264, 42.774631, 0.0)  # B_2
A_2 = Point(150.497264, 45.243631, 0.0)  # A_2
Z_1 = Point(150.497264, 47.712631, 0.0)  # Z_1
W_1 = Point(150.497264, 50.181631, 0.0)  # W_1
V_1 = Point(150.497264, 52.650631, 0.0)  # V_1
U_1 = Point(150.497264, 55.119631, 0.0)  # U_1
T_1 = Point(150.497264, 57.588631, 0.0)  # T_1
R_1 = Point(150.497264, 60.057631, 0.0)  # R_1
Q_1 = Point(150.497264, 62.526631, 0.0)  # Q_1
P_1 = Point(150.497264, 64.995631, 0.0)  # P_1
O_1 = Point(150.497264, 67.464631, 0.0)  # O_1
N_1 = Point(150.497264, 69.933631, 0.0)  # N_1
M_1 = Point(150.497264, 72.402631, 0.0)  # M_1
A_7 = Point(2.743333, 83.818289, 0.0)  # A_7
O_12 = Point(2.743333, -15.880159, 0.0)  # O_{12}
B_7 = Point(8.23, 83.818289, 0.0)  # B_7
P_12 = Point(8.23, -15.880159, 0.0)  # P_{12}
E_7 = Point(13.716667, 83.818289, 0.0)  # E_7
Q_12 = Point(13.716667, -15.880159, 0.0)  # Q_{12}
R_12 = Point(19.203333, -15.880159, 0.0)  # R_{12}
G_7 = Point(19.203333, 83.818289, 0.0)  # G_7
H_7 = Point(24.69, 83.818289, 0.0)  # H_7
S_12 = Point(24.69, -15.880159, 0.0)  # S_{12}
J_7 = Point(35.663333, 83.818289, 0.0)  # J_7
U_12 = Point(35.663333, -15.880159, 0.0)  # U_{12}
J_12 = Point(74.07, 83.818289, 0.0)  # J_{12}
D_13 = Point(74.07, -15.880159, 0.0)  # D_{13}
C_13 = Point(68.583333, -15.880159, 0.0)  # C_{13}
I_12 = Point(68.583333, 83.818289, 0.0)  # I_{12}
N_12 = Point(63.096667, 83.818289, 0.0)  # N_{12}
B_13 = Point(63.096667, -15.880159, 0.0)  # B_{13}
A_13 = Point(57.61, -15.880159, 0.0)  # A_{13}
H_12 = Point(57.61, 83.818289, 0.0)  # H_{12}
F_12 = Point(46.636667, 83.818289, 0.0)  # F_{12}
W_12 = Point(46.636667, -15.880159, 0.0)  # W_{12}
V_12 = Point(41.15, -15.880159, 0.0)  # V_{12}
E_12 = Point(41.15, 83.818289, 0.0)  # E_{12}
E_13 = Point(79.556667, -15.880159, 0.0)  # E_{13}
K_12 = Point(79.556667, 83.818289, 0.0)  # K_{12}
G_12 = Point(52.123333, 83.818289, 0.0)  # G_{12}
Z_12 = Point(52.123333, -15.880159, 0.0)  # Z_{12}
T_12 = Point(30.176667, -15.880159, 0.0)  # T_{12}
I_7 = Point(30.176667, 83.818289, 0.0)  # I_7
E_14 = Point(30.176667, 50.736064, 0.0)  # E_{14}
O_14 = Point(0.0, 40.331916, 0.0)  # O_{14}
H_14 = Point(30.176667, 41.280908, 0.0)  # H_{14}
B_3 = Point(125.851017, 51.144254, 0.0)  # B_3
R_13 = Point(150.497264, 51.416131, 0.0)  # R_{13}
N_14 = Point(15.21303, 48.267677, 0.0)  # N_{14}
F_14 = Point(56.16614, 64.83269, 0.0)  # F_{14}
S_2 = Point(0.0, 9.725643, 0.0)  # S
J_1 = Point(82.3, 9.725643, 0.0)  # J_1
P = Point(30.176667, 7.325643, 0.0)  # P
Z = Point(30.176667, 9.725643, 0.0)  # Z
F_3 = Point(2.743333, 18.51875, 0.0)  # F_3
G_3 = Point(8.23, 16.105892, 0.0)  # G_3
H_3 = Point(13.716667, 14.242674, 0.0)  # H_3
I_3 = Point(19.203333, 12.929096, 0.0)  # I_3
J_3 = Point(24.69, 12.16516, 0.0)  # J_3
K_3 = Point(35.663333, 12.286208, 0.0)  # K_3
L_3 = Point(41.15, 13.171194, 0.0)  # L_3
M_3 = Point(46.636667, 14.60582, 0.0)  # M_3
N_3 = Point(52.123333, 16.590087, 0.0)  # N_3
O_3 = Point(57.61, 19.123994, 0.0)  # O_3
P_3 = Point(63.096667, 22.207543, 0.0)  # P_3
Q_3 = Point(68.583333, 25.840731, 0.0)  # Q_3
R_3 = Point(74.07, 30.023561, 0.0)  # R_3
S_3 = Point(79.556667, 34.756031, 0.0)  # S_3
J = Point(86.290735, 41.239038, 0.0)  # J
E_2 = Point(30.176667, 7.325643, 0.0)  # E_2
S_1 = Point(30.176667, 9.725643, 0.0)  # S_1
Z_5 = Point(122.064102, 47.216352, 0.0)  # Z_5
K_5 = Point(150.497264, 61.09721, 0.0)  # K_5
V_5 = Point(150.497264, 39.632267, 0.0)  # V_5
P_6 = Point(86.290735, 41.278643, 0.0)  # P_6
A_6 = Point(2.743333, 18.618575, 0.0)  # A_6
B_6 = Point(8.23, 16.332161, 0.0)  # B_6
C_6 = Point(13.716667, 14.522183, 0.0)  # C_6
D_6 = Point(19.203333, 13.18864, 0.0)  # D_6
F_6 = Point(24.69, 12.331534, 0.0)  # F_6
G_6 = Point(35.663333, 12.046629, 0.0)  # G_6
H_6 = Point(41.15, 12.618831, 0.0)  # H_6
I_6 = Point(46.636667, 13.667468, 0.0)  # I_6
J_6 = Point(52.123333, 15.192541, 0.0)  # J_6
K_6 = Point(57.61, 18.146923, 0.0)  # K_6
L_6 = Point(63.096667, 21.57774, 0.0)  # L_6
M_6 = Point(68.583333, 25.484993, 0.0)  # M_6
N_6 = Point(74.07, 29.868682, 0.0)  # N_6
O_6 = Point(79.556667, 34.728807, 0.0)  # O_6
Q_6 = Point(150.286149, 32.825687, 0.0)  # Q_6
S_6 = Point(52.123333, 6.096946, 0.0)  # S_6
T_6 = Point(146.499234, 28.897785, 0.0)  # T_6
R_6 = Point(150.286149, 27.887687, 0.0)  # R_6
N_10 = Point(0.0, 4.514099, 0.0)  # N_{10}
Q_10 = Point(30.176667, 4.514099, 0.0)  # Q_{10}
R_10 = Point(30.176667, 6.914099, 0.0)  # R_{10}
O_10 = Point(0.0, 6.914099, 0.0)  # O_{10}
T_10 = Point(82.3, 4.514099, 0.0)  # T_{10}
S_10 = Point(82.3, 6.914099, 0.0)  # S_{10}
G_13 = Point(86.290735, -15.880159, 0.0)  # G_{13}
M_12 = Point(86.290735, 83.818289, 0.0)  # M_{12}
I_13 = Point(52.123333, -15.880159, 0.0)  # I_{13}
H_13 = Point(52.123333, 83.818289, 0.0)  # H_{13}
J_13 = Point(15.21303, 83.818289, 0.0)  # J_{13}
K_13 = Point(15.21303, -15.880159, 0.0)  # K_{13}
L_13 = Point(56.16614, -15.880159, 0.0)  # L_{13}
M_13 = Point(56.16614, 83.818289, 0.0)  # M_{13}
T_13 = Point(79.556667, 50.421704, 0.0)  # T_{13}
U_13 = Point(74.07, 53.132974, 0.0)  # U_{13}
V_13 = Point(68.583333, 55.175158, 0.0)  # V_{13}
W_13 = Point(63.096667, 56.548258, 0.0)  # W_{13}
Z_13 = Point(57.61, 57.252272, 0.0)  # Z_{13}
A_14 = Point(52.123333, 57.2872, 0.0)  # A_{14}
B_14 = Point(46.636667, 56.653044, 0.0)  # B_{14}
C_14 = Point(41.15, 55.349802, 0.0)  # C_{14}
D_14 = Point(35.663333, 53.377476, 0.0)  # D_{14}
I_14 = Point(24.69, 43.349642, 0.0)  # I_{14}
J_14 = Point(19.203333, 44.432214, 0.0)  # J_{14}
K_14 = Point(13.716667, 44.528623, 0.0)  # K_{14}
L_14 = Point(8.23, 43.63887, 0.0)  # L_{14}
M_14 = Point(2.743333, 41.762954, 0.0)  # M_{14}
Q_14 = Point(125.851017, 51.144254, 0.0)  # Q_{14}
P_14 = Point(150.497264, 44.570267, 0.0)  # P_{14}
G_14 = Point(150.497264, 63.176368, 0.0)  # G_{14}
F_2 = Point(30.176667, 7.325643, 0.0)  # F_2
W_8 = Point(30.176667, 57.33937, 0.0)  # W_8
Z_8 = Point(30.176667, 62.48015, 0.0)  # Z_8
A_9 = Point(82.3, 51.133811, 0.0)  # A_9
B_9 = Point(82.3, 51.717817, 0.0)  # B_9
M_7 = Point(150.497264, 13.393531, 0.0)  # M_7
L_8 = Point(150.497264, 51.416131, 0.0)  # L_8
K_7 = Point(150.497264, 74.871631, 0.0)  # K_7
R_9 = Point(173.180376, 62.835801, 0.0)  # R_9
S_9 = Point(174.261506, 34.105319, 0.0)  # S_9
Q_7 = Point(150.497264, 72.402631, 0.0)  # Q_7
Z_7 = Point(150.497264, 69.933631, 0.0)  # Z_7
A_8 = Point(150.497264, 67.464631, 0.0)  # A_8
B_8 = Point(150.497264, 64.995631, 0.0)  # B_8
C_8 = Point(150.497264, 62.526631, 0.0)  # C_8
L_7 = Point(150.497264, 60.057631, 0.0)  # L_7
I_8 = Point(150.497264, 57.588631, 0.0)  # I_8
J_8 = Point(150.497264, 55.119631, 0.0)  # J_8
K_8 = Point(150.497264, 52.650631, 0.0)  # K_8
M_8 = Point(150.497264, 47.959531, 0.0)  # M_8
N_8 = Point(150.497264, 41.046331, 0.0)  # N_8
O_8 = Point(150.497264, 34.133131, 0.0)  # O_8
P_8 = Point(150.497264, 27.219931, 0.0)  # P_8
Q_8 = Point(150.497264, 20.306731, 0.0)  # Q_8
E_10 = Point(30.176667, 51.916396, 0.0)  # E_{10}
F_10 = Point(56.16614, 65.000634, 0.0)  # F_{10}
T_9 = Point(79.556667, 52.589444, 0.0)  # T_9
U_9 = Point(74.07, 54.903501, 0.0)  # U_9
V_9 = Point(68.583333, 56.620348, 0.0)  # V_9
W_9 = Point(63.096667, 57.739985, 0.0)  # W_9
Z_9 = Point(57.61, 58.262411, 0.0)  # Z_9
A_10 = Point(52.123333, 58.187628, 0.0)  # A_{10}
B_10 = Point(46.636667, 57.515635, 0.0)  # B_{10}
C_10 = Point(41.15, 56.246432, 0.0)  # C_{10}
D_10 = Point(35.663333, 54.380019, 0.0)  # D_{10}
L_10 = Point(0.0, 54.980515, 0.0)  # L_{10}
M_10 = Point(15.21303, 68.239473, 0.0)  # M_{10}
G_10 = Point(24.69, 60.538017, 0.0)  # G_{10}
H_10 = Point(19.203333, 62.140552, 0.0)  # H_{10}
I_10 = Point(13.716667, 62.146973, 0.0)  # I_{10}
J_10 = Point(8.23, 60.557281, 0.0)  # J_{10}
K_10 = Point(2.743333, 57.371475, 0.0)  # K_{10}
C_12 = Point(109.528161, 43.175556, 0.0)  # C_{12}
A_12 = Point(150.497264, 63.176368, 0.0)  # A_{12}
B_12 = Point(150.497264, 32.247713, 0.0)  # B_{12}
L_15 = Point(2.743333, 18.005765, 0.0)  # L_{15}
M_15 = Point(8.23, 14.943125, 0.0)  # M_{15}
N_15 = Point(13.716667, 12.806314, 0.0)  # N_{15}
O_15 = Point(19.203333, 11.595334, 0.0)  # O_{15}
P_15 = Point(24.69, 11.310184, 0.0)  # P_{15}
C_15 = Point(30.176667, 11.950864, 0.0)  # C_{15}
B_15 = Point(35.663333, 13.219785, 0.0)  # B_{15}
A_15 = Point(41.15, 14.81936, 0.0)  # A_{15}
Z_14 = Point(46.636667, 16.749589, 0.0)  # Z_{14}
W_14 = Point(52.123333, 19.010471, 0.0)  # W_{14}
V_14 = Point(57.61, 21.602007, 0.0)  # V_{14}
U_14 = Point(63.096667, 24.524196, 0.0)  # U_{14}
T_14 = Point(68.583333, 27.777039, 0.0)  # T_{14}
S_14 = Point(74.07, 31.360535, 0.0)  # S_{14}
R_14 = Point(79.556667, 35.274685, 0.0)  # R_{14}
D_12 = Point(15.21303, 4.645728, 0.0)  # D_{12}
T_15 = Point(56.16614, 5.018593, 0.0)  # T_{15}
U_15 = Point(125.106153, 39.02038, 0.0)  # U_{15}
V_15 = Point(134.919271, 55.571308, 0.0)  # V_{15}
C_9 = Point(150.497264, -4.383269, 0.0)  # C_9
N_7 = Point(150.497264, 74.871631, 0.0)  # N_7
W_15 = Point(187.136027, 39.389078, 0.0)  # W_{15}
Z_15 = Point(178.43707, 4.228856, 0.0)  # Z_{15}
D_9 = Point(150.497264, 67.958431, 0.0)  # D_9
E_9 = Point(150.497264, 61.045231, 0.0)  # E_9
F_9 = Point(150.497264, 54.132031, 0.0)  # F_9
O_7 = Point(150.497264, 47.218831, 0.0)  # O_7
G_9 = Point(150.497264, 40.305631, 0.0)  # G_9
I_9 = Point(150.497264, 33.392431, 0.0)  # I_9
H_9 = Point(150.497264, 26.479231, 0.0)  # H_9
J_9 = Point(150.497264, 19.566031, 0.0)  # J_9
K_9 = Point(150.497264, 12.652831, 0.0)  # K_9
M_9 = Point(150.497264, 7.961731, 0.0)  # M_9
N_9 = Point(150.497264, 5.492731, 0.0)  # N_9
O_9 = Point(150.497264, 3.023731, 0.0)  # O_9
P_9 = Point(150.497264, 0.554731, 0.0)  # P_9
Q_9 = Point(150.497264, -1.914269, 0.0)  # Q_9
J_16 = Point(30.176667, 55.609865, 0.0)  # J_{16}
K_16 = Point(56.16614, 77.02697, 0.0)  # K_{16}
I_16 = Point(35.663333, 59.613627, 0.0)  # I_{16}
H_16 = Point(41.15, 62.582135, 0.0)  # H_{16}
G_16 = Point(46.636667, 64.515389, 0.0)  # G_{16}
F_16 = Point(52.123333, 65.413389, 0.0)  # F_{16}
E_16 = Point(57.61, 65.276135, 0.0)  # E_{16}
D_16 = Point(63.096667, 64.103627, 0.0)  # D_{16}
C_16 = Point(68.583333, 61.895865, 0.0)  # C_{16}
B_16 = Point(74.07, 58.652849, 0.0)  # B_{16}
A_16 = Point(79.556667, 54.374579, 0.0)  # A_{16}
Q_16 = Point(0.0, 60.451269, 0.0)  # Q_{16}
R_16 = Point(15.21303, 65.140511, 0.0)  # R_{16}
L_16 = Point(24.69, 63.213191, 0.0)  # L_{16}
M_16 = Point(19.203333, 63.461384, 0.0)  # M_{16}
N_16 = Point(13.716667, 63.224728, 0.0)  # N_{16}
O_16 = Point(8.23, 62.503223, 0.0)  # O_{16}
P_16 = Point(2.743333, 61.29687, 0.0)  # P_{16}
U_16 = Point(97.810631, 16.403672, 0.0)  # U_{16}
N_17 = Point(2.743333, 18.917648, 0.0)  # N_{17}
P_17 = Point(8.23, 17.010059, 0.0)  # P_{17}
Q_17 = Point(13.716667, 15.359586, 0.0)  # Q_{17}
R_17 = Point(19.203333, 13.966229, 0.0)  # R_{17}
S_17 = Point(24.69, 12.829988, 0.0)  # S_{17}
K_17 = Point(35.663333, 11.56026, 0.0)  # K_{17}
J_17 = Point(41.15, 11.88958, 0.0)  # J_{17}
I_17 = Point(46.636667, 12.938826, 0.0)  # I_{17}
H_17 = Point(52.123333, 14.707997, 0.0)  # H_{17}
G_17 = Point(57.61, 17.197093, 0.0)  # G_{17}
F_17 = Point(63.096667, 20.406114, 0.0)  # F_{17}
E_17 = Point(68.583333, 24.33506, 0.0)  # E_{17}
D_17 = Point(74.07, 28.983931, 0.0)  # D_{17}
C_17 = Point(79.556667, 34.352727, 0.0)  # C_{17}
S_16 = Point(150.497264, 42.124894, 0.0)  # S_{16}
T_16 = Point(150.497264, 2.350367, 0.0)  # T_{16}
V_16 = Point(141.42901, 4.769177, 0.0)  # V_{16}
W_16 = Point(106.878885, 20.830726, 0.0)  # W_{16}
D_18 = Point(150.497264, 46.478131, 0.0)  # D_{18}
P_18 = Point(55.463043, 78.84769, 0.0)  # P_{18}
F_18 = Point(79.556667, 70.81917, 0.0)  # F_{18}
G_18 = Point(74.07, 72.135537, 0.0)  # G_{18}
H_18 = Point(68.583333, 72.939994, 0.0)  # H_{18}
I_18 = Point(63.096667, 73.232542, 0.0)  # I_{18}
J_18 = Point(57.61, 73.01318, 0.0)  # J_{18}
K_18 = Point(52.123333, 72.281908, 0.0)  # K_{18}
L_18 = Point(46.636667, 70.014906, 0.0)  # L_{18}
M_18 = Point(41.15, 67.235996, 0.0)  # M_{18}
N_18 = Point(35.663333, 63.945175, 0.0)  # N_{18}
Z_18 = Point(15.21303, 71.826382, 0.0)  # Z_{18}
V_18 = Point(2.743333, 67.017373, 0.0)  # V_{18}
U_18 = Point(8.23, 68.610903, 0.0)  # U_{18}
T_18 = Point(13.716667, 69.682, 0.0)  # T_{18}
S_18 = Point(19.203333, 70.230664, 0.0)  # S_{18}
R_18 = Point(24.69, 70.256894, 0.0)  # R_{18}
G_2 = Point(15.21303, 83.818289, 0.0)  # G_2
E_5 = Point(15.21303, -15.880159, 0.0)  # E_5
F_5 = Point(55.463043, -15.880159, 0.0)  # F_5
H_2 = Point(55.463043, 83.818289, 0.0)  # H_2
frameBL = Point(-19.426009, -19.630645, 0.0)  # frameBL
W_20 = Point(202.672746, -19.630645, 0.0)  # W_{20}
Z_20 = Point(-19.426009, 91.418733, 0.0)  # Z_{20}
frameTR = Point(202.672746, 91.418733, 0.0)  # frameTR
V_20 = Point(141.42901, 46.989077, 0.0)  # V_{20}
A_21 = Point(134.919271, 55.571308, 0.0)  # A_{21}

# --- geometry ---
S.add(Line(G, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(L_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(F, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(E, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(F, E), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Z_16, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Z_16, B_4), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(I, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(E_18, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(E, I), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Z_16, C_4), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(Z_16, D_4), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(Z_16, E_4), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(Z_16, F_4), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(Z_16, G_4), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(Z_16, H_4), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(Z_16, I_4), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(Z_16, J_4), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(Z_16, K_4), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(O_18, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(O_18, E_18), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(A_17, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Q_18, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(L_4, A_17), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(A_17, M_4), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(A_17, N_4), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(O_4, A_17), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(A_17, P_4), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(Q_4, A_17), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(W_18, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(W_18, Q_18), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(L_9, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Q_13, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(P_13, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(P_13, L_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_6, Z_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(L_12, F_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(S_13, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(D_2, Q_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(C_2, Q_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(B_2, Q_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(A_2, Q_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(Z_1, Q_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(W_1, Q_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(V_1, P_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(U_1, P_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(T_1, P_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(R_1, P_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(Q_1, P_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(P_1, P_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(O_1, P_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(P_13, N_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(P_13, M_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(A_7, O_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(B_7, P_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(E_7, Q_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(R_12, G_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_7, S_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(J_7, U_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(J_12, D_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_13, I_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N_12, B_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(A_13, H_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(F_12, W_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(V_12, E_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(E_13, K_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(G_12, Z_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(T_12, I_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(E_14, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(E_14, S_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(O_14, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(H_14, O_14), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(F, E), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E, I), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(B_3, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(Line(V_1, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(U_1, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(T_1, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(R_1, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Q_1, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_1, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(O_1, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N_1, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_1, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Q_13, R_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(N_14, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(P_13, R_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(F_14, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(S_2, J_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G, S_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H, J_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P, Z), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_1, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(W_1, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Z_1, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(A_2, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(B_2, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_2, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(D_2, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Polyline([F, F_3, G_3, H_3, I_3, J_3, E, K_3, L_3, M_3, N_3, O_3, P_3, Q_3, R_3, S_3, I]), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(I, J), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Polygon([G, E_2, S_1, S_2]), linecolor=Color(0.0, 0.0, 0.0), facecolor=Color(0.0, 0.0, 0.0), linewidth=1.2, opacity=0.15)
S.add(Line(Point(52.123333, 53.643417, 0.0), Point(52.123333, 46.75554, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(52.123333, 46.75554, 0.0), Point(46.99618, 58.882398, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(52.123333, 46.75554, 0.0), Point(57.250487, 58.882398, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(B_4, C_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(C_4, D_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(D_4, E_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(E_4, F_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(F_4, G_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(G_4, H_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(H_4, I_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(I_4, J_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(J_4, K_4), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(K_4, L_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(L_4, M_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(M_4, N_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(N_4, O_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(O_4, P_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Z_5, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(K_5, Z_5), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Z_5, V_5), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(B_4, Z_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_4, Z_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(D_4, Z_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(E_4, Z_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(F_4, Z_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(G_4, Z_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_4, Z_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(I_4, Z_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(J_4, Z_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_4, Z_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(L_4, Z_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_4, Z_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N_4, Z_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(O_4, Z_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_4, Z_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Q_4, Z_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(P_6, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Polyline([F, A_6, B_6, C_6, D_6, F_6, E, G_6, H_6, I_6, J_6, K_6, L_6, M_6, N_6, O_6, I]), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.6)
S.add(Line(I, P_6), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Q_6, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(S_6, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Line(F, S_6), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(S_6, I), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Q_6, T_6), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(T_6, R_6), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(N_10, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Polygon([N_10, Q_10, R_10, O_10]), linecolor=Color(1.0, 0.498, 0.0), facecolor=Color(1.0, 0.498, 0.0), linewidth=1.2, opacity=0.15)
S.add(Polygon([Q_10, T_10, S_10, R_10]), linecolor=Color(1.0, 0.498, 0.0), facecolor=Color(1.0, 0.498, 0.0), linewidth=1.2, opacity=0.15)
S.add(Line(G_13, M_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(I_13, H_13), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(J_13, K_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_13, M_13), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([F, F_3, G_3, H_3, I_3, J_3, E, K_3, L_3, M_3, N_3, O_3, P_3, Q_3, R_3, S_3, I]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(S_13, T_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(T_13, U_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(U_13, V_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(V_13, W_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_13, Z_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(Z_13, A_14), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(A_14, B_14), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(B_14, C_14), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(C_14, D_14), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(D_14, E_14), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(S_13, F_14), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(F_14, E_14), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(H_14, I_14), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(I_14, J_14), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(J_14, K_14), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(K_14, L_14), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(L_14, M_14), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(M_14, O_14), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(O_14, N_14), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(N_14, H_14), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Q_14, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(Line(Q_13, P_14), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(P_14, Q_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_14, G_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_14, P_13), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Polygon([F_2, H, J_1, S_1]), linecolor=Color(0.0, 0.0, 0.0), facecolor=Color(0.0, 0.0, 0.0), linewidth=1.2, opacity=0.15)
S.add(Line(Point(0.0, 20.0, 0.0), Point(-5.807509, 23.135737, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(-5.807509, 23.135737, 0.0), Point(7.299194, 21.885639, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(-5.807509, 23.135737, 0.0), Point(2.427254, 12.862612, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(15.21303, 2.617556, 0.0), Point(15.21303, -10.582444, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(15.21303, -10.582444, 0.0), Point(10.085877, 1.544415, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(15.21303, -10.582444, 0.0), Point(20.340184, 1.544415, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(56.16614, 2.617556, 0.0), Point(56.16614, -10.582444, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(56.16614, -10.582444, 0.0), Point(51.038987, 1.544415, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(56.16614, -10.582444, 0.0), Point(61.293294, 1.544415, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(150.497264, 74.871631, 0.0), Point(150.497264, 51.416131, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(150.497264, 51.416131, 0.0), Point(145.37011, 63.54299, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(150.497264, 51.416131, 0.0), Point(155.624417, 63.54299, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(150.497264, 51.416131, 0.0), Point(150.497264, 37.836631, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(150.497264, 37.836631, 0.0), Point(145.37011, 49.96349, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(150.497264, 37.836631, 0.0), Point(155.624417, 49.96349, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(150.497264, 37.836631, 0.0), Point(125.851017, 51.144254, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(125.851017, 51.144254, 0.0), Point(138.95772, 49.894156, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(125.851017, 51.144254, 0.0), Point(134.08578, 40.871129, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(125.851017, 51.144254, 0.0), Point(150.497264, 74.871631, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(150.497264, 74.871631, 0.0), Point(145.316909, 62.767403, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(150.497264, 74.871631, 0.0), Point(138.205034, 70.154693, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(W_8, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Z_8, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(A_9, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(B_9, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(M_7, L_8), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(K_7, L_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(R_9, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(S_9, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(R_9, K_7), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(R_9, Q_7), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(R_9, Z_7), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(R_9, A_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(R_9, B_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(R_9, C_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(R_9, L_7), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(R_9, I_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(R_9, J_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(R_9, K_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(R_9, L_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(S_9, L_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(S_9, M_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(S_9, N_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(S_9, O_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(S_9, P_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(S_9, Q_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(S_9, M_7), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(E_10, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(F_10, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(A_9, T_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(T_9, U_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(U_9, V_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(V_9, W_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_9, Z_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(Z_9, A_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(A_10, B_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(B_10, C_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(C_10, D_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(D_10, E_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(E_10, F_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(F_10, A_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(E_10, A_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(L_10, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(M_10, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(W_8, G_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(G_10, H_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(H_10, I_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(I_10, J_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(J_10, K_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(K_10, L_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(L_10, M_10), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(M_10, W_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(L_10, W_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(C_12, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Line(K_7, C_12), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Q_7, C_12), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Z_7, C_12), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(A_8, C_12), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(B_8, C_12), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(A_12, C_12), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(C_8, C_12), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(A_12, R_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(I_8, C_12), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(J_8, C_12), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(L_7, C_12), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(K_8, C_12), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(L_8, C_12), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(M_8, C_12), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(N_8, C_12), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(O_8, C_12), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(B_12, C_12), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(P_8, C_12), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Q_8, C_12), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(M_7, C_12), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(B_12, S_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(Point(0.0, 20.0, 0.0), Point(-5.338506, 23.880767, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(-5.338506, 23.880767, 0.0), Point(7.485221, 20.897408, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(-5.338506, 23.880767, 0.0), Point(1.45574, 12.603062, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(F, L_15), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(L_15, M_15), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(M_15, N_15), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(N_15, O_15), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(O_15, P_15), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(P_15, C_15), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(C_15, B_15), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(B_15, A_15), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(A_15, Z_14), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(Z_14, W_14), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(W_14, V_14), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(V_14, U_14), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(U_14, T_14), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(T_14, S_14), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(S_14, R_14), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(R_14, I), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(D_12, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(T_15, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Line(F, D_12), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(D_12, I), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(I, T_15), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(T_15, F), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(150.497264, 74.871631, 0.0), Point(150.497264, 51.416131, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(150.497264, 51.416131, 0.0), Point(145.37011, 63.54299, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(150.497264, 51.416131, 0.0), Point(155.624417, 63.54299, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(150.497264, 51.416131, 0.0), Point(150.497264, 13.393531, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(150.497264, 13.393531, 0.0), Point(145.37011, 25.52039, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(150.497264, 13.393531, 0.0), Point(155.624417, 25.52039, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(150.497264, 13.393531, 0.0), Point(109.528161, 43.175556, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(109.528161, 43.175556, 0.0), Point(122.351888, 40.192198, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(109.528161, 43.175556, 0.0), Point(116.322407, 31.897852, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(109.528161, 43.175556, 0.0), Point(150.497264, 74.871631, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(150.497264, 74.871631, 0.0), Point(144.043131, 63.395892, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(150.497264, 74.871631, 0.0), Point(137.768435, 71.506318, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(U_15, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(V_15, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Line(K_7, V_15), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(V_15, L_8), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(L_8, U_15), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(U_15, M_7), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(U_15, C_12), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(C_12, V_15), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(L_9, C_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(N_7, L_9), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(W_15, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Z_15, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(W_15, N_7), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_15, D_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(W_15, E_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(W_15, F_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(W_15, O_7), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(W_15, G_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(W_15, I_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(W_15, H_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(W_15, J_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(W_15, K_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(W_15, L_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(Z_15, L_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(Z_15, M_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(Z_15, N_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(Z_15, O_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(Z_15, P_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(Z_15, Q_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(Z_15, C_9), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(J_16, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(K_16, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(B_9, K_16), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(K_16, J_16), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(J_16, I_16), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(I_16, H_16), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(H_16, G_16), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(G_16, F_16), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(F_16, E_16), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(E_16, D_16), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(D_16, C_16), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(C_16, B_16), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(B_16, A_16), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(B_9, J_16), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Q_16, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(R_16, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(Z_8, L_16), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(L_16, M_16), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(M_16, N_16), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(N_16, O_16), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(O_16, P_16), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(P_16, Q_16), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(Q_16, Z_8), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(Z_8, R_16), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(R_16, Q_16), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(U_16, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Line(U_16, N_7), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(U_16, D_9), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(U_16, E_9), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(U_16, F_9), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(U_16, O_7), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(U_16, G_9), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(U_16, I_9), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(U_16, H_9), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(U_16, J_9), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(U_16, K_9), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(U_16, L_9), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(U_16, M_9), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(U_16, N_9), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(U_16, O_9), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(U_16, P_9), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(U_16, Q_9), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(U_16, C_9), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(F, N_17), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(N_17, P_17), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(P_17, Q_17), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(Q_17, R_17), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(R_17, S_17), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(S_17, C_15), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(C_15, K_17), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(K_17, J_17), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(J_17, I_17), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(I_17, H_17), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(H_17, G_17), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(G_17, F_17), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(F_17, E_17), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(E_17, D_17), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(D_17, C_17), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(Point(0.0, 20.0, 0.0), Point(-6.139439, 22.422249, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(-6.139439, 22.422249, 0.0), Point(7.022887, 22.740972, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(-6.139439, 22.422249, 0.0), Point(3.25948, 13.202231, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(C_17, I), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(U_16, S_16), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(U_16, T_16), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(T_16, Z_15), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(S_16, W_15), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(V_16, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(W_16, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Line(C_9, V_16), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(V_16, L_9), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(L_9, W_16), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(W_16, N_7), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(W_16, U_16), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(U_16, V_16), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(150.497264, 74.871631, 0.0), Point(150.497264, 9.196231, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(150.497264, 9.196231, 0.0), Point(145.37011, 21.32309, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(150.497264, 9.196231, 0.0), Point(155.624417, 21.32309, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(150.497264, 9.196231, 0.0), Point(150.497264, -4.383269, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(150.497264, -4.383269, 0.0), Point(145.37011, 7.74359, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(150.497264, -4.383269, 0.0), Point(155.624417, 7.74359, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(150.497264, -4.383269, 0.0), Point(97.810631, 16.403672, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(97.810631, 16.403672, 0.0), Point(110.972957, 16.722395, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(97.810631, 16.403672, 0.0), Point(107.20955, 7.183654, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(97.810631, 16.403672, 0.0), Point(150.497264, 74.871631, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(150.497264, 74.871631, 0.0), Point(146.188113, 62.430585, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(150.497264, 74.871631, 0.0), Point(138.570389, 69.295066, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(D_18, Z_16), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(D_18, A_17), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(P_18, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(E_18, F_18), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(F_18, G_18), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(G_18, H_18), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(H_18, I_18), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(I_18, J_18), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(J_18, K_18), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(K_18, L_18), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(L_18, M_18), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(M_18, N_18), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(N_18, O_18), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(E_18, P_18), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(P_18, O_18), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Z_18, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(W_18, V_18), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(V_18, U_18), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(U_18, T_18), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(T_18, S_18), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(S_18, R_18), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(R_18, Q_18), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(Q_18, Z_18), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(Z_18, W_18), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(V_5, A_17), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(K_5, Z_16), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(Point(0.0, 20.0, 0.0), Point(-5.894808, 22.968373, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(-5.894808, 22.968373, 0.0), Point(7.242284, 22.093608, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(-5.894808, 22.968373, 0.0), Point(2.630374, 12.934945, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(G_2, E_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_5, H_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(82.3, 37.397087, 0.0), Point(87.031174, 41.998825, 0.0)), linecolor=Color(0.0, 0.498, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(87.031174, 41.998825, 0.0), Point(81.912922, 29.868206, 0.0)), linecolor=Color(0.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(87.031174, 41.998825, 0.0), Point(74.763281, 37.218951, 0.0)), linecolor=Color(0.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(82.3, 37.397087, 0.0), Point(87.054696, 41.974517, 0.0)), linecolor=Color(0.0, 0.498, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(87.054696, 41.974517, 0.0), Point(81.874341, 29.870289, 0.0)), linecolor=Color(0.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(87.054696, 41.974517, 0.0), Point(74.762467, 37.257579, 0.0)), linecolor=Color(0.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(82.3, 37.397087, 0.0), Point(87.520129, 41.435682, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(87.520129, 41.435682, 0.0), Point(81.065997, 29.959943, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(87.520129, 41.435682, 0.0), Point(74.791301, 38.070369, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(82.3, 37.397087, 0.0), Point(86.7182, 42.300097, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(86.7182, 42.300097, 0.0), Point(82.409049, 29.859051, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(86.7182, 42.300097, 0.0), Point(74.791325, 36.723533, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(frameBL, W_20), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([frameBL, Z_20, frameTR, W_20]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(V_20, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(A_21, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Line(D_2, V_20), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(R_13, V_20), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(R_13, A_21), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(A_21, L_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(V_20, B_3), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(A_21, B_3), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(150.497264, 74.871631, 0.0), Point(150.497264, 37.836631, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(150.497264, 37.836631, 0.0), Point(145.37011, 49.96349, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(150.497264, 37.836631, 0.0), Point(155.624417, 49.96349, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(150.286149, 32.825687, 0.0), Point(150.286149, 27.887687, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(150.286149, 27.887687, 0.0), Point(145.158996, 40.014545, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(150.286149, 27.887687, 0.0), Point(155.413303, 40.014545, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(150.497264, 35.367631, 0.0), Point(150.497264, 32.898631, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(150.497264, 32.898631, 0.0), Point(145.37011, 45.02549, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(150.497264, 32.898631, 0.0), Point(155.624417, 45.02549, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(41.15, 2.617556, 0.0), Point(41.15, -10.582444, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(41.15, -10.582444, 0.0), Point(36.022846, 1.544415, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(41.15, -10.582444, 0.0), Point(46.277154, 1.544415, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(150.497264, 32.898631, 0.0), Point(122.064102, 47.216352, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(122.064102, 47.216352, 0.0), Point(135.201194, 46.341587, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(122.064102, 47.216352, 0.0), Point(130.589284, 37.182924, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(122.064102, 47.216352, 0.0), Point(150.497264, 74.871631, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(150.497264, 74.871631, 0.0), Point(145.379011, 62.741013, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(150.497264, 74.871631, 0.0), Point(138.22937, 70.091758, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)

if __name__ == "__main__":
    viewer.show()
