/**
 * Drawing view/54 "Cathedral of Laon"
 * (https://block.arch.ethz.ch/eq/drawing/view/54) as a step-by-step
 * construction.
 *
 * The full equilibrium of a gothic cross-section, solved as THREE chained
 * three-point funicular problems over ONE load line:
 *   1. the FLYING BUTTRESS A->C under the roof band q1: the sag point B is
 *      draggable; the circle trick mirrors the midpoint of A-C through B's
 *      guide to B_p, whose chords are the end tangents; parallels through
 *      K, L meet at the pole M; a 12-strip walk draws the flyer's thrust.
 *   2. the BUTTRESS C->E under q2: same trick with D/D_p; its pole N sits
 *      ON M's VERTICAL, and its load piece ends at O where the ray parallel
 *      to the last tangent returns to the load line - the chain continues.
 *   3. the NAVE ARCH F->H under q3: sag G/G_p, pole M3 on N's vertical.
 * The straight pieces C-F and E-H carry the thrusts down; the legs F-I and
 * H-J (I draggable on the ground) bring everything to the ground reactions.
 * Drawn over the applet's cathedral silhouette (assets/view_54_section.png).
 *
 * Live port of view_54/applet_0/geogebra.xml (531 commands); regression
 * scratchpad/v54_regress.py: worst 4.9e-14 over s0/s15/mode1 incl. ALL 42
 * thrust-line vertices of the three walks.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 54 — Cathedral of Laon',
  subtitle: 'flyer, buttress and nave arch: three chained funiculars over one load line',
  about: 'The complete equilibrium of a gothic cross-section: the flying buttress, the great buttress and the nave arch are each a three-point funicular problem, and all three chain over a single load line. Each stage uses the same trick — mirror the midpoint through the draggable sag to get the end tangents, then parallels through the load line find the pole — and each new pole sits exactly on the previous pole\'s vertical, so the thrust flows unbroken from the roof, down the flyer, through the buttress and the arch, into the ground. Drag the three sag points and watch the whole cathedral rebalance.',
  frame: [[3.4, 1.6], [19.6, 12.4]],
};

const RESOLVE = 12;

const DEFAULTS = {
  A: [5.6987278290, 11.0110090990],          // flyer top (roof springing)
  C: [7.7809456790, 8.3289823410],           // flyer foot / buttress top
  E: [9.2424786480, 7.0883740380],           // buttress base
  F: [7.7809456790, 4.9860001680],           // arch springing left
  H: [9.6315987230, 4.9860001680],           // arch springing right
  J: [10.1908907400, 2.7531860083],          // right ground point
  groundY: 2.7531860083,
  Ix: 7.4845393999,                          // left ground point (drag on the ground)
  K: [17.1062147091, 10.6692218820],         // load-line top (drag)
  R1: 2.0,                                   // |K->L| (the q1 total, fixed)
  By: 10.3405024060,                         // sag B (drag on its guide)
  gB: [6.7398367500, 9.7699957200, 11.1699957200],   // guide x, ylo, yhi
  Dy: 8.3952785500,
  gD: [8.5117121600, 7.8086781900, 9.2086781900],
  Gy: 5.7805880800,
  gL: [8.7062722000, 5.0860001700, 6.4860001700],
  sLS: 1.05,
  sORF: 0.95,
  o: false,                                  // show temporary items
  n4: true,
  node: 0,
  _k: 99,
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The cathedral and the roof load', d: 'left: the cross-section — nave, aisle, buttress, flyer; the roof band q₁ presses on the flying buttress A–C — right: its resultant R₁ opens the load line K → L' },
  { t: 'The flyer’s sag', d: 'left: the thrust through the flyer must pass A, C and the DRAGGABLE sag B: the circle around B through the midpoint of A–C mirrors it to B_p on the guide — the chords A–B_p and B_p–C are the end tangents (dashed)' },
  { t: 'The flyer’s thrust line', d: 'right: parallels through K and L meet at the pole M with rays to the 12 strip loads — left: the thrust walks from A, string by string parallel to the rays, through the flyer into C' },
  { t: 'Onto the buttress', d: 'the trial retires; left: the aisle roof q₂ loads the buttress top — right: its 12 strips continue the load line below L' },
  { t: 'The buttress sag', d: 'left: same trick one storey down: A–C hands its thrust to the buttress C–E; the draggable sag D mirrors to D_p, the chords C–D_p and D_p–E are the tangents' },
  { t: 'The buttress thrust — the poles align', d: 'right: the parallel through L meets M’s VERTICAL at the new pole N — the chain is exact: the flyer’s last string is the buttress’s first — left: the thrust walks C → E; its load piece ends at O, where the last tangent’s ray returns to the load line' },
  { t: 'Straight to the arch', d: 'left: from C the wall piece C–F drops the flyer thrust to the arch level, and E–H carries the buttress base across (both straight: no load between) — right: the ray parallel to E–H marks P on the load line' },
  { t: 'The nave vault q₃', d: 'left: the vault’s band loads the nave arch F–H — right: R₃: twelve more strips from O' },
  { t: 'The arch sag', d: 'left: the last mirror: the draggable G on the crown guide → G_p, tangents F–G_p and G_p–H' },
  { t: 'The arch thrust', d: 'right: the pole M₃ sits on N’s vertical (the chain again) with its fan — left: the arch walks F → H over the vault' },
  { t: 'Into the ground', d: 'left: the legs F–I and H–J take the springing forces straight down (drag I along the ground!) — the ground answers with the two reactions (green)' },
  { t: 'The cathedral stands', d: 'the three thrust lines hang in one chain: roof → flyer → buttress → arch → ground; drag B, D, G, the sags, I or the load-line anchor K — click C, E, F, H, I or J for its equilibrium',
    detail: (d, st) => [`R₁ = ${st.R1.toFixed(1)} · R₂ = ${d.R2.toFixed(2)} · R₃ = ${d.R3.toFixed(2)}`],
    take: 'one load line, three funiculars chained: every stone of the cross-section rides a single flow of force' },
];

function inter2(p1, d1, p2, d2) { return V.intersect(p1, d1, p2, d2) || p1; }

function mirrorPt(P, mid, gx) {
  const r = V.dist(P, mid);
  const dy = Math.sqrt(Math.max(r * r - (gx - P[0]) ** 2, 0));
  return [gx, P[1] + dy];
}

function walkThrust(A, C, pole, llTop, g) {
  const span = C[0] - A[0], h = span / 12;
  const pts = [A];
  let cur = A;
  for (let k = 0; k < 12; k++) {
    const ray = [llTop[0], llTop[1] + g * k];
    cur = inter2(cur, V.sub(ray, pole), [A[0] + h / 2 + k * h, 0], [0, 1]);
    pts.push(cur);
  }
  cur = inter2(cur, V.sub([llTop[0], llTop[1] + g * 12], pole), [C[0], 0], [0, 1]);
  pts.push(cur);
  return pts;
}

function compute(s) {
  const A = s.A, C = s.C, E = s.E, F = s.F, H = s.H, J = s.J;
  const I = [s.Ix, s.groundY];
  const K = s.K;
  const L = [K[0], K[1] - s.R1];
  const B = [s.gB[0], s.By];
  const D = [s.gD[0], s.Dy];
  const G = [s.gL[0], s.Gy];

  const Bp = mirrorPt(B, V.mid(A, C), s.gB[0]);
  const M = inter2(K, V.sub(Bp, A), L, V.sub(C, Bp));
  const Dp = mirrorPt(D, V.mid(C, E), s.gD[0]);
  const N = inter2(L, V.sub(Dp, C), [M[0], 0], [0, 1]);
  const O = inter2(N, V.sub(E, Dp), [K[0], 0], [0, 1]);
  const P = inter2(N, V.sub(H, E), [K[0], 0], [0, 1]);
  const Gp = mirrorPt(G, V.mid(F, H), s.gL[0]);
  const M3 = inter2(O, V.sub(Gp, F), [N[0], 0], [0, 1]);
  const P3 = inter2(M3, V.sub(H, Gp), [K[0], 0], [0, 1]);

  const a1 = walkThrust(A, C, M, K, (L[1] - K[1]) / 12);
  const t3 = walkThrust(C, E, N, L, (O[1] - L[1]) / 12);
  const b5 = walkThrust(F, H, M3, O, (P3[1] - O[1]) / 12);

  const R2 = L[1] - O[1], R3 = O[1] - P3[1];
  // ground reactions close the polygon K -> P3 along the two leg directions
  const X = inter2(P3, V.sub(J, H), K, V.sub(I, F));
  return { A, B, C, D, E, F, G, H, I, J, K, L, Bp, M, Dp, N, O, P, Gp, M3, P3,
           a1, t3, b5, R2, R3, X };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, A: [...DEFAULTS.A], K: [...DEFAULTS.K] };
  let d = compute(s);
  let player = null;

  const W_TH = 0.05, W_STR = 0.03, W_RAY = 0.012;
  const ARROW = { w: 0.05, headLen: 0.22, headW: 0.09 };
  const DASH = 0.14;
  const tmpW = (base) => (st, dd) => st.o || base(st, dd);

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });

  dw.image('imgSec', 'assets/view_54_section.png',
           { corners: [[5, 2.6], [10.8, 2.6], [5, 11.4666]], opacity: 0.55, z: -0.8, intro: 1 });

  // step 1 -- site + q1 + load line
  dw.dashLine('ground', { intro: 1, dash: 0.1, color: 0x9a9a9a, flash: false });
  dw.poly('q1', 4, { intro: 1, opacity: 0.13, color: PAL.green, flash: false });
  dw.strokes('q1e', 4, { intro: 1, w: 0.02, color: PAL.green });
  dw.label('lbl_q1', 'q₁', { intro: 1, color: PAL.green });
  dw.arrow('edgeR1', { intro: 1, ...ARROW });
  dw.label('lR1', 'R₁', { cls: 'num', intro: 1, color: PAL.green });
  for (const nm of ['A', 'C', 'E', 'F', 'H', 'J']) {
    dw.disk(`pt_${nm}`, { intro: 1, r: 0.06, when: (st) => st.n4 });
    dw.label(`lbl_${nm}`, nm, { cls: 'point', intro: 1, when: (st) => st.n4 });
  }
  dw.disk('pt_K', { intro: 1, r: 0.07 });
  dw.label('lbl_K', 'K', { cls: 'point', intro: 1, when: (st) => st.n4 });

  // stage 1: sag apparatus (retires at 4) + fan + thrust
  const s1W = tmpW((st) => st._k >= 2 && st._k < 4);
  dw.dashLine('gB', { intro: 2, dash: 0.07, color: 0xafafaf, flash: false });
  dw.disk('pt_B', { intro: 2, r: 0.08 });
  dw.label('lbl_B', 'B', { cls: 'point', intro: 2, when: (st) => st.n4 });
  dw.dashedCircle('cB', { intro: 2, color: PAL.grey, dash: 0.12, when: s1W });
  dw.disk('pt_Bp', { intro: 2, outro: 4, r: 0.05, when: s1W });
  dw.label('lbl_Bp', 'B_p', { cls: 'point', intro: 2, outro: 4, when: s1W });
  dw.dashLine('tg1a', { intro: 2, dash: DASH });
  dw.dashLine('tg1b', { intro: 2, dash: DASH });
  dw.strokes('fan1', 13, { intro: 3, w: W_RAY, color: PAL.grey, flash: false });
  dw.disk('pt_M', { intro: 3, r: 0.05, when: (st) => st.n4 });
  dw.label('lbl_M', 'M', { cls: 'point', intro: 3, when: (st) => st.n4 });
  dw.strokes('th1', 13, { intro: 3, w: W_TH, color: PAL.black });

  // stage 2 (intro 4-6)
  dw.poly('q2', 4, { intro: 4, opacity: 0.13, color: PAL.green, flash: false });
  dw.strokes('q2e', 4, { intro: 4, w: 0.02, color: PAL.green });
  dw.label('lbl_q2', 'q₂', { intro: 4, color: PAL.green });
  dw.arrow('edgeR2', { intro: 4, ...ARROW });
  dw.label('lR2', 'R₂', { cls: 'num', intro: 4, color: PAL.green });
  const s2W = tmpW((st) => st._k >= 5 && st._k < 7);
  dw.dashLine('gD', { intro: 5, dash: 0.07, color: 0xafafaf, flash: false });
  dw.disk('pt_D', { intro: 5, r: 0.08 });
  dw.label('lbl_D', 'D', { cls: 'point', intro: 5, when: (st) => st.n4 });
  dw.disk('pt_Dp', { intro: 5, outro: 7, r: 0.05, when: s2W });
  dw.label('lbl_Dp', 'D_p', { cls: 'point', intro: 5, outro: 7, when: s2W });
  dw.dashLine('tg2a', { intro: 5, dash: DASH });
  dw.dashLine('tg2b', { intro: 5, dash: DASH });
  dw.strokes('fan2', 13, { intro: 6, w: W_RAY, color: PAL.grey, flash: false });
  dw.disk('pt_N', { intro: 6, r: 0.05, when: (st) => st.n4 });
  dw.label('lbl_N', 'N', { cls: 'point', intro: 6, when: (st) => st.n4 });
  dw.dashLine('poleAx', { intro: 6, dash: 0.08, color: 0xbdbdbd, flash: false });
  dw.strokes('th2', 13, { intro: 6, w: W_TH, color: PAL.black });
  dw.disk('pt_O', { intro: 6, r: 0.05, when: (st) => st.n4 });
  dw.label('lbl_O', 'O', { cls: 'point', intro: 6, when: (st) => st.n4 });

  // step 7 -- straight pieces C-F, E-H + P
  dw.seg('segCF', { intro: 7, w: W_TH, color: PAL.black });
  dw.seg('segEH', { intro: 7, w: W_TH, color: PAL.black });
  dw.seg('rayP', { intro: 7, w: W_RAY, color: PAL.grey });
  dw.disk('pt_P', { intro: 7, r: 0.05, when: (st) => st.n4 });
  dw.label('lbl_P', 'P', { cls: 'point', intro: 7, when: (st) => st.n4 });

  // stage 3 (intro 8-10)
  dw.poly('q3', 4, { intro: 8, opacity: 0.13, color: PAL.green, flash: false });
  dw.strokes('q3e', 4, { intro: 8, w: 0.02, color: PAL.green });
  dw.label('lbl_q3', 'q₃', { intro: 8, color: PAL.green });
  dw.arrow('edgeR3', { intro: 8, ...ARROW });
  dw.label('lR3', 'R₃', { cls: 'num', intro: 8, color: PAL.green });
  const s3W = tmpW((st) => st._k >= 9 && st._k < 11);
  dw.dashLine('gG', { intro: 9, dash: 0.07, color: 0xafafaf, flash: false });
  dw.disk('pt_G', { intro: 9, r: 0.08 });
  dw.label('lbl_G', 'G', { cls: 'point', intro: 9, when: (st) => st.n4 });
  dw.disk('pt_Gp', { intro: 9, outro: 11, r: 0.05, when: s3W });
  dw.label('lbl_Gp', 'G_p', { cls: 'point', intro: 9, outro: 11, when: s3W });
  dw.dashLine('tg3a', { intro: 9, dash: DASH });
  dw.dashLine('tg3b', { intro: 9, dash: DASH });
  dw.strokes('fan3', 13, { intro: 10, w: W_RAY, color: PAL.grey, flash: false });
  dw.disk('pt_M3', { intro: 10, r: 0.05, when: (st) => st.n4 });
  dw.label('lbl_M3', 'M₃', { cls: 'point', intro: 10, when: (st) => st.n4 });
  dw.strokes('th3', 13, { intro: 10, w: W_TH, color: PAL.black });

  // step 11 -- ground legs + reactions
  dw.seg('segFI', { intro: 11, w: W_TH, color: PAL.black });
  dw.seg('segHJ', { intro: 11, w: W_TH, color: PAL.black });
  dw.disk('pt_I', { intro: 11, r: 0.08 });
  dw.label('lbl_I', 'I', { cls: 'point', intro: 11, when: (st) => st.n4 });
  dw.arrow('reacI', { intro: 11, ...ARROW });
  dw.arrow('reacJ', { intro: 11, ...ARROW });
  dw.arrow('freacI', { intro: 11, ...ARROW });
  dw.arrow('freacJ', { intro: 11, ...ARROW });
  dw.label('lRI', 'Rᴵ', { cls: 'num', intro: 11, color: PAL.green });
  dw.label('lRJ', 'Rᴶ', { cls: 'num', intro: 11, color: PAL.green });

  for (let i = 0; i < 3; i++) {
    dw.label(`ro${i}`, '', { intro: 3, flash: false, color: PAL.green });
  }

  dw.nodeInspector(4, { when: (st) => st.node > 0, w: 1.5 * W_TH,
                        headLen: 0.24, headW: 0.1, r: 0.08 });

  dw.link('th1', 'fan1'); dw.link('th2', 'fan2'); dw.link('th3', 'fan3');
  dw.link('tg1a', 'tg1b'); dw.link('tg2a', 'tg2b'); dw.link('tg3a', 'tg3b');
  dw.ghostable('edgeR1', 'edgeR2', 'edgeR3', 'fan1', 'fan2', 'fan3',
               'rayP', 'freacI', 'freacJ');

  // ------------------------------------------------------------------
  function pairs(pts) {
    const out = [];
    for (let i = 0; i + 1 < pts.length; i++) out.push([pts[i], pts[i + 1]]);
    return out;
  }

  function update() {
    dw.setLabel('form_title', [3.8, 12.05]);
    dw.setLabel('force_title', [14.2, 12.05]);

    dw.setDashLine('ground', [[4.2, s.groundY], [11.6, s.groundY]]);
    const band = (a, b, y) => [[a, y], [b, y], [b, y + 0.34], [a, y + 0.34]];
    const q1 = band(d.A[0] - 0.3, d.C[0] + 0.3, 11.55);
    dw.setPoly('q1', q1); dw.setStrokes('q1e', pairs([...q1, q1[0]]));
    dw.setLabel('lbl_q1', [d.A[0] - 0.85, 11.72]);
    dw.setArrow('edgeR1', d.K, d.L);
    dw.setLabel('lR1', V.add(V.mid(d.K, d.L), [0.22, 0]));
    for (const nm of ['A', 'C', 'E', 'F', 'H', 'J', 'K']) dw.setDisk(`pt_${nm}`, d[nm]);
    dw.setLabel('lbl_A', V.add(d.A, [-0.35, 0.1]));
    dw.setLabel('lbl_C', V.add(d.C, [-0.42, 0.02]));
    dw.setLabel('lbl_E', V.add(d.E, [0.16, 0.08]));
    dw.setLabel('lbl_F', V.add(d.F, [-0.38, -0.05]));
    dw.setLabel('lbl_H', V.add(d.H, [0.16, -0.05]));
    dw.setLabel('lbl_J', V.add(d.J, [0.16, -0.1]));
    dw.setLabel('lbl_K', V.add(d.K, [0.16, 0.12]));

    // stage 1
    dw.setDashLine('gB', [[s.gB[0], s.gB[1]], [s.gB[0], s.gB[2]]]);
    dw.setDisk('pt_B', d.B);
    dw.setLabel('lbl_B', V.add(d.B, [0.16, 0.06]));
    dw.setDashedCircle('cB', d.B, V.dist(d.B, V.mid(d.A, d.C)));
    dw.setDisk('pt_Bp', d.Bp);
    dw.setLabel('lbl_Bp', V.add(d.Bp, [0.16, 0.08]));
    dw.setDashLine('tg1a', [d.A, d.Bp]);
    dw.setDashLine('tg1b', [d.Bp, d.C]);
    const ray = (pole, top, g, k) => [[top[0], top[1] + g * k], pole];
    const g1 = (d.L[1] - d.K[1]) / 12;
    dw.setStrokes('fan1', Array.from({ length: 13 }, (_, k) => ray(d.M, d.K, g1, k)));
    dw.setDisk('pt_M', d.M);
    dw.setLabel('lbl_M', V.add(d.M, [-0.4, 0.05]));
    dw.setStrokes('th1', pairs(d.a1));

    // stage 2
    const q2 = band(d.C[0] - 0.25, d.E[0] + 0.3, 8.9);
    dw.setPoly('q2', q2); dw.setStrokes('q2e', pairs([...q2, q2[0]]));
    dw.setLabel('lbl_q2', [d.E[0] + 0.5, 9.06]);
    dw.setArrow('edgeR2', d.L, d.O);
    dw.setLabel('lR2', V.add(V.mid(d.L, d.O), [0.22, 0]));
    dw.setDashLine('gD', [[s.gD[0], s.gD[1]], [s.gD[0], s.gD[2]]]);
    dw.setDisk('pt_D', d.D);
    dw.setLabel('lbl_D', V.add(d.D, [0.16, 0.06]));
    dw.setDisk('pt_Dp', d.Dp);
    dw.setLabel('lbl_Dp', V.add(d.Dp, [0.16, 0.08]));
    dw.setDashLine('tg2a', [d.C, d.Dp]);
    dw.setDashLine('tg2b', [d.Dp, d.E]);
    const g2 = (d.O[1] - d.L[1]) / 12;
    dw.setStrokes('fan2', Array.from({ length: 13 }, (_, k) => ray(d.N, d.L, g2, k)));
    dw.setDisk('pt_N', d.N);
    dw.setLabel('lbl_N', V.add(d.N, [-0.4, 0.05]));
    dw.setDashLine('poleAx', [[d.M[0], d.M[1] + 0.3], [d.M3[0], d.M3[1] - 0.5]]);
    dw.setStrokes('th2', pairs(d.t3));
    dw.setDisk('pt_O', d.O);
    dw.setLabel('lbl_O', V.add(d.O, [0.18, 0]));

    // straight pieces + P
    dw.setSeg('segCF', d.C, d.F);
    dw.setSeg('segEH', d.E, d.H);
    dw.setSeg('rayP', d.N, d.P);
    dw.setDisk('pt_P', d.P);
    dw.setLabel('lbl_P', V.add(d.P, [0.18, 0]));

    // stage 3
    const q3 = band(d.F[0] - 0.2, d.H[0] + 0.2, 6.65);
    dw.setPoly('q3', q3); dw.setStrokes('q3e', pairs([...q3, q3[0]]));
    dw.setLabel('lbl_q3', [d.H[0] + 0.44, 6.82]);
    dw.setArrow('edgeR3', d.O, d.P3);
    dw.setLabel('lR3', V.add(V.mid(d.O, d.P3), [0.22, 0]));
    dw.setDashLine('gG', [[s.gL[0], s.gL[1]], [s.gL[0], s.gL[2]]]);
    dw.setDisk('pt_G', d.G);
    dw.setLabel('lbl_G', V.add(d.G, [0.16, 0.06]));
    dw.setDisk('pt_Gp', d.Gp);
    dw.setLabel('lbl_Gp', V.add(d.Gp, [0.16, 0.08]));
    dw.setDashLine('tg3a', [d.F, d.Gp]);
    dw.setDashLine('tg3b', [d.Gp, d.H]);
    const g3 = (d.P3[1] - d.O[1]) / 12;
    dw.setStrokes('fan3', Array.from({ length: 13 }, (_, k) => ray(d.M3, d.O, g3, k)));
    dw.setDisk('pt_M3', d.M3);
    dw.setLabel('lbl_M3', V.add(d.M3, [-0.48, 0.05]));
    dw.setStrokes('th3', pairs(d.b5));

    // ground
    dw.setSeg('segFI', d.F, d.I);
    dw.setSeg('segHJ', d.H, d.J);
    dw.setDisk('pt_I', d.I);
    dw.setLabel('lbl_I', V.add(d.I, [-0.35, -0.12]));
    const uI = V.unit(V.sub(d.F, d.I)), uJ = V.unit(V.sub(d.H, d.J));
    dw.setArrow('reacI', V.add(d.I, V.mul(uI, -0.9)), V.add(d.I, V.mul(uI, -0.1)));
    dw.setArrow('reacJ', V.add(d.J, V.mul(uJ, -0.9)), V.add(d.J, V.mul(uJ, -0.1)));
    dw.setLabel('lRI', V.add(d.I, V.mul(uI, -0.75)));
    dw.setLabel('lRJ', V.add(d.J, V.mul(uJ, -0.75)));
    // force side: P3 -> X ∥ leg H-J, X -> K ∥ leg F-I (the closing pair)
    dw.setArrow('freacJ', d.P3, d.X);
    dw.setArrow('freacI', d.X, d.K);

    dw.setLabel('ro0', [17.9, 12.05]);
    dw.setText('ro0', `R₁ = ${s.R1.toFixed(1)}`);
    dw.setLabel('ro1', [17.9, 11.7]);
    dw.setText('ro1', `R₂ = ${d.R2.toFixed(2)}`);
    dw.setLabel('ro2', [17.9, 11.35]);
    dw.setText('ro2', `R₃ = ${d.R3.toFixed(2)}`);

    updateNode();
  }

  // node equilibrium: C, E, F, H
  const NODES = ['C', 'E', 'F', 'H'];
  function nodeSides(nm) {
    switch (nm) {
      case 'C': return [[d.K, d.M], [d.M, d.L], [d.L, d.N], [d.N, d.K]];
      case 'E': return [[d.L, d.N], [d.N, d.O], [d.O, d.L]];
      case 'F': return [[d.O, d.M3], [d.M3, d.O]];
      case 'H': return [[d.M3, d.P3], [d.P3, d.M3]];
      default: return [];
    }
  }
  function updateNode() {
    const n = Math.max(1, Math.round(s.node));
    const nm = NODES[n - 1];
    dw.selectDisk(s.node > 0 ? `pt_${nm}` : null);
    dw.setNodeInspector(d[nm], 1.0, s.node > 0 ? `node ${nm}` : '', nodeSides(nm));
  }

  function refresh() {
    if (player) s._k = player.k;
    d = compute(s);
    update();
    player.apply(d, s);
  }
  player = makePlayer(STEPS, refresh);

  const view = panel.section('View');
  panel.toggle(view, s, 'n4', 'show points', refresh);
  panel.toggle(view, s, 'o', 'show temporary items (applet checkbox)', refresh);
  const par = panel.section('Parameters');
  panel.slider(par, s, 'sLS', 'scale load symbol', 0.2, 2, 0.05, refresh);
  panel.slider(par, s, 'sORF', 'scale offset reaction forces', 0, 2, 0.05, refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off; C, E, F, H)', 0, 4, 1, refresh);

  const hits = [
    ['B', () => d.B, 2, 99], ['D', () => d.D, 5, 99], ['G', () => d.G, 9, 99],
    ['I', () => d.I, 11, 99], ['K', () => d.K, 1, 99],
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
      if (name === 'B') s.By = Math.min(Math.max(wy, s.gB[1]), s.gB[2]);
      else if (name === 'D') s.Dy = Math.min(Math.max(wy, s.gD[1]), s.gD[2]);
      else if (name === 'G') s.Gy = Math.min(Math.max(wy, s.gL[1]), s.gL[2]);
      else if (name === 'I') s.Ix = Math.min(Math.max(wx, 6.6), d.F[0] - 0.05);
      else if (name === 'K') s.K = [wx, wy];
      refresh();
    },
  );

  dw.nodeSelect(
    NODES.map((nm) => ({ at: () => d[nm] })),
    (i) => {
      s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
      panel.syncAll();
      refresh();
    },
  );

  refresh();
  return player;
}
