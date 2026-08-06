# view_13 — Tower Bridge — applet decode

Source: view_13/applet_0/geogebra.xml (598 KB, 1147 commands), title from
page.html: **Tower Bridge**. Live original verified via ggbApplet API
(headless chrome): **no boolean objects**; numerics exactly the XML set below;
mode/step flipped live and screenshotted — layers match the XML conditions.
Embedded image `a1b98286b378c7d47139df40f61252b4/Tower_bridge.png` (960×516,
alpha 0.4, corners B=(−40.35,−67) → A=(243.40,−67), shown at steps 0/3/6/9):
the historical etching of the SIDE SPAN — short abutment tower left, tall
gothic tower right, deck girder, water hatching, "270 0" dimension. Reproduced
as a vector silhouette anchored to the form geometry (never the bitmap).

## The model

The side-span chain hangs between the short tower F=(0, 20) and the tall
tower I=(82.3, 37.397) and is forced through the anchor point E=(30.177,
11.951) — E sits ON hanger 6. Every load case is a funicular through the SAME
three points F, E, I (a two-span three-point problem, like view 7/8).

- Deck: G=(0, 7.3256) → H=(82.3, 7.3256); g = |GH| = 82.3 (G draggable in y).
- 15 hangers at hx[k] = g/30 + k·g/15, k=0..14 (2.743, 8.230, …, 79.557);
  action lines drawn full height y ∈ [−15.88, 83.82] (r_14/q_14 rails), thin
  dotted th1 → our grey dashed guides.
