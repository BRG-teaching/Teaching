/**
 * EX X · German task 4 — a truss under a NON-uniform load, and a diagonal
 * that changes its mind
 * Structural Design II, FS 23, "Additional Exercises", sheet page 3 (top).
 *
 * NUMBERING. The English sheet calls this block "Task 1" — the third block in
 * the booklet with that label. The German sheet calls it Aufgabe 4, and that
 * is the numbering used here.
 *
 * TEXT (verbatim). "Determine both reaction forces A and B for the following
 * truss. Draw the corresponding force diagram for the given case. Indicate
 * tension forces with red and compression forces with blue."
 *
 * GIVENS. F1 = 60 kN and F2 = 20 kN, both vertical, down, on the top chord.
 * Form diagram 1:100, force diagram 1 cm ≙ 10 kN.
 *
 * GEOMETRY, digitised (the sheet prints no dimensions). Origin = the
 * bottom-left node. Four SQUARE panels of 2.8688 m, span 11.475 m, depth
 * 2.8688 m. Same topology as the Howe truss on page 1 (diagonals L0–U1,
 * L1–U2, L3–U2, L4–U3, i.e. / / \ \) but a bigger panel. F1 sits at L/4 and
 * F2 at L/2. 17 members + 3 reactions = 20 = 2 × 10 joints → determinate.
 *
 * ANSWERS at the given 60 / 20 kN (derived here; the sheet prints none).
 *   A = 55.00 kN, B = 25.00 kN, both up
 *   bottom chord  +55.00 / +50.00 / +50.00 / +25.00 T
 *   top chord         0   / −55.00 / −25.00 /   0
 *   verticals         0   /  −5.00 /   0    / +25.00 /  0
 *   diagonals     −77.78 / +7.07 / −35.36 / −35.36
 *   check: A = [60 × (11.475 − 2.8688) + 20 × (11.475 − 5.7375)] / 11.475
 *            = (516.38 + 114.75) / 11.475 = 55.00 kN; B = 80 − 55 = 25.00 kN.
 *          Joint U1 vertically: 77.78 × 0.7071 + 5.00 − 60 = 0. ✓
 *
 * THE POINT OF THE TASK. Diagonal L1–U2 comes out in TENSION, +7.07 kN. On
 * page 1 the identical member of the identical truss was in compression. The
 * only thing that changed is that the load is no longer symmetric. Move the
 * load between F1 and F2 with the slider, keeping F1 + F2 = 80 kN, and that
 * diagonal crosses zero where the shear in the second panel does.
 *
 * WHERE IT CROSSES, derived rather than guessed. With F1 + F2 = 80 kN,
 *   A = [F1 × 3a + F2 × 2a] / 4a = (3F1 + 2(80 − F1)) / 4 = (F1 + 160) / 4
 * and a section through the second panel gives, for the 45° diagonal L1–U2,
 *   N = √2 × (F1 − A) = √2 × (3F1 − 160) / 4
 * which is +7.07 kN at F1 = 60 (matching the full joint solve) and ZERO at
 *   F1 = 160/3 = 53.333 kN,  F2 = 26.667 kN.
 * (The decode brief for this sheet says 40 kN; that is wrong — at F1 = 40 the
 * same formula and the same joint solve both give −14.14 kN. 53.33 is the
 * crossing, and the view computes it rather than printing it.)
 */

import { makeJointTrussView } from '../lib/exx2first.js';

const PAN = 2.8688;
const SPAN = 4 * PAN;
const TOT = 80;                                  // kN, F1 + F2, held constant
const F1_SHEET = 60;

const NODES = [];
for (let i = 0; i < 5; i++) NODES.push([i * PAN, 0]);      // L0..L4 = 0..4
for (let i = 0; i < 5; i++) NODES.push([i * PAN, PAN]);    // U0..U4 = 5..9
const MEM = [[0, 1], [1, 2], [2, 3], [3, 4],               // 0-3   bottom chord
             [5, 6], [6, 7], [7, 8], [8, 9],               // 4-7   top chord
             [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],       // 8-12  verticals
             [0, 6], [1, 7], [3, 7], [4, 8]];              // 13-16 diagonals / / \ \
const NAME = ['L0', 'L1', 'L2', 'L3', 'L4', 'U0', 'U1', 'U2', 'U3', 'U4'];
const FLIP_M = 14;                                // the diagonal L1–U2

