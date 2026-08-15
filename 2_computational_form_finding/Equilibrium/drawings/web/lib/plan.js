/**
 * plan.js — drawing and solving a BUILDING PLAN (top view).
 *
 * Everything in this library up to EX 9 draws an ELEVATION: a structure seen
 * from the side, gravity down the page, and a force diagram beside it. From
 * EX 10 ("Bracing & horizontal forces") the sheets switch to a PLAN — the
 * floor slab seen from above, with shear walls in it and a horizontal force
 * pushing on it. That is a different drawing, and this file is the machinery
 * for it, kept in one place so EX 9, EX 10 and whatever comes after can share
 * it. No existing lib file is touched.
 *
 * WHAT A PLAN VIEW HAS TO SHOW, and the function that draws each of them:
 *
 *   the slab outline, in metres                    slabRing()
 *   a wall, as a thick rectangle on its centreline makeWall().ring
 *   the wall's AXIS, extended right across the plan axisSeg()
 *   the pole where the axes meet, when they do      stability()
 *   a horizontal load, with its line of action      lineOfAction()
 *   each wall's reaction, ALONG ITS OWN AXIS        reactionArrow()
 *   dimension strings                               dimStrokes()
 *   the little solid view-direction triangle        viewTriangle()
 *   the unfold from plan into the 1:100 elevation   unfold()
 *
 * THE ONE IDEA BEHIND ALL OF IT (compendium 10.1, verbatim):
 *
 *   "Since walls can only absorb forces along their axis, the possible lines
 *    of action of the walls and thus their points of intersection are drawn
 *    into the slab first. If more than one intersection is found, the system
 *    is properly braced."
 *
 * So a wall in plan is NOT a two-dimensional object with a stiffness. It is
 * ONE force with ONE known line of action — its own centreline — and one
 * unknown magnitude. Three walls therefore give three unknowns against the
 * three equilibrium equations of a rigid body in plane, and the slab is
 * STATICALLY DETERMINATE: `solvePlan()` below is the whole analysis, and a
 * rigid-diaphragm stiffness distribution would return the identical numbers.
 * Stiffness only starts to matter at four walls or more, which these sheets
 * never have.
 *
 * The stability rule falls straight out of the same 3x3 system: it is
 * singular exactly when the three axes are all parallel (no equation for the
 * cross direction) or all concurrent (no equation for rotation about the
 * common point). Hence `stability()` and `solvePlan().det` are two views of
 * one fact, and both are reported so a view can show the determinant going to
 * zero as a reader drags a wall onto the pole.
 *
 * SCALES. The sheets draw the plan at 1:200, the wall elevations at 1:100 and
 * the force diagrams at 1 cm = 10 kN. `pageScales(cm)` turns "one page
 * centimetre = `cm` drawing units" into the three multipliers, so a view can
 * honour all three at once and the reader can literally measure a force off
 * the screen against the slab beside it.
 *
 * Conventions: points are plain [x, y] arrays in metres, x right, y UP the
 * page (the printed SVG has y down; every coordinate here is already
 * flipped). Angles in radians unless a name says deg.
 */

/* ------------------------------------------------------------------ scale */

/**
 * The three scales of an EX 10 page, in drawing units per unit of quantity.
 *   cm : how many drawing units one printed centimetre is worth.
 * Returns { plan: units per metre at 1:200,
 *           elev: units per metre at 1:100,
 *           force: units per kN at 1 cm = 10 kN,
 *           cm }.
 * They are locked to each other exactly as the page locks them, so a 100 kN
 * force really is drawn 10 cm long — longer than the 16 m slab is wide, which
 * is a fact about the sheet worth seeing rather than quietly rescaling away.
 */
export function pageScales(cm) {
  return { cm, plan: cm / 200 * 100, elev: cm / 100 * 100, force: cm / 10 };
}

/** metres -> drawing units mapper with an origin. `m` may be a pageScales()
    member (plan or elev) or any plain number. */
export function mapper(origin, m) {
  const f = (x, y) => [origin[0] + x * m, origin[1] + y * m];
  f.m = m;
  f.origin = origin;
  return f;
}

/* ------------------------------------------------------------- primitives */

