# View 19 — Wooden bridge in Essing (decode notes)

Source: `view_19/applet_0/geogebra.xml` (19 843 lines, 1420 objects, 289 visible),
baked coords `view_19/view_19_compas.py`, live ground truth
https://block.arch.ethz.ch/eq/drawing/view/19 (screenshotted per state via ggbApplet).

The Essing timber bridge (Tatzelwurm): a continuous laminated-timber band over
four fields 17 + 32.5 + 32.5 + 17 m. The main span hangs (sags) between the
piers; the approach fields arch UP over trestle bents, with the same (mirrored)
geometry as the adjacent portion of the main field; the band is anchored at the
abutments. Everything is drawn for the LEFT half; the right half is a grey
mirror ("assumption: symmetric").

## Frame / scale

EV window ≈ x −458…1437, y −724…223 (scale 0.633). Form diagram: deck line
y = 10, x = 10…1030 (1 unit = 0.1 m nominal; the dimension labels are the real
bridge: 17 / 32.5 / 32.5 / 17 m). Force diagram: load line at x = 10,
y = −400…−488 (+ mirror to −576); F(kN) = length·scaleForceDiagram/20.

## Free points / sliders / booleans (probed live: no other secret layers)

| name | value | meaning |
|---|---|---|
| FDS_{21} (10,10) fixed | left abutment | FDS_{22} (180,10) left pier; FDM_1 (520,10) crown x (all hidden) |
| MovePoint (520, −17.148) | on MoveSegment (520, 0.939…−70.829) | crown sag — THE draggable point |
| spR1_2 (10,−400) | load-line start (draggable) |
| S_4 (95, 120.248), S_19 (10,−165.430) | on-path anchors: R₂ symbol arrow top, dimension-line height |
| F_G = 11 [5..20] | one strip load (kN); load-line step = F_G/sFD·20 = 4.4 u |
| scaleForceDiagram = 50 [50..100], scaleLoadSymbol = 2.1 [1..3] | |
| mode [0/1], step [0..3] | step slider only in mode 1; mode change resets step (geogebra_javascript.js) |
| sCoF1 / sCoF2 (false) | show construction objects field 1 / 2 (blue dotted full lines + vertex dots) |
| o_2 / o_3 (false) | author handles (5 / 21 points) — never ship |
| o_4 (true) | site drawing (87 elements) |
| v_4 "Resultierende" (false) | 80 per-strip load arrows (40 on the q band + 20 under-deck field-2/right) |
| loadlines (false) | DEAD — referenced nowhere (verified in XML + live diff = 0 objects) |

## Construction chain (regressed in python, MAX ERR 4.9e-7 over 140 points)

Strips: width 17 u (1.7 m); centers 18.5+17k; dotted vertical strip lines at
every center from y = 196.54 (Q_5) to −176.54 (mirror over deck line h: y=10);
heavier dotted lines on the resultant axes x = 95, 350, 520, 690, 945; dashed
th2 lines at ends x = 10, 1030 and piers x = 180, 860.

- a_5 = tangent of the main parabola at pier FDS_22 → A_5=Z_22=(350, y_MV)
  (tangents from support and crown meet on x = 350, the mid-vertical).
- pole1 = (line through spR1_2 ∥ a_5) ∩ (horizontal through P_5) = (561.05, −488).
- Field-1 funicular (parabolaF1_2): FDS_22 → P_6…K_7 (vertices on the 20 strip
  centers 188.5…511.5, string k ∥ (loadpt_k → pole1)) → MovePoint. K_7.y ≡ MV.y.
- Field-2 load line laid UPWARD: fp_k = (10, −400+4.4k), F_8 = fp_10 = (10,−356)
  ("the approach hangs the other way": mirrored geometry ⇔ reversed loads,
  text5_1 **F_L = −F_R**, green q-band mirrored BELOW the deck = poly2).
