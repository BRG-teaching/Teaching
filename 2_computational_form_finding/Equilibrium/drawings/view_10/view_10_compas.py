"""
COMPAS translation of GeoGebra applet: Parabola v. Catenary
Source: https://block.arch.ethz.ch/eq/drawing/view/10
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
A_4 = Point(0.0, 7.794647, 0.0)  # A_4
B = Point(0.0, -11.867845, 0.0)  # B
A_2 = Point(1.0, 7.794647, 0.0)  # A_2
B_4 = Point(1.0, -11.867845, 0.0)  # B_4
a = Point(25.538528, 5.50893, 0.0)  # a
D_1 = Point(0.0, 2.626486, 0.0)  # D_1
C_9 = Point(16.0, 7.794647, 0.0)  # C_9
B_2 = Point(16.0, -11.867845, 0.0)  # B_2
D_3 = Point(16.0, 2.63055, 0.0)  # D_3
E = Point(8.0, 2.628518, 0.0)  # E
D_2 = Point(8.0, -3.390464, 0.0)  # D_2
F = Point(8.0, -9.409446, 0.0)  # F
o = Point(29.082871, 0.176497, 0.0)  # o
b = Point(25.538528, 4.175597, 0.0)  # b
c = Point(25.538528, 2.842263, 0.0)  # c
d = Point(25.538528, 1.50893, 0.0)  # d
e = Point(25.538528, 0.175597, 0.0)  # e
f = Point(25.538528, -1.157737, 0.0)  # f
g = Point(25.538528, -2.49107, 0.0)  # g
a_1 = Point(36.361335, 5.425493, 0.0)  # a_1
A_6 = Point(13.0, 7.794647, 0.0)  # A_6
B_7 = Point(13.0, -11.867845, 0.0)  # B_7
I_2 = Point(1.0, 1.121995, 0.0)  # I_2
h = Point(25.538528, -3.824403, 0.0)  # h
I_3 = Point(3.0, -1.134616, 0.0)  # I_3
I_4 = Point(5.0, -2.638853, 0.0)  # I_4
I_5 = Point(7.0, -3.390718, 0.0)  # I_5
I_6 = Point(9.0, -3.39021, 0.0)  # I_6
I_7 = Point(11.0, -2.637329, 0.0)  # I_7
I_8 = Point(13.0, -1.132075, 0.0)  # I_8
I_1 = Point(15.0, 1.125551, 0.0)  # I_1
A_10 = Point(3.0, 7.794647, 0.0)  # A_{10}
B_6 = Point(3.0, -11.867845, 0.0)  # B_6
A_3 = Point(5.0, 7.794647, 0.0)  # A_3
B_11 = Point(5.0, -11.867845, 0.0)  # B_{11}
A_9 = Point(7.0, 7.794647, 0.0)  # A_9
B_10 = Point(7.0, -11.867845, 0.0)  # B_{10}
A_7 = Point(9.0, 7.794647, 0.0)  # A_7
B_8 = Point(9.0, -11.867845, 0.0)  # B_8
A_8 = Point(11.0, 7.794647, 0.0)  # A_8
B_9 = Point(11.0, -11.867845, 0.0)  # B_9
A_5 = Point(15.0, 7.794647, 0.0)  # A_5
B_5 = Point(15.0, -11.867845, 0.0)  # B_5
C = Point(0.0, 8.234647, 0.0)  # C
C_10 = Point(2.0, 7.794647, 0.0)  # C_{10}
C_11 = Point(2.0, 8.234647, 0.0)  # C_{11}
C_3 = Point(4.0, 7.794647, 0.0)  # C_3
C_12 = Point(4.0, 8.234647, 0.0)  # C_{12}
C_4 = Point(6.0, 7.794647, 0.0)  # C_4
C_13 = Point(6.0, 8.234647, 0.0)  # C_{13}
C_5 = Point(8.0, 7.794647, 0.0)  # C_5
C_14 = Point(8.0, 8.234647, 0.0)  # C_{14}
C_6 = Point(10.0, 7.794647, 0.0)  # C_6
C_15 = Point(10.0, 8.234647, 0.0)  # C_{15}
C_7 = Point(12.0, 7.794647, 0.0)  # C_7
C_16 = Point(12.0, 8.234647, 0.0)  # C_{16}
C_8 = Point(14.0, 7.794647, 0.0)  # C_8
C_17 = Point(14.0, 8.234647, 0.0)  # C_{17}
C_18 = Point(16.0, 8.234647, 0.0)  # C_{18}
V_2 = Point(0.0, 8.893914, 0.0)  # V_2
V_1 = Point(2.0, 8.893914, 0.0)  # V_1
Z_1 = Point(0.0, 2.626486, 0.0)  # Z_1
Z_3 = Point(16.0, 2.63055, 0.0)  # Z_3
i = Point(25.538528, -5.157737, 0.0)  # i
H_3 = Point(-0.916096, 2.017579, 0.0)  # H_3
H_4 = Point(0.083904, 0.513087, 0.0)  # H_4
H_5 = Point(0.176786, 0.392393, 0.0)  # H_5
H_6 = Point(2.176786, -1.864218, 0.0)  # H_6
V = Point(0.666874, 0.900574, 0.0)  # V
W = Point(-0.333126, 2.405065, 0.0)  # W
L = Point(0.70065, 0.856685, 0.0)  # L
K = Point(2.70065, -1.399925, 0.0)  # K
H_7 = Point(4.338809, -3.517958, 0.0)  # H_7
H_8 = Point(4.612923, -3.668499, 0.0)  # H_8
H_9 = Point(6.612923, -4.420364, 0.0)  # H_9
H_10 = Point(7.000279, -4.490718, 0.0)  # H_{10}
H_11 = Point(9.000279, -4.49021, 0.0)  # H_{11}
H_12 = Point(9.387536, -4.419684, 0.0)  # H_{12}
H_13 = Point(11.387536, -3.666803, 0.0)  # H_{13}
H_14 = Point(11.661477, -3.51622, 0.0)  # H_{14}
H_2 = Point(13.661477, -2.010966, 0.0)  # H_2
H_16 = Point(13.823377, -1.861493, 0.0)  # H_{16}
H_15 = Point(15.823377, 0.396133, 0.0)  # H_{15}
H_18 = Point(15.916191, 0.516786, 0.0)  # H_{18}
H_17 = Point(16.916191, 2.021786, 0.0)  # H_{17}
H = Point(2.338809, -2.013721, 0.0)  # H
H_19 = Point(2.759567, -1.45429, 0.0)  # H_{19}
H_20 = Point(4.759567, -2.958528, 0.0)  # H_{20}
H_21 = Point(4.859245, -3.01327, 0.0)  # H_{21}
H_22 = Point(6.859245, -3.765135, 0.0)  # H_{22}
H_23 = Point(7.000102, -3.790718, 0.0)  # H_{23}
H_24 = Point(9.000102, -3.79021, 0.0)  # H_{24}
H_25 = Point(9.140922, -3.764564, 0.0)  # H_{25}
H_29 = Point(11.140922, -3.011683, 0.0)  # H_{29}
H_30 = Point(11.240537, -2.956926, 0.0)  # H_{30}
H_26 = Point(13.240537, -1.451672, 0.0)  # H_{26}
G_1 = Point(13.29941, -1.397318, 0.0)  # G_1
H_28 = Point(15.29941, 0.860308, 0.0)  # H_{28}
K_1 = Point(15.338273, 0.900785, 0.0)  # K_1
H_27 = Point(16.33316, 2.409181, 0.0)  # H_{27}
H_31 = Point(0.916096, 3.235394, 0.0)  # H_{31}
H_32 = Point(1.916096, 1.730902, 0.0)  # H_{32}
H_33 = Point(0.333126, 2.847907, 0.0)  # H_{33}
H_34 = Point(1.333126, 1.343416, 0.0)  # H_{34}
H_35 = Point(1.823214, 1.851597, 0.0)  # H_{35}
H_36 = Point(3.823214, -0.405014, 0.0)  # H_{36}
H_37 = Point(3.661191, -0.25551, 0.0)  # H_{37}
H_38 = Point(5.661191, -1.759748, 0.0)  # H_{38}
H_39 = Point(5.387077, -1.609207, 0.0)  # H_{39}
H_40 = Point(7.387077, -2.361072, 0.0)  # H_{40}
H_41 = Point(6.999721, -2.290718, 0.0)  # H_{41}
H_42 = Point(8.999721, -2.29021, 0.0)  # H_{42}
H_44 = Point(10.612464, -1.607855, 0.0)  # H_{44}
H_45 = Point(10.338523, -1.758438, 0.0)  # H_{45}
H_46 = Point(12.338523, -0.253185, 0.0)  # H_{46}
H_47 = Point(12.176623, -0.402657, 0.0)  # H_{47}
H_48 = Point(14.176623, 1.854969, 0.0)  # H_{48}
H_49 = Point(14.083809, 1.734316, 0.0)  # H_{49}
H_50 = Point(15.083809, 3.239315, 0.0)  # H_{50}
H_43 = Point(8.612464, -2.360736, 0.0)  # H_{43}
H_51 = Point(1.29935, 1.387305, 0.0)  # H_{51}
H_52 = Point(3.29935, -0.869306, 0.0)  # H_{52}
H_53 = Point(3.240433, -0.814941, 0.0)  # H_{53}
H_54 = Point(5.240433, -2.319178, 0.0)  # H_{54}
H_55 = Point(5.140755, -2.264436, 0.0)  # H_{55}
H_56 = Point(7.140755, -3.016301, 0.0)  # H_{56}
H_58 = Point(14.66684, 1.34692, 0.0)  # H_{58}
H_57 = Point(15.66684, 2.851919, 0.0)  # H_{57}
H_1 = Point(14.70059, 1.390794, 0.0)  # H_1
H_65 = Point(12.70059, -0.866832, 0.0)  # H_{65}
H_64 = Point(12.759463, -0.812479, 0.0)  # H_{64}
H_63 = Point(10.759463, -2.317732, 0.0)  # H_{63}
H_62 = Point(10.859078, -2.262975, 0.0)  # H_{62}
H_61 = Point(8.859078, -3.015856, 0.0)  # H_{61}
H_60 = Point(8.999898, -2.99021, 0.0)  # H_{60}
H_59 = Point(6.999898, -2.990718, 0.0)  # H_{59}
M = Point(45.380052, 1.038903, 0.0)  # M
b_1 = Point(36.361335, 3.216036, 0.0)  # b_1
c_1 = Point(36.361335, 1.37674, 0.0)  # c_1
d_1 = Point(36.361335, -0.169661, 0.0)  # d_1
e_1 = Point(36.361335, -1.548546, 0.0)  # e_1
f_1 = Point(36.361335, -2.927551, 0.0)  # f_1
g_1 = Point(36.361335, -4.474274, 0.0)  # g_1
h_1 = Point(36.361335, -6.314027, 0.0)  # h_1
i_1 = Point(36.361335, -8.52402, 0.0)  # i_1
O = Point(0.0, -8.986871, 0.0)  # O
O_1 = Point(16.0, -4.396026, 0.0)  # O_1
O_2 = Point(1.0, -9.473258, 0.0)  # O_2
O_3 = Point(3.0, -9.956062, 0.0)  # O_3
O_4 = Point(5.0, -10.030981, 0.0)  # O_4
O_5 = Point(7.0, -9.762968, 0.0)  # O_5
O_6 = Point(9.0, -9.189173, 0.0)  # O_6
O_7 = Point(11.0, -8.309568, 0.0)  # O_7
O_8 = Point(13.0, -7.086961, 0.0)  # O_8
O_9 = Point(15.0, -5.456367, 0.0)  # O_9
Q = Point(8.0, -9.476071, 0.0)  # Q
q = Point(36.361335, -1.548818, 0.0)  # q
p = Point(36.361335, 1.590397, 0.0)  # p
o_1 = Point(40.533755, -1.547758, 0.0)  # o_1
T_2 = Point(1.0, 0.955214, 0.0)  # T_2
T_3 = Point(3.0, -1.328254, 0.0)  # T_3
T_4 = Point(5.0, -2.730078, 0.0)  # T_4
T_5 = Point(7.0, -3.390653, 0.0)  # T_5
T_6 = Point(9.0, -3.390275, 0.0)  # T_6
T_7 = Point(11.0, -2.728888, 0.0)  # T_7
T_8 = Point(13.0, -1.326098, 0.0)  # T_8
T_1 = Point(15.0, 0.958557, 0.0)  # T_1
B_1 = Point(8.0, -11.867845, 0.0)  # B_1
G = Point(36.361335, -4.688034, 0.0)  # G
frameBL = Point(-3.719736, -12.643091, 0.0)  # frameBL
U = Point(49.293671, -12.643091, 0.0)  # U
Z = Point(-3.719736, 13.863613, 0.0)  # Z
frameTR = Point(49.293671, 13.863613, 0.0)  # frameTR

# --- geometry ---
S.add(Line(A_4, B), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(A_2, B_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(a, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(D_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(C_9, B_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(D_3, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(D_1, D_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(E, pointcolor=Color(1.0, 0.498, 0.0), pointsize=4.5)
S.add(D_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Circle.from_point_and_radius(Point(8.0, -3.390464, 0.0), 6.018982), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_1, F), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(F, D_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(o, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(Line(o, b), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(c, o), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(o, d), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(o, e), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(o, f), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(o, g), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(a_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(A_6, B_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(D_1, I_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(h, o), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(I_2, I_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_3, I_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_4, I_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_5, I_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_6, I_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_7, I_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_1, D_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_8, I_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_10, B_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(A_3, B_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(A_9, B_10), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(A_7, B_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(A_8, B_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(A_5, B_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Polygon([C, A_4, C_10, C_11]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.2, opacity=0.15)
S.add(Polygon([C_11, C_10, C_3, C_12]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.2, opacity=0.15)
S.add(Polygon([C_12, C_3, C_4, C_13]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.2, opacity=0.15)
S.add(Polygon([C_13, C_4, C_5, C_14]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.2, opacity=0.15)
S.add(Polygon([C_14, C_5, C_6, C_15]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.2, opacity=0.15)
S.add(Polygon([C_15, C_6, C_7, C_16]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.2, opacity=0.15)
S.add(Polygon([C_16, C_7, C_8, C_17]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.2, opacity=0.15)
S.add(Polygon([C_17, C_8, C_9, C_18]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.2, opacity=0.15)
S.add(V_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(V_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(Line(V_2, V_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Z_1, pointcolor=Color(0.502, 0.502, 0.502), pointsize=3.0)
S.add(Z_3, pointcolor=Color(0.502, 0.502, 0.502), pointsize=3.0)
S.add(Line(a, o), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(o, i), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(H_3, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_4, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_5, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(Line(H_3, H_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(H_6, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(Line(H_5, H_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_4, V), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_3, W), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_5, L), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_6, K), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(H_7, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_8, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_9, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_10, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_11, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_12, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_13, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_14, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_2, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_16, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_15, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_18, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_17, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(Line(H_19, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H, H_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_7, H_20), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_21, H_8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_8, H_9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_9, H_22), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_23, H_10), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_10, H_11), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_11, H_24), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_25, H_12), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_12, H_13), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_13, H_29), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_30, H_14), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_14, H_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_2, H_26), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(G_1, H_16), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_16, H_15), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_15, H_28), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(K_1, H_18), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_18, H_17), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_17, H_27), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(H_31, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_32, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(Line(H_31, H_32), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_31, H_33), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_32, H_34), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(H_35, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_36, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_37, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_38, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_39, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_40, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_41, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_42, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_44, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_45, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_46, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_47, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_48, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_49, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_50, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(H_43, pointcolor=Color(0.0, 0.0, 0.0), pointsize=4.5)
S.add(Line(H_35, H_36), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_39, H_40), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_41, H_42), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_43, H_44), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_45, H_46), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_47, H_48), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_49, H_50), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_37, H_38), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_35, H_51), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_36, H_52), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_37, H_53), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_38, H_54), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_39, H_55), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_40, H_56), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_58, H_49), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_57, H_50), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_1, H_48), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_47, H_65), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_64, H_46), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_63, H_45), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_44, H_62), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_61, H_43), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_60, H_42), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_41, H_59), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(M, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(a_1, M), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(b_1, M), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(c_1, M), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(d_1, M), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(e_1, M), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(f_1, M), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(g_1, M), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(h_1, M), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(i_1, M), linecolor=Color(0.7529, 0.7529, 0.7529), linewidth=1.2)
S.add(O, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(O_1, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(Polyline([O, O_2, O_3, O_4, O_5, O_6, O_7, O_8, O_9, O_1]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Q, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(Line(O, Q), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O, O_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_1, D_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(q, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=4.5)
S.add(p, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=4.5)
S.add(Line(M, q), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M, p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(o_1, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(p, o_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(o_1, q), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(a_1, o_1), linecolor=Color(1.0, 0.8431, 0.0), linewidth=1.2)
S.add(Line(b_1, o_1), linecolor=Color(1.0, 0.8431, 0.0), linewidth=1.0)
S.add(Line(c_1, o_1), linecolor=Color(1.0, 0.8431, 0.0), linewidth=1.0)
S.add(Line(d_1, o_1), linecolor=Color(1.0, 0.8431, 0.0), linewidth=1.0)
S.add(Line(e_1, o_1), linecolor=Color(1.0, 0.8431, 0.0), linewidth=1.0)
S.add(Line(f_1, o_1), linecolor=Color(1.0, 0.8431, 0.0), linewidth=1.0)
S.add(Line(g_1, o_1), linecolor=Color(1.0, 0.8431, 0.0), linewidth=1.0)
S.add(Line(h_1, o_1), linecolor=Color(1.0, 0.8431, 0.0), linewidth=1.0)
S.add(Line(i_1, o_1), linecolor=Color(1.0, 0.8431, 0.0), linewidth=1.2)
S.add(Polyline([D_1, T_2, T_3, T_4, T_5, T_6, T_7, T_8, T_1, D_3]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_5, B_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Q, O_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(G, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=4.5)
S.add(Line(M, G), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_2, D_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G, o_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(36.361335, 5.425493, 0.0), Point(36.361335, 3.216036, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(36.361335, 3.216036, 0.0), Point(35.403435, 5.481682, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(36.361335, 3.216036, 0.0), Point(37.319234, 5.481682, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(36.361335, 3.216036, 0.0), Point(36.361335, 1.37674, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(36.361335, 1.37674, 0.0), Point(35.403435, 3.642386, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(36.361335, 1.37674, 0.0), Point(37.319234, 3.642386, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(36.361335, 1.37674, 0.0), Point(36.361335, -0.169661, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(36.361335, -0.169661, 0.0), Point(35.403435, 2.095986, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(36.361335, -0.169661, 0.0), Point(37.319234, 2.095986, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(36.361335, -0.169661, 0.0), Point(36.361335, -1.548546, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(36.361335, -1.548546, 0.0), Point(35.403435, 0.7171, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(36.361335, -1.548546, 0.0), Point(37.319234, 0.7171, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(36.361335, -1.548546, 0.0), Point(36.361335, -2.927551, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(36.361335, -2.927551, 0.0), Point(35.403435, -0.661905, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(36.361335, -2.927551, 0.0), Point(37.319234, -0.661905, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(36.361335, -2.927551, 0.0), Point(36.361335, -4.474274, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(36.361335, -4.474274, 0.0), Point(35.403435, -2.208628, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(36.361335, -4.474274, 0.0), Point(37.319234, -2.208628, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(36.361335, -4.474274, 0.0), Point(36.361335, -6.314027, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(36.361335, -6.314027, 0.0), Point(35.403435, -4.048381, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(36.361335, -6.314027, 0.0), Point(37.319234, -4.048381, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(36.361335, -6.314027, 0.0), Point(36.361335, -8.52402, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(36.361335, -8.52402, 0.0), Point(35.403435, -6.258373, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(36.361335, -8.52402, 0.0), Point(37.319234, -6.258373, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(25.538528, 5.50893, 0.0), Point(25.538528, 4.175597, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(25.538528, 4.175597, 0.0), Point(24.580628, 6.441243, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(25.538528, 4.175597, 0.0), Point(26.496428, 6.441243, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(25.538528, 4.175597, 0.0), Point(25.538528, 2.842263, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(25.538528, 2.842263, 0.0), Point(24.580628, 5.10791, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(25.538528, 2.842263, 0.0), Point(26.496428, 5.10791, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(25.538528, 2.842263, 0.0), Point(25.538528, 1.50893, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(25.538528, 1.50893, 0.0), Point(24.580628, 3.774576, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(25.538528, 1.50893, 0.0), Point(26.496428, 3.774576, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(25.538528, 1.50893, 0.0), Point(25.538528, 0.175597, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(25.538528, 0.175597, 0.0), Point(24.580628, 2.441243, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(25.538528, 0.175597, 0.0), Point(26.496428, 2.441243, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(25.538528, 0.175597, 0.0), Point(25.538528, -1.157737, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(25.538528, -1.157737, 0.0), Point(24.580628, 1.10791, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(25.538528, -1.157737, 0.0), Point(26.496428, 1.10791, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(25.538528, -2.49107, 0.0), Point(25.538528, -3.824403, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(25.538528, -3.824403, 0.0), Point(24.580628, -1.558757, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(25.538528, -3.824403, 0.0), Point(26.496428, -1.558757, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(25.538528, -3.824403, 0.0), Point(25.538528, -5.157737, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(25.538528, -5.157737, 0.0), Point(24.580628, -2.89209, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(25.538528, -5.157737, 0.0), Point(26.496428, -2.89209, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(frameBL, U), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([frameBL, Z, frameTR, U]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(25.538528, -5.157737, 0.0), Point(29.082871, 0.176497, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(29.082871, 0.176497, 0.0), Point(28.626846, -2.240684, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(29.082871, 0.176497, 0.0), Point(27.031176, -1.180438, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(29.082871, 0.176497, 0.0), Point(25.538528, 5.50893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(25.538528, 5.50893, 0.0), Point(27.590435, 4.152315, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(25.538528, 5.50893, 0.0), Point(25.994929, 3.09182, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(36.361335, -8.52402, 0.0), Point(40.533755, -1.547758, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(40.533755, -1.547758, 0.0), Point(40.192909, -3.983851, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(40.533755, -1.547758, 0.0), Point(38.548739, -3.000493, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(40.533755, -1.547758, 0.0), Point(36.361335, 5.425493, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(36.361335, 5.425493, 0.0), Point(38.346627, 3.973136, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(36.361335, 5.425493, 0.0), Point(36.702644, 2.989465, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 2.626486, 0.0), Point(-0.941039, 4.042271, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(-0.941039, 4.042271, 0.0), Point(1.110868, 2.685655, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(-0.941039, 4.042271, 0.0), Point(-0.484638, 1.62516, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.0, 2.63055, 0.0), Point(16.940818, 4.046482, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.940818, 4.046482, 0.0), Point(16.484794, 1.6293, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.940818, 4.046482, 0.0), Point(14.889123, 2.689547, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 2.626486, 0.0), Point(-0.872868, 4.085287, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(-0.872868, 4.085287, 0.0), Point(1.112424, 2.63293, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(-0.872868, 4.085287, 0.0), Point(-0.531559, 1.649259, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(16.0, 2.63055, 0.0), Point(16.872591, 4.089517, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.872591, 4.089517, 0.0), Point(16.531745, 1.653425, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(16.872591, 4.089517, 0.0), Point(14.887575, 2.636783, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(1.0, 6.488619, 0.0), Point(1.0, 5.388619, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(1.0, 5.388619, 0.0), Point(0.0421, 7.654265, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(1.0, 5.388619, 0.0), Point(1.9579, 7.654265, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 6.488619, 0.0), Point(5.0, 5.388619, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.0, 5.388619, 0.0), Point(4.0421, 7.654265, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 5.388619, 0.0), Point(5.9579, 7.654265, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 6.488619, 0.0), Point(9.0, 5.388619, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.0, 5.388619, 0.0), Point(8.0421, 7.654265, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 5.388619, 0.0), Point(9.9579, 7.654265, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 6.488619, 0.0), Point(3.0, 5.388619, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.0, 5.388619, 0.0), Point(2.0421, 7.654265, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 5.388619, 0.0), Point(3.9579, 7.654265, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 6.488619, 0.0), Point(7.0, 5.388619, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.0, 5.388619, 0.0), Point(6.0421, 7.654265, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 5.388619, 0.0), Point(7.9579, 7.654265, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 6.488619, 0.0), Point(13.0, 5.388619, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.0, 5.388619, 0.0), Point(12.0421, 7.654265, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 5.388619, 0.0), Point(13.9579, 7.654265, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 6.488619, 0.0), Point(11.0, 5.388619, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.0, 5.388619, 0.0), Point(10.0421, 7.654265, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 5.388619, 0.0), Point(11.9579, 7.654265, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(15.0, 6.488619, 0.0), Point(15.0, 5.388619, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.0, 5.388619, 0.0), Point(14.0421, 7.654265, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(15.0, 5.388619, 0.0), Point(15.9579, 7.654265, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(1.0, 6.488619, 0.0), Point(1.0, 4.838619, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(1.0, 4.838619, 0.0), Point(0.0421, 7.104265, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(1.0, 4.838619, 0.0), Point(1.9579, 7.104265, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 6.488619, 0.0), Point(3.0, 5.113619, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.0, 5.113619, 0.0), Point(2.0421, 7.379265, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.0, 5.113619, 0.0), Point(3.9579, 7.379265, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 6.488619, 0.0), Point(5.0, 5.278619, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.0, 5.278619, 0.0), Point(4.0421, 7.544265, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 5.278619, 0.0), Point(5.9579, 7.544265, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 6.488619, 0.0), Point(7.0, 5.388619, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.0, 5.388619, 0.0), Point(6.0421, 7.654265, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.0, 5.388619, 0.0), Point(7.9579, 7.654265, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 6.488619, 0.0), Point(9.0, 5.388619, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.0, 5.388619, 0.0), Point(8.0421, 7.654265, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.0, 5.388619, 0.0), Point(9.9579, 7.654265, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 6.488619, 0.0), Point(11.0, 5.278619, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(11.0, 5.278619, 0.0), Point(10.0421, 7.544265, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(11.0, 5.278619, 0.0), Point(11.9579, 7.544265, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 6.488619, 0.0), Point(13.0, 5.113619, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(13.0, 5.113619, 0.0), Point(12.0421, 7.379265, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(13.0, 5.113619, 0.0), Point(13.9579, 7.379265, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.0, 6.488619, 0.0), Point(15.0, 4.838619, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.0, 4.838619, 0.0), Point(14.0421, 7.104265, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.0, 4.838619, 0.0), Point(15.9579, 7.104265, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)

if __name__ == "__main__":
    viewer.show()
