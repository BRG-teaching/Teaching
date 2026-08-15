/**
 * A small pin-jointed truss engine, shared by the EX 6 views.
 *
 * Everything the course asks for about a truss comes out of one linear system:
 * two equilibrium equations per joint, with the member forces and the support
 * reactions as unknowns. Solve that once and the member forces, the reactions,
 * the zero-force members and the determinacy count all follow.
 *
 * SIGN CONVENTION: a member force is POSITIVE in tension. A positive force
 * therefore pulls each of its two joints toward the other one.
 *
 * A joint's own force polygon (which is what the sheets ask a student to draw)
 * is just the list of vectors acting ON that joint: for each member, its force
 * times the unit vector pointing from the joint toward the far end; plus any
 * load and any reaction. Those vectors close, and `polygonAt` returns them in
 * an order that draws a tidy convex-ish polygon.
 */

/** Solve A x = b by Gaussian elimination with partial pivoting. */
function solve(A, b) {
  const n = b.length;
  const M = A.map((row, i) => [...row, b[i]]);
  const cols = A[0].length;
  const where = new Array(cols).fill(-1);
  let row = 0;
  for (let col = 0; col < cols && row < n; col++) {
    let piv = row;
    for (let i = row; i < n; i++) if (Math.abs(M[i][col]) > Math.abs(M[piv][col])) piv = i;
    if (Math.abs(M[piv][col]) < 1e-9) continue;
    [M[row], M[piv]] = [M[piv], M[row]];
    for (let i = 0; i < n; i++) {
      if (i === row) continue;
      const f = M[i][col] / M[row][col];
      for (let j = col; j <= cols; j++) M[i][j] -= f * M[row][j];
    }
    where[col] = row;
    row++;
  }
  const x = new Array(cols).fill(0);
  for (let c = 0; c < cols; c++) if (where[c] >= 0) x[c] = M[where[c]][cols] / M[where[c]][c];
  return x;
}

/**
 * nodes    [[x, y], ...]                       joint coordinates
 * members  [[i, j], ...]                       joint index pairs
 * supports { i: 'pin' | 'roller-v' | 'roller-h' , ... }
 *            roller-v resists VERTICAL only (a roller on the ground)
 *            roller-h resists HORIZONTAL only (a roller on a wall)
 * loads    { i: [fx, fy], ... }                applied at joints
 */
export function analyse({ nodes, members, supports, loads = {} }) {
  const nn = nodes.length, nm = members.length;
  // unknown vector: [member forces..., then one entry per reaction component]
  const rmap = [];
  for (const [k, kind] of Object.entries(supports)) {
    const i = +k;
    if (kind === 'pin') rmap.push([i, 'x'], [i, 'y']);
    else if (kind === 'roller-v') rmap.push([i, 'y']);
    else rmap.push([i, 'x']);
  }
  const nu = nm + rmap.length;
  const A = Array.from({ length: 2 * nn }, () => new Array(nu).fill(0));
  const b = new Array(2 * nn).fill(0);
  members.forEach(([i, j], m) => {
    const dx = nodes[j][0] - nodes[i][0], dy = nodes[j][1] - nodes[i][1];
    const L = Math.hypot(dx, dy) || 1e-9;
    const ux = dx / L, uy = dy / L;
    // tension pulls joint i toward j, and joint j toward i
    A[2 * i][m] += ux; A[2 * i + 1][m] += uy;
    A[2 * j][m] -= ux; A[2 * j + 1][m] -= uy;
  });
  rmap.forEach(([i, ax], r) => { A[2 * i + (ax === 'y' ? 1 : 0)][nm + r] += 1; });
  for (const [k, [fx, fy]] of Object.entries(loads)) {
    b[2 * +k] -= fx; b[2 * +k + 1] -= fy;
  }
  const x = solve(A, b);
  const forces = x.slice(0, nm);
  const reactions = {};
  rmap.forEach(([i, ax], r) => {
    reactions[i] = reactions[i] || [0, 0];
    reactions[i][ax === 'y' ? 1 : 0] = x[nm + r];
  });
  // residual: how well equilibrium actually closes, as a sanity number
  let resid = 0;
  for (let e = 0; e < 2 * nn; e++) {
    let v = -b[e];
    for (let u = 0; u < nu; u++) v += A[e][u] * x[u];
    resid = Math.max(resid, Math.abs(v));
  }
  const zero = forces.map((f) => Math.abs(f) < 1e-7);
  const det = nm + rmap.length - 2 * nn;      // 0 = determinate
  // an order in which each joint has at most two not-yet-known members
  const known = new Array(nm).fill(false);
  const order = [];
  const done = new Set();
  for (let pass = 0; pass < nn + 2 && order.length < nn; pass++) {
    for (let i = 0; i < nn; i++) {
      if (done.has(i)) continue;
      const at = members.map((mm, m) => [mm, m]).filter(([mm]) => mm[0] === i || mm[1] === i);
      const unknown = at.filter(([, m]) => !known[m]);
      if (unknown.length <= 2) {
        order.push({ node: i, solved: unknown.map(([, m]) => m) });
        unknown.forEach(([, m]) => { known[m] = true; });
        done.add(i);
      }
    }
  }
  for (let i = 0; i < nn; i++) if (!done.has(i)) order.push({ node: i, solved: [] });
  return { forces, reactions, zero, det, resid, order,
           nm, nn, nr: rmap.length,
           tmax: Math.max(0, ...forces), cmax: Math.min(0, ...forces) };
}

/** The vectors acting ON joint i, in a sensible drawing order. */
export function polygonAt(model, res, i) {
  const { nodes, members, loads = {} } = model;
  const out = [];
  if (loads[i]) out.push({ kind: 'load', v: loads[i].slice() });
  if (res.reactions[i]) out.push({ kind: 'reaction', v: res.reactions[i].slice() });
  members.forEach(([a, b], m) => {
    if (a !== i && b !== i) return;
    const j = a === i ? b : a;
    const dx = nodes[j][0] - nodes[i][0], dy = nodes[j][1] - nodes[i][1];
    const L = Math.hypot(dx, dy) || 1e-9;
    out.push({ kind: 'member', m, v: [(dx / L) * res.forces[m], (dy / L) * res.forces[m]] });
  });
  // going round by direction makes the polygon convex and easy to read
  out.sort((p, q) => Math.atan2(p.v[1], p.v[0]) - Math.atan2(q.v[1], q.v[0]));
  return out;
}

/** Chain a polygon's vectors tip to tail from a starting point. */
export function chain(start, parts, scale) {
  const pts = [start.slice()];
  for (const p of parts) {
    const last = pts[pts.length - 1];
    pts.push([last[0] + p.v[0] * scale, last[1] + p.v[1] * scale]);
  }
  return pts;
}
