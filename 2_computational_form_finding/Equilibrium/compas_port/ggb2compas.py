#!/usr/bin/env python3
"""
GeoGebra -> COMPAS transpiler for the eQUILIBRIUM graphic-statics applets.

Approach (see NOTES.md): every GeoGebra object caches its *evaluated* state in
geogebra.xml, so we do NOT re-implement GeoGebra's kernel (Intersect, Mirror,
the custom statics macros, expression evaluation...). Instead we read the cached
geometry of every *visible* object and emit a self-contained COMPAS script that
rebuilds the exact drawing and opens it in compas_viewer.

  point      <coords x y z>            -> cartesian (x/z, y/z)
  segment    Segment[A,B] inputs       -> Line(A,B)
  line       <coords a b c> (implicit) -> clip a*x+b*y+c=0 to bbox
  ray        Ray[A,B] + <coords>       -> half line, clipped
  vector     <startPoint> + <coords>   -> arrow tail->tip
  conic      <matrix A0..A5>           -> circle (center,radius) or sampled conic
  conicpart  CircleArc/Semicircle/...  -> Arc
  polyline   PolyLine[...] inputs      -> Polyline
  polygon    Polygon[...] inputs       -> Polygon (filled)

Appearance: <objColor r g b alpha>, <lineStyle thickness>, visibility from
<show object> gated by <condition showObject>.
"""
import os, re, glob, math, xml.etree.ElementTree as ET

EPS = 1e-9

# ----------------------------------------------------------------------------- parsing
class Ggb:
    def __init__(self, xml_path):
        self.root = ET.parse(xml_path).getroot()
        self.cons = self.root.find("construction")
        self.elem = {}      # label -> <element>
        self.cmd  = {}      # output label -> (name, [input tokens])
        self.order = []     # labels in construction order (renderables)
        self.bools = {}     # boolean label -> bool
        self.nums  = {}     # numeric label -> float
        self._scan()

    def _scan(self):
        pending_inputs = None
        for ch in self.cons:
            if ch.tag == "command":
                name = ch.get("name")
                inp = ch.find("input")
                out = ch.find("output")
                tokens = []
                if inp is not None:
                    tokens = [inp.get(f"a{i}") for i in range(50) if inp.get(f"a{i}") is not None]
                outs = []
                if out is not None:
                    outs = [out.get(f"a{i}") for i in range(50) if out.get(f"a{i}")]
                for ol in outs:
                    self.cmd[ol] = (name, tokens, outs)
            elif ch.tag == "element":
                lbl = ch.get("label"); typ = ch.get("type")
                self.elem[lbl] = ch
                self.order.append(lbl)
                if typ == "boolean":
                    v = ch.find("value")
                    self.bools[lbl] = (v is not None and v.get("val") == "true")
                elif typ == "numeric":
                    v = ch.find("value")
                    if v is not None:
                        try: self.nums[lbl] = float(v.get("val"))
                        except: pass

    # --- geometry accessors ----------------------------------------------------
    def point_xy(self, label):
        """Cartesian (x,y) of a point label, or None if undefined / at infinity."""
        el = self.elem.get(label)
        if el is None or el.get("type") != "point":
            return None
        c = el.find("coords")
        if c is None:
            return None
        try:
            x, y, z = float(c.get("x")), float(c.get("y")), float(c.get("z"))
        except (TypeError, ValueError):
            return None
        if abs(z) < EPS:
            return None
        cx, cy = x / z, y / z
        if not (math.isfinite(cx) and math.isfinite(cy)):
            return None
        return (cx, cy)

    def num(self, label):
        if label in self.nums:
            return self.nums[label]
        try:
            return float(label)
        except (TypeError, ValueError):
            return None

    def visible(self, el):
        sh = el.find("show")
        if sh is None or sh.get("object") != "true":
            return False
        cond = el.find("condition")
        if cond is not None:
            c = cond.get("showObject")
            if c in self.bools:
                return self.bools[c]
            # simple "label" negation or expression -> default visible
        return True

    def style(self, el):
        col = el.find("objColor")
        r = g = b = 0.0; a = 1.0
        if col is not None:
            r = float(col.get("r", 0)) / 255.0
            g = float(col.get("g", 0)) / 255.0
            b = float(col.get("b", 0)) / 255.0
            a = float(col.get("alpha", 1) or 1)
        ls = el.find("lineStyle")
        lw = 1.0
        if ls is not None and ls.get("thickness") is not None:
            lw = max(1.0, float(ls.get("thickness")) * 0.6)
        ps = el.find("pointSize")
        pt = 6.0
        if ps is not None and ps.get("val") is not None:
            pt = float(ps.get("val")) * 1.5
        return (round(r, 4), round(g, 4), round(b, 4), round(a, 4), round(lw, 2), round(pt, 2))


