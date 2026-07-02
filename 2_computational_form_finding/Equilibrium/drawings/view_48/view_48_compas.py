"""
COMPAS translation of GeoGebra applet: Internal forces in a beam – superposition
Source: https://block.arch.ethz.ch/eq/drawing/view/48
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
I = Point(0.0, -6.938508, 0.0)  # I
FP0 = Point(0.0, -4.144544, 0.0)  # FP0
LL0 = Point(18.558929, 1.298537, 0.0)  # LL0
A = Point(0.0, 0.0, 0.0)  # A
B = Point(10.0, 0.0, 0.0)  # B
pole = Point(14.558929, -2.732264, 0.0)  # pole
LL10 = Point(18.558929, -6.701463, 0.0)  # LL10
LL9 = Point(18.558929, -5.36813, 0.0)  # LL9
LL8 = Point(18.558929, -4.701463, 0.0)  # LL8
LL7 = Point(18.558929, -4.034796, 0.0)  # LL7
LL6 = Point(18.558929, -3.36813, 0.0)  # LL6
LL5 = Point(18.558929, -2.701463, 0.0)  # LL5
LL4 = Point(18.558929, -2.034796, 0.0)  # LL4
LL3 = Point(18.558929, -1.36813, 0.0)  # LL3
LL2 = Point(18.558929, -0.701463, 0.0)  # LL2
LL1 = Point(18.558929, -0.034796, 0.0)  # LL1
C = Point(10.0, -4.067541, 0.0)  # C
D = Point(18.558929, -2.701463, 0.0)  # D
FP1 = Point(0.5, -3.640694, 0.0)  # FP1
FP2 = Point(1.5, -2.966327, 0.0)  # FP2
FP3 = Point(2.5, -2.458627, 0.0)  # FP3
FP4 = Point(3.5, -2.117593, 0.0)  # FP4
FP5 = Point(4.5, -1.943226, 0.0)  # FP5
FP6 = Point(5.5, -1.935526, 0.0)  # FP6
FP7 = Point(6.5, -2.094492, 0.0)  # FP7
FP8 = Point(7.5, -2.420125, 0.0)  # FP8
FP9 = Point(8.5, -2.912425, 0.0)  # FP9
FP10 = Point(9.5, -3.571392, 0.0)  # FP10
L = Point(10.0, -6.938508, 0.0)  # L
pole2 = Point(22.558929, -2.701463, 0.0)  # pole2
O = Point(18.558929, -7.395612, 0.0)  # O
P = Point(14.558929, -7.395612, 0.0)  # P
Q = Point(22.558929, -7.395612, 0.0)  # Q
K = Point(0.0, -10.0, 0.0)  # K
R = Point(10.0, -10.0, 0.0)  # R
GP1 = Point(0.5, -10.0, 0.0)  # GP1
MP1 = Point(0.5, -10.6, 0.0)  # MP1
FG1 = Point(0.5, -4.140694, 0.0)  # FG1
GP2 = Point(1.5, -10.0, 0.0)  # GP2
MP2 = Point(1.5, -11.4, 0.0)  # MP2
FG2 = Point(1.5, -4.132994, 0.0)  # FG2
GP3 = Point(2.5, -10.0, 0.0)  # GP3
MP3 = Point(2.5, -12.0, 0.0)  # MP3
FG3 = Point(2.5, -4.125294, 0.0)  # FG3
GP4 = Point(3.5, -10.0, 0.0)  # GP4
MP4 = Point(3.5, -12.4, 0.0)  # MP4
FG4 = Point(3.5, -4.117593, 0.0)  # FG4
GP5 = Point(4.5, -10.0, 0.0)  # GP5
MP5 = Point(4.5, -12.6, 0.0)  # MP5
FG5 = Point(4.5, -4.109893, 0.0)  # FG5
GP6 = Point(5.5, -10.0, 0.0)  # GP6
MP6 = Point(5.5, -12.6, 0.0)  # MP6
FG6 = Point(5.5, -4.102193, 0.0)  # FG6
GP7 = Point(6.5, -10.0, 0.0)  # GP7
MP7 = Point(6.5, -12.4, 0.0)  # MP7
FG7 = Point(6.5, -4.094492, 0.0)  # FG7
GP8 = Point(7.5, -10.0, 0.0)  # GP8
MP8 = Point(7.5, -12.0, 0.0)  # MP8
FG8 = Point(7.5, -4.086792, 0.0)  # FG8
GP9 = Point(8.5, -10.0, 0.0)  # GP9
MP9 = Point(8.5, -11.4, 0.0)  # MP9
FG9 = Point(8.5, -4.079092, 0.0)  # FG9
GP10 = Point(9.5, -10.0, 0.0)  # GP10
MP10 = Point(9.5, -10.6, 0.0)  # MP10
FG10 = Point(9.5, -4.071392, 0.0)  # FG10
FPB0 = Point(0.0, -10.0, 0.0)  # FPB0
U = Point(10.0, -10.0, 0.0)  # U
FPB1 = Point(0.5, -10.5, 0.0)  # FPB1
FPB2 = Point(1.5, -11.166667, 0.0)  # FPB2
FPB3 = Point(2.5, -11.666667, 0.0)  # FPB3
FPB4 = Point(3.5, -12.0, 0.0)  # FPB4
FPB5 = Point(4.5, -12.166667, 0.0)  # FPB5
FPB6 = Point(5.5, -12.166667, 0.0)  # FPB6
FPB7 = Point(6.5, -12.0, 0.0)  # FPB7
FPB8 = Point(7.5, -11.666667, 0.0)  # FPB8
FPB9 = Point(8.5, -11.166667, 0.0)  # FPB9
FPB10 = Point(9.5, -10.5, 0.0)  # FPB10
L1 = Point(0.0, 2.499441, 0.0)  # L1
L2 = Point(10.0, 2.499441, 0.0)  # L2
W = Point(10.0, 1.955513, 0.0)  # W
V = Point(0.0, 1.955513, 0.0)  # V
S1 = Point(0.0, 1.300325, 0.0)  # S1
S2 = Point(0.0, -13.555014, 0.0)  # S2
Z = Point(10.0, -13.555014, 0.0)  # Z
T = Point(10.0, 1.300325, 0.0)  # T
A_1 = Point(0.0, -1.454631, 0.0)  # A_1
B_1 = Point(10.0, -1.454631, 0.0)  # B_1
VP1 = Point(0.0, -5.738508, 0.0)  # VP1
VP2 = Point(0.5, -5.838508, 0.0)  # VP2
VP3 = Point(0.5, -6.038508, 0.0)  # VP3
VP4 = Point(9.5, -7.838508, 0.0)  # VP4
VP5 = Point(9.5, -8.038508, 0.0)  # VP5
S_2 = Point(10.0, -8.138508, 0.0)  # S
J = Point(0.5, 1.300325, 0.0)  # J
D_1 = Point(0.5, -13.555014, 0.0)  # D_1
E_1 = Point(9.5, -13.555014, 0.0)  # E_1
C_1 = Point(9.5, 1.300325, 0.0)  # C_1
frameBL = Point(-10.009928, -14.796616, 0.0)  # frameBL
fBR = Point(29.064946, -14.796616, 0.0)  # fBR
fTL = Point(-10.009928, 4.740822, 0.0)  # fTL
frameTR = Point(29.064946, 4.740822, 0.0)  # frameTR
R_1 = Point(5.0, 1.300325, 0.0)  # R_1
S_1 = Point(5.0, -13.555014, 0.0)  # S_1
J_1 = Point(19.058929, 1.298537, 0.0)  # J_1
K_1 = Point(19.058929, -2.701463, 0.0)  # K_1
L_1 = Point(19.058929, -6.701463, 0.0)  # L_1

# --- geometry ---
S.add(I, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(FP0, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(LL0, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(A, B), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
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
S.add(Line(FP0, C), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(D, pointcolor=Color(1.0, 0.0, 0.0), pointsize=3.0)
S.add(Polyline([FP0, FP1, FP2, FP3, FP4, FP5, FP6, FP7, FP8, FP9, FP10, C]), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(0.5, 3.499441, 0.0), Point(0.5, 2.499441, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.5, 2.499441, 0.0), Point(-0.530113, 4.935887, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.5, 2.499441, 0.0), Point(1.530113, 4.935887, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(I, L), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(pole2, pointcolor=Color(0.2667, 0.2667, 0.2667), pointsize=3.0)
S.add(O, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(P, pointcolor=Color(1.0, 0.0, 0.0), pointsize=3.0)
S.add(Q, pointcolor=Color(1.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(LL10, O), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Q, O), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(O, P), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(pole2, D), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(pole, D), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(K, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(K, R), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(pole, P), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(pole2, Q), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP1, MP1), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(FG1, FP1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(GP2, MP2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(FG2, FP2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(GP3, MP3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(FG3, FP3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(GP4, MP4), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(FG4, FP4), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(GP5, MP5), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(FG5, FP5), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(GP6, MP6), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(FG6, FP6), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(GP7, MP7), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(FG7, FP7), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(GP8, MP8), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(FG8, FP8), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(GP9, MP9), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(FG9, FP9), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(GP10, MP10), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(FG10, FP10), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Polyline([K, MP1, MP2, MP3, MP4, MP5, MP6, MP7, MP8, MP9, MP10, R]), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(LL0, pole2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(LL1, pole2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(LL2, pole2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(LL3, pole2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(LL4, pole2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(LL5, pole2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(LL6, pole2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(LL7, pole2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(LL8, pole2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(LL9, pole2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(FPB0, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(LL10, pole2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(FPB0, U), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([FPB0, FPB1, FPB2, FPB3, FPB4, FPB5, FPB6, FPB7, FPB8, FPB9, FPB10, U]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([L1, L2, W, V]), linecolor=Color(0.0, 0.6, 0.0), facecolor=Color(0.0, 0.6, 0.0), linewidth=1.2, opacity=0.15)
S.add(Line(Point(0.5, 1.300325, 0.0), Point(0.5, -13.555014, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(1.5, 1.300325, 0.0), Point(1.5, -13.555014, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(2.5, 1.300325, 0.0), Point(2.5, -13.555014, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(3.5, 1.300325, 0.0), Point(3.5, -13.555014, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(4.5, 1.300325, 0.0), Point(4.5, -13.555014, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(5.5, 1.300325, 0.0), Point(5.5, -13.555014, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(6.5, 1.300325, 0.0), Point(6.5, -13.555014, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(7.5, 1.300325, 0.0), Point(7.5, -13.555014, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(8.5, 1.300325, 0.0), Point(8.5, -13.555014, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(9.5, 1.300325, 0.0), Point(9.5, -13.555014, 0.0)), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(S1, S2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z, T), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(A_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(B_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=4.5)
S.add(Line(A_1, B_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Polyline([I, VP1, VP2, VP3, VP4, VP5, S_2, L]), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(J, D_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(E_1, C_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(0.0, -1.0, 0.0), Point(0.0, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 0.0, 0.0), Point(1.030113, -2.436446, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 0.0, 0.0), Point(-1.030113, -2.436446, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.0, -1.0, 0.0), Point(10.0, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.0, 0.0, 0.0), Point(11.030113, -2.436446, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.0, 0.0, 0.0), Point(8.969887, -2.436446, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(frameBL, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(fBR, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Polyline([frameBL, fTL, frameTR, fBR, frameBL]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(19.058929, -6.701463, 0.0), Point(19.058929, -2.701463, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.058929, -2.701463, 0.0), Point(20.089042, -5.13791, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.058929, -2.701463, 0.0), Point(18.028816, -5.13791, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.058929, -2.701463, 0.0), Point(19.058929, 1.298537, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.058929, 1.298537, 0.0), Point(20.089042, -1.13791, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.058929, 1.298537, 0.0), Point(18.028816, -1.13791, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 1.300325, 0.0), Point(5.0, 0.300325, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.0, 0.300325, 0.0), Point(3.969887, 2.736771, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.0, 0.300325, 0.0), Point(6.030113, 2.736771, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(R_1, S_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(LL0, J_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(D, K_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(LL10, L_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.0)
S.add(Line(Point(18.558929, 1.298537, 0.0), Point(18.558929, -6.701463, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(18.558929, -6.701463, 0.0), Point(17.528816, -4.265017, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.558929, -6.701463, 0.0), Point(19.589042, -4.265017, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)

if __name__ == "__main__":
    viewer.show()
