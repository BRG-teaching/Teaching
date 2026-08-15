/**
 * EX 9 · Task 1 — Tributary areas
 * Structural Design II, FS 23 (sheet EX 9 "Plates", page 1).
 *
 * "a) Divide each plate into the tributary areas resulting from the placement
 *     of the load bearing walls and columns.
 *  b) Draw the tributary areas of the plate on the columns and colour the area
 *     which is relevant for dimensioning."
 *
 * THE ONLY RULE ON THE PAGE, and it is not printed on the page — it comes from
 * compendium 3.4 "tributary area": *loads directly go to the nearest support …
 * the distance between two load-bearing elements is halved in each case.* So a
 * tributary boundary sits HALFWAY between two neighbouring supports, and the
 * areas must tile the plate exactly. Both of those are shown live here: the
 * halving is dimensioned, and the areas are summed at every redraw.
 *
 * GEOMETRY, digitised from page 1. There is no scale and no dimension line
 * anywhere on that page, so everything is normalised.
 *
 *  a) five squares, 85.01 × 85.01 pt, walls and columns 6.37 pt thick
 *     = 0.075 of the plate side. Normalised to a 1 × 1 plate, origin at the
 *     TOP-LEFT corner, +x right, +y DOWN:
 *       1  two walls, x ∈ [0, .075] and [.925, 1], both full height
 *       2  one wall x ∈ [0, .075] + two columns at the top-right and
 *          bottom-right corners
 *       3  an L of walls (left full height + top) + one column at the
 *          bottom-right corner
 *       4  a U of walls (left, top, right), open at the bottom
 *       5  a closed ring of four walls
 *  b) five plates on a recurring module u = 42.505 pt; column centres in u,
 *     from the top-left corner:
 *       1  2u × 2u, columns (0,0) (2,0) (0,2) (2,2)          — 4 at the corners
 *       2  2u × 2u, columns (1,0) (0,1) (2,1) (1,2)          — 4 at the edge midpoints
 *       3  4u × 2u, columns (0,0) (2,0) (4,0) (0,2) (2,2) (4,2)
 *       4  2u × 3u, columns inset half a bay all round       — cantilevers all round
 *       5  2u × 3u, 9 columns, x = 0, u, 2u and y = 0, u, 3u — the unequal one
 *
 * HOW EACH PART IS CONSTRUCTED HERE
 *
 * b) is pure Voronoi: every support is a point, and "nearest support" is
 *    exactly the Voronoi cell. The cells are built by clipping the plate with
 *    one perpendicular-bisector half-plane per rival column, so they follow a
 *    dragged column with no special cases, and they reproduce all five of the
 *    sheet's answers — including diagram 2, whose boundaries are the two
 *    diagonals of the square, and diagram 5, whose y-bays are unequal.
 *
 * a) is NOT Voronoi. A wall is a line, so the true nearest-support boundary
 *    between a wall and a column is a parabola, and the course does not use
 *    one: it halves distances along the coordinate directions and closes the
 *    corners between two perpendicular walls with a 45° bisector. That
 *    construction is written out case by case below, parametrically, so a
 *    dragged wall or column still redraws it.
 *
 * THE ANSWERS (plate side a = 1, module u = 1; every one of them is recomputed
 * live, these are the values at the sheet's own arrangement):
 *
 *   a1  0.500 · 0.500                                       (one-way span)
 *   a2  wall 0.500 · each column 0.250
 *   a3  left wall 0.375 · top wall 0.375 · column 0.250     (compendium rule)
 *       — the alternative construction, joining the two mid-edge points with a
 *       straight line, gives 0.4375 / 0.4375 / 0.125 and is also marked
 *       correct in this course. Both are offered; the compendium one is the
 *       default and the panel switches.
 *   a4  top wall 0.250 · left and right walls 0.375 each
 *   a5  four triangles of 0.250
 *   b1  4 × 1.000 u²      — ALL EQUAL
 *   b2  4 × 1.000 u²      — ALL EQUAL
 *   b3  corners 1.000 (×4), mid-edge 2.000 (×2)  ← the mid-edge pair governs
 *   b4  6 × 1.000 u²      — ALL EQUAL (that is the point of the example:
 *                           cantilevering half a bay equalises the columns)
 *   b5  0.250 0.500 0.250 / 0.750 1.500 0.750 / 0.500 1.000 0.500
 *       ← the centre column of the middle row governs, 1.500 u² = 25 % of the plate
 *
 * WHAT THE SHEET GETS WRONG. Task 1 b) says "colour the area which is relevant
 * for dimensioning", which presumes one column is worse than the others. In
 * diagrams 1, 2 and 4 every column carries exactly the same area, so there is
 * nothing to colour. The view says so instead of picking one at random. (The
 * same slip is in Task 3 a), which asks for "the relevant" of five identical
 * beams.)
 *
 * The sheet prints no answers, and pages 1 and 2 carry no dimension line at
 * all. Everything above is derived.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

const TW = 0.075;                 // wall / column thickness, fraction of the plate side
const NREG = 9;                   // most tributary areas any one layout has
const NSUP = 9;                   // most supports any one layout has
const NBND = 72;                  // interior boundary segments
const NTHB = 60;                  // segments in one index thumbnail

const DEFAULTS = {
  part: 0,        // 0 = a) walls and columns · 1 = b) columns only
  cs: 0,          // which of the five plates, 0..4
  w: 1.0,         // a) plate width, in plate heights
  sup: 1.0,       // a) position of the movable support, as a fraction of the plate
  bmv: 0,         // b) which column the offset applies to
  bdx: 0, bdy: 0, // b) that column's offset, in u
  altL: false,    // a3) join the mid-edge points instead of halving orthogonally
  thumbs: true,
  lbl: true, _k: 99,
};

// ---------------------------------------------------------------- geometry --

/** Keep the part of a convex polygon with n·p ≤ c (Sutherland–Hodgman). */
function clipHalf(poly, n, c) {
  const out = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    const fa = n[0] * a[0] + n[1] * a[1] - c;
    const fb = n[0] * b[0] + n[1] * b[1] - c;
    if (fa <= 1e-12) out.push(a);
    if ((fa > 1e-12 && fb < -1e-12) || (fa < -1e-12 && fb > 1e-12)) {
      const t = fa / (fa - fb);
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    }
  }
  return out;
}

