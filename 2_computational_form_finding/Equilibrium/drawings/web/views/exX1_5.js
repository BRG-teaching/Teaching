/**
 * EX X · Task 5 — Funicular form through a given point
 * Structural Design I, HS 22, "Additional Exercises", sheet page 5.
 *
 * TEXT (verbatim, English sheet).
 *   "Task 5 · Funicular form — For scenarios a) to d), find and draw the
 *    funicular form through the given point. Make use of the force diagram in
 *    c) and d). Draw the direction of the reaction force in the form diagram
 *    and mark tension forces with red and compression forces with blue."
 *   a) a single point load F · b) a uniform q · c) q plus a point load F, with
 *   the force diagram partly given (R_q, F, R_tot, pole o') · d) q plus two
 *   point loads F1 and F2, force diagram giving F1, R_q, F2, R_tot.
 *
 * THE SHEET PRINTS NO MAGNITUDES AND NO SCALE FOR TASK 5. Checked in all four
 * PDFs (task-en, aufgabe-de, solution-en, solution-de, page 5 of each): the
 * complete text inventory of those pages is F, q, F1, F2, R_q, R_tot, o', A, B,
 * f, l, l/3, 1, 2 and the captions. There is not a single number, and the
 * caption reads "form diagram" with no ratio, unlike every other page of the
 * booklet. That is not an omission: THE FORM DOES NOT DEPEND ON THE MAGNITUDES.
 * Only the RATIOS between the loads and the position of the through-point
 * decide it. Multiply every load by any factor and the drawing is unchanged;
 * only the force diagram rescales. The ratios that are needed are given, by the
 * printed force diagrams of c) and d) — see below. Everything here is therefore
 * a multiple of F (or of R_q = q·l/3) and of l, and the view says so.
 *
 * GEOMETRY, digitised from the task page. Origin = support A, y upwards.
 *   $PY web/tools/sheetvec.py .../task-en.pdf 5 --scale 100 --min 0.3 --cluster
 *   All four panels are identical. Panel a): axes at 6.912 / 8.914 / 10.910 /
 *   12.909, A apex (6.915, 31.262), B apex (12.908, 30.413); the dimension
 *   ticks at 6.909 / 8.910 / 10.911 / 12.912 are 2.001 apart, so the three
 *   thirds are exact and l = 6.003.
 *     span l                       5.997        = 1 l
 *     B below A, d                 0.849        = 0.14150 l
 *     given point P, x             2.001 from A = 2l/3
 *     given point P, depth p       2.849        = 0.474833 l
 *   p - d = 2.000 = l/3 EXACTLY, so the run from P to B is l/3 and the rise is
 *   l/3: the segment P-B is at 45 degrees. Confirmed on the solution page in
 *   all four panels (45.02 / 45.02 / 45.02 / 45.02 deg).
 *   Loads:  a) F at l/3 · b) q over the MIDDLE third · c) q over the FIRST
 *   third and F at 2l/3 · d) F1 at l/3, q over the middle third, F2 at 2l/3.
 *   In every case the last third is unloaded and the given point sits at its
 *   left end.
 *   The printed force diagrams give the ratios: c) R_q = 1.499, F = 1.500 ->
 *   F = R_q · d) F1 = 1.499, R_q = 1.500, F2 = 1.499 -> F1 = F2 = R_q.
 *
 * DERIVATION. For vertical loads the funicular through A and B is
 *   y(x) = (y_B - y_A)·x/l - M(x)/H
 * with M the SIMPLE-BEAM moment and H the horizontal thrust, the single free
 * parameter. Requiring y(2l/3) = -p spends it:
 *   H = M(2l/3) / (p - 2d/3),   here  p - 2d/3 = 2.283 = 0.38050 l
 * Equivalently, and this is the cleanest reading of the exercise: the last
 * third is unloaded in every case, so P-B is straight and its slope is fixed at
 * +1 by the geometry; since y'(l) = -d/l + B_v/H,
 *   H = B_v / (1 + d/l) = B_v / 1.1415
 * The two routes agree to 5 decimals in all four cases. THE GIVEN POINT FIXES
 * THE DIRECTION OF THE LAST SEGMENT, THAT FIXES THE REACTION AT B, AND THAT
 * FIXES THE POLE.
 * Reactions:  A_v,cable = A_v + H·d/l,  B_v,cable = B_v - H·d/l  (= H, always,
 * because the last segment is at 45 degrees), A = hypot(H, A_v,cable) etc.
 *
 * RESULTS, per unit load (F in a; Q = R_q in b, c, d):
 *                          a)F        b)q        c)q+F      d)F1+q+F2
 *   total                  1.00000    1.00000    2.00000    3.00000
 *   beam A_v / B_v      .66667/.33333  .5/.5   1.16667/.83333  1.5/1.5
 *   H                      0.29201    0.43802    0.73003    1.31406
 *   A_v,cable              0.70799    0.56198    1.26997    1.68594
 *   B_v,cable              0.29201    0.43802    0.73003    1.31406
 *   reaction A             0.76584    0.71252    1.46484    2.13756
 *   reaction B             0.41297    0.61945    1.03242    1.85836
 *   sag f of the parabola     -       0.57075    0.34245    0.19025
 *   ordinates at l/3       -4.8490    -2.5660    -2.1094    -2.5660
 *   ordinate at 2l/3       -2.8490 in all four (that IS the given point)
 * Nothing above used a magnitude: every entry is a pure number times F or Q,
 * and the geometry rows contain neither.
 *
 * THE OFFICIAL KEY (solution-en.pdf p. 5) again prints no numbers; it draws the
 * answer and dimensions the sag f TWICE (the classic tangent construction: the
 * two tangents meet 2f below the chord and the parabola passes f below it).
 * Digitised from the solution page:
 *   a) vertex (8.728, 26.413), A at (6.727, 31.262)      -> depth 4.849
 *   b) f ticks at y = 28.558 / 27.987 / 27.416           -> f = 0.571
 *   c) f ticks at y = 14.650 / 14.307 / 13.965           -> f = 0.343
 *   d) f ticks at y = 12.998 / 12.808 / 12.617           -> f = 0.190
 *   P-B in all four panels                               -> 45.02 deg
 *
 * AGREEMENT WITH THE KEY: complete — no error found in task 5.
 *   a) vertex depth   4.8490 vs 4.849   (0.00 %)
 *   b) sag f          0.57075 vs 0.571  (0.04 %)
 *   c) sag f          0.34245 vs 0.343  (0.16 %)
 *   d) sag f          0.19025 vs 0.190  (0.13 %)
 *   slope of P-B      exactly +1 (45.000 deg) vs 45.02 deg
 * The three f values are a strong check: they come from three different load
 * arrangements, they differ by a factor of three between the extremes, and the
 * only inputs are the through-point and the ratio F : R_q = 1 : 1 read off the
 * printed force diagrams. Getting all three right confirms both the geometry
 * and that reading.
 *
 * WHAT CANNOT BE ANSWERED: no absolute force and no absolute length, because
 * the sheet gives none. The view works in "units of l" with l = 6.00 so that
 * numbers can be printed, and quotes every force as a coefficient of the unit
 * load as well as in the working kN.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

const L = 6.00;                 // the span, in the sheet's own drawing units
const DREL = 0.14150;           // B below A, as a fraction of l (0.849 / 5.997)
const PXR = 2 / 3;              // the given point's x, as a fraction of l
const PDREF = 0.474833;         // its depth below A, as a fraction of l
const RHOREF = 1.0;             // F / R_q, from the printed force diagrams
const UREF = 60;                // the working value of the unit load, kN
const KEYF = [null, 0.571, 0.343, 0.190];   // f as the key draws it
const KEYV = 4.849;                          // a)'s vertex depth as drawn
const NFUN = 96;                             // samples along the funicular

// Laid out against `occlusion.py --cards` for this frame: the caption card owns
// x < -11.24 above y = 5.60, the RESULT card owns x < -3.72 below y = -12.58.
const MU = 1.85, FX0 = -26.5, FY0 = 1.0;
const YBAR = 3.0, YTIP = 1.2;   // load arrows above the chord, in units
const YTIT = -11.0;             // the form diagram's title line
const LX = 4, LY0 = 11;         // the load line
const FDL = 15;                 // its drawn length at the reference load
const RLEN = 3.4;               // reaction arrows: DIRECTION is what is asked

const TAG = ['a)', 'b)', 'c)', 'd)'];
const NAME = ['a single point load F at l/3',
              'a uniform q over the middle third',
              'q over the first third, plus F at 2l/3',
              'F₁ at l/3, q over the middle third, F₂ at 2l/3'];

const DEFAULTS = { cas: 0, U: UREF, rho: RHOREF, pd: PDREF, lbl: true, _k: 99 };

// ---------------------------------------------------------------- maths ----
function caseLoads(cas, U, rho) {
  const a = L / 3;
  const pts = [], udl = [];
  if (cas === 0) pts.push({ x: a, P: U, nm: 'F' });
  if (cas === 1) udl.push({ x0: a, x1: 2 * a, Q: U, nm: 'R_q' });
  if (cas === 2) {
    udl.push({ x0: 0, x1: a, Q: U, nm: 'R_q' });
    pts.push({ x: 2 * a, P: rho * U, nm: 'F' });
  }
  if (cas === 3) {
    pts.push({ x: a, P: rho * U, nm: 'F₁' });
    udl.push({ x0: a, x1: 2 * a, Q: U, nm: 'R_q' });
    pts.push({ x: 2 * a, P: rho * U, nm: 'F₂' });
  }
  return { pts, udl };
}

/** simple-beam reactions of the load set on the span L */
function beam(pts, udl) {
  let tot = 0, mB = 0;
  for (const p of pts) { tot += p.P; mB += p.P * (L - p.x); }
  for (const u of udl) {
    const c = (u.x0 + u.x1) / 2; tot += u.Q; mB += u.Q * (L - c);
  }
  const Av = mB / L;
  return { tot, Av, Bv: tot - Av };
}

