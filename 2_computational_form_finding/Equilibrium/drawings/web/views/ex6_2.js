/**
 * EX 6 · Task 2 — Spanning Truss
 * Structural Design II, FS 23 (sheet EX 6 "Trusses", page 1).
 *
 * "The given truss is an internally statically determinate system spanning
 * between two supports. Analyse the truss for the given loading case by
 * following a series of steps:
 *   a) Find the global equilibrium.
 *   b) Identify possible zero members.
 *   c) Analyse the internal forces node by node and complete the force
 *      diagram. Indicate tension forces with red, compression forces with blue
 *      and external forces with green."
 *
 * Digitised from the sheet: a four-panel parallel-chord truss with SQUARE
 * panels and 45° diagonals, a PIN at the bottom left and a ROLLER at the
 * bottom right, and F₁ = F₂ = F₃ = 30 kN hanging at the three interior TOP
 * joints. The diagonals form a V — rising right in the first two panels and
 * rising left in the last two. The sheet prints no member numbers, no joint
 * labels and no dimensions, so the naming here is the view's own: bottom
 * joints B0…B4 left to right, top joints T0…T4.
 *
 * The sheet prints no answers either. Solved here by joint equilibrium
 * (residual < 1e-14): A = B = 45 kN, five zero-force members, and
 *   bottom chord  +45 / +60 / +60 / +45 kN      (tension)
 *   top chord       0 / −45 / −45 / 0 kN        (compression)
 *   verticals       0 / +15 / 0 / +15 / 0 kN
 *   diagonals     −63.64 / −21.21 / −21.21 / −63.64 kN   (= −45√2 and −15√2)
 * so F_t,max = +60.00 kN in the middle of the bottom chord and F_c,max =
 * −63.64 kN in the two end diagonals.
 */

import { makeTrussView } from './ex6_common.js';

const a = 2.5;                          // m — square panels (see ex6_common)
const nodes = [];
for (let i = 0; i < 5; i++) nodes.push([i * a, 0]);          // B0..B4  = 0..4
for (let i = 0; i < 5; i++) nodes.push([i * a, a]);          // T0..T4  = 5..9
const members = [
  [0, 1], [1, 2], [2, 3], [3, 4],           // bottom chord
  [5, 6], [6, 7], [7, 8], [8, 9],           // top chord
  [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],   // verticals
  [0, 6], [1, 7], [3, 7], [4, 8],           // the V of diagonals
];
const NAME = ['B0', 'B1', 'B2', 'B3', 'B4', 'T0', 'T1', 'T2', 'T3', 'T4'];

// three columns of joint polygons down the right-hand side
// two columns of five, down the right-hand side, clear of both UI cards
const cells = [];
for (let k = 0; k < 10; k++) cells.push([8 + (k % 2) * 14, 8 - Math.floor(k / 2) * 8]);

