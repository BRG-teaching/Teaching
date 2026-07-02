"""
COMPAS translation of GeoGebra applet: Funicular Line Through Two Points 1
Source: https://block.arch.ethz.ch/eq/drawing/view/5
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
I = Point(95.627374, 65.855016, 0.0)  # I
M = Point(117.0, 52.0, 0.0)  # M
L = Point(96.394825, 34.028227, 0.0)  # L
T_1 = Point(3.718709, 76.010595, 0.0)  # T_1
B_2 = Point(5.13689, 17.197519, 0.0)  # B_2
H_3 = Point(5.036587, 21.357168, 0.0)  # H_3
K = Point(98.689384, 45.501021, 0.0)  # K
P = Point(6.774614, 22.87307, 0.0)  # P
Q = Point(21.612099, 28.139332, 0.0)  # Q
R = Point(46.217621, 24.828781, 0.0)  # R
U = Point(24.877744, 38.662567, 0.0)  # U
E_3 = Point(3.991445, 64.700035, 0.0)  # E_3
A_2 = Point(51.863452, 76.010595, 0.0)  # A_2
G_2 = Point(53.281633, 17.197519, 0.0)  # G_2
G_3 = Point(52.172116, 63.210051, 0.0)  # G_3
S_2 = Point(53.206871, 20.297931, 0.0)  # S
T = Point(5.036587, 21.357168, 0.0)  # T
V = Point(24.704909, 45.830205, 0.0)  # V
E_1 = Point(95.950304, 52.462871, 0.0)  # E_1
G_1 = Point(72.542575, 53.186753, 0.0)  # G_1
J = Point(98.437482, 54.497495, 0.0)  # J
H_1 = Point(13.596947, 56.984735, 0.0)  # H_1
I_1 = Point(20.864241, 54.848548, 0.0)  # I_1
J_1 = Point(38.568325, 55.744688, 0.0)  # J_1
M_1 = Point(24.650014, 48.106726, 0.0)  # M_1
C_2 = Point(5.639504, 17.197519, 0.0)  # C_2
U_1 = Point(17.402119, 76.010595, 0.0)  # U_1
D_2 = Point(21.918469, 17.197519, 0.0)  # D_2
W_1 = Point(20.271703, 76.010595, 0.0)  # W_1
E_2 = Point(25.395339, 17.197519, 0.0)  # E_2
V_1 = Point(23.977158, 76.010595, 0.0)  # V_1
Z_1 = Point(33.55408, 76.010595, 0.0)  # Z_1
H_2 = Point(48.105769, 17.197519, 0.0)  # H_2
frameBL = Point(-5.947148, 14.853924, 0.0)  # frameBL
I_3 = Point(126.614315, 14.853924, 0.0)  # I_3
J_3 = Point(-5.947148, 81.134655, 0.0)  # J_3
frameTR = Point(126.614315, 81.134655, 0.0)  # frameTR
T_3 = Point(95.338719, 66.381018, 0.0)  # T_3
Q_3 = Point(72.25392, 53.712756, 0.0)  # Q_3
P_3 = Point(72.166841, 52.718967, 0.0)  # P_3
S_3 = Point(96.019091, 33.56044, 0.0)  # S_3

# --- geometry ---
S.add(I, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(M, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(L, M), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(T_1, B_2), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(H_3, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(K, M), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(P, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Q, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(R, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(U, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(E_3, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(A_2, G_2), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(G_3, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(95.627374, 65.855016, 0.0), Point(98.437482, 54.497495, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(98.437482, 54.497495, 0.0), Point(94.751646, 59.421679, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(98.437482, 54.497495, 0.0), Point(99.401929, 60.572264, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(98.437482, 54.497495, 0.0), Point(98.689384, 45.501021, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(98.689384, 45.501021, 0.0), Point(96.136501, 51.09707, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(98.689384, 45.501021, 0.0), Point(100.925133, 51.231152, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(98.689384, 45.501021, 0.0), Point(96.394825, 34.028227, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(96.394825, 34.028227, 0.0), Point(95.157143, 40.053268, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(96.394825, 34.028227, 0.0), Point(99.854624, 39.113772, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(95.627374, 65.855016, 0.0), Point(96.394825, 34.028227, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(96.394825, 34.028227, 0.0), Point(93.863696, 39.634149, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=4.2)
S.add(Line(Point(96.394825, 34.028227, 0.0), Point(98.652813, 39.749631, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=4.2)
S.add(S_2, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(T, S_2), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(T, P), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(P, Q), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(V, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(E_1, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(Line(E_1, M), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(E_3, G_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(G_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(E_1, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
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
S.add(M_1, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Line(H_1, M_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_1, J_1), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(C_2, U_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(D_2, W_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(E_2, V_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(Z_1, H_2), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Polygon([I_1, J_1, G_1, J]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([J_1, G_3, G_1, I]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([H_1, I_1, G_1, K]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([E_3, H_1, G_1, L]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Line(Point(96.394825, 34.028227, 0.0), Point(72.542575, 53.186753, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(72.542575, 53.186753, 0.0), Point(78.459463, 51.506451, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(72.542575, 53.186753, 0.0), Point(75.459536, 47.77156, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(72.542575, 53.186753, 0.0), Point(98.689384, 45.501021, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(98.689384, 45.501021, 0.0), Point(92.578532, 44.800686, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(98.689384, 45.501021, 0.0), Point(93.929523, 49.39675, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(98.689384, 45.501021, 0.0), Point(72.542575, 53.186753, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(72.542575, 53.186753, 0.0), Point(78.653427, 53.887087, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(72.542575, 53.186753, 0.0), Point(77.302435, 49.291024, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(72.542575, 53.186753, 0.0), Point(98.437482, 54.497495, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(98.437482, 54.497495, 0.0), Point(92.900504, 51.818904, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(98.437482, 54.497495, 0.0), Point(92.658329, 56.603288, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(98.437482, 54.497495, 0.0), Point(72.542575, 53.186753, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(72.542575, 53.186753, 0.0), Point(78.079553, 55.865344, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(72.542575, 53.186753, 0.0), Point(78.321728, 51.08096, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(72.542575, 53.186753, 0.0), Point(95.627374, 65.855016, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(95.627374, 65.855016, 0.0), Point(91.813099, 61.029636, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(95.627374, 65.855016, 0.0), Point(89.508428, 65.229335, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(24.704909, 45.830205, 0.0), Point(24.945972, 35.833111, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(24.945972, 35.833111, 0.0), Point(22.414844, 41.439034, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=4.2)
S.add(Line(Point(24.945972, 35.833111, 0.0), Point(27.203961, 41.554515, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=4.2)
S.add(Line(Point(13.0, 54.0, 0.0), Point(12.019419, 49.097097, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.019419, 49.097097, 0.0), Point(10.781738, 55.122138, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.019419, 49.097097, 0.0), Point(15.479218, 54.182642, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 50.0, 0.0), Point(21.139945, 45.001959, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.139945, 45.001959, 0.0), Point(18.587062, 50.598008, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.139945, 45.001959, 0.0), Point(23.375695, 50.73209, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(39.0, 54.0, 0.0), Point(40.200901, 49.146358, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(40.200901, 49.146358, 0.0), Point(36.515064, 54.070542, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(40.200901, 49.146358, 0.0), Point(41.165347, 55.221128, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.596947, 56.984735, 0.0), Point(18.393998, 55.574664, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(18.393998, 55.574664, 0.0), Point(12.283146, 54.87433, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(18.393998, 55.574664, 0.0), Point(13.634138, 59.470393, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(20.864241, 54.848548, 0.0), Point(16.067189, 56.258618, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.067189, 56.258618, 0.0), Point(22.178041, 56.958953, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(16.067189, 56.258618, 0.0), Point(20.82705, 52.362889, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(20.864241, 54.848548, 0.0), Point(25.857848, 55.101313, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(25.857848, 55.101313, 0.0), Point(20.320869, 52.422722, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(25.857848, 55.101313, 0.0), Point(20.078694, 57.207106, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(38.568325, 55.744688, 0.0), Point(33.574718, 55.491923, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(33.574718, 55.491923, 0.0), Point(39.111696, 58.170513, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(33.574718, 55.491923, 0.0), Point(39.353871, 53.38613, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(frameBL, I_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([frameBL, J_3, frameTR, I_3]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(3.991445, 64.700035, 0.0), Point(0.093225, 67.83115, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.093225, 67.83115, 0.0), Point(6.010113, 66.150848, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)
S.add(Line(Point(0.093225, 67.83115, 0.0), Point(3.010186, 62.415957, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)
S.add(Line(Point(52.172116, 63.210051, 0.0), Point(56.555469, 65.615507, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(56.555469, 65.615507, 0.0), Point(52.741194, 60.790127, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)
S.add(Line(Point(56.555469, 65.615507, 0.0), Point(50.436523, 64.989826, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)
S.add(Line(Point(38.568325, 55.744688, 0.0), Point(42.951677, 58.150144, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(42.951677, 58.150144, 0.0), Point(39.137403, 53.324764, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(42.951677, 58.150144, 0.0), Point(36.832731, 57.524463, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(13.596947, 56.984735, 0.0), Point(9.698727, 60.11585, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.698727, 60.11585, 0.0), Point(15.615615, 58.435548, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(9.698727, 60.11585, 0.0), Point(12.615688, 54.700657, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(E_3, H_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(H_1, I_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(I_1, J_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(J_1, G_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(H_1, M_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(M_1, J_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(G_1, I), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(G_1, J), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(G_1, K), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(G_1, L), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(3.991445, 64.700035, 0.0), Point(0.093225, 67.83115, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.093225, 67.83115, 0.0), Point(6.010113, 66.150848, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(0.093225, 67.83115, 0.0), Point(3.010186, 62.415957, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(52.172116, 63.210051, 0.0), Point(56.555469, 65.615507, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(56.555469, 65.615507, 0.0), Point(52.741194, 60.790127, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(56.555469, 65.615507, 0.0), Point(50.436523, 64.989826, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 54.0, 0.0), Point(12.019419, 49.097097, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.019419, 49.097097, 0.0), Point(10.781738, 55.122138, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(12.019419, 49.097097, 0.0), Point(15.479218, 54.182642, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 50.0, 0.0), Point(21.139945, 45.001959, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.139945, 45.001959, 0.0), Point(18.587062, 50.598008, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(21.139945, 45.001959, 0.0), Point(23.375695, 50.73209, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(24.704909, 45.830205, 0.0), Point(24.945972, 35.833111, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(24.945972, 35.833111, 0.0), Point(22.414844, 41.439034, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(24.945972, 35.833111, 0.0), Point(27.203961, 41.554515, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(39.0, 54.0, 0.0), Point(40.200901, 49.146358, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(40.200901, 49.146358, 0.0), Point(36.515064, 54.070542, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(40.200901, 49.146358, 0.0), Point(41.165347, 55.221128, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(98.689384, 45.501021, 0.0), Point(96.394825, 34.028227, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(96.394825, 34.028227, 0.0), Point(95.157143, 40.053268, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(96.394825, 34.028227, 0.0), Point(99.854624, 39.113772, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(98.437482, 54.497495, 0.0), Point(98.689384, 45.501021, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(98.689384, 45.501021, 0.0), Point(96.136501, 51.09707, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(98.689384, 45.501021, 0.0), Point(100.925133, 51.231152, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(95.627374, 65.855016, 0.0), Point(98.437482, 54.497495, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(98.437482, 54.497495, 0.0), Point(94.751646, 59.421679, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(98.437482, 54.497495, 0.0), Point(99.401929, 60.572264, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(95.627374, 65.855016, 0.0), Point(96.394825, 34.028227, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(96.394825, 34.028227, 0.0), Point(93.863696, 39.634149, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(96.394825, 34.028227, 0.0), Point(98.652813, 39.749631, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(96.394825, 34.028227, 0.0), Point(72.542575, 53.186753, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(72.542575, 53.186753, 0.0), Point(78.459463, 51.506451, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(72.542575, 53.186753, 0.0), Point(75.459536, 47.77156, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(72.542575, 53.186753, 0.0), Point(95.627374, 65.855016, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(95.627374, 65.855016, 0.0), Point(91.813099, 61.029636, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(95.627374, 65.855016, 0.0), Point(89.508428, 65.229335, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(72.542575, 53.186753, 0.0), Point(96.394825, 34.028227, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(96.394825, 34.028227, 0.0), Point(90.477937, 35.708529, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(96.394825, 34.028227, 0.0), Point(93.477864, 39.44342, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(95.627374, 65.855016, 0.0), Point(72.542575, 53.186753, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(72.542575, 53.186753, 0.0), Point(76.356849, 58.012133, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(72.542575, 53.186753, 0.0), Point(78.661521, 53.812435, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(3.991445, 64.700035, 0.0), Point(7.889664, 61.56892, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.889664, 61.56892, 0.0), Point(1.972776, 63.249221, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(7.889664, 61.56892, 0.0), Point(4.972704, 66.984113, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(52.172116, 63.210051, 0.0), Point(47.788763, 60.804595, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(47.788763, 60.804595, 0.0), Point(51.603038, 65.629975, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(47.788763, 60.804595, 0.0), Point(53.907709, 61.430277, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(24.650014, 48.106726, 0.0), Point(24.891078, 38.109632, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(24.891078, 38.109632, 0.0), Point(22.359949, 43.715555, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(24.891078, 38.109632, 0.0), Point(27.149066, 43.831037, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(24.650014, 48.106726, 0.0), Point(20.751794, 51.237842, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(20.751794, 51.237842, 0.0), Point(26.668682, 49.55754, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(20.751794, 51.237842, 0.0), Point(23.668755, 45.822648, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(24.650014, 48.106726, 0.0), Point(29.033367, 50.512182, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(29.033367, 50.512182, 0.0), Point(25.219092, 45.686802, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(29.033367, 50.512182, 0.0), Point(22.914421, 49.886501, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(96.019091, 33.56044, 0.0), Point(72.166841, 52.718967, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(72.166841, 52.718967, 0.0), Point(78.083729, 51.038665, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)
S.add(Line(Point(72.166841, 52.718967, 0.0), Point(75.083802, 47.303774, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)
S.add(Line(Point(72.25392, 53.712756, 0.0), Point(95.338719, 66.381018, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(95.338719, 66.381018, 0.0), Point(91.524445, 61.555639, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)
S.add(Line(Point(95.338719, 66.381018, 0.0), Point(89.219773, 65.755337, 0.0)), linecolor=Color(0.0, 0.502, 0.0), linewidth=3.0)
S.add(Line(I, T_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_1, Q_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_1, P_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L, S_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(96.019091, 33.56044, 0.0), Point(72.166841, 52.718967, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(72.166841, 52.718967, 0.0), Point(78.083729, 51.038665, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(72.166841, 52.718967, 0.0), Point(75.083802, 47.303774, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(72.25392, 53.712756, 0.0), Point(95.338719, 66.381018, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(95.338719, 66.381018, 0.0), Point(91.524445, 61.555639, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(95.338719, 66.381018, 0.0), Point(89.219773, 65.755337, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)

if __name__ == "__main__":
    viewer.show()
