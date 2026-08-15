/**
 * EX 1 · Task 2 — Resultant of several non-parallel forces
 * Structural Design I, HS 22 (sheet EX 1 "Equilibrium").
 *
 * Given: F₁ = 45, F₂ = 30, F₃ = 15, F₄ = 30 kN on four non-parallel lines.
 * Wanted: the resultant's magnitude and direction (force diagram) and its
 * line of action (form diagram) — found with a TRIAL FUNICULAR, because
 * four lines have no single common intersection to hang it on.
 *
 * Geometry digitised from the sheet's vector artwork (pdftocairo -svg):
 * the load arrows start at (219.7, 570.3), (266.0, 553.7), (291.7, 575.8),
 * (339.3, 616.9) pt with directions 82.0°, 90.0°, 85.0° and 110.0° from
 * the +x axis (measured y-down), i.e. the fan the sheet draws. Positions
 * are carried over at 0.2 drawing units per point; the force scale is
 * ours (the sheet prints 1 cm ≙ 15 kN) so the load line fits the frame.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'EX 1.2 — Resultant of several non-parallel forces',
  subtitle: 'Structural Design I · sheet EX 1 “Equilibrium”, task 2',
  about: 'Four forces on four different lines: the force diagram still gives the resultant by laying them tip to tail, but there is no longer a single crossing point to place it on. The trial funicular solves that — any pole, any starting point: draw one string per ray between the action lines, and where the FIRST and LAST strings meet is a point on the resultant’s line of action. Drag the pole and the starting point: the funicular changes shape completely, the answer does not move.',
  frame: [[-26, -15], [30, 14]],
};

const RESOLVE = 8;
const SFD = 6;                       // kN per drawing unit
const LL0 = [17.5, 10.5];            // top of the load line

// the four action lines: a point on the line + its direction (unit, y-up)
const BASE = [
  { p: [-20.0, 6.0], a: 82.0, F: 45 },
  { p: [-10.74, 9.32], a: 90.0, F: 30 },
  { p: [-5.60, 4.90], a: 85.0, F: 15 },
  { p: [3.90, -3.32], a: 110.0, F: 30 },
];

const DEFAULTS = {
  F1: 45, F2: 30, F3: 15, F4: 30,
  ox: 8.5, oy: 1.0,                  // the trial pole (draggable)
  a0: 19.0,                          // start of the trial funicular on line 1
  lbl: true,
  _k: 99,
};

const STEPS = [
  { t: 'The exercise', d: 'EX 1 task 2: four forces, four different lines of action — the resultant needs a TRIAL FUNICULAR to be placed' },
  { t: 'The four given forces', d: 'left: F₁ … F₄ green on their lines of action — no two of them meet in one common point, so the trick of task 1 is not available',
    detail: (d, st) => [`F₁ = ${st.F1} · F₂ = ${st.F2} · F₃ = ${st.F3} · F₄ = ${st.F4} kN`] },
  { t: 'The load line', d: 'right: the four vectors laid tip to tail, each parallel to its own line of action — this already answers HOW BIG and WHICH WAY, but says nothing about WHERE',
    detail: (d) => [`the closing vector: ${d.R.toFixed(1)} kN at ${d.ang.toFixed(1)}° below the horizontal`] },
  { t: 'Pick any pole o', d: 'right: choose a pole — anywhere (drag it!) — and draw the rays from it to every division of the load line: the rays are the “handles” of the funicular' },
  { t: 'The trial funicular', d: 'left: start anywhere on line 1 (drag the start!) and walk: between two action lines draw a string parallel to the ray that separates them — string 1 ∥ ray 1, string 2 ∥ ray 2, and so on to string 4',
    take: 'each string is where the partial resultant of everything to its left acts' },
  { t: 'Close the funicular', d: 'left: extend the FIRST string and the LAST string (dashed) — right: the same two rays, o–0 and o–4, bracket the whole load line' },
  { t: 'Their meeting point S', d: 'left: the two extended strings meet at S. The whole system of four forces has the same effect as one force through S — that is what the funicular has found',
    take: 'the funicular is a detour that turns a force POLYGON into a force POSITION' },
  { t: 'The resultant — in both diagrams', d: 'right: R closes the load line from its start to its end — left: the same vector through S, dashed green',
    detail: (d) => [`R = ${d.R.toFixed(1)} kN at ${d.ang.toFixed(1)}° below the horizontal, through S`,
                    `components: →${d.Rv[0].toFixed(1)} · ↓${(-d.Rv[1]).toFixed(1)} kN`] },
  { t: 'The answer', d: 'drag the pole o or the starting point: the trial funicular takes a completely different shape every time — and the resultant stays exactly where it is',
    detail: (d) => [`R = ${d.R.toFixed(1)} kN, ${d.ang.toFixed(1)}° below the horizontal`,
                    `its line of action passes through S = (${d.S[0].toFixed(1)}, ${d.S[1].toFixed(1)})`],
    take: 'the trial funicular is “trial” because the pole is free — every choice gives the same resultant' },
];

function compute(s) {
  const Fs = [s.F1, s.F2, s.F3, s.F4];
  const lines = BASE.map((b, i) => {
    const t = b.a * Math.PI / 180;
    return { p: b.p, d: [Math.cos(t), -Math.sin(t)], F: Fs[i] };
  });
  // load line, tip to tail
  const L = [LL0.slice()];
  for (const ln of lines) L.push(V.add(L[L.length - 1], V.mul(ln.d, ln.F / SFD)));
  const Rv = V.mul(V.sub(L[4], L[0]), SFD);
  const R = Math.hypot(Rv[0], Rv[1]);
  const ang = Math.atan2(-Rv[1], Rv[0]) * 180 / Math.PI;
  const o = [s.ox, s.oy];
  // trial funicular: start on line 1, one string per ray
  const A = [V.add(lines[0].p, V.mul(lines[0].d, s.a0 - 9.0))];
  for (let i = 0; i < 3; i++) {
    const dir = V.sub(L[i + 1], o);                 // ray i+1
    const nx = V.intersect(A[i], dir, lines[i + 1].p, lines[i + 1].d);
    A.push(nx || A[i]);
  }
  const first = V.sub(L[0], o);                     // ray 0
  const last = V.sub(L[4], o);                      // ray 4
  const S = V.intersect(A[0], first, A[3], last) || A[0];
  return { lines, L, o, A, S, Rv, R, ang, uR: V.unit(Rv), first, last };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const W_RAY = dw.W.ray, W_STR = dw.W.str;
  const ARR = dw.W.arrow;

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });

  for (let i = 0; i < 4; i++) {
    dw.dashLine(`la${i}`, { intro: 1, color: PAL.grey, dash: dw.W.dash });
    dw.arrow(`f${i}`, { intro: 1, color: PAL.green, ...ARR });
    dw.label(`lf${i}`, `F${'₁₂₃₄'[i]}`, { cls: 'num', intro: 1, color: PAL.green, when: (st) => st.lbl });
    dw.arrow(`ff${i}`, { intro: 2, color: PAL.green, ...ARR });
    dw.label(`lff${i}`, `F${'₁₂₃₄'[i]}`, { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.lbl });
    dw.link(`f${i}`, `ff${i}`, `lf${i}`, `lff${i}`);
    dw.highlight(`f${i}`, [2]);
  }
  // pole + rays
  dw.disk('ptO', { intro: 3, r: dw.W.disk * 0.8 });
  dw.label('lO', 'o', { cls: 'num', intro: 3, when: (st) => st.lbl });
  for (let i = 0; i <= 4; i++) {
    dw.seg(`ray${i}`, { intro: i === 0 || i === 4 ? 5 : 3, w: W_RAY, color: PAL.grey });
    dw.label(`lr${i}`, `${i}`, { cls: 'point', intro: 3, color: PAL.grey, when: (st) => st.lbl });
  }
  // the trial funicular
  for (let i = 1; i <= 3; i++) {
    dw.seg(`str${i}`, { intro: 4, w: W_STR, color: PAL.grey });
    dw.link(`str${i}`, `ray${i}`);
  }
  dw.dashLine('ext0', { intro: 5, color: PAL.grey, dash: dw.W.dash });
  dw.dashLine('ext4', { intro: 5, color: PAL.grey, dash: dw.W.dash });
  dw.link('ext0', 'ray0');
  dw.link('ext4', 'ray4');
  dw.disk('ptS', { intro: 6, r: dw.W.disk });
  dw.label('lS', 'S', { cls: 'num', intro: 6, when: (st) => st.lbl });
  // the resultant, in both diagrams at the same step
  dw.dashArrow('Rform', { intro: 7, color: PAL.green, w: dw.W.arrow.w * 1.15,
                          headLen: dw.W.arrow.headLen, headW: dw.W.arrow.headW,
                          dash: dw.W.dash * 1.6, flash: false });
  dw.dashArrow('Rforce', { intro: 7, color: PAL.green, w: dw.W.arrow.w * 1.15,
                           headLen: dw.W.arrow.headLen, headW: dw.W.arrow.headW,
                           dash: dw.W.dash * 1.6, flash: false });
  dw.label('lRform', 'R', { cls: 'num', intro: 7, color: PAL.green });
  dw.label('lRforce', 'R', { cls: 'num', intro: 7, color: PAL.green });
  dw.link('Rform', 'Rforce', 'lRform', 'lRforce');
  dw.label('ro1', '', { intro: RESOLVE, flash: false, color: PAL.green });

  dw.instant('form_title', 'force_title', 'force_sub');
  dw.ghostable('ff0', 'ff1', 'ff2', 'ff3', 'Rforce');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    dw.setLabel('form_title', [-21, -12.5]);
    dw.setLabel('force_title', [17, -12.5]);
    dw.setLabel('force_sub', [17, -13.6]);
    dw.setText('force_sub', `1 unit :: ${SFD} kN`);

    d.lines.forEach((ln, i) => {
      dw.setDashLine(`la${i}`, [V.sub(ln.p, V.mul(ln.d, 4)), V.add(ln.p, V.mul(ln.d, 22))]);
      const tail = ln.p;
      const tip = V.add(tail, V.mul(ln.d, 4.2));
      dw.setArrow(`f${i}`, tail, tip);
      dw.setLabel(`lf${i}`, V.add(V.mid(tail, tip), V.mul(V.perp(ln.d), 1.3)));
      dw.setArrow(`ff${i}`, d.L[i], d.L[i + 1]);
      dw.setLabel(`lff${i}`, V.add(V.mid(d.L[i], d.L[i + 1]), [1.35, 0]));
    });
    dw.setDisk('ptO', d.o);
    dw.setLabel('lO', V.add(d.o, [-1.1, 0.6]));
    for (let i = 0; i <= 4; i++) {
      dw.setSeg(`ray${i}`, d.o, d.L[i]);
      dw.setLabel(`lr${i}`, V.add(d.L[i], [0.85, 0.15]));
    }
    for (let i = 1; i <= 3; i++) dw.setSeg(`str${i}`, d.A[i - 1], d.A[i]);
    dw.setDashLine('ext0', [d.S, d.A[0]]);
    dw.setDashLine('ext4', [d.A[3], d.S]);
    dw.setDisk('ptS', d.S);
    dw.setLabel('lS', V.add(d.S, [1.2, 0.9]));

    const len = d.R / SFD;
    const tail = V.sub(d.S, V.mul(d.uR, len * 0.3));
    dw.setDashArrow('Rform', tail, V.add(tail, V.mul(d.uR, len)));
    dw.setLabel('lRform', V.add(V.add(tail, V.mul(d.uR, len)), [1.4, -0.5]));
    dw.setDashArrow('Rforce', d.L[0], d.L[4]);
    dw.setLabel('lRforce', V.add(V.mid(d.L[0], d.L[4]), [-1.6, 0]));

    dw.setLabel('ro1', [0.5, -12.5]);
    dw.setText('ro1', `R = ${d.R.toFixed(1)} kN at ${d.ang.toFixed(1)}°`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  // drag the pole and the funicular's starting point
  dw.enableDrag((x, y, tol) => {
    if (Math.hypot(x - s.ox, y - s.oy) < tol * 2) return 'o';
    const a0 = d.A[0];
    if (Math.hypot(x - a0[0], y - a0[1]) < tol * 2) return 'a0';
    return null;
  }, (key, x, y) => {
    if (key === 'o') { s.ox = x; s.oy = y; }
    else {
      const ln = d.lines[0];
      s.a0 = 9.0 + V.dot(V.sub([x, y], ln.p), ln.d);
    }
    refresh();
  });

  const par = panel.section('Given');
  for (const [k, lb] of [['F1', 'F₁ (kN)'], ['F2', 'F₂ (kN)'], ['F3', 'F₃ (kN)'], ['F4', 'F₄ (kN)']]) {
    panel.slider(par, s, k, lb, 5, 60, 1, refresh);
  }
  panel.toggle(par, s, 'lbl', 'show labels', refresh);
  const tr = panel.section('The trial');
  panel.slider(tr, s, 'ox', 'pole o — x', -2, 16, 0.2, refresh);
  panel.slider(tr, s, 'oy', 'pole o — y', -10, 10, 0.2, refresh);
  panel.slider(tr, s, 'a0', 'start of the funicular', 8, 26, 0.2, refresh);

  refresh();
  return player;
}
