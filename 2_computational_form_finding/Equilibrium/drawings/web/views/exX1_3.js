/**
 * EX X · Task 3 — Closing string
 * Structural Design I, HS 22 (sheet EX X "Additional Exercises", page 3).
 *
 * "a) The first situation shows three structures with different statical depth.
 *     Draw the corresponding force diagram for the three structures. Complete
 *     the form and force diagram with the closing string and find the
 *     intersection point i and the respective pole o. Colour tensile forces red,
 *     compression forces blue and external forces green.
 *  b) In the second situation, support B changes and with it the closing string.
 *     Proceed in the same way as in a).
 *  c) What do you find when comparing the different structural systems with
 *     regard to the closing string, the intersection point i and the pole o?"
 *
 * GEOMETRY, digitised from page 3 of the task PDF at the printed 1:50 with
 *   web/tools/sheetvec.py ... 3 --scale 50 --min 0.15 --cluster
 * and then re-expressed relative to support A of each situation.
 *
 *   a)  A (2.962, 12.656)   B (5.961, 13.406)   load on x = 5.340
 *       C1 = I   (5.340, 12.535)   0.716 m BELOW the chord  -> cable
 *       C2 = II  (5.340, 11.907)   1.344 m below            -> deeper cable
 *       C3 = III (5.340, 13.906)   0.655 m ABOVE            -> arch
 *   b)  A (2.954, 5.795)    C (4.453, 4.557)    load on x = 4.453
 *       B1 = I (5.953, 6.580)   B2 = II (5.953, 5.045)   B3 = III (5.953, 4.260)
 *
 * TWO NUMBERS COME OUT ROUND AND VALIDATE THE SCALE: the span A-B is 2.999 m in
 * BOTH situations (drawn as 3.00 m), and in b) the load stands at 1.499 m --
 * exactly midspan, which is why b)'s reactions are 60.02 / 59.98 kN. Nothing
 * else is round. In b) member 1 is drawn three times at 0.035 m offset so the
 * three structures can be told apart; it is one member.
 *
 * THE BOOKKEEPING. Each structure is three forces on one node: solve
 * N_A u(C->A) + N_B u(C->B) + F = 0, a 2x2. Then
 *   closing line s   the chord A-B
 *   statical depth d the vertical distance from s down to C, on the load's line
 *   A_v = F (x_B - x_F)/(x_B - x_A)    the simple-beam reaction
 *   M   = A_v (x_F - x_A)              the simple-beam moment under the load
 *   H   = M / d                        the thrust = the pole's distance from the
 *                                      load line, measured horizontally
 *   i   the point on the load line A_v below the top; the ray from the pole
 *       parallel to the closing line passes through it.
 * WHY i CANNOT MOVE: split either reaction, at its own support, into a part
 * along s (no moment about the other support) and a part along the load line.
 * The moment equation then gives |top->i| = A_v exactly. So i depends only on
 * the load and on the two supports' HORIZONTAL positions -- not on the depth,
 * and not on how high B sits.
 *
 * a)  A_v = 24.848, B_v = 95.152 kN, M = 59.089 kNm, s crosses the load at
 *     y = 13.2507. One closing line for all three structures:
 *       I    d = +0.7157   N(A-C) =  82.67 T   N(C-B) = 142.22 T   H =  82.56
 *       II   d = +1.3437   N(A-C) =  46.11 T   N(C-B) = 114.90 T   H =  43.98
 *       III  d = -0.6553   N(A-C) = 101.87 C   N(C-B) = 115.77 C   H =  90.17
 *     every H reproduces M/d to five figures. The arch's pole is on the other
 *     side of the load line, and ALL THREE lie on the one line through i
 *     parallel to A-B.
 *
 * b)  A_v = 60.02, B_v = 59.98 kN, M = 89.970 kNm -- the same for all three,
 *     because only B's HEIGHT changed. Three different closing lines:
 *       I    B1  d = 1.6304   N1 =  71.57 T   N2 =  92.65 T   H =  55.18
 *       II   B2  d = 0.8631   N1 = 135.19 T   N3 = 109.62 T   H = 104.24
 *       III  B3  d = 0.4708   N1 = 247.87 T   N4 = 194.83 T   H = 191.12
 *     everything is tension; nothing is blue. Because member 1 is shared, the
 *     three A-reactions are parallel and all three poles lie on ONE line through
 *     the TOP of the load line -- and all three closing lines still cut the load
 *     line at the SAME i, the midpoint.
 *
 * c)  one theorem, said twice. i is fixed by the load and the horizontal support
 *     positions; the pole always lies on the line through i parallel to that
 *     structure's closing line. a) holds the closing line still, so the poles
 *     line up. b) swings the closing line, so the poles scatter -- but every
 *     closing line still passes through the same i.
 *
 * *** DISAGREEMENT WITH THE OFFICIAL KEY ***
 *     In the printed force diagram of 3a) the pole labels o1 and o2 ARE SWAPPED.
 *     The pole 82.56 kN from the load line is structure I's -- its two rays are
 *     drawn parallel to members 1 and 2 -- and the key labels it o2. The pole at
 *     43.98 kN is structure II's (rays parallel to members 3 and 4) and the key
 *     labels it o1. Confirmed twice: by the ray-to-member parallelism in the
 *     printed drawing, and by the three pole distances, which measure off the
 *     sheet in the ratio 1 : 0.535 : 1.096 against M/d's 1 : 0.533 : 1.092 --
 *     which only matches under the labelling used here. The reaction labels
 *     A1..A3 and B1..B3 in the same drawing are correct; only the two pole
 *     labels are transposed. Everything else in the key agrees.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

// ------------------------------------------------- the two situations ------
// metres, relative to support A of each situation

const SIT = [
  { tag: 'a)', name: 'three depths, one span',
    A: [0, 0], Bx: 2.999, By: 0.750, xF: 2.378,
    // what the slider moves, and what the sheet's three structures are
    moves: 'C', yS: [-0.121, -0.749, 1.250],
    dmin: -0.90, dmax: 2.60, gap: 0.45, def: 2.35,
    blurb: 'A and B stay where they are, so all three structures share one closing line' },
  { tag: 'b)', name: 'support B moves',
    A: [0, 0], Bx: 2.999, By: null, xF: 1.499, Cy: -1.238,
    moves: 'B', yS: [0.785, -0.750, -1.535],
    dmin: 0.46, dmax: 1.75, gap: 0, def: 1.10,
    blurb: 'A, the node C and the load stay where they are; only support B slides up and down' },
];
const RN = ['I', 'II', 'III'];

// ------------------------------------------------------------ the layout ---

// the form diagram has to sit between the step caption (down to y ≈ 2.97)
// and the RESULT card (up to y ≈ -12.7), so support A is well below centre
const FA = [-24.0, -4.2];                     // where support A is drawn
const MPU = 3.2;                              // drawing units per metre
const LLP = [13.0, 7.0];                      // top of the load line
const LLH = 10.9;                             // the load line is ALWAYS this tall:
                                              // the shape of a force diagram does
                                              // not depend on how big the load is

const DEFAULTS = {
  sitB: false,                                // false = situation a) · true = situation b)
  auto: true,                                 // follow the steps into situation b)
  depth: 2.35,                                // m — the statical depth, the thing the task turns on
  F1: 120,                                    // kN, as printed
  sheet: true,                                // keep the sheet's three structures on screen
  lbl: true,
  _k: 99,
};

const KEY_SWAP = 'the key labels this one o₂';

// ------------------------------------------------------------------ maths --

const fp = (p) => [FA[0] + p[0] * MPU, FA[1] + p[1] * MPU];

function comb(u, v, w) {
  const det = u[0] * v[1] - u[1] * v[0];
  return [(w[0] * v[1] - w[1] * v[0]) / det, (u[0] * w[1] - u[1] * w[0]) / det];
}

/** One structure: supports A and B, node C, one vertical load F1 at C. */
function solve(S, B, C, F1) {
  const A = S.A;
  const F = [0, -F1];
  const [nA, nB] = comb(V.unit(V.sub(A, C)), V.unit(V.sub(B, C)), V.mul(F, -1));
  const RA = V.mul(V.unit(V.sub(A, C)), nA);
  const RB = V.mul(V.unit(V.sub(B, C)), nB);
  // the closing line, and the depth measured on the load's line of action
  const yS = A[1] + ((C[0] - A[0]) / (B[0] - A[0])) * (B[1] - A[1]);
  const d = yS - C[1];
  const Av = F1 * (B[0] - C[0]) / (B[0] - A[0]);
  const M = Av * (C[0] - A[0]);
  return { A, B, C, nA, nB, RA, RB, yS, d, Av, Bv: F1 - Av, M, H: M / d,
           resid: Math.abs(RA[0] + RB[0]) + Math.abs(RA[1] + RB[1] - F1) };
}

