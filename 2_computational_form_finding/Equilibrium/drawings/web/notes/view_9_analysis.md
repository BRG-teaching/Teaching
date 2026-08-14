# View 9 — Parabola Construction (decode notes)

Source: `view_9/applet_0/geogebra.xml` (553 commands), `view_9/view_9_compas.py`,
page title "Parabola Construction". Original description (page.html): two modes —
**mode 1**: parabola by *tangents* (divide the two support tangents into equal
parts, connect corresponding points → enclosing/envelope curve); **mode 2**:
parabola by *secants* (midpoint rule: the point of the parabola on a vertical
lies midway between the secant and the tangent; repeat: quarters → eighths),
run as a graphic-statics construction with a force diagram (load line + pole
from the tangent directions). mode 0 = overview with an `overlay` checkbox
that superimposes the mode-2 funicular polygon on the mode-1 curve.
View window: x [1.6221, 49.0335], y [-4.7970, 18.9088].

## Fixed geometry

- Span verticals x = 6 (A wall, `m_7` dotted), x = 22 (B wall, `p_7`),
  centreline x = 14 (`n_7`, mode 2). Panel verticals x = 8..20 even (`t_7,
  a_8, b_8..e_8`, mode 2, thin dotted) and x = 7..21 odd (`f_8..m_8`,
  modes 1/0). All from y = 17.134 down to y = -4 (handles hidden).
- Load strip q: polygon A(6,14), T_7(6, 14-0.4·loadSymbol), P_2(22, ..),
  Q_6(22,14) — GREEN (0,0.6,0), fill alpha 0.1, caption 'q' on left edge.
  Vertical division ticks inside the strip: x = 8,12,16,20 (`t_9,d_10,h_10,
  l_10`, mode2 step 4-5 = quarter boundaries) and x = 7,9,..,21 odd (`r_9,
  a_10..m_10`, mode2 step≥6 = eighth boundaries).
- Dimensions (grey 160): `g_6` 'l' at y=16 (E_4–F_4 with endpoints);
  'l/2' `d_6`,`e_6` at y=15 (B_4–D_4–C_4) shown mode2 steps 0-3 & 8;
  'l/4' `p_6..s_6` at y=15 (I_4,L_4(10),M_4(14),N_4(18),O_4) steps 4-5;
  'l/8' `a_7..h_7` at y=15 (P_4..Z_4, every 2 units) steps 6-7;
  'h' `k_6` at x=24 from G_1-level (8.245) to C-level (3.819), always;
  '2 h' `n_6` at x=25 from G_1-level down to I_1-level (-0.607), step 2 only.
- Level guides: `q_7` horizontal at G_1 level, `r_7` at C level, grey dashed,
  x from 4 to 27.23, always visible.

## Free points / sliders (defaults)

- `C_1` = **A** on x=6, y = 6.385076843652982 (caption 'A', label hidden)
- `D_1` = **B** on x=22, y = 10.105044545497387 (caption 'B', hidden)
- `F_12` = **C** (apex) on x=14, y = 3.8191200547889235 (text "ap1" shown)
- `Q_2` = load-line top 'a', (35.4316916417497, 14.777232728911315)
- `O_2` = R-arrow row anchor (6, 12.561464648639733) (hidden handle)
- `Q` = z-annotation row anchor (14, -1.8456127376472864)
- `N_11` = y-annotation column anchor x = 20.813477661928086
- sliders: loadSymbol 1.3 [1,5]; scaleForceDiagram 0.5 [0.2,0.6];
  F_1 30 [10,30]; Offset 1.3 [1,10]; scaleInternalForces 0.09 [0,1];
  step [0,8]; mode [0,2]; booleans showPoints, hideRF, overlay,
  showHandles, showResultantLabels (unused).

## Construction chain (live math)

- G_1 ('ap2') = chord A–B ∩ centreline = (14, (ay+by)/2)
- I_1 ('ap3') = mirror of G_1 about C = (14, 2·cy − (ay+by)/2)  → "2h below"
- tangent tA = A→I_1, tangent tB = I_1→B (grey dashed `n_8`, `c_9`,
  shown 2 ≤ step ≤ 7, orange-flash step 2); tangent at C `s_7` ∥ chord
  (grey dashed, mode2 steps 4-7); chord `p_1` dashed (type 15), step ≠ 1.
- Force diagram: R = F_1·sFD; D_3 = Q_2 − (0,R). Eighth cuts S_2 (R/16),
  T_2..B_3 (step R/8), D_3; quarter cuts T_6 (R/8), Z_6 (3R/8), A_7 (5R/8),
  C_7 (7R/8); F_3 = midpoint (chord-parallel ray through pole hits it).
