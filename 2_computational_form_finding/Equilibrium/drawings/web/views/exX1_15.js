/**
 * EX X · Task 15.1 and Task 15.2 — the cantilever that cancels the arch
 * Structural Design I, HS 22, sheet EX X "Additional Exercises", page 15.
 *
 * TEXT (verbatim, English sheet).
 *   15.1 "Cantilever of an arch-cable structure. Design the cantilever of the
 *         arch-cable structure so that the horizontal force of the cantilever
 *         cancels out the horizontal force of the given arch. Draw the tension
 *         forces in red, compression forces in blue and reaction forces in
 *         green."
 *   15.2 "Arch-cable structure. A fourth force is added to the loading case of
 *         the Task 15.1. Design the form of a possible arch-cable-structure for
 *         the given loading case with the means of graphic statics. Pay
 *         attention to the roller B where the horizontal forces have to cancel
 *         out. Draw tension forces in red, compression forces in blue and
 *         reaction forces in green."
 *   The German 15.1 says where the cancelling happens: "Wählen Sie die
 *   Auskragung so, dass die horizontale Komponente der Auskragung AM ROLLLAGER B
 *   die des vorgegebenen Bogens aufhebt."
 *
 * GIVENS. 15.1  F1 = 60, F2 = 30, F3 = 30 kN and the arch A–I–II–B already
 * drawn (members 1, 2, 3); the cantilever is members 4 and 5.
 *          15.2  F1 = 60, F2 = 30, F4 = 45, F3 = 30 kN and nothing drawn;
 * members 1…6. A = pin, B = roller. Form diagram 1:100, force diagram
 * 1 cm ≙ 15 kN. THE KEY PRINTS NOT ONE NUMBER on this page — everything below
 * is derived here and only afterwards measured against the key's drawing.
 *
 * GEOMETRY. Origin = support A, x right, y up. Digitised with
 *     web/tools/sheetvec.py .../task-en.pdf 15 --scale 100 --min 0.2 --cluster
 *   15.1  A (5.602, 17.081) · B (14.599, 17.081) · load lines 7.102 / 9.351 /
 *         16.848 · the GIVEN arch (5.602,17.081)–(7.102,18.858)–(9.354,19.154)
 *         –(14.599,17.081)
 *   15.2  A (5.604, 0.417) · B (14.601, 0.417) · load lines 7.104 / 9.353 /
 *         11.602 / 16.850
 * Relative to A both figures give the same stations, round to 3 mm at 1:100:
 *     F1 1.500 · F2 3.749 · F4 5.998 · B 8.997 · F3 11.246  (m)
 * so the view uses the intended 1.50 / 3.75 / 6.00 / 9.00 / 11.25 m. The two
 * arch node heights are NOT round: 1.777 and 2.073 m. They encode the thrust.
 *
 * THE GIVEN ARCH ALREADY CARRIES A NUMBER — its thrust. Every arch segment has
 * the same horizontal component H and each node needs H·(m_left − m_right) = F:
 *     m1 = 1.777/1.500 = 1.18467   m2 = (2.073−1.777)/2.250 = 0.13156
 *     m3 = −2.073/5.250 = −0.39486
 *     H = F1/(m1−m2) = 56.974 kN     H = F2/(m2−m3) = 56.990 kN
 * The two agree to 0.03 %, which PROVES the printed arch is the funicular of
 * 60/30 — and 56.98 kN is 3.799 cm at 15 kN/cm, i.e. the arch was drawn with a
 * pole distance of exactly 3.80 cm = 57.00 kN. This view therefore takes
 * H_arch = 57.00 kN (a slider) as the given, which reproduces the drawn node
 * heights as 1.7763 and 2.0724 m — 0.4 mm off the digitised ones.
 *
 * REACTIONS. Both vertical (roller B cannot push sideways; at pin A the tie's
 * pull cancels the arch's push), so plain statics settles them:
 *     15.1  B = (60·1.50 + 30·3.75 + 30·11.25)/9 = 540/9 = 60.0 ↑ · A = 60.0 ↑
 *     15.2  B = (60·1.50 + 30·3.75 + 45·6.00 + 30·11.25)/9 = 810/9 = 90.0 ↑
 *           A = 165 − 90 = 75.0 ↑ · equivalently R = 165 kN at
 *           x̄ = 810/165 = 4.909 m: A = 165·(9−4.909)/9 = 75, B = 165·4.909/9 = 90
 *
 * 15.1 — THE ANSWER. The cantilever is the tie 4 from A out to the tip T on
 * F3's line (it flies straight over B) and the strut 5 from B up to T. Its only
 * free parameter is the tip height y_T; the two members have equal and opposite
 * horizontal components, call it H_cant, and closing node T vertically gives
 *     H_cant·y_T·(1/(x_T−x_B) − 1/x_T) = F3
 *     H_cant·y_T·(1/2.25 − 1/11.25) = 30      →      H_cant·y_T = 84.375 kN·m
 *     H_cant(y_T) = 84.375 / y_T   kN
 * The design condition is H_cant = H_arch, because those are the only two
 * horizontal forces meeting at the roller and the roller supplies none:
 *     y_T* = 84.375 / 57.00 = 1.4803 m        ← THE ANSWER OF 15.1
 * and then
 *     1 A→I  √(57.00²+67.50²) = 88.35 C     2 I→II √(57.00²+ 7.50²) = 57.49 C
 *     3 II→B √(57.00²+22.50²) = 61.28 C     4 A→T  √(57.00²+ 7.50²) = 57.49 T
 *     5 B→T  √(57.00²+37.50²) = 68.23 C     A = B = 60.00 kN ↑
 *     node A ΣH −57.00+57.00 = 0 · ΣV −67.50+7.50+60.00 = 0
 *     node B ΣH +57.00−57.00 = 0 · ΣV −22.50−37.50+60.00 = 0   ← the headline
 *     node T ΣH +57.00−57.00 = 0 · ΣV +37.50− 7.50−30.00 = 0
 * A gift of the sheet's numbers: the tie 4 and the arch segment 2 both carry a
 * vertical component of exactly 7.50 kN over the same thrust, so they are
 * EXACTLY parallel and EXACTLY equal (57.49 kN, one T one C) — which is why the
 * key's force diagram shows the rays "2" and "4" lying on top of one another.
 *
 * 15.2 — ONE FREE PARAMETER, the thrust H. The tie again contributes
 * H·m_tie = 84.375/11.25 = 7.50 kN of vertical at A, so
 *     H·a1 = 75 + 7.50 = 82.50   y1 = 123.750/H
 *     H·a2 = 82.50 − 60 = 22.50  y2 = 174.375/H
 *     H·a3 = 22.50 − 30 = −7.50  y3 = 157.500/H
 *     H·a4 = −7.50 − 45 = −52.50 y_B = 0 exactly — the arch closes for EVERY H
 *     H·m_tie = 7.50   y_T = 84.375/H      H·m_strut = 37.50
 *     at B: 37.50 + 52.50 = 90.00 = B ✓ and ΣH = +H − H = 0 identically
 *     1 √(H²+82.50²) C · 2 √(H²+22.50²) C · 3 √(H²+7.50²) C
 *     4 √(H²+52.50²) C · 5 √(H²+ 7.50²) T · 6 √(H²+37.50²) C
 *     at H = 60.00 kN: 102.01 / 64.08 / 60.47 / 79.73 / 60.47 / 70.75 kN,
 *     y1 2.063 · y2 2.906 · y3 2.625 · y_T 1.406 m
 * Here members 3 and 5 carry the identical 60.47 kN (mirror slopes ±7.50/H).
 *
 * THE KEY, digitised from solution-en.pdf page 15 (--scale 100):
 *   15.1  tip T 1.480 m above the supports (here 1.4803) · poles 3.795 and
 *         3.794 cm = 56.93 / 56.91 kN (here 57.00) · rays 5.884 / 3.827 /
 *         4.080 / 3.827 / 4.543 cm = 88.26 / 57.41 / 61.20 / 57.41 / 68.15 kN
 *         (here 88.35 / 57.49 / 61.28 / 57.49 / 68.23) · reactions 3.998 cm =
 *         59.97 kN each (here 60.00).
 *   15.2  nodes (1.499, 2.058) (3.748, 2.900) (5.998, 2.619) and tip
 *         (11.246, 1.403) — a pole distance of 4.007 cm, so the key chose
 *         H ≈ 60.1 kN (the default here is 60.00). Load line 10.996 cm =
 *         164.9 kN split 60/30/45/30; the division point the key labels "i"
 *         sits 4.998 cm below the top → A = 74.97 kN, and 5.998 cm above the
 *         bottom → B = 89.97 kN. Rays 6.803 / 4.278 / 4.038 / 5.319 / 4.038 /
 *         4.722 cm = 102.05 / 64.17 / 60.57 / 79.79 / 60.57 / 70.83 kN.
 *         The key also draws the resultant R on a line of action 4.907 m right
 *         of A (here 4.909), a pale-red TRIAL funicular with its closing string
 *         dashed, and a trial pole o′ 5.060 cm right of the load line at the
 *         height of i — the classical graphical route to R and to the reaction
 *         split. The moment equation used here lands on the same point i.
 * NO DISAGREEMENT with the key anywhere on this page; every derived number is
 * inside 0.15 % of the drawn one. The only thing worth flagging is a silence:
 * the sheet never says that the given arch of 15.1 IS the funicular of F1 and
 * F2 — if it were not, the task would have no solution. Step 2 checks it.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

// ---------------------------------------------------------------- geometry --
const X1 = 1.50, X2 = 3.75, X4 = 6.00, XB = 9.00, X3 = 11.25;   // m, from A
const YI = 1.777, YII = 2.073;      // the digitised heights of the given arch
const H_SHEET = 57.00;              // ... which is a 3.80 cm pole = 57.00 kN

// ------------------------------------------------------------------ layout --
const MPU = 1.95;                     // drawing units per metre (form diagram)
// 1.3 units lower than the drawing wants: the load arrows and their labels
// have to clear the step-caption card, whose lowest edge is y = 2.53, while
// the form title still clears the RESULT card at y = -11.64
const ORG = [-26.5, -5.7];            // support level of the form diagram
const SFD = 5.5;                      // kN per drawing unit (force diagram)
const KORG = [11.0, 13.6];            // q0, the top of the load line
const KOFF = 2.20;                    // reactions on their own offset line
const KSHIFT = [-22, 0];              // keeps each part's force diagram centred

const fm = (x, y) => [ORG[0] + x * MPU, ORG[1] + y * MPU];
const fkOf = (stage) => (p) =>
  [KORG[0] + p[0] / SFD, KORG[1] + (p[1] + KSHIFT[stage]) / SFD];

// slots, constant across both parts so a member never changes its force-diagram
// partner.  0..3 = the arch, counted BACKWARDS from B, 4 = the tie A–T,
// 5 = the strut B–T.  15.1 leaves slot 0 empty (its arch has three segments).
const NUM = [{ 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 },        // 15.1
             { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6 }]; // 15.2
const LABPOS = [[0.50, 1], [0.45, 1], [0.50, -1], [0.58, 1], [0.42, -1], [0.58, -1]];
const RLABT = [0.44, 0.66, 0.30, 0.78, 0.52, 0.62];
const PART = ['15.1  cantilever of a GIVEN arch', '15.2  the whole form, F4 added'];
const STAGE_AT = [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1];
const FIRST_OF = [1, 7];

const DEFAULTS = {
  F1: 60, F2: 30, F3: 30, F4: 45,
  Harch: H_SHEET, yT: 84.375 / H_SHEET, H: 60.0,
  auto: true, lbl: true, res: true,
  stage: 0, _k: 0,
};

// the tip height that makes the cantilever's thrust equal to `H`
const tipFor = (F3, H) => F3 / (H * (1 / (X3 - XB) - 1 / X3));

// ----------------------------------------------------------------- compute --
function compute(s) {
  const stage = Math.round(s.stage);
  const { F1, F2, F3, F4 } = s;
  const mem = [null, null, null, null, null, null];
  const ray = [null, null, null, null, null, null];
  const put = (k, p, q, N, tension) => { mem[k] = { p, q, N, tension, num: NUM[stage][k] }; };
  let d = { stage, F1, F2, F3, F4, mem, ray, dup: [null, null], lbl: s.lbl };

  if (stage === 0) {
    // ---- 15.1 : the arch is GIVEN, the cantilever is the design -----------
    // its thrust, read off the drawn arch twice (the funicular check)
    const m1 = YI / X1, m2 = (YII - YI) / (X2 - X1), m3 = -YII / (XB - X2);
    const hChk = [F1 / (m1 - m2), F2 / (m2 - m3)];
    const H = s.Harch;                       // the exact funicular of that thrust
    const Aarch = (F1 * (XB - X1) + F2 * (XB - X2)) / XB;      // 67.5
    const Barch = F1 + F2 - Aarch;                             // 22.5
    const yI = (Aarch * X1) / H;
    const yII = yI + ((Aarch - F1) * (X2 - X1)) / H;
    const yT = s.auto ? tipFor(F3, H) : s.yT;
    const Hc = F3 / (yT * (1 / (X3 - XB) - 1 / X3));            // the cantilever's thrust
    const resid = H - Hc;                    // what the roller would have to take
    const yTstar = tipFor(F3, H);
    const vTie = (Hc * yT) / X3;             // vertical component of the tie at A
    const vStr = (Hc * yT) / (X3 - XB);      // ... of the strut at B
    const Av = Aarch - vTie, Bv = Barch + vStr;

    const A = [0, 0], I = [X1, yI], II = [X2, yII], B = [XB, 0], T = [X3, yT];
    put(1, A, I, Math.hypot(H, Aarch), false);
    put(2, I, II, Math.hypot(H, Aarch - F1), false);
    put(3, II, B, Math.hypot(H, Aarch - F1 - F2), false);
    put(4, A, T, Math.hypot(Hc, vTie), true);
    put(5, B, T, Math.hypot(Hc, vStr), false);

    // force diagram: load line from its top q0 = 0, downwards
    const q0 = [0, 0], q1 = [0, -F1], q2 = [0, -F1 - F2], q3 = [0, -F1 - F2 - F3];
    const ip = [0, -Av];
    const L = [-H, -Aarch];
    const R = [Hc, q3[1] + vStr];
    ray[1] = [L, q0]; ray[2] = [L, q1]; ray[3] = [L, q2];
    ray[4] = [R, q2];
    ray[5] = [q3, R];
    const dup = [[L, [L[0] + Hc, L[1] + vTie]],          // the tie again, at node A
                 [ip, [ip[0] + H, ip[1] - (Aarch - F1 - F2) * -1 * 0 - (Barch)]]];
    // node B's polygon edge: from i along member 3's direction
    dup[1] = [ip, [ip[0] + H, ip[1] - Barch]];
    // the gap that the roller would have to close, drawn where it happens
    const gap = [[H, ip[1] - Barch], R];

    d = { ...d,
      H, Hc, resid, yT, yTstar, yI, yII, Aarch, Barch, Av, Bv, hChk,
      nodes: { A, I, II, B, T }, ray, dup, gap,
      loads: [['F1', q0, q1], ['F2', q1, q2], ['F3', q2, q3]],
      reacs: [['A', ip, q0], ['B', q3, ip]],
      poles: [['o', L], ['o′', R]],
      ipoint: ip,
      R: F1 + F2 + F3, xbar: (F1 * X1 + F2 * X2 + F3 * X3) / (F1 + F2 + F3),
      A: Av, B: Bv, ok: Math.abs(resid) < 0.005 };
  } else {
    // ---- 15.2 : nothing given, one free thrust ----------------------------
    const H = s.H;
    const Rtot = F1 + F2 + F3 + F4;
    const xbar = (F1 * X1 + F2 * X2 + F4 * X4 + F3 * X3) / Rtot;
    const Bv = (F1 * X1 + F2 * X2 + F4 * X4 + F3 * X3) / XB;
    const Av = Rtot - Bv;
    const yT = tipFor(F3, H);
    const vTie = (H * yT) / X3, vStr = (H * yT) / (X3 - XB);
    const sh = [Av + vTie];                          // H·slope, panel by panel
    sh.push(sh[0] - F1); sh.push(sh[1] - F2); sh.push(sh[2] - F4);
    const y1 = (sh[0] * X1) / H;
    const y2 = y1 + (sh[1] * (X2 - X1)) / H;
    const y3 = y2 + (sh[2] * (X4 - X2)) / H;
    const yB = y3 + (sh[3] * (XB - X4)) / H;         // must be 0

    const A = [0, 0], n1 = [X1, y1], n2 = [X2, y2], n3 = [X4, y3], B = [XB, 0], T = [X3, yT];
    put(0, A, n1, Math.hypot(H, sh[0]), false);
    put(1, n1, n2, Math.hypot(H, sh[1]), false);
    put(2, n2, n3, Math.hypot(H, sh[2]), false);
    put(3, n3, B, Math.hypot(H, sh[3]), false);
    put(4, A, T, Math.hypot(H, vTie), true);
    put(5, B, T, Math.hypot(H, vStr), false);

    const q0 = [0, 0], q1 = [0, -F1], q2 = [0, -F1 - F2], q3 = [0, -F1 - F2 - F4];
    const q4 = [0, -Rtot];
    const ip = [0, -Av];
    const L = [-H, -sh[0]];
    const Rp = [H, q4[1] + vStr];
    ray[0] = [L, q0]; ray[1] = [L, q1]; ray[2] = [L, q2]; ray[3] = [L, q3];
    ray[4] = [L, ip];
    ray[5] = [q4, Rp];
    const dup = [[Rp, q3], [ip, Rp]];      // the tie at node T · node B's edge

    d = { ...d,
      H, yT, y1, y2, y3, yB, Av, Bv, sh, vTie, vStr, Rtot, xbar,
      nodes: { A, n1, n2, n3, B, T }, ray, dup, gap: null,
      loads: [['F1', q0, q1], ['F2', q1, q2], ['F4', q2, q3], ['F3', q3, q4]],
      reacs: [['A', ip, q0], ['B', q4, ip]],
      poles: [['o', L], ['o′', Rp]],
      ipoint: ip,
      R: Rtot, resid: 0, Hc: H, A: Av, B: Bv, ok: true };
  }
  return d;
}

// ------------------------------------------------------------------- steps --
// a caption may only read the fields of the part it is about: the panel (and
// the regression harness) can park the view on one part while the step index
// belongs to the other
const only = (stg, fn) => (d, st) => (d.stage === stg ? fn(d, st) : []);
const STEPS = [
  { t: 'The exercise',
    d: 'page 15 twice asks the same question about one roller. In 15.1 an arch is already drawn and you have to hang a cantilever off it whose sideways push exactly undoes the arch’s. In 15.2 nothing is drawn, a fourth load is added, and the whole form is yours — but the roller still has to come out with no horizontal force on it' },

  { t: '15.1 The arch is GIVEN — and it is a funicular', d: 'before anything else, check what has been handed to you. An arch under vertical loads carries the same horizontal force in every segment, so each node fixes that force on its own. Do it twice and the two answers must agree — if they did not, the drawn arch would not be in equilibrium and the task would have no solution',
    detail: only(0, (d) => [`node I:  H = F1/(m1 − m2) = ${d.F1.toFixed(0)}/(${(YI / X1).toFixed(5)} − ${((YII - YI) / (X2 - X1)).toFixed(5)}) = ${d.hChk[0].toFixed(3)} kN`,
                    `node II: H = F2/(m2 − m3) = ${d.F2.toFixed(0)}/(${((YII - YI) / (X2 - X1)).toFixed(5)} + ${(YII / (XB - X2)).toFixed(5)}) = ${d.hChk[1].toFixed(3)} kN`,
                    `they agree to ${(100 * Math.abs(d.hChk[0] - d.hChk[1]) / d.hChk[0]).toFixed(3)} % — and ${((d.hChk[0] + d.hChk[1]) / 2).toFixed(2)} kN is 3.80 cm at 15 kN/cm, so the arch was drawn with a 3.80 cm pole`]),
    take: 'the sheet never says the given arch is funicular. It has to be, and this is how you know' },

  { t: '15.1 The reactions', d: 'they are settled before any design choice: the roller takes no horizontal force, the tie at A will cancel the arch’s push, so both reactions are vertical and one moment equation gives them',
    detail: (d) => [`ΣM about A:  B × ${XB.toFixed(2)} = ${d.F1.toFixed(0)}×${X1.toFixed(2)} + ${d.F2.toFixed(0)}×${X2.toFixed(2)} + ${d.F3.toFixed(0)}×${X3.toFixed(2)} = ${(d.F1 * X1 + d.F2 * X2 + d.F3 * X3).toFixed(2)} kNm`,
                    `B = ${((d.F1 * X1 + d.F2 * X2 + d.F3 * X3) / XB).toFixed(2)} kN ↑ · A = ${(d.F1 + d.F2 + d.F3).toFixed(0)} − ${((d.F1 * X1 + d.F2 * X2 + d.F3 * X3) / XB).toFixed(2)} = ${(d.F1 + d.F2 + d.F3 - (d.F1 * X1 + d.F2 * X2 + d.F3 * X3) / XB).toFixed(2)} kN ↑`,
                    'both round, and both independent of the cantilever’s shape'] },

  { t: '15.1 The cantilever has a thrust of its own', d: 'the tip is held by exactly two members — a tie back to A and a strut up from B — so their horizontal components are equal and opposite. Close the tip vertically and that common horizontal force comes out as a pure function of how high you put the tip: raise the tip and the cantilever pushes less',
    detail: (d) => [`H_cant · y_T · (1/${(X3 - XB).toFixed(2)} − 1/${X3.toFixed(2)}) = F3  →  H_cant · y_T = ${(d.F3 / (1 / (X3 - XB) - 1 / X3)).toFixed(3)} kN·m`,
                    `so H_cant = ${(d.F3 / (1 / (X3 - XB) - 1 / X3)).toFixed(3)} / y_T · at y_T = ${d.yT.toFixed(4)} m that is ${d.Hc.toFixed(2)} kN`,
                    'nothing about the arch has been used yet — this is the cantilever on its own'],
    take: 'drag the tip height in the panel and watch H_cant move' },

  { t: '15.1 The roller decides', d: 'now put the two halves together at B. The arch arrives pushing outward with H_arch, the strut arrives pushing back with H_cant, and the roller can supply nothing horizontal at all. So the design condition is one equation, and it fixes the tip height',
    detail: only(0, (d) => [`H_cant = H_arch:  ${(d.F3 / (1 / (X3 - XB) - 1 / X3)).toFixed(3)} / y_T = ${d.H.toFixed(2)}  →  y_T* = ${d.yTstar.toFixed(4)} m`,
                    `now y_T = ${d.yT.toFixed(4)} m → H_cant = ${d.Hc.toFixed(2)} kN against H_arch = ${d.H.toFixed(2)} kN`,
                    d.ok ? 'unbalanced horizontal force at B: 0.00 kN ✓ the roller is happy'
                         : `UNBALANCED at B: ${d.resid.toFixed(2)} kN — the roller cannot take it, so this form is not in equilibrium`]),
    take: (d) => (d.ok ? 'the red arrow at B has vanished: that is the whole of task 15.1'
                       : 'the red arrow at B is the force the roller would have to invent. Put the tip back on the answer') },

  { t: '15.1 The force diagram', d: 'the arch gets a pole to the LEFT of the load line, the cantilever one to the RIGHT, and each is its own thrust away from it. Read the members off the rays: every ray is parallel to the member it stands for, and hovering one lights up the pair',
    detail: only(0, (d) => [`load line ${(d.F1 + d.F2 + d.F3).toFixed(0)} kN, stacked F1 / F2 / F3, split ${d.Av.toFixed(2)} above i and ${d.Bv.toFixed(2)} below`,
                    `left pole ${d.H.toFixed(2)} kN out · right pole ${d.Hc.toFixed(2)} kN out`,
                    d.ok ? 'the two pole distances are equal, so the whole diagram closes'
                         : `they differ by ${Math.abs(d.resid).toFixed(2)} kN and node B’s polygon stays open by exactly that much`]),
    take: 'both poles the same distance from the load line — that is the roller condition, drawn' },

  { t: '15.1 The finished diagram, and three checks',
    d: (d) => (d.ok
      ? 'two poles, one on each side of the load line, both exactly H away from it — that equality IS the answer. The gap that was open in node B’s polygon has closed, and the two rays for members 2 and 4 fall on top of each other because those two members happen to carry the same 7.50 kN of vertical over the same thrust'
      : 'the two poles are NOT the same distance from the load line, so node B’s polygon cannot close: the pink horizontal segment on the right is the hole in it, and it is exactly the force the roller would have to supply. Put the tip back on its answer and it shuts'),
    detail: only(0, (d) => [`1 ${d.mem[1].N.toFixed(2)} C · 2 ${d.mem[2].N.toFixed(2)} C · 3 ${d.mem[3].N.toFixed(2)} C · 4 ${d.mem[4].N.toFixed(2)} T · 5 ${d.mem[5].N.toFixed(2)} C`,
                    `node A ΣH ${(-d.H + d.Hc).toFixed(2)} · ΣV ${(-d.Aarch + (d.Hc * d.yT) / X3 + d.Av).toFixed(2)}   node B ΣH ${(d.H - d.Hc).toFixed(2)} · ΣV ${(-d.Barch - (d.Hc * d.yT) / (X3 - XB) + d.Bv).toFixed(2)}`,
                    `A = ${d.Av.toFixed(2)} kN ↑ · B = ${d.Bv.toFixed(2)} kN ↑ · members 2 and 4 both ${d.mem[2].N.toFixed(2)} kN, one C one T`]),
    take: 'the key draws exactly this, with the tip 1.480 m above the supports' },

  { t: '15.2 A fourth load, and nothing drawn', d: 'F4 = 45 kN goes on between F2 and the roller, and this time not one member is given. The reactions still come first, and they still do not care what shape you choose — take moments, or find the resultant and split it',
    detail: only(1, (d) => [`R = ${d.Rtot.toFixed(0)} kN on a line of action x̄ = ${(d.F1 * X1 + d.F2 * X2 + d.F4 * X4 + d.F3 * X3).toFixed(2)}/${d.Rtot.toFixed(0)} = ${d.xbar.toFixed(3)} m from A`,
                    `A = R·(${XB.toFixed(2)} − x̄)/${XB.toFixed(2)} = ${d.Av.toFixed(2)} kN ↑ · B = R·x̄/${XB.toFixed(2)} = ${d.Bv.toFixed(2)} kN ↑`,
                    'the key finds the same split graphically: a trial funicular, a closing string, and the point it calls i on the load line']),
    take: 'the point i on the load line is just A and B meeting — the key reaches it with a trial pole o′, the arithmetic reaches it in one line' },

  { t: '15.2 Choose the thrust, get the whole form', d: 'one number is still free — how hard the thing pushes sideways — and it draws everything: four arch panels, the tie out to the tip and the strut up from B. The arch lands back on B for every choice, because that closure is nothing but the moment equation again',
    detail: only(1, (d) => [`H = ${d.H.toFixed(2)} kN → y1 ${d.y1.toFixed(3)} · y2 ${d.y2.toFixed(3)} · y3 ${d.y3.toFixed(3)} · tip y_T ${d.yT.toFixed(3)} m`,
                    `panel shears H·slope: ${d.sh.map((v) => v.toFixed(2)).join(' / ')} kN · closure at B ${d.yB.toExponential(1)} m`,
                    `and at the roller: arch brings ${d.H.toFixed(2)} kN, strut 6 brings ${d.H.toFixed(2)} kN back — ΣH = 0 for EVERY H`]),
    take: 'the roller condition is automatic here; what it really costs is that the tip height is not free — y_T = 84.375/H' },

  { t: '15.2 The force diagram', d: 'the same two-pole picture as 15.1, one panel wider. Both poles sit the same H from the load line, which is the roller condition drawn rather than written; the ray for the tie appears twice, once in node A’s polygon and once in node T’s, and node B closes on the segment from i to the right pole',
    detail: only(1, (d) => [`1 ${d.mem[0].N.toFixed(2)} C · 2 ${d.mem[1].N.toFixed(2)} C · 3 ${d.mem[2].N.toFixed(2)} C · 4 ${d.mem[3].N.toFixed(2)} C · 5 ${d.mem[4].N.toFixed(2)} T · 6 ${d.mem[5].N.toFixed(2)} C`,
                    `members 3 and 5 both ${d.mem[2].N.toFixed(2)} kN — mirror slopes ±${(7.5).toFixed(2)}/H, one C one T`,
                    `the key drew this at a 4.007 cm pole, i.e. H ≈ 60.1 kN; everything above matches its rays inside 0.15 %`]),
    take: 'drag H and watch the arch breathe while every reaction, and the answer to the roller question, stays put' },

  { t: '15.2 What the page was about', d: 'blue is compression and pink tension, so read the finished picture: an arch of four compressed panels, a tie flying over the roller to the cantilever tip, and one strut standing on the roller. The tie and the last arch panel push the roller in opposite directions with the same force, which is why it can be a roller at all',
    detail: only(1, (d) => [`A = ${d.Av.toFixed(2)} kN ↑ · B = ${d.Bv.toFixed(2)} kN ↑ · both vertical, whatever H you chose`,
                    `largest force: member 1 at ${d.mem[0].N.toFixed(2)} kN compression · the tie 5 pulls ${d.mem[4].N.toFixed(2)} kN`,
                    `ΣH at the roller B = 0.00 kN · the arch closes on B to ${d.yB.toExponential(1)} m`]),
    take: 'the same one-equation idea as 15.1 — only here it is satisfied by construction, and the price is that the tip height is no longer yours to pick' },
];

// ------------------------------------------------------------------- meta ---
export const meta = {
  title: 'EX X · 15.1 + 15.2 — the roller that must not be pushed',
  subtitle: 'Structural Design I · sheet EX X “Additional Exercises”, page 15 (tasks 15.1 and 15.2)',
  about: 'A roller support cannot be pushed sideways, and that single fact is the whole of page 15. In 15.1 an arch is drawn for you and you have to design the cantilever that hangs past the roller so that its horizontal force exactly undoes the arch’s: one equation, one answer, the tip lands 1.480 m above the supports. In 15.2 a fourth load is added and nothing at all is drawn, so the thrust becomes a free design choice — and the roller condition turns out to be satisfied automatically, at the price of the tip height no longer being free. The sheet prints no numbers on either half, so every figure in this view is derived from the digitised geometry and then measured against the key’s drawing, which it matches everywhere inside 0.15 %. The check to watch is the horizontal one at B: it must come out zero, and when the tip is dragged off its answer a red arrow appears there to show exactly how far off it is.',
  // four lines per stage, not five: the RESULT card is as tall as its text and
  // the form diagram has to fit between it and the step caption
  result: (d) => (d.stage === 0 ? [
    `15.1 the given arch: both nodes give H = ${d.hChk[0].toFixed(3)} / ${d.hChk[1].toFixed(3)} kN — it IS the funicular of ${d.F1.toFixed(0)}/${d.F2.toFixed(0)}; take H_arch = ${d.H.toFixed(2)} kN`,
    `15.1 ANSWER — the tip goes y_T* = ${(d.F3 / (1 / (X3 - XB) - 1 / X3)).toFixed(3)}/${d.H.toFixed(2)} = ${d.yTstar.toFixed(4)} m above the supports at x = ${X3.toFixed(2)} m; H_cant = H_arch = ${d.H.toFixed(2)} kN`,
    `15.1 members: 1 = ${d.mem[1].N.toFixed(2)} C · 2 = ${d.mem[2].N.toFixed(2)} C · 3 = ${d.mem[3].N.toFixed(2)} C · 4 = ${d.mem[4].N.toFixed(2)} T · 5 = ${d.mem[5].N.toFixed(2)} C${d.ok ? '  (2 and 4 exactly parallel and equal)' : '  — off the answer, so NOT an equilibrium state'}`,
    `15.1 A = ${d.Av.toFixed(2)} ↑ · B = ${d.Bv.toFixed(2)} ↑, both vertical · unbalanced horizontal force at B = ${Math.abs(d.resid).toFixed(2)} kN ${d.ok ? '✓ · the key’s drawn tip 1.480 m agrees to 0.15 %' : '✗ — the tip is off its answer'}`,
  ] : [
    `15.2 R = ${d.Rtot.toFixed(0)} kN at x̄ = ${d.xbar.toFixed(3)} m → A = ${d.Av.toFixed(2)} kN ↑ · B = ${d.Bv.toFixed(2)} kN ↑, both vertical`,
    `15.2 free choice H = ${d.H.toFixed(2)} kN → arch ${d.y1.toFixed(3)} / ${d.y2.toFixed(3)} / ${d.y3.toFixed(3)} m · tip y_T = ${(d.F3 / (1 / (X3 - XB) - 1 / X3)).toFixed(3)}/H = ${d.yT.toFixed(4)} m, and it still closes on B`,
    `15.2 members: 1 = ${d.mem[0].N.toFixed(2)} C · 2 = ${d.mem[1].N.toFixed(2)} C · 3 = ${d.mem[2].N.toFixed(2)} C · 4 = ${d.mem[3].N.toFixed(2)} C · 5 = ${d.mem[4].N.toFixed(2)} T · 6 = ${d.mem[5].N.toFixed(2)} C`,
    `15.2 roller check: 4 gives +${d.H.toFixed(2)}, 6 −${d.H.toFixed(2)} kN → ΣH = 0.00 kN for every H · the key’s own drawing matches to 2 mm`,
  ]),
  frame: [[-31, -21], [27, 17]],
};

// ------------------------------------------------------------------ create --
export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;

  const gate = (map) => (st, dd) => !!dd && map[dd.stage] !== undefined
                                    && st._k >= map[dd.stage];
  const memColor = (k) => ({
    pending: PAL.black,
    final: (dd) => (!dd || !dd.mem[k] ? PAL.grey : dd.mem[k].tension ? PAL.red : PAL.blue),
  });

  dw.label('tForm', '', { cls: 'title', flash: false });
  dw.label('tForce', 'Force diagram   1 cm ≙ 15 kN', { cls: 'title', flash: false,
    when: (st, dd) => !!dd && st._k >= (dd.stage === 0 ? 5 : 9) });

  // ---- supports
  const GS = gate({ 0: 1, 1: 7 });
  for (const n of ['A', 'B']) {
    dw.strokes(`sup${n}`, 3, { intro: 1, when: GS, w: dw.W.bar, color: PAL.black, flash: false });
    dw.strokes(`hat${n}`, 5, { intro: 1, when: GS, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.label(`lsup${n}`, n, { cls: 'point', intro: 1, when: GS, flash: false });
  }
  dw.seg('rollB', { intro: 1, when: GS, w: dw.W.dim, color: PAL.black, flash: false });

  // ---- load lines + loads (F4 only in 15.2)
  const LOADX = [X1, X2, X3, X4];
  const LG = [GS, GS, GS, gate({ 1: 7 })];
  ['F1', 'F2', 'F3', 'F4'].forEach((nm, i) => {
    dw.dashLine(`ll${i}`, { intro: 1, when: LG[i], color: PAL.grey, dash: dw.W.dash, flash: false });
    dw.arrow(`ld${i}`, { intro: 1, when: LG[i], color: PAL.green, ...ARR });
    dw.label(`lld${i}`, '', { cls: 'num', intro: 1, when: LG[i], color: PAL.green });
  });

  // ---- reactions
  const GR = gate({ 0: 2, 1: 7 });
  for (const n of ['A', 'B']) {
    dw.arrow(`re${n}`, { intro: 2, when: GR, color: PAL.green, ...ARR });
    dw.label(`lre${n}`, '', { cls: 'num', intro: 2, when: GR, color: PAL.green });
  }
  // 15.2 only: the resultant of the four loads on its own line of action
  const GRES = (st, dd) => !!dd && dd.stage === 1 && st._k >= 7 && st.res;
  dw.dashLine('llR', { intro: 7, when: GRES, color: PAL.green, dash: dw.W.dash, flash: false });
  dw.arrow('resR', { intro: 7, when: GRES, color: PAL.green, ...ARR });
  dw.label('lresR', '', { cls: 'num', intro: 7, when: GRES, color: PAL.green });

  // ---- the given arch of 15.1 appears one step before the cantilever
  const GA = (st, dd) => !!dd && (dd.stage === 1 ? st._k >= 8 : st._k >= 1);
  const GC = (st, dd) => !!dd && (dd.stage === 1 ? st._k >= 8 : st._k >= 3);
  const hasM = (k) => (st, dd) => !!dd && !!dd.mem[k] && (k >= 4 ? GC : GA)(st, dd);
  for (let k = 0; k < 6; k++) {
    dw.seg(`mem${k}`, { intro: 1, when: hasM(k), w: dw.W.bar, color: memColor(k) });
    dw.label(`lmem${k}`, '', { cls: 'num', intro: 1, when: hasM(k), color: memColor(k) });
  }
  const NODEN = ['A', 'I', 'II', 'B', 'T', 'n1', 'n2', 'n3'];
  for (const n of NODEN) {
    dw.disk(`jt${n}`, { intro: 1, r: dw.W.disk * 0.8,
      when: (st, dd) => !!dd && !!dd.nodes[n] && (n === 'T' ? GC : GA)(st, dd) });
  }

  // ---- the unbalanced horizontal force at the roller (15.1, off the answer)
  const GBAD = (st, dd) => !!dd && dd.stage === 0 && st._k >= 4 && !dd.ok;
  dw.arrow('badB', { intro: 4, when: GBAD, color: PAL.red, ...ARR });
  dw.label('lbadB', '', { cls: 'num', intro: 4, when: GBAD, color: PAL.red });
  dw.seg('gapK', { intro: 4, w: dw.W.bar, color: PAL.red,
    when: (st, dd) => GBAD(st, dd) && st._k >= 5 });

  // ---- force diagram
  const GF = gate({ 0: 5, 1: 9 });
  for (let i = 0; i < 4; i++) {
    dw.arrow(`fl${i}`, { intro: 5, when: (st, dd) => GF(st, dd) && i < dd.loads.length,
      color: PAL.green, ...NARR });
    dw.label(`lfl${i}`, '', { cls: 'num', intro: 5, color: PAL.green,
      when: (st, dd) => GF(st, dd) && i < dd.loads.length });
  }
  for (let i = 0; i < 2; i++) {
    dw.arrow(`fr${i}`, { intro: 5, when: (st, dd) => GF(st, dd) && i < dd.reacs.length,
      color: PAL.green, ...NARR });
    dw.label(`lfr${i}`, '', { cls: 'num', intro: 5, color: PAL.green,
      when: (st, dd) => GF(st, dd) && i < dd.reacs.length });
    dw.disk(`pole${i}`, { intro: 5, r: dw.W.disk * 0.75, when: GF });
    dw.label(`lpole${i}`, '', { cls: 'num', intro: 5, color: PAL.grey, when: GF });
  }
  dw.disk('ptI', { intro: 5, r: dw.W.disk * 0.7, when: GF });
  dw.label('lptI', 'i', { cls: 'num', intro: 5, color: PAL.grey, when: GF, flash: false });
  dw.seg('dimH1', { intro: 5, w: dw.W.dim, color: PAL.grey, flash: false, when: GF });
  dw.seg('dimH2', { intro: 5, w: dw.W.dim, color: PAL.grey, flash: false, when: GF });
  dw.label('ldimH', '', { intro: 5, color: PAL.grey, flash: false, when: GF });
  for (let k = 0; k < 6; k++) {
    dw.seg(`ray${k}`, { intro: 5, w: dw.W.ray, color: memColor(k),
      when: (st, dd) => !!dd && !!dd.ray[k] && GF(st, dd) });
    dw.label(`lray${k}`, '', { cls: 'num', intro: 5, color: PAL.grey,
      when: (st, dd) => !!dd && !!dd.ray[k] && GF(st, dd) && st.lbl });
  }
  dw.seg('ray6', { intro: 5, w: dw.W.ray, color: memColor(4),
    when: (st, dd) => !!dd && !!dd.dup[0] && GF(st, dd) });
  dw.seg('ray7', { intro: 5, w: dw.W.ray, color: memColor(3),
    when: (st, dd) => !!dd && !!dd.dup[1] && GF(st, dd) });

  for (let k = 0; k < 6; k++) {
    const g = [`mem${k}`, `ray${k}`, `lmem${k}`, `lray${k}`];
    if (k === 4) g.push('ray6');
    if (k === 3) g.push('ray7');
    dw.link(...g);
  }
  dw.instant('tForm', 'tForce', 'supA', 'supB', 'hatA', 'hatB', 'rollB',
             'lsupA', 'lsupB', 'll0', 'll1', 'll2', 'll3');

  let d = null;
  let lastK = -1;
  function refresh() {
    // the step normally chooses which part is on show; between steps the panel
    // slider (and a regression harness) may override it
    if (player && player.k !== lastK) {
      lastK = player.k;
      s.stage = STAGE_AT[Math.min(player.k, STAGE_AT.length - 1)];
    }
    s._k = player.k;
    if (s.auto) s.yT = tipFor(s.F3, s.Harch);
    d = compute(s);
    const fk = fkOf(d.stage);

    // ---------------------------------------------------------- form diagram
    const P = {};
    for (const n of NODEN) if (d.nodes[n]) P[n] = fm(...d.nodes[n]);
    const top = Math.max(...Object.values(d.nodes).map((p) => p[1]), 0);

    for (const n of ['A', 'B']) {
      const p = fm(n === 'A' ? 0 : XB, 0), h = 0.42 * MPU, w = 0.42 * MPU;
      dw.setStrokes(`sup${n}`, [[p, [p[0] - w, p[1] - h]],
                                [[p[0] - w, p[1] - h], [p[0] + w, p[1] - h]],
                                [[p[0] + w, p[1] - h], p]]);
      const base = n === 'A' ? p[1] - h : p[1] - h - 0.30 * MPU;
      dw.setStrokes(`hat${n}`, V.hatch([p[0] - w * 1.25, base], [p[0] + w * 1.25, base], -1, 0.42 * MPU, 5));
      dw.setLabel(`lsup${n}`, [p[0] + (n === 'A' ? -2.1 : 2.1), p[1] + (n === 'A' ? 0.3 : -1.0)]);
    }
    const pB = fm(XB, 0);
    dw.setSeg('rollB', [pB[0] - 0.55 * MPU, pB[1] - 0.56 * MPU], [pB[0] + 0.55 * MPU, pB[1] - 0.56 * MPU]);

    const LV = [d.F1, d.F2, d.F3, d.F4];
    const arrTop = (top + 0.95) * MPU;
    LOADX.forEach((x, i) => {
      const base = fm(x, 0);
      dw.setDashLine(`ll${i}`, [[base[0], base[1] - 0.9], [base[0], ORG[1] + arrTop + 0.55]]);
      dw.setArrow(`ld${i}`, [base[0], ORG[1] + arrTop], [base[0], ORG[1] + arrTop - 1.6]);
      dw.setLabel(`lld${i}`, [base[0] + 1.9, ORG[1] + arrTop - 0.6]);
      dw.setText(`lld${i}`, `${['F1', 'F2', 'F3', 'F4'][i]} = ${LV[i].toFixed(0)}`);
    });

    for (const [n, sgn] of [['A', -1], ['B', 1]]) {
      const p = fm(n === 'A' ? 0 : XB, 0), val = n === 'A' ? d.A : d.B;
      const up = val >= 0, L = 2.3, gp = 1.85;
      dw.setArrow(`re${n}`, up ? [p[0], p[1] - gp - L] : [p[0], p[1] - gp],
                            up ? [p[0], p[1] - gp] : [p[0], p[1] - gp - L]);
      dw.setLabel(`lre${n}`, [p[0] + sgn * 3.9, p[1] - gp - L * 0.55]);
      dw.setText(`lre${n}`, `${n} = ${Math.abs(val).toFixed(2)} ${up ? '↑' : '↓'}`);
    }
    { // the resultant of 15.2, on its own line of action
      const px = fm(d.xbar !== undefined ? d.xbar : 0, 0);
      dw.setDashLine('llR', [[px[0], ORG[1] - 3.6], [px[0], ORG[1] + arrTop]]);
      dw.setArrow('resR', [px[0], ORG[1] - 1.1], [px[0], ORG[1] - 3.9]);
      dw.setLabel('lresR', [px[0] - 4.9, ORG[1] - 2.6]);
      dw.setText('lresR', `R = ${d.R.toFixed(0)} at x̄ = ${(d.xbar ?? 0).toFixed(3)} m`);
    }

    for (let k = 0; k < 6; k++) {
      const m = d.mem[k];
      if (!m) { dw.setSeg(`mem${k}`, [0, 0], [0, 0]); dw.setText(`lmem${k}`, ''); continue; }
      const a = fm(...m.p), b = fm(...m.q);
      dw.setSeg(`mem${k}`, a, b);
      const [t, side] = LABPOS[k];
      const at = V.add(a, V.mul(V.sub(b, a), t));
      dw.setLabel(`lmem${k}`, V.add(at, V.mul(V.perp(V.unit(V.sub(b, a))), 1.35 * side)));
      dw.setText(`lmem${k}`, s.lbl ? `${m.num} · ${m.N.toFixed(1)} ${m.tension ? 'T' : 'C'}`
                                   : `${m.num}`);
    }
    for (const n of NODEN) if (P[n]) dw.setDisk(`jt${n}`, P[n]);

    dw.setLabel('tForm', [ORG[0] + 5.6 * MPU, ORG[1] - 4.75]);
    dw.setText('tForm', `${PART[d.stage]}   ·   Form diagram 1:100`);
    // +1.4, not +2.4: the sheet's task text is pinned across the top of the
    // canvas and its banner covers everything above y = 15.82
    dw.setLabel('tForce', [KORG[0], KORG[1] + 1.4]);

    // the unbalanced horizontal force the roller would have to supply
    {
      const p = fm(XB, 0), r = d.resid || 0;
      dw.setArrow('badB', [p[0], p[1] + 1.4], [p[0] + r / SFD, p[1] + 1.4]);
      dw.setLabel('lbadB', [p[0] + r / SFD + (r >= 0 ? 4.4 : -4.4), p[1] + 1.4]);
      dw.setText('lbadB', `ΣH at B = ${r.toFixed(2)} kN ✗`);
    }

    // --------------------------------------------------------- force diagram
    d.loads.forEach(([nm, a, b], i) => {
      dw.setArrow(`fl${i}`, fk(a), fk(b));
      dw.setLabel(`lfl${i}`, V.add(fk(V.mid(a, b)), [-1.6, 0]));
      dw.setText(`lfl${i}`, nm);
    });
    d.reacs.forEach(([nm, a, b], i) => {
      const o = [KOFF, 0];
      dw.setArrow(`fr${i}`, fk(V.add(a, o)), fk(V.add(b, o)));
      dw.setLabel(`lfr${i}`, V.add(fk(V.add(V.mid(a, b), o)), [1.75, 0]));
      dw.setText(`lfr${i}`, `${nm} ${Math.hypot(b[0] - a[0], b[1] - a[1]).toFixed(2)}`);
    });
    d.poles.forEach(([nm, p], i) => {
      dw.setDisk(`pole${i}`, fk(p));
      dw.setLabel(`lpole${i}`, V.add(fk(p), [p[0] < 0 ? -1.3 : 1.3, -0.95]));
      dw.setText(`lpole${i}`, nm);
    });
    dw.setDisk('ptI', fk(d.ipoint));
    dw.setLabel('lptI', V.add(fk(d.ipoint), [-1.1, 0.95]));
    // the two pole distances, dimensioned against each other — the roller test
    const yd = d.loads[d.loads.length - 1][2][1] - 8;
    dw.setSeg('dimH1', fk([d.poles[0][1][0], yd]), fk([0, yd]));
    dw.setSeg('dimH2', fk([0, yd]), fk([d.poles[1][1][0], yd]));
    dw.setLabel('ldimH', V.add(fk([0, yd]), [0, -1.15]));
    dw.setText('ldimH', d.stage === 0
      ? `H_arch ${d.H.toFixed(2)}  |  H_cant ${d.Hc.toFixed(2)} kN  →  ΣH at the roller B = ${d.resid.toFixed(2)} kN`
      : `both poles ${d.H.toFixed(2)} kN from the load line  →  ΣH at the roller B = 0.00 kN`);

    for (let k = 0; k < 6; k++) {
      const r = d.ray[k];
      if (!r) { dw.setSeg(`ray${k}`, [0, 0], [0, 0]); dw.setText(`lray${k}`, ''); continue; }
      const a = fk(r[0]), b = fk(r[1]);
      dw.setSeg(`ray${k}`, a, b);
      dw.setLabel(`lray${k}`, V.add(V.add(a, V.mul(V.sub(b, a), RLABT[k])), [0, 0.9]));
      dw.setText(`lray${k}`, `${d.mem[k] ? d.mem[k].num : ''}`);
    }
    dw.setSeg('ray6', ...(d.dup[0] ? [fk(d.dup[0][0]), fk(d.dup[0][1])] : [[0, 0], [0, 0]]));
    dw.setSeg('ray7', ...(d.dup[1] ? [fk(d.dup[1][0]), fk(d.dup[1][1])] : [[0, 0], [0, 0]]));
    dw.setSeg('gapK', ...(d.gap ? [fk(d.gap[0]), fk(d.gap[1])] : [[0, 0], [0, 0]]));

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const w = panel.section('What to look at');
  panel.slider(w, s, 'stage', 'part', 0, 1, 1,
    () => player.set(FIRST_OF[Math.round(s.stage)]), (v) => PART[Math.round(v)]);
  panel.toggle(w, s, 'lbl', 'show member numbers and forces', refresh);
  panel.toggle(w, s, 'res', '15.2  show the resultant R', refresh);

  const g = panel.section('15.1  the given arch, and your cantilever');
  panel.slider(g, s, 'Harch', 'H_arch — thrust of the GIVEN arch (kN)', 35, 95, 0.25, refresh,
    (v) => `${v.toFixed(2)} kN${Math.abs(v - H_SHEET) < 0.13 ? '  ← the sheet’s arch' : ''}`);
  panel.slider(g, s, 'yT', 'y_T — where you put the cantilever tip (m)', 0.60, 3.20, 0.005,
    () => { s.auto = false; refresh(); },
    (v) => `${v.toFixed(3)} m`);
  panel.toggle(g, s, 'auto', 'put the tip back on the answer', refresh);

  const g2 = panel.section('15.2  your design choice');
  panel.slider(g2, s, 'H', 'H — thrust of the whole structure (kN)', 35, 110, 0.25, refresh,
    (v) => `${v.toFixed(2)} kN${Math.abs(v - 60) < 0.13 ? '  ← close to the key’s 60.1' : ''}`);

  const gv = panel.section('Given');
  panel.slider(gv, s, 'F1', 'F1 (kN)', 20, 100, 5, refresh, (v) => `${v.toFixed(0)} kN`);
  panel.slider(gv, s, 'F2', 'F2 (kN)', 10, 60, 5, refresh, (v) => `${v.toFixed(0)} kN`);
  panel.slider(gv, s, 'F3', 'F3 (kN)', 10, 60, 5, refresh, (v) => `${v.toFixed(0)} kN`);
  panel.slider(gv, s, 'F4', 'F4 (kN, 15.2 only)', 10, 90, 5, refresh, (v) => `${v.toFixed(0)} kN`);

  refresh();
  return player;
}
