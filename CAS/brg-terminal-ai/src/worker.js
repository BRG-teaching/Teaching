// The BRG terminal's Claude, as a Cloudflare Worker. The page keeps the conversation and POSTs it here
// ({ messages, container }); this runs Claude on it with the library tools, which run here, and the
// viewer tool, whose command lines go back to the page to run in the 3D view. The answer streams back
// as lines of JSON: thinking and text as they come, the library tools as they run, then "done" with the
// messages to append and any viewer calls to answer.
import { converse, explain } from './agent.js';

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
    const cors = {
      'Access-Control-Allow-Origin': allowed.length ? (allowed.includes(origin) ? origin : allowed[0]) : '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-BRG-Key',
      Vary: 'Origin',
    };
    const fail = (status, error) => new Response(JSON.stringify({ error }), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return fail(405, 'POST the conversation to this address.');
    if (allowed.length && !allowed.includes(origin)) return fail(403, 'This page may not use the BRG terminal service.');
    if (env.ACCESS_KEY && request.headers.get('X-BRG-Key') !== env.ACCESS_KEY) return fail(401, 'This needs the BRG terminal key: ask your teacher, then type /key <key>.');

    let body;
    try { body = await request.json(); } catch { return fail(400, 'The request is not JSON.'); }
    const messages = body && body.messages;
    if (!Array.isArray(messages) || !messages.length || messages.length > 600 || messages[0].role !== 'user'
        || messages.some((m) => !m || (m.role !== 'user' && m.role !== 'assistant'))) {
      return fail(400, 'messages must be the conversation, starting with a user message.');
    }
    if (JSON.stringify(messages).length > 4e6) return fail(413, 'The conversation is too long. Type /new to start a new one.');

    // NDJSON back to the page while Claude works
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();
    const send = (event) => writer.write(encoder.encode(JSON.stringify(event) + '\n')).catch(() => {});
    const work = converse(env, messages, typeof body.container === 'string' ? body.container : undefined, send)
      .then((done) => send({ t: 'done', ...done }))
      .catch((err) => send({ t: 'error', error: explain(err) }))
      .finally(() => writer.close().catch(() => {}));
    if (ctx && ctx.waitUntil) ctx.waitUntil(work);
    return new Response(readable, { headers: { ...cors, 'Content-Type': 'application/x-ndjson', 'Cache-Control': 'no-store' } });
  },
};
