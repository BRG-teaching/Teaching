/**
 * EX X · Task 12 — From arch-cable to truss
 * Structural Design I, HS 22 (sheet "EX X — Additional Exercises", page 12).
 *
 * TASK, verbatim (English sheet):
 *   "Task 12  From arch-cable to truss
 *    Draw the corresponding force diagram for the given situations. Colour
 *    tension forces red, compression forces blue and the external forces green."
 *
 * Four unlettered situations, printed top to bottom. They are not four separate
 * exercises: they are ONE structure walked from a three-member arch-cable to a
 * five-member truss, and the point is to watch which forces survive the walk
 * and which only appear at the end. The view presents them as a progression
 * under a single `situation` control.
 *
 * GEOMETRY, digitised from page 12 with
 *   web/tools/sheetvec.py <task-en.pdf> 12 --scale 100 --min 0.2 --cluster
 * (origin here: the left-hand node of each situation, at support level)
 *
 *   situation 1   III (support A)   5.472, 28.067  ->  0, 0
 *                 I   (apex, F1)    8.471, 31.066  ->  3, 3
 *                 II  (support B)  11.470, 28.067  ->  6, 0
 *   situation 2   II  (top left)    5.472, 22.665  ->  0, 3
 *                 III (top right)  11.470, 22.665  ->  6, 3
 *                 I   (bottom, F1)  8.471, 19.666  ->  3, 0
 *                 A / B post feet   5.472/11.470, 19.666 -> 0,0 / 6,0
 *   situation 3   II  (top left)    5.472, 13.262  ->  0, 3
 *                 I   (top right)  11.470, 13.262  ->  6, 3
 *                 III (support A)   8.471, 10.263  ->  3, 0
 *   situation 4   I   (bottom left)  5.472, 2.016  ->  0, 0
 *                 IV  (support A)    8.471, 2.016  ->  3, 0
 *                 II  (bottom right)11.470, 2.016  ->  6, 0
 *                 III (apex)         8.471, 5.014  ->  3, 3
 *
 * All four are the SAME triangle: span 6.000 m, depth 3.000 m (the dump gives
 * 5.998 and 2.999), so every diagonal is at exactly 45.00 degrees and 4.243 m
 * long. That the four share one geometry is the exercise; only the supports and
 * the point of application of the load change.
 *
 * DERIVATION. Solved live by lib/truss.js analyse() (positive = tension),
 * residual 0 in all four. With 60 kN of load in every situation:
 *
 *     situation   1        2        3        4
 *     member 1   -42.43   +42.43   -42.43   +42.43
 *     member 2   -42.43   +42.43   -42.43   -30.00
 *     member 3   +30.00   -30.00   +30.00   +42.43
 *     member 4      -      -30.00     -     -30.00
 *     member 5      -      -30.00     -     -60.00
 *     reactions  A=B=30   A=B=30   A=60     A=60
 *
 * 42.426 = 30*sqrt(2); 30 = the horizontal thrust H = (F/2)*(b/h) with the
 * half-span b = 3.000 m and the depth h = 3.000 m. Hand check at joint III of
 * situation 1: (0,+30) + 42.43*(-0.7071,-0.7071) + 30*(1,0) = 0. Every joint of
 * every situation closes; the view draws all the three-force ones as the
 * sheet's "subsystem" row (the two post feet of situation 2 are trivial
 * two-force joints and the key does not draw them either).
 *
 * THE PROGRESSION, which is what the page is really about:
 *   1  arch-cable, load on top: two 45-degree struts in compression and a 30 kN
 *      tie along the bottom.
 *   2  the same thing turned inside out: identical magnitudes, every sign
 *      reversed, plus two 30 kN posts carrying the reactions up to the chord.
 *   3  one support instead of two -- a bracket. The loads halve, the total is
 *      unchanged, the diagonals are again 42.43 kN compression and the chord
 *      30 kN tension, but the single reaction is now 60 kN.
 *   4  five members, a real little truss: 42.43 kN tension diagonals, 30 kN
 *      compression chords and a 60 kN compression post that takes the whole
 *      load straight down into the support. That post is the largest force on
 *      the page and it exists only in the last situation.
 *
 * THE FORCE DIAGRAMS. With a = the space under the structure, b and c the two
 * spaces flanking the load, and H = the horizontal thrust:
 *   1  b=(0,+F/2) a=(0,0) c=(0,-F/2), pole V=(-H,0). 2=b-V, 3=a-V, 1=c-V.
 *      F1 = b->c, A = a->b, B = c->a.
 *   2  the same points and the same pole, colours inverted. Members 4 and 5 are
 *      vertical, so their rays fall ON the load line: 4 = c->a coincides with
 *      A, 5 = a->b with B. The key draws them offset beside it; so does this.
 *   3  the pole moves to the OTHER side, V=(+H,0), because the support is now
 *      underneath. F1 = b->a, F2 = a->c, A = c->b.
 *   4  a rectangle: T=(+H,+F/2), Bt=(+H,-F/2). 2=b-T, 1=a-T, 5=T-Bt, 3=a-Bt,
 *      4=c-Bt.
 *
 * AGAINST THE OFFICIAL KEY. The key draws all four Cremona diagrams and all
 * four columns of joint polygons and colours every member -- and prints NOT ONE
 * NUMBER. Every value here is derived. All of the key's colours agree with the
 * signs our solver returns and the poles we compute land on the key's drawn
 * vertices, so there is no disagreement on this page. One caution worth
 * carrying: situation 2 has FIVE members, not three -- the key numbers the two
 * posts 4 and 5 and colours them blue.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';
import { analyse, polygonAt, chain } from '../lib/truss.js';

const SPAN = 6.0;                       // m, digitised 5.998
const NMEM = 5;                         // the most members any situation has
const NNODE = 5;                        // the most joints any situation has
const NPOLY = 4;                        // the most three-force joints

const DEFAULTS = {
  sit: 1,          // 1..4, the four situations of the sheet
  F: 60,           // kN, the TOTAL load (situations 3 and 4 split it in two)
  h: 3.0,          // m, the depth of the triangle
  joints: true,    // the "subsystem" row: every joint's own force polygon
  lbl: true,
  _k: 99,
};

// ---- layout, in the view's own units --------------------------------------
const FCX = 5.0, FY0 = -0.6;            // form diagram: centre x, support level
const KX = 25.0, KX4 = 28.0, KY = 3.4;  // force diagram: the load line, per case
const JY = -14.0;                       // the subsystem row
const JX = [5.0, 13.0, 21.0, 29.0];

export const meta = {
  title: 'EX X.12 — from arch-cable to truss',
  subtitle: 'Structural Design I · sheet EX X “Additional Exercises”, task 12 · four situations',
  about: 'One triangle, six metres by three, drawn four times. First as an arch with a tie, then turned upside down into a cable with a strut, then hung off a single support as a bracket, and finally closed up into a five-member truss. The load always adds to the same sixty kilonewtons, so the four force diagrams can be compared directly — and they show that the diagonal force of 42.43 kN and the chord force of 30 kN survive all four steps unchanged while only their signs flip, and that the very last step invents a force none of the others has: a 60 kN post driving the whole load straight into the support. Step through the situations with the slider, and change the depth to watch the whole family stretch.',
  result: (d) => [
    `situation ${d.sit} of 4 — ${d.name}: ${d.mem.map((m) => `${m.no} = ${Math.abs(m.N).toFixed(2)} ${m.zero ? '(zero)' : m.tension ? 'tension' : 'compression'}`).join(' · ')} kN`,
    `reactions ${d.reactTxt} · every joint polygon closes (largest residual ${d.resid.toExponential(1)} kN)`,
    `right through all four: diagonals ${d.diagAll.toFixed(2)} kN, chords ${d.chordAll.toFixed(2)} kN — only the sign changes. Situation 4 alone adds a ${d.postAll.toFixed(2)} kN post, the largest force on the page`,
    'the official key draws all four force diagrams and prints no member forces at all: every number here is derived',
  ],
  frame: [[-32, -19], [38, 17]],
};

// ---------------------------------------------------------------- the four --

const NAMES = ['arch-cable, load on the apex',
               'the same, turned inside out',
               'bracket on a single support',
               'the five-member truss'];

/** The four situations as truss models. Member index i carries number i+1. */
function model(sit, L, h, F) {
  if (sit === 1) {
    return { name: NAMES[0],
      nodes: [[0, 0], [L, 0], [L / 2, h]],
      jn: ['III', 'II', 'I'],
      members: [[2, 1], [2, 0], [0, 1]],
      supports: { 0: 'pin', 1: 'roller-v' },
      supName: { 0: 'A', 1: 'B' },
      loads: { 2: [0, -F] },
      loadName: { 2: 'F₁' },
      loadOut: false };
  }
  if (sit === 2) {
    return { name: NAMES[1],
      nodes: [[0, h], [L, h], [L / 2, 0], [0, 0], [L, 0]],
      jn: ['II', 'III', 'I', '', ''],
      members: [[0, 2], [1, 2], [0, 1], [0, 3], [1, 4]],
      supports: { 3: 'pin', 4: 'roller-v' },
      supName: { 3: 'A', 4: 'B' },
      loads: { 2: [0, -F] },
      loadName: { 2: 'F₁' },
      loadOut: true };
  }
  if (sit === 3) {
    return { name: NAMES[2],
      nodes: [[0, h], [L, h], [L / 2, 0]],
      jn: ['II', 'I', 'III'],
      members: [[1, 2], [0, 2], [0, 1]],
      supports: { 2: 'pin' },
      supName: { 2: 'A' },
      loads: { 0: [0, -F / 2], 1: [0, -F / 2] },
      loadName: { 0: 'F₁', 1: 'F₂' },
      loadOut: false };
  }
  return { name: NAMES[3],
    nodes: [[0, 0], [L, 0], [L / 2, h], [L / 2, 0]],
    jn: ['I', 'II', 'III', 'IV'],
    members: [[0, 2], [0, 3], [2, 1], [3, 1], [2, 3]],
    supports: { 3: 'pin' },
    supName: { 3: 'A' },
    loads: { 0: [0, -F / 2], 1: [0, -F / 2] },
    loadName: { 0: 'F₁', 1: 'F₂' },
    loadOut: false };
}

