# view_29 — Constant force bottom chord truss — applet decode

Source: view_29/applet_0/geogebra.xml, title from page.html: **Constant force
bottom chord truss**. Live original verified via ggbApplet API (headless
chrome): defaults = XML; all checkboxes flipped and screenshotted; Q case
exercised. No embedded images. The mirror sibling of view 27.

## The model

A six-panel truss whose horizontal **bottom chord (the deck) carries a
constant TENSION force** chosen by the designer (`F_{bottomChord}`, visible
slider 2–5, default 4): a funicular **arch** rises above (compression), the
five **verticals are tension hangers** carrying exactly one nodal load each,
and the diagonals 5 (A–L), 9 (B–N), 13 (N–D), 17 (P–E) are zero-force under
the uniform loads.

- Deck: L1=(1,6) … L2=(13,6) (`divisions` = 6); chord at y = 6.5
  (`distLoadSymbol` = 0.5 ABOVE the load-drawing line); loads G₁…G₅ = 1 kN
  hang below (arrows (x,6)→(x,5.2), scaleLoadSymbol 0.8; Q stacks below at
  (x,5.2)→(x,4.4), orange). Action lines y ∈ [1, 11.149].
- Chord nodes G1,A,B,C,D,E,G2; arch (designed for the UNIFORM case, cyan
  showConstruction layer: iB = uniform load-line midpoint, I = LL0 −
  (sFD·F_b, 0), rays iB→(x_I, levels)): J(3,7.75), L(5,8.5), N(7,8.75),
  P(9,8.5), R(11,7.75); closes exactly on G2 (verified).
- Members: arch 1,4,8,12,16,20; chord 2,6,10,14,18,21; hangers 3,7,11,15,19;
  diagonals 5,9,13,17 (black at factorQ = 0; force segments degenerate).
- **Load line REVERSED**: LL0=(21,10) free at the top, then G₅,G₄,G₃,G₂,G₁
  downwards to LL1 (green labels text45–49; the lvector caps 'F_1/F_4…' are
  the applet author's leftovers). Division 'i' = H; the segment from the
  BOTTOM (LL1) up to i is the LEFT reaction A, i→LL0 is B — **the applet's
  offset-chain caps u_1='B'/v_1='A' are SWAPPED vs its own statics**
  (verified in the live Q state: |LL1→H| = 3.833 = A for Q at node 2; same
  applet sloppiness as view 7). Our port labels them physically (bottom = A,
  top = B); form arrows u='A' (left), v='B' (right) are correct in the
  applet and match.
- Force-diagram walk (general loads on the fixed geometry, right-to-left):
  T = horiz(LL0) ∩ (H ∥ mem20) [chord 21 = LL0–T, arch 20 = T–H];
  U = vert(T) ∩ (H ∥ mem16) [hanger 19 = T–U]; V = horiz(LL5) ∩ (U ∥ diag17)
  [chord 18]; W = vert(V) ∩ (H ∥ mem12) [hanger 15]; Z = horiz(LL4) ∩
  (W ∥ diag13) [chord 14]; A₁ = horiz(LL3) ∩ vert(Z) [hanger 11, chord 10];
  B₁ = (H ∥ mem8) ∩ (A₁ ∥ diag9); C₁ = horiz(LL2) ∩ vert(B₁) [hanger 7,
  chord 6]; D₁ = (H ∥ mem4) ∩ (C₁ ∥ diag5); E₁ = horiz(LL1) ∩ vert(D₁)
  [hanger 3, chord 2, arch 1 = E₁–H closes on A]. Uniform: U=V, W=Z, A₁=B₁,
  C₁=D₁ on x = x_I; chords all = 4 (CONSTANT), hangers = G, arch 4.03–4.72.
- Grey trial funicular (hidden showConstructionTrial): pole (24.5029,
  6.0367) right of the load line (slightly off-canvas), FP0 = (1, −10.7802)
  free on x=1 — the applet's saved trial polygon lies BELOW the canvas;
  rays, dash-dot closing FP0–F and pole-parallel → H are the visible part.
  Our direct reaction formula matches the live H to 2e-14 incl. the Q state.
- Dimension f_6 'F_{bottom chord}' (R_1 = (21, 10.6227) free height, dotted
  risers to LL0 and T), hidden when factorQ ≠ 0.
- Offset chain: offsetReactionForces = 0.6 (0–1): O_1/P_1/Q_1 at x+off on
  levels LL0/i/LL1, dotted connectors m_5/n_5/q_5.

## Sliders / booleans (site exposes sIF, sFD, F_bottomChord, showLabels)

Same set as view 27 with F_{bottomChord} in place of F_{topChord}; loadG=1,
scaleLoadSymbol=0.8, distLoadSymbol=0.5 hidden; factorQ 0–4, positionQ 1–5
visible on canvas; showHandles/showPoints/showConstruction(cyan)/
showConstructionTrial(grey)/showLabels checkboxes default false.

## Regression (scratchpad reg29.py vs live API dumps)

34 checkpoints (reversed load line, H, iB, I, 5 arch nodes + closure on G2,
all 10 walk points, offset chain, 6 chord nodes) in default AND factorQ=2 @
position 2: **max err 2.1e-14**. Chords 4.000000 ×6; hangers 1.0 ×5; arch
4.717/4.272/4.031/4.031/4.272/4.717 kN.

## Port deviations

- Offset reaction chain labeled physically (bottom = A, top = B; applet caps
  swapped, see above).
- Reactions/H computed directly (≡ the applet's hidden trial, verified);
  trial ported behind a toggle with the applet's free pole/FP0 (draggable —
  note the applet's saved FP0 starts the trial below the visible canvas).
- Cyan derivation layer as a toggle (#00b7c6); member numbers default ON;
  dimension with end ticks + live value; 12-node inspector added.
