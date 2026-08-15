/**
 * EX 5 · Task 2 — Cantilever
 * Structural Design I, HS 22 (sheet EX 5 "Arch-Cable", page 2).
 *
 * "Design a possible arch-cable structure for the given load cases and draw
 * the corresponding force diagram. Indicate the directions of the reaction
 * forces and mark tension forces in red, compression forces in blue and
 * reaction forces in green."
 *
 * Digitised at the stated 1:100. All three sub-figures hang off the same pair
 * of supports on a vertical wall, 85.01 pt = 3.000 m apart: the UPPER one is a
 * PIN (hatched against the wall) and the LOWER one a ROLLER on the wall face,
 * so it can only push horizontally. Loads:
 *   a) F_d = 40 kN at 4.000 m from the wall
 *   b) F₁d…F₄d = 10 kN each at 0.000, 2.667, 5.333 and 8.000 m — the first
 *      sits exactly on the support axis, so its lever arm is zero
 *   c) q_d = 5 kN/m over 0.000 to 8.000 m
 * All three therefore have the SAME resultant: 40 kN at exactly 4.000 m.
 *
 * The sheet prints no answers. Because the roller takes no vertical force:
 *   ΣV  → the pin carries all 40 kN upward
 *   ΣM about the pin → H = 40 × 4.000 / 3.000 = 53.333 kN, the roller pushing
 *         away from the wall and the pin pulling back toward it
 *   R_pin = √(53.333² + 40²) = 66.667 kN — a 3-4-5 triangle × 13.333
 * identical in a), b) and c).
 *
 * The form then draws itself, and lands on a small miracle. Put the horizontal
 * compression strut at the roller's level and hang the tension cable from the
 * pin: its constant thrust is that same 53.333 kN, so its slope starts at
 * −40/53.333 = −0.75 and flattens as each load is passed. In b) the cable
 * reaches −1.500, −2.500 and then exactly −3.000 m at 8.000 m; in c) the
 * parabola arrives at −3.000 m with zero slope. Either way the cable meets the
 * strut exactly at the tip — which is the check that the whole thing is right.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'EX 5.2 — a cantilever off a wall, three ways',
  subtitle: 'Structural Design I · sheet EX 5 “Arch-Cable”, task 2 a)–c)',
  about: 'Two supports on a wall, three metres apart, and 40 kN reaching four metres out. The lower support is a roller against the wall face, so it can only push — which turns the whole thing into a couple: the pin pulls back, the roller pushes out, and the lever arm is the three metres between them. Because all three load cases have the same resultant in the same place, the reactions never change. What changes is the shape of the cable that catches them.',
  result: (d) => [`${d.tag} pin: ${d.Vp.toFixed(2)} kN up and ${d.H.toFixed(3)} kN toward the wall → ${d.Rp.toFixed(3)} kN at ${d.ang.toFixed(2)}°`,
                  `roller: ${d.H.toFixed(3)} kN horizontal, pushing away from the wall — no vertical at all`,
                  `cable at the wall ${d.Ncab.toFixed(2)} kN tension (max ${d.Nmax.toFixed(2)}) · strut ${d.H.toFixed(2)} kN compression · the cable meets the strut at the tip`],
  frame: [[-22, -18], [22, 26.5]],
};

const MPU = 1.9;
const WX = -17, PY = 5.0;             // the wall, and the pin
const SEP = 3.0;                      // m between pin and roller
const SFD = 8;                        // kN per drawing unit
const LLX = 14, CY = 1;
const SYM = 3.0;
const NSEG = 20;

const SIT = [
  { tag: 'a)', xs: [4.0], Fs: [40], udl: false },
  { tag: 'b)', xs: [0, 8 / 3, 16 / 3, 8.0], Fs: [10, 10, 10, 10], udl: false },
  { tag: 'c)', xs: [], Fs: [], udl: true, q: 5, L: 8.0 },
];

const DEFAULTS = { sit: 0, o1: true, sIF: 0.02, lbl: true, _k: 99 };
const SHAPED = 3;

const STEPS = [
  { t: 'The exercise', d: 'EX 5 task 2: design an arch-cable structure that reaches out from a wall. Two supports, three metres apart — and one of them is a roller' },
  { t: 'What is given', d: 'left: the pin at the top of the wall and the roller below it. A roller on a vertical face can only push horizontally, so it takes no weight at all — every kilonewton of load has to go through the pin',
    detail: (d) => [`${d.tag} ${d.udl ? `q_d = ${d.q} kN/m over ${d.L} m` : d.Fs.map((f, i) => `${f} kN at ${d.xs[i].toFixed(3)} m`).join(' · ')}`,
                    `resultant ${d.tot.toFixed(0)} kN at ${d.xR.toFixed(3)} m from the wall — the same in all three cases`] },
  { t: 'The reactions come first', d: 'right: the load line. Moments about the pin give the horizontal pair straight away, because the roller’s push and the pin’s pull are the only horizontals there are',
    detail: (d) => [`ΣV: the pin takes all ${d.Vp.toFixed(0)} kN`,
                    `ΣM about the pin: H = ${d.tot.toFixed(0)} × ${d.xR.toFixed(3)} / ${SEP} = ${d.H.toFixed(3)} kN`,
                    `R_pin = √(${d.H.toFixed(2)}² + ${d.Vp.toFixed(0)}²) = ${d.Rp.toFixed(3)} kN`],
    take: 'a roller on a wall turns a cantilever into a couple: pull at the top, push at the bottom' },
  { t: 'The strut and the cable', d: 'left: put the compression strut along the roller’s own level — that is the only line it can push along — and hang the tension cable from the pin. Right: the pole sits one thrust away from the load line, and every ray is a cable segment',
    detail: (d) => [`the thrust in the cable is the same ${d.H.toFixed(3)} kN all the way along it`,
                    `it starts at a slope of −${d.tot.toFixed(0)}/${d.H.toFixed(2)} = −${(d.tot / d.H).toFixed(3)} and flattens at every load`] },
  { t: 'It lands on the strut', d: 'follow the cable out: it arrives at the far end of the strut exactly, with nothing left over. That is not a coincidence — it is the same statement as ΣM = 0, drawn instead of calculated',
    detail: (d) => [`cable nodes: ${d.nodes.map((p) => p[1].toFixed(3)).join(' · ')} m below the pin`,
                    `the last one is ${d.close.toFixed(4)} m from the strut — i.e. exactly on it`] },
  { t: 'The forces', d: 'the cable is in tension and hardest at the wall, where it is steepest; the strut is in compression and carries the thrust unchanged. Colour is the answer: pink out along the cable, blue back along the strut',
    detail: (d) => [`cable: ${d.N.map((n) => n.toFixed(1)).join(' · ')} kN, all tension`,
                    `strut: ${d.H.toFixed(2)} kN compression`] },
  { t: 'And the reactions close it', d: 'left: green at the two supports, the pin pulling up-and-into the wall and the roller pushing straight out. Right: the same two vectors closing the polygon',
    detail: (d) => [`pin ${d.Rp.toFixed(2)} kN at ${d.ang.toFixed(2)}° above the horizontal · roller ${d.H.toFixed(2)} kN horizontal`,
                    `ΣH = 0 ✓  ΣV = 0 ✓  ΣM = 0 ✓`] },
  { t: 'Three shapes, one answer', d: 'switch between the cases. A point load gives a straight cable, four loads give a polygon, a spread load gives a parabola — but the reactions are identical every time, because the resultant never moved',
    detail: () => ['a) one straight segment · b) a four-sided polygon · c) a parabola',
                   'pin 66.667 kN, roller 53.333 kN, in all three'],
    take: 'the supports only ever see the resultant; the shape is what the structure does about it' },
];

function compute(s) {
  const S = SIT[Math.round(s.sit)];
  const tot = S.udl ? S.q * S.L : S.Fs.reduce((a, b) => a + b, 0);
  const xR = S.udl ? S.L / 2
    : S.xs.reduce((a, x, i) => a + x * S.Fs[i], 0) / tot;
  const Vp = tot;
  const H = (tot * xR) / SEP;
  const Rp = Math.hypot(H, Vp);
  const ang = (Math.atan2(Vp, H) * 180) / Math.PI;
  // the cable, hung from the pin with that thrust
  const nodes = [[0, 0]];
  const N = [];                       // force in each cable SEGMENT
  const Vs = [];                      // and the shear that produced it
  if (S.udl) {
    for (let i = 1; i <= NSEG; i++) {
      const x = (S.L * i) / NSEG;
      // y = -(V0/H)x + (q/(2H))x²  — the funicular of a uniform load
      nodes.push([x, -(tot / H) * x + (S.q / (2 * H)) * x * x]);
    }
    for (let i = 0; i < NSEG; i++) {
      // the MID-segment shear: a chord of the parabola is parallel to the
      // tangent at its midpoint, so that is the shear the chord represents
      const v = tot - S.q * ((S.L * (i + 0.5)) / NSEG);
      Vs.push(v);
      N.push(Math.hypot(H, v));
    }
  } else {
    let shear = tot, y = 0;
    for (let i = 0; i < S.xs.length; i++) {
      const x0 = i === 0 ? 0 : S.xs[i - 1];
      const dx = S.xs[i] - x0;
      // In b) the first 10 kN sits exactly on the support axis. It has no
      // lever arm and no cable segment: it goes straight into the pin. Adding
      // one anyway gave a zero-length "segment" credited with the whole pin
      // reaction, which is where the 66.67 kN at the wall came from -- the
      // first real segment carries 61.19 kN.
      if (dx > 1e-9) {
        y -= (shear / H) * dx;
        Vs.push(shear);
        N.push(Math.hypot(H, shear));
      }
      // one node per load either way, so the load arrows still have somewhere
      // to hang -- it is only the SEGMENT list that skips the degenerate step
      nodes.push([S.xs[i], y]);
      shear -= S.Fs[i];               // the load is taken AT the node
    }
  }
  // the cable itself: the nodes with any repeated point dropped, so its
  // vertices line up one-for-one with the segment forces in N
  const poly = nodes.filter((p, i) => i === 0
    || Math.hypot(p[0] - nodes[i - 1][0], p[1] - nodes[i - 1][1]) > 1e-9);
  const tip = nodes[nodes.length - 1];
  const close = Math.abs(tip[1] + SEP);
  return { ...S, tot, xR, Vp, H, Rp, ang, nodes, poly, N, Vs, tip, close,
           Ncab: N[0], Nmax: Math.max(...N) };
}

const ux = (m) => WX + m * MPU;
const uy = (m) => PY + m * MPU;

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  s.sIF = dw.bandScale(compute(s).Rp);
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const CAB = { pending: PAL.black, final: (dd, st) => (st._k >= SHAPED ? PAL.red : PAL.grey) };
  const STR = { pending: PAL.black, final: (dd, st) => (st._k >= SHAPED ? PAL.blue : PAL.grey) };

  dw.label('form_title', 'Lageplan 1:100 — form diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Kräfteplan — force diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });

  dw.seg('wall', { intro: 1, w: dw.W.bar, color: PAL.black, flash: false });
  dw.strokes('wHatch', 12, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  for (const n of ['P', 'R']) {
    dw.disk(`sup${n}`, { intro: 1, r: dw.W.disk });
    dw.label(`lsup${n}`, n === 'P' ? 'pin' : 'roller', { cls: 'point', intro: 1, when: (st) => st.lbl });
  }
  dw.seg('rollLine', { intro: 1, w: dw.W.thin, color: PAL.grey, flash: false });

  // loads: up to four point arrows, or a run for the uniform case
  for (let i = 0; i < 4; i++) {
    const on = (st, dd) => !!dd && !dd.udl && i < dd.xs.length;
    dw.dashLine(`la${i}`, { intro: 1, color: PAL.grey, dash: dw.W.dash, when: on });
    dw.arrow(`f${i}`, { intro: 1, color: PAL.green, ...ARR, when: on });
    dw.label(`lf${i}`, '', { cls: 'num', intro: 1, color: PAL.green, when: on });
  }
  dw.seg('qbar', { intro: 1, w: dw.W.thin, color: PAL.green, when: (st, dd) => !!dd && dd.udl });
  dw.arrows('qarr', 17, { intro: 1, w: dw.W.thin, color: PAL.green, when: (st, dd) => !!dd && dd.udl,
    headLen: dw.W.narrow.headLen * 0.8, headW: dw.W.narrow.headW * 0.8 });
  dw.label('lq', '', { cls: 'num', intro: 1, color: PAL.green, when: (st, dd) => !!dd && dd.udl });
  dw.dashLine('Rline', { intro: 2, color: PAL.grey, dash: dw.W.dash });
  dw.dashArrow('Rform', { intro: 2, color: PAL.green, w: dw.W.arrow.w * 1.15,
    headLen: dw.W.arrow.headLen, headW: dw.W.arrow.headW, dash: dw.W.dash * 1.6, flash: false });
  dw.label('lRform', 'R', { cls: 'num', intro: 2, color: PAL.green });

  dw.arrow('ffL', { intro: 2, color: PAL.green, ...ARR });
  dw.label('lffL', '', { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.lbl });
  dw.disk('ptO', { intro: SHAPED, r: dw.W.disk * 0.8 });
  dw.label('lO', 'o', { cls: 'num', intro: SHAPED, when: (st) => st.lbl });
  dw.seg('dimH', { intro: SHAPED, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lH', '', { intro: SHAPED, flash: false, color: PAL.grey });

  dw.poly('band', 2 * (NSEG + 1), { intro: SHAPED, opacity: 1.0, z: -0.18, flash: false,
    color: { pending: PAL.zeroBand, final: () => PAL.redBand }, when: (st) => st.o1 });
  dw.strokes('cable', NSEG, { intro: SHAPED, w: dw.W.bar, color: CAB });
  dw.strokes('rays', NSEG, { intro: SHAPED, w: dw.W.ray, color: CAB });
  dw.poly('sband', 4, { intro: SHAPED, opacity: 1.0, z: -0.18, flash: false,
    color: { pending: PAL.zeroBand, final: () => PAL.blueBand }, when: (st) => st.o1 });
  dw.seg('strut', { intro: SHAPED, w: dw.W.bar, color: STR });
  dw.seg('strutF', { intro: SHAPED, w: dw.W.bar, color: STR });
  dw.label('lstrut', '', { cls: 'num', intro: 5, flash: false, color: STR });
  dw.disk('ptTip', { intro: 4, r: dw.W.disk * 0.8 });
  dw.label('ltip', '', { cls: 'point', intro: 4, flash: false, color: PAL.grey });
  dw.label('lcab', '', { cls: 'num', intro: 5, flash: false, color: CAB });

  for (const n of ['P', 'R']) {
    dw.arrow(`re${n}`, { intro: 6, color: PAL.green, ...NARR });
    dw.arrow(`fre${n}`, { intro: 6, color: PAL.green, ...NARR });
    dw.label(`lre${n}`, '', { cls: 'num', intro: 6, color: PAL.green });
    dw.link(`re${n}`, `fre${n}`, `lre${n}`);
  }

  dw.instant('form_title', 'force_title', 'force_sub');
  dw.ghostable('ffL', 'rays', 'freP', 'freR');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    dw.setLabel('form_title', [2, -15.4]);
    dw.setLabel('force_title', [8, -12.4]);
    dw.setLabel('force_sub', [8, -13.8]);
    dw.setText('force_sub', `to scale · 1 unit ≙ ${SFD} kN  (sheet: 1 cm ≙ 10 kN)`);

    const P = [ux(0), uy(0)], R = [ux(0), uy(-SEP)];
    dw.setSeg('wall', [ux(0), uy(2.2)], [ux(0), uy(-SEP - 2.2)]);
    dw.setStrokes('wHatch', V.hatch([ux(0), uy(-SEP - 2.0)], [ux(0), uy(2.0)],
      -1, 1.0, 12));
    dw.setDisk('supP', P); dw.setDisk('supR', R);
    dw.setLabel('lsupP', V.add(P, [-3.2, 0.9]));
    dw.setLabel('lsupR', V.add(R, [-3.4, -0.9]));
    dw.setSeg('rollLine', [ux(0) + 1.1, uy(-SEP) - 1.7], [ux(0) + 1.1, uy(-SEP) + 1.7]);

    const top = uy(2.6);
    for (let i = 0; i < 4; i++) {
      if (d.udl || i >= d.xs.length) continue;
      const x = ux(d.xs[i]);
      const node = d.nodes[i + 1];
      dw.setDashLine(`la${i}`, [[x, top + 1.2], [x, uy(node[1]) - 2.0]]);
      dw.setArrow(`f${i}`, [x, top], [x, top - SYM]);
      dw.setLabel(`lf${i}`, [x + 2.2, top - SYM * 0.5]);
      dw.setText(`lf${i}`, `${d.Fs[i]} kN`);
    }
    if (d.udl) {
      dw.setSeg('qbar', [ux(0), top], [ux(d.L), top]);
      dw.setArrows('qarr', Array.from({ length: 17 }, (_, i) => {
        const x = ux((d.L * i) / 16);
        return [[x, top], [x, top - 1.1]];
      }));
      dw.setLabel('lq', [ux(d.L) + 3.4, top]);
      dw.setText('lq', `q_d = ${d.q} kN/m`);
    }
    dw.setDashLine('Rline', [[ux(d.xR), top + 2.4], [ux(d.xR), uy(-SEP) - 2.4]]);
    dw.setDashArrow('Rform', [ux(d.xR), top + 2.2], [ux(d.xR), top + 2.2 - SYM]);
    dw.setLabel('lRform', [ux(d.xR) + 2.4, top + 2.2 - SYM * 0.5]);
    dw.setText('lRform', `R = ${d.tot.toFixed(0)} kN`);

    // force diagram: the load line, and the pole one thrust to its LEFT
    const Bo = [LLX, CY - d.tot / SFD], Tp = [LLX, CY];
    const o = [LLX - d.H / SFD, CY];
    dw.setArrow('ffL', Tp, Bo);
    dw.setLabel('lffL', V.add(V.mid(Tp, Bo), [2.4, 0]));
    dw.setText('lffL', `${d.tot.toFixed(0)}`);
    dw.setDisk('ptO', o);
    dw.setLabel('lO', V.add(o, [-1.4, 0.7]));
    dw.setSeg('dimH', [o[0], CY + 1.8], [LLX, CY + 1.8]);
    dw.setLabel('lH', [(o[0] + LLX) / 2, CY + 2.9]);
    dw.setText('lH', `H = ${d.H.toFixed(2)} kN`);

    // the cable and its rays
    const CP = d.poly.map((p) => [ux(p[0]), uy(p[1])]);
    const seg = [];
    for (let i = 0; i < NSEG; i++) {
      const j = Math.min(i, CP.length - 2);
      seg.push([CP[j], CP[j + 1]]);
    }
    dw.setStrokes('cable', seg);
    const nrm = CP.map((p, i) => V.unit(V.perp(
      V.sub(CP[Math.min(CP.length - 1, i + 1)], CP[Math.max(0, i - 1)]))));
    const hwOf = (i) => s.sIF * (d.N[Math.min(i, d.N.length - 1)] ?? d.Rp);
    const band = [];
    for (let i = 0; i < CP.length; i++) band.push(V.add(CP[i], V.mul(nrm[i], hwOf(i))));
    for (let i = CP.length - 1; i >= 0; i--) band.push(V.sub(CP[i], V.mul(nrm[i], hwOf(i))));
    while (band.length < 2 * (NSEG + 1)) band.push(band[band.length - 1]);
    dw.setPoly('band', band.slice(0, 2 * (NSEG + 1)));
    // ONE ray per cable segment, at the shear that segment actually carries --
    // so every ray is parallel to its own piece of cable. The old version
    // indexed past the end of the list and drew twenty copies of the last ray,
    // which in a) meant twenty copies of the strut and no cable ray at all.
    const rays = d.Vs.map((v) => [o, [LLX, CY - v / SFD]]);
    while (rays.length < NSEG) rays.push([o, o]);      // unused slots collapse
    dw.setStrokes('rays', rays.slice(0, NSEG));

    // the strut, along the roller's level, out to where the cable arrives
    const sEnd = [ux(d.tip[0]), uy(-SEP)];
    dw.setSeg('strut', R, sEnd);
    dw.setPoly('sband', V.rectPoints(R, sEnd, s.sIF * d.H));
    dw.setSeg('strutF', o, Tp);
    dw.setLabel('lstrut', V.add(V.mid(R, sEnd), [0, -2.4]));
    dw.setText('lstrut', `strut ${d.H.toFixed(2)} kN compression`);
    dw.setDisk('ptTip', sEnd);
    dw.setLabel('ltip', V.add(sEnd, [3.6, -1.2]));
    dw.setText('ltip', 'the cable lands here');
    dw.setLabel('lcab', V.add(V.mid(CP[0], CP[1]), [3.0, 1.4]));
    dw.setText('lcab', `${d.Ncab.toFixed(1)} kN tension`);

    // the reactions
    const uP = V.unit([-d.H, d.Vp]);
    dw.setArrow('reP', P, V.add(P, V.mul(uP, SYM)));
    dw.setLabel('lreP', V.add(V.add(P, V.mul(uP, SYM)), [-1.0, 1.2]));
    dw.setText('lreP', `${d.Rp.toFixed(1)}`);
    dw.setArrow('reR', R, V.add(R, [SYM, 0]));
    dw.setLabel('lreR', V.add(R, [SYM + 2.6, -0.9]));
    dw.setText('lreR', `${d.H.toFixed(1)}`);
    dw.setArrow('freP', Bo, o);
    dw.setArrow('freR', o, Tp);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const cas = panel.section('The case');
  panel.slider(cas, s, 'sit', 'situation', 0, 2, 1, refresh,
    (v) => ['a) one point load', 'b) four point loads', 'c) a line load'][Math.round(v)]);
  panel.toggle(cas, s, 'lbl', 'show labels', refresh);
  const giv = panel.section('Given');
  panel.toggle(giv, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
  panel.slider(giv, s, 'sIF', 'scale internal forces', 0, s.sIF * 2.5, s.sIF / 20, refresh);

  refresh();
  return player;
}
