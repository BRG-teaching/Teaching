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
const cells = [];
for (let k = 0; k < 10; k++) cells.push([8 + (k % 2) * 15, 8 - Math.floor(k / 2) * 8]);

const view = makeTrussView({
  title: 'EX 6.4 — a truss that spans and cantilevers at once',
  subtitle: 'Structural Design II · sheet EX 6 “Trusses”, task 4 a)–c)',
  about: 'The roller has moved one panel inward, so the last bay hangs off the end — and that one change makes the truss behave like two different structures joined together. Inside the span the top chord is in compression and the bottom in tension, exactly as in task 2; out over the cantilever they swap. Watch the top chord change colour at T2 — one panel short of the roller, not over it, because the sign follows the bending moment and that crosses zero inside the span. Note too the single tension diagonal, the only one on the whole sheet.',
  nodes,
  members,
  supports: { 0: 'pin', 3: 'roller-v' },
  loads: { 6: [0, -60], 7: [0, -30], 9: [0, -30] },
  MPU: 2.0,
  ORG: [-24, -6],
  cells,
  SFD: 16,
  frame: [[-27, -31], [30, 18]],
  titlePos: [[-16, -13.5], [15, 15.4], [15, 14.0]],
  nodeName: (i) => NAME[i],
  nodeLabelOff: (i) => (i < 5 ? [0, -2.0] : [0, 2.0]),
  labelSide: (m) => (m < 4 ? -1 : m < 8 ? 1 : m < 13 ? 1 : -1),
  reacLabelOff: () => [-3.6, -0.6],
  zeroLabelPos: [-16, -16.0],
  supportDir: () => [0, -1],
  cellLabelOff: [0, 3.4],
  result: (d) => [
    `a) A = ${Math.abs(d.reactions[0][1]).toFixed(1)} kN, B = ${Math.abs(d.reactions[3][1]).toFixed(1)} kN, both vertical and both up`,
    `b) ${d.zero.filter(Boolean).length} zero-force members: T0-T1, B0-T0, B2-T2, B3-T3, B3-B4 and B4-T4`,
    `c) F_t,max = +${d.tmax.toFixed(2)} kN · F_c,max = ${d.cmax.toFixed(2)} kN — and the top chord changes sign at T2, one panel INSIDE the roller`],
  steps: [
    { t: 'The exercise', d: 'EX 6 task 4: the same truss as task 2, but with the roller one panel further in, so the last bay cantilevers' },
    { t: 'The truss', d: 'left: four panels, a pin at the left end and a roller under the fourth bottom joint. Two of the three loads sit inside the span, and the third is right out at the tip of the cantilever',
      detail: (d) => [`F₁ = ${Math.abs(d.loads[6][1]).toFixed(0)} kN at T1 · F₂ = ${Math.abs(d.loads[7][1]).toFixed(0)} kN at T2 · F₃ = ${Math.abs(d.loads[9][1]).toFixed(0)} kN at T4, the tip`,
                      `${d.nm} members + ${d.nr} reactions = 2 × ${d.nn} joints → statically determinate`] },
    { t: 'a) Global equilibrium', d: 'moments about the pin: the tip load has the longest lever arm of all, so the roller ends up carrying twice what the pin does. Both still push up — the cantilever is not long enough to lift the far end',
      detail: (d) => [`ΣM about B0: ${Math.abs(d.loads[6][1]).toFixed(0)}·1 + ${Math.abs(d.loads[7][1]).toFixed(0)}·2 + ${Math.abs(d.loads[9][1]).toFixed(0)}·4 panels, resisted over 3 panels`,
                      `A = ${Math.abs(d.reactions[0][1]).toFixed(1)} kN · B = ${Math.abs(d.reactions[3][1]).toFixed(1)} kN · ΣV = ${(Math.abs(d.reactions[0][1]) + Math.abs(d.reactions[3][1])).toFixed(0)} kN ✓`] },
    { t: 'b) The zero members', d: 'six of them here, and the cantilever tip supplies two: joint B4 has only two members and no load, because the diagonal in that bay springs from B3 rather than B4',
      detail: () => ['T0-T1 and B0-T0 at the unloaded left top joint',
                     'B2-T2 and B3-T3, each the odd member out at a joint with two collinear ones',
                     'B3-B4 and B4-T4, the two members at the unloaded bottom tip'] },
    { t: 'c) Now joint by joint', d: 'and this is where the two halves show themselves. Solve along and watch the top chord: navy compression over the first two panels, then pink tension from T2 onward — the change happens one panel BEFORE the roller, where the bending moment passes through zero',
      detail: (d) => [`top chord: ${[4, 5, 6, 7].map((m) => (Math.abs(d.forces[m]) < 1e-7 ? '0' : d.forces[m].toFixed(0))).join(' · ')} kN, left to right`],
      take: 'a cantilever hangs from its top; a span leans on it — this truss does both, and the changeover is where the moment vanishes, not where the support is' },
  ],
  nodeStep: (o, k) => ({
    t: `Joint ${NAME[o.node]}`,
    d: `close the polygon at ${NAME[o.node]}: every force meeting there, tip to tail, back to the start`,
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
