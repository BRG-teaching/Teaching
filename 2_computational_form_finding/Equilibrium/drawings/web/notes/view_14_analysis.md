# view_14 — Prestress — applet decode

Source: view_14/applet_0/geogebra.xml (77 commands) + geogebra_macro.xml
(internalForce, as in view 12), title from page.html: **Prestress**.
No embedded images. Frame x ∈ [5.66, 177.26], y ∈ [3.97, 89.77]; titles
"Form Diagram" (7.53, 87.22), "Force Diagram" (108.23, 87.22).

## The model

A single prestressed node: two cables hang node G from the anchors B and C;
a vertical tie (member 1) connects G down to the ground anchor H and is
prestressed with the force C = F_C. A load Q = F_Q pulls down at G.

- While Q < C the cable forces DO NOT CHANGE: they keep the values of the
  C-only state (the auxiliary triangle fixes |A|), and the tie simply sheds
  prestress — its force is C − Q.
- At Q ≥ C the tie goes slack (member 1 turns black, its force segment and
  pipe vanish) and the polygon switches to the plain V: M→N ∥3→U ∥2→M.

## Construction chain (all verified against baked coords)

- A = (0, 76.0956) on the y-axis → a = horizontal ANCHOR LINE y = 76.0956.
  B = (15.4918, 76.0956), C = (75.38, 76.0956) free ON a (draggable in x).
  F = Midpoint(B, C) → b = the vertical AXIS x = x(F). G = (x_F, 60.6171),
  H = (x_F, 29.5098) free ON b (draggable in y). NOTE: G and H always sit on
  the MIDLINE between the anchors.
- Members: c = B–G '2' red th2, d = C–G '3' red th2, e = G–H '1' th2 with
  dynamic color red if F_Q < F_C else BLACK (slack).
- Load symbols (length = loadSymbol = 8, hidden slider [5,10]):
  u = Vector(I, G) 'Q' at G from above (grey when F_Q = 0, else green);
  i = Vector(H, L) 'C' at H downward (green when F_Q < F_C, else grey);
  v = Vector(B, J) 'A', w = Vector(C, K) 'B' green, along the rays G→B / G→C
  extended (tip = anchor + 8·unit(anchor − G)).
- Guides (always visible, dotted th2 → our grey dashed): l_1 at x = x_F and
  m_1 at x = 108.4448, both y ∈ [5.4655, 82.7078].
- Force diagram, anchored at the HIDDEN fixed point M = (108.4448, 58.4080):
  N = M − (0, F_Q·sFD) ('Q' = Vector(M,N) green, shown when F_Q > 0).
- AUXILIARY construction (checkbox o 'auxiliary construction', default
  false): O = (79.5097, 29.8103) free (draggable); P = O − (0, F_C·sFD);
  n = line through P ∥ member 2, a_1 = line through O ∥ member 3 (both
  dotted); R = n ∩ a_1; b_1 = Segment(P, R) 'A' black solid = the C-only
  cable force. Baked: P = (79.5097, −10.3897), R = (40.6251, 9.7103),
  |b_1| = 43.7727.
- S = Circle(M, |b_1|) ∩ (line through M ∥ member 2), second intersection =
  M + |b_1|·unit(G−B) = (147.3295, 38.3080) — |A| is carried over from the
  auxiliary: the cables keep their C-only force under any Q < C.
- f_1 = vertical through S; c_1 = line through N ∥ member 3;
  T = c_1 ∩ f_1 = (147.3295, 78.5080 − Q·sFD·…) (baked 78.5080 at F_Q=0);
  U = c_1 ∩ (line through M ∥ 2) (= M when F_Q = 0; the slack-case apex).
- Force segments (red th2): g_1 = '2' = M–S (taut) | U–M (slack);
  h_1 = '3' = N–T | N–U; i_1 = '1' = T–S, shown only when F_Q < F_C;
  |T−S| = (F_C − F_Q)·sFD exactly (regression-checked).
