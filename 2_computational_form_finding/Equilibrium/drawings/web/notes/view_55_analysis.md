# view_55 — Three-hinged Braced Arch (Sondericker 1903, Plate II Figs 3/3A)

The first HISTORICAL view: not an ETH applet but a scanned plate from
Jerome Sondericker, *Graphic Statics, with applications to trusses, beams,
and arches* (Wiley 1903), Art. 53 "Determination of Stresses in Braced
Arches", pp. 69–72 + Plate II. Sources used:
- high-res scan: archive.org item `graphicstaticswi00sonduoft`, IIIF leaf
  161 (2002×3383) — kept as `assets/view_55_plate.jpg` (overlay toggle);
- full book text (OCR) for the accompanying article.

## The structure (decoded)

Windward rib = half of a symmetrical three-hinged arch; wind on the right
side; the leeward rib carries dead load only. Geometry (ft, end hinge at
the origin, crown to the left):
- feet at −1.5 (inner) / +1.25 (outer); the hinge connects both;
- vertical END POST: joints at +5, +6, +8.05 → B3 = (1.25, 19.05) (the
  plate's right dimension chain 5 / 6 / 8.05);
- OUTER chord: STRAIGHT at slope 30° — that is what the plate's "SLOPE 30"
  means (it also makes panel g's chords parallel, exactly as the text
  says); divisions 8.05 + 5×5 up to gh, then ONE more 5-ft division that
  kinks (heading ≈185°) onto the crown hinge;
- INNER chord: "30' R." = a 30-ft-radius arc, centre (−31.5, 0), vertical
  tangent at the foot, sweeping 60° to slope 30°, then STRAIGHT (parallel
  to the outer chord) to the crown;
- the MIDDLE HINGE (crown) is DESIGN DATA, digitised from the plate at
  (−31.64, 36.33): BOTH chords kink into it (the last outer division rises
  ~9° above the 30° slope, the inner chord turns ~20° up at I9). An earlier
  reconstruction derived the crown as "5 ft from gh on the inner chord's
  straight" — that rule made I8–I9–C collinear and invented a ZERO strut
  gh–I9 which the plate visibly contradicts (its poles 17/18 are ~170 px
  = ~5300 lbs apart). Corrected 2026-08-14 after a fidelity audit;
- struts ⊥ to the outer chord; B3's strut (the book's member 7-4) instead
  bisects the inner arc between its neighbours; every quad panel carries
  TWO tension counters; Bow spaces 1..18 as printed on the plate
  (1 = bottom triangle, 18 = crown triangle, quads 2/3 … 16/17).

## Loads and reactions

Dead 400 lb/ft + wind 600 lb/ft of outer chord, tributary
[8.1/2, (8.1+5)/2, 5×5, 5/2] → exactly the book's joint-load table
(1620/2430, 2620/3930, 5×2000/3000, 1000/1500; Σ 15240 / 22860). Wind
normal to the 30° surface. Three-hinge condition (moments about each end
hinge, leeward dead-only) gives the crown force; the book computes
H = 14 860, V = 9 900 and *plots* them to locate P.

## Verification (tools/regress/v55_regress.py)

- our three-hinge solve: H = 14 995, V = 9 894 — Δ **0.9% / 0.06%** vs the
  book's 14 860 / 9 900 (with the pre-audit crown it was 4.5% / 2.3%);
- member c-8 (outer chord division bc–cd): −36 981 lbs vs the book's
  moment-method 35 250 C (Δ 4.9%; this one moved the other way when the
  crown was corrected — the plate's own drawn joints give ~35 300);
- strut gh–I9: −5 137 lbs, matching the plate's Fig 3A pole 17→18 gap
  (~5 200–5 400 lbs measured off its scale bar);
- unique tension-consistent counter set = dropping family in quads 1–6,
  rising in 7–8; the plate's full-vs-dashed diagonals AGREE in every
  checkable panel, incl. the two the text argues (8-9 full in panel c —
  note 8-9 IS the bc–I5 diagonal there — and 16-17 full in panel g);
- Maxwell diagram built joint-by-joint (angular walk, hop = force vector;
  displayed orientation = the walk negated, matching Fig 3A: A at the
  bottom, P centre, poles 10..16 fanning upper-left); closure ~1e-11 lbs.

## Audit fixes (2026-08-14, three verification agents)

Two defects were found by BOTH the statics and the fidelity agent:
1. the crown rule above (fixed — it was the dominant cause of the H/V gap
   AND manufactured a zero member the plate does not have);
2. a SIGN ERROR in the wind-resultant's line of action
   (`r0 = perpW · Mww/|Wv|` gives cross(r0,Wv) = −Mww): it mirrored the
   line through the origin, so the pole-check funicular's (k)–(a) vertex
   landed 55 ft away, on top of the force diagram, and the closing string
   only reached the end hinge because the code appended it. Fixed: the
   closing string is now parallel to ray P–A to 0.0000° and passes through
   the hinge genuinely — the step-5 check is real, not staged.
Verified exact by the statics agent: global ΣF = 0, ΣM = 1.2e-10 lb-ft,
worst joint residual 9.6e-11 lbs, the tension-only counter set is UNIQUE
out of all 256 combinations and stays unique across a 1517-point slider
sweep, Maxwell reciprocity to 6.1e-5° and 0.005 lbs. The fidelity agent's
ink test on the plate confirms our active/slack counter choice in 8 of 8
panels and a 0.145 ft RMS joint fit over 19 joints.

## Reconstruction deviations (stale-caption policy)

- "SPAN 60'" is nominal: with all local constants exact, the crown lands
  at x ≈ −32.3 (span ≈ 64); the 1903 plate itself measures ≈ 63.6. Kept
  our exact construction; the book's H/V/c-8 values are quoted in the
  captions next to the live ones.
- The plate's 1¼/1½ foot offsets and the 8.05-vs-8.1 discrepancy are the
  book's own (loads use 8.1 tributaries; the drawn division scales 8.05).

## View design

19 steps: rib → web+Bow spaces → loads & bent load line A..I → H,V → pole
check funicular (i)(k)(a) → hinge reactions → LINE OF PRESSURE (heavy,
the plate's signature) → counter selection (shears/moments) → c-8 by
moments → then the Maxwell diagram JOINT BY JOINT, one panel pair per
step (crown, g, f, e, d, c, b, tall panel, end post + support). PAIRING
(after a 2026-08-14 audit that rejected highlight-only pairing): the form
side carries a thin grey SKELETON of every member from step 1/2, and each
heavy coloured member is `when`-gated to appear at exactly the step its
force segment lands in the Maxwell diagram (view_33's pattern) — so form
and force are literally drawn together, and the tension/compression answer
is not spoiled before the construction. Counters appear at step 8 (the
pressure line picks the working one; black until its force resolves).
Members highlight at BOTH their joints. Parallelism verified from the ops
export: 28 member/force pairs, worst deviation 1.5e-5 degrees.
→ resolve with pipes. Sliders: dead ×400, wind ×600 (counters re-select live, the
Cremona rebuilds), sFD, sIF; toggles: pressure line, check funicular,
labels, the 1903 plate overlay (aligned via 32 px/ft, hinge at plate px
(1489.4, 1811.3)); node inspector on all 20 joints (force side = the
joint's pole ring). Ghosts: complete final force diagram from step 1.
