// The BRG terminal's Claude: the agent loop, shared by the Cloudflare Worker (worker.js) and the browser build
// (browser.js, with the visitor's own API key). Library tools run here; viewer calls go back to the page.
import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM } from './prompt.js';
import { LIBRARY_TOOLS, runLibraryTool } from './library.js';

const MAX_ROUNDS = 16; // model turns per request; the page continues after viewer calls

const VIEWER_TOOL = {
  name: 'viewer',
  description: "Draw or change the model in the 3D view left of the terminal: run the session viewer's command lines in order and get back what the viewer answered to each. Call it whenever the user asks to create, show, change or clear something in the view, and when a model or a diagram answers the question better than words.",
  input_schema: {
    type: 'object',
    properties: {
      commands: { type: 'array', items: { type: 'string' }, description: 'Viewer command lines, e.g. ["Polyline 0,0,0 2000,0,-800 4000,0,0", "Text P1", "=Height 200", "2000,0,-600", "View Front", "Fit"]' },
      note: { type: 'string', description: 'A few words on what this step draws, shown to the user' },
    },
    required: ['commands'],
    additionalProperties: false,
  },
};
// Always in this order, so the prompt cache holds tools and instructions together.
export const TOOLS = [
  { type: 'code_execution_20260521', name: 'code_execution' },
  ...[...LIBRARY_TOOLS, VIEWER_TOOL].map((tool) => ({ ...tool, eager_input_streaming: true })),
];

export function explain(err) {
  if (err instanceof Anthropic.AuthenticationError) return "The service's Anthropic API key is missing or wrong.";
  if (err instanceof Anthropic.RateLimitError) return 'Claude is busy (rate limit). Try again in a minute.';
  if (err instanceof Anthropic.BadRequestError) return `Claude could not take this conversation (${err.message}). Type /new to start again.`;
  if (err instanceof Anthropic.APIError) return `Claude API error ${err.status}: ${err.message}`;
  return err && err.message ? err.message : String(err);
}

// Run Claude until it answers or calls the viewer. Returns the messages it added to the conversation,
// the viewer calls for the page, and the results of the library tools called in the same turn (the
// page sends them back together with the viewer's answers, in one message).
export async function converse(env, history, container, send, signal) {
  // in a browser the visitor's own key goes straight to Anthropic
  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, baseURL: env.ANTHROPIC_BASE_URL || undefined, dangerouslyAllowBrowser: !!env.BROWSER });
  const added = [];
  const push = (message) => { history.push(message); added.push(message); };
  const usage = { input: 0, output: 0, cache_read: 0, cache_write: 0 };
  let jsonRetries = 0;

  for (let round = 0; round < MAX_ROUNDS; round++) {
    const stream = client.beta.messages.stream({
      model: env.MODEL || 'claude-opus-5-5',
      max_tokens: 64000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default', // a declined request runs again on the model Anthropic recommends for that case
      thinking: { type: 'adaptive', display: 'summarized' },
      output_config: { effort: env.EFFORT || 'high' },
      cache_control: { type: 'ephemeral' }, // the conversation so far
      system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }], // tools and instructions
      tools: TOOLS,
      messages: history,
      ...(container ? { container } : {}),
    }, signal ? { signal } : undefined);
    stream.on('thinking', (d) => send({ t: 'thinking', d }));
    stream.on('text', (d) => send({ t: 'text', d }));
    stream.on('streamEvent', (event) => {
      if (event.type === 'content_block_start' && event.content_block.type === 'server_tool_use') send({ t: 'tool', name: event.content_block.name });
    });

    let message;
    try {
      message = await stream.finalMessage();
      jsonRetries = 0;
    } catch (err) {
      // only a tool input that could not be parsed is run again; API errors go to the page
      if (err instanceof Anthropic.APIError || jsonRetries++ >= 2) throw err;
      continue;
    }
    if (message.container) container = message.container.id;
    usage.input += message.usage.input_tokens || 0;
    usage.output += message.usage.output_tokens || 0;
    usage.cache_read += message.usage.cache_read_input_tokens || 0;
    usage.cache_write += message.usage.cache_creation_input_tokens || 0;
    push({ role: 'assistant', content: message.content });

    if (message.stop_reason === 'pause_turn') continue; // code execution paused: resume as is
    const calls = message.content.filter((b) => b.type === 'tool_use');
    if (!calls.length) return { messages: added, container, viewer: [], results: [], usage, stop: message.stop_reason };

    // A turn cut off by max_tokens or declined may hold incomplete tool inputs: run none of them,
    // but answer each, so the conversation stays valid.
    if (message.stop_reason !== 'tool_use') {
      push({ role: 'user', content: calls.map((c) => ({ type: 'tool_result', tool_use_id: c.id, is_error: true, content: `Not run: the turn ended with ${message.stop_reason}.` })) });
      return { messages: added, container, viewer: [], results: [], usage, stop: message.stop_reason };
    }

    const results = [], viewer = [];
    for (const call of calls) {
      if (call.name === 'viewer') {
        const commands = call.input && call.input.commands;
        if (Array.isArray(commands) && commands.length && commands.every((c) => typeof c === 'string')) {
          viewer.push({ id: call.id, commands: commands.slice(0, 400), note: typeof call.input.note === 'string' ? call.input.note : '' });
        } else {
          results.push({ type: 'tool_result', tool_use_id: call.id, is_error: true, content: JSON.stringify({ INVALID_JSON: JSON.stringify(call.input) }) });
        }
        continue;
      }
      send({ t: 'tool', name: call.name, input: call.input });
      try {
        results.push({ type: 'tool_result', tool_use_id: call.id, content: await runLibraryTool(call.name, call.input, env) });
      } catch (err) {
        results.push({ type: 'tool_result', tool_use_id: call.id, is_error: true, content: err.message });
      }
    }
    if (viewer.length) return { messages: added, container, viewer, results, usage, stop: 'tool_use' };
    push({ role: 'user', content: results });
  }
  return { messages: added, container, viewer: [], results: [], usage, stop: 'rounds' };
}
