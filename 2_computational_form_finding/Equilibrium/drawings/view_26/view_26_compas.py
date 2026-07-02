"""
COMPAS translation of GeoGebra applet: Constant force gable truss
Source: https://block.arch.ethz.ch/eq/drawing/view/26
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
P4aA = Point(21.0, 29.7, 0.0)  # P4aA
P4s03 = Point(17.5, 29.7, 0.0)  # P4s03
P2s01 = Point(2.945289, 29.22088, 0.0)  # P2s01
P2s04 = Point(2.945289, 32.066948, 0.0)  # P2s04
P2s02 = Point(2.945289, 30.404754, 0.0)  # P2s02
M_1 = Point(0.0, 23.3547, 0.0)  # M_1
L_1 = Point(0.0, 28.717244, 0.0)  # L_1
P_1 = Point(14.610801, 28.717244, 0.0)  # P_1
Q_1 = Point(14.610801, 23.3547, 0.0)  # Q_1
P2aIJK8 = Point(14.610801, 26.0, 0.0)  # P2aIJK8
N_1 = Point(5.557215, 28.717244, 0.0)  # N_1
O_1 = Point(5.557215, 23.3547, 0.0)  # O_1
P2aAB1K = Point(5.557215, 26.0, 0.0)  # P2aAB1K
G = Point(10.084008, 30.313566, 0.0)  # G
P = Point(10.084008, 22.771694, 0.0)  # P
R_1 = Point(10.084008, 28.717244, 0.0)  # R_1
S_1 = Point(10.084008, 23.3547, 0.0)  # S_1
P2aEF54 = Point(10.084008, 28.0, 0.0)  # P2aEF54
P2aFG65 = Point(11.215706, 27.5, 0.0)  # P2aFG65
O_2 = Point(17.1, 28.286665, 0.0)  # O_2
P2aDE43 = Point(8.95231, 27.5, 0.0)  # P2aDE43
Q_2 = Point(17.1, 25.785904, 0.0)  # Q_2
P2s03 = Point(2.945289, 29.776483, 0.0)  # P2s03
P2s05 = Point(2.945289, 30.372879, 0.0)  # P2s05
P2aBC21 = Point(6.688913, 26.5, 0.0)  # P2aBC21
P5aA = Point(28.503722, 24.879509, 0.0)  # P5aA
P5aB = Point(28.503722, 24.287572, 0.0)  # P5aB
P5aC = Point(28.503722, 23.695636, 0.0)  # P5aC
P5aD = Point(28.503722, 23.103699, 0.0)  # P5aD
P5aE = Point(28.503722, 22.511762, 0.0)  # P5aE
P5aF = Point(28.503722, 21.919825, 0.0)  # P5aF
P5aG = Point(28.503722, 21.327889, 0.0)  # P5aG
P5aH = Point(28.503722, 20.735952, 0.0)  # P5aH
P5aI = Point(28.503722, 20.144015, 0.0)  # P5aI
P5aJ = Point(28.503722, 19.552078, 0.0)  # P5aJ
P2bBC = Point(6.688913, 30.404754, 0.0)  # P2bBC
P2dBC = Point(6.688913, 29.22088, 0.0)  # P2dBC
P2bCD = Point(7.820612, 30.404754, 0.0)  # P2bCD
P2dCD = Point(7.820612, 29.22088, 0.0)  # P2dCD
P2bDE = Point(8.95231, 30.404754, 0.0)  # P2bDE
P2dDE = Point(8.95231, 29.22088, 0.0)  # P2dDE
P2bEF = Point(10.084008, 30.404754, 0.0)  # P2bEF
P2dEF = Point(10.084008, 29.22088, 0.0)  # P2dEF
P2bFG = Point(11.215706, 30.404754, 0.0)  # P2bFG
P2dFG = Point(11.215706, 29.22088, 0.0)  # P2dFG
P2bGH = Point(12.347404, 30.404754, 0.0)  # P2bGH
P2dGH = Point(12.347404, 29.22088, 0.0)  # P2dGH
P5a0 = Point(25.785197, 22.120019, 0.0)  # P5a0
P3aAB01 = Point(5.557215, 22.288184, 0.0)  # P3aAB01
P3aBC0 = Point(6.688913, 23.190518, 0.0)  # P3aBC0
P3aCD0 = Point(7.820612, 23.846434, 0.0)  # P3aCD0
P3aDE0 = Point(8.95231, 24.255931, 0.0)  # P3aDE0
P3aEF0 = Point(10.084008, 24.419011, 0.0)  # P3aEF0
P3aFG0 = Point(11.215706, 24.335672, 0.0)  # P3aFG0
P3aGH0 = Point(12.347404, 24.005915, 0.0)  # P3aGH0
P2bHI = Point(13.479103, 30.404754, 0.0)  # P2bHI
P2dHI = Point(13.479103, 29.22088, 0.0)  # P2dHI
P2bIJ = Point(14.610801, 30.404754, 0.0)  # P2bIJ
P2dIJ = Point(14.610801, 29.22088, 0.0)  # P2dIJ
P3aHI0 = Point(13.479103, 23.42974, 0.0)  # P3aHI0
P3aIJK0 = Point(14.610801, 22.607147, 0.0)  # P3aIJK0
P5aK = Point(28.503722, 22.215794, 0.0)  # P5aK
P2aCD32 = Point(7.820612, 27.0, 0.0)  # P2aCD32
P2aGH76 = Point(12.347404, 27.0, 0.0)  # P2aGH76
P2aHI87 = Point(13.479103, 26.5, 0.0)  # P2aHI87
P4aK = Point(21.0, 27.036285, 0.0)  # P4aK
P4a1 = Point(17.5, 27.561715, 0.0)  # P4a1
P4aB = Point(21.0, 29.108063, 0.0)  # P4aB
P4aC = Point(21.0, 28.516126, 0.0)  # P4aC
P4a2 = Point(17.5, 26.969778, 0.0)  # P4a2
P4a3 = Point(17.5, 26.377841, 0.0)  # P4a3
P4aD = Point(21.0, 27.92419, 0.0)  # P4aD
P4aE = Point(21.0, 27.332253, 0.0)  # P4aE
P4a4 = Point(17.5, 25.785904, 0.0)  # P4a4
P4a5 = Point(17.5, 28.286665, 0.0)  # P4a5
P4aF = Point(21.0, 26.740316, 0.0)  # P4aF
P4aG = Point(21.0, 26.148379, 0.0)  # P4aG
P4a6 = Point(17.5, 27.694728, 0.0)  # P4a6
P4a7 = Point(17.5, 27.102791, 0.0)  # P4a7
P4aH = Point(21.0, 25.556443, 0.0)  # P4aH
P4aI = Point(21.0, 24.964506, 0.0)  # P4aI
P4a8 = Point(17.5, 26.510855, 0.0)  # P4a8
P2a12K = Point(6.688913, 25.830106, 0.0)  # P2a12K
P2a23K = Point(7.820612, 25.851611, 0.0)  # P2a23K
P2a34K = Point(8.95231, 26.064513, 0.0)  # P2a34K
P2a45K = Point(10.084008, 26.468814, 0.0)  # P2a45K
P2a56K = Point(11.215706, 26.064513, 0.0)  # P2a56K
P2a67K = Point(12.347404, 25.851611, 0.0)  # P2a67K
P2a78K = Point(13.479103, 25.830106, 0.0)  # P2a78K
P2bAB = Point(5.557215, 30.404754, 0.0)  # P2bAB
P2dAB = Point(5.557215, 29.22088, 0.0)  # P2dAB
C = Point(5.557215, 30.313566, 0.0)  # C
L = Point(5.557215, 22.771694, 0.0)  # L
D = Point(6.688913, 30.313566, 0.0)  # D
M = Point(6.688913, 22.771694, 0.0)  # M
E = Point(7.820612, 30.313566, 0.0)  # E
N = Point(7.820612, 22.771694, 0.0)  # N
F = Point(8.95231, 30.313566, 0.0)  # F
O = Point(8.95231, 22.771694, 0.0)  # O
H = Point(11.215706, 30.313566, 0.0)  # H
Q = Point(11.215706, 22.771694, 0.0)  # Q
I = Point(12.347404, 30.313566, 0.0)  # I
R = Point(12.347404, 22.771694, 0.0)  # R
J = Point(13.479103, 30.313566, 0.0)  # J
S_2 = Point(13.479103, 22.771694, 0.0)  # S
K = Point(14.610801, 30.313566, 0.0)  # K
T = Point(14.610801, 22.771694, 0.0)  # T
frameBL = Point(4.120331, 22.039725, 0.0)  # frameBL
Z = Point(22.794863, 22.039725, 0.0)  # Z
A_1 = Point(4.120331, 31.376991, 0.0)  # A_1
frameTR = Point(22.794863, 31.376991, 0.0)  # frameTR
F_1 = Point(5.557215, 26.7, 0.0)  # F_1
G_1 = Point(14.610801, 26.7, 0.0)  # G_1
I_1 = Point(21.4, 29.7, 0.0)  # I_1
J_1 = Point(21.4, 24.372569, 0.0)  # J_1
K_1 = Point(21.4, 27.036285, 0.0)  # K_1
P4aJ = Point(21.0, 24.372569, 0.0)  # P4aJ
T_1 = Point(5.557215, 25.3, 0.0)  # T_1
U_1 = Point(14.610801, 25.3, 0.0)  # U_1
W = Point(15.051383, 26.479881, 0.0)  # W
B_1 = Point(15.051383, 25.887945, 0.0)  # B_1
V_1 = Point(15.051383, 25.296008, 0.0)  # V_1
W_1 = Point(15.051383, 24.704071, 0.0)  # W_1
Z_1 = Point(15.051383, 27.592688, 0.0)  # Z_1
A_2 = Point(15.051383, 28.184624, 0.0)  # A_2
B_2 = Point(15.051383, 28.776561, 0.0)  # B_2
C_2 = Point(15.051383, 29.368498, 0.0)  # C_2
D_2 = Point(0.0, 25.120074, 0.0)  # D_2
E_2 = Point(6.688913, 25.120074, 0.0)  # E_2
F_2 = Point(7.820612, 25.120074, 0.0)  # F_2
G_2 = Point(8.95231, 25.120074, 0.0)  # G_2
H_2 = Point(10.084008, 25.120074, 0.0)  # H_2
I_2 = Point(11.215706, 25.120074, 0.0)  # I_2
J_2 = Point(12.347404, 25.120074, 0.0)  # J_2
K_2 = Point(13.479103, 25.120074, 0.0)  # K_2
L_2 = Point(0.0, 24.0, 0.0)  # L_2
M_2 = Point(17.5, 24.0, 0.0)  # M_2
R_2 = Point(20.761306, 29.648322, 0.0)  # R_2
S_2_2 = Point(17.261306, 28.101973, 0.0)  # S_2

# --- geometry ---
S.add(P4aA, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(P4s03, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(P2s01, pointcolor=Color(0.0, 0.0, 1.0), pointsize=4.5)
S.add(P2s04, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=4.5)
S.add(P2s02, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=4.5)
S.add(M_1, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=4.5)
S.add(L_1, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=4.5)
S.add(P_1, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=4.5)
S.add(Q_1, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=4.5)
S.add(P2aIJK8, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(N_1, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=4.5)
S.add(O_1, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=4.5)
S.add(P2aAB1K, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(G, P), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(R_1, S_1), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(P2aEF54, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(P2aFG65, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(P2aEF54, P2aFG65), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(O_2, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(P2aDE43, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(P2aDE43, P2aEF54), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Q_2, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(P2s03, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=4.5)
S.add(P2s05, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=4.5)
S.add(P2aBC21, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(P2aAB1K, P2aBC21), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(P5aA, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(P5aB, pointcolor=Color(0.4, 0.4, 0.4), pointsize=3.0)
S.add(P5aC, pointcolor=Color(0.4, 0.4, 0.4), pointsize=3.0)
S.add(P5aD, pointcolor=Color(0.4, 0.4, 0.4), pointsize=3.0)
S.add(P5aE, pointcolor=Color(0.4, 0.4, 0.4), pointsize=3.0)
S.add(P5aF, pointcolor=Color(0.4, 0.4, 0.4), pointsize=3.0)
S.add(P5aG, pointcolor=Color(0.4, 0.4, 0.4), pointsize=3.0)
S.add(P5aH, pointcolor=Color(0.4, 0.4, 0.4), pointsize=3.0)
S.add(P5aI, pointcolor=Color(0.4, 0.4, 0.4), pointsize=3.0)
S.add(P5aJ, pointcolor=Color(0.4, 0.4, 0.4), pointsize=3.0)
S.add(Line(P2bBC, P2dBC), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2bCD, P2dCD), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2bDE, P2dDE), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2bEF, P2dEF), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2bFG, P2dFG), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2bGH, P2dGH), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(P5a0, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(P5aB, P5a0), linecolor=Color(0.4, 0.4, 0.4), linewidth=1.2)
S.add(Line(P5a0, P5aC), linecolor=Color(0.4, 0.4, 0.4), linewidth=1.2)
S.add(Line(P5aD, P5a0), linecolor=Color(0.4, 0.4, 0.4), linewidth=1.2)
S.add(Line(P5a0, P5aE), linecolor=Color(0.4, 0.4, 0.4), linewidth=1.2)
S.add(Line(P5aF, P5a0), linecolor=Color(0.4, 0.4, 0.4), linewidth=1.2)
S.add(Line(P5a0, P5aG), linecolor=Color(0.4, 0.4, 0.4), linewidth=1.2)
S.add(P3aAB01, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(P3aBC0, pointcolor=Color(0.4, 0.4, 0.4), pointsize=3.0)
S.add(P3aCD0, pointcolor=Color(0.4, 0.4, 0.4), pointsize=3.0)
S.add(P3aDE0, pointcolor=Color(0.4, 0.4, 0.4), pointsize=3.0)
S.add(P3aEF0, pointcolor=Color(0.4, 0.4, 0.4), pointsize=3.0)
S.add(P3aFG0, pointcolor=Color(0.4, 0.4, 0.4), pointsize=3.0)
S.add(P3aGH0, pointcolor=Color(0.4, 0.4, 0.4), pointsize=3.0)
S.add(Line(P3aAB01, P3aBC0), linecolor=Color(0.4, 0.4, 0.4), linewidth=1.2)
S.add(Line(P3aBC0, P3aCD0), linecolor=Color(0.4, 0.4, 0.4), linewidth=1.2)
S.add(Line(P3aCD0, P3aDE0), linecolor=Color(0.4, 0.4, 0.4), linewidth=1.2)
S.add(Line(P3aDE0, P3aEF0), linecolor=Color(0.4, 0.4, 0.4), linewidth=1.2)
S.add(Line(P3aEF0, P3aFG0), linecolor=Color(0.4, 0.4, 0.4), linewidth=1.2)
S.add(Line(P3aFG0, P3aGH0), linecolor=Color(0.4, 0.4, 0.4), linewidth=1.2)
S.add(Line(P2bHI, P2dHI), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2bIJ, P2dIJ), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P5a0, P5aH), linecolor=Color(0.4, 0.4, 0.4), linewidth=1.2)
S.add(Line(P5a0, P5aI), linecolor=Color(0.4, 0.4, 0.4), linewidth=1.2)
S.add(P3aHI0, pointcolor=Color(0.4, 0.4, 0.4), pointsize=3.0)
S.add(P3aIJK0, pointcolor=Color(0.4, 0.4, 0.4), pointsize=3.0)
S.add(Line(P3aAB01, P3aIJK0), linecolor=Color(0.4, 0.4, 0.4), linewidth=1.2)
S.add(P5aK, pointcolor=Color(0.4, 0.4, 0.4), pointsize=3.0)
S.add(Line(P5a0, P5aK), linecolor=Color(0.4, 0.4, 0.4), linewidth=1.2)
S.add(Line(P3aGH0, P3aHI0), linecolor=Color(0.4, 0.4, 0.4), linewidth=1.2)
S.add(Line(P3aHI0, P3aIJK0), linecolor=Color(0.4, 0.4, 0.4), linewidth=1.2)
S.add(Line(P5aK, P5aJ), linecolor=Color(0.4, 0.4, 0.4), linewidth=1.2)
S.add(Line(P5aK, P5aA), linecolor=Color(0.4, 0.4, 0.4), linewidth=1.2)
S.add(P2aCD32, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(P2aGH76, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(P2aHI87, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(P2aBC21, P2aCD32), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2aCD32, P2aDE43), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2aFG65, P2aGH76), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2aGH76, P2aHI87), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2aHI87, P2aIJK8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(P4aK, pointcolor=Color(1.0, 0.498, 0.0), pointsize=3.0)
S.add(Line(P4a1, P4aB), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P4aC, P4a2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P4a3, P4aD), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P4aE, P4a4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P4a5, P4aF), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P4aG, P4a6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P4a7, P4aH), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P4aI, P4a8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P4a8, P4a7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P4a7, P4a6), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(O_2, Q_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P4a6, P4a5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P4a4, P4a3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P4a3, P4a2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P4a2, P4a1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P4a1, P4aK), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P4a2, P4aK), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P4a3, P4aK), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P4a4, P4aK), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P4aK, P4a5), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P4a6, P4aK), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P4aK, P4a7), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P4aK, P4a8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(P2a12K, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(P2a23K, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(P2a34K, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(P2a45K, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(P2a56K, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(P2a67K, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(P2a78K, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(P2aAB1K, P2a12K), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2a12K, P2a23K), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2a23K, P2a34K), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2a34K, P2a45K), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2a45K, P2a56K), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2a56K, P2a67K), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2a67K, P2a78K), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2a78K, P2aIJK8), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2a78K, P2aHI87), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2aGH76, P2a67K), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2a56K, P2aFG65), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2aEF54, P2a45K), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2aDE43, P2a34K), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2aCD32, P2a23K), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P2aBC21, P2a12K), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([P2aAB1K, P2aBC21, P4aB, P4a1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([P2aBC21, P2aCD32, P4aC, P4a2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([P2aCD32, P2aDE43, P4aD, P4a3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([P2aDE43, P2aEF54, P4aE, P4a4]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([P2aEF54, P2aFG65, P4aF, P4a5]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([P2aFG65, P2aGH76, P4aG, P4a6]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([P2aGH76, P2aHI87, P4aH, P4a7]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([P2aHI87, P2aIJK8, P4aI, P4a8]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([P2aAB1K, P2a12K, P4a1, P4aK]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([P2a12K, P2a23K, P4a2, P4aK]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([P2a23K, P2a34K, P4a3, P4aK]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([P2a34K, P2a45K, P4a4, P4aK]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([P2a45K, P2a56K, P4a5, P4aK]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([P2a56K, P2a67K, P4a6, P4aK]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([P2a67K, P2a78K, P4a7, P4aK]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([P2a78K, P2aIJK8, P4a8, P4aK]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([P2aBC21, P2a12K, P4a2, P4a1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([P2aCD32, P2a23K, P4a3, P4a2]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([P2aDE43, P2a34K, P4a4, P4a3]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([P2aEF54, P2a45K, P4a5, P4a4]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([P2aFG65, P2a56K, P4a6, P4a5]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([P2aGH76, P2a67K, P4a7, P4a6]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.498)
S.add(Polygon([P2aHI87, P2a78K, P4a8, P4a7]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Line(Point(5.557215, 29.776483, 0.0), Point(5.557215, 29.22088, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)  # vector
S.add(Line(Point(5.557215, 29.22088, 0.0), Point(5.042181, 30.43905, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)
S.add(Line(Point(5.557215, 29.22088, 0.0), Point(6.072249, 30.43905, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)
S.add(Line(Point(6.688913, 29.776483, 0.0), Point(6.688913, 29.22088, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)  # vector
S.add(Line(Point(6.688913, 29.22088, 0.0), Point(6.173879, 30.43905, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)
S.add(Line(Point(6.688913, 29.22088, 0.0), Point(7.203948, 30.43905, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)
S.add(Line(Point(7.820612, 29.776483, 0.0), Point(7.820612, 29.22088, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)  # vector
S.add(Line(Point(7.820612, 29.22088, 0.0), Point(7.305578, 30.43905, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)
S.add(Line(Point(7.820612, 29.22088, 0.0), Point(8.335646, 30.43905, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)
S.add(Line(Point(8.95231, 29.776483, 0.0), Point(8.95231, 29.22088, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)  # vector
S.add(Line(Point(8.95231, 29.22088, 0.0), Point(8.437276, 30.43905, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)
S.add(Line(Point(8.95231, 29.22088, 0.0), Point(9.467344, 30.43905, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)
S.add(Line(Point(10.084008, 29.776483, 0.0), Point(10.084008, 29.22088, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)  # vector
S.add(Line(Point(10.084008, 29.22088, 0.0), Point(9.568974, 30.43905, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)
S.add(Line(Point(10.084008, 29.22088, 0.0), Point(10.599042, 30.43905, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)
S.add(Line(Point(11.215706, 29.776483, 0.0), Point(11.215706, 29.22088, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)  # vector
S.add(Line(Point(11.215706, 29.22088, 0.0), Point(10.700672, 30.43905, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)
S.add(Line(Point(11.215706, 29.22088, 0.0), Point(11.73074, 30.43905, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)
S.add(Line(Point(12.347404, 29.776483, 0.0), Point(12.347404, 29.22088, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)  # vector
S.add(Line(Point(12.347404, 29.22088, 0.0), Point(11.83237, 30.43905, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)
S.add(Line(Point(12.347404, 29.22088, 0.0), Point(12.862438, 30.43905, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)
S.add(Line(Point(13.479103, 29.776483, 0.0), Point(13.479103, 29.22088, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)  # vector
S.add(Line(Point(13.479103, 29.22088, 0.0), Point(12.964069, 30.43905, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)
S.add(Line(Point(13.479103, 29.22088, 0.0), Point(13.994137, 30.43905, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)
S.add(Line(Point(14.610801, 29.776483, 0.0), Point(14.610801, 29.22088, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)  # vector
S.add(Line(Point(14.610801, 29.22088, 0.0), Point(14.095767, 30.43905, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)
S.add(Line(Point(14.610801, 29.22088, 0.0), Point(15.125835, 30.43905, 0.0)), linecolor=Color(0.6, 0.6, 0.6), linewidth=3.0)
S.add(Line(Point(10.084008, 30.372879, 0.0), Point(10.084008, 29.776483, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.6)  # vector
S.add(Line(Point(10.084008, 29.776483, 0.0), Point(9.568974, 30.994653, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.6)
S.add(Line(Point(10.084008, 29.776483, 0.0), Point(10.599042, 30.994653, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.6)
S.add(Line(Point(11.215706, 30.372879, 0.0), Point(11.215706, 29.776483, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.6)  # vector
S.add(Line(Point(11.215706, 29.776483, 0.0), Point(10.700672, 30.994653, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.6)
S.add(Line(Point(11.215706, 29.776483, 0.0), Point(11.73074, 30.994653, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.6)
S.add(Line(Point(12.347404, 30.372879, 0.0), Point(12.347404, 29.776483, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.6)  # vector
S.add(Line(Point(12.347404, 29.776483, 0.0), Point(11.83237, 30.994653, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.6)
S.add(Line(Point(12.347404, 29.776483, 0.0), Point(12.862438, 30.994653, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.6)
S.add(Line(Point(13.479103, 30.372879, 0.0), Point(13.479103, 29.776483, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.6)  # vector
S.add(Line(Point(13.479103, 29.776483, 0.0), Point(12.964069, 30.994653, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.6)
S.add(Line(Point(13.479103, 29.776483, 0.0), Point(13.994137, 30.994653, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.6)
S.add(Line(P2bAB, P2dAB), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(P4s03, P4a1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(C, L), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(D, M), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(E, N), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(F, O), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(H, Q), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(I, R), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(J, S_2), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(K, T), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.0)
S.add(Line(Point(21.0, 29.7, 0.0), Point(21.0, 29.108063, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 29.108063, 0.0), Point(20.484966, 30.326233, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 29.108063, 0.0), Point(21.515034, 30.326233, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 29.108063, 0.0), Point(21.0, 28.516126, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 28.516126, 0.0), Point(20.484966, 29.734297, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 28.516126, 0.0), Point(21.515034, 29.734297, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 28.516126, 0.0), Point(21.0, 27.92419, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 27.92419, 0.0), Point(20.484966, 29.14236, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 27.92419, 0.0), Point(21.515034, 29.14236, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 27.92419, 0.0), Point(21.0, 27.332253, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 27.332253, 0.0), Point(20.484966, 28.550423, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 27.332253, 0.0), Point(21.515034, 28.550423, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 27.332253, 0.0), Point(21.0, 26.740316, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 26.740316, 0.0), Point(20.484966, 27.958486, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 26.740316, 0.0), Point(21.515034, 27.958486, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 26.740316, 0.0), Point(21.0, 26.148379, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 26.148379, 0.0), Point(20.484966, 27.36655, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 26.148379, 0.0), Point(21.515034, 27.36655, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 26.148379, 0.0), Point(21.0, 25.556443, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 25.556443, 0.0), Point(20.484966, 26.774613, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 25.556443, 0.0), Point(21.515034, 26.774613, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 25.556443, 0.0), Point(21.0, 24.964506, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 24.964506, 0.0), Point(20.484966, 26.182676, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 24.964506, 0.0), Point(21.515034, 26.182676, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 24.964506, 0.0), Point(21.0, 24.372569, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.0, 24.372569, 0.0), Point(20.484966, 25.590739, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.0, 24.372569, 0.0), Point(21.515034, 25.590739, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(frameBL, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Z, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(frameBL, Z), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(A_1, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(frameTR, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Polyline([frameBL, A_1, frameTR, Z]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(F_1, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(G_1, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(I_1, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(J_1, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(K_1, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(Line(Point(21.4, 24.372569, 0.0), Point(21.4, 27.036285, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.4, 27.036285, 0.0), Point(21.915034, 25.818114, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.4, 27.036285, 0.0), Point(20.884966, 25.818114, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.4, 27.036285, 0.0), Point(21.4, 29.7, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.4, 29.7, 0.0), Point(21.915034, 28.48183, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.4, 29.7, 0.0), Point(20.884966, 28.48183, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(P4aA, I_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(P4aJ, J_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(T_1, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(Line(Point(5.557215, 25.3, 0.0), Point(5.557215, 26.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(5.557215, 26.0, 0.0), Point(6.072249, 24.78183, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(5.557215, 26.0, 0.0), Point(5.042181, 24.78183, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(U_1, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=3.0)
S.add(Line(Point(14.610801, 25.3, 0.0), Point(14.610801, 26.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(14.610801, 26.0, 0.0), Point(15.125835, 24.78183, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(14.610801, 26.0, 0.0), Point(14.095767, 24.78183, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(P4aB, W), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(P4aC, B_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(P4aD, V_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(P4aE, W_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(P4aI, Z_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(P4aH, A_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(P4aG, B_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(P4aF, C_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(D_2, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=4.5)
S.add(E_2, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=1.5)
S.add(F_2, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=1.5)
S.add(G_2, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=1.5)
S.add(H_2, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=1.5)
S.add(I_2, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=1.5)
S.add(J_2, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=1.5)
S.add(K_2, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=1.5)
S.add(Line(P2aBC21, E_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(P2aCD32, F_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(P2aDE43, G_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(P2aEF54, H_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(P2aFG65, I_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(P2aGH76, J_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(P2aHI87, K_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(L_2, pointcolor=Color(0.4902, 0.4902, 1.0), pointsize=4.5)
S.add(Line(P4a5, O_2), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(P4a4, Q_2), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(P4aK, K_1), linecolor=Color(0.6, 0.6, 0.6), linewidth=1.2)
S.add(Line(P4s03, M_2), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(R_2, pointcolor=Color(0.502, 0.502, 0.502), pointsize=3.0)
S.add(S_2_2, pointcolor=Color(0.502, 0.502, 0.502), pointsize=3.0)
S.add(Line(S_2_2, R_2), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(P4a1, S_2_2), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)
S.add(Line(P4aB, R_2), linecolor=Color(0.502, 0.502, 0.502), linewidth=1.2)

# transpiler notes:
#   - segment S5nAB: endpoints unresolved (loadToLoadLine)
#   - segment S5nBC: endpoints unresolved (loadToLoadLine)
#   - segment S5nCD: endpoints unresolved (loadToLoadLine)
#   - segment S5nDE: endpoints unresolved (loadToLoadLine)
#   - segment S5nEF: endpoints unresolved (loadToLoadLine)
#   - segment S5nFG: endpoints unresolved (loadToLoadLine)
#   - segment S5nGH: endpoints unresolved (loadToLoadLine)
#   - segment S5nHI: endpoints unresolved (loadToLoadLine)
#   - segment S5nIJ: endpoints unresolved (loadToLoadLine)
#   - segment S2oAK: endpoints unresolved (loadToLoadLine)
#   - segment S2oJK: endpoints unresolved (loadToLoadLine)

if __name__ == "__main__":
    viewer.show()
