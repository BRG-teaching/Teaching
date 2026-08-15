/**
 * EX X · Aufgabe 16.2 — Buckling test of a square hollow section
 * Structural Design II, FS 23, sheet "EX X — Additional Exercises", page 14.
 *
 * NUMBERING. The English sheet calls this "Task 2"; German: Aufgabe 16.2,
 * used here (error E1).
 *
 * TEXT (verbatim). "We are looking at a square hollow profile out of steel
 * S 235. The element has a length of 5 m, a cross section of A = 2'000 mm2 and
 * is stressed by a compression force of N_cd = 300 kN. The support condition
 * corresponds to that of example 4) in task 1. Calculate whether buckling is
 * occurring and draw the value in the diagram."
 *
 * GIVEN. l = 5 m; A = 2000 mm²; N_cd = 300 kN; S235; support case 4) of
 * Aufgabe 16.1 — top laterally held and free to rotate, base fixed — so
 * l_cr = 0.7 l.
 *
 * ============================================================================
 * PROBLEM — sheet errors E7 and E8. The full worked answer is printed on the
 * TASK sheet, and its conclusion is printed in GERMAN in the English document:
 * "KEIN KNICKVERSAGEN". Nothing is left to calculate. This view recomputes it
 * and then turns the four fixed givens into sliders, which is the only thing
 * left that a reader can learn something from.
 * ============================================================================
 *
 * ANSWER — printed on the sheet, and verified here:
 *   l_cr            = 0.7 × 5 m                    = 3.500 m
 *   l_cr / √A       = 3500 mm / √2000 mm
 *                   = 3500 / 44.721                = 78.26     (sheet: 78)
 *   f_cd            = 235 / 1.05                   = 223.81 N/mm²
 *   N_cd / (A f_cd) = 300 000 / (2000 × 223.81)    = 0.6702    (sheet: 0.67)
 *   Plot (78.3, 0.670) on the buckling chart. It lies BELOW the
 *   square-hollow-profile curve, which is at roughly 0.78 at that slenderness.
 *   → NO BUCKLING FAILURE ("KEIN KNICKVERSAGEN").
 *
 *   Independent check: N_allow at that slenderness = 0.78 × 2000 × 223.81
 *   = 349.1 kN > 300 kN. The margin is about 16 %.
 *
 * THE CHART. The sheet prints a buckling diagram whose curve data cannot be
 * transcribed from the PDF, so this view draws the standard European buckling
 * curves instead, with the horizontal axis in the sheet's own coordinate
 * l_cr/√A:
 *
 *   λ_true = (l_cr / √A) / r,  where r = i / √A is a pure shape number
 *            r = 0.2821  for a SOLID ROUND      (i = D/4, A = πD²/4)
 *            r = 0.912   for a thin SQUARE HOLLOW section at b/t ≈ 20
 *   λ̄      = λ_true / λ_1,  λ_1 = π √(E / f_cd) = π √(210 000 / 223.81) = 96.2
 *   Φ      = 0.5 [1 + α (λ̄ − 0.2) + λ̄²]
 *   χ      = 1 / (Φ + √(Φ² − λ̄²))     with α = 0.13 (curve a0) for the hot-
 *            finished hollow section and α = 0.49 (curve c) for the solid round
 *
 * THAT CHOICE IS CALIBRATED, NOT ASSUMED. It reproduces the two read-offs the
 * sheet's own printed workings imply, to within 3 %:
 *   square hollow at l_cr/√A = 78.3 → χ = 0.80 here, against the sheet's ≈ 0.78
 *   solid round   at l_cr/√A = 42.3 → χ = 0.30 here, against the sheet's ≈ 0.30
 *      (that second point comes from Aufgabe 17 c) on page 15, which reads the
 *       SOLID-circle curve at 42.5 and concludes KNICKVERSAGEN at 0.38)
 * The verdict of this page — pass, with 16 % in hand off the sheet's printed
 * chart and 20 % off the curve equation used here — does not depend on which
 * of the two is read.
 *
 * WHY THE TWO CURVES ARE SO FAR APART, which is the real lesson of the page:
 * both axes are normalised by AREA, and a hollow section puts the same area
 * further from its own centroid. Its radius of gyration is three times that of
 * a solid round of equal area, so at the same l_cr/√A it is three times less
 * slender in the sense that matters. That is the entire argument for tubes.
 *
 * The sheet prints its answer. This view re-derives it and then lets it fail.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

// ------------------------------------------------------------- the physics --

const F_TK = 235, GAM_M = 1.05;
const FCD = F_TK / GAM_M;              // 223.8095 N/mm²
const E_MOD = 210000;                  // N/mm²
const LAM1 = Math.PI * Math.sqrt(E_MOD / FCD);   // 96.2

// profile families: r = i/√A, and the European buckling-curve imperfection α
const PROF = [
  { key: 'shs', name: 'square hollow section', r: 0.912, alpha: 0.13, col: PAL.blue },
  { key: 'rnd', name: 'solid round', r: 0.2821, alpha: 0.49, col: PAL.grey },
];

/** The reduction factor χ = N_allow / (A f_cd) at a given l_cr/√A. */
function chiOf(p, lamA) {
  const lamTrue = lamA / p.r;
  const lb = lamTrue / LAM1;
  if (lb < 1e-6) return 1;
  const phi = 0.5 * (1 + p.alpha * (lb - 0.2) + lb * lb);
  const chi = 1 / (phi + Math.sqrt(Math.max(phi * phi - lb * lb, 0)));
  return Math.min(chi, 1);
}

