/**
 * EX 3 · Task 1a — Punktlast (a cable under a single point load)
 * Structural Design I, HS 22 (sheet UE 3 "Seiltragwerke").
 *
 * "Entwerfen Sie eine mögliche Seilform für den gegebenen Belastungsfall und
 * zeichnen Sie dazu den Kräfteplan" — design a possible cable form for the
 * given load case and draw the force plan for it. So here the SHAPE is the
 * design choice and the thrust follows, the exact opposite of task 2 where
 * the thrust is chosen and the shape follows.
 *
 * Geometry digitised from the official solution (pdftocairo -svg, page 1):
 * the drawn cable runs A (188.94, 321.79) → I (273.95, 392.64) → B (358.96,
 * 321.79) pt. Span 170.02 pt = 6.00 m at 1:100, sag 70.85 pt = 2.50 m, and
 * the segments sit at 39.8°, i.e. exactly 2.5/3.0.
 *
 * The solution's own force plan confirms every number: its load line is
 * 170.03 pt = 6.00 cm ≙ 120 kN at the stated 1 cm ≙ 20 kN; its pole stands
 * 102.02 pt = 3.60 cm ≙ 72 kN from the load line, which is H = F·L/(4f) =
 * 120·6/10 = 72 kN; and its rays measure 132.80 pt = 4.69 cm ≙ 93.7 kN,
 * which is √(72² + 60²) = 93.72 kN. Nothing here is estimated.
 *
 * Arrow lengths in the FORM diagram are a constant symbol length, exactly as
 * the sheets draw them (their load symbol is a constant 42.5 pt whatever the
 * load). Only the force diagram is to scale — mixing the two in one diagram
 * is the one arrangement that actively misleads.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'EX 3.1a — a cable under a point load',
  subtitle: 'Structural Design I · sheet UE 3 “Seiltragwerke”, task 1a',
  about: 'A single load of 120 kN hangs midway between two supports at the same height. The sheet does not tell you how deep the cable should hang — that is your design decision, and it is the only decision there is. Choose the sag and everything else is forced: the two straight segments, the horizontal thrust, the reactions. Drag the sag slider and watch the price of a shallow cable. The default is the shape the course’s published solution draws, a 2.50 m sag on a 6 m span.',
  result: (d) => [`sag f = ${d.f.toFixed(2)} m → H = ${d.H.toFixed(1)} kN`,
                  `both segments carry N = ${d.N.toFixed(1)} kN (tension), and A = B = ${d.N.toFixed(1)} kN`,
                  `the published solution draws f = 2.50 m: H = 72 kN, N = 93.7 kN`],
  frame: [[-21, -14], [21, 15]],
};

const MPU = 1.6;                      // drawing units per metre (form diagram)
const SFD = 10;                       // kN per drawing unit (force diagram)
const SPAN = 6;                       // m, digitised from the sheet
const SYM = 4.2;                      // constant arrow symbol length, form side
const AX = -16, AY = 0.5;             // support A / the chord
const BX = AX + SPAN * MPU;
const MX = (AX + BX) / 2;
const LLX = 6, CY = 2;                // force diagram: load line and pole height
const NODE = [4, -9.2];               // the separate node-equilibrium sketch

const DEFAULTS = {
  Fd: 120,                            // kN, given by the sheet
  f: 2.5,                             // m — THE design choice
  o1: true, sIF: 0.011,
  lbl: true, _k: 99,
};

const STEPS = [
  { t: 'The exercise', d: 'UE 3 task 1a: one point load, two supports at the same height. Design a cable form for it and draw the matching force plan' },
  { t: 'What is given', d: 'left: the supports A and B six metres apart, and the vertical line of action of the load at midspan. That is everything the sheet gives you',
    detail: (d, st) => [`F_d = ${st.Fd} kN at midspan · span L = ${SPAN} m · Lageplan 1:100`] },
  { t: 'The load line', d: 'right: lay the load off to scale. With a single load the whole load line IS that load — 6 cm at the sheet’s 1 cm ≙ 20 kN',
    detail: (d, st) => [`the load line measures ${(st.Fd / SFD).toFixed(1)} units ≙ ${st.Fd} kN`] },
  { t: 'Now design: choose the sag', d: 'the one free decision. Fix how deep the cable hangs and its two straight segments are drawn — and in the force plan the two rays PARALLEL to them, from the ends of the load line, cross at the pole',
    detail: (d) => [`sag f = ${d.f.toFixed(2)} m → segments at ${d.ang.toFixed(1)}° to the horizontal`],
    take: 'form and force are locked together: the rays can only be parallel to the segments' },
  { t: 'The horizontal thrust', d: 'the pole’s distance from the load line is the horizontal thrust H, and it is the same in both segments — a cable cannot bend, so nothing can change H along it',
    detail: (d) => [`H = F·L / (4f) = ${d.H.toFixed(1)} kN`,
                    `the published solution measures 3.60 cm ≙ 72 kN — the same`] },
  { t: 'Global equilibrium', d: 'right: the triangle closes — the load down, then B up to the pole, then A back to the top — left: the two reactions pull the supports along the cable’s own directions, which is all a cable can do',
    detail: (d, st) => [`A = B = ${d.N.toFixed(1)} kN, each with ${(st.Fd / 2).toFixed(0)} kN vertical and ${d.H.toFixed(1)} kN horizontal`] },
  { t: 'Check the low point', d: 'the sheet also asks for the node: at I the two segment pulls and the load must close on their own. Drawn small below the force plan, it is the same triangle — a node and the whole structure are the same statement here',
    detail: (d, st) => [`ΣV: 2 × ${d.N.toFixed(1)} × sin ${d.ang.toFixed(1)}° = ${st.Fd} kN ✓`,
                        `ΣH: the two thrusts of ${d.H.toFixed(1)} kN cancel ✓`] },
  { t: 'What the shape costs', d: 'both segments carry the same force, because the shape is symmetric. Now drag the sag: halve it and the thrust doubles — a flat cable is an expensive cable',
    detail: (d) => [`N = √(H² + (F/2)²) = ${d.N.toFixed(1)} kN`,
                    `at f = 2.50 m the solution gives 93.7 kN; at f = 1.25 m it would be ${(Math.hypot(120 * 6 / (4 * 1.25), 60)).toFixed(1)} kN`],
    take: 'sag is not decoration — it is the only thing standing between the load and an enormous force' },
];

const DESIGNED = 3;                   // the step at which the shape exists

function compute(s) {
  const V0 = s.Fd / 2;
  const H = (s.Fd * SPAN) / (4 * s.f);
  const N = Math.hypot(H, V0);
  const ang = (Math.atan2(V0, H) * 180) / Math.PI;
  const A = [AX, AY], B = [BX, AY];
  const I = [MX, AY - s.f * MPU];
  const half = s.Fd / SFD / 2;
  const T = [LLX, CY + half], Bo = [LLX, CY - half];
  const o = [LLX + H / SFD, CY];
  return { f: s.f, H, N, V0, ang, A, B, I, T, Bo, o };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  // one band width for every view: the largest force comes out W.band
  // half-wide, so a force reads the same thickness whatever the frame
  s.sIF = dw.bandScale(compute(s).N);
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const CAB = { pending: PAL.black, final: (dd, st) => (st._k >= DESIGNED ? PAL.red : PAL.grey) };

  dw.label('form_title', 'Lageplan — form diagram', { cls: 'title', flash: false });
  dw.label('form_sub', '', { cls: 'point', flash: false });
  dw.label('force_title', 'Kräfteplan — force diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });

  for (const n of ['A', 'B']) {
    dw.disk(`sup${n}`, { intro: 1, r: dw.W.disk });
    dw.label(`lsup${n}`, n, { cls: 'num', intro: 1, when: (st) => st.lbl });
  }
  dw.dashLine('chord', { intro: 1, color: PAL.grey, dash: dw.W.dash });
  dw.dashLine('laMid', { intro: 1, color: PAL.grey, dash: dw.W.dash });
  dw.arrow('fForm', { intro: 1, color: PAL.green, ...ARR });
  dw.label('lfForm', 'F_d', { cls: 'num', intro: 1, color: PAL.green, when: (st) => st.lbl });
  dw.arrow('fForce', { intro: 2, color: PAL.green, ...ARR });
  dw.label('lfForce', 'F_d', { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.lbl });
  dw.link('fForm', 'fForce', 'lfForm', 'lfForce');
  dw.highlight('fForm', [2]);

  // the cable and its rays — introduced together, because they are the same fact
  for (let i = 0; i < 2; i++) {
    dw.poly(`if${i}`, 4, { intro: DESIGNED, opacity: 1.0, z: -0.18, flash: false,
      color: { pending: PAL.zeroBand, final: () => PAL.redBand }, when: (st) => st.o1 });
    dw.seg(`cab${i}`, { intro: DESIGNED, w: dw.W.bar, color: CAB });
    dw.seg(`ray${i}`, { intro: DESIGNED, w: dw.W.ray, color: CAB });
    dw.label(`lc${i}`, `${i + 1}`, { cls: 'num', intro: DESIGNED, color: PAL.red, when: (st) => st.lbl });
    dw.label(`lr${i}`, `${i + 1}`, { cls: 'num', intro: DESIGNED, color: PAL.red, when: (st) => st.lbl });
    dw.link(`cab${i}`, `ray${i}`, `lc${i}`, `lr${i}`);
  }
  dw.disk('ptO', { intro: DESIGNED, r: dw.W.disk * 0.8 });
  dw.label('lO', 'o', { cls: 'num', intro: DESIGNED, when: (st) => st.lbl });
  dw.disk('ptI', { intro: DESIGNED, r: dw.W.disk * 0.7 });
  dw.label('lI', 'I', { cls: 'point', intro: DESIGNED, when: (st) => st.lbl });
  dw.seg('dimF', { intro: DESIGNED, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lF', '', { intro: DESIGNED, flash: false, color: PAL.grey });

  dw.seg('dimH', { intro: 4, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lH', '', { intro: 4, flash: false, color: PAL.grey });

  for (const n of ['A', 'B']) {
    dw.arrow(`re${n}`, { intro: 5, color: PAL.green, ...NARR });
    dw.arrow(`fre${n}`, { intro: 5, color: PAL.green, ...NARR });
    dw.label(`lre${n}`, n, { cls: 'num', intro: 5, color: PAL.green, when: (st) => st.lbl });
    dw.link(`re${n}`, `fre${n}`, `lre${n}`);
  }

  // the node check, drawn as its own small sketch the way the sheet does it —
  // on top of the cable the three arrows would vanish under the pink band
  dw.dashedCircle('nodeI', { intro: 6, color: PAL.grey, dash: dw.W.dash });
  dw.disk('nodeC', { intro: 6, r: dw.W.disk * 0.7 });
  dw.label('lnode', 'node I', { cls: 'point', intro: 6, flash: false, color: PAL.grey });
  for (let i = 0; i < 3; i++) {
    dw.arrow(`nf${i}`, { intro: 6, color: i === 2 ? PAL.green : PAL.red, ...NARR });
    dw.label(`lnf${i}`, i === 2 ? 'F_d' : `${i + 1}`, { cls: 'num', intro: 6,
      color: i === 2 ? PAL.green : PAL.red, when: (st) => st.lbl });
  }
  dw.dashedCircle('markI', { intro: 6, color: PAL.grey, dash: dw.W.dash });

  dw.label('lgov', '', { cls: 'num', intro: 7, flash: false, color: PAL.red });

  dw.instant('form_title', 'form_sub', 'force_title', 'force_sub');
  dw.ghostable('fForce', 'ray0', 'ray1', 'freA', 'freB');

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
    dw.setLabel('lsupB', V.add(d.B, [1.4, 1.0]));
    dw.setDashLine('chord', [[AX - 2.2, AY], [BX + 2.2, AY]]);
    dw.setDashLine('laMid', [[MX, AY + 3.0], [MX, d.I[1] - 2.6]]);

    const ltip = [MX, d.I[1] + 0.2];
    dw.setArrow('fForm', [MX, ltip[1] + SYM], ltip);
    dw.setLabel('lfForm', [MX - 2.0, ltip[1] + SYM * 0.55]);
    dw.setArrow('fForce', d.T, d.Bo);
    dw.setLabel('lfForce', V.add(V.mid(d.T, d.Bo), [-2.0, 0]));

    dw.setDisk('ptI', d.I);
    dw.setLabel('lI', V.add(d.I, [-1.5, -1.2]));
    dw.setSeg('dimF', [MX + 1.0, AY], [MX + 1.0, d.I[1]]);
    dw.setLabel('lF', [MX + 3.2, (AY + d.I[1]) / 2]);
    dw.setText('lF', `f = ${d.f.toFixed(2)} m`);

    const ends = [d.A, d.B], rr = [d.T, d.Bo];
    for (let i = 0; i < 2; i++) {
      const p0 = i === 0 ? d.A : d.I, p1 = i === 0 ? d.I : d.B;
      dw.setSeg(`cab${i}`, p0, p1);
      dw.setPoly(`if${i}`, V.rectPoints(p0, p1, s.sIF * d.N));
      dw.setSeg(`ray${i}`, d.o, rr[i]);
      // labels clear of the force band, on the outside of each segment
      const nb = V.mul(V.unit(V.perp(V.sub(p1, p0))), (i === 0 ? 1 : -1) * (s.sIF * d.N + 1.5));
      dw.setLabel(`lc${i}`, V.add(V.mid(p0, p1), nb));
      dw.setLabel(`lr${i}`, V.add(V.mid(d.o, rr[i]), [0, i === 0 ? 1.1 : -1.1]));
    }
    dw.setDisk('ptO', d.o);
    dw.setLabel('lO', V.add(d.o, [1.5, 0.7]));

    dw.setSeg('dimH', [d.T[0], d.T[1] + 1.7], [d.o[0], d.T[1] + 1.7]);
    dw.setLabel('lH', [(d.T[0] + d.o[0]) / 2, d.T[1] + 2.8]);
    dw.setText('lH', `H = ${d.H.toFixed(1)} kN`);

    // reactions: along the cable at the supports (symbol length), and in the
    // force diagram the same two vectors — declutter() steps that chain aside
    const uA = V.unit(V.sub(d.A, d.I)), uB = V.unit(V.sub(d.B, d.I));
    dw.setArrow('reA', d.A, V.add(d.A, V.mul(uA, SYM)));
    dw.setArrow('reB', d.B, V.add(d.B, V.mul(uB, SYM)));
    dw.setLabel('lreA', V.add(V.add(d.A, V.mul(uA, SYM)), [-1.2, 0.9]));
    dw.setLabel('lreB', V.add(V.add(d.B, V.mul(uB, SYM)), [1.2, 0.9]));
    dw.setArrow('freA', d.o, d.T);
    dw.setArrow('freB', d.Bo, d.o);

    // the node sketch: the same three vectors, drawn small and on their own
    const R = 2.7;
    dw.setDashedCircle('nodeI', NODE, R);
    dw.setDisk('nodeC', NODE);
    dw.setLabel('lnode', V.add(NODE, [-R - 2.4, 0]));
    [uA, uB, [0, -1]].forEach((u, i) => {
      dw.setArrow(`nf${i}`, NODE, V.add(NODE, V.mul(u, R)));
      dw.setLabel(`lnf${i}`, V.add(NODE, V.mul(u, R + 1.1)));
    });
    dw.setDashedCircle('markI', d.I, s.sIF * d.N + 1.1);

    // outside the V, where nothing else is competing for the space
    const gb = V.mul(V.unit(V.perp(V.sub(d.I, d.A))), -(s.sIF * d.N + 2.4));
    dw.setLabel('lgov', V.add(V.mid(d.A, d.I), gb));
    dw.setText('lgov', `N = ${d.N.toFixed(1)} kN`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const par = panel.section('Given');
  panel.slider(par, s, 'Fd', 'F_d (kN)', 40, 160, 5, refresh);
  panel.toggle(par, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, s.sIF * 2.5, s.sIF / 20, refresh);
  panel.toggle(par, s, 'lbl', 'show labels', refresh);
  const des = panel.section('Your design');
  panel.slider(des, s, 'f', 'sag f (m)', 1.5, 4, 0.05, refresh);

  refresh();
  return player;
}