- c_10 = abutment tangent FDS_21 → Z_4 = W_22 = (95, 23.574) (both field-2
  tangents meet over the field-2 midline, chord s_22 dashed).
- pole2 = (line through spR1_2 ∥ a_5) ∩ (line through F_8 ∥ c_10) = (−127.7,−378).
- Field-2 funicular (c_11): FDS_21 → T_7 H_8 I_8 J_8 K_8 D_8 B_8 Z_7 V_7 G_8
  (centers 18.5…171.5) → FDS_22; arches UP (apex 16.79); first/last strings
  ∥ a_5 / ∥ c_10 — the band is kink-free at the pier.
- N_7 = (vertical through pole1) ∩ (line F_8 ∥ c_10) = (561.05, −268).
- Green result vectors (drawn ON the force polygon, dual arrows in the form):
  R₁/₂ = spR1_2→P_5 (88 u = 220 kN) ↔ U_4→V_4 arrow at x=350;
  R₂ = F_8→spR1_2 (44 u = 110 kN) ↔ S_4→T_4 arrow at x=95;
  H = P_5→pole1 (551 u = 1377.6 kN) ↔ arrow at the crown (MovePoint→+63u);
  F_R = spR1_2→pole1 ↔ pier arrow FDS_22→V_22 (63 u symbol, along a_5) and its
  opposite F_L(step1 name) = FDS_22→S_22 — action = reaction at the pier;
  A = pole1→N_7 (220 u = 550 kN, trestle reaction) ↔ up-arrow R_5→S_5 at x=95;
  F_L = N_7→F_8 (558 u = 1395.1 kN anchor pull) ↔ FDS_21→W_4 (63 u along c_10).
  Components (step ≥ 3, grey th3 dashed): F_L_H = N_7→(10,−268) (= H!),
  F_L_V = (10,−268)→F_8 (220 kN); mirrors for F_R.
- Field-2 rays (construction only, never labeled as forces): fp_k→pole2 dashed;
  extended solid to the A-line (x = 561.05) as i_4/j_4/… (A_23…J_23).
- Right half: mirror everything across rlField_2 (x = 520); force diagram
  mirrored across mirrorForceDiagram (horizontal y = −488 through pole1):
  grey R₁/₂, R₂, F_R, B (= K_15→pole1, 550 kN up at the right trestles).
- Physics check: the band is in TENSION everywhere (H = 1377.6 kN constant;
  approach curves up ⇒ needs net UPWARD load ⇒ trestles push A = 550 =
  110 (strips) + 220 (R₁/₂ via pier) + 220 (F_L vertical) ✓). pole2's rays are
  geometric construction (H₂ = 137.7 u = H/4), NOT the band force — therefore
  the node-equilibrium inspector only offers nodes whose applet rays are true
  forces: abutment (F_L pair), pier (F_R pair), 20 main-field vertices
  (strip load + pole1 rays), crown (H pair).

## Applet steps (mode 1; orange = current, decoded from dynamic colors)

1. field 1: q band 180→520 + R₁/₂ + funicular + pole rays + tangent chords
   n_22/q_22/r_22 + H + F_L (v_17/u_17 on the spR1_2→pole1 ray).
2. field 2: assumption text, q band 10→180 + mirror band below, R₂, c_11,
   pole2 rays, F_L = −F_R (g_3/w_6 = same ray, renamed F_R), A, F_L(N_7→F_8),
   F_R(force at right springing? no: R_2 vectors), tangent pair to W_22 + s_22.
3. right half grey (funiculars g_12/l_14, bands poly3/poly2', force mirror,
   B, F_R at right abutment) + F_L_H/F_L_V/F_R_V/F_R_H components.

## Site drawing (o_4, 87 elements — reproduced exactly)

- Deck band: 3 arc pairs (upper/lower edge 8 u apart, grey 64 th1):
  left field CircleArc(CoPo_1=(95,−593.3)ish, from (180,14) to ray→FDS_21)
  + CoPo_2 = −(0,8); main field CircleArc(CoPo_3=(520,2232)ish, (180,14)→ray
  B_14=(860,10)) + CoPo_4; right field = mirrors (across d_20 x=520 / rlField_2).
  (centers CoPo_1/CoPo_3 are baked on-path points — parsed from compas.)
