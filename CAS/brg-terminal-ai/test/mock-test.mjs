// Runs the Worker in Node against the mock Claude API, playing the page's part: it sends a question,
// reads the streamed lines, answers the viewer call as the page would, and checks each step.
//     npm test
import assert from 'node:assert/strict';
import worker from '../src/worker.js';
import { startMock, DRAWING, MCP_URL } from './mock-anthropic.mjs';

const { server, requests } = await startMock(8790);
const env = {
  ANTHROPIC_API_KEY: 'test-key',
  ANTHROPIC_BASE_URL: 'http://localhost:8790',
  MCP_URL,
  ALLOWED_ORIGINS: 'https://brg-teaching.github.io',
  ACCESS_KEY: 'k',
};
const waits = [];
const ctx = { waitUntil: (p) => waits.push(p) };

async function post(body, headers = {}) {
  const res = await worker.fetch(new Request('https://worker.test/', {
    method: 'POST', body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', Origin: 'https://brg-teaching.github.io', 'X-BRG-Key': 'k', ...headers },
  }), env, ctx);
  if (!res.headers.get('Content-Type').includes('ndjson')) return { status: res.status, json: await res.json() };
  const events = (await res.text()).trim().split('\n').map((l) => JSON.parse(l));
  return { status: res.status, events, done: events.find((e) => e.t === 'done'), error: events.find((e) => e.t === 'error') };
}

// refused: wrong key, foreign page
assert.equal((await post({ messages: [] }, { 'X-BRG-Key': 'wrong' })).status, 401);
assert.equal((await post({ messages: [{ role: 'user', content: 'hi' }] }, { Origin: 'https://evil.example' })).status, 403);
assert.equal((await post({ messages: [{ role: 'assistant', content: 'hi' }] })).status, 400);

// 1. the question: Claude searches and reads Lévy through the BRG MCP server, and calls the viewer
const history = [{ role: 'user', content: 'clear the view and create a funicular cable with form and force diagram based on the Lévy books' }];
let r = await post({ messages: history });
assert.ifError(r.error && new Error(r.error.error));
assert.equal(r.status, 200);
assert.ok(r.events.some((e) => e.t === 'thinking' && /Lévy/.test(e.d)), 'thinking streamed');
assert.ok(r.events.some((e) => e.t === 'tool' && e.name === 'search_books'), 'search shown');
assert.ok(r.events.some((e) => e.t === 'tool' && e.name === 'read_book_section'), 'reading shown');
assert.ok(r.events.some((e) => e.t === 'text' && /pole O/.test(e.d)), 'text streamed');
assert.equal(r.done.stop, 'tool_use');
assert.deepEqual(r.done.viewer, [{ id: 'toolu_view', commands: DRAWING, note: 'form diagram of the cable' }]);
assert.ok(r.events.some((e) => e.t === 'tool' && e.name === 'read_book_section' && e.input.section === '01-chapter-1.md'), 'tool input shown');
assert.equal(r.done.messages.length, 1, 'one assistant message: the API ran the MCP tools');
const results = r.done.messages[0].content.filter((b) => b.type === 'mcp_tool_result');
assert.match(JSON.stringify(results[0].content), /01-chapter-1\.md/, 'search found the chapter');
assert.match(JSON.stringify(results[1].content), /pôle O/, 'chapter read');
assert.equal(r.done.messages[0].content[0].signature, 'mock-signature', 'thinking block kept whole');
history.push(...r.done.messages);

// 2. the page ran the commands; it answers the viewer call
history.push({ role: 'user', content: [...r.done.results, { type: 'tool_result', tool_use_id: 'toolu_view', content: '‹ deleted 0 objects; created 1 polyline, 1 line, 1 text' }] });
r = await post({ messages: history });
assert.equal(r.done.stop, 'end_turn');
assert.deepEqual(r.done.viewer, []);
assert.match(r.done.messages[0].content[0].text, /\/open graphic-statics-levy-part-1\/01-chapter-1\.md/);
assert.match(r.done.messages[0].content[0].text, /created 1 polyline/);
assert.ok(r.done.usage.cache_read > 0, 'usage reported');

await Promise.all(waits);
assert.ok(requests.every((q) => !q.problems.length), requests.map((q) => q.problems).join(' '));
console.log(`ok: ${requests.length} Claude requests, each with the expected model, thinking, fallbacks, caching, tools and MCP server`);
server.close();