// the five support conditions of Aufgabe 16.1, so this page can be re-run for
// any of them rather than only for the case 4) the sheet fixes
const CASES = [
  { n: 1, K: 1.000, what: 'pinned top (held, free to rotate) + pinned base' },
  { n: 2, K: 0.500, what: 'top held and rotationally restrained + fixed base' },
  { n: 3, K: 2.000, what: 'free top + fixed base' },
  { n: 4, K: 0.700, what: 'top held, free to rotate + fixed base' },
  { n: 5, K: 1.000, what: 'top free to translate, rotation restrained + fixed base' },
];

// ---------------------------------------------------------------- layout --

const CX0 = 2.6, CKX = 0.116;          // the chart: units per unit of l_cr/√A
const CY0 = -13.0, CKY = 17.0;         // units per unit of χ
const LAMMAX = 200, NCURVE = 60;
const BX = -18.0, BY = -8.8, BH = 5.2, BA = 2.2;    // the member sketch

const DEFAULTS = { L: 5.0, A: 2000, N: 300, cs: 3, rnd: true, lbl: true, _k: 99 };

const K_LCR = 2, K_X = 3, K_Y = 4, K_PLOT = 5, K_READ = 6, K_MARGIN = 7;

export const meta = {
  title: 'EX X · 16.2 — one point on a chart, and it clears the curve',
  subtitle: 'Structural Design II · “EX X — Additional Exercises”, p. 14 · German Aufgabe 16.2 (the English sheet calls it “Task 2”)',
  about: 'A five-metre square hollow steel section under 300 kN, and the question is whether it buckles. The check is four lines and lands as a single point on a chart: 78 across, 0.67 up, comfortably under the curve. The sheet prints all four lines itself, and its conclusion in German — KEIN KNICKVERSAGEN — in the middle of the English document, so this view recomputes the answer rather than revealing it and then hands over the four givens as sliders. What is worth staring at is the second curve. A solid round bar of the SAME area sits far below the hollow one, because both axes are normalised by area and a tube puts that area three times further from its own centre. The whole reason to buy a hollow section is the vertical gap between those two lines.',
  result: (d) => [
    `given: l = ${d.L.toFixed(2)} m, A = ${d.A.toFixed(0)} mm², N_cd = ${d.N.toFixed(0)} kN, S235 → f_cd = ${FCD.toFixed(2)} N/mm² · support case ${d.cs.n}) → l_cr = ${d.cs.K.toFixed(3)} l`,
    `l_cr = ${d.cs.K.toFixed(3)} × ${d.L.toFixed(2)} = ${d.lcr.toFixed(3)} m · l_cr / √A = ${(d.lcr * 1000).toFixed(0)} / ${Math.sqrt(d.A).toFixed(3)} = ${d.lamA.toFixed(2)}   (the sheet rounds this to 78)`,
    `N_cd / (A · f_cd) = ${(d.N * 1000).toFixed(0)} / (${d.A.toFixed(0)} × ${FCD.toFixed(2)}) = ${d.util.toFixed(4)}   (the sheet rounds this to 0.67)`,
    `the square-hollow curve is at χ = ${d.chi.toFixed(4)} there → N_allow = ${d.Nallow.toFixed(1)} kN, so ${d.ok ? `NO buckling failure, with ${((d.chi / d.util - 1) * 100).toFixed(0)} % in hand` : 'BUCKLING FAILURE'} — reading ≈0.78 off the sheet's own printed chart instead gives 349.1 kN and 16 %`,
    `the same area as a SOLID ROUND would give χ = ${d.chiRnd.toFixed(4)} → ${d.NallowRnd.toFixed(1)} kN, ${d.okRnd ? 'which also passes' : 'which FAILS'} — the gap between the two curves is the argument for tubes`],
  frame: [[-26, -22], [30, 16]],
};

