"""
COMPAS translation of GeoGebra applet: Internal forces in a beam with cantilever – point load
Source: https://block.arch.ethz.ch/eq/drawing/view/50
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
B_1 = Point(13.403132, 9.890893, 0.0)  # B_1
S_2 = Point(15.696684, 11.352976, 0.0)  # S
T = Point(15.696684, 10.352976, 0.0)  # T
V = Point(15.696684, 9.352976, 0.0)  # V
Z = Point(15.696684, 8.352976, 0.0)  # Z
K = Point(3.171973, 10.470864, 0.0)  # K
L = Point(3.771973, 10.470864, 0.0)  # L
A = Point(3.981973, 10.470864, 0.0)  # A
M = Point(3.981973, 10.001056, 0.0)  # M
N = Point(3.981973, 9.401056, 0.0)  # N
G = Point(10.22682, 10.470864, 0.0)  # G
F21 = Point(6.731973, 11.486539, 0.0)  # F21
F22 = Point(7.731973, 11.486539, 0.0)  # F22
E = Point(7.074333, 11.486539, 0.0)  # E
C = Point(7.074333, 10.470864, 0.0)  # C
B = Point(8.650533, 10.470864, 0.0)  # B
F11 = Point(4.981973, 11.486539, 0.0)  # F11
F12 = Point(5.981973, 11.486539, 0.0)  # F12
D = Point(5.44397, 11.486539, 0.0)  # D
C_1 = Point(3.981973, 8.470864, 0.0)  # C_1
H_1 = Point(8.650533, 10.048919, 0.0)  # H_1
I_1 = Point(15.696684, 10.666153, 0.0)  # I_1
N_1 = Point(3.981973, 6.718358, 0.0)  # N_1
A_3 = Point(3.981973, 12.052474, 0.0)  # A_3
B_3 = Point(3.981973, 2.285525, 0.0)  # B_3
G_2 = Point(11.297837, 7.405182, 0.0)  # G_2
N_3 = Point(3.981973, 6.405182, 0.0)  # N_3
R_2 = Point(13.512897, 6.405182, 0.0)  # R_2
H_2 = Point(11.816754, 6.405182, 0.0)  # H_2
N_2 = Point(13.512897, 6.718358, 0.0)  # N_2
O_3 = Point(3.981973, 5.405182, 0.0)  # O_3
S_2_2 = Point(13.512897, 5.405182, 0.0)  # S_2
L_3 = Point(3.981973, 7.718358, 0.0)  # L_3
P_2 = Point(13.512897, 7.718358, 0.0)  # P_2
frameBL = Point(-1.311262, 1.411533, 0.0)  # frameBL
fBR = Point(22.838838, 1.411533, 0.0)  # fBR
frameTR = Point(22.838838, 13.486583, 0.0)  # frameTR
fTL = Point(-1.311262, 13.486583, 0.0)  # fTL
D_1 = Point(5.44397, 9.402852, 0.0)  # D_1
E_1 = Point(7.074333, 9.731323, 0.0)  # E_1
G_1 = Point(10.22682, 8.991957, 0.0)  # G_1
K_1 = Point(16.196684, 11.352976, 0.0)  # K_1
L_1 = Point(16.196684, 10.666153, 0.0)  # L_1
M_1 = Point(16.196684, 8.352976, 0.0)  # M_1
D_2 = Point(10.718812, 6.718358, 0.0)  # D_2
J_2 = Point(12.407954, 5.405182, 0.0)  # J_2
L_2 = Point(12.982263, 7.718358, 0.0)  # L_2
O_2 = Point(14.799058, 6.718358, 0.0)  # O_2
Q_2 = Point(13.512897, 7.405182, 0.0)  # Q_2
T_2 = Point(3.981973, 3.797292, 0.0)  # T_2
U_2 = Point(5.44397, 3.01657, 0.0)  # U_2
V_2 = Point(7.074333, 3.413559, 0.0)  # V_2
W_2 = Point(8.650533, 5.022867, 0.0)  # W_2
Z_2 = Point(10.22682, 3.797292, 0.0)  # Z_2
C_3 = Point(5.44397, 12.052474, 0.0)  # C_3
K_3 = Point(5.44397, 2.285525, 0.0)  # K_3
D_3 = Point(7.074333, 12.052474, 0.0)  # D_3
J_3 = Point(7.074333, 2.285525, 0.0)  # J_3
I_3 = Point(8.650533, 2.285525, 0.0)  # I_3
E_3 = Point(8.650533, 12.052474, 0.0)  # E_3
G_3 = Point(10.22682, 12.052474, 0.0)  # G_3
H_3 = Point(10.22682, 2.285525, 0.0)  # H_3
S_3 = Point(13.512897, 5.008663, 0.0)  # S_3
T_3 = Point(14.799058, 5.008663, 0.0)  # T_3
U_3 = Point(5.44397, 3.797292, 0.0)  # U_3
O = Point(8.650533, 10.001056, 0.0)  # O
F_1 = Point(8.650533, 9.401056, 0.0)  # F_1
Q_1 = Point(3.981973, 7.405182, 0.0)  # Q_1

# --- geometry ---
S.add(B_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(S_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(B_1, S_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_1, T), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(B_1, V), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(B_1, Z), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(K, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(Point(3.171973, 10.470864, 0.0), Point(3.771973, 10.470864, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(3.771973, 10.470864, 0.0), Point(2.739865, 10.034496, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(3.771973, 10.470864, 0.0), Point(2.739865, 10.907233, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(L, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(Point(3.381973, 10.211056, 0.0), Point(4.581973, 10.211056, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(Point(3.485563, 9.870864, 0.0), Point(4.178383, 11.070864, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(3.571277, 9.870864, 0.0), Point(4.264097, 11.070864, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(3.656991, 9.870864, 0.0), Point(4.349812, 11.070864, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(3.742706, 9.870864, 0.0), Point(4.435526, 11.070864, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(3.82842, 9.870864, 0.0), Point(4.52124, 11.070864, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(4.581973, 11.027595, 0.0), Point(3.914134, 9.870864, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(4.581973, 10.879133, 0.0), Point(3.999849, 9.870864, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(4.581973, 10.730672, 0.0), Point(4.085563, 9.870864, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(M, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(Point(3.981973, 9.401056, 0.0), Point(3.981973, 10.001056, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(3.981973, 10.001056, 0.0), Point(4.418341, 8.968948, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(3.981973, 10.001056, 0.0), Point(3.545605, 8.968948, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(N, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(A, G), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F21, F22), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(E, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(C, G), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(B, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(F11, F12), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(D, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(C_1, H_1), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(I_1, pointcolor=Color(0.502, 0.502, 0.502), pointsize=3.0)
S.add(N_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(A_3, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(G_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(N_3, R_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(H_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(N_1, N_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_3, S_2_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_3, P_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(frameBL, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(fBR, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Polyline([frameBL, fBR, frameTR, fTL, frameBL]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(5.44397, 11.486539, 0.0), Point(5.44397, 10.886539, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(5.44397, 10.886539, 0.0), Point(5.007602, 11.918647, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(5.44397, 10.886539, 0.0), Point(5.880338, 11.918647, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(7.074333, 11.486539, 0.0), Point(7.074333, 10.886539, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(7.074333, 10.886539, 0.0), Point(6.637964, 11.918647, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(7.074333, 10.886539, 0.0), Point(7.510701, 11.918647, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(10.22682, 11.486539, 0.0), Point(10.22682, 10.886539, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(10.22682, 10.886539, 0.0), Point(9.790452, 11.918647, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(10.22682, 10.886539, 0.0), Point(10.663189, 11.918647, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(15.696684, 11.352976, 0.0), Point(15.696684, 10.352976, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(15.696684, 10.352976, 0.0), Point(15.260315, 11.385085, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(15.696684, 10.352976, 0.0), Point(16.133052, 11.385085, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(15.696684, 10.352976, 0.0), Point(15.696684, 9.352976, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(15.696684, 9.352976, 0.0), Point(15.260315, 10.385085, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(15.696684, 9.352976, 0.0), Point(16.133052, 10.385085, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(15.696684, 9.352976, 0.0), Point(15.696684, 8.352976, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(15.696684, 8.352976, 0.0), Point(15.260315, 9.385085, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(15.696684, 8.352976, 0.0), Point(16.133052, 9.385085, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(C_1, D_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_1, E_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_1, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_1, H_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(16.196684, 8.352976, 0.0), Point(16.196684, 10.666153, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(16.196684, 10.666153, 0.0), Point(16.633052, 9.634045, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(16.196684, 10.666153, 0.0), Point(15.760315, 9.634045, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(16.196684, 10.666153, 0.0), Point(16.196684, 11.352976, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(16.196684, 11.352976, 0.0), Point(16.633052, 10.320868, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(16.196684, 11.352976, 0.0), Point(15.760315, 10.320868, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(S_2, K_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_1, L_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z, M_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_1, I_1), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(D_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(10.718812, 6.718358, 0.0), Point(10.718812, 7.405182, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(10.718812, 7.405182, 0.0), Point(11.15518, 6.373073, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(10.718812, 7.405182, 0.0), Point(10.282443, 6.373073, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(11.816754, 6.405182, 0.0), Point(11.816754, 5.405182, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(11.816754, 5.405182, 0.0), Point(11.380386, 6.43729, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(11.816754, 5.405182, 0.0), Point(12.253123, 6.43729, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(J_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(12.407954, 5.405182, 0.0), Point(12.407954, 7.718358, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(12.407954, 7.718358, 0.0), Point(12.844323, 6.68625, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(12.407954, 7.718358, 0.0), Point(11.971586, 6.68625, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(L_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(12.982263, 7.718358, 0.0), Point(12.982263, 6.718358, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(12.982263, 6.718358, 0.0), Point(12.545894, 7.750467, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(12.982263, 6.718358, 0.0), Point(13.418631, 7.750467, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(O_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(P_2, O_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_2, O_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(R_2, O_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(S_2_2, O_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_2, O_2), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(P_2, S_2_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(T_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Polyline([T_2, U_2, V_2, W_2, Z_2, T_2]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([T_2, U_2, V_2, W_2, Z_2]), linecolor=Color(0.7529, 0.7529, 0.7529), facecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.0, opacity=0.25)
S.add(Line(C_3, K_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_3, J_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_3, E_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_3, H_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_3, T_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(S_2_2, S_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_2, T_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_3, U_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(O, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(Point(8.650533, 9.401056, 0.0), Point(8.650533, 10.001056, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(8.650533, 10.001056, 0.0), Point(9.086901, 8.968948, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(8.650533, 10.001056, 0.0), Point(8.214164, 8.968948, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(F_1, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Circle.from_point_and_radius(Point(8.650533, 10.34096, 0.0), 0.129904), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(8.154123, 9.870864, 0.0), Point(8.846943, 11.070864, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(8.239837, 9.870864, 0.0), Point(8.932657, 11.070864, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(8.325551, 9.870864, 0.0), Point(9.018372, 11.070864, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(8.411265, 9.870864, 0.0), Point(9.104086, 11.070864, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(8.49698, 9.870864, 0.0), Point(9.1898, 11.070864, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(9.250533, 11.027595, 0.0), Point(8.582694, 9.870864, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(9.250533, 10.879133, 0.0), Point(8.668408, 9.870864, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(9.250533, 10.730672, 0.0), Point(8.754123, 9.870864, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(8.050533, 10.211056, 0.0), Point(9.250533, 10.211056, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(Point(11.297837, 7.405182, 0.0), Point(11.297837, 6.405182, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(11.297837, 6.405182, 0.0), Point(10.861469, 7.43729, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(11.297837, 6.405182, 0.0), Point(11.734206, 7.43729, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Q_1, Q_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)

if __name__ == "__main__":
    viewer.show()
