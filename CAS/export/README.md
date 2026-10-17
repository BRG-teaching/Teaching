# PowerPoint export

`CAS Computational Form-Finding.pptx` is an editable 16:9 PowerPoint version of
`project/CAS Computational Form-Finding.dc.html` (all 28 slides, speaker notes included).

- **Text** is native, editable text boxes, all in **Open Sans** (theme heading and body font too).
  Semibold (600) and extra-bold (800) weights map to Open Sans Bold, with the size nudged
  by the measured width ratio so line lengths stay true. Install Open Sans (Google Fonts) on
  machines that open the deck in PowerPoint; Google Slides has it built in.
- **Icons and diagrams** (56) are embedded as vector SVG with a PNG fallback for older
  PowerPoint versions. The same files are in `icons/`, named `slideNN-iconMM.svg`, with
  colours resolved to plain hex so they open in any editor.
- **Bars, cards, plates, circles** are native PowerPoint shapes; **photos** are cropped to
  their frames.

## Rebuilding

```bash
cd export/tools && npm install
python3 mkstatic.py "../../project/CAS Computational Form-Finding.dc.html" /tmp/deck/static.html "$PWD/../../project"
node extract.js /tmp/deck /tmp/deck/out     # boxes, text, photos, standalone SVGs
node build.js /tmp/deck/out ../"CAS Computational Form-Finding.pptx"
node edge.js /tmp/deck/out/svg /tmp/deck/out/svgpng   # prints any SVG whose ink touches its frame
```

`extract.js` grows an SVG's frame by 2 px wherever strokes come within 2 px of the edge,
so no icon is clipped (five icons in the source were cropped by a few pixels).
