"""
COMPAS translation of GeoGebra applet: Constant force bottom chord truss - construction
Source: https://block.arch.ethz.ch/eq/drawing/view/39
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
N_1 = Point(15.0, 10.5, 0.0)  # N_1
R_2 = Point(15.0, 10.5, 0.0)  # R_2
U_1 = Point(15.0, 8.1, 0.0)  # U_1
frameBL = Point(0.595973, 2.633338, 0.0)  # frameBL
fBR = Point(20.627192, 2.633338, 0.0)  # fBR
frameTR = Point(20.627192, 12.648948, 0.0)  # frameTR
fTL = Point(0.595973, 12.648948, 0.0)  # fTL
C = Point(1.595973, 11.376367, 0.0)  # C
D = Point(1.595973, 3.756708, 0.0)  # D
G = Point(3.595973, 3.756708, 0.0)  # G
H = Point(3.595973, 11.376367, 0.0)  # H
I = Point(5.095973, 11.376367, 0.0)  # I
J = Point(5.095973, 3.756708, 0.0)  # J
K = Point(6.595973, 3.756708, 0.0)  # K
L = Point(6.595973, 11.376367, 0.0)  # L
O = Point(8.595973, 3.756708, 0.0)  # O
P = Point(8.595973, 11.376367, 0.0)  # P
N = Point(8.095973, 3.756708, 0.0)  # N
M = Point(8.095973, 11.376367, 0.0)  # M
E = Point(2.095973, 3.756708, 0.0)  # E
F = Point(2.095973, 11.376367, 0.0)  # F
R = Point(1.595973, 8.735071, 0.0)  # R
S_2 = Point(8.595973, 8.735071, 0.0)  # S
G_2 = Point(12.316718, 10.5, 0.0)  # G_2
O_1 = Point(15.0, 10.5, 0.0)  # O_1
F_2 = Point(11.700545, 9.54, 0.0)  # F_2
P_1 = Point(15.0, 9.54, 0.0)  # P_1
E_2 = Point(11.432144, 8.58, 0.0)  # E_2
Q_1 = Point(15.0, 8.58, 0.0)  # Q_1
D_2 = Point(11.432144, 7.62, 0.0)  # D_2
R_1 = Point(15.0, 7.62, 0.0)  # R_1
B_2 = Point(11.700545, 6.66, 0.0)  # B_2
S_1 = Point(15.0, 6.66, 0.0)  # S_1
C_2 = Point(12.316718, 5.7, 0.0)  # C_2
T_1 = Point(15.0, 5.7, 0.0)  # T_1
H_2 = Point(2.095973, 8.735071, 0.0)  # H_2
I_2 = Point(3.595973, 8.735071, 0.0)  # I_2
J_2 = Point(5.095973, 8.735071, 0.0)  # J_2
K_2 = Point(6.595973, 8.735071, 0.0)  # K_2
L_2 = Point(8.095973, 8.735071, 0.0)  # L_2
M_2 = Point(1.913618, 8.45096, 0.0)  # M_2
N_2 = Point(3.342221, 7.827467, 0.0)  # N_2
O_2 = Point(5.095973, 7.591527, 0.0)  # O_2
Q_2 = Point(8.278328, 8.45096, 0.0)  # Q_2
P_2 = Point(6.849726, 7.827467, 0.0)  # P_2
W_1 = Point(2.095973, 8.735071, 0.0)  # W_1
Z_1 = Point(11.627892, 6.839489, 0.0)  # Z_1
H_3 = Point(5.05842, 5.638164, 0.0)  # H_3
I_3 = Point(5.290772, 6.977049, 0.0)  # I_3
J_3 = Point(1.14538, 7.254042, 0.0)  # J_3
D_3 = Point(10.4, 10.5, 0.0)  # D_3
E_3 = Point(10.4, 9.54, 0.0)  # E_3
F_3 = Point(10.4, 8.58, 0.0)  # F_3
G_3 = Point(10.4, 7.62, 0.0)  # G_3
K_3 = Point(10.4, 6.66, 0.0)  # K_3
L_3 = Point(10.4, 5.7, 0.0)  # L_3
N_3 = Point(15.5, 10.5, 0.0)  # N_3
P_3 = Point(15.5, 8.1, 0.0)  # P_3
O_3 = Point(15.5, 5.7, 0.0)  # O_3

# --- geometry ---
S.add(N_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(R_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(U_1, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Polyline([frameBL, fBR, frameTR, fTL, frameBL]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C, D), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I, J), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K, L), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O, P), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N, M), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E, F), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(R, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(S_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(R, S_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(2.095973, 10.561921, 0.0), Point(2.095973, 9.961921, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(2.095973, 9.961921, 0.0), Point(1.734029, 10.818, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(2.095973, 9.961921, 0.0), Point(2.457918, 10.818, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.595973, 10.561921, 0.0), Point(3.595973, 9.961921, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.595973, 9.961921, 0.0), Point(3.234029, 10.818, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.595973, 9.961921, 0.0), Point(3.957918, 10.818, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.595973, 10.561921, 0.0), Point(6.595973, 9.961921, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(6.595973, 9.961921, 0.0), Point(6.234029, 10.818, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.595973, 9.961921, 0.0), Point(6.957918, 10.818, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.095973, 10.561921, 0.0), Point(8.095973, 9.961921, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.095973, 9.961921, 0.0), Point(7.734029, 10.818, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.095973, 9.961921, 0.0), Point(8.457918, 10.818, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(1.595973, 7.508798, 0.0), Point(1.595973, 8.108798, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(1.595973, 8.108798, 0.0), Point(1.957918, 7.252719, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(1.595973, 8.108798, 0.0), Point(1.234029, 7.252719, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.0, 10.5, 0.0), Point(15.0, 9.54, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.0, 9.54, 0.0), Point(14.638056, 10.396079, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.0, 9.54, 0.0), Point(15.361944, 10.396079, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.0, 9.54, 0.0), Point(15.0, 8.58, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.0, 8.58, 0.0), Point(14.638056, 9.436079, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.0, 8.58, 0.0), Point(15.361944, 9.436079, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.0, 8.58, 0.0), Point(15.0, 7.62, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.0, 7.62, 0.0), Point(14.638056, 8.476079, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.0, 7.62, 0.0), Point(15.361944, 8.476079, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.0, 7.62, 0.0), Point(15.0, 6.66, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.0, 6.66, 0.0), Point(14.638056, 7.516079, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.0, 6.66, 0.0), Point(15.361944, 7.516079, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.0, 6.66, 0.0), Point(15.0, 5.7, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.0, 5.7, 0.0), Point(14.638056, 6.556079, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.0, 5.7, 0.0), Point(15.361944, 6.556079, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Circle.from_point_and_radius(Point(15.0, 8.1, 0.0), 3.6), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(G_2, O_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_2, P_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_2, Q_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_2, R_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_2, S_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_2, T_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_2, U_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_2, U_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_2, U_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_2, U_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_2, U_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_2, U_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_2, F_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_2, E_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_2, D_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_2, B_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_2, C_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(H_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(I_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(J_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(K_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(L_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(M_2, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(N_2, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(O_2, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(Q_2, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(Line(R, M_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_2, H_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_2, N_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_2, I_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_2, O_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_2, J_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_2, P_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_2, K_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_2, Q_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_2, L_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_2, S_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([H_2, R, G_2, O_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([H_2, I_2, P_1, F_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([H_2, M_2, F_2, G_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([N_2, M_2, U_1, F_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([N_2, I_2, F_2, E_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([N_2, O_2, E_2, U_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([M_2, R, U_1, G_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([J_2, I_2, E_2, Q_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([J_2, K_2, R_1, D_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([J_2, O_2, D_2, E_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([P_2, O_2, U_1, D_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([P_2, K_2, D_2, B_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([L_2, K_2, B_2, S_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([L_2, S_2, T_1, C_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([L_2, Q_2, C_2, B_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([Q_2, P_2, U_1, B_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([Q_2, S_2, C_2, U_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Line(H_2, W_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_1, Z_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(R, H_3), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(M_2, I_3), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(H_2, J_3), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(5.095973, 10.561921, 0.0), Point(5.095973, 9.961921, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.095973, 9.961921, 0.0), Point(4.734029, 10.818, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.095973, 9.961921, 0.0), Point(5.457918, 10.818, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.595973, 7.508798, 0.0), Point(8.595973, 8.108798, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.595973, 8.108798, 0.0), Point(8.957918, 7.252719, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.595973, 8.108798, 0.0), Point(8.234029, 7.252719, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(D_3, N_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(E_3, P_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(F_3, Q_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(G_3, R_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(K_3, S_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(L_3, T_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(15.5, 5.7, 0.0), Point(15.5, 8.1, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 8.1, 0.0), Point(15.861944, 7.243921, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 8.1, 0.0), Point(15.138056, 7.243921, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 8.1, 0.0), Point(15.5, 10.5, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.5, 10.5, 0.0), Point(15.861944, 9.643921, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.5, 10.5, 0.0), Point(15.138056, 9.643921, 0.0)), linecolor=Color(0.2, 0.6, 0.0), linewidth=3.0)
S.add(Line(N_1, N_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_1, P_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_1, O_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_2, I_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(I_2, S_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)

if __name__ == "__main__":
    viewer.show()