# ----------------------------------------------------------------------------- conic math
def conic_circle(matrix):
    """Return (cx,cy,r) if the conic matrix is a circle, else None."""
    A0 = float(matrix.get("A0")); A1 = float(matrix.get("A1"))
    A2 = float(matrix.get("A2")); A3 = float(matrix.get("A3"))
    A4 = float(matrix.get("A4")); A5 = float(matrix.get("A5"))
    if abs(A0 - A1) > 1e-6 or abs(A3) > 1e-6 or abs(A0) < EPS:
        return None
    cx, cy = -A4 / A0, -A5 / A0
    r2 = (A4 * A4 + A5 * A5) / (A0 * A0) - A2 / A0
    if r2 <= 0:
        return None
    return (cx, cy, math.sqrt(r2))


def conic_sample(matrix, box, n=160):
    """Sample a general conic A0x^2+A1y^2+A2+2A3xy+2A4x+2A5y=0 inside box -> list of polylines."""
    A0 = float(matrix.get("A0")); A1 = float(matrix.get("A1"))
    A2 = float(matrix.get("A2")); A3 = float(matrix.get("A3"))
    A4 = float(matrix.get("A4")); A5 = float(matrix.get("A5"))
    x0, y0, x1, y1 = box
    branch_lo, branch_hi = [], []
    for i in range(n + 1):
        x = x0 + (x1 - x0) * i / n
        a = A1
        b = 2 * A3 * x + 2 * A5
        c = A0 * x * x + 2 * A4 * x + A2
        if abs(a) < EPS:
            if abs(b) < EPS:
                continue
            y = -c / b
            if y0 - 1 <= y <= y1 + 1:
                branch_lo.append((x, y))
            continue
        disc = b * b - 4 * a * c
        if disc < 0:
            continue
        sq = math.sqrt(disc)
        ya = (-b - sq) / (2 * a)
        yb = (-b + sq) / (2 * a)
        if y0 - 1 <= ya <= y1 + 1:
            branch_lo.append((x, ya))
        if y0 - 1 <= yb <= y1 + 1:
            branch_hi.append((x, yb))
    out = [b for b in (branch_lo, branch_hi) if len(b) > 1]
    return out


def clip_line(a, b, c, box):
    """Clip line a*x+b*y+c=0 to box -> ((x1,y1),(x2,y2)) or None."""
    x0, y0, x1, y1 = box
    pts = []
    if abs(b) > EPS:
        for x in (x0, x1):
            y = -(a * x + c) / b
            if y0 - EPS <= y <= y1 + EPS:
                pts.append((x, y))
    if abs(a) > EPS:
        for y in (y0, y1):
            x = -(b * y + c) / a
            if x0 - EPS <= x <= x1 + EPS:
                pts.append((x, y))
    # dedup
    uniq = []
    for p in pts:
        if all(abs(p[0] - q[0]) > 1e-6 or abs(p[1] - q[1]) > 1e-6 for q in uniq):
            uniq.append(p)
    if len(uniq) >= 2:
        return uniq[0], uniq[1]
    return None


