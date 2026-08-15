/**
 * EX 8 · Task 1 — Frame corner: from arches to frames
 * Structural Design II, FS 23 (sheet EX 8 "Frames", page 1).
 *
 * "Find the global equilibrium in a) to d) with the help of the thrust line.
 * Then draw a possible force flow and complete the force diagrams. If you add
 * the axis of symmetry in the form as well as in the force diagram, it is
 * sufficient to solve only one side for each situation.
 *   a) … d)  G_d = 30 kN
 *   e) Compare situations a) to d). What do you notice?"
 *
 * Digitised from page 1 at the stated 1:100 (1 pt = 0.035278 m). The four
 * situations are drawn one above the other and share their statics exactly:
 *
 *   supports        pin at x = 6.712 and x = 14.710 pt-derived → SPAN 7.998 m
 *   crown hinge     b) 3.996 · c) 3.999 · d) 3.998 m above the supports
 *   load            G_d = 30 kN, vertical, on the crown axis in all four
 *
 * so every one of them is a THREE-HINGED frame of 8.000 m span with its middle
 * hinge 4.000 m up. That is what makes the exercise work: three hinges make the
 * structure statically determinate, and the thrust line of a determinate
 * structure has to pass through every hinge. There is exactly one line through
 * three given points, so:
 *
 *   A_v = B_v = 15.000 kN        (symmetry)
 *   H    = A_v · 4 / 4 = 15.000 kN   (ΣM about the crown hinge, left half)
 *   thrust line = (0,0) – (4,4) – (8,0), at 45°
 *   support reaction = √(15² + 15²) = 21.213 kN
 *
 * IDENTICAL IN ALL FOUR. That is the answer to e), and it is worth saying
 * plainly: the shape of the frame does not enter the global equilibrium at all.
 *
 * What the shape decides is how far the thrust line runs from the material.
 * The four centrelines, from the left support, are
 *
 *   a)  (0,0) – (4,4)                      the funicular itself
 *   b)  (0,0) – (1.043, 3.270) – (4,4)     a polygonal arch
 *   c)  (0,0) – (0, 4) – (4,4)             a portal, members 2.0 m deep
 *   d)  (0,0) – (0, 4) – (4,4)             the same portal, members 1.0 m deep
 *
 * and the bending moment at any section is M = N · e, with e the perpendicular
 * distance from that section to the thrust line. At the frame corner of c) and
 * d) that is 4/√2 = 2.828 m, so M = 60.0 kNm — which is of course just H·h.
 * c) and d) have the SAME centreline and the same moment; what separates them
 * is depth, and therefore whether the thrust line is inside the material at
 * all. The view measures that rather than quoting it: it walks the thrust line
 * and asks the section, at every step, how far away it is. Two numbers come
 * out, and they are not the same thing --
 *
 *   e       the perpendicular distance from the member CENTRELINE to the
 *           thrust line, which is what sets the moment, M = N·e
 *   escape  how far the thrust line runs from the nearest MATERIAL, which is
 *           what you can see
 *
 *   situation      e (m)     M (kNm)    escape (m)
 *   a)             0.000        0.0        0.000
 *   b)             1.575       33.4        0.589
 *   c)             2.828       60.0        0.999
 *   d)             2.828       60.0        1.498
 *
 * Both rise monotonically from the arch to the frame, which is the whole point
 * of the page's title. c) and d) share e and M exactly, and differ only in
 * escape -- the difference depth makes.
 *
 * The sheet prints no answers. Everything above is derived.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

const SPAN = 8.0;                     // m, digitised (7.998)
const RISE = 4.0;                     // m to the crown hinge (3.996–3.999)
const GD = 30;                        // kN, printed on all four situations

const MPU = 1.85;                     // drawing units per metre
const AX = -20.5, AY = -8.5;          // the left support
const SFD = 2.4;                      // kN per drawing unit
const LLX = 15.5, LLY = 6.0;          // top of the load line
const SYM = 2.8;

// The four situations. `out` and `inn` are the outer and inner faces of the
// LEFT HALF, in metres from the left support; the right half is the mirror.
// `axis` is the member centreline. All digitised from page 1.
const SIT = [
  {
    tag: 'a)', name: 'the funicular itself',
    axis: [[0, 0], [4, 4]],
    out: null, inn: null,
    note: 'no shape is drawn: whatever line you choose IS the structure',
  },
  {
    tag: 'b)', name: 'a polygonal arch',
    axis: [[0, 0], [1.043, 3.270], [3.955, 4.0]],
    out: [[-1.070, 0], [0.420, 3.922], [3.499, 4.926], [3.955, 4.0]],
    inn: [[0.777, 0], [1.666, 2.618], [3.636, 3.145], [3.955, 4.0]],
    note: 'tapered legs, and the section narrows to nothing at the crown hinge',
  },
  {
    tag: 'c)', name: 'a portal with 2 m members',
    axis: [[0, 0], [0, 4.0], [3.955, 4.0]],
    out: [[-1.0, 0], [-1.0, 4.999], [3.499, 4.999], [3.955, 4.0]],
    inn: [[1.0, 0], [1.0, 2.999], [3.499, 2.999], [3.955, 4.0]],
    note: 'the same centreline as d), with twice the depth to contain the thrust',
  },
  {
    tag: 'd)', name: 'a portal with 1 m members',
    axis: [[0, 0], [0, 4.0], [3.955, 4.0]],
    out: [[-0.5, 0], [-0.5, 4.498], [3.499, 4.498], [3.955, 4.0]],
    inn: [[0.5, 0], [0.5, 3.498], [3.499, 3.498], [3.955, 4.0]],
    note: 'a real frame: the thrust line is nowhere near the material at the corner',
  },
];

const DEFAULTS = {
  sit: 3,                             // start on d), the one that surprises
  Gd: GD,
  thrust: true,                       // show the thrust line
  ecc: true,                          // show how far it leaves the material
  o1: true, sIF: 0.02,
  lbl: true, _k: 99,
};

const SHAPED = 4;
const NOUT = 12;                      // polygon slots (left half, out + inn)

/** Bring a ring up to exactly n vertices WITHOUT repeating any of them.
 *  The fill is ear-clipped, and ear clipping on a run of coincident points
 *  produces a triangulation that spills outside the shape -- which turned the
 *  L of a portal frame into a solid block. Splitting the longest edge instead
 *  keeps every vertex distinct and the outline identical. */
