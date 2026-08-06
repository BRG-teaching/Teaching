/**
 * Drawing view/17 "Masonry arch on spreading supports"
 * (https://block.arch.ethz.ch/eq/drawing/view/17) as a step-by-step
 * construction: a semicircular arch of 19 voussoirs whose right support can
 * be dragged outward. Spreading opens three hinges — crown extrados J and
 * the haunch intrados points R2 (left, fixed) and I4 (right, moving with
 * the support) — and the ring splits into four rigid bodies. The thrust
 * line through the three hinges is found with the three-point funicular
 * method (a trial funicular per span, closing string, division point on
 * the load line, parallel to the span's chord; the two parallels meet at
 * the pole o). If the thrust line exits beyond the moved support edge the
 * applet declares "YOUR ARCH JUST COLLAPSED !".
 *
 * Live port of view_17/applet_0/geogebra.xml; the mechanism (hinges, body
 * transforms), all 20 voussoir centroids, both trial funiculars, division
 * points, pole, every thrust-line vertex, the ground-exit case logic and
 * the reaction tips are regression-checked against the applet's baked
 * coordinates (59 targets, max error 8.9e-5 = the dump's rounding).
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 17 — Masonry arch on spreading supports',
  subtitle: 'three hinges open, four rigid bodies, one thrust line — until it leaves the masonry',
  about: 'A semicircular masonry arch of 19 voussoirs stands on a support that can spread outward. The arch cracks into three hinges — at the crown extrados and at the haunch intrados on both sides — and its four rigid bodies rotate as the span grows. The thrust line through the three hinges is found with the three-point funicular method: one trial funicular per span gives a division point on the load line, and the parallels to the two span chords meet at the pole. While the thrust line stays inside the masonry the arch stands; when it exits beyond the moved support edge, the arch collapses.',
  frame: [[12.4, 1.2], [77.5, 39.8]],
};

// fixed applet geometry
const G = [35, 6], RE = 16, RI = 13, NV = 19;
const ANG = Math.PI / NV;
const THH = 3 * ANG;                        // hinges at joint 3
const J = [35, 22], DI = [35, 19];          // crown extrados / intrados
const WV = 2;                               // voussoir weight (kN)
const Y_CL_T = 30.236412997693975;          // centroid-line extent
const Y_CL_B = 3.250838308587604;
const Y_WTIP = 25.601432431848806;          // weight-arrow tip level
const GROUND_X = [15.166908151349533, 58.61909099062702];
const RED = 0xd11616;                       // collapse flag (not tension pink)
const RESOLVE = 14;

const onE = (th) => [G[0] + RE * Math.cos(th), G[1] + RE * Math.sin(th)];
const onI = (th) => [G[0] + RI * Math.cos(th), G[1] + RI * Math.sin(th)];
const R2 = onI(Math.PI - THH), R3 = onI(THH);

const DEFAULTS = {
  dx: 0,                                    // support spread (handle H4)
  f2: [70.03597115355512, 28.146426788322927],   // load-line top (free)
  o1p: [75.65229778183391, 28.49699065558428],   // trial pole 1 (applet B_10)
  c10y: 36.97156433043361,                  // trial start 1 on the crown vertical
  o2p: [76, 4],                             // trial pole 2 (applet's hidden M_10
                                            // = (76,26) sends the trial off-frame;
                                            // any trial pole gives the same o)
  n10y: 38.88809476330901,                  // trial start 2 on the crown vertical
  sFD: 0.6,                                 // scaleForceDiagram [0.5, 1]
  sLS: 2.5,                                 // loadSymbol [1, 10]
  sIF: 0.02,                                // pipe scale (applet 0..0.1, default on)
  o1: true,                                 // show internal forces
  hideRF: false,
  n4: true,                                 // show points
  sh: false,                                // show handles (applet showHandles)
  o4: false,                                // show construction lines at the end
  node: 0,
  _k: 99,
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'A masonry arch on its supports', d: 'left: a semicircular arch ring (intrados and extrados) on the ground line; the dashed circles are its geometry. What happens when a support gives way?' },
  { t: 'Nineteen voussoirs', d: 'left: radial joints on rays through the centre cut the ring into 19 equal voussoirs — the crown lies in the middle of the top stone' },
  { t: 'Three hinges', d: 'left: if the right support spreads outward (drag the white support handle!), the ring cracks open at three hinges: the crown extrados and the haunch intrados on either side (third joint) — four rigid bodies, and the crown drops' },
  { t: 'Weights and the load line', d: 'left: every voussoir weighs 2 kN on the vertical through its centroid; the cracked crown stone counts as two halves — right: the 20 weights stacked tip-to-tail form the load line' },
  { t: 'The two span chords', d: 'left: the thrust line must pass through the three hinges — the chords from the crown hinge to each haunch hinge (dashed) split the problem into two spans' },
  { t: 'Trial funicular, left span', d: 'right: a trial pole o′₁ sends rays to the upper load line — left: from C on the crown vertical a trial funicular hangs across the left-span verticals to the hinge vertical; its closing string (dashed)' },
  { t: 'Division point d₁ → pole line 1', d: 'right: through o′₁ parallel to the closing string to d₁ on the load line; through d₁ parallel to the left chord — the pole must lie on this line' },
  { t: 'Right span → the pole o', d: 'the same for the right span: trial pole o′₂, trial funicular from N, closing string, division point d₂ — through d₂ parallel to the right chord: both pole lines meet at THE pole o' },
  { t: 'Through the crown hinge', d: 'left: the thrust line starts at the crown hinge, parallel to the crown ray — right: the ray from o to the crown division of the load line' },
  { t: 'Down the left half', d: 'left: side by side, each parallel to its ray of o, bending on every centroid vertical, down to the ground beside the left hinge — right: the rays of o to the upper load line' },
  { t: 'Down the right half', d: 'left: the right half of the thrust line descends to the spread support — right: the rays of o to the lower load line' },
  { t: 'Reactions', d: 'right: the total weight W runs down the load line; reactions A and B close the triangle through o — left: the same thrusts push into the ground at the two exit points' },
  { t: 'Spread the supports!', d: 'drag the white support handle to the right: the hinges rotate, the crown sinks, o wanders and the thrust line flattens — the arch STANDS as long as its thrust line stays inside the masonry' },
  { t: 'Stable — or collapsed', d: 'the construction lines retire; the thrust line is compression (blue). When the right exit passes outside the support edge, the thrust line leaves the masonry: YOUR ARCH JUST COLLAPSED (red). Drag back to save it' },
];

const cen4 = (p) => {
  let a = 0, cx = 0, cy = 0;
  for (let i = 0; i < p.length; i++) {
    const [x0, y0] = p[i], [x1, y1] = p[(i + 1) % p.length];
    const w = x0 * y1 - x1 * y0;
    a += w; cx += (x0 + x1) * w; cy += (y0 + y1) * w;
  }
  a *= 0.5;
  return [cx / (6 * a), cy / (6 * a)];
};
const rot = (p, c, phi) => {
  const s = Math.sin(phi), co = Math.cos(phi), d = V.sub(p, c);
  return [c[0] + co * d[0] - s * d[1], c[1] + s * d[0] + co * d[1]];
};
const xline = (p, dir, x) => V.intersect(p, dir, [x, 0], [0, 1]) || p;
const angOf = (v) => Math.atan2(v[1], v[0]);

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const dx = s.dx;
  const H4 = [48 + dx, 6];
  const I4 = V.add(R3, [dx, 0]);
  const L5 = [51 + dx, 6];
  // crown hinge = circle(R2,|R2-J|) x circle(I4,|R3-J|), upper solution
  const r1 = V.dist(R2, J), r2 = V.dist(R3, J);
  const dd = V.dist(R2, I4);
  const a = (r1 * r1 - r2 * r2 + dd * dd) / (2 * dd);
  const h = Math.sqrt(Math.max(r1 * r1 - a * a, 0));
  const u = V.unit(V.sub(I4, R2)), n = [-u[1], u[0]];
  const base = V.add(R2, V.mul(u, a));
  let S4 = V.add(base, V.mul(n, h));
  if (S4[1] < base[1]) S4 = V.sub(base, V.mul(n, h));
  // rigid-body transforms
  const phiL = angOf(V.sub(S4, R2)) - angOf(V.sub(J, R2));
  const phiR = angOf(V.sub(S4, I4)) - angOf(V.sub(J, R3));
  const TL = (p) => rot(p, R2, phiL);
  const TR = (p) => V.add(I4, V.sub(rot(p, R3, phiR), R3));
  const TB = (p) => V.add(p, [dx, 0]);
  const TID = (p) => p;
  const V4 = TL(DI), Z4 = TL(G), B5 = TL(onE(Math.PI - THH));
  const D5 = TR(DI), G5 = TR(G), H5 = TR(onE(THH));
  const K5 = TB(onE(THH)), F5 = TB(G);
  // 20 voussoir centroids (crown stone split into two halves)
  const quadL = (k) => {
    const t0 = Math.PI - k * ANG, t1 = Math.PI - (k + 1) * ANG;
    return [onE(t0), onI(t0), onI(t1), onE(t1)];
  };
  const quadR = (k) => {
    const t0 = k * ANG, t1 = (k + 1) * ANG;
    return [onE(t0), onI(t0), onI(t1), onE(t1)];
  };
  const cents = [];
  for (let k = 0; k < 3; k++) cents.push(cen4(quadL(k)));
  for (let k = 3; k < 9; k++) cents.push(TL(cen4(quadL(k))));
  cents.push(TL(cen4([onI(Math.PI - 9 * ANG), DI, J, onE(Math.PI - 9 * ANG)])));
  cents.push(TR(cen4([onI(9 * ANG), DI, J, onE(9 * ANG)])));
  for (let k = 8; k > 2; k--) cents.push(TR(cen4(quadR(k))));
  for (let k = 2; k >= 0; k--) cents.push(TB(cen4(quadR(k))));
  const cols = cents.map((c) => c[0]);
  // load line: 21 points (crown stone = two half drops)
  const P = [s.f2.slice()];
  const drop = WV * s.sFD;
  for (let j = 0; j < 20; j++) {
    P.push([P[j][0], P[j][1] - (j === 9 || j === 10 ? drop / 2 : drop)]);
  }
  // trial funicular, left span (pole o1p): crown vertical -> hinge vertical
  const C10 = [S4[0], s.c10y];
  const ch1 = [C10];
  let jr = 10, kc = 9;
  while (kc >= 0 && cols[kc] > R2[0]) {
    ch1.push(xline(ch1[ch1.length - 1], V.sub(P[jr], s.o1p), cols[kc]));
    jr--; kc--;
  }
  const K10 = xline(ch1[ch1.length - 1], V.sub(P[jr], s.o1p), R2[0]);
  ch1.push(K10);
  const L10 = xline(s.o1p, V.sub(K10, C10), P[0][0]);          // division d1
  // trial funicular, right span (pole o2p)
  const N10 = [S4[0], s.n10y];
  const ch2 = [N10];
  jr = 10; kc = 10;
  while (kc <= 19 && cols[kc] < I4[0]) {
    ch2.push(xline(ch2[ch2.length - 1], V.sub(P[jr], s.o2p), cols[kc]));
    jr++; kc++;
  }
  const V10 = xline(ch2[ch2.length - 1], V.sub(P[jr], s.o2p), I4[0]);
  ch2.push(V10);
  const D11 = xline(s.o2p, V.sub(V10, N10), P[0][0]);          // division d2
  // THE pole: parallels to the two chords through the division points
  const E11 = V.intersect(L10, V.sub(S4, R2), D11, V.sub(S4, I4)) || L10;
  // thrust line: crown segment through S4 || ray P[10], then walk outward;
  // each side ends where a segment crosses the ground y=6
  const walk = (side) => {
    const pts = [];
    let cur = S4, jj = 10;
    const ks = side < 0 ? [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] : [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    for (const k of ks) {
      const d0 = V.sub(P[jj], E11);
      const q = xline(cur, d0, cols[k]);
      const gy = V.intersect(cur, d0, [0, 6], [1, 0]) || q;
      const hits = side < 0 ? gy[0] > q[0] : gy[0] < q[0];
      if (hits && ((side < 0 && gy[0] < cur[0]) || (side > 0 && gy[0] > cur[0]))) {
        return { pts, exit: gy, ray: jj };
      }
      pts.push(q);
      cur = q;
      jj += side < 0 ? -1 : 1;
    }
    const d0 = V.sub(P[jj], E11);
    return { pts, exit: V.intersect(cur, d0, [0, 6], [1, 0]) || cur, ray: jj };
  };
  const L = walk(-1), R = walk(+1);
  const redL = L.ray >= 2, redR = R.ray <= 18;
  const collapsed = R.exit[0] > L5[0];
  // reactions: along the exit rays, length loadSymbol, pointing into the arch
  const upd = (j) => {
    let uu = V.unit(V.sub(P[j], E11));
    return uu[1] > 0 ? uu : V.mul(uu, -1);
  };
  const tailA = V.sub(L.exit, V.mul(upd(L.ray), s.sLS));
  const tailB = V.sub(R.exit, V.mul(upd(R.ray), s.sLS));
  const W = NV * WV;
  const Hthrust = (P[0][0] - E11[0]) / s.sFD;
  const N = P.map((p) => V.dist(E11, p) / s.sFD);

  return { H4, I4, L5, S4, V4, Z4, B5, D5, G5, H5, K5, F5, TL, TR, TB, TID,
           cents, cols, P, C10, ch1, K10, L10, N10, ch2, V10, D11, E11,
           ptsL: L.pts, exL: L.exit, rayL: L.ray, ptsR: R.pts, exR: R.exit,
           rayR: R.ray, redL, redR, collapsed, tailA, tailB, W, Hthrust, N };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, f2: [...DEFAULTS.f2], o1p: [...DEFAULTS.o1p], o2p: [...DEFAULTS.o2p] };
  let d = compute(s);

  const W1 = 0.24, W_RAY = 0.09, W_RAYO = 0.18;
  const W_J = 0.09, W_GJ = 0.05, W_TRS = 0.1, W_TRR = 0.055;
  const ARROW = { w: 0.22, headLen: 0.85, headW: 0.36 };
  const LOADARR = { w: 0.13, headLen: 0.6, headW: 0.26 };
  const trialW = (st) => st._k < RESOLVE || st.o4;
  const GREYJ = 0x999999;

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // ------------------------------------------------------------------
  // step 1: site -- ground, dashed geometry circles, arch ring
  // ------------------------------------------------------------------
  dw.seg('ground', { intro: 1, w: 0.06, color: PAL.grey });
  dw.dashLine('semiE', { intro: 1, color: PAL.black, dash: 0.55 });
  dw.dashLine('semiI', { intro: 1, color: PAL.black, dash: 0.55 });
  // original (unspread) arch, grey -- appears from under the black ring
  dw.strokes('origE', 48, { intro: 1, w: W_GJ, color: GREYJ });
  dw.strokes('origI', 48, { intro: 1, w: W_GJ, color: GREYJ });
  dw.strokes('origJ', 16, { intro: 1, w: W_GJ, color: GREYJ });
  // displaced (current) arch: 8 arcs + 24 joint/crack segments
  for (const nm of ['aLBi', 'aLBe', 'aLUi', 'aLUe', 'aRUi', 'aRUe', 'aRBi', 'aRBe']) {
    dw.strokes(nm, 16, { intro: 1, w: W_J, color: PAL.black });
  }
  dw.instant('ground', 'semiE', 'semiI', 'origE', 'origI', 'origJ',
             'aLBi', 'aLBe', 'aLUi', 'aLUe', 'aRUi', 'aRUe', 'aRBi', 'aRBe');

  // step 2: the 19 voussoirs -- joints (incl. springing + crack faces)
  for (let i = 0; i < 24; i++) dw.seg(`bj${i}`, { intro: 2, w: W_J, color: PAL.black });

  // step 3: the three hinges + the spreading support handle + gap
  dw.dashLine('gap', { intro: 3, color: PAL.black, dash: 0.3 });

  // step 4: weights + centroid verticals + load line (paired edges)
  dw.strokes('cenMarks', 40, { intro: 4, w: 0.035, color: 0x404040, flash: false });
  for (let i = 0; i < 20; i++) {
    dw.dashLine(`cl${i}`, { intro: 4, dash: 0.5 });
    dw.arrow(`w${i}`, { intro: 4, ...LOADARR });
    dw.seg(`ll${i}`, { intro: 4, w: 0.1, color: PAL.black });
    dw.link(`w${i}`, `ll${i}`);
  }
  for (let j = 0; j <= 20; j++) dw.disk(`pt_p${j}`, { intro: 4, r: 0.11, when: (st) => st.sh });

  // step 5: the two span chords (hidden dash15 segments in the applet)
  dw.dashLine('chord1', { intro: 5, color: PAL.black, dash: 0.42, when: trialW });
  dw.dashLine('chord2', { intro: 5, color: PAL.black, dash: 0.42, when: trialW });
  dw.link('chord1', 'chord2');

  // step 6: trial funicular of the left span
  dw.dashLine('vertCr', { intro: 6, dash: 0.5, when: trialW });    // crown vertical
  dw.dashLine('vertR2', { intro: 6, dash: 0.5, when: trialW });    // hinge verticals
  dw.strokes('tray1', 8, { intro: 6, w: W_TRR, color: PAL.grey, when: trialW });
  dw.strokes('tch1', 8, { intro: 6, w: W_TRS, color: PAL.grey, when: trialW });
  dw.dashLine('close1', { intro: 6, color: PAL.black, dash: 0.42, when: trialW });
  dw.link('tch1', 'tray1', 'close1');

  // step 7: division point d1 -> pole line 1
  dw.dashLine('div1', { intro: 7, color: PAL.grey, dash: 0.42, when: trialW });   // o'1 || closing
  dw.dashLine('par1', { intro: 7, color: PAL.black, dash: 0.42, when: trialW });  // || chord 1
  dw.link('par1', 'chord1');

  // step 8: right span -> pole o
  dw.dashLine('vertI4', { intro: 8, dash: 0.5, when: trialW });
  dw.strokes('tray2', 8, { intro: 8, w: W_TRR, color: PAL.grey, when: trialW });
  dw.strokes('tch2', 8, { intro: 8, w: W_TRS, color: PAL.grey, when: trialW });
  dw.dashLine('close2', { intro: 8, color: PAL.black, dash: 0.42, when: trialW });
  dw.dashLine('div2', { intro: 8, color: PAL.grey, dash: 0.42, when: trialW });
  dw.dashLine('par2', { intro: 8, color: PAL.black, dash: 0.42, when: trialW });
  dw.link('tch2', 'tray2', 'close2');
  dw.link('par2', 'chord2');

  // steps 9-11: the thrust line + the fan of o (segment || its ray)
  dw.seg('ts_c', { intro: 9, w: W1, color: { pending: PAL.black, final: () => PAL.blue } });
  dw.seg('rayF10', { intro: 9, w: W_RAY, color: { pending: PAL.black, final: () => PAL.blue } });
  dw.link('ts_c', 'rayF10');
  for (let j = 0; j <= 9; j++) {
    const rL = 9 - j;                        // segment tsL_j is || ray P[9-j]
    dw.seg(`tsL${j}`, { intro: 10, w: W1,
      color: { pending: PAL.black, final: () => (d.rayL === rL && d.redL ? RED : PAL.blue) } });
  }
  for (let k = 0; k <= 9; k++) {
    dw.seg(`rayF${k}`, { intro: 10, w: k === 0 ? W_RAYO : W_RAY,
      color: { pending: PAL.black, final: () => (d.rayL === k && d.redL ? RED : PAL.blue) } });
  }
  for (let j = 0; j <= 9; j++) {
    const rR = 11 + j;
    dw.seg(`tsR${j}`, { intro: 11, w: W1,
      color: { pending: PAL.black, final: () => (d.rayR === rR && d.redR ? RED : PAL.blue) } });
  }
  for (let k = 11; k <= 20; k++) {
    dw.seg(`rayF${k}`, { intro: 11, w: k === 20 ? W_RAYO : W_RAY,
      color: { pending: PAL.black, final: () => (d.rayR === k && d.redR ? RED : PAL.blue) } });
  }
  for (let j = 0; j <= 9; j++) dw.link(`tsL${j}`, `rayF${9 - j}`);
  for (let j = 0; j <= 9; j++) dw.link(`tsR${j}`, `rayF${11 + j}`);

  // step 12: reactions (green, both diagrams)
  const noRF = (st) => !st.hideRF;
  dw.arrow('tot', { intro: 12, ...ARROW });
  dw.arrow('rAf', { intro: 12, when: noRF, ...ARROW });
  dw.arrow('rBf', { intro: 12, when: noRF, ...ARROW });
  dw.arrow('rA', { intro: 12, ...ARROW });
  dw.arrow('rB', { intro: 12, ...ARROW });
  dw.label('lbl_rAf', 'A', { cls: 'num', intro: 12, when: noRF, color: PAL.green });
  dw.label('lbl_rBf', 'B', { cls: 'num', intro: 12, when: noRF, color: PAL.green });
  dw.label('lbl_rA', 'A', { cls: 'num', intro: 12, color: PAL.green });
  dw.label('lbl_rB', 'B', { cls: 'num', intro: 12, color: PAL.green });
  dw.link('rA', 'rAf', 'lbl_rA', 'lbl_rAf');
  dw.link('rB', 'rBf', 'lbl_rB', 'lbl_rBf');

  // step 13: the stands / collapsed status (the applet's texts, verbatim)
  dw.label('stands', 'YOUR ARCH STILL STANDS',
           { cls: 'num', intro: 13, flash: false, color: PAL.green,
             when: (st, dd) => !dd.collapsed });
  dw.label('collapsed', 'YOUR ARCH JUST COLLAPSED !',
           { cls: 'num', intro: 13, flash: false, color: RED,
             when: (st, dd) => dd.collapsed });

  // resolve: internal-force pipes + readouts
  for (let j = 0; j <= 20; j++) {
    dw.poly(`if${j}`, 4, {
      intro: RESOLVE, opacity: 0.45, flash: false,
      color: { pending: PAL.grey, final: () => PAL.blue },
      when: (st) => st.o1,
    });
  }
  for (const nm of ['roW', 'roH']) {
    dw.label(nm, '', { intro: RESOLVE, flash: false, color: PAL.black });
  }

  // points
  const HANDLE = { r: 0.3 }, DERIVED = { r: 0.22 }, VERT = { r: 0.14 };
  const show = (st) => st.n4;
  const showTrial = (st) => st.n4 && trialW(st);
  dw.disk('pt_H4', { intro: 3, ...HANDLE, when: show });
  dw.disk('pt_R2', { intro: 3, ...DERIVED, when: show });
  dw.disk('pt_I4', { intro: 3, ...DERIVED, when: show });
  dw.disk('pt_S4', { intro: 3, ...DERIVED, when: show });
  dw.disk('pt_F2', { intro: 4, ...HANDLE, when: show });
  dw.disk('pt_o1p', { intro: 6, ...HANDLE, when: showTrial });
  dw.disk('pt_C10', { intro: 6, ...HANDLE, when: showTrial });
  dw.disk('pt_K10', { intro: 6, ...DERIVED, when: showTrial });
  dw.disk('pt_L10', { intro: 7, ...DERIVED, when: showTrial });
  dw.disk('pt_o2p', { intro: 8, ...HANDLE, when: showTrial });
  dw.disk('pt_N10', { intro: 8, ...HANDLE, when: showTrial });
  dw.disk('pt_V10', { intro: 8, ...DERIVED, when: showTrial });
  dw.disk('pt_D11', { intro: 8, ...DERIVED, when: showTrial });
  dw.disk('pt_E11', { intro: 8, ...DERIVED, when: show });
  for (let k = 0; k < 20; k++) dw.disk(`pt_v${k}`, { intro: k <= 9 ? 10 : 11, ...VERT, when: show });
  dw.disk('pt_exL', { intro: 10, ...VERT, when: show });
  dw.disk('pt_exR', { intro: 11, ...VERT, when: show });

  const letters = {
    o1p: ['o′₁', 6, PAL.grey, trialW], C10: ['C', 6, PAL.grey, trialW],
    L10: ['d₁', 7, PAL.black, trialW], o2p: ['o′₂', 8, PAL.grey, trialW],
    N10: ['N', 8, PAL.grey, trialW], D11: ['d₂', 8, PAL.black, trialW],
    E11: ['o', 8, PAL.black],
  };
  for (const [p, [text, intro, color, when]] of Object.entries(letters)) {
    dw.label(`lbl_${p}`, text, { cls: 'point', intro, color, when: when || show });
  }

  dw.ghostable(...[...Array(20)].map((_, i) => `ll${i}`),
               ...[...Array(21)].map((_, k) => `rayF${k}`),
               'tot', 'rAf', 'rBf');

  // node-equilibrium inspector along the thrust line
  dw.nodeInspector(3, { when: (st) => st.node > 0, w: 1.5 * W1, headLen: 0.9, headW: 0.36, r: 0.36 });
  const NODE_DISKS = ['pt_exL', ...[...Array(20)].map((_, k) => `pt_v${k}`), 'pt_exR'];
  const NODE_NAMES = ['A', ...[...Array(20)].map((_, k) => `${k + 1}`), 'B'];
  const vtx = (k) => (k <= 9 ? d.ptsL[9 - k] || d.exL : d.ptsR[k - 10] || d.exR);
  const nodeAt = NODE_DISKS.map((_, i) => () =>
    (i === 0 ? d.exL : i === 21 ? d.exR : vtx(i - 1)));
  // exit nodes: the reaction side uses the SAME coordinates as the drawn
  // green reaction vectors (E11->P[0] / P[20]->E11), so the inspector's
  // thick arrow lands exactly on them
  const nodePoly = (i) => {
    if (i === 0) return [[d.P[0], d.E11], [d.E11, d.P[0]]];
    if (i === 21) return [[d.E11, d.P[20]], [d.P[20], d.E11]];
    const k = i - 1;   // column k: load edge P[k]-P[k+1] + the two rays
    return [[d.P[k], d.P[k + 1]], [d.P[k + 1], d.E11], [d.E11, d.P[k]]];
  };

  function updateNode() {
    const i = Math.max(0, Math.min(NODE_DISKS.length - 1, Math.round(s.node) - 1));
    dw.selectDisk(s.node > 0 ? NODE_DISKS[i] : null);
    dw.setNodeInspector([18.5, 36.2], 2.6, `node ${NODE_NAMES[i]}`, nodePoly(i));
  }

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  const arcPts = (T, r, a0, a1, nseg) => {
    const pts = [];
    for (let i = 0; i <= nseg; i++) {
      const th = a0 + ((a1 - a0) * i) / nseg;
      pts.push(T([G[0] + r * Math.cos(th), G[1] + r * Math.sin(th)]));
    }
    return pts;
  };
  const pairsOf = (pts) => pts.slice(0, -1).map((p, i) => [p, pts[i + 1]]);
  const pad = (pairs, count, fill) => {
    const out = pairs.slice(0, count);
    while (out.length < count) out.push([fill, fill]);
    return out;
  };

  function update() {
    dw.setLabel('form_title', [16.5, 31.5]);
    dw.setLabel('force_title', [60.3, 31.5]);
    dw.setLabel('force_sub', [60.3, 30.3]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(2)} kN`);

    dw.setSeg('ground', [GROUND_X[0], 6], [GROUND_X[1], 6]);
    dw.setDashLine('semiE', arcPts(d.TID, RE, 0, Math.PI, 72));
    dw.setDashLine('semiI', arcPts(d.TID, RI, 0, Math.PI, 72));
    dw.setStrokes('origE', pairsOf(arcPts(d.TID, RE, 0, Math.PI, 48)));
    dw.setStrokes('origI', pairsOf(arcPts(d.TID, RI, 0, Math.PI, 48)));
    // grey original joints where the arch moves away: left joints 4..9,
    // all right joints + right springing
    const gj = [];
    for (let k = 4; k <= 9; k++) {
      const th = Math.PI - k * ANG;
      gj.push([onI(th), onE(th)]);
    }
    for (let k = 0; k <= 9; k++) {
      const th = k * ANG;
      gj.push([onI(th), onE(th)]);
    }
    dw.setStrokes('origJ', gj);
    // displaced arch arcs (left-bottom is the identity body)
    const a3 = THH;
    dw.setStrokes('aLBi', pairsOf(arcPts(d.TID, RI, Math.PI - a3, Math.PI, 12)));
    dw.setStrokes('aLBe', pairsOf(arcPts(d.TID, RE, Math.PI - a3, Math.PI, 12)));
    dw.setStrokes('aLUi', pairsOf(arcPts(d.TL, RI, Math.PI / 2, Math.PI - a3, 16)));
    dw.setStrokes('aLUe', pairsOf(arcPts(d.TL, RE, Math.PI / 2, Math.PI - a3, 16)));
    dw.setStrokes('aRUi', pairsOf(arcPts(d.TR, RI, a3, Math.PI / 2, 16)));
    dw.setStrokes('aRUe', pairsOf(arcPts(d.TR, RE, a3, Math.PI / 2, 16)));
    dw.setStrokes('aRBi', pairsOf(arcPts(d.TB, RI, 0, a3, 12)));
    dw.setStrokes('aRBe', pairsOf(arcPts(d.TB, RE, 0, a3, 12)));
    // joints + crack faces
    const j = [];
    j.push([onI(Math.PI), onE(Math.PI)]);                               // 0 springing L
    for (let k = 1; k <= 2; k++) {
      const th = Math.PI - k * ANG;
      j.push([onI(th), onE(th)]);                                       // 1,2
    }
    j.push([onI(Math.PI - a3), onE(Math.PI - a3)]);                     // 3 hinge face low
    j.push([R2, d.B5]);                                                 // 4 hinge face up
    for (let k = 4; k <= 9; k++) {
      const th = Math.PI - k * ANG;
      j.push([d.TL(onI(th)), d.TL(onE(th))]);                           // 5..10
    }
    j.push([d.V4, d.S4]);                                               // 11 crown face L
    j.push([d.D5, d.S4]);                                               // 12 crown face R
    for (let k = 9; k >= 4; k--) {
      const th = k * ANG;
      j.push([d.TR(onI(th)), d.TR(onE(th))]);                           // 13..18
    }
    j.push([d.I4, d.H5]);                                               // 19 hinge face up R
    j.push([d.I4, d.K5]);                                               // 20 hinge face low R
    for (let k = 2; k >= 1; k--) {
      const th = k * ANG;
      j.push([d.TB(onI(th)), d.TB(onE(th))]);                           // 21,22
    }
    j.push([d.H4, d.L5]);                                               // 23 springing R
    j.forEach((pr, i) => dw.setSeg(`bj${i}`, pr[0], pr[1]));
    dw.setDashLine('gap', [[48, 6], d.H4]);

    // centroid crosses + verticals + weights + load line
    const marks = [];
    const CR = 0.14;
    for (const c of d.cents) {
      marks.push([[c[0] - CR, c[1] - CR], [c[0] + CR, c[1] + CR]]);
      marks.push([[c[0] - CR, c[1] + CR], [c[0] + CR, c[1] - CR]]);
    }
    dw.setStrokes('cenMarks', marks);
    for (let i = 0; i < 20; i++) {
      dw.setDashLine(`cl${i}`, [[d.cols[i], Y_CL_B], [d.cols[i], Y_CL_T]]);
      dw.setArrow(`w${i}`, [d.cols[i], Y_WTIP + s.sLS], [d.cols[i], Y_WTIP]);
      dw.setSeg(`ll${i}`, d.P[i], d.P[i + 1]);
    }
    for (let jj = 0; jj <= 20; jj++) dw.setDisk(`pt_p${jj}`, d.P[jj]);

    // chords, trials, divisions, pole
    dw.setDashLine('chord1', [R2, d.S4]);
    dw.setDashLine('chord2', [d.S4, d.I4]);
    const crTop = Math.max(s.c10y, s.n10y) + 0.8;
    dw.setDashLine('vertCr', [[d.S4[0], 6], [d.S4[0], crTop]]);
    dw.setDashLine('vertR2', [[R2[0], 6], [R2[0], Math.max(d.K10[1], R2[1]) + 1.2]]);
    dw.setDashLine('vertI4', [[d.I4[0], 6], [d.I4[0], Math.max(d.V10[1], d.I4[1]) + 1.2]]);
    dw.setStrokes('tray1', [...Array(8)].map((_, k) => [s.o1p, d.P[3 + k]]));
    dw.setStrokes('tch1', pad(pairsOf(d.ch1), 8, d.K10));
    dw.setDashLine('close1', [d.C10, d.K10]);
    const ext = (a, b, e = 1.0) => V.add(b, V.mul(V.unit(V.sub(b, a)), e));
    dw.setDashLine('div1', [s.o1p, ext(s.o1p, d.L10)]);
    dw.setDashLine('par1', [d.L10, ext(d.L10, d.E11, 1.6)]);
    dw.setStrokes('tray2', [...Array(8)].map((_, k) => [s.o2p, d.P[10 + k]]));
    dw.setStrokes('tch2', pad(pairsOf(d.ch2), 8, d.V10));
    dw.setDashLine('close2', [d.N10, d.V10]);
    dw.setDashLine('div2', [s.o2p, ext(s.o2p, d.D11)]);
    dw.setDashLine('par2', [d.D11, ext(d.D11, d.E11, 1.6)]);

    // thrust line + rays
    const lv = [d.S4, ...d.ptsL, d.exL];    // crown -> left exit
    const rv = [d.S4, ...d.ptsR, d.exR];
    dw.setSeg('ts_c', d.ptsL[0] || d.S4, d.ptsR[0] || d.S4);
    for (let jj = 0; jj <= 9; jj++) {
      const a = lv[jj + 1] || d.exL, b = lv[jj + 2] || d.exL;
      dw.setSeg(`tsL${jj}`, a, b);
      const a2 = rv[jj + 1] || d.exR, b2 = rv[jj + 2] || d.exR;
      dw.setSeg(`tsR${jj}`, a2, b2);
    }
    for (let k = 0; k <= 20; k++) dw.setSeg(`rayF${k}`, d.E11, d.P[k]);

    // pipes: crown + each drawn segment, force = its ray / sFD
    dw.setPoly('if10', V.rectPoints(d.ptsL[0] || d.S4, d.ptsR[0] || d.S4, s.sIF * d.N[10]));
    for (let jj = 0; jj <= 9; jj++) {
      const a = lv[jj + 1] || d.exL, b = lv[jj + 2] || d.exL;
      dw.setPoly(`if${9 - jj}`, V.rectPoints(a, b, s.sIF * d.N[Math.max(0, 9 - jj)]));
      const a2 = rv[jj + 1] || d.exR, b2 = rv[jj + 2] || d.exR;
      dw.setPoly(`if${11 + jj}`, V.rectPoints(a2, b2, s.sIF * d.N[Math.min(20, 11 + jj)]));
    }

    // reactions
    dw.setArrow('tot', d.P[0], d.P[20]);
    dw.setArrow('rAf', d.E11, d.P[0]);
    dw.setArrow('rBf', d.P[20], d.E11);
    dw.setArrow('rA', d.tailA, d.exL);
    dw.setArrow('rB', d.tailB, d.exR);
    const lblAt = (a, b, off = 0.65) => {
      const u = V.unit(V.sub(b, a));
      return V.add(V.mid(a, b), V.mul(V.perp(u), off));
    };
    dw.setLabel('lbl_rAf', lblAt(d.E11, d.P[0], 0.7));
    dw.setLabel('lbl_rBf', lblAt(d.P[20], d.E11, 0.7));
    dw.setLabel('lbl_rA', V.add(V.mid(d.tailA, d.exL), [-0.75, 0]));
    dw.setLabel('lbl_rB', V.add(V.mid(d.tailB, d.exR), [0.8, 0]));

    // the applet's status text position (centre of the open span)
    dw.setLabel('stands', [35, 10.45]);
    dw.setLabel('collapsed', [35, 10.45]);

    // points + letters
    dw.setDisk('pt_H4', d.H4);
    dw.setDisk('pt_R2', R2);
    dw.setDisk('pt_I4', d.I4);
    dw.setDisk('pt_S4', d.S4);
    dw.setDisk('pt_F2', d.P[0]);
    dw.setDisk('pt_o1p', s.o1p);
    dw.setDisk('pt_C10', d.C10);
    dw.setDisk('pt_K10', d.K10);
    dw.setDisk('pt_L10', d.L10);
    dw.setDisk('pt_o2p', s.o2p);
    dw.setDisk('pt_N10', d.N10);
    dw.setDisk('pt_V10', d.V10);
    dw.setDisk('pt_D11', d.D11);
    dw.setDisk('pt_E11', d.E11);
    for (let k = 0; k < 20; k++) dw.setDisk(`pt_v${k}`, vtx(k));
    dw.setDisk('pt_exL', d.exL);
    dw.setDisk('pt_exR', d.exR);

    const pos = {
      o1p: V.add(s.o1p, [0.9, 0.5]), C10: V.add(d.C10, [-0.9, 0.4]),
      L10: V.add(d.L10, [1.0, 0.4]), o2p: V.add(s.o2p, [0.95, 0.4]),
      N10: V.add(d.N10, [-0.9, 0.4]), D11: V.add(d.D11, [1.0, 0.4]),
      E11: V.add(d.E11, [-0.55, 0.85]),
    };
    for (const p of Object.keys(letters)) dw.setLabel(`lbl_${p}`, pos[p]);

    dw.setLabel('roW', [66, 36.6]);
    dw.setText('roW', `W = ${d.W.toFixed(1)} kN`);
    dw.setLabel('roH', [66, 35.4]);
    dw.setText('roH', `H = ${d.Hthrust.toFixed(2)} kN`);
  }

  function refresh() {
    d = compute(s);
    s._k = player.k;
    update();
    updateNode();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  // ------------------------------------------------------------------
  // side panel + dragging
  // ------------------------------------------------------------------

  const view = panel.section('View');
  panel.button(view, 'zoom fit', () => dw.zoomFit());

  const par = panel.section('Parameters');
  panel.slider(par, s, 'dx', 'support spread', 0, 5.78, 0.02, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 0.5, 1, 0.05, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 1, 10, 0.25, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.1, 0.005, refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  panel.toggle(par, s, 'sh', 'show handles', refresh);
  panel.toggle(par, s, 'hideRF', 'hide reaction forces in force diagram', refresh);
  panel.toggle(par, s, 'o4', 'show construction lines', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off): 1 = left exit A, 2–21 = thrust-line nodes, 22 = right exit B',
               0, 22, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS, f2: [...DEFAULTS.f2], o1p: [...DEFAULTS.o1p], o2p: [...DEFAULTS.o2p] });
    panel.syncAll();
    refresh();
  });

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const hits = [
    ['H4', () => d.H4, 3, 99],
    ['F2', () => d.P[0], 4, 99],
    ['o1p', () => s.o1p, 6, 99],
    ['C10', () => d.C10, 6, 99],
    ['o2p', () => s.o2p, 8, 99],
    ['N10', () => d.N10, 8, 99],
  ];
  dw.enableDrag(
    (wx, wy, tol) => {
      let best = null;
      for (const [name, get, k0, k1] of hits) {
        if (player.k < k0 || player.k >= k1) continue;
        if (name !== 'H4' && !trialW(s) && name !== 'F2') continue;
        const p = get();
        const dd = Math.hypot(p[0] - wx, p[1] - wy);
        if (dd < tol) { best = name; tol = dd; }
      }
      return best;
    },
    (name, wx, wy) => {
      if (name === 'H4') { s.dx = clamp(wx - 48, 0, 5.788); panel.syncAll(); }
      else if (name === 'F2') s.f2 = [clamp(wx, 62, 74.5), clamp(wy, 24, 31.5)];
      else if (name === 'o1p') s.o1p = [clamp(wx, 71, 77.2), clamp(wy, 18, 33)];
      else if (name === 'C10') s.c10y = clamp(wy, 30, 39.5);
      else if (name === 'o2p') s.o2p = [clamp(wx, 71, 77.2), clamp(wy, 1.5, 24)];
      else if (name === 'N10') s.n10y = clamp(wy, 30, 39.5);
      refresh();
    },
  );

  // click a node point of the thrust line to inspect it; the panel slider
  // stays in sync
  dw.nodeSelect(nodeAt.map((at) => ({ at })), (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
