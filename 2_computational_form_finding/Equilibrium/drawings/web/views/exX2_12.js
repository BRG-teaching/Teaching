/**
 * EX X · Aufgabe 12 — Qualitative internal Force Flow (two axonometrics)
 * Structural Design II, FS 23, sheet "EX X — Additional Exercises", page 10.
 *
 * NUMBERING. The English sheet calls this "Task 3" — one of three blocks with
 * that label. German: Aufgabe 12, used here (error E1).
 *
 * TEXT (verbatim). "Draw a qualitative internal force flow in the axonometric
 * drawing of the supporting structure. Use red for tension, blue for
 * compression and green for the external forces."
 *
 * ============================================================================
 * THIS PAGE HAS NO NUMBERS AT ALL, AND THE VIEW SAYS SO.
 * g1 … g4 (in a) and g (in b) are symbols with no value. No scale, no
 * dimension line and no load magnitude appears anywhere on page 10. The answer
 * the sheet wants is a coloured sketch, not a number, and nothing here is
 * invented to fill the gap: every quantity below is either a RATIO, which is
 * fully determined, or is named as undeterminable.
 * ============================================================================
 *
 * GEOMETRY. Both axonometrics are TRUE isometrics — axes at 30 / 150 / 90°,
 * all three foreshortened by 0.8165. That was verified on page 9, whose
 * printed 7.5 m edge is drawn 6.122 m at 1:200, and 6.122 / 0.8165 = 7.498.
 * Dividing the drawn lengths by 0.8165 therefore recovers exact PROPORTIONS;
 * the absolute scale is not stated. Everything below is in those recovered
 * units, and this view draws with the same isometric projection.
 *
 * a) TWO-LEVEL SQUARE SKELETON
 *      top ring, outer plan square      10.00 × 10.00
 *      ring beams                       0.50 wide, 0.47 deep
 *      second ring, same 10 × 10        1.21 below the top ring
 *      corner columns                   1.00 × 1.00, 3.00 long to the lower
 *                                       square, then 1.50 more to the ground
 *      lower square, 10 × 10            3.00 below the second ring
 *      central column                   1.00 × 1.00 × 1.50, between the
 *                                       top-ring and second-ring levels
 *    A closed square ring of four beams carries a full-length uniform line
 *    load on each edge: g1 NW, g2 NE, g3 SW, g4 SE (24–26 load arrows are
 *    drawn per edge, corner to corner).
 *    The view reads the pair "top ring + second ring" as one deep beam of
 *    depth 1.21 — that is what makes an arch-and-tie possible inside it, and
 *    it is stated in the caption because the sheet does not say it.
 *
 * b) FOUR DEEP BEAMS (WALLS) AT TWO LEVELS
 *      every wall                       10.00 long × 3.00 deep
 *      the two upper (loaded) walls      parallel, ≈ 4.60 apart
 *      column stubs                     0.50 × 0.50 × 1.50
 *    Two parallel deep beams at the upper level, each with a uniform g over
 *    its full 10-unit length, sitting on two more identical deep beams running
 *    perpendicular below. Three column stubs are visible under the lower beams
 *    (two solid, one dashed) at roughly the quarter points.
 *
 * WHAT IS DETERMINED, AND IT IS ALL A RATIO.
 *  a) Each edge beam of length L carries g·L and hands g·L/2 to each of its
 *     two corners. Every corner serves two edges, so with the four line loads
 *     equal each corner column carries
 *          2 × (g·L/2) = g·L  — the load of one WHOLE edge beam,
 *     i.e. exactly a quarter of the 4·g·L on the structure. Four corners,
 *     four edges, and the total closes. Inside each beam the flow resolves
 *     into a compression arch in the top fibre and a tension tie in the
 *     bottom fibre between the two corner nodes; nothing else on the frame is
 *     in net tension. The corner columns, the lower square and the lower
 *     columns are all in pure compression.
 *  b) Each loaded upper wall carries g over its 10 units and is held at the
 *     two points where it crosses a lower wall. Symmetric, so each crossing
 *     takes half: 5·g per crossing, drawn as a compression fan/arch running
 *     to those two points with a horizontal tie along the bottom edge between
 *     them. Those two crossing forces are the external loads on the lower
 *     walls, which repeat the pattern down to their columns. All columns
 *     compression.
 *
 * WHAT IS NOT DETERMINED — error E19c, carried openly.
 *  (i)  In a) the fifth, CENTRAL column's head sits at about (4.2 … 4.7,
 *       4.2 … 4.7) of the 10-unit square rather than at (5, 5), and two
 *       6.00-unit horizontal members radiate from it with no stated role. Its
 *       role cannot be pinned down from the geometry alone — and note that
 *       the moment it does carry load the frame becomes statically
 *       INDETERMINATE, so its share depends on stiffnesses the sheet never
 *       gives. No number can be put on it. The view lets the reader slide it
 *       around and states exactly that.
 *  (ii) In b) the number of columns under the lower walls cannot be counted,
 *       because any further ones are hidden behind the near wall.
 *  (iii) The lower walls' positions along the upper ones are only "roughly the
 *       quarter points"; this view places them at the quarter points and says
 *       so.
 *
 * The sheet prints no answers, and no numbers to derive them from.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

// ---------------------------------------------------- isometric projection --

const ISO_F = 0.8165;                  // the sheet's own foreshortening
const C30 = Math.cos(Math.PI / 6), S30 = 0.5;
// x rises to the right at 30°, y rises to the left at 30°, z is vertical
// ISO_C recentres the projection on the model's own screen-space middle, so
// the axonometric sits where the layout puts it instead of growing off the top
const ISO_C = 7.5;
const iso = (p) => [
  (p[0] - p[1]) * C30 * ISO_F,
  (p[0] + p[1]) * S30 * ISO_F + p[2] * ISO_F - ISO_C,
];

// ------------------------------------------------------------- the models --

const L = 10.0;                        // the 10-unit square / wall length

// a) levels, in recovered units above the ground
const Z_GND = 0.0, Z_LOW = 1.50, Z_SEC = 4.50, Z_TOP = 5.71;
// b) levels
const ZB_GND = 0.0, ZB_LOWB = 1.50, ZB_LOWT = 4.50, ZB_UPT = 7.50;
const WY = [2.70, 7.30];               // the two loaded upper walls, ≈4.60 apart
const WX = [2.50, 7.50];               // the two lower walls, at the quarter points

// a deep beam: two ends on its BOTTOM chord, and a depth upward
const beamsA = () => [
  { a: [0, 0, Z_SEC], b: [L, 0, Z_SEC], d: Z_TOP - Z_SEC, g: 'g3' },
  { a: [L, 0, Z_SEC], b: [L, L, Z_SEC], d: Z_TOP - Z_SEC, g: 'g4' },
  { a: [L, L, Z_SEC], b: [0, L, Z_SEC], d: Z_TOP - Z_SEC, g: 'g2' },
  { a: [0, L, Z_SEC], b: [0, 0, Z_SEC], d: Z_TOP - Z_SEC, g: 'g1' },
];
const beamsB = () => [
  { a: [WX[0], WY[0], ZB_LOWT], b: [WX[1], WY[0], ZB_LOWT], d: ZB_UPT - ZB_LOWT,
    g: 'g', full: [[0, WY[0], ZB_LOWT], [L, WY[0], ZB_LOWT]] },
  { a: [WX[0], WY[1], ZB_LOWT], b: [WX[1], WY[1], ZB_LOWT], d: ZB_UPT - ZB_LOWT,
    g: 'g', full: [[0, WY[1], ZB_LOWT], [L, WY[1], ZB_LOWT]] },
  { a: [WX[0], WY[0], ZB_LOWB], b: [WX[0], WY[1], ZB_LOWB], d: ZB_LOWT - ZB_LOWB,
    g: '', full: [[WX[0], 0, ZB_LOWB], [WX[0], L, ZB_LOWB]] },
  { a: [WX[1], WY[0], ZB_LOWB], b: [WX[1], WY[1], ZB_LOWB], d: ZB_LOWT - ZB_LOWB,
    g: '', full: [[WX[1], 0, ZB_LOWB], [WX[1], L, ZB_LOWB]] },
];

const NB = 4;                          // deep beams per case
const NARCH = 6;                       // segments in one arch polyline
const NWIRE = 40;                      // wireframe strokes
const NCOL = 10;                       // column segments
const NLOAD = 13;                      // load arrows per beam

// ---------------------------------------------------------------- layout --

const AXC = [14.5, -1.8], AXM = 1.34;  // the axonometric
const EX = -15.0, EY = -5.6, EM = 1.30, ED = 1.30;   // the flat key elevation

const DEFAULTS = { cs: 0, cc: 0.0, flow: true, wire: true, lbl: true, _k: 99 };

const K_LOAD = 2, K_FLOW = 3, K_REACT = 4, K_COL = 5, K_OPEN = 6;

export const meta = {
  title: 'EX X · 12 — a page with no numbers on it',
  subtitle: 'Structural Design II · “EX X — Additional Exercises”, p. 10 · German Aufgabe 12 (the English sheet calls it “Task 3”)',
  about: 'Two axonometric skeletons and one instruction: colour the force flow. There is no scale on this page, no dimension line and no load magnitude — g1 to g4 and g are symbols and nothing more — so the honest answer is a coloured drawing plus a handful of ratios, and that is what this view gives. Nothing is invented. What IS exact is the bookkeeping: a ring of four edge beams hands each corner column the load of one entire edge, a clean quarter of the total, and every column on both structures is in compression while the only tension is the tie along the bottom of each deep beam. What is NOT determinable is said out loud: the fifth column in a) makes the frame statically indeterminate the moment it touches anything, and in b) you cannot even count the columns, because the near wall hides them.',
  result: (d) => [
    `${d.tag} — the sheet prints NO load and NO dimension on page 10, so every quantity here is a ratio, not a number`,
    d.cs === 0
      ? `a) each edge beam carries g·L and gives g·L/2 to each corner · each corner column therefore takes 2 × g·L/2 = g·L = ¼ of the 4·g·L total`
      : `b) each upper wall carries g·L = 10·g and is held at its two crossings with the lower walls, so each crossing takes 5·g; each lower wall then carries 2 × 5·g = 10·g and passes 5·g to each of its columns`,
    `inside every deep beam: compression arch in the top fibre (navy), tension tie along the bottom (pink) — the tie is the ONLY tension in either structure`,
    d.cs === 0
      ? `NOT determinable: the fifth column's head is drawn at about (4.2…4.7, 4.2…4.7), not (5, 5), and two 6.00-unit members radiate from it with no stated role. Load it and the frame is statically indeterminate — its share depends on stiffnesses the sheet never gives`
      : `NOT determinable: how many columns stand under the lower walls — any beyond the three drawn are hidden behind the near wall. The lower walls are placed here at the quarter points, which is only "roughly" what the drawing shows`],
  frame: [[-26, -22], [30, 16]],
};

const STEPS = [
  { t: 'The exercise', d: 'EX X page 10, German Aufgabe 12: “draw a qualitative internal force flow in the axonometric drawing”. Two structures, four line loads on one and one on the other — and not a single number anywhere on the page',
    detail: () => ['no scale, no dimension line, no load magnitude: g1 … g4 and g are symbols',
                   'the axonometrics are TRUE isometrics (30 / 150 / 90°, foreshortening 0.8165), verified on page 9',
                   'so proportions can be recovered exactly, and absolute sizes cannot'],
    take: 'when a task has no numbers, the answer is not "about so much" — it is a ratio, or it is nothing' },
  { t: 'The skeleton', d: 'right: the structure, drawn with the sheet’s own isometric. Switch between a) and b) in the panel. Grey is just material — nothing here is a force yet',
    detail: (d) => (d.cs === 0
      ? [`a) a closed ring of four beams on a 10 × 10 square, over a second identical ring 1.21 below`,
         `four 1.00 × 1.00 corner columns, 3.00 down to a lower square, then 1.50 more to the ground`,
         `and a fifth, central column 1.00 × 1.00 × 1.50 whose role the drawing never explains`]
      : [`b) two deep beams 10.00 long × 3.00 deep at the upper level, ≈ 4.60 apart`,
         `sitting on two more identical deep beams running perpendicular below`,
         `column stubs 0.50 × 0.50 × 1.50 under the lower beams, at roughly the quarter points`]) },
  { t: 'The loads', d: 'green: the uniform line loads, drawn corner to corner exactly as the sheet draws them. They have names and no values, and that is the whole difficulty of the page',
    detail: (d) => (d.cs === 0
      ? ['g1 on the NW edge, g2 NE, g3 SW, g4 SE — four full-length uniform loads',
         'each edge beam therefore carries g × 10.00 units of load',
         'the sheet draws 24–26 arrows per edge and no magnitude on any of them']
      : ['g over the full 10.00 units of each of the two upper walls',
         'the lower walls carry no direct load: everything reaches them through the crossings',
         'and g has no value']) },
  { t: 'Inside a deep beam', d: 'left: one beam on its own, and this is the whole answer in miniature. A beam this deep does not bend, it makes an arch: compression sweeping through the top fibre from support to support, and a straight tension tie along the bottom holding the two feet apart',
    detail: (d) => [`the beam is ${d.bd.toFixed(2)} units deep over a ${d.bl.toFixed(2)} unit span — a ratio of 1 : ${(d.bl / d.bd).toFixed(2)}`,
                    'navy = the compression arch in the top fibre · pink = the tension tie along the bottom',
                    'the tie is the only tension in either structure — everything else pushes'],
    take: 'the deeper the beam, the flatter the arch and the smaller the tie. That is the only design freedom there is here' },
  { t: 'Where it lands', d: 'the arch has to come down somewhere, and where it does is a green external force on whatever is underneath. In a) that is the four corners; in b) it is the four points where an upper wall crosses a lower one',
    detail: (d) => (d.cs === 0
      ? ['each edge beam gives g·L/2 to each of its two corner nodes',
         'each corner serves TWO edges, so it collects 2 × g·L/2 = g·L',
         'four corners × g·L = 4·g·L = the whole load. It closes ✓']
      : ['each upper wall is symmetric about its two crossings, so each takes 5·g',
         'each lower wall then receives 2 × 5·g = 10·g, one from each upper wall',
         'and hands 5·g to each of its own columns. It closes ✓']),
    take: 'in a), each corner column carries exactly one whole edge beam’s worth of load — a clean quarter of everything' },
  { t: 'Down to the ground', d: 'navy all the way: columns are in pure compression, the lower ring only redistributes, and the second level repeats what the first one did. Nothing below the ties is ever pulled',
    detail: (d) => (d.cs === 0
      ? ['corner column, upper length 3.00: compression g·L',
         'lower square: it collects and passes on, nothing more',
         'corner column, lower length 1.50: the same g·L, to the ground']
      : ['column stubs 1.50 long, in compression',
         'each carries 5·g, and 4 × 5·g = 20·g = 2 × 10·g = the two upper walls ✓',
         'the pattern of level 1 is simply repeated at level 2, rotated 90°']) },
  { t: 'What cannot be answered', d: 'and now the part a solution key would skip. Each structure has a feature that the drawing does not resolve, and no amount of staring fixes it',
    detail: (d) => (d.cs === 0
      ? ['the fifth column’s head is at about (4.2 … 4.7, 4.2 … 4.7) of the square, not at (5, 5)',
         'two 6.00-unit horizontal members radiate from it toward the perimeter, with no stated role',
         'and the moment it carries load the frame is statically INDETERMINATE — no share can be computed']
      : ['three column stubs are visible under the lower walls, two solid and one dashed',
         'any further ones would be hidden behind the near wall, so the count cannot be established',
         'the lower walls sit at "roughly the quarter points" — placed here at exactly 2.50 and 7.50']),
    take: 'slide the fifth column about: the drawing changes and the answer does not, because there is no answer to change' },
  { t: 'The answer, in ratios', d: 'so this is what a correct solution to page 10 looks like: a coloured drawing, four exact fractions, and two honest gaps. Not one kilonewton',
    detail: (d) => (d.cs === 0
      ? ['each edge beam: g·L, of which g·L/2 goes each way',
         'each corner column: g·L — one whole edge — which is ¼ of 4·g·L',
         'tension: the four bottom ties only. Compression: everything else']
      : ['each upper wall: 10·g, split 5·g / 5·g at its two crossings',
         'each lower wall: 10·g, split 5·g / 5·g to its two columns',
         'tension: the four bottom ties only. Compression: everything else']),
    take: 'ratios survive a missing scale. That is why they are worth writing down first' },
];

// ------------------------------------------------------------------ maths --

/** The arch polyline of a deep beam: a parabola in the plane of the beam,
    springing from the two bottom ends and rising to the full depth at
    midspan. Returned as 3-D points. */