- Load band (dead load g): rectangle y ∈ [7.326, 9.726] (S = G + 3·SLS2, SLS2
  = 0.8), split at x = 30.177 (E's hanger) into poly1 (left, 5.5 strips) and
  poly2 (right, 9.5 strips); green, labels "g" (text20 left, text3 right).
- Point-load model: full strip load at each hanger; the E-hanger strip is
  split half/half at the divider ⇒ left band = 5.5·w, right = 9.5·w.
- Backstay: the last chain side continues straight over the saddle at I to
  the vertical through T_3=(86.29, 7.326) (T_3 draggable on the deck line):
  dead case J=(86.29, 41.24) (e_8, dash-dot), Q case P_6 (b_14, solid th5).
  No kink at I — the saddle transmits the chain force (reaction B along it).

## Sliders (live-verified, ALL of them; no checkboxes exist)

| name | default | range | shown | meaning |
|---|---|---|---|---|
| scaleForceDiagram | 0.45 | 0.3–0.8 | yes | load = g/15·sFD = 2.469 |
| positionQ | 10 | 1–15 | step 0 ∨ ≥7 | hanger carrying Q |
| factor_Q | 2 | 1–4 | step 0 ∨ ≥7 | Q = load·factor_Q |
| factor_q | 2.8 | 1–4 | step 0 ∨ ≥4 | live-load intensity ratio (g+q)/g |
| ForceDiagramDistance | 0 | 0–5 | hidden | x-offset between the 4 force systems (K_7=L_1+2FDD, N_7=+4FDD, B_4=+6FDD) |
| ScaleLoadSymbol2 | 0.8 | 0–1.5 | hidden | band height = 3·SLS2 = 2.4 |
| scaleLoadSymbol | 6.6 | 0–8 | hidden | reaction-arrow symbol length |
| distanceLoadSymbol | 0 | 0–2 | hidden | reaction-arrow start offset |
| mode | 0 | 0–2 | yes | 0 plain, 1 trial-funicular constr., 2 superposition constr. |
| step | 0 | 0–9 | mode≠0 | applet stages (0 and 9 = complete) |

W_3 = Q's line of action (free on y=46.76 rail, baked x = 52.123 = hx[9]) —
the applet leaves it INDEPENDENT of positionQ; our port syncs both (drag ↔
slider), like view_18.

## Load lines (all on x = 150.497 with FDD = 0; L_1 = (150.497, 74.872) free)

Top of line ↔ RIGHTMOST hanger (h15); bottom ↔ h1. w = load = 2.469.

- dead g: L_1 … D_2 = L_1 − 15w. Split R_13 = mid(V_1,W_1) = −9.5w:
  R_2 = L_1→R_13 (right band 9.5w), R_1 = R_13→D_2 (left 5.5w).
- q₁ (left span loaded): K_7 = L_1+2FDD: 9 gaps w (h15..h7), 0.5w (h6 right
  half), 0.5w·fq (h6 left half), 5 gaps w·fq (h5..h1) → M_7. 16 gaps; captions
  'R_2 = R_g' (green) and 'R_1 = R_g + R_{q1}' (orange).
- q₂ (right loaded): N_7 = L_1+4FDD: 9 gaps w·fq, 0.5w·fq, 0.5w, 5 gaps w →
  C_9. Captions 'R_2 = R_g + R_{q2}' / 'R_1 = R_g'.
- Q case: B_4 = L_1+6FDD: 15 gaps w, gap (16−pQ) widened by w·fQ. Green
  bracket 'R_g + Q' (text19); the widened gap flashes with positionQ.

## Poles (chords + division points; every case identical machinery)

Chord j_17 = F–E, chord i_17 = E–I (orange dashed, type 15). For each case:
division point i₁ on the load-line span of the RIGHT-band loads (gaps 1..9),
i₂ on the LEFT-band gaps (last 5); pole o = (line through i₁ ∥ chord E–I) ∩
(line through i₂ ∥ chord F–E). Division points are found with a TRIAL
funicular (any trial pole T, any start): closing line c; i = load line ∩
(line through T ∥ c) — invariant to T (mode-1 shows it; we stage it for the
dead case with the applet's baked trial poles, and for the Q case with the
applet's step-8 apparatus).

Baked poles (all match our recomputation to ≤1e−13): dead o = B_3 =
(125.851, 51.144); q₁ o = C_12 = (109.528, 43.176); q₂ o = U_16 = (97.811,
16.404); Q o = Z_5 = (122.064, 47.216).

Baked trial apparatus: dead: o′₁ = P_13 (170.744, 62.398) takes L_1,M_1..V_1
(gaps 1..9), form trial 1 from S_13 (82.3, 48.732) → E_14 (30.18, 50.736),
closing s_25; o′₂ = Q_13 (164.234, 45.002) takes W_1..D_2, trial 2 from H_14
(30.18, 41.281) → O_14 (0, 40.332), closing j_26; divisions G_14 =
(150.497, 63.176), P_14 = (150.497, 44.570). Q case (applet step 8, mode-free):
o′₁ = Z_16 (176.960, 66.054), anchor E_18 (82.3, 69.905) → O_18 (30.18,
60.142); o′₂ = A_17 (176.427, 42.899), anchor Q_18 (30.18, 69.761) → W_18
(0, 65.959); divisions K_5 = (150.497, 61.097), V_5 = (150.497, 39.632);
D_18 = mid of the K_4–L_4 gap ties the two trials. q₁/q₂ trials exist only in
mode 1 — our port computes their divisions with an internal trial (invariant).

## Chains (funicular; 15 vertices + F + I; always through F, E, I)

Side k (k=0 at F … 15 at I) ∥ o→S[k] where S = the case's load-line points
bottom→top, skipping the case's h6-half point (chain vertex at E consumes two
gaps in q₁/q₂). Verified: vertex 6 ≡ E and the last side lands on I exactly
(machine precision) for all four cases.

Styles: dead = th3 dash-dot black (e_23; d_8 same orange while step 2);
q₁ = th3 orange→black (g_19..i_20, visible 0∨4∨≥6); q₂ = th3 (l_31..h_32,
0∨≥5); Q chain = th6 ORANGE a_14 + backstay b_14 th5 (0∨≥8) — our final
chain resolves PINK (pure tension) with pipes.

## Resultants & reactions

- R_g: form C_21=(41.15, 2.618)→D_21 (length 2·sLS = 13.2) at the total
  centroid x=41.15; force u_10 = L_1→D_2 (th7 green; steps 1,3,7).
- R_1 line of action x = 15.213 (5 full + half strip centroid), R_2 x =
  56.166 (baked ortResultierende / P_2 ✓ recomputed exactly); arrows q_4/r_4
  below the deck (tail y = 2.618, length 2·sLS), green (orange while its live
  case is current). On the load line: t_4/u_5 (dead split), w_6/u_7 (q₁),
  w_8/u_9 (q₂), th7.
- Reactions per case (green th7): form A at F along the first side, length
  sLS, pointing away from the chain (w, v_5-w_5 force side: A = D_2→o,
  B = o→L_1 ON the outer rays); q₁: u_6/v_8 + v_7/w_7 (A = M_7→o₁,
  B = o₁→K_7); q₂: u_8/n_9 + v_9/w_9; Q case: l_9/v + w_10 (A = Q_4→o₃),
  n_10 (B = o₃→B_4). B is drawn along the backstay direction at I.

## Q alone (applet step 7)

Chord rails extended: U_6 = chord I–E ∩ x=0, V_6 = chord F–E ∩ x=82.3;
g_14 = polyline U_6–E–V_6. S_6 = Q's action line ∩ g_14 (= (52.12, 6.10) at
defaults). Q alone through F, E, I = F–(E)–S_6–I (orange dashed j_14/i_14).
Mini force diagram at Q_6 = (150.29, 32.83) free: R_6 = Q_6 − (0, w·fQ);
T_6 = (∥F–S_6 through R_6) ∩ (∥S_6–I through Q_6) = (146.50, 28.90) —
triangle m_14/n_14 orange dashed; e_14 = Q_6→R_6 'Q' orange th5.

