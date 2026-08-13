/**
 * Drawing view/37 "Pratt / Howe truss"
 * (https://block.arch.ethz.ch/eq/drawing/view/37) as a step-by-step
 * construction, following the applet's own staging (mode 1, steps 0-19):
 *   1. loads F1..F7 on the top chord + load line;
 *   2. trial pole o' + trial funicular below the truss -> the resultant R
 *      (outer strings extended meet on its line of action);
 *   3. closing line -> the parallel through o' cuts the load line at the
 *      division point i -> reactions A = i->Z and B = H1->i;
 *   4. joint-by-joint Cremona diagram (applet steps 5-18): each joint closes
 *      a polygon of already-known sides plus at most two new member forces.
 * The HP slider ("Howe / Pratt") flips the diagonals AND the whole Cremona
 * chain; both chains are regression-checked against the baked XML and the
 * live applet (default + dragged states) to ~3e-14.
 * Zero members: Howe 2, 13, 22 -- Pratt 4, 24 (labelled "n=0", black).
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 37 — Pratt / Howe Truss',
  subtitle: 'load line → trial funicular → reactions → joint-by-joint Cremona',
  about: 'A six-panel parallel-chord truss under equal loads at every top joint. A trial funicular finds the resultant and the division point i that splits the load line into the two reactions; then the force diagram grows joint by joint — every joint of the truss closes its own polygon of member forces (a Cremona diagram). Toggle between Howe and Pratt diagonals: the same loads, the same chords, but the web forces swap — Howe diagonals push (compression), Pratt diagonals pull (tension).',
  frame: [[-0.315, 1.283], [24.79, 13.837]],
};

const GUIDE_Y = [12.851242169631037, 1.5732259866341136];   // d_12 / e_12 rails
const RESOLVE = 21;

const DEFAULTS = {
  ax: 1, ay: 9,                          // node A -- drags the whole truss
  zx: 21.1, zy: 12.2,                    // Z, top of the load line
  px: 14.728795494300574, py: 8.671696307255743,   // trial pole o' (I_1)
  qy: 3.21316373289676,                  // trial start Q' on the vertical through A
  F: [3, 3, 3, 3, 3, 3, 3],              // F_1..F_7 [1, 4] kN
  sFD: 0.4,                              // scaleForceDiagram [0.1, 2]
  sLS: 1,                                // loadSymbol [0.5, 2]
  offL: 0,                               // offsetLoads [0, 1]
  offR: 0.6,                             // offsetReactionForces [0, 1]
  sIF: 0.03,                             // scale internal forces (applet 0..0.05)
  pratt: false,                          // HP: false = Howe, true = Pratt
  o1: true,                              // internal-force pipes
  n4: true,                              // show points
  node: 0,                               // node-equilibrium inspector (0 = off)
};

// node names in the applet's own lettering: top A B D E F G H, bottom C I J K L M N
const TOP = ['A', 'B', 'D', 'E', 'F', 'G', 'H'];
const BOT = ['C', 'I', 'J', 'K', 'L', 'M', 'N'];

// member incidences (Text numbering 1..25) in the applet's exact
// internalForce(P, Q, ...) argument order per mode -- the member direction
// P->Q against the force-segment direction decides compression vs tension
const INC = [
  { 1: ['A', 'C'], 2: ['A', 'B'], 3: ['C', 'B'], 4: ['C', 'I'], 5: ['B', 'I'],
    6: ['B', 'D'], 7: ['I', 'D'], 8: ['I', 'J'], 9: ['J', 'D'], 10: ['D', 'E'],
    11: ['J', 'E'], 12: ['J', 'K'], 13: ['E', 'K'], 14: ['E', 'F'], 15: ['E', 'L'],
    16: ['K', 'L'], 17: ['F', 'L'], 18: ['F', 'G'], 19: ['F', 'M'], 20: ['L', 'M'],
    21: ['M', 'G'], 22: ['G', 'H'], 23: ['G', 'N'], 24: ['M', 'N'], 25: ['N', 'H'] },   // Howe
  { 1: ['C', 'A'], 2: ['A', 'B'], 3: ['A', 'I'], 4: ['I', 'C'], 5: ['I', 'B'],
    6: ['B', 'D'], 7: ['B', 'J'], 8: ['I', 'J'], 9: ['D', 'J'], 10: ['D', 'E'],
    11: ['D', 'K'], 12: ['J', 'K'], 13: ['E', 'K'], 14: ['E', 'F'], 15: ['K', 'F'],
    16: ['K', 'L'], 17: ['F', 'L'], 18: ['F', 'G'], 19: ['L', 'G'], 20: ['L', 'M'],
    21: ['G', 'M'], 22: ['G', 'H'], 23: ['M', 'H'], 24: ['N', 'M'], 25: ['H', 'N'] },   // Pratt
];
const ZEROS = [new Set([2, 13, 22]), new Set([4, 24])];

// joint analysed at each construction step (our steps 7..20 = applet 5..18)
const JOINTS = [
  ['A', 'C', 'B', 'I', 'D', 'J', 'E', 'K', 'L', 'F', 'M', 'G', 'N', 'H'],     // Howe
  ['C', 'A', 'I', 'B', 'J', 'D', 'E', 'K', 'F', 'L', 'G', 'M', 'H', 'N'],     // Pratt
];
const jointStep = (hp, node) => 7 + JOINTS[hp].indexOf(node);

// step each member's force segment lands (from the applet's own conditions)
const INTRO = [
  { 1: 7, 3: 8, 4: 8, 5: 9, 6: 9, 7: 10, 8: 10, 9: 11, 10: 11, 11: 12, 12: 12,
    14: 13, 15: 13, 16: 14, 17: 15, 20: 15, 18: 16, 19: 16, 21: 17, 24: 17,
    23: 18, 25: 19 },                                                          // Howe
  { 1: 7, 2: 8, 3: 8, 5: 9, 8: 9, 6: 10, 7: 10, 9: 11, 12: 11, 10: 12, 11: 12,
    13: 13, 14: 13, 15: 14, 16: 14, 17: 15, 18: 15, 19: 16, 20: 16, 21: 17,
    22: 17, 23: 18, 25: 19 },                                                  // Pratt
];

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The truss', d: 'left: six panels — loaded top chord A…H, bottom chord C…N on the supports, members numbered 1…25; the panel toggles Howe ↔ Pratt diagonals' },
  { t: 'The loads — in both diagrams', d: 'left: F₁ … F₇ at every top joint, on dashed lines of action — right: laid off tip-to-tail down the load line' },
  { t: 'Trial pole o′', d: 'right: any pole o′ with rays to the load points — left: a trial funicular below the truss: from Q′, one string ∥ each ray' },
  { t: 'The resultant R', d: 'left: the outer strings extended (dashed) meet on R\'s line of action at midspan — right: R = ΣF spans the whole load line; dashed green in BOTH diagrams' },
  { t: 'Closing line → division point i', d: 'left: dashed closing Q′–P₆ — right: the parallel through o′ cuts the load line at i' },
  { t: 'The reactions A and B', d: 'i splits the load line: A = i→Z, B = H₁→i, drawn on an offset line for clarity — left: A and B push up at the supports; the trial has done its job' },
  { t: 'Joint by joint: the end post', d: 'Howe: at joint A chord 2 carries nothing, so post 1 takes F₁ straight down — force 1 lies on the load line (Pratt: joint C — post 1 carries the whole reaction A: force 1 = Z→i)' },
  { t: 'The support corner closes', d: 'Howe: joint C — through A₁ ∥ diagonal 3, through i ∥ chord 4: with A and force 1 the polygon closes (Pratt: joint A — chord 2 and diagonal 3 close over F₁ and 1)' },
  { t: 'First panel', d: 'Howe: joint B — chord 6 through B₁ and post 5 through S₁ close over F₂ and 3 (Pratt: joint I — post 5 and chord 8 close over diagonal 3)' },
  { t: '… and its partner joint', d: 'Howe: joint I — diagonal 7 and chord 8 back to the level of i (Pratt: joint B — chord 6 and diagonal 7 close over F₂ and 5)' },
  { t: 'Second panel', d: 'Howe: joint D — chord 10 through C₁, post 9 (Pratt: joint J — post 9 and chord 12)' },
  { t: '… and its partner joint', d: 'Howe: joint J — diagonal 11, chord 12 back to i (Pratt: joint D — chord 10 and diagonal 11)' },
  { t: 'Midspan joint E', d: 'Howe: chord 14 and diagonal 15 close joint E — the mid post 13 carries NOTHING (Pratt: post 13 = F₄ in compression and chord 14)' },
  { t: 'Bottom joint K', d: 'Howe: chord 16 mirrors 12 — the diagram turns symmetric about i (Pratt: diagonal 15 and chord 16 close joint K)' },
  { t: 'Third panel, mirrored', d: 'Howe: joint L — post 17 and chord 20 (Pratt: joint F — post 17 and chord 18)' },
  { t: '… and its partner joint', d: 'Howe: joint F — chord 18 and diagonal 19 (Pratt: joint L — diagonal 19 and chord 20)' },
  { t: 'Toward the far support', d: 'Howe: joint M — post 21 and chord 24 (Pratt: joint G — post 21 and chord 22)' },
  { t: 'Last web member', d: 'Howe: joint G — diagonal 23 closes it; chord 22 carries nothing (Pratt: joint M — diagonal 23 closes over 20, 21 and 24 = 0)' },
  { t: 'The far support', d: 'Howe: joint N — post 25 = F₇ returns on the load line and the reaction B closes the joint (Pratt: joint H — post 25 carries the whole of B down to the support)' },
  { t: 'The last joint is the check', d: 'every side of its polygon is already drawn — Howe: joint H (Pratt: joint N) closes for free: the Cremona diagram is complete' },
  { t: 'Compression and tension', d: 'blue = compression, pink = tension — Howe: diagonals push, verticals tie; Pratt: diagonals tie, posts push. Toggle Howe ↔ Pratt, drag A, Z or the loads, click any joint to inspect its equilibrium' },
];

const cache = {};
function inter(key, p1, d1, p2, d2) {
  cache[key] = V.intersect(p1, d1, p2, d2) || cache[key] || p1;
  return cache[key];
}

// ---------------------------------------------------------------------------
// the construction (mirrors applet_0/geogebra.xml, evaluated live)
// ---------------------------------------------------------------------------

function compute(s) {
  const hp = s.pratt ? 1 : 0;
  const T = TOP.map((_, k) => [s.ax + 2 * k, s.ay]);            // A B D E F G H
  const Bo = BOT.map((_, k) => [s.ax + 2 * k, s.ay - 2]);       // C I J K L M N
  const P = {};
  TOP.forEach((n, k) => { P[n] = T[k]; });
  BOT.forEach((n, k) => { P[n] = Bo[k]; });

  // load line: Z downward, gaps F_i * sFD
  const LL = [[s.zx, s.zy]];
  for (let i = 0; i < 7; i++) LL.push([s.zx, LL[i][1] - s.F[i] * s.sFD]);
  const [Z0, A1, B1, C1, D1, E1, G1, H1] = LL;

  // trial funicular: pole o', start Q' on the vertical through A
  const pole = [s.px, s.py];
  const Q = [s.ax, s.qy];
  const fp = [Q];
  for (let k = 0; k < 6; k++) {
    fp.push(inter(`fp${k}`, fp[k], V.sub(pole, LL[k + 1]), [s.ax + 2 * (k + 1), 0], [0, 1]));
  }
  // outer strings extended meet on the resultant's line of action
  const Q1 = inter('Q1', Q, V.sub(pole, Z0), fp[6], V.sub(pole, H1));
  // closing Q'-P6; the parallel through o' cuts the load line at i
  const R1 = inter('R1', pole, V.sub(fp[6], Q), Z0, [0, 1]);

  // offset copies (offsetLoads / offsetReactionForces apparatus)
  const OL = LL.map((p) => [p[0] + s.offL, p[1]]);
  const J6 = [s.zx + s.offR, s.zy];
  const K6 = [s.zx + s.offR, H1[1]];
  const L6 = [s.zx + s.offR, R1[1]];

  // ---- the Cremona chain (the applet's exact intersections) --------------
  const segs = {};
  if (hp === 0) {   // Howe
    const S1 = inter('S1', R1, V.sub(P.I, P.C), A1, V.sub(P.B, P.C));
    const T1 = inter('T1', B1, V.sub(P.D, P.B), S1, V.sub(P.I, P.B));
    const U1 = inter('U1', T1, V.sub(P.D, P.I), S1, V.sub(P.I, P.J));
    const V1 = inter('V1', C1, V.sub(P.E, P.D), U1, V.sub(P.J, P.D));
    const W1 = inter('W1', V1, V.sub(P.E, P.J), R1, V.sub(P.K, P.J));
    const Z1 = inter('Z1', D1, V.sub(P.F, P.E), W1, V.sub(P.L, P.E));
    const A2 = inter('A2', Z1, V.sub(P.L, P.F), R1, V.sub(P.L, P.M));
    const M2 = inter('M2', E1, V.sub(P.G, P.F), A2, V.sub(P.M, P.F));
    const N2 = inter('N2', R1, V.sub(P.M, P.N), G1, V.sub(P.N, P.G));
    // force segments in the applet's internalForce (R, S) order
    Object.assign(segs, {
      1: [A1, Z0], 3: [A1, S1], 4: [S1, R1], 5: [T1, S1], 6: [B1, T1],
      7: [T1, U1], 8: [U1, R1], 9: [U1, V1], 10: [C1, V1], 11: [V1, W1],
      12: [W1, R1], 14: [D1, Z1], 15: [Z1, W1], 16: [W1, R1], 17: [A2, Z1],
      20: [A2, R1], 18: [E1, M2], 19: [M2, A2], 21: [M2, N2], 24: [N2, R1],
      23: [G1, N2], 25: [G1, H1],
    });
  } else {          // Pratt
    const B2 = inter('B2', A1, V.sub(P.B, P.A), R1, V.sub(P.I, P.A));
    const C2 = inter('C2', B2, V.sub(P.I, P.B), R1, V.sub(P.C, P.I));
    const D2 = inter('D2', B1, V.sub(P.D, P.B), C2, V.sub(P.J, P.B));
    const E2 = inter('E2', D2, V.sub(P.J, P.D), R1, V.sub(P.I, P.J));
    const G2 = inter('G2', C1, V.sub(P.E, P.D), E2, V.sub(P.K, P.D));
    const H2 = inter('H2', D1, V.sub(P.F, P.E), G2, V.sub(P.K, P.E));
    const I2 = inter('I2', H2, V.sub(P.F, P.K), R1, V.sub(P.L, P.K));
    const J2 = inter('J2', E1, V.sub(P.G, P.F), I2, V.sub(P.L, P.F));
    const K2 = inter('K2', R1, V.sub(P.L, P.M), J2, V.sub(P.G, P.L));
    const L2 = inter('L2', G1, V.sub(P.H, P.G), K2, V.sub(P.M, P.G));
    // force segments in the applet's internalForce (R, S) order
    Object.assign(segs, {
      1: [Z0, R1], 2: [A1, B2], 3: [B2, R1], 5: [B2, C2], 6: [B1, D2],
      7: [D2, C2], 8: [C2, R1], 9: [E2, D2], 10: [C1, G2], 11: [G2, E2],
      12: [E2, R1], 13: [H2, G2], 14: [D1, H2], 15: [H2, I2], 16: [I2, R1],
      17: [J2, I2], 18: [E1, J2], 19: [J2, K2], 20: [K2, R1], 21: [L2, K2],
      22: [G1, L2], 23: [L2, R1], 25: [H1, R1],
    });
  }

  // member colors + magnitudes: isCompression(ggbAngle(member P->Q, force))
  // with the applet's internalForce argument order
  const inc = INC[hp];
  const col = {}, mag = {}, comp = {};
  for (let k = 1; k <= 25; k++) {
    if (ZEROS[hp].has(k)) { col[k] = PAL.black; mag[k] = 0; comp[k] = false; continue; }
    const [pn, qn] = inc[k];
    const md = V.sub(P[qn], P[pn]);
    const fd = V.sub(segs[k][1], segs[k][0]);
    comp[k] = V.isCompression(V.ggbAngle(md, fd));
    col[k] = comp[k] ? PAL.blue : PAL.red;
    mag[k] = V.len(fd) / s.sFD;
  }
  const magA = V.dist(R1, Z0) / s.sFD;
  const magB = V.dist(H1, R1) / s.sFD;
  const magR = V.dist(Z0, H1) / s.sFD;

  return { hp, T, Bo, P, LL, Z0, A1, H1, pole, Q, fp, Q1, R1, OL, J6, K6, L6,
           segs, inc, col, mag, comp, magA, magB, magR };
}

/** Node force sub-polygon: chain the load/reaction edge + member force
    segments tip-to-tail (closes to machine precision -- Cremona property). */
