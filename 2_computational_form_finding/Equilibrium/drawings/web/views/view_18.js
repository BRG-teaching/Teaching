/**
 * Drawing view/18 "Salginatobel Bridge"
 * (https://block.arch.ethz.ch/eq/drawing/view/18) as a step-by-step
 * construction, following the ORIGINAL applet's own staging (its step slider
 * 0-9, decoded element by element from applet_0/geogebra.xml + the live
 * applet's per-step visibility):
 *
 *   applet 1     -> our 1      site: green deck strip g, 30 dotted strip
 *                              lines + dotted crown line + dashed wall lines
 *                              (all full height, y 5.7726 .. -1.5587),
 *                              hinges A, D, B
 *   applet 2     -> our 2-4    the deck weight as ONE resultant Rg on the
 *                              crown line; its one-kink funicular A-X-B
 *                              (X = (5, 2*dy)) + closing line A-B; parallels
 *                              through the load-line ends give the pole o2;
 *                              fan + the 31-sided funicular of g
 *   applet 3     -> our 5      resolve: THE PHOTOGRAPH of the built bridge
 *                              (the applet's embedded image, 20% opacity,
 *                              anchored (-0.7,-1.74)/(10.7,-1.74)/(-0.7,3.07))
 *                              + reactions A, B on the outer rays and thrusts
 *                              into the springings
 *   applet 4     -> our 6-7    TWO LOADS: half-deck resultants Q1 = Q2 on the
 *                              quarter lines, hinge chords extended to D3/E3,
 *                              mini force diagram -> pole o1, the trapezoid
 *                              funicular A-O-P-B through the same hinges
 *   applet 5     -> our 8      resolve two-load version (reactions)
 *   applet 6     -> our 9      ONE EXTRA LOAD Q on strip pQ; Q-alone chords
 *                              A-B7-B (grey dashed); Q's mini diagram -> o3
 *   applet 7     -> our 10     Q folds into the load line: Rg + Q; the no-Q
 *                              force diagram retires (as in the applet)
 *   applet 8     -> our 11-14  trial pole o' + hanging trial funicular wall
 *                              to wall; closings N-Z, Z-W -> parallels through
 *                              o' cut the load line at i1, i2; crown chords
 *                              A-D, D-B -> parallels through i1, i2 meet at
 *                              the final pole o; fan + the arch under Q
 *   applet 9     -> our 15     resolve: trial + no-Q constructions retire
 *                              exactly like the applet (bounding geometry
 *                              toggle brings the no-Q funiculars back),
 *                              reactions close the polygon
 *
 * The applet's checkboxes are ported with their defaults: hide reaction
 * forces (false), show bounding geometry (false), show points funicular
 * (o_2, false -- grey dots on the trial funicular), show handles (false),
 * plus our photo toggle. The whole chain is regression-checked against the
 * baked view_18_compas.py coordinates (~4e-7).
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 18 — Salginatobel Bridge',
  subtitle: 'a three-hinged arch as a funicular polygon, found through the hinges and re-found under a moving load',
  about: 'Maillart\'s Salginatobel bridge as a three-hinged funicular arch, drawn over the photograph of the built bridge. The deck weight, first as one resultant, then as two half-deck resultants and finally as 30 strips, is hung from poles found with the chords of the three hinges A, D, B. An extra load Q on any strip re-poses the problem: a trial funicular locates the crown crossing, the crown chords give the new pole, and the arch changes shape under the moving load.',
  frame: [[-0.497, -2.159], [16.838, 6.509]],
};

const A = [0.5, 0], B = [9.5, 0];        // springing hinges
const YD = 3.7343636612798607;           // deck strip top edge
const YH = 3.443842429204005;            // deck strip bottom edge
const AREA = (YD - YH) * 4.5;            // half-deck area (its weight)
const XQ = [2.75, 7.25];                 // quarter lines
const SYM = [4.278485577372805, 3.7784855773728054];  // load-symbol band
const GT = 5.7726, GB = -1.5587;         // guide-line extent (from the applet)
const LS = 0.5;                          // loadSymbol
const UP = [0, 1];
const N_STRIP = 30;
const RESOLVE = 16;                      // trial + no-Q constructions retire here

// the applet's embedded photo: corners Q10/S10/R10, opacity 0.2
const PHOTO = { bl: [-0.7, -1.74], br: [10.7, -1.74], tl: [-0.7, 3.07] };

const DEFAULTS = {
  dy: 1.3498642813929091,                // crown hinge D on x = 5
  ox: 14, oy: 4,                         // load line start (no-Q and with-Q)
  cx: 12, cy: 5.7,                       // mini force diagrams anchor (C5/D7)
  mx: 16.306518692334002, my: 1.9650250871004993,   // trial pole o'
  ny: 5.653926166228851,                 // trial start N on the left wall
  g: 0.1,                                // g [0.1, 1]
  o1: true, sIF: 0.05,                   // internal-force pipes on the final arch
  fQ: 4,                                 // factor_Q [1, 5]
  pQ: 8,                                 // positionQ [1, 30] (strip carrying Q)
  sFD: 1.3,                              // scaleForceDiagram [0.5, 2]
  node: 0,                               // node-equilibrium inspector (0 = off)
  hideRF: false,                         // applet checkbox
  sbg: false,                            // applet checkbox "show bounding geometry"
  o2: false,                             // applet checkbox "show points funicular"
  sh: false,                             // applet checkbox "show handles"
  ph: true,                              // the photograph of the built bridge
  n4: true,
  _k: 99,
};

// every construction move happens on BOTH sides at once
const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The site: deck, hinges, strips', d: 'left: the deck (load g, green) spans the gorge on a grid of 30 strips; the arch must pass through the springing hinges A, B and the crown hinge D (drag D!)' },
  { t: 'The deck weight Rg', d: 'left: the whole deck weighs Rg, acting on the crown line — right: the load line Rg, the 30 strip weights stacked' },
  { t: 'One load: chords through the hinges', d: 'left: if Rg acted alone, its funicular A–X–B would kink on the crown line (dashed), closing line A–B — right: parallels through the load-line ends meet at the pole o₂, the closing line\'s parallel splits the load line' },
  { t: 'The fan and the arch of g', d: 'right: rays from o₂ to every strip weight — left: from A, one side parallel to each ray: a 31-sided funicular through D, exactly onto B' },
  { t: 'The built bridge', d: 'behind: the photograph of the built bridge — Maillart\'s arch is exactly this funicular — right: the reactions A and B close the polygon' },
  { t: 'Two loads: Q₁ and Q₂', d: 'left: the same deck as two half-deck resultants Q₁ = Q₂ on the quarter lines; the hinge chords, extended, are dashed — right: Q₁ and Q₂ stacked on a small load line' },
  { t: 'The pole o₁ and the trapezoid', d: 'right: parallels to the chords (dashed) give the pole o₁ — left: the three-sided funicular A–O–P–B through the same three hinges' },
  { t: 'Same arch, coarser division', d: 'right: reactions A and B of the two-load polygon — left: the trapezoid touches the fine arch on the crown line: the same funicular, coarser division' },
  { t: 'An extra load Q', d: 'left: a point load Q = factor·g on one strip (drag it along the deck!); alone it would need the dashed funicular A–B₇–B — right: Q on its own small load line with pole o₃' },
  { t: 'Q joins the load line', d: 'right: Q slots into the full load line at its strip (thick green): Rg + Q — the old pole no longer balances it, so the whole force diagram is redone' },
  { t: 'Trial pole o′ and trial funicular', d: 'right: any trial pole o′ with rays to the new load line — left: the trial funicular hangs wall to wall, one side per strip' },
  { t: 'Crown crossing → i₁ and i₂', d: 'left: the trial crosses the walls at N, W and the crown line at Z: closing chords N–Z and Z–W (dashed) — right: their parallels through o′ cut the load line at i₁ and i₂' },
  { t: 'Crown chords → the pole o', d: 'left: the crown chords A–D and D–B (dashed) — right: through i₁ parallel to A–D and through i₂ parallel to D–B: the final pole o' },
  { t: 'The arch under Q', d: 'right: the fan from o — left: from A, side by side, the funicular of Rg + Q: through D, onto B, but reshaped by Q' },
  { t: 'Reactions', d: 'right: the polygon closes on the outer rays: A = from o back to the top, B = from the bottom up to o — left: the thrusts push into the springings' },
  { t: 'Compression', d: 'the trial and no-Q constructions step back exactly like the applet ("show bounding geometry" brings them back) — the arch under Q resolves blue = compression (the pipes show it); drag Q, D, o′ or the sliders',
    detail: (d, st) => [`A = ${d.RA.toFixed(2)} · B = ${d.RB.toFixed(2)} kN — live load Q = ${(st.fQ * st.g).toFixed(2)} kN`],
    take: 'the moving load Q re-poses the whole problem — drag it and watch the arch change shape under it' },
];

const cache = {};
function inter(key, p1, d1, p2, d2) {
  cache[key] = V.intersect(p1, d1, p2, d2) || cache[key] || p1;
  return cache[key];
}

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const D = [5, s.dy];
  const stripX = [];                                    // strip boundary verticals
  for (let k = 0; k < N_STRIP; k++) stripX.push(0.65 + 0.3 * k);

  // ---- the deck weight as ONE resultant Rg (applet step 2) ----
  // its one-kink funicular through the hinges: A - X - B with X on the crown
  // line at twice the crown rise (chords A-X and X-B pass the quarter lines
  // at the height of D)
  const X15 = [5, 2 * s.dy];
  const wQ = AREA * s.sFD;                              // load line total / 2
  const L1 = [s.ox, s.oy];
  const M1 = [L1[0], L1[1] - wQ];                       // load line midpoint
  const P1 = [M1[0], M1[1] - wQ];
  // pole o2: parallels to A-X through L1 and to X-B through P1 (the applet's
  // visible construction; identical to the baked chord chain)
  const M2 = inter('M2', L1, V.sub(X15, A), P1, V.sub(B, X15));
  const pts = [];
  for (let k = 0; k <= N_STRIP; k++) pts.push(V.add(L1, V.mul(V.sub(P1, L1), k / N_STRIP)));
  const arch1 = [A];
  let p = A;
  for (let k = 0; k < N_STRIP; k++) {
    p = inter(`a1_${k}`, p, V.sub(pts[k], M2), [stripX[k], 0], UP);
    arch1.push(p);
  }
  arch1.push(B);

  // ---- two half-deck resultants Q1, Q2 (applet step 4) ----
  // chords of the hinges extended to the quarter lines
  const D3 = inter('D3', B, V.sub(D, B), [XQ[0], 0], UP);
  const E3 = inter('E3', A, V.sub(D, A), [XQ[1], 0], UP);
  // schematic mini force diagram at C5 (loads drawn loadSymbol long)
  const C5 = [s.cx, s.cy];
  const wS = LS * s.sFD;
  const J5 = [C5[0], C5[1] - wS];
  const K5 = [J5[0], J5[1] - wS];
  const L5 = inter('L5', C5, V.sub(A, D3), J5, V.sub(B, D));
  const M5 = inter('M5', J5, V.sub(D, A), K5, V.sub(B, E3));
  const N5 = inter('N5', L5, V.sub(D, A), M5, V.sub(B, D));   // pole o1
  const O5 = inter('O5', A, V.sub(C5, N5), [XQ[0], 0], UP);
  const P5 = inter('P5', O5, V.sub(J5, N5), [XQ[1], 0], UP);

  // ---- the extra load Q on strip pQ (applet step 6) ----
  const w = wQ / 15;                                    // one strip on the line
  const tQ = s.fQ * s.g * s.sFD;
  const xU = 0.5 + 0.3 * (s.pQ - 0.5);                  // Q's line of action
  const B7 = xU < 5 ? inter('B7a', B, V.sub(D, B), [xU, 0], UP)
                    : inter('B7b', A, V.sub(D, A), [xU, 0], UP);
  const D7 = C5;                                        // Q's mini diagram anchor
  const W14 = [D7[0], D7[1] - tQ];
  const G7 = inter('G7', D7, V.sub(B7, A), W14, V.sub(B, B7));  // pole o3

  // ---- the load line with Q folded in (applet step 7) ----
  const pts2 = [[s.ox, s.oy]];
  let y = s.oy;
  for (let k = 1; k <= N_STRIP; k++) {
    y -= w + (k === s.pQ ? tQ : 0);
    pts2.push([s.ox, y]);
  }
  const O7 = pts2[0], Q7 = pts2[N_STRIP];

  // ---- trial funicular from N with pole o' = M (applet step 8) ----
  const M = [s.mx, s.my];
  const Nt = [0.5, s.ny];
  const trial = [Nt];
  p = Nt;
  for (let k = 0; k < N_STRIP; k++) {
    p = inter(`t_${k}`, p, V.sub(pts2[k], M), [stripX[k], 0], UP);
    trial.push(p);
  }
  const W8 = inter('W8', p, V.sub(pts2[N_STRIP], M), [9.5, 0], UP);
  trial.push(W8);
  // crown crossing
  let Z8 = [5, s.ny];
  for (let i = 0; i < trial.length - 1; i++) {
    const a = trial[i], b = trial[i + 1];
    if ((a[0] - 5) * (b[0] - 5) <= 0 && b[0] > a[0]) {
      Z8 = inter('Z8', a, V.sub(b, a), [5, 0], UP);
      break;
    }
  }
  // division points i1, i2 and the final pole o
  const B9 = inter('B9', M, V.sub(Z8, Nt), O7, UP);     // i1 (upper)
  const A9 = inter('A9', M, V.sub(W8, Z8), O7, UP);     // i2 (lower)
  const C9 = inter('C9', B9, V.sub(D, A), A9, V.sub(B, D));    // final pole o

  // ---- the final funicular ----
  const arch2 = [A];
  p = A;
  for (let k = 0; k < N_STRIP; k++) {
    p = inter(`h_${k}`, p, V.sub(pts2[k], C9), [stripX[k], 0], UP);
    arch2.push(p);
  }
  arch2.push(B);

  const col = (w2) => (V.isCompression(w2) ? PAL.blue : PAL.red);
  const cA = col(V.ggbAngle(V.sub(arch2[1], A), V.sub(C9, O7)));

  const RA = V.dist(C9, O7) / s.sFD;
  const RB = V.dist(Q7, C9) / s.sFD;

  return { D, stripX, X15, wQ, tQ, xU, L1, M1, P1, M2, pts, arch1,
           D3, E3, C5, J5, K5, L5, M5, N5, O5, P5,
           B7, D7, W14, G7, pts2, O7, Q7, M, Nt, trial, W8, Z8, B9, A9, C9,
           arch2, cA, RA, RB };
}

const pairs = (poly) => poly.slice(0, -1).map((p, i) => [p, poly[i + 1]]);

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);

  const memberColor = { pending: PAL.black, final: (dd) => dd.cA };
  const W_BAR = 0.055, W_RAY = 0.016, W_STR = 0.035;
  const ARROW = { w: 0.07, headLen: 0.24, headW: 0.09 };
  const early = (st) => st._k < RESOLVE || st.sbg;      // "show bounding geometry"
  const phw = (st) => st.ph;
  const rfw = (st) => !st.hideRF;

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // ------------------------------------------------------------------
  // step 1 -- site (all of it exactly as the applet draws it, full height)
  // ------------------------------------------------------------------
  dw.poly('deckF', 4, { intro: 1, opacity: 0.1, color: PAL.green, flash: false });
  dw.strokes('deck', 4, { intro: 1, w: 0.018, color: PAL.green });
  dw.label('lg', 'g', { intro: 1, color: PAL.green, flash: false });
  for (let i = 0; i < N_STRIP; i++) {
    dw.dashLine(`strip${i}`, { intro: 1, dash: 0.035, color: 0xcfcfcf, flash: false });
  }
  dw.dashLine('crownG', { intro: 1, dash: 0.05, color: 0x777777 });
  dw.dashLine('wallL', { intro: 1, dash: 0.14, color: 0x444444 });
  dw.dashLine('wallR', { intro: 1, dash: 0.14, color: 0x444444 });

  // the photograph of the built bridge (applet pic3: first shown at the
  // first resolved step; 20% opacity, far behind the drawing)
  dw.image('photo', 'assets/view_18_photo.png',
           { corners: [PHOTO.bl, PHOTO.br, PHOTO.tl], opacity: 0.2, intro: 5, when: phw });

  // ------------------------------------------------------------------
  // steps 2-5 -- the deck weight Rg: one-kink funicular -> pole o2 -> arch of g
  // ------------------------------------------------------------------
  dw.dashArrow('resRg', { intro: 2, outro: 5, ...ARROW, dash: 0.12 });
  dw.label('lRg', 'Rg', { intro: 2, outro: 5, color: PAL.green });
  dw.arrow('edgeG', { intro: 2, outro: 10, ...ARROW });
  dw.label('lRgF', 'Rg', { intro: 2, outro: 10, color: PAL.green });

  dw.dashLine('ch1a', { intro: 3, outro: 5, dash: 0.12, color: PAL.black });
  dw.dashLine('ch1b', { intro: 3, outro: 5, dash: 0.12, color: PAL.black });
  dw.dashLine('clAB', { intro: 3, outro: 5, dash: 0.2, color: PAL.black });
  dw.dashLine('par1a', { intro: 3, outro: 10, dash: 0.12 });
  dw.dashLine('par1b', { intro: 3, outro: 10, dash: 0.12 });
  dw.dashLine('clPar', { intro: 3, outro: 5, dash: 0.2, color: PAL.black });

  dw.strokes('fanG', N_STRIP - 1, { intro: 4, outro: 10, w: W_RAY, color: PAL.grey });
  dw.seg('orayG0', { intro: 4, outro: 10, w: 0.028, color: PAL.grey });
  dw.seg('orayG1', { intro: 4, outro: 10, w: 0.028, color: PAL.grey });
  dw.strokes('archG', N_STRIP + 1, { intro: 4, w: W_STR, color: PAL.black, when: early });

  dw.arrow('reacGAf', { intro: 5, outro: 10, ...ARROW, when: rfw });
  dw.arrow('reacGBf', { intro: 5, outro: 10, ...ARROW, when: rfw });
  dw.arrow('reacGA', { intro: 5, outro: 10, ...ARROW });
  dw.arrow('reacGB', { intro: 5, outro: 10, ...ARROW });
  dw.label('lGA', 'A', { intro: 5, outro: 10, color: PAL.green, when: rfw });
  dw.label('lGB', 'B', { intro: 5, outro: 10, color: PAL.green, when: rfw });
  dw.label('lGA2', 'A', { intro: 5, outro: 10, color: PAL.green });
  dw.label('lGB2', 'B', { intro: 5, outro: 10, color: PAL.green });

  // ------------------------------------------------------------------
  // steps 6-8 -- two loads Q1, Q2: hinge chords -> pole o1 -> trapezoid
  // ------------------------------------------------------------------
  dw.dashLine('qline0', { intro: 6, outro: 9, dash: 0.05, color: 0xbbbbbb });
  dw.dashLine('qline1', { intro: 6, outro: 9, dash: 0.05, color: 0xbbbbbb });
  dw.arrow('resQ1', { intro: 6, outro: 9, ...ARROW });
  dw.arrow('resQ2', { intro: 6, outro: 9, ...ARROW });
  dw.label('lQ1', 'Q₁', { intro: 6, outro: 9, color: PAL.green });
  dw.label('lQ2', 'Q₂', { intro: 6, outro: 9, color: PAL.green });
  dw.dashLine('ch2a', { intro: 6, outro: 8, dash: 0.12, color: PAL.black });  // B-D -> D3
  dw.dashLine('ch2b', { intro: 6, outro: 8, dash: 0.12, color: PAL.black });  // A-D -> E3
  dw.dashLine('ch2c', { intro: 6, outro: 8, dash: 0.12, color: PAL.black });  // D3-A
  dw.dashLine('ch2d', { intro: 6, outro: 8, dash: 0.12, color: PAL.black });  // E3-B
  dw.arrow('edge2a', { intro: 6, outro: 9, ...ARROW });
  dw.arrow('edge2b', { intro: 6, outro: 9, ...ARROW });
  dw.label('lQ1f', 'Q₁', { intro: 6, outro: 9, color: PAL.green });
  dw.label('lQ2f', 'Q₂', { intro: 6, outro: 9, color: PAL.green });

  for (let i = 0; i < 6; i++) dw.dashLine(`mpar${i}`, { intro: 7, outro: 8, dash: 0.1 });
  dw.seg('oray2a', { intro: 7, outro: 9, w: 0.025, color: PAL.grey });
  dw.seg('oray2b', { intro: 7, outro: 9, w: 0.025, color: PAL.grey });
  dw.strokes('archC', 3, { intro: 7, w: W_STR, color: PAL.black, when: early });

  dw.arrow('reacCAf', { intro: 8, outro: 9, ...ARROW, when: rfw });
  dw.arrow('reacCBf', { intro: 8, outro: 9, ...ARROW, when: rfw });
  dw.label('lCA', 'A', { intro: 8, outro: 9, color: PAL.green, when: rfw });
  dw.label('lCB', 'B', { intro: 8, outro: 9, color: PAL.green, when: rfw });

  // ------------------------------------------------------------------
  // step 9 -- the extra load Q (Q-alone chords + mini diagram -> pole o3)
  // ------------------------------------------------------------------
  // the applet's Q system is ORANGE whenever visible (z_5 dynamic color,
  // h_20, the positionQ strip on the load line) — not green/blue
  dw.arrow('loadQ', { intro: 9, ...ARROW, w: 0.085, headLen: 0.28, headW: 0.11, color: PAL.green });
  dw.label('lQ', 'Q', { intro: 9, color: PAL.green });
  dw.dashLine('qloa', { intro: 9, dash: 0.05, color: 0x999999 });
  dw.dashLine('qch0', { intro: 9, outro: 10, dash: 0.12 });
  dw.dashLine('qch1', { intro: 9, outro: 10, dash: 0.12 });
  dw.arrow('qedge', { intro: 9, outro: RESOLVE, ...ARROW });
  dw.label('lQf', 'Q', { intro: 9, outro: RESOLVE, color: PAL.green });
  dw.seg('qray0', { intro: 9, outro: RESOLVE, w: 0.02, color: PAL.grey });
  dw.seg('qray1', { intro: 9, outro: RESOLVE, w: 0.02, color: PAL.grey });

  // ------------------------------------------------------------------
  // step 10 -- Q joins the load line: Rg + Q
  // ------------------------------------------------------------------
  dw.arrow('edgeQa', { intro: 10, ...ARROW });
  dw.arrow('edgeQb', { intro: 10, ...ARROW });
  dw.seg('segQ', { intro: 10, w: 0.09, color: PAL.green });
  dw.label('lQl', 'Q', { intro: 10, color: PAL.green });
  dw.label('lRgQ', 'Rg + Q', { intro: 10, color: PAL.green });
  dw.highlight('loadQ', [10]);

  // ------------------------------------------------------------------
  // steps 11-14 -- trial funicular -> i1, i2 -> crown chords -> pole o -> arch
  // ------------------------------------------------------------------
  dw.strokes('tfan', N_STRIP + 1, { intro: 11, outro: RESOLVE, w: W_RAY, color: PAL.grey });
  dw.strokes('tfun', N_STRIP + 1, { intro: 11, outro: RESOLVE, w: 0.025, color: PAL.grey });
  dw.dashLine('tcl0', { intro: 12, outro: RESOLVE, dash: 0.14 });
  dw.dashLine('tcl1', { intro: 12, outro: RESOLVE, dash: 0.14 });
  dw.dashLine('tpar0', { intro: 12, outro: RESOLVE, dash: 0.14 });
  dw.dashLine('tpar1', { intro: 12, outro: RESOLVE, dash: 0.14 });

  dw.dashLine('kch0', { intro: 13, outro: RESOLVE, dash: 0.14, color: PAL.black });
  dw.dashLine('kch1', { intro: 13, outro: RESOLVE, dash: 0.14, color: PAL.black });
  dw.dashLine('kpar0', { intro: 13, outro: RESOLVE, dash: 0.14, color: PAL.black });
  dw.dashLine('kpar1', { intro: 13, outro: RESOLVE, dash: 0.14, color: PAL.black });

  dw.strokes('fan3', N_STRIP - 1, { intro: 14, w: W_RAY, color: PAL.grey });
  dw.seg('oray3a', { intro: 14, w: 0.028, color: PAL.grey });
  dw.seg('oray3b', { intro: 14, w: 0.028, color: PAL.grey });
  dw.strokes('arch2', N_STRIP + 1, { intro: 14, w: W_BAR, color: PAL.blue });
  // internal-force pipes: each arch piece thickened by its o-ray force
  for (let k = 0; k <= N_STRIP; k++) {
    dw.poly(`if${k}`, 4, { intro: 14, opacity: 1.0, z: -0.18, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd.cA }, when: (st) => st.o1 });
  }

  // step 15 -- reactions ON the outer rays + thrusts (applet 9); the trial
  // and no-Q constructions retire at 16 (RESOLVE)
  dw.arrow('reacAf', { intro: 15, ...ARROW, when: rfw });
  dw.arrow('reacBf', { intro: 15, ...ARROW, when: rfw });
  dw.arrow('reacA', { intro: 15, ...ARROW });
  dw.arrow('reacB', { intro: 15, ...ARROW });
  dw.label('lRA', 'A', { intro: 15, color: PAL.green, when: rfw });
  dw.label('lRB', 'B', { intro: 15, color: PAL.green, when: rfw });
  dw.label('lRA2', 'A', { intro: 15, color: PAL.green });
  dw.label('lRB2', 'B', { intro: 15, color: PAL.green });

  // ------------------------------------------------------------------
  // points
  // ------------------------------------------------------------------
  const HANDLE = { r: 0.085 }, DERIVED = { r: 0.065 };
  const show = (st) => st.n4;
  dw.disk('pt_A', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_B', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_D', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_X15', { intro: 3, outro: 5, ...DERIVED, when: show });
  dw.disk('pt_M2', { intro: 3, outro: 10, ...DERIVED, when: show });
  dw.disk('pt_O', { intro: 2, ...HANDLE, when: show });
  dw.disk('pt_D3', { intro: 6, outro: 8, ...DERIVED, when: show });
  dw.disk('pt_E3', { intro: 6, outro: 8, ...DERIVED, when: show });
  dw.disk('pt_C5', { intro: 6, outro: RESOLVE, ...HANDLE, when: show });
  dw.disk('pt_N5', { intro: 7, outro: 9, ...DERIVED, when: show });
  dw.disk('pt_B7', { intro: 9, outro: 10, ...DERIVED, when: show });
  dw.disk('pt_G7', { intro: 9, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_M', { intro: 11, outro: RESOLVE, ...HANDLE, when: show });
  dw.disk('pt_N', { intro: 11, outro: RESOLVE, ...HANDLE, when: show });
  dw.disk('pt_Z8', { intro: 12, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_B9', { intro: 12, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_A9', { intro: 12, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_C9', { intro: 13, ...DERIVED, when: show });

  const letters = {
    A: ['A', 1], B: ['B', 1], D: ['D', 1],
    X15: ['X', 3, 5], M2: ['o₂', 3, 10],
    D3: ['D₃', 6, 8], E3: ['E₃', 6, 8], N5: ['o₁', 7, 9],
    B7: ['B₇', 9, 10], G7: ['o₃', 9, RESOLVE],
    M: ['o′', 11, RESOLVE], N: ['N', 11, RESOLVE], Z8: ['Z', 12, RESOLVE],
    B9: ['i₁', 12, RESOLVE], A9: ['i₂', 12, RESOLVE], C9: ['o', 13],
  };
  for (const [pn, [text, intro, outro]] of Object.entries(letters)) {
    dw.label(`lbl_${pn}`, text, { cls: 'point', intro, outro, when: show });
  }

  // "show points funicular" (the applet's hidden o_2 checkbox): grey dots on
  // the trial funicular's vertices, visible at any step while checked
  const o2w = (st) => st.o2;
  for (let i = 0; i < N_STRIP + 2; i++) {
    dw.disk(`fp${i}`, { r: 0.032, face: 0xa0a0a0, edge: 0xa0a0a0, when: o2w });
  }

  // "show handles" (the applet's hidden checkbox): rings on the drag handles
  const HR = 0.17;
  dw.dashedCircle('hnD', { when: (st) => st.sh, dash: 0.07 });
  dw.dashedCircle('hnO', { when: (st) => st.sh && st._k >= 2, dash: 0.07 });
  dw.dashedCircle('hnC5', { when: (st) => st.sh && st._k >= 6 && st._k < RESOLVE, dash: 0.07 });
  dw.dashedCircle('hnQ', { when: (st) => st.sh && st._k >= 9, dash: 0.07 });
  dw.dashedCircle('hnM', { when: (st) => st.sh && st._k >= 11 && st._k < RESOLVE, dash: 0.07 });
  dw.dashedCircle('hnN', { when: (st) => st.sh && st._k >= 11 && st._k < RESOLVE, dash: 0.07 });

  // readouts
  for (let i = 0; i < 3; i++) {
    dw.label(`ro${i}`, '', { intro: RESOLVE, flash: false,
              color: PAL.green });
  }

  // node-equilibrium inspector (free-body star + tip-to-tail sub-polygon)
  dw.nodeInspector(3, { when: (st) => st.node > 0, w: 1.5 * W_BAR, headLen: 0.28, headW: 0.11, r: 0.095 });

  // dual pairs (hovering a form member highlights its force twin)
  dw.link('resRg', 'lRg', 'edgeG', 'lRgF');
  dw.link('ch1a', 'par1a');
  dw.link('ch1b', 'par1b');
  dw.link('clAB', 'clPar');
  dw.link('archG', 'fanG', 'orayG0', 'orayG1');
  dw.link('resQ1', 'edge2a', 'lQ1', 'lQ1f');
  dw.link('resQ2', 'edge2b', 'lQ2', 'lQ2f');
  dw.link('ch2a', 'mpar0');
  dw.link('ch2b', 'mpar2');
  dw.link('archC', 'oray2a', 'oray2b');
  dw.link('loadQ', 'qedge', 'lQ', 'lQf', 'segQ', 'lQl');
  dw.link('qch0', 'qray0');
  dw.link('qch1', 'qray1');
  dw.link('tfun', 'tfan');
  dw.link('tcl0', 'tpar0');
  dw.link('tcl1', 'tpar1');
  dw.link('kch0', 'kpar0');
  dw.link('kch1', 'kpar1');
  dw.link('arch2', 'fan3', 'oray3a', 'oray3b');
  dw.link('reacA', 'reacAf', 'lRA', 'lRA2');
  dw.link('reacB', 'reacBf', 'lRB', 'lRB2');
  // edgeG retires at step 10 (outroed elements stay out of the ghost);
  // fan3 + the two outer rays are the pole fan that persists to the end
  dw.ghostable('edgeQa', 'edgeQb', 'segQ', 'reacAf', 'reacBf',
               'fan3', 'oray3a', 'oray3b');

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  // the visible reaction arrows lie exactly ON the outer rays of the final
  // fan (as in the applet); nodePoly() below reuses the same coordinates so
  // the inspector's reaction highlight lands exactly on the drawn arrows
  const reacSide = (a, b) => [a, b];

  function update() {
    dw.setLabel('form_title', [1.6, 6.15]);
    dw.setLabel('force_title', [11.3, 6.15]);
    dw.setLabel('force_sub', [15.55, 6.15]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(2)} kN`);

    // site (full-height guide grid, exactly the applet's extents)
    dw.setPoly('deckF', [[0.5, YD], [9.5, YD], [9.5, YH], [0.5, YH]]);
    dw.setStrokes('deck', [[[0.5, YD], [9.5, YD]], [[0.5, YH], [9.5, YH]],
                           [[0.5, YD], [0.5, YH]], [[9.5, YD], [9.5, YH]]]);
    dw.setLabel('lg', [0.14, (YD + YH) / 2]);
    for (let i = 0; i < N_STRIP; i++) {
      const x = d.stripX[i];
      dw.setDashLine(`strip${i}`, [[x, GT], [x, GB]]);
    }
    dw.setDashLine('crownG', [[5, GT], [5, GB]]);
    dw.setDashLine('wallL', [[0.5, GT], [0.5, GB]]);
    dw.setDashLine('wallR', [[9.5, GT], [9.5, GB]]);

    // Rg: resultant on the crown line + the no-Q load line
    const rg0 = [5, YH - 0.2], rg1 = [5, YH - 0.2 - 2 * LS];
    dw.setDashArrow('resRg', rg0, rg1);
    dw.setLabel('lRg', [5.34, YH - 0.48]);
    dw.setArrow('edgeG', d.L1, d.P1);
    dw.setLabel('lRgF', [d.L1[0] + 0.38, (d.L1[1] + d.P1[1]) / 2]);

    // one-load funicular chords + pole o2
    dw.setDashLine('ch1a', [A, d.X15]);
    dw.setDashLine('ch1b', [d.X15, B]);
    dw.setDashLine('clAB', [A, B]);
    dw.setDashLine('par1a', [d.L1, V.add(d.M2, V.mul(V.sub(d.M2, d.L1), 0.06))]);
    dw.setDashLine('par1b', [d.P1, V.add(d.M2, V.mul(V.sub(d.M2, d.P1), 0.06))]);
    dw.setDashLine('clPar', [d.M1, d.M2]);

    // fan of o2 + the arch of g
    dw.setStrokes('fanG', d.pts.slice(1, N_STRIP).map((pt) => [d.M2, pt]));
    dw.setSeg('orayG0', d.M2, d.L1);
    dw.setSeg('orayG1', d.M2, d.P1);
    dw.setStrokes('archG', pairs(d.arch1));

    // no-Q reactions: ON the outer rays + thrusts into the springings
    dw.setArrow('reacGAf', d.M2, d.L1);
    dw.setArrow('reacGBf', d.P1, d.M2);
    dw.setLabel('lGA', V.add(V.mid(d.M2, d.L1), [-0.1, 0.32]));
    dw.setLabel('lGB', V.add(V.mid(d.P1, d.M2), [-0.1, -0.34]));
    const uGA = V.unit(V.sub(d.arch1[1], A)), uGB = V.unit(V.sub(d.arch1[N_STRIP], B));
    dw.setArrow('reacGA', V.sub(A, V.mul(uGA, 0.55)), A);
    dw.setArrow('reacGB', V.sub(B, V.mul(uGB, 0.55)), B);
    dw.setLabel('lGA2', V.add(A, [-0.62, -0.42]));
    dw.setLabel('lGB2', V.add(B, [0.62, -0.42]));

    // two loads Q1, Q2 + hinge chords + mini diagram at C5
    dw.setDashLine('qline0', [[XQ[0], SYM[0]], [XQ[0], GB]]);
    dw.setDashLine('qline1', [[XQ[1], SYM[0]], [XQ[1], GB]]);
    dw.setArrow('resQ1', [XQ[0], SYM[0]], [XQ[0], SYM[1]]);
    dw.setArrow('resQ2', [XQ[1], SYM[0]], [XQ[1], SYM[1]]);
    dw.setLabel('lQ1', [XQ[0] + 0.36, SYM[0] - 0.14]);
    dw.setLabel('lQ2', [XQ[1] + 0.36, SYM[0] - 0.14]);
    dw.setDashLine('ch2a', [B, d.D3]);
    dw.setDashLine('ch2b', [A, d.E3]);
    dw.setDashLine('ch2c', [d.D3, A]);
    dw.setDashLine('ch2d', [d.E3, B]);
    dw.setArrow('edge2a', d.C5, d.J5);
    dw.setArrow('edge2b', d.J5, d.K5);
    dw.setLabel('lQ1f', V.add(V.mid(d.C5, d.J5), [0.34, 0]));
    dw.setLabel('lQ2f', V.add(V.mid(d.J5, d.K5), [0.34, 0]));

    // mini pole construction (parallels to the chords) + trapezoid
    dw.setDashLine('mpar0', [d.C5, d.L5]);            // || D3-A
    dw.setDashLine('mpar1', [d.L5, d.J5]);            // || B-D3
    dw.setDashLine('mpar2', [d.J5, d.M5]);            // || A-E3
    dw.setDashLine('mpar3', [d.M5, d.K5]);            // || B-E3
    dw.setDashLine('mpar4', [d.L5, d.N5]);            // || A-D
    dw.setDashLine('mpar5', [d.N5, d.M5]);            // || D-B
    dw.setSeg('oray2a', d.N5, d.C5);
    dw.setSeg('oray2b', d.K5, d.N5);
    dw.setStrokes('archC', [[A, d.O5], [d.O5, d.P5], [d.P5, B]]);
    dw.setArrow('reacCAf', d.N5, d.C5);
    dw.setArrow('reacCBf', d.K5, d.N5);
    dw.setLabel('lCA', V.add(V.mid(d.N5, d.C5), [-0.08, 0.3]));
    dw.setLabel('lCB', V.add(V.mid(d.K5, d.N5), [-0.08, -0.32]));

    // the extra load Q + Q-alone chords + Q's mini diagram
    dw.setArrow('loadQ', [d.xU, SYM[0]], [d.xU, SYM[1]]);
    dw.setLabel('lQ', [d.xU - 0.36, SYM[0] - 0.14]);
    dw.setDashLine('qloa', [[d.xU, SYM[1]], [d.xU, GB]]);
    dw.setDashLine('qch0', [A, d.B7]);
    dw.setDashLine('qch1', [d.B7, B]);
    dw.setArrow('qedge', d.D7, d.W14);
    dw.setLabel('lQf', V.add(V.mid(d.D7, d.W14), [0.3, 0]));
    dw.setSeg('qray0', d.G7, d.D7);
    dw.setSeg('qray1', d.G7, d.W14);

    // the load line with Q folded in
    const qa = d.pts2[s.pQ - 1], qb = d.pts2[s.pQ];
    dw.setArrow('edgeQa', d.O7, qa);
    dw.setArrow('edgeQb', qb, d.Q7);
    dw.setSeg('segQ', qa, qb);
    dw.setLabel('lQl', [qa[0] + 0.38, (qa[1] + qb[1]) / 2]);
    dw.setLabel('lRgQ', [d.O7[0] + 0.44, (d.O7[1] + d.Q7[1]) / 2 - 0.5]);

    // trial funicular + crown division + crown chords -> final pole
    dw.setStrokes('tfan', d.pts2.map((pt) => [d.M, pt]));
    dw.setStrokes('tfun', pairs(d.trial));
    dw.setDashLine('tcl0', [d.Nt, d.Z8]);
    dw.setDashLine('tcl1', [d.Z8, d.W8]);
    dw.setDashLine('tpar0', [d.M, d.B9]);
    dw.setDashLine('tpar1', [d.M, d.A9]);
    dw.setDashLine('kch0', [A, d.D]);
    dw.setDashLine('kch1', [d.D, B]);
    dw.setDashLine('kpar0', [d.B9, V.add(d.C9, V.mul(V.sub(d.C9, d.B9), 0.25))]);
    dw.setDashLine('kpar1', [d.A9, V.add(d.C9, V.mul(V.sub(d.C9, d.A9), 0.25))]);

    // final fan + arch
    dw.setStrokes('fan3', d.pts2.slice(1, N_STRIP).map((pt) => [d.C9, pt]));
    dw.setSeg('oray3a', d.C9, d.O7);
    dw.setSeg('oray3b', d.C9, d.Q7);
    dw.setStrokes('arch2', pairs(d.arch2));
    pairs(d.arch2).forEach(([a2, b2], k) => {
      const N = V.dist(d.C9, d.pts2[Math.min(k, N_STRIP)]) / s.sFD;
      dw.setPoly(`if${k}`, V.rectPoints(a2, b2, s.sIF * N));
    });

    // final reactions: ON the outer rays (right), thrusts into the springings
    const [ra0, ra1] = reacSide(d.C9, d.O7);
    const [rb0, rb1] = reacSide(d.Q7, d.C9);
    dw.setArrow('reacAf', ra0, ra1);
    dw.setArrow('reacBf', rb0, rb1);
    dw.setLabel('lRA', V.add(V.mid(ra0, ra1), [-0.1, 0.32]));
    dw.setLabel('lRB', V.add(V.mid(rb0, rb1), [-0.1, -0.34]));
    const uA = V.unit(V.sub(d.arch2[1], A)), uB = V.unit(V.sub(d.arch2[N_STRIP], B));
    dw.setArrow('reacA', V.sub(A, V.mul(uA, 0.55)), A);
    dw.setArrow('reacB', V.sub(B, V.mul(uB, 0.55)), B);
    dw.setLabel('lRA2', V.add(A, [-0.62, -0.42]));
    dw.setLabel('lRB2', V.add(B, [0.62, -0.42]));

    // points + labels
    dw.setDisk('pt_A', A);
    dw.setDisk('pt_B', B);
    dw.setDisk('pt_D', d.D);
    dw.setDisk('pt_O', d.L1);
    dw.setDisk('pt_C5', d.C5);
    dw.setDisk('pt_N', d.Nt);
    for (const pn of ['X15', 'M2', 'D3', 'E3', 'N5', 'B7', 'G7', 'M', 'Z8', 'B9', 'A9', 'C9']) {
      dw.setDisk(`pt_${pn}`, d[pn]);
    }

    const at = { A, B, D: d.D, X15: d.X15, M2: d.M2, D3: d.D3, E3: d.E3,
                 N5: d.N5, B7: d.B7, G7: d.G7, M: d.M, N: d.Nt, Z8: d.Z8,
                 B9: d.B9, A9: d.A9, C9: d.C9 };
    const off = { A: [-0.3, -0.26], B: [0.3, -0.26], D: [0.06, 0.3],
                  X15: [0.3, 0.16], M2: [0.1, -0.34],
                  D3: [-0.3, 0.22], E3: [0.34, 0.22], N5: [0.26, 0.24],
                  B7: [0.03, 0.3], G7: [0.28, 0.2],
                  M: [0.3, 0.22], N: [-0.3, 0.12], Z8: [0.28, 0.22],
                  B9: [0.9, 0.14], A9: [0.9, -0.14], C9: [0.02, -0.36] };
    for (const pn of Object.keys(letters)) dw.setLabel(`lbl_${pn}`, V.add(at[pn], off[pn]));

    // "show points funicular" dots on the trial vertices
    for (let i = 0; i < N_STRIP + 2; i++) dw.setDisk(`fp${i}`, d.trial[i]);

    // "show handles" rings
    dw.setDashedCircle('hnD', d.D, HR);
    dw.setDashedCircle('hnO', d.L1, HR);
    dw.setDashedCircle('hnC5', d.C5, HR);
    dw.setDashedCircle('hnQ', [d.xU, (SYM[0] + SYM[1]) / 2], HR);
    dw.setDashedCircle('hnM', d.M, HR);
    dw.setDashedCircle('hnN', d.Nt, HR);

    dw.setLabel('ro0', [15.6, 5.6]);
    dw.setText('ro0', `A = ${d.RA.toFixed(2)} kN`);
    dw.setLabel('ro1', [15.6, 5.25]);
    dw.setText('ro1', `B = ${d.RB.toFixed(2)} kN`);
    dw.setLabel('ro2', [15.6, 4.9]);
    dw.setText('ro2', `Q = ${(s.fQ * s.g).toFixed(2)} kN`);
  }

  // node-equilibrium inspector: 1 = A, 2..31 = strip nodes, 32 = B.
  // Each side of the node's sub-polygon is one force acting ON the node.
  // Springing reactions use the SAME coordinates as the visible green arrows
  // reacAf/reacBf (reacSide -- drawn on the outer rays), so the black
  // highlight lands exactly on them.
  function nodePoly() {
    const j = Math.round(s.node);
    if (j <= 1) return [reacSide(d.C9, d.O7), [d.O7, d.C9]];
    if (j >= N_STRIP + 2) return [reacSide(d.Q7, d.C9), [d.C9, d.Q7]];
    const k = j - 1;
    return [[d.pts2[k - 1], d.pts2[k]], [d.pts2[k], d.C9], [d.C9, d.pts2[k - 1]]];
  }
  function updateNode() {
    const j = Math.round(s.node);
    dw.selectDisk(null);
    const name = j <= 1 ? 'A' : j >= N_STRIP + 2 ? 'B' : `${j - 1}`;
    const pos = j <= 1 ? d.arch2[0] : j >= N_STRIP + 2 ? d.arch2[N_STRIP + 1] : d.arch2[j - 1];
    dw.setNodeInspector(pos, 0.72, `node ${name}`, nodePoly());
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
  panel.slider(par, s, 'g', 'g — load unit (kN)', 0.1, 1, 0.01, refresh);
  panel.slider(par, s, 'fQ', 'factor Q (Q = factor·g)', 1, 5, 0.1, refresh);
  panel.slider(par, s, 'pQ', 'position of Q (strip)', 1, 30, 1, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 0.5, 2, 0.05, refresh);
  panel.toggle(par, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.1, 0.005, refresh);
  panel.toggle(par, s, 'hideRF', 'hide reaction forces in force diagram', refresh);
  panel.toggle(par, s, 'sbg', 'show bounding geometry (funiculars without Q)', refresh);
  panel.toggle(par, s, 'o2', 'show points funicular (trial vertices)', refresh);
  panel.toggle(par, s, 'sh', 'show handles', refresh);
  panel.toggle(par, s, 'ph', 'show the photograph of the built bridge', refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off, 1 = A, 2–31 = strip nodes, 32 = B)',
               0, N_STRIP + 2, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS });
    panel.syncAll();
    refresh();
  });

  const hits = [];
  hits.push(['D', () => d.D, 1, 99],
            ['O', () => d.L1, 2, 99],
            ['C5', () => d.C5, 6, RESOLVE],
            ['Q', () => [d.xU, (SYM[0] + SYM[1]) / 2], 9, 99],
            ['M', () => d.M, 11, RESOLVE], ['N', () => d.Nt, 11, RESOLVE]);
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
      if (name === 'D') s.dy = Math.max(0.55, Math.min(3.1, wy));
      else if (name === 'C5') { s.cx = wx; s.cy = wy; }
      else if (name === 'O') { s.ox = wx; s.oy = wy; }
      else if (name === 'Q') {
        s.pQ = Math.max(1, Math.min(30, Math.round((wx - 0.5) / 0.3 + 0.5)));
        panel.syncAll();
      } else if (name === 'M') { s.mx = wx; s.my = wy; }
      else if (name === 'N') s.ny = Math.max(4.2, Math.min(6.3, wy));
      refresh();
    },
  );

  // click a node of the final arch to inspect it
  const nodeIdx = [];
  for (let j = 1; j <= N_STRIP + 2; j++) nodeIdx.push(j);
  dw.nodeSelect(
    nodeIdx.map((j) => ({ at: () => (j <= 1 ? A : j >= N_STRIP + 2 ? B : d.arch2[j - 1]) })),
    (i) => {
      s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
      panel.syncAll();
      refresh();
    },
  );

  refresh();
  return player;
}
