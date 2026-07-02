"""
COMPAS translation of GeoGebra applet: Funicular For Vertical Forces
Source: https://block.arch.ethz.ch/eq/drawing/view/8
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
D_1 = Point(45.0, 15.0, 0.0)  # D_1
B = Point(0.0, 15.0, 0.0)  # B
A = Point(0.0, -10.0, 0.0)  # A
D = Point(23.668234, 15.0, 0.0)  # D
C = Point(23.668234, -10.0, 0.0)  # C
R = Point(3.00475, 17.0, 0.0)  # R
S_2 = Point(10.911926, 17.0, 0.0)  # S
T = Point(16.244673, 17.0, 0.0)  # T
U = Point(21.638716, 17.0, 0.0)  # U
V = Point(0.0, 0.0, 0.0)  # V
W = Point(23.668234, 5.108171, 0.0)  # W
Q_1 = Point(45.0, 7.210797, 0.0)  # Q_1
R_1 = Point(53.265927, 8.994781, 0.0)  # R_1
E_1 = Point(45.0, 11.52, 0.0)  # E_1
G_1 = Point(45.0, 5.64, 0.0)  # G_1
H_1 = Point(45.0, 2.04, 0.0)  # H_1
I_1 = Point(45.0, -3.24, 0.0)  # I_1
S_1 = Point(3.00475, -2.182959, 0.0)  # S_1
T_1 = Point(10.911926, -4.59858, 0.0)  # T_1
U_1 = Point(16.244673, -2.43425, 0.0)  # U_1
V_1 = Point(21.638716, 2.104187, 0.0)  # V_1
T_2 = Point(21.638716, 21.296455, 0.0)  # T_2
S_2_2 = Point(21.638716, -10.0, 0.0)  # S_2
U_2 = Point(16.244673, 21.296455, 0.0)  # U_2
R_2 = Point(16.244673, -10.0, 0.0)  # R_2
Q_2 = Point(10.911926, -10.0, 0.0)  # Q_2
V_2 = Point(10.911926, 21.296455, 0.0)  # V_2
W_2 = Point(3.00475, 21.296455, 0.0)  # W_2
P_6 = Point(3.00475, -10.0, 0.0)  # P_6
frameBL = Point(-4.868992, -11.239308, 0.0)  # frameBL
P_2 = Point(66.234299, -11.239308, 0.0)  # P_2
Z_2 = Point(-4.868992, 24.312337, 0.0)  # Z_2
frameTR = Point(66.234299, 24.312337, 0.0)  # frameTR

# --- geometry ---
S.add(D_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(B, A), linecolor=Color(0.8784, 0.8784, 0.8784), linewidth=1.2)
S.add(Line(D, C), linecolor=Color(0.8784, 0.8784, 0.8784), linewidth=1.2)
S.add(R, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(S_2, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(T, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(U, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(V, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(W, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(Point(3.00475, 19.5, 0.0), Point(3.00475, 17.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(3.00475, 17.0, 0.0), Point(1.719984, 20.038758, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(3.00475, 17.0, 0.0), Point(4.289516, 20.038758, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.911926, 19.5, 0.0), Point(10.911926, 17.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.911926, 17.0, 0.0), Point(9.62716, 20.038758, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(10.911926, 17.0, 0.0), Point(12.196692, 20.038758, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.244673, 19.5, 0.0), Point(16.244673, 17.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(16.244673, 17.0, 0.0), Point(14.959907, 20.038758, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(16.244673, 17.0, 0.0), Point(17.529439, 20.038758, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.638716, 19.5, 0.0), Point(21.638716, 17.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(21.638716, 17.0, 0.0), Point(20.35395, 20.038758, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(21.638716, 17.0, 0.0), Point(22.923482, 20.038758, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Q_1, pointcolor=Color(0.0, 0.0, 0.0), pointsize=3.0)
S.add(Line(V, W), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(R_1, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(R_1, Q_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_1, D_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_1, E_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_1, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_1, H_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_1, I_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(S_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(T_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(U_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(V_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(V, S_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_1, T_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T_1, U_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(V_1, U_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(W, V_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([V, S_1, D_1, R_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([S_1, T_1, E_1, R_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([T_1, U_1, G_1, R_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([U_1, V_1, H_1, R_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([V_1, W, I_1, R_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Line(Point(0.0, 0.0, 0.0), Point(-2.022581, 1.46941, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(-2.022581, 1.46941, 0.0), Point(1.191012, 0.722755, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(-2.022581, 1.46941, 0.0), Point(-0.319267, -1.35608, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(23.668234, 5.108171, 0.0), Point(25.067782, 7.179707, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(25.067782, 7.179707, 0.0), Point(24.431203, 3.942511, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(25.067782, 7.179707, 0.0), Point(22.302051, 5.380985, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(T_2, S_2_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(U_2, R_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Q_2, V_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(W_2, P_6), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(45.0, 15.0, 0.0), Point(45.0, 11.52, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(45.0, 11.52, 0.0), Point(43.715234, 14.558758, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(45.0, 11.52, 0.0), Point(46.284766, 14.558758, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(45.0, 11.52, 0.0), Point(45.0, 5.64, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(45.0, 5.64, 0.0), Point(43.715234, 8.678758, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(45.0, 5.64, 0.0), Point(46.284766, 8.678758, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(45.0, 5.64, 0.0), Point(45.0, 2.04, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(45.0, 2.04, 0.0), Point(43.715234, 5.078758, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(45.0, 2.04, 0.0), Point(46.284766, 5.078758, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(45.0, 2.04, 0.0), Point(45.0, -3.24, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(45.0, -3.24, 0.0), Point(43.715234, -0.201242, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(45.0, -3.24, 0.0), Point(46.284766, -0.201242, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(45.0, -3.24, 0.0), Point(53.265927, 8.994781, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(53.265927, 8.994781, 0.0), Point(52.629348, 5.757585, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(53.265927, 8.994781, 0.0), Point(50.500196, 7.196059, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(53.265927, 8.994781, 0.0), Point(45.0, 15.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(45.0, 15.0, 0.0), Point(48.213593, 14.253344, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(45.0, 15.0, 0.0), Point(46.703314, 12.17451, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(frameBL, P_2), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([frameBL, Z_2, frameTR, P_2]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)

if __name__ == "__main__":
    viewer.show()
