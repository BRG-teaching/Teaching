/**
 * EX X · Task 10 — Laon Cathedral, France
 * Structural Design I, HS 22, sheet "EX X — Additional Exercises", page 10.
 *
 * TASK TEXT (verbatim, English sheet)
 *  "a) Find a parabola going through points A and B which lies within the
 *      structure and carries the line load g_1d. Take into account that the
 *      applied force A from the nave acts horizontally.
 *   b) Then find the parabola through B, C and D. Find g_2d such that the
 *      supporting line from point B runs vertically into point E.
 *   c) In D, an additional point load F_1d is applied, representing the weight
 *      of the buttress. Determine F_1d such that the thrust line is running
 *      from point D into point F.
 *   d) Find the parabola through points E and F in such a way that the thrust
 *      line including the loads from the upper arches within the structure can
 *      be derived into the groun d. From this, calculate the magnitude of the
 *      line load g_3d. Draw the corresponding force diagram and indicate the
 *      magnitudes of the reaction forces G and H. Colour tension forces in red,
 *      compression forces in blue and external forces in green."
 *  (the sheet really does print "groun d".)
 *
 * GIVEN: form diagram 1:100, force diagram 1 cm ≙ 10 kN, g_1d = 10 kN/m.
 * Because the form diagram is 1:100, one printed centimetre is one metre of the
 * building — so the sheet's force scale is exactly "one drawing metre ≙ 10 kN",
 * and that is the scale the force diagram below is drawn at.
 *
 * GEOMETRY — origin at point A, x right, y UP, metres. The six labelled points
 * are filled discs in the PDF artwork (sheetvec skips fill-only paths, so they
 * were read out of the raw pdftocairo SVG); 1 pt = 0.03527778 m at 1:100.
 *
 *      point   PDF pt (y down)        x [m]      y [m]
 *      A       (228.717, 410.385)     0.0000     0.0000
 *      B       (401.570, 633.129)     6.0979    -7.8579
 *      C       (462.305, 628.986)     8.2405    -7.7118
 *      D       (523.039, 736.191)    10.3830   -11.4937
 *      E       (401.570, 910.734)     6.0979   -17.6512
 *      F       (555.330, 910.734)    11.5222   -17.6512
 *      ground  y = 1096.266 pt                  -24.1965
 *
 * Three checks that validate the digitising, all exact:
 *   · B and E share an x (401.570) — the sheet's "vertically into E";
 *   · E and F share a y (910.734);
 *   · C is exactly midway between B and D in x, (401.570+523.039)/2 = 462.3045
 *     against C's 462.305 — WHICH IS WHAT THE SHEET'S TWO l/2 MARKS SAY. The
 *     dimension chain runs B → C → D with a tick at each and l/2 = 2.1427 m
 *     twice. Three equally spaced points is the only way to fit a parabola
 *     through three points by hand, and it is why C is on the sheet at all.
 * The load bars measure to the same verticals: g_1d over A→B (6.0979 m), g_2d
 * over B→D (4.2852 m), g_3d over E→F (5.4243 m). Those widths are not round;
 * this is a traced cathedral section, not a designed span. A sits 24.20 m above
 * the floor, which is Laon's nave-vault height, so 1:100 is honoured.
 * The section outline itself is in lib/exX1_laon.js, pulled off the same page.
 *
 * DERIVATION (the key numbers its nodes I…VII and its rays 1…10; same here)
 *  a) the force at A is horizontal ⇒ A is the VERTEX of parabola I, so
 *     H_1 = g_1·L_1²/(2·7.8579) = 371.84/15.7158 = A = 23.660 kN, R_1 = 60.979.
 *  b) ray 5 (B→E) is vertical ⇒ it carries no horizontal force ⇒ H_2 = H_1.
 *     B, C, D are equally spaced in x (h = 2.1427), so the second difference
 *     gives the curvature directly: y'' = (y_B − 2y_C + y_D)/h² = −0.85566 and
 *     g_2d = −y''·H_2 = 20.245 kN/m (R_2 = 86.754 kN). Slope at B +0.9849, at
 *     D −2.6818; node III (B) then gives N_5 = R_1 + H_2·y'_B = 84.281 kN.
 *  c) D→F has slope −5.4053 and F_1d is vertical, so
 *     F_1d = H_2·(y'_D − s_DF) = 23.660 × 2.7235 = 64.440 kN, ray 6 = 130.061.
 *  d) two free choices are left, the rise f_3 of parabola III and g_3d, and they
 *     are a DESIGN: the parabola must stay inside the masonry and both legs must
 *     land inside a pier (the footprint is x ∈ [4.99, 6.52] and [9.41, 13.56]).
 *     G = (H_3, N_5 + g_3L_3/2), H = (−H_3 − H_1, 127.888 + g_3L_3/2), with
 *     H_3 = g_3L_3²/(8f_3). At the key's own drawn parabola (f_3 = 2.3595 m) and
 *     g_3d = 8.271: H_3 = 12.893, G = 107.49 kN landing at x = 5.31, H = 154.70
 *     kN landing at x = 13.11. ΣV = 257.04 = R_1+R_2+F_1d+R_3 ✓, ΣH = 23.66 ✓.
 *
 * WHERE THIS DISAGREES WITH THE OFFICIAL KEY. Every ray of the key's drawn force
 * diagram, measured off the PDF at 1 cm ≙ 10 kN, agrees with the derivation to
 * 3–4 significant figures: A 23.66, R_1 60.98, ray2 65.40, R_2 86.75, ray3
 * 33.21, ray5 84.28, ray4 67.72, F_1d 64.44, ray6 130.05, R_3 44.87, ray8 25.88,
 * G 107.49, H 154.70. The disagreements are between the key's PRINTED numbers
 * and the key's own drawing:
 *   · g_3d is PRINTED as 8.5 kN/m. Its own force diagram gives R_3 = 44.87 kN
 *     over 5.4243 m = 8.27 kN/m, and its own drawn parabola (rise 2.359 m,
 *     H_3 = 12.89 kN) says the same. 8.5 is 2.8 % high — a graphical read-off.
 *     8.27 kN/m is the answer; the panel offers 8.5 as a toggle.
 *   · g_2d printed 20, exact 20.245 (a rounding).
 *   · G printed 108, exact 107.49; H printed 155, exact 154.70 (with the printed
 *     g_3d = 8.5 they come out 108.2 and 155.4, which is how they were got).
 *   · F_1d is never printed although c) asks for it: F_1d = 64.44 kN.
 */


