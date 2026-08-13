/**
 * Drawing view/41 "Continuous beam - cantilever"
 * (https://block.arch.ethz.ch/eq/drawing/view/41) as a step-by-step
 * construction.
 *
 * A beam on a pin A and a DRAGGABLE roller B with a cantilever beyond B,
 * under a uniform load q = R1 per unit length. The whole load is bundled
 * into R1 (back span) and R2 (cantilever); a coarse funicular tent through
 * the draggable anchor A'' and apex P1 gives the main pole J1 and the
 * in-beam tie H_tension. The problem then splits into two SUBSYSTEMS:
 * (1) the back span alone - pole at mid load line, symmetric reactions;
 * (2) the cantilever alone - the closing line A''-H1-C1' is ONE straight
 * red line and the pin reaction A_V2 points DOWN (uplift!). Superposing
 * them: H_internal = H_tension - H_compression = 0, made visible on the
 * bottom rail where the red and blue pieces are equal BY CONSTRUCTION
 * (mirror across the load line). Eight strips per span refine the tent
 * into the true funicular a_1 + f_9 (kink at B = the reaction), and the
 * step-7 mirror across the A''-B'' level hangs the M-diagram on the
 * tension side.
 *
 * Live port of view_41/applet_0/geogebra.xml (405 commands); regression
 * scratchpad/v41_regress.py: worst 1.1e-14 over default/s7/R1=5/R1=10
 * live states incl. all 14 strip-walk vertices. Full decode (agent-assisted,
 * verified): notes/view_41_analysis.md.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 41 — Continuous beam, cantilever',
  subtitle: 'two subsystems, one tie: the cantilever lifts the pin and H_internal cancels to zero',
  about: 'A beam on a pin and a draggable roller carries a uniform load past the roller — a cantilever. The load splits into two subsystems: the back span alone, whose funicular pole sits at mid load line, and the cantilever alone, whose closing line runs straight through the anchor and whose pin reaction points DOWN — the cantilever lifts the back of the beam. Superposing both, the internal horizontals cancel: on the bottom rail the red H_tension and blue H_compression pieces are equal by construction. Eight strips per span refine the tent into the true funicular with its kink at the roller, and mirroring it across the anchor level hangs the bending-moment diagram on the tension side.',
  frame: [[1.8, 2.4], [20.2, 10.6]],
};

const RESOLVE = 10;

const DEFAULTS = {
  A: [4.1108520348, 6.2656753495],          // pin (layout, fixed)
  C: [9.7200694086, 6.2656753495],          // beam tip
  slabTop: 6.8021834061,
  Bx: 7.9603726365,                          // roller x (drag along the soffit)
  AppY: 6.4134302753,                        // A'' level (drag on the slab left edge)
  P1y: 7.1274571266,                         // tent apex (drag on the mid-slab rail)
  railY: [6.5133935810, 7.2060766182],       // apex rail extent (const2)
  FD0: [14.0543886113, 9.4047907667],        // load-line top (drag)
  bandY: 9.0315, bandH: 0.42,                // q band
  railB: 4.2357,                             // bottom H rail level
  R1: 8,                                     // load intensity [5, 10]
  sFD: 9,                                    // scaleForceDiagram [2, 10]
  sLS: 0.27,                                 // scaleLoadSymbol [0.2, 0.5]
  oRF: 0.35,                                 // offsetReactionForces [0, 0.5]
  o: false,                                  // show temporary items (applet checkbox)
  o2: false,                                 // show handles parabola construction
  o3: false,                                 // show R in force diagram
  n4: true,
  node: 0,
  _k: 99,
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'A beam with a cantilever', d: 'left: a pin at A, a roller at B — DRAG B: the beam runs past it, and the load q rides over the whole length including the cantilever' },
  { t: 'Two resultants', d: 'left: the back span weighs R₁, the cantilever R₂ — right: the load line FD₀ → FD₁ → FD₂ (toggle "show R" for the total)' },
  { t: 'The funicular tent and the tie', d: 'left: strings from the draggable anchor A″ through the draggable apex P₁ to B″ — right: parallels through the load-line ends meet at the pole J₁; the pole distance is the TIE force H_tension, the red bar inside the beam' },
  { t: 'The reactions and the H rail', d: 'right: the horizontal through J₁ cuts the load line: A_V above, B below (on the pole column) — and the pole distance drops to the bottom rail as the red H_tension piece' },
  { t: 'Subsystem 1 — the back span alone', d: 'left: only the back span loaded (orange band): by symmetry the pole H sits at mid load line, the tent A″–G₁–B″ is symmetric, and A_V₁ = B₁ = R₁/2 (stacks beside the load line)' },
  { t: 'Subsystem 2 — the cantilever alone', d: 'left: only the cantilever loaded (orange band): the string B″–H₁ and the closing line A″–H₁–C₁′ form ONE straight red line — and the pin reaction A_V₂ points DOWN: the cantilever LIFTS the pin; H_compression appears on the rail (blue)' },
  { t: 'Superposition: H internal = 0', d: 'the red H_tension and blue H_compression pieces on the rail are EQUAL by construction (mirror across the load line): the internal horizontals cancel — A_V = A_V₁ − uplift, B = B₁ + B₂' },
  { t: 'Eight strips per span', d: 'right: each resultant divides into strips with rays to its pole (H for the back span, L₅ for the cantilever) — left: the true funicular a₁ + f₉ walks in, kinking at B by exactly the reaction' },
  { t: 'The moment diagram', d: 'left: mirror the funicular across the A″ level (red): the M-diagram hangs on the tension side — sagging in the span, hogging over the roller — right: the whole force diagram mirrors across the load line' },
  { t: 'Done', d: 'drag B (the cantilever grows), A″, P₁ or FD₀; toggles: show R, show temporary items, parabola handles — click A, B or the apex for its equilibrium' },
];

function inter2(p1, d1, p2, d2) { return V.intersect(p1, d1, p2, d2) || p1; }

function compute(s) {
  const A = s.A, C = s.C;
  const B = [s.Bx, A[1]];
  const App = [A[0], s.AppY];
  const midSlab = (A[0] + C[0]) / 2;
  const P1 = [midSlab, s.P1y];
  const iL = B[0] - A[0], nL = C[0] - B[0];
  const g1 = s.R1 * iL / 2 * s.sFD / 100;
  const g2 = s.R1 * nL / 2 * s.sFD / 100;
  const FD0 = s.FD0;
  const FD1 = [FD0[0], FD0[1] - g1];
  const FD2 = [FD1[0], FD1[1] - g2];
  const Bpp = [B[0], App[1]];

  const J1 = inter2(FD0, V.sub(P1, App), FD2, V.sub(Bpp, P1));
  const K1 = [FD0[0], J1[1]];
  const Hlen = Math.abs(J1[0] - FD0[0]);

  // subsystem 1
  const H = [J1[0], (FD0[1] + FD1[1]) / 2];
  const G1 = inter2(App, V.sub(FD0, H), Bpp, V.sub(H, FD1));
  // subsystem 2
  const E = [(B[0] + C[0]) / 2, A[1]];
  const w = s.R1 * s.sFD / 100 / 2;
  const AV2 = -w * nL * nL / 2 / iL;                 // negative = uplift
  const B2 = g2 - AV2;
  const H1 = inter2(Bpp, [Hlen, B2], [E[0], 0], [0, 1]);
  const C1p = inter2(App, V.sub(H1, App), [C[0], 0], [0, 1]);
  const AV = g1 / 2 + AV2;
  const Bv = g1 + g2 - AV;

  // strips
  const al = [], gl = [];
  for (let k = 1; k < 8; k++) {
    al.push([App[0] + (B[0] - App[0]) * k / 8, 0]);
    gl.push([B[0] + (C[0] - B[0]) * k / 8, 0]);
  }
  const ll1 = [], ll2 = [];
  for (let k = 0; k <= 7; k++) {
    ll1.push([FD0[0], FD0[1] - g1 * k / 7]);
    ll2.push([FD0[0], FD1[1] - g2 * k / 7]);
  }
  const walk = [inter2(App, V.sub(G1, App), al[0], [0, 1])];
  for (let k = 1; k <= 5; k++) {
    walk.push(inter2(walk[walk.length - 1], V.sub(ll1[k], H), al[k], [0, 1]));
  }
  walk.push(inter2(G1, V.sub(Bpp, G1), al[6], [0, 1]));
  const a1 = [App, ...walk, Bpp];
  const L5 = inter2(FD2, V.sub(H1, Bpp), FD1, V.sub(C1p, App));
  const walk2 = [inter2(Bpp, V.sub(H1, Bpp), gl[0], [0, 1])];
  for (let k = 1; k <= 6; k++) {
    walk2.push(inter2(walk2[walk2.length - 1], V.sub(ll2[7 - k], L5), gl[k], [0, 1]));
  }
  const f9 = [Bpp, ...walk2, C1p];

  // mirrors: form across the A'' level, force across the load line
  const my = (p) => [p[0], 2 * App[1] - p[1]];
  const r9 = a1.map(my), s9 = f9.map(my), t9 = [my(App), my(C1p)];
  const mx = (p) => [2 * FD0[0] - p[0], p[1]];
  const Hm = mx(H), Lm = mx(L5);

  const kN = 100 / s.sFD;
  return { A, B, C, App, Bpp, P1, midSlab, E, FD0, FD1, FD2, J1, K1, H, G1,
           H1, C1p, L5, a1, f9, r9, s9, t9, Hm, Lm, mx,
           g1, g2, Hlen, AV, AV2, B2, Bv, iL, nL, kN };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, A: [...DEFAULTS.A], C: [...DEFAULTS.C], FD0: [...DEFAULTS.FD0] };
  let d = compute(s);
  let player = null;

  const W_STR = 0.035, W_FUN = 0.045, W_RAY = 0.014, W_BARH = 0.05;
  const ARROW = { w: 0.045, headLen: 0.2, headW: 0.08 };
  const RED = 0xda2020;
  const tmpW = (base) => (st, dd) => st.o || base(st, dd);   // "show temporary items"
  const always = () => true;

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // step 1 -- slab, supports, q band
  dw.poly('slab', 4, { intro: 1, opacity: 0.10, color: 0x555555, flash: false });
  dw.strokes('slabEdge', 4, { intro: 1, w: 0.012, color: PAL.black, flash: false });
  dw.poly('qband', 4, { intro: 1, opacity: 0.13, color: PAL.green, flash: false });
  dw.strokes('qedge', 4, { intro: 1, w: 0.02, color: PAL.green });
  dw.label('lbl_q', 'q', { intro: 1, color: PAL.green });
  dw.strokes('supA', 6, { intro: 1, w: 0.02, color: PAL.black, flash: false });
  dw.strokes('supB', 6, { intro: 1, w: 0.02, color: PAL.black, flash: false });
  dw.label('lbl_AH', 'A_H = 0', { intro: 1, color: PAL.green, flash: false });
  for (const nm of ['A', 'B', 'C']) {
    dw.disk(`pt_${nm}`, { intro: 1, r: 0.07 });
    dw.label(`lbl_${nm}`, nm, { cls: 'point', intro: 1, when: (st) => st.n4 });
  }

  // step 2 -- resultants + load line
  dw.arrow('loadR1', { intro: 2, ...ARROW });
  dw.arrow('loadR2', { intro: 2, ...ARROW });
  dw.arrow('loadR', { intro: 2, ...ARROW, when: (st) => st.o3 });
  dw.label('lR1', 'R₁', { cls: 'num', intro: 2, color: PAL.green });
  dw.label('lR2', 'R₂', { cls: 'num', intro: 2, color: PAL.green });
  dw.label('lRt', 'R', { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.o3 });
  dw.arrow('edgeR1', { intro: 2, ...ARROW });
  dw.arrow('edgeR2', { intro: 2, ...ARROW });
  dw.label('lRf1', 'R₁', { cls: 'num', intro: 2, color: PAL.green });
  dw.label('lRf2', 'R₂', { cls: 'num', intro: 2, color: PAL.green });
  dw.dashArrow('edgeR', { intro: 2, ...ARROW, dash: 0.16, when: (st) => st.o3 });
  dw.label('lRfT', 'R', { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.o3 });

  // step 3 -- the coarse tent + pole J1 + the tie
  dw.seg('tent1', { intro: 3, outro: 8, w: W_STR, color: PAL.blue, when: tmpW((st) => st._k < 8) });
  dw.seg('tent2', { intro: 3, outro: 8, w: W_STR, color: PAL.blue, when: tmpW((st) => st._k < 8) });
  dw.disk('pt_P1', { intro: 3, r: 0.07 });
  dw.disk('pt_App', { intro: 3, r: 0.07 });
  dw.label('lbl_App', 'A″', { cls: 'point', intro: 3, when: (st) => st.n4 });
  dw.label('lbl_P1', 'P₁', { cls: 'point', intro: 3, when: (st) => st.n4 });
  dw.dashLine('railP', { intro: 3, dash: 0.06, color: 0xafafaf, flash: false });
  dw.seg('rayJ1', { intro: 3, outro: 8, w: W_RAY, color: PAL.grey, when: tmpW((st) => st._k < 8) });
  dw.seg('rayJ2', { intro: 3, outro: 8, w: W_RAY, color: PAL.grey, when: tmpW((st) => st._k < 8) });
  dw.disk('pt_J1', { intro: 3, r: 0.05, when: (st) => st.n4 });
  dw.label('lbl_J1', 'J₁', { cls: 'point', intro: 3, when: (st) => st.n4 });
  dw.seg('tie', { intro: 3, w: W_BARH, color: RED });
  dw.label('lbl_tie', 'H_tension', { intro: 3, color: RED });

  // step 4 -- reactions + bottom H rail
  dw.seg('rayHten', { intro: 4, outro: 5, w: W_RAY, color: RED, when: tmpW((st) => st._k < 5) });
  dw.seg('rayD8', { intro: 5, w: W_RAY, color: RED });
  dw.arrow('reacAV', { intro: 4, ...ARROW, when: (st, dd) => Math.abs(dd.AV) > 0.02 });
  dw.arrow('reacB', { intro: 4, ...ARROW });
  dw.label('lAV', 'A_V', { cls: 'num', intro: 4, color: PAL.green,
           when: (st, dd) => Math.abs(dd.AV) > 0.02 });
  dw.label('lB', 'B', { cls: 'num', intro: 4, color: PAL.green });
  dw.arrow('formAV', { intro: 4, ...ARROW });
  dw.arrow('formB', { intro: 4, ...ARROW });
  dw.label('lAVf', 'A_V', { cls: 'num', intro: 4, color: PAL.green });
  dw.label('lBf', 'B', { cls: 'num', intro: 4, color: PAL.green });
  dw.dashLine('railBot', { intro: 4, dash: 0.1, color: 0x9db8d2, flash: false });
  dw.seg('hTen', { intro: 4, w: W_BARH, color: RED });
  dw.label('lbl_hTen', 'H_tension', { intro: 4, color: RED });
  dw.dashLine('dropT', { intro: 4, dash: 0.05, color: 0x9a9a9a, flash: false });

  // step 5 -- subsystem 1 (temporary: retires at 7, comes back with 'o')
  const sub1W = tmpW((st) => st._k >= 5 && st._k < 7);
  dw.poly('band1', 4, { intro: 5, opacity: 0.12, color: PAL.orange, flash: false, when: sub1W });
  dw.seg('s1a', { intro: 5, w: W_STR, color: PAL.blue });
  dw.seg('s1b', { intro: 5, w: W_STR, color: PAL.blue });
  dw.disk('pt_H', { intro: 5, r: 0.05, when: (st) => st.n4 });
  dw.label('lbl_H', 'H', { cls: 'point', intro: 5, when: (st) => st.n4 });
  dw.disk('pt_G1', { intro: 5, r: 0.05, when: sub1W });
  dw.label('lbl_G1', 'G₁', { cls: 'point', intro: 5, when: sub1W });
  dw.seg('s1r1', { intro: 5, w: W_RAY, color: PAL.blue });
  dw.seg('s1r2', { intro: 5, w: W_RAY, color: PAL.blue });
  dw.arrow('s1AV1', { intro: 5, ...ARROW, when: sub1W });
  dw.arrow('s1B1', { intro: 5, ...ARROW, when: sub1W });
  dw.label('lAV1', 'A_V₁', { cls: 'num', intro: 5, color: PAL.green, when: sub1W });
  dw.label('lB1', 'B₁', { cls: 'num', intro: 5, color: PAL.green, when: sub1W });

  // step 6 -- subsystem 2 (temporary likewise)
  const sub2W = tmpW((st) => st._k >= 6 && st._k < 7);
  dw.poly('band2', 4, { intro: 6, opacity: 0.12, color: PAL.orange, flash: false, when: sub2W });
  dw.seg('s2a', { intro: 6, w: W_STR, color: PAL.blue });      // B''-H1 (persists)
  dw.seg('closeL', { intro: 6, w: W_STR, color: RED });                     // A''-H1-C1' stays
  dw.disk('pt_H1', { intro: 6, r: 0.05, when: (st) => st.n4 });
  dw.label('lbl_H1', 'H₁', { cls: 'point', intro: 6, when: (st) => st.n4 });
  dw.arrow('s2AV2', { intro: 6, ...ARROW, when: sub2W });
  dw.arrow('s2B2', { intro: 6, ...ARROW, when: sub2W });
  dw.label('lAV2', 'A_V₂', { cls: 'num', intro: 6, color: PAL.green, when: sub2W });
  dw.label('lB2', 'B₂', { cls: 'num', intro: 6, color: PAL.green, when: sub2W });
  dw.seg('hCom', { intro: 6, w: W_BARH, color: PAL.blue });
  dw.label('lbl_hCom', 'H_compression', { intro: 6, color: PAL.blue });
  dw.dashLine('dropC', { intro: 6, dash: 0.05, color: 0x9a9a9a, flash: false });
  dw.seg('s2ray', { intro: 6, w: W_RAY, color: RED, when: sub2W });

  // step 8 -- strips + refined funiculars
  dw.strokes('fan1', 6, { intro: 8, w: W_RAY, color: PAL.grey, flash: false,
             when: tmpW((st) => st.o2 || st._k === 8) });
  dw.strokes('fan2', 6, { intro: 8, w: W_RAY, color: PAL.grey, flash: false,
             when: tmpW((st) => st.o2 || st._k === 8) });
  dw.strokes('fun1', 8, { intro: 8, w: W_FUN, color: PAL.blue });
  dw.strokes('fun2', 8, { intro: 8, w: W_FUN, color: PAL.blue });
  dw.disk('pt_L5', { intro: 8, r: 0.05, when: (st) => st.o2 });
  dw.label('lbl_L5', 'L₅', { cls: 'point', intro: 8, when: (st) => st.o2 });

  // step 9 -- the M mirror (retires at resolve; 'o' brings it back)
  const mirW = tmpW((st) => st._k === 9);
  dw.strokes('mdia1', 8, { intro: 9, w: W_FUN, color: RED, when: mirW });
  dw.strokes('mdia2', 8, { intro: 9, w: W_FUN, color: RED, when: mirW });
  dw.seg('mchord', { intro: 9, w: W_STR, color: PAL.blue, when: mirW });
  dw.label('lbl_M', 'M', { intro: 9, color: RED, when: mirW });
  dw.seg('mray1', { intro: 9, w: W_RAY, color: RED, when: mirW });
  dw.seg('mray2', { intro: 9, w: W_RAY, color: RED, when: mirW });
  dw.seg('mray3', { intro: 9, w: W_RAY, color: RED, when: mirW });
  dw.seg('mray4', { intro: 9, w: W_RAY, color: RED, when: mirW });
  dw.arrow('mreacB', { intro: 9, ...ARROW, when: mirW });
  dw.label('lBm', 'B', { cls: 'num', intro: 9, color: PAL.green, when: mirW });

  // readouts
  for (let i = 0; i < 4; i++) {
    dw.label(`ro${i}`, '', { intro: 4, flash: false, color: PAL.green });
  }
  dw.label('roH', '', { intro: 4, flash: false, color: RED });

  dw.nodeInspector(4, { when: (st) => st.node > 0, w: 0.055,
                        headLen: 0.2, headW: 0.08, r: 0.07 });

  dw.link('loadR1', 'edgeR1', 'lR1', 'lRf1');
  dw.link('loadR2', 'edgeR2', 'lR2', 'lRf2');
  dw.link('loadR', 'edgeR', 'lRt', 'lRfT');
  dw.link('tent1', 'rayJ1'); dw.link('tent2', 'rayJ2');
  dw.link('tie', 'rayHten', 'lbl_tie');
  dw.link('formAV', 'reacAV', 'lAVf', 'lAV');
  dw.link('formB', 'reacB', 'lBf', 'lB');
  dw.link('s1a', 's1r1'); dw.link('s1b', 's1r2');
  dw.link('s2a', 's2ray');
  dw.link('fun1', 'fan1'); dw.link('fun2', 'fan2');
  dw.ghostable('edgeR1', 'edgeR2', 'reacAV', 'reacB', 's1r1', 's1r2',
               'rayD8', 'hTen', 'hCom');

  // ------------------------------------------------------------------
  function pairs(pts) {
    const out = [];
    for (let i = 0; i + 1 < pts.length; i++) out.push([pts[i], pts[i + 1]]);
    return out;
  }

  function update() {
    dw.setLabel('form_title', [2.4, 10.25]);
    dw.setLabel('force_title', [12.7, 10.25]);
    dw.setLabel('force_sub', [12.7, 9.9]);
    dw.setText('force_sub', `1 unit :: ${d.kN.toFixed(1)} kN`);

    const A = d.A, C = d.C, B = d.B;
    const sl = [[A[0], s.slabTop], [C[0], s.slabTop], [C[0], A[1]], [A[0], A[1]]];
    dw.setPoly('slab', sl);
    dw.setStrokes('slabEdge', pairs([...sl, sl[0]]));
    const qb = [[A[0], s.bandY], [C[0], s.bandY], [C[0], s.bandY + s.bandH], [A[0], s.bandY + s.bandH]];
    dw.setPoly('qband', qb);
    dw.setStrokes('qedge', pairs([...qb, qb[0]]));
    dw.setLabel('lbl_q', [A[0] - 0.45, s.bandY + 0.2]);
    dw.setLabel('lbl_AH', [A[0] - 1.6, A[1] - 0.9]);
    const sup = (x, y) => [[[x - 0.18, y - 0.45], [x, y]], [[x, y], [x + 0.18, y - 0.45]],
      [[x - 0.26, y - 0.45], [x + 0.26, y - 0.45]],
      [[x - 0.2, y - 0.56], [x - 0.08, y - 0.56]],
      [[x - 0.02, y - 0.56], [x + 0.1, y - 0.56]],
      [[x + 0.14, y - 0.56], [x + 0.26, y - 0.56]]];
    dw.setStrokes('supA', sup(A[0], A[1]));
    // roller at B: triangle on a free line (no ground hatch)
    const rol = (x, y) => [[[x - 0.18, y - 0.45], [x, y]], [[x, y], [x + 0.18, y - 0.45]],
      [[x - 0.26, y - 0.45], [x + 0.26, y - 0.45]],
      [[x - 0.26, y - 0.58], [x + 0.26, y - 0.58]],
      [[x, y], [x, y]], [[x, y], [x, y]]];
    dw.setStrokes('supB', rol(B[0], A[1]));
    dw.setDisk('pt_A', A); dw.setDisk('pt_B', B); dw.setDisk('pt_C', C);
    dw.setLabel('lbl_A', V.add(A, [-0.3, 0.14]));
    dw.setLabel('lbl_B', V.add(B, [0.1, 0.2]));
    dw.setLabel('lbl_C', V.add(C, [0.14, 0.14]));

    // resultants + load line
    const Dx = (A[0] + B[0]) / 2;
    dw.setArrow('loadR1', [Dx, s.bandY - 0.15], [Dx, s.slabTop + 0.6]);
    dw.setArrow('loadR2', [d.E[0], s.bandY - 0.15], [d.E[0], s.slabTop + 0.6]);
    dw.setArrow('loadR', [d.midSlab, s.bandY - 0.15], [d.midSlab, s.slabTop + 0.25]);
    dw.setLabel('lR1', [Dx + 0.14, s.bandY - 0.6]);
    dw.setLabel('lR2', [d.E[0] + 0.14, s.bandY - 0.6]);
    dw.setLabel('lRt', [d.midSlab + 0.14, s.bandY - 1.0]);
    dw.setArrow('edgeR1', d.FD0, d.FD1);
    dw.setArrow('edgeR2', d.FD1, d.FD2);
    dw.setLabel('lRf1', V.add(V.mid(d.FD0, d.FD1), [0.18, 0]));
    dw.setLabel('lRf2', V.add(V.mid(d.FD1, d.FD2), [0.18, 0]));
    dw.setDashArrow('edgeR', V.add(d.FD0, [0.55, 0]), V.add(d.FD2, [0.55, 0]));
    dw.setLabel('lRfT', V.add(V.mid(d.FD0, d.FD2), [0.75, 0]));

    // tent + pole + tie
    dw.setSeg('tent1', d.App, d.P1);
    dw.setSeg('tent2', d.P1, d.Bpp);
    dw.setDisk('pt_P1', d.P1); dw.setDisk('pt_App', d.App);
    dw.setLabel('lbl_App', V.add(d.App, [-0.35, 0.12]));
    dw.setLabel('lbl_P1', V.add(d.P1, [0.1, 0.18]));
    dw.setDashLine('railP', [[d.midSlab, s.railY[0]], [d.midSlab, s.railY[1]]]);
    dw.setSeg('rayJ1', d.FD0, d.J1);
    dw.setSeg('rayJ2', d.FD2, d.J1);
    dw.setDisk('pt_J1', d.J1);
    dw.setLabel('lbl_J1', V.add(d.J1, [-0.4, 0.14]));
    dw.setSeg('tie', d.App, d.Bpp);
    dw.setLabel('lbl_tie', [d.App[0] + (d.Bpp[0] - d.App[0]) * 0.3, d.App[1] - 0.32]);

    // reactions + rail
    dw.setSeg('rayHten', d.J1, d.K1);
    dw.setSeg('rayD8', d.H, d.K1);
    const off = [s.oRF, 0];
    dw.setArrow('reacAV', V.add(d.K1, off), V.add(d.FD0, off));
    dw.setArrow('reacB', [d.J1[0], d.FD2[1]], [d.J1[0], d.FD2[1] + d.Bv]);
    dw.setLabel('lAV', V.add(V.mid(d.K1, d.FD0), [s.oRF + 0.18, 0]));
    dw.setLabel('lB', [d.J1[0] + 0.16, d.FD2[1] + d.Bv / 2]);
    dw.setArrow('formAV', [A[0], A[1] - 1.35], [A[0], A[1] - 0.62]);
    dw.setArrow('formB', [B[0], A[1] - 1.35], [B[0], A[1] - 0.62]);
    dw.setLabel('lAVf', [A[0] + 0.14, A[1] - 1.05]);
    dw.setLabel('lBf', [B[0] + 0.14, A[1] - 1.05]);
    dw.setDashLine('railBot', [[d.J1[0] - 0.7, s.railB], [d.FD0[0] + d.Hlen + 0.7, s.railB]]);
    dw.setSeg('hTen', [d.J1[0], s.railB], [d.FD0[0], s.railB]);
    dw.setLabel('lbl_hTen', [(d.J1[0] + d.FD0[0]) / 2 - 0.5, s.railB - 0.3]);
    dw.setDashLine('dropT', [[d.J1[0], d.J1[1]], [d.J1[0], s.railB]]);

    // subsystem 1
    dw.setPoly('band1', [[A[0], s.bandY], [B[0], s.bandY], [B[0], s.bandY + s.bandH], [A[0], s.bandY + s.bandH]]);
    dw.setSeg('s1a', d.App, d.G1);
    dw.setSeg('s1b', d.G1, d.Bpp);
    dw.setDisk('pt_H', d.H);
    dw.setLabel('lbl_H', V.add(d.H, [-0.38, 0.1]));
    dw.setDisk('pt_G1', d.G1);
    dw.setLabel('lbl_G1', V.add(d.G1, [0, -0.3]));
    dw.setSeg('s1r1', d.FD0, d.H);
    dw.setSeg('s1r2', d.FD1, d.H);
    dw.setArrow('s1AV1', V.add([d.FD0[0], d.H[1]], off), V.add(d.FD0, off));
    dw.setArrow('s1B1', V.add(d.FD1, off), V.add([d.FD0[0], d.H[1]], off));
    dw.setLabel('lAV1', [d.FD0[0] + s.oRF + 0.16, (d.FD0[1] + d.H[1]) / 2]);
    dw.setLabel('lB1', [d.FD0[0] + s.oRF + 0.16, (d.FD1[1] + d.H[1]) / 2]);

    // subsystem 2
    dw.setPoly('band2', [[B[0], s.bandY], [C[0], s.bandY], [C[0], s.bandY + s.bandH], [B[0], s.bandY + s.bandH]]);
    dw.setSeg('s2a', d.Bpp, d.H1);
    dw.setSeg('closeL', d.App, d.C1p);
    dw.setDisk('pt_H1', d.H1);
    dw.setLabel('lbl_H1', V.add(d.H1, [0.08, -0.28]));
    const av2t = [d.FD0[0], d.FD0[1] - d.AV2];                 // above FD0 (AV2 < 0)
    // the uplift reads DOWNWARD on the stack: tail above, tip at FD0
    dw.setArrow('s2AV2', V.add(av2t, [2 * s.oRF, 0]), V.add(d.FD0, [2 * s.oRF, 0]));
    dw.setArrow('s2B2', V.add(d.FD2, [2 * s.oRF, 0]), V.add([d.FD0[0], d.FD2[1] + d.B2], [2 * s.oRF, 0]));
    dw.setLabel('lAV2', [d.FD0[0] + 2 * s.oRF + 0.16, d.FD0[1] - d.AV2 / 2]);
    dw.setLabel('lB2', [d.FD0[0] + 2 * s.oRF + 0.16, d.FD2[1] + d.B2 / 2]);
    dw.setSeg('hCom', [d.FD0[0], s.railB], [d.FD0[0] + d.Hlen, s.railB]);
    dw.setLabel('lbl_hCom', [d.FD0[0] + d.Hlen / 2 - 0.55, s.railB - 0.3]);
    dw.setDashLine('dropC', [[d.FD0[0] + d.Hlen, d.FD2[1]], [d.FD0[0] + d.Hlen, s.railB]]);
    dw.setSeg('s2ray', d.FD1, d.L5);

    // strips + funiculars
    const l1pts = [], l2pts = [];
    for (let k = 1; k <= 6; k++) {
      l1pts.push([[d.FD0[0], d.FD0[1] - d.g1 * k / 7], d.H]);
      l2pts.push([[d.FD0[0], d.FD1[1] - d.g2 * k / 7], d.L5]);
    }
    dw.setStrokes('fan1', l1pts);
    dw.setStrokes('fan2', l2pts);
    dw.setStrokes('fun1', pairs(d.a1));
    dw.setStrokes('fun2', pairs(d.f9));
    dw.setDisk('pt_L5', d.L5);
    dw.setLabel('lbl_L5', V.add(d.L5, [0.1, 0.14]));

    // mirror
    dw.setStrokes('mdia1', pairs(d.r9));
    dw.setStrokes('mdia2', pairs(d.s9));
    dw.setSeg('mchord', d.t9[0], d.t9[1]);
    dw.setLabel('lbl_M', [Dx, 2 * d.App[1] - d.a1[4][1] - 0.35]);
    dw.setSeg('mray1', d.FD0, d.Hm);
    dw.setSeg('mray2', d.FD1, d.Hm);
    dw.setSeg('mray3', d.FD1, d.Lm);
    dw.setSeg('mray4', d.FD2, d.Lm);
    dw.setArrow('mreacB', [d.Hm[0], d.FD2[1]], [d.Hm[0], d.FD2[1] + d.Bv]);
    dw.setLabel('lBm', [d.Hm[0] + 0.16, d.FD2[1] + d.Bv / 2]);

    // readouts
    dw.setLabel('ro0', [17.2, 10.25]);
    dw.setText('ro0', `A_V = ${(d.AV * d.kN).toFixed(1)} kN`);
    dw.setLabel('ro1', [17.2, 9.9]);
    dw.setText('ro1', `B = ${(d.Bv * d.kN).toFixed(1)} kN`);
    dw.setLabel('ro2', [17.2, 9.55]);
    dw.setText('ro2', `A_V₂ = ${(d.AV2 * d.kN).toFixed(1)} kN (uplift)`);
    dw.setLabel('ro3', [17.2, 9.2]);
    dw.setText('ro3', `R₁ = ${(d.g1 * d.kN).toFixed(1)}, R₂ = ${(d.g2 * d.kN).toFixed(1)} kN`);
    dw.setLabel('roH', [17.2, 8.85]);
    dw.setText('roH', `H = ${(d.Hlen * d.kN).toFixed(1)} kN — tension = compression`);

    updateNode();
  }

  // node equilibrium: pin A (the superposition!), roller B, apex P1
  const NODES = ['A', 'B', 'P1'];
  const NLBL = ['pin A: A_V = A_V₁ − uplift', 'roller B: B = B₁ + B₂', 'apex P₁'];
  function nodeSides(nm) {
    const off = [s.oRF, 0], off2 = [2 * s.oRF, 0];
    switch (nm) {
      case 'A': return [[V.add([d.FD0[0], d.H[1]], off), V.add(d.FD0, off)],
                        [V.add(d.FD0, off2), V.add([d.FD0[0], d.FD0[1] - d.AV2], off2)],
                        [V.add(d.K1, off), V.add(d.FD0, off)]];
      case 'B': return [[V.add(d.FD1, off), V.add([d.FD0[0], d.H[1]], off)],
                        [V.add(d.FD2, off2), V.add([d.FD0[0], d.FD2[1] + d.B2], off2)],
                        [[d.J1[0], d.FD2[1]], [d.J1[0], d.FD2[1] + d.Bv]]];
      case 'P1': return [[d.FD0, d.FD2], [d.FD2, d.J1], [d.J1, d.FD0]];
      default: return [];
    }
  }
  const NAT = () => ({ A: d.A, B: d.B, P1: d.P1 });
  function updateNode() {
    const n = Math.max(1, Math.round(s.node));
    const nm = NODES[n - 1];
    dw.selectDisk(s.node > 0 ? { A: 'pt_A', B: 'pt_B', P1: 'pt_P1' }[nm] : null);
    dw.setNodeInspector(NAT()[nm], 0.95, s.node > 0 ? NLBL[n - 1] : '', nodeSides(nm));
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
  panel.toggle(view, s, 'o2', 'show handles parabola construction', refresh);
  panel.toggle(view, s, 'o3', 'show R in force diagram', refresh);
  const par = panel.section('Parameters');
  panel.slider(par, s, 'R1', 'R1 — load intensity (kN/m)', 5, 10, 0.1, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram', 2, 10, 0.1, refresh);
  panel.slider(par, s, 'oRF', 'offset reaction forces', 0, 0.5, 0.02, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 0.2, 0.5, 0.01, refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off; pin A, roller B, apex)', 0, 3, 1, refresh);

  const hits = [
    ['B', () => d.B, 1, 99], ['App', () => d.App, 3, 99],
    ['P1', () => d.P1, 3, 99], ['FD0', () => d.FD0, 2, 99],
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
      if (name === 'B') s.Bx = Math.min(Math.max(wx, d.midSlab), d.C[0] - 0.35);
      else if (name === 'App') s.AppY = Math.min(Math.max(wy, d.A[1] + 0.02), s.slabTop - 0.05);
      else if (name === 'P1') s.P1y = Math.min(Math.max(wy, s.railY[0]), s.railY[1]);
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
