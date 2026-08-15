/**
 * THE CREMONA (MAXWELL RECIPROCAL) DIAGRAM OF A PLANE TRUSS.
 *
 * A joint force polygon says one true thing about one joint. A Cremona says
 * the same thing about every joint AT ONCE, in a single figure, by letting
 * neighbouring joints share the edges they have in common. That sharing is the
 * whole subject: it is what makes the force diagram a DRAWING of the structure
 * rather than a pile of arithmetic, and it is what the EX 6 solution sheets
 * draw. This module builds it from nothing but the form diagram, the member
 * forces and the reactions.
 *
 * ---------------------------------------------------------------------------
 * BOW'S NOTATION, WHICH IS THE WHOLE TRICK
 * ---------------------------------------------------------------------------
 * Do not name the members. Name the SPACES between them.
 *
 *   · The form diagram is a planar graph, so it cuts the plane into faces: one
 *     face per triangular panel inside the truss, plus the region outside.
 *   · The external forces (the loads and the reactions) cut the outside region
 *     into as many outer spaces as there are external forces: going round the
 *     structure, each force you step over puts you into the next outer space.
 *   · Every member is the wall between exactly two spaces. Every external force
 *     is the wall between exactly two outer spaces.
 *
 * The reciprocal figure gives each SPACE one POINT. Then:
 *
 *     the segment joining the two points either side of a wall
 *     IS the force in that wall — parallel to it, and to scale.
 *
 * A member carrying nothing is a wall with the same point on both sides: the
 * two spaces coincide, the segment has zero length. That is not a failure of
 * the drawing, it is the drawing saying "zero" in its own language.
 *
 * ---------------------------------------------------------------------------
 * THE SIGN RULE, DERIVED RATHER THAN GUESSED
 * ---------------------------------------------------------------------------
 * Give every wall a direction: a member i-j is walked from i to j, an external
 * force is walked along its own arrow. Then the single rule that makes every
 * joint close is
 *
 *     p(space on the RIGHT) − p(space on the LEFT)  =  the force vector
 *
 * where "the force vector" is f·unit(i→j) for a member (positive f = tension,
 * so it pulls joint i toward j) and the force itself for an external load or
 * reaction, and left/right are taken looking along the wall's direction.
 *
 * Why it closes. Walk anticlockwise round one joint. The rays leaving the joint
 * — its members, and its external force if it has one — cut the neighbourhood
 * of the joint into wedges, one per space touching it. Crossing a ray
 * anticlockwise takes you from its right side to its left side, so it adds
 * −(that force) to the running point; going all the way round returns you to
 * the wedge you started in, so the sum of the forces at the joint is zero. That
 * is joint equilibrium, and it is the ONLY thing the rule asserts. Conversely,
 * because every joint is in equilibrium the rule is consistent: the point of a
 * space comes out the same however you walk to it.
 *
 * The rule is also symmetric in i and j — swap them and both the direction and
 * the "force vector" flip — so a member's segment does not depend on which end
 * you call the start. Nothing here is a convention that could be got backwards
 * without the picture falling apart; that is exactly why it is worth deriving.
 *
 * Applied to the outer spaces alone, the rule says: walk clockwise round the
 * outside of the structure and lay the external forces tip to tail in the order
 * you meet them. That chain IS the load line — loads down one side, reactions
 * back up the other — and it closes because the structure as a whole is in
 * equilibrium. Everything else hangs off it.
 *
 * ---------------------------------------------------------------------------
 * HOW THE FACES ARE FOUND
 * ---------------------------------------------------------------------------
 * From the planar embedding, with no geometry beyond the joint coordinates.
 * Sort the members at each joint by angle; then from a directed edge u→v the
 * next edge of the same face is the one at v that follows v→u in CLOCKWISE
 * order. Tracing that permutation splits the 2·S half-edges into cycles, one
 * per face, with the face always on the LEFT of its half-edges. Bounded faces
 * come out anticlockwise (positive signed area); the unbounded one comes out
 * clockwise, which is how it is identified — and how the clockwise walk round
 * the outside that builds the load line falls out for free.
 *
 * This assumes the form diagram is drawn WITHOUT crossings (a planar embedding)
 * and is connected. An X-braced panel whose diagonals cross without a joint has
 * no reciprocal figure at all, which is a real fact about it, not a limitation
 * here. Loads are assumed to act at joints on the outer boundary; a load hung
 * on an interior joint would have nowhere to cut.
 *
 * ---------------------------------------------------------------------------
 * WHAT COMES BACK
 * ---------------------------------------------------------------------------
 * `cremona(model, res)` returns, with every point in FORCE UNITS (kN — the view
 * divides by its own force scale to get world units):
 *
 *   pts       [[x, y], ...]        one point per space
 *   nOuter    how many of them are outer spaces; they are pts[0 … nOuter-1],
 *             in order clockwise round the structure, so they are the load line
 *   name      ['a', 'b', … , '1', '2', …]  Bow's label of each space: letters
 *             outside, numbers inside
 *   seg       one per member: { left, right } — pts[right] − pts[left] is that
 *             member's force, drawn parallel to it. Zero length ⇔ zero force.
 *   ext       one per external force: { node, kind, v, from, to } — the arrow
 *             pts[from] → pts[to] is that load or reaction, drawn to scale and
 *             pointing the way the force actually points
 *   ring      per joint: the closed cycle of space points round it, i.e. that
 *             joint's own force polygon, sitting inside the shared figure
 *   stage     per space: which entry of `res.order` fixes it (−1 = fixed by the
 *             load line, before any joint is touched)
 *   read      per member: the force READ BACK off the finished diagram, signed.
 *             Compare it with res.forces — that comparison is the proof.
 *   err       the largest |read − forces| anywhere. Must be ~1e-12.
 *   spaceAt   per joint: the spaces touching it (for labelling)
 */

