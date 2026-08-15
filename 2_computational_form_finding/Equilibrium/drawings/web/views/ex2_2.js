/**
 * EX 2 · Task 2 — Dimensioning of a suspension bridge
 * Structural Design I, HS 22 (sheet EX 2 "Dimensioning and Graphic Statics").
 *
 * A NON-STANDARD sheet: part a) is graphic statics, parts b) and c) are
 * dimensioning with the compendium's formulary, so this view carries the
 * calculation as well as the construction.
 *   a) force diagram of the given cable bridge, F₁d = F₂d = 40 kN, find N_d,max
 *   b) required cable diameter in steel S235
 *   c) is a Ø18 mm S355 cable still safe? (axial force proof)
 *
 * Geometry digitised from the sheet's vector artwork (pdftocairo -svg):
 * anchors (324.9, 338.8) and (644.4, 426.1) pt, cable nodes (453.3, 467.0)
 * and (529.4, 485.3), deck at y = 522.5 between x = 377.1 and 605.6, with
 * vertical hangers at the two node x's. Carried over at 0.12 units/pt.
 *
 * The drawn geometry IS a valid funicular for two equal loads: the slope
 * break is 0.758 at the first node and 0.755 at the second (0.4 % apart —
 * drafting tolerance). Taking the first segment as drawn, the horizontal
 * thrust closes the polygon exactly on the right anchor: H = 52.8 kN.
 * Segment forces 74.7 / 54.4 / 59.5 kN, so N_d,max = 74.7 kN in the steep
 * segment at the left anchor.
 * b) f_td = 235/1.05 = 223.8 → A_req = 333.6 mm² → Ø 20.6 mm.
 * c) Ø18 S355: A = 254.5 mm², f_td = 338.1 → N_allow = 86.0 kN > 74.7 kN,
 *    so YES, the proof is satisfied at 87 % utilisation.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'EX 2.2 — Dimensioning of a suspension bridge',
  subtitle: 'Structural Design I · sheet EX 2 “Dimensioning and Graphic Statics”, task 2',
  about: 'A cable bridge with its geometry given: two hangers carry the deck loads up to a cable slung between two anchors. Because the shape is given, the force diagram is fully determined — the rays parallel to the three cable segments meet in one pole, and the steepest segment carries the largest force. That force is then dimensioned: the required diameter in S235, and the axial force proof for a Ø18 mm S355 cable.',
  result: (d, st) => [`a) N_d,max = ${d.Nmax.toFixed(1)} kN in the steep segment (H = ${d.H.toFixed(1)} kN)`,
                      `b) S235: A_req = ${d.Areq.toFixed(0)} mm² → Ø ${d.dreq.toFixed(1)} mm`,
                      `c) Ø${st.d1} S355: N_allow = ${d.Nallow.toFixed(1)} kN ${d.safe ? '≥' : '<'} ${d.Nmax.toFixed(1)} kN → ${d.safe ? 'SAFE' : 'NOT SAFE'} (${(d.util * 100).toFixed(0)} %)`],
  frame: [[-25, -27], [47, 15]],
};

const RESOLVE = 8;
const SFD = 5;                          // kN per drawing unit
const U = 0.12;                         // drawing units per PDF point
const O = [-19, 4];                     // where the left anchor sits

// digitised points (PDF pt) -> drawing units, y up, left anchor at O
const pt = (x, y) => [O[0] + (x - 324.9) * U, O[1] - (y - 338.8) * U];
const A = pt(324.9, 338.8);             // left anchor
const B = pt(644.4, 426.1);             // right anchor
const N1X = pt(453.3, 467.0)[0];        // hanger 1
const N2X = pt(529.4, 485.3)[0];        // hanger 2
const DECK_Y = pt(0, 522.5)[1];
const DECK = [pt(377.1, 0)[0], pt(605.6, 0)[0]];
const SAG1 = pt(453.3, 467.0)[1];       // the drawn depth of the first node

const LL = [30, 1];                     // top of the load line
const STEEL = { S235: 235, S355: 355 }, GM = 1.05;

const SOLVED = 5;        // the step at which the cable forces are known

const DEFAULTS = { F: 40, d1: 18, grade: 1, o1: true, sIF: 0.012, lbl: true, _k: 99 };

const STEPS = [
  { t: 'The exercise', d: 'EX 2 task 2: a cable bridge whose shape is GIVEN — find the biggest cable force, then dimension the cable for it' },
  { t: 'The bridge', d: 'left: two anchors, a cable in three segments, two hangers down to the deck — every length is given, so nothing about the shape is ours to choose',
    detail: (d) => [`span ${(B[0] - A[0]).toFixed(1)} units · the left anchor sits ${(A[1] - B[1]).toFixed(1)} higher than the right`] },
  { t: 'The loads', d: 'left: F₁d and F₂d hang from the deck and travel up the hangers into the cable nodes — right: the same two forces laid off tip to tail, the load line',
    detail: (d, st) => [`F₁d = F₂d = ${st.F} kN — ΣF = ${2 * st.F} kN`] },
  { t: 'The shape fixes the pole', d: 'right: draw a ray parallel to the FIRST cable segment through the top of the load line, and one parallel to the LAST segment through its bottom — they cross at the pole o. Its distance from the load line is the horizontal thrust H',
    detail: (d) => [`H = ${d.H.toFixed(1)} kN — the same in every segment of the cable`],
    take: 'the geometry is given, so the pole is not a choice: the cable itself tells you where it is' },
  { t: 'The middle ray', d: 'right: the third ray, from o to the division between the loads — left: it is parallel to the middle cable segment. Equal loads bend the cable by equal amounts, so the two slope breaks come out the same',
    detail: (d) => [`slope break at each node: P/H = ${d.brk1.toFixed(3)}`,
                    `the sheet's own drawn cable breaks by 0.758 and 0.755 — 0.4 % apart, which is draughtsman's tolerance, not physics`] },
  { t: 'The three cable forces', d: 'left: each segment flashes — right: its force is the ray from the pole, all three in tension',
    detail: (d) => [`segment 1 (steep, at the left anchor): ${d.N[0].toFixed(1)} kN`,
                    `segment 2 (flat, mid-span): ${d.N[1].toFixed(1)} kN · segment 3: ${d.N[2].toFixed(1)} kN`] },
  { t: 'a) The relevant force', d: 'the STEEPEST segment carries the most: it has the same horizontal thrust as the others but the largest vertical part. That segment governs the whole cable',
    detail: (d) => [`N_d,max = ${d.Nmax.toFixed(1)} kN, in the segment from the left anchor`],
    take: 'in a cable of given shape, every segment shares H — so the steepest one is always the critical one' },
  { t: 'b) The required diameter', d: 'with the relevant force known, the formulary does the rest: A_req = N_d / f_td and f_td = f_tk / γ_M',
    detail: (d) => [`S235: f_td = 235 / 1.05 = ${(235 / GM).toFixed(1)} N/mm²`,
                    `A_req = ${(d.Nmax * 1000).toFixed(0)} / ${(235 / GM).toFixed(1)} = ${d.Areq.toFixed(0)} mm² → Ø ${d.dreq.toFixed(1)} mm`] },
  { t: 'c) The proof for Ø18 in S355', d: 'the axial force proof asks one question: is the force the cable must carry smaller than the force it can carry?',
    detail: (d, st) => [`Ø${st.d1} mm → A = ${d.Aef.toFixed(0)} mm² · S355: f_td = ${(355 / GM).toFixed(1)} N/mm²`,
                        `N_allow = ${d.Nallow.toFixed(1)} kN ${d.safe ? '≥' : '<'} N_d = ${d.Nmax.toFixed(1)} kN → ${d.safe ? 'SAFE' : 'NOT SAFE'} (${(d.util * 100).toFixed(0)} % utilised)`],
    take: 'the graphic construction and the code check are one continuous piece of work — the drawing hands the number straight to the formula' },
];

function compute(s) {
  // the funicular: first segment as drawn, then the thrust that lands on B
  const s0 = (SAG1 - A[1]) / (N1X - A[0]);
  const span1 = N1X - A[0], span2 = N2X - N1X, span3 = B[0] - N2X;
  // yB = s0*span1 + (s0+P/H)*span2 + (s0+2P/H)*span3
  const need = (B[1] - A[1]) - s0 * (span1 + span2 + span3);
  const PoverH = need / (span2 + 2 * span3);
  const H = s0 === 0 ? 0 : s.F / PoverH;
  const sl = [s0, s0 + PoverH, s0 + 2 * PoverH];
  const n1 = [N1X, A[1] + sl[0] * span1];
  const n2 = [N2X, n1[1] + sl[1] * span2];
  const N = sl.map((m) => H * Math.hypot(1, m));
  const Nmax = Math.max(...N);
  // the force diagram: load line + pole from the first and last ray
  const T = LL.slice();
  const M = [LL[0], LL[1] - s.F / SFD];
  const Bt = [LL[0], LL[1] - 2 * s.F / SFD];
  const o = V.intersect(T, [1, sl[0]], Bt, [1, sl[2]]) || [LL[0] + 10, LL[1]];
  // dimensioning
  const ftd235 = STEEL.S235 / GM, ftd355 = STEEL.S355 / GM;
  const Areq = Nmax * 1000 / ftd235;
  const dreq = Math.sqrt(4 * Areq / Math.PI);
  const Aef = Math.PI * s.d1 * s.d1 / 4;
  const Nallow = Aef * ftd355 / 1000;
  return { s0, sl, n1, n2, H, N, Nmax, T, M, Bt, o,
           brk1: sl[1] - sl[0], brk2: sl[2] - sl[1],
           Areq, dreq, Aef, Nallow, safe: Nallow >= Nmax, util: Nmax / Nallow };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  // grey until the step that actually solves the cable, then tension pink
  const CAB = (i) => ({ pending: PAL.black,
    final: (dd, st) => (st._k >= SOLVED ? PAL.red : PAL.grey) });

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });

  // deck, anchors, cable, hangers
  dw.seg('deck', { intro: 1, w: dw.W.bar, color: PAL.grey });
  dw.strokes('deckHatch', 2, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  for (const n of ['A', 'B']) {
    dw.disk(`an${n}`, { intro: 1, r: dw.W.disk });
    dw.label(`lan${n}`, n, { cls: 'num', intro: 1, when: (st) => st.lbl });
    dw.dashLine(`tow${n}`, { intro: 1, color: PAL.grey, dash: dw.W.dash });
  }
  for (let i = 0; i < 3; i++) {
    dw.poly(`if${i}`, 4, { intro: 5, opacity: 1.0, z: -0.18, flash: false,
      color: { pending: PAL.grey, final: (dd, st) => CAB(i).final(dd, st) }, when: (st) => st.o1 });
    dw.seg(`cab${i}`, { intro: 1, w: dw.W.bar, color: CAB(i) });
    dw.seg(`ray${i}`, { intro: i === 1 ? 4 : 3, w: dw.W.ray, color: PAL.grey });
    dw.seg(`fc${i}`, { intro: 5, w: dw.W.bar, color: CAB(i) });
    dw.label(`lfc${i}`, '', { intro: 5, flash: false, color: PAL.red });
    dw.link(`cab${i}`, `fc${i}`, `ray${i}`, `lfc${i}`);
    dw.highlight(`cab${i}`, [5]);
  }
  for (let i = 0; i < 2; i++) {
    dw.seg(`hang${i}`, { intro: 1, w: dw.W.thin, color: { pending: PAL.black, final: () => PAL.red } });
    dw.disk(`nd${i}`, { intro: 1, r: dw.W.disk * 0.8 });
    dw.arrow(`f${i}`, { intro: 2, color: PAL.green, ...ARR });
    dw.label(`lf${i}`, `F${'₂₁'[i]}d`, { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.lbl });
    dw.arrow(`ff${i}`, { intro: 2, color: PAL.green, ...ARR });
    dw.label(`lff${i}`, `F${'₂₁'[i]}d`, { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.lbl });
    dw.link(`f${i}`, `ff${i}`, `lf${i}`, `lff${i}`);
  }
  dw.disk('ptO', { intro: 3, r: dw.W.disk * 0.8 });
  dw.label('lO', 'o', { cls: 'num', intro: 3, when: (st) => st.lbl });
  dw.seg('dimH', { intro: 3, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lH', '', { intro: 3, flash: false, color: PAL.grey });
  // the governing segment, called out
  dw.seg('gov', { intro: 6, w: dw.W.bar * 2.1, color: PAL.red, flash: false });
  dw.label('lgov', '', { cls: 'num', intro: 6, flash: false, color: PAL.red });

  dw.instant('form_title', 'force_title', 'force_sub', 'deck', 'deckHatch');
  dw.ghostable('ff0', 'ff1', 'fc0', 'fc1', 'fc2');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    dw.setLabel('form_title', [-8, -20.5]);
    dw.setLabel('force_title', [24, -20.5]);
    dw.setLabel('force_sub', [24, -22.1]);
    dw.setText('force_sub', `1 unit :: ${SFD} kN`);

    dw.setSeg('deck', [DECK[0], DECK_Y], [DECK[1], DECK_Y]);
    dw.setStrokes('deckHatch', [[[DECK[0], DECK_Y], [DECK[0], DECK_Y - 1.1]],
                                [[DECK[1], DECK_Y], [DECK[1], DECK_Y - 1.1]]]);
    const nodes = [d.n1, d.n2];
    const pts = [A, d.n1, d.n2, B];
    for (let i = 0; i < 3; i++) {
      dw.setSeg(`cab${i}`, pts[i], pts[i + 1]);
      dw.setPoly(`if${i}`, V.rectPoints(pts[i], pts[i + 1], s.sIF * d.N[i]));
    }
    dw.setDisk('anA', A); dw.setDisk('anB', B);
    dw.setLabel('lanA', V.add(A, [-1.7, 0.9]));
    dw.setLabel('lanB', V.add(B, [1.7, 0.9]));
    dw.setDashLine('towA', [V.add(A, [0, 5]), V.add(A, [0, -2])]);
    dw.setDashLine('towB', [V.add(B, [0, 5]), V.add(B, [0, -2])]);

    nodes.forEach((n, i) => {
      dw.setDisk(`nd${i}`, n);
      dw.setSeg(`hang${i}`, n, [n[0], DECK_Y]);
      const tip = [n[0], DECK_Y - s.F / SFD * 0.7];
      dw.setArrow(`f${i}`, [n[0], DECK_Y], tip);
      dw.setLabel(`lf${i}`, [n[0] + 1.9, (DECK_Y + tip[1]) / 2]);
    });
    dw.setArrow('ff0', d.T, d.M);
    dw.setArrow('ff1', d.M, d.Bt);
    dw.setLabel('lff0', V.add(V.mid(d.T, d.M), [-2.2, 0]));
    dw.setLabel('lff1', V.add(V.mid(d.M, d.Bt), [-2.2, 0]));

    const div = [d.T, d.M, d.Bt];
    for (let i = 0; i < 3; i++) {
      dw.setSeg(`ray${i}`, d.o, div[i]);
      dw.setSeg(`fc${i}`, div[i], d.o);
      // step each label clear of its own ray, not toward its neighbour
      const nrm = V.mul(V.unit(V.perp(V.sub(d.o, div[i]))), 1.5);
      dw.setLabel(`lfc${i}`, V.add(V.mid(div[i], d.o), nrm));
      dw.setText(`lfc${i}`, `${d.N[i].toFixed(1)}`);
    }
    dw.setDisk('ptO', d.o);
    dw.setLabel('lO', V.add(d.o, [1.5, 0.7]));
    dw.setSeg('dimH', [d.T[0], d.T[1] + 2.2], [d.o[0], d.T[1] + 2.2]);
    dw.setLabel('lH', [(d.T[0] + d.o[0]) / 2, d.T[1] + 3.4]);
    dw.setText('lH', `H = ${d.H.toFixed(1)} kN`);

    const gi = d.N.indexOf(d.Nmax);
    dw.setSeg('gov', pts[gi], pts[gi + 1]);
    // clear of the force-thickness band, which is sIF*N units half-wide
    const gn = V.mul(V.unit(V.perp(V.sub(pts[gi + 1], pts[gi]))), -(s.sIF * d.Nmax + 2.0));
    dw.setLabel('lgov', V.add(V.add(V.mid(pts[gi], pts[gi + 1]), gn), [-3.2, 0]));
    dw.setText('lgov', `N_d,max = ${d.Nmax.toFixed(1)} kN`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);
  const par = panel.section('Given');
  panel.slider(par, s, 'F', 'F₁d = F₂d (kN)', 10, 100, 5, refresh);
  panel.toggle(par, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.03, 0.001, refresh);
  panel.toggle(par, s, 'lbl', 'show labels', refresh);
  const dim = panel.section('Dimensioning');
  panel.slider(dim, s, 'd1', 'cable diameter Ø (mm)', 8, 40, 1, refresh);

  refresh();
  return player;
}
