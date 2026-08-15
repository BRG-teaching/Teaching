/**
 * EX X · Aufgabe 17 — Stability and dimensioning
 * Structural Design II, FS 23, sheet "EX X — Additional Exercises", page 15.
 *
 * NUMBERING. The English sheet calls this "Task 3" — one of three blocks with
 * that label. German: Aufgabe 17, used here (error E1).
 *
 * TEXT (verbatim).
 *  a) "Find the internal forces for the given structure with help of the force
 *     diagram. Use red for tension, blue for compression and green for the
 *     external forces."
 *  b) "The truss is built out of steel S 235 with circular solid profiles. Find
 *     the required diameter of the elements 1 and 2 (without considering
 *     buckling yet). Round the result to whole mm."
 *  c) "After considering the self-weight of the structure, the diameter for
 *     each element is 85 mm. In the given case the critical length is equal to
 *     the actual length of the elements. Use the buckling diagram to test the
 *     stability of elements 1 and 2 and draw the values into the diagram."
 *  d) "How could buckling be prevented?"
 *
 * GIVEN. F1d = F2d = 300 kN, vertical, down. Form diagram 1:100; force diagram
 * 1 cm ≙ 100 kN. Steel S235 → f_d = 235 / 1.05 = 223.8095 N/mm².
 * b) circular SOLID sections; c) D = 85 mm and l_cr = l.
 *
 * GEOMETRY, metres, origin = the left support A (pin). B is a roller at the
 * same level.
 *   A (pin)   0.0000  0.000
 *   C         1.9810  2.499   F1d applies here
 *   D         3.7485  1.000   mid node, apex of the raised bottom chord
 *   E         5.5160  2.499   F2d applies here
 *   B (roller) 7.4970 0.000
 *   members (7): A–C = element 1 (3.1889 m) · A–D = element 2 (3.8796 m) ·
 *   C–D (2.3176) · C–E (3.5350, top chord) · D–E (2.3176) · D–B (3.8796) ·
 *   E–B (3.1889).  7 + 3 = 10 = 2 × 5 nodes → statically determinate.
 *
 * ============================================================================
 * THE STRONGEST VALIDATION ON THE WHOLE SHEET.
 * The sheet prints NO answer for a) — but its own worked answer to b) uses
 * N1 = 485 kN and N2 = 312 kN. Solving the truss from the digitised geometry
 * gives −485.50 kN and +312.14 kN. That match to three significant figures
 * validates two things at once: the digitised geometry, and the solver. The
 * sheet's printed values confirm this view's numbers, and the view says so.
 * A second calibration agrees: the sheet's own c)-working quotes l_cr = 3.2 m
 * for element 1, and the digitised length is 3.1889 m — 0.34 % out.
 * ============================================================================
 *
 * a) ANSWERS. A = B = 300.00 kN up, A_x = 0 (recomputed live by lib/truss.js;
 * the same numbers came out of an independent numpy least-squares solve while
 * this view was written).
 *
 *   element 1 (A–C)   −485.50 C        C–E (top chord)  −396.46 C
 *   element 2 (A–D)   +312.14 T        D–E              +124.39 T
 *   C–D               +124.39 T        D–B              +312.14 T
 *                                      E–B              −485.50 C
 *
 *   Independent check at node A: 485.50 × (1.981/3.1889) = 301.6 kN horizontal
 *   in, 312.14 × (3.7485/3.8796) = 301.6 kN horizontal out → balance;
 *   vertically 485.50 × (2.499/3.1889) = 380.5 down against
 *   312.14 × (1.000/3.8796) = 80.5 up plus the 300 kN reaction. Closes.
 *
 * b) ANSWERS.
 *   element 1, compression 485.50 kN:
 *     A_req = 485 500 / 223.81 = 2169.3 mm² → D = 2√(A/π) = 52.55 → 53 mm
 *   element 2, tension 312.14 kN:
 *     A_req = 312 140 / 223.81 = 1394.7 mm² → D = 2√(A/π) = 42.14 → 43 mm
 *   The sheet prints 2167 mm² / 52.53 mm / 53 mm and 1394 mm² / 42.13 mm /
 *   43 mm — identical.
 *
 * c) ANSWERS. D = 85 mm → A = π × 42.5² = 5674.5 mm²; √A = 75.33 mm.
 *   element 1: l_cr = 3.189 m (sheet: 3.2 m) → l_cr/√A = 3189 / 75.33 = 42.33
 *     (sheet: 42.5); N_cd/(A f_cd) = 485 500 / (5674.5 × 223.81) = 0.3823
 *     (sheet: 0.38). Reading the SOLID-CIRCLE curve — the lowest on the chart —
 *     at a slenderness of 42 gives about 0.30. 0.382 > 0.30 →
 *     BUCKLING FAILURE ("KNICKVERSAGEN!").
 *   element 2 is a TENSION member and cannot buckle.
 *
 *   THE CHART. Its curve data cannot be transcribed from the PDF, so this view
 *   uses the standard European buckling curve c (α = 0.49) with the shape
 *   number r = i/√A = 0.2821 of a solid round, expressed in the sheet's own
 *   coordinate l_cr/√A:
 *       λ_true = (l_cr/√A) / r ,  λ̄ = λ_true / λ_1 ,
 *       λ_1 = π√(E/f_d) = π√(210 000 / 223.81) = 96.2 ,
 *       Φ = 0.5[1 + α(λ̄ − 0.2) + λ̄²] ,  χ = 1/(Φ + √(Φ² − λ̄²)).
 *   At l_cr/√A = 42.33 that gives χ = 0.296 against the sheet's read-off of
 *   about 0.30 — so the verdict, FAILURE, is the same either way, and by a
 *   wide margin (0.382 demanded against 0.296 available, 29 % over).
 *
 * d) ANSWERS (printed on the sheet, in German):
 *   · use a hollow section instead of a solid one;
 *   · use a different material (e.g. S355 or S500);
 *   · change the geometry (shorten the element).
 *
 * PROBLEM — errors E7 and E8. b), c) and d) are all printed with their answers,
 * in German, on the ENGLISH task sheet. Only a) is genuinely open, and even a)
 * is confirmed by the numbers b) uses. This view treats the printed values as
 * what they are: a check on the solver, not a solution to be revealed.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';
import { analyse } from '../lib/truss.js';

// -------------------------------------------------------------- the model --

const NODE = [[0.0000, 0.000], [1.9810, 2.499], [3.7485, 1.000],
              [5.5160, 2.499], [7.4970, 0.000]];
const NAME = ['A', 'C', 'D', 'E', 'B'];
const MEM = [[0, 1], [0, 2], [1, 2], [1, 3], [2, 3], [2, 4], [3, 4]];
const MNAME = ['1 (A–C)', '2 (A–D)', 'C–D', 'C–E', 'D–E', 'D–B', 'E–B'];
const NM = MEM.length, NN = NODE.length;
const SUP = { 0: 'pin', 4: 'roller-v' };
const LOADED = [1, 3];                 // F1d at C, F2d at E
const EL1 = 0, EL2 = 1;                // the two elements the sheet dimensions

// material, compendium 2.5 + 2.6
const F_TK = 235, GAM_M = 1.05;
const FD = F_TK / GAM_M;               // 223.8095 N/mm²
const E_MOD = 210000;
const LAM1 = Math.PI * Math.sqrt(E_MOD / FD);
// solid round: i = D/4 and A = πD²/4, so i/√A = 0.2821; European curve c
const R_RND = 0.2821, ALPHA_RND = 0.49;

/** χ = N_allow /(A f_d) for a solid round at a given l_cr/√A.
    The same function appears in exX2_16_2.js; both pages read the same chart. */