function padRing(ring, n) {
  const r = ring.map((p) => [...p]);
  while (r.length < n) {
    let bi = 0, bl = -1;
    for (let i = 0; i < r.length; i++) {
      const j = (i + 1) % r.length;
      const L = Math.hypot(r[j][0] - r[i][0], r[j][1] - r[i][1]);
      if (L > bl) { bl = L; bi = i; }
    }
    const j = (bi + 1) % r.length;
    r.splice(bi + 1, 0, [(r[bi][0] + r[j][0]) / 2, (r[bi][1] + r[j][1]) / 2]);
  }
  return r.slice(0, n);
}

export const meta = {
  title: 'EX 8.1 — four frames, one equilibrium',
  subtitle: 'Structural Design II · sheet EX 8 “Frames”, task 1 a)–e)',
  about: 'Four shapes, from a bare funicular triangle to a slender portal, each spanning eight metres with a hinge at both feet and one at the crown, each carrying the same 30 kN. Three hinges make a structure determinate, and the thrust line of a determinate structure must pass through every hinge — so all four have the SAME thrust line, the same reactions and the same force diagram. Step through them with the slider and watch the force diagram not move. What changes is how far the thrust line strays from the material, which is exactly the bending the frame corner has to carry.',
  result: (d) => [
    `${d.tag} A = B = ${d.N.toFixed(3)} kN at 45° — vertical ${d.Av.toFixed(1)} kN, horizontal H = ${d.H.toFixed(1)} kN`,
    `the thrust line runs through all three hinges: (0,0) — (${(SPAN / 2).toFixed(0)}, ${RISE.toFixed(0)}) — (${SPAN.toFixed(0)}, 0), the same line in all four situations`,
    d.eMax < 1e-6
      ? 'the centreline IS the thrust line, so there is no bending anywhere: pure compression of 21.213 kN'
      : `worst eccentricity of the centreline ${d.eMax.toFixed(3)} m → M = ${d.Mmax.toFixed(1)} kNm at ${d.eWhere}`,
    d.out === null
      ? 'no section is drawn, so nothing constrains where the line may go'
      : d.escape < 1e-6
        ? 'and the thrust line stays inside the section everywhere'
        : `the thrust line leaves the material, at worst by ${d.escape.toFixed(3)} m`],
  frame: [[-27, -19], [25, 17]],
};

