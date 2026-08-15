/**
 * EX 10 · Task 4 — Stability against buckling: the column fails, by a factor of twelve
 * Structural Design II, FS 23 (sheet EX 10 "Bracing & Horizontal Forces", p. 3).
 *
 * TASK TEXT, verbatim:
 *   "Given is a 2.4 m long column made of steel S355. It is designed as a round
 *    solid profile with a cross-sectional area of 400 mm2. It is subjected to a
 *    force Nd=54 kN, and has a hinged support at the top and bottom.
 *    a) Check the buckling behaviour of the column. Use the relevant buckling
 *       curve to check its stability and draw the corresponding values in the
 *       diagram.
 *    b) In general, how can buckling be prevented?"
 *   (chart axes: `Nd / (A · fcd)` vertical, `lcr / √A` horizontal; caption
 *    "buckling behaviour for different steel profiles"; support strip
 *    `lcr = l`, `lcr = 0.7 l`, `lcr = 0.5 l`, `lcr = l`, `lcr = 2 l`)
 *
 * WHAT IS GIVEN, AND WHAT IS NOT.
 *   l = 2400 mm · A = 400 mm² · N_d = 54 kN · S355 · hinged both ends.
 *   NOT printed on the sheet and needed anyway: f_ck = 355 N/mm² and
 *   gamma_M = 1.05 from compendium 2.6, hence f_cd = 355/1.05 = 338.10 N/mm²
 *   (compendium 2.5 uses exactly that value for S355).
 *   E IS NOWHERE IN THE COURSE MATERIAL AT ALL. The formulary gives f_tk, f_ck,
 *   gamma_M and density and no modulus of elasticity, so a student physically
 *   cannot do the Euler cross-check and is forced onto the graph. The
 *   E = 210 000 N/mm² used here is imported from outside the course, and the
 *   view says so.
 *
 * THE TWO CHART COORDINATES:
 *   hinged-hinged is case a) of the strip, so l_cr = 1.0 l = 2400 mm.
 *   sqrt(A) = 20.000 mm.
 *   >> abscissa  l_cr / sqrt(A)     = 2400 / 20.000 = 120.0
 *   >> ordinate  N_d / (A · f_cd)   = 54 000 / (400 × 338.095) = 0.3993
 *
 * THE CHART CURVE, digitised from the 300 dpi render of p. 3 with the axes
 * calibrated on the tick grid (the chart is an embedded JPEG, not vector):
 *   x    20    30    35    40    50    60    80   100   120   150
 *   v  0.744 0.556 0.462 0.382 0.271 0.200 0.121 0.078 0.055 0.038
 * Below x ≈ 13.3 the curve is drawn as the squash plateau at 1.0. Outside
 * 20…150 it is continued here by the power law fitted to its own last two
 * points, and the view marks any read-off there as extrapolated.
 *
 * VERDICT: 0.399 against a capacity of 0.055 — the point lies FAR ABOVE the
 * lowest curve, so the column BUCKLES. Chart capacity
 * N_allow = 0.055 × 135.238 = 7.44 kN against a demand of 54 kN.
 *
 * INDEPENDENT CHECK BY EULER (E = 210 000 N/mm², imported):
 *   for a round solid, i = d/4 and i/sqrt(A) = 1/(2 sqrt(pi)) = 0.282095
 *   d = sqrt(4A/pi) = 22.5675 mm · I = A²/(4 pi) = 12 732.4 mm⁴
 *   i = 5.6419 mm · lambda = 2400/5.6419 = 425.39
 *   sigma_cr = pi² E / lambda² = 11.454 N/mm²
 *   >> N_cr = 4.5817 kN,  N_d / N_cr = 54.00 / 4.582 = 11.79.  IT FAILS.
 *   On the chart's own ordinate that is 11.454/338.095 = 0.0339.
 *   Cross-check on the section itself: N_pl,d = A f_cd = 135.24 kN > 54 kN, so
 *   the material is fine by a factor 2.50 and buckling governs by 135.24/4.58
 *   = 29.5.
 *
 * HOW LONG MAY IT BE?
 *   Euler: l_cr,max = 2400 sqrt(4.5817/54.000) = 699 mm, i.e. about 0.70 m.
 *   Chart: ordinate 0.3993 is reached at l_cr/sqrt(A) ~ 38.9, so l_cr,max ~
 *   778 mm. Either way the 2.4 m column is roughly 3.1 – 3.4 times too long.
 *
 * TASK 4 b), WITH NUMBERS:
 *   1. SHORTEN THE BUCKLING LENGTH. Three lateral restraints give 600 mm
 *      segments and N_cr = 4.5817 × (2400/600)² = 73.3 kN > 54 kN. OK
 *      Two restraints give 800 mm and 41.2 kN, which is not enough.
 *   2. STIFFEN THE SUPPORTS. Fixed–fixed is l_cr = 0.5 l = 1200 mm and
 *      N_cr = 18.33 kN — better, but nowhere near enough on its own.
 *   3. CHANGE THE SHAPE AT THE SAME AREA, i.e. put the material at the
 *      perimeter. Required I = N_d l_cr²/(pi² E) = 150 073 mm⁴, so the
 *      required i = 19.37 mm. With A = 400 mm² and a circular hollow section
 *      R² + r² = 4 i² = 1500.7 and R² − r² = A/pi = 127.32, giving
 *      R = 28.53 and r = 26.21 mm: a ⌀57.1 × 2.32 mm TUBE. Check A = 399.3
 *      mm², I = 149 935 mm⁴, N_cr = 53.95 kN ≈ N_d. The shape factor
 *      i/sqrt(A) goes from 0.2821 to 0.9698, a factor 3.44, which is exactly
 *      compendium 10.2's "a hollow profile can be almost four times as long".
 *   4. REDUCE THE LOAD, or share it over more columns.
 *   5. A HIGHER STEEL GRADE DOES NOT HELP. In the Euler range the capacity
 *      depends on E and I only, and E is the same for every structural steel:
 *      S500 buckles at the same 4.58 kN.
 *
 * ERRORS CARRIED (decode brief §6):
 *   5. THE PRINTED CHART IS NOT QUANTITATIVELY SELF-CONSISTENT. Its
 *      round-solid curve follows an Euler branch of the form 780/x², which
 *      back-solves to f_cd ≈ 211 N/mm², not the 338.1 the course's own
 *      formulary gives for S355. At l_cr/sqrt(A) = 120 the chart reads 0.055
 *      where exact Euler theory gives 0.0339 — a factor 1.6. Also, the two
 *      lowest curves are labelled solid-square and solid-round, but those
 *      shapes differ in i/sqrt(A) by only 2.3 % (0.28868 against 0.28209) and
 *      must therefore lie almost on top of one another; on the printed chart
 *      they are a factor ~5.5 apart at x = 120, so the labels and the curves
 *      cannot both be right. And compendium 10.2 claims a hollow profile can
 *      be "almost four times as long" where the printed chart supports only
 *      ~2.4. THE VERDICT IS UNAFFECTED — 0.399 against 0.055 or against
 *      0.034 fails either way — but any number read off this chart is soft to
 *      roughly a factor 1.6, and this view never presents a chart read-off as
 *      an exact result. Both curves are drawn, side by side, and both
 *      capacities are quoted.
 *   6. E is nowhere in the course material; see above.
 *   9. The chart strip labels "l_cr = l" twice (cases a and d — hinged/hinged
 *      and fixed-base/fixed-roller-top). That is correct, not a typo. The
 *      column in this task is case a).
 *
 * Every number is recomputed in compute(), so the sliders move the answer.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

// ------------------------------------------------------------------ givens
const F_CK = 355, GAM_M = 1.05;              // compendium 2.6, S355
const F_CD = F_CK / GAM_M;                   // 338.0952 N/mm²
const E_MOD = 210000;                        // imported: NOT in the course formulary

const CASES = [
  { k: 'a', f: 1.0, t: 'hinged top and bottom', s: 'l_cr = l', z: 'l' },
  { k: 'b', f: 0.7, t: 'fixed base, hinged top', s: 'l_cr = 0.7 l', z: '0.7 l' },
  { k: 'c', f: 0.5, t: 'fixed base, fixed top', s: 'l_cr = 0.5 l', z: '0.5 l' },
  { k: 'd', f: 1.0, t: 'fixed base, fixed roller top', s: 'l_cr = l', z: 'l' },
  { k: 'e', f: 2.0, t: 'cantilever — fixed base, free top', s: 'l_cr = 2 l', z: '2 l' },
];

// i / sqrt(A), the only property of a section shape buckling cares about
const Q = 26.21 / 28.53;                     // the r/R of the ⌀57.1 × 2.32 tube
const SECT = [
  { n: 'round solid', r: 1 / (2 * Math.sqrt(Math.PI)) },
  { n: 'square solid', r: 1 / Math.sqrt(12) },
  { n: 'tube ⌀57 × 2.3', r: Math.sqrt((1 + Q * Q) / (4 * Math.PI * (1 - Q * Q))) },
];

// the sheet's own round-solid curve, digitised from the 300 dpi render
const CURVE = [[20, 0.744], [30, 0.556], [35, 0.462], [40, 0.382], [50, 0.271],
               [60, 0.200], [80, 0.121], [100, 0.078], [120, 0.055], [150, 0.038]];

/** The printed curve: linear between the digitised points, its own fitted
    power law outside them, and capped at the squash plateau of 1.0. */
