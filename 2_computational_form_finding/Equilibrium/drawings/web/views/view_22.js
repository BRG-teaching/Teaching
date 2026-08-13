/**
 * Drawing view/22 "Cantilevered fan bridge"
 * (https://block.arch.ethz.ch/eq/drawing/view/22) as a step-by-step
 * construction: an Alamillo-type balanced cantilever — a deck on a single
 * bearing held by four fan stays from a mast that leans BACKWARD over the
 * bearing, with no backstays.
 *
 * The force diagram is an O-less Cremona built joint by joint from the deck
 * tip inward (poles R, S, T, U right of the load line). The mast is one
 * straight line, so parallels to it through U, T, S, R cut the load line
 * extended above its top at A₁, Z, W, V: the gaps between those points are
 * the mast weights F₅ … F₈ the construction DEMANDS — the mast's own weight
 * balances the deck. The reaction A = ΣFᵢ is read beside the load line.
 *
 * Live port of view_22/applet_0/geogebra.xml. The XML's saved derived coords
 * are degenerate, so the regression reference is the LIVE applet (ggbApplet
 * via CDP): default / dragged mast top H / dragged deck end B / moved LL0 +
 * all sliders match to ≤ 7.9e-14. See notes/view_22_analysis.md.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 22 — Cantilevered fan bridge',
  subtitle: 'the mast weights that balance a cantilevered deck',
  about: 'A cantilevered fan bridge of the Alamillo type: the deck cantilevers from a single bearing, held by four fan stays from a mast that leans backward over the bearing — no backstays anchor the mast. The force diagram is built joint by joint from the deck tip inward; parallels to the straight mast axis through the joint poles then cut the load line extended upward, and the gaps between them are the mast weights F₅ … F₈ the construction demands: the mast\'s own weight balances the deck. The reaction A collects all eight loads under the bearing.',
  frame: [[-46.898, -22.230], [105.953, 54.195]],
};

const YREF = -2.0744610145185067;       // y(L1): the load reference line
const Y_TOP = 42.95561469626941;        // y(I): top of the lines-of-action band
const Y_BOT = -13.042901469270795;      // y(B_1): bottom of the band
const Y_HELPER = 39.35309428891201;     // y(F_2): the mast-parallel helper horizontal
const RESOLVE = 13;

const DEFAULTS = {
  H: [-21.795904581339755, 31.127777682981687],  // mast top (free in the circle)
  Dc: [-25.890613375712814, 30.471467875914687], // drag-circle center (handle)
  radius: 12,                            // drag-circle radius [5, 15]
  Bx: 50,                                // deck end B on the ground line
  ll0: [60, 0],                          // LL0, top of the load line (free)
  loadP: 200,                            // deck load [100, 200] kN
  sFD: 65,                               // scale force diagram [50, 100] kN PER unit
  sLS: 5,                                // loadSymbol [1, 5]
  offR: 4,                               // offsetReactionForces [0, 6]
  sIF: 0.02,                             // scale internal forces
  o1: true,                              // show internal forces
  n4: true,                              // show points
  lbl: true,                             // the applet's showLabels (default ON)
  n5: false,                             // show handles (drag-circle center)
  node: 0,                               // node-equilibrium inspector (0 = off)
};

// every construction move happens on BOTH sides at once
const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The deck and the mast', d: 'left: from the single bearing A a deck cantilevers to B, and a mast leans BACKWARD over the bearing to H (drag H anywhere inside the dashed circle) — verticals quarter both spans' },
  { t: 'Four fan stays', d: 'left: stays run from the mast quarter-points N, O, P, Q down to the deck quarter-points J, K, L, M — a cantilevered fan with no backstays' },
  { t: 'The deck loads and the load line', d: 'left: equal loads F₁ … F₄ hang at the deck nodes — right: F₁ … F₄ stack down the load line (drag its top point)' },
  { t: 'Joint M — members 8 and 12', d: 'right: parallel to stay 12 through the load-line top, parallel to the deck through the tail of F₁ → pole R — left: the outermost node M carries F₁ with deck piece 8 and stay 12' },
  { t: 'Joint L — members 7 and 11', d: 'right: parallel to stay 11 through R, parallel to the deck through the tail of F₂ → S — left: node L closes with deck piece 7 and stay 11' },
  { t: 'Joint K — members 6 and 10', d: 'right: parallel to stay 10 through S, parallel to the deck through the tail of F₃ → T' },
  { t: 'Joint J — members 5 and 9', d: 'right: parallel to stay 9 through T, parallel to the deck through the tail of F₄ → U: the whole deck is solved' },
  { t: 'Parallels to the mast', d: 'right: the mast is ONE straight line — parallels to it through U, T, S, R cut the load line extended above its top at A₁, Z, W, V — left: with every load vertical, the reaction line through the bearing A is vertical too' },
  { t: 'Joint N — mast pieces 4 and 3', d: 'right: A₁–U is the force in mast piece 4 and Z–T in piece 3; the gap A₁→Z between the parallels is the weight F₅ the mast needs at N — left: F₅ hangs on N\'s vertical' },
  { t: 'Joints O and P — pieces 2 and 1', d: 'right: W–S and V–R complete the mast; the gaps Z→W and W→V are the weights F₆ at O and F₇ at P' },
  { t: 'Joint Q closes the polygon', d: 'right: at the mast top Q only stay 12, piece 1 and a weight meet — the last gap V→LL0 is exactly F₈ and the Cremona diagram closes' },
  { t: 'The reaction A', d: 'right: the whole stack A₁→LL₄ = F₁ + … + F₈, read beside the load line (dotted offset) — left: the reaction A pushes up under the bearing' },
  { t: 'Compression and tension', d: 'the stays resolve pink = tension, deck and mast blue = compression (pipes ∝ force): the mast weights balance the deck, an Alamillo-type bridge needs no backstays — drag H or B, click a node for its equilibrium' },
];

const cache = {};
function inter(key, p1, d1, p2, d2) {
  cache[key] = V.intersect(p1, d1, p2, d2) || cache[key] || p1;
  return cache[key];
}

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const A = [0, 0];
  const H = s.H, B = [s.Bx, 0], LL0 = [...s.ll0];
  const um = V.unit(V.sub(H, A));                  // mast direction
  const slope = H[1] / H[0];
  // back span quartered: verticals at LPB1k -> mast nodes Q, P, O, N
  const xb = [0, 1, 2, 3].map((k) => H[0] + (Math.abs(H[0]) / 4) * (k + 0.5));
  const [Q, P, O, N] = xb.map((x) => [x, x * slope]);
  // front span quartered -> deck nodes J, K, L, M
  const xf = [0, 1, 2, 3].map((k) => (B[0] / 4) * (k + 0.5));
  const [J, K, L, M] = xf.map((x) => [x, 0]);
  // load line: F1..F4 stack down from LL0
  const e = s.loadP / s.sFD;
  const LL = [LL0];
  for (let k = 1; k <= 4; k++) LL.push([LL0[0], LL0[1] - e * k]);
  const dk = V.sub(B, A);                          // deck direction
  // Cremona joint by joint, deck tip inward
  const R = inter('R', LL[0], V.sub(Q, M), LL[1], dk);
  const S = inter('S', R, V.sub(P, L), LL[2], dk);
  const T = inter('T', S, V.sub(O, K), LL[3], dk);
  const U = inter('U', T, V.sub(N, J), LL[4], dk);
  // parallels to the mast cut the load-line vertical above LL0
  const up = [0, 1];
  const pV = inter('pV', LL[0], up, R, um);
  const pW = inter('pW', LL[0], up, S, um);
  const pZ = inter('pZ', LL[0], up, T, um);
  const pA1 = inter('pA1', LL[0], up, U, um);
  // step-8 helper apparatus: all four parallels end on the vertical through
  // A_2 (the U-parallel at the helper horizontal), as in the applet
  const A2 = V.add(U, V.mul(um, (Y_HELPER - U[1]) / um[1]));
  const parEnd = (pole) => V.add(pole, V.mul(um, (A2[0] - pole[0]) / um[0]));
  // reaction A, offset left of the load line
  const C = V.sub(LL[4], [s.offR, 0]);
  const F = [C[0], pA1[1]];
  const G = [0, YREF - 1.5 * s.sLS];
  const L1 = [0, YREF];
  const F5mag = (pA1[1] - pZ[1]) * s.sFD;
  const Amag = (pA1[1] - LL[4][1]) * s.sFD;

  // members 1..12: [form a, form b, force f1, force f2] (macro orientation)
  const M12 = [null,
    [P, Q, pV, R], [O, P, pW, S], [N, O, pZ, T], [A, N, pA1, U],
    [A, J, U, LL[4]], [J, K, T, LL[3]], [K, L, S, LL[2]], [L, M, R, LL[1]],
    [J, N, U, T], [K, O, T, S], [L, P, S, R], [M, Q, R, LL[0]],
  ];
  const col = [], Nk = [];
  for (let k = 1; k <= 12; k++) {
    const [a, b, f1, f2] = M12[k];
    col[k] = V.isCompression(V.ggbAngle(V.sub(b, a), V.sub(f2, f1))) ? PAL.blue : PAL.red;
    Nk[k] = V.dist(f1, f2) * s.sFD;
  }

  return { A, H, B, um, N, O, P, Q, J, K, L, M, LL, R, S, T, U,
           pV, pW, pZ, pA1, A2, parEnd, C, F, G, L1, F5mag, Amag, M12, col, Nk };
}

const SUB = ' ₁₂₃₄₅₆₇₈';

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, H: [...DEFAULTS.H], Dc: [...DEFAULTS.Dc], ll0: [...DEFAULTS.ll0] };
  let d = compute(s);

  const W_BAR = 0.34, W_SKEL = 0.11, W_FSEG = 0.2;
  const ARROW = { w: 0.3, headLen: 1.6, headW: 0.65 };
  const REAC = { w: 0.42, headLen: 1.9, headW: 0.8 };
  const memCol = (k) => ({ pending: PAL.black, final: (dd) => dd.col[k] });
  const numCol = (k) => ({ final: (dd) => dd.col[k] });
  // step at which each member's force is found (its joint)
  const IK = [null, 10, 10, 9, 9, 7, 6, 5, 4, 7, 6, 5, 4];
  // step of each load/weight i=1..8 (form arrow + force edge together)
  const IL = [null, 3, 3, 3, 3, 9, 10, 10, 11];

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // step 1: the given structure — deck + mast skeleton, dashed tips, guides
  dw.dashedCircle('gCircle', { intro: 1, dash: 1.3 });
  dw.dashLine('tipDeck', { intro: 1, dash: 0.55 });
  dw.dashLine('tipMast', { intro: 1, dash: 0.55 });
  for (let i = 1; i <= 4; i++) dw.dashLine(`act${i}`, { intro: 1, dash: 0.55 });
  for (let i = 5; i <= 8; i++) dw.dashLine(`act${i}`, { intro: 1, dash: 0.55 });
  dw.dashLine('aVert', { intro: 1, dash: 0.55 });
  dw.strokes('skelDeck', 4, { intro: 1, w: W_SKEL, color: PAL.grey });
  dw.strokes('skelMast', 4, { intro: 1, w: W_SKEL, color: PAL.grey });

  // step 2: the fan stays (skeleton)
  dw.strokes('skelStay', 4, { intro: 2, w: W_SKEL, color: PAL.grey });

  // steps 3 / 9-11: loads and weights, form arrow + load-line edge together
  // (all name labels sit behind the applet's showLabels checkbox)
  const lblOn = (st) => st.lbl;
  for (let i = 1; i <= 8; i++) {
    dw.arrow(`loadF${i}`, { intro: IL[i], ...ARROW });
    dw.label(`lF${i}`, `F${SUB[i]}`, { cls: 'num', intro: IL[i], color: PAL.green, when: lblOn });
    dw.arrow(`edge${i}`, { intro: IL[i], ...ARROW });
    dw.label(`lFf${i}`, `F${SUB[i]}`, { cls: 'num', intro: IL[i], color: PAL.green, when: lblOn });
  }

  // members: form + force segment at their joint step, numbered on both sides
  for (let k = 1; k <= 12; k++) {
    dw.seg(`mem${k}`, { intro: IK[k], w: W_BAR, color: memCol(k) });
    dw.seg(`fseg${k}`, { intro: IK[k], w: W_FSEG, color: memCol(k) });
    dw.label(`n${k}f`, `${k}`, { cls: 'num', intro: IK[k], color: numCol(k), when: lblOn });
    dw.label(`n${k}s`, `${k}`, { cls: 'num', intro: IK[k], color: numCol(k), when: lblOn });
  }

  // step 8: dashed parallels to the mast + extended load line (retired
  // exactly when the applet retires them: pieces 4/3 at 9, 2/1 at 10, F8 at 11)
  dw.dashLine('par4', { intro: 8, outro: 9, dash: 0.7 });
  dw.dashLine('par3', { intro: 8, outro: 9, dash: 0.7 });
  dw.dashLine('par2', { intro: 8, outro: 10, dash: 0.7 });
  dw.dashLine('par1', { intro: 8, outro: 10, dash: 0.7 });
  dw.dashLine('llext', { intro: 8, outro: 12, dash: 0.7 });

  // step 12: the reaction A on both sides (offset beside the load line)
  dw.dashLine('conn1', { intro: 12, dash: 0.55, color: 0x006400 });
  dw.dashLine('conn2', { intro: 12, dash: 0.55, color: 0x006400 });
  dw.arrow('reacA', { intro: 12, ...REAC });
  dw.arrow('reacAform', { intro: 12, ...REAC });
  dw.label('lblAf', 'A', { cls: 'num', intro: 12, color: PAL.green, when: lblOn });
  dw.label('lblAs', 'A', { cls: 'num', intro: 12, color: PAL.green, when: lblOn });

  // internal-force pipes
  for (let k = 1; k <= 12; k++) {
    dw.poly(`if${k}`, 4, { intro: RESOLVE, opacity: 0.45, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd.col[k] }, when: (st) => st.o1 });
  }

  // points
  const HANDLE = { r: 0.62 }, DERIVED = { r: 0.48 };
  const show = (st) => st.n4;
  dw.disk('pt_A', { intro: 1, ...HANDLE });
  dw.disk('pt_H', { intro: 1, ...HANDLE });
  dw.disk('pt_B', { intro: 1, ...HANDLE });
  dw.disk('pt_D', { intro: 1, ...DERIVED, when: (st) => st.n5 });
  for (const p of ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q']) {
    dw.disk(`pt_${p}`, { intro: p >= 'N' ? 1 : 1, ...DERIVED, when: show });
    dw.label(`lbl_${p}`, p, { cls: 'point', intro: 1, when: show });
  }
  dw.label('lbl_A', 'A', { cls: 'point', intro: 1, when: show });
  dw.label('lbl_H', 'H', { cls: 'point', intro: 1, when: show });
  dw.label('lbl_B', 'B', { cls: 'point', intro: 1, when: show });
  dw.disk('pt_LL0', { intro: 3, ...HANDLE });
  const fpts = { R: 4, S: 5, T: 6, U: 7, pV: 8, pW: 8, pZ: 8, pA1: 8 };
  const ftxt = { R: 'R', S: 'S', T: 'T', U: 'U', pV: 'V', pW: 'W', pZ: 'Z', pA1: 'A₁' };
  for (const [pn, intro] of Object.entries(fpts)) {
    dw.disk(`pt_${pn}`, { intro, ...DERIVED, when: show });
    dw.label(`lbl_${pn}`, ftxt[pn], { cls: 'point', intro, when: show });
  }

  // readouts
  dw.label('ro_F', '', { intro: RESOLVE, flash: false, color: PAL.green, when: lblOn });
  dw.label('ro_A', '', { intro: RESOLVE, flash: false, color: PAL.green, when: lblOn });

  // node-equilibrium inspector
  dw.nodeInspector(4, { when: (st) => st.node > 0, w: 1.5 * W_BAR, headLen: 1.8, headW: 0.75, r: 0.8 });

  // dual pairs + ghost + step re-flashes
  for (let k = 1; k <= 12; k++) dw.link(`mem${k}`, `fseg${k}`, `n${k}f`, `n${k}s`);
  for (let i = 1; i <= 8; i++) dw.link(`loadF${i}`, `edge${i}`, `lF${i}`, `lFf${i}`, `act${i}`);
  dw.link('reacA', 'reacAform', 'lblAf', 'lblAs', 'conn1', 'conn2');
  dw.ghostable(...[...Array(12)].map((_, i) => `fseg${i + 1}`),
               ...[...Array(8)].map((_, i) => `edge${i + 1}`), 'reacA');
  dw.highlight('aVert', [8]);              // the reaction line of action, step 8
  dw.highlight('mem12', [11]);             // joint Q closes with stay 12 + piece 1
  dw.highlight('fseg12', [11]);
  dw.highlight('mem1', [11]);
  dw.highlight('fseg1', [11]);

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [-40.4, 49.6]);
    dw.setLabel('force_title', [57.5, 49.55]);
    dw.setLabel('force_sub', [58.6, 47.4]);
    dw.setText('force_sub', `1 unit :: ${s.sFD.toFixed(0)} kN`);

    dw.setDashedCircle('gCircle', s.Dc, s.radius);
    dw.setDashLine('tipDeck', [d.M, d.B]);
    dw.setDashLine('tipMast', [d.Q, d.H]);
    const nodes = [null, d.M, d.L, d.K, d.J, d.N, d.O, d.P, d.Q];  // load i acts here
    for (let i = 1; i <= 8; i++) {
      dw.setDashLine(`act${i}`, [[nodes[i][0], Y_BOT], [nodes[i][0], Y_TOP]]);
    }
    dw.setDashLine('aVert', [[0, Y_BOT], [0, Y_TOP]]);
    dw.setStrokes('skelDeck', [[d.A, d.J], [d.J, d.K], [d.K, d.L], [d.L, d.M]]);
    dw.setStrokes('skelMast', [[d.A, d.N], [d.N, d.O], [d.O, d.P], [d.P, d.Q]]);
    dw.setStrokes('skelStay', [[d.N, d.J], [d.O, d.K], [d.P, d.L], [d.Q, d.M]]);

    // loads/weights hanging from the reference line + their load-line edges
    for (let i = 1; i <= 8; i++) {
      const x = nodes[i][0];
      dw.setArrow(`loadF${i}`, [x, YREF], [x, YREF - s.sLS]);
      const sgn = i <= 4 ? 1 : -1;         // deck labels right, mast labels left
      dw.setLabel(`lF${i}`, [x + sgn * 1.35, YREF - 0.55 * s.sLS]);
    }
    const edges = [null, [d.LL[0], d.LL[1]], [d.LL[1], d.LL[2]], [d.LL[2], d.LL[3]],
                   [d.LL[3], d.LL[4]], [d.pA1, d.pZ], [d.pZ, d.pW], [d.pW, d.pV],
                   [d.pV, d.LL[0]]];
    for (let i = 1; i <= 8; i++) {
      dw.setArrow(`edge${i}`, edges[i][0], edges[i][1]);
      dw.setLabel(`lFf${i}`, [edges[i][0][0] - 1.35, (edges[i][0][1] + edges[i][1][1]) / 2]);
    }

    // members + force segments + numbers
    const pm = V.perp(d.um);                       // lower-left of the mast
    for (let k = 1; k <= 12; k++) {
      const [a, b, f1, f2] = d.M12[k];
      dw.setSeg(`mem${k}`, a, b);
      dw.setSeg(`fseg${k}`, f1, f2);
      const m = V.mid(a, b), mf = V.mid(f1, f2);
      if (k <= 4) {                                // mast pieces: lower-left side
        dw.setLabel(`n${k}f`, V.add(m, V.mul(pm, 1.1)));
      } else if (k <= 8) {                         // deck pieces: below the deck
        dw.setLabel(`n${k}f`, [m[0], -1.15]);
      } else {                                     // stays: above the stay
        const pp = V.perp(V.unit(V.sub(b, a)));
        dw.setLabel(`n${k}f`, V.add(m, V.mul(pp, pp[1] > 0 ? 1.1 : -1.1)));
      }
      if (k <= 4) {                                // long mast rays: above right
        const pp = V.perp(V.unit(V.sub(f2, f1)));
        dw.setLabel(`n${k}s`, V.add(mf, V.mul(pp, pp[1] > 0 ? 1.0 : -1.0)));
      } else if (k <= 8) {                         // horizontal deck forces: below
        dw.setLabel(`n${k}s`, [mf[0], mf[1] - 1.0]);
      } else {                                     // stay forces: above the ray
        const pp = V.perp(V.unit(V.sub(f2, f1)));
        dw.setLabel(`n${k}s`, V.add(mf, V.mul(pp, pp[1] > 0 ? 0.95 : -0.95)));
      }
    }

    // step-8 apparatus
    dw.setDashLine('par4', [d.U, d.parEnd(d.U)]);
    dw.setDashLine('par3', [d.T, d.parEnd(d.T)]);
    dw.setDashLine('par2', [d.S, d.parEnd(d.S)]);
    dw.setDashLine('par1', [d.R, d.parEnd(d.R)]);
    dw.setDashLine('llext', [d.LL[0], [d.LL[0][0], Y_HELPER]]);

    // reaction A
    dw.setDashLine('conn1', [d.LL[4], d.C]);
    dw.setDashLine('conn2', [d.pA1, d.F]);
    dw.setArrow('reacA', d.C, d.F);
    dw.setArrow('reacAform', d.G, d.L1);
    dw.setLabel('lblAf', [d.G[0] + 1.3, (d.G[1] + d.L1[1]) / 2]);
    dw.setLabel('lblAs', [d.C[0] - 1.05, (d.C[1] + d.F[1]) / 2]);

    // pipes
    for (let k = 1; k <= 12; k++) {
      const [a, b, f1, f2] = d.M12[k];
      dw.setPoly(`if${k}`, V.rectPoints(a, b, s.sIF * V.dist(f1, f2)));
    }

    // points
    dw.setDisk('pt_A', d.A);
    dw.setDisk('pt_H', d.H);
    dw.setDisk('pt_B', d.B);
    dw.setDisk('pt_D', s.Dc);
    const poff = { J: [0.8, 1.0], K: [0.8, 1.0], L: [0.8, 1.0], M: [0.8, 1.0],
                   N: [1.15, 0.75], O: [1.15, 0.75], P: [1.15, 0.75], Q: [1.15, 0.75] };
    for (const p of ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q']) {
      dw.setDisk(`pt_${p}`, d[p]);
      dw.setLabel(`lbl_${p}`, V.add(d[p], poff[p]));
    }
    dw.setLabel('lbl_A', [d.A[0] - 1.5, d.A[1] - 1.0]);
    dw.setLabel('lbl_H', [d.H[0] - 0.7, d.H[1] + 1.2]);
    dw.setLabel('lbl_B', [d.B[0] + 1.1, d.B[1] + 1.0]);
    dw.setDisk('pt_LL0', d.LL[0]);
    const foff = { R: [1.25, 0.15], S: [1.25, 0.15], T: [1.25, 0.15], U: [1.35, -0.2],
                   pV: [1.15, 0.55], pW: [1.15, 0.55], pZ: [1.15, 0.55], pA1: [1.3, 0.6] };
    for (const pn of Object.keys(fpts)) {
      dw.setDisk(`pt_${pn}`, d[pn]);
      dw.setLabel(`lbl_${pn}`, V.add(d[pn], foff[pn]));
    }

    // readouts
    dw.setLabel('ro_F', [83, 38.6]);
    dw.setText('ro_F', `F₅ = F₆ = F₇ = F₈ = ${d.F5mag.toFixed(1)} kN`);
    dw.setLabel('ro_A', [83, 36.2]);
    dw.setText('ro_A', `A = ΣFᵢ = ${d.Amag.toFixed(1)} kN`);
  }

  // node-equilibrium inspector: sides of each node's closed sub-polygon
  // (1-4 deck J K L M, 5-8 mast N O P Q, 9 bearing A — reaction on the
  // drawn offset arrow C→F).
  function nodePoly() {
    const n = Math.max(1, Math.round(s.node));
    const { LL, R, S, T, U, pV, pW, pZ, pA1, C, F } = d;
    switch (n) {
      case 1: return [[LL[3], LL[4]], [LL[4], U], [U, T], [T, LL[3]]];
      case 2: return [[LL[2], LL[3]], [LL[3], T], [T, S], [S, LL[2]]];
      case 3: return [[LL[1], LL[2]], [LL[2], S], [S, R], [R, LL[1]]];
      case 4: return [[LL[0], LL[1]], [LL[1], R], [R, LL[0]]];
      case 5: return [[pA1, pZ], [pZ, T], [T, U], [U, pA1]];
      case 6: return [[pZ, pW], [pW, S], [S, T], [T, pZ]];
      case 7: return [[pW, pV], [pV, R], [R, S], [S, pW]];
      case 8: return [[pV, LL[0]], [LL[0], R], [R, pV]];
      default: return [[pA1, U], [U, LL[4]], [C, F]];
    }
  }
  const NODE_DISKS = [null, 'pt_J', 'pt_K', 'pt_L', 'pt_M',
                      'pt_N', 'pt_O', 'pt_P', 'pt_Q', 'pt_A'];
  const NODE_NAMES = [null, 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'A (bearing)'];
  function updateNode() {
    const n = Math.round(s.node);
    dw.selectDisk(n > 0 ? NODE_DISKS[n] : null);
    dw.setNodeInspector([20, 30], 6.5, n > 0 ? `node ${NODE_NAMES[n]}` : '', nodePoly());
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
  panel.slider(par, s, 'loadP', 'load P (kN)', 100, 200, 5, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (kN/unit)', 50, 100, 1, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 1, 5, 0.25, refresh);
  panel.slider(par, s, 'offR', 'offset loadline reaction forces', 0, 6, 0.25, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.05, 0.0025, refresh);
  panel.toggle(par, s, 'lbl', 'show labels', refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  panel.toggle(par, s, 'n5', 'show handles (drag-circle center)', refresh);
  panel.slider(par, s, 'radius', 'drag-circle radius', 5, 15, 0.5, () => {
    clampH(); refresh();
  });
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node',
               'node (0 = off, 1–4 deck J–M, 5–8 mast N–Q, 9 bearing A)',
               0, 9, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS, H: [...DEFAULTS.H], Dc: [...DEFAULTS.Dc],
                       ll0: [...DEFAULTS.ll0] });
    panel.syncAll();
    refresh();
  });

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  function clampH() {
    // keep H inside the drag circle and clear of the bearing vertical
    const r = V.sub(s.H, s.Dc);
    if (V.len(r) > s.radius) s.H = V.add(s.Dc, V.mul(V.unit(r), s.radius * 0.995));
    s.H[0] = Math.min(s.H[0], -4);
  }
  const hits = [
    ['H', () => s.H, 1], ['B', () => d.B, 1], ['LL0', () => d.LL[0], 3],
    ['D', () => s.Dc, 1],
  ];
  dw.enableDrag(
    (wx, wy, tol) => {
      let best = null;
      for (const [name, get, k0] of hits) {
        if (player.k < k0) continue;
        if (name === 'D' && !s.n5) continue;
        const p = get();
        const dd = Math.hypot(p[0] - wx, p[1] - wy);
        if (dd < tol) { best = name; tol = dd; }
      }
      return best;
    },
    (name, wx, wy) => {
      if (name === 'H') { s.H = [wx, wy]; clampH(); }
      else if (name === 'B') s.Bx = clamp(wx, 32, 60);
      else if (name === 'LL0') s.ll0 = [clamp(wx, 45, 96), clamp(wy, -6, 12)];
      else if (name === 'D') {
        s.Dc = [clamp(wx, -36, -18), clamp(wy, 22, 38)];
        clampH();
      }
      refresh();
    },
  );

  // click a node to inspect it (slider stays in sync)
  const nodeAt = [];
  for (let n = 1; n <= 9; n++) {
    nodeAt.push({ at: () => [d.J, d.K, d.L, d.M, d.N, d.O, d.P, d.Q, d.A][n - 1] });
  }
  dw.nodeSelect(nodeAt, (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
