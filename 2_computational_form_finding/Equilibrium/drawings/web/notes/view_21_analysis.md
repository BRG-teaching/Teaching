# view_21 — Fan-harp bridge

Decode of `view_21/applet_0/geogebra.xml` (218 commands, no images). The XML's saved
derived coords for the WHOLE force diagram are degenerate (T @(2545,580) … blown-up
stale state from coincident fan anchors), so the regression reference is the LIVE
applet via CDP + ggbApplet (scratchpad/v21_live*.txt): **fan / harp / semifan /
inclined-deck / inclined-mast states all match to ≤ 1.3e-13**
(scratchpad/v21_regress.py). Live screenshots: scratchpad/v21/orig_*.png.

## Structure

One mast + 6 stays + deck, a Cremona (joint-by-joint) force diagram.
- Mast line: towerControl1 (20,22, FREE drag) → towerControl2 (on the ground
  guide g_5, x ∈ [8,32], y=0 — dragging it INCLINES the mast). deckControl1 on
  the mast line (deck level, dist 7.333 from base); anchors tower1/2/3 on the
  mast between B₁ = deckControl1+0.5 and Z = top−'tower'(0.5); all three
  coincide at (20,17.333) by default = FAN. Buttons (ggb JS): fan (t2=t3=t1),
  harp (t2=towerH2, t3=towerH3 = mast ∩ parallels to stay f through deck5/deck4
  → all stays parallel), semifan (t2=mid(t1,towerH2), t3=towerH2).
- Deck: deckControl1 → deckControl2 (35, y ∈ guide 0..20). L = |dc2−dc1|,
  full deck = 2L. Nodes from the right end: deck6 at 2L/15, deck5 at deck6+2L/6,
  deck4 at deck6+2L/3, deck1/2/3 mirrored about deckControl1. Anchor extension
  e_2 = deck6→deckControl2 (grey dashed). Loads: F₁..F₆ = 2 kN at deck1..deck6
  (green, tail on deck, tip loadSymbol vertically below; dashed lines of action
  through the band y ∈ [−4.996, 22.633]). The tower deck node carries no load.

## Force diagram (Cremona, O = free anchor (47, 8.6))

Load line: LF₁..LF₃ stacked 2·sFD UP from O (left-span loads, top→bottom edges
F₃,F₂,F₁); after the closing, LF₅..LF₇ stacked up from LF₄ (edges F₄,F₅,F₆).
Joints in construction order (∥deck through LF_k ∩ ∥stay / ∥mast):
T (deck1), U₂ (deck2), V₂ (deck3), W₂ (t1: ∥stay13 through O ∩ ∥mast through T),
Z₂ (t2), A₃ (t3), LF₄ (tower deck node: ∥deck through A₃ ∩ ∥mast through LF₃).
Right-span joints deck4/5/6 then close automatically; the residual gap
O→LF₇ = anchor force B (∥ deck; ZERO unless the mast is inclined). Reaction
A = mast force LF₃→LF₄, drawn offset 2.5 ⊥mast to the left (P/R, dashed
connectors q_5/p_5 dark-green), green arrow R→P, CAP 'A'; form side
ForceV = (base − loadSymbol·um) → base. B form side c_1 at deckControl2 along
the deck, sense = sign of x(towerControl2) − x(deckControl1) (applet If).

## Member numbering (texts, live-verified)

1 stay t1–deck1 ↔ O–T · 2 deck1–2 ↔ T–LF₁ · 3 stay t2–deck2 ↔ T–U₂ ·
4 deck2–3 ↔ U₂–LF₂ · 5 stay t3–deck3 ↔ U₂–V₂ · 6 deck3–dc1 ↔ V₂–LF₃ ·
7 mast dc1–t3 ↔ V₂–A₃ · 8 dc1–deck4 ↔ A₃–LF₄ · 9 stay t3–deck4 ↔ Z₂–A₃ ·
10 deck4–5 ↔ Z₂–LF₅ · 11 stay t2–deck5 ↔ W₂–Z₂ · 12 deck5–6 ↔ W₂–LF₆ ·
13 stay t1–deck6 ↔ O–W₂ · 14 mast t3–t2 ↔ U₂–Z₂ (hidden label when |t3t2|<0.5) ·
15 mast t2–t1 ↔ T–W₂ · 16 mast below deck ↔ LF₃–LF₄ (the load-line overlap).
h_3 = LF₇–O = anchor member force (black). Colors: stays red=tension,
deck+mast blue=compression (dynamic ggbAngle keys from the internalForce
macros; orientation per macro args, e.g. member t1→deck1 with force T→O).

## Sliders / booleans

loadSymbol 2 [1,4.5] · scaleForceDiagram 1.5 [1,2] · offsetReactionForces 2.5
[0,5] · scaleInternalForces 0 [0,0.1] · showLabels TRUE · o_1 'hide inner
forces in force diagram' F · o_2 'show handles' F. Unused/label-only: tower 0.5
[0.5,2] (clamp margin), scaleLoads (deck-number label spacing), scaleSupports,
offsetLoads (band shift), A1 (leftover) — not ported (deviations).

## Step list (17: 0..16 … final RESOLVE=15)

0 intro · 1 site + given structure (guides, deck+mast skeleton grey, anchor
extension, disks) · 2 stay anchors + stay skeleton (fan; buttons) · 3 the six
loads + load line start: O, F₁F₂F₃ stacked up (left span) · 4 joint deck1
(members 1,2 colored + O–T, LF₁–T) · 5 joint deck2 (3,4) · 6 joint deck3 (5,6) ·
7 joint t1 (13,15) · 8 joint t2 (11,14) · 9 joint t3 (9,7) · 10 tower deck node
closes → LF₄ (16,8) · 11 right-span load line F₄F₅F₆ (up from LF₄ → lands at O) ·
12 joints deck4/deck5 (10,12) · 13 joint deck6 + anchor B (h_3, gap, c_1) ·
14 reaction A (offset apparatus) · 15 resolve: pipes on, readouts A/B,
tension/compression caption.

## Node inspector (12 nodes; NOT in the applet — house mandate)

1..3 deck1..3, 4 tower deck node, 5..7 deck4..6, 8 anchor (deckControl2,
degenerate two-sided when B=0), 9..11 t1..t3, 12 base (mast force LF₃→LF₄ +
reaction on the drawn offset arrow R→P per user mandate). Sub-polygons in the
notes' orientation all telescope to zero (checked numerically in the viewer).

## Deviations
- Labels always on (applet default showLabels=true anyway); numbers colored
  like their members (house style; applet black).
- Form members drawn colored at their JOINT step over a grey given-structure
  skeleton (the applet has no steps at all).
- tower/scaleLoads/scaleSupports/offsetLoads/A1 sliders not ported (see above).
- Internal-force pipes default ON at the final step (applet macro exists with
  scaleInternalForces=0 default).
