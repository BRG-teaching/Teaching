/**
 * EX X · German task 5 — a pitched truss under inclined roof loads
 * Structural Design II, FS 23, "Additional Exercises", sheet page 3 (bottom).
 *
 * NUMBERING. The English sheet calls this block "Task 2"; the German sheet
 * calls it Aufgabe 5, and the German numbering is the correct one.
 *
 * TEXT (verbatim). "Determine the resultant force R and both reaction forces
 * A and B for the following truss. Draw the corresponding force diagram for
 * the given case. Indicate tension forces with red and compression forces with
 * blue."
 *
 * GIVENS. F1 = F2 = F3 = 30 kN, all inclined 36.97° below the horizontal and
 * pointing down-and-to-the-right (measured off the drawn arrows and confirmed
 * against all three of them). Form diagram 1:100, force diagram 1 cm ≙ 10 kN.
 *
 * GEOMETRY, digitised (the sheet prints no dimensions). Origin = support A.
 *   A  (pin)     0.000  0.000    ← F1 acts HERE
 *   P1           2.578  1.013    ← F2, the midpoint of the left rafter
 *   T  (apex)    5.156  2.026    ← F3
 *   P2           7.7335 1.013    ← snapped to the exact rafter midpoint, see below
 *   n1           2.976  0.000
 *   n2           7.335  0.000
 *   B  (roller) 10.311  0.000
 * Span 10.311 m, rise 2.026 m, roof pitch 21.45°. 11 members + 3 reactions
 * = 14 = 2 × 7 joints → statically determinate.
 *
 * ANSWERS at the drawn 36.97° (derived here; the sheet prints none).
 *   R = 90.00 kN at 36.97°, line of action through P1 — three equal, equally
 *   spaced, parallel loads put the resultant on the middle one.
 *   R = (+71.91, −54.13) kN
 *   A = (−71.91, +33.53) kN = 79.34 kN at 25.00° above the horizontal,
 *       pointing up-and-to-the-LEFT · B = +20.60 kN up
 *   rafters −42.35 / −58.06 / −56.32 / −56.32 C
 *   bottom chord +87.35 / +52.41 / +52.42 T
 *   posts P1–n1 −25.56 C, P2–n2 = 0 · webs n1–T +34.94 T, n2–T = 0
 *   check: ΣM_A with R at P1 = 2.578 × (−54.13) − 1.013 × (71.91) = −212.39
 *          kNm → B = 20.60 kN. ΣV: 33.53 + 20.60 = 54.13 = |R_y| ✓
 *
 * THE TWO ZERO MEMBERS ARE GEOMETRIC, not accidental: at P2 two collinear
 * rafters meet one transverse post with no load, so the post is zero; that
 * then leaves n2 with two collinear chords and one web, so the web is zero
 * too. They stay zero for any load direction, which the slider shows.
 *
 * THE AMBIGUITY IN THE SHEET, stated openly. F1's line of action passes
 * exactly through the pin at A. Structurally it therefore does nothing at all
 * except add itself to the reaction — it never enters a member. That is almost
 * certainly intended (a roof-slope tributary load whose end share lands on the
 * support) but it reads like a drafting mistake, so the view says it out loud.
 *
 * WHAT THE SLIDER SHOWS, derived rather than asserted. With all three loads at
 * an inclination θ below the horizontal, pointing right,
 *   B    = 3F (2.578 sinθ + 1.013 cosθ) / 10.311
 *   A_y  = 3F (7.733 sinθ − 1.013 cosθ) / 10.311
 * so B is positive for every θ in 0 … 90° — but A_y changes sign at
 * tanθ = 1.013 / 7.733, i.e. θ = 7.46°. Below that the PIN has to hold the
 * truss DOWN. (The decode brief for this sheet predicted that B goes negative
 * at 0°; it does not — at θ = 0 B = 8.84 kN up and it is A that hangs on.)
 */

import { PAL } from '../lib/eqdraw.js';
import { makeJointTrussView } from '../lib/exx2first.js';

