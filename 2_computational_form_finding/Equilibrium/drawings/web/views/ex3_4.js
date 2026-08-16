/**
 * EX 3 · Creative — Asymmetrische Dachform einer Hängekonstruktion
 * Structural Design I, HS 22 (sheet UE 3 "Seiltragwerke", page 5).
 *
 * "Die Skulptur eines bekannten Künstlers soll im Pavillon ausgestellt werden.
 * Die Höhe des Daches vom ersten Entwurf ist aber nicht ausreichend."
 *   a) define a new height for the RIGHT wall slab, design the new roof form,
 *      draw both plans, and give the magnitude and direction of the reactions
 *   b) the roof hangs from a steel cable in S235 — find the diameter needed
 *      for the governing force
 *   c) sketch a way of bracing the roof in the Lageplan
 *
 * The load is task 3's: s_d = 37.5 kN/m over l = 65 m, so R = 2437.5 kN.
 *
 * THE GEOMETRY DRAWN HERE IS THE KEY'S OWN, measured off its Creative plate
 * (page 5, form diagram 1:500):
 *   - left support  74.97 pt = 13.23 m above the ground — unchanged from task 3
 *   - right support 153.4 pt = 27.06 m, so the right wall is raised by 13.83 m
 *   - the parabola hangs 39.4 pt = 6.95 m below the tilted chord CS/SL
 * Those are this view's defaults. With the sheet's OWN R = 2437.5 kN they give
 *     H  = s_d·l²/(8f)      = 37.5·65²/(8·6.95) = 2850 kN
 *     A_v = R/2 − H·Δ/l     = 1218.75 − 606.3   =  612 kN
 *     B_v = R/2 + H·Δ/l     = 1218.75 + 606.3   = 1825 kN
 *     N1 = A = √(H² + A_v²) = 2915 kN,  N2 = B = √(H² + B_v²) = 3384 kN
 * and every one of those is recomputed in compute() from the two sliders, so
 * moving either slider moves the answer.
 *
 * CORRECTION 1 — the same 2.56 % load-line inflation as task 3, and this view
 * rejects it exactly as ex3_3 does. The key prints N1 = 3000 kN and
 * N2 = N_max = 3500 kN. Those are its own plate read correctly against a load
 * line that was drawn too long: having computed R = 2437.5 kN in task 3 c), it
 * lays R off on the Kräfteplan as 141.6 pt = a round 5.00 cm, which at the
 * plate's own stated 1 cm ≙ 500 kN is 2500 kN. The correct length is 4.875 cm.
 * 2500/2437.5 = 1.0256, and 2915·1.0256 = 2989, 3384·1.0256 = 3470 — i.e. the
 * printed 3000 and 3500 to within a pencil width. So the printed pair is
 * 2.56 % high, from the identical slip that makes p. 3's 5915 / 11 830 kN
 * high; ex3_3 prints the corrected 5788 / 11 576 there, and this view prints
 * the corrected 2915 / 3384 here. Consequently b) moves too: the key's
 * 3'500'000 N / 223.8 N/mm² = 15'638.96 mm² → Ø 142 mm becomes
 * 3'384'000 N / 223.8 = 15'119 mm² → Ø 139 mm.
 *
 * CORRECTION 2 — the key also contradicts itself, and this catch is separate
 * from the scaling slip and still stands. Its answer table reads A = 3000 kN,
 * B = 3500 kN, but the sentence three lines below reads "Reaction forces
 * A = 3500 kN, B = 3500 kN". The table is right: a cable can only pull along
 * itself, so the reaction at a support IS the force in the segment reaching it
 * — A = N1, B = N2. Take the key's own printed pair at face value and solve it
 * back (segments share one thrust H, verticals add to R):
 *     A_v² − B_v² = 3000² − 3500²  and  A_v + B_v = 2437.5
 *   → A_v = 552.1 kN, B_v = 1885.4 kN, H_key = √(3000² − 552.1²) = 2948.8 kN,
 * which closes: √(2948.8² + 1885.4²) = 3500.0 kN. Now put A = 3500 into that
 * same thrust: A_v would be √(3500² − 2948.8²) = 1885.4 kN, the same as B_v,
 * so the two verticals would sum to 2 · 1885.4 = 3771 kN — against only
 * 2437.5 kN of applied load. Vertical equilibrium would fail by 55 %. The
 * sentence is a slip; the table is right. (An earlier version of this comment
 * said 2712 kN here. That figure was simply wrong; 3771 kN is the arithmetic,
 * and compute() derives it as `kBad` so the view can print it.)
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'EX 3 Creative — an asymmetric hanging roof',
  subtitle: 'Structural Design I · sheet UE 3 “Seiltragwerke”, Creative task a)–c)',
  about: 'A sculpture has to fit under the canopy of task 3, and it does not. So raise the right-hand wall and let the roof hang crooked. Two decisions now instead of one — how high the right wall goes, and how deep the cable hangs — and the two supports stop being equal: the higher one always takes more. Then the cable gets dimensioned for the force that governs, and braced. The defaults are the geometry the course’s own plate draws, Δ = 13.83 m and f = 6.95 m; the forces printed beside it are 2.56 % too large, and this view prints the corrected ones, exactly as ex3_3 does for task 3.',
  result: (d) => [`a) right wall raised +${d.dH.toFixed(2)} m, sag f = ${d.f.toFixed(2)} m → H = ${d.H.toFixed(0)} kN · N₁ = A = ${d.N1.toFixed(0)} kN, N₂ = B = ${d.N2.toFixed(0)} kN`,
                  `b) ${d.grade === 355 ? 'S355' : 'S235'}: f_td = ${d.ftd.toFixed(1)} N/mm² → A_req = ${d.Areq.toFixed(0)} mm² → Ø ${Math.ceil(d.D)} mm`,
                  `the key printed ${KEY.N1} / ${KEY.N2} kN → Ø ${Math.ceil(d.kD)} mm — ${((d.infl - 1) * 100).toFixed(2)} % high (it laid R off as 5.00 cm ≙ ${RLINE} kN)`,
                  `c) cross-ties in the Lageplan tie the cables into one surface — the key answers c) nowhere`],
  frame: [[-21, -14], [21, 15]],
};

const SPAN = 65;
const MPU = 17 / SPAN;
const QMAX = 3.6;                     // ceiling for the load bar (caption card)
const AX = -19;
const BX = AX + SPAN * MPU;
const HL = 13.5;                      // m, the left wall — unchanged from task 3
const GY = -5.0;                      // the ground line
const AYU = GY + HL * MPU;            // support A in drawing units
const SDL = 37.5;                     // kN/m, from task 3
const SFD = 250;                      // kN per drawing unit
const LLX = 4, IY = 2;                // load line, and the height of its division i
const NSEG = 26;
const FTK = { S235: 235, S355: 355 }, GM = 1.05;
const PLAN = [2.5, -8.6], PLAN_W = 15, PLAN_D = 3.4;
// what the key's own Kräfteplan measures: it lays R off as 141.6 pt = a round
// 5.00 cm, and at its own stated 1 cm ≙ 500 kN that is 2500 kN, not 2437.5
const RLINE = 2500;
// the pair the key prints beside that plate, and the reaction it then contradicts
const KEY = { N1: 3000, N2: 3500, Asentence: 3500 };

const DEFAULTS = {
  dH: 13.83,                          // m — design choice 1: how much higher B is
                                      //     (the key's plate: 27.06 − 13.23 m)
  f: 6.95,                            // m — design choice 2: sag below the chord
                                      //     (the key's plate: 39.4 pt at 1:500)
  s355: false,                        // b) the steel grade
  o1: true, sIF: 0.0004,
  lbl: true, _k: 99,
};

const SHAPED = 4;

const STEPS = [
  { t: 'The exercise', d: 'the Creative task: a sculpture has to go under the canopy of task 3 and the roof is too low. Raise the right-hand wall slab, design the new form, dimension the cable, and brace it' },
  { t: 'What carries over', d: 'the load is unchanged from task 3 — the same 37.5 kN/m over the same 65 m. Only the right-hand support is going to move',
    detail: (d) => [`s_d = ${SDL} kN/m · l = ${SPAN} m · R = ${d.R.toFixed(1)} kN`] },
  { t: 'The resultant', d: 'left: still q·L through the middle of the span — right: still the whole load line. What changes is where it gets divided',
    detail: (d) => [`R = ${d.R.toFixed(1)} kN`] },
  { t: 'a) Raise the right wall', d: 'the first design decision, and the task leaves it free — "choose a new height for the right support wall". The default here is the height the official plate draws. The chord from A to B now tilts, and with it everything else: the roof is no longer symmetric, so the two supports will no longer share the load equally',
    detail: (d, st) => [`B stands ${st.dH.toFixed(2)} m above A: ${HL} m → ${(HL + st.dH).toFixed(2)} m`,
                        `measured off the key's 1:500 plate: left support 13.23 m, right support 27.06 m → Δ = 13.83 m`] },
  { t: 'a) Choose the sag', d: 'the second decision, also free, also defaulted to the plate: the parabola hangs 6.95 m below the tilted chord there. Left: the parabola through both supports and its two end tangents — right: those tangents as rays, crossing at the pole. Where the pole sits also decides where the load line divides',
    detail: (d, st) => [`sag below the chord f = ${st.f.toFixed(2)} m → H = q·l²/(8f) = ${d.H.toFixed(0)} kN`,
                        `the lowest point is ${d.crownX.toFixed(1)} m from A and ${d.crownH.toFixed(2)} m above the ground`] },
  { t: 'a) The two reactions', d: 'the load line divides at i, and the two parts are the vertical reactions. They are NOT equal any more: the higher support pulls the harder, because the cable arrives there at the steeper angle',
    detail: (d) => [`A: ${d.Av.toFixed(1)} kN up, ${d.H.toFixed(0)} kN horizontal → ${d.N1.toFixed(0)} kN along the cable`,
                    `B: ${d.Bv.toFixed(1)} kN up, ${d.H.toFixed(0)} kN horizontal → ${d.N2.toFixed(0)} kN along the cable`],
    take: 'raise one support and it takes more of the load — height is paid for at that end' },
  { t: 'a) The governing force', d: 'the steeper end governs, and that is the raised one. This is the force the cable has to be dimensioned for — and it is where this view parts company with the printed answers, for the same reason ex3_3 does on task 3',
    detail: (d) => [`N_max = N₂ = ${d.N2.toFixed(0)} kN at the raised support B, and N₁ = ${d.N1.toFixed(0)} kN at A`,
                    `the key prints N₁ = ${KEY.N1}, N₂ = N_max = ${KEY.N2} kN — ${((d.infl - 1) * 100).toFixed(2)} % too large, from the same slip as its p. 3: having computed R = ${d.R.toFixed(1)} kN it lays R off on the plate as a round 5.00 cm, which at the plate’s own 1 cm ≙ 500 kN is ${RLINE} kN`,
                    `scale this geometry — its own geometry — by ${RLINE}/${d.R.toFixed(1)} = ${d.infl.toFixed(4)} and you get ${d.N1i.toFixed(0)} / ${d.N2i.toFixed(0)} kN, i.e. the printed pair. ex3_3 makes exactly this correction, printing 5788 / 11 576 kN where the key prints 5915 / 11 830`,
                    `a second, separate slip: its answer table gives A = ${KEY.N1} and B = ${KEY.N2}, but the sentence under it says A = ${KEY.Asentence}. A cable pulls along itself, so A must equal N₁. With A = ${KEY.Asentence} and the thrust its own pair implies (H = ${d.kH.toFixed(1)} kN) both verticals would be ${(d.kBad / 2).toFixed(1)} kN and sum to ${d.kBad.toFixed(0)} kN — against ${d.R.toFixed(1)} kN of load. The table is right`],
    take: 'the arithmetic and the drawing board disagree by 2.6 %, and the arithmetic wins — the same call ex3_3 makes' },
  { t: 'b) The cable diameter', d: 'the same route as EX 2.2: the design strength is the characteristic strength divided by the material factor, the required area is force over strength, and the diameter follows from the area',
    detail: (d, st) => [`f_td = f_tk / γ_M = ${d.grade} / ${GM} = ${d.ftd.toFixed(1)} N/mm²`,
                        `A_req = N_d / f_td = ${(d.N2 * 1000).toFixed(0)} / ${d.ftd.toFixed(1)} = ${d.Areq.toFixed(0)} mm²`,
                        `D = √(4A/π) = ${d.D.toFixed(1)} mm → Ø ${Math.ceil(d.D)} mm (round UP, never down)`,
                        `the key runs the same three lines on its inflated force: ${KEY.N2}·1000 / ${d.ftd235.toFixed(1)} = ${d.kAreq.toFixed(0)} mm² → Ø ${Math.ceil(d.kD)} mm. Correct the force and the cable gets thinner`] },
  { t: 'c) Bracing the roof', d: 'a hanging roof is stiff against the load it was shaped for and floppy against everything else — wind along the building, an unevenly spread snow load. Cross-ties between the cables in the plan turn the row of separate cables into one surface that can share a local load out sideways',
    detail: () => ['sketched in the plan below: diagonal ties in each bay between the wall slabs'],
    take: 'the funicular shape only answers ONE load case — bracing is what answers the others' },
];

function compute(s) {
  const R = SDL * SPAN;
  const H = (SDL * SPAN * SPAN) / (8 * s.f);
  const Av = R / 2 - (H * s.dH) / SPAN;
  const Bv = R / 2 + (H * s.dH) / SPAN;
  const N1 = Math.hypot(H, Av);
  const N2 = Math.hypot(H, Bv);
  const grade = s.s355 ? FTK.S355 : FTK.S235;
  const ftd = grade / GM;
  const Areq = (Math.max(N1, N2) * 1000) / ftd;
  const D = Math.sqrt((4 * Areq) / Math.PI);

  // --- what the KEY got from this same geometry, and why it differs ---------
  // 1) the load-line inflation: its R is drawn 5.00 cm ≙ 2500 kN, not 2437.5
  const infl = RLINE / R;                       // 1.0256…
  const N1i = N1 * infl, N2i = N2 * infl;       // 2989 / 3470 → its printed 3000 / 3500
  // 2) its printed pair solved back for the thrust it implies against the TRUE
  //    R: A_v² − B_v² = N1² − N2², A_v + B_v = R
  const kAv = (R + (KEY.N1 ** 2 - KEY.N2 ** 2) / R) / 2;
  const kBv = R - kAv;
  const kH = Math.sqrt(KEY.N1 ** 2 - kAv ** 2);
  const kdH = ((R / 2 - kAv) * SPAN) / kH;      // 14.70 m — NOT what the plate draws
  const kf = (SDL * SPAN * SPAN) / (8 * kH);    // 6.72 m — likewise
  // 3) its sentence "A = 3500": both verticals would then be √(A² − H²)
  const kBad = 2 * Math.sqrt(KEY.Asentence ** 2 - kH ** 2);   // 3771 kN vs R = 2437.5
  // 4) its b), always S235: 3'500'000 N / 223.8 → 15'638.96 mm² → Ø 142 mm
  const ftd235 = FTK.S235 / GM;
  const kAreq = (KEY.N2 * 1000) / ftd235;
  const kD = Math.sqrt((4 * kAreq) / Math.PI);
  // the parabola through A (0,0) and B (SPAN, dH), sagging below the chord
  const yM = (x) => (s.dH / SPAN) * x - (SDL / (2 * H)) * x * (SPAN - x);
  const crownX = SPAN / 2 - (H * s.dH) / (SDL * SPAN);
  const crownH = HL + yM(crownX);
  const toU = (x) => [AX + x * MPU, AYU + yM(x) * MPU];
  const curve = [];
  for (let i = 0; i <= NSEG; i++) curve.push(toU((SPAN * i) / NSEG));
  // force at position x: same H, vertical part is the shear there
  const Nat = (x) => Math.hypot(H, Math.abs(SDL * x - Av));
  const A = [AX, AYU], B = [BX, AYU + s.dH * MPU];
  // the end tangents meet where the two slopes cross
  const mA = (s.dH / SPAN) - (SDL * SPAN) / (2 * H);
  const mB = (s.dH / SPAN) + (SDL * SPAN) / (2 * H);
  const xI = (0 - 0 + mB * SPAN - s.dH) / (mB - mA);
  const I = toU(xI === xI ? xI : SPAN / 2);
  I[1] = AYU + (mA * xI) * MPU;
  const T = [LLX, IY + Av / SFD], Bo = [LLX, IY - Bv / SFD];
  const idiv = [LLX, IY];
  const o = [LLX + H / SFD, IY];
  return { R, H, Av, Bv, N1, N2, ftd, Areq, D, grade, curve, Nat, A, B, I, T, Bo, idiv, o,
           crownX, crownH, dH: s.dH, f: s.f, toU,
           infl, N1i, N2i, kAv, kBv, kH, kdH, kf, kBad, kAreq, kD, ftd235 };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  s.sIF = dw.bandScale(compute(s).N2);
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const CAB = { pending: PAL.black, final: (dd, st) => (st._k >= SHAPED ? PAL.red : PAL.grey) };

  dw.label('form_title', 'Lageplan 1:500 — form diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Kräfteplan — force diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });

  dw.seg('ground', { intro: 1, w: dw.W.bar, color: PAL.black, flash: false });
  dw.strokes('gHatch', 14, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.poly('wallA', 4, { intro: 1, opacity: 1.0, z: -0.5, color: PAL.grey, flash: false });
  dw.poly('wallB', 4, { intro: 3, opacity: 1.0, z: -0.5, color: PAL.grey, flash: false });
  dw.poly('wallB0', 4, { intro: 1, opacity: 1.0, z: -0.6, color: 0xe4e4e7, flash: false });
  for (const n of ['A', 'B']) {
    dw.disk(`sup${n}`, { intro: n === 'A' ? 1 : 3, r: dw.W.disk });
    dw.label(`lsup${n}`, n, { cls: 'num', intro: n === 'A' ? 1 : 3, when: (st) => st.lbl });
  }
  dw.seg('barq', { intro: 1, w: dw.W.thin, color: PAL.green });
  dw.arrows('arrq', 14, { intro: 1, w: dw.W.thin, color: PAL.green,
    headLen: dw.W.narrow.headLen * 0.8, headW: dw.W.narrow.headW * 0.8 });
  dw.label('lq', '', { cls: 'num', intro: 1, color: PAL.green, when: (st) => st.lbl });

  dw.dashLine('Rline', { intro: 2, color: PAL.grey, dash: dw.W.dash });
  dw.dashArrow('Rform', { intro: 2, color: PAL.green, w: dw.W.arrow.w * 1.15,
    headLen: dw.W.arrow.headLen, headW: dw.W.arrow.headW, dash: dw.W.dash * 1.6, flash: false });
  dw.dashArrow('Rforce', { intro: 2, color: PAL.green, w: dw.W.arrow.w * 1.15,
    headLen: dw.W.arrow.headLen, headW: dw.W.arrow.headW, dash: dw.W.dash * 1.6, flash: false });
  dw.label('lRform', 'R', { cls: 'num', intro: 2, color: PAL.green });
  dw.label('lRforce', 'R', { cls: 'num', intro: 2, color: PAL.green });
  dw.link('Rform', 'Rforce', 'lRform', 'lRforce');

  dw.dashLine('chord', { intro: 3, color: PAL.grey, dash: dw.W.dash });
  dw.label('lcs', 'CS / SL', { cls: 'point', intro: 3, flash: false, color: PAL.grey });
  dw.seg('dimD', { intro: 3, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('ldH', '', { intro: 3, flash: false, color: PAL.grey });

  dw.poly('band', 2 * (NSEG + 1), { intro: SHAPED, opacity: 1.0, z: -0.18, flash: false,
    color: { pending: PAL.zeroBand, final: () => PAL.redBand }, when: (st) => st.o1 });
  dw.strokes('cable', NSEG, { intro: SHAPED, w: dw.W.bar, color: CAB });
  for (let i = 0; i < 2; i++) {
    dw.dashLine(`tan${i}`, { intro: SHAPED, color: PAL.red, dash: dw.W.dash });
    dw.seg(`ray${i}`, { intro: SHAPED, w: dw.W.bar, color: CAB });
    dw.label(`lt${i}`, `${i + 1}`, { cls: 'num', intro: SHAPED, color: PAL.red, when: (st) => st.lbl });
    dw.label(`lr${i}`, `${i + 1}`, { cls: 'num', intro: SHAPED, color: PAL.red, when: (st) => st.lbl });
    dw.link(`tan${i}`, `ray${i}`, `lt${i}`, `lr${i}`);
  }
  dw.disk('ptO', { intro: SHAPED, r: dw.W.disk * 0.8 });
  dw.label('lO', 'o', { cls: 'num', intro: SHAPED, when: (st) => st.lbl });
  dw.seg('dimH', { intro: SHAPED, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lH', '', { intro: SHAPED, flash: false, color: PAL.grey });
  dw.disk('ptCrown', { intro: SHAPED, r: dw.W.disk * 0.7 });
  dw.label('lcrown', '', { cls: 'point', intro: SHAPED, flash: false, color: PAL.grey });

  dw.disk('ptI', { intro: 5, r: dw.W.disk * 0.7 });
  dw.label('lI', 'i', { cls: 'point', intro: 5, when: (st) => st.lbl });
  for (const n of ['A', 'B']) {
    dw.arrow(`re${n}`, { intro: 5, color: PAL.green, ...NARR });
    dw.arrow(`fre${n}`, { intro: 5, color: PAL.green, ...NARR });
    dw.label(`lre${n}`, '', { cls: 'num', intro: 5, color: PAL.green });
    dw.link(`re${n}`, `fre${n}`, `lre${n}`);
  }
  dw.label('lgov', '', { cls: 'num', intro: 6, flash: false, color: PAL.red });
  // the key's own printed pair, set beside the corrected one it should have read
  dw.label('lkey', '', { cls: 'point', intro: 6, flash: false, color: PAL.grey });
  dw.label('lkey2', '', { cls: 'point', intro: 6, flash: false, color: PAL.grey });

  // b) the cable section, drawn at its real diameter against a 1 m rule
  dw.circle('sect', { intro: 7, color: PAL.red, flash: false });
  dw.label('lsect', '', { cls: 'num', intro: 7, flash: false, color: PAL.red });

  // c) the bracing sketch in plan
  dw.poly('planOut', 4, { intro: 8, opacity: 1.0, z: -0.6, color: 0xf1f1f4, flash: false });
  dw.strokes('planCables', 5, { intro: 8, w: dw.W.thin, color: PAL.red, flash: false });
  dw.strokes('brace', 24, { intro: 8, w: dw.W.thin, color: PAL.blue, flash: false });
  dw.strokes('planWalls', 2, { intro: 8, w: dw.W.bar, color: PAL.grey, flash: false });
  dw.label('lbrace', '', { cls: 'point', intro: 8, flash: false, color: PAL.grey });

  dw.instant('form_title', 'force_title', 'force_sub');
  dw.ghostable('Rforce', 'ray0', 'ray1', 'freA', 'freB');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    dw.setLabel('form_title', [-19, -6.6]);
    dw.setLabel('force_title', [1, 13.2]);
    dw.setLabel('force_sub', [9, 11.9]);
    dw.setText('force_sub', `to scale · 1 unit ≙ ${SFD} kN  (sheet: 1 cm ≙ 500 kN)`);

    dw.setSeg('ground', [AX - 3.4, GY], [BX + 3.4, GY]);
    dw.setStrokes('gHatch', V.hatch([AX - 3.2, GY], [BX + 3.2, GY], 1, 0.95, 14));
    const wt = 1.9;
    dw.setPoly('wallA', [[AX - wt, GY], [AX, GY], [AX, d.A[1]], [AX - wt, d.A[1]]]);
    dw.setPoly('wallB', [[BX, GY], [BX + wt, GY], [BX + wt, d.B[1]], [BX, d.B[1]]]);
    dw.setPoly('wallB0', [[BX, GY], [BX + wt, GY], [BX + wt, AYU], [BX, AYU]]);
    dw.setDisk('supA', d.A); dw.setDisk('supB', d.B);
    dw.setLabel('lsupA', V.add(d.A, [-0.6, 1.1]));
    dw.setLabel('lsupB', V.add(d.B, [0.6, 1.1]));

    // capped: above QMAX the bar disappears behind the caption card
    const qy = Math.min(Math.max(d.B[1], AYU) + 2.4, QMAX);
    dw.setSeg('barq', [AX, qy], [BX, qy]);
    dw.setArrows('arrq', Array.from({ length: 14 }, (_, i) => {
      const x = AX + ((BX - AX) * i) / 13;
      return [[x, qy], [x, qy - 0.9]];
    }));
    dw.setLabel('lq', [AX + 4.4, qy - 1.4]);
    dw.setText('lq', `s_d = ${SDL} kN/m`);

    const MXu = (AX + BX) / 2;
    dw.setDashLine('Rline', [[MXu, qy + 0.8], [MXu, GY - 0.5]]);
    dw.setDashArrow('Rform', [MXu, qy - 1.2], [MXu, qy - 3.4]);
    dw.setLabel('lRform', [MXu + 1.2, qy - 2.3]);
    dw.setDashArrow('Rforce', d.T, d.Bo);
    dw.setLabel('lRforce', V.add(V.mid(d.T, d.Bo), [-2.0, 0]));

    dw.setDashLine('chord', [V.add(d.A, [-2.0, 0]), V.add(d.B, [2.0, 0])]);
    dw.setLabel('lcs', V.add(V.mid(d.A, d.B), [0, 1.2]));
    dw.setSeg('dimD', [BX + wt + 0.7, AYU], [BX + wt + 0.7, d.B[1]]);
    dw.setLabel('ldH', [BX + wt + 3.0, d.B[1] - 0.9]);
    dw.setText('ldH', `raised +${d.dH.toFixed(2)} m`);

    const segs = [];
    for (let i = 0; i < NSEG; i++) segs.push([d.curve[i], d.curve[i + 1]]);
    dw.setStrokes('cable', segs);
    const nrm = d.curve.map((p, i) => V.unit(V.perp(
      V.sub(d.curve[Math.min(NSEG, i + 1)], d.curve[Math.max(0, i - 1)]))));
    const hw = d.curve.map((p, i) => s.sIF * d.Nat((SPAN * i) / NSEG));
    dw.setPoly('band', [...d.curve.map((p, i) => V.add(p, V.mul(nrm[i], hw[i]))),
                        ...d.curve.map((p, i) => V.sub(p, V.mul(nrm[i], hw[i]))).reverse()]);

    const ends = [d.A, d.B], rr = [d.T, d.Bo];
    for (let i = 0; i < 2; i++) {
      dw.setDashLine(`tan${i}`, [ends[i], d.I]);
      dw.setSeg(`ray${i}`, d.o, rr[i]);
      dw.setLabel(`lt${i}`, V.add(V.mid(ends[i], d.I),
        V.mul(V.unit(V.perp(V.sub(d.I, ends[i]))), i === 0 ? -2.4 : 2.4)));
      dw.setLabel(`lr${i}`, V.add(V.mid(d.o, rr[i]), [2.2, i === 0 ? 0.9 : -0.9]));
    }
    dw.setDisk('ptO', d.o);
    dw.setLabel('lO', V.add(d.o, [1.4, 0.7]));
    dw.setSeg('dimH', [d.idiv[0], d.T[1] + 1.7], [d.o[0], d.T[1] + 1.7]);
    dw.setLabel('lH', [(d.idiv[0] + d.o[0]) / 2, d.T[1] + 2.8]);
    dw.setText('lH', `H = ${d.H.toFixed(0)} kN`);
    const cp = d.toU(d.crownX);
    dw.setDisk('ptCrown', cp);
    dw.setLabel('lcrown', V.add(cp, [-2.8, -1.6]));
    dw.setText('lcrown', `lowest: ${d.crownH.toFixed(1)} m`);

    dw.setDisk('ptI', d.idiv);
    dw.setLabel('lI', V.add(d.idiv, [-1.3, 0]));
    const uA = V.unit(V.sub(d.A, d.I)), uB = V.unit(V.sub(d.B, d.I));
    const SYM = 3.4;
    dw.setArrow('reA', d.A, V.add(d.A, V.mul(uA, SYM)));
    dw.setArrow('reB', d.B, V.add(d.B, V.mul(uB, SYM)));
    dw.setLabel('lreA', V.add(V.add(d.A, V.mul(uA, SYM)), [1.4, 1.1]));
    dw.setLabel('lreB', V.add(V.add(d.B, V.mul(uB, SYM)), [1.8, 0.9]));
    dw.setText('lreA', `A = ${d.N1.toFixed(0)}`);
    dw.setText('lreB', `B = ${d.N2.toFixed(0)}`);
    dw.setArrow('freA', d.o, d.T);
    dw.setArrow('freB', d.Bo, d.o);

    dw.setLabel('lgov', V.add(V.mid(d.curve[NSEG - 4], d.B), [-1.0, -2.2]));
    dw.setText('lgov', `N_max = ${d.N2.toFixed(0)} kN`);

    // the key's plate carries this same geometry but a load line drawn 5.00 cm
    // long, so it reads 2.56 % high — see ex3_3, which corrects the same slip
    dw.setLabel('lkey', [9.8, d.Bo[1] - 1.5]);
    dw.setText('lkey', `the key prints ${KEY.N1} / ${KEY.N2} kN off this geometry:`);
    dw.setLabel('lkey2', [9.8, d.Bo[1] - 2.5]);
    dw.setText('lkey2', `its R is drawn 5.00 cm ≙ ${RLINE} kN, ${((d.infl - 1) * 100).toFixed(2)} % over ${d.R.toFixed(1)} kN`);

    // b) the section, at 1:500 like the Lageplan — a 142 mm cable is a dot,
    // which is exactly the point worth making about steel in tension
    const sc = [BX - 2.0, GY - 2.4];
    dw.setCircle('sect', sc, Math.max((d.D / 1000) * MPU, 0.10));
    dw.setLabel('lsect', V.add(sc, [3.6, 0]));
    dw.setText('lsect', `Ø ${Math.ceil(d.D)} mm`);

    // c) the plan: five cables between the wall slabs, cross-braced in each bay
    const [px, py] = PLAN;
    dw.setPoly('planOut', [[px, py], [px + PLAN_W, py], [px + PLAN_W, py - PLAN_D], [px, py - PLAN_D]]);
    dw.setStrokes('planCables', Array.from({ length: 5 }, (_, i) => {
      const y = py - (PLAN_D * (i + 0.5)) / 5;
      return [[px, y], [px + PLAN_W, y]];
    }));
    dw.setStrokes('planWalls', [[[px, py], [px, py - PLAN_D]],
                                [[px + PLAN_W, py], [px + PLAN_W, py - PLAN_D]]]);
    const br = [];
    for (let i = 0; i < 4; i++) {
      const y0 = py - (PLAN_D * (i + 0.5)) / 5, y1 = py - (PLAN_D * (i + 1.5)) / 5;
      for (let j = 0; j < 3; j++) {
        const x0 = px + (PLAN_W * j) / 3, x1 = px + (PLAN_W * (j + 1)) / 3;
        br.push([[x0, y0], [x1, y1]], [[x0, y1], [x1, y0]]);
      }
    }
    dw.setStrokes('brace', br);
    dw.setLabel('lbrace', [px + PLAN_W / 2, py - PLAN_D - 1.2]);
    dw.setText('lbrace', 'c) plan: cross-ties brace the row of cables into one surface');

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const par = panel.section('Given (from task 3)');
  panel.toggle(par, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, s.sIF * 2.5, s.sIF / 20, refresh);
  panel.toggle(par, s, 'lbl', 'show labels', refresh);
  const des = panel.section('Your design');
  panel.slider(des, s, 'dH', 'raise the right wall by (m)', 0, 26, 0.01, refresh);
  panel.slider(des, s, 'f', 'sag below the chord f (m)', 3, 14, 0.01, refresh);
  const dim = panel.section('b) dimensioning');
  panel.toggle(dim, s, 's355', 'S355 instead of S235', refresh);

  refresh();
  return player;
}
