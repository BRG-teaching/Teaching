# view_22 — Cantilevered fan bridge

Decode of `view_22/applet_0/geogebra.xml` (185 commands, no images; page title
"Cantilevered fan bridge"). The XML's saved derived coords are degenerate
(N @(−297,424), L @(7812,0)), so the regression reference is the LIVE applet via
CDP/ggbApplet — 5 states: default, dragged mast top H(−28,25), dragged deck end
B(40,0), moved LL0(65,3) + all four sliders changed, reset. **30 points × 5
states match to ≤ 7.9e-14**; the F₅ gaps match the applet's Distance[] readouts
to 1e-14; all 9 node sub-polygons close to ≤ 7e-15. Live screenshots (mode 1
steps 0–9, mode 0, handles, drags) in scratchpad v22/orig_*.png.

## Structure (Alamillo-style balanced cantilever)

- A = (0,0) the single bearing. Deck = x-axis segment A→B (B free at (50,0),
  invisible in the applet — we make it draggable along the ground); deck nodes
  J,K,L,M at the quarter verticals x = (k+0.5)/4·x(B); tip M–B dashed
  (unloaded). Mast = A→H leaning back-left; H = PointIn(Circle(D=(−25.891,
  30.471), radius 12)) — draggable ANYWHERE inside the dashed circle; mast
  nodes N,O,P,Q at the quarter verticals of the back span x ∈ [x(H), 0]
  (N innermost, Q outermost); tip Q–H dashed. showHandles reveals D + the
  radius slider [5,15] (ported: "show handles" toggle + radius slider).
- Members (applet text labels): mast pieces '1'=P–Q … '4'=A–N (numbered from
  the top), deck pieces '5'=A–J … '8'=L–M, stays '9'=J–N … '12'=M–Q.
- Loads: F₁..F₄ = loadP (200 kN) at the deck nodes, drawn hanging from the
  reference line y(L1) = −2.0745 (arrows loadSymbol long; dotted lines of
  action through the band y ∈ [−13.043, 42.956]). The back "loads" F₅..F₈ at
  the mast nodes are the mast weights — DERIVED by the construction.

## Force diagram (O-less Cremona; sFD = 65 kN PER unit — inverse convention)

Load line vertical at LL0 (60,0, free/draggable): F₁..F₄ stack down
(LL0→LL4, loadP/sFD each). Joints outward-in, poles landing RIGHT of the load
line at the LLk heights (deck horizontal ⇒ deck-parallels are horizontal):
R = ∥stay12 through LL0 ∩ ∥deck through LL1 (joint M); S (joint L, ∥stay11
through R); T (joint K); U (joint J). Then the mast side: the mast is ONE
straight line, so the parallels to it through U,T,S,R cut the load-line
VERTICAL above LL0 at A₁, Z, W, V; the gaps A₁→Z, Z→W, W→V, V→LL0 are the
required mast weights F₅..F₈ (always equal — uniform spacing; default
458.8 kN each; = loadP · front spacing / back spacing). Force segs: '4'=A₁–U,
'3'=Z–T, '2'=W–S, '1'=V–R; '5'..'8' = U–LL4, T–LL3, S–LL2, R–LL1; '9'..'12' =
T–U, S–T, R–S, LL0–R. Reaction A = LL4→A₁ = ΣFᵢ (2635.2 kN default), drawn
OFFSET left (offsetReactionForces = 4, an ON-CANVAS world slider in the
applet → panel slider here): C = LL4 − (offR,0), F = (x(C), y(A₁)), green
arrow C→F th7 + green dotted connectors LL4–C and A₁–F; form side u =
(0, −2.07−1.5·loadSymbol)→(0, −2.07) th7 at the bearing.

Step-5 apparatus (applet): FOUR orange dashed th3 parallels d_4..g_4 from
U,T,S,R up-left to the vertical through A₂ (= U-parallel ∩ the helper
horizontal y = 39.353) + h_4 = load line extended LL0→(60, 39.353);
d_4,e_4 visible step 5 only, f_4,g_4 steps 5–6, h_4 steps 5–7.

## Applet steps (mode 1, slider 0–9; step 0 = final; members stay black in
mode 1, colors only in mode 0 via internalForce angles α=π compression /
ι=0 tension) → our list (0..13, RESOLVE 13)

