/**
 * EX X · German task 7 — four identical wall slabs, four different answers
 * Structural Design II, FS 23, "Additional Exercises", sheet page 5.
 *
 * NUMBERING. The English sheet calls this block "Task 1"; the German sheet
 * calls it Aufgabe 7, and the German numbering is the correct one.
 *
 * TEXT (verbatim). "Four equal wall slabs in reinforced concrete but with
 * different supports or loads are given. In situations a) to c) draw a
 * possible internal force distribution as an arch-cable-structure with the aid
 * of the force diagram. Draw the corresponding force diagram to the given
 * force distribution in d). Indicate tension forces with red and compression
 * forces with blue."
 *
 * GIVENS. a) F = 70 kN inclined · b) q1 = 8 kN/m · c) q1 = 8 kN/m over the
 * left half plus F = 36 kN · d) q1 = 6 kN/m with offset supports and the force
 * path already drawn. All form diagrams 1:100, force diagrams 1 cm ≙ 10 kN.
 *
 * GEOMETRY, digitised (the sheet prints no dimensions). All four slabs are the
 * same 8.997 m wide × 3.093 m high panel. The support symbols sit 0.127 m
 * inside each edge, so in a), b) and c) the pin is at x = 0.127, the roller at
 * x = 8.875, and the span is 8.748 m. In d) the pin moves to x = 5.399
 * (= 0.6000 × the slab width, exactly) and the roller stays at 8.875.
 *
 * ANSWERS (all derived here; the sheet prints none).
 *
 * a) F = 70 kN at 16.40° below the horizontal, pointing down-and-to-the-left.
 *    Its line of action enters the left face at y = 2.112 m and leaves the top
 *    face at x = 3.331 m, so F = (−67.152, −19.764) kN.
 *      A = (+67.15, +36.27) kN = 76.32 kN at 28.37° above the horizontal
 *      B = −16.50 kN, i.e. 16.50 kN DOWNWARD
 *    check: a point on the line of action in slab coordinates is (−0.528,
 *    1.957) and A sits at (0.127, 0), so ΣM_A = (−0.655)(−19.764) −
 *    (1.957)(−67.152) = +144.36 kNm → B = −144.36 / 8.748 = −16.50 kN.
 *    ERROR IN THE SHEET: B is in UPLIFT and the support drawn there is a
 *    roller, which cannot pull down. Same fault as [G 2] on page 2.
 *    A possible internal path — the one drawn here — takes the load in at the
 *    point Q (3.331, 3.093) where its line of action crosses the top face and
 *    fans it to the two supports, with a chord along the base:
 *      Q–A −52.22 C · Q–B +33.88 T · base chord A–B −29.58 C
 *    Note the base chord comes out in COMPRESSION, not tension, because B
 *    hangs on rather than pushing up. The task asks for "a possible" path;
 *    this is one, and it is exactly determinate (3 members, 3 reactions,
 *    3 joints).
 *
 * b) q1 = 8 kN/m over the full 8.997 m → R = 71.976 kN at midspan.
 *      A = 36.01 kN, B = 35.97 kN (36.0 each to drawing accuracy)
 * c) q1 = 8 kN/m over the left 4.498 m (R_q = 35.98 kN at x = 2.249) plus
 *    F = 36 kN at x = 6.748 → total 71.98 kN.
 *      A = 36.01 kN, B = 35.97 kN — the same as b), because the combined
 *      resultant sits at (35.98 × 2.249 + 36 × 6.748) / 71.98 = 4.500 m,
 *      which is midspan. b) and c) are built to give the same answer from
 *      completely different loads.
 *    In b) and c) the distributed load is taken as six (b) or three (c) equal
 *    strip loads, the way compendium 3.1 does it, and the arch is then the
 *    funicular of those. The rise is the designer's one free choice and is the
 *    slider; the horizontal thrust is H = M_max / rise and the tie carries it.
 *
 * d) q1 = 6 kN/m over the full width → R = 53.982 kN at x = 4.4985, which is
 *    LEFT of the pin. The slab cantilevers 5.399 m to the left of A and only
 *    0.122 m past B.
 *      A = +67.97 kN up · B = −13.98 kN, i.e. 13.98 kN DOWNWARD
 *    check: A + B = 53.982 = R; ΣM_A: 53.982 × (5.399 − 4.4985) = 48.61 kNm
 *    balanced by 13.985 × 3.476 = 48.61 kNm.
 *    B passes through zero when the pin sits exactly under the resultant, at
 *    x = 4.4985 m, and goes into uplift for every position to the right of it.
 *    That is what the support slider shows.
 *
 * WHY d) HAS NO FORCE DIAGRAM HERE, said plainly. Both of d)'s reactions are
 * vertical and all of its loads are vertical, so there is NO external
 * horizontal thrust and no funicular: the slab works in bending, and any
 * internal path is a strut-and-tie whose horizontal component the designer
 * picks. The moment is hogging over the whole span (0 at the left edge,
 * −87.4 kNm over the pin, back to 0 at the roller), so the tie belongs at the
 * TOP of the slab and the compression below it — the opposite way up from
 * a), b) and c). The path the sheet draws is a sketch of that idea, not a
 * funicular: its two feet are not at the supports and it kinks at the crown
 * where the pin's reaction is delivered. It is reproduced here in grey exactly
 * as drawn, and labelled for what it is, rather than being given member forces
 * that the drawing does not actually determine.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';
import { makeJointTrussView, funicular } from '../lib/exx2first.js';

const W = 8.997, HGT = 3.093;
const XA = 0.127, XB = 8.875;                 // the pin and roller of a) – c)
const XA_D = 5.399;                           // d)'s pin, at 0.6 × the width
const MPU = 2.3, ORG = [-26, -7], SFD = 10;

// ------------------------------------------------------------------- a) ----
const QPT = [3.331, HGT];                     // where F's line crosses the top
const A_NODES = [[XA, 0], QPT, [XB, 0]];
const A_MEM = [[0, 1], [1, 2], [0, 2]];
const A_ANG = 16.40;

// --------------------------------------------------------------- b) / c) ---
const strips = (x0, x1, q, n) => {
  const w = (x1 - x0) / n, F = q * w;
  return Array.from({ length: n }, (_, i) => [x0 + (i + 0.5) * w, F]);
};
const B_LOADS = strips(0, W, 8, 6);
const C_LOADS = [...strips(0, W / 2, 8, 3), [6.748, 36]];
const D_LOADS = strips(0, W, 6, 6);

/** A funicular arch springing from the two supports, with a tie between them.
 *  Node 0 = the pin, nodes 1…n = the load points, node n+1 = the roller.
 *  Members: n+1 arch segments, then the tie. */
