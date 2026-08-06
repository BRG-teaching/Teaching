# view 46 — Internal forces in a beam – point load

Ground truth: https://block.arch.ethz.ch/eq/drawing/view/46 (driven headless via
CDP; states dumped to scratchpad/live46/*.json + screenshots). The applet has
**no mode/step/node sliders** — the whole drawing shows at once; the staging in
`web/views/view_46.js` is ours.

## Decode summary (applet_0/geogebra.xml)

Four vertically stacked bands, tied by three DOTTED black verticals (`b_2`,
`c_2`, `d_2`, x = 0 / x(C) / x(B), y 1.9687 … −18.589):

1. **Form diagram** (y = 0): beam `A(0,0)–B(9.9055,0)` (th3), `C` draggable on
   the beam, load `u = F→C` green th5 (length scaleLoadSymbol), reactions
   `v`/`w` green up-arrows at the supports (captions A_V/B_V).
2. **Trial funicular** (just below): `D` draggable on the y-axis, trial pole
   `I` ("o′") free; grey rays `f = G–I`, `g = I–H_1`; strings `j = D–J`
   (∥ f, J on the load's line of action), `k = J–K` (∥ g, K on the vertical
   through B); grey **dashed** closing `l = K–D`; text "O′" at the centroid of
   D-J-K. The parallel to `l` through o′ (`r`) cuts the load line at
   `N` (caption "c") — the division point; `t = I–N` grey dashed.
3. **V-diagram** = horizontal projections of the load-line points: baseline
   `d_1 = P–Q` black th3 at the LEVEL OF c; red th3 outline `f_1 g_1 h_1 i_1
   j_1` = P→R (jump +A_V at A), R→T (level a), T→U (drop F at C), U→S (level
   b), S→Q (close at B). Dotted guides `k_1 = T–G`, `n_1 = H_1–S`,
   `p_1 = O–Q`.
4. **Force diagram** (right, `G` free = load line top "a"): `H_1 = G −
   (0, F_d/scaleForceDiagram)` = "b"; `u_2 = G→H_1` green th5 caption F.
   Pole distance `H` (slider 1..5, red): `M = H_1 − (H, 0)`, red th3 segment
   `l_1 = H_1–M` caption "H"; pole `O` ("o") = (x(M), y(N)) — **at the level
   of c**, guide `m_1 = M–O` dotted; rays `b_1 = G–O`, `c_1 = O–H_1` black
   th2, closing ray `a_1 = N–O` black dashed.
5. **M-diagram** (baseline `mLine = L1–L2` black th3, L1 draggable on the
   y-axis at y = −13.1885): funicular polygon `funicularLine = L1–FPM–L2`
   (th2 black, FPM = intersection of the parallels to the rays through
   L1/L2 — closes under the load because o is at the level of c); 10 station
   verticals (hidden `loa0..9` at x = span/10·(k+½)); black ordinates
   `segF1..10 = GPk–FPk`; moment points `MPk` mirrored BELOW the baseline at
   distance |GPk–FPk|·scaleForceDiagram·H; red ordinates `segM1..10`; red th3
   outline `mm*` = L1 → MP1 … (MPM inserted at the load) … MP10 → L2.
   M(x) = H · y(x): 1 unit :: 1 kNm exactly (H_kN = H·sFD, y_m = ordinate).
6. **Offset reaction chain** (slider scaleOffsetReactionForces 0..2 = 0.5):
   `C_1/D_1/F_1` = b/c/a shifted right; green arrows `v_1 = C_1→D_1` (B_V,
   hidden when x(C)=x(A)) and `w_1 = D_1→F_1` (A_V, hidden when x(C)=x(B));
   green dashed whiskers `e_2 f_2 g_2`.
7. Region texts (text6..text10): "Form Diagram 1 unit :: 1 m", "Trial
   Funicular Construction", "V - Diagram 1 unit :: 1 kN", "M - Diagram
   1 unit :: 1 kNm", "Force Diagram 1 unit :: {sFD} kN".
8. Hidden machinery: line-load points LP1x/LP2x + `loa*` (shared with the
   view-47 applet family, everything except the station x's unused here),
   `divisions = 10`, export `frame` (never drawn).

## Toggles / sliders (defaults)

| control | kind | default | notes |
|---|---|---|---|
| F_{d} | slider 1..5 | 2 | page "forces" flyout, label F |
| scaleForceDiagram | slider 0.5..5 | 0.5 | page "scales" flyout |
| scaleLoadSymbol | slider 0.1..2 | 1.3 | page "scales" flyout |
| scaleOffsetReactionForces | slider 0..2 | 0.5 | page "scales" flyout |
| H | slider 1..5 | 3 | red, drawn ON the canvas below the force diagram |
| showBow | checkbox | false | Bow region letters A/B/C (form) + "a" (force side) |
| showHandles | checkbox | false | handle points + captions b, c, o |
| divisions | hidden | 10 | M-diagram stations |

Draggable free points: B (x-axis), C (on beam), D (y-axis), L1 (y-axis),
G (free), I (free).

## Regression

`scratchpad/v46_regress.py` recomputes the full chain (H_1, trial J/K,
division N, M/L/O, V-diagram P Q R T U S, funicular FPM, GP/FP/MP 1..10,
MPM, offset C_1/D_1/F_1) against live `ggbApplet` dumps:

- default: 49 points, max err **3.4e-14**
- dragC (C→1.8): 49 points, max err 9.1e-14
- dragC_F (F_d 3.5, H 4.2, sFD 1.1): 49 points, max err 6.8e-14
- offset15 (offset 1.5): 49 points, max err 3.4e-14

## Hand-written staging (20 steps)

intro → beam + support verticals → load ‖ load line a–b → trial pole o′ +
rays → trial strings 1, 2 → closing → c → reactions (form arrows ‖ offset
chain b→c→a) → V baseline (level c) → V left (+A_V) → V right (−B_V) → pole
distance H → pole o (level of c, closing ray horizontal) → M baseline L1–L2 →
string 1 ‖ ray o–a → string 2 ‖ ray o–b → ordinates y → M = H·y (mirrored
red) → M outline + M_max → final (readouts A_V, B_V, H kN).

- V/M diagrams keep the applet's pure red rgb(255,0,0); trial grey; guides
  dotted black like the applet (dash 0.28–0.5).
- Strings numbered 1, 2 in BOTH diagrams (funicular ↔ rays), dual-hover
  linked; loads/reactions linked form ↔ force; ghost preview on the force
  side (load line, rays, H).
- FPM computed as the true intersection of the two string lines (the
  applet's s_1 ∩ t_1) and the sampled ordinates interpolated on the drawn
  polyline, so drawing stays self-consistent under every drag.
- Draggable: C, B, G, o′, D, L1, and the pole o / point M horizontally
  (maps to the H slider). Reactions in the force diagram hide when the load
  sits exactly on a support (the applet's x(C)≠x(A)/x(B) conditions).

**Node inspector**: the beam itself has no joint-equilibrium nodes (it works
in bending, not axial force), but the three FUNICULAR nodes do close force
triangles: at A {A_V offset ↑, string 1, closing (force H)}, under F
{F ↓, string 2, string 1}, at B {B_V offset ↑, closing, string 2} — slider
0..3 + click-to-inspect on the funicular polygon's vertices; reaction sides
drawn on the VISIBLE offset arrows (D_1→F_1 / C_1→D_1). Internal-force pipes
are intentionally absent: no member carries axial force in this view.

## Deviations from the applet

- The applet's showHandles checkbox is replaced by the house "show points"
  toggle (default ON) with the letters a, b, c, o, o′ always labeled; Bow's
  region letters stay behind the "show Bow notation" toggle (default off,
  like the applet). The odd fixed-position "a" text near c is reproduced
  relative to the load line.
- The M-diagram outline connects the sampled MP points exactly like the
  applet's `mm*` If-chain (peak inserted at the load); for a point load all
  samples are collinear with the true triangle, so the shape is exact.
- Support letters A/B and load point C are labeled (house style; the applet
  leaves the points unlabeled unless showBow/showHandles).
- Region titles placed centered left of each band (the applet left-anchors
  them at x = −6.5).
