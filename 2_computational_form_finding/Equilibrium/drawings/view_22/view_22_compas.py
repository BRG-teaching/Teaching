"""
COMPAS translation of GeoGebra applet: Cantilevered fan bridge
Source: https://block.arch.ethz.ch/eq/drawing/view/22
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
LL0 = Point(60.0, 0.0, 0.0)  # LL0
A = Point(0.0, 0.0, 0.0)  # A
H = Point(-21.795905, 31.127778, 0.0)  # H
N = Point(-2.724488, 3.890972, 0.0)  # N
O = Point(-8.173464, 11.672917, 0.0)  # O
P = Point(-13.62244, 19.454861, 0.0)  # P
Q = Point(-19.071417, 27.236805, 0.0)  # Q
L = Point(31.25, 0.0, 0.0)  # L
K = Point(18.75, 0.0, 0.0)  # K
J = Point(6.25, 0.0, 0.0)  # J
M = Point(43.75, 0.0, 0.0)  # M
J_1 = Point(43.75, 42.955615, 0.0)  # J_1
K_1 = Point(43.75, -13.042901, 0.0)  # K_1
B = Point(50.0, 0.0, 0.0)  # B
R = Point(67.096892, -3.076923, 0.0)  # R
LL1 = Point(60.0, -3.076923, 0.0)  # LL1
S_2 = Point(74.193784, -6.153846, 0.0)  # S
LL2 = Point(60.0, -6.153846, 0.0)  # LL2
T = Point(81.290676, -9.230769, 0.0)  # T
LL3 = Point(60.0, -9.230769, 0.0)  # LL3
U = Point(88.387568, -12.307692, 0.0)  # U
LL4 = Point(60.0, -12.307692, 0.0)  # LL4
V = Point(60.0, 7.058489, 0.0)  # V
W = Point(60.0, 14.116978, 0.0)  # W
Z = Point(60.0, 21.175467, 0.0)  # Z
A_1 = Point(60.0, 28.233956, 0.0)  # A_1
C_1 = Point(-19.071417, 42.955615, 0.0)  # C_1
R_1 = Point(-19.071417, -13.042901, 0.0)  # R_1
D_1 = Point(-13.62244, 42.955615, 0.0)  # D_1
Q_1 = Point(-13.62244, -13.042901, 0.0)  # Q_1
E_1 = Point(-8.173464, 42.955615, 0.0)  # E_1
P_1 = Point(-8.173464, -13.042901, 0.0)  # P_1
F_1 = Point(-2.724488, 42.955615, 0.0)  # F_1
O_1 = Point(-2.724488, -13.042901, 0.0)  # O_1
G_1 = Point(6.25, 42.955615, 0.0)  # G_1
N_1 = Point(6.25, -13.042901, 0.0)  # N_1
H_1 = Point(18.75, 42.955615, 0.0)  # H_1
M_1 = Point(18.75, -13.042901, 0.0)  # M_1
I_1 = Point(31.25, 42.955615, 0.0)  # I_1
L_1 = Point(31.25, -13.042901, 0.0)  # L_1
frameBL = Point(-46.898256, -22.230325, 0.0)  # frameBL
V_1 = Point(105.952983, -22.230325, 0.0)  # V_1
W_1 = Point(-46.898256, 54.195294, 0.0)  # W_1
frameTR = Point(105.952983, 54.195294, 0.0)  # frameTR
F = Point(56.0, 28.233956, 0.0)  # F
C = Point(56.0, -12.307692, 0.0)  # C
U_1 = Point(0.0, 42.955615, 0.0)  # U_1
Z_1 = Point(0.0, -13.042901, 0.0)  # Z_1
A_2 = Point(52.214296, 39.353094, 0.0)  # A_2
B_2 = Point(52.214296, 32.294605, 0.0)  # B_2
C_2 = Point(52.214296, 25.236116, 0.0)  # C_2
D_2 = Point(52.214296, 18.177627, 0.0)  # D_2
E_2 = Point(60.0, 39.353094, 0.0)  # E_2

# --- geometry ---
S.add(LL0, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(A, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Circle.from_point_and_radius(Point(-25.890613, 30.471468, 0.0), 12.0), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(H, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(N, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(A, N), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(O, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(P, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Q, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(L, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(L, P), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(K, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(K, L), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K, O), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(J, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(J, K), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A, J), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J, N), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(M, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(L, M), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M, Q), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_1, K_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(6.25, -2.074461, 0.0), Point(6.25, -7.074461, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(6.25, -7.074461, 0.0), Point(3.488129, -0.542022, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.25, -7.074461, 0.0), Point(9.011871, -0.542022, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.75, -2.074461, 0.0), Point(18.75, -7.074461, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(18.75, -7.074461, 0.0), Point(15.988129, -0.542022, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.75, -7.074461, 0.0), Point(21.511871, -0.542022, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(31.25, -2.074461, 0.0), Point(31.25, -7.074461, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(31.25, -7.074461, 0.0), Point(28.488129, -0.542022, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(31.25, -7.074461, 0.0), Point(34.011871, -0.542022, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(43.75, -2.074461, 0.0), Point(43.75, -7.074461, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(43.75, -7.074461, 0.0), Point(40.988129, -0.542022, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(43.75, -7.074461, 0.0), Point(46.511871, -0.542022, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(-19.071417, -2.074461, 0.0), Point(-19.071417, -7.074461, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(-19.071417, -7.074461, 0.0), Point(-21.833287, -0.542022, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(-19.071417, -7.074461, 0.0), Point(-16.309546, -0.542022, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(-13.62244, -2.074461, 0.0), Point(-13.62244, -7.074461, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(-13.62244, -7.074461, 0.0), Point(-16.384311, -0.542022, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(-13.62244, -7.074461, 0.0), Point(-10.86057, -0.542022, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(-8.173464, -2.074461, 0.0), Point(-8.173464, -7.074461, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(-8.173464, -7.074461, 0.0), Point(-10.935335, -0.542022, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(-8.173464, -7.074461, 0.0), Point(-5.411593, -0.542022, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(-2.724488, -2.074461, 0.0), Point(-2.724488, -7.074461, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(-2.724488, -7.074461, 0.0), Point(-5.486359, -0.542022, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(-2.724488, -7.074461, 0.0), Point(0.037383, -0.542022, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(M, B), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N, O), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O, P), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P, Q), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q, H), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(LL0, R), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R, LL1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R, S_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_2, LL2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_2, T), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T, LL3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T, U), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U, LL4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V, R), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W, S_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z, T), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_1, U), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(0.0, -9.574461, 0.0), Point(0.0, -2.074461, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(0.0, -2.074461, 0.0), Point(2.761871, -8.6069, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(0.0, -2.074461, 0.0), Point(-2.761871, -8.6069, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Polygon([A, J, U, LL4]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([J, K, T, LL3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([K, L, S_2, LL2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([L, M, R, LL1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([A, N, A_1, U]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([N, O, Z, T]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([O, P, W, S_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([P, Q, V, R]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([M, Q, R, LL0]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([L, P, S_2, R]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([K, O, T, S_2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([J, N, U, T]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Line(C_1, R_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_1, Q_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_1, P_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F_1, O_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G_1, N_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_1, M_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_1, L_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(60.0, 28.233956, 0.0), Point(60.0, 21.175467, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(60.0, 21.175467, 0.0), Point(57.238129, 27.707906, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(60.0, 21.175467, 0.0), Point(62.761871, 27.707906, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(60.0, 21.175467, 0.0), Point(60.0, 14.116978, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(60.0, 14.116978, 0.0), Point(57.238129, 20.649417, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(60.0, 14.116978, 0.0), Point(62.761871, 20.649417, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(60.0, 14.116978, 0.0), Point(60.0, 7.058489, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(60.0, 7.058489, 0.0), Point(57.238129, 13.590928, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(60.0, 7.058489, 0.0), Point(62.761871, 13.590928, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(60.0, 7.058489, 0.0), Point(60.0, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(60.0, 0.0, 0.0), Point(57.238129, 6.532439, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(60.0, 0.0, 0.0), Point(62.761871, 6.532439, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(60.0, 0.0, 0.0), Point(60.0, -3.076923, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(60.0, -3.076923, 0.0), Point(57.238129, 3.455515, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(60.0, -3.076923, 0.0), Point(62.761871, 3.455515, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(60.0, -3.076923, 0.0), Point(60.0, -6.153846, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(60.0, -6.153846, 0.0), Point(57.238129, 0.378592, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(60.0, -6.153846, 0.0), Point(62.761871, 0.378592, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(60.0, -6.153846, 0.0), Point(60.0, -9.230769, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(60.0, -9.230769, 0.0), Point(57.238129, -2.698331, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(60.0, -9.230769, 0.0), Point(62.761871, -2.698331, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(60.0, -9.230769, 0.0), Point(60.0, -12.307692, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(60.0, -12.307692, 0.0), Point(57.238129, -5.775254, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(60.0, -12.307692, 0.0), Point(62.761871, -5.775254, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(frameBL, V_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([frameBL, W_1, frameTR, V_1]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_1, F), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(LL4, C), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(U_1, Z_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U, A_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(T, B_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(S_2, C_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(R, D_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(LL0, E_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)

if __name__ == "__main__":
    viewer.show()
