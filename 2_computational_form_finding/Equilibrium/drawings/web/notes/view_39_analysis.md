# view 39 — Constant force bottom chord truss: construction (decode notes)

Source: view_39/applet_0/geogebra.xml (222 commands); live dumps
scratchpad/live39/*.json (10 step states + BC=4.0 + loadG=0.4 + mode1).
The form-finding twin of view 29.

## Construction

- Force diagram: load line O₁→P₁→Q₁→R₁→S₁→T₁ stacked by loadG·sFD (five equal
  loads); U₁ = Midpoint[Q₁,R₁] = the fan centre; reactions A = U₁→O₁,
  B = T₁→U₁ offset by offsetReactionForces. t_1 = Circle[U₁, BC·sFD] — the
  DESIGNER'S CHOICE (k_4 = radius+1 is only the bigger display circle for the
  orange label at s4). Levels through every load point cut the circle LEFT:
  G₂(O₁ level), F₂(P₁), E₂(Q₁), D₂(R₁), B₂(S₁), C₂(T₁).
- Member table (n: form / force / kind):
  1 R–H₂ / G₂–O₁ deck · 2 H₂–M₂ / G₂–F₂ web · 3 R–M₂ / G₂–U₁ cable ·
  4 H₂–I₂ / F₂–P₁ · 5 M₂–N₂ / F₂–U₁ · 6 I₂–J₂ / E₂–Q₁ · 7 N₂–I₂ / F₂–E₂ ·
  8 N₂–O₂ / E₂–U₁ · 9 J₂–K₂ / D₂–R₁ · 10 J₂–O₂ / E₂–D₂ · 11 O₂–P₂ / D₂–U₁ ·
  12 K₂–L₂ / B₂–S₁ · 13 K₂–P₂ / D₂–B₂ · 14 P₂–Q₂ / B₂–U₁ · 15 L₂–S / C₂–T₁ ·
  16 L₂–Q₂ / B₂–C₂ · 17 Q₂–S / C₂–U₁.
  Deck + webs BLUE (compression), cable RED (tension) — fixed by structure
  (loads only scale downward), matches live colors.
- Form walk: M₂ = Line[R ∥ G₂U₁] ∩ Line[H₂ ∥ G₂F₂], then N₂, O₂, P₂, Q₂ the
  same pattern; last piece Q₂→S ∥ C₂U₁ closes on the right support (check).
- Deck level/stations from free points (baked): deckY 0.4795, xR 0.602,
  xS 10.280, stations [2.215, 4.022, 5.828, 7.376, 8.753], load level 2.007.
- RETIREMENTS (live masks): the circle t_1 is HIDDEN at the resolved state
  (s0); the orange radius p_3 retires when the rays arrive (s5). Ours: circle
  outro RESOLVE, radius outro 6.

## Regression

scratchpad/v39_regress.py: worst 9.4e-14 over default, s9, BC=4.0, loadG=0.4.
