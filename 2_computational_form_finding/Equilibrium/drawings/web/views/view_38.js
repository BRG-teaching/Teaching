/**
 * Drawing view/38 "Lenticular truss"
 * (https://block.arch.ethz.ch/eq/drawing/view/38) as a step-by-step
 * construction, following the applet's staging (mode 1, steps 0-8):
 *   1. loads G1..G5 + load line; 2. trial funicular -> resultant R;
 *   3. closing line -> division point i -> reactions; 4. choose the lens
 *   (drag P): members 1/16, the mirror P', the l1 = l2 / f1 = f1 symmetry
 *   check; 5-6. panel 2 chords + the half-load vertical (G1/2); 7. all
 *   remaining panels; 8. the diagonals (zero under uniform load).
 * The lens geometry is FORM-FOUND from the force diagram: all web points of
 * the Cremona lie on ONE vertical (constant horizontal force), at the
 * midpoints between the division point i and the load points -- that is what
 * makes every diagonal force vanish and every vertical carry half its load.
 * factorQ/positionQ add an extra load Q on one panel point: the geometry
 * (dead-load based) stays, the diagonals wake up.
 * Regression vs the LIVE applet: 30 points to ~3e-14 in three states
 * (default, Q on panel 2, P dragged).
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 38 — Lenticular Truss',
  subtitle: 'form-found lens: constant-force web, zero diagonals',
  about: 'A lenticular (lens-shaped) truss under equal loads at its five panel points. The lens is form-found from the force diagram: every web point of the Cremona diagram lies on one vertical line, so every panel keeps the same horizontal chord force, each vertical carries exactly half its load, and every diagonal carries nothing. Drag P to flatten or deepen the lens, and add the extra load Q to see the diagonals wake up.',
  frame: [[-0.103, 0.309], [22.697, 11.71]],
};

const RESOLVE = 13;

const DEFAULTS = {
  l1x: 1.152645415182277, l1y: 8.178436842330889,   // L1: left end of the deck line
  py: 6.365969083895746,                            // P, the lens's first top node (draggable)
  llx: 16, lly: 10,                                 // LL0, top of the load line
  loadG: 1.2,                                       // loadG [0, 5] kN
  sFD: 1,                                           // scaleForceDiagram [0.5, 1.5]
  sLS: 1, dLS: 1.5,                                 // load symbol / distance (hidden sliders)
  offR: 0.75,                                       // offsetReactionForces [0, 1]
  pq: 1, fq: 0,                                     // positionQ [1..5], factorQ [0..3]
  px: 22.42139421655213, pyol: 6.492679329508333,   // trial pole
  fp0: 10.505178367579237,                          // trial start FP0 on the left action line
  sIF: 0.04,                                        // scale internal forces (applet 0..0.1)
  sc: false,                                        // show construction (the cyan form-finding fan)
  o1: true, n4: true, node: 0,
};

// members: [form P, form Q, force tail, force tip] -- the applet's exact
// internalForce argument orders (compression = ggbAngle(Q-P, S-R) near pi)
const MEM = {
  1: ['P', 'G1', 'S2', 'LL0'], 2: ['P', 'R', 'LL1', 'F2'],
  3: ['R', 'U', 'LL2', 'U2'], 4: ['U', 'O1', 'LL3', 'D3'],
  5: ['O1', 'R1', 'LL4', 'G3'], 6: ['R1', 'G2', 'LL5', 'H3'],
  7: ['P', 'Pp', 'F2', 'S2'], 8: ['R', 'Pp', 'G2f', 'F2'],
  9: ['R', 'Q', 'U2', 'G2f'], 10: ['U', 'Q', 'W2', 'U2'],
  11: ['U', 'Vf', 'B3', 'W2'], 12: ['U', 'P1', 'D3', 'B3'],
  13: ['O1', 'P1', 'F3', 'D3'], 14: ['O1', 'Q1', 'G3', 'F3'],
  15: ['R1', 'Q1', 'H3', 'G3'], 16: ['Pp', 'G1', 'R2', 'S2'],
  17: ['Pp', 'Q', 'G2f', 'R2'], 18: ['Vf', 'Q', 'R2', 'W2'],
  19: ['P1', 'Vf', 'R2', 'B3'], 20: ['P1', 'Q1', 'F3', 'R2'],
  21: ['Q1', 'G2', 'H3', 'R2'],
};
const DIAGS = [8, 10, 12, 14];
const INTRO = { 1: 7, 16: 7, 2: 9, 7: 9, 17: 10,
                3: 11, 4: 11, 5: 11, 6: 11, 9: 11, 11: 11, 13: 11, 15: 11,
                18: 11, 19: 11, 20: 11, 21: 11,
                8: 12, 10: 12, 12: 12, 14: 12 };
// joints in Cremona order with their members (for the inspector walk)
const JOINTS = ['G1', 'P', 'Pp', 'R', 'Q', 'U', 'Vf', 'O1', 'P1', 'R1', 'Q1', 'G2'];
const JLBL = { G1: 'G₁', P: 'P', Pp: 'P′', R: 'R', Q: 'Q', U: 'U', Vf: 'V',
               O1: 'O₁', P1: 'P₁', R1: 'R₁', Q1: 'Q₁', G2: 'G₂' };
const TOPJ = { P: 0, R: 1, U: 2, O1: 3, R1: 4 };   // top joint -> load index

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The problem', d: 'left: a span between two supports with five equal panel loads to carry — the dotted verticals are the loads\' lines of action; the truss will be SHAPED to fit the forces' },
  { t: 'The loads — in both diagrams', d: 'left: G₁ … G₅ above the panel points — right: laid off tip-to-tail down the load line' },
  { t: 'Trial pole o′', d: 'right: any pole o′ with rays to the load points — left: a trial funicular from F₀ across the action lines' },
  { t: 'The resultant R', d: 'left: the outer trial strings extended (dashed) meet on R\'s line of action at midspan — right: R = ΣG spans the whole load line; dashed green in BOTH diagrams' },
  { t: 'Closing line → division point i', d: 'left: dashed closing F₀–F₆ — right: the parallel through o′ cuts the load line at i' },
  { t: 'The reactions A and B', d: 'i splits the load line: A = i→LL₀ above, B = LL₅→i below, drawn on an offset line — left: A and B push up under the supports' },
  { t: 'Choose the lens: drag P', d: 'left: pick the first top node P on its rail; P′ mirrors it below the axis — chords 1 and 16 — right: through LL₀ ∥ 1 and through i ∥ 16 meet at S₂' },
  { t: 'Why symmetric? l₁ = l₂', d: 'right: S₂ lands exactly at MID-height of A — both end chords take the same share f₁ (marked twice) — left: that is the mirror condition l₁ = l₂' },
  { t: 'Panel 2: top chord + vertical', d: 'left: chord 2 runs to the next action line, the vertical 7 drops to P′ — right: force 2 through LL₁ meets the web vertical at F₂: member 7 carries exactly G₁/2' },
  { t: 'Panel 2: bottom chord', d: 'left: chord 17 from P′ — right: its force through i closes joint P′; the equal shares f₂ mark the chords\' vertical components' },
  { t: 'Repeat for every panel', d: 'left: chords 3–6 and 18–21 with verticals 9, 11, 13, 15 — right: the whole Cremona: every web point on ONE vertical (constant horizontal force), every vertical force = half its load' },
  { t: 'The diagonals carry nothing', d: 'left: diagonals 8, 10, 12, 14 complete the truss — right: their forces are POINTS (zero) — the lens was shaped so the uniform load needs no diagonals' },
  { t: 'Compression and tension', d: 'blue = compression (top chord + verticals), pink = tension (bottom chord) — drag P, then raise factorQ: the extra load Q wakes the diagonals up' },
];

const cache = {};
function inter(key, p1, d1, p2, d2) {
  cache[key] = V.intersect(p1, d1, p2, d2) || cache[key] || p1;
  return cache[key];
}

// ---------------------------------------------------------------------------
// the construction (mirrors applet_0/geogebra.xml, evaluated live)
// ---------------------------------------------------------------------------

function compute(s) {
  const L1 = [s.l1x, s.l1y];
  const L2 = [s.l1x + 8, s.l1y];
  const G1 = [L1[0], L1[1] - s.sLS - s.dLS];
  const G2 = [L2[0], L2[1] - s.sLS - s.dLS];
  const ax = G1[1];
  const xs = [1, 2, 3, 4, 5].map((i) => L1[0] + (8 * i) / 6);   // action lines

  // load lines: real (with Q at positionQ) and dead (LLB, geometry basis)
  const g = [1, 2, 3, 4, 5].map((i) => s.loadG * (s.pq === i ? 1 + s.fq : 1));
  const LL = [[s.llx, s.lly]];
  for (const gi of g) LL.push([s.llx, LL[LL.length - 1][1] - gi * s.sFD]);
  const LLB = [[s.llx, s.lly]];
  for (let i = 0; i < 5; i++) LLB.push([s.llx, LLB[i][1] - s.loadG * s.sFD]);

  // divisions: dead i (trial-invariant) and the real one for the reactions
  const H = V.mid(LL[0], LLB[5]);
  const Areal = g.reduce((a, gi, i) => a + gi * (6 - (i + 1)) / 6, 0) * s.sFD;
  const R2 = [s.llx, s.lly - Areal];

  // trial funicular (dead loads): pole + strings across the action lines
  const pole = [s.px, s.pyol];
  const fp = [[L1[0], s.fp0]];
  for (let k = 0; k < 5; k++) {
    fp.push(inter(`fp${k}`, fp[k], V.sub(pole, LLB[k]), [xs[k], 0], [0, 1]));
  }
  const F6 = inter('F6', fp[5], V.sub(pole, LLB[5]), [L2[0], 0], [0, 1]);
  const apex = inter('apex', fp[0], V.sub(pole, LLB[0]), F6, V.sub(pole, LLB[5]));

  // the lens, form-found from the dead force diagram
  const P = [xs[0], s.py];
  const Pp = [P[0], 2 * ax - P[1]];
  const I = inter('I', LL[0], V.sub(P, G1), H, V.sub(Pp, G1));
  const W = [1, 2, 3, 4, 5].map((i) => [I[0], (H[1] + LLB[i][1]) / 2]);
  const R = inter('R', P, V.sub(LLB[1], W[0]), [xs[1], 0], [0, 1]);
  const Q = inter('Q', Pp, V.sub(H, W[0]), [xs[1], 0], [0, 1]);
  const U = inter('U', R, V.sub(LLB[2], W[1]), [xs[2], 0], [0, 1]);
  const Vf = inter('Vf', Q, V.sub(H, W[1]), [xs[2], 0], [0, 1]);
  const O1 = inter('O1', U, V.sub(LLB[3], W[2]), [xs[3], 0], [0, 1]);
  const P1 = inter('P1', Vf, V.sub(H, W[2]), [xs[3], 0], [0, 1]);
  const R1 = inter('R1', O1, V.sub(LLB[4], W[3]), [xs[4], 0], [0, 1]);
  const Q1 = inter('Q1', P1, V.sub(H, W[3]), [xs[4], 0], [0, 1]);

  // the real Cremona (with Q): all web points on the constant-force vertical
  const S2 = inter('S2', LL[0], V.sub(P, G1), R2, V.sub(Pp, G1));
  const F2 = inter('F2', S2, [0, 1], LL[1], V.sub(R, P));
  const G2f = inter('G2f', R2, V.sub(Q, Pp), F2, V.sub(R, Pp));
  const U2 = inter('U2', LL[2], V.sub(U, R), G2f, [0, 1]);
  const W2 = inter('W2', R2, V.sub(Vf, Q), U2, V.sub(U, Q));
  const B3 = inter('B3', W2, [0, 1], R2, V.sub(P1, Vf));
  const D3 = inter('D3', LL[3], V.sub(O1, U), B3, V.sub(P1, U));
  const F3 = inter('F3', D3, [0, 1], R2, V.sub(Q1, P1));
  const G3 = inter('G3', LL[4], V.sub(R1, O1), F3, V.sub(Q1, O1));
  const H3 = inter('H3', G3, [0, 1], R2, V.sub(G2, Q1));

  const pts = { G1, G2, P, Pp, R, Q, U, Vf, O1, P1, R1, Q1,
                LL0: LL[0], LL1: LL[1], LL2: LL[2], LL3: LL[3], LL4: LL[4], LL5: LL[5],
                S2, F2, G2f, U2, W2, B3, D3, F3, G3, H3, R2, H, I };

  // colors + magnitudes
  const col = {}, mag = {}, comp = {};
  for (const [m, [pn, qn, rn, sn]] of Object.entries(MEM)) {
    const fd = V.sub(pts[sn], pts[rn]);
    mag[m] = V.len(fd) / s.sFD;
    if (mag[m] < 1e-9) { col[m] = PAL.black; comp[m] = false; continue; }
    comp[m] = V.isCompression(V.ggbAngle(V.sub(pts[qn], pts[pn]), fd));
    col[m] = comp[m] ? PAL.blue : PAL.red;
  }
  // offset reactions (visible arrows)
  const V1 = [s.llx + s.offR, LL[0][1]];
  const U1 = [s.llx + s.offR, R2[1]];
  const S1 = [s.llx + s.offR, LL[5][1]];
  const magA = Areal / s.sFD;
  const magB = (LL[0][1] - LL[5][1] - Areal) / s.sFD;

  return { L1, L2, G1, G2, ax, xs, g, LL, LLB, H, R2, pole, fp, F6, apex,
           P, Pp, I, W, pts, col, mag, comp, V1, U1, S1, magA, magB,
           magR: (LL[0][1] - LL[5][1]) / s.sFD };
}

/** Joint sub-polygon: load/reaction edge + member force segments tip-to-tail. */
function nodeSides(d, s, joint) {
  const mem = [];
  for (const [m, [pn, qn]] of Object.entries(MEM)) {
    if ((pn === joint || qn === joint) && d.mag[m] > 1e-9) mem.push(+m);
  }
  const sides = [];
  let shift = null;
  if (joint in TOPJ) {
    const i = TOPJ[joint];
    sides.push([d.LL[i], d.LL[i + 1]]);
  } else if (joint === 'G1') {
    sides.push([d.R2, d.LL[0]]);
    shift = [s.offR, 0];
  } else if (joint === 'G2') {
    sides.push([d.LL[5], d.R2]);
    shift = [s.offR, 0];
  }
  const used = new Set();
  if (!sides.length) {
    const m0 = Math.min(...mem);
    const [pn, qn, rn, sn] = MEM[m0];
    const other = pn === joint ? qn : pn;
    const u = V.unit(V.sub(d.pts[other], d.pts[joint]));
    const f = V.mul(u, d.comp[m0] ? -1 : 1);
    const sd = V.unit(V.sub(d.pts[sn], d.pts[rn]));
    sides.push(V.dot(f, sd) > 0 ? [d.pts[rn], d.pts[sn]] : [d.pts[sn], d.pts[rn]]);
    used.add(m0);
  }
  for (let n = 0; n < mem.length; n++) {
    const tip = sides[sides.length - 1][1];
    for (const m of mem) {
      if (used.has(m)) continue;
      const a = d.pts[MEM[m][2]], b = d.pts[MEM[m][3]];
      if (V.dist(a, tip) < 1e-9) { sides.push([a, b]); used.add(m); break; }
      if (V.dist(b, tip) < 1e-9) { sides.push([b, a]); used.add(m); break; }
    }
  }
  if (shift) sides[0] = sides[0].map((p) => V.add(p, shift));
  return sides;
}

