/**
 * Drawing view/11 "Golden Gate Bridge"
 * (https://block.arch.ethz.ch/eq/drawing/view/11) as a step-by-step
 * construction. The complete force flow of a suspension bridge:
 *
 *   - the main-span load R1 hangs from the main cable; the half-chords from
 *     the sag point to the tower tops, drawn parallel through the division
 *     points of the load line, locate the pole o -> the main cable is the
 *     funicular of 29 equal hanger loads, its end forces A and B;
 *   - each tower must be balanced horizontally, so the side-span (backstay)
 *     cable shares the same horizontal component H: its pole o1 lies on the
 *     vertical at distance H from the side load line, found with the
 *     division point of a trial funicular (the applet's TrialFunicular);
 *   - tower tops carry E = A + C and F = B + D (vertical resultants), the
 *     anchorages take the cable pulls H and J with components H_H/H_V, J_H/J_V.
 *
 * Live port of view_11/applet_0/geogebra.xml (605 KB, 492 visible elements);
 * the whole chain (division points, pole K_11, 30-piece cable, side pole
 * A_14, mirrored right span, tower/anchor components) is regression-checked
 * against the baked coordinates to ~3e-4 (notes/view_11_analysis.md,
 * scratchpad/v11_regress.py). The bridge line-drawing embedded in the applet
 * (shown at its step 0) is shipped as web/assets/golden_gate_lines.png.
 */

import * as THREE from 'three';
import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 11 — Golden Gate Bridge',
  subtitle: 'the force flow of a suspension bridge',
  about: 'The Golden Gate Bridge as a chain of graphic-statics constructions: the main cable is the funicular of 29 equal hanger loads, its pole found from the half-chords of the draggable sag point; the towers must be balanced horizontally, so the backstay cables share the same horizontal component H — their poles lie on the vertical at distance H from the side load line, located with a trial funicular. Tower tops carry the vertical resultants E = A + C and F = B + D, and the anchor blocks resist the cable pulls with components H_H, H_V and J_H, J_V.',
  frame: [[-2.2127, -5.9032], [27.9615, 9.1840]],
};

// fixed geometry (the applet's baked site)
const DECK0 = 5.0, DECK1 = 5.1;           // roadway band
const TX1 = 6, TX2 = 18.76;               // towers
const TOPY = 6.57;                        // tower tops C / Z_5
const AX1 = 2.48, AX2 = 22.28;            // anchorages
const CTR = 12.38;                        // centre vertical (sag)
const GUIDE_TOP = 9.0;
const DIMY = 2.8575;                      // dimension line row (applet Z_15)
const O16Y = -5.015, N16DY = 0.4216;      // side force-line extent
const M25Y = -5.3651, I21DX = 0.7991;     // component rows (applet handles)
const E21Y = -4.2676, L21DX = 0.8122;
const T29 = [15.5447, 0.4216];            // tower-equilibrium polygon anchor
const T29B = [21.3, 0.4216];              // mirrored F polygon (our addition)
const IMG = { x0: -0.7984079377845887, y0: 0.26062385523842707,
              w: 27.630805432669287, h: 27.630805432669287 * 225 / 800 };
const RESOLVE = 13;

const DEFAULTS = {
  b6y: 5.166245205283066,                 // sag point on the centre vertical
  u12y: 5.012765570038411,                // anchorage height (both sides)
  o8x: 23.0, o8y: 0.5,                    // main load-line top
  m16x: 3.793692091574974, m16y: 0.8491647738350311,   // side load-line top
  z17y: 4.221006358308735,                // R-arrow row
  ey: 2.1797842607532707,                 // hanger-guide base row (applet E)
  load: 0.7,                              // load slider [0, 5]
  sFD: 0.6,                               // scaleForceDiagram [0.5, 0.8]
  factor: 0.4,                            // factor [0, 1]
  sLS: 1.0,                               // scaleLoadSymbol [0.5, 2]
  sIF: 0.35,
  trial: false,                           // main-span trial construction
  sideTrial: true,                        // the applet's TrialFunicular
  arr: false,                             // the applet's o_2 showArrows layer
  dims: true,                             // the applet's showDimensions (default ON)
  o1: true,                               // show internal forces
  showPts: false,
  node: 0,
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'Site: the Golden Gate Bridge', d: 'left: the roadway between two towers and two anchor blocks — main span 4200 ft, side spans 1125 ft; the deck hangs from 29 + 8 + 8 hangers (drag the anchor point)' },
  { t: 'The main-span load R₁', d: 'left: the main-span deck loads the cable with 29 equal hanger loads P, resultant R₁ at midspan — right: the load line R₁ (field), 29 pieces' },
  { t: 'Half-chords → the pole o', d: 'left: the half-chords from the sag point (drag it) to the tower tops — right: parallels to them through the division points i₁, i₂ of each half-span load meet at the pole o (toggle "trial construction" to see why)' },
  { t: 'The main cable', d: 'right: rays from o to every cut — left: the funicular of the 29 hanger loads through the sag point lands exactly on both tower tops; the hangers drop to the deck' },
  { t: 'Cable forces A and B', d: 'right: the outer rays are the cable end forces A and B — left: the same pulls at the tower tops, along the end tangents' },
  { t: 'Components of A and B', d: 'both: A and B split into the horizontal pull A_H = B_H = H and the vertical parts A_V = B_V (half the main load each)' },
  { t: 'The side-span load R₂', d: 'left: each side span loads its backstay cable with 8 hanger loads P, resultant R₂ — right: the side load line R₂ (side), 8 pieces' },
  { t: 'Same H → the side pole o₁', d: 'left: a trial funicular (grey) closes the side span, its division point i₃ + the chord anchor–tower — right: the parallel to the chord through i₃ meets the vertical at distance H (the tower must be balanced: C_H = A_H) at the pole o₁' },
  { t: 'The backstay cable — H and C', d: 'right: rays from o₁ — left: the side-span funicular from the anchorage to the tower top; the force triangle closes with the anchor pull H and the backstay force C' },
  { t: 'The right side span', d: 'left: mirrored about midspan: cable, hangers and R₂ — right: the mirrored pole o₂ gives the forces D (backstay) and J (anchor pull)' },
  { t: 'Tower equilibrium: E and F', d: 'right: tip-to-tail, A and C (and mirrored B and D) sum to a vertical: E = A_V + C_V, F = B_V + D_V — left: the towers push up under the deck' },
  { t: 'Anchor forces', d: 'both: the anchor blocks resist the cable pulls with the components H_H, H_V and J_H, J_V — the horizontal pull H_H equals H again' },
  { t: 'Tension and compression', d: 'the cables and hangers resolve pink = tension, the towers blue = compression; forces in units of the hanger load P on the right' },
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