const STEPS = [
  { t: 'The exercise', d: 'EX 8 task 1: four frames of the same span carrying the same load, and one question at the end — what do they have in common?' },
  { t: 'What is given', d: 'left: eight metres between two pinned feet, a hinge at the crown, and 30 kN coming down on the crown axis. Change the shape with the “situation” slider — a) is not drawn at all, because in a) the shape is yours to choose',
    detail: (d, st) => [`${d.tag} ${d.name} · span ${SPAN.toFixed(3)} m · crown hinge ${RISE.toFixed(3)} m up · G_d = ${st.Gd} kN`,
                        d.note] },
  { t: 'Three hinges', d: 'a hinge cannot carry moment, so at each of the three the thrust line has to pass exactly through the pin. Three hinges give three conditions, which is precisely what makes the frame statically determinate — and there is only one straight-sided line through three given points',
    detail: () => ['two pins + one crown hinge → 4 reaction components − 1 released moment = 3 = the three equations of statics',
                   'so the answer does not depend on stiffness, on material, or on the shape'],
    take: 'the hinges, not the shape, decide the forces' },
  { t: 'Global equilibrium', d: 'the load sits on the axis of symmetry, so the two feet share it equally. Then take the left half alone and turn it about the crown hinge: the only two forces with a lever arm are the vertical reaction and the thrust, and they balance',
    detail: (d) => [`ΣV: A_v = B_v = ${d.Av.toFixed(1)} kN`,
                    `ΣM about the crown, left half: ${d.Av.toFixed(1)} × ${(SPAN / 2).toFixed(0)} − H × ${RISE.toFixed(0)} = 0 → H = ${d.H.toFixed(1)} kN`,
                    `reaction = √(${d.H.toFixed(1)}² + ${d.Av.toFixed(1)}²) = ${d.N.toFixed(3)} kN`] },
  { t: 'The force diagram', d: 'right: the load laid off as one vertical line, and the pole placed on the horizontal through its midpoint — the midpoint because the two reactions are equal. How far the pole stands from the load line IS the thrust',
    detail: (d) => [`load line ${d.tot.toFixed(0)} kN · pole ${(d.H / SFD).toFixed(2)} units = ${d.H.toFixed(1)} kN away`,
                    'the two rays come out at 45°, which is the slope of the thrust line'] },
  { t: 'The thrust line', d: 'left: from the left pin, up at the ray’s angle, through the crown hinge, and down to the right pin. It is the same line in every one of the four situations — slide through them and watch it not move',
    detail: (d) => [`(0, 0) → (${(SPAN / 2).toFixed(0)}, ${RISE.toFixed(0)}) → (${SPAN.toFixed(0)}, 0) · 45° throughout`,
                    `the force along it is ${d.N.toFixed(3)} kN, compression`],
    take: 'the thrust line belongs to the loads and the hinges — not to the frame' },
  { t: 'Where the shape comes in', d: 'now compare the thrust line with the material. Wherever the two coincide the section carries pure compression; wherever they part, the section is bent, by exactly M = N × e with e the distance between them',
    detail: (d) => (d.out === null
      ? ['a) the shape is free, so put it ON the thrust line and there is no bending at all',
         'that is what an arch is: a shape chosen to match its thrust line']
      : [`worst eccentricity of the centreline: ${d.eMax.toFixed(3)} m at ${d.eWhere}`,
         `→ M = ${d.N.toFixed(2)} × ${d.eMax.toFixed(3)} = ${d.Mmax.toFixed(1)} kNm`,
         d.escape < 1e-6 ? 'and the line still lies inside the section'
                         : `the line leaves the section by up to ${d.escape.toFixed(3)} m — drawn in red`]),
    take: 'M = N × e. That one product is the whole difference between an arch and a frame' },
  { t: 'e) What you notice', d: 'the reactions, the thrust and the force diagram are identical in all four. Only the bending changes — nothing in a), a little in b), a great deal in the two portals. An arch carries its load by being the right shape; a frame carries it by being stiff enough to bend',
    detail: () => ['a) M = 0.0 kNm, and the line never leaves the material',
                   'b) M = 33.4 kNm at the knee · 0.59 m outside',
                   'c) M = 60.0 kNm at the corner · 1.00 m outside',
                   'd) M = 60.0 kNm at the corner · 1.50 m outside',
                   'c) and d) share a centreline, so they share the moment exactly — depth changes only how far outside the material the thrust line ends up, and therefore the stress'],
    take: 'the frame corner is where an arch’s geometry has been given up and a moment has to be paid for it' },
];

