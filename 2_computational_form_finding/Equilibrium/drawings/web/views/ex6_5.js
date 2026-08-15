/**
 * EX 6 · Creative — Designing a Greenhouse Roof
 * Structural Design II, FS 23 (sheet EX 6 "Trusses", page 3).
 *
 * "Design a lightweight structure for a greenhouse. The roof cover made out of
 * glass is to be placed on a truss structure to enable a maximum solar gain in
 * the interior. The two given columns act as supports for the roof.
 * First, sketch a possible form of the roof under the given point loads into
 * the form diagram. Check whether your truss is statically determinate.
 * Then, find the global equilibrium and complete the corresponding force
 * diagram with all the truss elements. Indicate tension forces with red,
 * compression forces with blue and external forces with green."
 *
 * Digitised at the stated 1:100: six loads F₁…F₆ = 10, 20, 20, 20, 20, 10 kN
 * on a 3.000 m grid, so 100 kN in total. The left bearing is a PIN on top of an
 * 8 m wall and the right a ROLLER on top of a 4 m column, 12.000 m apart
 * horizontally and 4.000 m apart vertically. F₁ sits over the left bearing, F₅
 * over the right one, and F₆ three metres PAST it.
 *
 * Global equilibrium is fixed whatever roof you invent, because every load is
 * vertical and the roller reaction is vertical: the resultant of 100 kN acts at
 * x = 7.500 m, so V_B = 62.50 kN and V_A = 37.50 kN, with no horizontal at all.
 *
 * The roof itself is a design, and the sheet says so. This view offers one
 * concrete answer — a parallel-chord truss following the fall of the roof, with
 * its depth draggable — and checks its determinacy the way the task asks:
 * 21 members + 3 reactions = 24 = 2 × 12 joints.
 */

import { makeTrussView } from './ex6_common.js';

