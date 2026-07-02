"""
COMPAS translation of GeoGebra applet: Funicular Line Through Two Points 2
Source: https://block.arch.ethz.ch/eq/drawing/view/6
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
B_3 = Point(39.0, 54.0, 0.0)  # B_3
A_3 = Point(21.0, 50.0, 0.0)  # A_3
Z_2 = Point(13.0, 54.0, 0.0)  # Z_2
I = Point(96.611921, 67.145908, 0.0)  # I
D = Point(12.019419, 49.097097, 0.0)  # D
C = Point(21.139945, 45.001959, 0.0)  # C
E = Point(40.200901, 49.146358, 0.0)  # E
M = Point(117.487057, 52.939782, 0.0)  # M
L = Point(97.379371, 35.319119, 0.0)  # L
K = Point(99.67393, 46.791913, 0.0)  # K
T_1 = Point(3.718709, 76.010595, 0.0)  # T_1
B_2 = Point(5.13689, 17.197519, 0.0)  # B_2
E_3 = Point(3.991445, 64.700035, 0.0)  # E_3
H_3 = Point(4.967016, 24.242313, 0.0)  # H_3
P = Point(7.490786, 26.45393, 0.0)  # P
Q = Point(21.523681, 31.297122, 0.0)  # Q
R = Point(45.554784, 27.507749, 0.0)  # R
U = Point(24.806245, 41.627722, 0.0)  # U
E_2 = Point(25.395339, 17.197519, 0.0)  # E_2
V_1 = Point(23.977158, 76.010595, 0.0)  # V_1
M_1 = Point(24.628475, 48.999963, 0.0)  # M_1
A_2 = Point(51.863452, 76.010595, 0.0)  # A_2
G_2 = Point(53.281633, 17.197519, 0.0)  # G_2
G_3 = Point(52.172116, 63.210051, 0.0)  # G_3
S_2 = Point(53.157782, 22.333691, 0.0)  # S
T = Point(4.967016, 24.242313, 0.0)  # T
V = Point(24.690257, 46.437814, 0.0)  # V
G_1 = Point(72.139973, 54.520543, 0.0)  # G_1
J = Point(99.422029, 55.788387, 0.0)  # J
H_1 = Point(13.667719, 57.338597, 0.0)  # H_1
I_1 = Point(20.850976, 55.322297, 0.0)  # I_1
J_1 = Point(38.470245, 56.141095, 0.0)  # J_1
C_2 = Point(5.639504, 17.197519, 0.0)  # C_2
U_1 = Point(17.402119, 76.010595, 0.0)  # U_1
D_2 = Point(21.918469, 17.197519, 0.0)  # D_2
W_1 = Point(20.271703, 76.010595, 0.0)  # W_1
Z_1 = Point(33.55408, 76.010595, 0.0)  # Z_1
H_2 = Point(48.105769, 17.197519, 0.0)  # H_2
frameBL = Point(-5.947148, 14.853924, 0.0)  # frameBL
I_3 = Point(126.614315, 14.853924, 0.0)  # I_3
J_3 = Point(-5.947148, 81.134655, 0.0)  # J_3
frameTR = Point(126.614315, 81.134655, 0.0)  # frameTR
E_1 = Point(72.139973, 54.520543, 0.0)  # E_1
L_3 = Point(71.864878, 55.053762, 0.0)  # L_3
N_3 = Point(96.336826, 67.679128, 0.0)  # N_3
P_3 = Point(71.776689, 54.043023, 0.0)  # P_3
Q_3 = Point(97.016088, 34.841599, 0.0)  # Q_3
R_3 = Point(97.365778, 35.301251, 0.0)  # R_3

# --- geometry ---
S.add(B_3, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(A_3, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Z_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(I, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(D, pointcolor=Color(1.0, 1.0, 1.0), pointsize=3.0)
S.add(C, pointcolor=Color(1.0, 1.0, 1.0), pointsize=3.0)
S.add(E, pointcolor=Color(1.0, 1.0, 1.0), pointsize=3.0)
S.add(M, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(L, M), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(K, M), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(T_1, B_2), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(E_3, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(H_3, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(P, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Q, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(R, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(U, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(E_2, V_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(M_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(A_2, G_2), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(G_3, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(E_3, G_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(S_2, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(Point(96.611921, 67.145908, 0.0), Point(99.422029, 55.788387, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(99.422029, 55.788387, 0.0), Point(95.736192, 60.712571, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(99.422029, 55.788387, 0.0), Point(100.386475, 61.863156, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(99.422029, 55.788387, 0.0), Point(99.67393, 46.791913, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(99.67393, 46.791913, 0.0), Point(97.121048, 52.387962, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(99.67393, 46.791913, 0.0), Point(101.90968, 52.522044, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(99.67393, 46.791913, 0.0), Point(97.379371, 35.319119, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(97.379371, 35.319119, 0.0), Point(96.14169, 41.34416, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(97.379371, 35.319119, 0.0), Point(100.83917, 40.404664, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(96.611921, 67.145908, 0.0), Point(97.379371, 35.319119, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(97.379371, 35.319119, 0.0), Point(94.848243, 40.925041, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=4.2)
S.add(Line(Point(97.379371, 35.319119, 0.0), Point(99.63736, 41.040523, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=4.2)
S.add(Line(T, P), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(P, Q), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(V, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(G_1, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(L, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(H_1, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(I_1, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(J_1, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Line(E_3, H_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_1, I_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_1, J_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_1, M_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_1, J_1), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(C_2, U_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(D_2, W_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(Z_1, H_2), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Polygon([I_1, J_1, G_1, J]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([J_1, G_3, G_1, I]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([H_1, I_1, G_1, K]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([E_3, H_1, G_1, L]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Line(Point(97.379371, 35.319119, 0.0), Point(72.139973, 54.520543, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(72.139973, 54.520543, 0.0), Point(78.099062, 52.996655, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(72.139973, 54.520543, 0.0), Point(75.19854, 49.184051, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(72.139973, 54.520543, 0.0), Point(99.67393, 46.791913, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(99.67393, 46.791913, 0.0), Point(93.572108, 46.016835, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(99.67393, 46.791913, 0.0), Point(94.866743, 50.62909, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(99.67393, 46.791913, 0.0), Point(72.139973, 54.520543, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(72.139973, 54.520543, 0.0), Point(78.241795, 55.295621, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(72.139973, 54.520543, 0.0), Point(76.94716, 50.683366, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(72.139973, 54.520543, 0.0), Point(99.422029, 55.788387, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(99.422029, 55.788387, 0.0), Point(93.874018, 53.132722, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(99.422029, 55.788387, 0.0), Point(93.651635, 57.918066, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(99.422029, 55.788387, 0.0), Point(72.139973, 54.520543, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(72.139973, 54.520543, 0.0), Point(77.687983, 57.176208, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(72.139973, 54.520543, 0.0), Point(77.910366, 52.390863, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(72.139973, 54.520543, 0.0), Point(96.611921, 67.145908, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(96.611921, 67.145908, 0.0), Point(92.675365, 62.419757, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(96.611921, 67.145908, 0.0), Point(90.478962, 66.677079, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(24.690257, 46.437814, 0.0), Point(24.931321, 36.44072, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(24.931321, 36.44072, 0.0), Point(22.400192, 42.046642, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=4.2)
S.add(Line(Point(24.931321, 36.44072, 0.0), Point(27.189309, 42.162124, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=4.2)
S.add(Line(Point(13.0, 54.0, 0.0), Point(12.019419, 49.097097, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.019419, 49.097097, 0.0), Point(10.781738, 55.122138, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.019419, 49.097097, 0.0), Point(15.479218, 54.182642, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 50.0, 0.0), Point(21.139945, 45.001959, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.139945, 45.001959, 0.0), Point(18.587062, 50.598008, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.139945, 45.001959, 0.0), Point(23.375695, 50.73209, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(39.0, 54.0, 0.0), Point(40.200901, 49.146358, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(40.200901, 49.146358, 0.0), Point(36.515064, 54.070542, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(40.200901, 49.146358, 0.0), Point(41.165347, 55.221128, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.667719, 57.338597, 0.0), Point(18.481671, 55.987348, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(18.481671, 55.987348, 0.0), Point(12.379848, 55.21227, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(18.481671, 55.987348, 0.0), Point(13.674483, 59.824525, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(20.850976, 55.322297, 0.0), Point(16.037025, 56.673547, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.037025, 56.673547, 0.0), Point(22.138847, 57.448625, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(16.037025, 56.673547, 0.0), Point(20.844212, 52.83637, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(20.850976, 55.322297, 0.0), Point(25.845585, 55.554405, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(25.845585, 55.554405, 0.0), Point(20.297575, 52.89874, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(25.845585, 55.554405, 0.0), Point(20.075192, 57.684085, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(38.470245, 56.141095, 0.0), Point(33.475635, 55.908987, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(33.475635, 55.908987, 0.0), Point(39.023646, 58.564652, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(33.475635, 55.908987, 0.0), Point(39.246029, 53.779307, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(frameBL, I_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([frameBL, J_3, frameTR, I_3]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(3.991445, 64.700035, 0.0), Point(0.012114, 67.727398, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.012114, 67.727398, 0.0), Point(5.971203, 66.20351, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)
S.add(Line(Point(0.012114, 67.727398, 0.0), Point(3.070681, 62.390906, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)
S.add(Line(Point(52.172116, 63.210051, 0.0), Point(56.615613, 65.502503, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(56.615613, 65.502503, 0.0), Point(52.679057, 60.776352, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)
S.add(Line(Point(56.615613, 65.502503, 0.0), Point(50.482654, 65.033674, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)
S.add(Line(Point(38.470245, 56.141095, 0.0), Point(42.913741, 58.433547, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(42.913741, 58.433547, 0.0), Point(38.977186, 53.707395, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(42.913741, 58.433547, 0.0), Point(36.780783, 57.964718, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(13.667719, 57.338597, 0.0), Point(9.688389, 60.36596, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.688389, 60.36596, 0.0), Point(15.647478, 58.842073, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(9.688389, 60.36596, 0.0), Point(12.746956, 55.029469, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(E_3, H_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(H_1, I_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(I_1, J_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(J_1, G_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(H_1, M_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(M_1, J_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(G_1, I), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(G_1, J), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(G_1, K), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(3.991445, 64.700035, 0.0), Point(0.012114, 67.727398, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.012114, 67.727398, 0.0), Point(5.971203, 66.20351, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(0.012114, 67.727398, 0.0), Point(3.070681, 62.390906, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(52.172116, 63.210051, 0.0), Point(56.615613, 65.502503, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(56.615613, 65.502503, 0.0), Point(52.679057, 60.776352, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(56.615613, 65.502503, 0.0), Point(50.482654, 65.033674, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 54.0, 0.0), Point(12.019419, 49.097097, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.019419, 49.097097, 0.0), Point(10.781738, 55.122138, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(12.019419, 49.097097, 0.0), Point(15.479218, 54.182642, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 50.0, 0.0), Point(21.139945, 45.001959, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.139945, 45.001959, 0.0), Point(18.587062, 50.598008, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(21.139945, 45.001959, 0.0), Point(23.375695, 50.73209, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(24.690257, 46.437814, 0.0), Point(24.931321, 36.44072, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(24.931321, 36.44072, 0.0), Point(22.400192, 42.046642, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(24.931321, 36.44072, 0.0), Point(27.189309, 42.162124, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(39.0, 54.0, 0.0), Point(40.200901, 49.146358, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(40.200901, 49.146358, 0.0), Point(36.515064, 54.070542, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(40.200901, 49.146358, 0.0), Point(41.165347, 55.221128, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(99.67393, 46.791913, 0.0), Point(97.379371, 35.319119, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(97.379371, 35.319119, 0.0), Point(96.14169, 41.34416, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(97.379371, 35.319119, 0.0), Point(100.83917, 40.404664, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(99.422029, 55.788387, 0.0), Point(99.67393, 46.791913, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(99.67393, 46.791913, 0.0), Point(97.121048, 52.387962, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(99.67393, 46.791913, 0.0), Point(101.90968, 52.522044, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(96.611921, 67.145908, 0.0), Point(99.422029, 55.788387, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(99.422029, 55.788387, 0.0), Point(95.736192, 60.712571, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(99.422029, 55.788387, 0.0), Point(100.386475, 61.863156, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(96.611921, 67.145908, 0.0), Point(97.379371, 35.319119, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(97.379371, 35.319119, 0.0), Point(94.848243, 40.925041, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(97.379371, 35.319119, 0.0), Point(99.63736, 41.040523, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(M_1, E_3), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(M_1, G_3), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(L, G_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(I, G_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(E_1, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(Point(97.379371, 35.319119, 0.0), Point(72.139973, 54.520543, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(72.139973, 54.520543, 0.0), Point(78.099062, 52.996655, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(72.139973, 54.520543, 0.0), Point(75.19854, 49.184051, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(72.139973, 54.520543, 0.0), Point(97.379371, 35.319119, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(97.379371, 35.319119, 0.0), Point(91.420282, 36.843006, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(97.379371, 35.319119, 0.0), Point(94.320804, 40.655611, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(3.991445, 64.700035, 0.0), Point(7.970776, 61.672672, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.970776, 61.672672, 0.0), Point(2.011686, 63.19656, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(7.970776, 61.672672, 0.0), Point(4.912208, 67.009164, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(52.172116, 63.210051, 0.0), Point(47.728619, 60.917599, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(47.728619, 60.917599, 0.0), Point(51.665175, 65.64375, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(47.728619, 60.917599, 0.0), Point(53.861578, 61.386428, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(96.611921, 67.145908, 0.0), Point(72.139973, 54.520543, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(72.139973, 54.520543, 0.0), Point(76.076528, 59.246694, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(72.139973, 54.520543, 0.0), Point(78.272931, 54.989372, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(24.628475, 48.999963, 0.0), Point(24.869539, 39.002869, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(24.869539, 39.002869, 0.0), Point(22.33841, 44.608792, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(24.869539, 39.002869, 0.0), Point(27.127527, 44.724274, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(24.628475, 48.999963, 0.0), Point(20.649144, 52.027326, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(20.649144, 52.027326, 0.0), Point(26.608233, 50.503438, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(20.649144, 52.027326, 0.0), Point(23.707712, 46.690834, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(24.628475, 48.999963, 0.0), Point(29.071972, 51.292415, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(29.071972, 51.292415, 0.0), Point(25.135416, 46.566264, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(29.071972, 51.292415, 0.0), Point(22.939013, 50.823586, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(71.864878, 55.053762, 0.0), Point(96.336826, 67.679128, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(96.336826, 67.679128, 0.0), Point(92.400271, 62.952976, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)
S.add(Line(Point(96.336826, 67.679128, 0.0), Point(90.203868, 67.210299, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)
S.add(Line(G_1, L_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I, N_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(97.016088, 34.841599, 0.0), Point(71.776689, 54.043023, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(71.776689, 54.043023, 0.0), Point(77.735778, 52.519136, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)
S.add(Line(Point(71.776689, 54.043023, 0.0), Point(74.835257, 48.706531, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)
S.add(Line(P_3, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_3, R_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(97.016088, 34.841599, 0.0), Point(71.776689, 54.043023, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(71.776689, 54.043023, 0.0), Point(77.735778, 52.519136, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(71.776689, 54.043023, 0.0), Point(74.835257, 48.706531, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(71.864878, 55.053762, 0.0), Point(96.336826, 67.679128, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(96.336826, 67.679128, 0.0), Point(92.400271, 62.952976, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(96.336826, 67.679128, 0.0), Point(90.203868, 67.210299, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)

if __name__ == "__main__":
    viewer.show()
