"""
COMPAS translation of GeoGebra applet: Internal forces in a three-hinged frame – superposition
Source: https://block.arch.ethz.ch/eq/drawing/view/44
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
A_3 = Point(31.613264, 5.482056, 0.0)  # A_3
A = Point(0.0, 0.0, 0.0)  # A
A_P = Point(24.0, 0.0, 0.0)  # A_P
C = Point(5.4, 0.0, 0.0)  # C
C_P = Point(29.4, 0.0, 0.0)  # C_P
B_p = Point(0.01, 5.4, 0.0)  # B'
D_p = Point(5.39, 5.4, 0.0)  # D'
I = Point(2.802712, 5.4, 0.0)  # I
I_P = Point(26.802712, 5.4, 0.0)  # I_P
A_S = Point(40.0, 0.0, 0.0)  # A_S
L1 = Point(0.0, 9.231503, 0.0)  # L1
N_5 = Point(0.0, 8.556503, 0.0)  # N_5
Q = Point(2.802712, 8.556503, 0.0)  # Q
P_3 = Point(2.802712, 9.231503, 0.0)  # P_3
A_M = Point(0.0, -30.5, 0.0)  # A_M
O = Point(5.4, 8.556503, 0.0)  # O
L2 = Point(5.4, 9.231503, 0.0)  # L2
B = Point(0.0, 5.4, 0.0)  # B
D = Point(5.4, 5.4, 0.0)  # D
LL0 = Point(14.61165, 5.265933, 0.0)  # LL0
C_S = Point(45.4, 0.0, 0.0)  # C_S
C_SN = Point(45.4, -10.0, 0.0)  # C_{SN}
C_4 = Point(59.348948, 5.193893, 0.0)  # C_4
A_SN = Point(40.0, -10.0, 0.0)  # A_{SN}
K_1 = Point(12.589581, 5.265933, 0.0)  # K_1
Z = Point(1.401356, 8.313549, 0.0)  # Z
A_1 = Point(4.101356, 7.902103, 0.0)  # A_1
C_M = Point(5.4, -30.5, 0.0)  # C_M
B_M = Point(0.0, -25.1, 0.0)  # B_M
D_M = Point(5.4, -25.1, 0.0)  # D_M
F_2 = Point(-0.0, -23.789699, 0.0)  # F_2
H_2 = Point(5.4, -23.789699, 0.0)  # H_2
I_M = Point(2.802712, -25.1, 0.0)  # I_M
G_2 = Point(-1.310301, -25.1, 0.0)  # G_2
I_2 = Point(6.710301, -25.1, 0.0)  # I_2
A_N = Point(0.0, -10.0, 0.0)  # A_N
C_N = Point(5.4, -10.0, 0.0)  # C_N
B_N = Point(0.0, -4.6, 0.0)  # B_N
D_N = Point(5.4, -4.6, 0.0)  # D_N
O_2 = Point(1.62, -10.0, 0.0)  # O_2
K_2 = Point(1.62, -4.6, 0.0)  # K_2
C_2 = Point(0.0, -5.004414, 0.0)  # C_2
E_2 = Point(5.4, -5.004414, 0.0)  # E_2
N_2 = Point(3.78, -4.6, 0.0)  # N_2
P_2 = Point(3.78, -10.0, 0.0)  # P_2
I_N = Point(2.802712, -4.6, 0.0)  # I_N
A_V = Point(0.0, -20.0, 0.0)  # A_V
C_V = Point(5.4, -20.0, 0.0)  # C_V
B_V = Point(0.0, -14.6, 0.0)  # B_V
D_V = Point(5.4, -14.6, 0.0)  # D_V
I_V = Point(2.802712, -14.6, 0.0)  # I_V
Q_2 = Point(0.0, -12.98, 0.0)  # Q_2
S_2 = Point(5.4, -16.22, 0.0)  # S_2
T_2 = Point(0.404414, -14.6, 0.0)  # T_2
V_2 = Point(0.404414, -20.0, 0.0)  # V_2
U_2 = Point(5.804414, -14.6, 0.0)  # U_2
W_2 = Point(5.804414, -20.0, 0.0)  # W_2
B_P = Point(24.0, 5.4, 0.0)  # B_P
D_P = Point(29.4, 5.4, 0.0)  # D_P
A_PN = Point(24.0, -10.0, 0.0)  # A_{PN}
C_PN = Point(29.4, -10.0, 0.0)  # C_{PN}
I_PN = Point(26.802712, -4.6, 0.0)  # I_{PN}
B_PN = Point(24.0, -4.6, 0.0)  # B_{PN}
D_PN = Point(29.4, -4.6, 0.0)  # D_{PN}
A_PV = Point(24.0, -20.0, 0.0)  # A_{PV}
C_PV = Point(29.4, -20.0, 0.0)  # C_{PV}
I_PV = Point(26.802712, -14.6, 0.0)  # I_{PV}
B_PV = Point(24.0, -14.6, 0.0)  # B_{PV}
D_PV = Point(29.4, -14.6, 0.0)  # D_{PV}
I_3 = Point(29.4, -4.920653, 0.0)  # I_3
J_3 = Point(24.0, -4.920653, 0.0)  # J_3
K_3 = Point(23.333333, -4.6, 0.0)  # K_3
M_3 = Point(23.333333, -10.0, 0.0)  # M_3
L_3 = Point(28.733333, -4.6, 0.0)  # L_3
N_3 = Point(28.733333, -10.0, 0.0)  # N_3
O_3 = Point(23.653986, -20.0, 0.0)  # O_3
Q_3 = Point(23.653986, -14.6, 0.0)  # Q_3
R_3 = Point(24.0, -15.266667, 0.0)  # R_3
S_3 = Point(29.4, -15.266667, 0.0)  # S_3
U_3 = Point(29.720653, -14.6, 0.0)  # U_3
T_3 = Point(29.720653, -20.0, 0.0)  # T_3
A_PM = Point(24.0, -30.5, 0.0)  # A_{PM}
C_PM = Point(29.4, -30.5, 0.0)  # C_{PM}
I_PM = Point(26.802712, -25.1, 0.0)  # I_{PM}
B_PM = Point(24.0, -25.1, 0.0)  # B_{PM}
D_PM = Point(29.4, -25.1, 0.0)  # D_{PM}
V_3 = Point(24.0, -26.221085, 0.0)  # V_3
A_4 = Point(29.4, -24.061085, 0.0)  # A_4
M_max1 = Point(2.7, -23.789699, 0.0)  # M_{max1}
M_max2 = Point(2.7, -25.101899, 0.0)  # M_{max2}
B_S = Point(40.0, 5.4, 0.0)  # B_S
D_S = Point(45.4, 5.4, 0.0)  # D_S
I_S = Point(42.802712, 5.4, 0.0)  # I_S
I_SN = Point(42.802712, -4.6, 0.0)  # I_{SN}
B_SN = Point(40.0, -4.6, 0.0)  # B_{SN}
D_SN = Point(45.4, -4.6, 0.0)  # D_{SN}
A_SV = Point(40.0, -20.0, 0.0)  # A_{SV}
C_SV = Point(45.4, -20.0, 0.0)  # C_{SV}
I_SV = Point(42.802712, -14.6, 0.0)  # I_{SV}
B_SV = Point(40.0, -14.6, 0.0)  # B_{SV}
D_SV = Point(45.4, -14.6, 0.0)  # D_{SV}
A_SM = Point(40.0, -30.5, 0.0)  # A_{SM}
C_SM = Point(45.4, -30.5, 0.0)  # C_{SM}
I_SM = Point(42.802712, -25.1, 0.0)  # I_{SM}
B_SM = Point(40.0, -25.1, 0.0)  # B_{SM}
D_SM = Point(45.4, -25.1, 0.0)  # D_{SM}
K_4 = Point(40.953333, -4.6, 0.0)  # K_4
I_4 = Point(40.0, -5.325067, 0.0)  # I_4
M_4 = Point(43.113333, -4.6, 0.0)  # M_4
N_4 = Point(40.953333, -10.0, 0.0)  # N_4
O_4 = Point(45.4, -5.325067, 0.0)  # O_4
P_4 = Point(43.113333, -10.0, 0.0)  # P_4
L_4 = Point(40.0584, -20.0, 0.0)  # L_4
R_4 = Point(40.0584, -14.6, 0.0)  # R_4
U_4 = Point(46.125067, -14.6, 0.0)  # U_4
S_4 = Point(46.125067, -20.0, 0.0)  # S_4
V_4 = Point(40.0, -13.646667, 0.0)  # V_4
W_4 = Point(45.4, -16.886667, 0.0)  # W_4
T_4 = Point(39.810784, -25.1, 0.0)  # T_4
Z_4 = Point(40.0, -24.910784, 0.0)  # Z_4
B_5 = Point(45.4, -22.750784, 0.0)  # B_5
A_5 = Point(47.749216, -25.1, 0.0)  # A_5
FPM0 = Point(-0.0, -23.789699, 0.0)  # FPM0
FPM1 = Point(0.135, -23.920919, 0.0)  # FPM1
FPM2 = Point(0.405, -24.157115, 0.0)  # FPM2
FPM3 = Point(0.675, -24.367067, 0.0)  # FPM3
FPM4 = Point(0.945, -24.550775, 0.0)  # FPM4
FPM5 = Point(1.215, -24.708239, 0.0)  # FPM5
FPM6 = Point(1.485, -24.839459, 0.0)  # FPM6
FPM7 = Point(1.755, -24.944435, 0.0)  # FPM7
FPM8 = Point(2.025, -25.023167, 0.0)  # FPM8
FPM9 = Point(2.295, -25.075655, 0.0)  # FPM9
FPM10 = Point(2.565, -25.101899, 0.0)  # FPM10
FPM11 = Point(2.835, -25.101899, 0.0)  # FPM11
FPM12 = Point(3.105, -25.075655, 0.0)  # FPM12
FPM13 = Point(3.375, -25.023167, 0.0)  # FPM13
FPM14 = Point(3.645, -24.944435, 0.0)  # FPM14
FPM15 = Point(3.915, -24.839459, 0.0)  # FPM15
FPM16 = Point(4.185, -24.708239, 0.0)  # FPM16
FPM17 = Point(4.455, -24.550775, 0.0)  # FPM17
FPM18 = Point(4.725, -24.367067, 0.0)  # FPM18
FPM19 = Point(4.995, -24.157115, 0.0)  # FPM19
FPM20 = Point(5.265, -23.920919, 0.0)  # FPM20
FPTM0 = Point(40.0, -24.910784, 0.0)  # FPTM0
FPTM1 = Point(40.135, -24.988004, 0.0)  # FPTM1
FPTM2 = Point(40.405, -25.1162, 0.0)  # FPTM2
FPTM3 = Point(40.675, -25.218152, 0.0)  # FPTM3
FPTM4 = Point(40.945, -25.29386, 0.0)  # FPTM4
FPTM5 = Point(41.215, -25.343324, 0.0)  # FPTM5
FPTM6 = Point(41.485, -25.366544, 0.0)  # FPTM6
FPTM7 = Point(41.755, -25.36352, 0.0)  # FPTM7
FPTM8 = Point(42.025, -25.334252, 0.0)  # FPTM8
FPTM9 = Point(42.295, -25.27874, 0.0)  # FPTM9
FPTM10 = Point(42.565, -25.196984, 0.0)  # FPTM10
FPTM11 = Point(42.835, -25.088984, 0.0)  # FPTM11
FPTM12 = Point(43.105, -24.95474, 0.0)  # FPTM12
FPTM13 = Point(43.375, -24.794252, 0.0)  # FPTM13
FPTM14 = Point(43.645, -24.60752, 0.0)  # FPTM14
FPTM15 = Point(43.915, -24.394544, 0.0)  # FPTM15
FPTM16 = Point(44.185, -24.155324, 0.0)  # FPTM16
FPTM17 = Point(44.455, -23.88986, 0.0)  # FPTM17
FPTM18 = Point(44.725, -23.598152, 0.0)  # FPTM18
FPTM19 = Point(44.995, -23.2802, 0.0)  # FPTM19
FPTM20 = Point(45.265, -22.936004, 0.0)  # FPTM20
J_2 = Point(42.7, -23.830784, 0.0)  # J_2
M_2 = Point(42.7, -25.142984, 0.0)  # M_2
Z_3 = Point(25.121085, -25.1, 0.0)  # Z_3
W_3 = Point(30.438915, -25.1, 0.0)  # W_3
N = Point(42.802712, 9.231503, 0.0)  # N
Q_p = Point(42.802712, 8.556503, 0.0)  # Q'
O_p = Point(45.4, 8.556503, 0.0)  # O'
L2_p = Point(45.4, 9.231503, 0.0)  # L2'
L1_p = Point(40.0, 9.231503, 0.0)  # L1'
G_5 = Point(40.0, 8.556503, 0.0)  # G_5
Q_p_1 = Point(42.802712, 8.556503, 0.0)  # Q'_1
H_5 = Point(42.802712, 9.231503, 0.0)  # H_5
B_6 = Point(2.802712, -30.5, 0.0)  # B_6
M_5 = Point(2.802712, 10.482193, 0.0)  # M_5
J_5 = Point(0.0, 10.482193, 0.0)  # J_5
K_5 = Point(0.0, -30.5, 0.0)  # K_5
P_5 = Point(5.4, 10.482193, 0.0)  # P_5
D_6 = Point(5.4, -30.5, 0.0)  # D_6
Q_5 = Point(24.0, 10.482193, 0.0)  # Q_5
E_6 = Point(24.0, -30.5, 0.0)  # E_6
F_6 = Point(26.802712, -30.5, 0.0)  # F_6
R_5 = Point(26.802712, 10.482193, 0.0)  # R_5
S_5 = Point(29.4, 10.482193, 0.0)  # S_5
G_6 = Point(29.4, -30.5, 0.0)  # G_6
H_6 = Point(40.0, -30.5, 0.0)  # H_6
T_5 = Point(40.0, 10.482193, 0.0)  # T_5
J_6 = Point(42.802712, -30.5, 0.0)  # J_6
V_5 = Point(42.802712, 10.482193, 0.0)  # V_5
L_6 = Point(45.4, -30.5, 0.0)  # L_6
Z_5 = Point(45.4, 10.482193, 0.0)  # Z_5
frameBL = Point(-18.022803, -33.491983, 0.0)  # frameBL
fBR = Point(74.054567, -33.491983, 0.0)  # fBR
I_5 = Point(74.054567, -79.530668, 0.0)  # I_5
frameTR = Point(74.054567, 12.546702, 0.0)  # frameTR
fbl = Point(-18.022803, 12.546702, 0.0)  # fbl
T_6 = Point(15.11165, 5.265933, 0.0)  # T_6
U_6 = Point(15.11165, -10.934067, 0.0)  # U_6
K = Point(14.61165, -10.934067, 0.0)  # K
G_3 = Point(33.343334, 8.815389, 0.0)  # G_3
Z_6 = Point(33.843334, 8.815389, 0.0)  # Z_6
B_4 = Point(62.682281, -11.006107, 0.0)  # B_4
G_7 = Point(63.182281, -11.006107, 0.0)  # G_7
LLT0 = Point(62.682281, 5.193893, 0.0)  # LLT0
F_7 = Point(63.182281, 5.193893, 0.0)  # F_7
H_7 = Point(59.348948, 5.693893, 0.0)  # H_7
I_7 = Point(62.682281, 5.693893, 0.0)  # I_7

# --- geometry ---
S.add(A_3, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(A, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(A_P, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(C, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(C_P, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(Line(B_p, D_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(I, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(I_P, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(A_S, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(Polygon([L1, N_5, Q, P_3]), linecolor=Color(0.0, 0.502, 0.0), facecolor=Color(0.0, 0.502, 0.0), linewidth=1.2, opacity=0.15)
S.add(A_M, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(Polygon([P_3, Q, O, L2]), linecolor=Color(0.0, 0.502, 0.0), facecolor=Color(0.0, 0.502, 0.0), linewidth=1.2, opacity=0.15)
S.add(Line(B, D), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(Point(33.343334, 5.482056, 0.0), Point(31.613264, 5.482056, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(31.613264, 5.482056, 0.0), Point(35.599572, 7.167439, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(31.613264, 5.482056, 0.0), Point(35.599572, 3.796672, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(34.946598, 5.482056, 0.0), Point(33.343334, 5.482056, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(33.343334, 5.482056, 0.0), Point(37.329641, 7.167439, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(33.343334, 5.482056, 0.0), Point(37.329641, 3.796672, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(LL0, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(12.589581, -10.934067, 0.0), Point(12.589581, -2.834067, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.589581, -2.834067, 0.0), Point(14.274965, -6.820374, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.589581, -2.834067, 0.0), Point(10.904197, -6.820374, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.589581, 5.265933, 0.0), Point(14.61165, 5.265933, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.61165, 5.265933, 0.0), Point(10.625343, 3.58055, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.61165, 5.265933, 0.0), Point(10.625343, 6.951317, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.61165, -10.934067, 0.0), Point(12.589581, -10.934067, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.589581, -10.934067, 0.0), Point(16.575888, -9.248683, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.589581, -10.934067, 0.0), Point(16.575888, -12.61945, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(C_S, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(C_SN, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(Line(Point(33.843334, 5.482056, 0.0), Point(33.843334, 8.815389, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(33.843334, 8.815389, 0.0), Point(35.528717, 4.829082, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(33.843334, 8.815389, 0.0), Point(32.15795, 4.829082, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(C_4, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(59.056948, -11.006107, 0.0), Point(59.056948, 0.427226, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(59.056948, 0.427226, 0.0), Point(60.742331, -3.559081, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(59.056948, 0.427226, 0.0), Point(57.371564, -3.559081, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(62.682281, -11.006107, 0.0), Point(59.056948, -11.006107, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(59.056948, -11.006107, 0.0), Point(63.043255, -9.320724, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(59.056948, -11.006107, 0.0), Point(63.043255, -12.691491, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(A_SN, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(Line(Point(12.589581, -2.834067, 0.0), Point(12.589581, 5.265933, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.589581, 5.265933, 0.0), Point(14.274965, 1.279626, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.589581, 5.265933, 0.0), Point(10.904197, 1.279626, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(33.343334, 8.815389, 0.0), Point(33.343334, 5.482056, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(33.343334, 5.482056, 0.0), Point(31.65795, 9.468363, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(33.343334, 5.482056, 0.0), Point(35.028717, 9.468363, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(59.056948, 0.427226, 0.0), Point(59.056948, 5.193893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(59.056948, 5.193893, 0.0), Point(60.742331, 1.207585, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(59.056948, 5.193893, 0.0), Point(57.371564, 1.207585, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(K_1, LL0), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A, B), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(D, C), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(Point(-1.8, 0.0, 0.0), Point(0.0, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 0.0, 0.0), Point(-3.986307, -1.685384, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 0.0, 0.0), Point(-3.986307, 1.685384, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, -1.8, 0.0), Point(0.0, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 0.0, 0.0), Point(1.685384, -3.986307, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 0.0, 0.0), Point(-1.685384, -3.986307, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.4, -1.8, 0.0), Point(5.4, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.4, 0.0, 0.0), Point(7.085384, -3.986307, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.4, 0.0, 0.0), Point(3.714616, -3.986307, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.2, 0.0, 0.0), Point(5.4, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.4, 0.0, 0.0), Point(9.386307, 1.685384, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.4, 0.0, 0.0), Point(9.386307, -1.685384, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(A, Z), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Z, C), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(A_1, C), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(C_M, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(Line(A_M, B_M), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(B_M, D_M), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(D_M, C_M), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(F_2, H_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(I_M, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(Line(A_M, G_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(G_2, B_M), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_M, F_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_2, D_M), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_M, I_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_2, C_M), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Polyline([Point(-0.0, -23.789699, 0.0), Point(-0.032156, -23.790094, 0.0), Point(-0.064293, -23.791277, 0.0), Point(-0.096392, -23.793249, 0.0), Point(-0.128432, -23.796008, 0.0), Point(-0.160395, -23.799553, 0.0), Point(-0.192261, -23.803881, 0.0), Point(-0.224012, -23.80899, 0.0), Point(-0.255627, -23.814876, 0.0), Point(-0.287089, -23.821536, 0.0), Point(-0.318377, -23.828967, 0.0), Point(-0.349474, -23.837163, 0.0), Point(-0.38036, -23.84612, 0.0), Point(-0.411018, -23.855832, 0.0), Point(-0.441427, -23.866294, 0.0), Point(-0.471571, -23.877499, 0.0), Point(-0.50143, -23.88944, 0.0), Point(-0.530988, -23.90211, 0.0), Point(-0.560226, -23.915502, 0.0), Point(-0.589126, -23.929607, 0.0), Point(-0.617672, -23.944418, 0.0), Point(-0.645845, -23.959924, 0.0), Point(-0.673629, -23.976117, 0.0), Point(-0.701008, -23.992988, 0.0), Point(-0.727964, -24.010525, 0.0), Point(-0.754482, -24.028718, 0.0), Point(-0.780545, -24.047556, 0.0), Point(-0.806139, -24.067029, 0.0), Point(-0.831246, -24.087124, 0.0), Point(-0.855853, -24.107828, 0.0), Point(-0.879944, -24.129131, 0.0), Point(-0.903506, -24.151018, 0.0), Point(-0.926523, -24.173477, 0.0), Point(-0.948982, -24.196494, 0.0), Point(-0.970869, -24.220056, 0.0), Point(-0.992172, -24.244147, 0.0), Point(-1.012876, -24.268754, 0.0), Point(-1.032971, -24.293861, 0.0), Point(-1.052444, -24.319455, 0.0), Point(-1.071282, -24.345518, 0.0), Point(-1.089475, -24.372036, 0.0), Point(-1.107012, -24.398992, 0.0), Point(-1.123883, -24.426371, 0.0), Point(-1.140076, -24.454155, 0.0), Point(-1.155582, -24.482328, 0.0), Point(-1.170393, -24.510874, 0.0), Point(-1.184498, -24.539774, 0.0), Point(-1.19789, -24.569012, 0.0), Point(-1.21056, -24.59857, 0.0), Point(-1.222501, -24.628429, 0.0), Point(-1.233706, -24.658573, 0.0), Point(-1.244168, -24.688982, 0.0), Point(-1.25388, -24.71964, 0.0), Point(-1.262837, -24.750526, 0.0), Point(-1.271033, -24.781623, 0.0), Point(-1.278464, -24.812911, 0.0), Point(-1.285124, -24.844373, 0.0), Point(-1.29101, -24.875988, 0.0), Point(-1.296119, -24.907739, 0.0), Point(-1.300447, -24.939605, 0.0), Point(-1.303992, -24.971568, 0.0), Point(-1.306751, -25.003608, 0.0), Point(-1.308723, -25.035707, 0.0), Point(-1.309906, -25.067844, 0.0), Point(-1.310301, -25.1, 0.0)]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)  # arc
S.add(Polyline([Point(6.710301, -25.1, 0.0), Point(6.709906, -25.067844, 0.0), Point(6.708723, -25.035707, 0.0), Point(6.706751, -25.003608, 0.0), Point(6.703992, -24.971568, 0.0), Point(6.700447, -24.939605, 0.0), Point(6.696119, -24.907739, 0.0), Point(6.69101, -24.875988, 0.0), Point(6.685124, -24.844373, 0.0), Point(6.678464, -24.812911, 0.0), Point(6.671033, -24.781623, 0.0), Point(6.662837, -24.750526, 0.0), Point(6.65388, -24.71964, 0.0), Point(6.644168, -24.688982, 0.0), Point(6.633706, -24.658573, 0.0), Point(6.622501, -24.628429, 0.0), Point(6.61056, -24.59857, 0.0), Point(6.59789, -24.569012, 0.0), Point(6.584498, -24.539774, 0.0), Point(6.570393, -24.510874, 0.0), Point(6.555582, -24.482328, 0.0), Point(6.540076, -24.454155, 0.0), Point(6.523883, -24.426371, 0.0), Point(6.507012, -24.398992, 0.0), Point(6.489475, -24.372036, 0.0), Point(6.471282, -24.345518, 0.0), Point(6.452444, -24.319455, 0.0), Point(6.432971, -24.293861, 0.0), Point(6.412876, -24.268754, 0.0), Point(6.392172, -24.244147, 0.0), Point(6.370869, -24.220056, 0.0), Point(6.348982, -24.196494, 0.0), Point(6.326523, -24.173477, 0.0), Point(6.303506, -24.151018, 0.0), Point(6.279944, -24.129131, 0.0), Point(6.255853, -24.107828, 0.0), Point(6.231246, -24.087124, 0.0), Point(6.206139, -24.067029, 0.0), Point(6.180545, -24.047556, 0.0), Point(6.154482, -24.028718, 0.0), Point(6.127964, -24.010525, 0.0), Point(6.101008, -23.992988, 0.0), Point(6.073629, -23.976117, 0.0), Point(6.045845, -23.959924, 0.0), Point(6.017672, -23.944418, 0.0), Point(5.989126, -23.929607, 0.0), Point(5.960226, -23.915502, 0.0), Point(5.930988, -23.90211, 0.0), Point(5.90143, -23.88944, 0.0), Point(5.871571, -23.877499, 0.0), Point(5.841427, -23.866294, 0.0), Point(5.811018, -23.855832, 0.0), Point(5.78036, -23.84612, 0.0), Point(5.749474, -23.837163, 0.0), Point(5.718377, -23.828967, 0.0), Point(5.687089, -23.821536, 0.0), Point(5.655627, -23.814876, 0.0), Point(5.624012, -23.80899, 0.0), Point(5.592261, -23.803881, 0.0), Point(5.560395, -23.799553, 0.0), Point(5.528432, -23.796008, 0.0), Point(5.496392, -23.793249, 0.0), Point(5.464293, -23.791277, 0.0), Point(5.432156, -23.790094, 0.0), Point(5.4, -23.789699, 0.0)]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)  # arc
S.add(A_N, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(C_N, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(Line(A_N, B_N), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(B_N, D_N), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(D_N, C_N), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(A_N, O_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_2, K_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(K_2, B_N), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_N, C_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_2, E_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(E_2, D_N), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_N, N_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_2, P_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(P_2, C_N), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(I_N, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(A_V, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(C_V, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(Line(A_V, B_V), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(B_V, D_V), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(D_V, C_V), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(I_V, pointcolor=Color(0.7529, 0.7529, 0.7529), pointsize=4.5)
S.add(Line(Q_2, S_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(B_V, Q_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_V, S_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_V, T_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_2, V_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(V_2, A_V), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_V, U_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_2, W_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(W_2, C_V), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_P, B_P), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(B_P, D_P), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(D_P, C_P), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(Point(22.2, 5.4, 0.0), Point(24.0, 5.4, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(24.0, 5.4, 0.0), Point(20.013693, 3.714616, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(24.0, 5.4, 0.0), Point(20.013693, 7.085384, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(22.2, 0.0, 0.0), Point(24.0, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(24.0, 0.0, 0.0), Point(20.013693, -1.685384, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(24.0, 0.0, 0.0), Point(20.013693, 1.685384, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(24.0, -1.8, 0.0), Point(24.0, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(24.0, 0.0, 0.0), Point(25.685384, -3.986307, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(24.0, 0.0, 0.0), Point(22.314616, -3.986307, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(29.4, -1.8, 0.0), Point(29.4, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(29.4, 0.0, 0.0), Point(31.085384, -3.986307, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(29.4, 0.0, 0.0), Point(27.714616, -3.986307, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(31.2, 0.0, 0.0), Point(29.4, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(29.4, 0.0, 0.0), Point(33.386307, 1.685384, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(29.4, 0.0, 0.0), Point(33.386307, -1.685384, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(A_PN, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(C_PN, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(I_PN, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(Line(A_PN, B_PN), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(B_PN, D_PN), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(D_PN, C_PN), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(A_PV, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(C_PV, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(I_PV, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(Line(A_PV, B_PV), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(B_PV, D_PV), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(D_PV, C_PV), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(D_PN, I_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_3, J_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(J_3, B_PN), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_PN, K_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(K_3, M_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(M_3, A_PN), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_PN, L_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_3, N_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(N_3, C_PN), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_PV, O_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_3, Q_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(Q_3, B_PV), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_PV, R_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_3, S_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(S_3, D_PV), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_PV, U_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_3, T_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(T_3, C_PV), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(A_PM, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(C_PM, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(I_PM, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(Line(A_PM, B_PM), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(B_PM, D_PM), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(D_PM, C_PM), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(B_PM, V_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V_3, A_4), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(A_4, D_PM), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_max1, M_max2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_S, B_S), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(B_S, D_S), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(D_S, C_S), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(I_S, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(Line(Point(38.2, 5.4, 0.0), Point(40.0, 5.4, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(40.0, 5.4, 0.0), Point(36.013693, 3.714616, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(40.0, 5.4, 0.0), Point(36.013693, 7.085384, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(38.2, 0.0, 0.0), Point(40.0, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(40.0, 0.0, 0.0), Point(36.013693, -1.685384, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(40.0, 0.0, 0.0), Point(36.013693, 1.685384, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(40.0, -1.8, 0.0), Point(40.0, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(40.0, 0.0, 0.0), Point(41.685384, -3.986307, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(40.0, 0.0, 0.0), Point(38.314616, -3.986307, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(45.4, -1.8, 0.0), Point(45.4, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(45.4, 0.0, 0.0), Point(47.085384, -3.986307, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(45.4, 0.0, 0.0), Point(43.714616, -3.986307, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(47.2, 0.0, 0.0), Point(45.4, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(45.4, 0.0, 0.0), Point(49.386307, 1.685384, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(45.4, 0.0, 0.0), Point(49.386307, -1.685384, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(59.056948, 5.193893, 0.0), Point(59.348948, 5.193893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(59.348948, 5.193893, 0.0), Point(55.36264, 3.508509, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(59.348948, 5.193893, 0.0), Point(55.36264, 6.879276, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(I_SN, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(Line(A_SN, B_SN), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(B_SN, D_SN), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(D_SN, C_SN), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(A_SV, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(C_SV, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(I_SV, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(Line(A_SV, B_SV), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(B_SV, D_SV), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(D_SV, C_SV), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(A_SM, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(C_SM, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(I_SM, pointcolor=Color(0.8784, 0.8784, 0.8784), pointsize=4.5)
S.add(Line(A_SM, B_SM), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(B_SM, D_SM), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(D_SM, C_SM), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(K_4, B_SN), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_SN, I_4), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_SN, M_4), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_4, K_4), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(A_SN, N_4), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_4, O_4), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(O_4, D_SN), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_4, C_SN), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_4, P_4), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(A_SV, L_4), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_4, R_4), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(R_4, B_SV), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_4, D_SV), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_SV, S_4), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_4, U_4), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(B_SV, V_4), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V_4, W_4), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(W_4, D_SV), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_SM, T_4), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_4, B_SM), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_SM, Z_4), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_5, D_SM), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(D_SM, A_5), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_5, C_SM), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(Z_4, B_5), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Polyline([FPM0, FPM1, FPM2, FPM3, FPM4, FPM5, FPM6, FPM7, FPM8, FPM9, FPM10, FPM11, FPM12, FPM13, FPM14, FPM15, FPM16, FPM17, FPM18, FPM19, FPM20, H_2]), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Polyline([FPTM0, FPTM1, FPTM2, FPTM3, FPTM4, FPTM5, FPTM6, FPTM7, FPTM8, FPTM9, FPTM10, FPTM11, FPTM12, FPTM13, FPTM14, FPTM15, FPTM16, FPTM17, FPTM18, FPTM19, FPTM20, B_5]), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(J_2, M_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([Point(40.0, -24.910784, 0.0), Point(39.995356, -24.910841, 0.0), Point(39.990716, -24.911012, 0.0), Point(39.98608, -24.911297, 0.0), Point(39.981454, -24.911695, 0.0), Point(39.976838, -24.912207, 0.0), Point(39.972236, -24.912832, 0.0), Point(39.967651, -24.91357, 0.0), Point(39.963086, -24.91442, 0.0), Point(39.958543, -24.915381, 0.0), Point(39.954024, -24.916455, 0.0), Point(39.949534, -24.917638, 0.0), Point(39.945073, -24.918932, 0.0), Point(39.940646, -24.920334, 0.0), Point(39.936255, -24.921845, 0.0), Point(39.931902, -24.923463, 0.0), Point(39.92759, -24.925187, 0.0), Point(39.923322, -24.927017, 0.0), Point(39.9191, -24.928951, 0.0), Point(39.914926, -24.930988, 0.0), Point(39.910804, -24.933126, 0.0), Point(39.906736, -24.935366, 0.0), Point(39.902724, -24.937704, 0.0), Point(39.89877, -24.94014, 0.0), Point(39.894877, -24.942673, 0.0), Point(39.891048, -24.9453, 0.0), Point(39.887284, -24.94802, 0.0), Point(39.883588, -24.950832, 0.0), Point(39.879963, -24.953734, 0.0), Point(39.876409, -24.956724, 0.0), Point(39.87293, -24.9598, 0.0), Point(39.869528, -24.962961, 0.0), Point(39.866204, -24.966204, 0.0), Point(39.862961, -24.969528, 0.0), Point(39.8598, -24.97293, 0.0), Point(39.856724, -24.976409, 0.0), Point(39.853734, -24.979963, 0.0), Point(39.850832, -24.983588, 0.0), Point(39.84802, -24.987284, 0.0), Point(39.8453, -24.991048, 0.0), Point(39.842673, -24.994877, 0.0), Point(39.84014, -24.99877, 0.0), Point(39.837704, -25.002724, 0.0), Point(39.835366, -25.006736, 0.0), Point(39.833126, -25.010804, 0.0), Point(39.830988, -25.014926, 0.0), Point(39.828951, -25.0191, 0.0), Point(39.827017, -25.023322, 0.0), Point(39.825187, -25.02759, 0.0), Point(39.823463, -25.031902, 0.0), Point(39.821845, -25.036255, 0.0), Point(39.820334, -25.040646, 0.0), Point(39.818932, -25.045073, 0.0), Point(39.817638, -25.049534, 0.0), Point(39.816455, -25.054024, 0.0), Point(39.815381, -25.058543, 0.0), Point(39.81442, -25.063086, 0.0), Point(39.81357, -25.067651, 0.0), Point(39.812832, -25.072236, 0.0), Point(39.812207, -25.076838, 0.0), Point(39.811695, -25.081454, 0.0), Point(39.811297, -25.08608, 0.0), Point(39.811012, -25.090716, 0.0), Point(39.810841, -25.095356, 0.0), Point(39.810784, -25.1, 0.0)]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)  # arc
S.add(Polyline([Point(47.749216, -25.1, 0.0), Point(47.748509, -25.042347, 0.0), Point(47.746386, -24.984729, 0.0), Point(47.742851, -24.927181, 0.0), Point(47.737904, -24.869737, 0.0), Point(47.731549, -24.812431, 0.0), Point(47.723789, -24.755298, 0.0), Point(47.71463, -24.698374, 0.0), Point(47.704077, -24.641691, 0.0), Point(47.692135, -24.585284, 0.0), Point(47.678813, -24.529187, 0.0), Point(47.664118, -24.473434, 0.0), Point(47.64806, -24.418059, 0.0), Point(47.630647, -24.363094, 0.0), Point(47.61189, -24.308573, 0.0), Point(47.591802, -24.254529, 0.0), Point(47.570393, -24.200994, 0.0), Point(47.547676, -24.148001, 0.0), Point(47.523666, -24.095581, 0.0), Point(47.498377, -24.043766, 0.0), Point(47.471824, -23.992587, 0.0), Point(47.444022, -23.942076, 0.0), Point(47.41499, -23.892262, 0.0), Point(47.384744, -23.843175, 0.0), Point(47.353302, -23.794845, 0.0), Point(47.320683, -23.747302, 0.0), Point(47.286908, -23.700574, 0.0), Point(47.251996, -23.654688, 0.0), Point(47.215969, -23.609673, 0.0), Point(47.178847, -23.565556, 0.0), Point(47.140654, -23.522363, 0.0), Point(47.101413, -23.48012, 0.0), Point(47.061147, -23.438853, 0.0), Point(47.01988, -23.398587, 0.0), Point(46.977637, -23.359346, 0.0), Point(46.934444, -23.321153, 0.0), Point(46.890327, -23.284031, 0.0), Point(46.845312, -23.248004, 0.0), Point(46.799426, -23.213092, 0.0), Point(46.752698, -23.179317, 0.0), Point(46.705155, -23.146698, 0.0), Point(46.656825, -23.115256, 0.0), Point(46.607738, -23.08501, 0.0), Point(46.557924, -23.055978, 0.0), Point(46.507413, -23.028176, 0.0), Point(46.456234, -23.001623, 0.0), Point(46.404419, -22.976334, 0.0), Point(46.351999, -22.952324, 0.0), Point(46.299006, -22.929607, 0.0), Point(46.245471, -22.908198, 0.0), Point(46.191427, -22.88811, 0.0), Point(46.136906, -22.869353, 0.0), Point(46.081941, -22.85194, 0.0), Point(46.026566, -22.835882, 0.0), Point(45.970813, -22.821187, 0.0), Point(45.914716, -22.807865, 0.0), Point(45.858309, -22.795923, 0.0), Point(45.801626, -22.78537, 0.0), Point(45.744702, -22.776211, 0.0), Point(45.687569, -22.768451, 0.0), Point(45.630263, -22.762096, 0.0), Point(45.572819, -22.757149, 0.0), Point(45.515271, -22.753614, 0.0), Point(45.457653, -22.751491, 0.0), Point(45.4, -22.750784, 0.0)]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)  # arc
S.add(Line(B_PM, Z_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_3, A_PM), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(D_PM, W_3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W_3, C_PM), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Polyline([Point(30.438915, -25.1, 0.0), Point(30.438602, -25.074504, 0.0), Point(30.437664, -25.049023, 0.0), Point(30.4361, -25.023573, 0.0), Point(30.433912, -24.998169, 0.0), Point(30.431102, -24.972826, 0.0), Point(30.42767, -24.94756, 0.0), Point(30.42362, -24.922385, 0.0), Point(30.418953, -24.897318, 0.0), Point(30.413672, -24.872372, 0.0), Point(30.40778, -24.847564, 0.0), Point(30.401281, -24.822908, 0.0), Point(30.39418, -24.798419, 0.0), Point(30.386479, -24.774111, 0.0), Point(30.378184, -24.75, 0.0), Point(30.3693, -24.7261, 0.0), Point(30.359832, -24.702424, 0.0), Point(30.349786, -24.678989, 0.0), Point(30.339168, -24.655807, 0.0), Point(30.327984, -24.632892, 0.0), Point(30.316241, -24.610259, 0.0), Point(30.303946, -24.587921, 0.0), Point(30.291107, -24.565891, 0.0), Point(30.277731, -24.544183, 0.0), Point(30.263826, -24.52281, 0.0), Point(30.249401, -24.501784, 0.0), Point(30.234464, -24.481119, 0.0), Point(30.219025, -24.460827, 0.0), Point(30.203092, -24.440919, 0.0), Point(30.186676, -24.421409, 0.0), Point(30.169785, -24.402307, 0.0), Point(30.152431, -24.383626, 0.0), Point(30.134624, -24.365376, 0.0), Point(30.116374, -24.347569, 0.0), Point(30.097693, -24.330215, 0.0), Point(30.078591, -24.313324, 0.0), Point(30.059081, -24.296908, 0.0), Point(30.039173, -24.280975, 0.0), Point(30.018881, -24.265536, 0.0), Point(29.998216, -24.250599, 0.0), Point(29.97719, -24.236174, 0.0), Point(29.955817, -24.222269, 0.0), Point(29.934109, -24.208893, 0.0), Point(29.912079, -24.196054, 0.0), Point(29.889741, -24.183759, 0.0), Point(29.867108, -24.172016, 0.0), Point(29.844193, -24.160832, 0.0), Point(29.821011, -24.150214, 0.0), Point(29.797576, -24.140168, 0.0), Point(29.7739, -24.1307, 0.0), Point(29.75, -24.121816, 0.0), Point(29.725889, -24.113521, 0.0), Point(29.701581, -24.10582, 0.0), Point(29.677092, -24.098719, 0.0), Point(29.652436, -24.09222, 0.0), Point(29.627628, -24.086328, 0.0), Point(29.602682, -24.081047, 0.0), Point(29.577615, -24.07638, 0.0), Point(29.55244, -24.07233, 0.0), Point(29.527174, -24.068898, 0.0), Point(29.501831, -24.066088, 0.0), Point(29.476427, -24.0639, 0.0), Point(29.450977, -24.062336, 0.0), Point(29.425496, -24.061398, 0.0), Point(29.4, -24.061085, 0.0)]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)  # arc
S.add(Polyline([Point(24.0, -26.221085, 0.0), Point(24.027513, -26.220747, 0.0), Point(24.055009, -26.219735, 0.0), Point(24.082472, -26.218047, 0.0), Point(24.109886, -26.215687, 0.0), Point(24.137233, -26.212654, 0.0), Point(24.164497, -26.208951, 0.0), Point(24.191663, -26.20458, 0.0), Point(24.218713, -26.199544, 0.0), Point(24.245631, -26.193845, 0.0), Point(24.272401, -26.187487, 0.0), Point(24.299008, -26.180475, 0.0), Point(24.325434, -26.172811, 0.0), Point(24.351664, -26.164502, 0.0), Point(24.377682, -26.155551, 0.0), Point(24.403473, -26.145964, 0.0), Point(24.429021, -26.135747, 0.0), Point(24.45431, -26.124907, 0.0), Point(24.479326, -26.113449, 0.0), Point(24.504053, -26.10138, 0.0), Point(24.528476, -26.088709, 0.0), Point(24.552581, -26.075441, 0.0), Point(24.576353, -26.061587, 0.0), Point(24.599778, -26.047153, 0.0), Point(24.622841, -26.032148, 0.0), Point(24.64553, -26.016582, 0.0), Point(24.66783, -26.000464, 0.0), Point(24.689727, -25.983803, 0.0), Point(24.711209, -25.96661, 0.0), Point(24.732262, -25.948895, 0.0), Point(24.752875, -25.930669, 0.0), Point(24.773034, -25.911943, 0.0), Point(24.792727, -25.892727, 0.0), Point(24.811943, -25.873034, 0.0), Point(24.830669, -25.852875, 0.0), Point(24.848895, -25.832262, 0.0), Point(24.86661, -25.811209, 0.0), Point(24.883803, -25.789727, 0.0), Point(24.900464, -25.76783, 0.0), Point(24.916582, -25.74553, 0.0), Point(24.932148, -25.722841, 0.0), Point(24.947153, -25.699778, 0.0), Point(24.961587, -25.676353, 0.0), Point(24.975441, -25.652581, 0.0), Point(24.988709, -25.628476, 0.0), Point(25.00138, -25.604053, 0.0), Point(25.013449, -25.579326, 0.0), Point(25.024907, -25.55431, 0.0), Point(25.035747, -25.529021, 0.0), Point(25.045964, -25.503473, 0.0), Point(25.055551, -25.477682, 0.0), Point(25.064502, -25.451664, 0.0), Point(25.072811, -25.425434, 0.0), Point(25.080475, -25.399008, 0.0), Point(25.087487, -25.372401, 0.0), Point(25.093845, -25.345631, 0.0), Point(25.099544, -25.318713, 0.0), Point(25.10458, -25.291663, 0.0), Point(25.108951, -25.264497, 0.0), Point(25.112654, -25.237233, 0.0), Point(25.115687, -25.209886, 0.0), Point(25.118047, -25.182472, 0.0), Point(25.119735, -25.155009, 0.0), Point(25.120747, -25.127513, 0.0), Point(25.121085, -25.1, 0.0)]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)  # arc
S.add(Polygon([N, Q_p, O_p, L2_p]), linecolor=Color(0.0, 0.502, 0.0), facecolor=Color(0.0, 0.502, 0.0), linewidth=1.2, opacity=0.15)
S.add(Polygon([L1_p, G_5, Q_p_1, H_5]), linecolor=Color(0.0, 0.502, 0.0), facecolor=Color(0.0, 0.502, 0.0), linewidth=1.2, opacity=0.15)
S.add(Line(B_6, M_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(J_5, K_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(P_5, D_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Q_5, E_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(F_6, R_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(S_5, G_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_6, T_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(J_6, V_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(L_6, Z_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(frameBL, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(fBR, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(I_5, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=4.5)
S.add(frameTR, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=4.5)
S.add(Polyline([frameBL, fbl, frameTR, fBR]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(frameBL, fBR), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(14.61165, 5.265933, 0.0), Point(14.61165, -3.142204, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.61165, -3.142204, 0.0), Point(12.926267, 0.844104, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.61165, -3.142204, 0.0), Point(16.297034, 0.844104, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.61165, -3.142204, 0.0), Point(14.61165, -10.934067, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.61165, -10.934067, 0.0), Point(12.926267, -6.947759, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.61165, -10.934067, 0.0), Point(16.297034, -6.947759, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(62.682281, 5.193893, 0.0), Point(62.682281, -3.214245, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(62.682281, -3.214245, 0.0), Point(60.996897, 0.772063, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(62.682281, -3.214245, 0.0), Point(64.367665, 0.772063, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(62.682281, -3.214245, 0.0), Point(62.682281, -11.006107, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(62.682281, -11.006107, 0.0), Point(60.996897, -7.0198, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(62.682281, -11.006107, 0.0), Point(64.367665, -7.0198, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(59.348948, 5.193893, 0.0), Point(62.682281, 5.193893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(62.682281, 5.193893, 0.0), Point(58.695974, 3.508509, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(62.682281, 5.193893, 0.0), Point(58.695974, 6.879276, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(1.401356, 7.950986, 0.0), Point(1.401356, 6.150986, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(1.401356, 6.150986, 0.0), Point(-0.284028, 10.137293, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(1.401356, 6.150986, 0.0), Point(3.08674, 10.137293, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.101356, 7.950986, 0.0), Point(4.101356, 6.150986, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.101356, 6.150986, 0.0), Point(2.415972, 10.137293, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.101356, 6.150986, 0.0), Point(5.78674, 10.137293, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.11165, 5.265933, 0.0), Point(15.11165, -10.934067, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.11165, -10.934067, 0.0), Point(13.426267, -6.947759, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.11165, -10.934067, 0.0), Point(16.797034, -6.947759, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(T_6, LL0), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_6, K), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(31.613264, 4.982056, 0.0), Point(34.946598, 4.982056, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(34.946598, 4.982056, 0.0), Point(30.96029, 3.296672, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(34.946598, 4.982056, 0.0), Point(30.96029, 6.667439, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(41.401356, 7.950986, 0.0), Point(41.401356, 6.150986, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(41.401356, 6.150986, 0.0), Point(39.715972, 10.137293, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(41.401356, 6.150986, 0.0), Point(43.08674, 10.137293, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(44.101356, 7.950986, 0.0), Point(44.101356, 6.150986, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(44.101356, 6.150986, 0.0), Point(42.415972, 10.137293, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(44.101356, 6.150986, 0.0), Point(45.78674, 10.137293, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(G_3, Z_6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(63.182281, 5.193893, 0.0), Point(63.182281, -11.006107, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(63.182281, -11.006107, 0.0), Point(61.496897, -7.0198, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(63.182281, -11.006107, 0.0), Point(64.867665, -7.0198, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(B_4, G_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LLT0, F_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(59.348948, 5.693893, 0.0), Point(62.682281, 5.693893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(62.682281, 5.693893, 0.0), Point(58.695974, 4.008509, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(62.682281, 5.693893, 0.0), Point(58.695974, 7.379276, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(C_4, H_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LLT0, I_7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)

if __name__ == "__main__":
    viewer.show()
