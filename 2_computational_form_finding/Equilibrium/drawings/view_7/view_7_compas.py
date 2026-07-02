"""
COMPAS translation of GeoGebra applet: Funicular Line Through Three Points 1
Source: https://block.arch.ethz.ch/eq/drawing/view/7
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
A = Point(0.0, 0.0, 0.0)  # A
B = Point(0.0, 15.0, 0.0)  # B
C = Point(40.0, 0.0, 0.0)  # C
D = Point(40.0, 15.0, 0.0)  # D
E = Point(0.0, 12.563712, 0.0)  # E
F = Point(40.0, 11.851887, 0.0)  # F
K = Point(20.0, 19.6, 0.0)  # K
I = Point(20.0, 0.0, 0.0)  # I
N = Point(20.0, 3.705453, 0.0)  # N
I_1 = Point(62.403771, 24.822908, 0.0)  # I_1
R_1 = Point(5.28963, 23.58863, 0.0)  # R_1
S_1 = Point(15.229276, 23.598535, 0.0)  # S_1
T_1 = Point(25.511208, 23.5384, 0.0)  # T_1
U_1 = Point(35.701529, 23.580273, 0.0)  # U_1
W_1 = Point(62.89702, 10.909062, 0.0)  # W_1
Z_1 = Point(80.779898, 14.541001, 0.0)  # Z_1
V_1 = Point(63.044214, 16.34707, 0.0)  # V_1
C_2 = Point(4.783495, 30.286996, 0.0)  # C_2
D_2 = Point(7.849817, -10.293759, 0.0)  # D_2
E_2 = Point(15.410316, 30.286996, 0.0)  # E_2
K_2 = Point(14.311894, -10.293759, 0.0)  # K_2
G_2 = Point(24.312944, 30.286996, 0.0)  # G_2
H_2 = Point(31.518358, -10.293759, 0.0)  # H_2
I_2 = Point(36.370076, 30.286996, 0.0)  # I_2
J_2 = Point(32.324856, -10.293759, 0.0)  # J_2
V_2 = Point(63.453049, -1.202948, 0.0)  # V_2
Z_2 = Point(80.779898, 5.445468, 0.0)  # Z_2
U_2 = Point(64.026377, 4.548547, 0.0)  # U_2
Q_2 = Point(-0.628295, 30.286996, 0.0)  # Q_2
P_5 = Point(0.810303, -10.293759, 0.0)  # P_5
W_2 = Point(0.420898, 0.690789, 0.0)  # W_2
B_3 = Point(7.31112, -3.164464, 0.0)  # B_3
C_3 = Point(14.485093, -3.895007, 0.0)  # C_3
D_3 = Point(20.22809, -2.728628, 0.0)  # D_3
R_2 = Point(19.057678, 30.286996, 0.0)  # R_2
S_2 = Point(20.496275, -10.293759, 0.0)  # S_2
G_3 = Point(20.642665, -10.293759, 0.0)  # G_3
E_3 = Point(18.779715, 30.286996, 0.0)  # E_3
J_3 = Point(20.283073, -2.460748, 0.0)  # J_3
K_3 = Point(30.692219, -5.640959, 0.0)  # K_3
L_3 = Point(32.79991, -5.528122, 0.0)  # L_3
M_3 = Point(40.659424, -2.512378, 0.0)  # M_3
H_3 = Point(39.153695, 30.286996, 0.0)  # H_3
I_3 = Point(41.016645, -10.293759, 0.0)  # I_3
N_3 = Point(63.145788, 5.490151, 0.0)  # N_3
O_3 = Point(62.657358, 17.669589, 0.0)  # O_3
P_6 = Point(77.216147, 11.221313, 0.0)  # P_6
Q_3 = Point(6.579177, 6.522324, 0.0)  # Q_3
R_3 = Point(14.687683, 3.58961, 0.0)  # R_3
S_3 = Point(28.997855, 3.901666, 0.0)  # S_3
T_3 = Point(33.991744, 6.428098, 0.0)  # T_3
frameBL = Point(-7.157361, -13.694697, 0.0)  # frameBL
P_2 = Point(87.581884, -13.694697, 0.0)  # P_2
P_1 = Point(-7.157361, 33.674925, 0.0)  # P_1
frameTR = Point(87.581884, 33.674925, 0.0)  # frameTR

# --- geometry ---
S.add(Line(A, B), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(C, D), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(E, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(F, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(K, I), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(N, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(E, N), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N, F), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(I_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(R_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(S_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(T_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(U_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(5.28963, 23.58863, 0.0), Point(5.591015, 19.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.591015, 19.6, 0.0), Point(3.578968, 23.508403, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.591015, 19.6, 0.0), Point(6.992925, 23.766365, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.229276, 23.598535, 0.0), Point(15.121045, 19.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.121045, 19.6, 0.0), Point(13.519381, 23.693729, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.121045, 19.6, 0.0), Point(16.941816, 23.601092, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(25.511208, 23.5384, 0.0), Point(26.2105, 19.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(26.2105, 19.6, 0.0), Point(23.817178, 23.28727, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(26.2105, 19.6, 0.0), Point(27.188142, 23.885809, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.701529, 23.580273, 0.0), Point(35.304762, 19.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.304762, 19.6, 0.0), Point(34.002976, 23.798726, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.304762, 19.6, 0.0), Point(37.409781, 23.459125, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(I_1, W_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Z_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Z_1, I_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Z_1, V_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Z_1, W_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(C_2, D_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(E_2, K_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(G_2, H_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(I_2, J_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(V_2, W_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Z_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Z_2, W_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Z_2, U_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Z_2, V_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Q_2, P_5), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(W_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(B_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(C_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(D_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(W_2, D_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(W_2, B_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(B_3, C_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(C_3, D_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(R_2, S_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(G_3, E_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(J_3, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(K_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(L_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(M_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(J_3, M_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(J_3, K_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(K_3, L_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(L_3, M_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(H_3, I_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(N_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(O_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(P_6, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(P_6, O_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_6, N_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_3, Z_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(N_3, Z_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(P_6, I_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_6, V_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_6, W_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_6, U_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_6, V_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Q_3, pointcolor=Color(0.502, 0.502, 0.502), pointsize=3.0)
S.add(R_3, pointcolor=Color(0.502, 0.502, 0.502), pointsize=3.0)
S.add(S_3, pointcolor=Color(0.502, 0.502, 0.502), pointsize=3.0)
S.add(T_3, pointcolor=Color(0.7529, 0.7529, 0.7529), pointsize=3.0)
S.add(Line(E, Q_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_3, R_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_3, N), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N, S_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_3, T_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_3, F), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([E, Q_3, I_1, P_6]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([Q_3, R_3, V_1, P_6]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([R_3, N, W_1, P_6]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([N, S_3, W_1, P_6]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([S_3, T_3, U_2, P_6]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([T_3, F, V_2, P_6]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Line(Point(63.453049, -1.202948, 0.0), Point(77.216147, 11.221313, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(77.216147, 11.221313, 0.0), Point(75.357775, 7.237547, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(77.216147, 11.221313, 0.0), Point(73.063627, 9.778911, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(-4.0, 12.563712, 0.0), Point(0.0, 12.563712, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 12.563712, 0.0), Point(-4.048893, 10.851867, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 12.563712, 0.0), Point(-4.048893, 14.275556, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(44.0, 11.851887, 0.0), Point(40.0, 11.851887, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(40.0, 11.851887, 0.0), Point(44.048893, 13.563732, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(40.0, 11.851887, 0.0), Point(44.048893, 10.140043, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(77.216147, -1.202948, 0.0), Point(77.216147, 11.221313, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(77.216147, 11.221313, 0.0), Point(78.927991, 7.17242, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(77.216147, 11.221313, 0.0), Point(75.504302, 7.17242, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(77.216147, 24.822908, 0.0), Point(62.403771, 24.822908, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(62.403771, 24.822908, 0.0), Point(66.452664, 26.534753, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(62.403771, 24.822908, 0.0), Point(66.452664, 23.111064, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(63.453049, -1.202948, 0.0), Point(77.216147, -1.202948, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(77.216147, -1.202948, 0.0), Point(73.167254, -2.914793, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(77.216147, -1.202948, 0.0), Point(73.167254, 0.508896, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(40.0, 7.851887, 0.0), Point(40.0, 11.851887, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(40.0, 11.851887, 0.0), Point(41.711844, 7.802994, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(40.0, 11.851887, 0.0), Point(38.288156, 7.802994, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 8.563712, 0.0), Point(0.0, 12.563712, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 12.563712, 0.0), Point(1.711844, 8.514819, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 12.563712, 0.0), Point(-1.711844, 8.514819, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(40.0, 11.851887, 0.0), Point(42.969153, 14.53221, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(42.969153, 14.53221, 0.0), Point(41.110781, 10.548443, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(42.969153, 14.53221, 0.0), Point(38.816634, 13.089807, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 12.563712, 0.0), Point(-2.946279, 15.269158, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(-2.946279, 15.269158, 0.0), Point(1.193839, 13.791535, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(-2.946279, 15.269158, 0.0), Point(-1.121813, 11.26975, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(62.403771, 24.822908, 0.0), Point(63.044214, 16.34707, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(63.044214, 16.34707, 0.0), Point(61.032167, 20.255473, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(63.044214, 16.34707, 0.0), Point(64.446124, 20.513435, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(63.044214, 16.34707, 0.0), Point(62.89702, 10.909062, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(62.89702, 10.909062, 0.0), Point(61.295356, 15.002791, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(62.89702, 10.909062, 0.0), Point(64.717792, 14.910154, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(62.89702, 10.909062, 0.0), Point(64.026377, 4.548547, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(64.026377, 4.548547, 0.0), Point(61.633055, 8.235816, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(64.026377, 4.548547, 0.0), Point(65.004019, 8.834356, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(64.026377, 4.548547, 0.0), Point(63.453049, -1.202948, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(63.453049, -1.202948, 0.0), Point(62.151263, 2.995778, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(63.453049, -1.202948, 0.0), Point(65.558068, 2.656176, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(frameBL, P_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([frameBL, P_1, frameTR, P_2]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)

if __name__ == "__main__":
    viewer.show()
