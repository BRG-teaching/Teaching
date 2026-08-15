/**
 * EX 4 · Task 2 — Support Reactions in Arch Structures
 * Structural Design I, HS 22 (sheet EX 4 "Arch structures", page 2).
 *
 * "There are three situations below. Consider in each case the designed line
 * load of g_d = 4 kN/m.
 *   a) Two arches are placed next to each other. Use graphic statics to find
 *      all the reaction forces (A-C) and draw the force diagram.
 *   b) Find again the force diagram.
 *   c) How does the reaction force B change from case a) to b)?
 *   d) The support B only allows a vertical reaction force. Find the form of
 *      the missing arch with help of the force diagram so that the thrust of
 *      both arches are cancelling each other out in support B."
 *
 * Digitised from the sheet at its stated 1:200 (1 pt = 0.070556 m). The load
 * bar is 340.17 pt = 24.000 m in all three situations, and the arches are
 * true parabolas (at an eighth of the span the drawn drop is 0.4374 of the
 * rise against 0.4375 exact). Situation a) is 12.000 + 12.000 m, both rising
 * 3.000 m; b) and d) are 14.000 + 10.000 m, the drawn arches rising 3.000 m.
 * In d) support B is a roller — the sheet draws it un-hatched with a plain
 * line below and prints an upward reaction arrow at it — and the right arch
 * alone is given; the left one is the answer.
 *
 * The sheet prints no numbers at all, so everything here is derived. For a
 * parabolic arch under a uniform load, H = qL²/(8f) and V = qL/2:
 *   a) H = 24.00 kN both sides → A = C = 33.94 kN at 45°, B = 48.00 kN and
 *      purely VERTICAL, because the two equal thrusts cancel.
 *   b) H₁ = 32.667, H₂ = 16.667 kN → A = 43.03, C = 26.03 kN, and B keeps its
 *      48.00 kN of vertical but gains 16.00 kN of horizontal: 50.60 kN,
 *      leaning 18.43° off vertical. That is the answer to c) — the vertical
 *      part never changed; the imbalance in thrust is the whole story.
 *   d) For the thrusts to cancel again the left arch must match the right
 *      one's H = 16.667 kN over a 14 m span, so f = qL²/(8H) = 5.880 m.
 *      Then A = 32.59, B = 48.00 vertical, C = 26.03 kN.
 * Every case checks out: ΣV = 96 kN = 4 kN/m × 24 m, and ΣH = 0.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'EX 4.2 — what the middle support of two arches feels',
  subtitle: 'Structural Design I · sheet EX 4 “Arch structures”, task 2 a)–d)',
  about: 'Two arches side by side on three supports, and the question is what the one in the middle has to resist. When the arches match, their thrusts cancel and the middle support only carries weight. Make the spans unequal and it starts being shoved sideways. Task d) turns that into a design rule: given a roller in the middle that cannot take any push at all, how deep does the other arch have to be? Step through the three situations in the panel.',
  result: (d) => [`${d.tag}  H₁ = ${d.H1.toFixed(2)} kN, H₂ = ${d.H2.toFixed(2)} kN`,
                  `A = ${d.RA.toFixed(2)} kN · B = ${d.RB.toFixed(2)} kN ${d.Bh === 0 ? '(vertical)' : `(${d.Btilt.toFixed(2)}° off vertical)`} · C = ${d.RC.toFixed(2)} kN`,
                  d.sit === 2 ? `d) the missing arch needs a rise of ${d.f1.toFixed(3)} m for the thrusts to cancel`
                              : `ΣV = ${(d.Av + d.Bv + d.Cv).toFixed(1)} kN = q·L ✓   ΣH = 0 ✓`],
  frame: [[-23, -19], [23, 16]],
};

const TOT = 24;                       // m, the full width
const MPU = 0.66;                     // drawing units per metre
const AX = -19, SPR = -3;             // support A, and the springing level
const Q = 4;                          // kN/m, given
const SFD = 7;                        // kN per drawing unit
const LLX = 5, LLY = 7;               // top of the load line
const NSEG = 20;

// the three situations: left span, right span, right rise, and whether the
// left arch is the ANSWER rather than a given
const SIT = [
  { tag: 'a)', L1: 12, L2: 12, f2: 3, solve: false },
  { tag: 'b)', L1: 14, L2: 10, f2: 3, solve: false },
  { tag: 'd)', L1: 14, L2: 10, f2: 3, solve: true },
];

const DEFAULTS = {
  sit: 0,
  f1: 3,                              // rise of the left arch (a and b)
  q: Q,
  o1: true, sIF: 0.02,
  lbl: true, _k: 99,
};

const SHAPED = 3;

const STEPS = [
  { t: 'The exercise', d: 'EX 4 task 2: two arches sharing a middle support, under one uniform load. What does that middle support actually have to resist?' },
  { t: 'What is given', d: 'left: 24 metres of load at 4 kN/m, carried by two parabolic arches on three supports. Switch between the three situations with the “situation” slider',
    detail: (d, st) => [`g_d = ${st.q} kN/m over ${TOT} m · spans ${d.L1} + ${d.L2} m · Lageplan 1:200`,
                        d.sit === 2 ? 'd) support B is a ROLLER — it can take no horizontal force at all' : 'all three supports pinned'] },
  { t: 'The load line', d: 'right: the whole 24 metres of load laid off, and divided where the arches divide — each arch carries the load standing over it, and nothing else',
    detail: (d) => [`total ${(d.q * TOT).toFixed(0)} kN, split ${(d.q * d.L1).toFixed(0)} / ${(d.q * d.L2).toFixed(0)} kN`] },
  { t: 'Each arch has its own pole', d: 'a parabola under a uniform load has one thrust, H = q·L²/(8f), and it is the same everywhere in that arch. So each arch gets its own pole, at its own distance from the load line',
    detail: (d) => [`H₁ = q·L₁²/(8f₁) = ${d.H1.toFixed(2)} kN · H₂ = ${d.H2.toFixed(2)} kN`,
                    d.sit === 2 ? 'd) the left arch is the unknown — its rise is set so that H₁ matches H₂'
                                : 'a shallow arch pushes harder: halve the rise and the thrust doubles'] },
  { t: 'The outer supports', d: 'left: A and C each take half their own arch’s load downward and the whole of its thrust sideways — an arch always pushes its abutments apart',
    detail: (d) => [`A: ${d.Av.toFixed(1)} kN vertical, ${d.H1.toFixed(2)} kN horizontal → ${d.RA.toFixed(2)} kN`,
                    `C: ${d.Cv.toFixed(1)} kN vertical, ${d.H2.toFixed(2)} kN horizontal → ${d.RC.toFixed(2)} kN`] },
  { t: 'The middle support', d: 'B carries half of each arch — but the two thrusts arrive pointing at each other, so what is left over is their DIFFERENCE. That is the whole answer to c)',
    detail: (d) => [`B vertical: ${(d.q * d.L1 / 2).toFixed(1)} + ${(d.q * d.L2 / 2).toFixed(1)} = ${d.Bv.toFixed(1)} kN — the same in every situation`,
                    `B horizontal: ${d.H2.toFixed(2)} − ${d.H1.toFixed(2)} = ${d.Bh.toFixed(2)} kN`,
                    `so B = ${d.RB.toFixed(2)} kN${d.Bh === 0 ? ', purely vertical' : `, leaning ${d.Btilt.toFixed(2)}° off vertical`}`],
    take: 'equal arches make a quiet middle support; unequal ones start shoving it sideways' },
  { t: 'c) How B changes from a) to b)', d: 'the vertical part does not move at all: 48 kN either way, because the total load and the span it sits over have not changed. What appears is a horizontal 16 kN, and B tilts',
    detail: () => ['a) H₁ = H₂ = 24.00 kN → B = 48.00 kN, vertical',
                   'b) H₁ = 32.67, H₂ = 16.67 kN → B = 50.60 kN, 18.43° off vertical',
                   'the change is +2.60 kN, i.e. +5.4 % — and a direction the support was not designed for'] },
  { t: 'd) Designing the thrust away', d: 'now the middle support is a roller: it cannot resist any horizontal force, so the two thrusts have to cancel exactly. The right arch is fixed, so its thrust sets the target and the left arch must be deep enough to match it',
    detail: (d) => [`H₂ = ${(Q * 100 / 24).toFixed(3)} kN is fixed by the 10 m arch`,
                    `f₁ = q·L₁²/(8·H₂) = 4·14²/(8·16.667) = 5.880 m — nearly twice as deep as the 3 m first guess`,
                    d.sit === 2 ? `the view is showing it: f₁ = ${d.f1.toFixed(3)} m, B is vertical` : 'switch the situation slider to d) to see it'],
    take: 'a support that refuses to be pushed is a design constraint on the shape, not a detail' },
];

function arch(L, f, q) {
  return { L, f, H: (q * L * L) / (8 * f), V: (q * L) / 2 };
}

function compute(s) {
  const S = SIT[Math.round(s.sit)];
  const q = s.q;
  const a2 = arch(S.L2, S.f2, q);
  // in d) the left arch's rise is whatever makes its thrust match the right one
  const f1 = S.solve ? (q * S.L1 * S.L1) / (8 * a2.H) : s.f1;
  const a1 = arch(S.L1, f1, q);
  const Av = a1.V, Cv = a2.V, Bv = a1.V + a2.V;
  const Bh = a2.H - a1.H;
  const RA = Math.hypot(a1.H, Av), RC = Math.hypot(a2.H, Cv);
  const RB = Math.hypot(Bh, Bv);
  const Btilt = (Math.atan2(Math.abs(Bh), Bv) * 180) / Math.PI;
  // form-diagram geometry
  const x0 = AX, xB = AX + S.L1 * MPU, xC = AX + TOT * MPU;
  const par = (xa, xb, f) => Array.from({ length: NSEG + 1 }, (_, i) => {
    const u = i / NSEG;
    return [xa + (xb - xa) * u, SPR + 4 * f * MPU * u * (1 - u)];
  });
  const c1 = par(x0, xB, f1), c2 = par(xB, xC, S.f2);
  // force diagram: one load line, split where the arches split
  const T = [LLX, LLY];
  const M = [LLX, LLY - (q * S.L1) / SFD];
  const Bo = [LLX, LLY - (q * TOT) / SFD];
  const o1 = [LLX + a1.H / SFD, (T[1] + M[1]) / 2];
  const o2 = [LLX + a2.H / SFD, (M[1] + Bo[1]) / 2];
  return { sit: Math.round(s.sit), tag: S.tag, L1: S.L1, L2: S.L2, q, f1, f2: S.f2,
           H1: a1.H, H2: a2.H, Av, Bv, Cv, Bh, RA, RB, RC, Btilt,
           x0, xB, xC, c1, c2, T, M, Bo, o1, o2, solve: S.solve };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  s.sIF = dw.bandScale(60);
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const ARC = { pending: PAL.black, final: (dd, st) => (st._k >= SHAPED ? PAL.blue : PAL.grey) };

  dw.label('form_title', 'Lageplan 1:200 — form diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Kräfteplan — force diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });

  dw.seg('ground', { intro: 1, w: dw.W.bar * 0.8, color: PAL.grey, flash: false });
  for (const n of ['A', 'B', 'C']) {
    dw.disk(`sup${n}`, { intro: 1, r: dw.W.disk });
    dw.label(`lsup${n}`, n, { cls: 'num', intro: 1, when: (st) => st.lbl });
    dw.strokes(`hat${n}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false,
      when: (st, dd) => !(n === 'B' && dd && dd.solve) });
    dw.dashLine(`drop${n}`, { intro: 1, color: PAL.grey, dash: dw.W.dash });
  }
  // d): the roller under B, drawn as the sheet draws it
  dw.seg('roll', { intro: 1, w: dw.W.thin, color: PAL.grey, flash: false,
    when: (st, dd) => !!dd && dd.solve });

  dw.seg('qbar', { intro: 1, w: dw.W.thin, color: PAL.green });
  dw.arrows('qarr', 25, { intro: 1, w: dw.W.thin, color: PAL.green,
    headLen: dw.W.narrow.headLen * 0.8, headW: dw.W.narrow.headW * 0.8 });
  dw.label('lq', '', { cls: 'num', intro: 1, color: PAL.green, when: (st) => st.lbl });

  for (const k of [0, 1]) {
    dw.arrow(`ff${k}`, { intro: 2, color: PAL.green, ...ARR });
    dw.label(`lff${k}`, '', { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.lbl });
    dw.disk(`ptO${k}`, { intro: 3, r: dw.W.disk * 0.8 });
    dw.label(`lO${k}`, `o${k + 1}`, { cls: 'num', intro: 3, when: (st) => st.lbl });
    dw.seg(`dimH${k}`, { intro: 3, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.label(`lH${k}`, '', { intro: 3, flash: false, color: PAL.grey });
    dw.poly(`band${k}`, 2 * (NSEG + 1), { intro: SHAPED, opacity: 1.0, z: -0.18,
      flash: false, color: { pending: PAL.zeroBand, final: () => PAL.blueBand },
      when: (st) => st.o1 });
    dw.strokes(`arc${k}`, NSEG, { intro: SHAPED, w: dw.W.bar, color: ARC });
    dw.seg(`dimF${k}`, { intro: SHAPED, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.label(`lF${k}`, '', { intro: SHAPED, flash: false, color: PAL.grey });
  }
  // the four reaction rays (two per arch) and the arrows at the supports
  for (const [nm, st] of [['A', 4], ['C', 4], ['B1', 5], ['B2', 5]]) {
    dw.seg(`ray${nm}`, { intro: st, w: dw.W.ray, color: PAL.green });
  }
  for (const [nm, st] of [['A', 4], ['C', 4], ['B', 5]]) {
    dw.arrow(`re${nm}`, { intro: st, color: PAL.green, ...NARR });
    dw.label(`lre${nm}`, '', { cls: 'num', intro: st, color: PAL.green });
  }
  dw.seg('bsum', { intro: 5, w: dw.W.bar, color: PAL.green, flash: false });
  dw.arrow('bres', { intro: 5, color: PAL.green, ...NARR });
  dw.label('lbres', '', { cls: 'num', intro: 5, flash: false, color: PAL.green });

  dw.instant('form_title', 'force_title', 'force_sub', 'ground');
  dw.ghostable('ff0', 'ff1');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    dw.setLabel('form_title', [3, -16.4]);
    dw.setLabel('force_title', [7, -14.4]);
    dw.setLabel('force_sub', [7, -15.8]);
    dw.setText('force_sub', `to scale · 1 unit ≙ ${SFD} kN  (sheet: 1 cm ≙ 10 kN)`);

    dw.setSeg('ground', [d.x0 - 3, SPR], [d.xC + 3, SPR]);
    const sup = { A: d.x0, B: d.xB, C: d.xC };
    for (const [n, x] of Object.entries(sup)) {
      dw.setDisk(`sup${n}`, [x, SPR]);
      dw.setLabel(`lsup${n}`, [x, SPR - 2.2]);
      dw.setStrokes(`hat${n}`, V.hatch([x - 1.8, SPR - 0.5], [x + 1.8, SPR - 0.5],
        -1, 0.95, 5));
      dw.setDashLine(`drop${n}`, [[x, 4.2], [x, SPR - 1.4]]);
    }
    dw.setSeg('roll', [d.xB - 1.8, SPR - 1.3], [d.xB + 1.8, SPR - 1.3]);

    const qy = 4.0;
    dw.setSeg('qbar', [d.x0, qy], [d.xC, qy]);
    dw.setArrows('qarr', Array.from({ length: 25 }, (_, i) => {
      const x = d.x0 + ((d.xC - d.x0) * i) / 24;
      return [[x, qy], [x, qy - 1.0]];
    }));
    dw.setLabel('lq', [d.x0 - 3.6, qy]);
    dw.setText('lq', `g_d = ${d.q} kN/m`);

    // the load line, split where the arches split
    dw.setArrow('ff0', d.T, d.M);
    dw.setArrow('ff1', d.M, d.Bo);
    dw.setLabel('lff0', V.add(V.mid(d.T, d.M), [-2.6, 0]));
    dw.setLabel('lff1', V.add(V.mid(d.M, d.Bo), [-2.6, 0]));
    dw.setText('lff0', `${(d.q * d.L1).toFixed(0)}`);
    dw.setText('lff1', `${(d.q * d.L2).toFixed(0)}`);

    const curves = [d.c1, d.c2], Hs = [d.H1, d.H2], fs = [d.f1, d.f2];
    const os = [d.o1, d.o2];
    const ends = [[d.T, d.M], [d.M, d.Bo]];
    for (const k of [0, 1]) {
      const c = curves[k];
      dw.setStrokes(`arc${k}`, Array.from({ length: NSEG }, (_, i) => [c[i], c[i + 1]]));
      const nrm = c.map((p, i) => V.unit(V.perp(
        V.sub(c[Math.min(NSEG, i + 1)], c[Math.max(0, i - 1)]))));
      // the band follows the real force: constant thrust, and a vertical part
      // that runs from +qL/2 at one springing through zero at the crown
      const span = k === 0 ? d.L1 : d.L2;
      const hw = c.map((p, i) => s.sIF * Math.hypot(Hs[k], d.q * span * (0.5 - i / NSEG)));
      dw.setPoly(`band${k}`, [...c.map((p, i) => V.add(p, V.mul(nrm[i], hw[i]))),
                              ...c.map((p, i) => V.sub(p, V.mul(nrm[i], hw[i]))).reverse()]);
      const mid = c[NSEG / 2];
      dw.setSeg(`dimF${k}`, [mid[0], SPR], [mid[0], mid[1]]);
      dw.setLabel(`lF${k}`, [mid[0] + 3.0, (SPR + mid[1]) / 2]);
      dw.setText(`lF${k}`, `f${k + 1} = ${fs[k].toFixed(2)} m`);

      dw.setDisk(`ptO${k}`, os[k]);
      dw.setLabel(`lO${k}`, V.add(os[k], [1.4, 0.7]));
      dw.setSeg(`dimH${k}`, [LLX, os[k][1]], os[k]);
      dw.setLabel(`lH${k}`, [(LLX + os[k][0]) / 2, os[k][1] + (k === 0 ? 1.3 : -1.3)]);
      dw.setText(`lH${k}`, `H${k + 1} = ${Hs[k].toFixed(1)}`);
    }

    // the reaction rays: each arch's two closing legs
    dw.setSeg('rayA', d.M, d.o1);          // A = up-and-right
    dw.setSeg('rayB1', d.o1, d.T);         // B from the left arch = up-and-left
    dw.setSeg('rayB2', d.Bo, d.o2);        // B from the right arch = up-and-right
    dw.setSeg('rayC', d.o2, d.M);          // C = up-and-left

    const SYM = 3.2;
    const dirA = V.unit([d.H1, d.Av]), dirC = V.unit([-d.H2, d.Cv]);
    const dirB = V.unit([d.Bh, d.Bv]);
    for (const [n, x, u, mag] of [['A', d.x0, dirA, d.RA], ['C', d.xC, dirC, d.RC],
                                  ['B', d.xB, dirB, d.RB]]) {
      dw.setArrow(`re${n}`, [x, SPR], V.add([x, SPR], V.mul(u, SYM)));
      dw.setLabel(`lre${n}`, V.add(V.add([x, SPR], V.mul(u, SYM)), [n === 'C' ? -2.6 : 2.6, 0.4]));
      dw.setText(`lre${n}`, `${n} = ${mag.toFixed(1)}`);
    }
    // B as the sum of the two arches' legs, drawn beside the polygon
    const base = [d.o1[0] + 6.5, d.M[1] + 3.0];
    const tip = V.add(base, [d.Bh / SFD, -d.Bv / SFD]);
    dw.setSeg('bsum', base, [base[0] + d.Bh / SFD, base[1]]);
    dw.setArrow('bres', base, tip);
    dw.setLabel('lbres', V.add(V.mid(base, tip), [2.8, 0]));
    dw.setText('lbres', `B = ${d.RB.toFixed(2)}`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const sit = panel.section('The situation');
  panel.slider(sit, s, 'sit', 'situation', 0, 2, 1, refresh,
    (v) => ['a) 12 + 12 m', 'b) 14 + 10 m', 'd) roller at B'][Math.round(v)]);
  panel.slider(sit, s, 'f1', 'rise of the left arch (m)', 1.5, 8, 0.02, refresh);
  panel.toggle(sit, s, 'lbl', 'show labels', refresh);
  const giv = panel.section('Given');
  panel.slider(giv, s, 'q', 'g_d (kN/m)', 1, 10, 0.5, refresh);
  panel.toggle(giv, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
  panel.slider(giv, s, 'sIF', 'scale internal forces', 0, s.sIF * 2.5, s.sIF / 20, refresh);

  refresh();
  return player;
}
