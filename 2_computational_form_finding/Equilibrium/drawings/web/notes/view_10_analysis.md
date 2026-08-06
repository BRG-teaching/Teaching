# View 10 — Parabola v. Catenary (decode notes)

Source: `view_10/applet_0/geogebra.xml` (578 commands), title "Parabola v.
Catenary". Original description: a cable under a uniformly distributed load is
a parabola, under self-weight a catenary; steps 1-2 find the funicular for the
uniform load (parabola construction), 3-5 use the segment lengths of the
parabola to determine the actual cable weight and build the new load line,
6-10 construct form + force diagram for that load (= the catenary
approximation). mode 0 = overlay comparison (parabola black, catenary orange,
reactions A/B green vs A'/B' orange), mode 1 = steps 0-10.
Window: x [-2.3944, 47.9683], y [-11.9804, 13.2009].

## Fixed geometry / site

- Span x = 0..16 at "1 :: 1m". Walls: x=0 (`l_1` = A_4–B, thin dashed),
  x=16 (`m_1` = C_9–B_2), centreline x=8 (`i_14`), from y = 7.7946 down to
  y = -11.8678. Panel verticals x = 1..15 odd (`i_3, j_3, l, m, n, v_6,
  b_4, i_4`, dotted thin) — the load/vertex verticals.
