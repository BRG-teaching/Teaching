/**
 * Drawing view/21 "Fan-harp bridge"
 * (https://block.arch.ethz.ch/eq/drawing/view/21) as a step-by-step
 * construction: a cable-stayed bridge with one mast and six stays whose
 * force diagram is built joint by joint (a Cremona diagram).
 *
 * The stay anchors tower1/2/3 slide on the mast: coincident = FAN,
 * spread so all stays are parallel = HARP, half-way = SEMIFAN (the
 * applet's three buttons). The left-span loads stack UP from O on the
 * load line, the right-span loads UP from the closing point LF4; the
 * residual gap O-LF7 is the deck-anchor force B (zero until the mast
 * is inclined by dragging its base). The mast force LF3-LF4 overlaps
 * the load line and is drawn beside it as the reaction A.
 *
 * Live port of view_21/applet_0/geogebra.xml. The XML's saved force
 * diagram coords are a degenerate stale state, so the regression
 * reference is the LIVE applet (ggbApplet via CDP): fan / harp /
 * semifan / inclined deck / inclined mast all match to ~1e-13.
 * See notes/view_21_analysis.md.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 21 — Fan-harp bridge',
  subtitle: 'a cable-stayed bridge solved joint by joint',
  about: 'A cable-stayed bridge: one mast, six stays, a deck anchored at its right end. Sliding the stay anchors on the mast morphs the system from a FAN (one point) through a SEMIFAN to a HARP (parallel stays). The force diagram is a Cremona diagram built joint by joint: every deck node closes a polygon of its load, two deck forces and a stay force; the tower anchors balance pairs of stays against the mast pieces. The stays resolve pink (tension), deck and mast blue (compression); the mast force overlaps the load line and is read beside it as the reaction A, and the small gap O–LF₇ is the deck-anchor force B, zero until the mast is inclined.',
  frame: [[-4.0315, -7.6341], [65.1807, 26.972]],
};

const GX0 = 8, GX1 = 32;                 // ground drag guide for the mast base
const AXG = 35;                          // anchor guide x (deckControl2)
const LOA_T = 22.632902690212433, LOA_B = -4.996314805058743;  // lines-of-action band
const F_KN = 2;                          // every deck load = 2 kN
const RESOLVE = 15;

const DEFAULTS = {
  tc1: [20, 22],                         // towerControl1 (mast top control, free)
  tc2x: 20,                              // mast base x on the ground guide
  dc1d: 7.333333333333333,               // deckControl1: distance from base along the mast
  t1d: 17.333333333333332,               // stay anchors: distances from base (fan: equal)
  t2d: 17.333333333333332,
  t3d: 17.333333333333332,
  dc2y: 7.333333333333332,               // deckControl2 y on the anchor guide
  ox: 47, oy: 8.6,                       // O, force-diagram anchor
  sFD: 1.5,                              // scaleForceDiagram [1, 2]
  sLS: 2,                                // loadSymbol [1, 4.5]
  offR: 2.5,                             // offsetReactionForces [0, 5]
  sIF: 0.04,                             // scale internal forces
  o1: true,                              // show internal forces
  n4: true,                              // show points
  lbl: true,                             // the applet's showLabels (default ON)
  node: 0,                               // node-equilibrium inspector (0 = off)
};

// every construction move happens on BOTH sides at once
const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'Mast, deck and anchor', d: 'left: the mast on its base (drag the base along the ground to incline it!), the deck through deckControl1 on the mast, its right end anchored on the guide (drag both deck controls)' },
  { t: 'Six stays — fan, semifan, harp', d: 'left: the stay anchors slide on the mast — all in one point: FAN; spread until the stays are parallel: HARP (use the buttons below)' },
  { t: 'The loads and the load line', d: 'left: equal loads F₁ … F₆ hang at the deck nodes — right: walking the LEFT span from its outer node, F₁, F₂, F₃ stack upward from the anchor point O' },
  { t: 'Joint deck1 — members 1, 2', d: 'right: through O parallel to stay 1, through LF₁ parallel to the deck → T — left: the outer node closes with stay 1 and deck piece 2' },
  { t: 'Joint deck2 — members 3, 4', d: 'right: through T parallel to stay 3, through LF₂ parallel to the deck → U₂' },
  { t: 'Joint deck3 — members 5, 6', d: 'right: through U₂ parallel to stay 5, through LF₃ parallel to the deck → V₂' },
  { t: 'Joint tower1 — members 13, 15', d: 'right: stays 1 and 13 meet the mast: through O parallel to stay 13, through T parallel to the MAST → W₂ — left: the top anchor balances two stays against the mast' },
  { t: 'Joint tower2 — members 11, 14', d: 'right: through W₂ parallel to stay 11, through U₂ parallel to the mast → Z₂ (in the fan the mast pieces 14, 15 vanish)' },
  { t: 'Joint tower3 — members 9, 7', d: 'right: through Z₂ parallel to stay 9, through V₂ parallel to the mast → A₃' },
  { t: 'The tower deck node closes — members 16, 8', d: 'right: through LF₃ parallel to the MAST, through A₃ parallel to the deck → LF₄: the mast force 16 runs back along the load line' },
  { t: 'The right-span loads', d: 'right: F₄, F₅, F₆ stack upward from LF₄ — with balanced spans they land exactly back at O' },
  { t: 'Joints deck4, deck5 — members 10, 12', d: 'right: each remaining deck node closes its polygon with one new deck force' },
  { t: 'Joint deck6 — the anchor force B', d: 'right: the last polygon closes over the gap O–LF₇ = the force in the deck extension = anchor reaction B (zero here — incline the MAST to see it appear) — left: B acts along the deck at the anchor' },
  { t: 'The reaction A', d: 'right: the mast force 16 = everything the bridge carries, drawn beside the load line (dotted offset): reaction A — left: A pushes up the mast base' },
  { t: 'Tension and compression', d: 'the stays resolve pink = tension, deck and mast blue = compression (pipes ∝ force); drag the anchors or use the fan / semifan / harp buttons; click a node for its equilibrium' },
];

const cache = {};
function inter(key, p1, d1, p2, d2) {
  cache[key] = V.intersect(p1, d1, p2, d2) || cache[key] || p1;
  return cache[key];
}

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const base = [s.tc2x, 0];
  const um = V.unit(V.sub(s.tc1, base));           // mast direction
  const mlen = V.dist(s.tc1, base);
  const at = (t) => V.add(base, V.mul(um, t));
  const dc1 = at(s.dc1d), t1 = at(s.t1d), t2 = at(s.t2d), t3 = at(s.t3d);
  const B1 = at(s.dc1d + 0.5), Zp = at(mlen - 0.5);
  const dc2 = [AXG, s.dc2y];
  const udeck = V.unit(V.sub(dc2, dc1));
  const L2 = 2 * V.dist(dc2, dc1);
  const d6 = V.add(dc2, V.mul(udeck, -L2 / 15));
  const d5 = V.add(d6, V.mul(udeck, -L2 / 6));
  const d4 = V.add(d6, V.mul(udeck, -L2 / 3));
  const mir = (p) => V.sub(V.mul(dc1, 2), p);
  const decks = [mir(d6), mir(d5), mir(d4), d4, d5, d6];   // deck1..deck6

  // Cremona: load line (left span up from O), then joint by joint
  const O = [s.ox, s.oy];
  const LF1 = [O[0], O[1] + F_KN * s.sFD];
  const LF2 = [LF1[0], LF1[1] + F_KN * s.sFD];
  const LF3 = [LF2[0], LF2[1] + F_KN * s.sFD];
  const stay = (a, b) => V.sub(b, a);
  const T = inter('T', LF1, udeck, O, stay(t1, decks[0]));
  const U2 = inter('U2', LF2, udeck, T, stay(t2, decks[1]));
  const V2 = inter('V2', LF3, udeck, U2, stay(t3, decks[2]));
  const W2 = inter('W2', O, stay(t1, decks[5]), T, um);
  const Z2 = inter('Z2', U2, um, W2, stay(t2, decks[4]));
  const A3 = inter('A3', V2, um, Z2, stay(t3, decks[3]));
  const LF4 = inter('LF4', A3, udeck, LF3, um);
  const LF5 = [LF4[0], LF4[1] + F_KN * s.sFD];
  const LF6 = [LF5[0], LF5[1] + F_KN * s.sFD];
  const LF7 = [LF6[0], LF6[1] + F_KN * s.sFD];
  const gap = V.sub(LF7, O);                        // anchor force B
  const Bmag = V.len(gap) / s.sFD;

  // reactions: A offset beside the load line, C2 below the mast base
  const pl = V.perp(um);                            // left of the mast
  const P = V.add(LF3, V.mul(pl, s.offR));
  const R = V.add(LF4, V.mul(pl, s.offR));
  const C2 = V.sub(base, V.mul(um, s.sLS));
  const Amag = V.dist(LF3, LF4) / s.sFD;

  // members 1..16: [form a, form b, force f1, force f2] (macro orientation)
  const M = [null,
    [t1, decks[0], T, O], [decks[0], decks[1], T, LF1],
    [t2, decks[1], U2, T], [decks[1], decks[2], U2, LF2],
    [t3, decks[2], V2, U2], [decks[2], dc1, V2, LF3],
    [t3, dc1, A3, V2], [dc1, decks[3], A3, LF4],
    [t3, decks[3], Z2, A3], [decks[3], decks[4], Z2, LF5],
    [t2, decks[4], W2, Z2], [decks[4], decks[5], W2, LF6],
    [t1, decks[5], O, W2], [t2, t3, U2, Z2],
    [t1, t2, W2, T], [dc1, base, LF4, LF3],
  ];
  const col = [], N = [];
  for (let k = 1; k <= 16; k++) {
    const [a, b, f1, f2] = M[k];
    col[k] = V.isCompression(V.ggbAngle(V.sub(b, a), V.sub(f2, f1))) ? PAL.blue : PAL.red;
    N[k] = V.dist(f1, f2) / s.sFD;
  }
  const len14 = V.dist(t2, t3), len15 = V.dist(t1, t2);

  // harp / semifan target anchors (parallels to stay 13 through deck5 / deck4)
  const f13 = stay(decks[5], t1);
  const tH2 = V.intersect(decks[4], f13, base, um) || t2;
  const tH3 = V.intersect(decks[3], f13, base, um) || t3;
  const dH2 = V.dot(V.sub(tH2, base), um), dH3 = V.dot(V.sub(tH3, base), um);

  return { base, um, mlen, dc1, t1, t2, t3, B1, Zp, dc2, udeck, decks,
           O, LF1, LF2, LF3, LF4, LF5, LF6, LF7, T, U2, V2, W2, Z2, A3,
           gap, Bmag, P, R, C2, Amag, M, col, N, len14, len15, dH2, dH3 };
}

const SUB = ' ₁₂₃₄₅₆';

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, tc1: [...DEFAULTS.tc1] };
  let d = compute(s);

  const W_BAR = 0.16, W_SKEL = 0.05, W_FSEG = 0.09;
  const ARROW = { w: 0.14, headLen: 0.75, headW: 0.3 };
  const memCol = (k) => ({ pending: PAL.black, final: (dd) => dd.col[k] });
  const numCol = (k) => ({ final: (dd) => dd.col[k] });
  // joint step of each member (its force is found there)
  const IK = [null, 4, 4, 5, 5, 6, 6, 9, 10, 9, 12, 8, 12, 7, 8, 7, 10];

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // step 1: guides + the given structure (grey skeleton)
  dw.dashLine('gGround', { intro: 1, dash: 0.45 });
  dw.dashLine('gAnchor', { intro: 1, dash: 0.45 });
  dw.dashLine('gMast', { intro: 1, dash: 0.45 });
  dw.dashLine('eExt', { intro: 1, dash: 0.45 });
  dw.strokes('skelDeck', 6, { intro: 1, w: W_SKEL, color: PAL.grey });
  dw.strokes('skelMast', 4, { intro: 1, w: W_SKEL, color: PAL.grey });

  // step 2: the stay anchors + stay skeleton
  dw.strokes('skelStay', 6, { intro: 2, w: W_SKEL, color: PAL.grey });

  // step 3: loads + the left load line (labels behind the applet's showLabels)
  const lblOn = (st) => st.lbl;
  for (let i = 1; i <= 6; i++) {
    dw.dashLine(`act${i}`, { intro: 3, dash: 0.3 });
    dw.arrow(`loadF${i}`, { intro: 3, ...ARROW });
    dw.label(`lF${i}`, `F${SUB[i]}`, { cls: 'num', intro: 3, color: PAL.green, when: lblOn });
    dw.arrow(`edge${i}`, { intro: i <= 3 ? 3 : 11, ...ARROW });
    dw.label(`lFf${i}`, `F${SUB[i]}`, { cls: 'num', intro: i <= 3 ? 3 : 11, color: PAL.green, when: lblOn });
  }

  // members: each drawn (form, colored) at its joint step with its force segment
  for (let k = 1; k <= 16; k++) {
    dw.seg(`mem${k}`, { intro: IK[k], w: W_BAR, color: memCol(k) });
    dw.seg(`fseg${k}`, { intro: IK[k], w: W_FSEG, color: memCol(k) });
    const wn = k === 14 ? (st, dd) => st.lbl && dd.len14 > 0.5
      : k === 15 ? (st, dd) => st.lbl && dd.len15 > 0.5 : lblOn;
    dw.label(`n${k}f`, `${k}`, { cls: 'num', intro: IK[k], color: numCol(k), when: wn });
    dw.label(`n${k}s`, `${k}`, { cls: 'num', intro: IK[k], color: numCol(k), when: wn });
  }

  // step 13: the anchor force B (gap O-LF7)
  const bw = (st, dd) => V.len(dd.gap) > 0.03;
  dw.seg('h3', { intro: 13, w: 0.06, color: PAL.black, when: bw });
  dw.arrow('reacB', { intro: 13, ...ARROW, when: bw });
  dw.arrow('reacBform', { intro: 13, ...ARROW, when: bw });
  dw.label('lblBf', 'B', { cls: 'num', intro: 13, color: PAL.green, when: (st, dd) => st.lbl && bw(st, dd) });
  dw.label('lblBs', 'B', { cls: 'num', intro: 13, color: PAL.green, when: (st, dd) => st.lbl && bw(st, dd) });

  // step 14: the reaction A beside the load line
  dw.dashLine('q5', { intro: 14, dash: 0.35, color: 0x006400 });
  dw.dashLine('p5', { intro: 14, dash: 0.35, color: 0x006400 });
  dw.arrow('reacA', { intro: 14, ...ARROW });
  dw.arrow('reacAform', { intro: 14, ...ARROW });
  dw.label('lblAf', 'A', { cls: 'num', intro: 14, color: PAL.green, when: lblOn });
  dw.label('lblAs', 'A', { cls: 'num', intro: 14, color: PAL.green, when: lblOn });

  // internal-force pipes
  for (let k = 1; k <= 16; k++) {
    dw.poly(`if${k}`, 4, { intro: RESOLVE, opacity: 1.0, z: -0.18, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd.col[k] }, when: (st) => st.o1 });
  }

  // points
  const HANDLE = { r: 0.34 }, DERIVED = { r: 0.26 };
  const show = (st) => st.n4;
  dw.disk('pt_base', { intro: 1, ...HANDLE });
  dw.disk('pt_top', { intro: 1, ...HANDLE });
  dw.disk('pt_dc1', { intro: 1, ...HANDLE });
  dw.disk('pt_dc2', { intro: 1, ...HANDLE });
  for (let i = 1; i <= 6; i++) dw.disk(`pt_d${i}`, { intro: 1, ...DERIVED, when: show });
  dw.disk('pt_t1', { intro: 2, ...HANDLE });
  dw.disk('pt_t2', { intro: 2, ...HANDLE });
  dw.disk('pt_t3', { intro: 2, ...HANDLE });
  dw.disk('pt_O', { intro: 3, ...HANDLE });
  const fpts = { T: 4, U2: 5, V2: 6, W2: 7, Z2: 8, A3: 9, LF4: 10 };
  for (const [pn, intro] of Object.entries(fpts)) dw.disk(`pt_${pn}`, { intro, ...DERIVED, when: show });
  const fl = { T: ['T', 4], U2: ['U₂', 5], V2: ['V₂', 6], W2: ['W₂', 7], Z2: ['Z₂', 8],
               A3: ['A₃', 9], LF4: ['LF₄', 10], O: ['O', 3] };
  for (const [pn, [txt, intro]] of Object.entries(fl)) {
    dw.label(`lbl_${pn}`, txt, { cls: 'point', intro, when: show });
  }

  // readouts
  dw.label('ro_A', '', { intro: RESOLVE, flash: false, color: PAL.green });
  dw.label('ro_B', '', { intro: RESOLVE, flash: false, color: PAL.green });

  // node-equilibrium inspector
  dw.nodeInspector(4, { when: (st) => st.node > 0, w: 1.5 * W_BAR, headLen: 0.8, headW: 0.32, r: 0.38 });

  // dual pairs
  for (let k = 1; k <= 16; k++) dw.link(`mem${k}`, `fseg${k}`, `n${k}f`, `n${k}s`);
  for (let i = 1; i <= 6; i++) dw.link(`loadF${i}`, `edge${i}`, `lF${i}`, `lFf${i}`, `act${i}`);
  dw.link('reacA', 'reacAform', 'lblAf', 'lblAs', 'q5', 'p5');
  dw.link('reacB', 'reacBform', 'h3', 'lblBf', 'lblBs');
  dw.ghostable('fseg1', 'fseg2', 'fseg3', 'fseg4', 'fseg5', 'fseg6', 'fseg7', 'fseg8',
               'fseg9', 'fseg10', 'fseg11', 'fseg12', 'fseg13', 'fseg14', 'fseg15', 'fseg16',
               'edge1', 'edge2', 'edge3', 'edge4', 'edge5', 'edge6', 'reacA');
  for (let i = 4; i <= 6; i++) dw.highlight(`loadF${i}`, [11]);

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [1.5, 25.4]);
    dw.setLabel('force_title', [45.5, 25.4]);
    dw.setLabel('force_sub', [46.2, 24.3]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(2)} kN`);

    dw.setDashLine('gGround', [[GX0, 0], [GX1, 0]]);
    dw.setDashLine('gAnchor', [[AXG, 0], [AXG, 20]]);
    dw.setDashLine('gMast', [d.B1, d.Zp]);
    dw.setDashLine('eExt', [d.decks[5], d.dc2]);
    dw.setStrokes('skelDeck', [[d.decks[0], d.decks[1]], [d.decks[1], d.decks[2]],
      [d.decks[2], d.dc1], [d.dc1, d.decks[3]], [d.decks[3], d.decks[4]], [d.decks[4], d.decks[5]]]);
    dw.setStrokes('skelMast', [[d.base, d.dc1], [d.dc1, d.t3], [d.t3, d.t2], [d.t2, d.t1]]);
    dw.setStrokes('skelStay', d.decks.map((p, i) => [[d.t1, d.t2, d.t3, d.t3, d.t2, d.t1][i], p]));

    // loads + load line
    for (let i = 1; i <= 6; i++) {
      const p = d.decks[i - 1];
      dw.setDashLine(`act${i}`, [[p[0], LOA_B], [p[0], LOA_T]]);
      dw.setArrow(`loadF${i}`, p, [p[0], p[1] - s.sLS]);
      dw.setLabel(`lF${i}`, [p[0] - 0.62, p[1] - 0.55 * s.sLS]);
      dw.setDisk(`pt_d${i}`, p);
    }
    const edges = [null, [d.LF1, d.O], [d.LF2, d.LF1], [d.LF3, d.LF2],
                   [d.LF5, d.LF4], [d.LF6, d.LF5], [d.LF7, d.LF6]];
    for (let i = 1; i <= 6; i++) {
      dw.setArrow(`edge${i}`, edges[i][0], edges[i][1]);
      dw.setLabel(`lFf${i}`, [edges[i][0][0] - 0.75, (edges[i][0][1] + edges[i][1][1]) / 2]);
    }

    // members + force segments + numbers
    for (let k = 1; k <= 16; k++) {
      const [a, b, f1, f2] = d.M[k];
      dw.setSeg(`mem${k}`, a, b);
      dw.setSeg(`fseg${k}`, f1, f2);
      const m = V.mid(a, b), mf = V.mid(f1, f2);
      if (k % 2 === 0 && k <= 12) {                 // deck members: below, between loads
        dw.setLabel(`n${k}f`, [m[0], m[1] - s.sLS - 0.65]);
      } else if (k === 7 || k >= 14) {              // mast pieces: right of the mast
        dw.setLabel(`n${k}f`, V.add(m, [0.9, 0]));
      } else {                                      // stays: above the stay
        const pp = V.perp(V.unit(V.sub(b, a)));
        const sg = pp[1] > 0 ? 1 : -1;
        dw.setLabel(`n${k}f`, V.add(m, V.mul(pp, 0.65 * sg)));
      }
      if (k % 2 === 0 && k <= 12) {                 // deck forces: horizontal segs
        dw.setLabel(`n${k}s`, [mf[0], mf[1] + (k <= 6 ? 0.5 : -0.5)]);
      } else if (k === 16) {
        dw.setLabel(`n${k}s`, [d.LF3[0] - 0.55, d.LF3[1] - 0.75]);
      } else if (k === 7) {
        dw.setLabel(`n${k}s`, V.add(mf, [0.55, 0]));
      } else {
        const pp = V.perp(V.unit(V.sub(f2, f1)));
        const sg = pp[1] > 0 ? 1 : -1;
        dw.setLabel(`n${k}s`, V.add(mf, V.mul(pp, 0.55 * sg)));
      }
    }

    // anchor force B
    dw.setSeg('h3', d.LF7, d.O);
    dw.setArrow('reacB', d.O, d.LF7);
    const bsgn = V.dot(d.gap, d.udeck) >= 0 ? 1 : -1;
    dw.setArrow('reacBform', d.dc2, V.add(d.dc2, V.mul(d.udeck, bsgn * s.sLS)));
    dw.setLabel('lblBf', V.add(d.dc2, [bsgn * (s.sLS + 0.7), 0.5]));
    dw.setLabel('lblBs', [V.mid(d.O, d.LF7)[0] + 0.6, V.mid(d.O, d.LF7)[1]]);

    // reaction A
    dw.setDashLine('q5', [d.LF3, d.P]);
    dw.setDashLine('p5', [d.LF4, d.R]);
    dw.setArrow('reacA', d.R, d.P);
    dw.setArrow('reacAform', d.C2, d.base);
    dw.setLabel('lblAf', V.add(d.C2, [0.65, 0.4]));
    dw.setLabel('lblAs', V.add(V.mid(d.R, d.P), V.mul(V.perp(d.um), 0.6)));

    // pipes
    for (let k = 1; k <= 16; k++) {
      const [a, b] = d.M[k];
      dw.setPoly(`if${k}`, V.rectPoints(a, b, s.sIF * d.N[k]));
    }

    dw.setDisk('pt_base', d.base);
    dw.setDisk('pt_top', s.tc1);
    dw.setDisk('pt_dc1', d.dc1);
    dw.setDisk('pt_dc2', d.dc2);
    dw.setDisk('pt_t1', d.t1);
    dw.setDisk('pt_t2', d.t2);
    dw.setDisk('pt_t3', d.t3);
    dw.setDisk('pt_O', d.O);
    for (const pn of Object.keys(fpts)) dw.setDisk(`pt_${pn}`, d[pn === 'LF4' ? 'LF4' : pn]);
    const off = { T: [0.55, 0.3], U2: [0.6, 0.3], V2: [0.6, 0.3], W2: [0.6, -0.35],
                  Z2: [0.6, -0.35], A3: [0.65, -0.35], LF4: [0.9, -0.5], O: [-0.6, -0.4] };
    for (const pn of Object.keys(fl)) {
      dw.setLabel(`lbl_${pn}`, V.add(pn === 'O' ? d.O : d[pn], off[pn]));
    }

    dw.setLabel('ro_A', [57.5, 22.3]);
    dw.setText('ro_A', `A = ${d.Amag.toFixed(1)} kN`);
    dw.setLabel('ro_B', [57.5, 21.1]);
    dw.setText('ro_B', `B = ${d.Bmag.toFixed(2)} kN`);
  }

  // node-equilibrium inspector: sides of each node's closed sub-polygon.
  // 1-3 deck1..3, 4 tower deck node, 5-7 deck4..6, 8 anchor, 9-11 t1..t3,
  // 12 base (reaction side on the drawn offset arrow R->P).
  function nodePoly() {
    const n = Math.max(1, Math.round(s.node));
    const { O, LF1, LF2, LF3, LF4, LF5, LF6, LF7, T, U2, V2, W2, Z2, A3, P, R } = d;
    switch (n) {
      case 1: return [[LF1, O], [O, T], [T, LF1]];
      case 2: return [[LF2, LF1], [LF1, T], [T, U2], [U2, LF2]];
      case 3: return [[LF3, LF2], [LF2, U2], [U2, V2], [V2, LF3]];
      case 4: return [[LF3, V2], [V2, A3], [A3, LF4], [LF4, LF3]];
      case 5: return [[LF5, LF4], [LF4, A3], [A3, Z2], [Z2, LF5]];
      case 6: return [[LF6, LF5], [LF5, Z2], [Z2, W2], [W2, LF6]];
      case 7: return [[LF7, LF6], [LF6, W2], [W2, O], [O, LF7]];
      case 8: return [[LF7, O], [O, LF7]];
      case 9: return [[T, O], [O, W2], [W2, T]];
      case 10: return [[U2, T], [T, W2], [W2, Z2], [Z2, U2]];
      case 11: return [[V2, U2], [U2, Z2], [Z2, A3], [A3, V2]];
      default: return [[LF3, LF4], [R, P]];
    }
  }
  const NODE_DISKS = [null, 'pt_d1', 'pt_d2', 'pt_d3', 'pt_dc1', 'pt_d4', 'pt_d5',
                      'pt_d6', 'pt_dc2', 'pt_t1', 'pt_t2', 'pt_t3', 'pt_base'];
  const NODE_NAMES = [null, 'deck1', 'deck2', 'deck3', 'tower deck', 'deck4', 'deck5',
                      'deck6', 'anchor', 'tower1', 'tower2', 'tower3', 'base'];
  function updateNode() {
    const n = Math.round(s.node);
    dw.selectDisk(n > 0 ? NODE_DISKS[n] : null);
    dw.setNodeInspector([57, 12], 3.2, n > 0 ? `node ${NODE_NAMES[n]}` : '', nodePoly());
  }

  let player = null;
  function refresh() {
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
  const cfg = panel.buttonRow(par);
  panel.button(cfg, 'fan', () => { s.t2d = s.t1d; s.t3d = s.t1d; refresh(); });
  panel.button(cfg, 'semifan', () => {
    d = compute(s); s.t3d = d.dH2; s.t2d = (s.t1d + d.dH2) / 2; refresh();
  });
  panel.button(cfg, 'harp', () => {
    d = compute(s); s.t2d = d.dH2; s.t3d = d.dH3; refresh();
  });
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 1, 2, 0.05, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 1, 4.5, 0.1, refresh);
  panel.slider(par, s, 'offR', 'offset loadline reaction forces', 0, 5, 0.25, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.1, 0.005, refresh);
  panel.toggle(par, s, 'lbl', 'show labels', refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node',
               'node (0 = off, 1–3 deck, 4 tower deck, 5–7 deck, 8 anchor, 9–11 tower, 12 base)',
               0, 12, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS, tc1: [...DEFAULTS.tc1] });
    panel.syncAll();
    refresh();
  });

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const hits = [
    ['top', () => s.tc1, 1], ['base', () => d.base, 1],
    ['dc1', () => d.dc1, 1], ['dc2', () => d.dc2, 1],
    ['t1', () => d.t1, 2], ['t2', () => d.t2, 2], ['t3', () => d.t3, 2],
    ['O', () => d.O, 3],
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
      const tmast = V.dot(V.sub([wx, wy], d.base), d.um);
      if (name === 'top') s.tc1 = [clamp(wx, 10, 30), clamp(wy, 12, 26.5)];
      else if (name === 'base') s.tc2x = clamp(wx, GX0, GX1);
      else if (name === 'dc1') s.dc1d = clamp(tmast, 1.5, Math.min(s.t1d, s.t2d, s.t3d) - 0.5);
      else if (name === 'dc2') s.dc2y = clamp(wy, 0, 20);
      else if (name === 't1') s.t1d = clamp(tmast, s.t2d, d.mlen - 0.5);
      else if (name === 't2') s.t2d = clamp(tmast, s.t3d, s.t1d);
      else if (name === 't3') s.t3d = clamp(tmast, s.dc1d + 0.5, s.t2d);
      else if (name === 'O') { s.ox = wx; s.oy = wy; }
      refresh();
    },
  );

  // click a node to inspect it (slider stays in sync)
  const nodeAt = [];
  for (let n = 1; n <= 12; n++) {
    nodeAt.push({ at: () => {
      const map = [null, d.decks[0], d.decks[1], d.decks[2], d.dc1, d.decks[3],
                   d.decks[4], d.decks[5], d.dc2, d.t1, d.t2, d.t3, d.base];
      return map[n];
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
