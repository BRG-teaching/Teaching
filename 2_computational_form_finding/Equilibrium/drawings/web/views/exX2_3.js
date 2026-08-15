/**
 * EX X · German task 3 — a shallow symmetric truss, and why depth is money
 * Structural Design II, FS 23, "Additional Exercises", sheet page 2 (bottom).
 *
 * NUMBERING. The English sheet calls this block "Task 4"; the German sheet
 * calls it Aufgabe 3. The German numbering is the correct one throughout the
 * booklet and is used here.
 *
 * TEXT (verbatim). "Draw the corresponding force diagram for the given truss.
 * Indicate tension forces with red and compression forces with blue."
 *
 * GIVENS. F = 50 kN, vertical, down, at the apex. Form diagram 1:100,
 * force diagram 1 cm ≙ 10 kN.
 *
 * GEOMETRY, digitised (the sheet prints no dimensions). Origin = support A.
 *   A  (pin)      0.000  0.000
 *   Ln            3.934  0.950
 *   T  (apex)     5.083  2.941     ← the load acts here, exactly at midspan
 *   Rn            6.232  0.950
 *   B  (roller)  10.166  0.000
 * Members A–T, T–B (rafters, 5.8725 m); A–Ln, Rn–B (4.0471 m); Ln–Rn
 * (2.298 m); T–Ln, T–Rn (2.2988 m). 7 + 3 = 10 = 2 × 5 joints → determinate.
 *
 * ANSWERS at the drawn 2.941 m rise (derived here; the sheet prints none).
 *   A = B = 25.00 kN up, A_x = 0
 *   rafters A–T and T–B    −85.68 C
 *   A–Ln and Rn–B          +76.29 T
 *   Ln–Rn                  +63.82 T
 *   T–Ln and T–Rn          +20.68 T
 *   check at joint A, horizontal: −85.68 × (5.083/5.8725) = −74.16 kN against
 *   +76.29 × (3.934/4.0471) = +74.16 kN — balances. Vertical: −85.68 ×
 *   (2.941/5.8725) + 76.29 × (0.950/4.0471) = −42.91 + 17.91 = −25.00 kN,
 *   matched by the reaction. Global: 2 × 25 = 50 kN.
 *
 * WHAT THE SLIDER IS FOR. The reactions are fixed by statics at 25 kN each
 * whatever the shape, but every internal force is inversely proportional to
 * the depth. Flatten the truss and the rafter force runs away; the two numbers
 * that never move are the two reactions. That is the lesson of a shallow
 * truss, and it is why the sheet drew this one shallow.
 * The whole truss is scaled vertically by rise / 2.941, so Ln and Rn keep
 * their proportions; the span never changes.
 */

import { makeJointTrussView } from '../lib/exx2first.js';

const SPAN = 10.166;
const DRAWN_RISE = 2.941;
const BASE_Y = [0, 0.950, 2.941, 0.950, 0];          // A, Ln, T, Rn, B
const XS = [0, 3.934, 5.083, 6.232, 10.166];
const MEM = [[0, 2], [2, 4], [0, 1], [3, 4], [1, 3], [2, 1], [2, 3]];
const NAME = ['A', 'Ln', 'T', 'Rn', 'B'];
const MNAME = ['A–T', 'T–B', 'A–Ln', 'Rn–B', 'Ln–Rn', 'T–Ln', 'T–Rn'];

const MPU = 2.0, ORG = [-26, -10];

const geom = (s) => XS.map((x, i) => [x, BASE_Y[i] * (s.rise / DRAWN_RISE)]);

const CASE = {
  tag: 'p.2', name: 'symmetric shallow truss, 50 kN at the apex',
  nodes: geom({ rise: DRAWN_RISE }), members: MEM,
  supports: { 0: 'pin', 4: 'roller-v' },
  loads: { 2: [0, -50] },
  geom,
  load: (s) => ({ 2: [0, -s.F] }),
  derive: (s, M, res) => ({
    rafter: res.forces[0], tie: res.forces[4],
    depth: M.nodes[2][1],
    rafterLen: Math.hypot(M.nodes[2][0], M.nodes[2][1]),
    // the horizontal component is the one that is exactly M/z
    rafterH: Math.abs(res.forces[0]) * M.nodes[2][0]
             / Math.hypot(M.nodes[2][0], M.nodes[2][1]),
  }),
  poly: true,
  cells: [[8, 13], [24, 13], [8, 1], [24, 1], [8, -12]],
  MPU, ORG,
  // the forces scale as 1/rise, so the force diagram has to keep up
  SFD: (d) => Math.max(14, d.fmax / 5),
  nodeName: (i) => NAME[i],
  nodeLabelOff: (i) => ([[-3.0, -0.6], [-0.6, -2.4], [0, 2.6], [0.6, -2.4], [3.0, -0.6]][i]),
  labelSide: (m) => [1, 1, -1, -1, -1, -1, 1][m],
  reacLabelOff: (i) => (i === 0 ? [-3.8, -0.4] : [3.8, -0.4]),
  supportDir: () => [0, -1],
  loadOff: () => [3.0, 0.5],
  cellLabelOff: [0, 5.4],
  note: (d) => `rise ${d.depth.toFixed(3)} m → rafter ${Math.abs(d.rafter).toFixed(2)} kN, while the reactions stay at ${Math.hypot(...d.reactions[0]).toFixed(2)} kN`,
};

