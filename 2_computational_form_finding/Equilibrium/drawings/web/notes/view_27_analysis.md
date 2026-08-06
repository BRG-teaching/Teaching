# view_27 — Constant force top chord truss — applet decode

Source: view_27/applet_0/geogebra.xml, title from page.html: **Constant force
top chord truss**. Live original verified via ggbApplet API (headless
chrome): defaults exactly the XML set; every checkbox flipped and
screenshotted; Q case exercised (the site JS moves Q1 onto the loaded node —
reproduced). No embedded images.

## The model

The dual of view 26: a truss whose horizontal **top chord carries a constant
(compression) force** chosen by the designer. Six chord panels at y = 8.5
(nodes G1,(1,8.5) … G2,(13,8.5), span 12, `divisions` = 6); five equal loads
G = loadG = 1 kN at the interior nodes (drawn on the line y = 10, i.e.
`distLoadSymbol` = 1.5 above the chord, with long dotted action lines
loaSeg1–5 spanning y 1.033…11.097). Below hangs a **funicular cable**
(members 2,6,10,14,18,21) connected by **vertical compression struts**
(3,7,11,15,19); the four **diagonals** 5 (A–L), 9 (B–N), 13 (N–D), 17 (P–E)
are ZERO-FORCE under uniform load (drawn black; their force-diagram segments
degenerate to points) and only activate under the extra load Q.

- Load line: LL0 = (21,10) free; LL_k = LL_{k−1} − (0, g_k·sFD) with
  g_k = G·(1 + factorQ·[k = positionQ]).
- Division i = H on the load line at y(LL5) + B·sFD, B = Σ g_k·x_k/span —
  the applet derives it via the grey TRIAL funicular (showConstructionTrial:
  free pole (23.4644, 7.5284) right of the load line, FP0 = (1, 4.5649) on
  the x=1 vertical, walk ∥ pole rays across the action lines, dash-dot
  closing FP0–F, parallel through the pole → H); our direct reaction formula
  matches the live H to 2e-14 in the Q case too.
- The designer's choice: `F_{topChord}` (visible slider 2–5, default 4)
  puts I = LL0 − (sFD·Ft, 0); the grey dimension h_6 'F_{top chord}'
  (R_1 = (21, 10.5675) free on the vertical through LL0 sets its height,
  dotted risers g_6/f_6 from a and T) shows it — WHOLE dimension hidden when
  factorQ ≠ 0 (chord forces then differ per panel).
- Cable SHAPE is designed for the UNIFORM case (cyan showConstruction
  layer): LLB_k = uniform load-line copy, iB = its midpoint, rays iB→(x_I,
  LLB_k levels); member 2 ∥ iB→I from G1 to the first action line → J,
  member 6 ∥ iB→K → L, … closes exactly on G2 (verified).
  Baked shape: J(3,7.25), L(5,6.5), N(7,6.25), P(9,6.5), R(11,7.25).
- Force diagram (general loads on the FIXED geometry): T = horiz(a) ∩
  (H ∥ mem2); U = vert(T) ∩ (H ∥ mem6); V = horiz(b) ∩ (U ∥ diag5);
  W = vert(V) ∩ (H ∥ mem10); Z = horiz(c) ∩ (W ∥ diag9); A₁ = horiz(d) ∩
  vert(Z); B₁ = (H ∥ mem14) ∩ (A₁ ∥ diag13); C₁ = horiz(e) ∩ vert(B₁);
  D₁ = (H ∥ mem18) ∩ (C₁ ∥ diag17); E₁ = horiz(f) ∩ vert(D₁). Uniform:
  U=V, W=Z, A₁=B₁, C₁=D₁ all on x = x_I — chords all 4 units (CONSTANT),
  struts all G, cable 4.03–4.72 kN.
- Offset reaction chain (offsetReactionForces = 0.6, 0–1, visible slider):
  O_1/P_1/Q_1 at x+off on levels a/i/f; B = Q_1→P_1, A = P_1→O_1; dotted
  connectors n_5/p_5/q_5. Form arrows: A/B green, pointing up BELOW the
  chord ends (tips distLoadSymbol/2 = 0.75 under the node, length
  scaleLoadSymbol = 0.8).
- Q: orange (255,127,0) vector w at the loaded node (Q1 synced to
  positionQ by the site's JS); load-line labels switch G_k → 'G_k+Q' orange.

## Sliders / booleans (live-verified; site exposes sIF, sFD, F_topChord, showLabels)

| name | default | range | shown | meaning |
|---|---|---|---|---|
| F_{topChord} | 4 | 2–5 | yes | the DESIGN choice — chord force |
| scaleForceDiagram | 1 | 0.5–1 | yes | units per kN (changes the designed shape too) |
| offsetReactionForces | 0.6 | 0–1 | yes | reaction chain offset |
| factorQ | 0 | 0–4 | yes (canvas) | Q = factorQ·G extra at one node |
| positionQ | 1 | 1–5 | yes (canvas) | which node carries Q |
| scaleInternalForces | 0 | 0–0.05 | yes | pipes |
| loadG | 1 | 0–5 | hidden | nodal load |
| distLoadSymbol | 1.5 | 0–2 | hidden | load-drawing line offset above the chord |
| scaleLoadSymbol | 0.8 | fixed | hidden | arrow lengths |
| showConstructionTrial | false | | hidden checkbox | grey trial funicular + pole → i |
| showConstruction | false | | hidden checkbox | CYAN derivation of the cable shape (iB, I, rays, chain) |
| showPoints / showLabels / showHandles | false | | checkboxes | points / member numbers 1–21 / rails |

## Member numbering (both diagrams)

Chords 1,4,8,12,16,20 (blue, angle=π); cable 2,6,10,14,18,21 (red);
verticals 3,7,11,15,19 (blue = struts); diagonals 5,9,13,17 black at
factorQ = 0 (their force numbers only shown when Q ≠ 0, per the applet's
text conditions), live-colored otherwise. internalForce pairs e.g.
1: (G1→A, a→T); 2: (G1→J, T→i); 3: (A→J, U→T); 5: (A→L, V→U);
13: (N→D, A₁→B₁); 21: (R→G2, E₁→i).

## Regression (scratchpad reg27.py vs live API dumps)

35 checkpoints (load line, H, iB, I, all 5 cable nodes + closure on G2, all
10 force-walk points, offset chain, 7 chord nodes) in THREE live states —
default, factorQ=2 @ position 2, F_topChord=2.5: **max err 2.1e-14**.
Chords 4.000000 ×6 (constant); struts 1.0000 ×5; cable 4.717/4.272/4.031/
4.031/4.272/4.717 kN.

## Port deviations

- Reactions/H computed directly (equivalent to the applet's hidden trial —
  verified in the Q state); the trial itself is ported behind a
  'show trial funicular' toggle with the applet's free pole/FP0 (draggable).
- The cyan showConstruction layer is ported as a toggle in a slightly darker
  cyan (#00b7c6) for legibility on white.
- Member numbers default ON (house style; applet showLabels default false);
  positions clearance-based (the applet anchors them at bare midpoints).
- The F_top chord dimension gets end ticks (the applet decorates the segment
  with arrowheads); label + live value; draggable height (R_1).
- Node-equilibrium inspector (12 nodes, max 5 forces) is our addition.
