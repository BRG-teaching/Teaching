# view_17 "Masonry arch on spreading supports" — decoded algorithm

A semicircular masonry arch (19 voussoirs, extrados r=16 / intrados r=13,
centre G=(35,6), springing line y=6) whose RIGHT support H_4 can be dragged
outward along the springing line (from L'=(48,6) up to K_12=(53.79,6)).
Spreading opens THREE hinges: at the crown EXTRADOS J=(35,22) and at the
haunch INTRADOS points R_2 (left, fixed) and R_3→I_4 (right, translates
with the support). The arch splits into four rigid bodies; the thrust line
through the three hinges is found with the three-point funicular method
(two hidden trial poles). If the right exit of the thrust line passes
outside the moved support edge L_5 = H_4+(3,0), the applet shows
"YOUR ARCH JUST COLLAPSED !" (red), else "YOUR ARCH STILL STANDS" (green).

## Fixed geometry
- G=(35,6); rE=16 (H=(19,6), H'=(51,6)); rI=13 (K/L=(22,6), K'/L'=(48,6)).
- ang = π/19 (angle = O1/19); voussoir joints at θ = k·ang from each
  springing, k=1..9; the crown (θ=π/2 = 9.5·ang) is MID-voussoir — the
  crown voussoir cracks into two halves at the crown hinge.
- Hinges at joint 3 (θ=3·ang): R_2 = G+13·(−cos3a, sin3a) =
  (23.56688, 12.18739) fixed; R_3 its mirror (46.43312, 12.18739).
- Bodies: left-bottom (springing..joint3, NEVER moves), left-upper
  (joint3..crown, rotates about R_2), right-upper (crown..joint3, maps
  R_3→I_4 rigidly), right-bottom (joint3..springing, translates by dx).

## Mechanism (drag H_4, dx = x(H_4)−48 ∈ [0, 5.788])
- I_4 = H_4 + (R_3 − L') = R_3 + (dx,0).
- S_4 = displaced crown hinge = Circle(R_2,|R_2−J|) ∩ Circle(I_4,|R_3−J|),
  upper intersection (falls as the supports spread).
- Left-upper body: rotation about R_2 mapping J→S_4 (V_4 = image of the
  crown intrados (35,19), Z_4 = image of G). Right-upper: P ↦ I_4 +
  Rot(φR)(P−R_3), φR = ang(S_4−I_4) − ang(J−R_3) (D_5 = image of (35,19),
  G_5 = image of G). Right-bottom: pure translation (F_5 = G+(dx,0),
  L_5 = H'+(dx,0), K_5/H_5 = extrados point over I_4).
- Crack faces drawn: crown b_8 = S_4–V_4 and i_8 = S_4–D_5; haunches
  c_1/f_8 (R_2: N'–R and B_5–R_2) and b_9/m_8 (I_4–K_5 and H_5–I_4).
- Original arch stays as GREY th1 reference: arcs p_1 (intrados L–J_1–L'),
  k_1 (extrados I–J–I'), joints 4..9 left (d_1..i_1), ALL right joints
  (d_6..l_6) + right springing joint l_1. Left-bottom joints stay black
  (a_1, b_1, c_1, j_1 — that body never moves). Dashed semicircles f, k
  (black dash20). Ground j_20 = grey segment y=6, x 15.167..58.619.
  Spread gap e_7 = Segment(L', H_4) black dash10.

## Loads / load line
- 19 voussoirs, weight 2 kN each (|EF|=2); the crown voussoir is split
  into two 1 kN halves → 20 loads on 20 centroid verticals (grey dash20,
  y 3.2508..30.2364). Left-bottom body uses ORIGINAL centroids A_1,B_1,C_1
  (x 20.547, 20.941, 21.719); left-upper A_6..F_6 (22.86..32.61); crown
  halves A_7 (34.40), W_10 (35.60); right-upper S_6..Z_6 (37.39..47.14);
  right-bottom D_7,F_7,H_7 (48.28, 49.05, 49.45) — all displaced with
  their bodies. Green load arrows (th5, length = loadSymbol) from
  y=Y_WTIP+sLS down to Y_WTIP=25.60143.
- Load line at x = x(F_2)=70.03597 (F_2=(70.036,28.1464) free white),
  drops = weight·sFD: 9×1.2, 2×0.6 (crown halves, division G_3 =
  midpoint), 9×1.2 → 21 points P[0..20] (F_2, G_2, I_2, J_2, K_2, L_2,
  M_2, N_2, O_2, P_2, G_3, Q_2, Q_9, R_9, S_9, T_9, U_9, V_9, W_9, Z_9,
  A_10), b_13 black th2 always. Column j (left→right) ↔ edge P[j]–P[j+1]
  (col 0 = leftmost = TOP edge).

## Three-point pole construction (ALL hidden in the applet — staged in
## the port and retired at resolve)
- Left span (S_4..R_2): trial pole B_10 = (75.65230, 28.49699); trial
  funicular from C_10 = (x(S_4), 36.97156) on the crown vertical, each
  segment ∥ B_10→P[j], crossing columns 9,8,…, stopping at the first
  column line with x < x(R_2) → last segment extended to the R_2 vertical
  → K_10. Closing b_14 = C_10–K_10 (dash15); through B_10 ∥ closing →
  L_10 on the load line (division point); f_14 = line through L_10 ∥
  chord S_4–R_2 (j_14, dash15).
- Right span (S_4..I_4): trial pole M_10 = (76,26); trial funicular from
  N_10 = (x(S_4), 38.88809), segments ∥ M_10→P[j], columns 10,11,…,
  stopping before x > x(I_4) → V_10 on the I_4 vertical; closing p_15 =
  N_10–V_10; through M_10 ∥ closing → D_11 on the load line; t_15 =
  through D_11 ∥ chord S_4–I_4 (k_14).
- POLE E_11 = f_14 ∩ t_15 (visible dark point; default (66.4914,16.7464)).
  (A second, fully hidden construction with pole H_2/D computes the
  original no-spread thrust line a_6/i_7 — red, never shown; skipped.)

## Thrust line (blue th5) + rays
- Crown segment through S_4 ∥ ray E_11→P[10] (crown division G_3) → P_11
  (col 9) and F_11 (col 10). Then outward both sides: the segment leaving
  col j toward col j∓1 is ∥ ray E_11→P[j] (left: cols 9→0, rays P[9]..;
  right: cols 10→19, rays P[11]..P[19]); after the last column the
  segment ∥ P[0] (resp. P[20]) descends to the ground y=6.
- EXIT: whichever segment first crosses y=6 ends the polyline (applet
  cases: left N_12/T_11/P_12 = exit during ∥P[1] / ∥P[0] / ∥P[2]; right
  R_12/U_11/S_12 = ∥P[19] / ∥P[20] / ∥P[18]; the ∥P[2]/∥P[18] cases are
  drawn RED (c_19/f_19) with their rays r_16/k_17 red th3). Default
  exits: left N_12=(20.8058,6) [∥P[1]], right R_12=(49.1949,6) [∥P[19]].
- Rays E_11→P[j]: th2 blue (j=0,20 th4; exit-case rays red th3).
- Reactions green th5: force diagram u_12 = E_11→P[0] 'A', w_11 =
  P[20]→E_11 'B' (COND !hideRF), v_12 = P[0]→P[20] ON the load line;
  form: arrow of length loadSymbol along the exit ray into each exit
  point, caps 'A' (left) / 'B' (right).
- Collapse test: x(right exit) > x(L_5) → red text at (29.4,10.4);
  else green "YOUR ARCH STILL STANDS".
- internalForce pipes Vieleck2_2,3..19,20_2 (20, brown 153,51,0 α.5)
  along the thrust line; force of span j = |E_11−P[j]|/sFD.

## Sliders / booleans
- loadSymbol 1..10 (2.5), scaleForceDiagram 0.5..1 (0.6),
  scaleInternalForces 0..0.1 (0); hideRF (false), showHandles (false:
  load-line division points + guide handles G_13/H_13/L_13/K_13/N_13/
  O_13/frame pts). No other toggles (verified: no dead booleans).

## Port decisions
- 15 steps 0..14, RESOLVE=14: intro → arch site (1) → voussoirs (2) →
  three hinges + draggable support + gap (3) → weights + load line (4) →
  chords of the two spans (5) → trial 1 + closing (6) → division L_10 +
  ∥chord (7) → trial 2 + closing + division D_11 + ∥chord → pole o (8)
  → crown segment through S_4 + crown ray (9) → left descent + rays (10)
  → right descent + rays (11) → ground exits + reactions (12) → spread
  demo caption/status (13) → resolve (14): trials retire, pipes on,
  stands/collapsed status text live.
- Thrust line computed as a generic walk with ground-exit test — this
  reproduces ALL the applet's If-cases (incl. red exits) in one code path.
- Collapse red = 0xd11616 (true red, NOT tension pink — it is a danger
  flag, not a force sign); status text ported verbatim.
- Trial apparatus staged grey (funiculars) / black-dashed (closings,
  chords) and retired at resolve behind a "show construction lines"
  toggle (the applet never shows them at all — deviation for pedagogy,
  same as view 16).
- meta.frame [[12.4,1.2],[77.5,39.8]] — taller than the applet frame
  (top 33.78) so the trial starts C_10 (y 36.97) / N_10 (y 38.89) are
  visible.
- Node inspector on the thrust line: 22 nodes = left exit, cols 0..19,
  right exit; interior col j: [P[j]→P[j+1], P[j+1]→E_11, E_11→P[j]];
  exits degenerate to thrust + reaction — the reaction side uses the SAME
  coordinates as the drawn green reaction vectors (E_11→P[0] / P[20]→E_11,
  which lie ON the rays, so the inspector arrows land on them exactly).

## Regression
scratchpad v17/regress.py re-derives (defaults, dx=0): hinges, S_4,
displaced-body images, all 20 centroids, load line, both trial funiculars
(D_10..K_10, O_10..V_10), closings, divisions L_10/D_11, pole E_11, the
thrust-line vertices, exits and case selection, reaction tips — 59 targets
vs the baked homogeneous coords: max |Δ| = 8.9e-5 (dump rounding); exit
cases match (left ∥P[1] at N_12, right ∥P[19] at R_12); pole E_11 is
invariant under the trial-pole choice to 3.6e-15 (theorem check — justifies
the port's visible default o′₂=(76,4) instead of the hidden (76,26), whose
trial funicular would rise to y≈62, far off-frame); collapse fires between
dx=4 and 5 (exit 56.62 > 56.0).

## Port verification (2026-08-06)
- Live-applet sweep (ggbApplet API): booleans are ONLY hideRF (hides
  {w_11, u_12}) and showHandles (46 division points/edges) — both ported;
  sliders loadSymbol/scaleForceDiagram/scaleInternalForces ported with the
  applet's ranges. Live screenshots at rest and at H_4=(51.5,6) confirm
  the mechanism (crown V-crack, translated right body, grey original arch
  behind, status text centred in the open span) and the thrust line.
- The applet's visible thrust polyline i_18 lists its vertices out of
  drawing order; the port draws the ordered walk (same points).
- CDP-verified: drag H_4 to 53.5 → "YOUR ARCH JUST COLLAPSED !" (red),
  drag back → "YOUR ARCH STILL STANDS"; node inspector star lands on the
  drawn reaction vectors (exit nodes use E11→P[0] / P[20]→E11); pipes,
  readouts W/H, hideRF/show-handles toggles all checked per step.
