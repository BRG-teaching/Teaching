# view_36 "Single Panel Truss" — applet decode + audit

Source: view_36/applet_0/geogebra.xml (+ geogebra_macro.xml); construction
decode + step design live in views/view_36.js header and the 2026-08-05
redo brief. This file records the deep fidelity audit against the LIVE page.

## Audit vs live original (2026-08-06)

Live page driven headless via CDP + ggbApplet API; all booleans flipped,
mode 0/1 + step 0..8 swept, per-step visibility matrix + per-object live
colors and support-glyph point coordinates dumped.

### Toggle / slider table (live)

| control | default | effect |
|---|---|---|
| showConstraints | false | rails of A/B, apex circle K, load-handle arc → our `sc` "show constraints" ✓ |
| showPoints | false | reveals derived points O′, V, W ('c'), Z ('d'), b — our `n4` (default ON, platform: construction points always shown) |
| showHandles | false | frame helpers, never drawn ✓ |
| scaleForceDiagram 0.5..2, offsetForceDiagram 0..0.5 (visible only steps 3-6), F 1..10 (hidden slider), scaleInternalForces 0..0.2, scaleLoadSymbol (hidden, =1) | 1, 0.3, 4.5, 0, 1 | ✓ ported (F/sIF exposure is our enhancement) |
| mode 0/1 + step 0..8 | 0 | 1=F at C; 2=F on the load line; 3=F′ both sides (offset apparatus); 4=trial (o′, rays, strings from Q, lines of action h_4/j_4); 5=closing → i, parallel reactions A/B at supports + on the offset line; 6=members 1-2-3 + numbers both sides; 7=support symbols + H/V components; 8=final. Members BLACK in mode 1, blue/red only in mode 0. Trial NEVER visible in the mode-0 state. |

### Deviations found → fixed

1. **Pin (hinge) support glyph at A missing entirely.** The applet calls
   supportHingeHorizontalLeft(A, sLS·0.3): BLACK equilateral triangle
   (side s=0.3) with apex at A + th3 ground line (±s) + 8 th1 hatch ticks
   dropping 0.35·s below, pale fill. Added (intro 11, with A_V/A_H).
2. **Roller glyph at B wrong**: was GREEN and ~2× too large with 5 ticks.
   The applet's supportRollerHorizontal(B, sLS·0.3) = BLACK circle of
   diameter √3/2·s (0.26) tangent to B and to the ground line + same
   ground/hatching as the pin. Rebuilt to macro geometry (black, pale
   fill, 8 ticks).
3. **Form-side reaction components misplaced**: ours radiated from the
   nodes (A_V/B_V up from the support, A_H sign-accurate from A). The
   applet draws SCHEMATIC support arrows outside the structure (verified
   live coordinates): A_V/B_V vertical, length 1.0, tip 0.47 below the
   support; A_H horizontal, length 1.0, tip 0.21 left of A pointing RIGHT
   (fixed direction; the force diagram carries the true sense). Matched,
   and added the missing form-side A_V/A_H labels.
4. **Load's line of action through C persisted to the final state** — the
   applet never draws it at all (only A/B's lines during steps 4-6). Now
   retires with the trial (outro 8).
5. **Lines of action through A/B (h_4/j_4) + offset connectors
   (r_5/s_5/a_6)** are BLACK dotted in the applet — were grey. Fixed.

### Checked, judged intentional (kept)

- Blue #2563eb / pink #ce4095 members (applet #0000DA/#DA0000) — palette.
- 13 paired steps instead of the applet's 8 (one construction move per
  step, form↔force pairing); trial staged grey (applet grey ✓) and
  retired at our step 8 (applet: gone at 6) — same effect.
- Division point i + label kept visible at resolve (applet's mode-0 state
  hides it; its mode-1 end state from step 5 on shows it).
- 'show points' default ON; F/scaleInternalForces sliders exposed; node
  inspector (this applet has no mode 2).

Verification: all 13 steps re-screenshot after the fix; final state matches
the live mode-0 drawing (support glyphs, schematic reactions, no stray
action line); steps 10/11 introduce roller+B_V and pin+A_V/A_H like the
applet's step 7.
