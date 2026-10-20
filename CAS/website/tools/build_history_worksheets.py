"""Copy complete official worksheets and build readable, uncropped page previews.

python build_history_worksheets.py /path/to/ETH-eQUILIBRIUM-course
Requires pymupdf and pillow. Original individual PDFs are copied byte for byte.
"""
import argparse
import hashlib
import json
import shutil
from pathlib import Path

import pymupdf as fitz
from PIL import Image

SITE = Path(__file__).resolve().parents[1]
LIBRARY = 'library.html#/b/graphic-statics-student-course/'


def build(course_dir):
    config = json.loads((SITE / 'history/official-worksheets.json').read_text())
    js_path = SITE / 'history-submissions.js'
    data = json.loads(js_path.read_text().split('submission, ', 1)[1].rsplit(');', 1)[0])
    out = SITE / 'history/official'
    out.mkdir(parents=True, exist_ok=True)
    image_out = SITE / 'assets/history/official'
    image_out.mkdir(parents=True, exist_ok=True)
    references = {}
    for reference in config['references']:
        with fitz.open(course_dir / reference['source']) as doc:
            page = doc[reference['page'] - 1]
            image = max(page.get_image_info(xrefs=True), key=lambda im: im['width'] * im['height'])
            pix = doc.extract_image(image['xref'])
            from io import BytesIO
            im = Image.open(BytesIO(pix['image'])).convert('RGB')
        if reference.get('crop'):
            im = im.crop((0, int(im.height * .062), im.width, int(im.height * .945)))
        im.thumbnail((1200, 900))
        name = 'reference-' + reference['id'] + '.webp'
        im.save(image_out / name, quality=93, method=6)
        references[reference['id']] = dict(
            title=reference['title'], description=reference['description'],
            image='assets/history/official/' + name, width=im.width, height=im.height,
            lecture=LIBRARY + reference['lecture'])

    worksheets, provenance = {}, []
    combined = fitz.open()
    bookmarks = []
    for sheet in config['worksheets']:
        source = course_dir / sheet['source']
        pdf_name = sheet['id'] + '.pdf'
        shutil.copyfile(source, out / pdf_name)
        assert source.read_bytes() == (out / pdf_name).read_bytes()
        pages = []
        with fitz.open(source) as doc:
            for task in sheet['tasks']:
                assert task['pages'] and all(1 <= p <= len(doc) for p in task['pages'])
            bookmarks.append([1, sheet['title'], len(combined) + 1])
            combined.insert_pdf(doc)
            for number, page in enumerate(doc, 1):
                pix = page.get_pixmap(dpi=180, colorspace=fitz.csRGB, alpha=False)
                im = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
                name = f"{sheet['id']}-page-{number:02d}.webp"
                im.save(image_out / name, quality=95, method=6)
                titles = [(('Creative task' if t['number'] == 'Creative' else 'Task ' + t['number'])
                           + ' — ' + t['title']) for t in sheet['tasks'] if number in t['pages']]
                title = sheet.get('pageTitles', {}).get(str(number)) or '; '.join(titles) or 'Introduction and design brief'
                blank = not page.get_text().strip() and not page.get_image_info() and not page.get_drawings()
                pages.append(dict(number=number, title=title, image='assets/history/official/' + name,
                                  width=im.width, height=im.height, blank=blank))
            page_count = len(doc)
        worksheets[sheet['id']] = dict(
            id=sheet['id'], title=sheet['title'], language=sheet['language'],
            pdf='history/official/' + pdf_name, tasks=sheet['tasks'], pages=pages,
            pageCount=page_count, referenceIds=sheet['referenceIds'])
        provenance.append(dict(id=sheet['id'], source=sheet['source'],
                               pdf='history/official/' + pdf_name, pages=page_count,
                               sha256=hashlib.sha256(source.read_bytes()).hexdigest()))

    combined.set_toc(bookmarks)
    combined.save(SITE / 'history/all-worksheets.pdf', garbage=0, deflate=True)
    data['lead'] = 'Choose a structural system for its worksheet, lecture and exercise notes.'
    data['download'] = 'history/all-worksheets.pdf'
    data['referenceDownload'] = 'history/all-figures.pdf'
    data['worksheets'] = worksheets
    data['references'] = references
    for system in data['systems']:
        match = config['systems'][system['id']]
        system.update(match)
        system['exerciseCount'] = sum(len(worksheets[k]['tasks']) for k in match['worksheetIds'])
        system['worksheetIds'] = match['worksheetIds']
        # Keep earlier individual worksheet URLs useful: they now serve full PDFs.
        primary = 'timber' if system['id'] == '09-material-specific' else match['worksheetIds'][0]
        shutil.copyfile(out / (primary + '.pdf'), SITE / system['worksheet'])
    js_path.write_text(
        '// Complete official worksheets and related built references for History Submission.\n'
        '// Generated by tools/build_history_worksheets.py; edit history/official-worksheets.json.\n'
        'Object.assign(window.CAS.chapters.find((chapter) => chapter.n === 1).submission, '
        + json.dumps(data, indent=2, ensure_ascii=False) + ');\n')
    (out / 'sources.json').write_text(json.dumps(provenance, indent=2, ensure_ascii=False) + '\n')
    print(f"{len(worksheets)} complete worksheets, {len(combined)} pages, "
          f"{sum(len(w['tasks']) for w in worksheets.values())} tasks; individual PDFs match their originals.")


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('course_dir', type=Path)
    build(parser.parse_args().course_dir)
