# view 54 — Cathedral of Laon (decode notes)

Source: view_54/applet_0/geogebra.xml (531 commands, the largest applet);
live dumps scratchpad/live54/*.json (s0..s15 + mode1); chain in
scratchpad/v54_cmds.txt; masks in v54_masks.txt.

## Construction — three chained three-point problems

- Stage pattern (identical ×3): sag point (B / D / G) DRAGGABLE on a vertical
  guide; the CIRCLE TRICK: Circle[sag, Midpoint(span ends)] ∩ the guide's
  vertical = the mirrored point (B_p / D_p / G_p); the chords through it are
  the funicular's END TANGENTS. Parallels through the stage's load-line ends
  meet at the pole. Thrust = 12-strip walk (stations uniform with HALF strips
  at the ends: dx = h/2, h, …, h, h/2; strings ∥ pole rays to the 12 uniform
  divisions of the stage's load-line piece).
- Chaining: stage 1 (flyer A–C, band q₁, loads K→L, |R₁| = 2): pole M.
  Stage 2 (buttress C–E, q₂): pole N = Line[L ∥ C–D_p] ∩ M's VERTICAL — the
  flyer's last string = the buttress's first. Its load piece ends at
  **O = Line[N ∥ D_p–E] ∩ load line** (self-consistent: the last tangent's
  ray returns to the line; R₂ varies with the drag). Stage 3 (nave arch F–H,
  q₃): pole M₃ = Line[O ∥ F–G_p] ∩ N's vertical; load piece ends at
  **P₃ = Line[M₃ ∥ G_p–H] ∩ load line** (NOT at the applet's P!).
- P = Line[N ∥ E–H] ∩ load line = the marker for the STRAIGHT piece E–H
  (no load between E and H); C–F likewise straight (drops the flyer thrust
  to the arch level). Ground legs F–I (I DRAGGABLE on the ground) and H–J;
  ground reactions close the polygon: P₃ → X ∥ H–J, X → K ∥ F–I.
- The cathedral silhouette pic1 (buttress_filled-01.png) anchors
  PicLeft=(5,2.6), PicRight=(10.8,2.6) → assets/view_54_section.png.
- Points at s0: A C E F H J grey, B D G I K WHITE (draggable). Thrust lines
  BLACK at the resolved state (a_1, t_3, b_5 + t_3 straight pieces); loads/
  reactions green; trial triangles retire per stage (masks s4/s8-9/s13-14).

## Regression

scratchpad/v54_regress.py: worst 4.9e-14 over s0/s15/mode1 including ALL 42
thrust vertices of the three walks (a_1, t_3, b_5 vertex-by-vertex).

## Gotchas

- Stage-2/3 load totals are GEOMETRIC consequences (|L→O|, |O→P₃| from the
  last-tangent rays), not fixed numbers — they change when the sags drag.
- The walk's ray-to-piece mapping: piece k ∥ ray to division k (0-based),
  last piece ∥ ray to division 12 — off-by-one drifts the whole walk.
- b_5's fan targets confirmed by back-solving from the live strings
  (gap 0.2222 uniform, middle ray horizontal = symmetric arch).
