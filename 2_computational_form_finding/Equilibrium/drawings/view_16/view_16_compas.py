"""
COMPAS translation of GeoGebra applet: Minimum and maximum thrust in a masonry arch
Source: https://block.arch.ethz.ch/eq/drawing/view/16
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
A = Point(20.744211, 10.224749, 0.0)  # A
handleArcRadius = Point(30.28078, 10.224749, 0.0)  # handleArcRadius
T_2 = Point(39.0, 24.0, 0.0)  # T_2
Q_7 = Point(8.2374, 10.224749, 0.0)  # Q_7
R_7 = Point(33.198642, 10.224749, 0.0)  # R_7
handleForceDiagram2 = Point(45.287595, 24.0, 0.0)  # handleForceDiagram2
handleArcSegment = Point(30.172546, 11.657452, 0.0)  # handleArcSegment
U = Point(28.306444, 11.373885, 0.0)  # U
handleFunicularBottom = Point(28.306444, 11.373885, 0.0)  # handleFunicularBottom
L_4 = Point(13.181979, 11.373885, 0.0)  # L_4
M_4 = Point(13.181979, 31.846928, 0.0)  # M_4
F_p = Point(11.315877, 11.657452, 0.0)  # F'
E = Point(20.744211, 19.761318, 0.0)  # E
A_1 = Point(25.745997, 17.212504, 0.0)  # A_1
G_1 = Point(15.742425, 17.212504, 0.0)  # G_1
Z = Point(24.433594, 17.985873, 0.0)  # Z
Z_p = Point(17.054829, 17.985873, 0.0)  # Z'
V = Point(21.505871, 18.784332, 0.0)  # V
V_p = Point(19.982551, 18.784332, 0.0)  # V'
W = Point(23.005257, 18.515362, 0.0)  # W
W_p = Point(18.483165, 18.515362, 0.0)  # W'
B_1 = Point(26.901229, 16.219557, 0.0)  # B_1
H_1 = Point(14.587194, 16.219557, 0.0)  # H_1
C_1 = Point(27.862986, 15.038233, 0.0)  # C_1
I_1 = Point(13.625437, 15.038233, 0.0)  # I_1
D_1 = Point(28.601048, 13.705654, 0.0)  # D_1
J_1 = Point(12.887374, 13.705654, 0.0)  # J_1
E_1 = Point(29.092222, 12.263693, 0.0)  # E_1
K_1 = Point(12.3962, 12.263693, 0.0)  # K_1
L_11 = Point(45.287595, 10.739324, 0.0)  # L_{11}
A_5 = Point(55.585903, 18.120251, 0.0)  # A_5
D_11 = Point(45.287595, 17.369662, 0.0)  # D_{11}
N_4 = Point(12.3962, 32.295563, 0.0)  # N_4
U_10 = Point(45.287595, 23.171208, 0.0)  # U_{10}
O_4 = Point(12.887374, 32.05466, 0.0)  # O_4
V_10 = Point(45.287595, 22.342415, 0.0)  # V_{10}
P_4 = Point(13.625437, 31.665117, 0.0)  # P_4
W_10 = Point(45.287595, 21.513623, 0.0)  # W_{10}
Q_4 = Point(14.587194, 31.34821, 0.0)  # Q_4
Z_10 = Point(45.287595, 20.684831, 0.0)  # Z_{10}
R_4 = Point(15.742425, 31.060524, 0.0)  # R_4
A_11 = Point(45.287595, 19.856039, 0.0)  # A_{11}
S_4 = Point(17.054829, 30.839317, 0.0)  # S_4
B_11 = Point(45.287595, 19.027246, 0.0)  # B_{11}
T_4 = Point(18.483165, 30.71352, 0.0)  # T_4
C_11 = Point(45.287595, 18.198454, 0.0)  # C_{11}
U_4 = Point(19.982551, 30.702134, 0.0)  # U_4
V_4 = Point(20.744211, 30.757648, 0.0)  # V_4
L_3 = Point(39.0, 10.739324, 0.0)  # L_3
Z_4 = Point(45.287595, 19.603642, 0.0)  # Z_4
B_5 = Point(43.273406, 17.369662, 0.0)  # B_5
I_11 = Point(45.287595, 13.225701, 0.0)  # I_{11}
M = Point(29.771441, 13.29969, 0.0)  # M
T = Point(27.984727, 12.691082, 0.0)  # T
I = Point(29.086671, 14.845302, 0.0)  # I
P = Point(27.43549, 13.930779, 0.0)  # P
L = Point(28.139753, 16.245721, 0.0)  # L
S_2 = Point(26.675991, 15.054021, 0.0)  # S
G = Point(26.960443, 17.456942, 0.0)  # G
O = Point(25.730096, 16.02551, 0.0)  # O
K = Point(25.585798, 18.440903, 0.0)  # K
R = Point(24.627527, 16.814721, 0.0)  # R
H = Point(24.059015, 19.166685, 0.0)  # H
N = Point(23.402932, 17.396853, 0.0)  # N
J = Point(22.428069, 19.611483, 0.0)  # J
Q = Point(22.094792, 17.753614, 0.0)  # Q
D = Point(20.744211, 17.873793, 0.0)  # D
J_p = Point(19.060354, 19.611483, 0.0)  # J'
Q_p = Point(19.393631, 17.753614, 0.0)  # Q'
H_p = Point(17.429408, 19.166685, 0.0)  # H'
N_p = Point(18.08549, 17.396853, 0.0)  # N'
K_p = Point(15.902625, 18.440903, 0.0)  # K'
R_p = Point(16.860895, 16.814721, 0.0)  # R'
G_p = Point(14.52798, 17.456942, 0.0)  # G'
O_p = Point(15.758327, 16.02551, 0.0)  # O'
L_p = Point(13.34867, 16.245721, 0.0)  # L'
S_p = Point(14.812432, 15.054021, 0.0)  # S'
I_p = Point(12.401752, 14.845302, 0.0)  # I'
P_p = Point(14.052933, 13.930779, 0.0)  # P'
M_p = Point(11.716981, 13.29969, 0.0)  # M'
T_p = Point(13.503695, 12.691082, 0.0)  # T'
U_p = Point(13.181979, 11.373885, 0.0)  # U'
handleFunicularTop = Point(20.744211, 17.873793, 0.0)  # handleFunicularTop
L_5 = Point(52.801635, 23.394831, 0.0)  # L_5
U_2 = Point(39.0, 23.171208, 0.0)  # U_2
V_2 = Point(39.0, 22.342415, 0.0)  # V_2
W_2 = Point(39.0, 21.513623, 0.0)  # W_2
Z_2 = Point(39.0, 20.684831, 0.0)  # Z_2
A_3 = Point(39.0, 19.856039, 0.0)  # A_3
B_3 = Point(39.0, 19.027246, 0.0)  # B_3
C_3 = Point(39.0, 18.198454, 0.0)  # C_3
D_3 = Point(39.0, 17.369662, 0.0)  # D_3
M_5 = Point(11.315877, 26.76654, 0.0)  # M_5
N_5 = Point(12.3962, 26.71917, 0.0)  # N_5
O_5 = Point(12.887374, 26.727129, 0.0)  # O_5
P_5 = Point(13.625437, 26.783408, 0.0)  # P_5
Q_5 = Point(14.587194, 26.914499, 0.0)  # Q_5
R_5 = Point(15.742425, 27.141333, 0.0)  # R_5
S_5 = Point(17.054829, 27.477838, 0.0)  # S_5
T_5 = Point(18.483165, 27.929841, 0.0)  # T_5
U_5 = Point(19.982551, 28.494367, 0.0)  # U_5
V_5 = Point(20.744211, 28.826873, 0.0)  # V_5
W_4 = Point(39.0, 20.37882, 0.0)  # W_4
D_5 = Point(34.436004, 17.369662, 0.0)  # D_5
H_5 = Point(14.587194, 14.447425, 0.0)  # H_5
I_5 = Point(15.742425, 16.348829, 0.0)  # I_5
J_5 = Point(17.054829, 17.9689, 0.0)  # J_5
W_5 = Point(18.483165, 19.144355, 0.0)  # W_5
Z_5 = Point(19.982551, 19.761318, 0.0)  # Z_5
H_6 = Point(19.982551, 17.873793, 0.0)  # H_6
G_6 = Point(18.483165, 17.601514, 0.0)  # G_6
F_6 = Point(17.054829, 17.082761, 0.0)  # F_6
E_6 = Point(15.742425, 16.367789, 0.0)  # E_6
D_6 = Point(14.587194, 15.528658, 0.0)  # D_6
C_6 = Point(13.625437, 14.655414, 0.0)  # C_6
B_6 = Point(12.887374, 13.85125, 0.0)  # B_6
A_6 = Point(12.3962, 13.226891, 0.0)  # A_6
E_5 = Point(12.3962, 8.787246, 0.0)  # E_5
G_5 = Point(13.625437, 12.46872, 0.0)  # G_5
F_5 = Point(12.887374, 10.201994, 0.0)  # F_5
E_11 = Point(45.287595, 16.54087, 0.0)  # E_{11}
F_11 = Point(45.287595, 15.712077, 0.0)  # F_{11}
G_11 = Point(45.287595, 14.883285, 0.0)  # G_{11}
H_11 = Point(45.287595, 14.054493, 0.0)  # H_{11}
J_11 = Point(45.287595, 12.396908, 0.0)  # J_{11}
K_11 = Point(45.287595, 11.568116, 0.0)  # K_{11}
E_4 = Point(21.505871, 19.761318, 0.0)  # E_4
F_4 = Point(23.005257, 19.144355, 0.0)  # F_4
G_4 = Point(24.433594, 17.9689, 0.0)  # G_4
H_4 = Point(25.745997, 16.348829, 0.0)  # H_4
I_4 = Point(26.901229, 14.447425, 0.0)  # I_4
C_5 = Point(28.601048, 10.646547, 0.0)  # C_5
I_6 = Point(29.092222, 9.231799, 0.0)  # I_6
J_4 = Point(27.862986, 12.46872, 0.0)  # J_4
E_3 = Point(39.0, 16.54087, 0.0)  # E_3
F_3 = Point(39.0, 15.712077, 0.0)  # F_3
G_3 = Point(39.0, 14.883285, 0.0)  # G_3
H_3 = Point(39.0, 14.054493, 0.0)  # H_3
I_3 = Point(39.0, 13.225701, 0.0)  # I_3
J_3 = Point(39.0, 12.396908, 0.0)  # J_3
K_3 = Point(39.0, 11.568116, 0.0)  # K_3
T_3 = Point(21.505871, 17.873793, 0.0)  # T_3
U_3 = Point(23.005257, 17.601514, 0.0)  # U_3
V_3 = Point(24.433594, 17.082761, 0.0)  # V_3
W_3 = Point(25.745997, 16.367789, 0.0)  # W_3
Z_3 = Point(26.901229, 15.528658, 0.0)  # Z_3
A_4 = Point(27.862986, 14.655414, 0.0)  # A_4
B_4 = Point(28.601048, 13.85125, 0.0)  # B_4
C_4 = Point(29.092222, 13.226891, 0.0)  # C_4
frameBL = Point(7.063081, 6.672247, 0.0)  # frameBL
U_7 = Point(48.553541, 6.672247, 0.0)  # U_7
V_7 = Point(7.063081, 27.417477, 0.0)  # V_7
frameTR = Point(48.553541, 27.417477, 0.0)  # frameTR
A_8 = Point(12.3962, 24.8218, 0.0)  # A_8
Q_8 = Point(12.3962, 8.330822, 0.0)  # Q_8
B_8 = Point(12.887374, 24.8218, 0.0)  # B_8
R_8 = Point(12.887374, 8.330822, 0.0)  # R_8
C_8 = Point(13.625437, 24.8218, 0.0)  # C_8
S_8 = Point(13.625437, 8.330822, 0.0)  # S_8
D_8 = Point(14.587194, 24.8218, 0.0)  # D_8
T_8 = Point(14.587194, 8.330822, 0.0)  # T_8
E_8 = Point(15.742425, 24.8218, 0.0)  # E_8
U_8 = Point(15.742425, 8.330822, 0.0)  # U_8
F_8 = Point(17.054829, 24.8218, 0.0)  # F_8
V_8 = Point(17.054829, 8.330822, 0.0)  # V_8
G_8 = Point(18.483165, 24.8218, 0.0)  # G_8
W_8 = Point(18.483165, 8.330822, 0.0)  # W_8
H_8 = Point(19.982551, 24.8218, 0.0)  # H_8
Z_8 = Point(19.982551, 8.330822, 0.0)  # Z_8
I_8 = Point(21.505871, 24.8218, 0.0)  # I_8
A_9 = Point(21.505871, 8.330822, 0.0)  # A_9
J_8 = Point(23.005257, 24.8218, 0.0)  # J_8
B_9 = Point(23.005257, 8.330822, 0.0)  # B_9
K_8 = Point(24.433594, 24.8218, 0.0)  # K_8
C_9 = Point(24.433594, 8.330822, 0.0)  # C_9
L_8 = Point(25.745997, 24.8218, 0.0)  # L_8
D_9 = Point(25.745997, 8.330822, 0.0)  # D_9
M_8 = Point(26.901229, 24.8218, 0.0)  # M_8
E_9 = Point(26.901229, 8.330822, 0.0)  # E_9
N_8 = Point(27.862986, 24.8218, 0.0)  # N_8
F_9 = Point(27.862986, 8.330822, 0.0)  # F_9
O_8 = Point(28.601048, 24.8218, 0.0)  # O_8
G_9 = Point(28.601048, 8.330822, 0.0)  # G_9
P_8 = Point(29.092222, 24.8218, 0.0)  # P_8
H_9 = Point(29.092222, 8.330822, 0.0)  # H_9

# --- geometry ---
S.add(A, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(handleArcRadius, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Polyline([Point(11.207643, 10.224749, 0.0), Point(11.21913, 9.756812, 0.0), Point(11.253564, 9.290002, 0.0), Point(11.310862, 8.825444, 0.0), Point(11.390886, 8.364257, 0.0), Point(11.493442, 7.907552, 0.0), Point(11.618284, 7.45643, 0.0), Point(11.765112, 7.011976, 0.0), Point(11.933571, 6.575263, 0.0), Point(12.123256, 6.147341, 0.0), Point(12.333709, 5.729242, 0.0), Point(12.564424, 5.321974, 0.0), Point(12.814845, 4.926516, 0.0), Point(13.084368, 4.543822, 0.0), Point(13.372344, 4.174815, 0.0), Point(13.67808, 3.820382, 0.0), Point(14.000839, 3.481377, 0.0), Point(14.339843, 3.158618, 0.0), Point(14.694276, 2.852882, 0.0), Point(15.063284, 2.564906, 0.0), Point(15.445978, 2.295383, 0.0), Point(15.841435, 2.044962, 0.0), Point(16.248704, 1.814247, 0.0), Point(16.666803, 1.603794, 0.0), Point(17.094725, 1.414109, 0.0), Point(17.531438, 1.24565, 0.0), Point(17.975892, 1.098823, 0.0), Point(18.427014, 0.97398, 0.0), Point(18.883719, 0.871424, 0.0), Point(19.344906, 0.7914, 0.0), Point(19.809464, 0.734102, 0.0), Point(20.276274, 0.699668, 0.0), Point(20.744211, 0.688181, 0.0), Point(21.212149, 0.699668, 0.0), Point(21.678958, 0.734102, 0.0), Point(22.143517, 0.7914, 0.0), Point(22.604704, 0.871424, 0.0), Point(23.061408, 0.97398, 0.0), Point(23.512531, 1.098823, 0.0), Point(23.956984, 1.24565, 0.0), Point(24.393698, 1.414109, 0.0), Point(24.82162, 1.603794, 0.0), Point(25.239719, 1.814247, 0.0), Point(25.646987, 2.044962, 0.0), Point(26.042445, 2.295383, 0.0), Point(26.425138, 2.564906, 0.0), Point(26.794146, 2.852882, 0.0), Point(27.148579, 3.158618, 0.0), Point(27.487583, 3.481377, 0.0), Point(27.810342, 3.820382, 0.0), Point(28.116078, 4.174815, 0.0), Point(28.404055, 4.543822, 0.0), Point(28.673578, 4.926516, 0.0), Point(28.923999, 5.321974, 0.0), Point(29.154714, 5.729242, 0.0), Point(29.365167, 6.147341, 0.0), Point(29.554852, 6.575263, 0.0), Point(29.723311, 7.011976, 0.0), Point(29.870138, 7.45643, 0.0), Point(29.994981, 7.907552, 0.0), Point(30.097537, 8.364257, 0.0), Point(30.177561, 8.825444, 0.0), Point(30.234858, 9.290002, 0.0), Point(30.269292, 9.756812, 0.0), Point(30.28078, 10.224749, 0.0)]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)  # arc
S.add(T_2, pointcolor=Color(0.2, 0.2, 0.2), pointsize=3.0)
S.add(Line(Q_7, R_7), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(handleForceDiagram2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Polyline([Point(13.095168, 10.224749, 0.0), Point(13.104381, 9.849429, 0.0), Point(13.132, 9.475012, 0.0), Point(13.177957, 9.102402, 0.0), Point(13.242142, 8.732495, 0.0), Point(13.3244, 8.366183, 0.0), Point(13.424533, 8.004349, 0.0), Point(13.5423, 7.647864, 0.0), Point(13.677416, 7.297587, 0.0), Point(13.829558, 6.954362, 0.0), Point(13.998357, 6.619015, 0.0), Point(14.183408, 6.292355, 0.0), Point(14.384264, 5.975168, 0.0), Point(14.600442, 5.668219, 0.0), Point(14.831421, 5.372248, 0.0), Point(15.076644, 5.087966, 0.0), Point(15.335521, 4.816059, 0.0), Point(15.607428, 4.557182, 0.0), Point(15.891709, 4.311959, 0.0), Point(16.187681, 4.08098, 0.0), Point(16.49463, 3.864802, 0.0), Point(16.811817, 3.663946, 0.0), Point(17.138477, 3.478895, 0.0), Point(17.473824, 3.310096, 0.0), Point(17.817049, 3.157955, 0.0), Point(18.167326, 3.022838, 0.0), Point(18.523811, 2.905071, 0.0), Point(18.885645, 2.804938, 0.0), Point(19.251957, 2.72268, 0.0), Point(19.621864, 2.658495, 0.0), Point(19.994474, 2.612538, 0.0), Point(20.368891, 2.584919, 0.0), Point(20.744211, 2.575706, 0.0), Point(21.119532, 2.584919, 0.0), Point(21.493949, 2.612538, 0.0), Point(21.866559, 2.658495, 0.0), Point(22.236466, 2.72268, 0.0), Point(22.602777, 2.804938, 0.0), Point(22.964612, 2.905071, 0.0), Point(23.321097, 3.022838, 0.0), Point(23.671374, 3.157955, 0.0), Point(24.014599, 3.310096, 0.0), Point(24.349946, 3.478895, 0.0), Point(24.676606, 3.663946, 0.0), Point(24.993792, 3.864802, 0.0), Point(25.300741, 4.08098, 0.0), Point(25.596713, 4.311959, 0.0), Point(25.880995, 4.557182, 0.0), Point(26.152902, 4.816059, 0.0), Point(26.411779, 5.087966, 0.0), Point(26.657002, 5.372248, 0.0), Point(26.887981, 5.668219, 0.0), Point(27.104159, 5.975168, 0.0), Point(27.305015, 6.292355, 0.0), Point(27.490066, 6.619015, 0.0), Point(27.658865, 6.954362, 0.0), Point(27.811006, 7.297587, 0.0), Point(27.946123, 7.647864, 0.0), Point(28.06389, 8.004349, 0.0), Point(28.164023, 8.366183, 0.0), Point(28.246281, 8.732495, 0.0), Point(28.310466, 9.102402, 0.0), Point(28.356423, 9.475012, 0.0), Point(28.384041, 9.849429, 0.0), Point(28.393255, 10.224749, 0.0)]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)  # arc
S.add(handleArcSegment, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(handleArcSegment, U), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(handleFunicularBottom, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(L_4, pointcolor=Color(0.2, 0.2, 0.2), pointsize=3.0)
S.add(Line(Point(13.181979, -6.333664, 0.0), Point(13.181979, 38.446872, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(M_4, pointcolor=Color(0.0, 1.0, 1.0), pointsize=4.5)
S.add(F_p, pointcolor=Color(0.2, 0.2, 0.2), pointsize=3.0)
S.add(Line(Point(20.744211, -6.333664, 0.0), Point(20.744211, 38.446872, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(E, pointcolor=Color(0.0, 1.0, 1.0), pointsize=4.5)
S.add(A_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(G_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(Z, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(Z_p, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(V, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(V_p, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(W, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(W_p, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(B_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(H_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(C_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(I_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(D_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(J_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(E_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(K_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(Line(handleForceDiagram2, L_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(A_5, pointcolor=Color(0.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(D_11, A_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(handleForceDiagram2, A_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(N_4, pointcolor=Color(0.6, 0.6, 0.6), pointsize=4.5)
S.add(Line(U_10, A_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(O_4, pointcolor=Color(0.6, 0.6, 0.6), pointsize=4.5)
S.add(Line(V_10, A_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(P_4, pointcolor=Color(0.6, 0.6, 0.6), pointsize=4.5)
S.add(Line(W_10, A_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Q_4, pointcolor=Color(0.6, 0.6, 0.6), pointsize=4.5)
S.add(Line(Z_10, A_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(R_4, pointcolor=Color(0.6, 0.6, 0.6), pointsize=4.5)
S.add(Line(A_11, A_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(S_4, pointcolor=Color(0.6, 0.6, 0.6), pointsize=4.5)
S.add(Line(B_11, A_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(T_4, pointcolor=Color(0.6, 0.6, 0.6), pointsize=4.5)
S.add(Line(C_11, A_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(U_4, pointcolor=Color(0.6, 0.6, 0.6), pointsize=4.5)
S.add(V_4, pointcolor=Color(0.6, 0.6, 0.6), pointsize=4.5)
S.add(Line(M_4, V_4), linecolor=Color(0.0, 1.0, 1.0), linewidth=1.8)
S.add(Line(Point(-4.446872, 26.767502, 0.0), Point(60.032775, 17.479714, 0.0)), linecolor=Color(0.0, 1.0, 1.0), linewidth=1.0)
S.add(Line(L_4, E), linecolor=Color(0.0, 1.0, 1.0), linewidth=1.8)
S.add(Line(L_3, T_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Z_4, pointcolor=Color(0.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(60.032775, 35.957835, 0.0), Point(21.902141, -6.333664, 0.0)), linecolor=Color(0.0, 1.0, 1.0), linewidth=1.0)
S.add(B_5, pointcolor=Color(0.2, 0.2, 0.2), pointsize=3.0)
S.add(Line(B_5, W_10), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.0)
S.add(Line(B_5, I_11), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.0)
S.add(Line(M, T), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I, P), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L, S_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G, O), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K, R), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H, N), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J, Q), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E, D), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_p, Q_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_p, N_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_p, R_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_p, O_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_p, S_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_p, P_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_p, T_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_p, U_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(handleFunicularTop, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(L_5, pointcolor=Color(1.0, 0.6, 0.0), pointsize=4.5)
S.add(Line(T_2, L_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(U_2, L_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(V_2, L_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(W_2, L_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(Z_2, L_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(A_3, L_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(B_3, L_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(C_3, L_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(D_3, L_5), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(Point(11.315877, -6.333664, 0.0), Point(11.315877, 38.446872, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(M_5, pointcolor=Color(1.0, 0.6, 0.0), pointsize=4.5)
S.add(N_5, pointcolor=Color(0.6, 0.6, 0.6), pointsize=4.5)
S.add(O_5, pointcolor=Color(0.6, 0.6, 0.6), pointsize=4.5)
S.add(P_5, pointcolor=Color(0.6, 0.6, 0.6), pointsize=4.5)
S.add(Q_5, pointcolor=Color(0.6, 0.6, 0.6), pointsize=4.5)
S.add(R_5, pointcolor=Color(0.6, 0.6, 0.6), pointsize=4.5)
S.add(S_5, pointcolor=Color(0.6, 0.6, 0.6), pointsize=4.5)
S.add(T_5, pointcolor=Color(0.6, 0.6, 0.6), pointsize=4.5)
S.add(U_5, pointcolor=Color(0.6, 0.6, 0.6), pointsize=4.5)
S.add(V_5, pointcolor=Color(0.6, 0.6, 0.6), pointsize=4.5)
S.add(Line(M_5, V_5), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(Point(-4.446872, 10.884565, 0.0), Point(60.032775, 24.975021, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(F_p, handleFunicularTop), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(W_4, pointcolor=Color(1.0, 0.6, 0.0), pointsize=4.5)
S.add(Line(Point(60.032775, 34.246263, 0.0), Point(-1.514871, -6.333664, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(D_5, pointcolor=Color(0.2, 0.2, 0.2), pointsize=3.0)
S.add(Line(B_5, handleForceDiagram2), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(B_5, U_10), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.0)
S.add(Line(B_5, V_10), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.0)
S.add(Line(B_5, W_10), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.0)
S.add(Line(B_5, Z_10), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.0)
S.add(Line(B_5, A_11), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.0)
S.add(Line(B_5, B_11), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.0)
S.add(Line(B_5, C_11), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.0)
S.add(Line(B_5, D_11), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.0)
S.add(Line(H_5, I_5), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(I_5, J_5), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(J_5, W_5), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(W_5, Z_5), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(D_5, T_2), linecolor=Color(0.0, 0.0, 1.0), linewidth=3.0)
S.add(Line(D_5, U_2), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(D_5, V_2), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(D_5, W_2), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(D_5, Z_2), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(D_5, A_3), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(D_5, B_3), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(D_5, C_3), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(D_5, D_3), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(handleFunicularTop, H_6), linecolor=Color(0.0, 0.0, 1.0), linewidth=3.0)
S.add(Line(H_6, G_6), linecolor=Color(0.0, 0.0, 1.0), linewidth=3.0)
S.add(Line(G_6, F_6), linecolor=Color(0.0, 0.0, 1.0), linewidth=3.0)
S.add(Line(F_6, E_6), linecolor=Color(0.0, 0.0, 1.0), linewidth=3.0)
S.add(Line(E_6, D_6), linecolor=Color(0.0, 0.0, 1.0), linewidth=3.0)
S.add(Line(D_6, C_6), linecolor=Color(0.0, 0.0, 1.0), linewidth=3.0)
S.add(Line(C_6, B_6), linecolor=Color(0.0, 0.0, 1.0), linewidth=3.0)
S.add(Line(B_6, A_6), linecolor=Color(0.0, 0.0, 1.0), linewidth=3.0)
S.add(Line(A_6, F_p), linecolor=Color(0.0, 0.0, 1.0), linewidth=3.0)
S.add(Line(L_4, E_5), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(L_4, G_5), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(L_4, F_5), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(L_4, H_5), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(B_5, E_11), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.0)
S.add(Line(B_5, F_11), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.0)
S.add(Line(B_5, G_11), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.0)
S.add(Line(B_5, H_11), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.0)
S.add(Line(B_5, I_11), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.0)
S.add(Line(B_5, J_11), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.0)
S.add(Line(B_5, K_11), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.0)
S.add(Line(B_5, L_11), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(E_4, F_4), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(F_4, G_4), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(G_4, H_4), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(H_4, I_4), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(C_5, handleFunicularBottom), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(I_6, handleFunicularBottom), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(J_4, handleFunicularBottom), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(I_4, handleFunicularBottom), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(D_5, E_3), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(D_5, F_3), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(D_5, G_3), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(D_5, H_3), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(D_5, I_3), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(D_5, J_3), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(D_5, K_3), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(D_5, L_3), linecolor=Color(0.0, 0.0, 1.0), linewidth=3.0)
S.add(Line(handleFunicularTop, T_3), linecolor=Color(0.0, 0.0, 1.0), linewidth=3.0)
S.add(Line(T_3, U_3), linecolor=Color(0.0, 0.0, 1.0), linewidth=3.0)
S.add(Line(U_3, V_3), linecolor=Color(0.0, 0.0, 1.0), linewidth=3.0)
S.add(Line(V_3, W_3), linecolor=Color(0.0, 0.0, 1.0), linewidth=3.0)
S.add(Line(W_3, Z_3), linecolor=Color(0.0, 0.0, 1.0), linewidth=3.0)
S.add(Line(Z_3, A_4), linecolor=Color(0.0, 0.0, 1.0), linewidth=3.0)
S.add(Line(A_4, B_4), linecolor=Color(0.0, 0.0, 1.0), linewidth=3.0)
S.add(Line(B_4, C_4), linecolor=Color(0.0, 0.0, 1.0), linewidth=3.0)
S.add(Line(C_4, handleArcSegment), linecolor=Color(0.0, 0.0, 1.0), linewidth=3.0)
S.add(Polyline([Point(30.172546, 11.657452, 0.0), Point(29.873374, 12.982378, 0.0), Point(29.389009, 14.251363, 0.0), Point(28.729275, 15.438664, 0.0), Point(27.907556, 16.520195, 0.0), Point(26.940521, 17.474017, 0.0), Point(25.847788, 18.28078, 0.0), Point(24.651525, 18.924119, 0.0), Point(23.375997, 19.390983, 0.0), Point(22.047081, 19.671901, 0.0), Point(20.691735, 19.761173, 0.0), Point(19.337454, 19.65699, 0.0), Point(18.01171, 19.361465, 0.0), Point(16.741398, 18.880592, 0.0), Point(15.552286, 18.224128, 0.0), Point(14.468498, 17.405387, 0.0), Point(13.512019, 16.440981, 0.0), Point(12.702252, 15.350472, 0.0), Point(12.055625, 14.155983, 0.0), Point(11.585253, 12.881744, 0.0), Point(11.300681, 11.553607, 0.0), Point(11.207679, 10.198511, 0.0), Point(11.308136, 8.843948, 0.0), Point(11.600012, 7.517397, 0.0), Point(12.077388, 6.245766, 0.0), Point(12.730579, 5.054853, 0.0), Point(13.546334, 3.968816, 0.0), Point(14.508105, 3.009687, 0.0), Point(15.596382, 2.196923, 0.0), Point(16.789088, 1.547012, 0.0), Point(18.062027, 1.073136, 0.0), Point(19.389377, 0.78491, 0.0), Point(20.744211, 0.688181, 0.0), Point(22.099045, 0.78491, 0.0), Point(23.426395, 1.073136, 0.0), Point(24.699335, 1.547012, 0.0), Point(25.89204, 2.196923, 0.0), Point(26.980317, 3.009687, 0.0), Point(27.942088, 3.968816, 0.0), Point(28.757844, 5.054853, 0.0), Point(29.411035, 6.245766, 0.0), Point(29.88841, 7.517397, 0.0), Point(30.180287, 8.843948, 0.0), Point(30.280744, 10.198511, 0.0), Point(30.187742, 11.553607, 0.0), Point(29.903169, 12.881744, 0.0), Point(29.432798, 14.155983, 0.0), Point(28.78617, 15.350472, 0.0), Point(27.976403, 16.440981, 0.0), Point(27.019924, 17.405387, 0.0), Point(25.936136, 18.224128, 0.0), Point(24.747025, 18.880592, 0.0), Point(23.476713, 19.361465, 0.0), Point(22.150969, 19.65699, 0.0), Point(20.796687, 19.761173, 0.0), Point(19.441341, 19.671901, 0.0), Point(18.112426, 19.390983, 0.0), Point(16.836898, 18.924119, 0.0), Point(15.640634, 18.28078, 0.0), Point(14.547902, 17.474017, 0.0), Point(13.580867, 16.520195, 0.0), Point(12.759148, 15.438664, 0.0), Point(12.099414, 14.251363, 0.0), Point(11.615048, 12.982378, 0.0), Point(11.315877, 11.657452, 0.0)]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)  # arc
S.add(Polyline([Point(28.306444, 11.373885, 0.0), Point(28.066485, 12.436575, 0.0), Point(27.677988, 13.454396, 0.0), Point(27.148831, 14.4067, 0.0), Point(26.489751, 15.274169, 0.0), Point(25.714117, 16.039206, 0.0), Point(24.837663, 16.686291, 0.0), Point(23.87817, 17.202297, 0.0), Point(22.855101, 17.576757, 0.0), Point(21.789211, 17.802074, 0.0), Point(20.702122, 17.873677, 0.0), Point(19.615886, 17.790115, 0.0), Point(18.55254, 17.553081, 0.0), Point(17.533654, 17.167385, 0.0), Point(16.579898, 16.640851, 0.0), Point(15.710618, 15.98416, 0.0), Point(14.94345, 15.210634, 0.0), Point(14.293957, 14.335964, 0.0), Point(13.775312, 13.377894, 0.0), Point(13.398039, 12.355859, 0.0), Point(13.169791, 11.290593, 0.0), Point(13.095197, 10.203705, 0.0), Point(13.17577, 9.117243, 0.0), Point(13.409877, 8.053249, 0.0), Point(13.792768, 7.033306, 0.0), Point(14.316677, 6.078104, 0.0), Point(14.970974, 5.207021, 0.0), Point(15.742386, 4.437728, 0.0), Point(16.615266, 3.78583, 0.0), Point(17.571906, 3.264552, 0.0), Point(18.592898, 2.884469, 0.0), Point(19.657533, 2.65329, 0.0), Point(20.744211, 2.575706, 0.0), Point(21.83089, 2.65329, 0.0), Point(22.895524, 2.884469, 0.0), Point(23.916517, 3.264552, 0.0), Point(24.873157, 3.78583, 0.0), Point(25.746036, 4.437728, 0.0), Point(26.517449, 5.207021, 0.0), Point(27.171746, 6.078104, 0.0), Point(27.695654, 7.033306, 0.0), Point(28.078545, 8.053249, 0.0), Point(28.312652, 9.117243, 0.0), Point(28.393226, 10.203705, 0.0), Point(28.318632, 11.290593, 0.0), Point(28.090383, 12.355859, 0.0), Point(27.71311, 13.377894, 0.0), Point(27.194466, 14.335964, 0.0), Point(26.544972, 15.210634, 0.0), Point(25.777804, 15.98416, 0.0), Point(24.908525, 16.640851, 0.0), Point(23.954768, 17.167385, 0.0), Point(22.935882, 17.553081, 0.0), Point(21.872536, 17.790115, 0.0), Point(20.786301, 17.873677, 0.0), Point(19.699212, 17.802074, 0.0), Point(18.633322, 17.576757, 0.0), Point(17.610253, 17.202297, 0.0), Point(16.650759, 16.686291, 0.0), Point(15.774306, 16.039206, 0.0), Point(14.998671, 15.274169, 0.0), Point(14.339591, 14.4067, 0.0), Point(13.810435, 13.454396, 0.0), Point(13.421937, 12.436575, 0.0), Point(13.181979, 11.373885, 0.0)]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)  # arc
S.add(Line(A, handleArcSegment), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(10.46537, 10.42188, 0.0), Point(11.315877, 11.657452, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.315877, 11.657452, 0.0), Point(10.796233, 9.131157, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.315877, 11.657452, 0.0), Point(9.141583, 10.270135, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(31.023053, 10.42188, 0.0), Point(30.172546, 11.657452, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(30.172546, 11.657452, 0.0), Point(32.346839, 10.270135, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(30.172546, 11.657452, 0.0), Point(30.69219, 9.131157, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(frameBL, U_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([frameBL, V_7, frameTR, U_7]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(39.0, 24.0, 0.0), Point(39.0, 10.739324, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(39.0, 10.739324, 0.0), Point(37.995618, 13.114911, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(39.0, 10.739324, 0.0), Point(40.004382, 13.114911, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(39.0, 10.739324, 0.0), Point(34.436004, 17.369662, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(34.436004, 17.369662, 0.0), Point(36.610297, 15.982345, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(34.436004, 17.369662, 0.0), Point(34.955648, 14.843366, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(34.436004, 17.369662, 0.0), Point(39.0, 24.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(39.0, 24.0, 0.0), Point(38.480356, 21.473704, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(39.0, 24.0, 0.0), Point(36.825707, 22.612683, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(A_8, Q_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(B_8, R_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(C_8, S_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(D_8, T_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(E_8, U_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(F_8, V_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(G_8, W_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(H_8, Z_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(I_8, A_9), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(J_8, B_9), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(K_8, C_9), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(L_8, D_9), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(M_8, E_9), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(N_8, F_9), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(O_8, G_9), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(P_8, H_9), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(12.3962, 23.905019, 0.0), Point(12.3962, 22.405019, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.3962, 22.405019, 0.0), Point(11.391818, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.3962, 22.405019, 0.0), Point(13.400582, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.887374, 23.905019, 0.0), Point(12.887374, 22.405019, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.887374, 22.405019, 0.0), Point(11.882992, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.887374, 22.405019, 0.0), Point(13.891757, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.625437, 23.905019, 0.0), Point(13.625437, 22.405019, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.625437, 22.405019, 0.0), Point(12.621054, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.625437, 22.405019, 0.0), Point(14.629819, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.587194, 23.905019, 0.0), Point(14.587194, 22.405019, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.587194, 22.405019, 0.0), Point(13.582812, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.587194, 22.405019, 0.0), Point(15.591576, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.742425, 23.905019, 0.0), Point(15.742425, 22.405019, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.742425, 22.405019, 0.0), Point(14.738043, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.742425, 22.405019, 0.0), Point(16.746807, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.054829, 23.905019, 0.0), Point(17.054829, 22.405019, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(17.054829, 22.405019, 0.0), Point(16.050447, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.054829, 22.405019, 0.0), Point(18.059211, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.483165, 23.905019, 0.0), Point(18.483165, 22.405019, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(18.483165, 22.405019, 0.0), Point(17.478783, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.483165, 22.405019, 0.0), Point(19.487548, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.982551, 23.905019, 0.0), Point(19.982551, 22.405019, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.982551, 22.405019, 0.0), Point(18.978169, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.982551, 22.405019, 0.0), Point(20.986934, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.505871, 23.905019, 0.0), Point(21.505871, 22.405019, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.505871, 22.405019, 0.0), Point(20.501489, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.505871, 22.405019, 0.0), Point(22.510254, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(23.005257, 23.905019, 0.0), Point(23.005257, 22.405019, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(23.005257, 22.405019, 0.0), Point(22.000875, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(23.005257, 22.405019, 0.0), Point(24.009639, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(24.433594, 23.905019, 0.0), Point(24.433594, 22.405019, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(24.433594, 22.405019, 0.0), Point(23.429211, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(24.433594, 22.405019, 0.0), Point(25.437976, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(25.745997, 23.905019, 0.0), Point(25.745997, 22.405019, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(25.745997, 22.405019, 0.0), Point(24.741615, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(25.745997, 22.405019, 0.0), Point(26.75038, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(26.901229, 23.905019, 0.0), Point(26.901229, 22.405019, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(26.901229, 22.405019, 0.0), Point(25.896846, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(26.901229, 22.405019, 0.0), Point(27.905611, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(27.862986, 23.905019, 0.0), Point(27.862986, 22.405019, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(27.862986, 22.405019, 0.0), Point(26.858604, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(27.862986, 22.405019, 0.0), Point(28.867368, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(28.601048, 23.905019, 0.0), Point(28.601048, 22.405019, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(28.601048, 22.405019, 0.0), Point(27.596666, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(28.601048, 22.405019, 0.0), Point(29.60543, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(29.092222, 23.905019, 0.0), Point(29.092222, 22.405019, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(29.092222, 22.405019, 0.0), Point(28.08784, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(29.092222, 22.405019, 0.0), Point(30.096605, 24.780606, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Polygon([F_p, A_6, T_2, D_5]), linecolor=Color(0.0, 0.0, 1.0), facecolor=Color(0.0, 0.0, 1.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([A_6, B_6, U_2, D_5]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([B_6, C_6, V_2, D_5]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([C_6, D_6, W_2, D_5]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([D_6, E_6, Z_2, D_5]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([E_6, F_6, A_3, D_5]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([F_6, G_6, B_3, D_5]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([G_6, H_6, C_3, D_5]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([H_6, T_3, D_3, D_5]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([T_3, U_3, E_3, D_5]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([U_3, V_3, F_3, D_5]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([V_3, W_3, G_3, D_5]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([W_3, Z_3, H_3, D_5]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([Z_3, A_4, I_3, D_5]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([A_4, B_4, J_3, D_5]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([B_4, C_4, K_3, D_5]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([C_4, handleArcSegment, L_3, D_5]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Line(Point(45.287595, 24.0, 0.0), Point(45.287595, 10.739324, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(45.287595, 10.739324, 0.0), Point(44.283212, 13.114911, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(45.287595, 10.739324, 0.0), Point(46.291977, 13.114911, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(45.287595, 10.739324, 0.0), Point(43.273406, 17.369662, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(43.273406, 17.369662, 0.0), Point(44.924929, 15.388584, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(43.273406, 17.369662, 0.0), Point(43.002895, 14.804701, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(43.273406, 17.369662, 0.0), Point(45.287595, 24.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(45.287595, 24.0, 0.0), Point(45.558105, 21.435039, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(45.287595, 24.0, 0.0), Point(43.636071, 22.018922, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Z_5, E_4), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(Point(28.96217, 10.024803, 0.0), Point(28.306444, 11.373885, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(28.306444, 11.373885, 0.0), Point(30.248264, 9.676377, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(28.306444, 11.373885, 0.0), Point(28.441605, 8.798243, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(28.869571, 9.983602, 0.0), Point(28.306444, 11.373885, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(28.306444, 11.373885, 0.0), Point(30.1292, 9.549122, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(28.306444, 11.373885, 0.0), Point(28.267365, 8.794995, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(28.864462, 9.981543, 0.0), Point(28.306444, 11.373885, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(28.306444, 11.373885, 0.0), Point(30.122487, 9.542441, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(28.306444, 11.373885, 0.0), Point(28.257896, 8.795156, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(28.864462, 9.981543, 0.0), Point(28.306444, 11.373885, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(28.306444, 11.373885, 0.0), Point(30.122487, 9.542441, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(28.306444, 11.373885, 0.0), Point(28.257896, 8.795156, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.526252, 10.024803, 0.0), Point(13.181979, 11.373885, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.181979, 11.373885, 0.0), Point(13.046818, 8.798243, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.181979, 11.373885, 0.0), Point(11.240159, 9.676377, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.618852, 9.983602, 0.0), Point(13.181979, 11.373885, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.181979, 11.373885, 0.0), Point(13.221058, 8.794995, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.181979, 11.373885, 0.0), Point(11.359223, 9.549122, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.745978, 9.938649, 0.0), Point(13.181979, 11.373885, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.181979, 11.373885, 0.0), Point(13.45249, 8.808924, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.181979, 11.373885, 0.0), Point(11.530456, 9.392807, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)

# transpiler notes:
#   - segment r_2: endpoints unresolved (loadToLoadLine)
#   - segment i_4: endpoints unresolved (loadToLoadLine)

if __name__ == "__main__":
    viewer.show()
