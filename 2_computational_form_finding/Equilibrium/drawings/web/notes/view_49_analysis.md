# view 49 — Moment from force pair

Ground truth: https://block.arch.ethz.ch/eq/drawing/view/49 (headless CDP,
dumps in scratchpad/live49/). A compact conceptual applet — no force diagram,
no funicular, no mode/step machinery.

## Decode summary

- Center `A` (6,8) with `distance` slider (1..3 = 2): action points
  `C = A + (0, distance)` and `B = A − (0, distance)`; `H = A − (0,3)` is
  the lower end of the vertical rail `i = N–H` (grey dash10) on which the
  reference point `J` slides (a path point — it keeps its FRACTION along
  the rail when `distance` changes).
- The couple: `u = D→E` green th5 cap F_o through C pointing right,
  `v = G→F_1` cap F_u through B pointing left; half-length =
  scaleLoadSymbol (0.5..3 = 1.35). Slider `F` (1..3 = 2) only scales the
  readouts. Lines of action f/b exist but are hidden.
- Dimension columns (thin grey with CROSS-style endpoints, dotted black
  connectors p/q/r): `t = V–U` at x = 7.819 measuring d = 2·distance
  (text5 "d = 4"); `k = K–L` at x = 8.780 measuring d_o = |y(C) − y(J)|
  (text4); `n = P–Q` at x = 9.0 measuring d_u = |y(J) − y(B)| (text6);
  x-anchors K/M/O/V draggable along f.
- Rotation-sense marker at Z (15.84, 9.49): right half-circle arc
  (CircleArc A_1→W), arrowhead "◀" at the bottom + "+" — clockwise
  positive, the couple's own sense.
- Readouts (anchors B_1/C_1 ≈ (12, 10.1)/(12, 8.9)): when y(L) ≥ y(Q)
  "M = F_u·d_u + F_o·d_o = … =" and "F · d = 8"; when the reference drops
  below the pair (y(L) < y(Q)) the formula flips one sign (text3/text9) and
  the total is F·|KL| − F·|PQ| — still F·d.
- Page buttons (HTML, via controls dict): button1 "do = 0" → J:=C,
  button2 "do = du" → J:=(6,8)=A, button3 "du = 0" → J:=B; button4
  "du = −1" → J:=H exists in the applet but is commented out of the page
  controls. sliders scaleForceDiagram/scaleInternalForces exist but are
  hidden; scaleLoadSymbol's slider sits off-canvas (page "scales" flyout).
- showHandles: handle points A/H/B/C/K/M/O/Z/W/A_1/B_1/C_1.

## Regression

15 derived points (B, C, H, arrow ends D/E/F_1/G, columns L/P/Q/R/S/U, N,
T) + d_o/d_u/M checked against live dumps in four states (default, J at B,
J at H, distance=3 + F=3 + sLS=2): max err **5.3e-15**; M = F·d in every
state (8, 8, 8, 18).

## Hand-written staging (10 steps)

intro → F₀ → Fᵤ (pair, zero resultant) → arm d (dimension column) →
M = F·d + clockwise "+" arc → reference line through J (drag + panel
buttons) → d₀ → dᵤ → split formula M = F₀·d₀ + Fᵤ·dᵤ (live) → resolve
(reference below the pair: minus sign, total unchanged).

## Deviations

- **No node inspector**: the drawing contains no structure and no
  equilibrium nodes — it is a pure moment/couple demonstration (the pair
  has zero resultant, so even the global force polygon is degenerate).
  Documented here instead of forcing one.
- The applet's formula texts pair F_u with Distance[K,L] (which its own
  label calls d_o) — a harmless naming swap since F_u = F_o = F; the port
  writes the physically matched pairs (F₀·d₀ + Fᵤ·dᵤ, minus on the LOWER
  share when the reference lies below the pair).
- button4 ("du = −1") is restored as a panel button (the page comments it
  out but the state is the applet's own text9/text3 case).
- Distances/moment formatted to at most 2 decimals (the applet prints raw
  2-decimal GeoGebra numbers).
