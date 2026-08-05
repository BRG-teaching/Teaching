"""
Convert the ORIGINAL GeoGebra applets (drawings/view_N/applet_0/geogebra.xml)
into faithful step-replay web modules (web/views/view_N.js).

This replaces the old dump-based converter (kept as convert_legacy.py): the
view_N_compas.py dumps baked one frozen applet state -- wrong colors (step
highlights), wrong order (no step logic), no dashes, hidden helper lines and a
drawn frame. The applet XML has everything the replay needs:

  geometry   baked coordinates of the saved state (every point carries <coords>;
             derived objects resolve through their defining <command>)
  sequence   the applet's own `step` slider + per-element visibility conditions
             <condition showObject="... step ...">: form and force diagram
             appear IN SYNC, exactly as in the original application
  style      lineStyle dash types and thicknesses, dynamic colors evaluated at
             the final state (compression blue / tension red via GeoGebra's
             triangle-wave color mapping), snapped onto the video palette
  clean-up   objects with show=false (construction helpers, infinite lines)
             are never drawn -- no frame, no baked highlight orange, no noise

Usage (from drawings/):
    python3 web/tools/convert.py 2        # convert view_2
    python3 web/tools/convert.py 2 5 19   # several
"""

import math
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

DRAWINGS = Path(__file__).resolve().parents[2]
OUT = DRAWINGS / "web" / "views"

# palette of the reference video (same as view_1 / eqdraw.js PAL)
BLUE, RED, GREEN, ORANGE, PINK = 0x2563EB, 0xC02630, 0x51923D, 0xE07A26, 0xC23D88
BLACK, GREY, WHITE = 0x111111, 0xA0A0A0, 0xFFFFFF

SUB = str.maketrans("0123456789", "₀₁₂₃₄₅₆₇₈₉")


def pretty(name):
    """GeoGebra label C_2 / F_{1} -> C₂ / F₁."""
    m = re.fullmatch(r"(\w+?)_\{?(\d+)\}?", name)
    return m.group(1) + m.group(2).translate(SUB) if m else name


# ============================================================================
# GeoGebra expression evaluator (conditions, dynamic colors, texts)
# ============================================================================

TOKEN = re.compile(r"""
    \s*(?:
      (?P<num>\d+\.?\d*|\.\d+)
    | (?P<str>"[^"]*")
    | (?P<name>[A-Za-zα-ωΑ-Ωβγ][A-Za-z0-9α-ωΑ-Ω]*(?:_\{[^}]*\}|_[A-Za-z0-9])?)
    | (?P<op>≟|≠|≥|≤|∧|∨|¬|==|!=|>=|<=|[-+*/^()\[\],<>=!])
    )""", re.X)


def tokenize(src):
    out, i = [], 0
    while i < len(src):
        m = TOKEN.match(src, i)
        if not m or m.end() == i:
            if src[i].isspace():
                i += 1
                continue
            raise ValueError(f"bad token at {src[i:]!r}")
        i = m.end()
        for kind in ("num", "str", "name", "op"):
            if m.group(kind) is not None:
                out.append((kind, m.group(kind)))
                break
    out.append(("end", ""))
    return out