def circumcenter(A, B, C):
    ax, ay = A; bx, by = B; cx, cy = C
    d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by))
    if abs(d) < EPS:
        return None
    ux = ((ax**2 + ay**2) * (by - cy) + (bx**2 + by**2) * (cy - ay) + (cx**2 + cy**2) * (ay - by)) / d
    uy = ((ax**2 + ay**2) * (cx - bx) + (bx**2 + by**2) * (ax - cx) + (cx**2 + cy**2) * (bx - ax)) / d
    return (ux, uy)


# ----------------------------------------------------------------------------- label -> python id
def pyid(label, used):
    s = label.replace("'", "_p").replace("{", "").replace("}", "").replace("\\", "")
    s = re.sub(r"[^0-9A-Za-z_]", "_", s)
    if not s or s[0].isdigit():
        s = "o_" + s
    base = s; k = 2
    while s in used:
        s = f"{base}_{k}"; k += 1
    used.add(s)
    return s


# ----------------------------------------------------------------------------- analyze one file
def analyze(xml_path):
    """Parse a geogebra.xml and return (box, needed_pts, instr, warnings)."""
    g = Ggb(xml_path)

    # bbox from all finite points (visible or not) + circle centers
    xs, ys = [], []
    for lbl, el in g.elem.items():
        if el.get("type") == "point":
            p = g.point_xy(lbl)
            if p:
                xs.append(p[0]); ys.append(p[1])
    if not xs:
        xs, ys = [0, 1], [0, 1]
    xmin, xmax = min(xs), max(xs)
    ymin, ymax = min(ys), max(ys)
    dx = (xmax - xmin) or 1.0; dy = (ymax - ymin) or 1.0
    pad = 0.08 * max(dx, dy)
    box = (xmin - pad, ymin - pad, xmax + pad, ymax + pad)

    instr = []        # geometry instructions
    needed_pts = {}   # label -> (x,y) for points we must emit as variables
    warnings = []

    def need(label):
        p = g.point_xy(label)
        if p is not None:
            needed_pts[label] = p
            return True
        return False

    for lbl in g.order:
        el = g.elem[lbl]
        typ = el.get("type")
        if typ in ("text", "button", "image", "list", "angle", "locus", "function", "boolean", "numeric"):
            continue
        if not g.visible(el):
            continue
        st = g.style(el)

        if typ == "point":
            p = g.point_xy(lbl)
            if p is None:
                continue
            needed_pts[lbl] = p
            instr.append(("point", lbl, st))

        elif typ == "segment":
            cmd = g.cmd.get(lbl)
            cname = cmd[0] if cmd else None
            if cname == "Polygon":
                # side of a polygon: drawn by the Polygon itself when visible
                outs = cmd[2] if len(cmd) > 2 else []
                poly_lbl = outs[0] if outs else None
                poly_el = g.elem.get(poly_lbl)
                if poly_el is not None and g.visible(poly_el):
                    pass  # already rendered as polygon edges
                else:
                    pe = poly_side_endpoints(g, lbl)
                    if pe and need(pe[0]) and need(pe[1]):
                        instr.append(("seg", ("L", pe[0]), ("L", pe[1]), st))
                continue
            ep = seg_endpoints(g, lbl)
            if ep:
                r1, r2 = ep
                for r in (r1, r2):
                    if r[0] == "L":
                        need(r[1])
                instr.append(("seg", r1, r2, st))
            else:
                # macro/derived glyph segment: clip cached line eqn to a local box
                c = el.find("coords")
                anchor = None; h = 0.6
                if cmd:
                    for t in cmd[1]:
                        p = g.point_xy(t)
                        if p and anchor is None:
                            anchor = p
                        v = g.num(t)
                        if v is not None:
                            h = max(h, abs(v) * 2.0)
                if c is not None and anchor is not None:
                    lb = (anchor[0] - h, anchor[1] - h, anchor[0] + h, anchor[1] + h)
                    seg = clip_line(float(c.get("x")), float(c.get("y")), float(c.get("z")), lb)
                    if seg:
                        instr.append(("line", seg[0], seg[1], st))
                    else:
                        warnings.append(f"segment {lbl}: endpoints unresolved ({cname})")
                else:
                    warnings.append(f"segment {lbl}: endpoints unresolved ({cname})")

        elif typ == "line":
            c = el.find("coords")
            if c is None:
                continue
            seg = clip_line(float(c.get("x")), float(c.get("y")), float(c.get("z")), box)
            if seg:
                instr.append(("line", seg[0], seg[1], st))

        elif typ == "ray":
            cmd = g.cmd.get(lbl)
            start = None
            if cmd and len(cmd[1]) >= 1:
                start = g.point_xy(cmd[1][0])
            c = el.find("coords")
            if c is None or start is None:
                # clip like a line
                if c is not None:
                    seg = clip_line(float(c.get("x")), float(c.get("y")), float(c.get("z")), box)
                    if seg:
                        instr.append(("line", seg[0], seg[1], st))
                continue
            seg = clip_line(float(c.get("x")), float(c.get("y")), float(c.get("z")), box)
            if seg:
                # keep the half starting at `start` going toward the farther clip point
                p1, p2 = seg
                far = p2 if (dist(start, p2) > dist(start, p1)) else p1
                instr.append(("line", start, far, st))

        elif typ == "vector":
            c = el.find("coords")
            sp = el.find("startPoint")
            if c is None:
                continue
            vx, vy = float(c.get("x")), float(c.get("y"))
            tail = (0.0, 0.0)
            if sp is not None and sp.get("exp") in g.elem:
                tp = g.point_xy(sp.get("exp"))
                if tp: tail = tp
            elif sp is not None and sp.get("x") is not None:
                tail = (float(sp.get("x")), float(sp.get("y")))
            tip = (tail[0] + vx, tail[1] + vy)
            if all(math.isfinite(v) for v in (tail[0], tail[1], tip[0], tip[1])):
                instr.append(("vector", tail, tip, st))

        elif typ == "polyline":
            cmd = g.cmd.get(lbl)
            if cmd:
                pts = [t for t in cmd[1] if need(t)]
                if len(pts) >= 2:
                    instr.append(("polyline", pts, st))

        elif typ == "polygon":
            cmd = g.cmd.get(lbl)
            if cmd:
                # Polygon[A,B,C,...] : leading args are the vertices (points)
                pts = [t for t in cmd[1] if g.point_xy(t) is not None]
                for t in pts: need(t)
                if len(pts) >= 3:
                    instr.append(("polygon", pts, st))

        elif typ == "conic":
            m = el.find("matrix")
            if m is None:
                continue
            circ = conic_circle(m)
            if circ:
                instr.append(("circle", circ, st))
            else:
                for branch in conic_sample(m, box):
                    instr.append(("conic", branch, st))

        elif typ == "conicpart":
            arc = build_arc(g, lbl)
            pts = sample_arc(arc) if arc else None
            if pts:
                instr.append(("polyline_lit", pts, st))
            else:
                warnings.append(f"arc {lbl}: unresolved")

    return box, needed_pts, instr, warnings