- Pole o = `E_3` = line(Q_2 ∥ tA) ∩ line(D_3 ∥ tB). Text "  o" at E_3.
  Outer rays `b_4` = Q_2–E_3, `l_4` = D_3–E_3 (BLACK, thick 2, step ≠ 1);
  mid ray `n_3` = F_3–E_3 dashed (∥ chord), from step 2; thin duplicate
  `f_13` (mode≠2 ≥6). Eighth rays `d_4..k_4` = S_2..B_3 → E_3 (thin 1,
  grey 0.6, mode2 step 0 ∨ ≥7, flash 7); quarter rays `p_10..s_10` =
  T_6,Z_6,A_7,C_7 → E_3 (mode2 step 5 ONLY, flash).
- Reactions (green thick 5): `q_4` = Vector(E_3→Q_2) caption 'A',
  `p_4` = Vector(D_3→E_3) caption 'B' (step ≠ 1, flash 2); form side
  `t_4` = C_1 → C_1 + loadSymbol·unit(C_1−I_1) 'A', `u_5` = D_1 + loadSymbol
  ·unit(D_1−I_1) 'B' (If W1≟0 orientation — outward along the tangents).
- Midpoint rule (mode 2): quarter x=10: E_1 = secant A–C ∩, M_1 = tA ∩,
  Q_1 = midpoint; x=18: P_1 = secant C–B ∩, O_1(=P_3) = tB ∩, R_1 = midpoint.
  Eighths x=8: S_1 = (A–Q_1)∩, T_1 = tA∩, U_1 = mid; x=12: V_1 = (Q_1–C)∩,
  W_1 = tangent-at-C ∩, Z_1 = mid; x=16: A_2 = (C–R_1)∩, B_2 = t_C∩, C_2 =
  mid; x=20: D_2 = (R_1–B)∩, E_2 = tB∩, F_2 = mid.
- Quarter strings `a_1,c_1,k_2,q_2` = A–Q_1–C–R_1–B (grey 0.6, steps 5-7,
  flash 5). Final funicular `f_1` = PolyLine(A, U_1, Q_1, Z_1, C, C_2, R_1,
  F_2, B) (mode2 step≥7 ∨ 0; also mode0+overlay; flash orange at 7).
- Node resultants (form, green thick 5, length loadSymbol, hang at O_2's
  level): x=6 `q_9`, 10 `u_7`, 14 `v_8` (from step 1!), 18 `w_9`, 22 `p_9`
  (mode2 step≥4, v_8 ≥1) + x=8 `a_4`, 12 `w_7`, 16 `u_9`, 20 `m_9` (≥6).
  'R' texts above each. Load-line vectors: total `u` = Q_2→D_3 (steps 1-3,
  'R' text28); quarter `v,w,u_1,v_1,w_1` (steps 4-5, R texts29-33); eighth
  `v_2,w_2,u_3,v_3,w_3,u_4,v_4,w_4,n_4` (step≥6, R texts34-42).
  Modes 1/0 use eighth vectors `v_5..w_6` from step 1 and form arrows
  `q_3,l_5,v_7,u_8,w_8,v_9,b_9,n_9` at odd x (all step≥1).
- Annotations at quarter step (mode2 step 4 ONLY): 'z' `k_13`,`l_13` =
  horizontal equal spans (14→18→22) at Q's level; 'y' `q_13`,`r_13` =
  vertical ticks at x = N_11.x between the levels of O_1 (tangent), R_1
  (parabola), P_1 (secant) — proves R_1 is midway; grey connectors
  `s_13,t_13,a_14` from P_1/R_1/O_1 to the column.
- Mode 1 tangent division (steps 2-3): offset direction dA = −perp(unit(I_1
  −A)), dB = −perp(unit(B−I_1)); ORANGE (255,127,0) measuring lines
  `p_11` 'l_1' = [A+Off·dA → I_1+Off·dA], `n_11` 'l_2' = [I_1+Off·dB →
  B+Off·dB]; end ticks (grey dashed 160) from A, I_1 (both), B to 1.5·Off;
  division ticks `k_12..e_13` from each tangent eighth-point (x = 7..13 on
  tA, 15..21 on tB) to 1.5·Off; ORANGE division points `W_10..E_11` (tA),
  `F_11..L_11` (tB) at 1·Off; labels 'l_1/8','l_2/8' (step 3).
