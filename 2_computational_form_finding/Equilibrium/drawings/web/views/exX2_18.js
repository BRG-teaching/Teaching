/**
 * EX X · Aufgabe 18 — Maximum load of a structure
 * Structural Design II, FS 23, sheet "EX X — Additional Exercises", page 16.
 *
 * NUMBERING. The English sheet calls this "Additional Task 3, Transferring
 * vertical loads" — one of three blocks called "Task 3". German: Aufgabe 18,
 * used here (error E1). The English footer on this page reads "p. 16 / 15",
 * which is error E9: all sixteen English pages say "/ 15", and the German
 * "S. N / 16" is the correct one.
 *
 * TEXT (verbatim, English). "In additional task 1, you have determined the
 * maximum load of a column of the system illustrated below. Find the maximum
 * roof load g based on the maximum load of the two columns.
 *  a) First draw a possible internal force flow in the lower beam as well as
 *     the corresponding force diagram. Find the maximum force that the two
 *     crossbeams can apply on the longitudinal beam. The magnitude of the
 *     reaction forces corresponds to the compression load found in additional
 *     task 1. Use red for tension, blue for compression and green for support
 *     forces.
 *  b) Then use the force diagram to find the internal force flow and the
 *     maximum line load g acting on the two crossbeams."
 *
 * ============================================================================
 * THE ENGLISH TRANSLATION DROPPED THE NUMBER — sheet error E3.
 * "In additional task 1, you have determined the maximum load of a column" is a
 * broken cross-reference, and as printed the task cannot be started. The German
 * (Aufgabe 18) states the value outright:
 *   "Die maximale Belastung einer Stütze des nachfolgend abgebildeten Systems
 *    beträgt 400 kN."
 * The maximum load of a column is 400 kN. That is what this view uses.
 *
 * AND THE 400 kN IS A FRESH GIVEN, NOT A CARRY-OVER. It does not equal any
 * column load derivable from [G 13] on page 11, whose columns come out at
 * 314.11 kN (compression) and 64.11 kN (tension). Honouring the English
 * cross-reference instead would give C1 = C2 = 314.11 kN and g_d = 31.42 kN/m
 * — 21 % away from the German's answer. That disagreement is the proof that
 * the English reference is spurious rather than merely vague, and the view
 * offers both readings as a toggle rather than quietly picking one.
 * ============================================================================
 *
 * GIVEN. Column capacity 400 kN, for each of two columns. Both form diagrams
 * 1:100; both force diagrams 1 cm ≙ 100 kN.
 *
 * GEOMETRY, metres, origin per diagram = bottom-left corner of the elevation.
 *
 *   Längsbalken (longitudinal beam), upper diagram
 *     beam outline   0.000 … 15.245, depth 2.499
 *     A (pin)        0.125    reaction arrow, up
 *     C1 (load)      5.123    arrow down from above
 *     C2 (load)     10.122    arrow down from above
 *     B (roller)    15.120    reaction arrow, up
 *   Span A–B = 14.995 m; C1 at 4.998 m from A and C2 at 9.997 m from A — i.e.
 *   exactly the third points of a 15 m span.
 *
 *   Querbalken (crossbeam), lower diagram
 *     beam outline   0.000 … 9.997, depth 2.499
 *     line load g    0.000 … 9.997, over the full length
 *     C              4.998    a SINGLE support, at exact midspan, reaction up
 *
 * a) ANSWERS. With C1 and C2 at the third points of a 15.000 m span,
 *      A = C1 × (15.000 − 4.998)/15.000 + C2 × (15.000 − 9.997)/15.000
 *        = C × (0.6668 + 0.3335) = C   exactly,
 *    and B = C by symmetry. So each column load equals each crossbeam force,
 *    one for one — which is why the page can be run backwards from the column
 *    at all. Setting both columns to their 400 kN limit gives
 *      C1 = C2 = 400.0 kN.
 *
 *    Internal force flow, an arch-and-tie over the full 2.499 m depth:
 *      M at C1 = 400 × 4.998            = 1999.2 kNm
 *      chord force H = M / z = 1999.2 / 2.499 = 800.0 kN
 *      bottom tie                       = +800.0 kN T, full length
 *      inclined struts A → the node under C1, and B → the node under C2:
 *        slope 2.499 / 4.998 = 0.5000   → N = 800.0 × √1.25 = −894.4 kN C
 *      top strut between C1 and C2      = −800.0 kN C
 *    Check: the vertical component of the inclined strut is
 *    894.4 × (2.499/5.5875) = 400.0 kN = the reaction. Closes.
 *
 * b) ANSWERS. Each crossbeam is 9.997 m long, carries a uniform g over its
 *    whole length, and is held at ONE point at midspan: it is a pair of
 *    back-to-back 4.998 m cantilevers. So C = g × 9.997 m, and with C = 400 kN
 *      g_d = 400 / 9.997 = 40.01 kN/m → 40.0 kN/m.
 *
 *    Internal force flow: hogging over the whole length, so the TIE IS ON TOP
 *    and the compression arch runs below it.
 *      M at the support = g × 4.9985² / 2 = 40.0 × 12.4925 = 499.7 kNm (hogging)
 *      chord force      = 499.7 / 2.499   = 200.0 kN
 *    decaying parabolically to zero at each free end.
 *    Check: total load on one crossbeam = 40.0 × 9.997 = 399.9 kN = C; two
 *    crossbeams = 799.8 kN = A + B = 800 kN. Closes.
 *
 * The sheet prints no answers. Everything above is derived.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

// -------------------------------------------------------------- the model --

const LB_L = 15.245, LB_D = 2.499;     // Längsbalken
const LB_A = 0.125, LB_B = 15.120, LB_C1 = 5.123, LB_C2 = 10.122;
const CB_L = 9.997, CB_D = 2.499;      // Querbalken
const CB_S = 4.998;                    // its single support
const NSTRIP = 8;                      // strips the udl is divided into

// ---------------------------------------------------------------- layout --

const LX0 = 2.6, LY = 6.0, LM = 1.28;         // the longitudinal beam, top right
const CX0 = 2.6, CY = -8.2, CM = 1.28;        // the crossbeam, lower right
const LLX = -9.0, LLY = -2.4, SFD = 0.0080;   // force diagram a), left band
const QLX = 26.5, QLY = -10.5, SFQ = 0.0200;  // force diagram b), far right

const DEFAULTS = { cap: 400, eng: false, lbl: true, _k: 99 };

const K_LOAD = 2, K_FLOW = 3, K_FD = 4, K_CB = 5, K_G = 6, K_CBFLOW = 7,
      K_CHAIN = 8;

export const meta = {
  title: 'EX X · 18 — run the building backwards from one column',
  subtitle: 'Structural Design II · “EX X — Additional Exercises”, p. 16 · German Aufgabe 18 (the English sheet calls it “Additional Task 3”)',
  about: 'Most of this booklet pushes a load downwards. This page runs the other way: a column can take 400 kN, and the question is what roof load that permits. The chain is short and every link is exact. The two crossbeam forces sit at the third points of a fifteen-metre span, and the third points have the property that each reaction equals each load exactly — so the column limit walks straight through to the crossbeam force with no arithmetic at all. Then one crossbeam, nine metres of it on a single central support, turns that force into a load per metre. The English sheet makes none of this findable, because it dropped the 400 kN: it says "in additional task 1, you have determined the maximum load of a column", and no such task exists. The German states the number. And the two readings disagree by 21 %, which is how you know the English reference points nowhere.',
  result: (d) => [
    `column capacity ${d.cap.toFixed(2)} kN${d.eng ? ' — taken from [G 13] page 11 by honouring the English cross-reference' : ' — from the GERMAN sheet, which the English translation drops'}`,
    `a) C1 and C2 sit at the third points of the ${d.span.toFixed(3)} m span, so A = C × (${d.f1.toFixed(4)} + ${d.f2.toFixed(4)}) = C exactly → C1 = C2 = ${d.C.toFixed(2)} kN, A = B = ${d.RA.toFixed(2)} kN`,
    `a) M at C1 = ${d.C.toFixed(1)} × ${d.a1.toFixed(3)} = ${d.M1.toFixed(1)} kNm over z = ${LB_D.toFixed(3)} m → tie ${d.H.toFixed(1)} kN T, top strut ${d.H.toFixed(1)} kN C, inclined struts ${d.Nstrut.toFixed(1)} kN C (slope ${d.slope.toFixed(4)})`,
    `b) one crossbeam carries g over ${CB_L.toFixed(3)} m on one central support → g_d = ${d.C.toFixed(2)} / ${CB_L.toFixed(3)} = ${d.g.toFixed(3)} kN/m · hogging M = ${d.Mcb.toFixed(1)} kNm → chord ${d.Hcb.toFixed(1)} kN, TIE ON TOP`,
    `check: 2 × g × ${CB_L.toFixed(3)} = ${(2 * d.g * CB_L).toFixed(1)} kN = A + B = ${(d.RA + d.RB).toFixed(1)} kN ✓ · honouring the English reference instead gives g_d = 31.42 kN/m, 21 % away — which is why it is spurious`],
  frame: [[-26, -22], [30, 16]],
};

const STEPS = [
  { t: 'The exercise, and the number that was dropped', d: 'EX X page 16, German Aufgabe 18. A column can take a certain load; what roof load does that allow? The English opening sentence points at "additional task 1", which does not exist — so as printed the page cannot be started at all',
    detail: () => ['German: “Die maximale Belastung einer Stütze … beträgt 400 kN”',
                   'and 400 kN is a FRESH given: it equals no column load anywhere else in the booklet',
                   'page 11\'s columns come out at 314.11 and 64.11 kN, so the English reference is not merely vague — it is wrong'],
    take: 'the toggle in the panel runs the whole page on the English reading instead. The two answers differ by 21 %' },
  { t: 'The longitudinal beam', d: 'top left: the Längsbalken, fifteen metres between its supports, with the two crossbeams landing on it. Look where they land — 4.998 and 9.997 m along, which is exactly the third points',
    detail: (d) => [`span A–B = ${d.span.toFixed(3)} m · C1 at ${d.a1.toFixed(3)} m, C2 at ${d.a2.toFixed(3)} m from A`,
                    `beam depth ${LB_D.toFixed(3)} m`,
                    `${d.a1.toFixed(3)} / ${d.span.toFixed(3)} = ${(d.a1 / d.span).toFixed(4)} and ${d.a2.toFixed(3)} / ${d.span.toFixed(3)} = ${(d.a2 / d.span).toFixed(4)} — the third points to four figures`] },
  { t: 'Third points, and why they matter', d: 'the arithmetic collapses. Each reaction is C times (1 − a1/L) plus C times (1 − a2/L), and at the third points those two fractions are 2/3 and 1/3 — which add to exactly one. So the reaction equals the load, one for one, and the column limit walks straight through',
    detail: (d) => [`A = C × (1 − ${(d.a1 / d.span).toFixed(4)}) + C × (1 − ${(d.a2 / d.span).toFixed(4)}) = C × ${(d.f1 + d.f2).toFixed(4)}`,
                    `so with the columns at their ${d.cap.toFixed(0)} kN limit, C1 = C2 = ${d.C.toFixed(2)} kN`,
                    `A = B = ${d.RA.toFixed(2)} kN — the same number again`],
    take: 'this is why the page is solvable backwards. Move the loads off the third points and you would have to solve for C instead of reading it off' },
  { t: 'The flow inside the Längsbalken', d: 'a beam that deep does not bend, it arches. Two inclined struts from the supports up to the points under the loads, a flat strut between them, and one tie along the whole soffit holding the feet apart',
    detail: (d) => [`M at C1 = ${d.C.toFixed(1)} × ${d.a1.toFixed(3)} = ${d.M1.toFixed(1)} kNm, over z = ${LB_D.toFixed(3)} m → H = ${d.H.toFixed(1)} kN`,
                    `bottom tie ${d.H.toFixed(1)} kN T (constant) · top strut ${d.H.toFixed(1)} kN C`,
                    `inclined struts: slope ${LB_D.toFixed(3)} / ${d.a1.toFixed(3)} = ${d.slope.toFixed(4)} → ${d.Nstrut.toFixed(1)} kN C`],
    take: 'the tie is the same size as the flat top strut, and the inclined struts are bigger than both. The steepest member always is' },
  { t: 'a) The force diagram', d: 'right: the four external forces laid off in the order they occur along the beam, and a pole set H to one side. Every ray from the pole is parallel to its own panel of the arch, and the ray’s length IS that panel’s force',
    detail: (d) => [`load line: +${d.RA.toFixed(1)} − ${d.C.toFixed(1)} − ${d.C.toFixed(1)} + ${d.RB.toFixed(1)} = ${d.sumV.toExponential(1)} kN ✓`,
                    `pole distance H = ${d.H.toFixed(1)} kN — at 1 cm ≙ 100 kN that is ${(d.H / 100).toFixed(2)} cm`,
                    `the middle ray is horizontal, because the shear between the two loads is zero`],
    take: 'a horizontal ray means a flat panel means zero shear. The force diagram tells you the shape before you draw it' },
  { t: 'b) The crossbeam', d: 'bottom: the Querbalken. Nine and a half metres of it, a uniform roof load along the whole length — and ONE support, at midspan. It is not a beam, it is two cantilevers back to back',
    detail: (d) => [`length ${CB_L.toFixed(3)} m, single support at ${CB_S.toFixed(3)} m — exact midspan`,
                    `depth ${CB_D.toFixed(3)} m, the same as the longitudinal beam`,
                    `everything it carries goes into that one point, so C = g × ${CB_L.toFixed(3)}`] },
  { t: 'b) The line load', d: 'and there is the answer to the page. One division: the force the column can take, divided by the length that delivers it',
    detail: (d) => [`g_d = C / L = ${d.C.toFixed(2)} / ${CB_L.toFixed(3)} = ${d.g.toFixed(4)} kN/m`,
                    `check: ${d.g.toFixed(3)} × ${CB_L.toFixed(3)} = ${(d.g * CB_L).toFixed(2)} kN = C ✓`,
                    d.eng ? 'on the English reading, from page 11\'s 314.11 kN column' : 'on the German\'s 400 kN column'],
    take: 'drag the column capacity in the panel and watch g_d follow it exactly. The whole page is one straight line' },
  { t: 'b) And the flow turns over', d: 'the crossbeam hogs from end to end — the support is in the middle and the load is everywhere — so its tie is on TOP and its compression arch runs underneath, touching the soffit right at the column. The opposite of the beam above it',
    detail: (d) => [`M at the support = g × ${(CB_S).toFixed(4)}² / 2 = ${d.g.toFixed(2)} × ${(CB_S * CB_S / 2).toFixed(4)} = ${d.Mcb.toFixed(1)} kNm hogging`,
                    `chord = ${d.Mcb.toFixed(1)} / ${CB_D.toFixed(3)} = ${d.Hcb.toFixed(1)} kN — tie on top, arch below`,
                    `it decays parabolically to zero at each free end, because a cantilever's moment does`],
    take: 'two beams, one on top of the other, and their reinforcement goes in opposite faces. That is what a support in the middle does' },
  { t: 'The chain, closed', d: 'and the check. Two crossbeams deliver two column loads to the longitudinal beam, which delivers two more to the ground. Everything that goes in comes out, and it does so at the kilonewton',
    detail: (d) => [`in:  2 × g × ${CB_L.toFixed(3)} = 2 × ${(d.g * CB_L).toFixed(2)} = ${(2 * d.g * CB_L).toFixed(2)} kN`,
                    `out: A + B = ${d.RA.toFixed(2)} + ${d.RB.toFixed(2)} = ${(d.RA + d.RB).toFixed(2)} kN`,
                    `and every one of those four numbers is the same ${d.C.toFixed(2)} kN — the column limit, four times over`],
    take: 'the German gives 40.0 kN/m and the English cross-reference would give 31.4. A page that cannot be started is not a hard page, it is an incomplete one' },
];

// ------------------------------------------------------------------ maths --

function compute(s) {
  const C = s.eng ? 314.11 : s.cap;
  const span = LB_B - LB_A;
  const a1 = LB_C1 - LB_A, a2 = LB_C2 - LB_A;
  const f1 = 1 - a1 / span, f2 = 1 - a2 / span;
  const RA = C * f1 + C * f2;
  const RB = 2 * C - RA;
  const sumV = RA + RB - 2 * C;

  // a) the arch-and-tie over the full depth
  const M1 = RA * a1;                       // = C × a1 when the loads are at the thirds
  const H = M1 / LB_D;
  const slope = LB_D / a1;
  const Nstrut = H * Math.sqrt(1 + slope * slope);

  // b) the crossbeam
  const g = C / CB_L;
  const Mcb = (g * CB_S * CB_S) / 2;
  const Hcb = Mcb / CB_D;

  // the crossbeam's udl, divided into strips for its force diagram
  const w = CB_L / NSTRIP;
  const strips = Array.from({ length: NSTRIP }, (_, i) => ({
    x: (i + 0.5) * w, F: -g * w,
  }));
  const ext = [...strips, { x: CB_S, F: C }].sort((p, q) => p.x - q.x);
  const shear = [0];
  ext.forEach((e) => shear.push(shear[shear.length - 1] + e.F));
  const Mat = (x) => ext.reduce((t, e) => t + (e.x < x - 1e-9 ? e.F * (x - e.x) : 0), 0);
  const nodes = [0, ...ext.map((e) => e.x), CB_L];
  const Ms = nodes.map(Mat);
  const Mmin = Math.min(...Ms), Mmax = Math.max(...Ms);
  const swing = Math.max(Mmax - Mmin, 1e-9);
  const Hq = swing / CB_D;
  const funi = nodes.map((x, i) => [x, (Ms[i] - Mmin) / Hq]);

  return { cap: s.cap, eng: s.eng, C, span, a1, a2, f1, f2, RA, RB, sumV,
           M1, H, slope, Nstrut, g, Mcb, Hcb,
           ext, shear, funi, Hq, Mmax, Mmin };
}

// ------------------------------------------------------------------- view --

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const lx = (x, z) => [LX0 + x * LM, LY + z * LM];
  const qx = (x, z) => [CX0 + x * CM, CY + z * CM];

  dw.label('t_lb', '', { cls: 'title', flash: false });
  dw.label('t_fd', '', { cls: 'title', flash: false });
  dw.label('t_cb', '', { cls: 'title', flash: false });
  dw.label('t_qfd', '', { cls: 'point', flash: false });

  // ---- a) the longitudinal beam
  dw.strokes('lbOut', 4, { intro: 1, w: dw.W.str, color: PAL.black });
  for (const n of ['A', 'B']) {
    dw.disk(`sup${n}`, { intro: 1, r: dw.W.disk });
    dw.strokes(`hat${n}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.arrow(`re${n}`, { intro: K_LOAD, color: PAL.green, ...NARR });
    dw.label(`lre${n}`, '', { cls: 'num', intro: K_LOAD, color: PAL.green });
  }
  for (let i = 0; i < 2; i++) {
    dw.arrow(`cf${i}`, { intro: K_LOAD, color: PAL.green, ...ARR });
    dw.label(`lcf${i}`, '', { cls: 'num', intro: K_LOAD, color: PAL.green });
  }
  dw.seg('lbTie', { intro: K_FLOW, w: dw.W.bar, color: PAL.red });
  dw.label('llbTie', '', { cls: 'num', intro: K_FLOW, color: PAL.red });
  for (let i = 0; i < 3; i++) {
    dw.seg(`arch${i}`, { intro: K_FLOW, w: dw.W.bar, color: PAL.blue });
    dw.label(`larch${i}`, '', { cls: 'num', intro: K_FLOW, color: PAL.blue,
      when: (st) => st.lbl });
  }
  dw.seg('dimZ', { intro: K_FLOW, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('ldimZ', '', { intro: K_FLOW, flash: false, color: PAL.grey });

  // ---- a) its force diagram
  for (let i = 0; i < 4; i++) {
    dw.arrow(`ff${i}`, { intro: K_FD, color: PAL.green, ...NARR });
  }
  dw.disk('pole', { intro: K_FD, r: dw.W.disk * 0.8 });
  dw.label('lpole', 'o', { cls: 'num', intro: K_FD, when: (st) => st.lbl });
  dw.seg('dimH', { intro: K_FD, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lH', '', { intro: K_FD, flash: false, color: PAL.grey });
  for (let i = 0; i < 3; i++) {
    dw.seg(`ray${i}`, { intro: K_FD, w: dw.W.ray, color: PAL.blue });
    dw.link(`arch${i}`, `ray${i}`, `larch${i}`);
  }

  // ---- b) the crossbeam
  dw.strokes('cbOut', 4, { intro: K_CB, w: dw.W.str, color: PAL.black });
  dw.seg('qbar', { intro: K_CB, w: dw.W.thin, color: PAL.green });
  dw.arrows('qarr', 17, { intro: K_CB, w: dw.W.thin, color: PAL.green,
    headLen: dw.W.narrow.headLen * 0.7, headW: dw.W.narrow.headW * 0.7 });
  dw.label('lq', '', { cls: 'num', intro: K_G, color: PAL.green });
  dw.disk('cbSup', { intro: K_CB, r: dw.W.disk });
  dw.strokes('cbHat', 5, { intro: K_CB, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.arrow('cbRe', { intro: K_CB, color: PAL.green, ...ARR });
  dw.label('lcbRe', '', { cls: 'num', intro: K_CB, color: PAL.green });
  dw.seg('cbTie', { intro: K_CBFLOW, w: dw.W.bar, color: PAL.red });
  dw.label('lcbTie', '', { cls: 'num', intro: K_CBFLOW, color: PAL.red });
  dw.strokes('cbArch', nodesLen(), { intro: K_CBFLOW, w: dw.W.bar, color: PAL.blue,
    cap: false });
  dw.label('lcbArch', '', { cls: 'num', intro: K_CBFLOW, color: PAL.blue });

  // ---- b) its force diagram
  for (let i = 0; i < NSTRIP + 1; i++) {
    dw.arrow(`qf${i}`, { intro: K_CBFLOW, color: PAL.green, ...NARR, flash: false });
  }
  dw.disk('qpole', { intro: K_CBFLOW, r: dw.W.disk * 0.8 });
  dw.strokes('qray', NSTRIP + 2, { intro: K_CBFLOW, w: dw.W.ray, color: PAL.blue,
    cap: false });
  dw.label('lqH', '', { intro: K_CBFLOW, flash: false, color: PAL.grey });

  dw.label('lchain', '', { cls: 'point', intro: K_CHAIN, flash: false, color: PAL.green });

  dw.instant('t_lb', 't_fd', 't_cb', 't_qfd');
  dw.ghostable('ff0', 'ff1', 'ff2', 'ff3');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    dw.setLabel('t_lb', [LX0 + (LB_L / 2) * LM, 13.6]);
    dw.setText('t_lb', `Längsbalken 1:100 — ${LB_L.toFixed(2)} m, ${LB_D.toFixed(3)} m deep`);
    dw.setLabel('t_fd', [LLX - 3.2, 1.2]);
    dw.setText('t_fd', `Kräfteplan a) — 1 unit ≙ ${(1 / SFD).toFixed(1)} kN`);
    dw.setLabel('t_cb', [CX0 + (CB_L / 2) * CM, -0.4]);
    dw.setText('t_cb', `Querbalken 1:100 — ONE central support`);
    dw.setLabel('t_qfd', [QLX - 2.4, -3.4]);
    dw.setText('t_qfd', `Kräfteplan b) — the udl in ${NSTRIP} strips`);

    // ---- the longitudinal beam
    const bx = [lx(0, 0), lx(LB_L, 0), lx(LB_L, LB_D), lx(0, LB_D)];
    dw.setStrokes('lbOut', bx.map((p, i) => [p, bx[(i + 1) % 4]]));
    for (const [n, x, R] of [['A', LB_A, d.RA], ['B', LB_B, d.RB]]) {
      const p = lx(x, 0);
      dw.setDisk(`sup${n}`, p);
      dw.setStrokes(`hat${n}`, V.hatch([p[0] - 1.3, p[1] - 0.5], [p[0] + 1.3, p[1] - 0.5],
        -1, 0.8, 5));
      dw.setArrow(`re${n}`, [p[0], p[1] - 4.0], [p[0], p[1] - 1.0]);
      dw.setLabel(`lre${n}`, [p[0] + (n === 'A' ? -2.9 : 2.9), p[1] - 2.8]);
      dw.setText(`lre${n}`, `${R.toFixed(1)}`);
    }
    [LB_C1, LB_C2].forEach((x, i) => {
      const p = lx(x, LB_D);
      dw.setArrow(`cf${i}`, [p[0], p[1] + 3.0], [p[0], p[1] + 0.5]);
      dw.setLabel(`lcf${i}`, [p[0] + 3.4, p[1] + 2.1]);
      dw.setText(`lcf${i}`, `C${i + 1} = ${d.C.toFixed(1)}`);
    });
    // the arch: A → under C1 → under C2 → B, and the tie along the soffit
    const nA = lx(LB_A, 0), n1 = lx(LB_C1, LB_D), n2 = lx(LB_C2, LB_D), nB = lx(LB_B, 0);
    const seg = [[nA, n1], [n1, n2], [n2, nB]];
    const nAmt = [d.Nstrut, d.H, d.Nstrut];
    seg.forEach(([a, b], i) => {
      dw.setSeg(`arch${i}`, a, b);
      const nb = V.mul(V.unit(V.perp(V.sub(b, a))), i === 1 ? 1.5 : -1.9);
      dw.setLabel(`larch${i}`, V.add(V.mid(a, b), nb));
      dw.setText(`larch${i}`, `${nAmt[i].toFixed(1)}`);
    });
    dw.setSeg('lbTie', nA, nB);
    dw.setLabel('llbTie', V.add(V.mid(nA, nB), [0, -1.4]));
    dw.setText('llbTie', `tie ${d.H.toFixed(1)} kN T`);
    dw.setSeg('dimZ', lx(LB_L + 0.6, 0), lx(LB_L + 0.6, LB_D));
    dw.setLabel('ldimZ', V.add(lx(LB_L + 0.6, LB_D / 2), [2.4, 0]));
    dw.setText('ldimZ', `z = ${LB_D.toFixed(3)} m`);

    // ---- a) the force diagram
    const extA = [{ x: LB_A, F: d.RA }, { x: LB_C1, F: -d.C },
                  { x: LB_C2, F: -d.C }, { x: LB_B, F: d.RB }];
    let y = LLY;
    const pts = [[LLX, y]];
    extA.forEach((e, i) => {
      const y2 = y + e.F * SFD;
      dw.setArrow(`ff${i}`, [LLX, y], [LLX, y2]);
      y = y2;
      pts.push([LLX, y]);
    });
    const O = [LLX - d.H * SFD, LLY];
    dw.setDisk('pole', O);
    dw.setLabel('lpole', V.add(O, [-1.3, 0.9]));
    const ylo = Math.min(...pts.map((q) => q[1])) - 1.5;
    dw.setSeg('dimH', [O[0], ylo], [LLX, ylo]);
    dw.setLabel('lH', [(O[0] + LLX) / 2, ylo - 0.9]);
    void ARR;
    dw.setText('lH', `H = ${d.H.toFixed(1)} kN`);
    for (let i = 0; i < 3; i++) dw.setSeg(`ray${i}`, O, pts[i + 1]);

    // ---- b) the crossbeam
    const qb = [qx(0, 0), qx(CB_L, 0), qx(CB_L, CB_D), qx(0, CB_D)];
    dw.setStrokes('cbOut', qb.map((p, i) => [p, qb[(i + 1) % 4]]));
    dw.setSeg('qbar', qx(0, CB_D + 1.7), qx(CB_L, CB_D + 1.7));
    dw.setArrows('qarr', Array.from({ length: 17 }, (_, i) => {
      const x = (CB_L * i) / 16;
      return [qx(x, CB_D + 1.7), qx(x, CB_D + 0.25)];
    }));
    dw.setLabel('lq', qx(CB_L / 2, CB_D + 2.5));
    dw.setText('lq', `g_d = ${d.g.toFixed(3)} kN/m`);
    const sp = qx(CB_S, 0);
    dw.setDisk('cbSup', sp);
    dw.setStrokes('cbHat', V.hatch([sp[0] - 1.3, sp[1] - 0.5], [sp[0] + 1.3, sp[1] - 0.5],
      -1, 0.8, 5));
    dw.setArrow('cbRe', [sp[0], sp[1] - 4.4], [sp[0], sp[1] - 1.1]);
    dw.setLabel('lcbRe', [sp[0] + 3.4, sp[1] - 3.0]);
    dw.setText('lcbRe', `C = ${d.C.toFixed(1)} kN`);
    // hogging: the tie is on TOP, the arch below it
    dw.setSeg('cbTie', qx(0, CB_D), qx(CB_L, CB_D));
    dw.setLabel('lcbTie', [CX0 - 5.0, qx(0, CB_D)[1]]);
    dw.setText('lcbTie', `tie on TOP: ${d.Hcb.toFixed(1)} kN T`);
    const fp = d.funi.map(([x, z]) => qx(x, z));
    const fs = fp.slice(0, -1).map((p, i) => [p, fp[i + 1]]);
    while (fs.length < nodesLen()) fs.push([fp[0], fp[0]]);
    dw.setStrokes('cbArch', fs.slice(0, nodesLen()));
    dw.setLabel('lcbArch', [CX0 + 1.4, qx(0, 0)[1] - 1.6]);
    dw.setText('lcbArch', `arch below: ${d.Hcb.toFixed(1)} kN C`);

    // ---- b) its force diagram
    let qy = QLY;
    const qpts = [[QLX, qy]];
    d.ext.forEach((e, i) => {
      const y2 = qy + e.F * SFQ;
      dw.setArrow(`qf${i}`, [QLX, qy], [QLX, y2]);
      qy = y2;
      qpts.push([QLX, qy]);
    });
    const QO = [QLX - d.Hq * SFQ, QLY];
    dw.setDisk('qpole', QO);
    const qr = qpts.map((p) => [QO, p]);
    while (qr.length < NSTRIP + 2) qr.push([QO, QO]);
    dw.setStrokes('qray', qr.slice(0, NSTRIP + 2));
    dw.setLabel('lqH', [(QO[0] + QLX) / 2, -16.6]);
    dw.setText('lqH', `H = ${d.Hq.toFixed(1)} kN`);

    dw.setLabel('lchain', [12.0, -19.8]);
    dw.setText('lchain', `chain: 2 × ${d.g.toFixed(3)} × ${CB_L.toFixed(3)} = ${(2 * d.g * CB_L).toFixed(2)} kN in = A + B = ${(d.RA + d.RB).toFixed(2)} kN out`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const g = panel.section('Given');
  panel.slider(g, s, 'cap', 'the column’s capacity (kN)', 100, 800, 10, refresh,
    (v) => (s.eng ? '314.11 — the English reading' : `${v} kN${v === 400 ? ' — the German sheet' : ''}`));
  panel.toggle(g, s, 'eng', 'honour the English cross-reference instead (314.11 kN from p.11)', refresh);
  const w = panel.section('What to look at');
  panel.toggle(w, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}

/** How many strokes the crossbeam's funicular needs: one per interval between
    its nodes (both ends, every strip, and the support). */
function nodesLen() {
  return NSTRIP + 3;
}
