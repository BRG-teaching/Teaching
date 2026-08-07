/**
 * Drawing view/34 "Supersam"
 * (https://block.arch.ethz.ch/eq/drawing/view/34) as a step-by-step
 * construction.
 *
 * The Warsaw Supersam roof: every load is carried TWICE -- by a pair of
 * compression ARCHES (wall -> middle column -> wall, blue) and by one
 * full-span tension CABLE (red/pink) -- designed with EQUAL AND OPPOSITE
 * horizontal thrusts (H_t = H_c = 8.2 * factor_H), so the horizontal pulls
 * cancel at the walls and the middle strut carries H between the arches.
 * Three three-point funicular problems over one load line: two arch poles
 * on the vertical at H_c LEFT of the load line, the cable pole at H_t
 * RIGHT (drawn offset for legibility).
 *
 * Live port of view_34/applet_0/geogebra.xml (618 objects); the full chain
 * matches the LIVE applet to ~1.4e-14 over 39 points in 5 states
 * (scratchpad/v34_regress.py). The applet's section sketch ships as
 * assets/view_34_sketch.png (toggle, default off like the applet).
 * See notes/view_34_analysis.md.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 34 — Supersam',
  subtitle: 'compression arches + a tension cable with equal and opposite thrusts',
  about: 'The Warsaw Supersam roof carries every load twice: a pair of compression arches spanning wall–column–wall, and one full-span tension cable — proportioned so the horizontal thrusts are equal and opposite. The horizontal components cancel at the walls, the middle strut carries the thrust between the arches, and only vertical forces reach the foundations. Three three-point funicular problems solved over one load line: trial funiculars find the division points, the arch poles sit at H left of the load line, the cable pole at the same H right.',
  frame: [[-2.1, -5.1], [25.6, 7.6]],
};

// fixed applet geometry (see notes/view_34_analysis.md)
const A0 = [0, 0], B0 = [2.25, 0], D0 = [3.75, 0], F0 = [7.5, 0];
const J0 = [0, 0.65], G0 = [2.25, 0.4], K0 = [7.5, 0.9], Gp = [3.75, 0.4];
const I = [2.25, 0.3], Ip = [3.75, 0.3];
const LXS = [0.375, 1.125, 1.875, 4.125, 4.875, 5.625, 6.375, 7.125];
const YLOAD = 3.396135720636638;          // load-symbol level (L1)
const RAIL_END = [0.014148303732024452, 1.4156595161728123];  // H_1 / A_1 rails
const GROUND = [[-0.9472, 0], [8.3267, 0]];
const IM_BL = [-1.1410, -0.4127], IM_BR = [8.7923, -0.4127];
const IM_H = 121 / 769;

const TR_END = 5;                         // arch trials retire (applet step ≟ 2)
const TT_END = 10;                        // tension trial retires (applet ≟ 6)
const BASE = 11;

const DEFAULTS = {
  yH1: 0.7259251922704095,                // left cable/arch end
  yA1: 1.1681842713338448,                // right end
  LL8: [16.77257865254951, 4.456674936530674],
  yN: -2.7542107149593376,                // H anchor on the load-line axis
  I1: [13.291175554312517, 3.7034370019297733],   // trial pole span 1
  yJ1: 3.986151029025891,                 // trial start span 1 (x = 0)
  L: [13.058317503832091, 2.0310928212067783],    // trial pole span 2
  yM: 3.971030234793304,                  // trial start span 2 (x = 3.75)
  T1: [21.593191672559705, 3.664619503895654],    // tension trial pole
  yU1: 4.303064942551311,                 // tension trial start (x = 0)
  loadP: 0.5, factorH: 0.8, off: 0.6, offRF: 1.25,
  sFD: 0.8, sLS: 0.8,
  img: false, node: 0, _k: 99,
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The site', d: 'left: two walls and a middle column (supports 1–4); the roof ends H₁ and A₁ drag on the wall verticals; eight lines of action with a gap over the column — toggle the section sketch in the panel' },
  { t: 'The loads, the load line and H', d: 'left: eight equal loads — right: the load line: R₁ = spans 1–3, R₂ = 4–8 (drawn twice: once for the arches, once for the cable); CHOOSE the thrust: H_compression = H_tension = 8.2·factor_H, laid off left and right of the load-line axis from the draggable N' },
  { t: 'Trial funicular — span 1', d: 'right: any pole with rays — left: a trial funicular for loads 1–3 from J₁; the closing chord, copied through the pole, cuts the load line at the division i₁ᶜ' },
  { t: 'Trial funicular — span 2', d: 'the same for loads 4–8 from M on the column vertical: the division i₂ᶜ' },
  { t: 'The arch poles', d: 'left: the chords wall–column (dashed blue) — right: parallels through the divisions meet the H_c vertical at the poles o₁ᶜ and o₂ᶜ' },
  { t: 'The arches', d: 'right: rays from both poles — left: from H₁ and from I′, each side parallel to its ray: two compression arches land exactly on the column and the wall' },
  { t: 'The arch reactions', d: 'right: the outer rays close each span: A_c, B_c at the pole o₁ᶜ, C_c, D_c at o₂ᶜ — left: the end tangents push into the four supports' },
  { t: 'Horizontal and vertical components', d: 'split every arch reaction: A_Hc = B_H = C_H = D_Hc = H_c — the walls are pushed OUTWARD and the column strut must carry the full H between the arches; the verticals go down the supports' },
  { t: 'The cable pole', d: 'left: a trial over ALL eight loads from U₁ finds the division i_t; the full chord H₁–A₁ (dashed red) — right: the parallel through i_t meets the H_t vertical at o_t (drawn offset, with the offset copy of the load line)' },
  { t: 'The cable', d: 'right: rays from o_t — left: the full-span tension cable through all eight loads; its ends pull A_Ht INWARD at the walls — equal and opposite to the arch push: the horizontals CANCEL' },
  { t: 'The strut and the foundations', d: 'left: the strut I–I′ carries H between the arches; the wall pieces carry down; at the bases only VERTICALS remain: A_V = A_Vc + A_Vt, B_V, C_V — the Supersam principle' },
];

function funi(start, pole, lls, xs) {
  const out = [start];
  for (let k = 0; k < xs.length; k++) {
    const p = out[out.length - 1];
    const dd = V.sub(lls[k], pole);
    out.push([xs[k], p[1] + ((xs[k] - p[0]) / dd[0]) * dd[1]]);
  }
  return out;
}

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const H1 = [0, s.yH1], A1 = [7.5, s.yA1];
  const LL8 = s.LL8.slice();
  const FH = 8.2 * s.factorH;
  const LL = [LL8];
  for (let k = 1; k <= 8; k++) LL.push([LL8[0], LL8[1] - s.loadP * s.sFD * k]);

  const N = [LL8[0], s.yN];
  const O = [N[0] - FH * s.sFD, N[1]];
  const P = [N[0] + FH * s.sFD, N[1]];

  // trials
  const J1 = [0, s.yJ1], M = [3.75, s.yM], U1 = [0, s.yU1];
  const tr1 = funi(J1, s.I1, LL.slice(0, 3), LXS.slice(0, 3));
  tr1.push(V.intersect(tr1[3], V.sub(LL[3], s.I1), I, [0, 1]));
  const O1 = V.intersect(s.I1, V.sub(tr1[4], J1), LL8, [0, 1]);
  const tr2 = funi(M, s.L, LL.slice(3, 8), LXS.slice(3, 8));
  tr2.push(V.intersect(tr2[5], V.sub(LL[8], s.L), [7.5, 0], [0, 1]));
  const W = V.intersect(s.L, V.sub(tr2[6], M), LL8, [0, 1]);
  const trt = funi(U1, s.T1, LL.slice(0, 8), LXS);
  trt.push(V.intersect(trt[8], V.sub(LL[8], s.T1), [7.5, 0], [0, 1]));
  const J2 = V.intersect(s.T1, V.sub(trt[9], U1), LL8, [0, 1]);

  // poles
  const P1 = V.intersect(O1, V.sub(H1, I), O, [0, 1]);
  const Z = V.intersect(W, V.sub(A1, Ip), O, [0, 1]);
  const K2 = V.intersect(J2, V.sub(A1, H1), P, [0, 1]);
  const O7 = [K2[0] + s.off, K2[1]];
  const LLo = LL.map((p) => [p[0] + s.off, p[1]]);
  const P7 = [J2[0] + s.off, J2[1]];

  // arches + cable
  const arch1 = funi(H1, P1, LL.slice(0, 3), LXS.slice(0, 3));
  arch1.push(I);
  const arch2 = funi(Ip, Z, LL.slice(3, 8), LXS.slice(3, 8));
  arch2.push(A1);
  const cable = funi(H1, K2, LL.slice(0, 8), LXS);
  cable.push(A1);

  // component senses (all fixed length sLS; signs from the reaction dirs)
  const Ac = V.mul(V.unit(V.sub(LL8, P1)), s.sLS);      // into H_1
  const Bc = V.mul(V.unit(V.sub(P1, LL[2])), s.sLS);    // into I
  const Cc = V.mul(V.unit(V.sub(LL[2], Z)), s.sLS);     // into I'
  const Dc = V.mul(V.unit(V.sub(Z, LL[7])), s.sLS);     // into A_1
  const At = V.mul(V.unit(V.sub(LL8, K2)), s.sLS);      // into H_1 (tension)
  const Dt = V.mul(V.unit(V.sub(K2, LL[7])), s.sLS);    // into A_1

  const magH = FH;                                       // kN-ish (units/sFD)
  return { H1, A1, LL, LLo, N, O, P, FH, J1, M, U1, tr1, tr2, trt, O1, W, J2,
           P1, Z, K2, O7, P7, arch1, arch2, cable, Ac, Bc, Cc, Dc, At, Dt, magH };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, LL8: [...DEFAULTS.LL8], I1: [...DEFAULTS.I1],
              L: [...DEFAULTS.L], T1: [...DEFAULTS.T1] };
  let d = compute(s);

  const SW = 0.05;
  const ARROW = { w: 0.07, headLen: 0.26, headW: 0.11 };
  const DIM = { w: 0.06, headLen: 0.22, headW: 0.1 };
  const GREY = 0xa0a0a0;

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });

  // ---- step 1: site --------------------------------------------------------
  dw.image('sketch', 'assets/view_34_sketch.png',
           { corners: [IM_BL, IM_BR, [IM_BL[0], IM_BL[1] + V.dist(IM_BL, IM_BR) * IM_H]],
             intro: 1, when: (st) => st.img });
  for (const [nm, pts] of [['pedL', [A0, B0, G0, J0]], ['pedM', [B0, D0, Ip, I]],
                           ['pedR', [D0, F0, K0, Gp]]]) {
    dw.poly(nm, 4, { intro: 1, color: 0x555555, opacity: 0.08, flash: false });
    dw.strokes(`${nm}e`, 4, { intro: 1, w: 0.025, color: 0x777777, flash: false });
  }
  dw.seg('ground', { intro: 1, w: 0.03, color: 0x666666, flash: false });
  for (let k = 0; k < 8; k++) {
    dw.dashLine(`act${k}`, { intro: 1, dash: 0.05, color: 0x9a9a9a, flash: false });
  }
  dw.dashLine('railH1', { intro: 1, dash: 0.1, color: 0xbbbbbb, flash: false });
  dw.dashLine('railA1', { intro: 1, dash: 0.1, color: 0xbbbbbb, flash: false });
  dw.disk('pt_H1', { intro: 1, r: 0.07 });
  dw.disk('pt_A1', { intro: 1, r: 0.07 });
  dw.disk('pt_I', { intro: 1, r: 0.05, face: 0xcccccc, edge: 0x888888 });
  dw.disk('pt_Ip', { intro: 1, r: 0.05, face: 0xcccccc, edge: 0x888888 });
  for (const [i, nm] of ['1', '2', '3', '4'].entries()) {
    dw.label(`sup${i}`, nm, { cls: 'point', intro: 1, flash: false });
  }

  // ---- step 2: loads + load line + H ---------------------------------------
  for (let k = 0; k < 8; k++) dw.arrow(`load${k}`, { intro: 2, ...ARROW });
  dw.disk('pt_LL8', { intro: 2, r: 0.07 });
  dw.arrow('fR1', { intro: 2, ...ARROW });
  dw.arrow('fR2', { intro: 2, ...ARROW });
  dw.label('lfR1', 'R₁', { cls: 'num', intro: 2, color: PAL.green });
  dw.label('lfR2', 'R₂', { cls: 'num', intro: 2, color: PAL.green });
  dw.arrow('fR1o', { intro: 2, ...ARROW });
  dw.arrow('fR2o', { intro: 2, ...ARROW });
  dw.label('lfR1o', 'R₁', { cls: 'num', intro: 2, color: PAL.green });
  dw.label('lfR2o', 'R₂', { cls: 'num', intro: 2, color: PAL.green });
  dw.dashLine('axLL', { intro: 2, dash: 0.14, color: 0x999999, flash: false });
  dw.dashLine('axO', { intro: 2, dash: 0.14, color: 0x999999, flash: false });
  dw.dashLine('axP', { intro: 2, dash: 0.14, color: 0x999999, flash: false });
  dw.disk('pt_N', { intro: 2, r: 0.07 });
  dw.seg('barHc', { intro: 2, w: 0.07, color: PAL.blue });
  dw.seg('barHt', { intro: 2, w: 0.07, color: PAL.red });
  dw.label('lHc', 'H_compression', { cls: 'num', intro: 2, color: PAL.blue });
  dw.label('lHt', 'H_tension', { cls: 'num', intro: 2, color: PAL.red });

  // ---- steps 3-4: arch trials ---------------------------------------------
  for (const [sfx, intro] of [['1', 3], ['2', 4]]) {
    dw.disk(`pt_TP${sfx}`, { intro, outro: TR_END, r: 0.07 });
    dw.disk(`pt_TS${sfx}`, { intro, outro: TR_END, r: 0.07 });
    dw.strokes(`tfun${sfx}`, sfx === '1' ? 4 : 6, { intro, outro: TR_END, w: 0.03, color: GREY });
    dw.strokes(`trays${sfx}`, sfx === '1' ? 4 : 6, { intro, outro: TR_END, w: 0.02, color: 0xbcbcbc });
    dw.dashLine(`tclose${sfx}`, { intro, outro: TR_END, dash: 0.14, color: GREY });
    dw.dashLine(`tpar${sfx}`, { intro, outro: TR_END, dash: 0.14, color: GREY });
    dw.disk(`pt_div${sfx}`, { intro, r: 0.05, face: 0x666666, edge: 0x666666 });
  }
  dw.label('lbl_div1', 'i₁ᶜ', { cls: 'point', intro: 3 });
  dw.label('lbl_div2', 'i₂ᶜ', { cls: 'point', intro: 4 });

  // ---- step 5: poles -------------------------------------------------------
  dw.dashLine('chord1', { intro: 5, dash: 0.13, color: PAL.blue });
  dw.dashLine('chord2', { intro: 5, dash: 0.13, color: PAL.blue });
  dw.dashLine('pol1', { intro: 5, dash: 0.13, color: PAL.blue });
  dw.dashLine('pol2', { intro: 5, dash: 0.13, color: PAL.blue });
  dw.disk('pt_P1', { intro: 5, r: 0.06, face: 0x666666, edge: 0x666666 });
  dw.disk('pt_Z', { intro: 5, r: 0.06, face: 0x666666, edge: 0x666666 });
  dw.label('lbl_P1', 'o₁ᶜ', { cls: 'point', intro: 5 });
  dw.label('lbl_Z', 'o₂ᶜ', { cls: 'point', intro: 5 });

  // ---- step 6: rays + arches ----------------------------------------------
  dw.strokes('rays1', 4, { intro: 6, w: 0.02, color: PAL.black });
  dw.strokes('rays2', 6, { intro: 6, w: 0.02, color: PAL.black });
  dw.strokes('arch1', 4, { intro: 6, w: SW, color: PAL.blue });
  dw.strokes('arch2', 6, { intro: 6, w: SW, color: PAL.blue });

  // ---- step 7: compression reactions --------------------------------------
  for (const nm of ['fAc', 'fBc', 'fCc', 'fDc']) dw.arrow(nm, { intro: 7, ...ARROW });
  for (const nm of ['aAc', 'aBc', 'aCc', 'aDc']) {
    dw.arrow(nm, { intro: 7, outro: 8, ...ARROW });
  }
  dw.label('lfAc', 'A_c', { cls: 'num', intro: 7, color: PAL.green });
  dw.label('lfBc', 'B_c', { cls: 'num', intro: 7, color: PAL.green });
  dw.label('lfCc', 'C_c', { cls: 'num', intro: 7, color: PAL.green });
  dw.label('lfDc', 'D_c', { cls: 'num', intro: 7, color: PAL.green });
  dw.label('laAc', 'A_c', { cls: 'num', intro: 7, outro: 8, color: PAL.green });
  dw.label('laDc', 'D_c', { cls: 'num', intro: 7, outro: 8, color: PAL.green });

  // ---- step 8: components --------------------------------------------------
  // form H components persist to the end; V components retire at the base step
  for (const [nm, lb] of [['aAHc', 'A_Hc'], ['aBH', 'B_H'], ['aCH', 'C_H'], ['aDHc', 'D_Hc']]) {
    dw.arrow(nm, { intro: 8, ...ARROW });
    dw.label(`l${nm}`, lb, { cls: 'num', intro: 8, color: PAL.green });
  }
  for (const [nm, lb] of [['aAVc', 'A_Vc'], ['aBV', 'B_V'], ['aCV', 'C_V'], ['aDVc', 'D_Vc']]) {
    dw.arrow(nm, { intro: 8, outro: BASE, ...ARROW });
    dw.label(`l${nm}`, lb, { cls: 'num', intro: 8, outro: BASE, color: PAL.green });
  }
  // force-side dimension arrows + dotted leaders (retire at the base step)
  for (const [nm, lb] of [['dAHc', 'A_Hc'], ['dBH', 'B_H'], ['dCH', 'C_H'],
                          ['dAVc', 'A_Vc'], ['dDVc', 'D_Vc'], ['dBV', 'B_V'], ['dCV', 'C_V']]) {
    dw.arrow(nm, { intro: 8, outro: BASE, ...DIM });
    dw.label(`l${nm}`, lb, { cls: 'num', intro: 8, outro: BASE, color: PAL.green });
  }
  for (let i = 0; i < 6; i++) {
    dw.dashLine(`lead${i}`, { intro: 8, outro: BASE, dash: 0.06, color: 0x88bb88,
      flash: false });
  }

  // ---- step 9: tension trial + pole + offset line --------------------------
  dw.disk('pt_TT', { intro: 9, outro: TT_END, r: 0.07 });
  dw.disk('pt_TU', { intro: 9, outro: TT_END, r: 0.07 });
  dw.strokes('tfunT', 9, { intro: 9, outro: TT_END, w: 0.03, color: GREY });
  dw.strokes('traysT', 9, { intro: 9, outro: TT_END, w: 0.02, color: 0xbcbcbc });
  dw.dashLine('tcloseT', { intro: 9, outro: TT_END, dash: 0.14, color: GREY });
  dw.dashLine('tparT', { intro: 9, outro: TT_END, dash: 0.14, color: GREY });
  dw.disk('pt_J2', { intro: 9, r: 0.05, face: 0x666666, edge: 0x666666 });
  dw.label('lbl_J2', 'i_t', { cls: 'point', intro: 9 });
  dw.dashLine('chordT', { intro: 9, dash: 0.13, color: PAL.red });
  dw.disk('pt_O7', { intro: 9, r: 0.06, face: 0x666666, edge: 0x666666 });
  dw.label('lbl_O7', 'o_t', { cls: 'point', intro: 9 });
  dw.strokes('raysT', 9, { intro: 9, w: 0.02, color: PAL.black });
  dw.dashLine('polT', { intro: 9, dash: 0.13, color: PAL.red });

  // ---- step 10: the cable + tension reactions ------------------------------
  dw.strokes('cable', 9, { intro: 10, w: SW, color: PAL.red });
  dw.arrow('fAt', { intro: 10, ...ARROW });
  dw.arrow('fDt', { intro: 10, ...ARROW });
  dw.label('lfAt', 'A_t', { cls: 'num', intro: 10, color: PAL.green });
  dw.label('lfDt', 'D_t', { cls: 'num', intro: 10, color: PAL.green });
  dw.arrow('aAt', { intro: 10, outro: BASE, ...ARROW });
  dw.arrow('aDt', { intro: 10, outro: BASE, ...ARROW });
  dw.label('laAt', 'A_t', { cls: 'num', intro: 10, outro: BASE, color: PAL.green });
  dw.label('laDt', 'D_t', { cls: 'num', intro: 10, outro: BASE, color: PAL.green });
  for (const [nm, lb] of [['aAHt', 'A_Ht'], ['aDHt', 'D_Ht']]) {
    dw.arrow(nm, { intro: 10, ...ARROW });
    dw.label(`l${nm}`, lb, { cls: 'num', intro: 10, color: PAL.green });
  }
  for (const [nm, lb] of [['aAVt', 'A_Vt'], ['aDVt', 'D_Vt'],
                          ['dAVt', 'A_Vt'], ['dDVt', 'D_Vt']]) {
    dw.arrow(nm, { intro: 10, outro: BASE, ...(nm[0] === 'd' ? DIM : ARROW) });
    dw.label(`l${nm}`, lb, { cls: 'num', intro: 10, outro: BASE, color: PAL.green });
  }
  dw.dashLine('lead6', { intro: 10, outro: BASE, dash: 0.06, color: 0x88bb88, flash: false });
  dw.dashLine('lead7', { intro: 10, outro: BASE, dash: 0.06, color: 0x88bb88, flash: false });

  // ---- step 11: strut + bases ---------------------------------------------
  dw.seg('strut', { intro: BASE, w: 0.06, color: PAL.blue });
  dw.seg('wallL', { intro: BASE, w: 0.06, color: PAL.blue });
  dw.seg('wallM', { intro: BASE, w: 0.06, color: PAL.blue });
  for (const nm of ['A', 'B', 'D', 'F']) {
    dw.disk(`pt_b${nm}`, { intro: BASE, r: 0.05, face: 0xcccccc, edge: 0x888888 });
  }
  dw.arrow('aAV', { intro: BASE, ...ARROW });
  dw.arrow('aBV', { intro: BASE, ...ARROW });
  dw.arrow('aCV', { intro: BASE, ...ARROW });
  dw.label('lbAV', 'A_V = A_Vc + A_Vt', { cls: 'num', intro: BASE, color: PAL.green });
  dw.label('lbBV', 'B_V', { cls: 'num', intro: BASE, color: PAL.green });
  dw.label('lbCV', 'C_V', { cls: 'num', intro: BASE, color: PAL.green });

  // node inspector
  dw.nodeInspector(4, { when: (st) => st.node > 0, w: 1.5 * SW,
                        headLen: 0.2, headW: 0.09, r: 0.09 });

  // dual pairs + ghosts
  dw.link('arch1', 'rays1', 'chord1', 'pol1');
  dw.link('arch2', 'rays2', 'chord2', 'pol2');
  dw.link('cable', 'raysT', 'chordT', 'polT');
  dw.link('aAc', 'fAc', 'laAc', 'lfAc');
  dw.link('aDc', 'fDc', 'laDc', 'lfDc');
  dw.link('aAt', 'fAt', 'laAt', 'lfAt');
  dw.link('aDt', 'fDt', 'laDt', 'lfDt');
  dw.link('aAHc', 'dAHc', 'laAHc', 'ldAHc');
  dw.link('aBH', 'dBH', 'strut', 'laBH', 'ldBH');
  dw.link('aCH', 'dCH', 'laCH', 'ldCH');
  dw.link('aAVc', 'dAVc', 'laAVc', 'ldAVc');
  dw.link('aBV', 'dBV', 'laBV', 'ldBV');
  dw.link('aCV', 'dCV', 'ldCV');
  dw.link('aDVc', 'dDVc', 'laDVc', 'ldDVc');
  dw.link('aAVt', 'dAVt', 'ldAVt');
  dw.link('aDVt', 'dDVt', 'ldDVt');
  dw.link('barHc', 'lHc');
  dw.link('barHt', 'lHt');
  dw.ghostable('fR1', 'fR2', 'fR1o', 'fR2o', 'rays1', 'rays2', 'raysT',
               'fAc', 'fBc', 'fCc', 'fDc', 'fAt', 'fDt', 'barHc', 'barHt');
  dw.instant('sketch', 'ground', 'pedLe', 'pedMe', 'pedRe', 'pedL', 'pedM', 'pedR',
             'railH1', 'railA1',
             ...Array.from({ length: 8 }, (_, k) => `act${k}`));

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------
  const pairs = (poly) => poly.slice(0, -1).map((p, i) => [p, poly[i + 1]]);

  function update() {
    dw.setLabel('form_title', [-1.5, 7.2]);
    dw.setLabel('force_title', [9.7, 7.2]);
    const uim = V.dist(IM_BL, IM_BR) * IM_H;
    dw.setImage('sketch', [IM_BL, IM_BR, [IM_BL[0], IM_BL[1] + uim]]);
    dw.setPoly('pedL', [A0, B0, G0, J0]);
    dw.setPoly('pedM', [B0, D0, Ip, I]);
    dw.setPoly('pedR', [D0, F0, K0, Gp]);
    const ring4 = (a, b, c, e) => [[a, b], [b, c], [c, e], [e, a]];
    dw.setStrokes('pedLe', ring4(A0, B0, G0, J0));
    dw.setStrokes('pedMe', ring4(B0, D0, Ip, I));
    dw.setStrokes('pedRe', ring4(D0, F0, K0, Gp));
    dw.setSeg('ground', GROUND[0], GROUND[1]);
    for (let k = 0; k < 8; k++) {
      dw.setDashLine(`act${k}`, [[LXS[k], YLOAD], [LXS[k], -0.6]]);
    }
    dw.setDashLine('railH1', [[0, RAIL_END[0]], [0, RAIL_END[1]]]);
    dw.setDashLine('railA1', [[7.5, RAIL_END[0]], [7.5, RAIL_END[1]]]);
    dw.setDisk('pt_H1', d.H1);
    dw.setDisk('pt_A1', d.A1);
    dw.setDisk('pt_I', I);
    dw.setDisk('pt_Ip', Ip);
    dw.setLabel('sup0', [J0[0] - 0.25, J0[1] + 0.2]);
    dw.setLabel('sup1', [I[0] - 0.2, I[1] + 0.25]);
    dw.setLabel('sup2', [Ip[0] + 0.2, Ip[1] + 0.25]);
    dw.setLabel('sup3', [K0[0] + 0.25, K0[1] + 0.2]);

    for (let k = 0; k < 8; k++) {
      dw.setArrow(`load${k}`, [LXS[k], YLOAD], [LXS[k], YLOAD - s.sLS]);
    }
    dw.setDisk('pt_LL8', d.LL[0]);
    dw.setArrow('fR1', d.LL[0], d.LL[3]);
    dw.setArrow('fR2', d.LL[3], d.LL[8]);
    dw.setLabel('lfR1', [d.LL[0][0] - 0.35, (d.LL[0][1] + d.LL[3][1]) / 2]);
    dw.setLabel('lfR2', [d.LL[3][0] - 0.35, (d.LL[3][1] + d.LL[8][1]) / 2]);
    dw.setArrow('fR1o', d.LLo[0], d.LLo[3]);
    dw.setArrow('fR2o', d.LLo[3], d.LLo[8]);
    dw.setLabel('lfR1o', [d.LLo[0][0] + 0.35, (d.LLo[0][1] + d.LLo[3][1]) / 2]);
    dw.setLabel('lfR2o', [d.LLo[3][0] + 0.35, (d.LLo[3][1] + d.LLo[8][1]) / 2]);
    dw.setDashLine('axLL', [[d.LL[0][0], 5.69], [d.LL[0][0], -3.3]]);
    dw.setDashLine('axO', [[d.O[0], 5.69], [d.O[0], -3.3]]);
    dw.setDashLine('axP', [[d.P[0] + s.off, 5.69], [d.P[0] + s.off, -3.3]]);
    dw.setDisk('pt_N', d.N);
    dw.setSeg('barHc', d.N, d.O);
    dw.setSeg('barHt', [d.N[0] + s.off, d.N[1]], [d.P[0] + s.off, d.P[1]]);
    dw.setLabel('lHc', [(d.N[0] + d.O[0]) / 2, d.N[1] + 0.3]);
    dw.setLabel('lHt', [(d.N[0] + d.P[0]) / 2 + s.off, d.N[1] + 0.3]);

    // trials
    const ext = (a, b, e) => V.add(b, V.mul(V.unit(V.sub(b, a)), e));
    dw.setDisk('pt_TP1', s.I1);
    dw.setDisk('pt_TS1', d.J1);
    dw.setStrokes('tfun1', pairs(d.tr1));
    dw.setStrokes('trays1', d.LL.slice(0, 4).map((p) => [s.I1, p]));
    dw.setDashLine('tclose1', [d.J1, d.tr1[4]]);
    dw.setDashLine('tpar1', [s.I1, ext(s.I1, d.O1, 0.3)]);
    dw.setDisk('pt_div1', d.O1);
    dw.setLabel('lbl_div1', [d.O1[0] - 0.55, d.O1[1] - 0.1]);
    dw.setDisk('pt_TP2', s.L);
    dw.setDisk('pt_TS2', d.M);
    dw.setStrokes('tfun2', pairs(d.tr2));
    dw.setStrokes('trays2', d.LL.slice(3, 9).map((p) => [s.L, p]));
    dw.setDashLine('tclose2', [d.M, d.tr2[6]]);
    dw.setDashLine('tpar2', [s.L, ext(s.L, d.W, 0.3)]);
    dw.setDisk('pt_div2', d.W);
    dw.setLabel('lbl_div2', [d.W[0] - 0.55, d.W[1] - 0.1]);

    // poles
    dw.setDashLine('chord1', [I, d.H1]);
    dw.setDashLine('chord2', [Ip, d.A1]);
    dw.setDashLine('pol1', [d.P1, d.O1]);
    dw.setDashLine('pol2', [d.Z, d.W]);
    dw.setDisk('pt_P1', d.P1);
    dw.setDisk('pt_Z', d.Z);
    dw.setLabel('lbl_P1', [d.P1[0] - 0.5, d.P1[1] + 0.15]);
    dw.setLabel('lbl_Z', [d.Z[0] - 0.5, d.Z[1] - 0.2]);

    // rays + arches
    dw.setStrokes('rays1', d.LL.slice(0, 4).map((p) => [d.P1, p]));
    dw.setStrokes('rays2', d.LL.slice(3, 9).map((p) => [d.Z, p]));
    dw.setStrokes('arch1', pairs(d.arch1));
    dw.setStrokes('arch2', pairs(d.arch2));

    // compression reactions
    dw.setArrow('fAc', d.P1, d.LL[0]);
    dw.setArrow('fBc', d.LL[2], d.P1);
    dw.setArrow('fCc', d.Z, d.LL[2]);
    dw.setArrow('fDc', d.LL[7], d.Z);
    dw.setLabel('lfAc', V.add(V.mid(d.P1, d.LL[0]), [0.15, 0.25]));
    dw.setLabel('lfBc', V.add(V.mid(d.LL[2], d.P1), [0.1, -0.28]));
    dw.setLabel('lfCc', V.add(V.mid(d.Z, d.LL[2]), [0.15, 0.28]));
    dw.setLabel('lfDc', V.add(V.mid(d.LL[7], d.Z), [0.1, -0.25]));
    dw.setArrow('aAc', V.sub(d.H1, d.Ac), d.H1);
    dw.setArrow('aBc', V.sub(I, d.Bc), I);
    dw.setArrow('aCc', V.sub(Ip, d.Cc), Ip);
    dw.setArrow('aDc', V.sub(d.A1, d.Dc), d.A1);
    dw.setLabel('laAc', V.add(d.H1, [-0.6, 0.35]));
    dw.setLabel('laDc', V.add(d.A1, [0.65, 0.3]));

    // components: form
    const sgn = (v) => (v >= 0 ? 1 : -1);
    const hArr = (nm, at, sx) => dw.setArrow(nm, [at[0] - sx * s.sLS, at[1]], at);
    const vArr = (nm, at, sy) => dw.setArrow(nm, [at[0], at[1] - sy * s.sLS], at);
    hArr('aAHc', d.H1, sgn(d.Ac[0]));
    vArr('aAVc', d.H1, sgn(d.Ac[1]));
    hArr('aBH', I, sgn(d.Bc[0]));
    vArr('aBV', I, sgn(d.Bc[1]));
    hArr('aCH', Ip, sgn(d.Cc[0]));
    vArr('aCV', Ip, sgn(d.Cc[1]));
    hArr('aDHc', d.A1, sgn(d.Dc[0]));
    vArr('aDVc', d.A1, sgn(d.Dc[1]));
    dw.setLabel('laAHc', V.add(d.H1, [-0.75, -0.25]));
    dw.setLabel('laAVc', V.add(d.H1, [-0.3, 0.75]));
    dw.setLabel('laBH', V.add(I, [-0.65, -0.3]));
    dw.setLabel('laBV', V.add(I, [-0.1, -0.75]));
    dw.setLabel('laCH', V.add(Ip, [0.7, -0.3]));
    dw.setLabel('laCV', V.add(Ip, [0.15, -0.75]));
    dw.setLabel('laDHc', V.add(d.A1, [0.8, -0.2]));
    dw.setLabel('laDVc', V.add(d.A1, [0.3, 0.75]));

    // components: force-side dims + leaders
    const yTop = 5.79, yTop2 = 6.41, yBot = -0.31;
    const xV1 = d.P1[0] - s.offRF * 0.75, xV2 = d.P1[0] - s.offRF * 1.25;
    const xVt = d.O7[0] + s.offRF * 0.75;
    dw.setArrow('dAHc', [d.P1[0], yTop], [d.LL[0][0], yTop]);
    dw.setArrow('dBH', [d.LL[0][0], yTop2], [d.P1[0], yTop2]);
    dw.setArrow('dCH', [d.P1[0], yBot], [d.LL[0][0], yBot]);
    dw.setLabel('ldAHc', [(d.P1[0] + d.LL[0][0]) / 2 - 0.4, yTop + 0.28]);
    dw.setLabel('ldBH', [(d.P1[0] + d.LL[0][0]) / 2 - 0.35, yTop2 + 0.28]);
    dw.setLabel('ldCH', [(d.P1[0] + d.LL[0][0]) / 2 - 0.3, yBot - 0.3]);
    dw.setArrow('dAVc', [xV1, d.P1[1]], [xV1, d.LL[0][1]]);
    dw.setArrow('dDVc', [xV1, d.Z[1]], [xV1, d.LL[7][1]]);
    dw.setArrow('dBV', [xV2, d.LL[2][1]], [xV2, d.P1[1]]);
    dw.setArrow('dCV', [xV2, d.Z[1]], [xV2, d.LL[2][1]]);
    dw.setLabel('ldAVc', [xV1 + 0.15, (d.P1[1] + d.LL[0][1]) / 2 + 0.22]);
    dw.setLabel('ldDVc', [xV1 + 0.15, (d.Z[1] + d.LL[7][1]) / 2 - 0.22]);
    dw.setLabel('ldBV', [xV2 - 0.45, (d.LL[2][1] + d.P1[1]) / 2]);
    dw.setLabel('ldCV', [xV2 - 0.45, (d.Z[1] + d.LL[2][1]) / 2]);
    dw.setDashLine('lead0', [[xV2 - 0.2, d.P1[1]], [d.P1[0], d.P1[1]]]);
    dw.setDashLine('lead1', [[xV2 - 0.2, d.Z[1]], [d.Z[0], d.Z[1]]]);
    dw.setDashLine('lead2', [[xV2 - 0.2, d.LL[2][1]], [d.LL[2][0], d.LL[2][1]]]);
    dw.setDashLine('lead3', [[xV1 - 0.2, d.LL[0][1]], [d.LL[0][0], d.LL[0][1]]]);
    dw.setDashLine('lead4', [[xV1 - 0.2, d.LL[7][1]], [d.LL[7][0], d.LL[7][1]]]);
    dw.setDashLine('lead5', [[d.P1[0], yTop2 + 0.2], [d.P1[0], yBot - 0.2]]);

    // tension trial + pole
    dw.setDisk('pt_TT', s.T1);
    dw.setDisk('pt_TU', d.U1);
    dw.setStrokes('tfunT', pairs(d.trt));
    dw.setStrokes('traysT', d.LL.slice(0, 9).map((p) => [s.T1, p]));
    dw.setDashLine('tcloseT', [d.U1, d.trt[9]]);
    dw.setDashLine('tparT', [s.T1, ext(s.T1, d.J2, 0.3)]);
    dw.setDisk('pt_J2', d.J2);
    dw.setLabel('lbl_J2', [d.J2[0] - 0.5, d.J2[1] - 0.15]);
    dw.setDashLine('chordT', [d.H1, d.A1]);
    dw.setDisk('pt_O7', d.O7);
    dw.setLabel('lbl_O7', [d.O7[0] + 0.35, d.O7[1] + 0.15]);
    dw.setStrokes('raysT', d.LLo.map((p) => [d.O7, p]));
    dw.setDashLine('polT', [d.O7, d.P7]);

    // cable + tension reactions
    dw.setStrokes('cable', pairs(d.cable));
    dw.setArrow('fAt', d.O7, d.LLo[0]);
    dw.setArrow('fDt', d.LLo[8], d.O7);
    dw.setLabel('lfAt', V.add(V.mid(d.O7, d.LLo[0]), [0, 0.28]));
    dw.setLabel('lfDt', V.add(V.mid(d.LLo[8], d.O7), [0, -0.28]));
    dw.setArrow('aAt', V.sub(d.H1, d.At), d.H1);
    dw.setArrow('aDt', V.sub(d.A1, d.Dt), d.A1);
    dw.setLabel('laAt', V.add(d.H1, [-0.35, -0.6]));
    dw.setLabel('laDt', V.add(d.A1, [0.45, -0.55]));
    hArr('aAHt', d.H1, sgn(d.At[0]));
    hArr('aDHt', d.A1, sgn(d.Dt[0]));
    dw.setLabel('laAHt', V.add(d.H1, [0.8, 0.32]));
    dw.setLabel('laDHt', V.add(d.A1, [-0.85, 0.35]));
    vArr('aAVt', d.H1, sgn(d.At[1]));
    vArr('aDVt', d.A1, sgn(d.Dt[1]));
    dw.setLabel('laAVt', V.add(d.H1, [0.35, -1.0]));
    dw.setLabel('laDVt', V.add(d.A1, [-0.35, -1.0]));
    dw.setArrow('dAVt', [xVt, d.K2[1]], [xVt, d.LLo[0][1]]);
    dw.setArrow('dDVt', [xVt, d.LLo[8][1]], [xVt, d.K2[1]]);
    dw.setLabel('ldAVt', [xVt + 0.45, (d.K2[1] + d.LLo[0][1]) / 2]);
    dw.setLabel('ldDVt', [xVt + 0.45, (d.LLo[8][1] + d.K2[1]) / 2]);
    dw.setDashLine('lead6', [[d.O7[0], d.K2[1]], [xVt + 0.2, d.K2[1]]]);
    dw.setDashLine('lead7', [[d.LLo[0][0], d.LLo[0][1]], [xVt + 0.2, d.LLo[0][1]]]);

    // strut + bases
    dw.setSeg('strut', I, Ip);
    dw.setSeg('wallL', d.H1, A0);
    dw.setSeg('wallM', Ip, D0);
    dw.setDisk('pt_bA', A0);
    dw.setDisk('pt_bB', B0);
    dw.setDisk('pt_bD', D0);
    dw.setDisk('pt_bF', F0);
    dw.setArrow('aAV', [A0[0], A0[1] - s.sLS], A0);
    dw.setArrow('aBV', [B0[0], B0[1] - s.sLS], B0);
    dw.setArrow('aCV', [D0[0], D0[1] - s.sLS], D0);
    dw.setLabel('lbAV', [A0[0] + 0.35, A0[1] - s.sLS - 0.3]);
    dw.setLabel('lbBV', [B0[0] + 0.25, B0[1] - s.sLS - 0.3]);
    dw.setLabel('lbCV', [D0[0] + 0.25, D0[1] - s.sLS - 0.3]);
  }

  // ------------------------------------------------------------------
  // node inspector: 1-8 cable nodes, 9-11 arch-1 nodes, 12-16 arch-2,
  // 17 H_1, 18 A_1, 19 I, 20 I'
  // ------------------------------------------------------------------
  function nodeInfo() {
    const n = Math.round(s.node);
    const { LL, P1, Z, K2 } = d;
    if (n >= 1 && n <= 8) {
      const k = n - 1;
      return { pos: d.cable[n], title: `cable node ${n}`,
        sides: [[LL[k], LL[k + 1]], [LL[k + 1], K2], [K2, LL[k]]] };
    }
    if (n >= 9 && n <= 11) {
      const k = n - 9;
      return { pos: d.arch1[n - 8], title: `arch node ${n - 8}`,
        sides: [[LL[k], LL[k + 1]], [LL[k + 1], P1], [P1, LL[k]]] };
    }
    if (n >= 12 && n <= 16) {
      const k = n - 9;
      return { pos: d.arch2[n - 11], title: `arch node ${n - 8}`,
        sides: [[LL[k], LL[k + 1]], [LL[k + 1], Z], [Z, LL[k]]] };
    }
    if (n === 17) return { pos: d.H1, title: 'end H₁ (arch + cable)',
      sides: [[P1, LL[0]], [LL[0], K2], [K2, P1]] };
    if (n === 18) return { pos: d.A1, title: 'end A₁ (arch + cable)',
      sides: [[Z, LL[7]], [LL[7], K2], [K2, Z]] };
    if (n === 19) return { pos: I, title: 'column top I (strut = B_H)',
      sides: [[LL[2], P1], [P1, [LL[2][0], P1[1]]], [[LL[2][0], P1[1]], LL[2]]] };
    return { pos: Ip, title: 'column top I′ (strut = C_H)',
      sides: [[LL[2], Z], [Z, [LL[2][0], Z[1]]], [[LL[2][0], Z[1]], LL[2]]] };
  }

  function updateNode() {
    const n = Math.round(s.node);
    const info = nodeInfo();
    dw.selectDisk(n === 17 ? 'pt_H1' : n === 18 ? 'pt_A1'
      : n === 19 ? 'pt_I' : n === 20 ? 'pt_Ip' : null);
    dw.setNodeInspector(info.pos, 0.6, n > 0 ? info.title : '', info.sides);
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
  panel.slider(par, s, 'loadP', 'load per panel', 0.2, 2, 0.1, refresh);
  panel.slider(par, s, 'factorH', 'factor_H (H = 8.2·factor)', 0.5, 1, 0.05, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram', 0.1, 2, 0.1, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 0.1, 2, 0.1, refresh);
  panel.slider(par, s, 'off', 'offset (tension diagram)', 0, 1, 0.05, refresh);
  panel.slider(par, s, 'offRF', 'offset reaction forces', 0, 1.5, 0.05, refresh);
  panel.toggle(par, s, 'img', 'show image (section sketch)', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node',
               'node (0 = off, 1–8 cable, 9–16 arches, 17/18 ends, 19/20 column tops)',
               0, 20, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS, LL8: [...DEFAULTS.LL8], I1: [...DEFAULTS.I1],
                       L: [...DEFAULTS.L], T1: [...DEFAULTS.T1] });
    panel.syncAll();
    refresh();
  });

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const hits = [
    ['H1', () => d.H1, 1, 99], ['A1', () => d.A1, 1, 99],
    ['LL8', () => d.LL[0], 2, 99], ['N', () => d.N, 2, 99],
    ['I1', () => s.I1, 3, TR_END], ['J1', () => d.J1, 3, TR_END],
    ['L', () => s.L, 4, TR_END], ['M', () => d.M, 4, TR_END],
    ['T1', () => s.T1, 9, TT_END], ['U1', () => d.U1, 9, TT_END],
  ];
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
      if (name === 'H1') s.yH1 = clamp(wy, RAIL_END[0], RAIL_END[1]);
      else if (name === 'A1') s.yA1 = clamp(wy, RAIL_END[0], RAIL_END[1]);
      else if (name === 'LL8') s.LL8 = [clamp(wx, 14.5, 19), clamp(wy, 3.4, 5.6)];
      else if (name === 'N') s.yN = clamp(wy, -3.3, -1.2);
      else if (name === 'I1') s.I1 = [clamp(wx, 12, 16), clamp(wy, 1.5, 5.4)];
      else if (name === 'J1') s.yJ1 = clamp(wy, 2.6, 5.4);
      else if (name === 'L') s.L = [clamp(wx, 12, 16), clamp(wy, 0.5, 4.2)];
      else if (name === 'M') s.yM = clamp(wy, 2.6, 5.4);
      else if (name === 'T1') s.T1 = [clamp(wx, 19.6, 24.5), clamp(wy, 1.5, 5.4)];
      else if (name === 'U1') s.yU1 = clamp(wy, 2.6, 5.6);
      refresh();
    },
  );

  // click a node to inspect it
  const nodeAt = [];
  for (let n = 1; n <= 20; n++) {
    nodeAt.push({ at: () => {
      if (n <= 8) return d.cable[n];
      if (n <= 11) return d.arch1[n - 8];
      if (n <= 16) return d.arch2[n - 11];
      if (n === 17) return d.H1;
      if (n === 18) return d.A1;
      return n === 19 ? I : Ip;
    } });
  }
  dw.nodeSelect(nodeAt, (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