function chiRound(lamA) {
  const lb = lamA / R_RND / LAM1;
  if (lb < 1e-6) return 1;
  const phi = 0.5 * (1 + ALPHA_RND * (lb - 0.2) + lb * lb);
  return Math.min(1, 1 / (phi + Math.sqrt(Math.max(phi * phi - lb * lb, 0))));
}

// the incident forces at each node, in a FIXED geometric order, so a polygon
// side keeps its slot and dw.link() stays true whatever the load does
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
const MAXF = 4;
const SLOT = (() => {
  const t = MEM.map(() => []);
  NODE.forEach((p, i) => {
    let e = 0;
    if (LOADED.includes(i)) e++;
    if (SUP[i]) e++;
    for (const { m } of AT[i]) { t[m].push([i, e]); e++; }
  });
  return t;
})();

// ---------------------------------------------------------------- layout --

const TX = 1.5, TY = 4.2, TM = 1.40;         // the truss, top right
const SEC = [[-19.2, -2.6], [-8.4, -2.6]], SECM = 0.036;   // the two sections
const CELL = [[4.5, -5.5], [14.5, -5.5], [24.5, -5.5],
              [9.5, -16.0], [19.5, -16.0]];
const SFD = 0.018;                           // units per kN, force diagrams

const DEFAULTS = { F: 300, D: 85, lbl: true, sec: true, _k: 99 };