function chartCurve(x) {
  if (x <= 0) return 1;
  const pow = (a, b) => {
    const p = Math.log(a[1] / b[1]) / Math.log(b[0] / a[0]);
    return Math.min(1, a[1] * (a[0] / x) ** p);
  };
  if (x < CURVE[0][0]) return pow(CURVE[0], CURVE[1]);
  const last = CURVE.length - 1;
  if (x > CURVE[last][0]) return pow(CURVE[last], CURVE[last - 1]);
  for (let i = 0; i < last; i++) {
    if (x <= CURVE[i + 1][0]) {
      const f = (x - CURVE[i][0]) / (CURVE[i + 1][0] - CURVE[i][0]);
      return CURVE[i][1] + f * (CURVE[i + 1][1] - CURVE[i][1]);
    }
  }
  return CURVE[last][1];
}

// ------------------------------------------------------------------ layout
const CX0 = 2, CY0 = -22, KX = 38 / 190, KY = 24 / 1.1;   // the chart box
const XMAX = 190, VMAX = 1.1;
// the two column sketches live in the strip the UI cards leave free on the
// left: the step caption reaches down to y ≈ 6.2 and the RESULT card up to
// y ≈ -11.8, so their bases sit low enough for the N_d arrow and the titles
// above them to clear the caption
const COL = [-37, -8.5], CH = 3.0;            // the column sketch, units per metre
const FIX = [-25, -8.5];                      // the braced column beside it
const STRIP = { y: 9.5, x0: 2, dx: 8.2, h: 4.0 };

