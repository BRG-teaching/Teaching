# view_37 — Pratt / Howe truss — applet decode

Source: view_37/applet_0/geogebra.xml (331 KB, 672 elements, 645 command
outputs), title from page.html: **Pratt / Howe truss**. Live original verified
via ggbApplet API (headless chrome): objects/values dumped at defaults, Pratt,
mode-1 steps 0–19 (both modes), showLabels/showPoints/showHandles, offsets,
pipes, and an asymmetric drag state (F₂=4, F₅=1.5, sFD=0.6).

## The model

Six-panel parallel-chord truss, panels 2×2 world units. Top chord nodes
(applet letters) A B D E F G H at (1+2k, 9), bottom chord C I J K L M N at
(1+2k, 7). A is FREE (dragging A translates the whole truss — every other
node derives via circles r=2 along Line(A, xAxis)). Loads F₁…F₇ = 3 kN
(sliders 1–4) at every TOP node, drawn as green vectors of length
`loadSymbol` (=1). Supports under C and N: green reaction arrows b_1 =
Vector(W→C), h_1 = Vector(V→N), captions A and B. No support glyph macros.

25 members (Text numbering; captions on the segments are an older ±1 scheme —
the Texts are what the applet displays): top chord 2 6 10 14 18 22, bottom
chord 4 8 12 16 20 24, posts 1 5 9 13 17 21 25, diagonals 3 7 11 15 19 23.
`HP` slider (caption "Howe / Pratt", on-canvas at (14.79, 1.69)): HP=0 Howe
diagonals C–B, I–D, J–E / E–L, F–M, G–N (rising to midspan); HP=1 Pratt A–I,
B–J, D–K / K–F, L–G, M–H. Zero members: Howe 2, 13, 22 (Texts "2=0" "13=0"
"22=0"); Pratt 4, 24.

## Force diagram

Load line vertical through free point Z = (21.1, 12.2): Z→A₁→B₁→C₁→D₁→E₁→G₁→H₁,
gaps Fᵢ·sFD (sFD = scaleForceDiagram = 0.4). Green load arrows ON the line
(offset to x+offsetLoads when that slider > 0, thin dotted connectors
h_14…b_14). Reactions on the offset line x + offsetReactionForces (= 0.6):
A = L₆→J₆ (i→Z), B = K₆→L₆ (H₁→i), dotted connectors at Z, i, H₁.

Trial funicular (applet steps 2–4 only, then hidden — steps ≥5 AND step 0
drop the whole apparatus): free pole I₁ = o′ (14.729, 8.672), rays to the 8
load points (grey th2); start J₁ = Q′ on the vertical through A (y = 3.213),
strings ∥ rays across the 7 action lines → P₁…P₆; outer strings from Q′ ∥
o′–Z and from P₆ ∥ o′–H₁ drawn DASHED, meet at Q₁ = (7, 6.536) on the
resultant's action line k_14 (full-height dotted vertical). R is drawn as a
th5 DASHED vector in BOTH diagrams (base color GREEN (0,0.6,0), orange only
as step-2 highlight): u_13 = Z→H₁ on the load line (steps 2–3), w_12 at D₆ on
the action line (steps 2–4). Closing m_4 = J₁–P₆ (dash-dot) + parallel
through o′ (p_4) → division point R₁ = i = (21.1, 8.0) (step 3); reactions at
step 4.

## Cremona chains (applet steps 5–18 = joints, slider caption "Highlight Nodes")

Joint order Howe: A C B I D J E K L F M G N H; Pratt: C A I B J D E K F L G M
H N. Interior points (all verified): Howe S₁(18.1,8) T₁(18.1,9.8) U₁(16.3,8)
V₁(16.3,8.6) W₁(15.7,8) Z₁(16.3,7.4) A₂(16.3,8)≡U₁ M₂(18.1,6.2) N₂(18.1,8)≡S₁;
Pratt B₂(18.1,11) C₂(18.1,8) D₂(16.3,9.8) E₂(16.3,8) G₂(15.7,8.6) H₂(15.7,7.4)
I₂(16.3,8)≡E₂ J₂(16.3,6.2) K₂(18.1,8)≡C₂ L₂(18.1,5). Per-mode member force
segments and the exact internalForce(P,Q,R,S) argument orders are tabulated in
views/view_37.js (INC + compute()); compression = ggbAngle(Q−P, S−R) ≈ π
(blue), tension 0 (red/pink). Howe: chords top blue / bottom red, diagonals
blue, interior posts red, end posts 1/25 blue; Pratt: web swaps — diagonals
red, posts blue (mid post 13 = F₄ compression), top chord fully loaded, 4/24
zero.

