"""
COMPAS translation of GeoGebra applet: Suspended roof
Source: https://block.arch.ethz.ch/eq/drawing/view/24
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
O_1 = Point(13.547831, 2.352387, 0.0)  # O_1
B_19 = Point(17.138329, 2.352387, 0.0)  # B_{19}
B_3 = Point(17.138329, 2.292763, 0.0)  # B_3
G = Point(27.513506, 8.59541, 0.0)  # G
B_16 = Point(4.0, 3.14419, 0.0)  # B_{16}
B_17 = Point(16.0, 5.44419, 0.0)  # B_{17}
o = Point(35.012743, 7.204193, 0.0)  # o
C_9 = Point(15.0, 0.0, 0.0)  # C_9
D_9 = Point(15.0, 8.275813, 0.0)  # D_9
D_8 = Point(13.0, 8.275813, 0.0)  # D_8
C_8 = Point(13.0, 0.0, 0.0)  # C_8
f = Point(27.513506, 3.881125, 0.0)  # f
e = Point(27.513506, 4.823982, 0.0)  # e
L_1 = Point(15.0, 4.875342, 0.0)  # L_1
L_6 = Point(13.0, 3.9891, 0.0)  # L_6
C_7 = Point(11.0, 0.0, 0.0)  # C_7
D_7 = Point(11.0, 8.275813, 0.0)  # D_7
L_5 = Point(11.0, 3.354313, 0.0)  # L_5
C_5 = Point(9.0, 0.0, 0.0)  # C_5
D_5 = Point(9.0, 8.275813, 0.0)  # D_5
c = Point(27.513506, 6.709696, 0.0)  # c
b = Point(27.513506, 7.652553, 0.0)  # b
C_3 = Point(5.0, 0.0, 0.0)  # C_3
D_3 = Point(5.0, 8.275813, 0.0)  # D_3
L_2 = Point(5.0, 2.958675, 0.0)  # L_2
D_4 = Point(7.0, 8.275813, 0.0)  # D_4
C_4 = Point(7.0, 0.0, 0.0)  # C_4
L_3 = Point(7.0, 2.8391, 0.0)  # L_3
L_4 = Point(9.0, 2.97098, 0.0)  # L_4
H_1 = Point(0.023649, 0.253731, 0.0)  # H_1
I_1 = Point(3.026419, 0.253731, 0.0)  # I_1
J_1 = Point(3.021131, 0.364407, 0.0)  # J_1
K_1 = Point(6.634075, 0.349321, 0.0)  # K_1
D = Point(0.243396, 0.253731, 0.0)  # D
D_2 = Point(4.0, 8.275813, 0.0)  # D_2
C_2 = Point(4.0, 0.0, 0.0)  # C_2
D_10 = Point(16.0, 8.275813, 0.0)  # D_{10}
C_10 = Point(16.0, 0.0, 0.0)  # C_{10}
B_22 = Point(23.089489, 2.292763, 0.0)  # B_{22}
E_4 = Point(20.587758, 2.292763, 0.0)  # E_4
E_2 = Point(15.169472, 2.352387, 0.0)  # E_2
d = Point(27.513506, 5.766839, 0.0)  # d
g = Point(27.513506, 2.938268, 0.0)  # g
B_15 = Point(5.0, 2.738675, 0.0)  # B_{15}
B_23 = Point(7.0, 3.5191, 0.0)  # B_{23}
B_24 = Point(9.0, 4.04098, 0.0)  # B_{24}
B_26 = Point(11.0, 4.354313, 0.0)  # B_{26}
B_27 = Point(13.0, 4.4691, 0.0)  # B_{27}
B_21 = Point(15.0, 4.345342, 0.0)  # B_{21}
i_7 = Point(32.877114, -0.746107, 0.0)  # i_7
J = Point(8.0, 2.779313, 0.0)  # J
K = Point(12.0, 3.54598, 0.0)  # K
j = Point(33.384009, 13.112375, 0.0)  # j
M_1 = Point(0.243396, 0.253731, 0.0)  # M_1
B_2 = Point(4.768326, 0.357112, 0.0)  # B_2
R_1 = Point(4.0, 9.431232, 0.0)  # R_1
S_1 = Point(5.0, 9.431232, 0.0)  # S_1
T_1 = Point(7.0, 9.431232, 0.0)  # T_1
V_1 = Point(9.0, 9.431232, 0.0)  # V_1
W_1 = Point(10.0, 9.431232, 0.0)  # W_1
F_2 = Point(11.0, 9.431232, 0.0)  # F_2
G_2 = Point(13.0, 9.431232, 0.0)  # G_2
H_2 = Point(15.0, 9.431232, 0.0)  # H_2
I_2 = Point(16.0, 9.431232, 0.0)  # I_2
R = Point(23.597598, 5.44419, 0.0)  # R
S_2 = Point(23.597598, 2.352387, 0.0)  # S
T = Point(-0.922021, 5.44419, 0.0)  # T
U = Point(-0.922021, 3.14419, 0.0)  # U
V = Point(-0.922021, 0.253731, 0.0)  # V
W = Point(15.156673, -0.282128, 0.0)  # W
Z = Point(20.587758, -0.282128, 0.0)  # Z
O_2 = Point(15.169472, -1.291607, 0.0)  # O_2
P_2 = Point(15.169472, -1.291607, 0.0)  # P_2
Q_2 = Point(2.858126, 1.740256, 0.0)  # Q_2
R_2 = Point(17.033952, 4.176854, 0.0)  # R_2
frameBL = Point(-4.952853, -5.650836, 0.0)  # frameBL
H_3 = Point(39.93394, -5.650836, 0.0)  # H_3
I_3 = Point(-4.952853, 16.79256, 0.0)  # I_3
frameTR = Point(39.93394, 16.79256, 0.0)  # frameTR
M_3 = Point(35.301955, 7.283921, 0.0)  # M_3
O_3 = Point(33.673221, 13.192103, 0.0)  # O_3
S_3 = Point(27.343645, 2.690988, 0.0)  # S_3
J_3 = Point(27.330563, 8.833174, 0.0)  # J_3
K_3 = Point(33.201065, 13.350138, 0.0)  # K_3
P_3 = Point(33.166843, -0.823935, 0.0)  # P_3
Q_3 = Point(32.587385, -0.668279, 0.0)  # Q_3
R_3 = Point(35.302472, 7.126365, 0.0)  # R_3
V_3 = Point(32.707253, -0.993387, 0.0)  # V_3
V_2 = Point(6.634075, 1.01701, 0.0)  # V_2
W_2 = Point(10.094967, 1.01701, 0.0)  # W_2
Z_2 = Point(10.094967, 1.684699, 0.0)  # Z_2
A_3 = Point(13.547831, 1.684699, 0.0)  # A_3

# --- geometry ---
S.add(O_1, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=4.5)
S.add(B_19, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=4.5)
S.add(B_3, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=4.5)
S.add(G, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(B_16, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(B_17, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(o, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(Line(C_9, D_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(D_8, C_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(f, o), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(e, o), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(L_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(L_6, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(C_7, D_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(L_5, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(B_16, B_17), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(C_5, D_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(c, o), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G, o), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(b, o), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_3, D_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(L_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(D_4, C_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(L_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(L_4, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Polyline([H_1, I_1, J_1, K_1]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(D, B_16), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_2, C_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(D_10, C_10), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(B_22, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=4.5)
S.add(E_4, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(B_17, E_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(E_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(B_17, E_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(d, o), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(g, o), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_15, L_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_23, L_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_24, L_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_26, L_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_27, L_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_1, B_21), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(5.0, 7.3, 0.0), Point(5.0, 6.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.0, 6.0, 0.0), Point(4.18894, 7.918337, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 6.0, 0.0), Point(5.81106, 7.918337, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 7.3, 0.0), Point(7.0, 6.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.0, 6.0, 0.0), Point(6.18894, 7.918337, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 6.0, 0.0), Point(7.81106, 7.918337, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 7.3, 0.0), Point(9.0, 6.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.0, 6.0, 0.0), Point(8.18894, 7.918337, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 6.0, 0.0), Point(9.81106, 7.918337, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 7.3, 0.0), Point(11.0, 6.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.0, 6.0, 0.0), Point(10.18894, 7.918337, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 6.0, 0.0), Point(11.81106, 7.918337, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 7.3, 0.0), Point(13.0, 6.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.0, 6.0, 0.0), Point(12.18894, 7.918337, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 6.0, 0.0), Point(13.81106, 7.918337, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.0, 7.3, 0.0), Point(15.0, 6.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.0, 6.0, 0.0), Point(14.18894, 7.918337, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.0, 6.0, 0.0), Point(15.81106, 7.918337, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.832219, 1.096895, 0.0), Point(15.169472, 2.352387, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.169472, 2.352387, 0.0), Point(15.455098, 0.289318, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.169472, 2.352387, 0.0), Point(13.888515, 0.710138, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(20.587758, 2.292763, 0.0), Point(21.659302, 1.556697, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.659302, 1.556697, 0.0), Point(19.618859, 1.97434, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.659302, 1.556697, 0.0), Point(20.537311, 3.311396, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Polygon([B_17, E_2, i_7, o]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Line(J, K), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.0)
S.add(Polyline([B_16, L_2, L_3, L_4, L_5, L_6, L_1, B_17]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([D, B_16, G, j]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(M_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(Point(0.243396, 0.253731, 0.0), Point(-0.786914, -0.539024, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(-0.786914, -0.539024, 0.0), Point(0.238863, 1.273603, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(-0.786914, -0.539024, 0.0), Point(1.228051, -0.012002, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(B_2, pointcolor=Color(0.7529, 0.7529, 0.7529), pointsize=3.0)
S.add(Line(Point(5.113815, -0.896139, 0.0), Point(4.768326, 0.357112, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.768326, 0.357112, 0.0), Point(6.060038, -1.276692, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.768326, 0.357112, 0.0), Point(4.496251, -1.707788, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(B_16, B_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([B_16, B_2, o, j]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_16, L_2, G, o]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([L_2, L_3, b, o]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([L_3, L_4, c, o]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([L_4, L_5, d, o]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([L_5, L_6, e, o]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([L_6, L_1, f, o]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([L_1, B_17, g, o]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([B_17, E_4, g, i_7]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(R_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(S_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(T_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(V_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(W_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(F_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(G_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(H_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(I_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(R_1, S_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(S_1, T_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(T_1, V_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(V_1, F_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(F_2, G_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(G_2, H_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(I_2, H_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(D_2, R_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(S_1, D_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(T_1, D_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(V_1, D_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(F_2, D_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(G_2, D_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_2, D_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(I_2, D_10), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(R, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(S_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(T, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(U, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(V, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(T, U), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(U, V), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(S_2, R), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(W, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Z, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(W, Z), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Polyline([Point(15.769472, 2.352387, 0.0), Point(15.769347, 2.364652, 0.0), Point(15.768971, 2.376912, 0.0), Point(15.768344, 2.389162, 0.0), Point(15.767468, 2.401396, 0.0), Point(15.766341, 2.41361, 0.0), Point(15.764965, 2.425798, 0.0), Point(15.763339, 2.437956, 0.0), Point(15.761466, 2.450078, 0.0), Point(15.759345, 2.462159, 0.0), Point(15.756978, 2.474194, 0.0), Point(15.754366, 2.486178, 0.0), Point(15.751508, 2.498107, 0.0), Point(15.748408, 2.509974, 0.0), Point(15.745066, 2.521776, 0.0), Point(15.741483, 2.533506, 0.0), Point(15.737661, 2.545162, 0.0), Point(15.733601, 2.556736, 0.0), Point(15.729306, 2.568225, 0.0), Point(15.724777, 2.579624, 0.0), Point(15.720016, 2.590928, 0.0), Point(15.715025, 2.602132, 0.0), Point(15.709806, 2.613232, 0.0), Point(15.70436, 2.624223, 0.0), Point(15.698692, 2.635101, 0.0), Point(15.692802, 2.64586, 0.0), Point(15.686694, 2.656496, 0.0), Point(15.680369, 2.667006, 0.0), Point(15.673831, 2.677383, 0.0), Point(15.667082, 2.687626, 0.0), Point(15.660125, 2.697728, 0.0), Point(15.652963, 2.707685, 0.0), Point(15.645599, 2.717494, 0.0), Point(15.638036, 2.727151, 0.0), Point(15.630277, 2.736651, 0.0), Point(15.622326, 2.74599, 0.0), Point(15.614185, 2.755165, 0.0), Point(15.605859, 2.764172, 0.0), Point(15.59735, 2.773006, 0.0), Point(15.588663, 2.781665, 0.0), Point(15.5798, 2.790145, 0.0), Point(15.570765, 2.798441, 0.0), Point(15.561563, 2.806551, 0.0), Point(15.552198, 2.814471, 0.0), Point(15.542672, 2.822198, 0.0), Point(15.53299, 2.829729, 0.0), Point(15.523156, 2.83706, 0.0), Point(15.513175, 2.844189, 0.0), Point(15.50305, 2.851112, 0.0), Point(15.492785, 2.857827, 0.0), Point(15.482385, 2.86433, 0.0), Point(15.471855, 2.87062, 0.0), Point(15.461198, 2.876693, 0.0), Point(15.450419, 2.882546, 0.0), Point(15.439523, 2.888179, 0.0), Point(15.428514, 2.893587, 0.0), Point(15.417397, 2.898769, 0.0), Point(15.406176, 2.903723, 0.0), Point(15.394856, 2.908447, 0.0), Point(15.383442, 2.912938, 0.0), Point(15.371939, 2.917194, 0.0), Point(15.360351, 2.921215, 0.0), Point(15.348683, 2.924998, 0.0), Point(15.336941, 2.928542, 0.0), Point(15.325128, 2.931845, 0.0)]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)  # arc
S.add(O_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(P_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(O_2, P_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Polyline([Q_2, B_15, B_23, B_24, B_26, B_27, B_21, R_2]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(27.513506, 8.59541, 0.0), Point(27.513506, 7.652553, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(27.513506, 7.652553, 0.0), Point(26.702446, 9.57089, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(27.513506, 7.652553, 0.0), Point(28.324566, 9.57089, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(27.513506, 7.652553, 0.0), Point(27.513506, 6.709696, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(27.513506, 6.709696, 0.0), Point(26.702446, 8.628033, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(27.513506, 6.709696, 0.0), Point(28.324566, 8.628033, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(27.513506, 6.709696, 0.0), Point(27.513506, 5.766839, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(27.513506, 5.766839, 0.0), Point(26.702446, 7.685176, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(27.513506, 5.766839, 0.0), Point(28.324566, 7.685176, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(27.513506, 5.766839, 0.0), Point(27.513506, 4.823982, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(27.513506, 4.823982, 0.0), Point(26.702446, 6.742319, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(27.513506, 4.823982, 0.0), Point(28.324566, 6.742319, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(27.513506, 4.823982, 0.0), Point(27.513506, 3.881125, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(27.513506, 3.881125, 0.0), Point(26.702446, 5.799462, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(27.513506, 3.881125, 0.0), Point(28.324566, 5.799462, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(27.513506, 3.881125, 0.0), Point(27.513506, 2.938268, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(27.513506, 2.938268, 0.0), Point(26.702446, 4.856605, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(27.513506, 2.938268, 0.0), Point(28.324566, 4.856605, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(g, i_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(i_7, o), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(o, j), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(j, G), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(frameBL, H_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([frameBL, I_3, frameTR, H_3]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(M_3, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(O_3, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(Line(Point(35.301955, 7.283921, 0.0), Point(33.673221, 13.192103, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(33.673221, 13.192103, 0.0), Point(34.964933, 11.558299, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(33.673221, 13.192103, 0.0), Point(33.401146, 11.127203, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(j, O_3), linecolor=Color(0.0, 0.3922, 0.0), linewidth=1.2)
S.add(Line(o, M_3), linecolor=Color(0.0, 0.3922, 0.0), linewidth=1.2)
S.add(S_3, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(Line(g, S_3), linecolor=Color(0.0, 0.3922, 0.0), linewidth=1.2)
S.add(J_3, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(K_3, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(Line(Point(33.201065, 13.350138, 0.0), Point(27.330563, 8.833174, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(27.330563, 8.833174, 0.0), Point(28.356339, 10.645802, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(27.330563, 8.833174, 0.0), Point(29.345528, 9.360197, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(G, J_3), linecolor=Color(0.0, 0.3922, 0.0), linewidth=1.2)
S.add(Line(j, K_3), linecolor=Color(0.0, 0.3922, 0.0), linewidth=1.2)
S.add(P_3, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(Q_3, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(R_3, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(Line(Point(33.166843, -0.823935, 0.0), Point(35.302472, 7.126365, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.302472, 7.126365, 0.0), Point(35.588098, 5.063296, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.302472, 7.126365, 0.0), Point(34.021514, 5.484115, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(V_3, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(Line(Point(27.343645, 2.690988, 0.0), Point(32.707253, -0.993387, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(32.707253, -0.993387, 0.0), Point(30.666809, -0.575743, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(32.707253, -0.993387, 0.0), Point(31.585261, 0.761313, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(i_7, V_3), linecolor=Color(0.0, 0.3922, 0.0), linewidth=1.2)
S.add(Line(i_7, P_3), linecolor=Color(0.0, 0.3922, 0.0), linewidth=1.2)
S.add(Line(o, R_3), linecolor=Color(0.0, 0.3922, 0.0), linewidth=1.2)
S.add(Polyline([K_1, V_2, W_2, Z_2, A_3, O_1]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(O_1, B_19), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(B_19, B_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_3, B_22), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)

if __name__ == "__main__":
    viewer.show()