const DEFAULTS = { l: 2.4, A: 400, Nd: 54, cas: 0, sect: 0, euler: true, lbl: true, _k: 99 };

export const meta = {
  title: 'EX 10.4 — the column buckles, and by a factor of twelve',
  subtitle: 'Structural Design II · sheet EX 10 “Bracing & Horizontal Forces”, task 4 a)–b)',
  about: 'A 2.4 metre steel column, 400 square millimetres of solid round bar, pinned at both ends, asked to carry 54 kilonewtons. The cross-section itself is fine — it could squash at 135 kN — but a solid round bar is the worst possible shape for its area, and at this length it goes sideways long before it goes short. Two numbers put it on the sheet\'s chart, and the point lands far above the curve. Euler agrees and is harsher: it buckles at 4.58 kN, so the column is overloaded almost twelvefold. The view also carries the sheet\'s own problem honestly: the printed chart is not self-consistent, and reads about 1.6 times kinder than theory.',
  result: (d) => [
    `f_cd = ${F_CK}/${GAM_M} = ${F_CD.toFixed(2)} N/mm² (compendium 2.6) · √A = ${d.rA.toFixed(3)} mm`,
    `case ${d.cas.k}) ${d.cas.s} ⇒ ${d.lcr.toFixed(0)} mm · l_cr/√A = ${d.x.toFixed(1)} · N_d/(A·f_cd) = ${d.v.toFixed(4)}`,
    `chart ${d.vChart.toFixed(4)} ⇒ N_allow = ${d.NallowChart.toFixed(2)} kN · Euler ${d.vEuler.toFixed(4)} ⇒ N_cr = ${d.Ncr.toFixed(3)} kN`,
    d.fails
      ? `it BUCKLES — above the curve. N_d/N_cr = ${d.util.toFixed(2)} Euler · ${(d.Nd / d.NallowChart).toFixed(2)} chart`
      : `it HOLDS — below the curve. N_d/N_cr = ${d.util.toFixed(2)} (Euler)`,
    `longest possible: ${d.lmaxE.toFixed(0)} mm Euler, ${d.lmaxC.toFixed(0)} mm chart — this one is ${(d.lcr / d.lmaxE).toFixed(1)}× that`,
    `fix 1: ${d.nRes} lateral restraint${d.nRes === 1 ? '' : 's'} at ${(d.lcr / (d.nRes + 1)).toFixed(0)} mm ⇒ N_cr = ${d.NcrRes.toFixed(1)} kN ✓`,
    `fix 2: the same ${d.A.toFixed(0)} mm² as a ⌀${(2 * d.Rt).toFixed(1)} × ${(d.Rt - d.rt).toFixed(2)} mm tube ⇒ N_cr = ${d.NcrTube.toFixed(1)} kN`,
    `material is fine: N_pl,d = A·f_cd = ${d.Npl.toFixed(2)} kN — buckling governs by ${(d.Npl / d.Ncr).toFixed(1)}×`,
    `and the printed chart itself reads ~1.6× kinder than theory`],
  frame: [[-42, -26], [42, 26]],
};

