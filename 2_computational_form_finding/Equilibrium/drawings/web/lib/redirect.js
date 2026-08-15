/**
 * The frame-corner redirection of compendium 8.1, solved joint by joint.
 *
 * A three-hinged frame's thrust line runs straight from hinge to hinge, and in
 * anything but an arch it leaves the material almost at once: in EX 8 task 2b)
 * it spends 5.81 m of its 6.44 m length in the void. A real frame corner
 * therefore does not carry its load along that line. It REDIRECTS it around
 * the corner, through the material that is actually there, and the price is a
 * tie along the outside face — which is what the reinforcement in a concrete
 * frame is for, and what tasks 3 and 4 then dimension.
 *
 * The compendium's model for one half of a frame is four points and five
 * elements:
 *
 *        C ------------------------- O          C  the crown hinge
 *         \                        / |          O  the outer corner
 *          \                     /   |          K  the inner kink
 *           \                  /     |          S  the support
 *            K ------------- '       |
 *            |                       |          C-O  along the outer face
 *            |                       |          C-K  along the inner face
 *            |                       |          K-O  the diagonal
 *            S ----------------------'          K-S  the inner face, down
 *                                               O-S  the outer face, down
 *
 * and every one of those five lies inside the drawn concrete, which is the
 * whole point of choosing it.
 *
 * It solves by the method of joints, in one pass and with no matrix:
 *
 *   at C   two unknowns, C-O and C-K            → two equations, solved
 *   at O   C-O now known, K-O and O-S unknown   → two equations, solved
 *   at K   only K-S left, and TWO equations     → solved, and the second one
 *                                                 is a free check that the
 *                                                 whole chain was right
 *
 * SIGN CONVENTION: N > 0 is COMPRESSION, so a member with N > 0 pushes both of
 * its end points away from each other. The force a member exerts on its end P,
 * with far end Q, is therefore N · unit(P − Q).
 */

const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const unit = (v) => {
  const L = Math.hypot(v[0], v[1]) || 1e-12;
  return [v[0] / L, v[1] / L];
};

/** Solve [a b; c d]{x,y} = {e,f}. Returns null if the two directions align. */
function solve2(a, b, c, d, e, f) {
  const det = a * d - b * c;
  if (Math.abs(det) < 1e-12) return null;
  return [(e * d - b * f) / det, (a * f - e * c) / det];
}

/**
 * nodes  { C, O, K, S }   the four points, in metres
 * atC    [fx, fy]         the force the crown hinge delivers into this half
 *
 * Returns the five member forces, their geometry, the residual of the check
 * equation at K, and the reaction the chain hands back to the support — which
 * must equal minus `atC`, and is reported so a view can say so.
 */
export function redirectHalf(nodes, atC) {
  const { C, O, K, S } = nodes;
  const u = (p, q) => unit(sub(p, q));

  // node C: members C-O and C-K, plus the applied force
  const uCO = u(C, O), uCK = u(C, K);
  const rC = solve2(uCO[0], uCK[0], uCO[1], uCK[1], -atC[0], -atC[1]);
  if (!rC) return null;
  const [N_CO, N_CK] = rC;

  // node O: C-O known; K-O and O-S unknown; nothing applied
  const uOC = u(O, C), uOK = u(O, K), uOS = u(O, S);
  const rO = solve2(uOK[0], uOS[0], uOK[1], uOS[1],
                    -N_CO * uOC[0], -N_CO * uOC[1]);
  if (!rO) return null;
  const [N_KO, N_OS] = rO;

  // node K: only K-S left, and two equations to find it — the second is the
  // check that everything upstream was right
  const uKC = u(K, C), uKO = u(K, O), uKS = u(K, S);
  const rx = -(N_CK * uKC[0] + N_KO * uKO[0]);
  const ry = -(N_CK * uKC[1] + N_KO * uKO[1]);
  const N_KS = Math.abs(uKS[0]) > Math.abs(uKS[1]) ? rx / uKS[0] : ry / uKS[1];
  const resid = Math.hypot(rx - N_KS * uKS[0], ry - N_KS * uKS[1]);

  // and what the chain hands to the support
  const uSK = u(S, K), uSO = u(S, O);
  const reaction = [-(N_KS * uSK[0] + N_OS * uSO[0]),
                    -(N_KS * uSK[1] + N_OS * uSO[1])];

  const mk = (name, a, b, N) => ({
    name, a, b, N,
    len: Math.hypot(b[0] - a[0], b[1] - a[1]),
    tension: N < 0,
  });
  return {
    members: [mk('C–O', C, O, N_CO), mk('C–K', C, K, N_CK),
              mk('K–O', K, O, N_KO), mk('K–S', K, S, N_KS),
              mk('O–S', O, S, N_OS)],
    resid, reaction,
  };
}

/**
 * Global equilibrium of a three-hinged frame whose applied load passes through
 * the crown hinge -- which is the case the sheets always set up, because it is
 * the case a student can solve with a ruler.
 *
 * With all three lines of action meeting at C, the two half-chords ARE the two
 * reaction directions, and the load simply resolves onto them.
 *
 * A, B    the two support pins
 * C       the crown hinge
 * F       [fx, fy] of the resultant applied load, acting through C
 *
 * Returns the two chord forces (positive = compression) and the reactions, each
 * of which acts on the frame along its own chord, from the support toward C.
 */
export function threeHinge(A, B, C, F) {
  const uA = unit(sub(C, A)), uB = unit(sub(C, B));
  const r = solve2(uA[0], uB[0], uA[1], uB[1], -F[0], -F[1]);
  if (!r) return null;
  const [NL, NR] = r;
  return {
    NL, NR, uA, uB,
    RA: [NL * uA[0], NL * uA[1]],
    RB: [NR * uB[0], NR * uB[1]],
    // what each half receives at the crown: minus the reaction it delivers
    atCL: [-NL * uA[0], -NL * uA[1]],
    atCR: [-NR * uB[0], -NR * uB[1]],
  };
}
