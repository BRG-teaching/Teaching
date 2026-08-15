/**
 * EX X · Task 7 — Suspension bridge Sigriswil
 * Structural Design I, HS 22, "Additional Exercises", sheet page 7.
 *
 * TEXT (verbatim, English sheet).
 *   a) "Calculate the total line load s_d on the dimensioning level for ONE of
 *      the two main cables considering the safety factors. Then calculate the
 *      total resultant point load R. Assume the constant area load is
 *      g_k = 1.0 kN/m², and the live load is q_k = 0.7 kN/m²."
 *   b) "Find the maximum force in the cable, the support reaction forces and
 *      the forces in the pylons and backstays assuming that the main cable
 *      (top cable) represents a parabola. Mark tension forces in red,
 *      compression forces in blue and external forces in green."
 *
 * The German sheet names what the English leaves anonymous: "die
 * Beanspruchungen in den PYLONEN (Element 4 und 5) und RÜCKVERANKERUNGEN
 * (Element 3 und 6)", and asks for "die LAGE und Grösse der Auflagerreaktionen"
 * — the lines of action as well as the magnitudes.
 *
 * GIVENS. g_k = 1.0 kN/m², q_k = 0.7 kN/m², deck width b = 1.5 m, gamma_G =
 * 1.35, gamma_Q = 1.5. TWO main cables, and the task is for one of them.
 * Cross section 1:100, form diagram 1:1500, force diagram 1 cm ≙ 200 kN.
 *
 * GEOMETRY, digitised with
 *   web/tools/sheetvec.py .../task-en.pdf 7 --scale 1500 --min 8
 * Origin = II, the top of the LEFT pylon; x right, y up. (The solution page
 * digitises to the same numbers, so the key's answer drawing sits exactly on
 * the given geometry.)
 *
 *   II  left pylon top      0.000     0.000
 *   III right pylon top   287.902   -20.311      -> the tops are NOT level
 *   left pylon foot        -7.998   -28.122
 *   right pylon foot      295.899   -47.416
 *   A   left backstay anchor  -24.966  -15.294
 *   D   right backstay anchor 312.962  -37.004
 *
 *   member 3 left backstay  II -> A   29.278 m  31.49 deg below horizontal
 *   member 4 left pylon     foot-> II 29.237 m  74.13 deg
 *   member 5 right pylon    foot->III 28.260 m 106.44 deg (leans out)
 *   member 6 right backstay III-> D   30.111 m  33.67 deg below horizontal
 *
 * The span digitises 287.902 m = 288.00 m to 0.03 %, and 288 m is the number
 * that makes the key's printed R come out exactly, so the view uses 288.00 m
 * and keeps every member offset exactly as digitised.
 *
 * The SAG f is measured at midspan from the chord II-III down to the cable
 * (the sheet dimensions it twice, chord -> cable -> node I, so node I is 2f
 * below the chord). Two independent reads agree: the dimension strokes at
 * x = 222.008 are offset by 14.091 m, and the drawn red cable pulled out of
 * the solution PDF's own vector artwork (a 64-vertex path, local span
 * 544.271 pt, midspan ordinate 45.839 pt against a chord ordinate of 19.199)
 * gives 26.640 pt x 0.529167 m/pt = 14.093 m. The view uses f = 14.093 m.
 *
 * The cross section at 1:100 confirms the load width: the printed "b = 1.5 m"
 * digitises 1.499 m, and there are exactly TWO main cables (two lines rising
 * outward at 8.99 deg off vertical) plus two stabilising cables at 35.71 deg.
 *
 * DERIVATION (a). Two main cables share a 1.5 m deck, so each takes 0.75 m of
 * tributary width:
 *   s_d = (1.35 x 1.0 + 1.5 x 0.7) x 1.5/2 = 2.400 x 0.75 = 1.800 kN/m
 *   R   = s_d x l = 1.800 x 288.00                        = 518.40 kN
 * Both land exactly on the key's printed values, and 518.4/1.8 = 288 m is the
 * digitised span — which is the check that "one of the two" really does mean
 * halving b. Take the whole 1.5 m and you get 3.6 kN/m and 1036.8 kN.
 *
 * DERIVATION (b). For a parabola under a UDL over the horizontal projection
 * the midspan offset from the chord is w l²/(8H) whether or not the supports
 * are level, so the sag alone fixes the thrust:
 *   H     = s_d l²/(8f)          = 1324.23 kN
 *   V_II  = s_d l/2 + H (dh)/l   =  352.59 kN      (dh = 20.311 m)
 *   V_III = s_d l/2 - H (dh)/l   =  165.81 kN      (sum = 518.40 ✓)
 *   N_1   = sqrt(H^2 + V_II^2)   = 1370.37 kN   <- cable at the HIGHER pylon
 *   N_2   = sqrt(H^2 + V_III^2)  = 1334.57 kN
 * so N_max in the main cable is 1370.4 kN, at II. The cable's lowest point is
 * NOT at midspan but at x = l/2 + dh l/(8f) = 195.88 m from II, 26.08 m below
 * II and 5.77 m below III.
 *
 * Joint equilibrium (tension pulls away from the joint, the pylon pushes it):
 *   node II   N_1 c_1 + N_3 u_3 + N_4 u_4 = 0  ->  N_3 = 2023.0 T, N_4 = 1465.2 C
 *   node III  N_2 c_2 + N_6 u_6 + N_5 u_5 = 0  ->  N_5 = 1359.8 C, N_6 = 2053.5 T
 * Each anchor and each foot carries exactly one member, so each reaction is
 * that member's force, on that member's line:
 *   A = 2023.0 kN  31.49 deg below horizontal, down-left   (-1725.0, -1056.8)
 *   B = 1465.2 kN  74.13 deg up, leaning right             ( +400.8, +1409.4)
 *   C = 1359.8 kN  73.56 deg up, leaning left              ( -384.8, +1304.2)
 *   D = 2053.5 kN  33.67 deg below horizontal, down-right  (+1709.0, -1138.3)
 * Global check: sum Fx = 0.0, sum Fy = +518.4 = R (residual 2e-13 kN).
 *
 * The largest force in the whole system is NOT in the main cable: it is the
 * RIGHT backstay, 2053.5 kN, because the right pylon is shorter and leans
 * more. The question asks for the maximum force IN THE CABLE, 1370.4 kN.
 *
 * WHAT THE OFFICIAL KEY SAYS, AND WHERE WE PART COMPANY.
 *   a) q_d = 1.8 kN/m and R = 518.4 kN — agrees exactly, to every digit.
 *   b) is answered graphically only; the key prints no number. Measured off
 *      its own force diagram at 1 cm ≙ 200 kN (1 dump unit at 1:1500 =
 *      13.3333 kN) it draws R 518.2, ray 1 1369.5, ray 2 1333.7, 3/A 2021.7,
 *      4/B 1464.4, 5/C 1358.9, 6/D 2052.1 kN — every one within 0.07 % of the
 *      values above. Its pole lands at (338.995, 99.599) in the dump against
 *      the (338.99, 99.585) that H and V_II predict. This force diagram is
 *      drawn properly.
 *   ERROR IN THE KEY — the member numbers in its three NODE SKETCHES. Its own
 *   form diagram and force diagram agree with each other: 1 and 2 are the two
 *   halves of the main cable, 3 and 6 the backstays, 4 and 5 the pylons (the
 *   force diagram writes "A 3", "4 B", "5 C", "6 D" on the four outer edges
 *   and 1 / 2 on the two dashed rays). The node sketches contradict that:
 *     node I   labels the two cable halves 3 and 4 — they are 1 and 2;
 *     node II  puts 1 on the down-LEFT arrow and 3 on the down-RIGHT one, but
 *              at II the backstay goes left and the main cable goes right, so
 *              the two are swapped; and it labels the blue pylon 2, not 4;
 *     node III labels the main cable 4 — it is 2. (Its 5 and 6 are right.)
 *   The arrow DIRECTIONS in all three sketches are correct; only the numbers
 *   are wrong, and they read like leftovers from an earlier figure. This view
 *   uses the form/force-diagram numbering throughout.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

// ---- givens ----------------------------------------------------------------
const B_DECK = 1.5;              // m, deck width
const GAM_G = 1.35, GAM_Q = 1.50;
const SPAN = 288.0;              // m (digitises 287.902 at 1:1500)
const DH = 20.311;               // m, II above III
const F_SHEET = 14.093;          // m, sag at midspan below the chord

// digitised member offsets, exactly as measured (metres)
const OFF_A = [-24.966, -15.294];   // II  -> left backstay anchor   (member 3)
const OFF_FL = [-7.998, -28.122];   // II  -> left pylon foot        (member 4)
const OFF_D = [25.060, -16.693];    // III -> right backstay anchor  (member 6)
const OFF_FR = [7.997, -27.105];    // III -> right pylon foot       (member 5)
const STAB = 12.83;                 // m, rise of the stabilising cable above its own chord

const U3 = V.unit(OFF_A);                       // II  -> anchor A
const U4 = V.unit(V.mul(OFF_FL, -1));           // foot -> II
const U5 = V.unit(V.mul(OFF_FR, -1));           // foot -> III
const U6 = V.unit(OFF_D);                       // III -> anchor D
const LEN = { 3: V.len(OFF_A), 4: V.len(OFF_FL), 5: V.len(OFF_FR), 6: V.len(OFF_D) };
const DEG = (u) => (Math.atan2(u[1], u[0]) * 180) / Math.PI;
// inclination to the horizontal, 0..90 deg, whichever quadrant the member is in
const INC = (u) => Math.abs((Math.atan2(u[1], Math.abs(u[0])) * 180) / Math.PI);

// ---- layout ----------------------------------------------------------------
const MPU = 0.135;                 // drawing units per metre, form diagram
const OX = -13.0, OY = 5.0;        // where II sits
const SFD = 200;                   // kN per drawing unit, force diagram
const QX = 9.5, QY = -9.6;         // top of the load line
const XPU = 1.60;                  // drawing units per metre, cross section
const CSX = 31.0, CSY = -15.0;     // centre of the cross section (deck level)
const NSEG = 48;

const DEFAULTS = { qk: 0.7, gk: 1.0, f: F_SHEET, cab: 2, lbl: true, _k: 99 };

function solve2(u, v, rhs) {
  // n1*u + n2*v = rhs
  const det = u[0] * v[1] - v[0] * u[1];
  return [(rhs[0] * v[1] - v[0] * rhs[1]) / det,
          (u[0] * rhs[1] - rhs[0] * u[1]) / det];
}

function compute(s) {
  const nc = Math.round(s.cab);
  const gd = GAM_G * s.gk, qd = GAM_Q * s.qk;
  const sd = ((gd + qd) * B_DECK) / nc;         // kN/m on ONE main cable
  const R = sd * SPAN;
  const f = s.f;
  const H = (sd * SPAN * SPAN) / (8 * f);
  const VII = (sd * SPAN) / 2 + (H * DH) / SPAN;
  const VIII = (sd * SPAN) / 2 - (H * DH) / SPAN;
  const N1 = Math.hypot(H, VII);                // main cable at II
  const N2 = Math.hypot(H, VIII);               // main cable at III
  // the cable force pulling each pylon top toward midspan
  const c1 = [H, -VII], c2 = [-H, -VIII];
  const [N3, N4] = solve2(U3, U4, V.mul(c1, -1));
  const [N6, N5] = solve2(U6, U5, V.mul(c2, -1));

  // where the cable is lowest — not at midspan, because the towers differ
  const xlow = SPAN / 2 + (DH * SPAN) / (8 * f);
  const ylow = -(DH * xlow) / SPAN - ((4 * f) / (SPAN * SPAN)) * xlow * (SPAN - xlow);

  const react = { A: N3, B: N4, C: N5, D: N6 };
  const vec = { A: V.mul(U3, N3), B: V.mul(U4, N4), C: V.mul(U5, N5), D: V.mul(U6, N6) };
  const resid = [vec.A[0] + vec.B[0] + vec.C[0] + vec.D[0],
                 vec.A[1] + vec.B[1] + vec.C[1] + vec.D[1] - R];
  const Nsys = Math.max(N1, N2, N3, N4, N5, N6);
  // are we still on the sheet's own numbers? the key comparison only holds there
  const atSheet = nc === 2 && Math.abs(s.gk - 1.0) < 1e-6 && Math.abs(s.qk - 0.7) < 1e-6
                  && Math.abs(f - F_SHEET) < 0.02;

  return { nc, gd, qd, sd, R, f, H, VII, VIII, N1, N2, N3, N4, N5, N6,
           c1, c2, xlow, ylow, react, vec, resid, Nsys,
           atSheet, Nmax: Math.max(N1, N2), atII: N1 >= N2,
           qk: s.qk, gk: s.gk };
}

export const meta = {
  title: 'EX X · 7 — the Sigriswil suspension bridge, one cable at a time',
  subtitle: 'Structural Design I · HS 22, sheet EX X “Additional Exercises”, task 7 a)–b)',
  about: 'A 288 metre footbridge carried on two main cables. Part a) is a load take-down and it turns on one word: the sheet says “for ONE of the two main cables”, so the 1.5 metre deck is shared and each cable sees only 0.75 metres of it. That halving is the whole difference between the key’s 1.8 kN/m and the 3.6 kN/m a careless reader gets. Part b) is the graphic statics: the two pylon tops are twenty metres apart in height, so the cable is not symmetric, its lowest point is nowhere near midspan, and the two ends carry different forces. Three joints — the pole where the two cable tangents meet, and the two pylon tops — close one single force polygon. The largest force in the whole bridge turns out not to be in the cable at all. Drag the live load, or the sag, and watch the pole slide.',
  result: (d) => [
    `a) s_d = (${GAM_G}·${d.gk.toFixed(2)} + ${GAM_Q}·${d.qk.toFixed(2)})·${B_DECK.toFixed(1)}/${d.nc} = ${d.sd.toFixed(3)} kN/m → R = ${d.R.toFixed(2)} kN${d.atSheet ? ' — the key prints 1.8 kN/m and 518.4 kN ✓' : '  (the sheet’s own values are 1.800 kN/m and 518.40 kN)'}`,
    `b) H = s_d l²/(8f) = ${d.H.toFixed(1)} kN · V_II ${d.VII.toFixed(1)}, V_III ${d.VIII.toFixed(1)} kN · cable N_max = ${d.Nmax.toFixed(1)} kN at ${d.atII ? 'II' : 'III'}`,
    `b) 3 = ${d.N3.toFixed(1)} T · 4 = ${d.N4.toFixed(1)} C · 5 = ${d.N5.toFixed(1)} C · 6 = ${d.N6.toFixed(1)} T kN — the biggest is backstay 6, not the cable`,
    `b) A ${d.react.A.toFixed(0)} kN ${INC(U3).toFixed(1)}° down-left · B ${d.react.B.toFixed(0)} ${INC(U4).toFixed(1)}° up-right · C ${d.react.C.toFixed(0)} ${INC(U5).toFixed(1)}° up-left · D ${d.react.D.toFixed(0)} ${INC(U6).toFixed(1)}° down-right`,
    d.atSheet
      ? 'the key gives no b) numbers; its drawn force diagram scales to within 0.07 % of every value above. Its three node sketches, though, mis-number the members (see the last step)'
      : 'the sliders have left the sheet’s values — reset q̄_k to 0.70, ḡ_k to 1.00, f to 14.09 m and 2 cables to compare against the key'],
  frame: [[-24, -21.6], [36, 21.6]],
};

const STEPS = [
  { t: 'The exercise',
    d: 'a real footbridge — the Panoramabrücke at Sigriswil — reduced to five members and one uniform load. Part a) is a load take-down with one trap in it; part b) is three joints and a single closed force polygon',
    detail: () => ['a) the design line load s_d on ONE of the two main cables, and the resultant R',
                   'b) the maximum cable force, the reactions, and the pylon and backstay forces',
                   'form diagram 1:1500 · cross section 1:100 · force diagram 1 cm ≙ 200 kN'] },
  { t: 'The bridge',
    d: 'digitised from the sheet. The two pylon tops are twenty metres apart in height, which is what makes this more than a symmetric textbook cable: everything downstream of that is lopsided',
    detail: () => [`span II–III = ${SPAN.toFixed(2)} m (digitises 287.902 m at 1:1500) · II stands ${DH.toFixed(3)} m above III`,
                   `3 left backstay ${LEN[3].toFixed(2)} m, ${INC(U3).toFixed(2)}° below horizontal · 4 left pylon ${LEN[4].toFixed(2)} m, ${INC(U4).toFixed(2)}° from horizontal`,
                   `5 right pylon ${LEN[5].toFixed(2)} m, ${INC(U5).toFixed(2)}° (leaning out) · 6 right backstay ${LEN[6].toFixed(2)} m, ${INC(U6).toFixed(2)}° below horizontal`],
    take: 'the grey curve underneath is the stabilising cable — it is drawn because the bridge has one, and it is not part of this calculation' },
  { t: 'a) One of the two cables',
    d: 'the cross section, and the sentence the whole of a) turns on. The deck is 1.5 m wide and it hangs from TWO main cables, so each of them picks up half of it — 0.75 m of tributary width, not 1.5',
    detail: (d) => [`b = ${B_DECK.toFixed(1)} m (the sheet's printed dimension digitises 1.499 m at 1:100)`,
                    `${d.nc} main cable${d.nc > 1 ? 's' : ''} → tributary width ${(B_DECK / d.nc).toFixed(3)} m per cable`,
                    d.nc === 2 ? 'this is the reading the sheet asks for'
                               : 'the whole deck on one cable — everything below doubles, and R comes out 1036.8 kN instead of the key’s 518.4'],
    take: 'set the “cables sharing the deck” slider to 1 and watch R double: that factor of two is the only trap in a)' },
  { t: 'a) The load, designed up and totalled',
    d: 'factor each characteristic load by its own partial factor, add, multiply by the tributary width. Then the resultant is that line load over the whole span, acting at midspan',
    detail: (d) => [`g_d = ${GAM_G} × ${d.gk.toFixed(2)} = ${d.gd.toFixed(3)} kN/m² · q_d = ${GAM_Q} × ${d.qk.toFixed(2)} = ${d.qd.toFixed(3)} kN/m²`,
                    `s_d = (${d.gd.toFixed(3)} + ${d.qd.toFixed(3)}) × ${(B_DECK / d.nc).toFixed(3)} = ${d.sd.toFixed(3)} kN/m`,
                    `R = s_d × l = ${d.sd.toFixed(3)} × ${SPAN.toFixed(2)} = ${d.R.toFixed(2)} kN`],
    take: 'the key prints 1.8 kN/m and 518.4 kN, and 518.4/1.8 = 288 m is exactly the digitised span — three numbers agreeing is what makes the ½ certain' },
  { t: 'b) The sag fixes the thrust — node I',
    d: 'the sag is measured at midspan from the chord down to the cable, and the two end tangents meet a further sag below that. Those tangents and R are node I: three forces, one triangle, and the pole of the force diagram is born',
    detail: (d) => [`f = ${d.f.toFixed(3)} m → H = s_d l²/(8f) = ${d.H.toFixed(2)} kN, constant along the whole cable`,
                    `the chord is inclined, so R does not split evenly: V_II = s_d l/2 + H·Δh/l = ${d.VII.toFixed(2)} kN, V_III = ${d.VIII.toFixed(2)} kN`,
                    `and ${d.VII.toFixed(2)} + ${d.VIII.toFixed(2)} = ${(d.VII + d.VIII).toFixed(2)} kN = R ✓`],
    take: 'the midspan offset from the CHORD is s l²/(8H) whether or not the supports are level — that is why unequal towers change nothing here' },
  { t: 'b) The cable',
    d: 'each end carries the same H and its own V, so the steeper end is the bigger force. The higher pylon is the steeper one, and the cable is lowest not at midspan but well over towards the low tower',
    detail: (d) => [`N_1 = √(H² + V_II²) = ${d.N1.toFixed(2)} kN at II · N_2 = √(H² + V_III²) = ${d.N2.toFixed(2)} kN at III`,
                    `N_max in the main cable = ${d.Nmax.toFixed(2)} kN, at ${d.atII ? 'II' : 'III'}`,
                    `lowest point at x = l/2 + Δh·l/(8f) = ${d.xlow.toFixed(2)} m from II — ${(-d.ylow).toFixed(2)} m below II, ${(-d.ylow - DH).toFixed(2)} m below III`],
    take: 'with level towers the low point would be at 144.00 m; the twenty metre height difference pushes it more than 50 m off centre' },
  { t: 'b) Node II — the left pylon top',
    d: 'three forces meet: the main cable pulling into the span, the backstay pulling back to its anchor, and the pylon pushing up. The cable force is known, the two directions are known, so the triangle closes and hands over both unknowns',
    detail: (d) => [`cable 1 = ${d.N1.toFixed(2)} kN at (${d.c1[0].toFixed(1)}, ${d.c1[1].toFixed(1)}) kN`,
                    `→ backstay 3 = ${d.N3.toFixed(2)} kN TENSION (red)`,
                    `→ pylon 4 = ${d.N4.toFixed(2)} kN COMPRESSION (blue)`],
    take: 'the backstay is bigger than the cable it holds, because it is steeper and has to supply the pylon’s share as well' },
  { t: 'b) Node III — the right pylon top',
    d: 'the same triangle on the other side, but everything is different: a smaller cable force, a shorter pylon leaning the other way, a steeper backstay. It produces the biggest force in the whole bridge',
    detail: (d) => [`cable 2 = ${d.N2.toFixed(2)} kN at (${d.c2[0].toFixed(1)}, ${d.c2[1].toFixed(1)}) kN`,
                    `→ pylon 5 = ${d.N5.toFixed(2)} kN COMPRESSION · backstay 6 = ${d.N6.toFixed(2)} kN TENSION`,
                    `${d.N6.toFixed(1)} kN in backstay 6 is more than the ${d.Nmax.toFixed(1)} kN maximum in the main cable`],
    take: 'the task asks for the maximum force IN THE CABLE. Answering 2053 kN answers a different question' },
  { t: 'b) The reactions, and the polygon that closes',
    d: 'each anchor and each foot carries exactly one member, so each reaction is that member’s force on that member’s line — magnitude and direction both, which is what the German sheet means by “Lage und Grösse”. Read round the force diagram and the five external forces close on themselves',
    detail: (d) => [`A = ${d.react.A.toFixed(1)} kN down-left · B = ${d.react.B.toFixed(1)} kN up-right · C = ${d.react.C.toFixed(1)} kN up-left · D = ${d.react.D.toFixed(1)} kN down-right`,
                    `ΣF_x = ${d.resid[0].toFixed(3)} kN · ΣF_y − R = ${d.resid[1].toFixed(3)} kN ✓`,
                    'the three shaded triangles are nodes I, II and III — together they tile the whole polygon, which is why one drawing answers all three joints'],
    take: 'read the polygon round from the top of the load line: A, B, C, D and back down R — five external forces, and they close' },
  { t: 'Everything, checked',
    d: 'the answer in one place. Note what the largest force in this bridge is, and note that the question did not ask for it',
    detail: (d) => [`a) s_d = ${d.sd.toFixed(3)} kN/m · R = ${d.R.toFixed(2)} kN — the key prints 1.8 and 518.4`,
                    `b) cable ${d.N1.toFixed(1)} / ${d.N2.toFixed(1)} kN · backstays ${d.N3.toFixed(1)} / ${d.N6.toFixed(1)} T · pylons ${d.N4.toFixed(1)} / ${d.N5.toFixed(1)} C`,
                    `ΣF_x = ${d.resid[0].toFixed(4)}, ΣF_y − R = ${d.resid[1].toFixed(4)} kN · the key's own force diagram scales to within 0.07 % of all of these`],
    take: 'the key’s three node sketches number their members wrongly (node I calls the cable halves 3 and 4; node II swaps 1 and 3 and calls the pylon 2; node III calls the cable 4). Its form and force diagrams are right, and this view follows them' },
];

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const px = (p) => [OX + p[0] * MPU, OY + p[1] * MPU];

  dw.label('t_form', 'form diagram 1:1500', { cls: 'title', intro: 1, flash: false });
  dw.label('t_cross', 'cross section 1:100', { cls: 'title', intro: 2, flash: false });
  dw.label('t_force', 'force diagram  1 cm ≙ 200 kN', { cls: 'title', intro: 4, flash: false });

  // ------------------------------------------------------------- the bridge --
  dw.strokes('stab', NSEG, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.strokes('hang', 17, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.strokes('cable', NSEG, { intro: 1, w: dw.W.str,
    color: { pending: PAL.black, final: () => PAL.red } });
  for (const m of [3, 6]) {
    dw.seg(`m${m}`, { intro: 1, w: dw.W.bar, color: { pending: PAL.black, final: () => PAL.red } });
    dw.label(`lm${m}`, String(m), { cls: 'num', intro: 1, color: PAL.red, when: (st) => st.lbl });
  }
  for (const m of [4, 5]) {
    dw.seg(`m${m}`, { intro: 1, w: dw.W.bar, color: { pending: PAL.black, final: () => PAL.blue } });
    dw.label(`lm${m}`, String(m), { cls: 'num', intro: 1, color: PAL.blue, when: (st) => st.lbl });
  }
  for (const n of ['II', 'III']) {
    dw.disk(`p${n}`, { intro: 1, r: dw.W.disk });
    dw.label(`l${n}`, n, { cls: 'point', intro: 1, flash: false });
  }
  for (const n of ['A', 'B', 'C', 'D']) {
    dw.disk(`s${n}`, { intro: 1, r: dw.W.disk * 0.75 });
    dw.strokes(`h${n}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  }
  dw.seg('dimL', { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.strokes('dimT', 3, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('ldimL', '', { cls: 'num', intro: 1, flash: false, color: PAL.grey });
  dw.label('ldimR', '', { cls: 'num', intro: 1, flash: false, color: PAL.grey });

  // ---------------------------------------------------------- cross section --
  dw.strokes('csDeck', 6, { intro: 2, w: dw.W.thin, color: PAL.grey });
  dw.strokes('csMain', 2, { intro: 2, w: dw.W.str, color: PAL.red });
  dw.strokes('csStab', 2, { intro: 2, w: dw.W.dim, color: PAL.grey });
  dw.seg('csDim', { intro: 2, w: dw.W.dim, color: PAL.black, flash: false });
  dw.label('lcsB', '', { cls: 'num', intro: 2, flash: false, color: PAL.black });
  dw.label('lcsT', '', { cls: 'num', intro: 2, flash: false, color: PAL.red });

  // ------------------------------------------------------------- the loading --
  dw.seg('bar', { intro: 3, w: dw.W.thin, color: PAL.green });
  dw.arrows('qarr', 33, { intro: 3, w: dw.W.thin, color: PAL.green,
    headLen: NARR.headLen * 0.7, headW: NARR.headW * 0.7 });
  dw.label('lq', '', { cls: 'num', intro: 3, color: PAL.green });
  dw.dashArrow('Rarr', { intro: 3, color: PAL.green, ...ARR, dash: 0.5 });
  dw.label('lR', '', { cls: 'num', intro: 3, color: PAL.green });

  // ------------------------------------------------- node I and the parabola --
  dw.dashLine('chord', { intro: 4, color: PAL.grey, dash: dw.W.dash });
  dw.seg('tan1', { intro: 4, w: dw.W.ray, color: { pending: PAL.black, final: () => PAL.red } });
  dw.seg('tan2', { intro: 4, w: dw.W.ray, color: { pending: PAL.black, final: () => PAL.red } });
  dw.disk('nodeI', { intro: 4, r: dw.W.disk * 0.8 });
  dw.label('lI', 'I', { cls: 'point', intro: 4, flash: false, color: PAL.grey });
  dw.label('lt1', '1', { cls: 'num', intro: 4, color: PAL.red, when: (st) => st.lbl });
  dw.label('lt2', '2', { cls: 'num', intro: 4, color: PAL.red, when: (st) => st.lbl });
  dw.seg('dimF1', { intro: 4, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.seg('dimF2', { intro: 4, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lf1', '', { cls: 'num', intro: 4, flash: false, color: PAL.grey });
  dw.label('lf2', 'f', { cls: 'num', intro: 4, flash: false, color: PAL.grey });
  dw.disk('low', { intro: 5, r: dw.W.disk * 0.7 });
  dw.label('llow', '', { cls: 'num', intro: 5, flash: false, color: PAL.grey });

  // ------------------------------------------------------- the force diagram --
  dw.poly('tI', 3, { intro: 4, color: PAL.green, opacity: 0.12, flash: false });
  dw.poly('tII', 3, { intro: 6, color: PAL.red, opacity: 0.10, flash: false });
  dw.poly('tIII', 3, { intro: 7, color: PAL.blue, opacity: 0.10, flash: false });
  dw.label('ltII', 'II', { cls: 'point', intro: 6, flash: false, color: PAL.grey });
  dw.label('ltIII', 'III', { cls: 'point', intro: 7, flash: false, color: PAL.grey });

  dw.arrow('loadline', { intro: 4, color: PAL.green, ...NARR });
  dw.label('lLL', '', { cls: 'num', intro: 4, color: PAL.green });
  dw.disk('ptI', { intro: 4, r: dw.W.disk * 0.7 });
  dw.label('lptI', 'i', { cls: 'num', intro: 4, flash: false, color: PAL.grey });
  dw.disk('ptO', { intro: 4, r: dw.W.disk * 0.8 });
  dw.label('lptO', 'o', { cls: 'num', intro: 4, flash: false, color: PAL.grey });
  dw.dashLine('dimH', { intro: 4, color: PAL.grey, dash: dw.W.dash });
  dw.strokes('dimHg', 2, { intro: 4, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lH', '', { cls: 'num', intro: 4, flash: false, color: PAL.grey });
  dw.seg('ray1', { intro: 4, w: dw.W.ray, color: PAL.red });
  dw.seg('ray2', { intro: 4, w: dw.W.ray, color: PAL.red });
  dw.label('lr1', '', { cls: 'num', intro: 4, color: PAL.red, when: (st) => st.lbl });
  dw.label('lr2', '', { cls: 'num', intro: 4, color: PAL.red, when: (st) => st.lbl });
  for (const [m, st, col] of [[3, 6, PAL.red], [4, 6, PAL.blue],
                              [5, 7, PAL.blue], [6, 7, PAL.red]]) {
    dw.seg(`ray${m}`, { intro: st, w: dw.W.ray, color: col });
    dw.label(`lr${m}`, '', { cls: 'num', intro: st, color: col, when: (st2) => st2.lbl });
  }

  // reactions: in the form diagram and laid alongside their rays in the force one
  for (const n of ['A', 'B', 'C', 'D']) {
    dw.arrow(`r${n}`, { intro: 8, color: PAL.green, ...ARR });
    dw.label(`lr_${n}`, '', { cls: 'num', intro: 8, color: PAL.green });
    dw.arrow(`f${n}`, { intro: 8, color: PAL.green, ...NARR });
  }

  // counterparts — every member with its ray, and each reaction with both
  dw.link('tan1', 'ray1', 'lt1', 'lr1');
  dw.link('tan2', 'ray2', 'lt2', 'lr2');
  dw.link('m3', 'ray3', 'rA', 'fA', 'lm3', 'lr3');
  dw.link('m4', 'ray4', 'rB', 'fB', 'lm4', 'lr4');
  dw.link('m5', 'ray5', 'rC', 'fC', 'lm5', 'lr5');
  dw.link('m6', 'ray6', 'rD', 'fD', 'lm6', 'lr6');

  dw.instant('t_form', 't_cross', 't_force', 'stab', 'hang');
  dw.ghostable('cable', 'tan1', 'tan2', 'ray1', 'ray2', 'ray3', 'ray4', 'ray5', 'ray6',
               'loadline', 'rA', 'rB', 'rC', 'rD', 'fA', 'fB', 'fC', 'fD');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    const II = [0, 0], III = [SPAN, -DH];
    const AA = V.add(II, OFF_A), FL = V.add(II, OFF_FL);
    const DD = V.add(III, OFF_D), FR = V.add(III, OFF_FR);
    const pII = px(II), pIII = px(III);
    const pA = px(AA), pFL = px(FL), pD = px(DD), pFR = px(FR);

    // --- the main cable, a parabola between the two tops
    const yc = (x) => -(DH * x) / SPAN - ((4 * d.f) / (SPAN * SPAN)) * x * (SPAN - x);
    const cab = [];
    for (let i = 0; i <= NSEG; i++) { const x = (SPAN * i) / NSEG; cab.push(px([x, yc(x)])); }
    dw.setStrokes('cable', cab.slice(0, NSEG).map((p, i) => [p, cab[i + 1]]));

    // --- the stabilising cable, foot to foot, bulging the other way
    const sb = [];
    for (let i = 0; i <= NSEG; i++) {
      const t = i / NSEG;
      const x = FL[0] + (FR[0] - FL[0]) * t;
      const y = FL[1] + (FR[1] - FL[1]) * t + 4 * STAB * t * (1 - t);
      sb.push(px([x, y]));
    }
    dw.setStrokes('stab', sb.slice(0, NSEG).map((p, i) => [p, sb[i + 1]]));
    dw.setStrokes('hang', Array.from({ length: 17 }, (_, i) => {
      const t = (i + 1) / 18;
      const x = FL[0] + (FR[0] - FL[0]) * t;
      const yb = FL[1] + (FR[1] - FL[1]) * t + 4 * STAB * t * (1 - t);
      const xc = Math.min(Math.max(x, 0), SPAN);
      return [px([x, yb]), px([xc, yc(xc)])];
    }));

    // --- the five members
    dw.setSeg('m3', pII, pA);
    dw.setSeg('m4', pFL, pII);
    dw.setSeg('m5', pFR, pIII);
    dw.setSeg('m6', pIII, pD);
    dw.setLabel('lm3', V.add(V.mid(pII, pA), [0.1, 0.65]));
    dw.setLabel('lm4', V.add(V.mid(pFL, pII), [-0.7, 0.1]));
    dw.setLabel('lm5', V.add(V.mid(pFR, pIII), [0.7, 0.1]));
    dw.setLabel('lm6', V.add(V.mid(pIII, pD), [-0.1, 0.65]));

    dw.setDisk('pII', pII); dw.setDisk('pIII', pIII);
    // below and right of the pylon top, not above it: above puts the label
    // inside the step-caption card, whose lowest edge is y = 5.15
    dw.setLabel('lII', V.add(pII, [1.0, -1.0]));
    dw.setLabel('lIII', V.add(pIII, [0.75, 0.55]));
    for (const [n, p] of [['A', pA], ['B', pFL], ['C', pFR], ['D', pD]]) {
      dw.setDisk(`s${n}`, p);
      dw.setStrokes(`h${n}`, V.hatch([p[0] - 0.6, p[1] - 0.20], [p[0] + 0.6, p[1] - 0.20], -1, 0.42, 5));
    }

    // --- the span dimension, halved the way the sheet halves it
    const yd = -1.6;
    dw.setSeg('dimL', [pII[0], yd], [pIII[0], yd]);
    dw.setStrokes('dimT', [pII[0], pII[0] + (pIII[0] - pII[0]) / 2, pIII[0]]
      .map((x) => [[x, yd - 0.45], [x, yd + 0.45]]));
    dw.setLabel('ldimL', [(pII[0] * 3 + pIII[0]) / 4, yd + 0.8]);
    dw.setText('ldimL', `l/2 = ${(SPAN / 2).toFixed(2)} m`);
    dw.setLabel('ldimR', [(pII[0] + pIII[0] * 3) / 4, yd + 0.8]);
    dw.setText('ldimR', `l/2 = ${(SPAN / 2).toFixed(2)} m`);
    dw.setLabel('t_form', [-4.0, yd - 1.8]);

    // --- the cross section
    const cs = (x, y) => [CSX + x * XPU, CSY + y * XPU];
    const hb = B_DECK / 2;
    dw.setStrokes('csDeck', [
      [cs(-hb, 0), cs(hb, 0)], [cs(-hb, 0), cs(-hb, 0.28)], [cs(hb, 0), cs(hb, 0.28)],
      [cs(-hb, 0.28), cs(hb, 0.28)], [cs(-hb, -0.16), cs(hb, -0.16)],
      [cs(-hb, 0), cs(-hb, -0.16)]]);
    dw.setStrokes('csMain', [
      [cs(-hb, 0.1), cs(-hb - 0.55, 3.5)], [cs(hb, 0.1), cs(hb + 0.55, 3.5)]]);
    dw.setStrokes('csStab', [
      [cs(-hb, -0.1), cs(-hb - 2.05, -1.55)], [cs(hb, -0.1), cs(hb + 2.05, -1.55)]]);
    dw.setSeg('csDim', cs(-hb, 1.15), cs(hb, 1.15));
    dw.setLabel('lcsB', cs(0, 2.05));
    dw.setText('lcsB', `b = ${B_DECK.toFixed(1)} m`);
    dw.setLabel('lcsT', cs(0, 4.35));
    dw.setText('lcsT', `${d.nc} main cable${d.nc > 1 ? 's' : ''} → ${(B_DECK / d.nc).toFixed(3)} m each`);
    dw.setLabel('t_cross', cs(0, -2.5));

    // --- the load
    const yb = OY + 2.4;
    dw.setSeg('bar', [pII[0], yb], [pIII[0], yb]);
    dw.setArrows('qarr', Array.from({ length: 33 }, (_, i) => {
      const x = pII[0] + ((pIII[0] - pII[0]) * i) / 32;
      return [[x, yb], [x, yb - 0.58]];
    }));
    dw.setLabel('lq', [pIII[0] + 3.3, yb - 0.1]);
    dw.setText('lq', `q_d = s_d = ${d.sd.toFixed(2)} kN/m`);
    const mx = (pII[0] + pIII[0]) / 2;
    const chordMid = px([SPAN / 2, -DH / 2]);
    dw.setDashArrow('Rarr', [mx, yb + 1.15], [mx, chordMid[1] + 0.3]);
    dw.setLabel('lR', [mx + 4.0, yb + 0.85]);
    dw.setText('lR', `R = ${d.R.toFixed(1)} kN`);

    // --- node I: chord, tangents, the two f's
    dw.setDashLine('chord', [pII, pIII]);
    const fu = d.f * MPU;
    const I = [mx, chordMid[1] - 2 * fu];
    dw.setSeg('tan1', pII, I);
    dw.setSeg('tan2', I, pIII);
    dw.setDisk('nodeI', I);
    dw.setLabel('lI', V.add(I, [-0.6, -0.5]));
    dw.setLabel('lt1', V.add(V.mid(pII, I), [0.2, -0.65]));
    dw.setLabel('lt2', V.add(V.mid(I, pIII), [-0.2, -0.65]));
    const dxf = mx + 0.55;
    dw.setSeg('dimF1', [dxf, chordMid[1]], [dxf, chordMid[1] - fu]);
    dw.setSeg('dimF2', [dxf, chordMid[1] - fu], [dxf, chordMid[1] - 2 * fu]);
    dw.setLabel('lf1', [dxf + 2.3, chordMid[1] - fu / 2]);
    dw.setText('lf1', `f = ${d.f.toFixed(2)} m`);
    dw.setLabel('lf2', [dxf + 0.55, chordMid[1] - 1.5 * fu]);
    const pLow = px([d.xlow, d.ylow]);
    dw.setDisk('low', pLow);
    dw.setLabel('llow', V.add(pLow, [4.0, 0.85]));
    dw.setText('llow', `low point ${d.xlow.toFixed(0)} m`);

    // --- the force diagram. Q0 -> Q1 -> pole -> Q3 -> Q4 -> Q0 closes on the
    // five external forces; the pole is where rays 1, 2, 4 and 5 all meet.
    const k = (v) => [v[0] / SFD, v[1] / SFD];
    const Q0 = [QX, QY];
    const Q1 = V.sub(Q0, k(d.vec.A));
    const Q2 = V.sub(Q1, k(d.vec.B));          // the pole
    const Q3 = V.sub(Q2, k(d.vec.C));
    const Q4 = V.add(Q0, [0, -d.R / SFD]);
    const Pi = V.add(Q0, [0, -d.VII / SFD]);   // division point on the load line

    dw.setArrow('loadline', Q0, Q4);
    dw.setLabel('lLL', [Q0[0] - 2.5, Q0[1] + 0.65]);
    dw.setText('lLL', `R = ${d.R.toFixed(1)}`);
    dw.setDisk('ptI', Pi);
    dw.setLabel('lptI', V.add(Pi, [-0.6, 0.15]));
    dw.setDisk('ptO', Q2);
    dw.setLabel('lptO', V.add(Q2, [0.7, 0.5]));
    const yH = Math.min(Q3[1], Q4[1]) - 1.5;
    dw.setDashLine('dimH', [[Q0[0], yH], [Q2[0], yH]]);
    dw.setStrokes('dimHg', [[[Q0[0], Q4[1] - 0.3], [Q0[0], yH - 0.4]],
                            [[Q2[0], Q2[1] - 0.3], [Q2[0], yH - 0.4]]]);
    dw.setLabel('lH', [(Q0[0] + Q2[0]) / 2, yH - 0.85]);
    dw.setText('lH', `H = ${d.H.toFixed(0)} kN`);

    dw.setSeg('ray1', Q0, Q2);
    dw.setSeg('ray2', Q2, Q4);
    dw.setLabel('lr1', V.add(V.mid(Q0, Q2), [-0.4, 1.25]));
    dw.setText('lr1', `1 = ${d.N1.toFixed(0)}`);
    dw.setLabel('lr2', V.add(V.mid(Q2, Q4), [-0.4, -1.35]));
    dw.setText('lr2', `2 = ${d.N2.toFixed(0)}`);
    const edge = { 3: [Q0, Q1], 4: [Q1, Q2], 5: [Q2, Q3], 6: [Q3, Q4] };
    const foff = { 3: [-1.9, 0.5], 4: [1.5, 0.3], 5: [1.5, -0.3], 6: [-1.9, -0.5] };
    for (const m of [3, 4, 5, 6]) {
      const [a, b] = edge[m];
      dw.setSeg(`ray${m}`, a, b);
      dw.setLabel(`lr${m}`, V.add(V.mid(a, b), foff[m]));
      dw.setText(`lr${m}`, `${m} = ${d[`N${m}`].toFixed(0)}`);
    }
    // the three joints, shaded: together they tile the whole polygon
    dw.setPoly('tI', [Q0, Q2, Q4]);
    dw.setPoly('tII', [Q0, Q1, Q2]);
    dw.setPoly('tIII', [Q2, Q3, Q4]);
    dw.setLabel('ltII', [(Q0[0] + Q1[0] + Q2[0]) / 3 + 1.0, (Q0[1] + Q1[1] + Q2[1]) / 3 + 0.9]);
    dw.setLabel('ltIII', [(Q2[0] + Q3[0] + Q4[0]) / 3 + 1.0, (Q2[1] + Q3[1] + Q4[1]) / 3 - 0.9]);

    // --- the reactions: in the form diagram, and along their rays in the force one
    const at = { A: pA, B: pFL, C: pFR, D: pD };
    const out = { A: true, B: false, C: false, D: true };   // anchors pull away, feet push in
    const fedge = { A: [Q1, Q0], B: [Q2, Q1], C: [Q3, Q2], D: [Q4, Q3] };
    const loff = { A: [-1.2, -1.1], B: [-1.5, 0.9], C: [-1.6, -0.9], D: [-0.5, -1.2] };
    for (const n of ['A', 'B', 'C', 'D']) {
      const u = V.unit(d.vec[n]);
      const p = at[n];
      if (out[n]) dw.setArrow(`r${n}`, p, V.add(p, V.mul(u, 3.1)));
      else dw.setArrow(`r${n}`, V.sub(p, V.mul(u, 3.1)), p);
      const tip = out[n] ? V.add(p, V.mul(u, 3.1)) : V.sub(p, V.mul(u, 3.1));
      dw.setLabel(`lr_${n}`, V.add(tip, loff[n]));
      dw.setText(`lr_${n}`, `${n} = ${d.react[n].toFixed(0)} kN`);
      const [a, b] = fedge[n];
      const nrm = V.mul(V.perp(V.unit(V.sub(b, a))), dw.W.off * 0.85);
      dw.setArrow(`f${n}`, V.add(a, nrm), V.add(b, nrm));
    }
    dw.setLabel('t_force', [Q0[0] + 5.0, -3.0]);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const g = panel.section('Given');
  panel.slider(g, s, 'qk', 'q̄_k — the live area load (kN/m²)', 0, 2.0, 0.05, refresh,
    (v) => `${v.toFixed(2)} kN/m²${Math.abs(v - 0.7) < 0.001 ? '  ← the sheet’s value' : ''}`);
  panel.slider(g, s, 'gk', 'ḡ_k — the permanent area load (kN/m²)', 0.4, 2.0, 0.05, refresh,
    (v) => `${v.toFixed(2)} kN/m²${Math.abs(v - 1.0) < 0.001 ? '  ← the sheet’s value' : ''}`);
  panel.slider(g, s, 'f', 'sag f at midspan (m)', 8, 24, 0.1, refresh,
    (v) => `${v.toFixed(2)} m${Math.abs(v - F_SHEET) < 0.05 ? '  ← the sheet’s 14.093 m' : ''}`);
  panel.slider(g, s, 'cab', 'cables sharing the deck', 1, 2, 1, refresh,
    (v) => (v > 1.5 ? '2 — “one of the two”, as the sheet asks'
                    : '1 — the whole 1.5 m deck on one cable'));
  const w = panel.section('What to look at');
  panel.toggle(w, s, 'lbl', 'show member numbers and forces', refresh);

  refresh();
  return player;
}
