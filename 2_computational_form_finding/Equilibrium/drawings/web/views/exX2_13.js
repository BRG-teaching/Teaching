/**
 * EX X · Aufgabe 13 — Additional Transferring vertical Loads
 * Structural Design II, FS 23, sheet "EX X — Additional Exercises", page 11.
 *
 * NUMBERING. The English sheet calls this "Task 1" — one of three blocks with
 * that label. German: Aufgabe 13, used here (error E1).
 *
 * TEXT (verbatim, English). "The plate is loaded by the same dead area load of
 * task 4.
 *  a) The reaction forces of the five beams in task 4a) (subsystem A) are
 *     further transferred to two other beams (Subsystem B). Note the different
 *     support condition of subsystem B. Find the inner force flow by the aid of
 *     the force diagram. Use red for tension, blue for compression and green
 *     for the reaction forces.
 *  b) Again the reaction forces found in a) are further transferred to
 *     subsystems C and D. Draw the external forces in the marked position.
 *     Find an internal force flow and draw the corresponding force diagram."
 *
 * ============================================================================
 * THE ENGLISH TRANSLATION SILENTLY DROPPED THE LOAD — sheet error E2.
 * "task 4" and "task 4 a)" do not exist: the only "Task 4" in the booklet is
 * the p.2 truss, which has no five beams. As printed, the English page cannot
 * be started. The German (Aufgabe 13) does not cross-reference at all — it
 * states the value:
 *   "Aus der Flächenlast resultieren fünf Punktlasten A1 bis A5 = 50 kN,
 *    welche von den Querbalken (Subsystem A) auf die beiden Längsbalken
 *    (Subsystem B) wirken."
 * A1 … A5 = 50 kN each. That is what this view uses, and it says so.
 *
 * CROSS-CHECK THAT VALIDATES IT. Run the chain from page 9's area load instead
 * (s_k = 1 kN/m² → s_d = 1.350 kN/m²) over this page's own 25 × 15 m plate:
 * each of the five subsystem-A beams takes a 5.000 m strip, so
 * q = 1.3500 × 5.000 = 6.7500 kN/m over 15.000 m = 101.25 kN, and its end
 * reactions are 50.625 kN. The German's 50 kN is that number rounded — the two
 * derivations agree to 1.25 %. Both are offered as a toggle.
 * ============================================================================
 *
 * GIVEN. A1 … A5 = 50 kN. Plans 1:500; the subsystem form diagrams 1:200;
 * force diagram 1 cm ≙ 50 kN.
 *
 * GEOMETRY — plan, 1:500, origin = lower-left corner of the plate, x along the
 * 25 m direction, y along the 15 m direction.
 *   plate            24.991 × 14.994  (nominal 25.00 × 15.00 m = 375.0 m²)
 *   plate thickness  0.750
 *   subsystem A      5 beams spanning y (15.0 m), centrelines
 *                    x = 2.4995, 7.4975, 12.496, 17.494, 22.493
 *                    — spacing exactly 5.00 m, the outer two 2.50 m from the
 *                    edges. Section 0.500 wide × 2.499 deep.
 *   subsystem B      2 beams spanning x (25.0 m), y = 0.250 and 14.744, one
 *                    along each 25 m edge. Section 0.500 × 2.999.
 *   C / D            2 beams spanning y (15.0 m), x = 0.250 (labelled
 *                    *subsystem D*) and 9.9965 (labelled *subsystem C*).
 *                    Section 0.500 × 2.50.
 *   columns          4, at (0.250, 4.000), (0.250, 11.000), (9.9965, 4.000),
 *                    (9.9965, 11.000) — symmetric about y = 7.5, 7.0 m apart.
 *
 * GEOMETRY — subsystem B, 1:200, origin = the beam's left end.
 *   beam                     0 … 24.991, depth 2.999
 *   support 1 — ROLLER       0.250      (= the C/D edge-beam centreline)
 *   A1 2.499 · A2 7.498      50 kN down each
 *   support 2 — PIN          9.9965     (= the inner C/D beam centreline)
 *   A3 12.496 · A4 17.494 · A5 22.492    50 kN down each
 * The five load positions match the five subsystem-A centrelines to 0.002 m
 * and the two supports match the two C/D centrelines to 0.001 m. THIS is what
 * "note the different support condition of subsystem B" means: a 9.746 m span
 * with a 14.995 m CANTILEVER carrying three of the five loads.
 *
 * a) ANSWERS. Total 5 × 50 = 250.00 kN, resultant at x = 12.4965 — beyond the
 *    second support.
 *      moments about the pin
 *        50 × [(2.499−9.9965) + (7.498−9.9965) + (12.496−9.9965)
 *              + (17.494−9.9965) + (22.492−9.9965)]
 *        = 50 × 12.4965 = 624.83 kNm
 *      R(roller, x = 0.250)  = −624.83 / 9.7465 = −64.11 kN  → 64.11 kN DOWN
 *      R(pin,    x = 9.9965) = 250.00 + 64.11   = +314.11 kN up
 *    Independent check: ΣV = 314.11 − 64.11 − 250.00 = 0.00; moments about the
 *    roller, 250 × (12.4965 − 0.250) = 3061.6 kNm against 314.11 × 9.7465 =
 *    3061.5 kNm. At 1 cm ≙ 50 kN these plot as 6.28 cm and 1.28 cm.
 *    (With the area-load-derived 50.625 kN loads: −64.90 and +318.03 kN.)
 *
 *    THE INTERNAL FLOW. Because the roller pulls DOWN, the bending moment is
 *    hogging over the whole beam — it never changes sign. Values at the nodes:
 *      x = 0.250   M = 0
 *      x = 2.499   M = −144.2 kNm
 *      x = 7.498   M = −714.7
 *      x = 9.9965  M = −1124.6   ← the maximum, at the pin
 *      x = 12.496  M = −749.8
 *      x = 17.494  M = −250.1
 *      x = 22.492  M ≈ 0
 *    So the TIE is along the TOP of the beam and the compression thrust line
 *    runs below it, touching the soffit at the pin. Using the full depth
 *    z = 2.999 m, H = 1124.6 / 2.999 = 375.0 kN in both chords, and the panel
 *    shears are 0, −64.11, −114.11, −164.11, +150.00, +100.00, +50.00, 0 kN.
 *
 * GEOMETRY — subsystems C and D, 1:200, origin = the beam's left end, running
 * along the 15 m direction.
 *   beam                 0 … 14.995, depth 2.498
 *   external force 1     0.250       (= the B1 centreline)
 *   support 1 — PIN      3.9985      (column)
 *   support 2 — ROLLER   10.9965     (column)
 *   external force 2     14.745      (= the B2 centreline)
 * The two diagrams are geometrically identical EXCEPT that subsystem D carries
 * a circular opening, diameter 0.999 m, centred 3.044 m from the left end and
 * 0.914 m above the soffit (error E19a — the text never mentions it, yet it
 * changes the force flow the student is asked to draw). Subsystem C's interior
 * was checked explicitly and has no such arc.
 *
 * b) ANSWERS. Each of C and D receives one reaction from EACH of the two
 *    subsystem-B beams, one at each end of its 14.995 m length. From the plan,
 *    B's left (uplift) support lands on the x = 0.250 beam (subsystem D) and
 *    B's right support on the x = 9.9965 beam (subsystem C).
 *    Loads and supports are both symmetric about y = 7.5, so each column takes
 *    exactly half of the two end forces, i.e. one whole end force each:
 *      x = 0.250  (D)  end forces 64.11 kN UPWARD    → each column 64.11 kN TENSION
 *      x = 9.9965 (C)  end forces 314.11 kN downward → each column 314.11 kN COMPRESSION
 *    Check on that arithmetic: taking moments about the pin at 3.9985 with
 *    equal end forces P, R × (10.9965 − 3.9985) = P(0.250 − 3.9985)
 *    + P(14.745 − 3.9985) = P(−3.7485 + 10.7465) = 6.998 P, and
 *    10.9965 − 3.9985 = 6.998, so R = P exactly.
 *
 * INDEPENDENT CHECK ON THE WHOLE CHAIN — this is the number that proves the
 * page. Two B beams × 5 × 50 kN = 500.00 kN delivered by the plate. Columns:
 *      2 × 314.11 − 2 × 64.11 = 628.22 − 128.22 = 500.00 kN.
 * It closes exactly. (Area-load variant: 2 × 318.03 − 2 × 64.90 = 506.25 kN
 * = 1.3500 kN/m² × 375.0 m².)
 *
 * TWO THINGS TO FLAG, both of which follow inevitably from the drawn support
 * positions and are almost certainly the intended lesson:
 *   · subsystem B's left support is a ROLLER IN UPLIFT — it must really be an
 *     anchored bearing;
 *   · subsystem D's columns are therefore in TENSION. Columns that pull.
 * And two labelling problems: E19a, D's undocumented opening, and E19b, the
 * C / D naming rests only on where the two captions sit in the 1:500
 * elevation — so the forces are quoted BY POSITION as well as by name.
 *
 * The sheet prints no answers. Everything above is derived.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

// -------------------------------------------------------------- the model --

const PLX = 24.991, PLY = 14.994;      // the plate
const AX_M = [2.4995, 7.4975, 12.496, 17.494, 22.493];   // subsystem A
const BY_M = [0.250, 14.744];                            // subsystem B
const CDX_M = [0.250, 9.9965];                           // subsystems D and C
const COL_Y = [4.000, 11.000];
const DEP_B = 2.999, DEP_CD = 2.498;
const CD_L = 14.995;
const CD_SUP = [3.9985, 10.9965];      // the two columns, along the 15 m run
const CD_F = [0.250, 14.745];          // where the two B reactions land
const HOLE = { at: 3.044, up: 0.914, r: 0.4995 };        // subsystem D only

const NL = 5;                          // A1 … A5
const NEXT = 7;                        // external forces on B: 5 loads + 2 reactions
const NPAN = 8;                        // funicular panels

// ---------------------------------------------------------------- layout --

const EX0 = -24.6, EY = -3.6, EM = 0.80;      // subsystem B elevation
const PX = 2.6, PY = 4.6, PM = 0.42;          // the 1:500 plan
const LLX = 28.0, LLY = 7.0, SFD = 0.0300;    // force diagram: units per kN
const CDC = [[8.0, -12.0], [22.0, -12.0]];    // the two C/D minis
const CDM = 0.50;                             // units per metre in the minis
const CDF = 0.014;                            // units per kN for their arrows

const DEFAULTS = {
  P: 50,                  // kN — the German's value
  area: false,            // use the area-load-derived 50.625 kN instead
  xr: 0.250,              // subsystem B's roller
  xp: 9.9965,             // subsystem B's pin
  hole: true, lbl: true, _k: 99,
};

const K_LOAD = 2, K_REACT = 3, K_FUNI = 4, K_FORCE = 5, K_CD = 6, K_CHAIN = 7;

export const meta = {
  title: 'EX X · 13 — the roller that has to hold down, and the columns that pull',
  subtitle: 'Structural Design II · “EX X — Additional Exercises”, p. 11 · German Aufgabe 13 (the English sheet calls it “Task 1”)',
  about: 'Five point loads on a 25 metre beam, and the whole page turns on where its two supports are. They are not at the ends: they sit 0.25 m and 10.0 m from the left, so nearly fifteen metres of beam cantilevers past the second one carrying three of the five loads. The cantilever wins, the beam tries to rotate, and the left support has to HOLD IT DOWN — 64.11 kN of uplift on something the sheet draws as a roller. Follow that number one storey further and the columns under subsystem D come out in tension. The English translation makes none of this findable, because it dropped the load: it says "the same dead area load of task 4", and no such task exists. The German states A1…A5 = 50 kN outright. The chain then closes to the kilonewton: 500 kN in, 2 × 314.11 − 2 × 64.11 = 500 kN out.',
  result: (d) => [
    `A1…A5 = ${d.P.toFixed(3)} kN each${d.area ? ' (derived from p.9\'s area load: 1.350 × 5.000 × 15.000 / 2)' : ' — from the GERMAN sheet; the English translation drops this number and the page cannot be started without it'}`,
    `B: moments about the pin give ${d.Mpin.toFixed(2)} kNm → R(roller, x = ${d.xr.toFixed(3)}) = ${d.Rr.toFixed(2)} kN — ${d.Rr < 0 ? 'acting DOWNWARD, the roller is a hold-down' : 'up'} · R(pin, x = ${d.xp.toFixed(3)}) = ${d.Rp.toFixed(2)} kN up`,
    `B's internal flow: hogging everywhere, |M|max = ${Math.abs(d.Mmin).toFixed(1)} kNm at the pin → over z = ${DEP_B.toFixed(3)} m, H = ${d.H.toFixed(2)} kN — TIE along the TOP, thrust line below it`,
    `C (x = 9.9965): each column ${Math.abs(d.Rp).toFixed(2)} kN COMPRESSION · D (x = 0.250): each column ${Math.abs(d.Rr).toFixed(2)} kN ${d.Rr < 0 ? 'TENSION — the columns are anchors' : 'compression'}`,
    `chain: 2 × 5 × ${d.P.toFixed(3)} = ${(10 * d.P).toFixed(2)} kN in · 2 × ${Math.abs(d.Rp).toFixed(2)} − 2 × ${Math.abs(d.Rr).toFixed(2)} = ${(2 * d.Rp + 2 * d.Rr).toFixed(2)} kN out ✓`],
  frame: [[-26, -22], [30, 16]],
};

const STEPS = [
  { t: 'The exercise, and the number that is missing', d: 'EX X page 11, German Aufgabe 13. A floor plate hands its load to five transverse beams, they hand it to two long ones, those hand it to two more, and those hand it to four columns. The English text says the plate carries “the same dead area load of task 4” — and there is no task 4 with five beams anywhere in the booklet',
    detail: (d) => ['German: “Aus der Flächenlast resultieren fünf Punktlasten A1 bis A5 = 50 kN”',
                    'the English translation dropped that sentence, and with it the whole page',
                    `cross-check: p.9's area load over this plate gives 1.3500 × 5.000 × 15.000 / 2 = 50.625 kN per reaction — the German's 50 kN rounded, agreeing to 1.25 %`],
    take: 'the two independent routes to the load agree, so 50 kN is right and the English is simply incomplete' },
  { t: 'Subsystem B, and where its supports are', d: 'left: one of the two long beams, 25 metres of it, at 1:200. Now look at the supports. They are at 0.25 m and 10.0 m — not at the ends. Nearly fifteen metres of beam hangs past the second one',
    detail: (d) => [`span between the supports ${(d.xp - d.xr).toFixed(3)} m · cantilever beyond the pin ${(PLX - d.xp).toFixed(3)} m`,
                    `three of the five loads stand ON that cantilever`,
                    `left support: ROLLER at x = ${d.xr.toFixed(3)} · right support: PIN at x = ${d.xp.toFixed(3)}`],
    take: '“note the different support condition of subsystem B” is the whole hint the sheet gives, and this is what it means' },
  { t: 'The five loads', d: 'green: A1 to A5, one from each transverse beam, at exactly the five subsystem-A centrelines. They are equal, they are 5 m apart, and their resultant lands at 12.50 m — past the second support',
    detail: (d) => [`5 × ${d.P.toFixed(3)} = ${(5 * d.P).toFixed(2)} kN, resultant at x = ${d.xres.toFixed(4)} m`,
                    `the pin is at ${d.xp.toFixed(3)} m, so the resultant is ${(d.xres - d.xp).toFixed(3)} m BEYOND it`,
                    'a resultant outside the supports is the definition of an overturning problem'] },
  { t: 'And the roller pulls down', d: 'take moments about the pin. Everything is on one side of it, so the roller has no choice: it must supply a DOWNWARD force to stop the beam rotating. A roller cannot do that. The sheet draws one anyway',
    detail: (d) => [`ΣM about the pin: ${d.P.toFixed(3)} × ${(d.Mpin / d.P).toFixed(4)} = ${d.Mpin.toFixed(2)} kNm`,
                    `R(roller) = ${d.Mpin.toFixed(2)} / (${d.xr.toFixed(3)} − ${d.xp.toFixed(3)}) = ${d.Rr.toFixed(3)} kN`,
                    `R(pin) = ${(5 * d.P).toFixed(2)} + ${Math.abs(d.Rr).toFixed(3)} = ${d.Rp.toFixed(3)} kN · ΣV = ${d.sumV.toExponential(1)} kN ✓`],
    take: 'drag the supports in the panel: the uplift disappears the moment the pin passes the resultant at 12.50 m' },
  { t: 'The flow inside the beam', d: 'because the roller pulls down, the bending never changes sign — the beam hogs from end to end. So the tie is along the TOP and the compression thrust line runs beneath it, touching the soffit exactly at the pin, where the moment is largest',
    detail: (d) => [`|M|max = ${Math.abs(d.Mmin).toFixed(1)} kNm at x = ${d.xp.toFixed(3)} m`,
                    `over the full depth z = ${DEP_B.toFixed(3)} m: H = ${Math.abs(d.Mmin).toFixed(1)} / ${DEP_B.toFixed(3)} = ${d.H.toFixed(2)} kN in the top tie`,
                    `panel shears ${d.shear.map((v) => v.toFixed(0)).join(' · ')} kN`],
    take: 'a hogging beam wears its reinforcement on top. That is why cantilever slabs have their bars in the upper face' },
  { t: 'The force diagram', d: 'right: the load line, with the seven external forces laid off in the order they occur along the beam — and the two reactions among them, one pointing the wrong way. The pole sits H to the left, and every ray from it is parallel to its own panel of the thrust line',
    detail: (d) => [`load line closes: ${d.ext.map((e) => (e.F > 0 ? '+' : '') + e.F.toFixed(1)).join(' ')} = ${d.sumV.toExponential(1)} kN`,
                    `pole distance H = ${d.H.toFixed(2)} kN — at the sheet's 1 cm ≙ 50 kN that is ${(d.H / 50).toFixed(2)} cm`,
                    `chord forces ${d.N.filter((n, i) => d.shear[i] !== 0).map((n) => n.toFixed(1)).join(' · ')} kN`],
    take: 'the ray lengths ARE the chord forces. That is the only reason to draw a force diagram instead of computing' },
  { t: 'Subsystems C and D', d: 'bottom right: the two beams that catch B. Each takes one end force from each of the two B beams, and each is symmetric about its middle, so its two columns take exactly one end force apiece — no lever arm arithmetic needed at all',
    detail: (d) => [`the check: moments about the pin at ${CD_SUP[0].toFixed(4)} give R × ${(CD_SUP[1] - CD_SUP[0]).toFixed(3)} = P × ${(CD_SUP[1] - CD_SUP[0]).toFixed(3)}, so R = P exactly`,
                    `x = 9.9965 (“subsystem C”): ${Math.abs(d.Rp).toFixed(2)} kN down at each end → ${Math.abs(d.Rp).toFixed(2)} kN COMPRESSION in each column`,
                    `x = 0.250 (“subsystem D”): ${Math.abs(d.Rr).toFixed(2)} kN ${d.Rr < 0 ? 'UP' : 'down'} at each end → ${Math.abs(d.Rr).toFixed(2)} kN ${d.Rr < 0 ? 'TENSION' : 'compression'} in each column`],
    take: 'the C / D names come only from where two captions sit in the 1:500 elevation, so quote the forces by POSITION too. And D has an undocumented 1 m hole in it that the task text never mentions' },
  { t: 'Columns that pull, and a chain that closes', d: 'and the surprise of the page. Two of the four columns are in tension: they are anchors, holding the building down against its own cantilever. The arithmetic that proves it is one line, and it uses nothing but the total',
    detail: (d) => [`in:  2 B beams × 5 × ${d.P.toFixed(3)} = ${(10 * d.P).toFixed(2)} kN`,
                    `out: 2 × ${Math.abs(d.Rp).toFixed(2)} − 2 × ${Math.abs(d.Rr).toFixed(2)} = ${(2 * d.Rp + 2 * d.Rr).toFixed(2)} kN`,
                    d.area ? `and 1.3500 kN/m² × ${(PLX * PLY).toFixed(1)} m² = ${(1.35 * 25 * 15).toFixed(2)} kN — the same number again`
                           : `with the area-load variant instead: 2 × 318.03 − 2 × 64.90 = 506.25 kN = 1.3500 × 375.0 m²`],
    take: 'a load path that subtracts is still a load path. If your columns do not add up to the plate, one of them is pulling and you have not noticed' },
];

// ------------------------------------------------------------------ maths --

function compute(s) {
  const P = s.area ? 1.35 * 5.0 * 15.0 / 2 : s.P;
  const xr = s.xr, xp = s.xp;

  // reactions, by moments about the pin
  const Mpin = AX_M.reduce((t, x) => t + P * (x - xp), 0);
  // ΣM about the pin: Rr·(xr − xp) − P·Σ(x − xp) = 0, the loads acting DOWNWARD
  const Rr = Mpin / (xr - xp);
  const Rp = NL * P - Rr;
  const sumV = Rr + Rp - NL * P;
  const xres = AX_M.reduce((t, x) => t + x, 0) / NL;

  // the external forces in x-order, signed (up positive)
  const ext = [...AX_M.map((x) => ({ x, F: -P, name: 'A' })),
               { x: xr, F: Rr, name: 'roller' },
               { x: xp, F: Rp, name: 'pin' }]
    .sort((a, b) => a.x - b.x);

  // shear just right of each force, and the bending moment at each node
  const shear = [0];
  ext.forEach((e) => shear.push(shear[shear.length - 1] + e.F));
  const Mat = (x) => ext.reduce((t, e) => t + (e.x < x - 1e-9 ? e.F * (x - e.x) : 0), 0);
  const nodes = [0, ...ext.map((e) => e.x), PLX];
  const Ms = nodes.map(Mat);
  const Mmin = Math.min(...Ms), Mmax = Math.max(...Ms);
  const swing = Math.max(Mmax - Mmin, 1e-9);
  const H = swing / DEP_B;
  // the funicular, measured UP from the soffit: y = (M − Mmin) / H
  const funi = nodes.map((x, i) => [x, (Ms[i] - Mmin) / H]);
  const N = shear.map((v) => Math.hypot(H, v));

  return { P, area: s.area, xr, xp, Mpin, Rr, Rp, sumV, xres,
           ext, shear, nodes, Ms, Mmin, Mmax, H, funi, N,
           chainIn: 10 * P, chainOut: 2 * Rp + 2 * Rr };
}

// ------------------------------------------------------------------- view --

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const ex = (x, z) => [EX0 + x * EM, EY + z * EM];
  const px = (x, y) => [PX + x * PM, PY + y * PM];

  const UPCOL = { final: (dd) => (dd.Rr < 0 ? PAL.red : PAL.blue) };

  dw.label('t_form', '', { cls: 'title', flash: false });
  dw.label('t_plan', 'Grundriss 1:500', { cls: 'title', flash: false });
  dw.label('t_force', '', { cls: 'title', flash: false });
  dw.label('t_cd', '', { cls: 'title', flash: false });

  // ---- the plan
  dw.strokes('plate', 4, { intro: 1, w: dw.W.thin, color: PAL.black });
  dw.strokes('aBeams', NL, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.strokes('bBeams', 2, { intro: 1, w: dw.W.bar, color: PAL.black });
  dw.strokes('cdBeams', 2, { intro: 1, w: dw.W.thin, color: PAL.grey });
  for (let i = 0; i < 4; i++) dw.disk(`pcol${i}`, { intro: 1, r: dw.W.disk * 0.7 });
  dw.label('lplan', '', { cls: 'point', intro: 1, flash: false, color: PAL.grey });

  // ---- subsystem B, elevation
  dw.strokes('bmOut', 4, { intro: 1, w: dw.W.str, color: PAL.black });
  for (let i = 0; i < NL; i++) {
    dw.arrow(`ld${i}`, { intro: K_LOAD, color: PAL.green, ...NARR });
    dw.label(`lld${i}`, '', { cls: 'num', intro: K_LOAD, color: PAL.green,
      when: (st) => st.lbl });
  }
  for (const n of ['r', 'p']) {
    dw.disk(`sup${n}`, { intro: 1, r: dw.W.disk });
    dw.strokes(`hat${n}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.label(`lsup${n}`, '', { cls: 'num', intro: 1, color: PAL.grey, when: (st) => st.lbl });
    dw.arrow(`re${n}`, { intro: K_REACT, color: PAL.green, ...ARR });
    dw.label(`lre${n}`, '', { cls: 'num', intro: K_REACT, color: PAL.green });
  }
  for (let i = 0; i < NPAN; i++) {
    dw.seg(`ch${i}`, { intro: K_FUNI, w: dw.W.bar, color: PAL.blue });
  }
  dw.seg('tie', { intro: K_FUNI, w: dw.W.bar, color: PAL.red });
  dw.label('ltie', '', { cls: 'num', intro: K_FUNI, color: PAL.red });
  for (let i = 0; i < NL; i++) {
    dw.seg(`str${i}`, { intro: K_FUNI, w: dw.W.thin, color: PAL.blue });
  }
  dw.seg('dimZ', { intro: K_FUNI, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('ldimZ', '', { intro: K_FUNI, flash: false, color: PAL.grey });

  // ---- the force diagram
  for (let i = 0; i < NEXT; i++) {
    dw.arrow(`ff${i}`, { intro: K_FORCE, color: PAL.green, ...NARR });
  }
  dw.disk('pole', { intro: K_FORCE, r: dw.W.disk * 0.8 });
  dw.label('lpole', 'o', { cls: 'num', intro: K_FORCE, when: (st) => st.lbl });
  dw.seg('dimH', { intro: K_FORCE, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lH', '', { intro: K_FORCE, flash: false, color: PAL.grey });
  for (let i = 0; i < NPAN; i++) {
    dw.seg(`ray${i}`, { intro: K_FORCE, w: dw.W.ray, color: PAL.blue });
    dw.link(`ch${i}`, `ray${i}`);
  }

  // ---- subsystems C and D
  for (let k = 0; k < 2; k++) {
    dw.strokes(`cdOut${k}`, 4, { intro: K_CD, w: dw.W.str, color: PAL.black });
    dw.label(`lcd${k}`, '', { cls: 'num', intro: K_CD, color: PAL.grey });
    for (let e = 0; e < 2; e++) {
      dw.arrow(`cdF${k}_${e}`, { intro: K_CD, color: PAL.green, ...NARR });
      dw.seg(`cdC${k}_${e}`, { intro: K_CD, w: dw.W.bar,
        color: k === 0 ? UPCOL : PAL.blue });
      dw.disk(`cdS${k}_${e}`, { intro: K_CD, r: dw.W.disk * 0.7 });
    }
    dw.label(`lcdC${k}`, '', { cls: 'num', intro: K_CD,
      color: k === 0 ? UPCOL : PAL.blue });
    dw.label(`lcdF${k}`, '', { cls: 'num', intro: K_CD, color: PAL.green });
  }
  dw.circle('dHole', { intro: K_CD, color: PAL.grey, when: (st) => st.hole });
  dw.label('ldHole', '', { cls: 'point', intro: K_CD, flash: false, color: PAL.grey,
    when: (st) => st.hole });

  dw.label('lchain', '', { cls: 'point', intro: K_CHAIN, flash: false, color: PAL.green });

  dw.instant('t_form', 't_plan', 't_force', 't_cd');
  dw.ghostable('ff0', 'ff1', 'ff2', 'ff3', 'ff4', 'ff5', 'ff6');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    dw.setLabel('t_form', [EX0 + (PLX / 2) * EM, 3.4]);
    dw.setText('t_form', `Subsystem B — Ansicht 1:200, ${PLX.toFixed(2)} m long, ${DEP_B.toFixed(3)} m deep`);
    dw.setLabel('t_plan', [PX + (PLX / 2) * PM, PY + PLY * PM + 1.7]);
    dw.setLabel('t_force', [LLX - 6.0, 14.2]);
    dw.setText('t_force', `Kräfteplan — 1 unit ≙ ${(1 / SFD).toFixed(1)} kN (sheet: 1 cm ≙ 50 kN)`);
    dw.setLabel('t_cd', [15.0, -3.2]);
    dw.setText('t_cd', 'Subsystems D and C — Ansicht 1:200');

    // ---- the plan
    const cn = [px(0, 0), px(PLX, 0), px(PLX, PLY), px(0, PLY)];
    dw.setStrokes('plate', cn.map((p, i) => [p, cn[(i + 1) % 4]]));
    dw.setStrokes('aBeams', AX_M.map((x) => [px(x, 0), px(x, PLY)]));
    dw.setStrokes('bBeams', BY_M.map((y) => [px(0, y), px(PLX, y)]));
    dw.setStrokes('cdBeams', CDX_M.map((x) => [px(x, 0), px(x, PLY)]));
    let ci = 0;
    for (const x of CDX_M) for (const y of COL_Y) dw.setDisk(`pcol${ci++}`, px(x, y));
    dw.setLabel('lplan', px(PLX / 2, -2.2));
    dw.setText('lplan', `25.00 × 15.00 m · A ⟂ B ⟂ C/D · 4 columns`);

    // ---- subsystem B
    const box = [ex(0, 0), ex(PLX, 0), ex(PLX, DEP_B), ex(0, DEP_B)];
    dw.setStrokes('bmOut', box.map((p, i) => [p, box[(i + 1) % 4]]));
    AX_M.forEach((x, i) => {
      dw.setArrow(`ld${i}`, ex(x, DEP_B + 3.4), ex(x, DEP_B + 0.35));
      dw.setLabel(`lld${i}`, V.add(ex(x, DEP_B + 2.2), [1.5, 0]));
      dw.setText(`lld${i}`, `A${i + 1}`);
    });
    for (const [n, x, R] of [['r', d.xr, d.Rr], ['p', d.xp, d.Rp]]) {
      const p = ex(x, 0);
      dw.setDisk(`sup${n}`, p);
      dw.setStrokes(`hat${n}`, V.hatch([p[0] - 1.2, p[1] - 0.5], [p[0] + 1.2, p[1] - 0.5],
        -1, 0.8, 5));
      dw.setLabel(`lsup${n}`, V.add(p, [0, -2.4]));
      dw.setText(`lsup${n}`, n === 'r' ? 'roller' : 'pin');
      // an upward reaction is drawn pushing up into the support; a downward one
      // is drawn pulling down out of it, which is exactly the problem
      const up = R >= 0;
      dw.setArrow(`re${n}`, [p[0], p[1] - (up ? 5.6 : 3.4)], [p[0], p[1] - (up ? 3.4 : 5.6)]);
      dw.setLabel(`lre${n}`, [p[0] + (n === 'r' ? -2.9 : 3.1), p[1] - 4.5]);
      dw.setText(`lre${n}`, `${Math.abs(R).toFixed(2)}${up ? '' : ' ↓'}`);
    }
    // the thrust line, the tie above it, and the struts under each load
    for (let i = 0; i < NPAN; i++) {
      const a = d.funi[Math.min(i, d.funi.length - 2)];
      const b = d.funi[Math.min(i + 1, d.funi.length - 1)];
      dw.setSeg(`ch${i}`, ex(a[0], a[1]), ex(b[0], b[1]));
    }
    const tieY = (d.Mmax - d.Mmin) / d.H;
    dw.setSeg('tie', ex(0, tieY), ex(PLX, tieY));
    dw.setLabel('ltie', ex(PLX / 2 + 3.0, -1.5));
    dw.setText('ltie', `tie along the TOP: ${d.H.toFixed(2)} kN tension`);
    AX_M.forEach((x, i) => {
      const k = d.nodes.findIndex((n) => Math.abs(n - x) < 1e-6);
      const y = k >= 0 ? d.funi[k][1] : 0;
      dw.setSeg(`str${i}`, ex(x, tieY), ex(x, y));
    });
    dw.setSeg('dimZ', ex(PLX + 1.2, 0), ex(PLX + 1.2, DEP_B));
    dw.setLabel('ldimZ', V.add(ex(PLX + 1.2, DEP_B / 2), [2.6, 0]));
    dw.setText('ldimZ', `z = ${DEP_B.toFixed(3)} m`);

    // ---- the force diagram: the load line in x-order, the pole H to the left
    let y = LLY;
    const pts = [[LLX, y]];
    d.ext.forEach((e, i) => {
      const y2 = y + e.F * SFD;
      dw.setArrow(`ff${i}`, [LLX, y], [LLX, y2]);
      y = y2;
      pts.push([LLX, y]);
    });
    const O = [LLX - d.H * SFD, LLY];
    dw.setDisk('pole', O);
    dw.setLabel('lpole', V.add(O, [-1.3, 0.9]));
    const ylo = Math.min(...pts.map((q) => q[1])) - 1.5;
    dw.setSeg('dimH', [O[0], ylo], [LLX, ylo]);
    dw.setLabel('lH', [(O[0] + LLX) / 2, ylo - 0.9]);
    dw.setText('lH', `H = ${d.H.toFixed(2)} kN`);
    for (let i = 0; i < NPAN; i++) {
      dw.setSeg(`ray${i}`, O, pts[Math.min(i, pts.length - 1)]);
    }

    // ---- subsystems C and D
    const cdInfo = [
      { at: CDX_M[0], name: 'D', R: d.Rr },
      { at: CDX_M[1], name: 'C', R: d.Rp },
    ];
    cdInfo.forEach((I, k) => {
      const c = CDC[k];
      const bx = (t, z) => [c[0] + (t - CD_L / 2) * CDM, c[1] + z * CDM];
      const bb = [bx(0, 0), bx(CD_L, 0), bx(CD_L, DEP_CD), bx(0, DEP_CD)];
      dw.setStrokes(`cdOut${k}`, bb.map((p, i) => [p, bb[(i + 1) % 4]]));
      dw.setLabel(`lcd${k}`, [c[0], c[1] + DEP_CD * CDM + 6.0]);
      dw.setText(`lcd${k}`, `subsystem ${I.name} (x = ${I.at.toFixed(3)} m)`);
      // I.R is the reaction ON subsystem B. By Newton's third law the force B
      // applies to C or D is its opposite: the pin's +314.11 kN pushes DOWN on
      // C, and the roller's −64.11 kN pulls UP on D
      const up = I.R < 0;
      for (let e = 0; e < 2; e++) {
        // the two end forces handed over by the two B beams
        const p = bx(CD_F[e], DEP_CD);
        const L0 = Math.min(Math.abs(I.R) * CDF + 1.2, 3.0);
        dw.setArrow(`cdF${k}_${e}`, [p[0], p[1] + (up ? 0.4 : L0 + 0.4)],
                                     [p[0], p[1] + (up ? L0 + 0.4 : 0.4)]);
        // and the two columns under it
        const q = bx(CD_SUP[e], 0);
        dw.setDisk(`cdS${k}_${e}`, q);
        dw.setSeg(`cdC${k}_${e}`, [q[0], q[1] - 0.6], [q[0], q[1] - 3.6]);
        void e;
      }
      dw.setLabel(`lcdF${k}`, [c[0], c[1] + DEP_CD * CDM + 4.4]);
      dw.setText(`lcdF${k}`, `${Math.abs(I.R).toFixed(2)} kN ${up ? 'UP' : 'down'} at each end`);
      dw.setLabel(`lcdC${k}`, [c[0], c[1] - 4.7]);
      dw.setText(`lcdC${k}`, `columns: ${Math.abs(I.R).toFixed(2)} kN ${up ? 'TENSION' : 'COMPRESSION'}`);
    });
    // subsystem D's undocumented opening
    const dbx = (t, z) => [CDC[0][0] + (t - CD_L / 2) * CDM, CDC[0][1] + z * CDM];
    dw.setCircle('dHole', dbx(HOLE.at, HOLE.up + HOLE.r), HOLE.r * CDM);
    dw.setLabel('ldHole', [CDC[0][0], CDC[0][1] - 6.3]);
    dw.setText('ldHole', 'a 1.0 m hole the task never mentions');

    dw.setLabel('lchain', [15.0, -19.6]);
    dw.setText('lchain', `chain: ${d.chainIn.toFixed(2)} kN in  =  2 × ${Math.abs(d.Rp).toFixed(2)} − 2 × ${Math.abs(d.Rr).toFixed(2)} = ${d.chainOut.toFixed(2)} kN out`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const g = panel.section('Given');
  panel.slider(g, s, 'P', 'A1…A5 (kN)', 10, 80, 1, refresh,
    (v) => (s.area ? '50.625 — from p.9\'s area load' : `${v} kN — the German sheet`));
  panel.toggle(g, s, 'area', 'use 50.625 kN, derived from p.9’s area load instead', refresh);
  const w = panel.section('Subsystem B’s supports');
  panel.slider(w, s, 'xr', 'roller at x (m)', 0.25, 11, 0.25, refresh,
    (v) => `${v.toFixed(2)} m`);
  panel.slider(w, s, 'xp', 'pin at x (m)', 2, 24.5, 0.25, refresh,
    (v) => `${v.toFixed(2)} m`);
  const v = panel.section('What to look at');
  panel.toggle(v, s, 'hole', 'show subsystem D’s undocumented opening', refresh);
  panel.toggle(v, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}