class Evaluator:
    """Tiny recursive-descent evaluator for the GGB expressions in the applets."""

    def __init__(self, symbols, points, fallback=None):
        self.sym = symbols          # name -> number | bool
        self.points = points        # name -> (x, y)
        self.fallback = fallback    # name -> value (e.g. segment label -> length)

    def eval(self, src):
        self.toks = tokenize(src)
        self.i = 0
        v = self.expr_or()
        if self.peek()[0] != "end":
            raise ValueError(f"trailing tokens in {src!r}")
        return v

    def peek(self):
        return self.toks[self.i]

    def take(self, val=None):
        t = self.toks[self.i]
        if val is not None and t[1] != val:
            raise ValueError(f"expected {val!r}, got {t[1]!r}")
        self.i += 1
        return t

    def expr_or(self):
        v = self.expr_and()
        while self.peek()[1] == "∨":
            self.take()
            v = bool(v) | bool(self.expr_and())
        return v

    def expr_and(self):
        v = self.expr_cmp()
        while self.peek()[1] == "∧":
            self.take()
            v = bool(v) & bool(self.expr_cmp())
        return v

    def expr_cmp(self):
        v = self.expr_add()
        ops = {"≟": lambda a, b: a == b, "==": lambda a, b: a == b, "=": lambda a, b: a == b,
               "≠": lambda a, b: a != b, "!=": lambda a, b: a != b,
               "≥": lambda a, b: a >= b, ">=": lambda a, b: a >= b,
               "≤": lambda a, b: a <= b, "<=": lambda a, b: a <= b,
               ">": lambda a, b: a > b, "<": lambda a, b: a < b}
        while self.peek()[1] in ops:
            op = self.take()[1]
            b = self.expr_add()
            av = v if not isinstance(v, bool) or op in ("≟", "==", "=", "≠", "!=") else v
            v = ops[op](av, b)
        return v

    def expr_add(self):
        v = self.expr_mul()
        while self.peek()[1] in ("+", "-"):
            op = self.take()[1]
            b = self.expr_mul()
            if isinstance(v, str) or isinstance(b, str):     # text concatenation
                v = self.fmt(v) + self.fmt(b)
            else:
                v = v + b if op == "+" else v - b
        return v

    def expr_mul(self):
        v = self.expr_unary()
        while True:
            t = self.peek()
            if t[1] in ("*", "/"):
                op = self.take()[1]
                b = self.expr_unary()
                v = v * b if op == "*" else v / b
            elif t[0] in ("num", "name") or t[1] == "(":     # implicit multiplication
                v = v * self.expr_unary()
            else:
                return v

    def expr_unary(self):
        t = self.peek()
        if t[1] == "-":
            self.take()
            return -self.expr_unary()
        if t[1] == "¬" or t[1] == "!":
            self.take()
            return not self.expr_unary()
        return self.expr_pow()

    def expr_pow(self):
        v = self.atom()
        if self.peek()[1] == "^":
            self.take()
            return v ** self.expr_unary()
        return v

    FUNCS = {"floor": math.floor, "abs": abs, "sqrt": math.sqrt, "sin": math.sin,
             "cos": math.cos, "tan": math.tan, "round": round}

    def atom(self):
        kind, val = self.take()
        if kind == "num":
            return float(val)
        if kind == "str":
            return val[1:-1]
        if kind == "op" and val == "(":
            v = self.expr_or()
            self.take(")")
            return v
        if kind == "name":
            if val == "If" and self.peek()[1] == "[":
                self.take("[")
                cond = self.expr_or()
                self.take(",")
                a = self.expr_or()
                b = None
                if self.peek()[1] == ",":
                    self.take(",")
                    b = self.expr_or()
                self.take("]")
                return a if cond else b
            if val in ("x", "y") and self.peek()[1] == "(":
                self.take("(")
                name = self.take()[1]
                self.take(")")
                p = self.points[name]
                return p[0] if val == "x" else p[1]
            if val in self.FUNCS and self.peek()[1] == "(":
                self.take("(")
                v = self.expr_or()
                self.take(")")
                return self.FUNCS[val](v)
            if val == "true":
                return True
            if val == "false":
                return False
            if val == "π" or val == "pi":
                return math.pi
            if val in self.sym:
                return self.sym[val]
            if self.fallback is not None:
                return self.fallback(val)
            raise ValueError(f"unknown symbol {val!r}")
        raise ValueError(f"unexpected token {val!r}")

    @staticmethod
    def fmt(v):
        """GeoGebra-style number formatting inside text concatenations."""
        if isinstance(v, str):
            return v
        if isinstance(v, bool):
            return "true" if v else "false"
        r = round(float(v), 2)
        return str(int(r)) if r == int(r) else f"{r:g}"


def ggb_component(value):
    """GeoGebra dynamic-color triangle wave (GeoElement.getRGBFromList)."""
    t = value / 2.0 - math.floor(value / 2.0)
    return 2.0 * (1.0 - t) if t > 0.5 else 2.0 * t


