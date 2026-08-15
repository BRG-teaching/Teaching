/**
 * EX X · Aufgabe 16.1 — Buckling behaviour: five support conditions
 * Structural Design II, FS 23, sheet "EX X — Additional Exercises", page 14.
 *
 * NUMBERING. The English sheet calls this "Task 1" — one of three blocks with
 * that label. German: Aufgabe 16.1, used here (error E1).
 *
 * TEXT (verbatim). "Shown below are columns with different supporting
 * conditions and buckling behaviour. In the following table, assign to each
 * support condition (1 - 5) the respective buckling behaviour (A - E) and the
 * ratio of the critical and the actual length."
 *
 * GIVEN. Five columns 1) – 5) with different end conditions, five buckled
 * shapes A) – E). NO DIMENSIONS ANYWHERE — the answer is a set of ratios, and
 * the length slider in this view exists only to make l_cr concrete; the sheet
 * itself gives no length.
 *
 * ============================================================================
 * PROBLEM — sheet error E7. The answer table is PRINTED ON THE TASK SHEET, in
 * both language versions. There is nothing left for a student to do. It is a
 * worked example wearing an exercise's clothes. This view therefore does not
 * "reveal" the table; it derives it, and then lets the reader break it.
 * ============================================================================
 *
 * ANSWERS — as printed, and verified here against compendium 2.6, which shows
 * exactly these five with l_cr = l, 0.7 l, 0.5 l, l and 2 l:
 *
 *   support condition   1     2     3     4     5
 *   buckling behaviour  D     C     B     E     A
 *   l_cr / l            1     0.5   2     0.7   1
 *
 *   1) pinned top (laterally held, free to rotate) + pinned base
 *      → a single half wave, l_cr = l                       → shape D
 *   2) top laterally held AND rotationally restrained + fixed base
 *      → an S-curve with two inflection points, l_cr = 0.5 l → shape C
 *   3) free top + fixed base
 *      → a quarter wave, l_cr = 2 l                          → shape B
 *   4) top laterally held, free to rotate + fixed base
 *      → l_cr = 0.7 l                                        → shape E
 *   5) top free to TRANSLATE but rotation restrained + fixed base
 *      → l_cr = l                                            → shape A
 *
 * WHAT l_cr ACTUALLY IS, and why the view computes rather than tabulates.
 * The buckled shape of every one of these is a solution of
 *   y'''' + k² y'' = 0,  y = A sin kx + B cos kx + Cx + D,
 * and l_cr is simply π / k — the distance between the two inflection points of
 * that shape, i.e. the length of the equivalent pin-ended column. Each end
 * condition supplies two boundary conditions, four in all, and the smallest k
 * that satisfies them is the answer:
 *
 *   pinned–pinned (top held)        kl = π        → l_cr = 1.000 l
 *   fixed–fixed  (top held)         kl = 2π       → l_cr = 0.500 l
 *   fixed–pinned (top held)         tan kl = kl
 *                                   → kl = 4.4934 → l_cr = 0.699 l ≈ 0.7 l
 *   fixed–free   (top sways, free
 *                 to rotate)        kl = π/2      → l_cr = 2.000 l
 *   fixed–guided (top sways, rotation
 *                 restrained)       kl = π        → l_cr = 1.000 l
 *
 * The mode shapes drawn here are those exact solutions, not sketches:
 *   pinned–pinned   y = sin(π t)
 *   fixed–fixed     y = (1 − cos 2π t) / 2
 *   fixed–free      y = 1 − cos(π t / 2)
 *   fixed–guided    y = (1 − cos π t) / 2
 *   fixed–pinned    y = sin(kl·t) − kl·cos(kl·t) − kl·t + kl, kl = 4.4934
 *                   (from y(0) = y'(0) = 0 at the fixed base and
 *                    y(l) = y''(l) = 0 at the pinned top, which is exactly
 *                    where tan kl = kl comes from)
 *
 * THE COMBINATION THE SHEET DOES NOT DRAW, and the reason the toggles are
 * worth having: a PINNED base with a top that is free to sway is not a column
 * with a large l_cr — it is a MECHANISM. It has no critical load at all,
 * because the whole member can rotate rigidly about its base. Two of the eight
 * combinations of the three switches are that case, and the view says so
 * instead of printing a number.
 *
 * The sheet prints its answers. This view re-derives them.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

// ------------------------------------------------------------- the physics --

const KL_FIXPIN = 4.493409457909064;   // the root of tan(kl) = kl

/** Effective-length factor for a base and a top condition.
    baseFix : is the base rotationally restrained?
    held    : is the top held against sideways translation?
    rot     : is the top rotationally restrained? */