const STEPS = [
  { t: 'The exercise', d: 'EX X page 14, German Aufgabe 16.2: a 5 m square hollow section, 2000 mm² of steel, 300 kN pushing on it — does it buckle? Four lines of arithmetic and one point on a chart. All four lines, and the answer, are printed on the task sheet',
    detail: () => ['and the conclusion is printed in German — “KEIN KNICKVERSAGEN” — in the English document (errors E7, E8)',
                   'the support condition is “that of example 4) in task 1”, i.e. Aufgabe 16.1 case 4)',
                   'that reference at least works: case 4) is top held and free to rotate over a fixed base'],
    take: 'the useful thing left to do with a worked example is to move its inputs' },
  { t: 'What is given', d: 'left: the member. Note that nothing about the SHAPE of the section is given except the word “square hollow” and its area — and that turns out to be exactly enough, because the chart’s axes are both normalised by area',
    detail: (d) => [`l = ${d.L.toFixed(2)} m · A = ${d.A.toFixed(0)} mm² · N_cd = ${d.N.toFixed(0)} kN`,
                    `S235 with γ_M = ${GAM_M}: f_cd = ${F_TK} / ${GAM_M} = ${FCD.toFixed(4)} N/mm²`,
                    `case ${d.cs.n}): ${d.cs.what}`] },
  { t: 'The effective length', d: 'first the only structural decision on the page: how the ends are held. Case 4) — held at the top, free to rotate there, fixed at the base — gives l_cr = 0.7 l, so the column behaves like a pin-ended one 3.5 m long',
    detail: (d) => [`l_cr = ${d.cs.K.toFixed(3)} × ${d.L.toFixed(2)} m = ${d.lcr.toFixed(3)} m`,
                    `switch the case in the panel: 0.5 l would give ${(0.5 * d.L).toFixed(2)} m, 2 l would give ${(2 * d.L).toFixed(2)} m`,
                    'everything downstream depends on this one number, and it depends on the detailing, not the steel'] },
  { t: 'The horizontal coordinate', d: 'now the chart. Its x-axis is not the slenderness you may be used to — it is l_cr divided by the SQUARE ROOT OF THE AREA, which needs no second moment of area and therefore no profile table',
    detail: (d) => [`√A = √${d.A.toFixed(0)} = ${Math.sqrt(d.A).toFixed(3)} mm`,
                    `l_cr / √A = ${(d.lcr * 1000).toFixed(0)} / ${Math.sqrt(d.A).toFixed(3)} = ${d.lamA.toFixed(2)}`,
                    `the sheet writes 78`],
    take: 'dividing by √A instead of by the radius of gyration is what lets one chart serve every profile — at the price of needing a different curve for each shape' },
  { t: 'The vertical coordinate', d: 'and the y-axis is the utilisation: how much of the squash load you are actually using. If the column could not buckle at all, failure would be at exactly 1.0',
    detail: (d) => [`A × f_cd = ${d.A.toFixed(0)} × ${FCD.toFixed(2)} = ${(d.A * FCD / 1000).toFixed(1)} kN — the squash load`,
                    `N_cd / (A f_cd) = ${d.N.toFixed(0)} / ${(d.A * FCD / 1000).toFixed(1)} = ${d.util.toFixed(4)}`,
                    `the sheet writes 0.67`] },
  { t: 'Plot the point', d: 'right: the two coordinates meet. Everything below a curve is safe, everything above it fails, and the curve you read is the one for your own kind of section',
    detail: (d) => [`the point is (${d.lamA.toFixed(1)}, ${d.util.toFixed(3)})`,
                    `the square-hollow curve passes through χ = ${d.chi.toFixed(3)} at that slenderness`,
                    d.ok ? 'below the curve → it holds' : 'ABOVE the curve → it buckles'],
    take: 'the chart is the buckling equation drawn once, so that a check becomes a look' },
  { t: 'The verdict', d: (d) => (d.ok
      ? 'below the curve. No buckling failure — which is what the sheet prints, in German, in the middle of an English document'
      : 'above the curve: this section buckles before it squashes'),
    detail: (d) => [`χ = ${d.chi.toFixed(4)} against a demand of ${d.util.toFixed(4)}`,
                    `N_allow = χ × A × f_cd = ${d.chi.toFixed(4)} × ${d.A.toFixed(0)} × ${FCD.toFixed(2)} = ${d.Nallow.toFixed(1)} kN`,
                    d.ok ? `against N_cd = ${d.N.toFixed(0)} kN → ${((d.chi / d.util - 1) * 100).toFixed(1)} % in hand`
                         : `against N_cd = ${d.N.toFixed(0)} kN → over by ${((d.util / d.chi - 1) * 100).toFixed(1)} %`],
    take: 'the sheet\u2019s own numbers give 349 kN allowable against 300 applied. This view gets the same answer from the curve equation rather than from a ruler' },
  { t: 'And the same steel, solid', d: 'the grey curve is a SOLID ROUND of the identical area. It sits far below, because both axes are normalised by area and a tube puts that area three times further from its own centre. Same weight, same steel, three times less slender',
    detail: (d) => [`hollow: r = i/√A = ${PROF[0].r} → χ = ${d.chi.toFixed(3)} → ${d.Nallow.toFixed(1)} kN`,
                    `solid:  r = i/√A = ${PROF[1].r} → χ = ${d.chiRnd.toFixed(3)} → ${d.NallowRnd.toFixed(1)} kN`,
                    `the solid bar carries ${(100 * d.NallowRnd / d.Nallow).toFixed(0)} % of what the tube carries, out of exactly the same metal`],
    take: 'this is the whole answer to Aufgabe 17 d) as well: “use a hollow section instead of a solid one”' },
];

