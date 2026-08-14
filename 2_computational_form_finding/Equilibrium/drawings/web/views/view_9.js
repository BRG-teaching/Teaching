/**
 * Drawing view/9 "Parabola Construction"
 * (https://block.arch.ethz.ch/eq/drawing/view/9) as a step-by-step
 * construction. A parabola through the supports A, B and the apex C:
 *
 *   - the tangents at the supports meet on the centreline 2h below the
 *     closing string (mirror the chord's midspan point about C);
 *   - graphic statics (the applet's mode 2): the pole o of the uniform load's
 *     load line is found from the two tangent directions; the midpoint rule
 *     (parabola point = midway between secant and tangent on a vertical)
 *     refines the funicular polygon: half -> quarters -> eighths;
 *   - tangent method (the applet's mode 1): divide both tangents into eight
 *     equal parts and connect corresponding points - every line is a tangent
 *     of the parabola and their intersections give the enclosing polygon.
 *
 * Live port of view_9/applet_0/geogebra.xml; the whole chain (pole, midpoint
 * points, envelope, offset rulers) is regression-checked against the baked
 * coordinates to ~1e-6 (notes/view_9_analysis.md).
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 9 — Parabola Construction',
  subtitle: 'the funicular of a uniform load, three ways to draw it',
  about: 'A uniformly loaded cable hangs as a parabola — and this drawing builds that parabola three different ways through the same two supports A, B and apex C. First the MIDPOINT RULE: on any vertical the curve lies exactly midway between a secant and a tangent, so halving repeatedly gives the apex (h below the closing string, where the support tangents meet 2h below), then the quarter points, then the eighths. Second the FUNICULAR: parallels to the support tangents through the ends of the load line fix the pole o, and the rays hang a polygon through every one of those points. Third the TANGENT METHOD: divide the two support tangents into eight equal parts and join the k-th mark of one to the k-th of the other — every line touches the curve, which appears as the envelope of its own tangents.',
  frame: [[1.6221, -4.797], [49.0335, 18.9088]],
};

const XA = 6, XB = 22, XC = 14;         // the three verticals
const Y_TOP = 14;                       // top edge of the load strip
const VERT = [17.1342, -4];             // vertical guides extent
const GUIDE_X = [4, 27.2312];           // horizontal guides extent
const O2Y = 12.561464648639733;         // node-resultant row (applet O_2)
const QZY = -1.8456127376472864;        // 'z' annotation row (applet Q)
const N11X = 20.813477661928086;        // 'y' annotation column (applet N_11)
const RESOLVE = 15;

const DEFAULTS = {
  ay: 6.385076843652982,                // A on the left wall
  by: 10.105044545497387,               // B on the right wall
  cy: 3.8191200547889235,               // C (apex) on the centreline
  qx: 35.4316916417497, qy: 14.777232728911315,   // load-line top 'a'
  F1: 30,                               // total load [10, 30] kN
  sFD: 0.5,                             // scaleForceDiagram [0.2, 0.6] units/kN
  sLS: 1.3,                             // loadSymbol [1, 5]
  off: 1.3,                             // Offset (tangent rulers) [1, 10]
  sIF: 0.05,
  o1: true,
  n4: true,
  hideRF: false,
  node: 0,                              // node-equilibrium inspector (0 = off)
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'Three points define the parabola', d: 'left: supports A and B on the walls, apex C on the centreline — span l, half-span l/2 (drag A, B, C)' },
  { t: 'The uniform load q — its resultant R', d: 'left: the distributed load q with its total resultant R at midspan — right: the same total load R laid off as the load line' },
  { t: 'Closing string and rise h', d: 'left: the closing string A–B crosses the centreline; the apex C hangs the rise h below it' },
  { t: 'Mirror: 2h below the closing string', d: 'left: mirroring that crossing about C gives the point 2h below the closing string — the tangents at the supports will meet there' },
  { t: 'Tangents at the supports → the pole o', d: 'left: tangents A and B through the mirror point — right: parallels to them through the ends of the load line intersect at the pole o' },
  { t: 'Reactions A and B', d: 'right: the outer rays are the two reactions — left: the same pulls at the supports, along the tangents' },
  { t: 'Secants to the apex — tangent at C', d: 'left: secants A–C and C–B, and the tangent at C parallel to the closing string — right: the mid ray o–F₃ is parallel to both and halves the load line' },
  { t: 'The midpoint rule', d: 'left: THE rule that draws a parabola — on any vertical, the curve lies exactly MIDWAY between a secant and a tangent. Take the quarter verticals: the secant A–C and the tangent at A cut them; halve the black segment between the two marked points (y = y) and you have a parabola point — right: the load line splits into the node loads R',
    take: 'the same halving that put C at h below the closing string, applied again — the construction is self-similar' },
  { t: 'A first funicular: quarters', d: 'right: rays from o to the quarter cuts — left: the strings A–C and C–B refine into four strings, each parallel to its ray' },
  { t: 'The rule again — eighth points', d: 'left: halve once more: secant and tangent on each eighth vertical, midway between them the curve — four more parabola points, nine in all — right: the load line splits into eight node loads R' },
  { t: 'The funicular polygon', d: 'right: rays from o to every cut — left: the funicular polygon 1…8 through all nine points, each member parallel to its ray' },
  { t: 'A third way: the tangent method', d: 'left: forget the verticals — mark the two support tangents A–T and T–B in eight EQUAL parts each, numbered towards the meeting point and away from it' },
  { t: 'Join 1 to 1, 2 to 2, …', d: 'left: join the k-th mark of one tangent to the k-th of the other: EVERY one of those lines touches the parabola — the curve appears as the envelope of its own tangents, without computing a single point',
    take: 'three constructions, one curve: halving verticals, hanging a funicular, or enveloping tangents' },
  { t: 'The enclosing polygon', d: 'left: consecutive tangent intersections trace the enclosing polygon of the same parabola (the funicular polygon touches it from inside)' },
  { t: 'Tension', d: 'the construction retires — the funicular of the uniform load is the parabola through A, C and B, all members pink = tension',
    detail: (d) => [`A = ${d.NA.toFixed(1)} · B = ${d.NB.toFixed(1)} kN — segment forces N₁ = ${d.Ns[0].toFixed(1)} … N₈ = ${d.Ns[7].toFixed(1)} kN`],
    take: 'a uniform load hangs as a PARABOLA — the support tangents meet on the centreline exactly 2h below the closing string' },
];

const cache = {};
function inter(key, p1, d1, p2, d2) {
  cache[key] = V.intersect(p1, d1, p2, d2) || cache[key] || p1;
  return cache[key];
}

/** Point of the line through p along d at the vertical x. */
function onv(p, d, x) {
  return [x, p[1] + d[1] * ((x - p[0]) / (Math.abs(d[0]) < 1e-9 ? 1e-9 : d[0]))];
}

