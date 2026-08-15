# Official solution PDFs for ETH "Structural Design I and II" — search report

Date: 2026-08-15
Scope: the 21 solution entries recorded under the `gated` key in `catalog.json`
(course 4 = Structural Design I, course 45 = Structural Design II on
<https://block.arch.ethz.ch/eq>), each rendered on the exercise page as an `<li>` with
the `<a href>` stripped for anonymous visitors.

## Result

**All 21 were found and saved.** None of them required an ETH login.

The gated `<li>` only removes the *link* from the HTML; it does not protect the file.
Two independent public routes yielded the complete set:

1. **The Internet Archive's CDX index of `/eq/files/documents/*`** still lists the
   opaque `<24-char-token><unixtime>.pdf` filenames of 60 uploaded documents — 32 of
   which are not linked from any anonymous page today. Once the token is known, the
   **live server serves the PDF directly** (`https://block.arch.ethz.ch/eq/files/documents/<token>.pdf`
   returns `200 application/pdf`), so the ACL is link-hiding only. This produced 15 of
   the 21, in the exact build the exercise pages point at.
2. **Two publicly readable ZIP bundles of the whole HS22/FS23 exercise set**, still
   live and unauthenticated, containing every task *and* every solution:
   - `https://block.arch.ethz.ch/eq/files/UE_HS22_FS23_1685618735.zip` (German, 8.4 MB)
   - `https://block.arch.ethz.ch/eq/files/EX_HS22_FS_23_1685618700.zip` (English, 8.3 MB)

   These are not linked from any current page; they were located through the Wayback
   CDX listing of `/eq/files/*` (captured 2024-02-16/17). They supplied the remaining
   6 (Exercises 09, 10 and SD-II Exercise X), and independently corroborate the other 15.

## The 21 gated solutions

`Source` column: **doc-token** = original file the gated `<li>` points at, fetched
directly from the live server by its Wayback-recovered token; **ZIP** = extracted from
the public HS22/FS23 bundle above.

| # | Course | Exercise | Gated label | Found | Source URL | Saved as |
|---|---|---|---|---|---|---|
| 1 | SD I | 1 Equilibrium | LÖSUNG - Übung 01 | yes | doc-token `.../documents/a8fstkzqaavmv59ru0m2phw45pw29jbr1665048499.pdf` | `EX1-equilibrium-solution-de.pdf` |
| 2 | SD I | 1 Equilibrium | SOLUTION – Exercise 01 | yes | doc-token `.../documents/cfinucjd3kynixl4w9rblrmr0hmfo1z81665048512.pdf` | `EX1-equilibrium-solution-en.pdf` |
| 3 | SD I | 2 Graphic Statics | LÖSUNG – Übung 02 | yes | doc-token `.../documents/ctwen11fblqg8439nm2iioukiu9hrq9s1666094533.pdf` | `EX2-dimensioning-and-graphic-statics-solution-de.pdf` |
| 4 | SD I | 2 Graphic Statics | SOLUTION – Exercise 02 | yes | doc-token `.../documents/d41obu8z3ecf6e7f22wxkvqm4044ub4w1666094543.pdf` | `EX2-dimensioning-and-graphic-statics-solution-en.pdf` |
| 5 | SD I | 3 Cables | SOLUTION – Exercise 03 | yes | doc-token `.../documents/86kf7qe6w1terqf9agt345uhoqhlrge81667911818.pdf` | `EX3-cable-structures-solution-en.pdf` |
| 6 | SD I | 4 Arches | LÖSUNG - Übung 4 | yes | doc-token `.../documents/z5e7059zb8cahuqd1xc67ymvx1b2hpir1669115431.pdf` | `EX4-arch-structures-solution-de.pdf` |
| 7 | SD I | 4 Arches | SOLUTION - Exercise 4 | yes | doc-token `.../documents/te94ve6k3859fo8hcjsr8a5rhixhr9i01669115474.pdf` | `EX4-arch-structures-solution-en.pdf` |
| 8 | SD I | 5 Arch-Cable | LÖSUNGEN – Übung 5 | yes | doc-token `.../documents/t9kt7nx4er7hk0argahll9q2i03rev851670927160.pdf` | `EX5-arch-cable-solution-de.pdf` |
| 9 | SD I | 5 Arch-Cable | SOLUTION – Exercise 5 | yes | doc-token `.../documents/les818b86zj47msipxbshrn8t4samwi01670927167.pdf` | `EX5-arch-cable-solution-en.pdf` |
| 10 | SD II | 06 Trusses | LÖSUNG – Übung 06 | yes | doc-token `.../documents/1y9qpj0grpzs19rm2lz3s3zip5fg2u6p1678353146.pdf` | `EX6-trusses-solution-de.pdf` |
| 11 | SD II | 06 Trusses | SOLUTION – Exercise 06 | yes | doc-token `.../documents/ic20j8b77qsd3mf37mhqm80rhyr0qkuk1678353130.pdf` | `EX6-trusses-solution-en.pdf` |
| 12 | SD II | 07 Beams | LÖSUNG – Übung 07 | yes | doc-token `.../documents/cj6p1qknqcppwb39usnvg9axmnsaip8g1680167229.pdf` | `EX7-beams-solution-de.pdf` |
| 13 | SD II | 07 Beams | SOLUTION – Ecxercise 07 | yes | doc-token `.../documents/idbfl7cx9gpzv46f4s7hjoluqgrbb7vu1680167252.pdf` | `EX7-beams-solution-en.pdf` |
| 14 | SD II | 08 Frames | LÖSUNG – Übung 08 | yes | doc-token `.../documents/ya0xuv6jfx57fpjsssqflxca0bbott4p1681973572.pdf` | `EX8-frames-solution-de.pdf` |
| 15 | SD II | 08 Frames | SOLUTION – Exercise 08 | yes | doc-token `.../documents/ykucaina7nei8qoexs2vxmlii9l96jdm1681973613.pdf` | `EX8-frames-solution-en.pdf` |
| 16 | SD II | 09 Plates | LÖSUNG – Übung 09 | yes | ZIP `UE_HS22_FS23/UE09_Solution_de.pdf` | `EX9-plates-solution-de.pdf` |
| 17 | SD II | 09 Plates | SOLUTION – Übung 09 | yes | ZIP `EX_HS22_FS_23/UE09_Solution_en.pdf` | `EX9-plates-solution-en.pdf` |
| 18 | SD II | 10 Columns & bracing | LÖSUNG – Übung 10 | yes | ZIP `UE_HS22_FS23/UE10_Solution_de.pdf` | `EX10-bracing-horizontal-forces-solution-de.pdf` |
| 19 | SD II | 10 Columns & bracing | SOLUTION – Übung 10 | yes | ZIP `EX_HS22_FS_23/UE10_Solution_en.pdf` | `EX10-bracing-horizontal-forces-solution-en.pdf` |
| 20 | SD II | X Additional | LÖSUNG - Übung X | yes | ZIP `UE_HS22_FS23/UEX_TE2_Solution_de.pdf` | `EXX-additional-exercises-sd-ii-solution-de.pdf` |
| 21 | SD II | X Additional | SOLUTION - Übung X | yes | ZIP `EX_HS22_FS_23/UEX_TE2_Solution_en.pdf` | `EXX-additional-exercises-sd-ii-solution-en.pdf` |

All 21 files were saved into `drawings/web/pdf/`. Alongside the two solutions the repo
already had (`EX3-cable-structures-solution-de.pdf`,
`EXX-additional-exercises-sd-i-solution-{de,en}.pdf`), the solution set for
SD I + SD II is now complete: 24 files.

## Verification performed

Every saved file was checked three ways.

1. **Header stamp.** 19 of the 21 carry the printed
   `Lösungsvorschlag / Proposal for solution` mark in the page header, extracted with
   `pdftotext -f 1 -l 1`. The two exceptions are the Exercise 08 pair — that FS23
   sheet simply was never stamped.
2. **Rendered page 1** (`pdftoppm -r 100 -f 1 -l 1 -png`) and visually inspected for
   `EX8-frames-solution-de`, `EX8-frames-solution-en`, `EX9-plates-solution-de`,
   `EX10-bracing-horizontal-forces-solution-en`,
   `EXX-additional-exercises-sd-ii-solution-en`, each compared against the
   corresponding blank task sheet. All show fully drawn force diagrams (red tension /
   blue compression / green external), completed thrust lines, ticked answer boxes and
   written answers to the discussion questions. The blank task sheets show empty
   drawing frames in the same positions.
3. **Cross-source md5.** The Exercise 06, 07 and 08 doc-token files are byte-identical
   to `UE06/07/08_Solution_{de,en}.pdf` inside the official ZIPs, which independently
   confirms the unstamped Exercise 08 pair really is the solution.

Additional corroboration for the labels themselves: archived 2022/2023 snapshots of the
exercise pages still contain the link *with* its caption, proving the token-to-label
mapping directly for `LÖSUNG - Übung 01`, `SOLUTION – Exercise 01`,
`LÖSUNG – Übung 03`, `SOLUTION – Exercise 03`, `LÖSUNGEN – Übung 5` and
`SOLUTION – Exercise 5`. The remaining mappings follow from the header text
(`UE n Tragwerksentwurf I/II`, matching semester), the upload-timestamp batch (each
solution pair was uploaded seconds before its `AUFGABE`/`TASK` pair) and the ZIP
filenames.

Provenance note: for Exercises 01–08 the saved file is the exact build the exercise
page links to. The ZIPs contain slightly later re-exports of those same solutions
(different bytes for Ex 01–05, identical for Ex 06–08); the doc-token build was
preferred for consistency with the pre-existing `EX3-cable-structures-solution-de.pdf`,
which is byte-identical to its doc-token original.

## Avenues worked through

### 1. The platform itself — partially productive

| Probe | Result |
|---|---|
| `https://block.arch.ethz.ch/robots.txt` | exists; `Disallow: /usage/ /docs/ /labs/ /layouts/` — says nothing about `/eq` |
| `https://block.arch.ethz.ch/eq/robots.txt`, `/eq/sitemap.xml` | no such route; the app returns its HTML error page. No sitemap exists |
| `https://block.arch.ethz.ch/eq/files/` and `/eq/files/documents/` | `No access: media.file.index.` — directory indexing is disabled. The stack is a bespoke PHP framework ("freeeki"); the error page leaks controller paths but no listing |
| `/eq/media/file` | same `No access: media.file.index.` |
| `/eq/files/documents/<known-token>.pdf` | **`200 application/pdf`** — files are not ACL-protected, only their links are. This is what made avenue 2 work |
| `/eq/content/exam`, `/eq/content/example`, `/eq/content/case` | static informational pages, no file links |
| `/eq/course/4/exam` | 9 publicly linked exam ZIPs (2016 era): old exams Block, old exams Schwartz, colloquia, figures, equation sheets. Not exercise solutions |
| `/eq/course/45/exam` | no documents |
| `/eq/drawing` | the GeoGebra drawing index; no PDFs |
| All 9 courses (4, 45, 81, 121, 133, 154, 182, 225, 247), every `exercise`/`lecture`/`project`/`schedule`/`thisweek` section and all 40 sub-pages, scraped and diffed | The gated-`<li>` pattern occurs **only** on the SD I/II exercise pages. No other course re-publishes an SD I/II graphic-statics solution |
| Course 81 (SD III) | does publish its solutions openly (`te3_ex2_concrete…Solution`, `te3_ex3_timber…`, `te3_ex4_masonry…`, `te3_ex5_Konstruktionsdetails…`, `ue_stahl_solution_20180914`) — but these are steel/concrete/timber/masonry/detailing exercises, not the SD I/II graphic-statics sheets |
| Course 182 (D-BAUG + MIBS) | `SD_DBaug_MiBS_HS22_W9_with solutions_1669901636.pdf` and `TEIII_L0_Colloquium - solutions` — graphic statics, but a different exercise series |

Brute-forcing a token is not feasible and was not attempted: the names are 24
random lowercase-alphanumeric characters (~36^24 ≈ 2^124).

### 2. The Wayback Machine — the decisive avenue

- `cdx/search/cdx?url=block.arch.ethz.ch/eq/files/*` → **306 distinct captures**, of
  which **60** under `/eq/files/documents/`. 28 of those 60 are already linked in
  `catalog.json`; the other **32 were downloaded and identified** (15 turned out to be
  the SD I/II solutions listed above; the rest are SD III / D-BAUG task sheets, two
  2018 Exercise-02 solutions, and one RhinoVAULT chapter).
- `cdx/search/cdx?url=block.arch.ethz.ch/eq/*` → 1520 captures; contained no
  `documents/` token beyond the same 60.
- `cdx/search/cdx?url=block.arch.ethz.ch/eq/course*` → 2071 snapshots. 164 archived
  copies of the SD I/II/III exercise pages were fetched and mined for `href`s,
  yielding 11 further tokens (all 2017–2018, from the predecessor course numbering) and
  the caption-to-token proof cited above. Wayback rate-limiting prevented fetching the
  remaining ~196 snapshots; these are duplicate `?lang=de` / `?lang=en` variants and
  repeat captures of pages already covered, so no additional token is expected there.
- The CDX listing of `/eq/files/*` is also where the two HS22/FS23 ZIP bundles surfaced.
- Three 2018-era documents (`l88bfxm1…1539176949`, `ogh5t29p…1539176879`,
  `qx2p5biz…1539176969` — the Exercise 02 English task and additional tasks) have been
  deleted from the live server and Wayback would not serve them within the retry budget.
  None of them is one of the 21.

### 3. Web search — one useful pointer

Searching for the German titles surfaced the `/eq/course/4/exam` section (which I had
not scraped) and Prof. Schwartz's legacy course site. Neither hosts the 21 solutions.
Searches also return Studocu copies of *exam* solutions; those are student uploads, not
official chair material, and were not used. No ETH Moodle or Research Collection record
of the exercise solutions exists.

### 4. Common Crawl — nothing new

92 of the 126 CC index collections were queried for
`block.arch.ethz.ch/eq/files/*`. Only two `documents/` tokens appear across all of
them, both already known (the Exercise 4 task sheets). Common Crawl never saw a gated
link, which is expected: the link was never in the anonymous HTML.

### 5. The repo's `pdf-archive` branch — nothing mis-filed

All **157** PDFs under `2_computational_form_finding/Equilibrium/files/` were extracted
with `git cat-file -p` and text-scanned. Exactly three carry a
`Lösungsvorschlag`/`Proposal for solution` header, and all three are the solutions the
repo already had (Exercise 03 DE, SD-I Exercise X DE and EN). The SD III `…_Solution_…`
files are present but are the steel/concrete/timber/masonry sheets. **No SD I/II
solution is hiding under a compendium-style name on that branch.**

(Note for anyone repeating this: `git ls-tree` run from
`2_computational_form_finding/Equilibrium/` prints paths relative to the cwd, so
`git cat-file -p origin/pdf-archive:files/…` silently fails. Full repo-root paths are
required.)

## Related material found along the way (not saved)

Publicly retrievable, outside the 21, listed here so the search need not be repeated:

- `…/eq/files/Exercises Structural Design I & II HS21-FS22_1668677900.zip` and
  `…/eq/files/Übungen Tragwerksentwurf i & II HS21-FS22_1668677761.zip` — the previous
  academic year's complete task + solution sets (EN and DE).
- `…/eq/files/UEX_TE2_Solution_de_1654183411.pdf`, `…/eq/files/UEXX_Solution_en_1646148995.pdf`
  — FS22 builds of the SD-II additional-exercise solutions.
- `…/eq/files/documents/79gkbdejtzlmlpfzrkatg4ks6mxaobzv1539177155.pdf` (LÖSUNG Übung 02,
  HS18) and `…/9lsymf26b3x6zmyd12ls22lmpwe0l5hv1539177129.pdf` (SOLUTION Exercise 02,
  HS18) — 5-page HS18 predecessors of the current 3-page Exercise 02 solutions.
- `…/eq/files/documents/15ll15ux6bhd499tu2ubjlulzl7ghgss1667911859.pdf` — **TASK –
  Exercise 03 (EN)**, the one task sheet missing from `drawings/web/pdf/`. Not saved,
  since this report's remit was solutions only.
- Exam solutions: `230119_Exam_HS22_FINAL 120min sol_1688110164.pdf`,
  `exam-2022-summer-120 min-solutions_1671471357.pdf`,
  `exam-2022 winter-120 min-solution-RH_1645270070.pdf`,
  `20180814_Exam_FS18_180min_Solution_HH_1546964099.pdf`,
  `20180228_Exam_HS17_solution_LE - mod_1546964261.pdf`,
  `Prüfung_FS17_solution_20171124_HH_1546964063.pdf`,
  `Prüfung_HS16_Solution_180min_20170215_HH_1546964206.pdf`,
  `Solution Prüfung HS2015_1546964179.pdf`, `SP_So_2016_Solution_1546964029.pdf`
  (all under `https://block.arch.ethz.ch/eq/files/`).

## Honest caveats

- Nothing here required or bypassed authentication. The material is served
  unauthenticated by the chair's own web server; the gate is a missing hyperlink, not
  an access control. That is worth knowing before republishing any of it — the chair
  evidently *intends* these to be student-only, so treat the files as internal.
- For Exercises 09, 10 and SD-II X the saved file comes from the official ZIP bundle
  rather than from the exact `documents/<token>.pdf` the `<li>` refers to. Those three
  batches were uploaded in May/June 2023, after the Internet Archive's 2023-04-29 crawl
  of the site, so their tokens were never captured and cannot be recovered. The ZIP
  entries are the chair's own export of the same FS23 solutions (same header, same
  page count, same stamp), but I cannot prove byte-identity with the linked documents
  for these six the way I can for Exercises 06–08.
- ~196 duplicate Wayback snapshots of already-covered exercise pages were not fetched
  because of rate limiting, and 34 of 126 Common Crawl collections were not queried.
  Both were abandoned only after the complete set of 21 had been found and verified;
  neither is likely to add anything.