const A = [0, 0], P1 = [2.578, 1.013], T = [5.156, 2.026];
// P2 is the midpoint of the RIGHT rafter, exactly as P1 (2.578, 1.013) is the
// midpoint of the left one. The digitiser read 7.733 where the midpoint of
// T–B is 7.7335 — half a millimetre on paper, but enough to leave the two
// "zero" members at −0.007 and +0.010 kN instead of zero. Snapped, because
// the sheet plainly means the midpoint and the zero-member rule needs the
// two rafter segments to be exactly collinear.
const P2 = [(5.156 + 10.311) / 2, 1.013];
const N1 = [2.976, 0], N2 = [7.335, 0], B = [10.311, 0];
const NODES = [A, P1, T, P2, N1, N2, B];
const MEM = [[0, 1], [1, 2], [2, 3], [3, 6],     // 0-3  rafters
             [0, 4], [4, 5], [5, 6],             // 4-6  bottom chord
             [1, 4], [3, 5],                     // 7-8  posts
             [4, 2], [5, 2]];                    // 9-10 webs
const NAME = ['A', 'P1', 'T', 'P2', 'n1', 'n2', 'B'];
const MNAME = ['A–P1', 'P1–T', 'T–P2', 'P2–B', 'A–n1', 'n1–n2', 'n2–B',
               'P1–n1', 'P2–n2', 'n1–T', 'n2–T'];
const DRAWN = 36.97;
// A_y changes sign where tanθ = 1.013 / 7.733
const AFLIP = (Math.atan2(P1[1], B[0] - P1[0]) * 180) / Math.PI;

// ORG sits 1.4 units lower than the drawing wants, so that the resultant R —
// laid off backwards along its line of action, above the truss — and its label
// clear the step-caption card, whose lowest edge is y = 2.06
const MPU = 2.0, ORG = [-26, -9.4], SFD = 14;

const load = (s) => {
  const r = (s.ang * Math.PI) / 180;
  const v = [s.F * Math.cos(r), -s.F * Math.sin(r)];
  return { 0: v.slice(), 1: v.slice(), 2: v.slice() };
};

const CASE = {
  tag: 'p.3', name: 'pitched truss, three inclined 30 kN roof loads',
  nodes: NODES, members: MEM, supports: { 0: 'pin', 6: 'roller-v' },
  loads: load({ ang: DRAWN, F: 30 }), load,
  derive: (s, M, res) => {
    const v = M.loads[0];
    return {
      Rx: 3 * v[0], Ry: 3 * v[1], R: 3 * Math.hypot(v[0], v[1]),
      Ax: res.reactions[0][0], Ay: res.reactions[0][1], By: res.reactions[6][1],
    };
  },
  poly: true,
  cells: [[8, 13], [24, 13], [8, 4], [24, 4], [8, -5], [24, -5], [8, -14]],
  MPU, ORG, SFD,
  nodeName: (i) => NAME[i],
  nodeLabelOff: (i) => ([[-2.6, 2.6], [-1.0, 2.2], [0, 2.6], [1.4, 2.2],
                         [-0.4, -2.4], [0.4, -2.4], [3.0, -1.4]][i]),
  labelSide: (m) => [1, 1, 1, 1, -1, -1, -1, -1, 1, 1, -1][m],
  reacLabelOff: (i) => (i === 0 ? [-5.4, -1.8] : [4.0, -0.4]),
  supportDir: () => [0, -1],
  loadOff: () => [-3.2, 1.0],
  cellLabelOff: [0, 5.2],
  note: (d) => (d.Ay < 0
    ? `at ${d.ang.toFixed(2)}° the pin at A has to HOLD DOWN: A_y = ${d.Ay.toFixed(2)} kN`
    : 'A pushes up and to the left, B straight up'),
};