def snap_color(r, g, b, dynamic=False):
    """Snap an evaluated (0..1) rgb onto the video palette."""
    if r > 0.9 and g > 0.9 and b > 0.9:
        return WHITE
    if abs(r - g) < 0.06 and abs(g - b) < 0.06:
        return BLACK if r < 0.35 else GREY
    if dynamic and g < 0.2:                       # compression/tension wave
        return BLUE if b >= r else RED
    if b > 0.55 and r < 0.3 and g < 0.3:
        return BLUE
    if r > 0.55 and g < 0.25 and b < 0.25:
        return RED
    if g > 0.4 and r < 0.3 and b < 0.3:
        return GREEN
    if r > 0.85 and 0.25 < g < 0.75 and b < 0.25:
        return ORANGE
    if r > 0.8 and b > 0.55 and g < 0.4:
        return PINK
    return (round(r * 255) << 16) | (round(g * 255) << 8) | round(b * 255)


# ============================================================================
# geometry helpers
# ============================================================================

def clip_line(a, b, c, box):
    """Intersect line ax + by + c = 0 with box; None if outside."""
    (x0, y0), (x1, y1) = box
    pts = []
    if abs(b) > 1e-12:
        for x in (x0, x1):
            y = -(a * x + c) / b
            if y0 - 1e-9 <= y <= y1 + 1e-9:
                pts.append((x, y))
    if abs(a) > 1e-12:
        for y in (y0, y1):
            x = -(b * y + c) / a
            if x0 - 1e-9 <= x <= x1 + 1e-9:
                pts.append((x, y))
    uniq = []
    for p in pts:
        if all(abs(p[0] - q[0]) + abs(p[1] - q[1]) > 1e-6 for q in uniq):
            uniq.append(p)
    return (uniq[0], uniq[1]) if len(uniq) >= 2 else None


def clip_ray(tail, through, box):
    """Clip ray tail->through to box; returns (tail, end)."""
    (x0, y0), (x1, y1) = box
    dx, dy = through[0] - tail[0], through[1] - tail[1]
    tmax = math.inf
    for d, lo, hi, o in ((dx, x0, x1, tail[0]), (dy, y0, y1, tail[1])):
        if abs(d) > 1e-12:
            for bound in (lo, hi):
                t = (bound - o) / d
                if t > 1e-9:
                    tmax = min(tmax, t)
    if not math.isfinite(tmax):
        return tail, through
    return tail, (tail[0] + dx * tmax, tail[1] + dy * tmax)


# ============================================================================
# applet parsing
# ============================================================================

