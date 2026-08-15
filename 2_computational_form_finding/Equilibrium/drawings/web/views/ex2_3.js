/**
 * EX 2 · Creative — A new suspension bridge
 * Structural Design I, HS 22 (sheet EX 2 "Dimensioning and Graphic Statics",
 * page 3).
 *
 * "The given pedestrian bridge from task 2 is supported on fractured rocks and
 * needs fixing.
 *   a) Chose two new fixing points A and B for the cable. First find the
 *      resultant and then determine the direction of the reaction forces with
 *      help of the global equilibrium. Starting from the supports, solve node
 *      per node with help of the corresponding force diagram. Indicate tension
 *      forces with red, compression forces with blue and external forces with
 *      green.
 *   b) Make a suggestion of a material and its diameter for the cables of your
 *      bridge. Calculate the values for the relevant member."
 *
 * The bridge is task 2's, digitised from the sheet: two hangers carrying
 * F₁d = F₂d = 40 kN up to the cable at x = 15.41 and 24.54 m from task 2's
 * left anchor, with the deck between. What the Creative task changes is that
 * the ANCHORS are no longer given — both are draggable here, and so is the
 * horizontal thrust, which is the remaining freedom once they are placed.
 *
 * With the anchors and the thrust chosen, the cable is fully determined: its
 * first slope is whatever makes the last segment land exactly on B, and the
 * three segment forces follow. The sheet asks for it node by node, so the view
 * solves it that way — anchor, first node, second node, anchor — and the force
 * diagram grows one ray at a time.
 *
 * Task 2's own answer is the sanity check: put the anchors back where task 2
 * had them (the "task 2 anchors" button) and the view reproduces H = 52.8 kN
 * and N_d,max = 74.7 kN, the numbers that view already verifies.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'EX 2 Creative — re-anchoring a suspension bridge',
  subtitle: 'Structural Design I · sheet EX 2 “Dimensioning and Graphic Statics”, Creative task',
  about: 'The rock the bridge was anchored into has fractured, so both anchors have to move — and once you are choosing where they go, you are choosing the whole structure. Drag A and B anywhere and drag the thrust, and the cable redraws itself through the two hangers. Then the biggest segment force decides the cable you have to buy. The default puts the anchors back where task 2 had them, so you can see the view reproduce that answer before you start moving things.',
  result: (d) => [`H = ${d.H.toFixed(1)} kN · segment forces ${d.N.map((n) => n.toFixed(1)).join(' · ')} kN, all tension`,
                  `A = ${d.NA.toFixed(1)} kN, B = ${d.NB.toFixed(1)} kN — both pulling along the cable into the rock`,
                  `b) ${d.gradeName}: A_req = ${d.Areq.toFixed(0)} mm² → Ø ${Math.ceil(d.dreq)} mm (governing force ${d.Nmax.toFixed(1)} kN)`],
  frame: [[-24, -31], [24, 26]],
};

const SFD = 5;                          // kN per drawing unit
const U = 0.12;                         // drawing units per PDF point
const O = [-19, 4];
const pt = (x, y) => [O[0] + (x - 324.9) * U, O[1] - (y - 338.8) * U];
const A0 = pt(324.9, 338.8);            // task 2's left anchor
const B0 = pt(644.4, 426.1);            // task 2's right anchor
const N1X = pt(453.3, 467.0)[0];        // the two hangers
const N2X = pt(529.4, 485.3)[0];
const DECK_Y = pt(0, 522.5)[1];
const DECK = [pt(377.1, 0)[0], pt(605.6, 0)[0]];
const H_TASK2 = 52.84;                  // the thrust task 2's own shape gives
const LL = [8, -4];
const STEEL = { S235: 235, S355: 355 }, GM = 1.05;

const DEFAULTS = {
  F: 40,                                // kN per hanger, from task 2
  ax: A0[0], ay: A0[1],                 // the anchors — your choice
  bx: B0[0], by: B0[1],
  H: H_TASK2,                           // the remaining freedom
  s355: false,
  o1: true, sIF: 0.012, lbl: true, _k: 99,
};

const SOLVED = 5;

const STEPS = [
  { t: 'The exercise', d: 'the Creative task: the rock has fractured, so both anchors have to be moved. Choose where they go, then solve the cable node by node' },
  { t: 'What survives from task 2', d: 'left: the deck and its two hangers, still carrying 40 kN each into the cable at the same two places. Everything above them is now yours to place',
    detail: (d, st) => [`F₁d = F₂d = ${st.F} kN · hangers at ${((N1X - A0[0]) / U * 0.0352778).toFixed(2)} and ${((N2X - A0[0]) / U * 0.0352778).toFixed(2)} m from task 2's left anchor`] },
  { t: 'The resultant first', d: 'the sheet asks for the resultant before anything else, and with two equal vertical loads it is easy: 80 kN straight down, midway between the hangers',
    detail: (d, st) => [`R = ${(2 * st.F).toFixed(0)} kN vertical, on the line halfway between the two hangers`] },
  { t: 'Place the anchors', d: 'drag A and B in the drawing, or use the sliders. They do not have to be level and they do not have to be anywhere near where they were — the cable will find its way through both',
    detail: (d) => [`A at (${d.A[0].toFixed(1)}, ${d.A[1].toFixed(1)}) · B at (${d.B[0].toFixed(1)}, ${d.B[1].toFixed(1)}) in drawing units`,
                    `they are ${(Math.abs(d.B[1] - d.A[1]) / U * 0.0352778).toFixed(2)} m apart vertically`] },
  { t: 'Choose the thrust', d: 'that is the last freedom. Pick the horizontal thrust and the pole is fixed; the cable then has exactly one shape that passes through both anchors',
    detail: (d, st) => [`H = ${st.H.toFixed(1)} kN → the pole sits ${(st.H / SFD).toFixed(2)} units from the load line`,
                        `a bigger thrust flattens the cable and makes every force larger`] },
  { t: 'Node by node', d: 'this is what the sheet asks for. Start at A, where only two forces meet, and close each node in turn: anchor, hanger 1, hanger 2, anchor. Every segment is a ray from the pole',
    detail: (d) => [`segment 1: ${d.N[0].toFixed(1)} · segment 2: ${d.N[1].toFixed(1)} · segment 3: ${d.N[2].toFixed(1)} kN`,
                    `the last segment lands on B, which is the check that the thrust was consistent`],
    take: 'solving node by node is the same construction as one global funicular — it just shows its working' },
  { t: 'The anchors pull back', d: 'left: green at A and B, each along the cable’s own end direction. A cable can only pull, so an anchor is always loaded along the cable — which is exactly why fractured rock is a problem',
    detail: (d) => [`A = ${d.NA.toFixed(1)} kN at ${d.angA.toFixed(1)}° · B = ${d.NB.toFixed(1)} kN at ${d.angB.toFixed(1)}° from the horizontal`] },
  { t: 'b) Choosing the cable', d: 'the steepest segment governs, as always. Divide it by the design strength and you have the area you need; the diameter follows — and is rounded UP, because rounding down would leave you short',
    detail: (d) => [`f_td = f_tk/γ_M = ${d.grade}/${GM} = ${d.ftd.toFixed(1)} N/mm²`,
                    `A_req = ${(d.Nmax * 1000).toFixed(0)}/${d.ftd.toFixed(1)} = ${d.Areq.toFixed(0)} mm² → D = ${d.dreq.toFixed(1)} mm → Ø ${Math.ceil(d.dreq)} mm`,
                    `in ${d.gradeName}; switching grade changes the answer, which is the point of "suggest a material"`],
    take: 'where you anchor a cable decides how big it has to be — the design and the dimensioning are one decision' },
];

function compute(s) {
  const A = [s.ax, s.ay], B = [s.bx, s.by];
  const F = s.F;
  const H = Math.max(s.H, 1);
  const spans = [N1X - A[0], N2X - N1X, B[0] - N2X];
  // the cable must pass through B: that fixes the first slope
  // yB - yA = s0*L1 + (s0 + F/H)*L2 + (s0 + 2F/H)*L3
  const tot = spans[0] + spans[1] + spans[2];
  const extra = (F / H) * spans[1] + (2 * F / H) * spans[2];
  const s0 = ((B[1] - A[1]) - extra) / tot;
  const sl = [s0, s0 + F / H, s0 + 2 * F / H];
  const n1 = [N1X, A[1] + sl[0] * spans[0]];
  const n2 = [N2X, n1[1] + sl[1] * spans[1]];
  const pts = [A, n1, n2, B];
  const N = sl.map((m) => H * Math.hypot(1, m));
  const Nmax = Math.max(...N);
  const NA = N[0], NB = N[2];
  const angA = (Math.atan2(Math.abs(sl[0]), 1) * 180) / Math.PI;
  const angB = (Math.atan2(Math.abs(sl[2]), 1) * 180) / Math.PI;
  const xR = (N1X + N2X) / 2;
  // force diagram: the two hanger loads laid off, pole at H from the line
  const T = LL.slice();
  const M = [LL[0], LL[1] - F / SFD];
  const Bt = [LL[0], LL[1] - 2 * F / SFD];
  const o = [LL[0] + H / SFD, LL[1] + s0 * (H / SFD)];
  const grade = s.s355 ? STEEL.S355 : STEEL.S235;
  const gradeName = s.s355 ? 'S355' : 'S235';
  const ftd = grade / GM;
  const Areq = (Nmax * 1000) / ftd;
  const dreq = Math.sqrt((4 * Areq) / Math.PI);
  return { A, B, s0, sl, pts, n1, n2, H, N, Nmax, NA, NB, angA, angB, xR,
           T, M, Bt, o, grade, gradeName, ftd, Areq, dreq };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  s.sIF = dw.bandScale(compute(s).Nmax);
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const CAB = { pending: PAL.black, final: (dd, st) => (st._k >= SOLVED ? PAL.red : PAL.grey) };

  dw.label('form_title', 'Form diagram 1:500', { cls: 'title', flash: false });
  dw.label('force_title', 'Force diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });

  dw.seg('deck', { intro: 1, w: dw.W.bar, color: PAL.grey });
  dw.strokes('deckHatch', 2, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  for (let i = 0; i < 2; i++) {
    dw.seg(`hang${i}`, { intro: 1, w: dw.W.thin, color: CAB });
    dw.dashLine(`la${i}`, { intro: 1, color: PAL.grey, dash: dw.W.dash });
    dw.arrow(`f${i}`, { intro: 1, color: PAL.green, ...ARR });
    dw.label(`lf${i}`, `F${'₁₂'[i]}d`, { cls: 'num', intro: 1, color: PAL.green, when: (st) => st.lbl });
    dw.arrow(`ff${i}`, { intro: 2, color: PAL.green, ...ARR });
    dw.label(`lff${i}`, `F${'₁₂'[i]}d`, { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.lbl });
    dw.link(`f${i}`, `ff${i}`, `lf${i}`, `lff${i}`);
    dw.highlight(`f${i}`, [2]);
  }
  dw.dashLine('Rline', { intro: 2, color: PAL.grey, dash: dw.W.dash });
  dw.dashArrow('Rform', { intro: 2, color: PAL.green, w: dw.W.arrow.w * 1.15,
    headLen: dw.W.arrow.headLen, headW: dw.W.arrow.headW, dash: dw.W.dash * 1.6, flash: false });
  dw.dashArrow('Rforce', { intro: 2, color: PAL.green, w: dw.W.arrow.w * 1.15,
    headLen: dw.W.arrow.headLen, headW: dw.W.arrow.headW, dash: dw.W.dash * 1.6, flash: false });
  dw.label('lRform', 'R', { cls: 'num', intro: 2, color: PAL.green });
  dw.label('lRforce', 'R', { cls: 'num', intro: 2, color: PAL.green });
  dw.link('Rform', 'Rforce', 'lRform', 'lRforce');

  for (const n of ['A', 'B']) {
    dw.disk(`an${n}`, { intro: 3, r: dw.W.disk });
    dw.label(`lan${n}`, n, { cls: 'num', intro: 3, when: (st) => st.lbl });
    dw.strokes(`rock${n}`, 5, { intro: 3, w: dw.W.dim, color: PAL.grey, flash: false });
  }
  dw.disk('ptO', { intro: 4, r: dw.W.disk * 0.8 });
  dw.label('lO', 'o', { cls: 'num', intro: 4, when: (st) => st.lbl });
  dw.seg('dimH', { intro: 4, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lH', '', { intro: 4, flash: false, color: PAL.grey });

  // the three cable segments, each introduced at its own node step
  for (let i = 0; i < 3; i++) {
    dw.poly(`bd${i}`, 4, { intro: SOLVED, opacity: 1.0, z: -0.18, flash: false,
      color: { pending: PAL.zeroBand, final: () => PAL.redBand }, when: (st) => st.o1 });
    dw.seg(`cab${i}`, { intro: SOLVED, w: dw.W.bar, color: CAB });
    dw.seg(`ray${i}`, { intro: SOLVED, w: dw.W.ray, color: CAB });
    dw.label(`ln${i}`, '', { cls: 'point', intro: SOLVED, flash: false, color: PAL.red });
    dw.link(`cab${i}`, `ray${i}`, `ln${i}`);
  }
  for (const n of ['A', 'B']) {
    dw.arrow(`re${n}`, { intro: 6, color: PAL.green, ...NARR });
    dw.arrow(`fre${n}`, { intro: 6, color: PAL.green, ...NARR });
    dw.label(`lre${n}`, '', { cls: 'num', intro: 6, color: PAL.green });
    dw.link(`re${n}`, `fre${n}`, `lre${n}`);
  }
  dw.seg('gov', { intro: 7, w: dw.W.bar * 2.0, color: PAL.red, flash: false });
  dw.label('lgov', '', { cls: 'num', intro: 7, flash: false, color: PAL.red });
  dw.circle('sect', { intro: 7, color: PAL.red, flash: false });
  dw.label('lsect', '', { cls: 'num', intro: 7, flash: false, color: PAL.red });

  dw.instant('form_title', 'force_title', 'force_sub');
  dw.ghostable('ff0', 'ff1', 'Rforce', 'ray0', 'ray1', 'ray2', 'freA', 'freB');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    dw.setLabel('form_title', [4, -26.5]);
    dw.setLabel('force_title', [4, 22.0]);
    dw.setLabel('force_sub', [4, 20.6]);
    dw.setText('force_sub', `1 unit ≙ ${SFD} kN  (sheet: 1 cm ≙ 10 kN)`);

    dw.setSeg('deck', [DECK[0], DECK_Y], [DECK[1], DECK_Y]);
    dw.setStrokes('deckHatch', [[[DECK[0], DECK_Y - 0.5], [DECK[0], DECK_Y + 0.5]],
                                [[DECK[1], DECK_Y - 0.5], [DECK[1], DECK_Y + 0.5]]]);
    const nx = [N1X, N2X], nodes = [d.n1, d.n2];
    for (let i = 0; i < 2; i++) {
      dw.setSeg(`hang${i}`, [nx[i], DECK_Y], nodes[i]);
      dw.setDashLine(`la${i}`, [[nx[i], nodes[i][1] + 6.5], [nx[i], DECK_Y - 3.5]]);
      dw.setArrow(`f${i}`, [nx[i], DECK_Y], [nx[i], DECK_Y - 3.4]);
      dw.setLabel(`lf${i}`, [nx[i] + 2.4, DECK_Y - 1.9]);
      dw.setArrow(`ff${i}`, i === 0 ? d.T : d.M, i === 0 ? d.M : d.Bt);
      dw.setLabel(`lff${i}`, V.add(V.mid(i === 0 ? d.T : d.M, i === 0 ? d.M : d.Bt), [-2.4, 0]));
    }
    dw.setDashLine('Rline', [[d.xR, 14], [d.xR, DECK_Y - 6]]);
    dw.setDashArrow('Rform', [d.xR, DECK_Y - 1.2], [d.xR, DECK_Y - 6.0]);
    dw.setLabel('lRform', [d.xR + 2.6, DECK_Y - 3.6]);
    dw.setDashArrow('Rforce', d.T, d.Bt);
    dw.setLabel('lRforce', V.add(V.mid(d.T, d.Bt), [2.4, 0]));

    for (const [n, p] of [['A', d.A], ['B', d.B]]) {
      dw.setDisk(`an${n}`, p);
      dw.setLabel(`lan${n}`, V.add(p, [n === 'A' ? -1.8 : 1.8, 1.0]));
      dw.setStrokes(`rock${n}`, V.hatch([p[0] + 1.8, p[1] + 0.55],
        [p[0] - 1.8, p[1] + 0.55], -1, 0.95, 5));
    }
    dw.setDisk('ptO', d.o);
    dw.setLabel('lO', V.add(d.o, [1.4, 0.7]));
    dw.setSeg('dimH', [d.T[0], d.T[1] + 1.8], [d.o[0], d.T[1] + 1.8]);
    dw.setLabel('lH', [(d.T[0] + d.o[0]) / 2, d.T[1] + 2.9]);
    dw.setText('lH', `H = ${d.H.toFixed(1)} kN`);

    const div = [d.T, d.M, d.Bt];
    for (let i = 0; i < 3; i++) {
      dw.setSeg(`cab${i}`, d.pts[i], d.pts[i + 1]);
      dw.setPoly(`bd${i}`, V.rectPoints(d.pts[i], d.pts[i + 1], s.sIF * d.N[i]));
      dw.setSeg(`ray${i}`, d.o, div[i]);
      const nb = V.mul(V.unit(V.perp(V.sub(d.pts[i + 1], d.pts[i]))), s.sIF * d.N[i] + 1.6);
      dw.setLabel(`ln${i}`, V.add(V.mid(d.pts[i], d.pts[i + 1]), nb));
      dw.setText(`ln${i}`, `${d.N[i].toFixed(1)}`);
    }
    const uA = V.unit(V.sub(d.A, d.n1)), uB = V.unit(V.sub(d.B, d.n2));
    const LEN = 4.2;
    dw.setArrow('reA', d.A, V.add(d.A, V.mul(uA, LEN)));
    dw.setArrow('reB', d.B, V.add(d.B, V.mul(uB, LEN)));
    dw.setLabel('lreA', V.add(V.add(d.A, V.mul(uA, LEN)), [-2.6, 0.8]));
    dw.setLabel('lreB', V.add(V.add(d.B, V.mul(uB, LEN)), [2.6, 0.8]));
    dw.setText('lreA', `A = ${d.NA.toFixed(1)}`);
    dw.setText('lreB', `B = ${d.NB.toFixed(1)}`);
    dw.setArrow('freA', d.o, d.T);
    dw.setArrow('freB', d.Bt, d.o);

    const gi = d.N.indexOf(d.Nmax);
    dw.setSeg('gov', d.pts[gi], d.pts[gi + 1]);
    const gn = V.mul(V.unit(V.perp(V.sub(d.pts[gi + 1], d.pts[gi]))), -(s.sIF * d.Nmax + 3.0));
    dw.setLabel('lgov', V.add(V.mid(d.pts[gi], d.pts[gi + 1]), gn));
    dw.setText('lgov', `governing ${d.Nmax.toFixed(1)} kN`);
    // the cable section, drawn at 1:500 like the rest of the form diagram
    const sc = [DECK[1] + 5.0, DECK_Y - 4.0];
    dw.setCircle('sect', sc, Math.max((d.dreq / 1000) * (U / 0.0352778) * 0.12, 0.16));
    dw.setLabel('lsect', V.add(sc, [4.4, 0]));
    dw.setText('lsect', `Ø ${Math.ceil(d.dreq)} mm ${d.gradeName}`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  dw.enableDrag((x, y, tol) => {
    if (Math.hypot(x - s.ax, y - s.ay) < tol * 2) return 'a';
    if (Math.hypot(x - s.bx, y - s.by) < tol * 2) return 'b';
    if (Math.hypot(x - d.o[0], y - d.o[1]) < tol * 2) return 'o';
    return null;
  }, (h, x, y) => {
    if (h === 'a') { s.ax = Math.min(x, N1X - 3); s.ay = y; }
    else if (h === 'b') { s.bx = Math.max(x, N2X + 3); s.by = y; }
    else { s.H = Math.max(10, (x - LL[0]) * SFD); }
    refresh();
  });

  const des = panel.section('a) Your anchors');
  panel.slider(des, s, 'ax', 'A across', -24, N1X - 3, 0.2, refresh);
  panel.slider(des, s, 'ay', 'A up', -6, 20, 0.2, refresh);
  panel.slider(des, s, 'bx', 'B across', N2X + 3, 24, 0.2, refresh);
  panel.slider(des, s, 'by', 'B up', -6, 20, 0.2, refresh);
  panel.slider(des, s, 'H', 'horizontal thrust H (kN)', 20, 160, 0.5, refresh);
  panel.button(des, 'task 2’s anchors', () => {
    s.ax = A0[0]; s.ay = A0[1]; s.bx = B0[0]; s.by = B0[1]; s.H = H_TASK2;
    refresh();
  });
  const dim = panel.section('b) Your cable');
  panel.toggle(dim, s, 's355', 'S355 instead of S235', refresh);
  const giv = panel.section('Given');
  panel.slider(giv, s, 'F', 'each hanger load (kN)', 10, 80, 5, refresh);
  panel.toggle(giv, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
  panel.slider(giv, s, 'sIF', 'scale internal forces', 0, s.sIF * 2.5, s.sIF / 20, refresh);
  panel.toggle(giv, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}