applet: 1 form loads + lines of action · 2 load line · 3 joint M ('12','8') ·
4 joints L,K,J · 5 mast-parallel apparatus + vertical through A (a_4) +
form reaction u appears · 6 joint N ('4','3', F₅ both sides) · 7 joints O,P,Q
('2','1', F₆F₇F₈ both sides) · 8 reaction A offset · 9 final.

ours: 0 intro · 1 deck + mast skeleton, dashed tips, drag circle, ALL
lines-of-action verticals (always visible in the applet), node letters ·
2 fan stays · 3 F₁–F₄ + load line (paired) · 4-7 joints M,L,K,J one per step
(pole R,S,T,U; members drawn colored both sides) · 8 dashed mast-parallels +
extended load line → A₁,Z,W,V (form: a_4 re-flashed) · 9 joint N (pieces 4,3 +
F₅ both sides; parallels through U,T retire = applet step 6) · 10 joints O,P
(pieces 2,1 + F₆,F₇; S,R parallels retire) · 11 joint Q closes (F₈ = V→LL0
exactly; stay 12 + piece 1 re-flashed; extension retires after = applet 7→8) ·
12 reaction A both sides · 13 resolve pink/blue + pipes + readouts.

## Sliders / options (ported to the panel)

loadP 200 [100,200] · scaleForceDiagram 65 [50,100] kN/unit (N_k =
|seg|·sFD) · loadSymbol 5 [1,5] · offsetReactionForces 4 [0,6] ·
scaleInternalForces: applet halfwidth = sIF·|seg|/sFD, sIF 0 [0,3]; ours
halfwidth = sIF·|seg|, slider [0,0.05] default 0.02 (≈ applet 1.3), pipes ON ·
showLabels T (always on here) · showHandles F (D handle + radius 12 [5,15]) ·
divisions fixed [4,4] → constant · mode 0/1 (no node mode in the applet — the
inspector is our house addition).

## Node inspector (9 nodes; house addition)

1–4 deck J,K,L,M · 5–8 mast N,O,P,Q · 9 bearing A (reaction side on the drawn
OFFSET arrow C→F per the house mandate). Polygons (tip-to-tail, all verified
closing ≤ 7e-15): J [LL3→LL4, LL4→U, U→T, T→LL3]; K [LL2→LL3, LL3→T, T→S,
S→LL2]; L [LL1→LL2, LL2→S, S→R, R→LL1]; M [LL0→LL1, LL1→R, R→LL0];
N [A₁→Z, Z→T, T→U, U→A₁]; O [Z→W, W→S, S→T, T→Z]; P [W→V, V→R, R→S, S→W];
Q [V→LL0, LL0→R, R→V]; A [A₁→U, U→LL4, C→F].

## Regression numbers

`v22_regress.py`: default 7.8e-14 · H(−28,25) 7.8e-14 (F₅..₈ = 357.14, A =
2228.57) · +B(40,0) 7.1e-15 (285.71 / 1942.86) · +LL0(65,3), loadP 140, sFD 80,
loadSymbol 3, offR 6 → 3.6e-14 (200.0 / 1360.0) · reset 7.8e-14.

## Deviations

- Node inspector, node letters (A,H,B,J..Q) and force-point labels
  (R,S,T,U,V,W,Z,A₁) added — the applet labels only members and forces.
- B (deck end) and D/radius (drag circle) made draggable/adjustable; the
  applet keeps B fixed and hides D behind showHandles (we keep the toggle).
- The form reaction arrow u appears in the applet already at step 5 (with the
  parallel apparatus); we delay it to the reaction step 12 so both reaction
  arrows appear together (paired-step rule).
- The applet's four orange helper parallels are drawn grey dashed (house
  guide style) but with the applet's exact extents (to the A₂ vertical) and
  exact retirement schedule; orange is reserved for the node inspector.
- F₁..F₄ load-line edges hidden at applet step 1 → simply not yet drawn
  (they enter at our step 3).
- H clamped to x ≤ −4 inside the drag circle (avoids the degenerate vertical
  mast); LL0 drag clamped to x∈[45,96], y∈[−6,12].
