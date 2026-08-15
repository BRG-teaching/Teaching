/**
 * EX X · Task 14.1 a) + b) and Task 14.2 — superposition of two arch-cable structures
 * Structural Design I, HS 22, sheet EX X "Additional Exercises", page 14.
 *
 * TEXT (verbatim, English sheet).
 *   14.1 "Span and cantilever. Design the form of a possible arch-cable
 *         structure for the given loading case with the means of graphic
 *         statics. Draw tension forces in red, compression forces in blue and
 *         reaction forces in green."   a) F1 and F2 between the supports;
 *         b) a single F3 outside them.
 *   14.2 "Combination of two arch-cable structures. Transfer your geometry of
 *         your solutions from task 14.1 a) by superimposing the form diagrams
 *         of a) and b) into one arch-cable structure. Draw the corresponding
 *         force diagram. Indicate the direction of the support forces. Draw the
 *         tension forces in red, compression forces in blue and reaction forces
 *         in green."
 *
 * TWO WORDING SLIPS IN THE ENGLISH SHEET (both carried in a step caption):
 *   - 14.2 says "your solutions from task 14.1 a)" where it means a) AND b).
 *     The German is right: "die Geometrie ihrer Tragwerke aus Aufgabe 14.1".
 *   - the German 14.1 also asks for the direction of the support forces; the
 *     English drops that sentence from 14.1 and only keeps it in 14.2.
 * Neither changes an answer. No numerical error was found on this page.
 *
 * GIVENS. F1 = 60 kN, F2 = 30 kN, F3 = 30 kN, all vertical and downward.
 * A = pin (left), B = roller (right). Form diagram 1:100, force diagram
 * 1 cm ≙ 10 kN. The sheet prints NO numbers at all — every figure below is
 * derived here and only then compared with the drawn key.
 *
 * GEOMETRY. Origin = support A (the apex of the left support triangle), x to
 * the right, y up. Digitised from the task page with
 *     web/tools/sheetvec.py .../task-en.pdf 14 --scale 100 --min 0.2 --cluster
 * All three sub-figures sit on the same vertical lines:
 *     A 6.687 · F1 7.687 · F2 9.187 · B 12.685 · F3 14.185   (sheetvec x, m)
 * i.e., relative to A:  F1 1.000 · F2 2.500 · B 5.998 · F3 7.498 m — round to
 * 2 mm at 1:100, which validates the scale. This view uses the intended
 * 1.00 / 2.50 / 6.00 / 7.50 m. A and B are at the same height in all three.
 *
 * REACTIONS. Both supports come out VERTICAL: the roller B takes no horizontal
 * force, and at the pin A the horizontal pull of the tie exactly cancels the
 * horizontal push of the arch, leaving the pin nothing to do sideways.
 *     a)    B = (60·1.00 + 30·2.50)/6 = 22.5 ↑     A = 90 − 22.5 = 67.5 ↑
 *     b)    B = (30·7.50)/6 = 37.5 ↑               A = 30 − 37.5 = −7.5 → 7.5 ↓
 *     14.2  A = 67.5 − 7.5 = 60.0 ↑                B = 22.5 + 37.5 = 60.0 ↑
 *           direct check: B = (60·1 + 30·2.5 + 30·7.5)/6 = 360/6 = 60 ✓
 *
 * "A POSSIBLE STRUCTURE" = ONE FREE PARAMETER EACH, and it is the horizontal
 * thrust. With vertical loads every member of one chain carries the same
 * horizontal component H and each node needs H·(m_left − m_right) = F, so
 *     a)  y_I = 67.50/H_a · y_II = 78.75/H_a   (and the chain closes on B)
 *         1 = √(H_a²+67.5²) C · 2 = √(H_a²+7.5²) C · 4 = √(H_a²+22.5²) C
 *         3 = H_a T  — the TIE between the supports
 *     b)  the triangle A–B–T:  H_b·y_T = 56.25  → y_T = 56.25/H_b
 *         1 = √(H_b²+7.5²) T (tie A→T) · 2 = √(H_b²+37.5²) C (strut B→T)
 *         3 = H_b C  — a STRUT between the supports, the opposite sign to a)
 *
 * 14.2 BY SUPERPOSITION. Keep both geometries so that both equilibrium states
 * live on the same members, and add them. Members 1, 2, 3 (= a)'s 1, 2, 4) keep
 * a)'s forces, members 4 and 6 (= b)'s 1, 2) keep b)'s, and only member 5 is
 * shared:  N5 = (a)'s tie) + (b)'s strut) = H_a − H_b, tension if H_a > H_b.
 * Node checks, valid for EVERY pair of thrusts:
 *     A:  ΣH = −H_a + H_b + (H_a−H_b) = 0     ΣV = −67.5 + 7.5 + 60 = 0
 *     B:  ΣH = +H_a − H_b − (H_a−H_b) = 0     ΣV = −22.5 − 37.5 + 60 = 0
 * so the combination closes whatever the reader chooses — which is exactly why
 * "a possible structure" is allowed to be free.
 *
 * THE FORCE DIAGRAM OF THE COMBINATION IS THE TWO FORCE DIAGRAMS STACKED.
 * Load line vertical, measured DOWN from its top q0 = 0:
 *     q0 = 0 · q1 = −F1 · q2 = −(F1+F2) · q3 = −(F1+F2+F3) · i = −A_total
 *     A = i→q0 (up) · F1 = q0→q1 · F2 = q1→q2 · F3 = q2→q3 · B = q3→i (up)
 *     left pole   O1 = (−H_a, −67.5)          ← a)'s pole, not moved at all
 *     right pole  O2 = (+H_b, −82.5)          ← b)'s pole, only slid down 82.5
 *     vertex      V  = (−(H_a−H_b), i)
 *     rays  1: O1–q0 · 2: O1–q1 · 3: O1–q2 · 4: O1–V and q2–O2
 *           5: V–i (horizontal, length H_a − H_b) · 6: q3–O2
 *           V–O2 closes node B and is parallel to member 3
 * Both fans keep their shape AND their pole distance. The merge only (i) stacks
 * F3 under F2 on one load line, (ii) adds the reactions 67.5 − 7.5 = 60 and
 * 22.5 + 37.5 = 60, and (iii) shortens the one horizontal ray from H_a to
 * H_a − H_b. Nothing else in either diagram moves — that is the whole lesson.
 *
 * THE OFFICIAL KEY, digitised from solution-en.pdf page 14 (--scale 100), draws
 * pole distances of 3.692 cm and 2.308 cm, i.e. it CHOSE H_a = 36.92 kN and
 * H_b = 23.08 kN (the defaults here). At those thrusts the key's drawing and
 * this derivation agree everywhere, to the accuracy a drawing can carry:
 *     a)  A 67.46 / B 22.50 · 1..4 = 76.91 / 37.67 / 36.92 / 43.24 kN
 *         nodes I (1.000, 1.826) II (2.499, 2.131)      here 1.828 / 2.133
 *     b)  A 7.50 ↓ / B 37.48 ↑ · 1..3 = 24.27 / 44.02 / 23.08 kN
 *         node T (7.498, 2.435)                          here 2.437
 *    14.2 A 59.97 / B 59.97 · 1..6 = 76.91 / 37.67 / 43.24 / 24.27 / 13.84 /
 *         44.02 kN — and 13.84 = 36.92 − 23.08 exactly.
 *         The key even breaks member 4 where it crosses member 3, at
 *         (3.912, 1.270); computed from the two node sets: (3.913, 1.272).
 * NO DISAGREEMENT with the key anywhere on this page.
 *
 * JOINT NAMES. The key relabels its joints in every sub-figure (a: III=A,
 * IV=B, I on F1, II on F2 — b: II=A, III=B, I on F3). This view uses one
 * consistent set instead: A and B for the supports, I on F1, II on F2, T for
 * the cantilever tip.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

// ---------------------------------------------------------------- geometry --
const XF1 = 1.00, XF2 = 2.50, XB = 6.00, XF3 = 7.50;   // metres, from A

// ------------------------------------------------------------------ layout --
const MPU = 2.8;                      // drawing units per metre (form diagram)
const ORG = [-25.5, -5.6];            // support level of the form diagram
const SFD = 4.5;                      // kN per drawing unit (force diagram)
const KORG = [13.5, 10.5];            // q0, the top of the load line
const KOFF = 0.62;                    // reactions on their own offset line
// where each member's label sits: [fraction along, side of the perpendicular]
const LABPOS = [[0.45, 1], [0.50, -1], [0.80, 1], [0.26, -1], [0.50, -1], [0.62, -1]];
const JOFF = { A: [-1.5, 0.2], B: [1.5, 0.2], I: [-1.5, 0.9], II: [0.7, 1.5], T: [1.5, 0.9] };
const RLABT = [0.42, 0.62, 0.36, 0.55, 0.28, 0.55];   // where a ray's number sits
const KSHIFT = [0, -45, 0];           // keeps each part's force diagram centred

const fm = (x, y) => [ORG[0] + x * MPU, ORG[1] + y * MPU];
const fkOf = (stage) => (p) =>
  [KORG[0] + p[0] / SFD, KORG[1] + (p[1] + KSHIFT[stage]) / SFD];

// slots, constant across all three parts so that form <-> force counterparts
// never change partner:  0 A–I · 1 I–II · 2 II–B · 3 A–T · 4 A–B · 5 B–T
const SLOTS = [['A', 'I'], ['I', 'II'], ['II', 'B'], ['A', 'T'], ['A', 'B'], ['B', 'T']];
const NUM = [                          // the member number the sheet prints
  { 0: 1, 1: 2, 2: 4, 4: 3 },          // a)
  { 3: 1, 4: 3, 5: 2 },                // b)
  { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6 }, // 14.2
];

const PART = ['14.1 a)  span', '14.1 b)  cantilever', '14.2  a) + b) combined'];
const STAGE_AT = [0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2];   // which part each step is about
const FIRST_OF = [1, 5, 8];                            // ... and the reverse

const DEFAULTS = {
  F1: 60, F2: 30, F3: 30,
  Ha: 36.92, Hb: 23.08,
  comp: true, lbl: true,
  stage: 0, _k: 0,
};

// ----------------------------------------------------------------- compute --
function compute(s) {
  const stage = Math.round(s.stage);
  const { F1, F2, F3, Ha, Hb } = s;

  // a) alone -----------------------------------------------------------------
  const Ba = (F1 * XF1 + F2 * XF2) / XB;      // 22.5
  const Aa = F1 + F2 - Ba;                    // 67.5
  const yI = (Aa * XF1) / Ha;
  const yII = yI + ((Aa - F1) * (XF2 - XF1)) / Ha;
  const closeA = yII + ((Aa - F1 - F2) * (XB - XF2)) / Ha;   // must be 0
  // b) alone -----------------------------------------------------------------
  const Bb = (F3 * XF3) / XB;                 // 37.5
  const Ab = F3 - Bb;                         // −7.5, i.e. downward
  const yT = (-Ab * XF3) / Hb;
  const closeB = (Hb * yT) / (XF3 - XB) - Bb;                // must be 0
  // combined -----------------------------------------------------------------
  const Atot = Aa + Ab, Btot = Ba + Bb;
  const N5 = Ha - Hb;

  const nodes = { A: [0, 0], B: [XB, 0], I: [XF1, yI], II: [XF2, yII], T: [XF3, yT] };
  // where member 4 (A→T) crosses member 3 (II→B), the way the key draws it
  const mT = yT / XF3, m3 = -yII / (XB - XF2);
  const xc = (yII - m3 * XF2) / (mT - m3);
  const cross = [xc, mT * xc];

  // member table: one entry per slot, null when the part does not use it ------
  const mem = SLOTS.map(() => null);
  const put = (k, N, tension) => {
    const [a, b] = SLOTS[k];
    mem[k] = { p: nodes[a], q: nodes[b], N, tension, num: NUM[stage][k] };
  };
  if (stage === 0) {
    put(0, Math.hypot(Ha, Aa), false);
    put(1, Math.hypot(Ha, Aa - F1), false);
    put(2, Math.hypot(Ha, Aa - F1 - F2), false);
    put(4, Ha, true);
  } else if (stage === 1) {
    put(3, Math.hypot(Hb, -Ab), true);
    put(5, Math.hypot(Hb, Bb), false);
    put(4, Hb, false);
  } else {
    put(0, Math.hypot(Ha, Aa), false);
    put(1, Math.hypot(Ha, Aa - F1), false);
    put(2, Math.hypot(Ha, Aa - F1 - F2), false);
    put(3, Math.hypot(Hb, -Ab), true);
    put(4, Math.abs(N5), N5 >= 0);
    put(5, Math.hypot(Hb, Bb), false);
  }

  // force diagram, in kN, measured DOWN from the top of the load line --------
  const ray = SLOTS.map(() => null);
  let dup = [null, null];                    // ray6 (slot 3) and ray7 (slot 2)
  let loads = [], reacs = [], poles = [], comp = [];
  const q = (v) => [0, v];
  if (stage === 0) {
    const q0 = q(0), q1 = q(-F1), q2 = q(-F1 - F2), ia = q(-Aa);
    const O = [-Ha, -Aa];
    ray[0] = [O, q0]; ray[1] = [O, q1]; ray[2] = [O, q2]; ray[4] = [O, ia];
    loads = [['F1', q0, q1], ['F2', q1, q2]];
    reacs = [['A', ia, q0], ['B', q2, ia]];
    poles = [['o', O]];
  } else if (stage === 1) {
    const r0 = q(0), r1 = q(Ab), r2 = q(Ab - F3);
    const O = [Hb, 0];
    ray[3] = [O, r1]; ray[4] = [O, r0]; ray[5] = [O, r2];
    loads = [['A', r0, r1], ['F3', r1, r2]];
    reacs = [['B', r2, r0]];
    poles = [['o', O]];
  } else {
    const q0 = q(0), q1 = q(-F1), q2 = q(-F1 - F2), q3 = q(-F1 - F2 - F3);
    const ip = q(-Atot);
    const O1 = [-Ha, -Aa];
    const O2 = [Hb, -(F1 + F2 + F3) + Bb];
    const Vp = [-Ha + Hb, -Atot];
    ray[0] = [O1, q0]; ray[1] = [O1, q1]; ray[2] = [O1, q2];
    ray[3] = [O1, Vp]; ray[4] = [Vp, ip]; ray[5] = [q3, O2];
    dup = [[q2, O2], [Vp, O2]];
    loads = [['F1', q0, q1], ['F2', q1, q2], ['F3', q2, q3]];
    reacs = [['A', ip, q0], ['B', q3, ip]];
    poles = [['o₁', O1], ['o₂', O2]];
    // the two component diagrams, exactly where superposition puts them:
    // a)'s tie ray and b)'s strut ray, the only two lines the merge changes
    comp = [['a) tie  ' + Ha.toFixed(2), [O1, q(-Aa)], true],
            ['b) strut  ' + Hb.toFixed(2), [O2, q(-(F1 + F2 + F3) + Bb)], false]];
  }

  return {
    stage, F1, F2, F3, Ha, Hb,
    Aa, Ba, Ab, Bb, Atot, Btot, N5,
    yI, yII, yT, closeA, closeB, cross, nodes, mem,
    ray, dup, loads, reacs, poles, comp,
    A: stage === 0 ? Aa : stage === 1 ? Ab : Atot,
    B: stage === 0 ? Ba : stage === 1 ? Bb : Btot,
    lbl: s.lbl,
  };
}

// ------------------------------------------------------------------- steps --
const STEPS = [
  { t: 'The exercise',
    d: 'page 14 asks for two arch-cable structures on the same two supports — one for a pair of loads between them, one for a single load hanging past the right-hand one — and then asks you to lay the two on top of each other and carry all three loads at once. Six metres of span, one and a half metres of overhang' },

  { t: 'a) What is given', d: 'two vertical loads between a pin at A and a roller at B. Nothing else: the shape is yours to invent, which is what "design a possible arch-cable structure" means',
    detail: (d) => [`F1 = ${d.F1.toFixed(0)} kN at ${XF1.toFixed(2)} m · F2 = ${d.F2.toFixed(0)} kN at ${XF2.toFixed(2)} m`,
                    `span A–B = ${XB.toFixed(2)} m, both supports at the same level`,
                    'digitised from the sheet at 1:100; the four stations come out round to 2 mm'] },

  { t: 'a) The reactions come first', d: 'they do not depend on the shape at all. The roller cannot push sideways, and at the pin the tie will pull exactly as hard as the arch pushes — so both reactions are vertical and one moment equation settles them',
    detail: (d) => [`ΣM about A:  B × ${XB.toFixed(2)} = ${d.F1.toFixed(0)}×${XF1.toFixed(2)} + ${d.F2.toFixed(0)}×${XF2.toFixed(2)} = ${(d.F1 * XF1 + d.F2 * XF2).toFixed(2)} kNm  →  B = ${d.Ba.toFixed(2)} kN ↑`,
                    `ΣV:  A = ${(d.F1 + d.F2).toFixed(0)} − ${d.Ba.toFixed(2)} = ${d.Aa.toFixed(2)} kN ↑`,
                    'no shape has been chosen yet and these two numbers are already fixed'],
    take: 'reactions before form — always, and here it is what makes the free choice free' },

  { t: 'a) Choose the thrust, get the form', d: 'the one thing left to choose is how hard the structure pushes sideways. Every segment carries the same horizontal force H, so each node just needs its vertical shear divided by H to know its slope. Drag H and watch the arch flatten while the reactions do not move',
    detail: (d) => [`H_a = ${d.Ha.toFixed(2)} kN  →  y_I = ${d.Aa.toFixed(2)}×${XF1.toFixed(2)}/H = ${d.yI.toFixed(3)} m · y_II = ${d.yII.toFixed(3)} m`,
                    `and the chain lands back on B: closure error ${d.closeA.toExponential(1)} m`,
                    `members  1 ${Math.hypot(d.Ha, d.Aa).toFixed(2)} C · 2 ${Math.hypot(d.Ha, d.Aa - d.F1).toFixed(2)} C · 4 ${Math.hypot(d.Ha, d.Aa - d.F1 - d.F2).toFixed(2)} C · tie 3 ${d.Ha.toFixed(2)} T`],
    take: 'the tie between the supports is what lets both reactions stay vertical' },

  { t: 'a) The force diagram', d: 'one pole to the left of the load line, one ray per member. The pole sits H to the left and level with the split between A and B, so the ray to that split is horizontal — that is the tie, and its length IS the thrust',
    detail: (d) => [`load line ${(d.F1 + d.F2).toFixed(0)} kN, split ${d.Aa.toFixed(2)} above / ${d.Ba.toFixed(2)} below`,
                    `pole distance ${d.Ha.toFixed(2)} kN — the same H that drew the form`,
                    'hover any member: its ray lights up with it'] },

  { t: 'b) A load past the support', d: 'same two supports, one load — but now outside the span. Everything about the structure changes: it is a cantilever hung off the right-hand support and held down at the left one',
    detail: (d) => [`F3 = ${d.F3.toFixed(0)} kN at ${XF3.toFixed(2)} m, i.e. ${(XF3 - XB).toFixed(2)} m beyond B`,
                    'three members and three joints: a triangle A–B–T'] },

  { t: 'b) A now pulls DOWN', d: 'take moments about A again. B has to lift more than the whole load, and the surplus has to be held down — so the pin at A is in tension. That sign change is the reason 14.2 works',
    detail: (d) => [`ΣM about A:  B × ${XB.toFixed(2)} = ${d.F3.toFixed(0)} × ${XF3.toFixed(2)} = ${(d.F3 * XF3).toFixed(2)} kNm  →  B = ${d.Bb.toFixed(2)} kN ↑`,
                    `ΣV:  A = ${d.F3.toFixed(0)} − ${d.Bb.toFixed(2)} = ${d.Ab.toFixed(2)} kN, i.e. ${Math.abs(d.Ab).toFixed(2)} kN DOWNWARD`,
                    `B alone lifts ${d.Bb.toFixed(2)} kN against a total load of only ${d.F3.toFixed(0)} kN`],
    take: 'an overhang turns the far support into a hold-down' },

  { t: 'b) The form and its force diagram', d: 'the tip is pulled back to A by a cable and propped up off B by a strut, and between the two supports there is now a STRUT, not a tie — the opposite sign to a). Its pole sits on the other side of the load line for the same reason',
    detail: (d) => [`H_b = ${d.Hb.toFixed(2)} kN  →  y_T = ${(-d.Ab).toFixed(2)}×${XF3.toFixed(2)}/H = ${d.yT.toFixed(3)} m · check at B: ${d.closeB.toExponential(1)} kN`,
                    `1 (tie A→T) ${Math.hypot(d.Hb, -d.Ab).toFixed(2)} T · 2 (strut B→T) ${Math.hypot(d.Hb, d.Bb).toFixed(2)} C · 3 (strut A–B) ${d.Hb.toFixed(2)} C`,
                    'the member between the supports has swapped from red to blue'],
    take: 'a) puts the supports in tension between them, b) puts them in compression — hold that thought' },

  { t: '14.2 Superimpose the two forms', d: 'now lay b) on top of a) without moving a single joint. Two equilibrium states on the same set of members simply add, so the combined structure carries all three loads with no new construction at all. Members 1–3 are a)’s, 4 and 6 are b)’s, and member 5 is the one they share',
    detail: (d) => [`reactions add:  A = ${d.Aa.toFixed(2)} − ${Math.abs(d.Ab).toFixed(2)} = ${d.Atot.toFixed(2)} kN ↑ · B = ${d.Ba.toFixed(2)} + ${d.Bb.toFixed(2)} = ${d.Btot.toFixed(2)} kN ↑`,
                    `direct check: B = (${d.F1.toFixed(0)}×${XF1.toFixed(2)} + ${d.F2.toFixed(0)}×${XF2.toFixed(2)} + ${d.F3.toFixed(0)}×${XF3.toFixed(2)})/${XB.toFixed(2)} = ${((d.F1 * XF1 + d.F2 * XF2 + d.F3 * XF3) / XB).toFixed(2)} kN ✓`,
                    `member 4 crosses member 3 at (${d.cross[0].toFixed(3)}, ${d.cross[1].toFixed(3)}) m — the key breaks its line there too`],
    take: 'the English sheet says "your solutions from task 14.1 a)"; it means a) AND b), as the German does' },

  { t: '14.2 The force diagram is the two, stacked', d: 'and it really is stacked, not redrawn. a)’s pole has not moved; b)’s has only slid down by B_a so that F3 falls in under F2 on one shared load line. Both fans keep their pole distance, so every member of a) and b) keeps its force',
    detail: (d) => [`one load line ${(d.F1 + d.F2 + d.F3).toFixed(0)} kN: F1, F2, F3 stacked, split ${d.Atot.toFixed(2)} / ${d.Btot.toFixed(2)}`,
                    `left pole ${d.Ha.toFixed(2)} kN from it, right pole ${d.Hb.toFixed(2)} kN — the two thrusts, unchanged`,
                    `1 ${Math.hypot(d.Ha, d.Aa).toFixed(2)} C · 2 ${Math.hypot(d.Ha, d.Aa - d.F1).toFixed(2)} C · 3 ${Math.hypot(d.Ha, d.Aa - d.F1 - d.F2).toFixed(2)} C · 4 ${Math.hypot(d.Hb, -d.Ab).toFixed(2)} T · 6 ${Math.hypot(d.Hb, d.Bb).toFixed(2)} C — all exactly as in a) and b)`],
    take: 'switch the grey component rays off and on: nothing else in either fan changes' },

  { t: '14.2 The one member that changes', d: 'only member 5 is shared, and it gets both forces at once: a)’s tie pulling one way, b)’s strut pushing the other. What is left is the difference — and if you make b) thrust harder than a), the difference goes negative and the member between the supports flips from a cable to a strut',
    detail: (d) => [`N5 = H_a − H_b = ${d.Ha.toFixed(2)} − ${d.Hb.toFixed(2)} = ${d.N5.toFixed(2)} kN ${d.N5 >= 0 ? 'TENSION' : 'COMPRESSION'}`,
                    `node A:  ΣH = −${d.Ha.toFixed(2)} + ${d.Hb.toFixed(2)} + ${d.N5.toFixed(2)} = 0 ✓   ΣV = −${d.Aa.toFixed(2)} + ${Math.abs(d.Ab).toFixed(2)} + ${d.Atot.toFixed(2)} = 0 ✓`,
                    `node B:  ΣH = +${d.Ha.toFixed(2)} − ${d.Hb.toFixed(2)} − ${d.N5.toFixed(2)} = 0 ✓   ΣV = −${d.Ba.toFixed(2)} − ${d.Bb.toFixed(2)} + ${d.Btot.toFixed(2)} = 0 ✓`],
    take: 'drag H_b past H_a and watch member 5 turn blue — the combination still closes, for every pair of thrusts' },
];

// ------------------------------------------------------------------- meta ---
export const meta = {
  title: 'EX X · 14.1 + 14.2 — two structures, added',
  subtitle: 'Structural Design I · sheet EX X “Additional Exercises”, page 14 (tasks 14.1 a, b and 14.2)',
  about: 'Two arch-cable structures on the same pair of supports: one for two loads inside the span, one for a single load hanging past the right-hand support. Each is a design, not an analysis — the only thing you choose is how hard the structure pushes sideways, and that one number draws the whole shape. Then task 14.2 lays the two forms on top of each other and asks for the combination. Because equilibrium is linear, no new work is needed: the reactions add, every member keeps the force it already had, and the force diagram of the combination is literally the two force diagrams on one shared load line. Only the member between the two supports is shared by both, and it carries the DIFFERENCE of the two thrusts — a tie in a), a strut in b), and whichever wins in the combination. The sheet prints no numbers; everything here is derived and then checked against the drawn key, which it matches everywhere.',
  result: (d) => [
    `a) A = ${d.Aa.toFixed(2)} kN ↑ · B = ${d.Ba.toFixed(2)} kN ↑ · at H_a = ${d.Ha.toFixed(2)} kN: 1 = ${Math.hypot(d.Ha, d.Aa).toFixed(2)} C · 2 = ${Math.hypot(d.Ha, d.Aa - d.F1).toFixed(2)} C · tie 3 = ${d.Ha.toFixed(2)} T · 4 = ${Math.hypot(d.Ha, d.Aa - d.F1 - d.F2).toFixed(2)} C  (rise y_I ${d.yI.toFixed(3)} / y_II ${d.yII.toFixed(3)} m)`,
    `b) A = ${Math.abs(d.Ab).toFixed(2)} kN ↓ · B = ${d.Bb.toFixed(2)} kN ↑ · at H_b = ${d.Hb.toFixed(2)} kN: 1 = ${Math.hypot(d.Hb, -d.Ab).toFixed(2)} T · 2 = ${Math.hypot(d.Hb, d.Bb).toFixed(2)} C · strut 3 = ${d.Hb.toFixed(2)} C  (tip y_T ${d.yT.toFixed(3)} m)`,
    `14.2 A = ${d.Atot.toFixed(2)} kN ↑ · B = ${d.Btot.toFixed(2)} kN ↑, both vertical · 1 = ${Math.hypot(d.Ha, d.Aa).toFixed(2)} C · 2 = ${Math.hypot(d.Ha, d.Aa - d.F1).toFixed(2)} C · 3 = ${Math.hypot(d.Ha, d.Aa - d.F1 - d.F2).toFixed(2)} C · 4 = ${Math.hypot(d.Hb, -d.Ab).toFixed(2)} T · 6 = ${Math.hypot(d.Hb, d.Bb).toFixed(2)} C`,
    `14.2 the shared member 5 = H_a − H_b = ${d.Ha.toFixed(2)} − ${d.Hb.toFixed(2)} = ${Math.abs(d.N5).toFixed(2)} kN ${d.N5 >= 0 ? 'tension' : 'compression'} — the only force the superposition changes`,
    `the sheet prints no numbers; the key’s own drawing (H_a = 36.92, H_b = 23.08 kN) agrees with all of the above — no error found on page 14`],
  frame: [[-29, -22], [25, 16]],
};

// ------------------------------------------------------------------ create --
export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;

  // gate: {stage: first step} — an element shows once its part is on show AND
  // the construction has reached the step that draws it
  const gate = (map) => (st, dd) => !!dd && map[dd.stage] !== undefined
                                    && st._k >= map[dd.stage];

  const memColor = (k) => ({
    pending: PAL.black,
    final: (dd) => (!dd || !dd.mem[k] ? PAL.grey
      : Math.abs(dd.mem[k].N) < 1e-9 ? PAL.zero
      : dd.mem[k].tension ? PAL.red : PAL.blue),
  });

  // ---- titles
  dw.label('tForm', '', { cls: 'title', flash: false });
  dw.label('tForce', 'Force diagram   1 cm ≙ 10 kN', { cls: 'title', flash: false,
    when: (st, dd) => !!dd && st._k >= (dd.stage === 0 ? 4 : dd.stage === 1 ? 7 : 9) });

  // ---- supports
  const GS = gate({ 0: 1, 1: 5, 2: 8 });
  for (const n of ['A', 'B']) {
    dw.strokes(`sup${n}`, 3, { intro: 1, when: GS, w: dw.W.bar, color: PAL.black, flash: false });
    dw.strokes(`hat${n}`, 5, { intro: 1, when: GS, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.label(`lsup${n}`, n, { cls: 'point', intro: 1, when: GS, flash: false });
  }
  dw.seg('rollB', { intro: 1, when: GS, w: dw.W.dim, color: PAL.black, flash: false });

  // ---- load lines + loads
  const LG = [gate({ 0: 1, 2: 8 }), gate({ 0: 1, 2: 8 }), gate({ 1: 5, 2: 8 })];
  ['F1', 'F2', 'F3'].forEach((nm, i) => {
    dw.dashLine(`ll${i}`, { intro: 1, when: LG[i], color: PAL.grey, dash: dw.W.dash, flash: false });
    dw.arrow(`ld${i}`, { intro: 1, when: LG[i], color: PAL.green, ...ARR });
    dw.label(`lld${i}`, '', { cls: 'num', intro: 1, when: LG[i], color: PAL.green });
  });

  // ---- reactions
  const GR = gate({ 0: 2, 1: 6, 2: 9 });
  for (const n of ['A', 'B']) {
    dw.arrow(`re${n}`, { intro: 2, when: GR, color: PAL.green, ...ARR });
    dw.label(`lre${n}`, '', { cls: 'num', intro: 2, when: GR, color: PAL.green });
  }

  // ---- members, joints
  const GM = gate({ 0: 3, 1: 7, 2: 8 });
  const hasM = (k) => (st, dd) => !!dd && !!dd.mem[k] && GM(st, dd);
  for (let k = 0; k < 6; k++) {
    dw.seg(`mem${k}`, { intro: 3, when: hasM(k), w: dw.W.bar, color: memColor(k) });
    dw.label(`lmem${k}`, '', { cls: 'num', intro: 3, when: hasM(k), color: memColor(k) });
  }
  const usesNode = (dd, n) =>
    dd.mem.some((m, k) => m && (SLOTS[k][0] === n || SLOTS[k][1] === n));
  for (const n of ['A', 'B', 'I', 'II', 'T']) {
    dw.disk(`jt${n}`, { intro: 3, r: dw.W.disk * 0.8,
      when: (st, dd) => GM(st, dd) && usesNode(dd, n) });
    if (n === 'A' || n === 'B') continue;      // the support symbol already says A / B
    dw.label(`ljt${n}`, n, { cls: 'point', intro: 3, flash: false,
      when: (st, dd) => GM(st, dd) && usesNode(dd, n) && st.lbl });
  }

  // ---- force diagram
  const GF = gate({ 0: 4, 1: 7, 2: 9 });
  for (let i = 0; i < 3; i++) {
    dw.arrow(`fl${i}`, { intro: 4, when: (st, dd) => GF(st, dd) && i < dd.loads.length,
      color: PAL.green, ...NARR });
    dw.label(`lfl${i}`, '', { cls: 'num', intro: 4, color: PAL.green,
      when: (st, dd) => GF(st, dd) && i < dd.loads.length });
  }
  for (let i = 0; i < 2; i++) {
    dw.arrow(`fr${i}`, { intro: 4, when: (st, dd) => GF(st, dd) && i < dd.reacs.length,
      color: PAL.green, ...NARR });
    dw.label(`lfr${i}`, '', { cls: 'num', intro: 4, color: PAL.green,
      when: (st, dd) => GF(st, dd) && i < dd.reacs.length });
  }
  for (let i = 0; i < 2; i++) {
    dw.disk(`pole${i}`, { intro: 4, r: dw.W.disk * 0.75,
      when: (st, dd) => GF(st, dd) && i < dd.poles.length });
    dw.label(`lpole${i}`, '', { cls: 'num', intro: 4, color: PAL.grey,
      when: (st, dd) => GF(st, dd) && i < dd.poles.length });
  }
  for (let k = 0; k < 6; k++) {
    dw.seg(`ray${k}`, { intro: 4, w: dw.W.ray, color: memColor(k),
      when: (st, dd) => !!dd && !!dd.ray[k] && GF(st, dd) });
    dw.label(`lray${k}`, '', { cls: 'num', intro: 4, color: PAL.grey,
      when: (st, dd) => !!dd && !!dd.ray[k] && GF(st, dd) && st.lbl });
  }
  dw.seg('ray6', { intro: 9, w: dw.W.ray, color: memColor(3),
    when: (st, dd) => !!dd && !!dd.dup[0] && GF(st, dd) });
  dw.seg('ray7', { intro: 9, w: dw.W.ray, color: memColor(2),
    when: (st, dd) => !!dd && !!dd.dup[1] && GF(st, dd) });

  // ---- the two component rays that the superposition replaces
  for (let i = 0; i < 2; i++) {
    dw.seg(`cmp${i}`, { intro: 9, w: dw.W.ray * 1.8, color: PAL.grey, flash: false,
      when: (st, dd) => !!dd && st.comp && i < dd.comp.length && GF(st, dd) });
  }
  dw.label('lcmp', '', { cls: 'num', intro: 9, color: PAL.grey, flash: false,
    when: (st, dd) => !!dd && st.comp && !!dd.comp.length && GF(st, dd) });

  // ---- the H_a − H_b bar, spelled out under the force diagram
  const SGN = { pending: PAL.black, final: (dd) => (dd && dd.N5 >= 0 ? PAL.red : PAL.blue) };
  dw.arrow('barA', { intro: 10, color: PAL.red, flash: false, ...NARR,
    when: (st, dd) => !!dd && dd.stage === 2 });
  dw.arrow('barB', { intro: 10, color: PAL.blue, flash: false, ...NARR,
    when: (st, dd) => !!dd && dd.stage === 2 });
  dw.arrow('barN', { intro: 10, flash: false, ...ARR, color: SGN,
    when: (st, dd) => !!dd && dd.stage === 2 });
  dw.label('lbar', '', { cls: 'num', intro: 10, flash: false, color: SGN,
    when: (st, dd) => !!dd && dd.stage === 2 });

  // counterparts — one group per SLOT, so the pairing never changes part
  for (let k = 0; k < 6; k++) {
    const g = [`mem${k}`, `ray${k}`, `lmem${k}`, `lray${k}`];
    if (k === 3) g.push('ray6');
    if (k === 2) g.push('ray7');
    dw.link(...g);
  }
  dw.instant('tForm', 'tForce', 'supA', 'supB', 'hatA', 'hatB', 'rollB',
             'lsupA', 'lsupB', 'll0', 'll1', 'll2');

  let d = null;
  let lastK = -1;
  function refresh() {
    // the step normally chooses which part is on show; between steps the panel
    // slider (and a regression harness) may override it
    if (player && player.k !== lastK) {
      lastK = player.k;
      s.stage = STAGE_AT[Math.min(player.k, STAGE_AT.length - 1)];
    }
    s._k = player.k;
    d = compute(s);

    // ---------------------------------------------------------- form diagram
    const P = {};
    for (const n of ['A', 'B', 'I', 'II', 'T']) P[n] = fm(...d.nodes[n]);
    const top = Math.max(d.yI, d.yII, d.yT, 0);

    for (const [n, sgn] of [['A', 1], ['B', 1]]) {
      const p = P[n], h = 0.42 * MPU, w = 0.42 * MPU;
      dw.setStrokes(`sup${n}`, [[p, [p[0] - w, p[1] - h]],
                                [[p[0] - w, p[1] - h], [p[0] + w, p[1] - h]],
                                [[p[0] + w, p[1] - h], p]]);
      const base = n === 'A' ? p[1] - h : p[1] - h - 0.30 * MPU;
      dw.setStrokes(`hat${n}`, V.hatch([p[0] - w * 1.25, base], [p[0] + w * 1.25, base], -1, 0.42 * MPU, 5));
      dw.setLabel(`lsup${n}`, V.add(p, JOFF[n]));
    }
    dw.setSeg('rollB', [P.B[0] - 0.55 * MPU, P.B[1] - 0.42 * MPU - 0.14 * MPU],
                       [P.B[0] + 0.55 * MPU, P.B[1] - 0.42 * MPU - 0.14 * MPU]);

    const LX = [XF1, XF2, XF3];
    const LV = [d.F1, d.F2, d.F3];
    const arrTop = (top + 0.90) * MPU;
    LX.forEach((x, i) => {
      const base = fm(x, 0), tipY = ORG[1] + arrTop - 1.55;
      dw.setDashLine(`ll${i}`, [[base[0], base[1] - 0.9], [base[0], ORG[1] + arrTop + 0.55]]);
      dw.setArrow(`ld${i}`, [base[0], ORG[1] + arrTop], [base[0], tipY]);
      dw.setLabel(`lld${i}`, [base[0] + 1.75, ORG[1] + arrTop - 0.55]);
      dw.setText(`lld${i}`, `F${i + 1} = ${LV[i].toFixed(0)}`);
    });

    for (const [n, sgn] of [['A', -1], ['B', 1]]) {
      const p = P[n], val = n === 'A' ? d.A : d.B;
      const up = val >= 0;                    // + = upward
      const L = 2.35, gapv = 1.85;
      const tail = up ? [p[0], p[1] - gapv - L] : [p[0], p[1] - gapv];
      const tip = up ? [p[0], p[1] - gapv] : [p[0], p[1] - gapv - L];
      dw.setArrow(`re${n}`, tail, tip);
      dw.setLabel(`lre${n}`, [p[0] + sgn * 4.3, p[1] - gapv - L * 0.55]);
      dw.setText(`lre${n}`, `${n} = ${Math.abs(val).toFixed(2)} ${up ? '↑' : '↓'}`);
    }

    for (let k = 0; k < 6; k++) {
      const m = d.mem[k];
      if (!m) { dw.setSeg(`mem${k}`, [0, 0], [0, 0]); dw.setText(`lmem${k}`, ''); continue; }
      const a = fm(...m.p), b = fm(...m.q);
      dw.setSeg(`mem${k}`, a, b);
      const [t, side] = LABPOS[k];
      const at = V.add(a, V.mul(V.sub(b, a), t));
      const nrm = V.mul(V.perp(V.unit(V.sub(b, a))), 1.35 * side);
      dw.setLabel(`lmem${k}`, V.add(at, nrm));
      dw.setText(`lmem${k}`, s.lbl ? `${m.num} · ${m.N.toFixed(1)} ${m.tension ? 'T' : 'C'}`
                                   : `${m.num}`);
    }
    for (const n of ['A', 'B', 'I', 'II', 'T']) {
      dw.setDisk(`jt${n}`, P[n]);
      if (n !== 'A' && n !== 'B') dw.setLabel(`ljt${n}`, V.add(P[n], JOFF[n]));
    }

    dw.setLabel('tForm', [ORG[0] + 4.0 * MPU, ORG[1] - 4.55]);
    dw.setText('tForm', `${PART[d.stage]}   ·   Form diagram 1:100`);
    dw.setLabel('tForce', [KORG[0], KORG[1] + 2.6]);

    // --------------------------------------------------------- force diagram
    const fk = fkOf(d.stage);
    d.loads.forEach(([nm, a, b], i) => {
      dw.setArrow(`fl${i}`, fk(a), fk(b));
      dw.setLabel(`lfl${i}`, V.add(fk(V.mid(a, b)), [-1.55, 0]));
      dw.setText(`lfl${i}`, nm);
    });
    d.reacs.forEach(([nm, a, b], i) => {
      const o = [KOFF, 0];
      dw.setArrow(`fr${i}`, fk(V.add(a, o)), fk(V.add(b, o)));
      dw.setLabel(`lfr${i}`, V.add(fk(V.add(V.mid(a, b), o)), [1.55, 0]));
      dw.setText(`lfr${i}`, `${nm} ${Math.hypot(b[0] - a[0], b[1] - a[1]).toFixed(2)}`);
    });
    d.poles.forEach(([nm, p], i) => {
      dw.setDisk(`pole${i}`, fk(p));
      dw.setLabel(`lpole${i}`, V.add(fk(p), [p[0] < 0 ? -1.25 : 1.25, -0.95]));
      dw.setText(`lpole${i}`, nm);
    });
    for (let k = 0; k < 6; k++) {
      const r = d.ray[k];
      if (!r) { dw.setSeg(`ray${k}`, [0, 0], [0, 0]); dw.setText(`lray${k}`, ''); continue; }
      const a = fk(r[0]), b = fk(r[1]);
      dw.setSeg(`ray${k}`, a, b);
      dw.setLabel(`lray${k}`, V.add(V.add(a, V.mul(V.sub(b, a), RLABT[k])), [0, 0.9]));
      dw.setText(`lray${k}`, `${d.mem[k] ? d.mem[k].num : ''}`);
    }
    dw.setSeg('ray6', ...(d.dup[0] ? [fk(d.dup[0][0]), fk(d.dup[0][1])] : [[0, 0], [0, 0]]));
    dw.setSeg('ray7', ...(d.dup[1] ? [fk(d.dup[1][0]), fk(d.dup[1][1])] : [[0, 0], [0, 0]]));

    d.comp.forEach(([, seg], i) => dw.setSeg(`cmp${i}`, fk(seg[0]), fk(seg[1])));
    if (!d.comp.length) for (let i = 0; i < 2; i++) dw.setSeg(`cmp${i}`, [0, 0], [0, 0]);

    // the arithmetic of the shared member, drawn under the force diagram
    const b0 = [KORG[0] - 5.2, KORG[1] - 29.0];
    dw.setLabel('lcmp', [b0[0] + 4.6, b0[1] + 1.3]);
    dw.setText('lcmp', `grey: a)’s tie ray ${d.Ha.toFixed(2)} → · b)’s strut ray ${d.Hb.toFixed(2)} ←`);
    dw.setArrow('barA', b0, [b0[0] + d.Ha / SFD, b0[1]]);
    dw.setArrow('barB', [b0[0] + d.Ha / SFD, b0[1]], [b0[0] + (d.Ha - d.Hb) / SFD, b0[1]]);
    dw.setArrow('barN', [b0[0], b0[1] - 1.5], [b0[0] + d.N5 / SFD, b0[1] - 1.5]);
    dw.setLabel('lbar', [b0[0] + 8.6, b0[1] - 0.75]);
    dw.setText('lbar', `5 = H_a − H_b = ${d.Ha.toFixed(2)} − ${d.Hb.toFixed(2)} = ${d.N5.toFixed(2)} kN ${d.N5 >= 0 ? 'T' : 'C'}`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const w = panel.section('What to look at');
  panel.slider(w, s, 'stage', 'part', 0, 2, 1,
    () => player.set(FIRST_OF[Math.round(s.stage)]), (v) => PART[Math.round(v)]);
  panel.toggle(w, s, 'comp', 'show a)’s tie ray and b)’s strut ray (grey)', refresh);
  panel.toggle(w, s, 'lbl', 'show joint names and member forces', refresh);

  const g = panel.section('Your design choice');
  panel.slider(g, s, 'Ha', 'a)  thrust H_a (kN)', 14, 80, 0.01, refresh,
    (v) => `${v.toFixed(2)} kN${Math.abs(v - 36.92) < 0.005 ? '  ← the key’s' : ''}`);
  panel.slider(g, s, 'Hb', 'b)  thrust H_b (kN)', 8, 60, 0.01, refresh,
    (v) => `${v.toFixed(2)} kN${Math.abs(v - 23.08) < 0.005 ? '  ← the key’s' : ''}`);

  const gv = panel.section('Given');
  panel.slider(gv, s, 'F1', 'F1 (kN)', 20, 100, 5, refresh, (v) => `${v.toFixed(0)} kN`);
  panel.slider(gv, s, 'F2', 'F2 (kN)', 10, 60, 5, refresh, (v) => `${v.toFixed(0)} kN`);
  panel.slider(gv, s, 'F3', 'F3 (kN)', 10, 60, 5, refresh, (v) => `${v.toFixed(0)} kN`);

  refresh();
  return player;
}
