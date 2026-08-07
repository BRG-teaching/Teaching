/**
 * Drawing view/51 "Burgo Factory, P. L. Nervi"
 * (https://block.arch.ethz.ch/eq/drawing/view/51) as a step-by-step
 * construction.
 *
 * Nervi's Burgo paper mill: a suspension ROOF. The deck (the tie) spans
 * x 3.25..13.75 and hangs from a 16-panel funicular cable between the two
 * pylon tops D and E; the back spans continue over back-stay cables down to
 * the deck-edge anchors W / W', where the deck itself takes the horizontal
 * pull D = F. The inclined tapered concrete columns lean exactly along the
 * resultant G of cable pull A' + hanger load Q + own weight wCC + back-stay
 * pull C' -- drag the sag Z_3 or the anchor W and watch them tilt.
 *
 * Live port of view_51/applet_0/geogebra.xml; the full chain (67 derived
 * points, three dragged states) matches the LIVE applet to ~3e-14
 * (scratchpad/v51_regress.py). The applet's panoramic photograph of the
 * built factory ships as the actual image (assets/view_51_photo.jpg,
 * anchors W_8 (3,8) -> Z_8 (14,8), layer far behind).
 * See notes/view_51_analysis.md.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 51 — Burgo Factory, P. L. Nervi',
  subtitle: 'a suspension roof: cable, back stays, tie deck, leaning columns',
  about: 'Nervi\'s Burgo paper mill is a suspension roof: the deck hangs from a 16-panel funicular cable spanning the two pylon tops, and the back-stay cables run down to the deck edges, where the deck itself is the tie that takes the horizontal pull. The pole of the force diagram comes from the classic half-sag trial: chords through the doubled sag point give parallels through the load-line ends. The concrete columns lean exactly along the resultant of cable pull, hanger load, own weight and back-stay pull — drag the sag or the anchors and watch them tilt.',
  frame: [[2.3, 2.1], [21.7, 11.9]],
};

// fixed applet geometry (see notes/view_51_analysis.md)
const XD = 5, XE = 12, MID = 8.5;
const YD = 10.153136723313027;            // pylon-top level
const STEP = 0.4375;                      // panel width (span/16)
const YTOP = 10.982348420669101;          // action-line top (B_1)
const YBOT = 7.133908615396561;           // action-line bottom (C_1)
const RAIL_W = [8.549507880885875, 10];   // anchor rail (V..U)
const RAIL_Z = [8.549507880885875, 9.758488409417986];  // sag rail (B..A)
const YGROUND = 8.182518660011068;        // column base level (I_5)
const WCC = 4;                            // weightConcreteColumn_1 (fixed)
const COLR = 0.1;                         // column half-width (fixed)
const S5_TH = -2.764888777044788;         // taper kink angle on Circle(R_5)
const XS = [];                            // 25 lines of action
for (let k = 0; k < 25; k++) XS.push(XD - 4 * STEP + k * STEP);

const D0 = [XD, YD], E0 = [XE, YD];

// photo anchors (applet pic2: W_8 -> Z_8, 853x190 px)
const IM_BL = [3, 8], IM_BR = [14, 8];
const IM_H = 190 / 853;

const TR_END = 6;                         // cable trial retires (applet step 3 only)
const TR2_END = 9;                        // back-stay trial retires (applet step 5 only)
const RESOLVE = 14;

const DEFAULTS = {
  z3y: 9.17,                              // sag point Z_3 (reset geometry)
  wy: 9.1,                                // anchor W (reset geometry)
  E3: [3.691952245207545, 6.646516904347353],     // load-line 1 anchor
  Q4: [10.762753482803692, 5.620110273083411],    // load-line 2 anchor
  H5: [15.457613444325863, 10.524053066900018],   // column-polygon anchor
  m7y: 8,                                 // R_1 arrow height (M_7)
  o8y: 10,                                // Q arrow height (O_8)
  f8x: 11.516259663538886,                // mirror axis (F_8)
  c8x: 2.6895205362017847,                // "D" arrow tip (C_8)
  sFD: 1,                                 // scaleForceDiagram [0.5, 2]
  sLS: 0.55,                              // scaleLoadSymbol [0.2, 2]
  ph: true,                               // show photo (applet pic2)
  n4: false,                              // show points (applet showPoints)
  node: 0,
  _k: 99,
};

// every construction move happens on BOTH sides at once
const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The site: Nervi\'s suspension roof', d: 'left: the built factory; 25 dotted lines of action divide the main span D–E in 16 and each back span in 4; dash-dot rails mark the draggable sag Z₃ and anchor W' },
  { t: 'The deck and its load q', d: 'left: the deck spans the whole roof at the anchor level (drag W) and carries the distributed load q (green strips)' },
  { t: 'The resultant R₁ of the main span', d: 'left: the main span\'s load resultant R₁ at midspan — right: the load line: 16 tributary loads stacked tip-to-tail, R₁ = 4 units (drag its top E₃)' },
  { t: 'The sag and the trial chords', d: 'left: choose the sag Z₃; the chords D–A₄–E through the DOUBLED sag (grey, dashed) — right: parallels to the chords through the ends of the load line meet at the pole (a funicular polygon of a uniform load sags half its resultant triangle)' },
  { t: 'The cable', d: 'right: rays from the pole to every load-line division — left: from Z₃ outward, each cable side parallel to its ray: the funicular lands exactly on D and E' },
  { t: 'The hangers', d: 'left: at every line of action a hanger drops from the cable to the deck — right: each carries one tributary piece of the load line R₁' },
  { t: 'The back-span load R₂', d: 'left: each back span carries the resultant R₂ — right: its own load line: ⅛ + ¼ + ¼ + ¼ + ⅛ = 1 unit from Q₄ (drag it)' },
  { t: 'The back-stay pole', d: 'left: the trial chord W–D (grey, dashed) — right: halve the load line (grey ½ marks), draw the parallel to the chord through the midpoint: the pole sits where it cuts the horizontal through the bottom', },
  { t: 'The left back stay', d: 'left: from the anchor W up to the pylon top D, each side parallel to its ray; hangers pick up the back span — right: the force triangle closes: C = pole→top pulls at D, D = bottom→pole is the HORIZONTAL pull the deck takes as a tie' },
  { t: 'The right back stay', d: 'left: the mirror image up to E, with the tie pull F at W′ — right: the mirrored triangle: R₂, E and F', },
  { t: 'The forces on the column head', d: 'left: the cable pulls back with A′, the back stay with C′, the pylon hanger hangs Q on the head, and the column weighs wCC — right: laid off tip-to-tail from H₅', },
  { t: 'The column force G', d: 'right: the polygon closes: G balances A′ + Q + wCC + C′ — left: the column axis (dashed) is drawn PARALLEL to G through D: reactions G and H at the feet' },
  { t: 'The concrete columns', d: 'left: Nervi\'s tapered columns built around the axes — lean them by dragging the sag Z₃ or the anchor W: the axis always follows G' },
  { t: 'Tension and compression', d: 'cable, hangers, back stays and the tie deck resolve pink = tension; the columns blue = compression — click any node (or use the slider) for its equilibrium' },
];

function line_x(p, d, x) { return [x, p[1] + ((x - p[0]) / d[0]) * d[1]]; }
function line_y(p, d, y) { return [p[0] + ((y - p[1]) / d[1]) * d[0], y]; }

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const Wp = [XS[0], s.wy];
  const Z3 = [MID, s.z3y];

  // load line 1: 18 drops
  const drops = [1 / 8, ...Array(7).fill(1 / 4), 1 / 8, 1 / 8,
                 ...Array(7).fill(1 / 4), 1 / 8];
  const LL = [s.E3.slice()];
  for (const dr of drops) LL.push([s.E3[0], LL[LL.length - 1][1] - dr * s.sFD]);
  const W3 = LL[18], N3 = LL[9];

  // trial chords -> pole B4
  const A4 = [MID, 2 * s.z3y - YD];
  const dm = V.sub(A4, D0), dn = V.sub(E0, A4);
  const B4 = V.intersect(s.E3, dm, W3, dn);

  // main cable: from Z3 leftward (rays LL[8]..LL[2]), D closes // LL[1]
  const cab = [Z3];
  for (let k = 8; k >= 2; k--) {
    cab.push(line_x(cab[cab.length - 1], V.sub(LL[k], B4), XS[11 - (8 - k)]));
  }
  // cab = [Z3, D_4@xs11, E_4@xs10, F_4, G_4, H_4, I_4, C_4@xs5]
  const cabPts = [D0, ...cab.slice(1).reverse(), Z3];         // D..C_4..D_4..Z3
  for (let i = 1; i <= 7; i++) cabPts.push([2 * MID - cab[i][0], cab[i][1]]);
  cabPts.push(E0);                                            // ..J_4..P_4, E

  // load line 2 -> back-stay pole Z4
  const drops2 = [1 / 8, 1 / 4, 1 / 4, 1 / 4, 1 / 8];
  const L2 = [s.Q4.slice()];
  for (const dr of drops2) L2.push([s.Q4[0], L2[L2.length - 1][1] - dr * s.sFD]);
  const [Q4, R4, S4, T4, U4, V4] = L2;
  const W4 = V.mid(Q4, V4);
  const Z4 = V.intersect(W4, V.sub(D0, Wp), V4, [1, 0]);

  // left back stay W -> A5 -> B5 -> C5 -> D
  const A5 = line_x(Wp, V.sub(U4, Z4), XS[1]);
  const B5 = line_x(A5, V.sub(T4, Z4), XS[2]);
  const C5 = line_x(B5, V.sub(S4, Z4), XS[3]);
  const bsL = [Wp, A5, B5, C5, D0];
  const Wq = [2 * MID - Wp[0], Wp[1]];                        // W'
  const bsR = [E0, ...[C5, B5, A5].map((p) => [2 * MID - p[0], p[1]]), Wq];

  // mirrored force triangle 2 about the vertical through F_8
  const M9 = (p) => [2 * s.f8x - p[0], p[1]];
  const m2 = { Q: M9(Q4), R: M9(R4), S: M9(S4), T: M9(T4), U: M9(U4), V: M9(V4),
               W: M9(W4), Z: M9(Z4) };

  // column force polygon (diagram 3)
  const J5 = V.add(s.H5, V.sub(B4, s.E3));
  const L5 = [J5[0], J5[1] - s.sFD / 4];
  const M5 = [L5[0], L5[1] - WCC * s.sFD];
  const N5 = V.add(M5, V.sub(Z4, Q4));
  const Gv = V.sub(s.H5, N5);

  // inclined columns
  const K5 = line_y(D0, Gv, YGROUND);
  const O5 = [K5[0] - COLR, YGROUND], P5 = [K5[0] + COLR, YGROUND];
  const R5 = V.mid(D0, O5);
  const S5 = [R5[0] + 2.5 * COLR * Math.cos(S5_TH), R5[1] + 2.5 * COLR * Math.sin(S5_TH)];
  const Q5 = V.intersect(P5, Gv, D0, [-Gv[1], Gv[0]]);
  const colL = [Q5, D0, S5, K5, P5];
  const colR = colL.map((p) => [2 * MID - p[0], p[1]]);
  const V5 = [2 * MID - K5[0], K5[1]];

  // arrow helpers
  const uA = V.unit(V.sub(s.E3, B4));                         // cable dir at D (up-left)
  const uC = V.unit(V.sub(Q4, Z4));                           // back-stay dir at D (up-right)
  const V6 = V.add(D0, V.mul(uA, s.sLS));
  const W6 = V.sub(D0, V.mul(uA, s.sLS));
  const A7 = V.add(D0, V.mul(uC, s.sLS));
  const Z6 = V.sub(D0, V.mul(uC, s.sLS));
  const O7 = [2 * MID - V6[0], V6[1]];
  const W7 = [2 * MID - A7[0], A7[1]];
  const M7 = [MID, s.m7y];
  const P7 = [XS[2], s.m7y];
  const D8 = [XS[22], s.m7y];
  const O8 = [XD, s.o8y];
  const C8 = [s.c8x, s.wy];
  const U8 = [2 * MID - s.c8x, s.wy];
  const U7 = V.sub(K5, V.mul(V.unit(Gv), s.sLS));
  const V7 = [2 * MID - U7[0], U7[1]];

  // back-stay trial apparatus (applet step 5)
  const A8 = line_x(W4, V.sub(D0, Wp), 9.538461124340163);    // on e_4, saved default
  const B8 = [9.111594316037818, V4[1]];                      // on c_4, saved default
  const F8 = [s.f8x, Q4[1]];
  const S8 = [s.f8x, W4[1]], T8 = [s.f8x, V4[1]];

  // deck strips
  const E7 = [Wp[0], Wp[1] - s.sLS / 4];
  const yq = E7[1];
  const I7 = [(XS[3] + XD) / 2, Wp[1]], J7 = [(XD + XS[5]) / 2, Wp[1]];

  const done = s._k >= RESOLVE;
  return { Wp, Wq, Z3, LL, W3, N3, A4, B4, cabPts, L2, Q4, R4, S4, T4, U4, V4,
           W4, Z4, A5, B5, C5, bsL, bsR, m2, J5, L5, M5, N5, Gv, K5, O5, P5,
           R5, S5, Q5, colL, colR, V5, V6, W6, A7, Z6, O7, W7, M7, P7, D8, O8,
           C8, U8, U7, V7, A8, B8, F8, S8, T8, E7, yq, I7, J7, done };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, E3: [...DEFAULTS.E3], Q4: [...DEFAULTS.Q4],
              H5: [...DEFAULTS.H5] };
  let d = compute(s);

  const SW = 0.034;                       // member width (applet th2)
  const RAY = 0.017;                      // thin ray (th1)
  const ARROW = { w: 0.055, headLen: 0.2, headW: 0.085 };
  const tension = { pending: PAL.black, final: (dd) => (dd.done ? PAL.red : PAL.black) };
  const compression = { pending: PAL.black, final: (dd) => (dd.done ? PAL.blue : PAL.black) };

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });

  // ------------------------------------------------------------------
  // step 1 -- site: photo + 25 lines of action + drag rails
  // ------------------------------------------------------------------
  dw.image('photo', 'assets/view_51_photo.jpg',
           { corners: [IM_BL, IM_BR, [IM_BL[0], IM_BL[1] + V.dist(IM_BL, IM_BR) * IM_H]],
             intro: 1, when: (st) => st.ph });
  for (let k = 0; k < 25; k++) {
    dw.dashLine(`act${k}`, { intro: 1, dash: 0.055, color: 0x9a9a9a, flash: false });
  }
  dw.dashLine('railW', { intro: 1, dash: 0.13, color: 0x666666, flash: false });
  dw.dashLine('railZ', { intro: 1, dash: 0.13, color: 0x666666, flash: false });

  // ------------------------------------------------------------------
  // step 2 -- the deck + the load strips q
  // ------------------------------------------------------------------
  dw.seg('deck', { intro: 2, w: SW, color: tension });
  for (const nm of ['qL', 'qM', 'qR']) {
    dw.poly(nm, 4, { intro: 2, color: 0x006400, opacity: 0.16, flash: false });
  }
  dw.strokes('qEdges', 5, { intro: 2, w: 0.032, color: 0x006400, flash: false });
  dw.label('lq', 'q', { intro: 2, color: 0x2e8b2e });
  dw.disk('pt_W', { intro: 2, r: 0.055 });
  dw.disk('pt_Wq', { intro: 2, r: 0.045 });

  // ------------------------------------------------------------------
  // step 3 -- R1: form arrow at M_7 / the load line from E_3
  // ------------------------------------------------------------------
  dw.arrow('aR1', { intro: 3, ...ARROW });
  dw.label('laR1', 'R₁', { cls: 'num', intro: 3, color: PAL.green });
  dw.disk('pt_M7', { intro: 3, r: 0.05 });
  dw.arrow('fR1', { intro: 3, ...ARROW });
  dw.label('lfR1', 'R₁', { cls: 'num', intro: 3, color: PAL.green });
  dw.disk('pt_E3', { intro: 3, r: 0.055 });
  for (let k = 0; k <= 18; k++) {
    dw.disk(`ll${k}`, { intro: 3, r: 0.032, face: 0x666666, edge: 0x666666,
            when: (st) => st.n4 });
  }

  // ------------------------------------------------------------------
  // step 4 -- sag Z_3 + trial chords -> the pole
  // ------------------------------------------------------------------
  dw.disk('pt_Z3', { intro: 4, r: 0.055 });
  dw.disk('pt_D', { intro: 4, r: 0.045 });
  dw.disk('pt_E', { intro: 4, r: 0.045 });
  dw.dashLine('tchordL', { intro: 4, outro: TR_END, dash: 0.09, color: PAL.grey });
  dw.dashLine('tchordR', { intro: 4, outro: TR_END, dash: 0.09, color: PAL.grey });
  dw.disk('pt_A4', { intro: 4, outro: TR_END, r: 0.04, face: 0xbbbbbb, edge: 0x888888 });
  dw.dashLine('tparT', { intro: 4, outro: TR_END, dash: 0.09, color: PAL.grey });
  dw.dashLine('tparB', { intro: 4, outro: TR_END, dash: 0.09, color: PAL.grey });
  dw.disk('pt_B4', { intro: 4, r: 0.04, face: 0x666666, edge: 0x666666,
          when: (st) => st.n4 });

  // ------------------------------------------------------------------
  // step 5 -- the rays + the cable (paired: side k // ray k)
  // ------------------------------------------------------------------
  for (let k = 0; k <= 18; k++) {
    if (k === 9) continue;                        // the dashed mid ray
    dw.seg(`ray${k}`, { intro: 5, w: k === 0 || k === 18 ? SW : RAY, color: PAL.black });
  }
  dw.dashLine('rayMid', { intro: 5, dash: 0.08, color: PAL.black });
  for (let i = 0; i < 16; i++) {
    dw.seg(`cab${i}`, { intro: 5, w: SW, color: tension });
  }
  dw.arrow('fA', { intro: 5, ...ARROW });
  dw.arrow('fB', { intro: 5, ...ARROW });
  dw.label('lfA', 'A', { cls: 'num', intro: 5, color: PAL.green });
  dw.label('lfB', 'B', { cls: 'num', intro: 5, color: PAL.green });
  dw.arrow('aA', { intro: 5, ...ARROW });
  dw.arrow('aB', { intro: 5, ...ARROW });
  dw.label('laA', 'A', { cls: 'num', intro: 5, color: PAL.green });
  dw.label('laB', 'B', { cls: 'num', intro: 5, color: PAL.green });

  // ------------------------------------------------------------------
  // step 6 -- the hangers (each carries one load-line piece)
  // ------------------------------------------------------------------
  for (let i = 0; i < 15; i++) {
    dw.seg(`hang${i}`, { intro: 6, w: 0.026, color: tension });
  }
  dw.seg('pylL', { intro: 6, outro: RESOLVE, w: SW, color: PAL.black });
  dw.seg('pylR', { intro: 6, outro: RESOLVE, w: SW, color: PAL.black });
  dw.highlight('fR1', [6]);

  // ------------------------------------------------------------------
  // step 7 -- the back-span load R2
  // ------------------------------------------------------------------
  dw.arrow('aR2L', { intro: 7, ...ARROW });
  dw.label('laR2L', 'R₂', { cls: 'num', intro: 7, color: PAL.green });
  dw.disk('pt_Q4', { intro: 7, r: 0.055 });
  dw.arrow('fR2', { intro: 7, ...ARROW });
  dw.label('lfR2', 'R₂', { cls: 'num', intro: 7, color: PAL.green });
  for (let k = 0; k <= 5; k++) {
    dw.disk(`l2_${k}`, { intro: 7, r: 0.032, face: 0x666666, edge: 0x666666,
            when: (st) => st.n4 });
  }

  // ------------------------------------------------------------------
  // step 8 -- the back-stay pole: chord W-D + midpoint apparatus
  // ------------------------------------------------------------------
  dw.dashLine('tchordW', { intro: 8, outro: TR2_END, dash: 0.09, color: PAL.grey });
  dw.seg('app_h1', { intro: 8, outro: TR2_END, w: 0.016, color: 0xa0a0a0 });
  dw.seg('app_h2', { intro: 8, outro: TR2_END, w: 0.016, color: 0xa0a0a0 });
  dw.seg('app_h3', { intro: 8, outro: TR2_END, w: 0.016, color: 0xa0a0a0 });
  dw.seg('app_v1', { intro: 8, outro: TR2_END, w: 0.02, color: 0xa0a0a0 });
  dw.seg('app_v2', { intro: 8, outro: TR2_END, w: 0.02, color: 0xa0a0a0 });
  dw.label('l12a', '½', { cls: 'num', intro: 8, outro: TR2_END, color: 0x8a8a8a });
  dw.label('l12b', '½', { cls: 'num', intro: 8, outro: TR2_END, color: 0x8a8a8a });
  dw.disk('pt_F8', { intro: 8, r: 0.04, face: 0xbbbbbb, edge: 0x777777,
          when: (st) => st.n4 || st._k === 8 });
  dw.dashLine('tparW', { intro: 8, outro: TR2_END, dash: 0.08, color: PAL.black });
  dw.seg('app_h4', { intro: 8, outro: TR2_END, w: 0.026, color: PAL.black });
  dw.disk('pt_W4', { intro: 8, r: 0.032, face: 0x666666, edge: 0x666666,
          when: (st) => st.n4 });
  dw.disk('pt_Z4', { intro: 8, r: 0.04, face: 0x666666, edge: 0x666666,
          when: (st) => st.n4 });

  // ------------------------------------------------------------------
  // step 9 -- the left back stay + its force triangle
  // ------------------------------------------------------------------
  dw.dashLine('bsMidray', { intro: 9, dash: 0.08, color: PAL.black });
  for (let k = 0; k < 5; k++) {
    dw.seg(`bray${k}`, { intro: 9, w: k === 0 ? SW : RAY, color: PAL.black });
  }
  for (let i = 0; i < 4; i++) {
    dw.seg(`bsL${i}`, { intro: 9, w: SW, color: tension });
  }
  for (let i = 0; i < 3; i++) {
    dw.seg(`hbL${i}`, { intro: 9, w: 0.026, color: tension });
  }
  dw.arrow('fC', { intro: 9, ...ARROW });
  dw.arrow('fD', { intro: 9, ...ARROW });
  dw.label('lfC', 'C', { cls: 'num', intro: 9, color: PAL.green });
  dw.label('lfD', 'D', { cls: 'num', intro: 9, color: PAL.green });
  dw.arrow('aC', { intro: 9, ...ARROW });
  dw.arrow('aD', { intro: 9, ...ARROW });
  dw.label('laC', 'C', { cls: 'num', intro: 9, color: PAL.green });
  dw.label('laD', 'D', { cls: 'num', intro: 9, color: PAL.green });

  // ------------------------------------------------------------------
  // step 10 -- the right back stay + the mirrored triangle
  // ------------------------------------------------------------------
  for (let i = 0; i < 4; i++) {
    dw.seg(`bsR${i}`, { intro: 10, w: SW, color: tension });
  }
  for (let i = 0; i < 3; i++) {
    dw.seg(`hbR${i}`, { intro: 10, w: 0.026, color: tension });
  }
  for (let k = 0; k < 4; k++) {
    dw.seg(`mray${k}`, { intro: 10, w: RAY, color: PAL.black });
  }
  dw.dashLine('mrayMid', { intro: 10, dash: 0.08, color: PAL.black });
  dw.arrow('fR2m', { intro: 10, ...ARROW });
  dw.arrow('fEm', { intro: 10, ...ARROW });
  dw.arrow('fFm', { intro: 10, ...ARROW });
  dw.label('lfR2m', 'R₂', { cls: 'num', intro: 10, color: PAL.green });
  dw.label('lfEm', 'E', { cls: 'num', intro: 10, color: PAL.green });
  dw.label('lfFm', 'F', { cls: 'num', intro: 10, color: PAL.green });
  dw.arrow('aR2R', { intro: 10, ...ARROW });
  dw.label('laR2R', 'R₂', { cls: 'num', intro: 10, color: PAL.green });
  dw.arrow('aE', { intro: 10, ...ARROW });
  dw.arrow('aF', { intro: 10, ...ARROW });
  dw.label('laE', 'E', { cls: 'num', intro: 10, color: PAL.green });
  dw.label('laF', 'F', { cls: 'num', intro: 10, color: PAL.green });

  // ------------------------------------------------------------------
  // step 11 -- the forces on the column head
  // ------------------------------------------------------------------
  dw.arrow('aAp', { intro: 11, ...ARROW });
  dw.arrow('aCp', { intro: 11, ...ARROW });
  dw.label('laAp', 'A′', { cls: 'num', intro: 11, color: PAL.green });
  dw.label('laCp', 'C′', { cls: 'num', intro: 11, color: PAL.green });
  dw.arrow('aQ', { intro: 11, outro: 13, ...ARROW });
  dw.arrow('aWcc', { intro: 11, outro: 13, ...ARROW });
  dw.label('laQ', 'Q', { cls: 'num', intro: 11, outro: 13, color: PAL.green });
  dw.label('laWcc', 'wCC', { cls: 'num', intro: 11, outro: 13, color: PAL.green });
  dw.disk('pt_O8', { intro: 11, outro: 13, r: 0.05 });
  dw.poly('qPyl', 4, { intro: 11, outro: 12, color: 0x006400, opacity: 0.2, flash: false });
  dw.disk('pt_H5', { intro: 11, r: 0.055 });
  dw.arrow('f3A', { intro: 11, ...ARROW });
  dw.arrow('f3Q', { intro: 11, ...ARROW });
  dw.arrow('f3W', { intro: 11, ...ARROW });
  dw.arrow('f3C', { intro: 11, ...ARROW });
  dw.label('lf3A', 'A′', { cls: 'num', intro: 11, color: PAL.green });
  dw.label('lf3Q', 'Q', { cls: 'num', intro: 11, color: PAL.green });
  dw.label('lf3W', 'weightConcreteColumn', { cls: 'num', intro: 11, color: PAL.green });
  dw.label('lf3C', 'C′', { cls: 'num', intro: 11, color: PAL.green });

  // ------------------------------------------------------------------
  // step 12 -- the closing column force G
  // ------------------------------------------------------------------
  dw.arrow('f3G', { intro: 12, ...ARROW });
  dw.label('lf3G', 'G', { cls: 'num', intro: 12, color: PAL.green });
  dw.dashLine('colAx', { intro: 12, dash: 0.08, color: PAL.black });
  dw.arrow('aG', { intro: 12, ...ARROW });
  dw.arrow('aH', { intro: 12, ...ARROW });
  dw.label('laG', 'G', { cls: 'num', intro: 12, color: PAL.green });
  dw.label('laH', 'H', { cls: 'num', intro: 12, color: PAL.green });

  // ------------------------------------------------------------------
  // step 13 -- the tapered concrete columns
  // ------------------------------------------------------------------
  dw.poly('colL', 5, { intro: 13, color: 0x111111, opacity: 0.1, flash: false });
  dw.poly('colR', 5, { intro: 13, color: 0x111111, opacity: 0.1, flash: false });
  dw.strokes('colLe', 5, { intro: 13, w: SW, color: compression });
  dw.strokes('colRe', 5, { intro: 13, w: SW, color: compression });
  dw.highlight('f3G', [13]);

  // node-equilibrium inspector
  dw.nodeInspector(5, { when: (st) => st.node > 0, w: 1.5 * SW,
                        headLen: 0.16, headW: 0.07, r: 0.07 });

  // dual pairs (cable side // its ray; back-stay side // ray; head forces)
  dw.link('deck', 'qL', 'qM', 'qR', 'lq');
  dw.link('aR1', 'fR1', 'laR1', 'lfR1');
  dw.link('tchordL', 'tparT');
  dw.link('tchordR', 'tparB');
  // cab elements draw Z3-outward: cab_e (e<8) = piece 7-e, cab_e (e>=8) = piece e;
  // piece j is parallel to ray LL[j+1] (j<8) / LL[j+2] (j>=8)
  for (let e = 0; e < 16; e++) {
    const piece = e < 8 ? 7 - e : e;
    dw.link(`cab${e}`, `ray${piece < 8 ? piece + 1 : piece + 2}`);
  }
  dw.link('aA', 'fA', 'ray0', 'laA', 'lfA');
  dw.link('aB', 'fB', 'ray18', 'laB', 'lfB');
  dw.link('aR2L', 'fR2', 'laR2L', 'lfR2');
  dw.link('aR2R', 'fR2m', 'laR2R', 'lfR2m');
  dw.link('tchordW', 'tparW');
  dw.link('bsL0', 'bray4');
  dw.link('bsL1', 'bray3');
  dw.link('bsL2', 'bray2');
  dw.link('bsL3', 'bray1');
  dw.link('bsR0', 'mray0');
  dw.link('bsR1', 'mray1');
  dw.link('bsR2', 'mray2');
  dw.link('bsR3', 'mray3');
  dw.link('aC', 'fC', 'laC', 'lfC');
  dw.link('aD', 'fD', 'laD', 'lfD');
  dw.link('aE', 'fEm', 'laE', 'lfEm');
  dw.link('aF', 'fFm', 'laF', 'lfFm');
  dw.link('aAp', 'f3A', 'laAp', 'lf3A');
  dw.link('aCp', 'f3C', 'laCp', 'lf3C');
  dw.link('aQ', 'f3Q', 'laQ', 'lf3Q');
  dw.link('aWcc', 'f3W', 'laWcc', 'lf3W');
  dw.link('colAx', 'aG', 'f3G', 'laG', 'lf3G', 'colLe');
  dw.link('aH', 'colRe', 'laH');

  // the complete force diagrams appear as the ghost preview
  dw.ghostable('fR1', 'fA', 'fB', 'fR2', 'fC', 'fD', 'fR2m', 'fEm', 'fFm',
               'f3A', 'f3Q', 'f3W', 'f3C', 'f3G',
               ...Array.from({ length: 19 }, (_, k) => k)
                 .filter((k) => k !== 9).map((k) => `ray${k}`),
               'bray0', 'bray1', 'bray2', 'bray3', 'bray4',
               'mray0', 'mray1', 'mray2', 'mray3');

  dw.instant('photo', 'railW', 'railZ',
             ...Array.from({ length: 25 }, (_, k) => `act${k}`));

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [3, 11.4]);
    dw.setLabel('force_title', [16, 11.4]);

    dw.setImage('photo', [IM_BL, IM_BR,
                          [IM_BL[0], IM_BL[1] + V.dist(IM_BL, IM_BR) * IM_H]]);
    for (let k = 0; k < 25; k++) {
      dw.setDashLine(`act${k}`, [[XS[k], YTOP], [XS[k], YBOT]]);
    }
    dw.setDashLine('railW', [[XS[0], RAIL_W[0]], [XS[0], RAIL_W[1]]]);
    dw.setDashLine('railZ', [[MID, RAIL_Z[0]], [MID, RAIL_Z[1]]]);

    // deck + strips
    dw.setSeg('deck', d.Wp, d.Wq);
    dw.setDisk('pt_W', d.Wp);
    dw.setDisk('pt_Wq', d.Wq);
    const yW = d.Wp[1], yq = d.yq;
    dw.setPoly('qL', [[XS[0], yW], [XD, yW], [XD, yq], [XS[0], yq]]);
    dw.setPoly('qM', [[XD, yW], [XE, yW], [XE, yq], [XD, yq]]);
    dw.setPoly('qR', [[XE, yW], [XS[24], yW], [XS[24], yq], [XE, yq]]);
    dw.setStrokes('qEdges', [
      [[XS[0], yq], [XS[24], yq]],
      [[XS[0], yW], [XS[0], yq]], [[XD, yW], [XD, yq]],
      [[XE, yW], [XE, yq]], [[XS[24], yW], [XS[24], yq]],
    ]);
    dw.setLabel('lq', [XS[0] - 0.35, (yW + yq) / 2]);

    // R1
    dw.setArrow('aR1', d.M7, [d.M7[0], d.M7[1] - s.sLS]);
    dw.setLabel('laR1', [d.M7[0] + 0.2, d.M7[1] - 0.45 * s.sLS]);
    dw.setDisk('pt_M7', d.M7);
    dw.setArrow('fR1', d.LL[0], d.W3);
    dw.setLabel('lfR1', [d.LL[0][0] - 0.25, (d.LL[0][1] + d.W3[1]) / 2]);
    dw.setDisk('pt_E3', d.LL[0]);
    for (let k = 0; k <= 18; k++) dw.setDisk(`ll${k}`, d.LL[k]);

    // trial chords + pole
    dw.setDisk('pt_Z3', d.Z3);
    dw.setDisk('pt_D', D0);
    dw.setDisk('pt_E', E0);
    dw.setDashLine('tchordL', [D0, d.A4]);
    dw.setDashLine('tchordR', [d.A4, E0]);
    dw.setDisk('pt_A4', d.A4);
    const ext = (a, b) => V.add(b, V.mul(V.sub(b, a), 0.06));
    dw.setDashLine('tparT', [d.LL[0], ext(d.LL[0], d.B4)]);
    dw.setDashLine('tparB', [d.W3, ext(d.W3, d.B4)]);
    dw.setDisk('pt_B4', d.B4);

    // rays + cable
    for (let k = 0; k <= 18; k++) {
      if (k === 9) continue;
      dw.setSeg(`ray${k}`, d.LL[k], d.B4);
    }
    dw.setDashLine('rayMid', [d.B4, d.N3]);
    // draw order: Z3 outward left (indices 8..1 of cabPts reversed), then right
    for (let i = 0; i < 8; i++) dw.setSeg(`cab${i}`, d.cabPts[8 - i], d.cabPts[7 - i]);
    for (let i = 0; i < 8; i++) dw.setSeg(`cab${8 + i}`, d.cabPts[8 + i], d.cabPts[9 + i]);
    dw.setArrow('fA', d.B4, d.LL[0]);
    dw.setArrow('fB', d.W3, d.B4);
    dw.setLabel('lfA', V.add(V.mid(d.B4, d.LL[0]), [0.1, 0.16]));
    dw.setLabel('lfB', V.add(V.mid(d.W3, d.B4), [0.1, -0.18]));
    dw.setArrow('aA', D0, d.V6);
    dw.setArrow('aB', E0, d.O7);
    dw.setLabel('laA', V.add(d.V6, [-0.12, 0.1]));
    dw.setLabel('laB', V.add(d.O7, [0.14, 0.08]));

    // hangers (left-to-right verticals xs[5..19] up to the cable)
    for (let i = 0; i < 15; i++) {
      const p = d.cabPts[i + 1];
      dw.setSeg(`hang${i}`, [p[0], yW], p);
    }
    dw.setSeg('pylL', [XD, yW], D0);
    dw.setSeg('pylR', [XE, yW], E0);

    // R2
    dw.setArrow('aR2L', d.P7, [d.P7[0], d.P7[1] - s.sLS]);
    dw.setLabel('laR2L', [d.P7[0] + 0.2, d.P7[1] - 0.45 * s.sLS]);
    dw.setDisk('pt_Q4', d.Q4);
    dw.setArrow('fR2', d.Q4, d.V4);
    dw.setLabel('lfR2', [d.Q4[0] + 0.2, (d.Q4[1] + d.V4[1]) / 2]);
    for (let k = 0; k <= 5; k++) dw.setDisk(`l2_${k}`, d.L2[k]);

    // back-stay pole apparatus
    dw.setDashLine('tchordW', [d.Wp, D0]);
    dw.setSeg('app_h1', d.Q4, d.F8);
    dw.setSeg('app_h2', d.W4, d.S8);
    dw.setSeg('app_h3', d.V4, d.T8);
    dw.setSeg('app_v1', d.F8, d.S8);
    dw.setSeg('app_v2', d.S8, d.T8);
    dw.setLabel('l12a', [d.F8[0] + 0.16, (d.F8[1] + d.S8[1]) / 2]);
    dw.setLabel('l12b', [d.F8[0] + 0.16, (d.S8[1] + d.T8[1]) / 2]);
    dw.setDisk('pt_F8', d.F8);
    dw.setDashLine('tparW', [d.A8, d.W4]);
    dw.setSeg('app_h4', d.B8, d.V4);
    dw.setDisk('pt_W4', d.W4);
    dw.setDisk('pt_Z4', d.Z4);

    // left back stay + triangle
    dw.setDashLine('bsMidray', [d.Z4, d.W4]);
    const brayPts = [d.Q4, d.R4, d.S4, d.T4, d.U4];
    for (let k = 0; k < 5; k++) dw.setSeg(`bray${k}`, d.Z4, brayPts[k]);
    for (let i = 0; i < 4; i++) dw.setSeg(`bsL${i}`, d.bsL[i], d.bsL[i + 1]);
    for (let i = 0; i < 3; i++) {
      const p = d.bsL[i + 1];
      dw.setSeg(`hbL${i}`, [p[0], yW], p);
    }
    dw.setArrow('fC', d.Z4, d.Q4);
    dw.setArrow('fD', d.V4, d.Z4);
    dw.setLabel('lfC', V.add(V.mid(d.Z4, d.Q4), [-0.18, 0.1]));
    dw.setLabel('lfD', V.add(V.mid(d.V4, d.Z4), [-0.05, -0.16]));
    dw.setArrow('aC', D0, d.A7);
    dw.setArrow('aD', d.Wp, d.C8);
    dw.setLabel('laC', V.add(d.A7, [0.1, 0.12]));
    dw.setLabel('laD', V.add(d.C8, [-0.15, 0.14]));

    // right back stay + mirrored triangle
    for (let i = 0; i < 4; i++) dw.setSeg(`bsR${i}`, d.bsR[i], d.bsR[i + 1]);
    for (let i = 0; i < 3; i++) {
      const p = d.bsR[i + 1];
      dw.setSeg(`hbR${i}`, [p[0], yW], p);
    }
    const m = d.m2;
    dw.setSeg('mray0', m.R, m.Z);
    dw.setSeg('mray1', m.S, m.Z);
    dw.setSeg('mray2', m.T, m.Z);
    dw.setSeg('mray3', m.U, m.Z);
    dw.setDashLine('mrayMid', [m.Z, m.W]);
    dw.setArrow('fR2m', m.Q, m.V);
    dw.setArrow('fEm', m.Z, m.Q);
    dw.setArrow('fFm', m.V, m.Z);
    dw.setLabel('lfR2m', [m.Q[0] - 0.25, (m.Q[1] + m.V[1]) / 2]);
    dw.setLabel('lfEm', V.add(V.mid(m.Z, m.Q), [0.2, 0.1]));
    dw.setLabel('lfFm', V.add(V.mid(m.V, m.Z), [0.05, -0.16]));
    dw.setArrow('aR2R', d.D8, [d.D8[0], d.D8[1] - s.sLS]);
    dw.setLabel('laR2R', [d.D8[0] + 0.2, d.D8[1] - 0.45 * s.sLS]);
    dw.setArrow('aE', E0, d.W7);
    dw.setArrow('aF', d.Wq, d.U8);
    dw.setLabel('laE', V.add(d.W7, [-0.12, 0.12]));
    dw.setLabel('laF', V.add(d.U8, [0.15, 0.14]));

    // the forces on the column head
    dw.setArrow('aAp', D0, d.W6);
    dw.setArrow('aCp', D0, d.Z6);
    dw.setLabel('laAp', V.add(d.W6, [0.14, 0.05]));
    dw.setLabel('laCp', V.add(d.Z6, [-0.16, 0.02]));
    dw.setArrow('aQ', d.O8, [d.O8[0], d.O8[1] - s.sLS]);
    dw.setArrow('aWcc', [d.O8[0], d.O8[1] - s.sLS], [d.O8[0], d.O8[1] - 2 * s.sLS]);
    dw.setLabel('laQ', [d.O8[0] + 0.18, d.O8[1] - 0.45 * s.sLS]);
    dw.setLabel('laWcc', [d.O8[0] + 0.3, d.O8[1] - 1.45 * s.sLS]);
    dw.setDisk('pt_O8', d.O8);
    dw.setPoly('qPyl', [[d.I7[0], yW], [d.J7[0], yW], [d.J7[0], yq], [d.I7[0], yq]]);
    dw.setDisk('pt_H5', s.H5);
    dw.setArrow('f3A', s.H5, d.J5);
    dw.setArrow('f3Q', d.J5, d.L5);
    dw.setArrow('f3W', d.L5, d.M5);
    dw.setArrow('f3C', d.M5, d.N5);
    dw.setLabel('lf3A', V.add(V.mid(s.H5, d.J5), [0.15, 0.18]));
    dw.setLabel('lf3Q', V.add(d.J5, [0.18, -0.12]));
    dw.setLabel('lf3W', V.add(V.mid(d.L5, d.M5), [0.12, 0]));
    dw.setLabel('lf3C', V.add(V.mid(d.M5, d.N5), [0.22, -0.12]));

    // G + the column axes
    dw.setArrow('f3G', d.N5, s.H5);
    dw.setLabel('lf3G', V.add(V.mid(d.N5, s.H5), [-0.2, 0]));
    dw.setDashLine('colAx', [D0, d.K5]);
    dw.setArrow('aG', d.U7, d.K5);
    dw.setArrow('aH', d.V7, d.V5);
    dw.setLabel('laG', V.add(d.U7, [0.12, -0.12]));
    dw.setLabel('laH', V.add(d.V7, [-0.14, -0.12]));

    // the columns
    dw.setPoly('colL', d.colL);
    dw.setPoly('colR', d.colR);
    const ring = (pts) => pts.map((p, i) => [p, pts[(i + 1) % pts.length]]);
    dw.setStrokes('colLe', ring(d.colL));
    dw.setStrokes('colRe', ring(d.colR));
  }

  // ------------------------------------------------------------------
  // node-equilibrium inspector: 1-15 cable nodes (left to right),
  // 16-18 left back stay, 19-21 right back stay, 22/23 anchors W/W',
  // 24 the column head D (the applet's own force diagram 3).
  // ------------------------------------------------------------------
  function nodeInfo() {
    const n = Math.round(s.node);
    const { LL, B4, Z4, m2, cabPts } = d;
    const bs2 = { A: [d.T4, d.U4], B: [d.S4, d.T4], C: [d.R4, d.S4] };
    if (n >= 1 && n <= 15) {
      const i = n;
      const [ka, kb] = i < 8 ? [i, i + 1] : i === 8 ? [8, 10] : [i + 1, i + 2];
      return { pos: cabPts[i], title: `cable node ${i}`,
               sides: [[LL[ka], LL[kb]], [LL[kb], B4], [B4, LL[ka]]] };
    }
    if (n >= 16 && n <= 18) {
      const [a, b] = [bs2.A, bs2.B, bs2.C][n - 16];
      return { pos: d.bsL[n - 15], title: 'back-stay node',
               sides: [[a, b], [b, Z4], [Z4, a]] };
    }
    if (n >= 19 && n <= 21) {
      const M = (p) => [2 * s.f8x - p[0], p[1]];
      const [a, b] = [bs2.A, bs2.B, bs2.C][n - 19];
      return { pos: d.bsR[4 - (n - 19) - 1], title: 'back-stay node',
               sides: [[M(a), M(b)], [M(b), m2.Z], [m2.Z, M(a)]] };
    }
    if (n === 22) {
      return { pos: d.Wp, title: 'anchor W',
               sides: [[d.U4, d.V4], [d.V4, d.Z4], [d.Z4, d.U4]] };
    }
    if (n === 23) {
      return { pos: d.Wq, title: 'anchor W′',
               sides: [[m2.U, m2.V], [m2.V, m2.Z], [m2.Z, m2.U]] };
    }
    return { pos: D0, title: 'column head D',
             sides: [[s.H5, d.J5], [d.J5, d.L5], [d.L5, d.M5],
                     [d.M5, d.N5], [d.N5, s.H5]] };
  }

  function updateNode() {
    const n = Math.round(s.node);
    const info = nodeInfo();
    dw.selectDisk(n === 8 ? 'pt_Z3' : n === 22 ? 'pt_W' : n === 23 ? 'pt_Wq'
      : n === 24 ? 'pt_D' : null);
    dw.setNodeInspector(info.pos, 0.55, n > 0 ? info.title : '', info.sides);
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
  panel.slider(par, s, 'sFD', 'scale force diagram', 0.5, 2, 0.05, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 0.2, 2, 0.05, refresh);
  panel.toggle(par, s, 'ph', 'show image (built factory)', refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node',
               'node (0 = off, 1–15 cable, 16–21 back stays, 22/23 anchors, 24 column head)',
               0, 24, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS, E3: [...DEFAULTS.E3], Q4: [...DEFAULTS.Q4],
                       H5: [...DEFAULTS.H5] });
    panel.syncAll();
    refresh();
  });

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const hits = [
    ['W', () => d.Wp, 2, 99],
    ['E3', () => d.LL[0], 3, 99],
    ['M7', () => d.M7, 3, 99],
    ['Z3', () => d.Z3, 4, 99],
    ['Q4', () => d.Q4, 7, 99],
    ['F8', () => d.F8, 8, 9],
    ['C8', () => d.C8, 9, 99],
    ['O8', () => d.O8, 11, 13],
    ['H5', () => s.H5, 11, 99],
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
      if (name === 'W') s.wy = clamp(wy, RAIL_W[0], RAIL_W[1]);
      else if (name === 'E3') s.E3 = [clamp(wx, 2.6, 8.2), clamp(wy, 5.4, 7.6)];
      else if (name === 'M7') s.m7y = clamp(wy, YBOT, YTOP);
      else if (name === 'Z3') s.z3y = clamp(wy, RAIL_Z[0], RAIL_Z[1]);
      else if (name === 'Q4') s.Q4 = [clamp(wx, 8.6, 11.4), clamp(wy, 4.6, 6.4)];
      else if (name === 'F8') s.f8x = clamp(wx, 10.9, 12.6);
      else if (name === 'C8') s.c8x = clamp(wx, 2.45, 3.2);
      else if (name === 'O8') s.o8y = clamp(wy, YBOT, YTOP);
      else if (name === 'H5') s.H5 = [clamp(wx, 14.2, 17.5), clamp(wy, 9.2, 11.6)];
      refresh();
    },
  );

  // click a node to inspect it
  const nodeAt = [];
  for (let n = 1; n <= 24; n++) {
    nodeAt.push({ at: () => {
      if (n <= 15) return d.cabPts[n];
      if (n <= 18) return d.bsL[n - 15];
      if (n <= 21) return d.bsR[4 - (n - 19) - 1];
      if (n === 22) return d.Wp;
      if (n === 23) return d.Wq;
      return D0;
    } });
  }
  dw.nodeSelect(nodeAt, (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
