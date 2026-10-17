// Try the BRG terminal's Claude on many questions from the historical books, beyond cables and trusses, and
// write a report to judge the answers by: what it searched and read, the pages it cites, its answer, and its
// drawing (rendered from the viewer commands it sent, in their colours).
//
//     ANTHROPIC_API_KEY=sk-ant-... node test/try-prompts.mjs            all prompts (costs real money: roughly
//                                                                        $0.05-0.30 each on Sonnet 5.5)
//     ANTHROPIC_API_KEY=... node test/try-prompts.mjs --only 3,7         some of them
//     node test/try-prompts.mjs --mock                                  the plumbing only, against the mock API
//
// The report is try-report.html in the current directory. The 3D view is a stand-in that answers like the
// session viewer (unknown commands are refused the same way), so the drawing is what Claude asked for.
import fs from 'node:fs';
import { converse, costOf, DEFAULT_MODEL, DEFAULT_EFFORT } from '../src/agent.js';
import VIEWER_COMMANDS from '../src/viewer-commands.js';
import { startMock } from './mock-anthropic.mjs';

export const PROMPTS = [
  'Find the resultant of four non-concurrent forces in a plane with the force polygon and the funicular polygon, as Lévy does, and draw it.',
  'Draw the bending moment diagram of a simply supported beam with three point loads using the funicular polygon (Culmann).',
  'Find the centroid of an L-shaped cross-section graphically with two funicular polygons and draw the construction.',
  'Draw the line of thrust of a semicircular masonry arch under its own weight and check whether it stays within the middle third.',
  'A three-hinged arch carries one point load at a quarter of its span: find the reactions graphically and draw the form and force diagrams.',
  "Use Ritter's method of sections on a Warren truss: find the forces in the three members cut by a section at midspan.",
  "Culmann's method: find the forces in three truss members cut by a section using the Culmann line.",
  "Earth pressure on a retaining wall with Poncelet's or Culmann's construction: draw it for a vertical wall with a sloping backfill.",
  'Draw a Williot diagram for the displacement of the free node of a two-bar truss loaded at that node.',
  "Find the moment of inertia of a rectangular section graphically (Culmann / Mohr's method) and draw the construction.",
  "Explain Maxwell's reciprocal figures and draw a reciprocal pair for a simple triangulated frame.",
  'What is the kern (core) of a rectangular section, how does it relate to the middle-third rule, and draw it.',
  'Create a circular truss and colour the members by compression and tension, forces in green.',
  'How did Lévy treat the stability of masonry vaults, and what does the library say about thrust network analysis today? Draw a 2D thrust line of a vault section.',
];

const args = process.argv.slice(2), mock = args.includes('--mock');
const only = (args[args.indexOf('--only') + 1] || '').split(',').map(Number).filter(Boolean);
const env = {
  ANTHROPIC_API_KEY: mock ? 'test-key' : process.env.ANTHROPIC_API_KEY,
  ANTHROPIC_BASE_URL: mock ? 'http://localhost:8790' : process.env.ANTHROPIC_BASE_URL,
  LIBRARY_BASE: mock ? 'http://localhost:8790/library' : process.env.LIBRARY_BASE || 'https://pub-c082064d3c234b25bcb6abd4240e637c.r2.dev',
  MODEL: process.env.MODEL || DEFAULT_MODEL, EFFORT: process.env.EFFORT || DEFAULT_EFFORT,
};
if (!env.ANTHROPIC_API_KEY) { console.error('Set ANTHROPIC_API_KEY, or use --mock.'); process.exit(1); }
const server = mock ? (await startMock(8790)).server : null;