function archPts(B, n = NARCH) {
  const out = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const h = 4 * t * (1 - t) * B.d;   // a parabola, 0 at both feet, d at mid
    out.push([B.a[0] + (B.b[0] - B.a[0]) * t,
              B.a[1] + (B.b[1] - B.a[1]) * t,
              B.a[2] + h]);
  }
  return out;
}

function compute(s) {
  const cs = Math.round(s.cs);
  const beams = cs === 0 ? beamsA() : beamsB();
  const B0 = beams[0];
  const bl = Math.hypot(B0.b[0] - B0.a[0], B0.b[1] - B0.a[1]);
  const bd = B0.d;

  // the wireframe of the chosen case
  const wire = [];
  const cols = [];
  if (cs === 0) {
    const sq = (z) => {
      const c = [[0, 0, z], [L, 0, z], [L, L, z], [0, L, z]];
      for (let i = 0; i < 4; i++) wire.push([c[i], c[(i + 1) % 4]]);
    };
    sq(Z_TOP); sq(Z_SEC); sq(Z_LOW);
    for (const [x, y] of [[0, 0], [L, 0], [L, L], [0, L]]) {
      wire.push([[x, y, Z_TOP], [x, y, Z_SEC]]);          // the ring's own depth
      cols.push([[x, y, Z_SEC], [x, y, Z_LOW]]);          // 3.00 to the lower square
      cols.push([[x, y, Z_LOW], [x, y, Z_GND]]);          // 1.50 to the ground
    }
    // the fifth column, wherever the reader puts it
    const cx = 4.45 + s.cc, cy = 4.45 + s.cc;
    wire.push([[cx, cy, Z_SEC], [cx, cy, Z_SEC - 1.5]]);
    wire.push([[cx, cy, Z_SEC], [cx + 6.0 * 0.7071, cy + 6.0 * 0.7071, Z_SEC]]);
    wire.push([[cx, cy, Z_SEC], [cx - 6.0 * 0.7071, cy - 6.0 * 0.7071, Z_SEC]]);
  } else {
    const rect = (p, q, z0, z1) => {
      const c = [[p[0], p[1], z0], [q[0], q[1], z0], [q[0], q[1], z1], [p[0], p[1], z1]];
      for (let i = 0; i < 4; i++) wire.push([c[i], c[(i + 1) % 4]]);
    };
    for (const y of WY) rect([0, y], [L, y], ZB_LOWT, ZB_UPT);
    for (const x of WX) rect([x, 0], [x, L], ZB_LOWB, ZB_LOWT);
    for (const x of WX) for (const y of [2.5, 7.5]) {
      cols.push([[x, y, ZB_LOWB], [x, y, ZB_GND]]);
    }
  }

  return { cs, tag: cs === 0 ? 'a)' : 'b)', beams, wire, cols, bl, bd,
           cc: s.cc, nWire: wire.length, nCol: cols.length };
}

