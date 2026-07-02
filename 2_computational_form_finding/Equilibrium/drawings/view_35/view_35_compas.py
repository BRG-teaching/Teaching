"""
COMPAS translation of GeoGebra applet: Lufthansa Hangar V
Source: https://block.arch.ethz.ch/eq/drawing/view/35
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
A = Point(7.37243, 12.212177, 0.0)  # A
B = Point(29.37243, 12.212177, 0.0)  # B
C = Point(7.37243, 46.212177, 0.0)  # C
D = Point(29.37243, 46.212177, 0.0)  # D
H = Point(4.443957, 55.198573, 0.0)  # H
E = Point(18.37243, 46.212177, 0.0)  # E
U = Point(7.37243, 6.954029, 0.0)  # U
T = Point(135.329648, 49.576197, 0.0)  # T
O = Point(80.0, 60.0, 0.0)  # O
P = Point(80.0, 42.0, 0.0)  # P
V = Point(18.37243, 8.460241, 0.0)  # V
Q = Point(80.0, 19.8, 0.0)  # Q
W = Point(64.794761, 33.442878, 0.0)  # W
S_2 = Point(98.814825, 13.017495, 0.0)  # S
Z = Point(33.433782, 2.044213, 0.0)  # Z
V_3 = Point(5.430295, 71.971729, 0.0)  # V_3
W_3 = Point(33.602715, 1.62237, 0.0)  # W_3
S_3 = Point(7.37243, 67.122023, 0.0)  # S_3
A_1 = Point(10.624336, 59.001687, 0.0)  # A_1
F = Point(12.87243, 36.685897, 0.0)  # F
G = Point(23.87243, 36.685897, 0.0)  # G
C_1 = Point(80.0, 59.977457, 0.0)  # C_1
D_1 = Point(80.0, 59.977457, 0.0)  # D_1
G_1 = Point(90.392305, 42.0, 0.0)  # G_1
H_1 = Point(79.994934, 59.977457, 0.0)  # H_1
I_1 = Point(92.394742, 41.585369, 0.0)  # I_1
J_1 = Point(90.152917, 41.585369, 0.0)  # J_1
K_1 = Point(102.730706, 19.8, 0.0)  # K_1
V_1 = Point(18.37243, 71.971729, 0.0)  # V_1
C_2 = Point(18.37243, 1.62237, 0.0)  # C_2
W_1 = Point(75.205748, 71.971729, 0.0)  # W_1
A_2 = Point(103.378168, 1.62237, 0.0)  # A_2
E_2 = Point(-0.759457, 57.074338, 0.0)  # E_2
Z_1 = Point(42.699602, 41.407901, 0.0)  # Z_1
T_1 = Point(7.37243, 71.971729, 0.0)  # T_1
D_2 = Point(7.37243, 1.62237, 0.0)  # D_2
frameBL = Point(-17.047787, -3.155321, 0.0)  # frameBL
K_3 = Point(154.646569, -3.155321, 0.0)  # K_3
L_3 = Point(-17.047787, 82.691857, 0.0)  # L_3
frameTR = Point(154.646569, 82.691857, 0.0)  # frameTR
M_3 = Point(80.0, 71.971729, 0.0)  # M_3
N_3 = Point(80.0, 1.62237, 0.0)  # N_3
Q_3 = Point(76.0, 60.0, 0.0)  # Q_3
O_3 = Point(76.0, 13.017495, 0.0)  # O_3
E_1 = Point(80.0, 13.017495, 0.0)  # E_1
R_3 = Point(76.0, 59.977457, 0.0)  # R_3

# --- geometry ---
S.add(A, pointcolor=Color(1.0, 1.0, 1.0), pointsize=3.0)
S.add(B, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(C, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(D, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(Polyline([Point(5.417334, 57.540788, 0.0), Point(5.373947, 57.448586, 0.0), Point(5.330915, 57.356217, 0.0), Point(5.288239, 57.263684, 0.0), Point(5.245919, 57.170987, 0.0), Point(5.203955, 57.078128, 0.0), Point(5.162349, 56.985109, 0.0), Point(5.121101, 56.89193, 0.0), Point(5.080212, 56.798594, 0.0), Point(5.039682, 56.705101, 0.0), Point(4.999512, 56.611452, 0.0), Point(4.959702, 56.51765, 0.0), Point(4.920253, 56.423696, 0.0), Point(4.881166, 56.32959, 0.0), Point(4.842441, 56.235335, 0.0), Point(4.804078, 56.140931, 0.0), Point(4.766079, 56.046381, 0.0), Point(4.728444, 55.951686, 0.0), Point(4.691173, 55.856846, 0.0), Point(4.654268, 55.761864, 0.0), Point(4.617727, 55.66674, 0.0), Point(4.581553, 55.571477, 0.0), Point(4.545746, 55.476075, 0.0), Point(4.510305, 55.380537, 0.0), Point(4.475232, 55.284862, 0.0), Point(4.440528, 55.189054, 0.0), Point(4.406192, 55.093113, 0.0), Point(4.372225, 54.99704, 0.0), Point(4.338628, 54.900838, 0.0), Point(4.305401, 54.804507, 0.0), Point(4.272545, 54.708049, 0.0), Point(4.24006, 54.611466, 0.0), Point(4.207947, 54.514758, 0.0), Point(4.176205, 54.417927, 0.0), Point(4.144837, 54.320975, 0.0), Point(4.113841, 54.223903, 0.0), Point(4.083219, 54.126713, 0.0), Point(4.052971, 54.029406, 0.0), Point(4.023097, 53.931983, 0.0), Point(3.993598, 53.834446, 0.0), Point(3.964475, 53.736796, 0.0), Point(3.935727, 53.639035, 0.0), Point(3.907355, 53.541164, 0.0), Point(3.87936, 53.443185, 0.0), Point(3.851742, 53.345099, 0.0), Point(3.824502, 53.246907, 0.0), Point(3.797639, 53.148611, 0.0), Point(3.771154, 53.050213, 0.0), Point(3.745048, 52.951713, 0.0), Point(3.719321, 52.853114, 0.0), Point(3.693973, 52.754417, 0.0), Point(3.669005, 52.655623, 0.0), Point(3.644417, 52.556734, 0.0), Point(3.620209, 52.457751, 0.0), Point(3.596382, 52.358675, 0.0), Point(3.572937, 52.259509, 0.0), Point(3.549873, 52.160253, 0.0), Point(3.527191, 52.060909, 0.0), Point(3.504891, 51.961479, 0.0), Point(3.482973, 51.861964, 0.0), Point(3.461438, 51.762365, 0.0), Point(3.440287, 51.662684, 0.0), Point(3.419519, 51.562923, 0.0), Point(3.399135, 51.463082, 0.0), Point(3.379135, 51.363164, 0.0)]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)  # arc
S.add(H, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(E, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(U, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(T, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(O, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(O, T), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(T, P), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(V, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(Q, T), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(W, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(S_2, T), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Z, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(V_3, W_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(S_3, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(Line(A, B), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(A_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(S_3, A), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(S_3, B), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(F, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(G, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(Line(B, F), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F, C), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C, E), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E, D), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D, G), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G, B), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A, F), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F, G), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F, E), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G, E), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(29.37243, 6.212177, 0.0), Point(29.37243, 12.212177, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(29.37243, 12.212177, 0.0), Point(32.474777, 4.874436, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(29.37243, 12.212177, 0.0), Point(26.270083, 4.874436, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.37243, 52.212177, 0.0), Point(7.37243, 46.212177, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.37243, 46.212177, 0.0), Point(4.270083, 53.549918, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.37243, 46.212177, 0.0), Point(10.474777, 53.549918, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.37243, 52.212177, 0.0), Point(18.37243, 46.212177, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(18.37243, 46.212177, 0.0), Point(15.270083, 53.549918, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.37243, 46.212177, 0.0), Point(21.474777, 53.549918, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(29.37243, 46.212177, 0.0), Point(35.016877, 44.177425, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.016877, 44.177425, 0.0), Point(27.061877, 43.747333, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.016877, 44.177425, 0.0), Point(29.166046, 49.584345, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.37243, 12.212177, 0.0), Point(29.37243, 12.212177, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(29.37243, 12.212177, 0.0), Point(36.710171, 15.314524, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(29.37243, 12.212177, 0.0), Point(36.710171, 9.10983, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(80.0, 60.0, 0.0), Point(80.0, 42.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(80.0, 42.0, 0.0), Point(76.897653, 49.337741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(80.0, 42.0, 0.0), Point(83.102347, 49.337741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(80.0, 42.0, 0.0), Point(80.0, 19.8, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(80.0, 19.8, 0.0), Point(76.897653, 27.137741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(80.0, 19.8, 0.0), Point(83.102347, 27.137741, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(80.0, 19.8, 0.0), Point(98.814825, 13.017495, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(98.814825, 13.017495, 0.0), Point(90.859825, 12.587403, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(98.814825, 13.017495, 0.0), Point(92.963993, 18.424415, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Polyline([U, V, W]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(U, Z), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(W, Z), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(B, A), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(C_1, S_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(C_1, D_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(O, C_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(98.814825, 13.017495, 0.0), Point(80.0, 13.017495, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(80.0, 13.017495, 0.0), Point(87.337741, 16.119843, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(80.0, 13.017495, 0.0), Point(87.337741, 9.915148, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(P, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_1, O), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_1, H_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_1, O), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_1, I_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_1, S_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_1, J_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_1, I_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q, K_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_1, J_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_1, S_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V_1, C_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W_1, A_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_2, Z_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_1, D_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(7.37243, 46.212177, 0.0), Point(13.37243, 46.212177, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.37243, 46.212177, 0.0), Point(6.034689, 43.10983, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(13.37243, 46.212177, 0.0), Point(6.034689, 49.314524, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(10.37243, 41.016024, 0.0), Point(7.37243, 46.212177, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.37243, 46.212177, 0.0), Point(13.728012, 41.40868, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(7.37243, 46.212177, 0.0), Point(8.354589, 38.306333, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(18.37243, 46.212177, 0.0), Point(12.37243, 46.212177, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.37243, 46.212177, 0.0), Point(19.710171, 49.314524, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.37243, 46.212177, 0.0), Point(19.710171, 43.10983, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(9.87243, 41.88205, 0.0), Point(12.87243, 36.685897, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.87243, 36.685897, 0.0), Point(6.516848, 41.489394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.87243, 36.685897, 0.0), Point(11.890271, 44.591741, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(26.018353, 17.187131, 0.0), Point(29.37243, 12.212177, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(29.37243, 12.212177, 0.0), Point(22.698199, 16.562079, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(29.37243, 12.212177, 0.0), Point(27.842878, 20.030583, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(28.056856, 18.066173, 0.0), Point(29.37243, 12.212177, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(29.37243, 12.212177, 0.0), Point(24.736686, 18.691134, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(29.37243, 12.212177, 0.0), Point(30.790395, 20.051589, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(16.226507, 31.710943, 0.0), Point(12.87243, 36.685897, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.87243, 36.685897, 0.0), Point(19.54666, 32.335995, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.87243, 36.685897, 0.0), Point(14.401982, 28.867491, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(26.37243, 41.016024, 0.0), Point(29.37243, 46.212177, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(29.37243, 46.212177, 0.0), Point(28.390271, 38.306333, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(29.37243, 46.212177, 0.0), Point(23.016848, 41.40868, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(29.37243, 46.212177, 0.0), Point(23.37243, 46.212177, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(23.37243, 46.212177, 0.0), Point(30.710171, 49.314524, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(23.37243, 46.212177, 0.0), Point(30.710171, 43.10983, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(18.37243, 46.212177, 0.0), Point(24.37243, 46.212177, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(24.37243, 46.212177, 0.0), Point(17.034689, 43.10983, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(24.37243, 46.212177, 0.0), Point(17.034689, 49.314524, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(26.87243, 41.88205, 0.0), Point(23.87243, 36.685897, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(23.87243, 36.685897, 0.0), Point(24.854589, 44.591741, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(23.87243, 36.685897, 0.0), Point(30.228012, 41.489394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(21.37243, 41.016024, 0.0), Point(18.37243, 46.212177, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(18.37243, 46.212177, 0.0), Point(24.728012, 41.40868, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(18.37243, 46.212177, 0.0), Point(19.354589, 38.306333, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(20.87243, 41.88205, 0.0), Point(23.87243, 36.685897, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(23.87243, 36.685897, 0.0), Point(17.516848, 41.489394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(23.87243, 36.685897, 0.0), Point(22.890271, 44.591741, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Polygon([C, F, G_1, O]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([F, E, G_1, J_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([F, G, J_1, I_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([E, G, K_1, J_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([E, D, Q, K_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([G, D, K_1, S_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([G, B, S_2, I_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B, F, H_1, I_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([F, A, H_1, O]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([A, B, H_1, D_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Line(frameBL, K_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(frameBL, L_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_3, frameTR), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_3, frameTR), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_3, N_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(76.0, 13.017495, 0.0), Point(76.0, 59.977457, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(76.0, 59.977457, 0.0), Point(79.102347, 52.639715, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(76.0, 59.977457, 0.0), Point(72.897653, 52.639715, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(76.0, 59.977457, 0.0), Point(76.0, 60.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(76.0, 60.0, 0.0), Point(79.102347, 52.662259, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(76.0, 60.0, 0.0), Point(72.897653, 52.662259, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Q_3, O), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(O_3, E_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(R_3, D_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(8.688003, 18.066173, 0.0), Point(7.37243, 12.212177, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.37243, 12.212177, 0.0), Point(5.954465, 20.051589, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(7.37243, 12.212177, 0.0), Point(12.008174, 18.691134, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(7.37243, 12.212177, 0.0), Point(13.37243, 12.212177, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.37243, 12.212177, 0.0), Point(6.034689, 9.10983, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(13.37243, 12.212177, 0.0), Point(6.034689, 15.314524, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(29.37243, 12.212177, 0.0), Point(23.37243, 12.212177, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(23.37243, 12.212177, 0.0), Point(30.710171, 15.314524, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(23.37243, 12.212177, 0.0), Point(30.710171, 9.10983, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(11.556856, 30.831902, 0.0), Point(12.87243, 36.685897, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.87243, 36.685897, 0.0), Point(14.290395, 28.846485, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.87243, 36.685897, 0.0), Point(8.236686, 30.206941, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(15.87243, 41.88205, 0.0), Point(12.87243, 36.685897, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.87243, 36.685897, 0.0), Point(13.854589, 44.591741, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.87243, 36.685897, 0.0), Point(19.228012, 41.489394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.87243, 36.685897, 0.0), Point(18.87243, 36.685897, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(18.87243, 36.685897, 0.0), Point(11.534689, 33.58355, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(18.87243, 36.685897, 0.0), Point(11.534689, 39.788245, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(15.37243, 41.016024, 0.0), Point(18.37243, 46.212177, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(18.37243, 46.212177, 0.0), Point(17.390271, 38.306333, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(18.37243, 46.212177, 0.0), Point(12.016848, 41.40868, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(23.87243, 36.685897, 0.0), Point(17.87243, 36.685897, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(17.87243, 36.685897, 0.0), Point(25.210171, 39.788245, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(17.87243, 36.685897, 0.0), Point(25.210171, 33.58355, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(8.393762, 64.571654, 0.0), Point(10.624336, 59.001687, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.624336, 59.001687, 0.0), Point(5.016445, 64.660181, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.624336, 59.001687, 0.0), Point(10.776436, 66.966853, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)

if __name__ == "__main__":
    viewer.show()
