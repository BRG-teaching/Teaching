/**
 * Drawing view/26 "Constant force gable truss"
 * (https://block.arch.ethz.ch/eq/drawing/view/26) as a step-by-step
 * construction, following the applet's own mode-1 pedagogy:
 *   1. nine equal loads on the two straight rafters -> load line a..j;
 *   2. rays through the load-line points PARALLEL to the rafter members all
 *      span the same horizontal band -> cutting them with ONE vertical line
 *      gives top-chord force segments of EQUAL length: the rafter force is
 *      constant;
 *   3. the division point i (A = B = 4.5 F) closes each web point k on the
 *      vertical back to the load line: the bottom chord is the funicular
 *      walk of those rays, the verticals are struts carrying exactly F each
 *      -- except the apex tie, which hangs the kink of the roof.
 * Live port of view_26/applet_0/geogebra.xml; the full chain (load line,
 * web points 1..8, all 16 truss nodes, offset apparatus, hidden funicular
 * polygon) is regression-checked against the LIVE applet's coordinates to
 * ~8e-13 (default + dragged states, notes/view_26_analysis.md).
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 26 — Constant Force Gable Truss',
  subtitle: 'one vertical line makes the rafter force constant',
  about: 'A gable truss with nine equal loads on its two straight rafters. Because every top-chord force segment runs from the load line to one common vertical line, the force in the rafters is constant — the bottom chord is shaped as the funicular of the rays from that vertical to the division point i, and the web verticals become struts that each carry exactly one nodal load F, except the apex tie, which hangs the kink of the roof in tension. A hidden option of the original applet (the grey funicular polygon that proves the bottom-chord shape and the reactions) is ported behind a toggle.',
  frame: [[4.587, 22.27], [22.33, 31.14]],
};

// applet constants (free/admin points of the XML, live-verified)
const XA = 5.557215259322512;      // left support rail (line e_2)
const XB = 14.610800812502724;     // right support rail (j_1)
const YLO = 23.35470008431303;     // rails bottom (d_2 via M_1)
const YHI = 28.717243655023573;    // rails top (c_2 via L_1)
const F = 30.404753559670006 - 29.220880036210787;   // load, 1.18387 kN
const Y_ARR = 29.776482590068138;  // drawn load-arrow tails (L2s09)
const Y_TIP = 29.220880036210787;  // drawn load-arrow tips (L2s02)
const Y_ACT0 = 30.313565957607224; // action-line top (a)
const Y_ACT1 = 22.77169386853543;  // action-line bottom (b)
const XW = 15.051382881275059;     // ray-extent handle W
const Y_HG = 25.120074391111636;   // hanger-guide bottom (r_2 via D_2)
const DIM_OFF = 0.5907;            // constant-force dimension offset (R_2)
const LSYM = 0.7;                  // loadSymbol (form reaction arrows)
// hidden funicular-polygon apparatus (all free points of the applet)
const FUN_X = 28.503721738023533;  // second load line (P5aA)
const FUN_Y = 24.879509153419974;
const POLE0 = [25.785196941341237, 22.12001854159012];   // pole '0'
const FUN_S = 22.28818423677993;   // funicular start y (P3aAB01)
const GLYPH = 0.15660254037844387; // actual-force reaction start below support

const RESOLVE = 14;
const NUM_T = [2, 5, 8, 11, 14, 17, 20, 23];   // top chord member numbers
const NUM_B = [1, 4, 7, 10, 13, 16, 19, 22];   // bottom chord
const NUM_H = [3, 6, 9, 12, 15, 18, 21];       // web verticals (12 = tie)
const IN_T = [7, 7, 8, 8, 8, 8, 8, 8];         // intro of the force twins
const IN_B = [9, 10, 11, 11, 13, 13, 13, 13];
const IN_H = [10, 11, 11, 12, 13, 13, 13];

const DEFAULTS = {
  ay: 26, by: 26, ey: 28,            // supports A, B and apex on their rails
  ox: 21, oy: 29.7,                  // load line start a (P4aA)
  vx: 17.5,                          // constant-force vertical (P4s03)
  sFD: 0.5,                          // scaleForceDiagram [0.3, 0.5]
  off: 0.4,                          // offsetReactionForces [0, 0.5]
  sIF: 0.025,                        // scaleInternalForces [0, 0.05]
  o1: true,                          // show internal forces
  fun: false,                        // show funicular polygon (hidden applet checkbox)
  act: false,                        // show actual load/support forces (hidden checkbox)
  sc: false,                         // show constraints (applet showHandles rails)
  n4: true,                          // show points
  lbl: true,                         // the applet's showLabels (its default is OFF; house default ON)
  node: 0,                           // node-equilibrium inspector (0 = off)
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The rafters', d: 'left: two straight rafters between the supports and the apex, with nodes at nine equal divisions — drag the supports and the apex!' },
  { t: 'The loads — in both diagrams', d: 'left: nine equal loads F₁…F₉ on their dashed action lines — right: laid off tip-to-tail on the load line a→j' },
  { t: 'The reactions', d: 'the loads are symmetric, so A = B = 4½F — right: i divides the load line, B = j→i and A = i→a on the offset line — left: the same pulls at the supports' },
  { t: 'A ray parallel to member 2', d: 'right: through b, a ray parallel to the first rafter member 2 — every top-chord force must lie on such a ray' },
  { t: 'Rays for every rafter member', d: 'right: through c, d, e parallel to 5, 8, 11 — through f, g, h, i parallel to 14, 17, 20, 23; each family is parallel' },
  { t: 'Choose a vertical line', d: 'left: the web will be vertical (dashed) — right: the point v (drag it!) fixes one vertical line that will cut every ray' },
  { t: 'Constant force', d: 'right: the vertical cuts the rays through b and c at 1 and 2 — the segments b–1 and c–2 are EQUAL: the top-chord force is constant' },
  { t: 'The whole top chord', d: 'right: points 3…8 complete the rafter forces 8, 11 and 14…23 — parallel segments between the load line and ONE vertical all have the same length' },
  { t: 'Division point i → member 1', d: 'right: 1→i is the force of the first bottom-chord member — left: through A parallel to it, member 1 finds the first bottom node' },
  { t: 'Strut 3 and member 4', d: 'left: the vertical strut 3 and the next chord member 4 — right: the gap 1–2 (exactly F!) and the ray 2→i' },
  { t: 'Walking the left bay', d: 'left: struts 6, 9 and chord members 7, 10 reach the crown — right: gaps 2–3, 3–4 and rays 3→i, 4→i' },
  { t: 'The apex tie 12', d: 'left: the tie from the apex to the crown — right: its force is the long gap 4–5, drawn on a parallel offset line for clarity: the tie hangs the kink of the roof' },
  { t: 'Walking the right bay', d: 'left: struts 15, 18, 21 and members 13, 16, 19, 22 — right: the last ray 8→i closes exactly on the support B' },
  { t: 'Compression and tension', d: 'rafters and struts resolve blue = compression, bottom chord and apex tie pink = tension; every strut carries exactly F — drag A, B, the apex, a or v' },
];

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

function compute(s) {
  const w = F * s.sFD;                                // load-line edge
  const xs = [];
  for (let k = 0; k <= 8; k++) xs.push(XA + (k * (XB - XA)) / 8);

  // form: top chord nodes on the two straight rafters
  const A = [XA, s.ay], B = [XB, s.by], E = [xs[4], s.ey];
  const onln = (P, Q, x) => [x, P[1] + ((x - P[0]) / (Q[0] - P[0])) * (Q[1] - P[1])];
  const top = [A, onln(A, E, xs[1]), onln(A, E, xs[2]), onln(A, E, xs[3]), E,
               onln(E, B, xs[5]), onln(E, B, xs[6]), onln(E, B, xs[7]), B];

  // force: load line a..j + division point i (A = B = 4.5 F, symmetric loads)
  const LL = [];
  for (let k = 0; k <= 9; k++) LL.push([s.ox, s.oy - k * w]);
  const K = [s.ox, LL[9][1] + 4.5 * w];

  // web points 1..8 on the constant-force vertical
  const vx = clamp(s.vx, s.ox - 11 * s.sFD, s.ox - 5 * s.sFD);
  const P4 = [];
  for (let k = 1; k <= 8; k++) {
    P4.push(V.intersect(LL[k], V.sub(top[k], top[k - 1]), [vx, 0], [0, 1]));
  }

  // bottom chord: funicular walk of the rays k -> i
  const bot = [];
  let cur = A;
  for (let k = 1; k <= 7; k++) {
    cur = V.intersect(cur, V.sub(K, P4[k - 1]), [xs[k], 0], [0, 1]);
    bot.push(cur);
  }

  // offset reaction chain + offset apex tie
  const I1 = [LL[0][0] + s.off, LL[0][1]];
  const J1 = [LL[9][0] + s.off, LL[9][1]];
  const K1 = [J1[0], J1[1] + 4.5 * w];
  const O2 = [P4[4][0] - s.off, P4[4][1]];
  const Q2 = [O2[0], P4[3][1]];

  // constant-force dimension: [P4a1 -> b] translated by DIM_OFF perp (up-left)
  const dB1 = V.unit(V.sub(LL[1], P4[0]));
  let nrm = V.perp(dB1);
  if (nrm[1] < 0) nrm = V.mul(nrm, -1);
  const S2 = V.add(P4[0], V.mul(nrm, DIM_OFF));
  const R2 = V.add(LL[1], V.mul(nrm, DIM_OFF));

  // compression / tension per member (applet internalForce pairings)
  const col = (fm, fo) => (V.isCompression(V.ggbAngle(fm, fo)) ? PAL.blue : PAL.red);
  const cT = [], cB = [], cH = [], NT = [], NB = [], NH = [];
  for (let k = 0; k < 8; k++) {
    cT.push(col(V.sub(top[k + 1], top[k]), V.sub(P4[k], LL[k + 1])));
    NT.push(V.dist(LL[k + 1], P4[k]) / s.sFD);
    const bf = k === 0 ? [A, bot[0]] : k === 7 ? [bot[6], B] : [bot[k - 1], bot[k]];
    cB.push(col(V.sub(bf[1], bf[0]), V.sub(K, P4[k])));
    NB.push(V.dist(P4[k], K) / s.sFD);
  }
  for (let k = 0; k < 7; k++) {
    cH.push(col(V.sub(bot[k], top[k + 1]), V.sub(P4[k], P4[k + 1])));
    NH.push(V.dist(P4[k + 1], P4[k]) / s.sFD);
  }

  // hidden funicular polygon (toggle): 2nd load line, pole 0, walk, division k
  const LL5 = [];
  for (let k = 0; k <= 9; k++) LL5.push([FUN_X, FUN_Y - k * w]);
  const fv = [[xs[0], FUN_S]];
  for (let k = 0; k < 8; k++) {
    fv.push(V.intersect(fv[k], V.sub(LL5[k + 1], POLE0), [xs[k + 1], 0], [0, 1]));
  }
  const P5K = V.intersect(POLE0, V.sub(fv[8], fv[0]), LL5[0], [0, 1]);

  return { xs, top, bot, A, B, E, LL, K, P4, vx, w, I1, J1, K1, O2, Q2,
           S2, R2, cT, cB, cH, NT, NB, NH, LL5, fv, P5K };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);

  const W_BAR = 0.045;
  const ARROW = { w: 0.055, headLen: 0.2, headW: 0.085 };
  const PX = 1 / 67.64;              // applet px -> world (for label offsets)
  const liveT = (k) => ({ pending: PAL.black, final: (dd) => dd.cT[k] });
  const liveB = (k) => ({ pending: PAL.black, final: (dd) => dd.cB[k] });
  const liveH = (k) => ({ pending: PAL.black, final: (dd) => dd.cH[k] });

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // step 1: the rafters (+ constraint rails via toggle)
  for (const r of ['railA', 'railB', 'railE']) {
    dw.dashLine(r, { intro: 1, dash: 0.15, when: (st) => st.sc });
  }
  dw.dashLine('railV', { intro: 6, dash: 0.15, when: (st) => st.sc });
  for (let k = 0; k < 8; k++) dw.seg(`mt${k}`, { intro: 1, w: W_BAR, color: liveT(k) });

  // step 2: loads + load line (name labels behind the applet's showLabels)
  const lblOn = (st) => st.lbl;
  for (let k = 0; k < 9; k++) {
    dw.dashLine(`al${k}`, { intro: 2, dash: 0.09 });
    dw.arrow(`ldF${k}`, { intro: 2, ...ARROW });
    dw.label(`lF${k}`, `F${'₁₂₃₄₅₆₇₈₉'[k]}`, { intro: 2, color: PAL.green, when: lblOn });
    dw.arrow(`ll${k}`, { intro: 2, ...ARROW });
    dw.label(`lLL${k}`, `F${'₁₂₃₄₅₆₇₈₉'[k]}`, { intro: 2, color: PAL.green, when: lblOn });
  }

  // step 3: reactions (division point i + offset chain + support arrows)
  dw.dashLine('conA', { intro: 3, dash: 0.1, color: PAL.black });
  dw.dashLine('conB', { intro: 3, dash: 0.1, color: PAL.black });
  dw.dashLine('conI', { intro: 3, dash: 0.1, color: PAL.black });
  dw.arrow('rB', { intro: 3, ...ARROW });
  dw.arrow('rA', { intro: 3, ...ARROW });
  dw.label('lrA', 'A', { intro: 3, color: PAL.green, when: lblOn });
  dw.label('lrB', 'B', { intro: 3, color: PAL.green, when: lblOn });
  dw.arrow('fA', { intro: 3, ...ARROW });
  dw.arrow('fB', { intro: 3, ...ARROW });
  dw.label('lfA', 'A', { intro: 3, color: PAL.green, when: lblOn });
  dw.label('lfB', 'B', { intro: 3, color: PAL.green, when: lblOn });

  // steps 4-5: rays parallel to the rafter members (retire with the applet)
  for (let k = 0; k < 8; k++) {
    dw.dashLine(`ray${k}`, { intro: k === 0 ? 4 : 5, outro: 10, dash: 0.1 });
    dw.highlight(`mt${k}`, [k === 0 ? 4 : 5]);
  }

  // step 6: hanger guide lines + the constant-force vertical through v
  for (let k = 0; k < 7; k++) {
    dw.dashLine(`hg${k}`, { intro: 6, outro: IN_H[k], dash: 0.1 });
  }
  dw.dashLine('vln', { intro: 6, outro: 9, dash: 0.14 });
  dw.dashLine('vseg', { intro: 9, dash: 0.14 });

  // steps 7-8: top-chord force segments + the constant-force dimension
  for (let k = 0; k < 8; k++) {
    dw.seg(`ft${k}`, { intro: IN_T[k], w: W_BAR, color: liveT(k) });
  }
  dw.dashLine('dimE1', { intro: 7, outro: 9, dash: 0.1 });
  dw.dashLine('dimE2', { intro: 7, outro: 9, dash: 0.1 });
  dw.seg('dimL', { intro: 7, outro: 9, w: 0.025, color: PAL.grey });
  dw.label('dimT', '', { intro: 7, outro: 9, color: PAL.grey });
  dw.label('dimF', '', { intro: 7, outro: 9, flash: false, color: PAL.grey });

  // steps 9-13: bottom chord + web verticals with their force twins
  for (let k = 0; k < 8; k++) {
    dw.seg(`mb${k}`, { intro: IN_B[k], w: W_BAR, color: liveB(k) });
    dw.seg(`fb${k}`, { intro: IN_B[k], w: W_BAR, color: liveB(k) });
  }
  for (let k = 0; k < 7; k++) {
    dw.seg(`mh${k}`, { intro: IN_H[k], w: W_BAR, color: liveH(k) });
    dw.seg(`fh${k}`, { intro: IN_H[k], w: W_BAR, color: liveH(k) });
  }
  dw.dashLine('tieC1', { intro: 12, dash: 0.1, color: PAL.black });
  dw.dashLine('tieC2', { intro: 12, dash: 0.1, color: PAL.black });
  dw.highlight('rA', [9]);
  dw.highlight('rB', [9]);
  dw.highlight('fA', [9]);
  dw.highlight('fB', [9]);

  // member numbers, both diagrams, applet label offsets (px, y down)
  const OS_T = [[17, -7], [19, -4], [19, -4], [16, -3], [52, 20], [52, 21], [51, 19], [50, 24]];
  const OS_H = [[-16, 6], [-17, 10], [-15, 13], [-25, 0], [-19, 0], [-20, 0], [-21, 1]];
  for (let k = 0; k < 8; k++) {
    dw.label(`nfT${k}`, `${NUM_T[k]}`, { cls: 'num', intro: IN_T[k], color: { final: (dd) => dd.cT[k] }, when: lblOn });
    dw.label(`nsT${k}`, `${NUM_T[k]}`, { cls: 'num', intro: IN_T[k], color: { final: (dd) => dd.cT[k] }, when: lblOn });
    dw.label(`nfB${k}`, `${NUM_B[k]}`, { cls: 'num', intro: IN_B[k], color: { final: (dd) => dd.cB[k] }, when: lblOn });
    dw.label(`nsB${k}`, `${NUM_B[k]}`, { cls: 'num', intro: IN_B[k], color: { final: (dd) => dd.cB[k] }, when: lblOn });
  }
  for (let k = 0; k < 7; k++) {
    dw.label(`nfH${k}`, `${NUM_H[k]}`, { cls: 'num', intro: IN_H[k], color: { final: (dd) => dd.cH[k] }, when: lblOn });
    dw.label(`nsH${k}`, `${NUM_H[k]}`, { cls: 'num', intro: IN_H[k], color: { final: (dd) => dd.cH[k] }, when: lblOn });
  }

  // points
  const HANDLE = { r: 0.09 }, DERIVED = { r: 0.065 };
  const show = (st) => st.n4;
  for (let k = 0; k <= 8; k++) {
    dw.disk(`pt_T${k}`, { intro: 1, ...(k % 4 === 0 ? HANDLE : DERIVED), when: show });
  }
  for (let k = 0; k < 7; k++) dw.disk(`pt_B${k}`, { intro: IN_B[k], when: show, ...DERIVED });
  dw.disk('pt_a', { intro: 2, ...HANDLE, when: show });
  for (let k = 1; k <= 9; k++) dw.disk(`pt_${'abcdefghij'[k]}`, { intro: 2, ...DERIVED, when: show });
  for (let k = 0; k < 10; k++) {
    dw.label(`lp_${'abcdefghij'[k]}`, 'abcdefghij'[k], { cls: 'point', intro: 2, when: show });
  }
  dw.disk('pt_i', { intro: 3, ...DERIVED, when: show });
  dw.label('lp_i', 'i', { cls: 'point', intro: 3, when: show });
  dw.disk('pt_v', { intro: 6, ...HANDLE, when: show });
  dw.label('lp_v', 'v', { cls: 'point', intro: 6, when: show });
  for (let k = 0; k < 8; k++) {
    dw.disk(`pt_f${k}`, { intro: IN_T[k], ...DERIVED, when: show });
  }

  // hidden-checkbox layers: funicular polygon + actual forces (instant)
  const whenFun = (st) => st.fun;
  const whenAct = (st) => st.act;
  const funNames = [];
  for (let k = 0; k < 8; k++) { dw.seg(`fu${k}`, { w: 0.022, color: PAL.grey, when: whenFun }); funNames.push(`fu${k}`); }
  dw.seg('fuClose', { w: 0.022, color: PAL.grey, when: whenFun });
  for (let k = 0; k < 9; k++) { dw.seg(`fr${k}`, { w: 0.018, color: PAL.grey, when: whenFun }); funNames.push(`fr${k}`); }
  dw.seg('fuLL', { w: 0.022, color: PAL.grey, when: whenFun });
  dw.seg('fuRA', { w: 0.022, color: PAL.grey, when: whenFun });
  dw.seg('fuRB', { w: 0.022, color: PAL.grey, when: whenFun });
  dw.disk('pt_o0', { ...DERIVED, when: whenFun });
  dw.disk('pt_k', { ...DERIVED, when: whenFun });
  dw.label('lp_o0', '0', { cls: 'point', when: whenFun });
  dw.label('lp_k', 'k', { cls: 'point', when: whenFun });
  funNames.push('fuClose', 'fuLL', 'fuRA', 'fuRB', 'pt_o0', 'pt_k', 'lp_o0', 'lp_k');
  const actNames = [];
  for (let k = 0; k < 9; k++) { dw.seg(`ac${k}`, { w: 0.028, color: PAL.black, when: whenAct }); actNames.push(`ac${k}`); }
  dw.seg('acA', { w: 0.028, color: PAL.black, when: whenAct });
  dw.seg('acB', { w: 0.028, color: PAL.black, when: whenAct });
  actNames.push('acA', 'acB');
  dw.instant(...funNames, ...actNames);

  // readouts + internal-force pipes (on by default)
  dw.label('roT', '',{ intro: RESOLVE, flash: false, color: PAL.blue });
  dw.label('roH', '', { intro: RESOLVE, flash: false, color: PAL.blue });
  dw.label('roTie', '', { intro: RESOLVE, flash: false, color: PAL.red });
  dw.label('roB', '', { intro: RESOLVE, flash: false, color: PAL.red });
  dw.label('roR', '', { intro: RESOLVE, flash: false, color: PAL.green });
  for (let k = 0; k < 8; k++) {
    dw.poly(`ipT${k}`, 4, { intro: RESOLVE, opacity: 1.0, z: -0.18, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd.cT[k] }, when: (st) => st.o1 });
    dw.poly(`ipB${k}`, 4, { intro: RESOLVE, opacity: 1.0, z: -0.18, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd.cB[k] }, when: (st) => st.o1 });
  }
  for (let k = 0; k < 7; k++) {
    dw.poly(`ipH${k}`, 4, { intro: RESOLVE, opacity: 1.0, z: -0.18, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd.cH[k] }, when: (st) => st.o1 });
  }

  // node-equilibrium inspector (16 nodes; max 4 forces per node)
  dw.nodeInspector(4, { when: (st) => st.node > 0, w: 1.5 * W_BAR, headLen: 0.28, headW: 0.115, r: 0.1 });

  // dual hover pairs
  for (let k = 0; k < 8; k++) {
    dw.link(`mt${k}`, `ft${k}`, `nfT${k}`, `nsT${k}`);
    dw.link(`mb${k}`, `fb${k}`, `nfB${k}`, `nsB${k}`);
  }
  for (let k = 0; k < 7; k++) dw.link(`mh${k}`, `fh${k}`, `nfH${k}`, `nsH${k}`);
  for (let k = 0; k < 9; k++) dw.link(`ldF${k}`, `ll${k}`, `lF${k}`, `lLL${k}`);
  dw.link('fA', 'rA', 'lfA', 'lrA');
  dw.link('fB', 'rB', 'lfB', 'lrB');
  dw.link('mh3', 'tieC1', 'tieC2');
  dw.ghostable('ft0', 'ft1', 'ft2', 'ft3', 'ft4', 'ft5', 'ft6', 'ft7',
               'fb0', 'fb1', 'fb2', 'fb3', 'fb4', 'fb5', 'fb6', 'fb7',
               'fh0', 'fh1', 'fh2', 'fh3', 'fh4', 'fh5', 'fh6', 'rA', 'rB',
               ...[...Array(9)].map((_, k) => `ll${k}`));

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [5.9, 30.75]);
    dw.setLabel('force_title', [16.6, 30.76]);
    dw.setLabel('force_sub', [16.55, 30.42]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(1)} kN`);

    dw.setDashLine('railA', [[XA, YLO], [XA, YHI]]);
    dw.setDashLine('railB', [[XB, YLO], [XB, YHI]]);
    dw.setDashLine('railE', [[d.xs[4], YLO], [d.xs[4], YHI]]);
    dw.setDashLine('railV', [[s.ox - 11 * s.sFD, s.oy], [s.ox - 5 * s.sFD, s.oy]]);

    for (let k = 0; k < 8; k++) dw.setSeg(`mt${k}`, d.top[k], d.top[k + 1]);
    for (let k = 0; k <= 8; k++) dw.setDisk(`pt_T${k}`, d.top[k]);

    // loads + load line
    for (let k = 0; k < 9; k++) {
      dw.setDashLine(`al${k}`, [[d.xs[k], Y_ACT1], [d.xs[k], Y_ACT0]]);
      dw.setArrow(`ldF${k}`, [d.xs[k], Y_ARR], [d.xs[k], Y_TIP]);
      dw.setLabel(`lF${k}`, [d.xs[k] + 0.17, (Y_ARR + Y_TIP) / 2 + 0.1]);
      dw.setArrow(`ll${k}`, d.LL[k], d.LL[k + 1]);
      dw.setLabel(`lLL${k}`, [s.ox - 0.38, (d.LL[k][1] + d.LL[k + 1][1]) / 2]);
    }
    for (let k = 0; k < 10; k++) {
      dw.setDisk(`pt_${'abcdefghij'[k]}`, d.LL[k]);
      dw.setLabel(`lp_${'abcdefghij'[k]}`, [d.LL[k][0] - 0.2, d.LL[k][1] + 0.16]);
    }

    // reactions
    dw.setDashLine('conA', [d.LL[0], d.I1]);
    dw.setDashLine('conB', [d.LL[9], d.J1]);
    dw.setDashLine('conI', [d.K, d.K1]);
    dw.setArrow('rB', d.J1, d.K1);
    dw.setArrow('rA', d.K1, d.I1);
    dw.setLabel('lrB', [d.J1[0] + 0.28, (d.J1[1] + d.K1[1]) / 2]);
    dw.setLabel('lrA', [d.I1[0] + 0.28, (d.K1[1] + d.I1[1]) / 2]);
    dw.setDisk('pt_i', d.K);
    dw.setLabel('lp_i', [d.K[0] + 0.16, d.K[1] - 0.24]);
    dw.setArrow('fA', [XA, s.ay - LSYM], [XA, s.ay]);
    dw.setArrow('fB', [XB, s.by - LSYM], [XB, s.by]);
    dw.setLabel('lfA', [XA - 0.26, s.ay - 0.42]);
    dw.setLabel('lfB', [XB + 0.26, s.by - 0.42]);

    // rays + hanger guides + vertical
    for (let k = 0; k < 8; k++) {
      const dir = V.sub(d.P4[k], d.LL[k + 1]);
      const end = V.add(d.LL[k + 1], V.mul(dir, (XW - d.LL[k + 1][0]) / dir[0]));
      dw.setDashLine(`ray${k}`, [d.LL[k + 1], end]);
    }
    for (let k = 0; k < 7; k++) {
      dw.setDashLine(`hg${k}`, [d.top[k + 1], [d.xs[k + 1], Y_HG]]);
    }
    dw.setDashLine('vln', [[d.vx, s.oy], [d.vx, 24]]);
    dw.setDashLine('vseg', [[d.vx, s.oy], d.P4[0]]);
    dw.setDisk('pt_v', [d.vx, s.oy]);
    dw.setLabel('lp_v', [d.vx + 0.05, s.oy + 0.22]);

    // top-chord force segments + dimension
    for (let k = 0; k < 8; k++) {
      dw.setSeg(`ft${k}`, d.LL[k + 1], d.P4[k]);
      dw.setDisk(`pt_f${k}`, d.P4[k]);
    }
    dw.setDashLine('dimE1', [d.P4[0], d.S2]);
    dw.setDashLine('dimE2', [d.LL[1], d.R2]);
    dw.setSeg('dimL', d.S2, d.R2);
    const dm = V.mid(d.S2, d.R2);
    dw.setLabel('dimT', [dm[0] - 0.55, dm[1] + 0.32]);
    dw.setText('dimT', 'constant force');
    dw.setLabel('dimF', [d.S2[0] + 1.08, d.S2[1] - 0.06]);
    dw.setText('dimF', `F top = ${d.NT[0].toFixed(2)} kN`);

    // bottom chord + web verticals
    for (let k = 0; k < 8; k++) {
      const fm = k === 0 ? [d.A, d.bot[0]] : k === 7 ? [d.bot[6], d.B] : [d.bot[k - 1], d.bot[k]];
      dw.setSeg(`mb${k}`, fm[0], fm[1]);
      dw.setSeg(`fb${k}`, d.P4[k], d.K);
    }
    for (let k = 0; k < 7; k++) {
      dw.setDisk(`pt_B${k}`, d.bot[k]);
      dw.setSeg(`mh${k}`, d.top[k + 1], d.bot[k]);
      if (k === 3) dw.setSeg('fh3', d.O2, d.Q2);
      else dw.setSeg(`fh${k}`, d.P4[k + 1], d.P4[k]);
    }
    dw.setDashLine('tieC1', [d.P4[4], d.O2]);
    dw.setDashLine('tieC2', [d.P4[3], d.Q2]);

    // member numbers. Form: pushed clear of the internal-force pipes; force:
    // top chord per the applet offsets, bottom chord in hand-tuned free
    // zones beside the vertical (the applet's own placement collides there).
    const at = (mid, o) => [mid[0] + o[0] * PX + 0.06, mid[1] - o[1] * PX - 0.05];
    const upn = (a, b) => {                     // upward unit normal of a-b
      const n = V.perp(V.unit(V.sub(b, a)));
      return n[1] >= 0 ? n : V.mul(n, -1);
    };
    // bottom-chord force numbers: x-offset from the vertical + shift off the ray
    const BN = [[0.26, -0.16], [0.9, -0.11], [0.26, -0.16], [0.26, -0.16],
                [0.26, 0.16], [0.26, 0.16], [0.9, 0.11], [0.9, -0.19]];
    const yRay = (k, x) => d.P4[k][1] + ((x - d.P4[k][0]) / (d.K[0] - d.P4[k][0])) * (d.K[1] - d.P4[k][1]);
    for (let k = 0; k < 8; k++) {
      const tm = V.mid(d.top[k], d.top[k + 1]);
      dw.setLabel(`nfT${k}`, V.add(tm, V.mul(upn(d.top[k], d.top[k + 1]), s.sIF * d.NT[k] + 0.2)));
      dw.setLabel(`nsT${k}`, at(V.mid(d.LL[k + 1], d.P4[k]), OS_T[k]));
      const fm = k === 0 ? [d.A, d.bot[0]] : k === 7 ? [d.bot[6], d.B] : [d.bot[k - 1], d.bot[k]];
      dw.setLabel(`nfB${k}`, V.sub(V.mid(fm[0], fm[1]), V.mul(upn(fm[0], fm[1]), s.sIF * d.NB[k] + 0.2)));
      const bx = d.P4[k][0] + BN[k][0];
      dw.setLabel(`nsB${k}`, [bx, yRay(k, bx) + BN[k][1]]);
    }
    for (let k = 0; k < 7; k++) {
      dw.setLabel(`nfH${k}`, V.add(V.mid(d.top[k + 1], d.bot[k]),
                                   [-(s.sIF * d.NH[k] + 0.16), 0]));
      const fmid = k === 3 ? V.mid(d.O2, d.Q2) : V.mid(d.P4[k + 1], d.P4[k]);
      dw.setLabel(`nsH${k}`, at(fmid, OS_H[k]));
    }

    // funicular-polygon toggle layer
    for (let k = 0; k < 8; k++) dw.setSeg(`fu${k}`, d.fv[k], d.fv[k + 1]);
    dw.setSeg('fuClose', d.fv[0], d.fv[8]);
    for (let k = 0; k < 9; k++) {
      dw.setSeg(`fr${k}`, POLE0, k < 8 ? d.LL5[k + 1] : d.P5K);
    }
    dw.setSeg('fuLL', d.LL5[0], d.LL5[9]);
    dw.setSeg('fuRA', d.P5K, d.LL5[0]);
    dw.setSeg('fuRB', d.P5K, d.LL5[9]);
    dw.setDisk('pt_o0', POLE0);
    dw.setDisk('pt_k', d.P5K);
    dw.setLabel('lp_o0', [POLE0[0] - 0.22, POLE0[1] - 0.14]);
    dw.setLabel('lp_k', [d.P5K[0] + 0.22, d.P5K[1] - 0.1]);

    // actual-force toggle layer
    for (let k = 0; k < 9; k++) {
      dw.setSeg(`ac${k}`, [d.xs[k], Y_TIP + F], [d.xs[k], Y_TIP]);
    }
    dw.setSeg('acA', [XA, s.ay - GLYPH], [XA, s.ay - GLYPH - 4.5 * F]);
    dw.setSeg('acB', [XB, s.by - GLYPH], [XB, s.by - GLYPH - 4.5 * F]);

    // readouts + pipes
    dw.setLabel('roT', [19.9, 24.05]);
    dw.setLabel('roH', [19.9, 23.7]);
    dw.setLabel('roTie', [19.9, 23.35]);
    dw.setLabel('roB', [19.9, 23.0]);
    dw.setLabel('roR', [19.9, 22.65]);
    dw.setText('roT', `top chord = ${d.NT[0].toFixed(2)} kN (constant)`);
    dw.setText('roH', `struts = F = ${d.NH[0].toFixed(2)} kN`);
    dw.setText('roTie', `apex tie 12 = ${d.NH[3].toFixed(2)} kN`);
    dw.setText('roB', `bottom chord = ${Math.min(...d.NB).toFixed(2)}…${Math.max(...d.NB).toFixed(2)} kN`);
    dw.setText('roR', `A = B = ${(4.5 * F).toFixed(2)} kN`);
    for (let k = 0; k < 8; k++) {
      dw.setPoly(`ipT${k}`, V.rectPoints(d.top[k], d.top[k + 1], s.sIF * d.NT[k]));
      const fm = k === 0 ? [d.A, d.bot[0]] : k === 7 ? [d.bot[6], d.B] : [d.bot[k - 1], d.bot[k]];
      dw.setPoly(`ipB${k}`, V.rectPoints(fm[0], fm[1], s.sIF * d.NB[k]));
    }
    for (let k = 0; k < 7; k++) {
      dw.setPoly(`ipH${k}`, V.rectPoints(d.top[k + 1], d.bot[k], s.sIF * d.NH[k]));
    }
  }

  // ------------------------------------------------------------------
  // node-equilibrium inspector: 16 nodes, sides = the node's closed force
  // sub-polygon (support reactions land on the drawn OFFSET arrows)
  // ------------------------------------------------------------------

  const NODE_NAMES = ['support A', 'top 1', 'top 2', 'top 3', 'apex', 'top 5',
                      'top 6', 'top 7', 'support B',
                      'bottom 1', 'bottom 2', 'bottom 3', 'crown', 'bottom 5',
                      'bottom 6', 'bottom 7'];
  const NODE_DISKS = ['pt_T0', 'pt_T1', 'pt_T2', 'pt_T3', 'pt_T4', 'pt_T5',
                      'pt_T6', 'pt_T7', 'pt_T8',
                      'pt_B0', 'pt_B1', 'pt_B2', 'pt_B3', 'pt_B4', 'pt_B5', 'pt_B6'];
  const nodeAt = [];
  for (let k = 0; k <= 8; k++) nodeAt.push({ at: () => d.top[k] });
  for (let k = 0; k < 7; k++) nodeAt.push({ at: () => d.bot[k] });

  function nodeSides(j) {
    if (j === 0) {
      return [[d.K1, d.I1], [d.LL[0], d.LL[1]], [d.LL[1], d.P4[0]], [d.P4[0], d.K]];
    }
    if (j === 8) {
      return [[d.LL[8], d.LL[9]], [d.J1, d.K1], [d.K, d.P4[7]], [d.P4[7], d.LL[8]]];
    }
    if (j <= 7) {                                   // interior top node j
      const tie = j === 4;
      return [[d.LL[j], d.LL[j + 1]], [d.LL[j + 1], d.P4[j]],
              tie ? [d.O2, d.Q2] : [d.P4[j], d.P4[j - 1]],
              [d.P4[j - 1], d.LL[j]]];
    }
    const k = j - 9;                                // bottom node k
    const tie = k === 3;
    return [[d.K, d.P4[k]],
            tie ? [d.Q2, d.O2] : [d.P4[k], d.P4[k + 1]],
            [d.P4[k + 1], d.K]];
  }

  function updateNode() {
    const n = Math.round(s.node);
    const j = clamp(n - 1, 0, 15);
    dw.selectDisk(n > 0 ? NODE_DISKS[j] : null);
    dw.setNodeInspector([7.8, 30.5], 0.8, n > 0 ? `node ${NODE_NAMES[j]}` : '', nodeSides(j));
  }

  let player = null;
  function refresh() {
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
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 0.3, 0.5, 0.01, refresh);
  panel.slider(par, s, 'off', 'offset loadline reaction forces', 0, 0.5, 0.05, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.05, 0.0025, refresh);
  panel.toggle(par, s, 'fun', 'show funicular polygon', refresh);
  panel.toggle(par, s, 'act', 'show actual load/support forces', refresh);
  panel.toggle(par, s, 'sc', 'show constraints', refresh);
  panel.toggle(par, s, 'lbl', 'show labels', refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS });
    panel.syncAll();
    refresh();
  });
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node',
               'node (0 = off, 1 = support A, 2–8 top, 9 = support B, 10–16 bottom)',
               0, 16, 1, refresh);

  const hits = [
    ['A', () => d.A, 1, 99], ['B', () => d.B, 1, 99], ['E', () => d.E, 1, 99],
    ['O', () => d.LL[0], 2, 99], ['v', () => [d.vx, s.oy], 6, 99],
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
      if (name === 'A') s.ay = clamp(wy, YLO, YHI);
      else if (name === 'B') s.by = clamp(wy, YLO, YHI);
      else if (name === 'E') s.ey = clamp(wy, YLO, YHI);
      else if (name === 'O') { s.ox = wx; s.oy = wy; }
      else if (name === 'v') s.vx = clamp(wx, s.ox - 11 * s.sFD, s.ox - 5 * s.sFD);
      refresh();
    },
  );

  dw.nodeSelect(nodeAt, (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