function funCase(LOADS, rise) {
  const xs = LOADS.map((l) => l[0]);
  const Fs = LOADS.map((l) => l[1]);
  const f0 = funicular(xs, Fs, XA, XB, 1);
  const H = f0.Mmax / rise;
  const f = funicular(xs, Fs, XA, XB, H);
  const nodes = [[XA, 0], ...xs.map((x, i) => [x, f.y[i]]), [XB, 0]];
  return { nodes, H, R0: f.R0, R1: f.R1, tot: f.tot, Mmax: f0.Mmax };
}
const funMembers = (n) => {
  const mm = [];
  for (let i = 0; i < n + 1; i++) mm.push([i, i + 1]);
  mm.push([0, n + 1]);                                    // the tie
  return mm;
};
const funSolve = (LOADS) => (s, M) => {
  const c = funCase(LOADS, s.rise);
  const forces = M.members.map(([i, j], m) => {
    if (m === M.members.length - 1) return c.H;           // the tie, in tension
    const a = M.nodes[i], b = M.nodes[j];
    return -c.H * (V.dist(a, b) / Math.abs(b[0] - a[0]));
  });
  const last = M.nodes.length - 1;
  return { forces, reactions: { 0: [0, c.R0], [last]: [0, c.R1] } };
};

// ------------------------------------------------------------------- d) ----
// nodes 0 = the pin, 1 = the roller, 2… = the load points on the top face
const D_NODES = (xa) => [[xa, 0], [XB, 0], ...D_LOADS.map((l) => [l[0], HGT])];
const dSolve = (s) => {
  const f = funicular(D_LOADS.map((l) => l[0]), D_LOADS.map((l) => l[1]),
                      s.xa, XB, 1);
  return { forces: [], reactions: { 0: [0, f.R0], 1: [0, f.R1] } };
};

