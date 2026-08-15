/**
 * EX 2 · Task 1 — Analysing cables with a given geometry
 * Structural Design I, HS 22 (sheet EX 2 "Dimensioning and Graphic Statics").
 *
 * Given: a two-segment cable of span L hung between A and B with a single
 * load F₁ = 100 kN at its middle node — case a) with sag h, case b) with
 * sag h/2. Wanted: the force diagram of every subsystem (node I and the
 * two supports) for both cases, tension red, compression blue, external
 * green.
 *
 * Geometry digitised from the sheet's vector artwork (pdftocairo -svg):
 * a) polyline (182.2, 325.3) → (267.2, 396.2) → (352.2, 325.3) pt,
 * b) polyline (182.2, 779.4) → (267.2, 814.8) → (352.2, 779.4) pt — same
 * span 170 pt, sags 70.9 and 35.4 pt, i.e. exactly h and h/2.
 *
 * Closed form (checks the construction): H = F·L / (4h), V = F/2,
 * N = √(V² + H²). a) H = 59.9, N = 78.1 kN · b) H = 120.1, N = 130.1 kN.
 * Halving the sag doubles the thrust — the point of the exercise.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'EX 2.1 — Analysing cables with a given geometry',
  subtitle: 'Structural Design I · sheet EX 2 “Dimensioning and Graphic Statics”, task 1',
  about: 'The same span, the same load, two different sags. Closing the force polygon at the middle node gives the cable force directly, and the supports simply take the two ends of it. Halving the sag doubles the horizontal thrust and very nearly doubles the cable force — the flatter a cable, the harder it pulls. Drag the sag of either cable and watch both diagrams follow.',
  result: (d) => [`a) sag h:   N = ${d.a.N.toFixed(1)} kN tension, thrust H = ${d.a.H.toFixed(1)} kN`,
                  `b) sag h/2: N = ${d.b.N.toFixed(1)} kN tension, thrust H = ${d.b.H.toFixed(1)} kN`,
                  `halving the sag doubles the thrust (×${(d.b.H / d.a.H).toFixed(2)})`],
  frame: [[-37, -45], [33, 5]],
};

const RESOLVE = 7;
const SFD = 8;                       // kN per drawing unit
const SPAN = 25.5;                   // drawing units (170 pt at 0.15)
const CASES = [
  { k: 'a', ax: -32, ay: -2, fx: 27, fy: -3 },
  { k: 'b', ax: -32, ay: -26, fx: 27, fy: -27 },
];

const DEFAULTS = {
  F: 100,                            // kN, the node load
  o1: true, sIF: 0.011,              // thickness ∝ force
  ha: 10.63, hb: 5.31,               // the two sags (h and h/2), draggable
  lbl: true,
  _k: 99,
};

const STEPS = [
  { t: 'The exercise', d: 'EX 2 task 1: one load, one span, two sags — draw the force diagram of every subsystem and compare' },
  { t: 'Two cables, same span', d: 'left: both cables carry the same load over the same span between A and B; the only difference is the sag — case a) has h, case b) only h/2',
    detail: (d, st) => [`span L = ${SPAN.toFixed(1)} · sag a) ${st.ha.toFixed(2)} · sag b) ${st.hb.toFixed(2)} (half)`] },
  { t: 'The load at the middle node', d: 'left: F₁ hangs at node I of each cable — right: the same force laid off downwards, the start of both force diagrams',
    detail: (d, st) => [`F₁ = ${st.F} kN in both cases`] },
  { t: 'a) Node I closes', d: 'left: at node I the two cable segments 1 and 2 meet the load — right: the polygon closes with two equal segments, parallel to the cable: both are TENSION',
    detail: (d) => [`a) N₁ = N₂ = ${d.a.N.toFixed(1)} kN tension · horizontal part H = ${d.a.H.toFixed(1)} kN`] },
  { t: 'a) The supports', d: 'left: at A and B the cable pulls down and inward, so each support must pull up and outward — right: the same two vectors, read straight off the ends of the polygon',
    detail: (d) => [`a) each support: V = ${d.a.V.toFixed(1)} kN up · H = ${d.a.H.toFixed(1)} kN inward · resultant ${d.a.N.toFixed(1)} kN`] },
  { t: 'b) The same, with half the sag', d: 'left: the flatter cable — right: its polygon has the same vertical F₁, but the segments must be far flatter, so they get far longer',
    detail: (d) => [`b) N₁ = N₂ = ${d.b.N.toFixed(1)} kN · H = ${d.b.H.toFixed(1)} kN`] },
  { t: 'Halve the sag, double the thrust', d: 'both diagrams side by side: the load never changed, but the flat cable pulls its supports apart with twice the force',
    detail: (d) => [`H: ${d.a.H.toFixed(1)} → ${d.b.H.toFixed(1)} kN (×${(d.b.H / d.a.H).toFixed(2)})`,
                    `N: ${d.a.N.toFixed(1)} → ${d.b.N.toFixed(1)} kN (×${(d.b.N / d.a.N).toFixed(2)})`],
    take: 'H = F·L/4h — the thrust is inversely proportional to the sag, and that is what a cable costs' },
];

function one(c, h, F) {
  const A = [c.ax, c.ay], B = [c.ax + SPAN, c.ay];
  const I = [c.ax + SPAN / 2, c.ay - h];
  const V_ = F / 2;
  const H = F * SPAN / (4 * h);
  const N = Math.hypot(V_, H);
  // force polygon at the node: F down, then the two segment forces close it
  const P0 = [c.fx, c.fy];
  const P1 = [c.fx, c.fy - F / SFD];
  const Pm = [c.fx - H / SFD, c.fy - F / SFD / 2];   // the closing apex
  return { A, B, I, V: V_, H, N, P0, P1, Pm, h };
}

function compute(s) {
  return { a: one(CASES[0], s.ha, s.F), b: one(CASES[1], s.hb, s.F) };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const CST = { a: [3, 4], b: [5, 5] };        // [node step, support step]

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });

  for (const c of CASES) {
    const k = c.k, [ns, ss] = CST[k];
    dw.label(`ck${k}`, `${k})`, { cls: 'num', intro: 1, flash: false });
    // the cable, drawn in tension colour once its node is solved
    for (const i of [1, 2]) {
      dw.poly(`if${k}${i}`, 4, { intro: 3, opacity: 1.0, z: -0.18, flash: false,
        color: { pending: PAL.grey, final: () => PAL.red }, when: (st) => st.o1 });
      dw.seg(`m${k}${i}`, { intro: 1, w: dw.W.bar,
        color: { pending: PAL.black, final: () => PAL.red } });
      dw.seg(`p${k}${i}`, { intro: ns, w: dw.W.bar,
        color: { pending: PAL.black, final: () => PAL.red } });
      dw.link(`m${k}${i}`, `p${k}${i}`);
      dw.highlight(`m${k}${i}`, [ns]);
    }
    dw.disk(`ndI${k}`, { intro: 1, r: dw.W.disk * 0.8 });
    dw.disk(`ndA${k}`, { intro: 1, r: dw.W.disk * 0.8 });
    dw.disk(`ndB${k}`, { intro: 1, r: dw.W.disk * 0.8 });
    dw.label(`lA${k}`, 'A', { cls: 'num', intro: 1, when: (st) => st.lbl });
    dw.label(`lB${k}`, 'B', { cls: 'num', intro: 1, when: (st) => st.lbl });
    dw.label(`lI${k}`, 'I', { cls: 'num', intro: 1, when: (st) => st.lbl });
    dw.seg(`span${k}`, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.dashLine(`sag${k}`, { intro: 1, color: PAL.grey, dash: dw.W.dash });
    dw.label(`lsag${k}`, '', { cls: 'point', intro: 1, flash: false, color: PAL.grey });
    // the load, in both diagrams at the same step
    dw.arrow(`f${k}`, { intro: 2, color: PAL.green, ...ARR });
    dw.arrow(`ff${k}`, { intro: 2, color: PAL.green, ...ARR });
    dw.label(`lf${k}`, 'F₁', { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.lbl });
    dw.label(`lff${k}`, 'F₁', { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.lbl });
    dw.link(`f${k}`, `ff${k}`, `lf${k}`, `lff${k}`);
    // the support reactions, form + force together
    for (const e of ['A', 'B']) {
      dw.arrow(`r${k}${e}`, { intro: ss, color: PAL.green, ...NARR });
      dw.arrow(`fr${k}${e}`, { intro: ss, color: PAL.green, ...NARR });
      dw.link(`r${k}${e}`, `fr${k}${e}`);
    }
    dw.label(`lH${k}`, '', { intro: ss, flash: false, color: PAL.green });
    dw.label(`lN${k}`, '', { intro: ns, flash: false, color: PAL.red });
  }
  dw.instant('form_title', 'force_title', 'force_sub');
  dw.ghostable('ffa', 'ffb', 'pa1', 'pa2', 'pb1', 'pb2', 'fraA', 'fraB', 'frbA', 'frbB');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    dw.setLabel('form_title', [-30, -41.5]);
    dw.setLabel('force_title', [14, -41.5]);
    dw.setLabel('force_sub', [14, -43.1]);
    dw.setText('force_sub', `1 unit :: ${SFD} kN`);

    for (const c of CASES) {
      const k = c.k, x = d[k];
      dw.setLabel(`ck${k}`, [c.ax - 3.5, c.ay + 3.4]);
      dw.setSeg(`m${k}1`, x.A, x.I);
      dw.setSeg(`m${k}2`, x.I, x.B);
      dw.setPoly(`if${k}1`, V.rectPoints(x.A, x.I, s.sIF * x.N));
      dw.setPoly(`if${k}2`, V.rectPoints(x.I, x.B, s.sIF * x.N));
      dw.setDisk(`ndI${k}`, x.I);
      dw.setDisk(`ndA${k}`, x.A);
      dw.setDisk(`ndB${k}`, x.B);
      dw.setLabel(`lA${k}`, V.add(x.A, [-1.6, 1.1]));
      dw.setLabel(`lB${k}`, V.add(x.B, [1.6, 1.1]));
      dw.setLabel(`lI${k}`, V.add(x.I, [-1.7, -0.6]));
      dw.setSeg(`span${k}`, V.add(x.A, [0, 3.2]), V.add(x.B, [0, 3.2]));
      dw.setDashLine(`sag${k}`, [[x.I[0], x.A[1]], x.I]);
      dw.setLabel(`lsag${k}`, [x.I[0] + 1.5, (x.A[1] + x.I[1]) / 2]);
      dw.setText(`lsag${k}`, k === 'a' ? 'h' : 'h/2');

      const tip = V.add(x.I, [0, -s.F / SFD * 0.55]);
      dw.setArrow(`f${k}`, x.I, tip);
      dw.setLabel(`lf${k}`, V.add(V.mid(x.I, tip), [1.7, 0]));
      dw.setArrow(`ff${k}`, x.P0, x.P1);
      dw.setLabel(`lff${k}`, V.add(V.mid(x.P0, x.P1), [1.8, 0]));

      // the two cable forces close the polygon through the apex Pm
      dw.setSeg(`p${k}1`, x.P1, x.Pm);
      dw.setSeg(`p${k}2`, x.Pm, x.P0);
      dw.setLabel(`lN${k}`, V.add(x.Pm, [-2.2, 0]));
      dw.setText(`lN${k}`, `${x.N.toFixed(0)}`);

      // the support reactions: on the form diagram they pull up and inward
      const uA = V.unit(V.sub(x.A, x.I)), uB = V.unit(V.sub(x.B, x.I));
      const L = s.F / SFD * 0.55;          // load-symbol length, not the raw force
      dw.setArrow(`r${k}A`, x.A, V.add(x.A, V.mul(uA, L)));
      dw.setArrow(`r${k}B`, x.B, V.add(x.B, V.mul(uB, L)));
      // in the force diagram they are the SAME two vectors — so draw them
      // offset beside the polygon (house rule), otherwise they simply cover
      // the cable forces and the student cannot tell the two apart
      const ro = V.mul(V.unit(V.perp(V.sub(x.P1, x.P0))), dw.W.off);
      dw.setArrow(`fr${k}A`, V.add(x.Pm, ro), V.add(x.P0, ro));
      dw.setArrow(`fr${k}B`, V.add(x.P1, ro), V.add(x.Pm, ro));
      dw.setLabel(`lH${k}`, [x.P0[0] - x.H / SFD / 2, x.P0[1] + 1.6]);
      dw.setText(`lH${k}`, `H = ${x.H.toFixed(0)} kN`);
    }

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  dw.enableDrag((x, y, tol) => {
    for (const c of CASES) {
      const n = d[c.k].I;
      if (Math.hypot(x - n[0], y - n[1]) < tol * 2) return c.k;
    }
    return null;
  }, (key, x, y) => {
    const c = CASES.find((q) => q.k === key);
    const h = Math.max(1.5, c.ay - y);
    if (key === 'a') s.ha = h; else s.hb = h;
    refresh();
  });

  const par = panel.section('Given');
  panel.slider(par, s, 'F', 'F₁ (kN)', 20, 200, 5, refresh);
  panel.slider(par, s, 'ha', 'sag of a)', 2, 18, 0.25, refresh);
  panel.slider(par, s, 'hb', 'sag of b)', 1, 18, 0.25, refresh);
  panel.toggle(par, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.03, 0.001, refresh);
  panel.toggle(par, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}
