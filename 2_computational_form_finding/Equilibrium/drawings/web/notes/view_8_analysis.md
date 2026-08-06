# view_8 "Funicular For Vertical Forces" — analysis

Decode notes live in the view_8.js header (hidden trial machinery J_1/K_1,
division point Q_1 = "i", pole locus through i ∥ closing line A-B).
Regression: scratchpad/view8_regress.py (~5e-7 vs baked coordinates).

## Audit vs live original (2026-08-06)

Driven the live applet headless via the ggbApplet JS API: enumerated all
objects, flipped every boolean (scratchpad/audit789/live8/). The applet has
NO step slider — the whole drawing shows at once; our staged construction
(trial → i → pole locus → strings) is the platform's pedagogical layer.

### Toggle table

| control | default | effect (live-verified) |
|---|---|---|
| `hideRF` | false | hides u_4/v_4 = green B (I₁→o) and A (o→D₁) in the force diagram |
| `o_2` "hide inner forces" | false | blackens the DYNCOLOR tension/compression coloring of the five members c_3..g_3 AND the five rays n_3..s_3 (visibility unchanged) |
| `o_3` "show points" | **true** | the four funicular nodes S_1/T_1/U_1/V_1 |
| `showConstraints` | false | the four load rails j/l/m/a_1 on the deck line (light grey 224 dashed) |
| `showHandles` | false | scaffold/export-frame corners only |
| `mode` 0/1 | 0 | only hides the scaleInternalForces slider; no drawing change |

### Deviations found → fixed

1. **Missing `hideRF` checkbox** (default false). Added; gates reacAf/reacBf
   + A/B labels.
2. **Missing `o_2` "hide inner forces" checkbox**. Added: blackens members,
   rays and their numbers via the color chain (compute() honors s.o2).
3. **Reaction chain not end-to-end / overlapping** (user standard): reacAf and
   reacBf were offset independently (`beside()`), so B's head missed A's tail
   at o and A crossed the fan. Rebuilt: the WHOLE chain I₁→o (B), o→D₁ (A)
   translates rigidly by ONE offset vector `roff` outside the ray fan — B's
   arrowhead lands exactly on A's tail. Node-inspector support highlights
   reuse the same offset geometry.

### Checked, no change needed
- Applet draws A/B ON the closing rays (th5 over th2); our rigid offset keeps
  them legible without covering the member rays (user directive).
- o_3 ↔ our "show points" (default true) matches; ours is a superset (all
  construction points).
- showConstraints ↔ our "show constraints (load rails)" matches (quarter
  rails on the deck line).
- F₁..F₄ captions both diagrams: already present.
- Walls (A-B segments x=0/x=23.67, y −10..15), dotted lines of action, black
  dashed closing line A-B and ray o-i, labels i/o: all match the live applet.
- Trial construction: the applet never shows it; keeping it grey to the end
  is the platform's documented pedagogical choice (commit 0be18a0).
