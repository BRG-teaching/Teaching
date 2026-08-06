# view_31 — Eiffel Tower, G. Eiffel — applet decode

Source: `view_31/applet_0/geogebra.xml` (387 objects) + the LIVE applet
(https://block.arch.ethz.ch/eq/drawing/view/31) driven headless via the
ggbApplet API (per-step `getVisible` diff of every object; point coordinates
snapshotted at defaults and two dragged states). Title from page.html:
**Eiffel Tower, G. Eiffel**.

## The model

- Base: A = (5, 3) fixed, B = (7.18, 3) draggable on y = 3 (page button
  "reset geometry" restores B and W). Top C = (5, 10.502) draggable on the
  vertical through A: the height ladder. |AC|/6 = one storey; storey lines
  y_k = 3 + k·|AC|/6, k = 1..6, drawn dotted across x ∈ [2.697, 12.364]
  (the hidden handles N_2, O_2 set the extents; J_3 = (0, 2.176) sets the
  dimension-line height).
- Axis x = (A.x + B.x)/2; apex R_1 = (axis, y_6). The tower: windward leg
  A–B_2–C_2–D_2–E_2–F_2–R_1, leeward leg B–G_2–K_2–J_2–I_2–H_2–R_1,
  horizontal braces at storey lines 1..5.
- Wind: 6 equal horizontal loads Q_1..Q_6 (green th5, symbols of length
  scaleLoadSymbol ending on the draggable x = I) at the storey lines.
- Load line: horizontal through W = (14, 3) free; points W, Z, A_1, B_1,
  C_1, D_1, E_1 spaced Q·scaleForceDiagram.
- Trial: free pole F_1, rays to the 7 load points; trial funicular from
  G_1 (draggable on storey line 1) between the lines of action; outer sides
  (dashed) meet at M_1 → the resultant's horizontal line of action y_R;
  R = green dashed th5 vector at draggable H_3 (form) and, offset by
  offsetResultant below the load line, A_4→F_4 labeled R (ORANGE dashed in
  the applet; ours green per the platform resultant rule).
- O_1 = (axis, y_R). Reaction directions = A–O_1, B–O_1 (dashed). Pole
  P_1 = (∥A–O_1 through W) ∩ (∥B–O_1 through E_1) — always vertically above
  the load-line midpoint B_1 (dimension f_1 = f_1, dashed vertical k_7).
- Hidden second pole S_1 = (W–P_1 extended) ∩ (∥ chord B_2–R_1 through
  B_1) = 2·P_1 − W. Division points T_1, U_1, W_1, Z_1, A_2 on the
  horizontal g_3 through P_1, spaced Q·sFD/2 (each brace carries HALF a
  load, texts Q_1/2 .. Q_5/2); T_1 is vertically above the midpoint of
  Z..E_1 (dimension f_2 = f_2, step 5).
- Windward leg sides ∥ the S_1 rays from Z, A_1, B_1, C_1, D_1; leeward
  leg built from the apex down ∥ the E_1 rays (E_1–A_2, E_1–Z_1, ...).
- internalForce macro pairs (member: form a–b, force f1–f2), members
  numbered by texts 3..36: 1 A–B_2:W–P_1, 2 B–G_2:P_1–E_1, 3 B_2–G_2:
  T_1–P_1, 4 B_2–C_2:Z–T_1, 5 G_2–K_2:T_1–E_1, 6 C_2–K_2:U_1–T_1,
  7 C_2–D_2:A_1–U_1, 8 K_2–J_2:U_1–E_1, 9 D_2–J_2:W_1–U_1, 10 D_2–E_2:
  B_1–W_1, 11 J_2–I_2:W_1–E_1, 12 E_2–I_2:Z_1–W_1, 13 E_2–F_2:C_1–Z_1,
  14 I_2–H_2:Z_1–E_1, 15 F_2–H_2:A_2–Z_1, 16 F_2–R_1:D_1–A_2,
  17 H_2–R_1:A_2–E_1. W angles (live): W1–W6 = 0 (windward leg = TENSION),
  W7–W17 = π (braces + leeward leg = COMPRESSION).
- Reactions: form u_2/v_2 = arrows of length sLS into A and B along the
  leg directions; force w_2 = offset copy of P_1→W ("A"), u_3 = offset of
  E_1→P_1 ("B"), offset by offsetReactionForces perpendicular outward, with
  dotted connectors W–U_3, E_1–C_4, Z_3–P_1, D_4–P_1.
- Image `pic1` = Eifelbackground_72.jpg (269×450), anchors F_3 =
  (3.6308, 2.7717) (bottom-left), G_3 = (8.4142, 2.7772) (bottom-right),
  alpha 0.25, COND[step ≟ 0] — the photograph shows ONLY at the resolved
  state. Shipped as the actual image `web/assets/view_31_tower.jpg` via
  dw.image at the same anchors/alpha (photo policy 2026-08-06); ours
  appears at the final resolve step, plus a panel toggle.

## Controls (live-verified)

| control | kind | default | range | effect |
|---|---|---|---|---|
| mode | site slider | 0 | 0/1 | 1 shows the step slider |
| step | slider | 0 | 0–8 | staging; step 0 = final |
| Q | slider | 2 | 1–5 | load |
| scaleForceDiagram | slider | 0.3 | 0.1–0.5 | load-line scale |
| scaleInternalForces | flyout slider | 0 | 0–0.01 | pipe half-width = sIF·|force|/sFD (mode 0 only) |
| scaleLoadSymbol | slider | 1 | −5–5 | load/reaction symbol length (ours 0.2–2.5) |
| offsetResultant | in-canvas slider | 0.8 | 0–1.2 | R offset below the load line (shown steps 2–3) |
| offsetReactionForces | in-canvas slider | 0.4 | 0–3 | reaction offset beside the outer rays |
| showLabels | checkbox | false | | member numbers 1–17 both diagrams (ours default TRUE, house rule) |
| o "show handles" | checkbox, hidden | false | | white drag handles (C, I, N_2, O_2, J_3, frame pts) |
| o_1 "show points" | checkbox, hidden | false | | force-diagram construction points |
| button1 | button | | | reset geometry: B=(7.18,3), W=(14,3) |

## Applet steps (mode 1; current-step elements flash orange) → ours

| applet | content | ours |
|---|---|---|
| 1 | loads + load line highlight (always visible) | 2 |
| 2 | trial pole F_1 + rays + trial funicular + closings; R line j_5; R both sides (v_3, w_3+m_8/n_8); offsetResultant slider | 3–4 |
| 3 | O_1, closing dirs n_2/p_2, l_1=l_1 dims (–step 6), pole rays i_3/n_3, reactions u_2/v_2 + offset w_2/u_3 + connectors | 5–6 |
| 4 | members 1, 2 (+texts), f_1=f_1 dims + vertical B_1–P_1; TRIAL + R ARROWS RETIRE | 7 |
| 5 | node B_2: members 4 (+force Z–T_1), brace 3 orange (a_9) + force P_1–T_1 "Q_1/2", f_2=f_2 dims; j_5/O_1/n_2/p_2/offset-reactions retire | 8 |
| 6 | node G_2: member 5 + force T_1–E_1; brace orange d_9 | 9 |
| 7 | ALL remaining members 6–17 + points + Q_i/2 texts; l_1 dims retire | 10–13 (one storey per step) |
| 8 | offset reactions + connectors return; Q_i/2 texts retire | 14 |
| 0 | ≡ final + PHOTO + internal-force colors (mode 0) | 15 |

## Regression (scratchpad v31/regress31.py vs live coordinates)

- default: 55 points, max |err| = 2.9e-13
- drag1 (B=8.2, C=(5,12), W=(13.5,2.5), Q=3, sFD=0.4): max 1.2e-13
- drag2 (+F_1, G_1, sLS=1.5, oR=1.1, oRF=1.0): max 7.7e-14
- invariants: P_1 exactly above B_1; T_1 above mid(Z,E_1); S_1 = 2P_1−W;
  g_3 spacings all Q·sFD/2; all 13 node polygons close (≤1e-9); all 17
  members exactly parallel to their force segments (|sin| ≤ 3e-16).

## Deviations from the applet (deliberate)

- Force-side resultant R drawn dashed GREEN (applet: orange dashed th5);
  form R green as in the applet. Platform rule: R dashed green, both
  diagrams, same step.
- Applet step 7 (all upper storeys at once) split into 4 one-storey steps;
  Q_i/2 brace texts appear with their storey (applet: all at step 7),
  retire at our step 14 (applet hides them at step 8) — two staggered rows
  like the applet's pixel offsets.
- showLabels (member numbers) defaults TRUE; show-points defaults TRUE;
  scaleLoadSymbol range clamped to 0.2–2.5 (applet −5..5 allows degenerate
  0/negative symbols); scaleInternalForces defaults 0.006 with pipes-on
  toggle (applet 0 = hidden until the flyout slider is moved).
- Leeward force numbers cascade down the E_1 fan (the applet's midpoint
  labels overlap each other near E_1).
- The height ladder A–C is drawn as a dashed guide (hidden circle chain
  d..h in the applet) so the draggable C reads as the height handle.
- Trial retires at our step 7, R action line and O_1/closing dirs at our
  step 8, l_1 dims at 10, offset reactions hide 8→14 — exactly the
  applet's own retirement pattern (steps 4, 5, 7, 5→8).
- Pole labeled o (project convention; the applet leaves P_1 unlabeled),
  trial pole o′ (= F_1).

## Node inspector

13 nodes: 1 = support A, 2 = support B, 3..12 = B_2, G_2, C_2, K_2, D_2,
J_2, E_2, I_2, F_2, H_2, 13 = apex. Sides = the node's closed force
sub-polygon (windward nodes: load edge + two leg forces + brace; leeward:
force triangles through E_1; apex: Q_6 + members 16/17). Support reaction
sides reuse the coordinates of the VISIBLE offset arrows Z_3→U_3 / C_4→D_4.
