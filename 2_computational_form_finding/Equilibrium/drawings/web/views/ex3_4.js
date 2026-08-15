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
 * The official solution prints N1 = 3000 kN and N2 = N_max = 3500 kN, and
 * those two numbers pin the whole geometry down. A cable's segments share one
 * horizontal thrust H, and its vertical reactions must add to R, so
 *     A_v² − B_v² = 3000² − 3500²  and  A_v + B_v = 2437.5
 *   → A_v = 552.1 kN, B_v = 1885.4 kN, H = √(3000² − 552.1²) = 2948.8 kN
 * and √(2948.8² + 1885.4²) = 3500.0 kN closes it exactly. From
 * A_v = qL/2 − H·Δ/L the right support must stand Δ = 14.70 m above the left,
 * and the sag below the chord is q·L²/(8H) = 6.72 m. This view defaults to
 * precisely that design.
 *
 * ONE CORRECTION. The solution's answer table reads A = 3000 kN, B = 3500 kN,
 * but the sentence below it reads "A = 3500 kN, B = 3500 kN". The table is
 * right: a cable can only pull along itself, so the reaction at a support IS
 * the force in the segment reaching it — A = N1 = 3000, B = N2 = 3500. The
 * arithmetic above only closes with A = 3000; with A = 3500 the vertical
 * components would sum to 2712 kN, not the 2437.5 kN of load actually there.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'EX 3 Creative — an asymmetric hanging roof',
  subtitle: 'Structural Design I · sheet UE 3 “Seiltragwerke”, Creative task a)–c)',
  about: 'A sculpture has to fit under the canopy of task 3, and it does not. So raise the right-hand wall and let the roof hang crooked. Two decisions now instead of one — how high the right wall goes, and how deep the cable hangs — and the two supports stop being equal: the higher one always takes more. Then the cable gets dimensioned for the force that governs, and braced. The defaults reproduce the course’s published design, N₁ = 3000 kN and N₂ = 3500 kN.',
  result: (d) => [`a) right wall +${d.dH.toFixed(2)} m → H = ${d.H.toFixed(0)} kN · N₁ = A = ${d.N1.toFixed(0)} kN, N₂ = B = ${d.N2.toFixed(0)} kN`,
                  `b) ${d.grade === 355 ? 'S355' : 'S235'}: f_td = ${d.ftd.toFixed(1)} N/mm² → A_req = ${d.Areq.toFixed(0)} mm² → Ø ${Math.ceil(d.D)} mm`,
                  `the published solution: N₁ = 3000, N₂ = N_max = 3500 kN, Ø 142 mm`],
  frame: [[-21, -14], [21, 15]],
};

const SPAN = 65;
const MPU = 17 / SPAN;
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

const DEFAULTS = {
  dH: 14.70,                          // m — design choice 1: how much higher B is
  f: 6.72,                            // m — design choice 2: sag below the chord
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
  { t: 'a) Raise the right wall', d: 'the first design decision. The chord from A to B now tilts, and with it everything else — the roof is no longer symmetric, so the two supports will no longer share the load equally',
    detail: (d, st) => [`B stands ${st.dH.toFixed(2)} m above A: ${HL} m → ${(HL + st.dH).toFixed(2)} m`] },
  { t: 'a) Choose the sag', d: 'the second decision. Left: the parabola through both supports and its two end tangents — right: those tangents as rays, crossing at the pole. where the pole sits also decides where the load line divides',
    detail: (d, st) => [`sag below the chord f = ${st.f.toFixed(2)} m → H = q·l²/(8f) = ${d.H.toFixed(0)} kN`,
                        `the lowest point is ${d.crownX.toFixed(1)} m from A and ${d.crownH.toFixed(2)} m above the ground`] },
  { t: 'a) The two reactions', d: 'the load line divides at i, and the two parts are the vertical reactions. They are NOT equal any more: the higher support pulls the harder, because the cable arrives there at the steeper angle',
    detail: (d) => [`A: ${d.Av.toFixed(1)} kN up, ${d.H.toFixed(0)} kN horizontal → ${d.N1.toFixed(0)} kN along the cable`,
                    `B: ${d.Bv.toFixed(1)} kN up, ${d.H.toFixed(0)} kN horizontal → ${d.N2.toFixed(0)} kN along the cable`],
    take: 'raise one support and it takes more of the load — height is paid for at that end' },
  { t: 'a) The governing force', d: 'the steeper end governs, and that is the raised one. This is the force the cable has to be dimensioned for',
    detail: (d) => [`N_max = N₂ = ${d.N2.toFixed(0)} kN at the raised support B`,
                    `the published solution: N₁ = 3000 kN, N₂ = N_max = 3500 kN`,
                    `its answer table gives A = 3000 and B = 3500 — the sentence under it saying A = 3500 is a slip: a cable pulls along itself, so A must equal N₁`] },
  { t: 'b) The cable diameter', d: 'the same route as EX 2.2: the design strength is the characteristic strength divided by the material factor, the required area is force over strength, and the diameter follows from the area',
    detail: (d, st) => [`f_td = f_tk / γ_M = ${d.grade} / ${GM} = ${d.ftd.toFixed(1)} N/mm²`,
                        `A_req = N_d / f_td = ${(d.N2 * 1000).toFixed(0)} / ${d.ftd.toFixed(1)} = ${d.Areq.toFixed(0)} mm²`,
                        `D = √(4A/π) = ${d.D.toFixed(1)} mm → Ø ${Math.ceil(d.D)} mm (round UP, never down)`] },
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
           crownX, crownH, dH: s.dH, f: s.f, toU };
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
    dw.setStrokes('gHatch', Array.from({ length: 14 }, (_, i) => {
      const x = AX - 3.0 + i * ((BX - AX + 6) / 13);
      return [[x, GY], [x - 0.5, GY - 0.5]];
    }));
    const wt = 1.9;
    dw.setPoly('wallA', [[AX - wt, GY], [AX, GY], [AX, d.A[1]], [AX - wt, d.A[1]]]);
    dw.setPoly('wallB', [[BX, GY], [BX + wt, GY], [BX + wt, d.B[1]], [BX, d.B[1]]]);
    dw.setPoly('wallB0', [[BX, GY], [BX + wt, GY], [BX + wt, AYU], [BX, AYU]]);
    dw.setDisk('supA', d.A); dw.setDisk('supB', d.B);
    dw.setLabel('lsupA', V.add(d.A, [-0.6, 1.1]));
    dw.setLabel('lsupB', V.add(d.B, [0.6, 1.1]));

    const qy = Math.max(d.B[1], AYU) + 2.4;
    dw.setSeg('barq', [AX, qy], [BX, qy]);
    dw.setArrows('arrq', Array.from({ length: 14 }, (_, i) => {
      const x = AX + ((BX - AX) * i) / 13;
      return [[x, qy], [x, qy - 0.9]];
    }));
    dw.setLabel('lq', [AX + 4.4, qy + 0.7]);
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
  panel.slider(des, s, 'dH', 'raise the right wall by (m)', 0, 26, 0.1, refresh);
  panel.slider(des, s, 'f', 'sag below the chord f (m)', 3, 14, 0.02, refresh);
  const dim = panel.section('b) dimensioning');
  panel.toggle(dim, s, 's355', 'S355 instead of S235', refresh);

  refresh();
  return player;
}
