"""
COMPAS translation of GeoGebra applet: Pedestrian Bridge 1
Source: https://block.arch.ethz.ch/eq/drawing/view/2
Auto-generated from geogebra.xml (cached evaluated state).
Sliders/interactions are baked to their saved values; run to view in compas_viewer.
"""
from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame
from compas.colors import Color
from compas_viewer import Viewer

viewer = Viewer()
S = viewer.scene

# --- points (GeoGebra labels preserved) ---
Z = Point(48.374879, 25.718545, 0.0)  # Z
C_2 = Point(12.89, 10.5, 0.0)  # C_2
P_1 = Point(12.896149, 29.198955, 0.0)  # P_1
Q_1 = Point(12.887898, 4.107925, 0.0)  # Q_1
D = Point(20.83, 10.5, 0.0)  # D
E = Point(21.06146, 12.302618, 0.0)  # E
G = Point(20.679791, 13.905628, 0.0)  # G
H = Point(21.290462, 18.027652, 0.0)  # H
I = Point(21.443129, 21.462672, 0.0)  # I
J = Point(20.908793, 25.432029, 0.0)  # J
K = Point(18.847781, 27.798376, 0.0)  # K
L = Point(18.987087, 29.274038, 0.0)  # L
N = Point(5.0, 10.5, 0.0)  # N
O = Point(4.573363, 12.684287, 0.0)  # O
P = Point(4.878699, 16.348309, 0.0)  # P
Q = Point(4.572927, 19.328384, 0.0)  # Q
R = Point(2.594634, 29.164367, 0.0)  # R
C_3 = Point(12.890823, 13.002759, 0.0)  # C_3
V = Point(4.738992, 17.709897, 0.0)  # V
W = Point(21.261154, 17.829829, 0.0)  # W
B_1 = Point(33.518456, 17.151025, 0.0)  # B_1
A_1 = Point(48.369241, 8.575689, 0.0)  # A_1
C = Point(6.89, 10.5, 0.0)  # C
C_1 = Point(18.89, 10.5, 0.0)  # C_1
R_1 = Point(48.376023, 29.198955, 0.0)  # R_1
S_1 = Point(48.367772, 4.107925, 0.0)  # S_1
I_1 = Point(6.980947, 8.460811, 0.0)  # I_1
J_1 = Point(7.287838, 4.624674, 0.0)  # J_1
D_1 = Point(18.642803, 8.537533, 0.0)  # D_1
E_1 = Point(18.105744, 6.542742, 0.0)  # E_1
F_1 = Point(18.105744, 4.547951, 0.0)  # F_1
S_3 = Point(6.89, 3.174819, 0.0)  # S_3
T_3 = Point(6.89, 1.897715, 0.0)  # T_3
U_3 = Point(18.89, 1.897715, 0.0)  # U_3
V_3 = Point(18.89, 3.174819, 0.0)  # V_3
W_3 = Point(12.89, 3.174819, 0.0)  # W_3
frameBL = Point(-4.92431, -0.575721, 0.0)  # frameBL
A_4 = Point(65.430619, -0.575721, 0.0)  # A_4
B_4 = Point(-4.92431, 34.601743, 0.0)  # B_4
frameTR = Point(65.430619, 34.601743, 0.0)  # frameTR

