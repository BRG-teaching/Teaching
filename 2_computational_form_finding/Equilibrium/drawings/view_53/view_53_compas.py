"""
COMPAS translation of GeoGebra applet: Expo Pavillon Lisbon, A. Siza
Source: https://block.arch.ethz.ch/eq/drawing/view/53
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
O_2 = Point(2.24018, 4.0, 0.0)  # O_2
H_1 = Point(4.0, 4.0, 0.0)  # H_1
Q_2 = Point(4.0, 2.302685, 0.0)  # Q_2
R_2 = Point(4.0, 4.0, 0.0)  # R_2
P_2 = Point(4.0, 7.394629, 0.0)  # P_2
N_1 = Point(5.632121, 7.094346, 0.0)  # N_1
M_1 = Point(5.632121, 7.394629, 0.0)  # M_1
I_1 = Point(6.43982, 7.394629, 0.0)  # I_1
L_1 = Point(6.43982, 7.286527, 0.0)  # L_1
O_1 = Point(5.75982, 7.256527, 0.0)  # O_1
S_2 = Point(5.75982, 4.0, 0.0)  # S_2
Q = Point(7.300668, 9.596484, 0.0)  # Q
P = Point(7.300668, 8.416083, 0.0)  # P
frameBL = Point(2.0, 2.0, 0.0)  # frameBL
fBR = Point(22.0, 2.0, 0.0)  # fBR
frameTR = Point(22.0, 12.0, 0.0)  # frameTR
fTL = Point(2.0, 12.0, 0.0)  # fTL
F = Point(7.300668, 9.320942, 0.0)  # F
G = Point(21.0, 11.0, 0.0)  # G
H = Point(3.622786, 10.740309, 0.0)  # H
J = Point(10.97855, 10.740309, 0.0)  # J
K = Point(10.97855, 10.577809, 0.0)  # K
I = Point(3.622786, 10.577809, 0.0)  # I
N = Point(21.0, 9.8, 0.0)  # N
O = Point(17.807793, 10.4, 0.0)  # O
R = Point(8.064917, 9.666585, 0.0)  # R
S_3 = Point(8.064917, 9.320942, 0.0)  # S
T = Point(8.064917, 8.975299, 0.0)  # T
Z_1 = Point(18.0, 4.0, 0.0)  # Z_1
A_2 = Point(14.807793, 4.6, 0.0)  # A_2
B_2 = Point(14.807793, 10.157654, 0.0)  # B_2
B = Point(4.05, 7.344629, 0.0)  # B
Q_1 = Point(6.43982, 6.895444, 0.0)  # Q_1
V_2 = Point(4.05, 4.0, 0.0)  # V_2
C = Point(3.622786, 9.666585, 0.0)  # C
E_p = Point(7.300668, 8.975299, 0.0)  # E'
D = Point(10.97855, 9.666585, 0.0)  # D
D_2 = Point(14.507793, 10.157654, 0.0)  # D_2
G_2 = Point(14.507793, 4.6, 0.0)  # G_2
H_2 = Point(18.266338, 4.138073, 0.0)  # H_2
F_2 = Point(15.07413, 10.295727, 0.0)  # F_2
E = Point(7.300668, 9.666585, 0.0)  # E
A_3 = Point(14.752376, 4.305163, 0.0)  # A_3
C_3 = Point(17.944583, 3.705163, 0.0)  # C_3
D_3 = Point(3.622786, 9.666585, 0.0)  # D_3
E_3 = Point(10.97855, 9.666585, 0.0)  # E_3
F_3 = Point(21.0, 10.4, 0.0)  # F_3

# --- geometry ---
S.add(Polyline([O_2, H_1, Q_2]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(R_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Polyline([R_2, P_2, N_1, M_1, I_1, L_1, O_1, S_2, R_2]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q, P), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([frameBL, fBR, frameTR, fTL, frameBL]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(F, pointcolor=Color(0.0, 0.6, 0.0), pointsize=4.5)
S.add(G, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Polygon([H, J, K, I]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.2, opacity=0.15)
S.add(Line(Point(7.300668, 10.408153, 0.0), Point(7.300668, 9.758153, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.300668, 9.758153, 0.0), Point(6.8988, 10.70866, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.300668, 9.758153, 0.0), Point(7.702536, 10.70866, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 11.0, 0.0), Point(21.0, 9.8, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 9.8, 0.0), Point(20.598132, 10.750508, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 9.8, 0.0), Point(21.401868, 10.750508, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(N, O), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O, G), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([Point(3.622786, 9.666585, 0.0), Point(3.736434, 9.645378, 0.0), Point(3.850204, 9.624838, 0.0), Point(3.964092, 9.604964, 0.0), Point(4.078094, 9.585757, 0.0), Point(4.192207, 9.567218, 0.0), Point(4.306427, 9.549348, 0.0), Point(4.420749, 9.532147, 0.0), Point(4.535171, 9.515616, 0.0), Point(4.649687, 9.499755, 0.0), Point(4.764294, 9.484565, 0.0), Point(4.878987, 9.470046, 0.0), Point(4.993764, 9.4562, 0.0), Point(5.108621, 9.443026, 0.0), Point(5.223552, 9.430525, 0.0), Point(5.338554, 9.418697, 0.0), Point(5.453624, 9.407543, 0.0), Point(5.568757, 9.397063, 0.0), Point(5.68395, 9.387257, 0.0), Point(5.799198, 9.378126, 0.0), Point(5.914498, 9.369671, 0.0), Point(6.029845, 9.36189, 0.0), Point(6.145235, 9.354786, 0.0), Point(6.260666, 9.348357, 0.0), Point(6.376132, 9.342604, 0.0), Point(6.491629, 9.337528, 0.0), Point(6.607155, 9.333128, 0.0), Point(6.722704, 9.329405, 0.0), Point(6.838273, 9.326358, 0.0), Point(6.953858, 9.323989, 0.0), Point(7.069455, 9.322296, 0.0), Point(7.185059, 9.321281, 0.0), Point(7.300668, 9.320942, 0.0), Point(7.416277, 9.321281, 0.0), Point(7.531882, 9.322296, 0.0), Point(7.647478, 9.323989, 0.0), Point(7.763063, 9.326358, 0.0), Point(7.878632, 9.329405, 0.0), Point(7.994182, 9.333128, 0.0), Point(8.109707, 9.337528, 0.0), Point(8.225205, 9.342604, 0.0), Point(8.340671, 9.348357, 0.0), Point(8.456101, 9.354786, 0.0), Point(8.571492, 9.36189, 0.0), Point(8.686839, 9.369671, 0.0), Point(8.802138, 9.378126, 0.0), Point(8.917386, 9.387257, 0.0), Point(9.032579, 9.397063, 0.0), Point(9.147712, 9.407543, 0.0), Point(9.262782, 9.418697, 0.0), Point(9.377784, 9.430525, 0.0), Point(9.492716, 9.443026, 0.0), Point(9.607572, 9.4562, 0.0), Point(9.722349, 9.470046, 0.0), Point(9.837043, 9.484565, 0.0), Point(9.95165, 9.499755, 0.0), Point(10.066166, 9.515616, 0.0), Point(10.180587, 9.532147, 0.0), Point(10.294909, 9.549348, 0.0), Point(10.409129, 9.567218, 0.0), Point(10.523242, 9.585757, 0.0), Point(10.637245, 9.604964, 0.0), Point(10.751133, 9.624838, 0.0), Point(10.864903, 9.645378, 0.0), Point(10.97855, 9.666585, 0.0)]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.8)  # arc
S.add(R, pointcolor=Color(0.0, 0.6, 0.0), pointsize=4.5)
S.add(S_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(T, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(Line(R, S_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(S_3, T), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(3.622786, 9.666585, 0.0), Point(2.983972, 9.786655, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(2.983972, 9.786655, 0.0), Point(3.992357, 10.006027, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(2.983972, 9.786655, 0.0), Point(3.843888, 9.216122, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.97855, 9.666585, 0.0), Point(11.617364, 9.786655, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.617364, 9.786655, 0.0), Point(10.757448, 9.216122, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.617364, 9.786655, 0.0), Point(10.60898, 10.006027, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.43982, 6.895444, 0.0), Point(7.078634, 6.775374, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.078634, 6.775374, 0.0), Point(6.070249, 6.556002, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.078634, 6.775374, 0.0), Point(6.218718, 7.345907, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Z_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(A_2, Z_1), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_1, B_2), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(B_2, A_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(14.507793, 10.157654, 0.0), Point(14.507793, 4.6, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.507793, 4.6, 0.0), Point(14.105924, 5.550508, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.507793, 4.6, 0.0), Point(14.909661, 5.550508, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(6.058978, 3.422935, 0.0), Point(5.75982, 4.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.75982, 4.0, 0.0), Point(6.55406, 3.341103, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.75982, 4.0, 0.0), Point(5.840509, 2.971189, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(B, Q_1), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B, V_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B, S_2), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(C, E_p), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(E_p, D), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(D_2, B_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(G_2, A_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Z_1, H_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(N, Z_1), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(O, A_2), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(Line(Point(4.05, 4.0, 0.0), Point(4.05, 3.35, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.05, 3.35, 0.0), Point(3.648132, 4.300508, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.05, 3.35, 0.0), Point(4.451868, 4.300508, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.266338, 4.138073, 0.0), Point(15.07413, 10.295727, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.07413, 10.295727, 0.0), Point(15.868371, 9.63683, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.07413, 10.295727, 0.0), Point(15.15482, 9.266916, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(B_2, F_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(C, D), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(F, S_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(E_p, T), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(E, R), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(14.752376, 4.305163, 0.0), Point(17.944583, 3.705163, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(17.944583, 3.705163, 0.0), Point(16.936199, 3.485791, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.944583, 3.705163, 0.0), Point(17.084667, 4.275696, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(A_3, A_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(C_3, Z_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(D_3, pointcolor=Color(0.0, 0.6, 0.0), pointsize=3.0)
S.add(E_3, pointcolor=Color(0.0, 0.6, 0.0), pointsize=3.0)
S.add(Line(O, F_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(21.0, 9.8, 0.0), Point(17.807793, 10.4, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(17.807793, 10.4, 0.0), Point(18.816177, 10.619372, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.807793, 10.4, 0.0), Point(18.667708, 9.829467, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.807793, 10.4, 0.0), Point(21.0, 11.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 11.0, 0.0), Point(20.140084, 10.429467, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 11.0, 0.0), Point(19.991616, 11.219372, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)

if __name__ == "__main__":
    viewer.show()
