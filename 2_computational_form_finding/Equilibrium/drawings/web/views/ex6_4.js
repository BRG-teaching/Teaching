/**
 * EX 6 · Task 4 — Combined Truss
 * Structural Design II, FS 23 (sheet EX 6 "Trusses", page 2).
 *
 * "The given truss is a combination of a span and cantilever. It is an
 * internally statically determinate system. Analyse the truss for the given
 * loading case by following a series of steps:
 *   a) Find the global equilibrium with the help of the force diagram.
 *   b) Identify possible zero members.
 *   c) Analyse the internal forces node by node and complete the force diagram.
 *      Indicate tension forces with red, compression forces with blue and
 *      external forces with green."
 *
 * Four square panels, but the roller sits under the FOURTH bottom joint rather
 * than the fifth, so the last panel cantilevers. Digitised loads: F₁ = 60 kN at
 * T1, F₂ = 30 kN at T2 and F₃ = 30 kN at T4 — the last one right at the
 * cantilever tip, not above the roller. Two diagonals spring from B3.
 *
 * The sheet prints no answers. Solved by joint equilibrium: V(B0) = 40 kN,
 * V(B3) = 80 kN, six zero-force members, and the thing worth seeing —
 * the TOP CHORD CHANGES SIGN, −40 kN of compression inside the span and
 * +30 kN of tension out over the cantilever, with B1-T2 the only tension
 * diagonal anywhere on the sheet. F_t,max = +40.00 kN, F_c,max = −70.71 kN.
 *
 * THE FORCE DIAGRAM is the sheet's: one Cremona, built in `../lib/cremona.js`.
 * The load line runs 60 / 30 / 30 down and 80 / 40 back up, and the sign change
 * in the top chord shows up in it as plainly as anywhere on the sheet — the
 * compression members lie to the LEFT of the load line and the two +30 kN
 * tension pieces of top chord to its RIGHT, which is the same picture the sheet
 * prints. What the sheet also has and this view still does not is the funicular
 * pole construction it uses to FIND the reactions graphically, with its division
 * point i on the load line; here the reactions are computed and then laid onto
 * the load line, which is the same answer by a different route.
 */

import { makeTrussView } from './ex6_common.js';

const a = 2.5;
const nodes = [];
for (let i = 0; i < 5; i++) nodes.push([i * a, 0]);        // B0..B4 = 0..4
for (let i = 0; i < 5; i++) nodes.push([i * a, a]);        // T0..T4 = 5..9
const members = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [5, 6], [6, 7], [7, 8], [8, 9],
  [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],
  [0, 6], [1, 7], [3, 7], [3, 9],
];
const NAME = ['B0', 'B1', 'B2', 'B3', 'B4', 'T0', 'T1', 'T2', 'T3', 'T4'];