const MPU = 1.85, ORG = [-26, -10], SFD = 15;

const CELLS = [];
for (let k = 0; k < 10; k++) CELLS.push([8 + (k % 2) * 16, 13 - Math.floor(k / 2) * 9]);

const CASE = {
  tag: 'p.3', name: 'parallel-chord truss, F1 = 60 kN and F2 = 20 kN',
  nodes: NODES, members: MEM, supports: { 0: 'pin', 4: 'roller-v' },
  loads: { 6: [0, -F1_SHEET], 7: [0, -(TOT - F1_SHEET)] },
  load: (s) => ({ 6: [0, -s.F1], 7: [0, -(TOT - s.F1)] }),
  derive: (s, M, res) => ({
    F1: s.F1, F2: TOT - s.F1,
    A: res.reactions[0][1], B: res.reactions[4][1],
    diag: res.forces[FLIP_M],
  }),
  poly: true, cells: CELLS, MPU, ORG, SFD,
  nodeName: (i) => NAME[i],
  reacName: (i) => (i === 0 ? 'A' : 'B'),
  nodeLabelOff: (i) => (i < 5 ? [0, -3.4] : [0, 3.0]),
  labelSide: (m) => (m < 4 ? -1 : m < 8 ? 1 : m < 13 ? 1 : -1),
  reacLabelOff: (i) => (i === 0 ? [-3.8, -0.4] : [3.8, -0.4]),
  supportDir: () => [0, -1],
  loadOff: () => [2.8, 0.5],
  cellLabelOff: [0, 4.4],
  note: (d) => (Math.abs(d.diag) < 0.05
    ? `at F1 = ${d.F1.toFixed(1)} kN the diagonal L1–U2 is exactly zero`
    : `diagonal L1–U2 is ${d.diag > 0 ? 'in TENSION' : 'in compression'}, ${Math.abs(d.diag).toFixed(2)} kN`),
};

const STEPS = [
  { t: 'The exercise', d: 'page 3 of the sheet: the same four-panel truss as page 1, but the load is no longer symmetric. Find the two reactions, then the force diagram' },
  { t: 'The truss', d: 'left: four square panels of 2.8688 m, diagonals in a / / \\ \\ pattern, pin at the left and roller at the right. F1 lands at the quarter point and F2 at midspan',
    detail: (d) => [`span ${SPAN.toFixed(4)} m, depth ${PAN.toFixed(4)} m — square panels, so every diagonal is at 45°`,
                    `${d.nm} members + ${d.nr} reactions = ${d.nm + d.nr} = 2 × ${d.nn} joints → statically determinate`,
                    `F1 = ${d.F1.toFixed(1)} kN at L/4 · F2 = ${d.F2.toFixed(1)} kN at L/2 · total ${TOT} kN`] },
  { t: 'The reactions', d: 'the first thing the task asks for. Moments about B: each load counts its distance from B, divided by the span. Because the loads sit nearer A, A takes more of them',
    detail: (d) => [`A = [${d.F1.toFixed(1)} × ${(SPAN - PAN).toFixed(4)} + ${d.F2.toFixed(1)} × ${(SPAN - 2 * PAN).toFixed(4)}] / ${SPAN.toFixed(4)} = ${d.A.toFixed(2)} kN`,
                    `B = ${TOT} − ${d.A.toFixed(2)} = ${d.B.toFixed(2)} kN`,
                    `ΣV: ${d.A.toFixed(2)} + ${d.B.toFixed(2)} = ${TOT}.00 kN ✓ · ΣH = 0`] },
  { t: 'The member forces', d: 'the five zero-force members come free: two members and no load at U0 and U4, two collinear chords plus a vertical and no load at L2. Then the rest, joint by joint',
    detail: (d) => [`${d.zero.filter(Boolean).length} zero-force members`,
                    `bottom chord +${d.forces[0].toFixed(2)} / +${d.forces[1].toFixed(2)} / +${d.forces[2].toFixed(2)} / +${d.forces[3].toFixed(2)} kN`,
                    `diagonals ${[13, 14, 15, 16].map((m) => d.forces[m].toFixed(2)).join(' / ')} kN`],
    take: 'the unloaded end panels do almost nothing — a truss only works where there is shear to carry' },
  { t: 'The force diagram', d: 'right: one closed polygon per joint, drawn to scale, every edge parallel to its member. Zero-force members show as a polygon vertex with no edge at all',
    detail: (d) => [`10 joints → 10 polygons, 1 unit ≙ ${SFD} kN (the sheet asks for 1 cm ≙ 10 kN)`,
                    `largest tension +${d.tmax.toFixed(2)} kN · largest compression ${d.cmax.toFixed(2)} kN`] },
  { t: 'The diagonal that changes its mind', d: 'diagonal L1–U2 is in TENSION here, and on page 1 the same member of the same truss was compressed. Nothing about the truss changed — only the symmetry of the load. Slide the load from F1 to F2 and watch it cross',
    detail: (d) => [`at the sheet’s 60 / 20 kN: L1–U2 = +7.07 kN, tension`,
                    `now at ${d.F1.toFixed(1)} / ${d.F2.toFixed(1)} kN: L1–U2 = ${d.diag > 0 ? '+' : ''}${d.diag.toFixed(2)} kN`,
                    `N = √2 × (3·F1 − 160)/4, so it crosses zero at F1 = ${(160 / 3).toFixed(2)} kN — where the shear in the second panel changes sign`],
    take: 'a diagonal carries the panel shear, and shear changes sign wherever the load pattern says it should. This is why bracing has to be designed for both directions' },
];