const STEPS = [
  { t: 'The exercise', d: 'EX 10 task 4: a 2.4 metre steel column, 400 square millimetres of solid round bar, hinged at both ends, carrying 54 kN. Is it stable? The sheet wants it answered off its own buckling chart' },
  { t: 'The column', d: (d) => `left: the column as given — S355, ${(d.l * 1000).toFixed(0)} mm long, A = ${d.A.toFixed(0)} mm², N_d = ${d.Nd.toFixed(0)} kN, a hinge at each end. A hinge at both ends is case a) of the strip along the top, so the buckling length is the full length`,
    detail: (d) => [`l = ${(d.l * 1000).toFixed(0)} mm · A = ${d.A.toFixed(0)} mm² · N_d = ${d.Nd.toFixed(1)} kN`,
                    `round solid ⇒ d = √(4A/π) = ${d.dia.toFixed(3)} mm, I = A²/(4π) = ${d.I.toFixed(1)} mm⁴, i = d/4 = ${d.i.toFixed(4)} mm`,
                    `S355: f_cd = ${F_CK}/${GAM_M} = ${F_CD.toFixed(3)} N/mm² — from compendium 2.6, NOT from this sheet`],
    take: 'the sheet gives no material strength and no modulus; both have to come from the compendium, and the modulus is not even there' },
  { t: 'The support condition fixes l_cr', d: 'top left: the five cases the sheet prints beside the chart. Hinged at both ends is the plainest and the worst of the ordinary ones — the column bows into a single half wave over its whole length, so the buckling length is the length itself',
    detail: (d) => CASES.map((c) => `${c.k})  ${c.s.padEnd(12)}  ${c.t}${c === d.cas ? '   ← this column' : ''}`),
    take: 'cases a) and d) are both l_cr = l. The two identical labels on the sheet read like a typo and are not one' },
  { t: 'The two coordinates', d: (d) => `everything the chart needs is two numbers. Along the bottom, the buckling length divided by the square root of the area — a slenderness that does not care what shape the section is. Up the side, how hard the section is being pushed as a fraction of what it could squash at`,
    detail: (d) => [`√A = √${d.A.toFixed(0)} = ${d.rA.toFixed(3)} mm`,
                    `l_cr/√A = ${d.lcr.toFixed(0)} / ${d.rA.toFixed(3)} = ${d.x.toFixed(2)}`,
                    `N_d/(A·f_cd) = ${(d.Nd * 1000).toFixed(0)} / (${d.A.toFixed(0)} × ${F_CD.toFixed(3)}) = ${d.v.toFixed(4)}`] },
  { t: 'The sheet’s curve', d: 'right: the chart, with the lowest curve — the round solid profile, the worst shape there is for a given area, because all the material sits where it does least good. Digitised straight off the printed page, because the chart is a photograph on the sheet and not a drawing',
    detail: () => [`digitised: ${CURVE.map(([x, v]) => `${x}→${v.toFixed(3)}`).join('  ')}`,
                   `below x ≈ 13 the curve is the squash plateau at 1.0`] },
  { t: (d) => (d.fails ? 'Far above the curve — it buckles' : 'Below the curve — it holds'),
    d: (d) => (d.fails
      ? `the point (${d.x.toFixed(1)}, ${d.v.toFixed(3)}) sits high above a curve that at this slenderness is down at ${d.vChart.toFixed(3)}. The column is being asked for about ${(d.Nd / d.NallowChart).toFixed(0)} times what the chart allows it`
      : `the point (${d.x.toFixed(1)}, ${d.v.toFixed(3)}) sits under the curve at ${d.vChart.toFixed(3)} — the section is stable at this length`),
    detail: (d) => [`demand ${d.v.toFixed(4)} against a chart capacity of ${d.vChart.toFixed(4)}`,
                    `N_allow = ${d.vChart.toFixed(4)} × ${d.Npl.toFixed(3)} = ${d.NallowChart.toFixed(2)} kN, and N_d = ${d.Nd.toFixed(1)} kN`,
                    `and the cross-section itself would take N_pl,d = ${d.Npl.toFixed(2)} kN — the material was never the problem`],
    take: 'a section can be perfectly strong and still useless: it is the length that decides' },
  { t: 'Euler agrees, and is harsher', d: 'the theory curve overlaid, for the same shape. It is the whole of buckling in one line: the load a pinned strut can take falls with the SQUARE of its length, and depends on the stiffness E and the shape I — never on the strength of the steel. The two curves do not coincide, and that is a fault in the sheet, not in the theory',
    detail: (d) => [`λ = l_cr/i = ${d.lcr.toFixed(0)} / ${d.i.toFixed(4)} = ${d.lam.toFixed(2)}`,
                    `σ_cr = π²E/λ² = ${d.sig.toFixed(3)} N/mm² ⇒ N_cr = ${d.Ncr.toFixed(4)} kN, i.e. ${d.vEuler.toFixed(4)} on this axis`,
                    `N_d/N_cr = ${d.Nd.toFixed(1)} / ${d.Ncr.toFixed(3)} = ${d.util.toFixed(2)} — it fails ${d.util > 1 ? 'by that factor' : 'nowhere'}`,
                    `the printed curve reads ${(d.vChart / d.vEuler).toFixed(2)}× kinder than theory here — the chart back-solves to f_cd ≈ 211 N/mm², not 338.1`],
    take: 'E = 210 GPa had to be imported: the course formulary does not contain a modulus of elasticity at all' },
  { t: 'b) How to stop it buckling', d: 'nothing about the steel helps — a higher grade buckles at exactly the same load, because only E and I appear. What helps is shortening the buckling length or moving the material away from the axis. Both are drawn: three restraints turn one 2.4 m column into four 0.6 m ones, and the same 400 mm² rolled into a thin tube is three and a half times better shaped',
    detail: (d) => [`longest it could be: ${d.lmaxE.toFixed(0)} mm (Euler) / ${d.lmaxC.toFixed(0)} mm (chart) — it is ${(d.lcr / d.lmaxE).toFixed(1)}× that`,
                    `${d.nRes} restraints ⇒ ${(d.lcr / (d.nRes + 1)).toFixed(0)} mm segments ⇒ N_cr = ${d.NcrRes.toFixed(1)} kN ✓ (${d.nRes - 1} would give ${(d.Ncr * (d.nRes / 1) ** 2).toFixed(1)} kN)`,
                    `fixed–fixed ⇒ l_cr = 0.5 l ⇒ N_cr = ${(d.Ncr * 4).toFixed(2)} kN — still not enough on its own`,
                    `same area as a tube: required i = ${d.iReq.toFixed(2)} mm ⇒ ⌀${(2 * d.Rt).toFixed(1)} × ${(d.Rt - d.rt).toFixed(2)} mm ⇒ N_cr = ${d.NcrTube.toFixed(1)} kN`],
    take: 'i/√A is the whole story of a shape: 0.282 for solid round, 0.970 for that tube — a factor 3.4 in permissible length' },
  { t: 'The answer', d: (d) => (d.fails
      ? `It fails. l_cr/√A = ${d.x.toFixed(1)} and N_d/(A·f_cd) = ${d.v.toFixed(4)} put the point far above the round-solid curve, and Euler gives N_cr = ${d.Ncr.toFixed(2)} kN against ${d.Nd.toFixed(0)} kN demanded — a factor of ${d.util.toFixed(2)}. It would have to be about ${(d.lmaxE / 1000).toFixed(2)} m long instead of ${d.l.toFixed(1)}`
      : `At these values it holds: N_cr = ${d.Ncr.toFixed(2)} kN against ${d.Nd.toFixed(0)} kN.`),
    detail: (d) => [`a) l_cr/√A = ${d.x.toFixed(1)} · N_d/(A·f_cd) = ${d.v.toFixed(4)} · above the curve ⇒ BUCKLES`,
                    `b) restraints every ${(d.lcr / (d.nRes + 1)).toFixed(0)} mm, or a ⌀${(2 * d.Rt).toFixed(0)} × ${(d.Rt - d.rt).toFixed(1)} mm tube of the same area, or less load`,
                    `and treat any chart read-off as soft to ~1.6× — the printed chart is not self-consistent`] },
];

