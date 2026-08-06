# View 1 — Subsystem: decode & audit notes

Source of truth: `view_1/applet_0/geogebra.xml` + the live applet at
https://block.arch.ethz.ch/eq/drawing/view/1 (driven headless via the
ggbApplet JS API).

## Audit vs live original (2026-08-06)

Method: full `getAllObjectNames()` dump of the live applet (95 objects, 34
visible), every boolean/slider flipped via `setValue` with visibility diffs +
screenshots, page sidebar DOM expanded and dumped, cross-checked against the
XML (`<condition showObject>`, dynamic colors, slider ranges).

### Toggles / sliders / modes found in the applet

| object | UI caption | default | effect (verified live) |
|---|---|---|---|
| `n` (boolean) | "1 & 2 symmetrical" | false | shows C' = mirror of C over ray A-B instead of D; bar 2 = C'-A |
| `o_1` (boolean) | "show internal Forces" | false | shows internal-force rectangles V1/V2/V3 (+ variants) and the `scaleInternalForces` slider |
| `o_2` (boolean) | "hide external force in force diagram" | false | hides the green vector v = F4->G |
| `n_4` (boolean, no UI) | "show points" | true | gates points A, G, H only (B, C, D always shown) |
| `p_4` (boolean, no UI) | "show handles" | false | shows 4 inert authoring handles I, J, M, N (they parameterize a segment `r` on line g that is itself `show=false` — no visible effect beyond the 4 points) |
| `mode` (slider 0–1) | "mode = 0" | 0 | flips the force diagram: G = other intersection of circle h with line g; load arrow u flips E->B / B->E |
| `F` (slider 1–10, step 0.1) | forces section | 5 | load magnitude |
| `scaleForceDiagram` (1–5, 0.1) | scales | 3.2 | |
| `scaleLoadSymbol` (1–10, 0.1) | on-canvas | 7 | |
| `scaleInternalForces` (0.01–1, 0.01) | scales, gated by o_1 | 0.13 | |
| `Radius` (slider 20–30, hidden) | — | 21 | guide-circle radius |
| `showNode`, `changeModeofStress` (hidden numerics) | — | 0 | unused leftovers (no element references them; `changeModeofStress` only reset by the Return-to-start script) |

The applet has NO `step` slider — the original view 1 is a single-state
interactive; our staged construction is the platform enhancement.

"Return to start" button script: resets n/o_1/o_2, A=(24,48), B/D/C onto the
circle via helper points Q/Q'/Q'' (120° apart), F_4=(96,58) etc. — our
"return to start" restores the same defaults.

Embedded image `Bild1_1` (Foto.png, a hatched-chasm site photo, alpha 0.5) is
NOT visible in the live applet (its startPoint anchors are NaN — degenerate
saved state), so the original renders no site drawing. Correctly absent from
our port.

### Deviations found

None functional. Our `views/view_1.js` already carries every live option
with the applet's defaults and ranges: `mode`, `n`, `o_1` (as `o1`), `o_2`
(as `o2`), `n_4` (as `n4`), all four scale sliders, F, and the hidden Radius
slider (exposed, harmless). The dynamic tension/compression color formulas
(w1/w2/w3 + A/S variants and the W23 > W13 branch) match the XML exactly.

Judged intentional (platform style, per PLAN.md / memory mandates): staged
paired steps, letter labels on points (original shows only member numbers
1/2/3), pink tension palette, node-equilibrium inspector, ghost preview,
internal-force pipes default ON.

Intentionally omitted: `p_4` "show handles" — the four handles do nothing
visible in the live applet (authoring leftovers for a hidden clip segment).