/** Voronoi cells of `pts`, clipped to the rectangle [0,pw] × [0,ph]. */
function voronoi(pts, pw, ph) {
  const box = [[0, 0], [pw, 0], [pw, ph], [0, ph]];
  return pts.map((p, i) => {
    let cell = box;
    pts.forEach((q, j) => {
      if (i === j) return;
      // closer to p than to q  ⇔  2·X·(q−p) ≤ |q|² − |p|²
      const n = [2 * (q[0] - p[0]), 2 * (q[1] - p[1])];
      const c = q[0] ** 2 + q[1] ** 2 - p[0] ** 2 - p[1] ** 2;
      if (Math.hypot(n[0], n[1]) < 1e-12) return;
      cell = clipHalf(cell, n, c);
    });
    return cell;
  });
}

const area = (p) => {
  let a = 0;
  for (let i = 0; i < p.length; i++) {
    const q = p[(i + 1) % p.length];
    a += p[i][0] * q[1] - q[0] * p[i][1];
  }
  return Math.abs(a) / 2;
};

const centroid = (p) => {
  let a = 0, cx = 0, cy = 0;
  for (let i = 0; i < p.length; i++) {
    const q = p[(i + 1) % p.length];
    const f = p[i][0] * q[1] - q[0] * p[i][1];
    a += f; cx += (p[i][0] + q[0]) * f; cy += (p[i][1] + q[1]) * f;
  }
  if (Math.abs(a) < 1e-12) return p[0] ?? [0, 0];
  return [cx / (3 * a), cy / (3 * a)];
};

const rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];

const A_NAME = [
  'two walls on opposite edges',
  'one wall and two columns',
  'an L of walls and one column',
  'a U of walls, open at the bottom',
  'a closed ring of four walls',
];
const B_NAME = [
  '4 columns at the corners',
  '4 columns at the edge midpoints',
  '6 columns, two equal bays',
  '6 columns inset half a bay — cantilevers all round',
  '9 columns on the edges, unequal y-bays',
];

