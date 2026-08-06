# view_26 — Constant force gable truss — applet decode

Source: view_26/applet_0/geogebra.xml (8264 lines), title from page.html:
**Constant force gable truss**. Live original verified via ggbApplet API
(headless chrome, 565 objects): defaults exactly the XML set below; mode/step
flipped live and screenshotted at every state; every checkbox flipped. No
embedded images.

## The model

A gable (A-frame) roof truss: two straight rafters from the supports to the
apex, 9 equally spaced top-chord nodes (the two supports, the apex, and 3
intermediate nodes per rafter), each carrying an equal vertical load
F = 1.1839 kN (fixed: level difference of the admin lines L2s01 y=30.4048 −
L2s02 y=29.2209). The bottom chord is shaped, node by node, so that the force
in the rafters is **constant**: in the force diagram all top-chord force
segments run from the load line (x = 21) to one common **vertical line**
(x = P4s03.x, default 17.5, draggable 15.5…18.5 = x_a − 11·sFD … x_a − 5·sFD)
— parallel segments between two parallel-distance-constant lines ⇒ equal
length per rafter. The interior web is 7 vertical members: 6 compression
struts each carrying exactly F, and the **apex tie** (member 12) in tension
(5.0 kN at defaults), which collects the apex load plus the rafter kink.

- Support rails: x_A = 5.55722 (line e_2), x_B = 14.61080 (j_1), y draggable
  in [23.35470, 28.71724] (levels d_2/c_2 from free points M_1/L_1).
- Apex rail: x = (x_A + x_B)/2 = 10.08401 (midpoint chain P2dEF), same y range,
  default (10.08401, 28); supports default y = 26.
- Node x's: xs[k] = x_A + k(x_B − x_A)/8; top nodes on the straight lines
  A–apex and apex–B (P2aBC21 … P2aHI87 = Intersect(L2s07/L2s06, L2i**)).
- Action lines c,d,e,f,g,h,i,j,k: dotted th1 verticals, y ∈ [22.77169 (b),
  30.31357 (a)]; load arrows V2n* drawn from y = 29.77648 (L2s09) down to
  29.22088, green th5, captions F_1…F_9.
- Load line: P4aA = (21, 29.7) free, cap 'a'; loadToLoadLine chain
  P4aB…P4aJ, caps 'b'…'j', edge w = F·sFD = 0.59194 (green th5 vectors
  u,v,w,n,p,q,r,s,t ON the line, caps F_1…F_9).
- Reactions: equal, symmetric loads ⇒ A = B = 4.5F = 5.32743 kN. Division
  point P4aK cap 'i' = P4aJ + 4.5F·sFD (in the applet routed through the
  HIDDEN funicular polygon: division 'k' of the second load line, see below).
  Offset chain (offsetReactionForces = 0.4, range 0–0.5, visible slider):
  I_1 = a + off·x̂, J_1 = j + off·x̂, K_1 = J_1 + B; arrows u_2 = J_1→K_1 'B',
  v_1 = K_1→I_1 'A'; dotted connectors a_2 (a–I_1), b_2 (j–J_1), n_3 (i–K_1).
  Form arrows: l_1 = A at the left support, w_1 = B at the right (length
  loadSymbol = 0.7, green th5, pointing up at the node from below).
- Force-diagram web points: P4a1…P4a8 = (line through load-line point
  b,c,d,e / f,g,h,i parallel to top member 2,5,8,11 / 14,17,20,23) ∩ the
  constant-force vertical. Interior gaps = hanger forces: |1−2| = |2−3| =
  |3−4| = |5−6| = |6−7| = |7−8| = F exactly; the apex-tie force = gap 4–5 =
  5.0015 kN, drawn OFFSET LEFT by offsetReactionForces (S4j45 = O_2→Q_2 at
  x = xV − off, dotted connectors l_3 = 5–O_2, m_3 = 4–Q_2).
- Bottom chord (funicular walk): P2a12K…P2a78K = successive intersections of
  the line through the previous node parallel to S4jK_k (P4a_k→i) with the
  next action line; the last side closes exactly on support B (verified).
- Constant-force dimension (mode-1 steps 5–6 only): perpendiculars p_3/q_3 to
  the member-2 force through P4a1/P4aB, R_2 free on q_3 (offset 0.5907),
  s_3 = S_2–R_2 cap 'F_{top chord}' + RotateText 'constant force' along it,
  dotted ends t_3/f_4. Retired by the applet at step ≥ 7 (outro OK).
- Rays i_2/j_2…q_2 (mode-1 steps 2–7): dotted th2 grey segments through the
  load-line points parallel to the rafter members, ending on the vertical
  k_1 through the free handle W = (15.05138, 26.47988). Retired at step 8.
- Hanger guide lines s_2 (steps 4–8), t_2…e_3 (steps 4–9): dotted verticals
  from the top nodes down to y = 25.12007 (r_2 through D_2).
- g_3 (steps 4–6): dashed vertical P4s03→M_2 = (xV, 24); at step ≥ 7 replaced
  by the short grey dashed S4h12345678 = P4s03→P4a1 (visible in step 0).

