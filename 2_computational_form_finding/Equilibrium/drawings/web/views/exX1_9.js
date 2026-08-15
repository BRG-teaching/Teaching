/**
 * EX X · Task 9 — Finding the thrust line
 * Structural Design I, HS 22, sheet "EX X — Additional Exercises", page 9.
 *
 * TEXT (verbatim, English sheet). "In a) and b), the thrust line that goes
 * through points A, B and C is sought. Draw the corresponding force diagram for
 * both situations. Colour tension forces in red, compression forces in blue and
 * the external forces in green."
 * The two sub-parts carry no text of their own — they are the two figures
 * labelled a) and b), each captioned "form diagram 1:250" and
 * "force diagram 1cm ≙ 10kN".
 *
 * GIVEN.  a) g_d = 8 kN/m.   b) q_d = 16 kN/m together with g_d = 8 kN/m.
 *
 * GEOMETRY, digitised with
 *   web/tools/sheetvec.py .../task-en.pdf 9 --scale 250 --min 0.05
 * Origin = support A, x right, y up, metres. Both figures sit on the same
 * three dash-dot verticals, which run the full height of the page:
 *
 *   through A   x =  0.000
 *   through C   x =  9.997   ≈ 10.00 m   — round ✓
 *   through B   x = 14.995   ≈ 15.00 m   — round ✓
 *
 *   A (pin)  ( 0.000, 0.000)      support apexes (19.425, 38.379) and
 *   B (pin)  (14.995, 0.000)      (34.420, 38.379) in page coordinates for a),
 *   C        ( 9.996, 4.394)      (19.425, 2.499) / (34.420, 2.499) for b)
 *
 * BOTH SUPPORTS ARE AT THE SAME LEVEL, in a) and in b) alike — the two support
 * apexes come out at identical y in the dump, and the C marker sits 4.394 m
 * above the chord in both figures. The arch is asymmetric because C is at
 * x = 10 m, not because the supports are stepped. Span and C's abscissa are
 * exactly round, which validates the 1:250 scale; the rise 4.394 m is not
 * (nominally 4.4 m).
 *
 * WHERE THE LOADS ACTUALLY ACT — the thing to get right on this page. Band
 * extents from the dump, confirmed against a 200 dpi render of the English AND
 * the German sheet, because these InDesign PDFs carry hidden artwork:
 *
 *   a)  g_d = 8 kN/m    from x = 0.000  to x = 9.997   (C's vertical)
 *   b)  g_d = 8 kN/m    from x = 9.997  to x = 14.995
 *   b)  q_d = 16 kN/m   from x = 9.997  to x = 14.995
 *
 * So a) is loaded over the LEFT 10 m only — not over the whole span — and b)
 * over the RIGHT 5 m only, with the 8 and the 16 covering exactly the same
 * 5.00 m (both measure 4.998 m in the dump; they are drawn one above the
 * other, not one shorter than the other). Totals: a) 80 kN at x = 5.00 m,
 * b) 24 × 5 = 120 kN at x = 12.50 m.
 *
 * DERIVATION. Two pins at the same level, so the VERTICAL reactions follow from
 * global equilibrium alone — the horizontal thrust has no lever about either
 * support. The thrust then follows from ΣM = 0 at C, and the thrust line is
 * simply the simple-beam moment diagram divided by H.
 *
 *   a)  ΣM_B: A_v·15 = 80·10          → A_v = 53.333, B_v = 26.667 kN
 *       ΣM_C: −10·A_v + 4.394·H + 80·5 = 0 → H = 30.344 kN
 *       A = ( 30.344,  53.333) →  61.36 kN at  60.36°
 *       B = (−30.344,  26.667) →  40.40 kN at 138.70°
 *       parabola over the loaded 10 m, y = 1.75757x − 0.131818x², then a
 *       STRAIGHT segment C→B. y(10) = 4.394 and y′(10) = −0.8788, which is
 *       exactly the slope of C–B: the thrust line has NO KINK at C, because C
 *       happens to be the end of the loaded length.
 *       crown 5.859 m at x = 6.667 m (where the shear is zero)
 *       tangent intersection I = (5.000, 8.788), on R's line of action
 *       MAXIMUM THRUST 61.36 kN, at A
 *
 *   b)  ΣM_B: A_v·15 = 120·2.5        → A_v = 20, B_v = 100 kN
 *       ΣM_C: −10·A_v + 4.394·H = 0   → H = 45.517 kN   (nothing left of C)
 *       A = ( 45.517,   20.000) →  49.72 kN at  23.72°
 *       B = (−45.517,  100.000) → 109.87 kN at 114.47°
 *       STRAIGHT from A to C, then a parabola over the loaded 5 m which
 *       reaches y(15) = 0 at B. crown only 4.577 m at x = 10.833 m
 *       tangent intersection II = (12.500, 5.492)
 *       MAXIMUM THRUST 109.87 kN, at B
 *
 * WHY THE EXERCISE IS WORTH DOING. A, B and C are the same three points in both
 * cases, yet the maximum force differs by a factor of 1.79 and moves to the
 * other support. The thrust line through three given points is unique — but
 * unique FOR A GIVEN LOAD, and putting 120 kN on the short right-hand span
 * nearly doubles what the structure carries.
 *
 * AGAINST THE OFFICIAL KEY. The key prints NO NUMBERS; it draws the two thrust
 * lines, the two force diagrams, the points I and II, the sagitta construction
 * and a node-equilibrium rosette per case. Digitising the key's own force
 * diagrams (force = 4 × length in metres at --scale 250):
 *
 *   quantity          key's drawing          derived here
 *   a) A               61.35 kN at  60.34°    61.36 kN at  60.36°
 *   a) B               40.40 kN at 138.72°    40.40 kN at 138.70°
 *   a) R               79.97 kN vertical      80.00 kN
 *   b) A               49.73 kN at  23.70°    49.72 kN at  23.72°
 *   b) B              109.84 kN at 114.49°   109.87 kN at 114.47°
 *   b) R              119.95 kN vertical     120.00 kN
 *   a) chord A–C        slope 0.4391          0.4394
 *   a) tangent at A     slope 1.7555          1.75757
 *   a) line C–B         slope −0.87867       −0.8788
 *
 * NO DISAGREEMENT: agrees with the key everywhere to four significant figures,
 * better than the key's own line weight. Since the key prints no numbers, the
 * numbers above ARE the answer, and they are derived here, not measured.
 *
 * The hand derivation above rounds the span to 15.00 m and C's abscissa to
 * 10.00 m. The view keeps the DIGITISED 14.995 m and 9.996 m, so it prints
 * H = 30.32 / 45.50 kN and maxima 61.33 / 109.84 kN instead of 30.34 / 45.52
 * and 61.36 / 109.87 — a 0.05 % difference, and if anything closer to the key's
 * own drawing (which measures 109.84 kN for b) B).
 *
 * ONE CORRECTION, to the task brief this view was commissioned from rather than
 * to the sheet: the brief said the UDL in a) covers the whole span, that b)'s
 * q_d covers a SHORTER stretch than its g_d, and that A and B are at different
 * heights. All three are wrong, as the digitised extents above show. The view
 * says so in a step caption.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

// ------------------------------------------------------------- the sheet --

const SPAN = 14.995;                 // A to B (15.00 m)
const XC = 9.996;                    // C's abscissa (10.00 m)
const HC0 = 4.394;                   // C above the chord, as drawn

// ------------------------------------------------------------ the layout --

const MPU = 1.25;                    // drawing units per metre, form diagram
const FX = 1.0, FY = -4.0;           // where A lands
const SFD = 8.5;                     // kN per drawing unit, force diagrams
const GA = [-22.5, 1.0];             // top of load line a)
const GB = [-11.5, 1.0];             // top of load line b)
const HB = [11.0, 11.9];             // the g_d band, metres above the chord
const HQ = [12.4, 13.3];             // the q_d band
const NCV = 40;                      // segments in a drawn parabola

const DEFAULTS = { gd: 8, qd: 16, hC: HC0, caseA: true, caseB: true, lbl: true, _k: 99 };

// -------------------------------------------------------------- the maths --

/** One load case: constant bands over [x1, x2], a thrust line through C. */
function solve(bands, hC) {
  let W = 0, Mo = 0;
  for (const b of bands) { const w = b.w * (b.x2 - b.x1); W += w; Mo += w * (b.x1 + b.x2) / 2; }
  const xbar = W > 1e-9 ? Mo / W : SPAN / 2;
  const Av = (W * (SPAN - xbar)) / SPAN, Bv = W - Av;
  // simple-beam moment, and the shear, at x
  const Mb = (x) => {
    let M = Av * x;
    for (const b of bands) {
      if (x <= b.x1) continue;
      const x2 = Math.min(x, b.x2), w = b.w * (x2 - b.x1);
      M -= w * (x - (b.x1 + x2) / 2);
    }
    return M;
  };
  const Vs = (x) => {
    let v = Av;
    for (const b of bands) { if (x > b.x1) v -= b.w * (Math.min(x, b.x2) - b.x1); }
    return v;
  };
  // ΣM_C = 0 on the free body left of C: the thrust follows straight off it
  const H = Mb(XC) / hC;
  const y = (x) => Mb(x) / H;
  // the crown sits where the shear passes through zero — bisect for it exactly
  let lo = 0, hi = SPAN;
  for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (Vs(m) > 0) lo = m; else hi = m; }
  const xCrown = (lo + hi) / 2;
  const NA = Math.hypot(H, Av), NB = Math.hypot(H, Bv);
  return {
    bands, W, xbar, Av, Bv, H, Mb, Vs, y,
    xCrown, yCrown: y(xCrown),
    NA, NB, Nmax: Math.max(NA, NB), where: NA >= NB ? 'A' : 'B',
    uA: [H / NA, Av / NA], uB: [-H / NB, Bv / NB],
    angA: (Math.atan2(Av, H) * 180) / Math.PI,
    angB: (Math.atan2(Bv, -H) * 180) / Math.PI,
    I: [xbar, (Av * xbar) / H],
    checkC: Mb(XC) - H * hC,                       // ΣM_C = 0, to machine zero
    checkB: Mb(SPAN),                              // the thrust line closes at B
    // force diagram, kN, load line starting at (0, 0)
    P0: [0, 0], P1: [0, -W], pole: [-H, -Av], div: [0, -Av],
  };
}

