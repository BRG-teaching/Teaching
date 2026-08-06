# view_32 — Airport Hangar, P. L. Nervi — applet decode

Source: `view_32/applet_0/geogebra.xml` (792 objects) + the LIVE applet
(https://block.arch.ethz.ch/eq/drawing/view/32) driven headless via the
ggbApplet API (per-step `getVisible` diff; coordinates at default and a
dragged state). Title: **Airport Hangar, P. L. Nervi**.

## The model

- Vault span FP0 = (0,0) → B = (36.9, 0), crown K = (18.45, 11.5117)
  (FIXED in the applet), 16 strips; lines of action at the strip centers
  x = 2.30625·(k+0.5). Everything is a THREE-POINT funicular problem
  (springing–crown–springing), solved three times over the same span:
- **Parabola** (uniform load per unit span, P_d = w_d·span/16 each):
  two half-span trials — FPa0 (on the left wall) with pole o1', rays to
  LL0..LL8, closing chord to the crown vertical → parallel through o1'
  cuts the load line at B_1 (our i₁); FPb8 (on the crown vertical) with
  pole o2' for LL8..LL16 → C_1 (i₂). Parallels to the crown chords
  FP0–K / K–B through i₁/i₂ meet at `pole` (o). Funicular FP0..FP16→B
  (r_1, black th3, permanent).
- **Catenary** (load per unit ARC): circles at the arch vertices measure
  the strip chords (circle at FP_j through the mirrored chord midpoint,
  radius = half the mirrored strip chord; strip 8 uses |FP8−K|); the
  corrected load line LC: edge k = w_d·(s_k+s_{k+1})/2·sFD (edge 1 =
  w_d·(s_1+0.5·s_2), then mirrored about the horizontal through LC8).
  A HIDDEN trial (trialpole, FPD0) hangs the LC funicular, its crown /
  springing crossings give the divisions J_3/I_3 → `catenarypole` (o₁)
  → the catenary arch FPE (orange th3 in the applet).
- **Arch under Q**: positionQ ∈ 1..16, Q = factorQ·P_d widens its slot
  in the load line LLB (R+Q). A second HIDDEN trial (poleB, FP_B0) gives
  F_1/G_1 (the applet gates them COND[step≟11] — unreachable, step max 7)
  → `poleC` (o₂) → the arch a_3 (orange th3) + green reactions.
- Image `pic1` = section_72.jpg (746×331), anchors Image1 =
  (−12.0999, −13.7259) / Image2 = (49.2294, −13.9109), alpha 0.75,
  COND[showImage] (checkbox on the page, default TRUE — visible at every
  step). Shipped as the actual image `web/assets/view_32_section.jpg`.
- Site: ground line y = −12.5 (m_3/d_3/l/n overlap), 16 dotted strip
  action lines (y −16.12..28.28), dashed verticals x = 0 / 18.45 / 36.9.
  Q's strip line turns orange at steps 0/6+ (dyncol on positionQ).

## Controls (live-verified)

| control | kind | default | range | effect |
|---|---|---|---|---|
| mode | site slider | 0 | 0/1 | 1 shows step |
| step | slider | 0 | 0–7 | staging; 0 = final |
| factorQ | in-canvas slider | 1.5 | 0–2 | Q = factor·P_d (steps 0, ≥6) |
| positionQ | in-canvas slider | 4 | 1–16 | strip carrying Q (page JS moves ML) |
| w_d | flyout slider | 1.1 | 0.5–2 | load per unit length |
| scaleForceDiagram | flyout slider | 0.5 | 0.5–2 | force-diagram scale |
| divisions | hidden slider | 16 | 16–16 | fixed |
| showImage | checkbox (page) | true | | the section drawing |
| w_2 "show points" | checkbox, hidden | false | LL/LLB load-line points |
| o_3 "show points 2" | checkbox, hidden | TRUE | LC load-line points (red) |
| o_4 "show vectors" | checkbox, hidden | false | LC edge arrows |
| showHandles | checkbox, hidden | false | drag handles + image anchors |

## Applet steps (mode 1; current elements flash orange) → ours

| applet | content | ours |
|---|---|---|
| 1 | loads P_d (highlight) + load line R (v_5 green th5, one arrow) | 2 |
| 2 | the WHOLE parabola construction: both trials + closings + parallels → i₁/i₂; crown chords (orange dashed); pole o + rays; arch r_1 | 3–6 |
| 3 | parabola reactions: form w_4/z_4 (length loadSymbol, along the end sides), force z_5/u_5 ON the outer rays; foundation lines k_3/l_3 (≥3, permanent); trials retire | 7 |
| 4 | strip-length circles + corrected loads (orange, unlabeled) + LC line + red LC points | 8 |
| 5 | catenary: pole o₁ + rays + arch g_6 + orange reactions; the P_d loads hide (COND step≠5), circles retire | 9 |
| 6 | +Q: LLB (R+Q, Q slot orange), Q arrow, strip highlight; the whole parabola force diagram (LL, o, fan) retires | 10 |
| 7 (=0) | poleC (o₂) + rays + the arch a_3 + green reactions A/B | 11–13 |

## Regression (scratchpad v32/regress32.py vs live coordinates)

- default: 129 points (LL/LLB/LC ×17, both trials, FP/FPE/FP_C ×16,
  divisions, poles, crossings), max |err| = 9.9e-14
- drag1 (w_d = 1.6, sFD = 0.8, factorQ = 2, positionQ = 9): max 8.5e-14
- all three arches land on B to ≤1.2e-14; P_d1 measure = |FP1FP2| =
  3.4146794125565 (matches the applet's distanceE3F3 exactly).

## Deviations from the applet (deliberate)

- Palette: corrected loads / LC line / catenary reactions / Q / +Q load
  line GREEN (applet: orange), catenary arch dark grey (applet orange),
  the arch under Q resolves BLUE = compression (applet orange). Orange is
  reserved for the node inspector (project palette).
- The applet's step 2 (everything at once) is staged as our 3–6; its
  step 7 as our 11–13. Divisions i₁/i₂ of the +Q load line are shown
  with their parallels (the applet computes them but gates them at an
  unreachable COND[step≟11]); the trial that finds them stays hidden as
  in the applet.
- Form reactions of the +Q arch are drawn along the +Q arch's own end
  tangents; the applet anchors them on the CATENARY arch's end directions
  (j_8/l_8 use e_6/f_6 — an applet inconsistency).
- "keep the catenary construction" toggle (ours) keeps the applet's
  step-4/5 layers at the final state; by default they retire exactly like
  the applet (circles at 5, catenary group at 6).
- No internalForce macro exists in this applet → no pipes.
- The parabola stays black at the final state (applet ditto); only the
  final arch under Q resolves by compression sign (view_10 precedent for
  comparison curves).

## Node inspector

18 nodes: 1 = springing A, 2–17 = the 16 vertices of the arch under Q,
18 = springing B. Vertex k: sides = load edge LLB[k−1]→LLB[k] + rays
LLB[k]→o₂ and o₂→LLB[k−1]. The springing sub-polygons degenerate to the
outer ray traversed both ways — exactly where the visible reaction
arrows A = o₂→LLB0 and B = LLB16→o₂ are drawn.
