# view 47 — Internal forces in a beam – line load

Ground truth: https://block.arch.ethz.ch/eq/drawing/view/47 (driven headless via
CDP; dumps + screenshots in scratchpad/live47/). No mode/step/node machinery in
the applet — everything shows at once; the staging is ours.

## Decode summary (applet_0/geogebra.xml)

Same four-band layout as view 46, but richer:

- **Form**: beam `A(0,·)–B(10,·)` th3 with **draggable supports** `E` (on the
  first 3 m, Circle(A, 0.3·|AB|)∩beam clamps) and `H_1` (last 3 m). Uniform
  load = green Polygon band `L1/A_1/B_1/C_1` (top y(L1), depth 0.75·sLS),
  text "q". Dimension line `l = Z–F_1` grey at y(Z) with cross end-points,
  label "l = 10". Resultant `v_1` green cap R at midspan x = 5 (midpoint I_1
  of l), length 2·sLS, on the dashed vertical `q_1`. Reactions `z`/`l_1`
  green up-arrows caps A/B at the supports. Verticals: edges x=0 (`f`) and
  x=10 (`k`) th2 dotted, supports (`loadSeg10/11`) th2, stations 0.5…9.5
  (`loaSeg0..9`) th1 dotted, all clipped y(R)=2.17 … y(S)=−17.67.
- **showSingleLoads** (default off): ten green strip arrows on a row anchored
  at `L1'` (translation L1→L1').
- **Force diagram**: `LL0` free ("a"); `LL1..LL10` each F_d/sFD below (caps
  b…k, handles-gated); th5 black `lline*` segments are HIDDEN — the visible
  load line is `u_1` = Vector(LL0→LL10) green **th7** cap R. `N` draggable on
  the vertical below the load line; `H` slider (1..6, red): `D_1` = circle(N,
  H) ∩ horizontal → the pole vertical `j_1`; **pole draggable on j_1**;
  `O` = corner, red th3 segment `horizontalForce_1` = O–N cap "H"; thin
  dotted guides `m_1` (N→LL0 vertical), `r` (pole→O). Eleven grey rays
  `seg0..seg10`.
- **Funicular** (grey, th2): start `FP0` draggable on the left edge;
  `FP1..FP10` at the stations (string k ∥ ray k), end `C` on x=10.
  **Three-piece closing**: `closingString1` = FP0→FG11 (solid, along string
  0's line, FG11 on the E vertical), `closingString2` = FG11–FG12 (DASHED —
  the closing line), `closingString3` = FG12→C (solid, along string 10).
  Parallel through the pole (`s`) cuts the load-line vertical at `K` (cap
  "l", red) → grey dashed ray `a_1` = pole–K.
- **Reactions**: offset chain at +scaleOffsetReactionForces (default 1.2):
  `v` = LL10'→K' green th7 cap B, `w` = K'→LL0' cap A, green dashed whiskers
  `g_1`, `i_1`.
- **V-diagram**: baseline `nLine` = L–M th3 at y(L); red th3 polyline
  `nDiagram` = L → VP1 (slope −q via the hidden direction vector u=(1,−F_d))
  → VP2 (jump A = |K LL0|·sFD) → VP3 (slope) → VP4 (jump B) → M; `nLeft`/
  `nRight` th2 red overlay the jumps. V = 0 at both overhang tips.
- **M-diagram**: baseline `mLine` = P–Q th3 at y(P); ordinates at the ten
  stations PLUS the two support verticals (indices 11 = x(E), 12 = x(H_1)):
  grey `segF1..12` = FG↔FP (closing↔funicular), red `segM1..12` = GP↔MP with
  MP = GP + (FG−FP)·sFD·H (hogging, closing above funicular, plots UP =
  tension side); red th3 outline `mm*` = P → the 12 MPs in x-order → Q.
- Texts: region titles at x=−7 / 17; "q = F_d kN / m" at (17,2); Bow
  (showBow): "a"@LL0, "o′"@pole, "K"@LP19, "L"@beam midpoint (grey).

## Controls (defaults)

| control | kind | default | notes |
|---|---|---|---|
| F_{d} ("q") | slider 0.1..0.5 | 0.3 | kN/m |
| H | slider 1..6 | 4 | red, on-canvas |
| scaleForceDiagram | slider 0.2..5 | 0.3 | |
| scaleLoadSymbol | slider 0.5..1 | 0.7 | |
| scaleOffsetReactionForces | slider 0..2 | 1.2 | |
| showBow / showHandles / showSingleLoads | checkboxes | false | |

Draggable: E, H_1 (supports), pole (vertical), N, FP0, LL0, plus the layout
points L1, A, Z, R, S, L, P, L1' (band levels — kept as constants in the
port, see deviations).

## Regression

`scratchpad/v47_regress.py` vs live dumps (LL0..LL10, FP1..FP10, C, FG1..FG12,
MP1..MP12, K, D_1, VP1..VP4, M, offset LL0'/LL10'/K'):

- default: 58 points, max err **4.8e-14**
- dragSupports (E=1, H_1=8.6): 58 points, 4.6e-14
- dragPole_q (q=0.5, H=2.5, pole y=−2): 58 points, 3.3e-13
- sFD1 (sFD=1, offset 0.5): 58 points, 9.2e-14

## Hand-written staging (19 steps)

intro → beam + supports + dimension l → load band q → discretize (stations ‖
load line a…k) → R both sides → pole o′ + H → eleven rays → funicular →
three-piece closing → division point l → reactions (form ‖ offset chain) → V
baseline → V overhang + jump A → V span + jump B → M baseline → grey
ordinates y → red M = H·y → M outline → final readouts (R, A, B, H kN, M(A),
M(B)).

Node inspector: the ten funicular kinks are true equilibrium nodes — strip
load LLᵢ→LLᵢ₊₁ + the two adjacent rays close a triangle; node 11 = the whole
beam {R, B, A} on the visible offset arrows. Click-to-inspect + slider 0–11.
No internal-force pipes (no axial members — the funicular is construction).

## Deviations from the applet

- The band-layout points (L1, A, Z, R, S, L, P, L1') are fixed at the
  applet's defaults instead of draggable — they only move the bands apart.
- The load-line letters a…k are always labeled (house style; the applet
  gates them behind showHandles), as are o′, l, FP₀; "show points" toggle
  covers the disks. showBow adds the applet's remaining region letters
  (a-duplicate at LL0, K, L).
- The funicular strings are hover-linked to their rays (11 dual pairs)
  instead of numbered — eleven numbers in both diagrams would be noise.
- The V/M/H red is the applet's rgb(255,0,0); jumps drawn at outline width.
- M outline connects P → 12 sorted MPs → Q (equivalent to the applet's
  mm/mmb If-chain for all reachable support positions).