function compute(s) {
  const A = solve([{ w: s.gd, x1: 0, x2: XC }], s.hC);
  const B = solve([{ w: s.gd, x1: XC, x2: SPAN }, { w: s.qd, x1: XC, x2: SPAN }], s.hC);
  const samp = (c, x0, x1) => {
    const p = [];
    for (let i = 0; i <= NCV; i++) { const x = x0 + ((x1 - x0) * i) / NCV; p.push([x, c.y(x)]); }
    return p;
  };
  return {
    a: A, b: B, hC: s.hC, gd: s.gd, qd: s.qd,
    C: [XC, s.hC],
    curveA: samp(A, 0, XC), curveB: samp(B, XC, SPAN),
    ratio: B.Nmax / A.Nmax,
    Ha: A.H, Hb: B.H, NmaxA: A.Nmax, NmaxB: B.Nmax,
  };
}

// ----------------------------------------------------------------- steps --

const K_LA = 2, K_RA = 3, K_TA = 4, K_LB = 5, K_RB = 6, K_TB = 7;

const STEPS = [
  { t: 'The exercise', d: 'EX X page 9. Two load cases on the same three points: the thrust line has to pass through A, B and C, and the force diagram has to go with it. Both cases are drawn here at once — their loaded lengths do not overlap, so the two answers can be compared directly',
    take: 'through three given points the thrust line is unique — but only for a given load' },
  { t: 'The three points', d: 'the supports are 15.00 m apart AND LEVEL — in both figures, checked in the vector dump. C sits on the middle vertical, 10.00 m from A and 4.394 m above the chord. The asymmetry of what follows comes entirely from C being off midspan',
    detail: (d) => [`A (0, 0) · B (${SPAN.toFixed(3)}, 0) · C (${XC.toFixed(3)}, ${d.hC.toFixed(3)}) m`,
                    `span and C's abscissa come out exactly round at 1:250; the rise 4.394 m does not`,
                    `both pinned, so four reaction components and only three equations — C is the fourth`],
    take: 'drag C up or down in the panel: both answers below move with it' },
  { t: 'a) the load', d: 'g_d = 8 kN/m over the LEFT 10 m only, from A to C\'s vertical — NOT over the whole span. Its resultant stands at the middle of that length',
    detail: (d) => [`${d.gd.toFixed(1)} kN/m × ${XC.toFixed(2)} m = ${d.a.W.toFixed(2)} kN at x = ${d.a.xbar.toFixed(3)} m`,
                    `everything right of C's vertical is unloaded, so the thrust line there is STRAIGHT`],
    take: 'read the band ends off the drawing, not off the label. This one stops at C' },
  { t: 'a) the reactions', d: 'both pins are at the same level, so the thrust has no lever about either of them and the vertical reactions come from ΣM alone. Then one more moment — about C, on the free body left of it — gives the horizontal thrust',
    detail: (d) => [`ΣM_B: A_v·${SPAN.toFixed(2)} = ${d.a.W.toFixed(1)}·${(SPAN - d.a.xbar).toFixed(2)} → A_v = ${d.a.Av.toFixed(3)}, B_v = ${d.a.Bv.toFixed(3)} kN`,
                    `ΣM_C: H = M(C)/f = ${(d.a.Mb(XC)).toFixed(2)} / ${d.hC.toFixed(3)} = ${d.a.H.toFixed(3)} kN`,
                    `A = ${d.a.NA.toFixed(2)} kN at ${d.a.angA.toFixed(2)}° · B = ${d.a.NB.toFixed(2)} kN at ${d.a.angB.toFixed(2)}°`],
    take: 'the thrust line IS the simple-beam moment diagram, divided by H' },
  { t: 'a) the thrust line', d: 'a parabola over the loaded length and a straight line beyond it, and the two join at C with NO KINK — the parabola\'s own tangent there already points at B. Right: the force triangle, whose horizontal width is H',
    detail: (d) => [`crown ${d.a.yCrown.toFixed(3)} m at x = ${d.a.xCrown.toFixed(3)} m, where the shear is zero`,
                    `the two end tangents meet at I = (${d.a.I[0].toFixed(3)}, ${d.a.I[1].toFixed(3)}) — on R's line of action`,
                    `max thrust ${d.a.Nmax.toFixed(2)} kN, at ${d.a.where} · closes at B to ${Math.abs(d.a.checkB).toExponential(1)} kNm`],
    take: 'A, B and R concurrent at I — the three-force condition, drawn' },
  { t: 'b) the load', d: 'now the same three points with q_d = 16 kN/m ON TOP OF g_d = 8 kN/m, and both bands sit over the RIGHT 5 m only — the same 5.00 m, one drawn above the other. Half the length, and half again as much again per metre',
    detail: (d) => [`(${d.gd.toFixed(1)} + ${d.qd.toFixed(1)}) kN/m × ${(SPAN - XC).toFixed(2)} m = ${d.b.W.toFixed(2)} kN at x = ${d.b.xbar.toFixed(3)} m`,
                    `nothing at all acts left of C, so THAT half of the thrust line is straight`],
    take: 'the two bands have identical extents on the sheet; the 16 is not drawn shorter than the 8' },
  { t: 'b) the reactions', d: 'same two moments. The load has moved close to B, so B now takes five times what A does — and because nothing acts left of C, the moment about C contains only A_v, which makes the thrust the easiest number on the page',
    detail: (d) => [`ΣM_B: A_v = ${d.b.Av.toFixed(3)}, B_v = ${d.b.Bv.toFixed(3)} kN`,
                    `ΣM_C: H = A_v·${XC.toFixed(2)} / ${d.hC.toFixed(3)} = ${d.b.H.toFixed(3)} kN`,
                    `A = ${d.b.NA.toFixed(2)} kN at ${d.b.angA.toFixed(2)}° · B = ${d.b.NB.toFixed(2)} kN at ${d.b.angB.toFixed(2)}°`],
    take: 'H went UP by half even though the span carrying the load got shorter' },
  { t: 'b) the thrust line', d: 'straight from A to C, then a shallow parabola that barely rises past C before diving into B. It reaches B on its own — nothing was adjusted to make it',
    detail: (d) => [`crown only ${d.b.yCrown.toFixed(3)} m at x = ${d.b.xCrown.toFixed(3)} m`,
                    `end tangents meet at II = (${d.b.I[0].toFixed(3)}, ${d.b.I[1].toFixed(3)})`,
                    `max thrust ${d.b.Nmax.toFixed(2)} kN, at ${d.b.where} · closes at B to ${Math.abs(d.b.checkB).toExponential(1)} kNm`],
    take: 'the thrust line hugs the chord A–C because there is no load to bend it' },
  { t: 'The two side by side', d: 'the same A, the same B, the same C — and the answers are not remotely alike. Case b) carries nearly twice the force of case a) and carries it at the OTHER support. Drag C down and watch both thrusts blow up together: a flat thrust line is an expensive one',
    detail: (d) => [`a) H = ${d.a.H.toFixed(2)} kN · max ${d.a.Nmax.toFixed(2)} kN at ${d.a.where}`,
                    `b) H = ${d.b.H.toFixed(2)} kN · max ${d.b.Nmax.toFixed(2)} kN at ${d.b.where} — ${d.ratio.toFixed(2)}× case a)`,
                    `both ΣM_C checks: ${Math.abs(d.a.checkC).toExponential(1)} and ${Math.abs(d.b.checkC).toExponential(1)} kNm`],
    take: 'three points fix the SHAPE only once the load is named. Change the load and the same three points want a different arch' },
];

