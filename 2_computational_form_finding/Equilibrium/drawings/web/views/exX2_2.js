/**
 * EX X · German task 2 — an asymmetric truss, and a roller that lifts off
 * Structural Design II, FS 23, "Additional Exercises", sheet page 2 (top).
 *
 * NUMBERING. The English sheet calls this block "Task 3"; the German sheet
 * calls it Aufgabe 2, and the German numbering is the correct one (the English
 * counter restarts on almost every page and repeats numbers three times over).
 *
 * TEXT (verbatim). "Draw the corresponding force diagram for the given truss.
 * First, find the global equilibrium. Indicate tension forces with red and
 * compression forces with blue."
 *
 * GIVENS. F = 100 kN at the apex, on a dash-dot line of action inclined
 * 25.77° below the horizontal, pointing down-and-to-the-left. Form diagram
 * 1:100, force diagram 1 cm ≙ 10 kN.
 *
 * GEOMETRY, digitised (the sheet prints no dimensions). Origin = support A.
 *   A (pin)      0.000   0.000
 *   T (apex)     2.661   3.307     ← the load acts here
 *   M            2.661   0.771
 *   B (roller)   8.499  -0.920     ← 0.920 m LOWER than A
 * Members A–T, T–M, A–M, M–B, T–B: 5 + 3 reactions = 8 = 2 × 4 joints,
 * so it is exactly determinate.
 *
 * ANSWERS at the drawn 25.77° (derived here; the sheet prints none).
 *   load components  F = (−90.05, −43.48) kN
 *   A_x = +90.05, A_y = +64.90 kN  →  |A| = 111.00 kN at 35.79°
 *   B_y = −21.43 kN, i.e. 21.43 kN acting DOWNWARD
 *   A–T −64.96 C · T–M −28.58 C · A–M −51.36 C · M–B −51.36 C · T–B +60.90 T
 *   check: moment about A = 2.661 × (−43.48) − 3.307 × (−90.05) = +182.09 kNm
 *          → B_y = −182.09 / 8.499 = −21.43 kN.  ΣV and ΣH both close.
 *
 * THE ERROR IN THE SHEET, carried openly. B comes out in UPLIFT, and the
 * support drawn there is a roller. A roller cannot pull down: as drawn, this
 * truss lifts off its right-hand bearing. Either the bearing has to be
 * anchored, or the load's inclination is a drafting slip. The arithmetic is
 * right and the drawing is impossible, which is the useful thing here.
 *
 * WHERE THE SIGN CHANGES. B_y = 0 exactly when the load's line of action
 * passes through support A — that is, at atan(3.307 / 2.661) = 51.18° below
 * the horizontal, which is also the slope of member A–T. Anything shallower
 * (the drawn 25.77° included) puts the roller in uplift; anything steeper and
 * it behaves. The slider crosses that line, and the view says when it does.
 */

import { PAL } from '../lib/eqdraw.js';
import { makeJointTrussView } from '../lib/exx2first.js';

const A = [0, 0], T = [2.661, 3.307], M = [2.661, 0.771], B = [8.499, -0.920];
const NODES = [A, T, M, B];
const MEM = [[0, 1], [1, 2], [0, 2], [2, 3], [1, 3]];
const NAME = ['A', 'T', 'M', 'B'];
const MNAME = ['A–T', 'T–M', 'A–M', 'M–B', 'T–B'];
const DRAWN = 25.77;                                  // ° below the horizontal
// the inclination at which the load's line of action runs through A
const FLIP = (Math.atan2(T[1], T[0]) * 180) / Math.PI;

// ORG sits 4 units lower than the drawing wants, so the load arrow and its
// label at the apex clear the step-caption card (whose lowest edge is y = 2.06
// once the sheet's task text is pinned above the canvas)
const MPU = 2.4, ORG = [-26, -10], SFD = 14;

