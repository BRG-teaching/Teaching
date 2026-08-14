/**
 * Drawing view/44 "Internal forces in a three-hinged frame -- superposition"
 * (https://block.arch.ethz.ch/eq/drawing/view/44) as a step-by-step
 * construction.
 *
 * The applet (no step slider) shows the same three-hinged portal frame THREE
 * times side by side -- under the line load q, under a horizontal point load
 * F at the corner, and under q + F -- with the N, V and M diagrams of each
 * case drawn in rows below (all visible at once), and three force diagrams:
 * the q-case rectangle (pole I_1, exactly as in Drawing 43), the F-case
 * triangle (chord parallels through the ends of the horizontal load line
 * meet at G_3, dropped to H_3), and the superposed polygon whose component
 * vectors are literally the vector SUMS of the two cases (D_4 = B_4 + BH_q
 * + BH_F etc., closing back on C_4). One hinge point I drives all three
 * frames. Checkbox layers: trial funicular construction (o_1), chord
 * construction (j_2), UDL thrust line (w_2), M-parabola pole constructions
 * (o_3, poles E_5 and F_5).
 *
 * Whole chain regression-checked against the LIVE applet (default and
 * dragged hinge I = 1.8 + F = 26) to 5.3e-14.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 44 — Internal forces in a three-hinged frame – superposition',
  subtitle: 'q, F, and q + F: internal-force diagrams add because their force diagrams add',
  about: 'The same three-hinged portal frame three times: under the line load q, under a horizontal point load F at the corner, and under both. Each case gets its force diagram — the q-rectangle from pole I₁, the F-triangle from the hinge-chord parallels through G₃ — and the superposed diagram is built literally by adding the component vectors tip to tail. The N, V and M rows below show that the internal-force diagrams superpose the same way; one draggable hinge I drives all three frames at once.',
  frame: [[-8.5, -33.5], [66.5, 13.5]],
};

const DIV = 20;
const RESOLVE = 12;
const ORANGE = PAL.green;   // the applet's F-load orange follows the load scheme now

const DEFAULTS = {
  fr: 5.4,                          // frame size l = h [2, 6]
  xI: 2.8027124340368417,           // hinge position (drag -- drives all three)
  q: 18,                            // line load [10, 30]
  F: 20,                            // point load [10, 30]
  sFD: 6,                           // scaleForceDiagram [5, 20]
  sLS: 0.9,                         // scaleLoadSymbol [0.2, 1]
  sMD: 50, sND: 30, sVD: 30,
  dN: 10, dV: 20, dM: 30.5,
  P: 24, S: 40,                     // offsets of the point / superposition frames
  llx: 14.61165043216673, lly: 5.265933465264068,   // LL0 (drag)
  a3x: 31.61326425028501, a3y: 5.482055674816417,   // A_3 (drag)
  c4x: 59.34894780950339, c4y: 5.193892728746618,   // C_4 (drag)
  yL1: 9.231503375233714,           // load band top
  yArr: 6.15,                       // R1/R2 band arrow tip level
  yJ5: 10.482193004913468,          // rails top
  switchN: false,
  o1t: false,                       // keep chord/trial construction
  trial: false,                     // full trial funicular apparatus (o_1)
  w2: null,                         // UDL thrust line (null = follow steps)
  o3: false,                        // M-parabola pole constructions
  bow: false,                       // show Bow notation
  o1: true,                         // pipes
  sIF: 0.05,
  node: 0,
  _k: 99,
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'One frame, three load cases', d: 'left to right: the same three-hinged frame (feet A, C; hinge I — drag it, all three follow!) will carry the line load q, a horizontal point load F, and q + F' },
  { t: 'The loads and their load lines', d: 'left: q on the girder (R₁ + R₂) — middle: F pushes at the corner (orange) — right: both; each case gets its load line: R₁R₂ vertical, F horizontal, and F then R₁R₂ tip-to-tail' },
  { t: 'The pole I₁ of the q-case', d: 'parallels to the hinge chords A–I and I–C through the division points (found as in Drawing 43) meet at the pole I₁: offset = thrust H, height = the split A_V / B_V' },
  { t: 'Reactions of the q-case', d: 'right of the frame: the force rectangle closes through I₁: A_H, A_V, B_V, B_H — the same four components push into the feet' },
  { t: 'The pole G₃ of the F-case', d: 'middle: parallels to the hinge chords through the ends of the horizontal load line meet at G₃; dropping to H₃ splits F into A_H and B_H, and the vertical G₃–H₃ is the couple A_V = −B_V' },
  { t: 'Reactions of the F-case', d: 'the F-case components push into the feet A and C of the middle frame — note the uplift: A_V points down (F would overturn the frame)' },
  { t: 'Superposition = vector addition', d: 'right: the q + F force polygon is drawn by ADDING the two cases tip to tail: F, R₁, R₂, then B_H = B_Hq + B_HF, B_V = B_Vq + B_VF, A_V, A_H — it closes exactly' },
  { t: 'The N diagrams add', d: 'row two: normal forces of q, of F, and of q + F — each strip of the third diagram is the sum of the first two' },
  { t: 'The V diagrams add', d: 'row three: the shear diagrams — the q-line shifts by the constant F-shear' },
  { t: 'The M diagrams add', d: 'row four: corner moments M₄ = M₅ swing onto the girder (arcs); the q-parabola plus the F-triangle give the tilted parabola of q + F (M_max off the closing line)' },
  { t: 'The thrust line of q', d: 'rays from the load-line divisions to I₁ hang the ideal thrust line through the feet of the M copy (dashed) — moment = thrust × distance' },
  { t: 'Done', d: 'drag I, A₃, C₄, LL0, the sliders q and F; toggles: trial funicular, chord construction, thrust line, parabola construction — click a node (feet and hinges of all three frames)',
    take: 'superposition made visible: the q-frame plus the F-frame IS the q+F frame — vectors and diagrams simply add' },
];

function inter(p1, d1, p2, d2) {
  const r = V.intersect(p1, d1, p2, d2);
  return r || [NaN, NaN];
}
const rot90 = (v, s) => (s > 0 ? [-v[1], v[0]] : [v[1], -v[0]]);

// mirrors applet_0/geogebra.xml (regression-checked to 5.3e-14)
function compute(s) {
  const l = s.fr, h = s.fr;
  const xI = Math.max(0.05, Math.min(l - 0.05, s.xI));
  const sg = s.switchN ? 1 : -1;
  const l1 = xI, l2 = l - xI;

  const A = [0, 0], B = [0, h], C = [l, 0], D = [l, h], I = [xI, h];
  const LL0 = [s.llx, s.lly];
  const k = s.q * l / s.sFD;
  const K = [LL0[0], LL0[1] - k];
  const E1 = [LL0[0], LL0[1] - s.q * l1 / s.sFD];
  const I1 = [LL0[0] - s.q * l1 * l2 / (2 * h) / s.sFD, LL0[1] - s.q * l / 2 / s.sFD];
  const K1 = [I1[0], LL0[1]], J1 = [I1[0], K[1]];
  const vAH = V.sub(LL0, K1), vAV = V.sub(K1, I1);
  const vBV = V.sub(I1, J1), vBH = V.sub(J1, K);

  // point case
  const P = s.P;
  const AP = [P, 0], BP = [P, h], CP = [P + l, 0], DP = [P + l, h], IP = [P + xI, h];
  const A3 = [s.a3x, s.a3y];
  const B3 = [A3[0] + s.F / s.sFD, A3[1]];
  const G3 = inter(A3, V.sub(IP, AP), B3, V.sub(CP, IP));
  const H3 = [G3[0], A3[1]];
  const z4 = V.sub(A3, H3), u4 = V.sub(H3, B3);        // A_H^F, B_H^F
  const w4 = V.sub(H3, G3), v4 = V.sub(G3, H3);        // A_V^F (down), B_V^F (up)
  const Z6 = [G3[0] + 0.5, G3[1]], A7 = [H3[0] + 0.5, H3[1]];

  // superposition
  const S = s.S;
  const AS = [S, 0], BS = [S, h], CS = [S + l, 0], DS = [S + l, h], IS = [S + xI, h];
  const C4 = [s.c4x, s.c4y];
  const LLT0 = [C4[0] + s.F / s.sFD, C4[1]];
  const L_2 = [LLT0[0], LLT0[1] - s.q * l1 / s.sFD];
  const B4 = [LLT0[0], LLT0[1] - k];
  const D4 = V.add(B4, V.add(u4, vBH));
  const E4 = V.add(D4, V.add(vBV, v4));
  const F4 = V.add(E4, V.add(vAV, w4));
  const G4 = V.add(F4, V.add(vAH, z4));

  // rows
  const cp = (off, dy) => ({ a: [off, -dy], b: [off, h - dy], c: [off + l, -dy], d: [off + l, h - dy], i: [off + xI, h - dy] });
  const N0 = cp(0, s.dN), V0 = cp(0, s.dV), M0 = cp(0, s.dM);
  const NP = cp(P, s.dN), VP = cp(P, s.dV), MP = cp(P, s.dM);
  const NS = cp(S, s.dN), VS = cp(S, s.dV), MS = cp(S, s.dM);
  const r = s.sFD / s.sND, rv = s.sFD / s.sVD, rm = h * s.sFD / s.sMD;

  // UDL N/V/M (identical construction to Drawing 43)
  const C2 = V.add(N0.b, rot90(V.mul(vAH, r), sg)), E2 = V.add(N0.d, rot90(V.mul(vBH, r), -sg));
  const K2 = V.add(N0.b, rot90(V.mul(vAV, r), sg)), N2 = V.add(N0.d, rot90(V.mul(vBV, r), -sg));
  const O2 = [K2[0], N0.a[1]], P2 = [N2[0], N0.a[1]];
  const Q2 = V.add(V0.b, V.mul(vAV, rv)), S2 = V.add(V0.d, V.mul(vBV, -rv));
  const T2 = V.add(V0.b, V.mul(vAH, rv)), U2 = V.add(V0.d, V.mul(vBH, -rv));
  const V2 = [T2[0], V0.a[1]], W2 = [U2[0], V0.a[1]];
  const G2 = V.add(M0.b, V.mul(vAH, -rm)), I2 = V.add(M0.d, V.mul(vBH, -rm));
  const F2 = V.add(M0.b, rot90(V.sub(G2, M0.b), -1)), H2 = V.add(M0.d, rot90(V.sub(I2, M0.d), 1));
  const Mm1 = V.mid(F2, H2), Mm2 = [Mm1[0], Mm1[1] - s.q * l * l / 8 / s.sMD];
  const D5 = [l / 2, Mm2[1] - V.dist(Mm2, Mm1)];
  const E5 = inter(LL0, V.sub(D5, F2), K, V.sub(H2, D5));
  const LL = [], lox = [];
  for (let i = 0; i <= DIV; i++) LL.push([LL0[0], LL0[1] - k / DIV * i]);
  for (let i = 0; i < DIV; i++) lox.push(l / DIV * (i + 0.5));
  const funic = (start, pole, lls, loxs) => {
    const out = [start];
    let p = start;
    for (let i = 0; i < DIV; i++) {
      p = inter(p, V.sub(pole, lls[i]), [loxs[i], 0], [0, 1]);
      out.push(p);
    }
    return out;
  };
  const MLine = funic(F2, E5, LL, lox).concat([H2]);
  const parab = funic(M0.a, I1, LL, lox).concat([M0.c]);

  // point rows
  const I3 = V.add(NP.d, rot90(V.mul(u4, r), -sg)), J3 = [NP.b[0], I3[1]];
  const K3 = V.add(NP.b, rot90(V.mul(w4, r), sg)), L3 = V.add(NP.d, rot90(V.mul(v4, r), -sg));
  const M3 = [K3[0], NP.a[1]], N3 = [L3[0], NP.a[1]];
  const O3 = V.add(VP.a, V.mul(z4, rv)), Q3 = [O3[0], VP.b[1]];
  const R3 = V.add(VP.b, V.mul(w4, rv)), S3 = V.add(VP.d, V.mul(v4, -rv));
  const T3 = V.add(VP.c, V.mul(u4, -rv)), U3 = [T3[0], VP.d[1]];
  const Z3 = V.add(MP.b, V.mul(z4, -rm)), W3 = V.add(MP.d, V.mul(u4, -rm));
  const V3 = V.add(MP.b, rot90(V.sub(Z3, MP.b), -1)), A4 = V.add(MP.d, rot90(V.sub(W3, MP.d), 1));

  // superposition rows (component sums)
  const sAH = V.add(vAH, z4), sBH = V.add(u4, vBH);
  const sAV = V.add(vAV, w4), sBV = V.add(vBV, v4);
  const O4 = V.add(NS.d, rot90(V.mul(sBH, r), -sg)), I4 = [NS.b[0], O4[1]];
  const K4 = V.add(NS.b, rot90(V.mul(sAV, r), sg)), M4 = V.add(NS.d, rot90(V.mul(sBV, r), -sg));
  const N4 = [K4[0], NS.a[1]], P4 = [M4[0], NS.a[1]];
  const L4 = V.add(VS.a, V.mul(sAH, rv)), R4 = [L4[0], VS.b[1]];
  const V4 = V.add(VS.b, V.mul(sAV, rv)), W4 = V.add(VS.d, V.mul(sBV, -rv));
  const S4 = V.add(VS.c, V.mul(sBH, -rv)), U4 = [S4[0], VS.d[1]];
  const T4 = V.add(MS.b, V.mul(sAH, -rm)), Z4 = V.add(MS.b, rot90(V.sub(T4, MS.b), -1));
  const A5 = V.add(MS.d, V.mul(sBH, -rm)), B5 = V.add(MS.d, rot90(V.sub(A5, MS.d), 1));
  const J2s = V.mid(Z4, B5), M2s = [J2s[0], J2s[1] - s.q * l * l / 8 / s.sMD];
  const C5 = [J2s[0], 2 * M2s[1] - J2s[1]];
  const F5 = inter(LLT0, V.sub(C5, Z4), B4, V.sub(B5, C5));
  const LLT = [], loxS = [];
  for (let i = 0; i <= DIV; i++) LLT.push([LLT0[0], LLT0[1] - k / DIV * i]);
  for (let i = 0; i < DIV; i++) loxS.push(S + l / DIV * (i + 0.5));
  const SMLine = funic(Z4, F5, LLT, loxS).concat([B5]);

  // loads on the forms
  const yBand = s.yL1 - 0.75 * s.sLS;
  const Rc = [xI / 2, s.yArr], Sc = [(xI + l) / 2, s.yArr];
  const Z2 = [P - 2 * s.sLS, h], Jp = [S - 2 * s.sLS, h];

  return { l, h, xI, A, B, C, D, I, LL0, k, K, E1, I1, K1, J1, vAH, vAV, vBV, vBH,
           AP, BP, CP, DP, IP, A3, B3, G3, H3, z4, u4, w4, v4, Z6, A7,
           AS, BS, CS, DS, IS, C4, LLT0, L_2, B4, D4, E4, F4, G4,
           N0, V0, M0, NP, VP, MP, NS, VS, MS,
           C2, E2, K2, N2, O2, P2, Q2, S2, T2, U2, V2, W2,
           G2, I2, F2, H2, Mm1, Mm2, D5, E5, LL, MLine, parab,
           I3, J3, K3, L3, M3, N3, O3, Q3, R3, S3, T3, U3, Z3, W3, V3, A4,
           sAH, sBH, sAV, sBV, O4, I4, K4, M4, N4, P4, L4, R4, V4, W4, S4, U4,
           T4, Z4, A5, B5, J2s, M2s, C5, F5, LLT, SMLine,
           yBand, Rc, Sc, Z2, Jp };
}

const pairs = (poly) => poly.slice(0, -1).map((p, i) => [p, poly[i + 1]]);

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);

  const W_BAR = 0.075, W_RED = 0.055, W_THIN = 0.03;
  const ARROW = { w: 0.1, headLen: 0.42, headW: 0.17 };
  const keep = (st) => st.o1t || st._k < RESOLVE;
  const isThr = (st) => (st.w2 === null ? st._k === 11 || (st._k >= 11 && st.w2 !== false && st.w2 !== null) : st.w2) || (st.w2 === null && st._k === 11);
  const thrW = (st) => (st.w2 === null ? st._k === 11 : st.w2);
  const o3w = (st) => st.o3;
  const trialW = (st) => st.trial;

  dw.label('t_form', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('t_form2', '1 unit :: 1 m', { flash: false });
  dw.label('t_force', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('t_force2', '', { flash: false });
  dw.label('t_N', 'N Diagram', { cls: 'title', flash: false, when: (st) => st._k >= 8 });
  dw.label('t_N2', '', { flash: false, when: (st) => st._k >= 8 });
  dw.label('t_V', 'V Diagram', { cls: 'title', flash: false, when: (st) => st._k >= 9 });
  dw.label('t_V2', '', { flash: false, when: (st) => st._k >= 9 });
  dw.label('t_M', 'M Diagram', { cls: 'title', flash: false, when: (st) => st._k >= 10 });
  dw.label('t_M2', '', { flash: false, when: (st) => st._k >= 10 });

  // ------------------------------------------------------------------
  // step 1 -- the three frames + hinges + rails
  // ------------------------------------------------------------------
  const CASES = ['U', 'P', 'S'];
  for (const cse of CASES) {
    dw.strokes(`fr${cse}`, 3, { intro: 1, w: W_BAR });
    dw.disk(`pa${cse}`, { intro: 1, r: 0.14 });
    dw.disk(`pc${cse}`, { intro: 1, r: 0.14 });
    dw.disk(`pi${cse}`, { intro: 1, r: 0.14 });
  }
  for (let i = 0; i < 8; i++) dw.dashLine(`rail${i}`, { intro: 1, dash: 0.09, color: 0xaaaaaa, flash: false });
  dw.label('lI', 'I', { cls: 'point', intro: 1 });
  dw.label('lA', 'A', { cls: 'point', intro: 1 });
  dw.label('lC', 'C', { cls: 'point', intro: 1 });

  // ------------------------------------------------------------------
  // step 2 -- loads + load lines
  // ------------------------------------------------------------------
  for (const cse of ['U', 'S']) {
    dw.poly(`band${cse}L`, 4, { intro: 2, opacity: 0.1, color: PAL.green, flash: false });
    dw.poly(`band${cse}R`, 4, { intro: 2, opacity: 0.1, color: PAL.green, flash: false });
    dw.strokes(`bandE${cse}`, 7, { intro: 2, w: 0.035, color: PAL.green });
    dw.label(`lq${cse}`, 'q', { intro: 2, color: PAL.green });
    dw.arrow(`aR1${cse}`, { intro: 2, ...ARROW });
    dw.arrow(`aR2${cse}`, { intro: 2, ...ARROW });
    dw.label(`lR1${cse}`, 'R₁', { intro: 2, color: PAL.green });
    dw.label(`lR2${cse}`, 'R₂', { intro: 2, color: PAL.green });
  }
  dw.arrow('aFP', { intro: 2, ...ARROW, color: ORANGE });
  dw.arrow('aFS', { intro: 2, ...ARROW, color: ORANGE });
  dw.label('lFP', 'F', { intro: 2, color: ORANGE });
  dw.label('lFS', 'F', { intro: 2, color: ORANGE });
  // force: load lines
  dw.arrow('fR1', { intro: 2, ...ARROW });
  dw.arrow('fR2', { intro: 2, ...ARROW });
  dw.label('lfR1', 'R₁', { intro: 2, color: PAL.green });
  dw.label('lfR2', 'R₂', { intro: 2, color: PAL.green });
  dw.arrow('fFP', { intro: 2, ...ARROW, color: ORANGE });
  dw.label('lfFP', 'F', { intro: 2, color: ORANGE });
  dw.seg('fPLine', { intro: 2, w: W_THIN });
  dw.arrow('fFS', { intro: 2, ...ARROW, color: ORANGE });
  dw.label('lfFS', 'F', { intro: 2, color: ORANGE });
  dw.arrow('fR1S', { intro: 2, ...ARROW });
  dw.arrow('fR2S', { intro: 2, ...ARROW });
  dw.label('lfR1S', 'R₁', { intro: 2, color: PAL.green });
  dw.label('lfR2S', 'R₂', { intro: 2, color: PAL.green });
  dw.disk('pt_LL0', { intro: 2, r: 0.13 });
  dw.disk('pt_A3', { intro: 2, r: 0.13 });
  dw.disk('pt_C4', { intro: 2, r: 0.13 });

  // ------------------------------------------------------------------
  // step 3 -- UDL pole I1 (chords + divisions); step 5 -- point pole G3
  // ------------------------------------------------------------------
  dw.dashLine('chU1', { intro: 3, dash: 0.2, when: keep });   // A-I
  dw.dashLine('chU2', { intro: 3, dash: 0.2, when: keep });   // I-C
  dw.dashLine('parU1', { intro: 3, dash: 0.2, color: PAL.black, when: keep });  // Z1-ish -> I1
  dw.dashLine('parU2', { intro: 3, dash: 0.2, color: PAL.black, when: keep });
  dw.disk('pt_I1', { intro: 3, r: 0.11 });
  dw.label('lI1', 'I₁', { cls: 'point', intro: 3 });
  dw.dashLine('chP1', { intro: 5, dash: 0.2, when: keep });   // A_P - I_P
  dw.dashLine('chP2', { intro: 5, dash: 0.2, when: keep });   // I_P - C_P
  dw.dashLine('parP1', { intro: 5, dash: 0.2, color: PAL.black, when: keep });  // A3-G3
  dw.dashLine('parP2', { intro: 5, dash: 0.2, color: PAL.black, when: keep });  // B3-G3
  dw.disk('pt_G3', { intro: 5, r: 0.11 });
  dw.label('lG3', 'G₃', { cls: 'point', intro: 5 });
  dw.disk('pt_H3', { intro: 5, r: 0.09 });
  dw.label('lH3', 'H₃', { cls: 'point', intro: 5 });

  // trial funicular apparatus (checkbox only; UDL case, as in Drawing 43)
  // -- kept simple: the two half-funiculars are shown via the toggle
  // ------------------------------------------------------------------
  // steps 4/6/7 -- reactions + superposed polygon
  // ------------------------------------------------------------------
  const G4A = ['fAHU', 'fAVU', 'fBVU', 'fBHU'];
  for (const n of G4A) dw.arrow(n, { intro: 4, ...ARROW });
  dw.label('lfAHU', 'Aₕ', { intro: 4, color: PAL.green });
  dw.label('lfAVU', 'Aᵥ', { intro: 4, color: PAL.green });
  dw.label('lfBVU', 'Bᵥ', { intro: 4, color: PAL.green });
  dw.label('lfBHU', 'Bₕ', { intro: 4, color: PAL.green });
  for (const n of ['rAHU', 'rAVU', 'rBVU', 'rBHU']) dw.arrow(n, { intro: 4, ...ARROW });
  dw.label('lrAHU', 'Aₕ', { intro: 4, color: PAL.green });
  dw.label('lrAVU', 'Aᵥ', { intro: 4, color: PAL.green });
  dw.label('lrBVU', 'Bᵥ', { intro: 4, color: PAL.green });
  dw.label('lrBHU', 'Bₕ', { intro: 4, color: PAL.green });

  for (const n of ['fAHP', 'fBHP', 'fAVP', 'fBVP']) dw.arrow(n, { intro: 5, ...ARROW });
  dw.label('lfAHP', 'Aₕ', { intro: 5, color: PAL.green });
  dw.label('lfBHP', 'Bₕ', { intro: 5, color: PAL.green });
  dw.label('lfAVP', 'Aᵥ', { intro: 5, color: PAL.green });
  dw.label('lfBVP', 'Bᵥ', { intro: 5, color: PAL.green });
  for (const n of ['rAHP', 'rAVP', 'rBVP', 'rBHP']) dw.arrow(n, { intro: 6, ...ARROW });
  dw.label('lrAHP', 'Aₕ', { intro: 6, color: PAL.green });
  dw.label('lrAVP', 'Aᵥ', { intro: 6, color: PAL.green });
  dw.label('lrBVP', 'Bᵥ', { intro: 6, color: PAL.green });
  dw.label('lrBHP', 'Bₕ', { intro: 6, color: PAL.green });

  for (const n of ['fBHS', 'fBVS', 'fAVS', 'fAHS']) dw.arrow(n, { intro: 7, ...ARROW });
  dw.label('lfBHS', 'Bₕ', { intro: 7, color: PAL.green });
  dw.label('lfBVS', 'Bᵥ', { intro: 7, color: PAL.green });
  dw.label('lfAVS', 'Aᵥ', { intro: 7, color: PAL.green });
  dw.label('lfAHS', 'Aₕ', { intro: 7, color: PAL.green });
  for (const n of ['rAHS', 'rAVS', 'rBVS', 'rBHS']) dw.arrow(n, { intro: 7, ...ARROW });
  dw.label('lrAHS', 'Aₕ', { intro: 7, color: PAL.green });
  dw.label('lrAVS', 'Aᵥ', { intro: 7, color: PAL.green });
  dw.label('lrBVS', 'Bᵥ', { intro: 7, color: PAL.green });
  dw.label('lrBHS', 'Bₕ', { intro: 7, color: PAL.green });

  // ------------------------------------------------------------------
  // steps 8-10 -- the N / V / M rows (x3)
  // ------------------------------------------------------------------
  for (const [cse, k0] of [['NU', 8], ['NP', 8], ['NS', 8], ['VU', 9], ['VP', 9], ['VS', 9], ['MU', 10], ['MP', 10], ['MS', 10]]) {
    dw.strokes(`cp${cse}`, 3, { intro: k0, w: W_BAR });
    dw.disk(`cp${cse}a`, { intro: k0, r: 0.11 });
    dw.disk(`cp${cse}c`, { intro: k0, r: 0.11 });
    dw.disk(`cp${cse}i`, { intro: k0, r: 0.11 });
  }
  dw.strokes('dNU', 9, { intro: 8, w: W_RED, color: PAL.red });
  dw.strokes('dNP', 9, { intro: 8, w: W_RED, color: PAL.red });
  dw.strokes('dNS', 9, { intro: 8, w: W_RED, color: PAL.red });
  dw.strokes('dVU', 9, { intro: 9, w: W_RED, color: PAL.red });
  dw.strokes('dVP', 9, { intro: 9, w: W_RED, color: PAL.red });
  dw.strokes('dVS', 9, { intro: 9, w: W_RED, color: PAL.red });
  dw.strokes('dMU', 6, { intro: 10, w: W_RED, color: PAL.red });
  dw.strokes('dMP', 7, { intro: 10, w: W_RED, color: PAL.red });
  dw.strokes('dMS', 6, { intro: 10, w: W_RED, color: PAL.red });
  dw.strokes('mlU', DIV + 1, { intro: 10, w: W_RED, color: PAL.red });
  dw.strokes('mlS', DIV + 1, { intro: 10, w: W_RED, color: PAL.red });
  dw.dashLine('closeU', { intro: 10, dash: 0.16 });
  dw.dashLine('closeS', { intro: 10, dash: 0.16 });
  dw.seg('mmaxU', { intro: 10, w: 0.05, color: PAL.red });
  dw.seg('mmaxS', { intro: 10, w: 0.05, color: PAL.red });
  dw.label('lMmU', 'Mₘₐₓ', { intro: 10, color: PAL.red });
  dw.label('lMmS', 'Mₘₐₓ', { intro: 10, color: PAL.red });
  dw.label('lM4U', 'M₄', { intro: 10, color: PAL.red });
  dw.label('lM5U', 'M₅', { intro: 10, color: PAL.red });
  for (const n of ['arcUL', 'arcUR', 'arcPL', 'arcPR', 'arcSL', 'arcSR']) {
    dw.strokes(n, 12, { intro: 10, w: 0.022, color: PAL.grey, flash: false });
  }

  // step 11 -- UDL thrust line (retires at Done unless the toggle keeps it)
  dw.strokes('thrFan', DIV + 1, { intro: 11, w: 0.018, color: PAL.black, when: thrW, flash: false });
  dw.dashLine('thrLine', { intro: 11, dash: 0.18, color: PAL.black, when: thrW });

  // o_3: M-parabola pole constructions (toggle only)
  dw.disk('pt_E5', { r: 0.1, when: o3w });
  dw.disk('pt_F5', { r: 0.1, when: o3w });
  dw.label('lE5', 'E₅', { cls: 'point', when: o3w });
  dw.label('lF5', 'F₅', { cls: 'point', when: o3w });
  dw.strokes('parFanU', DIV + 1, { w: 0.018, color: PAL.grey, when: o3w, flash: false });
  dw.strokes('parFanS', DIV + 1, { w: 0.018, color: PAL.grey, when: o3w, flash: false });
  dw.dashLine('parChU1', { dash: 0.16, when: o3w });
  dw.dashLine('parChU2', { dash: 0.16, when: o3w });
  dw.dashLine('parChS1', { dash: 0.16, when: o3w });
  dw.dashLine('parChS2', { dash: 0.16, when: o3w });
  dw.dashedCircle('parCircU', { dash: 0.16, when: o3w });
  dw.dashedCircle('parCircS', { dash: 0.16, when: o3w });

  // trial funicular (o_1 toggle): straight port of the two division parallels
  // through trial poles is already covered in Drawing 43; here the toggle
  // shows the hinge-chord layer permanently

  // Bow notation (the applet's showBow): region letters around each of the
  // three frames + the lowercase force-line letters a / g
  const boww = (st) => st.bow;
  const BOW = { qA: 'A', qB: 'B', qC: 'C', qD: 'D', qE: 'E', qF: 'F',
                pA: 'A', pB: 'B', pC: 'C', pD: 'D', pE: 'E',
                sA: 'A', sB: 'B', sC: 'C', sD: 'D', sE: 'E', sF: 'F', sG: 'G',
                fa: 'a', fg: 'g' };
  for (const [n, t] of Object.entries(BOW)) dw.label(`bow_${n}`, t, { when: boww, flash: false });

  // pipes
  const pipeW = (st) => st.o1 && st._k >= 7;
  for (const cse of CASES) {
    for (const m of ['L', 'G', 'R']) {
      dw.poly(`pipe${cse}${m}`, 4, { opacity: 1.0, z: -0.18, flash: false, color: { pending: PAL.grey, final: () => PAL.blue }, when: pipeW });
    }
  }

  dw.nodeInspector(3, { when: (st) => st.node > 0, w: 1.5 * W_BAR, headLen: 0.5, headW: 0.2, r: 0.16 });

  // dual pairs
  dw.link('bandUL', 'aR1U', 'lR1U', 'fR1', 'lfR1');
  dw.link('bandUR', 'aR2U', 'lR2U', 'fR2', 'lfR2');
  dw.link('aFP', 'lFP', 'fFP', 'lfFP');
  dw.link('aFS', 'lFS', 'fFS', 'lfFS');
  dw.link('bandSL', 'aR1S', 'lR1S', 'fR1S', 'lfR1S');
  dw.link('bandSR', 'aR2S', 'lR2S', 'fR2S', 'lfR2S');
  dw.link('chU1', 'parU1');
  dw.link('chU2', 'parU2');
  dw.link('chP1', 'parP1');
  dw.link('chP2', 'parP2');
  dw.link('rAHU', 'fAHU', 'lrAHU', 'lfAHU');
  dw.link('rAVU', 'fAVU', 'lrAVU', 'lfAVU');
  dw.link('rBVU', 'fBVU', 'lrBVU', 'lfBVU');
  dw.link('rBHU', 'fBHU', 'lrBHU', 'lfBHU');
  dw.link('rAHP', 'fAHP', 'lrAHP', 'lfAHP');
  dw.link('rAVP', 'fAVP', 'lrAVP', 'lfAVP');
  dw.link('rBVP', 'fBVP', 'lrBVP', 'lfBVP');
  dw.link('rBHP', 'fBHP', 'lrBHP', 'lfBHP');
  dw.link('rAHS', 'fAHS', 'lrAHS', 'lfAHS');
  dw.link('rAVS', 'fAVS', 'lrAVS', 'lfAVS');
  dw.link('rBVS', 'fBVS', 'lrBVS', 'lfBVS');
  dw.link('rBHS', 'fBHS', 'lrBHS', 'lfBHS');
  dw.link('thrLine', 'thrFan');
  dw.ghostable('fR1', 'fR2', 'fFP', 'fFS', 'fAHU', 'fAVU', 'fBVU', 'fBHU',
               'fPLine', 'fR1S', 'fR2S',
               'fAHP', 'fAVP', 'fBVP', 'fBHP',
               'fAHS', 'fAVS', 'fBVS', 'fBHS');

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------
  function arcPts(c, from, to, n) {
    const a0 = Math.atan2(from[1] - c[1], from[0] - c[0]);
    let a1 = Math.atan2(to[1] - c[1], to[0] - c[0]);
    const r = V.dist(c, from);
    while (a1 < a0) a1 += Math.PI * 2;
    const out = [];
    for (let i = 0; i < 2 * n; i += 2) {
      const t0 = a0 + (a1 - a0) * i / (2 * n), t1 = a0 + (a1 - a0) * (i + 1) / (2 * n);
      out.push([[c[0] + r * Math.cos(t0), c[1] + r * Math.sin(t0)],
                [c[0] + r * Math.cos(t1), c[1] + r * Math.sin(t1)]]);
    }
    return out;
  }

  function update() {
    dw.setLabel('t_form', [-7, 10.8]);
    dw.setLabel('t_form2', [-7, 9.95]);
    dw.setLabel('t_force', [10.5, 10.8]);
    dw.setLabel('t_force2', [10.5, 9.95]);
    dw.setText('t_force2', `1 unit :: ${s.sFD} kN`);
    dw.setLabel('t_N', [-7, -6.5]);
    dw.setLabel('t_N2', [-7, -7.35]);
    dw.setText('t_N2', `1 unit :: ${s.sND} kN`);
    dw.setLabel('t_V', [-7, -16.5]);
    dw.setLabel('t_V2', [-7, -17.35]);
    dw.setText('t_V2', `1 unit :: ${s.sVD} kN`);
    dw.setLabel('t_M', [-7, -27]);
    dw.setLabel('t_M2', [-7, -27.85]);
    dw.setText('t_M2', `1 unit :: ${s.sMD} kNm`);

    // frames + rails
    const frames = [[d.A, d.B, d.D, d.C, d.I], [d.AP, d.BP, d.DP, d.CP, d.IP], [d.AS, d.BS, d.DS, d.CS, d.IS]];
    CASES.forEach((cse, i) => {
      const [a, b, dd, c, ii] = frames[i];
      dw.setStrokes(`fr${cse}`, [[a, b], [b, dd], [dd, c]]);
      dw.setDisk(`pa${cse}`, a);
      dw.setDisk(`pc${cse}`, c);
      dw.setDisk(`pi${cse}`, ii);
    });
    dw.setLabel('lI', V.add(d.I, [0.05, 0.5]));
    dw.setLabel('lA', V.add(d.A, [-0.45, -0.4]));
    dw.setLabel('lC', V.add(d.C, [0.45, -0.4]));

    // Bow notation letters (positions = the applet's Text anchors)
    const cen4 = (a, b, c, e) => [(a[0] + b[0] + c[0] + e[0]) / 4, (a[1] + b[1] + c[1] + e[1]) / 4];
    const mid2 = V.mid;
    const bows = {
      qA: V.add(d.B, [-2, 1]),
      qB: V.add(mid2(mid2(d.B, d.I), mid2(d.I, d.D)), [0, 1]),
      qC: V.add(d.D, [1, 1]),
      qD: V.add(d.C, [1, -1.5]),
      qE: cen4(d.A, d.B, d.D, d.C),
      qF: V.add(d.A, [-2, -1.5]),
      pA: V.add(mid2(d.AP, d.BP), [-2, 0]),
      pB: V.add(mid2(d.BP, d.DP), [0, 1]),
      pC: V.add(d.CP, [1, -1.5]),
      pD: cen4(d.AP, d.BP, d.DP, d.CP),
      pE: V.add(d.AP, [-2, -1.5]),
      sA: V.add(d.BS, [-2, 1]),
      sB: V.add(mid2(mid2(d.BS, d.IS), mid2(d.IS, d.DS)), [0, 1]),
      sC: V.add(d.DS, [1, 1]),
      sD: V.add(d.CS, [1, -1.5]),
      sE: cen4(d.AS, d.BS, d.DS, d.CS),
      sF: V.add(d.AS, [-2, -1.5]),
      sG: V.add(mid2(d.AS, d.BS), [-2, 0]),
      fa: V.add(d.LL0, [0.55, 0]),
      fg: V.add(d.C4, [0.55, 0]),
    };
    for (const n of Object.keys(BOW)) dw.setLabel(`bow_${n}`, bows[n]);
    const railX = [0, d.l, d.xI, s.P, s.P + d.xI, s.P + d.l, s.S, s.S + d.xI];
    railX.forEach((x, i) => dw.setDashLine(`rail${i}`, [[x, s.yJ5], [x, -s.dM]]));

    // loads
    const bands = { U: 0, S: s.S };
    for (const cse of ['U', 'S']) {
      const off = bands[cse];
      const x0 = off, x1 = off + d.xI, x2 = off + d.l;
      dw.setPoly(`band${cse}L`, [[x0, s.yL1], [x1, s.yL1], [x1, d.yBand], [x0, d.yBand]]);
      dw.setPoly(`band${cse}R`, [[x1, s.yL1], [x2, s.yL1], [x2, d.yBand], [x1, d.yBand]]);
      dw.setStrokes(`bandE${cse}`, [
        [[x0, s.yL1], [x2, s.yL1]], [[x0, d.yBand], [x2, d.yBand]],
        [[x0, s.yL1], [x0, d.yBand]], [[x2, s.yL1], [x2, d.yBand]],
        [[x1, s.yL1], [x1, d.yBand]], [[x1, s.yL1], [x1, d.yBand]], [[x1, s.yL1], [x1, d.yBand]],
      ]);
      dw.setLabel(`lq${cse}`, [off - 0.55, (s.yL1 + d.yBand) / 2 + 0.3]);
      dw.setArrow(`aR1${cse}`, [off + d.Rc[0], s.yArr + 2 * s.sLS], [off + d.Rc[0], s.yArr]);
      dw.setArrow(`aR2${cse}`, [off + d.Sc[0], s.yArr + 2 * s.sLS], [off + d.Sc[0], s.yArr]);
      dw.setLabel(`lR1${cse}`, [off + d.Rc[0] + 0.5, s.yArr + 1.4]);
      dw.setLabel(`lR2${cse}`, [off + d.Sc[0] + 0.5, s.yArr + 1.4]);
    }
    dw.setArrow('aFP', d.Z2, d.BP);
    dw.setArrow('aFS', d.Jp, d.BS);
    dw.setLabel('lFP', V.add(d.Z2, [-0.4, 0.4]));
    dw.setLabel('lFS', V.add(d.Jp, [-0.4, 0.4]));

    // load lines
    dw.setArrow('fR1', d.LL0, d.E1);
    dw.setArrow('fR2', d.E1, d.K);
    dw.setLabel('lfR1', V.add(V.mid(d.LL0, d.E1), [0.5, 0]));
    dw.setLabel('lfR2', V.add(V.mid(d.E1, d.K), [0.5, 0]));
    dw.setSeg('fPLine', d.A3, d.B3);
    dw.setArrow('fFP', [d.A3[0], d.A3[1] - 0.55], [d.B3[0], d.B3[1] - 0.55]);
    dw.setLabel('lfFP', [V.mid(d.A3, d.B3)[0], d.A3[1] - 1.05]);
    dw.setArrow('fFS', d.C4, d.LLT0);
    dw.setLabel('lfFS', V.add(V.mid(d.C4, d.LLT0), [0, 0.42]));
    dw.setArrow('fR1S', d.LLT0, d.L_2);
    dw.setArrow('fR2S', d.L_2, d.B4);
    dw.setLabel('lfR1S', V.add(V.mid(d.LLT0, d.L_2), [0.5, 0]));
    dw.setLabel('lfR2S', V.add(V.mid(d.L_2, d.B4), [0.5, 0]));
    dw.setDisk('pt_LL0', d.LL0);
    dw.setDisk('pt_A3', d.A3);
    dw.setDisk('pt_C4', d.C4);

    // poles
    dw.setDashLine('chU1', [d.A, d.I]);
    dw.setDashLine('chU2', [d.I, d.C]);
    dw.setDashLine('parU1', [V.add(d.I1, V.mul(V.unit(V.sub(d.I, d.A)), 2.6)), V.add(d.I1, V.mul(V.unit(V.sub(d.I, d.A)), -0.4))]);
    dw.setDashLine('parU2', [V.add(d.I1, V.mul(V.unit(V.sub(d.C, d.I)), -2.6)), V.add(d.I1, V.mul(V.unit(V.sub(d.C, d.I)), 0.4))]);
    dw.setDisk('pt_I1', d.I1);
    dw.setLabel('lI1', V.add(d.I1, [-0.55, -0.1]));
    dw.setDashLine('chP1', [d.AP, d.IP]);
    dw.setDashLine('chP2', [d.IP, d.CP]);
    dw.setDashLine('parP1', [d.A3, V.add(d.G3, V.mul(V.sub(d.G3, d.A3), 0.12))]);
    dw.setDashLine('parP2', [d.B3, V.add(d.G3, V.mul(V.sub(d.G3, d.B3), 0.12))]);
    dw.setDisk('pt_G3', d.G3);
    dw.setLabel('lG3', V.add(d.G3, [-0.05, 0.45]));
    dw.setDisk('pt_H3', d.H3);
    dw.setLabel('lH3', V.add(d.H3, [-0.35, -0.42]));

    // UDL reactions
    dw.setArrow('fAHU', d.K1, d.LL0);
    dw.setArrow('fAVU', d.I1, d.K1);
    dw.setArrow('fBVU', d.J1, d.I1);
    dw.setArrow('fBHU', d.K, d.J1);
    dw.setLabel('lfAHU', V.add(V.mid(d.K1, d.LL0), [-0.1, 0.45]));
    dw.setLabel('lfAVU', V.add(V.mid(d.I1, d.K1), [-0.6, 0.4]));
    dw.setLabel('lfBVU', V.add(V.mid(d.J1, d.I1), [-0.6, -0.4]));
    dw.setLabel('lfBHU', V.add(V.mid(d.K, d.J1), [-0.1, -0.5]));
    const rr = 2 * s.sLS;
    const feet = (cse, a, c) => {
      dw.setArrow(`rAH${cse}`, [a[0] - rr, a[1]], a);
      dw.setArrow(`rAV${cse}`, [a[0], a[1] - rr], a);
      dw.setArrow(`rBV${cse}`, [c[0], c[1] - rr], c);
      dw.setArrow(`rBH${cse}`, [c[0] + rr, c[1]], c);
      dw.setLabel(`lrAH${cse}`, [a[0] - rr + 0.1, a[1] + 0.45]);
      dw.setLabel(`lrAV${cse}`, [a[0] - 0.6, a[1] - rr + 0.25]);
      dw.setLabel(`lrBV${cse}`, [c[0] + 0.6, c[1] - rr + 0.25]);
      dw.setLabel(`lrBH${cse}`, [c[0] + rr - 0.1, c[1] + 0.45]);
    };
    feet('U', d.A, d.C);
    feet('P', d.AP, d.CP);
    feet('S', d.AS, d.CS);

    // point-case force diagram
    dw.setArrow('fAHP', d.H3, d.A3);
    dw.setArrow('fBHP', d.B3, d.H3);
    dw.setArrow('fAVP', d.G3, d.H3);
    dw.setArrow('fBVP', d.A7, d.Z6);
    dw.setLabel('lfAHP', V.add(V.mid(d.H3, d.A3), [-0.3, -0.45]));
    dw.setLabel('lfBHP', V.add(V.mid(d.B3, d.H3), [0.3, -0.45]));
    dw.setLabel('lfAVP', V.add(V.mid(d.G3, d.H3), [-0.55, 0.3]));
    dw.setLabel('lfBVP', V.add(V.mid(d.A7, d.Z6), [0.6, 0.3]));

    // superposition force diagram components
    dw.setArrow('fBHS', d.B4, d.D4);
    dw.setArrow('fBVS', d.D4, d.E4);
    dw.setArrow('fAVS', d.E4, d.F4);
    dw.setArrow('fAHS', d.F4, d.G4);
    dw.setLabel('lfBHS', V.add(V.mid(d.B4, d.D4), [0, -0.5]));
    dw.setLabel('lfBVS', V.add(V.mid(d.D4, d.E4), [-0.6, 0]));
    dw.setLabel('lfAVS', V.add(V.mid(d.E4, d.F4), [-0.6, 0]));
    dw.setLabel('lfAHS', V.add(V.mid(d.F4, d.G4), [0, 0.45]));

    // copies + red rows
    const setCopy = (name, c) => {
      dw.setStrokes(`cp${name}`, [[c.a, c.b], [c.b, c.d], [c.d, c.c]]);
      dw.setDisk(`cp${name}a`, c.a);
      dw.setDisk(`cp${name}c`, c.c);
      dw.setDisk(`cp${name}i`, c.i);
    };
    setCopy('NU', d.N0); setCopy('NP', d.NP); setCopy('NS', d.NS);
    setCopy('VU', d.V0); setCopy('VP', d.VP); setCopy('VS', d.VS);
    setCopy('MU', d.M0); setCopy('MP', d.MP); setCopy('MS', d.MS);

    dw.setStrokes('dNU', [[d.N0.a, d.O2], [d.O2, d.K2], [d.K2, d.N0.b], [d.N0.b, d.C2],
                          [d.C2, d.E2], [d.E2, d.N0.d], [d.N0.d, d.N2], [d.N2, d.P2], [d.P2, d.N0.c]]);
    dw.setStrokes('dVU', [[d.V0.b, d.Q2], [d.Q2, d.S2], [d.V0.d, d.S2], [d.V0.b, d.T2],
                          [d.T2, d.V2], [d.V2, d.V0.a], [d.V0.d, d.U2], [d.U2, d.W2], [d.W2, d.V0.c]]);
    dw.setStrokes('dMU', [[d.M0.a, d.G2], [d.G2, d.M0.b], [d.M0.b, d.F2],
                          [d.H2, d.M0.d], [d.M0.d, d.I2], [d.I2, d.M0.c]]);
    dw.setStrokes('mlU', pairs(d.MLine));
    dw.setDashLine('closeU', [d.F2, d.H2]);
    dw.setSeg('mmaxU', d.Mm1, d.Mm2);
    dw.setLabel('lMmU', V.add(V.mid(d.Mm1, d.Mm2), [0.85, 0.55]));
    dw.setLabel('lM4U', V.add(V.mid(d.G2, d.M0.b), [-0.15, -0.5]));
    dw.setLabel('lM5U', V.add(V.mid(d.M0.d, d.I2), [0.15, -0.5]));
    dw.setStrokes('arcUL', arcPts(d.M0.b, d.F2, d.G2, 12));
    dw.setStrokes('arcUR', arcPts(d.M0.d, d.I2, d.H2, 12));

    dw.setStrokes('dNP', [[d.NP.d, d.I3], [d.I3, d.J3], [d.J3, d.NP.b], [d.NP.b, d.K3],
                          [d.K3, d.M3], [d.M3, d.NP.a], [d.NP.d, d.L3], [d.L3, d.N3], [d.N3, d.NP.c]]);
    dw.setStrokes('dVP', [[d.VP.a, d.O3], [d.O3, d.Q3], [d.Q3, d.VP.b], [d.VP.b, d.R3],
                          [d.R3, d.S3], [d.S3, d.VP.d], [d.VP.d, d.U3], [d.U3, d.T3], [d.T3, d.VP.c]]);
    dw.setStrokes('dMP', [[d.MP.b, d.Z3], [d.Z3, d.MP.a], [d.MP.b, d.V3], [d.V3, d.A4],
                          [d.A4, d.MP.d], [d.MP.d, d.W3], [d.W3, d.MP.c]]);
    dw.setStrokes('arcPL', arcPts(d.MP.b, d.V3, d.Z3, 12));
    dw.setStrokes('arcPR', arcPts(d.MP.d, d.W3, d.A4, 12));

    dw.setStrokes('dNS', [[d.NS.a, d.N4], [d.N4, d.K4], [d.K4, d.NS.b], [d.NS.b, d.I4],
                          [d.I4, d.O4], [d.O4, d.NS.d], [d.NS.d, d.M4], [d.M4, d.P4], [d.P4, d.NS.c]]);
    dw.setStrokes('dVS', [[d.VS.a, d.L4], [d.L4, d.R4], [d.R4, d.VS.b], [d.VS.b, d.V4],
                          [d.V4, d.W4], [d.W4, d.VS.d], [d.VS.c, d.S4], [d.S4, d.U4], [d.U4, d.VS.d]]);
    dw.setStrokes('dMS', [[d.MS.a, d.T4], [d.T4, d.MS.b], [d.MS.b, d.Z4],
                          [d.B5, d.MS.d], [d.MS.d, d.A5], [d.A5, d.MS.c]]);
    dw.setStrokes('mlS', pairs(d.SMLine));
    dw.setDashLine('closeS', [d.Z4, d.B5]);
    dw.setSeg('mmaxS', d.J2s, d.M2s);
    dw.setLabel('lMmS', V.add(V.mid(d.J2s, d.M2s), [0.9, 0.5]));
    dw.setStrokes('arcSL', arcPts(d.MS.b, d.Z4, d.T4, 12));
    dw.setStrokes('arcSR', arcPts(d.MS.d, d.A5, d.B5, 12));

    // thrust line
    dw.setStrokes('thrFan', d.LL.map((pt) => [pt, d.I1]));
    dw.setDashLine('thrLine', d.parab);

    // o_3 parabola constructions
    dw.setDisk('pt_E5', d.E5);
    dw.setDisk('pt_F5', d.F5);
    dw.setLabel('lE5', V.add(d.E5, [0.45, 0.2]));
    dw.setLabel('lF5', V.add(d.F5, [0.45, 0.2]));
    dw.setStrokes('parFanU', d.LL.map((pt) => [pt, d.E5]));
    dw.setStrokes('parFanS', d.LLT.map((pt) => [pt, d.F5]));
    dw.setDashLine('parChU1', [d.F2, d.D5]);
    dw.setDashLine('parChU2', [d.D5, d.H2]);
    dw.setDashLine('parChS1', [d.Z4, d.C5]);
    dw.setDashLine('parChS2', [d.C5, d.B5]);
    dw.setDashedCircle('parCircU', d.Mm2, V.dist(d.Mm2, d.Mm1));
    dw.setDashedCircle('parCircS', d.M2s, V.dist(d.M2s, d.J2s));

    // pipes: axial widths per case
    const pip = (name, a, b, f) => dw.setPoly(name, V.rectPoints(a, b, Math.max(1e-4, s.sIF * f)));
    pip('pipeUL', d.A, d.B, V.len(d.vAV)); pip('pipeUG', d.B, d.D, V.len(d.vAH)); pip('pipeUR', d.D, d.C, V.len(d.vBV));
    pip('pipePL', d.AP, d.BP, V.len(d.w4)); pip('pipePG', d.BP, d.DP, V.len(d.u4)); pip('pipePR', d.DP, d.CP, V.len(d.v4));
    pip('pipeSL', d.AS, d.BS, V.len(d.sAV)); pip('pipeSG', d.BS, d.DS, V.len(d.sBH)); pip('pipeSR', d.DS, d.CS, V.len(d.sBV));
  }

  // ------------------------------------------------------------------
  // node inspector: feet + hinges of the three frames.
  // 1=A 2=I 3=C (q), 4=A_P 5=I_P 6=C_P (F), 7=A_S 8=I_S 9=C_S (q+F)
  // ------------------------------------------------------------------
  function nodePoly() {
    const j = Math.round(s.node);
    switch (j) {
      case 1: return [[d.I1, d.K1], [d.K1, d.LL0], [d.LL0, d.I1]];
      case 2: return [[d.I1, d.E1], [d.E1, d.I1]];
      case 3: return [[d.J1, d.I1], [d.K, d.J1], [d.I1, d.K]];
      case 4: return [[d.G3, d.H3], [d.H3, d.A3], [d.A3, d.G3]];
      case 5: return [[d.G3, d.B3], [d.B3, d.G3]];
      case 6: return [[d.B3, d.H3], [d.H3, d.G3], [d.G3, d.B3]];
      case 7: return [[d.E4, d.F4], [d.F4, d.G4], [d.G4, d.E4]];
      case 8: {
        const v = V.add(V.sub(d.G4, d.E4), V.sub(d.LLT0, d.C4));
        return [[d.E4, V.add(d.E4, v)], [V.add(d.E4, v), d.E4]];
      }
      case 9: return [[d.B4, d.D4], [d.D4, d.E4], [d.E4, d.B4]];
      default: return [];
    }
  }
  function updateNode() {
    const j = Math.round(s.node);
    const names = ['A', 'I', 'C', 'A (F)', 'I (F)', 'C (F)', 'A (q+F)', 'I (q+F)', 'C (q+F)'];
    const disks = ['paU', 'piU', 'pcU', 'paP', 'piP', 'pcP', 'paS', 'piS', 'pcS'];
    dw.selectDisk(j >= 1 ? disks[j - 1] : null);
    const posn = [d.A, d.I, d.C, d.AP, d.IP, d.CP, d.AS, d.IS, d.CS];
    dw.setNodeInspector(posn[(j || 1) - 1], 1.5, `node ${names[(j || 1) - 1]}`, nodePoly());
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
  // panel + drag
  // ------------------------------------------------------------------
  const view = panel.section('View');
  panel.button(view, 'zoom fit', () => dw.zoomFit());

  const par = panel.section('Parameters');
  panel.slider(par, s, 'q', 'q — line load (kN/m)', 10, 30, 1, refresh);
  panel.slider(par, s, 'F', 'F — point load (kN)', 10, 30, 1, refresh);
  panel.slider(par, s, 'fr', 'frame size l = h (m)', 2, 6, 0.1, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (kN/unit)', 5, 20, 1, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 0.2, 1, 0.1, refresh);
  panel.slider(par, s, 'sND', 'scale N diagram', 15, 50, 1, refresh);
  panel.slider(par, s, 'sVD', 'scale V diagram', 15, 50, 1, refresh);
  panel.slider(par, s, 'sMD', 'scale M diagram', 15, 100, 1, refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.15, 0.005, refresh);
  panel.toggle(par, s, 'switchN', 'switch N side', refresh);
  panel.toggle(par, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
  panel.toggle(par, s, 'o1t', 'keep chord constructions', refresh);
  const thrProxy = { get w2() { return s.w2 === null ? s._k === 11 : s.w2; }, set w2(v) { s.w2 = v; } };
  panel.toggle(par, thrProxy, 'w2', 'show thrust line (q)', refresh);
  panel.toggle(par, s, 'o3', 'show parabola construction', refresh);
  panel.toggle(par, s, 'bow', 'show Bow notation', refresh);
  panel.button(par, 'reset geometry', () => {
    const kp = { _k: s._k, node: s.node, w2: s.w2 };
    Object.assign(s, { ...DEFAULTS, ...kp });
    panel.syncAll();
    refresh();
  });

  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off; 1-3 q: A I C; 4-6 F; 7-9 q+F)', 0, 9, 1, refresh);

  const hits = [
    ['I', () => d.I, 1], ['IP', () => d.IP, 1], ['IS', () => d.IS, 1],
    ['LL0', () => d.LL0, 2], ['A3', () => d.A3, 2], ['C4', () => d.C4, 2],
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
      if (name === 'I') s.xI = Math.max(0.05, Math.min(s.fr - 0.05, wx));
      else if (name === 'IP') s.xI = Math.max(0.05, Math.min(s.fr - 0.05, wx - s.P));
      else if (name === 'IS') s.xI = Math.max(0.05, Math.min(s.fr - 0.05, wx - s.S));
      else if (name === 'LL0') { s.llx = wx; s.lly = wy; }
      else if (name === 'A3') { s.a3x = wx; s.a3y = wy; }
      else if (name === 'C4') { s.c4x = wx; s.c4y = wy; }
      refresh();
    },
  );

  const nodes = [() => d.A, () => d.I, () => d.C, () => d.AP, () => d.IP, () => d.CP,
                 () => d.AS, () => d.IS, () => d.CS];
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
