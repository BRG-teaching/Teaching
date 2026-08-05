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
  about: 'A deck hung from a cable at two points. A trial funicular with an arbitrary pole finds the division point of the load line; the true pole must lie on the parallel to the anchor chord through that point, which makes the cable pass through both anchors.',
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
const RESOLVE = 14;                      // final step: trial construction retires

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
  F: 8,                                             // each load [5, 20] kN
  sFD: 0.75,                                        // scaleForceDiagram [0.5, 5] kN/unit
  sLS: 2,                                           // loadSymbol [1, 3]
  sIF: 0.06,                                        // scaleInternalForces [0, 0.05]
  o1: true,                                        // "show internal forces"
  n4: true,                                         // "show points"
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
  { t: 'Trial closing string', d: 'left: dashed string U₁–Z₁ — right: the parallel through o′ cuts the load line at i' },
  { t: 'The real chord → pole o', d: 'left: dashed chord R₁–S₁ — right: through i, parallel to the chord; choose the pole o on it' },
  { t: 'Cable 5 — form and force', d: 'right: Q₁–o — left: from R₁ parallel to it, down to L₁\'s vertical → node C₂' },
  { t: 'Cable 2 — form and force', d: 'right: o–P₁ — left: from C₂ parallel to it → node D₂ on M₁\'s vertical' },
  { t: 'Cable 3 — form and force', d: 'right: o–O₁ — left: D₂–S₁ closes the funicular, parallel to it' },
  { t: 'Hangers 4 and 1', d: 'left: hang the deck: C₂–L₁ (4), D₂–M₁ (1) — right: their forces are the load segments P₁–Q₁ (4), O₁–P₁ (1)' },
  { t: 'Reactions', d: 'left: the cable pulls the anchors outward — right: the same vectors Q₁→o and o→O₁ close the polygon' },
  { t: 'Tension', d: 'the trial construction disappears — closed polygon = equilibrium, cable and hangers resolve pink = tension' },
];

