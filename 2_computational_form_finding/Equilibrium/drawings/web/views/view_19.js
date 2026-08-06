/**
 * Drawing view/19 "Wooden bridge in Essing"
 * (https://block.arch.ethz.ch/eq/drawing/view/19) as a step-by-step
 * construction: the continuous timber band of the Essing bridge as a
 * funicular polygon over four fields 17 + 32.5 + 32.5 + 17 m.
 *
 * The deck is cut into 1.7 m strips of weight F_G. The main field hangs
 * between the piers: its pole o1 comes from the support tangent (parallel to
 * the first ray) and the horizontal crown tangent (last ray). The approach
 * field has the same geometry mirrored — its loads are laid off UPWARD on the
 * load line (Fₗ = −Fᵣ) and its pole o2 comes from the shared pier tangent
 * and the abutment tangent. The vertical through o1 cuts the abutment-tangent
 * line at N7: A = o1-N7 is the trestle reaction, Fₗ = N7-F8 the anchor pull,
 * with components Fₗₕ = H and Fₗᵥ. The right half mirrors in grey.
 *
 * Live port of view_19/applet_0/geogebra.xml (19843 lines); the full chain
 * (pole1 + 20 funicular vertices, tangent points, pole2 + 10 vertices, N7,
 * symbol arrows, mirrored force diagram, right-half mirrors) is regression-
 * checked against the baked view_19_compas.py coordinates to 4.9e-7 (140
 * points). The applet's site drawing (deck-band arcs, double-line trestle
 * bents, bearings, abutment wedges, terrain) is reproduced as vectors from
 * its 87 o_4-gated elements; decode in notes/view_19_analysis.md.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 19 — Wooden bridge in Essing',
  subtitle: 'a continuous timber band: hanging main span, arching approaches, anchored at the abutments',
  about: 'The Essing timber bridge as one continuous funicular band over fields of 17 + 32.5 + 32.5 + 17 m. The deck weight, cut into 1.7 m strips, hangs the main field from a pole fixed by the support tangent and the horizontal crown tangent; the approach field has the same geometry mirrored, so its loads are laid off upward on the load line (Fₗ = −Fᵣ) and the band runs kink-free over the pier. The vertical through the pole gives the trestle reaction A, the abutment tangent the anchor pull Fₗ with horizontal component H; the right half follows by symmetry, and the whole band resolves in tension.',
  frame: [[-215, -735], [1160, 240]],
};

// ------------------------------------------------------------------
// constants (applet defaults; regression-checked)
// ------------------------------------------------------------------

const FDS21 = [10, 10], FDS22 = [180, 10], XM = 520;   // abutment, pier, mirror
const YH = 10;                                          // deck line
const NS1 = 20, NS2 = 10;                               // strips: half main / approach
const STRIP = 17;
const YSTRIP = [196.541096, -176.541096];               // strip-line extent (Q_5, mirror)
const BAND = [151.797738, 162.297738];                  // q band (L_8, L_2)
const BANDM = [-131.797738, -142.297738];               // its mirror below the deck
const YDIM = -165.430389;                               // dimension line (S_19)
const S4Y = 120.248214;                                 // R2/R12 symbol-arrow anchor (S_4)
const RESOLVE = 13;
const GREY_D = 0x3f3f3f;                                // site linework (applet 64,64,64)
const GREY_M = 0x8a8a8a;                                // right-half vectors/band
const GREY_L = 0xc4c4c4;                                // right-half thin rays

const DEFAULTS = {
  mvy: -17.14797739932966,   // crown sag (MovePoint on x = 520)
  spx: 10, spy: -400,        // load line start spR1_2
  FG: 11,                    // one strip load [5..20] kN
  sFD: 50,                   // scale force diagram [50..100] (F = len*sFD/20)
  sLS: 2.1,                  // scale load symbol [1..3]
  sIF: 0.005,                // internal-force pipe scale
  o1: true,                  // internal-force pipes
  v4: false,                 // per-strip load arrows (the applet's "Resultierende")
  o4: true,                  // site drawing
  n4: true,                  // points
  node: 0,
  _k: 99,
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The site', d: 'the Essing bridge: a timber band over 17 + 32.5 + 32.5 + 17 m — trestle bents under the approaches, the canal under the main span' },
  { t: 'The load on the main field', d: 'left: the deck weight q as strips of 1.7 m on the half main field, resultant R₁/₂ — right: the 20 strip loads stacked on the load line' },
  { t: 'Crown point and tangents → pole o₁', d: 'left: chord and tangents of the parabola — support tangent and horizontal crown tangent meet over the quarter line (drag the crown!) — right: parallels through the load-line ends meet at the pole o₁' },
  { t: 'The funicular of the main field', d: 'left: from the pier, one string per strip, parallel to the rays — through the crown — right: the fan of rays to o₁' },
  { t: 'H at the crown, F at the pier', d: 'right: the last ray is the horizontal force H, the first ray the tangent force F at the pier — left: the same two forces on the band' },
  { t: 'The approach field: loads laid off upward', d: 'left: the approach has the SAME geometry mirrored, so its q acts reversed (band below the deck): Fₗ = −Fᵣ — right: its 10 loads are laid off UPWARD from the start of the load line, resultant R₂' },
  { t: 'Tangents of the approach → pole o₂', d: 'left: abutment tangent and pier tangent meet over the middle of the field — right: the parallel through the top of the reversed loads meets the pier-tangent ray at o₂' },
  { t: 'The funicular of the approach field', d: 'left: from the abutment, one string per strip — the band arches UP over the trestles and runs kink-free over the pier — right: its fan of rays to o₂' },
  { t: 'The trestle reaction A', d: 'right: the vertical through o₁ cuts the abutment-tangent line at N₇: A = o₁–N₇ — left: the trestles push the arching band up with A' },
  { t: 'The anchor force Fₗ', d: 'right: N₇ to the top of the reversed loads closes the polygon: Fₗ — left: the abutment anchors the band along its tangent' },
  { t: 'Components of Fₗ', d: 'right: the horizontal component of the anchor force is exactly H, the vertical rest is Fₗᵥ — the polygon H + A + Fₗ + R₂ + R₁/₂ closes' },
  { t: 'The right half by symmetry', d: 'both sides: the same construction mirrored in grey — reaction B at the right trestles, anchor Fᵣ at the right abutment' },
  { t: 'The band resolves', d: 'the continuous band works in TENSION everywhere (pink) — H is constant through all fields; pipes show the force; drag the crown or the sliders' },
];

// ------------------------------------------------------------------
// site drawing (static; from the applet's 87 o_4 elements, baked coords)
// ------------------------------------------------------------------

const mirX = (x0) => (p) => [2 * x0 - p[0], p[1]];
const mirSegs = (segs, x0) => segs.map(([a, b]) => [mirX(x0)(a), mirX(x0)(b)]);

function arcPairs(C, A, B, n = 40) {                    // CircleArc(C, from A, ccw to ray C->B)
  const r = Math.hypot(A[0] - C[0], A[1] - C[1]);
  let a0 = Math.atan2(A[1] - C[1], A[0] - C[0]);
  let a1 = Math.atan2(B[1] - C[1], B[0] - C[0]);
  while (a1 <= a0) a1 += 2 * Math.PI;
  const out = [];
  let prev = A;
  for (let i = 1; i <= n; i++) {
    const a = a0 + (a1 - a0) * (i / n);
    const p = [C[0] + r * Math.cos(a), C[1] + r * Math.sin(a)];
    out.push([prev, p]);
    prev = p;
  }
  return out;
}

const SITE = (() => {
  // trestle unit (double-line struts) + bearing, around x = 51.6
  const t = [
    [[12.170077, 2.226498], [50.315087, -45.532627]],   // a_14 left leg outer
    [[14.32954, 3.81056], [51.568506, -42.158183]],     // b_14 left leg inner
    [[51.568506, -42.158183], [93.307182, 8.888072]],   // c_14 right leg inner
    [[53.816823, -45.532627], [95, 5.298024]],          // h_23 right leg outer
    [[93.307182, 8.888072], [93.307192, 11.913891]],    // d_14 cap
    [[30.809079, -16.532208], [50.440203, 10.296027]],  // e_14 triangle left
    [[72.327933, -16.532208], [52.696809, 10.296027]],  // b_23 triangle right
    [[34.407657, -16.416909], [51.568506, 7.724625]],   // f_14 triangle left inner
    [[51.568506, 7.724625], [68.729355, -16.416909]],   // g_23 triangle right inner
    [[34.407657, -16.416909], [51.568506, -16.416909]], // h_14 base left
    [[51.568506, -16.416909], [68.729355, -16.416909]], // t_22 base right
    [[33.868609, -20.308972], [51.568506, -20.308972]], // i_14 base outer left
    [[51.568506, -20.308972], [69.268403, -20.308972]], // a_23 base outer right
    [[44.733253, -45.532627], [58.549191, -45.532627]], // d_23 footing top
    [[44.733253, -45.532627], [39.594008, -61.790482]], // f_23 footing left
    [[58.549191, -45.532627], [63.543004, -61.790482]], // j_14 footing right
    ...arcPairs([11.006451, 6.076774],                  // t_13 bearing semicircle
                [14.983784, 6.676332], [7.029118, 5.477215], 18),
  ];
  const wedge = [
    [[10, 14], [-65.825931, 0.656944]],                 // j_13
    [[10, 6], [-65.825931, -7.343056]],                 // i_13
  ];
  // deck-band arcs, approach field (upper h_13 / lower k_13)
  const arcL = [
    ...arcPairs([95, -593.650768], [180, 14], FDS21),
    ...arcPairs([95, -601.650768], [180, 6], [10, 6]),
  ];
  const left = [...t, ...mirSegs(t, 95), ...wedge, ...arcL];
  const groundL = [
    [[-65.333996, -61.790482], [167.195996, -61.790482]],   // e_23
    [[167.195996, -61.790482], [194.401257, -78.921562]],   // g_24
    [[194.401257, -78.921562], [194.401257, -97.392216]],   // h_24
    [[194.401257, -97.392216], [276.696684, -131.108906]],  // i_24
    [[276.696684, -131.108906], [520, -131.108906]],        // j_24
  ];
  // main-span band arcs (r_13 / s_13, full span)
  const arcMain = [
    ...arcPairs([520, 2231.798062], [180, 14], [860, 10], 64),
    ...arcPairs([520, 2223.798062], [180, 6], [860, 10], 64),
  ];
  return {
    grey: [...left, ...mirSegs(left, XM), ...arcMain],
    ground: [...groundL, ...mirSegs(groundL, XM)],
  };
})();

// strip-line x positions
const CENT1 = [];                                       // main half-field centers
for (let k = 0; k < NS1; k++) CENT1.push(188.5 + STRIP * k);
const CENT2 = [];                                       // approach centers
for (let k = 0; k < NS2; k++) CENT2.push(18.5 + STRIP * k);

// ------------------------------------------------------------------
// the construction (mirrors the applet, evaluated live)
// ------------------------------------------------------------------

function compute(s) {
  const MV = [XM, s.mvy];                               // crown
  const spR = [s.spx, s.spy];                           // load-line start
  const u = (s.FG / s.sFD) * 20;                        // one strip on the line
  const lp = [];                                        // main loads, downward
  for (let k = 0; k <= NS1; k++) lp.push([spR[0], spR[1] - k * u]);
  const P5 = lp[NS1];
  const fp = [];                                        // approach loads, upward
  for (let k = 0; k <= NS2; k++) fp.push([spR[0], spR[1] + k * u]);
  const F8 = fp[NS2];

  const Z22 = [(FDS22[0] + XM) / 2, MV[1]];             // tangents meet on x = 350
  const dA5 = V.sub(Z22, FDS22);                        // pier tangent (main field)
  const pole1 = V.intersect(spR, dA5, P5, [1, 0]);

  // abutment tangent: both approach tangents meet over x = 95
  const Z4 = [95, FDS22[1] + (dA5[1] / dA5[0]) * (95 - FDS22[0])];
  const dC10 = V.sub(Z4, FDS21);
  const pole2 = V.intersect(spR, dA5, F8, dC10);

  // main-field funicular: FDS22 -> 20 strip centers -> MV
  const fun1 = [FDS22];
  let p = FDS22;
  for (let k = 0; k < NS1; k++) {
    const dir = k === 0 ? dA5 : V.sub(pole1, lp[k]);
    p = V.intersect(p, dir, [CENT1[k], 0], [0, 1]);
    fun1.push(p);
  }
  fun1.push(MV);

  // approach funicular, walked from the pier, then listed abutment-first
  const f2 = [FDS22];
  p = FDS22;
  for (let k = 0; k < NS2; k++) {
    const dir = k === 0 ? dA5 : V.sub(pole2, fp[k]);
    p = V.intersect(p, dir, [CENT2[NS2 - 1 - k], 0], [0, 1]);
    f2.push(p);
  }
  f2.push(FDS21);
  const fun2 = [...f2].reverse();                       // FDS21 ... FDS22

  const N7 = V.intersect(F8, dC10, pole1, [0, 1]);
  const Hpt = [F8[0], N7[1]];                           // component corner of Fₗ

  // symbol-length arrows in the form diagram
  const L = 30 * s.sLS;
  const uA5 = V.unit(dA5), uC10 = V.unit(dC10);
  const W4 = V.sub(FDS21, V.mul(uC10, L));              // Fₗ at the abutment
  const S22 = V.sub(FDS22, V.mul(uA5, L));              // Fₗ at the pier (back)
  const V22 = V.add(FDS22, V.mul(uA5, L));              // Fᵣ at the pier (fore)
  const G = [MV[0] + L, MV[1]];                         // H at the crown

  // extended approach rays to the A-line (i_4 ... q_12)
  const ext = [];
  for (let k = 1; k < NS2; k++) ext.push([fp[k], V.intersect(fp[k], V.sub(pole2, fp[k]), pole1, [0, 1])]);

  // right half (mirror across x = 520) + mirrored force diagram (across y of pole1)
  const bandL = [...fun2, ...fun1.slice(1)];            // FDS21 ... MV (32 pts)
  const bandR = bandL.map(mirX(XM));                    // (1030,10) ... MV
  const mY = (pt) => [pt[0], 2 * pole1[1] - pt[1]];
  const lpm = lp.map(mY);                               // mirrored main loads
  const fpm = fp.map(mY);                               // mirrored approach loads
  const I15 = mY(spR), J15 = mY(F8), K15 = mY(N7);
  const pole2m = mY(pole2);
  const extm = ext.map(([a, b]) => [mY(a), mY(b)]);
  const H2m = mY(Hpt);

  // forces (kN); the band force in the approach: H constant, F = H/cos
  const kN = (len) => (len * s.sFD) / 20;
  const HkN = kN(pole1[0] - P5[0]);
  const AkN = kN(N7[1] - pole1[1]);
  const FLkN = kN(V.dist(N7, F8));
  const N1 = [];                                        // per-string force, main
  for (let k = 0; k <= NS1; k++) N1.push(kN(V.dist(k === 0 ? spR : k === NS1 ? P5 : lp[k], pole1)));
  const N2 = [];                                        // per-string force, approach
  const Hu = pole1[0] - P5[0];
  for (let k = 0; k < NS2 + 1; k++) {
    const a = fun2[k], b = fun2[k + 1];
    N2.push(kN(Hu * Math.hypot(1, (b[1] - a[1]) / (b[0] - a[0]))));
  }

  return { MV, spR, u, lp, P5, fp, F8, Z22, dA5, pole1, Z4, dC10, pole2,
           fun1, fun2, N7, Hpt, W4, S22, V22, G, ext, bandL, bandR,
           lpm, fpm, I15, J15, K15, pole2m, extm, H2m, HkN, AkN, FLkN, N1, N2,
           R12kN: kN(NS1 * u), R2kN: kN(NS2 * u) };
}

const pairs = (poly) => poly.slice(0, -1).map((p, i) => [p, poly[i + 1]]);

// ------------------------------------------------------------------

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);

  const memberColor = { pending: PAL.black, final: () => PAL.red };   // the band is in tension
  const W_BAR = 3.4, W_RAY = 1.1, W_SITE = 1.15, W_GND = 2.6;
  const ARROW = { w: 3.6, headLen: 14, headW: 5.6 };
  const site = (st) => st.o4;
  const pts = (st) => st.n4;

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // ---- step 1: site + dimensions --------------------------------------
  dw.strokes('siteG', SITE.grey.length, { intro: 1, w: W_SITE, color: GREY_D, when: site });
  dw.strokes('siteB', SITE.ground.length, { intro: 1, w: W_GND, color: PAL.black, when: site });
  dw.seg('dim', { intro: 1, w: 1.0, color: PAL.grey, flash: false });
  dw.strokes('dimT', 20, { intro: 1, w: 1.0, color: PAL.grey, flash: false });
  const DIMTXT = [['17 m', 95], ['32.5 m', 350], ['32.5 m', 690], ['17 m', 945]];
  DIMTXT.forEach(([t], i) => dw.label(`dim${i}`, t, { intro: 1, color: PAL.grey, flash: false }));
  dw.dashLine('endL', { intro: 1, color: PAL.black, dash: 7 });
  dw.dashLine('endR', { intro: 1, color: PAL.black, dash: 7 });
  dw.dashLine('pierL', { intro: 1, color: PAL.black, dash: 7 });
  dw.dashLine('pierR', { intro: 1, color: PAL.black, dash: 7 });
  dw.instant('siteG', 'siteB', 'dim', 'dimT', 'dim0', 'dim1', 'dim2', 'dim3',
             'endL', 'endR', 'pierL', 'pierR');

  // ---- step 2: main-field strips + q + R1/2 + load line ---------------
  for (let k = 0; k < NS1; k++) dw.dashLine(`st1_${k}`, { intro: 2, dash: 2.2, flash: false });
  dw.dashLine('ax350', { intro: 2, color: PAL.black, dash: 3 });
  dw.dashLine('ax520', { intro: 2, color: PAL.black, dash: 3 });
  dw.poly('band1', 4, { intro: 2, opacity: 0.1, color: PAL.green });
  dw.strokes('band1e', 4, { intro: 2, w: 1.6, color: PAL.green });
  dw.label('lq1', 'q', { intro: 2, color: PAL.green });
  dw.arrow('R12f', { intro: 2, ...ARROW });                       // form, x = 350
  dw.label('lR12f', 'R₁/₂', { intro: 2, color: PAL.green });
  dw.arrow('LL1', { intro: 2, ...ARROW });                        // force, on the line
  dw.strokes('lt1', NS1 + 1, { intro: 2, w: 1.0, color: PAL.grey });
  dw.label('lR12', 'R₁/₂', { intro: 2, color: PAL.green });

  // ---- step 3: crown + tangents -> pole o1 ----------------------------
  dw.dashLine('mvseg', { intro: 3, color: PAL.black, dash: 5 });
  dw.dashLine('chord1', { intro: 3, color: PAL.black, dash: 5 });
  dw.dashLine('tan1a', { intro: 3, dash: 5 });
  dw.dashLine('tan1b', { intro: 3, dash: 5 });
  dw.dashLine('par1a', { intro: 3, dash: 5 });
  dw.dashLine('par1b', { intro: 3, dash: 5 });

  // ---- step 4: funicular + fan ----------------------------------------
  dw.strokes('fan1', NS1 - 1, { intro: 4, w: W_RAY, color: memberColor });
  dw.strokes('str1', NS1 + 1, { intro: 4, w: W_BAR, color: memberColor });

  // ---- step 5: H + F --------------------------------------------------
  dw.arrow('Hf', { intro: 5, ...ARROW });
  dw.arrow('Ff', { intro: 5, ...ARROW });
  dw.arrow('Hform', { intro: 5, ...ARROW });
  dw.arrow('Fpier', { intro: 5, ...ARROW });
  dw.label('lHf', 'H', { intro: 5, color: PAL.green });
  dw.label('lHform', 'H', { intro: 5, color: PAL.green });
  dw.label('lFf', 'Fᵣ', { intro: 5, color: PAL.green });
  dw.label('lFpier', 'Fᵣ', { intro: 5, color: PAL.green });

  // ---- step 6: approach load laid off upward --------------------------
  dw.label('assume', 'Assumption: the left field has the same geometry as the main field',
           { intro: 6, flash: false, color: PAL.black });
  for (let k = 0; k < NS2; k++) dw.dashLine(`st2_${k}`, { intro: 6, dash: 2.2, flash: false });
  dw.dashLine('ax95', { intro: 6, color: PAL.black, dash: 3 });
  dw.poly('band2', 4, { intro: 6, opacity: 0.1, color: PAL.green });
  dw.strokes('band2e', 4, { intro: 6, w: 1.6, color: PAL.green });
  dw.poly('band2m', 4, { intro: 6, opacity: 0.1, color: PAL.green });
  dw.strokes('band2me', 4, { intro: 6, w: 1.6, color: PAL.green });
  dw.label('lq2', 'q', { intro: 6, color: PAL.green });
  dw.arrow('R2form', { intro: 6, ...ARROW });                     // form, x = 95
  dw.label('lR2form', 'R₂', { intro: 6, color: PAL.green });
  dw.arrow('LL2', { intro: 6, ...ARROW });                        // force, downward on the raised part
  dw.strokes('lt2', NS2 + 1, { intro: 6, w: 1.0, color: PAL.grey });
  dw.label('lR2', 'R₂', { intro: 6, color: PAL.green });
  dw.arrow('FLpier', { intro: 6, ...ARROW });                     // the opposite arrow at the pier
  dw.label('lFLpier', 'Fₗ', { intro: 6, color: PAL.green });
  dw.label('flfr', 'Fₗ = −Fᵣ', { intro: 6, flash: false, color: PAL.black });

  // ---- step 7: approach tangents -> pole o2 ---------------------------
  dw.dashLine('chord2', { intro: 7, color: PAL.black, dash: 5 });
  dw.dashLine('tan2a', { intro: 7, dash: 5 });
  dw.dashLine('tan2b', { intro: 7, dash: 5 });
  dw.dashLine('par2a', { intro: 7, dash: 5 });
  dw.dashLine('par2b', { intro: 7, dash: 5 });
  dw.strokes('fan2', NS2 - 1, { intro: 7, w: W_RAY, color: PAL.grey });

  // ---- step 8: approach funicular -------------------------------------
  dw.strokes('str2', NS2 + 1, { intro: 8, w: W_BAR, color: memberColor });

  // ---- step 9: reaction A ---------------------------------------------
  dw.dashLine('aline', { intro: 9, dash: 5 });
  dw.strokes('ext2', NS2 - 1, { intro: 9, w: W_RAY, color: PAL.black });
  dw.arrow('Af', { intro: 9, ...ARROW });
  dw.arrow('Aform', { intro: 9, ...ARROW });
  dw.label('lAf', 'A', { intro: 9, color: PAL.green });
  dw.label('lAform', 'A', { intro: 9, color: PAL.green });

  // ---- step 10: anchor Fₗ --------------------------------------------
  dw.arrow('FLf', { intro: 10, ...ARROW });
  dw.arrow('FLform', { intro: 10, ...ARROW });
  dw.label('lFLf', 'Fₗ', { intro: 10, color: PAL.green });
  dw.label('lFLform', 'Fₗ', { intro: 10, color: PAL.green });

  // ---- step 11: components --------------------------------------------
  dw.dashArrow('FLH', { intro: 11, w: 2.6, headLen: 12, headW: 4.6, color: PAL.grey, dash: 6 });
  dw.dashArrow('FLV', { intro: 11, w: 2.6, headLen: 12, headW: 4.6, color: PAL.grey, dash: 6 });
  dw.label('lFLH', 'Fₗₕ = H', { intro: 11, color: PAL.grey });
  dw.label('lFLV', 'Fₗᵥ', { intro: 11, color: PAL.grey });

  // ---- step 12: the right half in grey --------------------------------
  for (let k = 0; k < NS1 + NS2; k++) dw.dashLine(`st3_${k}`, { intro: 12, dash: 2.2, flash: false });
  dw.dashLine('ax690', { intro: 12, color: PAL.black, dash: 3, flash: false });
  dw.dashLine('ax945', { intro: 12, color: PAL.black, dash: 3, flash: false });
  dw.poly('band3', 4, { intro: 12, opacity: 0.1, color: PAL.grey });
  dw.strokes('band3e', 4, { intro: 12, w: 1.6, color: GREY_M });
  dw.poly('band3m', 4, { intro: 12, opacity: 0.1, color: PAL.grey });
  dw.strokes('band3me', 4, { intro: 12, w: 1.6, color: GREY_M });
  dw.strokes('bandR', NS1 + NS2 + 2, { intro: 12, w: W_BAR, color: GREY_M });
  dw.strokes('fanR', NS1 - 1, { intro: 12, w: W_RAY, color: GREY_L });
  dw.strokes('extR', NS2 - 1, { intro: 12, w: W_RAY, color: GREY_L });
  dw.strokes('ltR', NS1 + NS2 + 1, { intro: 12, w: 1.0, color: GREY_L });
  dw.dashLine('h8R', { intro: 12, color: GREY_M, dash: 5 });
  dw.arrow('R12r', { intro: 12, ...ARROW, color: GREY_M });
  dw.arrow('R2r', { intro: 12, ...ARROW, color: GREY_M });
  dw.arrow('FRr', { intro: 12, ...ARROW, color: GREY_M });
  dw.arrow('Br', { intro: 12, ...ARROW, color: GREY_M });
  dw.arrow('R12rf', { intro: 12, ...ARROW, color: GREY_M });
  dw.arrow('R2rf', { intro: 12, ...ARROW, color: GREY_M });
  dw.arrow('Brf', { intro: 12, ...ARROW, color: GREY_M });
  dw.arrow('FRabut', { intro: 12, ...ARROW, color: GREY_M });
  dw.dashArrow('FRV', { intro: 12, w: 2.6, headLen: 12, headW: 4.6, color: GREY_M, dash: 6 });
  dw.dashArrow('FRH', { intro: 12, w: 2.6, headLen: 12, headW: 4.6, color: GREY_M, dash: 6 });
  for (const [n, t] of [['lR12r', 'R₁/₂'], ['lR2r', 'R₂'], ['lFRr', 'Fᵣ'],
                        ['lBr', 'B'], ['lR12rf', 'R₁/₂'], ['lR2rf', 'R₂'],
                        ['lBrf', 'B'], ['lFRabut', 'Fᵣ'], ['lFRV', 'Fᵣᵥ'], ['lFRH', 'Fᵣₕ']]) {
    dw.label(n, t, { intro: 12, color: GREY_M });
  }

  // ---- step 13: resolve: pipes + readouts -----------------------------
  for (let k = 0; k < NS1 + NS2 + 2; k++) {
    dw.poly(`if${k}`, 4, { intro: RESOLVE, opacity: 0.45, flash: false,
      color: { pending: PAL.grey, final: () => PAL.red }, when: (st) => st.o1 });
  }
  const ROS = ['H', 'A', 'Fₗ', 'R₁/₂', 'R₂'];
  ROS.forEach((_, i) => dw.label(`ro${i}`, '', { intro: RESOLVE, flash: false,
    color: i < 3 ? PAL.green : PAL.green }));

  // ---- per-strip load arrows (the applet's v_4 "Resultierende") -------
  const v4on = (st) => st.v4;
  dw.strokes('qa1', NS1 * 3, { intro: 2, w: 1.6, color: PAL.green, when: v4on, flash: false });
  dw.strokes('qa2', NS2 * 6, { intro: 6, w: 1.6, color: PAL.green, when: v4on, flash: false });
  dw.strokes('qa3', (NS1 + NS2 * 2) * 3, { intro: 12, w: 1.6, color: GREY_M, when: v4on, flash: false });

  // ---- points ----------------------------------------------------------
  const HANDLE = { r: 5.5 }, DERIVED = { r: 4.2 };
  dw.disk('pt_S21', { intro: 1, ...DERIVED, when: pts });
  dw.disk('pt_S22', { intro: 1, ...DERIVED, when: pts });
  dw.disk('pt_S22b', { intro: 1, ...DERIVED, when: pts });
  dw.disk('pt_S21b', { intro: 1, ...DERIVED, when: pts });
  dw.disk('pt_spR', { intro: 2, ...HANDLE, when: pts });
  dw.disk('pt_P5', { intro: 2, ...DERIVED, when: pts });
  dw.disk('pt_MV', { intro: 3, ...HANDLE, when: pts });
  dw.disk('pt_Z22', { intro: 3, ...DERIVED, when: pts });
  dw.disk('pt_o1', { intro: 3, ...DERIVED, when: pts });
  dw.disk('pt_F8', { intro: 6, ...DERIVED, when: pts });
  dw.disk('pt_W22', { intro: 7, ...DERIVED, when: pts });
  dw.disk('pt_o2', { intro: 7, ...DERIVED, when: pts });
  dw.disk('pt_N7', { intro: 9, ...DERIVED, when: pts });
  const letters = { MV: ['C', 3], Z22: ['Z', 3], o1: ['o₁', 3], W22: ['W', 7],
                    o2: ['o₂', 7], N7: ['N₇', 9] };
  for (const [pn, [text, intro]] of Object.entries(letters)) {
    dw.label(`lbl_${pn}`, text, { cls: 'point', intro, when: pts });
  }

  // node-equilibrium inspector
  dw.nodeInspector(3, { when: (st) => st.node > 0, w: 1.5 * W_BAR, headLen: 16, headW: 6.4, r: 5.8 });

  // dual hover pairs
  dw.link('band1', 'band1e', 'lq1', 'LL1', 'lt1');
  dw.link('R12f', 'lR12f', 'LL1', 'lR12');
  dw.link('str1', 'fan1');
  dw.link('chord1', 'tan1a', 'tan1b', 'par1a', 'par1b');
  dw.link('Hform', 'lHform', 'Hf', 'lHf');
  dw.link('Fpier', 'lFpier', 'Ff', 'lFf');
  dw.link('band2', 'band2e', 'band2m', 'band2me', 'lq2', 'LL2', 'lt2');
  dw.link('R2form', 'lR2form', 'LL2', 'lR2');
  dw.link('FLpier', 'lFLpier', 'flfr');
  dw.link('chord2', 'tan2a', 'tan2b', 'par2a', 'par2b');
  dw.link('str2', 'fan2', 'ext2');
  dw.link('Aform', 'lAform', 'Af', 'lAf');
  dw.link('FLform', 'lFLform', 'FLf', 'lFLf');
  dw.link('FLH', 'lFLH', 'FLV', 'lFLV');
  dw.link('bandR', 'fanR', 'extR');
  dw.link('R12rf', 'lR12rf', 'R12r', 'lR12r');
  dw.link('R2rf', 'lR2rf', 'R2r', 'lR2r');
  dw.link('Brf', 'lBrf', 'Br', 'lBr');
  dw.link('FRabut', 'lFRabut', 'FRr', 'lFRr');
  dw.ghostable('LL1', 'LL2', 'Hf', 'Ff', 'Af', 'FLf', 'R12r', 'R2r', 'FRr', 'Br');
  dw.highlight('FLform', [11]);

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [-140, 215]);
    dw.setLabel('force_title', [-140, -300]);
    dw.setLabel('force_sub', [-140, -330]);
    dw.setText('force_sub', `1 unit :: ${(s.sFD / 20).toFixed(2)} kN`);

    // site + dimensions
    dw.setStrokes('siteG', SITE.grey);
    dw.setStrokes('siteB', SITE.ground);
    dw.setSeg('dim', [10, YDIM], [1030, YDIM]);
    const tick = [];
    for (const x of [10, 180, 520, 860, 1030]) {
      tick.push([[x - 3.5, YDIM - 3.5], [x + 3.5, YDIM + 3.5]],
                [[x - 3.5, YDIM + 3.5], [x + 3.5, YDIM - 3.5]],
                [[x, YDIM - 4.5], [x, YDIM + 4.5]], [[x - 4.8, YDIM], [x + 4.8, YDIM]]);
    }
    dw.setStrokes('dimT', tick);
    DIMTXT.forEach(([, x], i) => dw.setLabel(`dim${i}`, [x, YDIM - 28]));
    dw.setDashLine('endL', [[10, YSTRIP[0]], [10, YSTRIP[1]]]);
    dw.setDashLine('endR', [[1030, YSTRIP[0]], [1030, YSTRIP[1]]]);
    dw.setDashLine('pierL', [[180, YSTRIP[0]], [180, YSTRIP[1]]]);
    dw.setDashLine('pierR', [[860, YSTRIP[0]], [860, YSTRIP[1]]]);

    // step 2
    for (let k = 0; k < NS1; k++) dw.setDashLine(`st1_${k}`, [[CENT1[k], YSTRIP[0]], [CENT1[k], YSTRIP[1]]]);
    dw.setDashLine('ax350', [[350, YSTRIP[0]], [350, YSTRIP[1]]]);
    dw.setDashLine('ax520', [[520, YSTRIP[0]], [520, YSTRIP[1]]]);
    dw.setPoly('band1', [[180, BAND[0]], [520, BAND[0]], [520, BAND[1]], [180, BAND[1]]]);
    dw.setStrokes('band1e', pairs([[180, BAND[0]], [520, BAND[0]], [520, BAND[1]], [180, BAND[1]], [180, BAND[0]]]));
    dw.setLabel('lq1', [166, (BAND[0] + BAND[1]) / 2]);
    dw.setArrow('R12f', [350, S4Y], [350, S4Y - 30 * s.sLS]);
    dw.setLabel('lR12f', [362, S4Y - 15 * s.sLS]);
    dw.setArrow('LL1', d.spR, d.P5);
    dw.setStrokes('lt1', d.lp.map((pt) => [[pt[0] - 4, pt[1]], [pt[0] + 4, pt[1]]]));
    dw.setLabel('lR12', [d.spR[0] - 24, (d.spR[1] + d.P5[1]) / 2]);

    // step 3
    dw.setDashLine('mvseg', [[XM, 0.938826], [XM, -70.829477]]);
    dw.setDashLine('chord1', [FDS22, d.MV]);
    dw.setDashLine('tan1a', [FDS22, d.Z22]);
    dw.setDashLine('tan1b', [d.MV, d.Z22]);
    dw.setDashLine('par1a', [d.spR, d.pole1]);
    dw.setDashLine('par1b', [d.P5, d.pole1]);

    // step 4
    dw.setStrokes('fan1', d.lp.slice(1, NS1).map((pt) => [pt, d.pole1]));
    dw.setStrokes('str1', pairs(d.fun1));

    // step 5
    dw.setArrow('Hf', d.P5, d.pole1);
    dw.setArrow('Ff', d.spR, d.pole1);
    dw.setLabel('lHf', [(d.P5[0] + d.pole1[0]) / 2, d.pole1[1] + 14]);
    dw.setLabel('lFf', V.add(V.mid(d.spR, d.pole1), [-16, 12]));
    dw.setArrow('Hform', d.MV, d.G);
    dw.setLabel('lHform', [d.G[0] + 4, d.G[1] + 13]);
    dw.setArrow('Fpier', FDS22, d.V22);
    dw.setLabel('lFpier', V.add(d.V22, [10, 12]));

    // step 6
    dw.setLabel('assume', [300, 222]);
    for (let k = 0; k < NS2; k++) dw.setDashLine(`st2_${k}`, [[CENT2[k], YSTRIP[0]], [CENT2[k], YSTRIP[1]]]);
    dw.setDashLine('ax95', [[95, YSTRIP[0]], [95, YSTRIP[1]]]);
    dw.setPoly('band2', [[10, BAND[0]], [180, BAND[0]], [180, BAND[1]], [10, BAND[1]]]);
    dw.setStrokes('band2e', pairs([[10, BAND[0]], [180, BAND[0]], [180, BAND[1]], [10, BAND[1]], [10, BAND[0]]]));
    dw.setPoly('band2m', [[10, BANDM[0]], [180, BANDM[0]], [180, BANDM[1]], [10, BANDM[1]]]);
    dw.setStrokes('band2me', pairs([[10, BANDM[0]], [180, BANDM[0]], [180, BANDM[1]], [10, BANDM[1]], [10, BANDM[0]]]));
    dw.setLabel('lq2', [-6, (BAND[0] + BAND[1]) / 2]);
    dw.setArrow('R2form', [95, S4Y], [95, S4Y - 30 * s.sLS]);
    dw.setLabel('lR2form', [107, S4Y - 15 * s.sLS]);
    dw.setArrow('LL2', d.F8, d.spR);
    dw.setStrokes('lt2', d.fp.map((pt) => [[pt[0] - 4, pt[1]], [pt[0] + 4, pt[1]]]));
    dw.setLabel('lR2', [d.spR[0] - 24, (d.spR[1] + d.F8[1]) / 2]);
    dw.setArrow('FLpier', FDS22, d.S22);
    dw.setLabel('lFLpier', V.add(d.S22, [-12, 12]));
    dw.setLabel('flfr', [-130, -5]);

    // step 7
    dw.setDashLine('chord2', [FDS21, FDS22]);
    dw.setDashLine('tan2a', [FDS21, d.Z4]);
    dw.setDashLine('tan2b', [FDS22, d.Z4]);
    dw.setDashLine('par2a', [d.F8, d.pole2]);
    dw.setDashLine('par2b', [d.spR, d.pole2]);
    dw.setStrokes('fan2', d.fp.slice(1, NS2).map((pt) => [pt, d.pole2]));

    // step 8
    dw.setStrokes('str2', pairs(d.fun2));

    // step 9
    dw.setDashLine('aline', [[d.pole1[0], d.pole1[1] - 14], [d.pole1[0], d.N7[1] + 14]]);
    dw.setStrokes('ext2', d.ext);
    dw.setArrow('Af', d.pole1, d.N7);
    dw.setLabel('lAf', [d.pole1[0] + 14, (d.pole1[1] + d.N7[1]) / 2]);
    dw.setArrow('Aform', [95, YH - 110.248], [95, YH - 110.248 + 30 * s.sLS]);
    dw.setLabel('lAform', [107, YH - 110.248 + 15 * s.sLS]);

    // step 10
    dw.setArrow('FLf', d.N7, d.F8);
    dw.setLabel('lFLf', V.add(V.mid(d.N7, d.F8), [-20, 14]));
    dw.setArrow('FLform', FDS21, d.W4);
    dw.setLabel('lFLform', V.add(d.W4, [-6, 16]));

    // step 11
    dw.setDashArrow('FLH', d.N7, d.Hpt);
    dw.setDashArrow('FLV', d.Hpt, d.F8);
    dw.setLabel('lFLH', [(d.N7[0] + d.Hpt[0]) / 2, d.Hpt[1] + 14]);
    dw.setLabel('lFLV', [d.Hpt[0] + 18, (d.Hpt[1] + d.F8[1]) / 2 - 8]);

    // step 12: right half
    const mx = mirX(XM);
    for (let k = 0; k < NS1; k++) {
      dw.setDashLine(`st3_${k}`, [[2 * XM - CENT1[k], YSTRIP[0]], [2 * XM - CENT1[k], YSTRIP[1]]]);
    }
    for (let k = 0; k < NS2; k++) {
      dw.setDashLine(`st3_${NS1 + k}`, [[2 * XM - CENT2[k], YSTRIP[0]], [2 * XM - CENT2[k], YSTRIP[1]]]);
    }
    dw.setDashLine('ax690', [[690, YSTRIP[0]], [690, YSTRIP[1]]]);
    dw.setDashLine('ax945', [[945, YSTRIP[0]], [945, YSTRIP[1]]]);
    dw.setPoly('band3', [[520, BAND[0]], [1030, BAND[0]], [1030, BAND[1]], [520, BAND[1]]]);
    dw.setStrokes('band3e', pairs([[520, BAND[0]], [1030, BAND[0]], [1030, BAND[1]], [520, BAND[1]], [520, BAND[0]]]));
    dw.setPoly('band3m', [[860, BANDM[0]], [1030, BANDM[0]], [1030, BANDM[1]], [860, BANDM[1]]]);
    dw.setStrokes('band3me', pairs([[860, BANDM[0]], [1030, BANDM[0]], [1030, BANDM[1]], [860, BANDM[1]], [860, BANDM[0]]]));
    dw.setStrokes('bandR', pairs(d.bandR));
    dw.setStrokes('fanR', d.lpm.slice(1, NS1).map((pt) => [pt, d.pole1]));
    dw.setStrokes('extR', d.extm);
    dw.setStrokes('ltR', [...d.lpm, ...d.fpm.slice(1)].map((pt) => [[pt[0] - 4, pt[1]], [pt[0] + 4, pt[1]]]));
    dw.setDashLine('h8R', [d.J15, d.pole2m]);
    dw.setArrow('R12r', d.P5, d.I15);
    dw.setLabel('lR12r', [d.P5[0] - 24, (d.P5[1] + d.I15[1]) / 2]);
    dw.setArrow('R2r', d.I15, d.J15);
    dw.setLabel('lR2r', [d.I15[0] - 24, (d.I15[1] + d.J15[1]) / 2]);
    dw.setArrow('FRr', d.J15, d.K15);
    dw.setLabel('lFRr', V.add(V.mid(d.J15, d.K15), [-20, -14]));
    dw.setArrow('Br', d.K15, d.pole1);
    dw.setLabel('lBr', [d.pole1[0] + 14, (d.K15[1] + d.pole1[1]) / 2]);
    dw.setArrow('R12rf', [690, S4Y], [690, S4Y - 30 * s.sLS]);
    dw.setLabel('lR12rf', [702, S4Y - 15 * s.sLS]);
    dw.setArrow('R2rf', [945, S4Y], [945, S4Y - 30 * s.sLS]);
    dw.setLabel('lR2rf', [957, S4Y - 15 * s.sLS]);
    dw.setArrow('Brf', [945, YH - 110.248], [945, YH - 110.248 + 30 * s.sLS]);
    dw.setLabel('lBrf', [957, YH - 110.248 + 15 * s.sLS]);
    dw.setArrow('FRabut', mx(FDS21), mx(d.W4));
    dw.setLabel('lFRabut', V.add(mx(d.W4), [6, 16]));
    dw.setDashArrow('FRV', d.J15, d.H2m);
    dw.setDashArrow('FRH', d.H2m, d.K15);
    dw.setLabel('lFRV', [d.H2m[0] + 18, (d.J15[1] + d.H2m[1]) / 2 + 8]);
    dw.setLabel('lFRH', [(d.H2m[0] + d.K15[0]) / 2, d.H2m[1] - 14]);

    // step 13: pipes + readouts
    const bl = d.bandL;
    for (let k = 0; k < NS1 + NS2 + 2; k++) {
      const Fk = k < NS2 + 1 ? d.N2[k] : d.N1[k - (NS2 + 1)];
      dw.setPoly(`if${k}`, V.rectPoints(bl[k], bl[k + 1], s.sIF * Fk));
    }
    const roAt = [720, -320];
    const vals = [d.HkN, d.AkN, d.FLkN, d.R12kN, d.R2kN];
    ROS.forEach((t, i) => {
      dw.setLabel(`ro${i}`, [roAt[0], roAt[1] - 26 * i]);
      dw.setText(`ro${i}`, `${t} = ${vals[i].toFixed(1)} kN`);
    });

    // per-strip load arrows (v_4)
    const yq = (BAND[0] + BAND[1]) / 2, LA = 10 * s.sLS;
    const yqm = 2 * YH - yq;
    const head = (a, b) => {                            // tiny stroke arrow: shaft + head
      const u2 = V.unit(V.sub(b, a));
      const p2 = V.perp(u2);
      return [[a, b],
              [V.add(V.sub(b, V.mul(u2, 4)), V.mul(p2, 2.6)), b],
              [V.add(V.sub(b, V.mul(u2, 4)), V.mul(p2, -2.6)), b]];
    };
    const qa1 = [], qa2 = [], qa3 = [];
    for (const c of CENT1) qa1.push(...head([c, yq], [c, yq - LA]));
    for (const c of CENT2) { qa2.push(...head([c, yq], [c, yq - LA])); qa2.push(...head([c, yqm], [c, yqm + LA])); }
    for (const c of CENT1) qa3.push(...head([2 * XM - c, yq], [2 * XM - c, yq - LA]));
    for (const c of CENT2) { qa3.push(...head([2 * XM - c, yq], [2 * XM - c, yq - LA])); qa3.push(...head([2 * XM - c, yqm], [2 * XM - c, yqm + LA])); }
    dw.setStrokes('qa1', qa1);
    dw.setStrokes('qa2', qa2);
    dw.setStrokes('qa3', qa3);

    // points + letters
    dw.setDisk('pt_S21', FDS21);
    dw.setDisk('pt_S22', FDS22);
    dw.setDisk('pt_S22b', mx(FDS22));
    dw.setDisk('pt_S21b', mx(FDS21));
    dw.setDisk('pt_spR', d.spR);
    dw.setDisk('pt_P5', d.P5);
    dw.setDisk('pt_MV', d.MV);
    dw.setDisk('pt_Z22', d.Z22);
    dw.setDisk('pt_o1', d.pole1);
    dw.setDisk('pt_F8', d.F8);
    dw.setDisk('pt_W22', d.Z4);
    dw.setDisk('pt_o2', d.pole2);
    dw.setDisk('pt_N7', d.N7);
    const at = { MV: V.add(d.MV, [0, 21]), Z22: V.add(d.Z22, [6, -16]),
                 o1: V.add(d.pole1, [12, -12]), W22: V.add(d.Z4, [0, 15]),
                 o2: V.add(d.pole2, [-14, 8]), N7: V.add(d.N7, [14, 8]) };
    for (const pn of Object.keys(letters)) dw.setLabel(`lbl_${pn}`, at[pn]);
  }

  // ------------------------------------------------------------------
  // node-equilibrium inspector: 1 abutment, 2 pier, 3..22 main-field
  // vertices, 23 crown. (Approach vertices are excluded: the applet's
  // pole2 rays are construction, not band forces — see the notes.)
  // ------------------------------------------------------------------
  function nodePoly() {
    const j = Math.round(s.node);
    if (j <= 1) return [[d.N7, d.F8], [d.F8, d.N7]];                  // Fₗ vs band tangent
    if (j === 2) return [[d.spR, d.pole1], [d.pole1, d.spR]];         // Fᵣ both sides
    if (j === 23) return [[d.P5, d.pole1], [d.pole1, d.P5]];          // H both sides
    const k = j - 2;                                                  // 1..20
    return [[d.lp[k - 1], d.lp[k]], [d.lp[k], d.pole1], [d.pole1, d.lp[k - 1]]];
  }
  function updateNode() {
    const j = Math.round(s.node);
    dw.selectDisk(null);
    const name = j === 1 ? 'abutment' : j === 2 ? 'pier' : j === 23 ? 'crown' : `${j - 2}`;
    dw.setNodeInspector([260, 120], 52, `node ${name}`, nodePoly());
  }

  let player = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    update();
    updateNode();
    player.apply(d, s);
  }

  player = makePlayer(STEPS, refresh);

  // ------------------------------------------------------------------
  // side panel + dragging
  // ------------------------------------------------------------------

  const view = panel.section('View');
  panel.button(view, 'zoom fit', () => dw.zoomFit());

  const par = panel.section('Parameters');
  panel.slider(par, s, 'FG', 'F_G — one strip load (kN)', 5, 20, 1, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (kN/20 units)', 50, 100, 10, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 1, 3, 0.1, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.012, 0.0005, refresh);
  panel.toggle(par, s, 'v4', 'show strip load arrows', refresh);
  panel.toggle(par, s, 'o4', 'show site drawing', refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off, 1 = abutment, 2 = pier, 3–22 = strips, 23 = crown)',
               0, 23, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS });
    panel.syncAll();
    refresh();
  });

  const hits = [['MV', () => d.MV, 3, 99], ['spR', () => d.spR, 2, 99]];
  dw.enableDrag(
    (wx, wy, tol) => {
      let best = null;
      for (const [name, get, k0, k1] of hits) {
        if (player.k < k0 || player.k >= k1) continue;
        const p = get();
        const dd = Math.hypot(p[0] - wx, p[1] - wy);
        if (dd < tol) { best = name; tol = dd; }
      }
      return best;
    },
    (name, wx, wy) => {
      if (name === 'MV') s.mvy = Math.max(-70.829477, Math.min(0.938826, wy));
      else if (name === 'spR') {
        s.spx = Math.max(-190, Math.min(860, wx));
        s.spy = Math.max(-640, Math.min(-180, wy));
      }
      refresh();
    },
  );

  // click a node of the band to inspect it
  const nodes = [{ at: () => FDS21 }, { at: () => FDS22 }];
  for (let k = 1; k <= NS1; k++) nodes.push({ at: () => d.fun1[k] });
  nodes.push({ at: () => d.MV });
  dw.nodeSelect(nodes, (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