def transpile(xml_path, title, source):
    box, needed_pts, instr, warnings = analyze(xml_path)
    return emit(title, source, box, needed_pts, instr, warnings)


def dist(a, b):
    return math.hypot(a[0] - b[0], a[1] - b[1])


def sample_arc(arc, n=64):
    """(center,r,start,end) -> list of (x,y) points along the arc (CCW)."""
    if arc is None:
        return None
    (cx, cy), r, sa, ea = arc
    if not all(math.isfinite(v) for v in (cx, cy, r, sa, ea)) or r <= 0:
        return None
    span = ea - sa
    if abs(span) < 1e-9:
        return None
    pts = []
    for i in range(n + 1):
        t = sa + span * i / n
        pts.append((cx + r * math.cos(t), cy + r * math.sin(t)))
    return pts


def eval_cond(g, expr):
    """Best-effort eval of a GeoGebra boolean expression over cached coords.
    Supports x(P)/y(P), numeric labels, numbers, < > <= >= ==, and/or (∧/∨)."""
    if expr is None:
        return True
    try:
        s = expr.replace("∧", " and ").replace("∨", " or ")
        s = s.replace("≤", "<=").replace("≥", ">=").replace("≠", "!=")

        def repl_xy(m):
            fn, lbl = m.group(1), m.group(2)
            p = g.point_xy(lbl)
            if p is None:
                raise ValueError("undef")
            return repr(p[0] if fn == "x" else p[1])
        s = re.sub(r"\b([xy])\(\s*([^()]+?)\s*\)", repl_xy, s)

        def repl_lbl(m):
            lbl = m.group(0)
            if lbl in ("and", "or", "not"):
                return lbl
            if lbl in g.nums:
                return repr(g.nums[lbl])
            return lbl
        s = re.sub(r"[A-Za-z_][A-Za-z0-9_]*", repl_lbl, s)
        s = re.sub(r"(?<![<>=!])=(?!=)", "==", s)
        return bool(eval(s, {"__builtins__": {}}, {}))
    except Exception:
        return True  # default to the THEN branch


