/**
 * Drawing view/46 "Internal forces in a beam – point load"
 * (https://block.arch.ethz.ch/eq/drawing/view/46) as a step-by-step
 * construction: a simply supported beam A-B with a point load F at C.
 * A grey trial funicular from any pole o' locates the division point c on
 * the load line a-b (the reaction split A_V = c->a, B_V = b->c). The shear
 * diagram is the horizontal projection of a, c, b below the beam. Choosing
 * the pole o at distance H LEFT of the load line AT THE LEVEL OF c makes
 * the closing line of the funicular through both supports horizontal, so
 * the funicular polygon drawn from the baseline L1-L2 directly gives the
 * bending moment: M(x) = H * y(x), mirrored below the baseline (red).
 *
 * Live port of view_46/applet_0/geogebra.xml (no mode/step sliders in the
 * original -- everything shows at once; we stage it). Full chain (trial
 * funicular, division point, V-levels, pole, funicular, 10 sampled M
 * ordinates, offset reaction chain) regression-checked against the live
 * applet to ~9e-14 in four states (default, dragged C, F/H/scale, offset).
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 46 — Internal forces in a beam: point load',
  subtitle: 'shear and bending moment diagrams from the funicular polygon',
  about: 'A point load F on a simply supported beam. A grey trial funicular finds the division point c on the load line — the split of the reactions — and the shear diagram is nothing but the horizontal projection of the levels a, c, b below the beam. Placing the pole o at distance H left of the load line at the level of c makes the closing line horizontal, and the funicular polygon drawn from the baseline becomes the bending moment diagram: M(x) = H · y(x).',
  frame: [[-8.2, -19.8], [30.8, 3.6]],
};

const RED = 0xff0000;                     // the applet's V/M-diagram red
const TOPY = 1.9687, BOTY = -18.589;      // the three dotted verticals span these
const RESOLVE = 19;

const DEFAULTS = {
  xB: 9.905492036916437,                  // support B on the beam axis
  xC: 4.867604132661699,                  // load position C on the beam
  dy: -2.07184430147932,                  // trial funicular start D (left support vertical)
  ly: -13.188511276788466,                // M-diagram baseline level (point L1)
  gx: 18.98071300445461,                  // load line top a (point G)
  gy: -4.608842988790536,
  ix: 24.812455276262156,                 // trial pole o' (point I)
  iy: -6.817499531942296,
  F: 2,                                   // F_d [1, 5] kN
  H: 3,                                   // pole distance [1, 5] units
  sFD: 0.5,                               // scaleForceDiagram [0.5, 5] kN/unit
  sLS: 1.3,                               // scaleLoadSymbol [0.1, 2]
  off: 0.5,                               // scaleOffsetReactionForces [0, 2]
  bow: false,                             // show Bow notation (applet: showBow)
  n4: true,                               // show points
  node: 0,                                // node-equilibrium inspector (0 = off)
};

// every construction move happens on BOTH sides at once
const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The beam', d: 'left: a simply supported beam A–B — the dotted verticals through the supports will organize the beam, the V-diagram and the M-diagram above each other' },
  { t: 'The load — in both diagrams', d: 'left: the point load F on the beam at C, with its line of action — right: F laid off downward on the load line, from a to b' },
  { t: 'Trial pole o′', d: 'right: place a trial pole o′ anywhere, with grey rays to the ends a and b of the load line' },
  { t: 'Trial string 1', d: 'left: start at D anywhere on the left support vertical and draw parallel to ray a–o′, up to the line of action of F' },
  { t: 'Trial string 2', d: 'left: continue parallel to ray o′–b to the right support vertical → K' },
  { t: 'Closing the trial → point c', d: 'left: dashed closing line K–D — right: the parallel to it through o′ cuts the load line at c: the division point of the reactions, the same for ANY trial pole' },
  { t: 'Reactions A_V and B_V', d: 'right: c splits the load line: A_V = c→a and B_V = b→c, offset beside it — left: the same forces push up at the supports' },
  { t: 'V-diagram — the baseline', d: 'left: below the beam, a baseline at the height of c — the shear V(x) will be read between the horizontal projections of the load-line points a, c and b' },
  { t: 'V-diagram — left of the load', d: 'left: from A to C the shear is constant, +A_V: the strip between the baseline (level c) and level a — right: exactly the reaction segment c→a' },
  { t: 'V-diagram — right of the load', d: 'left: at C the load F drops the shear by F to −B_V (level b); at B the reaction closes it back to the baseline — right: the segment b→c' },
  { t: 'Pole distance H', d: 'right: choose the pole distance H, horizontally to the left of b — it will become the scale of the moment diagram' },
  { t: 'The pole o', d: 'right: go up from M to the height of c → pole o; because o sits at the level of the division point c, the closing ray o–c is horizontal' },
  { t: 'M-diagram — the closing line', d: 'left: the baseline L₁–L₂ under the beam: the funicular polygon through both supports will close on this horizontal — the dual of the horizontal ray o–c' },
  { t: 'String 1 — form and force', d: 'right: ray from o to a — left: from the baseline at the left support, draw funicular string 1 parallel to it, up to the line of action of F' },
  { t: 'String 2 — form and force', d: 'right: ray from o to b — left: string 2 parallel to it returns exactly to the baseline at the right support: the funicular polygon closes' },
  { t: 'The funicular ordinates y', d: 'left: the ordinate y(x) between the closing line and the funicular polygon, measured at ten stations — right: every string was drawn under the pole distance H' },
  { t: 'M = H · y', d: 'left: each ordinate is scaled by H (× the force scale) and mirrored below the baseline: the bending moment M(x) = H · y(x), drawn on the tension side' },
  { t: 'The M-diagram', d: 'left: connecting the scaled ordinates gives the bending-moment diagram: linear on both sides of the load, maximum right under it — M_max = A_V · |AC|' },
  { t: 'Internal forces from the funicular', d: 'drag C, B, o′, D, the pole o or the sliders — the V- and M-diagrams follow; click a funicular node (or use the node slider) to read its equilibrium',
    detail: (d) => [`A_V = ${d.AVkn.toFixed(1)} · B_V = ${d.BVkn.toFixed(1)} kN — M_max = ${d.Mmax.toFixed(1)} kNm`],
    take: 'V and M are not new machinery — both fall straight out of the funicular polygon of the load' },
];

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const A = [0, 0], B = [s.xB, 0], C = [s.xC, 0];
  const G = [s.gx, s.gy];                                       // load line top 'a'
  const H1 = [s.gx, s.gy - s.F / s.sFD];                        // load line bottom 'b'
  const I = [s.ix, s.iy];                                       // trial pole o'
  const D = [0, s.dy];                                          // trial start

  // trial funicular: from D || a-o' to the load's line of action, then || o'-b
  const dxI = (I[0] - G[0]) || 1e-9;
  const J = [s.xC, s.dy + s.xC * ((I[1] - G[1]) / dxI)];
  const K = [s.xB, J[1] + (s.xB - s.xC) * ((H1[1] - I[1]) / (G[0] - I[0] || 1e-9))];
  // the parallel to the closing K-D through o' cuts the load line at c
  const N = [s.gx, I[1] + (s.gx - I[0]) * ((K[1] - D[1]) / s.xB)];

  // pole o: distance H left of b, raised to the level of c
  const M = [s.gx - s.H, H1[1]];
  const O = [s.gx - s.H, N[1]];

  // V-diagram: horizontal projections of a, c, b between the support verticals
  const P = [0, N[1]], Q = [s.xB, N[1]];                        // baseline (level c)
  const R = [0, G[1]], T = [s.xC, G[1]];                        // level a
  const U = [s.xC, H1[1]], S = [s.xB, H1[1]];                   // level b

  // funicular polygon from the baseline L1-L2 (closing line horizontal!):
  // string 1 through L1 || ray a-o, string 2 through L2 || ray o-b -- they
  // meet exactly under the load because o sits at the level of c
  const L1 = [0, s.ly], L2 = [s.xB, s.ly];
  const FPM = V.intersect(L1, V.sub(O, G), L2, V.sub(H1, O)) || [s.xC, s.ly];

  // ten sampled stations: funicular ordinate y -> moment ordinate H*y (mirrored)
  const GPs = [], FPs = [], MPs = [];
  for (let k = 0; k < 10; k++) {
    const x = (s.xB / 10) * (k + 0.5);
    const fy = x <= FPM[0]
      ? s.ly + x * ((FPM[1] - s.ly) / (FPM[0] || 1e-9))
      : s.ly + (x - s.xB) * ((FPM[1] - s.ly) / (FPM[0] - s.xB || -1e-9));
    GPs.push([x, s.ly]);
    FPs.push([x, fy]);
    MPs.push([x, s.ly - (fy - s.ly) * s.sFD * s.H]);
  }
  const MPM = [s.xC, s.ly - (FPM[1] - s.ly) * s.sFD * s.H];     // moment peak

  // M-diagram outline: L1 -> MPs with MPM inserted at the load -> L2
  const chain = [L1];
  for (let k = 0; k < 10; k++) {
    if (k > 0 && GPs[k - 1][0] < s.xC && s.xC <= GPs[k][0]) chain.push(MPM);
    chain.push(MPs[k]);
  }
  if (s.xC <= GPs[0][0]) chain.splice(1, 0, MPM);
  if (s.xC > GPs[9][0]) chain.push(MPM);
  chain.push(L2);

  // offset reaction chain beside the load line (scaleOffsetReactionForces)
  const C1 = [H1[0] + s.off, H1[1]];                            // b, offset
  const D1 = [N[0] + s.off, N[1]];                              // c, offset
  const F1 = [G[0] + s.off, G[1]];                              // a, offset

  const AVkn = (G[1] - N[1]) * s.sFD;                           // c->a
  const BVkn = (N[1] - H1[1]) * s.sFD;                          // b->c
  const Hkn = s.H * s.sFD;
  const Mmax = (FPM[1] - s.ly) * s.sFD * s.H;                   // = A_V * |AC| kNm

  return { A, B, C, G, H1, I, D, J, K, N, M, O, P, Q, R, T, U, S,
           L1, L2, FPM, GPs, FPs, MPs, MPM, chain, C1, D1, F1,
           AVkn, BVkn, Hkn, Mmax };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);

  const W_BAR = 0.16;                     // th3 (beam, V/M outlines, baselines)
  const W_MEM = 0.115;                    // th2 (rays, funicular strings)
  const W_TRI = 0.09;                     // trial construction
  const ARROW = { w: 0.22, headLen: 0.6, headW: 0.26 };

  // region titles (the applet's text6..text10)
  dw.label('t_form', 'Form Diagram', { cls: 'title', flash: false, intro: 1 });
  dw.label('t_form2', '1 unit :: 1 m', { flash: false, intro: 1 });
  dw.label('t_force', 'Force Diagram', { cls: 'title', flash: false, intro: 2 });
  dw.label('t_force2', '', { flash: false, intro: 2 });
  dw.label('t_trial', 'Trial Funicular', { cls: 'title', flash: false, intro: 4 });
  dw.label('t_trial2', 'Construction', { flash: false, intro: 4 });
  dw.label('t_v', 'V - Diagram', { cls: 'title', flash: false, intro: 8 });
  dw.label('t_v2', '1 unit :: 1 kN', { flash: false, intro: 8 });
  dw.label('t_m', 'M - Diagram', { cls: 'title', flash: false, intro: 13 });
  dw.label('t_m2', '1 unit :: 1 kNm', { flash: false, intro: 13 });

  // step 1: the beam + the dotted verticals through the supports
  dw.seg('beam', { intro: 1, w: W_BAR });
  dw.dashLine('vertA', { intro: 1, dash: 0.28, color: PAL.black });
  dw.dashLine('vertB', { intro: 1, dash: 0.28, color: PAL.black });
  dw.label('lbl_A', 'A', { cls: 'point', intro: 1 });
  dw.label('lbl_B', 'B', { cls: 'point', intro: 1 });

  // step 2: the load at C (left) TOGETHER with the load line a-b (right)
  dw.dashLine('vertC', { intro: 2, dash: 0.28, color: PAL.black });
  dw.arrow('ldF', { intro: 2, ...ARROW });
  dw.label('lblFf', 'F', { intro: 2, color: PAL.green });
  dw.arrow('uF', { intro: 2, ...ARROW });
  dw.label('lblFo', 'F', { intro: 2, color: PAL.green });
  dw.label('lbl_C', 'C', { cls: 'point', intro: 2 });
  dw.label('lbl_a', 'a', { cls: 'point', intro: 2 });
  dw.label('lbl_b', 'b', { cls: 'point', intro: 2 });
  // Bow notation (the applet's showBow checkbox, default off)
  const bowOn = (st) => st.bow;
  dw.label('bowA', 'A', { intro: 2, when: bowOn });
  dw.label('bowB', 'B', { intro: 2, when: bowOn });
  dw.label('bowC', 'C', { intro: 2, when: bowOn });
  dw.label('bowa', 'a', { intro: 2, when: bowOn });

  // steps 3-6: the grey trial (kept to the end)
  dw.seg('trf', { intro: 3, w: W_TRI, color: PAL.grey });       // ray a-o'
  dw.seg('trg', { intro: 3, w: W_TRI, color: PAL.grey });       // ray o'-b
  dw.label('lbl_I', 'o′', { cls: 'point', intro: 3 });
  dw.seg('tj', { intro: 4, w: W_TRI, color: PAL.grey });        // D-J
  dw.label('lbl_D', 'D', { cls: 'point', intro: 4 });
  dw.seg('tk', { intro: 5, w: W_TRI, color: PAL.grey });        // J-K
  dw.dashLine('tl', { intro: 6, dash: 0.5 });                   // closing K-D
  dw.dashLine('tt', { intro: 6, dash: 0.5 });                   // o' -> c parallel
  dw.label('lbl_Otr', 'O′', { intro: 6, color: PAL.grey });
  dw.label('lbl_c', 'c', { cls: 'point', intro: 6 });
  dw.highlight('trf', [4]);
  dw.highlight('trg', [5]);

  // step 7: reactions at the supports + the offset chain beside the load line
  dw.arrow('reA', { intro: 7, ...ARROW });
  dw.arrow('reB', { intro: 7, ...ARROW });
  dw.label('lblAVf', 'A_V', { intro: 7, color: PAL.green });
  dw.label('lblBVf', 'B_V', { intro: 7, color: PAL.green });
  dw.arrow('ofBV', { intro: 7, ...ARROW, when: () => Math.abs(d.BVkn) > 1e-6 });
  dw.arrow('ofAV', { intro: 7, ...ARROW, when: () => Math.abs(d.AVkn) > 1e-6 });
  dw.label('lblBVo', 'B_V', { intro: 7, color: PAL.green, when: () => Math.abs(d.BVkn) > 1e-6 });
  dw.label('lblAVo', 'A_V', { intro: 7, color: PAL.green, when: () => Math.abs(d.AVkn) > 1e-6 });
  dw.dashLine('wG', { intro: 7, dash: 0.3, color: PAL.green }); // a -> offset whiskers
  dw.dashLine('wH', { intro: 7, dash: 0.3, color: PAL.green });
  dw.dashLine('wN', { intro: 7, dash: 0.3, color: PAL.green });

  // steps 8-10: the V-diagram (the applet's red, baseline black)
  dw.seg('vbase', { intro: 8, w: W_BAR });                      // P-Q at level c
  dw.highlight('tt', [8]);
  dw.highlight('lbl_c', [8]);
  dw.seg('v1', { intro: 9, w: W_BAR, color: RED });             // P-R jump +A_V
  dw.seg('v2', { intro: 9, w: W_BAR, color: RED });             // R-T level a
  dw.dashLine('gk1', { intro: 9, dash: 0.28, color: PAL.black }); // T -> a guide
  dw.highlight('reA', [9]);
  dw.highlight('ofAV', [9]);
  dw.seg('v3', { intro: 10, w: W_BAR, color: RED });            // T-U drop by F
  dw.seg('v4', { intro: 10, w: W_BAR, color: RED });            // U-S level b
  dw.seg('v5', { intro: 10, w: W_BAR, color: RED });            // S-Q close at B
  dw.dashLine('gn1', { intro: 10, dash: 0.28, color: PAL.black }); // b -> S guide
  dw.highlight('reB', [10]);
  dw.highlight('ofBV', [10]);

  // steps 11-12: pole distance H and the pole o
  dw.seg('segH', { intro: 11, w: W_BAR, color: RED });          // b-M, labeled H
  dw.label('lblH', 'H', { intro: 11, color: RED });
  dw.dashLine('gm1', { intro: 12, dash: 0.28, color: PAL.black }); // M -> o
  dw.dashLine('ga1', { intro: 12, dash: 0.5, color: PAL.black }); // closing ray o-c
  dw.dashLine('gp1', { intro: 12, dash: 0.28, color: PAL.black }); // o -> V baseline
  dw.label('lbl_o', 'o', { cls: 'point', intro: 12 });

  // step 13: the M baseline (closing line of the funicular)
  dw.seg('mbase', { intro: 13, w: W_BAR });                     // L1-L2
  dw.highlight('ga1', [13]);

  // steps 14-15: funicular strings drawn WITH their rays
  dw.seg('ray1', { intro: 14, w: W_MEM });                      // o-a
  dw.seg('fun1', { intro: 14, w: W_MEM });                      // L1-FPM
  dw.label('n1o', '1', { cls: 'num', intro: 14 });
  dw.label('n1f', '1', { cls: 'num', intro: 14 });
  dw.seg('ray2', { intro: 15, w: W_MEM });                      // o-b
  dw.seg('fun2', { intro: 15, w: W_MEM });                      // FPM-L2
  dw.label('n2o', '2', { cls: 'num', intro: 15 });
  dw.label('n2f', '2', { cls: 'num', intro: 15 });

  // steps 16-18: ordinates y, scaled ordinates H*y, the M outline
  dw.strokes('ordF', 10, { intro: 16, w: 0.075, color: PAL.black });
  dw.highlight('segH', [16, 17]);
  dw.strokes('ordM', 10, { intro: 17, w: 0.075, color: RED });
  dw.strokes('mout', 12, { intro: 18, w: W_BAR, color: RED });
  dw.label('roM', '', { intro: 18, flash: false, color: RED });

  // final readouts
  dw.label('roAV', '', { intro: RESOLVE, flash: false, color: PAL.green });
  dw.label('roBV', '', { intro: RESOLVE, flash: false, color: PAL.green });
  dw.label('roH', '', { intro: RESOLVE, flash: false, color: RED });

  // points
  const HANDLE = { r: 0.28 }, DERIVED = { r: 0.21 };
  const show = (st) => st.n4;
  dw.disk('pt_A', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_B', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_C', { intro: 2, ...HANDLE, when: show });
  dw.disk('pt_G', { intro: 2, ...HANDLE, when: show });
  dw.disk('pt_H1', { intro: 2, ...DERIVED, when: show });
  dw.disk('pt_I', { intro: 3, ...HANDLE, when: show });
  dw.disk('pt_D', { intro: 4, ...HANDLE, when: show });
  dw.disk('pt_J', { intro: 4, ...DERIVED, when: show });
  dw.disk('pt_K', { intro: 5, ...DERIVED, when: show });
  dw.disk('pt_N', { intro: 6, ...DERIVED, when: show });
  dw.disk('pt_M', { intro: 11, ...DERIVED, when: show });
  dw.disk('pt_O', { intro: 12, ...HANDLE, when: show });
  dw.disk('pt_L1', { intro: 13, ...HANDLE, when: show });
  dw.disk('pt_L2', { intro: 13, ...DERIVED, when: show });
  dw.disk('pt_FPM', { intro: 14, ...DERIVED, when: show });

  // node-equilibrium inspector on the three funicular nodes
  dw.nodeInspector(3, { when: (st) => st.node > 0, w: 1.6 * W_MEM, headLen: 0.7, headW: 0.3, r: 0.3 });

  // dual pairs: hovering either side highlights the whole group
  dw.link('ldF', 'uF', 'lblFf', 'lblFo');
  dw.link('reA', 'ofAV', 'lblAVf', 'lblAVo');
  dw.link('reB', 'ofBV', 'lblBVf', 'lblBVo');
  dw.link('tj', 'trf');
  dw.link('tk', 'trg');
  dw.link('tl', 'tt', 'lbl_Otr');
  dw.link('fun1', 'ray1', 'n1f', 'n1o');
  dw.link('fun2', 'ray2', 'n2f', 'n2o');
  dw.link('mbase', 'ga1');
  dw.link('mout', 'segH', 'lblH');
  dw.ghostable('uF', 'segH', 'ray1', 'ray2', 'trf', 'trg', 'ofAV', 'ofBV');

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('t_form', [-4.6, 0.85]);
    dw.setLabel('t_form2', [-4.6, 0.05]);
    dw.setLabel('t_force', [17.0, 0.85]);
    dw.setLabel('t_force2', [17.0, 0.05]);
    dw.setText('t_force2', `1 unit :: ${s.sFD.toFixed(1)} kN`);
    dw.setLabel('t_trial', [-4.6, -3.15]);
    dw.setLabel('t_trial2', [-4.6, -3.95]);
    dw.setLabel('t_v', [-4.6, -7.65]);
    dw.setLabel('t_v2', [-4.6, -8.45]);
    dw.setLabel('t_m', [-4.6, -12.65]);
    dw.setLabel('t_m2', [-4.6, -13.45]);

    dw.setSeg('beam', d.A, d.B);
    dw.setDashLine('vertA', [[0, TOPY], [0, BOTY]]);
    dw.setDashLine('vertB', [[s.xB, TOPY], [s.xB, BOTY]]);
    dw.setLabel('lbl_A', V.add(d.A, [-0.65, 0.4]));
    dw.setLabel('lbl_B', V.add(d.B, [0.65, 0.4]));

    dw.setDashLine('vertC', [[s.xC, TOPY], [s.xC, BOTY]]);
    dw.setArrow('ldF', [s.xC, s.sLS], d.C);
    dw.setLabel('lblFf', [s.xC + 0.5, 0.78 * s.sLS]);
    dw.setArrow('uF', d.G, d.H1);
    dw.setLabel('lblFo', [d.G[0] - 0.55, (d.N[1] + d.H1[1]) / 2]);
    dw.setLabel('lbl_C', V.add(d.C, [0.55, -0.5]));
    dw.setLabel('lbl_a', V.add(d.G, [0.55, 0.35]));
    dw.setLabel('lbl_b', V.add(d.H1, [-0.4, -0.62]));
    dw.setLabel('bowA', [V.mid(d.A, d.C)[0], 0.65]);
    dw.setLabel('bowB', [V.mid(d.C, d.B)[0], 0.65]);
    dw.setLabel('bowC', [V.mid(d.A, d.B)[0], -1.1]);
    dw.setLabel('bowa', V.add(d.N, [-0.55, 0.75]));

    dw.setSeg('trf', d.G, d.I);
    dw.setSeg('trg', d.I, d.H1);
    dw.setLabel('lbl_I', V.add(d.I, [0.7, 0.25]));
    dw.setSeg('tj', d.D, d.J);
    dw.setLabel('lbl_D', V.add(d.D, [-0.65, 0.1]));
    dw.setSeg('tk', d.J, d.K);
    dw.setDashLine('tl', [d.K, d.D]);
    dw.setDashLine('tt', [d.I, d.N]);
    const cen = V.mul(V.add(V.add(d.D, d.J), d.K), 1 / 3);
    dw.setLabel('lbl_Otr', V.add(cen, [0.6, -0.1]));
    dw.setLabel('lbl_c', V.add(d.N, [-0.55, 0.42]));

    dw.setArrow('reA', [0, -s.sLS], d.A);
    dw.setArrow('reB', [s.xB, -s.sLS], d.B);
    dw.setLabel('lblAVf', [-0.85, -0.72 * s.sLS]);
    dw.setLabel('lblBVf', [s.xB + 0.85, -0.72 * s.sLS]);
    dw.setArrow('ofBV', d.C1, d.D1);
    dw.setArrow('ofAV', d.D1, d.F1);
    dw.setLabel('lblBVo', V.add(V.mid(d.C1, d.D1), [0.6, 0]));
    dw.setLabel('lblAVo', V.add(V.mid(d.D1, d.F1), [0.6, 0]));
    dw.setDashLine('wG', [d.G, d.F1]);
    dw.setDashLine('wH', [d.H1, d.C1]);
    dw.setDashLine('wN', [d.N, d.D1]);

    dw.setSeg('vbase', d.P, d.Q);
    dw.setSeg('v1', d.P, d.R);
    dw.setSeg('v2', d.R, d.T);
    dw.setDashLine('gk1', [d.T, d.G]);
    dw.setSeg('v3', d.T, d.U);
    dw.setSeg('v4', d.U, d.S);
    dw.setSeg('v5', d.S, d.Q);
    dw.setDashLine('gn1', [d.H1, d.S]);

    dw.setSeg('segH', d.H1, d.M);
    dw.setLabel('lblH', V.add(V.mid(d.H1, d.M), [0, -0.5]));
    dw.setDashLine('gm1', [d.M, d.O]);
    dw.setDashLine('ga1', [d.N, d.O]);
    dw.setDashLine('gp1', [d.O, d.Q]);
    dw.setLabel('lbl_o', V.add(d.O, [-0.6, 0.4]));

    dw.setSeg('mbase', d.L1, d.L2);
    // ray numbers: perpendicular offset away from the pole triangle
    const pSide = (a, b, up) => {
      const p = V.perp(V.unit(V.sub(b, a)));
      return (up ? p[1] : -p[1]) >= 0 ? p : V.mul(p, -1);
    };
    dw.setSeg('ray1', d.O, d.G);
    dw.setSeg('fun1', d.L1, d.FPM);
    dw.setLabel('n1o', V.add(V.add(d.O, V.mul(V.sub(d.G, d.O), 0.45)),
                             V.mul(pSide(d.O, d.G, true), 0.55)));
    dw.setLabel('n1f', V.add(V.mid(d.L1, d.FPM), [-0.42, 0.4]));
    dw.setSeg('ray2', d.O, d.H1);
    dw.setSeg('fun2', d.FPM, d.L2);
    dw.setLabel('n2o', V.add(V.add(d.O, V.mul(V.sub(d.H1, d.O), 0.45)),
                             V.mul(pSide(d.O, d.H1, false), 0.55)));
    dw.setLabel('n2f', V.add(V.mid(d.FPM, d.L2), [0.42, 0.4]));

    dw.setStrokes('ordF', d.GPs.map((g, k) => [g, d.FPs[k]]));
    dw.setStrokes('ordM', d.GPs.map((g, k) => [g, d.MPs[k]]));
    const pairs = [];
    for (let k = 0; k + 1 < d.chain.length; k++) pairs.push([d.chain[k], d.chain[k + 1]]);
    while (pairs.length < 12) pairs.push([d.L2, d.L2]);
    dw.setStrokes('mout', pairs);
    dw.setLabel('roM', [s.xB + 2.1, (s.ly + d.MPM[1]) / 2]);
    dw.setText('roM', `M_max = ${d.Mmax.toFixed(1)} kNm`);

    dw.setLabel('roAV', [24.2, -10.4]);
    dw.setLabel('roBV', [24.2, -11.5]);
    dw.setLabel('roH', [24.2, -12.6]);
    dw.setText('roAV', `A_V = ${d.AVkn.toFixed(1)} kN`);
    dw.setText('roBV', `B_V = ${d.BVkn.toFixed(1)} kN`);
    dw.setText('roH', `H = ${d.Hkn.toFixed(1)} kN`);

    dw.setDisk('pt_A', d.A);
    dw.setDisk('pt_B', d.B);
    dw.setDisk('pt_C', d.C);
    dw.setDisk('pt_G', d.G);
    dw.setDisk('pt_H1', d.H1);
    dw.setDisk('pt_I', d.I);
    dw.setDisk('pt_D', d.D);
    dw.setDisk('pt_J', d.J);
    dw.setDisk('pt_K', d.K);
    dw.setDisk('pt_N', d.N);
    dw.setDisk('pt_M', d.M);
    dw.setDisk('pt_O', d.O);
    dw.setDisk('pt_L1', d.L1);
    dw.setDisk('pt_L2', d.L2);
    dw.setDisk('pt_FPM', d.FPM);
  }

  // node-equilibrium inspector: the three funicular nodes. The sides of each
  // node's closed sub-polygon in the force diagram are the forces on it; the
  // support reactions use the SAME offset as the visible green arrows.
  const NODE_NAMES = ['funicular node at A', 'funicular node under F', 'funicular node at B'];
  const NODE_DISKS = ['pt_L1', 'pt_FPM', 'pt_L2'];
  const nodeAt = [() => d.L1, () => d.FPM, () => d.L2];
  const nodePolys = () => [
    [[d.D1, d.F1], [d.G, d.O], [d.O, d.N]],                     // A_V, string 1, closing
    [[d.G, d.H1], [d.H1, d.O], [d.O, d.G]],                     // F, string 2, string 1
    [[d.C1, d.D1], [d.N, d.O], [d.O, d.H1]],                    // B_V, closing, string 2
  ];

  function updateNode() {
    const j = Math.max(0, Math.min(2, Math.round(s.node) - 1));
    dw.selectDisk(s.node > 0 ? NODE_DISKS[j] : null);
    dw.setNodeInspector(nodeAt[j](), 2.0, NODE_NAMES[j], nodePolys()[j]);
  }

  function refresh() {
    d = compute(s);
    update();
    updateNode();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  // ------------------------------------------------------------------
  // side panel + dragging
  // ------------------------------------------------------------------

  const view = panel.section('View');
  panel.button(view, 'zoom fit', () => dw.zoomFit());

  const par = panel.section('Parameters');
  panel.slider(par, s, 'F', 'F (kN)', 1, 5, 0.1, refresh);
  panel.slider(par, s, 'H', 'H (pole distance)', 1, 5, 0.1, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (kN/unit)', 0.5, 5, 0.1, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 0.1, 2, 0.1, refresh);
  panel.slider(par, s, 'off', 'offset reaction forces', 0, 2, 0.1, refresh);
  panel.toggle(par, s, 'bow', 'show Bow notation', refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off, 1 = at A, 2 = under F, 3 = at B)', 0, 3, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS });
    panel.syncAll();
    refresh();
  });

  const hits = [
    ['C', () => d.C, 2, 99], ['B', () => d.B, 1, 99],
    ['G', () => d.G, 2, 99], ['I', () => d.I, 3, 99],
    ['D', () => d.D, 4, 99], ['L1', () => d.L1, 13, 99],
    ['O', () => d.O, 12, 99], ['M', () => d.M, 11, 99],
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
      if (name === 'C') s.xC = Math.max(0.02, Math.min(s.xB - 0.02, wx));
      else if (name === 'B') {
        s.xB = Math.max(2, Math.min(13, wx));
        s.xC = Math.min(s.xC, s.xB - 0.02);
      } else if (name === 'G') { s.gx = wx; s.gy = wy; }
      else if (name === 'I') { s.ix = wx; s.iy = wy; }
      else if (name === 'D') s.dy = Math.max(-6, Math.min(-0.3, wy));
      else if (name === 'L1') s.ly = Math.max(-16.5, Math.min(-10.5, wy));
      else if (name === 'O' || name === 'M') s.H = Math.max(1, Math.min(5, s.gx - wx));
      refresh();
    },
  );

  // click a funicular node to inspect it (clicking again deselects)
  dw.nodeSelect(nodeAt.map((at) => ({ at })), (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
