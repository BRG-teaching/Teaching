# Triage 2026-08-13 — final-state comparison vs live originals (block.arch.ethz.ch/eq/drawing/view/N)

## STATUS (end of session 2026-08-13)
FIXED + pushed: 24 (ground NaN + e_8 dim + label), 14 (Q label greys; default documented),
11 (etching at final), 18 (orange Q system), 32 (orange Q system), 10 (orange catenary system).
NOT defects after verification: 43 (live "q=20" is a hardcoded stale caption; slider q=16 = ours;
N-band-vs-M-band is a staging choice), 24's α (applet text subtracts 0.6° from the true 74.96°).
ALSO FIXED: 13 (per-case force apparatus now retires when the next case begins — verified vs the
live applet driven to step 9: only the o₃ fan remains; Q system orange; R resultant arrows retire
with the g apparatus; Q readout orange).
View 9 ray/member color: verified via live getColor() — the applet keeps members BLACK at the
resolved state (no red anywhere); our pink-resolve is the platform's deliberate final step
(canonical template) — KEPT, documented, not a defect.
View 15: applet retires its trial apparatus at steps 8-9 ((step≥3)∧(step<8): W_8, Z_8, i_14, l_4)
— ours keeps grey trial to the end; needs the element mapping before fixing (queued).
REMAINING: 15 (above), minors 2 (hatch density), 3 (R visibility/F labels), 19 (band color) —
then per-step sequential audits of the whole catalogue (triage compared final states only),
then tasks #3 (views 35/39/40/41/53/54), #4 (ghosts), #5 (GIFs).

Method: our viewer at last step (port 8741) vs live applet default state (= applet step 0 = final).
47 delivered views, all captured + reviewed. Composites in audit2/pairs/.

## Systematic finding: ORANGE live-load (Q) subsystem

The ETH originals draw the live-load/second-system apparatus in ORANGE — Q arrow, the Q segment
on the load line, the with-Q funicular/catenary — in views **10, 13, 18, 32**. We recolor those
green/blue/pink per our global palette; the originals use orange to *distinguish the second load
system from the dead-load system*, which is pedagogical information. Deep-audit these four and
adopt the live orange for the Q-subsystem elements.

## Flagged views (severity order)

| view | finding |
|------|---------|
| 43 | **Default data mismatch**: ours q = 16 kN/m, live default q = 20 kN/m (Av=Bv 64 vs 80 kN). Also live default shows the N-diagram band (switchN=0); our final step ends on the M band. |
| 24 | **Missing site drawing**: live shows the terraced ground profile (stepped grey polyline) under the roof — ours has none. α default differs: ours 75.0°, live 74.4° (check anchor default). Also live "0m ×" marker missing, and our α caption glyph renders as "␣= 75.0°" (broken lead glyph). |
| 13 | **Final-state clutter/staging**: live's resolved state hides the trial fans (o₁/o₂ grey fans), q₁/q₂ apparatus; ours keeps them all visible at 28/28. Q arrow + q bands live = ORANGE, ours green/orange mix. Verify each element's applet retirement step and outro accordingly. |
| 14 | **Default mismatch**: ours F_Q = 3 kN (green Q drawn, N₁ = 3); live default Q greyed (0 or inactive) and tie member 1 drawn red-DASHED lower part. Check live init + Q-arrow grey styling. |
| 11 | **Background lost**: live keeps the Golden-Gate line-drawing etching visible at final; our final step doesn't show assets/golden_gate_lines.png (only steps 0-1?). Make it persist (instant/background). |
| 32 | Q-system: live arch-under-Q is ORANGE + orange Q strip on load line at positionQ = 4; ours draws it blue with green Q, position looks different. Verify live init (factorQ=1.5, positionQ=4) + colors. |
| 18 | Q-system: live funicular = ORANGE + orange Q + orange Rg+Q segment; ours blue/green. |
| 10 | Catenary system: live draws catenary + R₁..R₈ + rays + A'/B' entirely ORANGE; ours pink/green. |
| 15 | Minor: ours keeps grey trial rays/T₁ at final; live's final shows none. Ray color ours black vs live grey. |
| 3 | Minor: verify R dashed visibility at final + F₁/F₂ on-canvas labels vs live. |
| 9 | Minor: force-diagram ray color (live grey at final, ours pink) — check applet's resolved color. |
| 2 | Minor: rock-face hatching lighter/sparser than live's full-field hatch. |
| 19 | Minor: live band/funicular through main field looks green; ours pink — verify. |

## Verified-good at final state

1, 4, 5, 6, 7, 8, 12, 16, 17, 20, 21, 22, 23, 25, 26, 27, 28, 29, 31, 33, 34, 36, 37, 38,
42, 44, 45, 46, 47, 48, 49, 50, 51, 52.
(28's F₄/F₅/F₆ values and 29's A/B caps are documented intentional corrections of stale applet texts.)

## Caveat

This pass compares FINAL states only. The user's complaint includes *sequential* correctness —
per-step order, captions, what draws together. That requires driving each live applet's step
slider (deep audit, task #2); do it per-view when fixing, and spot-check the "verified-good"
list too (start with views whose originals have step sliders).
