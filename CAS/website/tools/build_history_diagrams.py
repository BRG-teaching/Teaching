"""Extract only graphic-statics diagrams from the course reference strips.

Requires PyMuPDF and Pillow. Keeps the original photo and exercise assets unchanged.
"""
from pathlib import Path
import json

import pymupdf as fitz
from PIL import Image

SITE = Path(__file__).resolve().parents[1]


def build():
    js = SITE / 'history-submissions.js'
    data = json.loads(js.read_text().split('submission, ', 1)[1].rsplit(');', 1)[0])
    out = SITE / 'history/diagrams'
    out.mkdir(exist_ok=True)
    sources = []
    for system in data['systems']:
        ident = system['id']
        if ident == '01-cables':
            image = Image.open(out / 'cables-source.jpg').convert('RGB')
            crop = [int(image.width * .58), 0, image.width, image.height]
            image = image.crop(crop)
            source = dict(key='graphic-statics-student-course/figures/08-s020.jpg',
                          profile='r2-books', bucket='brg-books', crop=crop)
        else:
            with fitz.open(SITE / system['pdf']) as doc:
                page = doc[0]
                # The reference strip has three columns; retain just its middle images.
                boxes = [fitz.Rect(im['bbox']) for im in page.get_image_info()
                         if page.rect.width * .19 < im['bbox'][0] < page.rect.width * .60]
                assert boxes, ident
                clip = boxes[0]
                for box in boxes[1:]:
                    clip |= box
                clip = (clip + (-3, -3, 3, 3)) & page.rect
                pix = page.get_pixmap(clip=clip, dpi=240, alpha=False)
                image = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
                source = dict(reference=system['pdf'], crop=list(clip))
        filename = ident + '.webp'
        image.save(out / filename, quality=95, method=6)
        title = 'Graphic statics — ' + system['title'].lower()
        system['diagram'] = dict(image='history/diagrams/' + filename,
                                 title=title, width=image.width, height=image.height)
        sources.append(dict(id=ident, image=system['diagram']['image'], source=source))
    js.write_text('// Complete official worksheets and built references for History Submission.\n'
                  'Object.assign(window.CAS.chapters.find((chapter) => chapter.n === 1).submission, '
                  + json.dumps(data, indent=2, ensure_ascii=False) + ');\n')
    (out / 'sources.json').write_text(json.dumps(sources, indent=2) + '\n')


if __name__ == '__main__':
    build()