/** Part a): walls and columns on a w × 1 plate, y measured DOWNWARD. */
function layoutA(cs, s) {
  const w = s.w, h = 1, t = TW;
  const sw = Math.max(s.sup * w, 3 * t);        // where the movable support sits
  const sh = Math.max(s.sup * h, 3 * t);
  const sup = [], reg = [];
  let pair = null, diag = null;

  if (cs === 0) {
    const cR = sw - t / 2, xb = (t / 2 + cR) / 2;
    sup.push({ nm: 'left wall', p: rect(0, 0, t, h), c: [t / 2, h / 2], move: false },
             { nm: 'right wall', p: rect(sw - t, 0, sw, h), c: [cR, h / 2], move: true });
    reg.push({ nm: 'left wall', p: rect(0, 0, xb, h) },
             { nm: 'right wall', p: rect(xb, 0, w, h) });
    pair = [0, 1, 'x', 0.82 * h];
  } else if (cs === 1) {
    const cx = sw - t / 2, xb = (t / 2 + cx) / 2, yb = h / 2;
    sup.push({ nm: 'wall', p: rect(0, 0, t, h), c: [t / 2, h / 2], move: false },
             { nm: 'column 1', p: rect(cx - t / 2, 0, cx + t / 2, t), c: [cx, t / 2], move: true },
             { nm: 'column 2', p: rect(cx - t / 2, h - t, cx + t / 2, h), c: [cx, h - t / 2], move: true });
    reg.push({ nm: 'wall', p: rect(0, 0, xb, h) },
             { nm: 'column 1', p: rect(xb, 0, w, yb) },
             { nm: 'column 2', p: rect(xb, yb, w, h) });
    pair = [0, 1, 'x', 0.11 * h];
  } else if (cs === 2) {
    const cx = sw - t / 2, cy = sh - t / 2;
    const xb = (t / 2 + cx) / 2, yb = (t / 2 + cy) / 2;
    sup.push({ nm: 'left wall', p: rect(0, 0, t, h), c: [t / 2, h / 2], move: false },
             { nm: 'top wall', p: rect(t, 0, w, t), c: [w / 2, t / 2], move: false },
             { nm: 'column', p: rect(cx - t / 2, cy - t / 2, cx + t / 2, cy + t / 2), c: [cx, cy], move: true });
    if (!s.altL) {
      // compendium 3.4: halve orthogonally, close the wall-to-wall corner at 45°
      reg.push({ nm: 'left wall', p: [[0, 0], [xb, yb], [xb, h], [0, h]] },
               { nm: 'top wall', p: [[0, 0], [w, 0], [w, yb], [xb, yb]] },
               { nm: 'column', p: rect(xb, yb, w, h) });
      diag = [[0, 0], [xb, yb]];
    } else {
      // the other reading: halve along the two FREE edges and join the two
      // mid-edge points with one straight line
      const P1 = [xb, h], P2 = [w, yb];
      const dir = [w, h];
      const nrm = [-(P2[1] - P1[1]), P2[0] - P1[0]];
      const tI = ((P1[0] * nrm[0] + P1[1] * nrm[1]) / (dir[0] * nrm[0] + dir[1] * nrm[1]));
      const I = [dir[0] * tI, dir[1] * tI];
      reg.push({ nm: 'left wall', p: [[0, 0], I, P1, [0, h]] },
               { nm: 'top wall', p: [[0, 0], [w, 0], P2, I] },
               { nm: 'column', p: [P1, [w, h], P2] });
      diag = [[0, 0], I];
    }
    pair = [0, 2, 'x', cy];
  } else if (cs === 3) {
    const m = Math.min(w / 2, h * 0.92);        // the two 45° bisectors meet here
    sup.push({ nm: 'left wall', p: rect(0, 0, t, h), c: [t / 2, h / 2], move: false },
             { nm: 'top wall', p: rect(t, 0, w - t, t), c: [w / 2, t / 2], move: false },
             { nm: 'right wall', p: rect(w - t, t, w, h), c: [w - t / 2, h / 2], move: false });
    reg.push({ nm: 'left wall', p: [[0, 0], [w / 2, m], [w / 2, h], [0, h]] },
             { nm: 'top wall', p: [[0, 0], [w, 0], [w / 2, m]] },
             { nm: 'right wall', p: [[w, 0], [w, h], [w / 2, h], [w / 2, m]] });
    pair = [0, 2, 'x', h * 0.85];
  } else {
    sup.push({ nm: 'left wall', p: rect(0, 0, t, h), c: [t / 2, h / 2], move: false },
             { nm: 'top wall', p: rect(t, 0, w - t, t), c: [w / 2, t / 2], move: false },
             { nm: 'right wall', p: rect(w - t, 0, w, h), c: [w - t / 2, h / 2], move: false },
             { nm: 'bottom wall', p: rect(t, h - t, w - t, h), c: [w / 2, h - t / 2], move: false });
    if (w >= h) {                       // hipped roof: a horizontal ridge
      const x1 = h / 2, x2 = w - h / 2, ym = h / 2;
      reg.push({ nm: 'left wall', p: [[0, 0], [x1, ym], [0, h]] },
               { nm: 'top wall', p: [[0, 0], [w, 0], [x2, ym], [x1, ym]] },
               { nm: 'right wall', p: [[w, 0], [w, h], [x2, ym]] },
               { nm: 'bottom wall', p: [[0, h], [x1, ym], [x2, ym], [w, h]] });
    } else {                            // a vertical ridge
      const y1 = w / 2, y2 = h - w / 2, xm = w / 2;
      reg.push({ nm: 'left wall', p: [[0, 0], [xm, y1], [xm, y2], [0, h]] },
               { nm: 'top wall', p: [[0, 0], [w, 0], [xm, y1]] },
               { nm: 'right wall', p: [[w, 0], [w, h], [xm, y2], [xm, y1]] },
               { nm: 'bottom wall', p: [[0, h], [xm, y2], [w, h]] });
    }
    pair = [1, 3, 'y', 0.62 * w];
  }
  return { pw: w, ph: h, dashed: false, sup, reg, pair, diag,
           unit: 'a²', uname: 'a = the plate height' };
}

