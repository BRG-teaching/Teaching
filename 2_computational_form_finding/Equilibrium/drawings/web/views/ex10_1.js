/**
 * EX 10 · Task 1 — Bracing: which of the six layouts works
 * Structural Design II, FS 23 (sheet EX 10 "Bracing & Horizontal Forces", p. 1).
 *
 * TASK TEXT, verbatim:
 *   "The subtasks a) to f) show different layouts of walls acting as bracing
 *    schemes of a plate. Tick the box if the bracing is working.
 *    a)  b)  c)  d)  e)  f)"
 *
 * THIS IS A PLAN, not an elevation — the first family of views in this
 * library that looks down on the structure instead of at it. The shared
 * machinery for that lives in ../lib/plan.js.
 *
 * THE METHOD THE SHEET EXPECTS (compendium 10.1, verbatim):
 *   "Since walls can only absorb forces along their axis, the possible lines
 *    of action of the walls and thus their points of intersection are drawn
 *    into the slab first. If more than one intersection is found, the system
 *    is properly braced."
 * A wall in plan is therefore ONE force on ONE known line — its own
 * centreline — with one unknown magnitude. Three walls give three unknowns
 * against the three equilibrium equations of a rigid body in plane, so the
 * slab is STATICALLY DETERMINATE and pure statics on the wall centrelines is
 * not an approximation: a stiffness-based distribution returns the identical
 * numbers. Stiffness would only start to matter at four walls or more.
 *
 * THE RULE, which is all task 1 is:
 *   three or more wall axes brace a slab  <=>  they are neither all PARALLEL
 *   nor all CONCURRENT.
 * Parallel leaves the cross direction free; concurrent leaves rotation about
 * the common point free. Two COLLINEAR walls are one line of action and count
 * once — that is the second trap, and it is panel c).
 *
 * GEOMETRY, digitised from p. 1. Six identical rectangles, 56.67 x 113.33 pt,
 * i.e. aspect exactly 1 : 2 portrait; wall thickness 1.89 pt = W/30. The
 * coordinates below are panel-normalised, u = 0 left … 1 right,
 * v = 0 bottom … 1 top, and are converted to PAGE coordinates (1 wide x 2
 * tall) before anything is measured, so one thickness is one thickness in
 * both directions.
 *
 *   a) right edge wall u 0.967…1.00 full height; bottom edge wall
 *      v 0…0.017 full width.                         TWO walls only.
 *   b) a square core u 0.25…0.75, v 0.375…0.625, all four sides walls, with a
 *      door of W/6 in the LEFT side, centred (v 0.4256…0.5744).
 *   c) one full-width horizontal wall on v = 0.500; two COLLINEAR vertical
 *      walls on u = 0.500 (v 0.685…1.00 and v 0…0.315).
 *   d) horizontal wall at the top and at the bottom, u 0.25…0.75; a diagonal
 *      at exactly 45 degrees on the page, (0.228, 0.630) → (0.761, 0.364).
 *   e) one full-width horizontal wall on v = 0.500; upper diagonal
 *      (0.178, 0.991) → (0.822, 0.796); lower diagonal (0.178, 0.009) →
 *      (0.822, 0.204). The two diagonals are exact mirror images about
 *      v = 0.5.
 *   f) top edge wall and bottom edge wall, both full width; left edge wall
 *      v 0.50…1.00; right edge wall v 0…0.50.
 *
 * THE ANSWER KEY:  a) ✗   b) ✓   c) ✗   d) ✓   e) ✗   f) ✓   (three of six)
 *
 *   a) two axes, two constraints, three degrees of freedom. Not braced.
 *   b) two horizontal axes (v = 0.625 and 0.375) and two vertical
 *      (u = 0.25 and 0.75). Four intersections. Braced.
 *   c) the two vertical walls are COLLINEAR, so there are only two
 *      independent axes — and they are concurrent at the panel centre as
 *      well. Not braced, for two reasons at once.
 *   d) a parallel pair plus a diagonal: the pair meets only at infinity and
 *      the diagonal meets each of them somewhere else. Two intersections.
 *      Braced.
 *   e) THE SUBTLE ONE. The two diagonals are mirror images about the
 *      horizontal wall's own axis, so they cross ON it. All three axes pass
 *      through one point, and that point is
 *          u = 1.7996 ≈ 1.80,  v = 0.500
 *      i.e. 0.80 PANEL-WIDTHS OFF THE RIGHT EDGE, outside the drawing. The
 *      panel looks perfectly braced until you extend the axes. Not braced.
 *      (Derivation: upper diagonal slope on the page = -0.60559; from
 *      (0.178, 1.982) down to y = 1.000 is Δy = -0.982, hence
 *      Δx = 0.982/0.60559 = 1.6216 and x = 1.79956. The lower diagonal, being
 *      the mirror image, reaches the same point.)
 *   f) two horizontal axes and two vertical: four intersections. Braced.
 *
 * ERRORS AND GAPS IN THE SHEET, carried openly (brief §6.8):
 *   - Task 1 gives NEITHER a scale NOR a load direction, so the answer rests
 *     purely on the topological rule. That is stated in the view.
 *   - Panel c) is a trap of a second kind: it SHOWS three walls but two are
 *     collinear, so there are only two independent constraints.
 *   - Panel e)'s concurrency point is off the drawing and invisible unless
 *     the axes are extended. The view draws it, and dimensions it.
 *
 * Everything shown is recomputed by compute(): drag a wall in the enlarged
 * panel and the verdict flips live.
 */

