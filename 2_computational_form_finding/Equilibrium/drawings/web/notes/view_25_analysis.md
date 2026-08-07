# view 25 — Tree structure

Ground truth: https://block.arch.ethz.ch/eq/drawing/view/25 (live driven via CDP;
8 states in scratchpad/live25/ incl. every step, pipes on, two dragged states).
Applet `step` slider 0..4 (COND mode ≟ 1); mode 0 = final. Text anchors resolved
from the XML startPoint exps (the CAPs "1","a".. on segments are dead — the real
labels are ~80 text elements with per-step conditions).

A tree structure grows under an inclined roof: ONE column, then a bifurcation,
then four branches, then eight — each refinement subdivides the previous
branches (the new nodes SLIDE on the old branch axes), and the roof itself
becomes the tie chain closing every canopy node. The force diagram nests one
pole per refinement: R -> Z_1 -> B_2/C_2 -> A_2/D_2/E_2/G_2, and every
abandoned level's forces STAY in the diagram.

## Decode summary (667 objects)

- **Fixed geometry**: center (7, 8.5), foot D (7, 3), trunk rail x = 7,
  y ∈ [3.1, 6.5] (Base default (7, 4.5)); edge rail x = 3, y ∈ [6, 10]
  (edgeleft default (3, 7.25)); edgeright = 2·center − edgeleft (mirror about
  the perpendicular of center–edgeleft at center — the roof always passes
  through center). Roof divisions at k/14: C(1) F(2) M(3) N(4) O(5) P(6)
  center(7) Q(8) R(9) S(10) T(11) U(12) V(13).
- **Roof** th3 dotted black; load strip q = roof-parallel parallelogram at
  edgeleft + 1.2..1.7 (green fill α 0.1, green th3 edges, CAP "q"); grey
  ground dash (6,3)–(8,3); grey dash-dot column axis g_10 = roofmid–D
  (always); three thin dotted roof-parallel STOREY GUIDES through Base, I
  (= Base + (center−Base)/3) and J (2/3) levels, clipped between the
  verticals through edgeleft/edgeright ± 0.4.
- **Step 1**: single column roofmid–D (blue, "1") + R at center (0.7 arrow) —
  force: load line F_0→F_8 (6·sFD long, from draggable F_0 (15.5, 10)) drawn
  BLUE th2 ("1" = the column force) + green R vector on it.
- **Step 2**: trunk Base–D "1" + branches M–Base "2", Base–T "3" + TIE M–T
  "4" (red, ON the roof) + R/2 at M, T. Pole Z_1 = Line(F_0 ∥ M→Base) ∩
  Line(F_8 ∥ Base→T); blue F_0–Z_1 "2", F_8–Z_1 "3"; RED tie force
  F_4–Z_1 "4" with a black DOTTED line under it extending 0.4 past the pole
  (n_5 — every tie force gets one); R/2+R/2 green on the load line.
- **Step 3**: nodes I_1, J_1 slide ON the old branch axes (M–Base, Base–T);
  members e_4 = I_1–Base "2", f_5 = Base–J_1 "3", I_1–C "4", I_1–O "5",
  J_1–R "6", J_1–V "7"; ties C–O "8", O–R "9", R–V "10" (red); R/4 at
  C, O, R, V; grey dash-dot STUBS M–I_1, T–J_1 (the abandoned upper pieces).
  Sub-poles: B_2 = Line(F_0 ∥ I_1→C) ∩ Line(Z_1 ∥ I_1→O), C_2 = Line(F_8 ∥
  J_1→V) ∩ Line(Z_1 ∥ R→J_1); blue "4".."7" = F_0–B_2, B_2–Z_1, Z_1–C_2,
  C_2–F_8; red ties "8" = F_2–B_2, "9" = F_4–Z_1 (relabel), "10" = F_6–C_2.
  Step-2 members/loads/labels retire (COND step ≟ 2).