_NUM = r"[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?"
_LBL = r"[A-Za-z_][\w'{}\\]*"


def resolve_point_ref(g, token):
    """Resolve a point expression to a ref: ('L',label) for an existing point,
    or ('C',(x,y)) for a computed literal. None if not a point expression."""
    if token is None:
        return None
    t = token.strip()
    if re.match(rf"^{_LBL}$", t) and g.point_xy(t) is not None:
        return ("L", t)
    m = re.match(rf"^\(\s*({_NUM})\s*,\s*({_NUM})\s*\)$", t)
    if m:
        return ("C", (float(m.group(1)), float(m.group(2))))
    m = re.match(rf"^({_LBL})\s*([+\-])\s*\(\s*({_NUM})\s*,\s*({_NUM})\s*\)$", t)
    if m:
        p = g.point_xy(m.group(1))
        if p:
            s = 1.0 if m.group(2) == "+" else -1.0
            return ("C", (p[0] + s * float(m.group(3)), p[1] + s * float(m.group(4))))
    m = re.match(rf"^Midpoint\[\s*({_LBL})\s*,\s*({_LBL})\s*\]$", t)
    if m:
        a, b = g.point_xy(m.group(1)), g.point_xy(m.group(2))
        if a and b:
            return ("C", ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2))
    m = re.match(rf"^Intersect\[\s*({_LBL})\s*,\s*({_LBL})\s*(?:,\s*\d+\s*)?\]$", t)
    if m:
        e1, e2 = line_eqn(g, m.group(1)), line_eqn(g, m.group(2))
        if e1 and e2:
            p = intersect_lines(e1, e2)
            if p:
                return ("C", p)
    return None


def line_eqn(g, label):
    """(a,b,c) of the supporting line a*x+b*y+c=0 for a line/ray/segment label."""
    el = g.elem.get(label)
    if el is None or el.get("type") not in ("line", "ray", "segment"):
        return None
    c = el.find("coords")
    if c is None:
        return None
    try:
        return (float(c.get("x")), float(c.get("y")), float(c.get("z")))
    except (TypeError, ValueError):
        return None


def intersect_lines(e1, e2):
    a1, b1, c1 = e1; a2, b2, c2 = e2
    d = a1 * b2 - a2 * b1
    if abs(d) < EPS:
        return None
    x, y = (b1 * c2 - b2 * c1) / d, (a2 * c1 - a1 * c2) / d
    if not (math.isfinite(x) and math.isfinite(y)):
        return None
    return (x, y)


