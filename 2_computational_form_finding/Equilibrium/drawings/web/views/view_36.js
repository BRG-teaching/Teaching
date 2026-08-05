/**
 * Drawing view/36 "Single panel truss"
 * (https://block.arch.ethz.ch/eq/drawing/view/36) as a step-by-step
 * construction, following the APPLET's own pedagogy (text10):
 *   1. resultant - antiresultant: the load F at the apex C is balanced by an
 *      equal, opposite force F' on its line of action;
 *   2. split the antiresultant: a trial pole o' and a trial funicular between
 *      the lines of action through A and B give the division point i on the
 *      load line -- the two reactions PARALLEL to F;
 *   3. horizontal / vertical equilibrium: the roller at B can only act
 *      vertically -> B_V through O', and A carries A_V + A_H.
 * The members then close the force polygon: node C's triangle O-O'-V, the
 * bottom chord (member 1) first V-i (parallel reactions), finally V-W.
 *
 * Live port of view_36/applet_0/geogebra.xml; the full chain (O', V, trial
 * S/T, division point U='i', W, Z, reactions) is regression-checked against
 * the baked view_36_compas.py coordinates to ~5e-7.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 36 — Single Panel Truss',
  subtitle: 'antiresultant → parallel reactions → H/V equilibrium',
  about: 'A triangular single-panel truss: pin at A, roller at B, load F at the apex C. The antiresultant F′ on the load\'s line of action is split by a trial funicular into two reactions parallel to F through A and B; the roller then forces its reaction vertical — B_V acts through O′ and the pin takes A_V + A_H. The members close the force polygon: compression in the legs, tension in the bottom chord.',
  frame: [[-0.437236253770497, -1.4534310012073], [15.620186960342654, 6.575280605849275]],
};

const KC = [4, 3.4062434277991684];      // center of the apex constraint circle
const RAIL_X = [2, 6];                   // A and B slide on these verticals, y in [0, 2]
const CLIP_Y = [5.827774136182607, -0.7851550831669042];   // lines-of-action clip
const TH = [1.1377804035471917, 2.2345901561222053];       // load-direction arc (rad)
const RESOLVE = 12;

const DEFAULTS = {
  ay: 2, by: 2,                          // supports A, B on their rails
  cx: 3.6116573486293633, cy: 3.9960721808944455,          // apex C (inside circle K)
  th: 1.8924107762757815,                // load handle N angle on the arc around C
  ox: 10, oy: 5,                         // load line start O
  rx: 14.18210349695351, ry: 3.974215642909878,            // trial pole o'
  qT: 4.335,                             // trial start Q along the load's line of action
  F: 4.5,                                // F [1, 10] kN
  sFD: 1,                                // scaleForceDiagram [0.5, 2] units/kN
  off: 0.3,                              // offsetForceDiagram [0, 0.5]
  sIF: 0.05,
  node: 0,                               // node-equilibrium inspector (0 = off)
  o1: true,
  sc: false,                             // show constraints (rails, apex circle, arc)
  n4: true,
};

// every construction move happens on BOTH sides at once
const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The panel', d: 'left: three joints — supports A and B on their rails, the apex C above (drag them!)' },
  { t: 'The load — in both diagrams', d: 'left: the load F pushes on the apex C along its dashed line of action — right: F laid off on the load line O→O′' },
  { t: 'The antiresultant F′', d: 'equilibrium needs an equal and opposite force on the same line of action — left: F′ at C — right: F′ on a parallel offset line, for clarity' },
  { t: 'Trial pole o′', d: 'left: the reactions will act through A and B parallel to F (dashed lines of action) — right: a trial pole o′ with rays to O and O′' },
  { t: 'Trial funicular', d: 'left: from Q on the load\'s line of action, one string ∥ ray o′–O to A\'s line, one string ∥ ray o′–O′ to B\'s line' },
  { t: 'Closing → division point i', d: 'left: dashed closing S–T — right: the parallel through o′ cuts the load line at i' },
  { t: 'Reactions parallel to F', d: 'i splits F′ in two — right: A = i→O and B = O′→i on the offset line — left: the same pulls at the supports' },
  { t: 'Node C closes — members 2 and 3', d: 'right: through O ∥ A–C and through O′ ∥ C–B meet at V: the forces in the legs — left: the members 2 and 3' },
  { t: 'Member 1 — the bottom chord', d: 'left: the chord A–B — right: its force V–i closes the triangles at A and B with the parallel reactions' },
  { t: 'The roller at B', d: 'left: the roller can only push VERTICALLY — right: B_V runs from O′ straight down to W, level with i (∥ A–B); member 1 grows to V–W' },
  { t: 'Pin at A: A_V and A_H', d: 'right: the polygon closes over W→Z (A_V) and Z→O (A_H) — left: the same components at A' },
  { t: 'Compression and tension', d: 'the trial apparatus is gone — legs 2 and 3 resolve blue = compression, the chord 1 pink = tension; drag C, N, A, B or O' },
];

const cache = {};
function inter(key, p1, d1, p2, d2) {
  cache[key] = V.intersect(p1, d1, p2, d2) || cache[key] || p1;
  return cache[key];
}

/** Guide through p along u, clipped between the applet's two horizontals. */
function clipGuide(p, u) {
  if (Math.abs(u[1]) < 0.04) return [V.sub(p, V.mul(u, 8)), V.add(p, V.mul(u, 8))];
  const t1 = (CLIP_Y[0] - p[1]) / u[1];
  const t2 = (CLIP_Y[1] - p[1]) / u[1];
  return [V.add(p, V.mul(u, t1)), V.add(p, V.mul(u, t2))];
}

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const A = [RAIL_X[0], s.ay], B = [RAIL_X[1], s.by];
  const C = [s.cx, s.cy];
  const N = V.add(C, [Math.cos(s.th), Math.sin(s.th)]);         // load handle (sLS = 1)
  const dir = V.unit(V.sub(C, N));                              // load direction

  // force diagram: load line O -> O'
  const O = [s.ox, s.oy];
  const Op = V.add(O, V.mul(dir, s.F * s.sFD));

  // trial: pole o' with rays to O and O'; funicular from Q on the load's
  // line of action to the reaction lines of action through A and B
  const R = [s.rx, s.ry];
  const Q = V.add(C, V.mul(dir, s.qT));
  const S = inter('S', A, dir, Q, V.sub(R, O));
  const T = inter('T', B, dir, Q, V.sub(Op, R));
  // closing S-T; the parallel through o' cuts the load line at i
  const U = inter('U', R, V.sub(T, S), O, dir);

  // node C's force triangle: through O parallel to A-C, through O' parallel to C-B
  const Vp = inter('Vp', O, V.sub(C, A), Op, V.sub(B, C));

  // H/V equilibrium: W on the vertical through O', level with i (parallel to
  // the chord A-B); Z = vertical through O' x horizontal through O
  const W = inter('W', U, V.sub(A, B), Op, [0, 1]);
  const Z = [Op[0], O[1]];

  // offset copies (the applet's offsetForceDiagram apparatus)
  const offV = V.mul(V.perp(dir), s.off);
  const offO = V.add(O, offV), offOp = V.add(Op, offV), offU = V.add(U, offV);

  const col = (w) => (V.isCompression(w) ? PAL.blue : PAL.red);
  const c1 = col(V.ggbAngle(V.sub(A, B), V.sub(Vp, W)));
  const c2 = col(V.ggbAngle(V.sub(C, A), V.sub(Vp, O)));
  const c3 = col(V.ggbAngle(V.sub(B, C), V.sub(Vp, Op)));

  const fcent = V.mul(V.add(V.add(O, Op), Vp), 1 / 3);
  const Ns = [V.dist(Vp, W), V.dist(Vp, O), V.dist(Vp, Op)].map((l) => l / s.sFD);
  const Rs = [V.dist(Z, O), V.dist(W, Z), V.dist(Op, W)].map((l) => l / s.sFD);  // A_H, A_V, B_V

  return { A, B, C, N, dir, O, Op, R, Q, S, T, U, Vp, W, Z,
           offO, offOp, offU, c1, c2, c3, fcent, Ns, Rs };
}

