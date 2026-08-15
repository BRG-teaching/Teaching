/**
 * EX 6 · Task 3 — Cantilevering Truss
 * Structural Design II, FS 23 (sheet EX 6 "Trusses", page 2).
 *
 * "The given cantilever is an internally statically determinate truss. Analyse
 * the truss for the given loading case by following a series of steps:
 *   a) Find the global equilibrium.
 *   b) Identify possible zero members.
 *   c) Analyse the internal forces node by node and complete the force diagram.
 *      Indicate tension forces with red, compression forces with blue and
 *      external forces with green. Determine the relevant tension and
 *      compression force within the truss and write down the values in the
 *      table."
 *
 * Three square panels hanging off a vertical wall. Digitised from the sheet at
 * 500 dpi: the TOP-left joint is a roller on the wall face (horizontal
 * reaction only) and the BOTTOM-left joint is a pin — note this is the mirror
 * image of EX 7's beam e), where the pin is on top. All three diagonals rise
 * to the right. F₁ = F₂ = F₃ = 15 kN at the three loaded top joints; T0 is
 * unloaded.
 *
 * The sheet prints an EMPTY answer table with the headings F_c,max and F_t,max
 * — that is the target, not a key. Solved by joint equilibrium:
 *   V(B0) = 45 kN up · H(B0) = 90 kN out · H(T0) = 90 kN back
 *   three zero-force members: B0-T0, B2-B3 and B3-T3
 *   top chord   +90 / +45 / +15 kN   (tension — a cantilever hangs from its top)
 *   bottom      −45 / −15 / 0 kN     (compression)
 *   diagonals   −63.64 / −42.43 / −21.21 kN
 * so the table reads F_c,max = 63.6 kN and F_t,max = 90.0 kN.
 */

import { makeTrussView } from './ex6_common.js';

const a = 2.5;
const nodes = [];
for (let i = 0; i < 4; i++) nodes.push([i * a, 0]);        // B0..B3 = 0..3
for (let i = 0; i < 4; i++) nodes.push([i * a, a]);        // T0..T3 = 4..7
const members = [
  [0, 1], [1, 2], [2, 3],            // bottom chord
  [4, 5], [5, 6], [6, 7],            // top chord
  [0, 4], [1, 5], [2, 6], [3, 7],    // verticals
  [0, 5], [1, 6], [2, 7],            // diagonals, all rising right
];
const NAME = ['B0', 'B1', 'B2', 'B3', 'T0', 'T1', 'T2', 'T3'];
const cells = [];
for (let k = 0; k < 8; k++) cells.push([8 + (k % 2) * 15, 8 - Math.floor(k / 2) * 9]);

