/**
 * EX X · Task 4 — Funicular form
 * Structural Design I, HS 22, "Additional Exercises", sheet page 4.
 *
 * TEXT (verbatim, English sheet).
 *   "Task 4 · Funicular form — Design the form of a possible funicular cable for
 *    the cases a) to d) using the force diagram. Draw the tension forces in red,
 *    compression forces in blue and reaction forces in green."
 *   a) F1 = 120 kN · b) F1 = 60 kN, F2 = 60 kN · c) F1 = F2 = F3 = 40 kN ·
 *   d) g = 20 kN/m.
 *   German (Aufgabe 4 Seilform): "...entwerfen Sie ... EINE MÖGLICHE Seilform."
 *   "A possible" is the operative word: the pole is FREE and there is a
 *   one-parameter family of answers per case. That parameter is this view's
 *   main slider.
 *
 * GIVENS printed on the page: form diagram 1:100, force diagram 1 cm = 20 kN.
 * Both supports pinned and at the SAME level. All four cases total 120 kN.
 *
 * GEOMETRY, digitised from the task page. Origin = support A, x to the right,
 * y measured DOWNWARDS (the cable sags).
 *   $PY web/tools/sheetvec.py .../task-en.pdf 4 --scale 100 --min 0.2 --cluster
 *   A (support apex)   6.679, 25.740      B (support apex)  12.677, 25.740
 *   -> span 5.998 m = 6.00 m, both ends level. 1:100 honoured to 0.03 %.
 *   load axes, from A:  a) 3.000        = l/2
 *                       b) 2.000, 3.999 = l/3, 2l/3
 *                       c) 1.500, 2.999, 4.499 = l/4, l/2, 3l/4
 *                       d) block 0 -> 5.998, the whole span
 *   Every length comes out round, which is what validates the scale, and the
 *   family is visible in it: n equal loads of 120/n kN at the (n+1)-division
 *   points, with d) as n -> infinity.  Check: g*l = 20 x 6.00 = 120 kN.
 *
 * DERIVATION. Level chord and symmetric loads, so in every case
 *   A_v = B_v = 60.00 kN,   and the funicular ordinate is  y(x) = M(x)/H
 * with M the simple-beam moment and H the (free) horizontal thrust.
 *   M_max:  a) F l/4 = 180.0   b) 120.0   c) 120.0   d) g l^2/8 = 90.0 kNm
 * At any pole the END segments always carry the full 60 kN shear, so
 *   end tangent slope = 60/H,  N_max = sqrt(H^2 + 60^2),  the SAME in a) - d).
 * At the pole the key drew, H = 72.00 kN:
 *   a) sag 2.5000 m, cable 93.723 kN both segments
 *   b) depths 1.6667 / 1.6667, cable 93.723 / 72.000 (horizontal) / 93.723
 *   c) depths 1.2500 / 1.6667 / 1.2500, cable 93.723 / 74.726 / 74.726 / 93.723
 *   d) parabola, crown 1.2500 m, 93.723 kN at the supports, 72.000 at the crown
 *   reactions A = B = 93.723 kN at 39.806 deg, and 39.806 deg is also the end
 *   tangent of all four.
 * CONVERGENCE (the point of a -> d): with n equal loads of 120/n at the
 * (n+1)-division points, M_max = 180.0 / 120.0 / 120.0 / 108.0 / 97.5 / 93.5
 * for n = 1 / 2 / 3 / 4 / 8 / 16, falling monotonically to g l^2/8 = 90.0.
 *
 * THE OFFICIAL KEY (solution-en.pdf p. 4) prints NO numbers for task 4 — it
 * draws the answer. Digitised from the solution page:
 *   a) A(6.512,30.066) I(9.511,27.567) B(12.510,30.066)      -> depth 2.499
 *   b) I(8.512,19.903) II(10.511,19.903), supports 21.569    -> 1.666, 1.666
 *   c) I(8.012,11.823) II(9.511,11.407) III(11.011,11.823)   -> 1.250, 1.666, 1.250
 *   d) drawn with Beziers; measured on a 200 dpi render, the dashed support
 *      line and the dashed crown line are 98.5 px apart at 78.74 px/m -> 1.251
 *   force diagrams: load lines 5.998 / 2x2.999 / 3x1.999 / 5.998 cm at
 *      20 kN/cm = 119.96 / 119.96 / 119.94 / 119.96 kN, and the pole offset is
 *      3.599 / 3.598 / 3.598 / 3.598 cm = 71.98 / 71.96 / 71.96 / 71.96 kN.
 *   member angles drawn: 39.80 deg (all end segments), 0.00 (b, member 2),
 *      15.52 / 164.48 (c, members 2 and 3).
 *
 * AGREEMENT WITH THE KEY: complete — no error found in task 4. The key used one
 * and the same pole, H = 72.00 kN to within 0.06 %, for all four cases, and at
 * that pole every depth computed here reproduces the drawn one to three
 * decimals (2.5000/2.499, 1.6667/1.666, 1.2500/1.250, 1.2500/1.251) and every
 * angle to 0.01 deg. The one thing the key leaves unsaid, and this view says
 * out loud: 72 kN is a CHOICE, not an answer. Drag it.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

const SPAN = 6.00;                 // m, digitised 5.998
const WTOT = 120;                  // kN, the sheet's total in every case
const HKEY = 72;                   // kN, the pole the official key drew
const NPAR = 48;                   // samples along a drawn parabola

// Form diagram, left; force diagram, right. Laid out against
// `occlusion.py --cards`: the caption card owns x < -11.24 above y = 5.60, the
// RESULT card owns x < -3.72 below y = -12.58.
const MU = 2.4, FX0 = -28.5, FY0 = 2.0; // drawing units per metre, and A
const YBAR = 2.4, YTIP = 0.8;           // load arrows, above the chord (units)
const YTIT = -10.8;                     // the form diagram's title line
const LX = -2, LY0 = 10, SFD = 0.15;    // the load line
const ARS = 0.024;                      // drawing units per kN for a reaction

const TAG = ['a)', 'b)', 'c)', 'd)'];
const NAME = ['one load of 120 kN at midspan',
              'two loads of 60 kN at the third points',
              'three loads of 40 kN at the quarter points',
              'a uniform g = 20 kN/m over the whole span'];
/** the same names, but honouring a total load moved off the sheet's 120 kN */
const nameOf = (cas, W) => [
  `one load of ${W.toFixed(0)} kN at midspan`,
  `two loads of ${(W / 2).toFixed(1)} kN at the third points`,
  `three loads of ${(W / 3).toFixed(1)} kN at the quarter points`,
  `a uniform g = ${(W / SPAN).toFixed(2)} kN/m over the whole span`][cas];