/** Place the node the slider owns, from the statical depth it asks for. */
function fromDepth(S, dRaw) {
  let d = Math.min(S.dmax, Math.max(S.dmin, dRaw));
  // no structure has zero depth: the thrust would be infinite. Step over the gap.
  if (S.gap && Math.abs(d) < S.gap) d = (dRaw < 0 ? -1 : 1) * S.gap;
  if (S.moves === 'C') {
    // A and B fixed; C hangs `d` below the chord, on the load's line of action
    const yS = (S.xF / S.Bx) * S.By;
    return { d, B: [S.Bx, S.By], C: [S.xF, yS - d] };
  }
  // A and C fixed; B is wherever it has to be for the chord to sit `d` above C
  const r = S.xF / S.Bx;
  const By = (S.Cy + d) / r;
  return { d, B: [S.Bx, By], C: [S.xF, S.Cy] };
}

function compute(s) {
  const S = SIT[s.sitB ? 1 : 0];
  const F1 = s.F1;
  const sfd = F1 / LLH;                       // kN per drawing unit

  const sheet = S.yS.map((y, k) => {
    const B = S.moves === 'C' ? [S.Bx, S.By] : [S.Bx, y];
    const C = S.moves === 'C' ? [S.xF, y] : [S.xF, S.Cy];
    return { ...solve(S, B, C, F1), tag: RN[k] };
  });
  const g = fromDepth(S, s.depth);
  const live = { ...solve(S, g.B, g.C, F1), tag: 'live', want: s.depth, clipped: Math.abs(g.d - s.depth) > 1e-6 };

  // i sits A_v below the top of the load line, and nothing here can move it
  const P = LLP;
  const Q = [P[0], P[1] - F1 / sfd];
  const iP = [P[0], P[1] - sheet[0].Av / sfd];
  const pole = (st) => V.sub(P, V.mul(st.RA, 1 / sfd));

  return { S, tag: S.tag, name: S.name, blurb: S.blurb, moves: S.moves,
           F1, sfd, sheet, live, P, Q, iP,
           poles: sheet.map(pole), poleL: pole(live),
           Av: sheet[0].Av, Bv: sheet[0].Bv, M: sheet[0].M,
           span: S.Bx, sitIdx: s.sitB ? 1 : 0,
           showSheet: !!s.sheet };
}