/**
 * The planar embedding: half-edges, their faces, and which face is unbounded.
 * Half-edge 2m is member m walked i→j, half-edge 2m+1 is the same member walked
 * j→i. The face of a half-edge is the face on its LEFT.
 */
export function embed({ nodes, members }) {
  const nn = nodes.length, nm = members.length;
  const tail = (h) => (h % 2 === 0 ? members[h >> 1][0] : members[h >> 1][1]);
  const head = (h) => (h % 2 === 0 ? members[h >> 1][1] : members[h >> 1][0]);
  const twin = (h) => h ^ 1;
  const dir = (h) => {
    const a = nodes[tail(h)], b = nodes[head(h)];
    return Math.atan2(b[1] - a[1], b[0] - a[0]);
  };
  const out = Array.from({ length: nn }, () => []);
  members.forEach(([i, j], m) => { out[i].push(2 * m); out[j].push(2 * m + 1); });
  for (const lst of out) lst.sort((p, q) => dir(p) - dir(q));      // anticlockwise
  const slot = new Map();
  out.forEach((lst) => lst.forEach((h, k) => slot.set(h, k)));
  // the next half-edge of the same face: at v, the neighbour one step CLOCKWISE
  // from the way we came in
  const next = (h) => {
    const lst = out[head(h)];
    return lst[(slot.get(twin(h)) - 1 + lst.length) % lst.length];
  };

  const faceOf = new Array(2 * nm).fill(-1);
  const cycles = [];
  for (let h = 0; h < 2 * nm; h++) {
    if (faceOf[h] >= 0) continue;
    const f = cycles.length, cyc = [];
    let g = h;
    do { faceOf[g] = f; cyc.push(g); g = next(g); } while (g !== h);
    cycles.push(cyc);
  }
  const area = (cyc) => {
    let a = 0;
    for (const g of cyc) {
      const p = nodes[tail(g)], q = nodes[head(g)];
      a += p[0] * q[1] - q[0] * p[1];
    }
    return a / 2;
  };
  let outer = 0;
  cycles.forEach((c, f) => { if (area(c) < area(cycles[outer])) outer = f; });
  return { out, slot, tail, head, twin, next, dir, faceOf, cycles, outer, area };
}


/** The external forces acting at joint i: its load, and its reaction. */
function externalsAt(i, loads, reactions) {
  const e = [];
  if (loads[i]) e.push({ node: i, kind: 'load', v: loads[i].slice() });
  if (reactions[i]) e.push({ node: i, kind: 'reaction', v: reactions[i].slice() });
  return e;
}