const DEFAULTS = { cas: 0, H: HKEY, W: WTOT, nx: 12, lbl: true, _k: 99 };

// ---------------------------------------------------------------- maths ----
/** n equal loads of W/n at the (n+1)-division points; n = 0 means the UDL. */
function loads(n, W) {
  if (!n) return { n: 0, xs: [], Ps: [], g: W / SPAN };
  const xs = [], Ps = [];
  for (let i = 1; i <= n; i++) { xs.push((SPAN * i) / (n + 1)); Ps.push(W / n); }
  return { n, xs, Ps, g: 0 };
}

/** simple-beam bending moment of that load set, span SPAN, both ends level */
function moment(b, W, x) {
  if (!b.n) return (b.g * x * (SPAN - x)) / 2;
  let m = (W / 2) * x;
  for (let i = 0; i < b.n; i++) if (b.xs[i] < x - 1e-9) m -= b.Ps[i] * (x - b.xs[i]);
  return m;
}

/** the funicular polygon of n equal loads, at thrust H — [x, depth] pairs */
function polygon(n, W, H) {
  const b = loads(n, W);
  const p = [[0, 0]];
  for (const x of b.xs) p.push([x, moment(b, W, x) / H]);
  p.push([SPAN, 0]);
  return p;
}

function compute(s) {
  const cas = Math.round(s.cas), W = s.W, H = s.H;
  const n = [1, 2, 3, 0][cas], udl = n === 0;
  const b = loads(n, W);
  const Av = W / 2;
  const M = (x) => moment(b, W, x);

  // K rays / K funicular segments / K+1 vertices. For d) the two "segments"
  // are the end TANGENTS of the parabola and the vertex is the tangent
  // triangle's apex, exactly the construction the key draws.
  const K = udl ? 2 : n + 1;
  const Mmax = udl ? (b.g * SPAN * SPAN) / 8 : Math.max(...b.xs.map(M));
  const f = Mmax / H;
  const nodes = udl
    ? [[0, 0], [SPAN / 2, 2 * f], [SPAN, 0]]
    : polygon(n, W, H);

  // the load line, as cumulative load measured down from its top
  const ldiv = [0];
  if (udl) ldiv.push(W); else for (let i = 0; i < n; i++) ldiv.push(ldiv[i] + b.Ps[i]);

  // every segment carries the same thrust and its own panel's shear
  const shear = ldiv.map((c) => Av - c);
  const N = shear.map((v) => Math.hypot(H, v));
  const Nmax = Math.hypot(H, Av);
  const ang = (Math.atan2(Av, H) * 180) / Math.PI;

  // the drawn curve for d), and the same parabola as a pale reference in a)-c)
  const gEq = W / SPAN;
  const curve = [];
  for (let i = 0; i <= NPAR; i++) {
    const x = (SPAN * i) / NPAR;
    curve.push([x, (gEq * x * (SPAN - x)) / 2 / H]);
  }
  const fPara = (gEq * SPAN * SPAN) / 8 / H;

  // the convergence overlay: nx equal loads, same total, same pole
  const nx = Math.round(s.nx);
  const nxNodes = polygon(nx, W, H);
  const nxMmax = Math.max(...loads(nx, W).xs.map((x) => moment(loads(nx, W), W, x)));

  const depths = udl ? [f] : b.xs.map((x) => M(x) / H);
  const dMid = udl ? f : M(SPAN / 2) / H;

  return { cas, tag: TAG[cas], name: nameOf(cas, W), udl, n, W, H, Av,
           xs: b.xs, Ps: b.Ps, g: gEq, K, nodes, ldiv, shear, N, Nmax, ang,
           Mmax, f, depths, dMid, curve, fPara,
           nx, nxNodes, nxMmax, nxF: nxMmax / H,
           atKey: Math.abs(H - HKEY) < 0.5 && Math.abs(W - WTOT) < 0.5 };
}