class Applet:
    def __init__(self, xml_path):
        self.root = ET.parse(xml_path).getroot()
        self.cons = self.root.find("construction")

        ev = self.root.find("euclidianView")
        size = ev.find("size")
        cs = ev.find("coordSystem")
        w, h = float(size.get("width")), float(size.get("height"))
        xz, yz = float(cs.get("xZero")), float(cs.get("yZero"))
        sx, sy = float(cs.get("scale")), float(cs.get("yscale") or cs.get("scale"))
        self.frame = ((-xz / sx, (yz - h) / sy), ((w - xz) / sx, yz / sy))

        self.cmd_of = {}                    # output label -> command element
        for c in self.cons.iter("command"):
            for lab in c.find("output").attrib.values():
                self.cmd_of[lab] = c

        self.exprs = {e.get("label"): e.get("exp") for e in self.cons.iter("expression")}

        self.elements = []                  # drawable candidates, construction order
        self.symbols = {}                   # numerics / booleans / angles (saved values)
        self.points = {}
        for el in self.cons.iter("element"):
            lab, typ = el.get("label"), el.get("type")
            if typ in ("numeric", "angle", "boolean"):
                v = el.find("value")
                if v is not None:
                    self.symbols[lab] = (float(v.get("val")) if typ != "boolean"
                                         else v.get("val") == "true")
                continue
            if typ in ("button", "image", "textfield", "checkbox"):
                continue
            if typ == "point":
                c = el.find("coords")
                if c is not None:
                    z = float(c.get("z") or 1) or 1
                    self.points[lab] = (float(c.get("x")) / z, float(c.get("y")) / z)
            self.elements.append(el)

        self.ev = Evaluator(self.symbols, self.points, self.length_of)

    def length_of(self, name):
        """Segment/vector labels used as numbers mean their length in GeoGebra."""
        cmd = self.cmd_of.get(name)
        if cmd is not None:
            geo = self.command_geometry(cmd)
            if geo is not None and geo[0] in ("seg", "ray"):
                return math.dist(geo[1][0], geo[1][1])
        raise ValueError(f"unknown symbol {name!r}")

    # ---- resolution ------------------------------------------------------

    def resolve_point(self, expr):
        expr = expr.strip()
        if expr in self.points:
            return self.points[expr]
        m = re.fullmatch(rf"Point\[?\(?\s*([-\d.eE]+)\s*,\s*([-\d.eE]+)\s*\)?\]?", expr)
        if m:
            return (float(m.group(1)), float(m.group(2)))
        m = re.fullmatch(r"Midpoint\[(.+)\]", expr)
        if m:
            args = split_args(m.group(1))
            if len(args) == 2:
                a, b = self.resolve_point(args[0]), self.resolve_point(args[1])
            else:
                cmd = self.cmd_of.get(args[0])
                geo = self.command_geometry(cmd) if cmd is not None else None
                if geo is None or geo[0] not in ("seg", "ray"):
                    raise ValueError(f"unresolvable midpoint {expr!r}")
                a, b = geo[1][0], geo[1][1]
            return ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2)
        raise ValueError(f"unresolvable point {expr!r}")

    def num(self, expr, extra=None):
        ev = self.ev
        if extra:
            ev = Evaluator({**self.symbols, **extra}, self.points, self.length_of)
        return ev.eval(expr)

    def command_geometry(self, cmd):
        """Baked geometry for a command output: kind + points."""
        name = cmd.get("name")
        args = [v for _, v in sorted(cmd.find("input").attrib.items())]
        if name in ("Segment", "Vector") and len(args) == 2:
            try:
                p0, p1 = self.resolve_point(args[0]), self.resolve_point(args[1])
            except ValueError:
                return None
            return ("seg", [p0, p1])
        if name == "Vector" and len(args) == 1:
            return ("seg", [(0.0, 0.0), self.resolve_point(args[0])])
        if name == "Ray" and len(args) == 2:
            return ("ray", [self.resolve_point(args[0]), self.resolve_point(args[1])])
        if name in ("PolyLine", "Polygon"):
            return ("pts", [self.resolve_point(a) for a in args])
        if name == "Circle" and len(args) == 2:
            c = self.resolve_point(args[0])
            try:
                r = self.resolve_point(args[1])
                r = math.dist(c, r)
            except ValueError:
                r = float(self.num(args[1]))
            return ("circle", [c, r])
        if name == "If" and len(args) == 3:
            cond = self.num(args[0])
            branch = args[1] if cond else args[2]
            m = re.fullmatch(r"(\w+)\[(.+)\]", branch.strip())
            if m:
                fake = ET.Element("command", {"name": m.group(1)})
                inp = ET.SubElement(fake, "input")
                for j, a in enumerate(split_args(m.group(2))):
                    inp.set(f"a{j}", a)
                return self.command_geometry(fake)
            return None
        if name == "internalForce":
            A, B = self.resolve_point(args[0]), self.resolve_point(args[1])
            C, D = self.resolve_point(args[2]), self.resolve_point(args[3])
            h = self.num(args[5]) * math.dist(C, D) / self.num(args[4])
            ux, uy = B[0] - A[0], B[1] - A[1]
            l = math.hypot(ux, uy) or 1e-9
            nx, ny = -uy / l * h, ux / l * h
            return ("pts", [(A[0] + nx, A[1] + ny), (A[0] - nx, A[1] - ny),
                            (B[0] - nx, B[1] - ny), (B[0] + nx, B[1] + ny)])
        return None


