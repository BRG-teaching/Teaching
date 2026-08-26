"""eqdraw_params — small helpers for authoring the parametric section.

The website's parametric layer is a tiny construction language (see the
website README §5).  These helpers keep the Python side short and readable —
the equivalent of GeoGebra's custom tools:

    from eqdraw_params import point, handle, offset, intersection, midpoint, member

    drawing.params = {
        "points":  [point("A", 24, 48)],
        "handles": [handle("B", op="pt_B", on="circle")],
        "rules":   [offset("G", "F4", "B", "A", 16),
                    intersection("H", "F4", "C", "A", "G", "D", "A")],
        "colors":  [member("3", bar=("A", "B"), force=("F4", "G"))],
    }

Rules may be written in ANY order — the viewer sorts the dependency graph
automatically, like GeoGebra does.  Geometry bindings are best written
directly on the ops themselves (GeoGebra-style, the element carries its own
formula):

    op.define = line("A", "B")            # a segment/arrow follows two points
    op.define = at("B", 1.4, 1.0)         # a point/label anchors to B + offset
    op.define = band("A", "B", 0.65)      # a force band along A->B
"""


# ---- named values -----------------------------------------------------------

def point(name, x, y):
    """A fixed named point."""
    return {"name": name, "value": [float(x), float(y)]}


def handle(name, op=None, on=None, value=None):
    """A draggable point.  `op`: the point op it colors pink and starts from.
    `on`: the name of a circle / segment / polyline op it slides on (the
    constraint is read live from that op — GeoGebra's Point(path)).
    Omit `on` for a freely draggable point."""
    h = {"name": name}
    if op:
        h["op"] = op
    if on:
        h["on"] = on
    if value:
        h["value"] = [float(value[0]), float(value[1])]
    return h


# ---- rules (any order — the viewer sorts the dependency graph) --------------

def offset(name, from_, a, b, length, rotate=0, away_from=None):
    """name = from_ + unit(b - a) * length, direction optionally rotated
    (degrees ccw).  `away_from`: flip the direction so the result lands
    farther from that point (arrows stepping aside from an edge)."""
    r = {"type": "offset", "name": name, "from": from_, "a": a, "b": b,
         "length": length}
    if rotate:
        r["rotate"] = rotate
    if away_from:
        r["awayFrom"] = away_from
    return r


def intersection(name, p1, a1, b1, p2, a2, b2):
    """name = intersection of the line through p1 parallel to a1->b1 with the
    line through p2 parallel to a2->b2 (the graphic-statics workhorse)."""
    return {"type": "intersection", "name": name,
            "p1": p1, "a1": a1, "b1": b1, "p2": p2, "a2": a2, "b2": b2}


def midpoint(name, a, b):
    return {"type": "midpoint", "name": name, "a": a, "b": b}


def distance(a, b, scale=1.0):
    """A scalar usable as any `length` / `width`: |a - b| * scale."""
    return {"distance": [a, b], "scale": scale}


# ---- op-level defines (op.define = ...) -------------------------------------

def line(start, end):
    """A segment or arrow follows two named points."""
    return {"line": {"start": start, "end": end}}


def at(anchor, dx=0.0, dy=0.0):
    """A point marker or label anchors to a named point (+ constant offset)."""
    d = {"point": {"at": anchor}}
    if dx or dy:
        d["point"]["offset"] = [float(dx), float(dy)]
    return d


def circle(center, radius=None):
    d = {"circle": {"center": center}}
    if radius is not None:
        d["circle"]["radius"] = radius
    return d


def through(*points):
    """A polyline / polygon through named points (or literal [x, y] pairs)."""
    return {"points": {"list": list(points)}}


def band(a, b, width):
    """A rectangle band along a->b of the given full width (force bands)."""
    return {"band": {"a": a, "b": b, "width": width}}


# ---- macros -----------------------------------------------------------------

def member(num, bar, force, ops=None,
           compression="#1a1eb2", tension="#ce4095"):
    """Compression/tension coloring of one member — the counterpart of the
    applets' internalForce tool.  `bar` = (node, end); `force` = the member's
    force-polygon edge (from, to) in cycle order.  By default colors the
    conventionally named ops bar<num>, force<num>, f<num>, s<num>, V<num>;
    pass `ops` to override."""
    if ops is None:
        ops = ["bar%s" % num, "force%s" % num, "f%s" % num, "s%s" % num, "V%s" % num]
    return {"ops": ops, "bar": list(bar), "force": list(force),
            "compression": compression, "tension": tension}