- Mode 1 envelope (steps 4-6): connect k-th eighth-point of tA to k-th of
  tB: `p_5` R_3(7)–V_3(15) [step 4], `q_5` L_3(8)–O_3(16) [5], `r_5,s_5,
  t_5,a_6,b_6` S_3–W_3, M_3–P_3, T_3–Z_3, N_3–Q_3, U_3–A_4 [6] — each is
  the TANGENT of the parabola at x = 8,10,12,14,16,18,20 (the funicular
  vertices). Grey dashed (s_5, b_6 thick 3, rest 2).
- Mode 1 enclosing polyline `b_5` (step≥7 ∨ 0, mode≠2) = A, C_3(7),
  K_3(9), N_6(11), O_6(13), P_6(15), R_6(17), S_6(19), A_4(21), B —
  consecutive envelope intersections (circumscribing polygon), BLACK.
- internalForce macro exists once (C_1,U_1,S_2,E_3) but its polygon is
  hidden; only its angle W1 (=0) is used to orient the reaction arrows.
  Applet shows NO pipes; our pipes (mandatory, on by default) use
  N_i = |E_3 − cut_i| / sFD per member.

## Applet step tables

mode 2: 0 all · 1 load q + total R (form: midspan R arrow v_8; force: load
line u, 'R') · 2 chord + I_1 + tangents + pole + outer rays + reactions +
'2h' · 3 secants A–C, C–B · 4 quarter midpoint rule + l/4 + load line
quartered + node R arrows + z/y annotations + tangent at C · 5 quarter rays
+ quarter strings · 6 eighth midpoint rule + l/8 + load line eighths + new
node arrows · 7 eight rays + funicular polygon · 8 cleanup (tangents,
secants, helpers, quarter strings, subdivision dims retire; l/2 returns).

mode 1: 1 load + 8 panel resultants + load line eighths · 2 tangents +
orange l_1/l_2 offsets · 3 divide into 8 (orange points, ticks, division
points on the tangents) · 4-6 envelope lines · 7 enclosing polyline ·
8 cleanup.

## Our step list (paired form ↔ force, one move per step)

0 intro · 1 given: walls, centreline, l, l/2, points A, B, C (draggable) ·
2 load: strip q + midspan R arrow — force: load-line guide + total R vector
· 3 closing string A–B, level guides, rise h · 4 mirror → I_1, '2h' ·
5 tangents at the supports — force: parallels through load-line ends → pole
o + outer rays · 6 reactions A, B (green, both diagrams) · 7 secants A–C,
C–B + tangent at C — force: mid ray o–F_3 ∥ closing string (dashed) ·
8 quarter points (midpoint rule, l/4, y=y and z annotations) — force: load
line quartered; form: node arrows R (x=6,10,14,18,22) · 9 quarter rays —
quarter strings A–Q_1–C–R_1–B (grey) · 10 eighth points (l/8) — force:
eighths; node arrows x=8,12,16,20; strip ticks · 11 eight rays — funicular
polygon (members 1..8 numbered both sides) · 12 divide the tangents into 8
(orange l_1, l_2) · 13 envelope: connect matching points (7 grey tangent
lines) · 14 enclosing polygon (thin, through envelope intersections) ·
15 resolve: helpers retire (as applet step 8), funicular = parabola, all
tension (pink), pipes on, N readouts; enclosing polygon stays thin grey
(mode-0 'overlay' precedent).

Deliberate deviations (documented): points labeled A/B/C (applet hides
those captions and shows only "ap1/ap2/ap3"); per-eighth force-side 'R'
labels kept small; '2h' dimension retires at step 7 (applet: step-2-only);
quarter 'y'/'z' annotations live steps 8-9 (applet: step 4 only); envelope
chapter appended after the funicular (applet keeps it in a separate mode);
the tangent-method chapter (rulers, envelope, enclosing polygon, odd
verticals) retires at the resolve exactly like the applet's mode-2 step 8
hides all mode-1 elements; internal-force pipes added (contract).

## Regression

`scratchpad/v9_regress.py` re-derives the whole chain from the defaults and
compares against every baked coordinate listed in view_9_compas.py
(103 points incl. pole, envelope, orange offsets, annotations).
Result: **max error 6.8e-7** (limited only by the 6-decimal rounding of the
baked dump). Funicular edges are parallel to their rays to 3e-16; all 8
members resolve tension via ggbAngle/isCompression (hanging cable);
N₁..N₈ = 16.8, 14.9, 13.8, 13.6, 14.5, 16.2, 18.5, 21.2 kN at defaults.

