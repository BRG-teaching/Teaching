/**
 * EX 1 · Task 4 — Single node equilibrium
 * Structural Design I, HS 22 (sheet EX 1 "Equilibrium").
 *
 * Given: six subsystems a)–f), each one node carrying F = 30 kN downwards
 * on two members. Wanted: the force diagram of each, the magnitudes N₁ and
 * N₂, and whether each member is in tension or compression. Case e) has no
 * solution and the sheet asks for the explanation.
 *
 * Member directions digitised from the sheet's vector artwork
 * (pdftocairo -svg): every member is drawn 42.5 pt long at a multiple of
 * 30°, and the six nodes sit at (186.9|557.0) × (238.2|547.5|884.2) pt.
 * Measured: a) 150°/30°, b) 210°/330°, c) 0°/150°, d) 330°/30°,
 * e) 0°/180°, f) 330°/30° — so d) and f) are the same statics problem
 * drawn with the load arrow on either side of the node.
 *
 * Answers (recomputed live, N > 0 = tension):
 *   a) 30 T / 30 T   b) 30 C / 30 C   c) 60 T / 51.96 T
 *   d) 30 C / 30 T   e) no solution   f) 30 C / 30 T
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'EX 1.4 — Single node equilibrium',
  subtitle: 'Structural Design I · sheet EX 1 “Equilibrium”, task 4',
  about: 'Six little nodes, one lesson: at a loaded node the force polygon must CLOSE, and the shape of the polygon tells you everything. Where the members straddle the load, both are in tension or both in compression; where they lie on one side, one pushes while the other pulls; and where both are horizontal, no polygon can close at all — case e) is a mechanism, not a structure.',
  result: (d) => d.r.map((x, i) => ('abcdef'[i] + ') ' + (x.ok
    ? `N₁ = ${Math.abs(x.N1).toFixed(1)} ${x.N1 < 0 ? 'C' : 'T'}   N₂ = ${Math.abs(x.N2).toFixed(1)} ${x.N2 < 0 ? 'C' : 'T'}`
    : 'no solution — both members are horizontal, so the polygon cannot close'))),
  frame: [[-46, -32], [70, 24.0]],
};

const RESOLVE = 7;
const SFD = 3.2;                     // kN per drawing unit
const LEN = 7.0;                     // member / load symbol length

// the six cases: member angles in degrees (y-up), as measured on the sheet
const CASES = [
  { k: 'a', a1: 150, a2: 30, note: 'members straddle the load, both above' },
  { k: 'b', a1: 210, a2: 330, note: 'members straddle the load, both below' },
  { k: 'c', a1: 150, a2: 0, note: 'one inclined, one horizontal' },
  { k: 'd', a1: 330, a2: 30, note: 'both members to the same side' },
  { k: 'e', a1: 0, a2: 180, note: 'both members horizontal' },
  { k: 'f', a1: 330, a2: 30, note: 'the same as d), the load drawn above' },
];
// where each case sits: form-diagram node, force-diagram polygon start
// The six cases in two rows. The top row is pulled down below y = 6, which is
// where the caption card ends, and the bottom row stays above y = -25.8,
// where the RESULT card begins (occlusion.py --cards reports both).
const CELL = [[-38, -1], [-22, -1], [-6, -1], [-38, -19], [-22, -19], [-6, -19]];
// 23-unit pitch: case c)'s N1 = 60 kN leg reaches 18.8 units back from
// its own load line, so a 17-unit pitch laid it straight over case b)
const FCELL = [[11, 9], [34, 9], [57, 9], [11, -12], [34, -12], [57, -12]];

const DEFAULTS = { F: 30, o1: true, sIF: 0.055, lbl: true, _k: 99 };

const STEPS = [
  { t: 'The exercise', d: 'EX 1 task 4: six subsystems, each a single node with two members carrying F = 30 kN — close each force polygon and read off the two member forces' },
  { t: 'The six subsystems', d: 'left: a) to f) — the same load every time, only the directions of the two members change (dash-dot: the load’s line of action)',
    detail: (d, st) => [`F = ${st.F} kN downwards in all six cases`] },
  { t: 'a) and b) — the load between the members', d: 'left: a) both members rise from the node, b) both fall — right: in both the polygon is a symmetric triangle, so the two forces are equal; only their SENSE differs',
    detail: (d) => [`a) N₁ = N₂ = ${Math.abs(d.r[0].N1).toFixed(1)} kN tension — the members hang the load`,
                    `b) N₁ = N₂ = ${Math.abs(d.r[1].N1).toFixed(1)} kN compression — the members prop it up`] },
  { t: 'c) — one inclined, one horizontal', d: 'left: the horizontal member cannot carry anything vertical, so the inclined one must take the whole load alone — right: its force is much larger than F, and the horizontal member has to hold its pull back',
    detail: (d) => [`c) inclined N₁ = ${Math.abs(d.r[2].N1).toFixed(1)} kN · horizontal N₂ = ${Math.abs(d.r[2].N2).toFixed(1)} kN, both tension`],
    take: 'the flatter the member, the bigger its force — the vertical component is all that counts' },
  { t: 'd) — both members on one side', d: 'left: both members leave the node to the right — right: their horizontal parts must cancel, so one pulls and the other pushes',
    detail: (d) => [`d) lower member ${Math.abs(d.r[3].N1).toFixed(1)} kN compression · upper member ${Math.abs(d.r[3].N2).toFixed(1)} kN tension`] },
  { t: 'e) — no solution', d: 'left: both members are horizontal, so neither can produce a vertical force — right: the polygon cannot close, the vertical gap F stays open whatever the member forces are. The node is a MECHANISM: it moves',
    take: 'the sheet asks why e) has no solution: two collinear members cannot equilibrate a force that is not on their line' },
  { t: 'f) — the same as d)', d: 'left: identical members, only the load arrow is drawn above the node instead of below — right: the identical polygon',
    detail: (d) => [`f) ${Math.abs(d.r[5].N1).toFixed(1)} kN compression · ${Math.abs(d.r[5].N2).toFixed(1)} kN tension — exactly d)`],
    take: 'where you draw the arrow does not matter; its line of action and sense do' },
  { t: 'All six answers', d: 'blue = compression, pink = tension, grey = no solution — the polygon’s shape carries the whole answer',
    detail: (d) => d.r.map((x, i) => (x.ok
      ? `${CASES[i].k}) N₁ = ${Math.abs(x.N1).toFixed(1)} ${x.N1 < 0 ? 'C' : 'T'} · N₂ = ${Math.abs(x.N2).toFixed(1)} ${x.N2 < 0 ? 'C' : 'T'}`
      : `${CASES[i].k}) no solution — the members are collinear`)),
    take: 'a node is in equilibrium exactly when its force polygon closes' },
];

function compute(s) {
  const r = CASES.map((c) => {
    const t1 = c.a1 * Math.PI / 180, t2 = c.a2 * Math.PI / 180;
    const u1 = [Math.cos(t1), Math.sin(t1)], u2 = [Math.cos(t2), Math.sin(t2)];
    const det = u1[0] * u2[1] - u1[1] * u2[0];
    const ok = Math.abs(det) > 1e-9;
    const N1 = ok ? -s.F * u2[0] / det : 0;
    const N2 = ok ? s.F * u1[0] / det : 0;
    return { u1, u2, N1, N2, ok };
  });
  return { r };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  // one band width for every view: the largest force comes out W.band
  // half-wide, so a force reads the same thickness whatever the frame
  s.sIF = dw.bandScale(Math.max(...compute(s).r.map((x) => Math.max(Math.abs(x.N1 || 0), Math.abs(x.N2 || 0)))));
  const W_BAR = dw.W.bar;
  const NARR = dw.W.narrow;
  const CASE_STEP = [2, 2, 3, 4, 5, 6];        // when each case is solved
  const bandOf = (i, which) => ({ pending: PAL.zeroBand, final: (dd) => {
    const c = colN(i, which).final(dd);
    return c === PAL.blue ? PAL.blueBand : c === PAL.red ? PAL.redBand : PAL.zeroBand;
  } });
  const colN = (i, which) => ({ pending: PAL.black, final: (dd) => {
    const x = dd.r[i];
    if (!x.ok) return PAL.zero;
    return (which === 1 ? x.N1 : x.N2) < 0 ? PAL.blue : PAL.red;
  } });

  dw.label('form_title', 'Form Diagram — the six subsystems', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram — the six polygons', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });

  CASES.forEach((c, i) => {
    const st = CASE_STEP[i];
    dw.label(`ck${i}`, `${c.k})`, { cls: 'num', intro: 1, flash: false });
    dw.label(`fk${i}`, `${c.k})`, { cls: 'num', intro: st, flash: false });
    dw.dashLine(`lv${i}`, { intro: 1, color: PAL.grey, dash: dw.W.dash });
    // the two members, drawn in their resolved colour when the case is solved
    dw.poly(`if${i}a`, 4, { intro: st, opacity: 1.0, z: -0.18, flash: false,
      color: bandOf(i, 1), when: (x) => x.o1 });
    dw.poly(`if${i}b`, 4, { intro: st, opacity: 1.0, z: -0.18, flash: false,
      color: bandOf(i, 2), when: (x) => x.o1 });
    dw.seg(`m${i}a`, { intro: 1, w: W_BAR, color: colN(i, 1) });
    dw.seg(`m${i}b`, { intro: 1, w: W_BAR, color: colN(i, 2) });
    dw.arrow(`fl${i}`, { intro: 1, color: PAL.green, ...NARR });
    dw.label(`lfl${i}`, 'F', { cls: 'num', intro: 1, color: PAL.green, when: (x) => x.lbl });
    dw.disk(`nd${i}`, { intro: 1, r: dw.W.disk * 0.8 });
    // the force polygon
    dw.arrow(`pf${i}`, { intro: st, color: PAL.green, ...NARR });
    dw.seg(`p${i}a`, { intro: st, w: W_BAR, color: colN(i, 1) });
    dw.seg(`p${i}b`, { intro: st, w: W_BAR, color: colN(i, 2) });
    dw.label(`ln${i}a`, '', { intro: st, flash: false, color: colN(i, 1) });
    dw.label(`ln${i}b`, '', { intro: st, flash: false, color: colN(i, 2) });
    dw.link(`m${i}a`, `p${i}a`, `ln${i}a`);
    dw.link(`m${i}b`, `p${i}b`, `ln${i}b`);
    dw.link(`fl${i}`, `pf${i}`, `lfl${i}`);
    dw.highlight(`m${i}a`, [st]);
    dw.highlight(`m${i}b`, [st]);
    dw.highlight(`nd${i}`, [st]);
  });
  // case e) gets a spelled-out verdict
  dw.label('efail', 'the polygon cannot close', { cls: 'num', intro: 5, flash: false, color: PAL.zero });
  dw.dashLine('egap', { intro: 5, color: PAL.zero, dash: dw.W.dash });

  dw.instant('form_title', 'force_title', 'force_sub');
  dw.ghostable(...CASES.map((_, i) => `p${i}a`), ...CASES.map((_, i) => `p${i}b`),
               ...CASES.map((_, i) => `pf${i}`));

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    dw.setLabel('form_title', [-30, -24.2]);
    dw.setLabel('force_title', [24, -28.5]);
    dw.setLabel('force_sub', [24, -30.2]);
    dw.setText('force_sub', `1 unit :: ${SFD} kN`);

    CASES.forEach((c, i) => {
      const n = CELL[i], x = d.r[i];
      dw.setLabel(`ck${i}`, [n[0] - 6.5, n[1] + 6.2]);
      dw.setDisk(`nd${i}`, n);
      dw.setDashLine(`lv${i}`, [[n[0], n[1] + 6.8], [n[0], n[1] - 8]]);
      dw.setSeg(`m${i}a`, n, V.add(n, V.mul(x.u1, LEN)));
      dw.setSeg(`m${i}b`, n, V.add(n, V.mul(x.u2, LEN)));
      dw.setPoly(`if${i}a`, V.rectPoints(n, V.add(n, V.mul(x.u1, LEN)), s.sIF * Math.abs(x.N1)));
      dw.setPoly(`if${i}b`, V.rectPoints(n, V.add(n, V.mul(x.u2, LEN)), s.sIF * Math.abs(x.N2)));
      // the load: drawn hanging below the node, except f) where it comes from above
      const above = c.k === 'f';
      const tail = above ? [n[0], n[1] + LEN] : n;
      const tip = above ? n : [n[0], n[1] - LEN];
      dw.setArrow(`fl${i}`, tail, tip);
      dw.setLabel(`lfl${i}`, [n[0] + 1.5, (tail[1] + tip[1]) / 2]);

      // the force polygon: F down, then the two member vectors close it
      const A = FCELL[i].slice();
      const B = [A[0], A[1] - s.F / SFD];
      const C = V.add(B, V.mul(x.u1, x.N1 / SFD));
      dw.setLabel(`fk${i}`, [A[0] - 5.5, A[1] + 1.2]);
      dw.setArrow(`pf${i}`, A, B);
      if (x.ok) {
        dw.setSeg(`p${i}a`, B, C);
        dw.setSeg(`p${i}b`, C, A);
        dw.setLabel(`ln${i}a`, V.add(V.mid(B, C), [0, -1.6]));
        dw.setText(`ln${i}a`, `${Math.abs(x.N1).toFixed(0)}`);
        dw.setLabel(`ln${i}b`, V.add(V.mid(C, A), [0, 1.6]));
        dw.setText(`ln${i}b`, `${Math.abs(x.N2).toFixed(0)}`);
      } else {
        // no closure: show the two collinear directions and the open gap
        dw.setSeg(`p${i}a`, B, V.add(B, V.mul(x.u1, 5)));
        dw.setSeg(`p${i}b`, A, V.add(A, V.mul(x.u2, 5)));
        dw.setLabel(`ln${i}a`, [A[0] + 7, A[1] - 2]);
        dw.setText(`ln${i}a`, '');
        dw.setLabel(`ln${i}b`, [A[0] + 7, A[1] - 4]);
        dw.setText(`ln${i}b`, '');
        dw.setDashLine('egap', [A, B]);
        dw.setLabel('efail', [A[0] + 0.5, (A[1] + B[1]) / 2 - 6.5]);
      }
    });

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);
  const par = panel.section('Given');
  panel.slider(par, s, 'F', 'F (kN)', 5, 60, 1, refresh);
  panel.toggle(par, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, s.sIF * 2.5, s.sIF / 20, refresh);
  panel.toggle(par, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}