import { PAL } from '../lib/eqdraw.js';
import * as P from '../lib/plan.js';

// ---------------------------------------------------------------- geometry
// panel-normalised (u, v) exactly as digitised; pg() puts them on the page,
// where the panel is 1 wide and 2 tall and one wall thickness is 1/30.
const pg = (p) => [p[0], 2 * p[1]];
const T = 1 / 30;                       // wall thickness, page units

const PANELS = [
  { k: 'a', note: 'two walls — one direction each, and nothing else',
    walls: [{ a: [0.9835, 0], b: [0.9835, 1] },
            { a: [0, 0.00833], b: [1, 0.00833] }] },
  { k: 'b', note: 'a closed core with one door: two axes in each direction',
    walls: [{ a: [0.25, 0.625], b: [0.75, 0.625] },
            { a: [0.25, 0.375], b: [0.75, 0.375] },
            { a: [0.75, 0.375], b: [0.75, 0.625] },
            { a: [0.25, 0.375], b: [0.25, 0.625], gap: [0.2024, 0.7976] }] },
  { k: 'c', note: 'three walls drawn, but two of them are collinear',
    walls: [{ a: [0, 0.5], b: [1, 0.5] },
            { a: [0.5, 0.685], b: [0.5, 1] },
            { a: [0.5, 0], b: [0.5, 0.315] }] },
  { k: 'd', note: 'a parallel pair plus a diagonal at 45 degrees',
    walls: [{ a: [0.25, 0.99167], b: [0.75, 0.99167] },
            { a: [0.25, 0.00833], b: [0.75, 0.00833] },
            { a: [0.228, 0.630], b: [0.761, 0.364] }] },
  { k: 'e', note: 'two diagonals mirrored about the middle wall — so they cross ON it',
    walls: [{ a: [0, 0.5], b: [1, 0.5] },
            { a: [0.178, 0.991], b: [0.822, 0.796] },
            { a: [0.178, 0.009], b: [0.822, 0.204] }] },
  { k: 'f', note: 'four edge walls, two directions, no common point',
    walls: [{ a: [0, 0.99167], b: [1, 0.99167] },
            { a: [0, 0.00833], b: [1, 0.00833] },
            { a: [0.01667, 0.5], b: [0.01667, 1] },
            { a: [0.98333, 0], b: [0.98333, 0.5] }] },
];

const NW = 4;      // wall slots per panel
const NR = 5;      // wall-rectangle slots per panel (b) needs five)

// ------------------------------------------------------------------ layout
// the enlarged panel lives in the left band, BETWEEN the two UI cards; the
// six thumbnails fill the free right half.
const EW = 6.8, EX = -33, EY = -6.2;           // enlarged panel, page width 1 -> EW
const AXBOX = [-40, -7.0, -14.5, 8.0];         // how far the enlarged axes run
const TW = 6, TGX = 9, TGY = 16;               // thumbnail width and grid pitch
const TX0 = -2, TY0 = -15;                     // bottom-left of the bottom-left one
const TEXT = 0.13;                             // thumbnail axis extension

