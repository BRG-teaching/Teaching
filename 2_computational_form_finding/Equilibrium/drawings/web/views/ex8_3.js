/**
 * EX 8 · Tasks 3 and 4 — Dimensioning, and the axial force proof
 * Structural Design II, FS 23 (sheet EX 8 "Frames", page 2).
 *
 * Task 3: "Dimension the reinforcement within the reinforced concrete for the
 * relevant tension force of task 2a). Use steel S235 to calculate the diameter
 * of the round steel cable and round the result off to mm. (Round up!)"
 *
 * Task 4: "Check whether the reinforcement in the reinforced concrete in task
 * 2b) can withstand the relevant tension force. The reinforcement has a round
 * section with a diameter of 18 mm and is made of steel S235."
 *
 * These are the same calculation run in opposite directions, which is why they
 * are one view. Task 3 has a force and wants a size; task 4 has a size and
 * wants a verdict. Both hang on one number from the compendium's formulary,
 *
 *     f_td = f_tk / γ_M = 235 / 1.05 = 223.8095 N/mm²   (S235)
 *
 * and on the tension forces that EX 8.2 derives:
 *
 *     task 2a)   N_d = 49.56 kN   element C–K, upper inner face, right half
 *     task 2b)   N_d = 34.64 kN   element C–O, top slab, right half
 *
 * TASK 3.  A_req = 49 562 / 223.8095 = 221.45 mm²
 *          D = 2·√(A/π) = 16.79 mm  →  17 mm, rounded UP as the sheet insists.
 *          A 17 mm bar gives 226.98 mm² and 50.80 kN, so it is 97.6 % used —
 *          and 16 mm gives only 45.00 kN, which fails. 17 mm is genuinely the
 *          first size that works, so the round-up is not a formality.
 *
 * TASK 4.  A_ef = 9²·π = 254.4690 mm², N_allow = 56.95 kN against N_d = 34.64,
 *          utilisation 60.8 % → PASSES, with 22.31 kN to spare.
 *
 * A NOTE ON THE TWO SHEETS. The English sheet says S235 in task 3; the German
 * one says S355. With S355 (f_td = 338.0952 N/mm²) the answer becomes
 * A_req = 146.59 mm², D = 13.66 → 14 mm. The view carries both, because a
 * student holding the German sheet is not wrong.
 *
 * AND WHY 18 mm.  The size task 4 hands you is not arbitrary: an 18 mm bar
 * also passes task 2a)'s larger 49.56 kN, at 87.0 %. One bar size covers both
 * frames, which is exactly how reinforcement is specified in practice.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

// compendium 2.6 "Formulary", Materialkennwerte
const STEEL = {
  S235: { ftk: 235, name: 'S235' },
  S355: { ftk: 355, name: 'S355' },
};
const GAM_M = 1.05;

// the two tension forces EX 8.2 derives, and where they sit
const CASE = [
  { tag: '3', title: 'dimension a bar for task 2a)',
    Nd: 49.562, where: 'element C–K, the upper inner face of the right half',
    from: '2a)', mode: 'design' },
  { tag: '4', title: 'check the 18 mm bar against task 2b)',
    Nd: 34.640, where: 'element C–O, the top slab of the right half',
    from: '2b)', mode: 'proof' },
];

const MPU = 1.0;
const BX = -17, BY = -3.0;            // the bar drawing
const BARLEN = 22;                    // drawing units, the bar's drawn length
const SCX = 9, SCY = -3.0;            // the circular section
const SECSCALE = 0.42;                // drawing units per mm of diameter

const DEFAULTS = {
  cse: 0,
  grade: 0,                           // 0 = S235 (English sheet) · 1 = S355 (German)
  Dgiven: 18,                         // mm, task 4's given bar
  Nd3: 49.562, Nd4: 34.640,           // kN, from EX 8.2 — adjustable
  lbl: true, _k: 99,
};

export const meta = {
  title: 'EX 8.3 + 8.4 — sizing the bar, and proving it',
  subtitle: 'Structural Design II · sheet EX 8 “Frames”, tasks 3 and 4',
  about: 'Task 3 has a force and wants a diameter; task 4 has a diameter and wants a verdict. They are the same calculation run in opposite directions, so they are one view here. Everything rests on one number out of the compendium’s formulary — the design strength of the steel, f_tk divided by 1.05 — and on the tension the frame corner of EX 8.2 has to carry. Switch between the two tasks, and switch the steel grade: the English sheet says S235 in task 3 and the German one says S355, which changes the answer from 17 mm to 14 mm.',
  result: (d) => (d.mode === 'design'
    ? [`task 3: N_d = ${d.Nd.toFixed(2)} kN in ${d.where}`,
       `f_td = ${d.ftk} / ${GAM_M} = ${d.ftd.toFixed(4)} N/mm² → A_req = ${d.Areq.toFixed(2)} mm²`,
       `D = 2√(A/π) = ${d.Dreq.toFixed(2)} mm → D = ${d.D} mm, rounded UP as the sheet asks`,
       `a ${d.D} mm bar carries ${d.Nall.toFixed(2)} kN (${(100 * d.util).toFixed(1)} % used); ${d.D - 1} mm would carry only ${d.Nprev.toFixed(2)} kN and fail`]
    : [`task 4: N_d = ${d.Nd.toFixed(2)} kN in ${d.where}`,
       `a ⌀${d.D} mm ${d.grade} bar: A_ef = ${d.Aef.toFixed(4)} mm², f_td = ${d.ftd.toFixed(4)} N/mm²`,
       `N_allow = ${d.Nall.toFixed(2)} kN ≥ N_d = ${d.Nd.toFixed(2)} kN`,
       `utilisation ${(100 * d.util).toFixed(1)} % → ${d.ok ? 'PASSES' : 'FAILS'}, with ${Math.abs(d.Nall - d.Nd).toFixed(2)} kN ${d.ok ? 'to spare' : 'short'}`]),
  frame: [[-24, -16], [24, 14]],
};

const STEPS = [
  { t: 'The exercise', d: 'EX 8 tasks 3 and 4: the frame corner of task 2 has to be reinforced, because concrete cannot carry the tension the redirection puts in it. Task 3 asks how big the bar must be; task 4 hands you a bar and asks whether it is big enough' },
  { t: 'Where the force comes from', d: 'not from this page. The tension is what EX 8.2’s redirected force flow produced, and the two tasks use different frames — task 3 uses case a), task 4 uses case b)',
    detail: (d) => [`${d.from} → N_d = ${d.Nd.toFixed(2)} kN`, d.where] },
  { t: 'The strength of the steel', d: 'one number, out of the compendium’s formulary. The characteristic strength divided by the material safety factor — and 1.05 is small because steel is a manufactured material whose strength is actually known',
    detail: (d) => [`${d.grade}: f_tk = ${d.ftk} N/mm² · γ_M = ${GAM_M}`,
                    `f_td = ${d.ftk} / ${GAM_M} = ${d.ftd.toFixed(4)} N/mm²`,
                    'switch the grade in the panel: the English sheet says S235 in task 3, the German one says S355'],
    take: 'a design strength is a characteristic strength that has been made pessimistic on purpose' },
  { t: 'Area, then diameter', d: (d) => (d.mode === 'design'
      ? 'divide the force by the stress the steel is allowed to carry, and that is the area you need. Then turn the area into a diameter — and round UP, because a bar you can buy comes in whole millimetres and rounding down would leave it overloaded'
      : 'this time the area is given. A round bar of 18 mm has an area of 254.47 mm², and multiplying by the design strength says how much it can carry'),
    detail: (d) => (d.mode === 'design'
      ? [`A_req = N_d / f_td = ${(d.Nd * 1000).toFixed(0)} / ${d.ftd.toFixed(4)} = ${d.Areq.toFixed(2)} mm²`,
         `D = 2√(A_req/π) = 2 × ${(d.Dreq / 2).toFixed(4)} = ${d.Dreq.toFixed(4)} mm`]
      : [`A_ef = (D/2)²·π = ${(d.D / 2).toFixed(0)}² · π = ${d.Aef.toFixed(4)} mm²`,
         `N_allow = f_td · A_ef = ${d.ftd.toFixed(4)} × ${d.Aef.toFixed(4)} = ${d.Nall.toFixed(2)} kN`]) },
  { t: (d) => (d.mode === 'design' ? 'The answer' : 'The verdict'),
    d: (d) => (d.mode === 'design'
      ? `round up to the whole millimetre: ${d.D} mm. Check it the other way round to see that the rounding matters — one millimetre less does not carry the load`
      : `compare, and say so plainly. N_d against N_allow, as a percentage`),
    detail: (d) => (d.mode === 'design'
      ? [`D = ${d.Dreq.toFixed(2)} mm → ${d.D} mm`,
         `${d.D} mm: A = ${d.Aef.toFixed(2)} mm² → ${d.Nall.toFixed(2)} kN ≥ ${d.Nd.toFixed(2)} kN ✓ (${(100 * d.util).toFixed(1)} % used)`,
         `${d.D - 1} mm: A = ${d.Aprev.toFixed(2)} mm² → ${d.Nprev.toFixed(2)} kN < ${d.Nd.toFixed(2)} kN ✗`]
      : [`N_d = ${d.Nd.toFixed(2)} kN · N_allow = ${d.Nall.toFixed(2)} kN`,
         `utilisation ${(100 * d.util).toFixed(1)} % → ${d.ok ? 'the bar is adequate' : 'the bar is NOT adequate'}`,
         `margin ${Math.abs(d.Nall - d.Nd).toFixed(2)} kN`]),
    take: (d) => (d.mode === 'design'
      ? 'round up. Rounding a diameter down is not conservative, it is wrong'
      : 'the same 18 mm bar also passes task 2a)’s bigger 49.56 kN, at 87 % — which is why the sheet chose that size') },
  { t: 'One bar, both frames', d: 'the two tasks are not independent. The 18 mm bar task 4 hands you is the smallest whole size that covers BOTH corners — 60.8 % used in case b), 87.0 % in case a). That is how reinforcement is actually specified: one size, checked against the worst case it will ever see',
    detail: (d) => [`case a) 49.56 kN → ⌀18 mm at ${(100 * 49.562 / d.N18).toFixed(1)} %`,
                    `case b) 34.64 kN → ⌀18 mm at ${(100 * 34.640 / d.N18).toFixed(1)} %`,
                    `task 3's own answer, ${d.mode === 'design' ? d.D : 17} mm, is the minimum for case a) alone`],
    take: 'dimensioning gives you a minimum; specifying gives you a size you can buy' },
];

function compute(s) {
  const C = CASE[Math.round(s.cse)];
  const G = s.grade ? STEEL.S355 : STEEL.S235;
  const ftd = G.ftk / GAM_M;                       // N/mm²
  const Nd = C.mode === 'design' ? s.Nd3 : s.Nd4;  // kN
  const Areq = (Nd * 1000) / ftd;                  // mm²
  const Dreq = 2 * Math.sqrt(Areq / Math.PI);      // mm
  // task 3 rounds UP to the whole millimetre; task 4 is handed its diameter
  const D = C.mode === 'design' ? Math.ceil(Dreq - 1e-9) : s.Dgiven;
  const Aef = Math.PI * (D / 2) ** 2;
  const Nall = (ftd * Aef) / 1000;                 // kN
  const Aprev = Math.PI * ((D - 1) / 2) ** 2;
  const Nprev = (ftd * Aprev) / 1000;
  const N18 = (ftd * Math.PI * 81) / 1000;
  return { ...C, grade: G.name, ftk: G.ftk, ftd, Nd, Areq, Dreq, D, Aef, Nall,
           Aprev, Nprev, N18, util: Nd / Nall, ok: Nall >= Nd };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow;

  const VERD = { final: (dd) => (dd.ok ? PAL.green : PAL.red) };

  dw.label('t_bar', 'the tie, and the bar that has to carry it', { cls: 'title', flash: false });
  dw.label('t_sec', 'the round section, drawn to size', { cls: 'title', flash: false });

  // the bar: a pink tie pulled at both ends
  dw.seg('bar', { intro: 1, w: dw.W.bar * 1.8, color: PAL.red });
  dw.arrow('pullL', { intro: 1, color: PAL.green, ...ARR });
  dw.arrow('pullR', { intro: 1, color: PAL.green, ...ARR });
  dw.label('lNd', '', { cls: 'num', intro: 1, color: PAL.red });
  dw.label('lwhere', '', { cls: 'point', intro: 1, flash: false, color: PAL.grey });

  // the strength, as a labelled bracket under the bar
  dw.seg('dimS', { intro: 2, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lftd', '', { cls: 'num', intro: 2, color: PAL.grey, flash: false });

  // the section: the required circle, and the bar actually chosen
  dw.circle('secReq', { intro: 3, w: dw.W.thin, color: PAL.grey });
  dw.dashedCircle('secGuide', { intro: 3, color: PAL.grey, dash: dw.W.dash });
  dw.circle('secD', { intro: 4, w: dw.W.bar, color: VERD });
  dw.label('lsecReq', '', { cls: 'num', intro: 3, color: PAL.grey, flash: false });
  dw.label('lsecD', '', { cls: 'num', intro: 4, color: VERD });
  dw.seg('dimD', { intro: 4, w: dw.W.dim, color: PAL.grey, flash: false });

  // the utilisation, as a bar that fills up
  dw.poly('utilBack', 4, { intro: 4, color: PAL.zeroBand, opacity: 1.0, flash: false });
  dw.poly('utilFill', 4, { intro: 4, opacity: 1.0, flash: false,
    color: { pending: PAL.zeroBand, final: (dd) => (dd.ok ? PAL.green : PAL.red) } });
  dw.strokes('utilEdge', 4, { intro: 4, w: dw.W.thin, color: PAL.black, flash: false });
  dw.label('lutil', '', { cls: 'num', intro: 4, color: VERD });
  dw.label('lutilc', 'how much of the bar is used', { cls: 'point', intro: 4,
    flash: false, color: PAL.grey });
  dw.label('lverdict', '', { cls: 'title', intro: 5, color: VERD });
  dw.label('lstep', '', { cls: 'point', intro: 5, flash: false, color: PAL.grey });

  dw.instant('t_bar', 't_sec');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    dw.setLabel('t_bar', [BX + BARLEN / 2, BY + 4.6]);
    dw.setLabel('t_sec', [SCX + 4, BY + 4.6]);

    const a = [BX, BY], b = [BX + BARLEN, BY];
    dw.setSeg('bar', a, b);
    dw.setArrow('pullL', [a[0] - 5.4, BY], [a[0] - 0.6, BY]);
    dw.setArrow('pullR', [b[0] + 5.4, BY], [b[0] + 0.6, BY]);
    dw.setLabel('lNd', [BX + BARLEN / 2, BY + 1.9]);
    dw.setText('lNd', `N_d = ${d.Nd.toFixed(2)} kN, tension`);
    dw.setLabel('lwhere', [BX + BARLEN / 2, BY - 2.0]);
    dw.setText('lwhere', `from task ${d.from} — ${d.where}`);

    dw.setSeg('dimS', [BX, BY - 4.2], [BX + BARLEN, BY - 4.2]);
    dw.setLabel('lftd', [BX + BARLEN / 2, BY - 5.6]);
    dw.setText('lftd', `${d.grade}: f_td = ${d.ftk} / ${GAM_M} = ${d.ftd.toFixed(2)} N/mm²`);

    // the two circles, concentric and to scale
    const c = [SCX, BY - 1.0];
    dw.setCircle('secReq', c, (d.Dreq * SECSCALE) / 2);
    dw.setDashedCircle('secGuide', c, (d.Dreq * SECSCALE) / 2);
    dw.setCircle('secD', c, (d.D * SECSCALE) / 2);
    dw.setLabel('lsecReq', V.add(c, [0, -(d.Dreq * SECSCALE) / 2 - 1.6]));
    dw.setText('lsecReq', `needed ⌀${d.Dreq.toFixed(2)} mm · A = ${d.Areq.toFixed(1)} mm²`);
    dw.setLabel('lsecD', V.add(c, [0, (d.D * SECSCALE) / 2 + 1.6]));
    dw.setText('lsecD', `${d.mode === 'design' ? 'chosen' : 'given'} ⌀${d.D} mm · A = ${d.Aef.toFixed(1)} mm²`);
    dw.setSeg('dimD', V.add(c, [-(d.D * SECSCALE) / 2, 0]), V.add(c, [(d.D * SECSCALE) / 2, 0]));

    // the utilisation bar
    const uw = 20, uh = 1.6, ux0 = BX, uy0 = BY - 6.4;
    const rect = (x0, x1) => [[x0, uy0], [x1, uy0], [x1, uy0 + uh], [x0, uy0 + uh]];
    dw.setPoly('utilBack', rect(ux0, ux0 + uw));
    dw.setPoly('utilFill', rect(ux0, ux0 + uw * Math.min(1.4, d.util)));
    const r = rect(ux0, ux0 + uw);
    dw.setStrokes('utilEdge', r.map((p, i) => [p, r[(i + 1) % 4]]));
    dw.setLabel('lutil', [ux0 + uw + 7.2, uy0 + uh / 2]);
    dw.setText('lutil', `${(100 * d.util).toFixed(1)} % of ${d.Nall.toFixed(2)} kN`);
    dw.setLabel('lutilc', [ux0 + uw / 2, uy0 + uh + 1.5]);

    dw.setLabel('lverdict', [SCX + 4, BY - 10.2]);
    dw.setText('lverdict', d.mode === 'design'
      ? `D = ${d.Dreq.toFixed(2)} → ⌀${d.D} mm`
      : (d.ok ? `PASSES — ${(100 * d.util).toFixed(1)} % utilised`
              : `FAILS — ${(100 * d.util).toFixed(1)} % utilised`));
    dw.setLabel('lstep', [SCX + 4, BY - 12.0]);
    dw.setText('lstep', d.mode === 'design'
      ? `one size down, ⌀${d.D - 1} mm, carries only ${d.Nprev.toFixed(2)} kN`
      : `⌀${d.D} mm also covers task 2a)'s ${(49.562).toFixed(2)} kN, at ${(100 * 49.562 / d.N18).toFixed(1)} %`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const t = panel.section('The task');
  panel.slider(t, s, 'cse', 'task', 0, 1, 1, refresh,
    (v) => `${CASE[Math.round(v)].tag}: ${CASE[Math.round(v)].title}`);
  panel.slider(t, s, 'grade', 'steel', 0, 1, 1, refresh,
    (v) => (v ? 'S355 (the German sheet)' : 'S235 (the English sheet)'));
  panel.toggle(t, s, 'lbl', 'show labels', refresh);
  const g = panel.section('Given');
  panel.slider(g, s, 'Nd3', 'task 3: N_d from case a) (kN)', 20, 90, 0.5, refresh);
  panel.slider(g, s, 'Nd4', 'task 4: N_d from case b) (kN)', 10, 80, 0.5, refresh);
  panel.slider(g, s, 'Dgiven', 'task 4: bar diameter (mm)', 8, 32, 1, refresh);

  refresh();
  return player;
}
