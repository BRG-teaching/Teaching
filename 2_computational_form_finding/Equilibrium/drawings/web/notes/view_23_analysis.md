# view_23 — Cable-stayed bridge

Decode of `view_23/applet_0/geogebra.xml` (301 commands, no images; page title
"Cable-stayed bridge"). The applet has NO step/mode slider — the staged
construction is ours (canonical sequence). Many saved derived coords are
degenerate; the regression reference is the LIVE applet via CDP/ggbApplet —
7 states: default, dragged A₆ (support height), D₂ (fan point), K (anchor),
R + all sliders, reset. **29 checks × 7 states match to ≤ 7.1e-13**; all
9 node sub-polygons close exactly. Live screenshots scratchpad v23/orig_*.png.

## Structure (footbridge across a gorge, 1 :: 200 — 1 unit = 2 m)

- B₃ = (12.4947, 2.1222) the deck's right end, FIXED (`fixed=true` in the
  applet). B = B₃ − (12.5, 0); the left end A₆ = Point on the vertical
  segment B→B+(0,2.5) — DRAGGABLE support height (the deck slope changes;
  the left abutment rock outline is anchored to A₆ and follows).
- Deck A₆→B₃ (25 m), five nodes B₁₀, B₁, B₁₃, B₁₂, B₁₁ on the verticals
  x = x(B₃) − 11.25 + 2.5k (every 5 m horizontally). The short overhang
  A₆–B₁₀ is a real segment (e_9) but carries NO force — the abutment merely
  receives the deck.
- D₂ = PointIn(quad F₃F₂FF₁) — the stay fan point, draggable in the region.
  Mast = bar D₂→B₁₄ with B₁₄ = (14.1618, 3.3197) fixed on the rock; drawn as
  a double line (k_1 + parallel G–H offset 0.1). Backstay D₂→K with
  K = Point on a 21-vertex terrain polyline down the rock face (draggable).
- Members: stays '1','3','5','7','9' (B₁₀..B₁₁ → D₂), deck pieces
  '2','4','6','8','10' (node to node, '10' = B₁₁–B₃), '11' mast, '12' backstay.
- Loads COMPUTED from the deck build-up (applet Text21):
  Q_d = 0.41·1.8·l₂ + 6·1.8·l₁ + 0.95·2·l₂ kN per node, l₁ = 5 m horizontal
  spacing (constant), l₂ = 2·j₃ m along-deck spacing (j₃ = 2.5·|deck|/12.5).
  Default Q_d = 67.451 kN → load edge = Q_d/sFD units.

## Force diagram (Cremona, sFD = 50 kN per unit)

Load line R (free, draggable) → S → T → U → V → W stacking down (F₁ top…F₅
bottom; F₁ acts at the RIGHTMOST node B₁₁, F₅ at B₁₀). Joints from the left
node (bottom of the load line) up: Z = ∥stay1 through W ∩ ∥deck through V;
C₁ (∥stay3 through Z, ∥deck through U); D₁; G₁; H₁ = ∥stay9 through G₁ ∩
∥deck through R — deck piece '10' = H₁–R ends at the TOP of the load line.
The fan node closes: I₁ = ∥mast through H₁ ∩ ∥backstay through W;
'11' = H₁–I₁, '12' = W–I₁. The three rock reactions are the same segments:
A = H₁→R (deck thrust at B₃), B = I₁→H₁ (mast), C = W→I₁ (anchor pull) —
loads + A + B + C form one closed polygon.

Reaction display: offsetReactionForces (0.3, [0, 0.3]) shifts each reaction
arrow beside its member segment by ONE perpendicular vector (green th5 arrow +
two green dotted connectors each): A above '10', B right of '11', C below
'12'. Form side: A = arrow into the deck end along the deck (flips outward if
'10' ever goes tension, applet μ≟0 logic), B = arrow into the mast base along
the mast (flips via ζ<180°), C = arrow at K along the backstay away from D₂.