## Mode 2 (superposition check, dead case; steps 2/4/5 in mode 2)

D_12 = chord I–E extended ∩ R_1's action line = (15.213, 4.646); T_15 =
chord F–E extended ∩ R_2's line = (56.166, 5.019). Quadrilateral F→D_12→I
('III', through E) →T_15→F ('II', through E): each span's chain replaced by
two strings through its resultant. Force side: V_20 = (∥F–D_12 through D_2) ∩
(∥D_12–I through R_13) = (141.429, 46.989); A_21 = (∥I–T_15 through L_1) ∩
(∥T_15–F through R_13) = (134.919, 55.571); dashed h_10..m_10 close both
sub-triangles to o. All orange dashed th2 — kept ONE step in our port, then
retired (mode-gated in the applet).

## Regression

scratchpad v13/ggb_eval.py re-evaluates the ENTIRE XML command chain (497
derived points): **max |Δ| vs baked = 1.8e−13** (N_3..S_3 and kin are baked
DEGENERATE — stale saved state, huge homogeneous z; recomputation is the
truth, per the known gotcha). v13/regress13.py mirrors the JS port's own
formulas (bands, division-by-trial, 4 poles, 4 chains incl. E-pass and
I-landing, resultant centroids, reactions, Q-alone triangle, mode-2 check)
against the baked/evaluated coordinates — see its output in the commit.

## Deviations from the applet (all deliberate)

- ForceDiagramDistance defaults to 2.0 (applet: 0) so the four force systems
  don't coincide; the slider (0–5) still allows stacking exactly like the
  original.
- Pole labels o, o₁, o₂, o₃ (the applet names all four 'o'); trial poles keep
  o′₁/o′₂. positionQ and W_3 are synced (drag ↔ slider).
- q₁/q₂ chains persist once drawn (applet hides q₁ during step 5); their
  fans/lines persist too under the FDD separation. Case reactions and the
  dead/q₁/q₂ R-arrows retire when their stage ends (applet behaviour).
- The resultants R_g, R₁, R₂ are drawn as DASHED thick green vectors labeled
  R (platform rule) in BOTH diagrams in the same step; the applet draws them
  solid th7.
- No internal-force pipes exist in the applet; our final chain gets them
  (platform rule, on by default) with magnitudes |o₃→S[k]|/sFD.

## Step design (paired form ↔ force, one move per step)