const view = makeTrussView({
  title: 'EX 6.2 — a spanning truss, joint by joint',
  subtitle: 'Structural Design II · sheet EX 6 “Trusses”, task 2 a)–c)',
  about: 'Four square panels, three 30 kN loads on the top chord, a pin at one end and a roller at the other. The whole method is on this one drawing: close the structure globally, spot the members that cannot be carrying anything, then walk from joint to joint closing one small polygon at a time. Every edge of every polygon is parallel to the member it stands for, and carries its colour — pink for tension, navy for compression, pale grey for the five members doing nothing at all.',
  nodes,
  members,
  supports: { 0: 'pin', 4: 'roller-v' },
  loads: { 6: [0, -30], 7: [0, -30], 8: [0, -30] },
  MPU: 2.0,
  ORG: [-24, -8],
  cells,
  SFD: 14,
  frame: [[-27, -31], [30, 18]],
  titlePos: [[-16, -14.5], [15, 15.4], [15, 14.0]],
  nodeName: (i) => NAME[i],
  nodeLabelOff: (i) => (i < 5 ? [0, -2.0] : [0, 2.0]),
  // chords label outward, verticals and diagonals inward
  labelSide: (m) => (m < 4 ? -1 : m < 8 ? 1 : m < 13 ? 1 : -1),
  reacLabelOff: () => [-3.4, -0.6],
  zeroLabelPos: [-16, -17.0],
  supportDir: () => [0, -1],
  cellLabelOff: [0, 3.4],
  result: (d) => [
    `a) A = ${Math.hypot(...d.reactions[0]).toFixed(1)} kN, B = ${Math.hypot(...d.reactions[4]).toFixed(1)} kN, both vertical`,
    `b) ${d.zero.filter(Boolean).length} zero-force members: T0-T1, T3-T4, B0-T0, B4-T4 and B2-T2`,
    `c) F_t,max = +${d.tmax.toFixed(2)} kN (bottom chord) · F_c,max = ${d.cmax.toFixed(2)} kN (end diagonals)`],
  steps: [
    { t: 'The exercise', d: 'EX 6 task 2: a four-panel truss carrying three equal loads. Find the reactions, find the members doing nothing, then solve it joint by joint' },
    { t: 'The truss', d: 'left: square panels with 45° diagonals, a pin under the left end and a roller under the right. Ten joints, seventeen members and three reactions — and 17 + 3 = 2 × 10, so it is exactly determinate',
      detail: (d) => [`three loads of ${(30 * d.loads[6][1] / -30).toFixed(0)} kN at the interior top joints`,
                      `members + reactions − 2 × joints = ${d.nm} + ${d.nr} − ${2 * d.nn} = ${d.det} → statically determinate`] },
    { t: 'a) Global equilibrium', d: 'right at the start, before any member: the whole truss is one body. The loads are symmetric, so the two supports share them equally and neither is pushed sideways',
      detail: (d) => [`A = ${Math.hypot(...d.reactions[0]).toFixed(1)} kN up · B = ${Math.hypot(...d.reactions[4]).toFixed(1)} kN up · H = 0`,
                      `ΣV: ${Math.hypot(...d.reactions[0]).toFixed(1)} + ${Math.hypot(...d.reactions[4]).toFixed(1)} = ${(-d.loads[6][1] * 3).toFixed(0)} kN ✓`] },
    { t: 'b) The zero members', d: 'five of them, and you can find every one without any arithmetic. A joint with only two members and no load cannot carry anything in either; a joint with two members in a straight line plus one more cannot carry anything in the odd one out',
      detail: (d) => ['T0 and T4 each have just two members and no load → all four are zero',
                      'B2 has two collinear members plus the vertical, and no load → the vertical is zero',
                      'they are drawn pale grey; untick the panel to see them in colour'],
      take: 'a zero-force member is not useless — it holds the geometry, and it comes alive under a different load case' },
    { t: 'c) Now joint by joint', d: 'the rule is simple: only start at a joint where at most two member forces are still unknown. Each joint gets its own closed polygon on the right, drawn to scale, with every edge parallel to its member',
      detail: () => ['the polygons are laid out in the order they can actually be solved',
                     'green edges are the load and the reaction; pink is tension, navy compression'] },
  ],
  nodeStep: (o, k) => ({
    t: `Joint ${NAME[o.node]}`,
    d: `close the polygon at ${NAME[o.node]}: every force meeting there, laid tip to tail, must come back to where it started. The two unknown members are the two edges that close it`,
    detail: (d) => {
      const lines = [];
      const at = members.map((mm, m) => [mm, m]).filter(([mm]) => mm.includes(o.node));
      lines.push(at.map(([mm, m]) => {
        const other = mm[0] === o.node ? mm[1] : mm[0];
        const f = d.forces[m];
        return `${NAME[o.node]}-${NAME[other]} ${Math.abs(f) < 1e-7 ? '0' : f.toFixed(2)}`;
      }).join(' · '));
      if (d.reactions[o.node]) lines.push(`reaction here: ${Math.hypot(...d.reactions[o.node]).toFixed(1)} kN`);
      if (d.loads[o.node]) lines.push(`load here: ${Math.abs(d.loads[o.node][1]).toFixed(0)} kN down`);
      return lines;
    },
    ...(k === 9 ? { take: 'the last joint has nothing left to find — it is the check that everything before it was right' } : {}),
  }),
});

export const meta = view.meta;
export const create = view.create;
