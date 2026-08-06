/**
 * Drawing view/33 "Cantilever truss"
 * (https://block.arch.ethz.ch/eq/drawing/view/33) as a step-by-step
 * construction.
 *
 * A cantilever truss hangs off a wall: top support B (horizontal roller),
 * bottom support A (pin), tip C. Five equal loads act on the top chord.
 * A trial funicular locates the resultant R; the three-force rule (roller
 * line through B ∩ R's line of action -> the pin direction through A)
 * closes the load line at Z: the roller reaction A and the pin reaction
 * B_H + B_V. The force diagram is then built joint by joint in BOW'S
 * NOTATION (interior points 1..7), member by member; the "flip diagonals"
 * checkbox mirrors the diagonals and rebuilds the whole Cremona, swapping
 * tension and compression in the diagonals and verticals.
 *
 * Live port of view_33/applet_0/geogebra.xml; the full chain (33 points ×
 * default/flip/dragged states) matches the LIVE applet to ~2.5e-14 and all
 * 9 joint polygons close (scratchpad v33/regress33.py).
 * See notes/view_33_analysis.md.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 33 — Cantilever truss',
  subtitle: 'reactions by the three-force rule, then a Cremona diagram joint by joint',
  about: 'A cantilever truss on a wall: a horizontal roller at the top, a pin at the bottom, five equal loads on the top chord. A trial funicular polygon finds the resultant; where its line of action crosses the roller\'s horizontal, the three-force rule fixes the pin direction and closes the load line: reactions A, B_H, B_V. The force diagram is then constructed joint by joint in Bow\'s notation (points 1…7), and flipping the diagonals rebuilds it — swapping tension (pink) and compression (blue) in diagonals and verticals.',
  frame: [[-2.1, -7.0], [19.4, 3.8]],
};

const G1 = [11, 1.5];                    // load-line anchor (fixed expression)
const GT = 2.9522542206357034;           // action-line extent (T_2 / S_2 rails)
const GB = -6.6401120049908995;
const NLOAD = 5;
const TRIAL_END = 7;                     // trial + R + three-force apparatus retire
const RESOLVE = 15;

const DEFAULTS = {
  Ay: -3.3742915553004167,               // pin support A on the wall
  By: 0,                                 // roller support B on the wall
  Cx: 7.948067236594526,                 // tip C on y = 0
  M1: [17.53317812560403, -1.1321026360286477],  // trial pole o
  N1y: 2.5340361704207384,               // trial start on the wall
  V1y: -3.0863941553854986,              // R arrow tip on its action line
  sFD: 1,                                // scaleForceDiagram [0.5, 1.5]
  oRF: 0.8,                              // offsetReactionForces [0, 1]
  lsym: 1.445,                           // loadSymbol [0.5, 2] (R arrow length)
  sIF: 0.05,                             // scaleInternalForces [0, 0.1]
  o1: true,                              // show internal forces
  flip: false,                           // applet checkbox "flip diagonals"
  lab: true,                             // applet checkbox "show labels" (default TRUE)
  n4: true,                              // applet checkbox "show points" (Bow letters)
  node: 0,
  _k: 99,
};

// every construction move happens on BOTH sides at once
const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'A cantilever truss on the wall', d: 'left: top chord on the roller B, bottom chord on the pin A, tip C (drag all three!); verticals and diagonals divide it into four panels — the "flip diagonals" toggle mirrors the diagonals' },
  { t: 'Five equal loads', d: 'left: F₁ … F₅ act on the top-chord joints — right: stacked tip-to-tail on the load line (Bow\'s notation: b, c, d, e, f between the loads)' },
  { t: 'A trial funicular', d: 'right: any trial pole o with rays to the load points — left: a trial funicular from N₁, one string per panel, parallel to the rays' },
  { t: 'The resultant R', d: 'left: the outer strings (dashed), extended, meet at S₁: R acts on the vertical through S₁ (dashed green, drag it) — right: R = the whole load line' },
  { t: 'The three-force rule', d: 'left: the roller at B can only push horizontally; that line meets R\'s line of action at A₂ — so the pin reaction at A must point along A–A₂ — right: the parallel through the load-line end meets the roller\'s horizontal at the closing point Z' },
  { t: 'The reactions A, B_H, B_V', d: 'right: roller A = Z→top (drawn on its line), pin = bottom→Z split into B_V (beside) and B_H (above) — left: the wall pushes at B and at A (green arrows)' },
  { t: 'Joint by joint — point 1', d: 'the first support joint closes: the wall member 15 with its chord partner — right: from Z, parallel to the wall → Bow point 1' },
  { t: 'Point 2 — the first diagonal', d: 'the other support joint closes: diagonal 13 and the remaining chord — right: parallels through the load point and point 1 → point 2' },
  { t: 'Point 3 — the first vertical', d: 'the next joint closes with vertical 11 and a chord piece — right: the vertical through point 2 meets the chord parallel → point 3' },
  { t: 'Point 4 — the second diagonal', d: 'diagonal 9 and its chord partner — right: parallels meet at point 4' },
  { t: 'Point 5 — the second vertical', d: 'vertical 7 and a chord piece → point 5' },
  { t: 'Point 6 — the third diagonal', d: 'diagonal 5 and its chord partner → point 6' },
  { t: 'Point 7 — the last panel', d: 'vertical 3 and top chord 1 close the joint before the tip → point 7' },
  { t: 'The tip closes the diagram', d: 'left: the last chord piece 2 — right: its force must run from point 7 exactly back to the load-line end: the Cremona diagram closes (the check!)' },
  { t: 'Tension and compression', d: 'members resolve pink = tension (top chord, verticals) and blue = compression (bottom chord, diagonals) — FLIP THE DIAGONALS and watch them swap; pipes ∝ force; click a joint for its equilibrium' },
];

const cache = {};
function inter(key, p1, d1, p2, d2) {
  cache[key] = V.intersect(p1, d1, p2, d2) || cache[key] || p1;
  return cache[key];
}
const UP = [0, 1];

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const A = [0, s.Ay], B = [0, s.By], C = [s.Cx, 0];
  const D = V.add(A, V.mul(V.sub(C, A), 0.25));
  const E = V.add(A, V.mul(V.sub(C, A), 0.5));
  const F = V.add(A, V.mul(V.sub(C, A), 0.75));
  const dTop = V.sub(C, B);
  const G = inter('G', B, dTop, [D[0], 0], UP);
  const H = inter('H', B, dTop, [E[0], 0], UP);
  const I = inter('I', B, dTop, [F[0], 0], UP);

  // loads: 1 kN each, arrows 0.5 above the top chord (and above B)
  const topAt = (x) => inter('t' + x, B, dTop, [x, 0], UP)[1];
  const loadPts = [B, G, H, I, C];

  // load line
  const w = s.sFD;
  const LL = [];
  for (let k = 0; k <= NLOAD; k++) LL.push([G1[0], G1[1] - k * w]);
  const L1 = LL[5];

  // trial funicular
  const N1 = [0, s.N1y];
  const xs = [D[0], E[0], F[0], C[0]];
  const tv = [N1];
  for (let k = 0; k < 4; k++) {
    tv.push(inter(`tv${k}`, tv[k], V.sub(LL[k + 1], s.M1), [xs[k], 0], UP));
  }
  const S1 = inter('S1', N1, V.sub(LL[0], s.M1), tv[4], V.sub(LL[5], s.M1));
  const xR = S1[0];

  // three-force rule -> closing point Z
  const A2 = [xR, B[1]];
  const dPin = V.sub(A2, A);
  const Z1 = inter('Z1', L1, dPin, G1, [1, 0]);

  // Cremona (Bow points 1..7), depending on the diagonals
  const dBot = V.sub(C, A);
  let cp;
  if (!s.flip) {
    const B2 = inter('B2', Z1, UP, L1, dBot);
    const C2 = inter('C2', LL[1], dTop, B2, V.sub(D, B));
    const D2 = inter('D2', C2, UP, L1, dBot);
    const E2 = inter('E2', D2, V.sub(E, G), LL[2], dTop);
    const F2 = inter('F2', E2, UP, L1, dBot);
    const G2 = inter('G2', F2, V.sub(F, H), LL[3], dTop);
    const H2 = inter('H2', G2, UP, LL[4], dTop);
    cp = [B2, C2, D2, E2, F2, G2, H2];
  } else {
    const I2 = inter('I2', LL[1], dTop, Z1, UP);
    const J2 = inter('J2', I2, V.sub(G, A), L1, dBot);
    const K2 = inter('K2', J2, UP, LL[2], dTop);
    const L2 = inter('L2', K2, V.sub(H, D), L1, dBot);
    const M2 = inter('M2', L2, UP, LL[3], dTop);
    const N2 = inter('N2', M2, V.sub(I, E), L1, dBot);
    const O2 = inter('O2', L1, dBot, LL[4], dTop);
    cp = [I2, J2, K2, L2, M2, N2, O2];
  }
  const [p1, p2, p3, p4, p5, p6, p7] = cp;

  // members 1..15: [form a, form b, force f1, force f2, intro step]
  const M = s.flip ? [null,
    [I, C, LL[4], p7, 13], [F, C, p7, L1, 14], [I, F, p7, p6, 13],
    [H, I, LL[3], p5, 11], [E, I, p5, p6, 12], [E, F, p6, L1, 12],
    [H, E, p5, p4, 11], [G, H, LL[2], p3, 9], [D, H, p3, p4, 10],
    [D, E, p4, L1, 10], [G, D, p3, p2, 9], [B, G, LL[1], p1, 7],
    [A, G, p1, p2, 8], [A, D, p2, L1, 8], [B, A, p1, Z1, 7],
  ] : [null,
    [I, C, LL[4], p7, 13], [F, C, p7, L1, 14], [I, F, p7, p6, 13],
    [H, I, LL[3], p6, 12], [H, F, p6, p5, 12], [E, F, p5, L1, 11],
    [H, E, p5, p4, 11], [G, H, LL[2], p4, 10], [G, E, p4, p3, 10],
    [D, E, p3, L1, 9], [G, D, p3, p2, 9], [B, G, LL[1], p2, 8],
    [B, D, p2, p1, 8], [A, D, p1, L1, 7], [B, A, p1, Z1, 7],
  ];
  const col = [], N = [];
  for (let k = 1; k <= 15; k++) {
    const [a, b, f1, f2] = M[k];
    col[k] = V.isCompression(V.ggbAngle(V.sub(b, a), V.sub(f2, f1))) ? PAL.blue : PAL.red;
    N[k] = V.dist(f1, f2) / s.sFD;
  }

  // offset reactions
  const K3 = [G1[0] - s.oRF, G1[1]];
  const N3 = [G1[0] - s.oRF, L1[1]];
  const W3 = [G1[0], G1[1] + s.oRF];
  const M3 = [Z1[0], G1[1] + s.oRF];
  const RA = V.dist(Z1, G1) / s.sFD;
  const BH = V.dist(W3, M3) / s.sFD;
  const BV = V.dist(N3, K3) / s.sFD;

  return { A, B, C, D, E, F, G, H, I, dTop, loadPts, LL, L1, tv, S1, xR,
           A2, Z1, cp, M, col, N, K3, N3, W3, M3, RA, BH, BV };
}

const SUB = ' ₁₂₃₄₅';

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, M1: [...DEFAULTS.M1] };
  let d = compute(s);

  const W_BAR = 0.045, W_RAY = 0.014, W_FSEG = 0.032;
  const ARROW = { w: 0.05, headLen: 0.2, headW: 0.08 };
  const memCol = (k) => ({ pending: PAL.black, final: (dd) => dd.col[k] });
  const numCol = (k) => ({ final: (dd) => dd.col[k] });

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // ------------------------------------------------------------------
  // step 1 -- the truss skeleton + wall + action lines
  // ------------------------------------------------------------------
  dw.dashLine('wall', { intro: 1, dash: 0.06, color: 0x8a8a8a, flash: false });
  for (let i = 0; i < NLOAD; i++) {
    dw.dashLine(`act${i}`, { intro: 1, dash: 0.05, color: 0xafafaf, flash: false });
  }
  dw.strokes('skel', 15, { intro: 1, w: 0.016, color: PAL.grey });

  // step 2 -- loads + load line (edges hide behind R during steps 4-6,
  // exactly like the applet's step-3..6 window)
  const fedge = (st) => st._k <= 3 || st._k >= TRIAL_END;
  for (let i = 0; i < NLOAD; i++) {
    dw.arrow(`load${i}`, { intro: 2, ...ARROW });
    dw.label(`lF${i}`, `F${SUB[i + 1]}`, { cls: 'num', intro: 2, color: PAL.green });
    dw.arrow(`edge${i}`, { intro: 2, ...ARROW, when: fedge });
    dw.label(`lFf${i}`, `F${SUB[i + 1]}`, { cls: 'num', intro: 2, color: PAL.green, when: fedge });
  }
  const bows = ['b', 'c', 'd', 'e', 'f'];
  for (let i = 0; i < NLOAD; i++) {
    dw.disk(`pt_ll${i}`, { intro: 2, r: 0.05, face: 0x666666, edge: 0x666666,
            when: (st) => st.n4 });
    dw.label(`lbl_ll${i}`, bows[i], { cls: 'point', intro: 2, when: (st) => st.n4 });
  }
  dw.disk('pt_G1', { intro: 2, r: 0.06 });

  // steps 3-4 -- trial funicular -> S1 -> R (retire at TRIAL_END, applet <7)
  dw.strokes('trays', 6, { intro: 3, outro: TRIAL_END, w: W_RAY, color: PAL.grey });
  dw.strokes('tfun', 4, { intro: 3, outro: TRIAL_END, w: 0.02, color: PAL.grey });
  dw.dashLine('tout1', { intro: 3, outro: TRIAL_END, dash: 0.1 });
  dw.dashLine('tout2', { intro: 3, outro: TRIAL_END, dash: 0.1 });
  dw.disk('pt_M1', { intro: 3, outro: TRIAL_END, r: 0.07 });
  dw.disk('pt_N1', { intro: 3, outro: TRIAL_END, r: 0.07 });
  dw.label('lbl_M1', 'o', { cls: 'point', intro: 3, outro: TRIAL_END });
  dw.disk('pt_S1', { intro: 4, outro: TRIAL_END, r: 0.055, when: (st) => st.n4 });
  dw.label('lbl_S1', 'S₁', { cls: 'point', intro: 4, outro: TRIAL_END });
  dw.dashLine('loaR', { intro: 4, outro: TRIAL_END, dash: 0.12, color: PAL.grey });
  dw.dashLine('loaRf', { intro: 4, outro: TRIAL_END, dash: 0.06, color: PAL.grey });
  dw.dashArrow('resR', { intro: 4, outro: TRIAL_END, ...ARROW, dash: 0.1 });
  dw.label('lR', 'R', { intro: 4, outro: TRIAL_END, color: PAL.green });
  dw.dashArrow('resRf', { intro: 4, outro: TRIAL_END, ...ARROW, dash: 0.1 });
  dw.label('lRf', 'R', { intro: 4, outro: TRIAL_END, color: PAL.green });

  // step 5 -- three-force rule (retires at TRIAL_END, applet steps 5-6)
  dw.dashLine('clRoller', { intro: 5, outro: TRIAL_END, dash: 0.12, color: PAL.black });
  dw.dashLine('clPin', { intro: 5, outro: TRIAL_END, dash: 0.12, color: PAL.black });
  dw.disk('pt_A2', { intro: 5, outro: TRIAL_END, r: 0.055, when: (st) => st.n4 });
  dw.label('lbl_A2', 'A₂', { cls: 'point', intro: 5, outro: TRIAL_END });
  dw.seg('fPin', { intro: 5, outro: TRIAL_END, w: 0.025, color: PAL.black });
  dw.disk('pt_Z1', { intro: 5, r: 0.055, when: (st) => st.n4 });

  // step 6 -- reactions (permanent, like the applet from step 6 on)
  dw.arrow('reacAform', { intro: 6, ...ARROW });
  dw.arrow('reacBHform', { intro: 6, ...ARROW });
  dw.arrow('reacBVform', { intro: 6, ...ARROW });
  dw.label('lAform', 'A', { cls: 'num', intro: 6, color: PAL.green });
  dw.label('lBHform', 'B_H', { cls: 'num', intro: 6, color: PAL.green });
  dw.label('lBVform', 'B_V', { cls: 'num', intro: 6, color: PAL.green });
  dw.arrow('reacA', { intro: 6, ...ARROW });
  dw.arrow('reacBH', { intro: 6, ...ARROW });
  dw.arrow('reacBV', { intro: 6, ...ARROW });
  dw.label('lA', 'A', { cls: 'num', intro: 6, color: PAL.green });
  dw.label('lBH', 'B_H', { cls: 'num', intro: 6, color: PAL.green });
  dw.label('lBV', 'B_V', { cls: 'num', intro: 6, color: PAL.green });
  for (let i = 0; i < 4; i++) dw.dashLine(`conR${i}`, { intro: 6, dash: 0.05 });

  // steps 7-14 -- the members, joint by joint (intro varies with flip)
  for (let k = 1; k <= 15; k++) {
    const wk = (st, dd) => st._k >= dd.M[k][4];
    dw.seg(`mem${k}`, { intro: TRIAL_END, w: W_BAR, color: memCol(k), when: wk });
    dw.seg(`fseg${k}`, { intro: TRIAL_END, w: W_FSEG, color: memCol(k), when: wk });
    dw.label(`n${k}f`, `${k}`, { cls: 'num', intro: TRIAL_END, color: numCol(k),
             when: (st, dd) => st.lab && wk(st, dd) });
    dw.label(`n${k}s`, `${k}`, { cls: 'num', intro: TRIAL_END, color: numCol(k),
             when: (st, dd) => st.lab && wk(st, dd) });
  }
  for (let i = 0; i < 7; i++) {
    dw.disk(`pt_cp${i}`, { intro: TRIAL_END + i, r: 0.05, face: 0x666666,
            edge: 0x666666, when: (st) => st.n4 });
    dw.label(`lbl_cp${i}`, `${i + 1}`, { cls: 'point', intro: TRIAL_END + i,
             when: (st) => st.n4 });
  }

  // internal-force pipes (on by default)
  for (let k = 1; k <= 15; k++) {
    dw.poly(`if${k}`, 4, { intro: RESOLVE, opacity: 0.45, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd.col[k] }, when: (st) => st.o1 });
  }

  // points
  dw.disk('pt_A', { intro: 1, r: 0.075 });
  dw.disk('pt_B', { intro: 1, r: 0.075 });
  dw.disk('pt_C', { intro: 1, r: 0.075 });
  for (const pn of ['D', 'E', 'F', 'G', 'H', 'I']) {
    dw.disk(`pt_${pn}`, { intro: 1, r: 0.05, when: (st) => st.n4 });
  }
  dw.disk('pt_V1', { intro: 4, outro: TRIAL_END, r: 0.07 });

  // readouts
  for (let i = 0; i < 3; i++) {
    dw.label(`ro${i}`, '', { intro: 6, flash: false, color: PAL.green });
  }

  // node-equilibrium inspector
  dw.nodeInspector(5, { when: (st) => st.node > 0, w: 1.5 * W_BAR,
                        headLen: 0.22, headW: 0.09, r: 0.07 });

  // dual pairs
  for (let k = 1; k <= 15; k++) dw.link(`mem${k}`, `fseg${k}`, `n${k}f`, `n${k}s`);
  for (let i = 0; i < NLOAD; i++) {
    dw.link(`load${i}`, `edge${i}`, `lF${i}`, `lFf${i}`, `act${i}`);
  }
  dw.link('tfun', 'trays', 'tout1', 'tout2');
  dw.link('resR', 'resRf', 'lR', 'lRf', 'loaR', 'loaRf');
  dw.link('clPin', 'fPin');
  dw.link('reacAform', 'reacA', 'lAform', 'lA');
  dw.link('reacBHform', 'reacBH', 'lBHform', 'lBH');
  dw.link('reacBVform', 'reacBV', 'lBVform', 'lBV');
  dw.ghostable('fseg1', 'fseg2', 'fseg3', 'fseg4', 'fseg5', 'fseg6', 'fseg7',
               'fseg8', 'fseg9', 'fseg10', 'fseg11', 'fseg12', 'fseg13',
               'fseg14', 'fseg15', 'edge0', 'edge1', 'edge2', 'edge3', 'edge4',
               'reacA', 'reacBH', 'reacBV');

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [-1.6, 3.37]);
    dw.setLabel('force_title', [11.6, 3.37]);
    dw.setLabel('force_sub', [17.4, 3.37]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(2)} kN`);

    dw.setDashLine('wall', [[0, GT], [0, GB]]);
    const lx = [d.D[0], d.E[0], d.F[0], d.C[0]];
    dw.setDashLine('act0', [[0, GT], [0, GB]]);
    for (let i = 1; i < NLOAD; i++) {
      dw.setDashLine(`act${i}`, [[lx[i - 1], GT], [lx[i - 1], GB]]);
    }
    // skeleton: all 15 members thin grey below the colored ones
    dw.setStrokes('skel', d.M.slice(1).map(([a, b]) => [a, b]));

    // loads (0.5 above the top chord / above B) + load line
    for (let i = 0; i < NLOAD; i++) {
      const p = d.loadPts[i];
      dw.setArrow(`load${i}`, [p[0], p[1] + 1.5], [p[0], p[1] + 0.5]);
      dw.setLabel(`lF${i}`, [p[0] + 0.32, p[1] + 1.15]);
      dw.setArrow(`edge${i}`, d.LL[i], d.LL[i + 1]);
      dw.setLabel(`lFf${i}`, [d.LL[i][0] - 0.5, (d.LL[i][1] + d.LL[i + 1][1]) / 2]);
      dw.setDisk(`pt_ll${i}`, d.LL[i + 1]);
      dw.setLabel(`lbl_ll${i}`, V.add(d.LL[i + 1], [0.22, 0.16]));
    }
    dw.setDisk('pt_G1', G1);

    // trial
    dw.setStrokes('trays', d.LL.map((p) => [s.M1, p]));
    dw.setStrokes('tfun', d.tv.slice(0, -1).map((p, i) => [p, d.tv[i + 1]]));
    dw.setDashLine('tout1', [d.tv[0], d.S1]);
    dw.setDashLine('tout2', [d.S1, d.tv[4]]);
    dw.setDisk('pt_M1', s.M1);
    dw.setDisk('pt_N1', d.tv[0]);
    dw.setLabel('lbl_M1', V.add(s.M1, [0.28, 0.14]));
    dw.setDisk('pt_S1', d.S1);
    dw.setLabel('lbl_S1', V.add(d.S1, [0.3, 0.2]));

    // R on its line of action + on the load line
    dw.setDashLine('loaR', [[d.xR, GT], [d.xR, GB]]);
    dw.setDashLine('loaRf', [[G1[0], GT], [G1[0], GB]]);
    const v1 = [d.xR, s.V1y];
    dw.setDashArrow('resR', [d.xR, s.V1y + s.lsym], v1);
    dw.setLabel('lR', [d.xR + 0.28, s.V1y + 0.5 * s.lsym]);
    dw.setDashArrow('resRf', d.LL[0], d.L1);
    dw.setLabel('lRf', [G1[0] + 0.35, (G1[1] + d.L1[1]) / 2]);
    dw.setDisk('pt_V1', v1);

    // three-force rule
    dw.setDashLine('clRoller', [d.B, V.add(d.A2, V.mul(V.sub(d.A2, d.B), 0.15))]);
    dw.setDashLine('clPin', [d.A, V.add(d.A2, V.mul(V.sub(d.A2, d.A), 0.15))]);
    dw.setDisk('pt_A2', d.A2);
    dw.setLabel('lbl_A2', V.add(d.A2, [0.3, 0.22]));
    dw.setSeg('fPin', d.L1, d.Z1);
    dw.setDisk('pt_Z1', d.Z1);

    // reactions
    dw.setArrow('reacAform', V.add(d.B, [-1.5, 0]), V.add(d.B, [-0.5, 0]));
    dw.setArrow('reacBHform', V.add(d.A, [-1.5, 0]), V.add(d.A, [-0.5, 0]));
    dw.setArrow('reacBVform', V.add(d.A, [0, -1.5]), V.add(d.A, [0, -0.5]));
    dw.setLabel('lAform', V.add(d.B, [-1.1, 0.3]));
    dw.setLabel('lBHform', V.add(d.A, [-1.1, 0.34]));
    dw.setLabel('lBVform', V.add(d.A, [-0.42, -1.1]));
    dw.setArrow('reacA', d.Z1, d.LL[0]);
    dw.setArrow('reacBH', d.W3, d.M3);
    dw.setArrow('reacBV', d.N3, d.K3);
    dw.setLabel('lA', [(d.Z1[0] + G1[0]) / 2, G1[1] - 0.28]);
    dw.setLabel('lBH', [(d.W3[0] + d.M3[0]) / 2, d.W3[1] + 0.28]);
    dw.setLabel('lBV', [d.N3[0] - 0.45, (d.N3[1] + d.K3[1]) / 2]);
    dw.setDashLine('conR0', [d.LL[0], d.K3]);
    dw.setDashLine('conR1', [d.L1, d.N3]);
    dw.setDashLine('conR2', [d.LL[0], d.W3]);
    dw.setDashLine('conR3', [d.Z1, d.M3]);

    // members + force segments + numbers
    for (let k = 1; k <= 15; k++) {
      const [a, b, f1, f2] = d.M[k];
      dw.setSeg(`mem${k}`, a, b);
      dw.setSeg(`fseg${k}`, f1, f2);
      const m = V.mid(a, b), mf = V.mid(f1, f2);
      const isTop = [1, 4, 8, 12].includes(k);
      const isBot = [2, 6, 10, 14].includes(k);
      if (isTop) {
        dw.setLabel(`n${k}f`, [m[0], m[1] + 0.28]);
        dw.setLabel(`n${k}s`, [mf[0], mf[1] + 0.26]);
      } else if (isBot) {
        dw.setLabel(`n${k}f`, [m[0], m[1] - 0.3]);
        dw.setLabel(`n${k}s`, [mf[0], mf[1] - 0.28]);
      } else if (k === 15) {
        dw.setLabel(`n${k}f`, [m[0] + 0.3, m[1]]);
        dw.setLabel(`n${k}s`, [mf[0] + 0.3, mf[1]]);
      } else {
        // verticals + diagonals: beside, pushed left/up
        const pp = V.perp(V.unit(V.sub(b, a)));
        dw.setLabel(`n${k}f`, V.add(m, V.mul(pp, pp[1] > 0 ? 0.3 : -0.3)));
        const pf = V.perp(V.unit(V.sub(f2, f1)));
        dw.setLabel(`n${k}s`, V.add(mf, V.mul(pf, pf[0] > 0 ? 0.28 : -0.28)));
      }
    }
    for (let i = 0; i < 7; i++) {
      dw.setDisk(`pt_cp${i}`, d.cp[i]);
      dw.setLabel(`lbl_cp${i}`, V.add(d.cp[i], [0.24, 0.18]));
    }

    // pipes
    for (let k = 1; k <= 15; k++) {
      const [a, b] = d.M[k];
      dw.setPoly(`if${k}`, V.rectPoints(a, b, s.sIF * d.N[k]));
    }

    dw.setDisk('pt_A', d.A);
    dw.setDisk('pt_B', d.B);
    dw.setDisk('pt_C', d.C);
    for (const pn of ['D', 'E', 'F', 'G', 'H', 'I']) dw.setDisk(`pt_${pn}`, d[pn]);

    dw.setLabel('ro0', [18.3, 3.05]);
    dw.setText('ro0', `A = ${d.RA.toFixed(2)} kN`);
    dw.setLabel('ro1', [18.3, 2.7]);
    dw.setText('ro1', `B_H = ${d.BH.toFixed(2)} kN`);
    dw.setLabel('ro2', [18.3, 2.35]);
    dw.setText('ro2', `B_V = ${d.BV.toFixed(2)} kN`);
  }

  // node inspector: 1 = pin A, 2 = roller B, 3-5 = top chord G/H/I,
  // 6 = tip C, 7-9 = bottom chord D/E/F. The support reactions land on the
  // VISIBLE arrows: A on Z->G1, the pin as the offset components B_V + B_H.
  function nodePoly() {
    const n = Math.max(1, Math.round(s.node));
    const [p1, p2, p3, p4, p5, p6, p7] = d.cp;
    const { LL, L1, Z1 } = d;
    if (!s.flip) {
      switch (n) {
        case 1: return [[Z1, p1], [p1, L1], [d.N3, d.K3], [d.W3, d.M3]];
        case 2: return [[Z1, LL[0]], [LL[0], LL[1]], [LL[1], p2], [p2, p1], [p1, Z1]];
        case 3: return [[LL[1], LL[2]], [LL[2], p4], [p4, p3], [p3, p2], [p2, LL[1]]];
        case 4: return [[LL[2], LL[3]], [LL[3], p6], [p6, p5], [p5, p4], [p4, LL[2]]];
        case 5: return [[LL[3], LL[4]], [LL[4], p7], [p7, p6], [p6, LL[3]]];
        case 6: return [[LL[4], L1], [L1, p7], [p7, LL[4]]];
        case 7: return [[L1, p1], [p1, p2], [p2, p3], [p3, L1]];
        case 8: return [[L1, p3], [p3, p4], [p4, p5], [p5, L1]];
        default: return [[L1, p5], [p5, p6], [p6, p7], [p7, L1]];
      }
    }
    switch (n) {
      case 1: return [[Z1, p1], [p1, p2], [p2, L1], [d.N3, d.K3], [d.W3, d.M3]];
      case 2: return [[Z1, LL[0]], [LL[0], LL[1]], [LL[1], p1], [p1, Z1]];
      case 3: return [[LL[1], LL[2]], [LL[2], p3], [p3, p2], [p2, p1], [p1, LL[1]]];
      case 4: return [[LL[2], LL[3]], [LL[3], p5], [p5, p4], [p4, p3], [p3, LL[2]]];
      case 5: return [[LL[3], LL[4]], [LL[4], p7], [p7, p6], [p6, p5], [p5, LL[3]]];
      case 6: return [[LL[4], L1], [L1, p7], [p7, LL[4]]];
      case 7: return [[L1, p2], [p2, p3], [p3, p4], [p4, L1]];
      case 8: return [[L1, p4], [p4, p5], [p5, p6], [p6, L1]];
      default: return [[L1, p6], [p6, p7], [p7, L1]];
    }
  }
  const NODE_DISKS = ['pt_A', 'pt_B', 'pt_G', 'pt_H', 'pt_I', 'pt_C', 'pt_D', 'pt_E', 'pt_F'];
  const NODE_NAMES = ['pin A', 'roller B', 'G', 'H', 'I', 'tip C', 'D', 'E', 'F'];
  function updateNode() {
    const n = Math.max(1, Math.round(s.node));
    dw.selectDisk(s.node > 0 ? NODE_DISKS[n - 1] : null);
    dw.setNodeInspector(d[['A', 'B', 'G', 'H', 'I', 'C', 'D', 'E', 'F'][n - 1]],
                        0.55, s.node > 0 ? `joint ${NODE_NAMES[n - 1]}` : '', nodePoly());
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
  panel.toggle(par, s, 'flip', 'flip diagonals', refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 0.5, 1.5, 0.05, refresh);
  panel.slider(par, s, 'oRF', 'offset reaction forces', 0, 1, 0.05, refresh);
  panel.slider(par, s, 'lsym', 'load symbol (R arrow)', 0.5, 2, 0.05, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.1, 0.005, refresh);
  panel.toggle(par, s, 'lab', 'show labels (member numbers)', refresh);
  panel.toggle(par, s, 'n4', 'show points (Bow letters + 1-7)', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node',
               'node (0 = off, 1 = pin A, 2 = roller B, 3-5 top chord, 6 = tip, 7-9 bottom chord)',
               0, 9, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS, M1: [...DEFAULTS.M1] });
    panel.syncAll();
    refresh();
  });

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const hits = [
    ['A', () => d.A, 1, 99], ['B', () => d.B, 1, 99], ['C', () => d.C, 1, 99],
    ['M1', () => s.M1, 3, TRIAL_END], ['N1', () => d.tv[0], 3, TRIAL_END],
    ['V1', () => [d.xR, s.V1y], 4, TRIAL_END],
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
      if (name === 'A') s.Ay = clamp(wy, -6, -1);
      else if (name === 'B') s.By = clamp(wy, 0, 2.5);
      else if (name === 'C') s.Cx = clamp(wx, 4, 10);
      else if (name === 'M1') s.M1 = [wx, wy];
      else if (name === 'N1') s.N1y = clamp(wy, 1.2, 3.6);
      else if (name === 'V1') s.V1y = clamp(wy, -5.5, -1);
      refresh();
    },
  );

  // click a joint to inspect it
  const order = ['A', 'B', 'G', 'H', 'I', 'C', 'D', 'E', 'F'];
  dw.nodeSelect(
    order.map((pn) => ({ at: () => d[pn] })),
    (i) => {
      s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
      panel.syncAll();
      refresh();
    },
  );

  refresh();
  return player;
}