const STEPS = [
  { t: 'The exercise', d: 'page 2 of the sheet, second block: a symmetric truss with one 50 kN load at the apex. Draw the force diagram, tension red and compression blue' },
  { t: 'The truss', d: 'left: two rafters from the supports to the apex, two lower members, a horizontal tie between them and two short webs back up to the apex. Digitised at 1:100 from the drawing, which prints no dimensions',
    detail: (d) => [`span ${SPAN} m, rise ${d.depth.toFixed(3)} m, apex exactly at midspan`,
                    `${d.nm} members + ${d.nr} reactions = ${d.nm + d.nr} = 2 × ${d.nn} joints → statically determinate`,
                    `pin at A, roller at B, both at the same level`] },
  { t: 'Global equilibrium', d: 'one vertical load at midspan on a symmetric span: the two supports share it, and nothing is pushed sideways. This is the only part of the answer the shape cannot change',
    detail: (d) => [`A = B = ${(d.F / 2).toFixed(2)} kN up · A_x = 0`,
                    `ΣV: ${(d.F / 2).toFixed(2)} + ${(d.F / 2).toFixed(2)} = ${d.F.toFixed(2)} kN ✓`] },
  { t: 'The member forces', d: 'joint by joint. A and B each have two unknowns and a known reaction, so start there; the apex is the last one and closes as a check',
    detail: (d) => [d.forces.map((f, m) => `${MNAME[m]} ${f > 0 ? '+' : ''}${f.toFixed(2)}`).join(' · ') + ' kN',
                    `the two rafters are the only compressed members; everything below the apex pulls`,
                    `residual of the joint solve ${d.resid.toExponential(1)} kN`],
    take: 'the horizontal check at A: the rafter’s horizontal pull and A–Ln’s cancel exactly, which is why the pin carries no horizontal force' },
  { t: 'The force diagram', d: 'right: one closed polygon per joint, drawn to scale, every edge parallel to its member. The two joints beside the apex are the small ones — they only have to redirect, not carry',
    detail: (d) => [`5 joints → 5 polygons, 1 unit ≙ ${Math.max(14, d.fmax / 5).toFixed(0)} kN`,
                    `largest tension +${d.tmax.toFixed(2)} kN · largest compression ${d.cmax.toFixed(2)} kN`] },
  { t: 'Now flatten it', d: 'drag the apex rise. The reactions do not move — statics fixed them at 25 kN before any member existed. Everything inside runs away as the depth falls, because an internal force is a moment divided by a lever arm and the lever arm is what you are shrinking',
    detail: (d) => [`at the drawn ${DRAWN_RISE} m: rafter ${(-85.68).toFixed(2)} kN, tie ${(+63.82).toFixed(2)} kN`,
                    `now at ${d.depth.toFixed(3)} m: rafter ${d.rafter.toFixed(2)} kN, tie ${d.tie.toFixed(2)} kN`,
                    `its horizontal component ${d.rafterH.toFixed(2)} kN = ${(d.rafterH / 74.161).toFixed(3)}× the drawn value, and ${(DRAWN_RISE / d.depth).toFixed(3)}× is the inverse depth ratio — the same number`],
    take: 'depth is the cheapest structural material there is: it costs nothing and it divides every internal force' },
];

export const { meta, create } = makeJointTrussView({
  title: 'EX X · 3 — a shallow truss, and the price of being shallow',
  subtitle: 'Structural Design II · sheet EX X “Additional Exercises”, page 2 (German task 3; the English sheet calls it “Task 4”)',
  about: 'A symmetric seven-member truss carrying one 50 kN load at its apex. The reactions are 25 kN each and no drawing can change that — but every member force is the midspan moment divided by the truss’s depth, so the shape decides all of them. Drag the apex rise and watch the two reactions sit perfectly still while the rafters and the tie blow up. The sheet drew this truss deliberately shallow; the numbers say what that costs.',
  result: (d) => [
    `A = B = ${Math.hypot(...d.reactions[0]).toFixed(2)} kN up, A_x = 0 — unchanged by the shape`,
    `rafters A–T, T–B ${d.forces[0].toFixed(2)} C · A–Ln, Rn–B +${d.forces[2].toFixed(2)} T · Ln–Rn +${d.forces[4].toFixed(2)} T · T–Ln, T–Rn +${d.forces[5].toFixed(2)} T`,
    `rise ${d.depth.toFixed(3)} m (the sheet draws ${DRAWN_RISE} m) → F_c,max = ${d.cmax.toFixed(2)} kN, F_t,max = +${d.tmax.toFixed(2)} kN`,
    `halve the depth and every internal force doubles; the reactions do not notice`],
  frame: [[-28, -32], [34, 23]],
  defaults: { rise: DRAWN_RISE, F: 50 },
  caseOf: () => 0,
  cases: [CASE],
  at: { form: 1, load: 1, reac: 2, mem: 3, poly: 4 },
  steps: STEPS,
  formTitle: () => 'Form diagram 1:100',
  titlePos: { form: [-15, -16.4], force: [16, 21.4], sub: [16, 19.8],
              note: [-15, -18.0], zero: [-15, -19.6] },
  controls: (panel, s, refresh) => {
    const g = panel.section('Given');
    panel.slider(g, s, 'rise', 'apex rise (m)', 1.0, 5.0, 0.05, refresh,
      (v) => `${v.toFixed(2)} m${Math.abs(v - DRAWN_RISE) < 0.026 ? '  ← as drawn' : ''}`);
    panel.slider(g, s, 'F', 'F (kN)', 10, 120, 5, refresh,
      (v) => `${v.toFixed(0)} kN${Math.abs(v - 50) < 2.6 ? '  ← the sheet’s value' : ''}`);
  },
});