const CASE = {
  tag: 'p.2', name: 'asymmetric truss, one inclined 100 kN load',
  nodes: NODES, members: MEM, supports: { 0: 'pin', 3: 'roller-v' },
  loads: { 1: [-100 * Math.cos((DRAWN * Math.PI) / 180),
                -100 * Math.sin((DRAWN * Math.PI) / 180)] },
  load: (s) => {
    const r = (s.ang * Math.PI) / 180;
    return { 1: [-s.F * Math.cos(r), -s.F * Math.sin(r)] };
  },
  derive: (s, Mo, res) => ({
    Fx: Mo.loads[1][0], Fy: Mo.loads[1][1],
    By: res.reactions[3][1], Ax: res.reactions[0][0], Ay: res.reactions[0][1],
    uplift: res.reactions[3][1] < -1e-9,
  }),
  poly: true,
  cells: [[8, 10], [24, 10], [8, -5], [24, -5]],
  MPU, ORG, SFD,
  nodeName: (i) => NAME[i],
  nodeLabelOff: (i) => ([[-3.2, -0.4], [-2.6, 1.8], [2.4, 1.2], [2.8, -1.4]][i]),
  labelSide: (m) => [1, 1, -1, -1, 1][m],
  reacLabelOff: (i) => (i === 0 ? [-3.8, -1.0] : [4.0, 0.6]),
  supportDir: () => [0, -1],
  loadOff: () => [-3.2, 0.8],
  cellLabelOff: [0, 5.6],
  note: (d) => (d.uplift
    ? 'the roller at B comes out in UPLIFT — as drawn, this truss lifts off its right-hand bearing'
    : 'B now pushes upward, so the roller drawn there is finally doing something a roller can do'),
};

const STEPS = [
  { t: 'The exercise', d: 'page 2 of the sheet: an asymmetric truss with one inclined 100 kN load at the apex. The task says to find the global equilibrium first, and it is right to — nothing else can start until the reactions are known' },
  { t: 'The truss', d: 'left: five members between four joints, a pin at A and a roller at B, and B sits almost a metre lower than A. Digitised at the sheet’s 1:100, since it prints no dimensions',
    detail: (d) => [`A (0, 0) · T (${T[0]}, ${T[1]}) · M (${M[0]}, ${M[1]}) · B (${B[0]}, ${B[1]}) m`,
                    `${d.nm} members + ${d.nr} reactions = ${d.nm + d.nr} = 2 × ${d.nn} joints → statically determinate`,
                    `the load is inclined ${d.ang.toFixed(2)}° below the horizontal, pointing down and to the left`] },
  { t: 'Global equilibrium', d: 'resolve the load, take moments about A to get B, then close the two force sums to get A. Three equations, three unknowns, and no member is involved yet',
    detail: (d) => [`F = (${d.Fx.toFixed(2)}, ${d.Fy.toFixed(2)}) kN`,
                    `ΣM_A: ${T[0]} × (${d.Fy.toFixed(2)}) − ${T[1]} × (${d.Fx.toFixed(2)}) = ${(T[0] * d.Fy - T[1] * d.Fx).toFixed(2)} kNm → B_y = ${d.By.toFixed(2)} kN`,
                    `A = (${d.Ax.toFixed(2)}, ${d.Ay.toFixed(2)}) kN = ${Math.hypot(d.Ax, d.Ay).toFixed(2)} kN at ${((Math.atan2(d.Ay, d.Ax) * 180) / Math.PI).toFixed(2)}°`],
    take: (d) => (d.uplift ? 'B came out NEGATIVE. Read the next-but-one step before believing the drawing' : '') },
  { t: 'The member forces', d: 'now the joints. B has two members and a known reaction, so it can be closed first; then M, then T, and A is the check',
    detail: (d) => [d.forces.map((f, m) => `${MNAME[m]} ${f > 0 ? '+' : ''}${f.toFixed(2)}`).join(' · ') + ' kN',
                    `only T–B is in tension; everything else is compressed`,
                    `residual of the joint solve ${d.resid.toExponential(1)} kN`] },
  { t: 'The force diagram', d: 'right: one closed polygon per joint, drawn to scale, every edge parallel to the member it stands for. Hover any member to light up its edges',
    detail: (d) => [`4 joints → 4 polygons, 1 unit ≙ ${SFD} kN (the sheet asks for 1 cm ≙ 10 kN)`,
                    `the largest vector in the whole diagram is A itself, ${Math.hypot(d.Ax, d.Ay).toFixed(2)} kN`] },
  { t: 'The roller is a lie', d: 'B’s reaction is negative: it points DOWN. A roller can only push, so the support the sheet draws cannot deliver it — the truss would simply lift off. Drag the load’s inclination and watch where the sign changes',
    detail: (d) => [`at the drawn ${DRAWN}°: B = ${(-21.43).toFixed(2)} kN, downward`,
                    `B_y passes through zero at ${FLIP.toFixed(2)}° — the inclination at which the load’s line of action goes straight through A, which is also the slope of member A–T`,
                    d.uplift ? `now at ${d.ang.toFixed(2)}°: still uplift, ${Math.abs(d.By).toFixed(2)} kN downward`
                             : `now at ${d.ang.toFixed(2)}°: B = ${d.By.toFixed(2)} kN upward — the roller works`],
    take: 'either that bearing is anchored, or the load inclination on the sheet is wrong. The arithmetic is not in doubt; the support symbol is' },
];

