"""
COMPAS translation of GeoGebra applet: Moment from force pair
Source: https://block.arch.ethz.ch/eq/drawing/view/49
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
frameBL = Point(0.782959, 3.750691, 0.0)  # frameBL
fBR = Point(17.681914, 3.750691, 0.0)  # fBR
frameTR = Point(17.681914, 12.200168, 0.0)  # frameTR
fTL = Point(0.782959, 12.200168, 0.0)  # fTL
N = Point(6.0, 10.0, 0.0)  # N
H = Point(6.0, 5.0, 0.0)  # H
J = Point(6.0, 8.0, 0.0)  # J
L = Point(8.780378, 8.0, 0.0)  # L
K = Point(8.780378, 10.0, 0.0)  # K
P = Point(9.0, 8.0, 0.0)  # P
Q = Point(9.0, 6.0, 0.0)  # Q
R = Point(8.191817, 8.0, 0.0)  # R
S_2 = Point(8.191817, 6.0, 0.0)  # S
M = Point(8.191817, 10.0, 0.0)  # M
T = Point(8.780378, 10.0, 0.0)  # T
V = Point(7.81897, 10.0, 0.0)  # V
U = Point(7.81897, 6.0, 0.0)  # U

# --- geometry ---
S.add(frameBL, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(fBR, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Polyline([frameBL, fBR, frameTR, fTL, frameBL]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(4.65, 10.0, 0.0), Point(7.35, 10.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(7.35, 10.0, 0.0), Point(6.627785, 9.694653, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.35, 10.0, 0.0), Point(6.627785, 10.305347, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(7.35, 6.0, 0.0), Point(4.65, 6.0, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(4.65, 6.0, 0.0), Point(5.372215, 6.305347, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.65, 6.0, 0.0), Point(5.372215, 5.694653, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(N, H), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(J, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(L, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(Line(K, L), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(P, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(Q, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(Line(P, Q), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(R, P), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(S_2, Q), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(M, K), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(T, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(V, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(U, pointcolor=Color(0.1255, 0.1255, 0.1255), pointsize=3.0)
S.add(Line(V, U), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Polyline([Point(15.83575, 8.905198, 0.0), Point(15.86429, 8.905898, 0.0), Point(15.892761, 8.907999, 0.0), Point(15.921094, 8.911493, 0.0), Point(15.949222, 8.916374, 0.0), Point(15.977077, 8.922629, 0.0), Point(16.004591, 8.930243, 0.0), Point(16.031699, 8.939198, 0.0), Point(16.058334, 8.949473, 0.0), Point(16.084433, 8.961042, 0.0), Point(16.109933, 8.973877, 0.0), Point(16.134773, 8.987949, 0.0), Point(16.158892, 9.003222, 0.0), Point(16.182233, 9.01966, 0.0), Point(16.204739, 9.037224, 0.0), Point(16.226356, 9.055871, 0.0), Point(16.247032, 9.075556, 0.0), Point(16.266717, 9.096232, 0.0), Point(16.285364, 9.117849, 0.0), Point(16.302928, 9.140355, 0.0), Point(16.319366, 9.163696, 0.0), Point(16.33464, 9.187815, 0.0), Point(16.348711, 9.212655, 0.0), Point(16.361547, 9.238155, 0.0), Point(16.373116, 9.264254, 0.0), Point(16.38339, 9.29089, 0.0), Point(16.392345, 9.317997, 0.0), Point(16.399959, 9.345511, 0.0), Point(16.406214, 9.373366, 0.0), Point(16.411095, 9.401494, 0.0), Point(16.41459, 9.429828, 0.0), Point(16.41669, 9.458299, 0.0), Point(16.417391, 9.486838, 0.0), Point(16.41669, 9.515378, 0.0), Point(16.41459, 9.543849, 0.0), Point(16.411095, 9.572183, 0.0), Point(16.406214, 9.600311, 0.0), Point(16.399959, 9.628165, 0.0), Point(16.392345, 9.65568, 0.0), Point(16.38339, 9.682787, 0.0), Point(16.373116, 9.709423, 0.0), Point(16.361547, 9.735522, 0.0), Point(16.348711, 9.761022, 0.0), Point(16.33464, 9.785861, 0.0), Point(16.319366, 9.809981, 0.0), Point(16.302928, 9.833321, 0.0), Point(16.285364, 9.855827, 0.0), Point(16.266717, 9.877444, 0.0), Point(16.247032, 9.89812, 0.0), Point(16.226356, 9.917806, 0.0), Point(16.204739, 9.936453, 0.0), Point(16.182233, 9.954016, 0.0), Point(16.158892, 9.970455, 0.0), Point(16.134773, 9.985728, 0.0), Point(16.109933, 9.9998, 0.0), Point(16.084433, 10.012635, 0.0), Point(16.058334, 10.024204, 0.0), Point(16.031699, 10.034479, 0.0), Point(16.004591, 10.043434, 0.0), Point(15.977077, 10.051048, 0.0), Point(15.949222, 10.057303, 0.0), Point(15.921094, 10.062184, 0.0), Point(15.892761, 10.065678, 0.0), Point(15.86429, 10.067778, 0.0), Point(15.83575, 10.068479, 0.0)]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)  # arc

if __name__ == "__main__":
    viewer.show()