// ------------------------------------------------------------------- view --

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const NARR = dw.W.narrow;
  const ax = (p) => V.add(AXC, V.mul(iso(p), AXM));

  dw.label('t_axo', '', { cls: 'title', flash: false });
  dw.label('t_elev', '', { cls: 'title', flash: false });
  dw.label('t_none', '', { cls: 'point', flash: false });

  // ---- the wireframe
  // no caps: the unused strokes are parked as zero-length pairs, and a capped
  // zero-length stroke renders as a dot in the middle of the drawing
  dw.strokes('wire', NWIRE, { intro: 1, w: dw.W.thin, color: PAL.grey,
    cap: false, when: (st) => st.wire });
  for (let i = 0; i < NCOL; i++) {
    dw.seg(`col${i}`, { intro: K_COL, w: dw.W.bar, color: PAL.blue,
      when: (st, dd) => !!dd && i < dd.nCol });
  }

  // ---- the loads and the flow, per deep beam
  for (let i = 0; i < NB; i++) {
    dw.arrows(`ld${i}`, NLOAD, { intro: K_LOAD, w: dw.W.thin, color: PAL.green,
      headLen: dw.W.narrow.headLen * 0.6, headW: dw.W.narrow.headW * 0.6,
      when: (st, dd) => !!dd && (dd.cs === 0 || i < 2) });
    dw.label(`lld${i}`, '', { cls: 'num', intro: K_LOAD, color: PAL.green,
      when: (st, dd) => !!dd && st.lbl && (dd.cs === 0 || i < 2) });
    dw.strokes(`arch${i}`, NARCH, { intro: K_FLOW, w: dw.W.bar, color: PAL.blue,
      when: (st) => st.flow });
    dw.seg(`tie${i}`, { intro: K_FLOW, w: dw.W.bar, color: PAL.red,
      when: (st) => st.flow });
    dw.arrow(`raA${i}`, { intro: K_REACT, color: PAL.green, ...NARR,
      when: (st) => st.flow });
    dw.arrow(`raB${i}`, { intro: K_REACT, color: PAL.green, ...NARR,
      when: (st) => st.flow });
  }

  // ---- the flat key elevation of one beam, on the left
  dw.strokes('kBox', 4, { intro: K_FLOW, w: dw.W.str, color: PAL.black });
  dw.strokes('kArch', NARCH, { intro: K_FLOW, w: dw.W.bar, color: PAL.blue });
  dw.seg('kTie', { intro: K_FLOW, w: dw.W.bar, color: PAL.red });
  dw.arrows('kLoad', NLOAD, { intro: K_FLOW, w: dw.W.thin, color: PAL.green,
    headLen: dw.W.narrow.headLen * 0.7, headW: dw.W.narrow.headW * 0.7 });
  dw.arrow('kRA', { intro: K_REACT, color: PAL.green, ...NARR });
  dw.arrow('kRB', { intro: K_REACT, color: PAL.green, ...NARR });
  dw.label('kArchL', 'compression arch', { cls: 'num', intro: K_FLOW, color: PAL.blue,
    when: (st) => st.lbl });
  dw.label('kTieL', 'tension tie', { cls: 'num', intro: K_FLOW, color: PAL.red,
    when: (st) => st.lbl });
  dw.label('kRL', '', { cls: 'num', intro: K_REACT, color: PAL.green });
  dw.label('kGL', '', { cls: 'num', intro: K_FLOW, color: PAL.green });

  // ---- the unresolved feature
  dw.dashedCircle('unres', { intro: K_OPEN, color: PAL.orange, dash: 0.5 });
  dw.label('lunres', '', { cls: 'num', intro: K_OPEN, color: PAL.orange });

  dw.instant('t_axo', 't_elev', 't_none');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    dw.setLabel('t_axo', [AXC[0], 11.2]);
    dw.setText('t_axo', `${d.tag} isometric — 30 / 150 / 90°, foreshortening ${ISO_F}`);
    dw.setLabel('t_none', [AXC[0], 10.0]);
    dw.setText('t_none', 'no scale and no load magnitude are printed on this page');
    dw.setLabel('t_elev', [EX, 1.0]);
    dw.setText('t_elev', `one deep beam, unrolled — ${d.bl.toFixed(2)} long × ${d.bd.toFixed(2)} deep`);

    // ---- wireframe
    const w = d.wire.map(([a, b]) => [ax(a), ax(b)]);
    while (w.length < NWIRE) w.push([ax([0, 0, 0]), ax([0, 0, 0])]);
    dw.setStrokes('wire', w.slice(0, NWIRE));
    for (let i = 0; i < NCOL; i++) {
      const c = d.cols[i];
      if (c) dw.setSeg(`col${i}`, ax(c[0]), ax(c[1]));
      else dw.setSeg(`col${i}`, ax([0, 0, 0]), ax([0, 0, 0]));
    }

    // ---- per beam: the load, the arch, the tie, the two landings
    for (let i = 0; i < NB; i++) {
      const B = d.beams[i];
      if (!B) continue;
      const lo = B.full ? B.full[0] : B.a, hi = B.full ? B.full[1] : B.b;
      const top = (p) => [p[0], p[1], B.a[2] + B.d];
      dw.setArrows(`ld${i}`, Array.from({ length: NLOAD }, (_, k) => {
        const t = k / (NLOAD - 1);
        const p = [lo[0] + (hi[0] - lo[0]) * t, lo[1] + (hi[1] - lo[1]) * t,
                   B.a[2] + B.d];
        return [ax([p[0], p[1], p[2] + 2.1]), ax([p[0], p[1], p[2] + 0.25])];
      }));
      const mid = [(lo[0] + hi[0]) / 2, (lo[1] + hi[1]) / 2, B.a[2] + B.d + 2.6];
      dw.setLabel(`lld${i}`, ax(mid));
      dw.setText(`lld${i}`, B.g);

      const arc = archPts(B).map(ax);
      dw.setStrokes(`arch${i}`, arc.slice(0, -1).map((p, k) => [p, arc[k + 1]]));
      dw.setSeg(`tie${i}`, ax(B.a), ax(B.b));
      for (const [nm, p] of [['A', B.a], ['B', B.b]]) {
        dw.setArrow(`ra${nm}${i}`, ax(p), ax([p[0], p[1], p[2] - 1.5]));
      }
      void top;
    }

    // ---- the flat key elevation
    const B0 = d.beams[0];
    const kx0 = EX - (d.bl * EM) / 2, kx1 = EX + (d.bl * EM) / 2;
    const kd = d.bd * ED;
    const bx = [[kx0, EY], [kx1, EY], [kx1, EY + kd], [kx0, EY + kd]];
    dw.setStrokes('kBox', bx.map((p, i) => [p, bx[(i + 1) % 4]]));
    const ka = [];
    for (let i = 0; i <= NARCH; i++) {
      const t = i / NARCH;
      ka.push([kx0 + (kx1 - kx0) * t, EY + 4 * t * (1 - t) * kd]);
    }
    dw.setStrokes('kArch', ka.slice(0, -1).map((p, i) => [p, ka[i + 1]]));
    dw.setSeg('kTie', [kx0, EY], [kx1, EY]);
    dw.setArrows('kLoad', Array.from({ length: NLOAD }, (_, k) => {
      const x = kx0 + ((kx1 - kx0) * k) / (NLOAD - 1);
      return [[x, EY + kd + 2.4], [x, EY + kd + 0.35]];
    }));
    dw.setLabel('kGL', [EX, EY + kd + 2.3]);
    dw.setText('kGL', `${B0.g || 'the load from above'} — no value is given`);
    dw.setArrow('kRA', [kx0, EY - 0.6], [kx0, EY - 2.8]);
    dw.setArrow('kRB', [kx1, EY - 0.6], [kx1, EY - 2.8]);
    dw.setLabel('kRL', [EX, EY - 3.6]);
    dw.setText('kRL', d.cs === 0 ? 'g·L/2 into each corner' : '5·g into each crossing');
    dw.setLabel('kArchL', [kx1 + 4.7, EY + kd * 0.6]);
    dw.setLabel('kTieL', [kx1 + 3.5, EY - 1.7]);

    // ---- the thing that cannot be resolved
    if (d.cs === 0) {
      const cx = 4.45 + d.cc;
      dw.setDashedCircle('unres', ax([cx, cx, Z_SEC]), 2.2);
      dw.setLabel('lunres', [AXC[0], -13.4]);
      dw.setText('lunres', 'the fifth column — role undefined');
    } else {
      dw.setDashedCircle('unres', ax([WX[1], 7.5, ZB_GND + 0.75]), 2.2);
      dw.setLabel('lunres', [AXC[0], -13.4]);
      dw.setText('lunres', 'how many columns? not countable');
    }

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const w = panel.section('The situation');
  panel.slider(w, s, 'cs', 'case', 0, 1, 1, refresh,
    (v) => (v < 0.5 ? 'a) the square ring on columns' : 'b) four deep beams at two levels'));
  panel.slider(w, s, 'cc', 'a) where the fifth column stands', -3.5, 3.5, 0.25, refresh,
    (v) => `${(4.45 + v).toFixed(2)}, ${(4.45 + v).toFixed(2)} — the sheet shows about 4.2…4.7`);
  panel.toggle(w, s, 'flow', 'show the force flow', refresh);
  panel.toggle(w, s, 'wire', 'show the skeleton', refresh);
  panel.toggle(w, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}