// hanger stations
const SIDE_L = Array.from({ length: 8 }, (_, j) => 2.7 + 0.44 * j);
const MAIN_X = Array.from({ length: 29 }, (_, j) => 6.22 + 0.44 * j);
const mirX = (x) => 2 * CTR - x;

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const u = s.load * s.sFD * s.factor;              // one hanger load, in units
  const C = [TX1, TOPY], Z5 = [TX2, TOPY];
  const B6 = [CTR, s.b6y];
  const U12 = [AX1, s.u12y], T12 = [AX2, s.u12y];

  // main load line + division points (= half-span beam reactions)
  const O8 = [s.o8x, s.o8y];
  const cuts = [];
  for (let k = 0; k <= 29; k++) cuts.push([s.o8x, s.o8y - k * u]);
  const T9 = cuts[29], V9 = [s.o8x, s.o8y - 14.5 * u];
  const dstar = u * 0.44 * 105 / 6.38;
  const O10 = [s.o8x, s.o8y - dstar];               // i_1 (right half)
  const J11 = [s.o8x, T9[1] + dstar];               // i_2 (left half)

  // pole o: parallels to the half-chords through the division points
  const K11 = inter('K11', J11, V.sub(C, B6), O10, V.sub(Z5, B6));
  const H = s.o8x - K11[0];

  // main cable: funicular from the sag point, both halves
  const right = [B6];
  for (let j = 0; j < 14; j++) right.push(onv(right[j], V.sub(cuts[14 - j], K11), 12.82 + 0.44 * j));
  right.push(onv(right[14], V.sub(cuts[0], K11), TX2));         // -> Z_5
  const left = [B6];
  for (let j = 0; j < 14; j++) left.push(onv(left[j], V.sub(cuts[15 + j], K11), 11.94 - 0.44 * j));
  left.push(onv(left[14], V.sub(cuts[29], K11), TX1));          // -> C
  const cable = [...left.slice(1).reverse(), B6, ...right.slice(1)];  // C..Z_5 vertices (31)

  // side span (left): division + pole on the H-vertical
  const M16 = [s.m16x, s.m16y];
  const K13 = [s.m16x, s.m16y - 8 * u];
  const Z13 = [s.m16x, s.m16y - 4 * u];             // i_3 (exact)
  const chord = V.sub(C, U12);
  const A14 = onv(Z13, chord, s.m16x - H);          // pole o_1
  const scuts = [];
  for (let k = 0; k <= 8; k++) scuts.push([s.m16x, K13[1] + k * u]);   // K_13..M_16
  const scable = [U12];
  for (let j = 0; j < 8; j++) scable.push(onv(scable[j], V.sub(scuts[j], A14), SIDE_L[j]));
  scable.push(onv(scable[8], V.sub(scuts[8], A14), TX1));       // -> C

  // right side span: mirror in the form, mirrored pole in the force plane
  const U13 = [2 * s.m16x - A14[0], A14[1]];        // pole o_2
  const rcable = scable.map((p) => [mirX(p[0]), p[1]]).reverse();      // Z_5 .. T_12
  const S13 = [2 * s.m16x - (s.m16x - H), O16Y];    // D_H row start (mirror of W_13)
  const O16 = [s.m16x, O16Y], W13 = [s.m16x - H, O16Y];

  // forces (directions + magnitudes in P = one hanger load)
  const vA = V.sub(K11, T9), vB = V.sub(O8, K11);   // A: T9->K11, B: K11->O8
  const vC = V.sub(M16, A14), vH = V.sub(A14, K13); // C: A14->M16, H: K13->A14
  const vD = V.sub(M16, U13), vJ = V.sub(U13, K13);
  const P = (v) => V.len(v) / u;
  const Emag = vA[1] + vC[1];                       // A_V + C_V (vertical)
  // tower-equilibrium polygons (tip-to-tail; forces ON the tower)
  const W29 = [T29[0], T29[1] - Emag];
  const Z29 = V.add(W29, vA);                       // A30 -> Z29 is -C, Z29 -> W29 is -A
  const A30 = V.add(Z29, vC);                       // = T29
  const W29b = [T29B[0], T29B[1] - Emag];
  const Z29b = V.add(W29b, V.mul(vB, 1));           // mirror: D then B then F
  const A30b = V.add(Z29b, vD);

  // symbolic unit arrows (length scaleLoadSymbol) at the tower tops / anchors
  const un = (v) => V.mul(V.unit(v), s.sLS);
  const aForm = [C, V.add(C, un(vA))];              // A at tower 1 (up-left)
  const bForm = [Z5, V.add(Z5, un(V.mul(vB, 1)))];  // B at tower 2 (up-right)
  const cForm = [C, V.add(C, un(vC))];              // C at tower 1 (up-right)
  const dForm = [Z5, V.add(Z5, un(V.mul(vD, 1)))];  // D at tower 2 (up-left)
  const jForm = [T12, V.add(T12, un(V.mul(vJ, -1)))];  // J pulls the anchor down-right
  // wait: J on the anchor pulls toward the tower (up-left); the applet draws
  // the anchor-side arrows pointing AWAY from the bridge (the anchor pull):
  const jF2 = [T12, V.add(T12, un(vJ))];

  return { u, C, Z5, B6, U12, T12, O8, T9, V9, cuts, O10, J11, K11, H,
           cable, left, right, M16, K13, Z13, A14, scuts, scable, U13, rcable,
           S13, O16, W13, vA, vB, vC, vD, vH, vJ, P, Emag,
           W29, Z29, A30, W29b, Z29b, A30b, aForm, bForm, cForm, dForm, jF2 };
}

// trial funiculars (main span, shown with the "trial construction" toggle)
function computeTrial(s, d) {
  const u = d.u;
  const U9 = [25.1777, -0.7998], W9 = [24.9372, -3.0686];   // trial poles
  const W5 = [CTR, 7.7364], M8 = [TX2, 7.1055];             // trial starts
  // left half: loads cuts 15..29 between the centre and tower-1 verticals
  const lt = [W5];
  for (let j = 0; j < 14; j++) lt.push(onv(lt[j], V.sub(d.cuts[15 + j], W9), 11.94 - 0.44 * j));
  lt.push(onv(lt[14], V.sub(d.cuts[29], W9), TX1));
  // right half: loads cuts 0..14 between tower-2 and the centre verticals
  const rt = [M8];
  for (let j = 0; j < 14; j++) rt.push(onv(rt[j], V.sub(d.cuts[j], U9), 18.54 - 0.44 * j));
  rt.push(onv(rt[14], V.sub(d.cuts[14], U9), CTR));
  return { U9, W9, lt, rt };
}