const tpos = (i) => [TX0 + (i % 3) * TGX, TY0 + (i < 3 ? TGY : 0)];

const DEFAULTS = { panel: 4, thumbAx: true, lbl: true,
                   off: [0, 0, 0, 0, 0, 0, 0, 0], _k: 99 };

const KEY = ['✗', '✓', '✗', '✓', '✗', '✓'];

export const meta = {
  title: 'EX 10.1 — three walls, and whether they hold',
  subtitle: 'Structural Design II · sheet EX 10 “Bracing & Horizontal Forces”, task 1 a)–f)',
  about: 'Six floor plans, each with a few walls in it, and one question: does the slab stay put? A wall can only take a force along its own axis, so each wall is one force on one known line. Three lines against the three freedoms of a body in plane — two slides and a spin — and the whole of task 1 is the rule that follows: the axes must be neither all parallel nor all concurrent. Five of the six panels answer themselves. Panel e) does not: its three axes meet at a point eight tenths of a panel-width off the right edge, invisible unless you extend them, and that is why it fails. Drag a wall and watch the verdict flip.',
  result: (d) => [
    `answer key — a) ✗   b) ✓   c) ✗   d) ✓   e) ✗   f) ✓   (three of the six tick)`,
    `the rule: three wall axes brace a slab unless they are all parallel or all concurrent; two collinear walls count once`,
    `panel ${d.k}) — ${d.n} independent ${d.n === 1 ? 'axis' : 'axes'}: ${d.why}`,
    d.braced ? `panel ${d.k}) as drawn: ✓ BRACED`
             : `panel ${d.k}) as drawn: ✗ NOT BRACED${d.pole && d.n >= 3 ? ` — all three axes meet at (u ${d.poleU.toFixed(2)}, v ${d.poleV.toFixed(2)}) in panel-widths` : ''}`],
  frame: [[-34, -22], [28, 22]],
};

const STEPS = [
  { t: 'The exercise', d: 'EX 10 task 1: six layouts of bracing walls in a floor plan, and a tick box under each. The sheet gives no scale and no load direction — so the answer cannot depend on either, and the whole task is one geometric rule' },
  { t: 'The six layouts', d: 'right: all six, drawn as the sheet draws them — walls as thick rectangles, nothing dimensioned. Panels a) and f) put their walls on the edges, b) makes a closed core, c) d) and e) put them across the middle',
    detail: () => PANELS.map((p) => `${p.k})  ${p.note}`),
    take: 'a wall can only absorb a force ALONG ITS OWN AXIS — that single sentence from compendium 10.1 is the whole method' },
  { t: 'One panel, enlarged', d: (d) => `left: panel ${d.k}), big enough to work on. Choose another in the panel, and drag any wall by its handle — the verdict recomputes as you move it`,
    detail: (d) => [`${d.k})  ${d.note}`,
                    `${d.walls.length} walls drawn`],
    take: 'the walls are what is built; the AXES are what decides' },
  { t: 'Extend the axes', d: 'every wall centreline, run right across the plan and well past its edges. This is the step the sheet asks for and the step students skip: an axis does not stop where the concrete stops',
    detail: (d) => [`${d.walls.length} walls → ${d.n} independent ${d.n === 1 ? 'axis' : 'axes'} (collinear walls are ONE line of action)`,
                    d.allPar ? 'all of them parallel' : 'not all parallel'],
    take: 'two collinear walls are one line and one constraint, however far apart they are drawn' },
  { t: (d) => (d.braced ? 'No common point — it holds' : 'They all meet — it does not hold'),
    d: (d) => (d.braced
      ? `the axes of panel ${d.k}) meet in ${d.pts} different places. Nothing is left free: the slab can neither slide nor spin, and the bracing works`
      : d.pole
        ? `every axis of panel ${d.k}) passes through ONE point. The slab can still rotate about it — the walls simply swing round the pole and never stretch, so they never resist. Not braced`
        : `panel ${d.k}) does not have three independent axes at all: ${d.why}`),
    detail: (d) => [d.pole ? `pole at u = ${d.poleU.toFixed(3)}, v = ${d.poleV.toFixed(3)} (panel-widths from the bottom-left corner)` : `intersections found: ${d.pts}`,
                    d.pole && d.poleU > 1 ? `that is ${(d.poleU - 1).toFixed(2)} panel-widths OUTSIDE the right edge — off the drawing` : '',
                    `verdict: ${d.braced ? '✓ braced' : '✗ not braced'}`].filter(Boolean),
    take: 'a pole off the page is still a pole. Panel e) is the whole point of the task' },
  { t: 'Now all six', d: 'the same axes drawn into every thumbnail. Read them off: are they all parallel? do they all meet at one point? Nothing else matters',
    detail: () => PANELS.map((p, i) => `${p.k})  ${KEY[i] === '✓' ? '✓ braced' : '✗ not braced'}`) },
  { t: 'The answer key', d: 'three of the six tick. a) has too few walls, c) has two collinear ones so it has too few axes, and e) has three good axes that happen to be concurrent — the only one of the three failures you cannot see without extending the lines',
    detail: (d) => [`a) ✗   b) ✓   c) ✗   d) ✓   e) ✗   f) ✓`,
                    `panel e)'s pole: u = 1.800, v = 0.500 — 0.80 panel-widths off the right edge`,
                    `currently showing ${d.k}) : ${d.braced ? '✓ braced' : '✗ not braced'}`],
    take: 'no scale, no load, no numbers — the sheet only ever needed the geometry of the axes' },
];