// ------------------------------------------------------------------ maths --

function compute(s) {
  const cs = CASES[Math.round(s.cs)];
  const lcr = cs.K * s.L;
  const lamA = (lcr * 1000) / Math.sqrt(s.A);
  const squash = (s.A * FCD) / 1000;                 // kN
  const util = s.N / squash;
  const chi = chiOf(PROF[0], lamA);
  const chiRnd = chiOf(PROF[1], lamA);
  const Nallow = chi * squash;
  const NallowRnd = chiRnd * squash;

  const curves = PROF.map((p) => ({
    ...p,
    pts: Array.from({ length: NCURVE + 1 }, (_, i) => {
      const x = (LAMMAX * i) / NCURVE;
      return [x, chiOf(p, x)];
    }),
  }));

  return { L: s.L, A: s.A, N: s.N, cs, lcr, lamA, squash, util,
           chi, chiRnd, Nallow, NallowRnd, curves,
           ok: util <= chi, okRnd: util <= chiRnd };
}

// ------------------------------------------------------------------- view --

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const NARR = dw.W.narrow;
  const cx = (lam) => CX0 + lam * CKX;
  const cy = (chi) => CY0 + chi * CKY;

  const OK = { final: (dd) => (dd.ok ? PAL.green : PAL.red) };

  dw.label('t_mem', '', { cls: 'title', flash: false });
  dw.label('t_chart', '', { cls: 'title', flash: false });
  dw.label('t_note', '', { cls: 'point', flash: false });

  // ---- the member sketch
  dw.seg('col', { intro: 1, w: dw.W.bar, color: PAL.blue });
  dw.strokes('baseSym', 6, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.strokes('topSym', 3, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.disk('topDisk', { intro: 1, r: dw.W.disk });
  dw.arrow('nLoad', { intro: 1, color: PAL.green, ...NARR });
  dw.label('lnLoad', '', { cls: 'num', intro: 1, color: PAL.green });
  dw.seg('dimL', { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('ldimL', '', { intro: 1, flash: false, color: PAL.grey });
  dw.seg('dimLcr', { intro: K_LCR, w: dw.W.bar, color: PAL.blue });
  dw.label('ldimLcr', '', { cls: 'num', intro: K_LCR, color: PAL.blue });

  // ---- the chart
  dw.seg('axX', { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.seg('axY', { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  for (let i = 0; i <= 4; i++) {
    dw.seg(`tx${i}`, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.label(`ltx${i}`, '', { intro: 1, flash: false, color: PAL.grey });
    dw.seg(`ty${i}`, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.label(`lty${i}`, '', { intro: 1, flash: false, color: PAL.grey });
  }
  dw.label('laxX', '', { intro: 1, flash: false, color: PAL.grey });
  dw.label('laxY', '', { intro: 1, flash: false, color: PAL.grey });
  for (let p = 0; p < PROF.length; p++) {
    dw.strokes(`curve${p}`, NCURVE, { intro: p === 0 ? 1 : K_MARGIN,
      w: p === 0 ? dw.W.bar : dw.W.thin, color: PROF[p].col, cap: false,
      when: (st) => (p === 1 ? st.rnd : true) });
    dw.label(`lcurve${p}`, '', { cls: 'num', intro: p === 0 ? 1 : K_MARGIN,
      color: PROF[p].col, when: (st) => (p === 1 ? st.rnd : true) });
  }
  dw.dashLine('gx', { intro: K_X, color: PAL.grey, dash: 0.5 });
  dw.label('lgx', '', { cls: 'num', intro: K_X, color: PAL.grey });
  dw.dashLine('gy', { intro: K_Y, color: PAL.grey, dash: 0.5 });
  dw.label('lgy', '', { cls: 'num', intro: K_Y, color: PAL.grey });
  dw.disk('pt', { intro: K_PLOT, r: dw.W.disk });
  dw.label('lpt', '', { cls: 'num', intro: K_PLOT, color: OK });
  dw.seg('gap', { intro: K_READ, w: dw.W.bar, color: OK });
  dw.label('lgap', '', { cls: 'num', intro: K_READ, color: OK });
  dw.disk('ptRnd', { intro: K_MARGIN, r: dw.W.disk * 0.8, when: (st) => st.rnd });
  dw.label('lptRnd', '', { cls: 'num', intro: K_MARGIN, color: PAL.grey,
    when: (st) => st.rnd });

  dw.instant('t_mem', 't_chart', 't_note');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    dw.setLabel('t_mem', [BX + 1.0, 0.9]);
    dw.setText('t_mem', `the member — support case ${d.cs.n})`);
    dw.setLabel('t_chart', [15.0, 8.6]);
    dw.setText('t_chart', `Knickdiagramm — χ = N_allow / (A · f_cd) against l_cr / √A`);
    dw.setLabel('t_note', [15.0, 7.2]);
    dw.setText('t_note', `curves: European buckling curves, calibrated to the sheet's own read-offs`);

    // ---- the member
    const top = BY + BH;
    dw.setSeg('col', [BX, BY], [BX, top]);
    dw.setStrokes('baseSym', [[[BX - 1.8, BY], [BX + 1.8, BY]],
      ...V.hatch([BX - 1.8, BY], [BX + 1.8, BY], -1, 0.8, 5)]);
    dw.setStrokes('topSym', [[[BX - 1.5, top + 0.8], [BX + 1.5, top + 0.8]],
      [[BX, top], [BX, top]], [[BX, top], [BX, top]]]);
    dw.setDisk('topDisk', [BX, top]);
    dw.setArrow('nLoad', [BX, top + 4.4], [BX, top + 1.6]);
    dw.setLabel('lnLoad', [BX + 4.4, top + 2.1]);
    dw.setText('lnLoad', `N_cd = ${d.N.toFixed(0)} kN`);
    dw.setSeg('dimL', [BX - 3.0, BY], [BX - 3.0, top]);
    dw.setLabel('ldimL', [BX - 5.0, BY + BH / 2]);
    dw.setText('ldimL', `l = ${d.L.toFixed(2)} m`);
    dw.setSeg('dimLcr', [BX + 3.0, BY], [BX + 3.0, BY + d.cs.K * BH]);
    dw.setLabel('ldimLcr', [BX + 6.4, BY + (d.cs.K * BH) / 2]);
    dw.setText('ldimLcr', `l_cr = ${d.lcr.toFixed(3)} m`);
    void BA;

    // ---- the chart frame
    dw.setSeg('axX', [cx(0), cy(0)], [cx(LAMMAX), cy(0)]);
    dw.setSeg('axY', [cx(0), cy(0)], [cx(0), cy(1.05)]);
    for (let i = 0; i <= 4; i++) {
      const v = (LAMMAX * i) / 4;
      dw.setSeg(`tx${i}`, [cx(v), cy(0)], [cx(v), cy(0) - 0.6]);
      dw.setLabel(`ltx${i}`, [cx(v), cy(0) - 1.4]);
      dw.setText(`ltx${i}`, `${v.toFixed(0)}`);
      const u = i / 4;
      dw.setSeg(`ty${i}`, [cx(0), cy(u)], [cx(0) - 0.6, cy(u)]);
      dw.setLabel(`lty${i}`, [cx(0) - 2.0, cy(u)]);
      dw.setText(`lty${i}`, `${u.toFixed(2)}`);
    }
    dw.setLabel('laxX', [cx(LAMMAX / 2), cy(0) - 2.8]);
    dw.setText('laxX', 'l_cr / √A');
    dw.setLabel('laxY', [cx(0) - 1.4, cy(1.05) + 1.2]);
    dw.setText('laxY', 'N / (A · f_cd)');

    d.curves.forEach((c, p) => {
      const pts = c.pts.map(([x, y]) => [cx(x), cy(y)]);
      dw.setStrokes(`curve${p}`, pts.slice(0, -1).map((q, i) => [q, pts[i + 1]]));
      const at = Math.round(NCURVE * (p === 0 ? 0.66 : 0.30));
      dw.setLabel(`lcurve${p}`, V.add(pts[at], [p === 0 ? 5.6 : 5.4, p === 0 ? 1.2 : 1.2]));
      dw.setText(`lcurve${p}`, c.name);
    });

    // the two coordinates, then the point
    dw.setDashLine('gx', [[cx(d.lamA), cy(0)], [cx(d.lamA), cy(Math.max(d.util, d.chi) + 0.08)]]);
    dw.setLabel('lgx', [cx(d.lamA) + 3.2, cy(0) + 1.1]);
    dw.setText('lgx', `${d.lamA.toFixed(1)}`);
    dw.setDashLine('gy', [[cx(0), cy(d.util)], [cx(d.lamA), cy(d.util)]]);
    dw.setLabel('lgy', [cx(0) + 4.2, cy(d.util) + 1.0]);
    dw.setText('lgy', `${d.util.toFixed(3)}`);
    dw.setDisk('pt', [cx(d.lamA), cy(d.util)]);
    dw.setLabel('lpt', [cx(d.lamA) + 5.4, cy(d.util) - 1.0]);
    dw.setText('lpt', `(${d.lamA.toFixed(1)}, ${d.util.toFixed(3)}) — ${d.ok ? 'no buckling failure' : 'BUCKLING FAILURE'}`);
    // the gap between the demand and the curve
    dw.setSeg('gap', [cx(d.lamA), cy(d.util)], [cx(d.lamA), cy(d.chi)]);
    dw.setLabel('lgap', [cx(d.lamA) + 5.8, cy((d.util + d.chi) / 2) + 0.6]);
    dw.setText('lgap', `${d.ok ? `${((d.chi / d.util - 1) * 100).toFixed(0)} % in hand` : `over by ${((d.util / d.chi - 1) * 100).toFixed(0)} %`}`);
    dw.setDisk('ptRnd', [cx(d.lamA), cy(d.chiRnd)]);
    dw.setLabel('lptRnd', [cx(d.lamA) - 6.2, cy(d.chiRnd) + 0.2]);
    dw.setText('lptRnd', `solid round: ${d.chiRnd.toFixed(3)}`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const g = panel.section('Given');
  panel.slider(g, s, 'L', 'length l (m)', 1, 12, 0.25, refresh, (v) => `${v.toFixed(2)} m`);
  panel.slider(g, s, 'A', 'cross section A (mm²)', 500, 6000, 100, refresh,
    (v) => `${v} mm²`);
  panel.slider(g, s, 'N', 'N_cd (kN)', 50, 800, 10, refresh, (v) => `${v} kN`);
  panel.slider(g, s, 'cs', 'support case (Aufgabe 16.1)', 0, 4, 1, refresh,
    (v) => `${CASES[Math.round(v)].n}) l_cr = ${CASES[Math.round(v)].K.toFixed(2)} l`);
  const w = panel.section('What to look at');
  panel.toggle(w, s, 'rnd', 'compare with a SOLID round of the same area', refresh);
  panel.toggle(w, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}
