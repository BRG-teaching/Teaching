# view_12 — Complex Prestress — applet decode

Source: view_12/applet_0/geogebra.xml (+ geogebra_macro.xml, geogebra_javascript.js),
title from page.html: **Complex Prestress**.
Site image `48111a21bf4cd6ff4144868d17e2f297/Vorlage.png`: a lens-shaped fully
prestressed cable system — an upper cable sagging down and a lower cable arching
up between four hatched anchor blocks, linked by six vertical ties, all red
(tension), green reaction arrows at the four anchors. Reproduce the anchors as
vector hachure blocks; never ship the bitmap.

## Sliders / state (defaults)

| name | default | range | meaning |
|---|---|---|---|
| scaleForceDiagram (sFD) | 0.7 | 0.5–2 | units/kN |
| F_1 | 6.6 | 1–10 | the equal vertical force in every tie |
| PointLoad | 0 | 0–6 (step 1) | which tie carries the extra point load Q (0 = none) |
| Q | 8 | −8–8 | extra point load magnitude |
| loadSymbol (sLS) | 7 | 5–10 | arrow symbol length |
| F_PrestressUpperChord | 42 | 10–50 | pole distance of the upper chord = its prestress |
| F_PrestressLowerChord | 42 | 10–50 | pole distance of the lower chord = its prestress |
| scaleInternalForces | 0 | 0–0.05 | pipe width |
| o (checkbox 'Hilfskonstruktion') | false | | show trial construction |
| o_3 (checkbox) | false | | hide reaction forces in force diagram |
| o_4 'show handles' | false | | (frame helper, never drawn) |
| mode | 0 | 0–1 | 1 = node/step mode |
| step | 0 | 0–3 | mode-1 stages: 1 = upper subsystem, 2 = lower subsystem, 3 = ties orange |

## Fixed geometry

- Anchors (fixed grey points): C = (8.81, 64.87) top-left, E = (80.08781803483242,
  64.86863895929665) top-right, D = (8.806810089256569, 38.19477340672393)
  bottom-left, F_4 = (80.08781803483242, 38.19477340672393) bottom-right.
- Six vertical lines of action a…f through hidden points G…L at
  x = [21.766993352088544, 30.80898167499457, 39.8509699979006,
  48.89295832080663, 58.085646449094426, 67.12763477200045].
- Visible guide segments m_3…s_3 span y ∈ [9.290550734501071, 82.37995634465788]
  (thin dotted in the applet → our grey dashed guides); b_4 = the same guide at
  the load line x; t_3/a_4 (through the anchors) are show=false.
- Frame (euclidianView): x ∈ [1.365, 167.17], y ∈ [8.25, 91.16]. Export frame
  polyline s_6 (frameBL…frameTR): NEVER drawn.
- Titles: "Form Diagram" at (3.31, 88.65), "Force Diagram" at (103.45, 88.67).

## Load line (force diagram)

M = (127.98550722392798, 68.23927700051057) free point (top). Chain downward,
each gap = F_1·sFD, plus Q·sFD in gap k when PointLoad = k:

