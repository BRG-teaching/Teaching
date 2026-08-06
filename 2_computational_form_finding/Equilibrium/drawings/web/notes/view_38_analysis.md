# view_38 — Lenticular truss — applet decode

Source: view_38/applet_0/geogebra.xml (238 KB, 492 elements), title from
page.html: **Lenticular truss**. Live original verified via ggbApplet API
(headless chrome): defaults, showLabels / showConstruction /
subConstructionTrial / showPoints toggles, Q state (factorQ=1.5, positionQ=2),
P dragged to y=6.9 (setCoords), mode-1 steps 0–8, pipes.

## The model

Deck line L1=(1.153, 8.178) → L2 = L1+(8,0) (L1 draggable moves everything);
supports G₁/G₂ = L1/L2 − (0, scaleLoadSymbol+distLoadSymbol) = 2.5 below;
truss AXIS = the horizontal through G₁–G₂ (dash-dot, applet steps 4–7);
divisions = 6 → five action lines at L1.x + 8i/6. Loads G₁…G₅ = loadG (1.2)
drawn above the deck line. First top node **P is FREE on a dash-dot rail**
(the vertical piece of action line 1, y ∈ [axis+0.2, axis+2.5]) — P picks the
lens; **P′ = Mirror(P, axis)**.

**Form-finding (the whole point):** the truss geometry is derived from the
DEAD force diagram. Division i = midpoint of the dead load line. I =
(∥ G₁–P through LL₀) ∩ (∥ G₁–P′ through i) — every web point of the Cremona
then lies on the VERTICAL through I (constant horizontal chord force), at the
midpoint levels between i and the load points LLB₁…LLB₅. Chord k+1 (top) runs
∥ (web level k → LLBₖ), bottom chord ∥ (web level k → i) — nodes R, Q, U, V,
O₁, P₁, R₁, Q₁ on the action lines; chords 6/21 land exactly on G₂ (closure
verified ~1e-15). Because of this shape every vertical carries exactly HALF
its panel load (text "G₁/2" etc.) and every diagonal carries ZERO under the
uniform load. The cyan `showConstruction` layer draws this fan (LLB labels,
I, the midpoint chords); `subConstructionTrial` is a second, redundant trial
(pole I₂) that finds the real division R₂ — our port computes R₂ directly by
lever arms (trial-invariant, verified).

Members (texts): top chords 1–6, verticals 7 9 11 13 15, bottom chords
16–21, diagonals 8 10 12 14 (P′–R, Q–U, U–P₁, O₁–Q₁ — black/zero at
factorQ=0, numbered only when factorQ>0). Extra load Q (orange, caption Q)
at panel positionQ: load-line gap becomes G(1+factorQ) with orange caption
"Gᵢ+Q"; the GEOMETRY stays dead-load based, the reactions and all member
forces re-solve — the diagonals wake up.

Real Cremona (S₂ F₂ G₂f U₂ W₂ B₃ D₃ F₃ G₃ H₃ chain): S₂ = (∥1 through LL₀) ∩
(∥16 through R₂), then alternating (∥chord through load pt) ∩ (vertical) and
(∥bottom chord through R₂) ∩ (∥diagonal) — exact chain and the applet's
internalForce (P,Q,R,S) orders tabulated in views/view_38.js (MEM).
a1..a6 = π (top chords blue), a16..a21 = 0 (bottom pink), verticals π (blue).

Reactions: A = i→LL₀ (upper), B = LL₅→i (lower) on the offset line
x + offsetReactionForces (0.75) with dotted connectors; form arrows point up
BELOW the supports (gap distLoadSymbol).

Trial (applet steps 2–3, hidden ≥4 and at 0): free pole (22.42, 6.49), rays
to the DEAD load points, strings from free F₀ (on the left action line)
across the five action lines to F₆ on the right one; outer strings extended
(dashed) meet at the apex on R's line of action (midspan); orange dashed R on
the load line (u_2) + at J₃ on the midspan action line (w_1); closing F₀–F₆
+ parallel through the pole → i.

Step-4 apparatus (applet): l₁/l₂ dimension marks at the left edge (P/axis/P′
levels) and the f₁ = f₁ marks beside the load line (LL₀ / mid-A level / i):
S₂ lies at MID-height of A ⇔ the end chords share the reaction equally ⇔
l₁ = l₂. Steps 5–6 repeat with f₂ = f₂ for panel 2 (D₂/E₂ marks, dashed
F₂–K with K = Midpoint(i, LL₁)).

## Sliders / booleans (live-verified)

| name | default | range | where |
|---|---|---|---|
| loadG | 1.2 | 0–5 | forces menu |
| scaleForceDiagram | 1 | 0.5–1.5 | scales |
| factorQ | 0 | 0–3 | ON-CANVAS (13.3, 0.90), mode 0 |
| positionQ | 1 | 1–5 | ON-CANVAS (16.8, 0.88), mode 0 |
| offsetReactionForces | 0.75 | 0–1 | ON-CANVAS (20.1, 0.90) |
| scaleInternalForces | 0 | 0–0.1 | mode 0 (our default 0.04, on) |
| scaleLoadSymbol / distLoadSymbol | 1 / 1.5 | hidden | geometry offsets |
| mode / step | 0 / 0 | 0–1 / 0–8 | toolbar; step: 1 loads, 2 trial+R, 3 closing+reactions, 4 members 1/16 + l₁l₂ + f₁, 5 chord 2 + G₁/2, 6 chord 17, 7 all panels, 8 diagonals |
| showHandles / showConstruction / showPoints / subConstructionTrial / showLabels | false | — | checkboxes |

## Regression (scratchpad v38/regress38.py)

30 points vs the LIVE applet in three states — default **2.8e-14**, Q on
panel 2 **1.0e-14**, P dragged to 6.9 **7.2e-15**; chord closure onto G₂ and
force-6 closure ≤ 5e-15. Joint sub-polygons close exactly (walk in
nodeSides(), 12 joints).

## Deviations from the applet (deliberate)

- R is dashed thick GREEN in both diagrams (applet: orange-flash th5 dashed,
  green base) and our closing/parallel are black dashed (applet orange
  type15) — platform palette.
- The f₁ marks retire when the f₂ marks appear (applet shows f₁ only at its
  step 4, f₂ at 5–6 — never both; same net effect).
- The cyan form-finding layer uses #00b8cc (applet #00ffff, unreadable on
  white); drawn as full fan incl. I–Z vertical.
- Member 7 (P–P′) is drawn WITH its force at our step 9 (the applet previews
  it orange at steps 5–6 and shows the member itself only from step 7).
- Labels G₁/2 etc. only during construction (outro at resolve); numbers shown
  always (applet needs showLabels).
- P's rail clamps y to [axis+0.2, axis+2.5] exactly like the applet's d_1.

## Step design (14 steps, paired form ↔ force)

0 intro · 1 supports + action lines + P rail · 2 loads ‖ load line ·
3 trial pole + rays ‖ trial funicular · 4 outer strings → R (dashed green,
both) · 5 closing → i · 6 reactions offset + at supports · 7 drag P: P′
mirror, members 1/16 ‖ S₂ · 8 symmetry check l₁=l₂ ‖ f₁=f₁ + midlevel dash ·
9 chord 2 + vertical 7 ‖ forces 2, 7 = G₁/2 + f₂ marks · 10 chord 17 ‖ force
17 · 11 all remaining panels ‖ full Cremona on the constant-force vertical ·
12 diagonals (zero) · 13 resolve + pipes + readouts (factorQ invitation).
Node inspector: 12 joints, sides from the tip-to-tail walk; support sides
land on the visible offset reaction arrows.