// ---------------------------------------------------------------------------

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);
  let player = null;
  const k = () => (player ? player.k : 0);

  const W_BAR = 0.045, W_TRIAL = 0.025;
  const ARR = { w: 0.07, headLen: 0.24, headW: 0.095 };
  const CYAN = 0x00b8cc;

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // ---- step 1: supports + guides ------------------------------------------
  dw.dashLine('guideL', { intro: 1, dash: 0.1, flash: false });
  dw.dashLine('guideR', { intro: 1, dash: 0.1, flash: false });
  for (let i = 0; i < 5; i++) dw.dashLine(`loa${i}`, { intro: 1, dash: 0.1, flash: false });
  dw.dashLine('railP', { intro: 1, dash: 0.16, color: PAL.black, flash: false });
  dw.disk('pt_G1', { intro: 1, r: 0.08 });
  dw.disk('pt_G2', { intro: 1, r: 0.08 });
  dw.label('lbl_G1', 'G₁', { cls: 'point', intro: 1, when: (st) => st.n4 });
  dw.label('lbl_G2', 'G₂', { cls: 'point', intro: 1, when: (st) => st.n4 });

  // ---- step 2: loads + load line ------------------------------------------
  for (let i = 0; i < 5; i++) {
    dw.arrow(`ld${i}`, { intro: 2, ...ARR });
    dw.label(`lblLd${i}`, `G${'₁₂₃₄₅'[i]}`, { intro: 2, color: PAL.green });
    dw.arrow(`fl${i}`, { intro: 2, ...ARR,
      color: { final: () => (s.fq > 0 && s.pq === i + 1 ? PAL.orange : PAL.green) } });
    dw.label(`lblFl${i}`, '', { intro: 2,
      color: { final: () => (s.fq > 0 && s.pq === i + 1 ? PAL.orange : PAL.green) } });
  }
  dw.arrow('qArrow', { intro: 2, ...ARR, color: PAL.orange, when: (st) => st.fq > 0 });
  dw.label('lblQ', 'Q', { intro: 2, color: PAL.orange, when: (st) => st.fq > 0 });
  dw.disk('pt_LL0', { intro: 2, r: 0.08 });
  dw.label('lbl_LL0', 'LL₀', { cls: 'point', intro: 2, when: (st) => st.n4 });
  for (let i = 1; i <= 5; i++) {
    dw.disk(`pt_LL${i}`, { intro: 2, r: 0.05, when: (st) => st.n4 });
  }

  // ---- steps 3-6: trial -> R -> i -> reactions ----------------------------
  for (let i = 0; i < 6; i++) dw.seg(`tray${i}`, { intro: 3, outro: 7, w: W_TRIAL, color: PAL.grey });
  for (let i = 0; i < 6; i++) dw.seg(`tstr${i}`, { intro: 3, outro: 7, w: 0.038, color: PAL.grey });
  dw.disk('pt_pole', { intro: 3, outro: 7, r: 0.09 });
  dw.label('lbl_pole', 'o′', { cls: 'point', intro: 3, outro: 7 });
  dw.disk('pt_FP0', { intro: 3, outro: 7, r: 0.09 });
  dw.label('lbl_FP0', 'F₀', { cls: 'point', intro: 3, outro: 7 });
  dw.disk('pt_F6', { intro: 3, outro: 7, r: 0.06 });
  dw.label('lbl_F6', 'F₆', { cls: 'point', intro: 3, outro: 7 });
  for (let i = 1; i <= 5; i++) dw.disk(`pt_fp${i}`, { intro: 3, outro: 7, r: 0.05, when: (st) => st.n4 });

  dw.dashLine('touter0', { intro: 4, outro: 7, dash: 0.12, color: PAL.grey });
  dw.dashLine('touter1', { intro: 4, outro: 7, dash: 0.12, color: PAL.grey });
  dw.disk('pt_apex', { intro: 4, outro: 7, r: 0.06 });
  dw.dashArrow('rForm', { intro: 4, outro: 7, ...ARR, w: 0.08, dash: 0.22 });
  dw.label('lbl_rForm', 'R', { intro: 4, outro: 7, color: PAL.green });
  dw.dashArrow('rLine', { intro: 4, outro: 6, ...ARR, w: 0.08, dash: 0.22 });
  dw.label('lbl_rLine', 'R', { intro: 4, outro: 6, color: PAL.green });

  dw.dashLine('tclose', { intro: 5, outro: 7, dash: 0.15 });
  dw.dashLine('tpar', { intro: 5, outro: 7, dash: 0.15 });
  dw.disk('pt_i', { intro: 5, r: 0.07 });
  dw.label('lbl_i', 'i', { cls: 'point', intro: 5 });

  dw.arrow('reacAf', { intro: 6, ...ARR });
  dw.arrow('reacBf', { intro: 6, ...ARR });
  dw.label('lblAf', '', { intro: 6, color: PAL.green });
  dw.label('lblBf', '', { intro: 6, color: PAL.green });
  dw.dashLine('conA', { intro: 6, dash: 0.08, color: PAL.black, flash: false });
  dw.dashLine('conB', { intro: 6, dash: 0.08, color: PAL.black, flash: false });
  dw.dashLine('conM', { intro: 6, dash: 0.08, color: PAL.black, flash: false });
  dw.arrow('reacA', { intro: 6, ...ARR });
  dw.arrow('reacB', { intro: 6, ...ARR });
  dw.label('lblA', 'A', { intro: 6, color: PAL.green });
  dw.label('lblB', 'B', { intro: 6, color: PAL.green });

  // ---- step 7: axis + P/P' + members --------------------------------------
  dw.dashLine('axis', { intro: 7, dash: 0.3, flash: false });
  dw.disk('pt_P', { intro: 7, r: 0.095 });
  dw.disk('pt_Pp', { intro: 7, r: 0.07 });
  const jointNames = { P: 7, Pp: 7, R: 9, Q: 10, U: 11, Vf: 11, O1: 11, P1: 11, R1: 11, Q1: 11 };
  for (const [j, intro] of Object.entries(jointNames)) {
    if (j !== 'P' && j !== 'Pp') dw.disk(`pt_${j}`, { intro, r: 0.06, when: (st) => st.n4 });
    dw.label(`lbl_${j}`, JLBL[j], { cls: 'point', intro, when: (st) => st.n4 });
  }
  const memberColor = (m) => ({
    pending: PAL.black,
    final: () => (k() >= RESOLVE || k() > INTRO[m] ? d.col[m] : PAL.black),
  });
  for (let m = 1; m <= 21; m++) {
    dw.seg(`m${m}`, { intro: INTRO[m], w: W_BAR, color: memberColor(m) });
    dw.label(`mn${m}`, `${m}`, { cls: 'num', intro: INTRO[m],
      when: (st) => !DIAGS.includes(m) || st.fq > 0,
      color: { final: () => d.col[m] } });
    dw.seg(`fs${m}`, { intro: INTRO[m], w: W_BAR,
      when: () => d.mag[m] > 1e-9,
      color: { pending: PAL.black, final: () => d.col[m] } });
    dw.label(`fn${m}`, `${m}`, { cls: 'num', intro: INTRO[m],
      when: () => d.mag[m] > 1e-9,
      color: { final: () => d.col[m] } });
    dw.link(`m${m}`, `fs${m}`, `mn${m}`, `fn${m}`);
  }
  dw.disk('pt_S2', { intro: 7, r: 0.06, when: (st) => st.n4 });
  dw.label('lbl_S2', 'S₂', { cls: 'point', intro: 7, when: (st) => st.n4 });

  // ---- step 8: the symmetry check (l1 = l2, f1 = f1) ----------------------
  const DIM = { w: 0.02, color: PAL.grey, flash: false };
  dw.dashLine('dimc0', { intro: 8, outro: 11, dash: 0.08, flash: false });
  dw.dashLine('dimc1', { intro: 8, outro: 11, dash: 0.08, flash: false });
  dw.dashLine('dimc2', { intro: 8, outro: 11, dash: 0.08, flash: false });
  dw.seg('dimL1', { intro: 8, outro: 11, ...DIM });
  dw.seg('dimL2', { intro: 8, outro: 11, ...DIM });
  dw.strokes('dimLt', 3, { intro: 8, outro: 11, w: 0.018, color: PAL.grey, flash: false });
  dw.label('lbl_l1', 'l₁', { intro: 8, outro: 11, color: PAL.grey });
  dw.label('lbl_l2', 'l₂', { intro: 8, outro: 11, color: PAL.grey });
  dw.dashLine('fc0', { intro: 8, outro: 9, dash: 0.08, flash: false });
  dw.dashLine('fc1', { intro: 8, outro: 9, dash: 0.08, flash: false });
  dw.dashLine('fc2', { intro: 8, outro: 9, dash: 0.08, flash: false });
  dw.seg('dimF1a', { intro: 8, outro: 9, ...DIM });
  dw.seg('dimF1b', { intro: 8, outro: 9, ...DIM });
  dw.strokes('dimFt', 3, { intro: 8, outro: 9, w: 0.018, color: PAL.grey, flash: false });
  dw.label('lbl_f1a', 'f₁', { intro: 8, outro: 9, color: PAL.grey });
  dw.label('lbl_f1b', 'f₁', { intro: 8, outro: 9, color: PAL.grey });
  dw.dashLine('midS2', { intro: 8, outro: 11, dash: 0.22, flash: false });

  // ---- steps 9-10: panel 2 + f2 marks + G1/2 ------------------------------
  dw.label('lbl_g12', 'G₁/2', { intro: 9, outro: RESOLVE, color: PAL.green });
  dw.dashLine('f2c0', { intro: 9, outro: 11, dash: 0.08, flash: false });
  dw.dashLine('f2c1', { intro: 9, outro: 11, dash: 0.22, flash: false });
  dw.dashLine('f2c2', { intro: 9, outro: 11, dash: 0.08, flash: false });
  dw.seg('dimF2a', { intro: 9, outro: 11, ...DIM });
  dw.seg('dimF2b', { intro: 9, outro: 11, ...DIM });
  dw.label('lbl_f2a', 'f₂', { intro: 9, outro: 11, color: PAL.grey });
  dw.label('lbl_f2b', 'f₂', { intro: 9, outro: 11, color: PAL.grey });

  // ---- construction fan (the applet's showConstruction cyan layer) --------
  const CY = { w: 0.022, color: CYAN, flash: false };
  for (let i = 0; i < 12; i++) dw.seg(`cy${i}`, { intro: 7, ...CY, when: (st) => st.sc });
  dw.seg('cyI', { intro: 7, w: 0.022, color: CYAN, flash: false, when: (st) => st.sc });
  for (const nm of ['I', 'M', 'T', 'D1', 'B1', 'Z']) {
    dw.disk(`pt_cy_${nm}`, { intro: 7, r: 0.05, edge: CYAN, when: (st) => st.sc });
  }
  dw.label('lbl_cyI', 'I', { cls: 'point', intro: 7, color: CYAN, when: (st) => st.sc });

  // ---- pipes + readouts ---------------------------------------------------
  for (let m = 1; m <= 21; m++) {
    dw.poly(`if${m}`, 4, { intro: RESOLVE, opacity: 0.45, flash: false,
      color: { pending: PAL.grey, final: () => d.col[m] },
      when: (st) => st.o1 });
  }
  dw.label('roA', '', { intro: RESOLVE, flash: false, color: PAL.green });
  dw.label('roB', '', { intro: RESOLVE, flash: false, color: PAL.green });

  dw.nodeInspector(6, { when: (st) => st.node > 0, w: 1.5 * W_BAR,
                        headLen: 0.28, headW: 0.11, r: 0.09 });

  for (let i = 0; i < 5; i++) dw.link(`ld${i}`, `fl${i}`, `lblLd${i}`, `lblFl${i}`);
  dw.link('reacA', 'reacAf', 'lblA', 'lblAf');
  dw.link('reacB', 'reacBf', 'lblB', 'lblBf');
  dw.link('rForm', 'rLine', 'lbl_rForm', 'lbl_rLine');
  for (let i = 0; i < 6; i++) dw.link(`tstr${i}`, `tray${i}`);
  dw.link('tclose', 'tpar');
  dw.ghostable(...Array.from({ length: 21 }, (_, i) => `fs${i + 1}`));

  // re-flash joints' members: G1's at 8, P's at 9, P''s at 10
  dw.highlight('m1', [8, 9]);
  dw.highlight('m16', [8, 10]);
  dw.highlight('mn1', [8, 9]);
  dw.highlight('mn16', [8, 10]);
  dw.highlight('fs1', [8]);
  dw.highlight('fs16', [8]);

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [1.6, 11.34]);
    dw.setLabel('force_title', [13.8, 11.34]);
    dw.setLabel('force_sub', [13.95, 10.97]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(2)} kN`);

    const p = d.pts;
    const yTop = 10.885, yBot = 0.599;                        // the applet's s1/s2 rails
    dw.setDashLine('guideL', [[d.L1[0], yTop], [d.L1[0], yBot]]);
    dw.setDashLine('guideR', [[d.L2[0], yTop], [d.L2[0], yBot]]);
    for (let i = 0; i < 5; i++) {
      dw.setDashLine(`loa${i}`, [[d.xs[i], yTop], [d.xs[i], yBot]]);
    }
    dw.setDashLine('railP', [[d.xs[0], d.ax + 0.2], [d.xs[0], d.ax + 2.5]]);
    dw.setDisk('pt_G1', d.G1);
    dw.setDisk('pt_G2', d.G2);
    dw.setLabel('lbl_G1', V.add(d.G1, [-0.38, 0.3]));
    dw.setLabel('lbl_G2', V.add(d.G2, [0.38, 0.3]));

    // loads: form arrows above the panel points, on the deck line L1-L2
    for (let i = 0; i < 5; i++) {
      const top = [d.xs[i], d.L1[1]];
      dw.setArrow(`ld${i}`, top, V.add(top, [0, -s.sLS]));
      dw.setLabel(`lblLd${i}`, V.add(top, [0.32, -s.sLS * 0.4]));
      dw.setArrow(`fl${i}`, d.LL[i], d.LL[i + 1]);
      dw.setLabel(`lblFl${i}`, [d.LL[i][0] - 0.55, (d.LL[i][1] + d.LL[i + 1][1]) / 2]);
      dw.setText(`lblFl${i}`, s.fq > 0 && s.pq === i + 1 ? `G${'₁₂₃₄₅'[i]}+Q` : `G${'₁₂₃₄₅'[i]}`);
      dw.setDisk(`pt_LL${i + 1}`, d.LL[i + 1]);
    }
    const qTop = [d.xs[s.pq - 1], d.L1[1] + s.sLS + 0.15];
    dw.setArrow('qArrow', qTop, V.add(qTop, [0, -s.sLS]));
    dw.setLabel('lblQ', V.add(qTop, [0.3, -s.sLS * 0.35]));
    dw.setDisk('pt_LL0', d.LL[0]);
    dw.setLabel('lbl_LL0', V.add(d.LL[0], [-0.42, 0.2]));

    // trial
    for (let i = 0; i < 6; i++) {
      dw.setSeg(`tray${i}`, d.LLB[i], d.pole);
      dw.setSeg(`tstr${i}`, i < 5 ? d.fp[i] : d.fp[5], i < 5 ? d.fp[i + 1] : d.F6);
    }
    dw.setDisk('pt_pole', d.pole);
    dw.setLabel('lbl_pole', V.add(d.pole, [0.3, 0.24]));
    dw.setDisk('pt_FP0', d.fp[0]);
    dw.setLabel('lbl_FP0', V.add(d.fp[0], [-0.4, 0.12]));
    dw.setDisk('pt_F6', d.F6);
    dw.setLabel('lbl_F6', V.add(d.F6, [0.36, -0.12]));
    for (let i = 1; i <= 5; i++) dw.setDisk(`pt_fp${i}`, d.fp[i]);
    dw.setDashLine('touter0', [d.fp[0], d.apex]);
    dw.setDashLine('touter1', [d.F6, d.apex]);
    dw.setDisk('pt_apex', d.apex);
    const rx = d.L1[0] + 4;
    dw.setDashArrow('rForm', [rx, 9.66], [rx, 9.66 - s.sLS]);
    dw.setLabel('lbl_rForm', [rx + 0.28, 9.66 - s.sLS * 0.5]);
    dw.setDashArrow('rLine', d.LL[0], d.LL[5]);
    dw.setLabel('lbl_rLine', [s.llx - 0.55, d.R2[1] + 0.8]);
    dw.setDashLine('tclose', [d.fp[0], d.F6]);
    dw.setDashLine('tpar', [d.pole, d.H]);
    dw.setDisk('pt_i', d.H);
    dw.setLabel('lbl_i', V.add(d.H, [0.24, 0.2]));

    // reactions
    dw.setArrow('reacAf', d.U1, d.V1);
    dw.setArrow('reacBf', d.S1, d.U1);
    dw.setLabel('lblAf', [d.V1[0] + 0.34, (d.U1[1] + d.V1[1]) / 2 + 0.72]);
    dw.setLabel('lblBf', [d.S1[0] + 0.34, (d.S1[1] + d.U1[1]) / 2 - 0.72]);
    dw.setText('lblAf', `A = ${d.magA.toFixed(2)} kN`);
    dw.setText('lblBf', `B = ${d.magB.toFixed(2)} kN`);
    dw.setDashLine('conA', [d.LL[0], d.V1]);
    dw.setDashLine('conB', [d.LL[5], d.S1]);
    dw.setDashLine('conM', [d.R2, d.U1]);
    const fA = [d.G1[0], d.G1[1] - s.dLS];
    const fB = [d.G2[0], d.G2[1] - s.dLS];
    dw.setArrow('reacA', V.add(fA, [0, -s.sLS]), fA);
    dw.setArrow('reacB', V.add(fB, [0, -s.sLS]), fB);
    dw.setLabel('lblA', V.add(fA, [-0.32, -s.sLS * 0.55]));
    dw.setLabel('lblB', V.add(fB, [0.32, -s.sLS * 0.55]));

    // lens + members
    dw.setDashLine('axis', [d.G1, d.G2]);
    dw.setDisk('pt_P', d.P);
    dw.setDisk('pt_Pp', d.Pp);
    for (const j of Object.keys(jointNames)) {
      if (j !== 'P' && j !== 'Pp') dw.setDisk(`pt_${j}`, p[j]);
      const top = j in TOPJ || j === 'P';
      dw.setLabel(`lbl_${j}`, V.add(p[j], top ? [-0.1, 0.3] : [-0.1, -0.3]));
    }
    dw.setDisk('pt_S2', p.S2);
    dw.setLabel('lbl_S2', V.add(p.S2, [-0.34, 0.12]));

    for (const [m, [pn, qn, rn, sn]] of Object.entries(MEM)) {
      dw.setSeg(`m${m}`, p[pn], p[qn]);
      dw.setSeg(`fs${m}`, p[rn], p[sn]);
      // form numbers: chords out from the axis, verticals left, diagonals beside
      const mid = V.mid(p[pn], p[qn]);
      const dir = V.sub(p[qn], p[pn]);
      let off;
      if (+m <= 6) off = [0, 0.26];
      else if (+m >= 16) off = [0, -0.28];
      else if (Math.abs(dir[0]) < 1e-9) off = [-0.22, 0];
      else off = [0.05, 0.28];
      dw.setLabel(`mn${m}`, V.add(mid, off));
      // force numbers: chords fan out from i / S2 -- label near the load-line
      // end (top chords, above) or near the web end (bottom chords, below)
      const a = p[rn], b = p[sn];
      let fpos;
      if (+m <= 6) {
        const e = a[0] > b[0] ? a : b;                     // load-line end
        const o = a[0] > b[0] ? b : a;
        fpos = V.add(V.add(e, V.mul(V.sub(o, e), 0.3)), [0, 0.26]);
      } else if (+m >= 16) {
        const e = a[0] < b[0] ? a : b;                     // web end
        const o = a[0] < b[0] ? b : a;
        fpos = V.add(V.add(e, V.mul(V.sub(o, e), 0.22)), [0, -0.26]);
      } else if (DIAGS.includes(+m)) fpos = V.add(V.mid(a, b), [-0.3, 0]);
      else fpos = V.add(V.mid(a, b), [-0.28, 0]);
      dw.setLabel(`fn${m}`, fpos);
      dw.setPoly(`if${m}`, V.rectPoints(p[pn], p[qn], s.sIF * d.mag[m]));
    }
    dw.setLabel('lbl_g12', V.add(V.mid(p.S2, p.F2), [0.42, 0]));

    // l1/l2 dimension at the left edge (the applet's x = 0.485 apparatus)
    const dx = d.L1[0] - 0.668;
    dw.setDashLine('dimc0', [p.P, [dx, p.P[1]]]);
    dw.setDashLine('dimc1', [[d.G1[0], d.ax], [dx, d.ax]]);
    dw.setDashLine('dimc2', [p.Pp, [dx, p.Pp[1]]]);
    dw.setSeg('dimL1', [dx, p.P[1]], [dx, d.ax]);
    dw.setSeg('dimL2', [dx, d.ax], [dx, p.Pp[1]]);
    dw.setStrokes('dimLt', [[[dx - 0.08, p.P[1]], [dx + 0.08, p.P[1]]],
                            [[dx - 0.08, d.ax], [dx + 0.08, d.ax]],
                            [[dx - 0.08, p.Pp[1]], [dx + 0.08, p.Pp[1]]]]);
    dw.setLabel('lbl_l1', [dx - 0.28, (p.P[1] + d.ax) / 2]);
    dw.setLabel('lbl_l2', [dx - 0.28, (d.ax + p.Pp[1]) / 2]);
    // f1 = f1 marks beside the load line
    const fx = s.llx + 2 * s.offR + 0.75;
    const wm = [s.llx, (d.LL[0][1] + d.R2[1]) / 2];           // W_1 midlevel
    dw.setDashLine('fc0', [d.LL[0], [fx, d.LL[0][1]]]);
    dw.setDashLine('fc1', [wm, [fx, wm[1]]]);
    dw.setDashLine('fc2', [d.R2, [fx, d.R2[1]]]);
    dw.setSeg('dimF1a', [fx, d.LL[0][1]], [fx, wm[1]]);
    dw.setSeg('dimF1b', [fx, wm[1]], [fx, d.R2[1]]);
    dw.setStrokes('dimFt', [[[fx - 0.08, d.LL[0][1]], [fx + 0.08, d.LL[0][1]]],
                            [[fx - 0.08, wm[1]], [fx + 0.08, wm[1]]],
                            [[fx - 0.08, d.R2[1]], [fx + 0.08, d.R2[1]]]]);
    dw.setLabel('lbl_f1a', [fx + 0.3, (d.LL[0][1] + wm[1]) / 2]);
    dw.setLabel('lbl_f1b', [fx + 0.3, (wm[1] + d.R2[1]) / 2]);
    dw.setDashLine('midS2', [p.S2, wm]);
    // f2 marks
    const km = [s.llx, (d.R2[1] + d.LL[1][1]) / 2];           // K = mid(i, LL1)
    dw.setDashLine('f2c0', [d.LL[1], [fx, d.LL[1][1]]]);
    dw.setDashLine('f2c1', [p.F2, km]);
    dw.setDashLine('f2c2', [km, [fx, km[1]]]);
    dw.setSeg('dimF2a', [fx, d.LL[1][1]], [fx, km[1]]);
    dw.setSeg('dimF2b', [fx, km[1]], [fx, d.R2[1]]);
    dw.setLabel('lbl_f2a', [fx + 0.3, (d.LL[1][1] + km[1]) / 2]);
    dw.setLabel('lbl_f2b', [fx + 0.3, (km[1] + d.R2[1]) / 2 + 0.16]);

    // cyan construction fan: web levels tied back to i and the load points
    const segs = [
      [p.I, d.LL[0]], [p.I, d.H],
      [d.W[0], d.LLB[1]], [d.W[0], d.H],
      [d.W[1], d.LLB[2]], [d.W[1], d.H],
      [d.W[2], d.LLB[3]], [d.W[2], d.H],
      [d.W[3], d.LLB[4]], [d.W[3], d.H],
      [d.W[4], d.LLB[5]], [d.W[4], d.H],
    ];
    segs.forEach((sg, i2) => dw.setSeg(`cy${i2}`, sg[0], sg[1]));
    dw.setSeg('cyI', p.I, d.W[4]);
    const cyPts = { I: p.I, M: d.W[0], T: d.W[1], D1: d.W[2], B1: d.W[3], Z: d.W[4] };
    for (const [nm, pt] of Object.entries(cyPts)) dw.setDisk(`pt_cy_${nm}`, pt);
    dw.setLabel('lbl_cyI', V.add(p.I, [-0.28, 0.16]));

    dw.setLabel('roA', [20.6, 2.2]);
    dw.setText('roA', `ΣG = ${d.magR.toFixed(2)} kN`);
    dw.setLabel('roB', [20.6, 1.75]);
    dw.setText('roB', `A = ${d.magA.toFixed(2)}, B = ${d.magB.toFixed(2)} kN`);
  }

  function updateNode() {
    const j = Math.max(0, Math.min(11, Math.round(s.node) - 1));
    const joint = JOINTS[j];
    const diskName = { G1: 'pt_G1', G2: 'pt_G2', P: 'pt_P', Pp: 'pt_Pp' }[joint] ?? `pt_${joint}`;
    dw.selectDisk(s.node > 0 ? diskName : null);
    const sides = s.node > 0 ? nodeSides(d, s, joint) : [];
    dw.setNodeInspector(d.pts[joint], 0.9, s.node > 0 ? `joint ${JLBL[joint]}` : '', sides);
  }

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
  panel.slider(par, s, 'loadG', 'load G (kN)', 0.2, 5, 0.1, refresh);
  panel.slider(par, s, 'fq', 'factor Q (extra load)', 0, 3, 0.1, refresh);
  panel.slider(par, s, 'pq', 'position Q (panel point)', 1, 5, 1, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 0.5, 1.5, 0.05, refresh);
  panel.slider(par, s, 'offR', 'offset reaction forces', 0, 1, 0.05, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.1, 0.005, refresh);
  panel.toggle(par, s, 'sc', 'show construction (form-finding fan)', refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'joint (0 = off; 1 = G₁ … 12 = G₂)', 0, 12, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS });
    panel.syncAll();
    refresh();
  });

  const hits = [
    ['L1', () => d.L1, 1, 99],
    ['P', () => d.P, 7, 99],
    ['LL0', () => d.LL[0], 2, 99],
    ['pole', () => d.pole, 3, 7],
    ['FP0', () => d.fp[0], 3, 7],
  ];
  dw.enableDrag(
    (wx, wy, tol) => {
      let best = null;
      for (const [name, get, k0, k1] of hits) {
        if (player.k < k0 || player.k >= k1) continue;
        const pt = get();
        const dd = Math.hypot(pt[0] - wx, pt[1] - wy);
        if (dd < tol) { best = name; tol = dd; }
      }
      return best;
    },
    (name, wx, wy) => {
      if (name === 'L1') {
        s.l1x = Math.max(0.2, Math.min(3, wx));
        s.l1y = Math.max(6.5, Math.min(9.5, wy));
        s.py = Math.min(s.py, s.l1y - s.sLS - s.dLS + 2.49);
      } else if (name === 'P') {
        const ax = s.l1y - s.sLS - s.dLS;
        s.py = Math.max(ax + 0.2, Math.min(ax + 2.5, wy));
      } else if (name === 'LL0') {
        s.llx = Math.max(12.5, Math.min(19, wx));
        s.lly = Math.max(8.5, Math.min(11.3, wy));
      } else if (name === 'pole') { s.px = wx; s.pyol = wy; }
      else if (name === 'FP0') s.fp0 = Math.max(9, Math.min(11.3, wy));
      refresh();
    },
  );

  dw.nodeSelect(JOINTS.map((j) => ({ at: () => d.pts[j] })), (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