/** Part b): columns only, on a plate measured in modules u. */
const B_PLATE = [[2, 2], [2, 2], [4, 2], [2, 3], [2, 3]];
const B_COLS = [
  [[0, 0], [2, 0], [0, 2], [2, 2]],
  [[1, 0], [0, 1], [2, 1], [1, 2]],
  [[0, 0], [2, 0], [4, 0], [0, 2], [2, 2], [4, 2]],
  [[0.5, 0.5], [1.5, 0.5], [0.5, 1.5], [1.5, 1.5], [0.5, 2.5], [1.5, 2.5]],
  [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [0, 3], [1, 3], [2, 3]],
];
const B_PAIR = [[0, 1], [1, 2], [0, 1], [0, 1], [3, 4]];
const B_MOVE = [3, 0, 1, 3, 4];         // the column the offset sliders drive

function layoutB(cs, s) {
  const [pw, ph] = B_PLATE[cs];
  const mv = Math.min(Math.round(s.bmv), B_COLS[cs].length - 1);
  const pts = B_COLS[cs].map((c, i) => (i === mv
    ? [Math.min(Math.max(c[0] + s.bdx, 0), pw), Math.min(Math.max(c[1] + s.bdy, 0), ph)]
    : [...c]));
  const cells = voronoi(pts, pw, ph);
  const t = TW * Math.max(pw, ph) * 0.9;
  const sup = pts.map((c, i) => ({
    nm: `column ${i + 1}`,
    p: rect(c[0] - t / 2, c[1] - t / 2, c[0] + t / 2, c[1] + t / 2),
    c, move: true }));
  const reg = cells.map((p, i) => ({ nm: `column ${i + 1}`, p }));
  const [i0, i1] = B_PAIR[cs];
  const axis = Math.abs(pts[i0][0] - pts[i1][0]) >= Math.abs(pts[i0][1] - pts[i1][1]) ? 'x' : 'y';
  return { pw, ph, dashed: cs === 3, sup, reg, mv,
           pair: [i0, i1, axis, axis === 'x' ? (pts[i0][1] + pts[i1][1]) / 2
                                             : (pts[i0][0] + pts[i1][0]) / 2],
           diag: null, unit: 'u²', uname: 'u = the column module' };
}

function compute(s) {
  const part = Math.round(s.part), cs = Math.round(s.cs);
  const L = part ? layoutB(cs, s) : layoutA(cs, s);
  const areas = L.reg.map((r) => area(r.p));
  const total = areas.reduce((a, b) => a + b, 0);
  const plate = L.pw * L.ph;
  const amax = Math.max(...areas);
  const amin = Math.min(...areas);
  const tol = 1e-6 * Math.max(1, amax);
  const equal = amax - amin < tol;
  const ntie = areas.filter((a) => amax - a < tol).length;
  // only a STRICTLY unique largest area may be coloured: two supports tied at
  // the top is the same situation as all of them tied, and the sheet's
  // "colour the relevant one" has no answer in either case
  const gov = ntie > 1 ? -1 : areas.indexOf(amax);

  // the interior boundaries: every region edge that is not on the plate edge
  const onEdge = (p, q) => (Math.abs(p[0]) < 1e-9 && Math.abs(q[0]) < 1e-9)
    || (Math.abs(p[0] - L.pw) < 1e-9 && Math.abs(q[0] - L.pw) < 1e-9)
    || (Math.abs(p[1]) < 1e-9 && Math.abs(q[1]) < 1e-9)
    || (Math.abs(p[1] - L.ph) < 1e-9 && Math.abs(q[1] - L.ph) < 1e-9);
  const bnd = [];
  for (const r of L.reg) {
    for (let i = 0; i < r.p.length; i++) {
      const a = r.p[i], b = r.p[(i + 1) % r.p.length];
      if (V.dist(a, b) < 1e-9 || onEdge(a, b)) continue;
      bnd.push([a, b]);
    }
  }

  // the halving that produced one of those boundaries, dimensioned
  const [i0, i1, axis, ord] = L.pair;
  const c0 = L.sup[i0].c, c1 = L.sup[i1].c;
  const k = axis === 'x' ? 0 : 1;
  const half = Math.abs(c1[k] - c0[k]) / 2;
  const midv = (c0[k] + c1[k]) / 2;
  const dp = (v) => (axis === 'x' ? [v, ord] : [ord, v]);
  const dim = [dp(c0[k]), dp(midv), dp(c1[k])];

  return { ...L, part, cs, areas, total, plate, amax, amin, equal, ntie, gov, bnd,
           half, dim, pairNames: [L.sup[i0].nm, L.sup[i1].nm],
           name: part ? B_NAME[cs] : A_NAME[cs],
           tag: `${part ? 'b' : 'a'}) plate ${cs + 1}` };
}