/**
 * The force diagram of one situation, in kN, with the load line on x = 0 and
 * the space "a" (under the structure) at the origin. Everything is derived from
 * the solved member forces: H is read off the chord, never assumed.
 */
function cremona(sit, F, H) {
  const b = [0, F / 2], a = [0, 0], c = [0, -F / 2];
  if (sit === 1) {
    const p = [-H, 0];
    return { pts: { a, b, c, V: p }, pole: p,
      rays: [{ no: '1', p: c, q: p }, { no: '2', p: b, q: p }, { no: '3', p: a, q: p }],
      ext: [{ n: 'F₁', t: b, h: c, v: F }, { n: 'A', t: a, h: b, v: F / 2 },
            { n: 'B', t: c, h: a, v: F / 2 }] };
  }
  if (sit === 2) {
    const p = [-H, 0];
    const o = -H * 0.26;                    // the two vertical rays, drawn aside
    return { pts: { a, b, c, V: p }, pole: p,
      rays: [{ no: '1', p: c, q: p }, { no: '2', p: b, q: p }, { no: '3', p: a, q: p },
             { no: '4', p: [o, -F / 2], q: [o, 0] }, { no: '5', p: [o, 0], q: [o, F / 2] }],
      ext: [{ n: 'F₁', t: b, h: c, v: F }, { n: 'A', t: c, h: a, v: F / 2 },
            { n: 'B', t: a, h: b, v: F / 2 }] };
  }
  if (sit === 3) {
    const p = [H, 0];
    return { pts: { a, b, c, V: p }, pole: p,
      rays: [{ no: '1', p: c, q: p }, { no: '2', p: b, q: p }, { no: '3', p: a, q: p }],
      ext: [{ n: 'F₁', t: b, h: a, v: F / 2 }, { n: 'F₂', t: a, h: c, v: F / 2 },
            { n: 'A', t: c, h: b, v: F }] };
  }
  const T = [H, F / 2], Bt = [H, -F / 2];
  return { pts: { a, b, c, T, Bt }, pole: T,
    rays: [{ no: '1', p: a, q: T }, { no: '2', p: b, q: T }, { no: '3', p: a, q: Bt },
           { no: '4', p: c, q: Bt }, { no: '5', p: T, q: Bt }],
    ext: [{ n: 'F₁', t: b, h: a, v: F / 2 }, { n: 'F₂', t: a, h: c, v: F / 2 },
          { n: 'A', t: c, h: b, v: F }] };
}