/** simple-beam moment, with the distributed load treated as distributed */
function Mreal(pts, udl, Av, x) {
  let m = Av * x;
  for (const p of pts) if (p.x < x - 1e-9) m -= p.P * (x - p.x);
  for (const u of udl) {
    if (x <= u.x0) continue;
    const xe = Math.min(x, u.x1), w = u.Q / (u.x1 - u.x0);
    m -= w * (xe - u.x0) * (x - (u.x0 + xe) / 2);
  }
  return m;
}

/** ... and with each distributed load lumped at its centroid: the POLYGON */
function Mlump(lumps, Av, x) {
  let m = Av * x;
  for (const q of lumps) if (q.x < x - 1e-9) m -= q.P * (x - q.x);
  return m;
}

function compute(s) {
  const cas = Math.round(s.cas), U = s.U, rho = s.rho;
  const { pts, udl } = caseLoads(cas, U, rho);
  const { tot, Av, Bv } = beam(pts, udl);
  const d = DREL * L;                       // B below A
  const p = s.pd * L;                       // the given point, below A
  const xP = PXR * L;

  // the through-point spends the one free parameter
  const H = Mreal(pts, udl, Av, xP) / (p - (d * xP) / L);
  const Hchk = Bv / (1 + d / L);            // the same number, read at B

  const yr = (x) => -(d * x) / L - Mreal(pts, udl, Av, x) / H;

  // the lumped load set, in span order, and its polygon
  const lumps = [...pts.map((q) => ({ x: q.x, P: q.P, nm: q.nm, udl: false })),
                 ...udl.map((u) => ({ x: (u.x0 + u.x1) / 2, P: u.Q, nm: u.nm, udl: true }))]
    .sort((a, b) => a.x - b.x);
  const yp = (x) => -(d * x) / L - Mlump(lumps, Av, x) / H;
  const nL = lumps.length;
  const vs = [[0, 0], ...lumps.map((q) => [q.x, yp(q.x)]), [L, -d]];

  // reactions on the cable
  const Avc = Av + (H * d) / L, Bvc = Bv - (H * d) / L;
  const TA = Math.hypot(H, Avc), TB = Math.hypot(H, Bvc);
  const angA = (Math.atan2(Avc, H) * 180) / Math.PI;
  const angB = (Math.atan2(Bvc, H) * 180) / Math.PI;
  const slopeB = -d / L + Bv / H;

  // the funicular itself
  const curve = [];
  for (let i = 0; i <= NFUN; i++) { const x = (L * i) / NFUN; curve.push([x, yr(x)]); }

  // the parabola's tangent construction, for the one distributed block
  let par = null;
  if (udl.length) {
    const u = udl[0];
    const j = lumps.findIndex((q) => q.udl);
    const Vt = vs[j + 1];
    const T1 = [u.x0, yr(u.x0)], T2 = [u.x1, yr(u.x1)];
    const Mc = [(T1[0] + T2[0]) / 2, (T1[1] + T2[1]) / 2];
    const Pm = [Mc[0], (Mc[1] + Vt[1]) / 2];
    par = { j, Vt, T1, T2, Mc, Pm, f: (Mc[1] - Vt[1]) / 2, x0: u.x0, x1: u.x1 };
  }

  // the load line, top to bottom, and the pole
  const ldiv = [0];
  for (const q of lumps) ldiv.push(ldiv[ldiv.length - 1] + q.P);
  const sfd = FDL / (UREF * [1, 1, 2, 3][cas]);

  const unit = cas === 0 ? 'F' : 'R_q';
  const atSheet = Math.abs(s.pd - PDREF) < 2e-4 && Math.abs(rho - RHOREF) < 1e-6;

  return { cas, tag: TAG[cas], name: NAME[cas], U, rho, pd: s.pd, unit, atSheet,
           pts, udl, lumps, nL, tot, Av, Bv, d, p, xP, H, Hchk,
           vs, curve, par, Avc, Bvc, TA, TB, angA, angB, slopeB,
           ldiv, sfd, yr, keyF: KEYF[cas],
           yThird: yr(L / 3), yP: yr(xP) };
}

