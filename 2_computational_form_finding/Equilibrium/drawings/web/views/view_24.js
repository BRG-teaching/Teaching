/**
 * Drawing view/24 "Suspended roof"
 * (https://block.arch.ethz.ch/eq/drawing/view/24) as a step-by-step
 * construction: a hall roof HANGS from a cable spanning between a low wall
 * (left) and a high wall (right). The roof sheet rides on short posts on
 * the cable; six equal loads of 264 kN press down on it.
 *
 * The funicular cable through the fixed midspan sag point A is found with
 * the half-chord construction (F mirrors the chord midpoint through A;
 * parallels to the chords B16-F and F-B17 through the top and bottom of
 * the load line meet at the pole o). At the LEFT support the applet
 * PRESCRIBES the backstay and pylon forces (A = 2074 kN, B = 1716 kN):
 * their directions follow from two circles in the force diagram, and the
 * ground points D and B2 are found by copying those directions into the
 * form. At the RIGHT support it is the other way round: the anchors E2/E4
 * are DRAGGABLE on the terraces and the forces C, D follow.
 *
 * Live port of view_24/applet_0/geogebra.xml (no step slider - staging is
 * ours). Regression reference = the LIVE applet (ggbApplet via CDP):
 * default / dragged E2, E4, G / all sliders match to <= 8.1e-13 (36 pts x
 * 7 states). A (sag) is fixed in the applet and stays fixed here.
 * See notes/view_24_analysis.md.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 24 — Suspended roof',
  subtitle: 'a hall roof hanging from a funicular cable',
  about: 'A hall roof hangs from a cable spanning from a low wall to a high one; the roof sheet rides on short posts standing on the cable, and six equal loads press down on it. The cable through the fixed midspan sag is found with the half-chord construction (parallels to the two chords through the ends of the load line meet at the pole o). At the left support the backstay and pylon forces are PRESCRIBED — 2074 and 1716 kN — and their directions, copied into the form, find the ground points; at the right support the anchors are draggable on the terraces and the forces follow. Reactions A, B, C, D close the force diagram around the load line.',
  frame: [[-4.95, -5.65], [39.93, 16.79]],
};

// fixed applet constants
const B16 = [4, 3.14419], B17 = [16, 5.44419];
const B8 = [10, 4.29419];                       // chord midpoint
const AY = 3.1626462648465594;                  // midspan sag point (fixed)
const Y_E2 = 2.352387110239738, Y_E4 = 2.292762910930911;   // anchor terraces
const F_KN = 264, A_KN = 2074, B_KN = 1716, I_KN1 = 1822, I_KN2 = 2305;
const Y_V0 = 0, Y_V1 = 8.275812846022394, Y_DIM = 9.431232406166883;
const Y_LTOP = 6.0;                             // load arrows end on this line
const WX = 15.156673217443146;                  // fixed x for the 22m dim
// terraced ground (applet polylines c_7 + n_8 + anchor plateaus)
const C7 = [[0.02364869730940251, 0.25373118086098806], [3.026419462440142, 0.25373118086098806],
  [3.0211309682188143, 0.3644067385089656], [6.63407506720345, 0.3493213769265667]];
const N8 = [[6.63407506720345, 0.3493213769265667], [6.63407506720345, 1.0170099546976228],
  [10.094966866441524, 1.0170099546976228], [10.094966866441524, 1.6846985324686787],
  [13.547830756213397, 1.6846985324686787], [13.547830756213397, 2.352387110239738]];
const PLAT1 = [[13.547830756213397, Y_E2], [17.138329452296965, Y_E2]];
const STEP1 = [[17.138329452296965, Y_E2], [17.138329452296965, Y_E4]];
const PLAT2 = [[17.138329452296965, Y_E4], [23.089489168714672, Y_E4]];
// roof sheet ends + post offsets from the cable nodes (fixed in the applet)
const ROOF_A = [2.858126437342005, 1.7402561800816176];
const ROOF_B = [17.033952468638745, 4.176853829222807];
const POST_DY = [-0.22, 0.68, 1.07, 1.0, 0.48, -0.53];  // at L2..L6, L1

const RESOLVE = 15;

const DEFAULTS = {
  E2x: 15.169472488416774,     // pylon-11 base on its terrace
  E4x: 20.587758143576618,     // backstay anchor on its terrace
  G: [27.513506288471305, 8.595410388370263],   // load-line top (free)
  sFD: 280,                    // scale force diagram [200, 400] kN per unit
  sLS: 1.3,                    // scale load symbol [0.5, 2]
  offR: 0.3,                   // offset reaction forces [0, 0.3]
  sIF: 0.05,                   // scale internal forces
  o1: true,                    // show internal forces
  n4: true,                    // show points
  lbl: true,                   // the applet's showLabels (its default is OFF; labels ON is the house default)
  rf: true,                    // show reaction forces in force diagram
  constr: true,                // show parabola construction (applet default OFF)
  dims: true,                  // show dimensions (applet default ON)
  node: 0,                     // node-equilibrium inspector (0 = off)
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The hall', d: 'left: a low wall on the left, a high wall on the right, terraced ground between and behind them — the roof must span 48 m (1 :: 400)' },
  { t: 'The two supports', d: 'left: the cable will hang from B₁₆ on the low wall to B₁₇ on the high wall; verticals mark the six node bays (4 + 5×8 + 4 m)' },
  { t: 'The sag and the half-chords', d: 'left: the cable must pass through A at midspan; F mirrors the chord midpoint through A, and B₁₆–F and F–B₁₇ are the chords of the two halves (the parabola construction)' },
  { t: 'The loads and the load line', d: 'left: the roof presses 6 × 264 kN onto the cable nodes — right: F₁ … F₆ stack down the load line from G (drag G)' },
  { t: 'The pole o', d: 'right: parallel to chord B₁₆–F through G, parallel to chord F–B₁₇ through g → pole o: every cable force will be a ray from o' },
  { t: 'From the left — members 3 and 4', d: 'right: rays o–G and o–b — left: parallel to o–G from B₁₆ to the first vertical → L₂, parallel to o–b on to L₃' },
  { t: 'Member 5', d: 'right: ray o–c — left: parallel on to L₄: the left half of the cable' },
  { t: 'From the right — members 9 and 8', d: 'right: rays o–g and o–f — left: parallel to o–g from B₁₇ to L₁, parallel to o–f on to L₆' },
  { t: 'Member 7', d: 'right: ray o–e — left: parallel on to L₅: the right half of the cable' },
  { t: 'Member 6 closes the cable', d: 'right: ray o–d — left: the two chains meet in the middle piece L₄–L₅, and it passes exactly through the sag point A (light tangent line)' },
  { t: 'The roof rides on the cable', d: 'left: short posts carry the grey roof sheet — standing on the cable in the middle (compression), hanging under it at the ends (tension)' },
  { t: 'Left support — members 1 and 2, forces PRESCRIBED', d: 'right: backstay force A = 2074 kN and pylon force B = 1716 kN are chosen: circles from G and o meet at j — left: copying directions j–G and j–o through B₁₆ finds the ground anchor D and the pylon foot B₂' },
  { t: 'Right support — members 10 and 11, geometry chosen', d: 'left: the anchors E₂ and E₄ are picked on the terraces (drag them!) — right: parallels through g and o meet at i₇: forces C and D follow from the geometry', },
  { t: 'The reactions A, B, C, D', d: 'right: the four outer edges G–j, j–o, o–i₇, i₇–g of the closed diagram are the support forces, read beside them (dotted offsets) — left: green arrows at the anchor D, the feet B₂ and E₂, and the anchor E₄' },
  { t: 'Tension and compression', d: 'cable, backstays and end posts resolve pink = tension, pylons and middle posts blue = compression (pipes ∝ force) — drag E₂, E₄ or G; click a node for its equilibrium',
    detail: (d) => [`max cable force N₉ = ${Math.round(d.Nmax)} kN`,
                    `A = ${Math.round(d.NA)} · B = ${Math.round(d.NB)} kN (prescribed) — C = ${Math.round(d.NC)} · D = ${Math.round(d.ND)} kN`],
    take: 'A and B are prescribed — those two pulls alone fix the ground points and every other force follows' },
];

const cache = {};
function inter(key, p1, d1, p2, d2) {
  cache[key] = V.intersect(p1, d1, p2, d2) || cache[key] || p1;
  return cache[key];
}
function cc(key, c1, r1, c2, r2, pickHigh) {
  const d = V.dist(c1, c2);
  if (d > r1 + r2 || d < Math.abs(r1 - r2) || d < 1e-9) return cache[key] || c1;
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, r1 * r1 - a * a));
  const u = V.mul(V.sub(c2, c1), 1 / d);
  const base = V.add(c1, V.mul(u, a));
  const off = [-u[1] * h, u[0] * h];
  const p1 = V.add(base, off), p2 = V.sub(base, off);
  cache[key] = (pickHigh ? (p1[1] > p2[1]) : (p1[1] < p2[1])) ? p1 : p2;
  return cache[key];
}
function rayPoly(key, p, dir, poly) {
  let best = null;
  for (let i = 0; i < poly.length - 1; i++) {
    const a = poly[i], b = poly[i + 1];
    const den = dir[0] * (a[1] - b[1]) - dir[1] * (a[0] - b[0]);
    if (Math.abs(den) < 1e-12) continue;
    const t = ((a[0] - p[0]) * (a[1] - b[1]) - (a[1] - p[1]) * (a[0] - b[0])) / den;
    const q = V.add(p, V.mul(dir, t));
    const s = Math.abs(b[0] - a[0]) > Math.abs(b[1] - a[1])
      ? (q[0] - a[0]) / (b[0] - a[0]) : (q[1] - a[1]) / (b[1] - a[1]);
    if (t > 1e-9 && s >= -1e-9 && s <= 1 + 1e-9 && (!best || t < best[0])) best = [t, q];
  }
  cache[key] = best ? best[1] : cache[key] || p;
  return cache[key];
}

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const A = [10, AY];
  const F = V.sub(V.mul(A, 2), B8);
  const G = [...s.G];
  const e = F_KN / s.sFD;
  const LL = [G];                                // G, b, c, d, e, f, g
  for (let k = 1; k <= 6; k++) LL.push([G[0], G[1] - e * k]);
  const g = LL[6];
  const o = inter('o', G, V.sub(F, B16), g, V.sub(B17, F));
  const j = cc('j', G, A_KN / s.sFD, o, B_KN / s.sFD, true);
  const i = cc('i', g, I_KN1 / s.sFD, o, I_KN2 / s.sFD, false);
  const E2 = [s.E2x, Y_E2], E4 = [s.E4x, Y_E4];
  const i7 = inter('i7', g, V.sub(E4, B17), o, V.sub(E2, B17));
  const E = inter('E', B17, V.sub(o, i), [0, Y_E2], [1, 0]);   // reference anchor
  // cable nodes (funicular with pole o)
  const up = [0, 1];
  const atx = (key, p, d, x) => inter(key, p, d, [x, 0], up);
  const L2 = atx('L2', B16, V.sub(o, G), 5);
  const L3 = atx('L3', L2, V.sub(o, LL[1]), 7);
  const L4 = atx('L4', L3, V.sub(o, LL[2]), 9);
  const L1 = atx('L1', B17, V.sub(o, g), 15);
  const L6 = atx('L6', L1, V.sub(o, LL[5]), 13);
  const L5 = atx('L5', L6, V.sub(o, LL[4]), 11);
  const Ls = [L2, L3, L4, L5, L6, L1];
  // left support: prescribed forces -> ground points
  const D = rayPoly('D', B16, V.unit(V.sub(G, j)), C7);
  const B2 = rayPoly('B2', B16, V.unit(V.sub(o, j)), [...C7, ...N8]);
  // form reaction arrow anchors
  const N1 = V.sub(D, V.mul(V.unit(V.sub(B16, D)), s.sLS));
  const N = V.add(B2, V.mul(V.unit(V.sub(B2, B16)), s.sLS));
  const P = V.add(E2, V.mul(V.unit(V.sub(E2, B17)), s.sLS));
  const Q = V.add(E4, V.mul(V.unit(V.sub(E4, B17)), s.sLS));
  // reaction offsets in the force diagram (one rigid vector per chain)
  const u1 = V.unit(V.sub(j, G)), offA = V.mul([-u1[1], u1[0]], s.offR);
  const u2 = V.unit(V.sub(j, o)), offB = V.mul([u2[1], -u2[0]], s.offR);
  const u11 = V.unit(V.sub(o, i7)), offC = V.mul([u11[1], -u11[0]], s.offR);
  const u10 = V.unit(V.sub(i7, g)), offD = V.mul([u10[1], -u10[0]], s.offR);
  const K3 = V.add(j, offA), J3 = V.add(G, offA);
  const M3 = V.add(o, offB), O3 = V.add(j, offB);
  const P3 = V.add(i7, offC), R3 = V.add(o, offC);
  const S3 = V.add(g, offD), V3 = V.add(i7, offD);

  // members 1..11: [form a, form b, force f1, force f2] (macro orientation)
  const M11 = [null,
    [D, B16, G, j], [B16, B2, o, j],
    [B16, L2, G, o], [L2, L3, LL[1], o], [L3, L4, LL[2], o], [L4, L5, LL[3], o],
    [L5, L6, LL[4], o], [L6, L1, LL[5], o], [L1, B17, g, o],
    [B17, E4, g, i7], [B17, E2, i7, o],
  ];
  const col = [], Nk = [];
  for (let k = 1; k <= 11; k++) {
    const [a, b, f1, f2] = M11[k];
    col[k] = V.isCompression(V.ggbAngle(V.sub(b, a), V.sub(f2, f1))) ? PAL.blue : PAL.red;
    Nk[k] = V.dist(f1, f2) * s.sFD;
  }
  // roof posts + sheet
  const posts = Ls.map((L, k) => [L, V.add(L, [0, POST_DY[k]])]);
  const roof = [ROOF_A, ...posts.map((p) => p[1]), ROOF_B];
  // right-anchor angle at E2 (the applet's alpha)
  const alpha = Math.atan2(B17[1] - E2[1], B17[0] - E2[0]) * 180 / Math.PI;

  return { A, F, G, LL, g, o, j, i, i7, E2, E4, E, Ls, L2, L3, L4, L5, L6, L1,
           D, B2, N1, N, P, Q, K3, J3, M3, O3, P3, R3, S3, V3, M11, col, Nk,
           posts, roof, alpha,
           Nmax: Nk[9], NA: Nk[1], NB: Nk[2], NC: Nk[11], ND: Nk[10] };
}

const SUB = ' ₁₂₃₄₅₆';

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, G: [...DEFAULTS.G] };
  let d = compute(s);

  const W_BAR = 0.1, W_SKEL = 0.033, W_FSEG = 0.06;
  const ARROW = { w: 0.12, headLen: 0.5, headW: 0.21 };
  const REAC = { w: 0.16, headLen: 0.58, headW: 0.25 };
  const memCol = (k) => ({ pending: PAL.black, final: (dd) => dd.col[k] });
  const numCol = (k) => ({ final: (dd) => dd.col[k] });
  const IK = [null, 12, 12, 6, 6, 7, 10, 9, 8, 8, 13, 13];   // member intro steps

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('form_sub', '1 :: 400 m', { flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // step 1: the site (instant)
  dw.strokes('ground', 12, { intro: 1, w: W_SKEL, color: PAL.grey });
  dw.dashLine('plat1', { intro: 1, dash: 0.28, color: 0x999999 });
  dw.dashLine('plat2', { intro: 1, dash: 0.28, color: 0x999999 });
  dw.instant('ground', 'plat1', 'plat2');

  // step 2: supports + chord + bay verticals
  dw.dashLine('chord', { intro: 2, dash: 0.3 });
  dw.dashLine('v4', { intro: 2, dash: 0.18 });
  dw.dashLine('v16', { intro: 2, dash: 0.18 });
  for (let i = 0; i < 6; i++) dw.dashLine(`vn${i}`, { intro: 2, dash: 0.18 });

  // step 3: the parabola construction (kept behind the toggle)
  const cWhen = (st) => st.constr;
  dw.dashLine('sagGuide', { intro: 3, dash: 0.3, when: cWhen });
  dw.dashLine('chordL', { intro: 3, dash: 0.35, when: cWhen });
  dw.dashLine('chordR', { intro: 3, dash: 0.35, when: cWhen });
  dw.disk('pt_A', { intro: 3, r: 0.14, when: cWhen });
  dw.disk('pt_F', { intro: 3, r: 0.14, when: cWhen });
  dw.disk('pt_B8', { intro: 3, r: 0.11, when: cWhen });
  dw.label('lbl_A', 'A', { cls: 'point', intro: 3, when: cWhen });
  dw.label('lbl_F', 'F', { cls: 'point', intro: 3, when: cWhen });

  // step 4: loads + load line (name labels behind the applet's showLabels)
  const lblOn = (st) => st.lbl;
  for (let i = 1; i <= 6; i++) {
    dw.arrow(`loadF${i}`, { intro: 4, ...ARROW });
    dw.label(`lF${i}`, `F${SUB[i]}`, { cls: 'num', intro: 4, color: PAL.green, when: lblOn });
    dw.arrow(`edge${i}`, { intro: 4, ...ARROW });
    dw.label(`lFf${i}`, `F${SUB[i]}`, { cls: 'num', intro: 4, color: PAL.green, when: lblOn });
  }

  // step 10: tangent through A (light, the applet's a_7)
  dw.dashLine('tangent', { intro: 10, dash: 0.3, color: 0xc0c0c0 });

  // members at their steps
  for (let k = 1; k <= 11; k++) {
    dw.seg(`mem${k}`, { intro: IK[k], w: W_BAR, color: memCol(k) });
    dw.seg(`fseg${k}`, { intro: IK[k], w: W_FSEG, color: memCol(k) });
    dw.label(`n${k}f`, `${k}`, { cls: 'num', intro: IK[k], color: numCol(k), when: lblOn });
    dw.label(`n${k}s`, `${k}`, { cls: 'num', intro: IK[k], color: numCol(k), when: lblOn });
  }

  // step 11: posts + roof sheet
  for (let i = 0; i < 6; i++) {
    dw.seg(`post${i}`, { intro: 11, w: W_BAR * 0.7,
      color: { pending: PAL.black, final: () => (POST_DY[i] > 0 ? PAL.blue : PAL.red) } });
  }
  dw.strokes('roof', 7, { intro: 11, w: 0.07, color: PAL.grey });

  // step 14: reactions A, B, C, D (offset arrows + dotted connectors + form)
  const rWhen = (st) => st.rf;
  for (const r of ['A', 'B', 'C', 'D']) {
    dw.dashLine(`conn${r}1`, { intro: 14, dash: 0.2, color: 0x006400, when: rWhen });
    dw.dashLine(`conn${r}2`, { intro: 14, dash: 0.2, color: 0x006400, when: rWhen });
    dw.arrow(`reac${r}`, { intro: 14, ...REAC, when: rWhen });
    dw.arrow(`reac${r}form`, { intro: 14, ...REAC });
    dw.label(`lbl${r}f`, r, { cls: 'num', intro: 14, color: PAL.green, when: lblOn });
    dw.label(`lbl${r}s`, r, { cls: 'num', intro: 14, color: PAL.green, when: (st) => st.lbl && st.rf });
  }

  // internal-force pipes
  for (let k = 1; k <= 11; k++) {
    dw.poly(`if${k}`, 4, { intro: RESOLVE, opacity: 1.0, z: -0.18, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd.col[k] }, when: (st) => st.o1 });
  }

  // dimensions (applet showDims, default ON)
  dw.strokes('dimTop', 17, { intro: 2, w: 0.025, color: 0xa8a8a8, flash: false, when: (st) => st.dims });
  const DIMT = [['d4a', '4m'], ['d8a', '8m'], ['d8b', '8m'], ['d8c', '8m'], ['d8d', '8m'],
                ['d8e', '8m'], ['d4b', '4m']];
  for (const [nm, txt] of DIMT) dw.label(nm, txt, { cls: 'point', intro: 2, flash: false, when: (st) => st.dims });
  dw.strokes('wallDims', 6, { intro: 1, w: 0.025, color: 0xa8a8a8, flash: false, when: (st) => st.dims });
  dw.label('dimH1', '8.8m', { cls: 'point', intro: 1, flash: false, when: (st) => st.dims });
  dw.label('dimH2', '11.5m', { cls: 'point', intro: 1, flash: false, when: (st) => st.dims });
  dw.label('dimH3', '12m', { cls: 'point', intro: 1, flash: false, when: (st) => st.dims });
  dw.strokes('dimE4', 3, { intro: 13, w: 0.025, color: 0xa8a8a8, flash: false, when: (st) => st.dims });
  dw.label('dimE4t', '', { cls: 'point', intro: 13, flash: false, when: (st) => st.dims });
  // applet's e_8 dim: horizontal offset of the dragged pylon foot E2 from its start (0m at rest)
  dw.strokes('dimE2', 3, { intro: 13, w: 0.025, color: 0xa8a8a8, flash: false, when: (st) => st.dims });
  dw.label('dimE2t', '', { cls: 'point', intro: 13, flash: false, when: (st) => st.dims });
  dw.label('dimAlpha', '', { cls: 'point', intro: 13, flash: false, when: (st) => st.dims });

  // points
  const HANDLE = { r: 0.19 }, DERIVED = { r: 0.14 };
  const show = (st) => st.n4;
  dw.disk('pt_B16', { intro: 2, ...DERIVED, when: show });
  dw.disk('pt_B17', { intro: 2, ...DERIVED, when: show });
  dw.label('lbl_B16', 'B₁₆', { cls: 'point', intro: 2, when: show });
  dw.label('lbl_B17', 'B₁₇', { cls: 'point', intro: 2, when: show });
  dw.disk('pt_G', { intro: 4, ...HANDLE });
  dw.label('lbl_G', 'G', { cls: 'point', intro: 4, when: show });
  dw.disk('pt_o', { intro: 5, ...DERIVED, when: show });
  dw.label('lbl_o', 'o', { cls: 'point', intro: 5, when: show });
  for (let i = 0; i < 6; i++) dw.disk(`pt_L${i}`, { intro: [6, 6, 7, 9, 8, 8][i], ...DERIVED, when: show });
  const lltxt = ['b', 'c', 'd', 'e', 'f', 'g'];
  for (let i = 1; i <= 6; i++) dw.label(`lbl_ll${i}`, lltxt[i - 1], { cls: 'point', intro: 4, when: show });
  dw.disk('pt_j', { intro: 12, ...DERIVED, when: show });
  dw.label('lbl_j', 'j', { cls: 'point', intro: 12, when: show });
  dw.disk('pt_D', { intro: 12, ...DERIVED, when: show });
  dw.label('lbl_D', 'D', { cls: 'point', intro: 12, when: show });
  dw.disk('pt_B2', { intro: 12, ...DERIVED, when: show });
  dw.label('lbl_B2', 'B₂', { cls: 'point', intro: 12, when: show });
  dw.disk('pt_i7', { intro: 13, ...DERIVED, when: show });
  dw.label('lbl_i7', 'i₇', { cls: 'point', intro: 13, when: show });
  dw.disk('pt_E2', { intro: 13, ...HANDLE });
  dw.label('lbl_E2', 'E₂', { cls: 'point', intro: 13, when: show });
  dw.disk('pt_E4', { intro: 13, ...HANDLE });
  dw.label('lbl_E4', 'E₄', { cls: 'point', intro: 13, when: show });

  // readouts (the applet's Text3 block; C/D subscripts corrected)
  dw.label('ro_N', '', { intro: RESOLVE, flash: false, color: PAL.red });
  dw.label('ro_A', '', { intro: 12, flash: false, color: PAL.green });
  dw.label('ro_B', '', { intro: 12, flash: false, color: PAL.green });
  dw.label('ro_C', '', { intro: 13, flash: false, color: PAL.green });
  dw.label('ro_D', '', { intro: 13, flash: false, color: PAL.green });

  // node-equilibrium inspector
  dw.nodeInspector(3, { when: (st) => st.node > 0, w: 1.5 * W_BAR, headLen: 0.55, headW: 0.23, r: 0.24 });

  // dual pairs + ghost + re-flashes
  for (let k = 1; k <= 11; k++) dw.link(`mem${k}`, `fseg${k}`, `n${k}f`, `n${k}s`);
  for (let i = 1; i <= 6; i++) dw.link(`loadF${i}`, `edge${i}`, `lF${i}`, `lFf${i}`);
  dw.link('reacA', 'reacAform', 'lblAf', 'lblAs', 'connA1', 'connA2');
  dw.link('reacB', 'reacBform', 'lblBf', 'lblBs', 'connB1', 'connB2');
  dw.link('reacC', 'reacCform', 'lblCf', 'lblCs', 'connC1', 'connC2');
  dw.link('reacD', 'reacDform', 'lblDf', 'lblDs', 'connD1', 'connD2');
  dw.ghostable(...[...Array(11)].map((_, i) => `fseg${i + 1}`),
               ...[...Array(6)].map((_, i) => `edge${i + 1}`),
               'reacA', 'reacB', 'reacC', 'reacD');
  dw.highlight('chordL', [5]);
  dw.highlight('chordR', [5]);
  dw.highlight('mem6', [11]);
  dw.highlight('mem1', [14]);
  dw.highlight('mem2', [14]);
  dw.highlight('mem10', [14]);
  dw.highlight('mem11', [14]);

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [-1.55, 15.4]);
    dw.setLabel('form_sub', [-1.75, 14.6]);
    dw.setLabel('force_title', [24.0, 15.4]);
    dw.setLabel('force_sub', [24.0, 14.6]);
    dw.setText('force_sub', `1 unit :: ${s.sFD.toFixed(0)} kN`);

    // site
    const gpath = [...C7, ...N8, ...PLAT1, ...STEP1, ...PLAT2];
    const gs = [];
    for (let i = 0; i < 12; i++) gs.push([gpath[i], gpath[i + 1]]);
    dw.setStrokes('ground', [[C7[0], C7[1]], [C7[1], C7[2]], [C7[2], C7[3]],
      [N8[0], N8[1]], [N8[1], N8[2]], [N8[2], N8[3]], [N8[3], N8[4]], [N8[4], N8[5]],
      [PLAT1[0], PLAT1[1]], [STEP1[0], STEP1[1]], [PLAT2[0], PLAT2[1]],
      [[-0.922, 0.2537], C7[0]]]);
    dw.setDashLine('plat1', PLAT1);
    dw.setDashLine('plat2', PLAT2);

    // supports, chord, verticals
    dw.setDashLine('chord', [B16, B17]);
    dw.setDashLine('v4', [[4, Y_V0], [4, Y_V1]]);
    dw.setDashLine('v16', [[16, Y_V0], [16, Y_V1]]);
    for (let i = 0; i < 6; i++) {
      const x = 5 + 2 * i;
      dw.setDashLine(`vn${i}`, [[x, Y_V0], [x, Y_V1]]);
    }

    // construction
    dw.setDashLine('sagGuide', [[10, Y_V0], [10, Y_V1]]);
    dw.setDashLine('chordL', [B16, d.F]);
    dw.setDashLine('chordR', [d.F, B17]);
    dw.setDisk('pt_A', d.A);
    dw.setDisk('pt_F', d.F);
    dw.setDisk('pt_B8', B8);
    dw.setLabel('lbl_A', V.add(d.A, [-0.42, 0.3]));
    dw.setLabel('lbl_F', V.add(d.F, [-0.42, -0.25]));

    // loads + load line
    for (let i = 1; i <= 6; i++) {
      const x = 5 + 2 * (i - 1);
      dw.setArrow(`loadF${i}`, [x, Y_LTOP + s.sLS], [x, Y_LTOP]);
      dw.setLabel(`lF${i}`, [x + 0.42, Y_LTOP + 0.55 * s.sLS]);
      dw.setArrow(`edge${i}`, d.LL[i - 1], d.LL[i]);
      dw.setLabel(`lFf${i}`, [d.LL[i][0] - 1.05, (d.LL[i - 1][1] + d.LL[i][1]) / 2]);
      dw.setLabel(`lbl_ll${i}`, V.add(d.LL[i], [-0.38, i === 6 ? -0.28 : 0.02]));
    }
    dw.setDashLine('tangent', [inter('tA', d.L4, V.sub(d.L5, d.L4), [7.6, 0], [0, 1]),
                               inter('tB', d.L4, V.sub(d.L5, d.L4), [12.4, 0], [0, 1])]);

    // members + numbers
    for (let k = 1; k <= 11; k++) {
      const [a, b, f1, f2] = d.M11[k];
      dw.setSeg(`mem${k}`, a, b);
      dw.setSeg(`fseg${k}`, f1, f2);
      const m = V.mid(a, b), mf = V.mid(f1, f2);
      const pp = V.perp(V.unit(V.sub(b, a)));
      if (k >= 3 && k <= 9) {                      // cable: above
        dw.setLabel(`n${k}f`, V.add(m, V.mul(pp, pp[1] > 0 ? 0.38 : -0.38)));
      } else if (k === 1 || k === 10) {            // backstays: above
        dw.setLabel(`n${k}f`, V.add(m, V.mul(pp, pp[1] > 0 ? 0.38 : -0.38)));
      } else {                                     // pylons: right side
        dw.setLabel(`n${k}f`, V.add(m, V.mul(pp, pp[0] > 0 ? 0.38 : -0.38)));
      }
      const pf = V.perp(V.unit(V.sub(f2, f1)));
      if (k >= 3 && k <= 9) {                      // rays: label above
        dw.setLabel(`n${k}s`, V.add(mf, V.mul(pf, pf[1] > 0 ? 0.34 : -0.34)));
      } else {                                     // outer edges: toward the interior
        const c0 = V.mul(V.add(V.add(d.G, d.j), V.add(V.add(d.o, d.i7), d.g)), 1 / 5);
        const sg = V.dot(pf, V.sub(c0, mf)) > 0 ? 1 : -1;
        dw.setLabel(`n${k}s`, V.add(mf, V.mul(pf, 0.38 * sg)));
      }
    }

    // posts + roof
    for (let i = 0; i < 6; i++) dw.setSeg(`post${i}`, d.posts[i][0], d.posts[i][1]);
    const rs = [];
    for (let i = 0; i < 7; i++) rs.push([d.roof[i], d.roof[i + 1]]);
    dw.setStrokes('roof', rs);

    // reactions
    dw.setDashLine('connA1', [d.G, d.J3]);
    dw.setDashLine('connA2', [d.j, d.K3]);
    dw.setArrow('reacA', d.K3, d.J3);
    dw.setArrow('reacAform', d.D, d.N1);
    dw.setDashLine('connB1', [d.o, d.M3]);
    dw.setDashLine('connB2', [d.j, d.O3]);
    dw.setArrow('reacB', d.M3, d.O3);
    dw.setArrow('reacBform', d.N, d.B2);
    dw.setDashLine('connC1', [d.i7, d.P3]);
    dw.setDashLine('connC2', [d.o, d.R3]);
    dw.setArrow('reacC', d.P3, d.R3);
    dw.setArrow('reacCform', d.P, d.E2);
    dw.setDashLine('connD1', [d.g, d.S3]);
    dw.setDashLine('connD2', [d.i7, d.V3]);
    dw.setArrow('reacD', d.S3, d.V3);
    dw.setArrow('reacDform', d.E4, d.Q);
    dw.setLabel('lblAf', V.add(d.N1, [-0.35, -0.4]));
    dw.setLabel('lblBf', V.add(d.N, [0.42, -0.15]));
    dw.setLabel('lblCf', V.add(d.P, [0.05, -0.45]));
    dw.setLabel('lblDf', V.add(d.Q, [0.42, -0.2]));
    dw.setLabel('lblAs', V.add(V.mid(d.K3, d.J3), V.mul(V.sub(d.K3, d.j), 1.6)));
    dw.setLabel('lblBs', V.add(V.mid(d.M3, d.O3), V.mul(V.sub(d.M3, d.o), 1.6)));
    dw.setLabel('lblCs', V.add(V.mid(d.P3, d.R3), V.mul(V.sub(d.P3, d.i7), 1.6)));
    dw.setLabel('lblDs', V.add(V.mid(d.S3, d.V3), V.mul(V.sub(d.S3, d.g), 1.6)));

    // pipes
    for (let k = 1; k <= 11; k++) {
      const [a, b, f1, f2] = d.M11[k];
      dw.setPoly(`if${k}`, V.rectPoints(a, b, s.sIF * V.dist(f1, f2)));
    }

    // dimensions
    const xs = [4, 5, 7, 9, 11, 13, 15, 16];
    const tick = (x) => [[x - 0.12, Y_DIM - 0.12], [x + 0.12, Y_DIM + 0.12]];
    const segs = [];
    for (let i = 0; i < 7; i++) segs.push([[xs[i], Y_DIM], [xs[i + 1], Y_DIM]]);
    for (const x of xs) segs.push(tick(x));
    segs.push([[4, Y_V1], [4, Y_DIM]]);
    segs.push([[16, Y_V1], [16, Y_DIM]]);
    dw.setStrokes('dimTop', segs);
    const dimtx = [4.5, 6, 8, 10, 12, 14, 15.5];
    DIMT.forEach(([nm], i) => dw.setLabel(nm, [dimtx[i], Y_DIM + 0.42]));
    // wall heights + right height (static)
    const vt = (x, y) => [[x - 0.12, y], [x + 0.12, y]];
    dw.setStrokes('wallDims', [[[-0.922, B17[1]], [-0.922, B16[1]]],
      [[-0.922, B16[1]], [-0.922, 0.2537]],
      vt(-0.922, B17[1]), vt(-0.922, B16[1]), vt(-0.922, 0.2537),
      [[23.6, B17[1]], [23.6, Y_E2]]]);
    dw.setLabel('dimH1', [-1.5, 4.29]);
    dw.setLabel('dimH2', [-1.5, 1.7]);
    dw.setLabel('dimH3', [22.9, 3.87]);
    // live anchor distance + angle
    dw.setStrokes('dimE4', [[[WX, -0.282], [d.E4[0], -0.282]],
      vt(WX, -0.282), vt(d.E4[0], -0.282)]);
    dw.setLabel('dimE4t', [(WX + d.E4[0]) / 2, -0.7]);
    dw.setText('dimE4t', `${Math.round(4 * Math.abs(d.E4[0] - WX))}m`);
    // e_8: offset of E2 from its start position, on the row through N_2 (0m at rest)
    const Y_DIM2 = -1.2916072318505418, E2X0 = 15.169472488416774;
    dw.setStrokes('dimE2', [[[E2X0, Y_DIM2], [d.E2[0], Y_DIM2]],
      [[E2X0 - 0.12, Y_DIM2 - 0.12], [E2X0 + 0.12, Y_DIM2 + 0.12]],
      [[d.E2[0] - 0.12, Y_DIM2 + 0.12], [d.E2[0] + 0.12, Y_DIM2 - 0.12]]]);
    dw.setLabel('dimE2t', [(E2X0 + d.E2[0]) / 2, Y_DIM2 - 0.42]);
    dw.setText('dimE2t', `${Math.round(4 * Math.abs(d.E2[0] - E2X0))}m`);
    dw.setLabel('dimAlpha', V.add(d.E2, [2.0, 0.72]));
    dw.setText('dimAlpha', `α = ${(Math.round(d.alpha * 10) / 10).toFixed(1)}°`);

    // points
    dw.setDisk('pt_B16', B16);
    dw.setDisk('pt_B17', B17);
    dw.setLabel('lbl_B16', V.add(B16, [-0.75, 0.15]));
    dw.setLabel('lbl_B17', V.add(B17, [0.3, 0.4]));
    dw.setDisk('pt_G', d.G);
    dw.setLabel('lbl_G', V.add(d.G, [-0.45, 0.32]));
    dw.setDisk('pt_o', d.o);
    dw.setLabel('lbl_o', V.add(d.o, [0.42, -0.05]));
    for (let i = 0; i < 6; i++) dw.setDisk(`pt_L${i}`, d.Ls[i]);
    dw.setDisk('pt_j', d.j);
    dw.setLabel('lbl_j', V.add(d.j, [0.15, 0.42]));
    dw.setDisk('pt_D', d.D);
    dw.setLabel('lbl_D', V.add(d.D, [-0.15, 0.45]));
    dw.setDisk('pt_B2', d.B2);
    dw.setLabel('lbl_B2', V.add(d.B2, [0.45, 0.15]));
    dw.setDisk('pt_i7', d.i7);
    dw.setLabel('lbl_i7', V.add(d.i7, [0.1, -0.5]));
    dw.setDisk('pt_E2', d.E2);
    dw.setLabel('lbl_E2', V.add(d.E2, [-0.55, -0.35]));
    dw.setDisk('pt_E4', d.E4);
    dw.setLabel('lbl_E4', V.add(d.E4, [0.05, 0.45]));

    // readouts
    dw.setLabel('ro_N', [-1.0, 13.4]);
    dw.setText('ro_N', `max cable force N₉ = ${Math.round(d.Nmax)} kN`);
    dw.setLabel('ro_A', [-1.0, 12.6]);
    dw.setText('ro_A', `A = N₁ = ${Math.round(d.NA)} kN (prescribed)`);
    dw.setLabel('ro_B', [-1.0, 11.9]);
    dw.setText('ro_B', `B = N₂ = ${Math.round(d.NB)} kN (prescribed)`);
    dw.setLabel('ro_C', [-1.0, 11.2]);
    dw.setText('ro_C', `C = N₁₁ = ${Math.round(d.NC)} kN`);
    dw.setLabel('ro_D', [-1.0, 10.5]);
    dw.setText('ro_D', `D = N₁₀ = ${Math.round(d.ND)} kN`);
  }

  // node-equilibrium inspector: 1-6 cable nodes L2..L1, 7 B16, 8 B17,
  // 9 anchor D, 10 pylon foot B2, 11 pylon foot E2, 12 anchor E4
  // (support reactions on the drawn offset arrows).
  function nodePoly() {
    const n = Math.max(1, Math.round(s.node));
    const { LL, o, j, i7, g, K3, J3, M3, O3, P3, R3, S3, V3 } = d;
    switch (n) {
      case 1: return [[LL[0], LL[1]], [LL[1], o], [o, LL[0]]];
      case 2: return [[LL[1], LL[2]], [LL[2], o], [o, LL[1]]];
      case 3: return [[LL[2], LL[3]], [LL[3], o], [o, LL[2]]];
      case 4: return [[LL[3], LL[4]], [LL[4], o], [o, LL[3]]];
      case 5: return [[LL[4], LL[5]], [LL[5], o], [o, LL[4]]];
      case 6: return [[LL[5], LL[6]], [LL[6], o], [o, LL[5]]];
      case 7: return [[LL[0], o], [o, j], [j, LL[0]]];
      case 8: return [[o, g], [g, i7], [i7, o]];
      case 9: return [[LL[0], j], [K3, J3]];
      case 10: return [[j, o], [M3, O3]];
      case 11: return [[o, i7], [P3, R3]];
      default: return [[i7, g], [S3, V3]];
    }
  }
  const NODE_DISKS = [null, 'pt_L0', 'pt_L1', 'pt_L2', 'pt_L3', 'pt_L4', 'pt_L5',
                      'pt_B16', 'pt_B17', 'pt_D', 'pt_B2', 'pt_E2', 'pt_E4'];
  const NODE_NAMES = [null, 'L₂', 'L₃', 'L₄', 'L₅', 'L₆', 'L₁', 'B₁₆', 'B₁₇',
                      'D (anchor)', 'B₂ (pylon foot)', 'E₂ (pylon foot)', 'E₄ (anchor)'];
  function updateNode() {
    const n = Math.round(s.node);
    dw.selectDisk(n > 0 ? NODE_DISKS[n] : null);
    dw.setNodeInspector([10, 12.5], 1.9, n > 0 ? `node ${NODE_NAMES[n]}` : '', nodePoly());
  }

  let player = null;
  function refresh() {
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
  panel.slider(par, s, 'sFD', 'scale force diagram (kN/unit)', 200, 400, 5, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 0.5, 2, 0.1, refresh);
  panel.slider(par, s, 'offR', 'offset reaction forces', 0, 0.3, 0.02, refresh);
  panel.toggle(par, s, 'rf', 'show reaction forces in force diagram', refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.15, 0.005, refresh);
  panel.toggle(par, s, 'lbl', 'show labels', refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  panel.toggle(par, s, 'constr', 'show parabola construction', refresh);
  panel.toggle(par, s, 'dims', 'show dimensions', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node',
               'node (0 = off, 1–6 cable, 7 B₁₆, 8 B₁₇, 9 D, 10 B₂, 11 E₂, 12 E₄)',
               0, 12, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS, G: [...DEFAULTS.G] });
    panel.syncAll();
    refresh();
  });

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const hits = [
    ['G', () => d.G, 4], ['E2', () => d.E2, 13], ['E4', () => d.E4, 13],
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
      if (name === 'G') s.G = [clamp(wx, 24.5, 31), clamp(wy, 6, 12.5)];
      else if (name === 'E2') s.E2x = clamp(wx, 13.75, 17.0);
      else if (name === 'E4') s.E4x = clamp(wx, 17.6, 23.0);
      refresh();
    },
  );

  // click a node to inspect it
  const nodeAt = [];
  for (let n = 1; n <= 12; n++) {
    nodeAt.push({ at: () => [d.Ls[0], d.Ls[1], d.Ls[2], d.Ls[3], d.Ls[4], d.Ls[5],
                             B16, B17, d.D, d.B2, d.E2, d.E4][n - 1] });
  }
  dw.nodeSelect(nodeAt, (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