- N = M − (0, F1·sFD + [PointLoad=6]·Q·sFD), then O (5), P (4), R (3), S (2), T (1).
- Bottom-up naming L[0..6] = T,S,R,P,O,N,M. Edge k (tie k's force) = L[k]→L[k−1]:
  F₁ = S→T … F₆ = M→N (all downward, green arrows ON the line).
- g = Line(M,T) = the vertical load line.

## Trial construction (checkbox o, hidden by default → our steps retire it)

- U = Point on h (vertical through C), default (8.81, 16.67484119820763) — draggable.
- V = trial pole o′, default (92.20408238752648, 58.418687288956995) — draggable.
- Rays j,k,l,m,n,p,q = segments T–V, S–V, R–V, P–V, O–V, N–V, M–V (black th2 in
  applet → our grey thin trial rays).
- Trial funicular from U: ∥(T−V) → W on a; ∥(S−V) → Z on b; ∥(R−V) → A_1 on c;
  ∥(P−V) → B_1 on d; ∥(O−V) → C_1 on e; ∥(N−V) → D_1 on f; ∥(M−V) → E_1 on i_7
  (vertical through E).
- e_1 = Segment(U, E_1) dashed = trial closing; f_1 = Segment(C, E) dashed = the
  chord; g_1 = Line(V ∥ e_1) cuts the load line g at **F_1 = the division point**
  (our label: i) = (127.985507, 54.389665).
- h_1 = Line(F_1 ∥ f_1) = the pole line: any pole on it gives a funicular through
  BOTH C and E (chord C–E is nearly horizontal).

## Prestress picks the poles

- k_1 = Circle(F_1, F_up·sFD); **G_1 = Intersect(k_1, h_1, 1)** = pole o₁ on the
  LEFT of the load line: G_1 = i − (F_up·sFD)·u, u = unit(E−C).
  Baked: (98.58550722928777, 54.39022654809713).
- f_2 = Circle(F_1, F_lo·sFD); **N_1 = Intersect(f_2, h_1, 2)** = pole o₂ on the
  RIGHT: N_1 = i + (F_lo·sFD)·u. Baked: (157.38550721856828, 54.38910376971321).
  Opposite side of the load line ⇒ opposite curvature of the funicular.
- i_3 = Segment(F_1, G_1), j_3 = Segment(F_1, N_1): dashed (type 10), black,
  PERSIST (no o-condition).

## The two chords

- Upper (through C…E): rays i_1…q_1 = T–G_1, S–G_1, R–G_1, P–G_1, O–G_1, N–G_1,
  M–G_1 (th2, dynamic color W1); funicular from C ∥(T→G_1) → H_1 on a, then
  ∥(S→G_1) → I_1, ∥(R→G_1) → J_1, ∥(P→G_1) → K_1, ∥(O→G_1) → L_1, ∥(N→G_1) → M_1,
  and M_1→E is automatically ∥(M→G_1). Polyline e_2 = C H_1 I_1 J_1 K_1 L_1 M_1 E.
  Baked H_1..M_1 y: 58.756878, 55.911742, 54.487491, 54.484123, 55.925265, 58.763665.
- Lower (through D…F_4): rays g_2…m_2 = T–N_1 … M–N_1 (ray l_2 = N–N_1 has
  show=false in the applet but exists); funicular from D ∥(T→N_1) → O_1 … → T_1,
  T_1→F_4 ∥(M→N_1). Polyline b_3. Baked O_1..T_1 y: 44.308906, 47.153696,
  48.577602, 48.580624, 47.139132, 44.300386.
- Ties c_3…h_3 = H_1–O_1 … M_1–T_1, thickness 3 (thicker than chords th2),
  dynamic colors W8…W13; orange (1,0.5,0) branch only when step≟3 (mode-2
  highlight — ignore; true color is the W-branch).
- Load-line edges c_4…h_4 (M–N … S–T) th3 with the ties' colors W13…W8 — in our
  port they are the green load arrows (loads stay green).

## internalForce macro & colors

macro internalForce(A, B, C, D, sFD, sIF) → polygon (A,B ± offset) + angle
**α = Angle(Line[A,B], Line[C,D]) = ggbAngle(B−A, D−C)**; color = (α−π, 0, α);
isCompression(α) ⇒ blue else red(pink). Calls:

- upper members k=1..7: (node_{k−1}, node_k, G_1, L[k−1]) → dir L[k−1]−o₁ → W1..W7
- ties k=1..6: (upperNode_k, lowerNode_k, L[7−k], L[6−k])? — actual: Vieleck8 =
  (H_1, O_1, M, N) … Vieleck13 = (M_1, T_1, S, T): tie k ↔ edge L[7−k]→L[6−k]
  (downward). NOTE the macro FORCE arg for tie k is edge 7−k, but magnitudes are
  equal (F1·sFD) unless PointLoad picks a gap — for the pipes we use tie k ↔ edge
  k (physically correct: tie k's force = its own gap S–T etc.); with PointLoad
  the applet's pairing (H_1,O_1)↔(M,N) is geometrically the SAME magnitude only
  when PointLoad=0. Physical check: gap k lies between rays L[k−1] and L[k],
  which are the two chord members meeting at tie k on BOTH chords ⇒ tie k's
  force = edge L[k]→L[k−1]. We use that (the applet's cross pairing is a
  simplification that only matches for equal loads).
- lower members k=1..7: (node_{k−1}, node_k, L[k−1], N_1) → dir o₂−L[k−1] → W14..W20.

With defaults ALL members (chords + ties) resolve red/pink = tension — the point
of the drawing: prestress puts the whole lens in tension.

## Reactions (green th5)

- Form: u = Vector(C, Q_2) 'A' where Q_2 = Circle(C, sLS) ∩ Line(C ∥ member1),
  2nd intersection = beyond C away from H_1 (i.e. C + sLS·unit(C−H_1)).
  v = Vector(E, T_2) 'B' = E + sLS·unit(E−M_1); w = Vector(D, R_2) 'C' =
  D + sLS·unit(D−O_1); u_1 = Vector(F_4, S_2) 'D' = F_4 + sLS·unit(F_4−T_1).
- Force diagram (hidden when o_3): v_1 = Vector(T, G_1) 'A', w_1 = Vector(G_1, M)
  'B' (upper polygon closes T→o₁→M); u_2 = Vector(M, N_1) 'D', v_2 =
  Vector(N_1, T) 'C' (lower closes M→o₂→T). They lie ON member rays 1/7/8/14.

## Extra point load Q

w_2 = Vector(W_2, V_2) 'Q': downward green arrow of length sLS ending at
y = 68.28120071461679, x = gx[PointLoad−1] (the applet's JS moves V_2); shown
when PointLoad ≥ 1. The chosen gap k widens by Q·sFD, both chords re-form.

## Dimensions (persist)

R_3 = (127.985507, 36.31222655677313) on-path point on the load-line guide
(draggable height). U_3 = (x(G_1), y(R_3)), V_3 = (x(N_1), y(R_3)).
c_7 = U_3–R_3 grey, caption **P_upper**; d_7/g_7 = R_3–V_3 grey, caption
**P_lower**; e_7 = U_3–G_1, f_7 = V_3–N_1 black dotted droppers. Rendered as
dimension lines with end ticks + live "P_up = 42.0 kN" labels.

## Regression

tools/../scratchpad regression re-derives U,V→trial (W,Z,A_1,B_1,C_1,D_1,E_1),
i, G_1, N_1, both funiculars and compares against the baked homogeneous coords
(divide by z) — see check12.py. Result: **max |Δ| = 3.9e-9** over all 21 chained
points (report in commit message).

## Step design (paired form ↔ force, one move per step)

0. intro card
1. site: four hatched anchors C,E / D,F₄ (instant background)
2. left: six vertical lines of action (grey dashed) — right: the six equal
   forces F₁…F₆ stacked down the load line M→T (green arrows ON the line) +
   load-line guide; Q arrow if PointLoad ≥ 1
3. right: trial pole o′ + its 7 grey rays to T…M
4.–10. left: trial string k ∥ ray k from U across the six lines of action to E's
   vertical (grey; ray k re-flashes) — one string per step
11. left: dashed trial closing U–E₁ — right: parallel through o′ cuts the load
    line at the division point i
12. left: dashed chord C–E — right: pole line through i ∥ chord (any pole on it
    passes through C and E)
13. right: prestress P_up fixes pole o₁ at distance P_up·sFD LEFT of the load
    line (dashed i–o₁ + dimension P_upper)
14.–20. member k (upper, k=1..7): right: ray o₁–L[k−1] — left: from C parallel,
    node by node to E; numbers k both sides
21. reactions A, B: left: green arrows at C, E — right: T→o₁ 'A', o₁→M 'B'
22. right: pole o₂ at P_lo·sFD RIGHT of the load line (dashed i–o₂ + P_lower) —
    opposite side ⇒ opposite curvature
23.–29. member k (lower, k=8..14): right: ray o₂–L[k−8] — left: from D parallel,
    node by node to F₄
30. reactions C, D: left: green arrows at D, F₄ — right: o₂→T 'C', M→o₂ 'D'
31. the six ties (left, thicker) — right: their forces ARE the load-line edges
    F₁…F₆ (re-flash + dual links)
32. resolve: trial retires (as the applet's unchecked Hilfskonstruktion), all
    members pink = tension, pipes + force readouts

Node inspector (16 nodes): A(C), 1·2 … 6·7 (upper), B(E), C(D), 8·9 … 13·14
(lower), D(F₄); interior nodes balance three forces (two chord members + tie),
upper node j: [[L[j],o₁],[o₁,L[j+1]],[L[j+1],L[j]]], lower node j:
[[L[j],L[j+1]],[L[j+1],o₂],[o₂,L[j]]], anchors: member force + reaction.

## Audit vs live original (2026-08-06)

Live page driven headless via CDP + ggbApplet API (getAllObjectNames /
setValue / getVisible / getColor per step); every boolean flipped, PointLoad
0..6 swept, mode/step swept, per-step visibility matrix dumped.

### Toggle / mode table (live)

| control | default | effect |
|---|---|---|
| o "Hilfskonstruktion" | false | trial pole o′ + rays + funicular from U + dashed closing e_1 + chord f_1 + pole line g_1, all BLACK in the applet (ours: grey per platform trial rule, staged as steps 3–12, retired at resolve — equivalent) |
| o_3 "hide reaction forces in force diagram" | false | hides v_1/w_1/u_2/v_2 (A/B/D/C on the closing rays) → our hideRF ✓ |
| o_4 "show handles" | false | frame helpers, never drawn ✓ |
| mode 0/1 + step 0..3 | 0 | **mode 1 = subsystem free bodies**: step 1 isolates the UPPER cable (lower chord+its points+P_lower+C/D reactions hidden, orange F₁..F₆ tie-force vectors of length loadSymbol pull DOWN at the chord nodes, and orange F-vectors span the load-line edges); step 2 isolates the LOWER cable (mirror, forces UP); step 3 = complete drawing with the ties + their load-line edges flashed ORANGE |
| PointLoad 0..6, Q −8..8 | 0, 8 | green 'Q' arrow + widened gap ✓ already ported |

### Deviations found → fixed

1. **Subsystem views missing** (the applet's whole mode-1 pedagogy). Added a
   "Subsystem" panel slider (0 complete / 1 upper / 2 lower / 3 ties):
   gates both cables' members/points/reactions/dimensions, replaces the ties
   with orange tie-force arrows (length = loadSymbol; down on the upper
   chord, up on the lower) on BOTH diagrams, ties+edges recolor orange at 3.
2. **Load-line edges** were green ARROWS with green labels; the applet draws
   them as th3 SEGMENTS in the ties' dynamic color (c_4..h_4 — tie forces
   are member forces, not external loads). Now tie-colored segments (resolve
   pink), F₁..F₆ labels colored to match (orange in subsystem views).
3. **Droppers e_7/f_7** (dimension line up to o₁/o₂) are BLACK dotted in the
   applet — were grey. Fixed.

### Checked, judged intentional (kept)

- Hatched anchor blocks: the live canvas draws NO anchors — but the applet
  embeds the (hidden, show=false) tracing template Vorlage.png which shows
  exactly these hatched wedges; our vectors reproduce that source drawing.
- Lines of action grey dashed (applet: black dotted th2) — platform-wide
  "guides are grey + dashed" contract.
- P_upper/P_lower dimension lines with end ticks + live kN values (applet:
  plain grey segments, X-cross endpoints, caption only). d_7's dotted style
  is covered by the solid g_7 on the same span in the applet itself.
- Member numbers 1..14 in both diagrams (applet numbers nothing) — platform.
- Trial construction staged grey as steps + retired at resolve (applet:
  hidden checkbox, black); U started at y=33 (applet's saved 16.7 puts the
  trial below the visible window).
- F labels on the load line (applet shows them only in mode 1).

Verification: all 33 steps re-screenshot; sub=1/2/3 screenshots match the
live mode-1 grid; PointLoad/Q, hideRF unchanged and correct.
