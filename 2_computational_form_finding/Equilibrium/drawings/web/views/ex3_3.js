/**
 * EX 3 · Task 3 — Dachform der Hängekonstruktion (Pavilhão de Portugal)
 * Structural Design I, HS 22 (sheet UE 3 "Seiltragwerke"), all of a) to e).
 *
 * Álvaro Siza's pavilion for Expo '98: a 65 m concrete canopy hung between
 * two wall slabs. g_k = 5 kN/m², plus a snow load q_k = 0.5 kN/m².
 *   a) the design area load s_d
 *   b) the line load on one middle roof element, walls 5 m apart
 *   c) the resultant of that line load
 *   d) the roof form through A and B with its lowest point 10 m above ground,
 *      plus the Lageplan and Kräfteplan
 *   e) what doubling the load does
 *
 * a) to c) are arithmetic and the sheet prints them: 7.5 kN/m², 37.5 kN/m,
 * R = 2437.5 kN. This view reproduces all three exactly.
 *
 * d) is where the sheet's own plate and its own arithmetic part company, so
 * this is worth stating precisely. Digitised from the solution (page 3):
 *   - span A→B = 368.37 pt = 64.98 m at 1:500, i.e. the stated 65 m
 *   - the end tangents leave the supports at 12.2°, meeting 39.82 pt = 7.02 m
 *     below the chord, so the drawn parabola's sag is f = 3.51 m
 *   - the supports stand 75.16 pt = 13.26 m above the ground line, putting
 *     the crown 9.75 m up — the "10 m above ground" the task asks for
 * So the intended geometry is supports at 13.5 m and a crown at exactly
 * 10.0 m, giving f = 3.5 m. From the sheet's OWN R = 2437.5 kN that yields
 * H = q·L²/(8f) = 5658.5 kN and N = √(H² + (R/2)²) = 5788.2 kN.
 *
 * The sheet prints 5915 kN. That is what its plate measures — but its plate
 * lays R off at 141.69 pt = 5.00 cm, and at the stated 1 cm ≙ 500 kN that is
 * 2500 kN, not 2437.5 kN. Scaling 5788.2 by 2500/2437.5 gives 5936, i.e. the
 * printed 5915 to within the width of a pencil. The 2.2 % gap is a round
 * number on the drawing board, not a disagreement about statics. This view
 * gives the exact figure and says where the sheet's comes from.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'EX 3.3 — the Pavilhão de Portugal: finding the roof form',
  subtitle: 'Structural Design I · sheet UE 3 “Seiltragwerke”, task 3 a)–e)',
  about: 'Álvaro Siza hung a 65 m concrete canopy between two wall slabs for Expo ’98, and this task rebuilds it from the load upward: area load to line load to resultant to shape. The one design decision is already made for you — the lowest point sits 10 m above the ground — and it fixes the sag, which fixes everything else. Drag the crown height and watch a very flat roof become a very expensive one.',
  result: (d) => [`a) s_d = ${d.sdA} kN/m²   b) s_d = ${d.sdL} kN/m   c) R = ${d.R} kN`,
                  `d) crown ${d.crown.toFixed(1)} m up → f = ${d.f.toFixed(2)} m → H = ${d.H.toFixed(0)} kN, N_max = A = B = ${d.N.toFixed(0)} kN`,
                  `e) double the load doubles every force: N_max = ${(2 * d.N).toFixed(0)} kN`],
  frame: [[-21, -14], [21, 15]],
};

const SPAN = 65;                      // m, digitised from the sheet (64.98)
const MPU = 17 / SPAN;                // drawing units per metre
const AX = -19, CHORD = 1.2;          // support A and the chord CS/SL
const BX = AX + SPAN * MPU;
const MX = (AX + BX) / 2;
const HSUP = 13.5;                    // m, the wall slabs' height (drawn 13.26)
const GY = CHORD - HSUP * MPU;        // the ground line
const SFD = 400;                      // kN per drawing unit
const LLX = 4, CY = 2;
const NSEG = 26;
const PLAN_Y = -4.8, PLAN_D = 10;     // the little plan, and its depth in metres

const DEFAULTS = {
  gk: 5, qk: 0.5,                     // kN/m², given
  b: 5,                               // m, the wall spacing = the influence width
  crown: 10,                          // m above ground — THE design constraint
  o1: true, sIF: 0.00030,
  lbl: true, _k: 99,
};

const SHAPED = 4;

const STEPS = [
  { t: 'The exercise', d: 'UE 3 task 3: Álvaro Siza’s Pavilhão de Portugal, a 65 m canopy hung between two wall slabs. Build it up from the load: area load, line load, resultant, then the shape' },
  { t: 'a) The design area load', d: 'the permanent load and the snow load carry different partial factors — 1.35 on what is always there, 1.5 on what might be',
    detail: (d, st) => [`s_d = g_k·1.35 + q_k·1.5 = ${st.gk}·1.35 + ${st.qk}·1.5 = ${d.sdA} kN/m²`] },
  { t: 'b) The load influence zone', d: 'below: the roof in plan. The wall slabs stand 5 m apart, so one middle roof element collects the load from a 5 m wide strip — half from each side. Multiply the area load by that width',
    detail: (d, st) => [`influence width b = ${st.b} m → s_d = ${d.sdA} · ${st.b} = ${d.sdL} kN/m`],
    take: 'a line load is just an area load that has been told how wide it is' },
  { t: 'c) The resultant', d: 'left: the whole line load has one resultant, q·L, acting through the middle of the span — right: laid off, it is the entire load line',
    detail: (d) => [`R = s_d · l = ${d.sdL} · ${SPAN} = ${d.R} kN`] },
  { t: 'd) The form: the crown is the brief', d: 'the lowest point must sit 10 m above the ground, and the supports are 13.5 m up — so the sag is settled at 3.5 m. Left: the parabola and its two end tangents — right: the same two tangents as the outer rays, crossing at the pole',
    detail: (d, st) => [`sag f = ${(HSUP)} − ${st.crown} = ${d.f.toFixed(2)} m · the end tangents meet 2f = ${(2 * d.f).toFixed(2)} m below the chord`] },
  { t: 'd) The horizontal thrust', d: 'and it is enormous, because the roof is very flat: 65 m of span against 3.5 m of sag is a ratio of nearly 19 to 1',
    detail: (d) => [`H = s_d·l² / (8f) = ${d.H.toFixed(0)} kN`,
                    `that is ${(d.H / (d.R / 2)).toFixed(1)}× the vertical reaction — the walls are pulled inward far harder than down`] },
  { t: 'd) Global equilibrium', d: 'the reactions pull along the end tangents, so each wall slab has to resist a force nearly horizontal. That is why they are slabs and not columns',
    detail: (d) => [`A = B = ${d.N.toFixed(0)} kN, each ${d.H.toFixed(0)} kN horizontal and ${(d.R / 2).toFixed(1)} kN vertical`] },
  { t: 'd) The governing force', d: 'flattest at the supports, so largest at the supports — the same rule as task 1c, on a structure a hundred times the size',
    detail: (d) => [`N_max = N₁ = N₂ = ${d.N.toFixed(0)} kN`,
                    `the sheet prints 5915 kN: its plate lays R off at a round 5.00 cm, which at 1 cm ≙ 500 kN is 2500 kN rather than 2437.5 — scale ${d.N.toFixed(0)} by that and you get 5936`],
    take: 'the arithmetic and the drawing board disagree by 2 %, and the arithmetic wins' },
  { t: 'e) Twice the load', d: 'the shape does not change, so every direction in the force plan stays put and only the scale grows. The whole Kräfteplan is multiplied by two, and so is every force in the cable',
    detail: (d) => [`N_max = 2 × ${d.N.toFixed(0)} = ${(2 * d.N).toFixed(0)} kN (the sheet, from its own 5915: 11 830 kN)`],
    take: 'same form, double load, double force — a cable’s shape is set by the pattern of load, not its size' },
];

function compute(s) {
  const sdA = +(s.gk * 1.35 + s.qk * 1.5).toFixed(3);
  const sdL = +(sdA * s.b).toFixed(3);
  const R = +(sdL * SPAN).toFixed(3);
  const f = HSUP - s.crown;
  const H = (sdL * SPAN * SPAN) / (8 * f);
  const N = Math.hypot(H, R / 2);
  const curve = [];
  for (let i = 0; i <= NSEG; i++) {
    const xi = i / NSEG;
    curve.push([AX + (BX - AX) * xi, CHORD - 4 * f * MPU * xi * (1 - xi)]);
  }
  const Nat = (xi) => Math.hypot(H, sdL * SPAN * (xi - 0.5));
  const A = [AX, CHORD], B = [BX, CHORD];
  const I = [MX, CHORD - 2 * f * MPU];
  const T = [LLX, CY + R / SFD / 2], Bo = [LLX, CY - R / SFD / 2];
  const o = [LLX + H / SFD, CY];
  return { sdA, sdL, R, f, H, N, curve, Nat, A, B, I, T, Bo, o, crown: s.crown };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  // one band width for every view: the largest force comes out W.band
  // half-wide, so a force reads the same thickness whatever the frame
  s.sIF = dw.bandScale(compute(s).N);
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const CAB = { pending: PAL.black, final: (dd, st) => (st._k >= SHAPED ? PAL.red : PAL.grey) };

  dw.label('form_title', 'Lageplan 1:500 — form diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Kräfteplan — force diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });

  // the section: ground, the two wall slabs, the supports
  dw.seg('ground', { intro: 1, w: dw.W.bar, color: PAL.black, flash: false });
  dw.strokes('gHatch', 14, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  for (const n of ['A', 'B']) {
    dw.poly(`wall${n}`, 4, { intro: 1, opacity: 1.0, z: -0.5, color: PAL.grey, flash: false });
    dw.disk(`sup${n}`, { intro: 1, r: dw.W.disk });
    dw.label(`lsup${n}`, n, { cls: 'num', intro: 1, when: (st) => st.lbl });
  }

  // a) + b): the plan, and the 5 m strip one roof element collects
  dw.poly('planOut', 4, { intro: 1, opacity: 1.0, z: -0.6, color: 0xf1f1f4, flash: false });
  dw.strokes('planWalls', 2, { intro: 1, w: dw.W.thin, color: PAL.grey, flash: false });
  dw.poly('strip', 4, { intro: 2, opacity: 1.0, z: -0.4, color: PAL.green, flash: false });
  dw.strokes('stripEdge', 2, { intro: 2, w: dw.W.thin, color: PAL.green, flash: false });
  dw.seg('dimB', { intro: 2, w: dw.W.dim, color: PAL.green, flash: false });
  dw.label('lb', '', { intro: 2, flash: false, color: PAL.green });
  dw.label('lplan', 'the roof in plan · one element spans the 65 m', { cls: 'point', intro: 1, flash: false, color: PAL.grey });
  dw.label('lspan', '', { intro: 1, flash: false, color: PAL.grey });

  // the two load runs, permanent and snow, as the sheet stacks them
  for (const [i, k] of [[0, 'g'], [1, 'q']]) {
    dw.seg(`bar${k}`, { intro: 1, w: dw.W.thin, color: PAL.green });
    dw.strokes(`arr${k}`, 14, { intro: 1, w: dw.W.thin, color: PAL.green });
    dw.label(`l${k}`, '', { cls: 'num', intro: 1, color: PAL.green, when: (st) => st.lbl });
  }

  dw.dashLine('chord', { intro: 3, color: PAL.grey, dash: dw.W.dash });
  dw.label('lcs', 'CS / SL', { cls: 'point', intro: 3, flash: false, color: PAL.grey });
  dw.dashLine('Rline', { intro: 3, color: PAL.grey, dash: dw.W.dash });
  dw.dashArrow('Rform', { intro: 3, color: PAL.green, w: dw.W.arrow.w * 1.15,
    headLen: dw.W.arrow.headLen, headW: dw.W.arrow.headW, dash: dw.W.dash * 1.6, flash: false });
  dw.dashArrow('Rforce', { intro: 3, color: PAL.green, w: dw.W.arrow.w * 1.15,
    headLen: dw.W.arrow.headLen, headW: dw.W.arrow.headW, dash: dw.W.dash * 1.6, flash: false });
  dw.label('lRform', 'R', { cls: 'num', intro: 3, color: PAL.green });
  dw.label('lRforce', 'R', { cls: 'num', intro: 3, color: PAL.green });
  dw.link('Rform', 'Rforce', 'lRform', 'lRforce');

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
  dw.disk('ptI', { intro: SHAPED, r: dw.W.disk * 0.7 });
  dw.disk('ptO', { intro: SHAPED, r: dw.W.disk * 0.8 });
  dw.label('lO', 'o', { cls: 'num', intro: SHAPED, when: (st) => st.lbl });
  dw.seg('dimH2', { intro: SHAPED, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lh', '', { intro: SHAPED, flash: false, color: PAL.grey });
  dw.seg('dimF', { intro: SHAPED, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lF', '', { intro: SHAPED, flash: false, color: PAL.grey });
  dw.dashLine('crownLine', { intro: SHAPED, color: PAL.grey, dash: dw.W.dash });

  dw.seg('dimH', { intro: 5, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lH', '', { intro: 5, flash: false, color: PAL.grey });

  for (const n of ['A', 'B']) {
    dw.arrow(`re${n}`, { intro: 6, color: PAL.green, ...NARR });
    dw.arrow(`fre${n}`, { intro: 6, color: PAL.green, ...NARR });
    dw.label(`lre${n}`, n, { cls: 'num', intro: 6, color: PAL.green, when: (st) => st.lbl });
    dw.link(`re${n}`, `fre${n}`, `lre${n}`);
  }
  dw.label('lgov', '', { cls: 'num', intro: 7, flash: false, color: PAL.red });
  dw.label('ldbl', '', { cls: 'num', intro: 8, flash: false, color: PAL.grey });

  dw.instant('form_title', 'force_title', 'force_sub');
  dw.ghostable('Rforce', 'ray0', 'ray1', 'freA', 'freB');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    dw.setLabel('form_title', [-19, -8.7]);
    dw.setLabel('force_title', [1, 13.2]);
    dw.setLabel('force_sub', [9, 11.9]);
    dw.setText('force_sub', `to scale · 1 unit ≙ ${SFD} kN  (sheet: 1 cm ≙ 500 kN)`);

    // ground + hatch
    dw.setSeg('ground', [AX - 3.4, GY], [BX + 3.4, GY]);
    dw.setStrokes('gHatch', Array.from({ length: 14 }, (_, i) => {
      const x = AX - 3.0 + i * ((BX - AX + 6) / 13);
      return [[x, GY], [x - 0.55, GY - 0.55]];
    }));
    const wt = 2.0;                       // wall thickness in units
    dw.setPoly('wallA', [[AX - wt, GY], [AX, GY], [AX, CHORD], [AX - wt, CHORD]]);
    dw.setPoly('wallB', [[BX, GY], [BX + wt, GY], [BX + wt, CHORD], [BX, CHORD]]);
    dw.setDisk('supA', d.A); dw.setDisk('supB', d.B);
    dw.setLabel('lsupA', V.add(d.A, [-0.5, 1.1]));
    dw.setLabel('lsupB', V.add(d.B, [0.5, 1.1]));

    // the plan, with the influence strip
    const pd = PLAN_D * MPU;
    dw.setPoly('planOut', [[AX, PLAN_Y], [BX, PLAN_Y], [BX, PLAN_Y - pd], [AX, PLAN_Y - pd]]);
    dw.setStrokes('planWalls', [[[AX, PLAN_Y], [AX, PLAN_Y - pd]], [[BX, PLAN_Y], [BX, PLAN_Y - pd]]]);
    const y0 = PLAN_Y - pd / 2 + (s.b * MPU) / 2, y1 = y0 - s.b * MPU;
    dw.setPoly('strip', [[AX, y0], [BX, y0], [BX, y1], [AX, y1]]);
    dw.setStrokes('stripEdge', [[[AX, y0], [BX, y0]], [[AX, y1], [BX, y1]]]);
    dw.setSeg('dimB', [BX + 1.0, y0], [BX + 1.0, y1]);
    dw.setLabel('lb', [BX + 2.6, (y0 + y1) / 2]);
    dw.setText('lb', `b = ${s.b} m`);
    dw.setLabel('lplan', [MX, PLAN_Y + 0.9]);
    dw.setLabel('lspan', [MX, PLAN_Y - pd - 1.2]);
    dw.setText('lspan', `l = ${SPAN} m`);

    // the two stacked load runs
    [['g', 3.0, s.gk], ['q', 4.4, s.qk]].forEach(([k, yy, val]) => {
      dw.setSeg(`bar${k}`, [AX, yy], [BX, yy]);
      dw.setStrokes(`arr${k}`, Array.from({ length: 14 }, (_, i) => {
        const x = AX + ((BX - AX) * i) / 13;
        return [[x, yy], [x, yy - 1.0]];
      }));
      dw.setLabel(`l${k}`, [AX + 4.0, yy + 0.62]);
      dw.setText(`l${k}`, `${k}_d = ${(val * (k === 'g' ? 1.35 : 1.5)).toFixed(2)} kN/m²`);
    });

    dw.setDashLine('chord', [[AX - 2.6, CHORD], [BX + 2.6, CHORD]]);
    dw.setLabel('lcs', [AX + 10.0, CHORD + 0.5]);
    dw.setDashLine('Rline', [[MX, 5.0], [MX, GY - 0.6]]);
    dw.setDashArrow('Rform', [MX, 2.6], [MX, 0.1]);
    dw.setLabel('lRform', [MX + 1.2, 1.5]);
    dw.setDashArrow('Rforce', d.T, d.Bo);
    dw.setLabel('lRforce', V.add(V.mid(d.T, d.Bo), [-2.0, 0]));

    const segs = [];
    for (let i = 0; i < NSEG; i++) segs.push([d.curve[i], d.curve[i + 1]]);
    dw.setStrokes('cable', segs);
    const nrm = d.curve.map((p, i) => V.unit(V.perp(
      V.sub(d.curve[Math.min(NSEG, i + 1)], d.curve[Math.max(0, i - 1)]))));
    const hw = d.curve.map((p, i) => s.sIF * d.Nat(i / NSEG));
    dw.setPoly('band', [...d.curve.map((p, i) => V.add(p, V.mul(nrm[i], hw[i]))),
                        ...d.curve.map((p, i) => V.sub(p, V.mul(nrm[i], hw[i]))).reverse()]);

    const ends = [d.A, d.B], rr = [d.T, d.Bo];
    for (let i = 0; i < 2; i++) {
      dw.setDashLine(`tan${i}`, [ends[i], d.I]);
      dw.setSeg(`ray${i}`, d.o, rr[i]);
      dw.setLabel(`lt${i}`, V.add(V.mid(ends[i], d.I), [0, -1.0]));
      dw.setLabel(`lr${i}`, V.add(V.mid(d.o, rr[i]), [2.2, i === 0 ? 0.9 : -0.9]));
    }
    dw.setDisk('ptI', d.I);
    dw.setDisk('ptO', d.o);
    dw.setLabel('lO', V.add(d.o, [1.4, 0.7]));

    const crownY = CHORD - d.f * MPU;
    dw.setDashLine('crownLine', [[AX + 0.6, crownY], [MX + 3.6, crownY]]);
    dw.setSeg('dimH2', [AX + 0.9, GY], [AX + 0.9, crownY]);
    dw.setLabel('lh', [AX + 2.6, GY + 0.6]);
    dw.setText('lh', `h = ${s.crown} m`);
    dw.setSeg('dimF', [MX + 3.0, CHORD], [MX + 3.0, crownY]);
    dw.setLabel('lF', [MX + 5.0, CHORD + 0.6]);
    dw.setText('lF', `f = ${d.f.toFixed(2)} m`);

    dw.setSeg('dimH', [d.T[0], d.T[1] + 1.7], [d.o[0], d.T[1] + 1.7]);
    dw.setLabel('lH', [(d.T[0] + d.o[0]) / 2, d.T[1] + 2.8]);
    dw.setText('lH', `H = ${d.H.toFixed(0)} kN`);

    const uA = V.unit(V.sub(d.A, d.I)), uB = V.unit(V.sub(d.B, d.I));
    const SYM = 3.6;
    dw.setArrow('reA', d.A, V.add(d.A, V.mul(uA, SYM)));
    dw.setArrow('reB', d.B, V.add(d.B, V.mul(uB, SYM)));
    dw.setLabel('lreA', V.add(V.add(d.A, V.mul(uA, SYM)), [-1.1, 0.9]));
    dw.setLabel('lreB', V.add(V.add(d.B, V.mul(uB, SYM)), [1.1, 0.9]));
    dw.setArrow('freA', d.o, d.T);
    dw.setArrow('freB', d.Bo, d.o);

    dw.setLabel('lgov', [MX, crownY - 1.6]);
    dw.setText('lgov', `N_max = ${d.N.toFixed(0)} kN`);

    // e) doubling the load leaves every direction alone and doubles the scale
    dw.setLabel('ldbl', [d.o[0] - 6.0, d.Bo[1] - 2.4]);
    dw.setText('ldbl', `× 2 load → same shape, every force doubled: ${(2 * d.N).toFixed(0)} kN`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const par = panel.section('Given');
  panel.slider(par, s, 'gk', 'g_k permanent (kN/m²)', 1, 10, 0.5, refresh);
  panel.slider(par, s, 'qk', 'q_k snow (kN/m²)', 0, 3, 0.1, refresh);
  panel.slider(par, s, 'b', 'wall spacing b (m)', 2, 10, 0.5, refresh);
  panel.toggle(par, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, s.sIF * 2.5, s.sIF / 20, refresh);
  panel.toggle(par, s, 'lbl', 'show labels', refresh);
  const des = panel.section('Your design');
  panel.slider(des, s, 'crown', 'lowest point above ground (m)', 6, 12.5, 0.1, refresh);

  refresh();
  return player;
}