const K_LOAD = 2, K_REACT = 3, K_LEFT = 4, K_ALL = 5, K_VALID = 6,
      K_DIM = 7, K_BUCK = 8;

export const meta = {
  title: 'EX X · 17 — the sheet checks our arithmetic',
  subtitle: 'Structural Design II · “EX X — Additional Exercises”, p. 15 · German Aufgabe 17 (the English sheet calls it “Task 3”)',
  about: 'A five-node truss with two 300 kN loads, and the one page on this booklet where the sheet grades the solver instead of the other way round. Part a) is the only genuinely open question — but parts b) and c) arrive with their answers printed, and those answers are built on N1 = 485 kN and N2 = 312 kN. Solving the truss from geometry digitised off the drawing gives 485.50 and 312.14. Three significant figures, twice, from two completely independent routes: that is what validates every other number scaled off this booklet. Then the sting. Dimension the two bars for material alone and you get 53 and 43 mm. Build them at 85 mm — bigger, and chosen after the self-weight was added — and element 1 still fails, because it fails by buckling, and buckling does not care how much steel is in the bar, only how far it is from the middle.',
  result: (d) => [
    `a) F1d = F2d = ${d.F.toFixed(0)} kN → A = B = ${d.RA.toFixed(2)} kN up · element 1 (A–C) = ${Math.abs(d.N[EL1]).toFixed(2)} kN COMPRESSION · element 2 (A–D) = ${d.N[EL2].toFixed(2)} kN TENSION · residual ${d.resid.toExponential(1)} kN`,
    `THE SHEET'S OWN PRINTED WORKING FOR b) USES 485 AND 312 kN — this view's 485.50 and 312.14 confirm it to three significant figures, and its printed l_cr = 3.2 m confirms the digitised 3.189 m to 0.34 %`,
    `b) element 1: A_req = ${d.A1.toFixed(1)} mm² → D = ${d.D1.toFixed(2)} → ${d.D1r} mm (sheet: 2167 mm², 52.53, 53) · element 2: A_req = ${d.A2.toFixed(1)} mm² → D = ${d.D2.toFixed(2)} → ${d.D2r} mm (sheet: 1394 mm², 42.13, 43)`,
    `c) at D = ${d.D} mm: A = ${d.Ab.toFixed(1)} mm², l_cr/√A = ${d.lamA.toFixed(2)} (sheet: 42.5), N/(A f_d) = ${d.demand.toFixed(4)} (sheet: 0.38) against the solid-round curve at χ = ${d.chi.toFixed(4)} → ${d.buckOK ? 'no buckling failure' : 'BUCKLING FAILURE (KNICKVERSAGEN!)'} · element 2 is a TIE and cannot buckle`,
    `c) element 1 first becomes safe at D ≈ ${d.Dsafe} mm — ${(d.Dsafe / d.D1r).toFixed(2)}× the diameter that material strength alone asked for`],
  frame: [[-26, -22], [30, 16]],
};