function compute(s) {
  const sit = Math.round(s.sit);
  const L = SPAN, h = s.h, F = s.F;
  const M = model(sit, L, h, F);
  const res = analyse(M);

  const mem = M.members.map(([i, j], k) => ({
    no: String(k + 1), i, j, N: res.forces[k],
    a: M.nodes[i], b: M.nodes[j],
    tension: res.forces[k] > 1e-6, zero: Math.abs(res.forces[k]) < 1e-6,
  }));
  // the horizontal thrust: member 3 carries it in situations 1-3, member 2 in 4
  const H = Math.abs(res.forces[sit === 4 ? 1 : 2]);
  const K = cremona(sit, F, H);

  // the sheet's "subsystem" column: every joint that has three or more forces
  const polys = M.nodes.map((_, i) => {
    const parts = polygonAt(M, res, i);
    return { i, name: M.jn[i] || M.supName[i] || '', parts,
      close: V.len(parts.reduce((acc, p) => V.add(acc, p.v), [0, 0])) };
  }).filter((p) => p.parts.length >= 3);

  const reactTxt = Object.keys(M.supports)
    .map((i) => `${M.supName[i]} = ${V.len(res.reactions[i]).toFixed(2)} kN`).join(' · ');

  // the two numbers that run right through the four situations
  const chordAll = (F / 2) * (L / 2) / h;
  const diagAll = Math.hypot(chordAll, F / 2);

  // scales. The form diagram shrinks only when a deep triangle would run out of
  // the top of the frame; the force diagram only when H or F outgrow its box.
  const MPU = Math.min(2.35, 8.0 / h);
  const FX0 = FCX - (L * MPU) / 2;
  const SFD = Math.max(4.0, H / 7.5, F / 15.0);
  let pmax = 1e-6;
  for (const p of polys) {
    const pts = chain([0, 0], p.parts, 1);
    const xs = pts.map((q) => q[0]), ys = pts.map((q) => q[1]);
    pmax = Math.max(pmax, Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
  }
  const SFP = Math.max(pmax / 6.0, 5.0);
  // where to push a label so it lands OUTSIDE its diagram
  const fc = M.nodes.reduce((a, p) => V.add(a, p), [0, 0]);
  const formC = V.mul(fc, 1 / M.nodes.length);
  const kp = Object.values(K.pts);
  const forceC = V.mul(kp.reduce((a, p) => V.add(a, p), [0, 0]), 1 / kp.length);

  return { sit, name: M.name, L, h, F, M, res, mem, H, K, polys, reactTxt,
           nn: M.nodes.length, nm: M.members.length, np: polys.length,
           resid: res.resid, MPU, FX0, SFD, SFP, formC, forceC,
           diagAll, chordAll, postAll: F,
           Nmax: Math.max(...mem.map((m) => Math.abs(m.N))) };
}

// ------------------------------------------------------------------ steps --

const CARRY = [
  'the whole exercise in miniature: an arch that would push its supports apart, and a tie along the bottom that stops it. The tie swallows the thrust, so both reactions stay vertical',
  'the triangle has only been turned over. Every magnitude is the same as in situation 1 and every sign is reversed — the arch became a cable, the tie a strut. Members 4 and 5 are only posts',
  'one support instead of two. The load halves and moves out to the free ends; the diagonals and the chord carry exactly what they did in situation 1, but the single reaction takes all 60 kN',
  'close the bracket up and it is a truss: tension diagonals, compression chords, and a fifth member under the apex that no earlier situation had — a post driving the whole load into the support',
];

const STEPS = [
  { t: 'The exercise',
    d: 'EX X task 12: “Draw the corresponding force diagram for the given situations. Colour tension forces red, compression forces blue and the external forces green.” Four situations, one structure',
    take: 'the key draws all four force diagrams and prints not one number. Everything you are about to read is derived here' },
  { t: 'The structure',
    d: (d) => `situation ${d.sit} of 4 — ${d.name}. The same triangle every time: ${d.L.toFixed(2)} m span, ${d.h.toFixed(2)} m deep. Only the supports and the point where the load lands are different`,
    detail: (d) => [`span ${d.L.toFixed(2)} m · depth ${d.h.toFixed(2)} m · diagonals ${Math.hypot(d.L / 2, d.h).toFixed(3)} m at ${(Math.atan2(d.h, d.L / 2) * 180 / Math.PI).toFixed(2)}° · ${d.nn} joints, ${d.nm} members, ${d.F.toFixed(1)} kN in total`],
    take: 'digitised at 1:100 the sheet gives 5.998 by 2.999 m, i.e. 6.00 by 3.00 and diagonals at exactly 45°' },
  { t: 'The reactions',
    d: (d) => (d.sit <= 2
      ? 'two supports and a symmetric vertical load, so each takes half. The chord between them swallows the horizontal thrust, which is why neither reaction leans'
      : 'one support only. It has to take the whole load — and because the two loads are symmetric about it, it takes it vertically'),
    detail: (d) => [`${d.reactTxt} — they sum to ${d.F.toFixed(2)} kN = the applied load ✓`,
                    'no horizontal reaction anywhere: the thrust stays inside the structure'] },
  { t: 'The load line',
    d: 'the force diagram starts with the external forces alone, laid tip to tail down one vertical line: the loads downwards, the reactions upwards, closing the line back on itself',
    detail: (d) => d.K.ext.map((e) => `${e.n} = ${e.v.toFixed(2)} kN`),
    take: 'the line closes, so the structure as a whole is in equilibrium before a single member has been drawn' },
  { t: 'Closing every joint',
    d: 'now the members. Every ray is drawn parallel to its member, and the joints are taken in an order that leaves only two unknowns at a time; the pole falls out on its own, and with it the thrust',
    detail: (d) => [`H = (F/2)·(b/h) = ${(d.F / 2).toFixed(1)}·${(d.L / 2).toFixed(2)}/${d.h.toFixed(2)} = ${d.H.toFixed(2)} kN · screen scale 1 unit ≙ ${d.SFD.toFixed(2)} kN`],
    take: 'hover any member and its ray lights up with it — that pairing is the whole subject of the page' },
  { t: 'The member forces',
    d: 'read straight off the diagram: the length of a ray is the force, and the direction in which the joint polygon runs says whether the member pulls (red) or pushes (blue)',
    detail: (d) => [d.mem.map((m) => `${m.no}: ${Math.abs(m.N).toFixed(2)} ${m.zero ? '0' : m.tension ? 'T' : 'C'}`).join(' · ') + ' kN',
                    `largest force in this situation: ${d.Nmax.toFixed(2)} kN (T = tension, C = compression)`] },
  { t: 'Joint by joint',
    d: 'the check the sheet calls “subsystem”: every joint drawn on its own with only the forces that act on it. Each polygon closes — that, and not the picture, is the proof',
    detail: (d) => [d.polys.map((p) => `${p.name}: ${p.parts.length} forces`).join(' · ')
                    + ` — each closes to ${Math.max(...d.polys.map((p) => p.close)).toExponential(1)} kN`],
    take: 'the closure residual is machine zero at every joint of all four situations' },
  { t: 'What carried over',
    d: (d) => CARRY[d.sit - 1],
    detail: (d) => [`diagonals ${d.diagAll.toFixed(2)} kN and chords ${d.chordAll.toFixed(2)} kN in all four situations`,
                    `situation 4's post: ${d.postAll.toFixed(2)} kN — new, and the biggest force on the page`],
    take: 'drag `situation` back and forth: the two magnitudes never move. Only their signs, the reactions and the member count do' },
];

// ------------------------------------------------------------------- view --

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const fx = (p, d) => [d.FX0 + p[0] * d.MPU, FY0 + p[1] * d.MPU];  // form diagram
  const kxc = (d) => (d.sit >= 3 ? KX4 : KX);                        // load line, per case
  const kx = (p, d) => [kxc(d) + p[0] / d.SFD, KY + p[1] / d.SFD];   // force diagram

  const SOLVED = 5;                     // the step at which the signs are known

  /** A label position beside the segment a-b, on the side away from `c`. */
  function outward(a, b, c, off) {
    const mid = V.mid(a, b);
    let n = V.perp(V.unit(V.sub(b, a)));
    if (V.dot(n, V.sub(mid, c)) < 0) n = V.mul(n, -1);
    if (V.len(V.sub(mid, c)) < 1e-6) n = [0, 1];
    return V.add(mid, V.mul(n, off));
  }

  const MCOL = (i) => ({
    pending: PAL.black,
    final: (dd, st) => (!dd || i >= dd.nm ? PAL.grey
      : st._k < SOLVED ? PAL.grey
      : dd.mem[i].zero ? PAL.zero : dd.mem[i].tension ? PAL.red : PAL.blue),
  });
  const RCOL = (i) => ({
    pending: PAL.black,
    final: (dd, st) => (!dd || i >= dd.nm ? PAL.grey
      : st._k < SOLVED ? PAL.black
      : dd.mem[i].zero ? PAL.zero : dd.mem[i].tension ? PAL.red : PAL.blue),
  });
  const hasM = (i) => (st, dd) => !!dd && i < dd.nm;
  const hasN = (i) => (st, dd) => !!dd && i < dd.nn;
  const isSup = (i) => (st, dd) => !!dd && !!dd.M.supports[i];
  const isLoad = (i) => (st, dd) => !!dd && !!dd.M.loads[i];
  const hasP = (j) => (st, dd) => !!st.joints && !!dd && j < dd.np;

  function partCol(dd, j, e) {
    const p = dd.polys[j] && dd.polys[j].parts[e];
    if (!p) return PAL.grey;
    if (p.kind !== 'member') return PAL.green;
    const m = dd.mem[p.m];
    return m.zero ? PAL.zero : m.tension ? PAL.red : PAL.blue;
  }

  dw.label('t_form', 'form diagram 1:100', { cls: 'title', flash: false });
  dw.label('t_force', 'force diagram 1 cm ≙ 10 kN', { cls: 'title', flash: false });
  dw.label('t_sub', 'subsystem — each joint alone', { cls: 'title', flash: false,
    intro: 6, when: (st) => st.joints });
  dw.label('t_case', '', { cls: 'point', flash: false });

  // ---- form diagram
  for (let i = 0; i < NMEM; i++) {
    dw.seg(`m${i}`, { intro: 1, w: dw.W.bar, color: MCOL(i), when: hasM(i) });
    dw.label(`lm${i}`, '', { cls: 'num', intro: 1, color: MCOL(i),
      when: (st, dd) => !!st.lbl && hasM(i)(st, dd) });
  }
  for (let i = 0; i < NNODE; i++) {
    dw.disk(`nd${i}`, { intro: 1, r: dw.W.disk, when: hasN(i) });
    dw.label(`lnd${i}`, '', { cls: 'num', intro: 1,
      when: (st, dd) => !!st.lbl && hasN(i)(st, dd) });
    dw.strokes(`hat${i}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false,
      when: isSup(i) });
    dw.arrow(`re${i}`, { intro: 2, color: PAL.green, ...NARR, when: isSup(i) });
    dw.label(`lre${i}`, '', { cls: 'num', intro: 2, color: PAL.green, when: isSup(i) });
    dw.arrow(`ld${i}`, { intro: 1, color: PAL.green, ...ARR, when: isLoad(i) });
    dw.label(`lld${i}`, '', { cls: 'num', intro: 1, color: PAL.green, when: isLoad(i) });
    dw.dashLine(`ax${i}`, { intro: 1, color: PAL.grey, dash: dw.W.dash, when: isLoad(i) });
  }

  // ---- force diagram: the load line first, then the rays
  for (let e = 0; e < 3; e++) {
    dw.arrow(`fe${e}`, { intro: 3, color: PAL.green, ...NARR,
      when: (st, dd) => !!dd && e < dd.K.ext.length });
    dw.label(`lfe${e}`, '', { cls: 'num', intro: 3, color: PAL.green,
      when: (st, dd) => !!st.lbl && !!dd && e < dd.K.ext.length });
  }
  for (let i = 0; i < NMEM; i++) {
    dw.seg(`r${i}`, { intro: 4, w: dw.W.ray, color: RCOL(i), when: hasM(i) });
    dw.label(`lr${i}`, '', { cls: 'num', intro: 4, color: RCOL(i),
      when: (st, dd) => !!st.lbl && hasM(i)(st, dd) });
    dw.link(`m${i}`, `r${i}`, `lm${i}`, `lr${i}`);
  }
  dw.disk('pole', { intro: 4, r: dw.W.disk * 0.8 });
  dw.label('lpole', '', { cls: 'num', intro: 4, color: PAL.grey, when: (st) => st.lbl });
  dw.seg('dimH', { intro: 4, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('ldimH', '', { intro: 4, flash: false, color: PAL.grey });

  // ---- the subsystem row: one closed polygon per three-force joint
  for (let j = 0; j < NPOLY; j++) {
    dw.circle(`jc${j}`, { intro: 6, color: PAL.grey, when: hasP(j) });
    dw.label(`jl${j}`, '', { cls: 'num', intro: 6, flash: false, when: hasP(j) });
    for (let e = 0; e < 5; e++) {
      dw.arrow(`jp${j}_${e}`, { intro: 6, ...NARR, flash: false,
        color: { pending: PAL.black, final: (dd) => partCol(dd, j, e) },
        when: (st, dd) => hasP(j)(st, dd) && e < dd.polys[j].parts.length });
    }
  }

  dw.instant('t_form', 't_force', 't_sub', 't_case');
  dw.ghostable('fe0', 'fe1', 'fe2');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    const M = d.M;
    const solved = s._k >= SOLVED;

    dw.setLabel('t_form', [FCX, -7.6]);
    dw.setLabel('t_force', [kxc(d), -7.6]);
    dw.setLabel('t_sub', [16.0, -10.4]);
    dw.setLabel('t_case', [FCX + 4, 15.4]);
    dw.setText('t_case', `situation ${d.sit} of 4 — ${d.name}`);

    // --- form diagram
    for (let i = 0; i < NMEM; i++) {
      if (i >= d.nm) { dw.setSeg(`m${i}`, [0, 0], [0, 0]); dw.setText(`lm${i}`, ''); continue; }
      const m = d.mem[i];
      const a = fx(m.a, d), b = fx(m.b, d);
      dw.setSeg(`m${i}`, a, b);
      dw.setLabel(`lm${i}`, outward(a, b, fx(d.formC, d), 1.7));
      dw.setText(`lm${i}`, solved ? `${m.no}: ${Math.abs(m.N).toFixed(2)}` : m.no);
    }
    for (let i = 0; i < NNODE; i++) {
      if (i >= d.nn) continue;
      const p = fx(M.nodes[i], d);
      dw.setDisk(`nd${i}`, p);
      dw.setText(`lnd${i}`, M.jn[i]);
      const away = V.sub(M.nodes[i], d.formC);
      const sgn = away[0] > 1e-9 ? 1 : -1;
      let dir = away;
      if (Math.abs(dir[0]) < 1e-9) dir = [1, dir[1] >= 0 ? 1 : -1];
      dw.setLabel(`lnd${i}`, V.add(p, M.supports[i] ? [sgn * 2.6, 1.3]
        : V.mul(V.unit(dir), 2.2)));
      if (M.supports[i]) {
        dw.setStrokes(`hat${i}`, V.hatch([p[0] - 1.7, p[1] - 0.55],
                                         [p[0] + 1.7, p[1] - 0.55], -1, 0.95, 5));
        dw.setArrow(`re${i}`, [p[0], p[1] - 5.6], [p[0], p[1] - 1.0]);
        const out = M.nodes[i][0] < SPAN / 2 ? -2.9 : (M.nodes[i][0] > SPAN / 2 ? 2.9 : -2.9);
        dw.setLabel(`lre${i}`, [p[0] + out, p[1] - 3.8]);
        dw.setText(`lre${i}`, `${M.supName[i]} = ${V.len(d.res.reactions[i]).toFixed(2)}`);
      } else {
        dw.setStrokes(`hat${i}`, [[p, p], [p, p], [p, p], [p, p], [p, p]]);
        dw.setArrow(`re${i}`, p, p); dw.setText(`lre${i}`, '');
      }
      if (M.loads[i]) {
        const mag = Math.abs(M.loads[i][1]);
        const lo = (M.nodes[i][0] - d.formC[0] < -1e-9 ? -1 : 1) * 4.4;
        if (M.loadOut) {
          dw.setArrow(`ld${i}`, p, [p[0], p[1] - 5.2]);
          dw.setLabel(`lld${i}`, [p[0] + 4.4, p[1] - 3.4]);
          dw.setDashLine(`ax${i}`, [[p[0], p[1] - 6.8], [p[0], p[1] + 2.4]]);
        } else {
          dw.setArrow(`ld${i}`, [p[0], p[1] + 5.6], p);
          dw.setLabel(`lld${i}`, [p[0] + lo, p[1] + 4.2]);
          dw.setDashLine(`ax${i}`, [[p[0], p[1] + 7.2], [p[0], p[1] - 1.8]]);
        }
        dw.setText(`lld${i}`, `${M.loadName[i]} = ${mag.toFixed(1)} kN`);
      } else {
        dw.setArrow(`ld${i}`, p, p); dw.setText(`lld${i}`, '');
        dw.setDashLine(`ax${i}`, [p, p]);
      }
    }

    // --- force diagram
    d.K.ext.forEach((e, k) => {
      const t = kx(e.t, d), hh = kx(e.h, d);
      dw.setArrow(`fe${k}`, t, hh);
      dw.setLabel(`lfe${k}`, V.add(V.mid(t, hh), [d.sit <= 2 ? 3.2 : -3.8, 0]));
      dw.setText(`lfe${k}`, `${e.n} = ${e.v.toFixed(2)}`);
    });
    for (let k = d.K.ext.length; k < 3; k++) {
      dw.setArrow(`fe${k}`, [kxc(d), KY], [kxc(d), KY]); dw.setText(`lfe${k}`, '');
    }
    for (let i = 0; i < NMEM; i++) {
      if (i >= d.nm) { dw.setSeg(`r${i}`, [0, 0], [0, 0]); dw.setText(`lr${i}`, ''); continue; }
      const ray = d.K.rays.find((r) => r.no === String(i + 1));
      const a = kx(ray.p, d), b = kx(ray.q, d);
      dw.setSeg(`r${i}`, a, b);
      dw.setLabel(`lr${i}`, outward(a, b, kx(d.forceC, d), 1.5));
      dw.setText(`lr${i}`, solved ? `${ray.no}: ${Math.abs(d.mem[i].N).toFixed(2)}` : ray.no);
    }
    const pol = kx(d.K.pole, d);
    dw.setDisk('pole', pol);
    dw.setLabel('lpole', V.add(pol, [d.sit <= 2 ? -1.6 : 1.6, 1.0]));
    dw.setText('lpole', d.sit === 4 ? '' : 'o');
    const hy = KY + (d.F / 2) / d.SFD + 2.4;
    dw.setSeg('dimH', [kxc(d), hy], [pol[0], hy]);
    dw.setLabel('ldimH', [(kxc(d) + pol[0]) / 2, hy + 1.3]);
    dw.setText('ldimH', `H = ${d.H.toFixed(2)} kN`);

    // --- subsystem row
    for (let j = 0; j < NPOLY; j++) {
      if (j >= d.np) {
        dw.setCircle(`jc${j}`, [JX[j], JY], 0.001); dw.setText(`jl${j}`, '');
        for (let e = 0; e < 5; e++) dw.setArrow(`jp${j}_${e}`, [JX[j], JY], [JX[j], JY]);
        continue;
      }
      const P = d.polys[j];
      const raw = chain([0, 0], P.parts, 1 / d.SFP);
      const xs = raw.map((q) => q[0]), ys = raw.map((q) => q[1]);
      const o = [JX[j] - (Math.max(...xs) + Math.min(...xs)) / 2,
                 JY - (Math.max(...ys) + Math.min(...ys)) / 2];
      const pts = raw.map((q) => V.add(q, o));
      for (let e = 0; e < 5; e++) {
        if (e < P.parts.length) dw.setArrow(`jp${j}_${e}`, pts[e], pts[e + 1]);
        else dw.setArrow(`jp${j}_${e}`, [JX[j], JY], [JX[j], JY]);
      }
      dw.setCircle(`jc${j}`, [JX[j], JY], 0.4);
      dw.setLabel(`jl${j}`, [JX[j], JY - 4.2]);
      dw.setText(`jl${j}`, `joint ${P.name}`);
    }

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const w = panel.section('The four situations');
  panel.slider(w, s, 'sit', 'situation', 1, 4, 1, refresh,
    (v) => `${v} — ${NAMES[Math.round(v) - 1]}`);
  panel.toggle(w, s, 'joints', 'subsystem — every joint’s own polygon', refresh);
  panel.toggle(w, s, 'lbl', 'show labels', refresh);
  const g = panel.section('Given');
  panel.slider(g, s, 'F', 'total load F (kN)', 10, 120, 5, refresh,
    (v) => `${v.toFixed(0)} kN`);
  panel.slider(g, s, 'h', 'depth h (m)', 1.0, 6.0, 0.1, refresh,
    (v) => `${v.toFixed(2)} m`);

  refresh();
  return player;
}