// The stand-in 3D view: answers each line as the session viewer would, and keeps what was drawn.
const VERBS = VIEWER_COMMANDS.map((c) => c.cmd).sort((a, b) => b.length - a.length);
function standIn() {
  const items = [], refused = [];
  let selected = null, waitingText = null;
  const nums = (s) => (s.match(/-?\d+(?:\.\d+)?(?:,-?\d+(?:\.\d+)?){0,2}/g) || []);
  const pt = (s) => s.split(',').map(Number);
  function run(raw) {
    const line = raw.replace(/^=/, '').trim();
    if (waitingText && /^-?\d/.test(line)) { items.push({ kind: 'text', text: waitingText.text, at: pt(line), size: waitingText.size }); selected = items[items.length - 1]; waitingText = null; return 'Created text'; }
    if (waitingText && /^height\s+\d/i.test(line)) { waitingText.size = +line.split(/\s+/)[1]; return 'Height set'; }
    if (/^-?\d[-\d.,\s]*$/.test(line) || !line) return 'answered';
    const verb = VERBS.find((v) => line.toLowerCase() === v.toLowerCase() || line.toLowerCase().startsWith(v.toLowerCase() + ' '));
    if (!verb) { refused.push(line); return `no command \`${line.split(/\s+/)[0].toLowerCase()}\``; }
    const rest = line.slice(verb.length).trim();
    if (verb === 'Text') { waitingText = { text: rest, size: 100 }; return `Text: Lower-left point of "${rest}"`; }
    if (verb === 'Color') { if (selected) selected.color = rest.startsWith('#') ? rest : '#' + rest.split(',').map((v) => (+v).toString(16).padStart(2, '0')).join(''); return selected ? `1 colored ${rest}` : 'Select objects for Color'; }
    if (/^(Escape|Select All)$/.test(verb)) { selected = null; return verb === 'Escape' ? 'selection cleared' : `${items.length} selected`; }
    if (verb === 'Delete') { items.length = 0; selected = null; return 'deleted'; }
    if (['Line', 'Arrow', 'Polyline', 'Point', 'Curve'].includes(verb)) {
      const ps = nums(rest).map(pt);
      if (!ps.length) return `${verb}: First point · click or type x,y,z · Esc cancels`;
      items.push({ kind: verb.toLowerCase(), ps }); selected = items[items.length - 1];
      return `Created and selected ${verb.toLowerCase()} on Created.`;
    }
    if (['Box', 'Sphere', 'Cylinder', 'Cone', 'Nurbs Curve Circle', 'Nurbs Curve Arc'].includes(verb)) {
      const ns = nums(rest);
      items.push({ kind: verb.toLowerCase(), at: pt(ns[0] || '0,0,0'), dims: ns.slice(1).map(Number) }); selected = items[items.length - 1];
      return `Created and selected ${verb.toLowerCase()} on Created.`;
    }
    return 'ok';
  }
  return { run, items, refused };
}