const STEPS = [
  { t: 'The exercise', d: 'EX X page 15, German Aufgabe 17. Four parts: find the member forces, size two bars for strength, check the same two for buckling, and say how buckling could be avoided. Three of the four arrive with their answers already printed, two of them in German',
    detail: () => ['a) is the only genuinely open part — and it is the one that turns out to check itself',
                   'b), c) and d) are printed with full workings (errors E7, E8)',
                   'form diagram 1:100 · force diagram 1 cm ≙ 100 kN · steel S235, f_d = 223.81 N/mm²'],
    take: 'when a task gives you its own intermediate numbers, use them as a test of your method rather than as an answer' },
  { t: 'The truss', d: 'left: five nodes, seven members. The bottom chord is not straight — it lifts to a node D in the middle, which is what makes the two elements the sheet asks about, 1 and 2, meet at the support with such different jobs',
    detail: () => [`span ${NODE[4][0].toFixed(4)} m · top nodes at ${NODE[1][1].toFixed(3)} m, mid node D at ${NODE[2][1].toFixed(3)} m`,
                   `element 1 = A–C, ${Math.hypot(NODE[1][0], NODE[1][1]).toFixed(4)} m · element 2 = A–D, ${Math.hypot(NODE[2][0], NODE[2][1]).toFixed(4)} m`,
                   `${NM} members + 3 reaction components = ${NM + 3} = 2 × ${NN} nodes → determinate`],
    take: 'the sheet prints no dimension line here either; this is digitised at the stated 1:100, and page 15 is where that gets verified' },
  { t: 'The loads', d: 'two equal 300 kN loads on the two top nodes. The truss is symmetric and so is the loading, so half the work is already done — whatever comes out on the left comes out on the right',
    detail: (d) => [`F1d = F2d = ${d.F.toFixed(1)} kN, vertical, down, at C and E`,
                    `total ${(2 * d.F).toFixed(1)} kN`,
                    'symmetry means A = B before any equation is written'] },
  { t: 'The reactions', d: 'and there they are: half each, with nothing horizontal, because nothing horizontal is applied',
    detail: (d) => [`A = B = ${(2 * d.F).toFixed(1)} / 2 = ${d.RA.toFixed(2)} kN up`,
                    `A_x = ${d.RAx.toFixed(3)} kN`,
                    `ΣV = ${d.sumV.toExponential(1)} kN`] },
  { t: 'Start at the support', d: 'right: one closed force polygon per node. Node A has only two unknown members and a known reaction, so it can be solved outright — and it is the node that gives both of the elements the sheet cares about',
    detail: (d) => [`element 1 (A–C) = ${Math.abs(d.N[EL1]).toFixed(2)} kN ${d.N[EL1] > 0 ? 'tension' : 'COMPRESSION'}`,
                    `element 2 (A–D) = ${Math.abs(d.N[EL2]).toFixed(2)} kN ${d.N[EL2] > 0 ? 'TENSION' : 'compression'}`,
                    `check by hand: ${Math.abs(d.N[EL1]).toFixed(2)} × (1.981/3.1889) = ${(Math.abs(d.N[EL1]) * 1.981 / 3.1889).toFixed(1)} kN horizontal in, ${Math.abs(d.N[EL2]).toFixed(2)} × (3.7485/3.8796) = ${(Math.abs(d.N[EL2]) * 3.7485 / 3.8796).toFixed(1)} kN out ✓`],
    take: 'the steepest member at a support always takes the reaction. Here that is element 1, and it is in compression' },
  { t: 'The rest of the diagram', d: 'then C, D, E and finally B — which has nothing unknown left in it at all. B closing is the proof that everything before it was right',
    detail: (d) => d.N.map((n, i) => `${MNAME[i]}: ${n > 0 ? '+' : ''}${n.toFixed(2)} kN ${n > 0 ? 'T' : 'C'}`).slice(2),
    take: 'the top chord carries less than element 1 does. In a truss the biggest force is very often at the support, not at midspan' },
  { t: 'And now the sheet marks our work', d: 'the sheet prints no answer to a). But its printed working for b) divides 485 kN and 312 kN by the design strength — and those are our two elements. Three significant figures, from a solver fed nothing but coordinates scraped off the drawing',
    detail: (d) => [`sheet b): N1 = 485 kN · here: ${Math.abs(d.N[EL1]).toFixed(2)} kN`,
                    `sheet b): N2 = 312 kN · here: ${d.N[EL2].toFixed(2)} kN`,
                    `sheet c): l_cr = 3.2 m · here: ${d.L1.toFixed(4)} m — 0.34 % apart`],
    take: 'this is the calibration that makes every other digitised length in the booklet trustworthy' },
  { t: 'b) Size them for strength', d: 'left, below the truss: the two bars. Divide the force by the design strength for the area, turn the area into a diameter, round UP. Nothing about buckling yet — the task says so explicitly',
    detail: (d) => [`element 1: ${(Math.abs(d.N[EL1]) * 1000).toFixed(0)} / ${FD.toFixed(2)} = ${d.A1.toFixed(1)} mm² → D = ${d.D1.toFixed(2)} → ${d.D1r} mm  (sheet: 2167, 52.53, 53)`,
                    `element 2: ${(d.N[EL2] * 1000).toFixed(0)} / ${FD.toFixed(2)} = ${d.A2.toFixed(1)} mm² → D = ${d.D2.toFixed(2)} → ${d.D2r} mm  (sheet: 1394, 42.13, 43)`,
                    'the two answers match the printed ones exactly'],
    take: 'a tie and a strut of the same size are sized the same way. That is precisely the assumption c) is about to destroy' },
  { t: 'c) Now let it buckle', d: 'the built diameter is 85 mm — larger than either bar needed, because the self-weight was added afterwards. And element 1 still fails. Element 2 does not, and cannot: it is in tension, and a rope cannot buckle',
    detail: (d) => [`D = ${d.D} mm → A = ${d.Ab.toFixed(1)} mm², √A = ${Math.sqrt(d.Ab).toFixed(2)} mm`,
                    `element 1: l_cr = l = ${d.L1.toFixed(3)} m → l_cr/√A = ${d.lamA.toFixed(2)} (sheet: 42.5) · demand ${d.demand.toFixed(4)} (sheet: 0.38) against the curve at ${d.chi.toFixed(4)}`,
                    d.buckOK ? 'below the curve — it holds' : `ABOVE the curve by ${((d.demand / d.chi - 1) * 100).toFixed(0)} % → KNICKVERSAGEN`],
    take: 'strength scales with area, stability with the fourth power of the diameter over the square of the length. They are not the same check and they do not agree' },
  { t: 'd) What to do about it', d: 'and the sheet answers its own last question, in German. All three answers move the same term: make the section stiffer for its area, make the steel stronger, or make the member shorter',
    detail: (d) => ['“Hohlprofil statt Vollprofil” — use a hollow section instead of a solid one',
                    '“anderes Material” — a different steel, e.g. S355 or S500',
                    '“Geometrie ändern” — change the geometry, i.e. shorten the element',
                    `or simply grow it: element 1 first becomes safe at about D = ${d.Dsafe} mm`],
    take: 'the first of the three is the cheapest by far, and it is the whole content of Aufgabe 16.2 on the page before' },
];

