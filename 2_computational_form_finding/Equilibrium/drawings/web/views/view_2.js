/**
 * Drawing view/2 "Pedestrian Bridge 1" (https://block.arch.ethz.ch/eq/drawing/view/2)
 * as a step-by-step construction: a deck hung from a two-cable "V" and the
 * force triangle of the cable node.
 *
 * Construction math is a live port of view_2/applet_0/geogebra.xml (the baked
 * coordinates of view_2_compas.py are the regression reference); everything
 * viewer-related comes from lib/eqdraw.js. See web/PLAN.md for the style rules.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 2 — Pedestrian Bridge 1',
  subtitle: 'deck hung from two cables: form + force diagram',
  about: 'A pedestrian deck hangs from a V-shaped cable anchored to two rock banks. The load at the deck is carried by a hanger to the cable node; the force triangle of that node, built from parallels to the cables, gives the two anchor forces directly. The "fractured rock" scenario of the original applet breaks the right bank face and moves both anchors to sound rock.',
  frame: [[-4.9243, -0.5757], [65.4306, 34.6017]],
};

// ---------------------------------------------------------------------------
// static site geometry (baked, from the applet)
// ---------------------------------------------------------------------------

const DECK_Y = 10.5;
const BANK_L = [[5, 10.5], [4.5734, 12.6843], [4.8787, 16.3483], [4.5729, 19.3284], [2.5946, 29.1644]];
const BANK_R = [[20.83, 10.5], [21.0615, 12.3026], [20.6798, 13.9056], [21.2905, 18.0277],
                [21.4431, 21.4627], [20.9088, 25.432], [18.8478, 27.7984], [18.9871, 29.274]];
const SUP_L = [[5, 10.5], [6.89, 10.5], [6.9809, 8.4608], [7.2878, 4.6247]];
const SUP_R = [[20.83, 10.5], [18.89, 10.5], [18.6428, 8.5375], [18.1057, 6.5427], [18.1057, 4.548]];
const DECK = [[6.89, DECK_Y], [18.89, DECK_Y]];
const SLAB_H = 0.36;                     // deck drawn as a thin slab, like the original site image
const GUIDE_Y = [4.1079, 29.199];        // vertical extent of the dashed guides
const DIM_Y1 = 3.17, DIM_Y2 = 1.9, TICK = 0.28;   // dimension-line rows below the deck

function segPairs(poly) {
  const out = [];
  for (let i = 0; i < poly.length - 1; i++) out.push([poly[i], poly[i + 1]]);
  return out;
}

/** Hachure ticks at 45° on the rock side of a polyline (statics ground symbol,
    reproducing the hatched banks of the applet's background site image). */
function hatchTicks(poly, gorge, step = 0.85, len = 0.8) {
  const out = [];
  for (let i = 0; i < poly.length - 1; i++) {
    const a = poly[i], b = poly[i + 1];
    const u = V.unit(V.sub(b, a));
    let n = V.perp(u);
    if (V.dot(n, V.sub(V.mid(a, b), gorge)) < 0) n = V.mul(n, -1);
    const t = V.unit(V.add(n, u));
    const l = V.dist(a, b);
    for (let s = step * 0.6; s < l; s += step) {
      const p = V.add(a, V.mul(u, s));
      out.push([p, V.add(p, V.mul(t, len))]);
    }
  }
  return out;
}

const GORGE = [12.89, 17];               // hatch away from the middle of the gorge
const HATCH = [
  ...hatchTicks(BANK_L, GORGE), ...hatchTicks(BANK_R, GORGE),
  ...hatchTicks(SUP_L, GORGE), ...hatchTicks(SUP_R, GORGE),
];

