"""
COMPAS translation of GeoGebra applet: Pedestrian Bridge 2
Source: https://block.arch.ethz.ch/eq/drawing/view/3
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
C = Point(4.0, 4.0, 0.0)  # C
D = Point(16.0, 4.0, 0.0)  # D
L_1 = Point(8.0, 4.0, 0.0)  # L_1
M_1 = Point(12.0, 4.0, 0.0)  # M_1
E = Point(2.06, 4.0, 0.0)  # E
G = Point(1.656055, 6.237533, 0.0)  # G
H = Point(1.923317, 10.112843, 0.0)  # H
I = Point(1.700598, 12.65184, 0.0)  # I
J = Point(-0.348417, 22.852371, 0.0)  # J
R_1 = Point(1.797272, 11.549761, 0.0)  # R_1
U_1 = Point(1.797272, 16.352978, 0.0)  # U_1
P = Point(17.91, 4.0, 0.0)  # P
Q = Point(18.181805, 5.792095, 0.0)  # Q
R = Point(17.780911, 7.395671, 0.0)  # R
S_2 = Point(18.449068, 12.206402, 0.0)  # S
T = Point(18.538156, 15.101749, 0.0)  # T
U = Point(18.048174, 18.887972, 0.0)  # U
V = Point(15.910071, 21.337882, 0.0)  # V
W = Point(16.043703, 22.807827, 0.0)  # W
S_1 = Point(18.380121, 11.709983, 0.0)  # S_1
O_1 = Point(46.333917, 20.959392, 0.0)  # O_1
T_1 = Point(60.880418, 7.947394, 0.0)  # T_1
Q_1 = Point(46.333917, -0.373941, 0.0)  # Q_1
V_1 = Point(8.0, 19.901253, 0.0)  # V_1
P_1 = Point(46.333917, 10.292725, 0.0)  # P_1
W_1 = Point(12.0, 19.256333, 0.0)  # W_1
Z_1 = Point(18.380121, 13.549248, 0.0)  # Z_1
A_2 = Point(46.333917, 10.406831, 0.0)  # A_2
B_2 = Point(34.408232, 10.291606, 0.0)  # B_2
C_2 = Point(8.0, 6.00245, 0.0)  # C_2
D_2 = Point(12.0, 6.002825, 0.0)  # D_2
D_1 = Point(4.083054, 1.772826, 0.0)  # D_1
E_1 = Point(4.336875, -1.569157, 0.0)  # E_1
F_1 = Point(4.421482, -2.330622, 0.0)  # F_1
G_2 = Point(1.797272, 11.549761, 0.0)  # G_2
O_2 = Point(8.0, 22.891105, 0.0)  # O_2
R_2 = Point(8.0, -2.281789, 0.0)  # R_2
P_2 = Point(12.0, 22.891105, 0.0)  # P_2
S_2_2 = Point(12.0, -2.281789, 0.0)  # S_2
Q_2 = Point(46.333917, 22.891105, 0.0)  # Q_2
T_2 = Point(46.333917, -2.281789, 0.0)  # T_2
U_2 = Point(1.797272, 22.891105, 0.0)  # U_2
W_2 = Point(1.797272, -2.281789, 0.0)  # W_2
V_2 = Point(18.380121, 22.891105, 0.0)  # V_2
Z_2 = Point(18.380121, -2.281789, 0.0)  # Z_2
H_3 = Point(10.0, 4.213781, 0.0)  # H_3
I_3 = Point(10.0, 22.891105, 0.0)  # I_3
J_3 = Point(10.0, -2.281789, 0.0)  # J_3
K_3 = Point(10.0, 2.540191, 0.0)  # K_3
G_1 = Point(15.758842, 2.111254, 0.0)  # G_1
H_1 = Point(15.208896, 0.16529, 0.0)  # H_1
I_1 = Point(15.208896, -1.949889, 0.0)  # I_1
J_1 = Point(15.039681, -2.246014, 0.0)  # J_1
J_5 = Point(4.0, -3.410095, 0.0)  # J_5
K_5 = Point(8.0, -3.410095, 0.0)  # K_5
L_5 = Point(12.0, -3.410095, 0.0)  # L_5
M_5 = Point(16.0, -3.410095, 0.0)  # M_5
N_5 = Point(4.0, -4.816547, 0.0)  # N_5
O_5 = Point(16.0, -4.816547, 0.0)  # O_5
frameBL = Point(-6.862428, -7.304885, 0.0)  # frameBL
S_5 = Point(64.423055, -7.304885, 0.0)  # S_5
T_5 = Point(-6.862428, 28.337856, 0.0)  # T_5
frameTR = Point(64.423055, 28.337856, 0.0)  # frameTR
V_5 = Point(29.33471, 10.242586, 0.0)  # V_5
R_5 = Point(10.0, 21.045354, 0.0)  # R_5
D_6 = Point(46.733917, 20.959392, 0.0)  # D_6
U_3 = Point(46.733917, -0.373941, 0.0)  # U_3
E_6 = Point(46.733917, -0.373941, 0.0)  # E_6
F_6 = Point(7.928901, -45.051708, 0.0)  # F_6
G_6 = Point(73.046205, -45.051708, 0.0)  # G_6
H_6 = Point(20.0, -30.0, 0.0)  # H_6
I_6 = Point(96.148403, -30.0, 0.0)  # I_6

# --- geometry ---
S.add(Line(C, D), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(L_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(M_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Polyline([E, G, H, I, J]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(R_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(U_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Polyline([P, Q, R, S_2, T, U, V, W]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(S_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(O_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(T_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Q_1, T_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(V_1, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(P_1, T_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(W_1, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(T_1, O_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Z_1, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(U_1, Z_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(A_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(B_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Q_1, B_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_2, P_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(C_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(D_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Polyline([E, C, D_1, E_1, F_1]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_2, O_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_2, A_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_1, A_2), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(R_1, C_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_2, D_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_2, S_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_2, L_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_2, M_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(G_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(O_2, R_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_2, S_2_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_2, T_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(U_1, V_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(V_1, W_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_1, Z_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(U_2, W_2), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(V_2, Z_2), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(Point(46.333917, -0.373941, 0.0), Point(34.408232, 10.291606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(34.408232, 10.291606, 0.0), Point(38.930535, 8.744242, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(34.408232, 10.291606, 0.0), Point(36.44894, 5.969445, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(34.408232, 10.291606, 0.0), Point(46.333917, 10.292725, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(46.333917, 10.292725, 0.0), Point(41.931694, 8.431008, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(46.333917, 10.292725, 0.0), Point(41.931345, 12.153616, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(46.333917, 10.292725, 0.0), Point(34.408232, 10.291606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(34.408232, 10.291606, 0.0), Point(38.810455, 12.153323, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(34.408232, 10.291606, 0.0), Point(38.810804, 8.430715, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(34.408232, 10.291606, 0.0), Point(46.333917, 20.959392, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(46.333917, 20.959392, 0.0), Point(44.29366, 16.637019, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(46.333917, 20.959392, 0.0), Point(41.811776, 19.411556, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(H_3, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Line(C_2, H_3), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(I_3, J_3), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(K_3, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(P_1, Q_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(46.067266, -0.672097, 0.0), Point(34.141581, 9.993449, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(34.141581, 9.993449, 0.0), Point(38.663883, 8.446086, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(34.141581, 9.993449, 0.0), Point(36.182288, 5.671289, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(46.333917, -0.373941, 0.0), Point(46.333917, 10.292725, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(46.333917, 10.292725, 0.0), Point(48.195221, 5.890328, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(46.333917, 10.292725, 0.0), Point(44.472613, 5.890328, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(46.333917, 10.292725, 0.0), Point(46.333917, 20.959392, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(46.333917, 20.959392, 0.0), Point(48.195221, 16.556995, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(46.333917, 20.959392, 0.0), Point(44.472613, 16.556995, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(46.333917, 10.292725, 0.0), Point(46.333917, -0.373941, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(46.333917, -0.373941, 0.0), Point(44.472613, 4.028456, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(46.333917, -0.373941, 0.0), Point(48.195221, 4.028456, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.0, 6.002825, 0.0), Point(13.490642, 7.336237, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.490642, 7.336237, 0.0), Point(11.450385, 3.013864, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(13.490642, 7.336237, 0.0), Point(8.968501, 5.788401, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.0, 6.002825, 0.0), Point(10.0, 6.002637, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.0, 6.002637, 0.0), Point(14.402223, 7.864355, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(10.0, 6.002637, 0.0), Point(14.402572, 4.141747, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(46.333917, 20.959392, 0.0), Point(46.333917, 10.292725, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(46.333917, 10.292725, 0.0), Point(44.472613, 14.695123, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(46.333917, 10.292725, 0.0), Point(48.195221, 14.695123, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(34.408232, 10.291606, 0.0), Point(46.333917, -0.373941, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(46.333917, -0.373941, 0.0), Point(41.811614, 1.173423, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(46.333917, -0.373941, 0.0), Point(44.293209, 3.948219, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(46.333917, 20.959392, 0.0), Point(34.408232, 10.291606, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(34.408232, 10.291606, 0.0), Point(36.448489, 14.613979, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(34.408232, 10.291606, 0.0), Point(38.930373, 11.839441, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(1.797272, 11.549761, 0.0), Point(0.306491, 12.883017, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.306491, 12.883017, 0.0), Point(4.828794, 11.335653, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.306491, 12.883017, 0.0), Point(2.347199, 8.560857, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.380121, 11.709983, 0.0), Point(19.870763, 13.043395, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.870763, 13.043395, 0.0), Point(17.830506, 8.721022, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.870763, 13.043395, 0.0), Point(15.348622, 11.495559, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.0, 6.00245, 0.0), Point(10.0, 6.002637, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.0, 6.002637, 0.0), Point(5.597777, 4.14092, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(10.0, 6.002637, 0.0), Point(5.597428, 7.863528, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(8.0, 6.00245, 0.0), Point(6.509219, 7.335706, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(6.509219, 7.335706, 0.0), Point(11.031522, 5.788342, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(6.509219, 7.335706, 0.0), Point(8.549927, 3.013546, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(8.0, 4.0, 0.0), Point(8.0, 6.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.0, 6.0, 0.0), Point(9.861304, 1.597602, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(8.0, 6.0, 0.0), Point(6.138696, 1.597602, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(8.0, 4.0, 0.0), Point(8.0, 2.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.0, 2.0, 0.0), Point(6.138696, 6.402398, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.0, 2.0, 0.0), Point(9.861304, 6.402398, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Polygon([L_1, C_2, Q_1, P_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([M_1, D_2, P_1, O_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([C_2, R_1, Q_1, B_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([C_2, D_2, B_2, P_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([D_2, S_1, B_2, O_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Line(Point(12.0, 4.0, 0.0), Point(12.0, 2.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.0, 2.0, 0.0), Point(10.138696, 6.402398, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.0, 2.0, 0.0), Point(13.861304, 6.402398, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(46.733917, 20.959392, 0.0), Point(46.733917, 10.292725, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(46.733917, 10.292725, 0.0), Point(44.872613, 14.695123, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(46.733917, 10.292725, 0.0), Point(48.595221, 14.695123, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(46.733917, 10.292725, 0.0), Point(46.733917, -0.373941, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(46.733917, -0.373941, 0.0), Point(44.872613, 4.028456, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(46.733917, -0.373941, 0.0), Point(48.595221, 4.028456, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(34.14155, 10.589734, 0.0), Point(46.067235, 21.25752, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(46.067235, 21.25752, 0.0), Point(44.026978, 16.935147, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(46.067235, 21.25752, 0.0), Point(41.545093, 19.709685, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.0, 4.0, 0.0), Point(12.0, 6.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.0, 6.0, 0.0), Point(13.861304, 1.597602, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.0, 6.0, 0.0), Point(10.138696, 1.597602, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.0, 6.002825, 0.0), Point(12.0, 4.002825, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.0, 4.002825, 0.0), Point(10.138696, 8.405223, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.0, 4.002825, 0.0), Point(13.861304, 8.405223, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(1.797272, 11.549761, 0.0), Point(3.288053, 10.216504, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.288053, 10.216504, 0.0), Point(-1.23425, 11.763868, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(3.288053, 10.216504, 0.0), Point(1.247345, 14.538665, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(18.380121, 11.709983, 0.0), Point(16.889479, 10.376571, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.889479, 10.376571, 0.0), Point(18.929736, 14.698944, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(16.889479, 10.376571, 0.0), Point(21.41162, 11.924407, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Polyline([P, D, G_1, H_1, I_1, J_1]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(J_5, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(K_5, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(L_5, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(M_5, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(N_5, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(O_5, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(J_5, K_5), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(K_5, L_5), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(L_5, M_5), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(N_5, O_5), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(frameBL, S_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([frameBL, T_5, frameTR, S_5]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V_5, A_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(R_1, C_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(C_2, D_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(D_2, S_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(C_2, L_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(D_2, M_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(1.797272, 11.549761, 0.0), Point(0.306491, 12.883017, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)  # vector
S.add(Line(Point(0.306491, 12.883017, 0.0), Point(4.828794, 11.335653, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(0.306491, 12.883017, 0.0), Point(2.347199, 8.560857, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(18.380121, 11.709983, 0.0), Point(19.870763, 13.043395, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)  # vector
S.add(Line(Point(19.870763, 13.043395, 0.0), Point(17.830506, 8.721022, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(19.870763, 13.043395, 0.0), Point(15.348622, 11.495559, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(8.0, 4.0, 0.0), Point(8.0, 2.0, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)  # vector
S.add(Line(Point(8.0, 2.0, 0.0), Point(6.138696, 6.402398, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(8.0, 2.0, 0.0), Point(9.861304, 6.402398, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(12.0, 4.0, 0.0), Point(12.0, 2.0, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)  # vector
S.add(Line(Point(12.0, 2.0, 0.0), Point(10.138696, 6.402398, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(12.0, 2.0, 0.0), Point(13.861304, 6.402398, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(O_1, P_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(P_1, Q_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(B_2, P_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(B_2, O_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Q_1, B_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(34.14155, 10.589734, 0.0), Point(46.067235, 21.25752, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)  # vector
S.add(Line(Point(46.067235, 21.25752, 0.0), Point(44.026978, 16.935147, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(46.067235, 21.25752, 0.0), Point(41.545093, 19.709685, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(46.067266, -0.672097, 0.0), Point(34.141581, 9.993449, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)  # vector
S.add(Line(Point(34.141581, 9.993449, 0.0), Point(38.663883, 8.446086, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(34.141581, 9.993449, 0.0), Point(36.182288, 5.671289, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(46.733917, 20.959392, 0.0), Point(46.733917, 10.292725, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)  # vector
S.add(Line(Point(46.733917, 10.292725, 0.0), Point(44.872613, 14.695123, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(46.733917, 10.292725, 0.0), Point(48.595221, 14.695123, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(46.733917, 10.292725, 0.0), Point(46.733917, -0.373941, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)  # vector
S.add(Line(Point(46.733917, -0.373941, 0.0), Point(44.872613, 4.028456, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(46.733917, -0.373941, 0.0), Point(48.595221, 4.028456, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(10.0, 2.540191, 0.0), Point(10.0, -1.459809, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.0, -1.459809, 0.0), Point(8.138696, 2.942588, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(10.0, -1.459809, 0.0), Point(11.861304, 2.942588, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(R_5, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(V_1, R_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_1, R_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(C_2, H_3), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(H_3, D_2), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(Point(10.0, 4.213781, 0.0), Point(10.0, 0.213781, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.0, 0.213781, 0.0), Point(8.138696, 4.616179, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(10.0, 0.213781, 0.0), Point(11.861304, 4.616179, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(10.0, 4.213781, 0.0), Point(11.490642, 5.547193, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.490642, 5.547193, 0.0), Point(9.450385, 1.22482, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(11.490642, 5.547193, 0.0), Point(6.968501, 3.999357, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(10.0, 4.213781, 0.0), Point(8.509219, 5.547038, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.509219, 5.547038, 0.0), Point(13.031522, 3.999674, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(8.509219, 5.547038, 0.0), Point(10.549927, 1.224877, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(O_1, D_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_3, E_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(46.733917, 20.959392, 0.0), Point(46.733917, -0.373941, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(46.733917, -0.373941, 0.0), Point(44.872613, 4.028456, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(46.733917, -0.373941, 0.0), Point(48.595221, 4.028456, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(F_6, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(G_6, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(H_6, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(I_6, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)

if __name__ == "__main__":
    viewer.show()