## Sliders / options (ported)

scaleForceDiagram 50 [25,100] · scaleLoadSymbol 1.5 [0.5,2] (off-canvas
slider) · offsetReactionForces 0.3 [0,0.3] (on-canvas world slider → panel) ·
scaleInternalForces 0 [0,2]; macro halfwidth = sIF·|seg|/25/(50/sFD) for
STAYS and /50 for deck/mast/backstay (stays get double scale — kept); ours:
halfwidth = sIF·|seg|·(2 stays / 1 others), slider [0,0.12] default 0.04, ON ·
showLabels T (always on) · showDims F → "show dimensions" toggle (l₁ = 5 m,
l₂ = 2·j₃ m, support height 2·a6t m as real dimension lines; the applet's
span dims r_4/s_4/t_4 evaluate to NaN in the applet itself — not ported) ·
showRF F (checkbox hidden and unused in the applet — not ported) ·
showHandles F (only reveals internal point captions — not ported).

## Steps (ours, 0..14; RESOLVE 14)

0 intro · 1 site (rock faces instant grey, from the applet's poly1 — which
follows A₆ — and fixed poly3; hidden polygon edges not drawn) · 2 deck +
guide + verticals (band y ∈ [−1.118, 9.694], dashed ends at x = −0.0458 /
12.4652 exactly as the applet) · 3 mast bar · 4 stays · 5 backstay ·
6 loads F₁..F₅ + load line (paired) · 7-11 joints B₁₀, B₁, B₁₃, B₁₂, B₁₁
(members 1+2, 3+4, 5+6, 7+8, 9+10; overhang colored with piece 2 at 7, as
the applet colors e_9 by θ) · 12 fan node closes (11 + 12) · 13 reactions
A, B, C both sides (members 10/11/12 re-flashed) · 14 resolve + readouts.

## Node inspector (house addition; count 7 — the fan node has 7 forces)

1–5 deck B₁₀,B₁,B₁₃,B₁₂,B₁₁ · 6 fan D₂ · 7 bearing B₃ · 8 mast base B₁₄ ·
9 anchor K. Polygons (verified): B₁₀ [V→W, W→Z, Z→V]; B₁ [U→V, V→Z, Z→C₁,
C₁→U]; B₁₃ [T→U, U→C₁, C₁→D₁, D₁→T]; B₁₂ [S→T, T→D₁, D₁→G₁, G₁→S];
B₁₁ [R→S, S→G₁, G₁→H₁, H₁→R]; D₂ [H₁→G₁, G₁→D₁, D₁→C₁, C₁→Z, Z→W, W→I₁,
I₁→H₁]; B₃ [R→H₁ + reaction on the drawn offset arrow D₄→C₄]; B₁₄ [H₁→I₁ +
H₄→G₄]; K [I₁→W + I₄→L₄].

## Regression numbers

`v23_regress.py`: default 2.0e-13 (A=337.1, B=609.2, C=634.0 kN) · A₆→y3
2.0e-13 · D₂ drag 8.5e-14 · K drag 1.3e-13 · sliders (sFD 75, sLS 2,
offR 0.15) 7.0e-13 · reset 2.0e-13. B₃ is fixed (setCoords refused by the
applet — `fixed=true`), so it is not draggable here either.

## Deviations

- Steps and node inspector are ours (the applet is free-form).
- The tiny end-cap tick k_2 at A₆ (0.15 perpendicular) and the white mask
  rectangle poly2 under the left abutment are not drawn (visual noise).
- The applet's broken NaN span dimensions are dropped; l₁/l₂/height dims are
  drawn as proper dimension lines with ticks under "show dimensions".
- Points get small labels (A₆, B₃, D₂, B₁₄, K; R…W, Z, C₁, D₁, G₁, H₁, I₁)
  for the captions — the applet labels only members, loads and reactions.
