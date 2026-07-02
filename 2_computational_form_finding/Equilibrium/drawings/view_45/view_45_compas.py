"""
COMPAS translation of GeoGebra applet: Free-form thrust lines
Source: https://block.arch.ethz.ch/eq/drawing/view/45
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
Bezier3 = Point(8.43, 5.61, 0.0)  # Bezier3
G = Point(14.0, 0.0, 0.0)  # G
H_1 = Point(14.0, 10.887815, 0.0)  # H_1
E = Point(1.0, 0.0, 0.0)  # E
F = Point(1.0, 10.887815, 0.0)  # F
B = Point(18.0, 0.0, 0.0)  # B
D = Point(18.0, 10.887815, 0.0)  # D
Bezier5 = Point(18.0, 0.9, 0.0)  # Bezier5
A = Point(0.0, 0.0, 0.0)  # A
C = Point(0.0, 10.887815, 0.0)  # C
Bezier1 = Point(0.0, 0.0, 0.0)  # Bezier1
M = Point(3.436622, 3.848233, 0.0)  # M
LLM = Point(26.980066, 9.169768, 0.0)  # LLM
P = Point(1.718311, 4.196091, 0.0)  # P
Q = Point(10.718311, 12.002066, 0.0)  # Q
B_1 = Point(26.980066, 0.388678, 0.0)  # B_1
R_2 = Point(26.330281, 9.301312, 0.0)  # R_2
S_2 = Point(24.226469, 6.086366, 0.0)  # S
Bezier2 = Point(1.0, 5.29, 0.0)  # Bezier2
Bezier4 = Point(14.0, 4.37, 0.0)  # Bezier4
MFit10 = Point(9.872613, 4.431308, 0.0)  # MFit10
MFit11 = Point(11.085117, 4.224275, 0.0)  # MFit11
LL0 = Point(26.980066, 10.888079, 0.0)  # LL0
LLE = Point(26.980066, 1.888079, 0.0)  # LLE
pole = Point(23.576683, 6.21791, 0.0)  # pole
LL1 = Point(26.980066, 10.707417, 0.0)  # LL1
LL2 = Point(26.980066, 10.438931, 0.0)  # LL2
LL3 = Point(26.980066, 10.083319, 0.0)  # LL3
LL4 = Point(26.980066, 9.655189, 0.0)  # LL4
LL5 = Point(26.980066, 9.168164, 0.0)  # LL5
LL6 = Point(26.980066, 8.63489, 0.0)  # LL6
LL7 = Point(26.980066, 8.067028, 0.0)  # LL7
LL8 = Point(26.980066, 7.475261, 0.0)  # LL8
LL9 = Point(26.980066, 6.869292, 0.0)  # LL9
LL10 = Point(26.980066, 6.25784, 0.0)  # LL10
LL11 = Point(26.980066, 5.648646, 0.0)  # LL11
LL12 = Point(26.980066, 5.04847, 0.0)  # LL12
LL13 = Point(26.980066, 4.463089, 0.0)  # LL13
LL14 = Point(26.980066, 3.897302, 0.0)  # LL14
LL15 = Point(26.980066, 3.354924, 0.0)  # LL15
LL16 = Point(26.980066, 2.838793, 0.0)  # LL16
LL17 = Point(26.980066, 2.350764, 0.0)  # LL17
LL18 = Point(26.980066, 1.888079, 0.0)  # LL18
LP118 = Point(0.0, 0.0, 0.0)  # LP118
LP218 = Point(0.0, 0.0, 0.0)  # LP218
FP11 = Point(9.872613, 6.389102, 0.0)  # FP11
FP12 = Point(11.085117, 6.186294, 0.0)  # FP12
FP0 = Point(0.0, 0.0, 0.0)  # FP0
FP1 = Point(0.140174, 0.192349, 0.0)  # FP1
FP2 = Point(0.582474, 0.7758, 0.0)  # FP2
FP3 = Point(1.214119, 1.559194, 0.0)  # FP3
FP4 = Point(2.004919, 2.457348, 0.0)  # FP4
FP5 = Point(2.926641, 3.38825, 0.0)  # FP5
FP6 = Point(3.953017, 4.277974, 0.0)  # FP6
FP7 = Point(5.05974, 5.063935, 0.0)  # FP7
FP8 = Point(6.224465, 5.69675, 0.0)  # FP8
FP9 = Point(7.426806, 6.140945, 0.0)  # FP9
FP10 = Point(8.648343, 6.374738, 0.0)  # FP10
FP13 = Point(12.273319, 5.778015, 0.0)  # FP13
FP14 = Point(13.426641, 5.18335, 0.0)  # FP14
FP15 = Point(14.536469, 4.42661, 0.0)  # FP15
FP16 = Point(15.59615, 3.535188, 0.0)  # FP16
FP17 = Point(16.600992, 2.53751, 0.0)  # FP17
FP18 = Point(17.548267, 1.461154, 0.0)  # FP18
T_1 = Point(18.0, 0.886454, 0.0)  # T_1
C_1 = Point(23.576683, 0.388678, 0.0)  # C_1
TP10 = Point(9.725068, 3.330632, 0.0)  # TP10
TP11 = Point(10.85871, 3.134631, 0.0)  # TP11
MFit0 = Point(0.140174, 0.565058, 0.0)  # MFit0
TP0 = Point(-0.061724, 0.627767, 0.0)  # TP0
MFit1 = Point(0.582474, 1.563947, 0.0)  # MFit1
TP1 = Point(0.197893, 1.791897, 0.0)  # TP1
MFit2 = Point(1.214119, 2.398683, 0.0)  # MFit2
TP2 = Point(0.868233, 2.725966, 0.0)  # TP2
MFit3 = Point(2.004919, 3.081435, 0.0)  # MFit3
TP3 = Point(1.80011, 3.370175, 0.0)  # TP3
MFit4 = Point(2.926641, 3.623438, 0.0)  # MFit4
TP4 = Point(2.868357, 3.743438, 0.0)  # TP4
MFit5 = Point(3.953017, 4.034992, 0.0)  # MFit5
TP5 = Point(3.995799, 3.903973, 0.0)  # TP5
MFit6 = Point(5.05974, 4.325467, 0.0)  # MFit6
TP6 = Point(5.14361, 3.915067, 0.0)  # TP6
MFit7 = Point(6.224465, 4.503299, 0.0)  # MFit7
TP7 = Point(6.294865, 3.830007, 0.0)  # TP7
MFit8 = Point(7.426806, 4.575991, 0.0)  # MFit8
TP8 = Point(7.443165, 3.688452, 0.0)  # TP8
MFit9 = Point(8.648343, 4.550115, 0.0)  # MFit9
TP9 = Point(8.586629, 3.516975, 0.0)  # TP9
MFit12 = Point(12.273319, 3.932788, 0.0)  # MFit12
TP12 = Point(11.98758, 2.925877, 0.0)  # TP12
MFit13 = Point(13.426641, 3.559688, 0.0)  # MFit13
TP13 = Point(13.111055, 2.694453, 0.0)  # TP13
MFit14 = Point(14.536469, 3.106879, 0.0)  # MFit14
TP14 = Point(14.227345, 2.425094, 0.0)  # TP14
MFit15 = Point(15.59615, 2.575338, 0.0)  # MFit15
TP15 = Point(15.332799, 2.09881, 0.0)  # TP15
MFit16 = Point(16.600992, 1.965104, 0.0)  # MFit16
TP16 = Point(16.4211, 1.694809, 0.0)  # TP16
MFit17 = Point(17.548267, 1.275286, 0.0)  # MFit17
TP17 = Point(17.482643, 1.192771, 0.0)  # TP17
A_1 = Point(0.0, 10.900345, 0.0)  # A_1
D_1 = Point(0.0, 0.0, 0.0)  # D_1
L_1 = Point(1.718311, 0.0, 0.0)  # L_1
E_1 = Point(1.718311, 10.900345, 0.0)  # E_1
M_1 = Point(3.436622, 10.900345, 0.0)  # M_1
K_1 = Point(3.436622, 0.0, 0.0)  # K_1
J_1 = Point(10.718311, 0.0, 0.0)  # J_1
F_1 = Point(10.718311, 10.900345, 0.0)  # F_1
G_1 = Point(18.0, 10.900345, 0.0)  # G_1
I_1 = Point(18.0, 0.0, 0.0)  # I_1
frameBL = Point(-4.987152, -2.916345, 0.0)  # frameBL
frameTR_1 = Point(33.556496, -2.916345, 0.0)  # frameTR_1
D_2 = Point(-4.987152, 16.35548, 0.0)  # D_2
frameTR = Point(33.556496, 16.35548, 0.0)  # frameTR
I = Point(0.0, 13.304881, 0.0)  # I
J = Point(0.0, 12.814881, 0.0)  # J
L = Point(18.0, 12.814881, 0.0)  # L
K = Point(18.0, 13.304881, 0.0)  # K
F_2 = Point(8.994877, 12.342894, 0.0)  # F_2
I_2 = Point(8.994877, 10.900345, 0.0)  # I_2
J_2 = Point(8.994877, 0.0, 0.0)  # J_2

# --- geometry ---
S.add(Bezier3, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(G, H_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(E, F), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(B, D), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Bezier5, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(A, C), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Bezier1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(M, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(LLM, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(P, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Line(Bezier1, P), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Q, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Line(Q, Bezier5), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(B_1, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(R_2, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(S_2, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Line(Bezier1, Bezier2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Bezier2, Bezier3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Bezier3, Bezier4), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Bezier4, Bezier5), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(MFit10, pointcolor=Color(1.0, 0.498, 0.0), pointsize=4.5)
S.add(MFit11, pointcolor=Color(1.0, 0.498, 0.0), pointsize=4.5)
S.add(Line(P, Bezier5), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Bezier1, Q), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(LL0, R_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(R_2, LLM), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(LLM, S_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(S_2, LLE), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(R_2, pole), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(pole, S_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(LL0, pole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL1, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL2, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL3, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL4, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL5, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL6, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL7, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL8, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL9, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL10, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL11, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL12, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL13, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL14, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL15, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL16, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL17, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL18, pole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LP118, LP218), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(FP11, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(FP12, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Polyline([FP0, FP1, FP2, FP3, FP4, FP5, FP6, FP7, FP8, FP9, FP10, FP11, FP12, FP13, FP14, FP15, FP16, FP17, FP18, T_1]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(C_1, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(Line(B_1, C_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(TP10, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(TP11, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Line(MFit0, TP0), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(MFit1, TP1), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(MFit2, TP2), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(MFit3, TP3), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(MFit4, TP4), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(MFit5, TP5), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(MFit6, TP6), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(MFit7, TP7), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(MFit8, TP8), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(MFit9, TP9), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(MFit10, TP10), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(MFit11, TP11), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(MFit12, TP12), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(MFit13, TP13), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(MFit14, TP14), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(MFit15, TP15), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(MFit16, TP16), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(MFit17, TP17), linecolor=Color(0.0, 0.0, 1.0), linewidth=1.2)
S.add(Line(Point(26.980066, 1.888079, 0.0), Point(23.576683, 1.888079, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(23.576683, 1.888079, 0.0), Point(25.223932, 2.584524, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(23.576683, 1.888079, 0.0), Point(25.223932, 1.191633, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(23.576683, 1.888079, 0.0), Point(23.576683, 6.21791, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(23.576683, 6.21791, 0.0), Point(24.273129, 4.570661, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(23.576683, 6.21791, 0.0), Point(22.880237, 4.570661, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(23.576683, 6.21791, 0.0), Point(23.576683, 10.888079, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(23.576683, 10.888079, 0.0), Point(24.273129, 9.24083, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(23.576683, 10.888079, 0.0), Point(22.880237, 9.24083, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(23.576683, 10.888079, 0.0), Point(26.980066, 10.888079, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(26.980066, 10.888079, 0.0), Point(25.332818, 10.191633, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(26.980066, 10.888079, 0.0), Point(25.332818, 11.584524, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.140174, 10.900345, 0.0), Point(0.140174, 0.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(0.582474, 10.900345, 0.0), Point(0.582474, 0.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(1.214119, 10.900345, 0.0), Point(1.214119, 0.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(2.004919, 10.900345, 0.0), Point(2.004919, 0.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(2.926641, 10.900345, 0.0), Point(2.926641, 0.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(3.953017, 10.900345, 0.0), Point(3.953017, 0.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(5.05974, 10.900345, 0.0), Point(5.05974, 0.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(6.224465, 10.900345, 0.0), Point(6.224465, 0.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(7.426806, 10.900345, 0.0), Point(7.426806, 0.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(8.648343, 10.900345, 0.0), Point(8.648343, 0.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(9.872613, 10.900345, 0.0), Point(9.872613, 0.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(11.085117, 10.900345, 0.0), Point(11.085117, 0.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(12.273319, 10.900345, 0.0), Point(12.273319, 0.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(13.426641, 10.900345, 0.0), Point(13.426641, 0.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(14.536469, 10.900345, 0.0), Point(14.536469, 0.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(15.59615, 10.900345, 0.0), Point(15.59615, 0.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(16.600992, 10.900345, 0.0), Point(16.600992, 0.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(17.548267, 10.900345, 0.0), Point(17.548267, 0.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(A_1, D_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_1, E_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(M_1, K_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(J_1, F_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(G_1, I_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP0, TP1), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP1, TP2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP2, TP3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP3, TP4), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP4, TP5), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP5, TP6), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP6, TP7), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP7, TP8), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP8, TP9), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP9, TP10), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP10, TP11), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP11, TP12), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP12, TP13), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP13, TP14), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP14, TP15), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP15, TP16), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP16, TP17), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP17, Bezier5), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP0, MFit1), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP1, MFit2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP2, MFit3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP3, MFit4), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP4, MFit5), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP5, MFit6), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP6, MFit7), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP7, MFit8), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP8, MFit9), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP9, MFit10), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP10, MFit11), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP11, MFit12), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP12, MFit13), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP13, MFit14), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP14, MFit15), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP15, MFit16), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(TP16, MFit17), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LLE, B_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(-1.4, 0.0, 0.0), Point(0.0, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 0.0, 0.0), Point(-1.647249, -0.696446, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 0.0, 0.0), Point(-1.647249, 0.696446, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, -1.4, 0.0), Point(0.0, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 0.0, 0.0), Point(0.696446, -1.647249, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 0.0, 0.0), Point(-0.696446, -1.647249, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.0, -0.5, 0.0), Point(18.0, 0.9, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(18.0, 0.9, 0.0), Point(18.696446, -0.747249, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.0, 0.9, 0.0), Point(17.303554, -0.747249, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(26.980066, 1.888079, 0.0), Point(23.576683, 6.21791, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(23.576683, 6.21791, 0.0), Point(25.142186, 5.353234, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(23.576683, 6.21791, 0.0), Point(24.047099, 4.492461, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(23.576683, 6.21791, 0.0), Point(26.980066, 10.888079, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(26.980066, 10.888079, 0.0), Point(26.572761, 9.146652, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(26.980066, 10.888079, 0.0), Point(25.447071, 9.966998, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(18.865166, -0.200676, 0.0), Point(18.0, 0.9, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(18.0, 0.9, 0.0), Point(19.565503, 0.035324, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(18.0, 0.9, 0.0), Point(18.470416, -0.825449, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(-0.824533, -1.131435, 0.0), Point(0.0, 0.0, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 0.0, 0.0), Point(-0.407305, -1.741427, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 0.0, 0.0), Point(-1.532996, -0.921081, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(C_1, pole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(MFit10, FP11), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(9.872613, 6.389102, 0.0), Point(8.472613, 6.389102, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.472613, 6.389102, 0.0), Point(10.119862, 7.085548, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(8.472613, 6.389102, 0.0), Point(10.119862, 5.692656, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(MFit10, TP10), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(frameBL, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(frameTR_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Polyline([frameBL, D_2, frameTR, frameTR_1]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(frameBL, frameTR_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([I, J, L, K]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.2, opacity=0.15)
S.add(Line(MFit11, FP12), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(MFit11, TP11), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(26.980066, 1.888079, 0.0), Point(24.226469, 6.086366, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(24.226469, 6.086366, 0.0), Point(25.712251, 5.090918, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(24.226469, 6.086366, 0.0), Point(24.547533, 4.326996, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(24.226469, 6.086366, 0.0), Point(26.980066, 9.169768, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(26.980066, 9.169768, 0.0), Point(26.402307, 7.477238, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(26.980066, 9.169768, 0.0), Point(25.36339, 8.40503, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(26.980066, 9.169768, 0.0), Point(26.330281, 9.301312, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(26.330281, 9.301312, 0.0), Point(28.082965, 9.657069, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(26.330281, 9.301312, 0.0), Point(27.806592, 8.291871, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(26.330281, 9.301312, 0.0), Point(26.980066, 10.888079, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(26.980066, 10.888079, 0.0), Point(27.000326, 9.099768, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(26.980066, 10.888079, 0.0), Point(25.711326, 9.627617, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(26.980066, 10.888079, 0.0), Point(26.980066, 9.169768, 0.0)), linecolor=Color(1.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(26.980066, 9.169768, 0.0), Point(26.283621, 10.817017, 0.0)), linecolor=Color(1.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(26.980066, 9.169768, 0.0), Point(27.676512, 10.817017, 0.0)), linecolor=Color(1.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(26.980066, 9.169768, 0.0), Point(26.980066, 1.888079, 0.0)), linecolor=Color(1.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(26.980066, 1.888079, 0.0), Point(26.283621, 3.535328, 0.0)), linecolor=Color(1.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(26.980066, 1.888079, 0.0), Point(27.676512, 3.535328, 0.0)), linecolor=Color(1.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(1.718311, 5.596091, 0.0), Point(1.718311, 4.196091, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(1.718311, 4.196091, 0.0), Point(1.021865, 5.84334, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(1.718311, 4.196091, 0.0), Point(2.414757, 5.84334, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(10.718311, 13.402066, 0.0), Point(10.718311, 12.002066, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.718311, 12.002066, 0.0), Point(10.021865, 13.649314, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(10.718311, 12.002066, 0.0), Point(11.414757, 13.649314, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(F_2, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Line(Point(8.994877, 13.742894, 0.0), Point(8.994877, 12.342894, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.994877, 12.342894, 0.0), Point(8.298432, 13.990143, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(8.994877, 12.342894, 0.0), Point(9.691323, 13.990143, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Bezier1, F_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(F_2, Bezier5), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(I_2, J_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(-0.530543, -1.295579, 0.0), Point(0.0, 0.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 0.0, 0.0), Point(0.02026, -1.788311, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 0.0, 0.0), Point(-1.26874, -1.260461, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(-0.932528, -1.044218, 0.0), Point(0.0, 0.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 0.0, 0.0), Point(-0.57776, -1.69253, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 0.0, 0.0), Point(-1.616676, -0.764738, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(18.767821, -0.270663, 0.0), Point(18.0, 0.9, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(18.0, 0.9, 0.0), Point(19.485782, -0.095448, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(18.0, 0.9, 0.0), Point(18.321064, -0.85937, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(19.372165, 0.622217, 0.0), Point(18.0, 0.9, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(18.0, 0.9, 0.0), Point(19.752684, 1.255757, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(18.0, 0.9, 0.0), Point(19.476311, -0.10944, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(LLE, S_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_2, LLM), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LLM, R_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_2, LL0), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)

if __name__ == "__main__":
    viewer.show()
