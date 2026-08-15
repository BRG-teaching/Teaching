/**
 * EX 7 · Tasks 1 and 2 — Internal force flow in a beam, qualitative then
 * quantitative.
 * Structural Design II, FS 23 (sheet EX 7 "Beams", pages 1 and 2).
 *
 * Task 1: "Five beams with the same loading case but with different support
 * conditions are given. Sketch a possible internal force flow for the beams a)
 * to e). Tip: For b), c) and d), divide the line load at the supports."
 *
 * Task 2: "Find the resultant(s) for each of the five beams and determine the
 * global equilibrium with the help of the force diagram. Starting at the
 * largest span width, draw the force diagrams to their internal force flow and
 * construct them neatly in the form diagram. Indicate tension forces with red,
 * compression forces with blue and reaction forces with green."
 *
 * The two tasks use the SAME five figures, so they are one view.
 *
 * Digitised at the stated 1:100: every beam is 283.4 pt = 10.000 m long and
 * 56.68 pt = 2.000 m deep, with g_d = 15 kN/m over the full length — 150 kN on
 * each. Only the supports change:
 *   a) pin at 0.00, roller at 10.00     b) pin at 0.00, roller at 7.50
 *   c) a SINGLE pin at 5.00             d) pin at 0.00, roller at 4.00
 *   e) against a wall: PIN at the TOP of the left face, ROLLER at the bottom —
 *      note this is the mirror of EX 6's cantilever, where the pin is at the
 *      bottom.
 *
 * The sheet prints no answers. Derived, with the lever arm z taken as the full
 * 2.000 m structural depth (the compendium: "the entire structural depth is to
 * be used"):
 *   a) A = B = 75.0 kN · M_max = +187.50 kNm · chord force 93.75 kN
 *   b) A = 50.0, B = 100.0 kN · M_span = +83.33 at x = 3.333 · M_B = −46.88
 *   c) R = 150.0 kN · M = −187.50 kNm, hogging: the TOP chord is in tension
 *   d) A = −37.50 kN — DOWNWARD, an anchor — and B = +187.50 kN · M_B = −270.00
 *   e) V = 150.0 kN at the pin, and a horizontal couple of ±375.0 kN over the
 *      2.000 m depth, since 750 kNm / 2.000 m = 375 kN exactly
 *
 * c) deserves its flag: two reaction components against three equations. It is
 * in equilibrium only because the load happens to be symmetric about the single
 * support, and the view says so rather than presenting it as a normal case.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

const L = 10, DEP = 2, Q = 15;
const MPU = 1.55;
const AX = -20, BASE = -1;              // the beam's bottom-left corner
const SFD = 9;                          // kN per drawing unit
const LLX = 8, LLY = 8;
const NSEG = 40;

const CASE = [
  { tag: 'a)', sup: [0, 10], wall: false },
  { tag: 'b)', sup: [0, 7.5], wall: false },
  { tag: 'c)', sup: [5], wall: false },
  { tag: 'd)', sup: [0, 4], wall: false },
  { tag: 'e)', sup: [], wall: true },
];

const DEFAULTS = { sit: 0, q: Q, o1: true, sIF: 0.02, lbl: true, _k: 99 };
const FLOW = 4;

const STEPS = [
  { t: 'The exercise', d: 'EX 7 tasks 1 and 2: five beams, the same load on every one, and five different sets of supports. Sketch the force flow, then find it properly' },
  { t: 'What is given', d: 'left: a beam ten metres long and two metres deep with 15 kN/m along the whole of it — 150 kN in every case. Switch the supports with the “case” slider',
    detail: (d, st) => [`${d.tag} q_d = ${st.q} kN/m over ${L} m → ${d.tot.toFixed(0)} kN in total`,
                        d.wall ? 'e) against a wall: pin at the TOP of the left face, roller at the bottom'
                               : `supports at ${d.sup.map((x) => x.toFixed(2) + ' m').join(' and ')}`] },
  { t: 'Divide the load at the supports', d: 'the sheet’s own tip. Cut the line load where a support is and each piece becomes a resultant of its own — that is what turns a distributed load into something you can lay off on a force diagram',
    detail: (d) => [d.subs.map((s2) => `${s2.R.toFixed(1)} kN at ${s2.x.toFixed(2)} m`).join(' · '),
                    d.subs.length > 1 ? 'always start with the LARGER piece — it sets the scale of everything else'
                                      : 'one piece here: the load is not divided by any interior support'] },
  { t: 'Global equilibrium', d: 'right: the load line, and the reactions closing it. Watch case d): its left reaction comes out NEGATIVE, so that support has to hold the beam down rather than up',
    detail: (d) => d.wall
      ? [`e) the pin takes all ${d.Vp.toFixed(1)} kN of vertical`,
         `and the couple: ${d.Mwall.toFixed(0)} kNm over the ${DEP.toFixed(3)} m depth = ±${d.Hc.toFixed(1)} kN horizontal`]
      : d.reac.map((r) => `${r.name} = ${r.v >= 0 ? '+' : '−'}${Math.abs(r.v).toFixed(2)} kN ${r.v >= 0 ? 'up' : 'DOWN — an anchor, not a bearing'}`) },
  { t: 'The force flow inside the beam', d: 'a beam is an arch and a tie hiding in one lump of material. Blue is the compression path, pink the tension it pulls against, and they use the whole two metres of depth — that is what the depth is FOR',
    detail: (d) => [`largest moment ${Math.abs(d.Mmax).toFixed(2)} kNm → with z = ${DEP.toFixed(3)} m the chords carry ${(Math.abs(d.Mmax) / DEP).toFixed(2)} kN`,
                    d.hog > 1e-6 && d.sag > 1e-6
                      ? `sagging over part of the span and hogging over the rest — the chords swap at ${d.inflect.map((x) => x.toFixed(2)).join(' and ')} m`
                      : d.hog > 1e-6 ? 'hogging everywhere: the TOP chord is the tension one'
                        : 'sagging everywhere: the top chord is in compression, the bottom in tension'],
    take: 'the deeper the beam, the smaller the chord forces — halve the depth and you double them' },
  { t: 'Reading the picture', d: 'wherever the thrust line runs above the tie the beam sags and the top is compressed; wherever it drops below, the beam hogs and the top goes into tension. The chords are coloured accordingly',
    detail: (d) => [`top chord: ${d.topDesc}`, `bottom chord: ${d.botDesc}`] },
  { t: 'What each case teaches', d: 'step the slider through all five. Only a) is the beam everyone pictures; b) and d) put the support inside the span so the far end lifts; c) balances on one point; e) hangs off a wall as a pure couple',
    detail: (d) => [
      'a) A = B = 75.0 kN · chords 93.75 kN',
      'b) A = 50.0, B = 100.0 · sagging in the span, hogging over B',
      'c) ONE support: in equilibrium only because the load is symmetric about it',
      'd) A = −37.50 kN, i.e. downward — the classic uplift case',
      'e) no vertical support at the bottom at all: a 375 kN couple over 2 m'],
    take: 'the load never changed once — every difference on this page comes from the supports' },
];

function compute(s) {
  const C = CASE[Math.round(s.sit)];
  const q = s.q, tot = q * L;
  // subsystem resultants: cut the load at every interior support
  const cuts = [0, ...C.sup.filter((x) => x > 0 && x < L), L]
    .filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b);
  const subs = [];
  for (let i = 0; i < cuts.length - 1; i++) {
    subs.push({ R: q * (cuts[i + 1] - cuts[i]), x: (cuts[i] + cuts[i + 1]) / 2,
                x0: cuts[i], x1: cuts[i + 1] });
  }
  let reac = [], Vp = 0, Hc = 0, Mwall = 0;
  if (C.wall) {
    Vp = tot;
    Mwall = (q * L * L) / 2;
    Hc = Mwall / DEP;
  } else if (C.sup.length === 2) {
    const [xa, xb] = C.sup;
    const M0 = tot * (L / 2 - xa);
    const RB = M0 / (xb - xa);
    reac = [{ name: 'A', x: xa, v: tot - RB }, { name: 'B', x: xb, v: RB }];
  } else {
    reac = [{ name: 'R', x: C.sup[0], v: tot }];
  }
  const M = (x) => {
    let m = 0;
    if (C.wall) {
      // measured from the free end: everything to the RIGHT of the cut
      const w = q * (L - x);
      return -w * ((L - x) / 2);
    }
    for (const r of reac) if (x > r.x) m += r.v * (x - r.x);
    m -= q * x * (x / 2);
    return m;
  };
  const xs = Array.from({ length: NSEG + 1 }, (_, i) => (L * i) / NSEG);
  const Ms = xs.map(M);
  // the drawing samples at NSEG, but the governing moment deserves a finer
  // scan — at NSEG the peak of case b) reads 83.28 instead of 83.33
  let Mmax = 0;
  for (let i = 0; i <= 2000; i++) {
    const v = M((L * i) / 2000);
    if (Math.abs(v) > Math.abs(Mmax)) Mmax = v;
  }
  const H = Math.abs(Mmax) / DEP || 1;
  const thrust = xs.map((x, i) => [x, Ms[i] / H]);
  const sag = Math.max(0, ...thrust.map((p) => p[1]));
  const hog = Math.max(0, ...thrust.map((p) => -p[1]));
  const inflect = [];
  for (let i = 1; i <= NSEG; i++) {
    if (Ms[i - 1] * Ms[i] < 0) {
      inflect.push(xs[i - 1] + (xs[i] - xs[i - 1]) * Math.abs(Ms[i - 1])
        / (Math.abs(Ms[i - 1]) + Math.abs(Ms[i])));
    }
  }
  const topDesc = hog > 1e-6 && sag > 1e-6 ? 'compression in the span, TENSION over the interior support'
    : hog > 1e-6 ? 'TENSION all along — the beam hogs everywhere'
      : 'compression all along';
  const botDesc = hog > 1e-6 && sag > 1e-6 ? 'tension in the span, compression over the support'
    : hog > 1e-6 ? 'compression all along' : 'tension all along';
  return { ...C, q, tot, subs, reac, Vp, Hc, Mwall, Mmax, H, thrust,
           sag, hog, inflect, topDesc, botDesc, Mfn: M };
}

const ux = (m) => AX + m * MPU;
const uy = (m) => BASE + m * MPU;

export const meta = {
  title: 'EX 7.1 — one beam, five sets of supports',
  subtitle: 'Structural Design II · sheet EX 7 “Beams”, tasks 1 and 2, a)–e)',
  about: 'Ten metres of beam, two metres deep, fifteen kilonewtons per metre — and then five different ways of holding it up. A beam is an arch and a tie hidden inside one piece of material, and the force flow shows you exactly where each of them runs. Step through the cases: only the first is the beam everyone pictures, and one of them needs its support to hold the beam DOWN.',
  result: (d) => [
    d.wall ? `e) the pin takes ${d.Vp.toFixed(1)} kN vertically; the couple is ±${d.Hc.toFixed(1)} kN over ${DEP.toFixed(2)} m`
      : `${d.tag} ` + d.reac.map((r) => `${r.name} = ${r.v >= 0 ? '+' : '−'}${Math.abs(r.v).toFixed(2)} kN`).join(' · '),
    `largest moment ${Math.abs(d.Mmax).toFixed(2)} kNm → chord force ${(Math.abs(d.Mmax) / DEP).toFixed(2)} kN over the ${DEP.toFixed(2)} m depth`,
    `top chord: ${d.topDesc}`],
  frame: [[-24, -22], [24, 22]],
};

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  s.sIF = dw.bandScale(200);
  const ARR = dw.W.arrow, NARR = dw.W.narrow;

  dw.label('form_title', 'Form diagram 1:100', { cls: 'title', flash: false });
  dw.label('force_title', 'Force diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });

  dw.poly('beam', 4, { intro: 1, opacity: 1.0, z: -0.6, color: 0xf0f0f3, flash: false });
  dw.strokes('edge', 4, { intro: 1, w: dw.W.thin, color: PAL.grey, flash: false });
  dw.seg('qbar', { intro: 1, w: dw.W.thin, color: PAL.green });
  dw.arrows('qarr', 21, { intro: 1, w: dw.W.thin, color: PAL.green,
    headLen: dw.W.narrow.headLen * 0.8, headW: dw.W.narrow.headW * 0.8 });
  dw.label('lq', '', { cls: 'num', intro: 1, color: PAL.green, when: (st) => st.lbl });
  for (let i = 0; i < 2; i++) {
    const on = (st, dd) => !!dd && !dd.wall && i < dd.sup.length;
    dw.disk(`sup${i}`, { intro: 1, r: dw.W.disk, when: on });
    dw.strokes(`hat${i}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false, when: on });
    dw.seg(`roll${i}`, { intro: 1, w: dw.W.thin, color: PAL.grey, flash: false,
      when: (st, dd) => !!dd && !dd.wall && i === 1 && dd.sup.length > 1 });
  }
  // e) the wall, with its pin on top and roller below
  dw.seg('wall', { intro: 1, w: dw.W.bar, color: PAL.black, flash: false,
    when: (st, dd) => !!dd && dd.wall });
  dw.strokes('wHatch', 8, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false,
    when: (st, dd) => !!dd && dd.wall });
  for (const n of ['P', 'R']) {
    dw.disk(`w${n}`, { intro: 1, r: dw.W.disk, when: (st, dd) => !!dd && dd.wall });
  }
  // the subsystem resultants
  for (let i = 0; i < 3; i++) {
    const on = (st, dd) => !!dd && i < dd.subs.length;
    dw.dashLine(`Rl${i}`, { intro: 2, color: PAL.grey, dash: dw.W.dash, when: on });
    dw.dashArrow(`Rf${i}`, { intro: 2, color: PAL.green, w: dw.W.arrow.w * 1.15,
      headLen: dw.W.arrow.headLen, headW: dw.W.arrow.headW, dash: dw.W.dash * 1.6,
      flash: false, when: on });
    dw.label(`lRf${i}`, '', { cls: 'num', intro: 2, color: PAL.green, when: on });
    dw.arrow(`ff${i}`, { intro: 2, color: PAL.green, ...ARR, when: on });
    dw.label(`lff${i}`, '', { cls: 'num', intro: 2, color: PAL.green, when: on });
    dw.link(`Rf${i}`, `ff${i}`, `lRf${i}`, `lff${i}`);
  }
  for (let i = 0; i < 2; i++) {
    dw.arrow(`re${i}`, { intro: 3, color: PAL.green, ...ARR,
      when: (st, dd) => !!dd && !dd.wall && i < dd.reac.length });
    dw.label(`lre${i}`, '', { cls: 'num', intro: 3, color: PAL.green,
      when: (st, dd) => !!dd && !dd.wall && i < dd.reac.length });
  }
  for (const n of ['V', 'Ht', 'Hb']) {
    dw.arrow(`we${n}`, { intro: 3, color: PAL.green, ...NARR, when: (st, dd) => !!dd && dd.wall });
    dw.label(`lwe${n}`, '', { cls: 'num', intro: 3, color: PAL.green, when: (st, dd) => !!dd && dd.wall });
  }
  // the force flow: the thrust line and the two chords
  dw.strokes('thrust', NSEG + 4, { intro: FLOW, w: dw.W.bar, color: PAL.blue });
  // where the moment changes sign the tie moves from one chord to the other,
  // and the whole chord force is handed across the depth at that one section.
  // Drawn as its own dashed vertical rather than as a stray diagonal in the
  // thrust line, which is what a naive polyline through the samples produces.
  dw.strokes('swap', 4, { intro: FLOW, w: dw.W.thin, color: PAL.grey, flash: false,
    when: (st, dd) => !!dd && dd.inflect.length > 0 });
  dw.strokes('topch', NSEG, { intro: FLOW, w: dw.W.bar * 1.1,
    color: { pending: PAL.black, final: (dd) => (dd.hog > 1e-6 && dd.sag <= 1e-6 ? PAL.red : PAL.blue) } });
  dw.strokes('botch', NSEG, { intro: FLOW, w: dw.W.bar * 1.1,
    color: { pending: PAL.black, final: (dd) => (dd.hog > 1e-6 && dd.sag <= 1e-6 ? PAL.blue : PAL.red) } });
  dw.label('lthr', '', { cls: 'num', intro: FLOW, flash: false, color: PAL.blue });
  dw.label('ltop', '', { cls: 'num', intro: 5, flash: false, color: PAL.grey });
  dw.label('lbot', '', { cls: 'num', intro: 5, flash: false, color: PAL.grey });
  for (let i = 0; i < 2; i++) {
    dw.disk(`inf${i}`, { intro: 5, r: dw.W.disk * 0.7,
      when: (st, dd) => !!dd && i < dd.inflect.length });
  }
  dw.label('lwarn', '', { cls: 'num', intro: 6, flash: false, color: PAL.red,
    when: (st, dd) => !!dd && !dd.wall && dd.reac.length === 1 });

  dw.instant('form_title', 'force_title', 'force_sub', 'beam', 'edge');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    dw.setLabel('form_title', [-14, -12.5]);
    dw.setLabel('force_title', [10, -12.5]);
    dw.setLabel('force_sub', [10, -13.9]);
    dw.setText('force_sub', `1 unit ≙ ${SFD} kN  (sheet: 1 cm ≙ 20 kN)`);

    const c = [[ux(0), uy(0)], [ux(L), uy(0)], [ux(L), uy(DEP)], [ux(0), uy(DEP)]];
    dw.setPoly('beam', c);
    dw.setStrokes('edge', c.map((p, i) => [p, c[(i + 1) % 4]]));

    const qy = uy(DEP) + 3.0;
    dw.setSeg('qbar', [ux(0), qy], [ux(L), qy]);
    dw.setArrows('qarr', Array.from({ length: 21 }, (_, i) => {
      const x = ux((L * i) / 20);
      return [[x, qy], [x, qy - 1.1]];
    }));
    dw.setLabel('lq', [ux(L) + 4.4, qy]);
    dw.setText('lq', `g_d = ${d.q} kN/m`);

    d.sup.forEach((x, i) => {
      const p = [ux(x), uy(0)];
      dw.setDisk(`sup${i}`, p);
      const drop = i === 1 && d.sup.length > 1 ? 1.5 : 0.5;
      dw.setStrokes(`hat${i}`, V.hatch([p[0] - 1.8, p[1] - drop],
        [p[0] + 1.8, p[1] - drop], -1, 0.95, 5));
      if (i === 1) dw.setSeg(`roll${i}`, [p[0] - 1.8, p[1] - 1.2], [p[0] + 1.8, p[1] - 1.2]);
    });
    dw.setSeg('wall', [ux(0), uy(DEP) + 1.6], [ux(0), uy(0) - 1.6]);
    dw.setStrokes('wHatch', V.hatch([ux(0), uy(0) - 1.4], [ux(0), uy(DEP) + 1.4],
      -1, 1.0, 8));
    dw.setDisk('wP', [ux(0), uy(DEP)]);
    dw.setDisk('wR', [ux(0), uy(0)]);

    d.subs.forEach((sub, i) => {
      const x = ux(sub.x);
      dw.setDashLine(`Rl${i}`, [[x, qy + 1.4], [x, uy(0) - 3.6]]);
      dw.setDashArrow(`Rf${i}`, [x, qy - 1.6], [x, qy - 1.6 - sub.R / SFD]);
      dw.setLabel(`lRf${i}`, [x + 2.8, qy - 1.6 - sub.R / SFD * 0.5]);
      dw.setText(`lRf${i}`, `${sub.R.toFixed(0)}`);
      const top = [LLX, LLY - d.subs.slice(0, i).reduce((a, b) => a + b.R, 0) / SFD];
      dw.setArrow(`ff${i}`, top, [LLX, top[1] - sub.R / SFD]);
      dw.setLabel(`lff${i}`, [LLX - 2.8, top[1] - sub.R / SFD * 0.5]);
      dw.setText(`lff${i}`, `${sub.R.toFixed(0)}`);
    });
    d.reac.forEach((r, i) => {
      const p = [ux(r.x), uy(0)];
      const len = Math.abs(r.v) / SFD;
      const tail = r.v >= 0 ? [p[0], p[1] - 1.0 - len] : [p[0], p[1] - 1.0];
      const tip = r.v >= 0 ? [p[0], p[1] - 1.0] : [p[0], p[1] - 1.0 - len];
      dw.setArrow(`re${i}`, tail, tip);
      dw.setLabel(`lre${i}`, [p[0] + 3.6, p[1] - 1.4 - len / 2]);
      dw.setText(`lre${i}`, `${r.name} = ${r.v >= 0 ? '' : '−'}${Math.abs(r.v).toFixed(1)}`);
    });
    // e) the couple at the wall
    dw.setArrow('weV', [ux(0) - 3.4, uy(DEP) - d.Vp / SFD], [ux(0) - 3.4, uy(DEP)]);
    dw.setLabel('lweV', [ux(0) - 6.4, uy(DEP) - d.Vp / SFD / 2]);
    dw.setText('lweV', `${d.Vp.toFixed(0)} ↑`);
    dw.setArrow('weHt', [ux(0) + d.Hc / SFD, uy(DEP)], [ux(0), uy(DEP)]);
    dw.setLabel('lweHt', [ux(0) + d.Hc / SFD + 3.4, uy(DEP) + 1.0]);
    dw.setText('lweHt', `${d.Hc.toFixed(0)} ←`);
    dw.setArrow('weHb', [ux(0), uy(0)], [ux(0) + d.Hc / SFD, uy(0)]);
    dw.setLabel('lweHb', [ux(0) + d.Hc / SFD + 3.4, uy(0) - 1.0]);
    dw.setText('lweHb', `${d.Hc.toFixed(0)} →`);

    // The thrust line springs FROM the tie, not from mid-depth: where the beam
    // sags the tie is the bottom chord and the arch rises off it to the top at
    // the point of largest moment; where it hogs, the tie is the top chord and
    // the arch hangs below it. z(x) = M(x)/H does both, with H = M_max/depth.
    // A sample where the moment is exactly zero -- both beam ends -- belongs to
    // whichever branch its neighbours are on, otherwise the free end of a
    // hogging cantilever snaps down to the bottom chord on the last point.
    const branch = (i) => {
      const y = d.thrust[i][1];
      if (Math.abs(y) > 1e-9) return Math.sign(y);
      for (let k = i + 1; k < d.thrust.length; k++)
        if (Math.abs(d.thrust[k][1]) > 1e-9) return Math.sign(d.thrust[k][1]);
      for (let k = i - 1; k >= 0; k--)
        if (Math.abs(d.thrust[k][1]) > 1e-9) return Math.sign(d.thrust[k][1]);
      return 1;
    };
    const TP = d.thrust.map(([x, y], i) =>
      [ux(x), uy(branch(i) > 0 ? y : DEP + y)]);
    // Split the line at every sign change instead of letting one sample step
    // leap the full depth: a sagging branch runs down to the BOTTOM chord as
    // its moment dies, a hogging branch starts again at the TOP chord.
    const tseg = [], swap = [];
    for (let i = 0; i < NSEG; i++) {
      const [x0, y0] = d.thrust[i], [x1, y1] = d.thrust[i + 1];
      if (y0 * y1 < 0) {
        const t = Math.abs(y0) / (Math.abs(y0) + Math.abs(y1));
        const xc = ux(x0 + (x1 - x0) * t);
        tseg.push([TP[i], [xc, uy(y0 > 0 ? 0 : DEP)]]);
        tseg.push([[xc, uy(y1 > 0 ? 0 : DEP)], TP[i + 1]]);
        swap.push([[xc, uy(0)], [xc, uy(DEP)]]);
      } else {
        tseg.push([TP[i], TP[i + 1]]);
      }
    }
    while (tseg.length < NSEG + 4) tseg.push([TP[NSEG], TP[NSEG]]);
    while (swap.length < 4) swap.push([[0, 0], [0, 0]]);
    dw.setStrokes('thrust', tseg.slice(0, NSEG + 4));
    dw.setStrokes('swap', swap.slice(0, 4));
    dw.setStrokes('topch', Array.from({ length: NSEG }, (_, i) =>
      [[ux((L * i) / NSEG), uy(DEP)], [ux((L * (i + 1)) / NSEG), uy(DEP)]]));
    dw.setStrokes('botch', Array.from({ length: NSEG }, (_, i) =>
      [[ux((L * i) / NSEG), uy(0)], [ux((L * (i + 1)) / NSEG), uy(0)]]));
    const midY = uy(DEP / 2);
    const hi = TP.reduce((b, p, i) => (Math.abs(p[1] - midY) > Math.abs(TP[b][1] - midY) ? i : b), 0);
    dw.setLabel('lthr', V.add(TP[hi], [6.0, TP[hi][1] > midY ? 2.4 : -2.4]));
    dw.setText('lthr', `thrust line · ${(Math.abs(d.Mmax) / DEP).toFixed(1)} kN in the chords`);
    dw.setLabel('ltop', [ux(L) + 4.8, uy(DEP)]);
    dw.setText('ltop', 'top');
    dw.setLabel('lbot', [ux(L) + 4.8, uy(0)]);
    dw.setText('lbot', 'bottom');
    d.inflect.forEach((x, i) => dw.setDisk(`inf${i}`, [ux(x), uy(DEP / 2)]));
    dw.setLabel('lwarn', [ux(L / 2), uy(0) - 5.0]);
    dw.setText('lwarn', 'c) one support only — in equilibrium purely because the load is symmetric about it');

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const cas = panel.section('The case');
  panel.slider(cas, s, 'sit', 'case', 0, 4, 1, refresh,
    (v) => ['a) pin 0 · roller 10', 'b) pin 0 · roller 7.5', 'c) one pin at 5',
            'd) pin 0 · roller 4', 'e) against a wall'][Math.round(v)]);
  panel.toggle(cas, s, 'lbl', 'show labels', refresh);
  const giv = panel.section('Given');
  panel.slider(giv, s, 'q', 'g_d (kN/m)', 5, 30, 1, refresh);

  refresh();
  return player;
}
