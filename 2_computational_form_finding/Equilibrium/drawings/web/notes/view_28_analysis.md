# view 28 — PAT Center, R. Rogers

Ground truth: https://block.arch.ethz.ch/eq/drawing/view/28 (live via CDP;
11 states in scratchpad/live28/: default, steps 1–7, F_1 = 300, pipes on,
two head-drag states). Applet `step` 0..7 (mode ≟ 1); mode 0 = final.

Rogers' Princeton PA Technology Center: a cable-STAYED roof. An A-frame
(apex D_1, blue legs 6/7 down to the feet B_6/B_2, only 2.14 apart) carries
two cable junctions D_2/D_3; stays 1–3 / 10–12 fan to the deck anchors,
stays 5/8 run to the apex, struts 4/9 tie the junctions to the feet. The
DECK (13–19, blue) is the compression chord; the foundations 20/21 are the
only vertical reactions — and because the feet are so close, moving F_1
50→300 kN flips the left reaction DOWNWARD (B = −200 kN at F_1 = 300): the
applet's reaction arrows flip via its angle tests, faithfully ported.

## Decode summary (570 objects; text labels resolved via startPoint exps —
the CAPs on segments are stale, e.g. CAP "8" on the stay the texts call 5)

- **Fixed geometry**: deck y = 2.114668823637154; feet B_6 x =
  7.920178872037255, B_2 = B_6 + 2.14; anchors B_3/B_4/B_5 = B_6 − 7.49/
  4.68/2.96, B_7/B_8/B_9 = B_2 + 2.96/4.68/7.49; foundations W_1/M_3 =
  feet − (0, 1.5). Head RAILS (verticals, from circle intersections):
  x = 5.755043736902118 (D_2), 8.990178872037259 (D_1, apex),
  12.225314007172388 (D_3); defaults y = 3.303403380467803, 6.978360836912666,
  3.303403380467811 (page reset button restores them). Heads DRAG vertically.
- **Members** (final numbering from the ~40 texts): stays 1,2,3 = B_3/B_4/B_5–D_2;
  4 = B_6–D_2 (strut); 5 = D_2–D_1; legs 6 = B_6–D_1, 7 = B_2–D_1 (BLUE);
  8 = D_1–D_3; 9 = B_2–D_3; 10,11,12 = B_7/B_8/B_9–D_3; deck 19..13 =
  B_3–B_4 … B_8–B_9 (numbered RIGHT-to-left 13..19, BLUE incl. the piece
  16 between the feet); foundations 20 = B_6–W_1, 21 = B_2–M_3 (blue,
  dashed). Live site colors = force sense (red tension / blue compression),
  not in the XML snapshot.
- **Loads**: green, length sLS, at B_3..B_9 (skipping the feet):
  F_6, F_5, F_4 | F_3, F_2, F_1 left→right. F_1..F_3 = sliders 50..300
  (100/200/200); the left side is HARDCODED in every construction as
  200 (B_5), 200 (B_4), 100 (B_3) — the applet's on-canvas texts
  "F_4=160kN, F_5=160kN, F_6=80kN" are STALE (its own load lines, trial,
  reactions and readouts all use 200/200/100; with them A = B = 500 kN
  exactly). We label the true values F_4 = 200, F_5 = 200, F_6 = 100 kN.
- **Load line 1** (steps 1–4) from draggable D (21,4): drops F_1 F_2 F_3
  200 200 100 (/sFD, sFD = 150 kN/unit slider 50..200).
- **Trial** (step 2): pole M (draggable, "o") + 7 grey rays; strings from
  draggable P_2 on the B_9 vertical across B_8, B_7, B_5, B_4, B_3
  verticals (piece after load k ∥ ray M→LL1[k+1]); outer strings extended
  (dashed) meet at I_3 → the dotted VERTICAL action line of R (dashed
  green R on the load line + at I_1).
- **Substitute system** (step 3): I_1 draggable ON the action line;
  two-bar system B_6–I_1–B_2 (grey, "1"/"2") + the red TIE B_6–B_2 ("3")
  + foundations ("5"/"4"); force triangle D–J_1–L (J_1 = Line(D ∥ B_6→I_1)
  ∩ Line(L ∥ I_1→B_2)); the tie is horizontal, so the HORIZONTAL through
  J_1 cuts the load line at the division K_1 ("3").
- **Reactions** (step 4): A = L→K_1 (bottom piece, the RIGHT mast/
  foundation 21), B = K_1→D (left, 20) — SIGNED: sums/moments verified,
  F_1 = 300 gives A = 1400, B = −200 and the form arrows flip (applet
  winkel_a/winkel_b If-tests). Offset copies beside load line 1 (step 4)
  and beside the final line (step ≥ 5), offsetReactionForces slider.
- **Final force diagram** (steps 5–6), anchor 'a' (21,2) draggable: down
  a →F_1→ A_1 →F_2→ A →F_3→ C, up A to O_1 = C + Ā, up B to P_1, down
  F_4 F_5 → H_2 (H_2→a = F_6 closes identically since Ā+B̄ = ΣF). Members
  as a chain of parallels from 'a': 12 ∥ B_9–D_3 to horiz(A_1) → Q_1;
  11 → R_1 (horiz A); 10 → S_1 (horiz C); 9 ∥ B_2–D_3 ∩ 8 ∥ D_1–D_3
  through a → T_1; 7 → U_1 (horiz O_1); 6 ∩ 5 (through a) → V_1;
  4 → Z_1 (horiz P_1); 3 → I_2 (horiz F_2p); 2 → J_2 (horiz H_2); stay 1
  = a–J_2 closes ∥ B_3–D_2 (verified < 5e-14). Deck forces = the
  horizontals: 19 = H_2–J_2, 18 = F_2p–I_2, 17 = P_1–Z_1, 16 = O_1–U_1,
  15 = C–S_1, 14 = A–R_1, 13 = A_1–Q_1; foundations 20 = O_1–P_1,
  21 = C–O_1 (blue, on the line). Readout: |B| = |N_20|, |A| = |N_21|.
- **Warning**: "Attention! The tension cable can not be in compression!"
  (red) when any of members {1,2,3,4,5,8,9,10,11,12} flips sense (drag the
  heads down); the macro angle test ≡ isCompression(ggbAngle(member dir,
  force dir)) with the internalForce argument order.
- **Pipes**: internalForce quads for all 21 members (sIF slider 0..2,
  applet default 0; ours on at 0.6 with o1). Member↔force pairs in
  views/view_28.js MEMBERS table (from the V1..V21 macro calls).
- **Toggles**: showLabels (default true), hideRF, pointsLL1/pointsLL2/
  pointsFD (grey construction points; merged into one "show points"),
  showHandles (reset markers + frame — not ported), offsetLoads,
  offsetReactionForces.

## Regression (scratchpad/v28_regress.py vs live dumps)

40 derived points (deck geometry, load line 1, trial strings T_2..H_3, I_3,
substitute J_1/K_1, final line A_1..H_2, all 9 chain nodes Q_1..J_2) ×
4 states (default, dragged heads ×2, F_1 = 300): max err **4.8e-14**;
stay-1 closure parallel < 5e-14 everywhere. Signed-reaction port closes the
final polygon for ALL slider values (including negative B).
