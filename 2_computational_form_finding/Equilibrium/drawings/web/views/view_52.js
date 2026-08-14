/**
 * Drawing view/52 "Freeform Truss"
 * (https://block.arch.ethz.ch/eq/drawing/view/52) as a step-by-step
 * construction. The applet has no step slider -- the staging follows the
 * canonical sequence and the construction's own logic:
 *   the TOP chord is FREEFORM (nodes = parabola*(c(x)-5) + sine*(f(x)-5),
 *   two sliders blend a parabola with a sine wave); the bottom tie is then
 *   derived so that EVERY tie member carries the SAME force: all tie forces
 *   are rays of one CIRCLE around the division point i of the load line
 *   (radius = reaction + tolerance). Each top-chord force runs from its
 *   load-line point to the circle; the web forces are the chords between
 *   consecutive circle points; the tie is drawn parallel to the rays and
 *   closes exactly on the right support.
 * Regression vs the LIVE applet: 44 points to ~4e-13 in five states
 * (default, pure parabola, 50/50 mix, pure sine, dragged load line).
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 52 — Freeform Truss',
  subtitle: 'any top chord + a constant-force tie from one circle',
  about: 'A truss whose top chord is freeform — two sliders blend a parabola with a sine wave into any shape you like. The bottom tie is then constructed so that every one of its members carries the SAME force: all tie forces are rays of a single circle drawn around the division point of the load line. Whatever shape you choose, the tie re-forms itself and closes exactly on the far support.',
  frame: [[3.512, -4.481], [22.962, 5.481]],
};

const RESOLVE = 11;
const H3 = [4, 0], I3 = [14, 0];
const XS = [4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5, 12.5, 13.5];
const DECK_Y = 3;
const GUIDE_Y = [4.736727746699813, -3.939387314739413];
const SFD = 0.6;          // scaleForceDiagram (fixed in the applet)
const TOL = 0.2;          // tolerance (fixed)

const DEFAULTS = {
  par: 0.2, sine: 0.7,    // the two shape sliders [0, 1]
  d2x: 19, d2y: 4,        // D_2, top of the load line (draggable)
  offR: 0.4,              // offsetReactionForces [0, 1]
  sLS: 0.85,              // scaleLoadSymbol [0.1, 5]
  sIF: 0.03,              // scale internal forces (applet 0..0.08)
  o1: true, n4: true, node: 0,
};

// members: [form P, form Q, force tail, force tip] (applet internalForce order)
// nodes: T0..T9 top chord, B0..B9 tie, H3/I3 supports;
// forces: L0..L10 load line, C0..C10 circle points, K2 = L5 division
const MEM = {
  1: ['T0', 'H3', 'C0', 'L0'], 2: ['T0', 'T1', 'L1', 'C1'],
  3: ['T2', 'T1', 'C2', 'L2'], 4: ['T2', 'T3', 'L3', 'C3'],
  5: ['T4', 'T3', 'C4', 'L4'], 6: ['T5', 'T4', 'C5', 'L5'],
  7: ['T6', 'T5', 'C6', 'L6'], 8: ['T7', 'T6', 'C7', 'L7'],
  9: ['T8', 'T7', 'C8', 'L8'], 10: ['T9', 'T8', 'C9', 'L9'],
  11: ['T9', 'I3', 'L10', 'C10'],
  12: ['T0', 'B0', 'C1', 'C0'], 13: ['T1', 'B1', 'C2', 'C1'],
  14: ['T2', 'B2', 'C3', 'C2'], 15: ['T3', 'B3', 'C4', 'C3'],
  16: ['T4', 'B4', 'C5', 'C4'], 17: ['T5', 'B5', 'C6', 'C5'],
  18: ['T6', 'B6', 'C7', 'C6'], 19: ['T7', 'B7', 'C8', 'C7'],
  20: ['T8', 'B8', 'C9', 'C8'], 21: ['T9', 'B9', 'C10', 'C9'],
  22: ['B0', 'H3', 'K2', 'C0'], 23: ['B0', 'B1', 'C1', 'K2'],
  24: ['B2', 'B1', 'K2', 'C2'], 25: ['B3', 'B2', 'K2', 'C3'],
  26: ['B4', 'B3', 'K2', 'C4'], 27: ['B5', 'B4', 'K2', 'C5'],
  28: ['B6', 'B5', 'K2', 'C6'], 29: ['B7', 'B6', 'K2', 'C7'],
  30: ['B8', 'B7', 'K2', 'C8'], 31: ['B9', 'B8', 'K2', 'C9'],
  32: ['B9', 'I3', 'C10', 'K2'],
};
const INTRO = {};
for (let m = 1; m <= 11; m++) INTRO[m] = 4;
INTRO[12] = 8; INTRO[22] = 8;
for (let m = 13; m <= 21; m++) INTRO[m] = 9;
for (let m = 23; m <= 31; m++) INTRO[m] = 9;
INTRO[21] = 9; INTRO[32] = 10;
const FINTRO = { 1: 6, 2: 6, 12: 8, 22: 8, 32: 10 };
for (let m = 3; m <= 11; m++) FINTRO[m] = 7;
for (let m = 13; m <= 21; m++) FINTRO[m] = 9;
for (let m = 23; m <= 31; m++) FINTRO[m] = 9;

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The problem', d: 'left: a 10-panel span between the supports H₃ and I₃ — the dotted verticals are the loads\' lines of action' },
  { t: 'The loads — in both diagrams', d: 'left: F₁ … F₁₀, equal panel loads — right: laid off tip-to-tail down the load line' },
  { t: 'Reactions and the division point i', d: 'equal loads, symmetric span: i is the midpoint of the load line — A = i→D₂, B = Z₂→i on an offset line — left: A and B push up at the supports' },
  { t: 'The FREEFORM top chord', d: 'left: members 1…11 follow ANY curve — the two sliders blend a parabola with a sine wave; move them! The force diagram will now be built to fit this shape' },
  { t: 'The design rule: one circle', d: 'right: a circle around i, radius = reaction + tolerance — the tie will be built so every tie force is a RAY of this circle: constant force' },
  { t: 'Chords 1 and 2 meet the circle', d: 'right: through D₂ ∥ member 1 → K₃ on the circle; through E₂ ∥ member 2 → N₂ — every top-chord force ends on the circle' },
  { t: '… all chords onto the circle', d: 'right: the same parallel through every load-line point ∥ its chord: eleven circle points — left: the chords re-flash' },
  { t: 'First tie joint', d: 'right: ray 22 = K₃→i and web chord 12 = N₂→K₃ — left: their parallels through H₃ and through the first top joint meet at the tie node L₃' },
  { t: 'Walk the span', d: 'left: tie members 23…31 ∥ their rays, web members 13…21 ∥ the chords between circle points — right: every tie force has the SAME length: the circle\'s radius' },
  { t: 'The closing member 32', d: 'left: from the last tie node ∥ the last ray — it lands EXACTLY on the support I₃: the construction closes — right: ray 32 = J₃→i' },
  { t: 'Compression and tension', d: 'blue = compression (the freeform chord), pink = tension (the constant-force tie) — reshape with the sliders: the tie re-forms and still closes; click any joint to inspect it' },
];

// ---------------------------------------------------------------------------

function circLine(C, r, p, d) {
  const fx = p[0] - C[0], fy = p[1] - C[1];
  const a = d[0] * d[0] + d[1] * d[1];
  const b = 2 * (fx * d[0] + fy * d[1]);
  const c = fx * fx + fy * fy - r * r;
  const disc = Math.sqrt(Math.max(0, b * b - 4 * a * c));
  const t1 = (-b - disc) / (2 * a), t2 = (-b + disc) / (2 * a);
  const p1 = [p[0] + t1 * d[0], p[1] + t1 * d[1]];
  const p2 = [p[0] + t2 * d[0], p[1] + t2 * d[1]];
  return p1[0] < p2[0] ? p1 : p2;      // the applet picks the left root
}

function compute(s) {
  const fS = (x) => Math.sin((2 * (x - 4) * Math.PI) / 10) + 5;
  const fP = (x) => -0.08 * (x - 4) ** 2 + 0.8 * (x - 4) + 5;
  const pts = { H3, I3 };
  XS.forEach((x, i) => {
    pts[`T${i}`] = [x, s.par * (fP(x) - 5) + s.sine * (fS(x) - 5)];
  });
  const LL = [[s.d2x, s.d2y]];
  for (let i = 0; i < 10; i++) LL.push([s.d2x, LL[i][1] - SFD]);
  LL.forEach((p, i) => { pts[`L${i}`] = p; });
  const K2 = LL[5];
  pts.K2 = K2;
  const rad = 5 * SFD + TOL;
  const formT = ['H3', 'T0', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'I3'];
  for (let i = 0; i < 11; i++) {
    pts[`C${i}`] = circLine(K2, rad, LL[i], V.sub(pts[formT[i + 1]], pts[formT[i]]));
  }
  let prev = H3;
  for (let i = 0; i < 10; i++) {
    const w = V.sub(pts[`C${i + 1}`], pts[`C${i}`]);
    const r = V.sub(K2, pts[`C${i}`]);
    pts[`B${i}`] = V.intersect(pts[`T${i}`], w, prev, r) || prev;
    prev = pts[`B${i}`];
  }
  const col = {}, mag = {}, comp = {};
  for (const [m, [pn, qn, rn, sn]] of Object.entries(MEM)) {
    const fd = V.sub(pts[sn], pts[rn]);
    mag[m] = V.len(fd) / SFD;
    comp[m] = V.isCompression(V.ggbAngle(V.sub(pts[qn], pts[pn]), fd));
    col[m] = comp[m] ? PAL.blue : PAL.red;
  }
  // offset reactions
  const A6 = [s.d2x + s.offR, LL[0][1]];
  const B6 = [s.d2x + s.offR, K2[1]];
  const C6 = [s.d2x + s.offR, LL[10][1]];
  return { pts, LL, K2, rad, col, mag, comp, A6, B6, C6,
           magA: 5, magB: 5, magT: rad / SFD, magF: 1 };
}

/** Joint force sub-polygon (tip-to-tail walk; support side on the offset arrow). */
function nodeSides(d, s, joint) {
  const mem = [];
  for (const [m, [pn, qn]] of Object.entries(MEM)) {
    if (pn === joint || qn === joint) mem.push(+m);
  }
  const sides = [];
  let shift = null;
  const ti = joint[0] === 'T' ? +joint.slice(1) : -1;
  if (ti >= 0) sides.push([d.LL[ti], d.LL[ti + 1]]);
  else if (joint === 'H3') { sides.push([d.K2, d.LL[0]]); shift = [s.offR, 0]; }
  else if (joint === 'I3') { sides.push([d.LL[10], d.K2]); shift = [s.offR, 0]; }
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

  const W_BAR = 0.038;
  const ARR = { w: 0.06, headLen: 0.2, headW: 0.08 };

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // step 1: supports + action lines
  for (let i = 0; i < 10; i++) dw.dashLine(`loa${i}`, { intro: 1, dash: 0.09, flash: false });
  dw.disk('pt_H3', { intro: 1, r: 0.075 });
  dw.disk('pt_I3', { intro: 1, r: 0.075 });
  dw.label('lbl_H3', 'H₃', { cls: 'point', intro: 1, when: (st) => st.n4 });
  dw.label('lbl_I3', 'I₃', { cls: 'point', intro: 1, when: (st) => st.n4 });

  // step 2: loads + load line
  for (let i = 0; i < 10; i++) {
    dw.arrow(`ld${i}`, { intro: 2, ...ARR });
    dw.label(`lblLd${i}`, `F${['₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉', '₁₀'][i]}`, { intro: 2, color: PAL.green });
    dw.arrow(`fl${i}`, { intro: 2, ...ARR });
    dw.label(`lblFl${i}`, `F${['₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉', '₁₀'][i]}`, { intro: 2, color: PAL.green });
    dw.disk(`pt_ll${i}`, { intro: 2, r: 0.045, when: (st) => st.n4 });
  }
  dw.disk('pt_D2', { intro: 2, r: 0.085 });
  dw.label('lbl_D2', 'D₂', { cls: 'point', intro: 2, when: (st) => st.n4 });

  // step 3: reactions + division i
  dw.disk('pt_i', { intro: 3, r: 0.065 });
  dw.label('lbl_i', 'i', { cls: 'point', intro: 3 });
  dw.arrow('reacAf', { intro: 3, ...ARR });
  dw.arrow('reacBf', { intro: 3, ...ARR });
  dw.label('lblAf', '', { intro: 3, color: PAL.green });
  dw.label('lblBf', '', { intro: 3, color: PAL.green });
  dw.dashLine('conA', { intro: 3, dash: 0.07, color: PAL.black, flash: false });
  dw.dashLine('conI', { intro: 3, dash: 0.07, color: PAL.black, flash: false });
  dw.dashLine('conB', { intro: 3, dash: 0.07, color: PAL.black, flash: false });
  dw.arrow('reacA', { intro: 3, ...ARR });
  dw.arrow('reacB', { intro: 3, ...ARR });
  dw.label('lblA', 'A', { intro: 3, color: PAL.green });
  dw.label('lblB', 'B', { intro: 3, color: PAL.green });

  // members + forces
  const NUM = (m) => `${m}`;
  for (let m = 1; m <= 32; m++) {
    dw.seg(`m${m}`, { intro: INTRO[m], w: W_BAR,
      color: { pending: PAL.black, final: () => (k() > INTRO[m] || k() >= RESOLVE ? d.col[m] : PAL.black) } });
    dw.label(`mn${m}`, NUM(m), { cls: 'num', intro: INTRO[m],
      color: { final: () => d.col[m] } });
    dw.seg(`fs${m}`, { intro: FINTRO[m], w: W_BAR,
      color: { pending: PAL.black, final: () => d.col[m] } });
    dw.label(`fn${m}`, NUM(m), { cls: 'num', intro: FINTRO[m],
      color: { final: () => d.col[m] } });
    dw.link(`m${m}`, `fs${m}`, `mn${m}`, `fn${m}`);
  }
  for (let i = 0; i < 10; i++) {
    dw.disk(`pt_T${i}`, { intro: 4, r: 0.055, when: (st) => st.n4 });
    dw.disk(`pt_B${i}`, { intro: i === 0 ? 8 : 9, r: 0.055, when: (st) => st.n4 });
    dw.disk(`pt_C${i}`, { intro: i < 2 ? (i < 1 ? 6 : 6) : 7, r: 0.05, when: (st) => st.n4 });
  }
  dw.disk('pt_C10', { intro: 7, r: 0.05, when: (st) => st.n4 });

  // step 5: the constant-force circle
  dw.dashedCircle('circle', { intro: 5, dash: 0.25 });
  dw.label('lbl_circ', 'r = A + tol', { intro: 5, color: PAL.grey, flash: false });

  // highlights: chords re-flash when they are projected onto the circle
  for (let m = 1; m <= 2; m++) dw.highlight(`m${m}`, [6]);
  for (let m = 3; m <= 11; m++) dw.highlight(`m${m}`, [7]);

  // pipes + readouts
  for (let m = 1; m <= 32; m++) {
    dw.poly(`if${m}`, 4, { intro: RESOLVE, opacity: 1.0, z: -0.18, flash: false,
      color: { pending: PAL.grey, final: () => d.col[m] },
      when: (st) => st.o1 });
  }
  dw.label('roT', '', { intro: RESOLVE, flash: false, color: PAL.red });
  dw.label('roA', '', { intro: RESOLVE, flash: false, color: PAL.green });

  dw.nodeInspector(4, { when: (st) => st.node > 0, w: 1.5 * W_BAR,
                        headLen: 0.24, headW: 0.1, r: 0.07 });

  for (let i = 0; i < 10; i++) dw.link(`ld${i}`, `fl${i}`, `lblLd${i}`, `lblFl${i}`);
  dw.link('reacA', 'reacAf', 'lblA', 'lblAf');
  dw.link('reacB', 'reacBf', 'lblB', 'lblBf');
  dw.ghostable(...Array.from({ length: 32 }, (_, i) => `fs${i + 1}`),
               ...Array.from({ length: 10 }, (_, i) => `fl${i}`),
               'reacAf', 'reacBf');

  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [4.9, 5.32]);
    dw.setLabel('force_title', [14.9, 5.31]);
    dw.setLabel('force_sub', [15.05, 4.98]);
    dw.setText('force_sub', `1 unit :: ${(1 / SFD).toFixed(2)} kN`);

    const p = d.pts;
    for (let i = 0; i < 10; i++) {
      dw.setDashLine(`loa${i}`, [[XS[i], GUIDE_Y[0]], [XS[i], GUIDE_Y[1]]]);
      dw.setArrow(`ld${i}`, [XS[i], DECK_Y + s.sLS], [XS[i], DECK_Y]);
      dw.setLabel(`lblLd${i}`, [XS[i] + 0.24, DECK_Y + s.sLS * 0.55]);
      dw.setArrow(`fl${i}`, d.LL[i], d.LL[i + 1]);
      dw.setLabel(`lblFl${i}`, [s.d2x - 0.42, (d.LL[i][1] + d.LL[i + 1][1]) / 2]);
      dw.setDisk(`pt_ll${i}`, d.LL[i + 1]);
    }
    dw.setDisk('pt_H3', H3);
    dw.setDisk('pt_I3', I3);
    dw.setLabel('lbl_H3', V.add(H3, [-0.34, 0.22]));
    dw.setLabel('lbl_I3', V.add(I3, [0.34, 0.22]));
    dw.setDisk('pt_D2', d.LL[0]);
    dw.setLabel('lbl_D2', V.add(d.LL[0], [-0.38, 0.18]));

    dw.setDisk('pt_i', d.K2);
    dw.setLabel('lbl_i', V.add(d.K2, [-0.28, 0.2]));
    dw.setArrow('reacAf', d.B6, d.A6);
    dw.setArrow('reacBf', d.C6, d.B6);
    dw.setLabel('lblAf', [d.A6[0] + 0.34, (d.B6[1] + d.A6[1]) / 2]);
    dw.setLabel('lblBf', [d.C6[0] + 0.34, (d.C6[1] + d.B6[1]) / 2]);
    dw.setText('lblAf', `A = ${(d.magA).toFixed(1)} kN`);
    dw.setText('lblBf', `B = ${(d.magB).toFixed(1)} kN`);
    dw.setDashLine('conA', [d.LL[0], d.A6]);
    dw.setDashLine('conI', [d.K2, d.B6]);
    dw.setDashLine('conB', [d.LL[10], d.C6]);
    dw.setArrow('reacA', [H3[0], -0.5 - s.sLS], [H3[0], -0.5]);
    dw.setArrow('reacB', [I3[0], -0.5 - s.sLS], [I3[0], -0.5]);
    dw.setLabel('lblA', [H3[0] - 0.3, -0.5 - s.sLS * 0.55]);
    dw.setLabel('lblB', [I3[0] + 0.3, -0.5 - s.sLS * 0.55]);

    dw.setDashedCircle('circle', d.K2, d.rad);
    dw.setLabel('lbl_circ', [d.K2[0] + d.rad * 0.72, d.K2[1] + d.rad * 0.78]);

    const fcent = [s.d2x - 2.2, d.K2[1]];
    for (const [m, [pn, qn, rn, sn]] of Object.entries(MEM)) {
      dw.setSeg(`m${m}`, p[pn], p[qn]);
      dw.setSeg(`fs${m}`, p[rn], p[sn]);
      const mm = +m;
      const mid = V.mid(p[pn], p[qn]);
      let off;
      if (mm <= 11) off = [0, 0.26];                     // top chord: above
      else if (mm <= 21) off = [0.2, 0.1];               // web: beside
      else off = [0, -0.28];                             // tie: below
      dw.setLabel(`mn${m}`, V.add(mid, off));
      // force numbers
      const a = p[rn], b = p[sn];
      let fpos;
      if (mm <= 11) {
        const e = a[0] > b[0] ? a : b, o = a[0] > b[0] ? b : a;
        fpos = V.add(V.add(e, V.mul(V.sub(o, e), 0.35)), [0, 0.22]);
      } else if (mm <= 21) {
        fpos = V.add(V.mid(a, b), V.mul(V.unit(V.sub(V.mid(a, b), d.K2)), 0.3));
      } else {
        const c = a[0] < b[0] ? a : b, o2 = a[0] < b[0] ? b : a;
        fpos = V.add(V.add(c, V.mul(V.sub(o2, c), 0.18)), [0, -0.2]);
      }
      dw.setLabel(`fn${m}`, fpos);
      dw.setPoly(`if${m}`, V.rectPoints(p[pn], p[qn], s.sIF * d.mag[m]));
    }
    for (let i = 0; i < 10; i++) {
      dw.setDisk(`pt_T${i}`, p[`T${i}`]);
      dw.setDisk(`pt_B${i}`, p[`B${i}`]);
      dw.setDisk(`pt_C${i}`, p[`C${i}`]);
    }
    dw.setDisk('pt_C10', p.C10);

    dw.setLabel('roT', [15.2, -3.6]);
    dw.setText('roT', `tie force 22…32 = ${d.magT.toFixed(2)} kN — constant`);
    dw.setLabel('roA', [15.2, -4.05]);
    dw.setText('roA', `ΣF = 10.0 kN, A = B = 5.0 kN`);
  }

  const JOINTS = ['H3',
    'T0', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9',
    'B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'I3'];
  const JT = (j) => (j === 'H3' ? 'support H₃' : j === 'I3' ? 'support I₃'
    : j[0] === 'T' ? `top joint ${+j.slice(1) + 1}` : `tie joint ${+j.slice(1) + 1}`);

  function updateNode() {
    const j = Math.max(0, Math.min(21, Math.round(s.node) - 1));
    const joint = JOINTS[j];
    dw.selectDisk(s.node > 0 ? `pt_${joint}` : null);
    const sides = s.node > 0 ? nodeSides(d, s, joint) : [];
    dw.setNodeInspector(d.pts[joint], 0.75, s.node > 0 ? JT(joint) : '', sides);
  }

  function refresh() {
    d = compute(s);
    update();
    updateNode();
    player.apply(d, s);
  }

  player = makePlayer(STEPS, refresh);

  const view = panel.section('View');
  panel.button(view, 'zoom fit', () => dw.zoomFit());

  const par = panel.section('Parameters');
  panel.slider(par, s, 'par', 'parabola', 0, 1, 0.05, refresh);
  panel.slider(par, s, 'sine', 'sine', 0, 1, 0.05, refresh);
  panel.slider(par, s, 'offR', 'offset reaction forces', 0, 1, 0.05, refresh);
  panel.slider(par, s, 'sLS', 'load symbol', 0.1, 2, 0.05, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.08, 0.005, refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'joint (0 = off; 1 = H₃, 2-11 top, 12-21 tie, 22 = I₃)',
               0, 22, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS });
    panel.syncAll();
    refresh();
  });

  dw.enableDrag(
    (wx, wy, tol) => {
      if (player.k < 2) return null;
      const dd = Math.hypot(d.LL[0][0] - wx, d.LL[0][1] - wy);
      return dd < tol ? 'D2' : null;
    },
    (name, wx, wy) => {
      s.d2x = Math.max(15.5, Math.min(21.5, wx));
      s.d2y = Math.max(3, Math.min(5.4, wy));
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