const view = makeTrussView({
  title: 'EX 6.3 — a cantilevering truss, joint by joint',
  subtitle: 'Structural Design II · sheet EX 6 “Trusses”, task 3 a)–c)',
  about: 'Three panels reaching out from a wall. The two supports are stacked one above the other, so they cannot share the load the way two supports across a span do — instead they form a couple, and the whole cantilever hangs from the top chord. That is the reversal worth seeing: in the spanning truss the bottom chord was in tension, and here it is the top. The empty table on the sheet wants the two governing forces, and the view fills it in.',
  nodes,
  members,
  supports: { 0: 'pin', 4: 'roller-h' },
  loads: { 5: [0, -15], 6: [0, -15], 7: [0, -15] },
  MPU: 2.2,
  ORG: [-22, -9],                 // dropped clear of the caption card
  cells,
  SFD: 16,
  frame: [[-27, -31], [30, 22.5]],
  titlePos: [[-16, -12.5], [15, 15.4], [15, 14.0]],
  nodeName: (i) => NAME[i],
  nodeLabelOff: (i) => (i < 4 ? [0, -2.0] : [0, 2.0]),
  labelSide: (m) => (m < 3 ? -1 : m < 6 ? 1 : m < 10 ? 1 : -1),
  reacLabelOff: (i) => (i === 0 ? [-3.6, -1.0] : [-3.6, 1.4]),
  zeroLabelPos: [-16, -15.0],
  supportDir: () => [-1, 0],
  cellLabelOff: [0, 3.4],
  result: (d) => [
    `a) the two supports form a couple: V = ${Math.abs(d.reactions[0][1]).toFixed(1)} kN up at the pin, and ±${Math.abs(d.reactions[0][0]).toFixed(1)} kN horizontal`,
    `b) ${d.zero.filter(Boolean).length} zero-force members: B0-T0, B2-B3 and B3-T3`,
    `c) the table: F_c,max = ${Math.abs(d.cmax).toFixed(1)} kN · F_t,max = ${d.tmax.toFixed(1)} kN`],
  steps: [
    { t: 'The exercise', d: 'EX 6 task 3: the same method as task 2, on a truss that cantilevers off a wall instead of spanning between supports' },
    { t: 'The truss', d: 'left: three square panels, all diagonals rising to the right. The two supports sit one above the other on the wall — the lower one a pin, the upper one a roller that can only push or pull horizontally',
      detail: (d) => [`three loads of ${Math.abs(d.loads[5][1]).toFixed(0)} kN; the joint against the wall at the top carries none`,
                      `${d.nm} members + ${d.nr} reactions = 2 × ${d.nn} joints → statically determinate`] },
    { t: 'a) Global equilibrium', d: 'stacked supports cannot share a vertical load, so the pin takes all of it. What resists the overturning is the horizontal PAIR — the top pulling back and the bottom pushing out, one panel height apart',
      detail: (d) => [`ΣV: the pin takes ${Math.abs(d.reactions[0][1]).toFixed(1)} kN`,
                      `ΣM about the pin: ${Math.abs(d.reactions[4][0]).toFixed(1)} kN each way, over the ${2.5} m between them`,
                      'that is why the top chord is in tension all along — it IS the top of the couple'] },
    { t: 'b) The zero members', d: 'three this time. The top wall joint has only two members and no load, so its vertical is zero; and the far bottom joint has two members and no load, so both of those are zero as well',
      detail: () => ['B0-T0 is zero: at T0 the reaction is horizontal, so nothing is left to balance a vertical',
                     'B2-B3 and B3-T3 are zero: joint B3 has two members and no load'] },
    { t: 'c) Now joint by joint', d: 'same rule as before — start where only two member forces are unknown, and close one polygon at a time. Watch the top chord: it is pink the whole way, which is what a cantilever looks like',
      detail: () => ['pink is tension, navy compression, pale grey the three members carrying nothing'] },
  ],
  nodeStep: (o, k) => ({
    t: `Joint ${NAME[o.node]}`,
    d: `close the polygon at ${NAME[o.node]}. Every force meeting there, tip to tail, has to return to its start`,
    detail: (d) => {
      const at = members.map((mm, m) => [mm, m]).filter(([mm]) => mm.includes(o.node));
      const line = at.map(([mm, m]) => {
        const other = mm[0] === o.node ? mm[1] : mm[0];
        const f = d.forces[m];
        return `${NAME[o.node]}-${NAME[other]} ${Math.abs(f) < 1e-7 ? '0' : f.toFixed(2)}`;
      }).join(' · ');
      const ex = [];
      if (d.reactions[o.node]) ex.push(`reaction ${Math.hypot(...d.reactions[o.node]).toFixed(1)} kN`);
      if (d.loads[o.node]) ex.push(`load ${Math.abs(d.loads[o.node][1]).toFixed(0)} kN down`);
      return ex.length ? [line, ex.join(' · ')] : [line];
    },
    ...(k === 7 ? { take: 'the top chord carries 90 kN in tension against 63.6 kN of compression in the first diagonal — those two numbers are the answer table' } : {}),
  }),
});

export const meta = view.meta;
export const create = view.create;