const STEPS = [
  { t: 'The exercise', d: 'page 3 of the sheet, second block: a pitched truss carrying three equal roof loads raked down the slope. Find the resultant, find the reactions, then the force diagram' },
  { t: 'The truss', d: 'left: four rafter segments, a bottom chord in three pieces, two short posts perpendicular to the rafters and two webs back up to the apex. Digitised at 1:100 — the sheet prints no dimensions',
    detail: (d) => [`span ${B[0]} m, rise ${T[1]} m, roof pitch ${((Math.atan2(T[1], T[0]) * 180) / Math.PI).toFixed(2)}°`,
                    `${d.nm} members + ${d.nr} reactions = ${d.nm + d.nr} = 2 × ${d.nn} joints → statically determinate`,
                    `F1 at A, F2 at P1, F3 at the apex, all ${d.F.toFixed(0)} kN at ${d.ang.toFixed(2)}° below the horizontal`],
    take: 'F1’s line of action runs straight through the pin at A. It therefore never enters a member — it just adds itself to the reaction. Intended, but it looks like a mistake' },
  { t: 'The resultant R', d: 'three equal parallel loads, equally spaced along the rafter, so their resultant is three times one of them and its line of action passes through the middle one. That is the whole of the first question',
    detail: (d) => [`R = 3 × ${d.F.toFixed(0)} = ${d.R.toFixed(2)} kN at ${d.ang.toFixed(2)}° below the horizontal`,
                    `R = (${d.Rx.toFixed(2)}, ${d.Ry.toFixed(2)}) kN, through P1 (${P1[0]}, ${P1[1]})`] },
  { t: 'The reactions', d: 'moments about A give B; the two force sums then give A. The roller can only push up, so it takes no part of the horizontal push at all — the pin takes every kilonewton of it',
    detail: (d) => [`ΣM_A: ${P1[0]} × (${d.Ry.toFixed(2)}) − ${P1[1]} × (${d.Rx.toFixed(2)}) = ${(P1[0] * d.Ry - P1[1] * d.Rx).toFixed(2)} kNm → B = ${d.By.toFixed(2)} kN`,
                    `A = (${d.Ax.toFixed(2)}, ${d.Ay.toFixed(2)}) kN = ${Math.hypot(d.Ax, d.Ay).toFixed(2)} kN at ${((Math.atan2(d.Ay, d.Ax) * 180) / Math.PI).toFixed(2)}°`,
                    `ΣV: ${d.Ay.toFixed(2)} + ${d.By.toFixed(2)} = ${(d.Ay + d.By).toFixed(2)} = |R_y| ✓ · ΣH: ${d.Ax.toFixed(2)} + ${d.Rx.toFixed(2)} = ${(d.Ax + d.Rx).toFixed(2)} ✓`] },
  { t: 'Two members that do nothing', d: 'before any arithmetic: at P2 two collinear rafters meet one transverse post and there is no load there, so the post is zero. That leaves n2 with two collinear chords and one web, so the web is zero too. Neither depends on the load',
    detail: (d) => [`P2–n2 = ${d.forces[8].toFixed(2)} kN · n2–T = ${d.forces[10].toFixed(2)} kN`,
                    `everything else: ` + [0, 1, 2, 3].map((m) => `${MNAME[m]} ${d.forces[m].toFixed(2)}`).join(' · '),
                    [4, 5, 6, 7, 9].map((m) => `${MNAME[m]} ${d.forces[m] > 0 ? '+' : ''}${d.forces[m].toFixed(2)}`).join(' · ')],
    take: 'the right-hand half of this truss is carrying almost nothing in its web, because all three loads are on the left half' },
  { t: 'The force diagram', d: 'right: one closed polygon per joint, drawn to scale, every edge parallel to its member. Joint A’s polygon has four vectors in it — two members, the load and the reaction — which is why it is the biggest',
    detail: (d) => [`7 joints → 7 polygons, 1 unit ≙ ${SFD} kN (the sheet asks for 1 cm ≙ 10 kN)`,
                    `largest tension +${d.tmax.toFixed(2)} kN in the bottom chord next to A · largest compression ${d.cmax.toFixed(2)} kN in the rafter above it`] },
  { t: 'Flatten the load', d: 'drag the inclination. At 90° it is a pure gravity case and both supports push up. As the load lies down towards horizontal, B stays positive but A_y falls — and below 7.46° the pin has to HOLD THE TRUSS DOWN',
    detail: (d) => [`B = 3F (${P1[0]} sinθ + ${P1[1]} cosθ) / ${B[0]} → always positive`,
                    `A_y = 3F (${(B[0] - P1[0]).toFixed(3)} sinθ − ${P1[1]} cosθ) / ${B[0]} → zero at θ = ${AFLIP.toFixed(2)}°`,
                    `now at ${d.ang.toFixed(2)}°: A_y = ${d.Ay.toFixed(2)} kN, B = ${d.By.toFixed(2)} kN`],
    take: 'a pin can hold down and a roller cannot. Which support gets which symbol is a decision, and this is the load case that tests it' },
];