function effK(baseFix, held, rot) {
  if (!held && !baseFix) return { K: null, why: 'a pinned base with a top free to sway is a MECHANISM — the whole column rotates rigidly about its foot, and there is no critical load at all' };
  if (!held) {
    return rot
      ? { K: 1.000, why: 'fixed base, top guided: it sways but stays vertical — one half wave over the length' }
      : { K: 2.000, why: 'fixed base, free top: a quarter wave, so the equivalent pin-ended column is twice as long' };
  }
  if (baseFix && rot) return { K: 0.500, why: 'both ends fully fixed and held: an S-curve with two inflection points half a length apart' };
  if (baseFix !== rot) return { K: Math.PI / KL_FIXPIN, why: 'one end fixed, the other a held pin: tan(kl) = kl gives kl = 4.4934, so l_cr = π/kl = 0.699 l' };
  return { K: 1.000, why: 'a held pin at both ends: the textbook Euler column, one clean half wave' };
}

/** The mode shape actually used: written out per case so each one is the
    genuine solution of its own boundary-value problem, not a sketch. */
function shapeOf(baseFix, held, rot) {
  if (!held && !baseFix) return (t) => t;                            // mechanism
  if (!held) {
    return rot ? (t) => (1 - Math.cos(Math.PI * t)) / 2
               : (t) => 1 - Math.cos((Math.PI * t) / 2);
  }
  if (baseFix && rot) return (t) => (1 - Math.cos(2 * Math.PI * t)) / 2;
  if (baseFix && !rot) {
    // y = sin(kt) − k·cos(k)·t − ... from y(0)=y'(0)=0, y(1)=y''(1)=0
    const k = KL_FIXPIN;
    return (t) => Math.sin(k * t) - k * Math.cos(k * t) - k * t + k;
  }
  if (!baseFix && rot) {
    // the same curve, stood on its head: pinned base, fixed held top
    const k = KL_FIXPIN;
    return (t) => Math.sin(k * (1 - t)) - k * Math.cos(k * (1 - t)) - k * (1 - t) + k;
  }
  return (t) => Math.sin(Math.PI * t);
}

/** Sample a shape and scale it to a peak of exactly 1 (signed peak kept). */
function samples(f, n = 48) {
  const ys = [];
  for (let i = 0; i <= n; i++) ys.push(f(i / n));
  const peak = Math.max(...ys.map(Math.abs)) || 1;
  return ys.map((y) => y / peak);
}

// the five conditions the sheet draws, in its own order
const SHEET = [
  { n: 1, baseFix: false, held: true, rot: false, shape: 'D' },
  { n: 2, baseFix: true, held: true, rot: true, shape: 'C' },
  { n: 3, baseFix: true, held: false, rot: false, shape: 'B' },
  { n: 4, baseFix: true, held: true, rot: false, shape: 'E' },
  { n: 5, baseFix: true, held: false, rot: true, shape: 'A' },
];

// ---------------------------------------------------------------- layout --

// the big column is always drawn 7 units tall whatever length the slider
// says, so that l_cr = 2 l still fits beside it; the scale is printed on it
const BX = -17.0, BY = -11.5, BH = 7.0, BA = 2.6;
const SX = [3.5, 9.6, 15.7, 21.8, 27.9], SY = -2.0, SM = 1.30, SA = 1.5;
const LCR0 = -3.4;                                     // top of the l_cr bars
const NPT = 48;

const DEFAULTS = { L: 5.0, baseFix: false, held: true, rot: false, all: true,
                   lbl: true, _k: 99 };

const K_SHAPE = 3, K_LCR = 4, K_ALL = 5, K_TABLE = 6, K_BREAK = 7;