// ------------------------------------------------------------------ maths
function compute(s) {
  const cas = CASES[Math.round(s.cas)];
  const sect = SECT[Math.round(s.sect)];
  const A = s.A, Nd = s.Nd;
  const lcr = cas.f * s.l * 1000;                    // mm
  const rA = Math.sqrt(A);
  const x = lcr / rA;
  const Npl = (A * F_CD) / 1000;                     // kN
  const v = Nd / Npl;
  const i = sect.r * rA;
  const I = i * i * A;
  const dia = Math.sqrt((4 * A) / Math.PI);
  const lam = lcr / i;
  const sig = (Math.PI ** 2 * E_MOD) / (lam * lam);
  const Ncr = (sig * A) / 1000;                      // kN
  const util = Ncr > 0 ? Nd / Ncr : Infinity;
  const vChart = chartCurve(x);
  const vEuler = sig / F_CD;
  const NallowChart = vChart * Npl;
  const fails = v > vChart;

  // how long could it be, by each reading
  const lmaxE = lcr * Math.sqrt(Ncr / Math.max(Nd, 1e-9));
  let lo = 1, hi = 400;                              // solve chartCurve(x) = v
  for (let k = 0; k < 60; k++) {
    const mid = (lo + hi) / 2;
    if (chartCurve(mid) > v) lo = mid; else hi = mid;
  }
  const lmaxC = ((lo + hi) / 2) * rA;

  // restraints: how many to make every segment safe
  let nRes = 0;
  while (nRes < 20 && Ncr * (nRes + 1) ** 2 < Nd) nRes++;
  const NcrRes = Ncr * (nRes + 1) ** 2;

  // the same area re-shaped as a tube that just works
  const iReq = Math.sqrt((Nd * 1000 * lcr * lcr) / (Math.PI ** 2 * E_MOD) / A);
  const sum = 4 * iReq * iReq, dif = A / Math.PI;
  const Rt = Math.sqrt(Math.max((sum + dif) / 2, 1e-9));
  const rt = Math.sqrt(Math.max((sum - dif) / 2, 0));
  const Itube = (Math.PI * (Rt ** 4 - rt ** 4)) / 4;
  const NcrTube = (Math.PI ** 2 * E_MOD * Itube) / (lcr * lcr) / 1000;

  return { cas, sect, l: s.l, A, Nd, lcr, rA, x, v, Npl, i, I, dia, lam, sig, Ncr,
           util, vChart, vEuler, NallowChart, fails, lmaxE, lmaxC,
           nRes, NcrRes, iReq, Rt, rt, NcrTube };
}