const XS = [0, 3, 6, 9, 12, 15];        // m, the load grid
const SLOPE = -4 / 12;                  // the fall from the left bearing to the right
const H = 1.5;                          // m, the truss depth (draggable below)
const nodes = [];
for (const x of XS) nodes.push([x, SLOPE * x]);              // B0..B5 = 0..5
for (const x of XS) nodes.push([x, SLOPE * x + H]);          // T0..T5 = 6..11
const members = [];
for (let i = 0; i < 5; i++) members.push([i, i + 1]);        // bottom chord
for (let i = 0; i < 5; i++) members.push([6 + i, 7 + i]);    // top chord
for (let i = 0; i < 6; i++) members.push([i, 6 + i]);        // verticals
for (let i = 0; i < 5; i++) members.push(i % 2 === 0 ? [i, 7 + i] : [i + 1, 6 + i]);
const NAME = ['B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'T0', 'T1', 'T2', 'T3', 'T4', 'T5'];
const LOADS = { 6: [0, -10], 7: [0, -20], 8: [0, -20], 9: [0, -20], 10: [0, -20], 11: [0, -10] };

const cells = [];
for (let k = 0; k < 12; k++) cells.push([9 + (k % 2) * 15, 9 - Math.floor(k / 2) * 7.4]);

const view = makeTrussView({
  title: 'EX 6 Creative — a greenhouse roof',
  subtitle: 'Structural Design II · sheet EX 6 “Trusses”, Creative task',
  about: 'A glass roof on two columns of different heights, six loads along it, and the truss between them is yours to invent. Whatever you draw, the two reactions are already decided — the loads are all vertical and one bearing is a roller, so the only question global equilibrium can answer is how the 100 kN splits, and it splits 37.5 to 62.5. This view offers one determinate answer, a parallel-chord truss following the fall of the roof, and then solves it joint by joint. Drag its depth and watch every member respond.',
  nodes,
  members,
  supports: { 0: 'pin', 4: 'roller-v' },
  loads: LOADS,
  MPU: 1.75,
  ORG: [-23, -3],              // dropped clear of the caption card
  cells,
  SFD: 16,
  frame: [[-27, -33], [31, 26.5]],
  titlePos: [[-14, -14.0], [16, 15.4], [16, 14.0]],
  nodeName: (i) => NAME[i],
  nodeLabelOff: (i) => (i < 6 ? [0, -2.0] : [0, 2.0]),
  labelSide: (m) => (m < 5 ? -1 : m < 10 ? 1 : m < 16 ? 1 : -1),
  reacLabelOff: () => [-3.6, -0.6],
  zeroLabelPos: [-14, -16.5],
  supportDir: () => [0, -1],
  cellLabelOff: [0, 3.2],
  result: (d) => [
    `global equilibrium, whatever roof you draw: A = ${Math.abs(d.reactions[0][1]).toFixed(2)} kN, B = ${Math.abs(d.reactions[4][1]).toFixed(2)} kN, both vertical`,
    `the resultant of the six loads is ${(100).toFixed(0)} kN acting at x = 7.500 m — that is what fixes the split`,
    `this design: ${d.nm} members + ${d.nr} reactions = 2 × ${d.nn} joints → determinate · F_t,max = +${d.tmax.toFixed(1)}, F_c,max = ${d.cmax.toFixed(1)} kN`],
  steps: [
    { t: 'The exercise', d: 'the Creative task: design a truss roof for a greenhouse on two columns of different heights, check it is determinate, then solve it' },
    { t: 'What is given', d: 'left: six point loads on a three-metre grid, a pin on top of the tall wall and a roller on top of the short column. The roof between them is the design',
      detail: () => ['F₁…F₆ = 10, 20, 20, 20, 20, 10 kN — 100 kN in total, on a 3.000 m grid',
                     'bearings 12.000 m apart horizontally and 4.000 m apart vertically',
                     'F₁ sits over the left bearing, F₅ over the right, and F₆ three metres past it'] },
    { t: 'The reactions are already decided', d: 'before designing anything: every load is vertical and the roller can only push vertically, so there is no horizontal force anywhere and the split follows from one moment equation',
      detail: (d) => [`resultant 100 kN at x = 7.500 m → B = 100 × 7.5/12 = ${Math.abs(d.reactions[4][1]).toFixed(2)} kN`,
                      `A = ${Math.abs(d.reactions[0][1]).toFixed(2)} kN · both up, both vertical`],
      take: 'you can check your reactions before you have drawn a single member' },
    { t: 'One possible roof', d: 'a parallel-chord truss following the fall of the glass, with a vertical at every load and diagonals zig-zagging between them. Drag its depth in the panel — deeper is always cheaper in force, and always worse for solar gain',
      detail: (d) => [`${d.nm} members + ${d.nr} reactions = ${d.nm + d.nr}, and 2 × ${d.nn} joints = ${2 * d.nn} → the difference is ${d.det}, so it is exactly determinate`,
                      `${d.zero.filter(Boolean).length} of the members turn out to carry nothing under this load case`] },
    { t: 'Now joint by joint', d: 'the same walk as tasks 2 to 4: start where only two forces are unknown and close one polygon at a time. Note the far right — the roof cantilevers three metres past the roller, and the chords swap sign there',
      detail: () => ['pink is tension, navy compression, pale grey the members carrying nothing'] },
  ],
  nodeStep: (o, k) => ({
    t: `Joint ${NAME[o.node]}`,
    d: `close the polygon at ${NAME[o.node]}`,
    detail: (d) => {
      const at = members.map((mm, m) => [mm, m]).filter(([mm]) => mm.includes(o.node));
      const line = at.map(([mm, m]) => {
        const other = mm[0] === o.node ? mm[1] : mm[0];
        const f = d.forces[m];
        return `${NAME[o.node]}-${NAME[other]} ${Math.abs(f) < 1e-7 ? '0' : f.toFixed(1)}`;
      }).join(' · ');
      const ex = [];
      if (d.reactions[o.node]) ex.push(`reaction ${Math.hypot(...d.reactions[o.node]).toFixed(1)} kN`);
      if (d.loads[o.node]) ex.push(`load ${Math.abs(d.loads[o.node][1]).toFixed(0)} kN`);
      return ex.length ? [line, ex.join(' · ')] : [line];
    },
    ...(k === 11 ? { take: 'the roof is a design, but the reactions never were — that is what makes global equilibrium worth doing first' } : {}),
  }),
});

export const meta = view.meta;
export const create = view.create;