function nodeSides(d, s, node) {
  const hp = d.hp;
  const iN = (TOP.includes(node) ? TOP : BOT).indexOf(node);
  const mem = [];
  for (const [k, [p, q]] of Object.entries(d.inc)) {
    if ((p === node || q === node) && !ZEROS[hp].has(+k)) mem.push(+k);
  }
  // start from the load / reaction edge ON the load line (so the tip-to-tail
  // walk closes exactly); shifted afterwards onto the VISIBLE offset arrows
  const sides = [];
  let shift = null;
  if (TOP.includes(node)) {
    sides.push(['F' + (iN + 1), [d.LL[iN], d.LL[iN + 1]]]);
    shift = [s.offL, 0];
  } else if (node === 'C') {
    sides.push(['A', [d.R1, d.Z0]]);
    shift = [s.offR, 0];
  } else if (node === 'N') {
    sides.push(['B', [d.LL[7], d.R1]]);
    shift = [s.offR, 0];
  }
  const used = new Set();
  if (!sides.length) {
    // interior bottom node: seed with its lowest member, oriented physically
    // (tension pulls the node toward the far end, compression pushes it away)
    const k0 = Math.min(...mem);
    const [p, q] = d.inc[k0];
    const other = p === node ? q : p;
    const u = V.unit(V.sub(d.P[other], d.P[node]));
    const f = V.mul(u, d.comp[k0] ? -1 : 1);
    const sd = V.unit(V.sub(d.segs[k0][1], d.segs[k0][0]));
    sides.push([`${k0}`, V.dot(f, sd) > 0 ? d.segs[k0] : [d.segs[k0][1], d.segs[k0][0]]]);
    used.add(k0);
  }
  for (let n = 0; n < mem.length; n++) {
    const tip = sides[sides.length - 1][1][1];
    for (const k of mem) {
      if (used.has(k)) continue;
      const [a, b] = d.segs[k];
      if (V.dist(a, tip) < 1e-9) { sides.push([`${k}`, [a, b]]); used.add(k); break; }
      if (V.dist(b, tip) < 1e-9) { sides.push([`${k}`, [b, a]]); used.add(k); break; }
    }
  }
  if (shift) sides[0][1] = sides[0][1].map((p) => V.add(p, shift));   // onto the drawn arrow
  return sides;
}

