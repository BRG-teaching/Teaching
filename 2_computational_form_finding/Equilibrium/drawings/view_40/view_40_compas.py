"""
COMPAS translation of GeoGebra applet: Continuous beam – symmetrical
Source: https://block.arch.ethz.ch/eq/drawing/view/40
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
F = Point(4.153018, 6.716177, 0.0)  # F
A = Point(4.153018, 6.015292, 0.0)  # A
frameBL = Point(2.589981, 2.903628, 0.0)  # frameBL
A1 = Point(4.153018, 6.233923, 0.0)  # A1
C = Point(10.300606, 6.015292, 0.0)  # C
fBR = Point(19.646016, 2.903628, 0.0)  # fBR
frameTR = Point(19.646016, 11.431645, 0.0)  # frameTR
fTL = Point(2.589981, 11.431645, 0.0)  # fTL
G = Point(10.300606, 6.716177, 0.0)  # G
K = Point(4.153018, 8.528411, 0.0)  # K
L = Point(10.300606, 8.528411, 0.0)  # L
O = Point(10.300606, 8.778411, 0.0)  # O
M = Point(4.153018, 8.778411, 0.0)  # M
B_1 = Point(7.226812, 6.213923, 0.0)  # B_1
F_1 = Point(7.226812, 4.631909, 0.0)  # F_1
I = Point(7.226812, 6.026756, 0.0)  # I
W = Point(5.689915, 7.900076, 0.0)  # W
D_1 = Point(5.689915, 6.243923, 0.0)  # D_1
R1_2 = Point(5.689915, 7.07619, 0.0)  # R1_2
C1 = Point(10.300606, 6.233923, 0.0)  # C1
R2 = Point(8.763709, 7.07619, 0.0)  # R2
FD_0 = Point(15.581977, 9.281592, 0.0)  # FD_0
FD_1 = Point(15.581977, 7.356592, 0.0)  # FD_1
H = Point(14.018026, 8.424499, 0.0)  # H
J = Point(15.581977, 8.424499, 0.0)  # J
P = Point(15.831977, 9.281592, 0.0)  # P
T = Point(15.831977, 8.424499, 0.0)  # T
V = Point(14.018026, 6.288686, 0.0)  # V
FD_2 = Point(15.581977, 5.431592, 0.0)  # FD_2
C_1 = Point(15.581977, 6.288686, 0.0)  # C_1
H_1 = Point(15.831977, 6.288686, 0.0)  # H_1
G_1 = Point(15.831977, 5.431592, 0.0)  # G_1
B_3 = Point(15.581977, 9.006592, 0.0)  # B_3
J_1 = Point(15.581977, 8.731592, 0.0)  # J_1
K_1 = Point(15.581977, 8.456592, 0.0)  # K_1
L_1 = Point(15.581977, 8.181592, 0.0)  # L_1
M_1 = Point(15.581977, 7.906592, 0.0)  # M_1
N_1 = Point(15.581977, 7.631592, 0.0)  # N_1
W_1 = Point(4.537242, 6.444489, 0.0)  # W_1
D_2 = Point(4.921466, 6.587495, 0.0)  # D_2
C_2 = Point(5.305691, 6.662941, 0.0)  # C_2
B_2 = Point(5.689915, 6.670825, 0.0)  # B_2
A_2 = Point(6.074139, 6.611149, 0.0)  # A_2
O_1 = Point(6.458364, 6.483912, 0.0)  # O_1
Z_1 = Point(6.842588, 6.289114, 0.0)  # Z_1
E_2 = Point(7.611036, 6.289114, 0.0)  # E_2
G_2 = Point(7.995261, 6.483912, 0.0)  # G_2
H_2 = Point(8.379485, 6.611149, 0.0)  # H_2
I_2 = Point(8.763709, 6.670825, 0.0)  # I_2
J_2 = Point(9.147934, 6.662941, 0.0)  # J_2
K_2 = Point(9.532158, 6.587495, 0.0)  # K_2
F_2 = Point(9.916382, 6.444489, 0.0)  # F_2
A_1 = Point(15.581977, 7.081592, 0.0)  # A_1
M_2 = Point(15.581977, 6.806592, 0.0)  # M_2
N_2 = Point(15.581977, 6.531592, 0.0)  # N_2
O_2 = Point(15.581977, 6.256592, 0.0)  # O_2
P_2 = Point(15.581977, 5.981592, 0.0)  # P_2
Q_2 = Point(15.581977, 5.706592, 0.0)  # Q_2
R_2 = Point(7.530208, 6.233923, 0.0)  # R_2
L_3 = Point(6.923416, 6.233923, 0.0)  # L_3
I_p = Point(7.226812, 6.44109, 0.0)  # I'
J_3 = Point(7.611036, 6.178731, 0.0)  # J_3
K_3 = Point(7.995261, 5.983933, 0.0)  # K_3
M_3 = Point(8.379485, 5.856696, 0.0)  # M_3
N_3 = Point(8.763709, 5.79702, 0.0)  # N_3
O_3 = Point(9.147934, 5.804905, 0.0)  # O_3
P_3 = Point(9.532158, 5.88035, 0.0)  # P_3
Q_3 = Point(9.916382, 6.023356, 0.0)  # Q_3
C_3 = Point(4.537242, 6.023356, 0.0)  # C_3
D_3 = Point(4.921466, 5.88035, 0.0)  # D_3
E_3 = Point(5.305691, 5.804905, 0.0)  # E_3
F_3 = Point(5.689915, 5.79702, 0.0)  # F_3
G_3 = Point(6.074139, 5.856696, 0.0)  # G_3
H_3 = Point(6.458364, 5.983933, 0.0)  # H_3
I_3 = Point(6.842588, 6.178731, 0.0)  # I_3
H_p = Point(17.145928, 8.424499, 0.0)  # H'
V_p = Point(17.145928, 6.288686, 0.0)  # V'
P_p = Point(15.331977, 9.281592, 0.0)  # P'
T_p = Point(15.331977, 8.424499, 0.0)  # T'
V_2 = Point(15.331977, 6.288686, 0.0)  # V_2
W_2 = Point(15.331977, 5.431592, 0.0)  # W_2

# --- geometry ---
S.add(Line(F, A), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(frameBL, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(A1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(A, C), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(fBR, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Polyline([frameBL, fBR, frameTR, fTL, frameBL]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C, G), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(G, F), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Polygon([K, L, O, M]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.8, opacity=0.15)
S.add(Line(B_1, F_1), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(I, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(W, D_1), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(R1_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(5.689915, 7.70119, 0.0), Point(5.689915, 7.07619, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.689915, 7.07619, 0.0), Point(5.334931, 7.915806, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.689915, 7.07619, 0.0), Point(6.044899, 7.915806, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.763709, 7.70119, 0.0), Point(8.763709, 7.07619, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.763709, 7.07619, 0.0), Point(8.408725, 7.915806, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.763709, 7.07619, 0.0), Point(9.118693, 7.915806, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(A1, C1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A1, R1_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R1_2, I), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I, R2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R2, C1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(FD_0, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(15.581977, 9.281592, 0.0), Point(15.581977, 7.356592, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.581977, 7.356592, 0.0), Point(15.226993, 8.196209, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.581977, 7.356592, 0.0), Point(15.936961, 8.196209, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(FD_1, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H, FD_0), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H, J), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(15.831977, 8.424499, 0.0), Point(15.831977, 9.281592, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.831977, 9.281592, 0.0), Point(16.186961, 8.441976, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.831977, 9.281592, 0.0), Point(15.476993, 8.441976, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(FD_0, P), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(J, T), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(FD_1, V), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(14.018026, 6.288686, 0.0), Point(14.018026, 8.424499, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.018026, 8.424499, 0.0), Point(14.37301, 7.584883, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.018026, 8.424499, 0.0), Point(13.663042, 7.584883, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.581977, 7.356592, 0.0), Point(15.581977, 5.431592, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.581977, 5.431592, 0.0), Point(15.226993, 6.271209, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.581977, 5.431592, 0.0), Point(15.936961, 6.271209, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(FD_2, V), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(15.831977, 5.431592, 0.0), Point(15.831977, 6.288686, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.831977, 6.288686, 0.0), Point(16.186961, 5.449069, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.831977, 6.288686, 0.0), Point(15.476993, 5.449069, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(C_1, H_1), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(FD_2, G_1), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(V, C_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H, J_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H, K_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H, L_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H, M_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H, N_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Polyline([A1, W_1, D_2, C_2, B_2, A_2, O_1, Z_1, I]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([I, E_2, G_2, H_2, I_2, J_2, K_2, F_2, C1]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V, A_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(V, M_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(V, N_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(V, O_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(V, P_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(V, Q_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(R_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(L_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(L_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(Point(3.478018, 6.015292, 0.0), Point(3.978018, 6.015292, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.978018, 6.015292, 0.0), Point(3.138401, 5.660308, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.978018, 6.015292, 0.0), Point(3.138401, 6.370277, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.553018, 5.798786, 0.0), Point(4.753018, 5.798786, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(Point(3.681608, 5.415292, 0.0), Point(4.374428, 6.615292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(3.753036, 5.415292, 0.0), Point(4.445856, 6.615292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(3.824465, 5.415292, 0.0), Point(4.517285, 6.615292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(3.895893, 5.415292, 0.0), Point(4.588714, 6.615292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(3.967322, 5.415292, 0.0), Point(4.660142, 6.615292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(4.03875, 5.415292, 0.0), Point(4.731571, 6.615292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(4.753018, 6.528722, 0.0), Point(4.110179, 5.415292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(4.753018, 6.405004, 0.0), Point(4.181608, 5.415292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(4.153018, 5.123786, 0.0), Point(4.153018, 5.623786, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.153018, 5.623786, 0.0), Point(4.508002, 4.78417, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.153018, 5.623786, 0.0), Point(3.798034, 4.78417, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.300606, 5.123786, 0.0), Point(10.300606, 5.623786, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.300606, 5.623786, 0.0), Point(10.655591, 4.78417, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.300606, 5.623786, 0.0), Point(9.945622, 4.78417, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Circle.from_point_and_radius(Point(10.300606, 5.907039, 0.0), 0.108253), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(9.829196, 5.415292, 0.0), Point(10.522017, 6.615292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(9.900625, 5.415292, 0.0), Point(10.593445, 6.615292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(9.972053, 5.415292, 0.0), Point(10.664874, 6.615292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(10.043482, 5.415292, 0.0), Point(10.736302, 6.615292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(10.114911, 5.415292, 0.0), Point(10.807731, 6.615292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(10.186339, 5.415292, 0.0), Point(10.879159, 6.615292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(10.900606, 6.528722, 0.0), Point(10.257768, 5.415292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(10.900606, 6.405004, 0.0), Point(10.329196, 5.415292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(9.700606, 5.798786, 0.0), Point(10.900606, 5.798786, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Polygon([A, C, G, F]), linecolor=Color(0.0, 0.0, 0.0), facecolor=Color(0.0, 0.0, 0.0), linewidth=1.2, opacity=0.15)
S.add(Polyline([I_p, J_3, K_3, M_3, N_3, O_3, P_3, Q_3, C1]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([A1, C_3, D_3, E_3, F_3, G_3, H_3, I_3, I_p]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A1, C1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(FD_0, H_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(FD_1, H_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(FD_1, V_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(FD_2, V_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_2, V_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_2, V_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_1, V_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_2, V_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N_2, V_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_2, V_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(A_1, V_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N_1, H_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(M_1, H_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(L_1, H_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_1, H_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(J_1, H_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(J, H_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_3, H_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(15.331977, 8.424499, 0.0), Point(15.331977, 9.281592, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.331977, 9.281592, 0.0), Point(15.686961, 8.441976, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.331977, 9.281592, 0.0), Point(14.976993, 8.441976, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(P_p, FD_0), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(T_p, J), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(V_2, C_1), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(W_2, FD_2), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(A1, R1_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R1_2, I), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I, R2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R2, C1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(7.226812, 5.123786, 0.0), Point(7.226812, 5.623786, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.226812, 5.623786, 0.0), Point(7.581796, 4.78417, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.226812, 5.623786, 0.0), Point(6.871828, 4.78417, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Circle.from_point_and_radius(Point(7.226812, 5.907039, 0.0), 0.108253), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(6.755402, 5.415292, 0.0), Point(7.448222, 6.615292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(6.826831, 5.415292, 0.0), Point(7.519651, 6.615292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(6.898259, 5.415292, 0.0), Point(7.591079, 6.615292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(6.969688, 5.415292, 0.0), Point(7.662508, 6.615292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(7.041116, 5.415292, 0.0), Point(7.733937, 6.615292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(7.112545, 5.415292, 0.0), Point(7.805365, 6.615292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(7.826812, 6.528722, 0.0), Point(7.183973, 5.415292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(7.826812, 6.405004, 0.0), Point(7.255402, 5.415292, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(6.626812, 5.798786, 0.0), Point(7.826812, 5.798786, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)

if __name__ == "__main__":
    viewer.show()
