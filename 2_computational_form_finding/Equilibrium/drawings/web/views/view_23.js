/**
 * Drawing view/23 "Cable-stayed bridge"
 * (https://block.arch.ethz.ch/eq/drawing/view/23) as a step-by-step
 * construction: a cable-stayed footbridge across a gorge — the deck leans
 * from the low left abutment to the rock on the right, five stays fan from
 * the point D₂ down to the deck nodes, a mast props D₂ against the rock and
 * a backstay ties it to the rock anchor K.
 *
 * The node loads are COMPUTED from the deck's real dead + live loads
 * (Q_d = 0.41·1.8·l₂ + 6·1.8·l₁ + 0.95·2·l₂ kN with l₁ the horizontal and
 * l₂ the along-deck node spacing ×2 m). The Cremona diagram is built joint
 * by joint from the left; the fan node closes it with the mast and backstay
 * forces, and the three rock reactions A (deck thrust), B (mast) and
 * C (anchor pull) close the polygon of ALL external forces.
 *
 * Live port of view_23/applet_0/geogebra.xml (no step slider in the
 * original — the staging is ours). Regression reference = the LIVE applet
 * (ggbApplet via CDP): default / dragged A₆, D₂, K, R / all sliders match
 * to ≤ 7.1e-13 (29 checks × 7 states). See notes/view_23_analysis.md.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 23 — Cable-stayed bridge',
  subtitle: 'a stayed footbridge hung across a gorge',
  about: 'A cable-stayed footbridge across a gorge: the deck leans from the left abutment down‑stream to the rock, five stays fan from one point to the deck nodes, and that point is propped by a mast against the rock and held back by a backstay anchored in the rock face. The node loads are computed from the deck\'s real dead and live loads, the force diagram is built joint by joint, and the fan node closes it: deck thrust A, mast force B and anchor pull C are the three rock reactions, and together with the loads they form one closed polygon.',
  frame: [[-3.89, -3.81], [33.38, 14.83]],
};

// fixed applet constants
const B3 = [12.4946646243836, 2.1221565495368946];   // deck right end (fixed)
const B14 = [14.161837628704081, 3.3196942309466464]; // mast base on the rock
const XVL = -0.04581129181359017;                     // left dashed vertical
const XVR = 12.465247204112863;                       // right dashed vertical
const YB_TOP = 9.693889745967203, YB_BOT = -1.1179236138894506; // verticals band
const W1OFF = 1.09637;                                // abutment unit (A_6 -> W_1)
// left abutment outline coefficients: P = A_6 + a*u + b*n, u=(-1.09637,0), n=(0,-1.09637)
const ROCKL = [[0, 0], [1, 0], [0.883785224950213, 4.0691153028004],
  [-1.17199882587057, 4.01040168491578], [-0.932054833901583, 3.27283103869726],
  [-1.00204030895761, 2.65777759505297], [-0.717106609563854, 1.87770224675978],
  [-0.479661860069056, 1.22763945651545], [-0.0697560082977411, 0.670081425895089]];
// right rock massif (fixed 20-gon, edges S_3-T_3-U_3 hidden in the applet)
const ROCKR = [[16.649438200324955, 9.64442015425486], [16.121714796837818, 9.16451978646925],
  [16.169689651700285, 8.68461941868364], [15.73791595793808, 7.916778830226663],
  [15.641966248213146, 7.196928278548248], [15.40209197390081, 6.525067763648394],
  [15.450066828763276, 6.093157432641346], [15.018293135001073, 5.709237138412857],
  [14.634494296101337, 5.085366660291564], [14.634494296101337, 4.41350614539171],
  [14.490569731513935, 3.7896356672704172], [14.154745747476666, 3.405715373041929],
  [14.010821182889265, 2.877824968477758], [13.91487147316433, 2.157974416799343],
  [12.475625827290319, 2.157974416799343], [12.42765097242785, 1.4861139018994887],
  [12.235751552977982, 0.9102334605567567], [12.043852133528114, 0.2863629824354636],
  [17.321086168399493, 0.2383729456569026], [17.321086168399493, 9.548440080697738]];
// the terrain polyline K drags along (applet n_2, in path order)
const TERRAIN = [[14.877540072402383, 5.394832093226224], [14.967228731138581, 5.525628053883176],
  [15.045706307532754, 5.60784265772469], [15.146439384920619, 5.697476742805267],
  [15.201214864730028, 5.807027702424083], [15.231840409135499, 5.901736833632632],
  [15.260203842986314, 6.06826460613049], [15.264417341433193, 6.177815565749306],
  [15.306934803043166, 6.370488186759855], [15.403668823990438, 6.520963330455605],
  [15.446661722189225, 6.59620090230348], [15.463451340626827, 6.712335917935443],
  [15.510003833404458, 6.84811402187019], [15.559362232714628, 6.9910207659966686],
  [15.624392637745961, 7.092478593751], [15.676732934894023, 7.206972993762381],
  [15.732115669036611, 7.332314140193748], [15.73632916748349, 7.479786585834462],
  [15.753183161271, 7.593551043900155], [15.791104647292899, 7.677821012837706],
  [15.810671561143163, 7.774360791791997]];
// drag region for D_2 (applet quad F_3 F_2 F F_1)
const QUAD = [[11.859248987248733, 4.194247520347603], [5.803056768683458, 5.166935191538472],
  [6.288175000931876, 9.453502322512694], [14.8191615930766, 9.7499984297225]];

const RESOLVE = 14;

const DEFAULTS = {
  a6t: 2.5,                    // A_6 height on its guide [0, 2.5]
  D2: [12.144664624383598, 8.212156549536907],  // fan point (free in QUAD)
  Kt: 9,                       // K = TERRAIN vertex index + fraction (default at E)
  R: [19.89745160927418, 9.801965924318791],    // load-line top (free)
  sFD: 50,                     // scale force diagram [25, 100] kN per unit
  sLS: 1.5,                    // scale load symbol [0.5, 2]
  offR: 0.3,                   // offset reaction forces [0, 0.3]
  sIF: 0.04,                   // scale internal forces
  o1: true,                    // show internal forces
  n4: true,                    // show points
  lbl: true,                   // the applet's showLabels (default ON)
  dims: false,                 // show dimensions
  node: 0,                     // node-equilibrium inspector (0 = off)
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The gorge', d: 'left: a footbridge site — the low abutment on the left bank, the rock face on the right; the span is 25 m (1 :: 200)' },
  { t: 'The deck', d: 'left: the deck leans from its left end A₆ (drag it up and down on the dashed guide — the abutment follows) across to the rock at B₃; verticals mark the five nodes, every 5 m' },
  { t: 'The mast', d: 'left: a short mast props the point D₂ against the rock at B₁₄ — drag D₂ to move the whole fan' },
  { t: 'Five stays', d: 'left: stays run from D₂ down to the five deck nodes — the deck hangs from one point' },
  { t: 'The backstay', d: 'left: a backstay ties D₂ into the rock face at the anchor K — drag K along the rock' },
  { t: 'The loads and the load line', d: 'left: each node carries Q_d ≈ 67 kN of dead + live deck load → F₁ … F₅ — right: they stack down the load line from R (drag R)' },
  { t: 'Joint B₁₀ — members 1 and 2', d: 'right: parallel to stay 1 through W, parallel to the deck through V → Z — left: the leftmost node closes with stay 1 and deck piece 2 (the short overhang to A₆ stays force-free!)' },
  { t: 'Joint B₁ — members 3 and 4', d: 'right: parallel to stay 3 through Z, parallel to the deck through U → C₁' },
  { t: 'Joint B₁₃ — members 5 and 6', d: 'right: parallel to stay 5 through C₁, parallel to the deck through T → D₁' },
  { t: 'Joint B₁₂ — members 7 and 8', d: 'right: parallel to stay 7 through D₁, parallel to the deck through S → G₁' },
  { t: 'Joint B₁₁ — members 9 and 10', d: 'right: parallel to stay 9 through G₁, parallel to the deck through R → H₁: piece 10 ends at the TOP of the load line' },
  { t: 'The fan node closes — members 11 and 12', d: 'right: parallel to the mast through H₁, parallel to the backstay through W → I₁: all five stays, the mast and the backstay balance at D₂' },
  { t: 'The rock reactions A, B, C', d: 'right: deck thrust A = H₁→R, mast force B = I₁→H₁, anchor pull C = W→I₁, read beside members 10, 11, 12 (dotted offsets) — left: A at the deck end, B under the mast, C at the anchor — loads and reactions form ONE closed polygon' },
  { t: 'Tension and compression', d: 'stays and backstay resolve pink = tension, deck and mast blue = compression (pipes ∝ force) — drag A₆, D₂, K or R; click a node for its equilibrium' },
];

const cache = {};
function inter(key, p1, d1, p2, d2) {
  cache[key] = V.intersect(p1, d1, p2, d2) || cache[key] || p1;
  return cache[key];
}

function terrainAt(t) {
  const i = Math.max(0, Math.min(TERRAIN.length - 2, Math.floor(t)));
  const f = Math.max(0, Math.min(1, t - i));
  return V.add(TERRAIN[i], V.mul(V.sub(TERRAIN[i + 1], TERRAIN[i]), f));
}

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const Bp = V.sub(B3, [12.5, 0]);
  const A6 = V.add(Bp, [0, s.a6t]);
  const dk = V.sub(B3, A6);                       // deck direction
  const nodes = [];                               // B_10, B_1, B_13, B_12, B_11
  for (let k = 0; k < 5; k++) {
    const t = (B3[0] - 11.25 + 2.5 * k - A6[0]) / dk[0];
    nodes.push(V.add(A6, V.mul(dk, t)));
  }
  const D2 = s.D2;
  const K = terrainAt(s.Kt);
  const L = V.len(dk);
  const j3 = 2.5 * L / 12.5;                      // along-deck node spacing
  const Qd = (0.41 * 1.8 * j3 * 2) + (6 * 1.8 * 2.5 * 2) + (0.95 * j3 * 4);
  const Fu = Qd / s.sFD;                          // load edge length (units)
  const LL = [[...s.R]];                          // R, S, T, U, V, W
  for (let k = 1; k <= 5; k++) LL.push([s.R[0], s.R[1] - Fu * k]);
  const stay = nodes.map((n) => V.sub(D2, n));
  const Z = inter('Z', LL[4], dk, LL[5], stay[0]);
  const C1 = inter('C1', LL[3], dk, Z, stay[1]);
  const D1 = inter('D1', LL[2], dk, C1, stay[2]);
  const G1 = inter('G1', LL[1], dk, D1, stay[3]);
  const H1 = inter('H1', LL[0], dk, G1, stay[4]);
  const md = V.sub(B14, D2);                      // mast direction
  const bd = V.sub(K, D2);                        // backstay direction
  const I1 = inter('I1', H1, md, LL[5], bd);

  // reaction offsets (each chain shifted rigidly by ONE perpendicular vector)
  let pA = V.unit(V.perp(dk)); if (pA[1] < 0) pA = V.mul(pA, -1);
  let pB = V.unit(V.perp(md)); if (pB[0] < 0) pB = V.mul(pB, -1);
  let pC = V.unit(V.perp(bd)); if (pC[1] < 0) pC = V.mul(pC, -1);
  const C4 = V.add(LL[0], V.mul(pA, s.offR)), D4 = V.add(H1, V.mul(pA, s.offR));
  const G4 = V.add(H1, V.mul(pB, s.offR)), H4 = V.add(I1, V.mul(pB, s.offR));
  const I4 = V.sub(LL[5], V.mul(pC, s.offR)), L4 = V.sub(I1, V.mul(pC, s.offR));

  // form reaction anchors
  const L1 = V.add(B3, V.mul(V.unit(dk), s.sLS));
  const J1 = V.add(B14, V.mul(V.unit(md), s.sLS));
  const V1 = V.sub(B14, V.mul(V.unit(md), s.sLS));
  const M1 = V.add(K, V.mul(V.unit(V.sub(K, D2)), s.sLS));

  // mast bar offset line (applet G-H, 0.1 perpendicular)
  const G = V.add(D2, V.mul(pB, 0.1)), H = V.add(B14, V.mul(pB, 0.1));

  // members 1..12: [form a, form b, force f1, force f2] (macro orientation)
  const M12 = [null,
    [nodes[0], D2, LL[5], Z], [nodes[0], nodes[1], Z, LL[4]],
    [nodes[1], D2, Z, C1], [nodes[1], nodes[2], C1, LL[3]],
    [nodes[2], D2, C1, D1], [nodes[2], nodes[3], D1, LL[2]],
    [nodes[3], D2, D1, G1], [nodes[3], nodes[4], G1, LL[1]],
    [nodes[4], D2, G1, H1], [nodes[4], B3, H1, LL[0]],
    [D2, B14, I1, H1], [D2, K, LL[5], I1],
  ];
  const col = [], Nk = [];
  for (let k = 1; k <= 12; k++) {
    const [a, b, f1, f2] = M12[k];
    col[k] = V.isCompression(V.ggbAngle(V.sub(b, a), V.sub(f2, f1))) ? PAL.blue : PAL.red;
    Nk[k] = V.dist(f1, f2) * s.sFD;
  }

  // left abutment outline follows A_6
  const rockL = ROCKL.map(([a, b]) => [A6[0] - a * W1OFF, A6[1] - b * W1OFF]);

  return { A6, Bp, dk, nodes, D2, K, LL, Z, C1, D1, G1, H1, I1, md, bd,
           C4, D4, G4, H4, I4, L4, L1, J1, V1, M1, G, H, M12, col, Nk,
           j3, Qd, rockL,
           Amag: Nk[10], Bmag: Nk[11], Cmag: Nk[12] };
}

const SUB = ' ₁₂₃₄₅';

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, D2: [...DEFAULTS.D2], R: [...DEFAULTS.R] };
  let d = compute(s);

  const W_BAR = 0.085, W_SKEL = 0.028, W_FSEG = 0.05;
  const ARROW = { w: 0.1, headLen: 0.42, headW: 0.18 };
  const memCol = (k) => ({ pending: PAL.black, final: (dd) => dd.col[k] });
  const numCol = (k) => ({ final: (dd) => dd.col[k] });
  const IK = [null, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12];  // joint steps

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('form_sub', '1 :: 200 m', { flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // step 1: the site (instant)
  dw.poly('rockLf', 9, { intro: 1, opacity: 0.10, color: 0x808080 });
  dw.strokes('rockLe', 7, { intro: 1, w: W_SKEL, color: 0x808080 });
  dw.poly('rockRf', 20, { intro: 1, opacity: 0.10, color: 0x808080 });
  dw.strokes('rockRe', 18, { intro: 1, w: W_SKEL, color: 0x808080 });
  dw.instant('rockLf', 'rockLe', 'rockRf', 'rockRe');

  // step 2: deck + guide + verticals
  dw.dashLine('gA6', { intro: 2, dash: 0.22 });
  dw.dashLine('vL', { intro: 2, dash: 0.22 });
  dw.dashLine('vR', { intro: 2, dash: 0.22 });
  for (let i = 0; i < 5; i++) dw.dashLine(`vn${i}`, { intro: 2, dash: 0.13 });
  dw.strokes('skelDeck', 6, { intro: 2, w: W_SKEL, color: PAL.grey });
  dw.seg('deckOver', { intro: 7, w: W_BAR, color: { pending: PAL.black, final: (dd) => dd.col[2] } });

  // steps 3-5: mast bar, stays, backstay (skeleton)
  dw.strokes('skelMast', 2, { intro: 3, w: W_SKEL, color: PAL.grey });
  dw.strokes('skelStay', 5, { intro: 4, w: W_SKEL, color: PAL.grey });
  dw.strokes('skelBack', 1, { intro: 5, w: W_SKEL, color: PAL.grey });

  // step 6: loads + load line (name labels behind the applet's showLabels)
  const lblOn = (st) => st.lbl;
  for (let i = 1; i <= 5; i++) {
    dw.arrow(`loadF${i}`, { intro: 6, ...ARROW });
    dw.label(`lF${i}`, `F${SUB[i]}`, { cls: 'num', intro: 6, color: PAL.green, when: lblOn });
    dw.arrow(`edge${i}`, { intro: 6, ...ARROW });
    dw.label(`lFf${i}`, `F${SUB[i]}`, { cls: 'num', intro: 6, color: PAL.green, when: lblOn });
  }

  // members at their joint steps (mast = 11 drawn as a thin bar: two lines)
  for (let k = 1; k <= 12; k++) {
    dw.seg(`mem${k}`, { intro: IK[k], w: W_BAR, color: memCol(k) });
    dw.seg(`fseg${k}`, { intro: IK[k], w: W_FSEG, color: memCol(k) });
    dw.label(`n${k}f`, `${k}`, { cls: 'num', intro: IK[k], color: numCol(k), when: lblOn });
    dw.label(`n${k}s`, `${k}`, { cls: 'num', intro: IK[k], color: numCol(k), when: lblOn });
  }
  dw.seg('mastBar2', { intro: 12, w: W_BAR * 0.5, color: { pending: PAL.black, final: (dd) => dd.col[11] } });

  // step 13: reactions A, B, C (offset arrows + dotted connectors, both sides)
  const REAC = { w: 0.13, headLen: 0.5, headW: 0.22 };
  for (const r of ['A', 'B', 'C']) {
    dw.dashLine(`conn${r}1`, { intro: 13, dash: 0.16, color: 0x006400 });
    dw.dashLine(`conn${r}2`, { intro: 13, dash: 0.16, color: 0x006400 });
    dw.arrow(`reac${r}`, { intro: 13, ...REAC });
    dw.arrow(`reac${r}form`, { intro: 13, ...REAC });
    dw.label(`lbl${r}f`, r, { cls: 'num', intro: 13, color: PAL.green, when: lblOn });
    dw.label(`lbl${r}s`, r, { cls: 'num', intro: 13, color: PAL.green, when: lblOn });
  }

  // internal-force pipes (stays get the applet's double scale)
  for (let k = 1; k <= 12; k++) {
    dw.poly(`if${k}`, 4, { intro: RESOLVE, opacity: 1.0, z: -0.18, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd.col[k] }, when: (st) => st.o1 });
  }

  // dimensions (applet showDims)
  for (const nm of ['dimL1', 'dimL2', 'dimH']) {
    dw.strokes(nm, 3, { intro: 2, w: 0.02, color: PAL.black, flash: false, when: (st) => st.dims });
  }
  dw.label('dimL1t', '', { intro: 2, flash: false, when: (st) => st.dims });
  dw.label('dimL2t', '', { intro: 2, flash: false, when: (st) => st.dims });
  dw.label('dimHt', '', { intro: 2, flash: false, when: (st) => st.dims });

  // points
  const HANDLE = { r: 0.16 }, DERIVED = { r: 0.12 };
  const show = (st) => st.n4;
  dw.disk('pt_A6', { intro: 2, ...HANDLE });
  dw.disk('pt_B3', { intro: 2, ...DERIVED, when: show });
  for (let i = 0; i < 5; i++) dw.disk(`pt_n${i}`, { intro: 2, ...DERIVED, when: show });
  dw.disk('pt_D2', { intro: 3, ...HANDLE });
  dw.disk('pt_B14', { intro: 3, ...DERIVED, when: show });
  dw.disk('pt_K', { intro: 5, ...HANDLE });
  dw.disk('pt_R', { intro: 6, ...HANDLE });
  const fpts = { Z: 7, C1: 8, D1: 9, G1: 10, H1: 11, I1: 12 };
  const ftxt = { Z: 'Z', C1: 'C₁', D1: 'D₁', G1: 'G₁', H1: 'H₁', I1: 'I₁' };
  for (const [pn, intro] of Object.entries(fpts)) {
    dw.disk(`pt_${pn}`, { intro, ...DERIVED, when: show });
    dw.label(`lbl_${pn}`, ftxt[pn], { cls: 'point', intro, when: show });
  }
  const ltxt = { 0: 'R', 1: 'S', 2: 'T', 3: 'U', 4: 'V', 5: 'W' };
  for (let i = 0; i <= 5; i++) dw.label(`lbl_LL${i}`, ltxt[i], { cls: 'point', intro: 6, when: show });
  dw.label('lbl_A6', 'A₆', { cls: 'point', intro: 2, when: show });
  dw.label('lbl_B3', 'B₃', { cls: 'point', intro: 2, when: show });
  dw.label('lbl_D2', 'D₂', { cls: 'point', intro: 3, when: show });
  dw.label('lbl_B14', 'B₁₄', { cls: 'point', intro: 3, when: show });
  dw.label('lbl_K', 'K', { cls: 'point', intro: 5, when: show });

  // readouts
  dw.label('ro_Q', '', { intro: 6, flash: false, color: PAL.green });
  dw.label('ro_A', '', { intro: RESOLVE, flash: false, color: PAL.green });
  dw.label('ro_B', '', { intro: RESOLVE, flash: false, color: PAL.green });
  dw.label('ro_C', '', { intro: RESOLVE, flash: false, color: PAL.green });

  // node-equilibrium inspector (fan node has 7 forces)
  dw.nodeInspector(7, { when: (st) => st.node > 0, w: 1.5 * W_BAR, headLen: 0.45, headW: 0.19, r: 0.2 });

  // dual pairs + ghost + re-flashes
  for (let k = 1; k <= 12; k++) dw.link(`mem${k}`, `fseg${k}`, `n${k}f`, `n${k}s`);
  for (let i = 1; i <= 5; i++) dw.link(`loadF${i}`, `edge${i}`, `lF${i}`, `lFf${i}`);
  dw.link('reacA', 'reacAform', 'lblAf', 'lblAs', 'connA1', 'connA2');
  dw.link('reacB', 'reacBform', 'lblBf', 'lblBs', 'connB1', 'connB2');
  dw.link('reacC', 'reacCform', 'lblCf', 'lblCs', 'connC1', 'connC2');
  dw.ghostable(...[...Array(12)].map((_, i) => `fseg${i + 1}`),
               ...[...Array(5)].map((_, i) => `edge${i + 1}`),
               'reacA', 'reacB', 'reacC');
  dw.highlight('mem10', [13]);
  dw.highlight('mem11', [13]);
  dw.highlight('mem12', [13]);

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [-1.35, 14.2]);
    dw.setLabel('form_sub', [-1.55, 13.55]);
    dw.setLabel('force_title', [19.65, 14.2]);
    dw.setLabel('force_sub', [19.55, 13.55]);
    dw.setText('force_sub', `1 unit :: ${s.sFD.toFixed(0)} kN`);

    // site
    dw.setPoly('rockLf', d.rockL);
    const rl = d.rockL;
    dw.setStrokes('rockLe', [[rl[0], rl[1]], [rl[3], rl[4]], [rl[4], rl[5]],
      [rl[5], rl[6]], [rl[6], rl[7]], [rl[7], rl[8]], [rl[8], rl[0]]]);
    dw.setPoly('rockRf', ROCKR);
    const re = [];
    for (let i = 0; i < 17; i++) re.push([ROCKR[i], ROCKR[i + 1]]);
    re.push([ROCKR[19], ROCKR[0]]);
    dw.setStrokes('rockRe', re);

    // deck + guides
    dw.setDashLine('gA6', [d.Bp, V.add(d.Bp, [0, 2.5])]);
    dw.setDashLine('vL', [[XVL, YB_BOT], [XVL, YB_TOP]]);
    dw.setDashLine('vR', [[XVR, YB_BOT], [XVR, YB_TOP]]);
    for (let i = 0; i < 5; i++) {
      dw.setDashLine(`vn${i}`, [[d.nodes[i][0], YB_BOT], [d.nodes[i][0], YB_TOP]]);
    }
    dw.setStrokes('skelDeck', [[d.A6, d.nodes[0]], [d.nodes[0], d.nodes[1]],
      [d.nodes[1], d.nodes[2]], [d.nodes[2], d.nodes[3]], [d.nodes[3], d.nodes[4]],
      [d.nodes[4], B3]]);
    dw.setSeg('deckOver', d.A6, d.nodes[0]);
    dw.setStrokes('skelMast', [[d.D2, B14], [d.G, d.H]]);
    dw.setStrokes('skelStay', d.nodes.map((n) => [d.D2, n]));
    dw.setStrokes('skelBack', [[d.D2, d.K]]);
    dw.setSeg('mastBar2', d.G, d.H);

    // loads (form arrows straight down) + load-line edges
    const lnode = [null, d.nodes[4], d.nodes[3], d.nodes[2], d.nodes[1], d.nodes[0]];
    for (let i = 1; i <= 5; i++) {
      const p = lnode[i];
      dw.setArrow(`loadF${i}`, p, [p[0], p[1] - s.sLS]);
      dw.setLabel(`lF${i}`, [p[0] + 0.33, p[1] - 0.62 * s.sLS]);
      dw.setArrow(`edge${i}`, d.LL[i - 1], d.LL[i]);
      dw.setLabel(`lFf${i}`, [d.LL[i][0] - 0.38, (d.LL[i - 1][1] + d.LL[i][1]) / 2]);
    }

    // members + numbers
    for (let k = 1; k <= 12; k++) {
      const [a, b, f1, f2] = d.M12[k];
      dw.setSeg(`mem${k}`, a, b);
      dw.setSeg(`fseg${k}`, f1, f2);
      const m = V.mid(a, b), mf = V.mid(f1, f2);
      if (k % 2 === 1 && k < 11) {                 // stays: above the line
        const pp = V.perp(V.unit(V.sub(b, a)));
        dw.setLabel(`n${k}f`, V.add(m, V.mul(pp, pp[1] > 0 ? 0.30 : -0.30)));
      } else if (k % 2 === 0 && k <= 10) {         // deck pieces: below the deck
        dw.setLabel(`n${k}f`, [m[0], m[1] - 0.33]);
      } else {                                     // mast 11 / backstay 12
        const pp = V.perp(V.unit(V.sub(b, a)));
        const sg = k === 11 ? (pp[0] > 0 ? 1 : -1) : (pp[1] > 0 ? 1 : -1);
        dw.setLabel(`n${k}f`, V.add(m, V.mul(pp, 0.34 * sg)));
      }
      const pp = V.perp(V.unit(V.sub(f2, f1)));
      let sg;
      if (k % 2 === 0 && k <= 10) sg = pp[1] > 0 ? 1 : -1;        // deck: above
      else if (k === 11) sg = pp[0] > 0 ? -1 : 1;                 // mast: interior side
      else if (k === 12) sg = pp[1] > 0 ? 1 : -1;                 // backstay: above
      else sg = pp[0] > 0 ? 1 : -1;                               // stays: right
      dw.setLabel(`n${k}s`, V.add(mf, V.mul(pp, 0.30 * sg)));
    }

    // reactions
    dw.setDashLine('connA1', [d.LL[0], d.C4]);
    dw.setDashLine('connA2', [d.H1, d.D4]);
    dw.setArrow('reacA', d.D4, d.C4);
    dw.setDashLine('connB1', [d.H1, d.G4]);
    dw.setDashLine('connB2', [d.I1, d.H4]);
    dw.setArrow('reacB', d.H4, d.G4);
    dw.setDashLine('connC1', [d.LL[5], d.I4]);
    dw.setDashLine('connC2', [d.I1, d.L4]);
    dw.setArrow('reacC', d.I4, d.L4);
    // form side (direction flips with the member sign, as in the applet)
    if (d.col[10] === PAL.red) dw.setArrow('reacAform', B3, d.L1);
    else dw.setArrow('reacAform', d.L1, B3);
    if (d.col[11] === PAL.red) dw.setArrow('reacBform', B14, d.J1);
    else dw.setArrow('reacBform', d.J1, B14);
    dw.setArrow('reacCform', d.K, d.M1);
    dw.setLabel('lblAf', V.add(d.L1, [0.15, -0.38]));
    dw.setLabel('lblBf', V.add(d.J1, [0.38, -0.15]));
    dw.setLabel('lblCf', V.add(d.M1, [0.38, 0.05]));
    const mA = V.mid(d.D4, d.C4), mB = V.mid(d.H4, d.G4), mC = V.mid(d.I4, d.L4);
    dw.setLabel('lblAs', V.add(mA, [0, 0.4]));
    dw.setLabel('lblBs', V.add(mB, [0.45, 0.1]));
    dw.setLabel('lblCs', V.add(mC, [-0.1, -0.45]));

    // pipes (stays double scale, like the applet's macro calls)
    for (let k = 1; k <= 12; k++) {
      const [a, b, f1, f2] = d.M12[k];
      const dbl = (k % 2 === 1 && k < 11) ? 2 : 1;
      dw.setPoly(`if${k}`, V.rectPoints(a, b, s.sIF * V.dist(f1, f2) * dbl));
    }

    // dimensions
    const tick = (p, dir) => [V.sub(p, V.mul(dir, 0.12)), V.add(p, V.mul(dir, 0.12))];
    const ud = V.unit(d.dk), pd = V.perp(ud);
    const dA = [d.nodes[0][0], -0.6], dB = [d.nodes[1][0], -0.6];
    dw.setStrokes('dimL1', [[dA, dB], tick(dA, [0.7, 0.7]), tick(dB, [0.7, 0.7])]);
    dw.setLabel('dimL1t', [V.mid(dA, dB)[0], -0.95]);
    dw.setText('dimL1t', 'l₁ = 5 m');
    const l2a = V.add(d.nodes[0], V.mul(pd, 2.2)), l2b = V.add(d.nodes[1], V.mul(pd, 2.2));
    dw.setStrokes('dimL2', [[l2a, l2b], tick(l2a, [0.7, 0.7]), tick(l2b, [0.7, 0.7])]);
    dw.setLabel('dimL2t', V.add(V.mid(l2a, l2b), V.mul(pd, 0.4)));
    dw.setText('dimL2t', `l₂ = ${(2 * d.j3).toFixed(1)} m`);
    const hA = [-2.55, B3[1]], hB = [-2.55, d.A6[1]];
    dw.setStrokes('dimH', [[hA, hB], tick(hA, [0.7, 0.7]), tick(hB, [0.7, 0.7])]);
    dw.setLabel('dimHt', [-3.1, (hA[1] + hB[1]) / 2]);
    dw.setText('dimHt', `${(2 * s.a6t).toFixed(1)} m`);

    // points + labels
    dw.setDisk('pt_A6', d.A6);
    dw.setDisk('pt_B3', B3);
    for (let i = 0; i < 5; i++) dw.setDisk(`pt_n${i}`, d.nodes[i]);
    dw.setDisk('pt_D2', d.D2);
    dw.setDisk('pt_B14', B14);
    dw.setDisk('pt_K', d.K);
    dw.setDisk('pt_R', d.LL[0]);
    dw.setLabel('lbl_A6', V.add(d.A6, [-0.5, 0.35]));
    dw.setLabel('lbl_B3', V.add(B3, [-0.45, 0.38]));
    dw.setLabel('lbl_D2', V.add(d.D2, [-0.45, 0.3]));
    dw.setLabel('lbl_B14', V.add(B14, [-0.3, -0.48]));
    dw.setLabel('lbl_K', V.add(d.K, [0.32, 0.28]));
    const fp = { Z: d.Z, C1: d.C1, D1: d.D1, G1: d.G1, H1: d.H1, I1: d.I1 };
    const foff = { Z: [0.3, -0.28], C1: [0.32, -0.3], D1: [0.45, -0.32], G1: [0.48, -0.2],
                   H1: [0.5, -0.2], I1: [0.15, -0.4] };
    for (const pn of Object.keys(fp)) {
      dw.setDisk(`pt_${pn}`, fp[pn]);
      dw.setLabel(`lbl_${pn}`, V.add(fp[pn], foff[pn]));
    }
    for (let i = 0; i <= 5; i++) {
      const off = i === 0 ? [-0.1, 0.35] : i === 5 ? [-0.32, -0.25] : [-0.32, 0.22];
      dw.setLabel(`lbl_LL${i}`, V.add(d.LL[i], off));
    }

    // readouts
    dw.setLabel('ro_Q', [28.6, 13.9]);
    dw.setText('ro_Q', `Q_d = ${d.Qd.toFixed(1)} kN / node`);
    dw.setLabel('ro_A', [28.6, 13.2]);
    dw.setText('ro_A', `A = ${d.Amag.toFixed(0)} kN`);
    dw.setLabel('ro_B', [28.6, 12.5]);
    dw.setText('ro_B', `B = ${d.Bmag.toFixed(0)} kN`);
    dw.setLabel('ro_C', [28.6, 11.8]);
    dw.setText('ro_C', `C = ${d.Cmag.toFixed(0)} kN`);
  }

  // node-equilibrium inspector: 1-5 deck nodes, 6 fan D2, 7 bearing B3,
  // 8 mast base B14, 9 anchor K (support sides on the drawn offset arrows)
  function nodePoly() {
    const n = Math.max(1, Math.round(s.node));
    const { LL, Z, C1, D1, G1, H1, I1, C4, D4, G4, H4, I4, L4 } = d;
    switch (n) {
      case 1: return [[LL[4], LL[5]], [LL[5], Z], [Z, LL[4]]];
      case 2: return [[LL[3], LL[4]], [LL[4], Z], [Z, C1], [C1, LL[3]]];
      case 3: return [[LL[2], LL[3]], [LL[3], C1], [C1, D1], [D1, LL[2]]];
      case 4: return [[LL[1], LL[2]], [LL[2], D1], [D1, G1], [G1, LL[1]]];
      case 5: return [[LL[0], LL[1]], [LL[1], G1], [G1, H1], [H1, LL[0]]];
      case 6: return [[H1, G1], [G1, D1], [D1, C1], [C1, Z], [Z, LL[5]], [LL[5], I1], [I1, H1]];
      case 7: return [[LL[0], H1], [D4, C4]];
      case 8: return [[H1, I1], [H4, G4]];
      default: return [[I1, LL[5]], [I4, L4]];
    }
  }
  const NODE_DISKS = [null, 'pt_n0', 'pt_n1', 'pt_n2', 'pt_n3', 'pt_n4',
                      'pt_D2', 'pt_B3', 'pt_B14', 'pt_K'];
  const NODE_NAMES = [null, 'B₁₀', 'B₁', 'B₁₃', 'B₁₂', 'B₁₁', 'D₂ (fan)',
                      'B₃ (bearing)', 'B₁₄ (mast base)', 'K (anchor)'];
  function updateNode() {
    const n = Math.round(s.node);
    dw.selectDisk(n > 0 ? NODE_DISKS[n] : null);
    dw.setNodeInspector([5, 11.5], 1.6, n > 0 ? `node ${NODE_NAMES[n]}` : '', nodePoly());
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
  panel.slider(par, s, 'sFD', 'scale force diagram (kN/unit)', 25, 100, 1, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 0.5, 2, 0.1, refresh);
  panel.slider(par, s, 'offR', 'offset loadline reaction forces', 0, 0.3, 0.02, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.12, 0.005, refresh);
  panel.toggle(par, s, 'lbl', 'show labels', refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  panel.toggle(par, s, 'dims', 'show dimensions', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node',
               'node (0 = off, 1–5 deck, 6 fan, 7 bearing, 8 mast base, 9 anchor)',
               0, 9, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS, D2: [...DEFAULTS.D2], R: [...DEFAULTS.R] });
    panel.syncAll();
    refresh();
  });

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  // point-in-polygon (QUAD) + projection for D2
  function clampD2(p) {
    const inside = (() => {
      let c = false;
      for (let i = 0, j = 3; i < 4; j = i++) {
        const [xi, yi] = QUAD[i], [xj, yj] = QUAD[j];
        if ((yi > p[1]) !== (yj > p[1])
            && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) c = !c;
      }
      return c;
    })();
    if (inside) return p;
    let best = null, bd = Infinity;
    for (let i = 0, j = 3; i < 4; j = i++) {
      const a = QUAD[j], b = QUAD[i], ab = V.sub(b, a);
      const t = clamp(V.dot(V.sub(p, a), ab) / V.dot(ab, ab), 0, 1);
      const q = V.add(a, V.mul(ab, t));
      const dd = V.dist(p, q);
      if (dd < bd) { bd = dd; best = q; }
    }
    return best;
  }
  function projK(p) {
    let best = s.Kt, bd = Infinity;
    for (let i = 0; i < TERRAIN.length - 1; i++) {
      const a = TERRAIN[i], b = TERRAIN[i + 1], ab = V.sub(b, a);
      const t = clamp(V.dot(V.sub(p, a), ab) / V.dot(ab, ab), 0, 1);
      const q = V.add(a, V.mul(ab, t));
      const dd = V.dist(p, q);
      if (dd < bd) { bd = dd; best = i + t; }
    }
    return best;
  }
  const hits = [
    ['A6', () => d.A6, 2], ['D2', () => d.D2, 3], ['K', () => d.K, 5],
    ['R', () => d.LL[0], 6],
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
      if (name === 'A6') s.a6t = clamp(wy - d.Bp[1], 0, 2.5);
      else if (name === 'D2') s.D2 = clampD2([wx, wy]);
      else if (name === 'K') s.Kt = projK([wx, wy]);
      else if (name === 'R') s.R = [clamp(wx, 16, 30), clamp(wy, 4, 14)];
      refresh();
    },
  );

  // click a node to inspect it
  const nodeAt = [];
  for (let n = 1; n <= 9; n++) {
    nodeAt.push({ at: () => [d.nodes[0], d.nodes[1], d.nodes[2], d.nodes[3],
                             d.nodes[4], d.D2, B3, B14, d.K][n - 1] });
  }
  dw.nodeSelect(nodeAt, (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