export const { meta, create } = makeJointTrussView({
  title: 'EX X · 5 — a pitched truss, raked loads, and a load that lands on its support',
  subtitle: 'Structural Design II · sheet EX X “Additional Exercises”, page 3 (German task 5; the English sheet calls it “Task 2”)',
  about: 'Three 30 kN loads raked 36.97° down the roof slope. The resultant is easy — three equal, equally spaced, parallel forces put it through the middle one — and from there moments about the pin give everything. Two things make the task worth drawing. First, two members are zero for purely geometric reasons and stay zero however the load is turned. Second, F1’s line of action passes exactly through the pin, so that load never enters a single member; it just walks straight into the support. Drag the inclination and the pin flips from pushing up to holding down at 7.46°.',
  result: (d) => [
    `R = ${d.R.toFixed(2)} kN at ${d.ang.toFixed(2)}° below the horizontal, through P1 → (${d.Rx.toFixed(2)}, ${d.Ry.toFixed(2)}) kN`,
    `A = (${d.Ax.toFixed(2)}, ${d.Ay.toFixed(2)}) kN = ${Math.hypot(d.Ax, d.Ay).toFixed(2)} kN at ${Math.abs((Math.atan2(d.Ay, -d.Ax) * 180) / Math.PI).toFixed(2)}° above the horizontal, pointing up and to the left · B = ${d.By.toFixed(2)} kN up`,
    `rafters ${[0, 1, 2, 3].map((m) => d.forces[m].toFixed(2)).join(' / ')} C · bottom chord ${[4, 5, 6].map((m) => '+' + d.forces[m].toFixed(2)).join(' / ')} T · post P1–n1 ${d.forces[7].toFixed(2)} · web n1–T +${d.forces[9].toFixed(2)}`,
    `P2–n2 and n2–T are zero for any load direction · A_y changes sign at ${AFLIP.toFixed(2)}° · F1 acts through the pin, so it enters no member`],
  frame: [[-28, -32], [34, 23]],
  defaults: { ang: DRAWN, F: 30 },
  caseOf: () => 0,
  cases: [CASE],
  at: { form: 1, load: 1, reac: 3, mem: 4, poly: 5 },
  steps: STEPS,
  formTitle: () => 'Form diagram 1:100',
  // force/sub sit at 20.6 / 19.35, not 21.4 / 19.8: the sheet's task text is
  // pinned across the top of the canvas and its banner covers y > 21.30
  titlePos: { form: [-15, -14.6], force: [16, 20.6], sub: [16, 19.35],
              note: [-15, -16.3], zero: [-15, -18.0] },

  // the resultant R and its line of action through P1, which is the first
  // thing the task asks for
  declare: (dw) => {
    dw.dashLine('rline', { intro: 2, color: PAL.grey, dash: dw.W.dash });
    dw.arrow('rArr', { intro: 2, color: PAL.green, ...dw.W.arrow });
    dw.label('lR', '', { cls: 'num', intro: 2, color: PAL.green });
  },
  extra: (dw, d) => {
    const ux = (p) => [ORG[0] + p[0] * MPU, ORG[1] + p[1] * MPU];
    const r = (d.ang * Math.PI) / 180;
    const u = [Math.cos(r), -Math.sin(r)];
    const q = ux(P1);
    dw.setDashLine('rline', [[q[0] - u[0] * 12, q[1] - u[1] * 12],
                             [q[0] + u[0] * 10, q[1] + u[1] * 10]]);
    // R itself, laid off backwards from P1 so it does not sit on top of F2
    dw.setArrow('rArr', [q[0] - u[0] * 11, q[1] - u[1] * 11],
                        [q[0] - u[0] * 4.2, q[1] - u[1] * 4.2]);
    dw.setLabel('lR', [q[0] - u[0] * 11.5 - 1.0, q[1] - u[1] * 11.5 + 1.6]);
    dw.setText('lR', `R = ${d.R.toFixed(2)} kN`);
  },
  controls: (panel, s, refresh) => {
    const g = panel.section('Given');
    panel.slider(g, s, 'ang', 'load inclination below the horizontal (°)', 0, 90, 0.5, refresh,
      (v) => `${v.toFixed(2)}°${Math.abs(v - DRAWN) < 0.26 ? '  ← as drawn'
        : v < AFLIP ? '  · the pin holds the truss DOWN' : ''}`);
    panel.slider(g, s, 'F', 'F1 = F2 = F3 (kN)', 5, 60, 1, refresh,
      (v) => `${v.toFixed(0)} kN${Math.abs(v - 30) < 0.5 ? '  ← the sheet’s value' : ''}`);
  },
});