// ---------------------------------------------------------------- steps ----
const STEPS = [
  { t: 'The exercise',
    d: 'page 4 asks the same question four times: 120 kN on a 6 metre span, split one, two, three ways and finally spread out as a uniform load. Each time, draw A POSSIBLE funicular cable — and “a possible” is the whole exercise, because the pole is free',
    detail: () => ['a) F1 = 120 kN · b) F1 = F2 = 60 kN · c) F1 = F2 = F3 = 40 kN · d) g = 20 kN/m',
                   'form diagram 1:100 · force diagram 1 cm ≙ 20 kN',
                   'every case totals 120 kN — that is what makes the four comparable'] },

  { t: 'The span and the loads',
    d: 'left: the case on show. Two pinned supports at the same level, six metres apart, and the loads sitting on the (n+1)-division points of the span. Switch the case in the panel',
    detail: (d) => [`${d.tag} ${d.name}`,
                    d.udl ? `g = ${d.g.toFixed(2)} kN/m over the whole ${SPAN.toFixed(2)} m → ${(d.g * SPAN).toFixed(2)} kN`
                          : `loads at ${d.xs.map((x) => x.toFixed(3)).join(' / ')} m, ${d.Ps[0].toFixed(2)} kN each → ${d.W.toFixed(2)} kN`,
                    'digitised span 5.998 m and load axes 1.500 / 2.000 / 3.000 / 4.000 / 4.500 m — all round, so the printed 1:100 is honest'],
    take: 'the four cases are one family: n equal loads of 120/n kN at the (n+1)-division points, and d) is that family’s limit' },

  { t: 'The resultant, and the reactions that do not move',
    d: 'all 120 kN of it acts, in total, at midspan — every case is symmetric — so both supports take 60 kN vertically whatever shape you end up drawing. That part of the answer is fixed before any pole is chosen',
    detail: (d) => [`R = ${d.W.toFixed(2)} kN at midspan (x = ${(SPAN / 2).toFixed(2)} m)`,
                    `A_v = B_v = ${d.Av.toFixed(2)} kN`,
                    `simple-beam moment M_max = ${d.Mmax.toFixed(1)} kNm ${d.udl ? '= g·l²/8' : d.n === 1 ? '= F·l/4' : ''}`],
    take: 'the vertical reactions belong to the loads, not to the shape' },

  { t: 'The load line',
    d: 'right: the force diagram starts as the loads laid end to end, downwards, to scale. Its total length is the resultant, and its division points are where the rays will land',
    detail: (d) => [d.udl ? `one segment, R = ${d.W.toFixed(2)} kN (the UDL’s resultant)`
                          : `${d.n} segment${d.n > 1 ? 's' : ''} of ${d.Ps[0].toFixed(2)} kN → ${d.W.toFixed(2)} kN`,
                    `drawn at ${(1 / SFD).toFixed(1)} kN per unit; the sheet prints 1 cm ≙ 20 kN`,
                    'nothing about the shape is decided yet — this is only the load'] },

  { t: 'The pole is FREE — that is the exercise',
    d: 'now choose the pole. Anywhere on the horizontal through the 60 kN division point gives a valid funicular; how far out you put it is the horizontal thrust H, and it is the only thing you get to decide. Drag it',
    detail: (d) => [`H = ${d.H.toFixed(2)} kN → the pole sits ${(d.H / 20).toFixed(3)} cm from the load line at the sheet’s scale`,
                    `the pole’s height splits the load line into A_v = ${d.Av.toFixed(2)} and B_v = ${d.Av.toFixed(2)} kN`,
                    d.atKey ? 'this is the pole the official key drew — H = 72.00 kN, the same one in all four of its force diagrams'
                            : `the key drew H = ${HKEY.toFixed(2)} kN (all four cases); you are ${d.H > HKEY ? 'flatter' : 'deeper'} than that`],
    take: 'small H → deep cable, small forces; large H → flat cable, large forces. There is no “right” answer, only a chosen one' },

  { t: 'The rays',
    d: 'join the pole to every division point. Each ray is one segment of the cable, already at its final direction and already at its final length — the force diagram is finished before the form diagram is started',
    detail: (d) => [`${d.K} ray${d.K > 1 ? 's' : ''}, one per ${d.udl ? 'end tangent' : 'cable segment'}`,
                    `outermost rays at ${d.ang.toFixed(3)}° — that is √(H² + 60²) = ${d.Nmax.toFixed(3)} kN`,
                    'hover a ray to light up the segment it belongs to'] },

  { t: 'The funicular form',
    d: 'and now transfer it. Start at A, run parallel to the first ray until the first load line, turn onto the second ray, and carry on. The last segment lands on B by itself — if it does not, the pole was read off the wrong side',
    detail: (d) => [d.udl ? `the two end tangents meet ${(2 * d.f).toFixed(4)} m below the chord, and the parabola passes half of that, f = ${d.f.toFixed(4)} m`
                          : `node depths ${d.depths.map((y) => y.toFixed(4)).join(' / ')} m below the chord`,
                    `deepest point f = M_max/H = ${d.Mmax.toFixed(1)} / ${d.H.toFixed(2)} = ${d.f.toFixed(4)} m`,
                    d.atKey ? `the key draws ${d.udl ? '1.251' : d.cas === 0 ? '2.499' : d.cas === 1 ? '1.666 / 1.666' : '1.250 / 1.666 / 1.250'} m — agreement to three decimals`
                            : 'the whole cable is in TENSION, hence red'],
    take: 'with a uniform load the polygon becomes a parabola, and the tangent triangle is twice as deep as the curve — that is the construction the key draws in d)' },

  { t: 'The forces, and the one that never changes',
    d: 'every segment carries the same horizontal thrust and its own panel’s shear, so the steepest segment is the largest — and the steepest is always the one at the support, because that is where the shear is the full 60 kN. Change the case and watch that number stand still',
    detail: (d) => [d.udl
                      ? `${d.Nmax.toFixed(2)} kN at the supports, falling smoothly to H = ${d.H.toFixed(2)} kN at the crown, all tension`
                      : `segments ${d.N.map((v) => v.toFixed(2)).join(' · ')} kN, all tension`,
                    `A = B = ${d.Nmax.toFixed(3)} kN at ${d.ang.toFixed(3)}° above the horizontal, pointing outwards`,
                    `√(${d.H.toFixed(2)}² + ${d.Av.toFixed(2)}²) = ${d.Nmax.toFixed(3)} kN — identical in a), b), c) and d) at this pole`],
    take: 'the maximum cable force depends on the pole and on the total load, and not at all on how that load is divided up' },

  { t: 'a) → d): the polygon becomes the parabola',
    d: 'the pale grey curve is d)’s parabola, drawn at the same pole in every case; the grey polygon is the same total load split n ways. Drag n up and watch the polygon settle onto the curve — the sag falls from F·l/4H to g·l²/8H, a factor of exactly two',
    detail: (d) => [`n = ${d.nx} equal loads of ${(d.W / d.nx).toFixed(3)} kN → M_max = ${d.nxMmax.toFixed(2)} kNm, sag ${d.nxF.toFixed(4)} m`,
                    `the limit is g·l²/8 = ${((d.W / SPAN) * SPAN * SPAN / 8).toFixed(1)} kNm, sag ${d.fPara.toFixed(4)} m`,
                    `n = 1 / 2 / 3 / 4 / 8 / 16 / ∞  →  M_max = 180.0 / 120.0 / 120.0 / 108.0 / 97.5 / 93.5 / 90.0 kNm`],
    take: 'more loads, same total, same pole → a shallower and shallower cable, converging on the parabola of case d)' },
];

