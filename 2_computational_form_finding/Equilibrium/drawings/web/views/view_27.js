/**
 * Drawing view/27 "Constant force top chord truss"
 * (https://block.arch.ethz.ch/eq/drawing/view/27) as a step-by-step
 * construction — the dual of view 26: the designer CHOOSES the force of the
 * horizontal top chord (slider F_topChord); the funicular cable below and
 * the vertical struts follow from one vertical line in the force diagram.
 * The four diagonals are zero-force under the uniform loads and only
 * activate under the extra point load Q (factorQ / positionQ sliders).
 *
 * Live port of view_27/applet_0/geogebra.xml; the full chain (load line,
 * division i, cable shape designed from the uniform case, general Cremona
 * walk T,U,V,W,Z,A1..E1, offset reactions, hidden trial-funicular and cyan
 * derivation layers) is regression-checked against the LIVE applet in three
 * states (default, Q at node 2, F_top = 2.5) to 2.1e-14
 * (notes/view_27_analysis.md).
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 27 — Constant Force Top Chord Truss',
  subtitle: 'choose the chord force — the cable follows',
  about: 'A six-panel truss whose horizontal top chord carries a force YOU choose (the F top chord slider): all chord force segments run from the load line to one vertical line, so the chord force is constant. A funicular cable hangs below, connected by vertical struts that each carry exactly one nodal load, and the four diagonals stay zero-force — until an extra point load Q (sliders) breaks the symmetry and wakes them up. The applet\'s hidden layers — the grey trial funicular that finds the division point i and the cyan derivation of the cable shape — are ported behind toggles.',
  frame: [[0.19, 0.43], [23.33, 12.0]],
};

// applet constants
const L1 = [1, 10], L2 = [13, 10];      // load-drawing line (form)
const DLS = 1.5;                        // distLoadSymbol -> chord at y = 8.5
const YC = L1[1] - DLS;                 // chord level
const G = 1;                            // loadG
const SLS = 0.8;                        // scaleLoadSymbol (arrow lengths)
const ACT_Y = [1.032940180373247, 11.097159479378025]; // action-line extent
const RESOLVE = 16;

const NUM_C = [1, 4, 8, 12, 16, 20];    // top chord
const NUM_B = [2, 6, 10, 14, 18, 21];   // cable
const NUM_V = [3, 7, 11, 15, 19];       // struts
const NUM_D = [5, 9, 13, 17];           // diagonals (zero under uniform load)
const IN_C = [4, 6, 8, 10, 12, 14];     // chord force intros
const IN_B = [5, 7, 9, 11, 13, 14];     // cable intros
const IN_V = [6, 8, 10, 12, 14];        // strut intros

const DEFAULTS = {
  ox: 21, oy: 10,                        // load line start a (LL0, free)
  Ft: 4,                                 // F_topChord [2, 5]
  sFD: 1,                                // scaleForceDiagram [0.5, 1]
  off: 0.6,                              // offsetReactionForces [0, 1]
  fQ: 0,                                 // factorQ [0, 4]
  pQ: 1,                                 // positionQ [1, 5]
  r1y: 10.567505444106727,               // dimension height (R_1, draggable)
  px: 23.464406760000685, py: 7.528421303933554,   // trial pole (free)
  fp0y: 4.564909505883563,               // trial start FP0 on x = 1
  sIF: 0.02,                             // scaleInternalForces [0, 0.05]
  o1: true,                              // show internal forces
  trial: false,                          // show trial funicular (hidden checkbox)
  cyan: false,                           // show construction (hidden cyan layer)
  n4: true,                              // show points
  lbl: true,                             // the applet's showLabels (its default is OFF; house default ON)
  node: 0,
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The top chord', d: 'left: a horizontal chord of six panels between the supports, nodes at the five load points' },
  { t: 'The loads — in both diagrams', d: 'left: five equal loads G₁…G₅ on their dotted action lines — right: laid off tip-to-tail on the load line a→f' },
  { t: 'The reactions', d: 'equal loads ⇒ A = B = 2½G — right: i divides the load line, B = f→i and A = i→a on the offset line — left: the same pushes at the supports' },
  { t: 'Choose the top chord force', d: 'right: mark T at the chosen distance F top chord left of a (the slider!) — the dimension shows your choice; segment a–T is the force of chord member 1' },
  { t: 'The cable sets off — member 2', d: 'right: T→i closes the support node: the force of the first cable member — left: member 2 parallel to it, from the support to the first action line' },
  { t: 'Strut 3 — and chord 4 repeats', d: 'right: drop T→U = exactly G₁, then b–V is chord member 4: the SAME length as a–T — left: the vertical strut 3' },
  { t: 'Cable member 6', d: 'right: U→i — left: member 6 parallel to it finds the next cable node' },
  { t: 'Strut 7, chord 8', d: 'right: drop V→W = G₂ and c–Z: again the same chord force — left: strut 7' },
  { t: 'Cable member 10', d: 'right: W→i — left: member 10 reaches midspan' },
  { t: 'Strut 11, chord 12', d: 'right: drop Z→A₁ = G₃ and d–A₁ — left: strut 11' },
  { t: 'Cable member 14', d: 'right: B₁→i — left: member 14 starts climbing' },
  { t: 'Strut 15, chord 16', d: 'right: drop C₁→B₁ = G₄ and e–C₁ — left: strut 15' },
  { t: 'Cable member 18', d: 'right: D₁→i — left: member 18' },
  { t: 'Strut 19, chord 20 — member 21 closes', d: 'right: drop D₁→E₁ = G₅, f–E₁, and E₁→i lands exactly on the reaction B — left: strut 19 and the last cable member 21 close on the support' },
  { t: 'The silent diagonals', d: 'left: diagonals 5, 9, 13, 17 in black — under uniform load their forces are the ZERO gaps U=V, W=Z, A₁=B₁, C₁=D₁: they carry nothing' },
  { t: 'Compression, tension — and Q', d: 'chord + struts blue = compression, cable pink = tension; raise factor Q and move position Q: i shifts, the chords differ, and the diagonals wake up — drag a, the dimension, or the sliders' },
];

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function compute(s) {
  const span = L2[0] - L1[0];
  const xs = [];
  for (let k = 0; k <= 6; k++) xs.push(L1[0] + (k * span) / 6);
  const top = xs.map((x) => [x, YC]);

  // load line (Q-dependent) + uniform copy
  const g = [];
  for (let k = 1; k <= 5; k++) g.push(G * (1 + s.fQ * (k === Math.round(s.pQ) ? 1 : 0)));
  const LL = [[s.ox, s.oy]];
  for (let k = 0; k < 5; k++) LL.push([s.ox, LL[k][1] - g[k] * s.sFD]);
  const LLB = [];
  for (let k = 0; k <= 5; k++) LLB.push([s.ox, s.oy - k * G * s.sFD]);
  const iB = V.mid(LLB[0], LLB[5]);
  const I = [s.ox - s.sFD * s.Ft, s.oy];

  // division i = H (reactions of the general loads)
  const B = g.reduce((acc, gk, k) => acc + (gk * (xs[k + 1] - xs[0])) / span, 0);
  const A = g.reduce((a2, gk) => a2 + gk, 0) - B;
  const H = [s.ox, LL[5][1] + B * s.sFD];

  // cable shape (designed for the uniform case)
  const ray = (k) => [I[0], LLB[k][1]];
  const walk = (P, d, x) => V.intersect(P, d, [x, 0], [0, 1]);
  const cab = [top[0]];
  for (let k = 0; k < 6; k++) cab.push(walk(cab[k], V.sub(ray(k), iB), xs[k + 1]));
  // cab = [G1, J, L, N, P, R, G2close]

  // force diagram walk (general Cremona on the fixed geometry)
  const hz = [1, 0], vt = [0, 1];
  const T = V.intersect(LL[0], hz, H, V.sub(cab[1], cab[0]));
  const U = V.intersect(T, vt, H, V.sub(cab[2], cab[1]));
  const Vp = V.intersect(LL[1], hz, U, V.sub(cab[2], top[1]));
  const W = V.intersect(Vp, vt, H, V.sub(cab[3], cab[2]));
  const Z = V.intersect(LL[2], hz, W, V.sub(cab[3], top[2]));
  const A1 = V.intersect(LL[3], hz, Z, vt);
  const B1 = V.intersect(H, V.sub(cab[4], cab[3]), A1, V.sub(top[4], cab[3]));
  const C1 = V.intersect(LL[4], hz, B1, vt);
  const D1 = V.intersect(H, V.sub(cab[5], cab[4]), C1, V.sub(top[5], cab[4]));
  const E1 = V.intersect(LL[5], hz, D1, vt);

  // offset reaction chain
  const O1 = [s.ox + s.off, LL[0][1]];
  const Q1 = [s.ox + s.off, LL[5][1]];
  const P1 = [s.ox + s.off, H[1]];

  // trial funicular (toggle layer)
  const pole = [s.px, s.py];
  const fp = [[L1[0], s.fp0y]];
  for (let k = 0; k < 6; k++) fp.push(walk(fp[k], V.sub(pole, LL[k]), xs[k + 1]));

  // member colors + magnitudes
  const col = (fm, fo) => (V.isCompression(V.ggbAngle(fm, fo)) ? PAL.blue : PAL.red);
  const FCP = [T, Vp, Z, A1, C1, E1];              // chord force far points
  const CBP = [T, U, W, B1, D1, E1];               // cable force points
  // strut / diagonal force pairs in the internalForce macro's (arg3, arg4)
  // order — the force vector on the node is arg4 - arg3
  const VPAIR = [[U, T], [W, Vp], [A1, Z], [C1, B1], [E1, D1]];
  const DPAIR = [[Vp, U], [Z, W], [A1, B1], [C1, D1]];
  const DFORM = [[top[1], cab[2]], [top[2], cab[3]], [cab[3], top[4]], [cab[4], top[5]]];
  const cC = [], cB = [], cV = [], cD = [], NC = [], NB = [], NV = [], ND = [];
  for (let k = 0; k < 6; k++) {
    cC.push(col(V.sub(top[k + 1], top[k]), V.sub(FCP[k], LL[k])));
    NC.push(V.dist(LL[k], FCP[k]) / s.sFD);
    cB.push(col(V.sub(cab[k + 1], cab[k]), V.sub(H, CBP[k])));
    NB.push(V.dist(CBP[k], H) / s.sFD);
  }
  for (let k = 0; k < 5; k++) {
    cV.push(col(V.sub(cab[k + 1], top[k + 1]), V.sub(VPAIR[k][1], VPAIR[k][0])));
    NV.push(V.dist(VPAIR[k][0], VPAIR[k][1]) / s.sFD);
  }
  for (let k = 0; k < 4; k++) {
    ND.push(V.dist(DPAIR[k][0], DPAIR[k][1]) / s.sFD);
    cD.push(s.fQ === 0 || ND[k] < 1e-9
      ? PAL.black
      : col(V.sub(DFORM[k][1], DFORM[k][0]), V.sub(DPAIR[k][1], DPAIR[k][0])));
  }

  return { xs, top, cab, LL, LLB, iB, I, H, A, B, T, U, Vp, W, Z, A1, B1,
           C1, D1, E1, O1, Q1, P1, pole, fp, FCP, CBP, VPAIR, DPAIR, DFORM,
           cC, cB, cV, cD, NC, NB, NV, ND, g };
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

  // step 1: the top chord
  for (let k = 0; k < 6; k++) dw.seg(`mc${k}`, { intro: 1, w: W_BAR, color: liveC('cC', k) });
  for (let k = 0; k <= 6; k++) {
    dw.disk(`pt_T${k}`, { intro: 1, r: 0.06, when: (st) => st.n4 });
  }

  // step 2: loads + load line
  for (let k = 0; k < 5; k++) {
    dw.dashLine(`al${k}`, { intro: 2, dash: 0.08 });
    dw.arrow(`ld${k}`, { intro: 2, ...ARROW });
    dw.label(`lG${k}`, `G${'₁₂₃₄₅'[k]}`, { intro: 2, color: PAL.green, when: (st) => st.lbl });
    dw.arrow(`lv${k}`, { intro: 2, ...ARROW });
    dw.label(`lLL${k}`, '', { intro: 2, color: { final: (dd) => (s.fQ !== 0 && Math.round(s.pQ) === k + 1 ? PAL.orange : PAL.green) } });
  }
  dw.arrow('qArr', { intro: 2, ...ARROW, color: PAL.orange, when: (st) => st.fQ !== 0, flash: false });
  dw.label('lQ', 'Q', { intro: 2, color: PAL.orange, when: (st) => st.fQ !== 0, flash: false });
  for (let k = 0; k < 6; k++) {
    dw.disk(`pt_${'abcdef'[k]}`, { intro: 2, r: k ? 0.055 : 0.075, when: (st) => st.n4 });
    dw.label(`lp_${'abcdef'[k]}`, 'abcdef'[k], { cls: 'point', intro: 2, when: (st) => st.n4 });
  }

  // step 3: reactions
  dw.dashLine('conA', { intro: 3, dash: 0.09, color: PAL.black });
  dw.dashLine('conB', { intro: 3, dash: 0.09, color: PAL.black });
  dw.dashLine('conI', { intro: 3, dash: 0.09, color: PAL.black });
  dw.arrow('rB', { intro: 3, ...ARROW });
  dw.arrow('rA', { intro: 3, ...ARROW });
  dw.label('lrA', 'A', { intro: 3, color: PAL.green, when: (st) => st.lbl });
  dw.label('lrB', 'B', { intro: 3, color: PAL.green, when: (st) => st.lbl });
  dw.arrow('fA', { intro: 3, ...ARROW });
  dw.arrow('fB', { intro: 3, ...ARROW });
  dw.label('lfA', 'A', { intro: 3, color: PAL.green, when: (st) => st.lbl });
  dw.label('lfB', 'B', { intro: 3, color: PAL.green, when: (st) => st.lbl });
  dw.disk('pt_i', { intro: 3, r: 0.055, when: (st) => st.n4 });
  dw.label('lp_i', 'i', { cls: 'point', intro: 3 });

  // step 4: the F_topChord dimension (hidden when Q is on, per the applet)
  const whenU = (st) => st.fQ === 0;
  dw.dashLine('dimR1', { intro: 4, dash: 0.09, when: whenU });
  dw.dashLine('dimR2', { intro: 4, dash: 0.09, when: whenU });
  dw.seg('dimL', { intro: 4, w: 0.02, color: PAL.grey, flash: false, when: whenU });
  dw.strokes('dimT', 2, { intro: 4, w: 0.02, color: PAL.grey, flash: false, when: whenU });
  dw.label('dimLbl', '', { intro: 4, flash: false, color: PAL.grey, when: whenU });

  // members: chords' force segments, cable, struts, diagonals
  for (let k = 0; k < 6; k++) {
    dw.seg(`fc${k}`, { intro: IN_C[k], w: W_BAR, color: liveC('cC', k) });
    dw.seg(`mb${k}`, { intro: IN_B[k], w: W_BAR, color: liveC('cB', k) });
    dw.seg(`fb${k}`, { intro: IN_B[k], w: W_BAR, color: liveC('cB', k) });
  }
  for (let k = 0; k < 5; k++) {
    dw.seg(`mv${k}`, { intro: IN_V[k], w: W_BAR, color: liveC('cV', k) });
    dw.seg(`fv${k}`, { intro: IN_V[k], w: W_BAR, color: liveC('cV', k) });
    dw.disk(`pt_B${k}`, { intro: IN_B[k], r: 0.06, when: (st) => st.n4 });  // cable nodes J..R
  }
  for (let k = 0; k < 4; k++) {
    dw.seg(`md${k}`, { intro: 15, w: W_BAR, color: liveC('cD', k) });
    dw.seg(`fd${k}`, { intro: 15, w: W_BAR, color: liveC('cD', k) });
  }
  // force-walk point disks
  const FPT = ['T', 'U', 'V', 'W', 'Z', 'A1', 'B1', 'C1', 'D1', 'E1'];
  const FIN = { T: 4, U: 6, V: 6, W: 8, Z: 8, A1: 10, B1: 11, C1: 12, D1: 13, E1: 14 };
  for (const nm of FPT) dw.disk(`pt_${nm}`, { intro: FIN[nm], r: 0.05, when: (st) => st.n4 });
  dw.label('lp_T', 'T', { cls: 'point', intro: 4, when: (st) => st.n4 });
  dw.highlight('mc0', [4]);
  dw.highlight('rA', [5]);
  for (let k = 1; k < 6; k++) dw.highlight(`mc${k}`, [IN_C[k]]);
  dw.highlight('rB', [14]);
  dw.highlight('fB', [14]);

  // member numbers, both diagrams
  for (let k = 0; k < 6; k++) {
    dw.label(`nfC${k}`, `${NUM_C[k]}`, { cls: 'num', intro: IN_C[k], color: liveC('cC', k), when: (st) => st.lbl });
    dw.label(`nsC${k}`, `${NUM_C[k]}`, { cls: 'num', intro: IN_C[k], color: liveC('cC', k), when: (st) => st.lbl });
    dw.label(`nfB${k}`, `${NUM_B[k]}`, { cls: 'num', intro: IN_B[k], color: liveC('cB', k), when: (st) => st.lbl });
    dw.label(`nsB${k}`, `${NUM_B[k]}`, { cls: 'num', intro: IN_B[k], color: liveC('cB', k), when: (st) => st.lbl });
  }
  for (let k = 0; k < 5; k++) {
    dw.label(`nfV${k}`, `${NUM_V[k]}`, { cls: 'num', intro: IN_V[k], color: liveC('cV', k), when: (st) => st.lbl });
    dw.label(`nsV${k}`, `${NUM_V[k]}`, { cls: 'num', intro: IN_V[k], color: liveC('cV', k), when: (st) => st.lbl });
  }
  for (let k = 0; k < 4; k++) {
    dw.label(`nfD${k}`, `${NUM_D[k]}`, { cls: 'num', intro: 15, color: liveC('cD', k), when: (st) => st.lbl });
    // force-side diagonal numbers only when Q (their segments degenerate otherwise)
    dw.label(`nsD${k}`, `${NUM_D[k]}`, { cls: 'num', intro: 15, color: liveC('cD', k), when: (st) => st.lbl && st.fQ !== 0 });
  }

  // hidden layers: grey trial funicular + cyan derivation (instant)
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
  for (const [nm, colr] of [['roC', PAL.blue], ['roV', PAL.blue], ['roB', PAL.red],
                            ['roD', PAL.black], ['roR', PAL.green]]) {
    dw.label(nm, '', { intro: RESOLVE, flash: false, color: colr });
  }
  for (let k = 0; k < 6; k++) {
    dw.poly(`ipC${k}`, 4, { intro: RESOLVE, opacity: 0.4, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd.cC[k] }, when: (st) => st.o1 });
    dw.poly(`ipB${k}`, 4, { intro: RESOLVE, opacity: 0.4, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd.cB[k] }, when: (st) => st.o1 });
  }
  for (let k = 0; k < 5; k++) {
    dw.poly(`ipV${k}`, 4, { intro: RESOLVE, opacity: 0.4, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd.cV[k] }, when: (st) => st.o1 });
  }
  for (let k = 0; k < 4; k++) {
    dw.poly(`ipD${k}`, 4, { intro: RESOLVE, opacity: 0.4, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd.cD[k] }, when: (st) => st.o1 && st.fQ !== 0 });
  }

  // node inspector (12 nodes, up to 5 forces per node)
  dw.nodeInspector(5, { when: (st) => st.node > 0, w: 1.5 * W_BAR, headLen: 0.24, headW: 0.1, r: 0.085 });

  // dual hover pairs + ghosts
  for (let k = 0; k < 6; k++) {
    dw.link(`mc${k}`, `fc${k}`, `nfC${k}`, `nsC${k}`);
    dw.link(`mb${k}`, `fb${k}`, `nfB${k}`, `nsB${k}`);
  }
  for (let k = 0; k < 5; k++) dw.link(`mv${k}`, `fv${k}`, `nfV${k}`, `nsV${k}`);
  for (let k = 0; k < 4; k++) dw.link(`md${k}`, `fd${k}`, `nfD${k}`, `nsD${k}`);
  for (let k = 0; k < 5; k++) dw.link(`ld${k}`, `lv${k}`, `lG${k}`, `lLL${k}`);
  dw.link('fA', 'rA', 'lfA', 'lrA');
  dw.link('fB', 'rB', 'lfB', 'lrB');
  dw.ghostable('fc0', 'fc1', 'fc2', 'fc3', 'fc4', 'fc5',
               'fb0', 'fb1', 'fb2', 'fb3', 'fb4', 'fb5',
               'fv0', 'fv1', 'fv2', 'fv3', 'fv4', 'rA', 'rB');

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
      dw.setArrow(`lv${k}`, d.LL[k], d.LL[k + 1]);
      let gy = (d.LL[k][1] + d.LL[k + 1][1]) / 2;
      if (Math.abs(gy - d.H[1]) < 0.2) gy -= 0.24;   // clear of the i connector
      dw.setLabel(`lLL${k}`, [s.ox + 0.28, gy]);
      dw.setText(`lLL${k}`, s.fQ !== 0 && pQ === k + 1 ? `G${'₁₂₃₄₅'[k]}+Q` : `G${'₁₂₃₄₅'[k]}`);
    }
    dw.setArrow('qArr', [d.xs[pQ], L1[1] + SLS], [d.xs[pQ], L1[1]]);
    dw.setLabel('lQ', [d.xs[pQ] + 0.2, L1[1] + 0.55]);
    for (let k = 0; k < 6; k++) {
      dw.setDisk(`pt_${'abcdef'[k]}`, d.LL[k]);
      dw.setLabel(`lp_${'abcdef'[k]}`, [d.LL[k][0] - 0.2, d.LL[k][1] + 0.14]);
    }

    dw.setDashLine('conA', [d.LL[0], d.O1]);
    dw.setDashLine('conB', [d.LL[5], d.Q1]);
    dw.setDashLine('conI', [d.H, d.P1]);
    dw.setArrow('rB', d.Q1, d.P1);
    dw.setArrow('rA', d.P1, d.O1);
    dw.setLabel('lrB', [d.Q1[0] + 0.26, (d.Q1[1] + d.P1[1]) / 2]);
    dw.setLabel('lrA', [d.O1[0] + 0.26, (d.P1[1] + d.O1[1]) / 2]);
    dw.setDisk('pt_i', d.H);
    dw.setLabel('lp_i', [d.H[0] - 0.2, d.H[1] + 0.16]);
    dw.setArrow('fA', [d.xs[0], YC - DLS / 2 - SLS], [d.xs[0], YC - DLS / 2]);
    dw.setArrow('fB', [d.xs[6], YC - DLS / 2 - SLS], [d.xs[6], YC - DLS / 2]);
    dw.setLabel('lfA', [d.xs[0] - 0.28, YC - DLS / 2 - 0.42]);
    dw.setLabel('lfB', [d.xs[6] + 0.28, YC - DLS / 2 - 0.42]);

    // dimension F_topChord
    const S1p = [d.T[0], s.r1y], R1 = [s.ox, s.r1y];
    dw.setDashLine('dimR1', [d.T, S1p]);
    dw.setDashLine('dimR2', [d.LL[0], R1]);
    dw.setSeg('dimL', S1p, R1);
    dw.setStrokes('dimT', [[[S1p[0], S1p[1] - 0.1], [S1p[0], S1p[1] + 0.1]],
                           [[R1[0], R1[1] - 0.1], [R1[0], R1[1] + 0.1]]]);
    dw.setLabel('dimLbl', [(S1p[0] + R1[0]) / 2, s.r1y + 0.28]);
    dw.setText('dimLbl', `F top chord = ${(s.Ft).toFixed(2)} kN`);

    // members
    for (let k = 0; k < 6; k++) {
      dw.setSeg(`fc${k}`, d.LL[k], d.FCP[k]);
      dw.setSeg(`mb${k}`, d.cab[k], d.cab[k + 1]);
      dw.setSeg(`fb${k}`, d.CBP[k], d.H);
    }
    for (let k = 0; k < 5; k++) {
      dw.setSeg(`mv${k}`, d.top[k + 1], d.cab[k + 1]);
      dw.setSeg(`fv${k}`, d.VPAIR[k][0], d.VPAIR[k][1]);
      dw.setDisk(`pt_B${k}`, d.cab[k + 1]);
    }
    for (let k = 0; k < 4; k++) {
      dw.setSeg(`md${k}`, d.DFORM[k][0], d.DFORM[k][1]);
      dw.setSeg(`fd${k}`, d.DPAIR[k][0], d.DPAIR[k][1]);
    }
    const fpts = { T: d.T, U: d.U, V: d.Vp, W: d.W, Z: d.Z, A1: d.A1, B1: d.B1, C1: d.C1, D1: d.D1, E1: d.E1 };
    for (const nm of FPT) dw.setDisk(`pt_${nm}`, fpts[nm]);
    dw.setLabel('lp_T', [d.T[0] - 0.18, d.T[1] + 0.16]);

    // numbers — clearance-based
    for (let k = 0; k < 6; k++) {
      const m = V.mid(d.top[k], d.top[k + 1]);
      dw.setLabel(`nfC${k}`, [m[0], m[1] + s.sIF * d.NC[k] + 0.18]);
      dw.setLabel(`nsC${k}`, [d.FCP[k][0] + 0.35, d.FCP[k][1] + (k === 5 ? -0.18 : 0.16)]);
      const mb = V.mid(d.cab[k], d.cab[k + 1]);
      const n = V.perp(V.unit(V.sub(d.cab[k + 1], d.cab[k])));
      const dn = n[1] > 0 ? V.mul(n, -1) : n;
      dw.setLabel(`nfB${k}`, V.add(mb, V.mul(dn, s.sIF * d.NB[k] + 0.18)));
      // cable force numbers: just right of the vertical, mid-gap below the ray
      const x0 = d.T[0] + 0.6;
      const yr = d.CBP[k][1] + ((x0 - d.CBP[k][0]) / (d.H[0] - d.CBP[k][0])) * (d.H[1] - d.CBP[k][1]);
      const below = k < 5 ? d.LL[k + 1][1] : d.LL[5][1];
      dw.setLabel(`nsB${k}`, [x0, (yr + below) / 2]);
    }
    for (let k = 0; k < 5; k++) {
      const mv = V.mid(d.top[k + 1], d.cab[k + 1]);
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
      dw.setSeg(`tray${k}`, d.LL[k], d.pole);
      dw.setSeg(`tfun${k}`, d.fp[k], d.fp[k + 1]);
    }
    dw.setDashLine('tclose', [d.fp[0], d.fp[6]]);
    dw.setDashLine('tpar', [d.pole, d.H]);
    dw.setDisk('pt_pole', d.pole);
    dw.setDisk('pt_fp0', d.fp[0]);

    // cyan layer
    for (let k = 0; k < 6; k++) dw.setSeg(`cyr${k}`, d.iB, [d.I[0], d.LLB[k][1]]);
    for (let k = 0; k < 5; k++) dw.setSeg(`cyh${k}`, d.LLB[k + 1], [d.I[0], d.LLB[k + 1][1]]);
    dw.setSeg('cyv', d.I, [d.I[0], d.LLB[5][1]]);
    dw.setDisk('pt_iB', d.iB);
    dw.setLabel('lp_iB', [d.iB[0] + 0.22, d.iB[1] - 0.16]);

    // readouts + pipes
    dw.setLabel('roC', [19.2, 2.35]);
    dw.setLabel('roV', [19.2, 2.0]);
    dw.setLabel('roB', [19.2, 1.65]);
    dw.setLabel('roD', [19.2, 1.3]);
    dw.setLabel('roR', [19.2, 0.95]);
    const uniform = s.fQ === 0;
    dw.setText('roC', uniform
      ? `top chord = ${d.NC[0].toFixed(2)} kN (constant — your choice)`
      : `top chord = ${Math.min(...d.NC).toFixed(2)}…${Math.max(...d.NC).toFixed(2)} kN`);
    dw.setText('roV', uniform
      ? `struts = G = ${d.NV[0].toFixed(2)} kN`
      : `struts = ${Math.min(...d.NV).toFixed(2)}…${Math.max(...d.NV).toFixed(2)} kN`);
    dw.setText('roB', `cable = ${Math.min(...d.NB).toFixed(2)}…${Math.max(...d.NB).toFixed(2)} kN`);
    dw.setText('roD', uniform ? 'diagonals = 0 (uniform load)'
      : `diagonals = ${Math.min(...d.ND).toFixed(2)}…${Math.max(...d.ND).toFixed(2)} kN`);
    dw.setText('roR', uniform
      ? `A = B = ${d.A.toFixed(2)} kN`
      : `A = ${d.A.toFixed(2)} kN, B = ${d.B.toFixed(2)} kN`);
    for (let k = 0; k < 6; k++) {
      dw.setPoly(`ipC${k}`, V.rectPoints(d.top[k], d.top[k + 1], s.sIF * d.NC[k]));
      dw.setPoly(`ipB${k}`, V.rectPoints(d.cab[k], d.cab[k + 1], s.sIF * d.NB[k]));
    }
    for (let k = 0; k < 5; k++) {
      dw.setPoly(`ipV${k}`, V.rectPoints(d.top[k + 1], d.cab[k + 1], s.sIF * d.NV[k]));
    }
    for (let k = 0; k < 4; k++) {
      dw.setPoly(`ipD${k}`, V.rectPoints(d.DFORM[k][0], d.DFORM[k][1], s.sIF * d.ND[k]));
    }
  }

  // ------------------------------------------------------------------
  // node inspector
  // ------------------------------------------------------------------

  const NODE_NAMES = ['support A', 'top 1', 'top 2', 'top 3', 'top 4', 'top 5',
                      'support B', 'cable 1', 'cable 2', 'cable 3 (midspan)',
                      'cable 4', 'cable 5'];
  const NODE_DISKS = ['pt_T0', 'pt_T1', 'pt_T2', 'pt_T3', 'pt_T4', 'pt_T5',
                      'pt_T6', 'pt_B0', 'pt_B1', 'pt_B2', 'pt_B3', 'pt_B4'];
  const nodeAt = [];
  for (let k = 0; k <= 6; k++) nodeAt.push({ at: () => d.top[k] });
  for (let k = 1; k <= 5; k++) nodeAt.push({ at: () => d.cab[k] });

  function nodeSides(j) {
    const { LL, H, T, U, Vp, W, Z, A1, B1, C1, D1, E1, O1, P1, Q1 } = d;
    switch (j) {
      case 0: return [[P1, O1], [LL[0], T], [T, H]];
      case 1: return [[LL[0], LL[1]], [LL[1], Vp], [Vp, U], [U, T], [T, LL[0]]];
      case 2: return [[LL[1], LL[2]], [LL[2], Z], [Z, W], [W, Vp], [Vp, LL[1]]];
      case 3: return [[LL[2], LL[3]], [LL[3], A1], [A1, Z], [Z, LL[2]]];
      case 4: return [[LL[3], LL[4]], [LL[4], C1], [C1, B1], [B1, A1], [A1, LL[3]]];
      case 5: return [[LL[4], LL[5]], [LL[5], E1], [E1, D1], [D1, C1], [C1, LL[4]]];
      case 6: return [[Q1, P1], [H, E1], [E1, LL[5]]];
      case 7: return [[H, T], [T, U], [U, H]];
      case 8: return [[H, U], [U, Vp], [Vp, W], [W, H]];
      case 9: return [[H, W], [W, Z], [Z, A1], [A1, B1], [B1, H]];
      case 10: return [[H, B1], [B1, C1], [C1, D1], [D1, H]];
      default: return [[H, D1], [D1, E1], [E1, H]];
    }
  }

  function updateNode() {
    const n = Math.round(s.node);
    const j = clamp(n - 1, 0, 11);
    dw.selectDisk(n > 0 ? NODE_DISKS[j] : null);
    dw.setNodeInspector([7, 3.2], 0.85, n > 0 ? `node ${NODE_NAMES[j]}` : '', nodeSides(j));
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
  panel.slider(par, s, 'Ft', 'F top chord (kN)', 2, 5, 0.05, refresh);
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
               'node (0 = off, 1 = support A, 2–6 top, 7 = support B, 8–12 cable)',
               0, 12, 1, refresh);

  const hits = [
    ['O', () => d.LL[0], 2, 99, () => true],
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
      else if (name === 'fp0') s.fp0y = clamp(wy, 0.6, 7);
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