// ------------------------------------------------------------------- view
export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const NARR = dw.W.narrow;
  const cp = (x, v) => [CX0 + x * KX, CY0 + v * KY];       // chart coordinates
  const NSEG = 60;

  const OK = { final: (d) => (!d ? PAL.black : d.fails ? PAL.red : PAL.green) };

  dw.label('tChart', 'buckling behaviour for different steel profiles', { cls: 'title', flash: false });
  dw.label('tCol', '', { cls: 'title', flash: false });
  dw.label('tStrip', 'the five support conditions the sheet prints', { cls: 'title', flash: false });

  // ---- the column as given
  dw.seg('col', { intro: 1, w: dw.W.bar * 1.4, color: PAL.black });
  dw.dashLine('bow', { intro: 1, color: PAL.grey, dash: dw.W.dash * 0.7 });
  dw.disk('hTop', { intro: 1, r: dw.W.disk });
  dw.disk('hBot', { intro: 1, r: dw.W.disk });
  dw.strokes('gnd', 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.arrow('Nd', { intro: 1, color: PAL.green, ...NARR });
  dw.label('lNd', '', { cls: 'num', intro: 1, color: PAL.green });
  dw.strokes('dimL', 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('ldimL', '', { intro: 1, flash: false, color: PAL.grey });
  dw.circle('sect', { intro: 1, color: PAL.black, flash: false });
  dw.label('lsect', '', { cls: 'num', intro: 1, flash: false });

  // ---- the five support cases
  for (let i = 0; i < CASES.length; i++) {
    dw.seg(`cs${i}`, { intro: 2, w: dw.W.thin, color: PAL.black, flash: false });
    dw.dashLine(`cb${i}`, { intro: 2, color: PAL.grey, dash: dw.W.dash * 0.5, flash: false });
    dw.label(`cl${i}`, '', { cls: 'num', intro: 2,
      color: { pending: PAL.black, final: (d) => (d && d.cas === CASES[i] ? PAL.green : PAL.grey) } });
  }

  // ---- the chart
  dw.strokes('axes', 2, { intro: 4, w: dw.W.str, color: PAL.black, flash: false });
  dw.strokes('ticks', 12, { intro: 4, w: dw.W.dim, color: PAL.black, flash: false });
  for (const [n, t] of [['x0', '0'], ['x50', '50'], ['x100', '100'], ['x150', '150'],
                        ['y02', '0.2'], ['y04', '0.4'], ['y06', '0.6'], ['y08', '0.8'], ['y10', '1.0']]) {
    dw.label(`t_${n}`, t, { cls: 'point', intro: 4, flash: false });
  }
  dw.label('axX', 'l_cr / √A', { cls: 'num', intro: 4, flash: false });
  dw.label('axY', 'N_d / (A · f_cd)', { cls: 'num', intro: 4, flash: false });
  dw.strokes('curve', NSEG, { intro: 4, w: dw.W.bar * 0.8, color: PAL.black, cap: false });
  dw.label('lcurve', '', { cls: 'num', intro: 4, flash: false });
  dw.strokes('euler', NSEG, { intro: 6, w: dw.W.thin, color: PAL.blue, cap: false,
    when: (st) => st.euler });
  dw.label('leuler', '', { cls: 'num', intro: 6, color: PAL.blue, when: (st) => st.euler });

  dw.dashLine('dropX', { intro: 3, color: PAL.green, dash: dw.W.dash * 0.6 });
  dw.dashLine('dropY', { intro: 3, color: PAL.green, dash: dw.W.dash * 0.6 });
  dw.label('ldropX', '', { cls: 'num', intro: 3, color: PAL.green });
  dw.label('ldropY', '', { cls: 'num', intro: 3, color: PAL.green });
  dw.disk('pt', { intro: 5, r: dw.W.disk * 1.2 });
  dw.label('lpt', '', { cls: 'num', intro: 5, color: OK });
  dw.seg('gap', { intro: 5, w: dw.W.dim, color: OK });
  dw.label('lgap', '', { cls: 'num', intro: 5, color: OK });
  dw.disk('ptC', { intro: 5, r: dw.W.disk * 0.8 });
  dw.disk('ptE', { intro: 6, r: dw.W.disk * 0.8, when: (st) => st.euler });

  // ---- the braced column of part b)
  dw.seg('bcol', { intro: 7, w: dw.W.bar * 1.4, color: PAL.black });
  dw.strokes('brest', 6, { intro: 7, w: dw.W.thin, color: PAL.green });
  dw.dashLine('bbow', { intro: 7, color: PAL.grey, dash: dw.W.dash * 0.5, flash: false });
  dw.label('lbcol', '', { cls: 'num', intro: 7, color: PAL.green });
  dw.circle('tubeO', { intro: 7, color: PAL.blue, flash: false });
  dw.circle('tubeI', { intro: 7, color: PAL.blue, flash: false });
  dw.label('ltube', '', { cls: 'num', intro: 7, color: PAL.blue });

  dw.instant('tChart', 'tCol', 'tStrip');
  dw.ghostable('curve', 'gap');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    // ---- the column
    const H = d.l * CH;
    const base = COL, top = [COL[0], COL[1] + H];
    dw.setSeg('col', base, top);
    dw.setDisk('hBot', base);
    dw.setDisk('hTop', top);
    dw.setStrokes('gnd', V.hatch([base[0] - 1.6, base[1] - 0.55],
      [base[0] + 1.6, base[1] - 0.55], -1, 0.8, 5));
    // the buckled shape of the chosen case: one half wave per l_cr
    const amp = 1.7;
    const nw = d.cas.f >= 2 ? 0.25 : 1 / d.cas.f / 2;
    dw.setDashLine('bow', Array.from({ length: 41 }, (_, k) => {
      const t = k / 40;
      return [base[0] + amp * Math.sin(Math.PI * 2 * nw * t), base[1] + H * t];
    }));
    dw.setArrow('Nd', [top[0], top[1] + 4.2], [top[0], top[1] + 1.0]);
    dw.setLabel('lNd', [top[0] + 3.6, top[1] + 2.8]);
    dw.setText('lNd', `N_d = ${d.Nd.toFixed(0)} kN`);
    dw.setStrokes('dimL', [[base, top],
      [[base[0] - 0.5, base[1]], [base[0] + 0.5, base[1]]],
      [[base[0] - 0.5, top[1]], [base[0] + 0.5, top[1]]],
      [base, base], [top, top]].map(([a, b]) =>
      [[a[0] - 2.4, a[1]], [b[0] - 2.4, b[1]]]));
    dw.setLabel('ldimL', [base[0] - 4.4, base[1] + H / 2]);
    dw.setText('ldimL', `l = ${(d.l * 1000).toFixed(0)} mm`);
    dw.setCircle('sect', [base[0] + 5.0, base[1] + 3.2], (d.dia / 2) * 0.10);
    dw.setLabel('lsect', [base[0] + 5.0, base[1] + 0.9]);
    dw.setText('lsect', `i/√A = ${d.sect.r.toFixed(4)}`);
    dw.setLabel('tCol', [base[0] + 6.0, base[1] + H + 6.0]);
    dw.setText('tCol', `${d.sect.n} · case ${d.cas.k}) ⇒ l_cr = ${d.lcr.toFixed(0)} mm`);

    // ---- the five support cases
    dw.setLabel('tStrip', [STRIP.x0 + 2 * STRIP.dx, STRIP.y + STRIP.h + 1.6]);
    CASES.forEach((c, i) => {
      const x0 = STRIP.x0 + i * STRIP.dx;
      dw.setSeg(`cs${i}`, [x0, STRIP.y], [x0, STRIP.y + STRIP.h]);
      const w = c.f >= 2 ? 0.25 : 1 / c.f / 2;
      dw.setDashLine(`cb${i}`, Array.from({ length: 25 }, (_, k) => {
        const t = k / 24;
        return [x0 + 0.85 * Math.sin(Math.PI * 2 * w * t), STRIP.y + STRIP.h * t];
      }));
      dw.setLabel(`cl${i}`, [x0 + 0.4, STRIP.y - 1.2]);
      dw.setText(`cl${i}`, `${c.k}) ${c.z}`);
    });

    // ---- the chart frame
    dw.setStrokes('axes', [[cp(0, 0), cp(XMAX, 0)], [cp(0, 0), cp(0, VMAX)]]);
    const tk = [];
    for (const x of [0, 50, 100, 150]) tk.push([cp(x, 0), [cp(x, 0)[0], cp(x, 0)[1] - 0.55]]);
    for (const v of [0.2, 0.4, 0.6, 0.8, 1.0]) tk.push([cp(0, v), [cp(0, v)[0] - 0.55, cp(0, v)[1]]]);
    for (const x of [25, 75, 125, 175]) tk.push([cp(x, 0), [cp(x, 0)[0], cp(x, 0)[1] - 0.3]]);
    while (tk.length < 12) tk.push([cp(0, 0), cp(0, 0)]);
    dw.setStrokes('ticks', tk.slice(0, 12));
    [['x0', 0], ['x50', 50], ['x100', 100], ['x150', 150]].forEach(([n, x]) =>
      dw.setLabel(`t_${n}`, [cp(x, 0)[0], cp(x, 0)[1] - 1.4]));
    [['y02', 0.2], ['y04', 0.4], ['y06', 0.6], ['y08', 0.8], ['y10', 1.0]].forEach(([n, v]) =>
      dw.setLabel(`t_${n}`, [cp(0, v)[0] - 1.7, cp(0, v)[1]]));
    dw.setLabel('axX', [cp(XMAX / 2, 0)[0], cp(0, 0)[1] - 2.9]);
    dw.setLabel('axY', [cp(0, VMAX)[0] + 6.0, cp(0, VMAX)[1] + 1.2]);
    dw.setLabel('tChart', [cp(XMAX / 2, 0)[0], cp(0, VMAX)[1] + 3.2]);

    // the printed curve, and the Euler curve for the chosen shape
    const seg = (fn) => {
      const out = [];
      for (let k = 0; k < NSEG; k++) {
        const xa = 3 + ((XMAX - 3) * k) / NSEG;
        const xb = 3 + ((XMAX - 3) * (k + 1)) / NSEG;
        const va = Math.min(VMAX, fn(xa)), vb = Math.min(VMAX, fn(xb));
        out.push(va >= VMAX && vb >= VMAX ? [cp(xa, VMAX), cp(xb, VMAX)]
          : [cp(xa, va), cp(xb, vb)]);
      }
      return out;
    };
    dw.setStrokes('curve', seg(chartCurve));
    const eul = (x) => (Math.PI ** 2 * E_MOD * d.sect.r ** 2) / (F_CD * x * x);
    dw.setStrokes('euler', seg(eul));
    dw.setLabel('lcurve', cp(72, chartCurve(72) + 0.10));
    dw.setText('lcurve', 'the sheet’s curve, digitised');
    dw.setLabel('leuler', cp(163, Math.min(0.9, eul(163)) + 0.22));
    dw.setText('leuler', `Euler, ${d.sect.n}`);

    // the demand point, and how far it misses
    const px = Math.min(d.x, XMAX), pv = Math.min(d.v, VMAX);
    dw.setDashLine('dropX', [cp(px, 0), cp(px, pv)]);
    dw.setDashLine('dropY', [cp(0, pv), cp(px, pv)]);
    dw.setLabel('ldropX', [cp(px, 0)[0], cp(px, 0)[1] - 2.9]);
    dw.setText('ldropX', `${d.x.toFixed(1)}`);
    dw.setLabel('ldropY', [cp(0, pv)[0] - 1.9, cp(0, pv)[1] + 1.2]);
    dw.setText('ldropY', `${d.v.toFixed(3)}`);
    dw.setDisk('pt', cp(px, pv));
    dw.setLabel('lpt', [cp(px, pv)[0] + 7.0, cp(px, pv)[1] + 1.3]);
    dw.setText('lpt', `(${d.x.toFixed(1)}, ${d.v.toFixed(3)}) ${d.fails ? '— it buckles' : '— stable'}`);
    dw.setDisk('ptC', cp(px, Math.min(d.vChart, VMAX)));
    dw.setDisk('ptE', cp(px, Math.min(d.vEuler, VMAX)));
    dw.setSeg('gap', cp(px, Math.min(d.vChart, VMAX)), cp(px, pv));
    dw.setLabel('lgap', [cp(px, (Math.min(d.vChart, VMAX) + pv) / 2)[0] + 6.4,
                         cp(px, (Math.min(d.vChart, VMAX) + pv) / 2)[1] - 3.6]);
    dw.setText('lgap', `chart ${d.NallowChart.toFixed(2)} · Euler ${d.Ncr.toFixed(2)} kN`);

    // ---- part b): the restrained column and the tube
    const bh = d.l * CH;
    dw.setSeg('bcol', FIX, [FIX[0], FIX[1] + bh]);
    const rs = [];
    for (let k = 1; k <= 5; k++) {
      const y = FIX[1] + (bh * k) / (d.nRes + 1);
      rs.push(k <= d.nRes ? [[FIX[0] - 1.5, y], [FIX[0] + 1.5, y]] : [FIX, FIX]);
    }
    rs.push([FIX, FIX]);
    dw.setStrokes('brest', rs.slice(0, 6));
    dw.setDashLine('bbow', Array.from({ length: 61 }, (_, k) => {
      const t = k / 60;
      return [FIX[0] + 0.9 * Math.sin(Math.PI * (d.nRes + 1) * t), FIX[1] + bh * t];
    }));
    dw.setLabel('lbcol', [FIX[0] + 3.6, FIX[1] + bh + 2.6]);
    dw.setText('lbcol', `${d.nRes} restraints ⇒ N_cr = ${d.NcrRes.toFixed(1)} kN`);
    dw.setCircle('tubeO', [FIX[0] + 8.6, FIX[1] + 3.2], d.Rt * 0.10);
    dw.setCircle('tubeI', [FIX[0] + 8.6, FIX[1] + 3.2], d.rt * 0.10);
    dw.setLabel('ltube', [FIX[0] + 8.6, FIX[1] - 1.4]);
    dw.setText('ltube', `⌀${(2 * d.Rt).toFixed(1)} × ${(d.Rt - d.rt).toFixed(2)} ⇒ ${d.NcrTube.toFixed(1)} kN`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const g = panel.section('The column');
  panel.slider(g, s, 'l', 'length l (m)', 0.2, 5, 0.1, refresh, (v) => `${v.toFixed(2)} m`);
  panel.slider(g, s, 'A', 'area A (mm²)', 100, 2000, 20, refresh, (v) => `${v.toFixed(0)} mm²`);
  panel.slider(g, s, 'Nd', 'N_d (kN)', 0, 200, 2, refresh, (v) => `${v.toFixed(0)} kN`);
  panel.slider(g, s, 'cas', 'support condition', 0, 4, 1, refresh,
    (v) => `${CASES[Math.round(v)].k}) ${CASES[Math.round(v)].s}`);
  panel.slider(g, s, 'sect', 'section shape', 0, 2, 1, refresh,
    (v) => SECT[Math.round(v)].n);
  const w = panel.section('The chart');
  panel.toggle(w, s, 'euler', 'overlay the exact Euler curve', refresh);
  panel.toggle(w, s, 'lbl', 'show the numbers', refresh);

  refresh();
  return player;
}
