# view_15 "Cable For Non-uniformly Distributed Load" — decoded algorithm

Applet: 9 steps (slider `step` 0..9, mode 1). A cable hangs between two supports
at the same level and carries a distributed load that is NOT uniform: a base
load g over the whole span plus an additional load q = factor_q·g over the
left part of the span. The span is discretised into i = 24 strips; the cable
is found as the funicular of the 24 strip loads through a pole `o` constructed
so the cable passes through A, B AND a chosen sag point V₃.

## Sliders / free numbers
- `g` 1..10, default 3.2 (base load intensity, kN per strip at scale 1)
- `factor_q` 0..3, default 2.2 (site label "q/g")
- `scaleForceDiagram` 0.1..1, default 0.3
- `length_q` 1..14, default 10 — number of heavy strips; the page JS snaps the
  hidden point W₁ to x(A) + length_q·s (s = strip width): heavy strip test in
  the XML is `x(LPk) ≤ x(W_1)` with LPk = x(A)+k·s ⇒ strips 1..length_q heavy.
- `i` = 24 (slider HIDDEN, fixed), `loadSymbol` 2.8 (hidden),
  `offsetReactionForces` 0..2 default 0 (skipped — offsets v_9/u_9 sideways),
  `mode` 0/1, `o_1` "show handles" (hidden y-level handles), `o_2` "hide
  reaction forces in force diagram" toggle.

## Geometry (defaults)
- A = (10, 55.14) free; B = (69.99093107425405, 55.14) on the horizontal
  through A. L = xB−xA, s = L/24. Load verticals at xk = xA + s/2 + k·s
  (k = 0..23); strip boundaries LPk = xA + k·s.
- Constant y-levels (hidden handle points): load-block rail yQ =
  66.70658219022937 (block bottom yQ−loadSymbol/2), g-block top
  61.640073618735116 (bottom −loadSymbol/2), grid top 70 / bottom
  6.576962386594359, R-arrow tip level 50.71201973056903
  (tails +1.5·loadSymbol; total-R arrow 2·loadSymbol long from 56.312).
- Always-visible site: 26 grey dashed verticals (at xA, the 24 load verticals,
  xB) from y=70 to 6.577; q block = green outline+10% fill from x=xA to
  x(W₁), y 65.307..66.707, caption 'q'; g block full span y 60.24..61.64,
  caption 'g'; V₃ rail l_3 = grey dash15 vertical segment x = x(W₁),
  y 25.2..51.39; a_5 = BLACK dashed full-height vertical at x(W₁); points A, B.
  (t_2, the per-strip green arrows v..h_3, W₁, V₁ are all hidden.)

## Force diagram (vertical load line at x = 93.80636420662152)
- S₂ = load-line start (93.806, 62.304), draggable, step ≥ 2.
- Strip weight wk = g·(1+factor_q)·sFD if k ≤ length_q else g·sFD
  (defaults: 3.072 / 0.96). Pk = S₂ − (0, Σw), k = 0..24; U₃ = P₂₄.
- A₉ = S₂ − (0, sFD·(1+factor_q)·g·24·|a₃|/L) = P_length_q exactly
  (division point between R₁ and R₂). Hidden point in the applet.
- 24 load-line segments g_{11}..k_{12} black th2, step ≥ 2; grey dashed
  vertical guide b_{14} (y 70..6.58) step ≥ 2.

## Resultants R₁ (heavy region), R₂ (light region) — applet step 2
- Lines of action: e₁₄ x = (xA+x(W₁))/2, f₁₄ x = (x(W₁)+xB)/2; drawn as
  dashed verticals n_4/b_5 (steps 2..8, orange-flash at 2, 4, 7).
- Form arrows t_6/u_7 caption R_1/R_2: from y 54.912 down to 50.712 at those
  x (th5, green; applet shows them only steps 2..4). Force side v_7/w_7:
  R_1 = S₂→A₉, R_2 = A₉→U₃ ON the load line (steps 2..4).

## Trial: one sag point, two partial funiculars — applet step 3
- V₃ = (x(W₁), 35.18264551979542), draggable on rail l_3. Both partial trial
  funiculars pass through V₃.
- W₈ = line(B, V₃) ∩ e₁₄; Z₈ = line(A, V₃) ∩ f₁₄. Trial strings (dash10,
  grey after flash, visible steps 3..7): j₁₄ = A–W₈, l_4 = W₈–B (through V₃),
  m_4 = Z₈–A (through V₃), i₁₄ = Z₈–B.
- Trial pole C₉ (o′₁) = (through S₂ ∥ A–W₈) ∩ (through A₉ ∥ W₈–B);
  rays b_4 = S₂–C₉, a_4 = A₉–C₉ (dash10, stay forever from step 3).
- Trial pole D₉ (o′₂) = (through A₉ ∥ A–Z₈) ∩ (through U₃ ∥ Z₈–B);
  rays n_3 = D₉–A₉, m_3 = U₃–D₉ (dash10, stay forever).

## Reaction components — applet step 4
- A₁ = C₉→S₂ (j_8), A₂ = D₉→A₉ (h_8), B₁ = A₉→C₉ (i_8), B₂ = U₃→D₉ (g_8)
  on the force diagram; at the supports th5 arrows of length 1.5·loadSymbol:
  u_8 'A_2' = A + unit(A−V₃), v_8 'A_1' = A + unit(A−W₈),
  w_8 'B_2' = B + unit(B−Z₈), f_8 'B_1' = B + unit(B−V₃). Visible steps 4..6.

