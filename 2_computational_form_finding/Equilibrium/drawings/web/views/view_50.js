/**
 * Drawing view/50 "Internal forces in a beam with cantilever – point load"
 * (https://block.arch.ethz.ch/eq/drawing/view/50) as a step-by-step
 * construction: a beam on a pin A and a DRAGGABLE roller B, running past the
 * roller into a cantilever whose tip follows the third load F3; F1 and F2
 * slide on rails between the supports. A trial funicular from pole O'
 * (strings out to the tip, the last one BACK to the roller vertical) and its
 * closing line give the division point I1 on the load line -> reactions
 * A (above) and B (below). The V-diagram is the running sum of the jumps
 * +A -F1 -F2 +B -F3 = 0, re-read beside it as a green force cascade whose
 * LEVELS, projected onto one vertical, become the load line of a SECOND
 * force diagram: its pole O" sits ON the baseline at distance H (red), and
 * the funicular of its rays, drawn from T2 on the pin vertical, returns to
 * the baseline exactly at the free tip -- that closed polygon IS the
 * M-diagram, with the red ordinate y under F1 and the readout M = y * H.
 *
 * Live port of view_50/applet_0/geogebra.xml. Full chain (load line, trial
 * funicular, division, offset reactions, V levels, cascade, second force
 * diagram, M funicular, y*H) regression-checked against the live applet to
 * ~5.5e-14 (48 points) in eight states incl. dragged handles; M = y*H
 * matches the applet's own text8.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 50 — Internal forces in a beam with cantilever: point load',
  subtitle: 'V- and M-diagrams for a beam whose roller and cantilever tip move',
  about: 'A beam on a pin and a draggable roller carries three point loads — the third one on the cantilever, whose tip follows it. A trial funicular and its closing line locate the division point on the load line: the reaction split A/B. The V-diagram is the running sum of the jumps +A −F₁ −F₂ +B −F₃ = 0, re-read as a green force cascade, and its levels become the load line of a second force diagram whose pole O″ sits on the baseline at distance H: the funicular of its rays closes on the baseline exactly at the free tip — that polygon is the M-diagram, with M = y · H.',
  frame: [[-0.7, 1.6], [22.3, 13.3]],
};

const RED = 0xff0000;                                      // the applet's H / y red
const HATCH = 0xc0c0c0;                                    // hatch fill rgb(192,192,192)
const AX = 3.9819730254790695, AY = 10.470864116959078;    // pin A (fixed)
const LOADY = 11.486538988577367;                          // load application level (P_3)
const RAIL1 = [AX + 1, AX + 2];                            // F1 rail (F11-F12)
const RAIL2 = [AX + 2.75, AX + 3.75];                      // F2 rail (F21-F22)
const CLIP = [12.052474393619292, 2.2855246614441356];     // station verticals span (A_3-B_3)
const NH = 48;                                             // hatch stroke budget
const HSP = 10 / 52.30446015081167;                        // hatch spacing (10 px at applet scale)
const RESOLVE = 18;

const DEFAULTS = {
  xF1: 5.443969996523462,                 // load F1 (point D on its rail)
  xF2: 7.074332905548544,                 // load F2 (point E on its rail)
  xF3: 10.226820221635863,                // load F3 = the cantilever tip (point F)
  xB: 8.650532776085306,                  // roller B (slides between F2 and the tip)
  sx: 15.696683661241751,                 // load line top S
  sy: 11.352976472602583,
  px: 13.403131875906912,                 // trial pole O' (point B_1)
  py: 9.890892579723731,
  c1y: 8.470864116959078,                 // trial funicular start C_1 (pin vertical)
  n1y: 6.718358455225867,                 // V baseline level (point N_1)
  t2y: 3.7972915765559723,                // M baseline level (point T_2)
  xN2: 13.51289676704061,                 // second load line vertical (point N_2)
  xO2: 14.79905769340054,                 // pole O" (H = xO2 - xN2)
  s3y: 5.008663209783065,                 // level of the red H segment (point S_3)
  cx0: 10.718811598859062,                // cascade arrow x: A   (point D_2)
  cx1: 11.297837426314649,                // cascade arrow x: F1  (point G_2)
  cx2: 11.816754267882176,                // cascade arrow x: F2  (point H_2)
  cx3: 12.407954166586931,                // cascade arrow x: B   (point J_2)
  cx4: 12.982262639614405,                // cascade arrow x: F3  (point L_2)
  F1: 1, F2: 1, F3: 1,                    // F_{1..3} [0, 2] kN
  sFD: 1,                                 // scaleForceDiagram [0.5, 2]
  sLS: 0.6,                               // scaleLoadSymbol [0.2, 1]
  off: 0.5,                               // scaleOffsetReactionForces [0, 1]
  n4: true,                               // show points
  node: 0,                                // node-equilibrium inspector (0 = off)
};

// every construction move happens on BOTH sides at once
const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'Beam with a cantilever', d: 'left: a beam on a pin A and a roller B — the beam runs PAST the roller: a cantilever; dotted verticals rise through both supports' },
  { t: 'Three point loads — and the load line', d: 'left: F₁ and F₂ slide on their rails between the supports, F₃ stands on the cantilever and the tip follows it — right: the three loads laid off tip-to-tail on the load line' },
  { t: 'Trial pole O′', d: 'right: choose a trial pole O′ anywhere, with rays to the four points of the load line' },
  { t: 'The trial funicular', d: 'left: from C₁ on the pin vertical, draw each string parallel to its ray — out to the TIP, then the last string comes BACK to the roller vertical → H₁' },
  { t: 'Closing line → division point', d: 'left: the dashed closing line C₁–H₁ spans pin to roller — right: the parallel to it through O′ cuts the load line at I₁: the reaction split, the same for ANY trial pole' },
  { t: 'Reactions A and B', d: 'right: I₁ splits the load line into A (above) and B (below), offset beside it — left: A_V and B push up at the supports (the pin could also take a horizontal A_H)' },
  { t: 'V-diagram — the baseline', d: 'left: a dotted baseline through N₁ under the trial funicular — the shear is zero left of the pin and must return to zero at the free tip; 1 unit :: 1 kN' },
  { t: 'V-diagram — jump A', d: 'left: at the pin the shear jumps up by A and runs level to the first load — right: exactly the reaction segment A beside the load line' },
  { t: 'V-diagram — the loads step down', d: 'left: F₁ and F₂ each drop the shear by their value; between the loads V is constant' },
  { t: 'V-diagram — jump B, drop F₃', d: 'left: the roller jumps V up by B; on the cantilever V = +F₃ until the tip load closes the diagram exactly to zero — the hatch fills it' },
  { t: 'V re-read as a force cascade', d: 'right of the diagram: the same story tip-to-tail: +A − F₁ − F₂ + B − F₃ = 0 — dotted levels carry every step across' },
  { t: 'The V-levels as a new load line', d: 'right: project the levels onto ONE vertical through N₂: the steps A, F₁, F₂, B, F₃ stack into the load line of a SECOND force diagram' },
  { t: 'Pole O″ at distance H', d: 'right: place the pole O″ ON the baseline at distance H (red segment below) — the grey horizontal ray O″–N₂ is the closing line of the coming funicular' },
  { t: 'String 1 — form and force', d: 'right: ray from O″ to the A-level — left: from T₂ on the pin vertical, string 1 parallel to it, up to the line of action of F₁' },
  { t: 'Strings 2 and 3', d: 'right: rays to the next two levels — left: strings 2 and 3 parallel to them, across the F₂ vertical to the roller vertical' },
  { t: 'String 4 closes at the free tip', d: 'right: ray from O″ to the top level — left: string 4 parallel to it returns to the baseline EXACTLY at the free tip: the closed polygon is the M-diagram' },
  { t: 'M = y · H', d: 'left: the red ordinate y under F₁, times the pole distance H, is the bending moment there — M = y · H, like the applet’s readout' },
  { t: 'Play with it', d: 'drag the roller B, the tip load F₃, the loads, C₁, N₁, N₂, T₂, the poles O′ and O″, even the cascade arrows — everything follows; click a trial-funicular kink (or use the node slider) for its equilibrium' },
];

function interX(p, dir, x) {
  const t = (x - p[0]) / (dir[0] || 1e-12);
  return [x, p[1] + t * dir[1]];
}

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const A = [AX, AY], B = [s.xB, AY], G = [s.xF3, AY];
  const S = [s.sx, s.sy];                                       // load line top
  const T = [s.sx, s.sy - s.F1 * s.sFD];
  const Vp = [s.sx, T[1] - s.F2 * s.sFD];
  const Z = [s.sx, Vp[1] - s.F3 * s.sFD];                       // load line bottom
  const pole = [s.px, s.py];                                    // trial pole O'

  // trial funicular: out to the tip, back to the roller vertical
  const C1 = [AX, s.c1y];
  const D1 = interX(C1, V.sub(S, pole), s.xF1);
  const E1 = interX(D1, V.sub(T, pole), s.xF2);
  const G1 = interX(E1, V.sub(Vp, pole), s.xF3);
  const H1 = interX(G1, V.sub(Z, pole), s.xB);
  const I1 = interX(pole, V.sub(H1, C1), s.sx);                 // division point

  // offset reaction chain beside the load line (scaleOffsetReactionForces)
  const K1 = [s.sx + s.off, s.sy];
  const L1 = [s.sx + s.off, I1[1]];
  const M1 = [s.sx + s.off, Z[1]];
  const Akn = (S[1] - I1[1]) / s.sFD;                           // signed (up +)
  const Bkn = (I1[1] - Z[1]) / s.sFD;

  // V-diagram levels, 1 unit :: 1 kN (the applet's If picks the signed A
  // level; the B jump always takes the UPPER circle intersection Q_3)
  const lvA = s.n1y + Akn;
  const lv1 = lvA - s.F1;
  const lv2 = lv1 - s.F2;
  const lvB = lv2 + Math.abs(Bkn);
  const vpts = [[AX, s.n1y], [AX, lvA], [s.xF1, lvA], [s.xF1, lv1],
                [s.xF2, lv1], [s.xF2, lv2], [s.xB, lv2], [s.xB, lvB],
                [s.xF3, lvB], [s.xF3, s.n1y]];
  const vAt = (x) => (x < s.xF1 ? lvA : x < s.xF2 ? lv1 : x < s.xB ? lv2 : lvB);

  // second force diagram: the V-levels on the vertical x = xN2, pole O" on
  // the baseline at distance H
  const Q2 = [s.xN2, lvA], R2 = [s.xN2, lv1], S2 = [s.xN2, lv2], P2 = [s.xN2, lvB];
  const N2 = [s.xN2, s.n1y];
  const O2 = [s.xO2, s.n1y];
  const H = s.xO2 - s.xN2;

  // M funicular from T_2 on the pin vertical, closing on the baseline at the tip
  const T2 = [AX, s.t2y];
  const U2 = interX(T2, V.sub(Q2, O2), s.xF1);
  const V2 = interX(U2, V.sub(R2, O2), s.xF2);
  const W2 = interX(V2, V.sub(S2, O2), s.xB);
  const Z2 = [s.xF3, s.t2y];
  const mpts = [T2, U2, V2, W2, Z2];
  const mAt = (x) => {
    for (let i = 0; i + 1 < mpts.length; i++) {
      if (x <= mpts[i + 1][0] || i + 2 === mpts.length) {
        const [a, b] = [mpts[i], mpts[i + 1]];
        return a[1] + ((b[1] - a[1]) * (x - a[0])) / (b[0] - a[0] || 1e-12);
      }
    }
    return s.t2y;
  };
  const U3 = [s.xF1, s.t2y];                                    // foot of the y ordinate
  const yv = Math.abs(U2[1] - s.t2y);
  const Mval = yv * H;

  // cascade arrows (draggable x's): tail on one level, tip on the next
  const casT = [s.n1y, lvA, lv1, lv2, lvB];                     // tails A,F1,F2,B,F3
  const casH = [lvA, lv1, lv2, lvB, s.n1y];                     // tips
  const casX = [s.cx0, s.cx1, s.cx2, s.cx3, s.cx4];

  return { A, B, G, S, T, Vp, Z, pole, C1, D1, E1, G1, H1, I1, K1, L1, M1,
           Akn, Bkn, lvA, lv1, lv2, lvB, vpts, vAt, Q2, R2, S2, P2, N2, O2, H,
           T2, U2, V2, W2, Z2, mpts, mAt, U3, yv, Mval, casT, casH, casX };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);

  const W_BAR = 0.075;                    // th2 (beam, outlines, strings)
  const W_RAY2 = 0.06, W_RAY1 = 0.035;    // th2 / th1 rays
  const ARROW = { w: 0.11, headLen: 0.32, headW: 0.15 };        // green th7

  // region titles (the applet's text1..text7)
  dw.label('t_form', 'Form Diagram', { cls: 'title', flash: false, intro: 1 });
  dw.label('t_force', 'Force Diagram', { cls: 'title', flash: false, intro: 2 });
  dw.label('t_trial', 'Trial Funicular', { cls: 'title', flash: false, intro: 3 });
  dw.label('t_trial2', 'Construction', { flash: false, intro: 3 });
  dw.label('t_v', 'V - Diagram', { cls: 'title', flash: false, intro: 7 });
  dw.label('t_m', 'M - Diagram', { cls: 'title', flash: false, intro: 14 });
  dw.label('t_fd1', 'Force diagram', { flash: false, intro: 3 });
  dw.label('t_fd1b', 'Trial funicular construction', { flash: false, intro: 3 });
  dw.label('t_fd2', 'Force diagram', { flash: false, intro: 13 });
  dw.label('t_fd2b', 'M - line', { flash: false, intro: 13 });

  // step 1: beam + pin (triangle) + roller (wheel circle) + support verticals
  dw.seg('beam', { intro: 1, w: W_BAR });
  dw.strokes('pinA', 11, { intro: 1, w: 0.03, color: PAL.black, flash: false });
  dw.strokes('rolB', 8, { intro: 1, w: 0.03, color: PAL.black, flash: false });
  dw.circle('rolC', { intro: 1, color: PAL.black, flash: false });
  dw.dashLine('vA', { intro: 1, dash: 0.2, color: PAL.black });
  dw.dashLine('vB', { intro: 1, dash: 0.2, color: PAL.black });
  dw.label('lbl_A', 'A', { cls: 'point', intro: 1 });
  dw.label('lbl_B', 'B', { cls: 'point', intro: 1 });

  // step 2: the loads on their rails (left) + the load line (right)
  dw.dashLine('rail1', { intro: 2, dash: 0.22 });               // grey, like the applet
  dw.dashLine('rail2', { intro: 2, dash: 0.22 });
  dw.dashLine('v1', { intro: 2, dash: 0.2, color: PAL.black });
  dw.dashLine('v2', { intro: 2, dash: 0.2, color: PAL.black });
  dw.dashLine('vTip', { intro: 2, dash: 0.2, color: PAL.black });
  const fOn = [null, () => s.F1 !== 0, () => s.F2 !== 0, () => s.F3 !== 0];
  for (let i = 1; i <= 3; i++) {
    dw.arrow(`ldF${i}`, { intro: 2, ...ARROW });
    dw.label(`lblF${i}f`, `F${'₁₂₃'[i - 1]}`, { intro: 2, color: PAL.green });
    dw.arrow(`llF${i}`, { intro: 2, ...ARROW, when: fOn[i] });
    dw.label(`lblF${i}o`, `F${'₁₂₃'[i - 1]}`, { intro: 2, color: PAL.green, when: fOn[i] });
  }

  // step 3: trial pole O' + rays (outer th2, inner th1, like the applet)
  dw.seg('ray0', { intro: 3, w: W_RAY2 });
  dw.seg('ray1', { intro: 3, w: W_RAY1 });
  dw.seg('ray2', { intro: 3, w: W_RAY1 });
  dw.seg('ray3', { intro: 3, w: W_RAY2 });
  dw.label('lbl_Op', 'O′', { cls: 'point', intro: 3 });

  // step 4: the trial funicular (black th2, like the applet)
  for (let i = 0; i < 4; i++) dw.seg(`fun${i}`, { intro: 4, w: W_BAR });
  for (let i = 0; i < 4; i++) dw.highlight(`ray${i}`, [4]);
  dw.label('lbl_C1', 'C₁', { cls: 'point', intro: 4 });
  dw.label('lbl_H1', 'H₁', { cls: 'point', intro: 4 });

  // step 5: closing line + the division parallel through O' (grey dashed)
  dw.dashLine('closing', { intro: 5, dash: 0.3 });              // C_1-H_1
  dw.dashLine('gb3', { intro: 5, dash: 0.3 });                  // O' -> I_1
  dw.label('lbl_I1', 'I₁', { cls: 'point', intro: 5 });

  // step 6: reactions at the supports + offset chain beside the load line
  dw.arrow('reAH', { intro: 6, ...ARROW });
  dw.arrow('reAV', { intro: 6, ...ARROW });
  dw.arrow('reB', { intro: 6, ...ARROW });
  dw.label('lblAH', 'A_H', { intro: 6, color: PAL.green });
  dw.label('lblAV', 'A_V', { intro: 6, color: PAL.green });
  dw.label('lblBf', 'B', { intro: 6, color: PAL.green });
  dw.arrow('ofB', { intro: 6, ...ARROW });
  dw.arrow('ofA', { intro: 6, ...ARROW });
  dw.label('lblAo', 'A', { intro: 6, color: PAL.green });
  dw.label('lblBo', 'B', { intro: 6, color: PAL.green });
  dw.dashLine('wS', { intro: 6, dash: 0.18, color: PAL.black }); // whiskers (dotted black)
  dw.dashLine('wI', { intro: 6, dash: 0.18, color: PAL.black });
  dw.dashLine('wZ', { intro: 6, dash: 0.18, color: PAL.black });

  // steps 7-10: the V-diagram (black outline + grey hatch, like the applet)
  dw.dashLine('vbase', { intro: 7, dash: 0.28, color: PAL.black });
  dw.strokes('vout1', 2, { intro: 8, w: W_BAR, color: PAL.black });
  dw.highlight('ofA', [8]);
  dw.highlight('reAV', [8]);
  dw.strokes('vout2', 4, { intro: 9, w: W_BAR, color: PAL.black });
  dw.highlight('ldF1', [9]);
  dw.highlight('ldF2', [9]);
  dw.strokes('vout3', 4, { intro: 10, w: W_BAR, color: PAL.black });
  dw.highlight('ofB', [10]);
  dw.highlight('reB', [10]);
  dw.highlight('ldF3', [10]);
  dw.strokes('vhatch', NH, { intro: 10, w: 0.025, color: HATCH, flash: false });

  // step 11: the force cascade + dotted level extensions
  dw.dashLine('lvlA', { intro: 11, dash: 0.28, color: PAL.black });
  dw.dashLine('lvl1', { intro: 11, dash: 0.28, color: PAL.black });
  dw.dashLine('lvl2', { intro: 11, dash: 0.28, color: PAL.black });
  dw.dashLine('lvlB', { intro: 11, dash: 0.28, color: PAL.black });
  const CASL = ['A', 'F₁', 'F₂', 'B', 'F₃'];
  for (let i = 0; i < 5; i++) {
    dw.arrow(`cas${i}`, { intro: 11, ...ARROW });
    dw.label(`lblCas${i}`, CASL[i], { intro: 11, color: PAL.green });
  }

  // step 12: the V-levels stacked into the second load line
  dw.seg('vll', { intro: 12, w: W_BAR });                       // P_2-S_2
  dw.label('lbl_N2', 'N₂', { cls: 'point', intro: 12 });
  for (let i = 0; i < 5; i++) dw.highlight(`cas${i}`, [12]);

  // step 13: pole O" on the baseline + the red pole distance H
  dw.dashLine('rayBN', { intro: 13, dash: 0.3 });               // O"-N_2 (grey dashed)
  dw.seg('segH', { intro: 13, w: 0.075, color: RED });          // S_3-T_3, caption H
  dw.label('lblH', 'H', { intro: 13, color: RED });
  dw.dashLine('gt5', { intro: 13, dash: 0.18, color: PAL.black }); // S_2 -> S_3
  dw.dashLine('ga6', { intro: 13, dash: 0.18, color: PAL.black }); // O" -> T_3
  dw.label('lbl_O2', 'O″', { cls: 'point', intro: 13 });

  // steps 14-16: the M funicular, string by string WITH its ray
  dw.seg('rayB0', { intro: 14, w: W_RAY1 });                    // O"-Q_2
  dw.seg('mfun0', { intro: 14, w: W_BAR });                     // T_2-U_2
  dw.label('n1o', '1', { cls: 'num', intro: 14 });
  dw.label('n1f', '1', { cls: 'num', intro: 14 });
  dw.label('lbl_T2', 'T₂', { cls: 'point', intro: 14 });
  dw.seg('rayB1', { intro: 15, w: W_RAY1 });                    // O"-R_2
  dw.seg('mfun1', { intro: 15, w: W_BAR });                     // U_2-V_2
  dw.seg('rayB2', { intro: 15, w: W_RAY2 });                    // O"-S_2
  dw.seg('mfun2', { intro: 15, w: W_BAR });                     // V_2-W_2
  dw.label('n2o', '2', { cls: 'num', intro: 15 });
  dw.label('n2f', '2', { cls: 'num', intro: 15 });
  dw.label('n3o', '3', { cls: 'num', intro: 15 });
  dw.label('n3f', '3', { cls: 'num', intro: 15 });
  dw.seg('rayB3', { intro: 16, w: W_RAY2 });                    // O"-P_2
  dw.seg('mfun3', { intro: 16, w: W_BAR });                     // W_2-Z_2
  dw.seg('mfun4', { intro: 16, w: W_BAR });                     // Z_2-T_2 (baseline edge)
  dw.label('n4o', '4', { cls: 'num', intro: 16 });
  dw.label('n4f', '4', { cls: 'num', intro: 16 });
  dw.strokes('mhatch', NH, { intro: 16, w: 0.025, color: HATCH, flash: false });

  // step 17: the y ordinate + M = y*H readout (the applet's text8)
  dw.seg('ordy', { intro: 17, w: 0.075, color: RED });
  dw.label('lbly', 'y', { intro: 17, color: RED });
  dw.highlight('segH', [17]);
  dw.label('roM1', '', { intro: 17, flash: false });
  dw.label('roM2', '', { intro: 17, flash: false });
  dw.label('roM3', '', { intro: 17, flash: false });

  // final readouts
  dw.label('roA', '', { intro: RESOLVE, flash: false, color: PAL.green });
  dw.label('roB', '', { intro: RESOLVE, flash: false, color: PAL.green });

  // points (white face, black boundary; handles slightly larger)
  const HANDLE = { r: 0.11 }, DERIVED = { r: 0.085 };
  const show = (st) => st.n4;
  dw.disk('pt_B', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_D', { intro: 2, ...HANDLE, when: show });
  dw.disk('pt_E', { intro: 2, ...HANDLE, when: show });
  dw.disk('pt_F', { intro: 2, ...HANDLE, when: show });
  dw.disk('pt_S', { intro: 2, ...HANDLE, when: show });
  dw.disk('pt_pole', { intro: 3, ...HANDLE, when: show });
  dw.disk('pt_C1', { intro: 4, ...HANDLE, when: show });
  for (const p of ['D1', 'E1', 'G1', 'H1']) dw.disk(`pt_${p}`, { intro: 4, ...DERIVED, when: show });
  dw.disk('pt_I1', { intro: 5, ...DERIVED, when: show });
  dw.disk('pt_N1', { intro: 7, ...HANDLE, when: show });
  for (let i = 0; i < 5; i++) dw.disk(`pt_cas${i}`, { intro: 11, ...HANDLE, when: show });
  dw.disk('pt_N2', { intro: 12, ...HANDLE, when: show });
  dw.disk('pt_O2', { intro: 13, ...HANDLE, when: show });
  dw.disk('pt_S3', { intro: 13, ...HANDLE, when: show });
  dw.disk('pt_T2', { intro: 14, ...HANDLE, when: show });

  // node-equilibrium inspector: five trial-funicular kinks + the whole beam
  dw.nodeInspector(5, { when: (st) => st.node > 0, w: 0.09, headLen: 0.34, headW: 0.16, r: 0.15 });

  // dual pairs: hovering either side highlights the whole group
  for (let i = 1; i <= 3; i++) dw.link(`ldF${i}`, `llF${i}`, `cas${i === 3 ? 4 : i}`, `lblF${i}f`, `lblF${i}o`, `lblCas${i === 3 ? 4 : i}`);
  for (let i = 0; i < 4; i++) dw.link(`fun${i}`, `ray${i}`);
  dw.link('closing', 'gb3');
  dw.link('reAV', 'ofA', 'cas0', 'lblAV', 'lblAo', 'lblCas0');
  dw.link('reB', 'ofB', 'cas3', 'lblBf', 'lblBo', 'lblCas3');
  dw.link('mfun0', 'rayB0', 'n1f', 'n1o');
  dw.link('mfun1', 'rayB1', 'n2f', 'n2o');
  dw.link('mfun2', 'rayB2', 'n3f', 'n3o');
  dw.link('mfun3', 'rayB3', 'n4f', 'n4o');
  dw.link('mfun4', 'rayBN');
  dw.link('ordy', 'segH', 'lbly', 'lblH');
  dw.ghostable('llF1', 'llF2', 'llF3', 'vll', 'segH', 'rayB0', 'rayB1', 'rayB2', 'rayB3');

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('t_form', [2.2, 12.15]);
    dw.setLabel('t_force', [13.7, 12.15]);
    dw.setLabel('t_trial', [1.9, 9.15]);
    dw.setLabel('t_trial2', [1.9, 8.65]);
    dw.setLabel('t_v', [1.9, 6.65]);
    dw.setLabel('t_m', [1.9, 4.15]);
    dw.setLabel('t_fd1', [19.6, 10.15]);
    dw.setLabel('t_fd1b', [19.6, 9.65]);
    dw.setLabel('t_fd2', [19.6, 6.95]);
    dw.setLabel('t_fd2b', [19.6, 6.45]);

    dw.setSeg('beam', d.A, d.G);
    // pin at A: triangle (side g) + ground line + hatch ticks; roller at B:
    // wheel circle r = g*sqrt(3)/4 tangent to beam and ground (the applet's
    // supportHingeHorizontalLeft / supportRollerHorizontal macros)
    const g = 0.5 * s.sLS;
    const gy = (P) => P[1] - 0.86602540378 * g;                 // ground level
    const tick = (x, y) => [[x, y], [x - 0.26 * g, y - 0.45 * g]];
    const ground = (P) => {
      const y0 = gy(P), out = [[[P[0] - 1.2 * g, y0], [P[0] + 1.2 * g, y0]]];
      for (let i = 0; i < 7; i++) out.push(tick(P[0] - 1.05 * g + i * 0.375 * g, y0));
      return out;
    };
    dw.setStrokes('pinA', [
      [d.A, [d.A[0] - 0.5 * g, gy(d.A)]],
      [d.A, [d.A[0] + 0.5 * g, gy(d.A)]],
      [[d.A[0] - 0.5 * g, gy(d.A)], [d.A[0] + 0.5 * g, gy(d.A)]],
      ...ground(d.A),
    ]);
    dw.setStrokes('rolB', ground(d.B));
    dw.setCircle('rolC', [d.B[0], d.B[1] - 0.43301270189 * g], 0.43301270189 * g);
    dw.setDashLine('vA', [[AX, CLIP[0]], [AX, CLIP[1]]]);
    dw.setDashLine('vB', [[s.xB, CLIP[0]], [s.xB, CLIP[1]]]);
    dw.setLabel('lbl_A', [AX - 0.6, AY - 0.95]);
    dw.setLabel('lbl_B', [s.xB + 0.42, AY + 0.28]);

    dw.setDashLine('rail1', [[RAIL1[0], LOADY], [RAIL1[1], LOADY]]);
    dw.setDashLine('rail2', [[RAIL2[0], LOADY], [RAIL2[1], LOADY]]);
    dw.setDashLine('v1', [[s.xF1, CLIP[0]], [s.xF1, CLIP[1]]]);
    dw.setDashLine('v2', [[s.xF2, CLIP[0]], [s.xF2, CLIP[1]]]);
    dw.setDashLine('vTip', [[s.xF3, CLIP[0]], [s.xF3, CLIP[1]]]);
    const lx = [s.xF1, s.xF2, s.xF3];
    for (let i = 1; i <= 3; i++) {
      dw.setArrow(`ldF${i}`, [lx[i - 1], LOADY], [lx[i - 1], LOADY - s.sLS]);
      dw.setLabel(`lblF${i}f`, [lx[i - 1] + 0.38, LOADY - 0.45 * s.sLS]);
    }

    const lls = [[d.S, d.T], [d.T, d.Vp], [d.Vp, d.Z]];
    for (let i = 1; i <= 3; i++) {
      dw.setArrow(`llF${i}`, lls[i - 1][0], lls[i - 1][1]);
      dw.setLabel(`lblF${i}o`, V.add(V.mid(lls[i - 1][0], lls[i - 1][1]), [-0.4, 0]));
    }

    const rays = [[d.pole, d.S], [d.pole, d.T], [d.pole, d.Vp], [d.pole, d.Z]];
    for (let i = 0; i < 4; i++) dw.setSeg(`ray${i}`, rays[i][0], rays[i][1]);
    dw.setLabel('lbl_Op', V.add(d.pole, [-0.45, 0.1]));

    const fpts = [d.C1, d.D1, d.E1, d.G1, d.H1];
    for (let i = 0; i < 4; i++) dw.setSeg(`fun${i}`, fpts[i], fpts[i + 1]);
    dw.setLabel('lbl_C1', V.add(d.C1, [-0.5, -0.1]));
    dw.setLabel('lbl_H1', V.add(d.H1, [-0.5, -0.5]));

    dw.setDashLine('closing', [d.C1, d.H1]);
    dw.setDashLine('gb3', [d.pole, d.I1]);
    dw.setLabel('lbl_I1', V.add(d.I1, [-0.5, 0.3]));

    dw.setArrow('reAH', [AX - 2.7 * g, AY], [AX - 0.7 * g, AY]);
    dw.setArrow('reAV', [AX, AY - 3.566 * g], [AX, AY - 1.566 * g]);
    dw.setArrow('reB', [s.xB, AY - 3.566 * g], [s.xB, AY - 1.566 * g]);
    dw.setLabel('lblAH', [AX - 2.2 * g, AY + 0.42]);
    dw.setLabel('lblAV', [AX + 0.55, AY - 2.6 * g]);
    dw.setLabel('lblBf', [s.xB + 0.45, AY - 2.6 * g]);
    dw.setArrow('ofB', d.M1, d.L1);
    dw.setArrow('ofA', d.L1, d.K1);
    dw.setLabel('lblAo', V.add(V.mid(d.L1, d.K1), [0.4, 0]));
    dw.setLabel('lblBo', V.add(V.mid(d.M1, d.L1), [0.4, 0]));
    dw.setDashLine('wS', [d.S, d.K1]);
    dw.setDashLine('wI', [d.I1, d.L1]);
    dw.setDashLine('wZ', [d.Z, d.M1]);

    dw.setDashLine('vbase', [[AX, s.n1y], [s.xN2, s.n1y]]);
    const P = d.vpts;
    dw.setStrokes('vout1', [[P[0], P[1]], [P[1], P[2]]]);
    dw.setStrokes('vout2', [[P[2], P[3]], [P[3], P[4]], [P[4], P[5]], [P[5], P[6]]]);
    dw.setStrokes('vout3', [[P[6], P[7]], [P[7], P[8]], [P[8], P[9]], [P[9], P[0]]]);
    const vh = [];
    for (let x = AX + HSP / 2; x < s.xF3; x += HSP) vh.push([[x, s.n1y], [x, d.vAt(x)]]);
    while (vh.length < NH) vh.push([[AX, s.n1y], [AX, s.n1y]]);
    dw.setStrokes('vhatch', vh.slice(0, NH));

    dw.setDashLine('lvlA', [[AX, d.lvA], [s.xN2, d.lvA]]);
    dw.setDashLine('lvl1', [[AX, d.lv1], [s.xN2, d.lv1]]);
    dw.setDashLine('lvl2', [[AX, d.lv2], [s.xN2, d.lv2]]);
    dw.setDashLine('lvlB', [[AX, d.lvB], [s.xN2, d.lvB]]);
    for (let i = 0; i < 5; i++) {
      dw.setArrow(`cas${i}`, [d.casX[i], d.casT[i]], [d.casX[i], d.casH[i]]);
      dw.setLabel(`lblCas${i}`, [d.casX[i] + 0.34, (d.casT[i] + d.casH[i]) / 2]);
      dw.setDisk(`pt_cas${i}`, [d.casX[i], d.casT[i]]);
    }

    dw.setSeg('vll', d.P2, d.S2);
    dw.setLabel('lbl_N2', V.add(d.N2, [-0.28, -0.4]));
    dw.setSeg('rayB0', d.O2, d.Q2);
    dw.setSeg('rayB1', d.O2, d.R2);
    dw.setSeg('rayB2', d.O2, d.S2);
    dw.setSeg('rayB3', d.O2, d.P2);
    dw.setDashLine('rayBN', [d.O2, d.N2]);
    dw.setSeg('segH', [s.xN2, s.s3y], [s.xO2, s.s3y]);
    dw.setLabel('lblH', [(s.xN2 + s.xO2) / 2, s.s3y - 0.4]);
    dw.setDashLine('gt5', [d.S2, [s.xN2, s.s3y]]);
    dw.setDashLine('ga6', [d.O2, [s.xO2, s.s3y]]);
    dw.setLabel('lbl_O2', V.add(d.O2, [0.42, 0.22]));

    const mp = d.mpts;
    for (let i = 0; i < 4; i++) dw.setSeg(`mfun${i}`, mp[i], mp[i + 1]);
    dw.setSeg('mfun4', d.Z2, d.T2);
    dw.setLabel('lbl_T2', V.add(d.T2, [-0.5, -0.1]));
    // string / ray numbers: beside the midpoints, clear of the lines
    const numAt = (a, b, side) => {
      const u = V.unit(V.sub(b, a));
      const p = V.perp(u);
      const q = (side * p[1] >= 0) ? p : V.mul(p, -1);
      return V.add(V.mid(a, b), V.mul(q, 0.34));
    };
    dw.setLabel('n1f', numAt(mp[0], mp[1], -1));
    dw.setLabel('n2f', numAt(mp[1], mp[2], -1));
    dw.setLabel('n3f', numAt(mp[2], mp[3], 1));
    dw.setLabel('n4f', numAt(mp[3], mp[4], 1));
    // ray numbers: along each ray of the tight fan, pushed outward so
    // neighbours (incl. the grey baseline ray) stay clear
    const rayNum = (end, t, side) => {
      const p = V.add(d.O2, V.mul(V.sub(end, d.O2), t));
      return V.add(p, [0, side * 0.28]);
    };
    dw.setLabel('n1o', rayNum(d.Q2, 0.85, -1));
    dw.setLabel('n2o', rayNum(d.R2, 0.85, -1));
    dw.setLabel('n3o', rayNum(d.S2, 0.6, -1));
    dw.setLabel('n4o', rayNum(d.P2, 0.6, 1));
    const mh = [];
    for (let x = AX + HSP / 2; x < s.xF3; x += HSP) mh.push([[x, s.t2y], [x, d.mAt(x)]]);
    while (mh.length < NH) mh.push([[AX, s.t2y], [AX, s.t2y]]);
    dw.setStrokes('mhatch', mh.slice(0, NH));

    dw.setSeg('ordy', d.U3, d.U2);
    dw.setLabel('lbly', V.add(V.mid(d.U3, d.U2), [0.25, 0]));
    dw.setLabel('roM1', [18.6, 4.2]);
    dw.setLabel('roM2', [18.75, 3.65]);
    dw.setLabel('roM3', [18.68, 3.1]);
    dw.setText('roM1', 'M = y · H =');
    dw.setText('roM2', `= ${d.yv.toFixed(2)} · ${d.H.toFixed(2)} =`);
    dw.setText('roM3', `= ${d.Mval.toFixed(2)} kNm`);

    dw.setLabel('roA', [19.0, 8.65]);
    dw.setLabel('roB', [19.0, 8.15]);
    dw.setText('roA', `A = ${d.Akn.toFixed(2)} kN`);
    dw.setText('roB', `B = ${d.Bkn.toFixed(2)} kN`);

    dw.setDisk('pt_B', d.B);
    dw.setDisk('pt_D', [s.xF1, LOADY]);
    dw.setDisk('pt_E', [s.xF2, LOADY]);
    dw.setDisk('pt_F', [s.xF3, LOADY]);
    dw.setDisk('pt_S', d.S);
    dw.setDisk('pt_pole', d.pole);
    dw.setDisk('pt_C1', d.C1);
    dw.setDisk('pt_D1', d.D1);
    dw.setDisk('pt_E1', d.E1);
    dw.setDisk('pt_G1', d.G1);
    dw.setDisk('pt_H1', d.H1);
    dw.setDisk('pt_I1', d.I1);
    dw.setDisk('pt_N1', [AX, s.n1y]);
    dw.setDisk('pt_N2', d.N2);
    dw.setDisk('pt_O2', d.O2);
    dw.setDisk('pt_S3', [s.xN2, s.s3y]);
    dw.setDisk('pt_T2', d.T2);
  }

  // node-equilibrium inspector: the trial funicular's five kinks (each closes
  // a triangle in the trial force diagram; the support nodes use the VISIBLE
  // offset reaction arrows) + the whole beam (loads + both reactions).
  const NODE_NAMES = ['start C₁ (pin A)', 'under F₁', 'under F₂',
                      'tip (under F₃)', 'end H₁ (roller B)', 'whole beam'];
  const NODE_DISKS = ['pt_C1', 'pt_D1', 'pt_E1', 'pt_G1', 'pt_H1', null];
  const nodeAt = [() => d.C1, () => d.D1, () => d.E1, () => d.G1, () => d.H1,
                  () => [(s.xF1 + s.xF2) / 2, AY]];
  const nodePolys = () => [
    [[d.L1, d.K1], [d.S, d.pole], [d.pole, d.I1]],              // A, string 1, closing
    [[d.S, d.T], [d.T, d.pole], [d.pole, d.S]],                 // F1 + its two rays
    [[d.T, d.Vp], [d.Vp, d.pole], [d.pole, d.T]],               // F2
    [[d.Vp, d.Z], [d.Z, d.pole], [d.pole, d.Vp]],               // F3
    [[d.M1, d.L1], [d.I1, d.pole], [d.pole, d.Z]],              // B, closing, string 4
    [[d.S, d.T], [d.T, d.Vp], [d.Vp, d.Z], [d.M1, d.L1], [d.L1, d.K1]],
  ];

  function updateNode() {
    const j = Math.max(0, Math.min(5, Math.round(s.node) - 1));
    dw.selectDisk(s.node > 0 ? NODE_DISKS[j] : null);
    dw.setNodeInspector(nodeAt[j](), j === 5 ? 1.15 : 0.7, NODE_NAMES[j], nodePolys()[j]);
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
  panel.slider(par, s, 'F1', 'F1 (kN)', 0, 2, 0.05, refresh);
  panel.slider(par, s, 'F2', 'F2 (kN)', 0, 2, 0.05, refresh);
  panel.slider(par, s, 'F3', 'F3 (kN)', 0, 2, 0.05, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram', 0.5, 2, 0.05, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 0.2, 1, 0.05, refresh);
  panel.slider(par, s, 'off', 'offset reaction forces', 0, 1, 0.05, refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off, 1 = C₁, 2–4 = under F₁–F₃, 5 = H₁, 6 = beam)', 0, 6, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS });
    panel.syncAll();
    refresh();
  });

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const hits = [
    ['D', () => [s.xF1, LOADY], 2, 99], ['E', () => [s.xF2, LOADY], 2, 99],
    ['F', () => [s.xF3, LOADY], 2, 99], ['B', () => d.B, 1, 99],
    ['S', () => d.S, 2, 99], ['pole', () => d.pole, 3, 99],
    ['C1', () => d.C1, 4, 99], ['N1', () => [AX, s.n1y], 7, 99],
    ['cx0', () => [d.casX[0], d.casT[0]], 11, 99],
    ['cx1', () => [d.casX[1], d.casT[1]], 11, 99],
    ['cx2', () => [d.casX[2], d.casT[2]], 11, 99],
    ['cx3', () => [d.casX[3], d.casT[3]], 11, 99],
    ['cx4', () => [d.casX[4], d.casT[4]], 11, 99],
    ['N2', () => d.N2, 12, 99], ['O2', () => d.O2, 13, 99],
    ['S3', () => [s.xN2, s.s3y], 13, 99], ['T2', () => d.T2, 14, 99],
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
      if (name === 'D') s.xF1 = clamp(wx, RAIL1[0], RAIL1[1]);
      else if (name === 'E') s.xF2 = clamp(wx, RAIL2[0], RAIL2[1]);
      else if (name === 'F') s.xF3 = clamp(wx, s.xB + 0.25, 12.6);
      else if (name === 'B') s.xB = clamp(wx, s.xF2 + 0.05, s.xF3 - 0.25);
      else if (name === 'S') { s.sx = wx; s.sy = wy; }
      else if (name === 'pole') { s.px = wx; s.py = wy; }
      else if (name === 'C1') s.c1y = clamp(wy, 7.4, 9.9);
      else if (name === 'N1') s.n1y = clamp(wy, 5.9, 7.3);
      else if (name === 'N2') s.xN2 = clamp(wx, s.xF3 + 0.2, s.xO2 - 0.4);
      else if (name === 'O2') s.xO2 = clamp(wx, s.xN2 + 0.4, 16.5);
      else if (name === 'S3') s.s3y = clamp(wy, 3.6, s.n1y - 0.4);
      else if (name === 'T2') s.t2y = clamp(wy, 2.7, 4.4);
      else if (name.startsWith('cx')) s[name] = clamp(wx, AX + 0.2, s.xN2 - 0.1);
      refresh();
    },
  );

  // click a trial-funicular kink (or the beam) to inspect it
  dw.nodeSelect(nodeAt.map((at) => ({ at })), (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