def _parse_seg_expr(token):
    """'Segment[A, B]' -> ('A','B'); a bare label -> (label,); else None."""
    if token is None:
        return None
    m = re.match(r"\s*Segment\[\s*([^,\]]+?)\s*,\s*([^,\]]+?)\s*\]\s*$", token)
    if m:
        return (m.group(1).strip(), m.group(2).strip())
    if re.match(rf"^{_LBL}$", token.strip()):
        return (token.strip(),)
    return None


def seg_endpoints(g, lbl, depth=0):
    """Resolve a segment to two endpoint refs, following Segment[...] and If[...]."""
    if depth > 6:
        return None
    cmd = g.cmd.get(lbl)
    if not cmd:
        return None
    name, ins = cmd[0], cmd[1]
    if name == "Segment" and len(ins) >= 2:
        r1, r2 = resolve_point_ref(g, ins[0]), resolve_point_ref(g, ins[1])
        return (r1, r2) if r1 and r2 else None
    if name == "If" and len(ins) >= 2:
        choose_then = eval_cond(g, ins[0])
        branch = ins[1] if (choose_then or len(ins) < 3) else ins[2]
        parsed = _parse_seg_expr(branch)
        if parsed is None:
            return None
        if len(parsed) == 2:
            r1, r2 = resolve_point_ref(g, parsed[0]), resolve_point_ref(g, parsed[1])
            return (r1, r2) if r1 and r2 else None
        return seg_endpoints(g, parsed[0], depth + 1)
    return None


def poly_side_endpoints(g, lbl):
    """If `lbl` is a side segment of a Polygon, return its two vertex labels."""
    cmd = g.cmd.get(lbl)
    if not cmd or cmd[0] != "Polygon" or len(cmd) < 3:
        return None
    name, ins, outs = cmd
    verts = [t for t in ins if g.point_xy(t) is not None]
    if len(verts) < 3 or lbl not in outs:
        return None
    j = outs.index(lbl) - 1   # outs[0] is the polygon itself; sides follow
    if j < 0 or j >= len(verts):
        return None
    return (verts[j], verts[(j + 1) % len(verts)])


def reflect_point_line(p, eqn):
    a, b, c = eqn
    n2 = a * a + b * b
    if n2 < EPS:
        return p
    d = (a * p[0] + b * p[1] + c) / n2
    return (p[0] - 2 * a * d, p[1] - 2 * b * d)


def build_arc(g, lbl, depth=0):
    if depth > 6:
        return None
    cmd = g.cmd.get(lbl)
    if not cmd:
        return None
    name, ins = cmd[0], cmd[1]
    if name == "Mirror" and len(ins) >= 2:
        src = build_arc(g, ins[0], depth + 1)
        if src is None:
            return None
        (cen, r, sa, ea) = src
        eqn = line_eqn(g, ins[1])
        if eqn is not None:                       # reflection across a line
            cen2 = reflect_point_line(cen, eqn)
            phi = math.atan2(-eqn[0], eqn[1])     # line direction angle
            nsa, nea = 2 * phi - ea, 2 * phi - sa  # orientation reverses
            while nea < nsa:
                nea += 2 * math.pi
            return (cen2, r, nsa, nea)
        mp = g.point_xy(ins[1])
        if mp is not None:                        # point reflection (180°)
            cen2 = (2 * mp[0] - cen[0], 2 * mp[1] - cen[1])
            return (cen2, r, sa + math.pi, ea + math.pi)
        return None
    P = [g.point_xy(t) for t in ins[:3]]
    if name in ("CircleArc", "CircularArc") and len(ins) >= 3 and P[0] and P[1] and P[2]:
        c, a, b = P[0], P[1], P[2]
        r = dist(c, a)
        sa = math.atan2(a[1] - c[1], a[0] - c[0])
        ea = math.atan2(b[1] - c[1], b[0] - c[0])
        while ea < sa:
            ea += 2 * math.pi
        return (c, r, sa, ea)
    if name == "Semicircle" and len(ins) >= 2 and P[0] and P[1]:
        a, b = P[0], P[1]
        c = ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2)
        r = dist(a, b) / 2
        sa = math.atan2(a[1] - c[1], a[0] - c[0])
        return (c, r, sa, sa + math.pi)
    if name in ("CircumcircleArc", "CircumcircularArc") and len(ins) >= 3 and all(P):
        a, b, d = P
        c = circumcenter(a, b, d)
        if c is None:
            return None
        r = dist(c, a)
        sa = math.atan2(a[1] - c[1], a[0] - c[0])
        ea = math.atan2(d[1] - c[1], d[0] - c[0])
        mb = math.atan2(b[1] - c[1], b[0] - c[0])
        # ensure CCW arc sa->ea passes through b
        def norm(t):
            while t < sa: t += 2 * math.pi
            return t
        if not (sa < norm(mb) < norm(ea)):
            sa, ea = ea, sa + 2 * math.pi if ea < sa else ea
        while ea < sa:
            ea += 2 * math.pi
        return (c, r, sa, ea)
    return None


