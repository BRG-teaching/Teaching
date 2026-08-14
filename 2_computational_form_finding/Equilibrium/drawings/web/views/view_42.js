/**
 * Drawing view/42 "Internal forces in a fixed frame"
 * (https://block.arch.ethz.ch/eq/drawing/view/42) as a step-by-step
 * construction.
 *
 * The original applet has NO step slider: it is a single parametric drawing.
 * A portal frame (girder drawn as a deep two-chord beam, corners framed to
 * the legs by triangulated brackets, feet A and B) carries a load 2Q on the
 * centre axis. The three external forces (load + two reactions) must be
 * concurrent: the reactions climb from the feet to the point N at height
 * h x h_drawn on the centre axis -- the slider h is the frame-height
 * multiplier (buttons h=1, h=2, h=100; checkbox o = "h=inf" swaps in the
 * vertical-reaction layout). Where the reaction lines of action cross the
 * girder axis (O left, P right) the bending moment is zero: the tension
 * resultant (red) runs from the corner top C through O to the midspan
 * bottom, the compression resultant (blue) from the midspan top G through O
 * to the corner bottom D. The force diagram is normalised so that the
 * largest chord force is always drawn N_max long (dotted rails + N_max
 * dimensions); the resulting length of Q measures the load the frame can
 * carry: lambda = Q/Q(h=1) grows linearly to its optimum lambda = 2 at
 * h = 2 (corner and midspan chord forces equal) and decays towards ~8/7 as
 * h -> inf. Two force-polygon constructions exist exactly as in the applet:
 * h <= 2 anchors the corner chord force (B_1 branch), h > 2 the midspan
 * chord force (E_1 branch).
 *
 * Whole chain regression-checked against the LIVE applet (h = 1, 2, 5, 100,
 * o=true, dragged A/B/C/D + h=1.7 + sFD=1.3) to 3.3e-14.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 42 — Internal forces in a fixed frame',
  subtitle: 'how the height of a fixed portal frame sets its internal forces — and why h = 2 is the optimum',
  about: 'A fixed portal frame under a central load: the load and the two reactions must meet at one point N on the centre axis, and the taller the frame (slider h), the steeper the reactions. Where a reaction’s line of action crosses the girder axis (O and P) the moment is zero: the tension resultant (pink) trades sides with the compression resultant (blue) there. Drawing every force diagram to the same maximum chord force N_max makes the frames comparable: the length of Q becomes the carrying capacity λ·Q, which peaks at h = 2, where corner and midspan chord forces are equal.',
  frame: [[1.8, 2.4], [22.1, 12.6]],
};

const YA = 4;                       // feet level (the applet's y(A) = y(B))

const DEFAULTS = {
  ax: 5, bx: 10,                    // feet A, B (x; y fixed at 4)
  yC: 8, yD: 7,                     // girder top / bottom chord levels
  h: 1,                             // frame-height multiplier [1, 100]
  sFD: 1.85,                        // scaleForceDiagram [1, 2.5]
  sLS: 0.8,                         // scaleLoadSymbol [0.8, 2]
  sIF: 0.05,                        // internal-force pipe scale
  r2x: 18, r2y: 9,                  // R2 -- force-diagram anchor (drag!)
  yT1: 9.414054020689301,           // height of the top N_max dimension (drag)
  o: false,                         // applet checkbox "h=inf"
  o1: true,                         // show internal forces (pipes)
  pts: false,                       // applet checkbox "show points"
  sh: false,                        // applet checkbox "show handles"
  node: 0,                          // node-equilibrium inspector (0 = off)
  _k: 99,
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The girder', d: 'left: the girder of the frame is a deep beam: top chord C–E, bottom chord D–F, a post on the centre axis (drag C and D to change its depth!)' },
  { t: 'Fixed corners and legs', d: 'left: triangulated brackets frame the girder rigidly into the legs — the frame is "fixed"; the legs taper to the feet A and B (drag A and B along the dashed guide)' },
  { t: 'The height of the frame', d: 'left: the drawn height is h (inner dimension); the frame stands h times taller (slider h!) — the outer dimension climbs to N on the centre axis' },
  { t: 'The load 2Q and the budget Nₘₐₓ', d: 'left: the load 2Q acts on the centre axis, drawn at N where all external forces must meet — right: every force diagram will be drawn to the same maximum chord force Nₘₐₓ (dimension + dotted rails), starting from R₂' },
  { t: 'Lines of action of the reactions', d: 'left: three forces in equilibrium are concurrent: the reactions of the feet A and B aim at N (dashed) — right: the direction of reaction A, parallel through R₂ (dashed)' },
  { t: 'O and P: zero-moment points', d: 'left: the reaction lines cross the girder axis at O and P — there the moment vanishes and the internal resultants must trade sides (grey axis guide)' },
  { t: 'The tension resultant (pink)', d: 'left: tension runs from the corner top C through O down to the midspan bottom — right: its corner-side force drawn from R₂ parallel to C–O, as long as the rail allows' },
  { t: 'The compression resultant (blue)', d: 'left: compression runs from the midspan top G through O into the corner bottom D — right: parallel to O–D until the polygon meets the reaction’s line of action: A₁' },
  { t: 'Reaction A = Q + H', d: 'right: the diagonal A₁→R₂ is the reaction A; its vertical part is the half-load Q, its horizontal part the thrust H — λ compares Q with the h = 1 reference' },
  { t: 'The quadrilateral closes', d: 'right: the midspan-side forces — parallel to G–O through R₂ and to O–Q₂ through A₁ (at h = 1 they are vertical and vanish into Q; move the slider!); the lower Nₘₐₓ dimension spans the polygon' },
  { t: 'The right half mirrors', d: 'left: on the right half the same resultants run through P (drawn black, as in the original) — the force polygon would be the mirror image' },
  { t: 'The optimum h = 2', d: 'λ grows with h up to λ = 2 at h = 2 — corner and midspan chord forces equal — then decays: try the buttons h = 1 / 2 / 100, the "h = ∞" toggle, drag A, B, C, D, R₂, and click a node (A, B, O, P)',
    take: 'the best frame height is where corner and midspan chord forces are EQUAL — λ peaks exactly at h = 2' },
];

function inter(p1, d1, p2, d2) {
  const r = V.intersect(p1, d1, p2, d2);
  return r || [NaN, NaN];
}
const ok = (p) => Number.isFinite(p[0]) && Number.isFinite(p[1]);

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const A = [s.ax, YA], B = [s.bx, YA];
  const C = [s.ax, s.yC], D = [s.ax, s.yD];
  const E = [s.bx, s.yC], F = [s.bx, s.yD];
  const xG = (s.ax + s.bx) / 2;
  const G = [xG, s.yC];
  const H1 = [xG, (s.yC + s.yD) / 2];               // girder centre (diagonals cross)
  const q = H1[1] - YA;                             // drawn height "h"
  const N = [xG, YA + q * s.h];                     // reactions meet here
  const r = s.yC - s.yD;                            // girder depth
  const J = [s.ax - r, s.yD], K = [s.ax - r, s.yC];
  const Kp = [2 * xG - K[0], s.yC], Ip = [2 * xG - J[0], s.yD];
  const Q2 = [xG, s.yD];                            // midspan bottom
  const Qm = [s.ax, H1[1]], B2 = [s.bx, H1[1]];     // corner axis points (h=inf)
  const O = inter(A, V.sub(N, A), H1, [1, 0]);      // zero-moment points
  const P = inter(B, V.sub(N, B), H1, [1, 0]);
  const S = inter(C, V.sub(Q2, C), G, V.sub(D, G));

  // ---- force diagram: hidden reference construction fixes N_max ----
  const R2 = [s.r2x, s.r2y];
  const dAS = V.unit(V.sub(S, A));
  const T = V.sub(R2, V.mul(dAS, s.sFD));
  const U = inter(R2, V.sub(Q2, C), T, V.sub(D, G));
  const Vp = [R2[0], T[1]];
  const W = inter(Vp, dAS, R2, [1, 0]);
  const Z = inter(W, V.sub(D, G), Vp, V.sub(Q2, C));
  const Zp = [Z[0] + T[0] - R2[0], Z[1]];
  const nmax = R2[0] - Zp[0];                       // N_max (drawing length)

  // ---- h <= 2 branch: corner chord force governs (B1 anchored on x(U)) ----
  const B1 = inter([U[0], 0], [0, 1], R2, V.sub(O, C));
  const A1 = inter(B1, V.sub(D, O), R2, V.sub(N, A));
  const C1 = [R2[0], A1[1]];
  const D1 = Math.abs(s.h - 1) < 1e-9 ? [NaN, NaN]
    : inter(R2, V.sub(O, G), A1, V.sub(Q2, O));
  // ---- h > 2 branch: midspan chord force governs (E1 anchored on x(Z')) ----
  const E1 = inter([Zp[0], 0], [0, 1], R2, V.sub(O, G));
  const F1 = inter(E1, V.sub(Q2, O), R2, V.sub(N, A));
  const G1 = [R2[0], F1[1]];
  const I1 = inter(R2, V.sub(O, C), F1, V.sub(D, O));

  const le = s.h <= 2;
  const Ax = le ? A1 : F1;                          // polygon vertex on the reaction line
  const Qx = le ? C1 : G1;
  const lam = V.dist(R2, Qx) / (Math.abs(T[1] - R2[1]) / 2);
  const Rvec = V.sub(R2, Ax);                       // reaction A (force on the frame)

  // ---- load + reaction symbols (scaleLoadSymbol) ----
  const O1 = [xG, N[1] + s.sLS], Z1 = [xG, N[1] + 2 * s.sLS];
  const uNA = V.unit(V.sub(N, A)), uNB = V.unit(V.sub(N, B));
  const J1 = V.sub(A, V.mul(uNA, s.sLS));           // tail of the foot arrow at A
  const M1 = V.sub(B, V.mul(uNB, s.sLS));

  // ---- dimension apparatus ----
  const P1 = [K[0] - 0.5, O[1]], S1 = [P1[0], YA];
  const Q1 = [P1[0] - 0.5, N[1]], R1 = [Q1[0], YA];
  const T1 = [R2[0], s.yT1], U1 = [Zp[0], s.yT1];   // top N_max dimension
  const C2 = [Ax[0], Ax[1] - 0.5];
  const E2 = [C2[0] + nmax, C2[1]];                 // bottom N_max dimension
  const W1 = [Zp[0], 10], A2 = [Zp[0], YA];         // dotted rails
  const F2 = [E2[0], 10], G2 = [E2[0], YA];
  const S2 = [s.ax, 18.624904441782714], T2 = [s.bx, 18.624904441782714]; // h=inf

  // ---- member-resultant magnitudes (for the pipes) ----
  const fCO = le ? V.dist(R2, B1) : V.dist(I1, R2);
  const fOD = le ? V.dist(B1, A1) : V.dist(F1, I1);
  let fGO = le ? V.dist(D1, R2) : V.dist(R2, E1);
  let fOQ2 = le ? V.dist(A1, D1) : V.dist(E1, F1);
  if (!Number.isFinite(fGO)) fGO = 0;               // h = 1: quad collapses
  if (!Number.isFinite(fOQ2)) fOQ2 = 0;
  const cap = 3 * nmax;                             // near h = 1 they diverge
  fGO = Math.min(fGO, cap); fOQ2 = Math.min(fOQ2, cap);

  // ---- leg-bar forces (feet decompose the reaction into the two bars) ----
  const legs = (foot, n1, n2, R) => {
    const u1 = V.unit(V.sub(n1, foot)), u2 = V.unit(V.sub(n2, foot));
    const det = V.cross(u1, u2);
    const rhs = V.mul(R, -1);
    const f1 = V.cross(rhs, u2) / det, f2 = V.cross(u1, rhs) / det;
    return [V.mul(u1, f1), V.mul(u2, f2)];          // forces ON the foot node
  };
  const RB = [-Rvec[0], Rvec[1]];
  const [FAJ, FAD] = legs(A, J, D, Rvec);
  const [FBI, FBF] = legs(B, Ip, F, RB);

  return { A, B, C, D, E, F, G, xG, H1, q, N, J, K, Kp, Ip, Q2, Qm, B2, O, P, S,
           R2, T, U, Vp, W, Z, Zp, nmax, B1, A1, C1, D1, E1, F1, G1, I1,
           le, Ax, Qx, lam, Rvec, RB, O1, Z1, J1, M1,
           P1, S1, Q1, R1, T1, U1, C2, E2, W1, A2, F2, G2, S2, T2,
           fCO, fOD, fGO, fOQ2, FAJ, FAD, FBI, FBF };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);

  const W_BAR = 0.028, W_RES = 0.042;
  const ARROW = { w: 0.07, headLen: 0.26, headW: 0.1 };
  const le = (st) => st.h <= 2;
  const gt = (st) => st.h > 2;
  const noO = (st) => !st.o;
  const quadOK = (st) => Math.abs(st.h - 1) > 1e-9;

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });

  // ------------------------------------------------------------------
  // step 2 -- the girder (chords, corner verticals, centre post)
  // ------------------------------------------------------------------
  dw.seg('chT', { intro: 1, w: W_BAR });             // e_1: C-E
  dw.seg('chB', { intro: 1, w: W_BAR });             // f_1: D-F
  dw.seg('crL', { intro: 1, w: W_BAR });             // i: D-C
  dw.seg('crR', { intro: 1, w: W_BAR });             // r: E-F
  dw.seg('post', { intro: 1, w: W_BAR });            // b_4: G-Q2

  // ------------------------------------------------------------------
  // step 3 -- framed corners (end boxes + diagonals) + legs + feet
  // ------------------------------------------------------------------
  dw.strokes('boxL', 3, { intro: 2, w: W_BAR });     // k, l, p (C-K, K-J, J-D)
  dw.seg('digL', { intro: 2, w: W_BAR });            // q_4: J-C
  dw.strokes('boxR', 3, { intro: 2, w: W_BAR });     // b_1, a_1, c_1
  dw.seg('digR', { intro: 2, w: W_BAR });            // d_1: E-I'
  dw.strokes('legL', 2, { intro: 2, w: W_BAR });     // n (A-D), m (J-A)
  dw.strokes('legR', 2, { intro: 2, w: W_BAR });     // s (F-B), t (B-I')
  dw.dashLine('gdA', { intro: 2, dash: 0.16, flash: false });   // s_5 drag guide
  dw.dashLine('gdD', { intro: 2, dash: 0.16, flash: false });   // t_5 drag guide

  // ------------------------------------------------------------------
  // step 4 -- dimensions h and h*h up to N
  // ------------------------------------------------------------------
  dw.strokes('dimI', 6, { intro: 3, w: 0.016, color: PAL.grey, flash: false });
  dw.strokes('dimO', 6, { intro: 3, w: 0.016, color: PAL.grey, flash: false });
  dw.strokes('dlead', 2, { intro: 3, w: 0.016, color: PAL.grey, flash: false });
  dw.label('ldimI', 'h', { intro: 3, color: 0x777777, flash: false });
  dw.label('ldimO', '', { intro: 3, color: 0x777777, flash: false });

  // ------------------------------------------------------------------
  // step 5 -- the load 2Q at N  |  R2 + the N_max budget
  // ------------------------------------------------------------------
  dw.arrow('loadU', { intro: 4, ...ARROW });         // w_4: Z1 -> O1
  dw.arrow('loadL', { intro: 4, ...ARROW });         // v_4: O1 -> N
  dw.label('lQu', 'Q', { intro: 4, color: PAL.green });
  dw.label('lQl', 'Q', { intro: 4, color: PAL.green });
  dw.strokes('dimT', 6, { intro: 4, w: 0.016, color: PAL.grey, flash: false });  // t_4
  dw.label('lNmT', 'Nₘₐₓ', { intro: 4, color: 0x777777, flash: false });
  dw.dashLine('railL', { intro: 4, dash: 0.045, flash: false });                 // d_5
  dw.dashLine('railR', { intro: 4, dash: 0.045, flash: false });                 // q_5

  // ------------------------------------------------------------------
  // step 6 -- lines of action + foot arrows | reaction direction at R2
  // ------------------------------------------------------------------
  dw.dashLine('loaA', { intro: 5, dash: 0.18, color: PAL.black, when: noO });  // i_1
  dw.dashLine('loaB', { intro: 5, dash: 0.18, color: PAL.black, when: noO });  // j_1
  dw.dashLine('vertL', { intro: 5, dash: 0.18, color: PAL.black, when: (st) => st.o });  // g_6
  dw.dashLine('vertR', { intro: 5, dash: 0.18, color: PAL.black, when: (st) => st.o });  // i_6
  dw.arrow('reacA', { intro: 5, ...ARROW });         // w_3: J1 -> A
  dw.arrow('reacB', { intro: 5, ...ARROW });         // u_4: M1 -> B
  dw.label('lRA', 'A', { intro: 5, color: PAL.green });
  dw.label('lRB', 'B', { intro: 5, color: PAL.green });
  dw.dashLine('rdir', { intro: 5, dash: 0.12 });     // t_2 (grey construction)

  // ------------------------------------------------------------------
  // step 7 -- O and P (zero-moment points) + girder axis guide
  // ------------------------------------------------------------------
  dw.dashLine('axis', { intro: 6, dash: 0.1 });      // girder axis (k_1 span)
  dw.strokes('mlead', 1, { intro: 6, w: 0.016, color: PAL.grey, flash: false }); // m_4

  // ------------------------------------------------------------------
  // step 8 -- tension resultant (pink) | corner-side force from R2
  // ------------------------------------------------------------------
  dw.seg('redL', { intro: 7, w: W_RES, color: PAL.red, when: noO });    // l_1: C-O
  dw.seg('redM', { intro: 7, w: W_RES, color: PAL.red, when: noO });    // m_1: O-Q2
  dw.seg('redI', { intro: 7, w: W_RES, color: PAL.red, when: (st) => st.o });  // e_6: Q-Q2
  dw.seg('fCO', { intro: 7, w: W_RES, color: PAL.red, when: le });      // b_3
  dw.seg('fCOg', { intro: 7, w: W_RES, color: PAL.red, when: (st) => gt(st) && !st.o });  // r_3

  // ------------------------------------------------------------------
  // step 9 -- compression resultant (blue) | polygon meets the reaction
  // ------------------------------------------------------------------
  dw.seg('bluL', { intro: 8, w: W_RES, color: PAL.blue, when: noO });   // n_1: G-O
  dw.seg('bluM', { intro: 8, w: W_RES, color: PAL.blue, when: noO });   // p_1: O-D
  dw.seg('bluI', { intro: 8, w: W_RES, color: PAL.blue, when: (st) => st.o });  // a_6: G-Q
  dw.seg('fOD', { intro: 8, w: W_RES, color: PAL.blue, when: le });     // c_3
  dw.seg('fODg', { intro: 8, w: W_RES, color: PAL.blue, when: (st) => gt(st) && !st.o }); // q_3

  // ------------------------------------------------------------------
  // step 10 -- the reaction A = Q + H (green) + lambda
  // ------------------------------------------------------------------
  dw.arrow('fA', { intro: 9, ...ARROW });           // w_1 / w_2
  dw.arrow('fQ', { intro: 9, ...ARROW });           // u_2 / u_3
  dw.arrow('fH', { intro: 9, ...ARROW, when: (st) => le(st) || !st.o });  // v_2 / v_3
  dw.label('lfA', 'A', { intro: 9, color: PAL.green });
  dw.label('lfQ', 'Q', { intro: 9, color: PAL.green });
  dw.label('lfH', 'H', { intro: 9, color: PAL.green, when: (st) => le(st) || !st.o });
  dw.label('lam1', '', { intro: 9, flash: false });
  dw.label('lam2', '(Qref = Q at h = 1)', { intro: 9, flash: false, color: 0x777777 });

  // ------------------------------------------------------------------
  // step 11 -- the quadrilateral closes (h != 1) + bottom N_max dimension
  // ------------------------------------------------------------------
  dw.seg('fGO', { intro: 10, w: W_RES, color: PAL.blue, when: (st) => le(st) && quadOK(st) });  // g_3
  dw.seg('fOQ2', { intro: 10, w: W_RES, color: PAL.red, when: (st) => le(st) && quadOK(st) });  // f_3
  dw.seg('fGOg', { intro: 10, w: W_RES, color: PAL.blue, when: gt });   // n_3
  dw.seg('fOQ2g', { intro: 10, w: W_RES, color: PAL.red, when: gt });   // p_3
  dw.strokes('dimB', 6, { intro: 10, w: 0.016, color: PAL.grey, flash: false });  // n_5
  dw.label('lNmB', 'Nₘₐₓ', { intro: 10, color: 0x777777, flash: false });

  // ------------------------------------------------------------------
  // step 12 -- the right half (black, as in the original)
  // ------------------------------------------------------------------
  dw.seg('rhGP', { intro: 11, w: W_RES, color: PAL.black, when: noO });   // f_5
  dw.seg('rhPQ', { intro: 11, w: W_RES, color: PAL.black, when: noO });   // g_5
  dw.seg('rhPE', { intro: 11, w: W_RES, color: PAL.black, when: noO });   // i_5
  dw.seg('rhPF', { intro: 11, w: W_RES, color: PAL.black, when: noO });   // j_5
  dw.seg('rhGB', { intro: 11, w: W_RES, color: PAL.black, when: (st) => st.o });  // m_3
  dw.seg('rhBQ', { intro: 11, w: W_RES, color: PAL.black, when: (st) => st.o });  // e_5

  // ------------------------------------------------------------------
  // internal-force pipes (on by default)
  // ------------------------------------------------------------------
  const PIPES = [
    ['pRedL', () => [d.C, d.O, d.fCO], () => PAL.red, noO],
    ['pRedM', () => [d.O, d.Q2, d.fOQ2], () => PAL.red, noO],
    ['pBluL', () => [d.G, d.O, d.fGO], () => PAL.blue, noO],
    ['pBluM', () => [d.O, d.D, d.fOD], () => PAL.blue, noO],
    ['pRhT', () => [d.G, d.P, d.fGO], () => PAL.blue, noO],
    ['pRhB', () => [d.P, d.Q2, d.fOQ2], () => PAL.red, noO],
    ['pRhE', () => [d.P, d.E, d.fCO], () => PAL.red, noO],
    ['pRhF', () => [d.P, d.F, d.fOD], () => PAL.blue, noO],
    ['pLegN', () => [d.A, d.D, V.len(d.FAD)], () => PAL.blue, () => true],
    ['pLegM', () => [d.J, d.A, V.len(d.FAJ)], () => PAL.blue, () => true],
    ['pLegS', () => [d.F, d.B, V.len(d.FBF)], () => PAL.blue, () => true],
    ['pLegT', () => [d.B, d.Ip, V.len(d.FBI)], () => PAL.blue, () => true],
  ];
  for (const [name, , col, extra] of PIPES) {
    dw.poly(name, 4, {
      intro: 7, opacity: 0.3, flash: false, color: { pending: PAL.grey, final: () => col() },
      when: (st) => st.o1 && extra(st),
    });
  }

  // ------------------------------------------------------------------
  // points + labels
  // ------------------------------------------------------------------
  const HANDLE = { r: 0.085 }, DERIVED = { r: 0.06 };
  dw.disk('pt_A', { intro: 2, ...HANDLE });
  dw.disk('pt_B', { intro: 2, ...HANDLE });
  dw.disk('pt_C', { intro: 1, ...HANDLE });
  dw.disk('pt_D', { intro: 1, ...HANDLE });
  dw.disk('pt_R2', { intro: 4, ...HANDLE });
  dw.disk('pt_N', { intro: 3, ...DERIVED });
  dw.disk('pt_O', { intro: 6, ...DERIVED });
  dw.disk('pt_P', { intro: 6, ...DERIVED });
  const letters = {
    A: ['A', 3], B: ['B', 3], C: ['C', 2], D: ['D', 2],
    N: ['N', 4], O: ['O', 7], P: ['P', 7], R2: ['R₂', 5],
  };
  for (const [pn, [text, intro]] of Object.entries(letters)) {
    dw.label(`lbl_${pn}`, text, { cls: 'point', intro });
  }

  // "show points" (applet checkbox): the small derived points
  const showPts = (st) => st.pts;
  const PTS = ['E', 'F', 'G', 'J', 'K', 'Kp', 'Ip', 'Q2', 'Qm', 'B2', 'S', 'H1'];
  for (const pn of PTS) {
    dw.disk(`xp_${pn}`, { r: 0.04, face: 0x555555, edge: 0x555555, when: showPts });
  }
  const FPTS = ['B1', 'A1', 'D1'];
  for (const pn of FPTS) {
    dw.disk(`xf_${pn}`, { r: 0.04, face: 0x555555, edge: 0x555555,
      when: (st) => st.pts && le(st) && (pn !== 'D1' || quadOK(st)) });
  }

  // "show handles" (applet checkbox): rings on the draggable points
  const HR = 0.18;
  dw.dashedCircle('hnA', { when: (st) => st.sh, dash: 0.07 });
  dw.dashedCircle('hnB', { when: (st) => st.sh, dash: 0.07 });
  dw.dashedCircle('hnC', { when: (st) => st.sh, dash: 0.07 });
  dw.dashedCircle('hnD', { when: (st) => st.sh, dash: 0.07 });
  dw.dashedCircle('hnR2', { when: (st) => st.sh, dash: 0.07 });
  dw.dashedCircle('hnT1', { when: (st) => st.sh, dash: 0.07 });

  // node-equilibrium inspector
  dw.nodeInspector(4, { when: (st) => st.node > 0, w: 1.6 * W_RES, headLen: 0.28, headW: 0.11, r: 0.09 });

  // dual pairs
  dw.link('redL', 'redM', 'fCO', 'fOQ2', 'fCOg', 'fOQ2g');
  dw.link('bluL', 'bluM', 'fOD', 'fGO', 'fODg', 'fGOg');
  dw.link('loaA', 'rdir', 'fA', 'lfA', 'reacA', 'lRA');
  dw.link('loadU', 'loadL', 'lQu', 'lQl', 'fQ', 'lfQ');
  dw.link('rhGP', 'rhPQ', 'rhPE', 'rhPF', 'reacB', 'lRB');
  // the COMPLETE force diagram must appear in the ghost preview: all four
  // chord-force pieces in both case variants (le/gt -- their `when` gates
  // pick the active one), all three force arrows AND the force-side N_max
  // dimension leaders dimT/dimB (dimI/dimO/dlead/mlead are the FORM-side
  // h-dimensions -- the form diagram is never ghosted)
  dw.ghostable('fCO', 'fCOg', 'fOD', 'fODg', 'fGO', 'fOQ2', 'fGOg', 'fOQ2g',
               'fA', 'fQ', 'fH', 'dimT', 'dimB');

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  /** dimension line a-b with x-cross end marks (the applet's grey crosses) */
  const xm = 0.09;
  function dimX(a, b) {
    const out = [[a, b]];
    for (const p of [a, b]) {
      out.push([[p[0] - xm, p[1] - xm], [p[0] + xm, p[1] + xm]]);
      out.push([[p[0] - xm, p[1] + xm], [p[0] + xm, p[1] - xm]]);
    }
    return out;
  }
  const fmt = (v) => (Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : v.toFixed(2));

  function update() {
    dw.setLabel('form_title', [3.0, 11.45]);
    dw.setLabel('force_title', [13.06, 11.45]);

    // girder
    dw.setSeg('chT', d.C, d.E);
    dw.setSeg('chB', d.D, d.F);
    dw.setSeg('crL', d.D, d.C);
    dw.setSeg('crR', d.E, d.F);
    dw.setSeg('post', d.G, d.Q2);
    dw.setStrokes('boxL', [[d.C, d.K], [d.K, d.J], [d.J, d.D]]);
    dw.setSeg('digL', d.J, d.C);
    dw.setStrokes('boxR', [[d.Kp, d.E], [d.Ip, d.Kp], [d.F, d.Ip]]);
    dw.setSeg('digR', d.E, d.Ip);
    dw.setStrokes('legL', [[d.A, d.D], [d.J, d.A]]);
    dw.setStrokes('legR', [[d.F, d.B], [d.B, d.Ip]]);
    dw.setDashLine('gdA', [[4, YA], [8.802107054072186, YA]]);
    dw.setDashLine('gdD', [[s.ax, 5.905149277192884], [s.ax, 7.57927568703183]]);

    // dimensions h, h*h
    dw.setStrokes('dimI', dimX(d.S1, d.P1));
    dw.setStrokes('dimO', dimX(d.R1, d.Q1));
    dw.setStrokes('dlead', [[d.A, d.R1], [d.Q1, d.N]]);
    dw.setLabel('ldimI', [d.P1[0] + 0.28, (d.S1[1] + d.P1[1]) / 2]);
    dw.setLabel('ldimO', [d.R1[0] - 0.55, (d.R1[1] + d.Q1[1]) / 2]);
    dw.setText('ldimO', `${fmt(s.h)} · h`);

    // load 2Q at N
    dw.setArrow('loadU', d.Z1, d.O1);
    dw.setArrow('loadL', d.O1, d.N);
    dw.setLabel('lQu', [d.xG + 0.3, (d.Z1[1] + d.O1[1]) / 2]);
    dw.setLabel('lQl', [d.xG + 0.3, (d.O1[1] + d.N[1]) / 2]);

    // N_max budget
    dw.setStrokes('dimT', dimX(d.U1, d.T1));
    dw.setLabel('lNmT', [(d.U1[0] + d.T1[0]) / 2, d.T1[1] + 0.34]);
    dw.setDashLine('railL', [d.W1, d.A2]);
    dw.setDashLine('railR', [d.F2, d.G2]);
    dw.setStrokes('dimB', dimX(d.C2, d.E2));
    dw.setLabel('lNmB', [(d.C2[0] + d.E2[0]) / 2, d.C2[1] - 0.36]);

    // lines of action + foot arrows + reaction direction
    dw.setDashLine('loaA', [d.A, d.N]);
    dw.setDashLine('loaB', [d.N, d.B]);
    dw.setDashLine('vertL', [d.C, d.S2]);
    dw.setDashLine('vertR', [d.E, d.T2]);
    dw.setArrow('reacA', d.J1, d.A);
    dw.setArrow('reacB', d.M1, d.B);
    dw.setLabel('lRA', V.add(d.J1, [-0.3, 0.02]));
    dw.setLabel('lRB', V.add(d.M1, [0.3, 0.02]));
    // grey dashed reaction direction through R2, clipped just past Ax
    const uR = V.unit(V.sub(d.Ax, d.R2));
    dw.setDashLine('rdir', [V.sub(d.R2, V.mul(uR, 0.35)), V.add(d.Ax, V.mul(uR, 0.55))]);

    // girder axis + O, P
    dw.setDashLine('axis', [[d.K[0] - 0.3, d.H1[1]], [d.Ip[0] + 0.3, d.H1[1]]]);
    dw.setStrokes('mlead', [[d.P1, d.O]]);

    // resultants (left) + force polygon (right)
    dw.setSeg('redL', d.C, d.O);
    dw.setSeg('redM', d.O, d.Q2);
    dw.setSeg('redI', d.Qm, d.Q2);
    dw.setSeg('bluL', d.G, d.O);
    dw.setSeg('bluM', d.O, d.D);
    dw.setSeg('bluI', d.G, d.Qm);
    dw.setSeg('rhGP', d.G, d.P);
    dw.setSeg('rhPQ', d.Q2, d.P);
    dw.setSeg('rhPE', d.P, d.E);
    dw.setSeg('rhPF', d.P, d.F);
    dw.setSeg('rhGB', d.G, d.B2);
    dw.setSeg('rhBQ', d.B2, d.Q2);

    if (d.le) {
      dw.setSeg('fCO', d.R2, d.B1);
      dw.setSeg('fOD', d.B1, d.A1);
      if (ok(d.D1)) {
        dw.setSeg('fGO', d.R2, d.D1);
        dw.setSeg('fOQ2', d.A1, d.D1);
      }
    } else {
      dw.setSeg('fGOg', d.R2, d.E1);
      dw.setSeg('fOQ2g', d.E1, d.F1);
      dw.setSeg('fODg', d.F1, d.I1);
      dw.setSeg('fCOg', d.I1, d.R2);
    }
    dw.setArrow('fA', d.Ax, d.R2);
    dw.setArrow('fQ', d.R2, d.Qx);
    dw.setArrow('fH', d.Qx, d.Ax);
    dw.setLabel('lfA', V.add(V.mid(d.Ax, d.R2), [-0.28, 0.08]));
    dw.setLabel('lfQ', V.add(V.mid(d.R2, d.Qx), [0.26, 0]));
    dw.setLabel('lfH', V.add(V.mid(d.Qx, d.Ax), [0, -0.36]));
    dw.setLabel('lam1', [11.4, 5.5]);
    dw.setText('lam1', `λ = Q / Qref = ${d.lam.toFixed(2)}`);
    dw.setLabel('lam2', [11.4, 5.0]);

    // pipes
    for (const [name, geo] of PIPES) {
      const [p0, p1, f] = geo();
      dw.setPoly(name, V.rectPoints(p0, p1, Math.max(1e-4, s.sIF * f)));
    }

    // points + labels
    dw.setDisk('pt_A', d.A);
    dw.setDisk('pt_B', d.B);
    dw.setDisk('pt_C', d.C);
    dw.setDisk('pt_D', d.D);
    dw.setDisk('pt_R2', d.R2);
    dw.setDisk('pt_N', d.N);
    dw.setDisk('pt_O', d.O);
    dw.setDisk('pt_P', d.P);
    const at = { A: d.A, B: d.B, C: d.C, D: d.D, N: d.N, O: d.O, P: d.P, R2: d.R2 };
    const off = { A: [-0.36, 0.16], B: [0.38, 0.16], C: [-0.28, 0.26], D: [-0.28, -0.28],
                  N: [-0.34, 0.26], O: [-0.38, -0.16], P: [0.4, -0.16], R2: [0.36, 0.1] };
    for (const pn of Object.keys(letters)) dw.setLabel(`lbl_${pn}`, V.add(at[pn], off[pn]));

    const xat = { E: d.E, F: d.F, G: d.G, J: d.J, K: d.K, Kp: d.Kp, Ip: d.Ip,
                  Q2: d.Q2, Qm: d.Qm, B2: d.B2, S: d.S, H1: d.H1 };
    for (const pn of PTS) dw.setDisk(`xp_${pn}`, xat[pn]);
    const fat = { B1: d.B1, A1: d.A1, D1: d.D1 };
    for (const pn of FPTS) dw.setDisk(`xf_${pn}`, ok(fat[pn]) ? fat[pn] : [0, -99]);

    dw.setDashedCircle('hnA', d.A, HR);
    dw.setDashedCircle('hnB', d.B, HR);
    dw.setDashedCircle('hnC', d.C, HR);
    dw.setDashedCircle('hnD', d.D, HR);
    dw.setDashedCircle('hnR2', d.R2, HR);
    dw.setDashedCircle('hnT1', d.T1, HR);
  }

  // ------------------------------------------------------------------
  // node-equilibrium inspector: 1 = A, 2 = B, 3 = O, 4 = P.
  // Sides are [tail, tip] force vectors summing to zero (derived from the
  // force polygon / the foot decomposition). The reaction of node A lies
  // exactly on the drawn green vector A (Ax -> R2).
  // ------------------------------------------------------------------
  function nodePoly() {
    const j = Math.round(s.node);
    const R2 = d.R2, Ax = d.Ax;
    if (j === 1) {
      const X = V.add(R2, d.FAJ);
      return [[Ax, R2], [R2, X], [X, Ax]];
    }
    if (j === 2) {
      const MB = [2 * R2[0] - Ax[0], Ax[1]];
      const X = V.add(R2, d.FBI);
      return [[MB, R2], [R2, X], [X, MB]];
    }
    const mir = (p) => (j === 4 ? [2 * R2[0] - p[0], p[1]] : p);
    if (!ok(d.D1) && d.le) return [];               // h = 1: O sits on the cut
    const quad = d.le
      ? [[d.B1, R2], [d.A1, d.B1], [d.D1, d.A1], [R2, d.D1]]
      : [[R2, d.E1], [d.E1, d.F1], [d.F1, d.I1], [d.I1, R2]];
    return quad.map(([a, b]) => [mir(a), mir(b)]);
  }
  function updateNode() {
    const j = Math.round(s.node);
    dw.selectDisk(j === 1 ? 'pt_A' : j === 2 ? 'pt_B' : j === 3 ? 'pt_O' : j === 4 ? 'pt_P' : null);
    const names = ['A', 'B', 'O', 'P'];
    const posn = [d.A, d.B, d.O, d.P];
    const sides = nodePoly();
    const title = j >= 3 && !sides.length ? `node ${names[j - 1]} (set h ≠ 1)` : `node ${names[j - 1] || ''}`;
    dw.setNodeInspector(posn[(j || 1) - 1], 1.15, title, sides);
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
  panel.slider(par, s, 'h', 'h — frame height multiplier', 1, 100, 0.01, refresh);
  const row = panel.buttonRow(par);
  panel.button(row, 'h=1', () => { s.h = 1; panel.syncAll(); refresh(); });
  panel.button(row, 'h=2', () => { s.h = 2; panel.syncAll(); refresh(); });
  panel.button(row, 'h=100', () => { s.h = 100; panel.syncAll(); refresh(); });
  panel.toggle(par, s, 'o', 'h = ∞ (vertical reactions)', refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram', 1, 2.5, 0.01, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 0.8, 2, 0.1, refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.15, 0.005, refresh);
  panel.toggle(par, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
  panel.toggle(par, s, 'pts', 'show points', refresh);
  panel.toggle(par, s, 'sh', 'show handles', refresh);
  panel.button(par, 'reset geometry', () => {
    Object.assign(s, { ...DEFAULTS, _k: s._k, node: s.node });
    panel.syncAll();
    refresh();
  });

  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off, 1 = A, 2 = B, 3 = O, 4 = P)', 0, 4, 1, refresh);

  const hits = [
    ['A', () => d.A, 2], ['B', () => d.B, 2], ['C', () => d.C, 1],
    ['D', () => d.D, 1], ['R2', () => d.R2, 4], ['T1', () => d.T1, 4],
  ];
  dw.enableDrag(
    (wx, wy, tol) => {
      let best = null;
      for (const [name, get, k0] of hits) {
        if (player.k < k0) continue;
        const p = get();
        const dd = Math.hypot(p[0] - wx, p[1] - wy);
        if (dd < tol) { best = name; tol = dd; }
      }
      return best;
    },
    (name, wx, wy) => {
      if (name === 'A') s.ax = Math.max(4, Math.min(Math.min(8.802, s.bx - 2), wx));
      else if (name === 'B') s.bx = Math.max(s.ax + 2, Math.min(14, wx));
      else if (name === 'C') s.yC = Math.max(s.yD + 0.5, Math.min(10.5, wy));
      else if (name === 'D') s.yD = Math.max(5.905, Math.min(Math.min(7.579, s.yC - 0.5), wy));
      else if (name === 'R2') { s.r2x = wx; s.r2y = wy; }
      else if (name === 'T1') s.yT1 = wy;
      refresh();
    },
  );

  // click a node to inspect it
  const nodes = [() => d.A, () => d.B, () => d.O, () => d.P];
  dw.nodeSelect(
    nodes.map((get) => ({ at: get })),
    (i) => {
      s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
      panel.syncAll();
      refresh();
    },
  );

  refresh();
  return player;
}
