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
 *
 * THE FORCE DIAGRAM is the sheet's: one Cremona, built in `../lib/cremona.js`.
 * Point for point it is the figure printed on page 1 — a vertical load line
 * with the three loads running down it and the two 45 kN reactions coming back
 * up, the two end diagonals closing on its ends, and the bottom-chord members
 * (the sheet's 2, 6 and 10) all radiating from the one point where the two
 * reactions meet. The sheet draws its two coincident pairs of horizontals
 * slightly apart so both are visible; here they are labelled 2=3 and so on,
 * which says the same thing: the member between those two spaces is zero.
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

const view = makeTrussView({
  title: 'EX 6.2 — a spanning truss, joint by joint',
  subtitle: 'Structural Design II · sheet EX 6 “Trusses”, task 2 a)–c)',
  about: 'Four square panels, three 30 kN loads on the top chord, a pin at one end and a roller at the other. The whole method is on this one drawing: close the structure globally, spot the members that cannot be carrying anything, then walk from joint to joint. The force diagram on the right is one Cremona — a single reciprocal figure, not ten separate polygons. Every space of the truss becomes a point; every member is the segment between the two points either side of it, drawn parallel to the member and to its colour; and because neighbouring joints share those segments the three bottom-chord members all radiate from one point on the load line.',
  nodes,
  members,
  supports: { 0: 'pin', 4: 'roller-v' },
  loads: { 6: [0, -30], 7: [0, -30], 8: [0, -30] },
  MPU: 2.4,
  ORG: [-27.5, -12],               // dropped clear of the caption card
  fdCenter: [16, -8],
  SFD: 3.5,
  frame: [[-27, -27], [30, 16]],
  titlePos: [[-22, -18.6], [16, 11.6], [16, 10.2]],
  nodeName: (i) => NAME[i],
  nodeLabelOff: (i) => (i < 5 ? [0, -2.0] : [0, 2.0]),
  // chords label outward, verticals and diagonals inward
  labelSide: (m) => (m < 4 ? -1 : m < 8 ? 1 : m < 13 ? 1 : -1),
  reacLabelOff: () => [-3.4, -0.6],
  zeroLabelPos: [-7, -18.6],
  supportDir: () => [0, -1],
  bowOff: 4.6,
  result: (d) => [
    `a) A = ${Math.hypot(...d.reactions[0]).toFixed(1)} kN, B = ${Math.hypot(...d.reactions[4]).toFixed(1)} kN, both vertical`,
    `b) ${d.zero.filter(Boolean).length} zero-force members: T0-T1, T3-T4, B0-T0, B4-T4 and B2-T2`,
    `c) F_t,max = +${d.tmax.toFixed(2)} kN (bottom chord) · F_c,max = ${d.cmax.toFixed(2)} kN (end diagonals)`],
  steps: [
    { t: 'The exercise', d: 'EX 6 task 2: a four-panel truss carrying three equal loads. Find the reactions, find the members doing nothing, then solve it joint by joint' },
    { t: 'The truss', d: 'left: square panels with 45° diagonals, a pin under the left end and a roller under the right. Ten joints, seventeen members and three reactions — and 17 + 3 = 2 × 10, so it is exactly determinate',
      detail: (d) => [`three loads of ${(30 * d.loads[6][1] / -30).toFixed(0)} kN at the interior top joints`,
                      `members + reactions − 2 × joints = ${d.nm} + ${d.nr} − ${2 * d.nn} = ${d.det} → statically determinate`] },
    { t: 'a) Global equilibrium — and the load line', d: 'before any member: the whole truss is one body, and the loads are symmetric, so the supports share them equally. Now walk once round the outside laying the five external forces end to end — that chain is the LOAD LINE on the right, and it closes',
      detail: (d) => [`A = ${Math.hypot(...d.reactions[0]).toFixed(1)} kN up · B = ${Math.hypot(...d.reactions[4]).toFixed(1)} kN up · H = 0`,
                      `ΣV: ${Math.hypot(...d.reactions[0]).toFixed(1)} + ${Math.hypot(...d.reactions[4]).toFixed(1)} = ${(-d.loads[6][1] * 3).toFixed(0)} kN ✓`,
                      'three loads down, two reactions back up: five forces, five outer spaces a…e'] },
    { t: 'b) The zero members', d: 'five of them, and you find every one without arithmetic: two members and no load means both are zero; two collinear members plus one more means the odd one out is zero',
      detail: (d) => ['T0 and T4 have two members and no load → all four are zero',
                      'B2: two collinear members plus a vertical → the vertical is zero',
                      'in the Cremona each is a ZERO-LENGTH segment'],
      take: 'a zero-force member still holds the geometry, and comes alive under another load case' },
    { t: 'c) Now joint by joint — one Cremona', d: 'only start where at most two member forces are unknown. Those two are lines through points already on the paper, drawn parallel to the members, and where they cross is the new point. Every joint reuses the segments its neighbours put down — which is why this is ONE figure and not ten',
      detail: () => ['each space of the truss is one point, a…e outside and 1…8 inside',
                     'a member is the segment between the two points either side of it',
                     'the grey outline is the joint being closed right now'] },
  ],
  nodeStep: (o, k) => ({
    t: `Joint ${NAME[o.node]}`,
    d: `close ${NAME[o.node]} inside the Cremona: every force meeting there, laid tip to tail, must come back to where it started. Its known forces are segments already drawn; the unknown ones are lines parallel to those members through points already fixed`,
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