const kind = (n) => (n >= 0 ? 'tension' : 'compression');
const col = (n) => (n >= 0 ? PAL.red : PAL.blue);

// ------------------------------------------------------------------- view --

export const meta = {
  title: 'EX X.3 — the closing string, and the two things that refuse to move',
  subtitle: 'Structural Design I · sheet EX X “Additional Exercises”, task 3 a)–c)',
  about: 'One 120 kN load, and three structures that carry it between the same two supports at three different depths — a shallow cable, a deep cable and an arch. Their forces are wildly different, from 44 to 190 kN of thrust. But two things in the force diagram do not budge. The point i, where the closing line cuts the load line, sits at the simple-beam reaction and cannot see the depth at all; and every pole lands on the line through i parallel to that structure’s closing line. Situation a) holds the closing line still and the three poles line up on it. Situation b) swings the closing line by moving support B, and the poles scatter — yet every one of the new closing lines still runs through the very same i. Drag the depth slider and watch what stays put. Note that in the printed solution of 3a) the pole labels o₁ and o₂ are swapped.',
  result: (d) => [
    `${d.tag} span ${d.span.toFixed(3)} m: A_v ${d.Av.toFixed(2)}, B_v ${d.Bv.toFixed(2)} kN, M ${d.M.toFixed(3)} kNm, F₁ at ${d.S.xF.toFixed(3)} m`,
    ...d.sheet.map((x, k) => `${RN[k]}: d ${x.d >= 0 ? '+' : ''}${x.d.toFixed(3)} m → H ${Math.abs(x.H).toFixed(2)} · ${Math.abs(x.nA).toFixed(2)}/${Math.abs(x.nB).toFixed(2)} kN ${kind(x.nA).slice(0, 4)}`),
    `yours: d ${d.live.d.toFixed(3)} m → H ${d.live.H.toFixed(2)} kN, members ${Math.abs(d.live.nA).toFixed(2)}/${Math.abs(d.live.nB).toFixed(2)} kN`,
    `c) i sits at A_v ${d.Av.toFixed(2)} kN below the load line's top, whatever the depth`,
    `   and every pole lands on the line through i parallel to its closing line`,
    d.sitIdx === 0 ? 'NOTE: the key’s a) swaps o₁ and o₂ — o₁ is structure I (H 82.56), o₂ is II (H 43.98)' : 'in b) nothing is blue: every member of all three is in tension'],
  frame: [[-27, -22], [32, 17]],
};

const S_FORCE = 3, S_LOCUS = 4, S_B = 6;

