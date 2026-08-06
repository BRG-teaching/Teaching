# view_24 — Suspended roof

Decode of `view_24/applet_0/geogebra.xml` (374 commands, no images; page title
"Suspended roof"). No step/mode slider — the staging is ours. Regression
reference = the LIVE applet via CDP/ggbApplet, 7 states: default, construction
toggle, dragged E₂ / E₄ / G + all sliders, reset. **36 points × 7 states match
to ≤ 8.1e-13**; all 12 node sub-polygons close exactly. Live screenshots in
scratchpad v24/orig_*.png.

## Structure (hall roof hanging from a cable; 1 :: 400 — 1 unit = 4 m)

- Cable from B₁₆ = (4, 3.14419) (low wall) to B₁₇ = (16, 5.44419) (high wall),
  both FIXED. Node bays x = 5,7,9,11,13,15 (4 + 5×8 + 4 m strip shown as the
  top dimension row at y = 9.431). Loads 6 × 264 kN pressing DOWN from the
  eaves line y = 6 (arrows of length scaleLoadSymbol above it).
- Midspan sag point A = (10, 3.16265) — `fixed=true` in the applet (setCoords
  refused), so NOT draggable here either. F = 2A − B₈ (mirror of the chord
  midpoint B₈ through A); B₁₆–F and F–B₁₇ are the half-chords ("show parabola
  construction" checkbox, applet default OFF — ours defaults ON because the
  pole construction needs them in the narrative; the toggle retires them).
- Force diagram: G free (drag), load line G→b→c→d→e→f→g at 264/sFD each.
  Pole o = ∥(B₁₆–F) through G ∩ ∥(F–B₁₇) through g. Cable pieces '3'..'9' =
  rays o–G … o–g; form nodes L₂..L₁ walked from BOTH ends (B₁₆→L₂→L₃→L₄ and
  B₁₇→L₁→L₆→L₅); the middle piece 6 closes and passes exactly through A
  (light tangent a_7 — verified exact in the live data).
- LEFT support (form follows force): backstay and pylon forces are PRESCRIBED
  — |G–j| = 2074 kN, |o–j| = 1716 kN → j = circle ∩ circle (upper solution);
  copying directions j–G / j–o through B₁₆ finds the ground anchor D (member
  '1', tension) and the pylon foot B₂ (member '2', compression) on the
  terraced ground polylines.
- RIGHT support (force follows form): E₂ (pylon '11' foot, terrace
  y = 2.35239, x ∈ [13.65, 17.14]) and E₄ (backstay '10' anchor, terrace
  y = 2.29276, x ∈ [17.53, 23.09]) are DRAGGABLE; i₇ = ∥(E₄–B₁₇) through g ∩
  ∥(E₂–B₁₇) through o. The applet also computes the reference solution i/E
  for prescribed 1822/2305 kN (default E₂ sits exactly on E, i₇ = i) — kept
  for the "0m" offset dimension (not ported; see deviations).
- Roof sheet: grey polyline from fixed eaves Q₂/R₂ over posts at FIXED
  offsets from the cable nodes (−0.22, +0.68, +1.07, +1.0, +0.48, −0.53) —
  middle posts stand on the cable (compression blue), end posts hang under it
  (tension pink).
- Reactions A/B/C/D = the four outer edges G–j, j–o, o–i₇, i₇–g of the closed
  diagram, drawn offset beside them (offsetReactionForces, one rigid
  perpendicular vector per chain + two green dotted connectors each, gated by
  the applet's showRF checkbox, default ON); form arrows at D, B₂, E₂, E₄.

## Sliders / options (ported)

scaleForceDiagram 280 [200,400] · scaleLoadSymbol 1.3 [0.5,2] ·
offsetReactionForces 0.3 [0,0.3] (world slider → panel) · scaleInternalForces
0 [0,2] (macro halfwidth = (sIF/100)·|seg|/(200/sFD); ours sIF·|seg|, slider
[0,0.15] default 0.05, ON) · showRF T · showDims T (top 4/8…/4 m strip with
x-ticks + extension lines, wall heights 8.8/11.5 m static, 12 m right, live
"(4·|x(E₄)−15.16|) m" anchor distance, live α at E₂) · showConstruction F
(→ default ON here) · showLabels F (member numbers always on here — house
style) · showHandles F (only internal captions; not ported) · o_5 "hide inner
forces" F (redundant with our color system; not ported).

## Steps (ours, 0..15; RESOLVE 15)

0 intro · 1 site (terraced ground, instant) · 2 supports + chord + bay
verticals + dim strip · 3 sag A, mirror F, half-chords (construction toggle) ·
4 loads + load line (paired; drag G) · 5 pole o (chord parallels; chords
re-flashed) · 6-10 cable joint by joint: 3+4 → L₂,L₃ · 5 → L₄ · 9+8 → L₁,L₆ ·
7 → L₅ · 6 closes through A (tangent) · 11 posts + roof sheet · 12 left
support (members 1, 2, prescribed 2074/1716 kN → j, D, B₂) · 13 right support
(members 10, 11 from draggable E₂/E₄ → i₇) · 14 reactions A,B,C,D both sides ·
15 resolve + pipes + readouts.

## Node inspector (house addition; count 3)

1–6 cable L₂,L₃,L₄,L₅,L₆,L₁ (triangles load edge + two rays) · 7 B₁₆
[G→o, o→j, j→G] · 8 B₁₇ [o→g, g→i₇, i₇→o] · 9 anchor D [G→j + offset arrow
K₃→J₃] · 10 pylon foot B₂ [j→o + M₃→O₃] · 11 pylon foot E₂ [o→i₇ + P₃→R₃] ·
12 anchor E₄ [i₇→g + S₃→V₃]. All verified closing exactly.

## Regression numbers

`v24_regress.py`: default/constr 3.1e-13 (Nmax = 2416, A = 2074, B = 1716,
C = 2305, D = 1822 kN) · dragE₂ 1.9e-13 (C 2180, D 1217) · dragE₄ 1.9e-13 ·
dragG + sFD 350 + sLS 2 + offR 0.15 → 8.1e-13 · reset 1.9e-13.

## Deviations

- Steps + node inspector + point labels are ours.
- showConstruction defaults ON here (OFF in the applet) so the pole step can
  narrate the chords; the panel toggle hides them as in the applet.
- The applet's reference-solution branch (i, E, the "0m" e_8 dimension
  comparing E₂ to the prescribed-force anchor position) is not drawn — at
  default it is invisible (length 0) and it duplicates the C/D readouts.
- The applet's α text subtracts an arbitrary 0.6° from the rounded angle
  (Text34); we display the true angle rounded to 0.1°.
- The applet's Text3 block swaps the subscripts of C and D (calls the pylon
  force N₁₀ and the backstay N₁₁, contradicting its own member numbers);
  our readouts use C = N₁₁ (pylon), D = N₁₀ (backstay).
- The end posts' violet-ish applet RGB (a fractional-part artifact of the
  dynamic color hack) is resolved to clean pink = tension / blue = compression
  by sign of the post offset.
- The prescribed-force circles for j are guarded: if they stop intersecting
  (extreme G drags) the last valid j is kept; G is clamped to a safe range.
