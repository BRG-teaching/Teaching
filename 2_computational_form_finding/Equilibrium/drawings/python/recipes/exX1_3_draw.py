"""EX X.3 — the closing string, and the two things that refuse to move

Auto-generated from ops/exX1_3.json — the drawing as literal COMPAS
calls, one operation per line, in construction order. Regenerate with
web/tools/export_ops.py; edit the web view, not this file.
"""
from compas.colors import Color
from compas.geometry import Circle, Frame, Line, Point, Polygon, Polyline  # noqa: F401

ops = []


def add(step, kind, geometry, color=None, **style):
    """One drawing operation; style: width, dash, opacity, text, head, until."""
    ops.append({"step": step, "kind": kind, "geometry": geometry,
                "color": color, **style})


# step 0 — The exercise
add(0, 'label', Point(2.5, 9.6, 0), text='b) support B moves — Lageplan 1:50')
add(0, 'label', Point(17, 15.4, 0), text='Kräfteplan — force diagram')
add(0, 'label', Point(17, 14, 0), color=Color.from_hex("#aaaaaa"), text='1 unit ≙ 11.01 kN · the load line is always 10.9 units long, so the shape never depends on F₁')

# step 1 — a) Three depths, one span
add(1, 'point', Point(-24, -1.5, 0), color=Color.from_hex("#ffffff"), width=0.4366)
add(1, 'label', Point(-25.5, -2.5, 0), text='A')
add(1, 'segment', Line((-24.9, -2, 0), (-25.501, -1.39896, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(1, 'segment', Line((-24.3, -2, 0), (-24.901, -1.39896, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(1, 'segment', Line((-23.7, -2, 0), (-24.301, -1.39896, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(1, 'segment', Line((-23.1, -2, 0), (-23.701, -1.39896, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(1, 'segment', Line((-22.5, -2, 0), (-23.101, -1.39896, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(1, 'polyline', Polyline([(-24, -8.8, 0), (-24, 4.6, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3481)
add(1, 'polyline', Polyline([(-14.4032, -8.8, 0), (-14.4032, 4.6, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3481)
add(1, 'polyline', Polyline([(-19.2032, -8.8, 0), (-19.2032, 4.6, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3481)
add(1, 'point', Point(-14.4032, 1.012, 0), color=Color.from_hex("#ffffff"), width=0.4366)
add(1, 'label', Point(-12.9032, 0.812, 0), text='B1')
add(1, 'point', Point(-19.2032, -5.4616, 0), color=Color.from_hex("#ffffff"), width=0.34928)
add(1, 'label', Point(-20.9032, -6.3616, 0), text='C')
add(1, 'segment', Line((-24.1528, -1.68505, 0), (-19.356, -5.64665, 0)), color=Color.from_hex("#ce4095"), width=0.098554)
add(1, 'segment', Line((-19.2032, -5.4616, 0), (-14.4032, 1.012, 0)), color=Color.from_hex("#ce4095"), width=0.098554)
add(1, 'label', Point(-20.351, -3.13889, 0), color=Color.from_hex("#ce4095"), text='71.6')
add(1, 'label', Point(-15.0223, -2.34138, 0), color=Color.from_hex("#ce4095"), text='92.7')
add(1, 'point', Point(-14.4032, -3.9, 0), color=Color.from_hex("#ffffff"), width=0.4366)
add(1, 'label', Point(-12.9032, -4.1, 0), text='B2')
add(1, 'point', Point(-19.2032, -5.4616, 0), color=Color.from_hex("#ffffff"), width=0.34928)
add(1, 'label', Point(-20.9032, -6.3616, 0), text='C')
add(1, 'segment', Line((-24, -1.5, 0), (-19.2032, -5.4616, 0)), color=Color.from_hex("#ce4095"), width=0.098554)
add(1, 'segment', Line((-19.2032, -5.4616, 0), (-14.4032, -3.9, 0)), color=Color.from_hex("#ce4095"), width=0.098554)
add(1, 'label', Point(-19.1156, -1.64308, 0), color=Color.from_hex("#ce4095"), text='135.2')
add(1, 'label', Point(-16.6913, -3.067, 0), color=Color.from_hex("#ce4095"), text='109.6')
add(1, 'point', Point(-14.4032, -6.412, 0), color=Color.from_hex("#ffffff"), width=0.4366)
add(1, 'label', Point(-12.9032, -6.612, 0), text='B3')
add(1, 'point', Point(-19.2032, -5.4616, 0), color=Color.from_hex("#ffffff"), width=0.34928)
add(1, 'label', Point(-20.9032, -6.3616, 0), text='C')
add(1, 'segment', Line((-23.8472, -1.31495, 0), (-19.0504, -5.27655, 0)), color=Color.from_hex("#ce4095"), width=0.098554)
add(1, 'segment', Line((-19.2032, -5.4616, 0), (-14.4032, -6.412, 0)), color=Color.from_hex("#ce4095"), width=0.098554)
add(1, 'label', Point(-17.8802, -0.147261, 0), color=Color.from_hex("#ce4095"), text='247.9')
add(1, 'label', Point(-16.5185, -7.52228, 0), color=Color.from_hex("#ce4095"), text='194.8')
add(1, 'arrow', Line((-18.6634, -2.0616, 0), (-18.6634, -4.6616, 0)), color=Color.from_hex("#3f9c20"), width=0.161424, head=(0.556488, 0.214949))
add(1, 'label', Point(-15.6032, -2.0616, 0), color=Color.from_hex("#3f9c20"), text='F₁ = 120 kN')

# step 2 — a) The closing line, and where i has to be
add(2, 'polyline', Polyline([(-24, -1.5, 0), (-14.4032, 1.012, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3481)
add(2, 'polyline', Polyline([(-24, -1.5, 0), (-14.4032, -3.9, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3481)
add(2, 'polyline', Polyline([(-24, -1.5, 0), (-14.4032, -6.412, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3481)
add(2, 'segment', Line((-19.2032, -1.9416, 0), (-19.2032, -5.4616, 0)), color=Color.from_hex("#e07a26"), width=0.044604)
add(2, 'label', Point(-17.7032, -3.7016, 0), color=Color.from_hex("#e07a26"), text='d = 1.100 m')
add(2, 'point', Point(13, 1.54818, 0), color=Color.from_hex("#ffffff"), width=0.34928)
add(2, 'label', Point(11.8, 0.648183, 0), color=Color.from_hex("#aaaaaa"), text='i')
add(2, 'segment', Line((11.4, 7, 0), (11.4, 1.54818, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(2, 'label', Point(8.6, 4.27409, 0), color=Color.from_hex("#aaaaaa"), text='A_v 60.0')

# step 3 — a) Three force diagrams
add(3, 'segment', Line((-24, -1.5, 0), (-19.2032, -5.4616, 0)), color=Color.from_hex("#e07a26"), width=0.134237)
add(3, 'segment', Line((-19.2032, -5.4616, 0), (-14.4032, -2.38349, 0)), color=Color.from_hex("#e07a26"), width=0.134237)
add(3, 'point', Point(-19.2032, -5.4616, 0), color=Color.from_hex("#ffffff"), width=0.4366)
add(3, 'point', Point(-14.4032, -2.38349, 0), color=Color.from_hex("#ffffff"), width=0.4366)
add(3, 'polyline', Polyline([(-24, -1.5, 0), (-14.4032, -2.38349, 0)]), color=Color.from_hex("#e07a26"), dash=0.3481)
add(3, 'label', Point(-24.2166, -4.69318, 0), color=Color.from_hex("#e07a26"), text='106.1')
add(3, 'label', Point(-17.2467, -1.11828, 0), color=Color.from_hex("#e07a26"), text='97.2')
add(3, 'arrow', Line((-24, -1.5, 0), (-25.8505, 0.028292, 0)), color=Color.from_hex("#3f9c20"), width=0.116395, head=(0.376373, 0.161424))
add(3, 'label', Point(-27.0071, 0.983475, 0), color=Color.from_hex("#3f9c20"), text='A = 106.1')
add(3, 'arrow', Line((-14.4032, -2.38349, 0), (-12.3829, -1.08794, 0)), color=Color.from_hex("#3f9c20"), width=0.116395, head=(0.376373, 0.161424))
add(3, 'label', Point(-11.1202, -0.278224, 0), color=Color.from_hex("#3f9c20"), text='B = 97.2')
add(3, 'arrow', Line((13, 7, 0), (13, -3.9, 0)), color=Color.from_hex("#3f9c20"), width=0.161424, head=(0.556488, 0.214949))
add(3, 'label', Point(10, 1.55, 0), color=Color.from_hex("#3f9c20"), text='F₁ 120')
add(3, 'segment', Line((18.0125, 2.86023, 0), (13, 7, 0)), color=Color.from_hex("#ce4095"), width=0.06287)
add(3, 'segment', Line((13, -3.9, 0), (18.0125, 2.86023, 0)), color=Color.from_hex("#ce4095"), width=0.06287)
add(3, 'point', Point(18.0125, 2.86023, 0), color=Color.from_hex("#ffffff"), width=0.34928)
add(3, 'label', Point(16.4125, 3.86023, 0), text='o1')
add(3, 'segment', Line((22.4682, -0.819666, 0), (13, 7, 0)), color=Color.from_hex("#ce4095"), width=0.06287)
add(3, 'segment', Line((13, -3.9, 0), (22.4682, -0.819666, 0)), color=Color.from_hex("#ce4095"), width=0.06287)
add(3, 'point', Point(22.4682, -0.819666, 0), color=Color.from_hex("#ffffff"), width=0.34928)
add(3, 'label', Point(20.8682, 0.180334, 0), text='o2')
add(3, 'segment', Line((30.3599, -7.33726, 0), (13, 7, 0)), color=Color.from_hex("#ce4095"), width=0.06287)
add(3, 'segment', Line((13, -3.9, 0), (30.3599, -7.33726, 0)), color=Color.from_hex("#ce4095"), width=0.06287)
add(3, 'point', Point(30.3599, -7.33726, 0), color=Color.from_hex("#ffffff"), width=0.34928)
add(3, 'label', Point(28.7599, -6.33726, 0), text='o3')
add(3, 'segment', Line((20.4293, 0.864227, 0), (13, 7, 0)), color=Color.from_hex("#e07a26"), width=0.134237)
add(3, 'segment', Line((13, -3.9, 0), (20.4293, 0.864227, 0)), color=Color.from_hex("#e07a26"), width=0.134237)
add(3, 'polyline', Polyline([(20.4293, 0.864227, 0), (13, 1.54818, 0)]), color=Color.from_hex("#e07a26"), dash=0.3481)
add(3, 'point', Point(20.4293, 0.864227, 0), color=Color.from_hex("#ffffff"), width=0.4366)
add(3, 'label', Point(22.2293, -0.335773, 0), color=Color.from_hex("#e07a26"), text='o')

# step 4 — a) All three poles on one line
add(4, 'polyline', Polyline([(11.4579, 8.27358, 0), (31.5049, -8.28292, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3481)
add(4, 'label', Point(27.9918, -8.67256, 0), color=Color.from_hex("#aaaaaa"), text='member 1 shared, all the poles on this line')
add(4, 'polyline', Polyline([(18.0125, 2.86023, 0), (13, 1.54818, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3481)
add(4, 'polyline', Polyline([(22.4682, -0.819666, 0), (13, 1.54818, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3481)
add(4, 'polyline', Polyline([(30.3599, -7.33726, 0), (13, 1.54818, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3481)
add(4, 'label', Point(16, -9.6, 0), color=Color.from_hex("#ce4095"), text='three closing lines, three poles — and one i')


if __name__ == "__main__":
    print("EX X.3 — the closing string, and the two things that refuse to move —", len(ops), "operations")
