/**
 * EX X · Task 6 — Designing a suspended roof
 * Structural Design I, HS 22, "Additional Exercises", sheet page 6.
 *
 * TEXT (verbatim, English sheet).
 *   a) "For the situation below, determine the shape of the roof. The roof is
 *      fixed between the supports A and B. It is a hanging construction. The
 *      maximum cable force is N_d,max = 3000 kN. Draw the corresponding form
 *      and force diagrams. Draw the direction and determine the magnitude of
 *      the reaction force. Indicate tension forces with red and compression
 *      forces with blue."
 *   b) "Calculate the diameter for the cable made of steel S235 due to the
 *      maximum cable force."
 *
 * GIVENS. g_d = 33.75 kN/m and q_d = 3.75 kN/m — both already DESIGN values
 * (the subscript d; the German sheet prints the same two numbers), so
 * s_d = 37.50 kN/m and there is no partial factor left to apply. The maximum
 * cable force N_d,max = 3000 kN is GIVEN: this is a form-finding task, the sag
 * is the unknown. Steel S235, f_tk = 235 N/mm², gamma_M = 1.05.
 * Form diagram 1:500, force diagram 1 cm ≙ 250 kN.
 *
 * GEOMETRY, digitised from page 6 with
 *   web/tools/sheetvec.py .../task-en.pdf 6 --scale 500 --min 0.2 --cluster
 * Origin = support A; x to the right, y up. Both supports are at the same
 * level, on the inner faces of two buildings drawn as grey blocks.
 *
 *   A (left support)   x =  0.000   y = 0.000   (dump x = 49.907)
 *   B (right support)  x = 64.978   y = 0.000   (dump x = 114.885)
 *   ground                           y = -15.659
 *   each block         11.267 m wide, 15.659 m tall
 *   both load bars run exactly A -> B, so the UDL covers the span and no more
 *
 * The span digitises as 64.978 m = 65.00 m to 0.03 %, which validates the
 * stated 1:500; the view uses L = 65.00 m and lets the reader move it.
 *
 * DERIVATION (a). A UDL over the horizontal projection makes the cable a
 * parabola, H is constant along it, and with level supports the largest
 * tension is at the two ends. So the given N_max fixes everything:
 *
 *   R  = s_d L        = 37.50 x 65.00                 = 2437.50 kN
 *   V  = R/2                                          = 1218.75 kN
 *   H  = sqrt(N_max^2 - V^2) = sqrt(3000^2 - 1218.75^2) = 2741.286 kN
 *   f  = s_d L^2/(8H) = 37.50 x 65^2/(8 x 2741.286)   =    7.2246 m   (f/L = 1/9.00)
 *   tan(theta) = 4f/L = V/H = 0.44460                 -> theta = 23.9695 deg
 *   A = B = sqrt(H^2 + V^2)                           = 3000.00 kN
 *
 * A = B = N_max is NOT a rounding coincidence, it is an identity. Nothing but
 * the cable meets the support, so the reaction there IS the cable force at
 * that point, collinear with the end tangent — and for a parabola under a UDL
 * between level supports the maximum tension is at the supports. The key's
 * "3'000 / 3'000" is therefore exact to every digit, and it is exact because
 * the sag was solved out of the same equation.
 *
 * Both reactions point up and OUTWARD along the end tangents (156.03 deg at A,
 * 23.97 deg at B), each with 2741.29 kN of horizontal pull on the anchorage.
 * Every member here is a cable: everything is TENSION, and the "compression =
 * blue" half of the instruction has nothing to colour.
 *
 * DERIVATION (b).
 *   f_td  = 235/1.05                        = 223.8095 N/mm^2
 *   A_req = 3'000'000 / 223.8095            = 13'404.26 mm^2
 *   D     = sqrt(4A/pi)                     =    130.64 mm  ->  131 mm
 *
 * WHAT THE OFFICIAL KEY SAYS, AND WHERE WE PART COMPANY.
 *   - table A = 3'000 kN, B = 3'000 kN — agrees exactly (see above).
 *   - D = 131 mm — agrees; ours is 130.64 mm, the key rounds to whole mm.
 *   - A_req: the key prints 13'404.8 mm^2. That comes from first rounding f_td
 *     to 223.8 N/mm^2 and then dividing (3e6/223.8 = 13'404.83). Carrying
 *     235/1.05 = 223.8095 through gives 13'404.26 mm^2. A 0.004 % difference,
 *     invisible in D. Both are shown in the view.
 *   - the key prints no number for the sag. Its drawn cable — recovered from
 *     the solution PDF's own vector artwork, a 64-vertex red polyline of span
 *     368.38 pt and midspan ordinate 40.728 pt — measures f = 7.184 m against
 *     the derived 7.2246 m (0.6 %).
 *   - the key's FORCE DIAGRAM is drawn about 2.6 % oversize: at its stated
 *     1 cm ≙ 250 kN the load line measures 2499 kN (should be 2437.5) and the
 *     end rays 3089 kN (should be 3000). Its shape is right — end-ray
 *     inclination 23.86 deg against the derived 23.97 deg — so this is
 *     drafting slack, not a different answer.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

// ---- the sheet's givens ----------------------------------------------------
const GD = 33.75;            // kN/m, permanent, already a design value
const BW = 11.267;           // m, width of each building block (digitised)
const BH = 15.659;           // m, support level above ground (digitised)
const FTK = 235, GAM_M = 1.05;

// ---- layout ----------------------------------------------------------------
const MPU = 0.25;            // drawing units per metre, form diagram
const CX = 17.0, CY = 10.0;  // midspan x and support level y of the form diagram
const SFD = 320;             // kN per drawing unit, force diagram
const FX = 10.0, FY = -2.2;  // top of the load line in the force diagram
const NSEG = 40;             // polyline segments of the drawn parabola

const DEFAULTS = { Nmax: 3000, qd: 3.75, L: 65.0, lbl: true, _k: 99 };

function compute(s) {
  const L = s.L;
  const w = GD + s.qd;                       // kN/m, total design line load
  const R = w * L;
  const Vr = R / 2;                          // vertical component at each support
  const ok = s.Nmax > Vr + 1e-9;             // below this there is no equilibrium
  const H = ok ? Math.sqrt(s.Nmax * s.Nmax - Vr * Vr) : 0;
  const f = ok ? (w * L * L) / (8 * H) : 0;
  const th = ok ? (Math.atan2(Vr, H) * 180) / Math.PI : 90;
  const Nsup = Math.hypot(H, Vr);            // = s.Nmax, kept as an explicit check

  // developed length of the parabola, integrated numerically
  let slen = 0;
  if (ok) {
    const a = (4 * f) / (L * L);
    const n = 400;
    for (let i = 0; i < n; i++) {
      const x0 = (L * i) / n, x1 = (L * (i + 1)) / n;
      const y0 = -a * x0 * (L - x0), y1 = -a * x1 * (L - x1);
      slen += Math.hypot(x1 - x0, y1 - y0);
    }
  }

  // b) dimensioning, S235
  const ftd = FTK / GAM_M;                   // 223.8095 N/mm²
  const Areq = (s.Nmax * 1000) / ftd;        // mm²
  const D = Math.sqrt((4 * Areq) / Math.PI);
  const AreqKey = (s.Nmax * 1000) / 223.8;   // what the key's rounded f_td gives
  const Dkey = Math.sqrt((4 * AreqKey) / Math.PI);

  // the sheet's own numbers, so the view can say when the reader has left them
  const atSheet = Math.abs(s.Nmax - 3000) < 1 && Math.abs(s.qd - 3.75) < 0.01
                  && Math.abs(L - 65) < 0.01;

  return { L, w, R, Vr, H, f, th, Nsup, slen, ok, ftd, Areq, D, AreqKey, Dkey,
           atSheet, Nmax: s.Nmax, qd: s.qd, fL: ok ? L / f : 0 };
}

export const meta = {
  title: 'EX X · 6 — a suspended roof, shaped by its own maximum force',
  subtitle: 'Structural Design I · HS 22, sheet EX X “Additional Exercises”, task 6 a)–b)',
  about: 'A roof hung between two buildings 65 metres apart, carrying 37.5 kN of design load per metre. Nothing about its shape is given — instead the sheet gives the largest force the cable is allowed to carry, 3000 kN, and that single number decides how deep the roof sags. One Pythagoras turns it into the horizontal thrust, the thrust turns into the sag, and the sag draws the parabola. The reactions then need no work at all: the cable is the only thing that touches the supports, so each reaction IS the cable force there, and for a parabola under a uniform load that maximum sits exactly at the supports. A = B = 3000 kN, identically — the key’s “3’000 / 3’000” is not a rounded number. Then b) turns 3000 kN into 131 mm of steel. Drag N_d,max and watch the sag and the diameter move in opposite directions.',
  result: (d) => [
    `a) s_d = ${GD.toFixed(2)} + ${d.qd.toFixed(2)} = ${d.w.toFixed(2)} kN/m over ${d.L.toFixed(2)} m → R = ${d.R.toFixed(2)} kN, V = R/2 = ${d.Vr.toFixed(2)} kN at each support`,
    d.ok
      ? `a) H = √(N_max² − V²) = ${d.H.toFixed(2)} kN → sag f = s_d L²/(8H) = ${d.f.toFixed(4)} m (f/L = 1/${d.fL.toFixed(2)}), cable ${d.slen.toFixed(2)} m long`
      : `a) N_max = ${d.Nmax.toFixed(0)} kN is not more than V = ${d.Vr.toFixed(2)} kN — no cable can carry this load. There is no answer to draw`,
    d.ok
      ? `a) A = B = √(H² + V²) = ${d.Nsup.toFixed(2)} kN = N_d,max exactly, at ${d.th.toFixed(2)}° to the horizontal, pointing up and outward. All TENSION — nothing here is in compression`
      : 'a) —',
    `b) f_td = 235/1.05 = ${d.ftd.toFixed(4)} N/mm² → A_req = ${d.Areq.toFixed(2)} mm² → D = √(4A/π) = ${d.D.toFixed(2)} mm ≈ ${Math.ceil(d.D).toFixed(0)} mm`,
    Math.abs(d.Nmax - 3000) < 1
      ? `b) the key prints A_req = ${(3000000 / 223.8).toFixed(1)} mm² and D = 131 mm — it rounded f_td to 223.8 first; carrying 235/1.05 gives ${(3000000 / (235 / 1.05)).toFixed(2)} mm², and D is the same to 0.01 mm`
      : `b) at the sheet's own N_d,max = 3000 kN this gives A_req = ${(3000000 / (235 / 1.05)).toFixed(2)} mm² and D = 130.64 mm; the key prints ${(3000000 / 223.8).toFixed(1)} mm² and 131 mm`],
  frame: [[-24, -20], [32, 20]],
};

const STEPS = [
  { t: 'The exercise',
    d: 'a roof hung between two buildings. The load is given, the shape is not — and what takes its place is a limit on the cable force. Everything on this page comes out of that one number',
    detail: () => ['a) find the shape, the force diagram, and the direction and size of the reactions',
                   'b) size the cable: steel S235, circular section',
                   'form diagram 1:500 · force diagram 1 cm ≙ 250 kN'] },
  { t: 'The situation',
    d: 'span and load, digitised from the sheet. Two design line loads sit on top of each other — permanent below, variable above. Both carry the subscript d, so they are already factored: there is nothing left to multiply',
    detail: (d) => [`span A–B = ${d.L.toFixed(3)} m (digitises 64.978 m at 1:500, i.e. 65.00 m to 0.03 %)`,
                    `g_d = ${GD.toFixed(2)} kN/m · q_d = ${d.qd.toFixed(2)} kN/m → s_d = ${d.w.toFixed(2)} kN/m`,
                    `supports level, ${BH.toFixed(3)} m above ground on ${BW.toFixed(3)} m wide blocks`],
    take: 'the load bars stop exactly at A and B — the UDL covers the span and nothing beyond it' },
  { t: 'The resultant, and its two halves',
    d: 'the whole load as one force at midspan. It is symmetric, so each support takes half of it vertically — and that half is fixed before anything about the shape is known',
    detail: (d) => [`R = s_d × L = ${d.w.toFixed(2)} × ${d.L.toFixed(2)} = ${d.R.toFixed(2)} kN`,
                    `V = R/2 = ${d.Vr.toFixed(2)} kN, vertical, at each support`,
                    'the horizontal component is still unknown — it is what the shape decides'],
    take: 'V is the one thing the sag cannot change' },
  { t: 'The given force fixes the thrust',
    d: 'here the exercise turns around. N_d,max is not something to find, it is the given. The end of the cable carries V vertically and H horizontally, and the two combine to exactly N_max — so one Pythagoras, run backwards, hands over the thrust',
    detail: (d) => [`N_d,max = ${d.Nmax.toFixed(0)} kN (given)`,
                    d.ok ? `H = √(N_max² − V²) = √(${d.Nmax.toFixed(0)}² − ${d.Vr.toFixed(2)}²) = ${d.H.toFixed(3)} kN`
                         : `N_max ≤ V = ${d.Vr.toFixed(2)} kN — impossible: the cable cannot even lift its own share of the load`,
                    'for a parabola under a UDL the largest tension is at the supports, which is why the constraint could be applied there'],
    take: 'a bigger allowable force buys a flatter roof, and vice versa — the slider shows it' },
  { t: 'The thrust draws the roof',
    d: 'the sag is the load’s bending moment at midspan divided by the thrust, which for a UDL is the familiar s L²/8 over H. That is the answer to a): the shape',
    detail: (d) => [d.ok ? `f = s_d L²/(8H) = ${d.w.toFixed(2)} × ${d.L.toFixed(2)}²/(8 × ${d.H.toFixed(2)}) = ${d.f.toFixed(4)} m`
                         : 'no shape exists for this force',
                    d.ok ? `f/L = 1/${d.fL.toFixed(2)} · developed cable length ${d.slen.toFixed(3)} m against a ${d.L.toFixed(2)} m chord` : '',
                    'the two end tangents 1 and 2 meet 2f below midspan — that is node I, and it is the pole construction in disguise'],
    take: 'the key prints no sag — its drawn cable measures 7.184 m against the 7.2246 m derived here' },
  { t: 'The reactions come for free',
    d: 'nothing but the cable arrives at A and at B. So each reaction is the cable force at that point — same line, same size — and that force is the maximum, because a hanging parabola is steepest at its ends',
    detail: (d) => [d.ok ? `A = B = √(H² + V²) = √(${d.H.toFixed(2)}² + ${d.Vr.toFixed(2)}²) = ${d.Nsup.toFixed(2)} kN` : '—',
                    d.ok ? `direction ${d.th.toFixed(2)}° above the horizontal, up and OUTWARD — ${d.H.toFixed(1)} kN of horizontal pull on each anchorage` : '',
                    'both are TENSION (red). There is no compression anywhere in this structure'],
    take: 'A = B = N_d,max is an identity, not a rounded coincidence — the key’s 3’000 / 3’000 is exact' },
  { t: 'The force diagram',
    d: 'the load line is R, drawn downward at 1 cm ≙ 250 kN. Its midpoint i splits R into the two support shares. The pole sits H to the side of it, and the two rays to the pole are the cable ends — the green reactions lie straight on top of them, reversed',
    detail: (d) => [`load line R = ${d.R.toFixed(2)} kN · division point i at V = ${d.Vr.toFixed(2)} kN`,
                    d.ok ? `pole distance H = ${d.H.toFixed(2)} kN · rays 1 and 2 each ${d.Nsup.toFixed(2)} kN` : '—',
                    'the key draws this diagram about 2.6 % oversize (its load line reads 2499 kN, its rays 3089 kN) — the shape is right, the scaling slipped'],
    take: 'hover a ray: its cable end, its reaction and it are the same force drawn twice' },
  { t: 'b) The diameter',
    d: 'the last step is arithmetic. Design strength is the yield strength over the resistance factor; area is force over strength; diameter is area turned back into a circle',
    detail: (d) => [`f_td = f_tk/γ_M = 235/1.05 = ${d.ftd.toFixed(4)} N/mm²`,
                    `A_req = N_d,max/f_td = ${(d.Nmax * 1000).toFixed(0)}/${d.ftd.toFixed(4)} = ${d.Areq.toFixed(2)} mm²`,
                    `D = √(4A/π) = ${d.D.toFixed(3)} mm → ${Math.ceil(d.D).toFixed(0)} mm`],
    take: 'the key prints 13’404.8 mm² because it rounded f_td to 223.8 first; the exact 223.8095 gives 13’404.26. D is 130.64 mm either way, and rounds to the key’s 131 mm' },
];

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const OFF = dw.W.off;

  // ---------------------------------------------------------------- form ----
  dw.label('t_form', 'form diagram 1:500', { cls: 'title', intro: 1, flash: false });
  dw.label('t_force', 'force diagram  1 cm ≙ 250 kN', { cls: 'title', intro: 6, flash: false });
  dw.label('t_dim', 'b)  dimensioning the cable — steel S235',
    { cls: 'title', intro: 7, flash: false });

  dw.poly('blkL', 4, { intro: 1, color: PAL.grey, opacity: 0.45 });
  dw.poly('blkR', 4, { intro: 1, color: PAL.grey, opacity: 0.45 });
  dw.seg('ground', { intro: 1, w: dw.W.bar, color: PAL.black });
  dw.dashLine('axL', { intro: 1, color: PAL.grey, dash: dw.W.dash });
  dw.dashLine('axR', { intro: 1, color: PAL.grey, dash: dw.W.dash });
  dw.disk('supA', { intro: 1, r: dw.W.disk });
  dw.disk('supB', { intro: 1, r: dw.W.disk });
  dw.label('lA', 'A', { cls: 'point', intro: 1, flash: false });
  dw.label('lB', 'B', { cls: 'point', intro: 1, flash: false });

  dw.seg('barG', { intro: 1, w: dw.W.thin, color: PAL.green });
  dw.arrows('arrG', 27, { intro: 1, w: dw.W.thin, color: PAL.green,
    headLen: NARR.headLen * 0.7, headW: NARR.headW * 0.7 });
  dw.label('lG', '', { cls: 'num', intro: 1, color: PAL.green });
  dw.seg('barQ', { intro: 1, w: dw.W.thin, color: PAL.green });
  dw.arrows('arrQ', 27, { intro: 1, w: dw.W.thin, color: PAL.green,
    headLen: NARR.headLen * 0.7, headW: NARR.headW * 0.7 });
  dw.label('lQ', '', { cls: 'num', intro: 1, color: PAL.green });

  dw.dashArrow('Rarr', { intro: 2, color: PAL.green, ...ARR, dash: 0.55 });
  dw.label('lR', '', { cls: 'num', intro: 2, color: PAL.green });

  dw.dashLine('chord', { intro: 4, color: PAL.grey, dash: dw.W.dash });
  dw.strokes('cable', NSEG, { intro: 4, w: dw.W.str,
    color: { pending: PAL.black, final: () => PAL.red } });
  dw.seg('tan1', { intro: 4, w: dw.W.ray, color: { pending: PAL.black, final: () => PAL.red } });
  dw.seg('tan2', { intro: 4, w: dw.W.ray, color: { pending: PAL.black, final: () => PAL.red } });
  dw.disk('nodeI', { intro: 4, r: dw.W.disk * 0.8 });
  dw.label('lI', 'I', { cls: 'point', intro: 4, flash: false, color: PAL.grey });
  dw.label('l1', '1', { cls: 'num', intro: 4, color: PAL.red, when: (st) => st.lbl });
  dw.label('l2', '2', { cls: 'num', intro: 4, color: PAL.red, when: (st) => st.lbl });
  dw.seg('dimF', { intro: 4, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.seg('dimF2', { intro: 4, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lF', '', { cls: 'num', intro: 4, flash: false, color: PAL.grey });
  dw.label('lF2', '', { cls: 'num', intro: 4, flash: false, color: PAL.grey });

  dw.arrow('rA', { intro: 5, color: PAL.green, ...ARR });
  dw.arrow('rB', { intro: 5, color: PAL.green, ...ARR });
  dw.label('lrA', '', { cls: 'num', intro: 5, color: PAL.green });
  dw.label('lrB', '', { cls: 'num', intro: 5, color: PAL.green });

  // --------------------------------------------------------------- force ----
  dw.arrow('loadline', { intro: 6, color: PAL.green, ...NARR });
  dw.label('lLL', '', { cls: 'num', intro: 6, color: PAL.green });
  dw.disk('ptI', { intro: 6, r: dw.W.disk * 0.8 });
  dw.label('lptI', 'i', { cls: 'num', intro: 6, flash: false, color: PAL.grey });
  dw.disk('ptO', { intro: 6, r: dw.W.disk * 0.8 });
  dw.label('lptO', 'o', { cls: 'num', intro: 6, flash: false, color: PAL.grey });
  dw.dashLine('dimH', { intro: 6, color: PAL.grey, dash: dw.W.dash });
  dw.label('lH', '', { cls: 'num', intro: 6, flash: false, color: PAL.grey });
  dw.seg('ray1', { intro: 6, w: dw.W.ray, color: PAL.red });
  dw.seg('ray2', { intro: 6, w: dw.W.ray, color: PAL.red });
  dw.label('lr1', '1', { cls: 'num', intro: 6, color: PAL.red, when: (st) => st.lbl });
  dw.label('lr2', '2', { cls: 'num', intro: 6, color: PAL.red, when: (st) => st.lbl });
  dw.arrow('fA', { intro: 6, color: PAL.green, ...NARR });
  dw.arrow('fB', { intro: 6, color: PAL.green, ...NARR });
  dw.label('lfA', 'A', { cls: 'num', intro: 6, color: PAL.green });
  dw.label('lfB', 'B', { cls: 'num', intro: 6, color: PAL.green });

  // counterparts: the cable end, its ray, and the reaction are one force
  dw.link('tan1', 'ray1', 'rA', 'fA', 'l1', 'lr1');
  dw.link('tan2', 'ray2', 'rB', 'fB', 'l2', 'lr2');

  // ------------------------------------------------------------------ b) ----
  for (let i = 0; i < 5; i++) {
    dw.label(`b${i}`, '', { cls: 'num', intro: 7, flash: false, color: PAL.black });
  }

  dw.instant('t_form', 't_force', 't_dim');
  // pale teal preview of the whole answer, shown at step 1
  dw.ghostable('cable', 'tan1', 'tan2', 'rA', 'rB',
               'loadline', 'ray1', 'ray2', 'fA', 'fB');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    const L = d.L, half = (L * MPU) / 2;
    const A = [CX - half, CY], B = [CX + half, CY];
    const gy = CY - BH * MPU;                       // ground level
    const bw = BW * MPU;
    const fu = d.f * MPU;                           // sag in drawing units

    dw.setLabel('t_form', [CX, gy - 1.5]);
    dw.setLabel('t_force', [FX - 0.4, FY + 1.1]);
    dw.setLabel('t_dim', [21.0, -13.4]);

    // --- buildings, ground, supports
    dw.setPoly('blkL', [[A[0] - bw, gy], [A[0], gy], [A[0], CY], [A[0] - bw, CY]]);
    dw.setPoly('blkR', [[B[0], gy], [B[0] + bw, gy], [B[0] + bw, CY], [B[0], CY]]);
    dw.setSeg('ground', [A[0] - bw - 1.4, gy], [B[0] + bw + 1.4, gy]);
    dw.setDashLine('axL', [[A[0], gy - 0.6], [A[0], CY + 5.3]]);
    dw.setDashLine('axR', [[B[0], gy - 0.6], [B[0], CY + 5.3]]);
    dw.setDisk('supA', A); dw.setDisk('supB', B);
    dw.setLabel('lA', [A[0] + 0.55, CY + 0.55]);
    dw.setLabel('lB', [B[0] - 0.55, CY + 0.55]);

    // --- the two load bars
    const yG = CY + 2.00, yQ = CY + 4.40;
    dw.setSeg('barG', [A[0], yG], [B[0], yG]);
    dw.setSeg('barQ', [A[0], yQ], [B[0], yQ]);
    const combs = (yTop) => Array.from({ length: 27 }, (_, i) => {
      const x = A[0] + ((B[0] - A[0]) * i) / 26;
      return [[x, yTop], [x, yTop - 0.72]];
    });
    dw.setArrows('arrG', combs(yG));
    dw.setArrows('arrQ', combs(yQ));
    dw.setLabel('lG', [B[0] - 3.4, yG + 0.62]);
    dw.setText('lG', `g_d = ${GD.toFixed(2)} kN/m`);
    dw.setLabel('lQ', [B[0] - 3.4, yQ + 0.62]);
    dw.setText('lQ', `q_d = ${d.qd.toFixed(2)} kN/m`);

    // --- the resultant
    dw.setDashArrow('Rarr', [CX, yQ + 1.30], [CX, CY + 0.18]);
    dw.setLabel('lR', [CX - 3.2, yQ + 1.05]);
    dw.setText('lR', `R = ${d.R.toFixed(1)} kN`);

    // --- the roof itself
    dw.setDashLine('chord', [A, B]);
    const pts = [];
    for (let i = 0; i <= NSEG; i++) {
      const x = (L * i) / NSEG;
      const y = -((4 * d.f) / (L * L)) * x * (L - x);
      pts.push([A[0] + x * MPU, CY + y * MPU]);
    }
    dw.setStrokes('cable', pts.slice(0, NSEG).map((p, i) => [p, pts[i + 1]]));

    // node I: where the two end tangents meet, 2f below midspan
    const I = [CX, CY - 2 * fu];
    dw.setSeg('tan1', A, I);
    dw.setSeg('tan2', I, B);
    dw.setDisk('nodeI', I);
    dw.setLabel('lI', [CX - 0.90, CY - 2 * fu + 0.55]);
    dw.setLabel('l1', V.add(V.mid(A, I), [-0.3, -0.75]));
    dw.setLabel('l2', V.add(V.mid(I, B), [0.3, -0.75]));

    // the sag, dimensioned twice: chord -> cable, cable -> node I
    const dx = CX + 1.5;
    dw.setSeg('dimF', [dx, CY], [dx, CY - fu]);
    dw.setSeg('dimF2', [dx, CY - fu], [dx, CY - 2 * fu]);
    dw.setLabel('lF', [dx + 1.9, CY - fu / 2]);
    dw.setText('lF', `f = ${d.f.toFixed(3)} m`);
    dw.setLabel('lF2', [dx + 1.0, CY - 1.5 * fu]);
    dw.setText('lF2', 'f');

    // --- reactions, drawn at a fixed length in the form diagram
    const uA = d.ok ? V.unit([-d.H, d.Vr]) : [-1, 0];
    const uB = d.ok ? V.unit([d.H, d.Vr]) : [1, 0];
    dw.setArrow('rA', V.add(A, V.mul(uA, 4.2)), A);
    dw.setArrow('rB', V.add(B, V.mul(uB, 4.2)), B);
    dw.setLabel('lrA', V.add(A, V.add(V.mul(uA, 4.2), [0, 0.85])));
    dw.setText('lrA', `A = ${d.Nsup.toFixed(0)} kN`);
    dw.setLabel('lrB', V.add(B, V.add(V.mul(uB, 4.2), [0, 0.85])));
    dw.setText('lrB', `B = ${d.Nsup.toFixed(0)} kN`);

    // --- the force diagram
    const P0 = [FX, FY];                              // top of the load line
    const P1 = [FX, FY - d.R / SFD];                  // bottom
    const Pi = [FX, FY - d.Vr / SFD];                 // division point
    const O = [FX + d.H / SFD, Pi[1]];                // the pole
    dw.setArrow('loadline', P0, P1);
    dw.setLabel('lLL', [FX - 4.4, (P0[1] + P1[1]) / 2]);
    dw.setText('lLL', `R = ${d.R.toFixed(1)} kN`);
    dw.setDisk('ptI', Pi);
    dw.setLabel('lptI', [FX - 0.75, Pi[1] + 0.1]);
    dw.setDisk('ptO', O);
    dw.setLabel('lptO', V.add(O, [0.85, 0.55]));
    dw.setDashLine('dimH', [Pi, O]);
    dw.setLabel('lH', [(Pi[0] + O[0]) / 2 - 1.0, Pi[1] + 0.75]);
    dw.setText('lH', `H = ${d.H.toFixed(1)} kN`);
    dw.setSeg('ray1', P0, O);
    dw.setSeg('ray2', O, P1);
    dw.setLabel('lr1', V.add(V.mid(P0, O), [0.1, 0.75]));
    dw.setLabel('lr2', V.add(V.mid(O, P1), [0.1, -0.85]));
    // the reactions, laid alongside their rays and pointing the other way
    const n1 = V.mul(V.perp(V.unit(V.sub(O, P0))), OFF * 2.2);
    const n2 = V.mul(V.perp(V.unit(V.sub(P1, O))), OFF * 2.2);
    dw.setArrow('fA', V.sub(O, n1), V.sub(P0, n1));
    dw.setArrow('fB', V.add(P1, n2), V.add(O, n2));
    dw.setLabel('lfA', V.add(V.mid(P0, O), [-1.1, 1.65]));
    dw.setText('lfA', `A = ${d.Nsup.toFixed(0)}`);
    dw.setLabel('lfB', V.add(V.mid(O, P1), [-1.9, -1.55]));
    dw.setText('lfB', `B = ${d.Nsup.toFixed(0)}`);

    // --- b)
    const bl = [
      `N_d,max = ${(d.Nmax * 1000).toFixed(0)} N`,
      `f_td = 235/1.05 = ${d.ftd.toFixed(2)} N/mm²`,
      `A_req = N/f_td = ${d.Areq.toFixed(2)} mm²`,
      `D = √(4A/π) = ${d.D.toFixed(2)} → ${Math.ceil(d.D).toFixed(0)} mm`,
      `key: f_td≈223.8 → ${d.AreqKey.toFixed(1)} mm²`,
    ];
    bl.forEach((t, i) => {
      dw.setLabel(`b${i}`, [21.0, -14.9 - i * 1.15]);
      dw.setText(`b${i}`, t);
    });

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const g = panel.section('Given');
  panel.slider(g, s, 'Nmax', 'N_d,max — the largest cable force (kN)', 2000, 6000, 25, refresh,
    (v) => `${v.toFixed(0)} kN${Math.abs(v - 3000) < 1 ? '  ← the sheet’s value' : ''}`);
  panel.slider(g, s, 'qd', 'q_d — the variable load (kN/m)', 0, 12, 0.25, refresh,
    (v) => `${v.toFixed(2)} kN/m${Math.abs(v - 3.75) < 0.01 ? '  ← the sheet’s value' : ''}`);
  panel.slider(g, s, 'L', 'span A–B (m)', 50, 75, 0.5, refresh,
    (v) => `${v.toFixed(2)} m${Math.abs(v - 65) < 0.01 ? '  ← the sheet’s 64.978 m' : ''}`);
  const w = panel.section('What to look at');
  panel.toggle(w, s, 'lbl', 'show member numbers', refresh);

  refresh();
  return player;
}