const cache = {
  V1: [8, 19.9013], W1: [12, 19.2563], Z1: [18.3801, 13.5492],
  A2: [46.3339, 10.4068], C2: [8, 6.0025], D2: [12, 6.0028],
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
           uch, fcent, c1, c2, c3, c4, c5, N5, N2, N3 };
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
  // the site is background: it appears instantly, only the construction draws in
  dw.instant('bankL', 'bankR', 'supL', 'supR', 'hatch', 'slab', 'slabEdge');

  // step 2: the loads, drawn simultaneously left (deck) and right (load line)
  dw.dashLine('vL', { intro: 2, dash: 0.5 });
  dw.dashLine('vM', { intro: 2, dash: 0.5 });
  dw.arrow('loadL', { intro: 2, ...ARROW });
  dw.arrow('loadM', { intro: 2, ...ARROW });
  dw.dashLine('vLoad', { intro: 2, dash: 0.5 });
  dw.arrow('aload1', { intro: 2, ...ARROW });
  dw.arrow('aload2', { intro: 2, ...ARROW });

  // steps 4-6: trial rays (right) with the trial funicular sides (left)
  dw.dashLine('vR', { intro: 4, dash: 0.5 });
  dw.seg('ray1', { intro: 4, outro: RESOLVE, w: W_RAY });
  dw.seg('tf1', { intro: 4, outro: RESOLVE, w: W_TRIAL });
  dw.seg('ray2', { intro: 5, outro: RESOLVE, w: W_RAY });
  dw.seg('tf2', { intro: 5, outro: RESOLVE, w: W_TRIAL });
  dw.dashLine('vS', { intro: 6, dash: 0.5 });
  dw.seg('ray3', { intro: 6, outro: RESOLVE, w: W_RAY });
  dw.seg('tf3', { intro: 6, outro: RESOLVE, w: W_TRIAL });

  // step 7: trial closing string (left) -> division point i (right)
  dw.dashLine('tclose', { intro: 7, outro: RESOLVE, dash: 0.5 });
  dw.seg('tpar', { intro: 7, outro: RESOLVE, w: W_RAY });

  // step 8: the real chord (left) -> pole o on the parallel through i (right)
  dw.dashLine('chord', { intro: 8, dash: 0.5 });
  dw.dashLine('polePar', { intro: 8, dash: 0.5 });

  // steps 9-11: each cable segment (left) with its pole ray = force (right)
  dw.seg('force5', { intro: 9, w: W_BAR, color: memberColor('c5') });
  dw.seg('cable5', { intro: 9, w: W_BAR, color: memberColor('c5') });
  dw.seg('force2', { intro: 10, w: W_BAR, color: memberColor('c2') });
  dw.seg('cable2', { intro: 10, w: W_BAR, color: memberColor('c2') });
  dw.seg('force3', { intro: 11, w: W_BAR, color: memberColor('c3') });
  dw.seg('cable3', { intro: 11, w: W_BAR, color: memberColor('c3') });

  // step 12: hangers (left) with their load-line segments (right)
  dw.seg('hang4', { intro: 12, w: W_BAR, color: memberColor('c4') });
  dw.seg('hang1', { intro: 12, w: W_BAR, color: memberColor('c1') });
  dw.seg('force4', { intro: 12, w: W_BAR, color: memberColor('c4') });
  dw.seg('force1', { intro: 12, w: W_BAR, color: memberColor('c1') });

  // step 13: reactions at the anchors (left) + beside the polygon (right)
  for (const n of ['arrR', 'arrS', 'aR5', 'aR3']) dw.arrow(n, { intro: 13, ...ARROW });

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
  dw.disk('pt_A2', { intro: 7, ...DERIVED, when: show });
  dw.disk('pt_B2', { intro: 8, ...HANDLE, when: show });
  dw.disk('pt_C2', { intro: 9, ...DERIVED, when: show });
  dw.disk('pt_D2', { intro: 10, ...DERIVED, when: show });

  const letters = {
    R1: ['R₁', 1], S1: ['S₁', 1], L1: ['L₁', 2], M1: ['M₁', 2],
    O1: ['O₁', 2], P1: ['P₁', 2], Q1: ['Q₁', 2],
    Tp: ['o′', 3, RESOLVE], A2: ['i', 7], B2: ['o', 8], C2: ['C₂', 9], D2: ['D₂', 10],
  };
  for (const [p, [text, intro, outro]] of Object.entries(letters)) {
    dw.label(`lbl_${p}`, text, { cls: 'point', intro, outro, when: show });
  }

  // member numbers: the same number appears on BOTH sides in the same step
  const numbers = { f5: [9, '5', 'c5'], f2: [10, '2', 'c2'], f3: [11, '3', 'c3'],
                    f4: [12, '4', 'c4'], f1: [12, '1', 'c1'],
                    s5: [9, '5', 'c5'], s2: [10, '2', 'c2'], s3: [11, '3', 'c3'],
                    s4: [12, '4', 'c4'], s1: [12, '1', 'c1'] };
  for (const [name, [intro, text, ck]] of Object.entries(numbers)) {
    dw.label(name, text, { cls: 'num', intro, color: { final: (dd) => dd[ck] } });
  }

  // dual pairs: hovering a member highlights its force-diagram counterpart
  dw.link('cable5', 'force5', 'f5', 's5');
  dw.link('cable2', 'force2', 'f2', 's2');
  dw.link('cable3', 'force3', 'f3', 's3');
  dw.link('hang4', 'force4', 'f4', 's4');
  dw.link('hang1', 'force1', 'f1', 's1');
  dw.link('loadL', 'aload2');
  dw.link('loadM', 'aload1');
  dw.link('tf1', 'ray1');
  dw.link('tf2', 'ray2');
  dw.link('tf3', 'ray3');
  dw.link('tclose', 'tpar');
  dw.link('chord', 'polePar');
  dw.link('arrR', 'aR5');
  dw.link('arrS', 'aR3');
  dw.ghostable('force1', 'force2', 'force3', 'force4', 'force5', 'aload1', 'aload2');

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
    const [x0, x1] = SLAB_X;
    const [yb, yt] = [DECK_Y - SLAB_H / 2, DECK_Y + SLAB_H / 2];
    dw.setPoly('slab', [[x0, yb], [x1, yb], [x1, yt], [x0, yt]]);
    dw.setStrokes('slabEdge', [
      [[x0, yb], [x1, yb]], [[x1, yb], [x1, yt]], [[x1, yt], [x0, yt]], [[x0, yt], [x0, yb]],
    ]);

    dw.setDashLine('vL', [[s.l1x, VY[0]], [s.l1x, VY[1]]]);
    dw.setDashLine('vM', [[s.m1x, VY[0]], [s.m1x, VY[1]]]);
    dw.setArrow('loadL', d.L1, [s.l1x, DECK_Y - s.sLS]);
    dw.setArrow('loadM', d.M1, [s.m1x, DECK_Y - s.sLS]);
    dw.setDashLine('vLoad', [[s.o1x, VY[0]], [s.o1x, VY[1]]]);
    dw.setArrow('aload1', ...beside(d.O1, d.P1, d.fcent));
    dw.setArrow('aload2', ...beside(d.P1, d.Q1, d.fcent));

    dw.setDashLine('vR', [[d.R1[0], VY[0]], [d.R1[0], VY[1]]]);
    dw.setDashLine('vS', [[d.S1[0], VY[0]], [d.S1[0], VY[1]]]);
    dw.setSeg('ray1', d.Q1, d.Tp);
    dw.setSeg('ray2', d.P1, d.Tp);
    dw.setSeg('ray3', d.Tp, d.O1);
    dw.setSeg('tf1', d.U1, d.V1);
    dw.setSeg('tf2', d.V1, d.W1);
    dw.setSeg('tf3', d.W1, d.Z1);
    dw.setDashLine('tclose', [d.U1, d.Z1]);
    dw.setSeg('tpar', d.Tp, d.A2);

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

    dw.setArrow('arrR', d.R1, V.add(d.R1, V.mul(V.unit(V.sub(d.R1, d.C2)), s.sLS)));
    dw.setArrow('arrS', d.S1, V.add(d.S1, V.mul(V.unit(V.sub(d.S1, d.D2)), s.sLS)));
    dw.setArrow('aR5', ...beside(d.Q1, d.B2, d.fcent));
    dw.setArrow('aR3', ...beside(d.B2, d.O1, d.fcent));

    for (const p of Object.keys(letters)) dw.setDisk(`pt_${p}`, d[p]);
    for (const p of ['U1', 'V1', 'W1', 'Z1']) dw.setDisk(`pt_${p}`, d[p]);
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
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  // ------------------------------------------------------------------
  // side panel + dragging
  // ------------------------------------------------------------------

  const view = panel.section('View');
  panel.button(view, 'zoom fit', () => dw.zoomFit());

  const par = panel.section('Parameters');
  panel.slider(par, s, 'F', 'F (each load, kN)', 5, 20, 0.5, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (kN/unit)', 0.5, 5, 0.05, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 1, 3, 0.1, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.15, 0.005, refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, DEFAULTS);
    panel.syncAll();
    refresh();
  });

  // drag windows [first step, last step) per handle
  const win = { L1: [2, 99], M1: [2, 99], R1: [1, 99], S1: [1, 99], O1: [2, 99],
                Tp: [3, RESOLVE], U1: [4, RESOLVE], B2: [8, 99] };
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
      else if (name === 'B2') {
        let t = V.dot(V.sub([wx, wy], d.A2), d.uch);
        if (Math.abs(t) < 0.5) t = 0.5 * (Math.sign(t) || -1);
        s.poleT = Math.max(-35, Math.min(35, t));
      }
      refresh();
    },
  );

  refresh();
  return player;
}
