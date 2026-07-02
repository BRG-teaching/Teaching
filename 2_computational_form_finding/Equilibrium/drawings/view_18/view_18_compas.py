"""
COMPAS translation of GeoGebra applet: Salginatobel Bridge
Source: https://block.arch.ethz.ch/eq/drawing/view/18
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
B = Point(9.5, 0.0, 0.0)  # B
A = Point(0.5, 0.0, 0.0)  # A
D_7 = Point(12.0, 5.7, 0.0)  # D_7
D = Point(5.0, 1.349864, 0.0)  # D
G = Point(0.5, 3.734364, 0.0)  # G
H = Point(9.5, 3.734364, 0.0)  # H
G_12 = Point(5.75, 5.772564, 0.0)  # G_{12}
T_13 = Point(5.75, -1.558696, 0.0)  # T_{13}
B_7 = Point(2.75, 2.024796, 0.0)  # B_7
O_7 = Point(14.0, 4.0, 0.0)  # O_7
L_1 = Point(14.0, 4.0, 0.0)  # L_1
C_5 = Point(12.0, 5.7, 0.0)  # C_5
E_3 = Point(7.25, 2.024796, 0.0)  # E_3
D_3 = Point(2.75, 2.024796, 0.0)  # D_3
L_5 = Point(11.458279, 5.2125, 0.0)  # L_5
M_5 = Point(11.458279, 4.8875, 0.0)  # M_5
N_5 = Point(10.916558, 5.05, 0.0)  # N_5
O_5 = Point(2.75, 1.349864, 0.0)  # O_5
P_5 = Point(7.25, 1.349864, 0.0)  # P_5
M_2 = Point(11.167133, 2.300451, 0.0)  # M_2
M_1 = Point(14.0, 2.300451, 0.0)  # M_1
V_3 = Point(14.0, 2.187148, 0.0)  # V_3
W_3 = Point(14.0, 2.073844, 0.0)  # W_3
Z_3 = Point(14.0, 1.960541, 0.0)  # Z_3
A_4 = Point(14.0, 1.847238, 0.0)  # A_4
B_4 = Point(14.0, 1.733934, 0.0)  # B_4
C_4 = Point(14.0, 1.620631, 0.0)  # C_4
D_4 = Point(14.0, 1.507328, 0.0)  # D_4
U_1 = Point(14.0, 3.773393, 0.0)  # U_1
T_1 = Point(14.0, 3.886697, 0.0)  # T_1
V_1 = Point(14.0, 3.66009, 0.0)  # V_1
Z_1 = Point(14.0, 3.546787, 0.0)  # Z_1
A_2 = Point(14.0, 3.433484, 0.0)  # A_2
B_2 = Point(14.0, 3.32018, 0.0)  # B_2
C_2 = Point(14.0, 3.206877, 0.0)  # C_2
D_2 = Point(14.0, 3.093574, 0.0)  # D_2
E_2 = Point(14.0, 2.98027, 0.0)  # E_2
F_2 = Point(14.0, 2.866967, 0.0)  # F_2
G_2 = Point(14.0, 2.753664, 0.0)  # G_2
H_2 = Point(14.0, 2.640361, 0.0)  # H_2
I_2 = Point(14.0, 2.527057, 0.0)  # I_2
J_2 = Point(14.0, 2.413754, 0.0)  # J_2
M = Point(16.306519, 1.965025, 0.0)  # M
N = Point(0.5, 5.653926, 0.0)  # N
J = Point(0.5, 3.443842, 0.0)  # J
K = Point(9.5, 3.443842, 0.0)  # K
E_4 = Point(14.0, 1.394025, 0.0)  # E_4
F_4 = Point(14.0, 1.280721, 0.0)  # F_4
G_4 = Point(14.0, 1.167418, 0.0)  # G_4
H_4 = Point(14.0, 1.054115, 0.0)  # H_4
I_4 = Point(14.0, 0.940811, 0.0)  # I_4
J_4 = Point(14.0, 0.827508, 0.0)  # J_4
K_4 = Point(14.0, 0.714205, 0.0)  # K_4
F_3 = Point(0.65, 0.089991, 0.0)  # F_3
G_3 = Point(0.95, 0.257974, 0.0)  # G_3
H_3 = Point(1.25, 0.413958, 0.0)  # H_3
I_3 = Point(1.55, 0.557944, 0.0)  # I_3
J_3 = Point(1.85, 0.689931, 0.0)  # J_3
K_3 = Point(2.15, 0.809919, 0.0)  # K_3
L_3 = Point(2.45, 0.917908, 0.0)  # L_3
M_3 = Point(2.75, 1.013898, 0.0)  # M_3
N_3 = Point(3.05, 1.09789, 0.0)  # N_3
O_3 = Point(3.35, 1.169882, 0.0)  # O_3
P_3 = Point(3.65, 1.229876, 0.0)  # P_3
Q_3 = Point(3.95, 1.277872, 0.0)  # Q_3
R_3 = Point(4.25, 1.313868, 0.0)  # R_3
T_3 = Point(4.55, 1.337865, 0.0)  # T_3
U_3 = Point(4.85, 1.349864, 0.0)  # U_3
L_4 = Point(5.15, 1.349864, 0.0)  # L_4
M_4 = Point(5.45, 1.337865, 0.0)  # M_4
N_4 = Point(5.75, 1.313868, 0.0)  # N_4
O_4 = Point(6.05, 1.277872, 0.0)  # O_4
P_4 = Point(6.35, 1.229876, 0.0)  # P_4
Q_4 = Point(6.65, 1.169882, 0.0)  # Q_4
R_4 = Point(6.95, 1.09789, 0.0)  # R_4
S_4 = Point(7.25, 1.013898, 0.0)  # S_4
T_4 = Point(7.55, 0.917908, 0.0)  # T_4
U_4 = Point(7.85, 0.809919, 0.0)  # U_4
V_4 = Point(8.15, 0.689931, 0.0)  # V_4
W_4 = Point(8.45, 0.557944, 0.0)  # W_4
Z_4 = Point(8.75, 0.413958, 0.0)  # Z_4
A_5 = Point(9.05, 0.257974, 0.0)  # A_5
B_5 = Point(9.35, 0.089991, 0.0)  # B_5
J_5 = Point(12.0, 5.05, 0.0)  # J_5
K_5 = Point(12.0, 4.4, 0.0)  # K_5
G_7 = Point(11.566623, 5.31, 0.0)  # G_7
P_1 = Point(14.0, 0.600902, 0.0)  # P_1
P = Point(14.0, 3.886697, 0.0)  # P
Q = Point(14.0, 3.773393, 0.0)  # Q
R = Point(14.0, 3.66009, 0.0)  # R
C_1 = Point(14.0, 3.546787, 0.0)  # C_1
D_1 = Point(14.0, 3.433484, 0.0)  # D_1
E_1 = Point(14.0, 3.32018, 0.0)  # E_1
F_1 = Point(14.0, 3.206877, 0.0)  # F_1
G_1 = Point(14.0, 2.573574, 0.0)  # G_1
H_1 = Point(14.0, 2.46027, 0.0)  # H_1
I_1 = Point(14.0, 2.346967, 0.0)  # I_1
Q_1 = Point(14.0, 2.233664, 0.0)  # Q_1
S_1 = Point(14.0, 2.120361, 0.0)  # S_1
W_5 = Point(14.0, 2.007057, 0.0)  # W_5
A_6 = Point(14.0, 1.893754, 0.0)  # A_6
C_6 = Point(14.0, 1.780451, 0.0)  # C_6
E_6 = Point(14.0, 1.667148, 0.0)  # E_6
G_6 = Point(14.0, 1.553844, 0.0)  # G_6
I_6 = Point(14.0, 1.440541, 0.0)  # I_6
K_6 = Point(14.0, 1.327238, 0.0)  # K_6
M_6 = Point(14.0, 1.213934, 0.0)  # M_6
O_6 = Point(14.0, 1.100631, 0.0)  # O_6
H_7 = Point(14.0, 0.987328, 0.0)  # H_7
I_7 = Point(14.0, 0.874025, 0.0)  # I_7
J_7 = Point(14.0, 0.760721, 0.0)  # J_7
K_7 = Point(14.0, 0.647418, 0.0)  # K_7
L_7 = Point(14.0, 0.534115, 0.0)  # L_7
M_7 = Point(14.0, 0.420811, 0.0)  # M_7
N_7 = Point(14.0, 0.307508, 0.0)  # N_7
P_7 = Point(14.0, 0.194205, 0.0)  # P_7
Q_7 = Point(14.0, 0.080902, 0.0)  # Q_7
W_8 = Point(9.5, 5.866874, 0.0)  # W_8
O = Point(0.65, 5.521585, 0.0)  # O
R_7 = Point(0.95, 5.271641, 0.0)  # R_7
S_7 = Point(1.25, 5.036434, 0.0)  # S_7
T_7 = Point(1.55, 4.815963, 0.0)  # T_7
U_7 = Point(1.85, 4.610229, 0.0)  # U_7
V_7 = Point(2.15, 4.419233, 0.0)  # V_7
W_7 = Point(2.45, 4.242973, 0.0)  # W_7
Z_7 = Point(2.75, 4.08145, 0.0)  # Z_7
A_8 = Point(3.05, 4.002298, 0.0)  # A_8
B_8 = Point(3.35, 3.937884, 0.0)  # B_8
C_8 = Point(3.65, 3.888206, 0.0)  # C_8
D_8 = Point(3.95, 3.853265, 0.0)  # D_8
E_8 = Point(4.25, 3.833061, 0.0)  # E_8
F_8 = Point(4.55, 3.827594, 0.0)  # F_8
G_8 = Point(4.85, 3.836864, 0.0)  # G_8
H_8 = Point(5.15, 3.860871, 0.0)  # H_8
I_8 = Point(5.45, 3.899615, 0.0)  # I_8
J_8 = Point(5.75, 3.953096, 0.0)  # J_8
K_8 = Point(6.05, 4.021313, 0.0)  # K_8
L_8 = Point(6.35, 4.104268, 0.0)  # L_8
M_8 = Point(6.65, 4.201959, 0.0)  # M_8
N_8 = Point(6.95, 4.314388, 0.0)  # N_8
O_8 = Point(7.25, 4.441553, 0.0)  # O_8
P_8 = Point(7.55, 4.583455, 0.0)  # P_8
Q_8 = Point(7.85, 4.740094, 0.0)  # Q_8
R_8 = Point(8.15, 4.91147, 0.0)  # R_8
S_8 = Point(8.45, 5.097583, 0.0)  # S_8
T_8 = Point(8.75, 5.298433, 0.0)  # T_8
U_8 = Point(9.05, 5.51402, 0.0)  # U_8
V_8 = Point(9.35, 5.744344, 0.0)  # V_8
Z_8 = Point(5.0, 3.848868, 0.0)  # Z_8
A_9 = Point(14.0, 0.930676, 0.0)  # A_9
B_9 = Point(14.0, 2.890225, 0.0)  # B_9
C_9 = Point(10.733756, 1.910451, 0.0)  # C_9
D_9 = Point(0.65, 0.095961, 0.0)  # D_9
E_9 = Point(0.95, 0.277477, 0.0)  # E_9
F_9 = Point(1.25, 0.448585, 0.0)  # F_9
G_9 = Point(1.55, 0.609287, 0.0)  # G_9
H_9 = Point(1.85, 0.759583, 0.0)  # H_9
I_9 = Point(2.15, 0.899471, 0.0)  # I_9
J_9 = Point(2.45, 1.028953, 0.0)  # J_9
K_9 = Point(2.75, 1.148028, 0.0)  # K_9
L_9 = Point(3.05, 1.208935, 0.0)  # L_9
M_9 = Point(3.35, 1.259435, 0.0)  # M_9
N_9 = Point(3.65, 1.299528, 0.0)  # N_9
O_9 = Point(3.95, 1.329215, 0.0)  # O_9
P_9 = Point(4.25, 1.348495, 0.0)  # P_9
Q_9 = Point(4.55, 1.357368, 0.0)  # Q_9
R_9 = Point(4.85, 1.355834, 0.0)  # R_9
S_9 = Point(5.15, 1.343894, 0.0)  # S_9
T_9 = Point(5.45, 1.321547, 0.0)  # T_9
U_9 = Point(5.75, 1.288793, 0.0)  # U_9
V_9 = Point(6.05, 1.245633, 0.0)  # V_9
W_9 = Point(6.35, 1.192065, 0.0)  # W_9
A_10 = Point(6.65, 1.128091, 0.0)  # A_{10}
B_10 = Point(6.95, 1.05371, 0.0)  # B_{10}
C_10 = Point(7.25, 0.968923, 0.0)  # C_{10}
D_10 = Point(7.55, 0.873729, 0.0)  # D_{10}
E_10 = Point(7.85, 0.768127, 0.0)  # E_{10}
F_10 = Point(8.15, 0.65212, 0.0)  # F_{10}
G_10 = Point(8.45, 0.525705, 0.0)  # G_{10}
H_10 = Point(8.75, 0.388884, 0.0)  # H_{10}
I_10 = Point(9.05, 0.241656, 0.0)  # I_{10}
G_11 = Point(9.35, 0.084021, 0.0)  # G_{11}
J_11 = Point(0.5, 5.772564, 0.0)  # J_{11}
W_12 = Point(0.5, -1.558696, 0.0)  # W_{12}
K_11 = Point(0.65, 5.772564, 0.0)  # K_{11}
A_13 = Point(0.65, -1.558696, 0.0)  # A_{13}
B_13 = Point(0.95, -1.558696, 0.0)  # B_{13}
L_11 = Point(0.95, 5.772564, 0.0)  # L_{11}
M_11 = Point(1.25, 5.772564, 0.0)  # M_{11}
C_13 = Point(1.25, -1.558696, 0.0)  # C_{13}
N_11 = Point(1.55, 5.772564, 0.0)  # N_{11}
D_13 = Point(1.55, -1.558696, 0.0)  # D_{13}
O_11 = Point(1.85, 5.772564, 0.0)  # O_{11}
E_13 = Point(1.85, -1.558696, 0.0)  # E_{13}
P_11 = Point(2.15, 5.772564, 0.0)  # P_{11}
F_13 = Point(2.15, -1.558696, 0.0)  # F_{13}
Q_11 = Point(2.45, 5.772564, 0.0)  # Q_{11}
G_13 = Point(2.45, -1.558696, 0.0)  # G_{13}
R_11 = Point(2.75, 5.772564, 0.0)  # R_{11}
H_13 = Point(2.75, -1.558696, 0.0)  # H_{13}
S_11 = Point(3.05, 5.772564, 0.0)  # S_{11}
I_13 = Point(3.05, -1.558696, 0.0)  # I_{13}
T_11 = Point(3.35, 5.772564, 0.0)  # T_{11}
J_13 = Point(3.35, -1.558696, 0.0)  # J_{13}
U_11 = Point(3.65, 5.772564, 0.0)  # U_{11}
K_13 = Point(3.65, -1.558696, 0.0)  # K_{13}
V_11 = Point(3.95, 5.772564, 0.0)  # V_{11}
L_13 = Point(3.95, -1.558696, 0.0)  # L_{13}
W_11 = Point(4.25, 5.772564, 0.0)  # W_{11}
M_13 = Point(4.25, -1.558696, 0.0)  # M_{13}
A_12 = Point(4.55, 5.772564, 0.0)  # A_{12}
N_13 = Point(4.55, -1.558696, 0.0)  # N_{13}
B_12 = Point(4.85, 5.772564, 0.0)  # B_{12}
O_13 = Point(4.85, -1.558696, 0.0)  # O_{13}
F_12 = Point(5.15, 5.772564, 0.0)  # F_{12}
R_13 = Point(5.15, -1.558696, 0.0)  # R_{13}
P_13 = Point(5.0, -1.558696, 0.0)  # P_{13}
C_12 = Point(5.0, 5.772564, 0.0)  # C_{12}
D_12 = Point(5.45, 5.772564, 0.0)  # D_{12}
S_13 = Point(5.45, -1.558696, 0.0)  # S_{13}
H_12 = Point(6.05, 5.772564, 0.0)  # H_{12}
U_13 = Point(6.05, -1.558696, 0.0)  # U_{13}
I_12 = Point(6.35, 5.772564, 0.0)  # I_{12}
V_13 = Point(6.35, -1.558696, 0.0)  # V_{13}
J_12 = Point(6.65, 5.772564, 0.0)  # J_{12}
W_13 = Point(6.65, -1.558696, 0.0)  # W_{13}
K_12 = Point(6.95, 5.772564, 0.0)  # K_{12}
A_14 = Point(6.95, -1.558696, 0.0)  # A_{14}
L_12 = Point(7.25, 5.772564, 0.0)  # L_{12}
B_14 = Point(7.25, -1.558696, 0.0)  # B_{14}
M_12 = Point(7.55, 5.772564, 0.0)  # M_{12}
C_14 = Point(7.55, -1.558696, 0.0)  # C_{14}
N_12 = Point(7.85, 5.772564, 0.0)  # N_{12}
D_14 = Point(7.85, -1.558696, 0.0)  # D_{14}
O_12 = Point(8.15, 5.772564, 0.0)  # O_{12}
E_14 = Point(8.15, -1.558696, 0.0)  # E_{14}
P_12 = Point(8.45, 5.772564, 0.0)  # P_{12}
F_14 = Point(8.45, -1.558696, 0.0)  # F_{14}
Q_12 = Point(8.75, 5.772564, 0.0)  # Q_{12}
G_14 = Point(8.75, -1.558696, 0.0)  # G_{14}
R_12 = Point(9.05, 5.772564, 0.0)  # R_{12}
H_14 = Point(9.05, -1.558696, 0.0)  # H_{14}
S_12 = Point(9.35, 5.772564, 0.0)  # S_{12}
I_14 = Point(9.35, -1.558696, 0.0)  # I_{14}
T_12 = Point(9.5, 5.772564, 0.0)  # T_{12}
J_14 = Point(9.5, -1.558696, 0.0)  # J_{14}
M_14 = Point(2.75, 5.772564, 0.0)  # M_{14}
N_14 = Point(2.75, -1.558696, 0.0)  # N_{14}
frameBL = Point(-0.496917, -2.158689, 0.0)  # frameBL
P_14 = Point(16.83759, -2.158689, 0.0)  # P_{14}
Q_14 = Point(-0.496917, 6.508564, 0.0)  # Q_{14}
frameTR = Point(16.83759, 6.508564, 0.0)  # frameTR
O_14 = Point(2.75, 5.772564, 0.0)  # O_{14}
R_14 = Point(2.75, -1.558696, 0.0)  # R_{14}
T_14 = Point(7.25, 5.772564, 0.0)  # T_{14}
S_14 = Point(7.25, -1.558696, 0.0)  # S_{14}
W_14 = Point(12.0, 5.18, 0.0)  # W_{14}
D_15 = Point(5.0, 2.699729, 0.0)  # D_{15}
E_15 = Point(5.0, 3.242437, 0.0)  # E_{15}

# --- geometry ---
S.add(B, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(A, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(D_7, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(D, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(G, H), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(G_12, T_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(B_7, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(Line(B_7, B), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(O_7, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(L_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(C_5, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(E_3, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Line(E_3, B), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(D_3, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Line(D_3, A), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(L_5, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(M_5, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(N_5, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(O_5, pointcolor=Color(1.0, 0.0, 0.0), pointsize=3.0)
S.add(P_5, pointcolor=Color(1.0, 0.0, 0.0), pointsize=3.0)
S.add(M_2, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(Line(M_2, M_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, V_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, W_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, Z_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, A_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, B_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, C_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, D_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, U_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, T_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, V_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, Z_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, A_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, B_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, C_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, D_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, E_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, F_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, G_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, H_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, I_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, J_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(M, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(O_7, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(N, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(J, K), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(G, J), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(H, K), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(M_2, E_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, F_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, G_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, H_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, I_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, J_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, K_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Polyline([A, F_3, G_3, H_3, I_3, J_3, K_3, L_3, M_3, N_3, O_3, P_3, Q_3, R_3, T_3, U_3, L_4, M_4, N_4, O_4, P_4, Q_4, R_4, S_4, T_4, U_4, V_4, W_4, Z_4, A_5, B_5, B]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(Point(2.75, 4.278486, 0.0), Point(2.75, 3.778486, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(2.75, 3.778486, 0.0), Point(2.333734, 4.763048, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(2.75, 3.778486, 0.0), Point(3.166266, 4.763048, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(7.25, 4.278486, 0.0), Point(7.25, 3.778486, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.25, 3.778486, 0.0), Point(6.833734, 4.763048, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(7.25, 3.778486, 0.0), Point(7.666266, 4.763048, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(C_5, L_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_5, J_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_5, M_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_5, K_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_5, N_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_5, M_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([G, H, K, J]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.2, opacity=0.15)
S.add(Polyline([A, O_5, P_5, B]), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(Point(2.75, 4.278486, 0.0), Point(2.75, 3.778486, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(2.75, 3.778486, 0.0), Point(2.333734, 4.763048, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(2.75, 3.778486, 0.0), Point(3.166266, 4.763048, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(A, B_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(G_7, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(Line(D_7, G_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A, E_3), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(B, D_3), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(M_2, L_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(M_2, P_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(K_5, N_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_5, C_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(Q, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(M, R), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(C_1, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(D_1, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(E_1, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(F_1, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(G_1, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(H_1, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(I_1, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(Q_1, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(S_1, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(W_5, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(A_6, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(C_6, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(E_6, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(G_6, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(I_6, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(K_6, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(M_6, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(O_6, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(H_7, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(I_7, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(J_7, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(K_7, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(L_7, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(M_7, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(N_7, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(P_7, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(Q_7, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(W_8, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Polyline([N, O, R_7, S_7, T_7, U_7, V_7, W_7, Z_7, A_8, B_8, C_8, D_8, E_8, F_8, G_8, H_8, I_8, J_8, K_8, L_8, M_8, N_8, O_8, P_8, Q_8, R_8, S_8, T_8, U_8, V_8, W_8]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Z_8, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(N, Z_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Z_8, W_8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(A_9, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(B_9, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Line(A, D), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(D, B), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(C_9, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(C_9, B_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_9, C_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_9, M), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(M, A_9), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(C_9, O_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_9, P), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, Q), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, R), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, C_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, D_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, E_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, F_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, H_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, I_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, Q_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, S_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, W_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, A_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, C_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, E_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, G_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, I_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, K_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, M_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, O_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, H_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, I_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, J_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, K_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, L_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, M_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, N_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, P_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_9, Q_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([A, D_9, E_9, F_9, G_9, H_9, I_9, J_9, K_9, L_9, M_9, N_9, O_9, P_9, Q_9, R_9, S_9, T_9, U_9, V_9, W_9, A_10, B_10, C_10, D_10, E_10, F_10, G_10, H_10, I_10, G_11, B]), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(J_11, W_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_11, A_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(B_13, L_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_11, C_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N_11, D_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(O_11, E_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_11, F_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Q_11, G_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(R_11, H_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(S_11, I_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(T_11, J_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(U_11, K_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(V_11, L_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(W_11, M_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(A_12, N_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(B_12, O_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(F_12, R_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_13, C_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_12, S_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_12, U_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(I_12, V_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(J_12, W_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_12, A_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(L_12, B_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_12, C_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N_12, D_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(O_12, E_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_12, F_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Q_12, G_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(R_12, H_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(S_12, I_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(T_12, J_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_14, N_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(frameBL, P_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([frameBL, Q_14, frameTR, P_14]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_14, R_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_14, S_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(14.0, 0.080902, 0.0), Point(10.733756, 1.910451, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.733756, 1.910451, 0.0), Point(11.79617, 1.792473, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.733756, 1.910451, 0.0), Point(11.389315, 1.066126, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.733756, 1.910451, 0.0), Point(14.0, 4.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.0, 4.0, 0.0), Point(13.394959, 3.11877, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.0, 4.0, 0.0), Point(12.946308, 3.820071, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.078815, -0.269449, 0.0), Point(0.5, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.5, 0.0, 0.0), Point(-0.105041, -0.88123, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.5, 0.0, 0.0), Point(-0.553692, -0.179929, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.936227, -0.244348, 0.0), Point(9.5, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.5, 0.0, 0.0), Point(10.562414, -0.117978, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.5, 0.0, 0.0), Point(10.155559, -0.844325, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(G_7, W_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(12.0, 5.7, 0.0), Point(12.0, 5.18, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.0, 5.18, 0.0), Point(11.583734, 6.164563, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(12.0, 5.18, 0.0), Point(12.416266, 6.164563, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(14.0, 4.0, 0.0), Point(14.0, 0.600902, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.0, 0.600902, 0.0), Point(13.583734, 1.585464, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(14.0, 0.600902, 0.0), Point(14.416266, 1.585464, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(12.0, 5.7, 0.0), Point(12.0, 5.05, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.0, 5.05, 0.0), Point(11.583734, 6.034563, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.0, 5.05, 0.0), Point(12.416266, 6.034563, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.0, 5.05, 0.0), Point(12.0, 4.4, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.0, 4.4, 0.0), Point(11.583734, 5.384563, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.0, 4.4, 0.0), Point(12.416266, 5.384563, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(14.0, 0.194205, 0.0), Point(14.0, 0.080902, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.0, 0.080902, 0.0), Point(13.583734, 1.065464, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.0, 0.080902, 0.0), Point(14.416266, 1.065464, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(N_7, P_7), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(M_7, N_7), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(L_7, M_7), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(K_7, L_7), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(J_7, K_7), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(I_7, J_7), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(H_7, I_7), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(O_6, H_7), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(M_6, O_6), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(K_6, M_6), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(I_6, K_6), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(G_6, I_6), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(E_6, G_6), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(C_6, E_6), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(A_6, C_6), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(W_5, A_6), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(S_1, W_5), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Q_1, S_1), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(I_1, Q_1), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(H_1, I_1), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(G_1, H_1), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(F_1, G_1), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(E_1, F_1), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(D_1, E_1), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(C_1, D_1), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(R, C_1), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Q, R), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(P, Q), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(O_7, P), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(D_15, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Line(A, D_15), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(D_15, B), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(A, B), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(E_15, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(5.0, 3.242437, 0.0), Point(5.0, 2.242437, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)  # vector
S.add(Line(Point(5.0, 2.242437, 0.0), Point(4.583734, 3.227, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)
S.add(Line(Point(5.0, 2.242437, 0.0), Point(5.416266, 3.227, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)
S.add(Line(M_1, M_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(14.0, 0.600902, 0.0), Point(11.167133, 2.300451, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.167133, 2.300451, 0.0), Point(12.225563, 2.15089, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.167133, 2.300451, 0.0), Point(11.79726, 1.43698, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.167133, 2.300451, 0.0), Point(14.0, 4.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.0, 4.0, 0.0), Point(13.369873, 3.136529, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.0, 4.0, 0.0), Point(12.94157, 3.850439, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.071242, -0.257229, 0.0), Point(0.5, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.5, 0.0, 0.0), Point(-0.130127, -0.863471, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.5, 0.0, 0.0), Point(-0.55843, -0.149561, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.928758, -0.257229, 0.0), Point(9.5, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.5, 0.0, 0.0), Point(10.55843, -0.149561, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.5, 0.0, 0.0), Point(10.130127, -0.863471, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.0, 4.4, 0.0), Point(10.916558, 5.05, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.916558, 5.05, 0.0), Point(11.974987, 4.900439, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.916558, 5.05, 0.0), Point(11.546684, 4.186529, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.916558, 5.05, 0.0), Point(12.0, 5.7, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.0, 5.7, 0.0), Point(11.369873, 4.836529, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.0, 5.7, 0.0), Point(10.94157, 5.550439, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)

if __name__ == "__main__":
    viewer.show()