// "fractured rock" wedges on the right bank face (traced from the applet's
// alternate site image VorlageFracturdRock.png, world coordinates): where the
// rock broke away, the anchors must move to sound rock
const WEDGE_HI = [
  [21.01, 24.01], [20.95, 24.54], [20.87, 25.42], [21.13, 25.34], [21.88, 25.40],
  [22.32, 24.96], [22.69, 24.53], [22.72, 24.07], [22.79, 23.29], [22.66, 22.89],
  [22.31, 22.47], [21.80, 21.83], [21.47, 21.42], [21.24, 22.36], [21.14, 23.05],
  [21.10, 23.41],
];
const WEDGE_LO = [
  [20.95, 16.24], [21.03, 16.76], [21.17, 17.75], [21.33, 18.12], [22.02, 17.86],
  [22.59, 17.28], [23.39, 16.48], [23.50, 16.11], [23.57, 15.56], [23.40, 15.21],
  [22.73, 14.39], [21.98, 14.09], [21.20, 13.95], [20.71, 13.76], [20.70, 14.55],
  [20.82, 15.35],
];
const closedPairs = (poly) => [...segPairs(poly), [poly[poly.length - 1], poly[0]]];

// scenario anchor presets (the applet's "Original System" / "Fractured Rock"
// buttons: V -> F_3/H_3, W -> G_3/I_3, F back to 12, rock image swapped)
const ANCHORS_ORIGINAL = { V: [4.739, 17.7099], W: [21.2612, 17.8298] };
const ANCHORS_FRACTURED = { V: [4.0076, 22.1389], W: [20.9817, 11.6811] };

/** Arclength position u -> point on the polyline (clamped). */
function polyPoint(poly, u) {
  let acc = 0;
  for (let i = 0; i < poly.length - 1; i++) {
    const l = V.dist(poly[i], poly[i + 1]);
    if (u <= acc + l || i === poly.length - 2) {
      const t = Math.max(0, Math.min(1, (u - acc) / l));
      return V.add(poly[i], V.mul(V.sub(poly[i + 1], poly[i]), t));
    }
    acc += l;
  }
  return poly[poly.length - 1];
}

/** Closest point on the polyline -> arclength position u. */
function polyProject(poly, p) {
  let best = { d: Infinity, u: 0 };
  let acc = 0;
  for (let i = 0; i < poly.length - 1; i++) {
    const ab = V.sub(poly[i + 1], poly[i]);
    const l = V.len(ab);
    const t = Math.max(0, Math.min(1, V.dot(V.sub(p, poly[i]), ab) / (l * l)));
    const d = V.dist(p, V.add(poly[i], V.mul(ab, t)));
    if (d < best.d) best = { d, u: acc + t * l };
    acc += l;
  }
  return best.u;
}

const DEFAULTS = {
  c2x: 12.89,                                    // load point C2 on the deck
  h3: 2.5028,                                    // cable node C3 above the deck
  tV: polyProject(BANK_L, [4.739, 17.7099]),     // anchor V on the left bank
  tW: polyProject(BANK_R, [21.2612, 17.8298]),   // anchor W on the right bank
  zx: 48.3749, zy: 25.7185,                      // force diagram pole Z
  F: 12,                                         // load magnitude [5, 20] kN
  sFD: 0.7,                                      // scaleForceDiagram [0.2, 2] kN/unit
  sLS: 3,                                        // scaleLoadSymbol   [1, 4]
  sIF: 0.06,                                     // scaleInternalForces [0, 0.05]
  o1: true,                                     // "show internal forces"
  n4: true,                                      // "show points"
  dims: true,                                    // "show dimensions" (applet e_3, default true)
  fractured: false,                              // "show fractured rock" (applet o_2)
  node: 0,                                       // node-equilibrium inspector (0 = off)
};

