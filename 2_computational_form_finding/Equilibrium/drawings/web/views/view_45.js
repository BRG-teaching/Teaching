/**
 * Drawing view/45 "Free-form thrust lines"
 * (https://block.arch.ethz.ch/eq/drawing/view/45) as a step-by-step
 * construction, following the applet's staging (mode 1, steps 0-10):
 *   1. a free-form arch = quartic Bezier on 5 draggable control points
 *      (presets: waterloo / berlin / bergisel);
 *   2. a uniform deck load on 18 strips cut at the curve division points ->
 *      load line; the thrust line must pass through both springings AND the
 *      draggable point M on the arch: split the band at M, hang each part on
 *      its two strings through M (three-force problem twice) -> the
 *      sub-reactions close at the division points R'/S -> the pole o;
 *   3. the funicular (thrust line) through all 18 action lines; resultant R,
 *      reactions A/B, components A_H/A_V/B_H/B_V, the horizontal thrust H;
 *   4. the local bending measure d = H*y/T plotted square to the arch axis
 *      at every strip: the red line shows where the arch bends.
 * Regression vs the LIVE applet: 84 points to <= 3.6e-12 in ten states
 * (default, M/Bezier dragged, B_1/LL0 moved, sFD/T changed, the three
 * presets). The applet's funicular misses the far springing by ~0.01 (its
 * sub-band resultants ignore the strip discretisation) — reproduced
 * faithfully. The applet's force-diagram reaction captions A/B are swapped
 * vs its own form arrows; ours are labeled physically (see the analysis
 * note).
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 45 — Free-form Thrust Lines',
  subtitle: 'a Bézier arch, the thrust line through M, and where the arch bends',
  about: 'A free-form arch drawn as a Bézier curve on five draggable control points carries a uniform deck load on 18 strips. The thrust line is forced through both springings and a chosen point M on the arch: splitting the load at M and hanging each part on its two strings through M solves two three-force problems whose sub-reactions meet at the pole. Where the thrust line strays from the arch axis by y, the arch must bend: the measure d = H·y/T is plotted square to the axis, and the red line connecting the ordinates is the arch\'s bending diagram. Try the waterloo, berlin and bergisel presets.',
  frame: [[-4.02, -2.43], [32.59, 15.87]],
};

const RESOLVE = 15;
const LINE1_Y = 13.30488098745384;      // load band top (I)
const S1_Y = 10.900345014025659;        // strip guides top (A_1)
const RAIL_Y = 10.887815005937087;      // control-point rails top (C)
const RED = 0xff0000;                   // the applet's bending-line red

const DEFAULTS = {
  b1y: 0, b2y: 5.29, b3x: 8.43, b3y: 5.61, b4y: 4.37, b5y: 0.9,
  e2x: 1, g4x: 14,                      // rails of Bezier2 / Bezier4
  tM: 0.27822696375752154,              // M's parameter on the curve (live)
  llx: 26.980066405048007, lly: 10.888078882563747,   // LL0 (draggable)
  sFD: 0.5,                             // scaleForceDiagram [0.1, 1]
  sLS: 1.4,                             // loadSymbol [1, 2] (hidden slider)
  T: 12,                                // T slider [10, 30]
  b1lv: 0.38867788061804376,            // B₁: the level where H is measured
  o1: true, sIF: 0.03,                  // internal-force pipes (house)
  n4: true, sh: false, o4: false, node: 0,
  _k: 99,
};
// preset shapes (the applet's waterloo / berlin / zha button scripts);
// M is a target point projected onto the new curve, like the applet
const PRESETS = {
  waterloo: { e2x: 1, g4x: 14, b1y: 0, b2y: 5.29, b3x: 8.43, b3y: 5.61,
              b4y: 4.37, b5y: 0.9, M: [3.4, 3.94], T: 12, sFD: 0.5 },
  berlin: { e2x: 1, g4x: 17, b1y: 0, b2y: 5.5, b3x: 9, b3y: 4,
            b4y: 5.5, b5y: 0, M: [3.2, 3.32], T: 10, sFD: 0.5 },
  bergisel: { e2x: 2, g4x: 15, b1y: 10, b2y: 10.6, b3x: 4.5, b3y: 8,
              b4y: 0.75, b5y: 0, M: [4, 8.5], T: 30, sFD: 0.15 },
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The free-form arch', d: 'left: a quartic Bézier on five control points between the springings — drag them (the ends and inner points ride their dashed rails, the middle one is free), or load the waterloo / berlin / bergisel presets from the panel' },
  { t: 'The load, cut into 18 strips', d: 'left: a uniform deck load q over the span, discretized at the 18 division points of the curve — right: the strip weights laid off down the load line, each piece as long as its strip is wide' },
  { t: 'The thrust line must pass through M', d: 'both springings AND the point M on the arch (drag it!) are prescribed — left: the vertical through M splits the band into two parts with resultants R₁ and R₂ on the verticals through the half-centroids — right: R₁ and R₂ on the load line, split at the level of M' },
  { t: 'The left part on two strings', d: 'left: R₁ hangs on the string springing–P and on the string P–springing THROUGH M — right: the parallels through the ends of R₁ close its triangle at R′: sub-reactions A₁ and B₁, felt at the springings' },
  { t: 'The right part likewise', d: 'left: R₂ hangs on the string through M (springing–Q) and on Q–springing — right: parallels through the ends of R₂ meet at S: sub-reactions A₂ and B₂' },
  { t: 'The pole o', d: 'right: through R′ parallel to springing–M and through S parallel to M–springing meet at the pole o — combining both parts, the string at M must run through it — rays from o to every strip of the load line' },
  { t: 'The resultant R', d: 'left: the outer thrust directions extended meet on R\'s line of action — right: R spans the whole load line; dashed green in BOTH diagrams' },
  { t: 'The reactions A and B', d: 'right: A = o→top and B = bottom→o close the force polygon — left: the same two thrusts push into the springings' },
  { t: 'The thrust line', d: 'left: the funicular from the left springing across all 18 action lines, each side parallel to its ray — it passes exactly through M and lands on the far springing (dash-dot; the pipes show the compression)' },
  { t: 'Horizontal and vertical parts', d: 'right: the reactions split over the vertical through o: A_H, A_V and B_V, B_H frame the load line — left: the same components push at the springings' },
  { t: 'The horizontal thrust H', d: 'right: every ray shares the same horizontal part H = distance from the load line to the vertical through o — pick the measuring level with B₁ (drag) — left: H at the thrust line, and the offset y between thrust line and arch axis at strip 10' },
  { t: 'Where it strays, it bends: d = H·y/T', d: 'left: the bending measure d = H·y/T (choose T in the panel) is plotted from the arch axis SQUARE to the axis (right angle to the tangent), on the side away from the thrust line' },
  { t: '…at the next strip', d: 'left: the same at strip 11: offset y₂ between thrust line and axis → measure d₂ = H·y₂/T square to the axis' },
  { t: 'All 18 ordinates', d: 'left: the ordinates d = H·y/T at every division point — zero where the thrust line crosses the arch axis (the springings and M)' },
  { t: 'The bending line', d: 'the red line connects the ordinates: the arch\'s bending diagram; the arch resolves blue. Reshape it, drag M, or load a preset — a shape whose thrust line hugs the axis barely bends ("show construction" brings the apparatus back)',
    take: 'where the thrust line strays from the axis, the arch must bend: d = H·y/T — good form-finding keeps y small' },
];

// ---------------------------------------------------------------------------

function bez(P, t) {
  const c = [(1 - t) ** 4, 4 * (1 - t) ** 3 * t, 6 * (1 - t) ** 2 * t * t,
             4 * (1 - t) * t ** 3, t ** 4];
  return [c.reduce((a, ci, i) => a + ci * P[i][0], 0),
          c.reduce((a, ci, i) => a + ci * P[i][1], 0)];
}
function bezd(P, t) {
  const q = [0, 1, 2, 3].map((i) => V.mul(V.sub(P[i + 1], P[i]), 4));
  const c = [(1 - t) ** 3, 3 * (1 - t) ** 2 * t, 3 * (1 - t) * t * t, t ** 3];
  return [c.reduce((a, ci, i) => a + ci * q[i][0], 0),
          c.reduce((a, ci, i) => a + ci * q[i][1], 0)];
}
function ctrl(s) {
  return [[0, s.b1y], [s.e2x, s.b2y], [s.b3x, s.b3y], [s.g4x, s.b4y], [18, s.b5y]];
}
// nearest curve parameter to a target point (dense sample + local refine)
function projectT(P, target) {
  let bt = 0, bd = Infinity, n = 400;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const dd = V.dist(bez(P, t), target);
    if (dd < bd) { bd = dd; bt = t; }
  }
  let h = 1 / n;
  for (let it = 0; it < 40; it++) {
    h /= 2;
    for (const t of [bt - h, bt + h]) {
      if (t < 0 || t > 1) continue;
      const dd = V.dist(bez(P, t), target);
      if (dd < bd) { bd = dd; bt = t; }
    }
  }
  return bt;
}

function compute(s) {
  const P = ctrl(s);
  const B1 = P[0], B5 = P[4];
  const M = bez(P, s.tM);
  const ts = [...Array(18)].map((_, k) => (k + 0.5) / 18);
  const MF = ts.map((t) => bez(P, t));                    // MFit0..17 (axis)
  const xs = MF.map((p) => p[0]);                         // action lines
  const bounds = [0, ...[...Array(17)].map((_, i) => (xs[i] + xs[i + 1]) / 2), 18];
  const LL = [[s.llx, s.lly]];                            // LL0..LL18
  for (let i = 0; i < 18; i++) {
    LL.push([s.llx, LL[i][1] - (bounds[i + 1] - bounds[i]) * s.sFD]);
  }
  const LLM = [s.llx, s.lly - M[0] * s.sFD];              // split at M's level
  const LLE = [s.llx, LLM[1] - (18 - M[0]) * s.sFD];
  const xL = M[0] / 2, xR = (M[0] + 18) / 2;              // R1 / R2 verticals
  const pDir = V.sub(M, B1), qDir = V.sub(M, B5);         // the two chords
  const Pp = V.intersect([xL, 0], [0, 1], B5, qDir);      // P on R1's line
  const Qp = V.intersect([xR, 0], [0, 1], B1, pDir);      // Q on R2's line
  const R2 = V.intersect(LL[0], V.sub(Pp, B1), LLM, qDir);       // R' division
  const S = V.intersect(LLM, pDir, LLE, V.sub(B5, Qp));          // S division
  const pole = V.intersect(R2, pDir, S, qDir);
  // funicular: FP0 = B1, side k parallel to ray k, kinks on the action lines
  const FP = [B1];
  for (let k = 0; k < 18; k++) {
    FP.push(V.intersect(FP[k], V.sub(pole, LL[k]), [xs[k], 0], [0, 1]));
  }
  const T1 = V.intersect(FP[18], V.sub(pole, LL[18]), [18, 0], [0, 1]);
  const H = Math.abs(s.llx - pole[0]);                    // horizontal thrust
  const F2 = V.intersect(B1, V.sub(pole, LL[0]), T1, V.sub(pole, LL[18]));
  // bending ordinates: rotate the vertical offset MFit->FP by the applet's
  // normal angle (curve normal, pointing down, vs vertical up), length
  // (H/sFD)*y/T -> TP on the arch normal, opposite side of the thrust line
  const TP = [], TDIR = [];
  for (let k = 0; k < 18; k++) {
    const u = bezd(P, ts[k]);
    let n = [-u[1], u[0]];
    if (n[1] > 0) n = [-n[0], -n[1]];                     // downward normal
    const ang = V.ggbAngle(n, [0, 1]);
    const v = V.sub(FP[k + 1], MF[k]);
    const ca = Math.cos(-ang), sa = Math.sin(-ang);
    const fr = [v[0] * ca - v[1] * sa, v[0] * sa + v[1] * ca];
    const r = ((H / s.sFD) * V.dist(FP[k + 1], MF[k])) / s.T;
    TP.push(V.add(MF[k], V.mul(fr, r / (V.len(fr) || 1))));
    TDIR.push([-Math.cos(ang), Math.sin(ang)]);           // the T direction
  }
  const U = [pole[0], LL[0][1]];                          // component corners
  const Z = [pole[0], LLE[1]];
  const B1pt = [s.llx, s.b1lv];                           // H measuring level
  const C1 = [pole[0], s.b1lv];
  return { P, B1, B5, M, MF, xs, LL, LLM, LLE, xL, xR, Pp, Qp, R2, S, pole,
           FP, T1, H, F2, TP, TDIR, U, Z, B1pt, C1,
           rayN: LL.map((p) => V.dist(pole, p)) };   // world units (kN x sFD)
}

// ---------------------------------------------------------------------------

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);
  let player = null;

  const ARR = { w: 0.09, headLen: 0.3, headW: 0.12 };
  const NSEG = 72;
  const NARR = { w: 0.11, headLen: 0.34, headW: 0.14, r: 0.11 };
  // construction apparatus: visible while building, retires at the final
  // step, "show construction" brings it back (the applet hides it per step)
  const constr = (st) => st._k < RESOLVE || st.o4;
  const appar = (st) => st._k < 2 || st._k >= RESOLVE;    // applet: steps 0,1,10
  const shOn = (st) => st.sh;
  const ptsOn = (st) => st.n4;
  const ptsConstr = (st) => st.n4 && constr(st);

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // ---- step 1: the arch + control apparatus -------------------------------
  dw.strokes('arch', NSEG, { intro: 1, w: 0.075,
    color: { pending: PAL.black,
             final: () => (dw && player && player.k >= RESOLVE ? PAL.blue : 0x808080) } });
  for (let i = 0; i < 4; i++) {
    dw.dashLine(`bz${i}`, { intro: 1, dash: 0.18, when: appar });
  }
  dw.dashLine('railB1', { intro: 1, dash: 0.16 });        // applet d (always)
  dw.dashLine('railB5', { intro: 1, dash: 0.16 });        // applet e (always)
  dw.dashLine('railB2', { intro: 1, dash: 0.16, when: appar });  // applet g
  dw.dashLine('railB4', { intro: 1, dash: 0.16, when: appar });  // applet i
  for (let i = 1; i <= 5; i++) {
    dw.disk(`pt_B${i}`, { intro: 1, r: 0.1,
                          when: i === 1 || i === 5 ? undefined : appar });
  }

  // ---- step 2: load band + strips + load line -----------------------------
  dw.poly('band', 4, { intro: 2, color: PAL.green, opacity: 0.1, flash: false });
  dw.strokes('bandEdge', 4, { intro: 2, w: 0.03, color: PAL.green, flash: false });
  dw.label('lbl_q', 'q', { intro: 2, color: PAL.green });
  for (let k = 0; k < 18; k++) {
    dw.dashLine(`st${k}`, { intro: 2, dash: 0.075, color: 0x707070, flash: false });
    dw.seg(`ll${k}`, { intro: 2, w: 0.035, color: PAL.black });
    dw.link(`st${k}`, `ll${k}`);
  }
  dw.disk('pt_LL0', { intro: 2, r: 0.09 });
  for (let i = 1; i <= 18; i++) dw.disk(`pt_ll${i}`, { intro: 2, r: 0.045, when: ptsOn });

  // ---- step 3: split at M -------------------------------------------------
  dw.disk('pt_M', { intro: 3, r: 0.11 });
  dw.label('lbl_M', 'M', { cls: 'point', intro: 3 });
  dw.dashLine('splitM', { intro: 3, dash: 0.075, color: 0x707070, flash: false });
  dw.dashLine('vertR1', { intro: 3, dash: 0.12, color: PAL.grey, when: constr });
  dw.dashLine('vertR2', { intro: 3, dash: 0.12, color: PAL.grey, when: constr });
  dw.arrow('r1Line', { intro: 3, ...ARR, when: constr }); // R1 ON the load line
  dw.arrow('r2Line', { intro: 3, ...ARR, when: constr });
  dw.label('lbl_R1l', 'R₁', { intro: 3, color: PAL.green, when: constr });
  dw.label('lbl_R2l', 'R₂', { intro: 3, color: PAL.green, when: constr });
  dw.disk('pt_LLM', { intro: 3, r: 0.065, when: ptsConstr });

  // ---- step 4: the left part (R1) on its strings --------------------------
  dw.dashLine('strA1', { intro: 4, dash: 0.16, color: PAL.grey, when: constr });  // B1-P
  dw.dashLine('strA2', { intro: 4, dash: 0.16, color: PAL.grey, when: constr });  // P-B5 (thru M)
  dw.disk('pt_P', { intro: 4, r: 0.07, when: ptsConstr });
  dw.label('lbl_P', 'P', { cls: 'point', intro: 4, when: ptsConstr });
  dw.arrow('r1Form', { intro: 4, ...ARR, when: constr }); // R1 hangs at P
  dw.label('lbl_R1f', 'R₁', { intro: 4, color: PAL.green, when: constr });
  dw.arrow('subA1', { intro: 4, ...ARR, when: constr });                // R' -> LL0
  dw.arrow('subB1', { intro: 4, ...ARR, when: constr });                // LLM -> R'
  dw.label('lbl_A1', 'A₁', { intro: 4, color: PAL.green, when: constr });
  dw.label('lbl_B1', 'B₁', { intro: 4, color: PAL.green, when: constr });
  dw.disk('pt_R2', { intro: 4, r: 0.065, when: ptsConstr });
  dw.label('lbl_R2', 'R′', { cls: 'point', intro: 4, when: ptsConstr });
  dw.arrow('fA1', { intro: 4, ...ARR, when: constr });                  // at the springings
  dw.arrow('fB1', { intro: 4, ...ARR, when: constr });
  dw.label('lbl_fA1', 'A₁', { intro: 4, color: PAL.green, when: constr });
  dw.label('lbl_fB1', 'B₁', { intro: 4, color: PAL.green, when: constr });

  // ---- step 5: the right part (R2) ----------------------------------------
  dw.dashLine('strB1', { intro: 5, dash: 0.16, color: PAL.grey, when: constr });  // B1-Q (thru M)
  dw.dashLine('strB2', { intro: 5, dash: 0.16, color: PAL.grey, when: constr });  // Q-B5
  dw.disk('pt_Q', { intro: 5, r: 0.07, when: ptsConstr });
  dw.label('lbl_Q', 'Q', { cls: 'point', intro: 5, when: ptsConstr });
  dw.arrow('r2Form', { intro: 5, ...ARR, when: constr }); // R2 hangs at Q
  dw.label('lbl_R2f', 'R₂', { intro: 5, color: PAL.green, when: constr });
  dw.arrow('subA2', { intro: 5, ...ARR, when: constr });                // S -> LLM
  dw.arrow('subB2', { intro: 5, ...ARR, when: constr });                // LLE -> S
  dw.label('lbl_A2', 'A₂', { intro: 5, color: PAL.green, when: constr });
  dw.label('lbl_B2', 'B₂', { intro: 5, color: PAL.green, when: constr });
  dw.disk('pt_S', { intro: 5, r: 0.065, when: ptsConstr });
  dw.label('lbl_S', 'S', { cls: 'point', intro: 5, when: ptsConstr });
  dw.arrow('fA2', { intro: 5, ...ARR, when: constr });
  dw.arrow('fB2', { intro: 5, ...ARR, when: constr });
  dw.label('lbl_fA2', 'A₂', { intro: 5, color: PAL.green, when: constr });
  dw.label('lbl_fB2', 'B₂', { intro: 5, color: PAL.green, when: constr });

  // ---- step 6: pole + rays ------------------------------------------------
  dw.dashLine('parP', { intro: 6, dash: 0.15, color: PAL.grey, when: constr });  // R'-o
  dw.dashLine('parQ', { intro: 6, dash: 0.15, color: PAL.grey, when: constr });  // o-S
  dw.disk('pt_pole', { intro: 6, r: 0.08 });
  dw.label('lbl_pole', 'o', { cls: 'point', intro: 6 });
  for (let k = 0; k <= 18; k++) {
    dw.seg(`r${k}`, { intro: 6, w: k === 0 || k === 18 ? 0.032 : 0.016,
                      color: k === 0 || k === 18 ? PAL.black : PAL.grey });
  }

  // ---- step 7: the resultant R --------------------------------------------
  dw.dashLine('rStr1', { intro: 7, dash: 0.16, color: PAL.black, when: constr });   // B1 - F2
  dw.dashLine('rStr2', { intro: 7, dash: 0.16, color: PAL.black, when: constr });   // F2 - B5
  dw.dashLine('rLoa', { intro: 7, dash: 0.1, color: PAL.black, flash: false, when: constr });
  dw.dashArrow('rForm', { intro: 7, ...ARR, dash: 0.2, when: constr });
  dw.label('lbl_Rf', 'R', { intro: 7, color: PAL.green, when: constr });
  dw.disk('pt_F2', { intro: 7, r: 0.065, when: ptsConstr });
  dw.dashArrow('rLine', { intro: 7, ...ARR, dash: 0.2 });
  dw.label('lbl_Rl', 'R', { intro: 7, color: PAL.green });

  // ---- step 8: reactions A/B (the applet replaces them by the components) --
  dw.arrow('reacAf', { intro: 8, outro: 10, ...ARR });    // force: o -> LL0
  dw.arrow('reacBf', { intro: 8, outro: 10, ...ARR });    // force: LLE -> o
  dw.label('lblAf', 'A', { intro: 8, outro: 10, color: PAL.green });
  dw.label('lblBf', 'B', { intro: 8, outro: 10, color: PAL.green });
  dw.arrow('reacA', { intro: 8, outro: 10, ...ARR });
  dw.arrow('reacB', { intro: 8, outro: 10, ...ARR });
  dw.label('lblA', 'A', { intro: 8, outro: 10, color: PAL.green });
  dw.label('lblB', 'B', { intro: 8, outro: 10, color: PAL.green });

  // ---- step 9: the thrust line (+ compression pipes) ----------------------
  for (let k = 0; k <= 18; k++) {
    dw.dashLine(`th${k}`, { intro: 9, dash: 0.22, color: PAL.black });
    dw.link(`th${k}`, `r${k}`);
    dw.poly(`if${k}`, 4, { intro: 9, opacity: 1.0, z: -0.18, flash: false,
                           color: { pending: PAL.grey, final: () => PAL.blue },
                           when: (st) => st.o1 });
  }
  dw.disk('pt_T1', { intro: 9, r: 0.055, when: ptsOn });
  for (let k = 1; k <= 18; k++) dw.disk(`pt_fp${k}`, { intro: 9, r: 0.045, when: ptsOn });

  // ---- step 10: H/V components --------------------------------------------
  dw.arrow('cAH', { intro: 10, ...ARR });                 // U -> LL0
  dw.arrow('cAV', { intro: 10, ...ARR });                 // o -> U
  dw.arrow('cBH', { intro: 10, ...ARR });                 // LLE -> Z
  dw.arrow('cBV', { intro: 10, ...ARR });                 // Z -> o
  dw.label('lbl_cAH', 'A_H', { intro: 10, color: PAL.green });
  dw.label('lbl_cAV', 'A_V', { intro: 10, color: PAL.green });
  dw.label('lbl_cBH', 'B_H', { intro: 10, color: PAL.green });
  dw.label('lbl_cBV', 'B_V', { intro: 10, color: PAL.green });
  dw.disk('pt_U', { intro: 10, r: 0.055, when: ptsOn });
  dw.disk('pt_Z', { intro: 10, r: 0.055, when: ptsOn });
  dw.arrow('fAH', { intro: 10, ...ARR });
  dw.arrow('fAV', { intro: 10, ...ARR });
  dw.arrow('fBH', { intro: 10, ...ARR });
  dw.arrow('fBV', { intro: 10, ...ARR });
  dw.label('lbl_fAH', 'A_H', { intro: 10, color: PAL.green });
  dw.label('lbl_fAV', 'A_V', { intro: 10, color: PAL.green });
  dw.label('lbl_fBH', 'B_H', { intro: 10, color: PAL.green });
  dw.label('lbl_fBV', 'B_V', { intro: 10, color: PAL.green });

  // ---- step 11: H + the offset y at strip 10 ------------------------------
  dw.dashLine('hCon1', { intro: 11, dash: 0.08, color: 0x707070, flash: false, when: constr });
  dw.dashLine('hCon2', { intro: 11, dash: 0.08, color: 0x707070, flash: false, when: constr });
  dw.seg('hSeg', { intro: 11, w: 0.045, color: 0x808080, when: constr });
  dw.label('lbl_H', 'H', { intro: 11, color: PAL.black, when: constr });
  dw.disk('pt_B1lv', { intro: 11, r: 0.08, when: constr });
  dw.disk('pt_C1', { intro: 11, r: 0.055, when: ptsConstr });
  dw.arrow('hArr', { intro: 11, ...ARR, when: constr }); // H at FP11 (left)
  dw.label('lbl_Hf', 'H', { intro: 11, color: PAL.green, when: constr });
  dw.dashLine('ySeg', { intro: 11, dash: 0.1, color: PAL.black, when: constr });
  dw.label('lbl_y', 'y', { intro: 11, color: PAL.black, when: constr });
  dw.disk('pt_mf10', { intro: 11, r: 0.05, when: ptsConstr });

  // ---- step 12: d = H*y/T at strip 10 -------------------------------------
  dw.seg('dSeg', { intro: 12, w: 0.045,
                   color: { pending: PAL.black, final: () => PAL.blue } });
  dw.label('lbl_d', 'd', { intro: 12, color: PAL.black, when: constr });
  dw.arrow('tArr', { intro: 12, ...ARR, when: constr });
  dw.label('lbl_T', 'T', { intro: 12, color: PAL.green, when: constr });
  dw.strokes('sq1', 3, { intro: 12, w: 0.018, color: PAL.black, flash: false, when: constr });
  dw.label('lbl_sq1', '90°', { intro: 12, color: PAL.black, when: constr });

  // ---- step 13: the same at strip 11 --------------------------------------
  dw.arrow('hArr2', { intro: 13, ...ARR, when: constr });
  dw.label('lbl_Hf2', 'H', { intro: 13, color: PAL.green, when: constr });
  dw.dashLine('ySeg2', { intro: 13, dash: 0.1, color: PAL.black, when: constr });
  dw.label('lbl_y2', 'y₂', { intro: 13, color: PAL.black, when: constr });
  dw.disk('pt_mf11', { intro: 13, r: 0.05, when: ptsConstr });
  dw.seg('dSeg2', { intro: 13, w: 0.045,
                    color: { pending: PAL.black, final: () => PAL.blue } });
  dw.label('lbl_d2', 'd₂', { intro: 13, color: PAL.black, when: constr });
  dw.arrow('tArr2', { intro: 13, ...ARR, when: constr });
  dw.label('lbl_T2', 'T', { intro: 13, color: PAL.green, when: constr });
  dw.strokes('sq2', 3, { intro: 13, w: 0.018, color: PAL.black, flash: false, when: constr });
  dw.label('lbl_sq2', '90°', { intro: 13, color: PAL.black, when: constr });

  // ---- step 14: the 16 remaining ordinates; 15: the bending line ----------
  dw.strokes('ords', 16, { intro: 14, w: 0.035,
                           color: { pending: PAL.black, final: () => PAL.blue } });
  dw.strokes('cable', 19, { intro: RESOLVE, w: 0.04, color: RED, flash: false });

  // the applet's "show handles": dashed circles of radius loadSymbol around
  // the arrow anchors + the rail handle points (grey)
  for (const n of ['hcB1', 'hcB5', 'hcP', 'hcQ', 'hcF2']) {
    dw.dashLine(n, { intro: 0, dash: 0.14, color: 0x7d7dff, flash: false, when: shOn });
  }
  for (let i = 0; i < 8; i++) {
    dw.disk(`hpt${i}`, { intro: 0, r: 0.06, face: 0xc0c0c0, when: shOn });
  }

  dw.nodeInspector(3, { when: (st) => st.node > 0, ...NARR });

  dw.link('r1Form', 'r1Line', 'lbl_R1f', 'lbl_R1l');
  dw.link('r2Form', 'r2Line', 'lbl_R2f', 'lbl_R2l');
  dw.link('rForm', 'rLine', 'lbl_Rf', 'lbl_Rl');
  dw.link('reacA', 'reacAf', 'lblA', 'lblAf');
  dw.link('reacB', 'reacBf', 'lblB', 'lblBf');
  dw.link('fA1', 'subA1', 'lbl_fA1', 'lbl_A1');
  dw.link('fA2', 'subA2', 'lbl_fA2', 'lbl_A2');
  dw.link('fB1', 'subB1', 'lbl_fB1', 'lbl_B1');
  dw.link('fB2', 'subB2', 'lbl_fB2', 'lbl_B2');
  dw.link('fAH', 'cAH', 'lbl_fAH', 'lbl_cAH');
  dw.link('fAV', 'cAV', 'lbl_fAV', 'lbl_cAV');
  dw.link('fBH', 'cBH', 'lbl_fBH', 'lbl_cBH');
  dw.link('fBV', 'cBV', 'lbl_fBV', 'lbl_cBV');
  dw.link('strA1', 'strA2', 'parP');
  dw.link('strB1', 'strB2', 'parQ');
  dw.link('hArr', 'hSeg', 'lbl_Hf', 'lbl_H');
  dw.ghostable('rLine', 'cAH', 'cAV', 'cBH', 'cBV',
               ...[...Array(19)].map((_, k) => `r${k}`),
               ...[...Array(18)].map((_, k) => `ll${k}`),
               'subA1', 'subB1', 'subA2', 'subB2');
  // reacAf/reacBf retire at step 10 -- outroed elements stay out of the ghost

  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [2.1, 14.6]);
    dw.setLabel('force_title', [24.1, 14.48]);
    dw.setLabel('force_sub', [24.35, 14.02]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(2)} kN`);

    // arch + apparatus
    const pts = [...Array(NSEG + 1)].map((_, i) => bez(d.P, i / NSEG));
    dw.setStrokes('arch', [...Array(NSEG)].map((_, i) => [pts[i], pts[i + 1]]));
    for (let i = 0; i < 4; i++) dw.setDashLine(`bz${i}`, [d.P[i], d.P[i + 1]]);
    dw.setDashLine('railB1', [[0, 0], [0, RAIL_Y]]);
    dw.setDashLine('railB2', [[s.e2x, 0], [s.e2x, RAIL_Y]]);
    dw.setDashLine('railB4', [[s.g4x, 0], [s.g4x, RAIL_Y]]);
    dw.setDashLine('railB5', [[18, 0], [18, RAIL_Y]]);
    for (let i = 1; i <= 5; i++) dw.setDisk(`pt_B${i}`, d.P[i - 1]);

    // load band + strips + load line
    const J_Y = LINE1_Y - s.sLS * 0.35;
    dw.setPoly('band', [[0, LINE1_Y], [0, J_Y], [18, J_Y], [18, LINE1_Y]]);
    dw.setStrokes('bandEdge', [
      [[0, LINE1_Y], [18, LINE1_Y]], [[0, J_Y], [18, J_Y]],
      [[0, LINE1_Y], [0, J_Y]], [[18, LINE1_Y], [18, J_Y]]]);
    dw.setLabel('lbl_q', [-0.85, LINE1_Y - s.sLS * 0.26]);
    for (let k = 0; k < 18; k++) {
      dw.setDashLine(`st${k}`, [[d.xs[k], S1_Y], [d.xs[k], 0]]);
      dw.setSeg(`ll${k}`, d.LL[k], d.LL[k + 1]);
    }
    dw.setDisk('pt_LL0', d.LL[0]);
    for (let i = 1; i <= 18; i++) dw.setDisk(`pt_ll${i}`, d.LL[i]);

    // split at M
    dw.setDisk('pt_M', d.M);
    dw.setLabel('lbl_M', V.add(d.M, [-0.34, 0.32]));
    dw.setDashLine('splitM', [[d.M[0], S1_Y], [d.M[0], 0]]);
    dw.setDashLine('vertR1', [[d.xL, 0], [d.xL, S1_Y]]);
    dw.setDashLine('vertR2', [[d.xR, 0], [d.xR, S1_Y]]);
    dw.setArrow('r1Line', d.LL[0], d.LLM);
    dw.setArrow('r2Line', d.LLM, d.LLE);
    dw.setLabel('lbl_R1l', [s.llx + 0.45, (d.LL[0][1] + d.LLM[1]) / 2]);
    dw.setLabel('lbl_R2l', [s.llx + 0.45, (d.LLM[1] + d.LLE[1]) / 2 + 0.9]);
    dw.setDisk('pt_LLM', d.LLM);

    // left part: strings through P, triangle at R'
    dw.setDashLine('strA1', [d.B1, d.Pp]);
    dw.setDashLine('strA2', [d.Pp, d.B5]);
    dw.setDisk('pt_P', d.Pp);
    dw.setLabel('lbl_P', V.add(d.Pp, [-0.36, 0.12]));
    dw.setArrow('r1Form', V.add(d.Pp, [0, s.sLS]), d.Pp);
    dw.setLabel('lbl_R1f', V.add(d.Pp, [0.35, s.sLS * 0.55]));
    dw.setArrow('subA1', d.R2, d.LL[0]);
    dw.setArrow('subB1', d.LLM, d.R2);
    dw.setLabel('lbl_A1', V.add(V.mid(d.R2, d.LL[0]), [-0.45, 0.14]));
    dw.setLabel('lbl_B1', V.add(V.mid(d.LLM, d.R2), [-0.28, -0.36]));
    dw.setDisk('pt_R2', d.R2);
    dw.setLabel('lbl_R2', V.add(d.R2, [-0.05, 0.38]));
    // form arrows: along the force-polygon edge, tip at the springing
    const eA1 = V.unit(V.sub(d.LL[0], d.R2)), eB1 = V.unit(V.sub(d.R2, d.LLM));
    const eA2 = V.unit(V.sub(d.LLM, d.S)), eB2 = V.unit(V.sub(d.S, d.LLE));
    dw.setArrow('fA1', V.sub(d.B1, V.mul(eA1, s.sLS)), d.B1);
    dw.setArrow('fB1', V.sub(d.B5, V.mul(eB1, s.sLS)), d.B5);
    dw.setLabel('lbl_fA1', V.sub(d.B1, V.mul(eA1, s.sLS + 0.4)));
    dw.setLabel('lbl_fB1', V.sub(d.B5, V.mul(eB1, s.sLS + 0.4)));

    // right part: strings through Q, triangle at S
    dw.setDashLine('strB1', [d.B1, d.Qp]);
    dw.setDashLine('strB2', [d.Qp, d.B5]);
    dw.setDisk('pt_Q', d.Qp);
    dw.setLabel('lbl_Q', V.add(d.Qp, [-0.4, 0.15]));
    dw.setArrow('r2Form', V.add(d.Qp, [0, s.sLS]), d.Qp);
    dw.setLabel('lbl_R2f', V.add(d.Qp, [0.35, s.sLS * 0.55]));
    dw.setArrow('subA2', d.S, d.LLM);
    dw.setArrow('subB2', d.LLE, d.S);
    dw.setLabel('lbl_A2', V.add(V.mid(d.S, d.LLM), [-0.48, 0.16]));
    dw.setLabel('lbl_B2', V.add(V.mid(d.LLE, d.S), [-0.48, -0.18]));
    dw.setDisk('pt_S', d.S);
    dw.setLabel('lbl_S', V.add(d.S, [-0.42, -0.14]));
    dw.setArrow('fA2', V.sub(d.B1, V.mul(eA2, s.sLS)), d.B1);
    dw.setArrow('fB2', V.sub(d.B5, V.mul(eB2, s.sLS)), d.B5);
    dw.setLabel('lbl_fA2', V.sub(d.B1, V.mul(eA2, s.sLS + 0.4)));
    dw.setLabel('lbl_fB2', V.sub(d.B5, V.mul(eB2, s.sLS + 0.4)));

    // pole + rays
    const ext = (a, b, e = 0.6) => V.add(b, V.mul(V.unit(V.sub(b, a)), e));
    dw.setDashLine('parP', [d.R2, ext(d.R2, d.pole)]);
    dw.setDashLine('parQ', [d.S, ext(d.S, d.pole)]);
    dw.setDisk('pt_pole', d.pole);
    dw.setLabel('lbl_pole', V.add(d.pole, [-0.4, 0]));
    for (let k = 0; k <= 18; k++) dw.setSeg(`r${k}`, d.pole, d.LL[k]);

    // resultant
    dw.setDashLine('rStr1', [d.B1, d.F2]);
    dw.setDashLine('rStr2', [d.F2, d.B5]);
    dw.setDashLine('rLoa', [[d.F2[0], S1_Y], [d.F2[0], 0]]);
    dw.setDashArrow('rForm', V.add(d.F2, [0, s.sLS]), d.F2);
    dw.setLabel('lbl_Rf', V.add(d.F2, [0.35, s.sLS * 0.55]));
    dw.setDisk('pt_F2', d.F2);
    dw.setDashArrow('rLine', d.LL[0], d.LLE);
    dw.setLabel('lbl_Rl', [s.llx + 0.42, d.pole[1] - 1.4]);

    // reactions: A = o->LL0 (left springing), B = LLE->o (right springing);
    // the applet's force captions swap A/B -- labeled physically here
    dw.setArrow('reacAf', d.pole, d.LL[0]);
    dw.setArrow('reacBf', d.LLE, d.pole);
    dw.setLabel('lblAf', V.add(V.mid(d.pole, d.LL[0]), [-0.16, 0.38]));
    dw.setLabel('lblBf', V.add(V.mid(d.LLE, d.pole), [-0.16, -0.38]));
    const eA = V.unit(V.sub(d.LL[0], d.pole));            // left thrust dir
    const eB = V.unit(V.sub(d.pole, d.LLE));              // right thrust dir
    dw.setArrow('reacA', V.sub(d.B1, V.mul(eA, s.sLS)), d.B1);
    dw.setArrow('reacB', V.sub(d.B5, V.mul(eB, s.sLS)), d.B5);
    dw.setLabel('lblA', V.add(V.sub(d.B1, V.mul(eA, s.sLS * 0.6)), V.mul(V.perp(eA), 0.5)));
    dw.setLabel('lblB', V.add(V.sub(d.B5, V.mul(eB, s.sLS * 0.6)), V.mul(V.perp(eB), -0.5)));

    // thrust line + pipes
    const chain = [...d.FP, d.T1];
    for (let k = 0; k <= 18; k++) {
      dw.setDashLine(`th${k}`, [chain[k], chain[k + 1]]);
      dw.setPoly(`if${k}`, V.rectPoints(chain[k], chain[k + 1], s.sIF * d.rayN[k]));
    }
    dw.setDisk('pt_T1', d.T1);
    for (let k = 1; k <= 18; k++) dw.setDisk(`pt_fp${k}`, d.FP[k]);

    // components: LLE -> Z -> o -> U -> LL0 (B_H, B_V, A_V, A_H)
    dw.setArrow('cBH', d.LLE, d.Z);
    dw.setArrow('cBV', d.Z, d.pole);
    dw.setArrow('cAV', d.pole, d.U);
    dw.setArrow('cAH', d.U, d.LL[0]);
    dw.setLabel('lbl_cBH', V.add(V.mid(d.LLE, d.Z), [0, -0.34]));
    dw.setLabel('lbl_cBV', V.add(V.mid(d.Z, d.pole), [-0.6, 0]));
    dw.setLabel('lbl_cAV', V.add(V.mid(d.pole, d.U), [-0.6, 0]));
    dw.setLabel('lbl_cAH', V.add(V.mid(d.U, d.LL[0]), [0, 0.34]));
    dw.setDisk('pt_U', d.U);
    dw.setDisk('pt_Z', d.Z);
    dw.setArrow('fAH', V.add(d.B1, [-s.sLS, 0]), d.B1);
    dw.setArrow('fAV', V.add(d.B1, [0, -s.sLS]), d.B1);
    dw.setArrow('fBH', V.add(d.B5, [s.sLS, 0]), d.B5);
    dw.setArrow('fBV', V.add(d.B5, [0, -s.sLS]), d.B5);
    dw.setLabel('lbl_fAH', V.add(d.B1, [-s.sLS - 0.55, 0.25]));
    dw.setLabel('lbl_fAV', V.add(d.B1, [0.42, -s.sLS * 0.6]));
    dw.setLabel('lbl_fBH', V.add(d.B5, [s.sLS + 0.55, 0.25]));
    dw.setLabel('lbl_fBV', V.add(d.B5, [0.42, -s.sLS * 0.6]));

    // H at the level of B1 (draggable) + the offset y at strip 10
    dw.setDashLine('hCon1', [d.LLE, [s.llx, Math.min(d.LLE[1], s.b1lv)]]);
    dw.setDashLine('hCon2', [d.C1, d.pole]);
    dw.setSeg('hSeg', d.B1pt, d.C1);
    dw.setLabel('lbl_H', [(d.B1pt[0] + d.C1[0]) / 2, s.b1lv - 0.38]);
    dw.setDisk('pt_B1lv', d.B1pt);
    dw.setDisk('pt_C1', d.C1);
    dw.setArrow('hArr', d.FP[11], V.add(d.FP[11], [-s.sLS, 0]));
    dw.setLabel('lbl_Hf', V.add(d.FP[11], [-s.sLS * 0.55, 0.35]));
    dw.setDashLine('ySeg', [d.MF[10], d.FP[11]]);
    dw.setLabel('lbl_y', V.add(V.mid(d.MF[10], d.FP[11]), [0.3, 0]));
    dw.setDisk('pt_mf10', d.MF[10]);

    // d = H*y/T at strips 10 and 11 (square to the axis: T arrow + 90°)
    const sqAt = (i, tag) => {
      const tp = d.TP[i], td = d.TDIR[i];
      const dd = V.unit(V.sub(d.MF[i], tp));              // back along d
      const L = 0.26;
      const a = V.add(tp, V.mul(dd, L)), b = V.add(tp, V.mul(td, L));
      const c = V.add(a, V.mul(td, L));
      dw.setStrokes(tag, [[a, c], [c, b], [b, tp]]);
      dw.setLabel(`lbl_${tag}`, V.add(tp, V.add(V.mul(dd, 0.62), V.mul(td, 0.62))));
    };
    dw.setSeg('dSeg', d.MF[10], d.TP[10]);
    dw.setLabel('lbl_d', V.add(V.mid(d.MF[10], d.TP[10]), [-0.35, -0.12]));
    dw.setArrow('tArr', d.TP[10], V.add(d.TP[10], V.mul(d.TDIR[10], s.sLS)));
    dw.setLabel('lbl_T', V.add(d.TP[10], V.mul(d.TDIR[10], s.sLS + 0.35)));
    sqAt(10, 'sq1');
    dw.setArrow('hArr2', d.FP[12], V.add(d.FP[12], [-s.sLS, 0]));
    dw.setLabel('lbl_Hf2', V.add(d.FP[12], [-s.sLS * 0.55, 0.35]));
    dw.setDashLine('ySeg2', [d.MF[11], d.FP[12]]);
    dw.setLabel('lbl_y2', V.add(V.mid(d.MF[11], d.FP[12]), [0.38, 0]));
    dw.setDisk('pt_mf11', d.MF[11]);
    dw.setSeg('dSeg2', d.MF[11], d.TP[11]);
    dw.setLabel('lbl_d2', V.add(V.mid(d.MF[11], d.TP[11]), [-0.42, -0.12]));
    dw.setArrow('tArr2', d.TP[11], V.add(d.TP[11], V.mul(d.TDIR[11], s.sLS)));
    dw.setLabel('lbl_T2', V.add(d.TP[11], V.mul(d.TDIR[11], s.sLS + 0.35)));
    sqAt(11, 'sq2');

    // the 16 remaining ordinates + the bending line
    dw.setStrokes('ords', d.MF.map((p, i) => [p, d.TP[i]])
                            .filter((_, i) => i !== 10 && i !== 11));
    dw.setStrokes('cable', [[d.B1, d.TP[0]],
      ...[...Array(17)].map((_, i) => [d.TP[i], d.TP[i + 1]]),
      [d.TP[17], d.B5]]);

    // handles (the applet's showHandles circles + rail handle points)
    const circ = (c, r) => [...Array(41)].map((_, i) => {
      const a = (i / 40) * 2 * Math.PI;
      return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    });
    dw.setDashLine('hcB1', circ(d.B1, s.sLS));
    dw.setDashLine('hcB5', circ(d.B5, s.sLS));
    dw.setDashLine('hcP', circ(d.Pp, s.sLS));
    dw.setDashLine('hcQ', circ(d.Qp, s.sLS));
    dw.setDashLine('hcF2', circ(d.F2, s.sLS));
    const hpts = [[0, RAIL_Y], [s.e2x, 0], [s.e2x, RAIL_Y], [s.g4x, RAIL_Y],
                  [18, RAIL_Y], [0, S1_Y], [s.llx, -1.592333876041095],
                  [s.llx, S1_Y]];
    hpts.forEach((p, i) => dw.setDisk(`hpt${i}`, p));
  }

  // ---- node inspector: springing A, the 18 thrust-line kinks, springing B --
  const nodeAt = (i) => (i === 0 ? d.B1 : i === 19 ? d.B5 : d.FP[i]);
  const NODE_DISKS = ['pt_B1', ...[...Array(18)].map((_, i) => `pt_fp${i + 1}`), 'pt_B5'];
  function nodeSides(i) {
    if (i === 0) return [[d.LL[0], d.pole], [d.pole, d.U], [d.U, d.LL[0]]];
    if (i === 19) return [[d.pole, d.LLE], [d.LLE, d.Z], [d.Z, d.pole]];
    return [[d.LL[i - 1], d.LL[i]], [d.LL[i], d.pole], [d.pole, d.LL[i - 1]]];
  }
  function updateNode() {
    const j = Math.max(0, Math.min(19, Math.round(s.node) - 1));
    dw.selectDisk(s.node > 0 ? NODE_DISKS[j] : null);
    dw.setNodeInspector(nodeAt(j), 1.5,
      s.node > 0 ? (j === 0 ? 'springing A' : j === 19 ? 'springing B' : `thrust node ${j}`) : '',
      s.node > 0 ? nodeSides(j) : []);
  }

  function refresh() {
    d = compute(s);
    s._k = player.k;
    update();
    updateNode();
    player.apply(d, s);
  }

  player = makePlayer(STEPS, refresh);

  const view = panel.section('View');
  panel.button(view, 'zoom fit', () => dw.zoomFit());

  const pre = panel.section('Presets');
  const row = panel.buttonRow ? panel.buttonRow(pre) : pre;
  for (const name of ['waterloo', 'berlin', 'bergisel']) {
    panel.button(row, name, () => {
      const { M, ...rest } = PRESETS[name];
      Object.assign(s, rest);
      s.tM = projectT(ctrl(s), M);
      panel.syncAll();
      refresh();
    });
  }

  const par = panel.section('Parameters');
  panel.slider(par, s, 'sFD', 'scale force diagram', 0.1, 1, 0.05, refresh);
  panel.slider(par, s, 'T', 'T (ordinate scale d = H·y/T)', 10, 30, 1, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 1, 2, 0.1, refresh);
  panel.toggle(par, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.1, 0.005, refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  panel.toggle(par, s, 'sh', 'show handles', refresh);
  panel.toggle(par, s, 'o4', 'show construction', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off; 1 = springing A, 2–19 = thrust nodes, 20 = springing B)',
               0, 20, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS });
    panel.syncAll();
    refresh();
  });

  // dragging: end/inner control points on their rails, Bezier3 free, M on
  // the curve, LL0 free, B1-level on the load-line vertical
  const hits = [
    ['B1', () => d.P[0], 1, 99], ['B2', () => d.P[1], 1, 99],
    ['B3', () => d.P[2], 1, 99], ['B4', () => d.P[3], 1, 99],
    ['B5', () => d.P[4], 1, 99],
    ['M', () => d.M, 3, 99],
    ['LL0', () => d.LL[0], 2, 99],
    ['B1lv', () => d.B1pt, 11, 99],
  ];
  dw.enableDrag(
    (wx, wy, tol) => {
      let best = null;
      for (const [name, get, k0, k1] of hits) {
        if (player.k < k0 || player.k >= k1) continue;
        if ((name === 'B2' || name === 'B3' || name === 'B4')
            && !appar({ _k: player.k })) continue;
        if (name === 'B1lv' && !constr({ _k: player.k, o4: s.o4 })) continue;
        const p = get();
        const dd = Math.hypot(p[0] - wx, p[1] - wy);
        if (dd < tol) { best = name; tol = dd; }
      }
      return best;
    },
    (name, wx, wy) => {
      const cy = (y) => Math.max(0, Math.min(RAIL_Y, y));
      if (name === 'B1') s.b1y = cy(wy);
      else if (name === 'B2') s.b2y = cy(wy);
      else if (name === 'B3') { s.b3x = Math.max(0.5, Math.min(17.5, wx)); s.b3y = Math.max(0, Math.min(12, wy)); }
      else if (name === 'B4') s.b4y = cy(wy);
      else if (name === 'B5') s.b5y = cy(wy);
      else if (name === 'M') s.tM = Math.max(0.02, Math.min(0.98, projectT(d.P, [wx, wy])));
      else if (name === 'LL0') {
        s.llx = Math.max(22, Math.min(30, wx));
        s.lly = Math.max(8.5, Math.min(13, wy));
      } else if (name === 'B1lv') {
        s.b1lv = Math.max(-1.592333876041095, Math.min(S1_Y, wy));
      }
      refresh();
    },
  );

  dw.nodeSelect([...Array(20)].map((_, i) => ({ at: () => nodeAt(i) })), (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
