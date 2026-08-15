/**
 * Polygon helpers for the views that draw MATERIAL rather than centrelines.
 *
 * From EX 8 onwards the sheets stop drawing structures as lines and start
 * drawing them as concrete with a thickness, and the interesting question
 * becomes whether the thrust line stays inside it. That needs three things
 * these views all want: a point-in-polygon test, a distance-to-polygon, and a
 * way to feed a ring to `dw.poly` without wrecking its triangulation.
 */

/**
 * Bring a ring up to exactly n vertices WITHOUT repeating any of them.
 *
 * `dw.poly` allocates a fixed vertex count and ear-clips whatever it is given.
 * Ear clipping across a run of coincident points produces a triangulation that
 * spills outside the shape -- which turned the L of a portal frame into a
 * solid block the first time this was tried. Splitting the longest edge
 * instead keeps every vertex distinct and leaves the outline identical.
 */
export function padRing(ring, n) {
  const r = ring.map((p) => [...p]);
  while (r.length < n) {
    let bi = 0, bl = -1;
    for (let i = 0; i < r.length; i++) {
      const j = (i + 1) % r.length;
      const L = Math.hypot(r[j][0] - r[i][0], r[j][1] - r[i][1]);
      if (L > bl) { bl = L; bi = i; }
    }
    const j = (bi + 1) % r.length;
    r.splice(bi + 1, 0, [(r[bi][0] + r[j][0]) / 2, (r[bi][1] + r[j][1]) / 2]);
  }
  return r.slice(0, n);
}

/** Crossing-number test. `poly` is a closed ring; the last point may repeat. */
export function inside(p, poly) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > p[1]) !== (yj > p[1])
        && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

/** The nearest point on a ring's boundary to p, and how far away it is. */
export function nearestOn(p, ring) {
  let best = null, bd = Infinity;
  for (let i = 0; i < ring.length; i++) {
    const a = ring[i], b = ring[(i + 1) % ring.length];
    const abx = b[0] - a[0], aby = b[1] - a[1];
    const L2 = abx * abx + aby * aby || 1e-12;
    const t = Math.max(0, Math.min(1,
      ((p[0] - a[0]) * abx + (p[1] - a[1]) * aby) / L2));
    const q = [a[0] + abx * t, a[1] + aby * t];
    const d = Math.hypot(p[0] - q[0], p[1] - q[1]);
    if (d < bd) { bd = d; best = q; }
  }
  return { point: best, dist: bd };
}

/**
 * Walk a polyline and find the point on it that is furthest OUTSIDE a ring.
 *
 * This is the question EX 8 keeps asking: the thrust line is where it is, the
 * concrete is where it is, and the drawing has to say by how much they miss.
 * Returns `{ at, to, dist }`, all null when the line never leaves.
 */
export function furthestOutside(line, ring, samples = 160) {
  let out = { at: null, to: null, dist: 0 };
  let total = 0;
  for (let i = 0; i < line.length - 1; i++) {
    total += Math.hypot(line[i + 1][0] - line[i][0], line[i + 1][1] - line[i][1]);
  }
  if (total <= 0) return out;
  let acc = 0;
  for (let i = 0; i < line.length - 1; i++) {
    const a = line[i], b = line[i + 1];
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const n = Math.max(2, Math.round((samples * L) / total));
    for (let k = 0; k <= n; k++) {
      const p = [a[0] + ((b[0] - a[0]) * k) / n, a[1] + ((b[1] - a[1]) * k) / n];
      if (inside(p, ring)) continue;
      const near = nearestOn(p, ring);
      if (near.dist > out.dist) out = { at: p, to: near.point, dist: near.dist };
    }
    acc += L;
  }
  return out;
}
