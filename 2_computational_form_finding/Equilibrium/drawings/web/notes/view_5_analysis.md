# View 5 — Funicular Line Through Two Points 1

## Audit vs live original (2026-08-06)

Live page: https://block.arch.ethz.ch/eq/drawing/view/5 (headless CDP +
ggbApplet probing; cross-checked against `view_5/applet_0/geogebra.xml`).
Live description box is EMPTY (only view 4's is filled).

### Toggle / mode / slider table

| control | applet name | default | notes |
|---|---|---|---|
| mode [0,2] | `mode` | 0 | 0 = finished drawing (+ scaleInternalForces slider, trial HIDDEN), 1 = step slider 0–11 (trial visible, funicular stays BLACK), 2 = node equilibrium (drawing greys out, node slider) |
| step [0,11] | `step` | 0 | 1 loads · 2 load line · 3 R on load line + E₃/G₃ guides · 4 trial pole o′+rays · 5 trial funicular + U + R located (form) · 6 trial chord + division point i · 7 chord E₃G₃ + pole line i–o′ (c₂ grey) · 8 pole o (e₂ = segment i–o, black dashed) · 9 funicular + rays + numbers + M₁ chords · 10 reactions · 11 end |
| F1..F3 [1,5] | | 2.6, 2, 2.6 | |
| scaleForceDiagram [4,6] | | 4.5 | |
| loadSymbol [1,10] | | 5 | hidden slider |
| scaleInternalForces [0,0.05] | | 0 | visible in mode 0 only |
| **offsetReactionForces [0,1] ×0.1** | | **0.6** | visible slider: perpendicular offset of the force-diagram reaction arrows A/B from the closing rays, with tiny black DOTTED th2 connector segments L→S₃, o→P₃, o→Q₃, I→T₃ tying ray ends to the offset arrow ends |
| checkbox | `hideRF` | false | hides the force-diagram reaction arrows A/B (and connectors) |
| checkbox | `showHandles` | false | drag handles |
| node [0,6] | `node` | 0 | mode 2: **1 = I, 2 = II, 3 = III, 4 = A (E₃), 5 = B (G₃), 6 = M₁** — orange in-place force stars (N-labels), rest of drawing grey; node 6 shows R vs the two chord forces A/B on the outer triangle L–o–I |

### Styles confirmed (live + XML)

- Loads green th5, captions F₁..F₃ BOTH sides; load-line R = green dashed th7
  'R' on I→L (applet: appears step 3; re-highlighted at 5); form R dashed green
  at draggable V on the resultant's line of action (grey dotted, step 5).
- Lines of action + E₃/G₃ guides + R guide: grey th2 DOTTED (type 20).
- Trial rays/strings grey th2 solid; trial chord H₃–S + pole line i–o′ grey
  th2 long-dash (type 15); chord E₃–G₃ and i–o black th2 long-dash. The pole
  line is the SEGMENT i–o (e₂) — not an extended line.
- Funicular + closing rays th2, BLACK in mode 1; red (tension) only in mode 0.
  Numbers 1..4 both sides (Text1–8), black. M₁ chords: H₁–M₁ black dashed,
  M₁–J₁ grey-128 dashed. Labels i, o, o′; nodes I, II, III (captions).
- Reactions (form): green th5, length = loadSymbol, at E₃/G₃ pointing outward
  along the end segments, captions A/B; (force): green th5 along the closing
  rays L→o and o→I, offset by offsetReactionForces away from the triangle.
- mode 0 hides the whole trial construction.

### Deviations found → fixed

1. `offsetReactionForces` slider missing → added (default 0.6) driving the
   aR1/aR4 offset, plus the four black dotted connector segments (hidden with
   hideRF, like the arrows).
2. Form reaction arrows were 0.8·sLS → now 1.0·sLS (= applet loadSymbol).
3. Node slider order was 1=E₃, 2–4=I..III, 5=G₃, 6=M₁ → reordered to the
   applet's 1–3 = I..III, 4 = A (E₃), 5 = B (G₃), 6 = M₁ (click map updated).
4. Pole line was drawn extended past both ends → now exactly the segment i–o.

### Judged intentional (kept, documented)

- Trial construction stays visible at the end (user mandate; matches mode 1,
  while the applet's mode 0 hides it).
- R drawn in BOTH diagrams in the same step (applet: force-side at 3, form-side
  at 5 — user mandate is simultaneity at the trial-locates-U step).
- Funicular resolves to pink/blue at our final step (applet mode 1 keeps black,
  mode 0 shows red; pink = tension is the project palette).
- Internal-force pipes on by default with visible scale (applet: slider 0–0.05
  default 0, mode 0 only) — platform mandate.
- Node inspector = enlarged black free-body star inset + in-place force-diagram
  sub-polygon (user's corrected spec), instead of the applet's orange in-place
  arrows; node ORDER now matches the applet.
