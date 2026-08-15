/**
 * EX 3 · Task 2 — Seilform (finding a cable form)
 * Structural Design I, HS 22 (sheet UE 3 "Seiltragwerke" — German only in
 * the archive, and the ONE graphic-statics sheet that ships an official
 * worked solution, which this view is checked against).
 *
 * Given: four loads F_d1 = 20, F_d2 = 40, F_d3 = 40, F_d4 = 20 kN between
 * two supports at DIFFERENT heights. Wanted, in the sheet's own order:
 * first the resultant with an auxiliary construction (a trial funicular),
 * then the directions of the support reactions and global equilibrium,
 * finally the cable segments — and the governing force N_d,max.
 *
 * Geometry digitised from the sheet (pdftocairo -svg): loads at x = 274.3,
 * 331.0, 416.0, 529.4 pt; supports A (217.7, 522.1) and B (642.7, 469.4).
 * The OFFICIAL SOLUTION's drawn cable runs A (217.8, 513.6) → (274.5,
 * 567.9) → (331.2, 605.4) → (416.2, 611.6) → (529.5, 552.9) → B (642.9,
 * 460.9). Its four slope breaks give H = 67.5 / 67.97 / 67.68 / 68.21 kN
 * — one consistent thrust of H ≈ 67.8 kN, and the steepest segment then
 * carries 93.9 kN. The sheet's answer table prints N_d,max = 94 kN, so
 * this reconstruction reproduces the official answer exactly; H is the
 * view's design parameter and defaults to that solution.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'EX 3.2 — Seilform: designing a cable form',
  subtitle: 'Structural Design I · sheet UE 3 “Seiltragwerke”, task 2',
  about: 'Four unequal loads and two supports at different heights: unlike the earlier tasks the shape is NOT given — you design it. One number does it, the horizontal thrust H: choose it and the whole cable follows, because the cable must still pass through both supports. A shallow cable needs a big thrust and carries big forces; a deep one is gentler. The steepest segment always governs. The default here is the shape of the course’s own published solution, which gives N_d,max = 94 kN.',
  result: (d) => [`H = ${d.H.toFixed(1)} kN · N_d,max = ${d.Nmax.toFixed(1)} kN in segment ${d.imax + 1}`,
                  `reactions: A = ${d.NA.toFixed(1)} kN, B = ${d.NB.toFixed(1)} kN (both pulling along the cable)`,
                  `the sheet’s answer table: N_d,max = 94 kN`],
  frame: [[-25, -34], [43, 18]],
};

const U = 0.09;                       // drawing units per PDF point
const AX = 217.8, AY = 513.6;         // the solution's support A (PDF pt)
const A = [-2, 3];
const p2u = (x, y) => [A[0] + (x - AX) * U, A[1] - (y - AY) * U];
const B = p2u(642.9, 460.9);
const LX = [274.3, 331.0, 416.0, 529.4].map((x) => p2u(x, 0)[0]);
const SFD = 7;                        // kN per drawing unit
const LL = [-14, -9];                 // top of the load line
const H_SOL = 67.8;                   // the official solution's thrust

const DEFAULTS = {
  F1: 20, F2: 40, F3: 40, F4: 20,
  H: H_SOL,                           // the design choice
  o1: true, sIF: 0.010,               // thickness ∝ force
  lbl: true, _k: 99,
};

const STEPS = [
  { t: 'The exercise', d: 'UE 3 task 2: four loads, two supports at different heights — and this time the cable shape is YOURS to design' },
  { t: 'What is given', d: 'left: the two supports A and B (B sits higher) and the four lines of action; nothing yet says how deep the cable hangs',
    detail: (d, st) => [`F_d1 = ${st.F1} · F_d2 = ${st.F2} · F_d3 = ${st.F3} · F_d4 = ${st.F4} kN — ΣF = ${st.F1 + st.F2 + st.F3 + st.F4} kN`] },
  { t: 'The load line', d: 'right: the four loads laid off tip to tail. Their sum is the resultant’s size and direction — vertical, as they all are',
    detail: (d) => [`ΣF = ${d.tot} kN vertical`] },
  { t: 'The auxiliary construction', d: 'the sheet asks for the resultant FIRST: any trial pole and its rays hang a trial funicular on the left, and its outer strings meet on the resultant’s line of action',
    take: 'the same trick as task 1.2 — a trial funicular turns the load polygon into a position' },
  { t: 'The resultant', d: 'left: R acts on the vertical through that meeting point — right: R spans the whole load line, dashed green and offset so it does not hide the loads',
    detail: (d) => [`R = ${d.tot} kN on the vertical at x = ${d.xR.toFixed(2)}`] },
  { t: 'Now choose: the thrust H', d: 'the design decision. Pick the horizontal thrust and the pole is fixed at that distance from the load line — a small H means a deep, gentle cable, a big H a flat, hard-working one (drag the slider!)',
    detail: (d, st) => [`H = ${st.H.toFixed(1)} kN → the pole sits ${(st.H / SFD).toFixed(2)} units from the load line`] },
  { t: 'Global equilibrium', d: 'right: the reactions close the polygon — A from the pole to the top of the load line, B from its bottom back to the pole — left: the same two pulls at the supports, along the cable’s end directions',
    detail: (d) => [`A = ${d.NA.toFixed(1)} kN · B = ${d.NB.toFixed(1)} kN · with R they close: ΣF = 0`] },
  { t: 'The cable segments', d: 'left: starting at A, each segment runs parallel to its ray and turns at every line of action — the last one lands exactly on B, which proves the choice of H was consistent',
    detail: (d) => [`segment forces: ${d.N.map((n) => n.toFixed(1)).join(' · ')} kN`] },
  { t: 'The governing force', d: 'every segment shares the same horizontal thrust, so the STEEPEST one carries the most — that is the force the cable must be dimensioned for',
    detail: (d) => [`N_d,max = ${d.Nmax.toFixed(1)} kN (segment ${d.imax + 1}, the steepest)`,
                    `the published solution gives 94 kN — this construction reproduces it`],
    take: 'design freedom with one number: H buys you shape, and the steepest segment sends the bill' },
];

let OFF = 1;
function compute(s) {
  const F = [s.F1, s.F2, s.F3, s.F4];
  const tot = F.reduce((a, b) => a + b, 0);
  const xs = [A[0], ...LX, B[0]];
  const dx = xs.slice(1).map((x, i) => x - xs[i]);
  // cumulative load carried before each of the five segments
  const cum = [0];
  for (const f of F) cum.push(cum[cum.length - 1] + f);
  // the cable must still pass through B: that fixes the first slope
  const L = B[0] - A[0];
  const extra = dx.reduce((a, w, i) => a + cum[i] * w, 0);
  const s0 = ((B[1] - A[1]) - extra / s.H) / L;
  const sl = cum.map((c) => s0 + c / s.H);
  const pts = [A.slice()];
  sl.forEach((m, i) => pts.push([xs[i + 1], pts[i][1] + m * dx[i]]));
  const N = sl.map((m) => s.H * Math.hypot(1, m));
  const Nmax = Math.max(...N);
  const imax = N.indexOf(Nmax);
  // the resultant's line of action (moment of the loads about A)
  const xR = LX.reduce((a, x, i) => a + x * F[i], 0) / tot;
  // force diagram: load line + pole at H from it
  const div = [LL.slice()];
  F.forEach((f) => div.push([LL[0], div[div.length - 1][1] - f / SFD]));
  const o = [LL[0] + s.H / SFD, LL[1] + s0 * (s.H / SFD)];
  return { F, tot, xs, sl, pts, N, Nmax, imax, xR, div, o, s0,
           NA: N[0], NB: N[N.length - 1], H: s.H,
           off: [-OFF, 0] };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  OFF = dw.W.off;
  const ARR = dw.W.arrow, NARR = dw.W.narrow;

  dw.label('form_title', 'Lageplan — form diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Kräfteplan — force diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });

  for (const n of ['A', 'B']) {
    dw.disk(`sup${n}`, { intro: 1, r: dw.W.disk });
    dw.label(`lsup${n}`, n, { cls: 'num', intro: 1, when: (st) => st.lbl });
  }
  for (let i = 0; i < 4; i++) {
    dw.dashLine(`la${i}`, { intro: 1, color: PAL.grey, dash: dw.W.dash });
    dw.arrow(`f${i}`, { intro: 1, color: PAL.green, ...ARR });
    dw.label(`lf${i}`, `F_d${i + 1}`, { cls: 'num', intro: 1, color: PAL.green, when: (st) => st.lbl });
    dw.arrow(`ff${i}`, { intro: 2, color: PAL.green, ...ARR });
    dw.label(`lff${i}`, `F_d${i + 1}`, { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.lbl });
    dw.link(`f${i}`, `ff${i}`, `lf${i}`, `lff${i}`);
    dw.highlight(`f${i}`, [2]);
  }
  // the auxiliary (trial) construction — KEPT to the end: construction
  // information must never disappear, and the official solution plate
  // still shows its whole Hilfskonstruktion
  dw.disk('ptOt', { intro: 3, r: dw.W.disk * 0.7 });
  dw.label('lOt', 'o′', { cls: 'point', intro: 3, when: (st) => st.lbl });
  for (let i = 0; i <= 4; i++) dw.seg(`tray${i}`, { intro: 3, w: dw.W.ray, color: PAL.grey });
  for (let i = 0; i < 3; i++) dw.seg(`tstr${i}`, { intro: 3, w: dw.W.str, color: PAL.grey });
  dw.dashLine('text0', { intro: 3, color: PAL.grey, dash: dw.W.dash });
  dw.dashLine('text4', { intro: 3, color: PAL.grey, dash: dw.W.dash });
  dw.disk('ptS', { intro: 4, r: dw.W.disk * 0.8 });
  dw.dashLine('Rline', { intro: 4, color: PAL.grey, dash: dw.W.dash });
  dw.dashArrow('Rform', { intro: 4, color: PAL.green, w: dw.W.arrow.w * 1.15,
    headLen: dw.W.arrow.headLen, headW: dw.W.arrow.headW, dash: dw.W.dash * 1.6, flash: false });
  dw.dashArrow('Rforce', { intro: 4, color: PAL.green, w: dw.W.arrow.w * 1.15,
    headLen: dw.W.arrow.headLen, headW: dw.W.arrow.headW, dash: dw.W.dash * 1.6, flash: false });
  dw.label('lRform', 'R', { cls: 'num', intro: 4, color: PAL.green });
  dw.label('lRforce', 'R', { cls: 'num', intro: 4, color: PAL.green });
  dw.link('Rform', 'Rforce', 'lRform', 'lRforce');
  // the chosen pole and its rays
  dw.disk('ptO', { intro: 5, r: dw.W.disk * 0.8 });
  dw.label('lO', 'o', { cls: 'num', intro: 5, when: (st) => st.lbl });
  dw.seg('dimH', { intro: 5, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lH', '', { intro: 5, flash: false, color: PAL.grey });
  // reactions (offset beside the polygon so they never cover the segments)
  for (const n of ['A', 'B']) {
    dw.arrow(`r${n}`, { intro: 6, color: PAL.green, ...NARR });
    dw.arrow(`fr${n}`, { intro: 6, color: PAL.green, ...NARR });
    dw.label(`lr${n}`, n, { cls: 'num', intro: 6, color: PAL.green, when: (st) => st.lbl });
    dw.link(`r${n}`, `fr${n}`, `lr${n}`);
  }
  // the cable itself, paired with its rays
  for (let i = 0; i < 5; i++) {
    dw.poly(`if${i}`, 4, { intro: 8, opacity: 1.0, z: -0.18, flash: false,
      color: { pending: PAL.grey, final: () => PAL.red }, when: (st) => st.o1 });
    dw.seg(`cab${i}`, { intro: 7, w: dw.W.bar, color: { pending: PAL.black, final: () => PAL.red } });
    dw.seg(`ray${i}`, { intro: 7, w: dw.W.ray, color: { pending: PAL.black, final: () => PAL.red } });
    dw.label(`ln${i}`, '', { cls: 'point', intro: 7, flash: false, color: PAL.red });
    dw.link(`cab${i}`, `ray${i}`, `ln${i}`);
  }
  dw.seg('gov', { intro: 8, w: dw.W.bar * 2.1, color: PAL.red, flash: false });
  dw.label('lgov', '', { cls: 'num', intro: 8, flash: false, color: PAL.red });

  dw.instant('form_title', 'force_title', 'force_sub');
  dw.ghostable(...[0, 1, 2, 3].map((i) => `ff${i}`), ...[0, 1, 2, 3, 4].map((i) => `ray${i}`),
               'Rforce', 'frA', 'frB');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    dw.setLabel('form_title', [0, 15.5]);
    dw.setLabel('force_title', [-22, -30]);
    dw.setLabel('force_sub', [-22, -31.6]);
    dw.setText('force_sub', `1 unit :: ${SFD} kN`);

    dw.setDisk('supA', A); dw.setDisk('supB', B);
    dw.setLabel('lsupA', V.add(A, [-1.8, 0.9]));
    dw.setLabel('lsupB', V.add(B, [1.8, 0.9]));

    LX.forEach((x, i) => {
      dw.setDashLine(`la${i}`, [[x, 9], [x, -7]]);
      const top = d.pts[i + 1][1];
      dw.setArrow(`f${i}`, [x, top + 3.4 + d.F[i] / SFD], [x, top + 3.2]);
      dw.setLabel(`lf${i}`, [x + 1.6, top + 4.2 + d.F[i] / SFD * 0.5]);
      dw.setArrow(`ff${i}`, d.div[i], d.div[i + 1]);
      dw.setLabel(`lff${i}`, V.add(V.mid(d.div[i], d.div[i + 1]), [1.9, 0]));
    });

    // the auxiliary trial: a pole to the left, strings under the loads
    const ot = [LL[0] - 8, LL[1] - d.tot / SFD * 0.5];
    dw.setDisk('ptOt', ot);
    dw.setLabel('lOt', V.add(ot, [-1.3, 0.7]));
    const tA = [[LX[0], -1.5]];
    for (let i = 0; i < 3; i++) {
      const dir = V.sub(d.div[i + 1], ot);
      tA.push(V.intersect(tA[i], dir, [LX[i + 1], 0], [0, 1]) || tA[i]);
    }
    for (let i = 0; i <= 4; i++) dw.setSeg(`tray${i}`, ot, d.div[i]);
    for (let i = 0; i < 3; i++) dw.setSeg(`tstr${i}`, tA[i], tA[i + 1]);
    const St = V.intersect(tA[0], V.sub(d.div[0], ot), tA[3], V.sub(d.div[4], ot)) || tA[0];
    dw.setDashLine('text0', [St, tA[0]]);
    dw.setDashLine('text4', [tA[3], St]);
    dw.setDisk('ptS', St);

    dw.setDashLine('Rline', [[d.xR, 10], [d.xR, -8]]);
    dw.setDashArrow('Rform', [d.xR, 8], [d.xR, 8 - d.tot / SFD]);
    dw.setLabel('lRform', [d.xR + 1.7, 8 - d.tot / SFD * 0.5]);
    dw.setDashArrow('Rforce', V.add(d.div[0], d.off), V.add(d.div[4], d.off));
    dw.setLabel('lRforce', V.add(V.add(V.mid(d.div[0], d.div[4]), d.off), [-1.8, 0]));

    dw.setDisk('ptO', d.o);
    dw.setLabel('lO', V.add(d.o, [1.5, 0.6]));
    dw.setSeg('dimH', [d.div[0][0], d.div[0][1] + 2.0], [d.o[0], d.div[0][1] + 2.0]);
    dw.setLabel('lH', [(d.div[0][0] + d.o[0]) / 2, d.div[0][1] + 3.1]);
    dw.setText('lH', `H = ${d.H.toFixed(1)} kN`);

    for (let i = 0; i < 5; i++) {
      dw.setSeg(`cab${i}`, d.pts[i], d.pts[i + 1]);
      dw.setPoly(`if${i}`, V.rectPoints(d.pts[i], d.pts[i + 1], s.sIF * d.N[i]));
      dw.setSeg(`ray${i}`, d.o, d.div[i === 4 ? 4 : i]);
      dw.setLabel(`ln${i}`, V.add(V.mid(d.o, d.div[Math.min(i, 4)]), [0, 0.9]));
      dw.setText(`ln${i}`, `${d.N[i].toFixed(0)}`);
    }
    // reactions: at the supports they pull along the cable, offset in the polygon
    const uA = V.unit(V.sub(A, d.pts[1])), uB = V.unit(V.sub(B, d.pts[4]));
    const LEN = d.tot / SFD * 0.42;
    dw.setArrow('rA', A, V.add(A, V.mul(uA, LEN)));
    dw.setArrow('rB', B, V.add(B, V.mul(uB, LEN)));
    dw.setLabel('lrA', V.add(V.add(A, V.mul(uA, LEN)), [-1.4, 0.8]));
    dw.setLabel('lrB', V.add(V.add(B, V.mul(uB, LEN)), [1.4, 0.8]));
    dw.setArrow('frA', d.o, d.div[0]);
    dw.setArrow('frB', d.div[4], d.o);

    dw.setSeg('gov', d.pts[d.imax], d.pts[d.imax + 1]);
    dw.setLabel('lgov', V.add(V.mid(d.pts[d.imax], d.pts[d.imax + 1]), [-2.5, -1.7]));
    dw.setText('lgov', `N_d,max = ${d.Nmax.toFixed(0)} kN`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const par = panel.section('Given');
  for (const [k, lb] of [['F1', 'F_d1 (kN)'], ['F2', 'F_d2 (kN)'], ['F3', 'F_d3 (kN)'], ['F4', 'F_d4 (kN)']]) {
    panel.slider(par, s, k, lb, 5, 80, 5, refresh);
  }
  panel.toggle(par, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.025, 0.001, refresh);
  panel.toggle(par, s, 'lbl', 'show labels', refresh);
  const des = panel.section('Your design');
  panel.slider(des, s, 'H', 'horizontal thrust H (kN)', 35, 160, 0.5, refresh);

  refresh();
  return player;
}
