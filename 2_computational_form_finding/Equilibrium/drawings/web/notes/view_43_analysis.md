# view_43 — Internal forces in a three-hinged frame, line load: applet decode

Source: `view_43/applet_0/geogebra.xml` (503 objects incl. the baked runtime
chain LP1*/loa*/LL*/seg*/FP*/segM*/FPM*) + the live applet
(https://block.arch.ethz.ch/eq/drawing/view/43) driven headless (every mode
flipped, hinge dragged). The saved FP*/FPM* coordinates in the XML are a
degenerate saved state (1e40+) — only the live/recomputed values count.

## Controls the original exposes

| control | kind | default | effect |
|---|---|---|---|
| `show N` / `show V` / `show M` | page buttons | showN=true | exclusive diagram modes drawn on a frame copy 15 units below (booleans showN/showV/showM; buttons also clear showMParabola/showMThrustLine) |
| `showMParabola` | checkbox (visible with showM) | false | the M parabola's own pole construction: chords F₂–D₅–H₂, pole E₅, fan segM*, circle k₁₄ |
| `showMThrustLine` | checkbox (visible with showM) | false | fan LL_i→I₁ + the ideal thrust line (funicular of pole I₁ from the copy feet, dashed) + H measure (draggable B₂) + M_x probe (draggable L): M_x = M·sMD = H·y_x·sFD |
| `o_1` "trial funicular construction" | checkbox | false | trial poles Q₁, R₁* + trial funiculars P₁–S₁–T₁ and U₁–V₁–W₁ + closings + division parallels + hinge chords A–I, I–C |
| `j_2` "show construction" | checkbox | false | three-force superposition: A–Z, Z–C (R₁ alone), A–A₁, A₁–C (R₂ alone), partial poles G₁, H₁, dashed force triangles |
| `showBow` | checkbox | false | Bow notation: regions 1–5 at the hinges/corners, letters A–F around |
| `showHandles` | checkbox | false | hidden drag handles + the distance/scale sliders |
| `switchN` | slider 0/1 (visible with showN) | 0 | flips the N diagram to the other side of the members |
| sliders | scales/forces flyouts | frame_1=8, q=16, sFD=10, sLS=0.6, sMD=50, sND=30, sVD=30 | |

## Construction (all regression-checked)

Frame: A=(0,yA) foot (draggable on the axis), B, C, D via circle(A, frame_1):
square l = h = frame_1. Hinge I draggable on the girder; l₁ = x(I).
Load band above the girder split at the hinge → R₁, R₂ (green rects + arrows
at the half-band centroids). Load line LL0 (draggable) down k = q·l/sFD,
divided at E₁ (= q·l₁/sFD).

Divisions: left trial (pole Q₁): funicular wall → centroid vertical → hinge
vertical, closing chord's parallel through Q₁ cuts the load line at Z₁;
right trial (pole R₁*) likewise → A₂. Parallels to the hinge chords A–I
(through Z₁) and I–C (through A₂) meet at the pole I₁; K₁, J₁ = its vertical
projections on the load-line ends' levels. Components: A_H = K₁→LL0,
A_V = I₁→K₁, B_V = J₁→I₁, B_H = K→J₁ (green, + the same four at the feet).

N diagram: components rotated ±90° onto the members (switchN flips): columns
−A_V/−B_V, girder −A_H. V diagram: girder straight from +A_V to −B_V
(zero under the load centroid), columns constant ∓A_H. M diagram: corner
points G₂/I₂ = B_M/D_M ∓ A_H·h·sFD/sMD outside the columns, quarter-circle
arcs swing them onto the girder (F₂/H₂ = closing line), M parabola =
funicular of pole E₅ (found from chords F₂–D₅, D₅–H₂ where D₅ mirrors
M_max1 about M_max2), M_max = q·l²/8/sMD between closing line and girder.
Thrust line = funicular of pole I₁ from the copy feet (20 divisions), dashed;
M_x = H·y_x equivalence with draggable probe L and H measured at draggable
height B₂.

## Regression

Full chain vs the LIVE applet, default and dragged hinge (I = 2.5):
worst error 3.7e-14 over ~45 named points incl. FP/FPM funicular samples
(scratchpad `v43_reg.py`); H and A_V cross-checked analytically
(H = q·l₁·l₂/2h, A_V = q·l/2).

## Port structure (no step slider in the applet — 15 hand-designed steps)

frame → dimensions → load/load line → trial L → division Z₁ → trial R →
division A₂ → pole I₁ (hinge chords) → reactions → N → V → M → thrust line →
done. The display mode follows the steps (N at 10, V at 11, M from 12)
until the user presses a mode button; the trial apparatus retires at "Done"
exactly like the applet's unchecked o_1 (toggle brings it back).

## Deviations from the applet (and why)

- red diagrams → house pink (PAL.red); current-step flash black.
- The applet's static text "q = 20 kN / m" contradicts its own q = 16 slider
  (authoring bug) — we print the live q value.
- The N/V/M diagram copies share one offset (the applet's three equal
  distance sliders, hidden) — not separately draggable.
- Hinge drag clamped to (0.05, l−0.05): the applet's special-case displays
  for the hinge exactly at a corner (R₂ full-line vector + swapped texts)
  are not reproduced.
- Bow-notation labels placed by our own offsets (the applet anchors some to
  computed midpoints).
- Node inspector (ours): A, B, I, D, C — feet close A_H+A_V+column force,
  corners/hinge show the two collinear resultants (I: through E₁ level).
- House pipes on the frame members (axial widths), default on.