const c3 = (v) => v.toFixed(5);

// ---------------------------------------------------------------- steps ----
const STEPS = [
  { t: 'The exercise — and what the sheet does not give you',
    d: 'page 5 asks for the funicular that passes through a marked point. Four load cases, and not one number anywhere: no F, no q, no span, no scale, in either language and in the solution too. That is deliberate — the FORM does not depend on the magnitudes at all',
    detail: () => ['the whole text inventory of page 5 is F, q, F₁, F₂, R_q, R_tot, o′, A, B, f, l, l/3',
                   'so every answer here is a multiple of F (or of R_q = q·l/3) and of l',
                   'only the RATIOS between the loads matter, and c) and d) print those in their force diagrams'],
    take: 'a funicular’s shape is scale-free: double every load and the drawing does not move' },

  { t: 'The geometry, and the given point',
    d: 'left: the span, divided in thirds. The supports are NOT level — B sits below A — and the little circle at two thirds of the span is the point the cable has to pass through. Everything else follows from those three points',
    detail: (d) => [`span l = ${L.toFixed(2)} · B is ${(DREL).toFixed(5)}·l = ${d.d.toFixed(4)} below A (digitised 0.849 / 5.997)`,
                    `the given point: x = 2l/3, depth ${d.pd.toFixed(6)}·l = ${d.p.toFixed(4)} below A`,
                    `p − d = ${(d.p - d.d).toFixed(4)} — and l/3 = ${(L / 3).toFixed(4)}: the run and the rise from P to B are equal`],
    take: 'because p − d = l/3 exactly, the segment from the given point to B is at 45°. The key draws 45.02° in all four panels' },

  { t: 'The loads',
    d: 'the case on show. Note what all four have in common: the last third of the span carries nothing, and the given point sits exactly at its left-hand end. That is the hinge of the whole exercise',
    detail: (d) => [`${d.tag} ${d.name}`,
                    d.cas === 0 ? `F at x = l/3, working value ${d.U.toFixed(1)} kN`
                      : d.cas === 1 ? `q over [l/3, 2l/3], R_q = q·l/3 = ${d.U.toFixed(1)} kN`
                      : d.cas === 2 ? `R_q over [0, l/3] and F at 2l/3, with F/R_q = ${d.rho.toFixed(2)}`
                      : `F₁ at l/3, R_q over the middle third, F₂ at 2l/3, with F/R_q = ${d.rho.toFixed(2)}`,
                    d.cas >= 2
                      ? `the sheet’s own force diagram fixes that ratio: it draws ${d.cas === 2 ? 'R_q = 1.499 and F = 1.500' : 'F₁ = 1.499, R_q = 1.500, F₂ = 1.499'} → ratio 1.00`
                      : 'no magnitude is needed for the form — only for the size of the force diagram'] },

  { t: 'Lump each load, and lay the load line out',
    d: 'a distributed load can be replaced by its resultant while the polygon is being found; the parabola gets put back afterwards, tangent to the polygon at the ends of the loaded stretch. Right: the resultants stacked into the load line, exactly as the sheet prints them in c) and d)',
    detail: (d) => [`${d.nL} resultant${d.nL > 1 ? 's' : ''}: ${d.lumps.map((q) => `${q.nm} = ${q.P.toFixed(1)} kN at x = ${q.x.toFixed(3)}`).join(' · ')}`,
                    `R_tot = ${d.tot.toFixed(1)} kN at x = ${(d.lumps.reduce((a, q) => a + q.P * q.x, 0) / d.tot).toFixed(3)}`,
                    `simple-beam reactions A_v = ${d.Av.toFixed(3)} · B_v = ${d.Bv.toFixed(3)} kN`] },

  { t: 'The given point pins the pole',
    d: 'now the difference from task 4. There the pole was free; here it is not. The last third is unloaded, so the cable runs straight from the given point to B — and that segment’s direction is already known. A known direction at B is a known reaction at B, and a known reaction at B is the pole',
    detail: (d) => [`the last segment must have slope ${d.slopeB.toFixed(5)} — the geometry gives it, no statics needed`,
                    `H = B_v / (1 + d/l) = ${d.Bv.toFixed(3)} / ${(1 + d.d / L).toFixed(4)} = ${d.H.toFixed(4)} kN`,
                    `read the other way, H = M(2l/3) / (p − 2d/3) = ${Mreal(d.pts, d.udl, d.Av, d.xP).toFixed(3)} / ${(d.p - 2 * d.d / 3).toFixed(4)} = ${d.Hchk.toFixed(4)} kN ✓`,
                    `as a coefficient: H = ${(d.H / d.U).toFixed(5)} · ${d.unit}`],
    take: 'move the given point and the pole moves with it — but change every load by the same factor and the pole distance changes while the SHAPE does not' },

  { t: 'The rays, and the funicular polygon',
    d: 'join the pole to each division of the load line and transfer the directions back. That gives the polygon of the lumped loads — grey here, because for a distributed load it is scaffolding rather than the answer',
    detail: (d) => [`${d.nL + 1} rays, ${d.nL + 1} polygon segments`,
                    d.par ? `the polygon’s kink over the loaded stretch sits at x = ${d.par.Vt[0].toFixed(3)}, ${(-d.par.Vt[1]).toFixed(4)} below A`
                          : 'with a single point load the polygon IS the funicular — two straight segments',
                    'hover any segment to light up the ray that carries its force'] },

  { t: 'The funicular form',
    d: 'red is the answer: straight wherever nothing is applied, parabolic under the uniform load, kinked under each point load — and through the marked point by construction. The parabola is tangent to the polygon at both ends of the loaded stretch and hangs half as deep as the polygon’s kink',
    detail: (d) => [`ordinates below A: ${(-d.yThird).toFixed(4)} at l/3 · ${(-d.yP).toFixed(4)} at 2l/3 (= the given point ✓) · ${d.d.toFixed(4)} at B`,
                    d.par ? `sag f = ${d.par.f.toFixed(5)}, and the tangent triangle is 2f = ${(2 * d.par.f).toFixed(5)} deep`
                          : `the vertex under F is ${(-d.yThird).toFixed(4)} below A`,
                    d.atSheet
                      ? (d.par ? `the key dimensions f = ${d.keyF.toFixed(3)} — agreement to ${Math.abs(d.par.f - d.keyF) < 0.001 ? 'three' : 'two'} decimals`
                               : `the key draws the vertex at ${KEYV.toFixed(3)} — agreement to three decimals`)
                      : 'you have moved the through-point or the load ratio off the sheet’s values'],
    take: 'that “f and f again” is the construction the key dimensions twice in b), c) and d)' },

  { t: 'The reactions',
    d: 'each reaction runs along the cable segment that meets it, so their directions were settled the moment the pole was. They are what the sheet actually asks you to draw. Note B: its vertical component always comes out equal to H, because the last segment is at 45°',
    detail: (d) => [`A = ${d.TA.toFixed(3)} kN at ${d.angA.toFixed(2)}° above the horizontal = ${(d.TA / d.U).toFixed(5)} · ${d.unit}`,
                    `B = ${d.TB.toFixed(3)} kN at ${d.angB.toFixed(2)}° = ${(d.TB / d.U).toFixed(5)} · ${d.unit}`,
                    `vertical check: ${d.Avc.toFixed(3)} + ${d.Bvc.toFixed(3)} = ${(d.Avc + d.Bvc).toFixed(3)} = R_tot ✓ · horizontal: ${d.H.toFixed(3)} each way ✓`],
    take: 'the cable is entirely in TENSION, so every member is red; nothing on this page is in compression' },

  { t: 'The form is independent of the magnitudes',
    d: 'now drag the unit load. The force diagram grows and shrinks; the form diagram does not move a millimetre. That is why the sheet can pose task 5 without printing a single number — and why only the RATIO F/R_q, which c) and d) do print, has to be given',
    detail: (d) => [`unit load ${d.U.toFixed(1)} kN → H = ${d.H.toFixed(3)} kN, but H/${d.unit} = ${(d.H / d.U).toFixed(5)} never changes`,
                    `ordinate at l/3 stays ${(-d.yThird).toFixed(4)}·(units of l) whatever the load`,
                    d.cas >= 2 ? `the ratio DOES matter: at F/R_q = ${d.rho.toFixed(2)} the sag is ${d.par ? d.par.f.toFixed(5) : '—'}, at 1.00 it is ${d.keyF ? d.keyF.toFixed(3) : '—'} (the key’s)`
                               : 'in a) and b) there is only one load, so there is no ratio left to give'],
    take: 'the through-point and the load ratios decide the form; the magnitudes decide only the forces' },
];

