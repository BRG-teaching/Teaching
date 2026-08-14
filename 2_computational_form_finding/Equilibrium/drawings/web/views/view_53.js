/**
 * Drawing view/53 "Expo Pavillon Lisbon, A. Siza"
 * (https://block.arch.ethz.ch/eq/drawing/view/53) as a step-by-step
 * construction.
 *
 * Siza's concrete canopy hangs as a shallow cable between two abutment
 * walls. The roof weight R acts at midspan; the sag point F is draggable
 * on the mid vertical, and mirroring the midpoint E through F doubles the
 * sag: the chords C-E' and E'-D are the end tangents of the parabola.
 * Parallels through the load line's ends meet at the pole O: the force
 * triangle A (bottom chord force), B (top), R. The canopy is drawn as the
 * arc through C, F, D over the applet's reference drawing. The cable pull
 * A' then continues into the LEFT WALL (traced over the applet's section
 * screenshot): its force polygon, translated to Z_1, splits A' into the
 * wall diagonal 1 (blue, compression to the toe) and the inner edge 2
 * (red - the edge that wants tension: the wall's own weight D and the
 * ground bearing C close the block's equilibrium. Drag the wall's outer
 * corner R_2 along its track to reshape the wall.
 *
 * Live port of view_53/applet_0/geogebra.xml (170 commands); regression
 * scratchpad/v53_regress.py: worst 1.9e-14 (s0/s7/mode1). Images shipped
 * as assets/view_53_reference.jpg + view_53_section.png (applet anchors).
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 53 — Expo Pavillon Lisbon, A. Siza',
  subtitle: 'a canopy on two walls: double the sag, close the triangle, then check the wall block',
  about: 'Siza\'s Expo canopy hangs as a shallow concrete cable between two abutment walls. Mirroring the midspan point through the draggable sag doubles it: the two chords are the parabola\'s end tangents, and parallels through the load line meet at the pole — the force triangle of the roof. The cable pull then walks into the wall: translated to the wall\'s force polygon, it splits into the compression diagonal to the toe and the inner edge that wants tension — the wall\'s own weight and the ground bearing close the block\'s equilibrium. Drag the sag, the load, or the wall\'s outer corner along its track.',
  frame: [[-1.2, 1.4], [23.4, 12.2]],
};

const RESOLVE = 7;

const DEFAULTS = {
  C: [3.6227862458, 9.6665851797],           // cable left end
  D: [10.9785500920, 9.6665851797],          // cable right end
  Fy: 9.3209420434,                          // sag point (drag on the mid vertical)
  sagRail: [8.4160832138, 9.5964840373],     // Q..P rail
  G: [21, 11],                               // load line top (drag)
  Rlen: 1.2,                                 // |R| = G->N (fixed by the applet)
  Ly: 10.4081528504,                         // R arrow anchor (drag on its rail)
  Lrail: [7.5990293916, 10.6140421381],
  // wall (fixed except R_2 on its track O_2 -> H_1 -> Q_2)
  R2: [4, 4],
  track: [[2.2401803011, 4], [4, 4], [4, 2.3026854608]],
  topY: 7.3946290784,                        // wall top line (through I_1, M_1)
  K1x: 5.7598196989,                         // toe vertical
  I1x: 6.4398196989,                         // outer edge (A' entry)
  N1: [5.6321210021, 7.0943457389],
  M1: [5.6321210021, 7.3946290784],
  I1: [6.4398196989, 7.3946290784],
  L1: [6.4398196989, 7.2865266353],
  O1: [5.7598196989, 7.2565266353],
  Bt: [4.05, 7.3446290784],                  // the thrust kink in the wall
  V2y: 4.0,
  Z1: [18, 4],                               // wall force-polygon anchor (drag)
  sLS: 0.65,                                 // scaleLoadSymbol [0.2, 2]
  sORF: 0.3,                                 // scaleOffsetReactionForces [0, 0.3]
  sFD: 1.2,                                  // scaleForceDiagram [0.5, 2] (display only)
  o: false,                                  // showHandles
  o1: false,                                 // showPoints
  n4: true,
  node: 0,
  _k: 99,
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The pavilion', d: 'left: the canopy section over the reference drawing — two abutment walls, the roof band q between them; below, the wall section: its outer corner R₂ rides on the dashed track (drag it!)' },
  { t: 'The roof weight R', d: 'left: the whole canopy weighs R, acting at midspan (drag its anchor) — right: R alone as the load line G → N' },
  { t: 'Double the sag', d: 'left: the cable must pass through the draggable sag F: mirror the midpoint E through F → E′, and the chords C–E′ and E′–D are the end tangents (dashed); the dimension f marks the doubled sag' },
  { t: 'The cable and its triangle', d: 'left: the parabola through C, F, D (the arc) — right: through G parallel to E′–D, through N parallel to C–E′: the pole O closes the triangle: A below, B above (offset arrows beside)' },
  { t: 'The pull walks into the wall', d: 'left: the cable force A′ continues along the chord into the wall at Q₁ — right: translated to Z₁: the wall\'s force polygon begins with A′' },
  { t: 'The wall block', d: 'left: inside the wall the thrust kinks at B: the diagonal 1 runs to the toe, the inner edge 2 stays vertical — right: A′ splits into 1 (parallel to the diagonal) and 2 (vertical): the wall\'s weight D and the ground bearing C close the block\'s equilibrium' },
  { t: 'Compression and tension', d: 'the diagonal 1 resolves blue = compression (the thrust reaches the toe), the inner edge 2 pink = the edge that wants tension — the wall\'s weight keeps it shut; drag F, R, R₂, Z₁ or the sliders — click C, D or the wall for its equilibrium',
    detail: (d, st) => [`A = ${d.Aq.toFixed(1)} · B = ${d.Bq.toFixed(1)} kN — R = ${(st.Rlen * d.kN).toFixed(1)} kN`],
    take: 'the canopy\'s pull wants to open the wall — its own weight closes the joint and walks the thrust to the toe' },
];

function inter2(p1, d1, p2, d2) { return V.intersect(p1, d1, p2, d2) || p1; }

function compute(s) {
  const C = s.C, D = s.D;
  const E = V.mid(C, D);
  const F = [E[0], s.Fy];
  const Ep = [2 * F[0] - E[0], 2 * F[1] - E[1]];
  const G = s.G;
  const N = [G[0], G[1] - s.Rlen];
  const O = inter2(G, V.sub(D, Ep), N, V.sub(Ep, C));

  // wall outline from the draggable corner R_2
  const R2 = s.R2;
  const P2 = [R2[0], s.topY];
  const S2 = [s.K1x, R2[1]];
  const wall = [R2, P2, s.N1, s.M1, s.I1, s.L1, s.O1, S2, R2];
  // A' entry on the outer edge: through Bt parallel to chord c (C->E')
  const Q1 = inter2(s.Bt, V.sub(Ep, C), [s.I1x, 0], [0, 1]);
  // wall force polygon at Z1
  const Z1 = s.Z1;
  const A2 = V.add(Z1, V.sub(O, N));
  const B2 = inter2(Z1, V.sub(S2, P2), A2, [0, 1]);
  const V2 = [s.Bt[0], s.V2y];

  // circumcircle through C, F, D sampled as the cable arc
  const ax = C[0], ay = C[1], bx = F[0], by = F[1], cx = D[0], cy = D[1];
  const dd = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
  const ux = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay)
            + (cx * cx + cy * cy) * (ay - by)) / dd;
  const uy = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx)
            + (cx * cx + cy * cy) * (bx - ax)) / dd;
  const rr = Math.hypot(ax - ux, ay - uy);
  let a0 = Math.atan2(ay - uy, ax - ux), a1 = Math.atan2(cy - uy, cx - ux);
  const am = Math.atan2(F[1] - uy, F[0] - ux);
  // walk from a0 to a1 the short way through am
  let d01 = a1 - a0;
  while (d01 > Math.PI) d01 -= 2 * Math.PI;
  while (d01 < -Math.PI) d01 += 2 * Math.PI;
  let dm = am - a0;
  while (dm > Math.PI) dm -= 2 * Math.PI;
  while (dm < -Math.PI) dm += 2 * Math.PI;
  if (Math.sign(dm) !== Math.sign(d01)) d01 = d01 - Math.sign(d01) * 2 * Math.PI;
  const arc = [];
  for (let k = 0; k <= 24; k++) {
    const a = a0 + d01 * k / 24;
    arc.push([ux + rr * Math.cos(a), uy + rr * Math.sin(a)]);
  }

  const kN = 10 / s.sFD;                     // display only
  const Aq = V.dist(O, G) * kN, Bq = V.dist(N, O) * kN;
  return { C, D, E, F, Ep, G, N, O, R2, P2, S2, wall, Q1, A2, B2, Z1, V2,
           arc, Aq, Bq, kN };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, C: [...DEFAULTS.C], D: [...DEFAULTS.D],
              G: [...DEFAULTS.G], R2: [...DEFAULTS.R2], Z1: [...DEFAULTS.Z1] };
  let d = compute(s);
  let player = null;

  const W_BAR = 0.05, W_STR = 0.035, W_ARC = 0.06;
  const ARROW = { w: 0.05, headLen: 0.22, headW: 0.09 };
  const DASH = 0.14;
  const RED = PAL.red;

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });

  // the applet's two drawings (instant, behind everything)
  dw.image('imgRef', 'assets/view_53_reference.jpg',
           { corners: [[2.5, 8], [12.6, 8.05], [2.4903, 9.9540]], opacity: 0.85, z: -0.8, intro: 1 });
  dw.image('imgWall', 'assets/view_53_section.png',
           { corners: [[3.2850583434, 7.7857279516], [3.2850583434, 3.0964180299],
                       [6.8012303434, 7.7857279516]], opacity: 0.85, z: -0.8, intro: 1 });

  // step 1 -- site
  dw.strokes('wall', 8, { intro: 1, w: 0.02, color: PAL.black, flash: false });
  dw.dashLine('track', { intro: 1, dash: 0.1, color: 0xaaaaaa, flash: false });
  dw.poly('qband', 4, { intro: 1, opacity: 0.13, color: PAL.green, flash: false });
  dw.strokes('qedge', 4, { intro: 1, w: 0.02, color: PAL.green });
  dw.label('lbl_q', 'q', { intro: 1, color: PAL.green });
  dw.disk('pt_R2', { intro: 1, r: 0.09 });
  dw.label('lbl_R2', 'R₂', { cls: 'point', intro: 1, when: (st) => st.n4 });
  for (const nm of ['C', 'D']) {
    dw.disk(`pt_${nm}`, { intro: 1, r: 0.07, when: (st) => st.n4 });
    dw.label(`lbl_${nm}`, nm, { cls: 'point', intro: 1, when: (st) => st.n4 });
  }

  // step 2 -- the load R
  dw.arrow('loadR', { intro: 2, ...ARROW });
  dw.label('lR', 'R', { cls: 'num', intro: 2, color: PAL.green });
  dw.arrow('edgeR', { intro: 2, ...ARROW });
  dw.label('lRf', 'R', { cls: 'num', intro: 2, color: PAL.green });
  dw.disk('pt_G', { intro: 2, r: 0.07, when: (st) => st.n4 });
  dw.label('lbl_G', 'G', { cls: 'point', intro: 2, when: (st) => st.n4 });

  // step 3 -- sag + chords (retire when the cable arrives, like the applet s5)
  const sagW = (st) => st.o || st._k < 5;
  dw.disk('pt_F', { intro: 3, r: 0.09 });
  dw.label('lbl_F', 'F', { cls: 'point', intro: 3, when: (st) => st.n4 });
  dw.dashLine('railF', { intro: 3, dash: 0.07, color: 0xafafaf, flash: false });
  dw.dashLine('chordCD', { intro: 3, outro: 5, dash: DASH, when: sagW });
  dw.dashLine('chord1', { intro: 3, dash: DASH });
  dw.dashLine('chord2', { intro: 3, dash: DASH });
  dw.disk('pt_Ep', { intro: 3, r: 0.06, when: (st) => st.n4 });
  dw.label('lbl_Ep', 'E′', { cls: 'point', intro: 3, when: (st) => st.n4 });
  dw.strokes('dimF', 4, { intro: 3, outro: 5, w: 0.02, color: PAL.grey, flash: false, when: sagW });
  dw.label('lbl_f', 'f', { intro: 3, outro: 5, color: PAL.grey, when: sagW });

  // step 4 -- the cable arc + the force triangle
  dw.strokes('cable', 24, { intro: 4, w: W_ARC, color: PAL.black });
  dw.seg('fA', { intro: 4, w: W_STR, color: RED });
  dw.seg('fB', { intro: 4, w: W_STR, color: RED });
  dw.arrow('arrA', { intro: 4, ...ARROW });
  dw.arrow('arrB', { intro: 4, ...ARROW });
  dw.label('lA', 'A', { cls: 'num', intro: 4, color: PAL.green });
  dw.label('lB', 'B', { cls: 'num', intro: 4, color: PAL.green });
  dw.arrow('pullC', { intro: 4, ...ARROW });
  dw.arrow('pullD', { intro: 4, ...ARROW });
  dw.disk('pt_O', { intro: 4, r: 0.07, when: (st) => st.n4 });
  dw.label('lbl_O', 'O', { cls: 'point', intro: 4, when: (st) => st.n4 });

  // step 5 -- A' into the wall
  dw.arrow('pullQ1', { intro: 5, ...ARROW });
  dw.label('lA1', 'A′', { cls: 'num', intro: 5, color: PAL.green });
  dw.seg('fA1', { intro: 5, w: W_STR, color: RED });
  dw.arrow('arrA1', { intro: 5, ...ARROW });
  dw.label('lA1f', 'A′', { cls: 'num', intro: 5, color: PAL.green });
  dw.seg('thrust0', { intro: 5, w: W_BAR, color: RED });
  dw.disk('pt_Q1', { intro: 5, r: 0.06, when: (st) => st.n4 });
  dw.label('lbl_Q1', 'Q₁', { cls: 'point', intro: 5, when: (st) => st.n4 });
  dw.disk('pt_Z1', { intro: 5, r: 0.08 });

  // step 6 -- the wall block
  dw.seg('mem1', { intro: 6, w: W_BAR, color: { pending: PAL.black, final: () => PAL.blue } });
  dw.seg('mem2', { intro: 6, w: W_BAR, color: { pending: PAL.black, final: () => RED } });
  dw.label('n1f', '1', { cls: 'num', intro: 6, color: PAL.blue, when: (st) => st.n4 });
  dw.label('n2f', '2', { cls: 'num', intro: 6, color: RED, when: (st) => st.n4 });
  dw.seg('f1', { intro: 6, w: W_STR, color: { pending: PAL.black, final: () => PAL.blue } });
  dw.seg('f2', { intro: 6, w: W_STR, color: { pending: PAL.black, final: () => RED } });
  dw.label('n1s', '1', { cls: 'num', intro: 6, color: PAL.blue, when: (st) => st.n4 });
  dw.label('n2s', '2', { cls: 'num', intro: 6, color: RED, when: (st) => st.n4 });
  dw.arrow('arrC', { intro: 6, ...ARROW });
  dw.arrow('arrD', { intro: 6, ...ARROW });
  dw.label('lC', 'C', { cls: 'num', intro: 6, color: PAL.green });
  dw.label('lD', 'D', { cls: 'num', intro: 6, color: PAL.green });
  dw.arrow('formC', { intro: 6, ...ARROW });
  dw.arrow('formD', { intro: 6, ...ARROW });
  dw.label('lCf', 'C', { cls: 'num', intro: 6, color: PAL.green });
  dw.label('lDf', 'D', { cls: 'num', intro: 6, color: PAL.green });

  for (let i = 0; i < 2; i++) {
    dw.label(`ro${i}`, '', { intro: 4, flash: false, color: PAL.green });
  }

  dw.nodeInspector(4, { when: (st) => st.node > 0, w: 1.5 * W_BAR,
                        headLen: 0.24, headW: 0.1, r: 0.09 });

  dw.link('loadR', 'edgeR', 'lR', 'lRf');
  dw.link('cable', 'fA', 'fB');
  dw.link('pullC', 'arrA', 'lA');
  dw.link('pullD', 'arrB', 'lB');
  dw.link('pullQ1', 'fA1', 'arrA1', 'lA1', 'lA1f');
  dw.link('mem1', 'f1', 'n1f', 'n1s');
  dw.link('mem2', 'f2', 'n2f', 'n2s');
  dw.link('formC', 'arrC', 'lCf', 'lC');
  dw.link('formD', 'arrD', 'lDf', 'lD');
  dw.ghostable('edgeR', 'fA', 'fB', 'arrA', 'arrB', 'fA1', 'arrA1',
               'f1', 'f2', 'arrC', 'arrD');

  // ------------------------------------------------------------------
  function pairs(pts) {
    const out = [];
    for (let i = 0; i + 1 < pts.length; i++) out.push([pts[i], pts[i + 1]]);
    return out;
  }

  function update() {
    dw.setLabel('form_title', [0.2, 11.8]);
    dw.setLabel('force_title', [15.6, 11.8]);

    dw.setStrokes('wall', pairs(d.wall));
    dw.setDashLine('track', s.track);
    const qb = [[d.C[0], 10.05], [d.D[0], 10.05], [d.D[0], 10.45], [d.C[0], 10.45]];
    dw.setPoly('qband', qb);
    dw.setStrokes('qedge', pairs([...qb, qb[0]]));
    dw.setLabel('lbl_q', [d.C[0] - 0.5, 10.25]);
    dw.setDisk('pt_R2', d.R2);
    dw.setLabel('lbl_R2', V.add(d.R2, [-0.45, -0.15]));
    dw.setDisk('pt_C', d.C); dw.setDisk('pt_D', d.D);
    dw.setLabel('lbl_C', V.add(d.C, [-0.4, 0.15]));
    dw.setLabel('lbl_D', V.add(d.D, [0.2, 0.15]));

    dw.setArrow('loadR', [d.E[0], s.Ly], [d.E[0], s.Ly - s.sLS]);
    dw.setLabel('lR', [d.E[0] + 0.2, s.Ly - 0.5 * s.sLS]);
    dw.setArrow('edgeR', d.G, d.N);
    dw.setLabel('lRf', V.add(V.mid(d.G, d.N), [0.25, 0]));
    dw.setDisk('pt_G', d.G);
    dw.setLabel('lbl_G', V.add(d.G, [0.15, 0.15]));

    dw.setDisk('pt_F', d.F);
    dw.setLabel('lbl_F', V.add(d.F, [0.15, -0.3]));
    dw.setDashLine('railF', [[d.E[0], s.sagRail[0]], [d.E[0], s.sagRail[1]]]);
    dw.setDashLine('chordCD', [d.C, d.D]);
    dw.setDashLine('chord1', [d.C, d.Ep]);
    dw.setDashLine('chord2', [d.Ep, d.D]);
    dw.setDisk('pt_Ep', d.Ep);
    dw.setLabel('lbl_Ep', V.add(d.Ep, [0.15, -0.3]));
    const fx = d.E[0] + 1.1;
    dw.setStrokes('dimF', [[[fx, d.E[1]], [fx, d.Ep[1]]],
      [[fx - 0.1, d.E[1]], [fx + 0.1, d.E[1]]],
      [[fx - 0.1, d.F[1]], [fx + 0.1, d.F[1]]],
      [[fx - 0.1, d.Ep[1]], [fx + 0.1, d.Ep[1]]]]);
    dw.setLabel('lbl_f', [fx + 0.2, (d.E[1] + d.Ep[1]) / 2]);

    dw.setStrokes('cable', pairs(d.arc));
    dw.setSeg('fA', d.O, d.G);
    dw.setSeg('fB', d.N, d.O);
    const offA = V.mul(V.unit(V.perp(V.sub(d.G, d.O))), s.sORF);
    const offB = V.mul(V.unit(V.perp(V.sub(d.O, d.N))), s.sORF);
    dw.setArrow('arrA', V.add(d.O, offA), V.add(d.G, offA));
    dw.setArrow('arrB', V.add(d.N, offB), V.add(d.O, offB));
    dw.setLabel('lA', V.add(V.add(V.mid(d.O, d.G), offA), [-0.15, 0.3]));
    dw.setLabel('lB', V.add(V.add(V.mid(d.N, d.O), offB), [-0.15, -0.35]));
    const uC = V.unit(V.sub(d.C, d.Ep)), uD = V.unit(V.sub(d.D, d.Ep));
    dw.setArrow('pullC', d.C, V.add(d.C, V.mul(uC, s.sLS)));
    dw.setArrow('pullD', d.D, V.add(d.D, V.mul(uD, s.sLS)));
    dw.setDisk('pt_O', d.O);
    dw.setLabel('lbl_O', V.add(d.O, [-0.4, 0]));

    const uA1 = V.unit(V.sub(d.Ep, d.C));
    dw.setArrow('pullQ1', d.Q1, V.add(d.Q1, V.mul(uA1, -s.sLS)));
    dw.setLabel('lA1', V.add(d.Q1, [0.35, 0.35]));
    dw.setSeg('fA1', d.Z1, d.A2);
    dw.setArrow('arrA1', d.Z1, d.A2);
    dw.setLabel('lA1f', V.add(V.mid(d.Z1, d.A2), [0.1, -0.3]));
    dw.setSeg('thrust0', d.Q1, s.Bt);
    dw.setDisk('pt_Q1', d.Q1);
    dw.setLabel('lbl_Q1', V.add(d.Q1, [0.2, 0.1]));
    dw.setDisk('pt_Z1', d.Z1);

    dw.setSeg('mem1', s.Bt, d.S2);
    dw.setSeg('mem2', s.Bt, d.V2);
    dw.setLabel('n1f', V.add(V.mid(s.Bt, d.S2), [0.2, 0.1]));
    dw.setLabel('n2f', V.add(V.mid(s.Bt, d.V2), [-0.25, 0]));
    dw.setSeg('f1', d.B2, d.Z1);
    dw.setSeg('f2', d.A2, d.B2);
    dw.setLabel('n1s', V.add(V.mid(d.B2, d.Z1), [0.25, 0]));
    dw.setLabel('n2s', V.add(V.mid(d.A2, d.B2), [-0.3, 0]));
    dw.setArrow('arrC', V.add(d.B2, V.mul(V.unit(V.sub(d.Z1, d.B2)), 0.9)), d.B2);
    dw.setArrow('arrD', V.add(d.B2, [0, 0.9]), d.B2);
    dw.setLabel('lC', V.add(d.B2, [0.5, -0.5]));
    dw.setLabel('lD', V.add(d.B2, [0.15, 0.65]));
    const toe = d.S2;
    dw.setArrow('formC', V.add(toe, V.mul(V.unit(V.sub(s.Bt, toe)), -0.8)), toe);
    dw.setArrow('formD', [d.V2[0], d.V2[1] + 0.9], d.V2);
    dw.setLabel('lCf', V.add(toe, [0.45, -0.45]));
    dw.setLabel('lDf', V.add(d.V2, [-0.35, 0.5]));

    dw.setLabel('ro0', [19.4, 11.8]);
    dw.setText('ro0', `A = ${d.Aq.toFixed(1)}, B = ${d.Bq.toFixed(1)} kN`);
    dw.setLabel('ro1', [19.4, 11.35]);
    dw.setText('ro1', `R = ${(s.Rlen * d.kN).toFixed(1)} kN`);

    updateNode();
  }

  // node equilibrium: cable end C, cable end D, the wall block
  const NODES = ['C', 'D', 'wall'];
  const NAT = () => ({ C: d.C, D: d.D, wall: s.Bt });
  function nodeSides(nm) {
    switch (nm) {
      case 'C': return [[d.G, d.N], [d.N, d.O], [d.O, d.G]];
      case 'D': return [[d.N, d.O], [d.O, d.G], [d.G, d.N]];
      case 'wall': return [[d.Z1, d.A2], [d.A2, d.B2], [d.B2, d.Z1]];
      default: return [];
    }
  }
  function updateNode() {
    const n = Math.max(1, Math.round(s.node));
    const nm = NODES[n - 1];
    dw.selectDisk(s.node > 0 ? { C: 'pt_C', D: 'pt_D', wall: 'pt_R2' }[nm] : null);
    dw.setNodeInspector(NAT()[nm], 1.0, s.node > 0 ? (nm === 'wall' ? 'the wall block' : `cable end ${nm}`) : '',
                        nodeSides(nm));
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
  panel.toggle(view, s, 'o', 'show handles / sag apparatus (applet checkbox)', refresh);
  const par = panel.section('Parameters');
  panel.slider(par, s, 'sLS', 'scale load symbol', 0.2, 2, 0.05, refresh);
  panel.slider(par, s, 'sORF', 'scale offset reaction forces', 0, 0.3, 0.02, refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off; C, D, wall)', 0, 3, 1, refresh);

  // track-constrained drag for R2 (polyline O_2 -> H_1 -> Q_2)
  function clampTrack(wx, wy) {
    const [a, b, c] = s.track;
    const proj = (p, q) => {
      const ab = V.sub(q, p);
      const t = Math.max(0, Math.min(1, V.dot(V.sub([wx, wy], p), ab) / V.dot(ab, ab)));
      return V.add(p, V.mul(ab, t));
    };
    const p1 = proj(a, b), p2 = proj(b, c);
    const d1 = Math.hypot(p1[0] - wx, p1[1] - wy);
    const d2 = Math.hypot(p2[0] - wx, p2[1] - wy);
    return d1 <= d2 ? p1 : p2;
  }
  const hits = [
    ['F', () => d.F, 3, 99], ['G', () => d.G, 2, 99],
    ['R2', () => d.R2, 1, 99], ['Z1', () => d.Z1, 5, 99],
    ['L', () => [d.E[0], s.Ly], 2, 99],
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
      if (name === 'F') s.Fy = Math.min(Math.max(wy, s.sagRail[0]), s.sagRail[1]);
      else if (name === 'G') s.G = [wx, wy];
      else if (name === 'R2') s.R2 = clampTrack(wx, wy);
      else if (name === 'Z1') s.Z1 = [wx, wy];
      else if (name === 'L') s.Ly = Math.min(Math.max(wy, s.Lrail[0] + s.sLS), s.Lrail[1]);
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