## Audit vs live original (2026-08-06)

Driven the live applet headless via the ggbApplet JS API: enumerated all
objects, flipped every boolean, swept mode 0/1/2 x step 0-8 with screenshots
(scratchpad/audit789/live9/).

### Toggle / mode table

| control | default | effect (live-verified) |
|---|---|---|
| `overlay` | false | mode 0 only: superimposes the eighth rays d_4..k_4 + the funicular polyline f_1 on the tangent-method curve |
| `showPoints` | false | the 9 load-line cut points S_2..D_3 |
| `hideRF` | false | NO effect in this applet (checkbox unused/unwired) |
| `showHandles` | false | O_2 (node-resultant row anchor) |
| `showHandles_1` | false | l_7/k_7 scaffold |
| `showResultantLabels` | false | no effect (unused) |
| `Offset` slider | 1.3 [1,10] | hidden slider moving the orange tangent rulers |
| `mode` 0/1/2, `step` 0-8 | 0 | mode 2 = secant/midpoint construction, mode 1 = tangent division, mode 0 = overview (curve only + overlay checkbox) |

### Deviations found → fixed

1. **Closing string (chord A-B) color** — the applet's p_1 is GREY 0.6 dashed
   (dash 15), not black. Fixed `chord` to grey.
2. **Dimension end ticks missing** — every live dimension row (l, l/2, l/4,
   l/8, h, 2 h, z) carries small X-shaped ticks at its division points; ours
   drew bare hairlines. Added xTicks strokes to all seven dimension rows with
   the same intro/outro staging as their lines.

### Checked, no change needed
- Green reactions A/B lie ON the outer rays exactly like the live applet
  (thick green over the thin black rays, meeting at o) — chain is naturally
  end-to-end: D₃→o→Q₂ with the load line; no offsets involved.
- `hideRF` exists in our panel and actually works; in the applet the checkbox
  is dead — keeping the working version (default false = same look).
- `overlay` needs no control: our merged sequence passes through exactly that
  state (step 14, funicular + tangent method superimposed).
- `showPoints` default-false hides the applet's load-line cut disks; our
  platform-wide "show points" (default true) is the documented superset.
- Offset slider, load strip q (green, 0.1 fill, left 'q'), level guides
  q_7/r_7 (grey 153 dash), 'R' labels left of the load line, node-R rows at
  O_2's level, orange rulers l₁/l₂ + division points, envelope, enclosing
  polygon, y/z annotation figures: all match the live rendering.
- The y-ticks appear ORANGE in the live applet only because they exist solely
  at their flash step (step 4); our grey staging over steps 8-9 is the
  platform's flash convention.


## Redesign 2026-08-14 — "understand, don't copy" (user feedback)

The user judged the parabola construction "really not clear ... instead of
copying fully". Diagnosis: the applet's *measuring apparatus* had been
ported verbatim, so three constructions accumulated on one canvas, all in
the same grey dashed weight, and the IDEA of each was invisible.

What the constructions actually are (now stated in the captions):
1. MIDPOINT RULE — on any vertical a parabola lies exactly MIDWAY between a
   secant and a tangent. (Check on y = x^2, chord x=0..2: at x=1 the chord
   gives 2, either end tangent gives 0, the curve 1.) Applied recursively:
   closing string A-B -> the support tangents meet 2h below the crossing,
   the apex sits at h; then chords A-C, C-B give the quarter points; then
   the eighths. The construction is self-similar — that is the point.
2. FUNICULAR — pole o from parallels to the support tangents through the
   ends of the load line; the rays hang the polygon through those points.
3. TANGENT METHOD — divide both support tangents into 8 equal parts and
   join the k-th mark of one to the k-th of the other; every such line is a
   tangent, and the parabola appears as their ENVELOPE.

Changes: the midpoint rule's segment is now drawn BLACK with disks marking
its secant end and tangent end and "secant"/"tangent" labels, so the
halving is visible rather than implied; the applet's z-dimension chain and
the redundant l/4 chain were deleted; the tangent method's auxiliary
parallel-ruler apparatus (orgA/orgB, tickA/tickB, pt_dA/pt_dB, endT) was
deleted entirely and replaced by tick marks + numbered division points on
the tangents themselves — dividing a segment into 8 equal parts is a
STATEMENT, not a drawing that needs its own scaffolding; and all of method
1's apparatus (secants, tangent at C, the verticals, the l/8 chain, the
quarter strings) now RETIRES at step 12 so the envelope method gets a clean
stage. Captions rewritten to teach the rule instead of narrating the moves.
