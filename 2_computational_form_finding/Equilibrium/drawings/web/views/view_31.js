/**
 * Drawing view/31 "Eiffel Tower, G. Eiffel"
 * (https://block.arch.ethz.ch/eq/drawing/view/31) as a step-by-step
 * construction.
 *
 * The tower stands on A and B and rises over 6 equal storeys to the apex
 * on the axis of the base. Horizontal wind loads Q1..Q6 act at the storey
 * lines. A trial funicular between the lines of action locates the wind
 * resultant R; where R crosses the tower axis (O1) the three-force rule
 * fixes the directions of the two support reactions, and parallels to them
 * through the ends of the load line meet at the pole o -- vertically above
 * the load-line midpoint. Storey by storey each node closes its polygon:
 * the horizontal braces carry Q1/2 .. Q5/2 on the horizontal through o,
 * the windward leg forces run from the load points, the leeward leg forces
 * all radiate from the last load point. The legs of the built tower follow
 * exactly these funicular curves.
 *
 * Live port of view_31/applet_0/geogebra.xml; the full chain (55 points,
 * default + two dragged states) matches the LIVE applet to ~2.9e-13
 * (scratchpad v31/regress31.py). The applet's embedded photograph of the
 * tower ships as the actual image (assets/view_31_tower.jpg, the applet's
 * anchors F_3/G_3, opacity 0.25, shown at the resolved state like the
 * original). See notes/view_31_analysis.md.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 31 — Eiffel Tower, G. Eiffel',
  subtitle: 'the tower legs as funicular curves of the wind loads',
  about: 'Eiffel\'s tower under wind: horizontal loads Q₁…Q₆ act at six storey lines. A trial funicular locates the wind resultant; where it crosses the tower axis, the three-force rule gives the two reaction directions, and their parallels through the ends of the load line meet at the pole o, vertically above the load-line midpoint. Closing the force polygon of every node, storey by storey, shapes both legs: the windward leg resolves in tension, the leeward leg and the horizontal braces (each carrying half a load) in compression — the profile of the built tower follows exactly these funicular curves.',
  frame: [[2.0, 1.1], [22.9, 11.9]],
};

const A = [5, 3];                       // fixed left support
const GL = 2.697184020902849;           // storey guide lines: left end (N_2)
const GR = 12.363893543942199;          // right end (O_2)
const DIMY = 2.176455991909523;         // dimension-figure line (J_3)
const N_LVL = 6;
const LEGS = 7;                         // trial + R arrows retire here
const RESOLVE = 15;

// the applet's embedded photo (anchors F_3, G_3; 269 x 450 px, alpha 0.25)
const PH_BL = [3.630835866119922, 2.77171041196522];
const PH_BR = [8.41415291528336, 2.777185973269858];
const PH_H = 450 / 269;                 // height / width

const DEFAULTS = {
  Bx: 7.18,                             // support B on y = 3 (draggable)
  Cy: 10.50202410487874,                // C: top of the height ladder on x = 5
  W: [14, 3],                           // load-line anchor (free)
  F1: [15.45107396336566, 6.117225922374945],   // trial pole o'
  G1x: 10.785379184243247,              // trial start on storey line 1
  H3x: 5.109688077028293,               // R arrow tip on its line of action
  ix: 4.367143944783316,                // load-symbol position I
  Q: 2,                                 // load [1, 5] kN
  sFD: 0.3,                             // scaleForceDiagram [0.1, 0.5]
  sLS: 1,                               // scaleLoadSymbol
  oR: 0.8,                              // offsetResultant [0, 1.2]
  oRF: 0.4,                             // offsetReactionForces [0, 3]
  sIF: 0.006,                           // scaleInternalForces [0, 0.01]
  o1: true,                             // show internal forces
  lab: true,                            // applet checkbox "show labels" (numbers)
  n4: true,                             // show points
  ph: true,                             // the photograph of the built tower
  node: 0,                              // node-equilibrium inspector (0 = off)
  _k: 99,
};

// every construction move happens on BOTH sides at once
const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'Six storeys over the base A–B', d: 'left: the tower stands on A and B and rises over six equal storeys (grey lines) to the apex over the middle of the base — drag B or the top C' },
  { t: 'The wind loads and the load line', d: 'left: horizontal wind loads Q₁ … Q₆ push at the storey lines — right: laid off along a horizontal load line W → E₁, tip to tail' },
  { t: 'A trial funicular', d: 'right: any trial pole o′ with rays to the load points — left: between the lines of action, a trial funicular from G₁: one side parallel to each ray' },
  { t: 'The wind resultant R', d: 'left: the outer trial sides (dashed), extended, meet at M₁: R acts on the horizontal through M₁ (dashed green) — right: R = the whole load line W → E₁, drawn beside it', },
  { t: 'O₁ and the pole o', d: 'left: R crosses the tower axis at O₁; the reactions must point from A and B to O₁ (dashed) — and the axis halves the base: l₁ = l₁ — right: parallels through W and E₁ meet at the pole o' },
  { t: 'The reactions A and B', d: 'left: the reaction directions carry A (windward, pulled down) and B at the supports — right: A = o→W and B = E₁→o, drawn beside the outer rays' },
  { t: 'Members 1 and 2', d: 'left: the legs start from A and B toward O₁, up to storey line 1 — right: their forces are the outer rays W–o and o–E₁; o stands vertically above the load-line midpoint: f₁ = f₁' },
  { t: 'Node B₂ — members 3 and 4', d: 'left: Q₁ enters the windward node: horizontal brace 3, leg 4 — right: the brace force runs on the horizontal through o and the leg force from Z: they close at T₁, above the midpoint of Z–E₁ (f₂ = f₂), so brace 3 carries Q₁/2' },
  { t: 'Node G₂ — member 5', d: 'right: the leeward node carries no load: its triangle closes with T₁–E₁ — left: leg 5, parallel to it, continues to storey line 2' },
  { t: 'Storey 2 — members 6, 7, 8', d: 'left: Q₂ enters at C₂: brace 6, legs 7 and 8 — right: brace force T₁–U₁ = Q₂/2 on the horizontal, leg forces A₁–U₁ and U₁–E₁' },
  { t: 'Storey 3 — members 9, 10, 11', d: 'left: Q₃ enters at D₂: brace 9, legs 10 and 11 — right: U₁–W₁ = Q₃/2; every leeward force radiates from E₁, every windward force from a load point' },
  { t: 'Storey 4 — members 12, 13, 14', d: 'left: Q₄ enters at E₂: brace 12, legs 13 and 14 — right: W₁–Z₁ = Q₄/2; the legs lean more the higher the storey' },
  { t: 'The apex — members 15, 16, 17', d: 'left: brace 15 (= Q₅/2), then both legs meet at the apex where Q₆ enters — right: the triangle D₁–A₂–E₁ closes the tip' },
  { t: 'The polygon closes', d: 'right: the reactions A and B return beside the outer rays: loads + A + B close the force polygon — left: the whole tower stands in equilibrium on A and B' },
  { t: 'Tension and compression', d: 'behind: the photograph of the built tower — the windward leg resolves pink = tension, the leeward leg and the braces blue = compression (pipes ∝ force); drag B, C, W, the loads — or click a node for its equilibrium',
    detail: (d, st) => [`wind R = ${(6 * st.Q).toFixed(1)} kN — A = ${d.RA.toFixed(1)} · B = ${d.RB.toFixed(1)} kN`],
    take: 'Eiffel\'s profile IS the funicular of the wind: storey by storey, the legs follow the wind\'s pressure line' },
];

const cache = {};
function inter(key, p1, d1, p2, d2) {
  cache[key] = V.intersect(p1, d1, p2, d2) || cache[key] || p1;
  return cache[key];
}
const X = [1, 0];

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const B = [s.Bx, 3];
  const lvl = (s.Cy - 3) / N_LVL;
  const ylv = [];                                  // ylv[1..6] = storey lines
  for (let k = 0; k <= N_LVL; k++) ylv.push(3 + k * lvl);
  const axis = (A[0] + B[0]) / 2;
  const R1 = [axis, ylv[6]];

  // load line (horizontal through W): W, Z, A1, B1, C1, D1, E1
  const w = s.Q * s.sFD;
  const PL = [];
  for (let k = 0; k <= 6; k++) PL.push([s.W[0] + k * w, s.W[1]]);
  const E1 = PL[6];

  // trial funicular between the storey lines, pole F1 = o'
  const G1 = [s.G1x, ylv[1]];
  const tv = [G1];
  for (let k = 1; k <= 5; k++) {
    tv.push(inter(`tv${k}`, tv[k - 1], V.sub(PL[k], s.F1), [0, ylv[k + 1]], X));
  }
  const M1 = inter('M1', G1, V.sub(PL[0], s.F1), tv[5], V.sub(PL[6], s.F1));
  const yR = M1[1];
  const O1 = [axis, yR];

  // legs start along A-O1 / B-O1; pole P1 = o
  const dA = V.sub(O1, A), dB = V.sub(O1, B);
  const B2 = inter('B2', A, dA, [0, ylv[1]], X);
  const G2 = inter('G2', B, dB, [0, ylv[1]], X);
  const P1 = inter('P1', s.W, dA, E1, dB);

  // hidden second pole S1 (on W-P1 extended, cut by the parallel to the
  // chord B2-R1 through B1) -> the g3 division points T1 .. A2
  const S1 = inter('S1', s.W, dA, PL[3], V.sub(R1, B2));
  const T1 = inter('T1', PL[1], V.sub(S1, PL[1]), [0, P1[1]], X);
  const U1 = inter('U1', PL[2], V.sub(S1, PL[2]), [0, P1[1]], X);
  const W1 = inter('W1', PL[3], V.sub(R1, B2), [0, P1[1]], X);
  const Z1 = inter('Z1', PL[4], V.sub(S1, PL[4]), [0, P1[1]], X);
  const A2 = inter('A2', PL[5], V.sub(S1, PL[5]), [0, P1[1]], X);

  // windward leg (parallels to the S1 rays), leeward leg (E1 rays)
  const C2 = inter('C2', B2, V.sub(S1, PL[1]), [0, ylv[2]], X);
  const D2 = inter('D2', C2, V.sub(S1, PL[2]), [0, ylv[3]], X);
  const E2 = inter('E2', D2, V.sub(S1, PL[3]), [0, ylv[4]], X);
  const F2 = inter('F2', E2, V.sub(S1, PL[4]), [0, ylv[5]], X);
  const H2 = inter('H2', R1, V.sub(A2, E1), [0, ylv[5]], X);
  const I2 = inter('I2', H2, V.sub(E1, Z1), [0, ylv[4]], X);
  const J2 = inter('J2', I2, V.sub(W1, E1), [0, ylv[3]], X);
  const K2 = inter('K2', J2, V.sub(E1, U1), [0, ylv[2]], X);

  // reactions: at the supports (form) + offset beside the outer rays (force)
  const L2 = V.sub(A, V.mul(V.unit(dA), s.sLS));
  const M2 = V.sub(B, V.mul(V.unit(dB), s.sLS));
  const uA = V.unit(V.sub(s.W, P1));
  const nA = [uA[1], -uA[0]];
  const U3 = V.add(s.W, V.mul(nA, s.oRF));
  const Z3 = V.add(P1, V.mul(nA, s.oRF));
  const uB = V.unit(V.sub(E1, P1));
  const nB = [-uB[1], uB[0]];
  const C4 = V.add(E1, V.mul(nB, s.oRF));
  const D4 = V.add(P1, V.mul(nB, s.oRF));

  // resultants (form: on the line of action; force: offset below the line)
  const A4 = [s.W[0], s.W[1] - s.oR];
  const F4 = [E1[0], s.W[1] - s.oR];
  const H3 = [s.H3x, yR];
  const I3 = [s.H3x - s.sLS, yR];

  // members 1..17: [form a, form b, force f1, force f2] (macro orientation)
  const M = [null,
    [A, B2, s.W, P1], [B, G2, P1, E1],
    [B2, G2, T1, P1], [B2, C2, PL[1], T1],
    [G2, K2, T1, E1], [C2, K2, U1, T1],
    [C2, D2, PL[2], U1], [K2, J2, U1, E1],
    [D2, J2, W1, U1], [D2, E2, PL[3], W1],
    [J2, I2, W1, E1], [E2, I2, Z1, W1],
    [E2, F2, PL[4], Z1], [I2, H2, Z1, E1],
    [F2, H2, A2, Z1], [F2, R1, PL[5], A2],
    [H2, R1, A2, E1],
  ];
  const col = [], N = [];
  for (let k = 1; k <= 17; k++) {
    const [a, b, f1, f2] = M[k];
    col[k] = V.isCompression(V.ggbAngle(V.sub(b, a), V.sub(f2, f1))) ? PAL.blue : PAL.red;
    N[k] = V.dist(f1, f2) / s.sFD;
  }
  const RA = V.dist(s.W, P1) / s.sFD;
  const RB = V.dist(E1, P1) / s.sFD;

  return { B, lvl, ylv, axis, R1, w, PL, E1, G1, tv, M1, yR, O1, dA, dB,
           B2, G2, P1, S1, T1, U1, W1, Z1, A2, C2, D2, E2, F2, H2, I2, J2, K2,
           L2, M2, U3, Z3, C4, D4, A4, F4, H3, I3, M, col, N, RA, RB };
}

const SUB = ' ₁₂₃₄₅₆';

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, W: [...DEFAULTS.W], F1: [...DEFAULTS.F1] };
  let d = compute(s);

  const W_BAR = 0.055, W_RAY = 0.016, W_STR = 0.03, W_FSEG = 0.04;
  const ARROW = { w: 0.06, headLen: 0.24, headW: 0.095 };
  const memCol = (k) => ({ pending: PAL.black, final: (dd) => dd.col[k] });
  const numCol = (k) => ({ final: (dd) => dd.col[k] });
  // intro step of each member (the step its node polygon closes)
  const IK = [null, 7, 7, 8, 8, 9, 10, 10, 10, 11, 11, 11, 12, 12, 12, 13, 13, 13];

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // ------------------------------------------------------------------
  // step 1 -- site: the storey lines + A, B, C (height ladder)
  // ------------------------------------------------------------------
  for (let k = 1; k <= 6; k++) {
    dw.dashLine(`lvl${k}`, { intro: 1, dash: 0.05, color: 0x8a8a8a, flash: false });
  }
  dw.dashLine('ladder', { intro: 1, dash: 0.12 });

  // the photograph of the built tower (applet pic1: only at the resolved state)
  dw.image('photo', 'assets/view_31_tower.jpg',
           { corners: [PH_BL, PH_BR, PH_BL], opacity: 0.25, intro: RESOLVE,
             when: (st) => st.ph });

  // ------------------------------------------------------------------
  // step 2 -- wind loads + load line
  // ------------------------------------------------------------------
  for (let i = 1; i <= 6; i++) {
    dw.arrow(`loadQ${i}`, { intro: 2, ...ARROW });
    dw.label(`lQ${i}`, `Q${SUB[i]}`, { cls: 'num', intro: 2, color: PAL.green });
    dw.arrow(`edgeQ${i}`, { intro: 2, ...ARROW });
    dw.label(`lQf${i}`, `Q${SUB[i]}`, { cls: 'num', intro: 2, color: PAL.green });
  }

  // ------------------------------------------------------------------
  // step 3 -- trial pole o' + trial funicular (retire at LEGS, applet step 4)
  // ------------------------------------------------------------------
  dw.strokes('trays', 7, { intro: 3, outro: LEGS, w: W_RAY, color: PAL.grey });
  dw.strokes('tfun', 5, { intro: 3, outro: LEGS, w: 0.024, color: PAL.grey });
  dw.dashLine('tout1', { intro: 4, outro: LEGS, dash: 0.12 });
  dw.dashLine('tout2', { intro: 4, outro: LEGS, dash: 0.12 });
  dw.dashLine('tclose', { intro: 3, outro: LEGS, dash: 0.09 });

  // ------------------------------------------------------------------
  // step 4 -- the resultant R (both sides) + its line of action
  // ------------------------------------------------------------------
  dw.dashLine('loaR', { intro: 4, outro: 8, dash: 0.14, color: PAL.grey });
  dw.dashArrow('resR', { intro: 4, outro: LEGS, ...ARROW, dash: 0.12 });
  dw.label('lR', 'R', { intro: 4, outro: LEGS, color: PAL.green });
  dw.dashArrow('resRf', { intro: 4, outro: LEGS, ...ARROW, dash: 0.12 });
  dw.label('lRf', 'R', { intro: 4, outro: LEGS, color: PAL.green });
  dw.dashLine('conR1', { intro: 4, outro: LEGS, dash: 0.05 });
  dw.dashLine('conR2', { intro: 4, outro: LEGS, dash: 0.05 });

  // ------------------------------------------------------------------
  // step 5 -- O1 + closing directions + l1 dims -> the pole o
  // ------------------------------------------------------------------
  dw.dashLine('clA', { intro: 5, outro: 8, dash: 0.12, color: PAL.black });
  dw.dashLine('clB', { intro: 5, outro: 8, dash: 0.12, color: PAL.black });
  dw.seg('pl1', { intro: 5, w: W_RAY, color: PAL.grey });
  dw.seg('pl2', { intro: 5, w: W_RAY, color: PAL.grey });
  dw.strokes('dimL', 6, { intro: 5, outro: 10, w: 0.014, color: 0x9a9a9a, flash: false });
  dw.dashLine('dimLg1', { intro: 5, outro: 10, dash: 0.05 });
  dw.dashLine('dimLg2', { intro: 5, outro: 10, dash: 0.05 });
  dw.dashLine('dimLg3', { intro: 5, outro: 10, dash: 0.05 });
  dw.label('l_l1a', 'l₁', { intro: 5, outro: 10, color: 0x8a8a8a, flash: false });
  dw.label('l_l1b', 'l₁', { intro: 5, outro: 10, color: 0x8a8a8a, flash: false });

  // step 6 -- reactions (form + offset force copies; the applet hides the
  // offset copies while the storeys are built, steps 5..7, and shows them
  // again at step 8 -> second copies at step 14)
  dw.arrow('reacAform', { intro: 6, ...ARROW });
  dw.arrow('reacBform', { intro: 6, ...ARROW });
  dw.label('lAform', 'A', { cls: 'num', intro: 6, color: PAL.green });
  dw.label('lBform', 'B', { cls: 'num', intro: 6, color: PAL.green });
  for (const [sfx, intro, outro] of [['', 6, 8], ['2', 14, undefined]]) {
    dw.arrow(`reacA${sfx}`, { intro, outro, ...ARROW });
    dw.arrow(`reacB${sfx}`, { intro, outro, ...ARROW });
    dw.label(`lA${sfx}`, 'A', { cls: 'num', intro, outro, color: PAL.green });
    dw.label(`lB${sfx}`, 'B', { cls: 'num', intro, outro, color: PAL.green });
    dw.dashLine(`conA1${sfx}`, { intro, outro, dash: 0.05 });
    dw.dashLine(`conA2${sfx}`, { intro, outro, dash: 0.05 });
    dw.dashLine(`conB1${sfx}`, { intro, outro, dash: 0.05 });
    dw.dashLine(`conB2${sfx}`, { intro, outro, dash: 0.05 });
  }

  // ------------------------------------------------------------------
  // steps 7-13 -- the members, node by node / storey by storey
  // ------------------------------------------------------------------
  for (let k = 1; k <= 17; k++) {
    dw.seg(`mem${k}`, { intro: IK[k], w: W_BAR, color: memCol(k) });
    dw.seg(`fseg${k}`, { intro: IK[k], w: W_FSEG, color: memCol(k) });
    dw.label(`n${k}f`, `${k}`, { cls: 'num', intro: IK[k], color: numCol(k),
             when: (st) => st.lab });
    dw.label(`n${k}s`, `${k}`, { cls: 'num', intro: IK[k], color: numCol(k),
             when: (st) => st.lab });
  }
  // brace forces Q_i/2 (retire at 14 like the applet's step-7 texts)
  for (let i = 1; i <= 5; i++) {
    dw.label(`lqh${i}`, `Q${SUB[i]}/2`, { cls: 'num', intro: IK[3 * i], outro: 14,
             color: 0x6a6a6a, flash: false });
  }

  // f1 dims (step 7 only) + the vertical o over the load-line midpoint
  dw.strokes('dimF1', 6, { intro: 7, outro: 8, w: 0.014, color: 0x9a9a9a, flash: false });
  dw.dashLine('dimF1g1', { intro: 7, outro: 8, dash: 0.05 });
  dw.dashLine('dimF1g2', { intro: 7, outro: 8, dash: 0.05 });
  dw.dashLine('dimF1g3', { intro: 7, outro: 9, dash: 0.05 });
  dw.dashLine('poleVert', { intro: 7, outro: 8, dash: 0.12 });
  dw.label('l_f1a', 'f₁', { intro: 7, outro: 8, color: 0x8a8a8a, flash: false });
  dw.label('l_f1b', 'f₁', { intro: 7, outro: 8, color: 0x8a8a8a, flash: false });

  // f2 dims (step 8 only): T1 above the midpoint of Z..E1
  dw.strokes('dimF2', 6, { intro: 8, outro: 9, w: 0.014, color: 0x9a9a9a, flash: false });
  dw.dashLine('dimF2g1', { intro: 8, outro: 9, dash: 0.05 });
  dw.dashLine('dimF2g2', { intro: 8, outro: 9, dash: 0.05 });
  dw.dashLine('t1Vert', { intro: 8, outro: 9, dash: 0.12 });
  dw.label('l_f2a', 'f₂', { intro: 8, outro: 9, color: 0x8a8a8a, flash: false });
  dw.label('l_f2b', 'f₂', { intro: 8, outro: 9, color: 0x8a8a8a, flash: false });

  // re-flash the paired elements (form <-> force in the same step)
  dw.highlight('pl1', [7]);
  dw.highlight('pl2', [7]);
  dw.highlight('loadQ1', [8]);
  dw.highlight('edgeQ1', [8]);
  dw.highlight('mem3', [9]);
  dw.highlight('fseg3', [9]);
  dw.highlight('loadQ6', [13]);
  dw.highlight('edgeQ6', [13]);

  // internal-force pipes (on by default)
  for (let k = 1; k <= 17; k++) {
    dw.poly(`if${k}`, 4, { intro: RESOLVE, opacity: 1.0, z: -0.18, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd.col[k] }, when: (st) => st.o1 });
  }

  // ------------------------------------------------------------------
  // points + labels
  // ------------------------------------------------------------------
  const HANDLE = { r: 0.075 }, DERIVED = { r: 0.058 };
  const show = (st) => st.n4;
  dw.disk('pt_A', { intro: 1, ...HANDLE });
  dw.disk('pt_B', { intro: 1, ...HANDLE });
  dw.disk('pt_C', { intro: 1, ...HANDLE });
  dw.disk('pt_W', { intro: 2, ...HANDLE });
  dw.disk('pt_I', { intro: 2, ...HANDLE });
  dw.disk('pt_F1', { intro: 3, outro: LEGS, ...HANDLE });
  dw.disk('pt_G1', { intro: 3, outro: LEGS, ...HANDLE });
  dw.disk('pt_M1', { intro: 4, outro: LEGS, ...DERIVED, when: show });
  dw.disk('pt_H3', { intro: 4, outro: LEGS, ...HANDLE });
  dw.disk('pt_O1', { intro: 5, outro: 8, ...DERIVED, when: show });
  dw.disk('pt_P1', { intro: 5, ...DERIVED, when: show });
  const derived = { B2: 7, G2: 7, C2: 8, T1: 8, K2: 9, D2: 10, J2: 10, U1: 10,
                    E2: 11, I2: 11, W1: 11, F2: 12, H2: 12, Z1: 12, R1: 13, A2: 13 };
  for (const [pn, intro] of Object.entries(derived)) {
    dw.disk(`pt_${pn}`, { intro, ...DERIVED, when: show });
  }

  const letters = {
    A: ['A', 1], B: ['B', 1], C: ['C', 1],
    F1: ['o′', 3, LEGS], G1: ['G₁', 3, LEGS], M1: ['M₁', 4, LEGS],
    O1: ['O₁', 5, 8], P1: ['o', 5],
    T1: ['T₁', 8], U1: ['U₁', 10], W1: ['W₁', 11], Z1: ['Z₁', 12], A2: ['A₂', 13],
  };
  for (const [pn, [text, intro, outro]] of Object.entries(letters)) {
    dw.label(`lbl_${pn}`, text, { cls: 'point', intro, outro, when: show });
  }

  // readouts
  for (let i = 0; i < 3; i++) {
    dw.label(`ro${i}`, '', { intro: RESOLVE, flash: false, color: PAL.green });
  }

  // node-equilibrium inspector (free-body star + tip-to-tail sub-polygon)
  dw.nodeInspector(4, { when: (st) => st.node > 0, w: 1.5 * W_BAR,
                        headLen: 0.26, headW: 0.105, r: 0.085 });

  // dual pairs (hovering a form member highlights its force twin)
  for (let k = 1; k <= 17; k++) dw.link(`mem${k}`, `fseg${k}`, `n${k}f`, `n${k}s`);
  for (let i = 1; i <= 6; i++) dw.link(`loadQ${i}`, `edgeQ${i}`, `lQ${i}`, `lQf${i}`, `lvl${i}`);
  dw.link('tfun', 'trays', 'tout1', 'tout2', 'tclose');
  dw.link('resR', 'resRf', 'lR', 'lRf', 'loaR', 'conR1', 'conR2');
  dw.link('clA', 'pl1');
  dw.link('clB', 'pl2');
  dw.link('reacAform', 'reacA', 'reacA2', 'lAform', 'lA', 'lA2');
  dw.link('reacBform', 'reacB', 'reacB2', 'lBform', 'lB', 'lB2');
  dw.ghostable('edgeQ1', 'edgeQ2', 'edgeQ3', 'edgeQ4', 'edgeQ5', 'edgeQ6',
               'fseg1', 'fseg2', 'fseg3', 'fseg4', 'fseg5', 'fseg6', 'fseg7',
               'fseg8', 'fseg9', 'fseg10', 'fseg11', 'fseg12', 'fseg13',
               'fseg14', 'fseg15', 'fseg16', 'fseg17', 'reacA2', 'reacB2',
               'pl1', 'pl2');

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  // dimension line with end ticks (3 strokes) between two points
  const dim = (a, b) => {
    const u = V.unit(V.sub(b, a));
    const n = V.mul(V.perp(u), 0.09);
    return [[a, b], [V.sub(a, n), V.add(a, n)], [V.sub(b, n), V.add(b, n)]];
  };

  function update() {
    dw.setLabel('form_title', [3.06, 11.44]);
    dw.setLabel('force_title', [14.06, 11.45]);
    dw.setLabel('force_sub', [21.2, 11.45]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(2)} kN`);

    // site: storey lines + height ladder + photo
    for (let k = 1; k <= 6; k++) {
      dw.setDashLine(`lvl${k}`, [[GL, d.ylv[k]], [GR, d.ylv[k]]]);
    }
    dw.setDashLine('ladder', [A, [5, s.Cy]]);
    const uph = V.mul(V.perp(V.unit(V.sub(PH_BR, PH_BL))), V.dist(PH_BL, PH_BR) * PH_H);
    dw.setImage('photo', [PH_BL, PH_BR, V.add(PH_BL, uph)]);

    // wind loads + load line
    for (let i = 1; i <= 6; i++) {
      const y = d.ylv[i];
      dw.setArrow(`loadQ${i}`, [s.ix - s.sLS, y], [s.ix, y]);
      dw.setLabel(`lQ${i}`, [s.ix - 0.55 * s.sLS, y + 0.26]);
      dw.setArrow(`edgeQ${i}`, d.PL[i - 1], d.PL[i]);
      dw.setLabel(`lQf${i}`, [(d.PL[i - 1][0] + d.PL[i][0]) / 2, d.PL[i][1] - 0.3]);
    }

    // trial pole + trial funicular
    dw.setStrokes('trays', d.PL.map((p) => [s.F1, p]));
    dw.setStrokes('tfun', d.tv.slice(0, -1).map((p, i) => [p, d.tv[i + 1]]));
    dw.setDashLine('tout1', [d.G1, d.M1]);
    dw.setDashLine('tout2', [d.M1, d.tv[5]]);
    dw.setDashLine('tclose', [d.tv[5], d.G1]);

    // the resultant R
    dw.setDashLine('loaR', [[GL, d.yR], [GR, d.yR]]);
    dw.setDashArrow('resR', d.I3, d.H3);
    dw.setLabel('lR', [d.H3[0] - 0.5 * s.sLS, d.yR + 0.26]);
    dw.setDashArrow('resRf', d.A4, d.F4);
    dw.setLabel('lRf', [(d.A4[0] + d.F4[0]) / 2, d.A4[1] - 0.3]);
    dw.setDashLine('conR1', [d.A4, s.W]);
    dw.setDashLine('conR2', [d.F4, d.E1]);

    // O1 + closing directions + the pole o
    dw.setDashLine('clA', [A, d.O1]);
    dw.setDashLine('clB', [d.B, d.O1]);
    dw.setSeg('pl1', s.W, V.add(d.P1, V.mul(V.sub(d.P1, s.W), 0.04)));
    dw.setSeg('pl2', d.E1, V.add(d.P1, V.mul(V.sub(d.P1, d.E1), 0.04)));

    // l1 = l1 dimensions below the base
    const K3 = [5, DIMY], L3 = [d.axis, DIMY], M3 = [s.Bx, DIMY];
    dw.setStrokes('dimL', [...dim(K3, L3), ...dim(L3, M3)]);
    dw.setDashLine('dimLg1', [K3, A]);
    dw.setDashLine('dimLg2', [L3, [d.axis, 3]]);
    dw.setDashLine('dimLg3', [M3, d.B]);
    dw.setLabel('l_l1a', [(5 + d.axis) / 2, DIMY - 0.26]);
    dw.setLabel('l_l1b', [(d.axis + s.Bx) / 2, DIMY - 0.26]);

    // reactions
    dw.setArrow('reacAform', d.L2, A);
    dw.setArrow('reacBform', d.M2, d.B);
    dw.setLabel('lAform', V.add(d.L2, [-0.32, -0.1]));
    dw.setLabel('lBform', V.add(d.M2, [0.32, -0.1]));
    for (const sfx of ['', '2']) {
      dw.setArrow(`reacA${sfx}`, d.Z3, d.U3);
      dw.setArrow(`reacB${sfx}`, d.C4, d.D4);
      dw.setLabel(`lA${sfx}`, V.add(V.mid(d.Z3, d.U3), [-0.34, 0]));
      dw.setLabel(`lB${sfx}`, V.add(V.mid(d.C4, d.D4), [0.34, 0]));
      dw.setDashLine(`conA1${sfx}`, [s.W, d.U3]);
      dw.setDashLine(`conA2${sfx}`, [d.Z3, d.P1]);
      dw.setDashLine(`conB1${sfx}`, [d.E1, d.C4]);
      dw.setDashLine(`conB2${sfx}`, [d.D4, d.P1]);
    }

    // members + force segments + numbers
    for (let k = 1; k <= 17; k++) {
      const [a, b, f1, f2] = d.M[k];
      dw.setSeg(`mem${k}`, a, b);
      dw.setSeg(`fseg${k}`, f1, f2);
      const m = V.mid(a, b), mf = V.mid(f1, f2);
      if (k % 3 === 0 && k <= 15) {
        // braces 3, 6, 9, 12, 15: number above the form brace, below the
        // force brace; Q/2 labels in two staggered rows above (applet style)
        dw.setLabel(`n${k}f`, [m[0], m[1] + 0.24]);
        dw.setLabel(`n${k}s`, [mf[0], mf[1] - 0.3]);
        const i = k / 3;
        dw.setLabel(`lqh${i}`, [mf[0], mf[1] + (i % 2 === 1 ? 0.3 : 0.66)]);
      } else if (k % 3 === 1) {
        // windward leg 1, 4, 7, 10, 13, 16: number left of the member/ray
        dw.setLabel(`n${k}f`, V.add(m, [-0.3, 0]));
        dw.setLabel(`n${k}s`, V.add(mf, [-0.28, 0.1]));
      } else {
        // leeward leg 2, 5, 8, 11, 14, 17: the force rays all converge at
        // E1 -- cascade the numbers down the fan so they never collide
        dw.setLabel(`n${k}f`, V.add(m, [0.3, 0]));
        const t = 0.12 + 0.07 * (k - 2) / 3;
        const p = V.add(f1, V.mul(V.sub(f2, f1), t));
        dw.setLabel(`n${k}s`, V.add(p, [0.3, 0]));
      }
    }

    // f1 dims: o above the load-line midpoint
    const O3 = [s.W[0], DIMY], P3 = [d.PL[3][0], DIMY], Q3 = [d.E1[0], DIMY];
    dw.setStrokes('dimF1', [...dim(O3, P3), ...dim(P3, Q3)]);
    dw.setDashLine('dimF1g1', [s.W, O3]);
    dw.setDashLine('dimF1g2', [P3, d.PL[3]]);
    dw.setDashLine('dimF1g3', [Q3, d.E1]);
    dw.setDashLine('poleVert', [d.PL[3], d.P1]);
    dw.setLabel('l_f1a', [(O3[0] + P3[0]) / 2, DIMY - 0.26]);
    dw.setLabel('l_f1b', [(P3[0] + Q3[0]) / 2, DIMY - 0.26]);

    // f2 dims: T1 above the midpoint of Z..E1
    const S3 = [d.PL[1][0], DIMY], T3 = [d.T1[0], DIMY], R3 = [d.T1[0], s.W[1]];
    dw.setStrokes('dimF2', [...dim(S3, T3), ...dim(T3, Q3)]);
    dw.setDashLine('dimF2g1', [S3, d.PL[1]]);
    dw.setDashLine('dimF2g2', [T3, R3]);
    dw.setDashLine('t1Vert', [R3, d.T1]);
    dw.setLabel('l_f2a', [(S3[0] + T3[0]) / 2, DIMY - 0.26]);
    dw.setLabel('l_f2b', [(T3[0] + Q3[0]) / 2, DIMY - 0.26]);

    // pipes
    for (let k = 1; k <= 17; k++) {
      const [a, b] = d.M[k];
      dw.setPoly(`if${k}`, V.rectPoints(a, b, s.sIF * d.N[k]));
    }

    // points + labels
    dw.setDisk('pt_A', A);
    dw.setDisk('pt_B', d.B);
    dw.setDisk('pt_C', [5, s.Cy]);
    dw.setDisk('pt_W', s.W);
    dw.setDisk('pt_I', [s.ix, 3]);
    dw.setDisk('pt_F1', s.F1);
    dw.setDisk('pt_G1', d.G1);
    dw.setDisk('pt_M1', d.M1);
    dw.setDisk('pt_H3', d.H3);
    dw.setDisk('pt_O1', d.O1);
    dw.setDisk('pt_P1', d.P1);
    for (const pn of Object.keys(derived)) dw.setDisk(`pt_${pn}`, d[pn]);

    const at = { A, B: d.B, C: [5, s.Cy], F1: s.F1, G1: d.G1, M1: d.M1,
                 O1: d.O1, P1: d.P1, T1: d.T1, U1: d.U1, W1: d.W1, Z1: d.Z1, A2: d.A2 };
    const off = { A: [-0.28, -0.26], B: [0.28, -0.26], C: [0.28, 0.16],
                  F1: [0.3, 0.18], G1: [-0.34, -0.18], M1: [0.34, 0.16],
                  O1: [0.3, 0.22], P1: [-0.36, 0.24],
                  T1: [0.02, 0.3], U1: [0.02, 0.3], W1: [0.02, 0.3],
                  Z1: [0.02, 0.3], A2: [0.16, 0.3] };
    for (const pn of Object.keys(letters)) dw.setLabel(`lbl_${pn}`, V.add(at[pn], off[pn]));

    dw.setLabel('ro0', [21.6, 10.9]);
    dw.setText('ro0', `R = ${(6 * s.Q).toFixed(1)} kN`);
    dw.setLabel('ro1', [21.6, 10.55]);
    dw.setText('ro1', `A = ${d.RA.toFixed(1)} kN`);
    dw.setLabel('ro2', [21.6, 10.2]);
    dw.setText('ro2', `B = ${d.RB.toFixed(1)} kN`);
  }

  // node-equilibrium inspector: 1 = A, 2 = B, then windward/leeward pairs
  // per storey, 13 = apex. Sides = the node's closed force sub-polygon;
  // the support reactions lie ON the drawn offset arrows Z3->U3 / C4->D4.
  function nodePoly() {
    const n = Math.max(1, Math.round(s.node));
    const { PL, E1, P1, T1, U1, W1, Z1, A2, U3, Z3, C4, D4 } = d;
    const W = s.W;
    switch (n) {
      case 1: return [[W, P1], [Z3, U3]];
      case 2: return [[P1, E1], [C4, D4]];
      case 3: return [[W, PL[1]], [PL[1], T1], [T1, P1], [P1, W]];
      case 4: return [[E1, P1], [P1, T1], [T1, E1]];
      case 5: return [[PL[1], PL[2]], [PL[2], U1], [U1, T1], [T1, PL[1]]];
      case 6: return [[U1, E1], [T1, U1], [E1, T1]];
      case 7: return [[PL[2], PL[3]], [PL[3], W1], [W1, U1], [U1, PL[2]]];
      case 8: return [[W1, E1], [U1, W1], [E1, U1]];
      case 9: return [[PL[3], PL[4]], [PL[4], Z1], [Z1, W1], [W1, PL[3]]];
      case 10: return [[Z1, E1], [W1, Z1], [E1, W1]];
      case 11: return [[PL[4], PL[5]], [PL[5], A2], [A2, Z1], [Z1, PL[4]]];
      case 12: return [[A2, E1], [Z1, A2], [E1, Z1]];
      default: return [[PL[5], PL[6]], [E1, A2], [A2, PL[5]]];
    }
  }
  const NODE_DISKS = [null, 'pt_A', 'pt_B', 'pt_B2', 'pt_G2', 'pt_C2', 'pt_K2',
                      'pt_D2', 'pt_J2', 'pt_E2', 'pt_I2', 'pt_F2', 'pt_H2', 'pt_R1'];
  const NODE_NAMES = [null, 'support A', 'support B', 'B₂', 'G₂', 'C₂', 'K₂',
                      'D₂', 'J₂', 'E₂', 'I₂', 'F₂', 'H₂', 'apex'];
  function updateNode() {
    const n = Math.round(s.node);
    dw.selectDisk(n > 0 ? NODE_DISKS[n] : null);
    dw.setNodeInspector([10.5, 10.2], 0.85, n > 0 ? `node ${NODE_NAMES[n]}` : '', nodePoly());
  }

  let player = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    update();
    updateNode();
    player.apply(d, s);
  }

  player = makePlayer(STEPS, refresh);

  // ------------------------------------------------------------------
  // side panel + dragging
  // ------------------------------------------------------------------

  const view = panel.section('View');
  panel.button(view, 'zoom fit', () => dw.zoomFit());

  const par = panel.section('Parameters');
  panel.slider(par, s, 'Q', 'Q — wind load (kN)', 1, 5, 0.1, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 0.1, 0.5, 0.01, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 0.2, 2.5, 0.05, refresh);
  panel.slider(par, s, 'oR', 'offset resultant', 0, 1.2, 0.05, refresh);
  panel.slider(par, s, 'oRF', 'offset reaction forces', 0, 3, 0.05, refresh);
  panel.toggle(par, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.01, 0.0005, refresh);
  panel.toggle(par, s, 'lab', 'show labels (member numbers)', refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  panel.toggle(par, s, 'ph', 'show the photograph of the built tower', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node',
               'node (0 = off, 1 = A, 2 = B, 3–12 storey nodes, 13 = apex)',
               0, 13, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS, W: [...DEFAULTS.W], F1: [...DEFAULTS.F1] });
    panel.syncAll();
    refresh();
  });

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const hits = [
    ['B', () => d.B, 1, 99], ['C', () => [5, s.Cy], 1, 99],
    ['W', () => s.W, 2, 99], ['I', () => [s.ix, 3], 2, 99],
    ['F1', () => s.F1, 3, LEGS], ['G1', () => d.G1, 3, LEGS],
    ['H3', () => d.H3, 4, LEGS],
  ];
  dw.enableDrag(
    (wx, wy, tol) => {
      let best = null;
      for (const [name, get, k0, k1] of hits) {
        if (player.k < k0 || player.k >= k1) continue;
        const p = get();
        const dd = Math.hypot(p[0] - wx, p[1] - wy);
        if (dd < tol) { best = name; tol = dd; }
      }
      return best;
    },
    (name, wx, wy) => {
      if (name === 'B') s.Bx = clamp(wx, 5.7, 10);
      else if (name === 'C') s.Cy = clamp(wy, 6, 11.6);
      else if (name === 'W') s.W = [clamp(wx, 12.5, 16), clamp(wy, 2.2, 4.5)];
      else if (name === 'I') s.ix = clamp(wx, 3.2, 10);
      else if (name === 'F1') s.F1 = [wx, wy];
      else if (name === 'G1') s.G1x = clamp(wx, 8, 12.3);
      else if (name === 'H3') s.H3x = clamp(wx, GL + s.sLS, GR);
      refresh();
    },
  );

  // click a node of the tower to inspect it
  const nodeAt = [
    () => A, () => d.B, () => d.B2, () => d.G2, () => d.C2, () => d.K2,
    () => d.D2, () => d.J2, () => d.E2, () => d.I2, () => d.F2, () => d.H2,
    () => d.R1,
  ];
  dw.nodeSelect(
    nodeAt.map((get) => ({ at: get })),
    (i) => {
      s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
      panel.syncAll();
      refresh();
    },
  );

  refresh();
  return player;
}