// ---------------------------------------------------------------------------

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, F: [...DEFAULTS.F] };
  let d = compute(s);
  let player = null;
  const hp = () => (s.pratt ? 1 : 0);
  const k = () => (player ? player.k : 0);

  const W_BAR = 0.05, W_TRIAL = 0.028;
  const AR = { w: 0.07, headLen: 0.26, headW: 0.1 };

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // ---- step 1: the truss --------------------------------------------------
  // members are black until their force lands in the Cremona; they re-flash
  // at both their end joints' steps (the applet's step highlight)
  const memberColor = (m) => ({
    pending: PAL.black,
    final: () => (k() >= (INTRO[hp()][m] ?? Infinity) ? d.col[m] : PAL.black),
  });
  for (let m = 1; m <= 25; m++) {
    dw.seg(`m${m}`, { intro: 1, w: W_BAR, color: memberColor(m) });
    dw.label(`mn${m}`, `${m}`, { cls: 'num', intro: 1,
      color: { final: () => (k() >= (INTRO[hp()][m] ?? Infinity) ? d.col[m] : PAL.black) } });
  }
  // node letters + disks
  const NODES = [...TOP, ...BOT];
  for (const n of NODES) {
    dw.disk(`pt_${n}`, { intro: 1, r: 0.07, when: (st) => st.n4 });
    dw.label(`lbl_${n}`, n, { cls: 'point', intro: 1, when: (st) => st.n4,
      color: { final: () => (k() === jointStep(hp(), n) ? PAL.pink : undefined) } });
  }

  // ---- step 2: loads + lines of action + load line ------------------------
  for (let i = 0; i < 7; i++) {
    dw.dashLine(`loa${i}`, { intro: 2, dash: 0.1, flash: false });
    dw.arrow(`ld${i}`, { intro: 2, ...AR });                     // at the top joint
    dw.label(`lblLd${i}`, `F${'₁₂₃₄₅₆₇'[i]}`, { intro: 2, color: PAL.green });
    dw.arrow(`fl${i}`, { intro: 2, ...AR,
      when: (st, dd) => k() <= 6 || k() >= jointStep(hp(), TOP[i]) });   // on the load line
    dw.label(`lblFl${i}`, `F${'₁₂₃₄₅₆₇'[i]}`, { intro: 2, color: PAL.green,
      when: () => k() <= 6 || k() >= jointStep(hp(), TOP[i]) });
    dw.dashLine(`olc${i}`, { intro: 2, dash: 0.08, color: PAL.black, flash: false,
      when: (st) => st.offL > 0.005 });                          // offset connectors
  }
  dw.dashLine('olc7', { intro: 2, dash: 0.08, color: PAL.black, flash: false,
    when: (st) => st.offL > 0.005 });
  dw.dashLine('llGuide', { intro: 2, dash: 0.1, flash: false });
  dw.disk('pt_Z', { intro: 2, r: 0.09 });
  dw.label('lbl_Z', 'Z', { cls: 'point', intro: 2, when: (st) => st.n4 });
  const LLN = ['A₁', 'B₁', 'C₁', 'D₁', 'E₁', 'G₁', 'H₁'];
  for (let i = 0; i < 7; i++) {
    dw.disk(`pt_ll${i}`, { intro: 2, r: 0.055, when: (st) => st.n4 });
    dw.label(`lbl_ll${i}`, LLN[i], { cls: 'point', intro: 2, when: (st) => st.n4 });
  }

  // ---- steps 3-6: trial funicular -> R -> i -> reactions ------------------
  for (let i = 0; i < 8; i++) {
    dw.seg(`tray${i}`, { intro: 3, outro: 7, w: W_TRIAL, color: PAL.grey });
  }
  for (let i = 0; i < 6; i++) {
    dw.seg(`tstr${i}`, { intro: 3, outro: 7, w: 0.04, color: PAL.grey });
  }
  dw.disk('pt_pole', { intro: 3, outro: 7, r: 0.09 });
  dw.label('lbl_pole', 'o′', { cls: 'point', intro: 3, outro: 7 });
  dw.disk('pt_Q', { intro: 3, outro: 7, r: 0.09 });
  dw.label('lbl_Q', 'Q′', { cls: 'point', intro: 3, outro: 7 });
  dw.disk('pt_P6', { intro: 3, outro: 7, r: 0.065 });
  dw.label('lbl_P6', 'P₆', { cls: 'point', intro: 3, outro: 7 });
  for (let i = 0; i < 5; i++) dw.disk(`pt_fp${i}`, { intro: 3, outro: 7, r: 0.055, when: (st) => st.n4 });

  dw.dashLine('touter0', { intro: 4, outro: 7, dash: 0.12, color: PAL.grey });
  dw.dashLine('touter1', { intro: 4, outro: 7, dash: 0.12, color: PAL.grey });
  dw.disk('pt_Q1', { intro: 4, outro: 7, r: 0.065 });
  dw.dashLine('rLoa', { intro: 4, outro: 7, dash: 0.1, flash: false });      // k_14
  dw.dashArrow('rForm', { intro: 4, outro: 7, ...AR, w: 0.08, dash: 0.22 }); // w_12
  dw.label('lbl_rForm', 'R', { intro: 4, outro: 7, color: PAL.green });
  dw.dashArrow('rLine', { intro: 4, outro: 6, ...AR, w: 0.08, dash: 0.22 }); // u_13
  dw.label('lbl_rLine', 'R', { intro: 4, outro: 6, color: PAL.green });

  dw.dashLine('tclose', { intro: 5, outro: 7, dash: 0.15 });                 // m_4
  dw.dashLine('tpar', { intro: 5, outro: 7, dash: 0.15 });                   // p_4 = o'-i
  dw.disk('pt_i', { intro: 5, r: 0.075 });
  dw.label('lbl_i', 'i', { cls: 'point', intro: 5 });

  // reactions: on the offset line (force) + at the supports (form)
  const whenA = () => k() === 6 || k() >= jointStep(hp(), 'C');
  const whenB = () => k() === 6 || k() >= jointStep(hp(), 'N');
  dw.arrow('reacAf', { intro: 6, ...AR, when: whenA,
    color: { final: () => (k() === jointStep(hp(), 'C') ? PAL.pink : PAL.green) } });
  dw.arrow('reacBf', { intro: 6, ...AR, when: whenB,
    color: { final: () => (k() === jointStep(hp(), 'N') ? PAL.pink : PAL.green) } });
  dw.label('lblAf', '', { intro: 6, color: PAL.green, when: whenA });
  dw.label('lblBf', '', { intro: 6, color: PAL.green, when: whenB });
  dw.dashLine('conA1', { intro: 6, dash: 0.08, color: PAL.black, flash: false, when: whenA });  // Z-J6
  dw.dashLine('conA2', { intro: 6, dash: 0.08, color: PAL.black, flash: false, when: whenA });  // i-L6
  dw.dashLine('conB1', { intro: 6, dash: 0.08, color: PAL.black, flash: false, when: whenB });  // H1-K6
  dw.arrow('reacA', { intro: 6, ...AR,
    color: { final: () => (k() === jointStep(hp(), 'C') ? PAL.pink : PAL.green) } });
  dw.arrow('reacB', { intro: 6, ...AR,
    color: { final: () => (k() === jointStep(hp(), 'N') ? PAL.pink : PAL.green) } });
  dw.label('lblA', 'A', { intro: 6, color: PAL.green });
  dw.label('lblB', 'B', { intro: 6, color: PAL.green });

  // ---- steps 7-20: the Cremona, joint by joint ----------------------------
  const exists = (m) => !ZEROS[hp()].has(m) && INTRO[hp()][m] !== undefined;
  for (let m = 1; m <= 25; m++) {
    dw.seg(`fs${m}`, { intro: INTRO[0][m] ?? INTRO[1][m], w: W_BAR,
      color: { pending: PAL.black, final: () => d.col[m] },
      when: () => exists(m) });
    dw.label(`fn${m}`, `${m}`, { cls: 'num', intro: INTRO[0][m] ?? INTRO[1][m],
      color: { final: () => d.col[m] }, when: () => exists(m) });
  }

  // internal-force pipes + readouts (resolve step; pipes on by default)
  for (let m = 1; m <= 25; m++) {
    dw.poly(`if${m}`, 4, { intro: RESOLVE, opacity: 0.45, flash: false,
      color: { pending: PAL.grey, final: () => d.col[m] },
      when: (st) => st.o1 && !ZEROS[hp()].has(m) });
  }
  dw.label('roA', '', { intro: RESOLVE, flash: false, color: PAL.green });
  dw.label('roB', '', { intro: RESOLVE, flash: false, color: PAL.green });

  // node-equilibrium inspector (thick black arrows; star on the node itself).
  // During the joint-by-joint steps it AUTO-selects the joint being analysed
  // (the applet's orange node arrows, mode 1); the panel slider / clicking a
  // joint overrides.
  const autoNode = () => {
    if (Math.round(s.node) > 0) return Math.round(s.node) - 1;
    const kk = k();
    if (kk >= 7 && kk <= 20) return NODES.indexOf(JOINTS[hp()][kk - 7]);
    return -1;
  };
  dw.nodeInspector(6, { when: () => autoNode() >= 0, w: 1.5 * W_BAR,
                        headLen: 0.3, headW: 0.12, r: 0.1 });

  // dual hover pairs
  for (let m = 1; m <= 25; m++) dw.link(`m${m}`, `fs${m}`, `mn${m}`, `fn${m}`);
  for (let i = 0; i < 7; i++) dw.link(`ld${i}`, `fl${i}`, `lblLd${i}`, `lblFl${i}`);
  dw.link('reacA', 'reacAf', 'lblA', 'lblAf');
  dw.link('reacB', 'reacBf', 'lblB', 'lblBf');
  dw.link('rForm', 'rLine', 'lbl_rForm', 'lbl_rLine');
  for (let i = 0; i < 6; i++) dw.link(`tstr${i}`, `tray${i + 1}`);
  dw.link('tclose', 'tpar');
  dw.ghostable(...Array.from({ length: 25 }, (_, i) => `fs${i + 1}`),
               ...Array.from({ length: 7 }, (_, i) => `fl${i}`),
               'reacAf', 'reacBf');

  // re-flash form members + loads at their joints' steps (both end nodes)
  function applyMode() {
    const h = hp();
    for (let m = 1; m <= 25; m++) {
      const incm = INC[h][m];
      dw.highlight(`m${m}`, [jointStep(h, incm[0]), jointStep(h, incm[1])]);
      dw.highlight(`mn${m}`, [jointStep(h, incm[0]), jointStep(h, incm[1])]);
      const e = dw.elems.get(`fs${m}`);
      if (e) e.intro = INTRO[h][m] ?? INTRO[1 - h][m];
      const l = dw.elems.get(`fn${m}`);
      if (l) l.intro = INTRO[h][m] ?? INTRO[1 - h][m];
      dw.setText(`mn${m}`, ZEROS[h].has(m) ? `${m}=0` : `${m}`);
    }
    for (let i = 0; i < 7; i++) {
      dw.highlight(`ld${i}`, [jointStep(h, TOP[i])]);
      dw.highlight(`fl${i}`, [jointStep(h, TOP[i])]);
    }
  }

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  // hand-tuned force-number offsets [dx, dy] from the segment midpoint, per
  // mode (the six bottom-chord forces share y = level of i -- fan them out)
  const FN_OFF = [
    { 1: [-0.75, 0], 3: [-0.3, 0.24], 4: [0.55, 0.24], 5: [-0.26, 0], 6: [0, 0.26],
      7: [-0.34, 0.22], 8: [-0.35, 0.26], 9: [-0.26, 0], 10: [0, 0.26], 11: [-0.34, 0.22],
      12: [-1.1, 0.26], 14: [0, -0.28], 15: [-0.34, -0.24], 16: [-1.1, -0.28],
      17: [-0.26, 0], 20: [-0.35, -0.28], 18: [0, -0.28], 19: [-0.34, -0.24],
      21: [-0.26, 0], 23: [-0.34, -0.24], 24: [0.55, -0.28], 25: [-0.75, 0] },
    { 1: [-0.75, 0.3], 2: [0, 0.26], 3: [-0.3, 0.24], 5: [-0.26, 0], 6: [0, 0.26],
      7: [-0.34, 0.22], 8: [0.55, 0.26], 9: [-0.26, 0], 10: [0, 0.26], 11: [-0.34, 0.22],
      12: [-1.1, 0.26], 13: [-0.3, 0], 14: [0, -0.28], 15: [-0.34, -0.24],
      16: [-1.1, -0.28], 17: [-0.26, 0], 18: [0, -0.28], 19: [-0.34, -0.24],
      20: [0.55, -0.28], 21: [-0.26, 0], 22: [0, -0.28], 23: [-0.34, -0.24],
      25: [-0.75, -0.3] },
  ];

  function update() {
    const h = hp();
    dw.setLabel('form_title', [2.1, 13.4]);
    dw.setLabel('force_title', [15.4, 13.4]);
    dw.setLabel('force_sub', [15.6, 13.02]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(2)} kN`);

    // truss + numbers
    const cent = [s.ax + 6, s.ay - 1];
    for (let m = 1; m <= 25; m++) {
      const [pn, qn] = INC[h][m];
      dw.setSeg(`m${m}`, d.P[pn], d.P[qn]);
      const mid = V.mid(d.P[pn], d.P[qn]);
      const dir = V.sub(d.P[qn], d.P[pn]);
      let off;
      if (Math.abs(dir[1]) < 1e-9) off = [0, mid[1] > cent[1] ? 0.26 : -0.28];       // chords
      else if (Math.abs(dir[0]) < 1e-9) off = [m === 1 || m === 25 ? 0.2 : -0.22, 0]; // posts
      else off = [-0.28, 0.24];                                                       // diagonals
      dw.setLabel(`mn${m}`, V.add(mid, off));
    }
    for (const n of NODES) {
      dw.setDisk(`pt_${n}`, d.P[n]);
      const top = TOP.includes(n);
      dw.setLabel(`lbl_${n}`, V.add(d.P[n], top ? [-0.28, 0.24] : [-0.28, -0.26]));
    }

    // loads + lines of action + load line
    for (let i = 0; i < 7; i++) {
      const N = d.T[i];
      dw.setDashLine(`loa${i}`, [[N[0], GUIDE_Y[0]], [N[0], GUIDE_Y[1]]]);
      dw.setArrow(`ld${i}`, [N[0], N[1] + s.sLS], N);
      dw.setLabel(`lblLd${i}`, [N[0] + 0.3, N[1] + s.sLS * 0.68]);
      dw.setArrow(`fl${i}`, d.OL[i], d.OL[i + 1]);
      dw.setLabel(`lblFl${i}`, [d.OL[i][0] - 0.38, (d.OL[i][1] + d.OL[i + 1][1]) / 2]);
      dw.setDashLine(`olc${i}`, [d.LL[i], d.OL[i]]);
      dw.setDisk(`pt_ll${i}`, d.LL[i + 1]);
      dw.setLabel(`lbl_ll${i}`, V.add(d.LL[i + 1], [0.28, 0.16]));
    }
    dw.setDashLine('olc7', [d.LL[7], d.OL[7]]);
    dw.setDashLine('llGuide', [[s.zx, GUIDE_Y[0]], [s.zx, GUIDE_Y[1]]]);
    dw.setDisk('pt_Z', d.Z0);
    dw.setLabel('lbl_Z', V.add(d.Z0, [-0.26, 0.18]));

    // trial funicular
    for (let i = 0; i < 8; i++) dw.setSeg(`tray${i}`, d.pole, d.LL[i]);
    for (let i = 0; i < 6; i++) dw.setSeg(`tstr${i}`, d.fp[i], d.fp[i + 1]);
    dw.setDisk('pt_pole', d.pole);
    dw.setLabel('lbl_pole', V.add(d.pole, [0.28, 0.26]));
    dw.setDisk('pt_Q', d.Q);
    dw.setLabel('lbl_Q', V.add(d.Q, [-0.32, -0.2]));
    dw.setDisk('pt_P6', d.fp[6]);
    dw.setLabel('lbl_P6', V.add(d.fp[6], [0.3, -0.2]));
    for (let i = 0; i < 5; i++) dw.setDisk(`pt_fp${i}`, d.fp[i + 1]);
    dw.setDashLine('touter0', [d.Q, d.Q1]);
    dw.setDashLine('touter1', [d.fp[6], d.Q1]);
    dw.setDisk('pt_Q1', d.Q1);
    dw.setDashLine('rLoa', [[d.Q1[0], GUIDE_Y[0]], [d.Q1[0], GUIDE_Y[1]]]);
    const rTail = [d.Q1[0], d.Q1[1] - 1];
    dw.setDashArrow('rForm', rTail, [d.Q1[0], d.Q1[1] - 1 - s.sLS]);
    dw.setLabel('lbl_rForm', [d.Q1[0] + 0.28, d.Q1[1] - 1 - s.sLS * 0.5]);
    dw.setDashArrow('rLine', d.Z0, d.LL[7]);
    dw.setLabel('lbl_rLine', [s.zx - 0.85, d.R1[1] + 0.55]);
    dw.setDashLine('tclose', [d.Q, d.fp[6]]);
    dw.setDashLine('tpar', [d.pole, d.R1]);
    dw.setDisk('pt_i', d.R1);
    dw.setLabel('lbl_i', V.add(d.R1, [0.24, 0.22]));

    // reactions
    dw.setArrow('reacAf', d.L6, d.J6);
    dw.setArrow('reacBf', d.K6, d.L6);
    dw.setLabel('lblAf', [d.J6[0] + 0.32, (d.L6[1] + d.J6[1]) / 2]);
    dw.setLabel('lblBf', [d.K6[0] + 0.32, (d.K6[1] + d.L6[1]) / 2]);
    dw.setDashLine('conA1', [d.Z0, d.J6]);
    dw.setDashLine('conA2', [d.R1, d.L6]);
    dw.setDashLine('conB1', [d.LL[7], d.K6]);
    const C = d.P.C, N = d.P.N;
    dw.setArrow('reacA', [C[0], C[1] - s.sLS], C);
    dw.setArrow('reacB', [N[0], N[1] - s.sLS], N);
    dw.setLabel('lblA', [C[0] - 0.34, C[1] - s.sLS * 0.6]);
    dw.setLabel('lblB', [N[0] + 0.34, N[1] - s.sLS * 0.6]);
    dw.setText('lblAf', `A = ${d.magA.toFixed(1)} kN`);
    dw.setText('lblBf', `B = ${d.magB.toFixed(1)} kN`);

    // Cremona segments + numbers + pipes
    for (let m = 1; m <= 25; m++) {
      const sg = d.segs[m];
      const e = dw.elems.get(`fs${m}`);
      if (e && sg) {
        dw.setSeg(`fs${m}`, sg[0], sg[1]);
        const off = FN_OFF[h][m] || [0.26, 0.2];
        dw.setLabel(`fn${m}`, V.add(V.mid(sg[0], sg[1]), off));
      } else if (e) {
        dw.setSeg(`fs${m}`, d.R1, d.R1);
        dw.setLabel(`fn${m}`, [d.R1[0] + 50, d.R1[1]]);
      }
      const [pn, qn] = INC[h][m];
      dw.setPoly(`if${m}`, V.rectPoints(d.P[pn], d.P[qn], s.sIF * d.mag[m]));
    }
    dw.setLabel('roA', [22.4, 2.6]);
    dw.setText('roA', `ΣF = ${d.magR.toFixed(1)} kN`);
    dw.setLabel('roB', [22.4, 2.15]);
    dw.setText('roB', `A = B = ${d.magA.toFixed(1)} kN`);
  }

  // ---- node-equilibrium inspector -----------------------------------------
  function updateNode() {
    const j = autoNode();
    const node = NODES[Math.max(0, j)];
    dw.selectDisk(Math.round(s.node) > 0 ? `pt_${node}` : null);
    const sides = j >= 0 ? nodeSides(d, s, node) : [];
    dw.setNodeInspector(d.P[node], 1.0, j >= 0 ? `joint ${node}` : '',
                        sides.map(([, ab]) => ab));
  }

  function refresh() {
    d = compute(s);
    update();
    updateNode();
    player.apply(d, s);
  }

  player = makePlayer(STEPS, refresh);
  applyMode();

  // ------------------------------------------------------------------
  // side panel + dragging
  // ------------------------------------------------------------------

  const view = panel.section('View');
  panel.button(view, 'zoom fit', () => dw.zoomFit());

  const par = panel.section('Parameters');
  panel.toggle(par, s, 'pratt', 'Pratt diagonals (off = Howe)', () => { applyMode(); refresh(); });
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 0.1, 2, 0.05, refresh);
  panel.slider(par, s, 'sLS', 'load symbol', 0.5, 2, 0.1, refresh);
  panel.slider(par, s, 'offL', 'offset loads', 0, 1, 0.01, refresh);
  panel.slider(par, s, 'offR', 'offset reaction forces', 0, 1, 0.01, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.05, 0.005, refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);

  const fr = panel.section('Forces');
  for (let i = 0; i < 7; i++) {
    panel.slider(fr, s.F, i, `F${'₁₂₃₄₅₆₇'[i]} (kN)`, 1, 4, 0.1, refresh);
  }
  panel.button(fr, 'reset loads', () => {
    for (let i = 0; i < 7; i++) s.F[i] = 3;
    panel.syncAll();
    refresh();
  });

  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'joint (0 = off; 1-7 top A…H, 8-14 bottom C…N)',
               0, 14, 1, refresh);
  panel.button(par, 'return to start', () => {
    const { F, ...rest } = DEFAULTS;
    Object.assign(s, rest);
    for (let i = 0; i < 7; i++) s.F[i] = F[i];
    panel.syncAll();
    applyMode();
    refresh();
  });

  const hits = [
    ['A', () => d.P.A, 1, 99],
    ['Z', () => d.Z0, 2, 99],
    ['pole', () => d.pole, 3, 7],
    ['Q', () => d.Q, 3, 7],
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
      if (name === 'A') {
        s.ax = Math.max(-0.2, Math.min(3, wx));
        s.ay = Math.max(7, Math.min(11.5, wy));
      } else if (name === 'Z') {
        s.zx = Math.max(15.5, Math.min(23.5, wx));
        s.zy = Math.max(10, Math.min(13.5, wy));
      } else if (name === 'pole') { s.px = wx; s.py = wy; }
      else if (name === 'Q') s.qy = Math.max(1.6, Math.min(6, wy));
      refresh();
    },
  );

  // click a joint to inspect it (clicking the selected joint deselects)
  dw.nodeSelect(NODES.map((n) => ({ at: () => d.P[n] })), (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