// -------------------------------------------------------------------- view --

export const meta = {
  title: 'EX 9.1 — where does each support’s load come from?',
  subtitle: 'Structural Design II · sheet EX 9 “Plates”, task 1 a) and b)',
  about: 'Ten plates, each held up in a different way, and one question: which part of the plate leans on which support. The whole of it rests on a single sentence from the compendium — a load goes to the nearest support, so the boundary between two supports sits halfway between them — and on one check, that the pieces have to add back up to the whole plate. Both are live here. Drag a wall or a column and every boundary redraws, the areas recount, and the running total stays pinned to the plate area. Part b) then asks which column governs; in three of the five diagrams the honest answer is that none does, because they are all carrying exactly the same thing.',
  result: (d) => [
    `${d.tag}: ${d.name} — ${d.sup.length} support${d.sup.length > 1 ? 's' : ''}, ${d.reg.length} tributary area${d.reg.length > 1 ? 's' : ''}`,
    d.areas.map((a, i) => `${a.toFixed(3)}`).join(' + ') + ` = ${d.total.toFixed(3)} ${d.unit}`,
    `the plate is ${d.pw.toFixed(3)} × ${d.ph.toFixed(3)} = ${d.plate.toFixed(3)} ${d.unit} — the areas tile it exactly ✓`,
    d.equal
      ? `every support carries the same ${d.amax.toFixed(3)} ${d.unit}: there is no “relevant” one to colour`
      : d.gov < 0
        ? `${d.ntie} supports tie at the largest ${d.amax.toFixed(3)} ${d.unit} = ${((100 * d.amax) / d.plate).toFixed(1)} % each — no single one governs`
        : `largest: ${d.sup[d.gov].nm} with ${d.amax.toFixed(3)} ${d.unit} = ${((100 * d.amax) / d.plate).toFixed(1)} % of the plate ← this is the one to dimension for`],
  frame: [[-26, -22], [30, 16]],
};

const STEPS = [
  { t: 'The exercise', d: 'EX 9 task 1: ten plates, each on a different arrangement of walls and columns. Split each plate into the piece of floor that each support has to carry, and in b) say which column that makes the worst one' },
  { t: 'The plates', d: 'top: the ten arrangements the sheet draws, five with walls in them and five with columns only. The panel picks one; it is then drawn full size below. Nothing on page 1 is dimensioned, so the walls are 0.075 of the plate side and the column plates are set out on one module u',
    detail: (d) => [`${d.tag} — ${d.name}`,
                    `plate ${d.pw.toFixed(2)} × ${d.ph.toFixed(2)} = ${d.plate.toFixed(3)} ${d.unit}, with ${d.unit === 'a²' ? d.uname : d.uname}`,
                    d.part ? 'every support is a point, so “nearest support” is literally a Voronoi cell'
                           : 'a wall is a line, not a point — the course halves distances along the axes instead'] },
  { t: 'Halve the distance', d: 'the whole task is one sentence from compendium 3.4: a load goes to the nearest support, so the distance between two neighbouring supports is halved. The two grey ticks are that halving, measured — they are always the same length, whatever you drag',
    detail: (d) => [`between ${d.pairNames[0]} and ${d.pairNames[1]}: ${(2 * d.half).toFixed(3)} apart`,
                    `so the boundary sits ${d.half.toFixed(3)} from each — half of ${(2 * d.half).toFixed(3)} ✓`],
    take: 'nearest support, and nothing else. No stiffness, no spans, no bending — just distance' },
  { t: 'The boundaries', d: 'apply that halving everywhere and the boundaries appear. Where two perpendicular WALLS compete the halving has no direction to work in, and the corner is closed with a 45° bisector instead — that is the diagonal in plate a3, and the hipped-roof pattern in a4 and a5',
    detail: (d) => [`${d.bnd.length} interior boundary segment${d.bnd.length === 1 ? '' : 's'}`,
                    d.part ? 'every one of them is a perpendicular bisector between two columns'
                           : 'orthogonal halving, plus a 45° bisector wherever two walls meet'],
    take: (d) => (d.part === 0 && d.cs === 2
      ? 'plate a3 has two defensible constructions and this course marks both — the panel switches between them, and the areas change by a third'
      : '') },
  { t: 'The areas', d: 'each region is the floor its own support carries. They are shaded green because that is what they are — a load, waiting to be turned into kilonewtons the moment somebody gives the plate a load per square metre',
    detail: (d) => d.areas.map((a, i) => `${d.sup[i].nm}: ${a.toFixed(4)} ${d.unit} = ${((100 * a) / d.plate).toFixed(1)} % of the plate`) },
  { t: 'b) Which one governs', d: 'the sheet asks for the area "relevant for dimensioning", which means the biggest one. In plates b1, b2 and b4 there is no biggest one — every column carries an identical area, and the honest answer is to say so rather than to colour one at random',
    detail: (d) => [d.equal
      ? `all ${d.reg.length} are ${d.amax.toFixed(3)} ${d.unit} — nothing to colour`
      : d.gov < 0
        ? `${d.ntie} of the ${d.reg.length} tie at ${d.amax.toFixed(3)} ${d.unit} — still no single worst support`
        : `${d.sup[d.gov].nm}: ${d.amax.toFixed(3)} ${d.unit}, against ${d.amin.toFixed(3)} ${d.unit} for the smallest — a factor of ${(d.amax / d.amin).toFixed(2)}`,
      `and ${((100 * d.amax) / d.plate).toFixed(1)} % of the whole plate goes into it`],
    take: 'a plate on equal bays has no worst column. That is a design result, not a missing answer' },
  { t: 'The check that costs nothing', d: 'the pieces have to add up to the plate. Not approximately — exactly, because every point of the plate is nearer to one support than to any other, so nothing is counted twice and nothing is left out. Drag anything you like and watch the total refuse to move',
    detail: (d) => [`Σ areas = ${d.total.toFixed(6)} ${d.unit}`,
                    `plate    = ${d.plate.toFixed(6)} ${d.unit}`,
                    `difference ${(d.total - d.plate).toExponential(1)} ${d.unit} ✓`],
    take: 'if the tributary areas do not sum to the plate, a support has been forgotten' },
];

