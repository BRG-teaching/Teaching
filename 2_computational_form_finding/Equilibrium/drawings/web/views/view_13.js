/**
 * Drawing view/13 "Tower Bridge"
 * (https://block.arch.ethz.ch/eq/drawing/view/13) as a step-by-step
 * construction: the side-span chain of Tower Bridge as a THREE-POINT
 * funicular problem solved four times over.
 *
 * The chain hangs from the short abutment tower F and the tall main tower I
 * and is forced through the anchor point E on hanger 6. The deck load g
 * (15 strips), the one-sided live loads q1 / q2 (intensity factor_q·g on one
 * span) and a moving point load Q each pose the same problem: find the pole
 * whose funicular passes through F, E and I. Division points on the load
 * line (found with trial funiculars, invariant to the trial pole) + parallels
 * to the chords F-E and E-I give each pole; the chain re-forms under every
 * load case, swinging between the q1/q2 extremes.
 *
 * Live port of view_13/applet_0/geogebra.xml (1147 commands; the full XML
 * chain re-evaluated at 1.8e-13 vs baked coords, and this file's own compute
 * regression-checked at 1.5e-6 over 96 chained points -- see
 * notes/view_13_analysis.md). The applet's Tower Bridge etching (40% grey
 * backdrop) is shipped as the actual image at its exact applet anchors.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 13 — Tower Bridge',
  subtitle: 'the side-span chain re-found under dead, one-sided and moving loads',
  about: 'The side span of Tower Bridge: a chain hung from the short abutment tower F and the tall main tower I, forced through the anchor point E — a three-point funicular problem. The deck weight, a one-sided live load on either span, and a moving point load Q each re-pose the same problem: trial funiculars give division points on the load line, parallels to the chords F–E and E–I give the pole, and the chain re-forms — swinging between the two live-load extremes.',
  frame: [[-13.87, -16.85], [197.12, 88.64]],
};

const SPAN = 82.3;
const LX = 0, RX = SPAN;                 // tower verticals
const RAIL_T = 83.818, RAIL_B = -15.880; // hanger action-line rails
const QRAIL = [53.643, 46.756];          // Q-arrow rail (A_4 / W_3 heights)
const BANDH = 2.4;                       // load band height (3 * SLS2)
const SLS = 6.6;                         // reaction-arrow symbol length
const UP = [0, 1];
const RESOLVE = 28;

const DEFAULTS = {
  gy: 7.325643497276167,                 // deck height (G on the y-axis)
  fy: 20,                                // F = top of the short tower
  iy: 37.39708695039244,                 // I = saddle of the main tower
  ey: 11.950863611081829,                // E = the anchor point on hanger 6
  t3x: 86.29073454251047,                // backstay anchor vertical
  lx: 150.49726380807496, ly: 74.8716308064615,   // load line top L_1
  sFD: 0.45,                             // scaleForceDiagram [0.3, 0.8]
  fq: 2.8,                               // factor_q [1, 4]  (q-case intensity ratio)
  fQ: 2,                                 // factor_Q [1, 4]  (Q = factor·strip)
  pQ: 10,                                // positionQ [1, 15] (hanger carrying Q)
  FDD: 2,                                // ForceDiagramDistance [0, 5] (applet: 0)
  // dead-case trial apparatus (applet mode 1, baked defaults)
  t1x: 170.74368369898592, t1y: 62.39774002944728,   // trial pole o'1
  t2x: 164.23392672038268, t2y: 45.00225589496938,   // trial pole o'2
  ts1: 48.73152677187268,                // trial 1 start height (on x = 82.3)
  ts2: 41.28090805127243,                // trial 2 start height (on x = 30.18)
  // Q-case trial apparatus (applet step 8, baked defaults)
  u1x: 176.96009228468222, u1y: 66.05363990544215,
  u2x: 176.4270335900971, u2y: 42.89859276160816,
  us1: 69.90503127137282, us2: 69.76068982666934,
  q6x: 150.2861494838922, q6y: 32.82568661858944,    // Q-alone mini diagram
  sIF: 0.012,
  o1: true,                              // internal-force pipes
  node: 0,
  hideRF: false,
  ph: true,                              // the Tower Bridge etching backdrop
  n4: true,
  _k: 99,
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The side span of Tower Bridge', d: 'left: the chain hangs from the short tower F and the tall tower I, and is anchored at E on hanger 6 (drag F, E, I!) — 15 hangers carry the deck' },
  { t: 'The deck load g', d: 'left: each hanger carries one strip of the green deck band, split at E’s hanger — right: 15 equal loads stacked on the load line (top = rightmost strip)' },
  { t: 'The resultant R_g', d: 'both sides at once: the whole deck weighs R_g — on its centroid line in the form diagram AND as the full load line' },
  { t: 'R₁ and R₂', d: 'the split at E’s hanger: left band = 5.5 strips (R₁), right = 9.5 strips (R₂) — right: the load line divides at the same ratio' },
  { t: 'Trial pole o′₁ — right span', d: 'right: any pole o′₁ with rays to the right-span loads — left: a trial funicular between E’s and I’s verticals, drawn in the workspace above' },
  { t: 'Trial pole o′₂ — left span', d: 'right: a second pole o′₂ for the left-span loads — left: its trial funicular between E’s and F’s verticals' },
  { t: 'Closing lines → division points', d: 'left: close each trial (dashed) — right: parallels through o′₁ and o′₂ cut the load line at the division points i₁ and i₂ (they do not depend on the trial!)' },
  { t: 'Chords → the pole o', d: 'left: the chords F–E and E–I (orange dashed) — right: through i₁ ∥ E–I and through i₂ ∥ F–E: the pole o, with rays to the load line' },
  { t: 'The chain under g', d: 'left: from F, one side parallel to each ray — through E, onto I, and over the saddle to the backstay (dash-dotted: the dead-load chain)' },
  { t: 'Reactions A and B', d: 'right: the polygon closes — A = from the bottom of the load line to o, B = from o back to the top — left: the chain pulls at F and over the saddle at I' },
  { t: 'Check: superposition', d: 'replace each span’s load by its resultant: two strings per span through F, E, I lie ON the chord lines (orange dashed) — right: the sub-poles recombine into o' },
  { t: 'Live load q₁ on the left span', d: 'left: the left band is loaded to factor_q·g (orange) — right: its load line: R₂ = R_g unchanged, R₁ = R_g + R_q₁ grows' },
  { t: 'The pole o₁', d: 'right: the SAME division-point construction on the new load line (parallels to the chords) gives the pole o₁ and its fan' },
  { t: 'The chain under g + q₁', d: 'left: the chain re-forms — still through F, E, I, but sagging deeper on the loaded left span; reactions A, B' },
  { t: 'Live load q₂ on the right span', d: 'left: now the right band is loaded (orange) — right: its load line: R₂ = R_g + R_q₂ grows, R₁ = R_g stays' },
  { t: 'The pole o₂', d: 'right: division points + chord parallels once more → pole o₂ with its fan of rays' },
  { t: 'The chain under g + q₂', d: 'left: the chain swings the other way — deeper on the right span; reactions A, B' },
  { t: 'The envelope', d: 'the chain always passes through F, E and I, but one-sided live load swings it between these two extremes around the dead-load shape' },
  { t: 'A point load Q', d: 'left: a wagon load Q = factor_Q·strip on hanger positionQ (drag it along the deck!) — right: Q on its own small load line' },
  { t: 'Q alone: the chord lines', d: 'left: alone, Q would hang as a triangle through F, E, I — its kink S on the chord lines extended (dashed) — right: the parallels give Q’s own little pole triangle' },
  { t: 'Q joins the load line', d: 'right: the full load line again, with Q widening its strip’s gap (orange, like the original) — left: Q stays on its hanger' },
  { t: 'Trial pole o′₁ again', d: 'right: a trial pole o′₁ with rays to the right-span loads (now including Q if it is there) — left: the trial funicular above the chain' },
  { t: 'Trial pole o′₂ again', d: 'right: the second trial pole o′₂ for the left-span loads — left: its trial funicular' },
  { t: 'Closings → i₁ and i₂', d: 'left: the dashed closings — and the span resultants’ lines of action — right: parallels through o′₁ / o′₂ cut the load line at i₁ and i₂' },
  { t: 'The pole o₃', d: 'right: through i₁ ∥ E–I and through i₂ ∥ F–E: the pole o₃ of the full load, with its fan' },
  { t: 'The chain under g + Q', d: 'left: THE chain — through F, E and I, kinked under Q, over the saddle into the backstay anchor' },
  { t: 'Reactions', d: 'right: A = from below the load line to o₃, B = from o₃ back to the top — left: the chain pulls at the abutment F and along the backstay at I' },
  { t: 'Pure tension', d: 'the trials step back; the chain resolves pink = tension (pipes ∝ force). Drag Q along the deck, drag E, F, I or the poles; play with the sliders' },
];

// ---------------------------------------------------------------------------
// construction (mirrors the applet's command chain; regression: regress13.py)
// ---------------------------------------------------------------------------

const cache = {};
function inter(key, p1, d1, p2, d2) {
  cache[key] = V.intersect(p1, d1, p2, d2) || cache[key] || p1;
  return cache[key];
}

function compute(s) {
  const hx = [];
  for (let k = 0; k < 15; k++) hx.push(SPAN / 30 + (k * SPAN) / 15);
  const w = (SPAN / 15) * s.sFD;
  const F = [LX, s.fy], E = [hx[5], s.ey], I = [RX, s.iy];

  // ---- load lines (points top->bottom; gap j <-> hanger 15-j) ----
  const line = (x0, gaps) => {
    const pts = [[x0, s.ly]];
    let y = s.ly;
    for (const gp of gaps) { y -= gp; pts.push([x0, y]); }
    return pts;
  };
  const gapsG = Array(15).fill(w);
  const gapsQ1 = [...Array(9).fill(w), 0.5 * w, 0.5 * w * s.fq, ...Array(5).fill(w * s.fq)];
  const gapsQ2 = [...Array(9).fill(w * s.fq), 0.5 * w * s.fq, 0.5 * w, ...Array(5).fill(w)];
  const gapsQQ = gapsG.map((g, k) => g + (k === 15 - s.pQ ? w * s.fQ : 0));
  const Pg = line(s.lx, gapsG);
  const Pq1 = line(s.lx + 2 * s.FDD, gapsQ1);
  const Pq2 = line(s.lx + 4 * s.FDD, gapsQ2);
  const PQ = line(s.lx + 6 * s.FDD, gapsQQ);
  const R13 = [s.lx, s.ly - 9.5 * w];

  // ---- trial funicular -> division point (invariant to pole and start) ----
  const xsR = hx.slice(6, 15).reverse();          // h15..h7
  const xsL = hx.slice(0, 5).reverse();           // h5..h1
  function trialFun(key, loadPts, xs, xa, xb, T, y0) {
    const pts = [[xa, y0]];
    let p = pts[0];
    xs.forEach((xv, j) => {
      p = inter(`${key}${j}`, p, V.sub(loadPts[j], T), [xv, 0], UP);
      pts.push(p);
    });
    p = inter(`${key}e`, p, V.sub(loadPts[xs.length], T), [xb, 0], UP);
    pts.push(p);
    const div = inter(`${key}d`, T, V.sub(pts[pts.length - 1], pts[0]), loadPts[0], UP);
    return { pts, div };
  }
  function poleFor(key, pts, leftLo, T1, y1, T2, y2) {
    const t1 = trialFun(`${key}A`, pts.slice(0, 10), xsR, RX, hx[5], T1, y1);
    const t2 = trialFun(`${key}B`, pts.slice(leftLo), xsL, hx[5], LX, T2, y2);
    const o = inter(`${key}o`, t1.div, V.sub(I, E), t2.div, V.sub(E, F));
    return { t1, t2, i1: t1.div, i2: t2.div, o };
  }
  const dG = poleFor('g', Pg, 10, [s.t1x, s.t1y], s.ts1, [s.t2x, s.t2y], s.ts2);
  const TA = [s.lx - 45, 60], TB = [s.lx - 45, 30];
  const dq1 = poleFor('q1', Pq1, 11, TA, 55, TB, 45);
  const dq2 = poleFor('q2', Pq2, 11, TA, 55, TB, 45);
  const dQ = poleFor('Q', PQ, 10, [s.u1x, s.u1y], s.us1, [s.u2x, s.u2y], s.us2);

  // ---- chains: side k || o->S[k], S = bottom->top skipping the E half-point ----
  function chain(key, pts, o, skip) {
    let S = [...pts].reverse();
    if (skip !== null) S = S.filter((_, j) => j !== skip);
    const ch = [F];
    let p = F;
    for (let k = 0; k < 15; k++) {
      p = inter(`${key}${k}`, p, V.sub(S[k], o), [hx[k], 0], UP);
      ch.push(p);
    }
    ch.push(inter(`${key}I`, p, V.sub(S[15], o), [RX, 0], UP));
    return ch;
  }
  const chG = chain('cg', Pg, dG.o, null);
  const chQ1 = chain('c1', Pq1, dq1.o, 6);
  const chQ2 = chain('c2', Pq2, dq2.o, 6);
  const chQ = chain('cq', PQ, dQ.o, null);
  const bkG = inter('bkG', chG[15], V.sub(Pg[0], dG.o), [s.t3x, 0], UP);
  const bkQ = inter('bkQ', chQ[15], V.sub(PQ[0], dQ.o), [s.t3x, 0], UP);

  // ---- resultant lines of action (centroids; equal the applet's trials) ----
  const cxAll = hx.reduce((a, b) => a + b, 0) / 15;
  const cxL = (hx.slice(0, 5).reduce((a, b) => a + b, 0) + 0.5 * hx[5]) / 5.5;
  const cxR = (0.5 * hx[5] + hx.slice(6).reduce((a, b) => a + b, 0)) / 9.5;
  const xq = hx[s.pQ - 1];
  let sL = 5.5, mL = 5.5 * cxL, sR = 9.5, mR = 9.5 * cxR;
  if (s.pQ <= 5) { sL += s.fQ; mL += s.fQ * xq; }
  else if (s.pQ >= 7) { sR += s.fQ; mR += s.fQ * xq; }
  else { sL += s.fQ / 2; mL += (s.fQ / 2) * xq; sR += s.fQ / 2; mR += (s.fQ / 2) * xq; }
  const cxLQ = mL / sL, cxRQ = mR / sR;

  // ---- reactions (form arrows of length SLS along the chain ends) ----
  const rA = (o, bot) => V.add(F, V.mul(V.unit(V.sub(o, bot)), SLS));
  const rB = (o, top) => V.add(I, V.mul(V.unit(V.sub(top, o)), SLS));
  const AgF = rA(dG.o, Pg[15]), BgF = rB(dG.o, Pg[0]);
  const Aq1F = rA(dq1.o, Pq1[16]), Bq1F = rB(dq1.o, Pq1[0]);
  const Aq2F = rA(dq2.o, Pq2[16]), Bq2F = rB(dq2.o, Pq2[0]);
  const AQF = rA(dQ.o, PQ[15]), BQF = rB(dQ.o, PQ[0]);

  // ---- Q alone: chord rails + string triangle + mini force triangle ----
  const U6 = inter('U6', I, V.sub(E, I), [LX, 0], UP);
  const V6 = inter('V6', F, V.sub(E, F), [RX, 0], UP);
  const S6 = inter('S6', E, xq < hx[5] ? V.sub(U6, E) : V.sub(V6, E), [xq, 0], UP);
  const Q6 = [s.q6x, s.q6y], R6 = [s.q6x, s.q6y - w * s.fQ];
  const T6 = inter('T6', R6, V.sub(S6, F), Q6, V.sub(I, S6));

  // ---- mode-2 superposition (dead case) ----
  const D12 = inter('D12', I, V.sub(E, I), [cxL, 0], UP);
  const T15 = inter('T15', F, V.sub(E, F), [cxR, 0], UP);
  const V20 = inter('V20', Pg[15], V.sub(D12, F), R13, V.sub(I, D12));
  const A21 = inter('A21', Pg[0], V.sub(T15, I), R13, V.sub(F, T15));

  // ---- forces (kN) ----
  const NA = V.dist(dQ.o, PQ[15]) / s.sFD;
  const NB = V.dist(PQ[0], dQ.o) / s.sFD;
  const Ns = [];                                   // final chain side forces
  let S = [...PQ].reverse();
  for (let k = 0; k < 16; k++) Ns.push(V.dist(S[k], dQ.o) / s.sFD);

  return { hx, w, F, E, I, Pg, Pq1, Pq2, PQ, R13, dG, dq1, dq2, dQ,
           chG, chQ1, chQ2, chQ, bkG, bkQ, cxAll, cxL, cxR, cxLQ, cxRQ, xq,
           AgF, BgF, Aq1F, Bq1F, Aq2F, Bq2F, AQF, BQF,
           U6, V6, S6, Q6, R6, T6, D12, T15, V20, A21, NA, NB, Ns };
}

const pairs = (poly) => poly.slice(0, -1).map((p, i) => [p, poly[i + 1]]);

/** polyline -> fixed-world-unit dash pairs, padded to `count`. */
function dashify(pts, dash, gap, count) {
  const out = [];
  for (let i = 0; i < pts.length - 1 && out.length < count; i++) {
    const a = pts[i], b = pts[i + 1];
    const L = V.dist(a, b), u = V.unit(V.sub(b, a));
    for (let t = 0; t < L && out.length < count; t += dash + gap) {
      const e = Math.min(t + dash, L);
      out.push([V.add(a, V.mul(u, t)), V.add(a, V.mul(u, e))]);
    }
  }
  while (out.length < count) out.push([pts[0], pts[0]]);
  return out;
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);

  const W_CH = 0.42, W_FIN = 0.62, W_RAY = 0.13, W_TRI = 0.26, W_GUIDE = 0.1;
  const ARROW = { w: 0.55, headLen: 2.1, headW: 0.85 };
  const RARROW = { w: 0.7, headLen: 2.4, headW: 0.95, dash: 1.35 };
  const ORANGE = PAL.orange;
  const chainColor = { pending: PAL.black, final: () => PAL.red };  // chain = tension
  const DASH = 1.1;

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // ---- step 1: site ----
  // The applet's Tower Bridge etching, at its exact GeoGebra anchors
  // (corners B -> A, alpha 0.4) -- the actual image, never a redrawn copy.
  const silw = (st) => st.ph;
  const IMG_BL = [-40.35014, -67], IMG_BR = [243.40382959383373, -67];
  const IMG_TL = [IMG_BL[0], IMG_BL[1] + (IMG_BR[0] - IMG_BL[0]) * (516 / 960)];
  dw.image('etching', 'assets/view_13_etching.png',
           { corners: [IMG_BL, IMG_BR, IMG_TL], opacity: 0.4, intro: 1, when: silw });
  dw.seg('deck', { intro: 1, w: 0.26, color: PAL.black });
  for (let k = 0; k < 15; k++) dw.dashLine(`hang${k}`, { intro: 1, dash: DASH, flash: false });
  dw.dashLine('edgeL', { intro: 1, dash: DASH, flash: false });
  dw.dashLine('edgeR', { intro: 1, dash: DASH, flash: false });
  dw.dashLine('edgeT3', { intro: 1, dash: DASH, flash: false });

  // ---- step 2: dead load band + load line ----
  dw.poly('bandL', 4, { intro: 2, opacity: 0.12, color: PAL.green, flash: false });
  dw.poly('bandR', 4, { intro: 2, opacity: 0.12, color: PAL.green, flash: false });
  dw.strokes('bandO', 5, { intro: 2, w: 0.16, color: PAL.green });
  dw.label('lg1', 'g', { intro: 2, color: PAL.green });
  dw.label('lg2', 'g', { intro: 2, color: PAL.green });
  dw.seg('llg', { intro: 2, outro: 12, w: 0.1, color: PAL.grey });
  dw.strokes('ltg', 16, { intro: 2, outro: 12, w: 0.12, color: PAL.grey });

  // ---- step 3: resultant R_g; step 4: the R1 / R2 split ----
  dw.dashArrow('RgF', { intro: 3, outro: 4, ...RARROW });
  dw.dashArrow('RgL', { intro: 3, outro: 4, ...RARROW });
  dw.label('lRgF', 'R_g', { intro: 3, outro: 4, color: PAL.green });
  dw.label('lRgL', 'R_g', { intro: 3, outro: 4, color: PAL.green });
  dw.dashLine('r1line', { intro: 4, outro: 12, dash: DASH, flash: false });
  dw.dashLine('r2line', { intro: 4, outro: 12, dash: DASH, flash: false });
  dw.dashArrow('R1F', { intro: 4, outro: 12, ...RARROW });
  dw.dashArrow('R2F', { intro: 4, outro: 12, ...RARROW });
  dw.dashArrow('R2L', { intro: 4, outro: 12, ...RARROW });
  dw.dashArrow('R1L', { intro: 4, outro: 12, ...RARROW });
  dw.label('lR1F', 'R₁', { intro: 4, outro: 12, color: PAL.green });
  dw.label('lR2F', 'R₂', { intro: 4, outro: 12, color: PAL.green });
  dw.label('lR1L', 'R₁', { intro: 4, outro: 12, color: PAL.green });
  dw.label('lR2L', 'R₂', { intro: 4, outro: 12, color: PAL.green });

  // ---- steps 5-8: dead-case trial -> divisions -> chords -> pole o ----
  dw.strokes('tfan1', 10, { intro: 5, outro: 12, w: W_RAY, color: PAL.grey });
  dw.strokes('tfun1', 10, { intro: 5, outro: 12, w: W_TRI, color: PAL.grey });
  dw.strokes('tfan2', 6, { intro: 6, outro: 12, w: W_RAY, color: PAL.grey });
  dw.strokes('tfun2', 6, { intro: 6, outro: 12, w: W_TRI, color: PAL.grey });
  dw.dashLine('tcl1', { intro: 7, outro: 12, dash: DASH });
  dw.dashLine('tcl2', { intro: 7, outro: 12, dash: DASH });
  dw.dashLine('tdiv1', { intro: 7, outro: 12, dash: DASH });
  dw.dashLine('tdiv2', { intro: 7, outro: 12, dash: DASH });
  dw.dashLine('chordL', { intro: 8, color: ORANGE, dash: 1.4 });
  dw.dashLine('chordR', { intro: 8, color: ORANGE, dash: 1.4 });
  dw.dashLine('ppar1', { intro: 8, outro: 12, dash: DASH });
  dw.dashLine('ppar2', { intro: 8, outro: 12, dash: DASH });
  dw.strokes('fanG', 16, { intro: 8, outro: 12, w: W_RAY, color: PAL.grey });

  // ---- step 9: the dead chain (dash-dotted) ----
  const NDASH = 64;
  dw.strokes('chainG', NDASH, { intro: 9, w: W_CH, color: PAL.black });
  dw.highlight('fanG', [9]);

  // ---- step 10: reactions ----
  const rfw = (st) => !st.hideRF;
  dw.arrow('reacAg', { intro: 10, outro: 14, ...ARROW });
  dw.arrow('reacBg', { intro: 10, outro: 14, ...ARROW });
  dw.arrow('reacAgl', { intro: 10, outro: 14, ...ARROW, when: rfw });
  dw.arrow('reacBgl', { intro: 10, outro: 14, ...ARROW, when: rfw });
  dw.label('lAg', 'A', { intro: 10, outro: 14, color: PAL.green });
  dw.label('lBg', 'B', { intro: 10, outro: 14, color: PAL.green });
  dw.label('lAgl', 'A', { intro: 10, outro: 14, color: PAL.green, when: rfw });
  dw.label('lBgl', 'B', { intro: 10, outro: 14, color: PAL.green, when: rfw });

  // ---- step 11: superposition check (the applet's mode 2) ----
  dw.dashLine('supF1', { intro: 11, outro: 12, color: ORANGE, dash: 1.4 });
  dw.dashLine('supF2', { intro: 11, outro: 12, color: ORANGE, dash: 1.4 });
  dw.dashLine('supL1', { intro: 11, outro: 12, color: ORANGE, dash: 1.4 });
  dw.dashLine('supL2', { intro: 11, outro: 12, color: ORANGE, dash: 1.4 });
  dw.dashLine('supC1', { intro: 11, outro: 12, color: ORANGE, dash: 1.4 });
  dw.dashLine('supC2', { intro: 11, outro: 12, color: ORANGE, dash: 1.4 });
  dw.label('lsup2', 'II', { intro: 11, outro: 12, color: ORANGE });
  dw.label('lsup3', 'III', { intro: 11, outro: 12, color: ORANGE });

  // ---- steps 12-14: live load q1 ----
  dw.poly('bandQ1', 4, { intro: 12, opacity: 0.16, color: ORANGE, flash: false });
  dw.strokes('bandQ1o', 4, { intro: 12, w: 0.16, color: ORANGE });
  dw.label('lq1', 'q₁', { intro: 12, color: ORANGE });
  dw.seg('llq1', { intro: 12, outro: 15, w: 0.1, color: PAL.grey });
  dw.strokes('ltq1', 17, { intro: 12, outro: 15, w: 0.12, color: PAL.grey });
  dw.dashArrow('Rq1a', { intro: 12, outro: 15, ...RARROW });
  dw.dashArrow('Rq1b', { intro: 12, outro: 15, ...RARROW });
  dw.label('lRq1a', 'R₂ = R_g', { intro: 12, outro: 15, color: PAL.green });
  dw.label('lRq1b', 'R₁ = R_g + R_q₁', { intro: 12, outro: 15, color: PAL.green });
  dw.dashLine('pparQ1a', { intro: 13, outro: 15, dash: DASH });
  dw.dashLine('pparQ1b', { intro: 13, outro: 15, dash: DASH });
  dw.strokes('fanQ1', 17, { intro: 13, outro: 15, w: W_RAY, color: PAL.grey });
  dw.highlight('chordL', [13, 16, 25]);
  dw.highlight('chordR', [13, 16, 25]);
  dw.strokes('chainQ1', 16, { intro: 14, w: W_CH, color: PAL.black });
  dw.arrow('reacAq1', { intro: 14, outro: 15, ...ARROW });
  dw.arrow('reacBq1', { intro: 14, outro: 15, ...ARROW });
  dw.arrow('reacAq1l', { intro: 14, outro: 15, ...ARROW, when: rfw });
  dw.arrow('reacBq1l', { intro: 14, outro: 15, ...ARROW, when: rfw });
  dw.label('lAq1', 'A', { intro: 14, outro: 15, color: PAL.green });
  dw.label('lBq1', 'B', { intro: 14, outro: 15, color: PAL.green });

  // ---- steps 15-17: live load q2 ----
  dw.poly('bandQ2', 4, { intro: 15, opacity: 0.16, color: ORANGE, flash: false });
  dw.strokes('bandQ2o', 4, { intro: 15, w: 0.16, color: ORANGE });
  dw.label('lq2', 'q₂', { intro: 15, color: ORANGE });
  dw.seg('llq2', { intro: 15, outro: 19, w: 0.1, color: PAL.grey });
  dw.strokes('ltq2', 17, { intro: 15, outro: 19, w: 0.12, color: PAL.grey });
  dw.dashArrow('Rq2a', { intro: 15, outro: 19, ...RARROW });
  dw.dashArrow('Rq2b', { intro: 15, outro: 19, ...RARROW });
  dw.label('lRq2a', 'R₂ = R_g + R_q₂', { intro: 15, outro: 19, color: PAL.green });
  dw.label('lRq2b', 'R₁ = R_g', { intro: 15, outro: 19, color: PAL.green });
  dw.dashLine('pparQ2a', { intro: 16, outro: 18, dash: DASH });
  dw.dashLine('pparQ2b', { intro: 16, outro: 18, dash: DASH });
  dw.strokes('fanQ2', 17, { intro: 16, outro: 19, w: W_RAY, color: PAL.grey });
  dw.strokes('chainQ2', 16, { intro: 17, w: W_CH, color: PAL.black });
  dw.arrow('reacAq2', { intro: 17, outro: 19, ...ARROW });
  dw.arrow('reacBq2', { intro: 17, outro: 19, ...ARROW });
  dw.arrow('reacAq2l', { intro: 17, outro: 19, ...ARROW, when: rfw });
  dw.arrow('reacBq2l', { intro: 17, outro: 19, ...ARROW, when: rfw });
  dw.label('lAq2', 'A', { intro: 17, outro: 19, color: PAL.green });
  dw.label('lBq2', 'B', { intro: 17, outro: 19, color: PAL.green });

  // ---- step 18: envelope (highlights only) ----
  dw.highlight('chainG', [18]);
  dw.highlight('chainQ1', [18]);
  dw.highlight('chainQ2', [18]);

  // ---- steps 19-21: the point load Q ----
  dw.dashLine('qline', { intro: 19, color: ORANGE, dash: DASH, flash: false });
  dw.arrow('loadQ', { intro: 19, ...ARROW, w: 0.62, headW: 0.95, color: ORANGE });
  dw.label('lQ', 'Q', { intro: 19, color: ORANGE });
  dw.arrow('qmini', { intro: 19, outro: 21, ...ARROW, color: ORANGE });
  dw.label('lQm', 'Q', { intro: 19, outro: 21, color: ORANGE });
  dw.dashLine('rail', { intro: 20, outro: 21, dash: DASH });
  dw.dashLine('qaloneF', { intro: 20, outro: 21, color: ORANGE, dash: 1.4 });
  dw.dashLine('qaloneP1', { intro: 20, outro: 21, dash: DASH });
  dw.dashLine('qaloneP2', { intro: 20, outro: 21, dash: DASH });
  dw.label('lS6', 'S', { intro: 20, outro: 21, cls: 'point' });
  dw.seg('llQ', { intro: 21, w: 0.1, color: PAL.grey });
  dw.strokes('ltQ', 16, { intro: 21, w: 0.12, color: PAL.grey });
  dw.seg('segQ', { intro: 21, w: 0.55, color: ORANGE });
  dw.label('lQl', 'Q', { intro: 21, color: ORANGE });
  dw.dashArrow('RgQ', { intro: 21, ...RARROW });
  dw.label('lRgQ', 'R_g + Q', { intro: 21, color: PAL.green });
  dw.highlight('loadQ', [21]);

  // ---- steps 22-25: Q-case trial -> divisions -> pole o3 ----
  dw.strokes('qtfan1', 11, { intro: 22, outro: 27, w: W_RAY, color: PAL.grey });
  dw.strokes('qtfun1', 10, { intro: 22, outro: 27, w: W_TRI, color: PAL.grey });
  dw.strokes('qtfan2', 7, { intro: 23, outro: 27, w: W_RAY, color: PAL.grey });
  dw.strokes('qtfun2', 6, { intro: 23, outro: 27, w: W_TRI, color: PAL.grey });
  dw.dashLine('qtcl1', { intro: 24, outro: 27, dash: DASH });
  dw.dashLine('qtcl2', { intro: 24, outro: 27, dash: DASH });
  dw.dashLine('qtdiv1', { intro: 24, outro: 27, dash: DASH });
  dw.dashLine('qtdiv2', { intro: 24, outro: 27, dash: DASH });
  dw.dashLine('resl1', { intro: 24, outro: 27, dash: DASH });
  dw.dashLine('resl2', { intro: 24, outro: 27, dash: DASH });
  dw.dashLine('pparQa', { intro: 25, outro: 27, dash: DASH });
  dw.dashLine('pparQb', { intro: 25, outro: 27, dash: DASH });
  dw.strokes('fanQ', 16, { intro: 25, w: W_RAY, color: PAL.grey });

  // ---- step 26: THE chain; step 27: reactions ----
  dw.strokes('chainQ', 16, { intro: 26, w: W_FIN, color: chainColor });
  dw.seg('bstayQ', { intro: 26, w: 0.5, color: chainColor });
  dw.highlight('fanQ', [26]);
  dw.arrow('reacAQ', { intro: 27, ...ARROW });
  dw.arrow('reacBQ', { intro: 27, ...ARROW });
  dw.arrow('reacAQl', { intro: 27, ...ARROW, when: rfw });
  dw.arrow('reacBQl', { intro: 27, ...ARROW, when: rfw });
  dw.label('lAQ', 'A', { intro: 27, color: PAL.green });
  dw.label('lBQ', 'B', { intro: 27, color: PAL.green });
  dw.label('lAQl', 'A', { intro: 27, color: PAL.green, when: rfw });
  dw.label('lBQl', 'B', { intro: 27, color: PAL.green, when: rfw });

  // ---- internal-force pipes on the final chain (+ backstay) ----
  const pw = (st) => st.o1 && st._k >= RESOLVE;
  for (let k = 0; k < 17; k++) {
    dw.poly(`if${k}`, 4, { intro: RESOLVE, opacity: 0.16, color: PAL.red, flash: false, when: pw });
  }

  // ---- points ----
  const HANDLE = { r: 0.85 }, DERIVED = { r: 0.62 };
  const show = (st) => st.n4;
  dw.disk('pt_F', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_E', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_I', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_L1', { intro: 2, ...HANDLE, when: show });
  dw.disk('pt_R13', { intro: 4, ...DERIVED, when: show });
  dw.disk('pt_tp1', { intro: 5, outro: 12, ...HANDLE, when: show });
  dw.disk('pt_ts1', { intro: 5, outro: 12, ...HANDLE, when: show });
  dw.disk('pt_tp2', { intro: 6, outro: 12, ...HANDLE, when: show });
  dw.disk('pt_ts2', { intro: 6, outro: 12, ...HANDLE, when: show });
  dw.disk('pt_i1', { intro: 7, outro: 12, ...DERIVED, when: show });
  dw.disk('pt_i2', { intro: 7, outro: 12, ...DERIVED, when: show });
  dw.disk('pt_o', { intro: 8, outro: 12, ...DERIVED, when: show });
  dw.disk('pt_o1', { intro: 13, outro: 15, ...DERIVED, when: show });
  dw.disk('pt_o2', { intro: 16, outro: 19, ...DERIVED, when: show });
  dw.disk('pt_S6', { intro: 20, outro: 21, ...DERIVED, when: show });
  dw.disk('pt_T6', { intro: 20, outro: 21, ...DERIVED, when: show });
  dw.disk('pt_q6', { intro: 19, outro: 21, ...HANDLE, when: show });
  dw.disk('pt_up1', { intro: 22, outro: 27, ...HANDLE, when: show });
  dw.disk('pt_us1', { intro: 22, outro: 27, ...HANDLE, when: show });
  dw.disk('pt_up2', { intro: 23, outro: 27, ...HANDLE, when: show });
  dw.disk('pt_us2', { intro: 23, outro: 27, ...HANDLE, when: show });
  dw.disk('pt_j1', { intro: 24, outro: 27, ...DERIVED, when: show });
  dw.disk('pt_j2', { intro: 24, outro: 27, ...DERIVED, when: show });
  dw.disk('pt_o3', { intro: 25, ...DERIVED, when: show });

  const letters = {
    F: ['F', 1], E: ['E', 1], I: ['I', 1],
    tp1: ['o′₁', 5, 12], tp2: ['o′₂', 6, 12], i1: ['i₁', 7, 12], i2: ['i₂', 7, 12],
    o: ['o', 8, 12], o1: ['o₁', 13, 15], o2: ['o₂', 16, 19],
    up1: ['o′₁', 22, 27], up2: ['o′₂', 23, 27], j1: ['i₁', 24, 27], j2: ['i₂', 24, 27],
    o3: ['o₃', 25],
  };
  for (const [pn, [text, intro, outro]] of Object.entries(letters)) {
    dw.label(`lbl_${pn}`, text, { cls: 'point', intro, outro, when: show });
  }
  // hanger numbers 1..15
  for (let k = 0; k < 15; k++) {
    dw.label(`hn${k}`, `${k + 1}`, { cls: 'num', intro: 1, flash: false, when: show });
  }

  // readouts
  for (let i = 0; i < 3; i++) {
    dw.label(`ro${i}`, '', { intro: RESOLVE, flash: false,
              color: i < 2 ? PAL.green : ORANGE });
  }

  // node-equilibrium inspector
  dw.nodeInspector(3, { when: (st) => st.node > 0, w: 1.5 * W_FIN, headLen: 2.4, headW: 0.95, r: 1.0 });

  // ---- dual hover pairs ----
  dw.link('bandO', 'ltg', 'llg', 'lg1', 'lg2');
  dw.link('RgF', 'RgL', 'lRgF', 'lRgL');
  dw.link('R1F', 'R1L', 'lR1F', 'lR1L');
  dw.link('R2F', 'R2L', 'lR2F', 'lR2L');
  dw.link('tfun1', 'tfan1');
  dw.link('tfun2', 'tfan2');
  dw.link('tcl1', 'tdiv1');
  dw.link('tcl2', 'tdiv2');
  dw.link('chordL', 'ppar2', 'pparQ1b', 'pparQ2b', 'pparQb');
  dw.link('chordR', 'ppar1', 'pparQ1a', 'pparQ2a', 'pparQa');
  dw.link('chainG', 'fanG');
  dw.link('reacAg', 'reacAgl', 'lAg', 'lAgl');
  dw.link('reacBg', 'reacBgl', 'lBg', 'lBgl');
  dw.link('supF1', 'supL1');
  dw.link('supF2', 'supL2');
  dw.link('bandQ1o', 'ltq1', 'llq1', 'lq1');
  dw.link('chainQ1', 'fanQ1');
  dw.link('reacAq1', 'reacAq1l', 'lAq1');
  dw.link('reacBq1', 'reacBq1l', 'lBq1');
  dw.link('bandQ2o', 'ltq2', 'llq2', 'lq2');
  dw.link('chainQ2', 'fanQ2');
  dw.link('reacAq2', 'reacAq2l', 'lAq2');
  dw.link('reacBq2', 'reacBq2l', 'lBq2');
  dw.link('loadQ', 'qmini', 'segQ', 'lQ', 'lQm', 'lQl');
  dw.link('qaloneF', 'qaloneP1', 'qaloneP2');
  dw.link('qtfun1', 'qtfan1');
  dw.link('qtfun2', 'qtfan2');
  dw.link('qtcl1', 'qtdiv1');
  dw.link('qtcl2', 'qtdiv2');
  dw.link('chainQ', 'fanQ', 'bstayQ');
  dw.link('reacAQ', 'reacAQl', 'lAQ', 'lAQl');
  dw.link('reacBQ', 'reacBQl', 'lBQ', 'lBQl');
  dw.ghostable('RgQ', 'segQ', 'llQ', 'reacAQl', 'reacBQl', 'bstayQ', 'ltQ', 'fanQ');

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    const dy = s.gy, bt = dy + BANDH;
    dw.setLabel('form_title', [-8, 86.3]);
    dw.setLabel('force_title', [120, 86.3]);
    dw.setLabel('force_sub', [180, 86.3]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(2)} kN`);

    dw.setSeg('deck', [LX, dy], [RX, dy]);
    d.hx.forEach((x, k) => dw.setDashLine(`hang${k}`, [[x, RAIL_B], [x, RAIL_T]]));
    dw.setDashLine('edgeL', [[LX, RAIL_B], [LX, RAIL_T]]);
    dw.setDashLine('edgeR', [[RX, RAIL_B], [RX, RAIL_T]]);
    dw.setDashLine('edgeT3', [[s.t3x, RAIL_B], [s.t3x, RAIL_T]]);
    d.hx.forEach((x, k) => dw.setLabel(`hn${k}`, [x, dy + BANDH + 1.1]));

    // dead load band + load line
    dw.setPoly('bandL', [[LX, dy], [d.hx[5], dy], [d.hx[5], bt], [LX, bt]]);
    dw.setPoly('bandR', [[d.hx[5], dy], [RX, dy], [RX, bt], [d.hx[5], bt]]);
    dw.setStrokes('bandO', [[[LX, bt], [RX, bt]], [[LX, dy], [LX, bt]],
                            [[RX, dy], [RX, bt]], [[d.hx[5], dy], [d.hx[5], bt]],
                            [[LX, dy], [RX, dy]]]);
    dw.setLabel('lg1', [LX - 2.6, (dy + bt) / 2]);
    dw.setLabel('lg2', [RX + 2.6, (dy + bt) / 2]);
    const ticks = (name, pts) =>
      dw.setStrokes(name, pts.map((p) => [[p[0] - 0.9, p[1]], [p[0] + 0.9, p[1]]]));
    dw.setSeg('llg', d.Pg[0], d.Pg[15]);
    ticks('ltg', d.Pg);

    // resultants
    const ry = 2.617556;
    dw.setDashArrow('RgF', [d.cxAll, ry], [d.cxAll, ry - 2 * SLS]);
    dw.setLabel('lRgF', [d.cxAll + 2.2, ry - SLS]);
    dw.setDashArrow('RgL', d.Pg[0], d.Pg[15]);
    dw.setLabel('lRgL', [s.lx + 2.4, (d.Pg[0][1] + d.Pg[15][1]) / 2]);
    dw.setDashLine('r1line', [[d.cxL, RAIL_B], [d.cxL, s.gy]]);
    dw.setDashLine('r2line', [[d.cxR, RAIL_B], [d.cxR, s.gy]]);
    dw.setDashArrow('R1F', [d.cxL, ry], [d.cxL, ry - 2 * SLS]);
    dw.setDashArrow('R2F', [d.cxR, ry], [d.cxR, ry - 2 * SLS]);
    dw.setLabel('lR1F', [d.cxL + 2.2, ry - SLS]);
    dw.setLabel('lR2F', [d.cxR + 2.2, ry - SLS]);
    dw.setDashArrow('R2L', d.Pg[0], d.R13);
    dw.setDashArrow('R1L', d.R13, d.Pg[15]);
    dw.setLabel('lR2L', [s.lx + 2.6, (d.Pg[0][1] + d.R13[1]) / 2]);
    dw.setLabel('lR1L', [s.lx + 2.6, (d.R13[1] + d.Pg[15][1]) / 2]);

    // dead trial
    const tp1 = [s.t1x, s.t1y], tp2 = [s.t2x, s.t2y];
    dw.setStrokes('tfan1', d.Pg.slice(0, 10).map((p) => [tp1, p]));
    dw.setStrokes('tfun1', pairs(d.dG.t1.pts));
    dw.setStrokes('tfan2', d.Pg.slice(10).map((p) => [tp2, p]));
    dw.setStrokes('tfun2', pairs(d.dG.t2.pts));
    const t1p = d.dG.t1.pts, t2p = d.dG.t2.pts;
    dw.setDashLine('tcl1', [t1p[0], t1p[t1p.length - 1]]);
    dw.setDashLine('tcl2', [t2p[0], t2p[t2p.length - 1]]);
    dw.setDashLine('tdiv1', [tp1, d.dG.i1]);
    dw.setDashLine('tdiv2', [tp2, d.dG.i2]);

    // chords + dead pole
    dw.setDashLine('chordL', [d.F, d.E]);
    dw.setDashLine('chordR', [d.E, d.I]);
    const ext = (a, b, f) => V.add(b, V.mul(V.sub(b, a), f));
    dw.setDashLine('ppar1', [d.dG.i1, ext(d.dG.i1, d.dG.o, 0.25)]);
    dw.setDashLine('ppar2', [d.dG.i2, ext(d.dG.i2, d.dG.o, 0.25)]);
    dw.setStrokes('fanG', d.Pg.map((p) => [d.dG.o, p]));
    dw.setStrokes('chainG', dashify([...d.chG, d.bkG], 1.5, 1.05, NDASH));

    // dead reactions
    dw.setArrow('reacAg', d.F, d.AgF);
    dw.setArrow('reacBg', d.I, d.BgF);
    dw.setArrow('reacAgl', d.Pg[15], d.dG.o);
    dw.setArrow('reacBgl', d.dG.o, d.Pg[0]);
    dw.setLabel('lAg', V.add(d.AgF, [-1.6, 1.3]));
    dw.setLabel('lBg', V.add(d.BgF, [1.6, 1.3]));
    dw.setLabel('lAgl', V.add(V.mid(d.Pg[15], d.dG.o), [-1.2, -1.6]));
    dw.setLabel('lBgl', V.add(V.mid(d.dG.o, d.Pg[0]), [-1.6, 1.4]));

    // superposition check
    dw.setDashLine('supF1', [d.F, d.D12, d.I]);
    dw.setDashLine('supF2', [d.I, d.T15, d.F]);
    dw.setDashLine('supL1', [d.Pg[15], d.V20, d.R13]);
    dw.setDashLine('supL2', [d.R13, d.A21, d.Pg[0]]);
    dw.setDashLine('supC1', [d.V20, d.dG.o]);
    dw.setDashLine('supC2', [d.A21, d.dG.o]);
    dw.setLabel('lsup2', V.add(V.mid(d.T15, d.F), [-3, 2.4]));
    dw.setLabel('lsup3', V.add(V.mid(d.D12, d.I), [1.4, -1.6]));

    // q1
    const qb = dy - 2.815, qt = dy - 0.415;      // live-load band below the deck
    dw.setPoly('bandQ1', [[LX, qb], [d.hx[5], qb], [d.hx[5], qt], [LX, qt]]);
    dw.setStrokes('bandQ1o', [[[LX, qb], [d.hx[5], qb]], [[LX, qt], [d.hx[5], qt]],
                              [[LX, qb], [LX, qt]], [[d.hx[5], qb], [d.hx[5], qt]]]);
    dw.setLabel('lq1', [LX - 2.6, (qb + qt) / 2]);
    dw.setSeg('llq1', d.Pq1[0], d.Pq1[16]);
    ticks('ltq1', d.Pq1);
    dw.setDashArrow('Rq1a', d.Pq1[0], d.Pq1[10]);
    dw.setDashArrow('Rq1b', d.Pq1[10], d.Pq1[16]);
    dw.setLabel('lRq1a', [d.Pq1[0][0] + 2.6, (d.Pq1[0][1] + d.Pq1[10][1]) / 2]);
    dw.setLabel('lRq1b', [d.Pq1[10][0] + 2.6, (d.Pq1[10][1] + d.Pq1[16][1]) / 2]);
    dw.setDashLine('pparQ1a', [d.dq1.i1, ext(d.dq1.i1, d.dq1.o, 0.25)]);
    dw.setDashLine('pparQ1b', [d.dq1.i2, ext(d.dq1.i2, d.dq1.o, 0.25)]);
    dw.setStrokes('fanQ1', d.Pq1.map((p) => [d.dq1.o, p]));
    dw.setStrokes('chainQ1', pairs(d.chQ1));
    dw.setArrow('reacAq1', d.F, d.Aq1F);
    dw.setArrow('reacBq1', d.I, d.Bq1F);
    dw.setArrow('reacAq1l', d.Pq1[16], d.dq1.o);
    dw.setArrow('reacBq1l', d.dq1.o, d.Pq1[0]);
    dw.setLabel('lAq1', V.add(d.Aq1F, [-1.6, 1.3]));
    dw.setLabel('lBq1', V.add(d.Bq1F, [1.6, 1.3]));

    // q2
    dw.setPoly('bandQ2', [[d.hx[5], qb], [RX, qb], [RX, qt], [d.hx[5], qt]]);
    dw.setStrokes('bandQ2o', [[[d.hx[5], qb], [RX, qb]], [[d.hx[5], qt], [RX, qt]],
                              [[d.hx[5], qb], [d.hx[5], qt]], [[RX, qb], [RX, qt]]]);
    dw.setLabel('lq2', [RX + 2.6, (qb + qt) / 2]);
    dw.setSeg('llq2', d.Pq2[0], d.Pq2[16]);
    ticks('ltq2', d.Pq2);
    dw.setDashArrow('Rq2a', d.Pq2[0], d.Pq2[10]);
    dw.setDashArrow('Rq2b', d.Pq2[10], d.Pq2[16]);
    dw.setLabel('lRq2a', [d.Pq2[0][0] + 2.6, (d.Pq2[0][1] + d.Pq2[10][1]) / 2]);
    dw.setLabel('lRq2b', [d.Pq2[10][0] + 2.6, (d.Pq2[10][1] + d.Pq2[16][1]) / 2]);
    dw.setDashLine('pparQ2a', [d.dq2.i1, ext(d.dq2.i1, d.dq2.o, 0.25)]);
    dw.setDashLine('pparQ2b', [d.dq2.i2, ext(d.dq2.i2, d.dq2.o, 0.25)]);
    dw.setStrokes('fanQ2', d.Pq2.map((p) => [d.dq2.o, p]));
    dw.setStrokes('chainQ2', pairs(d.chQ2));
    dw.setArrow('reacAq2', d.F, d.Aq2F);
    dw.setArrow('reacBq2', d.I, d.Bq2F);
    dw.setArrow('reacAq2l', d.Pq2[16], d.dq2.o);
    dw.setArrow('reacBq2l', d.dq2.o, d.Pq2[0]);
    dw.setLabel('lAq2', V.add(d.Aq2F, [-1.6, 1.3]));
    dw.setLabel('lBq2', V.add(d.Bq2F, [1.6, 1.3]));

    // point load Q
    dw.setDashLine('qline', [[d.xq, RAIL_B], [d.xq, RAIL_T]]);
    dw.setArrow('loadQ', [d.xq, QRAIL[0]], [d.xq, QRAIL[1]]);
    dw.setLabel('lQ', [d.xq + 1.9, (QRAIL[0] + QRAIL[1]) / 2]);
    dw.setArrow('qmini', d.Q6, d.R6);
    dw.setLabel('lQm', [d.Q6[0] + 2, (d.Q6[1] + d.R6[1]) / 2]);
    dw.setDashLine('rail', [d.U6, d.E, d.V6]);
    dw.setDashLine('qaloneF', [d.F, d.S6, d.I]);
    dw.setDashLine('qaloneP1', [d.R6, ext(d.R6, d.T6, 0.25)]);
    dw.setDashLine('qaloneP2', [d.Q6, ext(d.Q6, d.T6, 0.25)]);
    dw.setLabel('lS6', V.add(d.S6, [0.4, -1.8]));

    // full load line with Q
    dw.setSeg('llQ', d.PQ[0], d.PQ[15]);
    ticks('ltQ', d.PQ);
    const qa = d.PQ[15 - s.pQ], qbp = d.PQ[16 - s.pQ];
    dw.setSeg('segQ', qa, qbp);
    dw.setLabel('lQl', [qa[0] + 2, (qa[1] + qbp[1]) / 2]);
    dw.setDashArrow('RgQ', d.PQ[0], d.PQ[15]);
    dw.setLabel('lRgQ', [d.PQ[0][0] + 3.2, (d.PQ[0][1] + d.PQ[15][1]) / 2 + 4]);

    // Q trial
    const up1 = [s.u1x, s.u1y], up2 = [s.u2x, s.u2y];
    const D18 = V.mid(d.PQ[9], d.PQ[10]);
    dw.setStrokes('qtfan1', [...d.PQ.slice(0, 10).map((p) => [up1, p]), [up1, D18]]);
    dw.setStrokes('qtfun1', pairs(d.dQ.t1.pts));
    dw.setStrokes('qtfan2', [...d.PQ.slice(10).map((p) => [up2, p]), [up2, D18]]);
    dw.setStrokes('qtfun2', pairs(d.dQ.t2.pts));
    const u1p = d.dQ.t1.pts, u2p = d.dQ.t2.pts;
    dw.setDashLine('qtcl1', [u1p[0], u1p[u1p.length - 1]]);
    dw.setDashLine('qtcl2', [u2p[0], u2p[u2p.length - 1]]);
    dw.setDashLine('qtdiv1', [up1, d.dQ.i1]);
    dw.setDashLine('qtdiv2', [up2, d.dQ.i2]);
    dw.setDashLine('resl1', [[d.cxLQ, RAIL_B], [d.cxLQ, RAIL_T]]);
    dw.setDashLine('resl2', [[d.cxRQ, RAIL_B], [d.cxRQ, RAIL_T]]);
    dw.setDashLine('pparQa', [d.dQ.i1, ext(d.dQ.i1, d.dQ.o, 0.25)]);
    dw.setDashLine('pparQb', [d.dQ.i2, ext(d.dQ.i2, d.dQ.o, 0.25)]);
    dw.setStrokes('fanQ', d.PQ.map((p) => [d.dQ.o, p]));

    // THE chain
    dw.setStrokes('chainQ', pairs(d.chQ));
    dw.setSeg('bstayQ', d.chQ[16], d.bkQ);
    dw.setArrow('reacAQ', d.F, d.AQF);
    dw.setArrow('reacBQ', d.I, d.BQF);
    dw.setArrow('reacAQl', d.PQ[15], d.dQ.o);
    dw.setArrow('reacBQl', d.dQ.o, d.PQ[0]);
    dw.setLabel('lAQ', V.add(d.AQF, [-1.6, 1.3]));
    dw.setLabel('lBQ', V.add(d.BQF, [1.6, 1.3]));
    dw.setLabel('lAQl', V.add(V.mid(d.PQ[15], d.dQ.o), [-1.4, -2.4]));
    dw.setLabel('lBQl', V.add(V.mid(d.dQ.o, d.PQ[0]), [-2.6, 2.4]));

    // pipes
    const sides = [...pairs(d.chQ), [d.chQ[16], d.bkQ]];
    const NsFull = [...d.Ns, d.Ns[15]];
    sides.forEach(([a, b], k) => {
      dw.setPoly(`if${k}`, V.rectPoints(a, b, s.sIF * NsFull[k] * s.sFD));
    });

    // points
    dw.setDisk('pt_F', d.F); dw.setDisk('pt_E', d.E); dw.setDisk('pt_I', d.I);
    dw.setDisk('pt_L1', d.Pg[0]);
    dw.setDisk('pt_R13', d.R13);
    dw.setDisk('pt_tp1', tp1); dw.setDisk('pt_tp2', tp2);
    dw.setDisk('pt_ts1', t1p[0]); dw.setDisk('pt_ts2', t2p[0]);
    dw.setDisk('pt_i1', d.dG.i1); dw.setDisk('pt_i2', d.dG.i2);
    dw.setDisk('pt_o', d.dG.o);
    dw.setDisk('pt_o1', d.dq1.o); dw.setDisk('pt_o2', d.dq2.o);
    dw.setDisk('pt_S6', d.S6); dw.setDisk('pt_T6', d.T6); dw.setDisk('pt_q6', d.Q6);
    dw.setDisk('pt_up1', up1); dw.setDisk('pt_up2', up2);
    dw.setDisk('pt_us1', u1p[0]); dw.setDisk('pt_us2', u2p[0]);
    dw.setDisk('pt_j1', d.dQ.i1); dw.setDisk('pt_j2', d.dQ.i2);
    dw.setDisk('pt_o3', d.dQ.o);

    const at = {
      F: V.add(d.F, [-2.4, -1.8]), E: V.add(d.E, [-2.6, 0.8]), I: V.add(d.I, [2.4, -1.4]),
      tp1: V.add(tp1, [2, 0.6]), tp2: V.add(tp2, [2, 0.4]),
      i1: V.add(d.dG.i1, [-2.4, 0.9]), i2: V.add(d.dG.i2, [-2.4, 0.9]),
      o: V.add(d.dG.o, [-1.2, 2]), o1: V.add(d.dq1.o, [-1.6, -2.2]),
      o2: V.add(d.dq2.o, [-1.8, -2]),
      up1: V.add(up1, [2.2, 0.4]), up2: V.add(up2, [2.2, 0.2]),
      j1: V.add(d.dQ.i1, [2.4, 0.9]), j2: V.add(d.dQ.i2, [2.4, 0.6]),
      o3: V.add(d.dQ.o, [-1.2, 2.1]),
    };
    for (const pn of Object.keys(letters)) dw.setLabel(`lbl_${pn}`, at[pn]);

    dw.setLabel('ro0', [180, 82.5]);
    dw.setText('ro0', `A = ${d.NA.toFixed(1)} kN`);
    dw.setLabel('ro1', [180, 79.4]);
    dw.setText('ro1', `B = ${d.NB.toFixed(1)} kN`);
    dw.setLabel('ro2', [180, 76.3]);
    dw.setText('ro2', `Q = ${(d.w * s.fQ / s.sFD).toFixed(1)} kN`);
  }

  // node inspector: 1 = F, 2..16 = hangers 1..15, 17 = I
  // (reaction sides use the SAME coordinates as the drawn reaction arrows)
  function nodePoly() {
    const j = Math.round(s.node);
    if (j <= 1) return [[d.PQ[15], d.dQ.o], [d.dQ.o, d.PQ[15]]];
    if (j >= 17) return [[d.dQ.o, d.PQ[0]], [d.PQ[0], d.dQ.o]];
    const k = j - 1;                       // hanger index 1..15
    const a = d.PQ[15 - k], b = d.PQ[16 - k];
    return [[a, b], [b, d.dQ.o], [d.dQ.o, a]];
  }
  function updateNode() {
    const j = Math.round(s.node);
    dw.selectDisk(j === 1 ? 'pt_F' : j === 17 ? 'pt_I' : null);
    const name = j <= 1 ? 'F' : j >= 17 ? 'I' : `hanger ${j - 1}`;
    const pos = j <= 1 ? d.chQ[0] : j >= 17 ? d.chQ[16] : d.chQ[j - 1];
    dw.setNodeInspector(pos, 6.4, `node ${name}`, nodePoly());
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
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 0.3, 0.8, 0.01, refresh);
  panel.slider(par, s, 'fq', 'factor q (live band = factor·g)', 1, 4, 0.05, refresh);
  panel.slider(par, s, 'fQ', 'factor Q (Q = factor·strip)', 1, 4, 0.05, refresh);
  panel.slider(par, s, 'pQ', 'position of Q (hanger)', 1, 15, 1, refresh);
  panel.slider(par, s, 'FDD', 'separate the four force diagrams', 0, 5, 0.1, refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.04, 0.001, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces (pipes)', refresh);
  panel.toggle(par, s, 'hideRF', 'hide reaction forces in force diagram', refresh);
  panel.toggle(par, s, 'ph', 'show the bridge (the applet\u2019s etching)', refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off, 1 = F, 2–16 = hangers, 17 = I)',
               0, 17, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS });
    panel.syncAll();
    refresh();
  });

  const hits = [
    ['F', () => d.F, 1, 99], ['E', () => d.E, 1, 99], ['I', () => d.I, 1, 99],
    ['L1', () => d.Pg[0], 2, 99],
    ['tp1', () => [s.t1x, s.t1y], 5, 12], ['tp2', () => [s.t2x, s.t2y], 6, 12],
    ['ts1', () => d.dG.t1.pts[0], 5, 12], ['ts2', () => d.dG.t2.pts[0], 6, 12],
    ['q6', () => d.Q6, 19, 21],
    ['Q', () => [d.xq, (QRAIL[0] + QRAIL[1]) / 2], 19, 99],
    ['up1', () => [s.u1x, s.u1y], 22, 27], ['up2', () => [s.u2x, s.u2y], 23, 27],
    ['us1', () => d.dQ.t1.pts[0], 22, 27], ['us2', () => d.dQ.t2.pts[0], 23, 27],
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
      const cl = (v, a, b) => Math.max(a, Math.min(b, v));
      if (name === 'F') s.fy = cl(wy, s.gy + 5, 34);
      else if (name === 'E') s.ey = cl(wy, s.gy + 1.6, 30);
      else if (name === 'I') s.iy = cl(wy, s.gy + 10, 52);
      else if (name === 'L1') { s.lx = cl(wx, 120, 175); s.ly = cl(wy, 55, 86); }
      else if (name === 'tp1') { s.t1x = wx; s.t1y = wy; }
      else if (name === 'tp2') { s.t2x = wx; s.t2y = wy; }
      else if (name === 'ts1') s.ts1 = cl(wy, 40, 58);
      else if (name === 'ts2') s.ts2 = cl(wy, 36, 56);
      else if (name === 'q6') { s.q6x = wx; s.q6y = wy; }
      else if (name === 'Q') {
        s.pQ = cl(Math.round((wx - SPAN / 30) / (SPAN / 15)) + 1, 1, 15);
        panel.syncAll();
      } else if (name === 'up1') { s.u1x = wx; s.u1y = wy; }
      else if (name === 'up2') { s.u2x = wx; s.u2y = wy; }
      else if (name === 'us1') s.us1 = cl(wy, 56, 82);
      else if (name === 'us2') s.us2 = cl(wy, 56, 82);
      refresh();
    },
  );

  // click a node of the final chain to inspect it
  const nodeIdx = [];
  for (let j = 1; j <= 17; j++) nodeIdx.push(j);
  dw.nodeSelect(
    nodeIdx.map((j) => ({ at: () => (j <= 1 ? d.chQ[0] : j >= 17 ? d.chQ[16] : d.chQ[j - 1]) })),
    (i) => {
      s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
      panel.syncAll();
      refresh();
    },
  );

  refresh();
  return player;
}