export const meta = {
  title: 'EX X · 16.1 — five columns, five different lengths of the same column',
  subtitle: 'Structural Design II · “EX X — Additional Exercises”, p. 14 · German Aufgabe 16.1 (the English sheet calls it “Task 1”)',
  about: 'Five identical columns held five different ways, and the question is which buckled shape belongs to which and what the effective length is. The sheet prints its own answer table, so there is nothing left to find — which is why this view derives the five numbers instead of revealing them. Every shape drawn here is the exact solution of y⁗ + k²y″ = 0 under that column’s own four boundary conditions, and l_cr is read off it as the distance between the inflection points: the length of the pin-ended column that would fail at the same load. Then the interesting part. Flip the three switches yourself and you can reach two combinations the sheet never draws — a pinned base under a top that is free to sway — and they have no critical load at all, because they are not columns, they are mechanisms.',
  result: (d) => [
    d.K === null
      ? `base ${d.baseFix ? 'fixed' : 'pinned'} · top ${d.held ? 'held' : 'FREE to sway'}, rotation ${d.rot ? 'restrained' : 'free'} → NO critical load: this is a mechanism, not a column`
      : `base ${d.baseFix ? 'fixed' : 'pinned'} · top ${d.held ? 'held' : 'free to sway'}, rotation ${d.rot ? 'restrained' : 'free'} → l_cr / l = ${d.K.toFixed(3)}, so l_cr = ${(d.K * d.L).toFixed(3)} m for l = ${d.L.toFixed(2)} m`,
    d.match ? `that is the sheet's condition ${d.match.n}) — buckling behaviour ${d.match.shape}), l_cr / l = ${d.printed}` : `the sheet does not draw this combination`,
    `the printed table: 1→D (1) · 2→C (0.5) · 3→B (2) · 4→E (0.7) · 5→A (1) — all five confirmed here from the boundary conditions`,
    `THE SHEET PRINTS THIS TABLE ITSELF (error E7), in both language versions. There is nothing left to assign — it is a worked example, not an exercise`],
  frame: [[-26, -22], [30, 16]],
};

