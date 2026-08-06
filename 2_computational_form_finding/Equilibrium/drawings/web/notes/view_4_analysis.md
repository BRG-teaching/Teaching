# View 4 — Resultant of Non-concurrent Forces

## Audit vs live original (2026-08-06)

Live page: https://block.arch.ethz.ch/eq/drawing/view/4 (driven headless via CDP +
ggbApplet API; cross-checked against `view_4/applet_0/geogebra.xml`). 418 objects.
The live page HAS a description text (most views' description boxes are empty):
it frames the construction as decomposing each force into two components through
the pole; opposite components neutralize, only the first and last survive, and
their resultant is R (magnitude/direction in the force diagram at steps 1–7,
line of action located at step 15).

### Toggle / mode / slider table (from XML + live setValue probing)

| control | applet name | default | what it shows |
|---|---|---|---|
| mode slider [0,1] | `mode` | 0 | 0 = finished drawing, 1 = step slider (0–15) |
| step slider [0,15] | `step` | 0 | construction steps; 1–6 forces, 7 R magnitude, 8 pole+rays, 9–14 strings, 15 close+locate R |
| F1..F6 [1,7] ×0.1 | `F_1..F_6` | 4, 5, 4.5, 4, 7, 7 | force magnitudes |
| scaleForceDiagram [1,5] | | 2.5 | units/kN |
| scaleLoadSymbol [1,10] | | 7 | symbol length (slider hidden, `vis=false`) |
| checkbox | `c` "show actual loads form diagram" | false | during steps 1–7: each load drawn TO SCALE (F·sFD) on its line of action from the handle point; grey once past, orange while current; at the exact step, thin orange DASHED correspondence lines join its tail/head to the matching force-polygon edge's tail/head |
| checkbox | `showVectorsForce` | false | steps 9–15: per string node, the force-polygon triangle as arrows — edge vector (th5) at its step; component Pᵢ→o′ and o′→Pᵢ₊₁ (th2) tip-to-tail via the pole; the "away" component lingers one extra step so the next node's opposite component visibly neutralizes it; the FIRST component H₁→o′ persists to the end (it survives into R) |
| checkbox | `showVectorsForm` | false | steps 9–15: at each funicular node, unit×sLS arrows along the two component directions (toward-pole dir at its step; away dir lingers one step; the first one persists) |
| checkbox | `o_3` "Parallelzeichen" | false | steps 1–6: orange th3 parallel marks — a 0.7·sLS stroke along the line of action at the load AND a 0.7·|edge| stroke along the matching polygon edge, only at the exact step |
| checkbox | `showConstraints` | false | grey DASHED circle-arcs over each direction handle (the arc the handle rides on), radius sLS, spans ≈55–72° (baked endpoints) |
| checkbox | `o_5` "Numbering auxiliary construction" | TRUE | the grey 1..7 numbers on rays and strings (both diagrams) |
| checkbox | `o_6` "show points" | false | lowercase grey letters b,c,d,e,f,g on force-polygon vertices I₁..N₁ (H₁ = implicit "a", unlabeled) |
| checkbox | `showHandles` | false | white drag-handle points |

### Styles confirmed (live + XML)

- Lines of action: grey 160 th2 DOTTED, present from step 0 (never step-gated).
- Load symbols + polygon edges: GREEN th5 vectors, captioned **F₁..F₆ on BOTH
  sides** (not plain 1..6).
- Rays: grey th2 solid, all 7 at applet step 8; strings grey th2 solid one per
  step; closing pieces G₂–T₂ / T₂–S₂ grey DASHED, only at the final step;
  forward extension S₂–P₆ grey solid.
- R (force diagram) = green DASHED th7 vector H₁→N₁, appears at applet step 7
  (before the pole); R (form) = green dashed th7 at draggable W₂ on the located
  line of action (grey dotted th3, clipped like the other lines of action), at
  step 15. Both labeled 'R'.
- Pole labeled o′ (Text10). Numbers 1..7 grey (Text3 is white in the applet — an
  authoring bug; ours stays grey).
- Default orange th1 dashed per-step helpers (string direction previews across
  each node, i_4/r_4/t_4/m_4/m_7/h_5/j_4) are transient current-step apparatus.

### Deviations found → fixed

1. All seven hidden toggles missing → added panel "Show / hide" section:
   show actual loads (c), show vectors in force diagram, show vectors in form
   diagram, parallel marks (o_3), show constraints, force letters b–g (o_6),
   numbering 1..7 (o_5, default ON), with applet defaults and behavior above.
2. Force labels were plain "1..6" → now F₁..F₆ green on both diagrams (the 1..7
   grey numbering stays for rays/strings, gated by the numbering toggle).
3. meta.about rewritten to carry the live page's actual pedagogical framing
   (component decomposition / neutralization).

### Judged intentional (kept, documented)

- Our step list splits/renames but preserves the applet order; R appears in BOTH
  diagrams at the final step (user mandate: form+force resultants simultaneous;
  the applet shows force-R alone at step 7).
- Transient orange per-step direction previews are covered by our pink flash +
  ghost preview (accumulate-only mandate).
- Node-equilibrium inspector: the applet has no mode 2; ours is the mandated
  platform feature (string-crossing pole triangles).
- Point letters A–F / H₁ / O₆ / T₂ labels: platform convention (the applet
  labels no points except o′); "show points" (n4) default true.
- showHandles not ported separately: our points ARE the drag handles.
