/**
 * EX 9 · Task 3 — Transferring vertical loads
 * Structural Design II, FS 23 (sheet EX 9 "Plates", page 2).
 *
 * "The plate is loaded by a dead area load of s̄k = 1 kN/m².
 *  a) Calculate the design value of the constant area load. Draw the relevant
 *     tributary area for one of the five beams (subsystem A) into the floor
 *     plan. Calculate the line load g_d over the relevant beam.
 *  b) Draw a possible internal force flow in the beam (subsystem A) for the
 *     line load found in a). Draw the corresponding force diagram. Indicate
 *     tension forces with red and compression forces with blue.
 *  c) The reaction forces from b) are the same for all five beams that support
 *     the plate. These are further transferred to two longitudinal beams
 *     (subsystem B). First draw the applied forces. Secondly, find an internal
 *     force flow in one of these longitudinal beams with the aid of the force
 *     diagram, considering that the maximum compression force is 310 kN.
 *     (Hint: In simple arch-cable structures, the elements at the supports are
 *     subjected to the maximum force.)"
 *
 * This is the sheet's real subject: one load, followed all the way down.
 *
 * GEOMETRY, digitised from page 2 (plan at 1:500, both form diagrams at 1:200):
 *   plate            25.00 × 15.00 m, 0.50 m thick
 *   subsystem A      five beams spanning the 15 m direction, at x = 2.5, 7.5,
 *                    12.5, 17.5 and 22.5 m — so 5.00 m apart and half a bay
 *                    from each end. 0.50 m wide, 2.542 m deep.
 *   subsystem B      two beams spanning the 25 m direction along the long
 *                    edges, centred 0.25 m in. 3.000 m deep.
 *   columns          0.50 m square at the four corners, centres (0.25, 0.25)
 *                    and so on.
 *
 * THE LOAD PATH, and every step of it checks against the same total:
 *
 *   s̄_d   = 1.35 × 1.00           = 1.350 kN/m²      (γ_G from compendium 2.6)
 *   S_tot = 1.350 × 25 × 15       = 506.25 kN
 *   one A beam takes 5.00 × 15.00 = 75.00 m² → g_d = 6.750 kN/m
 *                                            → 101.25 kN, and 5 × 101.25 = S_tot
 *   each A reaction               = 50.625 kN
 *   one B beam takes five of them = 253.125 kN, and 2 × 253.125 = S_tot
 *   each column                   = 126.5625 kN, and 4 × 126.5625 = S_tot
 *
 * and 126.5625 kN is also just a quarter of the plate, 12.5 × 7.5 × 1.35, which
 * is the check worth doing because it never went near a beam.
 *
 * TASK 3c IS A FORM-FINDING PROBLEM, not an analysis one. The 310 kN is given
 * and it fixes the pole:
 *
 *   N_supp = √(B² + H²) = 310  with B = 126.5625  →  H = 282.988 kN
 *   rise    f = M_max/H = 791.016 / 282.988      =  2.7952 m
 *
 * and 2.7952 m fits inside the 3.000 m beam with 0.205 m to spare — which is
 * the whole point. Ask for a smaller maximum force and the arch will not fit.
 * The view says where that limit is: below 292.474 kN the rise exceeds the
 * beam's depth and there is no solution.
 *
 * TWO THINGS THE SHEET GETS WRONG, both carried honestly here:
 *   - it contradicts itself by 0.25 m on where subsystem A is supported. Form
 *     diagram A puts the support apexes 14.00 m apart; the plan and form
 *     diagram B both say 14.50 m. The reactions are 50.625 kN either way
 *     (symmetry), so only the bending changes: 164.53 vs 177.19 kNm. Both are
 *     offered; the plan's 14.50 m is the default.
 *   - "the relevant tributary area for ONE of the five beams" implies one of
 *     them is worse than the others. None is: all five are 5.00 × 15.00 m.
 *
 * The sheet prints no answers. Everything above is derived.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

const GAM_G = 1.35;                   // compendium 2.6, dead load

const LX = 25.0, LY = 15.0;           // the plate, m
const NA = 5;                         // subsystem-A beams
const AX_M = [2.5, 7.5, 12.5, 17.5, 22.5];
const DEPA = 2.542, DEPB = 3.000;     // beam depths, m
const COL = 0.25;                     // column centre, in from the edge

const DEFAULTS = {
  sk: 1.0,                            // kN/m², characteristic
  Nmax: 310,                          // kN, the constraint in c)
  spanA: 1,                           // 0 = 14.00 m (form diagram A) · 1 = 14.50 m (the plan)
  stage: 2,                           // 0 = plate · 1 = subsystem A · 2 = subsystem B
  trib: true,
  lbl: true, _k: 99,
};

// plan, top-left
const PX = 2.5, PY = 12.4, PM = 0.50; // drawing units per metre in the plan
// the elevation of whichever subsystem is on show
const EX0 = -24, EY0 = -4.8, EM = 0.90;
const SFD = 24;                       // kN per drawing unit in the force diagram
const LLX = 15.0, LLY = 2.6;

export const meta = {
  title: 'EX 9.3 — one load, followed all the way down',
  subtitle: 'Structural Design II · sheet EX 9 “Plates”, task 3 a)–c)',
  about: 'A 25 by 15 metre floor slab carrying one kilonewton per square metre, and the question is what arrives at each of the four columns. The answer is a chain: area load to line load by tributary width, line load to point reactions, point reactions to the next beam down, and finally to the ground. Every rung of it has to add up to the same 506.25 kN, and the view checks that at each stage. Then task c) turns the exercise around: the biggest force is GIVEN, at 310 kN, and that single number fixes the shape of the beam’s internal arch. Drag it and watch the arch grow until it no longer fits.',
  result: (d) => [
    `a) s̄_d = ${GAM_G} × ${d.sk.toFixed(2)} = ${d.sd.toFixed(3)} kN/m² · one A beam takes ${d.bTrib.toFixed(2)} × ${LY.toFixed(2)} = ${d.aTrib.toFixed(2)} m² → g_d = ${d.gd.toFixed(3)} kN/m`,
    `b) that beam carries ${d.Ra2.toFixed(2)} kN and hands ${d.Ra.toFixed(3)} kN to each end (M_max = ${d.Mmax.toFixed(2)} kNm over the ${d.spanAm.toFixed(2)} m span)`,
    `c) each B beam takes five of those, ${d.Bload.toFixed(3)} kN, and each column ${d.Bcol.toFixed(4)} kN — four of which is ${(4 * d.Bcol).toFixed(2)} kN = the whole plate ✓`,
    d.fits
      ? `c) N_max = ${d.Nmax.toFixed(0)} kN → H = ${d.H.toFixed(3)} kN and a rise of ${d.rise.toFixed(4)} m, which fits inside the ${DEPB.toFixed(3)} m beam with ${(DEPB - d.rise).toFixed(3)} m to spare`
      : `c) N_max = ${d.Nmax.toFixed(0)} kN needs a rise of ${d.rise.toFixed(3)} m — MORE than the ${DEPB.toFixed(3)} m the beam has. No arch fits: the limit is ${d.NmaxMin.toFixed(2)} kN`],
  frame: [[-26, -22], [30, 16]],
};

const STAGE = ['the plate', 'subsystem A — five transverse beams', 'subsystem B — two longitudinal beams'];

const STEPS = [
  { t: 'The exercise', d: 'EX 9 task 3: a floor slab, a load per square metre, and the question of what actually arrives at each column. Follow it down one storey at a time' },
  { t: 'The structure', d: 'top left: the plan. A 25 by 15 metre plate rests on five transverse beams; those rest on two longitudinal beams along the long edges; those rest on four corner columns. Every load takes that route and no other',
    detail: () => [`plate ${LX} × ${LY} m, 0.50 m thick`,
                   `subsystem A: ${NA} beams at ${AX_M.join(', ')} m — ${AX_M[1] - AX_M[0]} m apart, half a bay from each end`,
                   `subsystem B: two beams on the long edges · four 0.50 m columns at the corners`] },
  { t: 'a) The design load', d: 'the sheet gives a characteristic load; design it up. Dead load, so ×1.35 — and then the total the whole floor has to deliver to the ground, which is the number everything below has to keep adding up to',
    detail: (d) => [`s̄_d = ${GAM_G} × ${d.sk.toFixed(2)} = ${d.sd.toFixed(3)} kN/m²`,
                    `S_tot = ${d.sd.toFixed(3)} × ${LX} × ${LY} = ${d.Stot.toFixed(2)} kN`],
    take: 'write the total down now — it is the only check you will have at every step afterwards' },
  { t: 'a) Tributary width', d: 'a beam picks up everything that is nearer to it than to its neighbours, so halve the distance either side. Here that is 2.5 m each way, and the two outer beams reach the plate edge exactly — so all five carry the same 5 metre strip',
    detail: (d) => [`b = ${d.bTrib.toFixed(3)} m → A_trib = ${d.bTrib.toFixed(2)} × ${LY.toFixed(2)} = ${d.aTrib.toFixed(2)} m²`,
                    `g_d = s̄_d × b = ${d.sd.toFixed(3)} × ${d.bTrib.toFixed(3)} = ${d.gd.toFixed(3)} kN/m`,
                    `5 × ${d.bTrib.toFixed(2)} = ${(5 * d.bTrib).toFixed(2)} m — the whole plate, no gap, no overlap ✓`],
    take: 'the sheet asks for “the relevant” beam as if one were worse than the others. None is' },
  { t: 'b) Subsystem A', d: 'left: one of the five beams, with its line load. It is symmetric, so each end takes half whatever the supports are — and a beam that deep does not bend, it makes a little arch inside itself: a compression chord over the top, a tie along the soffit, and two struts down to the supports',
    detail: (d) => [`total ${d.gd.toFixed(3)} × ${LY.toFixed(2)} = ${d.Ra2.toFixed(2)} kN → ${d.Ra.toFixed(3)} kN at each end`,
                    `M_max = ${d.Mmax.toFixed(2)} kNm over the ${d.spanAm.toFixed(2)} m span, and the beam is ${DEPA.toFixed(3)} m deep`,
                    `H = M/z = ${d.Ha.toFixed(2)} kN in the chord and the tie · struts ${d.Na.toFixed(2)} kN`],
    take: 'the sheet draws subsystem A’s supports 14.00 m apart and its own plan says 14.50 — switch it in the panel and watch only the bending change' },
  { t: 'c) What lands on subsystem B', d: 'left: the long beam, with the five A-beam reactions standing on it. They are all equal, and they are the only loads it sees — the plate never touches it',
    detail: (d) => [`five loads of ${d.Ra.toFixed(3)} kN at ${AX_M.join(', ')} m → ${d.Bload.toFixed(3)} kN per B beam`,
                    `2 × ${d.Bload.toFixed(3)} = ${(2 * d.Bload).toFixed(2)} kN = S_tot ✓`,
                    `reactions ${d.Bcol.toFixed(4)} kN at each end, over the ${d.spanB.toFixed(2)} m span`] },
  { t: 'c) The 310 kN fixes the shape', d: 'now the exercise turns around. The largest force is not something you find — it is given, and it decides the drawing. The element at the support carries the reaction vertically and the thrust horizontally, so one Pythagoras gives the thrust, the thrust gives the pole, and the pole gives the arch',
    detail: (d) => [`N_supp = √(B² + H²) = ${d.Nmax.toFixed(0)} with B = ${d.Bcol.toFixed(4)} → H = ${d.H.toFixed(3)} kN`,
                    `rise f = M_max / H = ${d.MmaxB.toFixed(3)} / ${d.H.toFixed(3)} = ${d.rise.toFixed(4)} m`,
                    d.fits ? `and the beam is ${DEPB.toFixed(3)} m deep, so it fits with ${(DEPB - d.rise).toFixed(3)} m to spare`
                           : `but the beam is only ${DEPB.toFixed(3)} m deep — it does NOT fit`],
    take: 'a bigger allowable force means a flatter arch. Drag N_max down and watch the arch grow out through the top of the beam' },
  { t: 'c) The chords', d: 'every segment carries the same horizontal thrust and its own panel’s shear, so the steepest segment — the one at the support — is the largest. That is the hint the sheet gives, and it is why the constraint could be applied there',
    detail: (d) => [d.N.map((n, i) => `panel ${i + 1}: ${n.toFixed(2)}`).join(' · ') + ' kN compression',
                    `tie along the soffit: ${d.H.toFixed(3)} kN tension, constant`,
                    `vertical struts under each load: ${d.Ra.toFixed(3)} kN each`] },
  { t: 'Everything, checked', d: 'the same 506.25 kN at every level. That is the only reason to trust any of it — a load path that does not conserve its total has a mistake in it somewhere, and this is how you find out',
    detail: (d) => [`plate     ${d.Stot.toFixed(2)} kN`,
                    `subsystem A  5 × ${d.Ra2.toFixed(2)} = ${(5 * d.Ra2).toFixed(2)} kN`,
                    `subsystem B  2 × ${d.Bload.toFixed(3)} = ${(2 * d.Bload).toFixed(2)} kN`,
                    `columns      4 × ${d.Bcol.toFixed(4)} = ${(4 * d.Bcol).toFixed(2)} kN`,
                    `and a quarter of the plate directly: ${(LX / 2).toFixed(2)} × ${(LY / 2).toFixed(2)} × ${d.sd.toFixed(3)} = ${(d.sd * LX * LY / 4).toFixed(4)} kN — the same number without going near a beam`],
    take: 'the check that costs nothing is the one that never used the structure' },
];

function compute(s) {
  const sd = GAM_G * s.sk;
  const Stot = sd * LX * LY;
  const bTrib = AX_M[1] - AX_M[0];
  const aTrib = bTrib * LY;
  const gd = sd * bTrib;
  const Ra2 = gd * LY;
  const Ra = Ra2 / 2;

  // subsystem A: the sheet draws 14.00 m, its own plan says 14.50 m
  const spanAm = s.spanA ? 14.5 : 14.0;
  const over = (LY - spanAm) / 2;                  // the cantilever at each end
  const Mmax = Ra * (spanAm / 2) - (gd * (LY / 2) ** 2) / 2;
  const Ha = Mmax / DEPA;
  const Na = Math.hypot(Ra, Ha);

  // subsystem B
  const Bload = NA * Ra;
  const spanB = LX - 2 * COL;
  const Bcol = Bload / 2;
  // moments under the five point loads, measured from the left support
  const xs = AX_M.map((x) => x - COL);
  const Mat = (a) => {
    let M = Bcol * a;
    for (const x of xs) if (x < a - 1e-9) M -= Ra * (a - x);
    return M;
  };
  const MmaxB = Math.max(...xs.map(Mat));
  // the constraint fixes the thrust, and the thrust fixes the rise
  const H = Math.sqrt(Math.max(s.Nmax ** 2 - Bcol ** 2, 1e-6));
  const rise = MmaxB / H;
  const fits = rise <= DEPB + 1e-9;
  // the smallest N_max whose arch still fits inside the beam
  const Hmin = MmaxB / DEPB;
  const NmaxMin = Math.hypot(Bcol, Hmin);
  // chord forces, panel by panel
  const shear = [];
  let V0 = Bcol;
  for (let i = 0; i <= NA; i++) { shear.push(V0); if (i < NA) V0 -= Ra; }
  const N = shear.map((v) => Math.hypot(H, v));
  // the thrust line: ordinates above the tie at every node
  const nodes = [[0, 0], ...xs.map((x) => [x, Mat(x) / H]), [spanB, 0]];

  return { sk: s.sk, sd, Stot, bTrib, aTrib, gd, Ra2, Ra,
           spanAm, over, Mmax, Ha, Na,
           Bload, spanB, Bcol, xs, MmaxB, Nmax: s.Nmax, H, rise, fits, NmaxMin,
           shear, N, nodes, stage: Math.round(s.stage) };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const px = (x, y) => [PX + x * PM, PY - y * PM];    // plan: +y downward
  const ex = (x, z) => [EX0 + x * EM, EY0 + z * EM];  // elevation: +z up

  const OK = { final: (dd) => (dd.fits ? PAL.green : PAL.red) };

  dw.label('t_plan', 'Grundriss 1:500 — floor plan', { cls: 'title', flash: false });
  dw.label('t_elev', '', { cls: 'title', flash: false });
  dw.label('t_force', 'Kräfteplan — force diagram', { cls: 'title', flash: false });

  // ---- the plan
  dw.strokes('plate', 4, { intro: 1, w: dw.W.str, color: PAL.black });
  for (let i = 0; i < NA; i++) {
    dw.dashLine(`abeam${i}`, { intro: 1, color: PAL.grey, dash: dw.W.dash });
  }
  dw.dashLine('bbeam0', { intro: 1, color: PAL.grey, dash: dw.W.dash });
  dw.dashLine('bbeam1', { intro: 1, color: PAL.grey, dash: dw.W.dash });
  for (let i = 0; i < 4; i++) dw.poly(`col${i}`, 4, { intro: 1, color: PAL.black, opacity: 1 });
  // the tributary strip of the middle A beam
  dw.poly('trib', 4, { intro: 3, color: PAL.green, opacity: 0.16, flash: false,
    when: (st) => st.trib });
  dw.strokes('tribEdge', 2, { intro: 3, w: dw.W.thin, color: PAL.green,
    when: (st) => st.trib });
  dw.label('ltrib', '', { cls: 'num', intro: 3, color: PAL.green, when: (st) => st.trib });

  // ---- the elevation of whichever subsystem is showing
  dw.strokes('bmOut', 4, { intro: 4, w: dw.W.str, color: PAL.black });
  dw.dashLine('bmPlate', { intro: 4, color: PAL.grey, dash: dw.W.dash });
  for (const n of ['L', 'R']) {
    dw.disk(`sup${n}`, { intro: 4, r: dw.W.disk });
    dw.strokes(`hat${n}`, 5, { intro: 4, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.arrow(`re${n}`, { intro: 5, color: PAL.green, ...NARR });
    dw.label(`lre${n}`, '', { cls: 'num', intro: 5, color: PAL.green });
  }
  // subsystem A's line load, subsystem B's five point loads
  dw.seg('qbar', { intro: 4, w: dw.W.thin, color: PAL.green,
    when: (st, dd) => !!dd && dd.stage === 1 });
  dw.arrows('qarr', 19, { intro: 4, w: dw.W.thin, color: PAL.green,
    headLen: dw.W.narrow.headLen * 0.8, headW: dw.W.narrow.headW * 0.8,
    when: (st, dd) => !!dd && dd.stage === 1 });
  dw.label('lq', '', { cls: 'num', intro: 4, color: PAL.green });
  for (let i = 0; i < NA; i++) {
    dw.arrow(`pf${i}`, { intro: 4, color: PAL.green, ...ARR,
      when: (st, dd) => !!dd && dd.stage === 2 });
    dw.label(`lpf${i}`, '', { cls: 'num', intro: 4, color: PAL.green,
      when: (st, dd) => !!dd && dd.stage === 2 && st.lbl });
  }

  // the internal arch: chord segments, the tie, and the struts
  for (let i = 0; i < NA + 1; i++) {
    dw.seg(`ch${i}`, { intro: 6, w: dw.W.bar, color: { pending: PAL.black, final: () => PAL.blue } });
    dw.label(`lch${i}`, '', { cls: 'num', intro: 7, color: PAL.blue, when: (st) => st.lbl });
  }
  dw.seg('tie', { intro: 6, w: dw.W.bar, color: { pending: PAL.black, final: () => PAL.red } });
  dw.label('ltie', '', { cls: 'num', intro: 6, color: PAL.red });
  for (let i = 0; i < NA; i++) {
    dw.seg(`str${i}`, { intro: 6, w: dw.W.thin, color: { pending: PAL.black, final: () => PAL.blue } });
  }
  dw.seg('dimF', { intro: 6, w: dw.W.dim, color: OK, flash: false });
  dw.label('lF', '', { cls: 'num', intro: 6, color: OK });

  // ---- the force diagram
  for (let i = 0; i < NA; i++) {
    dw.arrow(`ff${i}`, { intro: 5, color: PAL.green, ...NARR });
  }
  dw.label('lload', '', { cls: 'point', intro: 5, flash: false, color: PAL.green });
  dw.disk('ptO', { intro: 6, r: dw.W.disk * 0.8 });
  dw.label('lO', 'o', { cls: 'num', intro: 6, when: (st) => st.lbl });
  dw.seg('dimH', { intro: 6, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lH', '', { intro: 6, flash: false, color: PAL.grey });
  for (let i = 0; i < NA + 1; i++) {
    dw.seg(`ray${i}`, { intro: 6, w: dw.W.ray, color: PAL.blue });
    dw.link(`ch${i}`, `ray${i}`, `lch${i}`);
  }
  dw.label('lchain', '', { cls: 'point', intro: 8, flash: false, color: PAL.grey });

  dw.instant('t_plan', 't_elev', 't_force');
  dw.ghostable('ff0', 'ff1', 'ff2', 'ff3', 'ff4');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    dw.setLabel('t_plan', [PX + (LX / 2) * PM, PY + 1.6]);
    dw.setLabel('t_elev', [EX0 + (LX / 2) * EM, EY0 - 5.0]);
    dw.setText('t_elev', d.stage === 1
      ? `${STAGE[1]} — Ansicht 1:200, span ${d.spanAm.toFixed(2)} m`
      : `${STAGE[2]} — Ansicht 1:200, span ${d.spanB.toFixed(2)} m`);
    dw.setLabel('t_force', [LLX - 1, -15.6]);

    // --- plan
    const c = [px(0, 0), px(LX, 0), px(LX, LY), px(0, LY)];
    dw.setStrokes('plate', c.map((p, i) => [p, c[(i + 1) % 4]]));
    AX_M.forEach((x, i) => dw.setDashLine(`abeam${i}`, [px(x, 0), px(x, LY)]));
    dw.setDashLine('bbeam0', [px(0, COL), px(LX, COL)]);
    dw.setDashLine('bbeam1', [px(0, LY - COL), px(LX, LY - COL)]);
    [[COL, COL], [LX - COL, COL], [COL, LY - COL], [LX - COL, LY - COL]]
      .forEach(([x, y], i) => {
        const h = 0.25;
        dw.setPoly(`col${i}`, [px(x - h, y - h), px(x + h, y - h),
                               px(x + h, y + h), px(x - h, y + h)]);
      });
    // the tributary strip of the middle beam
    const t0 = AX_M[2] - d.bTrib / 2, t1 = AX_M[2] + d.bTrib / 2;
    dw.setPoly('trib', [px(t0, 0), px(t1, 0), px(t1, LY), px(t0, LY)]);
    dw.setStrokes('tribEdge', [[px(t0, 0), px(t0, LY)], [px(t1, 0), px(t1, LY)]]);
    dw.setLabel('ltrib', px(AX_M[2], LY / 2));
    dw.setText('ltrib', `${d.bTrib.toFixed(2)} × ${LY.toFixed(2)} = ${d.aTrib.toFixed(1)} m²`);

    // --- the elevation: subsystem A or B
    const A = d.stage === 1;
    const L = A ? LY : LX;
    const dep = A ? DEPA : DEPB;
    const sl = A ? (LY - d.spanAm) / 2 : COL;       // support inset
    const o = [c[0][0], 0];
    const eo = [EX0 + ((LX - L) / 2) * EM, EY0];
    const e = (x, z) => [eo[0] + x * EM, eo[1] + z * EM];
    const box = [e(0, 0), e(L, 0), e(L, dep), e(0, dep)];
    dw.setStrokes('bmOut', box.map((p, i) => [p, box[(i + 1) % 4]]));
    dw.setDashLine('bmPlate', [e(0, dep + 0.5), e(L, dep + 0.5)]);

    const SL = e(sl, 0), SR = e(L - sl, 0);
    dw.setDisk('supL', SL); dw.setDisk('supR', SR);
    for (const [n, p] of [['L', SL], ['R', SR]]) {
      dw.setStrokes(`hat${n}`, V.hatch([p[0] - 1.6, p[1] - 0.5],
        [p[0] + 1.6, p[1] - 0.5], -1, 0.9, 5));
    }
    const Rv = A ? d.Ra : d.Bcol;
    for (const [n, p] of [['L', SL], ['R', SR]]) {
      dw.setArrow(`re${n}`, [p[0], p[1] - 4.6], [p[0], p[1] - 1.0]);
      dw.setLabel(`lre${n}`, [p[0] + (n === 'L' ? -3.6 : 3.6), p[1] - 3.2]);
      dw.setText(`lre${n}`, `${Rv.toFixed(2)}`);
    }

    // the loads
    const qy = dep + 1.2;
    dw.setSeg('qbar', e(0, qy), e(L, qy));
    dw.setArrows('qarr', Array.from({ length: 19 }, (_, i) => {
      const x = (L * i) / 18;
      return [e(x, qy), e(x, dep + 0.35)];
    }));
    dw.setLabel('lq', A ? e(-1.0, qy + 0.9) : e(-1.6, dep + 2.4));
    dw.setText('lq', A ? `g_d = ${d.gd.toFixed(3)} kN/m` : `5 × ${d.Ra.toFixed(3)} kN`);
    AX_M.forEach((x, i) => {
      dw.setArrow(`pf${i}`, e(x, dep + 3.0), e(x, dep + 0.35));
      dw.setLabel(`lpf${i}`, e(x + 1.1, dep + 2.0));
      dw.setText(`lpf${i}`, `${d.Ra.toFixed(2)}`);
    });

    // the internal arch. Subsystem A's is the trapezoid the sheet is fishing
    // for: two struts up from the supports to the quarter points of the load,
    // a flat top chord between them. Subsystem B's is the funicular of the
    // five point loads, and its rise is what task c) constrains.
    let nd;
    if (A) {
      const q1 = L / 4, q2 = (3 * L) / 4;
      nd = [[sl, 0], [q1, DEPA], [q2, DEPA], [L - sl, 0]];
    } else {
      nd = d.nodes.map(([x, y]) => [x + sl, y]);
    }
    for (let i = 0; i < NA + 1; i++) {
      const a = nd[Math.min(i, nd.length - 2)];
      const b = nd[Math.min(i + 1, nd.length - 1)];
      dw.setSeg(`ch${i}`, e(a[0], a[1]), e(b[0], b[1]));
      const f = A ? (i === 1 ? d.Ha : d.Na) : d.N[Math.min(i, d.N.length - 1)];
      dw.setLabel(`lch${i}`, V.add(V.mid(e(a[0], a[1]), e(b[0], b[1])), [0, 1.4]));
      dw.setText(`lch${i}`, i < (A ? 3 : NA + 1) ? `${f.toFixed(1)}` : '');
    }
    dw.setSeg('tie', e(sl, 0), e(L - sl, 0));
    dw.setLabel('ltie', e(L / 2, -1.6));
    dw.setText('ltie', `tie ${(A ? d.Ha : d.H).toFixed(2)} kN tension`);
    for (let i = 0; i < NA; i++) {
      if (A) { dw.setSeg(`str${i}`, e(0, 0), e(0, 0)); continue; }
      const x = AX_M[i], y = d.nodes[i + 1][1];
      dw.setSeg(`str${i}`, e(x, dep), e(x, y));
    }
    // the rise, dimensioned against the depth the beam actually has
    const cx = A ? L / 2 : d.nodes[3][0] + sl;
    const cy = A ? DEPA : d.rise;
    dw.setSeg('dimF', e(cx + 0.6, 0), e(cx + 0.6, cy));
    dw.setLabel('lF', e(cx + 2.6, cy / 2));
    dw.setText('lF', A ? `z = ${DEPA.toFixed(3)} m`
      : `f = ${d.rise.toFixed(3)} m ${d.fits ? `in ${DEPB.toFixed(2)} m ✓` : `> ${DEPB.toFixed(2)} m ✗`}`);

    // --- the force diagram: the load line, the pole, the rays
    const T = [LLX, LLY];
    const tot = A ? d.Ra2 : d.Bload;
    const div = [T];
    for (let i = 0; i < NA; i++) div.push([LLX, div[i][1] - (A ? tot / NA : d.Ra) / SFD]);
    AX_M.forEach((x, i) => dw.setArrow(`ff${i}`, div[i], div[i + 1]));
    dw.setLabel('lload', [LLX + 3.4, (T[1] + div[NA][1]) / 2]);
    dw.setText('lload', `load line ${tot.toFixed(2)} kN`);
    const HH = A ? d.Ha : d.H;
    const po = [LLX - HH / SFD, T[1] - (A ? d.Ra : d.Bcol) / SFD];
    dw.setDisk('ptO', po);
    dw.setLabel('lO', V.add(po, [-1.4, 0.8]));
    dw.setSeg('dimH', [LLX, T[1] + 1.6], [po[0], T[1] + 1.6]);
    dw.setLabel('lH', [(LLX + po[0]) / 2, T[1] + 2.7]);
    dw.setText('lH', `H = ${HH.toFixed(2)} kN`);
    for (let i = 0; i < NA + 1; i++) {
      dw.setSeg(`ray${i}`, po, div[Math.min(i, NA)]);
    }
    dw.setLabel('lchain', [LLX - 1, -13.6]);
    dw.setText('lchain', `plate ${d.Stot.toFixed(1)} = 5 × ${d.Ra2.toFixed(2)} = 2 × ${d.Bload.toFixed(2)} = 4 × ${d.Bcol.toFixed(2)} kN`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const w = panel.section('What to look at');
  panel.slider(w, s, 'stage', 'subsystem', 1, 2, 1, refresh,
    (v) => (v < 2 ? 'A — one transverse beam' : 'B — one longitudinal beam'));
  panel.slider(w, s, 'spanA', 'subsystem A span', 0, 1, 1, refresh,
    (v) => (v ? '14.50 m (the plan)' : '14.00 m (form diagram A)'));
  panel.toggle(w, s, 'trib', 'show the tributary strip', refresh);
  panel.toggle(w, s, 'lbl', 'show labels', refresh);
  const g = panel.section('Given');
  panel.slider(g, s, 'sk', 's̄_k (kN/m²)', 0.5, 3.0, 0.1, refresh);
  panel.slider(g, s, 'Nmax', 'c) largest compression (kN)', 260, 500, 5, refresh);

  refresh();
  return player;
}
