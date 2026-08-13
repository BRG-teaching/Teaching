/**
 * Drawing view/40 "Continuous beam - symmetrical"
 * (https://block.arch.ethz.ch/eq/drawing/view/40) as a step-by-step
 * construction.
 *
 * A symmetric two-span continuous beam under a uniform load q. Each span's
 * load is bundled into its resultant R1/R2 acting on the span middle; the
 * funicular "tent" A1 -> R1_2 -> I -> R2 -> C1 hangs through the DRAGGABLE
 * apex R1_2 (mirrored to R2) and the sag point I over the middle support.
 * In the force diagram the two span poles H and V follow from the string
 * directions - and the vertical between the poles IS the middle reaction B.
 * Eight strips per span refine each resultant into the true parabolic
 * funicular, inscribed in the tent; mirroring it across the beam line gives
 * the bending-moment diagram with its hogging spike over B, and mirroring
 * the whole force diagram across the load line shows the same construction
 * read symmetrically (the doubled B).
 *
 * Live port of view_40/applet_0/geogebra.xml (225 commands); regression
 * scratchpad/v40_regress.py: worst 4.8e-15 over default/s6/R1=20/R1=50
 * live states (live40/*.json). See notes/view_40_analysis.md.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 40 — Continuous beam, symmetrical',
  subtitle: 'two spans, one tent: the middle reaction is the distance between the poles',
  about: 'A symmetric two-span continuous beam under a uniform load. Each span\'s load is bundled into a resultant, and the funicular tent through the three supports is drawn with a draggable apex — its mirror image serves the second span. The two span poles in the force diagram follow from the string directions, and the vertical distance between them is exactly the middle reaction B. Eight strips per span refine the tent into the true parabolic funicular, and mirroring it across the beam line yields the bending-moment diagram with its hogging peak over the middle support.',
  frame: [[-0.8, 2.2], [19.6, 11.4]],
};

const RESOLVE = 8;

const DEFAULTS = {
  A1: [1.1096291495441397, 6.0180866113787305],  // beam top, left end
  xB: 5.532653528637855,                          // middle support x
  apexY: 7.9000755139404,                         // R apex rail level
  apexX: 3.3212413390909844,                      // R1_2 x (drag)
  Iy: 5.79641568707453,                           // sag over B (drag, on the B vertical)
  FD0: [15.581976928863515, 9.281592348846192],   // load-line top (drag)
  beamH: 0.55,                                    // slab depth (drawing)
  loadY: 9.05, loadH: 0.42,                       // the q band
  R1: 35,                                         // R1 [20, 50] kN
  sFD: 5.5,                                       // scaleForceDiagram [2, 10]
  sLS: 0.25,                                      // scaleLoadSymbol [0.2, 0.5]
  oRF: 0.25,                                      // offsetReactionForces [0, 0.5]
  sIF: 0.02,                                      // scaleInternalForces [0, 0.1]
  o1: true,
  n4: true,
  node: 0,
  _k: 99,
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'Two spans, three supports', d: 'left: a beam over two equal spans — a pin at A, rollers under B and C — carrying a uniform load q (green band); by symmetry everything on the right span will mirror the left' },
  { t: 'Each span as one resultant', d: 'left: each span’s load is bundled into its resultant R₁ (and its mirror R₂) acting on the span middle line — right: the load line: R₁, R₂ stacked tip-to-tail' },
  { t: 'The funicular tent', d: 'left: strings from A₁ up to the apex (DRAG it — and the sag point I over B): A₁ → apex → I → mirror → C₁ — right: parallels through the load-line ends locate the span poles H and V' },
  { t: 'B is the distance between the poles', d: 'right: the two poles H and V lie on one vertical — and the piece between them IS the middle reaction B; the horizontal through H cuts the load line at J: A_V above, and C closes below (offset arrows beside the line)' },
  { t: 'Eight strips per span', d: 'right: each resultant divides into eight strip loads with rays to its pole — left: the strip funicular walks station by station, inscribed in the tent: the true parabola of the distributed load' },
  { t: 'The moment diagram', d: 'left: mirror the parabolas across the beam line (red): the bending-moment diagram — sagging in the spans, and the hogging spike over the middle support B' },
  { t: 'The symmetric check', d: 'right: mirror the whole force diagram across the load line (red): the same construction read from the right — B appears twice, once per reading: the symmetry closes' },
  { t: 'Done', d: 'drag the apex, the sag I, the load-line anchor or the R1 slider — the tent, the poles, B and the moment diagram follow; click a support or apex for its equilibrium' },
];

function inter2(p1, d1, p2, d2) { return V.intersect(p1, d1, p2, d2) || p1; }

function compute(s) {
  const A1 = s.A1;
  const C1 = [2 * s.xB - A1[0], A1[1]];
  const B1 = [s.xB, A1[1]];
  const R12 = [s.apexX, s.apexY];
  const R2 = [2 * s.xB - R12[0], R12[1]];
  const I = [s.xB, s.Iy];

  const FD0 = s.FD0;
  const g = s.R1 * s.sFD / 100;
  const FD1 = [FD0[0], FD0[1] - g];
  const FD2 = [FD1[0], FD1[1] - g];
  const H = inter2(FD1, V.sub(I, R12), FD0, V.sub(R12, A1));
  const Vp = inter2(FD1, V.sub(R2, I), H, [0, 1]);
  const J = [FD0[0], H[1]];
  const C_1 = [FD0[0], Vp[1]];

  // strips span 1 (walked backward from the tent string g_1)
  const st = [];
  for (let k = 1; k < 8; k++) st.push([A1[0] + (B1[0] - A1[0]) * k / 8, A1[1]]);
  const ll = [];
  for (let k = 0; k <= 7; k++) ll.push([FD0[0], FD0[1] - g * k / 7]);
  const Z1 = inter2(R12, V.sub(I, R12), st[6], [0, 1]);
  const W1 = inter2(A1, V.sub(R12, A1), st[0], [0, 1]);
  const walk = [Z1];
  for (let k = 5; k >= 1; k--) {
    walk.push(inter2(walk[walk.length - 1], V.sub(ll[k + 1], H), st[k], [0, 1]));
  }
  const para1 = [A1, W1, walk[5], walk[4], walk[3], walk[2], walk[1], Z1, I];
  const para2 = para1.map((p) => [2 * s.xB - p[0], p[1]]).reverse();

  // M-diagram: mirror across the beam line y = A1.y
  const my = (p) => [p[0], 2 * A1[1] - p[1]];
  const m1 = para1.map(my), m2 = para2.map(my);

  // mirrored force diagram (across the load-line vertical x = FD0.x)
  const mx = (p) => [2 * FD0[0] - p[0], p[1]];
  const Hm = mx(H), Vm = mx(Vp);

  const Aval = V.dist(J, FD0) / s.sFD * 100;
  const Bval = V.dist(Vp, H) / s.sFD * 100;
  const Cval = V.dist(FD2, C_1) / s.sFD * 100;
  return { A1, C1, B1, R12, R2, I, FD0, FD1, FD2, H, V: Vp, J, C_1,
           st, ll, para1, para2, m1, m2, Hm, Vm, mx, g,
           Aval, Bval, Cval };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, A1: [...DEFAULTS.A1], FD0: [...DEFAULTS.FD0] };
  let d = compute(s);
  let player = null;

  const W_STR = 0.035, W_PARA = 0.04, W_RAY = 0.012;
  const ARROW = { w: 0.045, headLen: 0.19, headW: 0.075 };
  const RED = 0xda2020;

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // step 1 -- beam, slab, supports, q band
  dw.poly('slab', 4, { intro: 1, opacity: 0.10, color: 0x555555, flash: false });
  dw.strokes('slabEdge', 4, { intro: 1, w: 0.012, color: PAL.black, flash: false });
  dw.seg('beamTop', { intro: 1, w: 0.02, color: RED });
  dw.poly('qband', 4, { intro: 1, opacity: 0.13, color: PAL.green, flash: false });
  dw.strokes('qedge', 4, { intro: 1, w: 0.02, color: PAL.green });
  dw.label('lbl_q', 'q', { intro: 1, color: PAL.green });
  dw.strokes('supA', 6, { intro: 1, w: 0.02, color: PAL.black, flash: false });
  dw.strokes('supB', 6, { intro: 1, w: 0.02, color: PAL.black, flash: false });
  dw.strokes('supC', 6, { intro: 1, w: 0.02, color: PAL.black, flash: false });
  dw.label('lbl_AH', 'A_H = 0', { intro: 1, color: PAL.green, flash: false });
  dw.dashLine('railR', { intro: 2, dash: 0.06, color: 0xafafaf, flash: false });
  dw.dashLine('railB', { intro: 3, dash: 0.06, color: 0xafafaf, flash: false });

  // step 2 -- resultants + load line
  dw.arrow('loadR1', { intro: 2, ...ARROW });
  dw.arrow('loadR2', { intro: 2, ...ARROW });
  dw.label('lR1', 'R₁', { cls: 'num', intro: 2, color: PAL.green });
  dw.label('lR2', 'R₂', { cls: 'num', intro: 2, color: PAL.green });
  dw.arrow('edgeR1', { intro: 2, ...ARROW });
  dw.arrow('edgeR2', { intro: 2, ...ARROW });
  dw.label('lRf1', 'R₁', { cls: 'num', intro: 2, color: PAL.green });
  dw.label('lRf2', 'R₂', { cls: 'num', intro: 2, color: PAL.green });

  // step 3 -- the tent + poles
  for (let i = 0; i < 4; i++) dw.seg(`tent${i}`, { intro: 3, w: W_STR, color: PAL.blue });
  dw.disk('pt_R12', { intro: 3, r: 0.07 });
  dw.disk('pt_I', { intro: 3, r: 0.07 });
  dw.label('lbl_I', 'I', { cls: 'point', intro: 3, when: (st) => st.n4 });
  dw.seg('rayH1', { intro: 3, w: 0.02, color: PAL.grey });
  dw.seg('rayH2', { intro: 3, w: 0.02, color: PAL.grey });
  dw.seg('rayV1', { intro: 3, w: 0.02, color: PAL.grey });
  dw.seg('rayV2', { intro: 3, w: 0.02, color: PAL.grey });
  dw.disk('pt_H', { intro: 3, r: 0.05, when: (st) => st.n4 });
  dw.disk('pt_V', { intro: 3, r: 0.05, when: (st) => st.n4 });
  dw.label('lbl_H', 'H', { cls: 'point', intro: 3, when: (st) => st.n4 });
  dw.label('lbl_V', 'V', { cls: 'point', intro: 3, when: (st) => st.n4 });

  // step 4 -- reactions
  dw.arrow('reacB', { intro: 4, ...ARROW });
  dw.label('lB', 'B', { cls: 'num', intro: 4, color: PAL.green });
  dw.arrow('reacA', { intro: 4, ...ARROW });
  dw.arrow('reacC', { intro: 4, ...ARROW });
  dw.label('lA', 'A_V', { cls: 'num', intro: 4, color: PAL.green });
  dw.label('lC', 'C', { cls: 'num', intro: 4, color: PAL.green });
  dw.disk('pt_J', { intro: 4, r: 0.05, when: (st) => st.n4 });
  dw.label('lbl_J', 'J', { cls: 'point', intro: 4, when: (st) => st.n4 });
  dw.dashLine('lvlH', { intro: 4, dash: 0.07, color: 0xafafaf, flash: false });
  dw.dashLine('lvlV', { intro: 4, dash: 0.07, color: 0xafafaf, flash: false });
  dw.arrow('formA', { intro: 4, ...ARROW });
  dw.arrow('formB', { intro: 4, ...ARROW });
  dw.arrow('formC', { intro: 4, ...ARROW });
  dw.label('lAf', 'A_V', { cls: 'num', intro: 4, color: PAL.green });
  dw.label('lBf', 'B', { cls: 'num', intro: 4, color: PAL.green });
  dw.label('lCf', 'C', { cls: 'num', intro: 4, color: PAL.green });

  // step 5 -- strips: rays + the two parabolas
  dw.strokes('rays1', 6, { intro: 5, w: W_RAY, color: PAL.grey, flash: false });
  dw.strokes('rays2', 6, { intro: 5, w: W_RAY, color: PAL.grey, flash: false });
  dw.strokes('para1', 8, { intro: 5, w: W_PARA, color: PAL.blue });
  dw.strokes('para2', 8, { intro: 5, w: W_PARA, color: PAL.blue });

  // step 6 -- the M-diagram (mirror across the beam line)
  dw.strokes('mdia1', 8, { intro: 6, w: W_PARA, color: RED });
  dw.strokes('mdia2', 8, { intro: 6, w: W_PARA, color: RED });
  dw.seg('mbase', { intro: 6, w: 0.02, color: RED });
  dw.label('lbl_M', 'M', { intro: 6, color: RED });

  // step 7 -- the mirrored force diagram (symmetric check)
  dw.seg('mrayH1', { intro: 7, w: 0.02, color: RED });
  dw.seg('mrayH2', { intro: 7, w: 0.02, color: RED });
  dw.seg('mrayV1', { intro: 7, w: 0.02, color: RED });
  dw.seg('mrayV2', { intro: 7, w: 0.02, color: RED });
  dw.arrow('mreacB', { intro: 7, ...ARROW });
  dw.label('lBm', 'B', { cls: 'num', intro: 7, color: PAL.green });

  // resolve: pipe on the beam (compression band) -- readouts
  for (let i = 0; i < 3; i++) {
    dw.label(`ro${i}`, '', { intro: 4, flash: false, color: PAL.green });
  }

  dw.nodeInspector(4, { when: (st) => st.node > 0, w: 0.055,
                        headLen: 0.2, headW: 0.08, r: 0.07 });

  dw.link('loadR1', 'edgeR1', 'lR1', 'lRf1');
  dw.link('loadR2', 'edgeR2', 'lR2', 'lRf2');
  dw.link('tent0', 'rayH1'); dw.link('tent1', 'rayH2');
  dw.link('tent2', 'rayV1'); dw.link('tent3', 'rayV2');
  dw.link('formA', 'reacA', 'lAf', 'lA');
  dw.link('formB', 'reacB', 'lBf', 'lB');
  dw.link('formC', 'reacC', 'lCf', 'lC');
  dw.link('para1', 'rays1'); dw.link('para2', 'rays2');
  dw.ghostable('edgeR1', 'edgeR2', 'reacA', 'reacB', 'reacC',
               'rayH1', 'rayH2', 'rayV1', 'rayV2', 'rays1', 'rays2');

  // ------------------------------------------------------------------
  function pairs(pts) {
    const out = [];
    for (let i = 0; i + 1 < pts.length; i++) out.push([pts[i], pts[i + 1]]);
    return out;
  }

  function update() {
    const bh = s.beamH;
    dw.setLabel('form_title', [0.4, 11.05]);
    dw.setLabel('force_title', [13.4, 11.05]);
    dw.setLabel('force_sub', [13.4, 10.7]);
    dw.setText('force_sub', `1 unit :: ${(100 / s.sFD).toFixed(1)} kN`);

    // slab + supports + q band
    const A1 = d.A1, C1 = d.C1;
    const sl = [[A1[0] - 0.25, A1[1]], [C1[0] + 0.25, A1[1]],
                [C1[0] + 0.25, A1[1] - bh], [A1[0] - 0.25, A1[1] - bh]];
    dw.setPoly('slab', sl);
    dw.setStrokes('slabEdge', pairs([...sl, sl[0]]));
    dw.setSeg('beamTop', A1, C1);
    const qb = [[A1[0] - 0.25, s.loadY], [C1[0] + 0.25, s.loadY],
                [C1[0] + 0.25, s.loadY + s.loadH], [A1[0] - 0.25, s.loadY + s.loadH]];
    dw.setPoly('qband', qb);
    dw.setStrokes('qedge', pairs([...qb, qb[0]]));
    dw.setLabel('lbl_q', [A1[0] - 0.7, s.loadY + 0.2]);
    dw.setLabel('lbl_AH', [A1[0] - 1.9, A1[1] - bh - 0.35]);
    const sup = (x, y) => [[[x - 0.22, y - 0.55], [x, y]], [[x, y], [x + 0.22, y - 0.55]],
      [[x - 0.32, y - 0.55], [x + 0.32, y - 0.55]],
      [[x - 0.24, y - 0.68], [x - 0.1, y - 0.68]],
      [[x - 0.03, y - 0.68], [x + 0.11, y - 0.68]],
      [[x + 0.18, y - 0.68], [x + 0.32, y - 0.68]]];
    dw.setStrokes('supA', sup(A1[0], A1[1] - bh));
    dw.setStrokes('supB', sup(s.xB, A1[1] - bh));
    dw.setStrokes('supC', sup(C1[0], A1[1] - bh));
    dw.setDashLine('railR', [[A1[0] + 0.4, s.apexY], [s.xB - 0.4, s.apexY]]);
    dw.setDashLine('railB', [[s.xB, A1[1] + 0.15], [s.xB, s.Iy - 0.9]]);

    // resultants + load line
    const tail1 = [d.R12[0], d.R12[1] + 2.5 * s.sLS];
    const tail2 = [d.R2[0], d.R2[1] + 2.5 * s.sLS];
    dw.setArrow('loadR1', tail1, d.R12);
    dw.setArrow('loadR2', tail2, d.R2);
    dw.setLabel('lR1', V.add(tail1, [0.16, -0.3]));
    dw.setLabel('lR2', V.add(tail2, [0.16, -0.3]));
    dw.setArrow('edgeR1', d.FD0, d.FD1);
    dw.setArrow('edgeR2', d.FD1, d.FD2);
    dw.setLabel('lRf1', V.add(V.mid(d.FD0, d.FD1), [0.2, 0]));
    dw.setLabel('lRf2', V.add(V.mid(d.FD1, d.FD2), [0.2, 0]));

    // tent + poles
    const T = [[d.A1, d.R12], [d.R12, d.I], [d.I, d.R2], [d.R2, d.C1]];
    T.forEach(([a, b], i) => dw.setSeg(`tent${i}`, a, b));
    dw.setDisk('pt_R12', d.R12);
    dw.setDisk('pt_I', d.I);
    dw.setLabel('lbl_I', V.add(d.I, [0.14, -0.28]));
    dw.setSeg('rayH1', d.FD0, d.H); dw.setSeg('rayH2', d.FD1, d.H);
    dw.setSeg('rayV1', d.FD1, d.V); dw.setSeg('rayV2', d.FD2, d.V);
    dw.setDisk('pt_H', d.H); dw.setDisk('pt_V', d.V);
    dw.setLabel('lbl_H', V.add(d.H, [-0.32, 0.12]));
    dw.setLabel('lbl_V', V.add(d.V, [-0.32, -0.18]));

    // reactions
    dw.setArrow('reacB', d.V, d.H);
    dw.setLabel('lB', V.add(V.mid(d.V, d.H), [-0.34, 0]));
    const off = [s.oRF, 0];
    dw.setArrow('reacA', V.add(d.J, off), V.add(d.FD0, off));
    dw.setArrow('reacC', V.add(d.FD2, off), V.add(d.C_1, off));
    dw.setLabel('lA', V.add(V.mid(d.J, d.FD0), [s.oRF + 0.22, 0]));
    dw.setLabel('lC', V.add(V.mid(d.FD2, d.C_1), [s.oRF + 0.22, 0]));
    dw.setDisk('pt_J', d.J);
    dw.setLabel('lbl_J', V.add(d.J, [-0.3, -0.05]));
    dw.setDashLine('lvlH', [d.H, V.add(d.J, off)]);
    dw.setDashLine('lvlV', [d.V, V.add(d.C_1, off)]);
    const y0 = d.A1[1] - s.beamH;
    dw.setArrow('formA', [d.A1[0], y0 - 1.5], [d.A1[0], y0 - 0.72]);
    dw.setArrow('formB', [s.xB, y0 - 1.5], [s.xB, y0 - 0.72]);
    dw.setArrow('formC', [d.C1[0], y0 - 1.5], [d.C1[0], y0 - 0.72]);
    dw.setLabel('lAf', [d.A1[0] + 0.18, y0 - 1.15]);
    dw.setLabel('lBf', [s.xB + 0.18, y0 - 1.15]);
    dw.setLabel('lCf', [d.C1[0] + 0.18, y0 - 1.15]);
    dw.setLabel('ro0', [17.4, 11.05]);
    dw.setText('ro0', `A_V = C = ${d.Aval.toFixed(1)} kN`);
    dw.setLabel('ro1', [17.4, 10.7]);
    dw.setText('ro1', `B = ${d.Bval.toFixed(1)} kN`);
    dw.setLabel('ro2', [17.4, 10.35]);
    dw.setText('ro2', `R₁ = R₂ = ${s.R1.toFixed(0)} kN`);

    // strips
    dw.setStrokes('rays1', d.ll.slice(1, 7).map((p) => [p, d.H]));
    dw.setStrokes('rays2', d.ll.slice(1, 7).map((p) => [[p[0], p[1] - d.g], d.V]));
    dw.setStrokes('para1', pairs(d.para1));
    dw.setStrokes('para2', pairs(d.para2));

    // M-diagram
    dw.setStrokes('mdia1', pairs(d.m1));
    dw.setStrokes('mdia2', pairs(d.m2));
    dw.setSeg('mbase', d.A1, d.C1);
    dw.setLabel('lbl_M', [V.mid(d.A1, d.B1)[0], 2 * d.A1[1] - d.para1[4][1] + 0.3]);

    // mirrored force diagram
    dw.setSeg('mrayH1', d.FD0, d.Hm); dw.setSeg('mrayH2', d.FD1, d.Hm);
    dw.setSeg('mrayV1', d.FD1, d.Vm); dw.setSeg('mrayV2', d.FD2, d.Vm);
    dw.setArrow('mreacB', d.Vm, d.Hm);
    dw.setLabel('lBm', V.add(V.mid(d.Vm, d.Hm), [0.2, 0]));

    updateNode();
  }

  // node equilibrium: A, apex R1, I, apex R2, B?, C
  const NODES = ['A', 'R1', 'I', 'R2', 'C'];
  const NAT = () => ({ A: d.A1, R1: d.R12, I: d.I, R2: d.R2, C: d.C1 });
  function nodeSides(nm) {
    const off = [s.oRF, 0];
    switch (nm) {
      case 'A':  return [[V.add(d.J, off), V.add(d.FD0, off)], [d.FD0, d.H], [d.H, d.J]];
      case 'R1': return [[d.FD0, d.FD1], [d.FD1, d.H], [d.H, d.FD0]];
      case 'I':  return [[d.H, d.FD1], [d.FD1, d.V], [d.V, d.H]];
      case 'R2': return [[d.FD1, d.FD2], [d.FD2, d.V], [d.V, d.FD1]];
      case 'C':  return [[V.add(d.FD2, off), V.add(d.C_1, off)], [d.C_1, d.V], [d.V, d.FD2]];
      default: return [];
    }
  }
  const NDISK = { A: null, R1: 'pt_R12', I: 'pt_I', R2: null, C: null };
  function updateNode() {
    const n = Math.max(1, Math.round(s.node));
    const nm = NODES[n - 1];
    dw.selectDisk(s.node > 0 ? NDISK[nm] : null);
    dw.setNodeInspector(NAT()[nm], 1.0, s.node > 0 ? `node ${nm}` : '', nodeSides(nm));
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
  const par = panel.section('Parameters');
  panel.slider(par, s, 'R1', 'R1 — span resultant (kN)', 20, 50, 0.5, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram', 2, 10, 0.1, refresh);
  panel.slider(par, s, 'oRF', 'offset reaction forces', 0, 0.5, 0.02, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 0.2, 0.5, 0.01, refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off; A, apex₁, I, apex₂, C)', 0, 5, 1, refresh);

  const hits = [
    ['apex', () => d.R12, 3, 99], ['I', () => d.I, 3, 99], ['FD0', () => d.FD0, 2, 99],
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
      if (name === 'apex') s.apexX = Math.min(Math.max(wx, d.A1[0] + 0.4), s.xB - 0.4);
      else if (name === 'I') s.Iy = Math.min(Math.max(wy, 4.65), d.A1[1] - 0.05);
      else if (name === 'FD0') s.FD0 = [wx, wy];
      refresh();
    },
  );

  dw.nodeSelect(
    NODES.map((nm) => ({ at: () => NAT()[nm] })),
    (i) => {
      s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
      panel.syncAll();
      refresh();
    },
  );

  refresh();
  return player;
}