// ---------------------------------------------------------------- statics --

const mirror = (p) => [SPAN - p[0], p[1]];

/** perpendicular distance from p to the thrust line, which is two 45° legs */
function eccOf(p) {
  const x = p[0] <= SPAN / 2 ? p[0] : SPAN - p[0];
  const k = RISE / (SPAN / 2);                 // the legs' slope, 1.0 here
  // leg through the origin with slope k: k·x − y = 0
  return Math.abs(k * x - p[1]) / Math.hypot(k, 1);
}

/** signed distance from p to a polyline, and whether p is inside a polygon */
function distToPoly(p, poly) {
  let best = Infinity;
  for (let i = 0; i < poly.length - 1; i++) {
    const a = poly[i], b = poly[i + 1];
    const ab = V.sub(b, a), ap = V.sub(p, a);
    const L2 = ab[0] ** 2 + ab[1] ** 2 || 1e-12;
    const t = Math.max(0, Math.min(1, (ap[0] * ab[0] + ap[1] * ab[1]) / L2));
    best = Math.min(best, V.len(V.sub(p, V.add(a, V.mul(ab, t)))));
  }
  return best;
}

function inside(p, poly) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > p[1]) !== (yj > p[1])
        && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

function compute(s) {
  const S = SIT[Math.round(s.sit)];
  const tot = s.Gd;
  const Av = tot / 2;
  const H = (Av * (SPAN / 2)) / RISE;
  const N = Math.hypot(H, Av);

  // worst eccentricity of the member centreline, sampled along it
  let eMax = 0, eWhere = 'the crown';
  const names = S.axis.length === 2 ? ['the foot', 'the crown']
    : S.axis.length === 3 ? ['the foot', S.tag === 'b)' ? 'the knee' : 'the corner', 'the crown']
      : S.axis.map(() => 'a vertex');
  S.axis.forEach((p, i) => {
    const e = eccOf(p);
    if (e > eMax) { eMax = e; eWhere = names[i] ?? 'a vertex'; }
  });

  // and how far the thrust line escapes the material, measured rather than
  // quoted: walk the left half of the line and ask the section where it is
  let escape = 0, escAt = null;
  if (S.out) {
    const ring = [...S.out, ...[...S.inn].reverse(), S.out[0]];
    for (let i = 0; i <= 120; i++) {
      const x = (SPAN / 2) * (i / 120);
      const p = [x, (RISE / (SPAN / 2)) * x];
      if (inside(p, ring)) continue;
      const dd = distToPoly(p, ring);
      if (dd > escape) { escape = dd; escAt = p; }
    }
  }

  const T = [LLX, LLY];
  const Bo = [LLX, LLY - tot / SFD];
  // pole to the LEFT of the load line: that is the side on which the rays come
  // out parallel to the thrust line rather than mirrored (see ex4_1)
  const o = [LLX - H / SFD, LLY - Av / SFD];
  return { ...S, tot, Av, H, N, eMax, eWhere, escape, escAt,
           Mmax: N * eMax, T, Bo, o };
}