/** Arrow drawn beside (not on) a force segment, pushed away from `cent`. */
function beside(a, b, cent, off = 0.22) {
  const u = V.unit(V.sub(b, a));
  const p = V.perp(u);
  const sgn = V.dot(p, V.sub(V.mid(a, b), cent)) >= 0 ? 1 : -1;
  const o = V.mul(p, off * sgn);
  return [V.add(a, o), V.add(b, o)];
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);

  const memberColor = (key) => ({ pending: PAL.black, final: (dd) => dd[key] });
  const W_BAR = 0.06, W_RAY = 0.03, W_STR = 0.045;
  const ARROW = { w: 0.075, headLen: 0.26, headW: 0.1 };
  const cks = ['c1', 'c2', 'c3'];

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // step 1: the three joints (+ constraint rails / circles via toggle)
  dw.dashLine('railA', { intro: 1, dash: 0.15, when: (st) => st.sc });
  dw.dashLine('railB', { intro: 1, dash: 0.15, when: (st) => st.sc });
  dw.dashedCircle('circK', { intro: 1, dash: 0.18, when: (st) => st.sc });
  dw.dashLine('arcN', { intro: 2, dash: 0.12, when: (st) => st.sc });

  // step 2: the load at C + its line of action || F on the load line
  dw.dashLine('loa', { intro: 2, dash: 0.15 });
  dw.arrow('loadF', { intro: 2, ...ARROW });
  dw.arrow('edgeF', { intro: 2, ...ARROW });
  dw.label('lblFf', 'F', { intro: 2, color: PAL.green });
  dw.label('lblF', 'F', { intro: 2, color: PAL.green });

  // step 3: the antiresultant F' (form) + offset copy (force)
  dw.arrow('fpF', { intro: 3, outro: 7, ...ARROW });
  dw.arrow('fpFoff', { intro: 3, outro: 7, ...ARROW });
  dw.label('lblFpf', 'F′', { intro: 3, outro: 7, color: PAL.green });
  dw.label('lblFp', 'F′', { intro: 3, outro: 7, color: PAL.green });
  dw.dashLine('offL1', { intro: 3, outro: 10, dash: 0.12 });
  dw.dashLine('offL2', { intro: 3, outro: 10, dash: 0.12 });

  // steps 4-6: reaction lines of action + trial pole/rays/strings/closing
  dw.dashLine('loaA', { intro: 4, outro: 10, dash: 0.15 });
  dw.dashLine('loaB', { intro: 4, outro: 10, dash: 0.15 });
  dw.seg('tray0', { intro: 4, outro: 8, w: W_RAY, color: PAL.grey });
  dw.seg('tray1', { intro: 4, outro: 8, w: W_RAY, color: PAL.grey });
  dw.seg('tstr0', { intro: 5, outro: 8, w: W_STR, color: PAL.grey });
  dw.seg('tstr1', { intro: 5, outro: 8, w: W_STR, color: PAL.grey });
  dw.highlight('tray0', [5]);
  dw.highlight('tray1', [5]);
  dw.dashLine('tclose', { intro: 6, outro: 8, dash: 0.15 });
  dw.dashLine('tpar', { intro: 6, outro: 8, dash: 0.15 });

  // step 7: the reactions parallel to F (offset line + at the supports)
  dw.arrow('reacAoff', { intro: 7, outro: 10, ...ARROW });
  dw.arrow('reacBoff', { intro: 7, outro: 10, ...ARROW });
  dw.arrow('reacApar', { intro: 7, outro: 10, ...ARROW });
  dw.arrow('reacBpar', { intro: 7, outro: 10, ...ARROW });
  dw.label('lblRAo', 'A', { intro: 7, outro: 10, color: PAL.green });
  dw.label('lblRBo', 'B', { intro: 7, outro: 10, color: PAL.green });
  dw.label('lblRAp', 'A', { intro: 7, outro: 10, color: PAL.green });
  dw.label('lblRBp', 'B', { intro: 7, outro: 10, color: PAL.green });
  dw.dashLine('offL3', { intro: 6, outro: 10, dash: 0.12 });

  // steps 8-10: the members with their force segments
  dw.seg('m2', { intro: 8, w: W_BAR, color: memberColor('c2') });
  dw.seg('m3', { intro: 8, w: W_BAR, color: memberColor('c3') });
  dw.seg('fr2', { intro: 8, w: W_BAR, color: memberColor('c2') });
  dw.seg('fr3', { intro: 8, w: W_BAR, color: memberColor('c3') });
  dw.seg('m1', { intro: 9, w: W_BAR, color: memberColor('c1') });
  dw.seg('f1u', { intro: 9, outro: 10, w: W_BAR, color: memberColor('c1') });
  dw.seg('f1w', { intro: 10, w: W_BAR, color: memberColor('c1') });
  for (let i = 0; i < 3; i++) {
    dw.label(`fn${i}`, `${i + 1}`, { cls: 'num', intro: 8 + (i === 0 ? 1 : 0),
              color: { final: (dd) => dd[cks[i]] } });
    dw.label(`sn${i}`, `${i + 1}`, { cls: 'num', intro: 8 + (i === 0 ? 1 : 0),
              color: { final: (dd) => dd[cks[i]] } });
  }

  // step 10: the roller at B + B_V; step 11: A_V + A_H (both sides)
  dw.circle('rolC', { intro: 10, color: PAL.green });
  dw.seg('rolG', { intro: 10, w: 0.028, color: PAL.green });
  dw.strokes('rolT', 5, { intro: 10, w: 0.022, color: PAL.green });
  dw.dashLine('guideUW', { intro: 10, outro: RESOLVE, dash: 0.12 });
  dw.arrow('cmpBVf', { intro: 10, ...ARROW });     // O' -> W
  dw.arrow('cmpBV', { intro: 10, ...ARROW });
  dw.label('lblBVf', 'B_V', { intro: 10, color: PAL.green });
  dw.label('lblBV', 'B_V', { intro: 10, color: PAL.green });
  dw.arrow('cmpAVf', { intro: 11, ...ARROW });     // W -> Z
  dw.arrow('cmpAHf', { intro: 11, ...ARROW });     // Z -> O
  dw.arrow('cmpAV', { intro: 11, ...ARROW });
  dw.arrow('cmpAH', { intro: 11, ...ARROW });
  dw.label('lblAVf', 'A_V', { intro: 11, color: PAL.green });
  dw.label('lblAHf', 'A_H', { intro: 11, color: PAL.green });

  // points
  const HANDLE = { r: 0.1 }, DERIVED = { r: 0.075 };
  const show = (st) => st.n4;
  dw.disk('pt_A', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_B', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_C', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_N', { intro: 2, ...HANDLE, when: show });
  dw.disk('pt_O', { intro: 2, ...HANDLE, when: show });
  dw.disk('pt_Op', { intro: 2, ...DERIVED, when: show });
  dw.disk('pt_R', { intro: 4, outro: 8, ...HANDLE, when: show });
  dw.disk('pt_Q', { intro: 5, outro: 8, ...HANDLE, when: show });
  dw.disk('pt_S', { intro: 5, outro: 8, ...DERIVED, when: show });
  dw.disk('pt_T', { intro: 5, outro: 8, ...DERIVED, when: show });
  dw.disk('pt_U', { intro: 6, ...DERIVED, when: show });
  dw.disk('pt_V', { intro: 8, ...DERIVED, when: show });
  dw.disk('pt_W', { intro: 10, ...DERIVED, when: show });
  dw.disk('pt_Z', { intro: 11, ...DERIVED, when: show });

  const letters = {
    A: ['A', 1], B: ['B', 1], C: ['C', 1],
    R: ['o′', 4, 8], U: ['i', 6],
    Q: ['Q', 5, 8], S: ['S', 5, 8], T: ['T', 5, 8],
  };
  for (const [p, [text, intro, outro]] of Object.entries(letters)) {
    dw.label(`lbl_${p}`, text, { cls: 'point', intro, outro, when: show });
  }

  // readouts + internal-force pipes (on by default)
  for (let i = 0; i < 3; i++) {
    dw.label(`ro${i}`, '', { intro: RESOLVE, flash: false, color: { final: (dd) => dd[cks[i]] } });
    dw.label(`rr${i}`, '', { intro: RESOLVE, flash: false, color: PAL.green });
    dw.poly(`if${i}`, 4, {
      intro: RESOLVE, opacity: 0.45, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd[cks[i]] },
      when: (st) => st.o1,
    });
  }

  // node-equilibrium inspector: free-body star of the selected node enlarged
  // in an inset + the same forces tip-to-tail on the node's sub-polygon of
  // the force diagram (thick black arrows)
  dw.nodeInspector(4, { when: (st) => st.node > 0, w: 1.5 * W_BAR, headLen: 0.32, headW: 0.13, r: 0.11 });

  // dual pairs: hovering a member highlights its counterpart
  dw.link('m1', 'f1u', 'f1w', 'fn0', 'sn0');
  dw.link('m2', 'fr2', 'fn1', 'sn1');
  dw.link('m3', 'fr3', 'fn2', 'sn2');
  dw.link('loadF', 'edgeF', 'lblFf', 'lblF');
  dw.link('fpF', 'fpFoff', 'lblFpf', 'lblFp');
  dw.link('tstr0', 'tray0');
  dw.link('tstr1', 'tray1');
  dw.link('tclose', 'tpar');
  dw.link('reacApar', 'reacAoff', 'lblRAp', 'lblRAo');
  dw.link('reacBpar', 'reacBoff', 'lblRBp', 'lblRBo');
  dw.link('cmpBV', 'cmpBVf', 'lblBV', 'lblBVf');
  dw.link('cmpAV', 'cmpAVf', 'lblAVf');
  dw.link('cmpAH', 'cmpAHf', 'lblAHf');
  dw.ghostable('edgeF', 'fr2', 'fr3', 'f1w', 'cmpBVf', 'cmpAVf', 'cmpAHf');

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [2.2, 6.15]);
    dw.setLabel('force_title', [11, 6.15]);
    dw.setLabel('force_sub', [11, 5.78]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(2)} kN`);

    dw.setDashLine('railA', [[RAIL_X[0], 0], [RAIL_X[0], 2]]);
    dw.setDashLine('railB', [[RAIL_X[1], 0], [RAIL_X[1], 2]]);
    dw.setDashedCircle('circK', KC, 1);
    const arc = [];
    for (let i = 0; i <= 20; i++) {
      const t = TH[0] + (i / 20) * (TH[1] - TH[0]);
      arc.push(V.add(d.C, [Math.cos(t), Math.sin(t)]));
    }
    dw.setDashLine('arcN', arc);

    const pd = V.perp(d.dir);
    dw.setDashLine('loa', clipGuide(d.C, d.dir));
    dw.setArrow('loadF', d.N, d.C);
    dw.setLabel('lblFf', V.add(V.mid(d.N, d.C), V.mul(pd, 0.32)));
    dw.setArrow('edgeF', d.O, d.Op);
    dw.setLabel('lblF', V.add(V.mid(d.O, d.Op), V.mul(pd, -0.32)));

    dw.setArrow('fpF', V.add(d.C, d.dir), d.C);
    dw.setLabel('lblFpf', V.add(V.add(V.mid(d.C, V.add(d.C, d.dir)), V.mul(pd, -0.3)), [0, 0]));
    dw.setArrow('fpFoff', d.offOp, d.offO);
    dw.setLabel('lblFp', V.add(V.mid(d.offO, d.offOp), V.mul(pd, 0.34)));
    dw.setDashLine('offL1', [d.O, d.offO]);
    dw.setDashLine('offL2', [d.Op, d.offOp]);
    dw.setDashLine('offL3', [d.U, d.offU]);

    dw.setDashLine('loaA', clipGuide(d.A, d.dir));
    dw.setDashLine('loaB', clipGuide(d.B, d.dir));
    dw.setSeg('tray0', d.O, d.R);
    dw.setSeg('tray1', d.R, d.Op);
    dw.setSeg('tstr0', d.Q, d.S);
    dw.setSeg('tstr1', d.Q, d.T);
    dw.setDashLine('tclose', [d.S, d.T]);
    dw.setDashLine('tpar', [d.R, d.U]);

    // parallel reactions (step 7): offset line (force) + at the supports (form)
    dw.setArrow('reacAoff', d.offU, d.offO);
    dw.setArrow('reacBoff', d.offOp, d.offU);
    dw.setLabel('lblRAo', V.add(V.mid(d.offU, d.offO), V.mul(pd, 0.34)));
    dw.setLabel('lblRBo', V.add(V.mid(d.offOp, d.offU), V.mul(pd, 0.34)));
    dw.setArrow('reacApar', V.add(d.A, V.mul(d.dir, 1.0)), d.A);
    dw.setArrow('reacBpar', V.add(d.B, V.mul(d.dir, 1.0)), d.B);
    dw.setLabel('lblRAp', V.add(V.add(d.A, V.mul(d.dir, 0.62)), V.mul(pd, 0.3)));
    dw.setLabel('lblRBp', V.add(V.add(d.B, V.mul(d.dir, 0.62)), V.mul(pd, 0.3)));

    // members + their force segments
    dw.setSeg('m2', d.A, d.C);
    dw.setSeg('m3', d.C, d.B);
    dw.setSeg('m1', d.A, d.B);
    dw.setSeg('fr2', d.O, d.Vp);
    dw.setSeg('fr3', d.Vp, d.Op);
    dw.setSeg('f1u', d.U, d.Vp);
    dw.setSeg('f1w', d.W, d.Vp);

    const tc = V.mul(V.add(V.add(d.A, d.B), d.C), 1 / 3);       // triangle centroid
    const segsF = [[d.A, d.B], [d.A, d.C], [d.C, d.B]];
    for (let i = 0; i < 3; i++) {
      const m = V.mid(segsF[i][0], segsF[i][1]);
      dw.setLabel(`fn${i}`, V.add(m, V.mul(V.unit(V.sub(m, tc)), 0.3)));
    }
    const one = player && player.k >= 10 ? [d.W, d.Vp] : [d.U, d.Vp];
    const segsS = [one, [d.O, d.Vp], [d.Vp, d.Op]];
    for (let i = 0; i < 3; i++) {
      const m = V.mid(segsS[i][0], segsS[i][1]);
      dw.setLabel(`sn${i}`, V.add(m, V.mul(V.unit(V.sub(m, d.fcent)), i === 0 ? -0.28 : 0.28)));
    }

    // the roller at B (green glyph) + H/V components
    const rc = V.add(d.B, [0, -0.32]);
    dw.setCircle('rolC', rc, 0.22);
    dw.setSeg('rolG', V.add(d.B, [-0.55, -0.56]), V.add(d.B, [0.55, -0.56]));
    const ticks = [];
    for (let i = 0; i < 5; i++) {
      const x = d.B[0] - 0.42 + i * 0.21;
      ticks.push([[x + 0.14, d.B[1] - 0.57], [x, d.B[1] - 0.78]]);
    }
    dw.setStrokes('rolT', ticks);
    dw.setDashLine('guideUW', [d.U, d.W]);
    dw.setArrow('cmpBVf', d.Op, d.W);
    dw.setArrow('cmpBV', d.B, V.add(d.B, [0, 1.1]));
    dw.setLabel('lblBVf', V.add(V.mid(d.Op, d.W), [0.38, 0]));
    dw.setLabel('lblBV', V.add(d.B, [0.4, 0.85]));
    dw.setArrow('cmpAVf', d.W, d.Z);
    dw.setArrow('cmpAHf', d.Z, d.O);
    dw.setArrow('cmpAV', d.A, V.add(d.A, [0, 1.1]));
    dw.setArrow('cmpAH', d.A, V.add(d.A, [Math.sign(d.O[0] - d.Z[0]) || -1, 0]));
    dw.setLabel('lblAVf', V.add(V.mid(d.W, d.Z), [0.38, 0]));
    dw.setLabel('lblAHf', V.add(V.mid(d.Z, d.O), [0, 0.3]));

    dw.setDisk('pt_A', d.A);
    dw.setDisk('pt_B', d.B);
    dw.setDisk('pt_C', d.C);
    dw.setDisk('pt_N', d.N);
    dw.setDisk('pt_O', d.O);
    dw.setDisk('pt_Op', d.Op);
    dw.setDisk('pt_R', d.R);
    dw.setDisk('pt_Q', d.Q);
    dw.setDisk('pt_S', d.S);
    dw.setDisk('pt_T', d.T);
    dw.setDisk('pt_U', d.U);
    dw.setDisk('pt_V', d.Vp);
    dw.setDisk('pt_W', d.W);
    dw.setDisk('pt_Z', d.Z);

    const off = { A: [-0.34, -0.3], B: [0.38, -0.14], C: [0.36, 0.22],
                  R: [0.32, 0.28], U: [0.1, -0.36],
                  Q: [0.34, -0.22], S: [-0.34, 0.16], T: [0.36, 0.16] };
    const at = { A: d.A, B: d.B, C: d.C, R: d.R, U: d.U, Q: d.Q, S: d.S, T: d.T };
    for (const p of Object.keys(letters)) dw.setLabel(`lbl_${p}`, V.add(at[p], off[p]));

    for (let i = 0; i < 3; i++) {
      dw.setLabel(`ro${i}`, [14.35, 2.2 - 0.42 * i]);
      dw.setText(`ro${i}`, `N${'₁₂₃'[i]} = ${d.Ns[i].toFixed(1)} kN`);
      dw.setLabel(`rr${i}`, [14.35, 0.7 - 0.42 * i]);
      dw.setText(`rr${i}`, `${['A_H', 'A_V', 'B_V'][i]} = ${d.Rs[i].toFixed(1)} kN`);
      dw.setPoly(`if${i}`, V.rectPoints(segsF[i][0], segsF[i][1], s.sIF * d.Ns[i]));
    }
  }

  // node-equilibrium inspector: node k -> its disk and the sides of its
  // closed sub-polygon in the force diagram. Each side, as a vector, is one
  // force acting ON the node.
  const NODE_NAMES = ['A', 'B', 'C'];
  const NODE_DISKS = ['pt_A', 'pt_B', 'pt_C'];
  const nodeAt = [() => d.A, () => d.B, () => d.C];
  const nodePolys = () => [
    [[d.W, d.Z], [d.Z, d.O], [d.O, d.Vp], [d.Vp, d.W]],          // A_V, A_H, member 2, member 1
    [[d.Op, d.W], [d.W, d.Vp], [d.Vp, d.Op]],                    // B_V, member 1, member 3
    [[d.O, d.Op], [d.Op, d.Vp], [d.Vp, d.O]],                    // F, member 3, member 2
  ];

  function updateNode() {
    const j = Math.max(0, Math.min(2, Math.round(s.node) - 1));
    dw.selectDisk(s.node > 0 ? NODE_DISKS[j] : null);
    dw.setNodeInspector([8.1, 5.5], 0.85, `node ${NODE_NAMES[j]}`, nodePolys()[j]);
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
  panel.slider(par, s, 'F', 'F (kN)', 1, 10, 0.1, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 0.5, 2, 0.05, refresh);
  panel.slider(par, s, 'off', 'offset force diagram', 0, 0.5, 0.05, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.2, 0.005, refresh);
  panel.toggle(par, s, 'sc', 'show constraints', refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off, 1 = A, 2 = B, 3 = C)', 0, 3, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS });
    panel.syncAll();
    refresh();
  });

  const hits = [];
  hits.push(['A', () => d.A, 1, 99], ['B', () => d.B, 1, 99], ['C', () => d.C, 1, 99],
            ['N', () => d.N, 2, 99], ['O', () => d.O, 2, 99],
            ['R', () => d.R, 4, 8], ['Q', () => d.Q, 5, 8]);
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
      if (name === 'A') s.ay = Math.max(0, Math.min(2, wy));
      else if (name === 'B') s.by = Math.max(0, Math.min(2, wy));
      else if (name === 'C') {
        const v = V.sub([wx, wy], KC);
        const l = V.len(v);
        const cl = l > 0.98 ? V.mul(v, 0.98 / l) : v;
        s.cx = KC[0] + cl[0];
        s.cy = KC[1] + cl[1];
      } else if (name === 'N') {
        s.th = Math.max(TH[0], Math.min(TH[1], Math.atan2(wy - s.cy, wx - s.cx)));
      } else if (name === 'O') { s.ox = wx; s.oy = wy; }
      else if (name === 'R') { s.rx = wx; s.ry = wy; }
      else if (name === 'Q') s.qT = Math.max(0.5, Math.min(5.5, V.dot(V.sub([wx, wy], d.C), d.dir)));
      refresh();
    },
  );

  // click a node point to inspect it (clicking the selected node deselects);
  // the panel slider stays in sync via panel.syncAll()
  dw.nodeSelect(nodeAt.map((at) => ({ at })), (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