// ------------------------------------------------------------------ maths --

const areaOf = (D) => (Math.PI * D * D) / 4;

function compute(s) {
  const loads = {};
  for (const i of LOADED) loads[i] = [0, -s.F];
  const r = analyse({ nodes: NODE, members: MEM, supports: SUP, loads });
  const N = r.forces;
  const RA = r.reactions[0][1], RAx = r.reactions[0][0], RB = r.reactions[4][1];
  const sumV = RA + RB - 2 * s.F;

  const L1 = Math.hypot(NODE[1][0] - NODE[0][0], NODE[1][1] - NODE[0][1]);
  const L2 = Math.hypot(NODE[2][0] - NODE[0][0], NODE[2][1] - NODE[0][1]);

  // b) sizing for material strength alone
  const A1 = (Math.abs(N[EL1]) * 1000) / FD;
  const A2 = (Math.abs(N[EL2]) * 1000) / FD;
  const D1 = 2 * Math.sqrt(A1 / Math.PI), D2 = 2 * Math.sqrt(A2 / Math.PI);
  const D1r = Math.ceil(D1 - 1e-9), D2r = Math.ceil(D2 - 1e-9);

  // c) the buckling check of element 1 at the built diameter
  const Ab = areaOf(s.D);
  const lamA = (L1 * 1000) / Math.sqrt(Ab);
  const demand = (Math.abs(N[EL1]) * 1000) / (Ab * FD);
  const chi = chiRound(lamA);
  const buckOK = demand <= chi;
  // the first whole millimetre at which element 1 clears the curve
  let Dsafe = s.D;
  for (let D = 20; D <= 400; D++) {
    const a = areaOf(D);
    if ((Math.abs(N[EL1]) * 1000) / (a * FD) <= chiRound((L1 * 1000) / Math.sqrt(a))) {
      Dsafe = D; break;
    }
  }

  // one closed force polygon per node, in the fixed geometric order
  const polys = NODE.map((p, i) => {
    const parts = [];
    if (LOADED.includes(i)) parts.push({ v: [0, -s.F], col: PAL.green, name: 'F' });
    if (r.reactions[i]) parts.push({ v: r.reactions[i].slice(), col: PAL.green,
                                     name: `R(${NAME[i]})` });
    for (const { m, j } of AT[i]) {
      const u = V.unit(V.sub(NODE[j], p));
      parts.push({ v: V.mul(u, N[m]), m,
                   col: N[m] > 1e-9 ? PAL.red : N[m] < -1e-9 ? PAL.blue : PAL.zero,
                   name: MNAME[m].split(' ')[0] });
    }
    return parts;
  });

  return { F: s.F, D: s.D, N, RA, RAx, RB, sumV, resid: r.resid, L1, L2,
           A1, A2, D1, D2, D1r, D2r, Ab, lamA, demand, chi, buckOK, Dsafe,
           polys };
}