// ------------------------------------------------------------------ view --

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  s.sIF = dw.bandScale(compute(s).N);
  const ARR = dw.W.arrow, NARR = dw.W.narrow;

  const ux = (p) => [AX + p[0] * MPU, AY + p[1] * MPU];

  dw.label('form_title', 'Lageplan 1:100 — form diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Kräfteplan — force diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });

  // the material: two mirrored polygons, drawn pale with a black outline
  for (const side of ['L', 'R']) {
    dw.poly(`mat${side}`, NOUT, { intro: 1, color: PAL.grey, opacity: 0.10,
      flash: false, z: -0.2, when: (st, dd) => !!dd && !!dd.out });
    dw.strokes(`edge${side}`, NOUT, { intro: 1, w: dw.W.str, color: PAL.black,
      when: (st, dd) => !!dd && !!dd.out });
    // the member centreline, so the eccentricity has something to be measured from
    dw.strokes(`axis${side}`, 4, { intro: 1, w: dw.W.dim, color: PAL.grey,
      flash: false, when: (st, dd) => !!dd && !!dd.out });
  }

  for (const n of ['A', 'B']) {
    dw.disk(`sup${n}`, { intro: 1, r: dw.W.disk });
    dw.label(`lsup${n}`, n, { cls: 'num', intro: 1, when: (st) => st.lbl });
    dw.strokes(`hat${n}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  }
  dw.disk('hinge', { intro: 1, r: dw.W.disk });
  dw.label('lhinge', 'crown hinge', { cls: 'point', intro: 1, flash: false,
    when: (st) => st.lbl });
  dw.dashLine('sym', { intro: 1, color: PAL.grey, dash: dw.W.dash });

  dw.arrow('load', { intro: 1, color: PAL.green, ...ARR });
  dw.label('lload', '', { cls: 'num', intro: 1, color: PAL.green });
  dw.dashLine('la', { intro: 1, color: PAL.grey, dash: dw.W.dash });

  // the force diagram
  dw.arrow('ffL', { intro: 2, color: PAL.green, ...ARR });
  dw.label('lffL', '', { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.lbl });
  dw.link('load', 'ffL', 'lload', 'lffL');
  dw.disk('ptO', { intro: 3, r: dw.W.disk * 0.8 });
  dw.label('lO', 'o', { cls: 'num', intro: 3, when: (st) => st.lbl });
  dw.seg('dimH', { intro: 3, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lH', '', { intro: 3, flash: false, color: PAL.grey });

  const THR = { pending: PAL.black, final: () => PAL.blue };
  dw.seg('ray1', { intro: 3, w: dw.W.bar, color: THR });
  dw.seg('ray2', { intro: 3, w: dw.W.bar, color: THR });
  dw.poly('bandL', 4, { intro: SHAPED, opacity: 1.0, z: -0.18, flash: false,
    color: { pending: PAL.zeroBand, final: () => PAL.blueBand },
    when: (st) => st.o1 && st.thrust });
  dw.poly('bandR', 4, { intro: SHAPED, opacity: 1.0, z: -0.18, flash: false,
    color: { pending: PAL.zeroBand, final: () => PAL.blueBand },
    when: (st) => st.o1 && st.thrust });
  dw.seg('thr1', { intro: SHAPED, w: dw.W.bar, color: THR, when: (st) => st.thrust });
  dw.seg('thr2', { intro: SHAPED, w: dw.W.bar, color: THR, when: (st) => st.thrust });
  dw.label('lthr', '', { cls: 'num', intro: SHAPED, color: THR, when: (st) => st.lbl });

  // the eccentricity: where the thrust line has walked out of the material
  dw.seg('esc', { intro: 6, w: dw.W.bar, color: PAL.red, flash: false,
    when: (st, dd) => !!dd && st.ecc && dd.escape > 1e-6 });
  dw.label('lesc', '', { cls: 'num', intro: 6, color: PAL.red, flash: false,
    when: (st, dd) => !!dd && st.ecc && dd.escape > 1e-6 });
  dw.seg('eax', { intro: 6, w: dw.W.dim, color: PAL.red, flash: false,
    when: (st, dd) => !!dd && st.ecc && dd.eMax > 1e-6 });
  dw.label('leax', '', { cls: 'num', intro: 6, color: PAL.red, flash: false,
    when: (st, dd) => !!dd && st.ecc && dd.eMax > 1e-6 });

  for (const n of ['A', 'B']) {
    dw.arrow(`re${n}`, { intro: 5, color: PAL.green, ...NARR });
    dw.arrow(`fre${n}`, { intro: 5, color: PAL.green, ...NARR });
    dw.label(`lre${n}`, '', { cls: 'num', intro: 5, color: PAL.green });
    dw.link(`re${n}`, `fre${n}`, `lre${n}`);
  }
  dw.link('thr1', 'ray1', 'lthr');
  dw.link('thr2', 'ray2');

  dw.instant('form_title', 'force_title', 'force_sub');
  dw.ghostable('ffL', 'ray1', 'ray2', 'freA', 'freB');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    dw.setLabel('form_title', [AX + (SPAN / 2) * MPU, -11.0]);
    dw.setText('form_title', `${d.tag} ${d.name} — Lageplan 1:100`);
    dw.setLabel('force_title', [LLX - 3, -11.0]);
    dw.setLabel('force_sub', [LLX - 3, -12.4]);
    dw.setText('force_sub', `to scale · 1 unit ≙ ${SFD} kN  (sheet: 1 cm ≙ 10 kN)`);

    const A = ux([0, 0]), B = ux([SPAN, 0]), C = ux([SPAN / 2, RISE]);
    dw.setDisk('supA', A); dw.setDisk('supB', B); dw.setDisk('hinge', C);
    dw.setLabel('lsupA', V.add(A, [-1.8, -1.0]));
    dw.setLabel('lsupB', V.add(B, [1.8, -1.0]));
    dw.setLabel('lhinge', V.add(C, [0, 2.0]));
    for (const [n, p] of [['A', A], ['B', B]]) {
      dw.setStrokes(`hat${n}`, V.hatch([p[0] - 1.9, p[1] - 0.5],
        [p[0] + 1.9, p[1] - 0.5], -1, 1.0, 5));
    }
    dw.setDashLine('sym', [[C[0], AY - 3.0], [C[0], C[1] + 6.4]]);

    // the material, left half and its mirror
    for (const [side, mir] of [['L', false], ['R', true]]) {
      if (!d.out) {
        dw.setPoly(`mat${side}`, Array(NOUT).fill(A));
        dw.setStrokes(`edge${side}`, Array(NOUT).fill([A, A]));
        dw.setStrokes(`axis${side}`, Array(4).fill([A, A]));
        continue;
      }
      const m = (p) => ux(mir ? mirror(p) : p);
      const ring = [...d.out.map(m), ...[...d.inn].reverse().map(m)];
      dw.setPoly(`mat${side}`, padRing(ring, NOUT));
      const closed = [...ring, ring[0]];
      const ed = [];
      for (let i = 0; i < closed.length - 1; i++) ed.push([closed[i], closed[i + 1]]);
      while (ed.length < NOUT) ed.push([A, A]);
      dw.setStrokes(`edge${side}`, ed.slice(0, NOUT));
      const ax = [];
      for (let i = 0; i < d.axis.length - 1; i++) ax.push([m(d.axis[i]), m(d.axis[i + 1])]);
      while (ax.length < 4) ax.push([A, A]);
      dw.setStrokes(`axis${side}`, ax.slice(0, 4));
    }

    // the load, on the crown axis
    const tip = [C[0], C[1] + 1.0];
    dw.setArrow('load', [C[0], tip[1] + SYM], tip);
    dw.setLabel('lload', [C[0] + 3.4, tip[1] + SYM * 0.6]);
    dw.setText('lload', `G_d = ${d.tot} kN`);
    dw.setDashLine('la', [[C[0], tip[1] + SYM + 0.6], [C[0], AY - 2.6]]);

    // force diagram
    dw.setArrow('ffL', d.T, d.Bo);
    dw.setLabel('lffL', V.add(V.mid(d.T, d.Bo), [2.4, 0]));
    dw.setText('lffL', `G_d = ${d.tot}`);
    dw.setDisk('ptO', d.o);
    dw.setLabel('lO', V.add(d.o, [-1.4, 0.8]));
    dw.setSeg('dimH', [LLX, d.T[1] + 1.7], [d.o[0], d.T[1] + 1.7]);
    dw.setLabel('lH', [(LLX + d.o[0]) / 2, d.T[1] + 2.8]);
    dw.setText('lH', `H = ${d.H.toFixed(1)} kN`);
    dw.setSeg('ray1', d.o, d.T);
    dw.setSeg('ray2', d.Bo, d.o);

    // the thrust line, the same in every situation
    dw.setSeg('thr1', A, C);
    dw.setSeg('thr2', C, B);
    dw.setPoly('bandL', V.rectPoints(A, C, s.sIF * d.N));
    dw.setPoly('bandR', V.rectPoints(C, B, s.sIF * d.N));
    dw.setLabel('lthr', V.add(V.mid(A, C), [-3.6, -1.6]));
    dw.setText('lthr', `${d.N.toFixed(2)} kN`);

    // the eccentricity, where there is one
    if (d.eMax > 1e-6) {
      const worst = d.axis.reduce((b, p) => (eccOf(p) > eccOf(b) ? p : b), d.axis[0]);
      const k = RISE / (SPAN / 2);
      const t = (worst[0] + k * worst[1]) / (1 + k * k);      // foot on the leg
      const foot = [t, k * t];
      dw.setSeg('eax', ux(worst), ux(foot));
      dw.setLabel('leax', V.add(V.mid(ux(worst), ux(foot)), [-3.4, 0.9]));
      dw.setText('leax', `e = ${d.eMax.toFixed(2)} m`);
    }
    if (d.escape > 1e-6 && d.escAt) {
      const ring = [...d.out, ...[...d.inn].reverse(), d.out[0]];
      // draw from the escaping point to the nearest bit of material
      let best = null, bd = Infinity;
      for (let i = 0; i < ring.length - 1; i++) {
        const a = ring[i], b = ring[i + 1];
        const ab = V.sub(b, a), ap = V.sub(d.escAt, a);
        const L2 = ab[0] ** 2 + ab[1] ** 2 || 1e-12;
        const tt = Math.max(0, Math.min(1, (ap[0] * ab[0] + ap[1] * ab[1]) / L2));
        const q = V.add(a, V.mul(ab, tt));
        const dd = V.len(V.sub(d.escAt, q));
        if (dd < bd) { bd = dd; best = q; }
      }
      dw.setSeg('esc', ux(d.escAt), ux(best));
      dw.setLabel('lesc', V.add(V.mid(ux(d.escAt), ux(best)), [3.8, -1.1]));
      dw.setText('lesc', `${d.escape.toFixed(2)} m outside`);
    }

    // reactions: along the thrust line, pushing into the feet
    const uA = V.unit(V.sub(C, A)), uB = V.unit(V.sub(C, B));
    dw.setArrow('reA', V.sub(A, V.mul(uA, SYM)), V.sub(A, V.mul(uA, 1.0)));
    dw.setArrow('reB', V.sub(B, V.mul(uB, SYM)), V.sub(B, V.mul(uB, 1.0)));
    dw.setLabel('lreA', V.add(V.sub(A, V.mul(uA, SYM)), [-3.0, 0.4]));
    dw.setLabel('lreB', V.add(V.sub(B, V.mul(uB, SYM)), [3.0, 0.4]));
    dw.setText('lreA', `A = ${d.N.toFixed(1)}`);
    dw.setText('lreB', `B = ${d.N.toFixed(1)}`);
    dw.setArrow('freA', d.o, d.T);
    dw.setArrow('freB', d.Bo, d.o);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const cas = panel.section('The situation');
  panel.slider(cas, s, 'sit', 'situation', 0, 3, 1, refresh,
    (v) => `${SIT[Math.round(v)].tag} ${SIT[Math.round(v)].name}`);
  panel.toggle(cas, s, 'thrust', 'show the thrust line', refresh);
  panel.toggle(cas, s, 'ecc', 'show the eccentricity', refresh);
  panel.toggle(cas, s, 'lbl', 'show labels', refresh);
  const giv = panel.section('Given');
  panel.slider(giv, s, 'Gd', 'G_d (kN)', 10, 60, 5, refresh);
  panel.toggle(giv, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);

  refresh();
  return player;
}
