/**
 * Runtime for views converted from the ORIGINAL GeoGebra applets by
 * tools/convert.py. Unlike the legacy staticview.js (dump replay with invented
 * grouping), this replays the applet's own `step` logic: every element carries
 * a visibility bitmask evaluated from its original condition, so form and
 * force diagram appear IN SYNC and temporary helpers vanish after their step,
 * exactly as in the original application.
 *
 * Element encodings (produced by the converter):
 *   ['p', x, y, label, style, mask]        point ('w' handle / 'g' derived)
 *   ['s', [x0,y0,x1,y1], hex, th, dash, mask]   segment (dash=1: dashed)
 *   ['a', [x0,y0,x1,y1], hex, th, mask]         vector, view_1-style arrow
 *   ['l', [[x,y],...], hex, th, dash, mask]     polyline
 *   ['c', [cx,cy,r], hex, th, dash, mask]       circle outline
 *   ['g', [[x,y],...], hex, opacity, mask]      filled region
 *   ['t', x, y, text, mask]                     text label
 *
 * mask bit k (1..meta.steps) = visible at step k; bit 0 = visible in the
 * complete drawing (the applet's step = 0 state). Player step indices:
 * 0 = intro card (blank), 1..N = applet steps, N+1 = complete drawing.
 */

import { PAL } from './eqdraw.js';

// converted views carry the old baked tension red; remap it to the palette
const fixColor = (c) => (c === 0xA52B30 ? PAL.red : c);

/** True for segments/polylines that lie ON the GeoGebra export frame (the
    black boundary rectangle + ground line) -- never draw those. */
export function isFrameArt(pts, frame) {
  const [[x0, y0], [x1, y1]] = frame;
  const eps = 0.02;
  const edge = (a, b) =>
    (Math.abs(a[0] - x0) < eps && Math.abs(b[0] - x0) < eps)
    || (Math.abs(a[0] - x1) < eps && Math.abs(b[0] - x1) < eps)
    || (Math.abs(a[1] - y0) < eps && Math.abs(b[1] - y0) < eps)
    || (Math.abs(a[1] - y1) < eps && Math.abs(b[1] - y1) < eps);
  for (let i = 0; i < pts.length - 1; i++) {
    if (!edge(pts[i], pts[i + 1])) return false;
  }
  return pts.length > 1;
}

export function createStep(dw, panel, makePlayer, meta, elements) {
  const W = meta.frame[1][0] - meta.frame[0][0];
  const N = meta.steps;

  // uniform weights, proportional to view_1 (frame width 132.6, seg w 0.4,
  // arrow w 0.55 / headLen 1.7 / headW 0.65, dash 0.9)
  const wSeg = 0.0030 * W, wThin = 0.0015 * W;
  const wArrow = 0.0041 * W, headLen = 0.0128 * W, headW = 0.0049 * W;
  const dashLen = 0.0068 * W;
  const rHandle = 0.0035 * W, rDerived = 0.0022 * W;

  const segW = (th) => (th <= 1 ? wThin : th <= 4 ? wSeg : wSeg * 1.5);

  // player step j -> mask bit: 1..N applet steps, N+1 complete (bit 0)
  const bitOf = (j) => (j <= 0 ? -1 : j <= N ? j : 0);
  const visAt = (mask, j) => {
    const b = bitOf(j);
    return b >= 0 && ((mask >>> b) & 1) === 1;
  };
  const firstStep = (mask) => {
    for (let j = 1; j <= N + 1; j++) if (visAt(mask, j)) return j;
    return N + 1;
  };

  const steps = [
    { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  ];
  for (let k = 1; k <= N; k++) steps.push({ t: `Step ${k}`, d: `construction step ${k} of ${N}` });
  steps.push({ t: 'Done', d: 'the complete drawing' });

  elements.forEach((el, i) => {
    const name = `e${i}`;
    const [kind] = el;
    const mask = el[el.length - 1];
    const intro = firstStep(mask);
    const when = (st) => visAt(mask, st.k);
    const z = 0.0008 * i;

    if (kind === 'p') {
      const derived = el[4] === 'g';
      dw.disk(name, {
        intro, when, z: 0.35 + 0.0002 * i,
        r: derived ? rDerived : rHandle,
        face: derived ? PAL.grey : PAL.white,
        edge: derived ? PAL.grey : PAL.black,
      });
      dw.setDisk(name, [el[1], el[2]]);
      if (el[3]) {
        dw.label(`${name}t`, el[3], { cls: 'point', intro, when });
        dw.setLabel(`${name}t`, [el[1] + 0.008 * W, el[2] + 0.007 * W]);
      }
    } else if (kind === 's') {
      const [, seg, rawColor, th, dash] = el;
      const color = fixColor(rawColor);
      const pts = [[seg[0], seg[1]], [seg[2], seg[3]]];
      if (isFrameArt(pts, meta.frame)) return;
      if (dash) {
        dw.dashLine(name, { intro, when, z, color, dash: dashLen });
        dw.setDashLine(name, pts);
      } else {
        dw.seg(name, { intro, when, z, w: segW(th), color });
        dw.setSeg(name, pts[0], pts[1]);
      }
    } else if (kind === 'a') {
      const [, seg, rawColor, th] = el;
      const color = fixColor(rawColor);
      dw.arrow(name, {
        intro, when, z: 0.1 + z, color,
        w: th >= 7 ? wArrow * 1.3 : wArrow, headLen, headW,
      });
      dw.setArrow(name, [seg[0], seg[1]], [seg[2], seg[3]]);
    } else if (kind === 'l') {
      const [, pts, rawColor, th, dash] = el;
      const color = fixColor(rawColor);
      if (isFrameArt(pts, meta.frame)) return;
      if (dash) {
        dw.dashLine(name, { intro, when, z, color, dash: dashLen });
        dw.setDashLine(name, pts);
      } else {
        dw.strokes(name, pts.length - 1, { intro, when, z, w: segW(th), color });
        const pairs = [];
        for (let j = 0; j < pts.length - 1; j++) pairs.push([pts[j], pts[j + 1]]);
        dw.setStrokes(name, pairs);
      }
    } else if (kind === 'c') {
      const [, [cx, cy, r], rawColor, , dash] = el;
      const color = fixColor(rawColor);
      if (dash) {
        dw.dashedCircle(name, { intro, when, z, color, dash: dashLen });
        dw.setDashedCircle(name, [cx, cy], r);
      } else {
        dw.circle(name, { intro, when, z, color });
        dw.setCircle(name, [cx, cy], r);
      }
    } else if (kind === 'g') {
      const [, pts, rawColor, opacity] = el;
      const color = fixColor(rawColor);
      dw.poly(name, pts.length, { intro, when, z: z * 0.5, color, opacity });
      dw.setPoly(name, pts);
    } else if (kind === 't') {
      const [, x, y, text] = el;
      text.split('\n').forEach((line, li) => {
        const lname = `${name}t${li}`;
        dw.label(lname, line, { intro, when });
        dw.setLabel(lname, [x + 0.004 * W, y - 0.016 * W * li]);
      });
    }
  });

  const player = makePlayer(steps, () => player.apply({}, { k: player.k }));

  const view = panel.section('View');
  panel.button(view, 'zoom fit', () => dw.zoomFit());

  player.set(player.k);
  return player;
}
