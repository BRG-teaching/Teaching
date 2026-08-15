/**
 * EX X · Aufgabe 10.2 — Additional Dimensioning (reinforcement + bearing)
 * Structural Design II, FS 23, sheet "EX X — Additional Exercises", page 8.
 *
 * NUMBERING. The English sheet calls this block "Task 2"; that is one of two
 * blocks with that label. The German sheet calls it Aufgabe 10.2, and the
 * German numbering is used here (sheet error E1).
 *
 * TEXT (verbatim, English).
 *  "a) Dimension the reinforcement within the reinforced concrete for the
 *      relevant tension force of task 2 a). Use steel S235 to calculate the
 *      diameter and round the result off to mm. (Round up!)
 *   b) Verify whether the frame in task 2 b) can keep up with the relevant
 *      compression force. The slab is 8 cm thick and is constructed in concrete
 *      C12/15. Presume the force would affect the frame over the width of
 *      10 cm."
 *
 * BROKEN REFERENCES — sheet error E4, carried openly in the view.
 * There is no "task 2 a)" or "task 2 b)" anywhere in the booklet that supplies
 * a force; every block called "Task 2" was checked. The German version reads
 * "Dimensionieren Sie die Bewehrung … für die massgebende Zugkraft aus
 * **Aufgabe 10.1**" — the Q_d = 35 kN earthquake frame immediately above on the
 * same page — and it has **no part b) at all**. The English b) is an orphan:
 * its 8 cm × 10 cm C12/15 bearing capacity is perfectly computable, but which
 * force it is to be checked against cannot be decided from the sheet. The view
 * therefore computes the capacity and then offers the three candidate demands
 * side by side rather than quietly picking one.
 *
 * MATERIAL CONSTANTS (compendium 2.5 + 2.6):
 *   S235     f_tk = f_ck = 235 N/mm² · γ_M = 1.05 → f_d  = 223.8095 N/mm²
 *   C12/15   f_ck = 12 N/mm²          · γ_M = 1.50 → f_cd = 8.0000 N/mm²
 *   circle   A = π D² / 4  ·  D = 2 √(A/π)
 * Steel is 27.98 times stronger than this concrete, which is the reason the
 * two answers on this page look so different in size.
 *
 * a) ANSWER, taking the German referent [G 10.1]. The governing tension there
 *    is member 3, P1–P3 = 57.376 kN (recomputed in exX2_10_1.js; the same
 *    number came out of an independent numpy least-squares solve).
 *      A_req = 57 376 / 223.8095 = 256.36 mm²
 *      D     = 2 √(256.36 / π)   = 18.067 mm  →  19 mm  (round UP)
 *    Independent check: a 19 mm bar has A = 283.53 mm² and N_allow =
 *    283.53 × 223.8095 = 63.45 kN > 57.376 kN, while an 18 mm bar gives
 *    only 56.96 kN — 0.42 kN short. 19 mm is therefore the FIRST whole
 *    millimetre that works, so the "round up" instruction is not cosmetic.
 *
 * b) ANSWER, the part that is determinable whatever the referent.
 *      A     = 80 × 100 = 8000 mm²
 *      f_cd  = 12 / 1.5 = 8.000 N/mm²
 *      N_all = 8000 × 8.000 = 64 000 N = 64.00 kN
 *    Against [G 10.1]'s own governing compression of 76.393 kN this FAILS at
 *    119.4 % utilisation. Against the slab chord P3–P4 = 35.299 kN it passes
 *    at 55.2 %; against [G 8.2] b)'s largest compression of 42.845 kN it
 *    passes at 66.9 %. Which of the three the sheet meant cannot be decided.
 *
 * Nothing on this page is printed with its answer; everything above is derived.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

// ------------------------------------------------------------- constants --

const F_TK = 235, GAM_S = 1.05;        // S235, compendium 2.5
const F_CK = 12, GAM_C = 1.50;         // C12/15
const FD = F_TK / GAM_S;               // 223.8095 N/mm²
const FCD = F_CK / GAM_C;              // 8.0000 N/mm²

// the three forces on this sheet that b) could conceivably mean
const CAND = [
  { n: 76.393, why: 'member 2 (P2–P3) of Aufgabe 10.1 — the same page, the German referent' },
  { n: 35.299, why: 'member 5 (P3–P4), the slab chord of Aufgabe 10.1 — the force that is actually IN the slab' },
  { n: 42.845, why: 'member 7 of Aufgabe 8.2 b) — if "task 2 b)" meant the frame on page 6' },
];

// ---------------------------------------------------------------- layout --

// the two sections are drawn at DIFFERENT scales, stated on each: a 19 mm bar
// beside a 100 mm bearing at one scale would be a dot beside a block, and the
// point of a) is the millimetre between 18 and 19
const BARC = [-20.5, -4.4], BARS = 0.32;    // bar section: centre, units per mm
const CONC = [-7.0, -4.0], CONS = 0.100;    // bearing area: centre, units per mm
const CX0 = 4.0, CKN = 0.185;               // chart origin x, units per kN
const SNM = 0.088;                          // and units per N/mm² for rows 1–2
const ROW = [8.2, 5.4, 1.4, -2.8, -7.8];    // chart rows
const BH = 1.3;                             // half height of a chart bar
const NCIRC = 40;

const DEFAULTS = {
  Nt: 57.376,          // a) the tension the German referent supplies
  D: 19,               // a) the chosen bar, in whole mm
  Nc: 76.393,          // b) the compression, defaulting to 10.1's governing one
  th: 80, wd: 100,     // b) the bearing area, mm
  lbl: true, _k: 99,
};

export const meta = {
  title: 'EX X · 10.2 — one bar, one bearing, and a reference that points nowhere',
  subtitle: 'Structural Design II · “EX X — Additional Exercises”, p. 8 · German Aufgabe 10.2 (the English sheet calls it “Task 2”)',
  about: 'Two sizing calculations that take four lines each — and a cross-reference that makes one of them unanswerable as printed. Part a) wants a reinforcing bar for “the relevant tension force of task 2 a)”; no such task exists in the booklet, but the German sheet says Aufgabe 10.1, the earthquake frame at the top of the same page, whose governing tension is 57.38 kN. That gives 18.07 mm, rounded UP to 19 mm — and the rounding matters, because an 18 mm bar is 0.4 kN short. Part b) does not exist in the German sheet at all. Its concrete bearing capacity, 64.00 kN, is perfectly computable; what cannot be established is which force to check it against, so all three candidates are drawn against the limit and none is quietly picked.',
  result: (d) => [
    `design strengths: S235 f_d = ${FD.toFixed(4)} N/mm² · C12/15 f_cd = ${FCD.toFixed(4)} N/mm² — steel is ${(FD / FCD).toFixed(2)}× stronger`,
    `a) N = ${d.Nt.toFixed(3)} kN → A_req = ${d.Areq.toFixed(2)} mm² → D = ${d.Dexact.toFixed(3)} mm → round UP to ${d.Dmin} mm (${d.Dmin - 1} mm gives only ${d.Nbelow.toFixed(2)} kN)`,
    `a) the chosen Ø${d.D} mm bar: A = ${d.Abar.toFixed(2)} mm², N_allow = ${d.Nbar.toFixed(2)} kN → ${(100 * d.Nt / d.Nbar).toFixed(1)} % utilised — ${d.Nbar >= d.Nt ? 'PASSES' : 'FAILS'}`,
    `b) ${d.th} × ${d.wd} mm of C12/15 → N_allow = ${d.Ncap.toFixed(2)} kN · against ${d.Nc.toFixed(3)} kN that is ${(100 * d.Nc / d.Ncap).toFixed(1)} % — ${d.Ncap >= d.Nc ? 'PASSES' : 'FAILS'}`,
    `b) the sheet never says which force. 76.39 kN fails · 42.85 kN passes · 35.30 kN passes — the reference is broken, not merely vague`],
  frame: [[-26, -22], [30, 16]],
};

const STEPS = [
  { t: 'The exercise', d: 'EX X page 8, German Aufgabe 10.2. Two sizing checks — and two cross-references that point at tasks which do not exist. The English text says “task 2 a)” and “task 2 b)”; every block called “Task 2” in the booklet was checked and none of them supplies a force',
    detail: () => ['German a): “… für die massgebende Zugkraft aus Aufgabe 10.1” — the frame at the top of the same page',
                   'German b): there is NO part b). The English b) is an orphan',
                   'so a) is answerable once the German is read, and b) only half is'],
    take: 'a broken cross-reference is not a small error: it is the difference between a four-line calculation and no calculation at all' },
  { t: 'Two materials, two strengths', d: 'right: the design strengths, drawn to the same scale. Both come from the compendium, not from the sheet — divide the characteristic strength by its partial factor. The picture is the whole story of reinforced concrete: the steel bar is a stub of material doing what a slab-sized lump of concrete cannot',
    detail: () => [`S235:    f_d  = ${F_TK} / ${GAM_S} = ${FD.toFixed(4)} N/mm²`,
                   `C12/15:  f_cd = ${F_CK} / ${GAM_C} = ${FCD.toFixed(4)} N/mm²`,
                   `ratio ${(FD / FCD).toFixed(2)} : 1`],
    take: 'the two partial factors differ as well — 1.05 for a rolled bar, 1.50 for concrete cast on site, because one is known far better than the other' },
  { t: 'a) The demand', d: 'reading the German, the tension to size for is the largest tension of Aufgabe 10.1 — member 3, the diagonal running up the windward leg of the earthquake frame. That was 57.38 kN. Drag the slider to see any other value',
    detail: (d) => [`N = ${d.Nt.toFixed(3)} kN tension`,
                    'from Aufgabe 10.1 member 3 (P1–P3): the bar that stops the windward foot lifting off',
                    'the English "task 2 a)" supplies nothing at all'] },
  { t: 'a) The area, then the diameter', d: 'left: the bar drawn to scale. Divide the force by the design strength to get the area you need, then turn an area into a diameter. The dashed circle is the exact answer; it is almost never a whole number of millimetres',
    detail: (d) => [`A_req = N / f_d = ${(d.Nt * 1000).toFixed(0)} / ${FD.toFixed(4)} = ${d.Areq.toFixed(2)} mm²`,
                    `D = 2 √(A/π) = 2 √(${d.Areq.toFixed(2)} / π) = ${d.Dexact.toFixed(3)} mm`,
                    `you cannot buy that bar`],
    take: 'area is what carries the force; diameter is only how it is sold' },
  { t: 'a) Round UP, and see why', d: 'the sheet says round up, in brackets, with an exclamation mark — and it is right to. The next millimetre DOWN is not "close enough": it is a bar that fails. The solid circle is the size to order',
    detail: (d) => [`Ø${d.Dmin - 1} mm: A = ${d.Abelow.toFixed(2)} mm² → ${d.Nbelow.toFixed(2)} kN — ${(d.Nt - d.Nbelow).toFixed(2)} kN SHORT`,
                    `Ø${d.Dmin} mm: A = ${d.Amin.toFixed(2)} mm² → ${d.Nmin.toFixed(2)} kN — passes, ${(100 * d.Nt / d.Nmin).toFixed(1)} % utilised`,
                    `chosen here: Ø${d.D} mm → ${d.Nbar.toFixed(2)} kN (${d.Nbar >= d.Nt ? 'ok' : 'NOT ENOUGH'})`],
    take: 'rounding a diameter down by one millimetre throws away 5 % of the area — the area goes as the square' },
  { t: 'b) The bearing area', d: 'left: the other calculation, and it is even shorter. A slab 8 cm thick, a force spread over 10 cm of width: that is a rectangle of concrete, and a rectangle of concrete has one number attached to it',
    detail: (d) => [`A = ${d.th} × ${d.wd} = ${d.Aconc.toFixed(0)} mm²`,
                    `N_allow = A × f_cd = ${d.Aconc.toFixed(0)} × ${FCD.toFixed(3)} = ${d.Ncap.toFixed(2)} kN`,
                    `for comparison, the Ø${d.D} mm steel bar carries ${d.Nbar.toFixed(2)} kN out of only ${d.Abar.toFixed(1)} mm²`],
    take: '8000 mm² of concrete and 284 mm² of steel carry almost exactly the same force. That ratio is the reason reinforced concrete exists' },
  { t: 'b) And it fails', d: 'checked against Aufgabe 10.1’s own governing compression — 76.39 kN in the knee — the bearing is over-utilised. Not by a rounding margin: by nineteen per cent',
    detail: (d) => [`${d.Nc.toFixed(3)} / ${d.Ncap.toFixed(2)} = ${(100 * d.Nc / d.Ncap).toFixed(1)} %`,
                    d.Ncap >= d.Nc ? 'passes' : `FAILS — it needs ${(d.Nc * 1000 / FCD).toFixed(0)} mm², i.e. ${(d.Nc * 1000 / FCD / d.th).toFixed(1)} mm of width instead of ${d.wd}`,
                    `widen the bearing to ${(d.Nc * 1000 / FCD / d.th).toFixed(0)} mm, or thicken the slab to ${(d.Nc * 1000 / FCD / d.wd).toFixed(0)} mm`],
    take: 'concrete crushing is a bearing problem, and bearing problems are solved with area, not with strength' },
  { t: 'Which force did it mean?', d: 'and here the honesty. Part b) does not exist in the German sheet, and the English reference points at nothing, so the demand side is a guess. The three forces on this booklet that anyone could reasonably mean are drawn against the same 64 kN line — and they do not agree about whether it passes',
    detail: (d) => CAND.map((c) => `${c.n.toFixed(2)} kN → ${(100 * c.n / d.Ncap).toFixed(1)} % ${c.n <= d.Ncap ? 'passes' : 'FAILS'} — ${c.why}`),
    take: 'the capacity is a fact and the demand is a guess. Say which is which rather than printing one number and hoping' },
];

// ------------------------------------------------------------------ maths --

const areaOf = (D) => (Math.PI * D * D) / 4;
const capOf = (D) => (areaOf(D) * FD) / 1000;              // kN

function compute(s) {
  const Areq = (s.Nt * 1000) / FD;
  const Dexact = 2 * Math.sqrt(Areq / Math.PI);
  const Dmin = Math.max(1, Math.ceil(Dexact - 1e-9));
  const Abelow = areaOf(Dmin - 1), Nbelow = capOf(Dmin - 1);
  const Amin = areaOf(Dmin), Nmin = capOf(Dmin);
  const Abar = areaOf(s.D), Nbar = capOf(s.D);

  const Aconc = s.th * s.wd;
  const Ncap = (Aconc * FCD) / 1000;

  return { Nt: s.Nt, D: s.D, Nc: s.Nc, th: s.th, wd: s.wd,
           Areq, Dexact, Dmin, Abelow, Nbelow, Amin, Nmin, Abar, Nbar,
           Aconc, Ncap,
           utilA: (100 * s.Nt) / Nbar, utilB: (100 * s.Nc) / Ncap,
           okA: Nbar >= s.Nt, okB: Ncap >= s.Nc };
}

const ring = (c, r, n) => Array.from({ length: n }, (_, i) => {
  const a = (2 * Math.PI * i) / n;
  return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
});

// ------------------------------------------------------------------- view --

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const NARR = dw.W.narrow;

  const OKA = { final: (dd) => (dd.okA ? PAL.green : PAL.red) };
  const OKB = { final: (dd) => (dd.okB ? PAL.green : PAL.red) };

  dw.label('t_bar', '', { cls: 'title', flash: false });
  dw.label('t_conc', '', { cls: 'title', flash: false });
  dw.label('t_chart', 'Strength, capacity and demand', { cls: 'title', flash: false });
  dw.label('t_note', '', { cls: 'point', flash: false });

  // ---- a) the bar section
  dw.poly('barFill', NCIRC, { intro: 4, color: PAL.redBand, opacity: 0.55, z: -0.2 });
  dw.circle('barEdge', { intro: 4, color: PAL.red });
  dw.dashedCircle('barReq', { intro: 3, color: PAL.grey, dash: 0.55 });
  dw.circle('barDown', { intro: 5, color: PAL.zero, when: (st, dd) => !!dd && dd.Dmin > 1 });
  dw.seg('barDim', { intro: 4, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lbarDim', '', { intro: 4, flash: false, color: PAL.grey });
  dw.label('lbarReq', '', { cls: 'num', intro: 3, color: PAL.grey });
  dw.label('lbarDown', '', { cls: 'num', intro: 5, color: PAL.zero, when: (st) => st.lbl });

  // ---- b) the bearing area
  dw.poly('concFill', 4, { intro: 5, color: PAL.blueBand, opacity: 0.55, z: -0.2 });
  dw.strokes('concEdge', 4, { intro: 5, w: dw.W.str, color: PAL.blue });
  dw.strokes('concHatch', 7, { intro: 5, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.arrow('concF', { intro: 5, color: PAL.green, ...NARR });
  dw.label('lconcF', '', { cls: 'num', intro: 5, color: PAL.green });
  dw.seg('concW', { intro: 5, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.seg('concT', { intro: 5, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lconcW', '', { intro: 5, flash: false, color: PAL.grey });
  dw.label('lconcT', '', { intro: 5, flash: false, color: PAL.grey });

  // ---- the chart: axis, then one row at a time
  dw.seg('axis', { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  for (let i = 0; i <= 5; i++) {
    dw.seg(`tick${i}`, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.label(`ltick${i}`, '', { intro: 1, flash: false, color: PAL.grey });
  }
  // row 0 / 1: the two design strengths, plotted as N/mm² on the same axis
  for (const [n, at] of [['st', 0], ['cn', 1]]) {
    dw.poly(`f_${n}`, 4, { intro: 1, color: at ? PAL.blue : PAL.red, opacity: 0.35, z: -0.2 });
    dw.label(`lf_${n}`, '', { cls: 'num', intro: 1, color: at ? PAL.blue : PAL.red });
  }
  // row 2: a) capacity bar + demand marker
  dw.poly('capA', 4, { intro: 4, color: PAL.redBand, opacity: 0.75, z: -0.2 });
  dw.poly('demA', 4, { intro: 2, color: PAL.red, opacity: 0.30, z: -0.15 });
  dw.seg('lineA', { intro: 4, w: dw.W.bar, color: OKA });
  dw.label('lcapA', '', { cls: 'num', intro: 4, color: OKA });
  dw.label('ldemA', '', { cls: 'num', intro: 2, color: PAL.red });
  // row 3: b) capacity bar + demand marker
  dw.poly('capB', 4, { intro: 5, color: PAL.blueBand, opacity: 0.75, z: -0.2 });
  dw.poly('demB', 4, { intro: 6, color: PAL.blue, opacity: 0.30, z: -0.15 });
  dw.seg('lineB', { intro: 5, w: dw.W.bar, color: OKB });
  dw.label('lcapB', '', { cls: 'num', intro: 5, color: OKB });
  dw.label('ldemB', '', { cls: 'num', intro: 6, color: PAL.blue });
  // row 4: the three candidate demands for b), against the same limit
  dw.seg('limB', { intro: 7, w: dw.W.thin, color: PAL.green, flash: false });
  dw.label('llimB', '', { cls: 'num', intro: 7, color: PAL.green });
  for (let i = 0; i < CAND.length; i++) {
    dw.poly(`cand${i}`, 4, { intro: 7, z: -0.2, opacity: 0.55,
      color: { pending: PAL.grey, final: (dd) => (CAND[i].n <= dd.Ncap ? PAL.green : PAL.red) } });
    dw.label(`lcand${i}`, '', { cls: 'num', intro: 7,
      color: { pending: PAL.grey, final: (dd) => (CAND[i].n <= dd.Ncap ? PAL.green : PAL.red) } });
  }

  dw.instant('t_bar', 't_conc', 't_chart', 't_note');

  const box = (x0, x1, y, h) => [[x0, y - h], [x1, y - h], [x1, y + h], [x0, y + h]];

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    dw.setLabel('t_bar', [BARC[0], 1.1]);
    dw.setText('t_bar', `a) the bar — S235`);
    dw.setLabel('t_conc', [CONC[0] + 4.0, 1.1]);
    dw.setText('t_conc', `b) the bearing — C12/15`);
    dw.setLabel('t_chart', [16.0, 11.2]);
    dw.setLabel('t_note', [16.0, 10.2]);
    dw.setText('t_note', `sections at 1 mm ≙ ${BARS} / ${CONS} units · bars: N/mm² at ${SNM}, kN at ${CKN}`);

    // ---- a) the bar
    const rReq = (d.Dexact / 2) * BARS;
    const rBar = (d.D / 2) * BARS;
    dw.setPoly('barFill', ring(BARC, rBar, NCIRC));
    dw.setCircle('barEdge', BARC, rBar);
    dw.setDashedCircle('barReq', BARC, rReq);
    dw.setCircle('barDown', BARC, ((d.Dmin - 1) / 2) * BARS);
    dw.setSeg('barDim', [BARC[0] - rBar, BARC[1] - rBar - 1.2],
                        [BARC[0] + rBar, BARC[1] - rBar - 1.2]);
    dw.setLabel('lbarDim', [BARC[0], BARC[1] - rBar - 2.1]);
    dw.setText('lbarDim', `Ø ${d.D} mm · A = ${d.Abar.toFixed(1)} mm²`);
    dw.setLabel('lbarReq', [BARC[0], BARC[1] + rBar + 1.2]);
    dw.setText('lbarReq', `required Ø ${d.Dexact.toFixed(2)} mm`);
    dw.setLabel('lbarDown', [BARC[0], BARC[1] - 1.9]);
    dw.setText('lbarDown', `Ø${d.Dmin - 1} fails`);

    // ---- b) the bearing rectangle: `wd` wide, `th` thick
    const hw = (d.wd / 2) * CONS, ht = (d.th / 2) * CONS;
    const bx = box(CONC[0] - hw, CONC[0] + hw, CONC[1], ht);
    dw.setPoly('concFill', bx);
    dw.setStrokes('concEdge', bx.map((p, i) => [p, bx[(i + 1) % 4]]));
    dw.setStrokes('concHatch', V.hatch([CONC[0] - hw, CONC[1] - ht],
      [CONC[0] + hw, CONC[1] - ht], 1, 0.9, 7));
    dw.setArrow('concF', [CONC[0], CONC[1] + ht + 2.6], [CONC[0], CONC[1] + ht + 0.4]);
    dw.setLabel('lconcF', [CONC[0] + 3.4, CONC[1] + ht + 2.0]);
    dw.setText('lconcF', `${d.Nc.toFixed(1)} kN`);
    dw.setSeg('concW', [CONC[0] - hw, CONC[1] - ht - 1.1], [CONC[0] + hw, CONC[1] - ht - 1.1]);
    dw.setLabel('lconcW', [CONC[0], CONC[1] - ht - 1.9]);
    dw.setText('lconcW', `${d.wd} mm wide`);
    dw.setSeg('concT', [CONC[0] + hw + 1.2, CONC[1] - ht], [CONC[0] + hw + 1.2, CONC[1] + ht]);
    dw.setLabel('lconcT', [CONC[0] + hw + 3.0, CONC[1]]);
    dw.setText('lconcT', `${d.th} mm`);

    // ---- the chart
    const px = (v) => CX0 + v * CKN;
    const pn = (v) => CX0 + v * SNM;
    const ay = ROW[4] - 4.5;
    dw.setSeg('axis', [CX0, ay], [px(130), ay]);
    for (let i = 0; i <= 5; i++) {
      const v = i * 25;
      dw.setSeg(`tick${i}`, [px(v), ay], [px(v), ay - 0.7]);
      dw.setLabel(`ltick${i}`, [px(v), ay - 1.5]);
      dw.setText(`ltick${i}`, `${v}`);
    }
    dw.setPoly('f_st', box(CX0, pn(FD), ROW[0], BH));
    dw.setLabel('lf_st', [pn(FD) + 5.4, ROW[0]]);
    dw.setText('lf_st', `S235  f_d = ${FD.toFixed(2)} N/mm²`);
    dw.setPoly('f_cn', box(CX0, pn(FCD), ROW[1], BH));
    dw.setLabel('lf_cn', [pn(FCD) + 7.4, ROW[1]]);
    dw.setText('lf_cn', `C12/15  f_cd = ${FCD.toFixed(2)} N/mm²  (${(FD / FCD).toFixed(1)}× less)`);

    dw.setPoly('capA', box(CX0, px(d.Nbar), ROW[2], BH));
    dw.setPoly('demA', box(CX0, px(d.Nt), ROW[2], BH * 0.52));
    dw.setSeg('lineA', [px(d.Nt), ROW[2] - BH - 0.7], [px(d.Nt), ROW[2] + BH + 0.7]);
    dw.setLabel('lcapA', [px(Math.max(d.Nbar, d.Nt)) + 5.6, ROW[2]]);
    dw.setText('lcapA', `a) Ø${d.D} carries ${d.Nbar.toFixed(2)} kN — ${d.utilA.toFixed(1)} %`);
    dw.setLabel('ldemA', [px(d.Nt) - 0.2, ROW[2] + BH + 1.5]);
    dw.setText('ldemA', `demand ${d.Nt.toFixed(2)} kN`);

    dw.setPoly('capB', box(CX0, px(d.Ncap), ROW[3], BH));
    dw.setPoly('demB', box(CX0, px(d.Nc), ROW[3], BH * 0.52));
    dw.setSeg('lineB', [px(d.Nc), ROW[3] - BH - 0.7], [px(d.Nc), ROW[3] + BH + 0.7]);
    dw.setLabel('lcapB', [px(Math.max(d.Ncap, d.Nc)) + 5.6, ROW[3]]);
    dw.setText('lcapB', `b) bearing ${d.Ncap.toFixed(2)} kN — ${d.utilB.toFixed(1)} %`);
    dw.setLabel('ldemB', [px(d.Nc) - 0.2, ROW[3] + BH + 1.5]);
    dw.setText('ldemB', `demand ${d.Nc.toFixed(2)} kN`);

    // the three candidates, stacked inside one row
    dw.setSeg('limB', [px(d.Ncap), ROW[4] - 2.4], [px(d.Ncap), ROW[4] + 2.6]);
    dw.setLabel('llimB', [px(d.Ncap) + 0.6, ROW[4] - 3.2]);
    dw.setText('llimB', `the ${d.Ncap.toFixed(2)} kN limit`);
    CAND.forEach((c, i) => {
      const y = ROW[4] + 1.6 - i * 1.6;
      dw.setPoly(`cand${i}`, box(CX0, px(c.n), y, 0.55));
      dw.setLabel(`lcand${i}`, [px(Math.max(c.n, d.Ncap)) + 5.6, y]);
      dw.setText(`lcand${i}`, `${c.n.toFixed(2)} kN → ${(100 * c.n / d.Ncap).toFixed(0)} %`);
    });

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const a = panel.section('a) the reinforcing bar');
  panel.slider(a, s, 'Nt', 'tension force (kN)', 0, 150, 0.5, refresh,
    (v) => `${v.toFixed(1)} kN`);
  panel.slider(a, s, 'D', 'bar diameter (mm)', 6, 40, 1, refresh, (v) => `Ø${v} mm`);
  const b = panel.section('b) the concrete bearing');
  panel.slider(b, s, 'Nc', 'compression force (kN)', 0, 150, 0.5, refresh,
    (v) => `${v.toFixed(1)} kN`);
  panel.slider(b, s, 'th', 'slab thickness (mm)', 40, 200, 5, refresh, (v) => `${v} mm`);
  panel.slider(b, s, 'wd', 'bearing width (mm)', 50, 300, 5, refresh, (v) => `${v} mm`);
  const w = panel.section('What to look at');
  panel.toggle(w, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}
