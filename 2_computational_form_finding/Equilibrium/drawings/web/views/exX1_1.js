/**
 * EX X · Task 1 — Cable with multiple loads
 * Structural Design I, HS 22 (sheet EX X "Additional Exercises", page 1).
 *
 * "a) Draw the corresponding subsystems and the force diagram for the given
 *     situation. Indicate the magnitude of the reaction forces and the maximum
 *     load in the table. Colour tensile forces red, compressive forces blue and
 *     external forces green.
 *  b) The cable can take a maximum load of N_d max = 70kN. With the help of the
 *     force diagram, find the resulting form of the cable and draw it in the
 *     existing form diagram."
 *
 * GEOMETRY, digitised from page 1 of the task PDF at the printed 1:50 with
 *   web/tools/sheetvec.py ... 1 --scale 50 --min 0.2 --cluster
 * Origin = sheetvec's own shifted page origin; only differences matter.
 *
 *   IV  ( 4.555, 14.922)  pin support, left
 *   II  ( 7.265, 12.212)  node under F_2d
 *   I   ( 9.347, 12.823)  node under F_1d
 *   III (11.446, 14.922)  pin support, right
 *
 * Member 1 = IV-II at 135.00 deg, member 2 = II-I at 16.35 deg, member 3 =
 * I-III at 45.00 deg. Span 6.891 m, both supports level. The lengths are not
 * round; the two 45 degree ends are, and that is the sheet's design.
 *
 * THE TRICK OF THE TASK IS THAT BOTH LOADS ARE INCLINED. Their arrows are in
 * the vector dump too: F_2d at 252.18 deg, F_1d at -51.25 deg. So
 *   F_2d = 90 x (-0.30603, -0.95202) = (-27.542, -85.682) kN
 *   F_1d = 44 x (+0.62592, -0.77989) = (+27.541, -34.315) kN
 * The horizontal components cancel to 0.002 kN, so R = 120.00 kN VERTICAL, and
 * the two lines of action cross at x = 8.00065 while the midspan of IV-III is
 * x = 8.00050. R therefore runs through midspan, which is why A = B.
 *
 * a)  Both end members are at 45 deg and a cable can only pull along itself, so
 *     A = B = 120 / (2 cos45) = 84.853 kN, and members 1 and 3 carry the same.
 *     Node II then closes with an unbalanced vector (87.543, 25.682), giving
 *     member 2 = 91.232 kN at 16.35 deg -- exactly the direction the sheet drew
 *     it in, which is the proof that the printed form is the funicular of these
 *     loads. Joint I hands member 3 back as 84.856 kN, 0.004 % off.
 *     All three members are in TENSION.  N_d max = 91.2 kN.
 *
 * *** DISAGREEMENT WITH THE OFFICIAL KEY ***
 *     The printed solution table says A = 85, B = 85, N_d max = 92.2 kN.
 *     A and B agree. N_d max does NOT: the correct value is 91.2 kN and 92.2 is
 *     a typo. It is reproducible three ways from the sheet's own geometry
 *     (joint II x-equation 91.234, y-equation 91.203, vector length 91.232),
 *     and 92.2 would need member 2 to be drawn at 16.06 deg instead of 16.35.
 *     Both the English and the German solution sheets print 92.2, so it was
 *     typed once into a shared table. This view carries 91.2 and says so.
 *
 * b)  Keep the supports, the load magnitudes and the two lines of action; let
 *     the cable sag deeper. Parametrise by h, the depth below the support chord
 *     (y = 14.922) of the point Q where the two reaction lines meet on R's line
 *     of action (x = 8.00065). Then A = B = 60 sqrt(1 + (3.4456/h)^2), the two
 *     nodes are (reaction line) x (load line), and member 2 = |R_A + F_2d|.
 *
 *       h = 3.4456 m (as printed)   84.85 /  91.23 / 84.85 kN
 *       h = 5.2195 m (crossover)    71.89 /  71.89 / 71.89 kN
 *       h = 5.7339 m (the answer)   70.00 /  68.59 / 70.00 kN
 *
 *     so the answer to b) is h = 5.734 m, node II' = (6.888, 11.040), node
 *     I' = (9.826, 12.226), A = B = 70.00 kN. AND THE MAXIMUM HAS MOVED: at the
 *     printed depth the middle member is the largest, at the answer depth the
 *     two END members are. They swap at h = 5.2195 m. That migration is the
 *     teaching point of 1b and this view is built around it.
 *
 *     The same fact, read in the force diagram: both poles sit on the same
 *     HORIZONTAL line 60 kN below the top of the load line. That horizontal is
 *     the closing line of a structure whose supports are level, and 60 kN is
 *     the simple-beam reaction R/2. Task 3 of this sheet is the same theorem.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

// ---------------------------------------------------------------- givens ---

const IV = [4.555, 14.922];
const NII = [7.265, 12.212];
const NI = [9.347, 12.823];
const III = [11.446, 14.922];

const A2 = (252.18 * Math.PI) / 180;          // direction of F_2d
const A1 = (-51.25 * Math.PI) / 180;          // direction of F_1d
const D2 = [Math.cos(A2), Math.sin(A2)];
const D1 = [Math.cos(A1), Math.sin(A1)];
const F2K = 90, F1K = 44;                     // kN, as printed

const YCH = IV[1];                            // the support chord
const H0 = 3.4456;                            // depth of the printed form
const KEY_NMAX = 92.2;                        // what the solution sheet prints
const HMIN = 2.0, HMAX = 6.8;                 // the sag depths the drawing has room for

// ------------------------------------------------------------ the layout ---

const MPU = 1.75;                             // drawing units per metre
const FX = -14.0, FY = 0.4;                   // IV/III chord midpoint anchor
const SFD = 5.0;                              // kN per drawing unit, force diagram
const LL = [10.0, 13.0];                      // top of the load line
const SFN = 46.0;                             // kN per unit in the node subsystems
const CELL = [[4.5, -18.5], [11.5, -18.5], [18.5, -18.5], [25.5, -18.5]];

const DEFAULTS = {
  solve: true,                                // put the cable at the depth the capacity asks for
  Ncap: 70,                                   // kN, the sheet's b)
  h: 5.73,                                    // m, free sag depth when solve is off
  lam: 1.0,                                   // scale both loads together
  orig: true,                                 // keep the printed form on screen
  lbl: true,
  _k: 99,
};

// ------------------------------------------------------------------ maths --

const fx = (p) => [FX + (p[0] - 8.0005) * MPU, FY + (p[1] - YCH) * MPU];

/** a u + b v = w, returning [a, b]. */
function comb(u, v, w) {
  const det = u[0] * v[1] - u[1] * v[0];
  return [(w[0] * v[1] - w[1] * v[0]) / det, (u[0] * w[1] - u[1] * w[0]) / det];
}

