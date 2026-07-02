"""
COMPAS translation of GeoGebra applet: Internal forces in a beam – point load
Source: https://block.arch.ethz.ch/eq/drawing/view/46
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
D = Point(0.0, -2.071844, 0.0)  # D
L1 = Point(0.0, -13.188511, 0.0)  # L1
A = Point(0.0, 0.0, 0.0)  # A
B = Point(9.905492, 0.0, 0.0)  # B
C = Point(4.867604, 0.0, 0.0)  # C
G = Point(18.980713, -4.608843, 0.0)  # G
I = Point(24.812455, -6.8175, 0.0)  # I
H_1 = Point(18.980713, -8.608843, 0.0)  # H_1
J = Point(4.867604, -3.915353, 0.0)  # J
K = Point(9.905492, -2.367858, 0.0)  # K
M = Point(15.980713, -8.608843, 0.0)  # M
N = Point(18.980713, -6.643225, 0.0)  # N
O = Point(15.980713, -6.643225, 0.0)  # O
P = Point(0.0, -6.643225, 0.0)  # P
Q = Point(9.905492, -6.643225, 0.0)  # Q
R = Point(0.0, -4.608843, 0.0)  # R
T = Point(4.867604, -4.608843, 0.0)  # T
U = Point(4.867604, -8.608843, 0.0)  # U
S_2 = Point(9.905492, -8.608843, 0.0)  # S
L2 = Point(9.905492, -13.188511, 0.0)  # L2
FPM = Point(4.867604, -9.887656, 0.0)  # FPM
GP1 = Point(0.495275, -13.188511, 0.0)  # GP1
MP1 = Point(0.495275, -13.6923, 0.0)  # MP1
FP1 = Point(0.495275, -12.852652, 0.0)  # FP1
GP2 = Point(1.485824, -13.188511, 0.0)  # GP2
MP2 = Point(1.485824, -14.699878, 0.0)  # MP2
FP2 = Point(1.485824, -12.180934, 0.0)  # FP2
GP3 = Point(2.476373, -13.188511, 0.0)  # GP3
MP3 = Point(2.476373, -15.707455, 0.0)  # MP3
FP3 = Point(2.476373, -11.509215, 0.0)  # FP3
GP4 = Point(3.466922, -13.188511, 0.0)  # GP4
MP4 = Point(3.466922, -16.715033, 0.0)  # MP4
FP4 = Point(3.466922, -10.837497, 0.0)  # FP4
GP5 = Point(4.457471, -13.188511, 0.0)  # GP5
MP5 = Point(4.457471, -17.72261, 0.0)  # MP5
FP5 = Point(4.457471, -10.165779, 0.0)  # FP5
GP6 = Point(5.448021, -13.188511, 0.0)  # GP6
MP6 = Point(5.448021, -17.569355, 0.0)  # MP6
FP6 = Point(5.448021, -10.267949, 0.0)  # FP6
GP7 = Point(6.43857, -13.188511, 0.0)  # GP7
MP7 = Point(6.43857, -16.595834, 0.0)  # MP7
FP7 = Point(6.43857, -10.916963, 0.0)  # FP7
GP8 = Point(7.429119, -13.188511, 0.0)  # GP8
MP8 = Point(7.429119, -15.622313, 0.0)  # MP8
FP8 = Point(7.429119, -11.565977, 0.0)  # FP8
GP9 = Point(8.419668, -13.188511, 0.0)  # GP9
MP9 = Point(8.419668, -14.648793, 0.0)  # MP9
FP9 = Point(8.419668, -12.21499, 0.0)  # FP9
GP10 = Point(9.410217, -13.188511, 0.0)  # GP10
MP10 = Point(9.410217, -13.675272, 0.0)  # MP10
FP10 = Point(9.410217, -12.864004, 0.0)  # FP10
MPM = Point(4.867604, -18.139794, 0.0)  # MPM
E = Point(0.0, 1.968741, 0.0)  # E
V = Point(0.0, -18.588996, 0.0)  # V
B_1 = Point(4.867604, -18.588996, 0.0)  # B_1
W = Point(4.867604, 1.968741, 0.0)  # W
Z = Point(9.905492, 1.968741, 0.0)  # Z
A_1 = Point(9.905492, -18.588996, 0.0)  # A_1
frameBL = Point(-15.182858, -20.00048, 0.0)  # frameBL
fBR = Point(32.631898, -20.00048, 0.0)  # fBR
fTL = Point(-15.182858, 3.906898, 0.0)  # fTL
frameTR = Point(32.631898, 3.906898, 0.0)  # frameTR
F_1 = Point(19.480713, -4.608843, 0.0)  # F_1
C_1 = Point(19.480713, -8.608843, 0.0)  # C_1
D_1 = Point(19.480713, -6.643225, 0.0)  # D_1

# --- geometry ---
S.add(D, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(L1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(A, B), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(C, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(4.867604, 1.3, 0.0), Point(4.867604, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.867604, 0.0, 0.0), Point(4.003639, 2.04347, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.867604, 0.0, 0.0), Point(5.731569, 2.04347, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, -1.3, 0.0), Point(0.0, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(0.0, 0.0, 0.0), Point(0.863965, -2.04347, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(0.0, 0.0, 0.0), Point(-0.863965, -2.04347, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.905492, -1.3, 0.0), Point(9.905492, 0.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(9.905492, 0.0, 0.0), Point(10.769457, -2.04347, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(9.905492, 0.0, 0.0), Point(9.041527, -2.04347, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(G, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(I, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(G, I), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(I, H_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(D, J), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(J, K), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(K, D), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(M, pointcolor=Color(1.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(I, N), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(N, O), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(G, O), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O, H_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P, Q), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(P, R), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(R, T), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(T, U), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(U, S_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(S_2, Q), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(T, G), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_1, M), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(M, O), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(H_1, S_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O, Q), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(L1, L2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.8)
S.add(Polyline([L1, FPM, L2]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP1, MP1), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP1, FP1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP2, MP2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP2, FP2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP3, MP3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP3, FP3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP4, MP4), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP4, FP4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP5, MP5), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP5, FP5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP6, MP6), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP6, FP6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP7, MP7), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP7, FP7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP8, MP8), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP8, FP8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP9, MP9), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP9, FP9), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP10, MP10), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(GP10, FP10), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(MP1, MP2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP2, MPM), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP2, MP3), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP3, MPM), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP3, MP4), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP4, MPM), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP4, MP5), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP5, MPM), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP5, MPM), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP6, MPM), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP6, MP7), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP7, MPM), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP7, MP8), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP8, MPM), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP8, MP9), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP9, MPM), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP9, MP10), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP10, MPM), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MPM, MP1), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(L1, MP1), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP10, MPM), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(MP10, L2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.8)
S.add(Line(E, V), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_1, W), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z, A_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(frameBL, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(fBR, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Polyline([fTL, frameTR, fBR, frameBL, fTL]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(19.480713, -8.608843, 0.0), Point(19.480713, -6.643225, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.480713, -6.643225, 0.0), Point(20.344678, -8.686695, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.480713, -6.643225, 0.0), Point(18.616748, -8.686695, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.480713, -6.643225, 0.0), Point(19.480713, -4.608843, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(19.480713, -4.608843, 0.0), Point(20.344678, -6.652313, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(19.480713, -4.608843, 0.0), Point(18.616748, -6.652313, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(G, F_1), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(H_1, C_1), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(N, D_1), linecolor=Color(0.0, 0.6, 0.0), linewidth=1.2)
S.add(Line(Point(18.980713, -4.608843, 0.0), Point(18.980713, -8.608843, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(18.980713, -8.608843, 0.0), Point(18.116748, -6.565373, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(18.980713, -8.608843, 0.0), Point(19.844678, -6.565373, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)

if __name__ == "__main__":
    viewer.show()