// ----------------------------------------------------------------- view ----
export const meta = {
  title: 'EX X · Task 5 — the funicular through a given point',
  subtitle: 'Structural Design I · sheet EX X “Additional Exercises”, page 5, cases a)–d)',
  about: 'Task 4 let the pole go free. Task 5 takes it back: the cable has to pass through a marked point, and that one extra condition fixes the horizontal thrust. The neat part is where the condition bites — the last third of the span is unloaded in all four cases and the given point sits at its left end, so the final segment’s direction is settled by geometry alone, at exactly 45°, before any statics happens. A known direction at B is a known reaction at B, and that is the pole. The sheet prints no magnitudes and no scale for this task, in either language and in the solution too, and this view treats that as the point rather than an omission: everything is worked as a multiple of F (or R_q = q·l/3) and of l, the load slider changes the force diagram while the form stands still, and the sag f is checked against the value the official key dimensions in b), c) and d).',
  result: (d) => [
    `${d.tag} ${d.name} — the sheet prints NO magnitudes and no scale for task 5, so every force below is a multiple of ${d.unit} (working value ${d.U.toFixed(1)} kN) and every length a multiple of l`,
    `the given point (2l/3, ${d.pd.toFixed(6)}·l below A) pins the pole: H = B_v/(1 + d/l) = ${d.H.toFixed(4)} kN = ${(d.H / d.U).toFixed(5)}·${d.unit}, and the segment P–B is at ${(Math.atan(d.slopeB) * 180 / Math.PI).toFixed(2)}°`,
    `A = ${d.TA.toFixed(3)} kN = ${(d.TA / d.U).toFixed(5)}·${d.unit} at ${d.angA.toFixed(2)}° · B = ${d.TB.toFixed(3)} kN = ${(d.TB / d.U).toFixed(5)}·${d.unit} at ${d.angB.toFixed(2)}° — both outwards, cable all in tension`,
    d.par
      ? `sag f = ${d.par.f.toFixed(5)} (tangent triangle 2f = ${(2 * d.par.f).toFixed(5)})` +
        (d.atSheet ? ` — the official key dimensions ${d.keyF.toFixed(3)}, agreement to 0.${Math.abs(d.par.f - d.keyF) < 0.001 ? '1' : '2'} %` : ' — off the sheet’s through-point / ratio')
      : `vertex under F at ${(-d.yThird).toFixed(4)} below A` +
        (d.atSheet ? ` — the official key draws ${KEYV.toFixed(3)}, agreement to three decimals` : ' — off the sheet’s through-point'),
  ],
  frame: [[-28, -24], [26, 18]],
};

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const fy = (x, y) => [FX0 + x * MU, FY0 + y * MU];        // form: y upwards
  const RED = { pending: PAL.black, final: () => PAL.red };

  dw.label('t_form', '', { cls: 'title', flash: false });
  dw.label('t_force', 'force diagram', { cls: 'title', flash: false });
  dw.label('t_note', '', { cls: 'point', flash: false, color: PAL.grey });

  // ---- form diagram: supports, chord, thirds, the given point
  for (const nm of ['A', 'B']) {
    dw.disk(`sup${nm}`, { intro: 1, r: dw.W.disk });
    dw.strokes(`hat${nm}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.label(`lsup${nm}`, nm, { cls: 'point', intro: 1, flash: false });
  }
  dw.dashLine('chordAB', { intro: 1, color: PAL.grey, dash: dw.W.dash });
  for (let i = 0; i < 4; i++) {
    dw.dashLine(`axis${i}`, { intro: 1, color: PAL.grey, dash: dw.W.dash });
  }
  dw.circle('gp', { intro: 1, color: PAL.black });
  dw.label('lgp', '', { cls: 'point', intro: 1 });

  // ---- the loads
  for (let i = 0; i < 2; i++) {
    dw.arrow(`ld${i}`, { intro: 2, color: PAL.green, ...ARR,
      when: (st, dd) => !!dd && i < dd.pts.length });
    dw.label(`lld${i}`, '', { cls: 'num', intro: 2, color: PAL.green,
      when: (st, dd) => !!dd && i < dd.pts.length });
  }
  dw.seg('qbar', { intro: 2, w: dw.W.thin, color: PAL.green,
    when: (st, dd) => !!dd && dd.udl.length > 0 });
  dw.arrows('qarr', 7, { intro: 2, w: dw.W.thin, color: PAL.green,
    headLen: NARR.headLen * 0.8, headW: NARR.headW * 0.8,
    when: (st, dd) => !!dd && dd.udl.length > 0 });
  dw.label('lq', 'q', { cls: 'num', intro: 2, color: PAL.green,
    when: (st, dd) => !!dd && dd.udl.length > 0 });

  // ---- the resultants, and the load line
  for (let i = 0; i < 3; i++) {
    dw.arrow(`ff${i}`, { intro: 3, color: PAL.green, ...NARR,
      when: (st, dd) => !!dd && i < dd.nL });
    dw.label(`lff${i}`, '', { cls: 'num', intro: 3, color: PAL.green,
      when: (st, dd) => !!dd && i < dd.nL && st.lbl });
  }
  dw.dashArrow('Rtot', { intro: 3, color: PAL.green, ...ARR });
  dw.label('lRtot', '', { cls: 'num', intro: 3, color: PAL.green });
  dw.seg('brk', { intro: 3, w: dw.W.dim, color: PAL.green, flash: false });
  dw.label('lbrk', '', { cls: 'num', intro: 3, color: PAL.green });

  // ---- the pole
  dw.disk('pole', { intro: 4, r: dw.W.disk * 0.85 });
  dw.label('lpole', 'o′', { cls: 'num', intro: 4 });
  dw.seg('dimH', { intro: 4, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lH', '', { intro: 4, flash: false, color: PAL.grey });
  dw.seg('lastSeg', { intro: 4, w: dw.W.bar, color: RED });

  // ---- rays and the polygon, in matched slots (0 = first, 3 = last)
  for (let i = 0; i < 4; i++) {
    dw.seg(`ray${i}`, { intro: 5, w: dw.W.ray, color: PAL.red });
    dw.seg(`pseg${i}`, { intro: 5, w: dw.W.dim, color: PAL.grey, flash: false });
  }
  for (let i = 0; i < 3; i++) {
    dw.disk(`pv${i}`, { intro: 5, r: dw.W.disk * 0.7,
      when: (st, dd) => !!dd && i < dd.nL });
  }

  // ---- the funicular, and the parabola construction
  dw.strokes('fun', NFUN, { intro: 6, w: dw.W.str, color: RED });
  dw.seg('chord', { intro: 6, w: dw.W.dim, color: PAL.grey, flash: false,
    when: (st, dd) => !!dd && !!dd.par });
  dw.seg('chray', { intro: 6, w: dw.W.ray, color: PAL.grey,
    when: (st, dd) => !!dd && !!dd.par });
  for (let i = 0; i < 2; i++) {
    dw.seg(`dimf${i}`, { intro: 6, w: dw.W.dim, color: PAL.grey, flash: false,
      when: (st, dd) => !!dd && !!dd.par });
    dw.label(`lf${i}`, 'f', { cls: 'num', intro: 6, flash: false, color: PAL.grey,
      when: (st, dd) => !!dd && !!dd.par });
  }
  dw.strokes('ftick', 3, { intro: 6, w: dw.W.dim, color: PAL.grey, flash: false,
    when: (st, dd) => !!dd && !!dd.par });
  dw.label('lfval', '', { cls: 'num', intro: 6, flash: false, color: PAL.grey,
    when: (st, dd) => !!dd && !!dd.par });

  // ---- reactions
  for (const nm of ['A', 'B']) {
    dw.arrow(`re${nm}`, { intro: 7, color: PAL.green, ...ARR });
    dw.label(`lre${nm}`, '', { cls: 'num', intro: 7, color: PAL.green });
  }

  dw.instant('t_form', 't_force', 't_note');
  dw.ghostable('ff0', 'ff1', 'ff2', 'ray0', 'ray1', 'ray2', 'ray3');
  dw.link('pseg0', 'ray0', 'reA');
  dw.link('pseg1', 'ray1');
  dw.link('pseg2', 'ray2');
  dw.link('pseg3', 'ray3', 'reB');
  dw.link('chord', 'chray');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    const NIL = [fy(0, 0), fy(0, 0)];

    dw.setLabel('t_form', [FX0 + (L / 2) * MU, YTIT]);
    dw.setText('t_form', `${d.tag} form diagram — no scale is printed`);
    dw.setLabel('t_force', [LX + 5.0, LY0 + 5.2]);
    dw.setLabel('t_note', [LX + 5.0, LY0 + 3.9]);
    dw.setText('t_note', `the sheet gives no magnitudes: 1 unit ≙ ${(1 / d.sfd).toFixed(2)} kN here`);

    // ---- supports, chord, thirds
    const A = fy(0, 0), B = fy(L, -d.d);
    dw.setDisk('supA', A); dw.setDisk('supB', B);
    dw.setStrokes('hatA', V.hatch([A[0] - 1.4, A[1] - 0.45], [A[0] + 1.4, A[1] - 0.45], -1, 0.8, 5));
    dw.setStrokes('hatB', V.hatch([B[0] - 1.4, B[1] - 0.45], [B[0] + 1.4, B[1] - 0.45], -1, 0.8, 5));
    dw.setLabel('lsupA', V.add(A, [1.7, 0.9]));
    dw.setLabel('lsupB', V.add(B, [-1.7, 0.9]));
    dw.setDashLine('chordAB', [A, B]);

    const yb = FY0 + YBAR, yt = FY0 + YTIP;
    const ylo = FY0 + Math.min(-d.p, -d.d, ...d.curve.map((c) => c[1])) * MU - 0.6;
    for (let i = 0; i < 4; i++) {
      const wx = FX0 + ((L * i) / 3) * MU;
      dw.setDashLine(`axis${i}`, [[wx, yb], [wx, ylo]]);
    }
    // the given point
    const GP = fy(d.xP, -d.p);
    dw.setCircle('gp', GP, 0.40);
    dw.setLabel('lgp', V.add(GP, [5.4, -1.5]));
    dw.setText('lgp', 'the given point');

    // ---- the loads
    for (let i = 0; i < 2; i++) {
      if (i < d.pts.length) {
        const wx = FX0 + d.pts[i].x * MU;
        dw.setArrow(`ld${i}`, [wx, yb], [wx, yt]);
        dw.setLabel(`lld${i}`, [wx + 0.85, (yb + yt) / 2]);
        dw.setText(`lld${i}`, d.pts[i].nm);
      } else {
        dw.setArrow(`ld${i}`, NIL[0], NIL[1]);
        dw.setText(`lld${i}`, '');
      }
    }
    if (d.udl.length) {
      const u = d.udl[0];
      const x0 = FX0 + u.x0 * MU, x1 = FX0 + u.x1 * MU;
      dw.setSeg('qbar', [x0, yb], [x1, yb]);
      dw.setArrows('qarr', Array.from({ length: 7 }, (_, i) =>
        [[x0 + ((x1 - x0) * i) / 6, yb], [x0 + ((x1 - x0) * i) / 6, yt]]));
      dw.setLabel('lq', [x0 + 0.5, yb + 0.8]);
    }

    // ---- the total resultant, hanging onto the cable it has to be carried by
    const xR = d.lumps.reduce((a, q) => a + q.P * q.x, 0) / d.tot;
    const yR = d.yr(xR);
    dw.setDashArrow('Rtot', fy(xR, -0.22), fy(xR, yR + 0.30));
    dw.setLabel('lRtot', V.add(fy(xR, (yR - 0.22) / 2), [2.6, 0]));
    dw.setText('lRtot', `R_tot = ${d.tot.toFixed(1)}`);

    // ---- the load line and the pole
    const pt = d.ldiv.map((c) => [LX, LY0 - c * d.sfd]);
    for (let i = 0; i < 3; i++) {
      if (i < d.nL) {
        dw.setArrow(`ff${i}`, pt[i], pt[i + 1]);
        dw.setLabel(`lff${i}`, [LX - 3.4, (pt[i][1] + pt[i + 1][1]) / 2]);
        dw.setText(`lff${i}`, `${d.lumps[i].nm} = ${d.lumps[i].P.toFixed(1)}`);
      } else {
        dw.setArrow(`ff${i}`, [LX, LY0], [LX, LY0]);
        dw.setText(`lff${i}`, '');
      }
    }
    const bot = pt[d.nL];
    dw.setSeg('brk', [LX - 6.2, LY0], [LX - 6.2, bot[1]]);
    dw.setLabel('lbrk', [LX - 8.6, (LY0 + bot[1]) / 2]);
    dw.setText('lbrk', `R_tot = ${d.tot.toFixed(1)}`);

    // the pole's HEIGHT is set by the cable's vertical reactions, not the
    // simple beam's: with an inclined chord the two differ by H·d/l, and
    // getting it wrong tilts every ray by that amount (parallel.py catches it)
    const po = [LX + d.H * d.sfd, LY0 - d.Avc * d.sfd];
    dw.setDisk('pole', po);
    dw.setLabel('lpole', V.add(po, [1.2, 0.9]));
    dw.setSeg('dimH', [LX, LY0 + 0.8], [po[0], LY0 + 0.8]);
    dw.setLabel('lH', [(LX + po[0]) / 2, LY0 + 1.9]);
    dw.setText('lH', `H = ${d.H.toFixed(3)} kN`);

    // the segment the given point already decides, drawn early
    dw.setSeg('lastSeg', GP, B);

    // ---- rays and the polygon
    const slot = (k) => (k === d.nL ? 3 : k);
    const used = new Set();
    for (let k = 0; k <= d.nL; k++) {
      const j = slot(k); used.add(j);
      dw.setSeg(`ray${j}`, po, pt[k]);
      dw.setSeg(`pseg${j}`, fy(...d.vs[k]), fy(...d.vs[k + 1]));
    }
    for (let j = 0; j < 4; j++) {
      if (used.has(j)) continue;
      dw.setSeg(`ray${j}`, po, po);
      dw.setSeg(`pseg${j}`, NIL[0], NIL[1]);
    }
    for (let i = 0; i < 3; i++) {
      dw.setDisk(`pv${i}`, i < d.nL ? fy(...d.vs[i + 1]) : fy(0, 0));
    }

    // ---- the funicular and the parabola construction
    dw.setStrokes('fun', Array.from({ length: NFUN }, (_, i) =>
      [fy(...d.curve[i]), fy(...d.curve[i + 1])]));
    if (d.par) {
      const T1 = fy(...d.par.T1), T2 = fy(...d.par.T2);
      const Mc = fy(...d.par.Mc), Pm = fy(...d.par.Pm), Vt = fy(...d.par.Vt);
      dw.setSeg('chord', T1, T2);
      // the ray to the MID of that resultant's slice is parallel to the chord:
      // a parabola's chord slope is the mean of its two end tangents
      const mid = [LX, (pt[d.par.j][1] + pt[d.par.j + 1][1]) / 2];
      dw.setSeg('chray', po, mid);
      dw.setSeg('dimf0', Mc, Pm);
      dw.setSeg('dimf1', Pm, Vt);
      dw.setLabel('lf0', V.add(V.mid(Mc, Pm), [-1.0, 0]));
      dw.setLabel('lf1', V.add(V.mid(Pm, Vt), [1.0, 0]));
      dw.setStrokes('ftick', [Mc, Pm, Vt].map((q) => [[q[0] - 0.55, q[1]], [q[0] + 0.55, q[1]]]));
      dw.setLabel('lfval', V.add(Vt, [0, -1.2]));
      dw.setText('lfval', `f = ${d.par.f.toFixed(5)}`);
    }

    // ---- the reactions, outwards along the end segments
    const uA = V.unit(V.sub(fy(...d.vs[0]), fy(...d.vs[1])));
    const uB = V.unit(V.sub(fy(...d.vs[d.nL + 1]), fy(...d.vs[d.nL])));
    dw.setArrow('reA', V.add(A, V.mul(uA, 0.5)), V.add(A, V.mul(uA, 0.5 + RLEN)));
    dw.setArrow('reB', V.add(B, V.mul(uB, 0.5)), V.add(B, V.mul(uB, 0.5 + RLEN)));
    // beside the arrow, not beyond it: a steep reaction would otherwise put
    // its label up behind the caption card
    const side = (u, wantRight) => {
      let q = V.perp(u);
      if ((q[0] > 0) !== wantRight) q = V.mul(q, -1);
      return V.mul(q, 1.8);
    };
    dw.setLabel('lreA', V.add(V.add(A, V.mul(uA, 0.5 + RLEN * 0.55)), side(uA, false)));
    dw.setLabel('lreB', V.add(V.add(B, V.mul(uB, 0.5 + RLEN * 0.55)), side(uB, true)));
    dw.setText('lreA', `A = ${d.TA.toFixed(2)}`);
    dw.setText('lreB', `B = ${d.TB.toFixed(2)}`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const w = panel.section('The case');
  panel.slider(w, s, 'cas', 'scenario', 0, 3, 1, refresh,
    (v) => `${TAG[Math.round(v)]} ${NAME[Math.round(v)]}`);
  panel.toggle(w, s, 'lbl', 'show labels on the load line', refresh);

  const g = panel.section('What the sheet does / does not give');
  panel.slider(g, s, 'pd', 'given point: depth below A, ×l', 0.42, 0.51, 0.005, refresh,
    (v) => `${v.toFixed(4)}·l${Math.abs(v - PDREF) < 2e-4 ? '  ← the point the sheet marks' : ''}`);
  panel.slider(g, s, 'rho', 'F / R_q  (only bites in c) and d))', 0.4, 2.0, 0.05, refresh,
    (v) => `${v.toFixed(2)}${Math.abs(v - RHOREF) < 1e-6 ? '  ← what the printed force diagram gives' : ''}`);
  panel.slider(g, s, 'U', 'unit load F, or R_q = q·l/3 (kN)', 40, 80, 2, refresh,
    (v) => `${v.toFixed(0)} kN — a working value; the sheet gives none`);

  refresh();
  return player;
}
