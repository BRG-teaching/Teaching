# View 3 — Pedestrian Bridge 2: decode & audit notes

Source of truth: `view_3/applet_0/geogebra.xml` + the live applet at
https://block.arch.ethz.ch/eq/drawing/view/3 (driven headless via the
ggbApplet JS API). NOTE (earlier finding, still true): the XML's baked
coordinates of DERIVED points are a degenerate saved state — regression must
use recomputed defaults; only FREE points are trustworthy.

## Audit vs live original (2026-08-06)

Method: full live object dump (390 objects, 75 visible), every boolean and
the `mode` (0–2) / `step` (0–12) / `node` (0–7) sliders exercised with
screenshots per state, both scenario buttons replayed (XML scripts), page
sidebar dumped, embedded site images measured through anchors D_5/E_5.

### Toggles / sliders / modes found in the applet

| object | UI caption | default | effect (verified live) |
|---|---|---|---|
| `u_4` (boolean) | "show dimensions" | true | grey dimension figure below the deck: three "4 m" segments split at the load points + one "12 m" segment (grey points J_5..O_5) |
| `o_2` (boolean) | "show fractured rock" | false | swaps the site image: pic2 = VorlageRhino.jpg (intact) <-> pic1 = FracturedRock.jpg (one dark wedge broken out of the right bank face, world approx x 18.2..20.5 x y 10.4..14.1), both drawn at alpha 0.5 |
| `o_4` (boolean) | "show handles" | false | authoring handles (dimension-row and frame positions) — no construction meaning |
| `mode` (slider 0–2) | "mode = 0" | 0 | 0 = finished drawing only (step-gated construction elements hidden); 1 = staged construction (step slider); 2 = node equilibrium (grey base + orange vectors, node slider) |
| `step` (slider 0–12, mode 1) | | 0 | staged construction, current step orange; at step 12 the applet KEEPS the dashed chord, the pole line o–i with labels, and the relocated dashed-green R on its line of action, while the trial pole/rays/funicular retire |
| `node` (slider 0–7, mode 2) | | 0 | 1 = M₁ (N_1 + F₁), 2 = L₁ (N_4 + F₂), 3 = D₂ (N_1/N_2/N_3), 4 = C₂ (N_5/N_2/N_4), 5 = S₁ (anchor B + N_3), 6 = R₁ (anchor A + N_5), **7 = resultant at H₃** (vectors R, A, B — three-force equilibrium on R's line of action; highlights R on the load line + sides A and B in the force diagram) |
| `F_{1}` (slider 5–20, step 0.2) | forces | 8 | each load |
| `scaleForceDiagram` (0.5–5, 0.25) | scales | 0.75 | |
| `scaleOffset` (0.001–1, 0.1, VISIBLE) | scales | 0.4 | offset of the green vectors beside the polygon; the page's stepslider() JS zeroes it during steps 2–6 |
| `loadSymbol` (1–3, hidden) | | 2 | |
| `scaleInternalForces` (0–0.05, visible mode 0) | scales | 0 | |
| `closingString` (1–20, hidden) | | 17 | trial-string start parameter |
| `offsetResultant` (0–1, gated mode1 steps 3–5 / node 7) | | 0.4 | offset of the R arrow from the load line |

### Scenario buttons (XML javascript scripts)

- **"Symmetric State"**: F=8; R_1 -> G_2 = (1.797, 11.550); S_1 -> H_2 =
  (18.380, 11.710); B_2 -> K_2; o_2 = false. K_2 = the LEFT intersection of
  the circles of radius 12/scaleForceDiagram around Q_1 and O_1 — i.e. the
  pole position at which BOTH anchor cables carry exactly 12 kN
  (|A| = |B| = 12 kN readout).
- **"Asymmetric State"**: F=8; R_1 -> I_2 = (0.273, 19.761) (high on the
  left bank); S_1 -> J_2 = (18.054, 9.359) (below the fractured wedge);
  B_2 -> P_5; o_2 = true. P_5 = point at distance |P_1 K_2| from P_1 along
  the ray to the current pole (preserves the middle-cable force), then
  re-anchored on the new parallel through i (B_2 is a point on that line).
  Live checks: B_2 lands at (35.62, 15.56); |A| = 14.4, |N_2| = 8.95,
  |B| = 9 kN.

Live default also shows: green anchor vectors captioned **A** / **B** in
both diagrams; magnitude text "|A| = |N_5| = 12 kN / |N_2| = 8.94 kN /
|B| = |N_3| = 12 kN".

### Deviations found -> fixed (2026-08-06)

1. **"show dimensions" toggle missing** — added `dims` (default true,
   applet u_4).
2. **Scenario buttons missing** (the "secret options"): added a Scenario
   panel section with "symmetric state" / "asymmetric state" implementing
   the applet's own pole-preset construction (K_2 circle intersection;
   asymmetric keeps |P_1–pole| along the current ray, then projects onto the
   new parallel through i). Added the "show fractured rock" toggle (o_2)
   and the broken-rock wedge (traced from FracturedRock.jpg) drawn as a grey
   polygon on the right bank when fractured. Verified: asymmetric forces
   match the live applet (14.4 / 8.9 / 9.0 kN).
3. **Node 7 (resultant) missing from the node inspector** — added: free-body
   star at H₃ with R + A + B, force side = load line O₁–Q₁ + the offset
   green reaction sides (the drawn arrows), slider now 0–7.
4. **`scaleOffset` slider missing** (it is a visible slider in the applet):
   added "scale offset (green arrows)" (default 0.4) driving the offset of
   all beside-the-polygon green vectors (and the node-inspector reaction
   sides, which share the same geometry).
5. **A / B captions missing** on the anchor reactions: added in both
   diagrams, linked into the hover pairs.
6. F slider step 0.5 -> 0.2, scaleForceDiagram step 0.05 -> 0.25 (applet).

Judged intentional: our 16 paired steps vs the applet's 13 (same
construction content, forced form<->force pairing), trial retirement at the
final step ONLY (matches the applet: mode-1 step 12 keeps chord + pole line
+ relocated R, which our final state also keeps), pink-tension palette,
black node-inspector arrows (user's corrected spec supersedes the applet's
orange), live dimension labels, pipes default ON.

Intentionally omitted: `o_4` "show handles" (authoring aids),
`offsetResultant` (our R arrow is draggable along the line of action
instead), hidden `closingString`/`loadSymbol` internals (covered by the U₁
drag handle and the load-symbol slider).
