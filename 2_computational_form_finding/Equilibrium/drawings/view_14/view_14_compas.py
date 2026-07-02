"""
COMPAS translation of GeoGebra applet: Prestress
Source: https://block.arch.ethz.ch/eq/drawing/view/14
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
C = Point(75.38, 76.095592, 0.0)  # C
B = Point(15.491808, 76.095592, 0.0)  # B
G = Point(45.435904, 60.617086, 0.0)  # G
H = Point(45.435904, 29.509796, 0.0)  # H
M = Point(108.444817, 58.408017, 0.0)  # M
S_2 = Point(147.329468, 38.308017, 0.0)  # S
N = Point(108.444817, 58.408017, 0.0)  # N
T = Point(147.329468, 78.508017, 0.0)  # T
Z = Point(45.435904, 82.70777, 0.0)  # Z
B_1 = Point(45.435904, 5.465513, 0.0)  # B_1
A_1 = Point(108.444817, 82.70777, 0.0)  # A_1
C_1 = Point(108.444817, 5.465513, 0.0)  # C_1
frameBL = Point(1.147208, 1.708594, 0.0)  # frameBL
G_1 = Point(181.779878, 1.708594, 0.0)  # G_1
H_1 = Point(1.147208, 92.024929, 0.0)  # H_1
frameTR = Point(181.779878, 92.024929, 0.0)  # frameTR

# --- geometry ---
S.add(C, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(B, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(G, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(C, G), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B, G), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(H, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(G, H), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(45.435904, 68.617086, 0.0), Point(45.435904, 60.617086, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(45.435904, 60.617086, 0.0), Point(41.94767, 68.867535, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(45.435904, 60.617086, 0.0), Point(48.924138, 68.867535, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(15.491808, 76.095592, 0.0), Point(8.385116, 79.769137, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(8.385116, 79.769137, 0.0), Point(17.316065, 79.079313, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(8.385116, 79.769137, 0.0), Point(14.112519, 72.881862, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(75.38, 76.095592, 0.0), Point(82.486692, 79.769137, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(82.486692, 79.769137, 0.0), Point(76.75929, 72.881862, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(82.486692, 79.769137, 0.0), Point(73.555744, 79.079313, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(45.435904, 29.509796, 0.0), Point(45.435904, 21.509796, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(45.435904, 21.509796, 0.0), Point(41.94767, 29.760245, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(45.435904, 21.509796, 0.0), Point(48.924138, 29.760245, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(108.444817, 58.408017, 0.0), Point(147.329468, 78.508017, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(147.329468, 78.508017, 0.0), Point(141.602066, 71.620742, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(147.329468, 78.508017, 0.0), Point(138.39852, 77.818193, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(108.444817, 58.408017, 0.0), Point(108.444817, 58.408017, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(108.444817, 58.408017, 0.0), Point(100.194368, 54.919783, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(108.444817, 58.408017, 0.0), Point(100.194368, 61.896251, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(147.329468, 38.308017, 0.0), Point(108.444817, 58.408017, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(108.444817, 58.408017, 0.0), Point(117.375766, 57.718193, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(108.444817, 58.408017, 0.0), Point(114.17222, 51.520742, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(M, S_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(N, T), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(T, S_2), linecolor=Color(1.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Z, B_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_1, C_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(frameBL, G_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([frameBL, H_1, frameTR, G_1]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(Point(147.329468, 78.508017, 0.0), Point(147.329468, 38.308017, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(147.329468, 38.308017, 0.0), Point(143.841234, 46.558467, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(147.329468, 38.308017, 0.0), Point(150.817702, 46.558467, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)

if __name__ == "__main__":
    viewer.show()
