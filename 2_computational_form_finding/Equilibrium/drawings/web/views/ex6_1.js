/**
 * EX 6 · Task 1 — Internal Statical Determinacy
 * Structural Design II, FS 23 (sheet EX 6 "Trusses", page 1).
 *
 * "Determine the degree of the internal statical determinacy for each form
 * diagram."
 *
 * Three unlabelled diagrams, no loads, no dimensions and no scale — the whole
 * task is counting. The compendium (§6.2) states the rule verbatim:
 *   S + A = 2K  → statically determinate
 *   S + A < 2K  → statically indeterminate (unstable, a mechanism)
 *   S + A > 2K  → statically indeterminate (over-determined)
 * with S members, A reaction components and K joints.
 *
 * Geometry digitised at 1:100 (the hairlines here are 0.48 pt rather than the
 * 0.72 pt used elsewhere on the sheet, which is how the three diagrams were
 * told apart from the annotation):
 *   A  a Warren truss of equilateral triangles, 1.333 m sides over a 4.000 m
 *      span. 11 members, 7 joints, pin + roller.
 *   B  a stepped truss dropping one level in its right-hand third, with its
 *      right support a roller on a plane inclined at 45°. 17 members,
 *      10 joints.
 *   C  two X-braced panels, 1.498 m wide and 1.003 m high, the two diagonals
 *      of each panel crossing WITHOUT a joint. 11 members, 6 joints.
 *
 * The answers: A gives 11 + 3 − 14 = 0, B gives 17 + 3 − 20 = 0, and C gives
 * 11 + 3 − 12 = +2 — two surplus members, one per X-braced panel.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

const DIA = [
  {
    tag: 'A', name: 'Warren truss',
    nodes: [[0, 0], [1.333, 0], [2.667, 0], [4.0, 0],
            [0.669, 1.155], [2.002, 1.155], [3.336, 1.155]],
    members: [[0, 1], [1, 2], [2, 3], [4, 5], [5, 6],
              [0, 4], [4, 1], [1, 5], [5, 2], [2, 6], [6, 3]],
    A: 3, supports: [0, 3], roller: 3,
    why: 'every triangle is rigid and there is exactly one bar for every degree of freedom',
  },
  {
    tag: 'B', name: 'stepped truss',
    nodes: [[0, 0], [1.003, 1.003], [2.002, 1.003], [3.001, 1.003],
            [1.003, 0], [2.002, 0], [3.001, 0], [4.0, 0],
            [3.001, -0.935], [4.0, -0.935]],
    members: [[0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 6], [6, 7], [8, 9],
              [1, 4], [2, 5], [3, 6], [6, 8], [7, 9],
              [1, 5], [5, 3], [5, 8], [8, 7]],
    A: 3, supports: [0, 9], roller: 9,
    why: 'the step adds joints and members in step with each other, so the count still balances',
  },
  {
    tag: 'C', name: 'two X-braced panels',
    nodes: [[0, 0], [1.498, 0], [2.996, 0], [0, 1.003], [1.498, 1.003], [2.996, 1.003]],
    members: [[0, 1], [1, 2], [3, 4], [4, 5], [0, 3], [1, 4], [2, 5],
              [3, 1], [0, 4], [4, 2], [1, 5]],
    A: 3, supports: [0, 2], roller: 2,
    why: 'each panel is already rigid with ONE diagonal, so the second one in each is surplus',
  },
];

// each diagram is 4.0, 4.0 and 3.0 m wide, so at 3.4 units/m they are 13.6,
// 13.6 and 10.2 units — laid out with a 3-unit gap they fit the frame without
// running into each other, which the first attempt did badly
const MPU = 3.4;
const ORG = [[-23, -2], [-6.4, -2], [10.2, -2]];
const WID = [4.0, 4.0, 2.996];

export const meta = {
  title: 'EX 6.1 — is it determinate? Count it',
  subtitle: 'Structural Design II · sheet EX 6 “Trusses”, task 1',
  about: 'Three trusses, no loads and no dimensions — the whole question is whether each one has exactly as many bars as it needs. The rule is a count: members plus reaction components against twice the number of joints. Too few and it is a mechanism that will move; too many and it is over-determined, and the forces in it depend on how it was built rather than only on the load. Step through and watch the tally build up bar by bar.',
  result: (d) => [
    `A  ${d[0].S} + ${d[0].A} − 2 × ${d[0].K} = ${d[0].deg >= 0 ? '+' : ''}${d[0].deg} → statically determinate`,
    `B  ${d[1].S} + ${d[1].A} − 2 × ${d[1].K} = ${d[1].deg >= 0 ? '+' : ''}${d[1].deg} → statically determinate`,
    `C  ${d[2].S} + ${d[2].A} − 2 × ${d[2].K} = +${d[2].deg} → OVER-determined by two, one surplus diagonal per panel`],
  frame: [[-26, -19], [26, 20]],
};

const STEPS = [
  { t: 'The exercise', d: 'EX 6 task 1: three form diagrams, and one question about each — is it statically determinate?' },
  { t: 'The rule', d: 'count three things. S, the number of members. A, the number of reaction COMPONENTS a support can deliver — two for a pin, one for a roller. K, the number of joints. Then compare S + A against 2K',
    detail: () => ['S + A = 2K → determinate: as many unknowns as equilibrium equations',
                   'S + A < 2K → a mechanism: not enough bars, it will move',
                   'S + A > 2K → over-determined: more bars than statics can resolve'] },
  { t: 'A — the Warren truss', d: 'equilateral triangles all the way along, a pin at one end and a roller at the other. Count it: eleven members, three reaction components, seven joints',
    detail: (d) => [`S + A = ${d[0].S} + ${d[0].A} = ${d[0].S + d[0].A} · 2K = 2 × ${d[0].K} = ${2 * d[0].K}`,
                    `difference ${d[0].deg} → statically determinate`,
                    DIA[0].why] },
  { t: 'B — the stepped truss', d: 'more complicated to look at, and exactly the same answer. Its right-hand support is a roller on a plane inclined at 45°, which still contributes only ONE reaction component',
    detail: (d) => [`S + A = ${d[1].S} + ${d[1].A} = ${d[1].S + d[1].A} · 2K = 2 × ${d[1].K} = ${2 * d[1].K}`,
                    `difference ${d[1].deg} → statically determinate`,
                    DIA[1].why] },
  { t: 'C — the X-braced panels', d: 'this one is different. Each panel carries two crossing diagonals, and they cross WITHOUT a joint — so each panel has one more bar than it needs to be rigid',
    detail: (d) => [`S + A = ${d[2].S} + ${d[2].A} = ${d[2].S + d[2].A} · 2K = 2 × ${d[2].K} = ${2 * d[2].K}`,
                    `difference +${d[2].deg} → over-determined, twice`,
                    DIA[2].why],
    take: 'a crossing without a joint is not a joint: it adds a member and no equation' },
  { t: 'What over-determined means', d: 'not that it will fall down — the opposite. It stands up in more ways than statics alone can decide, so the forces depend on stiffness and on how it was assembled. Graphic statics can no longer give you a unique answer',
    detail: () => ['the two surplus diagonals in C are drawn pale grey',
                   'take one out of each panel and C becomes determinate too — 9 + 3 = 12 = 2 × 6',
                   'in practice X-bracing is often built with slender ties that only work in tension, which restores determinacy under any one load direction'],
    take: 'determinate is not a synonym for good — it is a statement about whether statics alone can answer you' },
];

function compute() {
  return DIA.map((D) => ({
    S: D.members.length, A: D.A, K: D.nodes.length,
    deg: D.members.length + D.A - 2 * D.nodes.length,
  }));
}

export function create(dw, panel, makePlayer) {
  const s = { lbl: true, surplus: true, _k: 99 };

  dw.label('form_title', 'Form diagrams — no loads, no scale: this task is a count',
    { cls: 'title', flash: false });

  DIA.forEach((D, k) => {
    const shown = (st) => st._k >= 2 + k;
    D.members.forEach((mm, m) => {
      // the two surplus diagonals in C are the last one of each X
      const isSurplus = k === 2 && (m === 8 || m === 10);
      dw.seg(`m${k}_${m}`, { intro: 2 + k, w: dw.W.bar,
        color: { pending: PAL.black,
          final: (dd, st) => (isSurplus && st.surplus ? PAL.zero
            : k === 2 ? PAL.red : PAL.blue) },
        when: shown });
    });
    D.nodes.forEach((p, i) => {
      dw.disk(`n${k}_${i}`, { intro: 2 + k, r: dw.W.disk * 0.7, when: shown });
    });
    D.supports.forEach((i) => {
      dw.strokes(`h${k}_${i}`, 5, { intro: 2 + k, w: dw.W.dim, color: PAL.grey,
        flash: false, when: shown });
      if (i === D.roller) {
        dw.seg(`r${k}_${i}`, { intro: 2 + k, w: dw.W.thin, color: PAL.grey,
          flash: false, when: shown });
      }
    });
    dw.label(`tag${k}`, D.tag, { cls: 'title', intro: 2 + k, flash: false, when: shown });
    dw.label(`cnt${k}`, '', { cls: 'num', intro: 2 + k, flash: false, when: shown,
      color: { final: (dd) => (dd[k].deg === 0 ? PAL.green : PAL.red) } });
    dw.label(`nm${k}`, D.name, { cls: 'point', intro: 2 + k, flash: false, when: shown });
  });
  dw.label('rule', '', { cls: 'num', intro: 1, flash: false, color: PAL.grey });

  dw.instant('form_title');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute();
    dw.setLabel('form_title', [12, 12.4]);
    dw.setLabel('rule', [12, 10.6]);
    dw.setText('rule', 'S members + A reaction components  vs  2 × K joints');

    DIA.forEach((D, k) => {
      const ux = (p) => [ORG[k][0] + p[0] * MPU, ORG[k][1] + p[1] * MPU];
      D.members.forEach((mm, m) => dw.setSeg(`m${k}_${m}`, ux(D.nodes[mm[0]]), ux(D.nodes[mm[1]])));
      D.nodes.forEach((p, i) => dw.setDisk(`n${k}_${i}`, ux(p)));
      D.supports.forEach((i) => {
        const q = ux(D.nodes[i]);
        // diagram B's right support rolls on a plane at 45 degrees
        const inc = k === 1 && i === D.roller;
        const dir = inc ? V.unit([1, -1]) : [0, -1];
        const perp = [-dir[1], dir[0]];
        const hb = V.add(q, V.mul(dir, 0.55));
        dw.setStrokes(`h${k}_${i}`, V.hatch(V.add(hb, V.mul(perp, -1.7)),
          V.add(hb, V.mul(perp, 1.7)), -1, 0.9, 5));
        if (i === D.roller) {
          const base = V.add(q, V.mul(dir, 1.5));
          dw.setSeg(`r${k}_${i}`, V.add(base, V.mul(perp, -1.8)), V.add(base, V.mul(perp, 1.8)));
        }
      });
      const c = d[k];
      const cx = ORG[k][0] + (WID[k] * MPU) / 2;
      dw.setLabel(`tag${k}`, [ORG[k][0] - 1.4, ORG[k][1] + 6.2]);
      dw.setLabel(`nm${k}`, [cx + 1.0, ORG[k][1] + 6.2]);
      // staggered, because three long lines side by side would collide
      dw.setLabel(`cnt${k}`, [cx, ORG[k][1] - (k === 1 ? 10.6 : 8.2)]);
      dw.setText(`cnt${k}`,
        `${c.S} + ${c.A} − ${2 * c.K} = ${c.deg >= 0 ? '+' : ''}${c.deg}`
        + (c.deg === 0 ? ' determinate' : ` OVER-determined ×${c.deg}`));
    });

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);
  const par = panel.section('Show');
  panel.toggle(par, s, 'surplus', 'grey out C’s two surplus diagonals', refresh);
  panel.toggle(par, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}