// every construction move happens on BOTH sides at once: what is drawn in the
// form diagram (left) appears with its equivalent vector in the force diagram
// (right) in the same step
const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The site', d: 'two rock banks, 12 m apart, and the deck slab spanning between them' },
  { t: 'The load — in both diagrams', d: 'left: F pulls down at C₂ — right: from pole Z, the same vector, F × scale long → A₁' },
  { t: 'Hanger 1 — form and force', d: 'left: node C₃ on the guide, hanger 1 = C₂–C₃ — right: Z–A₁ is the force in 1, parallel to it' },
  { t: 'Cable 2 — form and force', d: 'left: cable 2 = C₃–V to the left bank — right: through A₁, dashed parallel to cable 2' },
  { t: 'Cable 3 — form and force', d: 'left: cable 3 = C₃–W to the right bank — right: through Z, dashed parallel to cable 3' },
  { t: 'Point B₁', d: 'the two parallels intersect at B₁: the force triangle closes' },
  { t: 'Cable forces', d: 'A₁–B₁ is the force in cable 2, B₁–Z in cable 3 — the cables flash on the left' },
  { t: 'Follow the arrows', d: 'tip-to-tail round the triangle — the same vectors act at C₂, V and W in the form diagram' },
  { t: 'Tension', d: 'closed triangle = node C₃ in equilibrium; the cables resolve pink = tension' },
];

let b1Cache = [33.5185, 17.151];   // last valid B1, reused if the cables align

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const C2 = [s.c2x, DECK_Y];
  const C3 = [s.c2x, DECK_Y + s.h3];
  const Vp = polyPoint(BANK_L, s.tV);
  const Wp = polyPoint(BANK_R, s.tW);
  const Eload = [s.c2x, DECK_Y - s.sLS];         // tip of the load symbol

  const Z = [s.zx, s.zy];
  const A1 = [s.zx, s.zy - s.F / s.sFD];         // load laid off from the pole
  const d2 = V.sub(Vp, C3), d3 = V.sub(Wp, C3);  // cable directions
  b1Cache = V.intersect(A1, d2, Z, d3) || b1Cache;
  const B1 = b1Cache;

  // tip-to-tail traversal Z -> A1 -> B1 -> Z gives the force of each member
  const w1 = V.ggbAngle(V.sub(C2, C3), V.sub(A1, Z));
  const w2 = V.ggbAngle(d2, V.sub(B1, A1));
  const w3 = V.ggbAngle(d3, V.sub(Z, B1));
  const col = (w) => (V.isCompression(w) ? PAL.blue : PAL.red);

  const centroid = V.mul(V.add(V.add(Z, A1), B1), 1 / 3);
  const N2 = V.dist(A1, B1) * s.sFD;
  const N3 = V.dist(B1, Z) * s.sFD;

  return { C2, C3, V: Vp, W: Wp, Eload, Z, A1, B1, d2, d3, centroid,
           c1: col(w1), c2: col(w2), c3: col(w3), N2, N3 };
}

