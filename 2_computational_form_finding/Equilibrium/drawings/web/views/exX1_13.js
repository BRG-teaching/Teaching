/**
 * EX X · Task 13 — Bridge
 * Structural Design I, HS 22 (sheet "EX X — Additional Exercises", page 13).
 *
 * TASK, verbatim (English sheet):
 *   "a) The form of the top chord of an arch-cable-structure for a bridge is
 *       given. Using the force diagram, find the form of the bottom chord for
 *       the given loading case. Note that the support B is a roller. Colour
 *       tension forces red, compression forces blue and the external forces
 *       green."
 *   "b) The structure is to be modified such that the force in the bottom chord
 *       is constant. Describe in words how the form of the structure would
 *       change. Sketches in the position and force plan can help."
 *
 * GIVEN. F1 = F2 = F3 = F4 = F5 = 20 kN on five vertical axes, applied at the
 * TOP chord nodes (the key's joint polygons put each F at a top node). Form
 * diagram 1:100, force diagram 1 cm = 10 kN. A is a pin, B is a roller.
 * The key numbers the members 1-6 (top chord), 7-11 (struts), 12-17 (bottom).
 *
 * GEOMETRY, digitised with
 *   web/tools/sheetvec.py <task-en.pdf> 13 --scale 100 --min 0.4 --cluster
 * origin = support A at deck level:
 *
 *   A  (pin)     8.726, 21.883  ->   0.000, 0
 *   T1          10.226, 22.883  ->   1.500, 1.000
 *   T2          13.225, 24.083  ->   4.499, 2.200
 *   T3 (crown)  16.224, 24.482  ->   7.498, 2.599
 *   T4          19.223, 24.083  -> 10.497, 2.200
 *   T5          22.222, 22.883  -> 13.496, 1.000
 *   B  (roller) 23.721, 21.883  -> 14.995, 0
 *
 * i.e. span 15.00 m, load axes 3.00 m apart at 1.5, 4.5, 7.5, 10.5, 13.5 m
 * (half a bay from each abutment), top chord 1.00 / 2.20 / 2.60 m high.
 * Everything comes out round, which validates 1:100.
 *
 * The top-chord slopes are 0.66667, 0.40000, 0.13333, -0.13333, -0.40000,
 * -0.66667: the DECREMENT is 0.26667 at every node, so the given top chord is
 * exactly the funicular polygon of five equal 20 kN loads for a pole distance
 * of 20/0.26667 = 75 kN. Nothing on the sheet says so, and it is what makes the
 * printed answer come out in round numbers.
 *
 * WHY BOTH REACTIONS ARE PURELY VERTICAL (this is what "B is a roller" buys).
 * Loads are vertical and symmetric, so A_v = B_v = 50 kN. Each chord carries
 * only vertical external forces (the loads at the top nodes, the vertical strut
 * forces at both), so the horizontal component of each chord force is CONSTANT
 * along that chord. At B only members 6 and 17 meet and the roller takes no
 * horizontal force, so H_top = H_bot = H. At A the same two chords meet, so
 * their horizontal components cancel there too and A_h = 0. The arch is
 * self-anchored by its own bottom chord; the thrust never reaches the ground.
 *
 * THE CONSTRUCTION. Load line vertical, L_i = (0, -20 i) for i = 0..5, pole
 * O = (0, -A_v) = (0, -50):
 *   - top-chord ray i+1 runs L_i -> P_i with P_i = (-H, -20 i - H m_i);
 *   - all six P_i sit on x = -H, so the segments between them are vertical:
 *     those are the strut forces S_i = 20 + H (m_i - m_{i-1}) = 20 - 0.26667 H,
 *     equal for all five;
 *   - bottom-chord ray 12+i runs P_i -> O, form-diagram slope m_i - (50-20i)/H;
 *   - drawing the bottom chord from A with those six slopes lands back on B.
 *
 * a) HAS NO UNIQUE ANSWER, AND THE KEY DOES NOT SAY SO. Summing the bottom
 * chord's rise over the six bays, Sum(dx_i m_i) = 0 (the top chord closes) and
 * Sum(dx_i (50 - 20 i)) = 0 is nothing but the global moment equation that
 * already fixed A_v = 50. So the bottom chord closes on B for EVERY H: the
 * answer is a one-parameter family. Count it: 12 joints, 17 members, 3 reaction
 * components -> 24 equations against 20 unknowns, and the four missing
 * conditions are absorbed by the five unknown bottom-chord ordinates, leaving
 * exactly one free. The view exposes that freedom as the "mid-span depth"
 * slider; the key's own drawing is the depth 1.30 m / H = 50 kN member of it.
 *
 * WHICH H THE KEY USED. From the solution PDF's own force diagram (1 unit =
 * 1 cm on paper = 10 kN): load line at x = 16.162 divided at 14.470, 12.471,
 * 10.471, 8.472, 6.473, 4.474 (spacing 1.999 = 20.0 kN); pole at (16.162,
 * 9.472), 4.998 below the top, so A = 50.0 kN; the P-line at x = 11.164, so
 * H = 4.998 units = 50.0 kN exactly. Its five strut segments measure 0.667,
 * 0.666, 0.666, 0.667, 0.666 -> S = 6.67 kN each = 20 - 0.26667*50.
 *
 * ANSWERS FOR a) AT THE KEY'S H = 50 kN. Bottom chord 0.500 / 1.100 / 1.300 /
 * 1.100 / 0.500 m below deck (the solution PDF digitises 0.500, 1.100, 1.299).
 *   members 1, 6      60.09 kN compression
 *   members 2, 5      53.85 kN compression
 *   members 3, 4      50.44 kN compression
 *   members 7..11      6.67 kN compression (the struts)
 *   members 12, 17    52.70 kN tension
 *   members 13, 16    50.99 kN tension
 *   members 14, 15    50.11 kN tension
 *   A = B = 50.00 kN vertical, A_h = 0
 * Cross-check against the drawn rays: 6.007, 5.383, 5.009 / 5.269, 5.097,
 * 5.009 units -> 60.07, 53.83, 50.09 / 52.69, 50.97, 50.09 kN. Agreement to
 * 0.03 kN, i.e. to the width of the line.
 *
 * b) CONSTANT FORCE IN THE BOTTOM CHORD, reconstructed exactly from the key's
 * pale second drawing. A constant bottom-chord force means the six points P_i
 * lie on a CIRCLE of radius C about the pole O. The key keeps the six
 * bottom-chord directions of a) and slides each P_i out along its own radius
 * until |O P_i| = C, with C = |O P_0| = 52.70 kN, the largest of the a) forces
 * -- which is why member 1 and its ray are the only ones that do not move.
 * Then:
 *   - the P_i are no longer on a vertical line, so the segments between them --
 *     the strut forces -- are no longer vertical: THE STRUTS TILT;
 *   - the horizontal component of the bottom chord is no longer constant, and
 *     the tilted struts are exactly what supplies the difference;
 *   - the top-chord ray directions move with the P_i, so the arch flattens a
 *     little: crown 2.512 m instead of 2.599 m.
 * b) numbers: bottom chord 52.70 kN tension throughout; top chord 60.09 /
 * 55.30 / 52.99 kN; struts 6.55 / 6.89 / 7.01 kN compression. New nodes: top
 * (1.500, 1.000), (4.500, 2.141), (7.500, 2.512); bottom (1.134, -0.378),
 * (4.087, -0.969), (7.500, -1.196). Every one of those matches the key's pale
 * drawing to 3 mm.
 *
 * AGAINST THE OFFICIAL KEY. No error found: our a) geometry reproduces the
 * key's to 1 mm and our forces its drawn ray lengths to 0.03 kN; our b) node
 * positions reproduce its pale drawing to 3 mm. Two things the key leaves
 * unsaid and that this view states out loud:
 *   1. a) has no unique answer; H = 50 kN is a choice, not a result.
 *   2. the roller at B does not send the thrust to A -- it makes BOTH
 *      reactions purely vertical and the arch self-anchored.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

// digitised at 1:100, origin at support A, deck level
const XS = [0, 1.5, 4.5, 7.5, 10.5, 13.5, 15];
const YT = [0, 1.0, 2.2, 2.6, 2.2, 1.0, 0];
const NB = 6;                    // bays / chord members
const NS = 5;                    // struts, loads
const BSTEP = 8;                 // the step at which b) takes over

const DEFAULTS = {
  F: 20,           // kN, each of the five equal loads
  sag: 1.30,       // m, mid-span depth of the bottom chord — the free parameter
  constB: false,   // b): make the bottom-chord force constant
  ghostA: true,    // keep a) as a pale overlay while b) is showing
  lbl: true,
  _k: 99,
};

// ---- layout ---------------------------------------------------------------
const AX = -5.0, AY = 8.0, MPU = 2.4;    // form diagram: support A, units per m
const KX = 24.0, KY = -6.0;              // force diagram: top of the load line
const LOADY = 19.4, LOADL = 2.6;         // the row of load arrows

export const meta = {
  title: 'EX X.13 — the bridge, and the chord that is not given',
  subtitle: 'Structural Design I · sheet EX X “Additional Exercises”, task 13 a) + b)',
  about: 'An arch-cable bridge: the arch on top is drawn for you, five equal loads sit on it, and the tie underneath has to be found with the force diagram. The trick the sheet points at is the roller at B — it forces the arch thrust and the cable pull to be equal at every section, so the structure anchors itself and neither support takes any horizontal force at all. The trick the sheet does NOT point at is that the answer is not unique: the closure of the bottom chord on B is guaranteed by the moment equation alone, so every depth of tie is a valid answer. Drag the depth and watch a whole family of correct bottom chords. Then part b) asks for a constant force in the tie, and the moment you demand it the struts stop being vertical.',
  result: (d) => [
    d.bmode
      ? `b) constant bottom chord ${d.C.toFixed(2)} kN tension — and the struts tilt: ${d.str2.map((v) => v.toFixed(2)).join(' / ')} kN, leaning ${d.tilt.toFixed(1)}° at the ends and vertical only at mid-span`
      : `a) bottom chord below deck: ${d.yb.slice(1, 6).map((v) => (-v).toFixed(3)).join(' / ')} m — it closes on B to ${Math.abs(d.closure).toExponential(1)} m`,
    d.bmode
      ? `b) top chord ${d.top2.slice(0, 3).map((v) => v.toFixed(2)).join(' / ')} kN compression (mirrored) and the arch flattens: crown ${d.yt2[3].toFixed(3)} m instead of ${YT[3].toFixed(3)} m`
      : `a) top chord ${d.top.slice(0, 3).map((v) => v.toFixed(2)).join(' / ')} kN compression · bottom chord ${d.bot.slice(0, 3).map((v) => v.toFixed(2)).join(' / ')} kN tension · struts ${d.str[0].toFixed(2)} kN compression (all five equal), mirrored about mid-span`,
    `A = B = ${d.Av.toFixed(2)} kN, both purely VERTICAL: the roller at B makes arch thrust = tie pull, so A takes no horizontal force either`,
    `a) has no unique answer — the bottom chord closes on B for every pole distance. Here H = ${d.H.toFixed(2)} kN (depth ${d.sag.toFixed(2)} m); the key drew H = 50 kN, depth 1.30 m; at H = ${d.Hflat.toFixed(1)} kN the tie flattens onto the deck and the struts go to zero`,
    'b), in the key’s words: “If the tension force in the lower chord is constant, the struts between the top and bottom chords will tilt, i.e. they will no longer be vertical.”',
  ],
  frame: [[-36, -28], [40, 22]],
};

// ---------------------------------------------------------------- the maths --

function compute(s) {
  const F = s.F;
  const m = [];
  for (let i = 0; i < NB; i++) m.push((YT[i + 1] - YT[i]) / (XS[i + 1] - XS[i]));
  // the pole distance for which the GIVEN top chord is itself the funicular
  const Hflat = F / (m[0] - m[1]);
  // the free parameter, entered as the mid-span depth of the bottom chord
  const sag = Math.max(0.02, s.sag);
  const H = (Hflat * YT[3]) / (YT[3] + sag);
  // global equilibrium, done properly rather than by symmetry
  const span = XS[NB];
  let Av = 0;
  for (let i = 1; i <= NS; i++) Av += (F * (span - XS[i])) / span;
  const Bv = NS * F - Av;

  // the force diagram of a)
  const L = [], P = [];
  for (let i = 0; i <= NS; i++) { L.push([0, -i * F]); P.push([-H, -i * F - H * m[i]]); }
  const O = [0, -Av];
  const str = [];
  for (let i = 1; i <= NS; i++) str.push(P[i - 1][1] - P[i][1]);
  const sb = P.map((p) => (O[1] - p[1]) / H);          // bottom-chord slopes
  const yb = [0];
  for (let i = 0; i < NB; i++) yb.push(yb[i] + (XS[i + 1] - XS[i]) * sb[i]);
  const closure = yb[NB];
  const top = m.map((_, i) => V.dist(L[i], P[i]));
  const bot = P.map((p) => V.dist(p, O));

  // b) constant force in the bottom chord: every P_i pushed out to one radius
  const C = bot[0];
  const P2 = P.map((p) => V.add(O, V.mul(V.unit(V.sub(p, O)), C)));
  const m2 = P2.map((p, i) => (p[1] - L[i][1]) / (p[0] - L[i][0]));
  const yt2 = [0];
  for (let i = 0; i < NB; i++) yt2.push(yt2[i] + (XS[i + 1] - XS[i]) * m2[i]);
  const bn2 = [[0, 0]];
  for (let i = 1; i <= NS; i++) {
    const hit = V.intersect(bn2[i - 1], [1, sb[i - 1]],
                            [XS[i], yt2[i]], V.sub(P2[i], P2[i - 1]));
    bn2.push(hit || [XS[i], yb[i]]);
  }
  bn2.push([span, bn2[NS][1] + (span - bn2[NS][0]) * sb[NS]]);
  const closure2 = bn2[NB][1];
  const top2 = m2.map((_, i) => V.dist(L[i], P2[i]));
  const str2 = [];
  for (let i = 1; i <= NS; i++) str2.push(V.dist(P2[i - 1], P2[i]));
  const tilt = Math.abs(90 - Math.abs(Math.atan2(P2[1][1] - P2[0][1],
    P2[1][0] - P2[0][0]) * 180 / Math.PI));

  const bmode = !!s.constB || s._k >= BSTEP;

  // what is actually drawn
  const nodeTop = XS.map((x, i) => [x, bmode ? yt2[i] : YT[i]]);
  const nodeBot = bmode ? bn2 : XS.map((x, i) => [x, yb[i]]);
  const pts = bmode ? P2 : P;
  const Ntop = bmode ? top2 : top;
  const Nbot = bmode ? P2.map(() => C) : bot;
  const Nstr = bmode ? str2 : str.map(Math.abs);

  // members, in the key's numbering
  const mem = [];
  for (let i = 0; i < NB; i++) {
    mem.push({ no: `${i + 1}`, a: nodeTop[i], b: nodeTop[i + 1], N: -Ntop[i],
      ray: [L[i], pts[i]] });
  }
  for (let i = 1; i <= NS; i++) {
    mem.push({ no: `${i + 6}`, a: nodeTop[i], b: nodeBot[i], N: -Nstr[i - 1],
      ray: [pts[i - 1], pts[i]] });
  }
  for (let i = 0; i < NB; i++) {
    mem.push({ no: `${i + 12}`, a: nodeBot[i], b: nodeBot[i + 1], N: Nbot[i],
      ray: [pts[i], O] });
  }

  // scales: 100 kN of load line, and the pole distance, both must fit the box
  const SFD = Math.max(4.6, (NS * F) / 20.0, H / 11.0);

  return { F, sag, H, Hflat, Av, Bv, m, L, O, P, P2, pts, sb, yb, yt2, bn2,
           closure, closure2, C, top, bot, str, top2, str2, tilt,
           bmode, nodeTop, nodeBot, mem, SFD, span,
           Nmax: Math.max(...mem.map((x) => Math.abs(x.N))) };
}

// ------------------------------------------------------------------ steps --

const STEPS = [
  { t: 'The exercise',
    d: 'EX X task 13: the arch of an arch-cable bridge is given; find the form of the bottom chord with the force diagram. Note that B is a roller. Then b): make the force in the tie constant, and say how the form changes',
    take: 'the key draws the answer but prints no forces, and never says that the answer is not unique. Both are fixed here' },
  { t: 'What is given',
    d: 'a 15 metre span, five equal loads on axes three metres apart and half a bay in from each abutment, and an arch whose form is drawn for you. The tie underneath is the unknown',
    detail: (d) => [`span ${d.span.toFixed(2)} m · axes at ${XS.slice(1, 6).join(', ')} m · loads ${d.F.toFixed(1)} kN · arch ${YT.slice(1, 4).map((v) => v.toFixed(2)).join(' / ')} m high`,
                    `its slopes fall by ${(d.m[0] - d.m[1]).toFixed(5)} at every node, so the given arch is itself the funicular of the loads for a pole distance of ${d.Hflat.toFixed(1)} kN`],
    take: 'nothing on the sheet says that; it is why the printed answer comes out round' },
  { t: 'The reactions, and the roller',
    d: 'each chord carries only vertical forces, so its horizontal component is the same all along it. The roller at B takes none — so arch thrust and tie pull are equal there, and they cancel at A too',
    detail: (d) => [`A = B = ${d.Av.toFixed(2)} kN, vertical · A_h = 0: the thrust never reaches the ground, the tie takes it`],
    take: 'that is what “note that the support B is a roller” is for. A pin there instead, and the split between arch and tie would be indeterminate' },
  { t: 'The load line and the pole',
    d: 'below: the five loads stacked tip to tail down one vertical line, with the reactions closing it. The pole sits ON that line, at the division point between A and B — it has to, because there is no horizontal reaction to move it off',
    detail: (d) => [`load line ${(5 * d.F).toFixed(1)} kN, divided ${d.Av.toFixed(1)} / ${d.Bv.toFixed(1)}`,
                    `screen scale 1 unit ≙ ${d.SFD.toFixed(2)} kN (the sheet prints 1 cm ≙ 10 kN)`] },
  { t: 'The arch rays, and the struts',
    d: 'from each division of the load line, a ray parallel to the corresponding top-chord segment. All six land on one vertical line, at the horizontal distance H — and the gaps they leave on that line are the five strut forces',
    detail: (d) => [`H = ${d.H.toFixed(2)} kN`,
                    `struts S = F + H·Δm = ${d.F.toFixed(1)} − ${(d.m[0] - d.m[1]).toFixed(5)}·${d.H.toFixed(2)} = ${d.str[0].toFixed(2)} kN, all five the same`,
                    `top chord ${d.top.slice(0, 3).map((v) => v.toFixed(2)).join(' / ')} kN, mirrored`],
    take: 'all five struts equal, because the given arch drops its slope by the same amount at every node' },
  { t: 'The bottom chord falls out',
    d: 'join the pole to those six points and you have the six tie directions. Draw them from A bay by bay and the last lands exactly on B — not luck, but the moment equation you already used for the reactions',
    detail: (d) => [`depths below deck ${d.yb.slice(1, 6).map((v) => (-v).toFixed(3)).join(' / ')} m, closing on B to ${Math.abs(d.closure).toExponential(1)} m`,
                    `tie ${d.bot.slice(0, 3).map((v) => v.toFixed(2)).join(' / ')} kN tension, mirrored`],
    take: 'the key draws 0.500 / 1.100 / 1.299 m — the same chord' },
  { t: 'Every force',
    d: 'compression blue through the arch and the struts, tension red along the tie. The biggest force sits in the two end segments of the arch, where one member carries the whole reaction and the whole thrust',
    detail: (d) => [`arch ${d.top.map((v) => v.toFixed(1)).join(' · ')} kN compression`,
                    `tie ${d.bot.map((v) => v.toFixed(1)).join(' · ')} kN tension · struts ${d.str[0].toFixed(2)} kN · largest ${d.Nmax.toFixed(2)} kN`] },
  { t: 'a) has no unique answer',
    d: 'move the depth of the tie and it stays a valid answer: the pole slides sideways, every ray turns with it, and the chord still closes on B. The sheet asks for “the” form of the bottom chord — there is a whole family',
    detail: (d) => [`now depth ${d.sag.toFixed(2)} m, H = ${d.H.toFixed(2)} kN, struts ${d.str[0].toFixed(2)} kN · the key drew depth 1.30 m, H = 50.0 kN, struts 6.67 kN`,
                    `at H = ${d.Hflat.toFixed(1)} kN the tie lies flat on the deck and the struts carry nothing`],
    take: '24 joint equations against 20 unknowns: the five tie ordinates absorb four of them and leave one free' },
  { t: 'b) a constant force in the tie',
    d: 'the same force in all six tie members means all six rays the same length — so the points slide onto a circle round the pole. They are no longer on a vertical line, and the segments between them are the struts. The struts tilt',
    detail: (d) => [`tie ${d.C.toFixed(2)} kN throughout · struts ${d.str2.map((v) => v.toFixed(2)).join(' / ')} kN, up to ${d.tilt.toFixed(1)}° off vertical`,
                    `the arch flattens with them: crown ${d.yt2[3].toFixed(3)} m instead of ${YT[3].toFixed(3)} m`],
    take: 'the key’s words: “the struts between the top and bottom chords will tilt, i.e. they will no longer be vertical”' },
];

// ------------------------------------------------------------------- view --

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const fx = (p) => [AX + p[0] * MPU, AY + p[1] * MPU];
  const kx = (p, d) => [KX + p[0] / d.SFD, KY + p[1] / d.SFD];

  const NM = 17;
  const MCOL = (i) => ({
    pending: PAL.black,
    final: (dd, st) => (!dd ? PAL.grey
      : st._k < 6 ? PAL.grey
      : dd.mem[i].N > 0 ? PAL.red : PAL.blue),
  });

  dw.label('t_form', 'form diagram 1:100', { cls: 'title', flash: false });
  dw.label('t_force', 'force diagram 1 cm ≙ 10 kN', { cls: 'title', flash: false });
  dw.label('t_mode', '', { cls: 'point', flash: false });

  // ---- context: the deck line and the two abutments
  dw.dashLine('deck', { intro: 1, color: PAL.grey, dash: dw.W.dash });
  for (const n of ['A', 'B']) {
    dw.disk(`sup${n}`, { intro: 1, r: dw.W.disk });
    dw.strokes(`hat${n}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.label(`lsup${n}`, n, { cls: 'num', intro: 1, color: PAL.green });
    dw.arrow(`re${n}`, { intro: 2, color: PAL.green, ...NARR });
    dw.label(`lre${n}`, '', { cls: 'num', intro: 2, color: PAL.green });
  }
  // ---- the five loads and their axes
  for (let i = 0; i < NS; i++) {
    dw.dashLine(`ax${i}`, { intro: 1, color: PAL.grey, dash: dw.W.dash });
    dw.arrow(`ld${i}`, { intro: 1, color: PAL.green, ...ARR });
    dw.label(`lld${i}`, '', { cls: 'num', intro: 1, color: PAL.green,
      when: (st) => st.lbl });
  }
  // ---- a) kept as a pale overlay once b) is showing
  dw.dashLine('ghTop', { intro: 1, color: PAL.ghost, dash: dw.W.dash, flash: false,
    when: (st, dd) => !!dd && dd.bmode && st.ghostA });
  dw.dashLine('ghBot', { intro: 1, color: PAL.ghost, dash: dw.W.dash, flash: false,
    when: (st, dd) => !!dd && dd.bmode && st.ghostA });
  dw.strokes('ghStr', NS, { intro: 1, w: dw.W.thin, color: PAL.ghost, flash: false,
    when: (st, dd) => !!dd && dd.bmode && st.ghostA });

  // ---- the members: 1-6 top chord, 7-11 struts, 12-17 bottom chord
  const introOf = (i) => (i < NB ? 1 : i < NB + NS ? 5 : 5);
  for (let i = 0; i < NM; i++) {
    dw.seg(`m${i}`, { intro: introOf(i), w: dw.W.bar, color: MCOL(i) });
    dw.label(`lm${i}`, '', { cls: 'num', intro: introOf(i), color: MCOL(i),
      when: (st) => st.lbl });
    dw.seg(`r${i}`, { intro: i < NB ? 4 : 5, w: dw.W.ray, color: MCOL(i) });
    dw.label(`lr${i}`, '', { cls: 'num', intro: i < NB ? 4 : 5, color: MCOL(i),
      when: (st, dd) => st.lbl && !!dd && (i < NB || i >= NB + NS) });
    dw.link(`m${i}`, `r${i}`, `lm${i}`, `lr${i}`);
  }
  for (let i = 0; i <= NS; i++) {
    dw.disk(`nt${i}`, { intro: 1, r: dw.W.disk * 0.8 });
    dw.disk(`nb${i}`, { intro: 5, r: dw.W.disk * 0.8, when: (st, dd) => !!dd && i > 0 });
  }

  // ---- force diagram: load line, reactions, pole, the six P points
  for (let i = 0; i < NS; i++) {
    dw.arrow(`fl${i}`, { intro: 3, color: PAL.green, ...NARR });
  }
  dw.arrow('fRA', { intro: 3, color: PAL.green, ...NARR });
  dw.arrow('fRB', { intro: 3, color: PAL.green, ...NARR });
  dw.label('lfRA', '', { cls: 'num', intro: 3, color: PAL.green });
  dw.label('lfRB', '', { cls: 'num', intro: 3, color: PAL.green });
  dw.label('lfl', '', { cls: 'point', intro: 3, flash: false, color: PAL.green });
  dw.disk('pole', { intro: 3, r: dw.W.disk * 0.8 });
  dw.label('lpole', 'o', { cls: 'num', intro: 3, color: PAL.grey, when: (st) => st.lbl });
  dw.seg('pline', { intro: 4, w: dw.W.dim, color: PAL.grey, flash: false,
    when: (st, dd) => !!dd && !dd.bmode });
  dw.circle('pcirc', { intro: BSTEP, color: PAL.grey, flash: false,
    when: (st, dd) => !!dd && dd.bmode });
  dw.seg('dimH', { intro: 4, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('ldimH', '', { intro: 4, flash: false, color: PAL.grey });
  for (let i = 0; i <= NS; i++) dw.disk(`pp${i}`, { intro: 4, r: dw.W.disk * 0.7 });

  dw.instant('t_form', 't_force', 't_mode');
  dw.ghostable('fl0', 'fl1', 'fl2', 'fl3', 'fl4', 'fRA', 'fRB');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    const solved = s._k >= 6;

    dw.setLabel('t_form', [AX - 1.0, -3.0]);
    dw.setLabel('t_force', [KX - 5.0, KY - 21.0]);
    dw.setLabel('t_mode', [AX + (d.span / 2) * MPU, 19.2]);
    dw.setText('t_mode', d.bmode
      ? 'b) the bottom-chord force made constant — the struts have tilted'
      : `a) the bottom chord found with the force diagram · mid-span depth ${d.sag.toFixed(2)} m · H = ${d.H.toFixed(2)} kN`);

    // --- deck, supports, reactions
    dw.setDashLine('deck', [fx([-0.9, 0]), fx([d.span + 0.9, 0])]);
    for (const [n, i] of [['A', 0], ['B', NB]]) {
      const p = fx([XS[i], 0]);
      dw.setDisk(`sup${n}`, p);
      dw.setStrokes(`hat${n}`, V.hatch([p[0] - 1.7, p[1] - 0.5], [p[0] + 1.7, p[1] - 0.5],
        -1, 0.95, 5));
      dw.setLabel(`lsup${n}`, [p[0] + (n === 'A' ? -2.4 : 2.4), p[1] - 1.0]);
      dw.setArrow(`re${n}`, [p[0], p[1] - 6.6], [p[0], p[1] - 1.2]);
      dw.setLabel(`lre${n}`, [p[0] + (n === 'A' ? -3.4 : 3.4), p[1] - 4.6]);
      dw.setText(`lre${n}`, `${(n === 'A' ? d.Av : d.Bv).toFixed(2)} kN`);
    }
    // --- loads
    for (let i = 0; i < NS; i++) {
      const x = fx([XS[i + 1], 0])[0];
      dw.setArrow(`ld${i}`, [x, LOADY], [x, LOADY - LOADL]);
      dw.setLabel(`lld${i}`, [x - 2.4, LOADY - LOADL / 2]);
      dw.setText(`lld${i}`, `F${'₁₂₃₄₅'[i]}`);
      dw.setDashLine(`ax${i}`, [[x, LOADY - LOADL - 0.6], [x, AY - 9.0]]);
    }
    // --- the a) overlay
    dw.setDashLine('ghTop', XS.map((x, i) => fx([x, YT[i]])));
    dw.setDashLine('ghBot', XS.map((x, i) => fx([x, d.yb[i]])));
    dw.setStrokes('ghStr', Array.from({ length: NS }, (_, i) =>
      [fx([XS[i + 1], YT[i + 1]]), fx([XS[i + 1], d.yb[i + 1]])]));

    // --- members + rays
    const centTop = fx([d.span / 2, 1.2]);
    const centBot = fx([d.span / 2, -0.6]);
    for (let i = 0; i < NM; i++) {
      const M = d.mem[i];
      const a = fx(M.a), b = fx(M.b);
      dw.setSeg(`m${i}`, a, b);
      const c = i < NB ? centTop : i < NB + NS ? V.mid(a, b) : centBot;
      const off = i < NB + NS && i >= NB ? [2.6, 0] : null;
      dw.setLabel(`lm${i}`, off ? V.add(V.mid(a, b), off) : outward(a, b, c, 1.9));
      dw.setText(`lm${i}`, solved ? `${M.no}: ${Math.abs(M.N).toFixed(2)}` : M.no);
      const ra = kx(M.ray[0], d), rb = kx(M.ray[1], d);
      dw.setSeg(`r${i}`, ra, rb);
      // the six tie rays all converge on the pole, so they get labelled near
      // their far end instead of at the midpoint
      const t = i >= NB + NS ? 0.28 : 0.5;
      const lp = V.add(ra, V.mul(V.sub(rb, ra), t));
      dw.setLabel(`lr${i}`, V.add(lp, V.mul(V.perp(V.unit(V.sub(rb, ra))), 1.0)));
      dw.setText(`lr${i}`, M.no);
    }
    for (let i = 0; i <= NS; i++) {
      dw.setDisk(`nt${i}`, fx(d.nodeTop[i]));
      dw.setDisk(`nb${i}`, fx(d.nodeBot[i]));
    }

    // --- force diagram
    for (let i = 0; i < NS; i++) {
      dw.setArrow(`fl${i}`, kx(d.L[i], d), kx(d.L[i + 1] || [0, -NS * d.F], d));
    }
    const top = kx([0, 0], d), bot = kx([0, -NS * d.F], d), po = kx(d.O, d);
    dw.setArrow('fRA', [po[0] + 1.7, po[1]], [top[0] + 1.7, top[1]]);
    dw.setArrow('fRB', [bot[0] + 1.7, bot[1]], [po[0] + 1.7, po[1]]);
    dw.setLabel('lfRA', [top[0] + 4.6, (top[1] + po[1]) / 2]);
    dw.setText('lfRA', `A = ${d.Av.toFixed(1)}`);
    dw.setLabel('lfRB', [top[0] + 4.6, (bot[1] + po[1]) / 2]);
    dw.setText('lfRB', `B = ${d.Bv.toFixed(1)}`);
    dw.setLabel('lfl', [top[0] + 7.0, top[1] + 1.4]);
    dw.setText('lfl', `load line ${(NS * d.F).toFixed(0)} kN`);
    dw.setDisk('pole', po);
    dw.setLabel('lpole', V.add(po, [1.3, -1.3]));
    const p0 = kx(d.pts[0], d), p5 = kx(d.pts[NS], d);
    dw.setSeg('pline', p0, p5);
    dw.setCircle('pcirc', po, d.C / d.SFD);
    const hy = top[1] + 2.2;
    dw.setSeg('dimH', [po[0], hy], [po[0] - d.H / d.SFD, hy]);
    dw.setLabel('ldimH', [po[0] - d.H / d.SFD / 2, hy + 1.3]);
    dw.setText('ldimH', `H = ${d.H.toFixed(2)} kN`);
    for (let i = 0; i <= NS; i++) dw.setDisk(`pp${i}`, kx(d.pts[i], d));

    panel.syncAll();
    player.apply(d, s);
  }

  /** A label position beside the segment a-b, on the side away from `c`. */
  function outward(a, b, c, off) {
    const mid = V.mid(a, b);
    let n = V.perp(V.unit(V.sub(b, a)));
    if (V.dot(n, V.sub(mid, c)) < 0) n = V.mul(n, -1);
    return V.add(mid, V.mul(n, off));
  }

  const player = makePlayer(STEPS, refresh);

  const w = panel.section('The free parameter');
  panel.slider(w, s, 'sag', 'a) mid-span depth of the tie (m)', 0.10, 3.00, 0.05, refresh,
    (v) => `${v.toFixed(2)} m${Math.abs(v - 1.3) < 1e-9 ? ' — the key’s' : ''}`);
  panel.slider(w, s, 'F', 'each load F (kN)', 5, 40, 1, refresh, (v) => `${v.toFixed(0)} kN`);
  const b = panel.section('b) constant force in the tie');
  panel.toggle(b, s, 'constB', 'make the bottom-chord force constant', refresh);
  panel.toggle(b, s, 'ghostA', 'keep a) as a pale overlay', refresh);
  panel.toggle(b, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}