import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';
import { SECT, GROUND, PTS, FOOT } from '../lib/exX1_laon.js';

const { A, B, C, D, E, F } = PTS;
const GY = GROUND[0][1];                       // ground level, −24.1965 m
const L1 = B[0] - A[0];                        // 6.0979 m, loaded by g_1d
const L2 = D[0] - B[0];                        // 4.2852 m, loaded by g_2d
const L3 = F[0] - E[0];                        // 5.4243 m, loaded by g_3d
const HH = C[0] - B[0];                        // the sheet's l/2 = 2.1427 m

const KEY = { g2: 20, g3: 8.5, G: 108, H: 155 };   // what the key PRINTS
const SF = 0.10;                               // force diagram: 1 m ≙ 10 kN
const FX = 18.0, FY = -1.0;                    // where the pole sits
const NSEG = 26;                               // segments per drawn parabola

const DEFAULTS = {
  g1: 10,          // kN/m over the nave vault — the given
  g3: 8.27,        // kN/m over the lower vault — free, part d)
  f3: 2.36,        // m, rise of the E–F parabola — free, part d)
  keyG3: false,    // use the key's PRINTED 8.5 kN/m instead
  sect: true,      // show the digitised cathedral section
  lbl: true,
  _k: 99,
};

export const meta = {
  title: 'EX X.10 — Laon Cathedral: a thrust line down a Gothic buttress',
  subtitle: 'Structural Design I · EX X “Additional Exercises”, task 10 a)–d)',
  about: 'A section through Laon Cathedral, and one question: where does the nave vault’s thrust go? It goes down a chain of four parabolic pieces — over the nave, over the aisle roof, straight across to the buttress pier, and finally over the lower vault — and each piece is found by the same trick, that a parabola under a uniform load is fixed by three of its points, and that the horizontal component of a thrust never changes unless a horizontal force is added. Nothing horizontal is ever added here, so ONE number, the nave thrust A = 23.66 kN, sets the scale of the whole drawing. Drag it and watch every force in the building change together while not one line moves. Part d) is not an analysis but a design: the rise of the bottom parabola and the weight of the lower vault are yours to choose, and the only rule is that the thrust still has to land inside the masonry.',
  result: (d) => [
    `a) parabola A→B with a horizontal tangent at A ⇒ the nave thrust A = H₁ = ${d.H1.toFixed(2)} kN (R₁ = ${d.R1.toFixed(2)} kN)`,
    `b) ray 5 vertical ⇒ H₂ = H₁; B, C, D fix the curvature ⇒ g₂d = ${d.g2.toFixed(2)} kN/m (key prints ${KEY.g2}) · wall B→E carries N₅ = ${d.N5.toFixed(2)} kN`,
    `c) F₁d = ${d.F1d.toFixed(2)} kN — the key draws it (64.44 measured off its force diagram) but never prints it`,
    `d) g₃d = ${d.g3.toFixed(2)} kN/m with a rise of ${d.f3.toFixed(2)} m ⇒ G = ${d.G.toFixed(1)} kN, H = ${d.Hf.toFixed(1)} kN (key prints ${KEY.G} and ${KEY.H})`,
    d.ok
      ? `the legs land at x = ${d.xG.toFixed(2)} m and ${d.xH.toFixed(2)} m — both inside the piers ([${FOOT.pierL[0]}, ${FOOT.pierL[1]}] and [${FOOT.pierR[0]}, ${FOOT.pierR[1]}] m) ✓`
      : `the legs land at x = ${d.xG.toFixed(2)} m and ${d.xH.toFixed(2)} m — OUTSIDE the piers ([${FOOT.pierL[0]}, ${FOOT.pierL[1]}] and [${FOOT.pierR[0]}, ${FOOT.pierR[1]}] m): this thrust line cannot be derived into the ground ✗`,
    `DISAGREEMENT: the key prints g₃d = 8.5 kN/m, but its own force diagram measures R₃ = 44.87 kN over 5.4243 m = 8.27 kN/m. 8.27 is right; 8.5 is 2.8 % high`],
  frame: [[-16, -28], [24, 4]],
};