## Pole o — applet step 5
- E₉ ('o') = C₉ + D₉ − A₉ (parallelogram A₉C₉E₉D₉): i_4 = C₉–E₉ ∥ A₉–D₉,
  j_4 = E₉–D₉ ∥ A₉–C₉ (dash10, stay forever). k_8 = D₉→E₉ ('B_1'),
  l_8 = E₉→C₉ ('A_2') steps 5..6. Total reaction at A = A₁+A₂ = o→S₂.
- w_9 = Vector(S₂, U₃) 'R' on the load line, th5, step ≥ 5, green.

## Reactions + total R — applet step 6
- v_9 'A' = o→S₂, u_9 'B' = o→U₃ (th5 green, hidden by toggle o_2).
- Form: u_4 'A' = A + unit(S₂−o)·1.5·loadSymbol, v_4 'B' =
  B + unit(o−U₃)·1.5·loadSymbol (green th5, permanent).
- xR = (e₁₄x·R₁ + f₁₄x·R₂)/(R₁+R₂) (applet: hidden auxiliary funicular with
  pole O₁₀); r_7 'R' = arrow (xR, 56.312)→(xR, 50.712) green th5; s_7 = grey
  dashed vertical line of action (70..6.58). Permanent from 6.
- T₁₁ = (through A ∥ o–S₂) ∩ (through B ∥ o–U₃) — the support tangents meet
  ON R's line of action; a₁₅ = A–T₁₁, b₁₅ = T₁₁–B dash10, permanent from 6.
- c₁₅/d₁₅ = U₃–o, o–S₂ dashed previews of the outer rays (steps 6..7 only).

## Coarse funicular string — applet step 7 (ORANGE, retired at 9)
- q = Segment(A₉, E₉) orange solid th2 (steps 7..8);
  h₁₅ = string through V₃ ∥ o–A₉ clipped between e₁₄ and f₁₄ (P₂–H₁₁),
  orange (steps 7..8). A→(a₁₅ line)→P₂→H₁₁→(b₁₅ line)→B is the funicular of
  R₁+R₂ alone.

## The cable — applet step 8
- 25 rays o–Pk: outer two (m_8 = S₂–o, j_9 = U₃–o) th2 RED; inner 23 th1
  BLACK. Cable polyline f_{11} th2 RED: X₀ = A, X_{k+1} = X_k + t·(Pk−o)
  hitting vertical xk, k = 0..23; the closing segment X₂₄→(∥ o–U₃) lands
  exactly on B. Trial strings j₁₄/l_4/m_4/i₁₄ disappear at 8 (poles + their
  rays + parallelogram STAY). Step 9: n_4/b_5 (R₁/R₂ action lines) disappear.
- mode 1 recolors cable/outer rays black — ignored (mode 0 = red).

## Port decisions (web view)
- 16 steps 0..15, RESOLVE = 15; canonical order kept as the applet's:
  site(1) → load line + per-strip load arrows (2, paired, hover-linked
  strip-by-strip; the applet's per-strip arrows exist but are hidden — drawn
  here small green under the g block so form↔force pairing is explicit) →
  R₁/R₂ dashed green BOTH diagrams (3) → trial funicular for R₁ = strings +
  pole o′₁ (4) → same for R₂ (5) → reaction components both sides (6) →
  pole o parallelogram (7) → total R dashed green BOTH diagrams + line of
  action (8) → reactions green both sides + tangents meeting at T₁₁ (9) →
  orange middle string ∥ o–A₉ both sides (10) → cable: first segment + ray
  o–S₂ (11), heavy zone segments 2..10 + rays (12), light zone 11..24 + rays
  (13), landing segment + ray o–U₃ (14) → resolve pink + pipes + readouts
  (15).
- Segments/rays NOT numbered (25 of them; the applet numbers none) — instead
  every cable segment is hover-linked to its ray, every strip load to its
  load-line edge.
- Resultants R₁, R₂, R = dashed green (dashArrow) in BOTH diagrams in the
  same step, per the standing fidelity rule (applet draws them solid th5).
- Trial strings grey, retire at step 11 (applet: at 8); poles/rays/
  parallelogram stay forever; R₁/R₂ dashed action lines + orange string
  retire at RESOLVE (applet: 9).
- Node inspector: 26 nodes (A, 24 cable nodes, B). Interior node k:
  sub-polygon [P_{k−1}→P_k, P_k→o, o→P_{k−1}]; A: [o→S₂, S₂→o]; B:
  [U₃→o wait — B: [o→U₃, U₃→o]] reversed pairs as in view_7 supports.
- Internal-force pipes: Nk = |o−Pk|/sFD per segment, on by default.
- Readouts: A, B (support forces = |o−S₂|/sFD, |o−U₃|/sFD), H (horizontal
  thrust = (xLoadline−x(o))… |x(o)−93.806|/sFD), R = total load.
- Draggables: S₂, V₃ (clamped to rail y 25.2..51.39), A (x only, keeps site
  levels sane), B (x only), plus sliders g, q/g, sFD, length_q, loadSymbol.
- o_2 toggle ported as "hide reaction forces in force diagram".

## Regression (tools: notes/../..; script re-derives the full chain)
python scratchpad regression vs baked XML coords: load line P₀..P₂₄, A₉,
W₈, Z₈, C₉, D₉, E₉ (+ exact parallelogram identity), all 24 cable vertices,
the closing hit on B, T₁₁, xR, P₂/H₁₁ (orange string), support arrow tips
R₈/S₈/C₁₁/D₁₁/E₁₁/F₁₁ — 66 targets, max |Δ| = 4.98e-7 (the baked dump is
rounded to 6 decimals; the homogeneous-coordinate targets agree to 1e-11).