const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const mul = (a, s) => [a[0] * s, a[1] * s];
const cross = (a, b) => a[0] * b[1] - a[1] * b[0];
const norm = (a) => Math.hypot(a[0], a[1]);
function unit(a) { const l = norm(a); return l > 1e-12 ? [a[0] / l, a[1] / l] : [1, 0]; }

/** The slab, counter-clockwise from its bottom-left corner. */
export function slabRing(w, h, x0 = 0, y0 = 0) {
  return [[x0, y0], [x0 + w, y0], [x0 + w, y0 + h], [x0, y0 + h]];
}

/**
 * A shear wall: the centreline a -> b and a thickness t (metres).
 * `.ring` is the rectangle actually drawn; `.u` is the ONE direction in which
 * the wall can deliver a force; `.mid` is where its reaction is drawn.
 */
export function makeWall(name, a, b, t = 0.40) {
  const u = unit(sub(b, a));
  const n = [-u[1], u[0]];
  const off = mul(n, t / 2);
  return {
    name, a, b, t, u, n,
    len: norm(sub(b, a)),
    mid: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2],
    ring: [sub(a, off), sub(b, off), add(b, off), add(a, off)],
  };
}

/** Translate a wall bodily (used by the drag handles). */
export function moveWall(w, dx, dy) {
  return makeWall(w.name, [w.a[0] + dx, w.a[1] + dy], [w.b[0] + dx, w.b[1] + dy], w.t);
}

/**
 * The wall's AXIS as a drawable segment: the centreline extended both ways
 * until it leaves the box [x0, y0, x1, y1], grown by `ext` metres.
 *
 * The axis, not the wall, is what decides everything — panel e) of EX 10
 * task 1 fails because of a pole 0.8 panel-widths OUTSIDE the drawing, and
 * you only ever see it by extending the axes past the slab edge.
 */
export function axisSeg(w, box, ext = 0) {
  const [x0, y0, x1, y1] = [box[0] - ext, box[1] - ext, box[2] + ext, box[3] + ext];
  const p = w.mid, u = w.u;
  let tmin = -Infinity, tmax = Infinity;
  const slab = (num, den) => {              // clip against one pair of edges
    if (Math.abs(den) < 1e-12) return num >= 0;
    const t0 = num / den;
    if (den > 0) tmax = Math.min(tmax, t0); else tmin = Math.max(tmin, t0);
    return true;
  };
  if (!slab(x1 - p[0], u[0]) || !slab(p[0] - x0, -u[0])
      || !slab(y1 - p[1], u[1]) || !slab(p[1] - y0, -u[1])) return null;
  if (!(tmax > tmin)) return null;
  return [add(p, mul(u, tmin)), add(p, mul(u, tmax))];
}

/** Line of action of a load: through `at`, along `dir`, clipped like an axis. */
export function lineOfAction(at, dir, box, ext = 0) {
  return axisSeg({ mid: at, u: unit(dir) }, box, ext);
}

/** Intersection of two wall axes, or null when they are parallel. */
export function axisCross(w1, w2) {
  const den = cross(w1.u, w2.u);
  if (Math.abs(den) < 1e-9) return null;
  const t = cross(sub(w2.mid, w1.mid), w2.u) / den;
  return add(w1.mid, mul(w1.u, t));
}

/** Is the point p on the wall's (infinite) axis? */
export function onAxis(w, p, tol = 1e-6) {
  return Math.abs(cross(w.u, sub(p, w.mid))) < tol;
}

/* ------------------------------------------------------------- stability */

/**
 * Is this set of walls a working bracing?
 *
 * THE RULE. Three or more wall axes brace a slab if and only if they are
 * neither all PARALLEL nor all CONCURRENT. Two collinear walls count once:
 * they are the same line of action and give one constraint, not two.
 *
 * Returns
 *   { braced, n, lines, why, pole, points }
 *   n       independent axes (collinear walls merged)
 *   pole    the common point when they are concurrent — the thing to draw
 *   points  all distinct pairwise intersections, which is the compendium's
 *           own test: "if more than one intersection is found, the system is
 *           properly braced"
 */