// ------------------------------------------------------------------- view --

const ring = (c, r, n) => Array.from({ length: n }, (_, i) => {
  const a = (2 * Math.PI * i) / n;
  return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
});
const NCIRC = 36;

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const ux = (p) => [TX + p[0] * TM, TY + p[1] * TM];

  const MEMCOL = (i) => ({
    pending: PAL.black,
    final: (dd, st) => (st._k < (i < 2 ? K_LEFT : K_ALL) ? PAL.grey
      : dd.N[i] > 1e-9 ? PAL.red : dd.N[i] < -1e-9 ? PAL.blue : PAL.zero),
  });

  dw.label('t_form', '', { cls: 'title', flash: false });
  dw.label('t_force', '', { cls: 'title', flash: false });
  dw.label('t_sec', '', { cls: 'title', flash: false });

  // ---- the truss
  for (let i = 0; i < NM; i++) {
    dw.seg(`mem${i}`, { intro: 1, w: dw.W.bar, color: MEMCOL(i) });
    dw.label(`lmem${i}`, '', { cls: 'num', intro: i < 2 ? K_LEFT : K_ALL,
      color: MEMCOL(i), when: (st) => st.lbl });
  }
  for (let i = 0; i < NN; i++) {
    dw.disk(`nd${i}`, { intro: 1, r: dw.W.disk });
    dw.label(`lnd${i}`, NAME[i], { cls: 'num', intro: 1, when: (st) => st.lbl });
  }
  for (const n of ['A', 'B']) {
    dw.strokes(`hat${n}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.arrow(`re${n}`, { intro: K_REACT, color: PAL.green, ...NARR });
    dw.label(`lre${n}`, '', { cls: 'num', intro: K_REACT, color: PAL.green });
  }
  for (let i = 0; i < 2; i++) {
    dw.arrow(`fL${i}`, { intro: K_LOAD, color: PAL.green, ...ARR });
    dw.label(`lfL${i}`, '', { cls: 'num', intro: K_LOAD, color: PAL.green });
  }

  // ---- the force diagram: one closed polygon per node
  for (let i = 0; i < NN; i++) {
    const at = i === 0 ? K_LEFT : K_ALL;
    dw.label(`jt${i}`, '', { cls: 'point', intro: at, flash: false });
    for (let e = 0; e < MAXF; e++) {
      dw.arrow(`pe${i}_${e}`, { intro: at, ...NARR, flash: false,
        color: { pending: PAL.black, final: (dd) => dd.polys[i][e]?.col ?? PAL.grey } });
    }
  }
  for (let m = 0; m < NM; m++) {
    const [[i0, e0], [i1, e1]] = SLOT[m];
    dw.link(`mem${m}`, `pe${i0}_${e0}`, `pe${i1}_${e1}`, `lmem${m}`);
  }

  // ---- b) and c): the two bar sections
  for (let k = 0; k < 2; k++) {
    dw.poly(`secFill${k}`, NCIRC, { intro: K_DIM, opacity: 0.5, z: -0.2,
      color: k === 0 ? PAL.blueBand : PAL.redBand, when: (st) => st.sec });
    dw.circle(`secEdge${k}`, { intro: K_DIM, color: k === 0 ? PAL.blue : PAL.red,
      when: (st) => st.sec });
    dw.dashedCircle(`secReq${k}`, { intro: K_DIM, color: PAL.grey, dash: 0.4,
      when: (st) => st.sec });
    dw.label(`lsec${k}`, '', { cls: 'num', intro: K_DIM, when: (st) => st.sec });
    dw.label(`lsecR${k}`, '', { cls: 'num', intro: K_DIM, color: PAL.grey,
      when: (st) => st.sec });
  }
  dw.label('lbuck', '', { cls: 'num', intro: K_BUCK,
    color: { pending: PAL.black, final: (dd) => (dd.buckOK ? PAL.green : PAL.red) },
    when: (st) => st.sec });
  dw.label('lvalid', '', { cls: 'point', intro: K_VALID, flash: false, color: PAL.green });

  dw.instant('t_form', 't_force', 't_sec');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    dw.setLabel('t_form', [TX + 3.75 * TM, 11.0]);
    dw.setText('t_form', `Lageplan 1:100 — span ${NODE[4][0].toFixed(3)} m`);
    dw.setLabel('t_force', [21.5, 11.0]);
    dw.setText('t_force', `Kräfteplan — 1 unit ≙ ${(1 / SFD).toFixed(1)} kN (sheet: 1 cm ≙ 100 kN)`);
    dw.setLabel('t_sec', [-13.8, 1.15]);
    dw.setText('t_sec', `the two elements in section — 1 mm ≙ ${SECM} units`);

    // ---- the truss
    MEM.forEach(([a, b], i) => {
      const pa = ux(NODE[a]), pb = ux(NODE[b]);
      dw.setSeg(`mem${i}`, pa, pb);
      const nb = V.mul(V.unit(V.perp(V.sub(pb, pa))), [2.4, -2.4, 2.0, 2.0, -2.0, 2.4, -2.4][i]);
      dw.setLabel(`lmem${i}`, V.add(V.mid(pa, pb), nb));
      dw.setText(`lmem${i}`, `${MNAME[i].split(' ')[0]}: ${Math.abs(d.N[i]).toFixed(1)}`);
    });
    NODE.forEach((p, i) => {
      const q = ux(p);
      dw.setDisk(`nd${i}`, q);
      dw.setLabel(`lnd${i}`, V.add(q, [[-1.3, -1.2], [-1.3, 1.2], [0, -1.5],
                                       [1.3, 1.2], [1.3, -1.2]][i]));
    });
    for (const [n, i] of [['A', 0], ['B', 4]]) {
      const p = ux(NODE[i]);
      dw.setStrokes(`hat${n}`, V.hatch([p[0] - 1.4, p[1] - 0.5], [p[0] + 1.4, p[1] - 0.5],
        -1, 0.8, 5));
      dw.setArrow(`re${n}`, [p[0], p[1] - 3.8], [p[0], p[1] - 1.0]);
      dw.setLabel(`lre${n}`, [p[0] + (n === 'A' ? -2.9 : 2.9), p[1] - 2.6]);
      dw.setText(`lre${n}`, `${(n === 'A' ? d.RA : d.RB).toFixed(2)}`);
    }
    LOADED.forEach((nd, i) => {
      const p = ux(NODE[nd]);
      dw.setArrow(`fL${i}`, [p[0], p[1] + 2.6], [p[0], p[1] + 0.9]);
      dw.setLabel(`lfL${i}`, [p[0] + (i ? 3.3 : -3.3), p[1] + 2.0]);
      dw.setText(`lfL${i}`, `F${i + 1}d = ${d.F.toFixed(0)}`);
    });

    // ---- the force diagram
    d.polys.forEach((parts, i) => {
      const pts = [[0, 0]];
      parts.forEach((q) => pts.push(V.add(pts[pts.length - 1], V.mul(q.v, SFD))));
      const xs = pts.map((q) => q[0]), ys = pts.map((q) => q[1]);
      const off = V.sub(CELL[i], [(Math.min(...xs) + Math.max(...xs)) / 2,
                                  (Math.min(...ys) + Math.max(...ys)) / 2]);
      dw.setLabel(`jt${i}`, V.add(CELL[i],
        [0, (Math.max(...ys) - Math.min(...ys)) / 2 + 1.5]));
      dw.setText(`jt${i}`, `${NAME[i]}: ${parts.map((q) => q.name).join(' + ')}`);
      for (let e = 0; e < MAXF; e++) {
        const a = V.add(pts[Math.min(e, pts.length - 1)], off);
        const b = V.add(pts[Math.min(e + 1, pts.length - 1)], off);
        dw.setArrow(`pe${i}_${e}`, a, b);
      }
    });

    // ---- the two sections
    const req = [d.D1, d.D2], rnd = [d.D1r, d.D2r];
    for (let k = 0; k < 2; k++) {
      const c = SEC[k], rB = (d.D / 2) * SECM, rR = (req[k] / 2) * SECM;
      dw.setPoly(`secFill${k}`, ring(c, rB, NCIRC));
      dw.setCircle(`secEdge${k}`, c, rB);
      dw.setDashedCircle(`secReq${k}`, c, rR);
      dw.setLabel(`lsec${k}`, [c[0], c[1] - rB - 1.3]);
      dw.setText(`lsec${k}`, `element ${k + 1}: built Ø${d.D} mm`);
      dw.setLabel(`lsecR${k}`, [c[0], c[1] + rB + 1.3]);
      dw.setText(`lsecR${k}`, `needs Ø${req[k].toFixed(2)} → ${rnd[k]} mm`);
    }
    dw.setLabel('lbuck', [16.0, -20.2]);
    dw.setText('lbuck', d.buckOK
      ? `element 1 buckling: ${d.demand.toFixed(3)} ≤ ${d.chi.toFixed(3)} — it holds`
      : `element 1 buckling: ${d.demand.toFixed(3)} > ${d.chi.toFixed(3)} — KNICKVERSAGEN (element 2 is a tie)`);
    dw.setLabel('lvalid', [17.0, -21.6]);
    dw.setText('lvalid', `the sheet's own printed working uses 485 and 312 kN — this solve gives ${Math.abs(d.N[EL1]).toFixed(2)} and ${d.N[EL2].toFixed(2)}`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const g = panel.section('Given');
  panel.slider(g, s, 'F', 'F1d = F2d (kN)', 50, 600, 10, refresh, (v) => `${v} kN`);
  panel.slider(g, s, 'D', 'c) the built diameter (mm)', 40, 160, 1, refresh,
    (v) => `Ø${v} mm${v === 85 ? ' — the sheet’s value' : ''}`);
  const w = panel.section('What to look at');
  panel.toggle(w, s, 'sec', 'show the two bar sections', refresh);
  panel.toggle(w, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}