const view = makeTrussView({
  title: 'EX 6.4 — a truss that spans and cantilevers at once',
  subtitle: 'Structural Design II · sheet EX 6 “Trusses”, task 4 a)–c)',
  about: 'The roller has moved one panel inward, so the last bay hangs off the end — and that one change makes the truss behave like two different structures joined together. Inside the span the top chord is in compression and the bottom in tension, exactly as in task 2; out over the cantilever they swap. Watch the top chord change colour at T2 — one panel short of the roller, not over it, because the sign follows the bending moment and that crosses zero inside the span. In the Cremona on the right the same reversal is a change of SIDE: the compression members sit left of the load line and the two tension pieces of top chord to its right. Note too the single tension diagonal, the only one on the whole sheet.',
  nodes,
  members,
  supports: { 0: 'pin', 3: 'roller-v' },
  loads: { 6: [0, -60], 7: [0, -30], 9: [0, -30] },
  MPU: 2.4,
  ORG: [-27.5, -12],               // dropped clear of the caption card
  fdCenter: [16, -9],
  SFD: 4,
  frame: [[-27, -27], [30, 16]],
  titlePos: [[-22, -18.6], [16, 11.6], [16, 10.2]],
  nodeName: (i) => NAME[i],
  nodeLabelOff: (i) => (i < 5 ? [0, -2.0] : [0, 2.0]),
  labelSide: (m) => (m < 4 ? -1 : m < 8 ? 1 : m < 13 ? 1 : -1),
  reacLabelOff: () => [-3.6, -0.6],
  zeroLabelPos: [-7, -18.6],
  supportDir: () => [0, -1],
  bowOff: 4.6,
  result: (d) => [
    `a) A = ${Math.abs(d.reactions[0][1]).toFixed(1)} kN, B = ${Math.abs(d.reactions[3][1]).toFixed(1)} kN, both vertical and both up`,
    `b) ${d.zero.filter(Boolean).length} zero-force members: T0-T1, B0-T0, B2-T2, B3-T3, B3-B4 and B4-T4`,
    `c) F_t,max = +${d.tmax.toFixed(2)} kN · F_c,max = ${d.cmax.toFixed(2)} kN — and the top chord changes sign at T2, one panel INSIDE the roller`],
  steps: [
    { t: 'The exercise', d: 'EX 6 task 4: the same truss as task 2, but with the roller one panel further in, so the last bay cantilevers' },
    { t: 'The truss', d: 'left: four panels, a pin at the left end and a roller under the fourth bottom joint. Two of the three loads sit inside the span, and the third is right out at the tip of the cantilever',
      detail: (d) => [`F₁ = ${Math.abs(d.loads[6][1]).toFixed(0)} kN at T1 · F₂ = ${Math.abs(d.loads[7][1]).toFixed(0)} kN at T2 · F₃ = ${Math.abs(d.loads[9][1]).toFixed(0)} kN at T4, the tip`,
                      `${d.nm} members + ${d.nr} reactions = 2 × ${d.nn} joints → statically determinate`] },
    { t: 'a) Global equilibrium — and the load line', d: 'moments about the pin: the tip load has the longest lever arm, so the roller carries twice what the pin does. Laid end to end round the outside, the five external forces make the load line, and where the two reactions meet on it is the sheet\'s division point i',
      detail: (d) => [`ΣM about B0: ${Math.abs(d.loads[6][1]).toFixed(0)}·1 + ${Math.abs(d.loads[7][1]).toFixed(0)}·2 + ${Math.abs(d.loads[9][1]).toFixed(0)}·4 panels, resisted over 3 panels`,
                      `A = ${Math.abs(d.reactions[0][1]).toFixed(1)} kN · B = ${Math.abs(d.reactions[3][1]).toFixed(1)} kN · ΣV = ${(Math.abs(d.reactions[0][1]) + Math.abs(d.reactions[3][1])).toFixed(0)} kN ✓`,
                      'the sheet finds that split graphically, with a funicular pole; this view computes it and then draws it'] },
    { t: 'b) The zero members', d: 'six of them here, and the cantilever tip supplies two: joint B4 has only two members and no load, because the diagonal in that bay springs from B3 rather than B4',
      detail: () => ['T0-T1 and B0-T0 at the unloaded left top joint',
                     'B2-T2 and B3-T3, each the odd member out at a joint with two collinear ones',
                     'B3-B4 and B4-T4, the two members at the unloaded bottom tip',
                     'all six are ZERO-LENGTH segments in the Cremona'] },
    { t: 'c) Now joint by joint — one Cremona', d: 'and this is where the two halves show themselves. Watch the top chord: navy compression over the first two panels, pink tension from T2 on — one panel BEFORE the roller, where the bending moment passes through zero. In the Cremona that reversal is the top chord crossing to the other side of the load line',
      detail: (d) => [`top chord: ${[4, 5, 6, 7].map((m) => (Math.abs(d.forces[m]) < 1e-7 ? '0' : d.forces[m].toFixed(0))).join(' · ')} kN, left to right`,
                      'every space is one point, a…e outside and 1…8 inside'],
      take: 'a cantilever hangs from its top; a span leans on it — this truss does both, and the changeover is where the moment vanishes, not where the support is' },
  ],
  nodeStep: (o, k) => ({
    t: `Joint ${NAME[o.node]}`,
    d: `close ${NAME[o.node]} inside the Cremona: every force meeting there, tip to tail, back to the start — the unknowns are lines parallel to those members through points already fixed`,
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
    ...(k === 9 ? { take: 'B1-T2 at +28.28 kN is the only diagonal in tension on the whole sheet' } : {}),
  }),
});

export const meta = view.meta;
export const create = view.create;