- **Step 4 (final)**: nodes T_1 ∈ C–I_1, U_1 ∈ I_1–O, V_1 ∈ R–J_1,
  W_1 ∈ J_1–V; leaves "8".."15" = edgeleft–T_1, T_1–F, N–U_1, U_1–P,
  Q–V_1, V_1–S, U–W_1, W_1–edgeright; "4".."7" relabel onto T_1–I_1,
  I_1–U_1, V_1–J_1, J_1–W_1; the ROOF pieces become the tie chain
  "16".."22" (red over the dotted roof); R/8 at all 8 canopy nodes
  (labels become F_1..F_8 in the final state); grey stubs T_1–C, U_1–O,
  V_1–R, W_1–V. Poles A_2 (F_0 ∥ leaf8, B_2 ∥ leaf9), D_2 (B_2 ∥ 10,
  Z_1 ∥ 11), E_2 (Z_1 ∥ 12, C_2 ∥ 13), G_2 (C_2 ∥ 14, F_8 ∥ 15); blue
  "8".."15" = F_0–A_2–B_2–D_2–Z_1–E_2–C_2–G_2–F_8; red ties "16".."22" =
  F_1–A_2, F_2–B_2, F_3–D_2, F_4–Z_1, F_5–E_2, F_6–C_2, F_7–G_2 (each with
  its dotted underline). ALL earlier force levels persist ("1".."7").
- **"Parallel" arrangement** (page button2 + the defaults): nodes on
  roof-PARALLEL storey lines — I_1 = roofpar(I) ∩ (M–Base), J_1 = roofpar(I)
  ∩ (Base–T), T_1 = roofpar(J) ∩ (C–I_1), U_1 = roofpar(J) ∩ (I_1–O),
  V_1 = roofpar(J) ∩ (R–J_1), W_1 = roofpar(J) ∩ (J_1–V). page button1 also
  resets Base/edgeleft/offsets.
- **Reaction A**: green up vector at D ((7,2.1)→(7,2.9)) + offset copy
  C_3→B_3 at x(F_0) − offsetReactionForces with green dashed whiskers.
  Sliders offsetLoads (0..1, 0) shifts the green load vectors off the load
  line; offsetReactionForces (0..1, 0.5).
- **Internal-force pipes**: internalForce macro quads (brown α 0.5) for all
  22 members (incl. the 7 roof-tie pieces + trunk), width = force·sIF,
  slider 0..0.05 default 0 (a mode≟3 pipe set for the step-3 tree is dead
  code — mode max is 1). Ours: pipes on the resolve step, o1 default true.
- **Dead/NaN**: CenterPoint + centerline1 + the whole H_3/E_3/poly1 green
  square + c_9 circle (NaN chain); radius slider hidden; H_2/I_2 unused.

## Toggles / defaults

| control | kind | default | ported |
|---|---|---|---|
| mode / step | sliders 0..1 / 0..4 | 0 | step player (10 steps) |
| scaleForceDiagram | 0.5..1.5 | 1.1 | slider |
| scaleInternalForces | 0..0.05 | 0 (visible) | slider, default 0.02 + o1 toggle |
| offsetLoads | 0..1 | 0 | slider |
| offsetReactionForces | 0..1 | 0.5 | slider |
| showLabels | checkbox | true | toggle (all member numbers) |
| button1 reset / button2 parallel | buttons | — | both |

Draggable: edgeleft, Base (rails), F_0, and the six nodes I_1, J_1, T_1,
U_1, V_1, W_1 — each constrained to its parent-branch axis (param stored,
so dragging Base/edgeleft carries the whole tree like the applet's paths).

## Regression (scratchpad/v25_regress.py vs live dumps)

38 derived points (roof divisions, parallel defaults W/Z/A_1..D_1, load-line
divisions, all 7 poles, offsets) × 6 states (default, step2, step4, pipes,
dragged Base/edgeleft/F_0, dragged nodes + offsets): max err **1.1e-14**.
