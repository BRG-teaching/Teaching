"""
COMPAS translation of GeoGebra applet: Cantilever truss
Source: https://block.arch.ethz.ch/eq/drawing/view/33
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
C = Point(7.948067, 0.0, 0.0)  # C
B = Point(0.0, 0.0, 0.0)  # B
A = Point(0.0, -3.374292, 0.0)  # A
D = Point(1.987017, -2.530719, 0.0)  # D
E = Point(3.974034, -1.687146, 0.0)  # E
F = Point(5.96105, -0.843573, 0.0)  # F
G = Point(1.987017, 0.0, 0.0)  # G
H = Point(3.974034, 0.0, 0.0)  # H
I = Point(5.96105, 0.0, 0.0)  # I
G_1 = Point(11.0, 1.5, 0.0)  # G_1
M_1 = Point(17.533178, -1.132103, 0.0)  # M_1
H_1 = Point(11.0, 0.5, 0.0)  # H_1
I_1 = Point(11.0, -0.5, 0.0)  # I_1
J_1 = Point(11.0, -1.5, 0.0)  # J_1
K_1 = Point(11.0, -2.5, 0.0)  # K_1
L_1 = Point(11.0, -3.5, 0.0)  # L_1
N_1 = Point(0.0, 2.534036, 0.0)  # N_1
O_1 = Point(1.987017, 2.037644, 0.0)  # O_1
P_1 = Point(3.974034, 1.845395, 0.0)  # P_1
Q_1 = Point(5.96105, 1.957288, 0.0)  # Q_1
R_1 = Point(7.948067, 2.373324, 0.0)  # R_1
S_1 = Point(3.974034, 0.932968, 0.0)  # S_1
V_1 = Point(3.974034, -3.086394, 0.0)  # V_1
A_2 = Point(3.974034, 0.0, 0.0)  # A_2
Z_1 = Point(16.888693, 1.5, 0.0)  # Z_1
B_2 = Point(16.888693, -1.0, 0.0)  # B_2
C_2 = Point(15.710955, 0.5, 0.0)  # C_2
D_2 = Point(15.710955, -1.5, 0.0)  # D_2
E_2 = Point(14.533216, -0.5, 0.0)  # E_2
F_2 = Point(14.533216, -2.0, 0.0)  # F_2
G_2 = Point(13.355477, -1.5, 0.0)  # G_2
H_2 = Point(13.355477, -2.5, 0.0)  # H_2
I_2 = Point(16.888693, 0.5, 0.0)  # I_2
J_2 = Point(15.710955, -1.5, 0.0)  # J_2
K_2 = Point(15.710955, -0.5, 0.0)  # K_2
L_2 = Point(14.533216, -2.0, 0.0)  # L_2
M_2 = Point(14.533216, -1.5, 0.0)  # M_2
N_2 = Point(13.355477, -2.5, 0.0)  # N_2
O_2 = Point(13.355477, -2.5, 0.0)  # O_2
Z_2 = Point(7.948067, 2.952254, 0.0)  # Z_2
D_3 = Point(7.948067, -6.640112, 0.0)  # D_3
W_2 = Point(5.96105, 2.952254, 0.0)  # W_2
C_3 = Point(5.96105, -6.640112, 0.0)  # C_3
V_2 = Point(3.974034, 2.952254, 0.0)  # V_2
B_3 = Point(3.974034, -6.640112, 0.0)  # B_3
U_2 = Point(1.987017, 2.952254, 0.0)  # U_2
A_3 = Point(1.987017, -6.640112, 0.0)  # A_3
F_3 = Point(0.0, 2.952254, 0.0)  # F_3
E_3 = Point(0.0, -6.640112, 0.0)  # E_3
J_3 = Point(11.0, 2.952254, 0.0)  # J_3
I_3 = Point(11.0, -6.640112, 0.0)  # I_3
N_3 = Point(10.2, -3.5, 0.0)  # N_3
K_3 = Point(10.2, 1.5, 0.0)  # K_3
M_3 = Point(16.888693, 2.3, 0.0)  # M_3
W_3 = Point(11.0, 2.3, 0.0)  # W_3
frameBL = Point(-2.61423, -7.197913, 0.0)  # frameBL
R_2 = Point(-2.61423, 4.039523, 0.0)  # R_2
frameTR = Point(19.860642, 4.039523, 0.0)  # frameTR
Q_2 = Point(19.860642, -7.197913, 0.0)  # Q_2

# --- geometry ---
S.add(C, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(B, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(A, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(B, A), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(D, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(E, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(F, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(G, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(H, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(I, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(G, D), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H, E), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I, F), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(0.0, 1.5, 0.0), Point(0.0, 0.5, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 0.5, 0.0), Point(-0.406099, 1.460514, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 0.5, 0.0), Point(0.406099, 1.460514, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(1.987017, 1.5, 0.0), Point(1.987017, 0.5, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(1.987017, 0.5, 0.0), Point(1.580918, 1.460514, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(1.987017, 0.5, 0.0), Point(2.393116, 1.460514, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.974034, 1.5, 0.0), Point(3.974034, 0.5, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.974034, 0.5, 0.0), Point(3.567935, 1.460514, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.974034, 0.5, 0.0), Point(4.380132, 1.460514, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.96105, 1.5, 0.0), Point(5.96105, 0.5, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.96105, 0.5, 0.0), Point(5.554952, 1.460514, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.96105, 0.5, 0.0), Point(6.367149, 1.460514, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.948067, 1.5, 0.0), Point(7.948067, 0.5, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.948067, 0.5, 0.0), Point(7.541969, 1.460514, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.948067, 0.5, 0.0), Point(8.354166, 1.460514, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(B, D), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G, E), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H, F), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(G_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(M_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(M_1, G_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(M_1, H_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(M_1, I_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(M_1, J_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(M_1, K_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(M_1, L_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(N_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(O_1, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(P_1, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Q_1, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(R_1, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(N_1, O_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(O_1, P_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(P_1, Q_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(Q_1, R_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(S_1, pointcolor=Color(0.6, 0.6, 0.6), pointsize=3.0)
S.add(Line(N_1, S_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(S_1, R_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(Point(11.0, 1.5, 0.0), Point(11.0, -3.5, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.0, -3.5, 0.0), Point(10.593901, -2.539486, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, -3.5, 0.0), Point(11.406099, -2.539486, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(V_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(A_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(A, A_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(B, A_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_1, L_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Z_1, B_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_2, L_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_1, C_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_2, B_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_2, D_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_1, E_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_2, D_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_2, F_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_1, G_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_2, F_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_1, H_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_2, G_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([B, G, H_1, C_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([B, A, B_2, Z_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([A, D, B_2, L_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([G, D, D_2, C_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([G, H, I_1, E_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([G, E, E_2, D_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([D, E, D_2, L_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([H, E, F_2, E_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([H, I, J_1, G_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([H, F, G_2, F_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([E, F, F_2, L_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([I, F, H_2, G_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([I, C, K_1, H_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([F, C, H_2, L_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Line(A, G), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E, I), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(I_2, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(Line(H_1, I_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_2, Z_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(J_2, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(Line(I_2, J_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_2, L_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(K_2, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(Line(J_2, K_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_2, I_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(L_2, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(M_2, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(Line(L_2, M_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_2, J_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_2, L_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(N_2, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(Line(M_2, N_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(O_2, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(Line(K_1, N_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_1, L_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_1, N_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_1, D_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_1, F_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([B, A, I_2, Z_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([B, G, H_1, I_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([A, G, I_2, J_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([A, D, J_2, L_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([G, D, K_2, J_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([G, H, I_1, K_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([D, H, K_2, L_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([D, E, L_2, L_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([H, E, M_2, L_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([H, I, J_1, M_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([E, I, M_2, N_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([E, F, N_2, L_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([I, F, O_2, N_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([I, C, K_1, O_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([F, C, O_2, L_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Line(Z_2, D_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W_2, C_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V_2, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_2, A_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_3, E_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(11.0, 1.5, 0.0), Point(11.0, 0.5, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.0, 0.5, 0.0), Point(10.593901, 1.460514, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 0.5, 0.0), Point(11.406099, 1.460514, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 0.5, 0.0), Point(11.0, -0.5, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.0, -0.5, 0.0), Point(10.593901, 0.460514, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, -0.5, 0.0), Point(11.406099, 0.460514, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, -0.5, 0.0), Point(11.0, -1.5, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.0, -1.5, 0.0), Point(10.593901, -0.539486, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, -1.5, 0.0), Point(11.406099, -0.539486, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, -1.5, 0.0), Point(11.0, -2.5, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.0, -2.5, 0.0), Point(10.593901, -1.539486, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, -2.5, 0.0), Point(11.406099, -1.539486, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, -2.5, 0.0), Point(11.0, -3.5, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.0, -3.5, 0.0), Point(10.593901, -2.539486, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, -3.5, 0.0), Point(11.406099, -2.539486, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.888693, 1.5, 0.0), Point(11.0, 1.5, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.0, 1.5, 0.0), Point(11.960514, 1.906099, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 1.5, 0.0), Point(11.960514, 1.093901, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.974034, -1.641394, 0.0), Point(3.974034, -3.086394, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.974034, -3.086394, 0.0), Point(3.567935, -2.12588, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(3.974034, -3.086394, 0.0), Point(4.380132, -2.12588, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(J_3, I_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_1, G_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(10.2, -3.5, 0.0), Point(10.2, 1.5, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.2, 1.5, 0.0), Point(10.606099, 0.539486, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.2, 1.5, 0.0), Point(9.793901, 0.539486, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(L_1, N_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_1, K_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A, D), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(B, G), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(D, E), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E, F), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F, C), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A, D), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B, G), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H, I), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E, F), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(A, B), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B, G), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G, H), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(F, C), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(E, H), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(E, G), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(F, H), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(H, I), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(I, C), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(I, F), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(D, E), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(D, G), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(D, B), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(A, G), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(D, H), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(E, I), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(I, C), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(11.0, 2.3, 0.0), Point(16.888693, 2.3, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.888693, 2.3, 0.0), Point(15.92818, 1.893901, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.888693, 2.3, 0.0), Point(15.92818, 2.706099, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Z_1, M_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_1, W_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(-1.5, -3.374292, 0.0), Point(-0.5, -3.374292, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(-0.5, -3.374292, 0.0), Point(-1.460514, -3.78039, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(-0.5, -3.374292, 0.0), Point(-1.460514, -2.968193, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, -4.874292, 0.0), Point(0.0, -3.874292, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, -3.874292, 0.0), Point(0.406099, -4.834805, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, -3.874292, 0.0), Point(-0.406099, -4.834805, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(-1.5, 0.0, 0.0), Point(-0.5, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(-0.5, 0.0, 0.0), Point(-1.460514, -0.406099, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(-0.5, 0.0, 0.0), Point(-1.460514, 0.406099, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Polyline([frameBL, R_2, frameTR, Q_2, frameBL]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)

if __name__ == "__main__":
    viewer.show()
