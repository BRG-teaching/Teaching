/**
 * Drawing view/47 "Internal forces in a beam – line load"
 * (https://block.arch.ethz.ch/eq/drawing/view/47) as a step-by-step
 * construction: a beam of length l = 10 m carrying a uniform line load q,
 * resting on two DRAGGABLE supports A and B with overhanging ends. The load
 * is discretized into ten strips laid off on the load line a...k; a funicular
 * polygon from any pole o' (at distance H) with its three-piece closing
 * (outer strings extended to the support verticals + dashed closing line
 * between them) gives the division point l on the load line -> reactions.
 * The V-diagram slopes at -q with jumps A and B at the supports; the
 * M-diagram is sampled at the ten stations plus both supports: each ordinate
 * between closing and funicular, scaled by H (x force scale) and mirrored
 * about the baseline (hogging up, on the tension side): M(x) = H * y(x).
 *
 * Live port of view_47/applet_0/geogebra.xml (no mode/step machinery in the
 * original -- we stage it). Full chain (load line, funicular vertices,
 * closing, division point, V-polyline, 12 M ordinates, offset reactions)
 * regression-checked against the live applet to ~3e-13 in four states.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 47 — Internal forces in a beam: line load',
  subtitle: 'V- and M-diagrams for a uniform load on a beam with overhangs',
  about: 'A uniform line load q on a beam whose two supports can slide inward, leaving overhanging ends. The load is discretized into ten strips on the load line; a funicular polygon from any pole o′ and its closing line give the division point l — the reaction split — while the V-diagram slopes at −q with jumps A and B at the supports. Every ordinate between funicular and closing, scaled by the pole distance H, is the bending moment: M(x) = H · y(x), hogging drawn upward on the tension side.',
  frame: [[-8.6, -18.6], [27.5, 6.4]],
};

const RED = 0xff0000;                     // the applet's V/M/H red
const SPAN = 10;                          // beam length (B = A + 10)

// fixed band levels (the applet's draggable layout points, kept at defaults)
const Y = {
  L1: 3.63965461269889,                   // top of the load block
  A: -0.9422260132709371,                 // beam level
  Z: 4.770818653525944,                   // dimension line l
  R: 2.1707835212190023,                  // top clip of the lines of action
  S: -17.669977794675233,                 // bottom clip
  L: -9.863608438858954,                  // V-diagram baseline
  P: -15.377829737086726,                 // M-diagram baseline
  L1p: 2.7029809555353563,                // single-loads row (L1')
};
const RESOLVE = 18;

const DEFAULTS = {
  xE: 2.834458909361332,                  // support A (on the first 3 m)
  xH: 7.126816294872493,                  // support B (on the last 3 m)
  llx: 24.197918648435977,                // load line top a (point LL0)
  lly: -0.31636823017155186,
  yN: -11.930878337363332,                // level of the H segment (point N)
  yPole: -5.113126834216308,              // pole o' on the vertical at distance H
  yFP0: -5.604657029658645,               // funicular start on the left edge
  q: 0.3,                                 // F_d, the line load [0.1, 0.5] kN/m
  H: 4,                                   // pole distance [1, 6] units
  sFD: 0.3,                               // scaleForceDiagram [0.2, 5] kN/unit
  sLS: 0.7,                               // scaleLoadSymbol [0.5, 1]
  off: 1.2,                               // scaleOffsetReactionForces [0, 2]
  sl: false,                              // show single loads (applet checkbox)
  bow: false,                             // show Bow notation
  n4: true,                               // show points
  node: 0,                                // node-equilibrium inspector (0 = off)
};

// every construction move happens on BOTH sides at once
const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The beam on two supports', d: 'left: a beam of length l = 10 m on two supports A and B — drag them! — the ends overhang; dotted verticals mark the edges and the supports' },
  { t: 'The line load q', d: 'left: a uniform line load q covers the whole beam (green band) — right: q = 0.3 kN/m; in total it weighs q · l' },
  { t: 'Discretize into ten strips', d: 'left: cut the load into ten strips of q · 1 m, acting on the dotted station lines — right: the strips laid off tip-to-tail on the load line: a, b, c, … k' },
  { t: 'The resultant R', d: 'left: all strips together are R = q · l acting in the middle of the dimension line — right: R spans the whole load line from a to k' },
  { t: 'Pole o′ at distance H', d: 'right: choose a pole o′ anywhere on the vertical at distance H left of the load line (red segment H below) — H will scale the moment diagram' },
  { t: 'Rays a…k → o′', d: 'right: draw the eleven rays from the load line points to the pole o′' },
  { t: 'The funicular polygon', d: 'left: from any start FP₀ on the left edge, draw each string parallel to its ray, strip by strip, to the right edge — the funicular of the ten strip loads' },
  { t: 'The closing line', d: 'left: extend the FIRST and LAST strings to the support verticals and connect the two points: the dashed closing line — outside the supports it follows the outer strings' },
  { t: 'Division point l', d: 'right: the parallel to the closing line through o′ cuts the load line at l — the split of the reactions, the same for any pole and any start' },
  { t: 'Reactions A and B', d: 'right: l splits the load line: A = l→a and B = k→l, offset beside it — left: the same forces push up at the supports' },
  { t: 'V-diagram — the baseline', d: 'left: a baseline under the beam; the shear starts and ends at ZERO on the free overhanging tips' },
  { t: 'V-diagram — overhang and jump A', d: 'left: from the tip the shear falls at slope −q to the support, where the reaction A jumps it up — right: exactly the segment l→a' },
  { t: 'V-diagram — span and jump B', d: 'left: falling at −q it crosses zero mid-span, jumps by B at the second support, and runs back to zero at the tip — right: the segment k→l' },
  { t: 'M-diagram — the baseline', d: 'left: a second baseline; the moment is also zero at both free tips' },
  { t: 'Ordinates y between funicular and closing', d: 'left: at the ten stations and at BOTH supports, measure the ordinate y between the closing polygon and the funicular (grey)' },
  { t: 'M = H · y', d: 'left: each ordinate scaled by H (× the force scale) and mirrored about the baseline: hogging (closing above funicular) plots UP — the tension side' },
  { t: 'The M-diagram', d: 'left: connecting the scaled ordinates gives the bending-moment diagram: parabolic sag between the stations, peaks over the supports — try dragging them!' },
  { t: 'Internal forces from the funicular', d: 'drag the supports, o′, FP₀, N or the load line, tune q and H — everything follows; click a funicular kink (or use the node slider) to read a strip node\'s equilibrium' },
];

function interX(p, dir, x) {
  const t = (x - p[0]) / (dir[0] || 1e-12);
  return [x, p[1] + t * dir[1]];
}

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const A = [0, Y.A], B = [SPAN, Y.A];
  const E = [s.xE, Y.A], H1 = [s.xH, Y.A];                      // the supports
  const LL0 = [s.llx, s.lly];
  const LL = [];                                                // load line a..k
  for (let k = 0; k <= 10; k++) LL.push([s.llx, s.lly - (k * s.q) / s.sFD]);
  const N = [s.llx, s.yN];
  const O = [s.llx - s.H, s.yN];                                // D_1 / O corner
  const pole = [s.llx - s.H, s.yPole];

  // funicular from FP0: string k parallel to ray LLk -> pole
  const segd = LL.map((p) => V.sub(pole, p));
  const FP = [[0, s.yFP0]];
  for (let k = 0; k < 10; k++) FP.push(interX(FP[k], segd[k], 0.5 + k));
  const C = interX(FP[10], segd[10], SPAN);
  const FG11 = interX(FP[0], segd[0], s.xE);                    // closing at A
  const FG12 = interX(FP[10], segd[10], s.xH);                  // closing at B
  const cd = V.sub(FG12, FG11);
  const K = interX(pole, cd, s.llx);                            // division point l

  const FGat = (x) => (x < s.xE ? interX(FP[0], segd[0], x)
    : x > s.xH ? interX(FP[10], segd[10], x) : interX(FG11, cd, x));
  const fpts = [...FP, C];
  const FPat = (x) => {
    for (let i = 0; i + 1 < fpts.length; i++) {
      if (x <= fpts[i + 1][0] || i + 2 === fpts.length) {
        const [a, b] = [fpts[i], fpts[i + 1]];
        return [x, a[1] + ((b[1] - a[1]) * (x - a[0])) / (b[0] - a[0])];
      }
    }
    return C;
  };

  // M ordinates: ten stations + the two supports; MP = P + (FG-FP)*sFD*H
  const stx = [];
  for (let k = 0; k < 10; k++) stx.push(0.5 + k);
  const ords = stx.map((x, i) => ({ x, FG: FGat(x), FP: FP[i + 1] }));
  ords.push({ x: s.xE, FG: FG11, FP: FPat(s.xE) });
  ords.push({ x: s.xH, FG: FG12, FP: FPat(s.xH) });
  for (const o of ords) o.MP = [o.x, Y.P + (o.FG[1] - o.FP[1]) * s.sFD * s.H];
  const chain = [[0, Y.P], ...ords.map((o) => o.MP).sort((a, b) => a[0] - b[0]), [SPAN, Y.P]];

  // reactions (force-diagram lengths -> kN)
  const Akn = (LL0[1] - K[1]) * s.sFD;                          // l -> a
  const Bkn = (K[1] - LL[10][1]) * s.sFD;                       // k -> l
  const Rkn = 10 * s.q;

  // V-diagram: slope -q from the tips, jumps A and B at the supports
  const L = [0, Y.L], M = [SPAN, Y.L];
  const VP1 = [s.xE, Y.L - s.q * s.xE];
  const VP2 = [s.xE, VP1[1] + Akn];
  const VP3 = [s.xH, VP2[1] - s.q * (s.xH - s.xE)];
  const VP4 = [s.xH, VP3[1] + Bkn];

  // offset reaction chain beside the load line
  const LL0o = [s.llx + s.off, LL0[1]];
  const LL10o = [s.llx + s.off, LL[10][1]];
  const Ko = [s.llx + s.off, K[1]];

  const ME = -(FG11[1] - FPat(s.xE)[1]) * s.sFD * s.H;          // hogging < 0
  const MH = -(FG12[1] - FPat(s.xH)[1]) * s.sFD * s.H;

  return { A, B, E, H1, LL, LL0, N, O, pole, FP, C, FG11, FG12, K, ords, chain,
           Akn, Bkn, Rkn, L, M, VP1, VP2, VP3, VP4, LL0o, LL10o, Ko, ME, MH };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);

  const W_BAR = 0.15;                     // th3
  const W_TRI = 0.085;                    // grey trial / rays
  const ARROW = { w: 0.2, headLen: 0.55, headW: 0.24 };
  const ARROW_R = { w: 0.26, headLen: 0.62, headW: 0.3 };       // th7 R / A / B

  // region titles
  dw.label('t_form', 'Form Diagram', { cls: 'title', flash: false, intro: 1 });
  dw.label('t_form2', '1 unit :: 1 m', { flash: false, intro: 1 });
  dw.label('t_force', 'Force Diagram', { cls: 'title', flash: false, intro: 3 });
  dw.label('t_force2', '', { flash: false, intro: 3 });
  dw.label('t_trial', 'Trial Funicular', { cls: 'title', flash: false, intro: 7 });
  dw.label('t_trial2', 'Construction', { flash: false, intro: 7 });
  dw.label('t_v', 'V - Diagram', { cls: 'title', flash: false, intro: 11 });
  dw.label('t_v2', '1 unit :: 1 kN', { flash: false, intro: 11 });
  dw.label('t_m', 'M - Diagram', { cls: 'title', flash: false, intro: 14 });
  dw.label('t_m2', '1 unit :: 1 kNm', { flash: false, intro: 14 });

  // step 1: beam, edge + support verticals, dimension line l
  dw.seg('beam', { intro: 1, w: W_BAR });
  dw.dashLine('vx0', { intro: 1, dash: 0.28, color: PAL.black });
  dw.dashLine('vx10', { intro: 1, dash: 0.28, color: PAL.black });
  dw.dashLine('vE', { intro: 1, dash: 0.28, color: PAL.black });
  dw.dashLine('vH', { intro: 1, dash: 0.28, color: PAL.black });
  dw.seg('dim', { intro: 1, w: 0.05, color: PAL.grey, flash: false });
  dw.strokes('dimT', 4, { intro: 1, w: 0.05, color: PAL.grey, flash: false });
  dw.label('lblDim', 'l = 10 m', { intro: 1, color: PAL.grey });

  // step 2: the load block q
  dw.poly('qpoly', 4, { intro: 2, opacity: 0.16, color: PAL.green, flash: false });
  dw.strokes('qedge', 4, { intro: 2, w: 0.055, color: PAL.green });
  dw.label('lblq', 'q', { intro: 2, color: PAL.green });
  dw.label('roq', '', { intro: 2, flash: false });

  // step 3: stations (left) + the load line a..k (right)
  for (let i = 0; i < 10; i++) dw.dashLine(`st${i}`, { intro: 3, dash: 0.22, color: PAL.black });
  const slOn = (st) => st.sl;
  for (let i = 0; i < 10; i++) dw.arrow(`sl${i}`, { intro: 3, ...ARROW, when: slOn });
  // step 4: the resultant R in both diagrams
  dw.dashLine('vR', { intro: 4, dash: 0.28, color: PAL.black });
  dw.arrow('Rform', { intro: 4, ...ARROW });
  dw.label('lblRf', 'R', { intro: 4, color: PAL.green });
  dw.arrow('Rforce', { intro: 4, ...ARROW_R });
  dw.label('lblRo', 'R', { intro: 4, color: PAL.green });

  // step 5: pole o' at distance H
  dw.seg('segH', { intro: 5, w: W_BAR, color: RED });
  dw.label('lblH', 'H', { intro: 5, color: RED });
  dw.dashLine('gt', { intro: 5, dash: 0.22, color: PAL.black });   // N up to k
  dw.dashLine('gr', { intro: 5, dash: 0.22, color: PAL.black });   // pole down to O
  dw.label('lbl_op', 'o′', { cls: 'point', intro: 5 });

  // step 6: the eleven rays
  for (let i = 0; i <= 10; i++) dw.seg(`ray${i}`, { intro: 6, w: W_TRI, color: PAL.grey });

  // step 7: the funicular polygon (eleven strings)
  for (let i = 0; i <= 10; i++) dw.seg(`fun${i}`, { intro: 7, w: W_TRI, color: PAL.grey });
  for (let i = 0; i <= 10; i++) dw.highlight(`ray${i}`, [7]);
  dw.label('lbl_FP0', 'FP₀', { cls: 'point', intro: 7 });

  // step 8: the three-piece closing
  dw.seg('cs1', { intro: 8, w: W_TRI, color: PAL.grey });
  dw.dashLine('cs2', { intro: 8, dash: 0.5 });
  dw.seg('cs3', { intro: 8, w: W_TRI, color: PAL.grey });

  // step 9: division point l
  dw.dashLine('ga1', { intro: 9, dash: 0.5 });
  dw.label('lbl_l', 'l', { cls: 'point', intro: 9 });
  dw.highlight('cs2', [9]);

  // step 10: reactions at the supports + offset chain b -> l -> a
  dw.arrow('reA', { intro: 10, ...ARROW });
  dw.arrow('reB', { intro: 10, ...ARROW });
  dw.label('lblAf', 'A', { intro: 10, color: PAL.green });
  dw.label('lblBf', 'B', { intro: 10, color: PAL.green });
  dw.arrow('ofB', { intro: 10, ...ARROW_R });
  dw.arrow('ofA', { intro: 10, ...ARROW_R });
  dw.label('lblAo', 'A', { intro: 10, color: PAL.green });
  dw.label('lblBo', 'B', { intro: 10, color: PAL.green });
  dw.dashLine('wA', { intro: 10, dash: 0.3, color: PAL.green });
  dw.dashLine('wB', { intro: 10, dash: 0.3, color: PAL.green });

  // steps 11-13: the V-diagram
  dw.seg('vbase', { intro: 11, w: W_BAR });
  dw.seg('v1', { intro: 12, w: W_BAR, color: RED });
  dw.seg('v2', { intro: 12, w: W_BAR, color: RED });
  dw.highlight('ofA', [12]);
  dw.highlight('reA', [12]);
  dw.seg('v3', { intro: 13, w: W_BAR, color: RED });
  dw.seg('v4', { intro: 13, w: W_BAR, color: RED });
  dw.seg('v5', { intro: 13, w: W_BAR, color: RED });
  dw.highlight('ofB', [13]);
  dw.highlight('reB', [13]);

  // steps 14-17: the M-diagram
  dw.seg('mbase', { intro: 14, w: W_BAR });
  dw.strokes('ordF', 12, { intro: 15, w: 0.07, color: PAL.grey });
  dw.strokes('ordM', 12, { intro: 16, w: 0.07, color: RED });
  dw.highlight('segH', [16]);
  dw.strokes('mout', 13, { intro: 17, w: W_BAR, color: RED });

  // final readouts
  for (const n of ['roR', 'roA', 'roB']) dw.label(n, '', { intro: RESOLVE, flash: false, color: PAL.green });
  for (const n of ['roH', 'roME', 'roMH']) dw.label(n, '', { intro: RESOLVE, flash: false, color: RED });

  // Bow notation (the applet's showBow: a, K, L; o' we label always)
  const bowOn = (st) => st.bow;
  dw.label('bowa', 'a', { intro: 3, when: bowOn, color: PAL.grey });
  dw.label('bowK', 'K', { intro: 2, when: bowOn, color: PAL.grey });
  dw.label('bowL', 'L', { intro: 1, when: bowOn, color: PAL.grey });

  // points
  const HANDLE = { r: 0.24 }, DERIVED = { r: 0.18 };
  const show = (st) => st.n4;
  dw.disk('pt_E', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_H1', { intro: 1, ...HANDLE, when: show });
  for (let k = 0; k <= 10; k++) dw.disk(`pt_LL${k}`, { intro: 3, ...DERIVED, when: show });
  for (let k = 0; k <= 10; k++) {
    dw.label(`lbl_LL${k}`, 'abcdefghijk'[k], { cls: 'point', intro: 3, when: show });
  }
  dw.disk('pt_N', { intro: 5, ...HANDLE, when: show });
  dw.disk('pt_O', { intro: 5, ...DERIVED, when: show });
  dw.disk('pt_pole', { intro: 5, ...HANDLE, when: show });
  dw.disk('pt_FP0', { intro: 7, ...HANDLE, when: show });
  dw.disk('pt_C', { intro: 7, ...DERIVED, when: show });
  dw.disk('pt_K', { intro: 9, ...DERIVED, when: show });

  // node-equilibrium inspector: the ten strip nodes + the whole beam
  dw.nodeInspector(3, { when: (st) => st.node > 0, w: 0.14, headLen: 0.6, headW: 0.26, r: 0.26 });

  // dual pairs
  dw.link('Rform', 'Rforce', 'lblRf', 'lblRo');
  dw.link('reA', 'ofA', 'lblAf', 'lblAo');
  dw.link('reB', 'ofB', 'lblBf', 'lblBo');
  for (let i = 0; i <= 10; i++) dw.link(`fun${i}`, `ray${i}`);
  dw.link('cs2', 'ga1');
  dw.link('mout', 'segH', 'lblH');
  dw.ghostable('Rforce', 'segH');

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('t_form', [-4.9, 5.4]);
    dw.setLabel('t_form2', [-4.9, 4.6]);
    dw.setLabel('t_force', [17.9, 5.4]);
    dw.setLabel('t_force2', [17.9, 4.6]);
    dw.setText('t_force2', `1 unit :: ${s.sFD.toFixed(1)} kN`);
    dw.setLabel('t_trial', [-4.9, -4.6]);
    dw.setLabel('t_trial2', [-4.9, -5.4]);
    dw.setLabel('t_v', [-4.9, -9.5]);
    dw.setLabel('t_v2', [-4.9, -10.3]);
    dw.setLabel('t_m', [-4.9, -14.5]);
    dw.setLabel('t_m2', [-4.9, -15.3]);

    dw.setSeg('beam', d.A, d.B);
    dw.setDashLine('vx0', [[0, Y.R], [0, Y.S]]);
    dw.setDashLine('vx10', [[SPAN, Y.R], [SPAN, Y.S]]);
    dw.setDashLine('vE', [[s.xE, Y.R], [s.xE, Y.S]]);
    dw.setDashLine('vH', [[s.xH, Y.R], [s.xH, Y.S]]);
    dw.setSeg('dim', [0, Y.Z], [SPAN, Y.Z]);
    const tk = 0.22;
    dw.setStrokes('dimT', [
      [[-tk, Y.Z - tk], [tk, Y.Z + tk]], [[-tk, Y.Z + tk], [tk, Y.Z - tk]],
      [[SPAN - tk, Y.Z - tk], [SPAN + tk, Y.Z + tk]], [[SPAN - tk, Y.Z + tk], [SPAN + tk, Y.Z - tk]],
    ]);
    dw.setLabel('lblDim', [SPAN / 2, Y.Z + 0.55]);

    const yQ = Y.L1 - 0.75 * s.sLS;
    dw.setPoly('qpoly', [[0, Y.L1], [0, yQ], [SPAN, yQ], [SPAN, Y.L1]]);
    dw.setStrokes('qedge', [
      [[0, Y.L1], [SPAN, Y.L1]], [[SPAN, Y.L1], [SPAN, yQ]],
      [[SPAN, yQ], [0, yQ]], [[0, yQ], [0, Y.L1]],
    ]);
    dw.setLabel('lblq', [-0.6, (Y.L1 + yQ) / 2]);
    dw.setLabel('roq', [17.9, 2.4]);
    dw.setText('roq', `q = ${s.q.toFixed(2)} kN / m`);

    for (let i = 0; i < 10; i++) {
      dw.setDashLine(`st${i}`, [[0.5 + i, Y.R], [0.5 + i, Y.S]]);
      dw.setArrow(`sl${i}`, [0.5 + i, Y.L1p], [0.5 + i, Y.L1p - s.sLS]);
    }
    dw.setDashLine('vR', [[SPAN / 2, Y.R], [SPAN / 2, Y.S]]);
    dw.setArrow('Rform', [SPAN / 2, Y.R], [SPAN / 2, Y.R - 2 * s.sLS]);
    dw.setLabel('lblRf', [SPAN / 2 + 0.68, Y.R - s.sLS]);
    dw.setArrow('Rforce', d.LL[0], d.LL[10]);
    dw.setLabel('lblRo', [s.llx - 0.5, (d.LL[0][1] + d.LL[10][1]) / 2]);

    dw.setSeg('segH', d.O, d.N);
    dw.setLabel('lblH', V.add(V.mid(d.O, d.N), [0, -0.55]));
    dw.setDashLine('gt', [d.N, d.LL[10]]);
    dw.setDashLine('gr', [d.pole, d.O]);
    dw.setLabel('lbl_op', V.add(d.pole, [-0.75, 0.15]));

    for (let i = 0; i <= 10; i++) dw.setSeg(`ray${i}`, d.LL[i], d.pole);
    const fpts = [...d.FP, d.C];
    for (let i = 0; i <= 10; i++) dw.setSeg(`fun${i}`, fpts[i], fpts[i + 1]);
    dw.setLabel('lbl_FP0', V.add(d.FP[0], [-0.85, -0.15]));

    dw.setSeg('cs1', d.FP[0], d.FG11);
    dw.setDashLine('cs2', [d.FG11, d.FG12]);
    dw.setSeg('cs3', d.FG12, d.C);
    dw.setDashLine('ga1', [d.pole, d.K]);
    dw.setLabel('lbl_l', V.add(d.K, [-0.5, 0.34]));

    dw.setArrow('reA', [s.xE, Y.A - 2 * s.sLS], d.E);
    dw.setArrow('reB', [s.xH, Y.A - 2 * s.sLS], d.H1);
    dw.setLabel('lblAf', [s.xE - 0.55, Y.A - 1.2 * s.sLS]);
    dw.setLabel('lblBf', [s.xH + 0.55, Y.A - 1.2 * s.sLS]);
    dw.setArrow('ofB', d.LL10o, d.Ko);
    dw.setArrow('ofA', d.Ko, d.LL0o);
    dw.setLabel('lblAo', V.add(V.mid(d.Ko, d.LL0o), [0.55, 0]));
    dw.setLabel('lblBo', V.add(V.mid(d.LL10o, d.Ko), [0.55, 0]));
    dw.setDashLine('wA', [d.LL0, d.LL0o]);
    dw.setDashLine('wB', [d.LL[10], d.LL10o]);

    dw.setSeg('vbase', d.L, d.M);
    dw.setSeg('v1', d.L, d.VP1);
    dw.setSeg('v2', d.VP1, d.VP2);
    dw.setSeg('v3', d.VP2, d.VP3);
    dw.setSeg('v4', d.VP3, d.VP4);
    dw.setSeg('v5', d.VP4, d.M);

    dw.setSeg('mbase', [0, Y.P], [SPAN, Y.P]);
    dw.setStrokes('ordF', d.ords.map((o) => [o.FG, o.FP]));
    dw.setStrokes('ordM', d.ords.map((o) => [[o.x, Y.P], o.MP]));
    const pairs = [];
    for (let k = 0; k + 1 < d.chain.length; k++) pairs.push([d.chain[k], d.chain[k + 1]]);
    dw.setStrokes('mout', pairs);

    const col = 13.2;
    const rows = [['roR', -8.6, `R = ${d.Rkn.toFixed(1)} kN`],
                  ['roA', -9.6, `A = ${d.Akn.toFixed(2)} kN`],
                  ['roB', -10.6, `B = ${d.Bkn.toFixed(2)} kN`],
                  ['roH', -11.6, `H = ${(s.H * s.sFD).toFixed(2)} kN`],
                  ['roME', -12.6, `M(A) = ${d.ME.toFixed(2)} kNm`],
                  ['roMH', -13.6, `M(B) = ${d.MH.toFixed(2)} kNm`]];
    for (const [n, y, txt] of rows) { dw.setLabel(n, [col, y]); dw.setText(n, txt); }

    dw.setLabel('bowa', V.add(d.LL[0], [0.85, 0.35]));
    dw.setLabel('bowK', [9.5, Y.L1 + 0.45]);
    dw.setLabel('bowL', [SPAN / 2, Y.A - 0.6]);

    dw.setDisk('pt_E', d.E);
    dw.setDisk('pt_H1', d.H1);
    for (let k = 0; k <= 10; k++) {
      dw.setDisk(`pt_LL${k}`, d.LL[k]);
      dw.setLabel(`lbl_LL${k}`, V.add(d.LL[k], [0.32, 0.12]));
    }
    dw.setDisk('pt_N', d.N);
    dw.setDisk('pt_O', d.O);
    dw.setDisk('pt_pole', d.pole);
    dw.setDisk('pt_FP0', d.FP[0]);
    dw.setDisk('pt_C', d.C);
    dw.setDisk('pt_K', d.K);
  }

  // node-equilibrium inspector: strip node i (funicular kink at station i-0.5)
  // closes the triangle {strip load, ray i, ray i-1}; node 11 = the whole
  // beam {R, B, A} with the reactions on the visible offset arrows.
  const nodeAt = [];
  for (let i = 1; i <= 10; i++) nodeAt.push(() => d.FP[i]);
  nodeAt.push(() => [SPAN / 2, Y.A]);
  const nodePolys = (j) => (j < 10
    ? [[d.LL[j], d.LL[j + 1]], [d.LL[j + 1], d.pole], [d.pole, d.LL[j]]]
    : [[d.LL[0], d.LL[10]], [d.LL10o, d.Ko], [d.Ko, d.LL0o]]);
  const nodeTitle = (j) => (j < 10 ? `strip ${j + 1} node` : 'whole beam');

  function updateNode() {
    const j = Math.max(0, Math.min(10, Math.round(s.node) - 1));
    dw.selectDisk(null);
    dw.setNodeInspector(nodeAt[j](), 1.7, nodeTitle(j), nodePolys(j));
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
  panel.slider(par, s, 'q', 'q (kN/m)', 0.1, 0.5, 0.05, refresh);
  panel.slider(par, s, 'H', 'H (pole distance)', 1, 6, 0.1, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (kN/unit)', 0.2, 5, 0.1, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 0.5, 1, 0.05, refresh);
  panel.slider(par, s, 'off', 'offset reaction forces', 0, 2, 0.1, refresh);
  panel.toggle(par, s, 'sl', 'show single loads', refresh);
  panel.toggle(par, s, 'bow', 'show Bow notation', refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off, 1–10 = strips, 11 = whole beam)', 0, 11, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS });
    panel.syncAll();
    refresh();
  });

  const hits = [
    ['E', () => d.E, 1, 99], ['H1', () => d.H1, 1, 99],
    ['LL0', () => d.LL[0], 3, 99],
    ['N', () => d.N, 5, 99], ['pole', () => d.pole, 5, 99],
    ['O', () => d.O, 5, 99], ['FP0', () => d.FP[0], 7, 99],
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
      if (name === 'E') s.xE = Math.max(0.02, Math.min(3, wx));
      else if (name === 'H1') s.xH = Math.max(7, Math.min(9.98, wx));
      else if (name === 'LL0') { s.llx = wx; s.lly = wy; }
      else if (name === 'N') s.yN = Math.max(-16, Math.min(d.LL[10][1] - 0.4, wy));
      else if (name === 'pole') s.yPole = Math.max(-15, Math.min(3, wy));
      else if (name === 'O') s.H = Math.max(1, Math.min(6, s.llx - wx));
      else if (name === 'FP0') s.yFP0 = Math.max(-9, Math.min(-2, wy));
      refresh();
    },
  );

  // click a funicular kink (or the beam middle) to inspect it
  dw.nodeSelect(nodeAt.map((at) => ({ at })), (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
