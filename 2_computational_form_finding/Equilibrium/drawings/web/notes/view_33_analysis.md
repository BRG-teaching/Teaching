# view_33 — Cantilever truss — applet decode

Source: `view_33/applet_0/geogebra.xml` (447 objects) + the LIVE applet
(https://block.arch.ethz.ch/eq/drawing/view/33) driven headless (per-step
`getVisible` diffs, coordinates at default / flipped / dragged states).
This page has a real site DESCRIPTION: "…1-2) constructing the loadline;
3-4) finding the magnitude and position of the resultant, using a trial
funicular polygon; 5-6) using an equivalent structure in which the
resultant is directly distributed into the supports to determine the
reaction forces; 7-8) constructing the force diagram node by node…".

## The model

- Wall x = 0: roller support B = (0, 0) (horizontal roller, draggable on
  the wall, supportRollerHorizontal glyph parts all hidden), pin support
  A = (0, −3.374) (draggable), tip C = (7.948, 0) draggable on y = 0.
  Bottom chord A–C quartered at D, E, F; verticals through them cut the
  top chord B–C at G, H, I. Members numbered 1–15 from the tip back:
  top chord 12, 8, 4, 1; bottom chord 14, 10, 6, 2; verticals 11, 7, 3;
  diagonals 13 (B–D), 9 (G–E), 5 (H–F) — or A–G, D–H, E–I when
  `flipDiagonals` is on; wall member 15 (B–A).
- Loads: five equal forces of 1 kN at the top-chord joints B, G, H, I, C,
  drawn 0.5 above the chord. Load line from the FIXED anchor G_1=(11,1.5),
  edges 1·scaleForceDiagram, Bow letters b, c, d, e, f on the divisions
  (`showPoints`).
- Trial (applet steps 3–4): free pole M_1 ("o"), draggable start N_1 on
  the wall; strings across the panel verticals ∥ the rays; outer strings
  meet at S_1 → R's vertical line of action (for equal loads through E/H).
  R = dashed th5 green on the load line (w_2, steps 3–6) and at the
  draggable V_1 on its action line (z_2, length loadSymbol slider);
  the load-line F-vectors are HIDDEN during steps 3–6 (COND 0∨2∨≥7).
- Three-force rule (applet steps 5–6): the roller's horizontal through B
  meets R's action line at A_2; pin direction = A–A_2; the parallel
  through the load-line end L_1 meets the roller's horizontal through G_1
  at the closing point Z_1. Reactions: A = Z_1→G_1 (w_5, green, ON the
  closing, permanent from step 6), pin split into components offset
  beside the load line: B_V = N_3→K_3 (offset left by
  offsetReactionForces) and B_H = W_3→M_3 (offset above), with dotted
  connectors; form arrows A / B_H / B_V at the supports (the applet shows
  these at every step; ours introduces them at the reactions step).
- Cremona in Bow's notation (applet steps 7–9): interior points 1..7
  (B_2..H_2, or I_2..O_2 flipped). No-flip order: joint A (wall 15 +
  chord 14 → pt 1), joint B (12 + diagonal 13 → pt 2), then joints
  D, G, E, H, I alternate (pt 3..7), tip C closes (member 2 = the check).
  Flipped order: B first, then A, G, D, H, E, I — at each of our steps
  the SAME "member of the step" (15, 13, 11, 9, 7, 5, 3+1, 2) appears,
  only its chord partner swaps, so one step list serves both states.
- internalForce macro on all 15 members (pipes, scaleInternalForces
  0–0.1); W-angles give tension in top chord + verticals, compression in
  bottom chord + diagonals — flipping the diagonals swaps diagonal /
  vertical signs.

## Controls (live-verified)

| control | kind | default | range | effect |
|---|---|---|---|---|
| mode / step | site sliders | 0 | 0–10 | staging; 0 = final |
| scaleForceDiagram | flyout | 1 | 0.5–1.5 | load-line scale |
| scaleInternalForces | flyout | 0 | 0–0.1 | pipes (mode 0) |
| showLabels | checkbox | TRUE | | member numbers 1–15 both diagrams |
| flipDiagonals | in-canvas checkbox | false | | mirrors diagonals + rebuilds the Cremona |
| offsetReactionForces | in-canvas slider | 0.8 | 0–1 | B_V/B_H offsets |
| loadSymbol | hidden slider | 1.445 | 0.5–2 | length of the form R arrow |
| showPoints | hidden checkbox | false | Bow letters + points (ours default true) |
| scaleSupports | hidden slider | 0.4 | 0.1–1 | support glyph (glyph itself hidden) |
| showHandles | hidden checkbox | false | drag handles |

## Applet steps (0–10) → ours (0–15)

1 loads (hl) → 2; 2 load line (hl) → 2; 3 pole o + rays + trial strings +
R → 3–4; 4 R at V_1 (hl 3–6) → 4; 5 three-force: A_2, q_4/m_4, closing →
Z_1, t_4/a_9 → 5; 6 reactions incl. offsets → 6; 7 first support joint
(A no-flip / B flipped) → 7; 8 second support joint → 8; 9 ALL remaining
members at once (orange re-flash copies f_10..a_11) → 9–14 (one Bow point
per step); 10 = 0 final → 15.

## Regression (scratchpad v33/regress33.py vs live coordinates)

- default: 33 points, max |err| = 8.9e-15
- flipDiagonals = true: 33 points, max 1.3e-14 (I_2..O_2 chain)
- dragged (A=(0,−4.2), B=(0,0.8), C=(9,0), M_1/N_1 moved, sFD=1.3,
  oRF=0.5): max 2.5e-14
- all 9 joint polygons close (no-flip) ≤ 1e-9.

## Deviations from the applet (deliberate)

- The applet's step 9 (all remaining members at once) is staged as one
  Bow point per step (our 9–14) — same one-joint-at-a-time logic the
  description asks for.
- Form reaction arrows A / B_H / B_V appear at our reactions step
  (applet: visible at every step as support symbols).
- The truss is drawn as a thin grey skeleton from step 1 (applet: full
  member set visible at all steps); members re-draw colored at their
  Cremona step and resolve pink/blue live (applet: mode-0 colors only).
- showLabels default true (applet true as well); showPoints default true
  (applet false).
- Trial + R + three-force apparatus retire at our step 7 exactly like the
  applet (COND < 7 / 5–6).

## Node inspector

9 joints: 1 pin A, 2 roller B, 3–5 top chord G/H/I, 6 tip C, 7–9 bottom
chord D/E/F, with separate sub-polygons for the flipped state. Pin A's
reaction sides land ON the visible offset arrows B_V (N_3→K_3) and B_H
(W_3→M_3); roller B's on the drawn A = Z_1→G_1.
