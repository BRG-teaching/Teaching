# CAS Computational Form-finding

Pitch deck for the CAS ETH in Computational Form-finding (Block Research Group, ITA, D-ARCH).

| Path | Contents |
|---|---|
| `CAS Computational Form-Finding.pptx` | Editable 16:9 PowerPoint, 28 slides, with speaker notes |
| `logos/` | The 56 logos and icons used in the deck, as vector SVG |
| `website/` | One-page Vue site with the key slides (see `website/README.md`) |
| `project/` | Claude Design source of the deck (`CAS Computational Form-Finding.dc.html`) with its photos |
| `tools/` | Scripts that rebuild the PowerPoint from the design file |
| `chats/` | Design conversation transcripts |

## The PowerPoint

- Every logo and icon in `logos/` is placed in the deck as a vector SVG, with a PNG fallback
  for older PowerPoint versions. In PowerPoint you can recolour one or break it into shapes
  with *Convert to Shape*.
- All text is native, editable Open Sans. Install Open Sans (Google Fonts) on machines that
  open the deck in PowerPoint; Google Slides has it built in. Semibold and extra-bold text
  maps to Open Sans Bold, with the size nudged so line lengths match the design.
- Bars, cards, plates and circles are native PowerPoint shapes; photos are cropped to their
  frames.

## Logos

Files are named `slideNN-iconMM.svg`: the slide they first appear on, then their order on that
slide. Colours are plain hex, so the files open in any vector editor.

| Slide | Logos |
|---|---|
| 03 Course map | 01 connector lines, 02–08 the seven chapter logos |
| 04 Course timeline | 01–06 chapter logos, 07–13 project steps (10–11 are the two toolchain tools) |
| 05 History | 01–10 structural systems (cables to stress-field models) |
| 06 Computational Structural Design | 01 COMPAS, 02 AEC formats, 03 solvers, 04 AI connectors |
| 07 Graphic Statics | 01 cables and arches, 02 trusses, 03 compas_ags |
| 08 Form Finding | 01 force density, 02 dynamic relaxation, 03 form finding |
| 09 Thrust Network Analysis | 01 TNA, 02 thrust network optimization, 03 discrete element modelling |
| 10 Materialization | 01 materialization, 02 model, 03–05 additive, subtractive, pouring |
| 11 Individual Project | 01–03 research question, prototype, midterm; 04–05 toolchain tools; 06–07 repository, final review |

Five logos were cropped by a few pixels in the design; their frames are widened here so
nothing is cut off.

## Rebuilding

```bash
cd tools && npm install
python3 mkstatic.py "../project/CAS Computational Form-Finding.dc.html" /tmp/deck/static.html "$PWD/../project"
node extract.js /tmp/deck /tmp/deck/out      # boxes, text, photos, standalone SVGs
node build.js /tmp/deck/out "../CAS Computational Form-Finding.pptx"
node edge.js /tmp/deck/out/svg /tmp/deck/out/svgpng   # lists any SVG whose ink touches its frame
cp /tmp/deck/out/svg/*.svg ../logos/
```
