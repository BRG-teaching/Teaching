/**
 * EX X · Aufgabe 10.1 — Additional Reinforced Concrete Frame (earthquake)
 * Structural Design II, FS 23, sheet "EX X — Additional Exercises", page 8.
 *
 * NUMBERING. The English sheet calls this block "Task 3". That label is wrong:
 * the English PDF restarts its counter almost every page and three separate
 * blocks are called "Task 1", two "Task 2" and three "Task 3". The German sheet
 * numbers the same 24 blocks straight through as Aufgabe 1.1 … 18 without
 * repetition, and this is Aufgabe 10.1. The German numbering is used here and
 * in every cross-reference. (Sheet error E1.)
 *
 * TEXT (verbatim). "Given is the possible distribution of the internal forces
 * for a reinforced concrete frame. Draw the corresponding force diagram.
 * Indicate tension forces with red and compression forces with blue."
 *
 * GIVEN. Q_d = 35 kN, horizontal, pointing right, labelled "(earthquake)".
 * Form diagram 1:100; force diagram 1 cm ≙ 10 kN. The sheet prints no
 * dimension lines anywhere (error E12), so all geometry below is digitised
 * from the vector artwork at the stated scale.
 *
 * GEOMETRY, metres, origin = the left support point P1, y up.
 *
 *   outer outline (splayed legs + a slab with cantilevers both sides)
 *     O1 (-1.3645, 4.4374)  slab top, left end
 *     O2 (-1.3645, 3.9662)  slab underside, left tip
 *     O3 ( 0.0744, 3.7850)  left cantilever underside meets the leg
 *     O4 (-0.4024, 0.0000)  left leg outer face at the base
 *     O5 ( 0.4024, 0.0000)  left leg inner face at the base
 *     O6 ( 1.1041, 2.7124)  leg inner face, kink
 *     O7 ( 2.4729, 3.6314)  haunch meets the slab soffit
 *     O8 ( 5.0450, 3.6314)  slab soffit, right of midspan
 *     O9 ( 6.4140, 2.7124)  right haunch kink
 *     O10( 7.1157, 0.0000)  right leg inner face at the base
 *     O11( 7.9204, 0.0000)  right leg outer face at the base
 *     O12( 7.4435, 3.7850)  right leg meets the cantilever underside
 *     O13( 8.8826, 3.9662)  slab underside, right tip
 *     O14( 8.8826, 4.4374)  slab top, right end
 *   overall 10.2471 wide × 4.4374 high; slab 0.8060 thick at midspan tapering
 *   to 0.4712 at the tips; support spacing 7.5180 m; the legs lean outward
 *   0.4768 m over their height.
 *
 *   internal strut-and-tie nodes (the "given" force path)
 *     P1 (0.0000, 0.0000)  left support, pinned
 *     P2 (0.0735, 2.8722)  left knee
 *     P3 (1.4392, 4.2549)  left top node
 *     P4 (3.7590, 4.2549)  midspan top node — Q_d enters here
 *     P5 (7.3210, 4.2549)  right top node
 *     P6 (6.4160, 3.2581)  right knee
 *     P7 (7.5180, 0.0000)  right support, pinned
 *   members 1 P1–P2 · 2 P2–P3 · 3 P1–P3 · 4 P2–P4 · 5 P3–P4 · 6 P4–P5 ·
 *           7 P4–P6 · 8 P5–P6 · 9 P5–P7 · 10 P6–P7
 *   A small circle (⌀ 0.190 m) at (1.1026, 3.2622) marks where P1–P3 and P2–P4
 *   CROSS WITHOUT CONNECTING; their true intersection is (1.1034, 3.2586).
 *
 * DETERMINACY. 7 nodes → 14 equations; 10 members + 4 reaction components = 14
 * unknowns. The matrix has rank 14 and the residual of the solve is 6.5e-14 kN,
 * so the drawn geometry is not merely approximately self-consistent, it is
 * exactly determinate.
 *
 * ANSWERS at Q_d = 35 kN (recomputed live here by lib/truss.js, and reproduced
 * independently with a numpy least-squares solve while this view was written):
 *
 *   1  P1–P2   -34.554 C        6  P4–P5   +35.301 T
 *   2  P2–P3   -76.393 C  ←max  7  P4–P6   -56.394 C
 *   3  P1–P3   +57.376 T  ←max  8  P5–P6   -49.967 C
 *   4  P2–P4   +56.392 T        9  P5–P7   +37.034 T
 *   5  P3–P4   -35.299 C       10  P6–P7   -59.965 C
 *
 *   R(P1) = (-17.500, -19.809) kN = 26.432 kN at 48.54° BELOW the horizontal
 *   R(P7) = (-17.500, +19.809) kN = 26.432 kN at 48.54° above the horizontal
 *
 * INDEPENDENT CHECK, by hand, against the matrix solve. The base pattern is
 * symmetric, so the shear splits equally: H = 35/2 = 17.500 kN at each foot.
 * Overturning: 35 × 4.2549 = 148.92 kNm over the 7.5180 m base spacing gives
 * V = 19.809 kN, down at P1 and up at P7. ΣFx = 35 - 17.5 - 17.5 = 0;
 * ΣFy = 0; ΣM about P1 = 0. Node P1 closes exactly:
 * (-0.884, -34.542) + (18.384, +54.351) + (-17.500, -19.809) = (0, 0).
 * Using the arrow's own drawn line (y = 4.2445) instead of the top chord
 * (y = 4.2549) moves V from 19.809 to 19.760 kN — 0.25 % — so quote 19.81 kN.
 *
 * THE POINT OF THE PAGE. The windward base is HELD DOWN. A horizontal load on
 * a frame is carried by a couple between the two feet, and the couple has a
 * negative half: P1 must be anchored, not merely stood on. Reverse the
 * earthquake with the slider and the uplift jumps to the other foot.
 *
 * THE SHEET PRINTS NO ANSWERS for this task. Everything above is derived.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';
import { padRing } from '../lib/poly.js';
import { analyse } from '../lib/truss.js';

// ---------------------------------------------------------------- geometry --

const OUT = [
  [-1.3645, 4.4374], [-1.3645, 3.9662], [0.0744, 3.7850], [-0.4024, 0.0000],
  [0.4024, 0.0000], [1.1041, 2.7124], [2.4729, 3.6314], [5.0450, 3.6314],
  [6.4140, 2.7124], [7.1157, 0.0000], [7.9204, 0.0000], [7.4435, 3.7850],
  [8.8826, 3.9662], [8.8826, 4.4374],
];
const NOUT = OUT.length;

const NODE = [
  [0.0000, 0.0000], [0.0735, 2.8722], [1.4392, 4.2549], [3.7590, 4.2549],
  [7.3210, 4.2549], [6.4160, 3.2581], [7.5180, 0.0000],
];
const NAME = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7'];
const MEM = [[0, 1], [1, 2], [0, 2], [1, 3], [2, 3], [3, 4],
             [3, 5], [4, 5], [4, 6], [5, 6]];
const NM = MEM.length, NN = NODE.length;
const QNODE = 3;                       // Q_d enters at P4
const SUP = { 0: 'pin', 6: 'pin' };
const CROSS = [1.1026, 3.2622], CROSSR = 0.095;
const QLINE = 4.2445;                  // the drawn arrow's own line of action

// which forces meet at each node, in a FIXED geometric order (sorted by the
// direction of the member as drawn, never by the sign of its force) so that a
// polygon side keeps its slot when the load reverses and dw.link() stays true
const AT = NODE.map((p, i) => {
  const ms = [];
  MEM.forEach(([a, b], m) => {
    if (a !== i && b !== i) return;
    const j = a === i ? b : a;
    ms.push({ m, j, ang: Math.atan2(NODE[j][1] - p[1], NODE[j][0] - p[0]) });
  });
  ms.sort((u, v) => u.ang - v.ang);
  return ms;
});
const MAXF = 5;                        // most forces meeting at one node (P4)

// -------------------------------------------------------------- the layout --

const MPU = 1.65;                      // drawing units per metre, form diagram
const AX = -18.6, AY = -9.2;           // where P1 lands
const SFD = 13.0;                      // kN per drawing unit, force diagrams
// nine cells on the right: P1…P7 then the global triangle
const CELL = Array.from({ length: 9 }, (_, i) =>
  [4.5 + (i % 3) * 9.5, 4.0 - Math.floor(i / 3) * 9.5]);
const GCELL = CELL[7];
// hand-placed label offsets: a bar's number steps aside on that bar's own
// perpendicular, and the signs alternate so bars meeting at a node do not
// stack their text. Node names step away from the members that meet there.
const MLAB = [2.6, 2.6, 2.9, -2.4, -2.3, -1.9, -2.9, 3.4, 2.6, -2.8];
const MPOS = [0.25, 0.50, 0.62, 0.50, 0.50, 0.50, 0.50, 0.50, 0.25, 0.50];
const NLAB = [[0, -2.0], [-2.2, -1.4], [-0.7, 1.4], [0, 1.4],
              [1.9, 0.9], [1.9, 0.6], [1.0, -2.0]];

const DEFAULTS = { Qd: 35, mat: true, ring: true, lbl: true, _k: 99 };

const K_REACT = 3, K_LEFT = 4, K_RIGHT = 5;

export const meta = {
  title: 'EX X · 10.1 — the windward foot is held down',
  subtitle: 'Structural Design II · “EX X — Additional Exercises”, p. 8 · German Aufgabe 10.1 (the English sheet calls it “Task 3”)',
  about: 'A reinforced-concrete frame with splayed legs, hit sideways by an earthquake force of 35 kN. The sheet gives the strut-and-tie network and asks only for the force diagram — which is generous, because that network turns out to be exactly determinate: seven nodes, fourteen equations, ten bars and four reaction components, and the matrix solves with a residual of 6.5e-14 kN. Every joint is then closed one at a time, and the last one is not a calculation but the proof that the others were right. The result worth staring at is the pair of reactions: a horizontal load on a frame is carried as a couple between the feet, so one foot is pushed down and the other is PULLED UP. Reverse the earthquake with the slider and the uplift changes ends.',
  result: (d) => [
    `Q_d = ${d.Qd.toFixed(1)} kN horizontal · shear splits equally, H = ${Math.abs(d.H).toFixed(2)} kN at each foot`,
    `overturning ${Math.abs(d.Qd).toFixed(1)} × ${d.lever.toFixed(4)} = ${Math.abs(d.Mov).toFixed(2)} kNm over ${d.base.toFixed(4)} m → V = ${Math.abs(d.Vov).toFixed(2)} kN, and one foot is in UPLIFT`,
    `largest tension ${d.tmax.toFixed(2)} kN in member ${d.tmaxN} · largest compression ${Math.abs(d.cmax).toFixed(2)} kN in member ${d.cmaxN}`,
    `R(P1) = (${d.RA[0].toFixed(2)}, ${d.RA[1].toFixed(2)}) kN · R(P7) = (${d.RB[0].toFixed(2)}, ${d.RB[1].toFixed(2)}) kN · both ${Math.hypot(...d.RA).toFixed(2)} kN at ${d.angA.toFixed(2)}° · residual ${d.resid.toExponential(1)} kN`],
  frame: [[-26, -22], [30, 16]],
};

const STEPS = [
  { t: 'The exercise', d: 'EX X page 8, German Aufgabe 10.1 — the English sheet labels it “Task 3”, which is one of three blocks with that name. A concrete frame, a horizontal earthquake force, and a strut-and-tie network that is given to you. All that is asked for is the force diagram',
    take: 'the English task numbers on this sheet are corrupt; the German numbering 1.1 … 18 is the one that resolves every cross-reference' },
  { t: 'The frame', d: 'left: the concrete as the sheet draws it — two legs leaning outward, haunches, and a slab that cantilevers past both of them. No dimension line appears anywhere on the sheet, so this is digitised at the stated 1:100',
    detail: () => [`overall 10.2471 × 4.4374 m · slab 0.8060 m thick at midspan, 0.4712 m at the tips`,
                   `support spacing 7.5180 m · the legs lean outward 0.4768 m over their height`,
                   `both bases are pinned (hatched triangles)`],
    take: 'the legs splay, so the two feet are further apart than the frame is at the top — that widens the couple that resists the wind' },
  { t: 'What is given', d: 'the internal force path is drawn for you: ten bars between seven nodes. Note the little circle where P1–P3 and P2–P4 cross — that is the sheet saying they pass over one another and are NOT connected there',
    detail: (d) => [`Q_d = ${d.Qd.toFixed(1)} kN, horizontal, entering at the midspan top node P4`,
                    `${NM} members + 4 reaction components = ${d.unknowns} unknowns · ${NN} nodes × 2 = ${d.eqs} equations`,
                    `degree of statical indeterminacy ${d.det} → exactly determinate, and the residual of the solve is ${d.resid.toExponential(1)} kN`],
    take: 'a crossing that is not a joint is a real modelling decision, not a drafting slip — connect those two bars and the frame stops being determinate' },
  { t: 'Global equilibrium first', d: 'before any joint: the two feet share the horizontal push equally, because the base pattern is symmetric. Then the force stands 4.25 m above the ground and has to be held by a couple between feet 7.52 m apart — so one foot goes DOWN and the other comes UP',
    detail: (d) => [`ΣFx: H = ${d.Qd.toFixed(1)} / 2 = ${Math.abs(d.H).toFixed(3)} kN at each foot`,
                    `ΣM: ${Math.abs(d.Qd).toFixed(1)} × ${d.lever.toFixed(4)} = ${Math.abs(d.Mov).toFixed(2)} kNm ÷ ${d.base.toFixed(4)} m = ${Math.abs(d.Vov).toFixed(3)} kN`,
                    `R(P1) = (${d.RA[0].toFixed(3)}, ${d.RA[1].toFixed(3)}) · R(P7) = (${d.RB[0].toFixed(3)}, ${d.RB[1].toFixed(3)}) kN`],
    take: 'this is a hand calculation. Everything after it is bookkeeping' },
  { t: 'Close the left half', d: 'right: one closed polygon per node. Start at P1, where only two bars meet and the reaction is already known — two unknowns, two equations. Then P2 and P3 follow, each with only two bars left',
    detail: (d) => [`P1: ${d.lab[0]} = ${Math.abs(d.N[0]).toFixed(2)} ${d.N[0] > 0 ? 'T' : 'C'} · ${d.lab[2]} = ${Math.abs(d.N[2]).toFixed(2)} ${d.N[2] > 0 ? 'T' : 'C'}`,
                    `P2 then gives ${d.lab[1]} = ${Math.abs(d.N[1]).toFixed(2)} ${d.N[1] > 0 ? 'T' : 'C'} and ${d.lab[3]} = ${Math.abs(d.N[3]).toFixed(2)} ${d.N[3] > 0 ? 'T' : 'C'}`,
                    `P3 closes with ${d.lab[4]} = ${Math.abs(d.N[4]).toFixed(2)} ${d.N[4] > 0 ? 'T' : 'C'}`],
    take: 'each polygon side is drawn parallel to its bar — that is the whole reciprocity, and it is what lets you read a force off a drawing' },
  { t: 'Close the right half', d: 'P4 carries the load itself and has four bars, so it is left until three of them are known. Then P5, P6 and finally P7 — where nothing is unknown at all. P7 closing is the proof that every joint before it was right',
    detail: (d) => [`P4 (with Q_d): ${d.lab[5]} = ${Math.abs(d.N[5]).toFixed(2)} ${d.N[5] > 0 ? 'T' : 'C'} · ${d.lab[6]} = ${Math.abs(d.N[6]).toFixed(2)} ${d.N[6] > 0 ? 'T' : 'C'}`,
                    `P5, P6: ${d.lab[7]} = ${Math.abs(d.N[7]).toFixed(2)} · ${d.lab[8]} = ${Math.abs(d.N[8]).toFixed(2)} · ${d.lab[9]} = ${Math.abs(d.N[9]).toFixed(2)} kN`,
                    `P7 is over-determined and closes anyway: residual ${d.resid.toExponential(1)} kN`],
    take: 'the last joint is never a calculation — it is the check' },
  { t: 'Read the colours', d: 'pink pulls, navy pushes. The diagonal P1–P3, which runs UP the windward leg, is the largest tension on the frame: it is the bar that stops that foot from lifting off. The largest compression sits right beside it in the knee',
    detail: (d) => [`largest tension  ${d.tmax.toFixed(2)} kN — member ${d.tmaxN}`,
                    `largest compression ${Math.abs(d.cmax).toFixed(2)} kN — member ${d.cmaxN}`,
                    `at the sheet's 1 cm ≙ 10 kN those plot as ${(d.tmax / 10).toFixed(2)} cm and ${(Math.abs(d.cmax) / 10).toFixed(2)} cm`],
    take: 'in a frame under wind, the tension and the compression are the same size and sit next to each other — the couple is the structure' },
  { t: 'The foot that is pulled up', d: 'the answer nobody expects. The windward base has a NEGATIVE vertical reaction: the ground has to hold the frame down there, which a pad footing cannot do by standing still. Drag Q_d through zero and watch the uplift walk across to the other foot',
    detail: (d) => [`R(P1) vertical = ${d.RA[1].toFixed(3)} kN · R(P7) vertical = ${d.RB[1].toFixed(3)} kN`,
                    `|R| = ${Math.hypot(...d.RA).toFixed(3)} kN at each foot, at ${d.angA.toFixed(2)}° to the horizontal`,
                    `ΣFx = ${d.sumX.toExponential(1)} · ΣFy = ${d.sumY.toExponential(1)} kN`],
    take: 'anchor the windward foot, or add enough dead load to keep it in compression. Those are the only two options and the sheet does not mention either' },
];

// ------------------------------------------------------------------ maths --

function compute(s) {
  const model = { nodes: NODE, members: MEM, supports: SUP,
                  loads: { [QNODE]: [s.Qd, 0] } };
  const r = analyse(model);
  const N = r.forces;
  const RA = r.reactions[0], RB = r.reactions[6];
  const lab = MEM.map((_, i) => `${i + 1}`);

  let tmax = 0, tmaxN = '—', cmax = 0, cmaxN = '—';
  N.forEach((n, i) => {
    if (n > tmax) { tmax = n; tmaxN = `${i + 1} (${NAME[MEM[i][0]]}–${NAME[MEM[i][1]]})`; }
    if (n < cmax) { cmax = n; cmaxN = `${i + 1} (${NAME[MEM[i][0]]}–${NAME[MEM[i][1]]})`; }
  });

  // the hand check that runs beside the matrix
  const H = -s.Qd / 2;
  const lever = NODE[QNODE][1];
  const base = NODE[6][0] - NODE[0][0];
  const Mov = s.Qd * lever;
  const Vov = Mov / base;
  const sumX = RA[0] + RB[0] + s.Qd;
  const sumY = RA[1] + RB[1];
  // the inclination a drawing board would read: acute, off the horizontal
  const angA = (Math.atan2(Math.abs(RA[1]), Math.abs(RA[0])) * 180) / Math.PI;

  // the closed force polygon at every node, in the fixed geometric order
  const polys = NODE.map((p, i) => {
    const parts = [];
    if (i === QNODE) parts.push({ v: [s.Qd, 0], col: PAL.green, name: 'Q_d' });
    if (r.reactions[i]) parts.push({ v: r.reactions[i].slice(), col: PAL.green,
                                     name: `R(${NAME[i]})` });
    for (const { m, j } of AT[i]) {
      const u = V.unit(V.sub(NODE[j], p));
      parts.push({ v: V.mul(u, N[m]), col: N[m] > 1e-9 ? PAL.red
                     : N[m] < -1e-9 ? PAL.blue : PAL.zero, name: lab[m], m });
    }
    return parts;
  });
  // where each member's force landed, so the links can be declared statically
  const slot = MEM.map(() => []);
  polys.forEach((parts, i) => parts.forEach((q, e) => {
    if (q.m !== undefined) slot[q.m].push([i, e]);
  }));

  return { Qd: s.Qd, N, RA, RB, lab, tmax, tmaxN, cmax, cmaxN,
           H, lever, base, Mov, Vov, sumX, sumY, angA,
           unknowns: r.nm + r.nr, eqs: 2 * NN, det: r.det,
           resid: r.resid, polys, slot,
           mem1: N[0], mem2: N[1], mem3: N[2], mem10: N[9] };
}

// the slot table is geometry-only, so it can be built once, outside compute
const SLOT = (() => {
  const t = MEM.map(() => []);
  NODE.forEach((p, i) => {
    let e = 0;
    if (i === QNODE) e++;
    if (SUP[i]) e++;
    for (const { m } of AT[i]) { t[m].push([i, e]); e++; }
  });
  return t;
})();

// ------------------------------------------------------------------- view --

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const ux = (p) => [AX + p[0] * MPU, AY + p[1] * MPU];

  // a member stays grey until the step that actually solves its half
  const solvedAt = MEM.map((_, i) => (i < 5 ? K_LEFT : K_RIGHT));
  const MEMCOL = (i) => ({
    pending: PAL.black,
    final: (dd, st) => (st._k < solvedAt[i] ? PAL.grey
      : dd.N[i] > 1e-9 ? PAL.red : dd.N[i] < -1e-9 ? PAL.blue : PAL.zero),
  });

  dw.label('t_form', '', { cls: 'title', flash: false });
  dw.label('t_force', 'Kräfteplan — force diagram, one closed polygon per node', { cls: 'title', flash: false });
  dw.label('t_scale', '', { cls: 'point', flash: false });

  // ---- the concrete
  dw.poly('mat', NOUT, { intro: 1, color: PAL.grey, opacity: 0.12, z: -0.25,
    flash: false, when: (st) => st.mat });
  dw.strokes('edge', NOUT, { intro: 1, w: dw.W.str, color: PAL.black });
  for (const n of ['A', 'B']) {
    dw.strokes(`hat${n}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  }

  // ---- the given internal force path
  for (let i = 0; i < NM; i++) {
    dw.seg(`mem${i}`, { intro: 2, w: dw.W.bar, color: MEMCOL(i) });
    dw.label(`lmem${i}`, '', { cls: 'num', intro: solvedAt[i], color: MEMCOL(i),
      when: (st) => st.lbl });
  }
  for (let i = 0; i < NN; i++) {
    dw.disk(`nd${i}`, { intro: 2, r: dw.W.disk });
    dw.label(`lnd${i}`, NAME[i], { cls: 'num', intro: 2, when: (st) => st.lbl });
  }
  dw.circle('cross', { intro: 2, color: PAL.black });

  // ---- the load and the reactions
  dw.dashLine('qline', { intro: 2, color: PAL.grey, dash: dw.W.dash });
  dw.arrow('fQ', { intro: 2, color: PAL.green, ...ARR });
  dw.label('lfQ', '', { cls: 'num', intro: 2, color: PAL.green });
  for (const n of ['A', 'B']) {
    dw.arrow(`re${n}`, { intro: K_REACT, color: PAL.green, ...NARR });
    dw.label(`lre${n}`, '', { cls: 'num', intro: K_REACT, color: PAL.green });
  }
  dw.seg('dimLever', { intro: K_REACT, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.seg('dimBase', { intro: K_REACT, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('ldimLever', '', { intro: K_REACT, flash: false, color: PAL.grey });
  dw.label('ldimBase', '', { intro: K_REACT, flash: false, color: PAL.grey });

  // ---- the global triangle, then one polygon per node
  for (let e = 0; e < 3; e++) {
    dw.arrow(`ge${e}`, { intro: K_REACT, ...NARR, flash: false, color: PAL.green });
  }
  dw.label('lglob', '', { cls: 'point', intro: K_REACT, flash: false, color: PAL.grey });
  for (let i = 0; i < NN; i++) {
    const at = i < 3 ? K_LEFT : K_RIGHT;
    dw.label(`jt${i}`, '', { cls: 'point', intro: at, flash: false });
    for (let e = 0; e < MAXF; e++) {
      dw.arrow(`pe${i}_${e}`, { intro: at, ...NARR, flash: false,
        color: { pending: PAL.black, final: (dd) => dd.polys[i][e]?.col ?? PAL.grey } });
    }
  }

  // every member is drawn twice in the force diagram, once at each of its two
  // ends; parallel.py insists all three lines really are parallel
  for (let m = 0; m < NM; m++) {
    const [[i0, e0], [i1, e1]] = SLOT[m];
    dw.link(`mem${m}`, `pe${i0}_${e0}`, `pe${i1}_${e1}`, `lmem${m}`);
  }
  dw.link('reA', 'ge1');
  dw.link('reB', 'ge2');

  dw.instant('t_form', 't_force', 't_scale');
  dw.ghostable('ge0', 'ge1', 'ge2');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    dw.setLabel('t_form', [AX + 5.1 * MPU, 1.0]);
    dw.setText('t_form', `Lageplan 1:100 — the given internal force distribution`);
    dw.setLabel('t_force', [15.5, 14.6]);
    dw.setLabel('t_scale', [15.5, 13.0]);
    dw.setText('t_scale', `1 drawing unit ≙ ${SFD} kN   (the sheet says 1 cm ≙ 10 kN)`);

    // ---- the concrete
    const ring = OUT.map(ux);
    dw.setPoly('mat', padRing(ring, NOUT));
    dw.setStrokes('edge', ring.map((p, i) => [p, ring[(i + 1) % NOUT]]));
    for (const [n, i] of [['A', 0], ['B', 6]]) {
      const p = ux(NODE[i]);
      dw.setStrokes(`hat${n}`, V.hatch([p[0] - 1.7, p[1] - 0.55],
        [p[0] + 1.7, p[1] - 0.55], -1, 0.95, 5));
    }

    // ---- the force path
    MEM.forEach(([a, b], i) => {
      const pa = ux(NODE[a]), pb = ux(NODE[b]);
      dw.setSeg(`mem${i}`, pa, pb);
      // each label steps aside on its own bar's perpendicular, and the sides
      // alternate so that two bars meeting at a node do not stack their text
      const nb = V.mul(V.unit(V.perp(V.sub(pb, pa))), MLAB[i]);
      dw.setLabel(`lmem${i}`, V.add(V.add(pa, V.mul(V.sub(pb, pa), MPOS[i])), nb));
      dw.setText(`lmem${i}`, `${i + 1}: ${Math.abs(d.N[i]).toFixed(1)}`);
    });
    NODE.forEach((p, i) => {
      const q = ux(p);
      dw.setDisk(`nd${i}`, q);
      dw.setLabel(`lnd${i}`, V.add(q, NLAB[i]));
    });
    dw.setCircle('cross', ux(CROSS), CROSSR * MPU * 3.2);

    // ---- the load, on its own drawn line of action
    const qy = AY + QLINE * MPU;
    const qTip = ux(OUT[0])[0] - 0.5;
    const qdir = d.Qd >= 0 ? 1 : -1;
    dw.setDashLine('qline', [[qTip - 1.0, qy], [ux(NODE[6])[0] + 3.6, qy]]);
    dw.setArrow('fQ', [qTip - 4.2 * qdir, qy], [qTip, qy]);
    dw.setLabel('lfQ', [qTip - 2.1 * qdir, qy + 1.5]);
    dw.setText('lfQ', `Q_d = ${d.Qd.toFixed(1)} kN`);

    for (const [n, i, R] of [['A', 0, d.RA], ['B', 6, d.RB]]) {
      const p = ux(NODE[i]);
      const u = V.unit(R);
      dw.setArrow(`re${n}`, V.sub(p, V.mul(u, 4.2)), V.sub(p, V.mul(u, 1.0)));
      dw.setLabel(`lre${n}`, V.add(p, n === 'A' ? [-3.4, -1.3] : [3.6, -1.1]));
      dw.setText(`lre${n}`, `${Math.hypot(...R).toFixed(2)}`);
    }
    // the two dimensions the hand check uses
    const bx = ux(NODE[0]), bx2 = ux(NODE[6]);
    dw.setSeg('dimBase', [bx[0], bx[1] - 2.7], [bx2[0], bx2[1] - 2.7]);
    dw.setLabel('ldimBase', [(bx[0] + bx2[0]) / 2, bx[1] - 2.0]);
    dw.setText('ldimBase', `base ${d.base.toFixed(3)} m`);
    const lx = ux(NODE[6])[0] + 2.4;
    dw.setSeg('dimLever', [lx, AY], [lx, AY + d.lever * MPU]);
    dw.setLabel('ldimLever', [lx + 2.9, AY + (d.lever * MPU) / 2]);
    dw.setText('ldimLever', `${d.lever.toFixed(3)} m`);

    // ---- the global triangle: Q_d, then the two reactions closing it
    const gp = [[0, 0], [d.Qd, 0]];
    gp.push(V.add(gp[1], d.RA));
    gp.push(V.add(gp[2], d.RB));
    const gs = gp.map((p) => V.mul(p, 1 / SFD));
    const gxs = gs.map((p) => p[0]), gys = gs.map((p) => p[1]);
    const goff = V.sub(GCELL, [(Math.min(...gxs) + Math.max(...gxs)) / 2,
                               (Math.min(...gys) + Math.max(...gys)) / 2]);
    for (let e = 0; e < 3; e++) {
      dw.setArrow(`ge${e}`, V.add(gs[e], goff), V.add(gs[e + 1], goff));
    }
    dw.setLabel('lglob', V.add(GCELL, [0, (Math.max(...gys) - Math.min(...gys)) / 2 + 2.0]));
    dw.setText('lglob', `global: Q_d + R(P1) + R(P7) closes`);

    // ---- one closed polygon per node, each CENTRED in its cell
    d.polys.forEach((parts, i) => {
      const pts = [[0, 0]];
      parts.forEach((q) => pts.push(V.add(pts[pts.length - 1], V.mul(q.v, 1 / SFD))));
      const xs = pts.map((q) => q[0]), ys = pts.map((q) => q[1]);
      const off = V.sub(CELL[i], [(Math.min(...xs) + Math.max(...xs)) / 2,
                                  (Math.min(...ys) + Math.max(...ys)) / 2]);
      dw.setLabel(`jt${i}`, V.add(CELL[i],
        [0, (Math.max(...ys) - Math.min(...ys)) / 2 + 1.7]));
      dw.setText(`jt${i}`, `${NAME[i]}: ${parts.map((q) => q.name).join(' + ')}`);
      for (let e = 0; e < MAXF; e++) {
        const a = V.add(pts[Math.min(e, pts.length - 1)], off);
        const b = V.add(pts[Math.min(e + 1, pts.length - 1)], off);
        dw.setArrow(`pe${i}_${e}`, a, b);
      }
    });

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const g = panel.section('Given');
  panel.slider(g, s, 'Qd', 'Q_d — the earthquake force (kN)', -70, 70, 1, refresh,
    (v) => `${v.toFixed(0)} kN ${v > 0 ? '→' : v < 0 ? '←' : '(none)'}`);
  const w = panel.section('What to look at');
  panel.toggle(w, s, 'mat', 'show the concrete', refresh);
  panel.toggle(w, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}
