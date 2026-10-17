// Build an editable PPTX from deck.json: native shapes + text, SVG icons embedded as vectors (with PNG fallback).
const pptxgen = require('pptxgenjs');
const JSZip = require('jszip');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = process.argv[2];
const DEST = process.argv[3];
const deck = JSON.parse(fs.readFileSync(path.join(OUT, 'deck.json'), 'utf8'));
const IN = 1 / 144;           // 1920 px -> 13.333 in
const PT = 0.5;               // 1 px -> 0.5 pt
const FONT = 'Open Sans';
const r3 = v => Math.round(v * 1000) / 1000;

(async () => {
  fs.mkdirSync(path.join(OUT, 'media'), { recursive: true });
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.title = 'CAS Computational Form-finding';
  pres.author = 'Block Research Group, ETH Zürich';
  pres.theme = { headFontFace: FONT, bodyFontFace: FONT };

  // cover-crop photos once per (file, box)
  const imgCache = {};
  async function cover(src, w, h) {
    const key = `${src}|${Math.round(w)}x${Math.round(h)}`;
    if (imgCache[key]) return imgCache[key];
    const file = path.join(OUT, 'media', `photo-${Object.keys(imgCache).length + 1}.jpg`);
    const meta = await sharp(src).metadata();
    // keep the source's own resolution inside the crop (no upscaling), capped at the 1920-px slide size
    const k = Math.min(1, 1 / Math.max(w / meta.width, h / meta.height));
    const tw = Math.round(w * Math.max(k, Math.min(1, 1))), th = Math.round(h * Math.max(k, Math.min(1, 1)));
    await sharp(src).rotate().resize(tw, th, { fit: 'cover', position: 'centre' }).jpeg({ quality: 88 }).toFile(file);
    return (imgCache[key] = file);
  }

  for (const [si, s] of deck.entries()) {
    const slide = pres.addSlide();
    slide.background = { color: s.bg.toUpperCase() };
    for (const it of s.items) {
      if (it.type === 'shape') {
        const o = { x: r3(it.x * IN), y: r3(it.y * IN), w: r3(it.w * IN), h: r3(it.h * IN) };
        if (it.fill) o.fill = { color: it.fill.hex.toUpperCase(), transparency: Math.round((1 - it.fill.a) * 100) };
        else o.fill = { type: 'none' };
        if (it.line) {
          // CSS borders sit inside the box; PowerPoint strokes straddle the edge
          const bw = it.line.w;
          Object.assign(o, { x: r3((it.x + bw / 2) * IN), y: r3((it.y + bw / 2) * IN), w: r3((it.w - bw) * IN), h: r3((it.h - bw) * IN) });
          o.line = { color: it.line.hex.toUpperCase(), width: bw * PT, transparency: Math.round((1 - it.line.a) * 100) };
        } else o.line = { type: 'none' };
        slide.addShape(it.shape === 'ellipse' ? pres.shapes.OVAL : pres.shapes.RECTANGLE, o);
      } else if (it.type === 'img') {
        const file = await cover(it.src, it.w, it.h);
        slide.addImage({ path: file, x: r3(it.x * IN), y: r3(it.y * IN), w: r3(it.w * IN), h: r3(it.h * IN), transparency: Math.round((1 - it.a) * 100), altText: path.basename(it.src) });
      } else if (it.type === 'svg') {
        const svg = fs.readFileSync(path.join(OUT, 'svg', it.file));
        slide.addImage({ data: 'image/svg+xml;base64,' + svg.toString('base64'), x: r3(it.x * IN), y: r3(it.y * IN), w: r3(it.w * IN), h: r3(it.h * IN), altText: it.file, objectName: it.file.replace('.svg', '') });
      } else if (it.type === 'text') {
        const runs = [];
        it.lines.forEach((line, li) => line.forEach((r, ri) => {
          const opt = { fontFace: FONT, fontSize: r3(r.size * (r.fit || 1) * PT), bold: r.bold, italic: r.italic, color: r.hex.toUpperCase() };
          if (r.a < 0.99) opt.transparency = Math.round((1 - r.a) * 100);
          if (r.ls) opt.charSpacing = r3(r.ls * PT);
          if (ri === line.length - 1 && li < it.lines.length - 1) opt.breakLine = true;
          runs.push({ text: r.text, options: opt });
        }));
        const slack = it.w * 0.08 + 6;
        let x = it.x, w = it.w + slack;
        if (it.align === 'center') x = it.cx - w / 2;
        else if (it.align === 'right') x = it.x + it.w - w;
        slide.addText(runs, {
          x: r3(x * IN), y: r3(it.y * IN), w: r3(w * IN), h: r3(it.h * IN),
          margin: 0, wrap: false, valign: 'top', align: it.align, isTextBox: true,
          lineSpacing: r3(it.lh * PT), paraSpaceBefore: 0, paraSpaceAfter: 0, fit: 'none',
        });
      }
    }
    if (s.notes) slide.addNotes(s.notes);
  }

  const tmp = DEST + '.tmp.pptx';
  await pres.writeFile({ fileName: tmp });

  // pptxgenjs cannot rasterise SVG in Node: replace its broken PNG fallbacks with real renders
  const zip = await JSZip.loadAsync(fs.readFileSync(tmp));
  const svgs = Object.keys(zip.files).filter(f => /^ppt\/media\/image-\d+-\d+\.svg$/.test(f));
  for (const f of svgs) {
    const [, sn, n] = f.match(/image-(\d+)-(\d+)\.svg/);
    const png = `ppt/media/image-${sn}-${+n - 1}.png`;
    if (!zip.files[png]) throw new Error('no fallback slot for ' + f);
    const buf = await zip.file(f).async('nodebuffer');
    zip.file(png, await sharp(buf, { density: 288 }).png().toBuffer());
  }
  fs.writeFileSync(DEST, await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
  fs.unlinkSync(tmp);
  console.log('wrote', DEST, 'svg media', svgs.length);
})().catch(e => { console.error(e); process.exit(1); });
