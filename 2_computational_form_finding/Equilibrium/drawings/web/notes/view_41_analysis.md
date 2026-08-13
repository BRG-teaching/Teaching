# view 41 — Continuous beam, cantilever (decode notes, IN PROGRESS)

Source: view_41/applet_0/geogebra.xml (405 commands, the biggest of the six);
live dumps scratchpad/live41/*.json (s0..s7 + R1=5 + R1=10 + mode1 + mode2).
Steps 0..7; mode 0..2 (mode is exposed; also a built-in `node` slider 0..7!).
Sliders: R1 [5..10]=8, sFD 9 [2..10], sLS 0.27, oRF 0.35, sIF 0.08 [0.01..0.1].
Raw dumps: scratchpad/v41_masks.txt (per-step visibility diffs + colors),
scratchpad/v41_cmds.txt (full command chain).

## The drawing (from the live step grid)

Beam: pin A (left) + roller B at ~2/3 span + CANTILEVER beyond B; uniform q.
Loads: R₁ = back-span resultant, R (draggable, apex handle P1 on rail const2),
R₂ = cantilever resultant. The funicular tent (blue dashed) spans A''→P1→B''
with H_tension (red, in-beam tie) and H_compression (blue) measured on a rail
at the BOTTOM of the force diagram (red H_tension left + blue H_compression
right pieces).

## Step narrative (applet, from masks + captions)

- s1: the full-q tent + reactions A_V, B (orange flash) + H_tension apparatus
  (internalForceHorTen macro).
- s2: **Subsystem 1** — only the BACK SPAN loaded (orange q piece): fan +
  A_V1/B_1 reactions.
- s3: **Subsystem 2** — only the CANTILEVER loaded (orange): A_V2 points DOWN
  (uplift!), B_2, H_compression apparatus (internalForceHorCom macro).
- s4: **Superposition — H_internal = H_tension − H_compression = 0** (text5_1):
  both fans merged back, orange strip rays appear.
- s5: strip refinement fan (orange→grey rays, e_10..s_7 family).
- s6: refined funicular resolves (removes the coarse tent helpers A_2, D_2,
  K_3, c_3, f_5, g_5, g_6, g_9, t_2).
- s7: the red refined M-curves + red mirrored fan pieces (a_11..w_9 family)
  — same mirror trick as view 40.

## Colors at s0

blue: a_1/f_9 polylines (refined funiculars), b_7 d_7 i_7 j_7 m_10 t_6 segs
(tent/strings/H_comp rail piece); red: d_5 d_8 l_10 t (H_tension rail piece +
M pieces); green: loads/reactions (u u_1 u_4 u_7 v v_1 v_2 v_3 v_7 w_3 vectors,
d_6 e_8 k_1 l_1 m_1 n_10 o_1 p_10 segs); grey rails const2 j_9; black beam/
slab/supports + circle p_4; poly1 green q band, poly2/poly3 support/slab.
White draggables: A'', B(!), FD_0, P1 (+ frame). NOTE: the roller B itself is
draggable along the beam (Point[j_9]) — the cantilever length changes!

## Key chain fragments (from v41_cmds.txt)

- Beam: A on level e; slab Polygon[A C G F]; U_4 = Midpoint[bottom edge];
  j_9 = [U_4, C]: **B = Point[j_9] draggable** → back span A–B + cantilever B–C.
  D = Midpoint[A,B]; E = Midpoint[B,C]. A'' = Point[slab bottom edge] (drag),
  B'' = level of A'' at the B vertical; apex P1 = Point[const2] (drag, on the
  C_1/E_1 rail above the beam at the D-vertical... check exact).
- Tent strings: n_2 = [A'' P1], f_3 = [P1 B'']; force: h_3 = Line[FD_0 ∥ n_2],
  i_3 = Line[FD_2 ∥ f_3] → J_1 = pole; A_2 (H level of J_1 on b_3)...
- FD_1/FD_2 presumably from R1·sFD/100 like view 40 (VERIFY in expressions).
- H rails: internalForceHorTen / internalForceHorCom macros + T/V/I/M_1/L_1
  offset-circle apparatus around FD_2/FD_0 on the bottom rail.
- 7-division t_3 of [FD_1, FD_2] (cantilever strips) + more for the back span.

## Next steps

1. Finish the chain decode (subsystem fans: which points; the H rail geometry;
   the s7 mirror family) — grep v41_cmds.txt rather than re-dumping.
2. Regression: v40_regress.py as the template; check FD_1/FD_2 expressions +
   P1/A''/B draggable coords from live41/s0.json.
3. Module: view_40 skeleton; steps 0-9 (site, R's + load line, tent + pole,
   reactions + H_tension, subsystem 1, subsystem 2 (uplift!), superposition
   H=0, strips, refined funicular + M, resolve). mode1/mode2 dumps show the
   applet's own node-inspector states — port as our inspector.

## Full chain decode

Verified against live41/s0.json (all coords below are s0, sFD=9, R1=8, sLS=0.27,
oRF=0.35, sIF=0.08). Force scale: 1 drawing unit = 100/sFD = 11.11 force units.
Physical anchors: A=(4.1109,6.2657), C=(9.7201,6.2657), slab top y=6.8022,
B=(7.9604,6.2657) → back span |i|=3.8495, cantilever |n|=1.7597, D=(6.0356)
mid-span-AB, E=(8.8402) mid-cantilever, Z/U_4 x=6.9155 = mid-slab.
Load line: FD_0=(14.0544,9.4048), FD_1=(…,8.0189), FD_2=(…,7.3855).
R₁=1.3859, R₂=0.6334, R=2.0193, A_V=0.5481, B=1.4712, B_1=A_V1=R₁/2=0.6929,
B_2=0.7783, A_V2=−0.1448 (UP-side negative → uplift), H=2.1529 (=23.92 force).
Checks: A_V+B=R ✓, B_1+B_2=B ✓, A_V1+A_V2=A_V ✓, M_B=w·c²/2=0.36·1.7597²/2
=0.5573 = H·Δy_B = 2.1529·0.2589 ✓ (w = R1·sFD/100/2 = 0.36/unit).

### 1. Tent + funicular construction (form diagram)

Slab: poly3=Polygon[A C G F], edges a_7 (A–C soffit), c_7, g_7 (top), f_7 (F–A
left). U_4=Midpoint[a_7]; j_9=Segment[U_4 C] grey → **B=Point[j_9]** (roller
only draggable on the right half of the soffit). i=Segment[A B], D=Midpoint;
n=Segment[B C], E=Midpoint. Verticals: al4 (D), k (B), j (E), c (Z=mid top
edge, x=6.9155), h (C). **A''=Point[f_7]** (drag, y=6.4134); q,g_3 horizontals
through A''; B''=k∩g_3=(7.9604,6.4134); **B1=k∩q ≡ B'' (duplicate!)**;
C1=h∩q (C vertical at A'' level, handle only). D1=q∩al4; D1'=D1+(0,0.1);
C_1=(6.9155,6.5134)=Line[D1',x]∩c; E_1=(6.9155,7.2061)=s∩c (s = horizontal
through yPosConstR1); **const2=Segment[E_1 C_1]** = grey apex rail at MID-SLAB
x=6.9155 (not the D vertical!); **P1=Point[const2]** (drag, y=7.1275).
(const1=Segment[W D1'] at the D vertical + R1_2=Point[const1] + i_1/R2/rays
c_1,d_1,e_1 + gold vectors w 'A', r 'B' = DEAD leftover apparatus, show=false.)

Coarse tent (s1, dyn-orange): n_2=[A'' P1], f_3=[P1 B'']. Pole: h_3=Line[FD_0
∥n_2], i_3=Line[FD_2 ∥f_3] → **J_1=(11.9015,8.8566)**; rays j_3=[J_1 FD_0],
k_3=[J_1 FD_2]; a_4=[J_1 K_1] RED 'H_tension' (K_1 = load line at pole level).

Subsystem-1 tent: **H=(x_J1, y mid FD_0FD_1)=(11.9015,8.7119)** = sub-1 pole
(A_V1=B_1 → pole at mid-height). l_3=Line[A'' ∥r_1=[H FD_0]], e_3=Line[B''
∥q_1=[FD_1 H]] → **G_1=(6.0356,7.0329)** apex exactly on the D vertical.
Strings f_1/g_1 (s2, dyn) = t_6/b_7 (s0 blue dashed): A''–G_1–B''.

Subsystem-2 apex: j_6=Line[B'' ∥i_6=[W_2 L_3]] → **H_1=j_6∩j=(8.8402,6.7315)**
on the E vertical. Strings: d_7/h_1/q_9=[B'' H_1] (blue dashed at s0),
p_9/t=[A'' H_1]. Chord: b_10=Line[FD_1 ∥t], s_5=Line[A'' ∥b_10] = t extended;
**C1'=s_5∩h=(9.7201,6.7907)**; d_5=[H_1 C1'] — t+d_5 = ONE straight RED line
A''→H_1→C1' = the CLOSING LINE (slope 0.0673 = A_V2/H). f_5=[B'' C1'],
g_5=[A'' B''] dashed helpers (step 5; g_5 = the s7 mirror axis).
Label anchors (expressions, +2.5·sLS above): R1_1→u onto G_1, R2_1→v onto H_1,
A_1→v_2 onto P1; R/S/U below A/C1/B (dead except U).

Refined funiculars (see §4): a_1 = A''→…→B1 (back span), f_9 = B1→…→C1'
(cantilever), both BLUE at s0. Kink at B1: slope −0.3218 → +0.3615, Δ·H =
1.4712 = B ✓. **M(x) = H · (blue funicular − red closing line)**; M=0 at A''
and C1', hogging M_B = H·0.2589 at B ✓.

### 2. Force diagram

Lanes: right x+oRF (P,T,V=M_1,K_2,L_2,N_1), left x−oRF (Q,I=L_1,E_3,G_3,N_3),
far-left x−2·oRF (Z_3,M_5,O_5,R_5), pole column x=11.9015 & x−oRF; bottom rail
b_3 y=4.2357 (from C_2); mirror axis b_1=Segment[F_1 D_2] ≡ j_1 (the load-line
vertical x=14.0544, F_1 top y=9.9373=B_2 level, D_2 on rail).
Main chain: u_1=Vec[FD_0 FD_1] 'R_1', s_6=Vec[FD_1 FD_2] 'R_2', v_8/w_2=
Vec[FD_0 FD_2] 'R'; J_1 rays j_3/k_3 (s1) → i_7=[FD_0 H], j_7=[H FD_1] blue at
s0 (|each|=2.262); d_8=[H P_5] RED closing-line ray — P_5=b_1∩Line[H ∥t] =
(14.0544,8.8566) = K_1: **J_1 sits exactly A_V2 above H**, so the closing ray
from H hits the load line at main-pole level. e_8=[P_5 T] tick; v_1=Vec[T P]
'A_V' (right lane, pole level→FD_0); w_1=Vec[V T] 'B' (FD_2→pole level, steps
1,4-6 only — at s0 B lives on the pole column instead: u_7=Vec[S_5 H]);
ticks d_6=[FD_0 P], b_6=[FD_2 V] (i_2/r_10 dupes), q_10 degenerate variant.

SUBSYSTEM 1 (s2 family, poles/stacks): q_1=[FD_1 H], r_1=[H FD_0] fan rays
(dyn blue→orange); c_4=[H J] 'H_tension' (J=mid FD_0FD_1); r_3=Vec[K_2 L_2]
'B_1' (right lane FD_1→H level), v_4=Vec[L_2 N_1] 'A_V_1' (H level→FD_0);
i_9=[FD_1 K_2] tick; form: f_1/g_1 tent + support arrows p_3=Vec[H_2 G_2]
'A_V_1' (pin A, up), q_3=Vec[J_2 I_2] 'B_1' (roller, up) — 0.54=2·sLS symbols;
bands **poly4=Polygon[K I_1 D_1 M]** (back span, fill #993300 α.1 = orange
"loaded") + **poly5=Polygon[I_1 L O D_1]** (cantilever ghost, white α.1, grey
dashed edges i_12/l_11/o_4). K=Point[f] (band bottom, drag w/ showHandles),
M=K+(0,sLS), L/O on the C vertical, I_1/D_1 split at the B vertical.

SUBSYSTEM 2 (s3 family): TWO reaction stacks with anchors **Q_2=Point[e_5]=
(13.7044,5.5225)** (B stack, bottom-left) and **M_2=Point[m_5]=(14.0544,
8.3611)** (A_V stack) — both white drag handles visible only at step 3.
B stack: l_5=Vec[Q_2 N_5] 'B_1' (N_5=Q_2+r_3); n_5=Vec[W_2 Z_2] 'B_2' on the
b_1 lane (W_2=V_2+r_3, V_2=U_2= tangent point of Circle[Q_2,oRF] on b_1 —
e_5 is at x−oRF so the circle is tangent to the load line, giving the
projection; Z_2=(14.0544,6.9937)=Q_2+B); w_5=Vec[Z_3 M_5] 'B' far-left lane;
ticks n_9/m_9/a_8. Its pole **L_3=Z_2+w_6=(16.2074,6.9937)** (w_6=Vec[D_2 K_3]
=(H,0)): rays i_6=[W_2 L_3] (RED dashed, ∥ B''–H_1 string) and h_6=[Z_2 L_3]
'H_compression' (RED, horizontal, |H|). A_V stack: n_6=Vec[G_3 N_3] 'A_V_1'
(left lane, G_3=M_2−(oRF,0), N_3=G_3+v_4); u_6=Vec[J_3 F_3] 'A_V_2' pointing
DOWN on the M_2 vertical (J_3=(14.0544,9.0540)=M_2+A_V1, F_3=M_2+v_1=M_2+A_V);
q_5=Vec[O_5 R_5] 'A_V' far-left; ticks l_9/b_8/k_9 (c_6 dupe). Its pole
**M_3=J_3+w_6=(16.2074,9.0540)**: rays m_6=[F_3 M_3] (RED dashed, ∥ the A''–H_1
chord!) and l_6=[J_3 M_3] 'H_compression'. Form: p_9=[A'' H_1]+q_9=[B1 H_1]
strings, u_5=Vec[G_2 H_2] 'A_V_2' DOWN at pin (uplift), w_4=Vec[J_2 I_2] 'B_2'
up at roller, bands **poly6=Polygon[I_1 L O D_1]** orange (cantilever loaded) +
**poly7=Polygon[K I_1 D_1 M]** ghost + text4 'q', internalForceHorCom (§3).

s4 superposition: text5_1, h_1=[B'' H_1], poly1/k_1/l_1/o_1/m_1 flash orange,
c_10=[FD_1 L_5] (red)/d_10=[FD_2 L_5] (blue) rays to the cantilever pole,
b_6/u_4/w_3/f_1/g_1/i_11 return, s_6 flashes.

### 3. H_tension / H_compression apparatus

NOT macros in this view: **internalForceHorTen = Segment[A'' B''] and
internalForceHorCom = Segment[A'' B''] — the identical in-beam bar** (|3.85| =
|i|), captions H_{tension}/H_{compression}. Ten: base red, dyn-orange steps
1-3, shown (1≤step≤2 ∨ node=1) → the tie holding the sub-1 tent. Com: base
red, dynamic BLUE in mode 0/2, shown step=3 only → the strut for sub-2.
Bottom rail (y=4.2357, dashed light-blue line b_3): A_2 = pole x dropped
(s_2∩b_3), D_2 = load-line foot, K_3=Mirror[A_2 b_1]; **c_3=[A_2 D_2] RED
'H_{tension}' and g_6=[D_2 K_3] BLUE 'H_{compression}', both = 2.1529 (23.92
force)** — equal BY CONSTRUCTION (mirror), ∀ P1/R1 → H_int = H_t − H_c = 0
(text5_1's claim, made visual). Drop guides t_2=[O_1 A_2] (from y=9.9373) and
g_9=[K_3 R_4] (mirrored), black dotted. Whole rail shows 1≤step≤5 only —
absent from the finished s0 view. (r1lo check: pole x 12.7088 → both 1.3456.)

### 4. Strip refinement (s5-s7)

Back span: list1=segmentdivision[A'' B1 8] → PL1_1..7 + verticals al1..al7;
list2=segmentdivision[FD_0 FD_1 7] → A_3,B_3,C_3,D_3,S_2,T_2 (top→down);
fan m_7,n_7,p_7,q_7,r_7,s_7 = Segment[H ·] to those, thin black dyn-orange@s5.
Walk: PL1_1'=al1∩f_1; n_8=Line[PL1_1'∥m_7]→PL1_2'=al2∩n_8; p_8∥n_7→PL1_3';
q_8∥p_7→PL1_4'(∩al4); r_8∥q_7→PL1_5'; s_8∥r_7→PL1_6'; PL1_7'=al7∩g_1;
**a_1=PolyLine[A'' PL1_1'..PL1_7' B1]** (8 strings ≙ R₁ in 7 point loads).
Cantilever: list4=segmentdivision[B'' C1' 8] → PL4_1..7 ON the chord (uniform
x because the chord is straight) + verticals g_8,h_8,i_8,j_8,k_8,l_8,m_8;
list3=segmentdivision[FD_1 FD_2 7] → V_3,W_3,U_3,P_2,O_2,T_3 (top→down);
**cantilever pole L_5=(16.2074,8.1637)** = Line[FD_2 ∥d_7] ∩ Line[FD_1 ∥t] —
on the MIRRORED pole x; its ray to FD_1 ∥ closing chord, to FD_2 ∥ B''H_1.
Fan e_10=[W_3 L_5],f_10=[V_3],g_10=[U_3],h_10=[T_3],i_10=[P_2],j_10=[O_2].
Walk: PL4_1'=g_8∩d_7; t_8∥h_10→PL4_2'; a_9∥j_10→PL4_3'; b_9∥i_10→PL4_4';
c_9∥g_10→PL4_5'; d_9∥e_10→PL4_6'; e_9∥f_10→PL4_7'=m_8∩s_5 (lands on chord);
**f_9=PolyLine[B1 PL4_1'..PL4_7' C1']**. All PL•/lists/H/L_5/J gated by o_2
('show handles parabola construction'). s6 = cleanup only (−A_2 D_2 K_3 c_3
f_5 g_5 g_6 g_9 t_2).
s7 mirror: FORM across **g_5 = the horizontal A''–B'' level (y=6.4134)**:
V_4..D_5=Mirror[PL1_k' g_5]→**r_9** (red polyline), E_5..K_5,C1''→**s_9**,
t_9=[A'' C1''] BLUE mirrored chord → M-diagram hung on the tension side.
FORCE across **b_1/j_1 (load-line vertical)**: H'=Mirror[H]=(16.2074,8.7119)
fan t_10=[FD_0 H'],a_11..h_11 (A_3,B_3,C_3,D_3,S_2,T_2→H'),j_11=[FD_1 H'],
c_11=[P_5 H'] (blue closing ray); P_1=Mirror[L_5]=(11.9015,8.1637) fan
n_11=[FD_1 P_1],p_11=[P_1 FD_2],q_11,r_11,s_11,t_11,a_12,b_12 (list3→P_1);
reactions on the mirrored (left) lane: u_2=Vec[Q_1 T'] 'B', w_9=Vec[T' P']
'A_V' with ticks c_12/e_12/f_12 (w_1 hides at s7). NODE-ONLY extra (node≥7):
R_1,T_1,U_1,V_1=Mirror[S_5,T_5,U_5,V_5 j_1] pole-column mirror with g_12,h_12,
u_10 'R_2', j_12, n_12, v_10=Vec[R_1 H'] 'B'. (a_11-family is STEP-only ≥7;
t_10/c_11/j_11/n_11/p_11 are both.)

### 5. Reaction arrows at s0 (all green #009900 unless noted)

- u  = Vec[R1_1 G_1] 'R_1' ↓, symbol len 2.5·sLS=0.675, onto sub-1 apex G_1.
- v  = Vec[R2_1 H_1] 'R_2' ↓ 0.675 onto H_1.   - v_2 = Vec[A_1 P1] 'R' ↓ 0.675.
- u_1 = Vec[FD_0 FD_1] 'R_1' true 1.3859 (load line).
- v_1 = Vec[T P] 'A_V' ↑ true 0.5481, right lane x+oRF, pole level→FD_0 level.
- u_7 = Vec[S_5 H] 'B' ↑ true 1.4712 on the POLE COLUMN (S_5 = H−(0,|w_1|)).
- v_7 = Vec[U_5 T_5] 'R_2' ↓ true 0.6335, pole column −oRF lane (T_5=S_5−
  (oRF,0), U_5=T_5+(0,R₂), V_5=U_5+(oRF,0)); reading: V_5=H−B+R₂ → l_10=[V_5
  FD_1] RED ∥ closing line, m_10=[S_5 FD_1] BLUE ∥ post-B string (B''–H_1).
- u_4 (roller B) / w_3 (pin A) 'B'/'A_V' ↑ 0.54=2·sLS SYMBOLS (not to scale!),
  v_3 = 'A_H = 0' horizontal 0.54 at the pin — all supportHinge/Roller macro
  outputs (G_2/H_2 below A at x=4.1109, I_2/J_2 below B).
- green segs: d_6=[FD_0 P], e_8=[P_5 T], n_10=[U_5 V_5], p_10=[T_5 S_5] ticks
  (all 0.35=oRF, dashed #007F00); k_1,l_1,o_1,m_1 = poly1 q-band edges.
Degenerate fallback (shows iff |A_V|<0.02 ∨ |n|=0, when the guarded set dies):
w_2 'R', w_7=Vec[M_1 T] 'B', u_8=Vec[T P] 'A_V' (+ q_10,r_10,s_10 ticks);
u_8 carries a magic `abs(n) < 2.7` in its condition.

### 6. Draggables (saved s0 defaults)

| name | drives | rail | s0 |
|---|---|---|---|
| B | roller pos / cantilever len | j_9 = soffit U_4→C (y=6.2657, x 6.9155..9.7201) | (7.9604, 6.2657) |
| A'' | funicular anchor level | f_7 = slab left edge (x=4.1109, y 6.2657..6.8022) | (4.1109, 6.4134) |
| P1 | coarse-tent apex → pole dist H | const2 (x=6.9155, y 6.5134..7.2061) | (6.9155, 7.1275) |
| FD_0 | force-diagram origin | free | (14.0544, 9.4048) |
| frameBL / fBR | frame corner / scale | free / fxb horizontal | (2.5900, 2.9036) / (19.4432, 2.9036) |
| K (showHandles) | q-band height | f (x=4.1109) | (4.1109, 9.0315) |
| Q_2 (step 3) | sub-2 B-stack anchor | e_5 (x=13.7044) | (13.7044, 5.5225) |
| M_2 (step 3) | sub-2 A_V-stack anchor | m_5 (x=14.0544) | (14.0544, 8.3611) |
| layout (hidden): A,F,G on e/f/g; yPosBeam(0,6.2657), yPosConstR1(0,7.2061), C_2(0,4.2357)=rail y, B_2(0,9.9373)=frame-top/guide y on yAxis; R1_2 on const1 = dead | | | |

### 7. Oddities / gotchas

- The s1..s7 dumps were captured in **mode 0 with the step slider moved**, so
  they show mode-0 ∪ step-k (e.g. v_1 stays visible at s7; in real mode 1
  step 7 it hides). mode1.json/mode2.json (step=node=0) hide the whole finished
  layer → the composite drawing is EXCLUSIVE to mode 0; mode 1 shows the step
  slider, mode 2 the node slider (condition `step: mode≟1`, `node: mode≟2`).
- Node walkthrough (mode 2): 0 site · 1 tent+R+A_V/B+tie (poly1 flashes
  orange) · 2 R₁ + sub-1 strings/rays (q_12,p_12,t_12,r_12 dupes of t_6,b_7,
  i_7,j_7) · 3 A_V + closing ray s_12/d_8 + p_9 (poly4 recolors GREEN via
  dynamic color) · 4 B: u_4, u_7, m_10, h_1 · 5 R_2: v, v_7, l_10, n_10, p_10,
  poly6+text4 · 6 = the full mode-0 composite · 7 mirrored M presentation.
  Node uses dedicated duplicate segments (p_12..t_12, u_9/v_9/w_8, g_12..v_10)
  rather than reusing the step objects.
- "Orange flash" everywhere = DYNAMIC colors: XML base colors are black/red/
  blue/green with dynamicr/g/b `If[step≟k,(1,.5,0),base]` — 152 dynamic color
  attrs. Port = per-step recolor, not separate objects.
- Bugs/stale bits in the original: d_8's blue channel says `step≟4 ∨ step≟4`
  (dup, likely meant 5); e_8's RGB branches disagree (red keys on step 1/2,
  green/blue only on node 2/3); v_7/u_10 carry step color branches although
  their conditions never fire in step mode; internalForceHorCom's mode-0 blue
  branch is dead (it only shows at step 3).
- Duplicates by construction: B1 ≡ B'' , V≡M_1, I≡L_1 (t_1/k_2 same circle),
  q≡g_3, c_6≡k_9, P_5≡K_1 (numerically, since J_1 = H+(0,A_V2)), w_7≡w_1,
  u_8≡v_1. Dead leftovers: const1/R1_2/i_1/R2/rays c_1,d_1,e_1, gold w/r
  vectors, N (=K−sLS), S — all show=false with no condition.
- Almost EVERYTHING is guarded by `(abs(v_1)>0.02) ∧ (abs(n)≠0)` → dragging B
  to C (no cantilever) or to the A_V=0 point collapses the lesson to the
  fallback arrow set (§5). Captions themselves all check out against s0
  values — no numeric texts exist, so nothing stale in the labels; texts are
  static (text3/text4 'q' both exist: one per band family).
- Q_2's rail e_5 sits at exactly x_FD0−oRF so Circle[Q_2,oRF] is TANGENT to
  the load line → U_2=V_2 = clean projection (used to hang the sub-2 stack).
