/**
 * EX X · German task 8.1 — three "different support conditions" that are all
 * drawn the same
 * Structural Design II, FS 23, "Additional Exercises", sheet page 6 (top).
 *
 * NUMBERING. The English sheet calls this block "Task 3"; the German sheet
 * calls it Aufgabe 8.1, and the German numbering is the correct one.
 *
 * TEXT (verbatim). "Three identical reinforced concrete frames with different
 * support conditions are given. Draw the possible inner force distribution for
 * each case. Indicate tension forces with red and compression forces with
 * blue."
 *
 * GIVENS. Nothing numeric at all, and — uniquely on this sheet — NO SCALE is
 * printed for this block (error E17). Every number below is therefore either a
 * proportion or a multiple of the unnamed load F.
 *
 * GEOMETRY, digitised. Origin = the bottom-left OUTER corner, y up. All three
 * frames are the same drawing to within 0.023 m, so "identical" is confirmed
 * numerically.
 *   outer outline  (0,0) (0,3.2027) (6.0070,3.2027) (6.0070,0) (5.2855,0)
 *                  (5.2855,2.4529) (0.7216,2.4529) (0.7216,0) (0,0)
 *   overall        6.0070 wide × 3.2027 high · legs 0.7216 wide
 *   beam depth     0.7498, soffit at y = 2.4529 · clear opening 4.5639 × 2.4529
 *   supports       apexes at x = 0.3608 and x = 5.6462 (the leg centrelines)
 *   load           vertical, down, at x = 3.0036 = exact midspan
 *
 * THE MOST CONFUSING THING ABOUT THIS TASK, said out loud: **all six support
 * symbols are drawn identically as hatched triangles, i.e. pinned.** The
 * "different support conditions" of the title exist ONLY in the drawn reaction
 * arrows and their dash-dot lines of action. Nothing in the symbols
 * distinguishes a), b) and c).
 *
 * THE THREE DRAWN CASES.
 *   a)  reactions vertical, 90.00° — the two lines never meet
 *   b)  47.11° and 47.12°, meeting at (2.9922, 2.8363) — inside the beam, at
 *       its mid-depth on the midspan axis
 *   c)  62.37° both sides, meeting at (3.0036, 5.0461) — 1.84 m ABOVE the top
 *       of the frame, which is why c)'s load arrow is drawn high
 * Independent check: the ray from (0.3594, 0) to (2.9922, 2.8361) computes to
 * 47.13° against the 47.11° drawn, and from (0.3608, 0) to (3.0036, 5.0461)
 * to 62.36° against 62.37°. Both dash-dot systems are therefore genuine
 * three-force concurrency constructions, drawn to better than 0.02°.
 *
 * WHAT IS ACTUALLY DETERMINABLE, and it is more than the sheet lets on. Three
 * forces in equilibrium are concurrent, so with the load vertical at midspan
 * and the two reactions symmetric at θ above the horizontal:
 *   half span a          = 5.6462 − 3.0036 = 2.6426 m
 *   concurrency height h = a · tanθ
 *   vertical             V = F / 2
 *   horizontal thrust    H = F / (2 tanθ)
 *   reaction             |A| = |B| = F / (2 sinθ)
 * and, taking the left half about the beam axis (y_b = 2.8278 m),
 *   midspan moment       M = F · (a/2 − y_b / (2 tanθ))
 * which is 1.3213 F at θ = 90° and passes through ZERO at
 *   tanθ = y_b / a = 1.0700  →  θ = 46.94°.
 * That is the whole story of the page in one line. b)'s drawn 47.11° is within
 * 0.17° of it, so in b) the frame's beam is very nearly not bending at all —
 * the thrust line runs along its axis and the frame works as an arch. In a)
 * there is no thrust, so the beam carries the full 1.3213 F and works as a
 * strut-and-tie couple over its own depth. In c) the reactions are steeper,
 * the thrust is smaller and the beam is back to carrying most of the moment.
 *
 * The internal lever arm used for the chord force is z = 0.5998 m, the
 * distance between the two chords drawn here (75 mm of cover top and bottom of
 * the 0.7498 m beam).
 *
 * WHERE THE THRUST LINE LEAVES THE MATERIAL. The legs are only 0.7216 m wide.
 * A reaction inclined at θ leaves the leg's inner face at a height of
 * 0.3608 · tanθ — 0.39 m in b) and 0.69 m in c) — after which the straight
 * thrust line is in the opening, not in the concrete. So neither b) nor c) can
 * be built as a plain two-strut arch: the corner has to redirect, exactly as
 * on sheet EX 8. The view measures that escape height rather than hiding it.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

const OUT = [[0, 0], [0, 3.2027], [6.0070, 3.2027], [6.0070, 0], [5.2855, 0],
             [5.2855, 2.4529], [0.7216, 2.4529], [0.7216, 0]];
const XL = 0.3608, XR = 5.6462, XM = 3.0036;      // support and load lines
const SOF = 2.4529, TOP = 3.2027;                 // beam soffit and top
const AHALF = XR - XM;                            // 2.6426 m
const YB = (SOF + TOP) / 2;                       // beam axis, 2.8278 m
const COVER = 0.075;
const ZLEV = [SOF + COVER, TOP - COVER];          // the two chord levels
const Z = ZLEV[1] - ZLEV[0];                      // 0.5998 m internal lever arm
const LEGW = 0.7216;

const CASES = [
  { tag: 'a)', th: 90.00, name: 'vertical reactions' },
  { tag: 'b)', th: 47.115, name: 'shallow inclined reactions' },
  { tag: 'c)', th: 62.370, name: 'steep inclined reactions' },
];
const TH0 = (Math.atan2(YB, AHALF) * 180) / Math.PI;   // M = 0 at 46.94°

const MPU = 4.0, ORG = [-26, -14];
const SFD = 10;                    // drawing units per unit of F in the triangle
const ux = (p) => [ORG[0] + p[0] * MPU, ORG[1] + p[1] * MPU];
const CLAMP_Y = 5.05;              // above this the concurrency point is off-frame

function compute(s) {
  const th = (s.th * Math.PI) / 180;
  const t = Math.tan(th);
  const h = t > 1e6 ? Infinity : AHALF * t;        // concurrency height
  const H = 0.5 / (t || 1e-9);                     // × F
  const A = 0.5 / Math.sin(th);                    // × F
  const M = AHALF / 2 - YB / (2 * (t || 1e-9));    // × F, midspan, sagging +
  const chord = Math.abs(M) / Z;                   // × F
  const esc = XL * t;                              // where the ray leaves the leg
  const where = !isFinite(h) || h > TOP ? 'above the frame'
    : h >= SOF ? 'inside the beam'
    : 'below the beam soffit — in the opening';
  const nearest = CASES.reduce((b, c) =>
    (Math.abs(c.th - s.th) < Math.abs(b.th - s.th) ? c : b), CASES[0]);
  return { th: s.th, h, H, A, M, chord, esc, where, nearest,
           sag: M >= 0, fits: esc <= LEGW - XL + 1e-9 };
}

const STEPS = [
  { t: 'The exercise', d: 'page 6 of the sheet: three identical reinforced-concrete frames, each with one vertical load at midspan, and — the title says — three different support conditions. Draw the inner force distribution for each' },
  { t: 'The frame', d: 'left: the frame, digitised from the drawing. This is the one block on the whole sheet with NO printed scale, so read the metres as proportions. The legs are 0.72 m wide, the beam 0.75 m deep, the opening 4.56 by 2.45 m',
    detail: () => [`overall ${6.007} × ${TOP} m · supports at x = ${XL} and ${XR} m`,
                   `load at x = ${XM} m — exact midspan · half span a = ${AHALF.toFixed(4)} m`,
                   'the sheet prints no load magnitude either: everything below is a multiple of F'],
    take: 'all six support symbols on the page are the same hatched triangle — a pin. The “different support conditions” of the title exist only in the reaction ARROWS' },
  { t: 'Three forces must be concurrent', d: 'that is the whole tool. The load is vertical at midspan and the two reactions are symmetric, so their lines of action all meet on the midspan axis, at a height fixed by nothing but their inclination',
    detail: (d) => [`h = a · tanθ = ${AHALF.toFixed(4)} × tan ${d.th.toFixed(2)}° = ${isFinite(d.h) ? d.h.toFixed(4) + ' m' : '∞ — parallel, they never meet'}`,
                    `V = F/2 each · H = F / (2 tanθ) = ${d.H.toFixed(4)} F · |A| = |B| = ${d.A.toFixed(4)} F`,
                    `the concurrency point is ${d.where}`],
    take: 'move the inclination slider and watch the point run up the midspan axis. Everything else on this page follows from where it lands' },
  { t: 'Where the load actually goes', d: 'the thrust line runs straight from each support to that point — and it does not stay in the concrete. The legs are only 0.72 m wide, so an inclined line leaves the inner face almost immediately and spends the rest of its length in the opening',
    detail: (d) => [d.th >= 89.9
      ? 'at 90° the thrust line is vertical and stays inside the leg for its whole height'
      : `the ray leaves the leg’s inner face ${d.esc.toFixed(3)} m above the base (the leg is ${LEGW} m wide)`,
      'so the corner has to redirect the force around itself, exactly as on sheet EX 8',
      'the grey dash-dot lines are the thrust line as drawn; the coloured members are a path that fits'],
    take: 'a thrust line outside the material is not a solution, it is a diagnosis' },
  { t: 'The internal force flow', d: 'the path that does fit: the legs work as columns, and inside the beam a strut fans from the load down to each leg head with a chord closing it. Which chord is the tie depends on the sign of the midspan moment — pink pulls, navy pushes',
    detail: (d) => [`M at midspan = F (a/2 − y_b / (2 tanθ)) = ${d.M.toFixed(4)} F  (${d.sag ? 'sagging' : 'hogging'})`,
                    `chord force = |M| / z = ${Math.abs(d.M).toFixed(4)} / ${Z.toFixed(4)} = ${d.chord.toFixed(3)} F`,
                    `legs: ${(0.5).toFixed(2)} F vertical compression each, plus the ${d.H.toFixed(4)} F thrust`],
    take: (d) => (Math.abs(d.M) < 0.05
      ? 'right here the beam is barely bending at all: the thrust line is running along its own axis and the frame has become an arch'
      : '') },
  { t: 'The number that ties the page together', d: 'the midspan moment is zero when tanθ = y_b / a, that is at 46.94°. The sheet’s case b) is drawn at 47.11°, seventeen hundredths of a degree away. a) at 90° gives the beam the whole moment; c) at 62.37° gives it back most of it',
    detail: (d) => [`a) θ = 90.00° → H = 0, M = ${(AHALF / 2).toFixed(4)} F, chord ${(AHALF / 2 / Z).toFixed(3)} F — the beam does all of it`,
                    `b) θ = 47.115° → H = ${(0.5 / Math.tan((47.115 * Math.PI) / 180)).toFixed(4)} F, M = ${(AHALF / 2 - YB / (2 * Math.tan((47.115 * Math.PI) / 180))).toFixed(4)} F — essentially nothing`,
                    `c) θ = 62.370° → H = ${(0.5 / Math.tan((62.37 * Math.PI) / 180)).toFixed(4)} F, M = ${(AHALF / 2 - YB / (2 * Math.tan((62.37 * Math.PI) / 180))).toFixed(4)} F — most of it back`],
    take: 'the sheet never says any of this, because it never prints a number. It is all in the angles it drew' },
];

export const meta = {
  title: 'EX X · 8.1 — three frames, one drawing, three different answers',
  subtitle: 'Structural Design II · sheet EX X “Additional Exercises”, page 6 (German task 8.1; the English sheet calls it “Task 3”)',
  about: 'Three reinforced-concrete frames that are the same drawing three times, with one vertical load at midspan each. The title promises different support conditions; the drawings deliver six identical pinned triangles, and the only thing that actually differs is the inclination of the drawn reaction arrows. That inclination is enough. Three forces in equilibrium must be concurrent, so it fixes the height at which the thrust line crosses midspan — and that height decides whether the beam is bending hard, hardly bending at all, or bending the other way. The block carries no scale and no load magnitude, so every answer here is a multiple of F.',
  result: (d) => [
    `θ = ${d.th.toFixed(2)}° → concurrency at h = a·tanθ = ${isFinite(d.h) ? d.h.toFixed(4) + ' m' : '∞ (the reaction lines are parallel)'}, ${d.where}`,
    `V = 0.5000 F each · H = ${d.H.toFixed(4)} F · |A| = |B| = ${d.A.toFixed(4)} F`,
    `midspan moment M = ${d.M.toFixed(4)} F (${d.sag ? 'sagging — the tie is the bottom chord' : 'hogging — the tie is the top chord'}) → chord force |M|/z = ${d.chord.toFixed(3)} F over z = ${Z.toFixed(4)} m`,
    `M = 0 at θ = ${TH0.toFixed(2)}°, and the sheet draws b) at 47.115° — the frame it wanted was an arch`],
  frame: [[-28, -32], [34, 23]],
};

export function create(dw, panel, makePlayer) {
  const s = { cas: 1, th: CASES[1].th, flow: true, lbl: true, _k: 99 };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const TIE = { pending: PAL.black, final: (d) => (d.sag ? PAL.red : PAL.blue) };
  const STRUT = { pending: PAL.black, final: (d) => (d.sag ? PAL.blue : PAL.red) };

  dw.label('form_title', '', { cls: 'title', flash: false });
  dw.label('force_title', 'Force diagram — the three-force triangle', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });
  dw.label('note', '', { cls: 'point', flash: false, color: PAL.grey });
  dw.label('note2', '', { cls: 'point', flash: false, color: PAL.grey });

  // the concrete
  dw.poly('mat', OUT.length, { intro: 1, color: PAL.grey, opacity: 0.13, z: -0.25, flash: false });
  dw.strokes('edge', OUT.length, { intro: 1, w: dw.W.str, color: PAL.black });
  for (const n of ['L', 'R']) {
    dw.disk(`sup${n}`, { intro: 1, r: dw.W.disk });
    dw.strokes(`hat${n}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.label(`lsup${n}`, n === 'L' ? 'A' : 'B', { cls: 'num', intro: 1, when: (st) => st.lbl });
  }
  dw.arrow('fF', { intro: 1, color: PAL.green, ...ARR });
  dw.label('lfF', 'F', { cls: 'num', intro: 1, color: PAL.green });
  dw.dashLine('laF', { intro: 1, color: PAL.grey, dash: dw.W.dash });
  dw.instant('form_title', 'force_title', 'force_sub', 'note', 'note2', 'mat');

  // the two reaction rays and the point they meet at
  dw.dashLine('rayL', { intro: 2, color: PAL.grey, dash: dw.W.dash });
  dw.dashLine('rayR', { intro: 2, color: PAL.grey, dash: dw.W.dash });
  dw.disk('conc', { intro: 2, r: dw.W.disk * 0.9,
    when: (st, d) => !!d && isFinite(d.h) && d.h <= CLAMP_Y });
  dw.label('lconc', '', { cls: 'num', intro: 2, color: PAL.grey });
  for (const n of ['L', 'R']) {
    dw.arrow(`re${n}`, { intro: 2, color: PAL.green, ...NARR });
    dw.label(`lre${n}`, '', { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.lbl });
  }
  // where the thrust line leaves the leg
  dw.seg('escL', { intro: 3, w: dw.W.dim, color: PAL.red, flash: false,
    when: (st, d) => !!d && !d.fits && st.flow });
  dw.label('lesc', '', { cls: 'num', intro: 3, color: PAL.red, flash: false,
    when: (st, d) => !!d && !d.fits && st.flow });

  // the internal force flow that does fit inside the concrete
  const FLOW = 4;
  const flowOn = (st) => st.flow;
  dw.seg('legL', { intro: FLOW, w: dw.W.bar, color: { pending: PAL.black, final: () => PAL.blue }, when: flowOn });
  dw.seg('legR', { intro: FLOW, w: dw.W.bar, color: { pending: PAL.black, final: () => PAL.blue }, when: flowOn });
  dw.seg('botC', { intro: FLOW, w: dw.W.bar, color: TIE, when: flowOn });
  dw.seg('topC', { intro: FLOW, w: dw.W.bar, color: STRUT, when: flowOn });
  dw.seg('diaL', { intro: FLOW, w: dw.W.bar, color: STRUT, when: flowOn });
  dw.seg('diaR', { intro: FLOW, w: dw.W.bar, color: STRUT, when: flowOn });
  for (const n of ['legL', 'legR', 'botC', 'topC', 'diaL', 'diaR']) {
    dw.label(`l_${n}`, '', { cls: 'point', intro: FLOW,
      color: n === 'botC' ? TIE : n === 'topC' || n.startsWith('dia') ? STRUT
        : { pending: PAL.black, final: () => PAL.blue },
      when: (st) => st.flow && st.lbl });
  }
  dw.seg('dimZ', { intro: FLOW, w: dw.W.dim, color: PAL.grey, flash: false, when: flowOn });
  dw.label('ldimZ', '', { cls: 'point', intro: FLOW, flash: false, color: PAL.grey, when: flowOn });

  // the force triangle: F down, then the two reaction directions closing it
  dw.arrow('tF', { intro: 2, color: PAL.green, ...ARR });
  dw.seg('tA', { intro: 2, w: dw.W.bar, color: PAL.green });
  dw.seg('tB', { intro: 2, w: dw.W.bar, color: PAL.green });
  dw.label('ltF', '', { cls: 'num', intro: 2, color: PAL.green });
  dw.label('ltA', '', { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.lbl });
  dw.label('ltB', '', { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.lbl });
  dw.seg('tH', { intro: 2, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('ltH', '', { cls: 'point', intro: 2, flash: false, color: PAL.grey });
  dw.link('reL', 'tA', 'lreL', 'ltA');
  dw.link('reR', 'tB', 'lreR', 'ltB');
  dw.ghostable('tF', 'tA', 'tB');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    dw.setLabel('form_title', [-11, -19.8]);
    dw.setText('form_title', `${d.nearest.tag} θ = ${d.th.toFixed(2)}° — form diagram`);
    // 20.6 / 19.35, not 21.4 / 19.8: the sheet's task text is pinned across the
    // top of the canvas and its banner covers everything above y = 21.30
    dw.setLabel('force_title', [17, 20.6]);
    dw.setLabel('force_sub', [17, 19.35]);
    dw.setText('force_sub', `every length is a multiple of the load F · F drawn as ${SFD} units`);
    dw.setLabel('note', [15, -4.0]);
    dw.setText('note', 'all six support symbols on the sheet are pins — only the arrows differ');
    dw.setLabel('note2', [15, -6.4]);
    dw.setText('note2', `the concurrency point is ${d.where}`);

    const ring = OUT.map(ux);
    dw.setPoly('mat', ring);
    dw.setStrokes('edge', ring.map((p, i) => [p, ring[(i + 1) % ring.length]]));
    const SL = ux([XL, 0]), SR = ux([XR, 0]);
    dw.setDisk('supL', SL); dw.setDisk('supR', SR);
    dw.setLabel('lsupL', V.add(SL, [-2.4, -1.6]));
    dw.setLabel('lsupR', V.add(SR, [2.4, -1.6]));
    for (const [n, p] of [['L', SL], ['R', SR]]) {
      dw.setStrokes(`hat${n}`, V.hatch([p[0] - 1.8, p[1] - 0.6], [p[0] + 1.8, p[1] - 0.6], -1, 0.95, 5));
    }
    // the load, on its own line of action
    const ldTop = ux([XM, TOP]);
    // 3.1 units, not 6: a longer load arrow — and its F label — climb into the
    // step-caption card, whose lowest edge is y = 2.06
    dw.setArrow('fF', V.add(ldTop, [0, 3.1]), V.add(ldTop, [0, 0.5]));
    dw.setLabel('lfF', V.add(ldTop, [2.4, 2.1]));
    dw.setDashLine('laF', [V.add(ldTop, [0, 3.5]), ux([XM, -1.4])]);

    // the reaction rays, clamped so a steep case stays on the drawing
    const t = Math.tan((d.th * Math.PI) / 180);
    const hDraw = Math.min(isFinite(d.h) ? d.h : CLAMP_Y * 2, CLAMP_Y);
    const cx = XM, cy = hDraw;
    const P = ux([cx, cy]);
    dw.setDashLine('rayL', [ux([XL - 0.35, -0.35 * t]), P]);
    dw.setDashLine('rayR', [ux([XR + 0.35, -0.35 * t]), P]);
    dw.setDisk('conc', P);
    dw.setLabel('lconc', V.add(P, [11.0, 3.2]));
    dw.setText('lconc', isFinite(d.h)
      ? (d.h <= CLAMP_Y ? `they meet ${d.h.toFixed(3)} m up`
        : `they meet ${d.h.toFixed(2)} m up — off the drawing`)
      : 'parallel — they never meet');
    // the reactions, pushed into the pins along their own lines
    for (const [n, p, sgn] of [['L', SL, +1], ['R', SR, -1]]) {
      const u = V.unit([sgn * Math.cos((d.th * Math.PI) / 180),
                        Math.sin((d.th * Math.PI) / 180)]);
      dw.setArrow(`re${n}`, V.sub(p, V.mul(u, 5.4)), V.sub(p, V.mul(u, 1.2)));
      dw.setLabel(`lre${n}`, V.add(V.sub(p, V.mul(u, 5.4)), [sgn * -3.6, -1.2]));
      dw.setText(`lre${n}`, `${n === 'L' ? 'A' : 'B'} = ${d.A.toFixed(3)} F`);
    }
    // where the left ray leaves the leg's inner face
    const eY = Math.min(d.esc, TOP);
    dw.setSeg('escL', ux([LEGW, 0]), ux([LEGW, eY]));
    dw.setLabel('lesc', V.add(ux([LEGW, 0]), [7.0, -3.4]));
    dw.setText('lesc', `the ray is out of the leg above ${d.esc.toFixed(3)} m`);

    // the force flow that fits: two columns, two chords, two diagonals
    dw.setSeg('legL', ux([XL, 0]), ux([XL, ZLEV[0]]));
    dw.setSeg('legR', ux([XR, 0]), ux([XR, ZLEV[0]]));
    dw.setSeg('botC', ux([XL, ZLEV[0]]), ux([XR, ZLEV[0]]));
    dw.setSeg('topC', ux([XL, ZLEV[1]]), ux([XR, ZLEV[1]]));
    dw.setSeg('diaL', ux([XM, ZLEV[1]]), ux([XL, ZLEV[0]]));
    dw.setSeg('diaR', ux([XM, ZLEV[1]]), ux([XR, ZLEV[0]]));
    const shear = 0.5 * Math.hypot(XM - XL, Z) / Z;         // × F, in a diagonal
    const put = (n, p, txt) => { dw.setLabel(`l_${n}`, p); dw.setText(`l_${n}`, txt); };
    put('legL', V.add(ux([XL, ZLEV[0] / 2]), [-6.2, 0]), `leg ${(0.5).toFixed(3)} F`);
    put('legR', V.add(ux([XR, ZLEV[0] / 2]), [6.2, 0]), `leg ${(0.5).toFixed(3)} F`);
    put('botC', V.add(ux([XM, ZLEV[0]]), [0, -2.4]), `bottom chord ${d.chord.toFixed(3)} F ${d.sag ? 'T' : 'C'}`);
    put('topC', V.add(ux([XM, ZLEV[1]]), [-9.6, 2.4]), `top chord ${d.chord.toFixed(3)} F ${d.sag ? 'C' : 'T'}`);
    put('diaL', V.add(V.mid(ux([XM, ZLEV[1]]), ux([XL, ZLEV[0]])), [0, -6.4]), `${shear.toFixed(3)} F`);
    put('diaR', V.add(V.mid(ux([XM, ZLEV[1]]), ux([XR, ZLEV[0]])), [0, -6.4]), `${shear.toFixed(3)} F`);
    dw.setSeg('dimZ', ux([XL + 0.30, ZLEV[0]]), ux([XL + 0.30, ZLEV[1]]));
    dw.setLabel('ldimZ', V.add(ux([XL + 0.30, YB]), [-8.4, 0]));
    dw.setText('ldimZ', `z = ${Z.toFixed(4)} m`);

    // the force triangle: F laid off, then the two reaction directions
    const T = [11, 12];
    const pF = [T[0], T[1] - SFD];
    dw.setArrow('tF', T, pF);
    dw.setLabel('ltF', V.add(V.mid(T, pF), [3.2, 0]));
    dw.setText('ltF', 'F = 1');
    // walking the triangle F → A → B must reproduce the reaction DIRECTIONS,
    // so A = (+H, +V) leans the same way the left reaction does
    const pA = [T[0] + d.H * SFD, T[1] - SFD / 2];
    dw.setSeg('tA', pF, pA);
    dw.setSeg('tB', pA, T);
    dw.setLabel('ltA', V.add(V.mid(pF, pA), [1.4, -2.0]));
    dw.setLabel('ltB', V.add(V.mid(pA, T), [1.4, 2.0]));
    dw.setText('ltA', `A = ${d.A.toFixed(3)} F`);
    dw.setText('ltB', `B = ${d.A.toFixed(3)} F`);
    dw.setSeg('tH', [T[0], T[1] + 2.2], [pA[0], T[1] + 2.2]);
    dw.setLabel('ltH', [(T[0] + pA[0]) / 2, T[1] + 3.6]);
    dw.setText('ltH', `H = ${d.H.toFixed(4)} F`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const sec = panel.section('The case');
  panel.slider(sec, s, 'cas', 'the sheet’s three cases', 0, 2, 1,
    () => { s.th = CASES[Math.round(s.cas)].th; refresh(); },
    (v) => `${CASES[Math.round(v)].tag} ${CASES[Math.round(v)].name} — ${CASES[Math.round(v)].th.toFixed(2)}°`);
  panel.slider(sec, s, 'th', 'reaction inclination θ (°)', 20, 90, 0.05, refresh,
    (v) => `${v.toFixed(2)}°${Math.abs(v - TH0) < 0.3 ? '  ← the beam stops bending here' : ''}`);
  panel.toggle(sec, s, 'flow', 'show the internal force flow', refresh);
  panel.toggle(sec, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}
