"""
COMPAS translation of GeoGebra applet: Internal forces in a beam – line load
Source: https://block.arch.ethz.ch/eq/drawing/view/47
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
LL0 = Point(24.197919, -0.316368, 0.0)  # LL0
N = Point(24.197919, -11.930878, 0.0)  # N
D_1 = Point(20.197919, -11.930878, 0.0)  # D_1
P = Point(0.0, -15.37783, 0.0)  # P
FP0 = Point(0.0, -5.604657, 0.0)  # FP0
A = Point(0.0, -0.942226, 0.0)  # A
B = Point(10.0, -0.942226, 0.0)  # B
H_1 = Point(7.126816, -0.942226, 0.0)  # H_1
E = Point(2.834459, -0.942226, 0.0)  # E
Q = Point(10.0, -15.37783, 0.0)  # Q
pole = Point(20.197919, -5.113127, 0.0)  # pole
LL10 = Point(24.197919, -10.316368, 0.0)  # LL10
LL9 = Point(24.197919, -9.316368, 0.0)  # LL9
LL8 = Point(24.197919, -8.316368, 0.0)  # LL8
LL7 = Point(24.197919, -7.316368, 0.0)  # LL7
LL6 = Point(24.197919, -6.316368, 0.0)  # LL6
LL5 = Point(24.197919, -5.316368, 0.0)  # LL5
LL4 = Point(24.197919, -4.316368, 0.0)  # LL4
LL3 = Point(24.197919, -3.316368, 0.0)  # LL3
LL2 = Point(24.197919, -2.316368, 0.0)  # LL2
LL1 = Point(24.197919, -1.316368, 0.0)  # LL1
C = Point(10.0, -6.112761, 0.0)  # C
FP1 = Point(0.5, -5.005062, 0.0)  # FP1
FP2 = Point(1.5, -4.055873, 0.0)  # FP2
FP3 = Point(2.5, -3.356683, 0.0)  # FP3
FP4 = Point(3.5, -2.907493, 0.0)  # FP4
FP5 = Point(4.5, -2.708304, 0.0)  # FP5
FP6 = Point(5.5, -2.759114, 0.0)  # FP6
FP7 = Point(6.5, -3.059924, 0.0)  # FP7
FP8 = Point(7.5, -3.610735, 0.0)  # FP8
FP9 = Point(8.5, -4.411545, 0.0)  # FP9
FP10 = Point(9.5, -5.462355, 0.0)  # FP10
FG11 = Point(2.834459, -2.205603, 0.0)  # FG11
FG12 = Point(7.126816, -2.375293, 0.0)  # FG12
K = Point(24.197919, -5.271259, 0.0)  # K
L = Point(0.0, -9.863608, 0.0)  # L
M = Point(10.0, -9.863608, 0.0)  # M
VP1 = Point(2.834459, -10.713946, 0.0)  # VP1
VP2 = Point(2.834459, -9.227479, 0.0)  # VP2
VP3 = Point(7.126816, -10.515186, 0.0)  # VP3
VP4 = Point(7.126816, -9.001653, 0.0)  # VP4
O = Point(20.197919, -11.930878, 0.0)  # O
I = Point(10.0, 2.170784, 0.0)  # I
J = Point(10.0, -17.669978, 0.0)  # J
T = Point(2.834459, 2.170784, 0.0)  # T
U = Point(2.834459, -17.669978, 0.0)  # U
V = Point(7.126816, 2.170784, 0.0)  # V
W = Point(7.126816, -17.669978, 0.0)  # W
GP1 = Point(0.5, -15.37783, 0.0)  # GP1
MP1 = Point(0.5, -15.37783, 0.0)  # MP1
GP2 = Point(1.5, -15.37783, 0.0)  # GP2
MP2 = Point(1.5, -15.07783, 0.0)  # MP2
GP3 = Point(2.5, -15.37783, 0.0)  # GP3
MP3 = Point(2.5, -14.47783, 0.0)  # MP3
GP4 = Point(3.5, -15.37783, 0.0)  # GP4
MP4 = Point(3.5, -14.567135, 0.0)  # MP4
GP5 = Point(4.5, -15.37783, 0.0)  # GP5
MP5 = Point(4.5, -14.853602, 0.0)  # MP5
GP6 = Point(5.5, -15.37783, 0.0)  # GP6
MP6 = Point(5.5, -14.840069, 0.0)  # MP6
GP7 = Point(6.5, -15.37783, 0.0)  # GP7
MP7 = Point(6.5, -14.526537, 0.0)  # MP7
GP8 = Point(7.5, -15.37783, 0.0)  # GP8
MP8 = Point(7.5, -14.47783, 0.0)  # MP8
GP9 = Point(8.5, -15.37783, 0.0)  # GP9
MP9 = Point(8.5, -15.07783, 0.0)  # MP9
GP10 = Point(9.5, -15.37783, 0.0)  # GP10
MP10 = Point(9.5, -15.37783, 0.0)  # MP10
GP11 = Point(2.834459, -15.37783, 0.0)  # GP11
MP11 = Point(2.834459, -14.176817, 0.0)  # MP11
GP12 = Point(7.126816, -15.37783, 0.0)  # GP12
MP12 = Point(7.126816, -14.141964, 0.0)  # MP12
R = Point(0.0, 2.170784, 0.0)  # R
S_2 = Point(0.0, -17.669978, 0.0)  # S
FG1 = Point(0.5, -5.005062, 0.0)  # FG1
FG2 = Point(1.5, -3.805873, 0.0)  # FG2
FG3 = Point(2.5, -2.606683, 0.0)  # FG3
FG4 = Point(3.5, -2.231914, 0.0)  # FG4
FG5 = Point(4.5, -2.271447, 0.0)  # FG5
FG6 = Point(5.5, -2.31098, 0.0)  # FG6
FG7 = Point(6.5, -2.350513, 0.0)  # FG7
FG8 = Point(7.5, -2.860735, 0.0)  # FG8
FG9 = Point(8.5, -4.161545, 0.0)  # FG9
FG10 = Point(9.5, -5.462355, 0.0)  # FG10
FP11 = Point(2.834459, -3.206447, 0.0)  # FP11
FP12 = Point(7.126816, -3.405181, 0.0)  # FP12
L1 = Point(0.0, 3.639655, 0.0)  # L1
A_1 = Point(0.0, 3.114655, 0.0)  # A_1
B_1 = Point(10.0, 3.114655, 0.0)  # B_1
C_1 = Point(10.0, 3.639655, 0.0)  # C_1
F_1 = Point(10.0, 4.770819, 0.0)  # F_1
Z = Point(0.0, 4.770819, 0.0)  # Z
frameBL = Point(-16.715185, -20.7515, 0.0)  # frameBL
fBR = Point(42.875349, -20.7515, 0.0)  # fBR
fTL = Point(-16.715185, 9.043766, 0.0)  # fTL
frameTR = Point(42.875349, 9.043766, 0.0)  # frameTR
G_1 = Point(0.0, 4.770819, 0.0)  # G_1
LL0_p = Point(25.397919, -0.316368, 0.0)  # LL0'
LL10_p = Point(25.397919, -10.316368, 0.0)  # LL10'
K_1 = Point(5.0, 2.170784, 0.0)  # K_1
L_1 = Point(5.0, -17.669978, 0.0)  # L_1

# --- geometry ---
S.add(LL0, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(N, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(D_1, pointcolor=Color(1.0, 0.0, 0.0), pointsize=3.0)
S.add(P, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(FP0, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(A, B), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(H_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(E, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(P, Q), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(pole, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(LL10, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(LL9, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(LL8, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(LL7, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(LL6, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(LL5, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(LL4, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(LL3, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(LL2, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(LL1, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(LL0, pole), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(C, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Polyline([FP0, FP1, FP2, FP3, FP4, FP5, FP6, FP7, FP8, FP9, FP10, C]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(FP0, FG11), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(FG11, FG12), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(FG12, C), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(pole, K), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(L, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(L, M), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(VP1, VP2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(VP3, VP4), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([L, VP1, VP2, VP3, VP4, M]), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(O, N), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(N, LL0), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(0.5, 2.170784, 0.0), Point(0.5, -17.669978, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(1.5, 2.170784, 0.0), Point(1.5, -17.669978, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(2.5, 2.170784, 0.0), Point(2.5, -17.669978, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(3.5, 2.170784, 0.0), Point(3.5, -17.669978, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(4.5, 2.170784, 0.0), Point(4.5, -17.669978, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(5.5, 2.170784, 0.0), Point(5.5, -17.669978, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(6.5, 2.170784, 0.0), Point(6.5, -17.669978, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(7.5, 2.170784, 0.0), Point(7.5, -17.669978, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(8.5, 2.170784, 0.0), Point(8.5, -17.669978, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(9.5, 2.170784, 0.0), Point(9.5, -17.669978, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(I, J), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T, U), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V, W), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP1, MP1), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP2, MP2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP3, MP3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP4, MP4), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP5, MP5), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP6, MP6), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP7, MP7), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP8, MP8), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP9, MP9), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP10, MP10), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP11, MP11), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP12, MP12), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(MP1, MP2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP2, MP11), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP2, MP3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP3, MP11), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP3, MP11), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP4, MP11), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP4, MP5), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP5, MP11), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP5, MP6), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP6, MP11), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP6, MP7), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP7, MP12), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP7, MP12), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP8, MP12), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP8, MP9), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP9, MP12), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP9, MP10), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP10, MP12), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP11, MP1), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(P, MP1), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP10, MP12), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP10, Q), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(R, S_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(FG1, FP1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(FG2, FP2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(FG3, FP3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(FG4, FP4), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(FG5, FP5), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(FG6, FP6), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(FG7, FP7), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(FG8, FP8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(FG9, FP9), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(FG10, FP10), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(FG11, FP11), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(FG12, FP12), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(2.834459, -2.342226, 0.0), Point(2.834459, -0.942226, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(2.834459, -0.942226, 0.0), Point(4.079568, -3.887186, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(2.834459, -0.942226, 0.0), Point(1.58935, -3.887186, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.126816, -2.342226, 0.0), Point(7.126816, -0.942226, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.126816, -0.942226, 0.0), Point(8.371925, -3.887186, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.126816, -0.942226, 0.0), Point(5.881707, -3.887186, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Polygon([L1, A_1, B_1, C_1]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.2, opacity=0.15)
S.add(Line(pole, O), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(F_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(Line(Z, F_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(frameBL, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(fBR, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Polyline([frameBL, fTL, frameTR, fBR, frameBL]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(G_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(Line(Point(25.397919, -10.316368, 0.0), Point(25.397919, -5.271259, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(25.397919, -5.271259, 0.0), Point(26.643028, -8.216219, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(25.397919, -5.271259, 0.0), Point(24.15281, -8.216219, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(25.397919, -5.271259, 0.0), Point(25.397919, -0.316368, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(25.397919, -0.316368, 0.0), Point(26.643028, -3.261328, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(25.397919, -0.316368, 0.0), Point(24.15281, -3.261328, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(24.197919, -0.316368, 0.0), Point(24.197919, -10.316368, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)  # vector
S.add(Line(Point(24.197919, -10.316368, 0.0), Point(22.95281, -7.371409, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(Point(24.197919, -10.316368, 0.0), Point(25.443028, -7.371409, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=4.2)
S.add(Line(LL0, LL0_p), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(LL10, LL10_p), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(K_1, L_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(5.0, 2.170784, 0.0), Point(5.0, 0.770784, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.0, 0.770784, 0.0), Point(3.754891, 3.715743, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 0.770784, 0.0), Point(6.245109, 3.715743, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)

if __name__ == "__main__":
    viewer.show()
