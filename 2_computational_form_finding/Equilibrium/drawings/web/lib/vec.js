/**
 * 2D vector math + GeoGebra semantics for the eQUILIBRIUM drawings.
 * Points/vectors are plain [x, y] arrays; mirrors the helpers of ggb2compas.py.
 */

export const TAU = Math.PI * 2;
export const rad = (d) => (d * Math.PI) / 180;

export const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
export const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
export const mul = (a, s) => [a[0] * s, a[1] * s];
export const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
export const cross = (a, b) => a[0] * b[1] - a[1] * b[0];
export const len = (a) => Math.hypot(a[0], a[1]);
export const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
export const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
export const perp = (a) => [-a[1], a[0]];

export function unit(a) {
  const l = len(a);
  return l > 1e-12 ? [a[0] / l, a[1] / l] : [1, 0];
}

/** Reflect point p across the (infinite) line through a and b. */
export function mirror(p, a, b) {
  const d = unit(sub(b, a));
  const foot = add(a, mul(d, dot(sub(p, a), d)));
  return sub(mul(foot, 2), p);
}

/** Intersection of line (p1, dir d1) with line (p2, dir d2); null if parallel. */
export function intersect(p1, d1, p2, d2) {
  const den = cross(d1, d2);
  if (Math.abs(den) < 1e-12) return null;
  const t = cross(sub(p2, p1), d2) / den;
  return add(p1, mul(d1, t));
}

/** GeoGebra Angle[line1, line2]: ccw angle from u to v in [0, 2pi). */
export function ggbAngle(u, v) {
  const a = Math.atan2(cross(u, v), dot(u, v));
  return ((a % TAU) + TAU) % TAU;
}

/** GeoGebra dynamic-color triangle wave (GeoElement.getRGBFromList), period 2. */
export function ggbComponent(v) {
  const t = v / 2 - Math.floor(v / 2);
  return t > 0.5 ? 2 * (1 - t) : 2 * t;
}

/** Dynamic color (w - pi, 0, w): blue channel >= red channel means compression. */
export const isCompression = (w) => ggbComponent(w) >= ggbComponent(w - Math.PI);

/** Rectangle of the internalForce macro: along node->end, given half-width.
    Every call site is an internal-force pipe; PIPE_SCALE is the 2026-08-14
    restyle's global width regrade -- pipes are now OPAQUE members thickened
    ∝ |force| (video style), so the old translucent-halo widths are halved. */
const PIPE_SCALE = 0.5;
export function rectPoints(node, end, halfwidth) {
  const off = mul(perp(unit(sub(end, node))), Math.max(halfwidth * PIPE_SCALE, 1e-4));
  return [sub(node, off), add(node, off), add(end, off), sub(end, off)];
}

/**
 * Evenly spaced hatch strokes along a base line, for a support or a ground.
 *
 * Drawn by hand, hatching is a run of identical parallel strokes raked at 45
 * degrees away from the material. Every view was building its own by hand and
 * they all came out slightly different — different lengths, different spacing,
 * sometimes fanning. This makes one shape and everybody uses it.
 *
 *   a, b   the base line, material on ONE side of it
 *   side   +1 if the material is on the left of a -> b, -1 if on the right
 *   len    stroke length in drawing units
 *   n      how many strokes; omit to get one roughly every `len` of base
 *
 * Returns the [[from, to], ...] pairs that setStrokes() wants.
 */
export function hatch(a, b, side = -1, len = 1.0, n = 0) {
  const u = unit(sub(b, a));
  const L = dist(a, b);
  const count = n || Math.max(2, Math.round(L / (len * 0.85)));
  const out = [];
  // 45 degrees between the outward normal and the backward tangent
  const nout = mul(perp(u), -side);
  const d = mul(unit(add(nout, mul(u, -1))), len);
  // inset by half a step so the run sits inside the base line, not past it
  const step = L / count;
  for (let i = 0; i < count; i++) {
    const p = add(a, mul(u, step * (i + 0.5) + step * 0.5));
    out.push([p, add(p, d)]);
  }
  return out;
}
