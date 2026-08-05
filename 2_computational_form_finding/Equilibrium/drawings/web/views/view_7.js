/**
 * Drawing view/7 "Funicular Line Through Three Points 1"
 * (https://block.arch.ethz.ch/eq/drawing/view/7) as a step-by-step
 * construction: four loads, THREE prescribed points E (left wall), N (middle
 * rail), F (right wall). Solved as two chained two-point problems:
 *   span E-N (loads 1-2): trial pole o'1 -> division point i1
 *   span N-F (loads 3-4): trial pole o'2 -> division point i2
 *   pole o = (parallel to chord E-N through i1) ∩ (parallel to N-F through i2)
 * The middle string then passes STRAIGHT through N (no load acts there, so
 * members 3 and 4 are collinear) and the funicular lands exactly on F.
 *
 * Live port of view_7/applet_0/geogebra.xml; the full chain (trial funiculars,
 * division points, pole, all funicular nodes) is regression-checked against
 * the applet's baked coordinates to 4 decimals.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 7 — Funicular Line Through Three Points 1',
  subtitle: 'three prescribed points: two spans, two trials, one pole',
  frame: [[-4.7889, -12.5105], [85.2134, 32.4907]],
};

const WALL_E = [[0, 0], [0, 15]];        // left wall (E slides on it)
const WALL_F = [[40, 0], [40, 15]];      // right wall (F slides on it)
const RAIL = [[20, 0], [20, 19.6]];      // middle rail (N slides on it)
const LOAD_Y = 19.6;                     // the four loads hang from this line
const CLIP_Y = [21.5, -7.5];             // lines of action / span guides extent
const RESOLVE = 23;

const DEFAULTS = {
  ey: 12.5637, fy: 11.8519, ny: 3.7055,             // E, F, N along their rails
  lx: [5.591, 15.121, 26.2105, 35.3048],            // load points on y = 19.6
  th: [Math.atan2(23.5886 - 19.6, 5.2896 - 5.591),  // load directions (to handle)
       Math.atan2(23.5985 - 19.6, 15.2293 - 15.121),
       Math.atan2(23.5384 - 19.6, 25.5112 - 26.2105),
       Math.atan2(23.5803 - 19.6, 35.7015 - 35.3048)],
  i1x: 62.4038, i1y: 24.8229,                       // load line start I1
  z1x: 80.7799, z1y: 14.541,                        // trial pole o'1
  z2x: 80.7799, z2y: 5.4455,                        // trial pole o'2
  tW2: 12.6,                                        // trial start W2 on E's guide
  tJ3: 6.2,                                         // trial start J3 on N's guide
  F: [5, 3.2, 3.8, 3.4],                            // F1..F4 [1, 5] kN
  sFD: 1.7,                                         // scaleForceDiagram [1, 2] units/kN
  sLS: 4,                                           // loadSymbol [1, 5]
  sIF: 0.12,
  o1: true,
  n4: true,
};

// every construction move happens on BOTH sides at once
const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'Three points to pass through', d: 'left: the funicular must pass through E and F on the walls, and through N on the middle rail' },
  { t: 'The four loads', d: 'left: four loads with their lines of action — two act between E and N, two between N and F' },
  { t: 'Span E–N: its load line', d: 'right: stack loads 1 and 2 tip-to-tail: I₁→V₁→W₁ — left: guides through E and N parallel to it' },
  { t: 'Trial pole o′₁', d: 'right: place a trial pole o′₁ for the first span, with rays to I₁, V₁, W₁' },
  { t: 'Trial string ∥ o′₁–I₁', d: 'left: start at W₂ on E\'s guide, parallel to the first ray, up to line of action 1' },
  { t: 'Trial string ∥ o′₁–V₁', d: 'left: continue parallel to the middle ray to line of action 2' },
  { t: 'Trial string ∥ o′₁–W₁', d: 'left: continue parallel to the last ray to N\'s guide' },
  { t: 'Closing → division point i₁', d: 'left: dashed closing — right: the parallel through o′₁ cuts the span load line at i₁' },
  { t: 'Span N–F: its load line', d: 'right: stack loads 3 and 4: W₁→U₂→V₂ — left: guides through N and F parallel to it' },
  { t: 'Trial pole o′₂', d: 'right: place a trial pole o′₂ for the second span, with rays to W₁, U₂, V₂' },
  { t: 'Trial string ∥ o′₂–W₁', d: 'left: start at J₃ on N\'s guide, parallel to the first ray, to line of action 3' },
  { t: 'Trial string ∥ o′₂–U₂', d: 'left: continue parallel to the middle ray to line of action 4' },
  { t: 'Trial string ∥ o′₂–V₂', d: 'left: continue parallel to the last ray to F\'s guide' },
  { t: 'Closing → division point i₂', d: 'left: dashed closing — right: the parallel through o′₂ cuts the span load line at i₂' },
  { t: 'The chords → the pole o', d: 'left: dashed chords E–N and N–F — right: through i₁ ∥ E–N and through i₂ ∥ N–F: they intersect at the pole o' },
  { t: 'Segment 1 — form and force', d: 'right: o–I₁ — left: from E parallel to it → line of action 1' },
  { t: 'Segment 2 — form and force', d: 'right: o–V₁ — left: parallel to it → line of action 2' },
  { t: 'Straight through N', d: 'right: o–W₁ — left: parallel to it, the string passes exactly THROUGH N (no load there: segments 3 and 4 are one line)' },
  { t: 'Segment 5 — form and force', d: 'right: o–U₂ — left: parallel to it → line of action 4' },
  { t: 'Segment 6 — form and force', d: 'right: o–V₂ — left: parallel to it — it lands exactly on F' },
  { t: 'Reactions', d: 'right: the polygon closes with V₂→o and o→I₁ — left: the same pulls appear at F and E' },
  { t: 'Reaction components', d: 'both sides: each reaction splits into a horizontal and a vertical component' },
  { t: 'Tension', d: 'the trial constructions disappear — the funicular through E, N and F resolves red = tension' },
];

const cache = {};
function inter(key, p1, d1, p2, d2) {
  cache[key] = V.intersect(p1, d1, p2, d2) || cache[key] || p1;
  return cache[key];
}

/** Guide through p along u, clipped between the two horizontals. */
function clipGuide(p, u) {
  if (Math.abs(u[1]) < 0.04) return [V.sub(p, V.mul(u, 30)), V.add(p, V.mul(u, 30))];
  const t1 = (CLIP_Y[0] - p[1]) / u[1];
  const t2 = (CLIP_Y[1] - p[1]) / u[1];
  return [V.add(p, V.mul(u, t1)), V.add(p, V.mul(u, t2))];
}

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const E = [0, s.ey], F = [40, s.fy], N = [20, s.ny];
  const Ap = s.lx.map((x) => [x, LOAD_Y]);
  const Hd = s.th.map((t, i) => V.add(Ap[i], V.mul([Math.cos(t), Math.sin(t)], s.sLS)));
  const dir = Hd.map((h, i) => V.unit(V.sub(Ap[i], h)));        // handle -> load point

  // load line, span by span
  const I1 = [s.i1x, s.i1y];
  const V1 = V.add(I1, V.mul(dir[0], s.F[0] * s.sFD));
  const W1 = V.add(V1, V.mul(dir[1], s.F[1] * s.sFD));
  const U2 = V.add(W1, V.mul(dir[2], s.F[2] * s.sFD));
  const V2 = V.add(U2, V.mul(dir[3], s.F[3] * s.sFD));
  const u1 = V.unit(V.sub(W1, I1));                 // span-1 load line direction
  const u2 = V.unit(V.sub(V2, W1));                 // span-2 load line direction

  // span E-N: trial funicular with pole o'1
  const Z1 = [s.z1x, s.z1y];
  const W2 = V.add(E, V.mul(u1, s.tW2));
  const B3 = inter('B3', W2, V.sub(I1, Z1), Ap[0], dir[0]);
  const C3 = inter('C3', B3, V.sub(V1, Z1), Ap[1], dir[1]);
  const D3 = inter('D3', C3, V.sub(W1, Z1), N, u1);
  const O3 = inter('O3', Z1, V.sub(D3, W2), I1, u1);           // division point i1

  // span N-F: trial funicular with pole o'2
  const Z2 = [s.z2x, s.z2y];
  const J3 = V.add(N, V.mul(u2, s.tJ3));
  const K3 = inter('K3', J3, V.sub(W1, Z2), Ap[2], dir[2]);
  const L3 = inter('L3', K3, V.sub(U2, Z2), Ap[3], dir[3]);
  const M3 = inter('M3', L3, V.sub(V2, Z2), F, u2);
  const N3 = inter('N3', Z2, V.sub(M3, J3), W1, u2);           // division point i2

  // the pole: parallels to the two chords through the division points
  const P6 = inter('P6', O3, V.sub(N, E), N3, V.sub(F, N));

  // the funicular through E ... N ... F
  const Q3 = inter('Q3', E, V.sub(I1, P6), Ap[0], dir[0]);
  const R3 = inter('R3', Q3, V.sub(V1, P6), Ap[1], dir[1]);
  const S3 = inter('S3', N, V.sub(W1, P6), Ap[2], dir[2]);     // through N
  const T3 = inter('T3', S3, V.sub(U2, P6), Ap[3], dir[3]);

  const col = (w) => (V.isCompression(w) ? PAL.blue : PAL.red);
  const c1 = col(V.ggbAngle(V.sub(Q3, E), V.sub(P6, I1)));
  const c2 = col(V.ggbAngle(V.sub(R3, Q3), V.sub(P6, V1)));
  const c34 = col(V.ggbAngle(V.sub(N, R3), V.sub(P6, W1)));
  const c5 = col(V.ggbAngle(V.sub(T3, S3), V.sub(P6, U2)));
  const c6 = col(V.ggbAngle(V.sub(F, T3), V.sub(P6, V2)));

  // reactions and their H/V components (Z3, W3 share the pole's x)
  const W3 = [P6[0], I1[1]];
  const Z3 = [P6[0], V2[1]];

  const fcent = V.mul(V.add(V.add(I1, V2), P6), 1 / 3);
  const Ns = [V.dist(P6, I1), V.dist(P6, V1), V.dist(P6, W1),
              V.dist(P6, U2), V.dist(P6, V2)].map((l) => l / s.sFD);

  return { E, F, N, Ap, Hd, dir, I1, V1, W1, U2, V2, u1, u2,
           Z1, W2, B3, C3, D3, O3, Z2, J3, K3, L3, M3, N3, P6,
           Q3, R3, S3, T3, W3, Z3, fcent, c1, c2, c34, c5, c6, Ns };
}

