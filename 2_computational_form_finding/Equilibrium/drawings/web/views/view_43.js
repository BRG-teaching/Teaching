/**
 * Drawing view/43 "Internal forces in a three-hinged frame -- line load"
 * (https://block.arch.ethz.ch/eq/drawing/view/43) as a step-by-step
 * construction.
 *
 * The applet has no step slider; it exposes three exclusive display modes
 * (buttons show N / show V / show M) plus checkboxes. Decoded staging:
 * a square three-hinged portal frame (feet A, C; corners B, D; girder hinge
 * I, draggable), uniformly distributed load q on the girder, split by the
 * hinge into the two resultants R1, R2. Two trial funiculars (poles Q_1 and
 * R_1, checkbox "trial funicular construction") find the division points
 * Z_1, A_2 on the load line; parallels to the hinge chords A-I and I-C
 * through them meet at the pole I_1, whose distance to the load line is the
 * thrust H and whose height splits the load line into A_V and B_V. The N,
 * V, M diagrams are drawn on a frame copy 15 units below (red, exactly the
 * applet's construction: rotated reaction components, corner moments
 * M4 = M5 = H*h with quarter-circle arcs, the M parabola as a funicular
 * from pole E_5, and the ideal thrust line as the funicular of pole I_1 --
 * with the M_x = H*y_x equivalence probe on a draggable point L).
 * A second hidden layer (checkbox "show construction") shows the three-force
 * superposition that finds the same pole from the two partial loads.
 *
 * Whole chain regression-checked against the LIVE applet (default and
 * dragged hinge I = 2.5) to 3.7e-14; H and A_V cross-checked analytically.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 43 — Internal forces in a three-hinged frame – line load',
  subtitle: 'N, V and M diagrams of a three-hinged portal frame under a uniformly distributed load, built from the force diagram',
  about: 'A three-hinged portal frame under a uniformly distributed load q: the hinge splits the load into R₁ and R₂, two trial funiculars find the division points on the load line, and parallels to the hinge chords meet at the pole I₁ — its offset is the thrust H, its height the split A_V / B_V. The N, V and M diagrams are then drawn on a copy of the frame from exactly these force-diagram lengths, the M parabola hangs from its own pole, and the ideal thrust line shows M_x = H·y_x at every point. Drag the hinge I to see all diagrams follow.',
  frame: [[-9.8, -14.4], [32.2, 14.2]],
};

const DIV = 20;
const RESOLVE = 14;

const DEFAULTS = {
  yA: 2.0981379796255193,           // foot level (A draggable on the axis)
  f1: 8,                            // frame size (span = height) [2, 10]
  xI: 4.006553346166758,            // hinge position on the girder (drag!)
  q: 16,                            // load intensity [10, 50]
  sFD: 10,                          // scaleForceDiagram [5, 20]
  sLS: 0.6,                         // scaleLoadSymbol [0.2, 1]
  sMD: 50, sND: 30, sVD: 30,        // diagram scales
  dC: 15,                           // copy offset (distanceM/N/V)
  llx: 18, lly: 8,                  // LL0 -- load line anchor (drag)
  yL1: 12.556197669995312,          // load band top (drag)
  q1x: 22.53459168992267, q1y: 5.728017251854537,     // trial pole Q_1 (drag)
  r1x: 13.678425267686578, r1y: -1.6233680311050127,  // trial pole R_1 (drag)
  yP1: 5.4967720681905385,          // left trial start on the wall (drag)
  yU1: 3.5896891619332427,          // right trial start on the hinge line (drag)
  yB1: 0.19667258137646648,         // l1/l2 dimension height
  yE: -0.8172816008287924,          // l dimension height
  xF: -2.360299653575247,           // h dimension x
  yJ2: 10.444942803124363,          // R1/R2 arrow tip level
  yJ5: 11.205330170943169,          // dotted verticals top
  yB2: -6.764629829657501,          // H measure height (drag)
  xL: 1.1948012319014394,           // M_x probe on the M girder copy (drag)
  switchN: false,                   // applet slider switchN (flip N side)
  mode: '',                         // '' = follow the steps; 'N' | 'V' | 'M'
  thr: null,                        // show thrust line (null = follow steps)
  mpar: false,                      // show parabola construction
  o1t: false,                       // keep trial funicular construction
  j2: false,                        // show three-force construction
  bow: false,                       // show Bow notation
  o1: true,                         // internal-force pipes on the frame
  sIF: 0.06,
  node: 0,
  _k: 99,
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The three-hinged frame', d: 'left: a portal frame — feet A and C, corners B and D, and a third hinge I on the girder (drag I along the girder, drag A up and down!)' },
  { t: 'Dimensions', d: 'left: height h and span l; the hinge splits the span into l₁ and l₂ — dotted verticals carry the feet and the hinge down the page' },
  { t: 'The load q → R₁ and R₂', d: 'left: the line load q on the girder acts as two resultants, R₁ on l₁ and R₂ on l₂ — right: the load line, R₁ over R₂, total q·l' },
  { t: 'Trial funicular for R₁', d: 'right: any trial pole Q₁ with rays to R₁\'s ends — left: the trial funicular from the left wall, kinking under R₁, to the hinge vertical' },
  { t: 'Closing the left trial', d: 'left: the closing chord of the left trial (dashed) — right: its parallel through Q₁ cuts the load line at the division point Z₁' },
  { t: 'Trial funicular for R₂', d: 'right: a second trial pole R₁* with rays to R₂\'s ends — left: the trial funicular from the hinge vertical to the right wall' },
  { t: 'Closing the right trial', d: 'left: the closing chord of the right trial (dashed) — right: its parallel through R₁* cuts the load line at A₂' },
  { t: 'The pole I₁', d: 'left: the hinge chords A–I and I–C (dashed) — right: parallels to them through Z₁ and A₂ meet at the pole I₁: its offset is the thrust H, its height splits the load line at the level of the reactions' },
  { t: 'Reactions', d: 'right: the polygon closes through I₁: A_H, A_V up the left, B_V, B_H down the right — left: the same four components push into the feet A and C' },
  { t: 'The N diagram', d: 'below: on a copy of the frame, the normal forces — columns −A_V and −B_V, girder −A_H — taken as lengths straight from the force diagram (buttons switch to V and M)' },
  { t: 'The V diagram', d: 'below: the shear — on the girder a straight line from +A_V to −B_V through zero, on the columns the constant ∓A_H' },
  { t: 'The M diagram', d: 'below: corner moments M₄ = M₅ = H·h swing from the columns onto the girder (quarter-circle arcs); between them the parabola hangs from its own pole E₅ through zero at the hinge; M_max = q·l²/8 spans closing line to girder' },
  { t: 'The thrust line', d: 'right: rays from every load-line division to I₁ — below: their funicular through the feet is the ideal thrust line (dashed); at any x (drag L!) the moment is M_x = H·y_x — thrust times the distance between thrust line and frame' },
  { t: 'Done', d: 'buttons show N / V / M; toggles: trial funicular, three-force construction, parabola construction, thrust line, Bow notation; drag I, A, the poles, L — and click a node (A, B, I, D, C)' },
];

function inter(p1, d1, p2, d2) {
  const r = V.intersect(p1, d1, p2, d2);
  return r || [NaN, NaN];
}
const rot90 = (v, s) => (s > 0 ? [-v[1], v[0]] : [v[1], -v[0]]);

// the construction (mirrors applet_0/geogebra.xml + its runtime chain)
function compute(s) {
  const l = s.f1, h = s.f1;
  const A = [0, s.yA], B = [0, s.yA + h], C = [l, s.yA], D = [l, s.yA + h];
  const xI = Math.max(0.001, Math.min(l - 0.001, s.xI));
  const I = [xI, s.yA + h];
  const l1 = xI, l2 = l - xI;

  // load band + resultants
  const L1 = [0, s.yL1], L2 = [l, s.yL1];
  const yBand = s.yL1 - 0.75 * s.sLS;
  const Rc = [xI / 2, (s.yL1 + yBand) / 2];          // centroid left half
  const Sc = [(xI + l) / 2, (s.yL1 + yBand) / 2];
  const L_2 = [Rc[0], s.yJ2], Z_2 = [Rc[0], s.yJ2 + 2 * s.sLS];
  const M_2 = [Sc[0], s.yJ2], A_3 = [Sc[0], s.yJ2 + 2 * s.sLS];

  // load line
  const LL0 = [s.llx, s.lly];
  const k = s.q * l / s.sFD;
  const K = [LL0[0], LL0[1] - k];
  const E1 = [LL0[0], LL0[1] - s.q * l1 / s.sFD];

  // trial funiculars -> divisions Z1, A2
  const Q1 = [s.q1x, s.q1y], R1t = [s.r1x, s.r1y];
  const P1 = [0, s.yP1];
  const S1 = inter(P1, V.sub(Q1, LL0), [Rc[0], 0], [0, 1]);
  const T1 = inter(S1, V.sub(Q1, E1), [xI, 0], [0, 1]);
  const Z1 = inter(Q1, V.sub(T1, P1), LL0, [0, 1]);
  const U1 = [xI, s.yU1];
  const V1 = inter(U1, V.sub(R1t, E1), [Sc[0], 0], [0, 1]);
  const W1 = inter(V1, V.sub(K, R1t), [l, 0], [0, 1]);
  const A2 = inter(R1t, V.sub(W1, U1), LL0, [0, 1]);

  // pole
  const I1 = inter(Z1, V.sub(I, A), A2, V.sub(C, I));
  const K1 = [I1[0], LL0[1]], J1 = [I1[0], K[1]];
  const vAH = V.sub(LL0, K1), vAV = V.sub(K1, I1);
  const vBV = V.sub(I1, J1), vBH = V.sub(J1, K);
  const H_kN = V.len(vAH) * s.sFD, AV_kN = V.len(vAV) * s.sFD;

  // three-force superposition layer (checkbox j_2)
  const Z = inter(C, V.sub(I, C), [Rc[0], 0], [0, 1]);
  const A1 = inter(A, V.sub(I, A), [Sc[0], 0], [0, 1]);
  const G1 = inter(LL0, V.sub(Z, A), E1, V.sub(C, I));
  const H1 = inter(E1, V.sub(I, A), K, V.sub(C, A1));

  // frame copy for the N / V / M diagrams
  const dy = s.dC;
  const A_M = [0, s.yA - dy], B_M = [0, s.yA + h - dy];
  const C_M = [l, s.yA - dy], D_M = [l, s.yA + h - dy];
  const I_M = [xI, B_M[1]];

  // N diagram (rotated components; switchN flips the side)
  const sg = s.switchN ? 1 : -1;
  const C2 = V.add(B_M, rot90(V.mul(vAH, s.sFD / s.sND), sg));
  const E2 = V.add(D_M, rot90(V.mul(vBH, s.sFD / s.sND), -sg));
  const K2 = V.add(B_M, rot90(V.mul(vAV, s.sFD / s.sND), sg));
  const N2 = V.add(D_M, rot90(V.mul(vBV, s.sFD / s.sND), -sg));
  const O2 = [K2[0], A_M[1]], P2 = [N2[0], A_M[1]];

  // V diagram
  const Q2v = V.add(B_M, V.mul(vAV, s.sFD / s.sVD));
  const S2v = V.add(D_M, V.mul(vBV, -s.sFD / s.sVD));
  const T2v = V.add(B_M, V.mul(vAH, s.sFD / s.sVD));
  const U2v = V.add(D_M, V.mul(vBH, -s.sFD / s.sVD));
  const V2v = [T2v[0], A_M[1]], W2v = [U2v[0], A_M[1]];

  // M diagram
  const G2 = V.add(B_M, V.mul(vAH, -h * s.sFD / s.sMD));
  const I2 = V.add(D_M, V.mul(vBH, -h * s.sFD / s.sMD));
  const F2 = V.add(B_M, rot90(V.sub(G2, B_M), -1));
  const H2 = V.add(D_M, rot90(V.sub(I2, D_M), 1));
  const Mm1 = V.mid(F2, H2);
  const Mm2 = [Mm1[0], Mm1[1] - s.q * l * l / 8 / s.sMD];
  const D5 = [l / 2, Mm2[1] - V.dist(Mm2, Mm1)];
  const E5 = inter(LL0, V.sub(D5, F2), K, V.sub(H2, D5));

  // load-line divisions + the two funiculars (M parabola and thrust line)
  const LL = [];
  for (let i = 0; i <= DIV; i++) LL.push([LL0[0], LL0[1] - k / DIV * i]);
  const lox = [];
  for (let i = 0; i < DIV; i++) lox.push(l / DIV * (i + 0.5));
  const FPM = [F2];
  let p = F2;
  for (let i = 0; i < DIV; i++) {
    p = inter(p, V.sub(E5, LL[i]), [lox[i], 0], [0, 1]);
    FPM.push(p);
  }
  const MLine = FPM.concat([H2]);
  const FP = [A_M];
  p = A_M;
  for (let i = 0; i < DIV; i++) {
    p = inter(p, V.sub(I1, LL[i]), [lox[i], 0], [0, 1]);
    FP.push(p);
  }
  const parab = FP.concat([C_M]);

  // probes: H measure + M_x = H * y_x at x = xL
  const B2p = [LL0[0], s.yB2], D2p = [I1[0], s.yB2];
  const xL = Math.max(0.02, Math.min(l - 0.02, s.xL));
  const polyY = (poly, x) => {
    for (let i = 0; i < poly.length - 1; i++) {
      const a = poly[i], b = poly[i + 1];
      if ((a[0] - x) * (b[0] - x) <= 0 && a[0] !== b[0]) {
        return a[1] + (x - a[0]) / (b[0] - a[0]) * (b[1] - a[1]);
      }
    }
    return NaN;
  };
  const Lp = [xL, B_M[1]];
  const Mp = [xL, polyY(MLine, xL)];
  const Np = [xL, polyY(parab, xL)];
  const Mx_kNm = Math.abs(Mp[1] - Lp[1]) * s.sMD;
  const Mx2_kNm = Math.abs(Np[1] - Lp[1]) * V.dist(B2p, D2p) * s.sFD;

  return { l, h, A, B, C, D, I, l1, l2, L1, L2, yBand, Rc, Sc, L_2, Z_2, M_2, A_3,
           LL0, k, K, E1, Q1, R1t, P1, S1, T1, Z1, U1, V1, W1, A2, I1, K1, J1,
           vAH, vAV, vBV, vBH, H_kN, AV_kN, Z, A1, G1, H1,
           A_M, B_M, C_M, D_M, I_M, C2, E2, K2, N2, O2, P2,
           Q2v, S2v, T2v, U2v, V2v, W2v, G2, I2, F2, H2, Mm1, Mm2, D5, E5,
           LL, FPM, MLine, FP, parab, B2p, D2p, Lp, Mp, Np, Mx_kNm, Mx2_kNm };
}

const pairs = (poly) => poly.slice(0, -1).map((p, i) => [p, poly[i + 1]]);

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);

  const W_BAR = 0.06, W_RED = 0.05, W_THIN = 0.028;
  const ARROW = { w: 0.09, headLen: 0.34, headW: 0.13 };

  // effective display mode: user choice wins, otherwise the steps drive it
  const eMode = (st) => st.mode || (st._k <= 10 ? 'N' : st._k === 11 ? 'V' : 'M');
  const isN = (st) => st._k >= 10 && eMode(st) === 'N';
  const isV = (st) => st._k >= 10 && eMode(st) === 'V';
  const isM = (st) => st._k >= 10 && eMode(st) === 'M';
  const isThr = (st) => isM(st) && (st.thr === null ? st._k >= 13 : st.thr);
  const isPar = (st) => isM(st) && st.mpar;
  const trial = (st) => st.o1t || st._k < RESOLVE;   // trial retires at Done

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('form_sub', '1 unit :: 1 m', { flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });
  dw.label('diag_title', '', { cls: 'title', flash: false, when: (st) => st._k >= 10 });
  dw.label('diag_sub', '', { flash: false, when: (st) => st._k >= 10 });

  // ------------------------------------------------------------------
  // step 1 -- the frame
  // ------------------------------------------------------------------
  dw.seg('colL', { intro: 1, w: W_BAR });
  dw.seg('gird', { intro: 1, w: W_BAR });
  dw.seg('colR', { intro: 1, w: W_BAR });
  dw.disk('pt_A', { intro: 1, r: 0.11 });
  dw.disk('pt_C', { intro: 1, r: 0.11 });
  dw.disk('pt_I', { intro: 1, r: 0.11 });
  const letters = { A: 'A', B: 'B', C: 'C', D: 'D', I: 'I' };
  for (const n of Object.keys(letters)) dw.label(`lbl_${n}`, letters[n], { cls: 'point', intro: 1 });

  // ------------------------------------------------------------------
  // step 2 -- dimensions + dotted verticals
  // ------------------------------------------------------------------
  dw.strokes('dimH', 5, { intro: 2, w: 0.02, color: PAL.grey, flash: false });
  dw.strokes('dimL', 5, { intro: 2, w: 0.02, color: PAL.grey, flash: false });
  dw.strokes('dimL1', 5, { intro: 2, w: 0.02, color: PAL.grey, flash: false });
  dw.strokes('dimL2', 5, { intro: 2, w: 0.02, color: PAL.grey, flash: false });
  dw.label('lh', 'h', { intro: 2, color: 0x777777, flash: false });
  dw.label('ll', 'l', { intro: 2, color: 0x777777, flash: false });
  dw.label('ll1', 'l₁', { intro: 2, color: 0x777777, flash: false });
  dw.label('ll2', 'l₂', { intro: 2, color: 0x777777, flash: false });
  dw.dashLine('vertL', { intro: 2, dash: 0.06, color: 0x999999, flash: false });
  dw.dashLine('vertR', { intro: 2, dash: 0.06, color: 0x999999, flash: false });
  dw.dashLine('vertI', { intro: 2, dash: 0.06, color: 0x999999, flash: false });
  for (let i = 0; i < 4; i++) {
    dw.label(`val${i}`, '', { intro: 2, flash: false });
  }

  // ------------------------------------------------------------------
  // step 3 -- the load band q | load line R1, R2
  // ------------------------------------------------------------------
  dw.poly('bandL', 4, { intro: 3, opacity: 0.1, color: PAL.green, flash: false });
  dw.poly('bandR', 4, { intro: 3, opacity: 0.1, color: PAL.green, flash: false });
  dw.strokes('bandE', 8, { intro: 3, w: 0.03, color: PAL.green });
  dw.label('lq', 'q', { intro: 3, color: PAL.green });
  dw.arrow('aR1', { intro: 3, ...ARROW });
  dw.arrow('aR2', { intro: 3, ...ARROW });
  dw.label('lR1', 'R₁', { intro: 3, color: PAL.green });
  dw.label('lR2', 'R₂', { intro: 3, color: PAL.green });
  dw.arrow('fR1', { intro: 3, ...ARROW });
  dw.arrow('fR2', { intro: 3, ...ARROW });
  dw.label('lfR1', 'R₁', { intro: 3, color: PAL.green });
  dw.label('lfR2', 'R₂', { intro: 3, color: PAL.green });
  dw.disk('pt_LL0', { intro: 3, r: 0.11 });
  dw.disk('pt_E1', { intro: 3, r: 0.075 });

  // ------------------------------------------------------------------
  // steps 4-8 -- trial funiculars -> divisions -> pole I1
  // ------------------------------------------------------------------
  const trialW = (k0) => (st) => trial(st);
  dw.disk('pt_Q1', { intro: 4, r: 0.11, when: trialW() });
  dw.seg('rayQa', { intro: 4, w: W_THIN, color: PAL.grey, when: trialW() });   // e_3
  dw.seg('rayQb', { intro: 4, w: W_THIN, color: PAL.grey, when: trialW() });   // f_3
  dw.strokes('funL', 2, { intro: 4, w: W_THIN, color: PAL.grey, when: trialW() });  // n_3
  dw.dashLine('closL', { intro: 5, dash: 0.18, color: PAL.black, when: trialW() }); // r_3
  dw.dashLine('parQ', { intro: 5, dash: 0.18, when: trialW() });               // f_4 (Q1-Z1)
  dw.disk('pt_Z1', { intro: 5, r: 0.075, when: trialW() });
  dw.label('lZ1', 'Z₁', { cls: 'point', intro: 5, when: trialW() });
  dw.disk('pt_R1t', { intro: 6, r: 0.11, when: trialW() });
  dw.seg('rayRa', { intro: 6, w: W_THIN, color: PAL.grey, when: trialW() });   // g_3
  dw.seg('rayRb', { intro: 6, w: W_THIN, color: PAL.grey, when: trialW() });   // h_3
  dw.strokes('funR', 2, { intro: 6, w: W_THIN, color: PAL.grey, when: trialW() });  // q_3
  dw.dashLine('closR', { intro: 7, dash: 0.18, color: PAL.black, when: trialW() }); // s_3
  dw.dashLine('parR', { intro: 7, dash: 0.18, when: trialW() });               // g_4 (R1-A2)
  dw.disk('pt_A2', { intro: 7, r: 0.075, when: trialW() });
  dw.label('lA2', 'A₂', { cls: 'point', intro: 7, when: trialW() });
  dw.label('lQ1', 'Q₁', { cls: 'point', intro: 4, when: trialW() });
  dw.label('lR1t', 'R₁*', { cls: 'point', intro: 6, when: trialW() });

  dw.dashLine('chordA', { intro: 8, dash: 0.18, when: trialW() });             // b_4: A-I
  dw.dashLine('chordC', { intro: 8, dash: 0.18, when: trialW() });             // c_4: I-C
  dw.dashLine('parZ', { intro: 8, dash: 0.18, color: PAL.black, when: trialW() });  // i_4: Z1-I1
  dw.dashLine('parA2', { intro: 8, dash: 0.18, color: PAL.black, when: trialW() }); // h_4: A2-I1
  dw.disk('pt_I1', { intro: 8, r: 0.085 });
  dw.label('lI1', 'I₁', { cls: 'point', intro: 8 });

  // ------------------------------------------------------------------
  // step 9 -- reactions (components in both diagrams)
  // ------------------------------------------------------------------
  dw.seg('polyT', { intro: 9, w: W_THIN });                                    // b_3: K1-LL0
  dw.seg('polyB', { intro: 9, w: W_THIN });                                    // s_2: K-J1
  dw.arrow('fAH', { intro: 9, ...ARROW });
  dw.arrow('fAV', { intro: 9, ...ARROW });
  dw.arrow('fBV', { intro: 9, ...ARROW });
  dw.arrow('fBH', { intro: 9, ...ARROW });
  dw.label('lfAH', 'Aₕ', { intro: 9, color: PAL.green });
  dw.label('lfAV', 'Aᵥ', { intro: 9, color: PAL.green });
  dw.label('lfBV', 'Bᵥ', { intro: 9, color: PAL.green });
  dw.label('lfBH', 'Bₕ', { intro: 9, color: PAL.green });
  dw.arrow('rAH', { intro: 9, ...ARROW });
  dw.arrow('rAV', { intro: 9, ...ARROW });
  dw.arrow('rBV', { intro: 9, ...ARROW });
  dw.arrow('rBH', { intro: 9, ...ARROW });
  dw.label('lrAH', 'Aₕ', { intro: 9, color: PAL.green });
  dw.label('lrAV', 'Aᵥ', { intro: 9, color: PAL.green });
  dw.label('lrBV', 'Bᵥ', { intro: 9, color: PAL.green });
  dw.label('lrBH', 'Bₕ', { intro: 9, color: PAL.green });

  // ------------------------------------------------------------------
  // steps 10-12 -- the N / V / M diagrams on the frame copy
  // ------------------------------------------------------------------
  const copyW = (st) => st._k >= 10;
  dw.seg('cColL', { intro: 10, w: W_BAR, when: copyW });
  dw.seg('cGird', { intro: 10, w: W_BAR, when: copyW });
  dw.seg('cColR', { intro: 10, w: W_BAR, when: copyW });
  dw.disk('cpt_A', { intro: 10, r: 0.1, when: copyW });
  dw.disk('cpt_C', { intro: 10, r: 0.1, when: copyW });
  dw.disk('cpt_I', { intro: 10, r: 0.1, when: copyW });

  // N diagram
  const NN = ['nA', 'nB', 'nC', 'nD', 'nE', 'nF', 'nG', 'nH', 'nI'];
  for (const n of NN) dw.seg(n, { intro: 10, w: W_RED, color: PAL.red, when: isN });
  dw.label('lnAV', '−Aᵥ', { intro: 10, color: PAL.red, when: isN });
  dw.label('lnBV', '−Bᵥ', { intro: 10, color: PAL.red, when: isN });
  dw.label('lnAH', '−Aₕ', { intro: 10, color: PAL.red, when: isN });
  dw.label('lnBH', '−Bₕ', { intro: 10, color: PAL.red, when: isN });
  // V diagram
  const VVn = ['vA', 'vB', 'vC', 'vD', 'vE', 'vF', 'vG', 'vH', 'vI'];
  for (const n of VVn) dw.seg(n, { intro: 10, w: W_RED, color: PAL.red, when: isV });
  dw.label('lvAV', 'Aᵥ', { intro: 10, color: PAL.red, when: isV });
  dw.label('lvBV', '−Bᵥ', { intro: 10, color: PAL.red, when: isV });
  dw.label('lvAH', '−Aₕ', { intro: 10, color: PAL.red, when: isV });
  dw.label('lvBH', 'Bₕ', { intro: 10, color: PAL.red, when: isV });
  // M diagram
  dw.seg('mColA', { intro: 10, w: W_RED, color: PAL.red, when: isM });   // c_5
  dw.seg('mG2B', { intro: 10, w: W_RED, color: PAL.red, when: isM });    // d_5
  dw.seg('mBF2', { intro: 10, w: W_RED, color: PAL.red, when: isM });    // e_5
  dw.seg('mH2D', { intro: 10, w: W_RED, color: PAL.red, when: isM });    // f_5
  dw.seg('mDI2', { intro: 10, w: W_RED, color: PAL.red, when: isM });    // g_5
  dw.seg('mColC', { intro: 10, w: W_RED, color: PAL.red, when: isM });   // h_5
  dw.dashLine('mClose', { intro: 10, dash: 0.14, when: isM });           // s_4
  dw.dashedCircle('mArcL', { intro: 10, dash: 0.12, when: (st) => false });  // placeholder (arcs drawn as strokes)
  dw.strokes('arcL', 12, { intro: 10, w: 0.02, color: PAL.grey, when: isM, flash: false });
  dw.strokes('arcR', 12, { intro: 10, w: 0.02, color: PAL.grey, when: isM, flash: false });
  dw.strokes('mML', DIV + 1, { intro: 10, w: W_RED, color: PAL.red, when: isM });   // MLine
  dw.seg('mMax', { intro: 10, w: 0.045, color: PAL.red, when: isM });    // j_4
  dw.label('lM4', 'M₄', { intro: 10, color: PAL.red, when: isM });
  dw.label('lM5', 'M₅', { intro: 10, color: PAL.red, when: isM });
  dw.label('lMmax', 'Mₘₐₓ', { intro: 10, color: PAL.red, when: isM });
  // parabola construction (checkbox showMParabola)
  dw.disk('pt_E5', { intro: 10, r: 0.085, when: isPar });
  dw.label('lE5', 'E₅', { cls: 'point', intro: 10, when: isPar });
  dw.strokes('parFan', DIV + 1, { intro: 10, w: 0.018, color: PAL.grey, when: isPar, flash: false });
  dw.dashLine('parCh1', { intro: 10, dash: 0.14, when: isPar });         // l_14: F2-D5
  dw.dashLine('parCh2', { intro: 10, dash: 0.14, when: isPar });         // m_14: D5-H2
  dw.dashLine('parDim', { intro: 10, dash: 0.14, when: isPar });         // q_4: Mm2-D5
  dw.dashedCircle('parCirc', { intro: 10, dash: 0.14, when: isPar });    // k_14

  // ------------------------------------------------------------------
  // step 13 -- thrust line + M_x = H * y_x
  // ------------------------------------------------------------------
  dw.strokes('thrFan', DIV + 1, { intro: 13, w: 0.016, color: PAL.black, when: isThr, flash: false });
  dw.dashLine('thrLine', { intro: 13, dash: 0.16, color: PAL.black, when: isThr });
  dw.strokes('dimHH', 5, { intro: 13, w: 0.02, color: PAL.grey, flash: false, when: isThr });
  dw.dashLine('dropK', { intro: 13, dash: 0.05, color: 0x999999, when: isThr, flash: false });
  dw.dashLine('dropJ', { intro: 13, dash: 0.05, color: 0x999999, when: isThr, flash: false });
  dw.label('lHH', 'H', { intro: 13, color: 0x777777, when: isThr });
  dw.seg('mxSeg', { intro: 13, w: 0.045, color: 0x808080, when: isThr });
  dw.seg('yxSeg', { intro: 13, w: 0.03, color: 0x808080, when: isThr });
  dw.disk('pt_L', { intro: 13, r: 0.11, when: isThr });
  dw.label('lMx', 'Mₓ', { intro: 13, color: 0x808080, when: isThr });
  dw.label('lyx', 'yₓ', { intro: 13, color: 0x808080, when: isThr });
  dw.label('txMx0', 'Mₓ at any point of the structure:', { intro: 13, flash: false, when: isThr });
  dw.label('txMx1', '', { intro: 13, flash: false, when: isThr });
  dw.label('txMx2', '', { intro: 13, flash: false, when: isThr });

  // ------------------------------------------------------------------
  // hidden layers: three-force construction (j_2) + Bow notation
  // ------------------------------------------------------------------
  const j2w = (st) => st.j2;
  dw.dashLine('c3AZ', { dash: 0.22, when: j2w });      // e_1: A-Z
  dw.dashLine('c3ZC', { dash: 0.22, when: j2w });      // f_1: Z-C
  dw.dashLine('c3AA1', { dash: 0.22, when: j2w });     // g_1: A-A1
  dw.dashLine('c3A1C', { dash: 0.22, when: j2w });     // i_1: A1-C
  dw.dashLine('vertRc', { dash: 0.06, color: 0x999999, when: j2w });   // k_9
  dw.dashLine('vertSc', { dash: 0.06, color: 0x999999, when: j2w });   // k_10
  for (const n of ['f3a', 'f3b', 'f3c', 'f3d', 'f3e', 'f3f']) {
    dw.dashLine(n, { dash: 0.22, when: j2w });         // d_2..i_2
  }
  dw.disk('pt_Z', { r: 0.075, when: j2w });
  dw.disk('pt_A1', { r: 0.075, when: j2w });
  dw.disk('pt_G1', { r: 0.075, when: j2w });
  dw.disk('pt_H1', { r: 0.075, when: j2w });
  const boww = (st) => st.bow;
  const BOW = { b1: '1', b2: '2', b3: '3', b4: '4', b5: '5',
                bA: 'A', bB: 'B', bC: 'C', bD: 'D', bE: 'E', bF: 'F' };
  for (const [n, t] of Object.entries(BOW)) dw.label(`bow_${n}`, t, { when: boww, flash: false });

  // internal-force pipes on the frame (house rule; the N widths)
  const pipeW = (st) => st.o1 && st._k >= 9;
  dw.poly('pipeL', 4, { opacity: 1.0, z: -0.18, flash: false, color: { pending: PAL.grey, final: () => PAL.blue }, when: pipeW });
  dw.poly('pipeG', 4, { opacity: 1.0, z: -0.18, flash: false, color: { pending: PAL.grey, final: () => PAL.blue }, when: pipeW });
  dw.poly('pipeR', 4, { opacity: 1.0, z: -0.18, flash: false, color: { pending: PAL.grey, final: () => PAL.blue }, when: pipeW });

  // node inspector: A, B, I, D, C
  dw.nodeInspector(3, { when: (st) => st.node > 0, w: 1.5 * W_BAR, headLen: 0.4, headW: 0.16, r: 0.13 });

  // dual pairs
  dw.link('bandL', 'aR1', 'lR1', 'fR1', 'lfR1');
  dw.link('bandR', 'aR2', 'lR2', 'fR2', 'lfR2');
  dw.link('funL', 'rayQa', 'rayQb');
  dw.link('funR', 'rayRa', 'rayRb');
  dw.link('closL', 'parQ');
  dw.link('closR', 'parR');
  dw.link('chordA', 'parZ');
  dw.link('chordC', 'parA2');
  dw.link('rAH', 'fAH', 'lrAH', 'lfAH');
  dw.link('rAV', 'fAV', 'lrAV', 'lfAV');
  dw.link('rBV', 'fBV', 'lrBV', 'lfBV');
  dw.link('rBH', 'fBH', 'lrBH', 'lfBH');
  dw.link('thrLine', 'thrFan');
  dw.ghostable('fR1', 'fR2', 'fAH', 'fAV', 'fBV', 'fBH',
               'polyT', 'polyB', 'thrFan');

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------
  const xm = 0.14;
  function dimX(a, b) {
    const out = [[a, b]];
    for (const p of [a, b]) {
      out.push([[p[0] - xm, p[1] - xm], [p[0] + xm, p[1] + xm]]);
      out.push([[p[0] - xm, p[1] + xm], [p[0] + xm, p[1] - xm]]);
    }
    return out;
  }
  function arcPts(c, from, to, n) {
    // dashed quarter-circle: 2n subsegments, every other one drawn
    const a0 = Math.atan2(from[1] - c[1], from[0] - c[0]);
    let a1 = Math.atan2(to[1] - c[1], to[0] - c[0]);
    const r = V.dist(c, from);
    while (a1 < a0) a1 += Math.PI * 2;
    const out = [];
    for (let i = 0; i < 2 * n; i += 2) {
      const t0 = a0 + (a1 - a0) * i / (2 * n), t1 = a0 + (a1 - a0) * (i + 1) / (2 * n);
      out.push([[c[0] + r * Math.cos(t0), c[1] + r * Math.sin(t0)],
                [c[0] + r * Math.cos(t1), c[1] + r * Math.sin(t1)]]);
    }
    return out;
  }

  function update() {
    dw.setLabel('form_title', [-8, 12.4]);
    dw.setLabel('form_sub', [-8, 11.75]);
    dw.setLabel('force_title', [15, 12.4]);
    dw.setLabel('force_sub', [15, 11.75]);
    dw.setText('force_sub', `1 unit :: ${s.sFD} kN`);
    dw.setLabel('diag_title', [-8, -4.6]);
    dw.setLabel('diag_sub', [-8, -5.25]);
    const m = eMode(s);
    dw.setText('diag_title', `${m} Diagram`);
    dw.setText('diag_sub', `1 unit :: ${m === 'M' ? `${s.sMD} kNm` : `${m === 'N' ? s.sND : s.sVD} kN`}`);

    // frame
    dw.setSeg('colL', d.A, d.B);
    dw.setSeg('gird', d.B, d.D);
    dw.setSeg('colR', d.D, d.C);
    dw.setDisk('pt_A', d.A);
    dw.setDisk('pt_C', d.C);
    dw.setDisk('pt_I', d.I);
    const at = { A: d.A, B: d.B, C: d.C, D: d.D, I: d.I };
    const off = { A: [-0.4, -0.34], B: [-0.4, 0.34], C: [0.4, -0.34], D: [0.4, 0.34], I: [0.05, 0.42] };
    for (const n of Object.keys(at)) dw.setLabel(`lbl_${n}`, V.add(at[n], off[n]));

    // dimensions
    const F = [s.xF, d.B[1]], Hd = [s.xF, d.A[1]];
    dw.setStrokes('dimH', dimX(F, Hd));
    dw.setStrokes('dimL', dimX([0, s.yE], [d.l, s.yE]));
    dw.setStrokes('dimL1', dimX([0, s.yB1], [d.l1, s.yB1]));
    dw.setStrokes('dimL2', dimX([d.l1, s.yB1], [d.l, s.yB1]));
    dw.setLabel('lh', [s.xF - 0.55, (F[1] + Hd[1]) / 2]);
    dw.setLabel('ll', [d.l / 2, s.yE - 0.5]);
    dw.setLabel('ll1', [d.l1 / 2, s.yB1 - 0.5]);
    dw.setLabel('ll2', [(d.l1 + d.l) / 2, s.yB1 - 0.5]);
    dw.setDashLine('vertL', [[0, s.yJ5], [0, d.A_M[1]]]);
    dw.setDashLine('vertR', [[d.l, s.yJ5], [d.l, d.A_M[1]]]);
    dw.setDashLine('vertI', [[d.I[0], d.L1[1]], [d.I[0], d.A_M[1]]]);
    dw.setLabel('val0', [27, 8.6]);
    dw.setText('val0', `q = ${+s.q.toFixed(2)} kN/m`);
    dw.setLabel('val1', [27, 7.7]);
    dw.setText('val1', `l = ${+d.l.toFixed(2)} m    h = ${+d.h.toFixed(2)} m`);
    dw.setLabel('val2', [27, 7.0]);
    dw.setText('val2', `l₁ = ${d.l1.toFixed(2)} m   l₂ = ${d.l2.toFixed(2)} m`);
    dw.setLabel('val3', [27, 6.0]);
    dw.setText('val3', `H = ${d.H_kN.toFixed(1)} kN   Aᵥ = Bᵥ = ${d.AV_kN.toFixed(1)} kN`);

    // load band + resultant arrows
    dw.setPoly('bandL', [d.L1, [d.I[0], d.L1[1]], [d.I[0], d.yBand], [0, d.yBand]]);
    dw.setPoly('bandR', [[d.I[0], d.L1[1]], d.L2, [d.l, d.yBand], [d.I[0], d.yBand]]);
    dw.setStrokes('bandE', [
      [d.L1, [d.I[0], d.L1[1]]], [[d.I[0], d.L1[1]], d.L2],
      [[0, d.yBand], [d.I[0], d.yBand]], [[d.I[0], d.yBand], [d.l, d.yBand]],
      [d.L1, [0, d.yBand]], [d.L2, [d.l, d.yBand]],
      [[d.I[0], d.L1[1]], [d.I[0], d.yBand]], [[d.I[0], d.L1[1]], [d.I[0], d.yBand]],
    ]);
    dw.setLabel('lq', [-0.5, (d.L1[1] + d.yBand) / 2 + 0.35]);
    dw.setArrow('aR1', d.Z_2, d.L_2);
    dw.setArrow('aR2', d.A_3, d.M_2);
    dw.setLabel('lR1', V.add(d.Z_2, [0.42, -0.3]));
    dw.setLabel('lR2', V.add(d.A_3, [0.42, -0.3]));
    dw.setArrow('fR1', d.LL0, d.E1);
    dw.setArrow('fR2', d.E1, d.K);
    dw.setLabel('lfR1', V.add(V.mid(d.LL0, d.E1), [0.45, 0]));
    dw.setLabel('lfR2', V.add(V.mid(d.E1, d.K), [0.45, 0]));
    dw.setDisk('pt_LL0', d.LL0);
    dw.setDisk('pt_E1', d.E1);

    // trial funiculars
    dw.setDisk('pt_Q1', d.Q1);
    dw.setLabel('lQ1', V.add(d.Q1, [0.4, 0.25]));
    dw.setSeg('rayQa', d.LL0, d.Q1);
    dw.setSeg('rayQb', d.E1, d.Q1);
    dw.setStrokes('funL', [[d.P1, d.S1], [d.S1, d.T1]]);
    dw.setDashLine('closL', [d.P1, d.T1]);
    dw.setDashLine('parQ', [d.Q1, d.Z1]);
    dw.setDisk('pt_Z1', d.Z1);
    dw.setLabel('lZ1', V.add(d.Z1, [0.42, 0.16]));
    dw.setDisk('pt_R1t', d.R1t);
    dw.setLabel('lR1t', V.add(d.R1t, [0.15, -0.42]));
    dw.setSeg('rayRa', d.E1, d.R1t);
    dw.setSeg('rayRb', d.R1t, d.K);
    dw.setStrokes('funR', [[d.U1, d.V1], [d.V1, d.W1]]);
    dw.setDashLine('closR', [d.U1, d.W1]);
    dw.setDashLine('parR', [d.R1t, d.A2]);
    dw.setDisk('pt_A2', d.A2);
    dw.setLabel('lA2', V.add(d.A2, [0.45, -0.1]));
    dw.setDashLine('chordA', [d.A, d.I]);
    dw.setDashLine('chordC', [d.I, d.C]);
    dw.setDashLine('parZ', [d.I1, d.Z1]);
    dw.setDashLine('parA2', [d.A2, d.I1]);
    dw.setDisk('pt_I1', d.I1);
    dw.setLabel('lI1', V.add(d.I1, [-0.05, -0.44]));

    // reactions
    dw.setSeg('polyT', d.K1, d.LL0);
    dw.setSeg('polyB', d.K, d.J1);
    dw.setArrow('fAH', d.K1, d.LL0);
    dw.setArrow('fAV', d.I1, d.K1);
    dw.setArrow('fBV', d.J1, d.I1);
    dw.setArrow('fBH', d.K, d.J1);
    dw.setLabel('lfAH', V.add(V.mid(d.K1, d.LL0), [-0.15, 0.4]));
    dw.setLabel('lfAV', V.add(V.mid(d.I1, d.K1), [-0.55, 0.3]));
    dw.setLabel('lfBV', V.add(V.mid(d.J1, d.I1), [-0.55, -0.3]));
    dw.setLabel('lfBH', V.add(V.mid(d.K, d.J1), [-0.15, -0.45]));
    const rr = 2 * s.sLS;
    dw.setArrow('rAH', [-rr, d.A[1]], d.A);
    dw.setArrow('rAV', [0, d.A[1] - rr], d.A);
    dw.setArrow('rBV', [d.l, d.C[1] - rr], d.C);
    dw.setArrow('rBH', [d.l + rr, d.C[1]], d.C);
    dw.setLabel('lrAH', [-rr + 0.15, d.A[1] + 0.42]);
    dw.setLabel('lrAV', [-0.62, d.A[1] - rr + 0.2]);
    dw.setLabel('lrBV', [d.l + 0.62, d.C[1] - rr + 0.2]);
    dw.setLabel('lrBH', [d.l + rr - 0.15, d.C[1] + 0.42]);

    // frame copy
    dw.setSeg('cColL', d.A_M, d.B_M);
    dw.setSeg('cGird', d.B_M, d.D_M);
    dw.setSeg('cColR', d.D_M, d.C_M);
    dw.setDisk('cpt_A', d.A_M);
    dw.setDisk('cpt_C', d.C_M);
    dw.setDisk('cpt_I', d.I_M);

    // N diagram (applet segments i_6 .. r_6)
    const nSegs = [[d.A_M, d.O2], [d.O2, d.K2], [d.K2, d.B_M], [d.B_M, d.C2],
                   [d.C2, d.E2], [d.E2, d.D_M], [d.D_M, d.N2], [d.N2, d.P2], [d.P2, d.C_M]];
    NN.forEach((n, i) => dw.setSeg(n, nSegs[i][0], nSegs[i][1]));
    dw.setLabel('lnAV', V.add(V.mid(d.K2, d.B_M), [0.75, 0.3]));
    dw.setLabel('lnBV', V.add(V.mid(d.D_M, d.N2), [-0.75, 0.3]));
    dw.setLabel('lnAH', V.add(V.mid(d.B_M, d.C2), [-0.75, -0.1]));
    dw.setLabel('lnBH', V.add(V.mid(d.E2, d.D_M), [0.75, -0.1]));

    // V diagram (h_7, g_7, i_7, m_7, n_7, p_7, q_7, r_7, s_7)
    const vSegs = [[d.B_M, d.Q2v], [d.Q2v, d.S2v], [d.D_M, d.S2v], [d.B_M, d.T2v],
                   [d.T2v, d.V2v], [d.V2v, d.A_M], [d.D_M, d.U2v], [d.U2v, d.W2v], [d.W2v, d.C_M]];
    VVn.forEach((n, i) => dw.setSeg(n, vSegs[i][0], vSegs[i][1]));
    dw.setLabel('lvAV', V.add(V.mid(d.B_M, d.Q2v), [-0.6, 0.1]));
    dw.setLabel('lvBV', V.add(V.mid(d.D_M, d.S2v), [0.7, 0.1]));
    dw.setLabel('lvAH', V.add(V.mid(d.T2v, d.V2v), [0.65, 2.2]));
    dw.setLabel('lvBH', V.add(V.mid(d.U2v, d.W2v), [0.65, 2.2]));

    // M diagram
    dw.setSeg('mColA', d.A_M, d.G2);
    dw.setSeg('mG2B', d.G2, d.B_M);
    dw.setSeg('mBF2', d.B_M, d.F2);
    dw.setSeg('mH2D', d.H2, d.D_M);
    dw.setSeg('mDI2', d.D_M, d.I2);
    dw.setSeg('mColC', d.I2, d.C_M);
    dw.setDashLine('mClose', [d.F2, d.H2]);
    dw.setStrokes('arcL', arcPts(d.B_M, d.F2, d.G2, 12));
    dw.setStrokes('arcR', arcPts(d.D_M, d.I2, d.H2, 12));
    dw.setStrokes('mML', pairs(d.MLine));
    dw.setSeg('mMax', d.Mm1, d.Mm2);
    dw.setLabel('lM4', V.add(V.mid(d.G2, d.B_M), [-0.1, -0.45]));
    dw.setLabel('lM5', V.add(V.mid(d.D_M, d.I2), [0.1, -0.45]));
    dw.setLabel('lMmax', V.add(V.mid(d.Mm1, d.Mm2), [0.72, 0.7]));
    dw.setDisk('pt_E5', d.E5);
    dw.setLabel('lE5', V.add(d.E5, [0.4, 0.2]));
    dw.setStrokes('parFan', d.LL.map((pt) => [pt, d.E5]));
    dw.setDashLine('parCh1', [d.F2, d.D5]);
    dw.setDashLine('parCh2', [d.D5, d.H2]);
    dw.setDashLine('parDim', [d.Mm2, d.D5]);
    dw.setDashedCircle('parCirc', d.Mm2, V.dist(d.Mm2, d.Mm1));

    // thrust line + probes
    dw.setStrokes('thrFan', d.LL.map((pt) => [pt, d.I1]));
    dw.setDashLine('thrLine', d.parab);
    dw.setStrokes('dimHH', dimX(d.B2p, d.D2p));
    dw.setDashLine('dropK', [d.K, d.B2p]);
    dw.setDashLine('dropJ', [d.J1, d.D2p]);
    dw.setLabel('lHH', V.add(V.mid(d.B2p, d.D2p), [0, -0.42]));
    dw.setSeg('mxSeg', d.Lp, d.Mp);
    dw.setSeg('yxSeg', d.Lp, d.Np);
    dw.setDisk('pt_L', d.Lp);
    dw.setLabel('lMx', V.add(V.mid(d.Lp, d.Mp), [-0.5, 0]));
    dw.setLabel('lyx', V.add(V.mid(d.Lp, d.Np), [-0.5, 0]));
    dw.setLabel('txMx0', [12.0, -7.4]);
    dw.setLabel('txMx1', [12.0, -8.3]);
    dw.setText('txMx1', `Mₓ = ${d.Mx_kNm.toFixed(2)} kNm`);
    dw.setLabel('txMx2', [12.0, -9.0]);
    dw.setText('txMx2', `Mₓ = H · yₓ = ${d.Mx2_kNm.toFixed(2)} kNm`);

    // three-force construction layer
    dw.setDashLine('c3AZ', [d.A, d.Z]);
    dw.setDashLine('c3ZC', [d.Z, d.C]);
    dw.setDashLine('c3AA1', [d.A, d.A1]);
    dw.setDashLine('c3A1C', [d.A1, d.C]);
    dw.setDashLine('vertRc', [[d.Rc[0], d.Z[1] + 0.5], [d.Rc[0], d.A_M[1]]]);
    dw.setDashLine('vertSc', [[d.Sc[0], d.A1[1] + 0.5], [d.Sc[0], d.A_M[1]]]);
    const f3 = [[d.LL0, d.G1], [d.G1, d.E1], [d.E1, d.H1], [d.H1, d.K], [d.H1, d.I1], [d.I1, d.G1]];
    ['f3a', 'f3b', 'f3c', 'f3d', 'f3e', 'f3f'].forEach((n, i) => dw.setDashLine(n, f3[i]));
    dw.setDisk('pt_Z', d.Z);
    dw.setDisk('pt_A1', d.A1);
    dw.setDisk('pt_G1', d.G1);
    dw.setDisk('pt_H1', d.H1);

    // Bow notation
    const bows = { b1: V.add(d.A, [0.3, 0.35]), b2: V.add(d.C, [-0.35, 0.35]),
                   b3: V.add(d.I, [0.32, -0.45]), b4: V.add(d.B, [0.35, -0.4]),
                   b5: V.add(d.D, [-0.38, -0.4]),
                   bA: V.add(d.B, [-1.6, 1.2]), bB: [d.l / 2, d.B[1] + 1.1],
                   bC: V.add(d.D, [1.3, 1.2]), bD: V.add(d.C, [1.2, -1.8]),
                   bE: [d.l / 2, (d.A[1] + d.B[1]) / 2 - 1], bF: V.add(d.A, [-1.6, -1.8]) };
    for (const n of Object.keys(BOW)) dw.setLabel(`bow_${n}`, bows[n]);

    // pipes (axial forces on the frame itself)
    const wCol = s.sIF * V.len(d.vAV) || 1e-4;
    const wGir = s.sIF * V.len(d.vAH) || 1e-4;
    dw.setPoly('pipeL', V.rectPoints(d.A, d.B, Math.max(1e-4, wCol)));
    dw.setPoly('pipeG', V.rectPoints(d.B, d.D, Math.max(1e-4, wGir)));
    dw.setPoly('pipeR', V.rectPoints(d.D, d.C, Math.max(1e-4, wCol)));
  }

  // ------------------------------------------------------------------
  // node inspector: 1 = A, 2 = B, 3 = I, 4 = D, 5 = C. Sides are the node's
  // force sub-polygon in the force diagram; foot reactions land exactly on
  // the drawn green component vectors.
  // ------------------------------------------------------------------
  function nodePoly() {
    const j = Math.round(s.node);
    if (j === 1) return [[d.I1, d.K1], [d.K1, d.LL0], [d.LL0, d.I1]];
    if (j === 5) return [[d.J1, d.I1], [d.K, d.J1], [d.I1, d.K]];
    if (j === 2) return [[d.I1, d.LL0], [d.LL0, d.I1]];
    if (j === 4) return [[d.K, d.I1], [d.I1, d.K]];
    if (j === 3) return [[d.I1, d.E1], [d.E1, d.I1]];
    return [];
  }
  function updateNode() {
    const j = Math.round(s.node);
    const names = ['A', 'B', 'I', 'D', 'C'];
    const disks = ['pt_A', null, 'pt_I', null, 'pt_C'];
    dw.selectDisk(j >= 1 ? disks[j - 1] : null);
    const posn = [d.A, d.B, d.I, d.D, d.C];
    dw.setNodeInspector(posn[(j || 1) - 1], 1.15, `node ${names[(j || 1) - 1]}`, nodePoly());
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

  const modeSec = panel.section('Diagram');
  const row = panel.buttonRow(modeSec);
  const setMode = (m) => { s.mode = m; if (m !== 'M') { s.mpar = false; if (s.thr) s.thr = false; } panel.syncAll(); refresh(); };
  panel.button(row, 'show N', () => setMode('N'));
  panel.button(row, 'show V', () => setMode('V'));
  panel.button(row, 'show M', () => setMode('M'));
  panel.toggle(modeSec, s, 'mpar', 'show parabola construction (M)', () => { if (s.mpar) s.mode = 'M'; panel.syncAll(); refresh(); });
  const thrProxy = { get thr() { return s.thr === null ? s._k >= 13 : s.thr; }, set thr(v) { s.thr = v; } };
  panel.toggle(modeSec, thrProxy, 'thr', 'show thrust line (M)', () => { if (thrProxy.thr) s.mode = 'M'; panel.syncAll(); refresh(); });
  panel.toggle(modeSec, s, 'switchN', 'switch N side', refresh);

  const par = panel.section('Parameters');
  panel.slider(par, s, 'f1', 'frame size l = h (m)', 2, 10, 0.1, refresh);
  panel.slider(par, s, 'q', 'q — load intensity (kN/m)', 10, 50, 1, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (kN/unit)', 5, 20, 1, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 0.2, 1, 0.1, refresh);
  panel.slider(par, s, 'sND', 'scale N diagram (kN/unit)', 15, 50, 1, refresh);
  panel.slider(par, s, 'sVD', 'scale V diagram (kN/unit)', 15, 50, 1, refresh);
  panel.slider(par, s, 'sMD', 'scale M diagram (kNm/unit)', 15, 100, 1, refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.15, 0.005, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces (pipes)', refresh);
  panel.toggle(par, s, 'o1t', 'keep trial funicular construction', refresh);
  panel.toggle(par, s, 'j2', 'show three-force construction', refresh);
  panel.toggle(par, s, 'bow', 'show Bow notation', refresh);
  panel.button(par, 'reset geometry', () => {
    const keep = { _k: s._k, node: s.node, mode: s.mode, thr: s.thr };
    Object.assign(s, { ...DEFAULTS, ...keep });
    panel.syncAll();
    refresh();
  });

  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off, 1 = A, 2 = B, 3 = I, 4 = D, 5 = C)', 0, 5, 1, refresh);

  const hits = [
    ['I', () => d.I, 1], ['A', () => d.A, 1],
    ['LL0', () => d.LL0, 3], ['L1', () => d.L1, 3],
    ['Q1', () => d.Q1, 4], ['P1', () => d.P1, 4],
    ['R1t', () => d.R1t, 6], ['U1', () => d.U1, 6],
    ['B2', () => d.B2p, 13], ['L', () => d.Lp, 13],
  ];
  dw.enableDrag(
    (wx, wy, tol) => {
      let best = null;
      for (const [name, get, k0] of hits) {
        if (player.k < k0) continue;
        if ((name === 'Q1' || name === 'P1' || name === 'R1t' || name === 'U1') && !(s.o1t || player.k < RESOLVE)) continue;
        if ((name === 'B2' || name === 'L') && !isThr(s)) continue;
        const p = get();
        const dd = Math.hypot(p[0] - wx, p[1] - wy);
        if (dd < tol) { best = name; tol = dd; }
      }
      return best;
    },
    (name, wx, wy) => {
      if (name === 'I') s.xI = Math.max(0.05, Math.min(s.f1 - 0.05, wx));
      else if (name === 'A') s.yA = Math.max(-2, Math.min(4.5, wy));
      else if (name === 'LL0') { s.llx = wx; s.lly = wy; }
      else if (name === 'L1') s.yL1 = Math.max(s.yA + s.f1 + 1.2, Math.min(14, wy));
      else if (name === 'Q1') { s.q1x = wx; s.q1y = wy; }
      else if (name === 'P1') s.yP1 = wy;
      else if (name === 'R1t') { s.r1x = wx; s.r1y = wy; }
      else if (name === 'U1') s.yU1 = wy;
      else if (name === 'B2') s.yB2 = Math.min(d.K[1] - 0.4, wy);
      else if (name === 'L') s.xL = Math.max(0.05, Math.min(s.f1 - 0.05, wx));
      refresh();
    },
  );

  const nodes = [() => d.A, () => d.B, () => d.I, () => d.D, () => d.C];
  dw.nodeSelect(
    nodes.map((get) => ({ at: get })),
    (i) => {
      s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
      panel.syncAll();
      refresh();
    },
  );

  refresh();
  return player;
}