/** Arrow drawn beside (not on) a force segment, pushed away from the centroid. */
function beside(a, b, centroid, off = 0.85) {
  const u = V.unit(V.sub(b, a));
  const p = V.perp(u);
  const s = V.dot(p, V.sub(V.mid(a, b), centroid)) >= 0 ? 1 : -1;
  const o = V.mul(p, off * s);
  return [V.add(a, o), V.add(b, o)];
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);

  // ------------------------------------------------------------------
  // elements (intro = construction step at which each appears)
  // ------------------------------------------------------------------

  const memberColor = (key) => ({ pending: PAL.black, final: (dd) => dd[key] });
  const W_BAR = 0.24, W_SITE = 0.14;

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('form_sub', '1 unit :: 1 m', { flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', intro: 2, flash: false });
  dw.label('force_sub', '', { intro: 2, flash: false });

  // step 1: the site (hatched banks, deck slab, full-span dimension)
  dw.strokes('bankL', BANK_L.length - 1, { intro: 1, w: W_SITE });
  dw.strokes('bankR', BANK_R.length - 1, { intro: 1, w: W_SITE });
  dw.strokes('supL', SUP_L.length - 1, { intro: 1, w: W_SITE });
  dw.strokes('supR', SUP_R.length - 1, { intro: 1, w: W_SITE });
  dw.strokes('hatch', HATCH.length, { intro: 1, w: 0.055, color: 0xb9b9b9, flash: false });
  dw.poly('slab', 4, { intro: 1, color: PAL.white, flash: false });
  dw.strokes('slabEdge', 4, { intro: 1, w: W_SITE });
  // "fractured rock" scenario: broken-off wedges on the right bank face
  const frOn = (st) => st.fractured;
  dw.poly('wedgeHi', WEDGE_HI.length, { intro: 1, color: 0x8f8f8f, opacity: 0.6, flash: false, when: frOn });
  dw.poly('wedgeLo', WEDGE_LO.length, { intro: 1, color: 0x8f8f8f, opacity: 0.6, flash: false, when: frOn });
  dw.strokes('wedgeHiEdge', WEDGE_HI.length, { intro: 1, w: 0.07, color: 0x6f6f6f, flash: false, when: frOn });
  dw.strokes('wedgeLoEdge', WEDGE_LO.length, { intro: 1, w: 0.07, color: 0x6f6f6f, flash: false, when: frOn });
  // dimensions gated by the applet's "show dimensions" (e_3, default on)
  const dimsOn = (st) => st.dims;
  dw.strokes('dimBot', 3, { intro: 1, w: 0.07, color: PAL.grey, flash: false, when: dimsOn });
  dw.label('dimL', '12.0 m', { intro: 1, flash: false, color: PAL.grey, when: dimsOn });
  // the site is background: it appears instantly, only the construction draws in
  dw.instant('bankL', 'bankR', 'supL', 'supR', 'hatch', 'slab', 'slabEdge', 'dimBot',
             'wedgeHi', 'wedgeLo', 'wedgeHiEdge', 'wedgeLoEdge');

  // step 2: the load point splits the span into two half-span dimensions
  dw.strokes('dimTop', 5, { intro: 2, w: 0.07, color: PAL.grey, flash: false, when: dimsOn });
  dw.label('dimA', '', { intro: 2, flash: false, color: PAL.grey, when: dimsOn });
  dw.label('dimB', '', { intro: 2, flash: false, color: PAL.grey, when: dimsOn });

  // step 2: the load, drawn simultaneously left (at C2) and right (Z -> A1),
  // with the applet's on-canvas F1 captions (vectors u and v, green)
  dw.arrow('load', { intro: 2, w: 0.29, headLen: 0.9, headW: 0.34 });
  dw.dashLine('pguide', { intro: 2, dash: 0.5 });
  dw.arrow('aload', { intro: 2, w: 0.29, headLen: 0.9, headW: 0.34 });
  dw.label('lfF1', 'F₁', { cls: 'num', intro: 2, color: PAL.green });
  dw.label('lsF1', 'F₁', { cls: 'num', intro: 2, color: PAL.green });

  // step 3: hanger 1 (left) + its force segment Z-A1 (right)
  dw.dashLine('hguide', { intro: 3, dash: 0.5 });
  dw.seg('bar1', { intro: 3, w: W_BAR, color: memberColor('c1') });
  dw.seg('force1', { intro: 3, w: W_BAR, color: memberColor('c1') });

  // steps 4-5: each cable (left) + the parallel through A1 / Z (right)
  dw.seg('bar2', { intro: 4, w: W_BAR, color: memberColor('c2') });
  dw.dashLine('par2', { intro: 4, dash: 0.5 });
  dw.seg('bar3', { intro: 5, w: W_BAR, color: memberColor('c3') });
  dw.dashLine('par3', { intro: 5, dash: 0.5 });

  // step 7: the closing forces (right), re-flashing their cables (left)
  dw.seg('force2', { intro: 7, w: W_BAR, color: memberColor('c2') });
  dw.seg('force3', { intro: 7, w: W_BAR, color: memberColor('c3') });
  dw.highlight('bar2', [7]);
  dw.highlight('bar3', [7]);

  // step 8: direction arrows in BOTH diagrams, with the applet's A / B
  // captions on the anchor forces (vector captions t='A', w='B' and their
  // force-diagram twins)
  for (const n of ['a2', 'a3', 'arrV', 'arrW']) {
    dw.arrow(n, { intro: 8, w: 0.29, headLen: 0.9, headW: 0.34 });
  }
  dw.label('lfA', 'A', { cls: 'num', intro: 8, color: PAL.green });
  dw.label('lfB', 'B', { cls: 'num', intro: 8, color: PAL.green });
  dw.label('lsA', 'A', { cls: 'num', intro: 8, color: PAL.green });
  dw.label('lsB', 'B', { cls: 'num', intro: 8, color: PAL.green });

  // points: white face + black boundary, light pink while current
  const HANDLE = { r: 0.35 }, DERIVED = { r: 0.27 };
  const show = (st) => st.n4;
  dw.disk('pt_C2', { intro: 2, ...HANDLE, when: show });
  dw.disk('pt_C3', { intro: 3, ...HANDLE, when: show });
  dw.disk('pt_V', { intro: 4, ...HANDLE, when: show });
  dw.disk('pt_W', { intro: 5, ...HANDLE, when: show });
  dw.disk('pt_Z', { intro: 2, ...HANDLE, when: show });
  dw.disk('pt_A1', { intro: 2, ...DERIVED, when: show });
  dw.disk('pt_B1', { intro: 6, ...DERIVED, when: show });

  const letters = { C2: ['C₂', 2], C3: ['C₃', 3], V: ['V', 4], W: ['W', 5],
                    Z: ['Z', 2], A1: ['A₁', 2], B1: ['B₁', 6] };
  for (const [p, [text, intro]] of Object.entries(letters)) {
    dw.label(`lbl_${p}`, text, { cls: 'point', intro, when: show });
  }

  // member numbers, form + force diagram in matching steps, text colored
  // like the member itself
  const numbers = { f1: [3, '1', 'c1'], f2: [4, '2', 'c2'], f3: [5, '3', 'c3'],
                    s1: [3, '1', 'c1'], s2: [7, '2', 'c2'], s3: [7, '3', 'c3'] };
  for (const [name, [intro, text, ck]] of Object.entries(numbers)) {
    dw.label(name, text, { cls: 'num', intro, color: { final: (dd) => dd[ck] } });
  }
  dw.highlight('f2', [7]);
  dw.highlight('f3', [7]);

  // dual pairs: hovering a member highlights its force-diagram counterpart
  dw.link('bar1', 'force1', 'f1', 's1');
  dw.link('bar2', 'force2', 'par2', 'f2', 's2');
  dw.link('bar3', 'force3', 'par3', 'f3', 's3');
  dw.link('load', 'aload', 'lfF1', 'lsF1');
  dw.link('arrV', 'a2', 'lfA', 'lsA');
  dw.link('arrW', 'a3', 'lfB', 'lsB');
  dw.ghostable('force1', 'force2', 'force3', 'aload', 'a2', 'a3');

  // final step: magnitude readout + optional internal forces
  dw.label('roN2', '', { intro: STEPS.length - 1, flash: false, color: { final: (dd) => dd.c2 } });
  dw.label('roN3', '', { intro: STEPS.length - 1, flash: false, color: { final: (dd) => dd.c3 } });
  for (const n of ['if1', 'if2', 'if3']) {
    dw.poly(n, 4, {
      intro: STEPS.length - 1, opacity: 0.45, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd[`c${n[2]}`] },
      when: (st) => st.o1,
    });
  }

  // node-equilibrium inspector (the applets' mode 2): free-body star of the
  // selected node in an inset at the top + the same forces tip-to-tail on the
  // node's sub-polygon of the force triangle. C3's polygon is the whole
  // triangle Z -> A1 -> B1 -> Z; the load point C2 and the anchors V, W
  // degenerate to two opposite collinear forces (member force + load/reaction).
  dw.nodeInspector(3, { when: (st) => st.node > 0, w: 0.36, headLen: 1.2, headW: 0.45, r: 0.33 });
  const NODE_NAMES = ['C₂', 'C₃', 'V', 'W'];
  const NODE_DISKS = ['pt_C2', 'pt_C3', 'pt_V', 'pt_W'];
  const nodeAt = [() => d.C2, () => d.C3, () => d.V, () => d.W];
  // anchor reactions use the SAME offset geometry as the visible green arrows
  // a2/a3 (beside the triangle sides), so the black highlight lands exactly on
  // them; member forces stay on the polygon (offsetting a side translates it —
  // its vector, hence the free-body star, is unchanged)
  const nodePolys = () => [
    [[d.Z, d.A1], [d.A1, d.Z]],
    [[d.Z, d.A1], [d.A1, d.B1], [d.B1, d.Z]],
    [[d.B1, d.A1], beside(d.A1, d.B1, d.centroid)],
    [[d.Z, d.B1], beside(d.B1, d.Z, d.centroid)],
  ];

  function updateNode() {
    const j = Math.max(0, Math.min(NODE_DISKS.length - 1, Math.round(s.node) - 1));
    dw.selectDisk(s.node > 0 ? NODE_DISKS[j] : null);
    dw.setNodeInspector([27, 28], 4, `node ${NODE_NAMES[j]}`, nodePolys()[j]);
  }

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [12.9, 32.9]);
    dw.setLabel('form_sub', [12.9, 31.4]);
    dw.setLabel('force_title', [41, 32.9]);
    dw.setLabel('force_sub', [41, 31.4]);
    dw.setText('force_sub', `1 unit :: ${s.sFD.toFixed(2)} kN`);

    dw.setStrokes('bankL', segPairs(BANK_L));
    dw.setStrokes('bankR', segPairs(BANK_R));
    dw.setStrokes('supL', segPairs(SUP_L));
    dw.setStrokes('supR', segPairs(SUP_R));
    dw.setStrokes('hatch', HATCH);

    dw.setPoly('wedgeHi', WEDGE_HI);
    dw.setPoly('wedgeLo', WEDGE_LO);
    dw.setStrokes('wedgeHiEdge', closedPairs(WEDGE_HI));
    dw.setStrokes('wedgeLoEdge', closedPairs(WEDGE_LO));

    // deck slab centred on the deck line
    const [x0, x1] = [DECK[0][0], DECK[1][0]];
    const [yb, yt] = [DECK_Y - SLAB_H / 2, DECK_Y + SLAB_H / 2];
    dw.setPoly('slab', [[x0, yb], [x1, yb], [x1, yt], [x0, yt]]);
    dw.setStrokes('slabEdge', [
      [[x0, yb], [x1, yb]], [[x1, yb], [x1, yt]],
      [[x1, yt], [x0, yt]], [[x0, yt], [x0, yb]],
    ]);

    // dimension lines: full span below, half-spans split at C2 above
    const vt = (x, y) => [[x, y - TICK], [x, y + TICK]];
    dw.setStrokes('dimBot', [[[x0, DIM_Y2], [x1, DIM_Y2]], vt(x0, DIM_Y2), vt(x1, DIM_Y2)]);
    dw.setStrokes('dimTop', [
      [[x0, DIM_Y1], [s.c2x, DIM_Y1]], [[s.c2x, DIM_Y1], [x1, DIM_Y1]],
      vt(x0, DIM_Y1), vt(s.c2x, DIM_Y1), vt(x1, DIM_Y1),
    ]);
    dw.setLabel('dimL', [(x0 + x1) / 2, DIM_Y2 - 0.75]);
    dw.setLabel('dimA', [(x0 + s.c2x) / 2, DIM_Y1 + 0.65]);
    dw.setLabel('dimB', [(s.c2x + x1) / 2, DIM_Y1 + 0.65]);
    dw.setText('dimA', `${(s.c2x - x0).toFixed(1)} m`);
    dw.setText('dimB', `${(x1 - s.c2x).toFixed(1)} m`);

    dw.setArrow('load', d.C2, d.Eload);
    dw.setDashLine('hguide', [[s.c2x, GUIDE_Y[0]], [s.c2x, GUIDE_Y[1]]]);
    dw.setSeg('bar1', d.C2, d.C3);
    dw.setSeg('bar2', d.C3, d.V);
    dw.setSeg('bar3', d.C3, d.W);

    dw.setDashLine('pguide', [[s.zx, GUIDE_Y[0]], [s.zx, GUIDE_Y[1]]]);
    dw.setSeg('force1', d.Z, d.A1);
    // guides run a little past B1 on both sides, GeoGebra-style
    const e2 = V.unit(V.sub(d.B1, d.A1)), e3 = V.unit(V.sub(d.B1, d.Z));
    dw.setDashLine('par2', [V.sub(d.A1, V.mul(e2, 4)), V.add(d.B1, V.mul(e2, 6))]);
    dw.setDashLine('par3', [V.sub(d.Z, V.mul(e3, 4)), V.add(d.B1, V.mul(e3, 6))]);
    dw.setSeg('force2', d.A1, d.B1);
    dw.setSeg('force3', d.B1, d.Z);

    // F1 captions: beside the load at C2 (left) and the load vector Z->A1 (right)
    dw.setLabel('lfF1', V.add(V.mid(d.C2, d.Eload), [-1.2, 0]));
    dw.setLabel('lsF1', V.mid(...beside(d.Z, d.A1, d.centroid, 2.2)));

    // green vectors: beside the triangle sides + the same pulls at V and W,
    // captioned A / B like the applet
    dw.setArrow('aload', ...beside(d.Z, d.A1, d.centroid));
    dw.setArrow('a2', ...beside(d.A1, d.B1, d.centroid));
    dw.setArrow('a3', ...beside(d.B1, d.Z, d.centroid));
    const uV = V.unit(V.sub(d.V, d.C3)), uW = V.unit(V.sub(d.W, d.C3));
    dw.setArrow('arrV', d.V, V.add(d.V, V.mul(uV, s.sLS)));
    dw.setArrow('arrW', d.W, V.add(d.W, V.mul(uW, s.sLS)));
    const below = (u) => (V.perp(u)[1] <= 0 ? V.perp(u) : V.mul(V.perp(u), -1));
    dw.setLabel('lfA', V.add(V.add(d.V, V.mul(uV, s.sLS * 0.55)), V.mul(below(uV), 1.0)));
    dw.setLabel('lfB', V.add(V.add(d.W, V.mul(uW, s.sLS * 0.55)), V.mul(below(uW), 1.0)));
    dw.setLabel('lsA', V.mid(...beside(d.A1, d.B1, d.centroid, 2.3)));
    dw.setLabel('lsB', V.mid(...beside(d.B1, d.Z, d.centroid, 2.3)));

    for (const p of ['C2', 'C3', 'V', 'W', 'Z', 'A1', 'B1']) dw.setDisk(`pt_${p}`, d[p]);
    const off = { C2: [-1.1, -0.6], C3: [1.1, -0.5], V: [-1.2, -0.9], W: [1.2, -0.9],
                  Z: [1.5, 1.0], A1: [1.6, -1.0], B1: [-1.4, 0.0] };
    for (const p of Object.keys(letters)) dw.setLabel(`lbl_${p}`, V.add(d[p], off[p]));

    dw.setLabel('f1', V.add(V.mid(d.C2, d.C3), [-0.9, 0.1]));
    dw.setLabel('f2', V.add(V.mid(d.C3, d.V), [-0.3, 1.0]));
    dw.setLabel('f3', V.add(V.mid(d.C3, d.W), [0.3, 1.0]));
    // force-diagram numbers sit inside the triangle, arrows outside
    const inward = (a, b) => {
      const m = V.mid(a, b);
      return V.add(m, V.mul(V.unit(V.sub(d.centroid, m)), 1.1));
    };
    dw.setLabel('s1', inward(d.Z, d.A1));
    dw.setLabel('s2', inward(d.A1, d.B1));
    dw.setLabel('s3', inward(d.B1, d.Z));

    dw.setLabel('roN2', [56.5, 7.6]);
    dw.setLabel('roN3', [56.5, 5.8]);
    dw.setText('roN2', `A = N₂ = ${d.N2.toFixed(1)} kN`);
    dw.setText('roN3', `B = N₃ = ${d.N3.toFixed(1)} kN`);

    // internal-force rectangles: width proportional to the force in kN
    dw.setPoly('if1', V.rectPoints(d.C3, d.C2, s.sIF * s.F));
    dw.setPoly('if2', V.rectPoints(d.C3, d.V, s.sIF * d.N2));
    dw.setPoly('if3', V.rectPoints(d.C3, d.W, s.sIF * d.N3));
  }

  function refresh() {
    d = compute(s);
    update();
    updateNode();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  // ------------------------------------------------------------------
  // side panel + dragging (C2 on the deck, C3 on the guide, V/W on the
  // banks, Z free)
  // ------------------------------------------------------------------

  const view = panel.section('View');
  panel.button(view, 'zoom fit', () => dw.zoomFit());

  // the applet's scenario buttons: anchors to preset positions, F back to 12,
  // rock face swapped between the intact and the fractured site drawing
  const scenario = (anchors, fractured) => () => {
    s.F = 12;
    s.tV = polyProject(BANK_L, anchors.V);
    s.tW = polyProject(BANK_R, anchors.W);
    s.fractured = fractured;
    panel.syncAll();
    refresh();
  };
  const scen = panel.section('Scenario');
  panel.button(scen, 'original system', scenario(ANCHORS_ORIGINAL, false));
  panel.button(scen, 'fractured rock', scenario(ANCHORS_FRACTURED, true));

  const par = panel.section('Parameters');
  panel.slider(par, s, 'F', 'F (load, kN)', 5, 20, 0.2, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (kN/unit)', 0.2, 2, 0.1, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 1, 4, 0.1, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.15, 0.005, refresh);
  panel.toggle(par, s, 'fractured', 'show fractured rock', refresh);
  panel.toggle(par, s, 'dims', 'show dimensions', refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off, 1 = C₂, 2 = C₃, 3 = V, 4 = W)', 0, 4, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, DEFAULTS);
    panel.syncAll();
    refresh();
  });

  const intro = { C2: 2, C3: 3, V: 4, W: 5, Z: 2 };
  dw.enableDrag(
    (wx, wy, tol) => {
      let best = null;
      for (const name of Object.keys(intro)) {
        if (player.k < intro[name]) continue;
        const dd = Math.hypot(d[name][0] - wx, d[name][1] - wy);
        if (dd < tol) { best = name; tol = dd; }
      }
      return best;
    },
    (name, wx, wy) => {
      if (name === 'C2') s.c2x = Math.max(DECK[0][0] + 0.4, Math.min(DECK[1][0] - 0.4, wx));
      else if (name === 'C3') s.h3 = Math.max(GUIDE_Y[0], Math.min(GUIDE_Y[1], wy)) - DECK_Y;
      else if (name === 'V') s.tV = polyProject(BANK_L, [wx, wy]);
      else if (name === 'W') s.tW = polyProject(BANK_R, [wx, wy]);
      else if (name === 'Z') { s.zx = wx; s.zy = wy; }
      refresh();
    },
  );

  // click a node point to inspect it (clicking again deselects); the panel
  // slider stays in sync
  dw.nodeSelect(nodeAt.map((at) => ({ at })), (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
