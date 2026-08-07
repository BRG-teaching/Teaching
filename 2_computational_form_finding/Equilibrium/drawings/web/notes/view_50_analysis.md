# view 50 — Internal forces in a beam with cantilever – point load

Ground truth: https://block.arch.ethz.ch/eq/drawing/view/50 (driven headless
via CDP; states dumped to scratchpad/live50/*.json + screenshots). The applet
has **no mode/step/node sliders** — everything shows at once; the staging in
`web/views/view_50.js` is ours (19 steps).

## Decode summary (applet_0/geogebra.xml, 455 construction elements)

- **Form diagram** (beam axis y = 10.4709): beam `r = A–G` th2, pin
  `A (3.982, 10.471)` fixed in our port (applet: draggable with showHandles),
  tip `G` under the third load. Support symbols from the applet's macros:
  `supportHingeHorizontalLeft(A, sLS/2)` = triangle (side g = sLS/2, base at
  −g·√3/2) + hatched ground + green fixed-length arrows `A_H` (horizontal,
  tail at −2.7g, length 2g) and `A_V` (tail at −3.566g, tip −1.566g);
  `supportRollerHorizontal(B, sLS/2)` = **wheel circle r = g·√3/4 tangent to
  beam and ground** (no triangle) + hatched ground + arrow `B`.
- **Loads** at level y = 11.4865 (point `P_3`): `D` on rail `f1`
  = [A_x+1, A_x+2], `E` on rail `f2` = [A_x+2.75, A_x+3.75] (grey dashed
  segments, the only visible parts of the load level), `F` free on the whole
  line — the beam tip follows it. Green th7 arrows of length sLS point down
  from the level. The roller `B = Point(Segment(C, G))` is constrained
  between the F₂ vertical and the tip.
- **Load line** from free `S`: `T = S − (0, F₁·sFD)`, `V`, `Z` (circles +
  intersections); green th7 vectors with `COND F_i ≠ 0`.
- **Trial funicular**: pole `B_1` ("O′") free; rays `s_1` (S, th2), `t_1`
  (T, th1), `a_2` (V, th1), `b_2` (Z, th2) — black. Strings from `C_1` on
  the pin vertical: `D_1, E_1` … out to the tip vertical (`G_1`) and BACK to
  the roller vertical (`H_1`) — black th2 **solid** (this applet's trial is
  black, unlike view 46's grey). Closing `k_2 = C_1–H_1` grey th2 dashed;
  parallel through O′ (`b_3`, grey dashed) cuts the load line at `I_1` =
  division point (grey, always visible).
- **Offset reactions** (scaleOffsetReactionForces): `K_1/L_1/M_1` = S/I₁/Z
  shifted right; green th7 vectors `v_2 = L_1→K_1` caption **A**,
  `u_2 = M_1→L_1` caption **B**; whiskers `s_2/t_2/a_3` black th2 dotted.
- **V-diagram** (baseline `N_1` draggable on the pin vertical, dotted
  baseline `h_5 = N_1–N_2`): jump `+A` via `Circle(N_1, Distance[L_1,K_1] /
  sFD)` with the **If(y(L_1) < y(K_1))** choosing the signed side (upper
  point Q_1 when A acts upward, P_1 otherwise); drops `−F₁`, `−F₂` via raw
  circles (V-scale: 1 unit :: 1 kN); jump `+B` via `Circle(W_1,
  Distance[L_1,M_1]/sFD)` — always the UPPER intersection `Q_3`; cantilever
  level to the tip, drop `−F₃` closes exactly to the baseline. Outline `l_3`
  = closed black th2 polyline (incl. the baseline edge `O_1→N_1`); fill
  `poly1` rgb(192,192,192) α 0.25 **fillType 1 hatchAngle 90
  hatchDistance 10** → rendered as vertical grey hatching (we draw hatch
  strokes at 10 px / applet scale = 0.191 world spacing).
- **Force cascade** (the V re-read): five green th7 vectors at draggable x's
  `D_2 (A), G_2 (F₁), H_2 (F₂), J_2 (B), L_2 (F₃)`, each between two
  consecutive levels; dotted black level segments `g_5, i_5, j_5, f_5` carry
  the levels from the pin vertical to x(N_2).
- **Second force diagram**: `N_2` draggable on the baseline; the levels cut
  its vertical at `Q_2/R_2/S_2/P_2`; load line `l_4 = P_2–S_2` black th2;
  pole `O_2` ("O″") draggable ON the baseline; rays th2 to the outer points
  (P_2, S_2), th1 to the inner (Q_2, R_2), grey dashed `k_4 = N_2–O_2` (the
  horizontal closing ray). `H` = red th3 segment `S_3–T_3` between the two
  verticals at draggable height `S_3`, dotted whiskers `t_5/a_6`.
- **M-diagram**: from `T_2` draggable on the pin vertical, strings parallel
  to the rays (`m_4 ∥ Q_2–O_2` → `U_2` on the F₁ vertical, → `V_2`, `W_2`),
  closed polyline `s_4 = T_2 U_2 V_2 W_2 Z_2 T_2` black th2 where
  `Z_2 = (x(F), y(T_2))` — the funicular returns to the baseline **exactly
  at the free tip** (verified: W_2→Z_2 ∥ ray P_2→O_2 to ~1e-15 in every
  state); hatch fill `poly5` like the V. Red ordinate `b_6 = U_3–U_2`
  caption **y** under F₁; `text8 = "M = y · H = …"` computes the product.
- Texts: "Form Diagram", "Force Diagram", "Trial Funicular Construction",
  "V - Diagram", "M - Diagram", "Force diagram / Trial funicular
  construction", "Force diagram / M - line", "O′" at B_1, "O″" at O_2.
- Never drawn: export `frame` machinery; hidden helper lines/circles;
  `scaleInternalForces` slider exists but is hidden (`show obj=false`) and
  unused — **no internal-force pipes in this view** (beam in bending, no
  axial members; same as views 46–48).

## Toggles / sliders (defaults)

| control | kind | default | notes |
|---|---|---|---|
| F_{1}, F_{2}, F_{3} | sliders 0..2 | 1 | page "forces" flyout |
| scaleForceDiagram | slider 0.5..2 | 1 | page "scales" flyout |
| scaleLoadSymbol | slider 0.2..1 | 0.6 | page "scales" flyout |
| scaleOffsetReactionForces | slider 0..1 | 0.5 | page "scales" flyout |
| showPoints | checkbox | false | off-canvas (x=1385 > 1200): API-only; reveals the derived points |
| showHandles | checkbox | false | off-canvas: reveals the handles A, C₁, P₃, F, F11..F22, N₂, A₃, B₃, S₃ |
| scaleInternalForces | slider 0.01..0.1 | 0.06 | HIDDEN slider, unused |

Draggable free points (all ported): `S`, `B_1` (O′), `D`/`E` on their rails,
`F` (tip), `B` (roller), `C_1`, `N_1`, `N_2`, `O_2`, `S_3`, `T_2`, and the
five cascade x's `D_2 G_2 H_2 J_2 L_2`. Not ported as draggable (fixed at
their defaults, all showHandles-only in the applet): `A` (would translate
the whole drawing), `P_3` (load level), `A_3/B_3` (vertical extents).

## Regression (scratchpad/v50_regress.py vs live dumps)

48 derived points per state (trial funicular, division, offset chain, all
V levels, cascade tails+tips, second force diagram, M funicular, H segment):

- default (fresh dump == dead agent's dump, diff 0): max err **4.4e-14**
- dragB (roller → 9.6): 2.8e-14 · dragF (tip → 11.4): 5.5e-14
- loads (F₁=2, F₃=0.4, O′ dragged): 3.6e-14 · sFD15 (sFD 1.5, off 1.0): 2.6e-14
- handles / showpoints: 2.6e-14 / 4.4e-14
- handlesdrag (D, E, C₁, N₁, T₂, O₂, N₂, S₃, D₂ all dragged): 3.6e-14

M-funicular tip closure (W₂→Z₂ ∥ ray P₂→O₂): ≤ 8e-15 everywhere.
M = y·H reproduces the applet's text8 in every state (1.00 / 1.58 / 1.72 /
2.97 / 0.81 …).

## Hand-written staging (19 steps)

intro → beam + pin/roller symbols + support verticals → three loads ‖ load
line (same step) → trial pole O′ + rays → trial funicular (out to the tip,
back to the roller vertical) → closing → division I₁ → reactions (form
arrows ‖ offset chain b→I₁→a) → V baseline N₁ → jump A → drops F₁ F₂ →
jump B + cantilever + close (hatch) → force cascade +A −F₁ −F₂ +B −F₃ = 0 →
V-levels stacked into the second load line → pole O″ + H (red) → string 1 ‖
ray 1 → strings 2, 3 ‖ rays → string 4 closes at the free tip (hatch) →
M = y·H readout → final (readouts A, B).

- M-funicular strings numbered 1–4 in BOTH diagrams (each string draws in
  the same step as its ray), dual-hover linked; loads/reactions linked form
  ↔ load line ↔ cascade arrow; ghost preview on the force side.
- Colors exactly per the applet: trial strings BLACK solid, closing +
  division ray grey dashed, V/M outlines black + grey vertical hatch,
  H segment and y ordinate RED, loads/reactions/cascade green.
- The V levels use the applet's signed rules: A level via the If (handles
  negative A = uplift when the cantilever dominates), B jump always upward.

**Node inspector** (house mandate; the applet has no mode 2): slider 0–6 +
click-to-inspect. Nodes 1–5 = the trial funicular's kinks — each closes a
triangle in the trial force diagram {load or reaction, two rays}; the
support nodes C₁/H₁ use the VISIBLE offset arrows (A = L₁→K₁, B = M₁→L₁).
Node 6 = whole beam {F₁, F₂, F₃ down the load line, B, A up the offset
chain} — 5 forces, ΣF = 0. No pipes (no axial members — documented above).

## Deviations from the applet

- The staging (19 steps), point letters (A, B, C₁, H₁, I₁, N₂, T₂, O″),
  string numbers 1–4 and the readouts `A = … kN`, `B = … kN`, `M … kNm`
  are ours; the applet shows everything at once and only prints text8.
- showPoints/showHandles are merged into the house "show points" toggle
  (default ON — handles and construction points drawn as disks).
- Force-diagram F₁/F₂/F₃ labels sit LEFT of the load line (the applet
  squeezes them between the load line and the offset chain).
- The right-hand region texts moved from x = 17.5 to x ≈ 19.6 to clear the
  offset-chain labels.
- Drag clamps keep degenerate states out (tip ≥ roller + 0.25, O″ right of
  N₂, cascade x's between the pin vertical and N₂); the applet lets several
  of these cross.
- Roller/pin symbols are redrawn from the macro geometry (triangle side g;
  wheel r = g·√3/4) — verified against live screenshots.