/** Arrow drawn beside (not on) a force segment, pushed away from cent. */
function beside(a, b, cent, off = 0.65) {
  const u = V.unit(V.sub(b, a));
  const p = V.perp(u);
  const sgn = V.dot(p, V.sub(V.mid(a, b), cent)) >= 0 ? 1 : -1;
  const o = V.mul(p, off * sgn);
  return [V.add(a, o), V.add(b, o)];
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, lx: [...DEFAULTS.lx], th: [...DEFAULTS.th], F: [...DEFAULTS.F] };
  let d = compute(s);

  const memberColor = (key) => ({ pending: PAL.black, final: (dd) => dd[key] });
  const W_BAR = 0.29, W_RAY = 0.13, W_STR = 0.22;
  const ARROW = { w: 0.36, headLen: 1.15, headW: 0.43 };
  const cks = ['c1', 'c2', 'c34', 'c34', 'c5', 'c6'];    // per member 1..6
  const rayCk = ['c1', 'c2', 'c34', 'c5', 'c6'];

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // step 1: the rails and the three prescribed points
  dw.dashLine('wallE', { intro: 1, dash: 0.6 });
  dw.dashLine('wallF', { intro: 1, dash: 0.6 });
  dw.dashLine('rail', { intro: 1, dash: 0.6 });

  // step 2: the four loads with their lines of action
  for (let i = 0; i < 4; i++) {
    dw.dashLine(`loa${i}`, { intro: 2, dash: 0.6 });
    dw.arrow(`load${i}`, { intro: 2, ...ARROW });
  }

  // step 3 / 9: the two span load lines (green edges + grey dashed bracket)
  dw.arrow('edge0', { intro: 3, ...ARROW });
  dw.arrow('edge1', { intro: 3, ...ARROW });
  dw.dashArrow('brk1', { intro: 3, outro: RESOLVE, color: PAL.grey,
                         w: 0.34, headLen: 0.001, headW: 0.001, dash: 0.8 });
  dw.dashLine('gE', { intro: 3, outro: RESOLVE, dash: 0.6 });
  dw.dashLine('gN1', { intro: 3, outro: RESOLVE, dash: 0.6 });
  dw.arrow('edge2', { intro: 9, ...ARROW });
  dw.arrow('edge3', { intro: 9, ...ARROW });
  dw.dashArrow('brk2', { intro: 9, outro: RESOLVE, color: PAL.grey,
                         w: 0.34, headLen: 0.001, headW: 0.001, dash: 0.8 });
  dw.dashLine('gN2', { intro: 9, outro: RESOLVE, dash: 0.6 });
  dw.dashLine('gF', { intro: 9, outro: RESOLVE, dash: 0.6 });

  // trial 1 (steps 4-8), all grey, retired at the end
  for (let i = 0; i < 3; i++) {
    dw.seg(`tr1_${i}`, { intro: 4, outro: RESOLVE, w: W_RAY, color: PAL.grey });
    dw.seg(`tf1_${i}`, { intro: 5 + i, outro: RESOLVE, w: W_STR, color: PAL.grey });
    dw.highlight(`tr1_${i}`, [5 + i]);
  }
  dw.dashLine('tclose1', { intro: 8, outro: RESOLVE, dash: 0.6 });
  dw.dashLine('tpar1', { intro: 8, outro: RESOLVE, dash: 0.6 });

  // trial 2 (steps 10-14)
  for (let i = 0; i < 3; i++) {
    dw.seg(`tr2_${i}`, { intro: 10, outro: RESOLVE, w: W_RAY, color: PAL.grey });
    dw.seg(`tf2_${i}`, { intro: 11 + i, outro: RESOLVE, w: W_STR, color: PAL.grey });
    dw.highlight(`tr2_${i}`, [11 + i]);
  }
  dw.dashLine('tclose2', { intro: 14, outro: RESOLVE, dash: 0.6 });
  dw.dashLine('tpar2', { intro: 14, outro: RESOLVE, dash: 0.6 });

  // step 15: chords + pole lines (black dashed), retired at the end
  dw.dashLine('chordEN', { intro: 15, outro: RESOLVE, color: PAL.black, dash: 0.8 });
  dw.dashLine('chordNF', { intro: 15, outro: RESOLVE, color: PAL.black, dash: 0.8 });
  dw.dashLine('poleL1', { intro: 15, outro: RESOLVE, color: PAL.black, dash: 0.8 });
  dw.dashLine('poleL2', { intro: 15, outro: RESOLVE, color: PAL.black, dash: 0.8 });

  // steps 16-20: the five rays and six members (3 and 4 share ray o-W1)
  const rayIntro = [16, 17, 18, 19, 20];
  for (let i = 0; i < 5; i++) {
    dw.seg(`fr${i}`, { intro: rayIntro[i], w: W_BAR, color: memberColor(rayCk[i]) });
  }
  const segIntro = [16, 17, 18, 18, 19, 20];
  for (let i = 0; i < 6; i++) {
    dw.seg(`seg${i}`, { intro: segIntro[i], w: W_BAR, color: memberColor(cks[i]) });
  }

  // step 21: reactions (green, on the closing rays + at the supports)
  dw.arrow('reacF1', { intro: 21, ...ARROW });      // V2 -> o
  dw.arrow('reacF2', { intro: 21, ...ARROW });      // o -> I1
  dw.arrow('reacE', { intro: 21, ...ARROW });
  dw.arrow('reacF', { intro: 21, ...ARROW });

  // step 22: reaction components, both sides
  for (const n of ['cmpV2Z3', 'cmpZ3P6', 'cmpP6W3', 'cmpW3I1',
                   'cmpE1', 'cmpE2', 'cmpF1', 'cmpF2']) {
    dw.arrow(n, { intro: 22, ...ARROW });
  }

  // points
  const HANDLE = { r: 0.45 }, DERIVED = { r: 0.34 };
  const show = (st) => st.n4;
  dw.disk('pt_E', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_F', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_N', { intro: 1, ...HANDLE, when: show });
  for (let i = 0; i < 4; i++) {
    dw.disk(`pt_A${i}`, { intro: 2, ...HANDLE, when: show });
    dw.disk(`pt_R${i}`, { intro: 2, ...HANDLE, when: show });
  }
  dw.disk('pt_I1', { intro: 3, ...HANDLE, when: show });
  dw.disk('pt_V1', { intro: 3, ...DERIVED, when: show });
  dw.disk('pt_W1', { intro: 3, ...DERIVED, when: show });
  dw.disk('pt_U2', { intro: 9, ...DERIVED, when: show });
  dw.disk('pt_V2', { intro: 9, ...DERIVED, when: show });
  dw.disk('pt_Z1', { intro: 4, outro: RESOLVE, ...HANDLE, when: show });
  dw.disk('pt_W2', { intro: 5, outro: RESOLVE, ...HANDLE, when: show });
  dw.disk('pt_B3', { intro: 5, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_C3', { intro: 6, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_D3', { intro: 7, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_O3', { intro: 8, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_Z2', { intro: 10, outro: RESOLVE, ...HANDLE, when: show });
  dw.disk('pt_J3', { intro: 11, outro: RESOLVE, ...HANDLE, when: show });
  dw.disk('pt_K3', { intro: 11, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_L3', { intro: 12, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_M3', { intro: 13, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_N3', { intro: 14, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_P6', { intro: 15, ...DERIVED, when: show });
  dw.disk('pt_Q3', { intro: 16, ...DERIVED, when: show });
  dw.disk('pt_R3', { intro: 17, ...DERIVED, when: show });
  dw.disk('pt_S3', { intro: 18, ...DERIVED, when: show });
  dw.disk('pt_T3', { intro: 19, ...DERIVED, when: show });

  const letters = {
    E: ['E', 1], F: ['F', 1], N: ['N', 1], I1: ['I₁', 3],
    Z1: ['o′₁', 4, RESOLVE], O3: ['i₁', 8, RESOLVE],
    Z2: ['o′₂', 10, RESOLVE], N3: ['i₂', 14, RESOLVE], P6: ['o', 15],
  };
  for (const [p, [text, intro, outro]] of Object.entries(letters)) {
    dw.label(`lbl_${p}`, text, { cls: 'point', intro, outro, when: show });
  }

  // member numbers 1..6 (ray o-W1 carries both 3 and 4)
  const snText = ['1', '2', '3·4', '5', '6'];
  for (let i = 0; i < 6; i++) {
    dw.label(`fn${i}`, `${i + 1}`, { cls: 'num', intro: segIntro[i], color: { final: (dd) => dd[cks[i]] } });
  }
  for (let i = 0; i < 5; i++) {
    dw.label(`sn${i}`, snText[i], { cls: 'num', intro: rayIntro[i],
              color: { final: (dd) => dd[rayCk[i]] } });
  }

  for (let i = 0; i < 5; i++) {
    dw.label(`ro${i}`, '', { intro: RESOLVE, flash: false, color: { final: (dd) => dd[rayCk[i]] } });
  }

  // internal-force pipes (on by default)
  const IF = [['E', 'Q3'], ['Q3', 'R3'], ['R3', 'N'], ['N', 'S3'], ['S3', 'T3'], ['T3', 'F']];
  const ifN = [0, 1, 2, 2, 3, 4];                   // member force index per pipe
  IF.forEach((pair, i) => {
    dw.poly(`if${i}`, 4, {
      intro: RESOLVE, opacity: 0.45, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd[cks[i]] },
      when: (st) => st.o1,
    });
  });

  // dual pairs (yellow hover)
  dw.link('seg0', 'fr0', 'fn0', 'sn0');
  dw.link('seg1', 'fr1', 'fn1', 'sn1');
  dw.link('seg2', 'seg3', 'fr2', 'fn2', 'fn3', 'sn2');
  dw.link('seg4', 'fr3', 'fn4', 'sn3');
  dw.link('seg5', 'fr4', 'fn5', 'sn4');
  for (let i = 0; i < 3; i++) {
    dw.link(`tf1_${i}`, `tr1_${i}`);
    dw.link(`tf2_${i}`, `tr2_${i}`);
  }
  dw.link('tclose1', 'tpar1');
  dw.link('tclose2', 'tpar2');
  dw.link('chordEN', 'poleL1');
  dw.link('chordNF', 'poleL2');
  for (let i = 0; i < 4; i++) dw.link(`load${i}`, `edge${i}`);
  dw.link('reacE', 'reacF2');
  dw.link('reacF', 'reacF1');
  dw.link('cmpE1', 'cmpP6W3');
  dw.link('cmpE2', 'cmpW3I1');
  dw.link('cmpF1', 'cmpV2Z3');
  dw.link('cmpF2', 'cmpZ3P6');
  dw.ghostable('fr0', 'fr1', 'fr2', 'fr3', 'fr4', 'edge0', 'edge1', 'edge2', 'edge3');

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [4.5, 31.6]);
    dw.setLabel('force_title', [61, 31.6]);
    dw.setLabel('force_sub', [61, 29.9]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(2)} kN`);

    dw.setDashLine('wallE', WALL_E);
    dw.setDashLine('wallF', WALL_F);
    dw.setDashLine('rail', RAIL);

    for (let i = 0; i < 4; i++) {
      dw.setDashLine(`loa${i}`, clipGuide(d.Ap[i], d.dir[i]));
      dw.setArrow(`load${i}`, d.Hd[i], d.Ap[i]);
      dw.setDisk(`pt_A${i}`, d.Ap[i]);
      dw.setDisk(`pt_R${i}`, d.Hd[i]);
    }

    dw.setArrow('edge0', d.I1, d.V1);
    dw.setArrow('edge1', d.V1, d.W1);
    dw.setDashArrow('brk1', d.I1, d.W1);
    dw.setDashLine('gE', clipGuide(d.E, d.u1));
    dw.setDashLine('gN1', clipGuide(d.N, d.u1));
    dw.setArrow('edge2', d.W1, d.U2);
    dw.setArrow('edge3', d.U2, d.V2);
    dw.setDashArrow('brk2', d.W1, d.V2);
    dw.setDashLine('gN2', clipGuide(d.N, d.u2));
    dw.setDashLine('gF', clipGuide(d.F, d.u2));

    const t1rays = [[d.I1, d.Z1], [d.V1, d.Z1], [d.W1, d.Z1]];
    const t1str = [[d.W2, d.B3], [d.B3, d.C3], [d.C3, d.D3]];
    const t2rays = [[d.W1, d.Z2], [d.U2, d.Z2], [d.V2, d.Z2]];
    const t2str = [[d.J3, d.K3], [d.K3, d.L3], [d.L3, d.M3]];
    for (let i = 0; i < 3; i++) {
      dw.setSeg(`tr1_${i}`, t1rays[i][0], t1rays[i][1]);
      dw.setSeg(`tf1_${i}`, t1str[i][0], t1str[i][1]);
      dw.setSeg(`tr2_${i}`, t2rays[i][0], t2rays[i][1]);
      dw.setSeg(`tf2_${i}`, t2str[i][0], t2str[i][1]);
    }
    dw.setDashLine('tclose1', [d.W2, d.D3]);
    dw.setDashLine('tpar1', [d.Z1, d.O3]);
    dw.setDashLine('tclose2', [d.J3, d.M3]);
    dw.setDashLine('tpar2', [d.Z2, d.N3]);

    dw.setDashLine('chordEN', [d.E, d.N]);
    dw.setDashLine('chordNF', [d.N, d.F]);
    dw.setDashLine('poleL1', [d.O3, d.P6]);
    dw.setDashLine('poleL2', [d.N3, d.P6]);

    const rayEnds = [d.I1, d.V1, d.W1, d.U2, d.V2];
    for (let i = 0; i < 5; i++) {
      dw.setSeg(`fr${i}`, d.P6, rayEnds[i]);
      const m = V.mid(d.P6, rayEnds[i]);
      dw.setLabel(`sn${i}`, V.add(m, V.mul(V.unit(V.sub(d.fcent, m)), 1.3)));
    }
    const segPts = [[d.E, d.Q3], [d.Q3, d.R3], [d.R3, d.N], [d.N, d.S3], [d.S3, d.T3], [d.T3, d.F]];
    for (let i = 0; i < 6; i++) {
      dw.setSeg(`seg${i}`, segPts[i][0], segPts[i][1]);
      const pf = V.perp(V.unit(V.sub(segPts[i][1], segPts[i][0])));
      dw.setLabel(`fn${i}`, V.add(V.mid(segPts[i][0], segPts[i][1]), V.mul(pf, 1.3)));
    }

    // reactions: beside the closing rays (right) and at the supports (left)
    dw.setArrow('reacF1', ...beside(d.V2, d.P6, d.fcent));
    dw.setArrow('reacF2', ...beside(d.P6, d.I1, d.fcent));
    dw.setArrow('reacE', d.E, V.add(d.E, V.mul(V.unit(V.sub(d.E, d.Q3)), 0.9 * s.sLS)));
    dw.setArrow('reacF', d.F, V.add(d.F, V.mul(V.unit(V.sub(d.F, d.T3)), 0.9 * s.sLS)));

    // components: reaction at E = (o->W3) + (W3->I1); at F = (V2->Z3) + (Z3->o)
    dw.setArrow('cmpP6W3', d.P6, d.W3);
    dw.setArrow('cmpW3I1', d.W3, d.I1);
    dw.setArrow('cmpV2Z3', d.V2, d.Z3);
    dw.setArrow('cmpZ3P6', d.Z3, d.P6);
    const vE1 = V.sub(d.W3, d.P6), vE2 = V.sub(d.I1, d.W3);
    const vF1 = V.sub(d.Z3, d.V2), vF2 = V.sub(d.P6, d.Z3);
    dw.setArrow('cmpE1', V.sub(d.E, vE1), d.E);
    dw.setArrow('cmpE2', V.sub(d.E, vE2), d.E);
    dw.setArrow('cmpF1', V.sub(d.F, vF1), d.F);
    dw.setArrow('cmpF2', V.sub(d.F, vF2), d.F);

    dw.setDisk('pt_E', d.E);
    dw.setDisk('pt_F', d.F);
    dw.setDisk('pt_N', d.N);
    for (const p of ['I1', 'V1', 'W1', 'U2', 'V2', 'Z1', 'W2', 'B3', 'C3', 'D3', 'O3',
                     'Z2', 'J3', 'K3', 'L3', 'M3', 'N3', 'P6', 'Q3', 'R3', 'S3', 'T3']) {
      dw.setDisk(`pt_${p}`, d[p]);
    }

    const off = { E: [-1.7, 0.2], F: [1.7, 0.2], N: [1.5, -0.9], I1: [1.5, 0.7],
                  Z1: [1.6, 0.2], O3: [1.6, 0.5], Z2: [1.6, 0.2], N3: [1.6, 0.5],
                  P6: [1.0, -1.4] };
    for (const p of Object.keys(letters)) dw.setLabel(`lbl_${p}`, V.add(d[p], off[p]));

    const roT = ['N₁', 'N₂', 'N₃ = N₄', 'N₅', 'N₆'];
    for (let i = 0; i < 5; i++) {
      dw.setLabel(`ro${i}`, [75, -4.4 - 1.9 * i]);
      dw.setText(`ro${i}`, `${roT[i]} = ${d.Ns[i].toFixed(1)} kN`);
    }
    IF.forEach((pair, i) => {
      dw.setPoly(`if${i}`, V.rectPoints(d[pair[0]], d[pair[1]], s.sIF * d.Ns[ifN[i]]));
    });
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
  for (let i = 0; i < 4; i++) panel.slider(par, s.F, i, `F${i + 1} (kN)`, 1, 5, 0.1, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 1, 2, 0.05, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 1, 5, 0.5, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.4, 0.01, refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS, lx: [...DEFAULTS.lx], th: [...DEFAULTS.th], F: [...DEFAULTS.F] });
    panel.syncAll();
    refresh();
  });

  const hits = [];
  hits.push(['E', () => d.E, 1, 99], ['F', () => d.F, 1, 99], ['N', () => d.N, 1, 99]);
  for (let i = 0; i < 4; i++) {
    hits.push([`A${i}`, () => d.Ap[i], 2, 99], [`R${i}`, () => d.Hd[i], 2, 99]);
  }
  hits.push(['I1', () => d.I1, 3, 99],
            ['Z1', () => d.Z1, 4, RESOLVE], ['W2', () => d.W2, 5, RESOLVE],
            ['Z2', () => d.Z2, 10, RESOLVE], ['J3', () => d.J3, 11, RESOLVE]);
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
      if (name === 'E') s.ey = Math.max(0.5, Math.min(14.5, wy));
      else if (name === 'F') s.fy = Math.max(0.5, Math.min(14.5, wy));
      else if (name === 'N') s.ny = Math.max(0.5, Math.min(19, wy));
      else if (name === 'I1') { s.i1x = wx; s.i1y = wy; }
      else if (name === 'Z1') { s.z1x = wx; s.z1y = wy; }
      else if (name === 'Z2') { s.z2x = wx; s.z2y = wy; }
      else if (name === 'W2') s.tW2 = V.dot(V.sub([wx, wy], d.E), d.u1);
      else if (name === 'J3') s.tJ3 = V.dot(V.sub([wx, wy], d.N), d.u2);
      else {
        const i = +name.slice(1);
        if (name[0] === 'A') {
          const lo = i < 2 ? 0.5 : 20.5;
          const hi = i < 2 ? 19.5 : 39.5;
          s.lx[i] = Math.max(lo, Math.min(hi, wx));
        } else s.th[i] = Math.atan2(wy - LOAD_Y, wx - s.lx[i]);
      }
      refresh();
    },
  );

  refresh();
  return player;
}
