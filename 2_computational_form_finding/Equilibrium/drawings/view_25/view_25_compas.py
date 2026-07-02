"""
COMPAS translation of GeoGebra applet: Tree structure
Source: https://block.arch.ethz.ch/eq/drawing/view/25
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
F_0 = Point(15.5, 10.0, 0.0)  # F_0
D = Point(7.0, 3.0, 0.0)  # D
N_5 = Point(7.0, 6.5, 0.0)  # N_5
M_5 = Point(7.0, 3.1, 0.0)  # M_5
O_5 = Point(3.0, 10.0, 0.0)  # O_5
G_5 = Point(3.0, 6.0, 0.0)  # G_5
edgeleft = Point(3.0, 7.25, 0.0)  # edgeleft
edgeright = Point(11.0, 9.75, 0.0)  # edgeright
C = Point(3.571429, 7.428571, 0.0)  # C
M = Point(4.714286, 7.785714, 0.0)  # M
Base = Point(7.0, 4.5, 0.0)  # Base
T = Point(9.285714, 9.214286, 0.0)  # T
frameBL = Point(1.8, 1.6, 0.0)  # frameBL
fBR = Point(22.508495, 1.6, 0.0)  # fBR
frameTR = Point(22.508495, 11.954247, 0.0)  # frameTR
fTL = Point(1.8, 11.954247, 0.0)  # fTL
ground_1 = Point(6.0, 3.0, 0.0)  # ground_1
ground = Point(8.0, 3.0, 0.0)  # ground
N = Point(5.285714, 7.964286, 0.0)  # N
O = Point(5.857143, 8.142857, 0.0)  # O
Q = Point(7.571429, 8.678571, 0.0)  # Q
R = Point(8.142857, 8.857143, 0.0)  # R
S_2 = Point(8.714286, 9.035714, 0.0)  # S
V = Point(10.428571, 9.571429, 0.0)  # V
I_1 = Point(6.238095, 5.595238, 0.0)  # I_1
J_1 = Point(7.761905, 6.071429, 0.0)  # J_1
T_1 = Point(4.904762, 6.511905, 0.0)  # T_1
U_1 = Point(6.047619, 6.869048, 0.0)  # U_1
V_1 = Point(7.952381, 7.464286, 0.0)  # V_1
W_1 = Point(9.095238, 7.821429, 0.0)  # W_1
Z_1 = Point(17.385714, 7.289286, 0.0)  # Z_1
F_8 = Point(15.5, 3.4, 0.0)  # F_8
B_2 = Point(17.15, 8.865625, 0.0)  # B_2
C_2 = Point(17.15, 5.565625, 0.0)  # C_2
F = Point(4.142857, 7.607143, 0.0)  # F
P = Point(6.428571, 8.321429, 0.0)  # P
U = Point(9.857143, 9.392857, 0.0)  # U
A_2 = Point(16.678571, 9.543304, 0.0)  # A_2
D_2 = Point(17.621429, 8.187946, 0.0)  # D_2
E_2 = Point(17.621429, 6.537946, 0.0)  # E_2
G_2 = Point(16.678571, 4.593304, 0.0)  # G_2
F_4 = Point(15.5, 6.7, 0.0)  # F_4
L_2 = Point(15.118208, 6.58069, 0.0)  # L_2
M_2 = Point(17.767506, 7.408596, 0.0)  # M_2
F_2 = Point(15.5, 8.35, 0.0)  # F_2
F_6 = Point(15.5, 5.05, 0.0)  # F_6
N_2 = Point(15.118208, 8.23069, 0.0)  # N_2
O_2 = Point(17.531792, 8.984935, 0.0)  # O_2
P_2 = Point(15.118208, 4.93069, 0.0)  # P_2
Q_2 = Point(17.531792, 5.684935, 0.0)  # Q_2
T_2 = Point(15.118208, 7.40569, 0.0)  # T_2
U_2 = Point(18.003221, 8.307256, 0.0)  # U_2
V_2 = Point(15.118208, 5.75569, 0.0)  # V_2
W_2 = Point(18.003221, 6.657256, 0.0)  # W_2
Z_2 = Point(15.118208, 4.10569, 0.0)  # Z_2
A_3 = Point(17.060363, 4.712614, 0.0)  # A_3
F_1 = Point(15.5, 9.175, 0.0)  # F_1
F_3 = Point(15.5, 7.525, 0.0)  # F_3
F_5 = Point(15.5, 5.875, 0.0)  # F_5
F_7 = Point(15.5, 4.225, 0.0)  # F_7
B_3 = Point(15.0, 10.0, 0.0)  # B_3
C_3 = Point(15.0, 3.4, 0.0)  # C_3
A_5 = Point(3.381792, 6.035977, 0.0)  # A_5
C_5 = Point(10.618208, 8.297357, 0.0)  # C_5
B_5 = Point(3.381792, 4.702643, 0.0)  # B_5
D_5 = Point(10.618208, 6.964023, 0.0)  # D_5
R_2 = Point(15.118208, 9.05569, 0.0)  # R_2
S_2_2 = Point(17.060363, 9.662614, 0.0)  # S_2
J_5 = Point(3.0, 8.95, 0.0)  # J_5
I_5 = Point(3.0, 8.45, 0.0)  # I_5
L_5 = Point(11.0, 10.95, 0.0)  # L_5
K_5 = Point(11.0, 11.45, 0.0)  # K_5
R_5 = Point(3.381792, 3.36931, 0.0)  # R_5
S_5 = Point(10.618208, 5.63069, 0.0)  # S_5
T_5 = Point(7.0, 8.5, 0.0)  # T_5
U_5 = Point(15.5, 10.0, 0.0)  # U_5
V_5 = Point(15.5, 3.4, 0.0)  # V_5

# --- geometry ---
S.add(F_0, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(D, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(N_5, M_5), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(O_5, G_5), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(edgeleft, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(edgeright, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(C, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(M, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Base, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(T, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Polyline([frameBL, fBR, frameTR, fTL, frameBL]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(ground_1, ground), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(edgeleft, edgeright), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(N, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(O, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Q, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(R, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(S_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(V, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(I_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(J_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(T_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(U_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(V_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(W_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(F_0, Z_1), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(F_8, Z_1), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(F_0, B_2), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(B_2, Z_1), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(Z_1, C_2), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(C_2, F_8), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(edgeleft, T_1), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(T_1, F), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(N, U_1), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(U_1, P), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(Q, V_1), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(V_1, S_2), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(U, W_1), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(W_1, edgeright), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(F_0, A_2), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(A_2, B_2), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(B_2, D_2), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(D_2, Z_1), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(Z_1, E_2), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(E_2, C_2), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(C_2, G_2), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(G_2, F_8), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(F_4, Z_1), linecolor=Color(0.8549, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_1, C), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(I_1, O), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(J_1, R), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(J_1, V), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(T_1, I_1), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(I_1, U_1), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(V_1, J_1), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(J_1, W_1), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(M, T), linecolor=Color(0.8549, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_1, C), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.0)
S.add(Line(U_1, O), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.0)
S.add(Line(V_1, R), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.0)
S.add(Line(W_1, V), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.0)
S.add(Line(M, I_1), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.0)
S.add(Line(T, J_1), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.0)
S.add(Line(L_2, M_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_2, B_2), linecolor=Color(0.8549, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_6, C_2), linecolor=Color(0.8549, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_2, O_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_2, Q_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_2, U_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V_2, W_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_2, A_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_1, A_2), linecolor=Color(0.8549, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_3, D_2), linecolor=Color(0.8549, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_5, E_2), linecolor=Color(0.8549, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_7, G_2), linecolor=Color(0.8549, 0.0, 0.0), linewidth=1.2)
S.add(Line(edgeleft, F), linecolor=Color(0.8549, 0.0, 0.0), linewidth=1.2)
S.add(Line(F, N), linecolor=Color(0.8549, 0.0, 0.0), linewidth=1.2)
S.add(Line(N, P), linecolor=Color(0.8549, 0.0, 0.0), linewidth=1.2)
S.add(Line(P, Q), linecolor=Color(0.8549, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q, S_2), linecolor=Color(0.8549, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_2, U), linecolor=Color(0.8549, 0.0, 0.0), linewidth=1.2)
S.add(Line(U, edgeright), linecolor=Color(0.8549, 0.0, 0.0), linewidth=1.2)
S.add(Line(C, O), linecolor=Color(0.8549, 0.0, 0.0), linewidth=1.2)
S.add(Line(O, R), linecolor=Color(0.8549, 0.0, 0.0), linewidth=1.2)
S.add(Line(R, V), linecolor=Color(0.8549, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(15.5, 10.0, 0.0), Point(15.5, 3.4, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 3.4, 0.0), Point(15.125818, 4.285024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 3.4, 0.0), Point(15.874182, 4.285024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.0, 3.4, 0.0), Point(15.0, 10.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.0, 10.0, 0.0), Point(15.374182, 9.114976, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.0, 10.0, 0.0), Point(14.625818, 9.114976, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(F_0, B_3), linecolor=Color(0.0, 0.3922, 0.0), linewidth=1.2)
S.add(Line(F_8, C_3), linecolor=Color(0.0, 0.3922, 0.0), linewidth=1.2)
S.add(Line(Point(7.0, 9.3, 0.0), Point(7.0, 8.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.0, 8.6, 0.0), Point(6.625818, 9.485024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 8.6, 0.0), Point(7.374182, 9.485024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.714286, 8.585714, 0.0), Point(4.714286, 7.885714, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.714286, 7.885714, 0.0), Point(4.340104, 8.770738, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.714286, 7.885714, 0.0), Point(5.088468, 8.770738, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.285714, 10.014286, 0.0), Point(9.285714, 9.314286, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.285714, 9.314286, 0.0), Point(8.911532, 10.199309, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.285714, 9.314286, 0.0), Point(9.659896, 10.199309, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.571429, 8.228571, 0.0), Point(3.571429, 7.528571, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.571429, 7.528571, 0.0), Point(3.197247, 8.413595, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.571429, 7.528571, 0.0), Point(3.945611, 8.413595, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.857143, 8.942857, 0.0), Point(5.857143, 8.242857, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.857143, 8.242857, 0.0), Point(5.482961, 9.127881, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.857143, 8.242857, 0.0), Point(6.231325, 9.127881, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.142857, 9.657143, 0.0), Point(8.142857, 8.957143, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.142857, 8.957143, 0.0), Point(7.768675, 9.842167, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.142857, 8.957143, 0.0), Point(8.517039, 9.842167, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.428571, 10.371429, 0.0), Point(10.428571, 9.671429, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.428571, 9.671429, 0.0), Point(10.054389, 10.556452, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.428571, 9.671429, 0.0), Point(10.802753, 10.556452, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 8.05, 0.0), Point(3.0, 7.35, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.0, 7.35, 0.0), Point(2.625818, 8.235024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 7.35, 0.0), Point(3.374182, 8.235024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.142857, 8.407143, 0.0), Point(4.142857, 7.707143, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.142857, 7.707143, 0.0), Point(3.768675, 8.592167, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.142857, 7.707143, 0.0), Point(4.517039, 8.592167, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.285714, 8.764286, 0.0), Point(5.285714, 8.064286, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.285714, 8.064286, 0.0), Point(4.911532, 8.949309, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.285714, 8.064286, 0.0), Point(5.659896, 8.949309, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.428571, 9.121429, 0.0), Point(6.428571, 8.421429, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(6.428571, 8.421429, 0.0), Point(6.054389, 9.306452, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.428571, 8.421429, 0.0), Point(6.802753, 9.306452, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.571429, 9.478571, 0.0), Point(7.571429, 8.778571, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.571429, 8.778571, 0.0), Point(7.197247, 9.663595, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.571429, 8.778571, 0.0), Point(7.945611, 9.663595, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.714286, 9.835714, 0.0), Point(8.714286, 9.135714, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.714286, 9.135714, 0.0), Point(8.340104, 10.020738, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.714286, 9.135714, 0.0), Point(9.088468, 10.020738, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.857143, 10.192857, 0.0), Point(9.857143, 9.492857, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.857143, 9.492857, 0.0), Point(9.482961, 10.377881, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.857143, 9.492857, 0.0), Point(10.231325, 10.377881, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 10.55, 0.0), Point(11.0, 9.85, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.0, 9.85, 0.0), Point(10.625818, 10.735024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 9.85, 0.0), Point(11.374182, 10.735024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 2.1, 0.0), Point(7.0, 2.9, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.0, 2.9, 0.0), Point(7.374182, 2.014976, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 2.9, 0.0), Point(6.625818, 2.014976, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(A_5, C_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(B_5, D_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Circle.from_point_and_radius(Point(7.0, 8.561514, 0.0), 3.095666), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_2, S_2_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([J_5, I_5, L_5, K_5]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.2, opacity=0.15)
S.add(Polygon([edgeleft, T_1, A_2, F_0]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([T_1, I_1, B_2, F_0]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([I_1, Base, Z_1, F_0]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([F, T_1, B_2, A_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([N, U_1, D_2, B_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([P, U_1, Z_1, D_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([U_1, I_1, Z_1, B_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([J_1, Base, F_8, Z_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([V_1, J_1, C_2, Z_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([Q, V_1, E_2, Z_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([V_1, S_2, E_2, C_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([J_1, W_1, C_2, F_8]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([W_1, U, C_2, G_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([W_1, edgeright, G_2, F_8]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([C, I_1, B_2, F_0]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([I_1, Base, Z_1, F_0]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([I_1, O, B_2, Z_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([Base, J_1, Z_1, F_8]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([J_1, R, Z_1, C_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([J_1, V, C_2, F_8]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([M, Base, Z_1, F_0]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([Base, T, Z_1, F_8]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([M, T, F_4, Z_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([edgeleft, F, F_1, A_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([F, N, F_2, B_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([N, P, F_3, D_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([P, Q, F_4, Z_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([Q, S_2, F_5, E_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([S_2, U, F_6, C_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([U, edgeright, F_7, G_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([C, O, F_2, B_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([O, R, F_4, Z_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([R, V, F_6, C_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Line(Base, J_1), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(I_1, Base), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(M, Base), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(Base, T), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(Base, D), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Polygon([Base, D, F_8, F_0]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Line(R_5, S_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(T_5, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(F_0, U_5), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(F_8, V_5), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(15.5, 10.0, 0.0), Point(15.5, 9.175, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 9.175, 0.0), Point(15.125818, 10.060024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 9.175, 0.0), Point(15.874182, 10.060024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 9.175, 0.0), Point(15.5, 8.35, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 8.35, 0.0), Point(15.125818, 9.235024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 8.35, 0.0), Point(15.874182, 9.235024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 8.35, 0.0), Point(15.5, 7.525, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 7.525, 0.0), Point(15.125818, 8.410024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 7.525, 0.0), Point(15.874182, 8.410024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 7.525, 0.0), Point(15.5, 6.7, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 6.7, 0.0), Point(15.125818, 7.585024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 6.7, 0.0), Point(15.874182, 7.585024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 6.7, 0.0), Point(15.5, 5.875, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 5.875, 0.0), Point(15.125818, 6.760024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 5.875, 0.0), Point(15.874182, 6.760024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 5.875, 0.0), Point(15.5, 5.05, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 5.05, 0.0), Point(15.125818, 5.935024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 5.05, 0.0), Point(15.874182, 5.935024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 5.05, 0.0), Point(15.5, 4.225, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 4.225, 0.0), Point(15.125818, 5.110024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 4.225, 0.0), Point(15.874182, 5.110024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 4.225, 0.0), Point(15.5, 3.4, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 3.4, 0.0), Point(15.125818, 4.285024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 3.4, 0.0), Point(15.874182, 4.285024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 10.0, 0.0), Point(15.5, 6.7, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 6.7, 0.0), Point(15.125818, 7.585024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 6.7, 0.0), Point(15.874182, 7.585024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 6.7, 0.0), Point(15.5, 3.4, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 3.4, 0.0), Point(15.125818, 4.285024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 3.4, 0.0), Point(15.874182, 4.285024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(F_0, F_8), linecolor=Color(0.0, 0.0, 0.8549), linewidth=1.2)
S.add(Line(Point(15.5, 10.0, 0.0), Point(15.5, 8.35, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 8.35, 0.0), Point(15.125818, 9.235024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 8.35, 0.0), Point(15.874182, 9.235024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 8.35, 0.0), Point(15.5, 6.7, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 6.7, 0.0), Point(15.125818, 7.585024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 6.7, 0.0), Point(15.874182, 7.585024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 6.7, 0.0), Point(15.5, 5.05, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 5.05, 0.0), Point(15.125818, 5.935024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 5.05, 0.0), Point(15.874182, 5.935024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 5.05, 0.0), Point(15.5, 3.4, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 3.4, 0.0), Point(15.125818, 4.285024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 3.4, 0.0), Point(15.874182, 4.285024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(T_5, D), linecolor=Color(0.0, 0.0, 0.8471), linewidth=1.2)
S.add(Line(T_5, D), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.0)
S.add(Line(Point(15.5, 9.175, 0.0), Point(15.5, 8.35, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 8.35, 0.0), Point(15.125818, 9.235024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 8.35, 0.0), Point(15.874182, 9.235024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 8.35, 0.0), Point(15.5, 7.525, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 7.525, 0.0), Point(15.125818, 8.410024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 7.525, 0.0), Point(15.874182, 8.410024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 7.525, 0.0), Point(15.5, 6.7, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 6.7, 0.0), Point(15.125818, 7.585024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 6.7, 0.0), Point(15.874182, 7.585024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 6.7, 0.0), Point(15.5, 5.875, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 5.875, 0.0), Point(15.125818, 6.760024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 5.875, 0.0), Point(15.874182, 6.760024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 5.875, 0.0), Point(15.5, 5.05, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 5.05, 0.0), Point(15.125818, 5.935024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 5.05, 0.0), Point(15.874182, 5.935024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 5.05, 0.0), Point(15.5, 4.225, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 4.225, 0.0), Point(15.125818, 5.110024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 4.225, 0.0), Point(15.874182, 5.110024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 4.225, 0.0), Point(15.5, 3.4, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 3.4, 0.0), Point(15.125818, 4.285024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 3.4, 0.0), Point(15.874182, 4.285024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 10.0, 0.0), Point(15.5, 9.175, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 9.175, 0.0), Point(15.125818, 10.060024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 9.175, 0.0), Point(15.874182, 10.060024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)

# transpiler notes:
#   - segment b_7: endpoints unresolved (Segment)
#   - segment f_8: endpoints unresolved (Segment)

if __name__ == "__main__":
    viewer.show()
