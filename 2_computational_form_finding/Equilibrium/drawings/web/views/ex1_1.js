/**
 * EX 1 · Task 1 — Resultant of two non-parallel forces
 * Structural Design I, HS 22 (sheet EX 1 "Equilibrium").
 *
 * Given: F₁ = 20 kN on a line falling 18.1° to the right, F₂ = 30 kN
 * vertical. Wanted: the magnitude and direction of the resultant in the
 * force diagram, and its line of action in the form diagram.
 *
 * Geometry digitised from the sheet's own vector artwork (pdftocairo -svg,
 * transforms applied): F₁'s arrow runs (242.9, 290.6) → (286.9, 305.0) pt,
 * F₂'s the vertical x = 344.8 — i.e. 18.11° and 90°, meeting at
 * (344.8, 323.95) pt. Converted at the sheet's stated scales (form 1:50,
 * force 1 cm ≙ 10 kN): 1 pt = 0.017639 m, so 1 drawing unit (m) = 20 kN.
 * The sheet prints no answer table for this task; the construction gives
 * R = 40.9 kN at 62.3° below the horizontal, through the intersection.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'EX 1.1 — Resultant of two non-parallel forces',
  subtitle: 'Structural Design I · sheet EX 1 “Equilibrium”, task 1',
  about: 'Two forces on different lines of action have one resultant, and finding it needs BOTH diagrams: the force diagram gives its size and direction (lay the two vectors tip to tail and close), the form diagram gives its position (it must pass through the point where the two lines of action cross). Drag the magnitudes and the angle — the answer follows live.',
  frame: [[-16.5, -9.5], [30.5, 11.5]],
};

const RESOLVE = 6;   // last step index (STEPS has 7 entries)
const SFD = 5;                     // kN per drawing unit (the sheet: 1 cm ≙ 10 kN)
const FD0 = [19.5, 7.0];           // where the load line starts

const DEFAULTS = {
  F1: 20, F2: 30,                  // kN, as printed on the sheet
  a1: 18.11,                       // F₁'s fall below the horizontal (degrees)
  sLS: 0.85,                       // arrow length in the form diagram
  lbl: true,
  _k: 99,
};

const STEPS = [
  { t: 'The exercise', d: 'EX 1 task 1: two forces on different lines of action — find the resultant’s size and direction on the right, and its position on the left' },
  { t: 'The two given forces', d: 'left: F₁ and F₂ drawn green on their lines of action (dash-dot) — the lines are NOT parallel, so they meet somewhere',
    detail: (d, st) => [`F₁ = ${st.F1.toFixed(0)} kN falling ${st.a1.toFixed(1)}° · F₂ = ${st.F2.toFixed(0)} kN vertical`] },
  { t: 'Lay off F₁', d: 'left: F₁ flashes — right: the same vector, drawn to scale from the start of the load line, parallel to its line of action' },
  { t: 'F₂ tip to tail', d: 'left: F₂ flashes — right: F₂ continues from the tip of F₁, again parallel to its own line of action: the two given forces now form an open polygon' },
  { t: 'Where do the lines cross?', d: 'left: extend both lines of action — they meet at P. Any resultant of the two forces must pass through that point, because neither force has a moment about it' },
  { t: 'The resultant — in both diagrams', d: 'right: R closes the polygon from the start of F₁ to the tip of F₂ — left: the SAME vector drawn through P, dashed green: same length, same direction, now with a position',
    detail: (d) => [`R = ${d.R.toFixed(1)} kN at ${d.ang.toFixed(1)}° below the horizontal`,
                    `components: →${d.Rv[0].toFixed(1)} kN · ↓${(-d.Rv[1]).toFixed(1)} kN`],
    take: 'the force diagram gives the resultant its SIZE and DIRECTION, the form diagram gives it a POSITION — one is useless without the other' },
  { t: 'The answer', d: 'the two given forces are exactly equivalent to this single resultant: same effect on any body, whatever you do with it',
    detail: (d, st) => [`R = ${d.R.toFixed(1)} kN, ${d.ang.toFixed(1)}° below the horizontal, through P`,
                        `check: ΣH = ${d.Rv[0].toFixed(1)} = ${st.F1.toFixed(0)}·cos ${st.a1.toFixed(1)}° · ΣV = ${(-d.Rv[1]).toFixed(1)} = ${st.F1.toFixed(0)}·sin ${st.a1.toFixed(1)}° + ${st.F2.toFixed(0)}`],
    take: 'two forces, one resultant — this is the whole of graphic statics in miniature' },
];

function compute(s) {
  const a = s.a1 * Math.PI / 180;
  const d1 = [Math.cos(a), -Math.sin(a)];         // F₁ falls to the right
  const d2 = [0, -1];                             // F₂ straight down
  const P = [0, 0];                               // the lines cross at the origin
  const v1 = V.mul(d1, s.F1), v2 = V.mul(d2, s.F2);
  const Rv = V.add(v1, v2);
  const R = Math.hypot(Rv[0], Rv[1]);
  const ang = Math.atan2(-Rv[1], Rv[0]) * 180 / Math.PI;
  // force diagram: tip-to-tail from FD0
  const p0 = FD0.slice();
  const p1 = V.add(p0, V.mul(v1, 1 / SFD));
  const p2 = V.add(p1, V.mul(v2, 1 / SFD));
  // form diagram: the arrows sit on their lines of action, tips at P's side
  const t1 = V.sub(P, V.mul(d1, 5.2));            // F₁ arrow tail
  const t2 = V.sub(P, V.mul(d2, 5.2));            // F₂ arrow tail
  return { d1, d2, P, v1, v2, Rv, R, ang, p0, p1, p2, t1, t2,
           uR: V.unit(Rv) };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  // house line weights (identical to the drawing views, e.g. view_9)
  const W_DIM = 0.05;
  const ARR = { w: 0.18, headLen: 0.62, headW: 0.24 };   // big green vectors

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });
  dw.label('form_sub', 'the lines of action', { cls: 'point', flash: false });

  // ---- form diagram --------------------------------------------------
  dw.dashLine('la1', { intro: 1, color: PAL.grey, dash: 0.28 });
  dw.dashLine('la2', { intro: 1, color: PAL.grey, dash: 0.28 });
  dw.arrow('f1', { intro: 1, color: PAL.green, ...ARR });
  dw.arrow('f2', { intro: 1, color: PAL.green, ...ARR });
  dw.label('lf1', 'F₁', { cls: 'num', intro: 1, color: PAL.green, when: (st) => st.lbl });
  dw.label('lf2', 'F₂', { cls: 'num', intro: 1, color: PAL.green, when: (st) => st.lbl });
  // the crossing point
  dw.dashLine('ext1', { intro: 4, color: PAL.grey, dash: 0.28 });
  dw.dashLine('ext2', { intro: 4, color: PAL.grey, dash: 0.28 });
  dw.disk('ptP', { intro: 4, r: 0.42 });
  dw.label('lP', 'P', { cls: 'num', intro: 4, when: (st) => st.lbl });
  // the resultant, in the form diagram (house rule: dashed thick green)
  dw.dashArrow('Rform', { intro: RESOLVE - 1, color: PAL.green, w: 0.2,
                          headLen: 0.68, headW: 0.26, dash: 1.0, flash: false });
  dw.label('lRform', 'R', { cls: 'num', intro: RESOLVE - 1, color: PAL.green });

  // ---- force diagram -------------------------------------------------
  dw.arrow('ff1', { intro: 2, color: PAL.green, ...ARR });
  dw.arrow('ff2', { intro: 3, color: PAL.green, ...ARR });
  dw.label('lff1', 'F₁', { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.lbl });
  dw.label('lff2', 'F₂', { cls: 'num', intro: 3, color: PAL.green, when: (st) => st.lbl });
  dw.dashArrow('Rforce', { intro: RESOLVE - 1, color: PAL.green, w: 0.2,
                           headLen: 0.68, headW: 0.26, dash: 1.0, flash: false });
  dw.label('lRforce', 'R', { cls: 'num', intro: RESOLVE - 1, color: PAL.green });
  // the answer, spelled out at the resolve step
  dw.label('ro1', '', { intro: RESOLVE, flash: false, color: PAL.green });
  dw.label('ro2', '', { intro: RESOLVE, flash: false, color: PAL.green });

  // form <-> force pairing
  dw.link('f1', 'ff1', 'lf1', 'lff1');
  dw.link('f2', 'ff2', 'lf2', 'lff2');
  dw.link('Rform', 'Rforce', 'lRform', 'lRforce');
  dw.highlight('f1', [2]);
  dw.highlight('f2', [3]);
  dw.instant('form_title', 'force_title', 'force_sub', 'form_sub');
  dw.ghostable('ff1', 'ff2', 'Rforce');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    dw.setLabel('form_title', [-13.5, -7.2]);
    dw.setLabel('form_sub', [-13.5, -8.3]);
    dw.setLabel('force_title', [19.0, -7.2]);
    dw.setLabel('force_sub', [19.0, -8.3]);
    dw.setText('force_sub', `1 unit :: ${SFD} kN`);

    dw.setDashLine('la1', [V.sub(d.P, V.mul(d.d1, 13.5)), V.add(d.P, V.mul(d.d1, 4.5))]);
    dw.setDashLine('la2', [V.sub(d.P, V.mul(d.d2, 9.5)), V.add(d.P, V.mul(d.d2, 5.5))]);
    dw.setArrow('f1', d.t1, V.sub(d.P, V.mul(d.d1, 1.3)));
    dw.setArrow('f2', d.t2, V.sub(d.P, V.mul(d.d2, 1.3)));
    dw.setLabel('lf1', V.add(V.mid(d.t1, d.P), V.mul(V.perp(d.d1), 1.2)));
    dw.setLabel('lf2', V.add(V.mid(d.t2, d.P), V.mul(V.perp(d.d2), 1.2)));

    dw.setDashLine('ext1', [d.P, V.add(d.P, V.mul(d.d1, 8.0))]);
    dw.setDashLine('ext2', [d.P, V.add(d.P, V.mul(d.d2, 6.5))]);
    dw.setDisk('ptP', d.P);
    dw.setLabel('lP', V.add(d.P, [1.1, 1.1]));

    dw.setArrow('ff1', d.p0, d.p1);
    dw.setArrow('ff2', d.p1, d.p2);
    dw.setLabel('lff1', V.add(V.mid(d.p0, d.p1), V.mul(V.perp(d.d1), 1.25)));
    dw.setLabel('lff2', V.add(V.mid(d.p1, d.p2), [-1.3, 0]));
    dw.setDashArrow('Rforce', d.p0, d.p2);
    dw.setLabel('lRforce', V.add(V.mid(d.p0, d.p2), [1.5, 0.3]));

    // the resultant in the form diagram: through P, same direction
    const len = d.R / SFD;
    const rTail = V.sub(d.P, V.mul(d.uR, len * 0.35));
    const rTip = V.add(rTail, V.mul(d.uR, len));
    dw.setDashArrow('Rform', rTail, rTip);
    dw.setLabel('lRform', V.add(rTip, [1.3, -0.6]));

    dw.setLabel('ro1', [2.0, -7.2]);
    dw.setText('ro1', `R = ${d.R.toFixed(1)} kN`);
    dw.setLabel('ro2', [2.0, -8.3]);
    dw.setText('ro2', `${d.ang.toFixed(1)}° below horizontal`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const par = panel.section('Given');
  panel.slider(par, s, 'F1', 'F₁ (kN)', 5, 60, 1, refresh);
  panel.slider(par, s, 'F2', 'F₂ (kN)', 5, 60, 1, refresh);
  panel.slider(par, s, 'a1', 'angle of F₁ (°)', 0, 80, 0.5, refresh);
  panel.toggle(par, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}
