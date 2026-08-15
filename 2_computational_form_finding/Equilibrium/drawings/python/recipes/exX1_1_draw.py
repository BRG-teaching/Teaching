"""EX X.1 — a cable under two inclined loads, and how deep it has to hang

Auto-generated from ops/exX1_1.json — the drawing as literal COMPAS
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
add(0, 'label', Point(-2, 5.2, 0), text='form diagram 1:50')
add(0, 'label', Point(11.5, 14.9, 0), text='Kräfteplan — force diagram')
add(0, 'label', Point(13.5, -14.9, 0), text='Subsysteme — the four joints of a)')
add(0, 'label', Point(11.5, 13.75, 0), color=Color.from_hex("#aaaaaa"), text='1 unit ≙ 5 kN  (sheet: 1 cm ≙ 10 kN) · joints 1 unit ≙ 46 kN')

# step 1 — What is given
add(1, 'point', Point(-20.0296, -2.7, 0), color=Color.from_hex("#ffffff"), width=0.4366)
add(1, 'label', Point(-21.5296, -3.7, 0), text='IV')
add(1, 'segment', Line((-20.9296, -2.15, 0), (-21.5307, -2.75104, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(1, 'segment', Line((-20.3296, -2.15, 0), (-20.9307, -2.75104, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(1, 'segment', Line((-19.7296, -2.15, 0), (-20.3307, -2.75104, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(1, 'segment', Line((-19.1296, -2.15, 0), (-19.7307, -2.75104, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(1, 'segment', Line((-18.5296, -2.15, 0), (-19.1307, -2.75104, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(1, 'point', Point(-7.97037, -2.7, 0), color=Color.from_hex("#ffffff"), width=0.4366)
add(1, 'label', Point(-6.37038, -3.7, 0), text='III')
add(1, 'segment', Line((-8.87037, -2.15, 0), (-9.47142, -2.75104, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(1, 'segment', Line((-8.27037, -2.15, 0), (-8.87142, -2.75104, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(1, 'segment', Line((-7.67037, -2.15, 0), (-8.27142, -2.75104, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(1, 'segment', Line((-7.07038, -2.15, 0), (-7.67142, -2.75104, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(1, 'segment', Line((-6.47037, -2.15, 0), (-7.07142, -2.75104, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(1, 'polyline', Polyline([(-22.2296, -2.7, 0), (-5.77037, -2.7, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3481)
add(1, 'segment', Line((-20.0296, -2.7, 0), (-15.2871, -7.4425, 0)), color=Color.from_hex("#ce4095"), width=0.134237)
add(1, 'segment', Line((-15.2871, -7.4425, 0), (-11.6436, -6.37325, 0)), color=Color.from_hex("#ce4095"), width=0.134237)
add(1, 'segment', Line((-11.6436, -6.37325, 0), (-7.97037, -2.7, 0)), color=Color.from_hex("#ce4095"), width=0.134237)
add(1, 'point', Point(-15.2871, -7.4425, 0), color=Color.from_hex("#ffffff"), width=0.34928)
add(1, 'label', Point(-16.5871, -6.5425, 0), text='II')
add(1, 'point', Point(-11.6436, -6.37325, 0), color=Color.from_hex("#ffffff"), width=0.34928)
add(1, 'label', Point(-12.0436, -5.17325, 0), text='I')

# step 2 — The loads are inclined
add(2, 'polyline', Polyline([(-14.5527, -5.15765, 0), (-16.9643, -12.66, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3481)
add(2, 'polyline', Polyline([(-13.1458, -4.50153, 0), (-8.72405, -10.011, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3481)
add(2, 'arrow', Line((-16.0765, -8.13411, 0), (-16.964, -10.895, 0)), color=Color.from_hex("#3f9c20"), width=0.161424, head=(0.556488, 0.214949))
add(2, 'arrow', Line((-10.6593, -6.73724, 0), (-8.84409, -8.99891, 0)), color=Color.from_hex("#3f9c20"), width=0.161424, head=(0.556488, 0.214949))
add(2, 'label', Point(-18.65, -11.9602, 0), color=Color.from_hex("#3f9c20"), text='F₂d = 90 kN')
add(2, 'label', Point(-6.46512, -9.93681, 0), color=Color.from_hex("#3f9c20"), text='F₁d = 44 kN')
add(2, 'arrow', Line((-13.9997, 1.7, 0), (-13.9997, -1.8, 0)), color=Color.from_hex("#3f9c20"), width=0.116395, dash=0.3481, head=(0.376373, 0.161424))
add(2, 'label', Point(-11.0997, 1, 0), color=Color.from_hex("#3f9c20"), text='R = 120.0 kN')

# step 3 — a) The two reactions
add(3, 'arrow', Line((-20.0296, -2.7, 0), (-21.9388, -0.790812, 0)), color=Color.from_hex("#3f9c20"), width=0.116395, head=(0.376373, 0.161424))
add(3, 'label', Point(-22.8581, 0.128427, 0), color=Color.from_hex("#3f9c20"), text='A = 84.8')
add(3, 'arrow', Line((-7.97037, -2.7, 0), (-6.06119, -0.790812, 0)), color=Color.from_hex("#3f9c20"), width=0.116395, head=(0.376373, 0.161424))
add(3, 'label', Point(-5.14195, 0.128427, 0), color=Color.from_hex("#3f9c20"), text='B = 84.9')

# step 4 — a) Joint II closes the cable
add(4, 'label', Point(-16.5977, -4.01059, 0), color=Color.from_hex("#ce4095"), text='1: 84.8')
add(4, 'label', Point(-13.8878, -5.46857, 0), color=Color.from_hex("#ce4095"), text='2: 91.2')
add(4, 'label', Point(-10.8677, -3.47596, 0), color=Color.from_hex("#ce4095"), text='3: 84.9')
add(4, 'arrow', Line((10, 13, 0), (4.4915, -4.13641, 0)), color=Color.from_hex("#3f9c20"), width=0.161424, head=(0.556488, 0.214949))
add(4, 'arrow', Line((4.4915, -4.13641, 0), (9.99963, -10.9994, 0)), color=Color.from_hex("#3f9c20"), width=0.161424, head=(0.556488, 0.214949))
add(4, 'label', Point(3.84575, 3.4318, 0), color=Color.from_hex("#3f9c20"), text='F₂d 90')
add(4, 'label', Point(4.44557, -7.9679, 0), color=Color.from_hex("#3f9c20"), text='F₁d 44')
add(4, 'arrow', Line((10, 13, 0), (9.99963, -10.9994, 0)), color=Color.from_hex("#3f9c20"), width=0.116395, dash=0.3481, head=(0.376373, 0.161424))
add(4, 'label', Point(11.5998, 2.10031, 0), color=Color.from_hex("#3f9c20"), text='R 120')
add(4, 'point', Point(21.9986, 1.00137, 0), color=Color.from_hex("#ffffff"), width=0.34928)
add(4, 'label', Point(23.2986, 0.101371, 0), text='o')
add(4, 'segment', Line((21.9986, 1.00137, 0), (10, 13, 0)), color=Color.from_hex("#ce4095"), width=0.06287)
add(4, 'segment', Line((21.9986, 1.00137, 0), (4.4915, -4.13641, 0)), color=Color.from_hex("#ce4095"), width=0.06287)
add(4, 'segment', Line((21.9986, 1.00137, 0), (9.99963, -10.9994, 0)), color=Color.from_hex("#ce4095"), width=0.06287)
add(4, 'label', Point(13.6451, -3.06752, 0), color=Color.from_hex("#ce4095"), text='N_d,max = 91.2 (key: 92.2)')
add(4, 'circle', Circle(1.2, frame=Frame((4.5, -18.5, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#aaaaaa"))
add(4, 'label', Point(4.5, -22.4, 0), text='node IV')
add(4, 'arrow', Line((4.5, -18.5, 0), (5.8042, -19.8042, 0)), color=Color.from_hex("#ce4095"), width=0.116395, head=(0.376373, 0.161424))
add(4, 'label', Point(6.51131, -20.5113, 0), color=Color.from_hex("#ce4095"), text='1')
add(4, 'arrow', Line((4.5, -18.5, 0), (3.1958, -17.1958, 0)), color=Color.from_hex("#3f9c20"), width=0.116395, head=(0.376373, 0.161424))
add(4, 'label', Point(2.48869, -16.4887, 0), color=Color.from_hex("#3f9c20"), text='A')
add(4, 'arrow', Line((4.5, -18.5, 0), (4.5001, -18.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.116395, head=(0.376373, 0.161424))
add(4, 'circle', Circle(1.2, frame=Frame((11.5, -18.5, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#aaaaaa"))
add(4, 'label', Point(11.5, -22.4, 0), text='node II')
add(4, 'arrow', Line((11.5, -18.5, 0), (10.1958, -17.1958, 0)), color=Color.from_hex("#ce4095"), width=0.116395, head=(0.376373, 0.161424))
add(4, 'label', Point(9.48869, -16.4887, 0), color=Color.from_hex("#ce4095"), text='1')
add(4, 'arrow', Line((11.5, -18.5, 0), (13.4029, -17.9415, 0)), color=Color.from_hex("#ce4095"), width=0.116395, head=(0.376373, 0.161424))
add(4, 'label', Point(14.3625, -17.66, 0), color=Color.from_hex("#ce4095"), text='2')
add(4, 'arrow', Line((11.5, -18.5, 0), (10.9012, -20.3627, 0)), color=Color.from_hex("#3f9c20"), width=0.116395, head=(0.376373, 0.161424))
add(4, 'label', Point(10.5952, -21.3147, 0), color=Color.from_hex("#3f9c20"), text='F₂d')
add(4, 'circle', Circle(1.2, frame=Frame((18.5, -18.5, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#aaaaaa"))
add(4, 'label', Point(18.5, -22.4, 0), text='node I')
add(4, 'arrow', Line((18.5, -18.5, 0), (16.5971, -19.0585, 0)), color=Color.from_hex("#ce4095"), width=0.116395, head=(0.376373, 0.161424))
add(4, 'label', Point(15.6375, -19.34, 0), color=Color.from_hex("#ce4095"), text='2')
add(4, 'arrow', Line((18.5, -18.5, 0), (19.8045, -17.1955, 0)), color=Color.from_hex("#ce4095"), width=0.116395, head=(0.376373, 0.161424))
add(4, 'label', Point(20.5116, -16.4884, 0), color=Color.from_hex("#ce4095"), text='3')
add(4, 'arrow', Line((18.5, -18.5, 0), (19.0987, -19.246, 0)), color=Color.from_hex("#3f9c20"), width=0.116395, head=(0.376373, 0.161424))
add(4, 'label', Point(19.7246, -20.0259, 0), color=Color.from_hex("#3f9c20"), text='F₁d')
add(4, 'circle', Circle(1.2, frame=Frame((25.5, -18.5, 0), [1, 0, 0], [0, 1, 0])), color=Color.from_hex("#aaaaaa"))
add(4, 'label', Point(25.5, -22.4, 0), text='node III')
add(4, 'arrow', Line((25.5, -18.5, 0), (24.1955, -19.8045, 0)), color=Color.from_hex("#ce4095"), width=0.116395, head=(0.376373, 0.161424))
add(4, 'label', Point(23.4884, -20.5116, 0), color=Color.from_hex("#ce4095"), text='3')
add(4, 'arrow', Line((25.5, -18.5, 0), (26.8045, -17.1955, 0)), color=Color.from_hex("#3f9c20"), width=0.116395, head=(0.376373, 0.161424))
add(4, 'label', Point(27.5116, -16.4884, 0), color=Color.from_hex("#3f9c20"), text='B')
add(4, 'arrow', Line((25.5, -18.5, 0), (25.5001, -18.5, 0)), color=Color.from_hex("#aaaaaa"), width=0.116395, head=(0.376373, 0.161424))

# step 5 — b) Let it hang deeper
add(5, 'polyline', Polyline([(-20.0296, -2.7, 0), (-13.9999, -12.7344, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3481)
add(5, 'polyline', Polyline([(-7.97037, -2.7, 0), (-13.9999, -12.7344, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3481)
add(5, 'point', Point(-13.9999, -12.7344, 0), color=Color.from_hex("#ffffff"), width=0.30562)
add(5, 'label', Point(-15.6999, -11.8344, 0), color=Color.from_hex("#aaaaaa"), text='Q')
add(5, 'segment', Line((-13.9997, -2.7, 0), (-13.9999, -12.7344, 0)), color=Color.from_hex("#aaaaaa"), width=0.044604)
add(5, 'label', Point(-11.0999, -11.8344, 0), color=Color.from_hex("#aaaaaa"), text='h = 5.734 m')
add(5, 'segment', Line((-20.0296, -2.7, 0), (-15.9468, -9.49454, 0)), color=Color.from_hex("#ce4095"), width=0.134237)
add(5, 'label', Point(-19.3596, -6.92138, 0), color=Color.from_hex("#ce4095"), text='1′: 70.0')
add(5, 'segment', Line((-15.9468, -9.49454, 0), (-10.8052, -7.41785, 0)), color=Color.from_hex("#ce4095"), width=0.134237)
add(5, 'label', Point(-12.7768, -9.93975, 0), color=Color.from_hex("#ce4095"), text='2′: 68.6')
add(5, 'segment', Line((-10.8052, -7.41785, 0), (-7.97037, -2.7, 0)), color=Color.from_hex("#ce4095"), width=0.134237)
add(5, 'label', Point(-8.01636, -5.88301, 0), color=Color.from_hex("#ce4095"), text='3′: 70.0')
add(5, 'point', Point(-15.9468, -9.49454, 0), color=Color.from_hex("#ffffff"), width=0.34928)
add(5, 'point', Point(-10.8052, -7.41785, 0), color=Color.from_hex("#ffffff"), width=0.34928)
add(5, 'label', Point(-17.4468, -10.3945, 0), text='II′')
add(5, 'label', Point(-9.30525, -8.31785, 0), text='I′')
add(5, 'arrow', Line((-16.2222, -10.3514, 0), (-16.926, -12.541, 0)), color=Color.from_hex("#3f9c20"), width=0.161424, head=(0.556488, 0.214949))
add(5, 'arrow', Line((-10.2419, -8.11974, 0), (-8.80229, -9.91348, 0)), color=Color.from_hex("#3f9c20"), width=0.161424, head=(0.556488, 0.214949))
add(5, 'arrow', Line((-20.0296, -2.7, 0), (-21.9869, 0.557172, 0)), color=Color.from_hex("#3f9c20"), width=0.116395, head=(0.376373, 0.161424))
add(5, 'label', Point(-24.6899, 1.2286, 0), color=Color.from_hex("#3f9c20"), text='A′ = 70.0')
add(5, 'arrow', Line((-7.97037, -2.7, 0), (-6.01318, 0.557204, 0)), color=Color.from_hex("#3f9c20"), width=0.116395, head=(0.376373, 0.161424))
add(5, 'label', Point(-3.31017, 1.22864, 0), color=Color.from_hex("#3f9c20"), text='B′ = 70.0')
add(5, 'polyline', Polyline([(6.49981, 1.0003, 0), (27.4998, 1.0003, 0)]), color=Color.from_hex("#aaaaaa"), dash=0.3481)
add(5, 'point', Point(9.99981, 1.0003, 0), color=Color.from_hex("#ffffff"), width=0.30562)
add(5, 'label', Point(8.79981, 0.100305, 0), color=Color.from_hex("#aaaaaa"), text='i')
add(5, 'label', Point(22.9998, 3.4003, 0), color=Color.from_hex("#aaaaaa"), text='the closing line: every pole lands on it')
add(5, 'point', Point(17.2104, 1.00083, 0), color=Color.from_hex("#ffffff"), width=0.34928)
add(5, 'label', Point(16.7104, 2.40083, 0), text='o′')
add(5, 'segment', Line((17.2104, 1.00083, 0), (10, 13, 0)), color=Color.from_hex("#ce4095"), width=0.06287)
add(5, 'segment', Line((17.2104, 1.00083, 0), (4.4915, -4.13641, 0)), color=Color.from_hex("#ce4095"), width=0.06287)
add(5, 'segment', Line((17.2104, 1.00083, 0), (9.99963, -10.9994, 0)), color=Color.from_hex("#ce4095"), width=0.06287)


if __name__ == "__main__":
    print("EX X.1 — a cable under two inclined loads, and how deep it has to hang —", len(ops), "operations")