// ------------------------------------------------------------------ maths

/** The wall segments of one panel, in PAGE coordinates, with drag offsets. */
function panelWalls(i, off) {
  return PANELS[i].walls.map((w, j) => {
    const dx = off ? off[2 * j] || 0 : 0;
    const dy = off ? off[2 * j + 1] || 0 : 0;
    const a = pg(w.a), b = pg(w.b);
    return { ...P.makeWall(`${PANELS[i].k}${j}`, [a[0] + dx, a[1] + dy], [b[0] + dx, b[1] + dy], T),
             gap: w.gap };
  });
}

/** The drawn rectangles of a wall: one, or two when it has a door in it. */
function wallRects(w) {
  const lerp = (t) => [w.a[0] + (w.b[0] - w.a[0]) * t, w.a[1] + (w.b[1] - w.a[1]) * t];
  const segs = w.gap ? [[0, w.gap[0]], [w.gap[1], 1]] : [[0, 1]];
  return segs.map(([t0, t1]) => P.makeWall('', lerp(t0), lerp(t1), w.t).ring);
}

function verdict(walls) {
  const st = P.stability(walls);
  return { n: st.n, braced: st.braced, why: st.why, pole: st.pole,
           pts: st.points.length,
           allPar: st.n >= 2 && st.lines.every((L) =>
             Math.abs(L.u[0] * st.lines[0].u[1] - L.u[1] * st.lines[0].u[0]) < 1e-6) };
}

function compute(s) {
  const i = Math.round(s.panel);
  const walls = panelWalls(i, s.off);
  const v = verdict(walls);
  const thumbs = PANELS.map((_, j) => {
    const w = j === i ? walls : panelWalls(j, null);
    const vv = verdict(w);
    return { walls: w, ...vv };
  });
  return { i, k: PANELS[i].k, note: PANELS[i].note, walls, ...v,
           poleU: v.pole ? v.pole[0] : 0,
           poleV: v.pole ? v.pole[1] / 2 : 0,
           thumbs, key: KEY };
}