# --- geometry ---
S.add(Z, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(C_2, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(Point(12.89, 10.5, 0.0), Point(12.889013, 7.5, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.889013, 7.5, 0.0), Point(11.618758, 10.507193, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.889013, 7.5, 0.0), Point(14.161246, 10.506357, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(P_1, Q_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([D, E, G, H, I, J, K, L]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([N, O, P, Q, R]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(C_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(C_2, C_3), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(V, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(W, pointcolor=Color(1.0, 1.0, 1.0), pointsize=4.5)
S.add(Line(C_3, V), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C_3, W), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(B_1, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(B_1, A_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(B_1, Z), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(C, C_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(R_1, S_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Point(48.369241, 8.575689, 0.0), Point(33.518456, 17.151025, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(33.518456, 17.151025, 0.0), Point(36.757996, 16.748365, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(33.518456, 17.151025, 0.0), Point(35.486616, 14.546585, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(33.518456, 17.151025, 0.0), Point(48.374879, 25.718545, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(48.374879, 25.718545, 0.0), Point(46.405264, 23.115206, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(48.374879, 25.718545, 0.0), Point(45.135114, 25.317697, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.890823, 13.002759, 0.0), Point(15.489644, 14.501468, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(15.489644, 14.501468, 0.0), Point(13.520029, 11.89813, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(15.489644, 14.501468, 0.0), Point(12.249879, 14.10062, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(48.374879, 25.718545, 0.0), Point(48.369241, 8.575689, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(48.369241, 8.575689, 0.0), Point(47.098986, 11.582882, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(48.369241, 8.575689, 0.0), Point(49.641474, 11.582045, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Z, A_1), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polygon([C_3, C_2, Z, A_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([V, C_3, B_1, A_1]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Polygon([C_3, W, B_1, Z]), linecolor=Color(0.6, 0.2, 0.0), facecolor=Color(0.6, 0.2, 0.0), linewidth=1.0, opacity=0.5)
S.add(Line(Point(12.890823, 13.002759, 0.0), Point(12.889836, 10.002759, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.889836, 10.002759, 0.0), Point(11.619581, 13.009952, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.889836, 10.002759, 0.0), Point(14.162069, 13.009116, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(10.29284, 14.502921, 0.0), Point(12.890823, 13.002759, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.890823, 13.002759, 0.0), Point(9.651283, 13.405418, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.890823, 13.002759, 0.0), Point(10.922664, 15.607199, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(15.489644, 14.501468, 0.0), Point(12.890823, 13.002759, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(12.890823, 13.002759, 0.0), Point(14.860438, 15.606098, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(12.890823, 13.002759, 0.0), Point(16.130588, 13.403607, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(21.261154, 17.829829, 0.0), Point(23.859976, 19.328538, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(23.859976, 19.328538, 0.0), Point(21.890361, 16.725199, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(23.859976, 19.328538, 0.0), Point(20.620211, 18.92769, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(4.738992, 17.709897, 0.0), Point(2.141009, 19.210058, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(2.141009, 19.210058, 0.0), Point(5.38055, 18.807399, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(2.141009, 19.210058, 0.0), Point(4.109169, 16.605619, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(12.890823, 13.002759, 0.0), Point(10.29284, 14.502921, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(10.29284, 14.502921, 0.0), Point(13.53238, 14.100262, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(10.29284, 14.502921, 0.0), Point(12.261, 11.898481, 0.0)), linecolor=Color(1.0, 0.498, 0.0), linewidth=3.0)
S.add(Line(Point(48.674879, 25.718446, 0.0), Point(48.669241, 8.57559, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(48.669241, 8.57559, 0.0), Point(47.398986, 11.582783, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(48.669241, 8.57559, 0.0), Point(49.941474, 11.581947, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(33.668327, 16.891142, 0.0), Point(48.524749, 25.458663, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(48.524749, 25.458663, 0.0), Point(46.555134, 22.855324, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(48.524749, 25.458663, 0.0), Point(45.284985, 25.057815, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(33.368585, 17.410907, 0.0), Point(48.225008, 25.978427, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(48.225008, 25.978427, 0.0), Point(46.255393, 23.375089, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(48.225008, 25.978427, 0.0), Point(44.985243, 25.577579, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(48.219225, 8.315891, 0.0), Point(33.36844, 16.891226, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(33.36844, 16.891226, 0.0), Point(36.60798, 16.488567, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(33.36844, 16.891226, 0.0), Point(35.336599, 14.286787, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(48.519257, 8.835487, 0.0), Point(33.668472, 17.410823, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)  # vector
S.add(Line(Point(33.668472, 17.410823, 0.0), Point(36.908013, 17.008164, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Line(Point(33.668472, 17.410823, 0.0), Point(35.636632, 14.806384, 0.0)), linecolor=Color(0.0, 0.6, 0.0), linewidth=3.0)
S.add(Polyline([N, C, I_1, J_1]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([D, C_1, D_1, E_1, F_1]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(S_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(T_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(U_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(V_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(W_3, pointcolor=Color(0.6275, 0.6275, 0.6275), pointsize=3.0)
S.add(Line(S_3, W_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(W_3, V_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(T_3, U_3), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(frameBL, A_4), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Polyline([frameBL, B_4, frameTR, A_4]), linecolor=Color(0.0, 0.0, 0.0), linewidth=1.2)
S.add(Line(A_1, B_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(Z, B_1), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(C_3, V), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(C_3, W), linecolor=Color(1.0, 0.498, 0.0), linewidth=1.2)
S.add(Line(C_3, V), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(C_3, W), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(C_3, C_2), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(Point(4.738992, 17.709897, 0.0), Point(2.141009, 19.210058, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)  # vector
S.add(Line(Point(2.141009, 19.210058, 0.0), Point(5.38055, 18.807399, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(2.141009, 19.210058, 0.0), Point(4.109169, 16.605619, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(21.261154, 17.829829, 0.0), Point(23.859976, 19.328538, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)  # vector
S.add(Line(Point(23.859976, 19.328538, 0.0), Point(21.890361, 16.725199, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(23.859976, 19.328538, 0.0), Point(20.620211, 18.92769, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(12.89, 10.5, 0.0), Point(12.889013, 7.5, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)  # vector
S.add(Line(Point(12.889013, 7.5, 0.0), Point(11.618758, 10.507193, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(12.889013, 7.5, 0.0), Point(14.161246, 10.506357, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(33.368585, 17.410907, 0.0), Point(48.225008, 25.978427, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)  # vector
S.add(Line(Point(48.225008, 25.978427, 0.0), Point(46.255393, 23.375089, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(48.225008, 25.978427, 0.0), Point(44.985243, 25.577579, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(48.219225, 8.315891, 0.0), Point(33.36844, 16.891226, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)  # vector
S.add(Line(Point(33.36844, 16.891226, 0.0), Point(36.60798, 16.488567, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(33.36844, 16.891226, 0.0), Point(35.336599, 14.286787, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(48.674879, 25.718446, 0.0), Point(48.669241, 8.57559, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)  # vector
S.add(Line(Point(48.669241, 8.57559, 0.0), Point(47.398986, 11.582783, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Point(48.669241, 8.57559, 0.0), Point(49.941474, 11.581947, 0.0)), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=3.0)
S.add(Line(Z, A_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(B_1, A_1), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)
S.add(Line(B_1, Z), linecolor=Color(0.6275, 0.6275, 0.6275), linewidth=1.2)

if __name__ == "__main__":
    viewer.show()