export function cremona(model, res) {
  const { nodes, members, loads = {} } = model;
  const reactions = res.reactions || {};
  const nm = members.length;
  const E = embed(model);

  const uOf = members.map(([i, j]) => {
    const dx = nodes[j][0] - nodes[i][0], dy = nodes[j][1] - nodes[i][1];
    const L = Math.hypot(dx, dy) || 1e-12;
    return [dx / L, dy / L];
  });

  // ---------------------------------------------------------------- spaces --
  // The outer face is cut into one space per external force. Walk its boundary
  // — which the embedding hands us CLOCKWISE round the structure — and start a
  // new space each time the joint we arrive at carries an external force.
  const ring0 = E.cycles[E.outer];
  const M = ring0.length;
  const extAt = nodes.map((_, i) => externalsAt(i, loads, reactions));
  let start = -1;
  for (let t = 0; t < M; t++) if (extAt[E.head(ring0[t])].length) { start = t; break; }
  if (start < 0) throw new Error('cremona: the structure carries no external forces');

  const spaceOfHalf = new Map();       // outer half-edge -> outer space index
  const ext = [];                      // external forces, in order round the outside
  const outerPts = [[0, 0]];           // the load line, laid tip to tail
  let cur = 0;
  for (let n = 0; n < M; n++) {
    const h = ring0[(start + 1 + n) % M];
    spaceOfHalf.set(h, cur);
    const v = E.head(h);
    const here = extAt[v];
    if (!here.length) continue;
    // Crossed clockwise, from the space at the anticlockwise END of this
    // joint's outer wedge to the one at its start; sort them that way when a
    // joint carries both a load and a reaction.
    const base = Math.atan2(nodes[E.tail(h)][1] - nodes[v][1],
                            nodes[E.tail(h)][0] - nodes[v][0]);
    const cw = (w) => {
      const a = base - Math.atan2(w[1], w[0]);
      return ((a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    };
    const sorted = here.length > 1 ? [...here].sort((p, q) => cw(p.v) - cw(q.v)) : here;
    sorted.forEach((e, q) => {
      const from = cur;
      const p = outerPts[from];
      // the last force of the last joint closes the load line back onto its
      // start — it must, because the whole structure is in equilibrium
      const last = n === M - 1 && q === sorted.length - 1;
      const to = last ? 0 : outerPts.push([p[0] + e.v[0], p[1] + e.v[1]]) - 1;
      ext.push({ ...e, from, to });
      cur = to;
    });
  }
  const nOuter = outerPts.length;
  if (nOuter !== ext.length) {
    throw new Error(`cremona: ${ext.length} external forces gave ${nOuter} outer spaces`);
  }

  // interior faces keep their embedding index, renumbered after the outer ones
  const innerIx = new Map();
  E.cycles.forEach((c, f) => { if (f !== E.outer) innerIx.set(f, nOuter + innerIx.size); });
  const nf = nOuter + innerIx.size;
  const spaceOf = (h) => (E.faceOf[h] === E.outer ? spaceOfHalf.get(h)
                                                  : innerIx.get(E.faceOf[h]));

  // ---------------------------------------------------------------- points --
  const pts = new Array(nf).fill(null);
  outerPts.forEach((p, k) => { pts[k] = p; });

  const seg = members.map((mm, m) => ({ left: spaceOf(2 * m), right: spaceOf(2 * m + 1) }));
  const atNode = nodes.map(() => []);
  members.forEach(([i, j], m) => { atNode[i].push(m); atNode[j].push(m); });

  const relax = (ms) => {
    let moved = true, any = [];
    while (moved) {
      moved = false;
      for (const m of ms) {
        const { left, right } = seg[m];
        const f = res.forces[m], u = uOf[m];
        if (pts[left] && !pts[right]) {
          pts[right] = [pts[left][0] + f * u[0], pts[left][1] + f * u[1]];
          any.push(right); moved = true;
        } else if (pts[right] && !pts[left]) {
          pts[left] = [pts[right][0] - f * u[0], pts[right][1] - f * u[1]];
          any.push(left); moved = true;
        }
      }
    }
    return any;
  };

  // Fix the remaining points the way a student does: joint by joint, in the
  // order `analyse` found — each joint having at most two unknown members, its
  // point is the crossing of two lines drawn parallel to them through points
  // already on the paper.
  const stage = new Array(nf).fill(-1);
  const order = (res.order || []).map((o) => ({ node: o.node, spaces: [] }));
  order.forEach((o, k) => {
    for (const f of relax(atNode[o.node])) { o.spaces.push(f); stage[f] = k; }
  });
  const late = relax(members.map((_, m) => m));      // nothing should be left
  for (const f of late) stage[f] = order.length - 1;
  for (let f = 0; f < nf; f++) if (!pts[f]) pts[f] = [0, 0];

  // ----------------------------------------------------------- the readback --
  // Every member force read straight off the finished figure. This is the proof
  // that the construction is the structure: it must reproduce `res.forces`.
  const read = members.map((mm, m) => {
    const { left, right } = seg[m];
    const d = [pts[right][0] - pts[left][0], pts[right][1] - pts[left][1]];
    return d[0] * uOf[m][0] + d[1] * uOf[m][1];
  });
  let err = 0;
  members.forEach((mm, m) => {
    const { left, right } = seg[m];
    const d = [pts[right][0] - pts[left][0] - res.forces[m] * uOf[m][0],
               pts[right][1] - pts[left][1] - res.forces[m] * uOf[m][1]];
    err = Math.max(err, Math.hypot(d[0], d[1]));
  });

  // ------------------------------------------------------- the joint rings --
  // Each joint's own force polygon, as a closed cycle of space points: the
  // spaces round the joint anticlockwise, with the member (or external force)
  // that separates each consecutive pair.
  // Sweep the rays leaving the joint anticlockwise. Crossing the ray of member
  // m takes you from the space on its right to the space on its left; where two
  // consecutive members do NOT share a space, the gap between them is the outer
  // wedge, cut open by this joint's external force(s), and crossing those
  // bridges it. The result is a closed cycle: the joint's own force polygon.
  const ring = nodes.map((_, i) => {
    const hs = E.out[i];
    const cyc = [];
    hs.forEach((h, t) => {
      cyc.push({ m: h >> 1, ext: null, from: spaceOf(E.twin(h)), to: spaceOf(h) });
      let s = spaceOf(h);
      const target = spaceOf(E.twin(hs[(t + 1) % hs.length]));
      for (let g = 0; s !== target && g <= extAt[i].length; g++) {
        const e = ext.find((x) => x.node === i && x.to === s);
        if (!e) break;
        cyc.push({ m: null, ext: e, from: s, to: e.from });
        s = e.from;
      }
    });
    return cyc;
  });

  const spaceAt = nodes.map((_, i) => {
    const s = new Set();
    for (const step of ring[i]) { s.add(step.from); s.add(step.to); }
    return [...s];
  });

  // Bow's labels: letters round the outside, numbers inside.
  const LET = 'abcdefghijklmnopqrstuvwxyz';
  const name = new Array(nf);
  for (let f = 0; f < nOuter; f++) name[f] = LET[f % 26] + (f >= 26 ? `${(f / 26) | 0}` : '');
  for (let f = nOuter; f < nf; f++) name[f] = `${f - nOuter + 1}`;

  // Where to write a space's label in the FORM diagram, in the form diagram's
  // own coordinates: the centroid of an interior face; for an outer space, the
  // middle of the run of boundary it sits against, with `nrm` the unit normal
  // pointing away from the structure so the view can push the label clear.
  const at = new Array(nf).fill(null);
  const nrm = Array.from({ length: nf }, () => [0, 0]);
  E.cycles.forEach((c, f) => {
    if (f === E.outer) return;
    const p = [0, 0];
    for (const h of c) { p[0] += nodes[E.tail(h)][0]; p[1] += nodes[E.tail(h)][1]; }
    at[innerIx.get(f)] = [p[0] / c.length, p[1] / c.length];
  });
  const runs = new Map();
  for (const h of ring0) {
    const s = spaceOfHalf.get(h);
    if (!runs.has(s)) runs.set(s, []);
    runs.get(s).push(h);
  }
  for (const [s, hs] of runs) {
    const h = hs[(hs.length - 1) >> 1];
    const a = nodes[E.tail(h)], b = nodes[E.head(h)];
    const d = [b[0] - a[0], b[1] - a[1]];
    const L = Math.hypot(d[0], d[1]) || 1e-12;
    at[s] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    nrm[s] = [-d[1] / L, d[0] / L];        // the outer face is on the LEFT
  }

  return { pts, nOuter, nf, name, seg, ext, ring, stage, order, read, err,
           spaceAt, at, nrm, embed: E, spaceOf, uOf };
}
