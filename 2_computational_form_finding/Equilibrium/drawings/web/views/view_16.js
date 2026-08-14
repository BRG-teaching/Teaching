/**
 * Drawing view/16 "Minimum and maximum thrust in a masonry arch"
 * (https://block.arch.ethz.ch/eq/drawing/view/16) as a step-by-step
 * construction: a semicircular arch of 16 equal voussoirs admits a whole
 * family of thrust lines; the two extreme ones are found with the two-point
 * funicular method. The MAXIMUM-thrust line passes through the crown
 * intrados D and the springing extrados (F' and its mirror); the
 * MINIMUM-thrust line through the crown extrados E and the springing
 * intrados (L4 and the handle). Each: trial pole -> trial funicular ->
 * closing string -> division point on the load line -> parallel to the
 * chord -> pole on the crown horizontal.
 *
 * Live port of view_16/applet_0/geogebra.xml; the whole chain (joints,
 * centroids, both load lines, both trials, division points W4/Z4, poles
 * o1/o2, every funicular vertex, reaction tips) is regression-checked
 * against the applet's baked coordinates (53 targets, max error 5.6e-13).
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 16 — Minimum and maximum thrust in a masonry arch',
  subtitle: 'the two extreme thrust lines of a masonry arch: two poles on one crown horizontal',
  about: 'A semicircular masonry arch of 16 equal voussoirs admits infinitely many thrust lines; the two extreme ones are found with the two-point funicular method. The maximum-thrust line presses through the crown intrados and the springing extrados, the minimum-thrust line through the crown extrados and the springing intrados — each from a trial funicular, its closing string, the division point on the load line and a pole on the crown horizontal. The horizontal thrust of the real arch can only lie between H_min and H_max.',
  frame: [[6.8, 6.3], [56.8, 32.3]],
};

// the arch centre A and the applet's fixed scaffolding
const AX = 20.74421133215402, AY = 10.224749441793364;
const RI = 7.649043668313393;              // intrados radius (B is not draggable)
const WV = 1.657584521446055;              // voussoir weight |L1-M1| in kN (constant)
const Y_WTIP = 22.40501889663561;          // weight-arrow tip level (I_9)
const Y_CL_B = 8.330822160694657;          // centroid-line extent (Z_7 .. S_7)
const Y_CL_T = 24.821800154322442;
const SPRING = [8.237400030435866, 33.19864187332054];   // abutment line a_16
const CYAN = 0x0e9aa7;                     // trial 2 (applet 0,255,255, darkened)
const N = 16;                              // voussoirs
const RESOLVE = 16;

const DEFAULTS = {
  rE: 9.53656831073833,                    // extrados radius (handleArcRadius)
  th0: Math.atan2(1.432703016017372, 9.428334805959814),  // springing angle
  tTop: 0,                                 // crown point on D-E (0 = intrados D)
  tBot: 0,                                 // springing point on U-hAS (0 = intrados U)
  t2: [39, 24],                            // load line 1 top (cap 'a', free)
  x2: 45.287594669986134,                  // load line 2 x (handleForceDiagram2)
  L5: [52.801634860936176, 23.394831328271703],   // trial pole 1 (orange)
  m5y: 26.76653992564315,                  // trial start 1 on the F' vertical
  A5: [55.585902635188276, 18.120251353232156],   // trial pole 2 (cyan)
  m4y: 31.846928080247494,                 // trial start 2 on the L4 vertical
  sFD: 0.5,                                // scaleForceDiagram [0.3, 1]
  sLS: 1.5,                                // loadSymbol [1, 2]
  sIF: 0.03,                               // pipe scale (applet 0..0.1, default on)
  o1: true,                                // show internal forces
  hideRF: false,                           // hide reaction forces in force diagram
  n4: true,                                // show points
  sh: false,                               // show handles (applet showHandles)
  o4: false,                               // show construction polygons (applet o_4)
  node: 0,                                 // node-equilibrium inspector (0 = off)
  _k: 99,
};

// every construction move happens on BOTH sides at once
const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'A semicircular masonry arch', d: 'left: an arch ring between intrados and extrados springs at an angle from the abutment line — drag the white handles for its radius and springing angle. The thrust line must stay inside the masonry for the arch to stand' },
  { t: 'Sixteen voussoirs', d: 'left: repeated angular bisection cuts the ring into 16 equal voussoirs, the joints on rays through the centre A; the crown joint D–E lies on the axis of symmetry' },
  { t: 'Weights and load line 1', d: 'left: every voussoir has the same weight w, acting on the vertical through its centroid — right: the 16 equal weights stacked tip-to-tail from the point a (drag it) form load line 1' },
  { t: 'Maximum thrust: three points', d: 'the flattest thrust line still inside the masonry presses through the crown intrados D and the springing extrados F′ and its mirror — left: the chord from F′ to the crown point (orange dashed); drag the crown handle along the joint D–E' },
  { t: 'Trial funicular 1', d: 'right: a trial pole o′₁ sends rays to load line 1 — left: from M₅ on the vertical through F′ a trial funicular hangs strip by strip to V₅ on the crown axis; M₅–V₅ is its closing string (orange)' },
  { t: 'Division point W₄ → pole o₁', d: 'right: through o′₁ parallel to the closing string to the division point W₄ on the load line; through W₄ parallel to the chord — the true pole o₁ lies where this line meets the horizontal through the middle of the load line (the crown horizontal)' },
  { t: 'Thrust line 1: up to the crown', d: 'left: from F′, each side parallel to its ray of o₁, bending on every centroid line, arrives exactly at the chosen crown point — right: the rays from o₁ to the upper half of load line 1' },
  { t: '…and down to the far springing', d: 'left: past the crown the sides mirror, landing exactly on the springing extrados — right: the rays of o₁ to the lower half of load line 1' },
  { t: 'Reactions of thrust line 1', d: 'right: the total weight W runs down load line 1; the reactions A₁ and B₁ close the triangle through the pole o₁ — left: the same two thrusts push on the springings' },
  { t: 'Minimum thrust: three points', d: 'the steepest thrust line touches the crown extrados E and the springing intrados U and L₄ — left: the chord L₄–E (cyan dashed); right: the same weights again as dashed load line 2 (drag its top). Drag the springing handle along the joint' },
  { t: 'Trial funicular 2', d: 'right: a trial pole o′₂ sends rays to load line 2 — left: from M₄ on the vertical through L₄ a trial funicular hangs across the inner strips to V₄ on the crown axis; closing string M₄–V₄ (cyan)' },
  { t: 'Division point Z₄ → pole o₂', d: 'right: through o′₂ parallel to the closing string to Z₄ on load line 2; through Z₄ parallel to the chord L₄–E — the pole o₂ lies on the same crown horizontal, much closer to the load line: less horizontal thrust' },
  { t: 'Thrust line 2: tangent at the crown', d: 'left: from L₄, sides parallel to the rays of o₂ across the strips between the springings — the crown side runs straight through E, tangent to the extrados — right: the rays of o₂ to the upper half of load line 2' },
  { t: '…and down to the springing intrados', d: 'left: the mirrored half lands exactly on the springing point — right: the remaining rays of o₂' },
  { t: 'Reactions of thrust line 2', d: 'right: the same total weight W on load line 2; the steeper reactions A₂ and B₂ meet at the pole o₂ — left: the two thrusts at L₄ and at the springing' },
  { t: 'Minimum and maximum thrust', d: 'the trial constructions retire (toggle "show construction polygons" to bring them back); both thrust lines are compression (blue). Every funicular inside the masonry is a possible equilibrium — the arch\'s horizontal thrust can only lie between H_min and H_max' },
];

const xline = (p, dir, x) => V.intersect(p, dir, [x, 0], [0, 1]) || p;

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const A = [AX, AY], rE = s.rE;
  const onE = (th) => [AX + rE * Math.cos(th), AY + rE * Math.sin(th)];
  const onI = (th) => [AX + RI * Math.cos(th), AY + RI * Math.sin(th)];
  const ths = [];
  for (let k = 0; k <= 8; k++) ths.push(s.th0 + (k * (Math.PI / 2 - s.th0)) / 8);

  const hAS = onE(s.th0), U = onI(s.th0);          // springing, right
  const E = [AX, AY + rE], D = [AX, AY + RI];      // crown extrados / intrados
  const Fp = [2 * AX - hAS[0], hAS[1]];            // F' (springing extrados, left)
  const Up = [2 * AX - U[0], U[1]];                // U' (springing intrados, left)
  const hFB = V.add(U, V.mul(V.sub(hAS, U), s.tBot));   // handleFunicularBottom
  const L4 = [2 * AX - hFB[0], hFB[1]];            // its mirror
  const hFT = [AX, D[1] + s.tTop * (E[1] - D[1])]; // handleFunicularTop on D-E

  // voussoir centroids (GeoGebra Centroid[Polygon]), right side crown->springing
  const cen = (poly) => {
    let a = 0, cx = 0, cy = 0;
    for (let i = 0; i < poly.length; i++) {
      const [x0, y0] = poly[i], [x1, y1] = poly[(i + 1) % poly.length];
      const w = x0 * y1 - x1 * y0;
      a += w; cx += (x0 + x1) * w; cy += (y0 + y1) * w;
    }
    a *= 0.5;
    return [cx / (6 * a), cy / (6 * a)];
  };
  const Rc = [];
  for (let k = 0; k < 8; k++) {
    const a1 = ths[8 - k], b1 = ths[7 - k];
    Rc.push(cen([onE(a1), onE(b1), onI(b1), onI(a1)]));
  }
  const linesX = [];
  for (let i = 0; i < 8; i++) linesX.push(2 * AX - Rc[7 - i][0]);
  for (let i = 0; i < 8; i++) linesX.push(Rc[i][0]);

  // the two load lines (equal drops wv * sFD)
  const P1 = [s.t2.slice()], P2 = [[s.x2, s.t2[1]]];
  for (let k = 0; k < N; k++) {
    P1.push([P1[k][0], P1[k][1] - WV * s.sFD]);
    P2.push([P2[k][0], P2[k][1] - WV * s.sFD]);
  }
  const yCr = P1[8][1];                            // the crown horizontal

  // ---- maximum thrust: trial 1 (orange), pole o1 = D5 ----
  const M5 = [Fp[0], s.m5y];
  const ch1 = [M5];
  for (let k = 0; k < 8; k++) ch1.push(xline(ch1[ch1.length - 1], V.sub(P1[k], s.L5), linesX[k]));
  ch1.push(xline(ch1[ch1.length - 1], V.sub(P1[8], s.L5), AX));
  const V5 = ch1[ch1.length - 1];
  const W4 = V.intersect(s.L5, V.sub(V5, M5), P1[0], [0, 1]) || P1[0];   // division
  const D5 = V.intersect(W4, V.sub(hFT, Fp), [AX, yCr], [1, 0]) || W4;   // pole o1

  // funicular 1: F' -> lines 0..7 -> crown point -> lines 8..15 -> hAS
  const f1 = [Fp];
  for (let k = 0; k < 8; k++) f1.push(xline(f1[f1.length - 1], V.sub(P1[k], D5), linesX[k]));
  f1.push(hFT);
  let cur = hFT;
  for (let k = 8; k < 16; k++) { cur = xline(cur, V.sub(P1[k], D5), linesX[k]); f1.push(cur); }
  f1.push(hAS);

  // ---- minimum thrust: trial 2 (cyan), pole o2 = B5 ----
  const i0 = linesX.filter((x) => x <= L4[0]).length;   // strips left of L4
  const M4 = [L4[0], s.m4y];
  const ch2 = [M4];
  for (let k = i0; k < 8; k++) ch2.push(xline(ch2[ch2.length - 1], V.sub(P2[k], s.A5), linesX[k]));
  ch2.push(xline(ch2[ch2.length - 1], V.sub(P2[8], s.A5), AX));
  const V4 = ch2[ch2.length - 1];
  const Z4 = V.intersect(s.A5, V.sub(V4, M4), P2[0], [0, 1]) || P2[0];   // division
  const B5 = V.intersect(Z4, V.sub(E, L4), [AX, yCr], [1, 0]) || Z4;     // pole o2

  // funicular 2 skips the strips outside its springing points; its crown
  // side is one straight segment THROUGH E (tangent to the extrados)
  const f2 = [L4];
  for (let k = i0; k < 16 - i0; k++) f2.push(xline(f2[f2.length - 1], V.sub(P2[k], B5), linesX[k]));
  f2.push(hFB);

  // reaction arrow tips (length loadSymbol, as the applet)
  const L7 = V.sub(Fp, V.mul(V.unit(V.sub(s.t2, D5)), s.sLS));           // A1 at F'
  const I7 = V.sub(hAS, V.mul(V.unit(V.sub(D5, P1[16])), s.sLS));        // B1 at hAS
  const K7 = V.sub(L4, V.mul(V.unit(V.sub(f2[1], L4)), s.sLS));          // A2 at L4
  const F1t = V.sub(hFB, V.mul(V.unit(V.sub(f2[f2.length - 2], hFB)), s.sLS));  // B2

  // forces (kN): thrust-line-1 segment k = |o1 - P1k| / sFD
  const N1 = P1.map((p) => V.dist(D5, p) / s.sFD);
  const Hmax = (s.t2[0] - D5[0]) / s.sFD;
  const Hmin = (s.x2 - B5[0]) / s.sFD;

  return { A, rE, ths, onE, onI, hAS, U, E, D, Fp, Up, hFB, L4, hFT, Rc, linesX,
           P1, P2, yCr, M5, ch1, V5, W4, D5, f1, i0, M4, ch2, V4, Z4, B5, f2,
           L7, I7, K7, F1t, N1, Hmax, Hmin, W: N * WV };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, t2: [...DEFAULTS.t2], L5: [...DEFAULTS.L5], A5: [...DEFAULTS.A5] };
  let d = compute(s);

  // an arch under gravity loads: the thrust lines are compression (the
  // applet paints both blue unconditionally)
  const COMP = { pending: PAL.black, final: () => PAL.blue };
  const W1 = 0.22, W1R = 0.09;             // thrust line 1 (applet th5 / th2)
  const W2 = 0.11, W2R = 0.05;             // thrust line 2 (applet th2 / th1)
  const W_ARC = 0.075, W_TRS = 0.09, W_TRR = 0.05;
  const ARROW = { w: 0.2, headLen: 0.7, headW: 0.3 };        // green th5
  const LOADARR = { w: 0.12, headLen: 0.5, headW: 0.22 };
  const trialW = (st) => st._k < RESOLVE || st.o4;           // applet o_4

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // ------------------------------------------------------------------
  // step 1: the arch (site) -- rings, analysed arcs, springing joints
  // ------------------------------------------------------------------
  dw.dashLine('semiI', { intro: 1, color: PAL.black, dash: 0.5 });
  dw.dashLine('semiE', { intro: 1, color: PAL.black, dash: 0.5 });
  dw.strokes('arcI', 48, { intro: 1, w: W_ARC, color: PAL.black });
  dw.strokes('arcE', 48, { intro: 1, w: W_ARC, color: PAL.black });
  dw.seg('jntR', { intro: 1, w: W_ARC, color: PAL.black });   // hAS-U
  dw.seg('jntL', { intro: 1, w: W_ARC, color: PAL.black });   // F'-U'
  dw.seg('springLine', { intro: 1, w: 0.06, color: PAL.grey });
  dw.dashLine('radAS', { intro: 1, color: PAL.black, dash: 0.5 });  // A-hAS
  dw.label('siteNote', 'Note: The thrust line has to be contained within the bounding geometry for the arch to be stable.',
           { intro: 1, flash: false, color: PAL.black });
  dw.instant('semiI', 'semiE', 'arcI', 'arcE', 'jntR', 'jntL', 'springLine',
             'radAS', 'siteNote');

  // step 2: the 15 remaining voussoir joints (crown + 7 a side)
  dw.seg('jntC', { intro: 2, w: W_ARC, color: PAL.black });   // D-E
  for (let k = 1; k <= 7; k++) {
    dw.seg(`jr${k}`, { intro: 2, w: W_ARC, color: PAL.black });
    dw.seg(`jl${k}`, { intro: 2, w: W_ARC, color: PAL.black });
  }

  // step 3: centroid verticals + weights (left) WITH load line 1 (right);
  // the applet marks every voussoir centroid with a small grey cross
  dw.strokes('cenMarks', 2 * N, { intro: 3, w: 0.035, color: 0x404040, flash: false });
  for (let i = 0; i < N; i++) {
    dw.dashLine(`cl${i}`, { intro: 3, dash: 0.5 });
    dw.arrow(`w${i}`, { intro: 3, ...LOADARR });
    dw.seg(`ll1_${i}`, { intro: 3, w: 0.1, color: PAL.black });
    dw.link(`w${i}`, `ll1_${i}`);
  }
  dw.label('lbl_a', 'a', { cls: 'point', intro: 3 });

  // the applet's "show handles": load-line division points + letters b..i
  const shOn = (st) => st.sh;
  const LETTERS1 = ['b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
  for (let k = 1; k <= 15; k++) {
    dw.disk(`pt_p1_${k}`, { intro: 3, r: 0.1, when: shOn });
    dw.disk(`pt_p2_${k}`, { intro: 10, r: 0.1, when: shOn });
  }
  for (let k = 0; k < 8; k++) {
    dw.label(`lbl_h${k}`, LETTERS1[k], { cls: 'point', intro: 3, when: shOn });
  }

  // step 4: the maximum-thrust prescription -- crown handle + chord (orange)
  dw.dashLine('chord1', { intro: 4, color: PAL.orange, dash: 0.45, when: trialW });

  // step 5: trial 1 -- pole o'1 + rays (right), trial funicular + closing (left)
  dw.dashLine('vertM5', { intro: 5, dash: 0.5, when: trialW });
  dw.dashLine('axisCr', { intro: 5, dash: 0.5, when: trialW });
  dw.strokes('tray1', 9, { intro: 5, w: W_TRR, color: PAL.grey, when: trialW });
  dw.strokes('tch1', 9, { intro: 5, w: W_TRS, color: PAL.grey, when: trialW });
  dw.dashLine('close1', { intro: 5, color: PAL.orange, dash: 0.45, when: trialW });
  dw.link('tch1', 'tray1', 'close1');

  // step 6: division point W4 -> pole o1 on the crown horizontal
  dw.dashLine('par1', { intro: 6, color: PAL.orange, dash: 0.45, when: trialW });
  dw.dashLine('par1b', { intro: 6, color: PAL.orange, dash: 0.45, when: trialW });
  dw.dashLine('crownH', { intro: 6, dash: 0.5 });
  dw.link('par1', 'par1b');

  // steps 7-8: thrust line 1 segment by segment WITH its ray of the fan
  // (seg j: j<=7 -> ray j; crown pair 8,9 -> ray 8; j>=10 -> ray j-1)
  for (let j = 0; j <= 17; j++) {
    dw.seg(`f1s${j}`, { intro: j <= 8 ? 7 : 8, w: W1, color: COMP });
  }
  for (let k = 0; k <= 16; k++) {
    dw.seg(`f1r${k}`, { intro: k <= 8 ? 7 : 8, w: k === 0 || k === 16 ? W1 : W1R, color: COMP });
  }
  for (let j = 0; j <= 7; j++) dw.link(`f1s${j}`, `f1r${j}`);
  dw.link('f1s8', 'f1s9', 'f1r8');
  for (let j = 10; j <= 17; j++) dw.link(`f1s${j}`, `f1r${j - 1}`);

  // step 9: reactions of thrust line 1 (green, both diagrams)
  const noRF = (st) => !st.hideRF;
  dw.arrow('tot1', { intro: 9, ...ARROW });
  dw.arrow('rB1f', { intro: 9, when: noRF, ...ARROW });
  dw.arrow('rA1f', { intro: 9, when: noRF, ...ARROW });
  dw.arrow('rA1', { intro: 9, ...ARROW });
  dw.arrow('rB1', { intro: 9, ...ARROW });
  dw.label('lbl_rA1f', 'A₁', { cls: 'num', intro: 9, when: noRF, color: PAL.green });
  dw.label('lbl_rB1f', 'B₁', { cls: 'num', intro: 9, when: noRF, color: PAL.green });
  dw.label('lbl_rA1', 'A₁', { cls: 'num', intro: 9, color: PAL.green });
  dw.label('lbl_rB1', 'B₁', { cls: 'num', intro: 9, color: PAL.green });
  dw.link('rA1', 'rA1f', 'lbl_rA1', 'lbl_rA1f');
  dw.link('rB1', 'rB1f', 'lbl_rB1', 'lbl_rB1f');

  // step 10: the minimum-thrust prescription + load line 2 (dashed)
  dw.dashLine('chord2', { intro: 10, color: CYAN, dash: 0.45, when: trialW });
  dw.dashLine('ll2', { intro: 10, color: PAL.black, dash: 0.35 });

  // step 11: trial 2 -- pole o'2 + rays, trial funicular + closing (cyan)
  dw.dashLine('vertM4', { intro: 11, dash: 0.5, when: trialW });
  dw.strokes('tray2', 9, { intro: 11, w: W_TRR, color: PAL.grey, when: trialW });
  dw.strokes('tch2', 9, { intro: 11, w: W_TRS, color: PAL.grey, when: trialW });
  dw.dashLine('close2', { intro: 11, color: CYAN, dash: 0.45, when: trialW });
  dw.link('tch2', 'tray2', 'close2');

  // step 12: division point Z4 -> pole o2
  dw.dashLine('par2', { intro: 12, color: CYAN, dash: 0.45, when: trialW });
  dw.dashLine('par2b', { intro: 12, color: CYAN, dash: 0.45, when: trialW });
  dw.link('par2', 'par2b');

  // steps 13-14: thrust line 2 (thin blue) + the fan of o2
  // (element layout follows the default i0 = 2: segs 0..6 left incl. the
  //  crown tangent through E, 7..16 right; seg j is parallel to ray j+2)
  for (let j = 0; j <= 16; j++) {
    dw.seg(`f2s${j}`, { intro: j <= 6 ? 13 : 14, w: W2, color: COMP });
  }
  for (let k = 0; k <= 16; k++) {
    dw.seg(`f2r${k}`, { intro: k <= 8 ? 13 : 14, w: k === 0 || k === 16 ? W2 : W2R, color: COMP });
  }
  for (let j = 0; j <= 12; j++) dw.link(`f2s${j}`, `f2r${j + 2}`);

  // step 15: reactions of thrust line 2
  dw.arrow('tot2', { intro: 15, ...ARROW });
  dw.arrow('rB2f', { intro: 15, when: noRF, ...ARROW });
  dw.arrow('rA2f', { intro: 15, when: noRF, ...ARROW });
  dw.arrow('rA2', { intro: 15, ...ARROW });
  dw.arrow('rB2', { intro: 15, ...ARROW });
  dw.label('lbl_rA2f', 'A₂', { cls: 'num', intro: 15, when: noRF, color: PAL.green });
  dw.label('lbl_rB2f', 'B₂', { cls: 'num', intro: 15, when: noRF, color: PAL.green });
  dw.label('lbl_rA2', 'A₂', { cls: 'num', intro: 15, color: PAL.green });
  dw.label('lbl_rB2', 'B₂', { cls: 'num', intro: 15, color: PAL.green });
  dw.link('rA2', 'rA2f', 'lbl_rA2', 'lbl_rA2f', 'f2r0');
  dw.link('rB2', 'rB2f', 'lbl_rB2', 'lbl_rB2f', 'f2r16');

  // points
  const HANDLE = { r: 0.24 }, DERIVED = { r: 0.18 }, VERT = { r: 0.12 };
  const show = (st) => st.n4;
  const showTrial = (st) => st.n4 && trialW(st);
  dw.disk('pt_A', { intro: 1, ...DERIVED, when: show });
  dw.disk('pt_hAR', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_hAS', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_T2', { intro: 3, ...HANDLE, when: show });
  dw.disk('pt_hFT', { intro: 4, ...HANDLE, when: show });
  dw.disk('pt_Fp', { intro: 4, ...DERIVED, when: show });
  dw.disk('pt_L5', { intro: 5, ...HANDLE, when: showTrial });
  dw.disk('pt_M5', { intro: 5, ...HANDLE, when: showTrial });
  dw.disk('pt_V5', { intro: 5, ...DERIVED, when: showTrial });
  dw.disk('pt_W4', { intro: 6, ...DERIVED, when: showTrial });
  dw.disk('pt_D5', { intro: 6, ...DERIVED, when: show });
  dw.disk('pt_E', { intro: 10, ...DERIVED, when: show });
  dw.disk('pt_hFB', { intro: 10, ...HANDLE, when: show });
  dw.disk('pt_L4', { intro: 10, ...DERIVED, when: show });
  dw.disk('pt_hFD2', { intro: 10, ...HANDLE, when: show });
  dw.disk('pt_A5', { intro: 11, ...HANDLE, when: showTrial });
  dw.disk('pt_M4', { intro: 11, ...HANDLE, when: showTrial });
  dw.disk('pt_V4', { intro: 11, ...DERIVED, when: showTrial });
  dw.disk('pt_Z4', { intro: 12, ...DERIVED, when: showTrial });
  dw.disk('pt_B5', { intro: 12, ...DERIVED, when: show });
  for (let k = 0; k < N; k++) {
    dw.disk(`pt_v${k}`, { intro: k < 8 ? 7 : 8, ...VERT, when: show });
  }

  const letters = {
    A: ['A', 1], Fp: ['F′', 4, PAL.black], L5: ['o′₁', 5, PAL.orange, trialW],
    M5: ['M₅', 5, PAL.orange, trialW], V5: ['V₅', 5, PAL.orange, trialW],
    W4: ['W₄', 6, PAL.orange, trialW], D5: ['o₁', 6, PAL.black],
    E: ['E', 10, PAL.black], L4: ['L₄', 10, PAL.black],
    A5: ['o′₂', 11, CYAN, trialW], M4: ['M₄', 11, CYAN, trialW],
    V4: ['V₄', 11, CYAN, trialW], Z4: ['Z₄', 12, CYAN, trialW],
    B5: ['o₂', 12, PAL.black],
  };
  for (const [p, [text, intro, color, when]] of Object.entries(letters)) {
    dw.label(`lbl_${p}`, text, { cls: 'point', intro, color, when: when || show });
  }

  // resolved force readouts
  for (const n of ['roW', 'roHmax', 'roHmin']) {
    dw.label(n, '', { intro: RESOLVE, flash: false, color: PAL.black });
  }

  // internal-force pipes along thrust line 1 (on by default)
  const pipeRay = (j) => (j <= 7 ? j : j <= 9 ? 8 : j - 1);
  for (let j = 0; j <= 17; j++) {
    dw.poly(`if${j}`, 4, {
      intro: RESOLVE, opacity: 1.0, z: -0.18, flash: false,
      color: { pending: PAL.grey, final: () => PAL.blue },
      when: (st) => st.o1,
    });
  }

  dw.ghostable(...[...Array(N)].map((_, i) => `ll1_${i}`),
               ...[...Array(17)].map((_, k) => `f1r${k}`),
               ...[...Array(17)].map((_, k) => `f2r${k}`),
               'tot1', 'tot2', 'rA1f', 'rB1f', 'rA2f', 'rB2f');

  // node-equilibrium inspector on thrust line 1: free-body star at the node
  // + the same forces tip-to-tail on the node's closed sub-polygon (the
  // load-line edge and the two adjacent rays of o1); the springings
  // degenerate to thrust + reaction
  dw.nodeInspector(3, { when: (st) => st.node > 0, w: 1.5 * W1, headLen: 0.7, headW: 0.28, r: 0.28 });
  const NODE_DISKS = ['pt_Fp', ...[...Array(N)].map((_, k) => `pt_v${k}`), 'pt_hAS'];
  const NODE_NAMES = ['A', ...[...Array(N)].map((_, k) => `${k + 1}`), 'B'];
  const vtx = (k) => (k < 8 ? d.f1[k + 1] : d.f1[k + 2]);   // vertex on line k
  const nodeAt = NODE_DISKS.map((_, j) => () =>
    (j === 0 ? d.Fp : j === N + 1 ? d.hAS : vtx(j - 1)));
  const nodePoly = (j) => {
    if (j === 0) return [[d.P1[0], d.D5], [d.D5, d.P1[0]]];
    if (j === N + 1) return [[d.D5, d.P1[16]], [d.P1[16], d.D5]];
    const k = j - 1;
    return [[d.P1[k], d.P1[k + 1]], [d.P1[k + 1], d.D5], [d.D5, d.P1[k]]];
  };

  function updateNode() {
    const j = Math.max(0, Math.min(NODE_DISKS.length - 1, Math.round(s.node) - 1));
    dw.selectDisk(s.node > 0 ? NODE_DISKS[j] : null);
    dw.setNodeInspector([10.6, 29.4], 2.2, `node ${NODE_NAMES[j]}`, nodePoly(j));
  }

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  const arcPts = (r, a0, a1, n) => {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const a = a0 + ((a1 - a0) * i) / n;
      pts.push([AX + r * Math.cos(a), AY + r * Math.sin(a)]);
    }
    return pts;
  };
  const pairsOf = (pts) => pts.slice(0, -1).map((p, i) => [p, pts[i + 1]]);

  function update() {
    dw.setLabel('form_title', [9.4, 25.9]);
    dw.setLabel('force_title', [34.2, 25.9]);
    dw.setLabel('force_sub', [34.2, 24.95]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(2)} kN`);
    dw.setLabel('siteNote', [21, 7.3]);

    // site: rings, analysed arcs, springing joints
    dw.setDashLine('semiI', arcPts(RI, 0, Math.PI, 72));
    dw.setDashLine('semiE', arcPts(d.rE, 0, Math.PI, 72));
    dw.setStrokes('arcI', pairsOf(arcPts(RI, s.th0, Math.PI - s.th0, 48)));
    dw.setStrokes('arcE', pairsOf(arcPts(d.rE, s.th0, Math.PI - s.th0, 48)));
    dw.setSeg('jntR', d.U, d.hAS);
    dw.setSeg('jntL', d.Up, d.Fp);
    dw.setSeg('springLine', [SPRING[0], AY], [SPRING[1], AY]);
    dw.setDashLine('radAS', [d.A, d.hAS]);

    // joints
    dw.setSeg('jntC', d.D, d.E);
    for (let k = 1; k <= 7; k++) {
      const pI = d.onI(d.ths[k]), pE = d.onE(d.ths[k]);
      dw.setSeg(`jr${k}`, pI, pE);
      dw.setSeg(`jl${k}`, [2 * AX - pI[0], pI[1]], [2 * AX - pE[0], pE[1]]);
    }

    // centroid crosses + centroid lines + weights + load line 1
    const marks = [];
    const CR = 0.13;
    for (let k = 0; k < 8; k++) {
      for (const c of [d.Rc[k], [2 * AX - d.Rc[k][0], d.Rc[k][1]]]) {
        marks.push([[c[0] - CR, c[1] - CR], [c[0] + CR, c[1] + CR]]);
        marks.push([[c[0] - CR, c[1] + CR], [c[0] + CR, c[1] - CR]]);
      }
    }
    dw.setStrokes('cenMarks', marks);
    for (let k = 1; k <= 15; k++) {
      dw.setDisk(`pt_p1_${k}`, d.P1[k]);
      dw.setDisk(`pt_p2_${k}`, d.P2[k]);
    }
    for (let k = 0; k < 8; k++) dw.setLabel(`lbl_h${k}`, V.add(d.P1[k + 1], [0.55, 0.35]));
    for (let i = 0; i < N; i++) {
      dw.setDashLine(`cl${i}`, [[d.linesX[i], Y_CL_B], [d.linesX[i], Y_CL_T]]);
      dw.setArrow(`w${i}`, [d.linesX[i], Y_WTIP + s.sLS], [d.linesX[i], Y_WTIP]);
      dw.setSeg(`ll1_${i}`, d.P1[i], d.P1[i + 1]);
    }
    dw.setLabel('lbl_a', V.add(d.P1[0], [0.55, 0.4]));

    // maximum thrust: chord, trial 1, pole o1
    dw.setDashLine('chord1', [d.Fp, d.hFT]);
    dw.setDashLine('vertM5', [[d.Fp[0], 10.2], [d.Fp[0], s.m5y + 0.9]]);
    const axTop = Math.max(d.V5[1], d.V4[1], 27) + 0.8;
    dw.setDashLine('axisCr', [[AX, AY], [AX, axTop]]);
    dw.setStrokes('tray1', [...Array(9)].map((_, k) => [s.L5, d.P1[k]]));
    dw.setStrokes('tch1', pairsOf(d.ch1));
    dw.setDashLine('close1', [d.M5, d.V5]);
    const ext = (a, b, e = 0.7) => V.add(b, V.mul(V.unit(V.sub(b, a)), e));
    dw.setDashLine('par1', [s.L5, ext(s.L5, d.W4)]);
    dw.setDashLine('par1b', [d.W4, ext(d.W4, d.D5)]);
    dw.setDashLine('crownH', [[d.D5[0] - 1.5, d.yCr], [s.x2 + 1.5, d.yCr]]);

    // thrust line 1 + fan of o1
    for (let j = 0; j <= 17; j++) dw.setSeg(`f1s${j}`, d.f1[j], d.f1[j + 1]);
    for (let k = 0; k <= 16; k++) dw.setSeg(`f1r${k}`, d.D5, d.P1[k]);

    // reactions 1
    dw.setArrow('tot1', d.P1[0], d.P1[16]);
    dw.setArrow('rB1f', d.P1[16], d.D5);
    dw.setArrow('rA1f', d.D5, d.P1[0]);
    dw.setArrow('rA1', d.L7, d.Fp);
    dw.setArrow('rB1', d.I7, d.hAS);
    const lblAt = (a, b, off = 0.55) => {
      const u = V.unit(V.sub(b, a));
      return V.add(V.mid(a, b), V.mul(V.perp(u), off));
    };
    dw.setLabel('lbl_rA1f', lblAt(d.D5, d.P1[0], 0.6));
    dw.setLabel('lbl_rB1f', lblAt(d.P1[16], d.D5, 0.6));
    dw.setLabel('lbl_rA1', V.add(d.L7, [-0.35, -0.55]));
    dw.setLabel('lbl_rB1', V.add(d.I7, [0.45, -0.55]));

    // minimum thrust: chord, load line 2, trial 2, pole o2
    dw.setDashLine('chord2', [d.L4, d.E]);
    dw.setDashLine('ll2', [d.P2[0], d.P2[16]]);
    dw.setDashLine('vertM4', [[d.L4[0], 10.2], [d.L4[0], s.m4y + 0.9]]);
    dw.setStrokes('tray2', [...Array(9)].map((_, k) => [s.A5, d.P2[k]]));
    const ch2p = pairsOf(d.ch2);
    dw.setStrokes('tch2', [...Array(9)].map((_, i) => ch2p[i] || [d.V4, d.V4]));
    dw.setDashLine('close2', [d.M4, d.V4]);
    dw.setDashLine('par2', [s.A5, ext(s.A5, d.Z4)]);
    dw.setDashLine('par2b', [d.Z4, ext(d.Z4, d.B5)]);

    // thrust line 2 + fan of o2
    for (let j = 0; j <= 16; j++) {
      const a = d.f2[j], b = d.f2[j + 1];
      dw.setSeg(`f2s${j}`, a || d.hFB, b || d.hFB);
    }
    for (let k = 0; k <= 16; k++) dw.setSeg(`f2r${k}`, d.B5, d.P2[k]);

    // reactions 2
    dw.setArrow('tot2', d.P2[0], d.P2[16]);
    dw.setArrow('rB2f', d.P2[16], d.B5);
    dw.setArrow('rA2f', d.B5, d.P2[0]);
    dw.setArrow('rA2', d.K7, d.L4);
    dw.setArrow('rB2', d.F1t, d.hFB);
    dw.setLabel('lbl_rA2f', lblAt(d.B5, d.P2[0], 0.6));
    dw.setLabel('lbl_rB2f', lblAt(d.P2[16], d.B5, 0.6));
    dw.setLabel('lbl_rA2', V.add(d.K7, [-0.4, -0.5]));
    dw.setLabel('lbl_rB2', V.add(d.F1t, [0.5, -0.45]));

    // pipes along thrust line 1
    for (let j = 0; j <= 17; j++) {
      dw.setPoly(`if${j}`, V.rectPoints(d.f1[j], d.f1[j + 1], s.sIF * d.N1[pipeRay(j)]));
    }

    // points + letters
    dw.setDisk('pt_A', d.A);
    dw.setDisk('pt_hAR', [AX + d.rE, AY]);
    dw.setDisk('pt_hAS', d.hAS);
    dw.setDisk('pt_T2', d.P1[0]);
    dw.setDisk('pt_hFT', d.hFT);
    dw.setDisk('pt_Fp', d.Fp);
    dw.setDisk('pt_L5', s.L5);
    dw.setDisk('pt_M5', d.M5);
    dw.setDisk('pt_V5', d.V5);
    dw.setDisk('pt_W4', d.W4);
    dw.setDisk('pt_D5', d.D5);
    dw.setDisk('pt_E', d.E);
    dw.setDisk('pt_hFB', d.hFB);
    dw.setDisk('pt_L4', d.L4);
    dw.setDisk('pt_hFD2', d.P2[0]);
    dw.setDisk('pt_A5', s.A5);
    dw.setDisk('pt_M4', d.M4);
    dw.setDisk('pt_V4', d.V4);
    dw.setDisk('pt_Z4', d.Z4);
    dw.setDisk('pt_B5', d.B5);
    for (let k = 0; k < N; k++) dw.setDisk(`pt_v${k}`, vtx(k));

    const pos = {
      A: V.add(d.A, [0, -0.75]), Fp: V.add(d.Fp, [-0.75, -0.55]),
      L5: V.add(s.L5, [0.85, 0.4]), M5: V.add(d.M5, [-0.8, 0.35]),
      V5: V.add(d.V5, [0.8, 0.3]), W4: V.add(d.W4, [0.9, 0.3]),
      D5: V.add(d.D5, [-0.8, 0.45]), E: V.add(d.E, [-0.7, 0.5]),
      L4: V.add(d.L4, [-0.8, -0.5]), A5: V.add(s.A5, [0.9, 0.4]),
      M4: V.add(d.M4, [-0.8, 0.35]), V4: V.add(d.V4, [0.85, 0.3]),
      Z4: V.add(d.Z4, [0.9, 0.3]), B5: V.add(d.B5, [-0.75, 0.55]),
    };
    for (const p of Object.keys(letters)) dw.setLabel(`lbl_${p}`, pos[p]);

    const ro = [['roW', `W = ${d.W.toFixed(1)} kN`],
                ['roHmax', `H_max = ${d.Hmax.toFixed(2)} kN`],
                ['roHmin', `H_min = ${d.Hmin.toFixed(2)} kN`]];
    ro.forEach(([n, t], i) => {
      dw.setLabel(n, [49.5, 13.4 - 1.15 * i]);
      dw.setText(n, t);
    });
  }

  function refresh() {
    d = compute(s);
    s._k = player.k;
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
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 0.3, 1, 0.05, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 1, 2, 0.1, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.1, 0.005, refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  panel.toggle(par, s, 'sh', 'show handles', refresh);
  panel.toggle(par, s, 'hideRF', 'hide reaction forces in force diagram', refresh);
  panel.toggle(par, s, 'o4', 'show construction polygons', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off): 1 = left springing, 2–17 = thrust-line-1 nodes, 18 = right springing',
               0, N + 2, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS, t2: [...DEFAULTS.t2], L5: [...DEFAULTS.L5], A5: [...DEFAULTS.A5] });
    panel.syncAll();
    refresh();
  });

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const hits = [
    ['hAR', () => [AX + s.rE, AY], 1, 99],
    ['hAS', () => d.hAS, 1, 99],
    ['T2', () => d.P1[0], 3, 99],
    ['hFT', () => d.hFT, 4, 99],
    ['L5', () => s.L5, 5, 99],
    ['M5', () => d.M5, 5, 99],
    ['hFB', () => d.hFB, 10, 99],
    ['hFD2', () => d.P2[0], 10, 99],
    ['A5', () => s.A5, 11, 99],
    ['M4', () => d.M4, 11, 99],
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
      if (name === 'hAR') s.rE = clamp(wx - AX, 8.179, 11.309);
      else if (name === 'hAS') s.th0 = clamp(Math.atan2(wy - AY, wx - AX), 0.02, 0.61);
      else if (name === 'T2') s.t2 = [clamp(wx, 34, s.x2 - 1.5), clamp(wy, 18, 26)];
      else if (name === 'hFT') s.tTop = clamp((wy - d.D[1]) / (d.E[1] - d.D[1]), 0, 1);
      else if (name === 'L5') s.L5 = [clamp(wx, 40, 56.5), clamp(wy, 12, 31.5)];
      else if (name === 'M5') s.m5y = clamp(wy, AY + 1, 32);
      else if (name === 'hFB') {
        const u = V.sub(d.hAS, d.U);
        s.tBot = clamp(V.dot(V.sub([wx, wy], d.U), u) / V.dot(u, u), 0, 1);
      } else if (name === 'hFD2') s.x2 = clamp(wx, s.t2[0] + 1.5, 55.5);
      else if (name === 'A5') s.A5 = [clamp(wx, 40, 56.5), clamp(wy, 12, 31.5)];
      else if (name === 'M4') s.m4y = clamp(wy, AY + 1, 32.1);
      refresh();
    },
  );

  // click a node point of thrust line 1 to inspect it (clicking again
  // deselects); the panel slider stays in sync
  dw.nodeSelect(nodeAt.map((at) => ({ at })), (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