const STEPS = [
  { t: 'The exercise', d: 'EX X page 14, German Aufgabe 16.1: match five support conditions to five buckled shapes and write down l_cr / l. And the table is already filled in on the task sheet, in both languages — so the exercise is to understand it, not to do it',
    detail: () => ['no dimensions appear anywhere on this block; the answer is a set of ratios',
                   'compendium 2.6 shows exactly these five, with l_cr = l, 0.7 l, 0.5 l, l and 2 l',
                   'sheet error E7: six sub-parts of this booklet arrive with their answers printed'],
    take: 'a worked example is worth having. It is worth labelling as one' },
  { t: 'One column, three switches', d: 'left: a single column. Everything about its buckling is decided by three yes/no questions — is the base free to rotate, can the top move sideways, and is the top free to rotate. Three switches, eight combinations, and the sheet draws five of them',
    detail: (d) => [`base: ${d.baseFix ? 'rotationally FIXED' : 'a pin — free to rotate'}`,
                    `top: ${d.held ? 'held against sideways movement' : 'FREE to sway'}`,
                    `top rotation: ${d.rot ? 'restrained' : 'free'}`,
                    d.match ? `this is the sheet's condition ${d.match.n})` : 'the sheet does not draw this one'] },
  { t: 'The differential equation', d: 'a column at its critical load satisfies y⁗ + k²y″ = 0, whose general solution is A sin kx + B cos kx + Cx + D. Four unknowns; each end supplies two conditions; the smallest k that fits them all is the buckling load. That is the entire theory',
    detail: (d) => [`base at x = 0: y = 0 and ${d.baseFix ? "y' = 0 (no rotation)" : "y'' = 0 (no moment)"}`,
                    `top at x = l: ${d.held ? 'y = 0' : 'shear = 0 (nothing to push against)'} and ${d.rot ? "y' = 0" : "y'' = 0"}`,
                    d.K === null ? 'and these four have no non-trivial solution — the member is a mechanism'
                                 : `smallest root: kl = ${d.kl.toFixed(4)}`],
    take: 'l_cr is not a rule of thumb. It is π / k, and k comes out of four boundary conditions' },
  { t: 'The buckled shape', d: 'left, in pink: the exact mode shape, not a sketch. Read the shape and you can read the answer off it — the inflection points, where the curvature reverses, are the ends of the equivalent pin-ended column',
    detail: (d) => [d.K === null ? 'a straight line: the column stays straight and simply falls over'
                                 : d.why,
                    d.K === null ? 'no inflection points, because nothing bends'
                                 : `inflection points ${d.K.toFixed(3)} × l apart`,
                    d.K === null ? '' : `peak deflection at ${(d.peakAt * 100).toFixed(0)} % of the height`].filter(Boolean) },
  { t: 'The effective length', d: 'and there it is: l_cr, drawn below the column at the same scale. It is the length of the plain pinned column that would buckle at the same load — which is why a column with a free top is FOUR times weaker than the same column held at both ends, not twice',
    detail: (d) => (d.K === null
      ? ['no l_cr exists', 'N_cr = π²EI / l_cr² is meaningless when there is no l_cr', 'fix the base, or hold the top']
      : [`l_cr / l = ${d.K.toFixed(4)}`,
         `with l = ${d.L.toFixed(2)} m: l_cr = ${(d.K * d.L).toFixed(3)} m`,
         `N_cr goes as 1/l_cr², so against the 0.5 l case this one is ${((0.5 / d.K) ** 2).toFixed(2)}× as strong`]),
    take: 'the load goes as the inverse SQUARE of the effective length. 2 l against 0.5 l is a factor of sixteen' },
  { t: 'All five together', d: 'right: the sheet\'s five conditions, each with its exact shape and its l_cr drawn to the same scale below it. The bars are the answer — and the spread between them is the whole point of the page',
    detail: () => SHEET.map((c) => {
      const k = effK(c.baseFix, c.held, c.rot).K;
      return `${c.n}) base ${c.baseFix ? 'fixed' : 'pinned'}, top ${c.held ? 'held' : 'free'}${c.rot ? ' + no rotation' : ''} → ${c.shape}, l_cr = ${k.toFixed(3)} l`;
    }),
    take: 'conditions 1 and 5 have the same l_cr and completely different shapes. The ratio is not a description of the curve, it is a description of the load' },
  { t: 'The printed table', d: 'and this is what the sheet already gives you: D, C, B, E, A and 1, 0.5, 2, 0.7, 1. Every entry comes out of the derivation above, and the only rounding is 0.699 printed as 0.7',
    detail: () => ['1 → D, l_cr/l = 1     · 2 → C, 0.5     · 3 → B, 2',
                   '4 → E, 0.7 (exactly 0.699, the root of tan kl = kl)     · 5 → A, 1',
                   'printed on the TASK sheet in both languages — error E7'],
    take: 'the one value that is not exact is 0.7, and it is the only one anybody ever memorises' },
  { t: 'Break it', d: 'now flip the switches to something the sheet does not draw: a PINNED base with a top free to sway. There is no answer, because there is no column — the member rotates rigidly about its foot and falls over at any load at all',
    detail: (d) => [`two of the eight combinations are that case`,
                    'a pin gives no moment at the base and a free top gives no restraint at the head',
                    d.K === null ? 'you are looking at one of them right now' : 'switch the base to pinned and unhold the top to see it'],
    take: 'stability is not a property of the member. It is a property of the member and everything attached to it' },
];

// ------------------------------------------------------------------ maths --

function compute(s) {
  const e = effK(s.baseFix, s.held, s.rot);
  const f = shapeOf(s.baseFix, s.held, s.rot);
  const ys = samples(f, NPT);
  const kl = e.K === null ? null : Math.PI / e.K;
  let pk = 0;
  ys.forEach((y, i) => { if (Math.abs(y) > Math.abs(ys[pk])) pk = i; });
  const peakAt = pk / NPT;
  const match = SHEET.find((c) => c.baseFix === s.baseFix && c.held === s.held
    && c.rot === s.rot) || null;
  const printed = match ? { 1: '1', 2: '0.5', 3: '2', 4: '0.7', 5: '1' }[match.n] : '—';

  const all = SHEET.map((c) => ({
    ...c, K: effK(c.baseFix, c.held, c.rot).K,
    ys: samples(shapeOf(c.baseFix, c.held, c.rot), NPT),
  }));

  return { L: s.L, baseFix: s.baseFix, held: s.held, rot: s.rot,
           K: e.K, why: e.why, kl, ys, peakAt, match, printed, all };
}

