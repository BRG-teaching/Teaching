/**
 * EX 5 · Creative — Qualitative Force Flow
 * Structural Design I, HS 22 (sheet EX 5 "Arch-Cable", page 3).
 *
 * "Below, there are five situations with different applied loads. Sketch a
 * possible force flow and try to find the direction of the reaction forces by
 * qualitative thinking. Draw tension forces in red, compression forces in blue
 * and reaction forces in green. (qualitative = without force diagram)"
 *
 * Digitised at the stated 1:100: every band has the same supports, a PIN at
 * x = 0.000 and a ROLLER at x = 12.000 m, both at the same level (span
 * 340.17 pt = 12.000 m). The five load cases:
 *   a) F_d at 6.000 m — midspan
 *   b) F_d at 15.000 m — 3.000 m BEYOND the right support
 *   c) F₁d at 6.000 and F₂d at 15.000 m, and the sheet prints F₁d = F₂d
 *   d) q_d over 0…12.000 m plus F_d at 15.000 m, and the sheet prints R = F_d
 *   e) q_d over 0…18.000 m — a 6.000 m overhang past the roller
 *
 * The sheet prints no magnitudes at all, only the two relations F₁d = F₂d and
 * R = F_d. Everything numeric below is therefore expressed as a multiple of
 * that one unknown load.
 *
 * Because the right support is a roller and every load is vertical, ΣH makes
 * BOTH reactions purely vertical in all five cases — so the interesting
 * question really is the one the sheet asks: which way do they point?
 *   a)  A = +0.50 F        B = +0.50 F
 *   b)  A = −0.25 F  ← DOWNWARD, the only reversed reaction on the page
 *       B = +1.25 F
 *   c)  A = +0.25 F        B = +1.75 F
 *   d)  A = +0.25 F        B = +1.75 F   — identical to c), which is almost
 *       certainly why the sheet bothers to print "R = F_d"
 *   e)  A = +4.50 q        B = +13.50 q  (of 18 q in total)
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'EX 5 Creative — which way does the support push?',
  subtitle: 'Structural Design I · sheet EX 5 “Arch-Cable”, Creative task a)–e)',
  about: 'Five spans, one pin and one roller twelve metres apart, and loads that increasingly hang off the end. No numbers are given and none are needed: the question is which way each support has to push, and in one of the five the answer is downward. Hold a structure down and it is a very different detail from holding it up. Step through the cases and watch the left reaction cross zero.',
  result: (d) => [`${d.tag} A = ${d.RA >= 0 ? '+' : '−'}${Math.abs(d.RA).toFixed(2)} ${d.unit} — ${d.RA >= 0 ? 'upward' : 'DOWNWARD, the support must hold the beam DOWN'}`,
                  `B = +${d.RB.toFixed(2)} ${d.unit} upward · both purely vertical, because the roller can take no horizontal force`,
                  `sagging where the thrust line is above the tie, hogging where it drops below it`],
  frame: [[-23, -17], [23, 24.5]],
};

const SPAN = 12;
const MPU = 1.35;
const AX = -17, AY = 1.0;
const SYM = 3.2;
const NSEG = 60;

// the five situations, as multiples of one unknown load F (or q)
const SIT = [
  { tag: 'a)', pts: [[6, 1]], udl: null, far: 12, unit: 'F' },
  { tag: 'b)', pts: [[15, 1]], udl: null, far: 15, unit: 'F' },
  { tag: 'c)', pts: [[6, 1], [15, 1]], udl: null, far: 15, unit: 'F' },
  { tag: 'd)', pts: [[15, 1]], udl: [0, 12, 1 / 12], far: 15, unit: 'F' },
  { tag: 'e)', pts: [], udl: [0, 18, 1], far: 18, unit: 'q' },
];

const DEFAULTS = { sit: 0, Fd: 40, depth: 1.6, o1: true, sIF: 0.02, lbl: true, _k: 99 };
const SHAPED = 3;

const STEPS = [
  { t: 'The exercise', d: 'the Creative task: five spans, and for each one work out by thinking rather than calculating which way the two supports have to push' },
  { t: 'What is given', d: 'left: a pin at the left, a roller twelve metres to the right, and a load case that reaches further out each time. Nothing else — the sheet prints no magnitudes at all',
    detail: (d, st) => [`${d.tag} ${d.what}`,
                        'the roller takes no horizontal force and every load is vertical, so BOTH reactions are purely vertical'] },
  { t: 'Where does the load sit?', d: 'the only thing that decides the answer is the resultant’s position relative to the two supports. Inside them the supports share it; outside them, the far one has to lever it back down',
    detail: (d) => [`resultant ${d.tot.toFixed(2)} ${d.unit} at x = ${d.xR.toFixed(2)} m`,
                    d.xR <= SPAN ? 'inside the span: both supports push up'
                                 : `${(d.xR - SPAN).toFixed(2)} m PAST the roller — so the left support is being lifted`] },
  { t: 'The reactions', d: 'green at both supports, drawn to one scale so the sizes can be compared. Watch the left one as you step through the cases',
    detail: (d) => [`A = ${d.RA >= 0 ? '+' : '−'}${Math.abs(d.RA).toFixed(3)} ${d.unit} (${d.RA >= 0 ? 'up' : 'DOWN'}) · B = +${d.RB.toFixed(3)} ${d.unit} (up)`,
                    `ΣV: ${d.RA.toFixed(2)} + ${d.RB.toFixed(2)} = ${d.tot.toFixed(2)} ${d.unit} ✓`],
    take: 'a support that has to pull down needs an anchor, not a bearing' },
  { t: 'The force flow', d: 'blue is the thrust line, the path the compression takes; pink is the tie it needs to pull against. Where the thrust line runs ABOVE the tie the span sags, and where it drops BELOW it the structure is hogging over the support',
    detail: (d) => [`the thrust line changes side at x = ${d.inflect === null ? '—' : d.inflect.toFixed(2) + ' m'}`,
                    `deepest sag ${d.sag.toFixed(2)} m · deepest hog ${d.hog.toFixed(2)} m (at the depth you chose)`] },
  { t: 'Reading the colours', d: 'a chord is in compression when the thrust line is on its side of the tie and in tension when it is on the other. So over a cantilever the top goes into tension — the opposite of the span beside it',
    detail: (d) => [d.hog > 0 ? 'the top chord is in TENSION over the roller and in compression in the span'
                              : 'no hogging here: the top stays in compression the whole way'] },
  { t: 'b) is the one to remember', d: 'the only case with a reversed reaction. The load is three metres past the roller, so the roller becomes a fulcrum and the pin at the far end has to be held down with a quarter of the load',
    detail: () => ['b) A = −0.25 F, i.e. 0.25 F DOWNWARD, and B = +1.25 F',
                   'c) and d) put a load back in the span and A returns to +0.25 F',
                   'e) the 6 m overhang still leaves A at +4.50 q — a distributed overhang is gentler than a point one'],
    take: 'a cantilever does not just load the near support — it unloads, and can reverse, the far one' },
];

function compute(s) {
  const S = SIT[Math.round(s.sit)];
  const pts = S.pts.map(([x, w]) => [x, w]);
  let tot = pts.reduce((a, [, w]) => a + w, 0);
  let mom = pts.reduce((a, [x, w]) => a + x * w, 0);
  if (S.udl) {
    const [x0, x1, q] = S.udl;
    const w = q * (x1 - x0);
    tot += w;
    mom += w * (x0 + x1) / 2;
  }
  const xR = mom / tot;
  const RB = mom / SPAN;
  const RA = tot - RB;
  // the bending moment along the beam, so the thrust line can be drawn
  const M = (x) => {
    let m = RA * x;
    if (x > SPAN) m += RB * (x - SPAN);
    for (const [xi, w] of pts) if (x > xi) m -= w * (x - xi);
    if (S.udl) {
      const [x0, x1, q] = S.udl;
      const a = Math.max(x0, 0), b = Math.min(x1, x);
      if (b > a) m -= q * (b - a) * (x - (a + b) / 2);
    }
    return m;
  };
  const xs = Array.from({ length: NSEG + 1 }, (_, i) => (S.far * i) / NSEG);
  const Ms = xs.map(M);
  const Mmax = Math.max(...Ms.map(Math.abs), 1e-9);
  const H = Mmax / s.depth;
  // WHICH OF THE TWO LINES IS STRAIGHT.
  //
  // A force flow is a pair: a thrust line and a tie, separated at every section
  // by M(x)/H. Either one may be drawn straight, and the choice is not free —
  // the REACTIONS are applied to the thrust line, so the thrust line has to
  // reach the supports. This view used to hold the TIE horizontal through both
  // supports, which left the roller in b)–e) sitting on the tie with the
  // compression path passing up to 1.6 m underneath it and nothing joining the
  // two: a reaction applied to a point that is not on the structure.
  //
  // The sheet does it the other way, and so does this now. The tie is the
  // inclined closing chord from A to the far end, tilted by exactly the amount
  // that brings the thrust line back to zero at the roller.
  const tieEnd = (S.far / SPAN) * (-M(SPAN) / H);
  const tieAt = (x) => (x / S.far) * tieEnd;
  const thrust = xs.map((x, i) => [x, tieAt(x) + Ms[i] / H]);
  const sag = Math.max(0, Math.max(...Ms.map((m) => m / H)));
  const hog = Math.max(0, -Math.min(...Ms.map((m) => m / H)));
  // where the thrust line crosses the tie, i.e. where the moment changes sign.
  // `< 0` never fired: with 60 samples over a 12 m span every zero lands ON a
  // sample, so the product is exactly 0 and the crossing was reported as "—"
  // in all five cases.
  let inflect = null;
  for (let i = 1; i <= NSEG; i++) {
    const a = Ms[i - 1], b = Ms[i];
    if (a === 0 && i > 1) { inflect = xs[i - 1]; break; }
    if (a * b < 0) {
      inflect = xs[i - 1] + ((xs[i] - xs[i - 1]) * Math.abs(a)) / (Math.abs(a) + Math.abs(b));
      break;
    }
    if (b === 0 && i < NSEG && Ms[i + 1] * a < 0) { inflect = xs[i]; break; }
  }
  const what = S.udl && S.pts.length ? `q_d over 0…${S.udl[1]} m (R = F_d) plus F_d at ${S.pts[0][0]} m`
    : S.udl ? `q_d over 0…${S.udl[1]} m — a ${(S.udl[1] - SPAN).toFixed(0)} m overhang`
      : S.pts.length === 2 ? `F₁d at ${S.pts[0][0]} m and F₂d at ${S.pts[1][0]} m, equal`
        : `F_d at ${S.pts[0][0]} m${S.pts[0][0] > SPAN ? ' — past the roller' : ''}`;
  return { ...S, pts, tot, xR, RA, RB, H, thrust, tieEnd, tieAt,
           sag, hog, inflect, what, Mfn: M };
}

const ux = (m) => AX + m * MPU;
const uy = (m) => AY + m * MPU;

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;

  dw.label('form_title', 'Lageplan 1:100 — form diagram (qualitative, no force diagram)',
    { cls: 'title', flash: false });

  dw.seg('axis', { intro: 1, w: dw.W.thin, color: PAL.grey, flash: false });
  for (const n of ['A', 'B']) {
    dw.disk(`sup${n}`, { intro: 1, r: dw.W.disk });
    dw.label(`lsup${n}`, n, { cls: 'num', intro: 1, when: (st) => st.lbl });
    dw.strokes(`hat${n}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  }
  dw.seg('rollLine', { intro: 1, w: dw.W.thin, color: PAL.grey, flash: false });

  for (let i = 0; i < 2; i++) {
    const on = (st, dd) => !!dd && i < dd.pts.length;
    dw.dashLine(`la${i}`, { intro: 1, color: PAL.grey, dash: dw.W.dash, when: on });
    dw.arrow(`f${i}`, { intro: 1, color: PAL.green, ...ARR, when: on });
    dw.label(`lf${i}`, '', { cls: 'num', intro: 1, color: PAL.green, when: on });
  }
  dw.seg('qbar', { intro: 1, w: dw.W.thin, color: PAL.green, when: (st, dd) => !!dd && !!dd.udl });
  dw.arrows('qarr', 25, { intro: 1, w: dw.W.thin, color: PAL.green, when: (st, dd) => !!dd && !!dd.udl,
    headLen: dw.W.narrow.headLen * 0.8, headW: dw.W.narrow.headW * 0.8 });
  dw.label('lq', 'q_d', { cls: 'num', intro: 1, color: PAL.green, when: (st, dd) => !!dd && !!dd.udl });

  dw.dashLine('Rline', { intro: 2, color: PAL.grey, dash: dw.W.dash });
  dw.dashArrow('Rform', { intro: 2, color: PAL.green, w: dw.W.arrow.w * 1.15,
    headLen: dw.W.arrow.headLen, headW: dw.W.arrow.headW, dash: dw.W.dash * 1.6, flash: false });
  dw.label('lRform', 'R', { cls: 'num', intro: 2, color: PAL.green });

  for (const n of ['A', 'B']) {
    dw.arrow(`re${n}`, { intro: SHAPED, color: PAL.green, ...ARR });
    dw.label(`lre${n}`, '', { cls: 'num', intro: SHAPED, color: PAL.green });
  }
  // the thrust line, and the tie it pulls against
  dw.strokes('thrust', NSEG, { intro: 4, w: dw.W.bar, color: PAL.blue });
  dw.seg('tie', { intro: 4, w: dw.W.bar, color: PAL.red });
  dw.label('lthrust', '', { cls: 'num', intro: 4, flash: false, color: PAL.blue });
  dw.label('ltie', '', { cls: 'num', intro: 4, flash: false, color: PAL.red });
  dw.disk('ptInf', { intro: 5, r: dw.W.disk * 0.7, when: (st, dd) => !!dd && dd.inflect !== null });
  dw.label('linf', '', { cls: 'point', intro: 5, flash: false, color: PAL.grey,
    when: (st, dd) => !!dd && dd.inflect !== null });
  dw.label('lhog', '', { cls: 'num', intro: 5, flash: false, color: PAL.red,
    when: (st, dd) => !!dd && dd.hog > 0.05 });

  dw.instant('form_title');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    dw.setLabel('form_title', [-2, -8.9]);

    dw.setSeg('axis', [ux(-1.2), uy(0)], [ux(d.far + 1.2), uy(0)]);
    const A = [ux(0), uy(0)], B = [ux(SPAN), uy(0)];
    dw.setDisk('supA', A); dw.setDisk('supB', B);
    dw.setLabel('lsupA', V.add(A, [-1.6, -1.2]));
    dw.setLabel('lsupB', V.add(B, [1.6, -1.2]));
    for (const [n, p, drop] of [['A', A, 0.5], ['B', B, 1.5]]) {
      dw.setStrokes(`hat${n}`, V.hatch([p[0] - 1.8, p[1] - drop],
        [p[0] + 1.8, p[1] - drop], -1, 0.95, 5));
    }
    dw.setSeg('rollLine', [B[0] - 1.8, B[1] - 1.2], [B[0] + 1.8, B[1] - 1.2]);

    const top = uy(0) + 7.5;
    d.pts.forEach(([x], i) => {
      const px = ux(x);
      dw.setDashLine(`la${i}`, [[px, top + 1.2], [px, uy(0) - 4.0]]);
      dw.setArrow(`f${i}`, [px, top], [px, top - SYM]);
      dw.setLabel(`lf${i}`, [px + 2.2, top - SYM * 0.5]);
      dw.setText(`lf${i}`, d.pts.length === 2 ? `F${'₁₂'[i]}d` : 'F_d');
    });
    if (d.udl) {
      const [x0, x1] = d.udl;
      dw.setSeg('qbar', [ux(x0), top], [ux(x1), top]);
      dw.setArrows('qarr', Array.from({ length: 25 }, (_, i) => {
        const px = ux(x0 + ((x1 - x0) * i) / 24);
        return [[px, top], [px, top - 1.1]];
      }));
      dw.setLabel('lq', [ux(x1) + 2.6, top]);
    }
    dw.setDashLine('Rline', [[ux(d.xR), top + 2.6], [ux(d.xR), uy(0) - 4.2]]);
    dw.setDashArrow('Rform', [ux(d.xR), top + 2.4], [ux(d.xR), top + 2.4 - SYM]);
    dw.setLabel('lRform', [ux(d.xR) + 2.0, top + 2.4 - SYM * 0.5]);

    // reactions, all to one scale so the five cases can be compared
    const RSC = 5.2;
    for (const [n, p, val] of [['A', A, d.RA], ['B', B, d.RB]]) {
      const len = Math.abs(val) * RSC + 1.0;
      // upward reaction: the arrow arrives at the support from below
      const tail = val >= 0 ? [p[0], p[1] - len] : [p[0], p[1] + len];
      dw.setArrow(`re${n}`, tail, p);
      dw.setLabel(`lre${n}`, [tail[0] + (n === 'A' ? -3.4 : 3.4), (tail[1] + p[1]) / 2]);
      dw.setText(`lre${n}`, `${n} = ${val >= 0 ? '' : '−'}${Math.abs(val).toFixed(2)} ${d.unit}`);
    }

    // the thrust line and its tie
    const TP = d.thrust.map(([x, y]) => [ux(x), uy(y)]);
    dw.setStrokes('thrust', Array.from({ length: NSEG }, (_, i) => [TP[i], TP[i + 1]]));
    dw.setSeg('tie', [ux(0), uy(0)], [ux(d.far), uy(d.tieEnd)]);
    const hi = TP.reduce((b, p, i) => (p[1] > TP[b][1] ? i : b), 0);
    dw.setLabel('lthrust', V.add(TP[hi], [0, 1.7]));
    dw.setText('lthrust', 'thrust line — compression');
    dw.setLabel('ltie', [ux(SPAN / 2), uy(0) - 1.9]);
    dw.setText('ltie', 'tie — tension');
    if (d.inflect !== null) {
      dw.setDisk('ptInf', [ux(d.inflect), uy(0)]);
      dw.setLabel('linf', [ux(d.inflect), uy(0) + 1.7]);
      dw.setText('linf', `sign changes at ${d.inflect.toFixed(2)} m`);
      const lo = TP.reduce((b, p, i) => (p[1] < TP[b][1] ? i : b), 0);
      dw.setLabel('lhog', V.add(TP[lo], [0, -1.8]));
      dw.setText('lhog', 'hogging: the top is now in tension');
    }

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const cas = panel.section('The situation');
  panel.slider(cas, s, 'sit', 'case', 0, 4, 1, refresh,
    (v) => ['a) F at midspan', 'b) F past the roller', 'c) F at 6 m and 15 m',
            'd) q on the span + F past it', 'e) q with a 6 m overhang'][Math.round(v)]);
  panel.toggle(cas, s, 'lbl', 'show labels', refresh);
  const des = panel.section('The force flow');
  panel.slider(des, s, 'depth', 'structural depth (m)', 0.6, 3.5, 0.05, refresh);

  refresh();
  return player;
}