- Bearings: semicircle t_13 (I_24 (14.98,6.68) → J_24 (7.03,5.48)) at the
  abutment, mirrored to x = 179, 861, 1029 (piers + right abutment).
- Trestle bent (A-frame, double-line struts) around x = 51.6, mirrored to
  138.4 (across x = 95) and to the right half (across x = 520): legs
  a_14/b_14 (M_24/Q_24 → P_24/R_24), c_14/h_23 (R_24→S_24, S_25→T_25),
  inner triangle e_14/b_23/f_14/g_23/h_14/t_22/i_14/a_23, footing
  d_23/f_23/j_14 on ground; tiny cap d_14/f_24 at (93.3, 8.9→11.9).
- Terrain (black th3): e_23 (−65.3,−61.8)→(167.2,−61.8), steps g_24…j_24 down
  to the canal bed y = −131.11 (level 520), mirrored right.
- Abutment wedges: (10,14)→G_24(−65.8,0.66), (10,6)→H_24(−65.8,−7.34) + right
  mirrors.
- extras h_26/i_26/j_26/k_26 (short joins at the right bank/arc, from baked pts).

Dimension line: S_19(10,−165.43)→U_22(1030,−165.43) grey, star ticks at
x = 10, 180 (P_22), 520 (R_22), 860 (T_22 via g_21 = mirror of pier line b),
1030; grey texts "17 m" (x≈82), "32.5 m" (≈325), "32.5 m" (≈677), "17 m" (≈934)
at y ≈ −207.

## Our step list (14 steps, form ↔ force paired)

0 intro · 1 site + dimensions (instant) · 2 main-field strips + q band +
R₁/₂ ON the load line (+form R₁/₂ arrow) · 3 crown point + chord + tangents ↔
parallel rays → pole o₁ · 4 the 21 strings ↔ the 19 rays · 5 H at the crown +
F at the pier (both diagrams) · 6 approach q band (+mirror band below) ↔ loads
laid off upward, R₂ (F_L = −F_R) · 7 approach tangents → pole o₂ + its rays ·
8 the 11 approach strings ↔ their rays · 9 vertical through o₁ → N₇: reaction
A (form: up-arrow at the trestles) · 10 anchor force F_L (both) ·
11 components F_L_H = H, F_L_V (highlight form F_L) · 12 the right half in
grey (both diagrams at once) · 13 resolve: pink tension band + pipes +
readouts.

## Deliberate deviations (reasons)

- Palette per platform contract: band resolves PINK (tension member) instead of
  the applet's green; loads/reactions/resultants stay green; right half stays
  grey like the applet ("assumed" copy). Construction = grey dashed (the
  applet's sCoF blue dotted is an author aid, default off).
- The applet's F_L(step1)→F_R(step2) renaming of the same ray is captioned
  once as F (pier force), then F_L = −F_R explained at step 6.
- Dimension tick at x=860 (applet's T_22 sits there too — g_21 is the pier
  line, verified against baked coords).
- "original bridge geometry" marker point is invisible in the applet
  (show=false suppresses its caption in GeoGebra) — omitted.
- Node inspector limited to nodes with true forces (see physics check above).

## Regression

`scratchpad/regress19.py`: re-derives pole1, all 20 field-1 vertices, tangent
points, pole2, all field-2 vertices, N_7, symbol arrows, mirrored force
diagram, right-half mirrors, extended rays, dimension ticks, both load lines
from defaults → MAX ERR 4.877e-07 over 140 baked points (limited by the 6-dp
baked precision). Live-probe visibility diffs match the XML condition groups
exactly (v_4: 80, o_2: 5, o_3: 21, o_4: 87, loadlines: 0).
