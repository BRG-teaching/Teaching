/**
 * Drawing view/35 "Lufthansa Hangar V"
 * (https://block.arch.ethz.ch/eq/drawing/view/35) as a step-by-step
 * construction.
 *
 * A hangar truss: a 22 x 34 rectangle A-B-D-C with the top chord C-E-D,
 * two mid nodes F, G found by circles of radius ChangeGeometryofTruss
 * around C/E and E/D (drag the slider: the inner triangle spreads), and
 * eleven members. Three loads act on the top chord: F1 at C and F2 at E
 * vertical, F3 at D INCLINED along the draggable direction line H-D
 * (H rides on an arc around D). A trial funicular through the pole T
 * locates the line of action of the resultant R123; the three-force rule
 * (A is a vertical roller, B a pin) closes the load line: A_V, B_V, B_H.
 * The force diagram is then built joint by joint (C -> A -> B -> F -> E ->
 * D/G); at the default loads the resultant passes (almost) through B, so
 * A_V = 0 and members 10, 11 carry nothing - the applet flags "10=0",
 * "11=0", "A_V=0" in orange whenever |member 10| < 0.05 units.
 *
 * Live port of view_35/applet_0/geogebra.xml (252 commands); the chain
 * matches the LIVE applet to 7.7e-13 over 23 points x 5 states incl. both
 * geometry extremes (scratchpad v35_regress.py + live35/*.json dumps).
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 35 — Lufthansa Hangar V',
  subtitle: 'an inclined load on a truss: trial funicular, three-force reactions, Cremona joint by joint',
  about: 'The Lufthansa hangar truss carries two vertical roof loads and one inclined load whose direction can be swung on an arc. A trial funicular through an arbitrary pole finds the line of action of the resultant; since support A is a vertical roller, the three-force rule closes the load line and splits the pin reaction at B into B_V and B_H. The force diagram then grows joint by joint. At the default loads the resultant happens to pass through B: A_V = 0, and members 10 and 11 carry nothing — swing the inclined load and they wake up.',
  frame: [[-14, -4], [152, 81]],
};

const SUB = ['₀', '₁', '₂', '₃', '₄', '₅'];
const UP = [0, 1], RIGHT = [1, 0];
const TRIAL_END = 7;                       // trial apparatus retires (applet s3)
const RESOLVE = 15;

const DEFAULTS = {
  A: [7.37243, 12.212177],                 // truss anchor (drag: everything follows)
  Hang: 2.796875408724,                    // H's angle on the arc around D [rad]
  HR: 26.496594412086,                     // arc radius |D - H|
  O: [80, 60],                             // load-line top (drag)
  T: [135.329648324, 49.576197145],        // trial pole (drag)
  Uy: 6.954029276,                         // trial start on the vertical through A
  F1: 900, F2: 1110, F3: 1000,             // loads [500, 2000] kN
  geom: 11,                                // ChangeGeometryofTruss [6, 20]
  sFD: 50,                                 // scaleForceDiagram [50, 100] kN/unit
  oRF: 4,                                  // offsetReactionForces [0, 10]
  lsym: 6,                                 // loadSymbol [1, 10]
  sIF: 0.0008,                             // scaleInternalForces [0, 0.002]
  o1: true,                                // internal-force pipes
  n4: true,                                // show points
  lab: true,                               // show member numbers
  node: 0,
  _k: 99,
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The hangar truss', d: 'left: the rectangle A–B–D–C with top chord C–E–D and the inner nodes F, G — circles of the same radius around C, E and D place them (the ChangeGeometryofTruss slider spreads the triangle); eleven members, numbered' },
  { t: 'Three loads', d: 'left: F₁ at C and F₂ at E act vertically; F₃ at D is INCLINED — its direction is the line through H, which rides on an arc around D (drag H!) — right: F₁, F₂, F₃ stacked tip-to-tail: O → P → Q → S, F₃ parallel to H–D' },
  { t: 'The resultant R₁₂₃', d: 'right: the dashed line O → S closes the load line: the resultant of all three loads — but where does it act? (left: unknown yet)' },
  { t: 'A trial funicular', d: 'right: any trial pole T with rays to O, P, Q, S — left: from U on the wall line, one string per load, each parallel to its ray' },
  { t: 'The line of action', d: 'left: the outer strings, extended, meet at Z — R₁₂₃ acts on the line through Z parallel to O–S (dashed green, with the arrow)' },
  { t: 'The three-force rule', d: 'left: support A is a vertical roller — its line meets R₁₂₃’s line of action at S₃, so the pin reaction at B must point along S₃–B (dashed) — right: from O vertically, from S parallel to S₃–B: they close the load line at C₁' },
  { t: 'The reactions', d: 'right: A_V = C₁ → O, then B’s reaction S → C₁ splits into B_V (drawn beside the load line) and B_H — left: the supports push back (green symbols at A and B)' },
  { t: 'Joint C — members 1 and 2', d: 'left: at C only F₁, member 1 and member 2 meet — right: from P parallel to 2, from O parallel to 1 → G₁ closes the joint' },
  { t: 'Joint A — nothing to carry', d: 'right: from O parallel to member 10 and horizontally for member 11: with A_V ≈ 0 the polygon collapses — the applet’s orange verdict: 10 = 0, 11 = 0, A_V = 0 (swing F₃ or drag H and they wake up!)' },
  { t: 'Joint B — members 8 and 9', d: 'left: at B the reactions B_V, B_H meet members 8, 9 (and the empty 11) — right: from H₁ parallel to 9, from S parallel to 8 → I₁' },
  { t: 'Joint F — members 3 and 4', d: 'left: at F members 1, 9, 10 are known; 3 and 4 close it — right: from G₁ parallel to 3, from I₁ parallel to 4 → J₁' },
  { t: 'Joint E — members 5 and 6', d: 'left: at E the load F₂ meets members 2, 3, 5, 6 — right: from Q parallel to 6, from J₁ parallel to 5 → K₁' },
  { t: 'Joint D closes — member 7', d: 'left: at D the inclined F₃ meets members 6 and 7 — right: K₁ → S is parallel to member 7: the last joint closes exactly on S (the check at G is automatic)' },
  { t: 'The check: R₁₂₃ again', d: 'right: O → S re-appears — loads, reactions and all eleven member forces circulate in one closed diagram — left: the line of action still passes through the same Z' },
  { t: 'Compression and tension', d: 'members resolve blue = compression (the fan 1, 3, 5, 7 and the long diagonals) and pink = tension (top chord pieces 2, 6, the tie 4, the deck 11) — pipes ∝ force; drag H, A, O, T, the sliders — click a joint for its equilibrium',
    detail: (d, st) => [`A_V = ${d.aV.toFixed(0)} kN — B_V = ${(V.dist(d.E1, d.C1) * st.sFD).toFixed(0)} · B_H = ${(V.dist(d.S, d.E1) * st.sFD).toFixed(0)} kN`],
    take: 'an inclined load on a truss: the three-force rule splits it at the pin, then the Cremona walks joint by joint' },
];

const cache = {};
function inter(key, p1, d1, p2, d2) {
  cache[key] = V.intersect(p1, d1, p2, d2) || cache[key] || p1;
  return cache[key];
}

// members: [n, from, to] with the "away" joint used for the sense test
// members as [walkJoint, otherEnd]: the force-walk direction of FSEG[k]
// belongs to the joint listed first (sense test needs away = other - joint)
const MEMBERS = [
  null,
  ['C', 'F'], ['C', 'E'], ['F', 'E'], ['F', 'G'], ['E', 'G'],
  ['E', 'D'], ['G', 'D'], ['B', 'G'], ['B', 'F'], ['A', 'F'], ['A', 'B'],
];

function compute(s) {
  const A = s.A;
  const B = [A[0] + 22, A[1]];
  const C = [A[0], A[1] + 34];
  const D = [B[0], C[1]];
  const E = [(C[0] + D[0]) / 2, C[1]];
  const ce = E[0] - C[0];
  const F = [(C[0] + E[0]) / 2, C[1] - Math.sqrt(s.geom * s.geom - ce * ce / 4)];
  const de = D[0] - E[0];
  const G = [(E[0] + D[0]) / 2, C[1] - Math.sqrt(s.geom * s.geom - de * de / 4)];
  const H = [D[0] + s.HR * Math.cos(s.Hang), D[1] + s.HR * Math.sin(s.Hang)];
  const dir3 = V.unit(V.sub(D, H));

  // force diagram: load line O -> P -> Q -> S
  const O = s.O;
  const P = [O[0], O[1] - s.F1 / s.sFD];
  const Q = [P[0], P[1] - s.F2 / s.sFD];
  const S = V.add(Q, V.mul(dir3, s.F3 / s.sFD));

  // trial funicular (strings from U parallel to the rays T-O, T-P, T-Q, T-S)
  const T = s.T;
  const U = [A[0], s.Uy];
  const dOT = V.sub(T, O), dPT = V.sub(T, P), dQT = V.sub(T, Q), dST = V.sub(T, S);
  const Vp = inter('V', U, dPT, [E[0], 0], UP);           // on F2's vertical
  const W = inter('W', Vp, dQT, H, V.sub(D, H));          // on F3's line
  const Z = inter('Z', U, dOT, W, dST);                   // first ∩ last string
  const dOS = V.sub(S, O);

  // three-force rule
  const S3 = inter('S3', Z, dOS, A, UP);                  // action ∩ roller line (vertical at A)
  const C1 = inter('C1', S, V.sub(B, S3), O, V.sub(A, S3)); // closes on the load line
  const E1 = [O[0], S[1]];                                // corner of B_V / B_H

  // cremona
  const dm = (k) => V.sub(pt(MEMBERS[k][1]), pt(MEMBERS[k][0]));
  function pt(n) { return { A, B, C, D, E, F, G }[n]; }
  const G1 = inter('G1', P, dm(2), O, dm(1));             // joint C
  const H1 = inter('H1', O, dm(10), C1, RIGHT);           // joint A (D1 == C1)
  const I1 = inter('I1', H1, dm(9), S, dm(8));            // joint B
  const J1 = inter('J1', G1, dm(3), I1, dm(4));           // joint F
  const K1 = inter('K1', Q, dm(6), J1, dm(5));            // joint E

  // force-diagram segment per member ([tail, tip] in a consistent joint walk)
  const FSEG = [
    null,
    [G1, O], [P, G1], [G1, J1], [J1, I1], [K1, J1],
    [Q, K1], [K1, S], [I1, S], [H1, I1], [O, H1], [H1, C1],
  ];
  const Ns = [null];
  const col = [null];
  for (let k = 1; k <= 11; k++) {
    Ns.push(V.dist(FSEG[k][0], FSEG[k][1]) * s.sFD);
    const away = V.sub(pt(MEMBERS[k][1]), pt(MEMBERS[k][0]));
    const fdir = V.sub(FSEG[k][1], FSEG[k][0]);
    col.push(V.isCompression(V.ggbAngle(away, fdir)) ? PAL.blue : PAL.red);
  }
  const aV = V.dist(C1, O) * s.sFD;

  return { A, B, C, D, E, F, G, H, dir3, O, P, Q, S, T, U, Vp, W, Z, dOS,
           S3, C1, E1, G1, H1, I1, J1, K1, FSEG, Ns, col, aV };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, A: [...DEFAULTS.A], O: [...DEFAULTS.O], T: [...DEFAULTS.T] };
  let d = compute(s);
  let player;

  const W_BAR = 0.34, W_RAY = 0.1, W_FSEG = 0.26, W_TRI = 0.16;
  const ARROW = { w: 0.34, headLen: 1.5, headW: 0.58 };
  const DASH = 0.9;
  const memCol = (k) => ({ pending: PAL.black, final: (dd) => dd.col[k] });
  const numCol = (k) => ({ final: (dd) => dd.col[k] });
  const zeroW = (st, dd) => st._k >= 9 && Math.abs(dd.Ns[10] / s.sFD) < 0.05;

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('form_sub', '1 unit :: 1 m', { flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // ------------------------------------------------------------------
  // step 1 -- the truss, its numbers, H's arc + direction line, guides
  // ------------------------------------------------------------------
  dw.dashLine('vertA', { intro: 1, dash: 0.45, color: 0xbdbdbd, flash: false });
  dw.dashLine('vertE', { intro: 1, dash: 0.45, color: 0xbdbdbd, flash: false });
  dw.dashLine('dirF3', { intro: 1, dash: 0.45, color: 0x9a9a9a, flash: false });
  dw.dashLine('arcH', { intro: 1, dash: 0.35, color: 0xbdbdbd, flash: false });
  for (let k = 1; k <= 11; k++) {
    dw.seg(`mem${k}`, { intro: 1, w: W_BAR, color: memCol(k) });
    const numW = (k === 10 || k === 11)
      ? (st, dd) => st.lab && !zeroW(st, dd)   // replaced by "10 = 0" / "11 = 0"
      : (st) => st.lab;
    dw.label(`n${k}f`, `${k}`, { cls: 'num', intro: 1, color: numCol(k),
             when: numW });
  }
  for (const pn of ['A', 'B', 'C', 'D', 'E', 'F', 'G']) {
    dw.disk(`pt_${pn}`, { intro: 1, r: 0.5, when: (st) => st.n4 });
    dw.label(`lbl_${pn}`, pn, { cls: 'point', intro: 1, when: (st) => st.n4 });
  }
  dw.disk('pt_H', { intro: 1, r: 0.55 });
  dw.label('lbl_H', 'H', { cls: 'point', intro: 1 });

  // ------------------------------------------------------------------
  // step 2 -- loads (form symbols) + the load line O -> P -> Q -> S
  // ------------------------------------------------------------------
  dw.arrow('loadF1', { intro: 2, ...ARROW });
  dw.arrow('loadF2', { intro: 2, ...ARROW });
  dw.arrow('loadF3', { intro: 2, ...ARROW });
  dw.label('lF1', `F${SUB[1]}`, { cls: 'num', intro: 2, color: PAL.green });
  dw.label('lF2', `F${SUB[2]}`, { cls: 'num', intro: 2, color: PAL.green });
  dw.label('lF3', `F${SUB[3]}`, { cls: 'num', intro: 2, color: PAL.green });
  dw.arrow('edgeF1', { intro: 2, ...ARROW });
  dw.arrow('edgeF2', { intro: 2, ...ARROW });
  dw.arrow('edgeF3', { intro: 2, ...ARROW });
  dw.label('lFf1', `F${SUB[1]}`, { cls: 'num', intro: 2, color: PAL.green });
  dw.label('lFf2', `F${SUB[2]}`, { cls: 'num', intro: 2, color: PAL.green });
  dw.label('lFf3', `F${SUB[3]}`, { cls: 'num', intro: 2, color: PAL.green });
  for (const [nm, txt] of [['O', 'O'], ['P', 'P'], ['Q', 'Q'], ['S', 'S']]) {
    dw.disk(`pt_ll${nm}`, { intro: 2, r: 0.42, when: (st) => st.n4 });
    dw.label(`lbl_ll${nm}`, txt, { cls: 'point', intro: 2, when: (st) => st.n4 });
  }

  // step 3 -- the resultant R123 on the load line
  dw.dashArrow('resR', { intro: 3, ...ARROW, dash: 0.55 });
  dw.label('lR', `R${SUB[1]}${SUB[2]}${SUB[3]}`, { intro: 3, color: PAL.green });

  // step 4 -- trial pole + rays (right), strings (left)
  dw.strokes('trays', 4, { intro: 4, outro: TRIAL_END, w: W_RAY, color: PAL.grey });
  dw.disk('pt_T', { intro: 4, outro: TRIAL_END, r: 0.55 });
  dw.label('lbl_T', 'T', { cls: 'point', intro: 4, outro: TRIAL_END });
  dw.strokes('tfun', 2, { intro: 4, outro: TRIAL_END, w: W_TRI, color: PAL.grey });
  dw.disk('pt_U', { intro: 4, outro: TRIAL_END, r: 0.55 });
  dw.label('lbl_U', 'U', { cls: 'point', intro: 4, outro: TRIAL_END });

  // step 5 -- closing strings -> Z -> the line of action
  dw.dashLine('tclose1', { intro: 5, outro: TRIAL_END, dash: DASH });
  dw.dashLine('tclose2', { intro: 5, outro: TRIAL_END, dash: DASH });
  dw.disk('pt_Z', { intro: 5, r: 0.45, when: (st) => st.n4 });
  dw.label('lbl_Z', 'Z', { cls: 'point', intro: 5 });
  dw.dashLine('loa', { intro: 5, dash: 0.55, color: PAL.grey });
  dw.dashArrow('resRform', { intro: 5, ...ARROW, dash: 0.55 });
  dw.label('lRform', `R${SUB[1]}${SUB[2]}${SUB[3]}`, { intro: 5, color: PAL.green });

  // step 6 -- three-force rule
  dw.dashLine('tfRoller', { intro: 6, outro: TRIAL_END, dash: DASH, color: PAL.black });
  dw.dashLine('tfPin', { intro: 6, outro: TRIAL_END, dash: DASH, color: PAL.black });
  dw.disk('pt_S3', { intro: 6, r: 0.45, when: (st) => st.n4 });
  dw.label('lbl_S3', 'S₃', { cls: 'point', intro: 6 });
  dw.disk('pt_C1', { intro: 6, r: 0.42, when: (st) => st.n4 });
  dw.label('lbl_C1', 'C₁', { cls: 'point', intro: 6 });

  // step 7 -- reactions, offset lane in the force diagram
  dw.arrow('reacAV', { intro: 7, ...ARROW });
  dw.arrow('reacBV', { intro: 7, ...ARROW });
  dw.arrow('reacBH', { intro: 7, ...ARROW });
  dw.label('lAV', 'A_V', { cls: 'num', intro: 7, color: PAL.green });
  dw.label('lBV', 'B_V', { cls: 'num', intro: 7, color: PAL.green });
  dw.label('lBH', 'B_H', { cls: 'num', intro: 7, color: PAL.green });
  dw.arrow('freacAV', { intro: 7, ...ARROW, when: (st, dd) => dd.aV / s.sFD > 0.05 });
  dw.arrow('freacBV', { intro: 7, ...ARROW });
  dw.arrow('freacBH', { intro: 7, ...ARROW });
  dw.label('lfAV', 'A_V', { cls: 'num', intro: 7, color: PAL.green,
           when: (st, dd) => dd.aV / s.sFD > 0.05 });
  dw.label('lfBV', 'B_V', { cls: 'num', intro: 7, color: PAL.green });
  dw.label('lfBH', 'B_H', { cls: 'num', intro: 7, color: PAL.green });
  dw.dashLine('lane1', { intro: 7, dash: 0.35, color: 0xbdbdbd, flash: false });
  dw.dashLine('lane2', { intro: 7, dash: 0.35, color: 0xbdbdbd, flash: false });
  for (let i = 0; i < 3; i++) {
    dw.label(`ro${i}`, '', { intro: 7, flash: false, color: PAL.green });
  }

  // steps 8-13 -- the Cremona, joint by joint
  const JOINT_STEP = [null, 8, 8, 11, 11, 12, 12, 13, 10, 10, 9, 9];
  for (let k = 1; k <= 11; k++) {
    dw.seg(`fseg${k}`, { intro: JOINT_STEP[k], w: W_FSEG, color: memCol(k) });
    const numW = (k === 10 || k === 11)
      ? (st, dd) => st.lab && !zeroW(st, dd)
      : (st) => st.lab;
    dw.label(`n${k}s`, `${k}`, { cls: 'num', intro: JOINT_STEP[k], color: numCol(k),
             when: numW });
  }
  for (const [nm, txt, at] of [['G1', 'G₁', 8], ['H1', 'H₁', 9], ['I1', 'I₁', 10],
                               ['J1', 'J₁', 11], ['K1', 'K₁', 12]]) {
    dw.disk(`pt_${nm}`, { intro: at, r: 0.42, when: (st) => st.n4 });
    dw.label(`lbl_${nm}`, txt, { cls: 'point', intro: at, when: (st) => st.n4 });
  }
  // the applet's orange zero-verdict (shown whenever |member 10| < 0.05 units)
  dw.label('zero10', '10 = 0', { intro: 9, color: PAL.zero, when: zeroW });
  dw.label('zero11', '11 = 0', { intro: 9, color: PAL.zero, when: zeroW });
  dw.label('zeroAV', 'A_V = 0', { intro: 9, color: PAL.zero, when: zeroW });

  // step 14 -- the R123 check
  dw.dashArrow('resRchk', { intro: 14, ...ARROW, dash: 0.55 });

  // resolve -- internal-force pipes
  for (let k = 1; k <= 11; k++) {
    dw.poly(`if${k}`, 4, { intro: RESOLVE, opacity: 1.0, z: -0.18, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd.col[k] }, when: (st) => st.o1 });
  }

  // node-equilibrium inspector (7 joints)
  dw.nodeInspector(6, { when: (st) => st.node > 0, w: 1.5 * W_BAR,
                        headLen: 1.6, headW: 0.62, r: 0.5 });

  // dual pairs + ghost twins
  for (let k = 1; k <= 11; k++) dw.link(`mem${k}`, `fseg${k}`, `n${k}f`, `n${k}s`);
  dw.link('loadF1', 'edgeF1', 'lF1', 'lFf1');
  dw.link('loadF2', 'edgeF2', 'lF2', 'lFf2');
  dw.link('loadF3', 'edgeF3', 'lF3', 'lFf3', 'dirF3');
  dw.link('resR', 'resRform', 'lR', 'lRform', 'loa');
  dw.link('reacAV', 'freacAV', 'lAV', 'lfAV');
  dw.link('reacBV', 'freacBV', 'lBV', 'lfBV');
  dw.link('reacBH', 'freacBH', 'lBH', 'lfBH');
  dw.link('tfun', 'trays');
  dw.link('tfPin', 'tclose1');
  dw.ghostable('fseg1', 'fseg2', 'fseg3', 'fseg4', 'fseg5', 'fseg6', 'fseg7',
               'fseg8', 'fseg9', 'fseg10', 'fseg11', 'edgeF1', 'edgeF2', 'edgeF3',
               'freacAV', 'freacBV', 'freacBH', 'resR', 'resRchk');

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------
  function pts(dd) { return { A: dd.A, B: dd.B, C: dd.C, D: dd.D, E: dd.E, F: dd.F, G: dd.G }; }

  function update() {
    const p = pts(d);
    dw.setLabel('form_title', [d.A[0] - 18, 78]);
    dw.setLabel('form_sub', [d.A[0] - 18, 74.8]);
    dw.setLabel('force_title', [d.O[0] - 8, 78]);
    dw.setLabel('force_sub', [d.O[0] - 8, 74.8]);
    dw.setText('force_sub', `1 unit :: ${s.sFD.toFixed(0)} kN`);

    // guides
    dw.setDashLine('vertA', [[d.A[0], d.A[1] - 8], [d.A[0], d.C[1] + 12]]);
    dw.setDashLine('vertE', [[d.E[0], d.A[1] - 8], [d.E[0], d.E[1] + 12]]);
    const hd = V.unit(V.sub(d.D, d.H));
    dw.setDashLine('dirF3', [V.add(d.H, V.mul(hd, -6)), V.add(d.H, V.mul(hd, 55))]);
    const arc = [];
    for (let a = s.Hang - 0.35; a <= s.Hang + 0.35; a += 0.05) {
      arc.push([d.D[0] + s.HR * Math.cos(a), d.D[1] + s.HR * Math.sin(a)]);
    }
    dw.setDashLine('arcH', arc);
    dw.setDisk('pt_H', d.H);
    dw.setLabel('lbl_H', V.add(d.H, [-1.6, 1.1]));

    // truss
    for (let k = 1; k <= 11; k++) {
      const [a, b] = MEMBERS[k];
      dw.setSeg(`mem${k}`, p[a], p[b]);
      const mid = V.mul(V.add(p[a], p[b]), 0.5);
      const away = V.unit(V.perp(V.sub(p[b], p[a])));
      dw.setLabel(`n${k}f`, V.add(mid, V.mul(away, k === 4 || k === 11 ? -1.6 : 1.6)));
    }
    for (const [pn, xy] of Object.entries(p)) {
      dw.setDisk(`pt_${pn}`, xy);
      const off = { A: [-2, -1.2], B: [1.4, -1.2], C: [-2, 0.8], D: [1.4, 0.8],
                    E: [-0.4, 1.6], F: [-2.2, -0.4], G: [1.6, -0.4] }[pn];
      dw.setLabel(`lbl_${pn}`, V.add(xy, off));
    }

    // loads (form symbols, loadSymbol long)
    const l1a = V.add(d.C, [0, s.lsym]);
    const l2a = V.add(d.E, [0, s.lsym]);
    const l3b = V.add(d.D, V.mul(d.dir3, s.lsym));
    dw.setArrow('loadF1', l1a, d.C);
    dw.setArrow('loadF2', l2a, d.E);
    dw.setArrow('loadF3', d.D, l3b);
    dw.setLabel('lF1', V.add(l1a, [-1.7, -1.6]));
    dw.setLabel('lF2', V.add(l2a, [1.3, -1.6]));
    dw.setLabel('lF3', V.add(l3b, [0.4, 1.4]));
    dw.setArrow('edgeF1', d.O, d.P);
    dw.setArrow('edgeF2', d.P, d.Q);
    dw.setArrow('edgeF3', d.Q, d.S);
    dw.setLabel('lFf1', V.add(V.mul(V.add(d.O, d.P), 0.5), [-2.2, 0]));
    dw.setLabel('lFf2', V.add(V.mul(V.add(d.P, d.Q), 0.5), [-2.2, 0]));
    dw.setLabel('lFf3', V.add(V.mul(V.add(d.Q, d.S), 0.5), [0.6, -1.6]));
    for (const nm of ['O', 'P', 'Q', 'S']) {
      dw.setDisk(`pt_ll${nm}`, d[nm]);
      dw.setLabel(`lbl_ll${nm}`, V.add(d[nm], nm === 'S' ? [1.2, -0.6] : [-1.8, 0.6]));
    }

    // R123
    dw.setDashArrow('resR', d.O, d.S);
    dw.setLabel('lR', V.add(V.mul(V.add(d.O, d.S), 0.5), [2.2, 1.4]));

    // trial
    dw.setStrokes('trays', [[d.O, d.T], [d.P, d.T], [d.Q, d.T], [d.S, d.T]]);
    dw.setDisk('pt_T', d.T);
    dw.setLabel('lbl_T', V.add(d.T, [1.2, 0.8]));
    dw.setStrokes('tfun', [[d.U, d.Vp], [d.Vp, d.W]]);
    dw.setDisk('pt_U', d.U);
    dw.setLabel('lbl_U', V.add(d.U, [-2, -0.6]));
    dw.setDashLine('tclose1', [d.U, d.Z]);
    dw.setDashLine('tclose2', [d.W, d.Z]);
    dw.setDisk('pt_Z', d.Z);
    dw.setLabel('lbl_Z', V.add(d.Z, [0.8, -1.4]));
    const uos = V.unit(d.dOS);
    dw.setDashLine('loa', [V.add(d.Z, V.mul(uos, -14)), V.add(d.Z, V.mul(uos, 26))]);
    dw.setDashArrow('resRform', V.add(d.Z, V.mul(uos, -10)),
                    V.add(d.Z, V.mul(uos, -10 + V.dist(d.O, d.S) * 0.45)));
    dw.setLabel('lRform', V.add(V.add(d.Z, V.mul(uos, -8)), [1.6, 1.4]));

    // three-force
    dw.setDashLine('tfRoller', [[d.A[0], d.A[1] - 6], [d.A[0], d.S3[1] + 6]]);
    dw.setDashLine('tfPin', [V.add(d.S3, V.mul(V.unit(V.sub(d.B, d.S3)), -5)),
                             V.add(d.B, V.mul(V.unit(V.sub(d.B, d.S3)), 7))]);
    dw.setDisk('pt_S3', d.S3);
    dw.setLabel('lbl_S3', V.add(d.S3, [-2.2, 0.6]));
    dw.setDisk('pt_C1', d.C1);
    dw.setLabel('lbl_C1', V.add(d.C1, [-2.4, -0.8]));

    // reactions: form symbols + force diagram (B_V beside the line, B_H on it)
    dw.setArrow('reacAV', V.add(d.A, [0, -s.lsym]), d.A);
    dw.setArrow('reacBV', V.add(d.B, [0, -s.lsym]), d.B);
    dw.setArrow('reacBH', V.add(d.B, [s.lsym, 0]), d.B);
    dw.setLabel('lAV', V.add(d.A, [-2.6, -2.6]));
    dw.setLabel('lBV', V.add(d.B, [-0.6, -3]));
    dw.setLabel('lBH', V.add(d.B, [3, 1]));
    const off = [-s.oRF, 0];
    dw.setArrow('freacBV', V.add(d.E1, off), V.add(d.C1, off));
    dw.setArrow('freacBH', d.S, d.E1);
    dw.setArrow('freacAV', d.C1, d.O);
    dw.setLabel('lfBV', V.add(V.mul(V.add(d.E1, d.C1), 0.5), [-s.oRF - 2.4, 0]));
    dw.setLabel('lfBH', V.add(V.mul(V.add(d.S, d.E1), 0.5), [0.6, -1.7]));
    dw.setLabel('lfAV', V.add(V.mul(V.add(d.C1, d.O), 0.5), [1.4, 0.6]));
    dw.setDashLine('lane1', [V.add(d.C1, off), d.C1]);
    dw.setDashLine('lane2', [V.add(d.E1, off), d.E1]);
    dw.setLabel('ro0', [d.O[0] + 26, 76]);
    dw.setText('ro0', `A_V = ${(d.aV).toFixed(0)} kN`);
    dw.setLabel('ro1', [d.O[0] + 26, 72.8]);
    dw.setText('ro1', `B_V = ${(V.dist(d.E1, d.C1) * s.sFD).toFixed(0)} kN`);
    dw.setLabel('ro2', [d.O[0] + 26, 69.6]);
    dw.setText('ro2', `B_H = ${(V.dist(d.S, d.E1) * s.sFD).toFixed(0)} kN`);

    // cremona
    for (let k = 1; k <= 11; k++) {
      dw.setSeg(`fseg${k}`, d.FSEG[k][0], d.FSEG[k][1]);
      const mid = V.mul(V.add(d.FSEG[k][0], d.FSEG[k][1]), 0.5);
      const away = V.unit(V.perp(V.sub(d.FSEG[k][1], d.FSEG[k][0])));
      dw.setLabel(`n${k}s`, V.add(mid, V.mul(away, 1.5)));
    }
    for (const nm of ['G1', 'H1', 'I1', 'J1', 'K1']) {
      dw.setDisk(`pt_${nm}`, d[nm]);
      dw.setLabel(`lbl_${nm}`, V.add(d[nm], [1.1, 0.7]));
    }
    dw.setLabel('zero10', V.add(V.mul(V.add(d.A, d.F), 0.5), [-3.4, 0]));
    dw.setLabel('zero11', V.add(V.mul(V.add(d.A, d.B), 0.5), [0, -1.8]));
    dw.setLabel('zeroAV', V.add(d.A, [-6.4, 1.6]));
    dw.setDashArrow('resRchk', d.O, d.S);

    // pipes
    for (let k = 1; k <= 11; k++) {
      const [a, b] = MEMBERS[k];
      const w = d.Ns[k] * s.sIF / 2;
      const u = V.mul(V.unit(V.perp(V.sub(pts(d)[b], pts(d)[a]))), w);
      dw.setPoly(`if${k}`, [V.add(pts(d)[a], u), V.add(pts(d)[b], u),
                            V.sub(pts(d)[b], u), V.sub(pts(d)[a], u)]);
    }

    updateNode();
  }

  // ------------------------------------------------------------------
  // node equilibrium (joints A, B, C, D, E, F, G)
  // ------------------------------------------------------------------
  const NODES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  function nodeSides(nm) {
    const dd = d;
    switch (nm) {
      case 'C': return [[dd.O, dd.P], [dd.P, dd.G1], [dd.G1, dd.O]];
      case 'A': return [[dd.C1, dd.O], [dd.O, dd.H1], [dd.H1, dd.C1]];
      case 'B': return [[dd.S, dd.E1], [dd.E1, dd.C1], [dd.C1, dd.H1],
                        [dd.H1, dd.I1], [dd.I1, dd.S]];
      case 'F': return [[dd.G1, dd.J1], [dd.J1, dd.I1], [dd.I1, dd.H1],
                        [dd.H1, dd.O], [dd.O, dd.G1]];
      case 'E': return [[dd.P, dd.Q], [dd.Q, dd.K1], [dd.K1, dd.J1],
                        [dd.J1, dd.G1], [dd.G1, dd.P]];
      case 'D': return [[dd.Q, dd.S], [dd.S, dd.K1], [dd.K1, dd.Q]];
      case 'G': return [[dd.I1, dd.J1], [dd.J1, dd.K1], [dd.K1, dd.S], [dd.S, dd.I1]];
      default: return [];
    }
  }

  function updateNode() {
    const n = Math.max(1, Math.round(s.node));
    const nm = NODES[n - 1];
    dw.selectDisk(s.node > 0 ? `pt_${nm}` : null);
    dw.setNodeInspector(pts(d)[nm], 6.5, s.node > 0 ? `joint ${nm}` : '',
                        nodeSides(nm));
  }

  // ------------------------------------------------------------------
  // player + panel + drag
  // ------------------------------------------------------------------
  function refresh() {
    if (player) s._k = player.k;
    d = compute(s);
    update();
    player.apply(d, s);
  }
  player = makePlayer(STEPS, refresh);

  const view = panel.section('View');
  panel.toggle(view, s, 'n4', 'show points', refresh);
  panel.toggle(view, s, 'lab', 'show member numbers', refresh);
  const par = panel.section('Parameters');
  panel.slider(par, s, 'F1', 'F₁ (kN)', 500, 2000, 10, refresh);
  panel.slider(par, s, 'F2', 'F₂ (kN)', 500, 2000, 10, refresh);
  panel.slider(par, s, 'F3', 'F₃ (kN)', 500, 2000, 10, refresh);
  panel.slider(par, s, 'geom', 'ChangeGeometryofTruss (F–G spread)', 6, 20, 0.1, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (kN/unit)', 50, 100, 1, refresh);
  panel.slider(par, s, 'oRF', 'offset reaction forces', 0, 10, 0.1, refresh);
  panel.slider(par, s, 'lsym', 'load symbol', 1, 10, 0.1, refresh);
  panel.toggle(par, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.002, 0.00005, refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'joint (0 = off; 1–7 = A B C D E F G)', 0, 7, 1, refresh);

  // draggables: A (whole truss), H (on its arc), O, T, U
  const hits = [
    ['H', () => d.H, 1, 99], ['A', () => d.A, 1, 99], ['O', () => d.O, 2, 99],
    ['T', () => d.T, 4, TRIAL_END], ['U', () => d.U, 4, TRIAL_END],
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
      if (name === 'H') s.Hang = Math.atan2(wy - d.D[1], wx - d.D[0]);
      else if (name === 'A') s.A = [wx, wy];
      else if (name === 'O') s.O = [wx, wy];
      else if (name === 'T') s.T = [wx, wy];
      else if (name === 'U') s.Uy = wy;
      refresh();
    },
  );

  // click a joint to inspect it
  dw.nodeSelect(
    NODES.map((nm) => ({ at: () => pts(d)[nm] })),
    (i) => {
      s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
      panel.syncAll();
      refresh();
    },
  );

  refresh();
  return player;
}