- Reactions (green th5, hidden by o_1): w_1 'A' = S→M | U→M; u_1 'B' = N→T |
  N→U; v_1 'C' = Vector(T, S), shown when ¬o_1 ∧ F_Q < F_C — the residual
  prestress.
- internalForce pipes: Vieleck1 = member 2 with force (M,S)|(M,U), Vieleck2 =
  member 3 with (N,T)|(N,U), Vieleck3 = tie with (T,S), 0 when slack.
  All resolve red = tension (ggbAngle color).
- Numbers: Text3–5 = '1','2','3' at the form member midpoints; Text6–8 =
  the same on i_1 ('1', only while taut), g_1, h_1.

## Sliders / booleans (complete; live values = XML)

| name | default | range | shown |
|---|---|---|---|
| F_Q | 0 | 0–10 | yes |
| F_C | 6 | 1–10 | yes |
| scaleForceDiagram | 6.7 | 0.5–10 | yes |
| scaleInternalForces | 0 | 0–0.2 | yes |
| loadSymbol | 8 | 5–10 | hidden |
| o 'auxiliary construction' | false | | checkbox |
| o_1 'hide reaction forces in force diagram' | false | | checkbox |
| e_2 'show handles' | false | | frame helper, never drawn |

## Regression

v14/ggb_eval.py (generic evaluator) reproduces all 21 baked derived points at
≤2e−14. v14/regress14.py mirrors the port's own formulas (aux triangle → |A|,
S, N/T/U, both polygon states, reaction tips J/K/I/L, guides) against the
baked state AND checks the invariants at F_Q ∈ {0, 3, 6, 8}: |T−S| =
(F_C−F_Q)·sFD while taut, |A| independent of Q, polygon closure, slack switch
at F_Q ≥ F_C — see its output in the commit.

## Deviations (deliberate)

- Default F_Q = 3 (applet: 0) so the opening state shows a general polygon
  (Q's arrow and load-line edge non-degenerate); F_Q = 0 remains reachable
  and regression-checked. All other defaults as the applet.
- The auxiliary construction is STAGED (steps 4–5) and retires at the
  resolve step; the panel checkbox 'auxiliary construction' re-shows it
  (the applet keeps it behind the same checkbox, default off).
- Points carry no letters (the applet labels none; reactions are named A/B
  while the anchors would be B/C — letters would collide).
- Platform additions: internal-force pipes default ON, node inspector,
  dual hover links, ghost preview, live readouts.

## Step design (paired form ↔ force, one move per step)

0. intro card
1. site: the two anchors on the ceiling line, node G, ground anchor H,
   guide verticals (grey dashed)
2. cables 2 and 3 (B–G, C–G) with numbers
3. tie 1 (G–H) with number — the node is tied down to the ground
4. the prestress C: green arrow at H — right: the auxiliary load line
   O→P = C (the C-only state begins)
5. aux: through P ∥ cable 2, through O ∥ cable 3 (dotted) → R; segment
   P–R = A: the C-only cable force (cables 2/3 re-flash)
6. the load Q at G — right: the load line M→N = Q
7. cable 2's force: dashed arc |A| from M + parallel ∥ 2 → S; segment
   M–S '2' — the cable keeps its C-only force
8. cable 3's force: through N ∥ 3, vertical through S → T; segment N–T '3'
9. the tie closes the polygon: T–S '1' + green C = residual prestress
   C − Q (tie re-flashes)
10. reactions: A = S→M, B = N→T (force) — green A/B arrows at the anchors
    (form), same step
11. resolve: pink = tension, pipes ∝ force, readouts; drag F_Q up: A and B
    stay frozen until Q = C — then the tie goes slack and the polygon
    switches to the plain V (aux retires; checkbox re-shows it)

Node inspector (4 nodes): G = the main polygon itself ([M→N Q, N→T '3',
T→S tie, S→M '2'], slack: the V triangle); H = degenerate pair on the drawn
C vector [T,S]/[S,T]; anchor B = pair on the drawn A [S,M]/[M,S]; anchor C =
pair on the drawn B [N,T]/[T,N] (reaction sides = the visible arrows' exact
coordinates).