def split_args(text):
    parts, depth, cur = [], 0, ""
    for ch in text:
        if ch in "([":
            depth += 1
        elif ch in ")]":
            depth -= 1
        if ch == "," and depth == 0:
            parts.append(cur.strip())
            cur = ""
        else:
            cur += ch
    if cur.strip():
        parts.append(cur.strip())
    return parts


# ============================================================================
# conversion
# ============================================================================

def convert(view_dir):
    ap = Applet(view_dir / "applet_0" / "geogebra.xml")
    n = view_dir.name.split("_")[1]

    title = None
    dump = view_dir / f"{view_dir.name}_compas.py"
    if dump.exists():
        for line in dump.read_text().splitlines()[:6]:
            if (m := re.search(r"GeoGebra applet:\s*(.+)$", line)):
                title = m.group(1).strip()

    step_el = None
    for el in ap.cons.iter("element"):
        if el.get("label") == "step" and el.get("type") == "numeric":
            step_el = el
    n_steps = 0
    if step_el is not None and step_el.find("slider") is not None:
        n_steps = int(float(step_el.find("slider").get("max")))

    def visible_mask(el):
        """Bit k (1..n_steps) = shown at step k; bit 0 = shown in final state."""
        cond = el.find("condition")
        show = el.find("show")
        if cond is None:
            on = show is not None and show.get("object") == "true"
            return ((1 << (n_steps + 1)) - 1) if on else 0
        expr = cond.get("showObject")
        mask = 0
        for k in range(0, n_steps + 1):
            try:
                if ap.num(expr, extra={"step": float(k)}):
                    mask |= 1 << k
            except ValueError as e:
                warn.append(f"cond {el.get('label')}: {e}")
                return 0
        return mask

    def color_of(el, dynamic_ctx):
        oc = el.find("objColor")
        if oc is None:
            return BLACK
        if oc.get("dynamicr") is not None:
            try:
                rgb = [ggb_component(float(ap.num(oc.get(f"dynamic{ch}"), extra=dynamic_ctx)))
                       for ch in "rgb"]
                return snap_color(*rgb, dynamic=True)
            except ValueError as e:
                warn.append(f"color {el.get('label')}: {e}")
        return snap_color(int(oc.get("r")) / 255, int(oc.get("g")) / 255,
                          int(oc.get("b")) / 255)

    out, warn = [], []
    dyn_ctx = {"step": 0.0}
    box = ap.frame

    for el in ap.elements:
        lab, typ = el.get("label"), el.get("type")
        mask = visible_mask(el)
        if mask == 0:
            continue

        ls = el.find("lineStyle")
        th = float(ls.get("thickness")) if ls is not None else 2
        dash = 1 if (ls is not None and ls.get("type") not in (None, "0")) else 0
        color = color_of(el, dyn_ctx)
        cmd = ap.cmd_of.get(lab)

        if typ == "point":
            if lab not in ap.points:
                warn.append(f"point {lab}: no coords")
                continue
            x, y = ap.points[lab]
            shlab = el.find("show").get("label") == "true" if el.find("show") is not None else False
            style = "w" if cmd is None else "g"
            out.append(("p", f'["p", {jn(x)}, {jn(y)}, {js_str(pretty(lab) if shlab else "")}, "{style}", {mask}]'))
            continue

        if typ == "text":
            exp = ap.exprs.get(lab)
            if exp is None:
                continue
            try:
                text = ap.ev.eval(exp)
            except ValueError as e:
                warn.append(f"text {lab}: {e}")
                continue
            sp = el.find("startPoint")
            if sp is None:
                continue
            if sp.get("exp"):
                try:
                    x, y = ap.resolve_point(sp.get("exp"))
                except ValueError:
                    warn.append(f"text {lab}: startPoint {sp.get('exp')!r}")
                    continue
            else:
                x, y = float(sp.get("x")), float(sp.get("y"))
            out.append(("t", f'["t", {jn(x)}, {jn(y)}, {js_str(str(text))}, {mask}]'))
            continue

        geo = None
        if cmd is not None:
            try:
                geo = ap.command_geometry(cmd)
            except ValueError as e:
                warn.append(f"{typ} {lab}: {e}")
        if geo is None and typ == "vector":
            c = el.find("coords")
            spt = el.find("startPoint")
            if c is not None:
                tail = (0.0, 0.0)
                if spt is not None:
                    tail = (ap.resolve_point(spt.get("exp")) if spt.get("exp")
                            else (float(spt.get("x")), float(spt.get("y"))))
                geo = ("seg", [tail, (tail[0] + float(c.get("x")), tail[1] + float(c.get("y")))])
        if geo is None and typ == "line":
            c = el.find("coords")
            if c is not None:
                seg = clip_line(float(c.get("x")), float(c.get("y")), float(c.get("z")), box)
                if seg is None:
                    continue
                geo = ("seg", list(seg))
        if geo is None:
            warn.append(f"{typ} {lab}: no geometry ({cmd.get('name') if cmd is not None else 'free'})")
            continue

        kind, data = geo
        if kind == "ray":
            data = list(clip_ray(data[0], data[1], box))
            kind = "seg"

        if typ == "vector":
            (x0, y0), (x1, y1) = data
            out.append(("a", f'["a", [{jn(x0)}, {jn(y0)}, {jn(x1)}, {jn(y1)}], 0x{color:06X}, {jn(th)}, {mask}]'))
        elif kind == "seg":
            (x0, y0), (x1, y1) = data
            out.append(("s", f'["s", [{jn(x0)}, {jn(y0)}, {jn(x1)}, {jn(y1)}], 0x{color:06X}, {jn(th)}, {dash}, {mask}]'))
        elif kind == "circle":
            (cx, cy), r = data
            out.append(("c", f'["c", [{jn(cx)}, {jn(cy)}, {jn(r)}], 0x{color:06X}, {jn(th)}, {dash}, {mask}]'))
        elif kind == "pts" and typ == "polygon":
            oc = el.find("objColor")
            op = float(oc.get("alpha") or 0) if oc is not None else 0
            arr = ", ".join(f"[{jn(x)}, {jn(y)}]" for x, y in data)
            out.append(("g", f'["g", [{arr}], 0x{color:06X}, {jn(min(op, 0.35))}, {mask}]'))
        elif kind == "pts":
            arr = ", ".join(f"[{jn(x)}, {jn(y)}]" for x, y in data)
            out.append(("l", f'["l", [{arr}], 0x{color:06X}, {jn(th)}, {dash}, {mask}]'))

    (fx0, fy0), (fx1, fy1) = ap.frame
    body = ",\n  ".join(enc for _, enc in out)
    js = f"""// Auto-generated by tools/convert.py from ../../{view_dir.name}/applet_0/geogebra.xml -- do not edit.
import {{ createStep }} from '../lib/stepview.js';

export const meta = {{
  title: 'Drawing {n} — {(title or f"view {n}").replace("'", "\\'")}',
  subtitle: 'step-by-step replay of the original applet',
  frame: [[{jn(fx0)}, {jn(fy0)}], [{jn(fx1)}, {jn(fy1)}]],
  steps: {n_steps},
}};

const E = [
  {body},
];

export function create(dw, panel, makePlayer) {{
  return createStep(dw, panel, makePlayer, meta, E);
}}
"""
    dest = OUT / f"view_{n}.js"
    dest.write_text(js)
    return len(out), n_steps, warn


def jn(x):
    v = round(float(x), 4)
    s = f"{v:.4f}".rstrip("0").rstrip(".")
    return s if s not in ("-0", "") else "0"


def js_str(s):
    return "'" + s.replace("\\", "\\\\").replace("'", "\\'").replace("\n", "\\n") + "'"


def main():
    targets = sys.argv[1:]
    if not targets:
        print("usage: convert.py N [N ...]   (one view at a time, verify each)")
        return
    for t in targets:
        view_dir = DRAWINGS / f"view_{t}"
        n_el, n_steps, warn = convert(view_dir)
        print(f"view_{t}: {n_el} elements, {n_steps} steps, {len(warn)} warnings")
        for w in warn:
            print(f"   WARN {w}")


if __name__ == "__main__":
    main()