const STEPS = [
  { t: 'The exercise',
    d: 'a real section through Laon Cathedral, drawn at 1:100. The nave vault on the left pushes horizontally against the wall at A; three line loads and one point load act further down. Task 10 asks for the one thrust line that carries all of it into the ground inside the masonry',
    take: 'the whole page is one idea, used four times: a parabola under a uniform load, joined end to end' },
  { t: 'The given points and loads',
    d: 'A, B, C, D, E and F are given, and so is the fact that the force A from the nave is HORIZONTAL. Note what the sheet marks twice with l/2: C sits exactly halfway between B and D, which is the only reason a parabola can be put through the three of them by hand',
    detail: () => [`A (0.000, 0.000) · B (${B[0].toFixed(3)}, ${B[1].toFixed(3)}) · C (${C[0].toFixed(3)}, ${C[1].toFixed(3)}) · D (${D[0].toFixed(3)}, ${D[1].toFixed(3)})`,
                   `E (${E[0].toFixed(3)}, ${E[1].toFixed(3)}) · F (${F[0].toFixed(3)}, ${F[1].toFixed(3)}) · ground at y = ${GY.toFixed(3)} m`,
                   `loaded widths: g₁d over ${L1.toFixed(4)} m · g₂d over ${L2.toFixed(4)} m · g₃d over ${L3.toFixed(4)} m · l/2 = ${HH.toFixed(4)} m`],
    take: 'B and E share an x to three decimals — the sheet has already told you that ray 5 will be vertical' },
  { t: 'a) The nave: A is the vertex',
    d: '“the applied force A acts horizontally” means the thrust line leaves A with a horizontal tangent — so A is the apex of parabola I, and the single condition that it must reach B fixes the whole thing. The horizontal thrust follows from the drop A→B',
    detail: (d) => [`H₁ = g₁·L₁² / (2·Δy) = ${d.g1.toFixed(2)} × ${(L1 * L1).toFixed(3)} / (2 × ${(-B[1]).toFixed(4)}) = ${d.H1.toFixed(3)} kN`,
                    `R₁ = g₁·L₁ = ${d.g1.toFixed(2)} × ${L1.toFixed(4)} = ${d.R1.toFixed(3)} kN, acting at midspan x = ${(L1 / 2).toFixed(3)} m`,
                    `ray 2, the force arriving at B = √(H₁² + R₁²) = ${d.f2.toFixed(3)} kN`],
    take: 'A = 23.66 kN when g₁d = 10 kN/m — the key draws that ray 23.66 kN long and never prints the number' },
  { t: 'b) Why H does not change at B',
    d: 'the sheet asks for the line from B to run VERTICALLY into E. A vertical member carries no horizontal force, so nothing horizontal is added or taken away at B: the second parabola has the same horizontal thrust as the first. That one sentence is the key to the whole page',
    detail: (d) => [`ray 5 vertical ⇒ H₂ = H₁ = ${d.H1.toFixed(3)} kN`,
                    'the same argument holds at D, where F₁d is vertical too — so H is constant from A all the way down to E and F',
                    'that is why the whole force diagram hangs off one horizontal distance'] },
  { t: 'b) Three points give the curvature',
    d: 'B, C and D are equally spaced in x, so the second difference of their heights IS the curvature of the parabola through them. Multiply by the thrust and the load falls out — no trial funicular needed',
    detail: (d) => [`y″ = (y_B − 2y_C + y_D)/h² = (${B[1].toFixed(3)} + ${(-2 * C[1]).toFixed(3)} ${D[1].toFixed(3)}) / ${(HH * HH).toFixed(4)} = ${d.ypp.toFixed(5)} 1/m`,
                    `g₂d = −y″ · H₂ = ${d.g2.toFixed(3)} kN/m — the key prints ${KEY.g2}, and its own force diagram measures R₂ = 86.75 kN over ${L2.toFixed(4)} m = 20.245`,
                    `R₂ = ${d.R2.toFixed(3)} kN · slope at B ${d.sB.toFixed(4)} (rising ${(Math.atan(d.sB) * 180 / Math.PI).toFixed(2)}°), at D ${d.sD.toFixed(4)}`],
    take: 'the line humps 0.57 m above B before it dives to D, and that hump is inside the masonry — which is what “lies within the structure” means' },
  { t: 'b) Node III at B',
    d: 'now close the node. Ray 2 arrives from the nave, ray 3 leaves along the aisle parabola, and what is left over goes straight down the wall to E. The horizontals cancel by construction, so only the verticals have to be added up',
    detail: (d) => [`ray 3 = √(H₂² + (H₂·y′_B)²) = ${d.f3ray.toFixed(3)} kN`,
                    `N₅ = R₁ + H₂·y′_B = ${d.R1.toFixed(3)} + ${(d.H1 * d.sB).toFixed(3)} = ${d.N5.toFixed(3)} kN, compression, vertical`,
                    'the key draws ray 5 84.28 kN long ✓'] },
  { t: 'c) Sizing the buttress',
    d: 'at D the thrust line has to be bent until it points at F. Only a vertical force can do that without changing H, and here that force is the weight of the buttress — so the requirement “from D into F” is what sizes it',
    detail: (d) => [`slope of D→F = ${d.sDF.toFixed(4)} · slope arriving at D = ${d.sD.toFixed(4)}`,
                    `F₁d = H₂ · (y′_D − s_DF) = ${d.H1.toFixed(3)} × ${(d.sD - d.sDF).toFixed(4)} = ${d.F1d.toFixed(3)} kN`,
                    `ray 6 = √(H₂² + (H₂·s_DF)²) = ${d.f6.toFixed(3)} kN`],
    take: 'the key never prints F₁d, but it draws it: 182.65 pt on its load line at 1 cm ≙ 10 kN is 64.44 kN' },
  { t: 'd) The bottom parabola is a design',
    d: 'the last piece is not determined. The rise of the E–F parabola and the weight g₃d of the lower vault are both free — what is NOT free is the consequence: the two legs leaving E and F have to come down inside the masonry. Drag either slider and watch them swing',
    detail: (d) => [`rise f₃ = ${d.f3.toFixed(3)} m ⇒ H₃ = g₃·L₃²/(8f₃) = ${d.H3.toFixed(3)} kN`,
                    `R₃ = ${d.R3.toFixed(2)} kN · rays 8 = 9 = ${d.f8.toFixed(2)} kN`,
                    'the key drew its apex 2.359 m above the E–F line, just touching the underside of the fill'],
    take: 'a heavier lower vault pushes the two legs further apart; so does a flatter parabola' },
  { t: 'd) Into the ground',
    d: 'at E the vertical wall force and the arch thrust add up to G; at F the buttress line and the arch thrust add up to H. Both legs are straight and carry no load, so each runs on unchanged until it meets the ground — and it has to meet it inside a pier',
    detail: (d) => [`G = (${d.Gx.toFixed(2)}, ${d.Gv.toFixed(2)}) → ${d.G.toFixed(2)} kN, landing at x = ${d.xG.toFixed(3)} m (left pier ${FOOT.pierL[0]}–${FOOT.pierL[1]} m) ${d.okG ? '✓' : '✗'}`,
                    `H = (${(-d.Hx).toFixed(2)}, ${d.Hv.toFixed(2)}) → ${d.Hf.toFixed(2)} kN, landing at x = ${d.xH.toFixed(3)} m (right pier ${FOOT.pierR[0]}–${FOOT.pierR[1]} m) ${d.okH ? '✓' : '✗'}`,
                    `check ΣV = ${(d.Gv + d.Hv).toFixed(2)} = R₁+R₂+F₁d+R₃ = ${(d.R1 + d.R2 + d.F1d + d.R3).toFixed(2)} ✓ · ΣH = ${(d.Hx - d.Gx).toFixed(2)} = A ✓`] },
  { t: 'The answer, and one number the key gets wrong',
    d: 'the force diagram closes: one load line for A, R₁, R₂ and F₁d, the split at the pole for the wall, and the small triangle on the left for the lower vault. It is drawn at the sheet’s own 1 cm ≙ 10 kN, which at 1:100 is one drawing metre per 10 kN',
    detail: (d) => [`A = ${d.H1.toFixed(2)} kN · g₂d = ${d.g2.toFixed(2)} kN/m · N₅ = ${d.N5.toFixed(2)} kN · F₁d = ${d.F1d.toFixed(2)} kN · g₃d = ${d.g3.toFixed(2)} kN/m`,
                    `G = ${d.G.toFixed(2)} kN, H = ${d.Hf.toFixed(2)} kN — the key’s table prints ${KEY.G} and ${KEY.H}`,
                    `but the key PRINTS g₃d = 8.5 kN/m while its own R₃ measures 44.87 kN over ${L3.toFixed(4)} m = 8.27 kN/m, so 8.27 is the right answer`],
    take: 'measured against the key’s drawing rather than its captions, all thirteen rays agree to three or four figures' },
];