// ------------------------------------------------------------------ view --

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const fm = (p) => [FX + p[0] * MPU, FY + p[1] * MPU];
  const fa = (v) => [GA[0] + v[0] / SFD, GA[1] + v[1] / SFD];
  const fb = (v) => [GB[0] + v[0] / SFD, GB[1] + v[1] / SFD];
  const BLUE = { pending: PAL.black, final: () => PAL.blue };
  const ONA = (st) => st.caseA, ONB = (st) => st.caseB;

  dw.label('t_form', 'Form diagram 1:250 — both load cases on the same three points',
    { cls: 'title', flash: false });
  dw.label('t_force', 'Force diagrams 1 cm ≙ 10 kN', { cls: 'title', flash: false });

  // ---- given
  for (const n of ['A', 'B']) {
    dw.disk(`sup${n}`, { intro: 1, r: dw.W.disk });
    dw.strokes(`hat${n}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.label(`lsup${n}`, n, { cls: 'num', intro: 1, flash: false });
  }
  for (let i = 0; i < 3; i++) {
    dw.dashLine(`vl${i}`, { intro: 1, color: PAL.grey, dash: dw.W.dash });
  }
  dw.disk('ptC', { intro: 1, r: dw.W.disk });
  dw.label('lC', 'C', { cls: 'num', intro: 1 });
  dw.seg('dimF', { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('ldimF', '', { cls: 'num', intro: 1, color: PAL.grey, flash: false });

  // ---- case a): load, reactions, thrust line, force diagram
  dw.strokes('banda', 2, { intro: K_LA, w: dw.W.thin, color: PAL.green, when: ONA });
  dw.arrows('arra', 9, { intro: K_LA, w: dw.W.thin, color: PAL.green, when: ONA,
    headLen: NARR.headLen * 0.8, headW: NARR.headW * 0.8 });
  dw.label('lbanda', '', { cls: 'num', intro: K_LA, color: PAL.green, when: ONA });
  dw.dashLine('lineRa', { intro: K_LA, color: PAL.green, dash: dw.W.dash, when: ONA });
  dw.dashArrow('Ra', { intro: K_LA, color: PAL.green, w: ARR.w * 1.1,
    headLen: ARR.headLen, headW: ARR.headW, dash: dw.W.dash * 1.6, when: ONA });
  dw.label('lRa', '', { cls: 'num', intro: K_LA, color: PAL.green, when: ONA });

  dw.arrow('RAa', { intro: K_RA, color: PAL.green, ...ARR, when: ONA });
  dw.arrow('RBa', { intro: K_RA, color: PAL.green, ...ARR, when: ONA });
  dw.label('lRAa', '', { cls: 'num', intro: K_RA, color: PAL.green, when: ONA });
  dw.label('lRBa', '', { cls: 'num', intro: K_RA, color: PAL.green, when: ONA });
  dw.dashLine('tangAa', { intro: K_RA, color: PAL.grey, dash: dw.W.dash, when: ONA });
  dw.dashLine('tangBa', { intro: K_RA, color: PAL.grey, dash: dw.W.dash, when: ONA });
  dw.disk('ptIa', { intro: K_RA, r: dw.W.disk * 0.8, when: ONA });
  dw.label('lIa', 'I', { cls: 'num', intro: K_RA, when: ONA });

  dw.strokes('cva', NCV, { intro: K_TA, w: dw.W.bar, color: BLUE, z: 0.06, when: ONA });
  dw.seg('m2a', { intro: K_TA, w: dw.W.bar, color: BLUE, z: 0.06, when: ONA });
  dw.label('lm1a', '1', { cls: 'num', intro: K_TA, color: PAL.blue,
    when: (st) => st.caseA && st.lbl });
  dw.label('lm2a', '2', { cls: 'num', intro: K_TA, color: PAL.blue,
    when: (st) => st.caseA && st.lbl });

  dw.dashArrow('Ra_f', { intro: K_TA, color: PAL.green, w: ARR.w * 1.1,
    headLen: ARR.headLen, headW: ARR.headW, dash: dw.W.dash * 1.6, when: ONA });
  dw.label('lRa_f', 'R', { cls: 'num', intro: K_TA, color: PAL.green, when: ONA });
  dw.seg('ray1a', { intro: K_TA, w: dw.W.ray, color: BLUE, when: ONA });
  dw.seg('ray2a', { intro: K_TA, w: dw.W.ray, color: BLUE, when: ONA });
  dw.arrow('Aa_f', { intro: K_TA, color: PAL.green, ...NARR, when: ONA });
  dw.arrow('Ba_f', { intro: K_TA, color: PAL.green, ...NARR, when: ONA });
  dw.label('lAa_f', 'A', { cls: 'num', intro: K_TA, color: PAL.green, when: ONA });
  dw.label('lBa_f', 'B', { cls: 'num', intro: K_TA, color: PAL.green, when: ONA });
  dw.disk('polea', { intro: K_TA, r: dw.W.disk * 0.8, when: ONA });
  dw.seg('dimHa', { intro: K_TA, w: dw.W.dim, color: PAL.grey, flash: false, when: ONA });
  dw.label('lHa', '', { cls: 'point', intro: K_TA, color: PAL.grey, when: ONA });
  dw.label('lcasea', 'a)', { cls: 'title', intro: K_LA, flash: false, when: ONA });

  dw.link('tangAa', 'ray1a', 'Aa_f', 'RAa', 'lm1a');
  dw.link('tangBa', 'm2a', 'ray2a', 'Ba_f', 'RBa', 'lm2a');
  dw.link('Ra', 'Ra_f', 'lineRa', 'lRa', 'lRa_f');

  // ---- case b)
  dw.strokes('bandb', 2, { intro: K_LB, w: dw.W.thin, color: PAL.green, when: ONB });
  dw.arrows('arrb', 5, { intro: K_LB, w: dw.W.thin, color: PAL.green, when: ONB,
    headLen: NARR.headLen * 0.8, headW: NARR.headW * 0.8 });
  dw.strokes('bandq', 2, { intro: K_LB, w: dw.W.thin, color: PAL.green, when: ONB });
  dw.arrows('arrq', 5, { intro: K_LB, w: dw.W.thin, color: PAL.green, when: ONB,
    headLen: NARR.headLen * 0.8, headW: NARR.headW * 0.8 });
  dw.label('lbandb', '', { cls: 'num', intro: K_LB, color: PAL.green, when: ONB });
  dw.label('lbandq', '', { cls: 'num', intro: K_LB, color: PAL.green, when: ONB });
  dw.dashLine('lineRb', { intro: K_LB, color: PAL.green, dash: dw.W.dash, when: ONB });
  dw.dashArrow('Rb', { intro: K_LB, color: PAL.green, w: ARR.w * 1.1,
    headLen: ARR.headLen, headW: ARR.headW, dash: dw.W.dash * 1.6, when: ONB });
  dw.label('lRb', '', { cls: 'num', intro: K_LB, color: PAL.green, when: ONB });

  dw.arrow('RAb', { intro: K_RB, color: PAL.green, ...ARR, when: ONB });
  dw.arrow('RBb', { intro: K_RB, color: PAL.green, ...ARR, when: ONB });
  dw.label('lRAb', '', { cls: 'num', intro: K_RB, color: PAL.green, when: ONB });
  dw.label('lRBb', '', { cls: 'num', intro: K_RB, color: PAL.green, when: ONB });
  dw.dashLine('tangAb', { intro: K_RB, color: PAL.grey, dash: dw.W.dash, when: ONB });
  dw.dashLine('tangBb', { intro: K_RB, color: PAL.grey, dash: dw.W.dash, when: ONB });
  dw.disk('ptIb', { intro: K_RB, r: dw.W.disk * 0.8, when: ONB });
  dw.label('lIb', 'II', { cls: 'num', intro: K_RB, when: ONB });

  dw.seg('m3b', { intro: K_TB, w: dw.W.bar, color: BLUE, z: 0.06, when: ONB });
  dw.strokes('cvb', NCV, { intro: K_TB, w: dw.W.bar, color: BLUE, z: 0.06, when: ONB });
  dw.label('lm3b', '3', { cls: 'num', intro: K_TB, color: PAL.blue,
    when: (st) => st.caseB && st.lbl });
  dw.label('lm4b', '4', { cls: 'num', intro: K_TB, color: PAL.blue,
    when: (st) => st.caseB && st.lbl });

  dw.dashArrow('Rb_f', { intro: K_TB, color: PAL.green, w: ARR.w * 1.1,
    headLen: ARR.headLen, headW: ARR.headW, dash: dw.W.dash * 1.6, when: ONB });
  dw.label('lRb_f', 'R', { cls: 'num', intro: K_TB, color: PAL.green, when: ONB });
  dw.seg('ray3b', { intro: K_TB, w: dw.W.ray, color: BLUE, when: ONB });
  dw.seg('ray4b', { intro: K_TB, w: dw.W.ray, color: BLUE, when: ONB });
  dw.arrow('Ab_f', { intro: K_TB, color: PAL.green, ...NARR, when: ONB });
  dw.arrow('Bb_f', { intro: K_TB, color: PAL.green, ...NARR, when: ONB });
  dw.label('lAb_f', 'A', { cls: 'num', intro: K_TB, color: PAL.green, when: ONB });
  dw.label('lBb_f', 'B', { cls: 'num', intro: K_TB, color: PAL.green, when: ONB });
  dw.disk('poleb', { intro: K_TB, r: dw.W.disk * 0.8, when: ONB });
  dw.seg('dimHb', { intro: K_TB, w: dw.W.dim, color: PAL.grey, flash: false, when: ONB });
  dw.label('lHb', '', { cls: 'point', intro: K_TB, color: PAL.grey, when: ONB });
  dw.label('lcaseb', 'b)', { cls: 'title', intro: K_LB, flash: false, when: ONB });

  dw.link('tangAb', 'm3b', 'ray3b', 'Ab_f', 'RAb', 'lm3b');
  dw.link('tangBb', 'ray4b', 'Bb_f', 'RBb', 'lm4b');
  dw.link('Rb', 'Rb_f', 'lineRb', 'lRb', 'lRb_f');

  dw.instant('t_form', 't_force');
  dw.ghostable('Ra_f', 'Rb_f');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    const A = d.a, B = d.b;

    dw.setLabel('t_form', [11.5, -10.4]);
    dw.setLabel('t_force', [-19.0, -14.1]);

    // --- the three points
    for (const [n, p] of [['A', [0, 0]], ['B', [SPAN, 0]]]) {
      const q = fm(p);
      dw.setDisk(`sup${n}`, q);
      dw.setStrokes(`hat${n}`, V.hatch([q[0] - 1.4, q[1] - 0.42],
        [q[0] + 1.4, q[1] - 0.42], -1, 0.8, 5));
      dw.setLabel(`lsup${n}`, [q[0] + (n === 'A' ? -1.4 : 1.4), q[1] + 0.9]);
    }
    [0, XC, SPAN].forEach((x, i) =>
      dw.setDashLine(`vl${i}`, [fm([x, -4.6]), fm([x, HQ[1] + 0.5])]));
    dw.setDisk('ptC', fm(d.C));
    dw.setLabel('lC', V.add(fm(d.C), [1.2, -0.5]));
    dw.setSeg('dimF', fm([XC - 0.55, 0]), fm([XC - 0.55, d.hC]));
    dw.setLabel('ldimF', fm([XC - 1.9, d.hC / 2]));
    dw.setText('ldimF', `f = ${d.hC.toFixed(3)} m`);

    // a small helper: a load band with its arrows
    const band = (name, arrName, n, x0, x1, h) => {
      dw.setStrokes(name, [[fm([x0, h[0]]), fm([x1, h[0]])],
                           [fm([x0, h[1]]), fm([x1, h[1]])]]);
      dw.setArrows(arrName, Array.from({ length: n }, (_, i) => {
        const x = x0 + ((x1 - x0) * (i + 0.5)) / n;
        return [fm([x, h[1]]), fm([x, h[0]])];
      }));
    };
    // a reaction arrow arriving at the support along u
    const react = (nm, lab, at, u, mag, side) => {
      const tail = V.sub(at, V.mul(u, 4.4));
      dw.setArrow(nm, fm(tail), fm(at));
      dw.setLabel(lab, V.add(fm(tail), [side * 2.2, -0.9]));
      dw.setText(lab, `${mag.toFixed(2)} kN`);
    };

    // --- case a)
    band('banda', 'arra', 9, 0, XC, HB);
    dw.setLabel('lbanda', fm([XC / 2, HQ[0] + 0.35]));
    dw.setText('lbanda', `a)  g_d = ${d.gd.toFixed(1)} kN/m`);
    dw.setDashLine('lineRa', [fm([A.xbar, HB[0]]), fm([A.xbar, A.I[1] - 0.4])]);
    dw.setDashArrow('Ra', fm([A.xbar, HB[0] - 0.2]), fm([A.xbar, A.I[1] + 0.35]));
    dw.setLabel('lRa', fm([A.xbar - 2.6, (HB[0] + A.I[1]) / 2 + 0.7]));
    dw.setText('lRa', `R = ${A.W.toFixed(1)} kN`);
    react('RAa', 'lRAa', [0, 0], A.uA, A.NA, -1);
    react('RBa', 'lRBa', [SPAN, 0], A.uB, A.NB, 1);
    dw.setDashLine('tangAa', [fm([0, 0]), fm(A.I)]);
    dw.setDashLine('tangBa', [fm(A.I), fm([SPAN, 0])]);
    dw.setDisk('ptIa', fm(A.I));
    dw.setLabel('lIa', V.add(fm(A.I), [-1.2, -0.9]));
    dw.setStrokes('cva', d.curveA.slice(0, -1).map((p, i) => [fm(p), fm(d.curveA[i + 1])]));
    dw.setSeg('m2a', fm(d.C), fm([SPAN, 0]));
    dw.setLabel('lm1a', V.add(fm([XC * 0.42, A.y(XC * 0.42)]), [-0.4, -1.3]));
    dw.setLabel('lm2a', V.add(fm([XC + 1.6, A.y(XC + 1.6)]), [0.9, 0.9]));

    dw.setDashArrow('Ra_f', fa(A.P0), fa(A.P1));
    dw.setLabel('lRa_f', V.add(fa(V.mid(A.P0, A.P1)), [1.0, 0]));
    dw.setSeg('ray1a', fa(A.pole), fa(A.P0));
    dw.setSeg('ray2a', fa(A.P1), fa(A.pole));
    const oa = V.mul(V.unit(V.perp(V.sub(A.P0, A.pole))), -0.55);
    const ob = V.mul(V.unit(V.perp(V.sub(A.pole, A.P1))), -0.55);
    dw.setArrow('Aa_f', V.add(fa(A.pole), oa), V.add(fa(A.P0), oa));
    dw.setArrow('Ba_f', V.add(fa(A.P1), ob), V.add(fa(A.pole), ob));
    dw.setLabel('lAa_f', V.add(V.add(fa(V.mid(A.pole, A.P0)), oa), [-0.9, 0.3]));
    dw.setLabel('lBa_f', V.add(V.add(fa(V.mid(A.P1, A.pole)), ob), [-0.9, -0.3]));
    dw.setDisk('polea', fa(A.pole));
    dw.setSeg('dimHa', fa(A.pole), fa(A.div));
    dw.setLabel('lHa', V.add(fa(V.mid(A.pole, A.div)), [0, 0.8]));
    dw.setText('lHa', `H = ${A.H.toFixed(2)}`);
    dw.setLabel('lcasea', V.add(fa(A.pole), [-1.5, 1.1]));

    // --- case b)
    band('bandb', 'arrb', 5, XC, SPAN, HB);
    band('bandq', 'arrq', 5, XC, SPAN, HQ);
    dw.setLabel('lbandb', fm([SPAN + 2.7, (HB[0] + HB[1]) / 2]));
    dw.setText('lbandb', `b)  g_d = ${d.gd.toFixed(1)} kN/m`);
    dw.setLabel('lbandq', fm([SPAN + 2.7, (HQ[0] + HQ[1]) / 2]));
    dw.setText('lbandq', `b)  q_d = ${d.qd.toFixed(1)} kN/m`);
    dw.setDashLine('lineRb', [fm([B.xbar, HB[0]]), fm([B.xbar, B.I[1] - 0.4])]);
    dw.setDashArrow('Rb', fm([B.xbar, HB[0] - 0.2]), fm([B.xbar, B.I[1] + 0.35]));
    dw.setLabel('lRb', fm([B.xbar + 2.0, (HB[0] + B.I[1]) / 2]));
    dw.setText('lRb', `R = ${B.W.toFixed(1)} kN`);
    react('RAb', 'lRAb', [0, 0], B.uA, B.NA, -1);
    react('RBb', 'lRBb', [SPAN, 0], B.uB, B.NB, 1);
    dw.setDashLine('tangAb', [fm([0, 0]), fm(B.I)]);
    dw.setDashLine('tangBb', [fm(B.I), fm([SPAN, 0])]);
    dw.setDisk('ptIb', fm(B.I));
    dw.setLabel('lIb', V.add(fm(B.I), [1.3, 0.6]));
    dw.setSeg('m3b', fm([0, 0]), fm(d.C));
    dw.setStrokes('cvb', d.curveB.slice(0, -1).map((p, i) => [fm(p), fm(d.curveB[i + 1])]));
    dw.setLabel('lm3b', V.add(fm([XC * 0.55, B.y(XC * 0.55)]), [0.3, -1.2]));
    dw.setLabel('lm4b', V.add(fm([XC + 4.0, B.y(XC + 4.0)]), [1.0, -1.0]));

    dw.setDashArrow('Rb_f', fb(B.P0), fb(B.P1));
    dw.setLabel('lRb_f', V.add(fb(V.mid(B.P0, B.P1)), [1.0, 0]));
    dw.setSeg('ray3b', fb(B.pole), fb(B.P0));
    dw.setSeg('ray4b', fb(B.P1), fb(B.pole));
    const ob3 = V.mul(V.unit(V.perp(V.sub(B.P0, B.pole))), -0.55);
    const ob4 = V.mul(V.unit(V.perp(V.sub(B.pole, B.P1))), -0.55);
    dw.setArrow('Ab_f', V.add(fb(B.pole), ob3), V.add(fb(B.P0), ob3));
    dw.setArrow('Bb_f', V.add(fb(B.P1), ob4), V.add(fb(B.pole), ob4));
    dw.setLabel('lAb_f', V.add(V.add(fb(V.mid(B.pole, B.P0)), ob3), [-0.9, 0.3]));
    dw.setLabel('lBb_f', V.add(V.add(fb(V.mid(B.P1, B.pole)), ob4), [-0.9, -0.3]));
    dw.setDisk('poleb', fb(B.pole));
    dw.setSeg('dimHb', fb(B.pole), fb(B.div));
    dw.setLabel('lHb', V.add(fb(V.mid(B.pole, B.div)), [0, -0.95]));
    dw.setText('lHb', `H = ${B.H.toFixed(2)}`);
    dw.setLabel('lcaseb', V.add(fb(B.pole), [-1.5, 1.1]));

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  // drag C straight up and down its own vertical
  dw.enableDrag((x, y, tol) => {
    const p = fm([XC, s.hC]);
    return Math.hypot(x - p[0], y - p[1]) < tol * 2 ? 'C' : null;
  }, (key, x, y) => {
    s.hC = Math.max(1.5, Math.min(8.0, (y - FY) / MPU));
    refresh();
  });

  const g = panel.section('Given');
  panel.slider(g, s, 'hC', 'C — rise above the chord (m)', 1.5, 8.0, 0.05, refresh,
    (v) => `${(+v).toFixed(2)}`);
  panel.slider(g, s, 'gd', 'g_d (kN/m)', 2, 20, 0.5, refresh, (v) => `${(+v).toFixed(1)}`);
  panel.slider(g, s, 'qd', 'b) q_d (kN/m)', 0, 40, 0.5, refresh, (v) => `${(+v).toFixed(1)}`);
  const w = panel.section('What to look at');
  panel.toggle(w, s, 'caseA', 'show case a)', refresh);
  panel.toggle(w, s, 'caseB', 'show case b)', refresh);
  panel.toggle(w, s, 'lbl', 'show member numbers', refresh);

  refresh();
  return player;
}

export const meta = {
  title: 'EX X · 9 — the thrust line through three points, twice',
  subtitle: 'Structural Design I · “EX X — Additional Exercises”, p. 9, task 9 a) and b)',
  about: 'Two pinned supports 15 m apart and level, a point C 10 m along and 4.394 m up, and a thrust line that has to pass through all three. Two pins give four unknowns against three equations; C is the fourth condition, and it turns the problem into two moments — one about B for the vertical reactions, one about C for the horizontal thrust. The thrust line that comes out is nothing more exotic than the simple-beam bending moment divided by H. Both load cases are drawn here at once, which is only possible because their loaded lengths do not overlap: a) puts 8 kN/m on the LEFT 10 m, b) puts 8 + 16 kN/m on the RIGHT 5 m. Same three points, and the maximum force is 1.79 times bigger in b) and sits at the other support. Drag C: as it drops, both thrusts blow up together.',
  result: (d) => [
    `a) ${d.gd.toFixed(1)} kN/m on the LEFT 10 m · A_v ${d.a.Av.toFixed(2)} B_v ${d.a.Bv.toFixed(2)} · H = ${d.a.H.toFixed(2)} kN`,
    `a) A = ${d.a.NA.toFixed(2)}, B = ${d.a.NB.toFixed(2)} kN · crown ${d.a.yCrown.toFixed(3)} m · max ${d.a.Nmax.toFixed(2)} kN at ${d.a.where}`,
    `b) ${d.gd.toFixed(1)}+${d.qd.toFixed(1)} kN/m on the RIGHT 5 m · A_v ${d.b.Av.toFixed(2)} B_v ${d.b.Bv.toFixed(2)} · H = ${d.b.H.toFixed(2)} kN`,
    `b) A = ${d.b.NA.toFixed(2)}, B = ${d.b.NB.toFixed(2)} kN · crown ${d.b.yCrown.toFixed(3)} m · max ${d.b.Nmax.toFixed(2)} at ${d.b.where}, ${d.ratio.toFixed(2)}× a)`,
    `all compression · the key prints no numbers, so these ARE the answer`],
  frame: [[-26, -22], [30, 16]],
};
