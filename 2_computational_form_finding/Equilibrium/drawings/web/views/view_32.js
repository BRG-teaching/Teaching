/**
 * Drawing view/32 "Airport Hangar, P. L. Nervi"
 * (https://block.arch.ethz.ch/eq/drawing/view/32) as a step-by-step
 * construction.
 *
 * Nervi's hangar vault spans 36.9 m between the springings and must pass
 * through the crown K -- a three-point funicular problem, solved three
 * times over the same span of 16 strips:
 *   1. UNIFORM dead load (per unit span): two half-span trial funiculars
 *      with poles o1'/o2' give the division points i1/i2; parallels to the
 *      crown chords through them meet at the pole o -> the PARABOLA.
 *   2. TRUE dead load (per unit ARC): circles at the arch vertices measure
 *      every strip chord; the corrected load line is heavier near the
 *      springings -> the pole o1 -> the CATENARY-like arch that hugs the
 *      built section.
 *   3. An extra point load Q on any strip -> the load line R+Q -> the pole
 *      o2 -> the arch reshapes under Q (the final, blue = compression).
 *
 * Live port of view_32/applet_0/geogebra.xml; the full chain (129 points,
 * default + dragged state) matches the LIVE applet to ~1e-13 (scratchpad
 * v32/regress32.py). The applet's embedded section drawing of the built
 * hangar ships as the actual image (assets/view_32_section.jpg, anchors
 * Image1/Image2, alpha 0.75, shown at every step like the original).
 * See notes/view_32_analysis.md.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 32 — Airport Hangar, P. L. Nervi',
  subtitle: 'one vault, three funiculars: parabola, catenary, and the arch under Q',
  about: 'Nervi\'s airport hangar: the vault spans between two springings and must pass through the crown — a three-point funicular problem solved three times. Under a uniform load per unit span, half-span trial funiculars locate the division points and the pole o: the parabola. Measuring the true strip lengths with circles at the arch vertices corrects the load line (heavier near the springings) and gives the catenary-like arch that hugs the built section. An extra load Q on any strip re-poses the problem once more: the arch reshapes and resolves blue, in pure compression.',
  frame: [[-14.4, -16.3], [82.5, 32.2]],
};

const SPAN = 36.9;
const DIV = 16;
const FP0 = [0, 0];                       // left springing
const B = [SPAN, 0];                      // right springing
const K = [18.45, 11.511694446376804];    // the crown (fixed in the applet)
const LOADSYM = SPAN / DIV;               // 2.30625
const GT = 28.284799170069835;            // guide-line extent (N_1 / A rails)
const GB = -16.122742188687486;
const GY = -12.5;                         // ground line
const QY = 21.882795295337523;            // Q arrow foot (ML height)
const XS = [];                            // strip action lines (centers)
for (let k = 0; k < DIV; k++) XS.push(LOADSYM * (k + 0.5));

// the applet's embedded section drawing (anchors Image1/Image2, alpha 0.75)
const IM_BL = [-12.099908418987678, -13.725879199085703];
const IM_BR = [49.22935308841277, -13.910885238408055];
const IM_H = 331 / 746;

const TRIAL_END = 7;                      // trials + chords retire (applet step 3)
const QSTEP = 10;                         // parabola force diagram retires (applet 6)

const DEFAULTS = {
  wd: 1.1,                                // w_d [0.5, 2] load per unit length
  sFD: 0.5,                               // scaleForceDiagram [0.5, 2]
  fQ: 1.5,                                // factorQ [0, 2]
  pQ: 4,                                  // positionQ [1, 16]
  LL0: [65, 30],                          // load-line anchor (free)
  LC0: [65, 8.4],                         // catenary load-line anchor (free)
  ya: 25,                                 // trial start FPa0 on the left wall
  yb: 26.520261102834468,                 // trial start FPb8 on the crown line
  o1p: [77.05230008212244, 24.755723035599075],   // trial pole o1'
  o2p: [76.66018051162567, 16.227122377294695],   // trial pole o2'
  n4: true,                               // show points (applet w_2, default false)
  o3: true,                               // show points 2 (LC ticks, applet default true)
  o4: false,                              // show vectors (LC edge arrows)
  ph: true,                               // show image (applet showImage)
  kc: false,                              // ours: keep the catenary construction
  node: 0,
  _k: 99,
};

// every construction move happens on BOTH sides at once
const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The section: springings and crown', d: 'left: the section of the built hangar; the vault spans 36.9 m between the springings and must pass through the crown K — 16 strips (dotted lines of action)' },
  { t: 'The dead load and the load line', d: 'left: an equal load P_d per strip (uniform per unit SPAN) — right: all 16 stacked tip-to-tail: the load line R' },
  { t: 'Trial funicular — left half', d: 'right: any pole o₁′ with rays to the upper half of the load line — left: from FPa₀ a trial funicular for strips 1–8, its closing chord to the crown line (dashed) — right: the parallel through o₁′ cuts the load line at i₁' },
  { t: 'Trial funicular — right half', d: 'right: a second pole o₂′ for strips 9–16 — left: its trial funicular from the crown line, closing chord to the springing — right: the parallel through o₂′ gives i₂' },
  { t: 'The crown chords → the pole o', d: 'left: the chords springing–crown and crown–springing (dashed) — right: through i₁ and i₂, parallels to the chords meet at the pole o' },
  { t: 'The parabola', d: 'right: rays from o to every load point — left: from the springing, one side per strip parallel to its ray: the funicular passes the crown and lands on the far springing — the PARABOLA' },
  { t: 'Reactions of the parabola', d: 'right: the outer rays close the polygon: A = o→top, B = bottom→o — left: the thrusts push into the springings and run into the foundations (thin lines)' },
  { t: 'The real weight: strip lengths', d: 'left: circles at the arch vertices measure each strip\'s true LENGTH — near the springings the strips are longer, so their loads grow — right: the corrected load line below (uniform per unit ARC)' },
  { t: 'The catenary', d: 'right: the same three-point machinery gives the pole o₁ and its rays — left: the funicular of the corrected loads (dash-dot): the CATENARY-like arch that hugs the built section' },
  { t: 'An extra load Q', d: 'left: a point load Q = factor·P_d on one strip (drag it!) — right: Q widens its slot in the new load line R+Q; the old pole no longer balances it' },
  { t: 'The pole o₂', d: 'right: the divisions i₁, i₂ of the new load line (found with a trial as before); parallels to the crown chords meet at the pole o₂, with rays to every load point' },
  { t: 'The arch under Q', d: 'left: side by side, the funicular of R+Q: through the crown, onto the far springing — but reshaped by Q — right: its sides are parallel to the o₂ rays' },
  { t: 'Reactions', d: 'right: the polygon closes on the outer rays: A = o₂→top, B = bottom→o₂ — left: the thrusts push into the springings' },
  { t: 'Compression', d: 'the arch under Q resolves blue = pure compression; the parabola stays for comparison (black); drag Q along the strips, or the sliders w_d, factorQ — click an arch node for its equilibrium' },
];

const cache = {};
function inter(key, p1, d1, p2, d2) {
  cache[key] = V.intersect(p1, d1, p2, d2) || cache[key] || p1;
  return cache[key];
}
const UP = [0, 1];

// funicular from `start`: side k parallel to (pts[k] - pole), cut at x = xs[k]
function funicular(key, start, pts, xs, pole) {
  const v = [start];
  for (let k = 0; k < xs.length; k++) {
    v.push(inter(`${key}${k}`, v[v.length - 1], V.sub(pts[k], pole), [xs[k], 0], UP));
  }
  return v;
}

function crownCross(key, poly) {
  for (let i = 0; i < poly.length - 1; i++) {
    const a = poly[i], b = poly[i + 1];
    if ((a[0] - 18.45) * (b[0] - 18.45) <= 0 && b[0] > a[0]) {
      return inter(key, a, V.sub(b, a), [18.45, 0], UP);
    }
  }
  return [18.45, 0];
}

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const w = s.wd * SPAN / DIV * s.sFD;

  const LL = [], LLB = [];
  for (let k = 0; k <= DIV; k++) LL.push([s.LL0[0], s.LL0[1] - k * w]);
  LLB.push([s.LL0[0], s.LL0[1]]);
  for (let k = 1; k <= DIV; k++) {
    const e = k === Math.round(s.pQ) ? w * (1 + s.fQ) : w;
    LLB.push([s.LL0[0], LLB[k - 1][1] - e]);
  }

  // --- parabola: two half-span trials -> i1, i2 -> pole o -> arch ---
  const FPa0 = [0, s.ya];
  const va = funicular('va', FPa0, LL.slice(0, 8), XS.slice(0, 8), s.o1p);
  va.push(inter('vaP', va[8], V.sub(LL[8], s.o1p), [18.45, 0], UP));
  const i1 = inter('i1', s.o1p, V.sub(va[9], FPa0), s.LL0, UP);
  const FPb8 = [18.45, s.yb];
  const vb = funicular('vb', FPb8, LL.slice(8, 16), XS.slice(8, 16), s.o2p);
  vb.push(inter('vbQ', vb[8], V.sub(LL[16], s.o2p), [SPAN, 0], UP));
  const i2 = inter('i2', s.o2p, V.sub(vb[9], FPb8), s.LL0, UP);
  const dAK = V.sub(K, FP0), dKB = V.sub(B, K);
  const pole = inter('pole', i1, dAK, i2, dKB);
  const FP = funicular('FP', FP0, LL.slice(0, 16), XS, pole);
  FP.push(B);                                             // lands exactly on B

  // --- corrected (arc-length) loads -> LC line ---
  const ch = [];
  for (let k = 0; k < 16; k++) ch.push(V.dist(FP[k], FP[k + 1]));
  const LC = [[s.LC0[0], s.LC0[1]]];
  LC.push([LC[0][0], LC[0][1] - s.wd * (ch[0] + 0.5 * ch[1]) * s.sFD]);
  for (let k = 2; k <= 8; k++) {
    LC.push([LC[0][0], LC[k - 1][1] - s.wd * 0.5 * (ch[k - 1] + ch[k]) * s.sFD]);
  }
  for (let k = 7; k >= 0; k--) LC.push([LC[0][0], 2 * LC[8][1] - LC[k][1]]);

  // strip measures: at vertex j a circle of radius h_j (half the mirrored chord)
  const half = [];
  for (let j = 1; j <= 16; j++) {
    const m = j <= 8 ? j : 17 - j;
    half.push(m === 8 ? V.dist(FP[8], K) : 0.5 * V.dist(FP[m], FP[m + 1]));
  }

  // --- catenary: hidden trial -> crossings -> pole o1 -> arch ---
  const tp = [88.29279797155068, -9.378939789068438];
  const vD = funicular('vD', [0, -18.649644044375723], LC.slice(0, 16), XS, tp);
  vD.push(inter('vDG', vD[16], V.sub(LC[16], tp), [SPAN, 0], UP));
  const H3 = crownCross('H3', vD);
  const J3 = inter('J3', tp, V.sub(H3, vD[0]), LC[0], UP);
  const I3 = inter('I3', tp, V.sub(vD[17], H3), LC[0], UP);
  const cpole = inter('cpole', J3, dAK, I3, dKB);
  const FPE = funicular('FPE', FP0, LC.slice(0, 16), XS, cpole);
  FPE.push(B);

  // --- the arch under Q: hidden trial -> F1, G1 -> pole o2 -> arch ---
  const pB = [82.61075342797515, 13.124947153250073];
  const vB = funicular('vqB', [0, -16.182440492560072], LLB.slice(0, 16), XS, pB);
  vB.push(inter('vqD', vB[16], V.sub(LLB[16], pB), [SPAN, 0], UP));
  const E1 = crownCross('E1', vB);
  const F1 = inter('F1', pB, V.sub(E1, vB[0]), LLB[0], UP);
  const G1 = inter('G1', pB, V.sub(vB[17], E1), LLB[0], UP);
  const pC = inter('pC', F1, dAK, G1, dKB);
  const FPC = funicular('FPC', FP0, LLB.slice(0, 16), XS, pC);
  FPC.push(B);

  // member FP0->FPC1 pairs the force segment LLB0->pC (the internalForce
  // macro orientation, cf. view_18: springing side = loadline-top -> pole)
  const cA = V.isCompression(V.ggbAngle(V.sub(FPC[1], FP0), V.sub(pC, LLB[0])))
    ? PAL.blue : PAL.red;
  const RA = V.dist(pC, LLB[0]) / s.sFD;
  const RB = V.dist(LLB[16], pC) / s.sFD;
  const Rtot = V.dist(LLB[0], LLB[16]) / s.sFD;

  return { w, LL, LLB, LC, FPa0, va, i1, FPb8, vb, i2, pole, FP, ch, half,
           H3, J3, I3, cpole, FPE, E1, F1, G1, pC, FPC, cA, RA, RB, Rtot };
}

const pairs = (poly) => poly.slice(0, -1).map((p, i) => [p, poly[i + 1]]);

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, LL0: [...DEFAULTS.LL0], LC0: [...DEFAULTS.LC0],
              o1p: [...DEFAULTS.o1p], o2p: [...DEFAULTS.o2p] };
  let d = compute(s);

  const W_BAR = 0.13, W_RAY = 0.035, W_STR = 0.06;
  const ARROW = { w: 0.14, headLen: 0.6, headW: 0.24 };
  const catW = (st) => st._k < QSTEP || st.kc;    // catenary group (keep-toggle)

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // ------------------------------------------------------------------
  // step 1 -- site: the section image + ground + guides + strip lines
  // ------------------------------------------------------------------
  dw.image('photo', 'assets/view_32_section.jpg',
           { corners: [IM_BL, IM_BR, IM_BL], opacity: 0.75, intro: 1,
             when: (st) => st.ph });
  dw.seg('ground', { intro: 1, w: 0.06, color: PAL.black, flash: false });
  for (let k = 0; k < DIV; k++) {
    dw.dashLine(`strip${k}`, { intro: 1, dash: 0.12, color: 0xafafaf, flash: false });
  }
  dw.dashLine('wallL', { intro: 1, dash: 0.35, color: 0x777777 });
  dw.dashLine('crownV', { intro: 1, dash: 0.35, color: 0x777777 });
  dw.dashLine('wallR', { intro: 1, dash: 0.35, color: 0x777777 });

  // ------------------------------------------------------------------
  // step 2 -- the loads + the load line R
  // ------------------------------------------------------------------
  for (let k = 0; k < DIV; k++) {
    dw.arrow(`load${k}`, { intro: 2, ...ARROW, when: (st) => st._k !== 9 });
  }
  dw.label('lPd', 'P_d', { intro: 2, color: PAL.green, when: (st) => st._k !== 9 });
  dw.arrow('llR', { intro: 2, outro: QSTEP, ...ARROW });
  dw.label('lR', 'R', { intro: 2, outro: QSTEP, color: PAL.green });
  for (let k = 0; k <= DIV; k++) {
    dw.disk(`ll${k}`, { intro: 2, outro: QSTEP, r: 0.08, face: 0x666666,
            edge: 0x666666, when: (st) => st.n4 });
  }

  // ------------------------------------------------------------------
  // steps 3-4 -- the two half-span trials (retire at TRIAL_END, applet step 3)
  // ------------------------------------------------------------------
  for (const [sfx, intro] of [['a', 3], ['b', 4]]) {
    dw.strokes(`trays${sfx}`, 9, { intro, outro: TRIAL_END, w: W_RAY, color: PAL.grey });
    dw.strokes(`tfun${sfx}`, 9, { intro, outro: TRIAL_END, w: 0.05, color: PAL.grey });
    dw.dashLine(`tclose${sfx}`, { intro, outro: TRIAL_END, dash: 0.3 });
    dw.dashLine(`tpar${sfx}`, { intro, outro: TRIAL_END, dash: 0.3 });
  }
  dw.disk('pt_o1p', { intro: 3, outro: TRIAL_END, r: 0.17 });
  dw.disk('pt_FPa0', { intro: 3, outro: TRIAL_END, r: 0.17 });
  dw.disk('pt_i1', { intro: 3, outro: TRIAL_END, r: 0.13, when: (st) => st.n4 });
  dw.disk('pt_o2p', { intro: 4, outro: TRIAL_END, r: 0.17 });
  dw.disk('pt_FPb8', { intro: 4, outro: TRIAL_END, r: 0.17 });
  dw.disk('pt_i2', { intro: 4, outro: TRIAL_END, r: 0.13, when: (st) => st.n4 });
  dw.label('lbl_o1p', 'o₁′', { cls: 'point', intro: 3, outro: TRIAL_END });
  dw.label('lbl_i1', 'i₁', { cls: 'point', intro: 3, outro: TRIAL_END });
  dw.label('lbl_o2p', 'o₂′', { cls: 'point', intro: 4, outro: TRIAL_END });
  dw.label('lbl_i2', 'i₂', { cls: 'point', intro: 4, outro: TRIAL_END });

  // step 5 -- crown chords + parallels -> the pole o
  dw.dashLine('chordA', { intro: 5, outro: TRIAL_END, dash: 0.3, color: PAL.black });
  dw.dashLine('chordB', { intro: 5, outro: TRIAL_END, dash: 0.3, color: PAL.black });
  dw.dashLine('polA', { intro: 5, outro: TRIAL_END, dash: 0.3, color: PAL.black });
  dw.dashLine('polB', { intro: 5, outro: TRIAL_END, dash: 0.3, color: PAL.black });
  dw.disk('pt_pole', { intro: 5, outro: QSTEP, r: 0.13, when: (st) => st.n4 });
  dw.label('lbl_pole', 'o', { cls: 'point', intro: 5, outro: QSTEP });

  // step 6 -- fan + the parabola (the arch itself stays forever, black)
  dw.strokes('fan1', DIV + 1, { intro: 6, outro: QSTEP, w: W_RAY, color: PAL.grey });
  dw.strokes('arch1', DIV + 1, { intro: 6, w: W_STR, color: PAL.black });

  // step 7 -- reactions of the parabola (applet: step 3 only) + foundation lines
  dw.seg('found1', { intro: 7, w: 0.03, color: PAL.black, flash: false });
  dw.seg('found2', { intro: 7, w: 0.03, color: PAL.black, flash: false });
  dw.arrow('reacA1', { intro: 7, outro: 8, ...ARROW });
  dw.arrow('reacB1', { intro: 7, outro: 8, ...ARROW });
  dw.arrow('reacA1f', { intro: 7, outro: 8, ...ARROW });
  dw.arrow('reacB1f', { intro: 7, outro: 8, ...ARROW });
  dw.label('lA1', 'A', { cls: 'num', intro: 7, outro: 8, color: PAL.green });
  dw.label('lB1', 'B', { cls: 'num', intro: 7, outro: 8, color: PAL.green });
  dw.label('lA1f', 'A', { cls: 'num', intro: 7, outro: 8, color: PAL.green });
  dw.label('lB1f', 'B', { cls: 'num', intro: 7, outro: 8, color: PAL.green });

  // step 8 -- strip-length circles + corrected loads + the LC load line
  for (let j = 1; j <= 16; j++) {
    dw.circle(`mc${j}`, { intro: 8, color: 0xb5b5b5, when: (st) => st._k < 9 || st.kc });
    dw.arrow(`cl${j}`, { intro: 8, ...ARROW, w: 0.11, when: (st) => st._k < 9 || st.kc });
  }
  dw.arrow('lcR', { intro: 8, outro: QSTEP, ...ARROW, when: catW });
  dw.label('lRc', 'R', { intro: 8, outro: QSTEP, color: PAL.green, when: catW });
  for (let k = 0; k <= DIV; k++) {
    dw.disk(`lc${k}`, { intro: 8, outro: QSTEP, r: 0.08, face: 0x666666,
            edge: 0x666666, when: (st) => st.o3 && catW(st) });
    dw.arrow(`lcv${k}`, { intro: 8, outro: QSTEP, w: 0.06, headLen: 0.4, headW: 0.16,
             when: (st) => k < DIV && st.o4 && catW(st) });
  }

  // step 9 -- the catenary: pole o1 + rays + arch + reactions (applet step 5)
  dw.strokes('fan2', DIV + 1, { intro: 9, w: W_RAY, color: PAL.grey, when: catW });
  dw.strokes('arch2', DIV + 1, { intro: 9, w: 0.055, color: 0x333333, when: catW });
  dw.disk('pt_cpole', { intro: 9, r: 0.13, when: (st) => st.n4 && catW(st) });
  dw.label('lbl_cpole', 'o₁', { cls: 'point', intro: 9, when: catW });
  dw.arrow('reacA2', { intro: 9, ...ARROW, when: catW });
  dw.arrow('reacB2', { intro: 9, ...ARROW, when: catW });
  dw.arrow('reacA2f', { intro: 9, ...ARROW, when: catW });
  dw.arrow('reacB2f', { intro: 9, ...ARROW, when: catW });
  dw.label('lA2', 'A', { cls: 'num', intro: 9, color: PAL.green, when: catW });
  dw.label('lB2', 'B', { cls: 'num', intro: 9, color: PAL.green, when: catW });
  dw.label('lA2f', 'A', { cls: 'num', intro: 9, color: PAL.green, when: catW });
  dw.label('lB2f', 'B', { cls: 'num', intro: 9, color: PAL.green, when: catW });

  // step 10 -- the extra load Q + the load line R+Q
  dw.arrow('loadQ', { intro: QSTEP, ...ARROW, w: 0.16 });
  dw.label('lQ', 'Q', { cls: 'num', intro: QSTEP, color: PAL.green });
  dw.dashLine('qstrip', { intro: QSTEP, dash: 0.12, color: 0x666666 });
  for (let k = 0; k < DIV; k++) {
    dw.seg(`llb${k}`, { intro: QSTEP, w: 0.1, color: PAL.green });
  }
  dw.seg('llbQ', { intro: QSTEP, w: 0.17, color: PAL.green });
  dw.arrow('llbHead', { intro: QSTEP, ...ARROW });
  dw.label('lRQ', 'R+Q', { intro: QSTEP, color: PAL.green });
  for (let k = 0; k <= DIV; k++) {
    dw.disk(`llb_${k}`, { intro: QSTEP, r: 0.08, face: 0x666666, edge: 0x666666,
            when: (st) => st.n4 });
  }

  // step 11 -- divisions + parallels -> the pole o2 + rays
  dw.dashLine('qpolA', { intro: 11, dash: 0.3, color: PAL.black });
  dw.dashLine('qpolB', { intro: 11, dash: 0.3, color: PAL.black });
  dw.disk('pt_F1', { intro: 11, r: 0.13, when: (st) => st.n4 });
  dw.disk('pt_G1', { intro: 11, r: 0.13, when: (st) => st.n4 });
  dw.label('lbl_F1', 'i₁', { cls: 'point', intro: 11 });
  dw.label('lbl_G1', 'i₂', { cls: 'point', intro: 11 });
  dw.disk('pt_pC', { intro: 11, r: 0.13, when: (st) => st.n4 });
  dw.label('lbl_pC', 'o₂', { cls: 'point', intro: 11 });
  dw.strokes('fan3', DIV + 1, { intro: 11, w: W_RAY, color: PAL.grey });

  // step 12 -- the arch under Q
  dw.strokes('arch3', DIV + 1, { intro: 12, w: W_BAR,
    color: { pending: PAL.black, final: (dd) => dd.cA } });

  // step 13 -- reactions
  dw.arrow('reacA3', { intro: 13, ...ARROW });
  dw.arrow('reacB3', { intro: 13, ...ARROW });
  dw.arrow('reacA3f', { intro: 13, ...ARROW });
  dw.arrow('reacB3f', { intro: 13, ...ARROW });
  dw.label('lA3', 'A', { cls: 'num', intro: 13, color: PAL.green });
  dw.label('lB3', 'B', { cls: 'num', intro: 13, color: PAL.green });
  dw.label('lA3f', 'A', { cls: 'num', intro: 13, color: PAL.green });
  dw.label('lB3f', 'B', { cls: 'num', intro: 13, color: PAL.green });

  // points
  dw.disk('pt_A', { intro: 1, r: 0.17 });
  dw.disk('pt_B', { intro: 1, r: 0.17 });
  dw.disk('pt_K', { intro: 1, r: 0.15 });
  dw.disk('pt_LL0', { intro: 2, outro: QSTEP, r: 0.17 });
  dw.disk('pt_LC0', { intro: 8, outro: QSTEP, r: 0.17, when: catW });
  dw.disk('pt_LLB0', { intro: QSTEP, r: 0.17 });
  dw.label('lbl_K', 'K', { cls: 'point', intro: 1 });

  // readouts
  for (let i = 0; i < 3; i++) {
    dw.label(`ro${i}`, '', { intro: 13, flash: false, color: PAL.green });
  }

  // node-equilibrium inspector
  dw.nodeInspector(3, { when: (st) => st.node > 0, w: 1.5 * W_BAR,
                        headLen: 0.65, headW: 0.26, r: 0.2 });

  // dual pairs
  dw.link('tfuna', 'traysa', 'tclosea', 'tpara');
  dw.link('tfunb', 'traysb', 'tcloseb', 'tparb');
  dw.link('chordA', 'polA');
  dw.link('chordB', 'polB');
  dw.link('arch1', 'fan1', 'llR', 'lR');
  dw.link('arch2', 'fan2', 'lcR', 'lRc');
  dw.link('arch3', 'fan3');
  dw.link('reacA1', 'reacA1f', 'lA1', 'lA1f');
  dw.link('reacB1', 'reacB1f', 'lB1', 'lB1f');
  dw.link('reacA2', 'reacA2f', 'lA2', 'lA2f');
  dw.link('reacB2', 'reacB2f', 'lB2', 'lB2f');
  dw.link('reacA3', 'reacA3f', 'lA3', 'lA3f');
  dw.link('reacB3', 'reacB3f', 'lB3', 'lB3f');
  dw.link('loadQ', 'llbQ', 'lQ', 'lRQ', 'qstrip');
  dw.ghostable('reacA3f', 'reacB3f', 'llbHead');

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [-10, 29.95]);
    dw.setLabel('force_title', [50.09, 30.05]);
    dw.setLabel('force_sub', [76, 30.05]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(2)} kN`);

    const uim = V.mul(V.perp(V.unit(V.sub(IM_BR, IM_BL))), V.dist(IM_BL, IM_BR) * IM_H);
    dw.setImage('photo', [IM_BL, IM_BR, V.add(IM_BL, uim)]);
    dw.setSeg('ground', [-12.1, GY], [49.17, GY]);
    for (let k = 0; k < DIV; k++) {
      dw.setDashLine(`strip${k}`, [[XS[k], GT], [XS[k], GB]]);
    }
    dw.setDashLine('wallL', [[0, GT], [0, GB]]);
    dw.setDashLine('crownV', [[18.45, GT], [18.45, GB]]);
    dw.setDashLine('wallR', [[SPAN, GT], [SPAN, GB]]);

    // loads + load line
    for (let k = 0; k < DIV; k++) {
      dw.setArrow(`load${k}`, [XS[k], 20], [XS[k], 20 - LOADSYM]);
    }
    dw.setLabel('lPd', [XS[0] - 1.3, 20 - 0.5 * LOADSYM]);
    dw.setArrow('llR', d.LL[0], d.LL[16]);
    dw.setLabel('lR', [d.LL[0][0] + 1.1, (d.LL[0][1] + d.LL[16][1]) / 2]);
    for (let k = 0; k <= DIV; k++) dw.setDisk(`ll${k}`, d.LL[k]);

    // trials
    dw.setStrokes('traysa', d.LL.slice(0, 9).map((p) => [s.o1p, p]));
    dw.setStrokes('tfuna', pairs(d.va));
    dw.setDashLine('tclosea', [d.FPa0, d.va[9]]);
    dw.setDashLine('tpara', [s.o1p, d.i1]);
    dw.setStrokes('traysb', d.LL.slice(8, 17).map((p) => [s.o2p, p]));
    dw.setStrokes('tfunb', pairs(d.vb));
    dw.setDashLine('tcloseb', [d.FPb8, d.vb[9]]);
    dw.setDashLine('tparb', [s.o2p, d.i2]);
    dw.setDisk('pt_o1p', s.o1p);
    dw.setDisk('pt_FPa0', d.FPa0);
    dw.setDisk('pt_i1', d.i1);
    dw.setDisk('pt_o2p', s.o2p);
    dw.setDisk('pt_FPb8', d.FPb8);
    dw.setDisk('pt_i2', d.i2);
    dw.setLabel('lbl_o1p', V.add(s.o1p, [0.9, 0.3]));
    dw.setLabel('lbl_i1', V.add(d.i1, [-0.9, 0.35]));
    dw.setLabel('lbl_o2p', V.add(s.o2p, [0.9, 0.3]));
    dw.setLabel('lbl_i2', V.add(d.i2, [-0.9, -0.4]));

    // chords + pole o
    dw.setDashLine('chordA', [FP0, K]);
    dw.setDashLine('chordB', [K, B]);
    dw.setDashLine('polA', [d.i1, V.add(d.pole, V.mul(V.sub(d.pole, d.i1), 0.08))]);
    dw.setDashLine('polB', [d.i2, V.add(d.pole, V.mul(V.sub(d.pole, d.i2), 0.08))]);
    dw.setDisk('pt_pole', d.pole);
    dw.setLabel('lbl_pole', V.add(d.pole, [-0.95, 0.1]));

    // fan + parabola
    dw.setStrokes('fan1', d.LL.map((p) => [d.pole, p]));
    dw.setStrokes('arch1', pairs(d.FP));

    // parabola reactions + foundation lines
    const uA1 = V.unit(V.sub(d.FP[1], FP0)), uB1 = V.unit(V.sub(d.FP[16], B));
    dw.setSeg('found1', V.mul(uA1, GY / uA1[1]), FP0);
    dw.setSeg('found2', V.add(B, V.mul(uB1, GY / uB1[1])), B);
    dw.setArrow('reacA1', V.sub(FP0, V.mul(uA1, LOADSYM)), FP0);
    dw.setArrow('reacB1', V.sub(B, V.mul(uB1, LOADSYM)), B);
    dw.setArrow('reacA1f', d.pole, d.LL[0]);
    dw.setArrow('reacB1f', d.LL[16], d.pole);
    dw.setLabel('lA1', V.add(FP0, [-1.5, -1.1]));
    dw.setLabel('lB1', V.add(B, [1.5, -1.1]));
    dw.setLabel('lA1f', V.add(V.mid(d.pole, d.LL[0]), [-0.7, 0.55]));
    dw.setLabel('lB1f', V.add(V.mid(d.LL[16], d.pole), [-0.7, -0.6]));

    // strip circles + corrected loads + LC line
    for (let j = 1; j <= 16; j++) {
      dw.setCircle(`mc${j}`, d.FP[j], d.half[j - 1]);
      dw.setArrow(`cl${j}`, [XS[j - 1], d.FP[j][1] + d.half[j - 1]],
                  [XS[j - 1], d.FP[j][1] - d.half[j - 1]]);
    }
    dw.setArrow('lcR', d.LC[0], d.LC[16]);
    dw.setLabel('lRc', [d.LC[0][0] + 1.1, (d.LC[0][1] + d.LC[16][1]) / 2]);
    for (let k = 0; k <= DIV; k++) {
      dw.setDisk(`lc${k}`, d.LC[k]);
      if (k < DIV) dw.setArrow(`lcv${k}`, d.LC[k], d.LC[k + 1]);
    }

    // catenary
    dw.setStrokes('fan2', d.LC.map((p) => [d.cpole, p]));
    dw.setStrokes('arch2', pairs(d.FPE));
    dw.setDisk('pt_cpole', d.cpole);
    dw.setLabel('lbl_cpole', V.add(d.cpole, [-0.95, 0.1]));
    const uA2 = V.unit(V.sub(d.FPE[1], FP0)), uB2 = V.unit(V.sub(d.FPE[16], B));
    dw.setArrow('reacA2', V.sub(FP0, V.mul(uA2, LOADSYM)), FP0);
    dw.setArrow('reacB2', V.sub(B, V.mul(uB2, LOADSYM)), B);
    dw.setArrow('reacA2f', d.cpole, d.LC[0]);
    dw.setArrow('reacB2f', d.LC[16], d.cpole);
    dw.setLabel('lA2', V.add(FP0, [-1.5, 0.6]));
    dw.setLabel('lB2', V.add(B, [1.5, 0.6]));
    dw.setLabel('lA2f', V.add(V.mid(d.cpole, d.LC[0]), [-0.7, 0.55]));
    dw.setLabel('lB2f', V.add(V.mid(d.LC[16], d.cpole), [-0.7, -0.6]));

    // Q + the load line R+Q
    const pQ = Math.round(s.pQ);
    const xQ = XS[pQ - 1];
    dw.setArrow('loadQ', [xQ, QY + LOADSYM], [xQ, QY]);
    dw.setLabel('lQ', [xQ + 0.8, QY + 0.5 * LOADSYM]);
    dw.setDashLine('qstrip', [[xQ, GT], [xQ, GB]]);
    for (let k = 0; k < DIV; k++) dw.setSeg(`llb${k}`, d.LLB[k], d.LLB[k + 1]);
    dw.setSeg('llbQ', d.LLB[pQ - 1], d.LLB[pQ]);
    dw.setArrow('llbHead', d.LLB[15], d.LLB[16]);
    dw.setLabel('lRQ', [d.LLB[0][0] + 1.3, (d.LLB[0][1] + d.LLB[16][1]) / 2]);
    for (let k = 0; k <= DIV; k++) dw.setDisk(`llb_${k}`, d.LLB[k]);

    // divisions + pole o2 + fan
    dw.setDashLine('qpolA', [d.F1, V.add(d.pC, V.mul(V.sub(d.pC, d.F1), 0.08))]);
    dw.setDashLine('qpolB', [d.G1, V.add(d.pC, V.mul(V.sub(d.pC, d.G1), 0.08))]);
    dw.setDisk('pt_F1', d.F1);
    dw.setDisk('pt_G1', d.G1);
    dw.setLabel('lbl_F1', V.add(d.F1, [0.9, 0.35]));
    dw.setLabel('lbl_G1', V.add(d.G1, [0.9, -0.4]));
    dw.setDisk('pt_pC', d.pC);
    dw.setLabel('lbl_pC', V.add(d.pC, [-1.05, 0.1]));
    dw.setStrokes('fan3', d.LLB.map((p) => [d.pC, p]));

    // the arch under Q
    dw.setStrokes('arch3', pairs(d.FPC));

    // reactions
    const uA3 = V.unit(V.sub(d.FPC[1], FP0)), uB3 = V.unit(V.sub(d.FPC[16], B));
    dw.setArrow('reacA3', V.sub(FP0, V.mul(uA3, LOADSYM)), FP0);
    dw.setArrow('reacB3', V.sub(B, V.mul(uB3, LOADSYM)), B);
    dw.setArrow('reacA3f', d.pC, d.LLB[0]);
    dw.setArrow('reacB3f', d.LLB[16], d.pC);
    dw.setLabel('lA3', V.add(FP0, [-1.5, -1.1]));
    dw.setLabel('lB3', V.add(B, [1.5, -1.1]));
    dw.setLabel('lA3f', V.add(V.mid(d.pC, d.LLB[0]), [-0.7, 0.55]));
    dw.setLabel('lB3f', V.add(V.mid(d.LLB[16], d.pC), [-0.7, -0.6]));

    // points
    dw.setDisk('pt_A', FP0);
    dw.setDisk('pt_B', B);
    dw.setDisk('pt_K', K);
    dw.setDisk('pt_LL0', d.LL[0]);
    dw.setDisk('pt_LC0', d.LC[0]);
    dw.setDisk('pt_LLB0', d.LLB[0]);
    dw.setLabel('lbl_K', V.add(K, [0, 0.75]));

    dw.setLabel('ro0', [76, 28.9]);
    dw.setText('ro0', `R+Q = ${d.Rtot.toFixed(1)} kN`);
    dw.setLabel('ro1', [76, 27.75]);
    dw.setText('ro1', `A = ${d.RA.toFixed(1)} kN`);
    dw.setLabel('ro2', [76, 26.6]);
    dw.setText('ro2', `B = ${d.RB.toFixed(1)} kN`);
  }

  // node inspector: 1 = springing A, 2..17 = the arch-under-Q vertices,
  // 18 = springing B. Sides = the node's closed sub-polygon (load edge +
  // the two adjacent rays); the springing reactions lie ON the drawn
  // outer-ray reaction arrows.
  function nodePoly() {
    const n = Math.max(1, Math.round(s.node));
    const { LLB, pC } = d;
    if (n === 1) return [[pC, LLB[0]], [LLB[0], pC]];
    if (n >= 18) return [[LLB[16], pC], [pC, LLB[16]]];
    const k = n - 1;
    return [[LLB[k - 1], LLB[k]], [LLB[k], pC], [pC, LLB[k - 1]]];
  }
  function updateNode() {
    const n = Math.max(1, Math.round(s.node));
    dw.selectDisk(n === 1 ? 'pt_A' : n >= 18 ? 'pt_B' : null);
    const name = n === 1 ? 'springing A' : n >= 18 ? 'springing B' : `${n - 1}`;
    const pos = n === 1 ? FP0 : n >= 18 ? B : d.FPC[n - 1];
    dw.setNodeInspector(pos, 2.6, s.node > 0 ? `node ${name}` : '', nodePoly());
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
  panel.slider(par, s, 'wd', 'w_d — dead load (kN/m)', 0.5, 2, 0.05, refresh);
  panel.slider(par, s, 'fQ', 'factor Q (Q = factor·P_d)', 0, 2, 0.05, refresh);
  panel.slider(par, s, 'pQ', 'position of Q (strip)', 1, 16, 1, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 0.5, 2, 0.05, refresh);
  panel.toggle(par, s, 'ph', 'show image (built section)', refresh);
  panel.toggle(par, s, 'kc', 'keep the catenary construction', refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  panel.toggle(par, s, 'o3', 'show points 2 (corrected load line)', refresh);
  panel.toggle(par, s, 'o4', 'show vectors (corrected load line)', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node',
               'node (0 = off, 1 = springing A, 2–17 arch nodes, 18 = springing B)',
               0, 18, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS, LL0: [...DEFAULTS.LL0], LC0: [...DEFAULTS.LC0],
                       o1p: [...DEFAULTS.o1p], o2p: [...DEFAULTS.o2p] });
    panel.syncAll();
    refresh();
  });

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const hits = [
    ['LL0', () => d.LL[0], 2, QSTEP],
    ['o1p', () => s.o1p, 3, TRIAL_END], ['FPa0', () => d.FPa0, 3, TRIAL_END],
    ['o2p', () => s.o2p, 4, TRIAL_END], ['FPb8', () => d.FPb8, 4, TRIAL_END],
    ['LC0', () => d.LC[0], 8, QSTEP],
    ['Q', () => [XS[Math.round(s.pQ) - 1], QY + 0.5 * LOADSYM], QSTEP, 99],
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
      if (name === 'LL0') s.LL0 = [clamp(wx, 55, 78), clamp(wy, 22, 31.5)];
      else if (name === 'o1p') s.o1p = [wx, wy];
      else if (name === 'o2p') s.o2p = [wx, wy];
      else if (name === 'FPa0') s.ya = clamp(wy, 21.5, 31);
      else if (name === 'FPb8') s.yb = clamp(wy, 21.5, 31);
      else if (name === 'LC0') s.LC0 = [clamp(wx, 55, 78), clamp(wy, 2, 12)];
      else if (name === 'Q') {
        s.pQ = clamp(Math.round(wx / LOADSYM + 0.5), 1, 16);
        panel.syncAll();
      }
      refresh();
    },
  );

  // click an arch node to inspect it
  const nodeAt = [];
  for (let n = 1; n <= 18; n++) {
    nodeAt.push({ at: () => (n === 1 ? FP0 : n >= 18 ? B : d.FPC[n - 1]) });
  }
  dw.nodeSelect(nodeAt, (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