export function stability(walls, tol = 1e-6) {
  // merge collinear axes: same direction AND the same line
  const lines = [];
  for (const w of walls) {
    const same = lines.find((L) => Math.abs(cross(L.u, w.u)) < 1e-6
      && Math.abs(cross(L.u, sub(w.mid, L.mid))) < 1e-4);
    if (same) same.walls.push(w); else lines.push({ u: w.u, mid: w.mid, walls: [w] });
  }
  const n = lines.length;
  const out = { n, lines, braced: false, pole: null, points: [], why: '' };
  if (n < 3) {
    out.why = n < 2 ? 'fewer than two wall axes — nothing holds it'
      : 'only two independent axes: two constraints against three degrees of freedom';
    if (n === 2) {
      const p = axisCross(lines[0], lines[1]);
      if (p) { out.points = [p]; out.pole = p; }
    }
    return out;
  }
  const allPar = lines.every((L) => Math.abs(cross(lines[0].u, L.u)) < 1e-6);
  if (allPar) {
    out.why = 'all the axes are parallel: nothing resists across them';
    return out;
  }
  // every pairwise intersection
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const p = axisCross(lines[i], lines[j]);
      if (!p) continue;
      if (!out.points.some((q) => Math.hypot(q[0] - p[0], q[1] - p[1]) < 1e-4)) out.points.push(p);
    }
  }
  if (out.points.length === 1) {
    out.pole = out.points[0];
    out.why = 'all three axes pass through one point — the slab can still spin about it';
    return out;
  }
  out.braced = true;
  out.why = `${out.points.length} distinct intersection points: neither all parallel nor all concurrent`;
  return out;
}

/* ----------------------------------------------------------- the statics */

/**
 * Solve the slab in plan by plane statics on the wall centrelines.
 *
 * Unknowns: one scalar per wall, the magnitude of the force that wall applies
 * TO THE SLAB, positive along that wall's own `u`. Equations: sum Fx, sum Fy,
 * sum M about the origin. Exactly three of each, hence one answer.
 *
 *   walls  [makeWall(...), ...]                 (exactly three)
 *   loads  [{ at: [x, y], f: [fx, fy] }, ...]   applied to the slab
 *
 * Returns { lam, det, singular, R, M, check } where lam[i] is that wall's
 * force along +u_i, R/M are the applied resultant and its moment about the
 * origin, and `check` is the residual of all three equations (machine zero
 * unless something is wrong).
 */
export function solvePlan(walls, loads) {
  const R = [0, 0];
  let M = 0;
  for (const L of loads) {
    R[0] += L.f[0]; R[1] += L.f[1];
    M += L.at[0] * L.f[1] - L.at[1] * L.f[0];
  }
  const A = [
    walls.map((w) => w.u[0]),
    walls.map((w) => w.u[1]),
    walls.map((w) => cross(w.mid, w.u)),
  ];
  const b = [-R[0], -R[1], -M];
  const det3 = (m) => m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
    - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])
    + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
  const det = det3(A);
  const lam = [0, 0, 0];
  const singular = Math.abs(det) < 1e-9;
  if (!singular) {
    for (let k = 0; k < 3; k++) {
      const Ak = A.map((row) => [...row]);
      for (let r = 0; r < 3; r++) Ak[r][k] = b[r];
      lam[k] = det3(Ak) / det;
    }
  }
  const check = [0, 1, 2].map((r) => A[r].reduce((s, v, i) => s + v * lam[i], 0) - b[r]);
  return { lam, det, singular, R, M, check };
}

/**
 * The resultant of the wall reactions, reduced to one force on one line.
 * When the walls exactly undo the load this comes back equal and opposite to
 * the applied resultant on the applied resultant's own line — "no residual
 * force, no residual torsion", which is the check every EX 10 task wants.
 * Returns { f, m, y, x } — m is the moment about the origin; y is where the
 * line of action cuts x = 0 (finite only when f has an x component) and x
 * where it cuts y = 0.
 */
