"""
COMPAS translation of GeoGebra applet: Airport Hangar, P. L. Nervi
Source: https://block.arch.ethz.ch/eq/drawing/view/32
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
LL0 = Point(65.0, 30.0, 0.0)  # LL0
LLB0 = Point(65.0, 30.0, 0.0)  # LLB0
FP0 = Point(0.0, 0.0, 0.0)  # FP0
B = Point(36.9, 0.0, 0.0)  # B
I = Point(-11.0, -12.5, 0.0)  # I
J = Point(0.0, -12.5, 0.0)  # J
H = Point(36.9, -12.5, 0.0)  # H
I_p = Point(47.9, -12.5, 0.0)  # I'
K = Point(18.45, 11.511694, 0.0)  # K
FPa0 = Point(0.0, 25.0, 0.0)  # FPa0
FPb8 = Point(18.45, 26.520261, 0.0)  # FPb8
o1 = Point(77.0523, 24.755723, 0.0)  # o1
o2 = Point(76.660181, 16.227122, 0.0)  # o2
LL1 = Point(65.0, 28.731562, 0.0)  # LL1
LL2 = Point(65.0, 27.463125, 0.0)  # LL2
LL3 = Point(65.0, 26.194687, 0.0)  # LL3
LL4 = Point(65.0, 24.92625, 0.0)  # LL4
LL5 = Point(65.0, 23.657812, 0.0)  # LL5
LL6 = Point(65.0, 22.389375, 0.0)  # LL6
LL7 = Point(65.0, 21.120937, 0.0)  # LL7
LL8 = Point(65.0, 19.8525, 0.0)  # LL8
LL9 = Point(65.0, 18.584062, 0.0)  # LL9
LL10 = Point(65.0, 17.315625, 0.0)  # LL10
LL11 = Point(65.0, 16.047187, 0.0)  # LL11
LL12 = Point(65.0, 14.77875, 0.0)  # LL12
LL13 = Point(65.0, 13.510312, 0.0)  # LL13
LL14 = Point(65.0, 12.241875, 0.0)  # LL14
LL15 = Point(65.0, 10.973437, 0.0)  # LL15
LL16 = Point(65.0, 9.705, 0.0)  # LL16
P = Point(18.45, 24.738953, 0.0)  # P
Q = Point(36.9, 28.812033, 0.0)  # Q
FPa1 = Point(1.153125, 24.498245, 0.0)  # FPa1
FPa2 = Point(3.459375, 23.737454, 0.0)  # FPa2
FPa3 = Point(5.765625, 23.219383, 0.0)  # FPa3
FPa4 = Point(8.071875, 22.944032, 0.0)  # FPa4
FPa5 = Point(10.378125, 22.911401, 0.0)  # FPa5
FPa6 = Point(12.684375, 23.12149, 0.0)  # FPa6
FPa7 = Point(14.990625, 23.574299, 0.0)  # FPa7
FPa8 = Point(17.296875, 24.269828, 0.0)  # FPa8
FPb9 = Point(19.603125, 26.161732, 0.0)  # FPb9
FPb10 = Point(21.909375, 25.695556, 0.0)  # FPb10
FPb11 = Point(24.215625, 25.480263, 0.0)  # FPb11
FPb12 = Point(26.521875, 25.515852, 0.0)  # FPb12
FPb13 = Point(28.828125, 25.802323, 0.0)  # FPb13
FPb14 = Point(31.134375, 26.339677, 0.0)  # FPb14
FPb15 = Point(33.440625, 27.127914, 0.0)  # FPb15
FPb16 = Point(35.746875, 28.167032, 0.0)  # FPb16
B_1 = Point(65.0, 24.92625, 0.0)  # B_1
C_1 = Point(65.0, 14.77875, 0.0)  # C_1
pole = Point(56.86821, 19.8525, 0.0)  # pole
FP1 = Point(1.153125, 1.438962, 0.0)  # FP1
FP2 = Point(3.459375, 3.957145, 0.0)  # FP2
FP3 = Point(5.765625, 6.115588, 0.0)  # FP3
FP4 = Point(8.071875, 7.91429, 0.0)  # FP4
FP5 = Point(10.378125, 9.353252, 0.0)  # FP5
FP6 = Point(12.684375, 10.432473, 0.0)  # FP6
FP7 = Point(14.990625, 11.151954, 0.0)  # FP7
FP8 = Point(17.296875, 11.511694, 0.0)  # FP8
FP9 = Point(19.603125, 11.511694, 0.0)  # FP9
FP10 = Point(21.909375, 11.151954, 0.0)  # FP10
FP11 = Point(24.215625, 10.432473, 0.0)  # FP11
FP12 = Point(26.521875, 9.353252, 0.0)  # FP12
FP13 = Point(28.828125, 7.91429, 0.0)  # FP13
FP14 = Point(31.134375, 6.115588, 0.0)  # FP14
FP15 = Point(33.440625, 3.957145, 0.0)  # FP15
FP16 = Point(35.746875, 1.438962, 0.0)  # FP16
LLB1 = Point(65.0, 28.731562, 0.0)  # LLB1
LLB2 = Point(65.0, 27.463125, 0.0)  # LLB2
LLB3 = Point(65.0, 26.194687, 0.0)  # LLB3
LLB4 = Point(65.0, 23.023594, 0.0)  # LLB4
LLB5 = Point(65.0, 21.755156, 0.0)  # LLB5
LLB6 = Point(65.0, 20.486719, 0.0)  # LLB6
LLB7 = Point(65.0, 19.218281, 0.0)  # LLB7
LLB8 = Point(65.0, 17.949844, 0.0)  # LLB8
LLB9 = Point(65.0, 16.681406, 0.0)  # LLB9
LLB10 = Point(65.0, 15.412969, 0.0)  # LLB10
LLB11 = Point(65.0, 14.144531, 0.0)  # LLB11
LLB12 = Point(65.0, 12.876094, 0.0)  # LLB12
LLB13 = Point(65.0, 11.607656, 0.0)  # LLB13
LLB14 = Point(65.0, 10.339219, 0.0)  # LLB14
LLB15 = Point(65.0, 9.070781, 0.0)  # LLB15
F_1 = Point(65.0, 23.856006, 0.0)  # F_1
G_1 = Point(65.0, 12.876094, 0.0)  # G_1
poleC = Point(56.201149, 18.36605, 0.0)  # poleC
LLB16 = Point(65.0, 7.802344, 0.0)  # LLB16
FP_C0 = Point(0.0, 0.0, 0.0)  # FP_C0
FP_C1 = Point(1.153125, 1.524676, 0.0)  # FP_C1
FP_C2 = Point(3.459375, 4.241561, 0.0)  # FP_C2
FP_C3 = Point(5.765625, 6.625978, 0.0)  # FP_C3
FP_C4 = Point(8.071875, 8.677927, 0.0)  # FP_C4
FP_C5 = Point(10.378125, 9.898707, 0.0)  # FP_C5
FP_C6 = Point(12.684375, 10.787019, 0.0)  # FP_C6
FP_C7 = Point(14.990625, 11.342863, 0.0)  # FP_C7
FP_C8 = Point(17.296875, 11.56624, 0.0)  # FP_C8
FP_C9 = Point(19.603125, 11.457149, 0.0)  # FP_C9
FP_C10 = Point(21.909375, 11.01559, 0.0)  # FP_C10
FP_C11 = Point(24.215625, 10.241564, 0.0)  # FP_C11
FP_C12 = Point(26.521875, 9.13507, 0.0)  # FP_C12
FP_C13 = Point(28.828125, 7.696108, 0.0)  # FP_C13
FP_C14 = Point(31.134375, 5.924678, 0.0)  # FP_C14
FP_C15 = Point(33.440625, 3.820781, 0.0)  # FP_C15
FP_C16 = Point(35.746875, 1.384416, 0.0)  # FP_C16
L_1 = Point(-10.016988, -12.5, 0.0)  # L_1
K_1 = Point(46.916988, -12.5, 0.0)  # K_1
ground1 = Point(-12.099908, -12.5, 0.0)  # ground1
ground2 = Point(49.168751, -12.5, 0.0)  # ground2
LC0 = Point(65.0, 8.4, 0.0)  # LC0
LC1 = Point(65.0, 6.446767, 0.0)  # LC1
LC2 = Point(65.0, 4.639076, 0.0)  # LC2
LC3 = Point(65.0, 2.966117, 0.0)  # LC3
LC4 = Point(65.0, 1.414268, 0.0)  # LC4
LC5 = Point(65.0, -0.033502, 0.0)  # LC5
LC6 = Point(65.0, -1.398092, 0.0)  # LC6
LC7 = Point(65.0, -2.704345, 0.0)  # LC7
LC8 = Point(65.0, -3.980452, 0.0)  # LC8
LC15 = Point(65.0, -14.407672, 0.0)  # LC15
LC14 = Point(65.0, -12.59998, 0.0)  # LC14
LC13 = Point(65.0, -10.927022, 0.0)  # LC13
LC12 = Point(65.0, -9.375173, 0.0)  # LC12
LC11 = Point(65.0, -7.927402, 0.0)  # LC11
LC10 = Point(65.0, -6.562812, 0.0)  # LC10
LC9 = Point(65.0, -5.256559, 0.0)  # LC9
catenarypole = Point(55.907845, -3.980452, 0.0)  # catenarypole
LC16 = Point(65.0, -16.360905, 0.0)  # LC16
FPE0 = Point(0.0, 0.0, 0.0)  # FPE0
FPE1 = Point(1.153125, 1.570168, 0.0)  # FPE1
FPE2 = Point(3.459375, 4.21506, 0.0)  # FPE2
FPE3 = Point(5.765625, 6.401427, 0.0)  # FPE3
FPE4 = Point(8.071875, 8.163444, 0.0)  # FPE4
FPE5 = Point(10.378125, 9.531829, 0.0)  # FPE5
FPE6 = Point(12.684375, 10.532984, 0.0)  # FPE6
FPE7 = Point(14.990625, 11.188006, 0.0)  # FPE7
FPE8 = Point(17.296875, 11.511694, 0.0)  # FPE8
FPE9 = Point(19.603125, 11.511694, 0.0)  # FPE9
FPE10 = Point(21.909375, 11.188006, 0.0)  # FPE10
FPE11 = Point(24.215625, 10.532984, 0.0)  # FPE11
FPE12 = Point(26.521875, 9.531829, 0.0)  # FPE12
FPE13 = Point(28.828125, 8.163444, 0.0)  # FPE13
FPE14 = Point(31.134375, 6.401427, 0.0)  # FPE14
FPE15 = Point(33.440625, 4.21506, 0.0)  # FPE15
FPE16 = Point(35.746875, 1.570168, 0.0)  # FPE16
K_3 = Point(36.9, 0.0, 0.0)  # K_3
N_1 = Point(0.0, 28.284799, 0.0)  # N_1
A = Point(0.0, -16.122742, 0.0)  # A
H_4 = Point(1.153125, 28.284799, 0.0)  # H_4
D_5 = Point(1.153125, -16.122742, 0.0)  # D_5
I_4 = Point(3.459375, 28.284799, 0.0)  # I_4
E_5 = Point(3.459375, -16.122742, 0.0)  # E_5
L_4 = Point(8.071875, 28.284799, 0.0)  # L_4
H_5 = Point(8.071875, -16.122742, 0.0)  # H_5
M_4 = Point(10.378125, 28.284799, 0.0)  # M_4
I_5 = Point(10.378125, -16.122742, 0.0)  # I_5
N_4 = Point(12.684375, 28.284799, 0.0)  # N_4
J_5 = Point(12.684375, -16.122742, 0.0)  # J_5
O_4 = Point(14.990625, 28.284799, 0.0)  # O_4
K_5 = Point(14.990625, -16.122742, 0.0)  # K_5
P_4 = Point(17.296875, 28.284799, 0.0)  # P_4
L_5 = Point(17.296875, -16.122742, 0.0)  # L_5
Q_4 = Point(18.45, 28.284799, 0.0)  # Q_4
M_5 = Point(18.45, -16.122742, 0.0)  # M_5
R_4 = Point(19.603125, 28.284799, 0.0)  # R_4
N_5 = Point(19.603125, -16.122742, 0.0)  # N_5
S_4 = Point(21.909375, 28.284799, 0.0)  # S_4
O_5 = Point(21.909375, -16.122742, 0.0)  # O_5
T_4 = Point(24.215625, 28.284799, 0.0)  # T_4
P_5 = Point(24.215625, -16.122742, 0.0)  # P_5
U_4 = Point(26.521875, 28.284799, 0.0)  # U_4
Q_5 = Point(26.521875, -16.122742, 0.0)  # Q_5
V_4 = Point(28.828125, 28.284799, 0.0)  # V_4
R_5 = Point(28.828125, -16.122742, 0.0)  # R_5
W_4 = Point(31.134375, 28.284799, 0.0)  # W_4
S_5 = Point(31.134375, -16.122742, 0.0)  # S_5
Z_4 = Point(33.440625, 28.284799, 0.0)  # Z_4
T_5 = Point(33.440625, -16.122742, 0.0)  # T_5
A_5 = Point(35.746875, 28.284799, 0.0)  # A_5
U_5 = Point(35.746875, -16.122742, 0.0)  # U_5
B_5 = Point(36.9, 28.284799, 0.0)  # B_5
V_5 = Point(36.9, -16.122742, 0.0)  # V_5
A_6 = Point(5.765625, 28.284799, 0.0)  # A_6
W_5 = Point(5.765625, -16.122742, 0.0)  # W_5
frameBL = Point(-16.958367, -17.593191, 0.0)  # frameBL
M_1 = Point(-16.958367, 33.382354, 0.0)  # M_1
frameTR = Point(84.992721, 33.382354, 0.0)  # frameTR
T = Point(84.992721, -17.593191, 0.0)  # T

# --- geometry ---
S.add(LL0, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(LLB0, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(FP0, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(B, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(I, J), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H, I_p), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(K, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(FPa0, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(FPb8, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(FP0, K), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(K, B), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(o1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(o2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(1.153125, 20.0, 0.0), Point(1.153125, 17.69375, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(1.153125, 17.69375, 0.0), Point(-0.748659, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(1.153125, 17.69375, 0.0), Point(3.054909, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.459375, 20.0, 0.0), Point(3.459375, 17.69375, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.459375, 17.69375, 0.0), Point(1.557591, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.459375, 17.69375, 0.0), Point(5.361159, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.765625, 20.0, 0.0), Point(5.765625, 17.69375, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.765625, 17.69375, 0.0), Point(3.863841, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.765625, 17.69375, 0.0), Point(7.667409, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.071875, 20.0, 0.0), Point(8.071875, 17.69375, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.071875, 17.69375, 0.0), Point(6.170091, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.071875, 17.69375, 0.0), Point(9.973659, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.378125, 20.0, 0.0), Point(10.378125, 17.69375, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.378125, 17.69375, 0.0), Point(8.476341, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.378125, 17.69375, 0.0), Point(12.279909, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.684375, 20.0, 0.0), Point(12.684375, 17.69375, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.684375, 17.69375, 0.0), Point(10.782591, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.684375, 17.69375, 0.0), Point(14.586159, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.990625, 20.0, 0.0), Point(14.990625, 17.69375, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.990625, 17.69375, 0.0), Point(13.088841, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.990625, 17.69375, 0.0), Point(16.892409, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.296875, 20.0, 0.0), Point(17.296875, 17.69375, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(17.296875, 17.69375, 0.0), Point(15.395091, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(17.296875, 17.69375, 0.0), Point(19.198659, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.603125, 20.0, 0.0), Point(19.603125, 17.69375, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.603125, 17.69375, 0.0), Point(17.701341, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.603125, 17.69375, 0.0), Point(21.504909, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.909375, 20.0, 0.0), Point(21.909375, 17.69375, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.909375, 17.69375, 0.0), Point(20.007591, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.909375, 17.69375, 0.0), Point(23.811159, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(24.215625, 20.0, 0.0), Point(24.215625, 17.69375, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(24.215625, 17.69375, 0.0), Point(22.313841, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(24.215625, 17.69375, 0.0), Point(26.117409, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(26.521875, 20.0, 0.0), Point(26.521875, 17.69375, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(26.521875, 17.69375, 0.0), Point(24.620091, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(26.521875, 17.69375, 0.0), Point(28.423659, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(28.828125, 20.0, 0.0), Point(28.828125, 17.69375, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(28.828125, 17.69375, 0.0), Point(26.926341, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(28.828125, 17.69375, 0.0), Point(30.729909, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(31.134375, 20.0, 0.0), Point(31.134375, 17.69375, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(31.134375, 17.69375, 0.0), Point(29.232591, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(31.134375, 17.69375, 0.0), Point(33.036159, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(33.440625, 20.0, 0.0), Point(33.440625, 17.69375, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(33.440625, 17.69375, 0.0), Point(31.538841, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(33.440625, 17.69375, 0.0), Point(35.342409, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.746875, 20.0, 0.0), Point(35.746875, 17.69375, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.746875, 17.69375, 0.0), Point(33.845091, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(35.746875, 17.69375, 0.0), Point(37.648659, 22.191893, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(LL1, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(LL2, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(LL3, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(LL4, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(LL5, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(LL6, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(LL7, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(LL8, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(LL9, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(LL10, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(LL11, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(LL12, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(LL13, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(LL14, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(LL15, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(LL0, o1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL1, o1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL2, o1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL3, o1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL4, o1), linecolor=Color(0.4, 0.4, 0.4), linewidth=1.0)
S.add(Line(LL5, o1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL6, o1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL7, o1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL8, o1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL8, o2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL9, o2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL10, o2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL11, o2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL12, o2), linecolor=Color(0.4, 0.4, 0.4), linewidth=1.0)
S.add(Line(LL13, o2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL14, o2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL15, o2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(Line(LL16, o2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.0)
S.add(P, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Q, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Polyline([FPa0, FPa1, FPa2, FPa3, FPa4, FPa5, FPa6, FPa7, FPa8, P]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Polyline([FPb8, FPb9, FPb10, FPb11, FPb12, FPb13, FPb14, FPb15, FPb16, Q]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(FPa0, P), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(FPb8, Q), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(B_1, o1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=2.4)
S.add(Line(C_1, o2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=2.4)
S.add(pole, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(B_1, pole), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(pole, C_1), linecolor=Color(1.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(LL1, pole), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(LL2, pole), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(LL3, pole), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(LL4, pole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL5, pole), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(LL6, pole), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(LL7, pole), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(LL8, pole), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(LL9, pole), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(LL10, pole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL11, pole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL12, pole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL13, pole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL14, pole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL15, pole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LL16, pole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([FP0, FP1, FP2, FP3, FP4, FP5, FP6, FP7, FP8, FP9, FP10, FP11, FP12, FP13, FP14, FP15, FP16, B]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(LLB0, LLB1), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(LLB1, LLB2), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(LLB2, LLB3), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(LLB3, LLB4), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(LLB4, LLB5), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(LLB5, LLB6), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(LLB6, LLB7), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(LLB7, LLB8), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(LLB8, LLB9), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(LLB9, LLB10), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(LLB10, LLB11), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(LLB11, LLB12), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(LLB12, LLB13), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(LLB13, LLB14), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(LLB14, LLB15), linecolor=Color(1.0, 0.0, 0.0), linewidth=3.0)
S.add(F_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(G_1, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(poleC, pointcolor=Color(0.251, 0.251, 0.251), pointsize=3.0)
S.add(Line(LLB0, poleC), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LLB1, poleC), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LLB2, poleC), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LLB3, poleC), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LLB4, poleC), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LLB5, poleC), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LLB6, poleC), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LLB7, poleC), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LLB8, poleC), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LLB9, poleC), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LLB10, poleC), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LLB11, poleC), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LLB12, poleC), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LLB13, poleC), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LLB14, poleC), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LLB15, poleC), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LLB16, poleC), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([FP_C0, FP_C1, FP_C2, FP_C3, FP_C4, FP_C5, FP_C6, FP_C7, FP_C8, FP_C9, FP_C10, FP_C11, FP_C12, FP_C13, FP_C14, FP_C15, FP_C16, B]), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(J, H), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(FP0, L_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(B, K_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(ground1, ground2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Circle.from_point_and_radius(Point(35.746875, 1.438962, 0.0), 1.70734), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Circle.from_point_and_radius(Point(33.440625, 3.957145, 0.0), 1.579372), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Circle.from_point_and_radius(Point(31.134375, 6.115588, 0.0), 1.462371), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Circle.from_point_and_radius(Point(28.828125, 7.91429, 0.0), 1.359173), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Circle.from_point_and_radius(Point(26.521875, 9.353252, 0.0), 1.273137), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Circle.from_point_and_radius(Point(24.215625, 10.432473, 0.0), 1.207936), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Circle.from_point_and_radius(Point(21.909375, 11.151954, 0.0), 1.167069), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(21.909375, 12.319023, 0.0), Point(21.909375, 9.984885, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.909375, 9.984885, 0.0), Point(20.007591, 14.483028, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(21.909375, 9.984885, 0.0), Point(23.811159, 14.483028, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(24.215625, 11.64041, 0.0), Point(24.215625, 9.224537, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(24.215625, 9.224537, 0.0), Point(22.313841, 13.72268, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(24.215625, 9.224537, 0.0), Point(26.117409, 13.72268, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(26.521875, 10.626388, 0.0), Point(26.521875, 8.080115, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(26.521875, 8.080115, 0.0), Point(24.620091, 12.578258, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(26.521875, 8.080115, 0.0), Point(28.423659, 12.578258, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(28.828125, 9.273462, 0.0), Point(28.828125, 6.555117, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(28.828125, 6.555117, 0.0), Point(26.926341, 11.053261, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(28.828125, 6.555117, 0.0), Point(30.729909, 11.053261, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(31.134375, 7.577959, 0.0), Point(31.134375, 4.653216, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(31.134375, 4.653216, 0.0), Point(29.232591, 9.15136, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(31.134375, 4.653216, 0.0), Point(33.036159, 9.15136, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(33.440625, 5.536517, 0.0), Point(33.440625, 2.377773, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(33.440625, 2.377773, 0.0), Point(31.538841, 6.875916, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(33.440625, 2.377773, 0.0), Point(35.342409, 6.875916, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(35.746875, 3.146302, 0.0), Point(35.746875, -0.268378, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(35.746875, -0.268378, 0.0), Point(33.845091, 4.229765, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(35.746875, -0.268378, 0.0), Point(37.648659, 4.229765, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Circle.from_point_and_radius(Point(14.990625, 11.151954, 0.0), 1.167069), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Circle.from_point_and_radius(Point(12.684375, 10.432473, 0.0), 1.207936), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Circle.from_point_and_radius(Point(10.378125, 9.353252, 0.0), 1.273137), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Circle.from_point_and_radius(Point(8.071875, 7.91429, 0.0), 1.359173), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Circle.from_point_and_radius(Point(5.765625, 6.115588, 0.0), 1.462371), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Circle.from_point_and_radius(Point(3.459375, 3.957145, 0.0), 1.579372), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Circle.from_point_and_radius(Point(1.153125, 1.438962, 0.0), 1.70734), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(1.153125, 3.146302, 0.0), Point(1.153125, -0.268378, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(1.153125, -0.268378, 0.0), Point(-0.748659, 4.229765, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(1.153125, -0.268378, 0.0), Point(3.054909, 4.229765, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(3.459375, 5.536517, 0.0), Point(3.459375, 2.377773, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.459375, 2.377773, 0.0), Point(1.557591, 6.875916, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(3.459375, 2.377773, 0.0), Point(5.361159, 6.875916, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(5.765625, 7.577959, 0.0), Point(5.765625, 4.653216, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.765625, 4.653216, 0.0), Point(3.863841, 9.15136, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(5.765625, 4.653216, 0.0), Point(7.667409, 9.15136, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(8.071875, 9.273462, 0.0), Point(8.071875, 6.555117, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.071875, 6.555117, 0.0), Point(6.170091, 11.053261, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(8.071875, 6.555117, 0.0), Point(9.973659, 11.053261, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(10.378125, 10.626388, 0.0), Point(10.378125, 8.080115, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.378125, 8.080115, 0.0), Point(8.476341, 12.578258, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(10.378125, 8.080115, 0.0), Point(12.279909, 12.578258, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.684375, 11.64041, 0.0), Point(12.684375, 9.224537, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.684375, 9.224537, 0.0), Point(10.782591, 13.72268, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.684375, 9.224537, 0.0), Point(14.586159, 13.72268, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(14.990625, 12.319023, 0.0), Point(14.990625, 9.984885, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.990625, 9.984885, 0.0), Point(13.088841, 14.483028, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(14.990625, 9.984885, 0.0), Point(16.892409, 14.483028, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(LC0, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(LC1, pointcolor=Color(1.0, 0.0, 0.0), pointsize=3.0)
S.add(Circle.from_point_and_radius(Point(17.296875, 11.511694, 0.0), 1.153125), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Circle.from_point_and_radius(Point(19.603125, 11.511694, 0.0), 1.153125), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(17.296875, 12.664819, 0.0), Point(17.296875, 10.358569, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(17.296875, 10.358569, 0.0), Point(15.395091, 14.856713, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(17.296875, 10.358569, 0.0), Point(19.198659, 14.856713, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(19.603125, 12.664819, 0.0), Point(19.603125, 10.358569, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.603125, 10.358569, 0.0), Point(17.701341, 14.856713, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(19.603125, 10.358569, 0.0), Point(21.504909, 14.856713, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(LC2, pointcolor=Color(1.0, 0.0, 0.0), pointsize=3.0)
S.add(LC3, pointcolor=Color(1.0, 0.0, 0.0), pointsize=3.0)
S.add(LC4, pointcolor=Color(1.0, 0.0, 0.0), pointsize=3.0)
S.add(LC5, pointcolor=Color(1.0, 0.0, 0.0), pointsize=3.0)
S.add(LC6, pointcolor=Color(1.0, 0.0, 0.0), pointsize=3.0)
S.add(LC7, pointcolor=Color(1.0, 0.0, 0.0), pointsize=3.0)
S.add(LC8, pointcolor=Color(1.0, 0.0, 0.0), pointsize=3.0)
S.add(LC15, pointcolor=Color(1.0, 0.0, 0.0), pointsize=3.0)
S.add(LC14, pointcolor=Color(1.0, 0.0, 0.0), pointsize=3.0)
S.add(LC13, pointcolor=Color(1.0, 0.0, 0.0), pointsize=3.0)
S.add(LC12, pointcolor=Color(1.0, 0.0, 0.0), pointsize=3.0)
S.add(LC11, pointcolor=Color(1.0, 0.0, 0.0), pointsize=3.0)
S.add(LC10, pointcolor=Color(1.0, 0.0, 0.0), pointsize=3.0)
S.add(LC9, pointcolor=Color(1.0, 0.0, 0.0), pointsize=3.0)
S.add(catenarypole, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(Line(LC0, catenarypole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LC1, catenarypole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LC2, catenarypole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LC3, catenarypole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LC4, catenarypole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LC5, catenarypole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LC6, catenarypole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LC7, catenarypole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LC8, catenarypole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LC9, catenarypole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LC10, catenarypole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LC11, catenarypole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LC12, catenarypole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LC13, catenarypole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LC14, catenarypole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LC15, catenarypole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(LC16, catenarypole), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(FPE0, pointcolor=Color(0.0, 0.0, 1.0), pointsize=3.0)
S.add(Polyline([FPE0, FPE1, FPE2, FPE3, FPE4, FPE5, FPE6, FPE7, FPE8, FPE9, FPE10, FPE11, FPE12, FPE13, FPE14, FPE15, FPE16, K_3]), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.8)
S.add(Line(N_1, A), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(H_4, D_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(I_4, E_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L_4, H_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M_4, I_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N_4, J_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_4, K_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P_4, L_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q_4, M_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(R_4, N_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_4, O_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_4, P_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(U_4, Q_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V_4, R_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W_4, S_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z_4, T_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_5, U_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_5, V_5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, 30.0, 0.0), Point(65.0, 9.705, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(65.0, 9.705, 0.0), Point(63.098216, 14.203143, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(65.0, 9.705, 0.0), Point(66.901784, 14.203143, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(A_6, W_5), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(65.0, 7.802344, 0.0), Point(56.201149, 18.36605, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(56.201149, 18.36605, 0.0), Point(60.541251, 16.126946, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(56.201149, 18.36605, 0.0), Point(57.618692, 13.692652, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(56.201149, 18.36605, 0.0), Point(65.0, 30.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(65.0, 30.0, 0.0), Point(63.803474, 25.265192, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(65.0, 30.0, 0.0), Point(60.769829, 27.559563, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(-1.365117, -1.858829, 0.0), Point(0.0, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 0.0, 0.0), Point(-1.129712, -4.751192, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 0.0, 0.0), Point(-4.195375, -2.499782, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(38.265117, -1.858829, 0.0), Point(36.9, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(36.9, 0.0, 0.0), Point(41.095375, -2.499782, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(36.9, 0.0, 0.0), Point(38.029712, -4.751192, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(65.0, 8.4, 0.0), Point(65.0, 6.446767, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)  # vector
S.add(Line(Point(65.0, 6.446767, 0.0), Point(63.098216, 10.944911, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, 6.446767, 0.0), Point(66.901784, 10.944911, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, 6.446767, 0.0), Point(65.0, 4.639076, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)  # vector
S.add(Line(Point(65.0, 4.639076, 0.0), Point(63.098216, 9.137219, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, 4.639076, 0.0), Point(66.901784, 9.137219, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, 4.639076, 0.0), Point(65.0, 2.966117, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)  # vector
S.add(Line(Point(65.0, 2.966117, 0.0), Point(63.098216, 7.46426, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, 2.966117, 0.0), Point(66.901784, 7.46426, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, 2.966117, 0.0), Point(65.0, 1.414268, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)  # vector
S.add(Line(Point(65.0, 1.414268, 0.0), Point(63.098216, 5.912411, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, 1.414268, 0.0), Point(66.901784, 5.912411, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, 1.414268, 0.0), Point(65.0, -0.033502, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)  # vector
S.add(Line(Point(65.0, -0.033502, 0.0), Point(63.098216, 4.464641, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, -0.033502, 0.0), Point(66.901784, 4.464641, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, -0.033502, 0.0), Point(65.0, -1.398092, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)  # vector
S.add(Line(Point(65.0, -1.398092, 0.0), Point(63.098216, 3.100051, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, -1.398092, 0.0), Point(66.901784, 3.100051, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, -3.980452, 0.0), Point(65.0, -5.256559, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)  # vector
S.add(Line(Point(65.0, -5.256559, 0.0), Point(63.098216, -0.758416, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, -5.256559, 0.0), Point(66.901784, -0.758416, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, -6.562812, 0.0), Point(65.0, -7.927402, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)  # vector
S.add(Line(Point(65.0, -7.927402, 0.0), Point(63.098216, -3.429259, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, -7.927402, 0.0), Point(66.901784, -3.429259, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, -7.927402, 0.0), Point(65.0, -9.375173, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)  # vector
S.add(Line(Point(65.0, -9.375173, 0.0), Point(63.098216, -4.877029, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, -9.375173, 0.0), Point(66.901784, -4.877029, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, -9.375173, 0.0), Point(65.0, -10.927022, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)  # vector
S.add(Line(Point(65.0, -10.927022, 0.0), Point(63.098216, -6.428878, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, -10.927022, 0.0), Point(66.901784, -6.428878, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, -10.927022, 0.0), Point(65.0, -12.59998, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)  # vector
S.add(Line(Point(65.0, -12.59998, 0.0), Point(63.098216, -8.101837, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, -12.59998, 0.0), Point(66.901784, -8.101837, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, -12.59998, 0.0), Point(65.0, -14.407672, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)  # vector
S.add(Line(Point(65.0, -14.407672, 0.0), Point(63.098216, -9.909529, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, -14.407672, 0.0), Point(66.901784, -9.909529, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, -14.407672, 0.0), Point(65.0, -16.360905, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)  # vector
S.add(Line(Point(65.0, -16.360905, 0.0), Point(63.098216, -11.862761, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, -16.360905, 0.0), Point(66.901784, -11.862761, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.0)
S.add(Line(Point(65.0, 9.070781, 0.0), Point(65.0, 7.802344, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(65.0, 7.802344, 0.0), Point(63.098216, 12.300487, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(65.0, 7.802344, 0.0), Point(66.901784, 12.300487, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=3.0)
S.add(Line(Point(-1.442194, -1.799685, 0.0), Point(0.0, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 0.0, 0.0), Point(-1.328816, -4.699396, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 0.0, 0.0), Point(-4.296935, -2.320867, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(38.342194, -1.799685, 0.0), Point(36.9, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(36.9, 0.0, 0.0), Point(41.196935, -2.320867, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(36.9, 0.0, 0.0), Point(38.228816, -4.699396, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(65.0, 9.705, 0.0), Point(56.86821, 19.8525, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(56.86821, 19.8525, 0.0), Point(61.165145, 17.531633, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(56.86821, 19.8525, 0.0), Point(58.197025, 15.153104, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(56.86821, 19.8525, 0.0), Point(65.0, 30.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(65.0, 30.0, 0.0), Point(63.671184, 25.300604, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(65.0, 30.0, 0.0), Point(60.703065, 27.679133, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(-1.365117, -1.858829, 0.0), Point(0.0, 0.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 0.0, 0.0), Point(-1.129712, -4.751192, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 0.0, 0.0), Point(-4.195375, -2.499782, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(38.265117, -1.858829, 0.0), Point(36.9, 0.0, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(36.9, 0.0, 0.0), Point(41.095375, -2.499782, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(36.9, 0.0, 0.0), Point(38.029712, -4.751192, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(65.0, -16.360905, 0.0), Point(55.907845, -3.980452, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(55.907845, -3.980452, 0.0), Point(60.103219, -6.480234, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(55.907845, -3.980452, 0.0), Point(57.037557, -8.731645, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(55.907845, -3.980452, 0.0), Point(65.0, 8.4, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(65.0, 8.4, 0.0), Point(63.870288, 3.648808, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(65.0, 8.4, 0.0), Point(60.804625, 5.900218, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Polyline([frameBL, M_1, frameTR, T, frameBL]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)

if __name__ == "__main__":
    viewer.show()
