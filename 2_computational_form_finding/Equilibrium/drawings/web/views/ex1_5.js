/**
 * EX 1 · Creative — Resultant and Stability: stacking of boxes
 * Structural Design I, HS 22 (sheet EX 1 "Equilibrium", page 3).
 *
 * "Stack the given steel boxes on top of each other and check whether your
 * stack is stable. Assume that the boxes are being welded together. The given
 * boxes should not be rotated.
 *   a) Change the arrangement from task 3) with the help of the force diagram
 *      so that it becomes stable.
 *   b) Design your own interesting arrangement of 4 boxes that challenges your
 *      sense of balance but is stable."
 *
 * The four boxes, digitised from page 3 at the stated 1:50 (1 pt = 0.017639 m)
 * and coming out as clean sizes — their weights are simply proportional to
 * their area at 40 kN/m²:
 *     box 1   1.5 × 1.0 m   F₁ = 60 kN      box 3   1.0 × 1.0 m   F₃ = 40 kN
 *     box 2   3.0 × 0.5 m   F₂ = 60 kN      box 4   0.5 × 1.5 m   F₄ = 30 kN
 *
 * a) Task 3's stack has the boxes at −2.016 / −1.422 / 0 m (left edges, the
 * foot's original left edge taken as the origin). Its resultant falls at
 * x̄ = −0.32 m, which is 0.32 m LEFT of the contact patch 0 … 1.0 m — the
 * 0.32 m the view of task 3 reports, so this really is the same stack. The
 * cheapest fix is to move only the foot: with the foot's left edge at t,
 * x̄ = −0.3205 + 0.25t, and centring the patch on the resultant means
 * t + 0.5 = x̄, i.e. t = −1.094 m. So sliding the bottom box 1.094 m to the
 * left puts the resultant exactly in the middle of the patch. Nothing else
 * has to move — a stack does not need redesigning, it needs its foot under
 * its weight.
 *
 * b) The four-box arrangement here is deliberately close to the edge, as the
 * task asks: a 3 m box cantilevering right off a 1 m foot, with the tall
 * narrow box hung off the left end as a counterweight. x̄ = 0.918 m against a
 * patch of 0 … 1.0 m — stable by 82 mm.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'EX 1 Creative — stacking boxes, and whether they stand up',
  subtitle: 'Structural Design I · sheet EX 1 “Equilibrium”, Creative task a) and b)',
  about: 'The same trial funicular as task 3, now used as a design tool rather than a measuring one. A free-standing stack is stable exactly while the resultant of its weight lands inside the patch where it touches the ground — so finding that resultant tells you where the foot has to be. Two arrangements: a) task 3’s stack, fixed by moving one box, and b) a four-box cantilever built to be alarming but stable. Drag any box and watch the verdict flip.',
  result: (d) => [`R = ${d.tot} kN vertical, acting at x̄ = ${d.xbar.toFixed(3)} m`,
                  `contact patch ${d.foot[0].toFixed(3)} … ${d.foot[1].toFixed(3)} m`,
                  d.stable ? `STABLE — the resultant lands ${d.margin.toFixed(3)} m inside the nearer edge`
                           : `NOT STABLE — the resultant misses the patch by ${d.margin.toFixed(3)} m, so it tips`],
  frame: [[-21, -18], [21, 15]],
};

const MPU = 2.6;                      // drawing units per metre (1:50 sheet)
const OX = -11, GY = -4.0;            // where metre-zero and the ground sit
const SFD = 16;                       // kN per drawing unit
const LLX = 4, LLY = 6;               // top of the load line
const SYM = 3.2;                      // constant arrow symbol length

// the four given boxes: width, height (m) and weight (kN)
const BOX = [
  { w: 1.5, h: 1.0, F: 60 },
  { w: 3.0, h: 0.5, F: 60 },
  { w: 1.0, h: 1.0, F: 40 },
  { w: 0.5, h: 1.5, F: 30 },
];
// arrangement a): three boxes, foot on the ground, everything welded
const A3 = [{ i: 2, x: -1.094, y: 0 },  // the foot — moved 1.094 m left
            { i: 1, x: -1.422, y: 1.0 },
            { i: 0, x: -2.016, y: 1.5 }];
const A3_ORIG = -0.0;                 // task 3's original foot position
// arrangement b): four boxes, a cantilever with a counterweight
const A4 = [{ i: 2, x: 0, y: 0 },
            { i: 1, x: -0.4, y: 1.0 },
            { i: 0, x: 0.8, y: 1.5 },
            { i: 3, x: -0.4, y: 1.5 }];

const DEFAULTS = {
  four: false,                        // a) three boxes · b) four boxes
  orig: false,                        // a) put the foot back where task 3 had it
  d0: 0, d1: 0, d2: 0, d3: 0,         // per-box nudge (m), the design freedom
  ox: 15.0, oy: 0.0,                  // trial pole
  a0: -8.6,                           // where the trial funicular starts
  lbl: true, _k: 99,
};

const RESOLVE = 6;

const STEPS = [
  { t: 'The exercise', d: 'the Creative task: stack the given welded steel boxes and find out whether the stack stands up. No box may be rotated' },
  { t: 'The stack and its weights', d: 'left: each box pulls down through its own centroid with a weight proportional to its area — the boxes weigh 40 kN for every square metre',
    detail: (d, st) => [st.four
      ? 'b) four boxes: F₁ = 60 · F₂ = 60 · F₃ = 40 · F₄ = 30 kN — ΣF = 190 kN'
      : 'a) three boxes, as in task 3: F₁ = 60 · F₂ = 60 · F₃ = 40 kN — ΣF = 160 kN'] },
  { t: 'The load line', d: 'right: the weights are all parallel, so laid tip to tail they simply make one vertical line. That gives the resultant’s size at once — but says nothing about WHERE it acts',
    detail: (d) => [`ΣF = ${d.tot} kN, vertical`] },
  { t: 'A trial pole', d: 'right: pick any pole and draw a ray to every division of the load line. Drag it — the answer does not depend on where it goes' },
  { t: 'The trial funicular', d: 'left: start anywhere on the first line of action and draw one string parallel to each ray, turning at every line of action' },
  { t: 'Close it: the point S', d: 'left: extend the first and last strings until they meet at S. The resultant passes through S — for parallel forces there is no other way to place it',
    detail: (d) => [`R = ${d.tot} kN on the vertical at x̄ = ${d.xbar.toFixed(3)} m`] },
  { t: 'The verdict', d: 'left: the stack only touches the ground under the bottom box. A contact force can only push up from inside that patch, so the stack stands if — and only if — the resultant lands within it',
    detail: (d) => [`x̄ = ${d.xbar.toFixed(3)} m · contact patch ${d.foot[0].toFixed(3)} … ${d.foot[1].toFixed(3)} m`,
                    d.stable ? `inside by ${d.margin.toFixed(3)} m → STABLE`
                             : `outside by ${d.margin.toFixed(3)} m → NOT STABLE, it tips`],
    take: 'stability is not about weight, it is about where the weight lands' },
  { t: 'Now design it', d: 'a) tick “task 3’s original foot” to see the stack the sheet gives you: its resultant falls 0.32 m clear of the patch, so it tips. Untick it and the foot slides 1.094 m left, right under the resultant — one box moved, nothing else. b) switch to four boxes for a cantilever that only just holds',
    detail: (d, st) => [st.four
      ? `b) four boxes: x̄ = ${d.xbar.toFixed(3)} m against a patch ending at ${d.foot[1].toFixed(3)} m — ${d.margin.toFixed(3)} m to spare`
      : (st.orig ? 'a) task 3 as given: the resultant misses the foot — it tips'
                 : 'a) the foot moved 1.094 m left: the resultant now sits in the middle of the patch')],
    take: 'the force diagram is not only for checking a design — it tells you where to put the next box' },
];

function layout(s) {
  const arr = s.four ? A4 : A3;
  const nudge = [s.d0, s.d1, s.d2, s.d3];
  return arr.map((a) => {
    const b = BOX[a.i];
    let x = a.x + nudge[a.i];
    if (!s.four && a.i === 2 && s.orig) x = A3_ORIG + nudge[2];
    return { i: a.i, x0: x, x1: x + b.w, y0: a.y, y1: a.y + b.h, F: b.F, w: b.w };
  });
}

function compute(s) {
  const boxes = layout(s);
  const tot = boxes.reduce((a, b) => a + b.F, 0);
  const cx = boxes.map((b) => (b.x0 + b.x1) / 2);
  const xbar = boxes.reduce((a, b, i) => a + cx[i] * b.F, 0) / tot;
  // the box that stands on the ground is the one at y0 = 0
  const foot = boxes.filter((b) => b.y0 === 0)
    .reduce((acc, b) => [Math.min(acc[0], b.x0), Math.max(acc[1], b.x1)], [Infinity, -Infinity]);
  const stable = xbar >= foot[0] && xbar <= foot[1];
  const margin = Math.min(Math.abs(xbar - foot[0]), Math.abs(xbar - foot[1]));
  // force diagram: the load line, in the boxes' left-to-right order
  const order = boxes.map((b, i) => i).sort((a, b) => cx[a] - cx[b]);
  const L = [[LLX, LLY]];
  for (const k of order) L.push([LLX, L[L.length - 1][1] - boxes[k].F / SFD]);
  const o = [s.ox, s.oy];
  const xs = order.map((k) => cx[k]);
  const A = [[toU(xs[0]), s.a0]];
  for (let i = 0; i < xs.length - 1; i++) {
    const dir = V.sub(L[i + 1], o);
    A.push(V.intersect(A[i], dir, [toU(xs[i + 1]), 0], [0, 1]) || A[i]);
  }
  const S = V.intersect(A[0], V.sub(L[0], o), A[A.length - 1], V.sub(L[L.length - 1], o)) || A[0];
  return { boxes, cx, tot, xbar, foot, stable, margin, L, o, A, S, order, n: boxes.length };
}

const toU = (m) => OX + m * MPU;
const toY = (m) => GY + m * MPU;

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow;

  dw.label('form_title', 'Form diagram 1:50', { cls: 'title', flash: false });
  dw.label('force_title', 'Force diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });

  dw.seg('ground', { intro: 1, w: dw.W.bar * 0.8, color: PAL.grey, flash: false });
  dw.strokes('hatch', 26, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });

  // four box slots; the fourth only exists in arrangement b)
  for (let i = 0; i < 4; i++) {
    const on = (st) => i < 3 || st.four;
    dw.poly(`box${i}`, 4, { intro: 1, color: PAL.grey, opacity: 0.12, flash: false, when: on });
    dw.strokes(`edge${i}`, 4, { intro: 1, w: dw.W.str, color: PAL.black, when: on });
    dw.dashLine(`la${i}`, { intro: 1, color: PAL.grey, dash: dw.W.dash, when: on });
    dw.arrow(`f${i}`, { intro: 1, color: PAL.green, ...ARR, when: on });
    dw.label(`lf${i}`, `F${'₁₂₃₄'[i]}`, { cls: 'num', intro: 1, color: PAL.green,
      when: (st) => st.lbl && on(st) });
    dw.arrow(`ff${i}`, { intro: 2, color: PAL.green, ...ARR, when: on });
    dw.label(`lff${i}`, `F${'₁₂₃₄'[i]}`, { cls: 'num', intro: 2, color: PAL.green,
      when: (st) => st.lbl && on(st) });
    dw.link(`f${i}`, `ff${i}`, `lf${i}`, `lff${i}`);
    dw.highlight(`f${i}`, [2]);
  }

  dw.disk('ptO', { intro: 3, r: dw.W.disk * 0.8 });
  dw.label('lO', 'o', { cls: 'num', intro: 3, when: (st) => st.lbl });
  for (let i = 0; i <= 4; i++) {
    const on = (st) => i < 4 || st.four;
    dw.seg(`ray${i}`, { intro: 3, w: dw.W.ray, color: PAL.grey, when: on });
  }
  for (let i = 0; i < 3; i++) {
    dw.seg(`str${i}`, { intro: 4, w: dw.W.str, color: PAL.grey,
      when: (st) => i < 2 || st.four });
  }
  dw.dashLine('extA', { intro: 5, color: PAL.grey, dash: dw.W.dash });
  dw.dashLine('extB', { intro: 5, color: PAL.grey, dash: dw.W.dash });
  dw.disk('ptS', { intro: 5, r: dw.W.disk });
  dw.label('lS', 'S', { cls: 'num', intro: 5, when: (st) => st.lbl });

  dw.dashLine('Rline', { intro: 5, color: PAL.grey, dash: dw.W.dash });
  dw.dashArrow('Rform', { intro: 5, color: PAL.green, w: dw.W.arrow.w * 1.15,
    headLen: dw.W.arrow.headLen, headW: dw.W.arrow.headW, dash: dw.W.dash * 1.6, flash: false });
  dw.dashArrow('Rforce', { intro: 5, color: PAL.green, w: dw.W.arrow.w * 1.15,
    headLen: dw.W.arrow.headLen, headW: dw.W.arrow.headW, dash: dw.W.dash * 1.6, flash: false });
  dw.label('lRform', 'R', { cls: 'num', intro: 5, color: PAL.green });
  dw.label('lRforce', 'R', { cls: 'num', intro: 5, color: PAL.green });
  dw.link('Rform', 'Rforce', 'lRform', 'lRforce');

  dw.seg('foot', { intro: RESOLVE, w: dw.W.bar * 1.8, color: PAL.black, flash: false });
  dw.label('lfoot', 'contact patch', { cls: 'point', intro: RESOLVE, flash: false });
  dw.label('verdict', '', { cls: 'num', intro: RESOLVE, flash: false,
    color: { final: (dd) => (dd.stable ? PAL.green : PAL.red) } });
  dw.seg('miss', { intro: RESOLVE, w: dw.W.bar, color: PAL.red, flash: false,
    when: (st, dd) => !!dd && !dd.stable });

  dw.instant('form_title', 'force_title', 'force_sub', 'ground', 'hatch');
  dw.ghostable('ff0', 'ff1', 'ff2', 'ff3', 'Rforce');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    dw.setLabel('form_title', [-16, -11.6]);
    dw.setLabel('force_title', [6, -12.4]);
    dw.setLabel('force_sub', [6, -13.7]);
    dw.setText('force_sub', `1 unit ≙ ${SFD} kN  (sheet: 1 cm ≙ 20 kN)`);

    dw.setSeg('ground', [OX - 13, GY], [OX + 13, GY]);
    const h = [];
    for (let x = OX - 12.6; x < OX + 13; x += 1.0) h.push([[x, GY], [x - 0.55, GY - 0.7]]);
    dw.setStrokes('hatch', h.slice(0, 26));

    // boxes, in the slot order of the current arrangement
    const byIdx = new Map(d.boxes.map((b) => [b.i, b]));
    for (let i = 0; i < 4; i++) {
      const b = byIdx.get(i);
      if (!b) continue;
      const c = [[toU(b.x0), toY(b.y0)], [toU(b.x1), toY(b.y0)],
                 [toU(b.x1), toY(b.y1)], [toU(b.x0), toY(b.y1)]];
      dw.setPoly(`box${i}`, c);
      dw.setStrokes(`edge${i}`, c.map((p, k) => [p, c[(k + 1) % 4]]));
      const x = toU((b.x0 + b.x1) / 2);
      dw.setDashLine(`la${i}`, [[x, toY(b.y1) + 2.2], [x, GY - 7.6]]);
      const tip = [x, toY(b.y1) - (toY(b.y1) - toY(b.y0)) * 0.45];
      dw.setArrow(`f${i}`, [x, tip[1] + SYM], tip);
      dw.setLabel(`lf${i}`, [x + 1.3, tip[1] + SYM * 0.6]);
    }
    // the load line follows the boxes left to right
    d.order.forEach((k, j) => {
      const i = d.boxes[k].i;
      dw.setArrow(`ff${i}`, d.L[j], d.L[j + 1]);
      dw.setLabel(`lff${i}`, V.add(V.mid(d.L[j], d.L[j + 1]), [1.5, 0]));
    });

    dw.setDisk('ptO', d.o);
    dw.setLabel('lO', V.add(d.o, [0.8, 0.9]));
    for (let i = 0; i <= 4; i++) dw.setSeg(`ray${i}`, d.o, d.L[Math.min(i, d.n)]);
    for (let i = 0; i < 3; i++) {
      const a = d.A[Math.min(i, d.A.length - 1)], b = d.A[Math.min(i + 1, d.A.length - 1)];
      dw.setSeg(`str${i}`, a, b);
    }
    dw.setDashLine('extA', [d.S, d.A[0]]);
    dw.setDashLine('extB', [d.A[d.A.length - 1], d.S]);
    dw.setDisk('ptS', d.S);
    dw.setLabel('lS', V.add(d.S, [1.1, -1.0]));

    const xb = toU(d.xbar);
    dw.setDashLine('Rline', [[xb, toY(3.4)], [xb, d.S[1] - 1.6]]);
    dw.setDashArrow('Rform', [xb, toY(3.4)], [xb, toY(3.4) - SYM * 1.3]);
    dw.setLabel('lRform', [xb + 1.4, toY(3.4) - SYM * 0.65]);
    dw.setDashArrow('Rforce', d.L[0], d.L[d.n]);
    dw.setLabel('lRforce', V.add(V.mid(d.L[0], d.L[d.n]), [-1.8, 0]));

    dw.setSeg('foot', [toU(d.foot[0]), GY - 0.3], [toU(d.foot[1]), GY - 0.3]);
    dw.setLabel('lfoot', [toU((d.foot[0] + d.foot[1]) / 2) - 4.6, GY - 1.4]);
    dw.setLabel('verdict', [toU(d.xbar) + 5.0, GY - 2.6]);
    dw.setText('verdict', d.stable
      ? `STABLE — ${d.margin.toFixed(3)} m to spare`
      : `NOT STABLE — misses by ${d.margin.toFixed(3)} m`);
    const near = Math.abs(d.xbar - d.foot[0]) < Math.abs(d.xbar - d.foot[1])
      ? d.foot[0] : d.foot[1];
    dw.setSeg('miss', [toU(near), GY - 0.3], [toU(d.xbar), GY - 0.3]);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  dw.enableDrag((x, y, tol) => {
    if (Math.hypot(x - s.ox, y - s.oy) < tol * 2) return 'o';
    for (const b of d.boxes) {
      if (x > toU(b.x0) && x < toU(b.x1) && y > toY(b.y0) && y < toY(b.y1)) return `b${b.i}`;
    }
    return null;
  }, (h, x, y) => {
    if (h === 'o') { s.ox = x; s.oy = y; } else {
      const i = +h.slice(1);
      const b = d.boxes.find((q) => q.i === i);
      const base = b.x0 - s[`d${i}`];          // where the arrangement puts it
      s[`d${i}`] = (x - OX) / MPU - BOX[i].w / 2 - base;
    }
    refresh();
  });

  const arr = panel.section('The arrangement');
  panel.toggle(arr, s, 'four', 'b) four boxes instead of three', () => {
    s.d0 = 0; s.d1 = 0; s.d2 = 0; s.d3 = 0;
    refresh();
  });
  panel.toggle(arr, s, 'orig', 'a) task 3’s original foot (it tips)', refresh);
  panel.toggle(arr, s, 'lbl', 'show labels', refresh);
  const des = panel.section('Slide a box (m)');
  panel.slider(des, s, 'd0', 'box 1 · 1.5 × 1.0 m · 60 kN', -2, 2, 0.02, refresh);
  panel.slider(des, s, 'd1', 'box 2 · 3.0 × 0.5 m · 60 kN', -2, 2, 0.02, refresh);
  panel.slider(des, s, 'd2', 'box 3 · 1.0 × 1.0 m · 40 kN', -2, 2, 0.02, refresh);
  panel.slider(des, s, 'd3', 'box 4 · 0.5 × 1.5 m · 30 kN', -2, 2, 0.02, refresh);

  refresh();
  return player;
}
