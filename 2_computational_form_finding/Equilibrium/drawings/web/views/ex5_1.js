/**
 * EX 5 · Task 1 — Span
 * Structural Design I, HS 22 (sheet EX 5 "Arch-Cable", page 1).
 *
 * "Design the form of a possible structure for each of the given loading
 * cases and draw the corresponding force diagram. Pay attention to the
 * support conditions. Divide each reaction force in its horizontal and
 * vertical component. Finally, mark tension forces in red, compression forces
 * in blue and reaction forces in green."
 *
 * Digitised at the stated 1:100: every span is 198.44 pt = 7.000 m and both
 * supports are at the same level in all three cases. a) F_d = 70 kN at
 * midspan, PIN + PIN. b) the same load, but the left support is a ROLLER
 * (plain line under an un-hatched triangle, checked at 500 dpi). c) a roller
 * again, with q_d = 10 kN/m over the full 7 m — and 10 × 7 = 70 kN, the same
 * total as a) and b). The three cases are deliberately the same load.
 *
 * "Pay attention to the support conditions" is the whole exercise:
 *   a) both supports can take a horizontal force, so a bare arch or a bare
 *      cable works. The shape is free; the thrust follows from it,
 *      H = F·L/(4f) = 122.5/f kN.
 *   b) and c) a roller cannot take any horizontal force at all, and every
 *      applied load is vertical, so ΣH forces BOTH reactions to be purely
 *      vertical, 35 kN each. A bare arch is therefore impossible — the thrust
 *      has to be swallowed INSIDE the structure, by a tie between the two
 *      supports. Tie force = 122.5/f in b) and q·L²/(8f) = 61.25/f in c).
 *
 * The sheet prints no answers; these are derived. The reactions (35 kN each,
 * vertical in b and c) are robust whatever form the student picks — only the
 * internal arrangement is a design choice.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'EX 5.1 — the same load, three sets of supports',
  subtitle: 'Structural Design I · sheet EX 5 “Arch-Cable”, task 1 a)–c)',
  about: 'Seventy kilonewtons over seven metres, three times over — once as a point load between two pinned supports, once with one support on a roller, once spread out. The load never changes and neither do the vertical reactions. What changes is whether the supports will take a horizontal push at all: when they will not, the thrust has nowhere to go but inside the structure, and a tie appears. Switch the case and flip the structure between arch and cable.',
  result: (d) => [`${d.tag} vertical reactions ${d.Va.toFixed(1)} kN at each support`,
                  d.tied ? `the supports take NO horizontal force — the ${d.arch ? 'tie' : 'strut'} inside carries ${d.H.toFixed(1)} kN`
                         : `each support also takes ${d.H.toFixed(1)} kN horizontally → reaction ${d.N.toFixed(1)} kN`,
                  `${d.arch ? 'arch' : 'cable'} members: ${d.N.toFixed(1)} kN ${d.arch ? 'compression' : 'tension'}`],
  frame: [[-24, -17], [26, 19]],
};

const SPAN = 7;                       // m, digitised
const MPU = 1.9;
const AX = -19, AY = 0;
const SFD = 6;                        // kN per drawing unit
// The load line sits in the middle of the force-diagram area because the pole
// swings to the FAR SIDE of it from the loads -- left for the arch, right for
// the inverted cable. That is the only side on which the rays come out
// parallel to the members instead of mirrored; putting it on the near side
// mirrors the whole force diagram while leaving it looking perfectly normal.
// web/tools/regress/parallel.py --live enforces both cases.
const LLX = 12, LLY = 6;
const SYM = 3.2;
const NSEG = 20;

// a) pin + pin · b) roller + pin, same point load · c) roller + pin, line load
const SIT = [
  { tag: 'a)', tied: false, udl: false },
  { tag: 'b)', tied: true, udl: false },
  { tag: 'c)', tied: true, udl: true },
];

const DEFAULTS = {
  sit: 0,
  Fd: 70,                             // kN (a and b) — and q·L in c)
  f: 1.75,                            // m — the design choice
  arch: true,                         // arch above, or cable below
  o1: true, sIF: 0.02,
  lbl: true, _k: 99,
};

const SHAPED = 3;

const STEPS = [
  { t: 'The exercise', d: 'EX 5 task 1: design a structure for each load case and draw its force diagram. The instruction that matters is “pay attention to the support conditions”' },
  { t: 'What is given', d: 'left: a seven-metre span and 70 kN, every time. Only the supports and the way the load is spread change between the three cases',
    detail: (d, st) => [d.udl ? `c) q_d = ${(st.Fd / SPAN).toFixed(1)} kN/m over ${SPAN} m → ${st.Fd} kN in total`
                              : `${d.tag} F_d = ${st.Fd} kN at midspan`,
                        d.tied ? 'the LEFT support is a roller: it cannot take any horizontal force'
                               : 'a) both supports are pinned: either can take a horizontal force'] },
  { t: 'The load line', d: 'right: the load laid off. With everything vertical the reactions must add up to it, and by symmetry they share it equally',
    detail: (d) => [`ΣF = ${d.tot.toFixed(0)} kN → ${d.Va.toFixed(1)} kN at each support`] },
  { t: 'Choose the shape', d: 'left: pick how deep it goes and the members are drawn — up as an arch in compression, or down as a cable in tension. Right: the rays parallel to them meet at the pole, and the pole’s distance from the load line is the thrust',
    detail: (d, st) => [`${st.arch ? 'rise' : 'sag'} f = ${st.f.toFixed(2)} m → H = ${d.H.toFixed(1)} kN`,
                        `members: ${d.N.toFixed(1)} kN ${st.arch ? 'compression' : 'tension'}`],
    take: 'the shape is free; the thrust it needs is not' },
  { t: 'Where does the thrust go?', d: 'this is the question the support symbols answer. A pin can push back horizontally; a roller cannot. So in a) the thrust simply goes into the abutments — and in b) and c) it has nowhere external to go',
    detail: (d) => [d.tied ? `${d.tag} the roller gives ΣH = 0 → both reactions are purely VERTICAL, ${d.Va.toFixed(1)} kN`
                           : `a) each support takes ${d.H.toFixed(1)} kN horizontally as well as ${d.Va.toFixed(1)} kN vertically`] },
  { t: 'The tie appears', d: 'if the supports will not take the thrust, the structure has to take it itself: a member straight between the two supports, carrying exactly the thrust. An arch gets a tie in tension; a hanging cable gets a strut in compression',
    detail: (d, st) => [d.tied ? `the ${st.arch ? 'tie (tension, pink)' : 'strut (compression, blue)'} carries ${d.H.toFixed(1)} kN`
                               : 'a) needs no tie — but adding one would do no harm, it would simply take the thrust off the abutments'],
    take: 'a tied arch is an arch that has been made to pay for its own thrust' },
  { t: 'The reactions', d: 'left: green at the supports, and now visibly different between the cases — inclined in a), straight up in b) and c). Right: the same vectors closing the force polygon',
    detail: (d) => [d.tied ? `${d.tag} A = B = ${d.Va.toFixed(1)} kN, vertical`
                           : `a) A = B = ${d.N.toFixed(1)} kN, inclined at ${d.ang.toFixed(1)}° above the horizontal`,
                    `the vertical part is ${d.Va.toFixed(1)} kN in every case — the supports cannot argue with the load`] },
  { t: 'What it cost', d: 'drag the depth. A shallow structure needs a big thrust whichever case you are in; the only difference is who pays for it — the ground, or a tie you have to build and detail',
    detail: (d, st) => [`at f = ${st.f.toFixed(2)} m: H = ${d.H.toFixed(1)} kN, members ${d.N.toFixed(1)} kN`,
                        `halve the depth and both double`],
    take: 'support conditions are not a detail at the end — they decide what the structure has to be' },
];

function compute(s) {
  const S = SIT[Math.round(s.sit)];
  const tot = s.Fd;
  const Va = tot / 2;
  // point load at midspan: H = F·L/(4f); uniform load: H = q·L²/(8f) — the
  // same thing, since q·L = F
  const H = S.udl ? (tot * SPAN) / (8 * s.f) : (tot * SPAN) / (4 * s.f);
  const N = Math.hypot(H, Va);
  const ang = (Math.atan2(Va, H) * 180) / Math.PI;
  const sgn = s.arch ? 1 : -1;
  const A = [AX, AY], B = [AX + SPAN * MPU, AY];
  // the form: two straight members, or a parabola under the uniform load
  let pts;
  if (S.udl) {
    pts = Array.from({ length: NSEG + 1 }, (_, i) => {
      const u = i / NSEG;
      return [AX + SPAN * MPU * u, AY + sgn * 4 * s.f * MPU * u * (1 - u)];
    });
  } else {
    pts = [A, [AX + (SPAN / 2) * MPU, AY + sgn * s.f * MPU], B];
  }
  const Nat = (u) => (S.udl ? Math.hypot(H, tot * (0.5 - u)) : N);
  // force diagram
  const T = [LLX, LLY], Bo = [LLX, LLY - tot / SFD];
  const o = [LLX - sgn * H / SFD, LLY - Va / SFD];
  return { ...S, tot, Va, H, N, ang, pts, Nat, A, B, T, Bo, o, arch: s.arch, f: s.f };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  s.sIF = dw.bandScale(compute(s).N);
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const MEM = { pending: PAL.black,
    final: (dd, st) => (st._k < SHAPED ? PAL.grey : st.arch ? PAL.blue : PAL.red) };
  const BAND = { pending: PAL.zeroBand,
    final: (dd, st) => (st._k < SHAPED ? PAL.zeroBand : st.arch ? PAL.blueBand : PAL.redBand) };
  // the tie does the opposite of whatever the members do
  const TIE = { pending: PAL.black,
    final: (dd, st) => (st.arch ? PAL.red : PAL.blue) };

  dw.label('form_title', 'Lageplan 1:100 — form diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Kräfteplan — force diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });

  for (const n of ['A', 'B']) {
    dw.disk(`sup${n}`, { intro: 1, r: dw.W.disk });
    dw.label(`lsup${n}`, n, { cls: 'num', intro: 1, when: (st) => st.lbl });
    dw.strokes(`hat${n}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  }
  // the roller's plain line under support A in cases b) and c)
  dw.seg('roller', { intro: 1, w: dw.W.thin, color: PAL.grey, flash: false,
    when: (st, dd) => !!dd && dd.tied });
  dw.dashLine('chord', { intro: 1, color: PAL.grey, dash: dw.W.dash });
  // the load: one arrow, or a run of them
  dw.arrow('fPt', { intro: 1, color: PAL.green, ...ARR, when: (st, dd) => !!dd && !dd.udl });
  dw.label('lfPt', '', { cls: 'num', intro: 1, color: PAL.green, when: (st, dd) => !!dd && !dd.udl });
  dw.dashLine('la', { intro: 1, color: PAL.grey, dash: dw.W.dash, when: (st, dd) => !!dd && !dd.udl });
  dw.seg('qbar', { intro: 1, w: dw.W.thin, color: PAL.green, when: (st, dd) => !!dd && dd.udl });
  dw.arrows('qarr', 15, { intro: 1, w: dw.W.thin, color: PAL.green, when: (st, dd) => !!dd && dd.udl,
    headLen: dw.W.narrow.headLen * 0.8, headW: dw.W.narrow.headW * 0.8 });
  dw.label('lq', '', { cls: 'num', intro: 1, color: PAL.green, when: (st, dd) => !!dd && dd.udl });

  dw.arrow('ffL', { intro: 2, color: PAL.green, ...ARR });
  dw.label('lffL', '', { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.lbl });
  dw.link('fPt', 'ffL', 'lfPt', 'lffL');

  dw.poly('band', 2 * (NSEG + 1), { intro: SHAPED, opacity: 1.0, z: -0.18, flash: false,
    color: BAND, when: (st) => st.o1 });
  dw.strokes('mem', NSEG, { intro: SHAPED, w: dw.W.bar, color: MEM });
  dw.seg('ray1', { intro: SHAPED, w: dw.W.bar, color: MEM });
  dw.seg('ray2', { intro: SHAPED, w: dw.W.bar, color: MEM });
  dw.disk('ptO', { intro: SHAPED, r: dw.W.disk * 0.8 });
  dw.label('lO', 'o', { cls: 'num', intro: SHAPED, when: (st) => st.lbl });
  dw.seg('dimH', { intro: SHAPED, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lH', '', { intro: SHAPED, flash: false, color: PAL.grey });
  dw.seg('dimF', { intro: SHAPED, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lF', '', { intro: SHAPED, flash: false, color: PAL.grey });

  // the tie / strut, only where the supports refuse the thrust
  dw.seg('tie', { intro: 5, w: dw.W.bar, color: TIE, when: (st, dd) => !!dd && dd.tied });
  dw.poly('tieBand', 4, { intro: 5, opacity: 1.0, z: -0.18, flash: false,
    when: (st, dd) => !!dd && dd.tied && st.o1,
    color: { pending: PAL.zeroBand, final: (dd, st) => (st.arch ? PAL.redBand : PAL.blueBand) } });
  dw.label('ltie', '', { cls: 'num', intro: 5, flash: false, color: TIE,
    when: (st, dd) => !!dd && dd.tied });
  dw.seg('tieF', { intro: 5, w: dw.W.bar, color: TIE, when: (st, dd) => !!dd && dd.tied });

  for (const n of ['A', 'B']) {
    dw.arrow(`re${n}`, { intro: 6, color: PAL.green, ...NARR });
    dw.arrow(`fre${n}`, { intro: 6, color: PAL.green, ...NARR });
    dw.label(`lre${n}`, '', { cls: 'num', intro: 6, color: PAL.green });
    dw.link(`re${n}`, `fre${n}`, `lre${n}`);
  }
  dw.label('lgov', '', { cls: 'num', intro: 7, flash: false, color: MEM });

  dw.instant('form_title', 'force_title', 'force_sub');
  dw.ghostable('ffL', 'ray1', 'ray2', 'freA', 'freB');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    // each title under its own diagram, clear of the caption and RESULT cards
    dw.setLabel('form_title', [-12.35, -9.5]);
    dw.setLabel('force_title', [12, -9.5]);
    dw.setLabel('force_sub', [12, -11.0]);
    dw.setText('force_sub', `to scale · 1 unit ≙ ${SFD} kN  (sheet: 1 cm ≙ 10 kN)`);

    dw.setDisk('supA', d.A); dw.setDisk('supB', d.B);
    dw.setLabel('lsupA', V.add(d.A, [-1.6, -1.0]));
    dw.setLabel('lsupB', V.add(d.B, [1.6, -1.0]));
    for (const [n, p] of [['A', d.A], ['B', d.B]]) {
      const y = p[1] - (n === 'A' && d.tied ? 1.5 : 0.5);
      dw.setStrokes(`hat${n}`, V.hatch([p[0] - 1.9, y], [p[0] + 1.9, y], -1, 1.0, 5));
    }
    dw.setSeg('roller', [d.A[0] - 1.9, d.A[1] - 1.2], [d.A[0] + 1.9, d.A[1] - 1.2]);
    dw.setDashLine('chord', [V.add(d.A, [-2.6, 0]), V.add(d.B, [2.6, 0])]);

    const MX = (d.A[0] + d.B[0]) / 2;
    const lowest = Math.min(...d.pts.map((p) => p[1]));
    const highest = Math.max(...d.pts.map((p) => p[1]));
    const qy = highest + 3.0;
    dw.setDashLine('la', [[MX, qy + 1.2], [MX, lowest - 2.2]]);
    dw.setArrow('fPt', [MX, qy], [MX, qy - SYM]);
    dw.setLabel('lfPt', [MX + 2.4, qy - SYM * 0.5]);
    dw.setText('lfPt', `F_d = ${d.tot.toFixed(0)} kN`);
    dw.setSeg('qbar', [d.A[0], qy], [d.B[0], qy]);
    dw.setArrows('qarr', Array.from({ length: 15 }, (_, i) => {
      const x = d.A[0] + ((d.B[0] - d.A[0]) * i) / 14;
      return [[x, qy], [x, qy - 1.1]];
    }));
    dw.setLabel('lq', [d.A[0] - 4.0, qy]);
    dw.setText('lq', `q_d = ${(d.tot / SPAN).toFixed(1)} kN/m`);

    dw.setArrow('ffL', d.T, d.Bo);
    dw.setLabel('lffL', V.add(V.mid(d.T, d.Bo), [-2.4, 0]));

    // the members: a polyline of NSEG pieces either way, so one code path
    const P = d.pts.length === 3
      ? Array.from({ length: NSEG + 1 }, (_, i) => {
        const u = i / NSEG;
        return u <= 0.5
          ? V.add(d.pts[0], V.mul(V.sub(d.pts[1], d.pts[0]), u * 2))
          : V.add(d.pts[1], V.mul(V.sub(d.pts[2], d.pts[1]), (u - 0.5) * 2));
      })
      : d.pts;
    dw.setStrokes('mem', Array.from({ length: NSEG }, (_, i) => [P[i], P[i + 1]]));
    const nrm = P.map((p, i) => V.unit(V.perp(
      V.sub(P[Math.min(NSEG, i + 1)], P[Math.max(0, i - 1)]))));
    const hw = P.map((p, i) => s.sIF * d.Nat(i / NSEG));
    dw.setPoly('band', [...P.map((p, i) => V.add(p, V.mul(nrm[i], hw[i]))),
                        ...P.map((p, i) => V.sub(p, V.mul(nrm[i], hw[i]))).reverse()]);

    dw.setDisk('ptO', d.o);
    dw.setLabel('lO', V.add(d.o, [1.4, 0.7]));
    dw.setSeg('ray1', d.T, d.o);
    dw.setSeg('ray2', d.o, d.Bo);
    dw.setSeg('dimH', [LLX, d.T[1] + 1.7], [d.o[0], d.T[1] + 1.7]);
    dw.setLabel('lH', [(LLX + d.o[0]) / 2, d.T[1] + 2.8]);
    dw.setText('lH', `H = ${d.H.toFixed(1)} kN`);
    const apex = d.arch ? highest : lowest;
    dw.setSeg('dimF', [MX + 1.2, AY], [MX + 1.2, apex]);
    dw.setLabel('lF', [MX + 3.6, (AY + apex) / 2]);
    dw.setText('lF', `f = ${d.f.toFixed(2)} m`);

    // the tie, drawn along the chord, and its own bar in the force diagram
    dw.setSeg('tie', d.A, d.B);
    dw.setPoly('tieBand', V.rectPoints(d.A, d.B, s.sIF * d.H));
    dw.setLabel('ltie', [MX, AY - 2.6]);
    dw.setText('ltie', `${d.arch ? 'tie' : 'strut'} ${d.H.toFixed(1)} kN`);
    dw.setSeg('tieF', [d.o[0], d.o[1]], [LLX, d.o[1]]);

    // the reactions
    // An arch PUSHES its abutments apart, so the support pushes back INWARD:
    // up-and-right at A, up-and-left at B. A cable pulls them together, so its
    // reactions lean the other way. Both were reversed here.
    const sg = d.arch ? 1 : -1;
    const uA = d.tied ? [0, 1] : V.unit([sg * d.H, d.Va]);
    const uB = d.tied ? [0, 1] : V.unit([-sg * d.H, d.Va]);
    dw.setArrow('reA', V.sub(d.A, V.mul(uA, SYM)), d.A);
    dw.setArrow('reB', V.sub(d.B, V.mul(uB, SYM)), d.B);
    dw.setLabel('lreA', V.add(V.sub(d.A, V.mul(uA, SYM)), [-2.6, -0.4]));
    dw.setLabel('lreB', V.add(V.sub(d.B, V.mul(uB, SYM)), [2.6, -0.4]));
    dw.setText('lreA', `A = ${(d.tied ? d.Va : d.N).toFixed(1)}`);
    dw.setText('lreB', `B = ${(d.tied ? d.Va : d.N).toFixed(1)}`);
    if (d.tied) {
      dw.setArrow('freA', [d.o[0], d.Bo[1]], [d.o[0], d.T[1] - d.Va / SFD]);
      dw.setArrow('freB', [d.o[0], d.T[1] - d.Va / SFD], [d.o[0], d.T[1]]);
    } else {
      dw.setArrow('freA', d.o, d.T);
      dw.setArrow('freB', d.Bo, d.o);
    }

    dw.setLabel('lgov', [MX, apex + (d.arch ? 1.8 : -1.8)]);
    dw.setText('lgov', `${d.N.toFixed(1)} kN`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const cas = panel.section('The case');
  panel.slider(cas, s, 'sit', 'situation', 0, 2, 1, refresh,
    (v) => ['a) pin + pin', 'b) roller + pin', 'c) roller + pin, line load'][Math.round(v)]);
  panel.toggle(cas, s, 'arch', 'arch above (off: cable below)', refresh);
  panel.toggle(cas, s, 'lbl', 'show labels', refresh);
  const des = panel.section('Your design');
  panel.slider(des, s, 'f', 'depth f (m)', 0.6, 3.5, 0.05, refresh);
  const giv = panel.section('Given');
  panel.slider(giv, s, 'Fd', 'total load (kN)', 20, 140, 5, refresh);
  panel.toggle(giv, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
  panel.slider(giv, s, 'sIF', 'scale internal forces', 0, s.sIF * 2.5, s.sIF / 20, refresh);

  refresh();
  return player;
}
