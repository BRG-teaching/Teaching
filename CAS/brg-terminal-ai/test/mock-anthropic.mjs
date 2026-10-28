// A stand-in for the Claude Messages API, for testing the Worker without an API key: it streams
// scripted answers in the API's server-sent-event format and checks each request the Worker makes.
// The BRG MCP server's tools run at the API, so the mock answers them itself, in mcp_tool_use and
// mcp_tool_result blocks, from a tiny library (one search hit and one Lévy chapter).
import fs from 'node:fs';
import http from 'node:http';

export const MCP_URL = 'https://brg-mcp.example.workers.dev/mcp';
const CHAPTER = ['# Chapitre I', '', '## § 1. Polygone funiculaire', '', 'Soient des forces P1, P2, ... appliquées à un fil; le polygone funiculaire a ses côtés parallèles aux rayons menés du pôle O.', '', '<sub>page 3</sub>'].join('\n');

// MOCK_BOX=<file.json>: answer "create a box" with that notebook (e.g. the live compas_box_notebook's), for browser tests
export const BOX = process.env.MOCK_BOX ? JSON.parse(fs.readFileSync(process.env.MOCK_BOX, 'utf8')) : { name: 'brg_mcp', file: 'brg_mcp.ipynb', cells: [{ type: 'markdown', source: '# A COMPAS box: brg_mcp' }, { type: 'code', source: 'box = Box(2.0, 1.0, 1.5)\nbox.name = "brg_mcp"' }] };

// The next answer, from where the conversation stands.
function answer(body) {
  const last = body.messages[body.messages.length - 1];
  const results = Array.isArray(last.content) ? last.content.filter((b) => b.type === 'tool_result') : [];
  const asked = body.messages[0].content;
  if (/create a box/.test(asked) && !results.length) {
    return { stop: 'tool_use', content: [
      { type: 'mcp_tool_use', id: 'mcptoolu_box', name: 'compas_box_notebook', server_name: 'brg', input: {} },
      { type: 'mcp_tool_result', tool_use_id: 'mcptoolu_box', is_error: false, content: [{ type: 'text', text: JSON.stringify(BOX) }] },
      { type: 'tool_use', id: 'toolu_nb', name: 'notebook', input: { file: BOX.file, cells: BOX.cells } }] };
  }
  if (/create a box/.test(asked)) return { stop: 'end_turn', content: [{ type: 'text', text: 'Run the cells from the top with Shift+Enter.' }] };
  if (!results.length) {
    const hit = { book: 'graphic-statics-levy-part-1', section: '01-chapter-1.md', title: 'Chapitre I. Polygone des forces et polygone funiculaire', historical: true };
    return { stop: 'end_turn', content: [
      { type: 'thinking', thinking: 'The student wants a funicular cable after Lévy. Find the chapter first.' },
      { type: 'mcp_tool_use', id: 'mcptoolu_search', name: 'search_books', server_name: 'brg', input: { query: 'funicular polygon' } },
      { type: 'mcp_tool_result', tool_use_id: 'mcptoolu_search', is_error: false, content: [{ type: 'text', text: JSON.stringify(hit) }] },
      { type: 'mcp_tool_use', id: 'mcptoolu_read', name: 'read_book_section', server_name: 'brg', input: { book: hit.book, section: hit.section, line_count: 40 } },
      { type: 'mcp_tool_result', tool_use_id: 'mcptoolu_read', is_error: false, content: [{ type: 'text', text: JSON.stringify({ ...hit, text: CHAPTER }) }] },
      { type: 'text', text: 'Lévy builds the cable from the force polygon: each side is parallel to a ray from the pole O.\n/open graphic-statics-levy-part-1/01-chapter-1.md 3' }] };
  }
  return { stop: 'end_turn', content: [{ type: 'text', text: 'unexpected state' }] };
}

// The request must be the one the Worker is meant to make.
function check(body, headers) {
  const problems = [];
  if (body.model !== 'claude-sonnet-5-5') problems.push(`model ${body.model}`);
  if (!body.stream) problems.push('not streamed');
  if (body.thinking?.type !== 'adaptive' || body.thinking?.display !== 'summarized') problems.push('thinking');
  if (body.fallbacks !== 'default' || !String(headers['anthropic-beta']).includes('server-side-fallback-2026-07-01')) problems.push('fallbacks');
  if (body.cache_control?.type !== 'ephemeral' || body.system?.[0]?.cache_control?.type !== 'ephemeral') problems.push('caching');
  if (body.output_config?.effort !== 'medium') problems.push('effort');
  const names = (body.tools || []).map((t) => t.name || `${t.type}:${t.mcp_server_name}`).join(',');
  if (names !== 'code_execution,mcp_toolset:brg,notebook') problems.push(`tools ${names}`);
  const mcp = body.mcp_servers?.[0];
  if (body.mcp_servers?.length !== 1 || mcp.type !== 'url' || mcp.name !== 'brg' || !/^https:\/\//.test(mcp.url) || !String(headers['anthropic-beta']).includes('mcp-client-2025-11-20')) problems.push('mcp server');
  if (!/Jupyter \+ BRG/.test(body.system?.[0]?.text || '') || !/compas_box_notebook/.test(body.system[0].text)) problems.push('system prompt');
  return problems;
}

function sse(res, reply) {
  const write = (type, data) => res.write(`event: ${type}\ndata: ${JSON.stringify({ type, ...data })}\n\n`);
  res.writeHead(200, { 'Content-Type': 'text/event-stream', 'request-id': 'req_mock' });
  write('message_start', { message: { id: 'msg_mock', type: 'message', role: 'assistant', model: 'claude-sonnet-5-5', content: [], stop_reason: null, stop_sequence: null,
    usage: { input_tokens: 1200, output_tokens: 1, cache_read_input_tokens: 900, cache_creation_input_tokens: 0 } } });
  reply.content.forEach((block, index) => {
    if (block.type === 'thinking') {
      write('content_block_start', { index, content_block: { type: 'thinking', thinking: '', signature: '' } });
      write('content_block_delta', { index, delta: { type: 'thinking_delta', thinking: block.thinking } });
      write('content_block_delta', { index, delta: { type: 'signature_delta', signature: 'mock-signature' } });
    } else if (block.type === 'text') {
      write('content_block_start', { index, content_block: { type: 'text', text: '' } });
      write('content_block_delta', { index, delta: { type: 'text_delta', text: block.text } });
    } else if (block.type === 'mcp_tool_result') {
      write('content_block_start', { index, content_block: block });
    } else {
      write('content_block_start', { index, content_block: { ...block, input: {} } });
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