export const { meta, create } = makeJointTrussView({
  title: 'EX X · 2 — the truss whose roller lifts off',
  subtitle: 'Structural Design II · sheet EX X “Additional Exercises”, page 2 (German task 2; the English sheet calls it “Task 3”)',
  about: 'A five-member truss with one 100 kN load raked down and to the left. The task asks for global equilibrium first, and that is where the interest is: taking moments about the pin gives the right-hand reaction as NEGATIVE, 21.43 kN downward, and the support drawn under it is a roller. A roller cannot pull. So the sheet is arithmetically right and physically impossible, and the honest answer is to say so. Drag the load’s inclination and the reaction changes sign at 51.18°, exactly where the load’s line of action passes through the pin — which is also the slope of the top member.',
  result: (d) => [
    `load ${Math.hypot(d.Fx, d.Fy).toFixed(2)} kN at ${d.ang.toFixed(2)}° below the horizontal → components (${d.Fx.toFixed(2)}, ${d.Fy.toFixed(2)}) kN`,
    `A = (${d.Ax.toFixed(2)}, ${d.Ay.toFixed(2)}) kN = ${Math.hypot(d.Ax, d.Ay).toFixed(2)} kN at ${((Math.atan2(d.Ay, d.Ax) * 180) / Math.PI).toFixed(2)}° · B = ${d.By.toFixed(2)} kN${d.uplift ? ' — DOWNWARD, which a roller cannot deliver' : ' upward'}`,
    `members: ${d.forces.map((f, m) => `${MNAME[m]} ${f > 0 ? '+' : ''}${f.toFixed(2)}`).join(' · ')} kN`,
    `B_y changes sign at ${FLIP.toFixed(2)}°, where the load’s line of action passes through support A`],
  frame: [[-28, -32], [34, 23]],
  defaults: { ang: DRAWN, F: 100 },
  caseOf: () => 0,
  cases: [CASE],
  at: { form: 1, load: 1, reac: 2, mem: 3, poly: 4 },
  steps: STEPS,
  formTitle: () => 'Form diagram 1:100',
  titlePos: { form: [-15, -14.2], force: [16, 21.4], sub: [16, 19.8],
              note: [-15, -15.9], zero: [-15, -17.6] },

  declare: (dw) => {
    dw.dashLine('loa', { intro: 1, color: PAL.grey, dash: dw.W.dash });
    dw.label('lloa', 'F: line of action', { cls: 'point', flash: false, intro: 1, color: PAL.grey });
    dw.instant('loa', 'lloa');
  },
  extra: (dw, d) => {
    const ux = (p) => [ORG[0] + p[0] * MPU, ORG[1] + p[1] * MPU];
    const r = (d.ang * Math.PI) / 180;
    const u = [Math.cos(r), Math.sin(r)];
    const q = ux(T);
    dw.setDashLine('loa', [[q[0] - u[0] * 9, q[1] - u[1] * 9],
                           [q[0] + u[0] * 13, q[1] + u[1] * 13]]);
    dw.setLabel('lloa', [q[0] + u[0] * 13 + 4.4, q[1] + u[1] * 13 + 0.5]);
    // the sign-flip inclination needs no line of its own: it IS the line
    // A-T extended, which the drawing already shows as a member
  },
  controls: (panel, s, refresh) => {
    const g = panel.section('Given');
    panel.slider(g, s, 'ang', 'load inclination below the horizontal (°)', 0, 90, 0.5, refresh,
      (v) => `${v.toFixed(2)}°${Math.abs(v - DRAWN) < 0.26 ? '  ← as drawn' : v < FLIP ? '  · roller in uplift' : '  · roller pushes up'}`);
    panel.slider(g, s, 'F', 'F (kN)', 20, 200, 5, refresh,
      (v) => `${v.toFixed(0)} kN${Math.abs(v - 100) < 2.6 ? '  ← the sheet’s value' : ''}`);
  },
});
