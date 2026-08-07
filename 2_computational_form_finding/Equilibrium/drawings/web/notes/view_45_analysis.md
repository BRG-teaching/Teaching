# view 45 — Free-form thrust lines

Ground truth: https://block.arch.ethz.ch/eq/drawing/view/45 (driven headless via
CDP; dumps + per-step screenshots in scratchpad/v45/). The applet has a
mode slider (0/1) whose only effect is showing the step slider (0–10);
mode 0 = step 0 = the final drawing.

## Decode summary (applet_0/geogebra.xml)

- **The arch**: quartic Bézier `j` on Bezier1..Bezier5. Bezier1/Bezier5 ride
  vertical rails x=0 / x=18 (segments `d`/`e`, grey dashed, always visible);
  Bezier2/Bezier4 ride rails at x=E(1) / x=G(14) (`g`/`i`, shown with the
  control polygon `bz1..bz4` only at steps 0, 1, 10); Bezier3 free. Curve
  th6; dyncol grey (0.5) during steps 1–9, BLUE (0,0,1) at 0/10.
- **Load**: band Polygon(I,J,L,K), y 13.305 to 13.305−0.35·loadSymbol, green
  alpha 0.1 + green edges, text "q" green at (−0.83, 12.94). 18 sample points
  `MFit0..17` at t=(k+0.5)/18; strip verticals `loaSeg0..17` (black th1
  dotted, y 10.900→0) at x(MFitₖ); strip boundaries = midpoints of adjacent
  x(MFit) (ends 0/18) ⇒ load line LL0..LL18 (LL0 free draggable at
  (26.980, 10.888); LL1..17 always hidden — no visible black load line, the
  visible load line is the green R vector `u_1`).
- **Split at M**: M draggable ON the curve (saved at t=0.278227). LLM/LLE at
  M-proportional levels. Sub-band verticals at xL=x(M)/2, xR=(x(M)+18)/2
  (`p_2`/`r_2`, orange dashed, step 2). Strings: t=B1–P, a_1=P–B5 (through
  M), b_1=B1–Q (through M), c_1=Q–B5, orange dashed, where P/Q = string
  crossings on the xL/xR verticals. R₁/R₂ arrows hang AT P/Q (tail +sLS).
  Force side: parallels through LL0/LLM/LLE close two triangles at
  `R_2` (R′) and `S`; vectors c_3=R′→LL0 "A₁", t_2=LLM→R′ "B₁",
  v_1=S→LLM "A₂", B_2=LLE→S "B₂"; form twins w_4/s_4/q_4/r_4 point INTO the
  springings along exactly the force-edge directions (tail at −sLS).
- **Pole**: `pole` = (line through R′ ∥ B1–M) ∩ (line through S ∥ B5–M).
  Rays seg0/seg18 black th2, seg1..17 grey th1 (step ≥ 3 ∨ 0).
- **Funicular** `d_2` (the thrust line): FP0=Bezier1, FPₖ₊₁ on action line k
  along ray k, T_1 on x=18; polyline th2 type 30 (dash-dot), orange at
  step 2, black otherwise, visible at every step except 1. It misses
  Bezier5 by ~1.4e-2 by construction (the sub-band resultants use the exact
  half-band centroids, the funicular the strip discretisation) — closure
  |T_1−B5|: 1.36e-2 default, 6.7e-15 berlin, 1.1e-3 bergisel. Reproduced.
- **Resultant**: F_2 = outer strings extended; R arrow at F_2 (H_2→F_2),
  action line m_4 + strings g_4/h_4 black dashed (step ≥ 3, NOT step 0);
  `u_1` = LL0→LLE green th5 "R" on the load line (step 0 ∨ ≥3).
