/**
 * Drawing view/48 "Internal forces in a beam – superposition"
 * (https://block.arch.ethz.ch/eq/drawing/view/48) as a step-by-step
 * construction: a simply supported beam (l = 10 m) under a uniform load q
 * PLUS two movable point loads F1 (stations 1-5) and F2 (stations 6-10).
 * Superposition happens directly on the load line: each of the ten strips
 * weighs q * 1 m, and where a point load stands its strip simply grows to
 * q + F -- one funicular construction carries both load cases at once.
 * A grey trial funicular from pole o' (distance H left) gives the division
 * point l -> reactions; the mirror pole o at distance H RIGHT of the load
 * line AT THE LEVEL OF l closes its funicular horizontally, so the black
 * polygon drawn from the M baseline IS the moment curve (scale M/H), and
 * the red M-diagram = trial ordinates x sFD x H reads 1 unit :: 1 kNm.
 * The V-diagram slopes at -q and drops by F1 and F2 under the loads.
 *
 * Live port of view_48/applet_0/geogebra.xml + page.html's moveLoad snap.
 * Regression vs the live applet: ~1.2e-14 over 69 points in four states.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 48 — Internal forces in a beam: superposition',
  subtitle: 'uniform load q + two movable point loads in ONE construction',
  about: 'A simply supported beam carries a uniform load q and two point loads that can slide along the stations. Superposition happens on the load line itself: each strip weighs q·1 m, and where a point load stands its strip grows to q + F — one funicular construction gives reactions, V- and M-diagrams for the combined case. The mirror pole o at the level of the division point l closes the moment funicular exactly on the baseline.',
  frame: [[-6.5, -14.6], [24.5, 4.4]],
};

const RED = 0xff0000;                     // the applet's V/M/H red
const SPAN = 10;
const Y = {
  L1: 2.499440925505228,                  // load band top
  V: 1.9555125023234479,                  // load band bottom
  R: 1.300325029110869,                   // resultant level (N_1/S1) + top clip
  S2: -13.555013640824177,                // bottom clip
  DIM: -1.4546314161785183,               // dimension line l = 10
  SL: 0.6696723488639007,                 // single-loads row (F_1 on d)
};
const RESOLVE = 19;

const DEFAULTS = {
  llx: 18.55892880518911,                 // load line top a (LL0)
  lly: 1.2985368632170509,
  yPole: -2.7322643011938474,             // trial pole o' on its vertical
  yFP0: -4.1445442950068445,              // trial funicular start
  yI: -6.938507804591234,                 // V baseline level
  yK: -10,                                // M baseline level
  yO: -7.395612431701182,                 // level of the two H segments
  F1: 0.2,                                // [0, 0.6] kN
  p1: 1,                                  // positionF1: strip 1..5
  F2: 0.2,                                // [0, 0.6] kN
  p2: 10,                                 // positionF2: strip 6..10
  H: 4,                                   // pole distance [1, 5] units
  sFD: 0.30000000000000004,               // scaleForceDiagram [0.1, 5]
  sLS: 0.5,                               // scaleLoadSymbol [0.3, 0.8]
  off: 0.5,                               // scaleOffsetReactionForces [0, 1]
  sl: false,                              // show single loads
  bow: false,                             // show Bow notation
  n4: true,                               // show points
  node: 0,
};
const Q = 0.2;                            // loadP -- fixed in the applet (hidden slider)

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The beam', d: 'left: a simply supported beam A–B, l = 10 m — this time the supports sit at the very ends' },
  { t: 'The line load q', d: 'left: a uniform line load q = 0.2 kN/m covers the whole beam; the dotted station lines cut it into ten strips of 1 m' },
  { t: 'Two point loads', d: 'left: two extra point loads F₁ and F₂ stand on the stations (move them with the position sliders!) — their lines of action are dashed' },
  { t: 'Superposition on the load line', d: 'right: the ten strips laid off tip-to-tail: a, b, … k — where a point load stands its strip simply GROWS to q + F₁ / q + F₂; all together they span R' },
  { t: 'Trial pole o′ at distance H', d: 'right: choose a pole o′ on the vertical at distance H to the LEFT of the load line (red segment H below)' },
  { t: 'Rays a…k → o′', d: 'right: the eleven rays from the load line to the trial pole' },
  { t: 'The trial funicular', d: 'left: from any start FP₀ on the left support vertical, draw each string parallel to its ray, station by station, to the right support vertical' },
  { t: 'Closing the trial → R', d: 'left: the dashed closing line connects the two ends; extending the OUTER strings locates the resultant R of all loads at their crossing' },
  { t: 'Division point l', d: 'right: the parallel to the closing line through o′ cuts the load line at l — the reaction split for q, F₁ and F₂ together' },
  { t: 'Reactions A and B', d: 'right: l splits the load line: A = l→a and B = k→l, offset beside it — left: the same forces push up at the two supports' },
  { t: 'V-diagram — the baseline', d: 'left: the shear baseline under the beam; V runs from support to support' },
  { t: 'V-diagram — jump A, slope −q, drop F₁', d: 'left: at A the shear jumps up by A, then falls at slope −q; under F₁ it drops by F₁ — right: the segment l→a' },
  { t: 'V-diagram — drop F₂, close with B', d: 'left: falling further it drops by F₂ under the second load and the reaction B closes it at the right support — right: the segment k→l' },
  { t: 'The mirror pole o', d: 'right: place a second pole o at distance H to the RIGHT of the load line, exactly AT THE LEVEL OF l — the closing ray o–l is horizontal' },
  { t: 'M-diagram — the baseline', d: 'left: the moment baseline: because o sits at the level of l, the funicular of pole o will close exactly on this horizontal — the dual of the ray o–l' },
  { t: 'The moment funicular', d: 'right: thin rays from the load line to o — left: from the baseline start, strings parallel to them; the polygon returns to the baseline at the right support' },
  { t: 'Ordinates y on the trial', d: 'left: measure the ordinate y between the grey trial funicular and its closing line at every station' },
  { t: 'M = H · y', d: 'left: each ordinate scaled by H (× the force scale) and hung from the baseline: the red M-diagram (1 unit :: 1 kNm) — the black funicular is the SAME curve at scale M/H' },
  { t: 'Superposition', d: 'slide F₁ and F₂ along the stations, change their size, q stays — one construction updates reactions, V and M at once; click a kink of the moment funicular for its equilibrium' },
];

function interX(p, dir, x) {
  const t = (x - p[0]) / (dir[0] || 1e-12);
  return [x, p[1] + t * dir[1]];
}

// the construction (mirrors applet_0/geogebra.xml + moveLoad1/2)
function compute(s) {
  const A = [0, 0], B = [SPAN, 0];
  const xE = s.p1 - 0.5, xG = s.p2 - 0.5;                       // load stations
  const LL = [[s.llx, s.lly]];
  for (let k = 1; k <= 10; k++) {
    const w = Q + (k === s.p1 ? s.F1 : 0) + (k === s.p2 ? s.F2 : 0);
    LL.push([s.llx, LL[k - 1][1] - w / s.sFD]);
  }
  const pole = [s.llx - s.H, s.yPole];

  // grey trial funicular between the support verticals
  const segd = LL.map((p) => V.sub(pole, p));
  const FP = [[0, s.yFP0]];
  for (let k = 0; k < 10; k++) FP.push(interX(FP[k], segd[k], 0.5 + k));
  const C = interX(FP[10], segd[10], SPAN);
  const cd = V.sub(C, FP[0]);
  const D = interX(pole, cd, s.llx);                            // division point l
  const M1 = V.intersect(FP[0], segd[0], C, segd[10]) || [SPAN / 2, 0]; // R crossing

  // mirror pole o at the level of l; moment funicular from the baseline
  const pole2 = [s.llx + s.H, D[1]];
  const segB = LL.map((p) => V.sub(pole2, p));
  const FPB = [[0, s.yK]];
  for (let k = 0; k < 10; k++) FPB.push(interX(FPB[k], segB[k], 0.5 + k));
  const U = interX(FPB[10], segB[10], SPAN);

  // M ordinates from the trial, scaled to kNm
  const ords = [];
  for (let k = 1; k <= 10; k++) {
    const x = 0.5 + (k - 1);
    const FG = interX(FP[0], cd, x);
    ords.push({ x, FG, FP: FP[k], MP: [x, s.yK + (FG[1] - FP[k][1]) * s.sFD * s.H] });
  }

  const Akn = (LL[0][1] - D[1]) * s.sFD;
  const Bkn = (D[1] - LL[10][1]) * s.sFD;
  const Rkn = 10 * Q + s.F1 + s.F2;

  // V-diagram
  const I = [0, s.yI], L = [SPAN, s.yI];
  const VP1 = [0, s.yI + Akn];
  const VP2 = [xE, VP1[1] - Q * xE];
  const VP3 = [xE, VP2[1] - s.F1];
  const VP4 = [xG, VP3[1] - Q * (xG - xE)];
  const VP5 = [xG, VP4[1] - s.F2];
  const Sv = [SPAN, s.yI - Bkn];

  // H segments + offset reaction chain
  const O = [s.llx, s.yO];
  const Ph = [pole[0], s.yO], Qh = [pole2[0], s.yO];
  const J1 = [s.llx + s.off, LL[0][1]];
  const K1 = [s.llx + s.off, D[1]];
  const L1o = [s.llx + s.off, LL[10][1]];

  return { A, B, xE, xG, LL, pole, FP, C, cd, D, M1, pole2, segB, FPB, U, ords,
           Akn, Bkn, Rkn, I, L, VP1, VP2, VP3, VP4, VP5, Sv, O, Ph, Qh, J1, K1, L1o };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);

  const W_BAR = 0.13;                     // th3
  const W_MEM = 0.09;                     // th2
  const W_THIN = 0.05;                    // th1 rays to o
  const ARROW = { w: 0.17, headLen: 0.48, headW: 0.21 };

  dw.label('t_form', 'Form Diagram', { cls: 'title', flash: false, intro: 1 });
  dw.label('t_form2', '1 unit :: 1 m', { flash: false, intro: 1 });
  dw.label('t_force', 'Force Diagram', { cls: 'title', flash: false, intro: 4 });
  dw.label('t_force2', '', { flash: false, intro: 4 });
  dw.label('roq', '', { flash: false, intro: 2 });
  dw.label('t_trial', 'Trial Funicular', { cls: 'title', flash: false, intro: 7 });
  dw.label('t_trial2', 'Construction', { flash: false, intro: 7 });
  dw.label('t_v', 'V Diagram', { cls: 'title', flash: false, intro: 11 });
  dw.label('t_v2', '1 unit :: 1 kN', { flash: false, intro: 11 });
  dw.label('t_m', 'M Diagram', { cls: 'title', flash: false, intro: 15 });
  dw.label('t_m2', '1 unit :: 1 kNm', { flash: false, intro: 15 });

  // step 1: beam + edge verticals + dimension
  dw.seg('beam', { intro: 1, w: W_BAR });
  dw.dashLine('vx0', { intro: 1, dash: 0.25, color: PAL.black });
  dw.dashLine('vx10', { intro: 1, dash: 0.25, color: PAL.black });
  dw.seg('dim', { intro: 1, w: 0.045, color: PAL.grey, flash: false });
  dw.strokes('dimT', 4, { intro: 1, w: 0.045, color: PAL.grey, flash: false });
  dw.label('lblDim', 'l = 10', { intro: 1, color: PAL.grey });

  // step 2: the load band + stations
  dw.poly('qpoly', 4, { intro: 2, opacity: 0.16, color: PAL.green, flash: false });
  dw.strokes('qedge', 4, { intro: 2, w: 0.05, color: PAL.green });
  dw.label('lblq', 'q', { intro: 2, color: PAL.green });
  for (let i = 0; i < 10; i++) dw.dashLine(`st${i}`, { intro: 2, dash: 0.2, color: PAL.black });
  const slOn = (st) => st.sl;
  for (let i = 0; i < 10; i++) dw.arrow(`sl${i}`, { intro: 2, w: 0.12, headLen: 0.32, headW: 0.15, when: slOn });

  // step 3: the two point loads (on the stations)
  const f1On = () => s.F1 !== 0, f2On = () => s.F2 !== 0;
  dw.arrow('ldF1', { intro: 3, ...ARROW, when: f1On });
  dw.arrow('ldF2', { intro: 3, ...ARROW, when: f2On });
  dw.label('lblF1', 'F₁', { intro: 3, color: PAL.green, when: f1On });
  dw.label('lblF2', 'F₂', { intro: 3, color: PAL.green, when: f2On });
  dw.dashLine('vF1', { intro: 3, dash: 0.25, color: PAL.black, when: f1On });
  dw.dashLine('vF2', { intro: 3, dash: 0.25, color: PAL.black, when: f2On });

  // step 4: the load line with fattened strips + R on it
  dw.arrow('Rforce', { intro: 4, w: 0.2, headLen: 0.55, headW: 0.25 });
  dw.label('lblRo', 'R', { intro: 4, color: PAL.green });
  dw.label('lblqF1', 'q+F₁', { intro: 4, color: PAL.green, when: f1On });
  dw.label('lblqF2', 'q+F₂', { intro: 4, color: PAL.green, when: f2On });
  dw.highlight('ldF1', [4]);
  dw.highlight('ldF2', [4]);

  // step 5: trial pole o' + left H segment
  dw.seg('segHl', { intro: 5, w: W_BAR, color: RED });
  dw.label('lblHl', 'H', { intro: 5, color: RED });
  dw.dashLine('gd1', { intro: 5, dash: 0.25, color: PAL.black });  // LL10 -> O
  dw.dashLine('gm', { intro: 5, dash: 0.25, color: PAL.black });   // pole -> P
  dw.label('lbl_op', 'o′', { cls: 'point', intro: 5 });

  // step 6: rays to o'
  for (let i = 0; i <= 10; i++) dw.seg(`ray${i}`, { intro: 6, w: W_MEM, color: PAL.grey });

  // step 7: the trial funicular
  for (let i = 0; i <= 10; i++) dw.seg(`fun${i}`, { intro: 7, w: W_MEM, color: PAL.grey });
  for (let i = 0; i <= 10; i++) dw.highlight(`ray${i}`, [7]);
  dw.label('lbl_FP0', 'FP₀', { cls: 'point', intro: 7 });

  // step 8: closing + the resultant through the outer-string crossing
  dw.dashLine('closing', { intro: 8, dash: 0.5 });
  dw.arrow('Rform', { intro: 8, ...ARROW });
  dw.label('lblRf', 'R', { intro: 8, color: PAL.green });
  dw.dashLine('vRf', { intro: 8, dash: 0.2, color: PAL.black });

  // step 9: division point l
  dw.dashLine('ga1', { intro: 9, dash: 0.5 });                  // pole -> D (grey)
  dw.label('lbl_l', 'l', { cls: 'point', intro: 9 });
  dw.highlight('closing', [9]);

  // step 10: reactions + offset chain
  dw.arrow('reA', { intro: 10, ...ARROW });
  dw.arrow('reB', { intro: 10, ...ARROW });
  dw.label('lblAf', 'A', { intro: 10, color: PAL.green });
  dw.label('lblBf', 'B', { intro: 10, color: PAL.green });
  dw.arrow('ofB', { intro: 10, ...ARROW });
  dw.arrow('ofA', { intro: 10, ...ARROW });
  dw.label('lblAo', 'A', { intro: 10, color: PAL.green });
  dw.label('lblBo', 'B', { intro: 10, color: PAL.green });
  dw.dashLine('wA', { intro: 10, dash: 0.2, color: PAL.black });
  dw.dashLine('wl', { intro: 10, dash: 0.2, color: PAL.black });
  dw.dashLine('wB', { intro: 10, dash: 0.2, color: PAL.black });

  // steps 11-13: V-diagram
  dw.seg('vbase', { intro: 11, w: W_BAR });
  dw.seg('vj1', { intro: 12, w: W_BAR, color: RED });
  dw.seg('vs1', { intro: 12, w: W_BAR, color: RED });
  dw.seg('vd1', { intro: 12, w: W_BAR, color: RED, when: f1On });
  dw.highlight('ofA', [12]);
  dw.highlight('reA', [12]);
  dw.seg('vs2', { intro: 13, w: W_BAR, color: RED });
  dw.seg('vd2', { intro: 13, w: W_BAR, color: RED, when: f2On });
  dw.seg('vs3', { intro: 13, w: W_BAR, color: RED });
  dw.seg('vj2', { intro: 13, w: W_BAR, color: RED });
  dw.highlight('ofB', [13]);
  dw.highlight('reB', [13]);

  // step 14: the mirror pole o + right H segment + horizontal closing ray
  dw.dashLine('gi1', { intro: 14, dash: 0.45, color: PAL.black }); // D -> pole2
  dw.seg('segHr', { intro: 14, w: W_BAR, color: RED });
  dw.label('lblHr', 'H', { intro: 14, color: RED });
  dw.dashLine('gn', { intro: 14, dash: 0.25, color: PAL.black });  // pole2 -> Q
  dw.label('lbl_o', 'o', { cls: 'point', intro: 14 });

  // step 15: M baseline
  dw.seg('mbase', { intro: 15, w: W_BAR });
  dw.highlight('gi1', [15]);

  // step 16: rays to o + the moment funicular from the baseline
  for (let i = 0; i <= 10; i++) dw.seg(`rayB${i}`, { intro: 16, w: W_THIN, color: PAL.black, flash: false });
  for (let i = 0; i <= 10; i++) dw.seg(`funB${i}`, { intro: 16, w: W_MEM, color: PAL.black });
  dw.dashLine('closB', { intro: 16, dash: 0.45, color: PAL.black });

  // steps 17-18: ordinates + red M-diagram
  dw.strokes('ordF', 10, { intro: 17, w: 0.06, color: PAL.grey });
  dw.strokes('ordM', 10, { intro: 18, w: 0.06, color: RED });
  dw.strokes('mout', 11, { intro: 18, w: W_BAR, color: RED });
  dw.highlight('segHl', [18]);
  dw.highlight('segHr', [18]);

  // final readouts
  for (const n of ['roR', 'roA', 'roB']) dw.label(n, '', { intro: RESOLVE, flash: false, color: PAL.green });
  for (const n of ['roH', 'roM1', 'roM2']) dw.label(n, '', { intro: RESOLVE, flash: false, color: RED });

  // Bow notation
  const bowOn = (st) => st.bow;
  const BOWL = 'ABCDEFGHIJK';
  for (let i = 0; i < 11; i++) dw.label(`bow${i}`, BOWL[i], { intro: 2, when: bowOn, color: PAL.grey });
  dw.label('bowL', 'L', { intro: 1, when: bowOn, color: PAL.grey });
  dw.label('bowa', 'a', { intro: 4, when: bowOn, color: PAL.grey });
  dw.label('bowOp', 'O′', { intro: 7, when: bowOn, color: PAL.grey });

  // points
  const HANDLE = { r: 0.2 }, DERIVED = { r: 0.15 };
  const show = (st) => st.n4;
  dw.disk('pt_A', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_B', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_E', { intro: 3, ...HANDLE, when: show });
  dw.disk('pt_G', { intro: 3, ...HANDLE, when: show });
  for (let k = 0; k <= 10; k++) dw.disk(`pt_LL${k}`, { intro: 4, ...DERIVED, when: show });
  for (let k = 0; k <= 10; k++) {
    dw.label(`lbl_LL${k}`, 'abcdefghijk'[k], { cls: 'point', intro: 4, when: show });
  }
  dw.disk('pt_pole', { intro: 5, ...HANDLE, when: show });
  dw.disk('pt_O', { intro: 5, ...HANDLE, when: show });
  dw.disk('pt_FP0', { intro: 7, ...HANDLE, when: show });
  dw.disk('pt_C', { intro: 7, ...DERIVED, when: show });
  dw.disk('pt_D', { intro: 9, ...DERIVED, when: show });
  dw.disk('pt_pole2', { intro: 14, ...DERIVED, when: show });
  dw.disk('pt_K', { intro: 15, ...HANDLE, when: show });
  dw.disk('pt_I', { intro: 11, ...HANDLE, when: show });

  dw.nodeInspector(3, { when: (st) => st.node > 0, w: 0.13, headLen: 0.5, headW: 0.22, r: 0.24 });

  // dual pairs
  dw.link('ldF1', 'lblqF1', 'lblF1');
  dw.link('ldF2', 'lblqF2', 'lblF2');
  dw.link('Rform', 'Rforce', 'lblRf', 'lblRo');
  dw.link('reA', 'ofA', 'lblAf', 'lblAo');
  dw.link('reB', 'ofB', 'lblBf', 'lblBo');
  for (let i = 0; i <= 10; i++) dw.link(`fun${i}`, `ray${i}`);
  for (let i = 0; i <= 10; i++) dw.link(`funB${i}`, `rayB${i}`);
  dw.link('closing', 'ga1');
  dw.link('mbase', 'gi1');
  dw.link('mout', 'segHl', 'segHr', 'lblHl', 'lblHr');
  dw.ghostable('Rforce', 'segHl', 'segHr');

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('t_form', [-3.7, 3.3]);
    dw.setLabel('t_form2', [-3.7, 2.6]);
    dw.setLabel('t_force', [15.2, 3.3]);
    dw.setLabel('t_force2', [15.2, 2.6]);
    dw.setText('t_force2', `1 unit :: ${s.sFD.toFixed(1)} kN`);
    dw.setLabel('roq', [20.7, 3.3]);
    dw.setText('roq', `q = ${Q.toFixed(1)} kN / m`);
    dw.setLabel('t_trial', [-3.7, -3.6]);
    dw.setLabel('t_trial2', [-3.7, -4.3]);
    dw.setLabel('t_v', [-3.7, -6.6]);
    dw.setLabel('t_v2', [-3.7, -7.3]);
    dw.setLabel('t_m', [-3.7, -10.1]);
    dw.setLabel('t_m2', [-3.7, -10.8]);

    dw.setSeg('beam', d.A, d.B);
    dw.setDashLine('vx0', [[0, Y.R], [0, Y.S2]]);
    dw.setDashLine('vx10', [[SPAN, Y.R], [SPAN, Y.S2]]);
    dw.setSeg('dim', [0, Y.DIM], [SPAN, Y.DIM]);
    const tk = 0.18;
    dw.setStrokes('dimT', [
      [[-tk, Y.DIM - tk], [tk, Y.DIM + tk]], [[-tk, Y.DIM + tk], [tk, Y.DIM - tk]],
      [[SPAN - tk, Y.DIM - tk], [SPAN + tk, Y.DIM + tk]], [[SPAN - tk, Y.DIM + tk], [SPAN + tk, Y.DIM - tk]],
    ]);
    dw.setLabel('lblDim', [SPAN / 2, Y.DIM + 0.45]);

    dw.setPoly('qpoly', [[0, Y.L1], [0, Y.V], [SPAN, Y.V], [SPAN, Y.L1]]);
    dw.setStrokes('qedge', [
      [[0, Y.L1], [SPAN, Y.L1]], [[SPAN, Y.L1], [SPAN, Y.V]],
      [[SPAN, Y.V], [0, Y.V]], [[0, Y.V], [0, Y.L1]],
    ]);
    dw.setLabel('lblq', [-0.55, (Y.L1 + Y.V) / 2]);
    for (let i = 0; i < 10; i++) {
      dw.setDashLine(`st${i}`, [[0.5 + i, Y.R], [0.5 + i, Y.S2]]);
      dw.setArrow(`sl${i}`, [0.5 + i, Y.SL], [0.5 + i, Y.SL - s.sLS]);
    }

    dw.setArrow('ldF1', [d.xE, Y.L1 + 2 * s.sLS], [d.xE, Y.L1]);
    dw.setArrow('ldF2', [d.xG, Y.L1 + 2 * s.sLS], [d.xG, Y.L1]);
    dw.setLabel('lblF1', [d.xE - 0.55, Y.L1 + 1.6 * s.sLS]);
    dw.setLabel('lblF2', [d.xG + 0.55, Y.L1 + 1.6 * s.sLS]);
    dw.setDashLine('vF1', [[d.xE, Y.L1 + 2 * s.sLS], [d.xE, Y.S2]]);
    dw.setDashLine('vF2', [[d.xG, Y.L1 + 2 * s.sLS], [d.xG, Y.S2]]);

    dw.setArrow('Rforce', d.LL[0], d.LL[10]);
    dw.setLabel('lblRo', [s.llx - 0.5, (d.LL[0][1] + d.LL[10][1]) / 2 + 0.55]);
    const mid = (k) => V.mid(d.LL[k - 1], d.LL[k]);
    dw.setLabel('lblqF1', V.add(mid(s.p1), [-1.05, 0]));
    dw.setLabel('lblqF2', V.add(mid(s.p2), [-1.05, 0]));

    dw.setSeg('segHl', d.O, d.Ph);
    dw.setLabel('lblHl', V.add(V.mid(d.O, d.Ph), [0, -0.5]));
    dw.setDashLine('gd1', [d.LL[10], d.O]);
    dw.setDashLine('gm', [d.pole, d.Ph]);
    dw.setLabel('lbl_op', V.add(d.pole, [-0.7, 0.15]));

    const fpts = [...d.FP, d.C];
    for (let i = 0; i <= 10; i++) {
      dw.setSeg(`ray${i}`, d.LL[i], d.pole);
      dw.setSeg(`fun${i}`, fpts[i], fpts[i + 1]);
      dw.setSeg(`rayB${i}`, d.LL[i], d.pole2);
    }
    const bpts = [...d.FPB, d.U];
    for (let i = 0; i <= 10; i++) dw.setSeg(`funB${i}`, bpts[i], bpts[i + 1]);
    dw.setLabel('lbl_FP0', V.add(d.FP[0], [-0.8, -0.15]));

    dw.setDashLine('closing', [d.FP[0], d.C]);
    dw.setArrow('Rform', [d.M1[0], Y.R], [d.M1[0], Y.R - 2 * s.sLS]);
    dw.setLabel('lblRf', [d.M1[0] + 0.55, Y.R - 1.3 * s.sLS]);
    dw.setDashLine('vRf', [[d.M1[0], Y.R], [d.M1[0], Y.S2]]);
    dw.setDashLine('ga1', [d.pole, d.D]);
    dw.setLabel('lbl_l', V.add(d.D, [-0.45, 0.34]));

    dw.setArrow('reA', [0, -2 * s.sLS], d.A);
    dw.setArrow('reB', [SPAN, -2 * s.sLS], d.B);
    dw.setLabel('lblAf', [-0.55, -1.2 * s.sLS]);
    dw.setLabel('lblBf', [SPAN + 0.55, -1.2 * s.sLS]);
    dw.setArrow('ofB', d.L1o, d.K1);
    dw.setArrow('ofA', d.K1, d.J1);
    dw.setLabel('lblAo', V.add(V.mid(d.K1, d.J1), [0.5, 0]));
    dw.setLabel('lblBo', V.add(V.mid(d.L1o, d.K1), [0.5, 0]));
    dw.setDashLine('wA', [d.LL[0], d.J1]);
    dw.setDashLine('wl', [d.D, d.K1]);
    dw.setDashLine('wB', [d.LL[10], d.L1o]);

    dw.setSeg('vbase', d.I, d.L);
    dw.setSeg('vj1', d.I, d.VP1);
    dw.setSeg('vs1', d.VP1, d.VP2);
    dw.setSeg('vd1', d.VP2, d.VP3);
    dw.setSeg('vs2', d.VP3, d.VP4);
    dw.setSeg('vd2', d.VP4, d.VP5);
    dw.setSeg('vs3', d.VP5, d.Sv);
    dw.setSeg('vj2', d.Sv, d.L);

    dw.setDashLine('gi1', [d.D, d.pole2]);
    dw.setSeg('segHr', d.O, d.Qh);
    dw.setLabel('lblHr', V.add(V.mid(d.O, d.Qh), [0, -0.5]));
    dw.setDashLine('gn', [d.pole2, d.Qh]);
    dw.setLabel('lbl_o', V.add(d.pole2, [0.55, 0.3]));

    dw.setSeg('mbase', [0, s.yK], [SPAN, s.yK]);
    dw.setDashLine('closB', [d.FPB[0], d.U]);

    dw.setStrokes('ordF', d.ords.map((o) => [o.FG, o.FP]));
    dw.setStrokes('ordM', d.ords.map((o) => [[o.x, s.yK], o.MP]));
    const chain = [[0, s.yK], ...d.ords.map((o) => o.MP), [SPAN, s.yK]];
    const pairs = [];
    for (let k = 0; k + 1 < chain.length; k++) pairs.push([chain[k], chain[k + 1]]);
    dw.setStrokes('mout', pairs);

    const col = 12.6;
    const rows = [['roR', -6.4, `R = ${d.Rkn.toFixed(2)} kN`],
                  ['roA', -7.3, `A = ${d.Akn.toFixed(2)} kN`],
                  ['roB', -8.2, `B = ${d.Bkn.toFixed(2)} kN`],
                  ['roH', -9.1, `H = ${(s.H * s.sFD).toFixed(2)} kN`],
                  ['roM1', -10.0, `M(F₁) = ${((d.ords[s.p1 - 1].MP[1] - s.yK) * -1).toFixed(2)} kNm`],
                  ['roM2', -10.9, `M(F₂) = ${((d.ords[s.p2 - 1].MP[1] - s.yK) * -1).toFixed(2)} kNm`]];
    for (const [n, y, txt] of rows) { dw.setLabel(n, [col, y]); dw.setText(n, txt); }

    for (let i = 0; i < 11; i++) dw.setLabel(`bow${i}`, [i, Y.L1 + 0.5]);
    dw.setLabel('bowL', [SPAN / 2, -1]);
    dw.setLabel('bowa', V.add(d.LL[0], [0.8, 0.35]));
    const cen = d.FP.reduce((a, p) => V.add(a, p), [0, 0]);
    dw.setLabel('bowOp', V.mul(V.add(cen, V.add(d.C, [0, 0])), 1 / 12));

    dw.setDisk('pt_A', d.A);
    dw.setDisk('pt_B', d.B);
    dw.setDisk('pt_E', [d.xE, Y.L1]);
    dw.setDisk('pt_G', [d.xG, Y.L1]);
    for (let k = 0; k <= 10; k++) {
      dw.setDisk(`pt_LL${k}`, d.LL[k]);
      dw.setLabel(`lbl_LL${k}`, V.add(d.LL[k], [0.26, 0.12]));
    }
    dw.setDisk('pt_pole', d.pole);
    dw.setDisk('pt_O', d.O);
    dw.setDisk('pt_FP0', d.FP[0]);
    dw.setDisk('pt_C', d.C);
    dw.setDisk('pt_D', d.D);
    dw.setDisk('pt_pole2', d.pole2);
    dw.setDisk('pt_K', d.FPB[0]);
    dw.setDisk('pt_I', d.I);
  }

  // node inspector: kinks of the MOMENT funicular (strip nodes) + whole beam
  const nodeAt = [];
  for (let i = 1; i <= 10; i++) nodeAt.push(() => d.FPB[i]);
  nodeAt.push(() => [SPAN / 2, 0]);
  const nodePolys = (j) => (j < 10
    ? [[d.LL[j], d.LL[j + 1]], [d.LL[j + 1], d.pole2], [d.pole2, d.LL[j]]]
    : [[d.LL[0], d.LL[10]], [d.L1o, d.K1], [d.K1, d.J1]]);
  const nodeTitle = (j) => (j < 10 ? `strip ${j + 1} node` : 'whole beam');

  function updateNode() {
    const j = Math.max(0, Math.min(10, Math.round(s.node) - 1));
    dw.selectDisk(null);
    dw.setNodeInspector(nodeAt[j](), 1.5, nodeTitle(j), nodePolys(j));
  }

  function refresh() {
    d = compute(s);
    update();
    updateNode();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  // ------------------------------------------------------------------
  // side panel + dragging
  // ------------------------------------------------------------------

  const view = panel.section('View');
  panel.button(view, 'zoom fit', () => dw.zoomFit());

  const par = panel.section('Parameters');
  panel.slider(par, s, 'F1', 'single load F1 (kN)', 0, 0.6, 0.05, refresh);
  panel.slider(par, s, 'p1', 'position F1 (strip 1–5)', 1, 5, 1, refresh);
  panel.slider(par, s, 'F2', 'single load F2 (kN)', 0, 0.6, 0.05, refresh);
  panel.slider(par, s, 'p2', 'position F2 (strip 6–10)', 6, 10, 1, refresh);
  panel.slider(par, s, 'H', 'H (pole distance)', 1, 5, 0.1, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (kN/unit)', 0.1, 5, 0.1, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 0.3, 0.8, 0.05, refresh);
  panel.slider(par, s, 'off', 'offset reaction forces', 0, 1, 0.05, refresh);
  panel.toggle(par, s, 'sl', 'show single loads', refresh);
  panel.toggle(par, s, 'bow', 'show Bow notation', refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off, 1–10 = strips, 11 = whole beam)', 0, 11, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS });
    panel.syncAll();
    refresh();
  });

  const hits = [
    ['E', () => [d.xE, Y.L1], 3, 99], ['G', () => [d.xG, Y.L1], 3, 99],
    ['LL0', () => d.LL[0], 4, 99],
    ['pole', () => d.pole, 5, 99], ['O', () => d.O, 5, 99],
    ['FP0', () => d.FP[0], 7, 99],
    ['I', () => d.I, 11, 99], ['K', () => d.FPB[0], 15, 99],
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
      if (name === 'E') s.p1 = Math.max(1, Math.min(5, Math.round(wx + 0.5)));
      else if (name === 'G') s.p2 = Math.max(6, Math.min(10, Math.round(wx + 0.5)));
      else if (name === 'LL0') { s.llx = wx; s.lly = wy; }
      else if (name === 'pole') s.yPole = Math.max(-9, Math.min(1, wy));
      else if (name === 'O') s.yO = Math.max(-9.5, Math.min(d.LL[10][1] - 0.3, wy));
      else if (name === 'FP0') s.yFP0 = Math.max(-6.5, Math.min(-2.5, wy));
      else if (name === 'I') s.yI = Math.max(-8.6, Math.min(-6, wy));
      else if (name === 'K') s.yK = Math.max(-12.2, Math.min(-9, wy));
      if (name === 'E' || name === 'G') panel.syncAll();
      refresh();
    },
  );

  dw.nodeSelect(nodeAt.map((at) => ({ at })), (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