// ---------------------------------------------------------------------------

const base = {
  MPU, ORG, SFD,
  supportDir: () => [0, -1],
  loadOff: () => [2.6, 0.4],
  cellLabelOff: [0, 4.6],
};
const cellGrid = (n, y0, dy) => Array.from({ length: n },
  (_, k) => [8 + (k % 2) * 16, y0 - Math.floor(k / 2) * dy]);

const CASES = [
  { ...base,
    tag: 'a)', name: 'one inclined 70 kN load',
    nodes: A_NODES, members: A_MEM, supports: { 0: 'pin', 2: 'roller-v' },
    loads: { 1: [-70 * Math.cos((A_ANG * Math.PI) / 180),
                 -70 * Math.sin((A_ANG * Math.PI) / 180)] },
    load: (s) => {
      const r = (A_ANG * Math.PI) / 180;
      return { 1: [-s.Fa * Math.cos(r), -s.Fa * Math.sin(r)] };
    },
    derive: (s, M, res) => ({ Ax: res.reactions[0][0], Ay: res.reactions[0][1],
                              By: res.reactions[2][1],
                              uplift: res.reactions[2][1] < -1e-9, tot: s.Fa }),
    poly: true, cells: cellGrid(3, 11, 13),
    nodeName: (i) => ['A', 'Q', 'B'][i],
    reacName: (i) => (i === 0 ? 'A' : 'B'),
    nodeLabelOff: (i) => ([[-2.6, -1.6], [1.4, 2.2], [2.6, -1.6]][i]),
    labelSide: (m) => [1, 1, -1][m],
    reacLabelOff: (i) => (i === 0 ? [-5.4, -1.8] : [4.2, 0.6]),
    note: 'B is in UPLIFT: 16.50 kN downward, which the drawn roller cannot deliver',
  },
  { ...base,
    tag: 'b)', name: 'q₁ = 8 kN/m over the full width',
    nodes: funCase(B_LOADS, 2.6).nodes, members: funMembers(B_LOADS.length),
    supports: { 0: 'pin', [B_LOADS.length + 1]: 'roller-v' },
    loads: Object.fromEntries(B_LOADS.map((l, i) => [i + 1, [0, -l[1]]])),
    geom: (s) => funCase(B_LOADS, s.rise).nodes,
    load: () => Object.fromEntries(B_LOADS.map((l, i) => [i + 1, [0, -l[1]]])),
    solve: funSolve(B_LOADS),
    derive: (s, M, res) => {
      const c = funCase(B_LOADS, s.rise);
      return { H: c.H, Mmax: c.Mmax, tot: c.tot, Ay: c.R0, By: c.R1,
               uplift: false, rise: s.rise };
    },
    poly: true, cells: cellGrid(8, 13, 9),
    nodeName: (i) => (i === 0 ? 'A' : i === B_LOADS.length + 1 ? 'B' : `n${i}`),
    nodeLabelOff: (i) => (i === 0 ? [-2.6, -1.6]
      : i === B_LOADS.length + 1 ? [2.6, -1.6] : [0, -2.2]),
    labelSide: (m) => (m === B_LOADS.length + 1 ? -1 : 1),
    reacLabelOff: (i) => (i === 0 ? [-3.8, -0.4] : [3.8, -0.4]),
    // six identical arrows need one label, not six on top of each other
    loadLabel: (i, mag) => (i === 4 ? `q₁ = 8 kN/m → 6 × ${mag.toFixed(2)} kN` : ''),
    loadOff: () => [10.6, 0.9],
    note: 'six equal strip loads stand in for the line load, the way compendium 3.1 does it',
  },
  { ...base,
    tag: 'c)', name: 'q₁ = 8 kN/m over the left half, plus F = 36 kN',
    nodes: funCase(C_LOADS, 2.6).nodes, members: funMembers(C_LOADS.length),
    supports: { 0: 'pin', [C_LOADS.length + 1]: 'roller-v' },
    loads: Object.fromEntries(C_LOADS.map((l, i) => [i + 1, [0, -l[1]]])),
    geom: (s) => funCase(C_LOADS, s.rise).nodes,
    load: () => Object.fromEntries(C_LOADS.map((l, i) => [i + 1, [0, -l[1]]])),
    solve: funSolve(C_LOADS),
    derive: (s, M, res) => {
      const c = funCase(C_LOADS, s.rise);
      return { H: c.H, Mmax: c.Mmax, tot: c.tot, Ay: c.R0, By: c.R1,
               uplift: false, rise: s.rise };
    },
    poly: true, cells: cellGrid(6, 13, 11),
    nodeName: (i) => (i === 0 ? 'A' : i === C_LOADS.length + 1 ? 'B' : `n${i}`),
    nodeLabelOff: (i) => (i === 0 ? [-2.6, -1.6]
      : i === C_LOADS.length + 1 ? [2.6, -1.6] : [0, -2.2]),
    labelSide: (m) => (m === C_LOADS.length + 1 ? -1 : 1),
    reacLabelOff: (i) => (i === 0 ? [-3.8, -0.4] : [3.8, -0.4]),
    loadLabel: (i, mag) => (i === 2 ? `q₁ = 8 kN/m → 3 × ${mag.toFixed(2)} kN`
      : i === C_LOADS.length ? `F = ${mag.toFixed(2)} kN` : ''),
    loadOff: (i) => (i === 2 ? [10.6, 0.9] : [5.4, 0.6]),
    note: 'the combined resultant lands at midspan, so c) has exactly b)’s reactions',
  },
  { ...base,
    tag: 'd)', name: 'q₁ = 6 kN/m, the pin moved inboard',
    nodes: D_NODES(XA_D), members: [], supports: { 0: 'pin', 1: 'roller-v' },
    loads: Object.fromEntries(D_LOADS.map((l, i) => [i + 2, [0, -l[1]]])),
    geom: (s) => D_NODES(s.xa),
    load: () => Object.fromEntries(D_LOADS.map((l, i) => [i + 2, [0, -l[1]]])),
    solve: dSolve,
    derive: (s, M, res) => ({ Ay: res.reactions[0][1], By: res.reactions[1][1],
                              uplift: res.reactions[1][1] < -1e-9,
                              tot: D_LOADS.reduce((a, l) => a + l[1], 0),
                              xres: 4.4985 }),
    poly: false,
    nodeName: (i) => (i === 0 ? 'A' : i === 1 ? 'B' : ''),
    reacName: (i) => (i === 0 ? 'A' : 'B'),
    nodeLabelOff: (i) => (i === 0 ? [-2.6, -1.6] : i === 1 ? [2.6, -1.6] : [0, 0]),
    reacLabelOff: (i) => (i === 0 ? [-3.8, -0.4] : [3.8, -0.4]),
    loadLabel: (i, mag) => (i === 5 ? `q₁ = 6 kN/m → 6 × ${mag.toFixed(2)} kN` : ''),
    loadOff: () => [10.6, 0.9],
    note: (d) => (d.uplift
      ? `the pin is right of the load resultant, so B is held DOWN: ${Math.abs(d.By).toFixed(2)} kN`
      : 'the pin is left of the load resultant, so both supports push up'),
  },
];