export const { meta, create } = makeJointTrussView({
  title: 'EX X · 4 — the diagonal that changes its mind',
  subtitle: 'Structural Design II · sheet EX X “Additional Exercises”, page 3 (German task 4; the English sheet calls it “Task 1”)',
  about: 'The same four-panel truss as page 1, loaded asymmetrically: 60 kN at the quarter point and 20 kN at midspan. The reactions come out 55 and 25 kN, and one member does something page 1’s symmetric case never did — diagonal L1–U2 goes into tension. Slide the load between F1 and F2, keeping the total at 80 kN, and it crosses zero at F1 = 53.33 kN. That is the whole reason this task exists: a web member’s sign belongs to the load case, not to the truss.',
  result: (d) => [
    `A = ${d.A.toFixed(2)} kN, B = ${d.B.toFixed(2)} kN, both up (F1 = ${d.F1.toFixed(1)}, F2 = ${d.F2.toFixed(1)} kN, total ${TOT} kN)`,
    `bottom chord +${d.forces[0].toFixed(2)} / +${d.forces[1].toFixed(2)} / +${d.forces[2].toFixed(2)} / +${d.forces[3].toFixed(2)} T · top chord ${d.forces[4].toFixed(2)} / ${d.forces[5].toFixed(2)} / ${d.forces[6].toFixed(2)} / ${d.forces[7].toFixed(2)} C`,
    `diagonals ${[13, 14, 15, 16].map((m) => (d.forces[m] > 0 ? '+' : '') + d.forces[m].toFixed(2)).join(' / ')} kN · ${d.zero.filter(Boolean).length} zero-force members`,
    `diagonal L1–U2 = ${d.diag > 0 ? '+' : ''}${d.diag.toFixed(2)} kN — ${d.diag > 0.05 ? 'tension' : d.diag < -0.05 ? 'compression' : 'exactly zero'}; it changes sign at F1 = ${(160 / 3).toFixed(2)} kN`],
  frame: [[-28, -32], [34, 23]],
  defaults: { F1: F1_SHEET },
  caseOf: () => 0,
  cases: [CASE],
  at: { form: 1, load: 1, reac: 2, mem: 3, poly: 4 },
  steps: STEPS,
  formTitle: () => 'Form diagram 1:100',
  titlePos: { form: [-15, -16.4], force: [16, 20.0], sub: [16, 18.4],
              note: [-15, -18.0], zero: [-15, -19.6] },
  controls: (panel, s, refresh) => {
    const g = panel.section('Given');
    panel.slider(g, s, 'F1', `F1 (kN), with F2 = ${TOT} − F1`, 0, TOT, 1, refresh,
      (v) => `F1 = ${v.toFixed(0)} · F2 = ${(TOT - v).toFixed(0)} kN`
        + (Math.abs(v - F1_SHEET) < 0.5 ? '  ← the sheet’s values'
          : Math.abs(v - 160 / 3) < 0.5 ? '  ← L1–U2 is nearly zero here' : ''));
  },
});