const GOVSTEP = 5;

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };

  // the big plate lives to the RIGHT of both UI cards; the index thumbnails
  // run along the top, clear of the caption card's right edge
  const BOX = { cx: 13.5, cy: -7.0, w: 25.0, h: 19.5 };
  const THY = 10.2, THX0 = -5.5, THW = 6.8, THH = 4.4;

  let d = null;
  let M = 1, OX = 0, OY = 0;                    // plate → world mapping
  const px = (p) => [OX + p[0] * M, OY - p[1] * M];
  const inv = (X, Y) => [(X - OX) / M, (OY - Y) / M];

  dw.label('t_plate', '', { cls: 'title', flash: false });
  dw.label('t_idx', 'the ten plates of task 1', { cls: 'point', flash: false,
    when: (st) => st.thumbs });

  // ---- index thumbnails
  for (let i = 0; i < 5; i++) {
    dw.strokes(`th${i}`, NTHB, { intro: 1, w: dw.W.dim, color: PAL.grey,
      flash: false, when: (st) => st.thumbs });
    dw.label(`lth${i}`, '', { cls: 'num', intro: 1, flash: false,
      color: PAL.grey, when: (st) => st.thumbs });
  }
  dw.strokes('thsel', 4, { intro: 1, w: dw.W.thin, color: PAL.green, flash: false,
    when: (st) => st.thumbs });

  // ---- the plate itself
  dw.strokes('plate', 4, { intro: 1, w: dw.W.str, color: PAL.black,
    when: (st, dd) => !!dd && !dd.dashed });
  dw.dashLine('plateD', { intro: 1, color: PAL.black, dash: dw.W.dash,
    when: (st, dd) => !!dd && dd.dashed });
  for (let i = 0; i < NSUP; i++) {
    dw.poly(`sup${i}`, 4, { intro: 1, color: PAL.black, opacity: 1,
      when: (st, dd) => !!dd && i < dd.sup.length });
  }

  // ---- the halving
  dw.strokes('dimL', 3, { intro: 2, w: dw.W.thin, color: PAL.grey, flash: false });
  dw.strokes('dimR', 3, { intro: 2, w: dw.W.thin, color: PAL.grey, flash: false });
  dw.label('ldimL', '', { cls: 'num', intro: 2, color: PAL.grey });
  dw.label('ldimR', '', { cls: 'num', intro: 2, color: PAL.grey });

  // ---- the boundaries and the areas
  dw.strokes('bnd', NBND, { intro: 3, w: dw.W.thin, color: PAL.grey });
  dw.dashLine('diag', { intro: 3, color: PAL.grey, dash: dw.W.dash,
    when: (st, dd) => !!dd && !!dd.diag });
  for (let i = 0; i < NREG; i++) {
    dw.poly(`reg${i}`, 8, { intro: 4, color: PAL.green, flash: false,
      opacity: 0.13, when: (st, dd) => !!dd && i < dd.reg.length });
    dw.label(`lreg${i}`, '', { cls: 'num', intro: 4, color: PAL.green,
      when: (st, dd) => !!dd && i < dd.reg.length && st.lbl });
  }
  dw.poly('gov', 8, { intro: GOVSTEP, color: PAL.green, flash: false, opacity: 0.34,
    when: (st, dd) => !!dd && dd.gov >= 0 });
  dw.strokes('govEdge', 8, { intro: GOVSTEP, w: dw.W.bar, color: PAL.green,
    when: (st, dd) => !!dd && dd.gov >= 0 });
  dw.label('lgov', '', { cls: 'point', intro: GOVSTEP, color: PAL.green });

  dw.label('lsum', '', { cls: 'point', intro: 6, flash: false, color: PAL.black });

  dw.instant('t_plate', 't_idx');

  function refresh() {
    s._k = player.k;
    d = compute(s);

    // fit the plate into its box
    M = Math.min(BOX.w / d.pw, BOX.h / d.ph);
    OX = BOX.cx - (d.pw * M) / 2;
    OY = BOX.cy + (d.ph * M) / 2;

    dw.setLabel('t_plate', [BOX.cx, OY + 3.0]);
    dw.setText('t_plate', `${d.tag} — ${d.name}`);
    dw.setLabel('t_idx', [THX0 + 2.5 * THW, THY + THH * 0.62 + 1.3]);

    // --- thumbnails: always the SHEET's own arrangement, as an index
    for (let i = 0; i < 5; i++) {
      const t0 = { ...DEFAULTS, part: d.part, cs: i };
      const L = d.part ? layoutB(i, t0) : layoutA(i, t0);
      const m = Math.min(THW / L.pw, THH / L.ph) * 0.86;
      const ox = THX0 + i * THW + (THW - L.pw * m) / 2;
      const oy = THY + (L.ph * m) / 2;
      const tp = (p) => [ox + p[0] * m, oy - p[1] * m];
      const segs = [];
      const ring = (poly) => {
        for (let k = 0; k < poly.length; k++) {
          segs.push([tp(poly[k]), tp(poly[(k + 1) % poly.length])]);
        }
      };
      ring(rect(0, 0, L.pw, L.ph));
      for (const su of L.sup) ring(su.p);
      while (segs.length < NTHB) segs.push([tp([0, 0]), tp([0, 0])]);
      dw.setStrokes(`th${i}`, segs.slice(0, NTHB));
      dw.setLabel(`lth${i}`, [ox + (L.pw * m) / 2, THY - THH * 0.62 - 1.0]);
      dw.setText(`lth${i}`, `${d.part ? 'b' : 'a'}${i + 1}`);
      if (i === d.cs) {
        const bx0 = THX0 + i * THW + 0.1, bx1 = THX0 + (i + 1) * THW - 0.1;
        const by0 = THY - THH * 0.62, by1 = THY + THH * 0.62;
        const c = [[bx0, by0], [bx1, by0], [bx1, by1], [bx0, by1]];
        dw.setStrokes('thsel', c.map((p, k) => [p, c[(k + 1) % 4]]));
      }
    }

    // --- the plate outline and its supports
    const c = [px([0, 0]), px([d.pw, 0]), px([d.pw, d.ph]), px([0, d.ph])];
    dw.setStrokes('plate', c.map((p, i) => [p, c[(i + 1) % 4]]));
    dw.setDashLine('plateD', [...c, c[0]]);
    for (let i = 0; i < NSUP; i++) {
      dw.setPoly(`sup${i}`, (d.sup[i] ?? d.sup[0]).p.map(px));
    }

    // --- the halving, drawn as two equal ticks either side of the boundary
    const [p0, pm, p1] = d.dim;
    const tick = (nm, a, b) => {
      const A = px(a), B = px(b);
      const n = V.mul(V.unit(V.perp(V.sub(B, A))), 0.7);
      dw.setStrokes(nm, [[A, B], [V.sub(A, n), V.add(A, n)], [V.sub(B, n), V.add(B, n)]]);
    };
    tick('dimL', p0, pm);
    tick('dimR', pm, p1);
    const pctr = px([d.pw / 2, d.ph / 2]);
    for (const [nm, a, b] of [['ldimL', p0, pm], ['ldimR', pm, p1]]) {
      const A = px(a), B = px(b);
      let n = V.mul(V.unit(V.perp(V.sub(B, A))), 1.25);
      const m = V.mid(A, B);
      if (V.dist(V.add(m, n), pctr) < V.dist(V.sub(m, n), pctr)) n = V.mul(n, -1);
      dw.setLabel(nm, V.add(m, n));
      dw.setText(nm, d.half.toFixed(3));
    }

    // --- boundaries
    const bs = d.bnd.map(([a, b]) => [px(a), px(b)]);
    while (bs.length < NBND) bs.push([px([0, 0]), px([0, 0])]);
    dw.setStrokes('bnd', bs.slice(0, NBND));
    dw.setDashLine('diag', (d.diag ?? [[0, 0], [0, 0]]).map(px));

    // --- the areas
    for (let i = 0; i < NREG; i++) {
      const r = d.reg[i] ?? d.reg[0];
      dw.setPoly(`reg${i}`, r.p.map(px));
      const ctr = px(centroid(r.p));
      dw.setLabel(`lreg${i}`, ctr);
      dw.setText(`lreg${i}`, `${(d.areas[i] ?? 0).toFixed(3)}`);
    }
    const g = d.gov >= 0 ? d.reg[d.gov].p : [[0, 0], [0, 0], [0, 0]];
    dw.setPoly('gov', g.map(px));
    const ge = [];
    for (let i = 0; i < g.length; i++) ge.push([px(g[i]), px(g[(i + 1) % g.length])]);
    while (ge.length < 8) ge.push([px(g[0]), px(g[0])]);
    dw.setStrokes('govEdge', ge.slice(0, 8));
    dw.setLabel('lgov', V.add(px(centroid(g)), [0, -1.5]));
    dw.setText('lgov', d.gov >= 0 ? `governs · ${((100 * d.amax) / d.plate).toFixed(1)} %` : '');

    dw.setLabel('lsum', [BOX.cx, OY - d.ph * M - 2.4]);
    dw.setText('lsum', `Σ = ${d.total.toFixed(4)} ${d.unit} = the whole plate `
      + `(${d.pw.toFixed(2)} × ${d.ph.toFixed(2)}) ✓`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  // drag: in a) the movable wall/column and the plate's right edge, in b) any column
  dw.enableDrag((X, Y, tol) => {
    if (!d) return null;
    const w = inv(X, Y);
    for (let i = 0; i < d.sup.length; i++) {
      if (!d.sup[i].move) continue;
      if (V.dist(px(d.sup[i].c), [X, Y]) < tol * 2.2) return `s${i}`;
    }
    if (!d.part && Math.abs(X - px([d.pw, d.ph / 2])[0]) < tol * 1.6
        && Math.abs(w[1] - d.ph / 2) < d.ph * 0.35) return 'w';
    return null;
  }, (key, X, Y) => {
    const [x, y] = inv(X, Y);
    if (key === 'w') { s.w = Math.min(Math.max(x, 0.5), 1.8); }
    else if (!d.part) {
      s.sup = Math.min(Math.max(d.cs === 2 ? (x / d.pw + y / d.ph) / 2 : x / d.pw, 0.40), 1.0);
    } else {
      const i = +key.slice(1);
      s.bmv = i;
      s.bdx = Math.min(Math.max(x - B_COLS[d.cs][i][0], -1.0), 1.0);
      s.bdy = Math.min(Math.max(y - B_COLS[d.cs][i][1], -1.0), 1.0);
    }
    refresh();
  });

  const wsec = panel.section('Which plate');
  panel.slider(wsec, s, 'part', 'part', 0, 1, 1, refresh,
    (v) => (v ? 'b) columns only' : 'a) walls and columns'));
  panel.slider(wsec, s, 'cs', 'plate', 0, 4, 1, refresh,
    (v) => `${Math.round(v) + 1} — ${(Math.round(s.part) ? B_NAME : A_NAME)[Math.round(v)]}`);
  panel.toggle(wsec, s, 'thumbs', 'show the index of all five', refresh);
  panel.toggle(wsec, s, 'lbl', 'show the areas', refresh);

  const asec = panel.section('a) move a support');
  panel.slider(asec, s, 'w', 'plate width (× the height)', 0.5, 1.8, 0.05, refresh);
  panel.slider(asec, s, 'sup', 'the movable support', 0.40, 1.00, 0.01, refresh);
  panel.toggle(asec, s, 'altL', 'a3: join the mid-edge points instead', refresh);

  const bsec = panel.section('b) move a column');
  panel.slider(bsec, s, 'bmv', 'which column', 0, 8, 1, refresh,
    (v) => `column ${Math.round(v) + 1}`);
  panel.slider(bsec, s, 'bdx', 'move it across (u)', -1.0, 1.0, 0.05, refresh);
  panel.slider(bsec, s, 'bdy', 'move it down (u)', -1.0, 1.0, 0.05, refresh);
  panel.button(bsec, 'put every column back', () => {
    s.bdx = 0; s.bdy = 0; s.bmv = B_MOVE[Math.round(s.cs)];
    s.w = 1.0; s.sup = 1.0; refresh();
  });

  refresh();
  return player;
}