- Load strip q: y from 7.7946 (= C.y − 0.4·scaleLoadSymbol) to C.y = 8.2346,
  x 0..16, GREEN (0,0.6,0), drawn as 8 polygons (edges thick 3 at x=0,2,..,16),
  caption 'q'; flashes orange at steps 4-5 (the cable's weight source).
- Scale bar `m_2` = (0, 8.8939)–(2, 8.8939) grey + text "2m".
- Texts: "g=2.0kN/m" (24.36, 9.13) and "F  = g · l = 2.0kN/m · 2m = 4kN"
  (24.31, 7.89), mode1 step<4, flash 0. Form/Force titles at (-0.28, 11.71) /
  (24.27, 11.75). NOTE the applet's force scale caption "1 :: sFD kN" is
  inconsistent with its own geometry: pieces are 2/sFD units for 4 kN loads →
  the true scale is 1 unit = 2·sFD kN. We print the correct value.

## Free points / sliders (defaults)

- `D_1` 'ap 1' = left support on x=0, y = 2.6264861769192294
- `D_3` 'ap 2' = right support on x=16, y = 2.6305504814233585
- `D_2` 'ap 3' = sag point on x=8, y = -3.390463768427124
- `a`  = parabola load-line top (25.538528289864157, 5.508930066094425)
- `a_1` = catenary load-line top (36.36133462323195, 5.425492670613609)
- `M`  = trial pole (45.3800519285, 1.0389027189), shown steps 6-7
- `O`  = trial start on x=0 (0, -8.9868709647), steps 6-8
- `M_1` = load-arrow row anchor (0, 5.3886188080) (hidden handle)
- sliders: scaleLoadSymbol 1.1 [0.5,2]; scaleForceDiagram 1.5 [0.5,2];
  scaleloadSymbol 1.7 [1,2] (reaction arrows; we use 1.55·sLS);
  step [0,10]; mode [0,1]; booleans hideRF, showPoints, o_2 (showHandles).

## Construction chain

- Uniform loads: 8 green arrows at x = 1..15 odd, tails (x, 6.4886 =
  M_1.y + sLS), tips (x, M_1.y), each 'R' (mode1 step<4, flash 0).
  Load line 1: a, then b..i spaced 2/sFD below (8 pieces of 4 kN), 'R' each.
- Parabola (step 1): chord `p_28` D_1–D_3 (dashed 15, hidden steps 4-7,
  flash 1∨8); E = chord ∩ x=8; F = mirror of E about D_2 (circle `r`
  dashed, step 1 only); tangents `j_1` = D_1–F ' 1', `j_2` = F–D_3 ' 2'
  (STEP 1 ONLY). Pole o = Line(a ∥ j_1) ∩ Line(i ∥ j_2); rays `n_2` a–o
  ' 1', `a_4` o–i ' 2' (steps 1-3 + mode 0); text '   o'.
- Step 2: inner rays o→b..h (thin, steps 2-3 + mode0); parabola strings
  `s_1..s_9`: I_2 = j_1 ∩ x=1, then parallels to o→b.. through x=3,5,..15
  (I_3..I_8, I_1), s_9 = I_1–D_3 ∥ o–i. Strings BLACK in mode 0.
- Step 3: reactions A = Vector(o→a), B = Vector(i→o) green (hideRF gate);
  form side v_10/u_10 green at D_1/D_3 along the tangents (length 1.7).
  Segment-length measurement: offset rulers ∥ each s_i at distance sLS
  (H_3..H_27 for α>90°, duplicated H_31..H_65 branch for α<90° — pure
  GeoGebra circle-index bookkeeping; we implement one generic branch),
  labels s_1..s_9, readout "s_i = …m" list at (19.11, 3.33) (steps 3-4).
- Step 4: weight: strip flashes; NEW load arrows at the same row, lengths
  sLS·[1.5, 1.25, 1.1, 1.0, 1.0, 1.1, 1.25, 1.5] (heavier near the
  supports where the cable is longer/steeper), labels R_1..R_8 (from
  step≥4); readout Text40 "R_i = (s_i+s_i+1)·0.5·g = … kN".
- Step 5: catenary load line: a_1 with pieces R_i/(2·sFD) units:
  r_1 = (s_1+s_2/2)·2·2/sFD/4, r_2..7 = (s_i/2+s_i+1/2)·2·2/sFD/4,
  r_8 = (s_8/2+s_9)·2·2/sFD/4 → b_1..i_1; labels R_1..R_8; readout Text12.
- Step 6: trial pole M + rays M→a_1..i_1 (grey; inner ones step 6 only,
  outer 6-7); trial start O on x=0; trial funicular O, O_2(x=1)..O_9(x=15),
  O_1(x=16) via parallels (grey 0.6, steps 6-8); closing `l_12` O–O_1
  dashed '1' (6-8, flash 6∨7).
- Step 7: Q = trial ∩ centreline x=8; chords of the trial: `k_12` O–Q '3',
  `j_14` Q–O_1 '2' (7-8, flash 7); parallels through M cut the catenary
  load line: q = ∩ ∥O–O_1 'i_2', p = ∩ ∥O–Q 'i_1', G = ∩ ∥Q–O_1 'i_3'
  (M-segments step 7 only, dashed 15; points 7-8).
- Step 8: real chords D_1–D_2 '3' (`m_12`), D_2–D_3 '2' (`m_14`) (7<step<9),
  chord D_1–D_3 '1' returns; pole o_1 = Line(q ∥ D_1D_3) ∩ Line(p ∥ D_1D_2)
  (check: Line(G ∥ D_2D_3) concurrent, drawn as `n_14` step 8); dashed
  connectors p–o_1 '3', o_1–q '1', G–o_1 '2' (step 8 only); text '  o'.
- Step 9: catenary rays a_1–o_1 (thick), b_1..h_1–o_1 (thin), i_1–o_1
  (thick) (step≥9 ∨ mode0, flash 9); catenary polyline D_1, T_2(x=1),
  T_3(3).. T_8(13), T_1(15), D_3 via parallels (ORANGE in mode 0, flash 9).
  Passes exactly through D_2 (midpoint of T_5–T_6 = ap 3) — both curves do.
- Step 10: reactions A' = Vector(o_1→a_1), B' = Vector(i_1→o_1) (green at
  step 10, ORANGE in mode 0); form w_10/u_11 at D_1/D_3 along members 1/9.

## Our step list (paired, accumulate-only)

0 intro · 1 site: walls, centreline, verticals, strip q, 2m bar, ap1/ap2/ap3
(draggable) · 2 uniform load: 8 R arrows — load line a→i, 8 R pieces,
'parabola' tag, g/F texts · 3 chord + mirror F + tangents 1,2 — parallels →
pole o, rays 1,2 · 4 inner rays — strings s₁..s₉ (∥, black) · 5 reactions
A, B (green, both sides) · 6 measure: rulers + s_i readout list ·
7 weigh the cable: strip re-flash + non-uniform arrows R₁..R₈ + readout —
catenary load line a₁→i₁ with pieces R₁..R₈, 'catenary' tag ·
8 trial: pole M + rays — trial funicular from O (grey) · 9 closings O–O₁ '1',
O–Q '3', Q–O₁ '2' — parallels through M → i₁, i₂, i₃ · 10 chords 1/2/3
(D₁D₃, D₂D₃, D₁D₂) — parallels through i₂/i₁/i₃ → pole o₁ ·
11 catenary: rays o₁→a₁..i₁ — members 1..9 (∥), numbered both sides ·
12 reactions A′, B′ (green, both sides) · 13 resolve: trial/closing/ruler
helpers retire (as the applet does by step 9-10), catenary = PINK tension +
pipes + N readouts, parabola stays BLACK (mode-0 comparison; the applet's
mode-0 orange for the catenary is replaced by our tension pink).

Deliberate deviations: single generic ruler branch (applet duplicates the
whole set for α≷90°); force-scale caption shows the *correct* 1 unit =
2·sFD kN; tangents/F/E kept two steps (applet: step 1 only) so the pole
parallels can be read; catenary reactions green (orange is reserved);
internal-force pipes + N readouts added per the platform contract.

## Regression

`scratchpad/v10_regress.py` re-derives the chain (pole o, I-chain, segment
lengths, catenary load line, trial funicular O-chain, divisions, pole o_1,
T-chain, reactions) and compares against every baked coordinate.
Result: **max error 1.5e-4** at o_1 (the long chained construction amplifies
the 6-decimal rounding of the baked inputs; every unchained point is ≤3e-6);
catenary closure T_1→D_3 and member∥ray checks 1e-15; the chord/division
concurrency (G ∥ D_2–D_3 through o_1) 4e-16; BOTH polylines pass through
ap 3 (D_2) to 1e-15; all 9 catenary members resolve tension.
s_i = 1.81, 3.02, 2.50, 2.14, 2.00, 2.14, 2.50, 3.02, 1.81 m;
R_i = 6.6, 5.5, 4.6, 4.1, 4.1, 4.6, 5.5, 6.6 kN (Σ 41.9 kN = 20.9 m · g);
N₁..N₉ = 24.4, 19.0, 15.3, 13.2, 12.5, 13.2, 15.3, 19.0, 24.4 kN;
A = B = 19.2 kN (parabola), A' = B' = 24.4 kN (catenary).

## Implemented (2026-08-06)

views/view_10.js, 14 steps (0-13) exactly per the step list above. Regression
re-verified independently: 56 points vs view_10_compas.py baked, max err
6.05e-7 (the earlier 1.5e-4 was transcription noise in the expected values,
not in the chain). Full boolean sweep of the XML: only step, mode, hideRF,
showPoints (default FALSE — adopted), o_2/showHandles (M_1 row handle —
not ported, fixed row) gate anything; verified against the LIVE applet via
ggbApplet (726 objects, defaults confirmed, screenshots of mode 0 + mode 1
steps 0-10 + toggles in scratchpad/live10/).

Deviations (with reasons): being-drawn black / tension pink per platform
palette (applet's orange = current-step only); parabola diagram + strings kept
after step 4 (accumulate-only; the applet's mode-0 overlay shows them anyway);
reactions A/B kept after their step (same); one generic ruler branch with
partial side connectors (applet duplicates the whole H-apparatus for α≷90°);
correct force scale printed (1 unit = 2·sFD kN); division labels i₁ i₂ i₃
placed right of the load line (applet: left) to clear the Rᵢ labels;
A′/B′ form labels staggered above A/B (the arrows nearly coincide); member
numbers 1…9 + pipes + N readouts added per the platform contract.