/** The printed form: joint II gives members 1 and 2, joint I closes member 3. */
function printedForm(F2, F1) {
  const [n1, n2] = comb(V.unit(V.sub(IV, NII)), V.unit(V.sub(NI, NII)),
                        V.mul(F2, -1));
  const [n2b, n3] = comb(V.unit(V.sub(NII, NI)), V.unit(V.sub(III, NI)),
                         V.mul(F1, -1));
  return { N: [n1, n2, n3], nodes: [IV, NII, NI, III], resid: Math.abs(n2b - n2) };
}

/**
 * The one-parameter family of 1b. h is the depth below the support chord of the
 * point Q where the two reaction lines meet on the resultant's line of action.
 */
function deepForm(h, F2, F1) {
  const R = V.add(F2, F1);
  const Xp = V.intersect(NII, D2, NI, D1);              // R's line of action
  const Q = V.intersect(Xp, V.unit(R), [0, YCH - h], [1, 0]);
  const uA = V.unit(V.sub(IV, Q));                      // reaction A, at IV
  const uB = V.unit(V.sub(III, Q));                     // reaction B, at III
  const [a, b] = comb(uA, uB, V.mul(R, -1));
  const n2 = V.intersect(IV, V.sub(Q, IV), NII, D2);    // node under F_2d
  const n1 = V.intersect(III, V.sub(Q, III), NI, D1);   // node under F_1d
  const [m1, m2] = comb(V.unit(V.sub(IV, n2)), V.unit(V.sub(n1, n2)),
                        V.mul(F2, -1));
  const [m2b, m3] = comb(V.unit(V.sub(n2, n1)), V.unit(V.sub(III, n1)),
                         V.mul(F1, -1));
  return { N: [m1, m2, m3], nodes: [IV, n2, n1, III], Q,
           resid: Math.abs(m2b - m2) + Math.abs(a - m1) + Math.abs(b - m3) };
}

const maxOf = (f) => Math.max(...f.N.map(Math.abs));

/** The depth at which the largest member force is exactly Ncap. Monotone in h. */
function depthFor(Ncap, F2, F1) {
  let lo = 0.6, hi = 60.0;
  if (maxOf(deepForm(hi, F2, F1)) > Ncap) return hi;
  if (maxOf(deepForm(lo, F2, F1)) < Ncap) return lo;
  for (let i = 0; i < 70; i++) {
    const m = (lo + hi) / 2;
    if (maxOf(deepForm(m, F2, F1)) > Ncap) lo = m; else hi = m;
  }
  return (lo + hi) / 2;
}

/** Where members 1 and 2 change places as the largest. */
function crossover(F2, F1) {
  let lo = 0.6, hi = 60.0;
  const gap = (h) => { const f = deepForm(h, F2, F1);
                       return Math.abs(f.N[1]) - Math.abs(f.N[0]); };
  if (gap(lo) * gap(hi) > 0) return null;
  for (let i = 0; i < 70; i++) {
    const m = (lo + hi) / 2;
    if (gap(m) > 0) lo = m; else hi = m;
  }
  return (lo + hi) / 2;
}