// ------------------------------------------------------------------- view --

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const NARR = dw.W.narrow;

  dw.label('t_big', '', { cls: 'title', flash: false });
  dw.label('t_all', '', { cls: 'title', flash: false });

  // ---- the big column
  dw.seg('colAxis', { intro: 1, w: dw.W.thin, color: PAL.grey });
  dw.strokes('baseSym', 6, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.disk('baseDisk', { intro: 1, r: dw.W.disk });
  dw.strokes('topSym', 6, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.disk('topDisk', { intro: 1, r: dw.W.disk, when: (st) => st.held });
  dw.arrow('nLoad', { intro: 1, color: PAL.green, ...NARR });
  dw.label('lnLoad', 'N', { cls: 'num', intro: 1, color: PAL.green });
  dw.dashLine('shape', { intro: K_SHAPE, color: PAL.red, dash: 0.5 });
  dw.strokes('shapeS', NPT, { intro: K_SHAPE, w: dw.W.bar, color: PAL.red, cap: false });
  for (let i = 0; i < 2; i++) {
    dw.disk(`infl${i}`, { intro: K_LCR, r: dw.W.disk * 0.7,
      when: (st, dd) => !!dd && dd.K !== null });
  }
  dw.seg('lcrBig', { intro: K_LCR, w: dw.W.bar, color: PAL.blue,
    when: (st, dd) => !!dd && dd.K !== null });
  dw.label('llcrBig', '', { cls: 'num', intro: K_LCR, color: PAL.blue });
  dw.label('lmech', '', { cls: 'num', intro: K_LCR, color: PAL.red,
    when: (st, dd) => !!dd && dd.K === null });

  // ---- the five small columns
  for (let c = 0; c < 5; c++) {
    dw.seg(`sAxis${c}`, { intro: K_ALL, w: dw.W.dim, color: PAL.grey });
    dw.strokes(`sShape${c}`, NPT, { intro: K_ALL, w: dw.W.thin, color: PAL.red, cap: false });
    dw.seg(`sLcr${c}`, { intro: K_ALL, w: dw.W.bar, color: PAL.blue });
    dw.label(`lsTop${c}`, '', { cls: 'num', intro: K_ALL });
    dw.label(`lsK${c}`, '', { cls: 'num', intro: K_TABLE, color: PAL.blue });
    dw.label(`lsCond${c}`, '', { cls: 'point', intro: K_ALL, flash: false, color: PAL.grey });
  }
  dw.label('lprinted', '', { cls: 'point', intro: K_TABLE, flash: false, color: PAL.grey });

  dw.instant('t_big', 't_all');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    dw.setLabel('t_big', [BX + 2.0, 0.8]);
    dw.setText('t_big', `one column, l = ${d.L.toFixed(2)} m — drawn at 1 m ≙ ${(BH / d.L).toFixed(2)} units`);
    dw.setLabel('t_all', [15.7, 8.6]);
    dw.setText('t_all', `the sheet's five conditions, and their l_cr to the same scale`);

    // ---- the big column
    const H = BH;
    const top = BY + H;
    dw.setSeg('colAxis', [BX, BY], [BX, top]);
    // base symbol: a pin (disk + hatch) or a fixed foot (a bar + hatch)
    dw.setDisk('baseDisk', [BX, BY]);
    dw.setStrokes('baseSym', s.baseFix
      ? [[[BX - 2.0, BY], [BX + 2.0, BY]], ...V.hatch([BX - 2.0, BY], [BX + 2.0, BY], -1, 0.8, 5)]
      : V.hatch([BX - 1.6, BY - 0.55], [BX + 1.6, BY - 0.55], -1, 0.8, 6));
    // top symbol: a roller/pin when held, a guide when rotation is restrained
    const tsym = [];
    if (s.held) tsym.push([[BX - 1.6, top + 0.9], [BX + 1.6, top + 0.9]]);
    if (s.rot) {
      tsym.push([[BX - 1.4, top - 0.35], [BX + 1.4, top - 0.35]]);
      tsym.push([[BX - 1.4, top + 0.35], [BX + 1.4, top + 0.35]]);
    }
    while (tsym.length < 6) tsym.push([[BX, top], [BX, top]]);
    dw.setStrokes('topSym', tsym.slice(0, 6));
    dw.setDisk('topDisk', [BX, top]);
    dw.setArrow('nLoad', [BX, top + 3.4], [BX, top + 1.0]);
    dw.setLabel('lnLoad', [BX + 1.5, top + 2.4]);

    // the mode shape
    const pts = d.ys.map((y, i) => [BX + y * BA, BY + (i / NPT) * H]);
    dw.setStrokes('shapeS', pts.slice(0, -1).map((p, i) => [p, pts[i + 1]]));
    dw.setDashLine('shape', pts);

    // the effective length, drawn beside the column between the inflections
    if (d.K !== null) {
      const lc = d.K * H;
      // place the l_cr bar so it starts at the base: it is a LENGTH, and the
      // point is to compare it with the column's own height
      const bx = BX + BA + 3.0;
      dw.setSeg('lcrBig', [bx, BY], [bx, BY + lc]);
      dw.setDisk('infl0', [bx, BY]);
      dw.setDisk('infl1', [bx, BY + lc]);
      dw.setLabel('llcrBig', [bx + 4.4, BY + lc / 2]);
      dw.setText('llcrBig', `l_cr = ${d.K.toFixed(3)} l = ${(d.K * d.L).toFixed(2)} m`);
    } else {
      dw.setSeg('lcrBig', [BX, BY], [BX, BY]);
      dw.setDisk('infl0', [BX, BY]); dw.setDisk('infl1', [BX, BY]);
      dw.setLabel('llcrBig', [BX + BA + 7.0, BY + H / 2]);
      dw.setText('llcrBig', '');
    }
    dw.setLabel('lmech', [BX + BA + 7.4, BY + H / 2]);
    dw.setText('lmech', 'a MECHANISM — no l_cr exists');

    // ---- the five small columns
    d.all.forEach((c, i) => {
      const x = SX[i], h = 6.5;
      dw.setSeg(`sAxis${i}`, [x, SY], [x, SY + h]);
      const sp = c.ys.map((y, k) => [x + y * SA, SY + (k / NPT) * h]);
      void h;
      dw.setStrokes(`sShape${i}`, sp.slice(0, -1).map((p, k) => [p, sp[k + 1]]));
      dw.setSeg(`sLcr${i}`, [x, LCR0], [x, LCR0 - c.K * h]);
      dw.setLabel(`lsTop${i}`, [x, SY + h + 1.5]);
      dw.setText(`lsTop${i}`, `${c.n}) → ${c.shape})`);
      dw.setLabel(`lsK${i}`, [x, LCR0 - c.K * h - 1.1]);
      dw.setText(`lsK${i}`, `${c.K.toFixed(3)} l`);
      dw.setLabel(`lsCond${i}`, [x, SY - 1.0]);
      dw.setText(`lsCond${i}`, `${c.baseFix ? 'fix' : 'pin'} / ${c.held ? 'held' : 'free'}${c.rot ? '+' : ''}`);
    });
    dw.setLabel('lprinted', [15.7, -19.4]);
    dw.setText('lprinted', 'the sheet prints this table already — error E7');

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const w = panel.section('The three switches');
  panel.toggle(w, s, 'baseFix', 'base rotationally FIXED (else a pin)', refresh);
  panel.toggle(w, s, 'held', 'top HELD against sideways movement', refresh);
  panel.toggle(w, s, 'rot', 'top rotation RESTRAINED', refresh);
  const p = panel.section('The sheet’s five conditions');
  const row = panel.buttonRow(p);
  SHEET.forEach((c) => panel.button(row, `${c.n})`, () => {
    s.baseFix = c.baseFix; s.held = c.held; s.rot = c.rot;
    refresh();
  }));
  const g = panel.section('Given (the sheet gives none)');
  panel.slider(g, s, 'L', 'column length l (m)', 1, 12, 0.5, refresh,
    (v) => `${v.toFixed(1)} m — the sheet states no length`);
  panel.toggle(g, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}
