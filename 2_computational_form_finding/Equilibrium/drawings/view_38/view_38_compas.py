"""
COMPAS translation of GeoGebra applet: Lenticular truss
Source: https://block.arch.ethz.ch/eq/drawing/view/38
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
LL0 = Point(16.0, 10.0, 0.0)  # LL0
G2 = Point(9.152645, 5.678437, 0.0)  # G2
G1 = Point(1.152645, 5.678437, 0.0)  # G1
N = Point(2.485979, 8.178437, 0.0)  # N
H_2 = Point(2.485979, 5.878437, 0.0)  # H_2
P = Point(2.485979, 6.365969, 0.0)  # P
P_p = Point(2.485979, 4.990905, 0.0)  # P'
pole = Point(22.421394, 6.492679, 0.0)  # pole
frameBL = Point(-0.703226, 0.009338, 0.0)  # frameBL
fBR = Point(23.296774, 0.009338, 0.0)  # fBR
frameTR = Point(23.296774, 12.009338, 0.0)  # frameTR
fTL = Point(-0.703226, 12.009338, 0.0)  # fTL
LLB0 = Point(16.0, 10.0, 0.0)  # LLB0
FP0 = Point(1.152645, 10.505178, 0.0)  # FP0
LLB1 = Point(16.0, 8.8, 0.0)  # LLB1
LLB2 = Point(16.0, 7.6, 0.0)  # LLB2
FP2 = Point(3.819312, 9.297831, 0.0)  # FP2
LLB3 = Point(16.0, 6.4, 0.0)  # LLB3
FP3 = Point(5.152645, 9.067908, 0.0)  # FP3
LLB4 = Point(16.0, 5.2, 0.0)  # LLB4
FP4 = Point(6.485979, 9.087151, 0.0)  # FP4
FP5 = Point(7.819312, 9.355562, 0.0)  # FP5
LLB5 = Point(16.0, 4.0, 0.0)  # LLB5
F = Point(9.152645, 9.87314, 0.0)  # F
FP1 = Point(2.485979, 9.776921, 0.0)  # FP1
G = Point(5.152645, 8.320406, 0.0)  # G
H = Point(16.0, 7.0, 0.0)  # H
J_1 = Point(1.152645, 10.885301, 0.0)  # J_1
K_1 = Point(1.152645, 0.598649, 0.0)  # K_1
L_1 = Point(9.152645, 0.598649, 0.0)  # L_1
M_1 = Point(9.152645, 10.885301, 0.0)  # M_1
Q = Point(3.819312, 4.578385, 0.0)  # Q
R = Point(3.819312, 6.778488, 0.0)  # R
U = Point(5.152645, 6.915995, 0.0)  # U
V = Point(5.152645, 4.440879, 0.0)  # V
O_1 = Point(6.485979, 6.778488, 0.0)  # O_1
P_1 = Point(6.485979, 4.578385, 0.0)  # P_1
Q_1 = Point(7.819312, 4.990905, 0.0)  # Q_1
R_1 = Point(7.819312, 6.365969, 0.0)  # R_1
V_1 = Point(16.75, 10.0, 0.0)  # V_1
Z_1 = Point(17.5, 10.0, 0.0)  # Z_1
B_2 = Point(17.5, 7.0, 0.0)  # B_2
C_2 = Point(17.5, 8.5, 0.0)  # C_2
W_1 = Point(16.0, 8.5, 0.0)  # W_1
D_2 = Point(17.5, 8.8, 0.0)  # D_2
E_2 = Point(17.5, 7.9, 0.0)  # E_2
LL5 = Point(16.0, 4.0, 0.0)  # LL5
S_1 = Point(16.75, 4.0, 0.0)  # S_1
S_2 = Point(13.091046, 8.5, 0.0)  # S_2
R_2 = Point(16.0, 7.0, 0.0)  # R_2
F_2 = Point(13.091046, 7.9, 0.0)  # F_2
LL1 = Point(16.0, 8.8, 0.0)  # LL1
G_2 = Point(13.091046, 7.9, 0.0)  # G_2
U_2 = Point(13.091046, 7.3, 0.0)  # U_2
LL2 = Point(16.0, 7.6, 0.0)  # LL2
W_2 = Point(13.091046, 7.3, 0.0)  # W_2
B_3 = Point(13.091046, 6.7, 0.0)  # B_3
D_3 = Point(13.091046, 6.7, 0.0)  # D_3
LL3 = Point(16.0, 6.4, 0.0)  # LL3
F_3 = Point(13.091046, 6.1, 0.0)  # F_3
G_3 = Point(13.091046, 6.1, 0.0)  # G_3
LL4 = Point(16.0, 5.2, 0.0)  # LL4
H_3 = Point(13.091046, 5.5, 0.0)  # H_3
J_3 = Point(5.152645, 9.660435, 0.0)  # J_3
U_1 = Point(16.75, 7.0, 0.0)  # U_1
N_3 = Point(17.5, 7.0, 0.0)  # N_3
O_3 = Point(2.485979, 5.678437, 0.0)  # O_3
P_3 = Point(0.484995, 6.365969, 0.0)  # P_3
T_3 = Point(0.484995, 5.678437, 0.0)  # T_3
U_3 = Point(0.484995, 4.990905, 0.0)  # U_3
Q_3 = Point(2.485979, 6.365969, 0.0)  # Q_3
R_3 = Point(2.485979, 5.678437, 0.0)  # R_3
S_3 = Point(2.485979, 4.990905, 0.0)  # S_3

# --- geometry ---
S.add(LL0, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(G2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(G1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(G1, G2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(1.152645, 3.178437, 0.0), Point(1.152645, 4.178437, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(1.152645, 4.178437, 0.0), Point(1.650998, 2.999723, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(1.152645, 4.178437, 0.0), Point(0.654293, 2.999723, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(2.485979, 10.885301, 0.0), Point(2.485979, 0.598649, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N, H_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(P, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(G1, P), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(P_p, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(G1, P_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(pole, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Polyline([frameBL, fBR, frameTR, fTL, frameBL]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(2.485979, 8.178437, 0.0), Point(2.485979, 7.178437, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(2.485979, 7.178437, 0.0), Point(1.987626, 8.357151, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(2.485979, 7.178437, 0.0), Point(2.984331, 8.357151, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.819312, 8.178437, 0.0), Point(3.819312, 7.178437, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.819312, 7.178437, 0.0), Point(3.32096, 8.357151, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.819312, 7.178437, 0.0), Point(4.317664, 8.357151, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.152645, 8.178437, 0.0), Point(5.152645, 7.178437, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.152645, 7.178437, 0.0), Point(4.654293, 8.357151, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.152645, 7.178437, 0.0), Point(5.650998, 8.357151, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.485979, 8.178437, 0.0), Point(6.485979, 7.178437, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(6.485979, 7.178437, 0.0), Point(5.987626, 8.357151, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.485979, 7.178437, 0.0), Point(6.984331, 8.357151, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.819312, 8.178437, 0.0), Point(7.819312, 7.178437, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.819312, 7.178437, 0.0), Point(7.32096, 8.357151, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.819312, 7.178437, 0.0), Point(8.317664, 8.357151, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.819312, 10.885301, 0.0), Point(3.819312, 0.598649, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(5.152645, 10.885301, 0.0), Point(5.152645, 0.598649, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(6.485979, 10.885301, 0.0), Point(6.485979, 0.598649, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(7.819312, 10.885301, 0.0), Point(7.819312, 0.598649, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(16.0, 10.0, 0.0), Point(16.0, 8.8, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.0, 8.8, 0.0), Point(15.501648, 9.978714, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.0, 8.8, 0.0), Point(16.498352, 9.978714, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.0, 8.8, 0.0), Point(16.0, 7.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.0, 7.6, 0.0), Point(15.501648, 8.778714, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.0, 7.6, 0.0), Point(16.498352, 8.778714, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.0, 7.6, 0.0), Point(16.0, 6.4, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.0, 6.4, 0.0), Point(15.501648, 7.578714, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.0, 6.4, 0.0), Point(16.498352, 7.578714, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.0, 6.4, 0.0), Point(16.0, 5.2, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.0, 5.2, 0.0), Point(15.501648, 6.378714, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.0, 5.2, 0.0), Point(16.498352, 6.378714, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.0, 5.2, 0.0), Point(16.0, 4.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.0, 4.0, 0.0), Point(15.501648, 5.178714, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.0, 4.0, 0.0), Point(16.498352, 5.178714, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(LLB0, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(FP0, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(LLB1, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(LLB2, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(FP2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(LLB3, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(FP3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(LLB4, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(FP4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(FP5, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(LLB5, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(F, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Polyline([FP0, FP1, FP2, FP3, FP4, FP5, F]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(G, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Polyline([FP0, G, F]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(9.152645, 3.178437, 0.0), Point(9.152645, 4.178437, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.152645, 4.178437, 0.0), Point(9.650998, 2.999723, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.152645, 4.178437, 0.0), Point(8.654293, 2.999723, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(2.485979, 9.178437, 0.0), Point(2.485979, 8.178437, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(2.485979, 8.178437, 0.0), Point(1.987626, 9.357151, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(2.485979, 8.178437, 0.0), Point(2.984331, 9.357151, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(pole, H), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(J_1, K_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_1, M_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P, P_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Q, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(R, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(P, R), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_p, Q), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(U, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(V, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(R, U), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q, V), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R, Q), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U, V), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(O_1, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(P_1, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Q_1, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(R_1, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(V, P_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_1, P_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_1, R_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_1, Q_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_1, Q_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_1, G2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_1, G2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(16.75, 4.0, 0.0), Point(16.75, 7.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.75, 7.0, 0.0), Point(17.248352, 5.821286, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.75, 7.0, 0.0), Point(16.251648, 5.821286, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.75, 7.0, 0.0), Point(16.75, 10.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.75, 10.0, 0.0), Point(17.248352, 8.821286, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.75, 10.0, 0.0), Point(16.251648, 8.821286, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(LL0, V_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Z_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(B_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(C_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(LL0, Z_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(W_1, C_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(D_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(E_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(LL5, S_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_2, W_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(R_2, S_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_p, R), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(U, P_1), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(S_2, F_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL1, F_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_2, R_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_2, U_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_2, LL2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_2, W_2), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(W_2, R_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W_2, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_3, LL3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_3, R_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_3, F_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_3, G_3), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(F_3, R_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_3, LL4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_3, H_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_3, R_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_3, LL5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([P, G1, S_2, LL0]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([P, R, LL1, F_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([R, U, LL2, U_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([U, O_1, LL3, D_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([O_1, R_1, LL4, G_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([R_1, G2, LL5, H_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([P, P_p, F_2, S_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([R, P_p, G_2, F_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([R, Q, U_2, G_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([U, Q, W_2, U_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([U, V, B_3, W_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([U, P_1, D_3, B_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([O_1, P_1, F_3, D_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([O_1, Q_1, G_3, F_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([R_1, Q_1, H_3, G_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([P_p, G1, R_2, S_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([P_p, Q, G_2, R_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([V, Q, R_2, W_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([P_1, V, R_2, B_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([P_1, Q_1, F_3, R_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([Q_1, G2, H_3, R_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Line(P_p, R), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q, U), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U, P_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_1, Q_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(J_3, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(5.152645, 10.660435, 0.0), Point(5.152645, 9.660435, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.152645, 9.660435, 0.0), Point(4.654293, 10.83915, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(5.152645, 9.660435, 0.0), Point(5.650998, 10.83915, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(R_2, U_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(N_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(Point(16.0, 10.0, 0.0), Point(16.0, 4.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.0, 4.0, 0.0), Point(15.501648, 5.178714, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(16.0, 4.0, 0.0), Point(16.498352, 5.178714, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(P_p, O_3), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(P_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(T_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(U_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(Q_3, P_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(R_3, T_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(S_3, U_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(P_3, T_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(T_3, U_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(P, P_p), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)

if __name__ == "__main__":
    viewer.show()