/** The applet's X-shaped dimension tick: two crossing strokes at each point. */
function xTicks(pts, t = 0.16) {
  const out = [];
  for (const p of pts) {
    out.push([[p[0] - t, p[1] - t], [p[0] + t, p[1] + t]]);
    out.push([[p[0] - t, p[1] + t], [p[0] + t, p[1] - t]]);
  }
  return out;
}

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const A = [XA, s.ay], B = [XB, s.by], C = [XC, s.cy];
  const G1 = [XC, (s.ay + s.by) / 2];                 // chord ∩ centreline (ap2)
  const I1 = [XC, 2 * s.cy - (s.ay + s.by) / 2];      // mirror about C (ap3)
  const uA = V.unit(V.sub(I1, A));                    // tangent at A
  const uB = V.unit(V.sub(B, I1));                    // tangent at B
  const uCh = V.unit(V.sub(B, A));                    // closing string

  // load line: total R, quarter cuts, eighth cuts, midpoint F3
  const Q2 = [s.qx, s.qy];
  const R = s.F1 * s.sFD;
  const D3 = [s.qx, s.qy - R];
  const cut8 = [], cut4 = [];
  for (let k = 1; k <= 8; k++) cut8.push([s.qx, s.qy - (R * (2 * k - 1)) / 16]);
  for (let k = 1; k <= 4; k++) cut4.push([s.qx, s.qy - (R * (2 * k - 1)) / 8]);
  const F3 = [s.qx, s.qy - R / 2];
  const E3 = inter('E3', Q2, uA, D3, uB);             // the pole o

  // midpoint rule: quarters ...
  const E1 = onv(A, V.sub(C, A), 10), M1 = onv(A, uA, 10), Q1 = V.mid(E1, M1);
  const P1 = onv(C, V.sub(B, C), 18), O1 = onv(I1, uB, 18), R1 = V.mid(P1, O1);
  // ... and eighths
  const S1 = onv(A, V.sub(Q1, A), 8), T1 = onv(A, uA, 8), U1 = V.mid(S1, T1);
  const V1 = onv(Q1, V.sub(C, Q1), 12), W1 = onv(C, uCh, 12), Z1 = V.mid(V1, W1);
  const A2 = onv(C, V.sub(R1, C), 16), B2 = onv(C, uCh, 16), C2 = V.mid(A2, B2);
  const D2 = onv(R1, V.sub(B, R1), 20), E2 = onv(I1, uB, 20), F2 = V.mid(D2, E2);
  const fun = [A, U1, Q1, Z1, C, C2, R1, F2, B];

  // tangent eighth-division points (x = 6..14 on tA, 14..22 on tB)
  const tAp = [], tBp = [];
  for (let k = 0; k <= 8; k++) {
    tAp.push(onv(A, uA, XA + k));
    tBp.push(onv(I1, uB, XC + k));
  }
  // envelope: k-th of tA to k-th of tB (each a tangent of the parabola)
  const env = [];
  for (let k = 1; k <= 7; k++) env.push([tAp[k], tBp[k]]);
  const b5 = [A, tAp[1]];
  for (let k = 1; k < 7; k++) {
    b5.push(inter(`b5_${k}`, env[k - 1][0], V.sub(env[k - 1][1], env[k - 1][0]),
                  env[k][0], V.sub(env[k][1], env[k][0])));
  }
  b5.push(tBp[7], B);

  // orange tangent rulers (mode 1), offset away from the curve
  const dA = V.mul(V.perp(uA), -1);
  const dB = V.mul(V.perp(uB), -1);
  const orgA = [V.add(A, V.mul(dA, s.off)), V.add(I1, V.mul(dA, s.off))];
  const orgB = [V.add(I1, V.mul(dB, s.off)), V.add(B, V.mul(dB, s.off))];
  const divA = [], divB = [], ftA = [], ftB = [];
  for (let k = 1; k <= 7; k++) {
    divA.push(V.add(tAp[k], V.mul(dA, s.off)));
    divB.push(V.add(tBp[k], V.mul(dB, s.off)));
    ftA.push(V.add(tAp[k], V.mul(dA, 1.5 * s.off)));
    ftB.push(V.add(tBp[k], V.mul(dB, 1.5 * s.off)));
  }
  const endT = [
    [A, V.add(A, V.mul(dA, 1.5 * s.off))],
    [I1, V.add(I1, V.mul(dA, 1.5 * s.off))],
    [I1, V.add(I1, V.mul(dB, 1.5 * s.off))],
    [B, V.add(B, V.mul(dB, 1.5 * s.off))],
  ];

  // forces + colors (all tension for a hanging cable — derived, not assumed)
  const Ns = cut8.map((c) => V.dist(E3, c) / s.sFD);
  const col = (w) => (V.isCompression(w) ? PAL.blue : PAL.red);
  const cks = [];
  for (let i = 0; i < 8; i++) {
    cks.push(col(V.ggbAngle(V.sub(fun[i + 1], fun[i]), V.sub(E3, cut8[i]))));
  }
  const NA = V.dist(E3, Q2) / s.sFD, NB = V.dist(E3, D3) / s.sFD;
  const fcent = V.mul(V.add(V.add(Q2, D3), E3), 1 / 3);

  return { A, B, C, G1, I1, uA, uB, uCh, Q2, R, D3, cut8, cut4, F3, E3,
           E1, M1, Q1, P1, O1, R1, S1, T1, U1, V1, W1, Z1, A2, B2, C2, D2, E2, F2,
           fun, tAp, tBp, env, b5, dA, dB, orgA, orgB, divA, divB, ftA, ftB, endT,
           Ns, NA, NB, cks, fcent };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);

  const memberColor = (i) => ({ pending: PAL.black, final: (dd) => dd.cks[i] });
  const W_BAR = 0.15, W_RAY = 0.07, W_STR = 0.11, W_DIM = 0.05;
  const ARROW = { w: 0.18, headLen: 0.62, headW: 0.24 };     // big green vectors
  const NARROW = { w: 0.13, headLen: 0.42, headW: 0.18 };    // node loads / pieces

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // ------------------------------------------------------------------
  // step 1: site — walls, centreline, span dimensions, the three points
  // ------------------------------------------------------------------
  dw.dashLine('wallA', { intro: 1, dash: 0.4 });
  dw.dashLine('wallB', { intro: 1, dash: 0.4 });
  dw.dashLine('centre', { intro: 1, dash: 0.4 });
  dw.seg('dimL', { intro: 1, w: W_DIM, color: PAL.grey, flash: false });
  dw.seg('dimL2a', { intro: 1, outro: 8, w: W_DIM, color: PAL.grey, flash: false });
  dw.seg('dimL2b', { intro: 1, outro: 8, w: W_DIM, color: PAL.grey, flash: false });
  dw.seg('dimL2a2', { intro: RESOLVE, w: W_DIM, color: PAL.grey, flash: false });
  dw.seg('dimL2b2', { intro: RESOLVE, w: W_DIM, color: PAL.grey, flash: false });
  dw.label('lbl_l', 'l', { intro: 1, flash: false, color: PAL.grey });
  dw.label('lbl_l2a', 'l/2', { intro: 1, outro: 8, flash: false, color: PAL.grey });
  dw.label('lbl_l2b', 'l/2', { intro: 1, outro: 8, flash: false, color: PAL.grey });
  dw.label('lbl_l2a2', 'l/2', { intro: RESOLVE, flash: false, color: PAL.grey });
  dw.label('lbl_l2b2', 'l/2', { intro: RESOLVE, flash: false, color: PAL.grey });
  // the applet marks every dimension division with a small X tick
  dw.strokes('tickL', 4, { intro: 1, w: W_DIM, color: PAL.grey, flash: false });
  dw.strokes('tickL2', 6, { intro: 1, outro: 8, w: W_DIM, color: PAL.grey, flash: false });
  dw.strokes('tickL2r', 6, { intro: RESOLVE, w: W_DIM, color: PAL.grey, flash: false });
  dw.instant('wallA', 'wallB', 'centre', 'dimL', 'dimL2a', 'dimL2b', 'dimL2a2', 'dimL2b2',
             'tickL', 'tickL2', 'tickL2r');

  // ------------------------------------------------------------------
  // step 2: the load q (left) + the load line R (right)
  // ------------------------------------------------------------------
  dw.poly('qfill', 4, { intro: 2, color: PAL.green, opacity: 0.13, flash: false });
  dw.strokes('qedge', 4, { intro: 2, w: 0.07, color: PAL.green });
  dw.label('lbl_q', 'q', { intro: 2, color: PAL.green });
  dw.arrow('midR', { intro: 2, ...NARROW });                 // resultant at midspan
  dw.label('lblR_mid', 'R', { cls: 'point', intro: 2, color: PAL.green });
  dw.dashLine('lline', { intro: 2, dash: 0.4 });             // load-line guide
  dw.arrow('totR', { intro: 2, outro: 8, ...ARROW });        // the total load
  dw.label('lblR_tot', 'R', { cls: 'num', intro: 2, outro: 8, color: PAL.green });

  // ------------------------------------------------------------------
  // steps 3-4: closing string, rise h, mirror point 2h
  // ------------------------------------------------------------------
  dw.dashLine('chord', { intro: 3, color: PAL.grey, dash: 0.5 });   // applet: grey 0.6 dashed
  dw.dashLine('gG', { intro: 3, dash: 0.4 });                // level of the crossing
  dw.dashLine('gC', { intro: 3, dash: 0.4 });                // level of C
  dw.seg('dimH', { intro: 3, w: W_DIM, color: PAL.grey, flash: false });
  dw.label('lbl_h', 'h', { intro: 3, flash: false, color: PAL.grey });
  dw.strokes('tickH', 4, { intro: 3, w: W_DIM, color: PAL.grey, flash: false });
  dw.seg('dimH2', { intro: 4, outro: 7, w: W_DIM, color: PAL.grey, flash: false });
  dw.label('lbl_h2', '2h', { intro: 4, outro: 7, flash: false, color: PAL.grey });
  dw.strokes('tickH2', 4, { intro: 4, outro: 7, w: W_DIM, color: PAL.grey, flash: false });

  // ------------------------------------------------------------------
  // steps 5-6: tangents -> pole o; reactions
  // ------------------------------------------------------------------
  dw.dashLine('tanA', { intro: 5, outro: RESOLVE, dash: 0.4 });
  dw.dashLine('tanB', { intro: 5, outro: RESOLVE, dash: 0.4 });
  dw.seg('rayA', { intro: 5, w: W_STR, color: PAL.black });  // Q2 - o
  dw.seg('rayB', { intro: 5, w: W_STR, color: PAL.black });  // D3 - o
  dw.label('lbl_o', 'o', { cls: 'point', intro: 5 });
  const rf = (st) => !st.hideRF;
  dw.arrow('reacFA', { intro: 6, ...ARROW, when: rf });      // o -> Q2 'A'
  dw.arrow('reacFB', { intro: 6, ...ARROW, when: rf });      // D3 -> o 'B'
  dw.arrow('reacA', { intro: 6, ...ARROW });
  dw.arrow('reacB', { intro: 6, ...ARROW });
  dw.label('lblRA_form', 'A', { cls: 'num', intro: 6, color: PAL.green });
  dw.label('lblRB_form', 'B', { cls: 'num', intro: 6, color: PAL.green });
  dw.label('lblRA_force', 'A', { cls: 'num', intro: 6, color: PAL.green, when: rf });
  dw.label('lblRB_force', 'B', { cls: 'num', intro: 6, color: PAL.green, when: rf });

  // ------------------------------------------------------------------
  // step 7: secants + tangent at C (left), mid ray o-F3 (right)
  // ------------------------------------------------------------------
  dw.dashLine('secAC', { intro: 7, outro: 12, dash: 0.4 });
  dw.dashLine('secCB', { intro: 7, outro: 12, dash: 0.4 });
  dw.dashLine('tanC', { intro: 7, outro: 12, dash: 0.4 });
  dw.dashLine('midRay', { intro: 7, dash: 0.4 });
  dw.label('lbl_F3', 'F₃', { cls: 'point', intro: 7 });

  // ------------------------------------------------------------------
  // step 8: quarter points (midpoint rule) + quartered load line
  // ------------------------------------------------------------------
  dw.dashLine('vx10', { intro: 8, outro: 12, dash: 0.3 });
  dw.dashLine('vx18', { intro: 8, outro: 12, dash: 0.3 });
  // the midpoint rule itself: on a vertical, the parabola lies MIDWAY between
  // the secant and the tangent. Draw that segment black, and mark its two ends
  // (secant point, tangent point) so the halving is visible, not implied.
  dw.seg('mseg10', { intro: 8, outro: 12, w: 0.06, color: PAL.black });
  dw.seg('mseg18', { intro: 8, outro: 12, w: 0.06, color: PAL.black });
  for (const n of ['secL', 'tanL', 'secR', 'tanR']) {
    dw.disk(`mk_${n}`, { intro: 8, outro: 12, r: 0.17, face: PAL.white, edge: 0x777777 });
  }
  dw.label('mk_secL', 'secant', { cls: 'point', intro: 8, outro: 10, flash: false, color: PAL.grey });
  dw.label('mk_tanL', 'tangent', { cls: 'point', intro: 8, outro: 10, flash: false, color: PAL.grey });
  // 'y = y' and 'z = z' annotations (the applet's step-4 evidence)
  for (const n of ['ySeg1', 'ySeg2']) dw.seg(n, { intro: 8, outro: 10, w: W_DIM, color: PAL.grey });
  for (const n of ['yCon1', 'yCon2', 'yCon3']) {
    dw.seg(n, { intro: 8, outro: 10, w: 0.04, color: PAL.grey, flash: false });
  }
  dw.label('lbl_y1', 'y', { cls: 'point', intro: 8, outro: 10, color: PAL.grey });
  dw.label('lbl_y2', 'y', { cls: 'point', intro: 8, outro: 10, color: PAL.grey });
  // load line quartered + node loads at x = 6, 10, 14, 18, 22
  for (let i = 0; i < 5; i++) {
    dw.arrow(`qv${i}`, { intro: 8, outro: 10, ...NARROW });
    dw.label(`lblRq${i}`, 'R', { cls: 'point', intro: 8, outro: 10, color: PAL.green });
  }
  const NRX = [6, 10, 18, 22];                        // midR already covers x = 14
  for (let i = 0; i < 4; i++) {
    dw.arrow(`nr${i}`, { intro: 8, ...NARROW });
    dw.label(`lblRn${i}`, 'R', { cls: 'point', intro: 8, color: PAL.green });
  }
  dw.strokes('ticks4', 4, { intro: 8, outro: 10, w: 0.05, color: PAL.green, flash: false });

  // ------------------------------------------------------------------
  // step 9: quarter rays + quarter strings
  // ------------------------------------------------------------------
  for (let i = 0; i < 4; i++) {
    dw.seg(`qray${i}`, { intro: 9, outro: 10, w: W_RAY, color: PAL.grey });
    dw.seg(`qstr${i}`, { intro: 9, outro: 12, w: W_STR, color: PAL.grey });
    dw.link(`qstr${i}`, `qray${i}`);
  }

  // ------------------------------------------------------------------
  // step 10: eighth points + the load line in eighths
  // ------------------------------------------------------------------
  for (const x of [8, 12, 16, 20]) dw.dashLine(`vx${x}`, { intro: 10, outro: 12, dash: 0.3 });
  for (let i = 0; i < 8; i++) {
    dw.seg(`dimL8_${i}`, { intro: 10, outro: 12, w: W_DIM, color: PAL.grey, flash: false });
    dw.label(`lbl_l8_${i}`, 'l/8', { cls: 'point', intro: 10, outro: 12, flash: false, color: PAL.grey });
  }
  dw.strokes('tickL8', 18, { intro: 10, outro: 12, w: W_DIM, color: PAL.grey, flash: false });
  for (const n of ['mseg8', 'mseg12', 'mseg16', 'mseg20']) {
    dw.seg(n, { intro: 10, outro: RESOLVE, w: W_STR, color: PAL.grey });
  }
  for (let i = 0; i < 9; i++) {
    dw.arrow(`e${i}`, { intro: 10, ...NARROW });
    dw.label(`lblRe${i}`, 'R', { cls: 'point', intro: 10, color: PAL.green });
  }
  const NR8X = [8, 12, 16, 20];
  for (let i = 0; i < 4; i++) {
    dw.arrow(`nr8_${i}`, { intro: 10, ...NARROW });
    dw.label(`lblRn8_${i}`, 'R', { cls: 'point', intro: 10, color: PAL.green });
  }
  dw.strokes('ticks8', 8, { intro: 10, w: 0.05, color: PAL.green, flash: false });

  // ------------------------------------------------------------------
  // step 11: the funicular polygon, members 1..8 in BOTH diagrams
  // ------------------------------------------------------------------
  for (let i = 0; i < 8; i++) {
    dw.seg(`ray${i}`, { intro: 11, w: W_RAY, color: memberColor(i) });
    dw.seg(`mem${i}`, { intro: 11, w: W_BAR, color: memberColor(i) });
    dw.label(`fn${i}`, `${i + 1}`, { cls: 'num', intro: 11, color: { final: (dd) => dd.cks[i] } });
    dw.label(`sn${i}`, `${i + 1}`, { cls: 'num', intro: 11, color: { final: (dd) => dd.cks[i] } });
    dw.link(`mem${i}`, `ray${i}`, `fn${i}`, `sn${i}`);
  }

  // ------------------------------------------------------------------
  // steps 12-14: tangent method (rulers, envelope, enclosing polygon)
  // ------------------------------------------------------------------
  // Dividing each tangent into 8 equal parts is a STATEMENT, not a drawing:
  // the applet's auxiliary parallel-ruler apparatus is dropped and the eight
  // equal parts are simply marked and ticked on the tangents themselves.
  dw.strokes('divTicks', 14, { intro: 12, outro: RESOLVE, w: 0.05, color: PAL.grey, flash: false });
  dw.label('lbl_o18', '8 equal parts', { cls: 'point', intro: 12, outro: RESOLVE, color: PAL.grey });
  dw.label('lbl_o28', '8 equal parts', { cls: 'point', intro: 12, outro: RESOLVE, color: PAL.grey });
  for (let i = 0; i < 7; i++) {
    dw.disk(`pt_tA${i}`, { intro: 12, outro: RESOLVE, r: 0.16, face: PAL.white, edge: 0x777777 });
    dw.disk(`pt_tB${i}`, { intro: 12, outro: RESOLVE, r: 0.16, face: PAL.white, edge: 0x777777 });
    dw.label(`lbl_kA${i}`, `${i + 1}`, { cls: 'point', intro: 12, outro: RESOLVE, flash: false, color: PAL.grey });
    dw.label(`lbl_kB${i}`, `${7 - i}`, { cls: 'point', intro: 12, outro: RESOLVE, flash: false, color: PAL.grey });
    dw.dashLine(`env${i}`, { intro: 13, outro: RESOLVE, dash: 0.35 });
  }
  for (const x of [7, 9, 11, 13, 15, 17, 19, 21]) {
    dw.dashLine(`ox${x}`, { intro: 14, outro: RESOLVE, dash: 0.3 });
  }
  dw.strokes('encl', 9, { intro: 14, outro: RESOLVE, w: 0.08,
                          color: { pending: PAL.black, final: () => PAL.grey } });

  // ------------------------------------------------------------------
  // resolve: internal-force pipes + magnitude readouts
  // ------------------------------------------------------------------
  for (let i = 0; i < 8; i++) {
    dw.poly(`if${i}`, 4, {
      intro: RESOLVE, opacity: 1.0, z: -0.18, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd.cks[i] },
      when: (st) => st.o1,
    });
    dw.label(`ro${i}`, '', { intro: RESOLVE, flash: false, color: { final: (dd) => dd.cks[i] } });
  }
  dw.label('roA', '', { intro: RESOLVE, flash: false, color: PAL.green });
  dw.label('roB', '', { intro: RESOLVE, flash: false, color: PAL.green });

  // ------------------------------------------------------------------
  // points + letters
  // ------------------------------------------------------------------
  const show = (st) => st.n4;
  const HANDLE = { r: 0.24 }, DERIVED = { r: 0.17 }, TINY = { r: 0.12 };
  dw.disk('pt_A', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_B', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_C', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_Q2', { intro: 2, ...HANDLE, when: show });
  dw.disk('pt_D3', { intro: 2, ...DERIVED, when: show });
  dw.disk('pt_G1', { intro: 3, ...DERIVED, when: show });
  dw.disk('pt_I1', { intro: 4, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_E3', { intro: 5, ...DERIVED, when: show });
  dw.disk('pt_F3', { intro: 7, ...TINY, when: show });
  dw.disk('pt_Q1', { intro: 8, ...DERIVED, when: show });
  dw.disk('pt_R1', { intro: 8, ...DERIVED, when: show });
  for (const p of ['E1', 'M1', 'P1', 'O1']) dw.disk(`pt_${p}`, { intro: 8, outro: RESOLVE, ...TINY, when: show });
  for (let i = 0; i < 4; i++) dw.disk(`pt_c4_${i}`, { intro: 8, outro: 10, ...TINY, when: show });
  dw.disk('pt_U1', { intro: 10, ...DERIVED, when: show });
  dw.disk('pt_Z1', { intro: 10, ...DERIVED, when: show });
  dw.disk('pt_C2', { intro: 10, ...DERIVED, when: show });
  dw.disk('pt_F2', { intro: 10, ...DERIVED, when: show });
  for (const p of ['S1', 'T1', 'V1', 'W1', 'A2', 'B2', 'D2', 'E2']) {
    dw.disk(`pt_${p}`, { intro: 10, outro: RESOLVE, ...TINY, when: show });
  }
  for (let i = 0; i < 8; i++) dw.disk(`pt_c8_${i}`, { intro: 10, ...TINY, when: show });
  dw.label('lbl_A', 'A', { cls: 'point', intro: 1, when: show });
  dw.label('lbl_B', 'B', { cls: 'point', intro: 1, when: show });
  dw.label('lbl_C', 'C', { cls: 'point', intro: 1, when: show });

  // dual pairs + ghosts
  dw.link('qfill', 'qedge', 'totR', 'midR', 'lblR_mid', 'lblR_tot');
  dw.link('tanA', 'rayA');
  dw.link('tanB', 'rayB');
  dw.link('tanC', 'midRay', 'chord');
  dw.link('reacA', 'reacFA', 'lblRA_form', 'lblRA_force');
  dw.link('reacB', 'reacFB', 'lblRB_form', 'lblRB_force');
  const nodeArrowOf = { 6: 'nr0', 8: 'nr8_0', 10: 'nr1', 12: 'nr8_1', 14: 'midR',
                        16: 'nr8_2', 18: 'nr2', 20: 'nr8_3', 22: 'nr3' };
  const NODE_XS = [6, 8, 10, 12, 14, 16, 18, 20, 22];
  NODE_XS.forEach((x, i) => { if (x !== 14) dw.link(nodeArrowOf[x], `e${i}`); });
  dw.ghostable('rayA', 'rayB', 'reacFA', 'reacFB',
               ...Array.from({ length: 8 }, (_, i) => `ray${i}`),
               ...Array.from({ length: 9 }, (_, i) => `e${i}`));

  // ------------------------------------------------------------------
  // node-equilibrium inspector: free-body star inset + tip-to-tail
  // sub-polygon on the force diagram (loads from the eighth division)
  // ------------------------------------------------------------------
  dw.nodeInspector(3, { when: (st) => st.node > 0, w: 1.5 * W_BAR, headLen: 0.7, headW: 0.28, r: 0.2 });
  const NODE_NAMES = ['A', '1·2', '2·3', '3·4', '4·5', '5·6', '6·7', '7·8', 'B'];
  const NODE_DISKS = ['pt_A', 'pt_U1', 'pt_Q1', 'pt_Z1', 'pt_C', 'pt_C2', 'pt_R1', 'pt_F2', 'pt_B'];
  const nodeAt = NODE_DISKS.map((_, i) => () => d.fun[i]);
  const nodePolys = () => {
    const polys = [];
    polys.push([[d.Q2, d.cut8[0]], [d.cut8[0], d.E3], [d.E3, d.Q2]]);      // A
    for (let i = 0; i < 7; i++) {
      polys.push([[d.cut8[i], d.cut8[i + 1]], [d.cut8[i + 1], d.E3], [d.E3, d.cut8[i]]]);
    }
    polys.push([[d.cut8[7], d.D3], [d.D3, d.E3], [d.E3, d.cut8[7]]]);      // B
    return polys;
  };
  function updateNode() {
    const j = Math.max(0, Math.min(NODE_DISKS.length - 1, Math.round(s.node) - 1));
    dw.selectDisk(s.node > 0 ? NODE_DISKS[j] : null);
    dw.setNodeInspector([27.6, 14.6], 2.6, `node ${NODE_NAMES[j]}`, nodePolys()[j]);
  }

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------
  function update() {
    dw.setLabel('form_title', [4.35, 18.12]);
    dw.setLabel('force_title', [32.87, 18.12]);
    dw.setLabel('force_sub', [32.87, 17.25]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(1)} kN`);

    dw.setDashLine('wallA', [[XA, VERT[1]], [XA, VERT[0]]]);
    dw.setDashLine('wallB', [[XB, VERT[1]], [XB, VERT[0]]]);
    dw.setDashLine('centre', [[XC, VERT[1]], [XC, VERT[0]]]);
    dw.setSeg('dimL', [XA, 16], [XB, 16]);
    dw.setSeg('dimL2a', [XA, 15], [XC, 15]);
    dw.setSeg('dimL2b', [XC, 15], [XB, 15]);
    dw.setSeg('dimL2a2', [XA, 15], [XC, 15]);
    dw.setSeg('dimL2b2', [XC, 15], [XB, 15]);
    dw.setLabel('lbl_l', [13.3, 16.42]);
    dw.setLabel('lbl_l2a', [9.3, 15.42]);
    dw.setLabel('lbl_l2b', [17.3, 15.42]);
    dw.setLabel('lbl_l2a2', [9.3, 15.42]);
    dw.setLabel('lbl_l2b2', [17.3, 15.42]);
    dw.setStrokes('tickL', xTicks([[XA, 16], [XB, 16]]));
    dw.setStrokes('tickL2', xTicks([[XA, 15], [XC, 15], [XB, 15]]));
    dw.setStrokes('tickL2r', xTicks([[XA, 15], [XC, 15], [XB, 15]]));
    dw.setStrokes('tickL8', xTicks([0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => [XA + 2 * k, 15])));

    // load strip + midspan resultant
    const yb = Y_TOP - 0.4 * s.sLS;
    dw.setPoly('qfill', [[XA, Y_TOP], [XB, Y_TOP], [XB, yb], [XA, yb]]);
    dw.setStrokes('qedge', [
      [[XA, Y_TOP], [XB, Y_TOP]], [[XB, Y_TOP], [XB, yb]],
      [[XB, yb], [XA, yb]], [[XA, yb], [XA, Y_TOP]],
    ]);
    dw.setLabel('lbl_q', [5.35, 13.62]);
    dw.setArrow('midR', [XC, O2Y], [XC, O2Y - s.sLS]);
    dw.setLabel('lblR_mid', [XC - 0.5, O2Y + 0.32]);
    dw.setDashLine('lline', [[s.qx, VERT[0]], [s.qx, VERT[1]]]);
    dw.setArrow('totR', d.Q2, d.D3);
    dw.setLabel('lblR_tot', [s.qx - 0.75, (d.Q2[1] + d.D3[1]) / 2]);

    dw.setDashLine('chord', [d.A, d.B]);
    dw.setDashLine('gG', [[GUIDE_X[0], d.G1[1]], [GUIDE_X[1], d.G1[1]]]);
    dw.setDashLine('gC', [[GUIDE_X[0], d.C[1]], [GUIDE_X[1], d.C[1]]]);
    dw.setSeg('dimH', [24, d.G1[1]], [24, d.C[1]]);
    dw.setLabel('lbl_h', [24.55, d.C[1] + 0.32 * (d.G1[1] - d.C[1])]);
    dw.setStrokes('tickH', xTicks([[24, d.G1[1]], [24, d.C[1]]]));
    dw.setSeg('dimH2', [25, d.G1[1]], [25, d.I1[1]]);
    dw.setLabel('lbl_h2', [25.7, d.C[1] - 0.8]);
    dw.setStrokes('tickH2', xTicks([[25, d.G1[1]], [25, d.I1[1]]]));

    dw.setDashLine('tanA', [d.A, d.I1]);
    dw.setDashLine('tanB', [d.I1, d.B]);
    dw.setSeg('rayA', d.Q2, d.E3);
    dw.setSeg('rayB', d.D3, d.E3);
    dw.setLabel('lbl_o', V.add(d.E3, [0.55, 0.42]));
    dw.setArrow('reacFA', d.E3, d.Q2);
    dw.setArrow('reacFB', d.D3, d.E3);
    const rA = V.mul(V.unit(V.sub(d.A, d.I1)), 1.6 * s.sLS);
    const rB = V.mul(V.unit(V.sub(d.B, d.I1)), 1.6 * s.sLS);
    dw.setArrow('reacA', d.A, V.add(d.A, rA));
    dw.setArrow('reacB', d.B, V.add(d.B, rB));
    dw.setLabel('lblRA_form', V.add(V.add(d.A, rA), [-0.45, 0.35]));
    dw.setLabel('lblRB_form', V.add(V.add(d.B, rB), [0.45, 0.35]));
    dw.setLabel('lblRA_force', V.add(V.mid(d.E3, d.Q2), [0.55, 0.25]));
    dw.setLabel('lblRB_force', V.add(V.mid(d.E3, d.D3), [0.35, -0.62]));

    dw.setDashLine('secAC', [d.A, d.C]);
    dw.setDashLine('secCB', [d.C, d.B]);
    dw.setDashLine('tanC', [onv(d.C, d.uCh, GUIDE_X[0]), onv(d.C, d.uCh, GUIDE_X[1])]);
    dw.setDashLine('midRay', [d.F3, d.E3]);
    dw.setLabel('lbl_F3', V.add(d.F3, [0.55, -0.5]));

    // quarter stage
    dw.setDashLine('vx10', [[10, VERT[1]], [10, VERT[0]]]);
    dw.setDashLine('vx18', [[18, VERT[1]], [18, VERT[0]]]);
    for (let i = 0; i < 4; i++) {
    }
    dw.setSeg('mseg10', d.E1, d.M1);
    dw.setSeg('mseg18', d.P1, d.O1);
    dw.setDisk('mk_secL', d.E1); dw.setDisk('mk_tanL', d.M1);
    dw.setDisk('mk_secR', d.P1); dw.setDisk('mk_tanR', d.O1);
    dw.setLabel('mk_secL', V.add(d.E1, [-2.1, 0.1]));
    dw.setLabel('mk_tanL', V.add(d.M1, [-2.3, -0.1]));
    // y = y (parabola midway between secant and tangent), z = z (equal spans)
    dw.setSeg('ySeg1', [N11X, d.O1[1]], [N11X, d.R1[1]]);
    dw.setSeg('ySeg2', [N11X, d.R1[1]], [N11X, d.P1[1]]);
    dw.setSeg('yCon1', d.O1, [N11X, d.O1[1]]);
    dw.setSeg('yCon2', d.R1, [N11X, d.R1[1]]);
    dw.setSeg('yCon3', d.P1, [N11X, d.P1[1]]);
    dw.setLabel('lbl_y1', [N11X + 0.45, (d.O1[1] + d.R1[1]) / 2]);
    dw.setLabel('lbl_y2', [N11X + 0.45, (d.R1[1] + d.P1[1]) / 2]);
    const q4pts = [d.Q2, ...d.cut4, d.D3];
    for (let i = 0; i < 5; i++) {
      dw.setArrow(`qv${i}`, q4pts[i], q4pts[i + 1]);
      dw.setLabel(`lblRq${i}`, [s.qx - 0.65, q4pts[i + 1][1] + 0.3]);
    }
    for (let i = 0; i < 4; i++) {
      dw.setArrow(`nr${i}`, [NRX[i], O2Y], [NRX[i], O2Y - s.sLS]);
      dw.setLabel(`lblRn${i}`, [NRX[i] - 0.5, O2Y + 0.32]);
      dw.setDisk(`pt_c4_${i}`, d.cut4[i]);
    }
    dw.setStrokes('ticks4', [8, 12, 16, 20].map((x) => [[x, Y_TOP], [x, yb]]));

    // quarter funicular
    const q4f = [d.A, d.Q1, d.C, d.R1, d.B];
    for (let i = 0; i < 4; i++) {
      dw.setSeg(`qray${i}`, d.E3, d.cut4[i]);
      dw.setSeg(`qstr${i}`, q4f[i], q4f[i + 1]);
    }

    // eighth stage
    for (const x of [8, 12, 16, 20]) dw.setDashLine(`vx${x}`, [[x, VERT[1]], [x, VERT[0]]]);
    for (let i = 0; i < 8; i++) {
      dw.setSeg(`dimL8_${i}`, [XA + 2 * i, 15], [XA + 2 * (i + 1), 15]);
      dw.setLabel(`lbl_l8_${i}`, [XA + 2 * i + 0.52, 14.4]);
    }
    dw.setSeg('mseg8', d.S1, d.T1);
    dw.setSeg('mseg12', d.V1, d.W1);
    dw.setSeg('mseg16', d.A2, d.B2);
    dw.setSeg('mseg20', d.D2, d.E2);
    const e8pts = [d.Q2, ...d.cut8, d.D3];
    for (let i = 0; i < 9; i++) {
      dw.setArrow(`e${i}`, e8pts[i], e8pts[i + 1]);
      dw.setLabel(`lblRe${i}`, [s.qx - 0.65, e8pts[i + 1][1] + 0.28]);
    }
    for (let i = 0; i < 4; i++) {
      dw.setArrow(`nr8_${i}`, [NR8X[i], O2Y], [NR8X[i], O2Y - s.sLS]);
      dw.setLabel(`lblRn8_${i}`, [NR8X[i] - 0.5, O2Y + 0.32]);
    }
    for (let i = 0; i < 8; i++) dw.setDisk(`pt_c8_${i}`, d.cut8[i]);
    dw.setStrokes('ticks8', [7, 9, 11, 13, 15, 17, 19, 21].map((x) => [[x, Y_TOP], [x, yb]]));

    // members + rays + numbers
    for (let i = 0; i < 8; i++) {
      dw.setSeg(`ray${i}`, d.E3, d.cut8[i]);
      dw.setSeg(`mem${i}`, d.fun[i], d.fun[i + 1]);
      const m = V.mid(d.fun[i], d.fun[i + 1]);
      const pf = V.perp(V.unit(V.sub(d.fun[i + 1], d.fun[i])));
      const sgn = V.dot(pf, V.sub(m, [14, 11])) >= 0 ? 1 : -1;
      dw.setLabel(`fn${i}`, V.add(m, V.mul(pf, 0.55 * sgn)));
      const rm = V.add(d.cut8[i], V.mul(V.sub(d.E3, d.cut8[i]), 0.42));
      const pr = V.perp(V.unit(V.sub(d.cut8[i], d.E3)));
      const sg2 = V.dot(pr, V.sub(rm, d.fcent)) >= 0 ? 1 : -1;
      dw.setLabel(`sn${i}`, V.add(rm, V.mul(pr, 0.5 * sg2)));
    }

    // tangent method: the two tangents, marked in 8 equal parts, then the
    // k-th point of one joined to the k-th (counted backwards) of the other
    const tickN = (p0, dir) => {
      const n = V.mul(V.unit(V.perp(dir)), 0.45);
      return [V.sub(p0, n), V.add(p0, n)];
    };
    const dt = [];
    for (let i = 0; i < 7; i++) {
      dw.setDisk(`pt_tA${i}`, d.tAp[i + 1]);
      dw.setDisk(`pt_tB${i}`, d.tBp[i + 1]);
      dw.setLabel(`lbl_kA${i}`, V.add(d.tAp[i + 1], V.mul(V.unit(V.perp(d.dA)), -0.95)));
      dw.setLabel(`lbl_kB${i}`, V.add(d.tBp[i + 1], V.mul(V.unit(V.perp(d.dB)), 0.95)));
      dt.push(tickN(d.tAp[i + 1], d.dA), tickN(d.tBp[i + 1], d.dB));
      dw.setDashLine(`env${i}`, [d.env[i][0], d.env[i][1]]);
    }
    dw.setStrokes('divTicks', dt);
    dw.setLabel('lbl_o18', V.add(V.mid(d.tAp[1], d.tAp[3]), V.mul(V.unit(V.perp(d.dA)), -3.4)));
    dw.setLabel('lbl_o28', V.add(V.mid(d.tBp[4], d.tBp[6]), V.mul(V.unit(V.perp(d.dB)), 3.4)));
    for (const x of [7, 9, 11, 13, 15, 17, 19, 21]) {
      dw.setDashLine(`ox${x}`, [[x, VERT[1]], [x, VERT[0]]]);
    }
    const eb = [];
    for (let i = 0; i < 9; i++) eb.push([d.b5[i], d.b5[i + 1]]);
    dw.setStrokes('encl', eb);

    // pipes + readouts
    for (let i = 0; i < 8; i++) {
      dw.setPoly(`if${i}`, V.rectPoints(d.fun[i], d.fun[i + 1], s.sIF * d.Ns[i]));
      dw.setLabel(`ro${i}`, [45.2, 4.1 - 1.02 * i]);
      dw.setText(`ro${i}`, `N${'₁₂₃₄₅₆₇₈'[i]} = ${d.Ns[i].toFixed(1)} kN`);
    }
    dw.setLabel('roA', [45.2, 4.1 + 2.04]);
    dw.setText('roA', `A = ${d.NA.toFixed(1)} kN`);
    dw.setLabel('roB', [45.2, 4.1 + 1.02]);
    dw.setText('roB', `B = ${d.NB.toFixed(1)} kN`);

    // points + letters
    dw.setDisk('pt_A', d.A);
    dw.setDisk('pt_B', d.B);
    dw.setDisk('pt_C', d.C);
    dw.setDisk('pt_Q2', d.Q2);
    dw.setDisk('pt_D3', d.D3);
    for (const p of ['G1', 'I1', 'E3', 'F3', 'Q1', 'R1', 'E1', 'M1', 'P1', 'O1',
                     'U1', 'Z1', 'C2', 'F2', 'S1', 'T1', 'V1', 'W1', 'A2', 'B2', 'D2', 'E2']) {
      dw.setDisk(`pt_${p}`, d[p]);
    }
    dw.setLabel('lbl_A', V.add(d.A, [-0.75, 0.15]));
    dw.setLabel('lbl_B', V.add(d.B, [0.75, 0.15]));
    dw.setLabel('lbl_C', V.add(d.C, [0.35, -0.62]));
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
  panel.slider(par, s, 'F1', 'F₁ — total load (kN)', 10, 30, 0.5, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 0.2, 0.6, 0.01, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 1, 5, 0.1, refresh);
  panel.slider(par, s, 'off', 'offset — tangent rulers', 1, 10, 0.1, refresh);
  panel.toggle(par, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.2, 0.005, refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  panel.toggle(par, s, 'hideRF', 'hide reaction forces in force diagram', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off): A, 1·2, …, 7·8, B', 0, 9, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS });
    panel.syncAll();
    refresh();
  });

  const hits = [
    ['A', () => d.A, 1], ['B', () => d.B, 1], ['C', () => d.C, 1],
    ['Q2', () => d.Q2, 2],
  ];
  dw.enableDrag(
    (wx, wy, tol) => {
      let best = null;
      for (const [name, get, k0] of hits) {
        if (player.k < k0) continue;
        const p = get();
        const dd = Math.hypot(p[0] - wx, p[1] - wy);
        if (dd < tol) { best = name; tol = dd; }
      }
      return best;
    },
    (name, wx, wy) => {
      if (name === 'A') s.ay = Math.max(s.cy + 1.2, Math.min(13.4, wy));
      else if (name === 'B') s.by = Math.max(s.cy + 1.2, Math.min(13.4, wy));
      else if (name === 'C') s.cy = Math.max(0.3, Math.min(Math.min(s.ay, s.by) - 1.2, wy));
      else if (name === 'Q2') {
        s.qx = Math.max(29, Math.min(46, wx));
        s.qy = Math.max(12, Math.min(18, wy));
      }
      refresh();
    },
  );

  // click a funicular node to inspect it; the panel slider stays in sync
  dw.nodeSelect(nodeAt.map((at) => ({ at })), (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