## Sliders / booleans (live-verified; site exposes mode, step, sFD, sIF, showLabels, button1)

| name | default | range | shown | meaning |
|---|---|---|---|---|
| mode | 0 | 0–1 | yes | 0 = final drawing (+pipes), 1 = construction steps |
| step | 0 | 0–10 | mode=1 | applet stages (0 = complete) |
| scaleForceDiagram | 0.5 | 0.3–0.5 | yes | units per kN |
| offsetReactionForces | 0.4 | 0–0.5 | yes | offset of reaction chain + apex-tie force |
| scaleInternalForces | 0 | 0–0.05 | yes | pipes (form diagram only, mode 0 only) |
| loadSymbol | 0.7 | 0.1–1 | hidden | form reaction-arrow length |
| D9asymmetricLoading | 1 | 1–8 | hidden | 'position Q (superseded)' — extra load Q at node k (P2b* lifted to y=32.067, V2n*_2 'Q' vectors exist only for nodes 5–8); deprecated by the author, NOT ported |
| D9scaleSupports | 0.1 | 0.1 | hidden | hinge glyph scale (glyph itself show=false) |
| K9showFunicularPolygon | false | | off-canvas checkbox | grey funicular polygon below the truss: 2nd load line at x=28.50372 (P5aA=(…,24.87951) free), pole '0' = (25.78520, 22.12002), start P3aAB01 = (x_A, 22.28818); pole rays, closing, division 'k', reactions on the 2nd line — proves the bottom chord is the funicular of the loads and derives the reactions |
| K9showActualForces | false | | off-canvas | black true-magnitude segments: loads (y 30.4048→29.2209 at each node) + reactions (support − (0, 0.15660) down 4.5F) |
| K9showAdminPoints | false | | off-canvas | debug points — not ported |
| m | false | | off-canvas | 'hide internal forces in force diagram' (no force-diagram pipes exist; no-op) — not ported |
| showHandles | false | | off-canvas | rails + handle points → our 'show constraints' |
| showLabels | false | | off-canvas (site exposes) | member numbers 1–23 in BOTH diagrams |

## Applet mode-1 staging (all states screenshotted live)

1 loads flash (arrows + action lines), truss hidden; 2 rafters appear +
ray through b ∥ member 2 (orange flash); 3 remaining rays c…i; 4 hanger
guide verticals + P4s03 handle + dashed vertical g_3; 5 vertical cuts rays
b,c → points 1,2, force segments 2,5 + constant-force dimension (orange);
6 points 3–8, segments 8…23 + hanger gap segments + offset apex tie;
7 division 'i' + bottom-chord force 1→i + form member 1 + reactions flash;
8 member 4 + hanger 3 (form) + force 2→i; 9 everything else (members
6–22); 10 = complete. Internal-force polygons Q2r* only in mode 0.

## Member numbering (showLabels, both diagrams)

Top chord 2,5,8,11 (left), 14,17,20,23 (right); hangers 3,6,9 (left),
12 (apex tie), 15,18,21 (right); bottom chord 1,4,7,10 (left), 13,16,19,22
(right). Forces: member k form pair → force pair per the internalForce
macros, e.g. m2: (A→T1, b→1), hanger 3: (T1→B1, 2→1), tie 12: (apex→B4,
5→4), bottom 1: (A→B1, 1→i). Colors: rafters + 6 struts compression (blue),
bottom chord + apex tie tension (red/pink) — resolved live via
ggbAngle + isCompression, matches the live screenshots.

## Regression (scratchpad reg26.py vs live API dumps)

42 checkpoints (load line a…j + i, web points 1–8, 9 top nodes, 7 bottom
nodes + closure on support B, offset chain I_1/J_1/K_1, tie offset O_2/Q_2,
dimension S_2): **max err 4.3e-13 (default), 7.9e-13 (dragged state** with
apex at y=27.2 and left support at y=25.3**)**. Top-chord force 7.65276 kN
constant across all 8 members at defaults; hanger struts = F = 1.18387 kN
each; apex tie 5.00151 kN; bottom chord 7.00–7.43 kN.

## Port deviations

- Reactions computed directly as 4.5F (the applet routes them through the
  hidden funicular's division point — same value to machine precision; the
  funicular apparatus itself is ported behind the 'funicular polygon' toggle,
  including pole '0', second load line and division 'k' which sit right of
  the applet frame, reachable by panning).
- 'constant force' rotated text → horizontal label at the dimension (DOM
  labels don't rotate); dimension drawn grey (its orange in the applet is
  only the current-step highlight, grey at step 6).
- Member numbers default ON (applet showLabels default false; site exposes
  the toggle — ours is the established house style), load-line letters a–j
  and point disks gated by 'show points' (applet shows them only with
  showHandles).
- D9asymmetricLoading (author-marked 'superseded', hidden, partially wired)
  not ported.
- Node-equilibrium inspector (16 nodes) is our addition — the applet has no
  mode 2 here.