# ----------------------------------------------------------------------------- emit python
def col(st):
    r, g, b, a = st[0], st[1], st[2], st[3]
    return f"Color({r}, {g}, {b})", a


def emit(title, source, box, pts, instr, warnings):
    L = []
    L.append('"""')
    L.append(f"COMPAS translation of GeoGebra applet: {title}")
    L.append(f"Source: {source}")
    L.append("Auto-generated from geogebra.xml (cached evaluated state).")
    L.append("Sliders/interactions are baked to their saved values; run to view in compas_viewer.")
    L.append('"""')
    L.append("from compas.geometry import Point, Line, Polyline, Polygon, Circle, Arc, Frame")
    L.append("from compas.colors import Color")
    L.append("from compas_viewer import Viewer")
    L.append("")
    L.append("viewer = Viewer()")
    L.append("S = viewer.scene")
    L.append("")

    used = {"viewer", "S", "Point", "Line", "Polyline", "Polygon",
            "Circle", "Arc", "Frame", "Color", "Viewer"}
    name_of = {}
    if pts:
        L.append("# --- points (GeoGebra labels preserved) ---")
        for lbl, (x, y) in pts.items():
            nm = pyid(lbl, used)
            name_of[lbl] = nm
            L.append(f"{nm} = Point({round(x,6)}, {round(y,6)}, 0.0)  # {lbl}")
        L.append("")

    def P(lbl):
        return name_of[lbl]

    def lit(p):
        return f"Point({round(p[0],6)}, {round(p[1],6)}, 0.0)"

    L.append("# --- geometry ---")
    for ins in instr:
        kind = ins[0]
        if kind == "point":
            lbl, st = ins[1], ins[2]
            c, _ = col(st)
            L.append(f"S.add({P(lbl)}, pointcolor={c}, pointsize={st[5]})")
        elif kind == "seg":
            r1, r2, st = ins[1], ins[2], ins[3]
            c, _ = col(st)
            e1 = P(r1[1]) if r1[0] == "L" else lit(r1[1])
            e2 = P(r2[1]) if r2[0] == "L" else lit(r2[1])
            L.append(f"S.add(Line({e1}, {e2}), linecolor={c}, linewidth={st[4]})")
        elif kind == "line":
            p1, p2, st = ins[1], ins[2], ins[3]
            c, _ = col(st)
            L.append(f"S.add(Line({lit(p1)}, {lit(p2)}), linecolor={c}, linewidth={st[4]})")
        elif kind == "vector":
            tail, tip, st = ins[1], ins[2], ins[3]
            c, _ = col(st)
            L.append(f"S.add(Line({lit(tail)}, {lit(tip)}), linecolor={c}, linewidth={st[4]})  # vector")
            # arrowhead
            ang = math.atan2(tip[1] - tail[1], tip[0] - tail[0])
            h = 0.04 * max(box[2] - box[0], box[3] - box[1])
            for s in (+1, -1):
                hx = tip[0] - h * math.cos(ang + s * 0.4)
                hy = tip[1] - h * math.sin(ang + s * 0.4)
                L.append(f"S.add(Line({lit(tip)}, {lit((hx,hy))}), linecolor={c}, linewidth={st[4]})")
        elif kind == "polyline":
            labels, st = ins[1], ins[2]
            c, _ = col(st)
            arr = "[" + ", ".join(P(l) for l in labels) + "]"
            L.append(f"S.add(Polyline({arr}), linecolor={c}, linewidth={st[4]})")
        elif kind == "polygon":
            labels, st = ins[1], ins[2]
            c, a = col(st)
            arr = "[" + ", ".join(P(l) for l in labels) + "]"
            fc = f"Color({st[0]}, {st[1]}, {st[2]})"
            L.append(f"S.add(Polygon({arr}), linecolor={c}, facecolor={fc}, "
                     f"linewidth={st[4]}, opacity={max(0.15, a)})")
        elif kind == "circle":
            (cx, cy, r), st = ins[1], ins[2]
            c, _ = col(st)
            L.append(f"S.add(Circle.from_point_and_radius(Point({round(cx,6)}, {round(cy,6)}, 0.0), {round(r,6)}), "
                     f"linecolor={c}, linewidth={st[4]})")
        elif kind in ("conic", "polyline_lit"):
            branch, st = ins[1], ins[2]
            c, _ = col(st)
            arr = "[" + ", ".join(lit(p) for p in branch) + "]"
            tag = "conic" if kind == "conic" else "arc"
            L.append(f"S.add(Polyline({arr}), linecolor={c}, linewidth={st[4]})  # {tag}")
        elif kind == "arc":
            (cen, r, sa, ea), st = ins[1], ins[2]
            c, _ = col(st)
            L.append(f"S.add(Arc({round(r,6)}, {round(sa,6)}, {round(ea,6)}, "
                     f"frame=Frame(Point({round(cen[0],6)}, {round(cen[1],6)}, 0.0), [1,0,0], [0,1,0])), "
                     f"linecolor={c}, linewidth={st[4]})")

    if warnings:
        L.append("")
        L.append("# transpiler notes:")
        for w in warnings[:30]:
            L.append(f"#   - {w}")

    L.append("")
    L.append('if __name__ == "__main__":')
    L.append("    viewer.show()")
    L.append("")
    return "\n".join(L), len(instr), warnings