// ------------------------------------------------------------------- view

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, off: [...DEFAULTS.off] };
  const EP = (p) => [EX + p[0] * EW, EY + p[1] * EW];            // page -> screen
  const TP = (j, p) => [tpos(j)[0] + p[0] * TW, tpos(j)[1] + p[1] * TW];

  const OK = { final: (d) => (d && d.braced ? PAL.green : PAL.red) };
  const okOf = (j) => ({ final: (d) => (d && d.thumbs[j].braced ? PAL.green : PAL.red) });

  dw.label('gTitle', 'the six layouts of the sheet', { cls: 'title', flash: false });
  dw.label('eTitle', '', { cls: 'title', flash: false });

  // ---- thumbnails
  PANELS.forEach((p, j) => {
    dw.strokes(`pOut${j}`, 4, { intro: 1, w: dw.W.thin, color: PAL.black, flash: false });
    for (let r = 0; r < NR; r++) {
      dw.poly(`pW${j}_${r}`, 4, { intro: 1, color: PAL.black, opacity: 1,
        when: (st, d) => !!d && r < d.thumbs[j].nRect });
    }
    for (let a = 0; a < NW; a++) {
      dw.dashLine(`pAx${j}_${a}`, { intro: 5, color: PAL.grey, dash: dw.W.dash * 0.5,
        when: (st, d) => !!d && st.thumbAx && a < d.thumbs[j].walls.length });
    }
    dw.disk(`pPole${j}`, { intro: 5, r: dw.W.disk * 0.55,
      when: (st, d) => !!d && st.thumbAx && d.thumbs[j].poleIn });
    dw.label(`pLbl${j}`, '', { cls: 'num', intro: 6, color: okOf(j) });
  });

  // ---- the enlarged panel
  dw.strokes('eOut', 4, { intro: 2, w: dw.W.bar * 0.55, color: PAL.black, flash: false });
  for (let r = 0; r < NR; r++) {
    dw.poly(`eW${r}`, 4, { intro: 2, color: PAL.black, opacity: 1,
      when: (st, d) => !!d && r < d.nRect });
  }
  for (let a = 0; a < NW; a++) {
    dw.dashLine(`eAx${a}`, { intro: 3, color: PAL.grey, dash: dw.W.dash,
      when: (st, d) => !!d && a < d.walls.length });
    dw.disk(`eH${a}`, { intro: 2, r: dw.W.disk * 0.8,
      when: (st, d) => !!d && a < d.walls.length });
  }
  dw.disk('ePole', { intro: 4, r: dw.W.disk * 1.15, when: (st, d) => !!d && !!d.pole });
  dw.label('ePoleL', '', { cls: 'num', intro: 4, color: PAL.red, when: (st, d) => !!d && !!d.pole });
  dw.strokes('eDim', 5, { intro: 4, w: dw.W.dim, color: PAL.grey, flash: false,
    when: (st, d) => !!d && !!d.pole && d.poleU > 1.02 });
  dw.label('eDimL', '', { intro: 4, flash: false, color: PAL.grey,
    when: (st, d) => !!d && !!d.pole && d.poleU > 1.02 });
  dw.label('eVerdict', '', { cls: 'title', intro: 4, color: OK });
  dw.label('eHint', 'drag any pink handle — the verdict recomputes', { cls: 'point', intro: 2, flash: false });

  dw.instant('gTitle', 'eTitle', 'eHint');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    dw.setLabel('gTitle', [TX0 + TGX + TW / 2, TY0 + TGY + 2 * TW + 1.6]);

    // ---- thumbnails
    d.thumbs.forEach((t, j) => {
      const o = tpos(j);
      const box = [0, 0, 1, 2];
      const c = [TP(j, [0, 0]), TP(j, [1, 0]), TP(j, [1, 2]), TP(j, [0, 2])];
      dw.setStrokes(`pOut${j}`, c.map((p, q) => [p, c[(q + 1) % 4]]));
      let r = 0;
      for (const w of t.walls) {
        for (const ring of wallRects(w)) {
          if (r < NR) dw.setPoly(`pW${j}_${r}`, ring.map((p) => TP(j, p)));
          r++;
        }
      }
      t.nRect = r;
      t.walls.forEach((w, a) => {
        const seg = P.axisSeg(w, box, TEXT * 2);
        if (seg) dw.setDashLine(`pAx${j}_${a}`, seg.map((p) => TP(j, p)));
      });
      const pin = t.pole && t.n >= 3 && t.pole[0] > -0.3 && t.pole[0] < 1.3
        && t.pole[1] > -0.3 && t.pole[1] < 2.3;
      t.poleIn = !!pin;
      dw.setDisk(`pPole${j}`, TP(j, t.pole ?? [0, 0]));
      dw.setLabel(`pLbl${j}`, [o[0] + TW / 2, o[1] - 1.5]);
      dw.setText(`pLbl${j}`, `${PANELS[j].k})  ${t.braced ? '✓ braced' : '✗ not braced'}`);
    });

    // ---- the enlarged panel
    const c = [EP([0, 0]), EP([1, 0]), EP([1, 2]), EP([0, 2])];
    dw.setStrokes('eOut', c.map((p, q) => [p, c[(q + 1) % 4]]));
    let r = 0;
    for (const w of d.walls) {
      for (const ring of wallRects(w)) {
        if (r < NR) dw.setPoly(`eW${r}`, ring.map(EP));
        r++;
      }
    }
    d.nRect = r;
    // the axes are clipped in SCREEN space, so they always stop short of the
    // caption card whatever the panel does
    const abox = [(AXBOX[0] - EX) / EW, (AXBOX[1] - EY) / EW,
                  (AXBOX[2] - EX) / EW, (AXBOX[3] - EY) / EW];
    d.walls.forEach((w, a) => {
      const seg = P.axisSeg(w, abox, 0);
      if (seg) dw.setDashLine(`eAx${a}`, seg.map(EP));
      dw.setDisk(`eH${a}`, EP(w.mid));
    });
    if (d.pole) {
      dw.setDisk('ePole', EP(d.pole));
      dw.setLabel('ePoleL', [EP(d.pole)[0], EP(d.pole)[1] + 1.3]);
      dw.setText('ePoleL', `pole (${d.poleU.toFixed(2)}, ${d.poleV.toFixed(2)})`);
      dw.setStrokes('eDim', P.dimStrokes([1, d.pole[1]], [d.pole[0], d.pole[1]], -0.15, 0.05)
        .map(([a, b]) => [EP(a), EP(b)]));
      dw.setLabel('eDimL', EP(P.dimLabel([1, d.pole[1]], [d.pole[0], d.pole[1]], -0.15, -0.14)));
      dw.setText('eDimL', `${(d.poleU - 1).toFixed(2)} panel-widths off the edge`);
    }
    dw.setLabel('eTitle', [EX + EW / 2, EY - 1.5]);
    dw.setText('eTitle', `panel ${d.k}) — enlarged`);
    dw.setLabel('eVerdict', [EX + EW / 2, EY - 2.8]);
    dw.setText('eVerdict', d.braced ? '✓ the bracing works' : '✗ the bracing does NOT work');
    dw.setLabel('eHint', [EX + EW / 2, EY - 4.1]);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  // ---- drag: translate a wall of the enlarged panel and re-read the verdict
  const hit = (x, y, tol) => {
    if (!d) return null;
    for (let a = 0; a < d.walls.length; a++) {
      const p = EP(d.walls[a].mid);
      if (Math.hypot(p[0] - x, p[1] - y) < tol) return `w${a}`;
    }
    return null;
  };
  dw.enableDrag(hit, (key, x, y) => {
    const a = +key.slice(1);
    const base = panelWalls(d.i, null)[a];
    const px = (x - EX) / EW, py = (y - EY) / EW;
    const cl = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    s.off[2 * a] = cl(px - base.mid[0], -0.4 - base.mid[0], 1.4 - base.mid[0]);
    s.off[2 * a + 1] = cl(py - base.mid[1], -0.4 - base.mid[1], 2.4 - base.mid[1]);
    refresh();
  });

  const w = panel.section('Which panel');
  panel.slider(w, s, 'panel', 'panel', 0, 5, 1, () => {
    s.off = [0, 0, 0, 0, 0, 0, 0, 0];
    refresh();
  }, (v) => `${PANELS[Math.round(v)].k})  ${KEY[Math.round(v)] === '✓' ? 'braced' : 'not braced'}`);
  panel.button(panel.buttonRow(w), 'put the walls back', () => {
    s.off = [0, 0, 0, 0, 0, 0, 0, 0];
    refresh();
  });
  panel.toggle(w, s, 'thumbAx', 'axes in the thumbnails too', refresh);

  refresh();
  return player;
}
