"""
COMPAS translation of GeoGebra applet: Fan-harp bridge
Source: https://block.arch.ethz.ch/eq/drawing/view/21
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
D_1 = Point(8.0, 0.0, 0.0)  # D_1
F_1 = Point(32.0, 0.0, 0.0)  # F_1
towerControl2 = Point(20.0, 0.0, 0.0)  # towerControl2
deckControl1 = Point(20.0, 7.333333, 0.0)  # deckControl1
C_1 = Point(35.0, 20.0, 0.0)  # C_1
G_1 = Point(35.0, 0.0, 0.0)  # G_1
deckControl2 = Point(35.0, 7.333333, 0.0)  # deckControl2
deck6 = Point(33.0, 7.333333, 0.0)  # deck6
deck5 = Point(28.0, 7.333333, 0.0)  # deck5
deck2 = Point(12.0, 7.333333, 0.0)  # deck2
deck1 = Point(7.0, 7.333333, 0.0)  # deck1
Z = Point(20.0, 21.5, 0.0)  # Z
B_1 = Point(20.0, 7.833333, 0.0)  # B_1
tower1 = Point(20.0, 17.333333, 0.0)  # tower1
tower2 = Point(20.0, 17.333333, 0.0)  # tower2
deck4 = Point(23.0, 7.333333, 0.0)  # deck4
deck3 = Point(17.0, 7.333333, 0.0)  # deck3
tower3 = Point(20.0, 17.333333, 0.0)  # tower3
J_1 = Point(7.0, 22.632903, 0.0)  # J_1
Q_1 = Point(7.0, -4.996315, 0.0)  # Q_1
K_1 = Point(12.0, 22.632903, 0.0)  # K_1
R_1 = Point(12.0, -4.996315, 0.0)  # R_1
L_1 = Point(23.0, 22.632903, 0.0)  # L_1
S_1 = Point(23.0, -4.996315, 0.0)  # S_1
N_1 = Point(17.0, 22.632903, 0.0)  # N_1
U_1 = Point(17.0, -4.996315, 0.0)  # U_1
frameBL = Point(-4.03153, -7.634104, 0.0)  # frameBL
J_2 = Point(65.180713, -7.634104, 0.0)  # J_2
K_2 = Point(-4.03153, 26.972017, 0.0)  # K_2
frameTR = Point(65.180713, 26.972017, 0.0)  # frameTR
O_1 = Point(33.0, 22.632903, 0.0)  # O_1
M = Point(33.0, -4.996315, 0.0)  # M
P_1 = Point(28.0, 22.632903, 0.0)  # P_1
N = Point(28.0, -4.996315, 0.0)  # N
O = Point(47.0, 8.6, 0.0)  # O
LF_1 = Point(47.0, 11.6, 0.0)  # LF_1
LF_2 = Point(47.0, 14.6, 0.0)  # LF_2
LF_3 = Point(47.0, 17.6, 0.0)  # LF_3
T = Point(50.9, 11.6, 0.0)  # T
U_2 = Point(53.3, 14.6, 0.0)  # U_2
V_2 = Point(54.2, 17.6, 0.0)  # V_2
W_2 = Point(50.9, 5.6, 0.0)  # W_2
Z_2 = Point(53.3, 2.6, 0.0)  # Z_2
A_3 = Point(54.2, -0.4, 0.0)  # A_3
LF_4 = Point(47.0, -0.4, 0.0)  # LF_4
LF_5 = Point(47.0, 2.6, 0.0)  # LF_5
LF_6 = Point(47.0, 5.6, 0.0)  # LF_6
LF_7 = Point(47.0, 8.6, 0.0)  # LF_7
P = Point(44.5, 17.6, 0.0)  # P
R = Point(44.5, -0.4, 0.0)  # R

# --- geometry ---
S.add(Line(D_1, F_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(towerControl2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(deckControl1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(C_1, G_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(deckControl2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(deck6, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(deck5, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(deck2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(deck1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(Z, B_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(tower1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(tower2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(deck4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(deck3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(tower1, deck1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(tower3, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(tower2, deck2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(tower3, deck3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(tower3, deck4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(tower2, deck5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(tower1, deck6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_1, Q_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_1, R_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(L_1, S_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(N_1, U_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(20.0, -2.0, 0.0), Point(20.0, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(20.0, 0.0, 0.0), Point(21.250597, -2.95794, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(20.0, 0.0, 0.0), Point(18.749403, -2.95794, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(frameBL, J_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([frameBL, K_2, frameTR, J_2]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(tower1, towerControl2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(deck1, deck2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(deck6, deckControl2), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(O_1, M), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_1, N), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(O, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(LF_1, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(LF_2, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(LF_3, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(T, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(U_2, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(V_2, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(W_2, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Z_2, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(A_3, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(LF_4, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(LF_5, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(LF_6, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(LF_7, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(Line(LF_3, V_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LF_2, U_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LF_1, T), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LF_7, O), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LF_6, W_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LF_5, Z_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LF_4, A_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O, W_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W_2, Z_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_2, A_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O, T), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T, U_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_2, V_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T, W_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_2, Z_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V_2, A_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LF_3, LF_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(47.0, 17.6, 0.0), Point(47.0, 14.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(47.0, 14.6, 0.0), Point(45.749403, 17.55794, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(47.0, 14.6, 0.0), Point(48.250597, 17.55794, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(47.0, 14.6, 0.0), Point(47.0, 11.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(47.0, 11.6, 0.0), Point(45.749403, 14.55794, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(47.0, 11.6, 0.0), Point(48.250597, 14.55794, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(47.0, 11.6, 0.0), Point(47.0, 8.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(47.0, 8.6, 0.0), Point(45.749403, 11.55794, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(47.0, 8.6, 0.0), Point(48.250597, 11.55794, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(47.0, 8.6, 0.0), Point(47.0, 5.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(47.0, 5.6, 0.0), Point(45.749403, 8.55794, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(47.0, 5.6, 0.0), Point(48.250597, 8.55794, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(47.0, 5.6, 0.0), Point(47.0, 2.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(47.0, 2.6, 0.0), Point(45.749403, 5.55794, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(47.0, 2.6, 0.0), Point(48.250597, 5.55794, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(47.0, 2.6, 0.0), Point(47.0, -0.4, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(47.0, -0.4, 0.0), Point(45.749403, 2.55794, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(47.0, -0.4, 0.0), Point(48.250597, 2.55794, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(47.0, 8.6, 0.0), Point(47.0, 8.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(47.0, 8.6, 0.0), Point(45.749403, 11.55794, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(47.0, 8.6, 0.0), Point(48.250597, 11.55794, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(37.0, 7.333333, 0.0), Point(35.0, 7.333333, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.0, 7.333333, 0.0), Point(37.95794, 8.58393, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.0, 7.333333, 0.0), Point(37.95794, 6.082737, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(P, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(R, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(Line(Point(44.5, -0.4, 0.0), Point(44.5, 17.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(44.5, 17.6, 0.0), Point(45.750597, 14.64206, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(44.5, 17.6, 0.0), Point(43.249403, 14.64206, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(LF_4, R), linecolor=Color(0.0, 0.3922, 0.0), linewidth=1.2)
S.add(Line(LF_3, P), linecolor=Color(0.0, 0.3922, 0.0), linewidth=1.2)
S.add(Polygon([tower1, deck1, T, O]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([tower2, deck2, U_2, T]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([tower3, deck3, V_2, U_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([tower1, deck6, O, W_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([tower2, deck5, W_2, Z_2]), linecolor=Color(0.0, 0.3922, 0.0), facecolor=Color(0.0, 0.3922, 0.0), linewidth=1.2, opacity=0.5)
S.add(Polygon([tower3, deck4, Z_2, A_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([deck1, deck2, T, LF_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([deck2, deck3, U_2, LF_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([deck3, deckControl1, V_2, LF_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([deckControl1, deck4, A_3, LF_4]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([deck4, deck5, Z_2, LF_5]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([deck5, deck6, W_2, LF_6]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([tower2, tower3, Z_2, U_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([deckControl1, towerControl2, LF_4, LF_3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([tower3, deckControl1, A_3, V_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([tower1, tower2, W_2, T]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Line(deck2, deck3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(deck3, deckControl1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(deckControl1, deck4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(deck4, deck5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(deck5, deck6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(7.0, 7.333333, 0.0), Point(7.0, 5.333333, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.0, 5.333333, 0.0), Point(5.749403, 8.291273, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 5.333333, 0.0), Point(8.250597, 8.291273, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.0, 7.333333, 0.0), Point(12.0, 5.333333, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.0, 5.333333, 0.0), Point(10.749403, 8.291273, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.0, 5.333333, 0.0), Point(13.250597, 8.291273, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.0, 7.333333, 0.0), Point(17.0, 5.333333, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(17.0, 5.333333, 0.0), Point(15.749403, 8.291273, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.0, 5.333333, 0.0), Point(18.250597, 8.291273, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(23.0, 7.333333, 0.0), Point(23.0, 5.333333, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(23.0, 5.333333, 0.0), Point(21.749403, 8.291273, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(23.0, 5.333333, 0.0), Point(24.250597, 8.291273, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(28.0, 7.333333, 0.0), Point(28.0, 5.333333, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(28.0, 5.333333, 0.0), Point(26.749403, 8.291273, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(28.0, 5.333333, 0.0), Point(29.250597, 8.291273, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(33.0, 7.333333, 0.0), Point(33.0, 5.333333, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(33.0, 5.333333, 0.0), Point(31.749403, 8.291273, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(33.0, 5.333333, 0.0), Point(34.250597, 8.291273, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)

if __name__ == "__main__":
    viewer.show()