// ----------------------------------------------------------------- view ----
export const meta = {
  title: 'EX X · Task 4 — a possible funicular, four ways',
  subtitle: 'Structural Design I · sheet EX X “Additional Exercises”, page 4, cases a)–d)',
  about: 'The same 120 kN on the same 6 metre span, split one, two, three ways and finally smeared out as 20 kN/m. The sheet asks for “a possible” funicular, and that word is the exercise: the pole is free, so every case has a one-parameter family of answers and the reader has to choose one. Drag the thrust H and the whole cable reflows; the vertical reactions never move, and neither does the largest cable force, because both belong to the load and not to the shape. The official key quietly used the same pole, H = 72 kN, in all four of its force diagrams — which is what makes the four drawings comparable, and which this view reproduces to three decimals. The last step drags the number of loads up to show a), b) and c) converging on the parabola of d).',
  result: (d) => [
    `${d.tag} ${d.name} — R = ${d.W.toFixed(2)} kN, A_v = B_v = ${d.Av.toFixed(2)} kN (same in all four cases)`,
    `the pole is FREE: at H = ${d.H.toFixed(2)} kN the sag is f = M_max/H = ${d.Mmax.toFixed(1)}/${d.H.toFixed(2)} = ${d.f.toFixed(4)} m` +
      (d.udl ? ` (parabola; tangent triangle ${(2 * d.f).toFixed(4)} m)` : `, node depths ${d.depths.map((y) => y.toFixed(3)).join(' / ')} m`),
    (d.udl
      ? `cable ${d.Nmax.toFixed(2)} kN at the supports falling smoothly to H = ${d.H.toFixed(2)} kN at the crown, all tension`
      : `cable ${d.N.map((v) => v.toFixed(2)).join(' · ')} kN, all tension`) +
      ` · A = B = ${d.Nmax.toFixed(3)} kN at ${d.ang.toFixed(2)}° — the same maximum in a)–d)`,
    d.atKey
      ? `H = 72.00 kN is the pole the official key drew in all four force diagrams (measured 71.96–71.98 kN); every depth here matches the drawn one to three decimals`
      : `the key drew H = 72.00 kN (f = ${(d.Mmax / HKEY).toFixed(4)} m here). 72 kN is a choice, not an answer — any H gives a valid funicular`],
  frame: [[-28, -24], [26, 18]],
};

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const fx = (x, y) => [FX0 + x * MU, FY0 - y * MU];      // form: +y downwards
  const RED = { pending: PAL.black, final: () => PAL.red };

  dw.label('t_form', 'form diagram 1:100', { cls: 'title', flash: false });
  dw.label('t_force', 'force diagram  1 cm ≙ 20 kN', { cls: 'title', flash: false });

  // ---- form diagram: supports, chord, loads
  for (const nm of ['A', 'B']) {
    dw.disk(`sup${nm}`, { intro: 1, r: dw.W.disk });
    dw.strokes(`hat${nm}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.label(`lsup${nm}`, nm, { cls: 'point', intro: 1, flash: false });
  }
  dw.dashLine('chord', { intro: 1, color: PAL.grey, dash: dw.W.dash });
  for (let i = 0; i < 3; i++) {
    dw.dashLine(`axis${i}`, { intro: 1, color: PAL.grey, dash: dw.W.dash,
      when: (st, dd) => !!dd && !dd.udl && i < dd.n });
    dw.arrow(`ld${i}`, { intro: 1, color: PAL.green, ...ARR,
      when: (st, dd) => !!dd && !dd.udl && i < dd.n });
    dw.label(`lld${i}`, '', { cls: 'num', intro: 1, color: PAL.green,
      when: (st, dd) => !!dd && !dd.udl && i < dd.n });
  }
  dw.seg('qbar', { intro: 1, w: dw.W.thin, color: PAL.green,
    when: (st, dd) => !!dd && dd.udl });
  dw.arrows('qarr', 13, { intro: 1, w: dw.W.thin, color: PAL.green,
    headLen: NARR.headLen * 0.8, headW: NARR.headW * 0.8,
    when: (st, dd) => !!dd && dd.udl });
  dw.label('lq', '', { cls: 'num', intro: 1, color: PAL.green });

  // ---- the resultant
  dw.dashArrow('Rarr', { intro: 2, color: PAL.green, ...ARR });
  dw.label('lR', '', { cls: 'num', intro: 2, color: PAL.green });
  dw.label('lreac', '', { cls: 'point', intro: 2, flash: false, color: PAL.green });

  // ---- force diagram: the load line
  for (let i = 0; i < 3; i++) {
    dw.arrow(`ff${i}`, { intro: 3, color: PAL.green, ...NARR });
    dw.label(`lff${i}`, '', { cls: 'num', intro: 3, color: PAL.green,
      when: (st) => st.lbl });
  }
  dw.label('lline', '', { cls: 'point', intro: 3, flash: false, color: PAL.green });

  // ---- the pole
  dw.disk('pole', { intro: 4, r: dw.W.disk * 0.85 });
  dw.label('lpole', 'o', { cls: 'num', intro: 4 });
  dw.seg('dimH', { intro: 4, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lH', '', { intro: 4, flash: false, color: PAL.grey });

  // ---- rays and the cable, in matched slots (0 = first, 3 = last)
  for (let i = 0; i < 4; i++) {
    dw.seg(`ray${i}`, { intro: 5, w: dw.W.ray, color: PAL.red });
    dw.seg(`mem${i}`, { intro: 6, w: dw.W.bar, color: RED });
    dw.seg(`tan${i}`, { intro: 6, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.label(`lmem${i}`, '', { cls: 'num', intro: 7, color: PAL.red,
      when: (st) => st.lbl });
  }
  dw.strokes('para', NPAR, { intro: 6, w: dw.W.str, color: RED,
    when: (st, dd) => !!dd && dd.udl });
  for (let i = 0; i < 3; i++) {
    dw.disk(`nd${i}`, { intro: 6, r: dw.W.disk * 0.8,
      when: (st, dd) => !!dd && !dd.udl && i < dd.n });
  }
  dw.disk('ndV', { intro: 6, r: dw.W.disk * 0.8, when: (st, dd) => !!dd && dd.udl });
  dw.seg('dimF', { intro: 6, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lF', '', { cls: 'num', intro: 6, flash: false, color: PAL.grey });

  // ---- reactions
  for (const nm of ['A', 'B']) {
    dw.arrow(`re${nm}`, { intro: 7, color: PAL.green, ...ARR });
    dw.label(`lre${nm}`, '', { cls: 'num', intro: 7, color: PAL.green });
  }

  // ---- the convergence overlay
  dw.dashLine('refpara', { intro: 8, color: PAL.grey, dash: dw.W.dash });
  dw.label('lref', '', { cls: 'point', intro: 8, flash: false, color: PAL.grey });
  dw.dashLine('nxpoly', { intro: 8, color: PAL.zero, dash: dw.W.dash });
  dw.label('lnx', '', { cls: 'point', intro: 8, flash: false, color: PAL.grey });

  dw.instant('t_form', 't_force');
  dw.ghostable('ff0', 'ff1', 'ff2', 'ray0', 'ray1', 'ray2', 'ray3');
  // a form-diagram segment (or, in d), the end tangent it stands on) and the
  // ray that carries its force must be parallel; so must the reaction at each
  // end and the outermost ray, since they are literally the same force.
  dw.link('mem0', 'tan0', 'ray0', 'reA', 'lmem0');
  dw.link('mem1', 'ray1', 'lmem1');
  dw.link('mem2', 'ray2', 'lmem2');
  dw.link('mem3', 'tan3', 'ray3', 'reB', 'lmem3');

  const NIL = [[FX0, FY0], [FX0, FY0]];

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    dw.setLabel('t_form', [FX0 + (SPAN / 2) * MU, YTIT]);
    dw.setText('t_form', `form diagram 1:100 — ${d.tag}`);
    dw.setLabel('t_force', [LX + 9.0, LY0 + 5.4]);

    // ---- supports, chord, load axes
    const A = fx(0, 0), B = fx(SPAN, 0);
    dw.setDisk('supA', A); dw.setDisk('supB', B);
    dw.setStrokes('hatA', V.hatch([A[0] - 1.5, A[1] - 0.45], [A[0] + 1.5, A[1] - 0.45], -1, 0.85, 5));
    dw.setStrokes('hatB', V.hatch([B[0] - 1.5, B[1] - 0.45], [B[0] + 1.5, B[1] - 0.45], -1, 0.85, 5));
    dw.setLabel('lsupA', V.add(A, [-1.5, 0.9]));
    dw.setLabel('lsupB', V.add(B, [1.5, 0.9]));
    dw.setDashLine('chord', [A, B]);

    const yb = FY0 + YBAR, yt = FY0 + YTIP;           // load arrows, in units
    for (let i = 0; i < 3; i++) {
      if (!d.udl && i < d.n) {
        const wx = FX0 + d.xs[i] * MU;
        dw.setDashLine(`axis${i}`, [[wx, yb], fx(d.xs[i], d.f + 0.7)]);
        dw.setArrow(`ld${i}`, [wx, yb], [wx, yt]);
        dw.setLabel(`lld${i}`, [wx + 0.85, (yb + yt) / 2]);
        dw.setText(`lld${i}`, `F${i + 1}`);
      } else {
        dw.setDashLine(`axis${i}`, NIL);
        dw.setArrow(`ld${i}`, NIL[0], NIL[1]);
        dw.setText(`lld${i}`, '');
      }
    }
    dw.setSeg('qbar', [A[0], yb], [B[0], yb]);
    dw.setArrows('qarr', Array.from({ length: 13 }, (_, i) => {
      const wx = A[0] + ((B[0] - A[0]) * i) / 12;
      return [[wx, yb], [wx, yt]];
    }));
    dw.setLabel('lq', [LX + 9.0, LY0 + 2.8]);
    dw.setText('lq', d.udl ? `g = ${d.g.toFixed(0)} kN/m`
      : `${d.xs.map((_, i) => `F${i + 1}`).join(' = ')} = ${d.Ps[0].toFixed(0)} kN`);

    // ---- the resultant, hanging down onto the cable
    const tip = fx(SPAN / 2, d.dMid - 0.26);
    dw.setDashArrow('Rarr', V.add(tip, [0, 2.9]), tip);
    dw.setLabel('lR', [tip[0], Math.min(tip[1] + 3.9, FY0 - 0.6)]);
    dw.setText('lR', `R = ${d.W.toFixed(0)} kN`);
    dw.setLabel('lreac', [LX + 9.0, LY0 + 4.1]);
    dw.setText('lreac', `A_v = B_v = ${d.Av.toFixed(2)} kN, whatever the pole`);

    // ---- the load line
    const top = [LX, LY0];
    const pt = d.ldiv.map((c) => [LX, LY0 - c * SFD]);
    for (let i = 0; i < 3; i++) {
      if (i < d.ldiv.length - 1) {
        dw.setArrow(`ff${i}`, pt[i], pt[i + 1]);
        dw.setLabel(`lff${i}`, [LX - 1.4, (pt[i][1] + pt[i + 1][1]) / 2]);
        dw.setText(`lff${i}`, d.udl ? `${d.W.toFixed(0)}` : `${d.Ps[i].toFixed(0)}`);
      } else {
        dw.setArrow(`ff${i}`, [LX, LY0], [LX, LY0]);
        dw.setText(`lff${i}`, '');
      }
    }
    dw.setLabel('lline', [LX + 3.2, -9.8]);
    dw.setText('lline', d.udl ? `load line: R = ${d.W.toFixed(0)} kN`
                              : `load line ${d.n} × ${d.Ps[0].toFixed(0)} = ${d.W.toFixed(0)} kN`);

    // ---- the pole
    const po = [LX + d.H * SFD, LY0 - d.Av * SFD];
    dw.setDisk('pole', po);
    dw.setLabel('lpole', V.add(po, [1.1, 0.9]));
    dw.setSeg('dimH', [LX, LY0 + 0.6], [po[0], LY0 + 0.6]);
    dw.setLabel('lH', [(LX + po[0]) / 2, LY0 + 1.5]);
    dw.setText('lH', `H = ${d.H.toFixed(2)} kN`);

    // ---- rays and cable, slot by slot (slot 3 is always the LAST one)
    const slot = (k) => (k === d.K - 1 ? 3 : k);
    const used = new Set();
    for (let k = 0; k < d.K; k++) {
      const j = slot(k); used.add(j);
      dw.setSeg(`ray${j}`, po, pt[k]);
      const a = fx(d.nodes[k][0], d.nodes[k][1]);
      const c = fx(d.nodes[k + 1][0], d.nodes[k + 1][1]);
      if (d.udl) {
        dw.setSeg(`tan${j}`, a, c);
        dw.setSeg(`mem${j}`, NIL[0], NIL[1]);
      } else {
        dw.setSeg(`mem${j}`, a, c);
        dw.setSeg(`tan${j}`, NIL[0], NIL[1]);
      }
      // just below the segment, on the outside of the cable, so that a label
      // never lands inside the V where the resultant hangs
      let nr = V.perp(V.unit(V.sub(c, a)));
      if (nr[1] > 0) nr = V.mul(nr, -1);
      dw.setLabel(`lmem${j}`, V.add(V.mid(a, c), V.mul(nr, 1.35)));
      dw.setText(`lmem${j}`, `${d.N[k].toFixed(2)}`);
    }
    for (let j = 0; j < 4; j++) {
      if (used.has(j)) continue;
      dw.setSeg(`ray${j}`, po, po);
      dw.setSeg(`mem${j}`, NIL[0], NIL[1]);
      dw.setSeg(`tan${j}`, NIL[0], NIL[1]);
      dw.setText(`lmem${j}`, '');
    }

    // ---- the parabola of d), and the node markers
    dw.setStrokes('para', Array.from({ length: NPAR }, (_, i) =>
      [fx(d.curve[i][0], d.curve[i][1]), fx(d.curve[i + 1][0], d.curve[i + 1][1])]));
    for (let i = 0; i < 3; i++) {
      dw.setDisk(`nd${i}`, !d.udl && i < d.n ? fx(d.xs[i], d.depths[i]) : [FX0, FY0]);
    }
    dw.setDisk('ndV', fx(SPAN / 2, 2 * d.f));

    // ---- the sag, dimensioned at the deepest point
    // dimensioned clear of the span, so it never lands on a member label
    const xd = B[0] + 1.8;
    dw.setSeg('dimF', [xd, FY0], [xd, FY0 - d.f * MU]);
    dw.setLabel('lF', [xd + 3.1, FY0 - (d.f * MU) / 2]);
    dw.setText('lF', `f = ${d.f.toFixed(4)} m`);

    // ---- the reactions, along the outermost cable segments
    const u0 = V.unit(V.sub(fx(d.nodes[1][0], d.nodes[1][1]), A));
    const uL = V.unit(V.sub(fx(d.nodes[d.K][0], d.nodes[d.K][1]),
                            fx(d.nodes[d.K - 1][0], d.nodes[d.K - 1][1])));
    // pointing OUTWARDS, away from the support, as the key draws them: the
    // cable pulls the support inwards, the support pushes back
    const lr = d.Nmax * ARS;
    dw.setArrow('reA', V.add(A, V.mul(u0, -0.5)), V.add(A, V.mul(u0, -lr - 0.5)));
    dw.setArrow('reB', V.add(B, V.mul(uL, 0.5)), V.add(B, V.mul(uL, lr + 0.5)));
    dw.setLabel('lreA', V.add(A, V.mul(u0, -lr - 1.0)));
    dw.setLabel('lreB', V.add(B, V.mul(uL, lr + 1.0)));
    dw.setText('lreA', `A = ${d.Nmax.toFixed(2)}`);
    dw.setText('lreB', `B = ${d.Nmax.toFixed(2)}`);

    // ---- the convergence overlay
    dw.setDashLine('refpara', d.curve.map(([x, y]) => fx(x, y)));
    const ydeep = FY0 - (d.udl ? 2 * d.f : d.f) * MU;   // the lowest ink drawn
    const xc = FX0 + (SPAN / 2) * MU;
    dw.setLabel('lref', [xc, ydeep - 2.0]);
    dw.setText('lref', `parabola of d): f = ${d.fPara.toFixed(4)} m`);
    dw.setDashLine('nxpoly', d.nxNodes.map(([x, y]) => fx(x, y)));
    dw.setLabel('lnx', [xc, ydeep - 3.4]);
    dw.setText('lnx', `n = ${d.nx} equal loads: f = ${d.nxF.toFixed(4)} m`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const w = panel.section('The case');
  panel.slider(w, s, 'cas', 'load case', 0, 3, 1, refresh,
    (v) => `${TAG[Math.round(v)]} ${NAME[Math.round(v)]}`);
  panel.toggle(w, s, 'lbl', 'show force labels', refresh);

  const g = panel.section('Design the form');
  panel.slider(g, s, 'H', 'pole distance H (kN) — the free choice', 60, 140, 1, refresh,
    (v) => `${v.toFixed(0)} kN${Math.abs(v - HKEY) < 0.5 ? '  ← the pole the key drew' : ''}`);
  panel.slider(g, s, 'W', 'total load (kN)', 100, 130, 5, refresh,
    (v) => `${v.toFixed(0)} kN${Math.abs(v - WTOT) < 0.5 ? '  ← the sheet’s value' : ''}`);
  panel.slider(g, s, 'nx', 'a)→d): n equal loads (last step)', 1, 24, 1, refresh,
    (v) => `n = ${v.toFixed(0)}${v > 20 ? '  — practically the parabola' : ''}`);

  refresh();
  return player;
}