# ----------------------------------------------------------------------------- driver
def main(only=None):
    ROOT = "C:/brg/Teaching/2_computational_form_finding/Equilibrium"
    import json
    man = json.load(open(f"{ROOT}/MANIFEST.json", encoding="utf-8"))
    titles = {d["view"]: d["title"] for d in man["drawings"]}
    xmls = sorted(glob.glob(f"{ROOT}/drawings/view_*/applet_0/geogebra.xml"))
    summary = []
    for xp in xmls:
        m = re.search(r"view_(\d+)", xp)
        n = int(m.group(1))
        if only and n not in only:
            continue
        title = titles.get(n, f"view {n}")
        source = f"https://block.arch.ethz.ch/eq/drawing/view/{n}"
        try:
            code, nobj, warns = transpile(xp, title, source)
        except Exception as e:
            import traceback
            print(f"view_{n}: ERROR {e}")
            traceback.print_exc()
            summary.append((n, "ERROR", 0, str(e)))
            continue
        outdir = os.path.dirname(os.path.dirname(xp))
        outpath = os.path.join(outdir, f"view_{n}_compas.py")
        with open(outpath, "w", encoding="utf-8") as f:
            f.write(code)
        summary.append((n, title, nobj, len(warns)))
        print(f"view_{n:>2}: {nobj:>4} objects, {len(warns):>2} warns  [{title[:42]}]")
    return summary


if __name__ == "__main__":
    import sys
    only = set(int(x) for x in sys.argv[1:]) if len(sys.argv) > 1 else None
    main(only)
