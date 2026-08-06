# view_52 — Freeform Truss — applet decode

Source: view_52/applet_0/geogebra.xml (210 KB, 487 elements), title from
page.html: **Freeform Truss**. Live original verified via ggbApplet API
(headless chrome): defaults, showLabels/showPoints, pipes, four shape-slider
states, load line dragged (setCoords D_2).

## The model

10-panel span between supports H₃ = (4, 0) and I₃ = (14, 0). Equal loads
F₁…F₁₀ (gap = scaleForceDiagram = 0.6, FIXED — slider range 0.6..0.6) on the
action lines x = 4.5…13.5, drawn as green arrows onto the (undrawn) deck
level y = 3; full-height dotted action lines (extents from the hidden
R₄/S₄ handles: y 4.737 … −3.939).

**Top chord is FREEFORM:** node k = (xₖ, parabola·(c(xₖ)−5) + sine·(f(xₖ)−5))
with c(x) = −0.08(x−4)² + 0.8(x−4) + 5 and f(x) = sin(2π(x−4)/10) + 5 — the
two visible sliders `parabola` (0.2) and `sine` (0.7) blend the shapes.
Members 1–11 = the chord H₃→…→I₃, 12–21 = web, 22–32 = the bottom tie.

**The design rule:** every tie force is a RAY of ONE CIRCLE around the
division point i = K₂ (midpoint of the load line — equal loads, no trial in
this applet), radius = |K₂L₂| + tolerance = reaction + 0.2 = 3.2 units
(circle r_1, grey dashed, always visible). Each top-chord force runs from
its load-line point PARALLEL to its member onto the circle (the applet's
Intersect(r_1, ..., 1) — always the left root, verified in all live states);
web forces = the chords between consecutive circle points; the tie nodes
follow by parallels ((∥ web force through top node) ∩ (∥ ray through the
previous tie node)) and the last parallel through U₃ lands EXACTLY on I₃
(closure ≤ 9e-15).

Reactions: A = i→D₂, B = Z₂→i on the offset line x + offsetReactionForces
(0.4) with dotted connectors; form arrows up at (4/14, −1.35 → −0.5) (the
hidden D₆ handle sets the −0.5 offset line).

Colors (internalForce orders in views/view_52.js MEM): chord 1–11 = π
(compression, blue), tie 22–32 = 0 (tension, red/pink, ALL equal =
radius/sFD = 5.33 kN), web mixed (default blend: 12, 16–21 compression,
13–15 tension). Note the applet's poly20/poly21 output-name swap (a21/a20) —
irrelevant, colors are computed from the member/force pairs directly.

## Sliders / booleans (live-verified)

| name | default | range | where |
|---|---|---|---|
| parabola / sine | 0.2 / 0.7 | 0–1 | ON-CANVAS (15.0/19.0, −3.5) |
| scaleForceDiagram | 0.6 | FIXED | hidden (x=1762) |
| tolerance | 0.2 | FIXED | hidden |
| scaleLoadSymbol | 0.85 | 0.1–5 | hidden |
| scaleInternalForces | 0 | 0–0.08 | hidden (our default 0.03, on) |
| offsetReactionForces | 0.4 | 0–1 | hidden (x=1194) |
| showPoints / showLabels / showHandles | false | — | checkboxes |

No mode/step sliders — the applet is single-state; our staging follows the
canonical sequence + the construction's own dependency order.

## Regression (scratchpad v52/regress52.py)

44 points vs the LIVE applet in five states — default **3.4e-13**, parabola=1
4.3e-13, mix 2.2e-13, sine=1 4.1e-13, D₂ dragged to (18.4, 4.4) 2.0e-13;
tie closure onto I₃ ≤ 9.4e-15 in all states. Joint sub-polygons close
exactly (nodeSides walk, 22 joints).

## Deviations from the applet (deliberate)

- The applet's free deck-height handle A, support-offset handle D₆ and
  guide handles R₄/S₄ are baked at their defaults (showHandles-gated in the
  applet; y_deck = 3, offset −0.5, guides ±).
- Node labels: the applet labels nothing; we label the supports H₃/I₃, the
  load-line top D₂ and the division i (+ inspector titles "top/tie joint k").
- Readouts added: constant tie force (pink) + ΣF / A = B (green); "r = A +
  tol" caption at the circle.
- D₂ drag clamped to x ∈ [15.5, 21.5], y ∈ [3, 5.4].

## Step design (12 steps, paired form ↔ force)

0 intro · 1 supports + action lines · 2 loads ‖ load line · 3 reactions +
division i (symmetric — no trial needed) · 4 the freeform top chord
(members 1–11; play with the sliders) · 5 the constant-force circle
(radius = A + tolerance) · 6 chords 1–2 projected onto the circle (K₃, N₂ +
forces 1, 2) · 7 all remaining chords → 11 circle points ‖ chords re-flash ·
8 first tie joint: ray 22 + web chord 12 ‖ tie node L₃ · 9 walk the span:
tie 23–31 + web 13–21 both sides · 10 the closing member 32 lands exactly
on I₃ ‖ ray 32 · 11 resolve (blue chord / pink constant tie), pipes,
readouts. Node inspector: 22 joints, max 4 sides; support sides on the
visible offset reaction arrows.
