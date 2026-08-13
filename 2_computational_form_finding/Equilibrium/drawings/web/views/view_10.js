/**
 * Drawing view/10 "Parabola v. Catenary"
 * (https://block.arch.ethz.ch/eq/drawing/view/10) as a step-by-step
 * construction. A cable between two walls:
 *
 *   - under the uniformly distributed load q the funicular is a PARABOLA
 *     (chord + mirror about the sag point -> tangents -> pole o);
 *   - measuring the string lengths s_1..s_9 gives the cable's true weight:
 *     the node loads grow to R_i = (s_i + s_i+1)/2 * g near the supports;
 *   - the funicular of those loads through ap 1, ap 2, ap 3 is re-posed as a
 *     three-point problem: trial pole M, trial funicular from O, closing +
 *     trial chords, parallels through M divide the new load line at
 *     i_1, i_2, i_3, parallels to the real chords meet at the pole o_1 ->
 *     the CATENARY (approximation), slightly fuller than the parabola.
 *
 * Live port of view_10/applet_0/geogebra.xml; the whole chain (pole o,
 * strings, segment lengths, catenary load line, trial funicular, divisions,
 * pole o_1, catenary) is regression-checked against the baked coordinates
 * to ~6e-7 (notes/view_10_analysis.md, scratchpad/v10_regress.py).
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 10 — Parabola v. Catenary',
  subtitle: 'the cable under uniform load, then under its own weight',
  about: 'A cable carrying a uniformly distributed load takes the shape of a parabola; under its own weight it hangs as a catenary. The parabola is drawn first (chord, mirror about the sag point, tangents, pole o), then its string lengths s₁…s₉ are measured to weigh the cable: the node loads grow towards the supports, where the cable runs longer and steeper. The funicular of those new loads through the same three points is found with a trial funicular, chords and a new pole o₁ — the catenary, slightly fuller than the parabola.',
  frame: [[-2.3944, -11.9804], [47.9683, 13.2009]],
};

const G = 2.0;                            // load / cable weight [kN/m]
const CY = 8.23464713961728;              // top of the load strip (applet C)
const BY = -11.867844760092288;           // bottom row of the walls (applet B)
const M1Y = 5.388618807986624;            // load-arrow row (applet M_1)
const BARY = 8.893913947481112;           // scale bar (applet V_2)
const XS = [1, 3, 5, 7, 9, 11, 13, 15, 16];   // funicular verticals
const KF = [1.5, 1.25, 1.1, 1.0, 1.0, 1.1, 1.25, 1.5]; // applet R_i arrow lengths
const SUB = '₁₂₃₄₅₆₇₈₉';
const RESOLVE = 13;

const DEFAULTS = {
  d1y: 2.6264861769192294,                // ap 1 = left support on x=0
  d3y: 2.6305504814233585,                // ap 2 = right support on x=16
  d2y: -3.390463768427124,                // ap 3 = sag point on x=8
  ax: 25.538528289864157, ay: 5.508930066094425,     // parabola load-line top a
  a1x: 36.36133462323195, a1y: 5.425492670613609,    // catenary load-line top a_1
  mx: 45.3800519285, my: 1.0389027189,    // trial pole M
  oy: -8.986870964730691,                 // trial start O on x=0
  sLS: 1.1,                               // scaleLoadSymbol [0.5, 2]
  sFD: 1.5,                               // scaleForceDiagram [0.5, 2]
  sRS: 1.7,                               // reaction symbol (applet scaleloadSymbol) [1, 2]
  sIF: 0.02,
  o1: true,                               // show internal forces
  showPts: false,                         // applet default: cut points hidden
  hideRF: false,
  node: 0,                                // node-equilibrium inspector (0 = off)
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'Site: a cable between two walls', d: 'left: two walls 16 m apart carry the load strip q (g = 2.0 kN/m); supports ap 1, ap 2 and the sag point ap 3 are draggable' },
  { t: 'The uniform load — its load line', d: 'left: eight panel loads R = g·l = 4 kN at the odd metres — right: the same eight pieces R stacked into the load line a…i of the parabola' },
  { t: 'Chord, mirror, tangents → the pole o', d: 'left: the chord ap 1–ap 2 crosses the centreline; mirroring that crossing about ap 3 gives the tangents 1 and 2 — right: parallels through a and i meet at the pole o' },
  { t: 'The parabola', d: 'right: rays from o to every cut of the load line — left: the strings s₁…s₉, each parallel to its ray: the funicular of the uniform load' },
  { t: 'Reactions A and B', d: 'right: the outer rays o–a and i–o are the two reactions — left: the same pulls at the supports, along the tangents' },
  { t: 'Measure the strings', d: 'left: rulers beside each string take off the true lengths s₁…s₉ — the cable runs longer and steeper near the supports' },
  { t: 'Weigh the cable: the new loads', d: 'left: each metre of cable weighs g, so each node load R becomes half the two adjacent string lengths times g — heavier near the supports — right: the new load line a₁…i₁ of the catenary' },
  { t: 'A trial funicular', d: 'right: any pole M with rays to the new cuts — left: strings parallel to them from a trial start O trace a first (wrong) funicular of the new loads' },
  { t: 'Close the trial', d: 'left: the closing O–O₁ (1) and the trial chords O–Q (3), Q–O₁ (2) through the crossing Q on the centreline — right: parallels through M cut the load line at i₂, i₁, i₃' },
  { t: 'Chords → the true pole o₁', d: 'left: the real chords 1 (ap 1–ap 2), 3 (ap 1–ap 3), 2 (ap 3–ap 2) — right: parallels to them through i₂, i₁, i₃ meet in one point: the pole o₁' },
  { t: 'The catenary', d: 'right: rays from o₁ to every cut — left: members 1…9, each parallel to its ray, through the same three points' },
  { t: 'Reactions A′ and B′', d: 'right: the outer rays o₁–a₁ and i₁–o₁ — left: the same pulls at the supports; the catenary pulls harder than the parabola' },
  { t: 'Parabola v. catenary', d: 'the trial retires — under its true weight the cable is a catenary (orange, like the original; it is in pure tension), slightly fuller than the parabola (black); both pass through ap 1, ap 2, ap 3' },
];

const cache = {};
function inter(key, p1, d1, p2, d2) {
  cache[key] = V.intersect(p1, d1, p2, d2) || cache[key] || p1;
  return cache[key];
}

/** Point of the line through p along dir at the vertical x. */
function onv(p, dir, x) {
  return [x, p[1] + dir[1] * ((x - p[0]) / (Math.abs(dir[0]) < 1e-9 ? 1e-9 : dir[0]))];
}

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const D1 = [0, s.d1y], D3 = [16, s.d3y], D2 = [8, s.d2y];
  const E = [8, (s.d1y + s.d3y) / 2];               // chord ∩ centreline
  const F = [8, 2 * s.d2y - E[1]];                  // mirror of E about ap 3
  const j1 = V.sub(F, D1), j2 = V.sub(D3, F);       // the two tangents

  // parabola load line: 8 pieces of R = 4 kN, each 2/sFD units
  const A = [s.ax, s.ay];
  const piece = 2 / s.sFD;
  const lp = [];
  for (let k = 0; k <= 8; k++) lp.push([s.ax, s.ay - k * piece]);   // a..i
  const o = inter('o', A, j1, lp[8], j2);           // the parabola pole

  // parabola funicular: strings s_1..s_9 parallel to the rays
  const I = [onv(D1, j1, 1)];                       // I_2 on x=1
  for (let k = 0; k < 7; k++) I.push(onv(I[k], V.sub(lp[k + 1], o), XS[k + 1]));
  const fun = [D1, ...I, D3];
  const sLen = [];
  for (let i = 0; i < 9; i++) sLen.push(V.dist(fun[i], fun[i + 1]));

  // weigh the cable: node loads R_i [kN] (Text40's formulas)
  const Rkn = [(sLen[0] + sLen[1] / 2) * G];
  for (let i = 1; i < 7; i++) Rkn.push((sLen[i] + sLen[i + 1]) * 0.5 * G);
  Rkn.push((sLen[7] / 2 + sLen[8]) * G);

  // catenary load line: pieces R_i/(2 sFD) units
  const A1 = [s.a1x, s.a1y];
  const lc = [A1];
  for (let i = 0; i < 8; i++) lc.push([s.a1x, lc[i][1] - Rkn[i] / (2 * s.sFD)]);

  // trial funicular from O with trial pole M
  const M = [s.mx, s.my], O = [0, s.oy];
  const Oc = [O];
  for (let k = 0; k < 9; k++) Oc.push(onv(Oc[k], V.sub(lc[k], M), XS[k]));
  const Q = onv(Oc[4], V.sub(Oc[5], Oc[4]), 8);     // trial ∩ centreline
  const O1 = Oc[9];

  // parallels through M cut the catenary load line (captions i_2, i_1, i_3)
  const qPt = onv(M, V.sub(O1, O), s.a1x);          // ∥ closing '1'  -> i_2
  const pPt = onv(M, V.sub(Q, O), s.a1x);           // ∥ chord  '3'  -> i_1
  const GPt = onv(M, V.sub(O1, Q), s.a1x);          // ∥ chord  '2'  -> i_3

  // pole o_1 from the real chords (G ∥ ap3-ap2 is concurrent - the check)
  const o1 = inter('o1', qPt, V.sub(D3, D1), pPt, V.sub(D2, D1));

  // the catenary: members 1..9 parallel to the rays o_1 -> cuts
  const T = [onv(D1, V.sub(A1, o1), 1)];
  for (let k = 0; k < 7; k++) T.push(onv(T[k], V.sub(lc[k + 1], o1), XS[k + 1]));
  const cat = [D1, ...T, D3];

  // rulers beside the strings (offset sLS to the outside)
  const rul = [];
  for (let i = 0; i < 9; i++) {
    const u = V.unit(V.sub(fun[i + 1], fun[i]));
    let n = V.perp(u);
    if (n[1] > 0) n = V.mul(n, -1);
    rul.push([V.add(fun[i], V.mul(n, s.sLS)), V.add(fun[i + 1], V.mul(n, s.sLS)), n]);
  }

  // forces + colors (tension for a hanging cable — derived, not assumed)
  const Ns = lc.map((c) => V.dist(o1, c) * 2 * s.sFD);
  const col = (w) => (V.isCompression(w) ? PAL.blue : PAL.red);
  const cks = [];
  for (let i = 0; i < 9; i++) {
    cks.push(col(V.ggbAngle(V.sub(cat[i + 1], cat[i]), V.sub(o1, lc[i]))));
  }
  const NA = V.dist(o, A) * 2 * s.sFD, NB = V.dist(o, lp[8]) * 2 * s.sFD;
  const NA1 = V.dist(o1, A1) * 2 * s.sFD, NB1 = V.dist(o1, lc[8]) * 2 * s.sFD;

  // reaction directions (applet: length sRS along tangent / end member)
  const rA = V.unit(V.sub(D1, F)), rB = V.unit(V.sub(D3, F));
  const rA1 = V.unit(V.sub(A1, o1)), rB1 = V.unit(V.sub(o1, lc[8]));

  return { D1, D3, D2, E, F, j1, j2, A, lp, o, I, fun, sLen, Rkn, A1, lc,
           M, O, Oc, Q, O1, qPt, pPt, GPt, o1, T, cat, rul,
           Ns, cks, NA, NB, NA1, NB1, rA, rB, rA1, rB1 };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);

  // the applet draws the WHOLE catenary system orange (h_14, rays g_13..q_13,
  // loads w_2..u_6 + texts, reactions u_12/v_12/w_10/u_11) to set it apart
  // from the black parabola -- match it (the cable is in tension throughout)
  const memberColor = () => ({ pending: PAL.black, final: () => PAL.orange });
  const W_BAR = 0.15, W_RAY = 0.07, W_STR = 0.11, W_DIM = 0.05;
  const ARROW = { w: 0.18, headLen: 0.62, headW: 0.24 };     // big green vectors
  const NARROW = { w: 0.13, headLen: 0.42, headW: 0.18 };    // loads / pieces

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('form_sub', '1 unit :: 1 m', { flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // ------------------------------------------------------------------
  // step 1: site — walls, centreline, panel verticals, load strip, 2m bar
  // ------------------------------------------------------------------
  dw.dashLine('wallL', { intro: 1, dash: 0.4 });
  dw.dashLine('wallR', { intro: 1, dash: 0.4 });
  dw.dashLine('centre', { intro: 1, dash: 0.4 });
  for (let i = 0; i < 8; i++) dw.dashLine(`vert${i}`, { intro: 1, dash: 0.16 });
  dw.poly('qfill', 4, { intro: 1, color: PAL.green, opacity: 0.13, flash: false });
  dw.strokes('qedge', 11, { intro: 1, w: 0.07, color: PAL.green });
  dw.label('lbl_q', 'q', { intro: 1, color: PAL.green });
  dw.seg('bar2m', { intro: 1, w: W_DIM, color: PAL.grey, flash: false });
  dw.strokes('bar2mT', 2, { intro: 1, w: W_DIM, color: PAL.grey, flash: false });
  dw.label('lbl_2m', '2 m', { cls: 'point', intro: 1, flash: false, color: PAL.grey });
  dw.label('lbl_g', 'g = 2.0 kN/m', { intro: 1, outro: 7, flash: false });
  dw.instant('wallL', 'wallR', 'centre', ...Array.from({ length: 8 }, (_, i) => `vert${i}`),
             'qfill', 'qedge', 'bar2m', 'bar2mT');

  // ------------------------------------------------------------------
  // step 2: uniform load (left) + parabola load line a..i (right)
  // ------------------------------------------------------------------
  for (let i = 0; i < 8; i++) {
    dw.arrow(`ul${i}`, { intro: 2, outro: 7, ...NARROW });
    dw.label(`lbl_ul${i}`, 'R', { cls: 'point', intro: 2, outro: 7, color: PAL.green });
    dw.arrow(`pp${i}`, { intro: 2, ...NARROW });             // load-line piece
    dw.label(`lbl_pp${i}`, 'R', { cls: 'point', intro: 2, color: PAL.green });
    dw.link(`ul${i}`, `pp${i}`, `lbl_ul${i}`, `lbl_pp${i}`);
  }
  dw.label('lbl_F', 'F = g · l = 2.0 kN/m · 2 m = 4 kN', { intro: 2, outro: 7, flash: false });
  dw.label('tag_para', 'parabola', { intro: 2, flash: false });
  dw.label('lbl_a', 'a', { cls: 'point', intro: 2, flash: false, color: PAL.grey });
  dw.label('lbl_i', 'i', { cls: 'point', intro: 2, flash: false, color: PAL.grey });

  // ------------------------------------------------------------------
  // step 3: chord + mirror -> tangents 1, 2 (left); pole o + rays (right)
  // ------------------------------------------------------------------
  dw.dashLine('chord1', { intro: 3, color: PAL.black, dash: 0.5 });    // ap1-ap2 '1'
  dw.dashLine('mirror', { intro: 3, outro: 5, dash: 0.35 });           // mirror circle
  dw.dashLine('tanA', { intro: 3, outro: 6, dash: 0.4 });
  dw.dashLine('tanB', { intro: 3, outro: 6, dash: 0.4 });
  dw.label('lbl_t1', '1', { cls: 'num', intro: 3, outro: 6, color: PAL.grey });
  dw.label('lbl_t2', '2', { cls: 'num', intro: 3, outro: 6, color: PAL.grey });
  dw.seg('rayA', { intro: 3, w: W_STR, color: PAL.black });            // a - o
  dw.seg('rayB', { intro: 3, w: W_STR, color: PAL.black });            // o - i
  dw.label('lbl_r1', '1', { cls: 'num', intro: 3, outro: 5 });
  dw.label('lbl_r2', '2', { cls: 'num', intro: 3, outro: 5 });
  dw.label('lbl_o', 'o', { cls: 'point', intro: 3 });

  // ------------------------------------------------------------------
  // step 4: inner rays (right) + parabola strings s_1..s_9 (left)
  // ------------------------------------------------------------------
  for (let i = 0; i < 7; i++) dw.seg(`iray${i}`, { intro: 4, w: W_RAY, color: PAL.black });
  for (let i = 0; i < 9; i++) dw.seg(`str${i}`, { intro: 4, w: W_STR, color: PAL.black });
  dw.link('tanA', 'rayA', 'lbl_t1', 'lbl_r1', 'str0');
  dw.link('tanB', 'rayB', 'lbl_t2', 'lbl_r2', 'str8');
  for (let i = 1; i < 8; i++) dw.link(`str${i}`, `iray${i - 1}`);

  // ------------------------------------------------------------------
  // step 5: reactions A, B — green, both diagrams
  // ------------------------------------------------------------------
  const rf = (st) => !st.hideRF;
  dw.arrow('reacFA', { intro: 5, ...ARROW, when: rf });      // o -> a  'A'
  dw.arrow('reacFB', { intro: 5, ...ARROW, when: rf });      // i -> o  'B'
  dw.arrow('reacA', { intro: 5, ...ARROW });
  dw.arrow('reacB', { intro: 5, ...ARROW });
  dw.label('lblRA_form', 'A', { cls: 'num', intro: 5, color: PAL.green });
  dw.label('lblRB_form', 'B', { cls: 'num', intro: 5, color: PAL.green });
  dw.label('lblRA_force', 'A', { cls: 'num', intro: 5, color: PAL.green, when: rf });
  dw.label('lblRB_force', 'B', { cls: 'num', intro: 5, color: PAL.green, when: rf });
  dw.link('reacA', 'reacFA', 'lblRA_form', 'lblRA_force');
  dw.link('reacB', 'reacFB', 'lblRB_form', 'lblRB_force');

  // ------------------------------------------------------------------
  // step 6: rulers beside the strings + s_i readout (retire at 8)
  // ------------------------------------------------------------------
  dw.strokes('rulers', 27, { intro: 6, outro: 8, w: 0.05,
                             color: { pending: PAL.black, final: () => PAL.grey } });
  for (let i = 0; i < 9; i++) {
    dw.label(`lbl_s${i}`, `s${SUB[i]}`, { cls: 'point', intro: 6, outro: 8, color: PAL.grey });
    dw.label(`ro_s${i}`, '', { intro: 6, outro: 8, flash: false, color: PAL.grey });
  }

  // ------------------------------------------------------------------
  // step 7: the cable's weight — new load arrows R_1..R_8 (left)
  //         + catenary load line a_1..i_1 (right)
  // ------------------------------------------------------------------
  for (let i = 0; i < 8; i++) {
    dw.arrow(`cl${i}`, { intro: 7, ...NARROW, color: PAL.orange });
    dw.label(`lbl_cl${i}`, `R${SUB[i]}`, { cls: 'point', intro: 7, color: PAL.orange });
    dw.arrow(`cp${i}`, { intro: 7, ...NARROW, color: PAL.orange });
    dw.label(`lbl_cp${i}`, `R${SUB[i]}`, { cls: 'point', intro: 7, color: PAL.orange });
    dw.link(`cl${i}`, `cp${i}`, `lbl_cl${i}`, `lbl_cp${i}`);
  }
  dw.highlight('qedge', [7]);
  dw.highlight('lbl_q', [7]);
  dw.label('ro_Rh', 'node loads from the string lengths:', { intro: 7, flash: false });
  for (let i = 0; i < 8; i++) dw.label(`ro_R${i}`, '', { intro: 7, flash: false });
  dw.label('tag_cat', 'catenary', { intro: 7, flash: false });
  dw.label('lbl_a1', 'a₁', { cls: 'point', intro: 7, flash: false, color: PAL.grey });
  dw.label('lbl_i1', 'i₁', { cls: 'point', intro: 7, flash: false, color: PAL.grey });

  // ------------------------------------------------------------------
  // step 8: trial pole M + rays (right); trial funicular from O (left)
  // ------------------------------------------------------------------
  for (let i = 0; i < 9; i++) dw.seg(`mray${i}`, { intro: 8, outro: 10, w: 0.06, color: PAL.grey });
  dw.label('lbl_M', 'M', { cls: 'point', intro: 8, outro: 10, color: PAL.grey });
  dw.strokes('trial', 9, { intro: 8, outro: RESOLVE, w: 0.09,
                           color: { pending: PAL.black, final: () => PAL.grey } });
  dw.label('lbl_O', 'O', { cls: 'point', intro: 8, outro: RESOLVE, color: PAL.grey });
  dw.label('lbl_O1', 'O₁', { cls: 'point', intro: 8, outro: RESOLVE, color: PAL.grey });

  // ------------------------------------------------------------------
  // step 9: closing '1' + trial chords '3', '2' (left);
  //         parallels through M -> divisions i_2, i_1, i_3 (right)
  // ------------------------------------------------------------------
  dw.dashLine('close1', { intro: 9, outro: RESOLVE, dash: 0.45 });     // O-O_1 '1'
  dw.dashLine('tch3', { intro: 9, outro: RESOLVE, dash: 0.45 });       // O-Q  '3'
  dw.dashLine('tch2', { intro: 9, outro: RESOLVE, dash: 0.45 });       // Q-O_1 '2'
  dw.label('lbl_c1', '1', { cls: 'num', intro: 9, outro: RESOLVE, color: PAL.grey });
  dw.label('lbl_c3', '3', { cls: 'num', intro: 9, outro: RESOLVE, color: PAL.grey });
  dw.label('lbl_c2', '2', { cls: 'num', intro: 9, outro: RESOLVE, color: PAL.grey });
  dw.label('lbl_Q', 'Q', { cls: 'point', intro: 9, outro: RESOLVE, color: PAL.grey });
  dw.dashLine('mpar1', { intro: 9, outro: 10, dash: 0.45 });           // M-q  '1'
  dw.dashLine('mpar3', { intro: 9, outro: 10, dash: 0.45 });           // M-p  '3'
  dw.dashLine('mpar2', { intro: 9, outro: 10, dash: 0.45 });           // M-G  '2'
  dw.label('lbl_m1', '1', { cls: 'num', intro: 9, outro: 10, color: PAL.grey });
  dw.label('lbl_m3', '3', { cls: 'num', intro: 9, outro: 10, color: PAL.grey });
  dw.label('lbl_m2', '2', { cls: 'num', intro: 9, outro: 10, color: PAL.grey });
  dw.label('lbl_i2', 'i₂', { cls: 'point', intro: 9, outro: RESOLVE, color: PAL.grey });
  dw.label('lbl_i1d', 'i₁', { cls: 'point', intro: 9, outro: RESOLVE, color: PAL.grey });
  dw.label('lbl_i3', 'i₃', { cls: 'point', intro: 9, outro: RESOLVE, color: PAL.grey });
  dw.link('close1', 'mpar1', 'lbl_c1', 'lbl_m1');
  dw.link('tch3', 'mpar3', 'lbl_c3', 'lbl_m3');
  dw.link('tch2', 'mpar2', 'lbl_c2', 'lbl_m2');

  // ------------------------------------------------------------------
  // step 10: real chords 1/3/2 (left); parallels -> pole o_1 (right)
  // ------------------------------------------------------------------
  dw.dashLine('chord3', { intro: 10, outro: RESOLVE, color: PAL.black, dash: 0.5 });  // ap1-ap3
  dw.dashLine('chord2', { intro: 10, outro: RESOLVE, color: PAL.black, dash: 0.5 });  // ap3-ap2
  dw.label('lbl_ch1', '1', { cls: 'num', intro: 10, outro: RESOLVE });
  dw.label('lbl_ch3', '3', { cls: 'num', intro: 10, outro: RESOLVE });
  dw.label('lbl_ch2', '2', { cls: 'num', intro: 10, outro: RESOLVE });
  dw.dashLine('con1', { intro: 10, outro: 11, color: PAL.black, dash: 0.5 });  // o_1-q  '1'
  dw.dashLine('con3', { intro: 10, outro: 11, color: PAL.black, dash: 0.5 });  // p-o_1  '3'
  dw.dashLine('con2', { intro: 10, outro: 11, color: PAL.black, dash: 0.5 });  // G-o_1  '2'
  dw.label('lbl_cn1', '1', { cls: 'num', intro: 10, outro: 11 });
  dw.label('lbl_cn3', '3', { cls: 'num', intro: 10, outro: 11 });
  dw.label('lbl_cn2', '2', { cls: 'num', intro: 10, outro: 11 });
  dw.label('lbl_o1', 'o₁', { cls: 'point', intro: 10 });
  dw.link('chord1', 'con1', 'lbl_ch1', 'lbl_cn1');
  dw.link('chord3', 'con3', 'lbl_ch3', 'lbl_cn3');
  dw.link('chord2', 'con2', 'lbl_ch2', 'lbl_cn2');

  // ------------------------------------------------------------------
  // step 11: catenary rays (right) + members 1..9 (left), numbered
  // ------------------------------------------------------------------
  for (let i = 0; i < 9; i++) {
    dw.seg(`cray${i}`, { intro: 11, w: i === 0 || i === 8 ? W_STR : W_RAY,
                         color: memberColor(i) });
    dw.seg(`mem${i}`, { intro: 11, w: W_BAR, color: memberColor(i) });
    dw.label(`fn${i}`, `${i + 1}`, { cls: 'num', intro: 11, color: PAL.orange });
    dw.label(`sn${i}`, `${i + 1}`, { cls: 'num', intro: 11, color: PAL.orange });
    dw.link(`mem${i}`, `cray${i}`, `fn${i}`, `sn${i}`);
  }

  // ------------------------------------------------------------------
  // step 12: reactions A', B' — green, both diagrams
  // ------------------------------------------------------------------
  dw.arrow('reacFA1', { intro: 12, ...ARROW, color: PAL.orange, when: rf });    // o_1 -> a_1  A'
  dw.arrow('reacFB1', { intro: 12, ...ARROW, color: PAL.orange, when: rf });    // i_1 -> o_1  B'
  dw.arrow('reacA1', { intro: 12, ...ARROW, color: PAL.orange });
  dw.arrow('reacB1', { intro: 12, ...ARROW, color: PAL.orange });
  dw.label('lblRA1_form', 'A′', { cls: 'num', intro: 12, color: PAL.orange });
  dw.label('lblRB1_form', 'B′', { cls: 'num', intro: 12, color: PAL.orange });
  dw.label('lblRA1_force', 'A′', { cls: 'num', intro: 12, color: PAL.orange, when: rf });
  dw.label('lblRB1_force', 'B′', { cls: 'num', intro: 12, color: PAL.orange, when: rf });
  dw.link('reacA1', 'reacFA1', 'lblRA1_form', 'lblRA1_force');
  dw.link('reacB1', 'reacFB1', 'lblRB1_form', 'lblRB1_force');

  // ------------------------------------------------------------------
  // resolve: internal-force pipes + magnitude readouts
  // ------------------------------------------------------------------
  for (let i = 0; i < 9; i++) {
    dw.poly(`if${i}`, 4, {
      intro: RESOLVE, opacity: 0.45, flash: false,
      color: { pending: PAL.grey, final: () => PAL.orange },
      when: (st) => st.o1,
    });
    dw.label(`ro_N${i}`, '', { intro: RESOLVE, flash: false, color: PAL.orange });
  }
  dw.label('ro_AB', '', { intro: RESOLVE, flash: false, color: PAL.green });
  dw.label('ro_AB1', '', { intro: RESOLVE, flash: false, color: PAL.orange });

  // ------------------------------------------------------------------
  // points + letters
  // ------------------------------------------------------------------
  const show = (st) => st.showPts;
  const HANDLE = { r: 0.24 }, DERIVED = { r: 0.17 }, TINY = { r: 0.12 };
  dw.disk('pt_D1', { intro: 1, ...HANDLE });
  dw.disk('pt_D3', { intro: 1, ...HANDLE });
  dw.disk('pt_D2', { intro: 1, ...HANDLE });
  dw.label('lbl_D1', 'ap 1', { cls: 'point', intro: 1 });
  dw.label('lbl_D3', 'ap 2', { cls: 'point', intro: 1 });
  dw.label('lbl_D2', 'ap 3', { cls: 'point', intro: 1 });
  dw.disk('pt_a', { intro: 2, ...HANDLE });
  for (let i = 1; i <= 8; i++) dw.disk(`pt_lp${i}`, { intro: 2, ...TINY, when: show });
  dw.disk('pt_E', { intro: 3, outro: 5, ...TINY });
  dw.disk('pt_F', { intro: 3, outro: 5, ...DERIVED, when: show });
  dw.disk('pt_o', { intro: 3, ...DERIVED });
  for (let i = 0; i < 8; i++) dw.disk(`pt_I${i}`, { intro: 4, ...TINY, when: show });
  dw.disk('pt_a1', { intro: 7, ...HANDLE });
  for (let i = 1; i <= 8; i++) dw.disk(`pt_lc${i}`, { intro: 7, ...TINY, when: show });
  dw.disk('pt_M', { intro: 8, outro: 10, ...HANDLE });
  dw.disk('pt_O', { intro: 8, outro: RESOLVE, ...HANDLE });
  dw.disk('pt_Q', { intro: 9, outro: RESOLVE, ...DERIVED });
  dw.disk('pt_q', { intro: 9, outro: RESOLVE, ...DERIVED });
  dw.disk('pt_p', { intro: 9, outro: RESOLVE, ...DERIVED });
  dw.disk('pt_G', { intro: 9, outro: RESOLVE, ...DERIVED });
  dw.disk('pt_o1', { intro: 10, ...DERIVED });
  for (let i = 0; i < 8; i++) {
    // cable vertices: visible with "show points" or while inspected
    dw.disk(`pt_T${i}`, { intro: 11, ...TINY,
                          when: (st) => st.showPts || Math.round(st.node) === i + 2 });
  }

  // ghost preview: force-diagram elements of the final drawing
  dw.ghostable('rayA', 'rayB', 'reacFA', 'reacFB', 'reacFA1', 'reacFB1',
               ...Array.from({ length: 7 }, (_, i) => `iray${i}`),
               ...Array.from({ length: 8 }, (_, i) => `pp${i}`),
               ...Array.from({ length: 8 }, (_, i) => `cp${i}`),
               ...Array.from({ length: 9 }, (_, i) => `cray${i}`));

  // ------------------------------------------------------------------
  // node-equilibrium inspector: free-body star inset + tip-to-tail
  // sub-polygon on the catenary's force diagram
  // ------------------------------------------------------------------
  dw.nodeInspector(3, { when: (st) => st.node > 0, w: 1.5 * W_BAR, headLen: 0.7, headW: 0.28, r: 0.2 });
  const NODE_NAMES = ['ap 1', '1·2', '2·3', '3·4', '4·5', '5·6', '6·7', '7·8', '8·9', 'ap 2'];
  const NODE_DISKS = ['pt_D1', 'pt_T0', 'pt_T1', 'pt_T2', 'pt_T3', 'pt_T4', 'pt_T5', 'pt_T6', 'pt_T7', 'pt_D3'];
  const nodeAt = NODE_DISKS.map((_, i) => () => d.cat[i]);
  const nodePolys = () => {
    const polys = [];
    polys.push([[d.o1, d.lc[0]], [d.lc[0], d.o1]]);                    // ap 1: A' + member 1
    for (let i = 0; i < 8; i++) {
      polys.push([[d.lc[i], d.lc[i + 1]], [d.lc[i + 1], d.o1], [d.o1, d.lc[i]]]);
    }
    polys.push([[d.lc[8], d.o1], [d.o1, d.lc[8]]]);                    // ap 2: member 9 + B'
    return polys;
  };
  function updateNode() {
    const j = Math.max(0, Math.min(NODE_DISKS.length - 1, Math.round(s.node) - 1));
    dw.selectDisk(s.node > 0 ? NODE_DISKS[j] : null);
    dw.setNodeInspector([20.5, 9.8], 2.1, `node ${NODE_NAMES[j]}`, nodePolys()[j]);
  }

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------
  function update() {
    dw.setLabel('form_title', [1.8, 12.35]);
    dw.setLabel('form_sub', [1.35, 11.55]);
    dw.setLabel('force_title', [27.2, 12.35]);
    dw.setLabel('force_sub', [27.35, 11.55]);
    dw.setText('force_sub', `1 unit :: ${(2 * s.sFD).toFixed(1)} kN`);

    // site
    const yb = CY - 0.4 * s.sLS;
    dw.setDashLine('wallL', [[0, yb], [0, BY]]);
    dw.setDashLine('wallR', [[16, yb], [16, BY]]);
    dw.setDashLine('centre', [[8, yb], [8, BY]]);
    for (let i = 0; i < 8; i++) {
      dw.setDashLine(`vert${i}`, [[1 + 2 * i, yb], [1 + 2 * i, BY]]);
    }
    dw.setPoly('qfill', [[0, CY], [16, CY], [16, yb], [0, yb]]);
    const qe = [[[0, CY], [16, CY]], [[0, yb], [16, yb]]];
    for (let x = 0; x <= 16; x += 2) qe.push([[x, CY], [x, yb]]);
    dw.setStrokes('qedge', qe);
    dw.setLabel('lbl_q', [-0.85, (CY + yb) / 2]);
    dw.setSeg('bar2m', [0, BARY], [2, BARY]);
    dw.setStrokes('bar2mT', [[[0, BARY - 0.14], [0, BARY + 0.14]], [[2, BARY - 0.14], [2, BARY + 0.14]]]);
    dw.setLabel('lbl_2m', [1, BARY + 0.42]);
    dw.setLabel('lbl_g', [24.3, 9.13]);
    dw.setLabel('lbl_F', [26.6, 8.3]);

    // uniform load + parabola load line
    for (let i = 0; i < 8; i++) {
      const x = 1 + 2 * i;
      dw.setArrow(`ul${i}`, [x, M1Y + s.sLS], [x, M1Y]);
      dw.setLabel(`lbl_ul${i}`, [x + 0.42, M1Y + 0.28]);
      dw.setArrow(`pp${i}`, d.lp[i], d.lp[i + 1]);
      dw.setLabel(`lbl_pp${i}`, [s.ax - 0.62, (d.lp[i][1] + d.lp[i + 1][1]) / 2]);
    }
    dw.setLabel('tag_para', [s.ax + 0.55, s.ay + 0.55]);
    dw.setLabel('lbl_a', [s.ax + 0.52, s.ay - 0.05]);
    dw.setLabel('lbl_i', [s.ax + 0.52, d.lp[8][1] - 0.1]);

    // chord + mirror + tangents; pole o + rays
    dw.setDashLine('chord1', [d.D1, d.D3]);
    const mr = Math.max(d.E[1] - d.D2[1], 1e-6);
    const mpts = [];
    for (let i = 0; i <= 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      mpts.push([d.D2[0] + mr * Math.cos(a), d.D2[1] + mr * Math.sin(a)]);
    }
    dw.setDashLine('mirror', mpts);
    dw.setDashLine('tanA', [d.D1, d.F]);
    dw.setDashLine('tanB', [d.F, d.D3]);
    dw.setLabel('lbl_t1', V.add(V.mid(d.D1, d.F), [-0.55, -0.25]));
    dw.setLabel('lbl_t2', V.add(V.mid(d.F, d.D3), [0.55, -0.25]));
    dw.setSeg('rayA', d.A, d.o);
    dw.setSeg('rayB', d.o, d.lp[8]);
    dw.setLabel('lbl_r1', V.add(V.mid(d.A, d.o), [0.15, 0.5]));
    dw.setLabel('lbl_r2', V.add(V.mid(d.o, d.lp[8]), [0.15, -0.52]));
    dw.setLabel('lbl_o', V.add(d.o, [0.6, 0.15]));

    // inner rays + strings
    for (let i = 0; i < 7; i++) dw.setSeg(`iray${i}`, d.o, d.lp[i + 1]);
    for (let i = 0; i < 9; i++) dw.setSeg(`str${i}`, d.fun[i], d.fun[i + 1]);

    // parabola reactions
    dw.setArrow('reacFA', d.o, d.A);
    dw.setArrow('reacFB', d.lp[8], d.o);
    const tA = V.add(d.D1, V.mul(d.rA, s.sRS));
    const tB = V.add(d.D3, V.mul(d.rB, s.sRS));
    dw.setArrow('reacA', d.D1, tA);
    dw.setArrow('reacB', d.D3, tB);
    dw.setLabel('lblRA_form', V.add(tA, [-0.42, 0.35]));
    dw.setLabel('lblRB_form', V.add(tB, [0.42, 0.35]));
    dw.setLabel('lblRA_force', V.add(V.mid(d.o, d.A), [0.62, 0.15]));
    dw.setLabel('lblRB_force', V.add(V.mid(d.o, d.lp[8]), [0.66, 0.1]));

    // rulers + s_i readout
    const rp = [];
    for (let i = 0; i < 9; i++) {
      const [a, b, n] = d.rul[i];
      // partial side connectors (the applet's H-apparatus stops short of the string)
      rp.push([a, V.add(a, V.mul(V.sub(d.fun[i], a), 0.68))],
              [a, b],
              [b, V.add(b, V.mul(V.sub(d.fun[i + 1], b), 0.68))]);
      dw.setLabel(`lbl_s${i}`, V.add(V.mid(a, b), V.mul(n, 0.5)));
      dw.setLabel(`ro_s${i}`, [20.4, 3.35 - 0.72 * i]);
      dw.setText(`ro_s${i}`, `s${SUB[i]} = ${d.sLen[i].toFixed(2)} m`);
    }
    dw.setStrokes('rulers', rp);

    // catenary loads + load line + readout
    for (let i = 0; i < 8; i++) {
      const x = 1 + 2 * i;
      dw.setArrow(`cl${i}`, [x, M1Y + s.sLS], [x, M1Y + s.sLS * (1 - KF[i])]);
      dw.setLabel(`lbl_cl${i}`, [x + 0.55, M1Y + s.sLS + 0.4]);
      dw.setArrow(`cp${i}`, d.lc[i], d.lc[i + 1]);
      dw.setLabel(`lbl_cp${i}`, [s.a1x - 0.78, (d.lc[i][1] + d.lc[i + 1][1]) / 2]);
      dw.setLabel(`ro_R${i}`, [41.9, 11.75 - 0.72 * i]);
      dw.setText(`ro_R${i}`, `R${SUB[i]} = ${d.Rkn[i].toFixed(1)} kN`);
    }
    dw.setLabel('ro_Rh', [41.9, 12.55]);
    dw.setLabel('tag_cat', [s.a1x + 0.55, s.a1y + 0.55]);
    dw.setLabel('lbl_a1', [s.a1x + 0.55, s.a1y - 0.05]);
    dw.setLabel('lbl_i1', [s.a1x + 0.55, d.lc[8][1] - 0.1]);

    // trial pole + rays + trial funicular
    for (let i = 0; i < 9; i++) dw.setSeg(`mray${i}`, d.M, d.lc[i]);
    dw.setLabel('lbl_M', V.add(d.M, [0.55, 0.3]));
    const tp = [];
    for (let i = 0; i < 9; i++) tp.push([d.Oc[i], d.Oc[i + 1]]);
    dw.setStrokes('trial', tp);
    dw.setLabel('lbl_O', V.add(d.O, [-0.6, -0.3]));
    dw.setLabel('lbl_O1', V.add(d.O1, [0.62, -0.3]));

    // closing + trial chords; parallels through M -> divisions
    dw.setDashLine('close1', [d.O, d.O1]);
    dw.setDashLine('tch3', [d.O, d.Q]);
    dw.setDashLine('tch2', [d.Q, d.O1]);
    dw.setLabel('lbl_c1', V.add(V.mid(d.O, d.O1), [0.35, 0.42]));
    dw.setLabel('lbl_c3', V.add(V.mid(d.O, d.Q), [-0.2, -0.55]));
    dw.setLabel('lbl_c2', V.add(V.mid(d.Q, d.O1), [0.3, -0.55]));
    dw.setLabel('lbl_Q', V.add(d.Q, [0.1, -0.62]));
    dw.setDashLine('mpar1', [d.M, d.qPt]);
    dw.setDashLine('mpar3', [d.M, d.pPt]);
    dw.setDashLine('mpar2', [d.M, d.GPt]);
    dw.setLabel('lbl_m1', V.add(V.mid(d.M, d.qPt), [0.1, 0.5]));
    dw.setLabel('lbl_m3', V.add(V.mid(d.M, d.pPt), [0.1, 0.5]));
    dw.setLabel('lbl_m2', V.add(V.mid(d.M, d.GPt), [0.1, 0.5]));
    dw.setLabel('lbl_i2', V.add(d.qPt, [0.62, 0.28]));
    dw.setLabel('lbl_i1d', V.add(d.pPt, [0.62, 0.28]));
    dw.setLabel('lbl_i3', V.add(d.GPt, [0.62, 0.28]));

    // real chords + connectors -> pole o_1
    dw.setDashLine('chord3', [d.D1, d.D2]);
    dw.setDashLine('chord2', [d.D2, d.D3]);
    dw.setLabel('lbl_ch1', V.add(V.mid(d.D1, d.D3), [-1.3, 0.45]));
    dw.setLabel('lbl_ch3', V.add(V.mid(d.D1, d.D2), [-0.5, -0.4]));
    dw.setLabel('lbl_ch2', V.add(V.mid(d.D2, d.D3), [0.5, -0.4]));
    dw.setDashLine('con1', [d.o1, d.qPt]);
    dw.setDashLine('con3', [d.pPt, d.o1]);
    dw.setDashLine('con2', [d.GPt, d.o1]);
    dw.setLabel('lbl_cn1', V.add(V.mid(d.o1, d.qPt), [0.05, 0.5]));
    dw.setLabel('lbl_cn3', V.add(V.mid(d.pPt, d.o1), [0.35, 0.42]));
    dw.setLabel('lbl_cn2', V.add(V.mid(d.GPt, d.o1), [0.3, -0.5]));
    dw.setLabel('lbl_o1', V.add(d.o1, [0.65, -0.1]));

    // catenary rays + members + numbers
    const fcent = V.mul(V.add(V.add(d.A1, d.lc[8]), d.o1), 1 / 3);
    for (let i = 0; i < 9; i++) {
      dw.setSeg(`cray${i}`, d.o1, d.lc[i]);
      dw.setSeg(`mem${i}`, d.cat[i], d.cat[i + 1]);
      const m = V.mid(d.cat[i], d.cat[i + 1]);
      const pf = V.perp(V.unit(V.sub(d.cat[i + 1], d.cat[i])));
      const sgn = pf[1] < 0 ? 1 : -1;                  // push below the cable
      dw.setLabel(`fn${i}`, V.add(m, V.mul(pf, 0.62 * sgn)));
      const rm = V.add(d.lc[i], V.mul(V.sub(d.o1, d.lc[i]), 0.45));
      const pr = V.perp(V.unit(V.sub(d.lc[i], d.o1)));
      const sg2 = V.dot(pr, V.sub(rm, fcent)) >= 0 ? 1 : -1;
      dw.setLabel(`sn${i}`, V.add(rm, V.mul(pr, 0.5 * sg2)));
    }

    // catenary reactions
    dw.setArrow('reacFA1', d.o1, d.A1);
    dw.setArrow('reacFB1', d.lc[8], d.o1);
    const tA1 = V.add(d.D1, V.mul(d.rA1, s.sRS));
    const tB1 = V.add(d.D3, V.mul(d.rB1, s.sRS));
    dw.setArrow('reacA1', d.D1, tA1);
    dw.setArrow('reacB1', d.D3, tB1);
    // A' / B' arrows nearly coincide with A / B: stagger the labels above
    dw.setLabel('lblRA1_form', V.add(tA1, [-0.5, 1.15]));
    dw.setLabel('lblRB1_form', V.add(tB1, [0.5, 1.15]));
    dw.setLabel('lblRA1_force', V.add(V.mid(d.o1, d.A1), [0.66, 0.15]));
    dw.setLabel('lblRB1_force', V.add(V.mid(d.o1, d.lc[8]), [0.7, 0.1]));

    // pipes + readouts
    for (let i = 0; i < 9; i++) {
      dw.setPoly(`if${i}`, V.rectPoints(d.cat[i], d.cat[i + 1], s.sIF * d.Ns[i]));
      dw.setLabel(`ro_N${i}`, [42.8, 5.05 - 0.72 * i]);
      dw.setText(`ro_N${i}`, `N${SUB[i]} = ${d.Ns[i].toFixed(1)} kN`);
    }
    dw.setLabel('ro_AB', [42.8, -2.9]);
    dw.setText('ro_AB', `A = B = ${d.NA.toFixed(1)} kN`);
    dw.setLabel('ro_AB1', [42.8, -3.65]);
    dw.setText('ro_AB1', `A′ = B′ = ${d.NA1.toFixed(1)} kN`);

    // points + letters
    dw.setDisk('pt_D1', d.D1);
    dw.setDisk('pt_D3', d.D3);
    dw.setDisk('pt_D2', d.D2);
    dw.setLabel('lbl_D1', V.add(d.D1, [-1.05, 0.4]));
    dw.setLabel('lbl_D3', V.add(d.D3, [1.05, 0.4]));
    dw.setLabel('lbl_D2', V.add(d.D2, [0, -0.75]));
    dw.setDisk('pt_a', d.A);
    for (let i = 1; i <= 8; i++) dw.setDisk(`pt_lp${i}`, d.lp[i]);
    dw.setDisk('pt_E', d.E);
    dw.setDisk('pt_F', d.F);
    dw.setDisk('pt_o', d.o);
    for (let i = 0; i < 8; i++) dw.setDisk(`pt_I${i}`, d.I[i]);
    dw.setDisk('pt_a1', d.A1);
    for (let i = 1; i <= 8; i++) dw.setDisk(`pt_lc${i}`, d.lc[i]);
    dw.setDisk('pt_M', d.M);
    dw.setDisk('pt_O', d.O);
    dw.setDisk('pt_Q', d.Q);
    dw.setDisk('pt_q', d.qPt);
    dw.setDisk('pt_p', d.pPt);
    dw.setDisk('pt_G', d.GPt);
    dw.setDisk('pt_o1', d.o1);
    for (let i = 0; i < 8; i++) dw.setDisk(`pt_T${i}`, d.T[i]);
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
  panel.slider(par, s, 'sLS', 'scale load symbol', 0.5, 2, 0.05, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram', 0.5, 2, 0.05, refresh);
  panel.slider(par, s, 'sRS', 'scale reaction symbol', 1, 2, 0.05, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.06, 0.002, refresh);
  panel.toggle(par, s, 'showPts', 'show points', refresh);
  panel.toggle(par, s, 'hideRF', 'hide reaction forces in force diagram', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off): ap 1, 1·2, …, 8·9, ap 2', 0, 10, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS });
    panel.syncAll();
    refresh();
  });

  const hits = [
    ['D1', () => d.D1, 1, RESOLVE + 1], ['D3', () => d.D3, 1, RESOLVE + 1],
    ['D2', () => d.D2, 1, RESOLVE + 1],
    ['a', () => d.A, 2, RESOLVE + 1], ['a1', () => d.A1, 7, RESOLVE + 1],
    ['M', () => d.M, 8, 10], ['O', () => d.O, 8, RESOLVE],
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
      if (name === 'D1') s.d1y = Math.max(s.d2y + 1.2, Math.min(7.2, wy));
      else if (name === 'D3') s.d3y = Math.max(s.d2y + 1.2, Math.min(7.2, wy));
      else if (name === 'D2') s.d2y = Math.max(-11.2, Math.min(Math.min(s.d1y, s.d3y) - 1.2, wy));
      else if (name === 'a') {
        s.ax = Math.max(20, Math.min(31, wx));
        s.ay = Math.max(3.5, Math.min(10, wy));
      } else if (name === 'a1') {
        s.a1x = Math.max(31.5, Math.min(40, wx));
        s.a1y = Math.max(3.5, Math.min(10, wy));
      } else if (name === 'M') {
        s.mx = Math.max(41.5, Math.min(47.4, wx));
        s.my = Math.max(-8, Math.min(9, wy));
      } else if (name === 'O') {
        s.oy = Math.max(-11.4, Math.min(6.5, wy));
      }
      refresh();
    },
  );

  // click a cable node to inspect it; the panel slider stays in sync
  dw.nodeSelect(nodeAt.map((at) => ({ at })), (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
