# view_18 — Salginatobel Bridge: applet decode

Source: `view_18/applet_0/geogebra.xml` (1004 objects) + the live applet
(https://block.arch.ethz.ch/eq/drawing/view/18) driven headless via the
ggbApplet API (per-step `getVisible` diff of every object).

## Controls the original exposes

| control | kind | default | effect |
|---|---|---|---|
| `mode` | HTML slider 0/1 | 0 | 0 = final drawing only, 1 = shows the `step` slider (`onUpdateMode()` resets step to 0) |
| `step` | slider 0–9 | 0 | construction staging (step 0 ≡ step 9 = resolved final state) |
| `positionQ` | in-canvas slider 1–30 | 8 | strip carrying Q (`updateLoads()` moves `U_6`) |
| `factor_Q` | in-canvas slider 1–5 | 4 | Q = factor·g |
| `scaleForceDiagram` | flyout slider 0.5–2 | 1.3 | force-diagram scale |
| `hideRF` | checkbox | false | hides the force-diagram reaction vectors (`v_6`,`w_6`; and `u_11`,`w_10` in the no-Q stage); form thrusts stay |
| `showBoundingGeometry` | checkbox | false | keeps the no-Q funiculars (`c_9` 31-side arch, `i_10` trapezoid) visible at the final state |
| `o_2` "show points funicular" | checkbox, HIDDEN (off-canvas, not in the site's controls dict) | false | grey dots on the trial funicular's vertices (Z_9…Z_35), any step |
| `showHandles` | checkbox, HIDDEN | false | reveals the invisible white drag handles |
| `g` | slider, HIDDEN | 0.1 | load unit |

"Secret" = placed at x≈1370–1379 px, beyond the 1200 px canvas, and absent
from the page's `controls` dict — reachable only via the API.

## Step semantics (mode 1; dynamic colors flash the CURRENT step orange)

| applet step | content | ours |
|---|---|---|
| 1 | site only: green deck rect `poly1` (0,153,0 α0.1, edges th2) + `g` text; 30 dotted strip lines th1 x=0.65..9.35, crown dotted th2 x=5 (`i_21`), wall dash th2 x=0.5/9.5 (`k_20`,`e_22`) — ALL y∈[−1.5587, 5.7726]; points A,D,B | 1 |
| 2 | the whole construction of the funicular of g at once: grey R_g arrow `v_10` on the crown line (from (5,≈3.24), length 1 = 2·loadSymbol); ONE-LOAD funicular chords A–X–B with X=(5, 2·dy) (`r_24`,`s_24` orange dashDot) + closing A–B (`t_24`); pole `M_2` = parallels through L_1/P_1 + closing-parallel `M_1–M_2` (`a_25`); load line `u_8` green th5 "R_g"; fan th1 + outer th3; arch `c_9` black th3 | 2–4 |
| 3 | resolve: PHOTO on; orange helpers off; reactions ON the outer rays (`u_11` o₂→L_1 "A", `w_10` P_1→o₂ "B") + green thrusts into A, B (`v_11`,`w_11`) | 5 |
| 4 | TWO LOADS: Q₁ Q₂ arrows (quarter lines, dotted LOAs `p_22`,`q_22` th2); chords A–E₃, B–D₃ + cross chords D₃–A, E₃–B (orange th1 dashDot); mini diagram at C_5=(12,5.7): loads drawn loadSymbol·sFD long (SCHEMATIC, not the real weight!), 6 dashed parallels → pole N_5, outer rays th2; trapezoid `i_10` A–(2.75,dy)–(7.25,dy)–B th3; photo OFF | 6–7 |
| 5 | resolve: photo on, chords/parallels off, mini reactions `u_12`,`v_12` on the outer rays | 8 |
| 6 | ONE EXTRA LOAD Q (orange `z_5` + dotted LOA `g_22`); Q-alone chords A–B₇–B dark-grey dashDot (`p_11`,`q_11`); Q mini diagram at D_7=C_5: Q vector + solid rays `b_12`,`c_12` to pole G_7 (∥ A–B₇ and B₇–B) | 9 |
| 7 | Q folds into the load line: 31 green th5 segments with ORANGE Q slot `g_24`, "R_g + Q"; the whole no-Q force diagram (u_8, fan, M_2, reactions) disappears | 10 |
| 8 | trial: pole o′=M (16.3065,1.965) grey fan; hanging trial funicular `j_15` from N=(0.5,5.654) wall-to-wall; closings N–Z, Z–W grey dashLong; parallels through o′ → i₁=B_9, i₂=A_9 (orange pts); crown chords A–D, D–B orange dashLong; parallels through i₁/i₂ (black dashLong `a_16`,`b_16`) → pole `C_9` "o"; fan + ORANGE arch `h_20` th5 | 11–14 |
| 9 | ≡ step 0: resolve; ALL trial + Q-mini + no-Q funiculars retire (unless showBoundingGeometry); reactions `w_6` (o→top, "A"), `v_6` (bottom→o, "B") ON the outer rays + thrusts `u_7`,`v_7` | 15–16 |

## The photo

`pic3` = `salginatobelFF_foto_test2_cropped2.png` (865×369, L+A halftone),
anchors Q_10(−0.7,−1.74) S_10(10.7,−1.74) R_10(−0.7,3.07), opacity 0.2,
shown at steps 0, 3, 5, 9 (each resolved state). It underlays the FORM
diagram itself (springings at y=0 sit inside it); the no-Q funicular lies
exactly on the photographed arch. Ported as `web/assets/view_18_photo.png`
via the new `dw.image` primitive (same corners, opacity 0.2, z far behind);
our accumulate-only replay keeps it from step 5 on, plus a panel toggle.

## Deliberate palette deviations (project-wide rules win over applet colors)

- final arch = blue when compression (applet: orange th5)
- loads Q, Q₁, Q₂ and the Q slot = green (applet: orange)
- construction chords/closings = black dashed, parallels/trials = grey
  (applet: orange dashDot/dashLong)
- current-step elements flash black→their color (the applet's orange
  "current" dynamic colors play this role)

## Regression

`M_2` via the visible construction (parallels to A–X, X–B through L_1/P_1,
X=(5,2dy)) ≡ the XML's baked chord chain to 1.8e-15; matches baked
(11.167133, 2.300451). Mini-diagram pole chain matches the live applet
exactly ((11.4583,5.2125)/(11.4583,4.8875)/(10.9166,5.05), trapezoid corners
(2.75,dy),(7.25,dy)). Full funicular chain regression-checked earlier
against `view_18_compas.py` (~4e-7).
