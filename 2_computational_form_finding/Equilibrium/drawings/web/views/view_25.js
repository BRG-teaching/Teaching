/**
 * Drawing view/25 "Tree structure"
 * (https://block.arch.ethz.ch/eq/drawing/view/25) as a step-by-step
 * construction.
 *
 * A tree grows under an inclined roof: ONE column carrying the whole load R,
 * then a bifurcation carrying R/2 + R/2 closed by a tie, then four branches,
 * then eight -- each refinement puts its new fork ON the previous branch
 * axis, and in the end the ROOF itself is the tie chain closing every canopy
 * node. The force diagram nests one pole per refinement (R -> Z1 -> B2/C2 ->
 * A2/D2/E2/G2) and every abandoned level's forces stay in the diagram.
 * The default node arrangement puts each storey on a roof-PARALLEL line
 * (the applet's "parallel" button); drag any fork along its branch axis.
 *
 * Live port of view_25/applet_0/geogebra.xml (667 objects, ~80 per-step
 * label texts resolved from their startPoint exps); the chain matches the
 * LIVE applet to ~1.1e-14 over 38 derived points in 6 states
 * (scratchpad/v25_regress.py). See notes/view_25_analysis.md.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 25 — Tree structure',
  subtitle: 'one column → two branches → four → eight; the roof is the tie',
  about: 'A tree structure grows under an inclined roof: one column carrying the whole load, then a bifurcation carrying R/2 + R/2 closed by a tie, then four branches, then eight — each refinement slides its new fork along the previous branch axis, and in the end the roof itself is the tie chain closing every canopy node. The force diagram nests one pole per refinement, and every abandoned level\'s forces stay visible. Drag the forks along their axes, the trunk base, or the roof edge — or return to the roof-parallel storey arrangement.',
  frame: [[2.2, 1.8], [18.9, 11.8]],
};

const CENTER = [7, 8.5];
const DFOOT = [7, 3];
const RAIL_E = [6, 10];                   // edgeleft rail (x = 3)
const RAIL_B = [3.1, 6.5];                // Base rail (x = 7)

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The roof and its load q', d: 'left: the inclined roof (dotted) always passes through the fixed center; the strip q is its load; dashed rails mark the draggable roof edge and trunk base; three thin dotted lines are the roof-parallel STOREYS the forks will sit on' },
  { t: 'One column', d: 'left: a single column 1 from the roof midpoint to the foot D carries everything, reaction A — right: the load line: R = 6 units, the column force 1 IS the load line (drag its top F₀)' },
  { t: 'Split in two', d: 'left: a trunk 1 up to the draggable Base, branches 2 and 3 out to the quarter-points, R/2 each — right: parallels to the branches through the ends of the load line meet at the pole: forces 2 and 3' },
  { t: 'The tie', d: 'left: the branches push outward — the roof section 4 between the load points must act as a TIE — right: the tie force 4 runs from the middle of the load line to the pole (roof-parallel)' },
  { t: 'Four branches', d: 'left: forks I₁ and J₁ slide ON the old branch axes (grey stubs remember them); branches 4–7 reach the roof eighth-points, R/4 each — right: one new pole per fork, forces 4–7; the old forces stay' },
  { t: 'The canopy ties', d: 'left: ties 8, 9, 10 close the four-branch canopy — right: each tie force runs from its load-line division to a pole (9 reuses the old tie force)' },
  { t: 'Eight branches', d: 'left: four more forks on the branch axes; leaves 8–15 reach all eight roof points, R/8 each — right: four new poles, forces 8–15 fan between the old ones' },
  { t: 'The roof is the tie', d: 'left: the tie chain 16–22 IS the roof: every piece between two hangers goes red — right: forces 16–22, each from a load-line division to its pole, all roof-parallel' },
  { t: 'Internal forces', d: 'blue = compression (branches), pink = tension (the roof ties); pipe widths ∝ member force; the loads take their final names F₁…F₈ — click any node (or use the slider) for its equilibrium' },
];

const R2_END = 5;                         // step-2 tree retires (applet step ≟ 2)
const R4_END = 7;                         // step-3 tree retires (applet step ≟ 3)
const RESOLVE = 9;

const DEFAULTS = {
  yEL: 7.25,                              // edgeleft height (reset P_5)
  yB: 4.5,                                // Base height (reset Q_5)
  F0: [15.5, 10],                         // load line top
  tI1: null, tJ1: null,                   // fork params on their axes
  tT1: null, tU1: null, tV1: null, tW1: null,   // null = "parallel"
  sFD: 1.1,                               // scaleForceDiagram [0.5, 1.5]
  offL: 0,                                // offsetLoads [0, 1]
  offR: 0.5,                              // offsetReactionForces [0, 1]
  sIF: 0.02,                              // scaleInternalForces [0, 0.05]
  o1: true,                               // internal-force pipes
  lbl: true,                              // showLabels
  n4: false,                              // show the poles (points)
  node: 0,
  _k: 99,
};

const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const clampT = (t) => Math.max(0.08, Math.min(0.92, t));

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const eL = [3, s.yEL];
  const eR = [2 * CENTER[0] - eL[0], 2 * CENTER[1] - eL[1]];
  const rdir = V.sub(eR, eL);
  const dv = (k) => lerp(eL, eR, k / 14);
  const [C, F, M, N, O, P] = [dv(1), dv(2), dv(3), dv(4), dv(5), dv(6)];
  const [Q, R, S, T, U, W] = [dv(8), dv(9), dv(10), dv(11), dv(12), dv(13)];
  const Base = [7, s.yB];
  const I = lerp(Base, CENTER, 1 / 3);
  const J = lerp(Base, CENTER, 2 / 3);

  // storey ("parallel") arrangement
  const pW = V.intersect(I, rdir, M, V.sub(Base, M));
  const pZ = V.intersect(I, rdir, Base, V.sub(T, Base));
  const onAx = (a, b, t, par) => (t === null ? par : lerp(a, b, clampT(t)));
  const I1 = onAx(M, Base, s.tI1, pW);
  const J1 = onAx(Base, T, s.tJ1, pZ);
  const pA1 = V.intersect(J, rdir, C, V.sub(I1, C));
  const pB1 = V.intersect(J, rdir, I1, V.sub(O, I1));
  const pC1 = V.intersect(J, rdir, R, V.sub(J1, R));
  const pD1 = V.intersect(J, rdir, J1, V.sub(W, J1));
  const T1 = onAx(C, I1, s.tT1, pA1);
  const U1 = onAx(I1, O, s.tU1, pB1);
  const V1 = onAx(R, J1, s.tV1, pC1);
  const W1 = onAx(J1, W, s.tW1, pD1);

  // force diagram: load line + nested poles
  const F0 = s.F0.slice();
  const F8 = [F0[0], F0[1] - 6 * s.sFD];
  const LL = [];
  for (let k = 0; k <= 8; k++) LL.push(lerp(F0, F8, k / 8));
  const Z1 = V.intersect(F0, V.sub(Base, M), F8, V.sub(T, Base));
  const B2 = V.intersect(F0, V.sub(I1, C), Z1, V.sub(O, I1));
  const C2 = V.intersect(F8, V.sub(W, J1), Z1, V.sub(J1, R));
  const A2 = V.intersect(F0, V.sub(T1, eL), B2, V.sub(F, T1));
  const D2 = V.intersect(B2, V.sub(U1, N), Z1, V.sub(P, U1));
  const E2 = V.intersect(Z1, V.sub(V1, Q), C2, V.sub(S, V1));
  const G2 = V.intersect(C2, V.sub(W1, U), F8, V.sub(eR, W1));

  // offsets
  const oLL = [[F0[0] - s.offL, F0[1]], [F0[0] - s.offL, F8[1]]];
  const B3 = [F0[0] - s.offR, F0[1]], C3 = [F0[0] - s.offR, F8[1]];

  // members: [key, form pair, force pair, number]
  const canopy = [eL, F, N, P, Q, S, U, eR];
  const poles = [A2, B2, D2, Z1, E2, C2, G2];
  const leaves = [
    ['lf8', [eL, T1], [F0, A2], 8], ['lf9', [T1, F], [A2, B2], 9],
    ['lf10', [N, U1], [B2, D2], 10], ['lf11', [U1, P], [D2, Z1], 11],
    ['lf12', [Q, V1], [Z1, E2], 12], ['lf13', [V1, S], [E2, C2], 13],
    ['lf14', [U, W1], [C2, G2], 14], ['lf15', [W1, eR], [G2, F8], 15],
  ];
  const roof = [];
  for (let i = 0; i < 7; i++) {
    roof.push([`roof${16 + i}`, [canopy[i], canopy[i + 1]], [LL[i + 1], poles[i]], 16 + i]);
  }
  const lvl2 = [
    ['a4', [T1, I1], [F0, B2], 4], ['b4', [I1, U1], [B2, Z1], 5],
    ['c4', [V1, J1], [Z1, C2], 6], ['d4', [J1, W1], [C2, F8], 7],
  ];

  const done = s._k >= RESOLVE;
  return { eL, eR, rdir, C, F, M, N, O, P, Q, R, S, T, U, W, Base, I, J,
           pW, pZ, pA1, pB1, pC1, pD1, I1, J1, T1, U1, V1, W1,
           F0, F8, LL, Z1, B2, C2, A2, D2, E2, G2, oLL, B3, C3,
           canopy, poles, leaves, roof, lvl2, done };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, F0: [...DEFAULTS.F0] };
  let d = compute(s);

  const SW = 0.035;
  const ARROW = { w: 0.055, headLen: 0.2, headW: 0.085 };
  const NUM = (nm, txt, opts) => dw.label(nm, txt, {
    cls: 'num', ...opts, when: (st) => st.lbl && (!opts.when || opts.when(st)) });

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });

  // ---- step 1: site --------------------------------------------------------
  dw.strokes('roofDots', 64, { intro: 1, w: 0.045, color: PAL.black, flash: false });
  dw.poly('qPoly', 4, { intro: 1, color: 0x009900, opacity: 0.1, flash: false });
  dw.strokes('qEdges', 4, { intro: 1, w: 0.03, color: 0x1d871d, flash: false });
  dw.label('lq', 'q', { intro: 1, color: 0x1d871d });
  dw.dashLine('railE', { intro: 1, dash: 0.12, color: PAL.grey, flash: false });
  dw.dashLine('railB', { intro: 1, dash: 0.12, color: PAL.grey, flash: false });
  dw.dashLine('ground', { intro: 1, dash: 0.12, color: PAL.grey, flash: false });
  for (const nm of ['storey0', 'storey1', 'storey2']) {
    dw.dashLine(nm, { intro: 1, dash: 0.05, color: 0x9a9a9a, flash: false });
  }
  dw.dashLine('axis1', { intro: 1, dash: 0.1, color: 0x9a9a9a, flash: false });
  dw.disk('pt_eL', { intro: 1, r: 0.055 });
  dw.disk('pt_eR', { intro: 1, r: 0.045 });
  dw.disk('pt_D', { intro: 1, r: 0.045, face: 0xbbbbbb, edge: 0x777777 });

  // ---- step 2: one column + the load line + the reaction A -----------------
  dw.seg('col1', { intro: 2, outro: 3, w: SW, color: PAL.blue });
  dw.disk('pt_T5', { intro: 2, outro: 3, r: 0.04, face: 0xbbbbbb, edge: 0x777777 });
  NUM('lcol1', '1', { intro: 2, outro: 3 });
  dw.arrow('aR', { intro: 2, outro: 3, ...ARROW });
  dw.label('laR', 'R', { cls: 'num', intro: 2, outro: 3, color: PAL.green });
  dw.seg('fLL', { intro: 2, w: SW, color: PAL.blue });
  NUM('lfLL', '1', { intro: 2 });
  dw.arrow('fR', { intro: 2, outro: 3, ...ARROW });
  dw.label('lfR', 'R', { cls: 'num', intro: 2, outro: 3, color: PAL.green });
  dw.disk('pt_F0', { intro: 2, r: 0.055 });
  dw.arrow('aA', { intro: 2, ...ARROW });
  dw.label('laA', 'A', { cls: 'num', intro: 2, color: PAL.green });
  dw.arrow('fA', { intro: 2, ...ARROW });
  dw.label('lfA', 'A', { cls: 'num', intro: 2, color: PAL.green });
  dw.dashLine('whiskT', { intro: 2, dash: 0.07, color: 0x2e8b2e, flash: false });
  dw.dashLine('whiskB', { intro: 2, dash: 0.07, color: 0x2e8b2e, flash: false });

  // ---- step 3: split in two ------------------------------------------------
  dw.disk('pt_Base', { intro: 3, r: 0.055 });
  dw.seg('trunk', { intro: 3, w: SW, color: PAL.blue });
  NUM('lN1', '1', { intro: 3 });
  dw.seg('br2a', { intro: 3, outro: R2_END, w: SW, color: PAL.blue });
  dw.seg('br2b', { intro: 3, outro: R2_END, w: SW, color: PAL.blue });
  NUM('lk2', '2', { intro: 3, outro: R2_END });
  NUM('lk3', '3', { intro: 3, outro: R2_END });
  dw.disk('pt_M', { intro: 3, outro: R2_END, r: 0.04, face: 0xbbbbbb, edge: 0x777777 });
  dw.disk('pt_T', { intro: 3, outro: R2_END, r: 0.04, face: 0xbbbbbb, edge: 0x777777 });
  for (let i = 0; i < 2; i++) {
    dw.arrow(`aR2_${i}`, { intro: 3, outro: R2_END, ...ARROW });
    dw.label(`laR2_${i}`, 'R/2', { cls: 'num', intro: 3, outro: R2_END, color: PAL.green });
    dw.arrow(`fR2_${i}`, { intro: 3, outro: R2_END, ...ARROW });
    dw.label(`lfR2_${i}`, 'R/2', { cls: 'num', intro: 3, outro: R2_END, color: PAL.green });
  }
  dw.dashLine('pp1a', { intro: 3, outro: 4, dash: 0.09, color: PAL.grey });
  dw.dashLine('pp1b', { intro: 3, outro: 4, dash: 0.09, color: PAL.grey });
  dw.disk('pt_Z1', { intro: 3, r: 0.04, face: 0x666666, edge: 0x666666,
          when: (st) => st.n4 });
  dw.seg('fb2', { intro: 3, w: SW, color: PAL.blue });
  dw.seg('fb3', { intro: 3, w: SW, color: PAL.blue });
  NUM('lfb2', '2', { intro: 3 });
  NUM('lfb3', '3', { intro: 3 });

  // ---- step 4: the tie -----------------------------------------------------
  dw.seg('tie1', { intro: 4, outro: R2_END, w: SW, color: PAL.red });
  NUM('ltie1', '4', { intro: 4, outro: R2_END });
  dw.seg('fm4', { intro: 4, w: SW, color: PAL.red });
  NUM('lfm4', '4', { intro: 4 });
  dw.dashLine('tl19', { intro: 4, dash: 0.05, color: 0x555555, flash: false });

  // ---- step 5: four branches ----------------------------------------------
  dw.disk('pt_I1', { intro: 5, r: 0.05 });
  dw.disk('pt_J1', { intro: 5, r: 0.05 });
  dw.seg('br_e4', { intro: 5, w: SW, color: PAL.blue });
  dw.seg('br_f5', { intro: 5, w: SW, color: PAL.blue });
  NUM('lb2', '2', { intro: 5 });
  NUM('lb3', '3', { intro: 5 });
  dw.dashLine('stubI', { intro: 5, dash: 0.1, color: 0xa0a0a0, flash: false });
  dw.dashLine('stubJ', { intro: 5, dash: 0.1, color: 0xa0a0a0, flash: false });
  for (const [i, nm] of [['0', 'q4'], ['1', 'r4'], ['2', 's4'], ['3', 't4']]) {
    dw.seg(nm, { intro: 5, outro: R4_END, w: SW, color: PAL.blue });
    NUM(`l${nm}`, `${4 + +i}`, { intro: 5, outro: R4_END });
    dw.disk(`pt_R4_${i}`, { intro: 5, outro: R4_END, r: 0.04, face: 0xbbbbbb, edge: 0x777777 });
    dw.arrow(`aR4_${i}`, { intro: 5, outro: R4_END, ...ARROW });
    dw.label(`laR4_${i}`, 'R/4', { cls: 'num', intro: 5, outro: R4_END, color: PAL.green });
    dw.arrow(`fR4_${i}`, { intro: 5, outro: R4_END, ...ARROW });
    dw.label(`lfR4_${i}`, 'R/4', { cls: 'num', intro: 5, outro: R4_END, color: PAL.green });
  }
  for (const nm of ['fb4', 'fb5', 'fb6', 'fb7']) {
    dw.seg(nm, { intro: 5, w: SW, color: PAL.blue });
    NUM(`l${nm}`, nm.slice(2), { intro: 5 });
  }
  dw.disk('pt_B2', { intro: 5, r: 0.04, face: 0x666666, edge: 0x666666, when: (st) => st.n4 });
  dw.disk('pt_C2', { intro: 5, r: 0.04, face: 0x666666, edge: 0x666666, when: (st) => st.n4 });

  // ---- step 6: the canopy ties --------------------------------------------
  dw.seg('tieM', { intro: 6, outro: R4_END, w: SW, color: PAL.red });
  dw.seg('tieK', { intro: 6, outro: R4_END, w: SW, color: PAL.red });
  dw.seg('tieL', { intro: 6, outro: R4_END, w: SW, color: PAL.red });
  NUM('ltieM', '8', { intro: 6, outro: R4_END });
  NUM('ltieK', '9', { intro: 6, outro: R4_END });
  NUM('ltieL', '10', { intro: 6, outro: R4_END });
  dw.seg('fq5', { intro: 6, w: SW, color: PAL.red });
  dw.seg('fr5', { intro: 6, w: SW, color: PAL.red });
  NUM('lfq5', '8', { intro: 6 });
  NUM('lfr5', '10', { intro: 6 });
  dw.dashLine('tl17', { intro: 6, dash: 0.05, color: 0x555555, flash: false });
  dw.dashLine('tl21', { intro: 6, dash: 0.05, color: 0x555555, flash: false });

  // ---- step 7: eight branches ---------------------------------------------
  for (const nm of ['T1', 'U1', 'V1', 'W1']) {
    dw.disk(`pt_${nm}`, { intro: 7, r: 0.05 });
    dw.dashLine(`stub${nm}`, { intro: 7, dash: 0.1, color: 0xa0a0a0, flash: false });
  }
  for (const [nm, num] of [['a4', 4], ['b4', 5], ['c4', 6], ['d4', 7]]) {
    dw.seg(`br_${nm}`, { intro: 7, w: SW, color: PAL.blue });
    NUM(`lbr_${nm}`, `${num}`, { intro: 7 });
  }
  for (let m = 8; m <= 15; m++) {
    dw.seg(`leaf${m}`, { intro: 7, w: SW, color: PAL.blue });
    NUM(`lleaf${m}`, `${m}`, { intro: 7 });
    dw.seg(`fs${m}`, { intro: 7, w: SW, color: PAL.blue });
    NUM(`lfs${m}`, `${m}`, { intro: 7 });
  }
  for (let i = 0; i < 8; i++) {
    dw.arrow(`aR8_${i}`, { intro: 7, ...ARROW });
    dw.label(`laR8_${i}`, 'R/8', { cls: 'num', intro: 7, color: PAL.green });
    dw.arrow(`fR8_${i}`, { intro: 7, ...ARROW });
    dw.label(`lfR8_${i}`, 'R/8', { cls: 'num', intro: 7, color: PAL.green });
  }
  for (let i = 1; i < 7; i++) {
    dw.disk(`pt_cn${i}`, { intro: 7, r: 0.04, face: 0xbbbbbb, edge: 0x777777 });
  }
  for (const nm of ['A2', 'D2', 'E2', 'G2']) {
    dw.disk(`pt_${nm}`, { intro: 7, r: 0.04, face: 0x666666, edge: 0x666666,
            when: (st) => st.n4 });
  }

  // ---- step 8: the roof is the tie ----------------------------------------
  for (let m = 16; m <= 22; m++) {
    dw.seg(`roof${m}`, { intro: 8, w: SW, color: PAL.red });
    NUM(`lroof${m}`, `${m}`, { intro: 8 });
  }
  for (const m of [16, 18, 20, 22]) {
    dw.seg(`ft${m}`, { intro: 8, w: SW, color: PAL.red });
    NUM(`lft${m}`, `${m}`, { intro: 8 });
    dw.dashLine(`tl${m}`, { intro: 8, dash: 0.05, color: 0x555555, flash: false });
  }

  // ---- step 9: internal-force pipes ---------------------------------------
  for (let m = 0; m < 22; m++) {
    dw.poly(`if${m}`, 4, { intro: RESOLVE, opacity: 0.4, flash: false,
      color: { pending: PAL.grey, final: (dd) => (m >= 15 ? PAL.red : PAL.blue) },
      when: (st) => st.o1 });
  }

  // node-equilibrium inspector
  dw.nodeInspector(4, { when: (st) => st.node > 0, w: 1.5 * SW,
                        headLen: 0.18, headW: 0.08, r: 0.075 });

  // dual pairs
  dw.link('col1', 'trunk', 'fLL', 'lcol1', 'lN1', 'lfLL');
  dw.link('aR', 'fR', 'laR', 'lfR');
  dw.link('aA', 'fA', 'laA', 'lfA');
  dw.link('br2a', 'br_e4', 'fb2', 'lk2', 'lb2', 'lfb2');
  dw.link('br2b', 'br_f5', 'fb3', 'lk3', 'lb3', 'lfb3');
  dw.link('tie1', 'tieK', 'roof19', 'fm4', 'tl19', 'ltie1', 'ltieK', 'lroof19', 'lfm4');
  dw.link('tieM', 'roof17', 'fq5', 'tl17', 'ltieM', 'lroof17', 'lfq5');
  dw.link('tieL', 'roof21', 'fr5', 'tl21', 'ltieL', 'lroof21', 'lfr5');
  dw.link('q4', 'br_a4', 'fb4', 'lq4', 'lbr_a4', 'lfb4');
  dw.link('r4', 'br_b4', 'fb5', 'lr4', 'lbr_b4', 'lfb5');
  dw.link('s4', 'br_c4', 'fb6', 'ls4', 'lbr_c4', 'lfb6');
  dw.link('t4', 'br_d4', 'fb7', 'lt4', 'lbr_d4', 'lfb7');
  for (let m = 8; m <= 15; m++) dw.link(`leaf${m}`, `fs${m}`, `lleaf${m}`, `lfs${m}`);
  for (const m of [16, 18, 20, 22]) {
    dw.link(`roof${m}`, `ft${m}`, `tl${m}`, `lroof${m}`, `lft${m}`);
  }
  for (let i = 0; i < 8; i++) dw.link(`aR8_${i}`, `fR8_${i}`, `laR8_${i}`, `lfR8_${i}`);

  // the complete force diagram appears as the ghost preview
  dw.ghostable('fLL', 'fb2', 'fb3', 'fb4', 'fb5', 'fb6', 'fb7', 'fm4', 'fq5',
               'fr5', 'fA', 'fs8', 'fs9', 'fs10', 'fs11', 'fs12', 'fs13',
               'fs14', 'fs15', 'ft16', 'ft18', 'ft20', 'ft22',
               ...Array.from({ length: 8 }, (_, i) => `fR8_${i}`));

  dw.instant('roofDots', 'qPoly', 'qEdges', 'railE', 'railB', 'ground',
             'storey0', 'storey1', 'storey2', 'axis1');

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function dots(a, b, n, dl) {
    const pairs = [];
    const L = V.dist(a, b), u = V.unit(V.sub(b, a));
    const period = L / n;
    for (let i = 0; i < n; i++) {
      const t0 = i * period;
      pairs.push([V.add(a, V.mul(u, t0)), V.add(a, V.mul(u, Math.min(t0 + dl, L)))]);
    }
    return pairs;
  }

  function update() {
    dw.setLabel('form_title', [3, 11.4]);
    dw.setLabel('force_title', [13.8, 11.4]);
    const { eL, eR, rdir } = d;
    const rslope = V.unit(rdir);

    dw.setStrokes('roofDots', dots(eL, eR, 64, 0.07));
    const I5 = [eL[0], eL[1] + 1.2], J5 = [eL[0], eL[1] + 1.7];
    const L5 = V.add(I5, V.mul(rdir, 1)), K5 = V.add(J5, V.mul(rdir, 1));
    dw.setPoly('qPoly', [J5, I5, L5, K5]);
    dw.setStrokes('qEdges', [[J5, I5], [I5, L5], [L5, K5], [K5, J5]]);
    dw.setLabel('lq', V.add(K5, [0.25, -0.25]));
    dw.setDashLine('railE', [[3, RAIL_E[0]], [3, RAIL_E[1]]]);
    dw.setDashLine('railB', [[7, RAIL_B[0]], [7, RAIL_B[1]]]);
    dw.setDashLine('ground', [[6, 3], [8, 3]]);
    const clipL = V.add(eL, V.mul(rslope, 0.4));
    const clipR = V.sub(eR, V.mul(rslope, 0.4));
    for (const [nm, at] of [['storey0', d.Base], ['storey1', d.pW], ['storey2', d.pA1]]) {
      const a = V.intersect(at, rdir, clipL, [0, 1]);
      const b = V.intersect(at, rdir, clipR, [0, 1]);
      dw.setDashLine(nm, [a, b]);
    }
    const T5 = V.mid(eL, eR);
    dw.setDashLine('axis1', [T5, DFOOT]);
    dw.setDisk('pt_eL', eL);
    dw.setDisk('pt_eR', eR);
    dw.setDisk('pt_D', DFOOT);

    // step 2
    dw.setSeg('col1', T5, DFOOT);
    dw.setDisk('pt_T5', T5);
    dw.setLabel('lcol1', V.add(V.mid(T5, DFOOT), [0.22, 0]));
    dw.setArrow('aR', [CENTER[0], CENTER[1] + 0.8], [CENTER[0], CENTER[1] + 0.1]);
    dw.setLabel('laR', [CENTER[0] - 0.32, CENTER[1] + 0.45]);
    dw.setSeg('fLL', d.F0, d.F8);
    dw.setLabel('lfLL', [d.F0[0] + 0.22, d.LL[4][1] + 0.28]);
    dw.setArrow('fR', d.oLL[0], d.oLL[1]);
    dw.setLabel('lfR', [d.oLL[0][0] - 0.35, (d.oLL[0][1] + d.oLL[1][1]) / 2]);
    dw.setDisk('pt_F0', d.F0);
    dw.setArrow('aA', [7, 2.1], [7, 2.9]);
    dw.setLabel('laA', [6.72, 2.5]);
    dw.setArrow('fA', d.C3, d.B3);
    dw.setLabel('lfA', [d.B3[0] - 0.3, (d.B3[1] + d.C3[1]) / 2]);
    dw.setDashLine('whiskT', [d.F0, d.B3]);
    dw.setDashLine('whiskB', [d.F8, d.C3]);

    // step 3
    dw.setDisk('pt_Base', d.Base);
    dw.setSeg('trunk', d.Base, DFOOT);
    dw.setLabel('lN1', V.add(V.mid(d.Base, DFOOT), [0.22, 0]));
    dw.setSeg('br2a', d.M, d.Base);
    dw.setSeg('br2b', d.Base, d.T);
    dw.setLabel('lk2', V.add(V.mid(d.M, d.Base), [-0.25, 0.05]));
    dw.setLabel('lk3', V.add(V.mid(d.Base, d.T), [0.28, 0]));
    dw.setDisk('pt_M', d.M);
    dw.setDisk('pt_T', d.T);
    const loadArrow = (nm, at) => {
      dw.setArrow(nm, [at[0], at[1] + 0.8], [at[0], at[1] + 0.1]);
      dw.setLabel(`l${nm}`, [at[0] + 0.3, at[1] + 0.62]);
    };
    loadArrow('aR2_0', d.M);
    loadArrow('aR2_1', d.T);
    dw.setArrow('fR2_0', d.oLL[0], V.mid(d.oLL[0], d.oLL[1]));
    dw.setArrow('fR2_1', V.mid(d.oLL[0], d.oLL[1]), d.oLL[1]);
    dw.setLabel('lfR2_0', [d.oLL[0][0] - 0.42, d.LL[2][1]]);
    dw.setLabel('lfR2_1', [d.oLL[0][0] - 0.42, d.LL[6][1]]);
    const ext = (a, b, e) => V.add(b, V.mul(V.unit(V.sub(b, a)), e));
    dw.setDashLine('pp1a', [d.F0, ext(d.F0, d.Z1, 0.35)]);
    dw.setDashLine('pp1b', [d.F8, ext(d.F8, d.Z1, 0.35)]);
    dw.setDisk('pt_Z1', d.Z1);
    dw.setSeg('fb2', d.F0, d.Z1);
    dw.setSeg('fb3', d.F8, d.Z1);
    dw.setLabel('lfb2', V.add(V.mid(d.F0, d.Z1), [0.1, 0.22]));
    dw.setLabel('lfb3', V.add(V.mid(d.F8, d.Z1), [0.12, -0.22]));

    // step 4
    dw.setSeg('tie1', d.M, d.T);
    dw.setLabel('ltie1', V.add(V.mid(d.M, d.T), [-0.05, 0.26]));
    dw.setSeg('fm4', d.LL[4], d.Z1);
    dw.setLabel('lfm4', V.add(V.mid(d.LL[4], d.Z1), [0.02, 0.24]));
    dw.setDashLine('tl19', [d.LL[4], ext(d.LL[4], d.Z1, 0.4)]);

    // step 5
    dw.setDisk('pt_I1', d.I1);
    dw.setDisk('pt_J1', d.J1);
    dw.setSeg('br_e4', d.I1, d.Base);
    dw.setSeg('br_f5', d.Base, d.J1);
    dw.setLabel('lb2', V.add(V.mid(d.I1, d.Base), [-0.26, 0]));
    dw.setLabel('lb3', V.add(V.mid(d.Base, d.J1), [0.28, -0.05]));
    dw.setDashLine('stubI', [d.M, d.I1]);
    dw.setDashLine('stubJ', [d.T, d.J1]);
    const l3 = [[d.I1, d.C], [d.I1, d.O], [d.J1, d.R], [d.J1, d.W]];
    const l3n = ['q4', 'r4', 's4', 't4'];
    const l3load = [d.C, d.O, d.R, d.W];
    for (let i = 0; i < 4; i++) {
      dw.setSeg(l3n[i], l3[i][0], l3[i][1]);
      dw.setLabel(`l${l3n[i]}`, V.add(V.mid(l3[i][0], l3[i][1]), i < 2 ? [-0.24, 0] : [0.26, 0]));
      dw.setDisk(`pt_R4_${i}`, l3load[i]);
      loadArrow(`aR4_${i}`, l3load[i]);
    }
    for (let i = 0; i < 4; i++) {
      dw.setArrow(`fR4_${i}`, lerp(d.oLL[0], d.oLL[1], i / 4), lerp(d.oLL[0], d.oLL[1], (i + 1) / 4));
      dw.setLabel(`lfR4_${i}`, [d.oLL[0][0] - 0.42, d.LL[2 * i + 1][1]]);
    }
    const fb = [['fb4', d.F0, d.B2], ['fb5', d.B2, d.Z1], ['fb6', d.Z1, d.C2], ['fb7', d.C2, d.F8]];
    for (const [nm, a, b] of fb) {
      dw.setSeg(nm, a, b);
      dw.setLabel(`l${nm}`, V.add(V.mid(a, b), [0.14, 0.2]));
    }
    dw.setDisk('pt_B2', d.B2);
    dw.setDisk('pt_C2', d.C2);

    // step 6
    dw.setSeg('tieM', d.C, d.O);
    dw.setSeg('tieK', d.O, d.R);
    dw.setSeg('tieL', d.R, d.W);
    dw.setLabel('ltieM', V.add(V.mid(d.C, d.O), [-0.1, 0.26]));
    dw.setLabel('ltieK', V.add(V.mid(d.O, d.R), [-0.1, 0.26]));
    dw.setLabel('ltieL', V.add(V.mid(d.R, d.W), [-0.1, 0.26]));
    dw.setSeg('fq5', d.LL[2], d.B2);
    dw.setSeg('fr5', d.LL[6], d.C2);
    dw.setLabel('lfq5', V.add(V.mid(d.LL[2], d.B2), [0, 0.24]));
    dw.setLabel('lfr5', V.add(V.mid(d.LL[6], d.C2), [0, 0.24]));
    dw.setDashLine('tl17', [d.LL[2], ext(d.LL[2], d.B2, 0.4)]);
    dw.setDashLine('tl21', [d.LL[6], ext(d.LL[6], d.C2, 0.4)]);

    // step 7
    const forks = { T1: d.T1, U1: d.U1, V1: d.V1, W1: d.W1 };
    const stubTo = { T1: d.C, U1: d.O, V1: d.R, W1: d.W };
    for (const nm of ['T1', 'U1', 'V1', 'W1']) {
      dw.setDisk(`pt_${nm}`, forks[nm]);
      dw.setDashLine(`stub${nm}`, [forks[nm], stubTo[nm]]);
    }
    for (const [nm, pair] of [['a4', [d.T1, d.I1]], ['b4', [d.I1, d.U1]],
                              ['c4', [d.V1, d.J1]], ['d4', [d.J1, d.W1]]]) {
      dw.setSeg(`br_${nm}`, pair[0], pair[1]);
      dw.setLabel(`lbr_${nm}`, V.add(V.mid(pair[0], pair[1]),
        nm < 'c' ? [-0.26, -0.05] : [0.28, -0.05]));
    }
    for (const [key, form, force, num] of d.leaves) {
      const m = num;
      dw.setSeg(`leaf${m}`, form[0], form[1]);
      dw.setLabel(`lleaf${m}`, V.add(V.mid(form[0], form[1]), m <= 11 ? [-0.2, 0.14] : [0.22, 0.14]));
      dw.setSeg(`fs${m}`, force[0], force[1]);
      dw.setLabel(`lfs${m}`, V.add(V.mid(force[0], force[1]), [0.2, m <= 11 ? 0.16 : -0.16]));
    }
    for (let i = 0; i < 8; i++) {
      loadArrow(`aR8_${i}`, d.canopy[i]);
      dw.setText(`laR8_${i}`, s._k >= RESOLVE ? `F${'₁₂₃₄₅₆₇₈'[i]}` : 'R/8');
      dw.setArrow(`fR8_${i}`, lerp(d.oLL[0], d.oLL[1], i / 8), lerp(d.oLL[0], d.oLL[1], (i + 1) / 8));
      dw.setLabel(`lfR8_${i}`, [d.oLL[0][0] - 0.42, d.LL[i][1] + (d.LL[1][1] - d.LL[0][1]) / 2]);
      dw.setText(`lfR8_${i}`, s._k >= RESOLVE ? `F${'₁₂₃₄₅₆₇₈'[i]}` : 'R/8');
    }
    for (let i = 1; i < 7; i++) dw.setDisk(`pt_cn${i}`, d.canopy[i]);
    dw.setDisk('pt_A2', d.A2);
    dw.setDisk('pt_D2', d.D2);
    dw.setDisk('pt_E2', d.E2);
    dw.setDisk('pt_G2', d.G2);

    // step 8
    for (const [key, form, force, num] of d.roof) {
      dw.setSeg(key, form[0], form[1]);
      dw.setLabel(`l${key}`, V.add(V.mid(form[0], form[1]), [0.05, 0.26]));
    }
    dw.setText('lfm4', s._k >= 8 ? '19' : s._k >= 6 ? '9' : '4');
    dw.setText('lfq5', s._k >= 8 ? '17' : '8');
    dw.setText('lfr5', s._k >= 8 ? '21' : '10');
    for (const m of [16, 18, 20, 22]) {
      const [, , force] = d.roof[m - 16];
      dw.setSeg(`ft${m}`, force[0], force[1]);
      dw.setLabel(`lft${m}`, V.add(V.mid(force[0], force[1]), [0, 0.24]));
      dw.setDashLine(`tl${m}`, [force[0], ext(force[0], force[1], 0.4)]);
    }

    // pipes
    const members = [
      [[d.Base, DFOOT], [d.F8, d.F0]],
      [[d.I1, d.Base], [d.F0, d.Z1]], [[d.Base, d.J1], [d.Z1, d.F8]],
      ...d.lvl2.map((m) => [m[1], m[2]]),
      ...d.leaves.map((m) => [m[1], m[2]]),
      ...d.roof.map((m) => [m[1], m[2]]),
    ];
    members.forEach(([form, force], i) => {
      dw.setPoly(`if${i}`, V.rectPoints(form[0], form[1], s.sIF * V.dist(force[0], force[1])));
    });
  }

  // ------------------------------------------------------------------
  // node-equilibrium inspector: 1-8 canopy nodes (left to right), 9-12
  // forks T1/U1/V1/W1, 13/14 forks I1/J1, 15 Base, 16 foot D.
  // ------------------------------------------------------------------
  function nodeInfo() {
    const n = Math.round(s.node);
    const { LL, poles, F0, F8, Z1, B2, C2, A2, D2, E2, G2 } = d;
    if (n >= 1 && n <= 8) {
      const i = n - 1;
      if (i === 0) return { pos: d.canopy[0], title: 'canopy node',
        sides: [[F0, LL[1]], [LL[1], A2], [A2, F0]] };
      if (i === 7) return { pos: d.canopy[7], title: 'canopy node',
        sides: [[LL[7], F8], [F8, G2], [G2, LL[7]]] };
      return { pos: d.canopy[i], title: 'canopy node',
        sides: [[LL[i], LL[i + 1]], [LL[i + 1], poles[i]],
                [poles[i], poles[i - 1]], [poles[i - 1], LL[i]]] };
    }
    if (n >= 9 && n <= 12) {
      const tri = [
        [d.T1, [[F0, A2], [A2, B2], [B2, F0]]],
        [d.U1, [[B2, D2], [D2, Z1], [Z1, B2]]],
        [d.V1, [[Z1, E2], [E2, C2], [C2, Z1]]],
        [d.W1, [[C2, G2], [G2, F8], [F8, C2]]],
      ][n - 9];
      return { pos: tri[0], title: 'fork', sides: tri[1] };
    }
    if (n === 13) return { pos: d.I1, title: 'fork I₁',
      sides: [[F0, B2], [B2, Z1], [Z1, F0]] };
    if (n === 14) return { pos: d.J1, title: 'fork J₁',
      sides: [[Z1, C2], [C2, F8], [F8, Z1]] };
    if (n === 15) return { pos: d.Base, title: 'Base',
      sides: [[F0, Z1], [Z1, F8], [F8, F0]] };
    return { pos: DFOOT, title: 'foot D',
      sides: [[d.F0, d.F8], [d.C3, d.B3]] };
  }

  function updateNode() {
    const n = Math.round(s.node);
    const info = nodeInfo();
    dw.selectDisk(n === 1 ? 'pt_eL' : n === 8 ? 'pt_eR'
      : n >= 9 && n <= 12 ? `pt_${['T1', 'U1', 'V1', 'W1'][n - 9]}`
      : n === 13 ? 'pt_I1' : n === 14 ? 'pt_J1' : n === 15 ? 'pt_Base'
      : n === 16 ? 'pt_D' : null);
    dw.setNodeInspector(info.pos, 0.55, n > 0 ? info.title : '', info.sides);
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
  panel.slider(par, s, 'sFD', 'scale force diagram', 0.5, 1.5, 0.05, refresh);
  panel.slider(par, s, 'offL', 'offset loads', 0, 1, 0.05, refresh);
  panel.slider(par, s, 'offR', 'offset reaction force', 0, 1, 0.05, refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.05, 0.005, refresh);
  panel.toggle(par, s, 'o1', 'internal-force pipes', refresh);
  panel.toggle(par, s, 'lbl', 'show labels', refresh);
  panel.toggle(par, s, 'n4', 'show the poles', refresh);
  panel.button(par, 'set parallel', () => {
    Object.assign(s, { tI1: null, tJ1: null, tT1: null, tU1: null, tV1: null, tW1: null });
    refresh();
  });
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node',
               'node (0 = off, 1–8 canopy, 9–14 forks, 15 Base, 16 foot)',
               0, 16, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS, F0: [...DEFAULTS.F0] });
    panel.syncAll();
    refresh();
  });

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const hits = [
    ['eL', () => d.eL, 1, 99],
    ['F0', () => d.F0, 2, 99],
    ['Base', () => d.Base, 3, 99],
    ['I1', () => d.I1, 5, 99], ['J1', () => d.J1, 5, 99],
    ['T1', () => d.T1, 7, 99], ['U1', () => d.U1, 7, 99],
    ['V1', () => d.V1, 7, 99], ['W1', () => d.W1, 7, 99],
  ];
  const axisOf = {
    I1: () => [d.M, d.Base], J1: () => [d.Base, d.T],
    T1: () => [d.C, d.I1], U1: () => [d.I1, d.O],
    V1: () => [d.R, d.J1], W1: () => [d.J1, d.W],
  };
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
      if (name === 'eL') s.yEL = clamp(wy, RAIL_E[0], RAIL_E[1]);
      else if (name === 'Base') s.yB = clamp(wy, RAIL_B[0], RAIL_B[1]);
      else if (name === 'F0') s.F0 = [clamp(wx, 13.6, 17.2), clamp(wy, 8.6, 11.2)];
      else {
        const [a, b] = axisOf[name]();
        const ab = V.sub(b, a);
        const t = V.dot(V.sub([wx, wy], a), ab) / V.dot(ab, ab);
        s[`t${name}`] = clampT(t);
      }
      refresh();
    },
  );

  // click a node to inspect it
  const nodeAt = [];
  for (let n = 1; n <= 16; n++) {
    nodeAt.push({ at: () => {
      if (n <= 8) return d.canopy[n - 1];
      if (n <= 12) return [d.T1, d.U1, d.V1, d.W1][n - 9];
      if (n === 13) return d.I1;
      if (n === 14) return d.J1;
      if (n === 15) return d.Base;
      return DFOOT;
    } });
  }
  dw.nodeSelect(nodeAt, (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
