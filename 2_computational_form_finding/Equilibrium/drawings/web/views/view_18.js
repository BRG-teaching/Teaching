/**
 * Drawing view/18 "Salginatobel Bridge"
 * (https://block.arch.ethz.ch/eq/drawing/view/18) as a step-by-step
 * construction: Maillart's three-hinged arch found as a funicular polygon.
 *
 * Three stages, all through the hinges A (springing), D (crown), B:
 *  1. COARSE - the deck weight as two half-deck resultants Q1, Q2 on the
 *     quarter lines; the chords of the three-hinge arch (A-D and B-D extended
 *     to the resultant lines) give the pole o1 -> three-sided funicular.
 *  2. REFINED - the deck split into 30 strips; the same chord construction on
 *     the full load line gives the pole o2 -> the 31-sided arch, which passes
 *     exactly through D and lands exactly on B.
 *  3. EXTRA LOAD Q - a point load Q = factor*g on a chosen strip; a trial
 *     pole o' and trial funicular wall-to-wall locate the crown crossing Z;
 *     the parallels through o' cut the load line at i1 and i2, and the crown
 *     chords A-D / D-B through them intersect at the final pole o -> the arch
 *     changes shape under the moving load.
 *
 * Live port of view_18/applet_0/geogebra.xml; the complete chain (coarse pole,
 * refined pole + every funicular vertex, Q insertion, trial, division points,
 * final pole + every vertex, crown + support closures) is regression-checked
 * against the baked view_18_compas.py coordinates to ~4e-7. The applet's
 * photo of the built bridge (20% opacity, below the form diagram) is
 * reproduced as a vector silhouette whose arch is the computed funicular.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 18 — Salginatobel Bridge',
  subtitle: 'a three-hinged arch as a funicular polygon, refined and re-found under a moving load',
  about: 'Maillart\'s Salginatobel bridge as a three-hinged funicular arch. The deck weight, first as two half-deck resultants and then as 30 strips, is hung from poles found with the chords of the three hinges A, D, B — the refined funicular passes exactly through the crown and the far springing. An extra load Q on any strip re-poses the three-point problem: a trial funicular locates the crown crossing, the crown chords give the new pole, and the arch changes shape under the moving load.',
  frame: [[-0.497, -2.159], [16.838, 6.509]],
};

const A = [0.5, 0], B = [9.5, 0];        // springing hinges
const XR = [0.5, 9.5];                   // wall verticals
const YD = 3.7343636612798607;           // upper deck line
const YH = 3.443842429204005;            // lower deck line
const AREA = (YD - YH) * 4.5;            // half-deck area (its weight)
const XQ = [2.75, 7.25];                 // quarter lines (resultants)
const SYM = [4.278485577372805, 3.7784855773728054];  // load-symbol band
const UP = [0, 1];
const N_STRIP = 30;
const RESOLVE = 18;

const DEFAULTS = {
  dy: 1.3498642813929091,                // crown hinge D on x = 5
  ox: 14, oy: 4,                         // load line start (both stages)
  cx: 12, cy: 5.7,                       // coarse / Q mini force diagrams start
  mx: 16.306518692334002, my: 1.9650250871004993,   // trial pole o'
  ny: 5.653926166228851,                 // trial start N on the left wall
  g: 0.1,                                // g [0.1, 1]
  fQ: 4,                                 // factor_Q [1, 5]
  pQ: 8,                                 // positionQ [1, 30] (strip carrying Q)
  sFD: 1.3,                              // scaleForceDiagram [0.5, 2]
  node: 0,                               // node-equilibrium inspector (0 = off)
  hideRF: false,
  sbg: false,                            // show the funiculars without Q at the end
  ph: true,                              // bridge silhouette (the applet's photo)
  n4: true,
  _k: 99,
};

// every construction move happens on BOTH sides at once
const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'Deck and three hinges', d: 'left: the deck strip spans the gorge; the arch must pass through the springings A, B and the crown hinge D (drag D!)' },
  { t: 'The deck weight — two resultants', d: 'left: each half-deck weighs Q₁ = Q₂, acting on the quarter lines — right: the same two loads stacked on a small load line' },
  { t: 'The chords of the three hinges', d: 'left: extend chord B–D to the first resultant line → D₃, and chord A–D to the second → E₃ (orange dashed) — right: parallels to D₃–A, B–D, A–D and E₃–B through the load-line ends' },
  { t: 'The pole o₁', d: 'right: through their crossings, parallels to the chords A–D and D–B meet at the pole o₁, with rays to the load line' },
  { t: 'The coarse funicular', d: 'left: from A parallel to the rays: through the crown D and exactly onto B — a first, three-sided arch' },
  { t: 'Refine: 30 strips', d: 'left: the deck is cut into 30 equal strips — right: their weights stacked on the full load line' },
  { t: 'The pole o₂', d: 'right: the SAME chord construction on the full load line gives the pole o₂ and its fan of rays' },
  { t: 'The refined arch', d: 'left: from A, one side parallel to each ray — 31 sides that pass exactly through D and land exactly on B' },
  { t: 'The built bridge', d: 'below: Maillart built exactly this funicular — deck, spandrels and arch (silhouette of the photograph)' },
  { t: 'An extra load Q', d: 'left: a point load Q = factor·g on one strip (drag it along the deck!) — right: Q on its own small load line' },
  { t: 'Q alone: chords → pole o₃', d: 'left: if Q acted alone, its funicular through the hinges would be A–B₇–B on the chord lines (dashed) — right: the parallels give its pole o₃' },
  { t: 'Q joins the load line', d: 'right: Q slots into the full load line at its strip (thick green) — left: the deck now carries strips + Q' },
  { t: 'Trial pole o′ and trial funicular', d: 'right: any trial pole o′ with rays to the new load line — left: a trial funicular wall to wall, one side per strip' },
  { t: 'Crown crossing → i₁ and i₂', d: 'left: the trial crosses the crown line at Z — dashed closings N–Z and Z–W — right: the parallels through o′ cut the load line at i₁ and i₂' },
  { t: 'Crown chords → the pole o', d: 'left: the crown chords A–D and D–B (orange dashed) — right: through i₁ ∥ A–D and through i₂ ∥ D–B: the final pole o and its fan' },
  { t: 'The arch under Q', d: 'left: from A, side by side, the final funicular — through D, onto B, but reshaped by Q' },
  { t: 'Reactions', d: 'right: the polygon closes: B = from below i₂ to o, A = from o back to the top — left: the thrusts push into the springings' },
  { t: 'Compression', d: 'the trials and the no-Q funiculars step back (toggle to compare) — the arch resolves blue = compression; drag Q, D, o′ or the sliders' },
];

const cache = {};
function inter(key, p1, d1, p2, d2) {
  cache[key] = V.intersect(p1, d1, p2, d2) || cache[key] || p1;
  return cache[key];
}

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const D = [5, s.dy];
  const stripX = [];                                    // strip boundary verticals
  for (let k = 0; k < N_STRIP; k++) stripX.push(0.65 + 0.3 * k);

  // chords of the three hinges, extended to the quarter lines
  const D3 = inter('D3', B, V.sub(D, B), [XQ[0], 0], UP);
  const E3 = inter('E3', A, V.sub(D, A), [XQ[1], 0], UP);

  // coarse force diagram: two half-deck resultants
  const C5 = [s.cx, s.cy];
  const wQ = AREA * s.sFD;
  const J5 = [C5[0], C5[1] - wQ];
  const K5 = [J5[0], J5[1] - wQ];
  const L5 = inter('L5', C5, V.sub(A, D3), J5, V.sub(B, D));
  const M5 = inter('M5', J5, V.sub(D, A), K5, V.sub(B, E3));
  const N5 = inter('N5', L5, V.sub(D, A), M5, V.sub(B, D));   // pole o1
  const O5 = inter('O5', A, V.sub(C5, N5), [XQ[0], 0], UP);
  const P5 = inter('P5', O5, V.sub(J5, N5), [XQ[1], 0], UP);

  // refined: 30 strips on the full load line
  const L1 = [s.ox, s.oy];
  const M1 = [L1[0], L1[1] - wQ];
  const P1 = [M1[0], M1[1] - wQ];
  const K2 = inter('K2', L1, V.sub(A, D3), M1, V.sub(B, D));
  const L2 = inter('L2', M1, V.sub(D, A), P1, V.sub(B, E3));
  const M2 = inter('M2', K2, V.sub(D, A), L2, V.sub(B, D));   // pole o2
  const pts = [];
  for (let k = 0; k <= N_STRIP; k++) pts.push(V.add(L1, V.mul(V.sub(P1, L1), k / N_STRIP)));
  const arch1 = [A];
  let p = A;
  for (let k = 0; k < N_STRIP; k++) {
    p = inter(`a1_${k}`, p, V.sub(pts[k], M2), [stripX[k], 0], UP);
    arch1.push(p);
  }
  arch1.push(B);

  // extra load Q on strip pQ
  const w = wQ / 15;                                    // one strip on the line
  const tQ = s.fQ * s.g * s.sFD;
  const xU = 0.5 + 0.3 * (s.pQ - 0.5);                  // Q's line of action
  const B7 = xU < 5 ? inter('B7a', B, V.sub(D, B), [xU, 0], UP)
                    : inter('B7b', A, V.sub(D, A), [xU, 0], UP);
  const D7 = C5;                                        // Q's mini diagram start
  const W14 = [D7[0], D7[1] - tQ];
  const G7 = inter('G7', D7, V.sub(B7, A), W14, V.sub(B, B7));  // pole o3

  // the load line with Q folded in
  const pts2 = [[s.ox, s.oy]];
  let y = s.oy;
  for (let k = 1; k <= N_STRIP; k++) {
    y -= w + (k === s.pQ ? tQ : 0);
    pts2.push([s.ox, y]);
  }
  const O7 = pts2[0], Q7 = pts2[N_STRIP];

  // trial funicular from N on the left wall with pole o' = M
  const M = [s.mx, s.my];
  const Nt = [XR[0], s.ny];
  const trial = [Nt];
  p = Nt;
  for (let k = 0; k < N_STRIP; k++) {
    p = inter(`t_${k}`, p, V.sub(pts2[k], M), [stripX[k], 0], UP);
    trial.push(p);
  }
  const W8 = inter('W8', p, V.sub(pts2[N_STRIP], M), [XR[1], 0], UP);
  trial.push(W8);
  // crown crossing
  let Z8 = [5, s.ny];
  for (let i = 0; i < trial.length - 1; i++) {
    const a = trial[i], b = trial[i + 1];
    if ((a[0] - 5) * (b[0] - 5) <= 0 && b[0] > a[0]) {
      Z8 = inter('Z8', a, V.sub(b, a), [5, 0], UP);
      break;
    }
  }
  // division points and the final pole
  const B9 = inter('B9', M, V.sub(Z8, Nt), O7, UP);     // i1 (upper)
  const A9 = inter('A9', M, V.sub(W8, Z8), O7, UP);     // i2 (lower)
  const C9 = inter('C9', B9, V.sub(D, A), A9, V.sub(B, D));    // final pole o

  // the final funicular
  const arch2 = [A];
  p = A;
  for (let k = 0; k < N_STRIP; k++) {
    p = inter(`h_${k}`, p, V.sub(pts2[k], C9), [stripX[k], 0], UP);
    arch2.push(p);
  }
  arch2.push(B);

  const col = (w2) => (V.isCompression(w2) ? PAL.blue : PAL.red);
  const cA = col(V.ggbAngle(V.sub(arch2[1], A), V.sub(C9, O7)));

  const RA = V.dist(C9, O7) / s.sFD;
  const RB = V.dist(Q7, C9) / s.sFD;

  return { D, stripX, D3, E3, C5, J5, K5, L5, M5, N5, O5, P5, wQ, tQ, xU,
           L1, M1, P1, K2, L2, M2, pts, arch1, B7, D7, W14, G7,
           pts2, O7, Q7, M, Nt, trial, W8, Z8, B9, A9, C9, arch2, cA, RA, RB };
}

const pairs = (poly) => poly.slice(0, -1).map((p, i) => [p, poly[i + 1]]);

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);

  const memberColor = { pending: PAL.black, final: (dd) => dd.cA };
  const W_BAR = 0.055, W_RAY = 0.016, W_STR = 0.035;
  const ARROW = { w: 0.07, headLen: 0.24, headW: 0.09 };
  const ORANGE = 0xe07a26;
  const early = (st) => st._k < RESOLVE || st.sbg;      // no-Q stages: toggle at the end

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // step 1: deck strip, walls, hinges
  dw.poly('deckF', 4, { intro: 1, opacity: 0.1, color: PAL.grey, flash: false });
  dw.strokes('deck', 4, { intro: 1, w: 0.03, color: PAL.black });
  dw.dashLine('crownL', { intro: 1, dash: 0.14 });
  dw.dashLine('wallL', { intro: 1, dash: 0.14 });
  dw.dashLine('wallR', { intro: 1, dash: 0.14 });

  // step 2: two resultants + coarse load line
  dw.dashLine('qline0', { intro: 2, outro: 6, dash: 0.14 });
  dw.dashLine('qline1', { intro: 2, outro: 6, dash: 0.14 });
  dw.arrow('resQ1', { intro: 2, outro: 6, ...ARROW });
  dw.arrow('resQ2', { intro: 2, outro: 6, ...ARROW });
  dw.arrow('cedge0', { intro: 2, outro: 10, ...ARROW });
  dw.arrow('cedge1', { intro: 2, outro: 10, ...ARROW });
  dw.label('lQ1', 'Q₁', { intro: 2, outro: 6, color: PAL.green });
  dw.label('lQ2', 'Q₂', { intro: 2, outro: 6, color: PAL.green });
  dw.label('lQ1f', 'Q₁', { intro: 2, outro: 10, color: PAL.green });
  dw.label('lQ2f', 'Q₂', { intro: 2, outro: 10, color: PAL.green });

  // step 3: hinge chords + parallels; step 4: pole o1 + rays; step 5: coarse funicular
  dw.dashLine('chDL', { intro: 3, outro: 6, color: ORANGE, dash: 0.16 });
  dw.dashLine('chAR', { intro: 3, outro: 6, color: ORANGE, dash: 0.16 });
  for (let i = 0; i < 4; i++) dw.dashLine(`cpar${i}`, { intro: 3, outro: 6, dash: 0.12 });
  dw.dashLine('cpole0', { intro: 4, outro: 6, dash: 0.12 });
  dw.dashLine('cpole1', { intro: 4, outro: 6, dash: 0.12 });
  for (let i = 0; i < 3; i++) dw.seg(`cray${i}`, { intro: 4, outro: 6, w: W_RAY, color: PAL.grey });
  dw.strokes('cfun', 3, { intro: 5, w: W_STR, color: PAL.black, when: early });

  // step 6: strips + full load line; step 7: pole o2 + fan; step 8: refined arch
  dw.strokes('ticks', N_STRIP - 1, { intro: 6, w: 0.012, color: PAL.grey });
  dw.arrow('edge0', { intro: 6, ...ARROW });
  dw.arrow('edge1', { intro: 6, ...ARROW });
  dw.strokes('lticks', N_STRIP + 1, { intro: 6, w: 0.014, color: PAL.grey });
  dw.seg('oray0', { intro: 7, outro: 12, w: 0.03, color: PAL.grey });
  dw.seg('oray1', { intro: 7, outro: 12, w: 0.03, color: PAL.grey });
  dw.strokes('fan2', N_STRIP - 1, { intro: 7, outro: 12, w: W_RAY, color: PAL.grey });
  dw.strokes('arch1', N_STRIP + 1, { intro: 8, w: W_STR, color: PAL.black, when: early });

  // step 9: the built bridge (vector silhouette of the photo)
  const silw = (st) => st.ph;
  dw.strokes('silDeck', 2, { intro: 9, w: 0.025, color: PAL.grey, when: silw });
  dw.strokes('silArch', N_STRIP + 3, { intro: 9, w: 0.05, color: PAL.grey, when: silw });
  dw.strokes('silCols', 8, { intro: 9, w: 0.03, color: PAL.grey, when: silw });
  dw.instant('silDeck', 'silArch', 'silCols');

  // step 10: the extra load Q; step 11: Q alone (chords -> pole o3)
  dw.arrow('loadQ', { intro: 10, ...ARROW, w: 0.085, headLen: 0.28, headW: 0.11 });
  dw.label('lQ', 'Q', { intro: 10, color: PAL.green });
  dw.arrow('qedge', { intro: 10, outro: RESOLVE, ...ARROW });
  dw.label('lQf', 'Q', { intro: 10, outro: RESOLVE, color: PAL.green });
  dw.dashLine('qch0', { intro: 11, outro: RESOLVE, dash: 0.12, color: PAL.black });
  dw.dashLine('qch1', { intro: 11, outro: RESOLVE, dash: 0.12, color: PAL.black });
  dw.dashLine('qpar0', { intro: 11, outro: RESOLVE, dash: 0.12 });
  dw.dashLine('qpar1', { intro: 11, outro: RESOLVE, dash: 0.12 });
  dw.seg('qray0', { intro: 11, outro: RESOLVE, w: W_RAY, color: PAL.grey });
  dw.seg('qray1', { intro: 11, outro: RESOLVE, w: W_RAY, color: PAL.grey });

  // step 12: Q joins the load line
  dw.arrow('edgeQa', { intro: 12, ...ARROW });
  dw.arrow('edgeQb', { intro: 12, ...ARROW });
  dw.seg('segQ', { intro: 12, w: 0.09, color: PAL.green });
  dw.label('lQl', 'Q', { intro: 12, color: PAL.green });
  dw.strokes('lticks2', N_STRIP + 1, { intro: 12, w: 0.014, color: PAL.grey });
  dw.highlight('loadQ', [12]);

  // step 13: trial pole + trial funicular; step 14: crown crossing -> i1, i2
  dw.strokes('tfan', N_STRIP + 1, { intro: 13, outro: RESOLVE, w: W_RAY, color: PAL.grey });
  dw.strokes('tfun', N_STRIP + 1, { intro: 13, outro: RESOLVE, w: W_STR, color: PAL.grey });
  dw.dashLine('tcl0', { intro: 14, outro: RESOLVE, dash: 0.14 });
  dw.dashLine('tcl1', { intro: 14, outro: RESOLVE, dash: 0.14 });
  dw.dashLine('tpar0', { intro: 14, outro: RESOLVE, dash: 0.12 });
  dw.dashLine('tpar1', { intro: 14, outro: RESOLVE, dash: 0.12 });

  // step 15: crown chords -> final pole o + fan; step 16: the final arch
  dw.dashLine('kch0', { intro: 15, color: ORANGE, dash: 0.16 });
  dw.dashLine('kch1', { intro: 15, color: ORANGE, dash: 0.16 });
  dw.dashLine('kpar0', { intro: 15, dash: 0.12 });
  dw.dashLine('kpar1', { intro: 15, dash: 0.12 });
  dw.strokes('fan3', N_STRIP + 1, { intro: 15, w: W_RAY, color: memberColor });
  dw.strokes('arch2', N_STRIP + 1, { intro: 16, w: W_BAR, color: memberColor });

  // step 17: reactions
  const rfw = (st) => !st.hideRF;
  dw.arrow('reacAf', { intro: 17, ...ARROW, when: rfw });
  dw.arrow('reacBf', { intro: 17, ...ARROW, when: rfw });
  dw.arrow('reacA', { intro: 17, ...ARROW });
  dw.arrow('reacB', { intro: 17, ...ARROW });
  dw.label('lRA', 'A', { intro: 17, color: PAL.green, when: rfw });
  dw.label('lRB', 'B', { intro: 17, color: PAL.green, when: rfw });

  // points
  const HANDLE = { r: 0.085 }, DERIVED = { r: 0.065 };
  const show = (st) => st.n4;
  dw.disk('pt_A', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_B', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_D', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_C5', { intro: 2, outro: 10, ...HANDLE, when: show });
  dw.disk('pt_D3', { intro: 3, outro: 6, ...DERIVED, when: show });
  dw.disk('pt_E3', { intro: 3, outro: 6, ...DERIVED, when: show });
  dw.disk('pt_N5', { intro: 4, outro: 6, ...DERIVED, when: show });
  dw.disk('pt_O', { intro: 6, ...HANDLE, when: show });
  dw.disk('pt_M2', { intro: 7, outro: 12, ...DERIVED, when: show });
  dw.disk('pt_D7', { intro: 10, outro: RESOLVE, ...HANDLE, when: show });
  dw.disk('pt_B7', { intro: 11, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_G7', { intro: 11, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_M', { intro: 13, outro: RESOLVE, ...HANDLE, when: show });
  dw.disk('pt_N', { intro: 13, outro: RESOLVE, ...HANDLE, when: show });
  dw.disk('pt_Z8', { intro: 14, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_B9', { intro: 14, ...DERIVED, when: show });
  dw.disk('pt_A9', { intro: 14, ...DERIVED, when: show });
  dw.disk('pt_C9', { intro: 15, ...DERIVED, when: show });

  const letters = {
    A: ['A', 1], B: ['B', 1], D: ['D', 1],
    D3: ['D₃', 3, 6], E3: ['E₃', 3, 6], N5: ['o₁', 4, 6],
    M2: ['o₂', 7, 12], B7: ['B₇', 11, RESOLVE], G7: ['o₃', 11, RESOLVE],
    M: ['o′', 13, RESOLVE], N: ['N', 13, RESOLVE], Z8: ['Z', 14, RESOLVE],
    B9: ['i₁', 14], A9: ['i₂', 14], C9: ['o', 15],
  };
  for (const [pn, [text, intro, outro]] of Object.entries(letters)) {
    dw.label(`lbl_${pn}`, text, { cls: 'point', intro, outro, when: show });
  }

  // readouts
  for (let i = 0; i < 3; i++) {
    dw.label(`ro${i}`, '', { intro: RESOLVE, flash: false,
              color: i < 2 ? PAL.green : { final: (dd) => dd.cA } });
  }

  // node-equilibrium inspector (free-body star + tip-to-tail sub-polygon)
  dw.nodeInspector(3, { when: (st) => st.node > 0, w: 1.5 * W_BAR, headLen: 0.28, headW: 0.11, r: 0.095 });

  // dual pairs
  dw.link('resQ1', 'cedge0', 'lQ1', 'lQ1f');
  dw.link('resQ2', 'cedge1', 'lQ2', 'lQ2f');
  dw.link('chDL', 'cpar0');
  dw.link('chAR', 'cpar2');
  dw.link('cfun', 'cray0', 'cray1', 'cray2');
  dw.link('arch1', 'fan2', 'oray0', 'oray1');
  dw.link('loadQ', 'qedge', 'lQ', 'lQf', 'segQ', 'lQl');
  dw.link('qch0', 'qpar0');
  dw.link('qch1', 'qpar1');
  dw.link('tfun', 'tfan');
  dw.link('tcl0', 'tpar0');
  dw.link('tcl1', 'tpar1');
  dw.link('kch0', 'kpar0');
  dw.link('kch1', 'kpar1');
  dw.link('arch2', 'fan3');
  dw.link('reacA', 'reacAf', 'lRA');
  dw.link('reacB', 'reacBf', 'lRB');
  dw.ghostable('edge0', 'edge1', 'edgeQa', 'edgeQb', 'segQ', 'reacAf', 'reacBf');

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  // reaction arrow offset beside its ray, pushed away from the polygon
  // centroid — shared by update() (the visible green arrows reacAf/reacBf)
  // and nodePoly() (the inspector's reaction sides land exactly on them)
  const reacSide = (a, b) => {
    const fcent = V.mul(V.add(V.add(d.O7, d.Q7), d.C9), 1 / 3);
    const u = V.unit(V.sub(b, a));
    const pp = V.perp(u);
    const sgn = V.dot(pp, V.sub(V.mid(a, b), fcent)) >= 0 ? 1 : -1;
    return [V.add(a, V.mul(pp, 0.18 * sgn)), V.add(b, V.mul(pp, 0.18 * sgn))];
  };

  function update() {
    dw.setLabel('form_title', [1.6, 6.15]);
    dw.setLabel('force_title', [11.3, 6.15]);
    dw.setLabel('force_sub', [15.55, 6.15]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(2)} kN`);

    // site
    dw.setPoly('deckF', [[0.5, YD], [9.5, YD], [9.5, YH], [0.5, YH]]);
    dw.setStrokes('deck', [[[0.5, YD], [9.5, YD]], [[0.5, YH], [9.5, YH]],
                           [[0.5, YD], [0.5, YH]], [[9.5, YD], [9.5, YH]]]);
    dw.setDashLine('crownL', [[5, YH], [5, -0.4]]);
    dw.setDashLine('wallL', [[0.5, YH], [0.5, -0.4]]);
    dw.setDashLine('wallR', [[9.5, YH], [9.5, -0.4]]);

    // coarse stage
    dw.setDashLine('qline0', [[XQ[0], SYM[0]], [XQ[0], 0]]);
    dw.setDashLine('qline1', [[XQ[1], SYM[0]], [XQ[1], 0]]);
    dw.setArrow('resQ1', [XQ[0], SYM[0]], [XQ[0], SYM[1]]);
    dw.setArrow('resQ2', [XQ[1], SYM[0]], [XQ[1], SYM[1]]);
    dw.setLabel('lQ1', [XQ[0] + 0.36, SYM[0] - 0.14]);
    dw.setLabel('lQ2', [XQ[1] + 0.36, SYM[0] - 0.14]);
    dw.setArrow('cedge0', d.C5, d.J5);
    dw.setArrow('cedge1', d.J5, d.K5);
    dw.setLabel('lQ1f', V.add(V.mid(d.C5, d.J5), [-0.32, 0]));
    dw.setLabel('lQ2f', V.add(V.mid(d.J5, d.K5), [-0.32, 0]));

    dw.setDashLine('chDL', [B, d.D3]);
    dw.setDashLine('chAR', [A, d.E3]);
    dw.setDashLine('cpar0', [d.C5, d.L5]);            // || D3-A
    dw.setDashLine('cpar1', [d.J5, V.add(d.L5, V.mul(V.sub(d.L5, d.J5), 0.35))]);  // || D-B
    dw.setDashLine('cpar2', [d.J5, d.M5]);            // || A-D
    dw.setDashLine('cpar3', [d.K5, V.add(d.M5, V.mul(V.sub(d.M5, d.K5), 0.35))]);  // || E3-B
    dw.setDashLine('cpole0', [d.L5, V.add(d.N5, V.mul(V.sub(d.N5, d.L5), 0.3))]);
    dw.setDashLine('cpole1', [d.M5, V.add(d.N5, V.mul(V.sub(d.N5, d.M5), 0.3))]);
    dw.setSeg('cray0', d.N5, d.C5);
    dw.setSeg('cray1', d.N5, d.J5);
    dw.setSeg('cray2', d.N5, d.K5);
    dw.setStrokes('cfun', [[A, d.O5], [d.O5, d.P5], [d.P5, B]]);

    // refined stage
    const tks = [];
    for (let k = 1; k < N_STRIP; k++) tks.push([[0.5 + 0.3 * k, YD], [0.5 + 0.3 * k, YH]]);
    dw.setStrokes('ticks', tks);
    dw.setArrow('edge0', d.L1, d.M1);
    dw.setArrow('edge1', d.M1, d.P1);
    dw.setStrokes('lticks', d.pts.map((pt) => [[pt[0] - 0.09, pt[1]], [pt[0] + 0.09, pt[1]]]));
    dw.setSeg('oray0', d.M2, d.L1);
    dw.setSeg('oray1', d.M2, d.P1);
    dw.setStrokes('fan2', d.pts.slice(1, N_STRIP).map((pt) => [d.M2, pt]));
    dw.setStrokes('arch1', pairs(d.arch1));

    // silhouette of the photo: deck band + the funicular arch mapped into it
    const my = (yy) => -1.85 + (yy / 3.75) * 2.55;      // form y -> photo band y
    dw.setStrokes('silDeck', [[[-0.2, my(YD) + 0.13], [10.2, my(YD) + 0.13]],
                              [[-0.2, my(YD) - 0.01], [10.2, my(YD) - 0.01]]]);
    dw.setStrokes('silArch', pairs([[0.35, my(0)], ...d.arch2.map((pp) => [pp[0], my(pp[1])]),
                                    [9.65, my(0)]]));
    const cols = [];
    for (const cx of [1.4, 2.3, 3.2, 5.9, 6.8, 7.7]) {
      const i = Math.max(1, Math.min(N_STRIP, Math.round((cx - 0.5) / 0.3)));
      cols.push([[cx, my(d.arch2[i][1])], [cx, my(YD)]]);
    }
    cols.push([[0.1, my(0) + 0.35], [0.1, my(YD)]], [[9.9, my(0) + 0.35], [9.9, my(YD)]]);
    dw.setStrokes('silCols', cols);

    // the extra load Q
    dw.setArrow('loadQ', [d.xU, SYM[0]], [d.xU, SYM[1]]);
    dw.setLabel('lQ', [d.xU - 0.36, SYM[0] - 0.14]);
    dw.setArrow('qedge', d.D7, d.W14);
    dw.setLabel('lQf', V.add(V.mid(d.D7, d.W14), [-0.3, 0]));
    dw.setDashLine('qch0', [A, d.B7]);
    dw.setDashLine('qch1', [d.B7, B]);
    dw.setDashLine('qpar0', [d.D7, V.add(d.G7, V.mul(V.sub(d.G7, d.D7), 0.2))]);
    dw.setDashLine('qpar1', [d.W14, V.add(d.G7, V.mul(V.sub(d.G7, d.W14), 0.2))]);
    dw.setSeg('qray0', d.G7, d.D7);
    dw.setSeg('qray1', d.G7, d.W14);

    // the load line with Q
    const qa = d.pts2[s.pQ - 1], qb = d.pts2[s.pQ];
    dw.setArrow('edgeQa', d.O7, qa);
    dw.setArrow('edgeQb', qb, d.Q7);
    dw.setSeg('segQ', qa, qb);
    dw.setLabel('lQl', [qa[0] + 0.38, (qa[1] + qb[1]) / 2]);
    dw.setStrokes('lticks2', d.pts2.map((pt) => [[pt[0] - 0.09, pt[1]], [pt[0] + 0.09, pt[1]]]));

    // trial + crown division
    dw.setStrokes('tfan', d.pts2.map((pt) => [d.M, pt]));
    dw.setStrokes('tfun', pairs(d.trial));
    dw.setDashLine('tcl0', [d.Nt, d.Z8]);
    dw.setDashLine('tcl1', [d.Z8, d.W8]);
    dw.setDashLine('tpar0', [d.M, d.B9]);
    dw.setDashLine('tpar1', [d.M, d.A9]);

    dw.setDashLine('kch0', [A, d.D]);
    dw.setDashLine('kch1', [d.D, B]);
    dw.setDashLine('kpar0', [d.B9, V.add(d.C9, V.mul(V.sub(d.C9, d.B9), 0.25))]);
    dw.setDashLine('kpar1', [d.A9, V.add(d.C9, V.mul(V.sub(d.C9, d.A9), 0.25))]);
    dw.setStrokes('fan3', d.pts2.map((pt) => [d.C9, pt]));
    dw.setStrokes('arch2', pairs(d.arch2));

    // reactions: beside the outer rays (right), thrust into the springings (left)
    const [ra0, ra1] = reacSide(d.C9, d.O7);
    const [rb0, rb1] = reacSide(d.Q7, d.C9);
    dw.setArrow('reacAf', ra0, ra1);
    dw.setArrow('reacBf', rb0, rb1);
    dw.setLabel('lRA', V.add(V.mid(ra0, ra1), V.mul(V.perp(V.unit(V.sub(ra1, ra0))), -0.5)));
    dw.setLabel('lRB', V.add(V.mid(rb0, rb1), V.mul(V.perp(V.unit(V.sub(rb1, rb0))), -0.5)));
    const uA = V.unit(V.sub(d.arch2[1], A)), uB = V.unit(V.sub(d.arch2[N_STRIP], B));
    dw.setArrow('reacA', V.sub(A, V.mul(uA, 0.8)), A);
    dw.setArrow('reacB', V.sub(B, V.mul(uB, 0.8)), B);

    dw.setDisk('pt_A', A);
    dw.setDisk('pt_B', B);
    dw.setDisk('pt_D', d.D);
    dw.setDisk('pt_C5', d.C5);
    dw.setDisk('pt_O', d.L1);
    for (const pn of ['D3', 'E3', 'N5', 'M2', 'D7', 'B7', 'G7', 'M', 'Z8', 'B9', 'A9', 'C9']) {
      dw.setDisk(`pt_${pn}`, d[pn]);
    }
    dw.setDisk('pt_N', d.Nt);

    const at = { A, B, D: d.D, D3: d.D3, E3: d.E3, N5: d.N5, M2: d.M2, B7: d.B7,
                 G7: d.G7, M: d.M, N: d.Nt, Z8: d.Z8, B9: d.B9, A9: d.A9, C9: d.C9 };
    const off = { A: [-0.3, -0.26], B: [0.3, -0.26], D: [0.06, 0.3],
                  D3: [-0.3, 0.22], E3: [0.34, 0.22], N5: [0.26, 0.24],
                  M2: [0.14, -0.32], B7: [0.03, 0.3], G7: [0.28, 0.2],
                  M: [0.3, 0.22], N: [-0.3, 0.12], Z8: [0.28, 0.22],
                  B9: [0.9, 0.14], A9: [0.9, -0.14], C9: [0.06, -0.34] };
    for (const pn of Object.keys(letters)) dw.setLabel(`lbl_${pn}`, V.add(at[pn], off[pn]));

    dw.setLabel('ro0', [15.6, 5.6]);
    dw.setText('ro0', `A = ${d.RA.toFixed(2)} kN`);
    dw.setLabel('ro1', [15.6, 5.25]);
    dw.setText('ro1', `B = ${d.RB.toFixed(2)} kN`);
    dw.setLabel('ro2', [15.6, 4.9]);
    dw.setText('ro2', `Q = ${(s.fQ * s.g).toFixed(2)} kN`);
  }

  // node-equilibrium inspector: 1 = A, 2..31 = strip nodes, 32 = B.
  // Each side of the node's sub-polygon is one force acting ON the node.
  // springing reactions use the SAME offset geometry as the visible green
  // arrows reacAf/reacBf (reacSide), so the black highlight lands exactly on
  // them; member forces stay on the rays (offsetting a side translates it —
  // its vector, hence the free-body star, is unchanged)
  function nodePoly() {
    const j = Math.round(s.node);
    if (j <= 1) return [reacSide(d.C9, d.O7), [d.O7, d.C9]];
    if (j >= N_STRIP + 2) return [reacSide(d.Q7, d.C9), [d.C9, d.Q7]];
    const k = j - 1;
    return [[d.pts2[k - 1], d.pts2[k]], [d.pts2[k], d.C9], [d.C9, d.pts2[k - 1]]];
  }
  function updateNode() {
    const j = Math.round(s.node);
    dw.selectDisk(null);
    const name = j <= 1 ? 'A' : j >= N_STRIP + 2 ? 'B' : `${j - 1}`;
    const pos = j <= 1 ? d.arch2[0] : j >= N_STRIP + 2 ? d.arch2[N_STRIP + 1] : d.arch2[j - 1];
    dw.setNodeInspector(pos, 0.72, `node ${name}`, nodePoly());
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
  panel.slider(par, s, 'g', 'g — load unit (kN)', 0.1, 1, 0.01, refresh);
  panel.slider(par, s, 'fQ', 'factor Q (Q = factor·g)', 1, 5, 0.1, refresh);
  panel.slider(par, s, 'pQ', 'position of Q (strip)', 1, 30, 1, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 0.5, 2, 0.05, refresh);
  panel.toggle(par, s, 'hideRF', 'hide reaction forces in force diagram', refresh);
  panel.toggle(par, s, 'sbg', 'show the funiculars without Q', refresh);
  panel.toggle(par, s, 'ph', 'show the built bridge (silhouette)', refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off, 1 = A, 2–31 = strip nodes, 32 = B)',
               0, N_STRIP + 2, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS });
    panel.syncAll();
    refresh();
  });

  const hits = [];
  hits.push(['D', () => d.D, 1, 99],
            ['C5', () => d.C5, 2, RESOLVE], ['O', () => d.L1, 6, 99],
            ['Q', () => [d.xU, (SYM[0] + SYM[1]) / 2], 10, 99],
            ['M', () => d.M, 13, RESOLVE], ['N', () => d.Nt, 13, RESOLVE]);
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
      if (name === 'D') s.dy = Math.max(0.55, Math.min(3.1, wy));
      else if (name === 'C5') { s.cx = wx; s.cy = wy; }
      else if (name === 'O') { s.ox = wx; s.oy = wy; }
      else if (name === 'Q') {
        s.pQ = Math.max(1, Math.min(30, Math.round((wx - 0.5) / 0.3 + 0.5)));
        panel.syncAll();
      } else if (name === 'M') { s.mx = wx; s.my = wy; }
      else if (name === 'N') s.ny = Math.max(4.2, Math.min(6.3, wy));
      refresh();
    },
  );

  // click a node of the final arch to inspect it
  const nodeIdx = [];
  for (let j = 1; j <= N_STRIP + 2; j++) nodeIdx.push(j);
  dw.nodeSelect(
    nodeIdx.map((j) => ({ at: () => (j <= 1 ? A : j >= N_STRIP + 2 ? B : d.arch2[j - 1]) })),
    (i) => {
      s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
      panel.syncAll();
      refresh();
    },
  );

  refresh();
  return player;
}
