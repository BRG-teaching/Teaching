// A stand-in for the Claude Messages API, for testing the Worker without an API key: it streams
// scripted answers in the API's server-sent-event format and checks each request the Worker makes.
// It also serves a tiny library (LIBRARY.md and one Lévy chapter) under /library.
import http from 'node:http';

const LIBRARY = `# Books

## \`graphic-statics-levy-part-1/\` — La Statique graphique, Part I (Maurice Lévy)

  - \`01-chapter-1.md\` **Chapitre I. Polygone des forces et polygone funiculaire** Composition des forces; polygone funiculaire, pôle et rayons.
  - \`02-chapter-2.md\` **Chapitre II. Moments** Moments read from the funicular polygon.
`;
const CHAPTER = ['# Chapitre I', '', '## § 1. Polygone funiculaire', '', 'Soient des forces P1, P2, ... appliquées à un fil; le polygone funiculaire a ses côtés parallèles aux rayons menés du pôle O.', '', '<sub>page 3</sub>'].join('\n');

export const DRAWING = ['Escape', 'Select All', 'Delete', 'Polyline 0,0,0 2500,0,-1875 5000,0,-2500 7500,0,-1875 10000,0,0',
  'Line 0,0,0 10000,0,0', 'Text form diagram', '=Height 250', '0,0,800', 'View Front', 'Fit'];

// The next answer, from where the conversation stands.
function answer(body) {
  const last = body.messages[body.messages.length - 1];
  const results = Array.isArray(last.content) ? last.content.filter((b) => b.type === 'tool_result') : [];
  const named = (name) => body.messages.flatMap((m) => (Array.isArray(m.content) ? m.content : []))
    .find((b) => b.type === 'tool_use' && b.name === name && results.some((r) => r.tool_use_id === b.id));
  if (!results.length) {
    return { stop: 'tool_use', content: [
      { type: 'thinking', thinking: 'The student wants a funicular cable after Lévy. Find the chapter first.' },
      { type: 'tool_use', id: 'toolu_search', name: 'search_books', input: { query: 'polygone funiculaire' } }] };
  }
  if (named('search_books')) {
    return { stop: 'tool_use', content: [{ type: 'tool_use', id: 'toolu_read', name: 'read_book_section', input: { book: 'graphic-statics-levy-part-1', section: '01-chapter-1.md', line_count: 40 } }] };
  }
  if (named('read_book_section')) {
    return { stop: 'tool_use', content: [
      { type: 'text', text: 'Lévy builds the cable from the force polygon: each side is parallel to a ray from the pole O. Drawing it now.' },
      { type: 'tool_use', id: 'toolu_view', name: 'viewer', input: { commands: DRAWING, note: 'form diagram of the cable' } }] };
  }
  if (named('viewer')) {
    const said = JSON.stringify(results.find((r) => r.tool_use_id === 'toolu_view').content);
    return { stop: 'end_turn', content: [{ type: 'text', text: `Done: 5 loads of 10 kN, H = 30 kN.\nThe viewer said: ${said.slice(0, 80)}\n/open graphic-statics-levy-part-1/01-chapter-1.md 3` }] };
  }
  return { stop: 'end_turn', content: [{ type: 'text', text: 'unexpected state' }] };
}

// The request must be the one the Worker is meant to make.
function check(body, headers) {
  const problems = [];
  if (body.model !== 'claude-opus-5-5') problems.push(`model ${body.model}`);
  if (!body.stream) problems.push('not streamed');
  if (body.thinking?.type !== 'adaptive' || body.thinking?.display !== 'summarized') problems.push('thinking');
  if (body.fallbacks !== 'default' || !String(headers['anthropic-beta']).includes('server-side-fallback-2026-07-01')) problems.push('fallbacks');
  if (body.cache_control?.type !== 'ephemeral' || body.system?.[0]?.cache_control?.type !== 'ephemeral') problems.push('caching');
  if (body.output_config?.effort !== 'high') problems.push('effort');
  const names = (body.tools || []).map((t) => t.name).join(',');
  if (names !== 'code_execution,list_books,search_books,read_book_section,look_at_figure,viewer') problems.push(`tools ${names}`);
  if (!/session viewer/.test(body.system?.[0]?.text || '') || !/- Box: /.test(body.system[0].text)) problems.push('system prompt');
  return problems;
}

function sse(res, reply) {
  const write = (type, data) => res.write(`event: ${type}\ndata: ${JSON.stringify({ type, ...data })}\n\n`);
  res.writeHead(200, { 'Content-Type': 'text/event-stream', 'request-id': 'req_mock' });
  write('message_start', { message: { id: 'msg_mock', type: 'message', role: 'assistant', model: 'claude-opus-5-5', content: [], stop_reason: null, stop_sequence: null,
    usage: { input_tokens: 1200, output_tokens: 1, cache_read_input_tokens: 900, cache_creation_input_tokens: 0 } } });
  reply.content.forEach((block, index) => {
    if (block.type === 'thinking') {
      write('content_block_start', { index, content_block: { type: 'thinking', thinking: '', signature: '' } });
      write('content_block_delta', { index, delta: { type: 'thinking_delta', thinking: block.thinking } });
      write('content_block_delta', { index, delta: { type: 'signature_delta', signature: 'mock-signature' } });
    } else if (block.type === 'text') {
      write('content_block_start', { index, content_block: { type: 'text', text: '' } });
      write('content_block_delta', { index, delta: { type: 'text_delta', text: block.text } });
    } else {
      write('content_block_start', { index, content_block: { type: 'tool_use', id: block.id, name: block.name, input: {} } });
      write('content_block_delta', { index, delta: { type: 'input_json_delta', partial_json: JSON.stringify(block.input) } });
    }
    write('content_block_stop', { index });
  });
  write('message_delta', { delta: { stop_reason: reply.stop, stop_sequence: null }, usage: { output_tokens: 120 } });
  write('message_stop', {});
  res.end();
}

export function startMock(port) {
  const requests = [];
  const server = http.createServer(async (req, res) => {
    // a web page may call it too (the website's own-key mode, pointed here with ?anthropic=)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
    if (req.method === 'GET' && req.url.startsWith('/library/')) {
      const path = decodeURIComponent(req.url.slice('/library/'.length));
      const file = path === 'LIBRARY.md' ? LIBRARY : path === 'graphic-statics-levy-part-1/01-chapter-1.md' ? CHAPTER : null;
      res.writeHead(file ? 200 : 404, { 'Content-Type': 'text/markdown' });
      return res.end(file || 'not found');
    }
    let raw = '';
    for await (const chunk of req) raw += chunk;
    const body = JSON.parse(raw);
    const problems = check(body, req.headers);
    requests.push({ body, problems });
    if (problems.length) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ type: 'error', error: { type: 'invalid_request_error', message: 'mock: ' + problems.join('; ') } }));
    }
    sse(res, answer(body));
  });
  return new Promise((resolve) => server.listen(port, () => resolve({ server, requests })));
}
