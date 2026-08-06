# View 2 — Pedestrian Bridge 1: decode & audit notes

Source of truth: `view_2/applet_0/geogebra.xml` + the live applet at
https://block.arch.ethz.ch/eq/drawing/view/2 (driven headless via the
ggbApplet JS API).

## Audit vs live original (2026-08-06)

Method: full live object dump (234 objects, 52 visible), every boolean and
the `mode`/`step`/`node` sliders exercised with visibility diffs and
screenshots, both scenario buttons replayed (their JS scripts extracted from
the XML), page sidebar dumped, embedded site images measured and mapped to
world coordinates through their startPoint anchors L_3/M_3.

### Toggles / sliders / modes found in the applet

| object | UI caption | default | effect (verified live) |
|---|---|---|---|
| `o_2` (boolean) | "show fractured rock" | false | swaps the site image: Bild2 = VorlageRhino.png (intact) <-> Bild4 = VorlageFracturdRock.png (right bank with two dark hatched fracture wedges). Image swap only — does NOT move the anchors |
| `e_3` (boolean) | "show dimensions" | true | grey dimension figure below the deck: two "6 m" segments split under the load point + one "12 m" segment, with grey end points S_3..W_3 |
| `n_3` (boolean) | "show handles" | false | authoring handles (J_3/K_3/Q_3/R_3/frameBL/A_4 + dashed guides + the scaleLoadSymbol slider) that position the dimension rows / image anchor — no construction meaning |
| `mode` (slider 0–2) | "mode = 0" | 0 | 0 = finished drawing; 1 = staged construction (shows the `step` slider); 2 = node equilibrium (grey base drawing + orange N-vectors, shows the `node` slider) |
| `step` (slider 0–6, mode 1) | | 0 | applet staging: 1 load only, 2 orange load-line guide b_1, 3 orange parallels (with tick marks) + B_1, >=4 green reactions, >=5 member force segments + numbers. Current-step elements orange (1, 0.5, 0) |
| `node` (slider 0–1, mode 2) | | 0 | node 1 = cable node C_3: orange N_1/N_2/N_3 star at the node + tip-to-tail on the force triangle |
| `F_{1}` (slider 5–20, step 0.2) | forces | 12 | |
| `scaleForceDiagram` (0.2–2, 0.1) | scales | 0.7 | |
| `scaleLoadSymbol` (1–4, 0.1; UI gated by n_3) | | 3 | |
| `scaleInternalForces` (0–0.05, 0.01; visible mode 0) | scales | 0 | |
| `scaleOffset` (0.001–1, hidden) | | 0.3 | offset of the green vectors beside the triangle; the page's stepslider() JS zeroes it during steps 1–4 |

### Scenario buttons (XML javascript scripts)

- **"Original System"**: F=12; V -> F_3 = (4.739, 17.710); W -> G_3 =
  (21.261, 17.830); o_2 = false.
- **"Fractured Rock"**: F=12; V -> H_3 = (4.008, 22.139); W -> I_3 =
  (20.982, 11.681); o_2 = true. The right-bank face has broken (two wedges,
  world approx x 20.9..22.8 x y 21.4..25.4 and x 20.7..23.6 x y 13.8..18.1),
  so the right anchor drops to just above the deck and the left anchor climbs.
  Live force check: A = N_2 = 19.9 kN, B = N_3 = 14.06 kN.

Also in the live default: the green anchor vectors carry captions **A** and
**B** (form and force diagram) and the magnitude text reads
"A = N_2 = |12| kN / B = N_3 = |12| kN".

### Deviations found -> fixed (2026-08-06)

1. **"show dimensions" toggle missing** — dimensions were always on. Added
   `dims` toggle (default true, applet e_3) gating both dimension rows.
2. **"Fractured Rock" / "Original System" scenario missing** (the user's
   "secret options"): added a Scenario panel section with both presets
   (anchor coordinates above, F back to 12) and a "show fractured rock"
   toggle (applet o_2, image-swap only); the fractured state draws the two
   broken-rock wedges (traced from VorlageFracturdRock.png into world
   coordinates) as grey filled polygons with outlines on the right bank.
   Verified: fractured forces match the live applet (19.9 / 14.1 kN).
3. **A / B captions missing** on the green anchor-force vectors: added in
   both diagrams (linked into the hover pairs) and the readout now says
   "A = N₂ = ... kN / B = N₃ = ... kN" like the applet's Text2.
4. F slider step 0.5 -> 0.2 and scaleForceDiagram step 0.05 -> 0.1 (applet
   values).

Judged intentional: paired staged steps (richer than the applet's 6),
pink-tension palette, node inspector with 4 selectable nodes (applet mode 2
has only C_3), live dimension labels (the applet's "6 m"/"12 m" captions are
static strings even when the load point is dragged), internal-force pipes
default ON, letter labels on points.

Intentionally omitted: `n_3` "show handles" (authoring aids), hidden
`scaleOffset` slider (fixed 0.85 offset looks right at all scales).