export function wallResultant(walls, lam) {
  const f = [0, 0];
  let m = 0;
  walls.forEach((w, i) => {
    const F = mul(w.u, lam[i]);
    f[0] += F[0]; f[1] += F[1];
    m += w.mid[0] * F[1] - w.mid[1] * F[0];
  });
  return { f, m,
    y: Math.abs(f[0]) > 1e-9 ? -m / f[0] : null,
    x: Math.abs(f[1]) > 1e-9 ? m / f[1] : null };
}

/* ------------------------------------------------------------- decoration */

/**
 * A wall's reaction, drawn ALONG ITS OWN AXIS through its midpoint.
 * `lam` is the signed magnitude along +u (as solvePlan returns it) and
 * `s` the drawing units per kN. The arrow points the way the force acts and
 * is placed so its TIP lands on the wall, which is how the sheets draw a
 * support force.
 */
export function reactionArrow(w, lam, s, at = null) {
  const p = at ?? w.mid;
  const L = lam * s;
  const tip = p;
  const tail = [p[0] - w.u[0] * L, p[1] - w.u[1] * L];
  return [tail, tip];
}

/**
 * A dimension string a -> b, stepped `off` aside on its own perpendicular.
 * Returns five [from, to] pairs for dw.strokes(name, 5): the dimension line,
 * two witness lines back to the measured points, and two 45-degree ticks.
 */
export function dimStrokes(a, b, off = 0.8, tick = 0.35) {
  const u = unit(sub(b, a));
  const n = [-u[1], u[0]];
  const A = add(a, mul(n, off)), B = add(b, mul(n, off));
  const t = mul(unit(add(u, n)), tick);
  return [
    [A, B],
    [a, add(a, mul(n, off * 1.25))],
    [b, add(b, mul(n, off * 1.25))],
    [sub(A, t), add(A, t)],
    [sub(B, t), add(B, t)],
  ];
}

/** Midpoint of a dimension string, offset for its text. */
export function dimLabel(a, b, off = 0.8, lift = 0.55) {
  const u = unit(sub(b, a));
  const n = [-u[1], u[0]];
  return add([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], mul(n, off + lift));
}

/**
 * The little solid triangle the sheets put beside a wall to say which way you
 * are looking at it when you unfold it into its elevation. Apex points along
 * `dir`. Returns three points for dw.poly(name, 3).
 */
export function viewTriangle(p, dir, size = 0.55) {
  const d = unit(dir);
  const n = [-d[1], d[0]];
  return [add(p, mul(d, size)), add(sub(p, mul(d, size * 0.6)), mul(n, size * 0.62)),
          sub(sub(p, mul(d, size * 0.6)), mul(n, size * 0.62))];
}

/**
 * Unfold a wall from the plan into its 1:100 elevation.
 *
 * With view direction `d` in plan and up = +z, the elevation's right-hand
 * direction is d x z = (d_y, -d_x). Everything about the sign conventions in
 * tasks 2b / 3b follows from that one line: it decides which END of the
 * elevation the slab force lands on, and getting it wrong mirrors the whole
 * panel while leaving it looking perfectly plausible.
 *
 * Returns { right, left, x0, toLocal(p) } where toLocal maps a point on the
 * wall's axis to its distance from the elevation's LEFT end.
 */
export function unfold(w, d) {
  const right = unit([d[1], -d[0]]);
  const ta = w.a[0] * right[0] + w.a[1] * right[1];
  const tb = w.b[0] * right[0] + w.b[1] * right[1];
  const left = ta <= tb ? w.a : w.b;
  const x0 = Math.min(ta, tb);
  return {
    right, left, x0,
    toLocal: (p) => p[0] * right[0] + p[1] * right[1] - x0,
    // does a plan vector point right or left in the elevation?
    toLocalDir: (v) => v[0] * right[0] + v[1] * right[1],
  };
}

/**
 * A simply supported wall panel receiving a horizontal force H at height z.
 * The sheets draw a pin and a roller `inset` in from each end, so the panel is
 * a simply supported body and not a wall on continuous ground — an
 * idealisation the sheets never state in words but every base number depends
 * on. Returns { span, V, M } with V the vertical couple at the two supports
 * and M the overturning moment it balances.
 */
export function panelBase(H, z, length, inset = 0.40) {
  const span = length - 2 * inset;
  return { span, V: (H * z) / span, M: H * z, inset };
}
