# view_42 — Internal forces in a fixed frame: applet decode

Source: `view_42/applet_0/geogebra.xml` (243 objects) + the live applet
(https://block.arch.ethz.ch/eq/drawing/view/42) driven headless via the
ggbApplet API (coordinates dumped at h = 1, 2, 5, 100, o = true, and a fully
dragged state).

## Controls the original exposes

| control | kind | default | effect |
|---|---|---|---|
| `h` | in-canvas slider 1–100 (step 0.01) | 1 | frame-height multiplier: raises N (where the reactions meet) to h·h_drawn on the centre axis |
| `buttonH1/H2/H100` | page buttons | — | set h = 1 / 2 / 100 |
| `button1` "reset geometry" | page button | — | A(5,4), B(10,4), C(5,8), D(5,7), h=1, sFD=1.85 |
| `scaleForceDiagram` | flyout slider 1–2.5 | 1.85 | length of the hidden reference vector R₂–T (sets N_max) |
| `scaleLoadSymbol` | hidden slider 0.8–2 | 0.8 | length of the load/reaction arrows |
| `scaleInternalForces` | hidden slider 0–0.1 | 0 | DECLARED BUT UNUSED by any element |
| `o` "h=inf" | checkbox | false | vertical-reaction layout: hides A–N/N–B dashed + the O-kinked paths + H (h>2) + q₃/r₃; shows column extensions C→S₂/E→T₂ dashed, straight paths G–Q–Q₂ (blue/red) and G–B₂–Q₂ (black) |
| `showPoints` | checkbox | false | small dark dots on E,G,F,I,J,K,K',I',Q₂,Q,B₂,O,P,N,B₁,A₁,C₁,D₁… |
| `showHandles` | checkbox | false | reveals the hidden drag handles (B, C, M₂/N₂ range, q, circles h₁/c₂, Z/Z'/H vectors) |

There is NO step slider — the applet is a single parametric drawing; our 13
steps are hand-designed from the construction chain.

## The construction (all regression-checked)

Form: girder = deep beam C–E (top chord), D–F (bottom), corner verticals,
midspan post G–Q₂, end boxes K–J / K'–I' with diagonals J–C, E–I'; legs
A→{D, J}, B→{F, I'} (pin feet, corners framed = "fixed"). H₁ = girder centre
= crossing of E–D and C–F. N = (x_G, y_A + h·(y_H₁ − y_A)). O = A–N ∩ girder
axis, P = B–N ∩ axis (zero-moment points). Tension resultant (red) C→O→Q₂,
compression (blue) G→O→D; right half drawn black (G–P, P–Q₂, P–E, P–F).
Dimensions: inner "h" (foot level → O level), outer "h · h" (→ N), plus the
grey leaders — ends drawn as x-crosses.

Force diagram: hidden reference chain S = C–Q₂ ∩ G–D, T = R₂ − sFD·unit(S−A),
U = ∥C–Q₂ through R₂ ∩ ∥G–D through T, V = (x_R₂, y_T), W, Z, Z' = Z + (T−V).
N_max = x_R₂ − x_Z' (constant drawing length; the reference triangle is the
h = 2 polygon, hence Q_ref = |v₁|/2).

- h ≤ 2 branch (corner chord governs): B₁ = vertical through U ∩ ∥C–O through
  R₂ (red b₃); A₁ = ∥O–D through B₁ ∩ ∥A–N through R₂ (blue c₃);
  D₁ = ∥G–O through R₂ ∩ ∥O–Q₂ through A₁ (blue g₃ + red f₃, hidden at h = 1
  where they are vertical/degenerate). Green: A = A₁→R₂, Q = R₂→C₁ (vertical),
  H = C₁→A₁.
- h > 2 branch (midspan chord governs): E₁ = vertical through Z' ∩ ∥G–O
  through R₂ (blue n₃); F₁ = ∥O–Q₂ through E₁ ∩ ∥A–N through R₂ (red p₃);
  I₁ = ∥C–O through R₂ ∩ ∥O–D through F₁ (blue q₃ + red r₃, hidden when o).
  Green: A = F₁→R₂, Q = R₂→G₁, H = G₁→F₁ (hidden when o).

λ = |R₂ − C₁| / (|y_T − y_R₂|/2) (resp. G₁): λ(h) = h for h ≤ 2, peak λ = 2
at h = 2 (corner and midspan chord forces equal), then λ(3) = 1.6,
λ(5) = 1.379, λ(100) = 1.153, λ→8/7 as h→∞.

Dimensions/rails: top N_max from x_Z' to x_R₂ at draggable y_T₁ (grey handle
T₁, default 9.414); bottom N_max from (x_A₁, y_A₁−0.5), same length; dotted
rails x = x_Z' and x = x_A₁ + N_max, y ∈ [4, 10].

## Regression

Full chain vs the LIVE applet at h = 1 / 2 / 5 / 100 / o=true and the dragged
state (A=(5.6,4), B=(10.8,4), C=(5.6,8.6), D=(5.6,6.6), h=1.7, sFD=1.3):
worst error 3.3e-14 over all named points (scratchpad `v42_check.py`).

## Deviations from the applet (and why)

- Applet colors red #ff0000 / blue #0000ff → house palette pink (tension) /
  blue (compression); green #009900 → PAL.green.
- O, P, N points + letters shown always (the applet gates them behind
  showPoints) — our staging narrates them; the rest of the showPoints dots
  stay behind the toggle.
- B and C get visible drag disks (the applet hides their handles unless
  showHandles); showHandles here draws dashed rings on all six handles.
- Internal-force pipes (house rule, default on) with own scale slider: the
  applet's scaleInternalForces slider exists but drives nothing. Pipe widths
  = the polygon side lengths; the midspan-side forces diverge as h→1
  (members ∥ within the cut) and are capped at 3·N_max; at h = 1 exactly the
  quad collapses (applet hides f₃/g₃) and the mid pipes vanish.
- Node inspector (ours): 1=A, 2=B (reaction + the two leg bars, reaction side
  on the drawn green A vector A₁→R₂), 3=O, 4=P (the four resultant forces =
  the closed quadrilateral; disabled at h = 1 where O sits on the cut and its
  free body is undefined; P and B mirrored about the vertical through R₂).
- The λ texts are plain labels ("λ = Q / Qref = …") instead of LaTeX.
- Members not numbered: the colored paths are stress resultants, not bars;
  form↔force twins are wired with dual hover links instead.