function compute(s) {
  const g1 = s.g1;
  const H1 = (g1 * L1 * L1) / (2 * (A[1] - B[1]));      // vertex at A
  const R1 = g1 * L1;
  const f2 = Math.hypot(H1, R1);

  const H2 = H1;                                        // ray 5 is vertical
  const ypp = (B[1] - 2 * C[1] + D[1]) / (HH * HH);
  const g2 = -ypp * H2;
  const R2 = g2 * L2;
  const sB = (C[1] - B[1]) / HH - (ypp * HH) / 2;
  const sD = sB + ypp * (D[0] - B[0]);
  const f3ray = Math.hypot(H2, H2 * sB);
  const f4 = Math.hypot(H2, H2 * sD);
  const N5 = R1 + H2 * sB;

  const sDF = (F[1] - D[1]) / (F[0] - D[0]);
  const F1d = H2 * (sD - sDF);
  const V6 = -H2 * sDF;                                 // downward part of ray 6
  const f6 = Math.hypot(H2, V6);

  const g3 = s.keyG3 ? KEY.g3 : s.g3;
  const f3 = s.f3;
  const H3 = (g3 * L3 * L3) / (8 * f3);
  const V8 = (g3 * L3) / 2;
  const R3 = g3 * L3;
  const f8 = Math.hypot(H3, V8);

  const Gx = H3, Gv = N5 + V8;                          // reaction G at E
  const Hx = H3 + H1, Hv = V6 + V8;                     // reaction H at F
  const G = Math.hypot(Gx, Gv);
  const Hf = Math.hypot(Hx, Hv);
  const xG = E[0] - (Gx / Gv) * (E[1] - GY);
  const xH = F[0] + (Hx / Hv) * (F[1] - GY);
  const okG = xG >= FOOT.pierL[0] && xG <= FOOT.pierL[1];
  const okH = xH >= FOOT.pierR[0] && xH <= FOOT.pierR[1];

  // ---- the drawn geometry of the four pieces
  const par1 = [];                                      // A → B, vertex at A
  for (let i = 0; i <= NSEG; i++) {
    const x = (L1 * i) / NSEG;
    par1.push([A[0] + x, A[1] - (g1 * x * x) / (2 * H1)]);
  }
  const par2 = [];                                      // B → D through C
  for (let i = 0; i <= NSEG; i++) {
    const x = (L2 * i) / NSEG;
    par2.push([B[0] + x, B[1] + sB * x + (ypp / 2) * x * x]);
  }
  const par3 = [];                                      // E → F, rise f3
  for (let i = 0; i <= NSEG; i++) {
    const x = (L3 * i) / NSEG;
    par3.push([E[0] + x, E[1] + (4 * f3 * x * (L3 - x)) / (L3 * L3)]);
  }
  const legG = [[E[0], E[1]], [xG, GY]];
  const legH = [[F[0], F[1]], [xH, GY]];

  // the three resultant "nodes" the key labels I, II and V: each is where the
  // two tangents either side of the load meet, i.e. on the load's line of action
  const nI = [A[0] + L1 / 2, A[1]];
  const nII = [(B[0] + D[0]) / 2, B[1] + sB * (L2 / 2)];
  const nV = [(E[0] + F[0]) / 2, E[1] + 2 * f3];

  // ---- the force diagram, at the sheet's own 1 m ≙ 10 kN
  const fp = (x, y) => [FX + x * SF, FY + y * SF];
  const P0 = fp(0, 0);                     // the pole
  const P1 = fp(H1, 0);                    // after A
  const P2 = fp(H1, -R1);                  // after R1
  const P3 = fp(H1, -R1 - R2);             // after R2
  const P4 = fp(H1, -R1 - R2 - F1d);       // after F1d
  const K = fp(0, -N5);                    // the wall's split point
  const M = fp(-H3, -N5 + V8);
  const N = fp(-H3, -N5 - V8);

  return { g1, H1, R1, f2, ypp, g2, R2, sB, sD, f3ray, f4, N5,
           sDF, F1d, V6, f6, g3, f3, H3, V8, R3, f8,
           Gx, Gv, Hx, Hv, G, Hf, xG, xH, okG, okH, ok: okG && okH,
           par1, par2, par3, legG, legH, nI, nII, nV,
           P0, P1, P2, P3, P4, K, M, N, keyG3: !!s.keyG3 };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const NARR = dw.W.narrow;
  const BLUE = { pending: PAL.black, final: () => PAL.blue };
  const OKC = { final: (dd) => (dd && dd.ok ? PAL.green : PAL.red) };

  // ---------- the building ----------
  dw.strokes('sect', SECT.length, { intro: 1, w: dw.W.str * 0.8, color: PAL.grey,
    flash: false, cap: false, when: (st) => st.sect });
  dw.seg('ground', { intro: 1, w: dw.W.bar, color: PAL.black, flash: false });
  dw.strokes('ghatch', 16, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('t_form', 'form diagram 1:100', { cls: 'title', flash: false });
  dw.label('t_force', 'force diagram 1 cm ≙ 10 kN', { cls: 'title', flash: false });

  for (const n of ['A', 'B', 'C', 'D', 'E', 'F']) {
    dw.disk(`p${n}`, { intro: 1, r: dw.W.disk });
    dw.label(`l${n}`, n, { cls: 'point', intro: 1 });
  }
  // the sheet's own dash-dot lines of action
  dw.dashLine('axA', { intro: 1, color: PAL.grey, dash: dw.W.dash });
  dw.dashLine('axB', { intro: 1, color: PAL.grey, dash: dw.W.dash });
  dw.dashLine('axD', { intro: 1, color: PAL.grey, dash: dw.W.dash });
  // the l/2 + l/2 chain the sheet draws between B, C and D
  dw.strokes('dimBD', 7, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('ldim1', 'l/2', { cls: 'num', intro: 1, color: PAL.grey, when: (st) => st.lbl });
  dw.label('ldim2', 'l/2', { cls: 'num', intro: 1, color: PAL.grey, when: (st) => st.lbl });

  // ---------- the loads ----------
  for (const [n, k] of [['q1', 15], ['q2', 11], ['q3', 13]]) {
    dw.seg(`${n}bar`, { intro: 1, w: dw.W.thin, color: PAL.green, flash: false });
    dw.arrows(`${n}arr`, k, { intro: 1, w: dw.W.thin, color: PAL.green,
      headLen: NARR.headLen * 0.75, headW: NARR.headW * 0.75 });
    dw.label(`l${n}`, '', { cls: 'num', intro: 1, color: PAL.green });
  }
  dw.arrow('AF', { intro: 1, color: PAL.green, ...dw.W.arrow });
  dw.label('lAF', '', { cls: 'num', intro: 1, color: PAL.green });
  dw.arrow('F1d', { intro: 6, color: PAL.green, ...dw.W.arrow });
  dw.label('lF1d', '', { cls: 'num', intro: 6, color: PAL.green });

  // the resultants of the three line loads, on their own lines of action
  for (const [n, st] of [['R1', 2], ['R2', 4], ['R3', 7]]) {
    dw.dashArrow(n, { intro: st, color: PAL.green, ...NARR, dash: dw.W.dash });
    dw.label(`l${n}`, '', { cls: 'num', intro: st, color: PAL.green });
  }

  // ---------- the thrust line ----------
  dw.strokes('par1', NSEG, { intro: 2, w: dw.W.str, color: BLUE, cap: false });
  dw.strokes('par2', NSEG, { intro: 4, w: dw.W.str, color: BLUE, cap: false });
  dw.strokes('par3', NSEG, { intro: 7, w: dw.W.str, color: BLUE, cap: false });
  dw.seg('m5', { intro: 5, w: dw.W.str, color: BLUE });
  dw.seg('m6', { intro: 6, w: dw.W.str, color: BLUE });
  dw.seg('m7', { intro: 8, w: dw.W.str, color: BLUE });
  dw.seg('m10', { intro: 8, w: dw.W.str, color: BLUE });
  for (const [n, st] of [['m5', 5], ['m6', 6], ['m7', 8], ['m10', 8]]) {
    dw.label(`n${n}`, '', { cls: 'num', intro: st, color: PAL.blue, when: (t) => t.lbl });
  }
  // the nodes the key numbers I … VII
  const ROMAN = { nI: 'I', nII: 'II', nIII: 'III', nIV: 'IV', nV: 'V', nVI: 'VI', nVII: 'VII' };
  const NSTEP = { nI: 2, nII: 4, nIII: 5, nIV: 6, nV: 7, nVI: 8, nVII: 8 };
  for (const k of Object.keys(ROMAN)) {
    dw.label(`r${k}`, ROMAN[k], { cls: 'num', intro: NSTEP[k], color: PAL.grey,
      when: (t) => t.lbl });
  }
  // the reactions in the ground
  dw.arrow('Gr', { intro: 8, color: PAL.green, ...dw.W.arrow });
  dw.arrow('Hr', { intro: 8, color: PAL.green, ...dw.W.arrow });
  dw.label('lGr', '', { cls: 'num', intro: 8, color: PAL.green });
  dw.label('lHr', '', { cls: 'num', intro: 8, color: PAL.green });
  // the two pier footprints, green if the legs land in them, red if they do not
  dw.seg('pierL', { intro: 8, w: dw.W.bar, color: OKC, flash: false });
  dw.seg('pierR', { intro: 8, w: dw.W.bar, color: OKC, flash: false });

  // ---------- the force diagram ----------
  dw.arrow('fA', { intro: 2, color: PAL.green, ...NARR });
  dw.arrow('fR1', { intro: 2, color: PAL.green, ...NARR });
  dw.arrow('fR2', { intro: 4, color: PAL.green, ...NARR });
  dw.arrow('fF1d', { intro: 6, color: PAL.green, ...NARR });
  dw.arrow('fR3', { intro: 7, color: PAL.green, ...NARR });
  for (const [n, st] of [['fA', 2], ['fR1', 2], ['fR2', 4], ['fF1d', 6], ['fR3', 7]]) {
    dw.label(`l${n}`, '', { cls: 'num', intro: st, color: PAL.green, when: (t) => t.lbl });
  }
  const RAYS = [['r2', 2], ['r3', 5], ['r4', 5], ['r5', 5], ['r6', 6],
                ['r8', 7], ['r9', 7], ['r7', 8], ['r10', 8]];
  for (const [n, st] of RAYS) {
    dw.seg(n, { intro: st, w: dw.W.ray, color: PAL.blue });
    dw.label(`l${n}`, '', { cls: 'num', intro: st, color: PAL.blue, when: (t) => t.lbl });
  }
  dw.disk('fo', { intro: 2, r: dw.W.disk * 0.8 });
  dw.label('lfo', 'o', { cls: 'num', intro: 2, color: PAL.grey, when: (st) => st.lbl });

  // counterparts: only the STRAIGHT pieces have one direction to compare
  dw.link('AF', 'fA', 'lAF', 'lfA');
  dw.link('m5', 'r5', 'nm5', 'lr5');
  dw.link('m6', 'r6', 'nm6', 'lr6');
  dw.link('m7', 'r7', 'nm7', 'lr7', 'Gr', 'lGr');
  dw.link('m10', 'r10', 'nm10', 'lr10', 'Hr', 'lHr');
  dw.link('R1', 'fR1', 'lR1', 'lfR1');
  dw.link('R2', 'fR2', 'lR2', 'lfR2');
  dw.link('R3', 'fR3', 'lR3', 'lfR3');
  dw.link('F1d', 'fF1d', 'lF1d', 'lfF1d');

  dw.instant('sect', 'ground', 'ghatch', 't_form', 't_force');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    // ---- the building
    dw.setStrokes('sect', SECT.map((q) => [[q[0], q[1]], [q[2], q[3]]]));
    dw.setSeg('ground', [3.8, GY], [15.6, GY]);
    dw.setStrokes('ghatch', V.hatch([3.8, GY], [15.6, GY], -1, 0.62, 16));
    dw.setLabel('t_form', [4.2, 1.8]);
    dw.setLabel('t_force', [19.2, 1.8]);

    for (const [n, p, o] of [['A', A, [-0.9, -0.85]], ['B', B, [-0.8, 0.6]],
                             ['C', C, [-0.15, 0.75]], ['D', D, [0.90, -0.60]],
                             ['E', E, [-0.85, 0.65]], ['F', F, [0.85, 0.6]]]) {
      dw.setDisk(`p${n}`, p);
      dw.setLabel(`l${n}`, [p[0] + o[0], p[1] + o[1]]);
    }
    dw.setDashLine('axA', [[-3.2, 0], [1.4, 0]]);
    dw.setDashLine('axB', [[B[0], 1.4], [B[0], GY + 0.6]]);
    dw.setDashLine('axD', [[D[0], -1.2], [D[0], GY + 0.6]]);

    // the l/2 chain, where the sheet draws it: just below the g2d bar
    const dy = -4.5;
    dw.setStrokes('dimBD', [
      [[B[0], dy], [C[0], dy]], [[C[0], dy], [D[0], dy]],
      [[B[0] - 0.28, dy - 0.34], [B[0] + 0.28, dy + 0.34]],
      [[C[0] - 0.28, dy - 0.34], [C[0] + 0.28, dy + 0.34]],
      [[D[0] - 0.28, dy - 0.34], [D[0] + 0.28, dy + 0.34]],
      [[B[0], dy], [B[0], dy - 0.55]], [[D[0], dy], [D[0], dy - 0.55]]]);
    dw.setLabel('ldim1', [(B[0] + C[0]) / 2, dy + 0.55]);
    dw.setLabel('ldim2', [(C[0] + D[0]) / 2, dy + 0.55]);

    // ---- the loads, at the heights the sheet draws them. A load that has
    // not been derived yet is shown as a question mark rather than as its
    // answer, so the reader is not staring at the result four steps early
    const K = s._k;
    const bars = [
      ['q1', A[0], B[0], 0.881, 0.381, `g₁d = ${d.g1.toFixed(1)} kN/m`, 15, 0.35, 0.62],
      ['q2', B[0], D[0], -3.068, -3.568, K >= 4 ? `g₂d = ${d.g2.toFixed(2)} kN/m` : 'g₂d = ?', 11, 0.35, -0.20],
      ['q3', E[0], F[0], -13.675, -14.175, K >= 7 ? `g₃d = ${d.g3.toFixed(2)} kN/m` : 'g₃d = ?', 13, 0.35, -0.20]];
    for (const [n, x0, x1, yt, yb, txt, k, ox, oy] of bars) {
      dw.setSeg(`${n}bar`, [x0, yt], [x1, yt]);
      dw.setArrows(`${n}arr`, Array.from({ length: k }, (_, i) => {
        const x = x0 + ((x1 - x0) * i) / (k - 1);
        return [[x, yt], [x, yb]];
      }));
      dw.setLabel(`l${n}`, [x1 + ox + 1.9, yt + oy]);
      dw.setText(`l${n}`, txt);
    }
    dw.setArrow('AF', [-3.0, 0], [-0.35, 0]);
    dw.setLabel('lAF', [-1.7, 0.95]);
    dw.setText('lAF', K >= 2 ? `A = ${d.H1.toFixed(2)} kN` : 'A = ?');
    dw.setArrow('F1d', [D[0], -1.10], [D[0], -2.90]);
    dw.setLabel('lF1d', [D[0] + 2.3, -2.15]);
    dw.setText('lF1d', `F₁d = ${d.F1d.toFixed(2)} kN`);

    const res = [['R1', d.nI[0], 2.55, 1.05, d.R1, 'R₁', [-2.15, -0.60]],
                 ['R2', d.nII[0], -0.55, -2.90, d.R2, 'R₂', [0.05, 0.95]],
                 ['R3', d.nV[0], -11.40, -13.50, d.R3, 'R₃', [-1.55, 0.75]]];
    for (const [n, x, ytop, ybot, val, tag, o] of res) {
      dw.setDashArrow(n, [x, ytop], [x, ybot]);
      dw.setLabel(`l${n}`, [x + o[0], ytop + o[1]]);
      dw.setText(`l${n}`, `${tag} = ${val.toFixed(2)}`);
    }

    // ---- the thrust line
    const poly = (pts) => pts.slice(0, -1).map((p, i) => [p, pts[i + 1]]);
    dw.setStrokes('par1', poly(d.par1));
    dw.setStrokes('par2', poly(d.par2));
    dw.setStrokes('par3', poly(d.par3));
    dw.setSeg('m5', B, E);
    dw.setSeg('m6', D, F);
    dw.setSeg('m7', d.legG[0], d.legG[1]);
    dw.setSeg('m10', d.legH[0], d.legH[1]);
    dw.setLabel('nm5', [B[0] - 1.75, (B[1] + E[1]) / 2]);
    dw.setText('nm5', `5 · ${d.N5.toFixed(1)}`);
    dw.setLabel('nm6', [(D[0] + F[0]) / 2 + 1.90, (D[1] + F[1]) / 2 - 1.30]);
    dw.setText('nm6', `6 · ${d.f6.toFixed(1)}`);
    dw.setLabel('nm7', [(d.legG[0][0] + d.legG[1][0]) / 2 - 1.85, (E[1] + GY) / 2]);
    dw.setText('nm7', `7 · ${d.G.toFixed(1)}`);
    dw.setLabel('nm10', [(d.legH[0][0] + d.legH[1][0]) / 2 + 2.15, (F[1] + GY) / 2]);
    dw.setText('nm10', `10 · ${d.Hf.toFixed(1)}`);

    const nodes = { nI: d.nI, nII: d.nII, nIII: B, nIV: D, nV: d.nV, nVI: E, nVII: F };
    const noff = { nI: [0.45, -0.85], nII: [0.6, 0.6], nIII: [0.6, -0.75],
                   nIV: [0.7, 0.75], nV: [-1.05, 0.6], nVI: [0.62, -0.8],
                   nVII: [0.62, -0.8] };
    for (const k of Object.keys(nodes)) {
      dw.setLabel(`r${k}`, [nodes[k][0] + noff[k][0], nodes[k][1] + noff[k][1]]);
    }

    // the reactions, drawn in the ground pointing up into the structure
    const gu = (leg) => {
      const u = V.unit(V.sub(leg[0], leg[1]));
      return [V.add(leg[1], V.mul(u, -3.0)), V.add(leg[1], V.mul(u, -0.3))];
    };
    const [gt, gh] = gu(d.legG);
    dw.setArrow('Gr', gt, gh);
    dw.setLabel('lGr', [d.xG + 2.05, GY - 2.5]);
    dw.setText('lGr', `G = ${d.G.toFixed(1)} kN`);
    const [ht, hh] = gu(d.legH);
    dw.setArrow('Hr', ht, hh);
    dw.setLabel('lHr', [d.xH + 2.55, GY - 2.5]);
    dw.setText('lHr', `H = ${d.Hf.toFixed(1)} kN`);
    dw.setSeg('pierL', [FOOT.pierL[0], GY + 0.26], [FOOT.pierL[1], GY + 0.26]);
    dw.setSeg('pierR', [FOOT.pierR[0], GY + 0.26], [FOOT.pierR[1], GY + 0.26]);

    // ---- the force diagram
    dw.setDisk('fo', d.P0);
    dw.setLabel('lfo', V.add(d.P0, [-0.55, 0.55]));
    const fa = [['fA', d.P0, d.P1, `A = ${d.H1.toFixed(2)}`, [0.15, 0.75]],
                ['fR1', d.P1, d.P2, `R₁ = ${d.R1.toFixed(2)}`, [2.15, 0]],
                ['fR2', d.P2, d.P3, `R₂ = ${d.R2.toFixed(2)}`, [2.15, 0]],
                ['fF1d', d.P3, d.P4, `F₁d = ${d.F1d.toFixed(2)}`, [2.30, 0]],
                ['fR3', d.M, d.N, `R₃ = ${d.R3.toFixed(2)}`, [-1.95, 0]]];
    for (const [n, a, b, txt, o] of fa) {
      dw.setArrow(n, a, b);
      dw.setLabel(`l${n}`, V.add(V.mid(a, b), o));
      dw.setText(`l${n}`, txt);
    }
    // ray labels are the key's own numbers only — the magnitudes are on the
    // members in the form diagram and in the RESULT card, and putting them
    // here as well turns a diagram 3.7 m wide into a wall of digits
    const rays = [['r2', d.P0, d.P2, '2', [-0.55, -0.30]],
                  ['r3', d.K, d.P2, '3', [-0.42, 0.44]],
                  ['r4', d.K, d.P3, '4', [0.66, 0.25]],
                  ['r5', d.P0, d.K, '5', [0.42, 2.21]],
                  ['r6', d.K, d.P4, '6', [0.27, 1.42]],
                  ['r8', d.K, d.N, '8', [-1.01, -0.75]],
                  ['r9', d.M, d.K, '9', [-1.01, 0.71]],
                  ['r7', d.P0, d.N, '7 = G', [-1.30, 0.10]],
                  ['r10', d.M, d.P4, '10 = H', [-0.16, -4.02]]];
    for (const [n, a, b, txt, o] of rays) {
      dw.setSeg(n, a, b);
      dw.setLabel(`l${n}`, V.add(V.mid(a, b), o));
      dw.setText(`l${n}`, txt);
    }

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const g = panel.section('The given load');
  panel.slider(g, s, 'g1', 'g₁d over the nave (kN/m)', 5, 12, 0.5, refresh,
    (v) => `${v.toFixed(1)} kN/m`);
  const p = panel.section('d) the free design');
  panel.slider(p, s, 'g3', 'g₃d over the lower vault (kN/m)', 5, 12, 0.05, refresh,
    (v) => `${v.toFixed(2)} kN/m`);
  panel.slider(p, s, 'f3', 'rise of the E–F parabola (m)', 1.2, 3.2, 0.02, refresh,
    (v) => `${v.toFixed(2)} m`);
  panel.toggle(p, s, 'keyG3', 'use the key’s printed g₃d = 8.5', refresh);
  const w = panel.section('What to show');
  panel.toggle(w, s, 'sect', 'the digitised cathedral section', refresh);
  panel.toggle(w, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}
