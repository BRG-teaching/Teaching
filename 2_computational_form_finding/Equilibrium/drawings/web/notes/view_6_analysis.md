# View 6 — Funicular Line Through Two Points 2

## Audit vs live original (2026-08-06)

Live page: https://block.arch.ethz.ch/eq/drawing/view/6 (headless CDP +
ggbApplet probing; cross-checked against `view_6/applet_0/geogebra.xml`).
Live description box is EMPTY.

### Toggle / mode / slider table

Same control set as view 5 (mode [0,2], step [0,11], F1..F3, scaleForceDiagram
[4,6] = 4.5, loadSymbol hidden = 5, scaleInternalForces [0,0.05] = 0,
offsetReactionForces [0,1] = 0.6, node [0,6], showHandles) with differences:

- `hideRF` exists but its checkbox is HIDDEN (`vis=false`, default false); in
  this applet it only gates the four dotted reaction connectors (h₆/i₆/m₆/n₆) —
  the offset arrows themselves are not gated (authoring quirk; the caption
  still reads "hide reaction forces in force diagram").
- Step map differs after 5: 6 = choose M₁ on R's line of action · 7 = chord
  E₃–G₃ (black long-dash) + ORANGE dashed chords M₁–E₃, M₁–G₃ (th2 type 10) ·
  8 = ORANGE dashed parallels L–o, I–o + pole o (chords stay through 8) ·
  9 = funicular + rays + numbers + M₁ check-chords (orange helpers retire) ·
  10 = reactions · 11 = end.
- node mapping (mode 2): 1 = I, 2 = II, 3 = III, 4 = A (E₃), 5 = B (G₃),
  6 = M₁ (R against the two chord forces A/B = outer triangle L–o–I).

Styles otherwise identical to view 5 (see view_5_analysis.md): dotted guides,
grey trial, black mode-1 funicular / red mode-0, green reactions offset by
offsetReactionForces with dotted connectors, form reactions = loadSymbol long,
captions F₁..F₃ and A/B on BOTH sides, R green dashed th7 both diagrams.

### Deviations found → fixed

1. `offsetReactionForces` slider missing → added (default 0.6) driving the
   aR1/aR4 offset + four black dotted connector segments.
2. `hideRF` missing entirely → added as a panel toggle (default false), hiding
   the force-diagram reactions, their A/B labels and the connectors (caption
   semantics, consistent with view 5).
3. Load captions F₁..F₃ missing on both diagrams → added (green, like view 5).
4. Reaction captions A/B missing on both diagrams → added (green; form at the
   support arrows, force beside the offset arrows, hidden with hideRF).
5. Form reaction arrows were 0.8·sLS → now 1.0·sLS.
6. Node slider order → applet order 1–3 = I..III, 4 = A, 5 = B, 6 = M₁.

### Judged intentional (kept, documented)

- Same items as view 5 (trial kept at end; simultaneous R; pink tension at the
  final step; default-on pipes; inset node star).
- Orange chords/parallels already matched the applet (appear with M₁ chords,
  retire when the funicular starts) — verified against live steps 7–9.
