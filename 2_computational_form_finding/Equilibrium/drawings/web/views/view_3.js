/**
 * Drawing view/3 "Pedestrian Bridge 2" (https://block.arch.ethz.ch/eq/drawing/view/3)
 * as a step-by-step construction: a deck hung from a cable at TWO points --
 * trial funicular, closing string, division point i, true pole o, true cable.
 *
 * Construction math is a live port of view_3/applet_0/geogebra.xml (baked
 * coordinates of view_3_compas.py are the regression reference). Every step
 * draws form (left) and force (right) TOGETHER: each trial-funicular side with
 * its trial ray, each cable segment with its pole ray, the hangers with their
 * load-line segments. Member numbers (5, 2, 3 cables; 4, 1 hangers) and the
 * pole names (o, o', i) follow the original applet.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 3 — Pedestrian Bridge 2',
  subtitle: 'two loads: trial funicular, closing string, true cable',
  about: 'A deck hung from a cable at two points. A trial funicular with an arbitrary pole finds the division point of the load line; the true pole must lie on the parallel to the anchor chord through that point, which makes the cable pass through both anchors. The original applet\'s "symmetric" and "asymmetric" states move the anchors — in the asymmetric one a wedge of the right bank has fractured away.',
  frame: [[-6.8624, -7.3049], [64.4231, 28.3379]],
};

// ---------------------------------------------------------------------------
// static site geometry (baked, from the applet; the right support wall mirrors
// the left one, which only exists in the applet's background image)
// ---------------------------------------------------------------------------

const DECK_Y = 4;
const DECK = [[4, DECK_Y], [16, DECK_Y]];
const SLAB_X = [2.06, 17.91];            // background slab spans bank to bank
const SLAB_H = 0.34;
const BANK_L = [[2.06, 4], [1.6561, 6.2375], [1.9233, 10.1128], [1.7006, 12.6518], [-0.3484, 22.8524]];
const BANK_R = [[17.91, 4], [18.1818, 5.7921], [17.7809, 7.3957], [18.4491, 12.2064],
                [18.5382, 15.1017], [18.0482, 18.888], [15.9101, 21.3379], [16.0437, 22.8078]];
const SUP_L = [[2.06, 4], [4, 4], [4.0831, 1.7728], [4.3369, -1.5692], [4.4215, -2.3306]];
const SUP_R = [[17.94, 4], [16, 4], [15.9169, 1.7728], [15.6631, -1.5692], [15.5785, -2.3306]];
const VY = [-2.2818, 22.8911];           // vertical guide extent
const DIM_Y1 = -3.41, DIM_Y2 = -4.8165, TICK = 0.28;  // dimension rows (applet b_6 / d_6)
const RESOLVE = 15;                      // final step: trial construction retires

function segPairs(poly) {
  const out = [];
  for (let i = 0; i < poly.length - 1; i++) out.push([poly[i], poly[i + 1]]);
  return out;
}

function hatchTicks(poly, gorge, step = 0.85, len = 0.8) {
  const out = [];
  for (let i = 0; i < poly.length - 1; i++) {
    const a = poly[i], b = poly[i + 1];
    const u = V.unit(V.sub(b, a));
    let n = V.perp(u);
    if (V.dot(n, V.sub(V.mid(a, b), gorge)) < 0) n = V.mul(n, -1);
    const t = V.unit(V.add(n, u));
    const l = V.dist(a, b);
    for (let s = step * 0.6; s < l; s += step) {
      const p = V.add(a, V.mul(u, s));
      out.push([p, V.add(p, V.mul(t, len))]);
    }
  }
  return out;
}

const GORGE = [10, 12];
const HATCH = [
  ...hatchTicks(BANK_L, GORGE), ...hatchTicks(BANK_R, GORGE),
  ...hatchTicks(SUP_L, GORGE), ...hatchTicks(SUP_R, GORGE),
];

// "fractured rock" wedge on the right bank face (traced from the applet's
// alternate site image FracturedRock.jpg, world coordinates): in the
// asymmetric state this piece has broken away, so the right anchor sits below
// it and the left anchor climbs to sound rock high on the left bank
const WEDGE = [
  [18.31, 12.52], [18.35, 12.99], [18.42, 13.92], [18.55, 14.05], [19.18, 13.83],
  [19.66, 13.33], [20.33, 12.70], [20.47, 12.21], [20.47, 11.98], [20.11, 11.31],
  [19.83, 11.04], [19.18, 10.70], [18.49, 10.52], [18.22, 10.41], [18.20, 11.22],
  [18.26, 11.80],
];
const closedPairs = (poly) => [...segPairs(poly), [poly[poly.length - 1], poly[0]]];

// scenario anchor presets (the applet's "Symmetric State" / "Asymmetric
// State" buttons: R_1 -> G_2/I_2, S_1 -> H_2/J_2, B_2 -> K_2/P_5, F back
// to 8, rock image swapped)
const ANCHORS_SYM = { R: [1.7973, 11.5498], S: [18.3801, 11.71] };
const ANCHORS_ASYM = { R: [0.2727, 19.7605], S: [18.0537, 9.3595] };

function polyPoint(poly, u) {
  let acc = 0;
  for (let i = 0; i < poly.length - 1; i++) {
    const l = V.dist(poly[i], poly[i + 1]);
    if (u <= acc + l || i === poly.length - 2) {
      const t = Math.max(0, Math.min(1, (u - acc) / l));
      return V.add(poly[i], V.mul(V.sub(poly[i + 1], poly[i]), t));
    }
    acc += l;
  }
  return poly[poly.length - 1];
}

function polyProject(poly, p) {
  let best = { d: Infinity, u: 0 };
  let acc = 0;
  for (let i = 0; i < poly.length - 1; i++) {
    const ab = V.sub(poly[i + 1], poly[i]);
    const l = V.len(ab);
    const t = Math.max(0, Math.min(1, V.dot(V.sub(p, poly[i]), ab) / (l * l)));
    const d = V.dist(p, V.add(poly[i], V.mul(ab, t)));
    if (d < best.d) best = { d, u: acc + t * l };
    acc += l;
  }
  return best.u;
}

const DEFAULTS = {
  l1x: 8, m1x: 12,                                  // load points on the deck
  tR: polyProject(BANK_L, [1.7973, 11.5498]),       // anchor R1 on the left bank
  tS: polyProject(BANK_R, [18.3801, 11.71]),        // anchor S1 on the right bank
  o1x: 46.3339, o1y: 20.9594,                       // top of the load line O1
  tpx: 60.8804, tpy: 7.9474,                        // trial pole o'
  uy: 16.353,                                       // trial start U1 on R1's vertical
  poleT: -11.9268,                                  // pole o along the chord parallel
  vt: -18.5,                                        // resultant arrow along its line of action (applet K3)
  F: 8,                                             // each load [5, 20] kN
  sFD: 0.75,                                        // scaleForceDiagram [0.5, 5] kN/unit
  sLS: 2,                                           // loadSymbol [1, 3]
  sIF: 0.06,                                        // scaleInternalForces [0, 0.05]
  sOff: 0.4,                                        // scaleOffset [0.001, 1] (green arrows beside the polygon)
  o1: true,                                        // "show internal forces"
  n4: true,                                         // "show points"
  dims: true,                                       // "show dimensions" (applet u_4, default true)
  fractured: false,                                 // "show fractured rock" (applet o_2)
  node: 0,                                          // node-equilibrium inspector (0 = off)
};

// every construction move happens on BOTH sides at once
const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The site', d: 'two rock banks, the deck between them, cable anchors R₁ and S₁' },
  { t: 'The loads — in both diagrams', d: 'left: two equal loads F at L₁ and M₁ — right: stacked head-to-tail on the load line O₁→P₁→Q₁' },
  { t: 'Trial pole o′', d: 'right: place a trial pole o′ anywhere — it will be corrected later' },
  { t: 'Trial ray o′–Q₁', d: 'right: ray from o′ to Q₁ — left: start at U₁ on R₁\'s vertical, parallel to it up to L₁\'s vertical' },
  { t: 'Trial ray o′–P₁', d: 'right: ray from o′ to P₁ — left: continue parallel to it up to M₁\'s vertical' },
  { t: 'Trial ray o′–O₁', d: 'right: ray from o′ to O₁ — left: continue parallel to it up to S₁\'s vertical' },
  { t: 'The resultant, located', d: 'both sides at once: extend the outer trial strings — they meet on R\'s line of action (left), and R = O₁→Q₁ on the load line (right), both dashed green' },
  { t: 'Trial closing string', d: 'left: dashed string U₁–Z₁ — right: the parallel through o′ cuts the load line at i' },
  { t: 'The real chord → pole o', d: 'left: dashed chord R₁–S₁ — right: through i, parallel to the chord; choose the pole o on it' },
  { t: 'Cable 5 — form and force', d: 'right: Q₁–o — left: from R₁ parallel to it, down to L₁\'s vertical → node C₂' },
  { t: 'Cable 2 — form and force', d: 'right: o–P₁ — left: from C₂ parallel to it → node D₂ on M₁\'s vertical' },
  { t: 'Cable 3 — form and force', d: 'right: o–O₁ — left: D₂–S₁ closes the funicular, parallel to it — the outer cables extended also meet on R\'s line of action' },
  { t: 'Hangers 4 and 1', d: 'left: hang the deck: C₂–L₁ (4), D₂–M₁ (1) — right: their forces are the load segments P₁–Q₁ (4), O₁–P₁ (1)' },
  { t: 'Reactions', d: 'left: the cable pulls the anchors outward — right: the same vectors Q₁→o and o→O₁ close the polygon' },
  { t: 'Tension', d: 'the trial construction disappears — closed polygon = equilibrium, cable and hangers resolve pink = tension' },
];

const cache = {
  V1: [8, 19.9013], W1: [12, 19.2563], Z1: [18.3801, 13.5492],
  A2: [46.3339, 10.4068], C2: [8, 6.0025], D2: [12, 6.0028],
  R5: [10, 21.0454], H3: [10, 4.2142],
};
const DN = [0, 1];

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const L1 = [s.l1x, DECK_Y], M1 = [s.m1x, DECK_Y];
  const R1 = polyPoint(BANK_L, s.tR), S1 = polyPoint(BANK_R, s.tS);
  const O1 = [s.o1x, s.o1y];
  const P1 = [s.o1x, s.o1y - s.F / s.sFD];
  const Q1 = [s.o1x, s.o1y - 2 * s.F / s.sFD];
  const Tp = [s.tpx, s.tpy];
  const U1 = [R1[0], s.uy];

  // trial funicular: one side per trial ray
  cache.V1 = V.intersect(U1, V.sub(Tp, Q1), [s.l1x, 0], DN) || cache.V1;
  const V1 = cache.V1;
  cache.W1 = V.intersect(V1, V.sub(Tp, P1), [s.m1x, 0], DN) || cache.W1;
  const W1 = cache.W1;
  cache.Z1 = V.intersect(W1, V.sub(O1, Tp), [S1[0], 0], DN) || cache.Z1;
  const Z1 = cache.Z1;

  // the outer trial strings extended meet at R5 on the resultant's line of
  // action (applet R_5 = a_1 ∩ c_1); the dashed green R is drawn on it
  cache.R5 = V.intersect(U1, V.sub(Tp, Q1), W1, V.sub(O1, Tp)) || cache.R5;
  const R5 = cache.R5;
  const Rv = [R5[0], R5[1] + s.vt];

  // closing string -> division point i; chord parallel -> pole o
  cache.A2 = V.intersect(Tp, V.sub(Z1, U1), O1, DN) || cache.A2;
  const A2 = cache.A2;
  const uch = V.unit(V.sub(S1, R1));
  const B2 = V.add(A2, V.mul(uch, s.poleT));

  // true funicular
  cache.C2 = V.intersect(R1, V.sub(B2, Q1), [s.l1x, 0], DN) || cache.C2;
  const C2 = cache.C2;
  cache.D2 = V.intersect(C2, V.sub(P1, B2), [s.m1x, 0], DN) || cache.D2;
  const D2 = cache.D2;

  // final state: the outer REAL strings extended meet at H3 on the same line
  // of action (applet H_3 = m_1 ∩ p_1, with extensions t_7 / a_8)
  cache.H3 = V.intersect(R1, V.sub(B2, Q1), D2, V.sub(O1, B2)) || cache.H3;
  const H3 = cache.H3;

  const col = (w) => (V.isCompression(w) ? PAL.blue : PAL.red);
  const c5 = col(V.ggbAngle(V.sub(R1, C2), V.sub(B2, Q1)));
  const c2 = col(V.ggbAngle(V.sub(D2, C2), V.sub(P1, B2)));
  const c3 = col(V.ggbAngle(V.sub(S1, D2), V.sub(O1, B2)));
  const c4 = col(V.ggbAngle(V.sub(C2, L1), V.sub(P1, Q1)));
  const c1 = col(V.ggbAngle(V.sub(D2, M1), V.sub(O1, P1)));

  const fcent = V.mul(V.add(V.add(O1, Q1), B2), 1 / 3);
  const N5 = V.dist(Q1, B2) * s.sFD;
  const N2 = V.dist(B2, P1) * s.sFD;
  const N3 = V.dist(B2, O1) * s.sFD;

  return { L1, M1, R1, S1, O1, P1, Q1, Tp, U1, V1, W1, Z1, A2, B2, C2, D2,
           R5, Rv, H3, uch, fcent, c1, c2, c3, c4, c5, N5, N2, N3 };
}

/** Arrow drawn beside (not on) a force segment, pushed away from `cent`. */
function beside(a, b, cent, off = 0.66) {
  const u = V.unit(V.sub(b, a));
  const p = V.perp(u);
  const sgn = V.dot(p, V.sub(V.mid(a, b), cent)) >= 0 ? 1 : -1;
  const o = V.mul(p, off * sgn);
  return [V.add(a, o), V.add(b, o)];
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);

  const memberColor = (key) => ({ pending: PAL.black, final: (dd) => dd[key] });
  const W_BAR = 0.24, W_SITE = 0.14, W_RAY = 0.11, W_TRIAL = 0.16;
  const ARROW = { w: 0.29, headLen: 0.9, headW: 0.34 };

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('form_sub', '1 unit :: 1 m', { flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', intro: 2, flash: false });
  dw.label('force_sub', '', { intro: 2, flash: false });

  // step 1: the site (background first: banks, walls, slab, hatching, anchors)
  dw.strokes('bankL', BANK_L.length - 1, { intro: 1, w: W_SITE });
  dw.strokes('bankR', BANK_R.length - 1, { intro: 1, w: W_SITE });
  dw.strokes('supL', SUP_L.length - 1, { intro: 1, w: W_SITE });
  dw.strokes('supR', SUP_R.length - 1, { intro: 1, w: W_SITE });
  dw.strokes('hatch', HATCH.length, { intro: 1, w: 0.055, color: 0xb9b9b9, flash: false });
  dw.poly('slab', 4, { intro: 1, color: PAL.white, flash: false });
  dw.strokes('slabEdge', 4, { intro: 1, w: W_SITE });
  // "fractured rock" (asymmetric state): broken-off wedge on the right bank
  const frOn = (st) => st.fractured;
  dw.poly('wedge', WEDGE.length, { intro: 1, color: 0x8f8f8f, opacity: 0.55, flash: false, when: frOn });
  dw.strokes('wedgeEdge', WEDGE.length, { intro: 1, w: 0.07, color: 0x6f6f6f, flash: false, when: frOn });
  // dimension lines (the applet's "show dimensions" u_4, default on): the
  // overall "12 m" span with the site, the three "4 m" spans with the loads
  const dimsOn = (st) => st.dims;
  dw.strokes('dimBot', 3, { intro: 1, w: 0.07, color: PAL.grey, flash: false, when: dimsOn });
  dw.label('dimL', '12 m', { intro: 1, flash: false, color: PAL.grey, when: dimsOn });
  dw.strokes('dimTop', 7, { intro: 2, w: 0.07, color: PAL.grey, flash: false, when: dimsOn });
  dw.label('dim1', '', { intro: 2, flash: false, color: PAL.grey, when: dimsOn });
  dw.label('dim2', '', { intro: 2, flash: false, color: PAL.grey, when: dimsOn });
  dw.label('dim3', '', { intro: 2, flash: false, color: PAL.grey, when: dimsOn });
  // the site is background: it appears instantly, only the construction draws in
  dw.instant('bankL', 'bankR', 'supL', 'supR', 'hatch', 'slab', 'slabEdge',
             'dimBot', 'dimTop', 'wedge', 'wedgeEdge');

  // step 2: the loads, drawn simultaneously left (deck) and right (load line)
  dw.dashLine('vL', { intro: 2, dash: 0.5 });
  dw.dashLine('vM', { intro: 2, dash: 0.5 });
  dw.arrow('loadL', { intro: 2, ...ARROW });
  dw.arrow('loadM', { intro: 2, ...ARROW });
  dw.dashLine('vLoad', { intro: 2, dash: 0.5 });
  dw.arrow('aload1', { intro: 2, ...ARROW });
  dw.arrow('aload2', { intro: 2, ...ARROW });
  // the applet labels the loads on-canvas in BOTH diagrams (u/v captions
  // F_2/F_1 on the form vectors, w_4/p_4 captions F_1/F_2 on the load line)
  dw.label('lfF2', 'F₂', { cls: 'num', intro: 2, color: PAL.green });
  dw.label('lfF1', 'F₁', { cls: 'num', intro: 2, color: PAL.green });
  dw.label('lsF1', 'F₁', { cls: 'num', intro: 2, color: PAL.green });
  dw.label('lsF2', 'F₂', { cls: 'num', intro: 2, color: PAL.green });

  // steps 4-6: trial rays (right) with the trial funicular sides (left),
  // all grey as in the applet
  dw.dashLine('vR', { intro: 4, dash: 0.5 });
  dw.seg('ray1', { intro: 4, outro: RESOLVE, w: W_RAY, color: PAL.grey });
  dw.seg('tf1', { intro: 4, outro: RESOLVE, w: W_TRIAL, color: PAL.grey });
  dw.seg('ray2', { intro: 5, outro: RESOLVE, w: W_RAY, color: PAL.grey });
  dw.seg('tf2', { intro: 5, outro: RESOLVE, w: W_TRIAL, color: PAL.grey });
  dw.dashLine('vS', { intro: 6, dash: 0.5 });
  dw.seg('ray3', { intro: 6, outro: RESOLVE, w: W_RAY, color: PAL.grey });
  dw.seg('tf3', { intro: 6, outro: RESOLVE, w: W_TRIAL, color: PAL.grey });

  // step 7: the resultant, in BOTH diagrams (applet R_5 / r_7 / s_7 / l_3):
  // outer trial strings extended (grey dashed) meet at R5 on R's line of
  // action; the thick dashed green R on it (left) and on the load line (right)
  dw.dashLine('uext1', { intro: 7, outro: RESOLVE, dash: 0.5 });
  dw.dashLine('uext3', { intro: 7, outro: RESOLVE, dash: 0.5 });
  dw.dashLine('resGuide', { intro: 7, dash: 0.5 });
  dw.dashArrow('resArrow', { intro: 7, w: 0.4, headLen: 1.3, headW: 0.5, dash: 0.66 });
  dw.dashArrow('resFormArrow', { intro: 7, w: 0.4, headLen: 1.3, headW: 0.5, dash: 0.66 });
  dw.label('lblRf', 'R', { cls: 'num', intro: 7, color: PAL.green });
  dw.label('lblRm', 'R', { cls: 'num', intro: 7, color: PAL.green });

  // step 8: trial closing string (left) -> division point i (right)
  dw.dashLine('tclose', { intro: 8, outro: RESOLVE, dash: 0.5 });
  dw.dashLine('tpar', { intro: 8, outro: RESOLVE, dash: 0.5 });

  // step 9: the real chord (left) -> pole o on the parallel through i (right),
  // both BLACK dashed as in the applet (e_1 / k_1)
  dw.dashLine('chord', { intro: 9, color: PAL.black, dash: 0.5 });
  dw.dashLine('polePar', { intro: 9, color: PAL.black, dash: 0.5 });

  // steps 10-12: each cable segment (left) with its pole ray = force (right)
  dw.seg('force5', { intro: 10, w: W_BAR, color: memberColor('c5') });
  dw.seg('cable5', { intro: 10, w: W_BAR, color: memberColor('c5') });
  dw.seg('force2', { intro: 11, w: W_BAR, color: memberColor('c2') });
  dw.seg('cable2', { intro: 11, w: W_BAR, color: memberColor('c2') });
  dw.seg('force3', { intro: 12, w: W_BAR, color: memberColor('c3') });
  dw.seg('cable3', { intro: 12, w: W_BAR, color: memberColor('c3') });
  // with cable 3 the funicular is complete: the outer real strings extended
  // (applet t_7 / a_8) relocate the resultant's intersection to H3
  dw.dashLine('hext5', { intro: 12, dash: 0.5 });
  dw.dashLine('hext3', { intro: 12, dash: 0.5 });

  // step 13: hangers (left) with their load-line segments (right)
  dw.seg('hang4', { intro: 13, w: W_BAR, color: memberColor('c4') });
  dw.seg('hang1', { intro: 13, w: W_BAR, color: memberColor('c1') });
  dw.seg('force4', { intro: 13, w: W_BAR, color: memberColor('c4') });
  dw.seg('force1', { intro: 13, w: W_BAR, color: memberColor('c1') });

  // step 14: reactions at the anchors (left) + beside the polygon (right),
  // captioned A / B like the applet's green anchor vectors
  for (const n of ['arrR', 'arrS', 'aR5', 'aR3']) dw.arrow(n, { intro: 14, ...ARROW });
  dw.label('lfA', 'A', { cls: 'num', intro: 14, color: PAL.green });
  dw.label('lfB', 'B', { cls: 'num', intro: 14, color: PAL.green });
  dw.label('lsA', 'A', { cls: 'num', intro: 14, color: PAL.green });
  dw.label('lsB', 'B', { cls: 'num', intro: 14, color: PAL.green });

  // points: white face + black boundary, light pink while current
  const HANDLE = { r: 0.35 }, DERIVED = { r: 0.27 };
  const show = (st) => st.n4;
  dw.disk('pt_R1', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_S1', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_L1', { intro: 2, ...HANDLE, when: show });
  dw.disk('pt_M1', { intro: 2, ...HANDLE, when: show });
  dw.disk('pt_O1', { intro: 2, ...HANDLE, when: show });
  dw.disk('pt_P1', { intro: 2, ...DERIVED, when: show });
  dw.disk('pt_Q1', { intro: 2, ...DERIVED, when: show });
  dw.disk('pt_Tp', { intro: 3, outro: RESOLVE, ...HANDLE, when: show });
  dw.disk('pt_U1', { intro: 4, outro: RESOLVE, ...HANDLE, when: show });
  dw.disk('pt_V1', { intro: 4, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_W1', { intro: 5, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_Z1', { intro: 6, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_R5', { intro: 7, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_Rv', { intro: 7, ...HANDLE, when: show });
  dw.disk('pt_A2', { intro: 8, ...DERIVED, when: show });
  dw.disk('pt_B2', { intro: 9, ...HANDLE, when: show });
  dw.disk('pt_C2', { intro: 10, ...DERIVED, when: show });
  dw.disk('pt_D2', { intro: 11, ...DERIVED, when: show });
  dw.disk('pt_H3', { intro: 12, ...DERIVED, when: show });

  const letters = {
    R1: ['R₁', 1], S1: ['S₁', 1], L1: ['L₁', 2], M1: ['M₁', 2],
    O1: ['O₁', 2], P1: ['P₁', 2], Q1: ['Q₁', 2],
    Tp: ['o′', 3, RESOLVE], A2: ['i', 8], B2: ['o', 9], C2: ['C₂', 10], D2: ['D₂', 11],
  };
  for (const [p, [text, intro, outro]] of Object.entries(letters)) {
    dw.label(`lbl_${p}`, text, { cls: 'point', intro, outro, when: show });
  }

  // member numbers: the same number appears on BOTH sides in the same step
  const numbers = { f5: [10, '5', 'c5'], f2: [11, '2', 'c2'], f3: [12, '3', 'c3'],
                    f4: [13, '4', 'c4'], f1: [13, '1', 'c1'],
                    s5: [10, '5', 'c5'], s2: [11, '2', 'c2'], s3: [12, '3', 'c3'],
                    s4: [13, '4', 'c4'], s1: [13, '1', 'c1'] };
  for (const [name, [intro, text, ck]] of Object.entries(numbers)) {
    dw.label(name, text, { cls: 'num', intro, color: { final: (dd) => dd[ck] } });
  }

  // dual pairs: hovering a member highlights its force-diagram counterpart
  dw.link('cable5', 'force5', 'f5', 's5');
  dw.link('cable2', 'force2', 'f2', 's2');
  dw.link('cable3', 'force3', 'f3', 's3');
  dw.link('hang4', 'force4', 'f4', 's4');
  dw.link('hang1', 'force1', 'f1', 's1');
  dw.link('loadL', 'aload2', 'lfF2', 'lsF2');
  dw.link('loadM', 'aload1', 'lfF1', 'lsF1');
  dw.link('tf1', 'ray1');
  dw.link('tf2', 'ray2');
  dw.link('tf3', 'ray3');
  dw.link('tclose', 'tpar');
  dw.link('chord', 'polePar');
  dw.link('arrR', 'aR5', 'lfA', 'lsA');
  dw.link('arrS', 'aR3', 'lfB', 'lsB');
  dw.link('resArrow', 'resFormArrow', 'resGuide', 'lblRf', 'lblRm');
  dw.ghostable('force1', 'force2', 'force3', 'force4', 'force5', 'aload1', 'aload2',
               'resArrow', 'aR5', 'aR3');

  // final step: magnitude readout + optional internal forces
  dw.label('ro5', '', { intro: RESOLVE, flash: false, color: { final: (dd) => dd.c5 } });
  dw.label('ro2', '', { intro: RESOLVE, flash: false, color: { final: (dd) => dd.c2 } });
  dw.label('ro3', '', { intro: RESOLVE, flash: false, color: { final: (dd) => dd.c3 } });
  const IF = { if5: ['C2', 'R1', 'N5', 'c5'], if2: ['C2', 'D2', 'N2', 'c2'],
               if3: ['D2', 'S1', 'N3', 'c3'], if4: ['L1', 'C2', null, 'c4'],
               if1: ['M1', 'D2', null, 'c1'] };
  for (const [n, [, , , ck]] of Object.entries(IF)) {
    dw.poly(n, 4, {
      intro: RESOLVE, opacity: 0.45, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd[ck] },
      when: (st) => st.o1,
    });
  }

  // node-equilibrium inspector (the applets' mode 2): free-body star of the
  // selected node in an inset at the top + the same forces tip-to-tail on the
  // node's sub-polygon of the force diagram. Cable nodes C2/D2 close a
  // triangle {hanger load edge, next cable ray, previous cable ray}; anchors
  // R1/S1 and load points L1/M1 degenerate to member force + reaction/load.
  dw.nodeInspector(3, { when: (st) => st.node > 0, w: 0.36, headLen: 1.2, headW: 0.45, r: 0.33 });
  // node 7 = the applet's resultant node: at H₃ (outer real cables extended
  // meet on R's line of action) the three forces R, A and B balance
  const NODE_NAMES = ['R₁', 'C₂', 'D₂', 'S₁', 'L₁', 'M₁', 'R at H₃'];
  const NODE_DISKS = ['pt_R1', 'pt_C2', 'pt_D2', 'pt_S1', 'pt_L1', 'pt_M1', 'pt_H3'];
  const nodeAt = [() => d.R1, () => d.C2, () => d.D2, () => d.S1, () => d.L1, () => d.M1,
                  () => d.H3];
  // anchor reactions use the SAME offset geometry as the visible green arrows
  // aR5/aR3 (beside the polygon), so the black highlight lands exactly on
  // them; member forces stay on the polygon (offsetting a side translates it —
  // its vector, hence the free-body star, is unchanged)
  // offset of the green vectors beside the polygon = the applet's scaleOffset
  // slider (visible, default 0.4; 0.66 world units at the default)
  const bes = (a, b, off = 1.65 * s.sOff) => beside(a, b, d.fcent, off);
  const nodePolys = () => [
    [[d.B2, d.Q1], bes(d.Q1, d.B2)],
    [[d.P1, d.Q1], [d.Q1, d.B2], [d.B2, d.P1]],
    [[d.O1, d.P1], [d.P1, d.B2], [d.B2, d.O1]],
    [[d.O1, d.B2], beside(d.B2, d.O1, d.fcent)],
    [[d.P1, d.Q1], [d.Q1, d.P1]],
    [[d.O1, d.P1], [d.P1, d.O1]],
    [[d.O1, d.Q1], bes(d.Q1, d.B2), bes(d.B2, d.O1)],
  ];

  function updateNode() {
    const j = Math.max(0, Math.min(NODE_DISKS.length - 1, Math.round(s.node) - 1));
    dw.selectDisk(s.node > 0 ? NODE_DISKS[j] : null);
    dw.setNodeInspector([27, 23.2], 3.6, `node ${NODE_NAMES[j]}`, nodePolys()[j]);
  }

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [4, 27.2]);
    dw.setLabel('form_sub', [4, 25.8]);
    dw.setLabel('force_title', [44, 27.2]);
    dw.setLabel('force_sub', [44, 25.8]);
    dw.setText('force_sub', `1 unit :: ${s.sFD.toFixed(2)} kN`);

    dw.setStrokes('bankL', segPairs(BANK_L));
    dw.setStrokes('bankR', segPairs(BANK_R));
    dw.setStrokes('supL', segPairs(SUP_L));
    dw.setStrokes('supR', segPairs(SUP_R));
    dw.setStrokes('hatch', HATCH);
    dw.setPoly('wedge', WEDGE);
    dw.setStrokes('wedgeEdge', closedPairs(WEDGE));
    const [x0, x1] = SLAB_X;
    const [yb, yt] = [DECK_Y - SLAB_H / 2, DECK_Y + SLAB_H / 2];
    dw.setPoly('slab', [[x0, yb], [x1, yb], [x1, yt], [x0, yt]]);
    dw.setStrokes('slabEdge', [
      [[x0, yb], [x1, yb]], [[x1, yb], [x1, yt]], [[x1, yt], [x0, yt]], [[x0, yt], [x0, yb]],
    ]);

    // dimension lines: overall span below, thirds split at L1 / M1 above
    const [dx0, dx1] = [DECK[0][0], DECK[1][0]];
    const vt = (x, y) => [[x, y - TICK], [x, y + TICK]];
    dw.setStrokes('dimBot', [[[dx0, DIM_Y2], [dx1, DIM_Y2]], vt(dx0, DIM_Y2), vt(dx1, DIM_Y2)]);
    dw.setStrokes('dimTop', [
      [[dx0, DIM_Y1], [s.l1x, DIM_Y1]], [[s.l1x, DIM_Y1], [s.m1x, DIM_Y1]],
      [[s.m1x, DIM_Y1], [dx1, DIM_Y1]],
      vt(dx0, DIM_Y1), vt(s.l1x, DIM_Y1), vt(s.m1x, DIM_Y1), vt(dx1, DIM_Y1),
    ]);
    dw.setLabel('dimL', [(dx0 + dx1) / 2, DIM_Y2 - 0.85]);
    dw.setLabel('dim1', [(dx0 + s.l1x) / 2, DIM_Y1 + 0.8]);
    dw.setLabel('dim2', [(s.l1x + s.m1x) / 2, DIM_Y1 + 0.8]);
    dw.setLabel('dim3', [(s.m1x + dx1) / 2, DIM_Y1 + 0.8]);
    const dm = (v) => `${(Math.round(v * 10) / 10).toString()} m`;
    dw.setText('dim1', dm(s.l1x - dx0));
    dw.setText('dim2', dm(s.m1x - s.l1x));
    dw.setText('dim3', dm(dx1 - s.m1x));

    dw.setDashLine('vL', [[s.l1x, VY[0]], [s.l1x, VY[1]]]);
    dw.setDashLine('vM', [[s.m1x, VY[0]], [s.m1x, VY[1]]]);
    dw.setArrow('loadL', d.L1, [s.l1x, DECK_Y - s.sLS]);
    dw.setArrow('loadM', d.M1, [s.m1x, DECK_Y - s.sLS]);
    dw.setDashLine('vLoad', [[s.o1x, VY[0]], [s.o1x, VY[1]]]);
    dw.setArrow('aload1', ...bes(d.O1, d.P1));
    dw.setArrow('aload2', ...bes(d.P1, d.Q1));
    dw.setLabel('lfF2', [s.l1x - 0.85, DECK_Y - s.sLS + 0.35]);
    dw.setLabel('lfF1', [s.m1x + 0.85, DECK_Y - s.sLS + 0.35]);
    dw.setLabel('lsF1', V.add(V.mid(...bes(d.O1, d.P1)), [1.05, 0]));
    dw.setLabel('lsF2', V.add(V.mid(...bes(d.P1, d.Q1)), [1.05, 0]));

    dw.setDashLine('vR', [[d.R1[0], VY[0]], [d.R1[0], VY[1]]]);
    dw.setDashLine('vS', [[d.S1[0], VY[0]], [d.S1[0], VY[1]]]);
    dw.setSeg('ray1', d.Q1, d.Tp);
    dw.setSeg('ray2', d.P1, d.Tp);
    dw.setSeg('ray3', d.Tp, d.O1);
    dw.setSeg('tf1', d.U1, d.V1);
    dw.setSeg('tf2', d.V1, d.W1);
    dw.setSeg('tf3', d.W1, d.Z1);

    // the resultant: outer trial strings extended to R5, R dashed green on
    // its line of action (left) and on the full load line (right)
    dw.setDashLine('uext1', [d.V1, d.R5]);
    dw.setDashLine('uext3', [d.W1, d.R5]);
    dw.setDashLine('resGuide', [[d.R5[0], VY[0]], [d.R5[0], VY[1]]]);
    dw.setDashArrow('resArrow', d.O1, d.Q1);
    dw.setDashArrow('resFormArrow', d.Rv, V.add(d.Rv, [0, -2 * s.sLS]));
    dw.setLabel('lblRf', V.add(V.mid(d.O1, d.Q1), [-1.5, 2.5]));
    dw.setLabel('lblRm', V.add(d.Rv, [1.2, -s.sLS]));
    // relocated at the final state: the outer real cables extended to H3
    dw.setDashLine('hext5', [d.C2, d.H3]);
    dw.setDashLine('hext3', [d.H3, d.D2]);

    dw.setDashLine('tclose', [d.U1, d.Z1]);
    dw.setDashLine('tpar', [d.Tp, d.A2]);

    dw.setDashLine('chord', [d.R1, d.S1]);
    const pp = V.mul(d.uch, Math.sign(s.poleT) || 1);
    dw.setDashLine('polePar', [V.sub(d.A2, V.mul(pp, 1.4)), V.add(d.B2, V.mul(pp, 5))]);

    dw.setSeg('force5', d.Q1, d.B2);
    dw.setSeg('cable5', d.R1, d.C2);
    dw.setSeg('force2', d.B2, d.P1);
    dw.setSeg('cable2', d.C2, d.D2);
    dw.setSeg('force3', d.B2, d.O1);
    dw.setSeg('cable3', d.D2, d.S1);
    dw.setSeg('hang4', d.C2, d.L1);
    dw.setSeg('hang1', d.D2, d.M1);
    dw.setSeg('force4', d.P1, d.Q1);
    dw.setSeg('force1', d.O1, d.P1);

    const uR = V.unit(V.sub(d.R1, d.C2)), uS = V.unit(V.sub(d.S1, d.D2));
    dw.setArrow('arrR', d.R1, V.add(d.R1, V.mul(uR, s.sLS)));
    dw.setArrow('arrS', d.S1, V.add(d.S1, V.mul(uS, s.sLS)));
    dw.setArrow('aR5', ...bes(d.Q1, d.B2));
    dw.setArrow('aR3', ...bes(d.B2, d.O1));
    const below = (u) => (V.perp(u)[1] <= 0 ? V.perp(u) : V.mul(V.perp(u), -1));
    dw.setLabel('lfA', V.add(V.add(d.R1, V.mul(uR, s.sLS * 0.55)), V.mul(below(uR), 1.0)));
    dw.setLabel('lfB', V.add(V.add(d.S1, V.mul(uS, s.sLS * 0.55)), V.mul(below(uS), 1.0)));
    dw.setLabel('lsA', V.mid(...bes(d.Q1, d.B2, 1.65 * s.sOff + 1.4)));
    dw.setLabel('lsB', V.mid(...bes(d.B2, d.O1, 1.65 * s.sOff + 1.4)));

    for (const p of Object.keys(letters)) dw.setDisk(`pt_${p}`, d[p]);
    for (const p of ['U1', 'V1', 'W1', 'Z1', 'R5', 'Rv', 'H3']) dw.setDisk(`pt_${p}`, d[p]);
    const off = { R1: [-1.2, -0.8], S1: [1.3, -0.8], L1: [-1.0, -0.8], M1: [1.0, -0.8],
                  O1: [1.6, 0.4], P1: [1.7, -0.9], Q1: [1.6, -0.5],
                  Tp: [1.3, 0], A2: [-1.2, 0.5], B2: [-0.4, -1.3], C2: [-1.4, 0.35], D2: [1.4, 0.35] };
    for (const p of Object.keys(letters)) dw.setLabel(`lbl_${p}`, V.add(d[p], off[p]));

    dw.setLabel('f5', V.add(V.mid(d.R1, d.C2), [0.5, 0.9]));
    dw.setLabel('f2', V.add(V.mid(d.C2, d.D2), [0, 0.9]));
    dw.setLabel('f3', V.add(V.mid(d.D2, d.S1), [-0.7, 0.9]));
    dw.setLabel('f4', V.add(V.mid(d.C2, d.L1), [-0.9, 0]));
    dw.setLabel('f1', V.add(V.mid(d.D2, d.M1), [0.9, 0]));
    const inward = (a, b) => {
      const m = V.mid(a, b);
      return V.add(m, V.mul(V.unit(V.sub(d.fcent, m)), 1.1));
    };
    dw.setLabel('s5', inward(d.Q1, d.B2));
    dw.setLabel('s2', V.add(V.mid(d.B2, d.P1), [0, 0.8]));   // o-P1 is ~radial: fixed offset
    dw.setLabel('s3', inward(d.B2, d.O1));
    dw.setLabel('s4', V.add(V.mid(d.P1, d.Q1), [-1.1, 0]));
    dw.setLabel('s1', V.add(V.mid(d.O1, d.P1), [-1.1, 0]));

    dw.setLabel('ro5', [55, 6.8]);
    dw.setLabel('ro2', [55, 5.2]);
    dw.setLabel('ro3', [55, 3.6]);
    dw.setText('ro5', `A = N₅ = ${d.N5.toFixed(1)} kN`);
    dw.setText('ro2', `N₂ = ${d.N2.toFixed(1)} kN`);
    dw.setText('ro3', `B = N₃ = ${d.N3.toFixed(1)} kN`);

    for (const [n, [a, b, mag]] of Object.entries(IF)) {
      const halfw = s.sIF * (mag ? d[mag] : s.F);
      dw.setPoly(n, V.rectPoints(d[a], d[b], halfw));
    }
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

  // the applet's scenario buttons. The pole preset is the applet's own
  // construction: K_2 = left intersection of the circles of radius 12/sFD
  // around Q_1 and O_1 (so both anchor cables carry 12 kN in the symmetric
  // state); the asymmetric state keeps the pole's distance from P_1 along the
  // ray to the current pole (applet P_5), then re-anchors it on the new
  // parallel through i.
  const scenario = (anchors, asym) => () => {
    s.F = 8;
    s.tR = polyProject(BANK_L, anchors.R);
    s.tS = polyProject(BANK_R, anchors.S);
    s.fractured = asym;
    const d0 = compute(s);                       // new anchors, old pole parameter
    const r = 12 / s.sFD;
    const half = V.dist(d0.O1, d0.Q1) / 2;
    const dx = Math.sqrt(Math.max(0, r * r - half * half));
    const K2 = [s.o1x - dx, (d0.O1[1] + d0.Q1[1]) / 2];
    let target = K2;
    if (asym) {
      const u = V.unit(V.sub(d0.B2, d0.P1));
      target = V.add(d0.P1, V.mul(u, V.dist(d0.P1, K2)));
    }
    s.poleT = V.dot(V.sub(target, d0.A2), d0.uch);
    panel.syncAll();
    refresh();
  };
  const scen = panel.section('Scenario');
  panel.button(scen, 'symmetric state', scenario(ANCHORS_SYM, false));
  panel.button(scen, 'asymmetric state', scenario(ANCHORS_ASYM, true));

  const par = panel.section('Parameters');
  panel.slider(par, s, 'F', 'F (each load, kN)', 5, 20, 0.2, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (kN/unit)', 0.5, 5, 0.25, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 1, 3, 0.1, refresh);
  panel.slider(par, s, 'sOff', 'scale offset (green arrows)', 0.05, 1, 0.05, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.15, 0.005, refresh);
  panel.toggle(par, s, 'fractured', 'show fractured rock', refresh);
  panel.toggle(par, s, 'dims', 'show dimensions', refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off): R₁, C₂, D₂, S₁, L₁, M₁, R', 0, 7, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, DEFAULTS);
    panel.syncAll();
    refresh();
  });

  // drag windows [first step, last step) per handle
  const win = { L1: [2, 99], M1: [2, 99], R1: [1, 99], S1: [1, 99], O1: [2, 99],
                Tp: [3, RESOLVE], U1: [4, RESOLVE], Rv: [7, 99], B2: [9, 99] };
  dw.enableDrag(
    (wx, wy, tol) => {
      let best = null;
      for (const name of Object.keys(win)) {
        if (player.k < win[name][0] || player.k >= win[name][1]) continue;
        const dd = Math.hypot(d[name][0] - wx, d[name][1] - wy);
        if (dd < tol) { best = name; tol = dd; }
      }
      return best;
    },
    (name, wx, wy) => {
      if (name === 'L1') s.l1x = Math.max(DECK[0][0] + 0.4, Math.min(s.m1x - 0.8, wx));
      else if (name === 'M1') s.m1x = Math.max(s.l1x + 0.8, Math.min(DECK[1][0] - 0.4, wx));
      else if (name === 'R1') s.tR = polyProject(BANK_L, [wx, wy]);
      else if (name === 'S1') s.tS = polyProject(BANK_R, [wx, wy]);
      else if (name === 'O1') { s.o1x = wx; s.o1y = wy; }
      else if (name === 'Tp') { s.tpx = wx; s.tpy = wy; }
      else if (name === 'U1') s.uy = Math.max(VY[0] + 0.5, Math.min(VY[1] - 0.5, wy));
      else if (name === 'Rv') {
        s.vt = Math.max(VY[0] + 0.5 - d.R5[1], Math.min(VY[1] - 0.5 - d.R5[1], wy - d.R5[1]));
      } else if (name === 'B2') {
        let t = V.dot(V.sub([wx, wy], d.A2), d.uch);
        if (Math.abs(t) < 0.5) t = 0.5 * (Math.sign(t) || -1);
        s.poleT = Math.max(-35, Math.min(35, t));
      }
      refresh();
    },
  );

  // click a node point to inspect it (clicking again deselects); the panel
  // slider stays in sync
  dw.nodeSelect(nodeAt.map((at) => ({ at })), (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