Step-visibility quirks mirrored exactly: from applet step 5 each force-side
LOAD arrow hides until its top joint's step (form-side loads never hide);
force-side reaction A hides during the FIRST joint step only (Howe step 5),
B hides from step 5 until joint N/H (Howe 17 / Pratt 18). Orange th5 node
arrows at the current joint (u_4…s_11) = the applet's per-step free-body — in
our port the node-equilibrium inspector AUTO-selects the current joint during
the joint steps (thick black star + tip-to-tail sub-polygon).

## Sliders / booleans (live-verified; page.html `controls` exposes mode, step,
scaleInternalForces, F₁–F₇, showLabels, reset-loads button)

| name | default | range | where | meaning |
|---|---|---|---|---|
| scaleForceDiagram | 0.4 | 0.1–2 | scales menu | load-line gap = F·sFD |
| F_{1..7} | 3 | 1–4 | forces menu | the seven loads |
| loadSymbol | 1 | 0.5–2 | hidden | form arrow length |
| scaleInternalForces | 0 | 0–0.05 | mode 0 only | pipe half-width (our default 0.03, on) |
| HP | 0 | 0/1 | ON-CANVAS (14.8, 1.7) | Howe / Pratt |
| offsetLoads | 0 | 0–1 | ON-CANVAS (18.7, 1.7) | load arrows off the line |
| offsetReactionForces | 0.6 | 0–1 | ON-CANVAS (22.0, 1.7) | reaction offset line |
| mode | 0 | 0/1 | toolbar | 0 resolved colors+pipes, 1 step construction (black) |
| step | 0 | 0–19 | mode 1 | 0 = final; 1 loads, 2 trial+R, 3 closing→i, 4 reactions, 5–18 joints, 19 done |
| showHandles / showPoints / showLabels | false | — | checkboxes | frame handles / grey points / member numbers |

## Regression (scratchpad v37/regress37.py + nodes37.py)

- (a) vs baked XML homogeneous coords (÷z): 27 points, max err **3.3e-14**.
- (b) vs LIVE applet getXcoord/getYcoord: default 26 pts, Pratt 27 pts,
  asymmetric-loads state (F₂=4, F₅=1.5, sFD=0.6) both modes: max **3.3e-14**.
- (c) node sub-polygon walk (load/reaction edge + member segments tip-to-tail):
  closes to **0.0** residual for all 14 joints in both modes — the same walk
  drives dw.setNodeInspector.

## Deviations from the applet (deliberate)

- The applet's mode-1 ORANGE step highlight → our platform black-flash +
  pink joint letter + auto-selected node inspector (orange is reserved for
  the inspector's selection ring).
- The applet's Pratt pipes for members 1 and 25 use the HOWE magnitudes
  (internalForce args (C,A,Z,A₁)/(H,N,H₁,G₁) = 1.2 units — an applet bug: its
  own labelled force segments b_12/c_12 = Z–R₁/H₁–R₁ = 4.2). Our pipes use
  the true segment lengths; colors agree either way.
- Member numbers are shown always (the applet needs showLabels=true); the
  "n=0" suffix follows the mode. Division point labelled i (unnamed in the
  applet), trial labelled o′/Q′/P₆.
- R's form arrow sits 1 unit below Q₁ on the action line (the applet's D₆
  handle default ≈ 2 units below; D₆ dragging not ported).
- ΣF / A = B readouts + "A = 10.5 kN" magnitudes added (applet shows bare
  letters).
- offsetLoads connectors are shown whenever offsetLoads > 0 (the applet also
  gates them per joint during mode-1 steps).

## Step design (22 steps, paired form ↔ force)

0 intro · 1 truss (25 numbered members, lettered joints) · 2 loads both
diagrams + action lines · 3 trial pole o′ + rays ‖ strings · 4 outer strings
→ R dashed green BOTH diagrams · 5 closing → i · 6 reactions A/B offset line
+ at supports (trial retires AFTER, as the applet does at its step 5) ·
7–20 joints (applet 5–18; captions name the Howe joint first, the Pratt joint
in parentheses; auto node-inspector = the applet's orange arrows; per-mode
force-segment intros mutated on toggle) · 21 resolve (pipes, readouts).