const STEPS = [
  { t: 'The exercise', d: 'page 5 of the sheet: the same 9.0 by 3.1 metre reinforced-concrete wall slab four times over, with different loads and, in the last one, different supports. Draw a possible internal force path for a) to c) and read the given one in d)' },
  { t: 'The slab', d: 'left: the case on show. The panel never changes; the support symbols sit 0.127 m inside each edge, so the span in a) to c) is 8.748 m. In d) the pin has moved inboard to 60 % of the width',
    detail: (d) => [`${d.tag} ${d.name}`,
                    `panel ${W} × ${HGT} m · ${d.ci === 3 ? `pin at x = ${d.xa.toFixed(3)} m` : `pin at x = ${XA} m`}, roller at x = ${XB} m`,
                    `total load ${d.tot.toFixed(2)} kN`] },
  { t: 'The reactions', d: 'three equations before anything is drawn inside. In a) the load is inclined, so the pin takes all of the horizontal push; in b), c) and d) everything is vertical and the pin takes nothing sideways',
    detail: (d) => [d.ci === 0
      ? `A = (${d.Ax.toFixed(2)}, ${d.Ay.toFixed(2)}) kN = ${Math.hypot(d.Ax, d.Ay).toFixed(2)} kN at ${((Math.atan2(d.Ay, d.Ax) * 180) / Math.PI).toFixed(2)}° · B = ${d.By.toFixed(2)} kN`
      : `A = ${d.Ay.toFixed(2)} kN · B = ${d.By.toFixed(2)} kN`,
      `ΣV: ${d.Ay.toFixed(2)} ${d.By < 0 ? '−' : '+'} ${Math.abs(d.By).toFixed(2)} = ${(d.Ay + d.By).toFixed(2)} kN = the total load ✓`,
      d.uplift ? 'the reaction at B is NEGATIVE: that support is being pulled down' : ''].filter(Boolean),
    take: (d) => (d.uplift ? 'a roller cannot pull. As drawn, this slab lifts off its right-hand bearing' : '') },
  { t: (d) => (d.ci === 3 ? 'Why d) has no funicular' : 'A possible force path'),
    d: (d) => (d.ci === 3
      ? 'every load and both reactions in d) are vertical, so there is no external horizontal thrust and no funicular at all — this slab works in bending. The moment is hogging over the whole span, which puts the tie at the TOP and the compression below it, the opposite way up from a) to c). What the sheet draws is a sketch of that idea, shown here in grey exactly as it is drawn'
      : d.ci === 0
        ? 'one load, three forces: the load comes in where its line of action crosses the top face and fans to the two supports, with a chord along the base closing the triangle. That is exactly determinate, and it is only ONE of the paths the task would accept'
        : 'the line load is replaced by equal strip loads and the arch is their funicular. Its rise is the one thing the task leaves to you — pick it, and the thrust follows as H = M_max / rise'),
    detail: (d) => (d.ci === 3
      ? ['the drawn path’s two feet are not at the supports and it kinks over the pin, where the pin’s reaction arrives',
         'so its member forces are not determined by the drawing; the reactions are, and they are above',
         `M over the pin = −${(6 * d.xa * d.xa / 2).toFixed(2)} kNm — hogging, so the tie goes on top`]
      : d.ci === 0
        ? [`Q–A ${d.forces[0].toFixed(2)} C · Q–B +${d.forces[1].toFixed(2)} T · base chord A–B ${d.forces[2].toFixed(2)} ${d.forces[2] < 0 ? 'C' : 'T'}`,
           'the base chord is in COMPRESSION, not tension: B hangs on instead of pushing up, and that reverses it',
           `residual of the joint solve ${d.resid.toExponential(1)} kN`]
        : [`M_max = ${d.Mmax.toFixed(2)} kNm at the rise you chose, ${d.rise.toFixed(2)} m → H = ${d.H.toFixed(2)} kN`,
           `tie +${d.H.toFixed(2)} kN tension, constant along its whole length`,
           `steepest arch segment ${d.cmax.toFixed(2)} kN — always the one at a support`]),
    take: (d) => (d.ci === 1 || d.ci === 2
      ? 'a flatter arch is a bigger thrust: drag the rise and watch the tie force run away as the arch approaches the straight line'
      : '') },
  { t: 'The force diagram', d: (d) => (d.C.poly
      ? 'right: one closed polygon per joint, drawn to scale, every edge parallel to the member it stands for. The arch joints are all the same triangle rotated — that is what a funicular looks like from the force side'
      : 'there is none to draw: with no horizontal thrust there is no pole and no funicular. The reactions above are the whole of what d) determines'),
    detail: (d) => (d.C.poly
      ? [`${d.nodes.length} joints → ${d.nodes.length} polygons, 1 unit ≙ ${SFD} kN (the sheet asks for 1 cm ≙ 10 kN)`,
         `largest tension +${d.tmax.toFixed(2)} kN · largest compression ${d.cmax.toFixed(2)} kN`]
      : ['d) is the one case where the sheet supplies the path instead of asking for it',
         'and the path it supplies is indicative, not a funicular']) },
  { t: 'b) and c) are the same sum', d: 'switch to b) and then c) in the panel. One is a line load over the whole slab; the other is a line load over half of it plus a point load two-thirds of the way along. Completely different drawings, and identical reactions — because both resultants land at midspan',
    detail: () => ['b) R = 8 × 8.997 = 71.98 kN at x = 4.499 m',
                   'c) R_q = 8 × 4.498 = 35.98 kN at x = 2.249 m and F = 36 kN at x = 6.748 m',
                   'c) combined: (35.98 × 2.249 + 36 × 6.748) / 71.98 = 4.500 m — midspan again'],
    take: 'this is deliberate. Two load cases that a support cannot tell apart are the cleanest possible demonstration that a reaction only knows the resultant' },
  { t: 'd) Move the support', d: 'switch to d) in the panel, then drag the pin. While it sits left of the load’s resultant both supports push up; the moment it passes the resultant at 4.4985 m the roller goes into uplift, and by the sheet’s own 5.399 m it is being held down by 13.98 kN. The sheet’s own arrows already say so — A points up, B points down',
    detail: (d) => {
      // d)'s own reactions, whichever case happens to be on show
      const f = funicular(D_LOADS.map((l) => l[0]), D_LOADS.map((l) => l[1]),
                          d.xa, XB, 1);
      return [`resultant of q₁ = ${(6 * W).toFixed(3)} kN at x = ${(W / 2).toFixed(4)} m`,
              `pin at x = ${d.xa.toFixed(3)} m → A = ${f.R0.toFixed(2)} kN, B = ${f.R1.toFixed(2)} kN`,
              `B = 0 exactly when the pin sits under the resultant, at x = ${(W / 2).toFixed(4)} m`];
    },
    take: 'the sheet drew d) in uplift on purpose — it is the only one of the four where the arrows themselves tell you the answer before you calculate it' },
];

