/**
 * EX 4 · Task 1 — Arches under specific constraints
 * Structural Design I, HS 22 (sheet EX 4 "Arch structures", page 1).
 *
 * "Find a possible form for an arch for the loading cases in situations a)
 * and b). Consider the conditions below. Draw tension forces in red,
 * compression forces in blue and reaction forces in green.
 *   In a) the relevant force should be 100 kN.
 *   In b) the thrust (horizontal component of the reaction forces) equals
 *   120 kN.
 *   c) Are there other possible solutions for the cases above? If yes, draw
 *      an additional possible solutions qualitatively (only in the form
 *      diagram, without drawing the force diagram)."
 *
 * Geometry digitised from the sheet (the PDF carries hidden duplicates of
 * every figure, so the content stream has to be clip-filtered before the
 * coordinates mean anything): span A→B = 170.08 pt = 6.000 m at 1:100, with
 * the three load axes at 1.500 / 3.000 / 4.500 m — four equal bays. In b)
 * support B sits 56.7 pt = 2.000 m below A. Both supports are pinned.
 * F₁d = F₂d = F₃d = 40 kN.
 *
 * The sheet prints no answers, so both constraints are worked out here:
 *
 * a) Symmetric, so each support carries 60 kN vertically. The "relevant
 *    force" is the largest in the system, i.e. the end segment = the
 *    reaction: 100 kN. Then H = √(100² − 60²) = 80 kN exactly, and the rise
 *    follows from the mid-span moment, f = (60·3 − 40·1.5)/80 = 1.500 m.
 *    A 3-4-5 triangle, which is a strong sign this is the intended reading.
 *
 * b) H = 120 kN is given. Taking moments about A with B two metres lower and
 *    the thrust pushing outward gives B_v = 100 kN, A_v = 20 kN, and the
 *    funicular then passes through +0.250 / 0.000 / −0.750 m and lands
 *    exactly on B. Segment forces 121.66 / 121.66 / 134.16 / 156.20 kN.
 *
 * c) The other solution is the mirror image: hang the same funicular below
 *    the chord and every force flips from compression to tension, with the
 *    magnitudes unchanged in a) and the two reactions swapped in b).
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'EX 4.1 — finding an arch to fit a constraint',
  subtitle: 'Structural Design I · sheet EX 4 “Arch structures”, task 1 a)–c)',
  about: 'Three equal loads on a six-metre span, and no shape given — but one number that the shape has to satisfy. In a) the biggest force in the arch must come out at 100 kN; in b) the thrust must be exactly 120 kN and the right support sits two metres lower. Either way the constraint fixes the pole, the pole fixes the rays, and the rays draw the arch for you. Task c) is the punchline: turn the whole thing upside down and it works just as well, in tension.',
  result: (d) => [`${d.caseB ? 'b)' : 'a)'} thrust H = ${d.H.toFixed(1)} kN · A = ${d.NA.toFixed(1)} kN, B = ${d.NB.toFixed(1)} kN`,
                  `segment forces: ${d.N.map((n) => n.toFixed(1)).join(' · ')} kN — the relevant one is ${d.Nmax.toFixed(1)} kN`,
                  d.cable ? 'c) inverted: the same magnitudes, every member now in TENSION'
                          : `${d.caseB ? 'the given thrust is 120 kN' : 'the constraint asks for 100 kN'} — and it is met`],
  frame: [[-22, -17], [22, 15]],
};

const SPAN = 6;                       // m, digitised
const MPU = 3.0;                      // drawing units per metre
const AX = -18, AY = -4;              // support A
const LX = [1.5, 3.0, 4.5];           // load axes, m from A
const SFD = 10;                       // kN per drawing unit
const LLX = 6, LLY = 6;               // top of the load line
const SYM = 3.4;

const DEFAULTS = {
  F: 40,                              // kN, each of the three loads
  caseB: false,                       // a) level supports · b) B two metres lower
  cable: false,                       // c) the inverted solution
  Ncon: 100,                          // a) the required relevant force
  Hcon: 120,                          // b) the required thrust
  o1: true, sIF: 0.0004,
  lbl: true, _k: 99,
};

const SHAPED = 4;

const STEPS = [
  { t: 'The exercise', d: 'EX 4 task 1: three equal loads, six metres of span, and no shape given. What IS given is one number the finished arch has to satisfy' },
  { t: 'What is given', d: 'left: two pinned supports and three lines of action, at 1.5, 3.0 and 4.5 m. In case b) the right support drops two metres — switch it in the panel',
    detail: (d, st) => [`F₁d = F₂d = F₃d = ${st.F} kN · span ${SPAN} m · Lageplan 1:100`,
                        st.caseB ? 'b) support B is 2.00 m below A' : 'a) both supports at the same level'] },
  { t: 'The load line', d: 'right: the three loads laid off tip to tail. Their total is all the vertical the two supports have to share between them',
    detail: (d) => [`ΣF = ${d.tot} kN`] },
  { t: 'The constraint fixes the pole', d: 'this is the whole task. In a) the largest force must be 100 kN, and since the vertical part is already known that leaves only one thrust. In b) the thrust is handed to you outright',
    detail: (d, st) => [st.caseB
      ? `b) H = ${st.Hcon} kN given → the pole stands ${(d.H / SFD).toFixed(2)} units from the load line`
      : `a) relevant force ${st.Ncon} kN and V = ${(d.tot / 2).toFixed(0)} kN → H = √(${st.Ncon}² − ${(d.tot / 2).toFixed(0)}²) = ${d.H.toFixed(1)} kN`],
    take: 'one number is enough: fix the pole and the shape has no freedom left' },
  { t: 'The arch draws itself', d: 'left: starting at A, each segment runs parallel to its ray and turns at every line of action — and the last one lands on B, which is the proof that the thrust was right',
    detail: (d) => [`node heights above A: ${d.nodes.slice(1, -1).map((p) => p.m.toFixed(3)).join(' · ')} m`,
                    `rise at the crown ${d.rise.toFixed(3)} m`] },
  { t: 'Global equilibrium', d: 'right: the reactions close the polygon — left: they push into the supports along the arch’s end directions. An arch leans on its abutments; that is the price of spanning without tension',
    detail: (d) => [`A = ${d.NA.toFixed(1)} kN · B = ${d.NB.toFixed(1)} kN · both with ${d.H.toFixed(1)} kN horizontal`] },
  { t: 'The member forces', d: 'every segment carries the same horizontal thrust, so again the steepest one carries the most. In blue, because an arch works in compression',
    detail: (d) => [`${d.N.map((n, i) => `segment ${i + 1}: ${n.toFixed(1)}`).join(' · ')} kN`,
                    `the relevant force is ${d.Nmax.toFixed(1)} kN`] },
  { t: 'c) The other solution', d: 'tick “inverted” in the panel. Hang the same funicular below the chord instead of standing it above, and every single force keeps its magnitude and changes its sign — compression becomes tension. Same statics, opposite structure',
    detail: (d, st) => [st.cable
      ? 'inverted: a cable, every member in tension (pink), and in b) the two reactions swap over'
      : 'the arch above the chord — now tick “inverted” to see the cable that does the same job',
      'any shape that is NOT the funicular also works, but only if its members can bend'],
    take: 'an arch and a cable are the same drawing read upside down' },
];

function compute(s) {
  const F = [s.F, s.F, s.F];
  const tot = F.reduce((a, b) => a + b, 0);
  const dropB = s.caseB ? -2 : 0;                 // m, B relative to A
  // vertical reactions: moments about A, with the thrust acting at B's level
  const H = s.caseB ? s.Hcon : Math.sqrt(Math.max(s.Ncon ** 2 - (tot / 2) ** 2, 1));
  const sgn = s.cable ? -1 : 1;                   // arch up, cable down
  // sum of load moments about A
  const Mload = LX.reduce((a, x, i) => a + x * F[i], 0);
  // ΣM_A = 0. The support pushes the ARCH inward at B, i.e. (−H, +Bv) with B
  // at (L, dropB), so its moment about A is L·Bv − dropB·(−H) = L·Bv + H·dropB
  // ... which, set against the load moment, gives Bv below. A CABLE pulls the
  // other way, so the thrust term changes sign with sgn — and the two vertical
  // reactions come out exactly swapped, which is the point of task c).
  // Check: b) arch → Av = 20, Bv = 100, and the funicular lands on B to the mm.
  const Bv = (Mload - sgn * H * dropB) / SPAN;
  const Av = tot - Bv;
  // funicular through the loads: shear stays constant between load axes
  const xs = [0, ...LX, SPAN];
  const shear = [Av];
  F.forEach((f) => shear.push(shear[shear.length - 1] - f));
  const nodes = [{ x: 0, m: 0 }];
  for (let i = 0; i < xs.length - 1; i++) {
    const dx = xs[i + 1] - xs[i];
    nodes.push({ x: xs[i + 1], m: nodes[i].m + sgn * (shear[i] / H) * dx });
  }
  const N = shear.map((v) => Math.hypot(H, v));
  const Nmax = Math.max(...N);
  const rise = Math.max(...nodes.map((p) => sgn * p.m));
  const pt = (n) => [AX + n.x * MPU, AY + n.m * MPU];
  const P = nodes.map(pt);
  const A = P[0], B = P[P.length - 1];
  // force diagram: load line down, pole at H to the right, split at Av
  const T = [LLX, LLY];
  const div = [T];
  F.forEach((f) => div.push([LLX, div[div.length - 1][1] - f / SFD]));
  const o = [LLX + H / SFD, LLY - Av / SFD];
  return { F, tot, H, Av, Bv, nodes, N, Nmax, rise, P, A, B, T, div, o,
           NA: N[0], NB: N[N.length - 1], caseB: s.caseB, cable: s.cable, dropB };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  s.sIF = dw.bandScale(compute(s).Nmax);
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  // blue for an arch, pink for the inverted cable — and grey until it is drawn
  const MEM = { pending: PAL.black,
    final: (dd, st) => (st._k < SHAPED ? PAL.grey : st.cable ? PAL.red : PAL.blue) };
  const BAND = { pending: PAL.zeroBand,
    final: (dd, st) => (st._k < SHAPED ? PAL.zeroBand : st.cable ? PAL.redBand : PAL.blueBand) };

  dw.label('form_title', 'Lageplan 1:100 — form diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Kräfteplan — force diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });

  for (const n of ['A', 'B']) {
    dw.disk(`sup${n}`, { intro: 1, r: dw.W.disk });
    dw.label(`lsup${n}`, n, { cls: 'num', intro: 1, when: (st) => st.lbl });
    dw.strokes(`hat${n}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  }
  dw.dashLine('chord', { intro: 1, color: PAL.grey, dash: dw.W.dash });
  for (let i = 0; i < 3; i++) {
    dw.dashLine(`la${i}`, { intro: 1, color: PAL.grey, dash: dw.W.dash });
    dw.arrow(`f${i}`, { intro: 1, color: PAL.green, ...ARR });
    dw.label(`lf${i}`, `F${'₁₂₃'[i]}d`, { cls: 'num', intro: 1, color: PAL.green, when: (st) => st.lbl });
    dw.arrow(`ff${i}`, { intro: 2, color: PAL.green, ...ARR });
    dw.label(`lff${i}`, `F${'₁₂₃'[i]}d`, { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.lbl });
    dw.link(`f${i}`, `ff${i}`, `lf${i}`, `lff${i}`);
    dw.highlight(`f${i}`, [2]);
  }
  dw.disk('ptO', { intro: 3, r: dw.W.disk * 0.8 });
  dw.label('lO', 'o', { cls: 'num', intro: 3, when: (st) => st.lbl });
  dw.seg('dimH', { intro: 3, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lH', '', { intro: 3, flash: false, color: PAL.grey });
  dw.disk('ptI', { intro: 3, r: dw.W.disk * 0.7 });
  dw.label('lI', 'i', { cls: 'point', intro: 3, when: (st) => st.lbl });

  for (let i = 0; i < 4; i++) {
    dw.poly(`bd${i}`, 4, { intro: SHAPED, opacity: 1.0, z: -0.18, flash: false,
      color: BAND, when: (st) => st.o1 });
    dw.seg(`mem${i}`, { intro: SHAPED, w: dw.W.bar, color: MEM });
    dw.seg(`ray${i}`, { intro: SHAPED, w: dw.W.ray, color: MEM });
    dw.label(`lm${i}`, '', { cls: 'point', intro: 6, flash: false, color: MEM });
    dw.link(`mem${i}`, `ray${i}`, `lm${i}`);
  }
  dw.seg('dimF', { intro: SHAPED, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lF', '', { intro: SHAPED, flash: false, color: PAL.grey });

  for (const n of ['A', 'B']) {
    dw.arrow(`re${n}`, { intro: 5, color: PAL.green, ...NARR });
    dw.arrow(`fre${n}`, { intro: 5, color: PAL.green, ...NARR });
    dw.label(`lre${n}`, '', { cls: 'num', intro: 5, color: PAL.green });
    dw.link(`re${n}`, `fre${n}`, `lre${n}`);
  }
  dw.label('lgov', '', { cls: 'num', intro: 6, flash: false, color: MEM });
  // c) the alternative, drawn as a pale ghost of the flipped funicular
  dw.strokes('alt', 4, { intro: 7, w: dw.W.thin, color: PAL.zero, flash: false });
  dw.label('lalt', '', { cls: 'point', intro: 7, flash: false, color: PAL.grey });

  dw.instant('form_title', 'force_title', 'force_sub');
  dw.ghostable('ff0', 'ff1', 'ff2', 'ray0', 'ray1', 'ray2', 'ray3', 'freA', 'freB');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    dw.setLabel('form_title', [2, -14.4]);
    dw.setLabel('force_title', [8, -12.4]);
    dw.setLabel('force_sub', [8, -13.8]);
    dw.setText('force_sub', `to scale · 1 unit ≙ ${SFD} kN  (sheet: 1 cm ≙ 20 kN)`);

    dw.setDisk('supA', d.A); dw.setDisk('supB', d.B);
    dw.setLabel('lsupA', V.add(d.A, [-1.5, -0.9]));
    dw.setLabel('lsupB', V.add(d.B, [1.5, -0.9]));
    for (const [n, p] of [['A', d.A], ['B', d.B]]) {
      dw.setStrokes(`hat${n}`, Array.from({ length: 5 }, (_, i) =>
        [[p[0] - 1.6 + i * 0.8, p[1] - 0.5], [p[0] - 2.2 + i * 0.8, p[1] - 1.3]]));
    }
    dw.setDashLine('chord', [V.add(d.A, [-2.4, 0]), V.add(d.B, [2.4, 0])]);

    const top = Math.max(...d.P.map((p) => p[1]));
    LX.forEach((x, i) => {
      const px = AX + x * MPU;
      const node = d.P[i + 1];
      dw.setDashLine(`la${i}`, [[px, top + SYM + 1.4], [px, Math.min(node[1], AY) - 2.4]]);
      dw.setArrow(`f${i}`, [px, node[1] + SYM + 0.9], [px, node[1] + 0.5]);
      dw.setLabel(`lf${i}`, [px + 2.0, node[1] + SYM * 1.05]);
      dw.setArrow(`ff${i}`, d.div[i], d.div[i + 1]);
      dw.setLabel(`lff${i}`, V.add(V.mid(d.div[i], d.div[i + 1]), [-2.2, 0]));
    });

    dw.setDisk('ptO', d.o);
    dw.setLabel('lO', V.add(d.o, [1.4, 0.7]));
    dw.setDisk('ptI', [LLX, d.o[1]]);
    dw.setLabel('lI', [LLX - 1.3, d.o[1]]);
    dw.setSeg('dimH', [LLX, d.T[1] + 1.7], [d.o[0], d.T[1] + 1.7]);
    dw.setLabel('lH', [(LLX + d.o[0]) / 2, d.T[1] + 2.8]);
    dw.setText('lH', `H = ${d.H.toFixed(1)} kN`);

    for (let i = 0; i < 4; i++) {
      dw.setSeg(`mem${i}`, d.P[i], d.P[i + 1]);
      dw.setPoly(`bd${i}`, V.rectPoints(d.P[i], d.P[i + 1], s.sIF * d.N[i]));
      dw.setSeg(`ray${i}`, d.o, d.div[Math.min(i, 3)]);
      const nb = V.mul(V.unit(V.perp(V.sub(d.P[i + 1], d.P[i]))), (d.cable ? -1 : 1) * (s.sIF * d.N[i] + 1.4));
      dw.setLabel(`lm${i}`, V.add(V.mid(d.P[i], d.P[i + 1]), nb));
      dw.setText(`lm${i}`, `${d.N[i].toFixed(0)}`);
    }
    // the rise, dimensioned at the crown
    const ci = d.nodes.reduce((b, p, i) => (Math.abs(p.m) > Math.abs(d.nodes[b].m) ? i : b), 0);
    dw.setSeg('dimF', [d.P[ci][0] + 1.0, AY], [d.P[ci][0] + 1.0, d.P[ci][1]]);
    dw.setLabel('lF', [d.P[ci][0] + 3.2, (AY + d.P[ci][1]) / 2]);
    dw.setText('lF', `f = ${d.rise.toFixed(2)} m`);

    // reactions: along the end segments, pushing into the supports
    const uA = V.unit(V.sub(d.A, d.P[1])), uB = V.unit(V.sub(d.B, d.P[3]));
    dw.setArrow('reA', V.add(d.A, V.mul(uA, SYM)), d.A);
    dw.setArrow('reB', V.add(d.B, V.mul(uB, SYM)), d.B);
    dw.setLabel('lreA', V.add(V.add(d.A, V.mul(uA, SYM)), [-2.2, -0.6]));
    dw.setLabel('lreB', V.add(V.add(d.B, V.mul(uB, SYM)), [2.2, -0.6]));
    dw.setText('lreA', `A = ${d.NA.toFixed(0)}`);
    dw.setText('lreB', `B = ${d.NB.toFixed(0)}`);
    dw.setArrow('freA', d.o, d.T);
    dw.setArrow('freB', d.div[3], d.o);

    const gi = d.N.indexOf(d.Nmax);
    const gn = V.mul(V.unit(V.perp(V.sub(d.P[gi + 1], d.P[gi]))), (d.cable ? -1 : 1) * (s.sIF * d.Nmax + 3.2));
    dw.setLabel('lgov', V.add(V.mid(d.P[gi], d.P[gi + 1]), gn));
    dw.setText('lgov', `relevant force ${d.Nmax.toFixed(0)} kN`);

    // c) the mirror solution, shown faintly on the other side of the chord
    dw.setStrokes('alt', Array.from({ length: 4 }, (_, i) => {
      const mir = (p, k) => [p[0], AY + (AY - p[1]) + (d.dropB * MPU) * (d.nodes[k].x / SPAN) * 2];
      return [mir(d.P[i], i), mir(d.P[i + 1], i + 1)];
    }));
    dw.setLabel('lalt', [AX + SPAN * MPU * 0.5 + 20, AY - (d.cable ? -1 : 1) * (d.rise * MPU + 3.4)]);
    dw.setText('lalt', d.cable ? 'the arch does the same job in compression'
                               : 'the cable does the same job in tension');

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const cas = panel.section('The situation');
  panel.toggle(cas, s, 'caseB', 'b) support B two metres lower', refresh);
  panel.toggle(cas, s, 'cable', 'c) inverted — the cable solution', refresh);
  panel.toggle(cas, s, 'lbl', 'show labels', refresh);
  const con = panel.section('The constraint');
  panel.slider(con, s, 'Ncon', 'a) relevant force (kN)', 65, 200, 1, refresh);
  panel.slider(con, s, 'Hcon', 'b) thrust H (kN)', 40, 220, 1, refresh);
  const giv = panel.section('Given');
  panel.slider(giv, s, 'F', 'each load F_d (kN)', 10, 80, 5, refresh);
  panel.toggle(giv, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
  panel.slider(giv, s, 'sIF', 'scale internal forces', 0, s.sIF * 2.5, s.sIF / 20, refresh);

  refresh();
  return player;
}