function compute(s) {
  const F2 = V.mul(D2, F2K * s.lam);
  const F1 = V.mul(D1, F1K * s.lam);
  const R = V.add(F2, F1);
  const Rmag = V.len(R);
  const Xp = V.intersect(NII, D2, NI, D1);

  const pr = printedForm(F2, F1);
  const hFor = depthFor(s.Ncap, F2, F1);
  const want = s.solve ? hFor : s.h;
  const h = Math.min(HMAX, Math.max(HMIN, want));
  const clipped = Math.abs(h - want) > 1e-6;
  const dp = deepForm(h, F2, F1);
  const hx = crossover(F2, F1);
  const Nfloor = Rmag / 2;                    // A = B can never go below R/2

  return {
    F2, F1, R, Rmag, Xp, lam: s.lam,
    pr, dp, h, hFor, hx, Ncap: s.Ncap, Nfloor, clipped, sheet: Math.abs(s.lam - 1) < 1e-9,
    prMax: maxOf(pr), dpMax: maxOf(dp),
    prWhich: Math.abs(pr.N[1]) >= Math.abs(pr.N[0]) ? 'the middle member 2' : 'the two end members 1 and 3',
    dpWhich: Math.abs(dp.N[1]) >= Math.abs(dp.N[0]) ? 'the middle member 2' : 'the two end members 1 and 3',
    span: III[0] - IV[0],
    solve: !!s.solve, orig: !!s.orig,
  };
}

// ------------------------------------------------------------------- view --

export const meta = {
  title: 'EX X.1 — a cable under two inclined loads, and how deep it has to hang',
  subtitle: 'Structural Design I · sheet EX X “Additional Exercises”, task 1 a) and b)',
  about: 'Two point loads, neither of them vertical, hanging on a three-segment cable between two level pins. The inclination is the trick: the two horizontal components cancel exactly, so the resultant is a plain 120 kN straight down, and it happens to fall on midspan — which is why the two reactions come out equal at 85 kN. Part b) then turns the exercise round. The cable is only good for 70 kN, so the form is no longer given; it is what you are looking for. Deepen the sag and every force drops, but not at the same rate: at the printed depth the middle segment is the biggest, at the depth b) asks for the two end segments are. They change places at h = 5.22 m, and watching that happen is the point of the page. Note that the sheet prints 92.2 kN where the correct maximum is 91.2 kN.',
  result: (d) => [
    `a) A = ${Math.abs(d.pr.N[0]).toFixed(2)} and B = ${Math.abs(d.pr.N[2]).toFixed(2)} kN${d.sheet ? ' → 85 and 85 kN, which is what the key prints ✓' : ''}; all three members in TENSION: ${d.pr.N.map((n) => Math.abs(n).toFixed(2)).join(' · ')} kN`,
    `a) N_d,max = ${d.prMax.toFixed(2)} kN in ${d.prWhich}${d.sheet ? ` → 91.2 kN. THE KEY PRINTS ${KEY_NMAX} kN, which is a typo for 91.2` : ''}`,
    d.Ncap <= d.Nfloor
      ? `b) no form can hold ${d.Ncap.toFixed(0)} kN: however deep it hangs, A = B → R/2 = ${d.Nfloor.toFixed(2)} kN and no lower`
      : `b) capacity ${d.Ncap.toFixed(0)} kN needs a sag of h = ${d.hFor.toFixed(3)} m${d.clipped ? ' (off the drawing — the sag shown is clamped)' : ''}; drawn at h = ${d.h.toFixed(3)} m the members carry ${d.dp.N.map((n) => Math.abs(n).toFixed(2)).join(' / ')} kN`,
    `b) the maximum is now ${d.dpMax.toFixed(2)} kN in ${d.dpWhich} — it changes hands at h = ${d.hx ? d.hx.toFixed(4) : '—'} m, where all three carry the same force`],
  frame: [[-27, -22], [32, 17]],
};

const S_DEEP = 5;                             // the step that introduces the b) form

