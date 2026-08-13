/**
 * Drawing view/29 "Constant force bottom chord truss"
 * (https://block.arch.ethz.ch/eq/drawing/view/29) as a step-by-step
 * construction — the mirror sibling of view 27: the designer CHOOSES the
 * tension of the horizontal bottom chord (the deck); a funicular arch rises
 * above, the verticals become tension hangers carrying exactly one nodal
 * load each, and the diagonals stay zero-force until the point load Q.
 * The Cremona walk runs right-to-left, and the applet lays the load line
 * from the top as G5..G1 accordingly.
 *
 * Live port of view_29/applet_0/geogebra.xml; regression-checked against
 * the LIVE applet (default + Q at node 2) to 2.1e-14. The applet's offset
 * reaction caps A/B are swapped vs its own statics — labeled physically
 * here (notes/view_29_analysis.md).
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 29 — Constant Force Bottom Chord Truss',
  subtitle: 'choose the deck tension — the arch follows',
  about: 'A six-panel truss whose horizontal bottom chord — the deck — carries a tension force YOU choose (the F bottom chord slider): all chord force segments run from the load line to one common vertical line. A funicular arch rises above in compression, the verticals are hangers that each carry exactly one nodal load, and the four diagonals stay zero-force until an extra point load Q breaks the symmetry. The hidden layers of the original applet — the grey trial funicular for the division point i and the cyan derivation of the arch shape — are ported behind toggles.',
  frame: [[0.19, 0.43], [23.31, 11.99]],
};

// applet constants
const L1 = [1, 6], L2 = [13, 6];        // load-drawing line (deck level)
const DLS = 0.5;                        // distLoadSymbol -> chord at y = 6.5
const YC = L1[1] + DLS;                 // chord level
const G = 1;                            // loadG
const SLS = 0.8;                        // scaleLoadSymbol
const ACT_Y = [1.0, 11.14914131714639]; // action-line extent
const RESOLVE = 16;

const NUM_C = [21, 18, 14, 10, 6, 2];   // chord (walked right-to-left)
const NUM_A = [20, 16, 12, 8, 4, 1];    // arch
const NUM_V = [19, 15, 11, 7, 3];       // hangers
const NUM_D = [17, 13, 9, 5];           // diagonals
const IN_C = [4, 6, 8, 10, 12, 14];
const IN_A = [5, 7, 9, 11, 13, 14];
const IN_V = [6, 8, 10, 12, 14];

const DEFAULTS = {
  ox: 21, oy: 10,                        // load line start (LL0, free)
  Fb: 4,                                 // F_bottomChord [2, 5]
  sFD: 1,                                // scaleForceDiagram [0.5, 1]
  off: 0.6,                              // offsetReactionForces [0, 1]
  fQ: 0,                                 // factorQ [0, 4]
  pQ: 1,                                 // positionQ [1, 5]
  r1y: 10.622737437132727,               // dimension height (R_1)
  px: 24.50292845126759, py: 6.036726511022899,    // trial pole (free)
  fp0y: -10.780172565460067,             // trial start FP0 on x = 1 (applet default is below the canvas)
  sIF: 0.02,
  o1: true,
  trial: false,                          // show trial funicular
  cyan: false,                           // show construction (cyan layer)
  n4: true,
  lbl: true,                             // the applet's showLabels (its default is OFF; house default ON)
  node: 0,
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The deck', d: 'left: a horizontal bottom chord of six panels between the supports — the roadway the loads hang from' },
  { t: 'The loads — in both diagrams', d: 'left: five equal loads G₁…G₅ hang below the deck — right: laid off on the load line from the top, G₅ first: the Cremona walk will run right to left' },
  { t: 'The reactions', d: 'equal loads ⇒ A = B = 2½G — right: i divides the load line, A from the bottom up to i, B from i to the top, on the offset line — left: the supports push up' },
  { t: 'Choose the bottom chord force', d: 'right: mark T at the chosen distance F bottom chord left of the top (the slider!) — the top segment is the force of chord member 21' },
  { t: 'The arch sets off — member 20', d: 'right: T→i closes the right support node: the force of the first arch member — left: member 20 parallel to it, from the support up to the last action line' },
  { t: 'Hanger 19 — and chord 18 repeats', d: 'right: drop T→U = exactly G₅, then the horizontal to V is chord 18: the SAME length — left: the vertical hanger 19' },
  { t: 'Arch member 16', d: 'right: U→i — left: member 16 parallel to it finds the next arch node' },
  { t: 'Hanger 15, chord 14', d: 'right: drop V→W = G₄ and the next horizontal: again the same chord force — left: hanger 15' },
  { t: 'Arch member 12', d: 'right: W→i — left: member 12 reaches the crown' },
  { t: 'Hanger 11, chord 10', d: 'right: drop Z→A₁ = G₃ and the horizontal at the next level — left: hanger 11' },
  { t: 'Arch member 8', d: 'right: B₁→i — left: member 8 descends from the crown' },
  { t: 'Hanger 7, chord 6', d: 'right: drop C₁→B₁ = G₂ and the next horizontal — left: hanger 7' },
  { t: 'Arch member 4', d: 'right: D₁→i — left: member 4' },
  { t: 'Hanger 3, chord 2 — member 1 closes', d: 'right: drop D₁→E₁ = G₁, the last horizontal, and E₁→i lands exactly on the reaction A — left: hanger 3 and arch member 1 close on the left support' },
  { t: 'The silent diagonals', d: 'left: diagonals 5, 9, 13, 17 in black — under uniform load their forces are the ZERO gaps U=V, W=Z, A₁=B₁, C₁=D₁: they carry nothing' },
  { t: 'Compression, tension — and Q', d: 'arch blue = compression, deck + hangers pink = tension; raise factor Q and move position Q: i shifts, the chords differ, and the diagonals wake up — drag the load line, the dimension, or the sliders' },
];

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function compute(s) {
  const span = L2[0] - L1[0];
  const xs = [];
  for (let k = 0; k <= 6; k++) xs.push(L1[0] + (k * span) / 6);
  const top = xs.map((x) => [x, YC]);                 // chord nodes

  // loads at positions 1..5; load line REVERSED (top edge = G5)
  const g = [];
  for (let k = 1; k <= 5; k++) g.push(G * (1 + s.fQ * (k === Math.round(s.pQ) ? 1 : 0)));
  const LLd = [[s.ox, s.oy]];
  for (const k of [4, 3, 2, 1, 0]) LLd.push([s.ox, LLd[LLd.length - 1][1] - g[k] * s.sFD]);
  const iB = [s.ox, s.oy - 2.5 * G * s.sFD];
  const I = [s.ox - s.sFD * s.Fb, s.oy];

  // reactions; i = H sits |A| above the BOTTOM of the load line
  const B = g.reduce((acc, gk, k) => acc + (gk * (xs[k + 1] - xs[0])) / span, 0);
  const A = g.reduce((a2, gk) => a2 + gk, 0) - B;
  const H = [s.ox, LLd[5][1] + A * s.sFD];

  // arch shape (designed for the uniform case): side k || iB -> (x_I, level)
  const arch = [top[0]];
  for (let k = 0; k < 6; k++) {
    const lev = s.oy - (5 - k) * G * s.sFD;
    arch.push(V.intersect(arch[k], V.sub(iB, [I[0], lev]), [xs[k + 1], 0], [0, 1]));
  }

  // force-diagram walk (general Cremona, right-to-left)
  const hz = [1, 0], vt = [0, 1];
  const T = V.intersect(LLd[0], hz, H, V.sub(arch[6], arch[5]));
  const U = V.intersect(T, vt, H, V.sub(arch[5], arch[4]));
  const Vp = V.intersect(LLd[1], hz, U, V.sub(top[5], arch[4]));
  const W = V.intersect(Vp, vt, H, V.sub(arch[4], arch[3]));
  const Z = V.intersect(LLd[2], hz, W, V.sub(top[4], arch[3]));
  const A1 = V.intersect(LLd[3], hz, Z, vt);
  const B1 = V.intersect(H, V.sub(arch[3], arch[2]), A1, V.sub(arch[3], top[2]));
  const C1 = V.intersect(LLd[4], hz, B1, vt);
  const D1 = V.intersect(H, V.sub(arch[2], arch[1]), C1, V.sub(arch[2], top[1]));
  const E1 = V.intersect(LLd[5], hz, D1, vt);

  const O1 = [s.ox + s.off, LLd[0][1]];
  const Q1 = [s.ox + s.off, LLd[5][1]];
  const P1 = [s.ox + s.off, H[1]];

  // trial funicular
  const pole = [s.px, s.py];
  const fp = [[L1[0], s.fp0y]];
  for (let k = 0; k < 6; k++) {
    fp.push(V.intersect(fp[k], V.sub(pole, LLd[5 - k]), [xs[k + 1], 0], [0, 1]));
  }

  // colors + magnitudes (internalForce macro pairings)
  const col = (fm, fo) => (V.isCompression(V.ggbAngle(fm, fo)) ? PAL.blue : PAL.red);
  const FCP = [T, Vp, Z, A1, C1, E1];                // chord far points (top->bottom)
  const ARP = [T, U, W, B1, D1, E1];                 // arch force points
  const VPAIR = [[T, U], [Vp, W], [Z, A1], [B1, C1], [D1, E1]];
  const DPAIR = [[U, Vp], [W, Z], [B1, A1], [D1, C1]];
  const DFORM = [[arch[4], top[5]], [arch[3], top[4]], [top[2], arch[3]], [top[1], arch[2]]];
  const cC = [], cA = [], cV = [], cD = [], NC = [], NA = [], NV = [], ND = [];
  for (let k = 0; k < 6; k++) {
    cC.push(col(V.sub(top[6 - k], top[5 - k]), V.sub(LLd[k], FCP[k])));
    NC.push(V.dist(LLd[k], FCP[k]) / s.sFD);
    cA.push(col(V.sub(arch[6 - k], arch[5 - k]), V.sub(ARP[k], H)));
    NA.push(V.dist(ARP[k], H) / s.sFD);
  }
  for (let k = 0; k < 5; k++) {
    cV.push(col(V.sub(top[5 - k], arch[5 - k]), V.sub(VPAIR[k][1], VPAIR[k][0])));
    NV.push(V.dist(VPAIR[k][0], VPAIR[k][1]) / s.sFD);
  }
  for (let k = 0; k < 4; k++) {
    ND.push(V.dist(DPAIR[k][0], DPAIR[k][1]) / s.sFD);
    cD.push(s.fQ === 0 || ND[k] < 1e-9
      ? PAL.black
      : col(V.sub(DFORM[k][1], DFORM[k][0]), V.sub(DPAIR[k][1], DPAIR[k][0])));
  }

  return { xs, top, arch, LLd, iB, I, H, A, B, T, U, Vp, W, Z, A1, B1, C1,
           D1, E1, O1, Q1, P1, pole, fp, FCP, ARP, VPAIR, DPAIR, DFORM,
           cC, cA, cV, cD, NC, NA, NV, ND, g };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);

  const W_BAR = 0.038;
  const ARROW = { w: 0.05, headLen: 0.18, headW: 0.075 };
  const CYAN = 0x00b7c6;
  const liveC = (arr, k) => ({ pending: PAL.black, final: (dd) => dd[arr][k] });

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // step 1: the deck (chord)
  for (let k = 0; k < 6; k++) dw.seg(`mc${k}`, { intro: 1, w: W_BAR, color: liveC('cC', 5 - k) });
  for (let k = 0; k <= 6; k++) dw.disk(`pt_T${k}`, { intro: 1, r: 0.06, when: (st) => st.n4 });

  // step 2: loads + reversed load line
  for (let k = 0; k < 5; k++) {
    dw.dashLine(`al${k}`, { intro: 2, dash: 0.08 });
    dw.arrow(`ld${k}`, { intro: 2, ...ARROW });
    dw.label(`lG${k}`, `G${'₁₂₃₄₅'[k]}`, { intro: 2, color: PAL.green, when: (st) => st.lbl });
    dw.arrow(`lv${k}`, { intro: 2, ...ARROW });
    dw.label(`lLL${k}`, '', { intro: 2, color: { final: () => (s.fQ !== 0 && Math.round(s.pQ) === 5 - k ? PAL.orange : PAL.green) } });
  }
  dw.arrow('qArr', { intro: 2, ...ARROW, color: PAL.orange, when: (st) => st.fQ !== 0, flash: false });
  dw.label('lQ', 'Q', { intro: 2, color: PAL.orange, when: (st) => st.fQ !== 0, flash: false });

  // step 3: reactions (bottom part = A, top = B; physical labels)
  dw.dashLine('conA', { intro: 3, dash: 0.09, color: PAL.black });
  dw.dashLine('conB', { intro: 3, dash: 0.09, color: PAL.black });
  dw.dashLine('conI', { intro: 3, dash: 0.09, color: PAL.black });
  dw.arrow('rA', { intro: 3, ...ARROW });
  dw.arrow('rB', { intro: 3, ...ARROW });
  dw.label('lrA', 'A', { intro: 3, color: PAL.green, when: (st) => st.lbl });
  dw.label('lrB', 'B', { intro: 3, color: PAL.green, when: (st) => st.lbl });
  dw.arrow('fA', { intro: 3, ...ARROW });
  dw.arrow('fB', { intro: 3, ...ARROW });
  dw.label('lfA', 'A', { intro: 3, color: PAL.green, when: (st) => st.lbl });
  dw.label('lfB', 'B', { intro: 3, color: PAL.green, when: (st) => st.lbl });
  dw.disk('pt_i', { intro: 3, r: 0.055, when: (st) => st.n4 });
  dw.label('lp_i', 'i', { cls: 'point', intro: 3 });

  // step 4: the F_bottomChord dimension (hidden when Q is on)
  const whenU = (st) => st.fQ === 0;
  dw.dashLine('dimR1', { intro: 4, dash: 0.09, when: whenU });
  dw.dashLine('dimR2', { intro: 4, dash: 0.09, when: whenU });
  dw.seg('dimL', { intro: 4, w: 0.02, color: PAL.grey, flash: false, when: whenU });
  dw.strokes('dimT', 2, { intro: 4, w: 0.02, color: PAL.grey, flash: false, when: whenU });
  dw.label('dimLbl', '', { intro: 4, flash: false, color: PAL.grey, when: whenU });

  // members
  for (let k = 0; k < 6; k++) {
    dw.seg(`fc${k}`, { intro: IN_C[k], w: W_BAR, color: liveC('cC', k) });
    dw.seg(`ma${k}`, { intro: IN_A[k], w: W_BAR, color: liveC('cA', k) });
    dw.seg(`fa${k}`, { intro: IN_A[k], w: W_BAR, color: liveC('cA', k) });
  }
  for (let k = 0; k < 5; k++) {
    dw.seg(`mv${k}`, { intro: IN_V[k], w: W_BAR, color: liveC('cV', k) });
    dw.seg(`fv${k}`, { intro: IN_V[k], w: W_BAR, color: liveC('cV', k) });
    dw.disk(`pt_A${k}`, { intro: IN_A[k], r: 0.06, when: (st) => st.n4 });   // arch nodes R..J
  }
  for (let k = 0; k < 4; k++) {
    dw.seg(`md${k}`, { intro: 15, w: W_BAR, color: liveC('cD', k) });
    dw.seg(`fd${k}`, { intro: 15, w: W_BAR, color: liveC('cD', k) });
  }
  const FPT = ['T', 'U', 'V', 'W', 'Z', 'A1', 'B1', 'C1', 'D1', 'E1'];
  const FIN = { T: 4, U: 6, V: 6, W: 8, Z: 8, A1: 10, B1: 11, C1: 12, D1: 13, E1: 14 };
  for (const nm of FPT) dw.disk(`pt_${nm}`, { intro: FIN[nm], r: 0.05, when: (st) => st.n4 });
  dw.label('lp_T', 'T', { cls: 'point', intro: 4, when: (st) => st.n4 });
  dw.highlight('mc5', [4]);
  dw.highlight('rB', [5]);
  for (let k = 1; k < 6; k++) dw.highlight(`mc${5 - k}`, [IN_C[k]]);
  dw.highlight('rA', [14]);
  dw.highlight('fA', [14]);

  // member numbers, both diagrams
  for (let k = 0; k < 6; k++) {
    dw.label(`nfC${k}`, `${NUM_C[k]}`, { cls: 'num', intro: IN_C[k], color: liveC('cC', k), when: (st) => st.lbl });
    dw.label(`nsC${k}`, `${NUM_C[k]}`, { cls: 'num', intro: IN_C[k], color: liveC('cC', k), when: (st) => st.lbl });
    dw.label(`nfA${k}`, `${NUM_A[k]}`, { cls: 'num', intro: IN_A[k], color: liveC('cA', k), when: (st) => st.lbl });
    dw.label(`nsA${k}`, `${NUM_A[k]}`, { cls: 'num', intro: IN_A[k], color: liveC('cA', k), when: (st) => st.lbl });
  }
  for (let k = 0; k < 5; k++) {
    dw.label(`nfV${k}`, `${NUM_V[k]}`, { cls: 'num', intro: IN_V[k], color: liveC('cV', k), when: (st) => st.lbl });
    dw.label(`nsV${k}`, `${NUM_V[k]}`, { cls: 'num', intro: IN_V[k], color: liveC('cV', k), when: (st) => st.lbl });
  }
  for (let k = 0; k < 4; k++) {
    dw.label(`nfD${k}`, `${NUM_D[k]}`, { cls: 'num', intro: 15, color: liveC('cD', k), when: (st) => st.lbl });
    dw.label(`nsD${k}`, `${NUM_D[k]}`, { cls: 'num', intro: 15, color: liveC('cD', k), when: (st) => st.lbl && st.fQ !== 0 });
  }

  // hidden layers (instant): grey trial + cyan derivation
  const whenT = (st) => st.trial;
  const whenC = (st) => st.cyan;
  const layer = [];
  for (let k = 0; k < 6; k++) { dw.seg(`tray${k}`, { w: 0.02, color: PAL.grey, when: whenT }); layer.push(`tray${k}`); }
  for (let k = 0; k < 6; k++) { dw.seg(`tfun${k}`, { w: 0.025, color: PAL.grey, when: whenT }); layer.push(`tfun${k}`); }
  dw.dashLine('tclose', { dash: 0.14, when: whenT });
  dw.dashLine('tpar', { dash: 0.14, when: whenT });
  dw.disk('pt_pole', { r: 0.075, when: whenT });
  dw.disk('pt_fp0', { r: 0.075, when: whenT });
  layer.push('tclose', 'tpar', 'pt_pole', 'pt_fp0');
  for (let k = 0; k < 6; k++) { dw.seg(`cyr${k}`, { w: 0.02, color: CYAN, when: whenC }); layer.push(`cyr${k}`); }
  for (let k = 0; k < 5; k++) { dw.seg(`cyh${k}`, { w: 0.02, color: CYAN, when: whenC }); layer.push(`cyh${k}`); }
  dw.seg('cyv', { w: 0.02, color: CYAN, when: whenC });
  dw.disk('pt_iB', { r: 0.06, when: whenC });
  dw.label('lp_iB', 'i', { cls: 'point', color: CYAN, when: whenC });
  layer.push('cyv', 'pt_iB', 'lp_iB');
  dw.instant(...layer);

  // readouts + pipes
  for (const [nm, colr] of [['roC', PAL.red], ['roV', PAL.red], ['roA', PAL.blue],
                            ['roD', PAL.black], ['roR', PAL.green]]) {
    dw.label(nm, '', { intro: RESOLVE, flash: false, color: colr });
  }
  for (let k = 0; k < 6; k++) {
    dw.poly(`ipC${k}`, 4, { intro: RESOLVE, opacity: 0.4, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd.cC[k] }, when: (st) => st.o1 });
    dw.poly(`ipA${k}`, 4, { intro: RESOLVE, opacity: 0.4, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd.cA[k] }, when: (st) => st.o1 });
  }
  for (let k = 0; k < 5; k++) {
    dw.poly(`ipV${k}`, 4, { intro: RESOLVE, opacity: 0.4, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd.cV[k] }, when: (st) => st.o1 });
  }
  for (let k = 0; k < 4; k++) {
    dw.poly(`ipD${k}`, 4, { intro: RESOLVE, opacity: 0.4, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd.cD[k] }, when: (st) => st.o1 && st.fQ !== 0 });
  }

  dw.nodeInspector(5, { when: (st) => st.node > 0, w: 1.5 * W_BAR, headLen: 0.24, headW: 0.1, r: 0.085 });

  // dual hover pairs + ghosts
  for (let k = 0; k < 6; k++) {
    dw.link(`mc${5 - k}`, `fc${k}`, `nfC${k}`, `nsC${k}`);
    dw.link(`ma${k}`, `fa${k}`, `nfA${k}`, `nsA${k}`);
  }
  for (let k = 0; k < 5; k++) dw.link(`mv${k}`, `fv${k}`, `nfV${k}`, `nsV${k}`);
  for (let k = 0; k < 4; k++) dw.link(`md${k}`, `fd${k}`, `nfD${k}`, `nsD${k}`);
  for (let k = 0; k < 5; k++) dw.link(`ld${4 - k}`, `lv${k}`, `lG${4 - k}`, `lLL${k}`);
  dw.link('fA', 'rA', 'lfA', 'lrA');
  dw.link('fB', 'rB', 'lfB', 'lrB');
  dw.ghostable('fc0', 'fc1', 'fc2', 'fc3', 'fc4', 'fc5',
               'fa0', 'fa1', 'fa2', 'fa3', 'fa4', 'fa5',
               'fv0', 'fv1', 'fv2', 'fv3', 'fv4', 'rA', 'rB',
               'lv0', 'lv1', 'lv2', 'lv3', 'lv4', 'fd0', 'fd1', 'fd2', 'fd3');

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [1.75, 11.45]);
    dw.setLabel('force_title', [15.45, 11.45]);
    dw.setLabel('force_sub', [15.42, 11.1]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(2)} kN`);

    for (let k = 0; k < 6; k++) dw.setSeg(`mc${k}`, d.top[k], d.top[k + 1]);
    for (let k = 0; k <= 6; k++) dw.setDisk(`pt_T${k}`, d.top[k]);

    const pQ = Math.round(s.pQ);
    for (let k = 0; k < 5; k++) {
      const x = d.xs[k + 1];
      dw.setDashLine(`al${k}`, [[x, ACT_Y[0]], [x, ACT_Y[1]]]);
      dw.setArrow(`ld${k}`, [x, L1[1]], [x, L1[1] - SLS]);
      dw.setLabel(`lG${k}`, [x + 0.22, L1[1] - 0.38]);
      dw.setArrow(`lv${k}`, d.LLd[k], d.LLd[k + 1]);
      let gy = (d.LLd[k][1] + d.LLd[k + 1][1]) / 2;
      if (Math.abs(gy - d.H[1]) < 0.2) gy -= 0.24;
      dw.setLabel(`lLL${k}`, [s.ox + 0.28, gy]);
      dw.setText(`lLL${k}`, s.fQ !== 0 && pQ === 5 - k ? `G${'₅₄₃₂₁'[k]}+Q` : `G${'₅₄₃₂₁'[k]}`);
    }
    dw.setArrow('qArr', [d.xs[pQ], L1[1] - SLS], [d.xs[pQ], L1[1] - 2 * SLS]);
    dw.setLabel('lQ', [d.xs[pQ] + 0.2, L1[1] - SLS - 0.35]);

    dw.setDashLine('conA', [d.LLd[5], d.Q1]);
    dw.setDashLine('conB', [d.LLd[0], d.O1]);
    dw.setDashLine('conI', [d.H, d.P1]);
    dw.setArrow('rA', d.Q1, d.P1);
    dw.setArrow('rB', d.P1, d.O1);
    dw.setLabel('lrA', [d.Q1[0] + 0.26, (d.Q1[1] + d.P1[1]) / 2]);
    dw.setLabel('lrB', [d.O1[0] + 0.26, (d.P1[1] + d.O1[1]) / 2]);
    dw.setDisk('pt_i', d.H);
    dw.setLabel('lp_i', [d.H[0] - 0.2, d.H[1] + 0.16]);
    dw.setArrow('fA', [d.xs[0], L1[1] - SLS], [d.xs[0], L1[1]]);
    dw.setArrow('fB', [d.xs[6], L1[1] - SLS], [d.xs[6], L1[1]]);
    dw.setLabel('lfA', [d.xs[0] - 0.28, L1[1] - 0.42]);
    dw.setLabel('lfB', [d.xs[6] + 0.28, L1[1] - 0.42]);

    // dimension
    const S1p = [d.T[0], s.r1y], R1 = [s.ox, s.r1y];
    dw.setDashLine('dimR1', [d.T, S1p]);
    dw.setDashLine('dimR2', [d.LLd[0], R1]);
    dw.setSeg('dimL', S1p, R1);
    dw.setStrokes('dimT', [[[S1p[0], S1p[1] - 0.1], [S1p[0], S1p[1] + 0.1]],
                           [[R1[0], R1[1] - 0.1], [R1[0], R1[1] + 0.1]]]);
    dw.setLabel('dimLbl', [(S1p[0] + R1[0]) / 2, s.r1y + 0.28]);
    dw.setText('dimLbl', `F bottom chord = ${(s.Fb).toFixed(2)} kN`);

    // members
    for (let k = 0; k < 6; k++) {
      dw.setSeg(`fc${k}`, d.LLd[k], d.FCP[k]);
      dw.setSeg(`ma${k}`, d.arch[6 - k], d.arch[5 - k]);
      dw.setSeg(`fa${k}`, d.ARP[k], d.H);
    }
    for (let k = 0; k < 5; k++) {
      dw.setSeg(`mv${k}`, d.top[5 - k], d.arch[5 - k]);
      dw.setSeg(`fv${k}`, d.VPAIR[k][0], d.VPAIR[k][1]);
      dw.setDisk(`pt_A${k}`, d.arch[5 - k]);
    }
    for (let k = 0; k < 4; k++) {
      dw.setSeg(`md${k}`, d.DFORM[k][0], d.DFORM[k][1]);
      dw.setSeg(`fd${k}`, d.DPAIR[k][0], d.DPAIR[k][1]);
    }
    const fpts = { T: d.T, U: d.U, V: d.Vp, W: d.W, Z: d.Z, A1: d.A1, B1: d.B1, C1: d.C1, D1: d.D1, E1: d.E1 };
    for (const nm of FPT) dw.setDisk(`pt_${nm}`, fpts[nm]);
    dw.setLabel('lp_T', [d.T[0] - 0.18, d.T[1] + 0.16]);

    // numbers
    for (let k = 0; k < 6; k++) {
      const m = V.mid(d.top[5 - k], d.top[6 - k]);
      dw.setLabel(`nfC${k}`, [m[0], m[1] - s.sIF * d.NC[k] - 0.2]);   // below the deck
      dw.setLabel(`nsC${k}`, [d.FCP[k][0] + 0.35, d.FCP[k][1] + [0.16, -0.3, -0.18, -0.18, -0.18, -0.18][k]]);
      const ma = V.mid(d.arch[6 - k], d.arch[5 - k]);
      const n = V.perp(V.unit(V.sub(d.arch[5 - k], d.arch[6 - k])));
      const un = n[1] > 0 ? n : V.mul(n, -1);
      dw.setLabel(`nfA${k}`, V.add(ma, V.mul(un, s.sIF * d.NA[k] + 0.18)));
      const x0 = d.T[0] + 0.6;
      const yr = d.ARP[k][1] + ((x0 - d.ARP[k][0]) / (d.H[0] - d.ARP[k][0])) * (d.H[1] - d.ARP[k][1]);
      const above = k < 5 ? d.LLd[k + 1][1] : d.LLd[5][1];
      dw.setLabel(`nsA${k}`, [x0, (yr + above) / 2]);
    }
    for (let k = 0; k < 5; k++) {
      const mv = V.mid(d.top[5 - k], d.arch[5 - k]);
      dw.setLabel(`nfV${k}`, [mv[0] - s.sIF * d.NV[k] - 0.2, mv[1]]);
      const fm = V.mid(d.VPAIR[k][0], d.VPAIR[k][1]);
      dw.setLabel(`nsV${k}`, [fm[0] - 0.2, fm[1]]);
    }
    for (let k = 0; k < 4; k++) {
      const m = V.mid(d.DFORM[k][0], d.DFORM[k][1]);
      const n = V.perp(V.unit(V.sub(d.DFORM[k][1], d.DFORM[k][0])));
      const up = n[1] >= 0 ? n : V.mul(n, -1);
      dw.setLabel(`nfD${k}`, V.add(m, V.mul(up, 0.18)));
      const fm = V.mid(d.DPAIR[k][0], d.DPAIR[k][1]);
      dw.setLabel(`nsD${k}`, [fm[0] - 0.22, fm[1] + 0.14]);
    }

    // trial layer
    for (let k = 0; k < 6; k++) {
      dw.setSeg(`tray${k}`, d.LLd[k], d.pole);
      dw.setSeg(`tfun${k}`, d.fp[k], d.fp[k + 1]);
    }
    dw.setDashLine('tclose', [d.fp[0], d.fp[6]]);
    dw.setDashLine('tpar', [d.pole, d.H]);
    dw.setDisk('pt_pole', d.pole);
    dw.setDisk('pt_fp0', d.fp[0]);

    // cyan layer
    for (let k = 0; k < 6; k++) {
      dw.setSeg(`cyr${k}`, d.iB, [d.I[0], s.oy - k * G * s.sFD]);
    }
    for (let k = 0; k < 5; k++) {
      const lev = s.oy - (k + 1) * G * s.sFD;
      dw.setSeg(`cyh${k}`, [s.ox, lev], [d.I[0], lev]);
    }
    dw.setSeg('cyv', d.I, [d.I[0], s.oy - 5 * G * s.sFD]);
    dw.setDisk('pt_iB', d.iB);
    dw.setLabel('lp_iB', [d.iB[0] + 0.22, d.iB[1] - 0.16]);

    // readouts + pipes
    dw.setLabel('roC', [20.0, 2.35]);
    dw.setLabel('roV', [20.0, 2.0]);
    dw.setLabel('roA', [20.0, 1.65]);
    dw.setLabel('roD', [20.0, 1.3]);
    dw.setLabel('roR', [20.0, 0.95]);
    const uniform = s.fQ === 0;
    dw.setText('roC', uniform
      ? `bottom chord = ${d.NC[0].toFixed(2)} kN (constant — your choice)`
      : `bottom chord = ${Math.min(...d.NC).toFixed(2)}…${Math.max(...d.NC).toFixed(2)} kN`);
    dw.setText('roV', uniform
      ? `hangers = G = ${d.NV[0].toFixed(2)} kN`
      : `hangers = ${Math.min(...d.NV).toFixed(2)}…${Math.max(...d.NV).toFixed(2)} kN`);
    dw.setText('roA', `arch = ${Math.min(...d.NA).toFixed(2)}…${Math.max(...d.NA).toFixed(2)} kN`);
    dw.setText('roD', uniform ? 'diagonals = 0 (uniform load)'
      : `diagonals = ${Math.min(...d.ND).toFixed(2)}…${Math.max(...d.ND).toFixed(2)} kN`);
    dw.setText('roR', uniform
      ? `A = B = ${d.A.toFixed(2)} kN`
      : `A = ${d.A.toFixed(2)} kN, B = ${d.B.toFixed(2)} kN`);
    for (let k = 0; k < 6; k++) {
      dw.setPoly(`ipC${k}`, V.rectPoints(d.top[5 - k], d.top[6 - k], s.sIF * d.NC[k]));
      dw.setPoly(`ipA${k}`, V.rectPoints(d.arch[6 - k], d.arch[5 - k], s.sIF * d.NA[k]));
    }
    for (let k = 0; k < 5; k++) {
      dw.setPoly(`ipV${k}`, V.rectPoints(d.top[5 - k], d.arch[5 - k], s.sIF * d.NV[k]));
    }
    for (let k = 0; k < 4; k++) {
      dw.setPoly(`ipD${k}`, V.rectPoints(d.DFORM[k][0], d.DFORM[k][1], s.sIF * d.ND[k]));
    }
  }

  // ------------------------------------------------------------------
  // node inspector (12 nodes)
  // ------------------------------------------------------------------

  const NODE_NAMES = ['support A', 'deck 1', 'deck 2', 'deck 3', 'deck 4',
                      'deck 5', 'support B', 'arch 1', 'arch 2',
                      'arch 3 (crown)', 'arch 4', 'arch 5'];
  const NODE_DISKS = ['pt_T0', 'pt_T1', 'pt_T2', 'pt_T3', 'pt_T4', 'pt_T5',
                      'pt_T6', 'pt_A4', 'pt_A3', 'pt_A2', 'pt_A1', 'pt_A0'];
  const nodeAt = [];
  for (let k = 0; k <= 6; k++) nodeAt.push({ at: () => d.top[k] });
  for (let k = 1; k <= 5; k++) nodeAt.push({ at: () => d.arch[k] });

  function nodeSides(j) {
    const { LLd, H, T, U, Vp, W, Z, A1, B1, C1, D1, E1, O1, P1, Q1 } = d;
    switch (j) {
      case 0: return [[Q1, P1], [H, E1], [E1, LLd[5]]];              // A, arch 1, chord 2
      case 1: return [[LLd[4], LLd[5]], [LLd[5], E1], [E1, D1], [D1, C1], [C1, LLd[4]]];
      case 2: return [[LLd[3], LLd[4]], [LLd[4], C1], [C1, B1], [B1, A1], [A1, LLd[3]]];
      case 3: return [[LLd[2], LLd[3]], [LLd[3], A1], [A1, Z], [Z, LLd[2]]];
      case 4: return [[LLd[1], LLd[2]], [LLd[2], Z], [Z, W], [W, Vp], [Vp, LLd[1]]];
      case 5: return [[LLd[0], LLd[1]], [LLd[1], Vp], [Vp, U], [U, T], [T, LLd[0]]];
      case 6: return [[P1, O1], [LLd[0], T], [T, H]];                // B, chord 21, arch 20
      case 7: return [[E1, H], [H, D1], [D1, E1]];                   // J: arch 1, 4, hanger 3
      case 8: return [[D1, H], [H, B1], [B1, C1], [C1, D1]];         // L
      case 9: return [[B1, H], [H, W], [W, Z], [Z, A1], [A1, B1]];   // N (crown)
      case 10: return [[W, H], [H, U], [U, Vp], [Vp, W]];            // P
      default: return [[U, H], [H, T], [T, U]];                      // R
    }
  }

  function updateNode() {
    const n = Math.round(s.node);
    const j = clamp(n - 1, 0, 11);
    dw.selectDisk(n > 0 ? NODE_DISKS[j] : null);
    dw.setNodeInspector([7, 2.6], 0.85, n > 0 ? `node ${NODE_NAMES[j]}` : '', nodeSides(j));
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
  panel.slider(par, s, 'Fb', 'F bottom chord (kN)', 2, 5, 0.05, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 0.5, 1, 0.05, refresh);
  panel.slider(par, s, 'off', 'offset loadline reaction forces', 0, 1, 0.05, refresh);
  panel.slider(par, s, 'fQ', 'factor Q (Q = factor × G)', 0, 4, 0.1, refresh);
  panel.slider(par, s, 'pQ', 'position Q (node 1–5)', 1, 5, 1, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.05, 0.0025, refresh);
  panel.toggle(par, s, 'trial', 'show trial funicular', refresh);
  panel.toggle(par, s, 'cyan', 'show construction', refresh);
  panel.toggle(par, s, 'lbl', 'show labels', refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS });
    panel.syncAll();
    refresh();
  });
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node',
               'node (0 = off, 1 = support A, 2–6 deck, 7 = support B, 8–12 arch)',
               0, 12, 1, refresh);

  const hits = [
    ['O', () => d.LLd[0], 2, 99, () => true],
    ['R1', () => [(d.T[0] + s.ox) / 2, s.r1y], 4, 99, () => s.fQ === 0],
    ['pole', () => d.pole, 0, 99, () => s.trial],
    ['fp0', () => d.fp[0], 0, 99, () => s.trial],
  ];
  dw.enableDrag(
    (wx, wy, tol) => {
      let best = null;
      for (const [name, get, k0, k1, ok] of hits) {
        if (player.k < k0 || player.k >= k1 || !ok()) continue;
        const p = get();
        const dd = Math.hypot(p[0] - wx, p[1] - wy);
        if (dd < tol) { best = name; tol = dd; }
      }
      return best;
    },
    (name, wx, wy) => {
      if (name === 'O') { s.ox = wx; s.oy = wy; }
      else if (name === 'R1') s.r1y = clamp(wy, 10.05, 11.85);
      else if (name === 'pole') { s.px = wx; s.py = wy; }
      else if (name === 'fp0') s.fp0y = clamp(wy, -12, 5.5);
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