const STEPS = [
  { t: 'The exercise', d: 'one load, and the same two supports asked to carry it three different ways. Then support B moves, and the question is what — if anything — stays the same' },
  { t: 'a) Three depths, one span', d: 'left: three two-bar structures between the same pin A and the same support B, all carrying the same 120 kN on the same line of action. C₃ sits above the chord, so that one is an arch and its members are blue; C₁ and C₂ hang below, so they are cables and pull',
    detail: (d) => d.sheet.map((x, k) => `${RN[k]}: depth ${x.d >= 0 ? '+' : ''}${x.d.toFixed(3)} m — ${Math.abs(x.nA).toFixed(2)} and ${Math.abs(x.nB).toFixed(2)} kN ${kind(x.nA)}`),
    take: 'nothing was changed but the depth, and the biggest force went from 115 kN to 142 kN' },
  { t: 'a) The closing line, and where i has to be', d: 'the dashed chord from A to B is the closing string. Split either reaction at its own support into a part along that chord — which has no moment about the other support — and a part along the load line, and the moment equation hands you the simple-beam reaction. That is i, and it cannot see the depth at all',
    detail: (d) => [`A_v = F₁ (x_B − x_F)/(x_B − x_A) = ${d.F1.toFixed(0)} × ${(d.S.Bx - d.S.xF).toFixed(3)}/${d.S.Bx.toFixed(3)} = ${d.Av.toFixed(3)} kN`,
                    `so i sits ${d.Av.toFixed(2)} kN below the top of the load line, and B_v = ${d.Bv.toFixed(2)} kN below it`,
                    `M = A_v (x_F − x_A) = ${d.M.toFixed(3)} kNm, and every structure on this span has the same M`],
    take: 'i is a property of the load and the two horizontal support positions. It is not a property of the structure' },
  { t: 'a) Three force diagrams', d: 'right: the load laid off once, and three poles. The thrust is M divided by the depth, and the depth is the only thing that differs — so the shallow cable has the pole furthest out and the deep one the nearest. The arch flips to the other side of the load line, which is exactly what “compression instead of tension” looks like here',
    detail: (d) => d.sheet.map((x, k) => `${RN[k]}: H = ${d.M.toFixed(2)}/${x.d.toFixed(4)} = ${x.H.toFixed(2)} kN — pole ${x.H > 0 ? 'right' : 'LEFT'} of the load line`),
    take: 'the force diagram’s shape does not depend on how big the load is, only on where it acts — so the load slider moves the numbers and not the drawing' },
  { t: 'a) All three poles on one line', d: 'and there is the answer to c), half of it. The closing line never changed, so the ray from every pole to i has the same direction — which puts every pole on one straight line through i, parallel to the chord A–B',
    detail: (d) => [...d.poles.map((p, k) => `o${k + 1} at ${(p[0] - d.iP[0]).toFixed(2)} right and ${(p[1] - d.iP[1]).toFixed(2)} up from i — slope ${((p[1] - d.iP[1]) / (p[0] - d.iP[0])).toFixed(4)}`),
                    `and the chord A–B has slope ${(d.S.By / d.S.Bx).toFixed(4)}`],
    take: 'the printed key swaps o₁ and o₂ here: it puts o₂ on structure I’s pole and o₁ on structure II’s. The rays give it away — they are drawn parallel to members 1 and 2' },
  { t: 'Walk the depth', d: 'now drag “statical depth” in the panel. The orange structure is yours: its node slides up and down the load’s line of action, its two members change length and force, its pole runs in and out — and it runs along that same line, through that same i, the whole way',
    detail: (d) => [`d = ${d.live.d.toFixed(3)} m → H = ${d.live.H.toFixed(2)} kN`,
                    `members ${Math.abs(d.live.nA).toFixed(2)} and ${Math.abs(d.live.nB).toFixed(2)} kN ${kind(d.live.nA)}, closure residual ${d.live.resid.toExponential(1)} kN`,
                    d.live.clipped ? `(the slider asked for ${d.live.want.toFixed(2)} m; a depth of zero would need infinite thrust, so the view holds |d| ≥ ${d.S.gap || d.S.dmin} m)`
                                   : `pole ${(d.poleL[0] - d.iP[0]).toFixed(2)} from i along the closing line`],
    take: 'push the depth through zero and the pole changes sides: a structure with no depth cannot carry anything' },
  { t: 'b) Support B moves', d: 'the second situation. A stays, the node C stays, the load stays — only B slides up and down its own line, and with it the closing string. Now every structure has its OWN chord, so the three closing lines all point different ways',
    detail: (d) => d.sheet.map((x, k) => `${RN[k]}: B at ${x.B[1] >= 0 ? '+' : ''}${x.B[1].toFixed(3)} m → depth ${x.d.toFixed(4)} m, H = ${x.H.toFixed(2)} kN, members ${Math.abs(x.nA).toFixed(2)} / ${Math.abs(x.nB).toFixed(2)} kN`),
    take: 'member 1 is the same member in all three — the sheet draws it three times, offset, so you can see them' },
  { t: 'b) And i still does not move', d: 'the load did not move and neither support moved sideways, so A_v is untouched and i is exactly where it was — the midpoint of the load line, because here the load happens to stand at midspan. Three different closing lines, three different poles, and all three rays run through the one point',
    detail: (d) => [`A_v = ${d.Av.toFixed(2)} kN and B_v = ${d.Bv.toFixed(2)} kN — the load is at ${d.S.xF.toFixed(3)} m of a ${d.S.Bx.toFixed(3)} m span, i.e. midspan`,
                    `and because member 1 is shared, all three poles also sit on one line through the TOP of the load line, parallel to it`,
                    `everything is tension here: nothing in situation b) is blue`],
    take: 'moving a support vertically changes every force in the structure and cannot touch i at all' },
  { t: 'c) The answer', d: 'both halves are one theorem. i is fixed by the load and the two horizontal support positions; the pole then lies on the line through i parallel to that structure’s closing line',
    detail: () => ['“all closing lines intersect at point i on the load line”',
                   '“all poles o come to lie on the respective closing line” — the key’s words'],
    take: 'choose the depth and the drawing tells you the price, without a single equation' },
];