const STEPS = [
  { t: 'The exercise', d: 'a three-segment cable between two pins, carrying two point loads that are not vertical. Find the reactions and the biggest force — then find the form that keeps that force under 70 kN' },
  { t: 'What is given', d: 'left: the form diagram, digitised from the sheet at its printed 1:50. Both supports are pins and they are at the same height; the span is 6.891 m. The two end segments are drawn at exactly ±45°, and the middle one at 16.35°',
    detail: (d) => [`IV (${IV[0].toFixed(3)}, ${IV[1].toFixed(3)}) · II (${NII[0].toFixed(3)}, ${NII[1].toFixed(3)}) · I (${NI[0].toFixed(3)}, ${NI[1].toFixed(3)}) · III (${III[0].toFixed(3)}, ${III[1].toFixed(3)})`,
                    `span ${d.span.toFixed(3)} m, both supports at y = ${YCH.toFixed(3)} — level`,
                    'member lengths 3.832 / 2.170 / 2.968 m: not round. Only the angles are drawn to mean anything'],
    take: 'the sheet prints no dimension at all — every number here comes out of the vector artwork' },
  { t: 'The loads are inclined', d: 'and that is the whole trick. F₂d leans left at 252.18°, F₁d leans right at −51.25°, and their horizontal components cancel to two hundredths of a kilonewton. So the resultant is a plain vertical 120 kN — and the two lines of action cross exactly on midspan',
    detail: (d) => [`F₂d = ${(F2K * d.lam).toFixed(1)} × (${D2[0].toFixed(5)}, ${D2[1].toFixed(5)}) = (${d.F2[0].toFixed(3)}, ${d.F2[1].toFixed(3)}) kN`,
                    `F₁d = ${(F1K * d.lam).toFixed(1)} × (${D1[0].toFixed(5)}, ${D1[1].toFixed(5)}) = (${d.F1[0].toFixed(3)}, ${d.F1[1].toFixed(3)}) kN`,
                    `R = (${d.R[0].toFixed(3)}, ${d.R[1].toFixed(3)}) = ${d.Rmag.toFixed(2)} kN, and its line of action is x = ${d.Xp[0].toFixed(4)} against a midspan of ${((IV[0] + III[0]) / 2).toFixed(4)}`],
    take: '90 kN and 44 kN at those two inclinations were chosen so that this would happen. It is why the two reactions come out equal' },
  { t: 'a) The two reactions', d: 'a cable can only pull along itself, so the reaction at each pin runs along the segment that meets it. Both of those are at 45°, so both reactions are at 45°, and by symmetry each takes half of R',
    detail: (d) => [`A = B = ${d.Rmag.toFixed(2)} / (2 cos 45°) = ${Math.abs(d.pr.N[0]).toFixed(3)} kN`,
                    `and members 1 and 3 carry exactly that, because at a pin the member IS the reaction`,
                    `the key's table: A = 85, B = 85 — agreed`],
    take: 'no equations were needed: two 45° lines and one vertical resultant' },
  { t: 'a) Joint II closes the cable', d: 'right: the force diagram. Lay off F₂d then F₁d; the pole o is where the ray parallel to member 1 lands. Everything else follows. The unbalanced vector at joint II is member 2 — and it comes out pointing along 16.35°, which is exactly how the sheet drew that member',
    detail: (d) => [`member 2 = |R_A + F₂d| = ${Math.abs(d.pr.N[1]).toFixed(3)} kN, direction 16.35° = the drawn direction`,
                    `joint I then hands member 3 back as ${Math.abs(d.pr.N[2]).toFixed(3)} kN, residual ${d.pr.resid.toExponential(1)} kN`,
                    d.sheet ? `N_d,max = ${d.prMax.toFixed(3)} kN → 91.2 kN.  THE KEY PRINTS ${KEY_NMAX} — a typo`
                            : `N_d,max = ${d.prMax.toFixed(3)} kN (the loads are no longer the sheet's 90 and 44 kN)`],
    take: '92.2 would need member 2 drawn at 16.06°. It is drawn at 16.35°, and 91.2 is what that gives' },
  { t: 'b) Let it hang deeper', d: 'same supports, same two loads, same two lines of action — only the sag changes. Parametrise it by h, the depth below the support chord at which the two reaction lines meet on R. The two nodes are then just where those reaction lines cut the load lines',
    detail: (d) => [`A = B = ${(d.Rmag / 2).toFixed(1)} · √(1 + (${(d.span / 2).toFixed(4)}/h)²)`,
                    `at h = ${d.h.toFixed(3)} m: A = B = ${Math.abs(d.dp.N[0]).toFixed(2)} kN, member 2 = ${Math.abs(d.dp.N[1]).toFixed(2)} kN`,
                    `nodes II′ (${d.dp.nodes[1][0].toFixed(3)}, ${d.dp.nodes[1][1].toFixed(3)}) and I′ (${d.dp.nodes[2][0].toFixed(3)}, ${d.dp.nodes[2][1].toFixed(3)}), closure residual ${d.dp.resid.toExponential(1)} kN`],
    take: 'the printed form is just h = 3.4456 m — the depth that happens to make the ends 45°' },
  { t: 'b) The 70 kN answer', d: 'drag the capacity in the panel and the cable finds its own depth. At the sheet’s 70 kN the answer is h = 5.734 m — and look at which members are now the big ones. The maximum has walked out of the middle and into the two ends',
    detail: (d) => [`capacity ${d.Ncap.toFixed(0)} kN → h = ${d.hFor.toFixed(4)} m`,
                    `members ${d.dp.N.map((n) => Math.abs(n).toFixed(2)).join(' / ')} kN — largest is ${d.dpMax.toFixed(2)} in ${d.dpWhich}`,
                    `A = B = ${Math.abs(d.dp.N[0]).toFixed(2)} kN`],
    take: 'at the printed depth the maximum was the middle member. Here it is the ends. Something happened in between' },
  { t: 'Where the maximum changes hands', d: `at one particular depth all three segments carry the same force, and that is the crossover. Above it the middle segment sizes the cable, below it the two ends do. It is also the flattest cable for which the ends govern — which is what makes the 70 kN answer the shape it is`,
    detail: (d) => [d.hx ? `crossover at h = ${d.hx.toFixed(4)} m, all three at ${maxOf(deepForm(d.hx, d.F2, d.F1)).toFixed(2)} kN` : 'no crossover for this load',
                    `deeper than that and the ends govern; shallower and the middle does`,
                    `however deep it hangs, A = B can never fall below R/2 = ${d.Nfloor.toFixed(2)} kN — that is the floor`],
    take: 'both poles sit on the same horizontal, 60 kN below the top of the load line. That horizontal is the closing line, and task 3 of this sheet is the same theorem' },
];

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;

  const TENS = PAL.red;

  dw.label('t_form', 'form diagram 1:50', { cls: 'title', flash: false });
  dw.label('t_force', 'Kräfteplan — force diagram', { cls: 'title', flash: false });
  dw.label('t_sub', 'Subsysteme — the four joints of a)', { cls: 'title', flash: false });
  dw.label('t_scale', '', { cls: 'point', flash: false, color: PAL.grey });

  // ---- form diagram: supports, the printed cable, the loads
  for (const n of ['IV', 'III']) {
    dw.disk(`sup${n}`, { intro: 1, r: dw.W.disk });
    dw.label(`lsup${n}`, n, { cls: 'num', intro: 1, when: (st) => st.lbl });
    dw.strokes(`hat${n}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  }
  dw.dashLine('chord', { intro: 1, color: PAL.grey, dash: dw.W.dash });
  for (let i = 0; i < 3; i++) {
    dw.seg(`m${i}`, { intro: 1, w: dw.W.bar,
      color: { pending: PAL.black, final: () => TENS }, when: (st) => st.orig });
    dw.label(`lm${i}`, '', { cls: 'num', intro: 4, color: TENS,
      when: (st) => st.orig && st.lbl });
  }
  for (const n of ['II', 'I']) {
    dw.disk(`nd${n}`, { intro: 1, r: dw.W.disk * 0.8, when: (st) => st.orig });
    dw.label(`lnd${n}`, n, { cls: 'num', intro: 1, when: (st) => st.orig && st.lbl });
  }
  dw.dashLine('la2', { intro: 2, color: PAL.grey, dash: dw.W.dash });
  dw.dashLine('la1', { intro: 2, color: PAL.grey, dash: dw.W.dash });
  dw.arrow('fF2', { intro: 2, color: PAL.green, ...ARR, when: (st) => st.orig });
  dw.arrow('fF1', { intro: 2, color: PAL.green, ...ARR, when: (st) => st.orig });
  dw.label('lfF2', '', { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.orig });
  dw.label('lfF1', '', { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.orig });
  dw.dashArrow('fR', { intro: 2, color: PAL.green, ...NARR, dash: dw.W.dash });
  dw.label('lfR', '', { cls: 'num', intro: 2, color: PAL.green });
  for (const n of ['A', 'B']) {
    dw.arrow(`re${n}`, { intro: 3, color: PAL.green, ...NARR, when: (st) => st.orig });
    dw.label(`lre${n}`, '', { cls: 'num', intro: 3, color: PAL.green, when: (st) => st.orig });
  }

  // ---- form diagram: the b) cable and its construction
  dw.dashLine('qa', { intro: S_DEEP, color: PAL.grey, dash: dw.W.dash });
  dw.dashLine('qb', { intro: S_DEEP, color: PAL.grey, dash: dw.W.dash });
  dw.disk('ptQ', { intro: S_DEEP, r: dw.W.disk * 0.7 });
  dw.label('lQ', 'Q', { cls: 'num', intro: S_DEEP, color: PAL.grey, when: (st) => st.lbl });
  dw.seg('dimH', { intro: S_DEEP, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('ldimH', '', { cls: 'num', intro: S_DEEP, color: PAL.grey, flash: false });
  for (let i = 0; i < 3; i++) {
    dw.seg(`d${i}`, { intro: S_DEEP, w: dw.W.bar,
      color: { pending: PAL.black, final: () => TENS } });
    dw.label(`ld${i}`, '', { cls: 'num', intro: S_DEEP, color: TENS, when: (st) => st.lbl });
  }
  for (const n of ['2', '1']) {
    dw.disk(`dn${n}`, { intro: S_DEEP, r: dw.W.disk * 0.8 });
  }
  dw.label('ldn2', '', { cls: 'num', intro: S_DEEP, when: (st) => st.lbl });
  dw.label('ldn1', '', { cls: 'num', intro: S_DEEP, when: (st) => st.lbl });
  dw.arrow('dF2', { intro: S_DEEP, color: PAL.green, ...ARR });
  dw.arrow('dF1', { intro: S_DEEP, color: PAL.green, ...ARR });
  for (const n of ['A', 'B']) {
    dw.arrow(`dre${n}`, { intro: S_DEEP, color: PAL.green, ...NARR });
    dw.label(`ldre${n}`, '', { cls: 'num', intro: S_DEEP, color: PAL.green });
  }

  // ---- force diagram
  dw.arrow('ff2', { intro: 4, color: PAL.green, ...ARR });
  dw.arrow('ff1', { intro: 4, color: PAL.green, ...ARR });
  dw.label('lff2', '', { cls: 'num', intro: 4, color: PAL.green, when: (st) => st.lbl });
  dw.label('lff1', '', { cls: 'num', intro: 4, color: PAL.green, when: (st) => st.lbl });
  dw.dashArrow('ffR', { intro: 4, color: PAL.green, ...NARR, dash: dw.W.dash });
  dw.label('lffR', '', { cls: 'num', intro: 4, color: PAL.green, when: (st) => st.lbl });
  dw.dashLine('close', { intro: S_DEEP, color: PAL.grey, dash: dw.W.dash });
  dw.disk('ptI', { intro: S_DEEP, r: dw.W.disk * 0.7 });
  dw.label('lptI', 'i', { cls: 'num', intro: S_DEEP, color: PAL.grey });
  dw.label('lclose', '', { cls: 'point', intro: S_DEEP, flash: false, color: PAL.grey });

  dw.disk('ptO', { intro: 4, r: dw.W.disk * 0.8, when: (st) => st.orig });
  dw.label('lO', 'o', { cls: 'num', intro: 4, when: (st) => st.orig && st.lbl });
  for (let i = 0; i < 3; i++) {
    dw.seg(`ray${i}`, { intro: 4, w: dw.W.ray, color: TENS, when: (st) => st.orig });
    dw.link(`m${i}`, `ray${i}`, `lm${i}`);
  }
  dw.disk('ptO2', { intro: S_DEEP, r: dw.W.disk * 0.8 });
  dw.label('lO2', 'o′', { cls: 'num', intro: S_DEEP, when: (st) => st.lbl });
  for (let i = 0; i < 3; i++) {
    dw.seg(`dray${i}`, { intro: S_DEEP, w: dw.W.ray, color: TENS });
    dw.link(`d${i}`, `dray${i}`, `ld${i}`);
  }
  dw.label('lNmax', '', { cls: 'num', intro: 4, color: TENS });

  // ---- the four joint subsystems of a)
  const JN = ['IV', 'II', 'I', 'III'];
  for (let j = 0; j < 4; j++) {
    dw.circle(`jc${j}`, { intro: 4, color: PAL.grey, flash: false });
    dw.label(`jl${j}`, `node ${JN[j]}`, { cls: 'point', intro: 4, flash: false });
    for (let e = 0; e < 3; e++) {
      dw.arrow(`ja${j}_${e}`, { intro: 4, ...NARR, flash: false,
        color: { pending: PAL.black, final: (dd) => dd.jt[j][e].col } });
      dw.label(`jn${j}_${e}`, '', { cls: 'num', intro: 4, flash: false,
        color: { pending: PAL.black, final: (dd) => dd.jt[j][e].col },
        when: (st) => st.lbl });
    }
  }

  dw.instant('t_form', 't_force', 't_sub', 't_scale');
  dw.ghostable('ff2', 'ff1');

  let d = null;

  function refresh() {
    s._k = player.k;
    d = compute(s);

    // ---- the four joint subsystems, built here because the drawing needs them
    const P = d.pr.nodes;
    const arrAt = (k, others, ext) => {
      const out = others.map((o) => ({
        v: V.mul(V.unit(V.sub(P[o], P[k])), Math.abs(d.pr.N[Math.min(k, o)])),
        col: TENS, name: `${Math.min(k, o) + 1}`,
      }));
      if (ext) out.push(ext);
      while (out.length < 3) out.push({ v: [0, 0], col: PAL.grey, name: '' });
      return out;
    };
    const uA = V.unit(V.sub(P[0], P[1]));   // reaction A: away from the cable
    const uB = V.unit(V.sub(P[3], P[2]));
    d.jt = [
      arrAt(0, [1], { v: V.mul(uA, Math.abs(d.pr.N[0])), col: PAL.green, name: 'A' }),
      arrAt(1, [0, 2], { v: d.F2, col: PAL.green, name: 'F₂d' }),
      arrAt(2, [1, 3], { v: d.F1, col: PAL.green, name: 'F₁d' }),
      arrAt(3, [2], { v: V.mul(uB, Math.abs(d.pr.N[2])), col: PAL.green, name: 'B' }),
    ];

    dw.setLabel('t_form', [0.0, 7.2]);
    dw.setLabel('t_force', [LL[0] + 1.5, LL[1] + 3.0]);
    dw.setLabel('t_scale', [LL[0] + 1.5, LL[1] + 1.6]);
    dw.setText('t_scale', `1 unit ≙ ${SFD} kN  (sheet: 1 cm ≙ 10 kN) · joints 1 unit ≙ ${SFN} kN`);
    dw.setLabel('t_sub', [CELL[1][0] + 2.0, CELL[0][1] + 3.6]);

    // ================================================== form diagram ==========
    const p = d.pr.nodes.map(fx);
    dw.setDisk('supIV', p[0]); dw.setDisk('supIII', p[3]);
    dw.setLabel('lsupIV', V.add(p[0], [-1.5, -1.0]));
    dw.setLabel('lsupIII', V.add(p[3], [1.6, -1.0]));
    dw.setStrokes('hatIV', V.hatch([p[0][0] - 1.5, p[0][1] + 0.55],
                                   [p[0][0] + 1.5, p[0][1] + 0.55], 1, 0.85, 5));
    dw.setStrokes('hatIII', V.hatch([p[3][0] - 1.5, p[3][1] + 0.55],
                                    [p[3][0] + 1.5, p[3][1] + 0.55], 1, 0.85, 5));
    dw.setDashLine('chord', [V.add(p[0], [-2.2, 0]), V.add(p[3], [2.2, 0])]);
    for (let i = 0; i < 3; i++) {
      dw.setSeg(`m${i}`, p[i], p[i + 1]);
      const nb = V.mul(V.unit(V.perp(V.sub(p[i + 1], p[i]))), 1.5);
      dw.setLabel(`lm${i}`, V.add(V.mid(p[i], p[i + 1]), nb));
      dw.setText(`lm${i}`, `${i + 1}: ${Math.abs(d.pr.N[i]).toFixed(1)}`);
    }
    dw.setDisk('ndII', p[1]); dw.setDisk('ndI', p[2]);
    dw.setLabel('lndII', V.add(p[1], [-1.3, 0.9]));
    dw.setLabel('lndI', V.add(p[2], [-0.4, 1.2]));

    // the two lines of action, drawn only as far as the deepest node needs
    const reach = (anchor, dir, node) =>
      [V.add(fx(anchor), V.mul(dir, -2.4)),
       fx(V.add(anchor, V.mul(dir, Math.max(V.dot(V.sub(node, anchor), dir), 0) + 1.9)))];
    dw.setDashLine('la2', reach(NII, D2, d.dp.nodes[1]));
    dw.setDashLine('la1', reach(NI, D1, d.dp.nodes[2]));
    let tp = V.add(fx(NII), V.mul(D2, 4.4));
    dw.setArrow('fF2', V.add(fx(NII), V.mul(D2, 0.9)), tp);
    dw.setLabel('lfF2', V.add(tp, [-2.2, -1.1]));
    dw.setText('lfF2', `F₂d = ${(F2K * d.lam).toFixed(0)} kN`);
    tp = V.add(fx(NI), V.mul(D1, 4.4));
    dw.setArrow('fF1', V.add(fx(NI), V.mul(D1, 0.9)), tp);
    dw.setLabel('lfF1', V.add(tp, [2.8, -0.6]));
    dw.setText('lfF1', `F₁d = ${(F1K * d.lam).toFixed(0)} kN`);
    // the resultant, on its own line of action through midspan
    const rx = FX + (d.Xp[0] - 8.0005) * MPU;
    dw.setDashArrow('fR', [rx, FY + 4.4], [rx, FY + 0.9]);
    dw.setLabel('lfR', [rx + 2.9, FY + 3.7]);
    dw.setText('lfR', `R = ${d.Rmag.toFixed(1)} kN`);
    // reactions at the two pins, pointing away from the cable
    for (const [n, at, u, mag] of [['A', p[0], uA, Math.abs(d.pr.N[0])],
                                   ['B', p[3], uB, Math.abs(d.pr.N[2])]]) {
      dw.setArrow(`re${n}`, at, V.add(at, V.mul(u, 2.7)));
      dw.setLabel(`lre${n}`, V.add(at, V.mul(u, 4.0)));
      dw.setText(`lre${n}`, `${n} = ${mag.toFixed(1)}`);
    }

    // ---- the b) cable
    const q = d.dp.nodes.map(fx), Qp = fx(d.dp.Q);
    dw.setDashLine('qa', [p[0], Qp]);
    dw.setDashLine('qb', [p[3], Qp]);
    dw.setDisk('ptQ', Qp);
    dw.setLabel('lQ', V.add(Qp, [-1.7, 0.9]));
    dw.setSeg('dimH', [rx, FY], Qp);
    dw.setLabel('ldimH', V.add(Qp, [2.9, 0.9]));
    dw.setText('ldimH', `h = ${d.h.toFixed(3)} m`);
    for (let i = 0; i < 3; i++) {
      dw.setSeg(`d${i}`, q[i], q[i + 1]);
      const nb = V.mul(V.unit(V.perp(V.sub(q[i + 1], q[i]))), -1.6);
      dw.setLabel(`ld${i}`, V.add(V.mid(q[i], q[i + 1]), nb));
      dw.setText(`ld${i}`, `${i + 1}′: ${Math.abs(d.dp.N[i]).toFixed(1)}`);
    }
    dw.setDisk('dn2', q[1]); dw.setDisk('dn1', q[2]);
    dw.setLabel('ldn2', V.add(q[1], [-1.5, -0.9]));
    dw.setText('ldn2', 'II′');
    dw.setLabel('ldn1', V.add(q[2], [1.5, -0.9]));
    dw.setText('ldn1', 'I′');
    dw.setArrow('dF2', V.add(q[1], V.mul(D2, 0.9)), V.add(q[1], V.mul(D2, 3.8)));
    dw.setArrow('dF1', V.add(q[2], V.mul(D1, 0.9)), V.add(q[2], V.mul(D1, 3.8)));
    const duA = V.unit(V.sub(q[0], q[1])), duB = V.unit(V.sub(q[3], q[2]));
    for (const [n, at, u, mag, off] of [['A', p[0], duA, Math.abs(d.dp.N[0]), 2.4],
                                        ['B', p[3], duB, Math.abs(d.dp.N[2]), -2.4]]) {
      dw.setArrow(`dre${n}`, at, V.add(at, V.mul(u, 4.4)));
      dw.setLabel(`ldre${n}`, V.add(V.add(at, V.mul(u, 4.6)), [off, 0.5]));
      dw.setText(`ldre${n}`, `${n}′ = ${mag.toFixed(1)}`);
    }

    // ================================================= force diagram ==========
    const P0 = LL;
    const P1 = V.add(P0, V.mul(d.F2, 1 / SFD));
    const P2 = V.add(P1, V.mul(d.F1, 1 / SFD));
    dw.setArrow('ff2', P0, P1);
    dw.setArrow('ff1', P1, P2);
    dw.setLabel('lff2', V.add(V.mid(P0, P1), [-3.2, 0]));
    dw.setText('lff2', `F₂d ${(F2K * d.lam).toFixed(0)}`);
    dw.setLabel('lff1', V.add(V.mid(P1, P2), [-2.8, -0.4]));
    dw.setText('lff1', `F₁d ${(F1K * d.lam).toFixed(0)}`);
    dw.setDashArrow('ffR', P0, P2);
    dw.setLabel('lffR', V.add(V.mid(P0, P2), [1.6, 1.1]));
    dw.setText('lffR', `R ${d.Rmag.toFixed(0)}`);

    // the point i, and the closing line every pole has to sit on
    const iP = V.add(P0, V.mul(V.unit(V.sub(P2, P0)), (d.Rmag / 2) / SFD));
    dw.setDisk('ptI', iP);
    dw.setLabel('lptI', V.add(iP, [-1.2, -0.9]));
    dw.setDashLine('close', [V.add(iP, [-3.5, 0]), V.add(iP, [17.5, 0])]);
    dw.setLabel('lclose', V.add(iP, [13.0, 2.4]));
    dw.setText('lclose', 'the closing line: every pole lands on it');

    const poleOf = (form) => V.add(P0, V.mul(V.unit(V.sub(form.nodes[1], form.nodes[0])),
                                             Math.abs(form.N[0]) / SFD));
    const o = poleOf(d.pr), o2 = poleOf(d.dp);
    dw.setDisk('ptO', o);
    dw.setLabel('lO', V.add(o, [1.3, -0.9]));
    dw.setDisk('ptO2', o2);
    dw.setLabel('lO2', V.add(o2, [-0.5, 1.4]));
    const ends = [P0, P1, P2];
    for (let i = 0; i < 3; i++) {
      dw.setSeg(`ray${i}`, o, ends[i]);
      dw.setSeg(`dray${i}`, o2, ends[i]);
    }
    const big = d.pr.N.indexOf(d.pr.N.reduce((a, b) => (Math.abs(b) > Math.abs(a) ? b : a)));
    dw.setLabel('lNmax', V.add(V.mid(o, ends[big]), [0.4, -1.5]));
    dw.setText('lNmax', d.sheet ? `N_d,max = ${d.prMax.toFixed(1)} (key: ${KEY_NMAX})`
                                : `N_d,max = ${d.prMax.toFixed(1)}`);

    // ================================================== subsystems ===========
    d.jt.forEach((cellArr, j) => {
      const c = CELL[j];
      dw.setCircle(`jc${j}`, c, 1.2);
      dw.setLabel(`jl${j}`, [c[0], c[1] - 3.9]);
      cellArr.forEach((a, e) => {
        const L = V.len(a.v) / SFN;
        const u = L > 1e-9 ? V.unit(a.v) : [1, 0];
        dw.setArrow(`ja${j}_${e}`, c, V.add(c, V.mul(u, Math.max(L, 1e-4))));
        dw.setLabel(`jn${j}_${e}`, V.add(c, V.mul(u, L + 1.0)));
        dw.setText(`jn${j}_${e}`, a.name);
      });
    });

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const b = panel.section('b) the resulting form');
  panel.toggle(b, s, 'solve', 'let the capacity choose the depth', refresh);
  panel.slider(b, s, 'Ncap', 'N_d,max the cable can take (kN)', 68, 92, 0.5, refresh,
    (v) => `${v} kN`);
  panel.slider(b, s, 'h', 'or set the sag h yourself (m)', HMIN, HMAX, 0.02, refresh,
    (v) => `${(+v).toFixed(2)} m`);
  const g = panel.section('Given');
  panel.slider(g, s, 'lam', 'scale both loads', 0.4, 2.0, 0.05, refresh,
    (v) => `${(F2K * v).toFixed(1)} and ${(F1K * v).toFixed(1)} kN`);
  const w = panel.section('What to show');
  panel.toggle(w, s, 'orig', 'show the printed form of a)', refresh);
  panel.toggle(w, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}