0. intro card
1. site: Tower Bridge silhouette (vector, instant) + deck G–H + points F, E,
   I + backstay anchor line + 15 hanger action lines (grey dashed)
2. left: dead load band g (green) split at E's hanger — right: load line
   L_1→D_2, 16 tick marks
3. resultant R_g: dashed green 'R_g' at x=41.15 (form) AND L_1→D_2 (force),
   same step
4. split: left: R₁/R₂ dashed green on their action lines — right: division
   mark R_13, brackets R₂ (top 9.5) / R₁ (bottom 5.5)
5. right: trial pole o′₁ + grey rays (gaps 1..9) — left: grey trial funicular
   1 (S_13 → E_14) in the workspace above the chain
6. right: trial pole o′₂ + rays (last 5 gaps) — left: trial funicular 2
   (H_14 → O_14)
7. left: dashed closings of both trials — right: parallels through o′₁/o′₂
   cut the load line at i₁, i₂
8. left: chords F–E and E–I (orange dashed) — right: through i₁ ∥ E–I and
   through i₂ ∥ F–E → pole o + fan of rays
9. left: the dead chain F…E…I (th3, resolves dash-dot black) + backstay stub —
   right: fan re-flash (chain sides ∥ rays)
10. reactions: left: green A at F, B at I (along the chain ends) — right:
    A = D_2→o, B = o→L_1 on the outer rays; trial 1+2 retire
11. superposition check (applet mode 2): left: orange dashed F→D_12→I→T_15→F
    (strings II/III through E on the chord lines) — right: sub-poles V_20,
    A_21 + dashed closings to o [retires at step 13]
12. left: live load q₁ band (orange) on the left span — right: its load line
    (K_7, at +2·FDD): R₂ = R_g green, R₁ = R_g+R_q1 orange
13. right: divisions + chord parallels → pole o₁ + fan — left: chords
    re-flash
14. left: chain q₁ (th3 black) sags deeper under the load; A/B arrows —
    right: A = M_7→o₁, B = o₁→K_7 [q₁ reactions retire at 15]
15. left: live load q₂ band (orange) — right: load line (N_7, +4·FDD)
16. right: divisions → pole o₂ + fan — left: chords re-flash
17. left: chain q₂ + A/B — right: A = C_9→o₂, B = o₂→N_7 [retire at 18]
18. envelope: the two live-load chains + dead chain re-flash — the chain
    swings between these extremes (no new elements, highlight step)
19. left: point load Q (orange, draggable) on hanger positionQ — right: Q on
    its own mini load line Q_6→R_6
20. left: chord rails extended U_6–E–V_6 + S_6: Q alone hangs as F–(E)–S_6–I
    (orange dashed) — right: mini pole triangle T_6 (∥ the two strings)
21. right: the full load line B_4→Q_4 (+6·FDD) with Q widening its gap
    (green, 'R_g + Q') — left: Q + its hanger re-flash
22. right: trial pole o′₁ + rays (top 10 pts) — left: grey trial funicular
    E_18→O_18 above the chain
23. right: trial pole o′₂ + rays — left: trial funicular Q_18→W_18
24. left: dashed closings + the span-resultant verticals — right: parallels
    through o′₁/o′₂ → divisions i₁ = K_5, i₂ = V_5
25. left: chords re-flash — right: ∥ chords through i₁/i₂ → pole o₃ + fan
26. left: THE chain under g+Q (th6) through F, E, I + backstay to the anchor
    — right: fan re-flash
27. reactions: left: A, B green at the supports — right: A = Q_4→o₃,
    B = o₃→B_4; Q trials retire
28. resolve: chain pink = tension, pipes on, readouts A/B/Q live; drag Q
    along the deck, drag E/F/I, play with factor_q/factor_Q

Node inspector: 17 nodes (F, hangers 1–15, I) on the FINAL chain; hanger k:
[load-line edge(s) of hanger k] + [ray to o₃] + [ray back]; F: chain side ↔
the drawn reaction A arrow (same coords — the inspector's reaction side must
lie ON the visible arrow); I: chain ↔ backstay (collinear, via the drawn B).