export const { meta, create } = makeJointTrussView({
  title: 'EX X · 7 — four identical wall slabs, four different answers',
  subtitle: 'Structural Design II · sheet EX X “Additional Exercises”, page 5 (German task 7 a)–d); the English sheet calls it “Task 1”)',
  about: 'The same nine-by-three metre concrete panel four times, with a different load or a different pair of supports each time. a) is one inclined 70 kN load and its right-hand reaction comes out negative — a roller that has to pull down, the same fault as page 2. b) and c) are built to give identical reactions from completely different loads, because both resultants land at midspan. d) moves the pin inboard until the slab cantilevers, and the roller is held down. Only d) has its force path printed on the sheet, and it is the one case that has no funicular at all — every force in it is vertical, so the slab works in bending and the sketch the sheet draws is exactly that: a sketch.',
  result: (d) => [
    `${d.tag} ${d.name} — total load ${d.tot.toFixed(2)} kN`,
    d.ci === 0
      ? `A = (${d.Ax.toFixed(2)}, ${d.Ay.toFixed(2)}) kN = ${Math.hypot(d.Ax, d.Ay).toFixed(2)} kN at ${((Math.atan2(d.Ay, d.Ax) * 180) / Math.PI).toFixed(2)}° above the horizontal · B = ${d.By.toFixed(2)} kN — DOWNWARD, which the drawn roller cannot deliver`
      : `A = ${d.Ay.toFixed(2)} kN · B = ${d.By.toFixed(2)} kN${d.uplift ? ' — DOWNWARD, so the roller is in uplift' : ''}`,
    d.ci === 0
      ? `one possible path: Q–A ${d.forces[0].toFixed(2)} C, Q–B +${d.forces[1].toFixed(2)} T, base chord ${d.forces[2].toFixed(2)} ${d.forces[2] < 0 ? 'C' : 'T'}`
      : d.ci === 3
        ? 'no funicular exists: all forces are vertical, so the slab works in bending and the drawn path is an indicative strut-and-tie sketch'
        : `arch rise ${d.rise.toFixed(2)} m → H = M_max / rise = ${d.Mmax.toFixed(2)} / ${d.rise.toFixed(2)} = ${d.H.toFixed(2)} kN in the tie`,
    d.ci === 3
      ? `B changes sign at a pin position of ${(W / 2).toFixed(4)} m — the sheet puts the pin at ${XA_D} m, well past it`
      : 'b) and c) have identical reactions: both resultants land at midspan'],
  frame: [[-28, -32], [34, 23]],
  defaults: { cas: 0, rise: 2.6, Fa: 70, xa: XA_D },
  caseOf: (s) => s.cas,
  cases: CASES,
  at: { form: 1, load: 1, reac: 2, mem: 3, poly: 4 },
  steps: STEPS,
  formTitle: (d) => `${d.tag} — Form diagram 1:100`,
  noPolyNote: 'no funicular exists for d): every force in it is vertical',
  titlePos: { form: [-15, -16.4], force: [16, 21.4], sub: [16, 19.8],
              note: [-15, -18.1], zero: [-15, -19.8] },

  declare: (dw) => {
    dw.strokes('slab', 4, { intro: 1, w: dw.W.thin, color: PAL.grey, flash: false });
    dw.poly('slabFill', 4, { intro: 1, color: PAL.grey, opacity: 0.09, z: -0.25,
      flash: false });
    dw.instant('slab', 'slabFill');
    dw.dashLine('loa', { intro: 1, color: PAL.grey, dash: dw.W.dash,
      when: (st) => Math.round(st.cas) === 0 });
    dw.label('lloa', 'F: line of action', { cls: 'point', flash: false, intro: 1,
      color: PAL.grey, when: (st) => Math.round(st.cas) === 0 });
    dw.instant('loa', 'lloa');
    // d): the path the sheet itself draws, reproduced as drawn
    const inD = (st) => Math.round(st.cas) === 3;
    dw.dashLine('dArch', { intro: 3, color: PAL.grey, dash: dw.W.dash, when: inD });
    dw.dashLine('dTie', { intro: 3, color: PAL.grey, dash: dw.W.dash, when: inD });
    dw.dashLine('dStrut', { intro: 3, color: PAL.grey, dash: dw.W.dash, when: inD });
    dw.label('ldPath', '', { cls: 'point', flash: false, intro: 3, color: PAL.grey,
      when: inD });
    // d): where the load resultant stands, which is what decides B's sign
    dw.dashLine('dRes', { intro: 2, color: PAL.green, dash: dw.W.dash, when: inD });
    dw.label('ldRes', '', { cls: 'num', intro: 2, color: PAL.green, when: inD });
  },
  extra: (dw, d) => {
    const ux = (p) => [ORG[0] + p[0] * MPU, ORG[1] + p[1] * MPU];
    const c = [ux([0, 0]), ux([W, 0]), ux([W, HGT]), ux([0, HGT])];
    dw.setStrokes('slab', c.map((p, i) => [p, c[(i + 1) % 4]]));
    dw.setPoly('slabFill', c);
    // a)'s line of action, through the point where it crosses the top face
    const r = (A_ANG * Math.PI) / 180;
    const u = [Math.cos(r), Math.sin(r)];
    const q = ux(QPT);
    dw.setDashLine('loa', [[q[0] - u[0] * 12, q[1] - u[1] * 12],
                           [q[0] + u[0] * 6, q[1] + u[1] * 6]]);
    dw.setLabel('lloa', [q[0] + u[0] * 6 + 6.6, q[1] + u[1] * 6 + 2.0]);
    // d)'s given path: a curved arch from the left corner over the pin to the
    // roller, a straight chord along the base and a strut on the crown line
    const foot = [0.090, 0.100], crown = [d.xa, 3.040], right = [XB, 0.100];
    const bez = [];
    for (let t = 0; t <= 12; t++) {
      const s2 = t / 12;
      const p = s2 < 0.5
        ? [foot[0] + (crown[0] - foot[0]) * (s2 * 2),
           foot[1] + (crown[1] - foot[1]) * Math.sin((s2 * 2) * Math.PI / 2)]
        : [crown[0] + (right[0] - crown[0]) * ((s2 - 0.5) * 2),
           right[1] + (crown[1] - right[1]) * Math.cos(((s2 - 0.5) * 2) * Math.PI / 2)];
      bez.push(ux(p));
    }
    dw.setDashLine('dArch', bez);
    dw.setDashLine('dTie', [ux(foot), ux(right)]);
    dw.setDashLine('dStrut', [ux(crown), ux([d.xa, 0])]);
    dw.setLabel('ldPath', V.add(ux([1.35, 2.60]), [0, 0]));
    dw.setText('ldPath', 'the sheet’s own path (indicative)');
    // the resultant of d)'s line load, on its own dash-dot line
    const xr = W / 2;
    dw.setDashLine('dRes', [ux([xr, -1.1]), ux([xr, HGT + 0.5])]);
    dw.setLabel('ldRes', V.add(ux([xr, 0]), [-7.6, -3.0]));
    dw.setText('ldRes', `R = ${d.tot.toFixed(2)} kN at x = ${xr.toFixed(4)} m`);
  },
  controls: (panel, s, refresh) => {
    const sec = panel.section('The case');
    panel.slider(sec, s, 'cas', 'slab', 0, 3, 1, refresh,
      (v) => `${CASES[Math.round(v)].tag}  ${CASES[Math.round(v)].name}`);
    const g = panel.section('Given');
    panel.slider(g, s, 'rise', 'b) and c): arch rise (m)', 0.6, 2.95, 0.05, refresh,
      (v) => `${v.toFixed(2)} m of the ${HGT} m depth`);
    panel.slider(g, s, 'Fa', 'a) F (kN)', 20, 140, 5, refresh,
      (v) => `${v.toFixed(0)} kN${Math.abs(v - 70) < 2.6 ? '  ← the sheet’s value' : ''}`);
    panel.slider(g, s, 'xa', 'd) pin position (m)', 0.2, 8.6, 0.05, refresh,
      (v) => `${v.toFixed(3)} m${Math.abs(v - XA_D) < 0.026 ? '  ← as drawn'
        : v > W / 2 ? '  · the roller is in uplift' : '  · both supports push up'}`);
  },
});
