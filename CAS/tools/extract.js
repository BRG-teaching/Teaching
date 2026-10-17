// Walk the rendered static deck and dump every slide as boxes, text lines, photos and standalone SVGs.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const S = process.argv[2];
  const OUT = process.argv[3];
  fs.mkdirSync(path.join(OUT, 'svg'), { recursive: true });
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto('file://' + S + '/static.html', { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);

  const data = await p.evaluate(() => {
    const cv = document.createElement('canvas'); cv.width = cv.height = 1;
    const cx = cv.getContext('2d', { willReadFrequently: true });
    const cache = {};
    // Any CSS colour (oklch included) -> {hex, a}
    function rgba(c) {
      if (!c || c === 'none' || c === 'transparent') return null;
      if (cache[c] !== undefined) return cache[c];
      cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1);
      const d = cx.getImageData(0, 0, 1, 1).data;
      const r = d[3] === 0 ? null : { hex: [d[0], d[1], d[2]].map(v => v.toString(16).padStart(2, '0')).join(''), a: +(d[3] / 255).toFixed(3) };
      // canvas premultiplies; un-premultiply for translucent colours
      if (r && d[3] < 255) {
        cx.clearRect(0, 0, 1, 1); cx.globalCompositeOperation = 'copy'; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); cx.globalCompositeOperation = 'source-over';
        const e = cx.getImageData(0, 0, 1, 1).data; r.hex = [e[0], e[1], e[2]].map(v => v.toString(16).padStart(2, '0')).join('');
      }
      return (cache[c] = r);
    }
    function effOpacity(el, stop) {
      let o = 1; for (let e = el; e && e !== stop.parentElement; e = e.parentElement) o *= +getComputedStyle(e).opacity; return o;
    }

    const SVG_PROPS = ['fill', 'stroke', 'stroke-width', 'stroke-opacity', 'fill-opacity', 'opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'fill-rule', 'clip-rule', 'clip-path', 'display', 'visibility'];
    function exportSvg(svg, slideRect, op) {
      const r = svg.getBoundingClientRect();
      const clone = svg.cloneNode(true);
      const orig = [svg, ...svg.querySelectorAll('*')];
      const cl = [clone, ...clone.querySelectorAll('*')];
      const refs = new Set();
      const INITIAL = { fill: 'rgb(0, 0, 0)', stroke: 'none', 'stroke-width': '1px', 'stroke-opacity': '1', 'fill-opacity': '1', opacity: '1', 'stroke-dasharray': 'none', 'stroke-dashoffset': '0px', 'stroke-linecap': 'butt', 'stroke-linejoin': 'miter', 'stroke-miterlimit': '4', 'fill-rule': 'nonzero', 'clip-rule': 'nonzero', 'clip-path': 'none', display: 'inline', visibility: 'visible' };
      const INHERITED = new Set(['fill', 'stroke', 'stroke-width', 'stroke-opacity', 'fill-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'fill-rule', 'clip-rule', 'visibility']);
      orig.forEach((o, i) => {
        const c = cl[i]; const cs = getComputedStyle(o);
        const pcs = i === 0 ? null : getComputedStyle(o.parentElement);
        ['style', 'class', ...SVG_PROPS].forEach(a => { if (a !== 'clip-path' || i === 0) c.removeAttribute(a); });
        c.removeAttribute('clip-path');
        const inDefs = !!o.closest('clipPath,defs');
        for (const k of SVG_PROPS) {
          let v = cs.getPropertyValue(k);
          const base = (INHERITED.has(k) && pcs) ? pcs.getPropertyValue(k) : INITIAL[k];
          if (k !== 'clip-path' && v === base) continue;
          if (k === 'clip-path' && v === 'none') continue;
          if (inDefs && k !== 'clip-rule' && k !== 'fill-rule') continue;
          if (i === 0 && k === 'display') continue;
          if (k === 'fill' || k === 'stroke') {
            if (v.startsWith('url(')) { const id = v.match(/#([^"')]+)/)[1]; refs.add(id); c.setAttribute(k, `url(#${id})`); continue; }
            const col = rgba(v);
            if (!col) { c.setAttribute(k, 'none'); continue; }
            c.setAttribute(k, '#' + col.hex);
            if (col.a < 1) c.setAttribute(k + '-opacity', String(+(col.a * +cs.getPropertyValue(k + '-opacity')).toFixed(3)));
            continue;
          }
          if ((k === 'fill-opacity' || k === 'stroke-opacity') && c.hasAttribute(k)) continue;
          if (k === 'clip-path') { if (v !== 'none') { const id = v.match(/#([^"')]+)/)[1]; refs.add(id); c.setAttribute(k, `url(#${id})`); } continue; }
          if (k === 'stroke-width' || k === 'stroke-dashoffset') v = v.replace('px', '');
          if (k === 'stroke-dasharray') { if (v === 'none') continue; v = v.replace(/px/g, ''); }
          if (k === 'display' && v !== 'none') continue;
          if (k === 'visibility' && v === 'visible') continue;
          if (k === 'opacity' && v === '1') continue;
          c.setAttribute(k, v);
        }
      });
      // pull in clipPaths / gradients that live in another svg
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      refs.forEach(id => { if (!clone.querySelector('#' + CSS.escape(id))) { const src = document.getElementById(id); if (src) defs.appendChild(src.cloneNode(true)); } });
      if (defs.childNodes.length) clone.insertBefore(defs, clone.firstChild);
      // content extent in screen px (stroke-padded) to detect cropping
      let ext = null;
      svg.querySelectorAll('path,circle,ellipse,line,polyline,polygon,rect').forEach(g => {
        if (g.closest('defs,clipPath')) return;
        const gr = g.getBoundingClientRect(); if (!gr.width && !gr.height) return;
        const sw = parseFloat(getComputedStyle(g).strokeWidth) || 0; const ctm = g.getScreenCTM(); const sc = ctm ? Math.hypot(ctm.a, ctm.b) : 1;
        const pad = getComputedStyle(g).stroke === 'none' ? 0 : sw * sc / 2;
        const e = { l: gr.left - pad, t: gr.top - pad, r: gr.right + pad, b: gr.bottom + pad };
        ext = ext ? { l: Math.min(ext.l, e.l), t: Math.min(ext.t, e.t), r: Math.max(ext.r, e.r), b: Math.max(ext.b, e.b) } : e;
      });
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      const over = ext ? { l: r.left - ext.l, t: r.top - ext.t, r: ext.r - r.right, b: ext.b - r.bottom } : null;
      // grow the viewport so strokes that spill past the frame are not cropped
      let L = r.left, T = r.top, R = r.right, B = r.bottom;
      const m = 2; // safety margin around the ink
      if (over && Math.max(over.l, over.t, over.r, over.b) > -m) {
        L = Math.min(L, ext.l - m); T = Math.min(T, ext.t - m); R = Math.max(R, ext.r + m); B = Math.max(B, ext.b + m);
        const ctm = svg.getScreenCTM();
        clone.setAttribute('viewBox', [(L - ctm.e) / ctm.a, (T - ctm.f) / ctm.d, (R - L) / ctm.a, (B - T) / ctm.d].map(v => +v.toFixed(3)).join(' '));
        clone.setAttribute('preserveAspectRatio', 'none');
      }
      clone.setAttribute('width', (R - L).toFixed(2));
      clone.setAttribute('height', (B - T).toFixed(2));
      // group opacity on an inner <g>: root-level opacity is ignored by some PPTX renderers
      clone.removeAttribute('opacity');
      if (op < 1) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.setAttribute('opacity', op.toFixed(3));
        [...clone.childNodes].filter(c => c.nodeName !== 'defs').forEach(c => g.appendChild(c)); clone.appendChild(g);
      }
      return {
        type: 'svg', markup: new XMLSerializer().serializeToString(clone),
        x: L - slideRect.left, y: T - slideRect.top, w: R - L, h: B - T, over,
        label: (svg.closest('[data-name]') || {}).dataset?.name || ''
      };
    }

    // Text: one unit per maximal run of inline/text children; lines from per-character layout
    function textUnit(nodes, slideRect, sec) {
      const lines = []; let union = null;
      const pushChar = (ch, rect, st) => {
        const top = rect.top, ln = lines.length ? lines[lines.length - 1] : null;
        let line = ln && Math.abs(top - ln.top) < ln.h * 0.5 ? ln : null;
        if (!line) { line = { top, h: rect.height, runs: [] }; lines.push(line); }
        const last = line.runs[line.runs.length - 1];
        if (last && last.key === st.key) last.text += ch; else line.runs.push({ ...st, text: ch });
        union = union ? { l: Math.min(union.l, rect.left), t: Math.min(union.t, rect.top), r: Math.max(union.r, rect.right), b: Math.max(union.b, rect.bottom) } : { l: rect.left, t: rect.top, r: rect.right, b: rect.bottom };
      };
      let lh = 0, align = 'left', block = null;
      const walk = (n) => {
        if (n.nodeType === 3) {
          const el = n.parentElement, cs = getComputedStyle(el);
          if (cs.visibility === 'hidden') return;
          const col = rgba(cs.color) || { hex: '000000', a: 1 };
          const wgt = +cs.fontWeight, bold = wgt >= 600, it = cs.fontStyle === 'italic' ? 'italic ' : '';
          // PowerPoint only gets Regular/Bold of one face: scale size so line length matches the real weight
          let fit = 1;
          if (wgt !== 400 && wgt !== 700) {
            const txt = n.textContent.trim() || 'x';
            cx.font = `${it}${wgt} 100px "Open Sans"`; const a = cx.measureText(txt).width;
            cx.font = `${it}${bold ? 700 : 400} 100px "Open Sans"`; const b2 = cx.measureText(txt).width;
            fit = +(a / b2).toFixed(4);
          }
          const st = { size: parseFloat(cs.fontSize), fit, bold, italic: !!it, hex: col.hex, a: col.a * effOpacity(el, sec), ls: parseFloat(cs.letterSpacing) || 0 };
          st.key = JSON.stringify(st);
          const lhv = cs.lineHeight === 'normal' ? st.size * 1.362 : parseFloat(cs.lineHeight); lh = Math.max(lh, lhv);
          const rg = document.createRange(); const t = n.textContent;
          for (let i = 0; i < t.length; i++) {
            rg.setStart(n, i); rg.setEnd(n, i + 1);
            const rs = rg.getClientRects(); if (!rs.length) continue;
            const rr = rs[0]; if (rr.width === 0 && /\s/.test(t[i])) continue;
            pushChar(/\s/.test(t[i]) ? ' ' : t[i], rr, st);
          }
        } else if (n.nodeType === 1) { [...n.childNodes].forEach(walk); }
      };
      nodes.forEach(walk);
      if (!lines.length) return null;
      block = nodes[0].parentElement; const bcs = getComputedStyle(block);
      align = bcs.textAlign === 'center' ? 'center' : (bcs.textAlign === 'right' || bcs.textAlign === 'end') ? 'right' : 'left';
      if (bcs.display.includes('flex') && bcs.justifyContent === 'center') align = 'center';
      lines.forEach(l => { l.runs.forEach((r, i) => { if (i === 0) r.text = r.text.replace(/^ +/, ''); if (i === l.runs.length - 1) r.text = r.text.replace(/ +$/, ''); }); l.runs = l.runs.filter(r => r.text.length); });
      const L = lines.filter(l => l.runs.length);
      if (!L.length) return null;
      const C = L[0].h;
      return {
        type: 'text', align, lh, contentH: C,
        x: union.l - slideRect.left, y: L[0].top - (lh - C) / 2 - slideRect.top, w: union.r - union.l, h: L.length * lh,
        cx: (union.l + union.r) / 2 - slideRect.left,
        // pptx width: use the block's content box so centred/right text anchors where the browser put it
        lines: L.map(l => l.runs.map(({ key, ...r }) => r))
      };
    }

    const isInline = n => n.nodeType === 3 || (n.nodeType === 1 && n.tagName !== 'BR' && getComputedStyle(n).display === 'inline' && !n.querySelector('svg')) || (n.nodeType === 1 && n.tagName === 'BR');

    const slides = [];
    document.querySelectorAll('.deck>section').forEach((sec, si) => {
      const sr = sec.getBoundingClientRect();
      const items = [];
      const scs = getComputedStyle(sec);
      const bg = rgba(scs.backgroundColor);
      const visit = (el) => {
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden') return;
        const op = effOpacity(el, sec);
        if (op < 0.01) return;
        const r = el.getBoundingClientRect();
        if (r.right < sr.left || r.left > sr.right || r.bottom < sr.top || r.top > sr.bottom) return;
        const box = { x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height };
        if (el.tagName.toLowerCase() === 'svg') { items.push(exportSvg(el, sr, op)); return; }
        if (el !== sec) {
          const fill = rgba(cs.backgroundColor);
          const shape = cs.borderRadius.startsWith('50%') ? 'ellipse' : 'rect';
          const bw = ['Top', 'Right', 'Bottom', 'Left'].map(s => cs['border' + s + 'Style'] !== 'none' ? parseFloat(cs['border' + s + 'Width']) : 0);
          const bc = ['Top', 'Right', 'Bottom', 'Left'].map(s => rgba(cs['border' + s + 'Color']));
          const uniform = bw.every(v => v === bw[0]) && bw[0] > 0 && bc.every(c => c && c.hex === bc[0].hex);
          if (cs.backgroundImage && cs.backgroundImage.startsWith('url(')) {
            items.push({ type: 'img', src: decodeURI(cs.backgroundImage.match(/url\("?(.*?)"?\)/)[1].replace('file://', '')), ...box, a: op });
          }
          if (fill || uniform) items.push({ type: 'shape', shape, ...box, fill: fill ? { hex: fill.hex, a: fill.a * op } : null, line: uniform ? { hex: bc[0].hex, a: bc[0].a * op, w: bw[0] } : null });
          if (!uniform) {
            const sides = [[0, box.x, box.y, box.w, bw[0]], [1, box.x + box.w - bw[1], box.y, bw[1], box.h], [2, box.x, box.y + box.h - bw[2], box.w, bw[2]], [3, box.x, box.y, bw[3], box.h]];
            sides.forEach(([i, x, y, w, h]) => { if (bw[i] > 0 && bc[i]) items.push({ type: 'shape', shape: 'rect', x, y, w, h, fill: { hex: bc[i].hex, a: bc[i].a * op }, line: null }); });
          }
        }
        // children: group consecutive inline nodes into text units
        let run = [];
        const flush = () => { if (run.some(n => (n.textContent || '').trim())) { const u = textUnit(run, sr, sec); if (u) items.push(u); } run = []; };
        [...el.childNodes].forEach(n => {
          if (n.nodeType === 8) return;
          if (isInline(n)) { run.push(n); return; }
          flush(); if (n.nodeType === 1) visit(n);
        });
        flush();
      };
      visit(sec);
      slides.push({ label: sec.dataset.label, notes: sec.dataset.speakerNotes || '', bg: bg ? bg.hex : 'FFFFFF', items });
    });
    return slides;
  });

  // write SVG files with readable names
  let n = 0;
  data.forEach((s, si) => {
    let k = 0;
    s.items.forEach(it => {
      if (it.type !== 'svg') return;
      k++; n++;
      const name = `slide${String(si + 1).padStart(2, '0')}-icon${String(k).padStart(2, '0')}.svg`;
      fs.writeFileSync(path.join(OUT, 'svg', name), '<?xml version="1.0" encoding="UTF-8"?>\n' + it.markup);
      it.file = name; delete it.markup;
      const o = it.over; if (o && Math.max(o.l, o.t, o.r, o.b) > 0.75) console.log('overflow', name, JSON.stringify(Object.fromEntries(Object.entries(o).map(([a, v]) => [a, +v.toFixed(1)]))));
    });
  });
  fs.writeFileSync(path.join(OUT, 'deck.json'), JSON.stringify(data, null, 1));
  console.log('slides', data.length, 'svgs', n, 'items', data.reduce((a, s) => a + s.items.length, 0));
  await b.close();
})();
