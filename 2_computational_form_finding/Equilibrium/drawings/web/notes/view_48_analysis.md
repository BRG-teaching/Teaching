# view 48 — Internal forces in a beam – superposition

Ground truth: https://block.arch.ethz.ch/eq/drawing/view/48 (headless CDP,
dumps in scratchpad/live48/). No mode/step machinery; the staging is ours.

## Decode summary

Simply supported beam A(0,0)–B(10,0) (supports AT the ends), uniform load
`loadP` = 0.2 kN/m (its slider exists but is `show=false` and not exposed by
the page — q is effectively FIXED) plus two point loads:

- `F_{1}` (0..0.6 = 0.2) at `positionF_{1}` (slider 1..5 = 1) and `F_{2}`
  (0..0.6 = 0.2) at `positionF_{2}` (6..10 = 10). The page's moveLoad1/2 JS
  snaps the arrow points E/G to station x = position − 0.5.
- **Superposition on the load line**: LLk chain descends by
  (q + F₁·[posF₁=k] + F₂·[posF₂=k])/sFD per strip; green texts "q+F₁" /
  "q+F₂" at the fattened strip (texts 24–33, gated by position). `v_2` =
  LL0→LL10 green th5 cap R.
- Load band = green Polygon (top y 2.4994, bottom 1.9555), text "q"; F
  arrows (2·sLS) stand ON the band top at their stations, dashed action
  verticals `segLoaP1/2` when F ≠ 0. Dimension `n_1` cap "l = 10" grey at
  y = −1.4546 with cross-tick endpoints. Station verticals th1 dotted,
  clipped y 1.3003 … −13.555; edges x=0/x=10 th2.
- **Trial**: pole (draggable) on the vertical at distance H (slider 1..5 =
  4) LEFT of the load line; 11 grey rays; funicular from FP0 (0, −4.144) to
  C on x=10; closing FP0–C grey dashed(15); parallel through pole → division
  point `D` cap "l" (red, always shown). Resultant position: `M_1` =
  crossing of the OUTER strings extended (lines b_2/c_2) → green R arrow
  `u_2` at (x(M_1), 1.3003), dashed vertical f_2.
- **Reactions**: green arrows z/u_1 caps A/B at the beam ends (2·sLS);
  offset chain at +scaleOffsetReactionForces (0..1 = 0.5): w_1 = L_1→K_1
  cap B, z_1 = K_1→J_1 cap A, TH1 BLACK dashed whiskers g_2/h_2/i_2
  (LL0–J_1, D–K_1, LL10–L_1).
- **V-diagram**: baseline `r` = I–L th3 at y(I) = −6.939 (I draggable);
  red th3 polyline `l` = I → VP1 (jump A = |D LL0|·sFD) → slope −q (hidden
  direction vector v = (1, −loadP)) → VP2/VP3 (drop F₁ at E's station) →
  VP4/VP5 (drop F₂) → S (= −B) → L.
- **Mirror pole**: `pole2` cap "o" = (x(LL10)+H, y(D)) — at distance H
  RIGHT of the load line AT THE LEVEL OF l; closing ray `i_1` = pole2–D
  black dashed(15); 11 thin (th1) black rays segB; **moment funicular**
  `g_1` from K (0, −10, draggable) black th2 with dashed closing `f_1` =
  K–U landing back on the baseline `mLine` = K–R th3.
- **M-diagram**: red segM ordinates at the 10 stations, MP = GP +
  (FG−FP)·sFD·H from the TRIAL's ordinates (sagging plots DOWN = tension
  side); red th3 outline `q` = K→MP1..MP10→R. The black funicular is the
  same curve at scale M/H.
- Two H segments at level y(O) (O draggable on the load-line vertical):
  `horizontalForce` = O–P (left, cap H) and `horizontalForce_1` = Q–O
  (right, cap H), red th3, with dotted guides m/n/d_1.
- Bow (showBow): region letters A…K above the band at x = 0..10, L below
  the beam, "a" at LL0, "O′" at the trial centroid; "o′" text always.
  showHandles: caps a..k on LLk + handle points. showSingleLoads: ten green
  strip arrows on the row y = 0.6697.

## Controls (defaults)

F_{1} 0..0.6 = 0.2 · positionF_{1} 1..5 = 1 · F_{2} 0..0.6 = 0.2 ·
positionF_{2} 6..10 = 10 · H 1..5 = 4 · scaleForceDiagram 0.1..5 = 0.3 ·
scaleLoadSymbol 0.3..0.8 = 0.5 · scaleOffsetReactionForces 0..1 = 0.5 ·
showBow/showHandles/showSingleLoads = false · loadP = 0.2 (hidden, fixed).

## Regression

`scratchpad/v48_regress.py` (LL0..LL10, FP/FPB funicular vertices, C, U,
FG/MP 1..10, D, pole2, VP1..VP5, S, H-segment ends, offset chain, M_1):

- default: 69 points, max err **1.2e-14**
- moved (posF1=3, F1=0.5, posF2=7, F2=0.35): 69 points, 1.1e-14
- F1zero_H (F1=0, H=2.5, pole y=−1): 69 points, 8.9e-15
- sFD05 (sFD=0.5, off=1): 69 points, 7.1e-15

## Hand-written staging (20 steps)

intro → beam → load band q → point loads F₁/F₂ (position sliders + drag) →
load line with fattened strips + R → trial pole o′ + H → rays → trial
funicular → closing + R through the outer-string crossing → division point l
→ reactions (ends ‖ offset chain) → V baseline → V jump A/slope/drop F₁ → V
drop F₂/close B → mirror pole o (level of l) → M baseline (dual of ray o–l)
→ moment funicular (thin rays + black strings, closes on the baseline) →
grey trial ordinates → red M = H·y + outline → final readouts (R, A, B, H,
M(F₁), M(F₂)).

Node inspector: kinks of the MOMENT funicular (strip nodes, sides = strip
load + two rays to o) + node 11 = whole beam {R, B, A on the offset arrows};
slider 0–11 + click-to-inspect. No pipes (no axial members).

## Deviations

- q (loadP) kept fixed at 0.2 exactly like the live page (hidden slider).
- V-diagram F-drop segments hide when the respective F = 0 (the applet
  keeps zero-length segments); the F arrows/labels/verticals hide via the
  applet's own F≠0 conditions.
- Band-layout levels (band, clips, V/M baselines default, R row, dimension)
  fixed at applet defaults; V baseline I, M baseline K, H-segment level O,
  pole, FP0, LL0 stay draggable.
- Load-line letters a…k labeled always (house style); strip labels q+F₁ /
  q+F₂ placed left of the line (the applet anchors at the strip midpoint).
- M(F₁)/M(F₂) readouts follow the applet's discretized model (strip loads
  concentrated at stations).