// The drawing in the XZ plane (front view), as SVG.
function svg(items) {
  const xs = [], zs = [];
  const add = ([x, , z]) => { if (Number.isFinite(x) && Number.isFinite(z)) { xs.push(x); zs.push(z); } };
  items.forEach((it) => { (it.ps || []).forEach(add); if (it.at) add(it.at); });
  if (!xs.length) return '<p class="none">Nothing drawn.</p>';
  const x0 = Math.min(...xs), x1 = Math.max(...xs), z0 = Math.min(...zs), z1 = Math.max(...zs);
  const w = Math.max(x1 - x0, 1), h = Math.max(z1 - z0, 1), pad = 0.06 * Math.max(w, h), sw = Math.max(w, h) / 400;
  const X = (x) => x - x0 + pad, Z = (z) => z1 - z + pad;
  const out = items.map((it) => {
    const c = it.color || '#111';
    if (it.kind === 'text') return `<text x="${X(it.at[0])}" y="${Z(it.at[2])}" font-size="${Math.max(it.size || 100, sw * 9)}" fill="#333">${it.text.replace(/</g, '&lt;')}</text>`;
    if (it.kind === 'point') return `<circle cx="${X(it.ps[0][0])}" cy="${Z(it.ps[0][2])}" r="${sw * 2.5}" fill="${c}"/>`;
    if (it.ps) return `<polyline points="${it.ps.map((q) => `${X(q[0])},${Z(q[2])}`).join(' ')}" fill="none" stroke="${c}" stroke-width="${sw}"${it.kind === 'arrow' ? ' marker-end="url(#tip)"' : ''}/>`;
    if (it.kind === 'nurbs curve circle' || it.kind === 'sphere') return `<circle cx="${X(it.at[0])}" cy="${Z(it.at[2])}" r="${it.dims[0] || 10}" fill="none" stroke="${c}" stroke-width="${sw}"/>`;
    if (it.kind === 'box') return `<rect x="${X(it.at[0] - (it.dims[0] || 0) / 2)}" y="${Z(it.at[2] + (it.dims[2] || 0))}" width="${it.dims[0] || 0}" height="${it.dims[2] || 0}" fill="none" stroke="${c}" stroke-width="${sw}"/>`;
    return '';
  }).join('');
  return `<svg viewBox="0 0 ${w + 2 * pad} ${h + 2 * pad}"><defs><marker id="tip" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#3f9c20"/></marker></defs>${out}</svg>`;
}

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const sections = [];
let totalCost = 0;
for (const [n, prompt] of PROMPTS.entries()) {
  if (only.length && !only.includes(n + 1)) continue;
  console.log(`[${n + 1}] ${prompt}`);
  const view = standIn(), trace = [], text = [];
  const history = [{ role: 'user', content: prompt }];
  const usage = { input: 0, output: 0, cache_read: 0, cache_write: 0 };
  let container, error = '';
  try {
    for (let hop = 0; hop < 24; hop++) {
      const done = await converse(env, [...history], container, (e) => {
        if (e.t === 'tool') trace.push(e.name === 'code_execution' ? 'computing (Python)' : `${e.name} ${JSON.stringify(e.input || {})}`);
      });
      history.push(...done.messages);
      container = done.container || container;
      for (const k of Object.keys(usage)) usage[k] += done.usage[k];
      done.messages.forEach((m) => m.role === 'assistant' && m.content.forEach((b) => b.type === 'text' && text.push(b.text)));
      if (!done.viewer.length) break;
      const results = [...done.results];
      for (const call of done.viewer) {
        trace.push(`viewer: ${call.note || ''} (${call.commands.length} lines)`);
        results.push({ type: 'tool_result', tool_use_id: call.id, content: call.commands.map((c) => `> ${c}\n${view.run(c)}`).join('\n').slice(0, 8000) });
      }
      history.push({ role: 'user', content: results });
    }
  } catch (err) { error = err.message; }
  const cost = costOf(env.MODEL, usage);
  totalCost += cost;
  const answer = text.join('\n\n');
  const cites = answer.split('\n').filter((l) => /^\/open\s/.test(l.trim()));
  const colours = [...new Set(view.items.map((i) => i.color).filter(Boolean))];
  console.log(`    ${trace.filter((t) => /search_books|read_book_section|look_at_figure/.test(t)).length} library calls, ${view.items.length} objects drawn, ${cites.length} citations, ${view.refused.length} refused commands, $${cost.toFixed(2)}${error ? ' · ERROR ' + error : ''}`);
  sections.push(`<section><h2>${n + 1}. ${esc(prompt)}</h2>
    <p class="meta">${view.items.length} objects drawn · colours ${colours.map((c) => `<i style="background:${c}"></i>${c}`).join(' ') || 'none'} · ${cites.length} citation lines · ${view.refused.length} commands refused · ${usage.input + usage.cache_read + usage.cache_write} input / ${usage.output} output tokens · $${cost.toFixed(2)}</p>
    ${error ? `<p class="err">${esc(error)}</p>` : ''}
    <div class="row"><div class="draw">${svg(view.items)}</div><pre class="answer">${esc(answer)}</pre></div>
    <details><summary>What it did (${trace.length} steps)</summary><ol>${trace.map((t) => `<li>${esc(t)}</li>`).join('')}</ol>${view.refused.length ? `<p class="err">Refused by the viewer: ${view.refused.map(esc).join(' · ')}</p>` : ''}</details>
  </section>`);
}
fs.writeFileSync('try-report.html', `<!doctype html><meta charset="utf-8"><title>BRG terminal: prompt trial</title>
<style>body{font:15px/1.5 system-ui,sans-serif;margin:24px auto;max-width:1200px;padding:0 16px;color:#1f2133}h1{font-size:24px}h2{font-size:17px;margin:32px 0 6px}
.meta{color:#6f7290;font-size:13px}.meta i{display:inline-block;width:10px;height:10px;border-radius:2px;margin:0 3px -1px 6px}.row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px}
.draw{border:1px solid #dcd9e4;border-radius:8px;background:#fff;min-height:200px}.draw svg{width:100%;height:auto;max-height:520px}pre.answer{white-space:pre-wrap;background:#f6f6fa;border-radius:8px;padding:12px;margin:0;font-size:13px;max-height:520px;overflow:auto}
.err{color:#b33a62}.none{color:#999;padding:12px}@media(max-width:800px){.row{grid-template-columns:1fr}}</style>
<h1>BRG terminal: prompt trial</h1><p class="meta">${env.MODEL}, effort ${env.EFFORT}${mock ? ' · MOCK API (plumbing test, not real answers)' : ''} · ${sections.length} prompts · about $${totalCost.toFixed(2)}</p>${sections.join('\n')}`);
console.log(`report: try-report.html · about $${totalCost.toFixed(2)}`);
if (server) server.close();
