/**
 * EX 8 · Task 2 — Internal force flow in frames
 * Structural Design II, FS 23 (sheet EX 8 "Frames", page 2).
 *
 * "Find a possible internal force flow in the given reinforced concrete frame
 * with the help of the thrust line. First calculate the applied forces at
 * design level. Then draw the corresponding force diagrams and colour tension
 * forces in red, compression forces in blue and external forces in green.
 *   a) Assume a horizontal live load Qk = 30 kN.
 *   b) The dead load is Gk = 20 kN and the live load is Qk = 18 kN."
 *
 * The page prints no dimensions at all; both frames were digitised at the
 * stated 1:100. They are drawn free-form, so the numbers are not round.
 *
 *   a)  A (0, 0) · B (10.258, −2.686) · crown hinge C (5.349, 5.260)
 *       one load only: Q_d horizontal, pointing LEFT, through C. No gravity.
 *   b)  A (0, 0) · B (9.190, 0) · crown hinge C (4.595, 4.510)
 *       G_d down on the crown axis and Q_d horizontal to the RIGHT, and both
 *       lines of action pass through C.
 *
 * DESIGN VALUES. Compendium 2.6 "Formulary": γ_G = 1.35, γ_Q = 1.5.
 *   a)  Q_d = 30 × 1.5  = 45.00 kN
 *   b)  G_d = 20 × 1.35 = 27.00 kN   Q_d = 18 × 1.5 = 27.00 kN
 *
 * THE RULE THAT UNLOCKS IT (compendium 8.1): in a three-hinged frame the line
 * of action of the load and the two reaction lines all meet at the crown
 * hinge. So the two half-chords ARE the reaction directions and the load
 * simply resolves onto them.
 *
 *   a)  left half +39.26 kN compression, right half −32.36 kN TENSION;
 *       A = 39.26 kN at 44.52°, B = 32.36 kN at −58.29° — B pushes DOWN,
 *       because the right support has to hold this frame down.
 *   b)  the design resultant is (27, −27) = 38.18 kN at exactly −45°, which is
 *       parallel to the chord C→B (−44.47°). So the whole load walks down the
 *       right leg: A ≈ 0.36 kN, B = 38.19 kN. The sheet's numbers, 20 × 1.35
 *       and 18 × 1.5, were chosen to make that happen.
 *
 * AND THEN THE POINT OF THE PAGE. The thrust line does not stay in the
 * concrete. In a) it leaves the left half 0.372 m from the support; in b) it
 * spends 5.81 m of its 6.44 m length outside the material altogether. A frame
 * corner therefore does not carry its load along that line — it redirects it
 * around the corner through the material that is there, and the price is a tie
 * along the OUTSIDE face. That tie is the reinforcement, and tasks 3 and 4
 * dimension it.
 *
 * The redirection uses compendium 8.1's own five-element corner (see
 * lib/redirect.js), solved joint by joint. Governing tensions:
 *
 *   a)  49.56 kN   element C–K, the upper inner face of the RIGHT half
 *   b)  34.64 kN   element C–O, the top slab of the right half
 *
 * Both were reproduced by two independent implementations, agreeing to machine
 * precision with residuals of 4e-15, and each chain hands its support back
 * exactly the reaction that global equilibrium demands.
 *
 * The sheet prints no answers.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';
import { padRing, furthestOutside } from '../lib/poly.js';
import { threeHinge, redirectHalf } from '../lib/redirect.js';

const GAM_G = 1.35, GAM_Q = 1.5;      // compendium 2.6, Formulary

// Both frames, digitised at 1:100 with the left support pin as the origin.
// `out` and `inn` run left to right; the crown gap in the middle of each is
// the hinge notch the sheet draws.
const SIT = [
  {
    tag: 'a)', name: 'a horizontal live load only',
    A: [0, 0], B: [10.258, -2.686], C: [5.349, 5.260],
    out: [[-0.150, 0], [-0.150, 5.410], [5.316, 5.410], [5.381, 5.410],
          [10.408, 2.803], [10.408, -2.686]],
    inn: [[0.161, 0], [1.637, 3.692], [5.316, 5.088], [5.373, 5.021],
          [8.605, 1.844], [10.100, -2.686]],
    OL: [-0.150, 5.410], KL: [1.637, 3.692],
    OR: [10.408, 2.803], KR: [8.605, 1.844],
    // Q_d only, horizontal, pointing left, on the crown-hinge line
    load: (st) => ({ G: 0, Q: st.Qk * GAM_Q, F: [-st.Qk * GAM_Q, 0] }),
    half: 'R',
    note: 'no dead load at all on this one — the sheet gives only the wind',
  },
  {
    tag: 'b)', name: 'dead load and wind together',
    A: [0, 0], B: [9.190, 0], C: [4.595, 4.510],
    out: [[-0.150, 0], [-0.150, 4.672], [4.567, 4.672], [4.624, 4.672],
          [9.340, 4.672], [9.340, 0]],
    inn: [[0.128, 0], [1.428, 3.201], [4.567, 4.351], [4.624, 4.351],
          [7.763, 3.201], [9.063, 0]],
    OL: [-0.150, 4.672], KL: [1.428, 3.201],
    OR: [9.340, 4.672], KR: [7.763, 3.201],
    load: (st) => ({ G: st.Gk * GAM_G, Q: st.Qk2 * GAM_Q,
                     F: [st.Qk2 * GAM_Q, -st.Gk * GAM_G] }),
    half: 'R',
    note: 'both lines of action pass through the crown hinge, which is what makes it solvable by hand',
  },
];

const MPU = 1.35;                     // drawing units per metre
const AX = -21, AY = -8.0;            // the left support pin
const SFD = 4.0;                      // kN per drawing unit, global diagram
// the joint polygons carry the redirected forces, which are twice the size of
// anything in the global diagram, so they get their own scale
const SFDJ = 12.0;
const LLX = 14.0, LLY = 6.0;          // the global force diagram
// the three joint polygons in a row UNDER the global diagram: stacking them
// beside it put them on top of it as soon as the case changed
const CELL = [[5, -10], [16, -10], [27, -10]];
const SYM = 2.0;
const NRING = 16;

const DEFAULTS = {
  sit: 0,
  Qk: 30,                             // a) kN, characteristic
  Gk: 20, Qk2: 18,                    // b) kN, characteristic
  thrust: true,
  flow: true,
  o1: true, sIF: 0.02,
  lbl: true, _k: 99,
};

const FLOW = 5;

export const meta = {
  title: 'EX 8.2 — a frame corner has to be paid for',
  subtitle: 'Structural Design II · sheet EX 8 “Frames”, task 2 a) and b)',
  about: 'Two reinforced-concrete frames, each with a pin at both feet and a hinge at the crown. Three hinges make them determinate, and because every load passes through the crown hinge the reactions fall out of one drawing. Then the interesting part: the thrust line that answer implies does not stay inside the concrete — in b) it is outside for 5.8 of its 6.4 metres. So the corner redirects the force around itself through the material that is actually there, and pays for it with a tie along the outside face. That tie is the reinforcement, and it is what the next two tasks dimension.',
  result: (d) => [
    `${d.tag} design loads: ${d.G > 0 ? `G_d = ${d.G.toFixed(2)} kN (×${GAM_G}) · ` : ''}Q_d = ${d.Q.toFixed(2)} kN (×${GAM_Q})`,
    `A = ${Math.hypot(...d.RA).toFixed(2)} kN at ${d.angA.toFixed(2)}° · B = ${Math.hypot(...d.RB).toFixed(2)} kN at ${d.angB.toFixed(2)}°${d.RB[1] < 0 ? ' — pointing DOWN' : ''}`,
    `the thrust line leaves the concrete by up to ${d.esc.dist.toFixed(3)} m, so the corner must redirect`,
    `relevant TENSION force ${d.NtMax.toFixed(2)} kN in element ${d.NtWhere} of the ${d.halfName} half`],
  frame: [[-26, -22], [32, 14]],
};

const STEPS = [
  { t: 'The exercise', d: 'EX 8 task 2: a concrete frame, hinged at both feet and at the crown. Find the design loads, find the global equilibrium, and then find a force flow that actually fits inside the concrete' },
  { t: 'What is given', d: 'left: the frame as the sheet draws it — no dimensions printed, so everything here is digitised at the stated 1:100. Switch between a) and b) in the panel',
    detail: (d, st) => [`${d.tag} ${d.name}`,
                        `span ${d.span.toFixed(3)} m · crown hinge ${d.rise.toFixed(3)} m above the left pin`
                        + (Math.abs(d.drop) > 1e-3 ? ` · the right pin is ${Math.abs(d.drop).toFixed(3)} m lower` : ''),
                        d.note] },
  { t: 'Design values first', d: 'the sheet gives characteristic loads; statics is done at design level. Multiply the dead load by 1.35 and the live load by 1.5 — the factors are in the compendium’s formulary, not on the sheet',
    detail: (d, st) => [d.G > 0
      ? `G_d = ${st.Gk} × ${GAM_G} = ${d.G.toFixed(2)} kN  ·  Q_d = ${st.Qk2} × ${GAM_Q} = ${d.Q.toFixed(2)} kN`
      : `Q_d = ${st.Qk} × ${GAM_Q} = ${d.Q.toFixed(2)} kN — and no dead load is given at all`,
      `resultant ${Math.hypot(...d.F).toFixed(2)} kN at ${d.angF.toFixed(2)}°, through the crown hinge`],
    take: 'the factors differ because the two loads are known to different accuracies, not because one is bigger' },
  { t: 'Three hinges, one drawing', d: 'a hinge carries no moment, so the thrust line has to pass through it. Both reaction lines and the load’s line of action therefore meet at the crown — which means the two half-chords ARE the reaction directions, and the load just resolves onto them',
    detail: (d) => [`chord A→C at ${d.angA.toFixed(2)}° · chord B→C at ${(d.angB + (d.RB[1] < 0 ? 180 : 0)).toFixed(2)}°`,
                    `A = ${Math.hypot(...d.RA).toFixed(2)} kN · B = ${Math.hypot(...d.RB).toFixed(2)} kN`,
                    `ΣF closes to ${d.checkF.toExponential(1)} kN`],
    take: 'no equations: the whole of global equilibrium is one triangle of forces' },
  { t: 'Read the reactions', d: 'right: the load laid off, and the two chord directions closing the triangle. Left: the same two forces pushed into the pins',
    detail: (d) => [`A = ${Math.hypot(...d.RA).toFixed(2)} kN, components (${d.RA[0].toFixed(2)}, ${d.RA[1].toFixed(2)}) kN`,
                    `B = ${Math.hypot(...d.RB).toFixed(2)} kN, components (${d.RB[0].toFixed(2)}, ${d.RB[1].toFixed(2)}) kN`,
                    d.RB[1] < 0 ? 'B points DOWNWARD: this support has to hold the frame down, not up'
                                : 'both supports push upward'],
    take: (d) => (Math.abs(d.NL) < 1 ? 'in b) the design resultant runs exactly parallel to the right-hand chord, so the entire load walks down the right leg and the left support carries nothing' : '') },
  { t: 'But it does not fit', d: 'the thrust line runs straight from hinge to hinge — and that line is not inside the concrete. Where it leaves, the drawing shows the gap in red. A frame is not an arch: its shape was chosen for the room it makes, not for the forces it carries',
    detail: (d) => [`the line escapes the material by up to ${d.esc.dist.toFixed(3)} m`,
                    'so nothing can actually carry the load along it'],
    take: 'a thrust line outside the material is not a solution, it is a diagnosis' },
  { t: 'Redirect it', d: 'left: the corner carries the force around itself instead, along five elements that all lie inside the concrete — the outer face, the inner face, and a diagonal joining them. Solve joint by joint: the crown has two unknowns, so start there',
    detail: (d) => [`at the crown: ${d.mem[0].name} = ${Math.abs(d.mem[0].N).toFixed(2)} kN ${d.mem[0].tension ? 'tension' : 'compression'} · ${d.mem[1].name} = ${Math.abs(d.mem[1].N).toFixed(2)} kN ${d.mem[1].tension ? 'tension' : 'compression'}`,
                    `then the outer corner: ${d.mem[2].name} = ${Math.abs(d.mem[2].N).toFixed(2)} · ${d.mem[4].name} = ${Math.abs(d.mem[4].N).toFixed(2)} kN`,
                    `and the inner kink closes it: ${d.mem[3].name} = ${Math.abs(d.mem[3].N).toFixed(2)} kN, residual ${d.resid.toExponential(1)} kN`],
    take: 'the last joint is not a calculation, it is the proof that the first two were right' },
  { t: 'The tie on the outside', d: 'notice which elements came out pink. The redirection puts the OUTSIDE face of the corner into tension — and concrete cannot do that, so this is exactly where the reinforcement goes. Tasks 3 and 4 put a number on the bar',
    detail: (d) => [...d.mem.filter((m) => m.tension)
      .map((m) => `${m.name}  ${Math.abs(m.N).toFixed(2)} kN tension over ${m.len.toFixed(3)} m`),
      `governing: ${d.NtMax.toFixed(2)} kN in ${d.NtWhere}`],
    take: 'the reinforcement in a frame corner is not a detail — it is the whole reason the corner works' },
];

// ------------------------------------------------------------------ maths --

function compute(s) {
  const S = SIT[Math.round(s.sit)];
  const { G, Q, F } = S.load(s);
  const g = threeHinge(S.A, S.B, S.C, F);
  const halfR = redirectHalf({ C: S.C, O: S.OR, K: S.KR, S: S.B }, g.atCR);
  const halfL = redirectHalf({ C: S.C, O: S.OL, K: S.KL, S: S.A }, g.atCL);
  const use = S.half === 'R' ? halfR : halfL;

  // the ring of concrete, and how far the thrust line strays out of it
  const ring = [...S.out, ...[...S.inn].reverse()];
  const line = [S.A, S.C, S.B];
  const esc = furthestOutside(line, ring);

  // the governing tension over BOTH halves, since either could win
  let NtMax = 0, NtWhere = '—', halfName = 'right';
  for (const [nm, h] of [['left', halfL], ['right', halfR]]) {
    for (const m of h.members) {
      if (m.tension && -m.N > NtMax) { NtMax = -m.N; NtWhere = m.name; halfName = nm; }
    }
  }
  const ang = (v) => (Math.atan2(v[1], v[0]) * 180) / Math.PI;
  const checkF = Math.hypot(g.RA[0] + g.RB[0] + F[0], g.RA[1] + g.RB[1] + F[1]);

  return { ...S, G, Q, F, NL: g.NL, NR: g.NR, RA: g.RA, RB: g.RB,
           uA: g.uA, uB: g.uB,
           angA: ang(g.RA), angB: ang(g.RB), angF: ang(F), checkF,
           mem: use.members, resid: use.resid, halfL, halfR, ring, line, esc,
           NtMax, NtWhere, halfName,
           span: S.B[0] - S.A[0], rise: S.C[1] - S.A[1], drop: S.B[1] - S.A[1] };
}

// ------------------------------------------------------------------- view --

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  s.sIF = dw.bandScale(80);
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const ux = (p) => [AX + p[0] * MPU, AY + p[1] * MPU];

  const MEMCOL = (i) => ({
    pending: PAL.black,
    final: (dd, st) => (st._k < FLOW ? PAL.grey
      : dd.mem[i].tension ? PAL.red : PAL.blue),
  });

  dw.label('form_title', '', { cls: 'title', flash: false });
  dw.label('force_title', 'Kräfteplan — force diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });

  dw.poly('mat', NRING, { intro: 1, color: PAL.grey, opacity: 0.11, z: -0.2, flash: false });
  dw.strokes('edge', NRING, { intro: 1, w: dw.W.str, color: PAL.black });
  for (const n of ['A', 'B']) {
    dw.disk(`sup${n}`, { intro: 1, r: dw.W.disk });
    dw.label(`lsup${n}`, n, { cls: 'num', intro: 1, when: (st) => st.lbl });
    dw.strokes(`hat${n}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  }
  dw.disk('hingeC', { intro: 1, r: dw.W.disk });
  dw.label('lhingeC', 'C', { cls: 'num', intro: 1, when: (st) => st.lbl });

  dw.arrow('fQ', { intro: 1, color: PAL.green, ...ARR });
  dw.label('lfQ', '', { cls: 'num', intro: 1, color: PAL.green });
  dw.dashLine('laQ', { intro: 1, color: PAL.grey, dash: dw.W.dash });
  dw.arrow('fG', { intro: 1, color: PAL.green, ...ARR, when: (st, dd) => !!dd && dd.G > 0 });
  dw.label('lfG', '', { cls: 'num', intro: 1, color: PAL.green, when: (st, dd) => !!dd && dd.G > 0 });
  dw.dashLine('laG', { intro: 1, color: PAL.grey, dash: dw.W.dash, when: (st, dd) => !!dd && dd.G > 0 });

  // the global force diagram: the load, then the two chord directions closing it
  dw.arrow('ffQ', { intro: 3, color: PAL.green, ...ARR });
  dw.label('lffQ', '', { cls: 'num', intro: 3, color: PAL.green, when: (st) => st.lbl });
  dw.arrow('ffG', { intro: 3, color: PAL.green, ...ARR, when: (st, dd) => !!dd && dd.G > 0 });
  dw.label('lffG', '', { cls: 'num', intro: 3, color: PAL.green, when: (st, dd) => !!dd && dd.G > 0 });
  dw.seg('fRA', { intro: 4, w: dw.W.bar, color: PAL.green });
  dw.seg('fRB', { intro: 4, w: dw.W.bar, color: PAL.green });
  dw.label('lfRA', '', { cls: 'num', intro: 4, color: PAL.green, when: (st) => st.lbl });
  dw.label('lfRB', '', { cls: 'num', intro: 4, color: PAL.green, when: (st) => st.lbl });

  // the thrust line, and the gap where it leaves the concrete
  dw.seg('thr1', { intro: 4, w: dw.W.bar, color: PAL.grey, when: (st) => st.thrust });
  dw.seg('thr2', { intro: 4, w: dw.W.bar, color: PAL.grey, when: (st) => st.thrust });
  dw.label('lthr', 'thrust line', { cls: 'point', intro: 4, flash: false,
    color: PAL.grey, when: (st) => st.thrust });
  dw.seg('esc', { intro: FLOW, w: dw.W.bar, color: PAL.red, flash: false,
    when: (st, dd) => !!dd && st.thrust && dd.esc.dist > 1e-6 });
  dw.label('lesc', '', { cls: 'num', intro: FLOW, color: PAL.red, flash: false,
    when: (st, dd) => !!dd && st.thrust && dd.esc.dist > 1e-6 });

  for (const n of ['A', 'B']) {
    dw.arrow(`re${n}`, { intro: 4, color: PAL.green, ...NARR });
    dw.label(`lre${n}`, '', { cls: 'num', intro: 4, color: PAL.green });
  }
  dw.link('reA', 'fRA', 'lreA', 'lfRA');
  dw.link('reB', 'fRB', 'lreB', 'lfRB');

  // the five redirection elements, and the three joint polygons that solve them
  for (let i = 0; i < 5; i++) {
    dw.seg(`mem${i}`, { intro: FLOW + (i < 2 ? 0 : i < 4 ? 1 : 1), w: dw.W.bar,
      color: MEMCOL(i), when: (st) => st.flow });
    dw.label(`lmem${i}`, '', { cls: 'num', intro: FLOW, color: MEMCOL(i),
      when: (st) => st.flow && st.lbl });
  }
  const JN = ['C', 'O', 'K'];
  for (let j = 0; j < 3; j++) {
    dw.label(`jt${j}`, '', { cls: 'point', intro: FLOW, flash: false, when: (st) => st.flow });
    for (let e = 0; e < 3; e++) {
      dw.arrow(`pe${j}_${e}`, { intro: FLOW, ...NARR, flash: false,
        color: { pending: PAL.black, final: (dd) => dd.polys[j].parts[e].col },
        when: (st) => st.flow });
    }
  }

  dw.instant('form_title', 'force_title', 'force_sub');
  dw.ghostable('ffQ', 'ffG', 'fRA', 'fRB');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    // the joint polygons, built here because the drawing needs their colours
    const half = d.halfR;
    const P = { C: d.C, O: d.OR, K: d.KR, S: d.B };
    const fetch = (a, b) => d.mem.find((m) =>
      (m.name === `${a}–${b}`) || (m.name === `${b}–${a}`));
    const col = (m) => (m.tension ? PAL.red : PAL.blue);
    const at = (node, others, ext) => {
      const parts = others.map((o) => {
        const m = fetch(node, o);
        const u = V.unit(V.sub(P[node], P[o]));
        return { v: V.mul(u, m.N), col: col(m), name: m.name };
      });
      if (ext) parts.unshift({ v: ext, col: PAL.green, name: 'load' });
      return { parts };
    };
    d.polys = [at('C', ['O', 'K'], [-d.RB[0], -d.RB[1]]),
               at('O', ['C', 'K', 'S'], null),
               at('K', ['C', 'O', 'S'], null)];
    d.half = half;

    dw.setLabel('form_title', [AX + (d.span / 2) * MPU, -14.6]);
    dw.setText('form_title', `${d.tag} ${d.name} — Lageplan 1:100`);
    dw.setLabel('force_title', [LLX + 2, -16.4]);
    dw.setLabel('force_sub', [LLX + 2, -17.8]);
    dw.setText('force_sub', `global 1 unit ≙ ${SFD} kN · joints 1 unit ≙ ${SFDJ} kN  (sheet: 1 cm ≙ 10 kN)`);

    // the concrete
    const ring = d.ring.map(ux);
    dw.setPoly('mat', padRing(ring, NRING));
    const ed = [];
    for (let i = 0; i < ring.length; i++) ed.push([ring[i], ring[(i + 1) % ring.length]]);
    while (ed.length < NRING) ed.push([ring[0], ring[0]]);
    dw.setStrokes('edge', ed.slice(0, NRING));

    const A = ux(d.A), B = ux(d.B), C = ux(d.C);
    dw.setDisk('supA', A); dw.setDisk('supB', B); dw.setDisk('hingeC', C);
    dw.setLabel('lsupA', V.add(A, [-1.8, -1.0]));
    dw.setLabel('lsupB', V.add(B, [1.8, -1.0]));
    dw.setLabel('lhingeC', V.add(C, [-1.6, 0.9]));
    for (const [n, p] of [['A', A], ['B', B]]) {
      dw.setStrokes(`hat${n}`, V.hatch([p[0] - 1.7, p[1] - 0.5],
        [p[0] + 1.7, p[1] - 0.5], -1, 0.95, 5));
    }

    // the loads, drawn on their real lines of action through C
    const qDir = d.F[0] < 0 ? -1 : 1;
    const qTip = [C[0] + qDir * 1.0, C[1]];
    dw.setArrow('fQ', [qTip[0] + qDir * SYM * 1.6, qTip[1]], qTip);
    dw.setLabel('lfQ', [qTip[0] + qDir * SYM * 1.6 + qDir * 3.6, qTip[1] + 0.9]);
    dw.setText('lfQ', `Q_d = ${d.Q.toFixed(1)} kN`);
    dw.setDashLine('laQ', [[C[0] - 9, C[1]], [C[0] + 9, C[1]]]);
    dw.setArrow('fG', [C[0], C[1] + 0.5 + SYM * 1.4], [C[0], C[1] + 0.5]);
    dw.setLabel('lfG', [C[0] + 4.6, C[1] + 0.5 + SYM * 1.5]);
    dw.setText('lfG', `G_d = ${d.G.toFixed(1)} kN`);
    dw.setDashLine('laG', [[C[0], C[1] + SYM * 1.6], [C[0], AY - 2.0]]);

    // the global force diagram: G down, Q across, then the two chords closing
    const T = [LLX, LLY];
    const pG = [T[0], T[1] - d.G / SFD];
    const pQ = [pG[0] + d.F[0] / SFD, pG[1]];
    dw.setArrow('ffG', T, pG);
    dw.setLabel('lffG', V.add(V.mid(T, pG), [2.6, 0]));
    dw.setText('lffG', `G_d = ${d.G.toFixed(1)}`);
    dw.setArrow('ffQ', pG, pQ);
    dw.setLabel('lffQ', V.add(V.mid(pG, pQ), [0, d.G > 0 ? -1.4 : 1.4]));
    dw.setText('lffQ', `Q_d = ${d.Q.toFixed(1)}`);
    // A closes back to the start, B closes from the load's tip
    const pA = V.add(pQ, V.mul(d.RA, 1 / SFD));
    dw.setSeg('fRA', pQ, pA);
    dw.setSeg('fRB', pA, T);
    dw.setLabel('lfRA', V.add(V.mid(pQ, pA), [-2.8, -0.6]));
    dw.setLabel('lfRB', V.add(V.mid(pA, T), [2.8, 0.6]));
    dw.setText('lfRA', `A = ${Math.hypot(...d.RA).toFixed(1)}`);
    dw.setText('lfRB', `B = ${Math.hypot(...d.RB).toFixed(1)}`);

    // the thrust line and its escape
    dw.setSeg('thr1', A, C);
    dw.setSeg('thr2', C, B);
    dw.setLabel('lthr', V.add(V.mid(A, C), [-5.4, 1.4]));
    if (d.esc.at) {
      dw.setSeg('esc', ux(d.esc.at), ux(d.esc.to));
      dw.setLabel('lesc', V.add(V.mid(ux(d.esc.at), ux(d.esc.to)), [-1.0, -1.8]));
      dw.setText('lesc', `${d.esc.dist.toFixed(2)} m outside the concrete`);
    }

    // reactions, stopping short of the pins
    for (const [n, p, R] of [['A', A, d.RA], ['B', B, d.RB]]) {
      const u = V.unit(R);
      dw.setArrow(`re${n}`, V.sub(p, V.mul(u, SYM * 1.6)), V.sub(p, V.mul(u, 1.0)));
      dw.setLabel(`lre${n}`, V.add(V.sub(p, V.mul(u, SYM * 1.6)),
        [n === 'A' ? -3.0 : 3.0, -0.6]));
      dw.setText(`lre${n}`, `${n} = ${Math.hypot(...R).toFixed(1)}`);
    }

    // the five redirection elements
    d.mem.forEach((m, i) => {
      dw.setSeg(`mem${i}`, ux(m.a), ux(m.b));
      // alternate the side so the five labels of one corner do not pile up
      const nb = V.mul(V.unit(V.perp(V.sub(ux(m.b), ux(m.a)))), i % 2 ? -2.6 : 2.6);
      dw.setLabel(`lmem${i}`, V.add(V.mid(ux(m.a), ux(m.b)), nb));
      dw.setText(`lmem${i}`, `${Math.abs(m.N).toFixed(1)}`);
    });

    // and the three joint polygons that produced them
    d.polys.forEach((pl, j) => {
      // Walk it once from the origin to learn its extent, then re-walk it
      // CENTRED on the cell. A force polygon closes, but not symmetrically,
      // so anchoring it at one corner throws it out of its cell and across
      // whatever is next door.
      const pts = [[0, 0]];
      pl.parts.forEach((q) => pts.push(V.add(pts[pts.length - 1],
        V.mul(q.v, 1 / SFDJ))));
      const xs = pts.map((q) => q[0]), ys = pts.map((q) => q[1]);
      const off = V.sub(CELL[j], [(Math.min(...xs) + Math.max(...xs)) / 2,
                                  (Math.min(...ys) + Math.max(...ys)) / 2]);
      dw.setLabel(`jt${j}`, V.add(CELL[j],
        [0, (Math.max(...ys) - Math.min(...ys)) / 2 + 1.8]));
      dw.setText(`jt${j}`, `joint ${JN[j]}: ${pl.parts.map((q) => q.name).join(' + ')}`);
      for (let e = 0; e < 3; e++) {
        const a = V.add(pts[Math.min(e, pts.length - 1)], off);
        const b = V.add(pts[Math.min(e + 1, pts.length - 1)], off);
        dw.setArrow(`pe${j}_${e}`, a, b);
      }
    });

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const cas = panel.section('The situation');
  panel.slider(cas, s, 'sit', 'case', 0, 1, 1, refresh,
    (v) => `${SIT[Math.round(v)].tag} ${SIT[Math.round(v)].name}`);
  panel.toggle(cas, s, 'thrust', 'show the thrust line', refresh);
  panel.toggle(cas, s, 'flow', 'show the redirected force flow', refresh);
  panel.toggle(cas, s, 'lbl', 'show labels', refresh);
  const giv = panel.section('Given (characteristic)');
  panel.slider(giv, s, 'Qk', 'a) Q_k (kN)', 10, 60, 2, refresh);
  panel.slider(giv, s, 'Gk', 'b) G_k (kN)', 5, 40, 1, refresh);
  panel.slider(giv, s, 'Qk2', 'b) Q_k (kN)', 5, 40, 1, refresh);

  refresh();
  return player;
}