- **Reactions** (step 3 ONLY, replaced by components from 4): form w_3 "A" at
  Bezier1 ∥ (LL0−pole), v_3 "B" at Bezier5 ∥ (pole−LLE); force z_2=LLE→pole
  captioned "A", u_3=pole→LL0 captioned "B" — the applet's FORCE captions
  are SWAPPED vs its own form arrows (w_3 "A" is parallel to u_3 "B").
  Ours labels the force side physically: A = pole→LL0, B = LLE→pole
  (same as view 29's precedent).
- **Components** (step ≥ 4 ∨ 0): green th5 chain LLE→Z (B_H), Z→pole (B_V),
  pole→U (A_V), U→LL0 (A_H) with U/Z = corners of the pole-vertical
  rectangle; form arrows z_1/u_2/v_2/w_2 (±sLS, axis-aligned).
- **H** (steps 5–9): B_1 draggable on the load-line vertical (y −1.59…10.90,
  saved 0.3887); C_1 on the pole vertical at the same level; segment
  B_1–C_1 grey th2 labeled "H", cross-style endpoints, dotted whiskers
  b_3 (LLE→B_1) and d_3 (C_1→pole). Form: green H arrows (−sLS, 0) at FP11
  (steps 5–6) and FP12 (7–9).
- **Bending measure** (steps 5–9 per strip 10/11, all at 9): y = |FPₖ₊₁ −
  MFitₖ| dotted "y"/"y₂"; angleₖ = ggb angle at angP2(30,6) between the
  downward curve normal at MFitₖ and vertical up; TPₖ = MFitₖ + rotate(FPₖ₊₁
  −MFitₖ, −angleₖ) scaled to (H/sFD)·y/T ⇒ plotted on the arch NORMAL, on
  the side away from the thrust line. "T" arrow at TPₖ = rotate((+sLS,0),
  π−angleₖ), always ⊥ d (angles α/β ≡ 90°, shown as right-angle marks).
  `compression0..17` = MFitₖ–TPₖ, grey during 1–9, blue at 0/10
  (compression10 from step 7, compression11 only at 0/10).
- **Bending line** (steps 0/10): `cable0..18` red (255,0,0):
  B1→TP0→TP1→…→TP17→Bezier5 (cable0 saved show=false but its condition
  wins — live-verified visible). `cableB*` NaN fallbacks ignored.
- Texts: "Form Diagram" (0.28, 14.60), "Force Diagram" (22.24, 14.48);
  hidden author TODO text3. Frame rectangle never drawn. Point labels are
  all hidden in the applet (M/P/Q/R′/S/o letters are our house addition);
  vector captions shown via labelMode 3.

## Controls (defaults)

| control | kind | default | notes |
|---|---|---|---|
| mode | slider 0–1 | 0 | only shows the step slider — not ported |
| step | slider 0–10 | 0 | replaced by our 16 steps |
| scaleForceDiagram | slider 0.1–1 | 0.5 | page-exposed |
| loadSymbol | slider 1–2 | 1.4 | off-canvas (x≈35) hidden — ported |
| T | slider 10–30 | 12 | in-canvas bottom right, shown 0 ∨ ≥6 |
| showHandles | checkbox | false | hidden; anchor circles + rail points |
| showPoints | checkbox | false | hidden; LLE/pole/U/Z (ours: n4, default on) |
| button1/2/3 | buttons | — | waterloo / berlin / bergisel (zha) |

Draggable: Bezier1..5 (rails/free), M (on the curve), LL0 (free), B_1 (H
level), plus V/W handles (not ported — they only stretch B_1's rail).
Presets set E/G, the five control points, T, sFD and M as a TARGET point
projected onto the new curve — GeoGebra's path projection lands within
2e-5 of the true nearest point (verified for all three presets); we project
exactly.

## Regression

`scratchpad/v45/regress45.py` + `regress45b.py` (python) and
`scratchpad/v45/jsreg.mjs` (running the SHIPPED view compute) vs live CDP
dumps — MFit0..17, TP0..17, FP1..18, LL1..18, LLM, LLE, P, Q, R′, S, pole,
F_2, T_1, U, Z, C_1, M (84–85 points):

- default: 2.1e-13 | M drag: 2.8e-13 | Bezier3 drag: 3.9e-13
- drag2 (M=12/B2=8.2/sFD=0.8/T=20): 3.6e-12 | B_1+LL0 moved: 2.2e-13
- waterloo: 2.1e-13 | berlin: 1.4e-12 | bergisel: 1.1e-13
- fresh re-dump of the default state is bit-identical to the first session

Max error **3.6e-12** over 85 points × 9 live states.

## Hand-written staging (16 steps)

intro → arch (control polygon, rails, presets) → load band + 18 strips ‖
load line → split at M (R₁/R₂ both sides) → left part: strings through P →
triangle at R′ (A₁/B₁ both sides) → right part: Q → S (A₂/B₂) → pole o +
19 rays → resultant R (dashed green both sides, at F_2 and on the load
line) → reactions A/B (outro when the components arrive, like the applet)
→ thrust line across the 18 action lines (+ compression pipes) →
components A_H/A_V/B_V/B_H both sides → H (B₁ level drag) + y at strip 10
→ d = H·y/T + T arrow + 90° → strip 11 → all 18 ordinates → red bending
line, arch resolves blue.

Node inspector: springing A {thrust edge LL0→pole, A_V, A_H}, thrust nodes
1–18 {strip load LLₖ₋₁→LLₖ + the two rays}, springing B {pole→LLE, B_H,
B_V} — the support stars land on the visible component arrows (this view's
reaction representation is the un-offset component chain on the pole/load
verticals, as in the applet). Click-to-inspect + slider 0–20.

## Deviations from the applet

- **Force-side A/B captions swapped in the applet** (z_2/u_3): labeled
  physically (A = pole→LL0 twins the left-springing arrow). Documented
  above; same call as view 29.
- The construction apparatus (orange strings/verticals/parallels, R₁/R₂,
  sub-reaction triangles, R′/S/P/Q, R action line + arrow, H/y/d/T
  measures) retires at the final step behind a "show construction" toggle
  (view-16 pattern); the applet hides each group as its step passes. The
  final state then matches the applet's mode-0 default exactly (which also
  hides the step-≥3-only R apparatus).
- The resultant R is dashed green in both diagrams (house rule; the
  applet's u_1/R are solid th5), and the strip weights are laid off as a
  thin black load line with tick points at step 2 (the applet shows no
  load line until R; its LL1..17 points are always hidden).
- Compression pipes along the thrust line with a scale slider (house
  non-negotiable; the applet has none). Pipe width ∝ world-length of the
  ray (= kN × sFD) so presets with small sFD don't drown the drawing.
- B_1/C_1/MFit10/MFit11 render as small disks, not GeoGebra crosses;
  the on-canvas "T = 12" slider is replaced by the panel slider.
- Point letters M/P/Q/R′/S/o are shown (the applet hides all point labels);
  the springing sub-reaction arrows keep the force-polygon-edge directions
  (tail outside, tip at the springing) — live-verified at step 2.
- m_2/s_2 (dotted x=0/18 guides) are merged with the always-dashed rails
  d/e — one guide per edge instead of two overlapping styles.