/**
 * Push overlapping labels apart.
 *
 * Situation b) fans four members out of one node onto one vertical line, so any
 * hand-chosen offset that works at one slider value collides at another. Rather
 * than tune constants, every label declares where it WANTS to sit and how big
 * its text is; anything still overlapping after that is separated here, along
 * whichever axis costs less. Items marked `fixed` (node names, titles) push but
 * are never pushed.
 */
function declutter(L, passes = 80) {
  const PADX = 0.55, PADY = 0.30;
  for (let it = 0; it < passes; it++) {
    let moved = false;
    for (let a = 0; a < L.length; a++) {
      for (let b = a + 1; b < L.length; b++) {
        const A = L[a], B = L[b];
        if (A.fixed && B.fixed) continue;
        const ox = A.w + B.w + PADX - Math.abs(B.p[0] - A.p[0]);
        const oy = A.h + B.h + PADY - Math.abs(B.p[1] - A.p[1]);
        if (ox <= 0 || oy <= 0) continue;
        const sx = B.p[0] >= A.p[0] ? 1 : -1;
        const sy = B.p[1] >= A.p[1] ? 1 : -1;
        // a vertical shift reads better than a horizontal one, so it is
        // "cheaper" by a factor of two and a bit
        const useY = oy * 2.4 < ox;
        const fa = A.fixed ? 0 : (B.fixed ? 1 : 0.5);
        const fb = B.fixed ? 0 : (A.fixed ? 1 : 0.5);
        if (useY) {
          A.p = [A.p[0], A.p[1] - sy * oy * fa];
          B.p = [B.p[0], B.p[1] + sy * oy * fb];
        } else {
          A.p = [A.p[0] - sx * ox * fa, A.p[1]];
          B.p = [B.p[0] + sx * ox * fb, B.p[1]];
        }
        moved = true;
      }
    }
    if (!moved) break;
  }
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const LIVE = PAL.orange;

  const shCol = (k, which) => ({ pending: PAL.black,
    final: (dd) => col(which === 'A' ? dd.sheet[k].nA : dd.sheet[k].nB) });
  const lvCol = { pending: PAL.black, final: () => LIVE };

  dw.label('t_form', '', { cls: 'title', flash: false });
  dw.label('t_force', 'Kräfteplan — force diagram', { cls: 'title', flash: false });
  dw.label('t_scale', '', { cls: 'point', flash: false, color: PAL.grey });

  // ---- form diagram
  dw.disk('supA', { intro: 1, r: dw.W.disk });
  dw.label('lsupA', 'A', { cls: 'num', intro: 1, when: (st) => st.lbl });
  dw.strokes('hatA', 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.dashLine('vA', { intro: 1, color: PAL.grey, dash: dw.W.dash });
  dw.dashLine('vB', { intro: 1, color: PAL.grey, dash: dw.W.dash });
  dw.dashLine('vF', { intro: 1, color: PAL.grey, dash: dw.W.dash });

  for (let k = 0; k < 3; k++) {
    dw.disk(`supB${k}`, { intro: 1, r: dw.W.disk, when: (st) => st.sheet });
    dw.label(`lsupB${k}`, '', { cls: 'num', intro: 1, when: (st) => st.sheet && st.lbl });
    dw.disk(`ndC${k}`, { intro: 1, r: dw.W.disk * 0.8, when: (st) => st.sheet });
    dw.label(`lndC${k}`, '', { cls: 'num', intro: 1, when: (st) => st.sheet && st.lbl });
    dw.seg(`mA${k}`, { intro: 1, w: dw.W.str, color: shCol(k, 'A'), when: (st) => st.sheet });
    dw.seg(`mB${k}`, { intro: 1, w: dw.W.str, color: shCol(k, 'B'), when: (st) => st.sheet });
    dw.label(`lmA${k}`, '', { cls: 'num', intro: 1, color: shCol(k, 'A'),
      when: (st) => st.sheet && st.lbl });
    dw.label(`lmB${k}`, '', { cls: 'num', intro: 1, color: shCol(k, 'B'),
      when: (st) => st.sheet && st.lbl });
    dw.dashLine(`clos${k}`, { intro: 2, color: PAL.grey, dash: dw.W.dash,
      when: (st) => st.sheet });
  }
  // the one the slider owns
  dw.seg('mAL', { intro: S_FORCE, w: dw.W.bar, color: lvCol });
  dw.seg('mBL', { intro: S_FORCE, w: dw.W.bar, color: lvCol });
  dw.disk('ndCL', { intro: S_FORCE, r: dw.W.disk });
  dw.disk('supBL', { intro: S_FORCE, r: dw.W.disk });
  dw.dashLine('closL', { intro: S_FORCE, color: LIVE, dash: dw.W.dash });
  dw.label('lmAL', '', { cls: 'num', intro: S_FORCE, color: LIVE, when: (st) => st.lbl });
  dw.label('lmBL', '', { cls: 'num', intro: S_FORCE, color: LIVE, when: (st) => st.lbl });
  dw.seg('dimD', { intro: 2, w: dw.W.dim, color: LIVE, flash: false });
  dw.label('ldimD', '', { cls: 'num', intro: 2, color: LIVE, flash: false });
  for (const n of ['A', 'B']) {
    dw.arrow(`re${n}`, { intro: S_FORCE, color: PAL.green, ...NARR });
    dw.label(`lre${n}`, '', { cls: 'num', intro: S_FORCE, color: PAL.green });
  }
  dw.arrow('fLoad', { intro: 1, color: PAL.green, ...ARR });
  dw.label('lfLoad', '', { cls: 'num', intro: 1, color: PAL.green });

  // ---- force diagram
  dw.arrow('ff', { intro: S_FORCE, color: PAL.green, ...ARR });
  dw.label('lff', '', { cls: 'num', intro: S_FORCE, color: PAL.green });
  dw.disk('ptI', { intro: 2, r: dw.W.disk * 0.8 });
  dw.label('lptI', '', { cls: 'num', intro: 2, color: PAL.grey });
  dw.seg('dimAv', { intro: 2, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('ldimAv', '', { cls: 'num', intro: 2, color: PAL.grey, flash: false });
  dw.dashLine('locus', { intro: S_LOCUS, color: PAL.grey, dash: dw.W.dash });
  dw.label('llocus', '', { cls: 'point', intro: S_LOCUS, flash: false, color: PAL.grey });

  for (let k = 0; k < 3; k++) {
    dw.seg(`rayA${k}`, { intro: S_FORCE, w: dw.W.ray, color: shCol(k, 'A'),
      when: (st) => st.sheet });
    dw.seg(`rayB${k}`, { intro: S_FORCE, w: dw.W.ray, color: shCol(k, 'B'),
      when: (st) => st.sheet });
    dw.dashLine(`cray${k}`, { intro: S_LOCUS, color: PAL.grey, dash: dw.W.dash,
      when: (st) => st.sheet });
    dw.disk(`pole${k}`, { intro: S_FORCE, r: dw.W.disk * 0.8, when: (st) => st.sheet });
    dw.label(`lpole${k}`, '', { cls: 'num', intro: S_FORCE, when: (st) => st.sheet && st.lbl });
    dw.link(`mA${k}`, `rayA${k}`, `lmA${k}`);
    dw.link(`mB${k}`, `rayB${k}`, `lmB${k}`);
    dw.link(`clos${k}`, `cray${k}`);
  }
  dw.seg('rayAL', { intro: S_FORCE, w: dw.W.bar, color: lvCol });
  dw.seg('rayBL', { intro: S_FORCE, w: dw.W.bar, color: lvCol });
  dw.dashLine('crayL', { intro: S_FORCE, color: LIVE, dash: dw.W.dash });
  dw.disk('poleL', { intro: S_FORCE, r: dw.W.disk });
  dw.label('lpoleL', '', { cls: 'num', intro: S_FORCE, color: LIVE, when: (st) => st.lbl });
  dw.link('mAL', 'rayAL', 'lmAL');
  dw.link('mBL', 'rayBL', 'lmBL');
  dw.link('closL', 'crayL');
  dw.label('lkey', '', { cls: 'point', intro: S_LOCUS, flash: false, color: PAL.red });

  dw.instant('t_form', 't_force', 't_scale');
  dw.ghostable('ff');

  let d = null;
  let lastK = -1;

  function refresh() {
    s._k = player.k;
    // every label declares where it wants to sit; declutter() settles the rest
    const LAB = [];
    const put = (name, p, text, opt = {}) => {
      dw.setText(name, text);
      if (opt.on === false) { dw.setLabel(name, p); return; }
      LAB.push({ name, p: [p[0], p[1]], w: 0.235 * String(text).length,
                 h: 0.55, fixed: !!opt.fixed });
    };
    // follow the steps into b), but only when the STEP changed — otherwise a
    // toggle in the panel would be undone by its own refresh
    if (s.auto && player.k !== lastK) {
      const want = player.k >= S_B;
      if (want !== s.sitB) { s.sitB = want; s.depth = SIT[want ? 1 : 0].def; }
    }
    lastK = player.k;
    d = compute(s);
    const S = d.S;

    put('t_form', [2.5, 9.6], `${d.tag} ${d.name} — Lageplan 1:50`, { fixed: true });
    dw.setLabel('t_force', [LLP[0] + 4.0, 15.4]);
    put('t_scale', [LLP[0] + 4.0, 14.0], `1 unit ≙ ${d.sfd.toFixed(2)} kN · the load line is always ${LLH} units long, so the shape never depends on F₁`, { fixed: true });

    // ================================================== form diagram =========
    const Ap = fp(S.A);
    dw.setDisk('supA', Ap);
    put('lsupA', V.add(Ap, [-1.6, -1.1]), 'A', { fixed: true, on: !!s.lbl });
    dw.setStrokes('hatA', V.hatch([Ap[0] - 1.5, Ap[1] - 0.5], [Ap[0] + 1.5, Ap[1] - 0.5],
      -1, 0.85, 5));
    const vtop = 1.9, vbot = -11.2;
    dw.setDashLine('vA', [[Ap[0], vbot], [Ap[0], vtop]]);
    dw.setDashLine('vB', [[FA[0] + S.Bx * MPU, vbot], [FA[0] + S.Bx * MPU, vtop]]);
    dw.setDashLine('vF', [[FA[0] + S.xF * MPU, vbot], [FA[0] + S.xF * MPU, vtop]]);

    // the sheet's three structures. In b) member 1 is one member drawn three
    // times, exactly as the sheet does it, so offset each copy a little
    d.sheet.forEach((x, k) => {
      const off = d.moves === 'B' ? V.mul(V.unit(V.perp(V.sub(x.C, x.A))), (k - 1) * 0.075) : [0, 0];
      const Aq = fp(V.add(x.A, off)), Cq = fp(V.add(x.C, off));
      const At = fp(x.A), Ct = fp(x.C), Bq = fp(x.B);
      dw.setSeg(`mA${k}`, Aq, Cq);
      dw.setSeg(`mB${k}`, Ct, Bq);
      dw.setDisk(`ndC${k}`, Ct);
      dw.setDisk(`supB${k}`, Bq);
      put(`lndC${k}`, V.add(Ct, [d.moves === 'C' ? -1.6 : -1.8, -1.0]),
          d.moves === 'C' ? `C${k + 1}` : 'C', { fixed: true, on: !!(s.sheet && s.lbl) });
      put(`lsupB${k}`, V.add(Bq, [1.6, -0.2]), d.moves === 'C' ? 'B' : `B${k + 1}`,
          { fixed: true, on: !!(s.sheet && s.lbl) });
      const nb = (p, q, t, f) => V.add(V.add(p, V.mul(V.sub(q, p), f)),
                                       V.mul(V.unit(V.perp(V.sub(q, p))), t));
      put(`lmA${k}`, nb(Aq, Cq, [1.5, -1.5, 1.5][k], 0.62), `${Math.abs(x.nA).toFixed(1)}`,
          { on: !!(s.sheet && s.lbl) });
      put(`lmB${k}`, nb(Bq, Ct, [1.5, -1.6, -2.2][k], [0.34, 0.52, 0.34][k]),
          `${Math.abs(x.nB).toFixed(1)}`, { on: !!(s.sheet && s.lbl) });
      dw.setDashLine(`clos${k}`, [At, Bq]);
    });

    // the live structure
    const L = d.live;
    const ALp = fp(L.A), CLp = fp(L.C), BLp = fp(L.B);
    dw.setSeg('mAL', ALp, CLp);
    dw.setSeg('mBL', CLp, BLp);
    dw.setDisk('ndCL', CLp);
    dw.setDisk('supBL', BLp);
    dw.setDashLine('closL', [ALp, BLp]);
    const nbL = (p, q, t) => V.add(V.add(p, V.mul(V.sub(q, p), 0.30)),
                                   V.mul(V.unit(V.perp(V.sub(q, p))), t));
    put('lmAL', nbL(ALp, CLp, -2.6), `${Math.abs(L.nA).toFixed(1)}`, { on: !!s.lbl });
    put('lmBL', nbL(BLp, CLp, 2.6), `${Math.abs(L.nB).toFixed(1)}`, { on: !!s.lbl });
    // the statical depth, dimensioned from the closing line down to the node
    const sx = FA[0] + S.xF * MPU;
    dw.setSeg('dimD', [sx, FA[1] + L.yS * MPU], [sx, CLp[1]]);
    put('ldimD', [FA[0] + 2.2, 0.7], `statical depth d = ${L.d.toFixed(3)} m`, { fixed: true });

    // the load, on its line of action, and the two live reactions
    dw.setArrow('fLoad', [CLp[0], CLp[1] + 3.4], [CLp[0], CLp[1] + 0.8]);
    put('lfLoad', d.moves === 'C' ? [CLp[0] + 4.4, CLp[1] + 1.5] : [CLp[0] - 1.2, CLp[1] - 2.0],
        `F₁ = ${d.F1.toFixed(0)} kN`);
    for (const [n, at, R] of [['A', ALp, L.RA], ['B', BLp, L.RB]]) {
      const u = V.unit(R);
      dw.setArrow(`re${n}`, at, V.add(at, V.mul(u, 2.4)));
      put(`lre${n}`, V.add(at, V.mul(u, 3.2)), `${n} = ${V.len(R).toFixed(1)}`);
    }

    // ================================================= force diagram =========
    const P = d.P, Q = d.Q, iP = d.iP;
    dw.setArrow('ff', P, Q);
    put('lff', V.add(V.mid(P, Q), [-3.0, 0]), `F₁ ${d.F1.toFixed(0)}`);
    dw.setDisk('ptI', iP);
    put('lptI', V.add(iP, [-1.3, -1.0]), 'i', { fixed: true });
    dw.setSeg('dimAv', V.add(P, [-1.6, 0]), V.add(iP, [-1.6, 0]));
    put('ldimAv', V.add(V.mid(P, iP), [-4.4, 0]), `A_v ${d.Av.toFixed(1)}`);

    d.sheet.forEach((x, k) => {
      const o = d.poles[k];
      dw.setSeg(`rayA${k}`, o, P);
      dw.setSeg(`rayB${k}`, Q, o);
      dw.setDashLine(`cray${k}`, [o, iP]);
      dw.setDisk(`pole${k}`, o);
      put(`lpole${k}`, V.add(o, [-1.7, 1.1]), `o${k + 1}`, { on: !!(s.sheet && s.lbl) });
    });
    dw.setSeg('rayAL', d.poleL, P);
    dw.setSeg('rayBL', Q, d.poleL);
    dw.setDashLine('crayL', [d.poleL, iP]);
    dw.setDisk('poleL', d.poleL);
    put('lpoleL', V.add(d.poleL, [1.9, -1.3]), 'o', { on: !!s.lbl });

    // the line every pole has to land on
    if (d.moves === 'C') {
      const u = V.unit(V.sub(fp(d.sheet[0].B), fp(d.sheet[0].A)));
      dw.setDashLine('locus', [V.add(iP, V.mul(u, -13.5)), V.add(iP, V.mul(u, 13.5))]);
      put('llocus', V.add(V.add(iP, V.mul(u, 13.0)), [0, -2.8]), 'all the poles on this one line');
    } else {
      const u = V.unit(V.sub(fp(d.sheet[0].C), fp(d.sheet[0].A)));
      dw.setDashLine('locus', [V.add(P, V.mul(u, -2.0)), V.add(P, V.mul(u, 24.0))]);
      put('llocus', V.add(V.add(P, V.mul(u, 21.0)), [-1.2, -2.3]), 'member 1 shared, all the poles on this line');
    }
    dw.setLabel('lkey', [LLP[0] + 3.0, -9.6]);
    dw.setText('lkey', d.sitIdx === 0
      ? 'the key swaps o₁ and o₂ here: o₁ is structure I’s pole, o₂ is structure II’s'
      : 'three closing lines, three poles — and one i');

    declutter(LAB);
    for (const q of LAB) dw.setLabel(q.name, q.p);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const w = panel.section('The situation');
  panel.toggle(w, s, 'sitB', 'situation b) — support B moves instead', () => { s.auto = false; refresh(); });
  panel.toggle(w, s, 'auto', 'let the steps choose the situation', refresh);
  const g = panel.section('What the task turns on');
  panel.slider(g, s, 'depth', 'statical depth d (m)', -0.90, 2.60, 0.01, refresh,
    (v) => `${(+v).toFixed(2)} m${v > 0 ? ' — cable' : ' — arch'}`);
  panel.slider(g, s, 'F1', 'F₁ (kN)', 40, 200, 5, refresh, (v) => `${v} kN`);
  const x = panel.section('What to show');
  panel.toggle(x, s, 'sheet', 'show the sheet’s three structures', refresh);
  panel.toggle(x, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}