// side-span trial funicular (the applet's TrialFunicular, step 5)
function computeSideTrial(s, d) {
  const L13 = [8.5321, -0.782], T21 = [TX1, 7.3354];
  const st = [T21];
  for (let j = 0; j < 8; j++) st.push(onv(st[j], V.sub(d.scuts[8 - j], L13), 5.78 - 0.44 * j));
  st.push(onv(st[8], V.sub(d.scuts[0], L13), AX1));
  return { L13, T21, st };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);
  let dt = computeTrial(s, d);
  let dst = computeSideTrial(s, d);

  const W_CAB = 0.09, W_RAY = 0.035, W_HGR = 0.05, W_DIM = 0.03;
  const ARROW = { w: 0.11, headLen: 0.4, headW: 0.16 };      // big green vectors
  const NARROW = { w: 0.08, headLen: 0.28, headW: 0.12 };
  const tension = { pending: PAL.black, final: () => PAL.red };
  const compression = { pending: PAL.black, final: () => PAL.blue };

  // the bridge line-drawing (the applet's pic3), behind everything
  const tex = new THREE.TextureLoader().load('assets/golden_gate_lines.png');
  const imgMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.95 });
  const imgMesh = new THREE.Mesh(new THREE.PlaneGeometry(IMG.w, IMG.h), imgMat);
  imgMesh.position.set(IMG.x0 + IMG.w / 2, IMG.y0 + IMG.h / 2, -0.6);
  dw.scene.add(imgMesh);

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // ------------------------------------------------------------------
  // step 1: site — deck bands, towers, anchors, stations, dimensions
  // ------------------------------------------------------------------
  for (const nm of ['deckL', 'deckM', 'deckR']) {
    dw.poly(`${nm}f`, 4, { intro: 1, color: PAL.green, opacity: 0.13, flash: false });
    dw.strokes(`${nm}e`, 4, { intro: 1, w: 0.045, color: PAL.green });
  }
  dw.seg('tower1', { intro: 1, w: 0.11, color: compression });
  dw.seg('tower2', { intro: 1, w: 0.11, color: compression });
  dw.dashLine('anch1', { intro: 1, dash: 0.22 });            // anchor slide verticals
  dw.dashLine('anch2', { intro: 1, dash: 0.22 });
  for (let i = 0; i < 5; i++) dw.dashLine(`stat${i}`, { intro: 1, dash: 0.35 });
  dw.dashLine('ctr', { intro: 1, dash: 0.18 });              // sag handle guide
  for (let i = 0; i < 45; i++) dw.dashLine(`hg${i}`, { intro: 1, dash: 0.09 });
  const dimsOn = (st) => st.dims;         // the applet's showDimensions checkbox
  dw.seg('dim', { intro: 1, w: W_DIM, color: PAL.grey, flash: false, when: dimsOn });
  dw.strokes('dimT', 5, { intro: 1, w: W_DIM, color: PAL.grey, flash: false, when: dimsOn });
  dw.label('dim1', '1125 ft (345 m)', { cls: 'point', intro: 1, flash: false, color: PAL.grey, when: dimsOn });
  dw.label('dim2', '4200 ft (1280 m)', { cls: 'point', intro: 1, flash: false, color: PAL.grey, when: dimsOn });
  dw.label('dim3', '1125 ft (345 m)', { cls: 'point', intro: 1, flash: false, color: PAL.grey, when: dimsOn });
  dw.instant('deckLf', 'deckLe', 'deckMf', 'deckMe', 'deckRf', 'deckRe',
             'tower1', 'tower2', 'anch1', 'anch2', 'ctr', 'dim', 'dimT',
             ...Array.from({ length: 5 }, (_, i) => `stat${i}`),
             ...Array.from({ length: 45 }, (_, i) => `hg${i}`));

  // ------------------------------------------------------------------
  // step 2: main-span load R1 + load line R1 (field)
  // ------------------------------------------------------------------
  dw.arrow('R1form', { intro: 2, ...NARROW });
  dw.label('lbl_R1form', 'R₁', { cls: 'num', intro: 2, color: PAL.green });
  dw.arrow('R1force', { intro: 2, ...ARROW });
  dw.label('lbl_R1force', 'R₁ (field)', { cls: 'num', intro: 2, color: PAL.green });
  dw.link('R1form', 'R1force', 'lbl_R1form', 'lbl_R1force');

  // the applet's hidden o_2 "showArrows" layer: the band load drawn as the
  // 29 + 8 + 8 individual per-hanger load arrows hanging under the deck
  // (applet: main span at its load step, left side span at the side-load
  // step; we mirror the right side span too, consistent with our step 10)
  const arr = (st) => st.arr;
  const PHA = { w: 0.045, headLen: 0.16, headW: 0.09, color: PAL.green, flash: false };
  for (let j = 0; j < 29; j++) dw.arrow(`pha${j}`, { intro: 2, when: arr, ...PHA });
  for (let j = 0; j < 8; j++) dw.arrow(`phaL${j}`, { intro: 7, when: arr, ...PHA });
  for (let j = 0; j < 8; j++) dw.arrow(`phaR${j}`, { intro: 10, when: arr, ...PHA });

  // ------------------------------------------------------------------
  // step 3: half-chords -> pole o (+ optional main trial construction)
  // ------------------------------------------------------------------
  dw.dashLine('hc1', { intro: 3, color: PAL.black, dash: 0.4 });   // B6 - C
  dw.dashLine('hc2', { intro: 3, color: PAL.black, dash: 0.4 });   // B6 - Z5
  dw.dashLine('con1', { intro: 3, color: PAL.black, dash: 0.4 });  // J11 - K11
  dw.dashLine('con2', { intro: 3, color: PAL.black, dash: 0.4 });  // O10 - K11
  dw.label('lbl_i1', 'i₁', { cls: 'point', intro: 3, color: PAL.grey });
  dw.label('lbl_i2', 'i₂', { cls: 'point', intro: 3, color: PAL.grey });
  dw.label('lbl_o', 'o', { cls: 'point', intro: 3 });
  dw.link('hc1', 'con1', 'lbl_i2');
  dw.link('hc2', 'con2', 'lbl_i1');
  const tr = (st) => st.trial;
  dw.strokes('tfanL', 16, { intro: 3, w: W_RAY, color: PAL.grey, when: tr });
  dw.strokes('tfanR', 16, { intro: 3, w: W_RAY, color: PAL.grey, when: tr });
  dw.strokes('tfunL', 15, { intro: 3, w: 0.06, color: PAL.grey, when: tr });
  dw.strokes('tfunR', 15, { intro: 3, w: 0.06, color: PAL.grey, when: tr });
  dw.dashLine('tclL', { intro: 3, dash: 0.35, when: tr });         // closing left
  dw.dashLine('tclR', { intro: 3, dash: 0.35, when: tr });
  dw.dashLine('tparL', { intro: 3, dash: 0.35, when: tr });        // ∥ through W9 -> J11
  dw.dashLine('tparR', { intro: 3, dash: 0.35, when: tr });        // ∥ through U9 -> O10

  // ------------------------------------------------------------------
  // step 4: rays from o + the main cable + hangers
  // ------------------------------------------------------------------
  dw.strokes('rays', 30, { intro: 4, w: W_RAY, color: tension });
  dw.strokes('cable', 30, { intro: 4, w: W_CAB, color: tension });
  dw.strokes('hangers', 29, { intro: 4, w: W_HGR, color: tension });
  dw.link('cable', 'rays', 'hangers');

  // ------------------------------------------------------------------
  // step 5: cable forces A and B (both diagrams)
  // ------------------------------------------------------------------
  dw.arrow('Aforce', { intro: 5, ...ARROW });
  dw.arrow('Bforce', { intro: 5, ...ARROW });
  dw.arrow('Aform', { intro: 5, ...ARROW });
  dw.arrow('Bform', { intro: 5, ...ARROW });
  dw.label('lbl_Afo', 'A', { cls: 'num', intro: 5, color: PAL.green });
  dw.label('lbl_Bfo', 'B', { cls: 'num', intro: 5, color: PAL.green });
  dw.label('lbl_Af', 'A', { cls: 'num', intro: 5, color: PAL.green });
  dw.label('lbl_Bf', 'B', { cls: 'num', intro: 5, color: PAL.green });
  dw.link('Aform', 'Aforce', 'lbl_Af', 'lbl_Afo');
  dw.link('Bform', 'Bforce', 'lbl_Bf', 'lbl_Bfo');

  // ------------------------------------------------------------------
  // step 6: components A_H, A_V, B_H, B_V
  // ------------------------------------------------------------------
  for (const nm of ['AHform', 'AVform', 'BHform', 'BVform', 'AHforce', 'AVforce', 'BVforce']) {
    dw.arrow(nm, { intro: 6, ...NARROW });
  }
  dw.label('lbl_AHf', 'A_H', { cls: 'point', intro: 6, color: PAL.green });
  dw.label('lbl_AVf', 'A_V', { cls: 'point', intro: 6, color: PAL.green });
  dw.label('lbl_BHf', 'B_H', { cls: 'point', intro: 6, color: PAL.green });
  dw.label('lbl_BVf', 'B_V', { cls: 'point', intro: 6, color: PAL.green });
  dw.label('lbl_AHfo', 'A_H = H', { cls: 'point', intro: 6, color: PAL.green });
  dw.label('lbl_AVfo', 'A_V', { cls: 'point', intro: 6, color: PAL.green });
  dw.label('lbl_BVfo', 'B_V', { cls: 'point', intro: 6, color: PAL.green });
  dw.dashLine('cnAH1', { intro: 6, dash: 0.25 });
  dw.dashLine('cnAH2', { intro: 6, dash: 0.25 });
  dw.dashLine('cnAV1', { intro: 6, dash: 0.25 });
  dw.dashLine('cnAV2', { intro: 6, dash: 0.25 });
  dw.dashLine('cnAV3', { intro: 6, dash: 0.25 });
  dw.link('AHform', 'AHforce', 'lbl_AHf', 'lbl_AHfo');
  dw.link('AVform', 'AVforce', 'lbl_AVf', 'lbl_AVfo');
  dw.link('BVform', 'BVforce', 'lbl_BVf', 'lbl_BVfo');

  // ------------------------------------------------------------------
  // step 7: side-span load R2 + side load line
  // ------------------------------------------------------------------
  dw.arrow('R2form', { intro: 7, ...NARROW });
  dw.label('lbl_R2form', 'R₂', { cls: 'num', intro: 7, color: PAL.green });
  dw.arrow('R2force', { intro: 7, ...ARROW });
  dw.label('lbl_R2force', 'R₂ (side)', { cls: 'num', intro: 7, color: PAL.green });
  dw.dashLine('sfline', { intro: 7, dash: 0.22 });           // side force-line vertical
  dw.link('R2form', 'R2force', 'lbl_R2form', 'lbl_R2force');

  // ------------------------------------------------------------------
  // step 8: side trial -> division i3; chord; H-locus -> pole o1
  // ------------------------------------------------------------------
  const str = (st) => st.sideTrial;
  dw.seg('stRay1', { intro: 8, outro: 9, w: W_RAY, color: PAL.grey, when: str });
  dw.seg('stRay2', { intro: 8, outro: 9, w: W_RAY, color: PAL.grey, when: str });
  dw.strokes('stFun', 9, { intro: 8, outro: 9, w: 0.06, color: PAL.grey, when: str });
  dw.dashLine('stClose', { intro: 8, outro: 9, dash: 0.35, when: str });
  dw.dashLine('stPar', { intro: 8, outro: 9, dash: 0.35, when: str });
  dw.dashLine('chordS', { intro: 8, outro: RESOLVE, color: PAL.black, dash: 0.4 });  // U12 - C
  dw.dashLine('hlocus', { intro: 8, dash: 0.3 });            // vertical at distance H
  dw.dashLine('poleLn', { intro: 8, outro: RESOLVE, color: PAL.black, dash: 0.4 }); // Z13 - A14
  dw.label('lbl_i3', 'i₃', { cls: 'point', intro: 8, color: PAL.grey });
  dw.label('lbl_o1', 'o₁', { cls: 'point', intro: 8 });
  dw.arrow('CHforce', { intro: 8, ...NARROW });              // C_H under the side fan
  dw.arrow('CHform', { intro: 8, ...NARROW });
  dw.label('lbl_CHfo', 'C_H = H', { cls: 'point', intro: 8, color: PAL.green });
  dw.label('lbl_CHf', 'C_H', { cls: 'point', intro: 8, color: PAL.green });
  dw.link('chordS', 'poleLn', 'lbl_i3');
  dw.link('CHform', 'CHforce', 'lbl_CHf', 'lbl_CHfo');

  // ------------------------------------------------------------------
  // step 9: side rays + backstay cable + hangers; H and C
  // ------------------------------------------------------------------
  dw.strokes('srays', 9, { intro: 9, w: W_RAY, color: tension });
  dw.strokes('scable', 9, { intro: 9, w: W_CAB, color: tension });
  dw.strokes('shangers', 8, { intro: 9, w: W_HGR, color: tension });
  dw.arrow('Hforce', { intro: 9, ...ARROW });
  dw.arrow('Cforce', { intro: 9, ...ARROW });
  dw.arrow('Cform', { intro: 9, ...ARROW });
  dw.label('lbl_Hfo', 'H', { cls: 'num', intro: 9, color: PAL.green });
  dw.label('lbl_Cfo', 'C', { cls: 'num', intro: 9, color: PAL.green });
  dw.label('lbl_Cf', 'C', { cls: 'num', intro: 9, color: PAL.green });
  dw.link('scable', 'srays', 'shangers');
  dw.link('Cform', 'Cforce', 'lbl_Cf', 'lbl_Cfo');

  // ------------------------------------------------------------------
  // step 10: right side span (mirror) + D and J
  // ------------------------------------------------------------------
  dw.strokes('rcable', 9, { intro: 10, w: W_CAB, color: tension });
  dw.strokes('rhangers', 8, { intro: 10, w: W_HGR, color: tension });
  dw.arrow('R2rform', { intro: 10, ...NARROW });
  dw.label('lbl_R2r', 'R₂', { cls: 'num', intro: 10, color: PAL.green });
  dw.dashLine('rfline', { intro: 10, dash: 0.22 });          // mirrored force line
  dw.arrow('Jforce', { intro: 10, ...ARROW });
  dw.arrow('Dforce', { intro: 10, ...ARROW });
  dw.arrow('Dform', { intro: 10, ...ARROW });
  dw.arrow('Jform', { intro: 10, ...ARROW });
  dw.arrow('DHforce', { intro: 10, ...NARROW });
  dw.label('lbl_Jfo', 'J', { cls: 'num', intro: 10, color: PAL.green });
  dw.label('lbl_Dfo', 'D', { cls: 'num', intro: 10, color: PAL.green });
  dw.label('lbl_Df', 'D', { cls: 'num', intro: 10, color: PAL.green });
  dw.label('lbl_Jf', 'J', { cls: 'num', intro: 10, color: PAL.green });
  dw.label('lbl_DHfo', 'D_H = H', { cls: 'point', intro: 10, color: PAL.green });
  dw.label('lbl_o2', 'o₂', { cls: 'point', intro: 10 });
  dw.link('rcable', 'rhangers');
  dw.link('Dform', 'Dforce', 'lbl_Df', 'lbl_Dfo', 'DHforce', 'lbl_DHfo');
  dw.link('Jform', 'Jforce', 'lbl_Jf', 'lbl_Jfo');

  // ------------------------------------------------------------------
  // step 11: tower equilibrium E = A + C, F = B + D
  // ------------------------------------------------------------------
  for (const nm of ['tpC', 'tpA', 'tpE']) {
    dw.arrow(nm, { intro: 11, ...ARROW });
  }
  dw.label('lbl_tpC', 'C', { cls: 'point', intro: 11, color: PAL.green });
  dw.label('lbl_tpA', 'A', { cls: 'point', intro: 11, color: PAL.green });
  dw.label('lbl_tpE', 'E', { cls: 'num', intro: 11, color: PAL.green });
  dw.arrow('Eform', { intro: 11, ...ARROW });
  dw.arrow('Fform', { intro: 11, ...ARROW });
  dw.label('lbl_Ef', 'E = A_V + C_V', { cls: 'point', intro: 11, color: PAL.green });
  dw.label('lbl_Ff', 'F = B_V + D_V', { cls: 'point', intro: 11, color: PAL.green });
  dw.link('Eform', 'tpE', 'lbl_Ef', 'lbl_tpE');
  dw.link('Fform', 'lbl_Ff');

  // ------------------------------------------------------------------
  // step 12: anchor components H_H, H_V and J_H, J_V
  // ------------------------------------------------------------------
  for (const nm of ['HHform', 'HVform', 'JHform', 'JVform', 'HHforce', 'HVforce']) {
    dw.arrow(nm, { intro: 12, ...NARROW });
  }
  dw.label('lbl_HHf', 'H_H', { cls: 'point', intro: 12, color: PAL.green });
  dw.label('lbl_HVf', 'H_V', { cls: 'point', intro: 12, color: PAL.green });
  dw.label('lbl_JHf', 'J_H', { cls: 'point', intro: 12, color: PAL.green });
  dw.label('lbl_JVf', 'J_V', { cls: 'point', intro: 12, color: PAL.green });
  dw.label('lbl_HHfo', 'H_H', { cls: 'point', intro: 12, color: PAL.green });
  dw.label('lbl_HVfo', 'H_V', { cls: 'point', intro: 12, color: PAL.green });
  dw.dashLine('cnHV1', { intro: 12, dash: 0.25 });
  dw.dashLine('cnHV2', { intro: 12, dash: 0.25 });
  dw.link('HHform', 'HHforce', 'lbl_HHf', 'lbl_HHfo');
  dw.link('HVform', 'HVforce', 'lbl_HVf', 'lbl_HVfo');

  // ------------------------------------------------------------------
  // resolve: pipes + magnitude readouts (in P = one hanger load)
  // ------------------------------------------------------------------
  for (let i = 0; i < 30; i++) {
    dw.poly(`ifm${i}`, 4, { intro: RESOLVE, opacity: 0.4, flash: false,
                            color: { pending: PAL.grey, final: () => PAL.red },
                            when: (st) => st.o1 });
  }
  for (let i = 0; i < 9; i++) {
    dw.poly(`ifsL${i}`, 4, { intro: RESOLVE, opacity: 0.4, flash: false,
                             color: { pending: PAL.grey, final: () => PAL.red },
                             when: (st) => st.o1 });
    dw.poly(`ifsR${i}`, 4, { intro: RESOLVE, opacity: 0.4, flash: false,
                             color: { pending: PAL.grey, final: () => PAL.red },
                             when: (st) => st.o1 });
  }
  const RO = ['A', 'B', 'C', 'D', 'H', 'J', 'E', 'F'];
  for (const r of RO) dw.label(`ro_${r}`, '', { intro: RESOLVE, flash: false, color: PAL.green });

  // ------------------------------------------------------------------
  // points
  // ------------------------------------------------------------------
  const show = (st) => st.showPts;
  const HANDLE = { r: 0.14 }, DERIVED = { r: 0.1 }, TINY = { r: 0.07 };
  dw.disk('pt_U12', { intro: 1, ...HANDLE });
  dw.disk('pt_T12', { intro: 1, ...DERIVED });
  dw.disk('pt_Z17', { intro: 2, ...HANDLE });
  dw.disk('pt_O8', { intro: 2, ...HANDLE });
  dw.disk('pt_B6', { intro: 3, ...HANDLE });
  dw.disk('pt_O10', { intro: 3, ...DERIVED });
  dw.disk('pt_J11', { intro: 3, ...DERIVED });
  dw.disk('pt_K11', { intro: 3, ...DERIVED });
  dw.disk('pt_M16', { intro: 7, ...HANDLE });
  dw.disk('pt_Z13', { intro: 8, ...DERIVED });
  dw.disk('pt_A14', { intro: 8, ...DERIVED });
  dw.disk('pt_U13', { intro: 10, ...DERIVED });
  dw.disk('pt_L13', { intro: 8, outro: 9, ...HANDLE, when: str });
  dw.disk('pt_T21', { intro: 8, outro: 9, ...HANDLE, when: str });
  dw.disk('pt_U9', { intro: 3, ...HANDLE, when: tr });
  dw.disk('pt_W9', { intro: 3, ...HANDLE, when: tr });
  for (let i = 0; i < 30; i++) dw.disk(`pt_c${i}`, { intro: 2, ...TINY, when: show });

  // ghost preview: the COMPLETE final force diagram (fans included — the
  // lib grew strokes ghost twins) + all offset component chains
  dw.ghostable('R1force', 'R2force', 'Aforce', 'Bforce', 'Hforce', 'Cforce',
               'Jforce', 'Dforce', 'tpC', 'tpA', 'tpE',
               'rays', 'srays', 'AHforce', 'AVforce', 'BVforce', 'CHforce',
               'DHforce', 'HHforce', 'HVforce');

  // ------------------------------------------------------------------
  // node-equilibrium inspector: 5 key nodes
  // ------------------------------------------------------------------
  dw.nodeInspector(3, { when: (st) => st.node > 0, w: 0.14, headLen: 0.42, headW: 0.17, r: 0.13 });
  const NODE_NAMES = ['tower 1', 'tower 2', 'anchor H', 'anchor J', 'sag'];
  const NODE_DISKS = ['pt_K11', 'pt_K11', 'pt_U12', 'pt_T12', 'pt_B6'];
  const nodeAt = [() => d.C, () => d.Z5, () => d.U12, () => d.T12, () => d.B6];
  const nodePolys = () => [
    [[d.A30, d.Z29], [d.Z29, d.W29], [d.W29, T29]],          // tower 1: C, A, E
    [[d.A30b, d.Z29b], [d.Z29b, d.W29b], [d.W29b, T29B]],    // tower 2: D, B, F
    [[d.K13, d.A14], [d.A14, d.K13]],                        // anchor: H + reaction
    [[d.K13, d.U13], [d.U13, d.K13]],                        // anchor: J + reaction
    [[d.cuts[14], d.cuts[15]], [d.cuts[15], d.K11], [d.K11, d.cuts[14]]],  // sag node
  ];
  function updateNode() {
    const j = Math.max(0, Math.min(4, Math.round(s.node) - 1));
    dw.selectDisk(null);
    dw.setNodeInspector(nodeAt[j](), 1.5, `node: ${NODE_NAMES[j]}`, nodePolys()[j]);
  }

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------
  function update() {
    dw.setLabel('form_title', [-0.35, 8.65]);
    dw.setLabel('force_title', [-0.3, 0.65]);
    dw.setLabel('force_sub', [-0.15, -0.05]);
    dw.setText('force_sub', `P (one hanger) :: ${d.u.toFixed(2)} unit`);

    // site
    const bands = [[AX1, TX1, 'deckL'], [TX1, TX2, 'deckM'], [TX2, AX2, 'deckR']];
    for (const [x0, x1, nm] of bands) {
      dw.setPoly(`${nm}f`, [[x0, DECK1], [x1, DECK1], [x1, DECK0], [x0, DECK0]]);
      dw.setStrokes(`${nm}e`, [
        [[x0, DECK1], [x1, DECK1]], [[x1, DECK1], [x1, DECK0]],
        [[x1, DECK0], [x0, DECK0]], [[x0, DECK0], [x0, DECK1]],
      ]);
    }
    dw.setSeg('tower1', [TX1, DECK0], [TX1, TOPY]);
    dw.setSeg('tower2', [TX2, DECK0], [TX2, TOPY]);
    dw.setDashLine('anch1', [[AX1, 4.4], [AX1, 6.1]]);
    dw.setDashLine('anch2', [[AX2, 4.4], [AX2, 6.1]]);
    const STAT = [AX1, TX1, CTR, TX2, AX2];
    for (let i = 0; i < 5; i++) dw.setDashLine(`stat${i}`, [[STAT[i], s.ey], [STAT[i], GUIDE_TOP]]);
    dw.setDashLine('ctr', [[CTR, 3.8], [CTR, 6.2]]);
    const HGX = [...SIDE_L, ...MAIN_X, ...SIDE_L.map(mirX)];
    HGX.forEach((x, i) => dw.setDashLine(`hg${i}`, [[x, s.ey], [x, GUIDE_TOP]]));
    dw.setSeg('dim', [AX1, DIMY], [AX2, DIMY]);
    dw.setStrokes('dimT', STAT.map((x) => [[x - 0.09, DIMY - 0.09], [x + 0.09, DIMY + 0.09]]));
    dw.setLabel('dim1', [(AX1 + TX1) / 2, DIMY + 0.42]);
    dw.setLabel('dim2', [CTR, DIMY + 0.42]);
    dw.setLabel('dim3', [(TX2 + AX2) / 2, DIMY + 0.42]);

    // main load
    dw.setArrow('R1form', [CTR, s.z17y], [CTR, s.z17y - s.sLS]);
    dw.setLabel('lbl_R1form', [CTR + 0.45, s.z17y - 0.3]);
    dw.setArrow('R1force', d.O8, d.T9);
    dw.setLabel('lbl_R1force', [s.o8x + 1.05, (d.O8[1] + d.T9[1]) / 2]);

    // per-hanger load arrows (applet o_2 layer): tails on the deck axis,
    // 0.5 . sLS long, straight down (applet: y 5.05 -> 4.55 at sLS = 1)
    const phaY = (DECK0 + DECK1) / 2, phaL = 0.5 * s.sLS;
    for (let j = 0; j < 29; j++) {
      dw.setArrow(`pha${j}`, [MAIN_X[j], phaY], [MAIN_X[j], phaY - phaL]);
    }
    for (let j = 0; j < 8; j++) {
      dw.setArrow(`phaL${j}`, [SIDE_L[j], phaY], [SIDE_L[j], phaY - phaL]);
      dw.setArrow(`phaR${j}`, [mirX(SIDE_L[j]), phaY], [mirX(SIDE_L[j]), phaY - phaL]);
    }

    // half-chords -> pole
    dw.setDashLine('hc1', [d.B6, d.C]);
    dw.setDashLine('hc2', [d.B6, d.Z5]);
    dw.setDashLine('con1', [d.J11, d.K11]);
    dw.setDashLine('con2', [d.O10, d.K11]);
    dw.setLabel('lbl_i1', V.add(d.O10, [0.35, 0.18]));
    dw.setLabel('lbl_i2', V.add(d.J11, [0.35, -0.22]));
    dw.setLabel('lbl_o', V.add(d.K11, [-0.42, -0.28]));

    // main trial (toggle)
    dw.setStrokes('tfanL', [...d.cuts.slice(15, 30), d.V9].map((c) => [dt.W9, c]));
    dw.setStrokes('tfanR', [...d.cuts.slice(0, 15), d.V9].map((c) => [dt.U9, c]));
    const pl = [];
    for (let i = 0; i < 15; i++) pl.push([dt.lt[i], dt.lt[i + 1]]);
    dw.setStrokes('tfunL', pl);
    const pr = [];
    for (let i = 0; i < 15; i++) pr.push([dt.rt[i], dt.rt[i + 1]]);
    dw.setStrokes('tfunR', pr);
    dw.setDashLine('tclL', [dt.lt[0], dt.lt[15]]);
    dw.setDashLine('tclR', [dt.rt[0], dt.rt[15]]);
    dw.setDashLine('tparL', [dt.W9, d.J11]);
    dw.setDashLine('tparR', [dt.U9, d.O10]);

    // rays + cable + hangers
    dw.setStrokes('rays', d.cuts.map((c) => [d.K11, c]));
    const cb = [];
    for (let i = 0; i < 30; i++) cb.push([d.cable[i], d.cable[i + 1]]);
    dw.setStrokes('cable', cb);
    dw.setStrokes('hangers', d.cable.slice(1, 30).map((p) => [p, [p[0], DECK1]]));

    // A and B
    dw.setArrow('Aforce', d.T9, d.K11);
    dw.setArrow('Bforce', d.K11, d.O8);
    dw.setArrow('Aform', d.aForm[0], d.aForm[1]);
    dw.setArrow('Bform', d.bForm[0], d.bForm[1]);
    dw.setLabel('lbl_Afo', V.add(V.mid(d.T9, d.K11), [-0.15, -0.42]));
    dw.setLabel('lbl_Bfo', V.add(V.mid(d.K11, d.O8), [-0.15, 0.42]));
    dw.setLabel('lbl_Af', V.add(d.aForm[1], [-0.12, 0.35]));
    dw.setLabel('lbl_Bf', V.add(d.bForm[1], [0.12, 0.35]));

    // components of A and B
    const M25 = [s.o8x, M25Y], A26 = [s.o8x - d.H, M25Y];
    dw.setArrow('AHforce', M25, A26);
    dw.setLabel('lbl_AHfo', [(M25[0] + A26[0]) / 2, M25Y + 0.38]);
    const I21 = [s.o8x + I21DX, d.O8[1]];
    const J21 = [I21[0], d.V9[1]], K21 = [I21[0], d.T9[1]];
    dw.setArrow('AVforce', K21, J21);
    dw.setArrow('BVforce', J21, I21);
    dw.setLabel('lbl_AVfo', [I21[0] + 0.6, (K21[1] + J21[1]) / 2]);
    dw.setLabel('lbl_BVfo', [I21[0] + 0.6, (J21[1] + I21[1]) / 2]);
    dw.setDashLine('cnAH1', [M25, d.T9]);
    dw.setDashLine('cnAH2', [A26, d.K11]);
    dw.setDashLine('cnAV1', [d.O8, I21]);
    dw.setDashLine('cnAV2', [d.V9, J21]);
    dw.setDashLine('cnAV3', [d.T9, K21]);
    dw.setArrow('AHform', d.C, V.add(d.C, [-s.sLS, 0]));
    dw.setArrow('AVform', d.C, V.add(d.C, [0, s.sLS]));
    dw.setArrow('BHform', d.Z5, V.add(d.Z5, [s.sLS, 0]));
    dw.setArrow('BVform', d.Z5, V.add(d.Z5, [0, s.sLS]));
    dw.setLabel('lbl_AHf', V.add(d.C, [-s.sLS - 0.45, 0.02]));
    dw.setLabel('lbl_AVf', V.add(d.C, [-0.42, s.sLS + 0.1]));
    dw.setLabel('lbl_BHf', V.add(d.Z5, [s.sLS + 0.45, 0.02]));
    dw.setLabel('lbl_BVf', V.add(d.Z5, [0.42, s.sLS + 0.1]));

    // side load R2
    const sx = (AX1 + TX1) / 2;
    dw.setArrow('R2form', [sx, s.z17y], [sx, s.z17y - s.sLS]);
    dw.setLabel('lbl_R2form', [sx + 0.45, s.z17y - 0.3]);
    dw.setArrow('R2force', d.M16, d.K13);
    dw.setLabel('lbl_R2force', [s.m16x + 1.0, (d.M16[1] + d.K13[1]) / 2]);
    dw.setDashLine('sfline', [[s.m16x, d.M16[1] + N16DY], [s.m16x, O16Y]]);

    // side trial + chord + H-locus + pole
    dw.setSeg('stRay1', dst.L13, d.M16);
    dw.setSeg('stRay2', dst.L13, d.K13);
    const sf = [];
    for (let i = 0; i < 9; i++) sf.push([dst.st[i], dst.st[i + 1]]);
    dw.setStrokes('stFun', sf);
    dw.setDashLine('stClose', [dst.st[0], dst.st[9]]);
    dw.setDashLine('stPar', [dst.L13, d.Z13]);
    dw.setDashLine('chordS', [d.U12, d.C]);
    dw.setDashLine('hlocus', [[s.m16x - d.H, d.M16[1] + N16DY], [s.m16x - d.H, O16Y]]);
    dw.setDashLine('poleLn', [d.Z13, d.A14]);
    dw.setLabel('lbl_i3', V.add(d.Z13, [-0.42, 0.12]));
    dw.setLabel('lbl_o1', V.add(d.A14, [-0.45, -0.25]));
    dw.setArrow('CHforce', d.W13, d.O16);
    dw.setLabel('lbl_CHfo', [(d.W13[0] + d.O16[0]) / 2, O16Y - 0.42]);
    dw.setArrow('CHform', d.C, V.add(d.C, [s.sLS, 0]));
    dw.setLabel('lbl_CHf', V.add(d.C, [s.sLS + 0.45, 0.02]));

    // side cable + H, C
    dw.setStrokes('srays', d.scuts.map((c) => [d.A14, c]));
    const sc = [];
    for (let i = 0; i < 9; i++) sc.push([d.scable[i], d.scable[i + 1]]);
    dw.setStrokes('scable', sc);
    dw.setStrokes('shangers', d.scable.slice(1, 9).map((p) => [p, [p[0], DECK1]]));
    dw.setArrow('Hforce', d.K13, d.A14);
    dw.setArrow('Cforce', d.A14, d.M16);
    dw.setLabel('lbl_Hfo', V.add(V.mid(d.K13, d.A14), [0.1, -0.45]));
    dw.setLabel('lbl_Cfo', V.add(V.mid(d.A14, d.M16), [-0.2, 0.42]));
    dw.setArrow('Cform', d.cForm[0], d.cForm[1]);
    dw.setLabel('lbl_Cf', V.add(d.cForm[1], [0.3, 0.3]));

    // right side span
    const rc = [];
    for (let i = 0; i < 9; i++) rc.push([d.rcable[i], d.rcable[i + 1]]);
    dw.setStrokes('rcable', rc);
    dw.setStrokes('rhangers', d.rcable.slice(1, 9).map((p) => [p, [p[0], DECK1]]));
    const rx = (TX2 + AX2) / 2;
    dw.setArrow('R2rform', [rx, s.z17y], [rx, s.z17y - s.sLS]);
    dw.setLabel('lbl_R2r', [rx + 0.45, s.z17y - 0.3]);
    dw.setDashLine('rfline', [[d.S13[0], d.M16[1] + N16DY], [d.S13[0], O16Y]]);
    dw.setArrow('Jforce', d.K13, d.U13);
    dw.setArrow('Dforce', d.U13, d.M16);
    dw.setLabel('lbl_Jfo', V.add(V.mid(d.K13, d.U13), [0.05, -0.45]));
    dw.setLabel('lbl_Dfo', V.add(V.mid(d.U13, d.M16), [0.4, 0.28]));
    dw.setArrow('Dform', d.dForm[0], d.dForm[1]);
    dw.setArrow('Jform', d.jF2[0], d.jF2[1]);
    dw.setLabel('lbl_Df', V.add(d.dForm[1], [-0.3, 0.3]));
    dw.setLabel('lbl_Jf', V.add(d.jF2[1], [0.35, -0.2]));
    dw.setArrow('DHforce', d.S13, d.O16);
    dw.setLabel('lbl_DHfo', [(d.S13[0] + d.O16[0]) / 2, O16Y - 0.42]);
    dw.setLabel('lbl_o2', V.add(d.U13, [0.45, -0.25]));

    // tower equilibrium polygons
    dw.setArrow('tpC', d.A30, d.Z29);
    dw.setArrow('tpA', d.Z29, d.W29);
    dw.setArrow('tpE', d.W29, T29);
    dw.setLabel('lbl_tpC', V.add(V.mid(d.A30, d.Z29), [-0.25, 0.4]));
    dw.setLabel('lbl_tpA', V.add(V.mid(d.Z29, d.W29), [-0.35, -0.3]));
    dw.setLabel('lbl_tpE', V.add(V.mid(d.W29, T29), [0.45, 0]));
    dw.setArrow('Eform', [TX1, DECK0 - 0.05 - s.sLS], [TX1, DECK0 - 0.05]);
    dw.setArrow('Fform', [TX2, DECK0 - 0.05 - s.sLS], [TX2, DECK0 - 0.05]);
    dw.setLabel('lbl_Ef', [TX1 - 1.55, DECK0 - 0.62]);
    dw.setLabel('lbl_Ff', [TX2 + 1.6, DECK0 - 0.62]);

    // anchor components
    dw.setArrow('HHform', d.U12, V.add(d.U12, [-s.sLS, 0]));
    dw.setArrow('HVform', d.U12, V.add(d.U12, [0, -s.sLS]));
    dw.setArrow('JHform', d.T12, V.add(d.T12, [s.sLS, 0]));
    dw.setArrow('JVform', d.T12, V.add(d.T12, [0, -s.sLS]));
    dw.setLabel('lbl_HHf', V.add(d.U12, [-s.sLS - 0.5, 0.02]));
    dw.setLabel('lbl_HVf', V.add(d.U12, [-0.45, -s.sLS - 0.05]));
    dw.setLabel('lbl_JHf', V.add(d.T12, [s.sLS + 0.5, 0.02]));
    dw.setLabel('lbl_JVf', V.add(d.T12, [0.45, -s.sLS - 0.05]));
    const E21 = [s.m16x, E21Y], F21 = [s.m16x - d.H, E21Y];
    dw.setArrow('HHforce', E21, F21);
    dw.setLabel('lbl_HHfo', [(E21[0] + F21[0]) / 2, E21Y - 0.42]);
    const M21 = [s.m16x + L21DX, d.K13[1]], N21 = [M21[0], d.A14[1]];
    dw.setArrow('HVforce', M21, N21);
    dw.setLabel('lbl_HVfo', [M21[0] + 0.6, (M21[1] + N21[1]) / 2]);
    dw.setDashLine('cnHV1', [d.K13, M21]);
    dw.setDashLine('cnHV2', [d.A14, N21]);

    // pipes + readouts
    for (let i = 0; i < 30; i++) {
      const n = V.dist(d.K11, d.cuts[i]) / d.u;
      dw.setPoly(`ifm${i}`, V.rectPoints(d.cable[i], d.cable[i + 1], 0.004 * s.sIF * n / 0.35));
    }
    for (let i = 0; i < 9; i++) {
      const n = V.dist(d.A14, d.scuts[i]) / d.u;
      dw.setPoly(`ifsL${i}`, V.rectPoints(d.scable[i], d.scable[i + 1], 0.004 * s.sIF * n / 0.35));
      dw.setPoly(`ifsR${i}`, V.rectPoints(d.rcable[8 - i], d.rcable[9 - i], 0.004 * s.sIF * n / 0.35));
    }
    const vals = { A: d.P(d.vA), B: d.P(d.vB), C: d.P(d.vC), D: d.P(d.vD),
                   H: d.P(d.vH), J: d.P(d.vJ), E: d.Emag / d.u, F: d.Emag / d.u };
    RO.forEach((r, i) => {
      dw.setLabel(`ro_${r}`, [25.9, 8.7 - 0.62 * i]);
      dw.setText(`ro_${r}`, `${r} = ${vals[r].toFixed(1)} P`);
    });

    // points
    dw.setDisk('pt_U12', d.U12);
    dw.setDisk('pt_T12', d.T12);
    dw.setDisk('pt_Z17', [CTR, s.z17y]);
    dw.setDisk('pt_O8', d.O8);
    dw.setDisk('pt_B6', d.B6);
    dw.setDisk('pt_O10', d.O10);
    dw.setDisk('pt_J11', d.J11);
    dw.setDisk('pt_K11', d.K11);
    dw.setDisk('pt_M16', d.M16);
    dw.setDisk('pt_Z13', d.Z13);
    dw.setDisk('pt_A14', d.A14);
    dw.setDisk('pt_U13', d.U13);
    dw.setDisk('pt_L13', dst.L13);
    dw.setDisk('pt_T21', dst.T21);
    dw.setDisk('pt_U9', dt.U9);
    dw.setDisk('pt_W9', dt.W9);
    for (let i = 0; i < 30; i++) dw.setDisk(`pt_c${i}`, d.cuts[i]);
  }

  function refresh() {
    d = compute(s);
    dt = computeTrial(s, d);
    dst = computeSideTrial(s, d);
    update();
    updateNode();
    // the applet's pic3 shows at step ≟ 0 = its RESOLVED presentation state:
    // keep it at our intro AND at the finished drawing, hide it mid-construction
    const last = player.k >= player.steps.length - 1;
    imgMesh.visible = player.k <= 1 || last;
    imgMat.opacity = player.k === 0 ? 0.95 : 0.4;
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  // ------------------------------------------------------------------
  // side panel + dragging
  // ------------------------------------------------------------------
  const view = panel.section('View');
  panel.button(view, 'zoom fit', () => dw.zoomFit());

  const par = panel.section('Parameters');
  panel.slider(par, s, 'load', 'load (P per hanger)', 0.1, 5, 0.1, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram', 0.5, 0.8, 0.01, refresh);
  panel.slider(par, s, 'factor', 'factor', 0.1, 1, 0.05, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 0.5, 2, 0.05, refresh);
  panel.toggle(par, s, 'trial', 'trial construction (main span)', refresh);
  panel.toggle(par, s, 'sideTrial', 'trial funicular (side span)', refresh);
  panel.toggle(par, s, 'arr', 'show per-hanger load arrows', refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 1, 0.05, refresh);
  panel.toggle(par, s, 'dims', 'show dimensions', refresh);
  panel.toggle(par, s, 'showPts', 'show points', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off): tower 1, tower 2, anchor H, anchor J, sag', 0, 5, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS });
    panel.syncAll();
    refresh();
  });

  const hits = [
    ['U12', () => d.U12, 1, RESOLVE + 1],
    ['Z17', () => [CTR, s.z17y], 2, RESOLVE + 1],
    ['O8', () => d.O8, 2, RESOLVE + 1],
    ['B6', () => d.B6, 3, RESOLVE + 1],
    ['M16', () => d.M16, 7, RESOLVE + 1],
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
      if (name === 'U12') s.u12y = Math.max(4.4, Math.min(6.1, wy));
      else if (name === 'Z17') s.z17y = Math.max(2.6, Math.min(4.9, wy));
      else if (name === 'B6') s.b6y = Math.max(3.8, Math.min(6.2, wy));
      else if (name === 'O8') {
        s.o8x = Math.max(22.6, Math.min(24.5, wx));
        s.o8y = Math.max(-0.2, Math.min(2.2, wy));
      } else if (name === 'M16') {
        s.m16x = Math.max(3.4, Math.min(8.5, wx));
        s.m16y = Math.max(0.2, Math.min(2.4, wy));
      }
      refresh();
    },
  );

  // click a key node to inspect it; the panel slider stays in sync
  dw.nodeSelect(nodeAt.map((at) => ({ at })), (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
