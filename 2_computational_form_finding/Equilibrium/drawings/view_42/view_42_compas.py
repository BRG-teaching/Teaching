"""
COMPAS translation of GeoGebra applet: Internal forces in a fixed frame
Source: https://block.arch.ethz.ch/eq/drawing/view/42
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
K_2 = Point(4.0, 4.0, 0.0)  # K_2
L_2 = Point(8.802107, 4.0, 0.0)  # L_2
A = Point(5.0, 4.0, 0.0)  # A
N_2 = Point(5.0, 5.905149, 0.0)  # N_2
M_2 = Point(5.0, 7.579276, 0.0)  # M_2
D = Point(5.0, 7.0, 0.0)  # D
N = Point(7.5, 7.5, 0.0)  # N
P_1 = Point(3.5, 7.5, 0.0)  # P_1
S_1 = Point(3.5, 4.0, 0.0)  # S_1
R_2 = Point(18.0, 9.0, 0.0)  # R_2
frameBL = Point(1.341488, 2.222863, 0.0)  # frameBL
fBR = Point(22.58454, 2.222863, 0.0)  # fBR
frameTR = Point(22.58454, 12.844389, 0.0)  # frameTR
fTL = Point(1.341488, 12.844389, 0.0)  # fTL
C = Point(5.0, 8.0, 0.0)  # C
K = Point(4.0, 8.0, 0.0)  # K
E = Point(10.0, 8.0, 0.0)  # E
F = Point(10.0, 7.0, 0.0)  # F
B = Point(10.0, 4.0, 0.0)  # B
I_p = Point(11.0, 7.0, 0.0)  # I'
K_p = Point(11.0, 8.0, 0.0)  # K'
O = Point(7.5, 7.5, 0.0)  # O
Q_2 = Point(7.5, 7.0, 0.0)  # Q_2
G = Point(7.5, 8.0, 0.0)  # G
B_1 = Point(19.866667, 8.626667, 0.0)  # B_1
C_1 = Point(18.0, 8.128889, 0.0)  # C_1
A_1 = Point(17.377778, 8.128889, 0.0)  # A_1
W_p = Point(18.0, 9.0, 0.0)  # W'
Q_1 = Point(3.0, 7.5, 0.0)  # Q_1
R_1 = Point(3.0, 4.0, 0.0)  # R_1
T_1 = Point(18.0, 9.414054, 0.0)  # T_1
U_1 = Point(15.511111, 9.414054, 0.0)  # U_1
A_2 = Point(15.511111, 4.0, 0.0)  # A_2
W_1 = Point(15.511111, 10.0, 0.0)  # W_1
P = Point(7.5, 7.5, 0.0)  # P
E_2 = Point(19.866667, 7.628889, 0.0)  # E_2
C_2 = Point(17.377778, 7.628889, 0.0)  # C_2
F_2 = Point(19.866667, 10.0, 0.0)  # F_2
G_2 = Point(19.866667, 4.0, 0.0)  # G_2
J = Point(4.0, 7.0, 0.0)  # J

# --- geometry ---
S.add(Line(K_2, L_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(A, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(N_2, M_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(D, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(A, N), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(P_1, pointcolor=Color(0.502, 0.502, 0.502), pointsize=4.5)
S.add(S_1, pointcolor=Color(0.502, 0.502, 0.502), pointsize=4.5)
S.add(R_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Polyline([frameBL, fBR, frameTR, fTL, frameBL]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D, C), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C, K), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A, D), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E, F), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F, B), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B, I_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_p, K_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_p, E), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F, I_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E, I_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C, E), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D, F), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N, B), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C, O), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O, Q_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G, O), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(O, D), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(B_1, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(C_1, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(Line(Point(17.377778, 8.128889, 0.0), Point(18.0, 9.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(18.0, 9.0, 0.0), Point(17.771057, 7.977392, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.0, 9.0, 0.0), Point(17.10692, 8.451776, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.0, 9.0, 0.0), Point(18.0, 8.128889, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(18.0, 8.128889, 0.0), Point(17.59192, 9.094089, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.0, 8.128889, 0.0), Point(18.40808, 9.094089, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.0, 8.128889, 0.0), Point(17.377778, 8.128889, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(17.377778, 8.128889, 0.0), Point(18.342978, 8.536969, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.377778, 8.128889, 0.0), Point(18.342978, 7.720808, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(R_2, B_1), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_1, A_1), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(Point(17.377778, 7.528889, 0.0), Point(17.377778, 8.728889, 0.0)), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(18.0, 8.4, 0.0), Point(18.0, 9.6, 0.0)), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(W_p, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(Line(Point(10.464991, 3.349013, 0.0), Point(10.0, 4.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.0, 4.0, 0.0), Point(10.89308, 3.451776, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.0, 4.0, 0.0), Point(10.228943, 2.977392, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.5, 8.3, 0.0), Point(7.5, 7.5, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.5, 7.5, 0.0), Point(7.09192, 8.465201, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.5, 7.5, 0.0), Point(7.90808, 8.465201, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(G, Q_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Q_1, pointcolor=Color(0.502, 0.502, 0.502), pointsize=4.5)
S.add(R_1, pointcolor=Color(0.502, 0.502, 0.502), pointsize=4.5)
S.add(Line(A, R_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(S_1, P_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(R_1, Q_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Q_1, N), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(P_1, O), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(S_1, A), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(T_1, pointcolor=Color(0.502, 0.502, 0.502), pointsize=4.5)
S.add(U_1, pointcolor=Color(0.502, 0.502, 0.502), pointsize=4.5)
S.add(Line(U_1, T_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(A_2, pointcolor=Color(0.502, 0.502, 0.502), pointsize=3.0)
S.add(W_1, pointcolor=Color(0.502, 0.502, 0.502), pointsize=3.0)
S.add(Line(W_1, A_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G, P), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_2, P), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P, E), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P, F), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(E_2, pointcolor=Color(0.502, 0.502, 0.502), pointsize=4.5)
S.add(Line(C_2, E_2), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(F_2, pointcolor=Color(0.502, 0.502, 0.502), pointsize=3.0)
S.add(G_2, pointcolor=Color(0.502, 0.502, 0.502), pointsize=3.0)
S.add(Line(F_2, G_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J, C), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K, J), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J, A), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J, D), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(4.535009, 3.349013, 0.0), Point(5.0, 4.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.0, 4.0, 0.0), Point(4.771057, 2.977392, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 4.0, 0.0), Point(4.10692, 3.451776, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.5, 9.1, 0.0), Point(7.5, 8.3, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.5, 8.3, 0.0), Point(7.09192, 9.265201, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.5, 8.3, 0.0), Point(7.90808, 9.265201, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)

if __name__ == "__main__":
    viewer.show()
