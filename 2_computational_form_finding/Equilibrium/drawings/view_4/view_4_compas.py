"""
COMPAS translation of GeoGebra applet: Resultant of Non-concurrent Forces
Source: https://block.arch.ethz.ch/eq/drawing/view/4
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
H_1 = Point(77.242409, 12.726269, 0.0)  # H_1
S_2 = Point(-18.759021, 10.739608, 0.0)  # S
R_1 = Point(-19.38069, 19.629446, 0.0)  # R_1
S_1 = Point(-14.142631, -55.274551, 0.0)  # S_1
O_1 = Point(120.215873, -5.244453, 0.0)  # O_1
O_6 = Point(-25.268836, -19.152228, 0.0)  # O_6
Z = Point(26.777076, 3.260759, 0.0)  # Z
V = Point(11.565854, 10.344955, 0.0)  # V
T = Point(-8.872654, 10.805308, 0.0)  # T
U = Point(1.077059, 6.916643, 0.0)  # U
W = Point(18.166606, -2.900577, 0.0)  # W
T_1 = Point(-9.274748, 19.629446, 0.0)  # T_1
E_2 = Point(-5.861564, -55.274551, 0.0)  # E_2
U_1 = Point(3.056696, 19.629446, 0.0)  # U_1
D_2 = Point(-8.60735, -55.274551, 0.0)  # D_2
V_1 = Point(12.576792, 19.629446, 0.0)  # V_1
B_2 = Point(4.4209, -55.274551, 0.0)  # B_2
W_1 = Point(25.488863, 19.629446, 0.0)  # W_1
C_2 = Point(1.145064, -55.274551, 0.0)  # C_2
Z_1 = Point(14.185779, 19.629446, 0.0)  # Z_1
A_2 = Point(71.804238, -55.274551, 0.0)  # A_2
I_1 = Point(77.940008, 2.75063, 0.0)  # I_1
J_1 = Point(78.509011, -9.736412, 0.0)  # J_1
L_1 = Point(75.695574, -30.793688, 0.0)  # L_1
K_1 = Point(76.778023, -20.852445, 0.0)  # K_1
M_1 = Point(81.104581, -14.150591, 0.0)  # M_1
N_1 = Point(91.774519, -28.021511, 0.0)  # N_1
G_2 = Point(-16.4096, -22.857, 0.0)  # G_2
O_2 = Point(-7.259901, -24.587363, 0.0)  # O_2
Q_2 = Point(8.274423, -19.88366, 0.0)  # Q_2
R_2 = Point(13.649637, -16.798942, 0.0)  # R_2
S_2_2 = Point(37.950915, -11.265232, 0.0)  # S_2
T_2 = Point(9.793697, -33.814742, 0.0)  # T_2
P_7 = Point(-3.770216, -24.211513, 0.0)  # P_7
U_2 = Point(-9.266405, 19.629446, 0.0)  # U_2
V_2 = Point(17.447029, -55.274551, 0.0)  # V_2
W_2 = Point(-0.561026, -4.780283, 0.0)  # W_2
B_3 = Point(-29.325718, -17.455714, 0.0)  # B_3
A_3 = Point(-3.493482, -28.258286, 0.0)  # A_3
A_4 = Point(27.023247, -20.016578, 0.0)  # A_4
Z_3 = Point(48.878584, -2.513885, 0.0)  # Z_3
D_4 = Point(-18.061421, 0.76397, 0.0)  # D_4
G_4 = Point(-8.303652, -1.681735, 0.0)  # G_4
I_4 = Point(-0.653929, -4.19939, 0.0)  # I_4
J_4 = Point(10.483406, 0.403712, 0.0)  # J_4
L_4 = Point(23.575612, 13.742519, 0.0)  # L_4
N_4 = Point(37.447015, -10.610161, 0.0)  # N_4
D_3 = Point(-30.165765, -20.255476, 0.0)  # D_3
H_3 = Point(6.496264, -27.188888, 0.0)  # H_3
K_3 = Point(-16.945501, -28.945628, 0.0)  # K_3
P_8 = Point(21.449709, -15.149546, 0.0)  # P_8
O_3 = Point(-3.868146, -26.852018, 0.0)  # O_3
T_3 = Point(25.792207, -9.830584, 0.0)  # T_3
F_10 = Point(-0.000924, -19.907348, 0.0)  # F_{10}
F_9 = Point(51.601476, -8.156825, 0.0)  # F_9
P_3 = Point(-18.417197, 5.851546, 0.0)  # P_3
P_4 = Point(-8.649605, 5.910387, 0.0)  # P_4
P_5 = Point(0.323118, 2.074993, 0.0)  # P_5
W_5 = Point(11.035454, 5.473746, 0.0)  # W_5
Z_5 = Point(19.681128, 1.75949, 0.0)  # Z_5
A_6 = Point(29.764659, -0.623098, 0.0)  # A_6
B_6 = Point(77.730728, 5.743322, 0.0)  # B_6
C_6 = Point(78.33831, -5.990299, 0.0)  # C_6
D_6 = Point(77.297319, -17.517635, 0.0)  # D_6
E_6 = Point(76.020309, -27.811315, 0.0)  # E_6
G_6 = Point(79.481879, -19.14352, 0.0)  # G_6
H_6 = Point(88.573538, -23.860235, 0.0)  # H_6
L_3 = Point(10.149284, -22.71234, 0.0)  # L_3
G_3 = Point(-21.179401, -26.086537, 0.0)  # G_3
frameBL = Point(-31.988323, -59.781685, 0.0)  # frameBL
K_6 = Point(143.187143, -59.781685, 0.0)  # K_6
L_6 = Point(-31.988323, 27.806048, 0.0)  # L_6
frameTR = Point(143.187143, 27.806048, 0.0)  # frameTR
P_6 = Point(45.709542, -5.05179, 0.0)  # P_6

# --- geometry ---
S.add(H_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(S_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(-18.759021, 10.739608, 0.0), Point(-18.270701, 3.756662, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(-18.270701, 3.756662, 0.0), Point(-23.431254, 13.920528, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(-18.270701, 3.756662, 0.0), Point(-14.574982, 14.539849, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(R_1, S_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(O_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(O_1, H_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(O_6, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Z, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(26.777076, 3.260759, 0.0), Point(31.045052, -2.287609, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(31.045052, -2.287609, 0.0), Point(21.125216, 3.327758, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(31.045052, -2.287609, 0.0), Point(28.162053, 8.740709, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(V, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(11.565854, 10.344955, 0.0), Point(10.80814, 3.386085, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.80814, 3.386085, 0.0), Point(7.531746, 14.303993, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(10.80814, 3.386085, 0.0), Point(16.357482, 13.343006, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(T, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(-8.872654, 10.805308, 0.0), Point(-8.554013, 3.812564, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(-8.554013, 3.812564, 0.0), Point(-13.466283, 14.098723, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(-8.554013, 3.812564, 0.0), Point(-4.597585, 14.502847, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(U, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(1.077059, 6.916643, 0.0), Point(0.0, 0.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 0.0, 0.0), Point(-2.770639, 11.057081, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 0.0, 0.0), Point(6.001541, 9.691077, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(W, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(18.166606, -2.900577, 0.0), Point(20.330208, 3.756662, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(20.330208, 3.756662, 0.0), Point(21.306674, -7.600362, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(20.330208, 3.756662, 0.0), Point(12.863488, -4.856327, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(T_1, E_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(U_1, D_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(V_1, B_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(W_1, C_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Z_1, A_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(77.242409, 12.726269, 0.0), Point(91.774519, -28.021511, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(91.774519, -28.021511, 0.0), Point(84.06672, -19.623576, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=4.2)
S.add(Line(Point(91.774519, -28.021511, 0.0), Point(92.428754, -16.641377, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=4.2)
S.add(Line(O_1, I_1), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(O_1, J_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(O_1, L_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(O_1, K_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(O_1, M_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(O_1, N_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(G_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=3.0)
S.add(O_2, pointcolor=Color(0.502, 0.502, 0.502), pointsize=3.0)
S.add(Q_2, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(R_2, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(S_2_2, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(T_2, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(Line(G_2, O_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(O_2, P_7), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(P_7, Q_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Q_2, R_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(G_2, T_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(T_2, S_2_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(U_2, V_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(W_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(B_3, A_3), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(A_4, Z_3), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(-0.561026, -4.780283, 0.0), Point(4.141751, -17.966787, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(4.141751, -17.966787, 0.0), Point(-3.566048, -9.568852, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(4.141751, -17.966787, 0.0), Point(4.795986, -6.586653, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=4.2)
S.add(Line(Point(-18.759021, 10.739608, 0.0), Point(-18.061421, 0.76397, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(-18.061421, 0.76397, 0.0), Point(-23.221974, 10.927836, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(-18.061421, 0.76397, 0.0), Point(-14.365702, 11.547158, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(-8.872654, 10.805308, 0.0), Point(-8.303652, -1.681735, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(-8.303652, -1.681735, 0.0), Point(-13.215922, 8.604425, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(-8.303652, -1.681735, 0.0), Point(-4.347224, 9.008548, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(1.077059, 6.916643, 0.0), Point(-0.653929, -4.19939, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(-0.653929, -4.19939, 0.0), Point(-3.424568, 6.857691, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(-0.653929, -4.19939, 0.0), Point(5.347612, 5.491687, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(11.565854, 10.344955, 0.0), Point(10.483406, 0.403712, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.483406, 0.403712, 0.0), Point(7.207011, 11.32162, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(10.483406, 0.403712, 0.0), Point(16.032748, 10.360633, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(18.166606, -2.900577, 0.0), Point(23.575612, 13.742519, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(23.575612, 13.742519, 0.0), Point(24.552078, 2.385496, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(23.575612, 13.742519, 0.0), Point(16.108892, 5.129531, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(26.777076, 3.260759, 0.0), Point(37.447015, -10.610161, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(37.447015, -10.610161, 0.0), Point(27.527179, -4.994794, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(37.447015, -10.610161, 0.0), Point(34.564016, 0.418157, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(D_4, I_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(S_2, H_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(G_4, J_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(I_1, T), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(I_4, K_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(U, J_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(J_4, L_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(K_1, V), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(L_4, M_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(L_1, W), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(N_4, N_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(M_1, Z), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(D_3, H_3), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(K_3, P_8), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(O_3, T_3), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(77.242409, 12.726269, 0.0), Point(77.940008, 2.75063, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(77.940008, 2.75063, 0.0), Point(72.779455, 12.914496, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(77.940008, 2.75063, 0.0), Point(81.635727, 13.533818, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(77.940008, 2.75063, 0.0), Point(78.509011, -9.736412, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(78.509011, -9.736412, 0.0), Point(73.59674, 0.549747, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(78.509011, -9.736412, 0.0), Point(82.465438, 0.953871, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(78.509011, -9.736412, 0.0), Point(76.778023, -20.852445, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(76.778023, -20.852445, 0.0), Point(74.007383, -9.795364, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(76.778023, -20.852445, 0.0), Point(82.779564, -11.161368, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(76.778023, -20.852445, 0.0), Point(75.695574, -30.793688, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(75.695574, -30.793688, 0.0), Point(72.41918, -19.875779, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(75.695574, -30.793688, 0.0), Point(81.244916, -20.836766, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(75.695574, -30.793688, 0.0), Point(81.104581, -14.150591, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(81.104581, -14.150591, 0.0), Point(82.081047, -25.507615, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(81.104581, -14.150591, 0.0), Point(73.637861, -22.76358, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(81.104581, -14.150591, 0.0), Point(91.774519, -28.021511, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(91.774519, -28.021511, 0.0), Point(81.854684, -22.406145, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(91.774519, -28.021511, 0.0), Point(88.89152, -16.993193, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(77.242409, 12.726269, 0.0), Point(91.774519, -28.021511, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(91.774519, -28.021511, 0.0), Point(84.06672, -19.623576, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=4.2)
S.add(Line(Point(91.774519, -28.021511, 0.0), Point(92.428754, -16.641377, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=4.2)
S.add(Line(Point(77.242409, 12.726269, 0.0), Point(120.215873, -5.244453, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)  # vector
S.add(Line(Point(120.215873, -5.244453, 0.0), Point(108.817036, -5.28912, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(120.215873, -5.244453, 0.0), Point(112.242184, 2.901452, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(120.215873, -5.244453, 0.0), Point(77.940008, 2.75063, 0.0)), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)  # vector
S.add(Line(Point(77.940008, 2.75063, 0.0), Point(89.081112, 5.161292, 0.0)), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(77.940008, 2.75063, 0.0), Point(87.431392, -3.561984, 0.0)), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(77.940008, 2.75063, 0.0), Point(120.215873, -5.244453, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)  # vector
S.add(Line(Point(120.215873, -5.244453, 0.0), Point(109.074769, -7.655114, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(120.215873, -5.244453, 0.0), Point(110.724489, 1.068162, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(120.215873, -5.244453, 0.0), Point(78.509011, -9.736412, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)  # vector
S.add(Line(Point(78.509011, -9.736412, 0.0), Point(88.472406, -4.198702, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(78.509011, -9.736412, 0.0), Point(89.423085, -13.025554, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(78.509011, -9.736412, 0.0), Point(120.215873, -5.244453, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)  # vector
S.add(Line(Point(120.215873, -5.244453, 0.0), Point(110.252478, -10.782163, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(120.215873, -5.244453, 0.0), Point(109.301798, -1.955311, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(120.215873, -5.244453, 0.0), Point(76.778023, -20.852445, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)  # vector
S.add(Line(Point(76.778023, -20.852445, 0.0), Point(85.157609, -13.124702, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(76.778023, -20.852445, 0.0), Point(88.15968, -21.479622, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(76.778023, -20.852445, 0.0), Point(120.215873, -5.244453, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)  # vector
S.add(Line(Point(120.215873, -5.244453, 0.0), Point(111.836287, -12.972196, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(120.215873, -5.244453, 0.0), Point(108.834215, -4.617276, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(120.215873, -5.244453, 0.0), Point(75.695574, -30.793688, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)  # vector
S.add(Line(Point(75.695574, -30.793688, 0.0), Point(82.592283, -21.717846, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(75.695574, -30.793688, 0.0), Point(87.011167, -29.417884, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(75.695574, -30.793688, 0.0), Point(120.215873, -5.244453, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)  # vector
S.add(Line(Point(120.215873, -5.244453, 0.0), Point(113.319165, -14.320294, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(120.215873, -5.244453, 0.0), Point(108.90028, -6.620257, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(120.215873, -5.244453, 0.0), Point(81.104581, -14.150591, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)  # vector
S.add(Line(Point(81.104581, -14.150591, 0.0), Point(90.356053, -7.491331, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(81.104581, -14.150591, 0.0), Point(92.327204, -16.14764, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(81.104581, -14.150591, 0.0), Point(120.215873, -5.244453, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)  # vector
S.add(Line(Point(120.215873, -5.244453, 0.0), Point(110.964401, -11.903713, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(120.215873, -5.244453, 0.0), Point(108.99325, -3.247404, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(120.215873, -5.244453, 0.0), Point(91.774519, -28.021511, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)  # vector
S.add(Line(Point(91.774519, -28.021511, 0.0), Point(97.194801, -17.993748, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(91.774519, -28.021511, 0.0), Point(102.744342, -24.923374, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(-16.4096, -22.857, 0.0), Point(-9.951541, -25.557643, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(-9.951541, -25.557643, 0.0), Point(-21.350378, -25.60231, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(-9.951541, -25.557643, 0.0), Point(-17.925229, -17.411738, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(-16.4096, -22.857, 0.0), Point(-23.287682, -21.556238, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(-23.287682, -21.556238, 0.0), Point(-12.146579, -19.145577, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(-23.287682, -21.556238, 0.0), Point(-13.796298, -27.868853, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(-7.259901, -24.587363, 0.0), Point(-0.381818, -25.888125, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(-0.381818, -25.888125, 0.0), Point(-11.522922, -28.298787, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(-0.381818, -25.888125, 0.0), Point(-9.873203, -19.575511, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(-7.259901, -24.587363, 0.0), Point(-14.219651, -25.33695, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(-14.219651, -25.33695, 0.0), Point(-4.256256, -19.79924, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(-14.219651, -25.33695, 0.0), Point(-3.305576, -28.626092, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(-3.770216, -24.211513, 0.0), Point(-10.357859, -26.578571, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(-10.357859, -26.578571, 0.0), Point(-1.978272, -18.850828, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(-10.357859, -26.578571, 0.0), Point(1.023799, -27.205747, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(-3.770216, -24.211513, 0.0), Point(3.189534, -23.461927, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.189534, -23.461927, 0.0), Point(-6.77386, -28.999637, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(3.189534, -23.461927, 0.0), Point(-7.72454, -20.172785, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(8.274423, -19.88366, 0.0), Point(14.862066, -17.516603, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.862066, -17.516603, 0.0), Point(6.48248, -25.244346, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(14.862066, -17.516603, 0.0), Point(3.480409, -16.889426, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(8.274423, -19.88366, 0.0), Point(2.203139, -23.367839, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(2.203139, -23.367839, 0.0), Point(9.099847, -14.291998, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(2.203139, -23.367839, 0.0), Point(13.518731, -21.992035, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(13.649637, -16.798942, 0.0), Point(19.720922, -13.314763, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.720922, -13.314763, 0.0), Point(12.824214, -22.390604, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(19.720922, -13.314763, 0.0), Point(8.405329, -14.690567, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(13.649637, -16.798942, 0.0), Point(6.824357, -18.353145, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(6.824357, -18.353145, 0.0), Point(16.075829, -11.693884, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(6.824357, -18.353145, 0.0), Point(18.04698, -20.350193, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(37.950915, -11.265232, 0.0), Point(44.776196, -9.711028, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(44.776196, -9.711028, 0.0), Point(35.524724, -16.370289, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(44.776196, -9.711028, 0.0), Point(33.553572, -7.71398, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(77.242409, 12.726269, 0.0), Point(77.940008, 2.75063, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(77.940008, 2.75063, 0.0), Point(72.779455, 12.914496, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(77.940008, 2.75063, 0.0), Point(81.635727, 13.533818, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(77.940008, 2.75063, 0.0), Point(78.509011, -9.736412, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(78.509011, -9.736412, 0.0), Point(73.59674, 0.549747, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(78.509011, -9.736412, 0.0), Point(82.465438, 0.953871, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(78.509011, -9.736412, 0.0), Point(76.778023, -20.852445, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(76.778023, -20.852445, 0.0), Point(74.007383, -9.795364, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(76.778023, -20.852445, 0.0), Point(82.779564, -11.161368, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(75.695574, -30.793688, 0.0), Point(81.104581, -14.150591, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(81.104581, -14.150591, 0.0), Point(82.081047, -25.507615, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(81.104581, -14.150591, 0.0), Point(73.637861, -22.76358, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(81.104581, -14.150591, 0.0), Point(91.774519, -28.021511, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(91.774519, -28.021511, 0.0), Point(81.854684, -22.406145, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(91.774519, -28.021511, 0.0), Point(88.89152, -16.993193, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(F_10, F_9), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(S_2, P_3), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(T, P_4), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(U, P_5), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(V, W_5), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(W, Z_5), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(Z, A_6), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(H_1, B_6), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(I_1, C_6), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(J_1, D_6), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(K_1, E_6), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(L_1, G_6), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(M_1, H_6), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(L_3, G_3), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(frameBL, K_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([frameBL, L_6, frameTR, K_6]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_6, G_2), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(P_6, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(S_2_2, P_6), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)

if __name__ == "__main__":
    viewer.show()
