/**
 * EX 3 · Task 1b + 1c — Linienlast (a cable under a uniform line load)
 * Structural Design I, HS 22 (sheet UE 3 "Seiltragwerke").
 *
 * b) design a cable form for q_d = 20 kN/m and draw the force plan.
 * c) "Ist die innere Kraft in Situation b) entlang dem Seil konstant? Falls
 *    nicht, wo ist die innere Kraft am Grössten? Zeichnen Sie eine weitere
 *    Tangente in den Lage- und den Kräfteplan und begründen Sie damit Ihre
 *    Antwort." The official answer: "Die innere Kraft verändert sich entlang
 *    der Kurve. Sie ist bei den Auflagern am grössten. Diese grösste Kraft
 *    entspricht den äussersten Tangenten im Kräfteplan."
 *
 * Digitised from the official solution (page 1, lower half): the span is the
 * same 170.02 pt = 6.00 m at 1:100 as task 1a, so R = q_d·L = 20·6 = 120 kN
 * — EXACTLY the point load of task 1a. That is the whole point of the pair.
 *
 * The solution reuses task 1a's force plan unchanged: its load line is again
 * 170.02 pt ≙ 120 kN and its pole again 102.02 pt ≙ 72 kN from it. A pole at
 * H = 72 kN means a parabola of sag q·L²/(8H) = 1.25 m, whose end tangents
 * meet 2f = 2.50 m below the chord — precisely task 1a's straight cable. So
 * the two halves of the sheet are the same drawing read two ways.
 *
 * Its fan of 21 rays is the answer to c): every ray is the tangent at one
 * point of the cable, the shortest (102.02 pt ≙ 72 kN) is horizontal at the
 * crown, the longest (132.80 pt ≙ 93.7 kN) are the two at the supports.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'EX 3.1b — a cable under a line load, and where it works hardest',
  subtitle: 'Structural Design I · sheet UE 3 “Seiltragwerke”, tasks 1b and 1c',
  about: 'The same 6 m span as task 1a and the same 120 kN in total — but spread out as 20 kN/m instead of dropped at one point. Spread out, the cable answers with a parabola rather than a kink. Task 1c then asks the question worth asking: is the force the same all along it? Drag the extra tangent and read the answer off the force plan — every ray is a tangent, and the outermost ones are the longest.',
  result: (d) => [`sag f = ${d.f.toFixed(2)} m → H = ${d.H.toFixed(1)} kN (R = q·L = ${d.R.toFixed(0)} kN)`,
                  `c) the force is NOT constant: N = ${d.H.toFixed(1)} kN at the crown, ${d.Nmax.toFixed(1)} kN at the supports`,
                  `the largest force is at the supports — the outermost tangents in the force plan`],
  frame: [[-21, -14], [21, 15]],
};

const MPU = 1.6;
const SFD = 10;
const SPAN = 6;                       // m
const SYM = 4.2;
const AX = -16, AY = 2.0;
const BX = AX + SPAN * MPU;
const SPU = BX - AX;                  // span in drawing units
const MX = (AX + BX) / 2;
const LLX = 6, CY = 2;
const NSEG = 24;                      // segments the parabola is drawn with
const NFAN = 20;                      // rays in the fan (c)

const DEFAULTS = {
  qd: 20,                             // kN/m, given by the sheet
  f: 1.25,                            // m — the design choice
  xt: 0.18,                           // where the extra tangent of task c) sits
  o1: true, sIF: 0.011,
  lbl: true, _k: 99,
};

const SHAPED = 3, FAN = 6;

const STEPS = [
  { t: 'The exercise', d: 'UE 3 task 1b: the same span and the same total load as task 1a, but spread evenly along the cable. Design a form for it and draw the force plan' },
  { t: 'What is given', d: 'left: the supports A and B, and a uniform load q_d over the whole 6 m. Nothing yet says how deep the cable hangs',
    detail: (d, st) => [`q_d = ${st.qd} kN/m over L = ${SPAN} m · Lageplan 1:100`] },
  { t: 'First the resultant', d: 'left: a uniform load has a resultant of q·L acting through the middle — and it is the same 120 kN that task 1a dropped at a single point. The dashed line through A and B is the closing string CS/SL',
    detail: (d) => [`R = q_d · L = ${d.R.toFixed(0)} kN at midspan — task 1a's F_d exactly`] },
  { t: 'Now design: choose the sag', d: 'left: with the load spread out the cable answers with a parabola, not a kink. Its end tangents 1 and 2 meet at I below midspan — right: those two tangents are the outer rays, and they cross at the pole',
    detail: (d) => [`sag f = ${d.f.toFixed(2)} m · the end tangents meet 2f = ${(2 * d.f).toFixed(2)} m below the chord`],
    take: 'a straight cable is what a point load asks for; a parabola is what a uniform load asks for' },
  { t: 'The horizontal thrust', d: 'again the pole’s distance from the load line — and again it is constant along the whole cable, crown to support',
    detail: (d) => [`H = q·L² / (8f) = ${d.H.toFixed(1)} kN`,
                    `at the sheet's own sag this is 72 kN, the same pole as task 1a`] },
  { t: 'Global equilibrium', d: 'the reactions pull along the end tangents — the flattest the cable ever is at its ends, so this is where it pulls hardest',
    detail: (d) => [`A = B = ${d.Nmax.toFixed(1)} kN, each ${d.H.toFixed(1)} kN horizontal and ${(d.R / 2).toFixed(0)} kN vertical`] },
  { t: 'c) Is the force constant?', d: 'the sheet asks it directly. Subdivide the load line and draw a ray for every strip: each ray is the tangent at one point of the cable, and their lengths are visibly different. So no — the force changes all along it',
    detail: (d) => [`the fan runs from ${d.H.toFixed(1)} kN (horizontal, at the crown) to ${d.Nmax.toFixed(1)} kN (at the supports)`] },
  { t: 'c) Draw one more tangent', d: 'left: a tangent at any point you like — right: its ray. Drag it along the cable: as it swings toward a support the ray gets longer, toward the crown it gets shorter and flatter',
    detail: (d) => [`at x = ${(d.xt * SPAN).toFixed(2)} m from A: slope ${d.slope.toFixed(3)}, N = ${d.Nt.toFixed(1)} kN`] },
  { t: 'c) The answer', d: 'the horizontal part never changes, so the force is decided entirely by the vertical part — which is zero at the crown and largest at the supports. The longest rays are the outermost ones',
    detail: (d) => [`N_min = ${d.H.toFixed(1)} kN at the crown · N_max = ${d.Nmax.toFixed(1)} kN at the supports`,
                    `the sheet's answer: the force varies along the curve and is greatest at the supports`],
    take: 'a cable is thickest where it is flattest — the supports are always the hard part' },
];

function yOf(X, f) {
  const xi = (X - AX) / SPU;
  return AY - 4 * f * MPU * xi * (1 - xi);
}

function compute(s) {
  const R = s.qd * SPAN;
  const H = (s.qd * SPAN * SPAN) / (8 * s.f);
  const Nmax = Math.hypot(H, R / 2);
  // the tangent of task c), at a fraction xt of the span
  const shear = (xi) => s.qd * SPAN * (xi - 0.5);      // kN, vertical part
  const Nt = Math.hypot(H, shear(s.xt));
  const slope = shear(s.xt) / H;
  const curve = [];
  for (let i = 0; i <= NSEG; i++) {
    const X = AX + (SPU * i) / NSEG;
    curve.push([X, yOf(X, s.f)]);
  }
  const Nat = (xi) => Math.hypot(H, shear(xi));
  const A = [AX, AY], B = [BX, AY];
  const I = [MX, AY - 2 * s.f * MPU];                  // where the end tangents meet
  const T = [LLX, CY + R / SFD / 2], Bo = [LLX, CY - R / SFD / 2];
  const o = [LLX + H / SFD, CY];
  // a load-line point for a cable position xi (see the header note)
  const div = (xi) => [LLX, CY - shear(xi) / SFD];
  const P = [s.xt * SPU + AX, yOf(s.xt * SPU + AX, s.f)];
  return { R, H, Nmax, Nt, slope, curve, Nat, A, B, I, T, Bo, o, div, P,
           f: s.f, xt: s.xt };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  // one band width for every view: the largest force comes out W.band
  // half-wide, so a force reads the same thickness whatever the frame
  s.sIF = dw.bandScale(compute(s).Nmax);
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const CAB = { pending: PAL.black, final: (dd, st) => (st._k >= SHAPED ? PAL.red : PAL.grey) };

  dw.label('form_title', 'Lageplan — form diagram', { cls: 'title', flash: false });
  dw.label('form_sub', '', { cls: 'point', flash: false });
  dw.label('force_title', 'Kräfteplan — force diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });

  for (const n of ['A', 'B']) {
    dw.disk(`sup${n}`, { intro: 1, r: dw.W.disk });
    dw.label(`lsup${n}`, n, { cls: 'num', intro: 1, when: (st) => st.lbl });
  }
  // the uniform load: a run of equal arrows onto a bar, the way the sheet draws it
  dw.seg('qbar', { intro: 1, w: dw.W.thin, color: PAL.green });
  dw.strokes('qarr', 11, { intro: 1, w: dw.W.thin, color: PAL.green });
  dw.label('lq', '', { cls: 'num', intro: 1, color: PAL.green, when: (st) => st.lbl });

  dw.dashLine('chord', { intro: 2, color: PAL.grey, dash: dw.W.dash });
  dw.label('lcs', 'CS / SL', { cls: 'point', intro: 2, flash: false, color: PAL.grey });
  dw.dashLine('Rline', { intro: 2, color: PAL.grey, dash: dw.W.dash });
  dw.dashArrow('Rform', { intro: 2, color: PAL.green, w: dw.W.arrow.w * 1.15,
    headLen: dw.W.arrow.headLen, headW: dw.W.arrow.headW, dash: dw.W.dash * 1.6, flash: false });
  dw.dashArrow('Rforce', { intro: 2, color: PAL.green, w: dw.W.arrow.w * 1.15,
    headLen: dw.W.arrow.headLen, headW: dw.W.arrow.headW, dash: dw.W.dash * 1.6, flash: false });
  dw.label('lRform', 'R', { cls: 'num', intro: 2, color: PAL.green });
  dw.label('lRforce', 'R', { cls: 'num', intro: 2, color: PAL.green });
  dw.link('Rform', 'Rforce', 'lRform', 'lRforce');

  // the cable: one band per segment, so its width really does follow its force
  dw.poly('band', 2 * (NSEG + 1), { intro: SHAPED, opacity: 1.0, z: -0.18, flash: false,
    color: { pending: PAL.zeroBand, final: () => PAL.redBand }, when: (st) => st.o1 });
  dw.strokes('cable', NSEG, { intro: SHAPED, w: dw.W.bar, color: CAB });
  // the two end tangents and their rays — the same fact on both sides
  for (let i = 0; i < 2; i++) {
    dw.dashLine(`tan${i}`, { intro: SHAPED, color: PAL.red, dash: dw.W.dash });
    dw.seg(`ray${i}`, { intro: SHAPED, w: dw.W.bar, color: CAB });
    dw.label(`lt${i}`, `${i + 1}`, { cls: 'num', intro: SHAPED, color: PAL.red, when: (st) => st.lbl });
    dw.label(`lr${i}`, `${i + 1}`, { cls: 'num', intro: SHAPED, color: PAL.red, when: (st) => st.lbl });
    dw.link(`tan${i}`, `ray${i}`, `lt${i}`, `lr${i}`);
  }
  dw.disk('ptI', { intro: SHAPED, r: dw.W.disk * 0.7 });
  dw.label('lI', 'I', { cls: 'point', intro: SHAPED, when: (st) => st.lbl });
  dw.disk('ptO', { intro: SHAPED, r: dw.W.disk * 0.8 });
  dw.label('lO', 'o', { cls: 'num', intro: SHAPED, when: (st) => st.lbl });
  dw.seg('dimF', { intro: SHAPED, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lF', '', { intro: SHAPED, flash: false, color: PAL.grey });

  dw.seg('dimH', { intro: 4, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lH', '', { intro: 4, flash: false, color: PAL.grey });

  for (const n of ['A', 'B']) {
    dw.arrow(`re${n}`, { intro: 5, color: PAL.green, ...NARR });
    dw.arrow(`fre${n}`, { intro: 5, color: PAL.green, ...NARR });
    dw.label(`lre${n}`, n, { cls: 'num', intro: 5, color: PAL.green, when: (st) => st.lbl });
    dw.link(`re${n}`, `fre${n}`, `lre${n}`);
  }

  // c) the fan: one ray per strip of load, i.e. one tangent per point of cable
  dw.strokes('fan', NFAN - 1, { intro: FAN, w: dw.W.ray, color: PAL.red, flash: false });
  // c) the extra tangent the sheet asks for, in BOTH plans
  dw.seg('tanX', { intro: FAN + 1, w: dw.W.bar * 1.5, color: PAL.red });
  dw.seg('rayX', { intro: FAN + 1, w: dw.W.bar * 1.5, color: PAL.red });
  dw.disk('ptX', { intro: FAN + 1, r: dw.W.disk * 0.8 });
  dw.label('ltX', '', { cls: 'num', intro: FAN + 1, color: PAL.red });
  dw.label('lrX', '', { cls: 'num', intro: FAN + 1, color: PAL.red });
  dw.link('tanX', 'rayX', 'ltX', 'lrX');
  dw.label('lcrown', '', { cls: 'num', intro: FAN + 2, flash: false, color: PAL.red });
  dw.label('lsup', '', { cls: 'num', intro: FAN + 2, flash: false, color: PAL.red });

  dw.instant('form_title', 'form_sub', 'force_title', 'force_sub');
  dw.ghostable('Rforce', 'ray0', 'ray1', 'freA', 'freB', 'fan', 'rayX');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    dw.setLabel('form_title', [-16, -8.0]);
    dw.setLabel('form_sub', [-16, -9.3]);
    dw.setText('form_sub', 'arrows are symbols, not to scale');
    dw.setLabel('force_title', [1, 13.2]);
    dw.setLabel('force_sub', [9, 11.9]);
    dw.setText('force_sub', `to scale · 1 unit ≙ ${SFD} kN  (sheet: 1 cm ≙ 20 kN)`);

    dw.setDisk('supA', d.A); dw.setDisk('supB', d.B);
    dw.setLabel('lsupA', V.add(d.A, [-1.4, 1.0]));
    dw.setLabel('lsupB', V.add(d.B, [1.3, -1.3]));

    // the load run, sitting just above the chord
    const qy = AY + 3.4;
    dw.setSeg('qbar', [AX, qy], [BX, qy]);
    dw.setStrokes('qarr', Array.from({ length: 11 }, (_, i) => {
      const X = AX + (SPU * i) / 10;
      return [[X, qy], [X, qy - 1.5]];
    }));
    dw.setLabel('lq', [AX - 4.2, qy]);
    dw.setText('lq', `q_d = ${s.qd} kN/m`);

    dw.setDashLine('chord', [[AX - 2.4, AY], [BX + 2.4, AY]]);
    dw.setLabel('lcs', [BX + 3.4, AY + 0.9]);
    dw.setDashLine('Rline', [[MX, qy + 1.0], [MX, d.I[1] - 2.2]]);
    dw.setDashArrow('Rform', [MX, qy - 0.2], [MX, qy - 0.2 - SYM]);
    dw.setLabel('lRform', [MX + 1.6, qy - 0.2 - SYM * 0.5]);
    dw.setDashArrow('Rforce', d.T, d.Bo);
    dw.setLabel('lRforce', V.add(V.mid(d.T, d.Bo), [-2.0, 0]));

    // the cable, band by band
    const segs = [];
    for (let i = 0; i < NSEG; i++) segs.push([d.curve[i], d.curve[i + 1]]);
    dw.setStrokes('cable', segs);
    // mitred ribbon: the normal at each point averages its two neighbours, so
    // consecutive bands meet cleanly instead of notching at every joint
    const nrm = d.curve.map((p, i) => V.unit(V.perp(
      V.sub(d.curve[Math.min(NSEG, i + 1)], d.curve[Math.max(0, i - 1)]))));
    const hw = d.curve.map((p, i) => s.sIF * d.Nat(i / NSEG));
    const left = d.curve.map((p, i) => V.add(p, V.mul(nrm[i], hw[i])));
    const right = d.curve.map((p, i) => V.sub(p, V.mul(nrm[i], hw[i])));
    dw.setPoly('band', [...left, ...right.reverse()]);

    // the two end tangents, drawn from each support down to their meeting point
    const ends = [d.A, d.B];
    const rr = [d.T, d.Bo];
    for (let i = 0; i < 2; i++) {
      dw.setDashLine(`tan${i}`, [ends[i], d.I]);
      dw.setSeg(`ray${i}`, d.o, rr[i]);
      dw.setLabel(`lt${i}`, V.add(V.mid(ends[i], d.I), [i === 0 ? -1.5 : 1.5, -0.3]));
      dw.setLabel(`lr${i}`, V.add(V.mid(d.o, rr[i]), [2.4, i === 0 ? 1.0 : -1.0]));
    }
    dw.setDisk('ptI', d.I);
    dw.setLabel('lI', V.add(d.I, [0, -1.4]));
    dw.setDisk('ptO', d.o);
    dw.setLabel('lO', V.add(d.o, [1.5, 0.7]));
    dw.setSeg('dimF', [MX + 1.0, AY], [MX + 1.0, yOf(MX, s.f)]);
    dw.setLabel('lF', [MX + 3.4, AY - 0.7]);
    dw.setText('lF', `f = ${d.f.toFixed(2)} m`);

    dw.setSeg('dimH', [d.T[0], d.T[1] + 1.7], [d.o[0], d.T[1] + 1.7]);
    dw.setLabel('lH', [(d.T[0] + d.o[0]) / 2, d.T[1] + 2.8]);
    dw.setText('lH', `H = ${d.H.toFixed(1)} kN`);

    const uA = V.unit(V.sub(d.A, d.I)), uB = V.unit(V.sub(d.B, d.I));
    dw.setArrow('reA', d.A, V.add(d.A, V.mul(uA, SYM)));
    dw.setArrow('reB', d.B, V.add(d.B, V.mul(uB, SYM)));
    dw.setLabel('lreA', V.add(V.add(d.A, V.mul(uA, SYM)), [-1.2, 0.9]));
    dw.setLabel('lreB', V.add(V.add(d.B, V.mul(uB, SYM)), [1.2, 0.9]));
    dw.setArrow('freA', d.o, d.T);
    dw.setArrow('freB', d.Bo, d.o);

    // c) the fan and the load-line subdivision it comes from
    dw.setStrokes('fan', Array.from({ length: NFAN - 1 }, (_, i) =>
      [d.o, d.div((i + 1) / NFAN)]));

    // c) the extra tangent: same line in the form diagram, same ray beside it
    const tdir = V.unit([1, d.slope]);
    const half = 3.2;
    dw.setSeg('tanX', V.sub(d.P, V.mul(tdir, half)), V.add(d.P, V.mul(tdir, half)));
    dw.setDisk('ptX', d.P);
    dw.setSeg('rayX', d.o, d.div(s.xt));
    dw.setLabel('ltX', V.add(d.P, [-3.4, -2.4]));
    dw.setText('ltX', `tangent at ${(s.xt * SPAN).toFixed(2)} m`);
    dw.setLabel('lrX', V.add(d.div(s.xt), [-2.6, 0]));
    dw.setText('lrX', `${d.Nt.toFixed(1)} kN`);

    dw.setLabel('lcrown', [d.o[0] - (d.H / SFD) / 2, d.Bo[1] - 2.2]);
    dw.setText('lcrown', `shortest ray = H = ${d.H.toFixed(1)} kN`);
    dw.setLabel('lsup', [d.o[0] - (d.H / SFD) / 2, d.T[1] + 0.6]);
    dw.setText('lsup', `longest = ${d.Nmax.toFixed(1)} kN`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const par = panel.section('Given');
  panel.slider(par, s, 'qd', 'q_d (kN/m)', 5, 40, 1, refresh);
  panel.toggle(par, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, s.sIF * 2.5, s.sIF / 20, refresh);
  panel.toggle(par, s, 'lbl', 'show labels', refresh);
  const des = panel.section('Your design');
  panel.slider(des, s, 'f', 'sag f (m)', 0.8, 2.5, 0.05, refresh);
  const cc = panel.section('c) the extra tangent');
  panel.slider(cc, s, 'xt', 'where along the cable', 0.04, 0.96, 0.01, refresh);

  refresh();
  return player;
}
