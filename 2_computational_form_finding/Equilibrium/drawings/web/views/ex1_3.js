/**
 * EX 1 · Task 3 — Resultant of several parallel forces
 * Structural Design I, HS 22 (sheet EX 1 "Equilibrium").
 *
 * Given: a sculpture of three welded steel boxes, weights F₁ = 60,
 * F₂ = 60, F₃ = 40 kN acting at their centroids. Wanted: the resultant
 * (magnitude, direction, position) by a trial funicular — and the verdict
 * on stability, since the stack is NOT fixed to the ground.
 *
 * Geometry digitised from the sheet's vector artwork (pdftocairo -svg) and
 * carried over at 0.12 drawing units per point. The boxes come out as
 * clean round sizes at the sheet's 1:50: top 1.5 × 1.0 m, middle
 * 3.0 × 0.5 m, bottom 1.0 × 1.0 m. Parallel weights, so the resultant is
 * vertical: ΣF = 160 kN, and its line of action falls at x̄ = 16.11
 * (drawing units, +8 in the view's frame) — LEFT of the bottom box's
 * contact patch, so it tips.
 * The stack therefore tips: the sheet's checkbox answer is "not stable".
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'EX 1.3 — Resultant of several parallel forces',
  subtitle: 'Structural Design I · sheet EX 1 “Equilibrium”, task 3',
  about: 'Three welded steel boxes, each contributing its own weight. Parallel forces have no crossing point at all, so the trial funicular is the only way to place their resultant — and here the position IS the answer: if the resultant falls outside the patch where the sculpture touches the ground, it tips. Drag the boxes and watch the verdict flip.',
  result: (d) => [`R = ${d.R.toFixed(0)} kN vertical, at x̄ = ${d.xbar.toFixed(2)}`,
                  `contact patch ${d.foot[0].toFixed(2)} … ${d.foot[1].toFixed(2)} → ${d.stable ? 'STABLE' : 'NOT STABLE, the sculpture tips'}`],
  frame: [[2, -26], [60, 14]],
};

const RESOLVE = 7;    // last step index (STEPS has 8 entries)
const SFD = 8;                          // kN per drawing unit
const LLX = 49.5, LLY = 9.0;           // top of the load line

const DEFAULTS = {
  F1: 60, F2: 60, F3: 40,               // kN, the three box weights
  b1x: 12.58, b2x: 16.62, b3x: 26.29,   // left edge of each box (draggable)
  ox: 41.0, oy: 1.0,                    // trial pole
  a0: -12.0,                            // funicular start height (it hangs BELOW)
  lbl: true,
  _k: 99,
};

// box sizes in drawing units (1.5x1.0, 3.0x0.5, 1.0x1.0 m at 1:50)
const GY = -8.0;                        // ground level in the view's frame
const BOX = [
  { w: 10.20, h: 6.79, y: GY + 10.20 }, // top
  { w: 20.40, h: 3.41, y: GY + 6.79 },  // middle
  { w: 6.80, h: 6.79, y: GY },          // bottom (this one touches the ground)
];

const STEPS = [
  { t: 'The exercise', d: 'EX 1 task 3: a sculpture of three welded steel boxes, standing free on the ground — where does its weight act, and does it stand up?' },
  { t: 'The sculpture and its weights', d: 'left: the three boxes; each weight acts as a vertical force through its own centroid (green, dash-dot lines of action)',
    detail: (d, st) => [`F₁ = ${st.F1} · F₂ = ${st.F2} · F₃ = ${st.F3} kN — ΣF = ${(st.F1 + st.F2 + st.F3)} kN`] },
  { t: 'The load line', d: 'right: three parallel weights laid tip to tail make one straight load line — the resultant is obviously vertical and equal to their sum. Its POSITION is the whole question' },
  { t: 'Pick any pole o', d: 'right: a trial pole and its rays to every division of the load line (drag the pole — nothing about the answer depends on it)' },
  { t: 'The trial funicular', d: 'left: start anywhere on the first line of action and draw one string per ray, turning at each line of action' },
  { t: 'Close it: the point S', d: 'left: the first and last strings, extended (dashed), meet at S — the resultant passes through it',
    take: 'for parallel forces this is the ONLY way to find the position — there is no intersection of lines of action to use' },
  { t: 'The resultant — in both diagrams', d: 'right: R closes the load line — left: the same vector on the vertical through S, dashed green',
    detail: (d) => [`R = ${d.R.toFixed(0)} kN, vertical, at x̄ = ${d.xbar.toFixed(2)}`] },
  { t: 'Stable or not?', d: 'left: the sculpture only touches the ground under the bottom box (heavy line). The resultant falls OUTSIDE that patch, so the weight cannot be balanced by a contact force — the sculpture tips over the near edge',
    detail: (d) => [`resultant at x̄ = ${d.xbar.toFixed(2)} · contact patch ${d.foot[0].toFixed(2)} … ${d.foot[1].toFixed(2)}`,
                    d.stable ? 'inside the patch → STABLE' : `outside by ${d.margin.toFixed(2)} units → NOT STABLE`],
    take: 'a body standing free is stable only while the resultant of its weight lands inside the contact patch' },
];

let OFF = 1;
function compute(s) {
  const Fs = [s.F1, s.F2, s.F3];
  const bx = [s.b1x, s.b2x, s.b3x];
  const boxes = BOX.map((b, i) => ({ x0: bx[i], x1: bx[i] + b.w, y0: b.y, y1: b.y + b.h }));
  const cx = boxes.map((b) => (b.x0 + b.x1) / 2);
  const tot = Fs.reduce((a, b) => a + b, 0);
  const xbar = cx.reduce((a, c, i) => a + c * Fs[i], 0) / tot;
  // load line (all vertical, downwards)
  const L = [[LLX, LLY]];
  for (const F of Fs) L.push([LLX, L[L.length - 1][1] - F / SFD]);
  const o = [s.ox, s.oy];
  // trial funicular over the three vertical lines of action
  const A = [[cx[0], s.a0]];
  for (let i = 0; i < 2; i++) {
    const dir = V.sub(L[i + 1], o);
    A.push(V.intersect(A[i], dir, [cx[i + 1], GY], [0, 1]) || A[i]);
  }
  const S = V.intersect(A[0], V.sub(L[0], o), A[2], V.sub(L[3], o)) || A[0];
  const foot = [boxes[2].x0, boxes[2].x1];
  const stable = xbar >= foot[0] && xbar <= foot[1];
  const margin = stable ? 0 : Math.min(Math.abs(xbar - foot[0]), Math.abs(xbar - foot[1]));
  const off = [OFF, 0];        // perpendicular to the vertical load line
  return { boxes, cx, Fs, tot, xbar, L, o, A, S, foot, stable, margin, R: tot, off };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  OFF = dw.W.off;
  const W_RAY = dw.W.ray, W_STR = dw.W.str;
  const ARR = dw.W.arrow;

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });

  // ground + boxes
  dw.seg('ground', { intro: 1, w: dw.W.bar * 0.8, color: PAL.grey, flash: false });
  dw.strokes('hatch', 26, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  for (let i = 0; i < 3; i++) {
    dw.poly(`box${i}`, 4, { intro: 1, color: PAL.grey, opacity: 0.1, flash: false });
    dw.strokes(`edge${i}`, 4, { intro: 1, w: dw.W.str, color: PAL.black });
    dw.dashLine(`la${i}`, { intro: 1, color: PAL.grey, dash: dw.W.dash });
    dw.arrow(`f${i}`, { intro: 1, color: PAL.green, ...ARR });
    dw.label(`lf${i}`, `F${'₁₂₃'[i]}`, { cls: 'num', intro: 1, color: PAL.green, when: (st) => st.lbl });
    dw.arrow(`ff${i}`, { intro: 2, color: PAL.green, ...ARR });
    dw.label(`lff${i}`, `F${'₁₂₃'[i]}`, { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.lbl });
    dw.link(`f${i}`, `ff${i}`, `lf${i}`, `lff${i}`);
    dw.highlight(`f${i}`, [2]);
  }
  // the contact patch, called out at the verdict
  dw.seg('foot', { intro: RESOLVE, w: dw.W.bar * 1.6, color: PAL.black, flash: false });
  dw.label('lfoot', 'contact patch', { cls: 'point', intro: RESOLVE, flash: false });

  dw.disk('ptO', { intro: 3, r: dw.W.disk * 0.8 });
  dw.label('lO', 'o', { cls: 'num', intro: 3, when: (st) => st.lbl });
  for (let i = 0; i <= 3; i++) {
    dw.seg(`ray${i}`, { intro: i === 0 || i === 3 ? 5 : 3, w: W_RAY, color: PAL.grey });
    dw.label(`lr${i}`, `${i}`, { cls: 'point', intro: 3, color: PAL.grey, when: (st) => st.lbl });
  }
  for (let i = 1; i <= 2; i++) {
    dw.seg(`str${i}`, { intro: 4, w: W_STR, color: PAL.grey });
    dw.link(`str${i}`, `ray${i}`);
  }
  dw.dashLine('ext0', { intro: 5, color: PAL.grey, dash: dw.W.dash });
  dw.dashLine('ext3', { intro: 5, color: PAL.grey, dash: dw.W.dash });
  dw.link('ext0', 'ray0');
  dw.link('ext3', 'ray3');
  dw.disk('ptS', { intro: 5, r: dw.W.disk });
  dw.label('lS', 'S', { cls: 'num', intro: 5, when: (st) => st.lbl });

  dw.dashLine('Rline', { intro: 6, color: PAL.grey, dash: dw.W.dash });
  dw.dashArrow('Rform', { intro: 6, color: PAL.green, w: dw.W.arrow.w * 1.15,
                          headLen: dw.W.arrow.headLen, headW: dw.W.arrow.headW,
                          dash: dw.W.dash * 1.6, flash: false });
  dw.dashArrow('Rforce', { intro: 6, color: PAL.green, w: dw.W.arrow.w * 1.15,
                           headLen: dw.W.arrow.headLen, headW: dw.W.arrow.headW,
                           dash: dw.W.dash * 1.6, flash: false });
  dw.label('lRform', 'R', { cls: 'num', intro: 6, color: PAL.green });
  dw.label('lRforce', 'R', { cls: 'num', intro: 6, color: PAL.green });
  dw.link('Rform', 'Rforce', 'lRform', 'lRforce');
  dw.label('verdict', '', { cls: 'num', intro: RESOLVE, flash: false,
    color: { final: (dd) => (dd.stable ? PAL.green : PAL.red) } });

  dw.instant('form_title', 'force_title', 'force_sub', 'ground', 'hatch');
  dw.ghostable('ff0', 'ff1', 'ff2', 'Rforce');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    dw.setLabel('form_title', [10, -23.5]);
    dw.setLabel('force_title', [45, -23.5]);
    dw.setLabel('force_sub', [45, -24.7]);
    dw.setText('force_sub', `1 unit :: ${SFD} kN`);

    dw.setSeg('ground', [6, GY], [42, GY]);
    const h = [];
    for (let x = 6.4; x < 42; x += 1.35) h.push([[x, GY], [x - 0.7, GY - 0.9]]);
    dw.setStrokes('hatch', h.slice(0, 26));

    d.boxes.forEach((b, i) => {
      const c = [[b.x0, b.y0], [b.x1, b.y0], [b.x1, b.y1], [b.x0, b.y1]];
      dw.setPoly(`box${i}`, c);
      dw.setStrokes(`edge${i}`, c.map((p, k) => [p, c[(k + 1) % 4]]));
      const x = d.cx[i];
      dw.setDashLine(`la${i}`, [[x, b.y1 + 5], [x, GY - 8]]);
      const tip = [x, b.y1 - (b.y1 - b.y0) * 0.42];
      dw.setArrow(`f${i}`, [x, tip[1] + 4.6], tip);
      dw.setLabel(`lf${i}`, [x + 1.4, tip[1] + 2.4]);
      dw.setArrow(`ff${i}`, d.L[i], d.L[i + 1]);
      dw.setLabel(`lff${i}`, V.add(V.mid(d.L[i], d.L[i + 1]), [1.5, 0]));
    });

    dw.setDisk('ptO', d.o);
    dw.setLabel('lO', V.add(d.o, [0.6, 0.9]));
    for (let i = 0; i <= 3; i++) {
      dw.setSeg(`ray${i}`, d.o, d.L[i]);
      dw.setLabel(`lr${i}`, V.add(d.L[i], [0.9, 0.1]));
    }
    for (let i = 1; i <= 2; i++) dw.setSeg(`str${i}`, d.A[i - 1], d.A[i]);
    dw.setDashLine('ext0', [d.S, d.A[0]]);
    dw.setDashLine('ext3', [d.A[2], d.S]);
    dw.setDisk('ptS', d.S);
    dw.setLabel('lS', V.add(d.S, [1.1, 0.9]));

    dw.setDashLine('Rline', [[d.xbar, GY + 15], [d.xbar, d.S[1] - 2]]);
    dw.setDashArrow('Rform', [d.xbar, GY + 12], [d.xbar, GY + 12 - d.R / SFD]);
    dw.setLabel('lRform', [d.xbar - 1.9, GY + 12 - d.R / SFD * 0.5]);
    dw.setDashArrow('Rforce', V.add(d.L[0], d.off), V.add(d.L[3], d.off));
    dw.setLabel('lRforce', V.add(V.add(V.mid(d.L[0], d.L[3]), d.off), [1.7, 0]));

    dw.setSeg('foot', [d.foot[0], GY - 0.35], [d.foot[1], GY - 0.35]);
    dw.setLabel('lfoot', [(d.foot[0] + d.foot[1]) / 2, GY - 1.9]);
    dw.setLabel('verdict', [d.xbar - 0.5, GY - 3.4]);
    dw.setText('verdict', d.stable ? 'STABLE' : 'NOT STABLE — it tips');

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  dw.enableDrag((x, y, tol) => {
    if (Math.hypot(x - s.ox, y - s.oy) < tol * 2) return 'o';
    for (let i = 0; i < 3; i++) {
      const b = d.boxes[i];
      if (x > b.x0 && x < b.x1 && y > b.y0 && y < b.y1) return 'b' + i;
    }
    return null;
  }, (key, x) => {
    if (key === 'o') { s.ox = x; }
    else {
      const i = +key[1];
      const w = BOX[i].w;
      s[`b${i + 1}x`] = x - w / 2;
    }
    refresh();
  });

  const par = panel.section('Given');
  panel.slider(par, s, 'F1', 'F₁ top box (kN)', 10, 120, 5, refresh);
  panel.slider(par, s, 'F2', 'F₂ middle box (kN)', 10, 120, 5, refresh);
  panel.slider(par, s, 'F3', 'F₃ bottom box (kN)', 10, 120, 5, refresh);
  panel.toggle(par, s, 'lbl', 'show labels', refresh);
  const pos = panel.section('Move the boxes');
  panel.slider(pos, s, 'b1x', 'top box — left edge', 6, 28, 0.2, refresh);
  panel.slider(pos, s, 'b2x', 'middle box — left edge', 8, 28, 0.2, refresh);
  panel.slider(pos, s, 'b3x', 'bottom box — left edge', 16, 36, 0.2, refresh);
  const tr = panel.section('The trial');
  panel.slider(tr, s, 'ox', 'pole o — x', 32, 48, 0.5, refresh);
  panel.slider(tr, s, 'oy', 'pole o — y', -8, 10, 0.5, refresh);
  panel.slider(tr, s, 'a0', 'start of the funicular', -20, -8, 0.5, refresh);

  refresh();
  return player;
}
