// The BRG terminal's Claude: the agent loop, shared by the Cloudflare Worker (worker.js) and the browser build
// (browser.js, with the visitor's own API key). The library and every other BRG tool come from the BRG MCP
// server (mcp-server-brg), which the Claude API calls itself; notebook calls go back to the page.
import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM } from './prompt.js';

const MAX_ROUNDS = 16;
// Claude Sonnet 5.5 at medium effort by default: about half the price of Opus 5.5, strong at multi-step tool use.
export const DEFAULT_MODEL = 'claude-sonnet-5-5', DEFAULT_EFFORT = 'medium';
// $ per million tokens: input, output, cache read, 5-minute cache write
export const PRICES = { 'claude-sonnet-5-5': [2, 10, 0.2, 2.5], 'claude-opus-5-5': [4, 20, 0.2, 5], 'claude-haiku-5-5': [0.1, 0.5, 0.01, 0.125] };
export const costOf = (model, u) => { const [i, o, r, w] = PRICES[model] || PRICES[DEFAULT_MODEL]; return (u.input * i + u.output * o + u.cache_read * r + u.cache_write * w) / 1e6; }; // model turns per request; the page continues after notebook calls

const NOTEBOOK_TOOL = {
  name: 'notebook',
  description: 'Write a Jupyter notebook into the JupyterLite workspace left of the terminal and open it there, for the user to run (Shift+Enter, cell by cell). Call it with the cells a BRG notebook tool returned (such as compas_box_notebook), unchanged, whenever the user asks to create something in the notebook.',
  input_schema: {
    type: 'object',
    properties: {
      file: { type: 'string', description: 'File name, e.g. "brg_mcp.ipynb"; an existing file of that name is replaced' },
      cells: {
        type: 'array',
        items: {
          type: 'object',
          properties: { type: { type: 'string', enum: ['markdown', 'code'] }, source: { type: 'string' } },
          required: ['type', 'source'],
          additionalProperties: false,
        },
      },
    },
    required: ['file', 'cells'],
    additionalProperties: false,
  },
};
// Always in this order, so the prompt cache holds tools and instructions together.
export const TOOLS = [
  { type: 'code_execution_20260521', name: 'code_execution' },
  { type: 'mcp_toolset', mcp_server_name: 'brg' },
  { ...NOTEBOOK_TOOL, eager_input_streaming: true },
];

export function explain(err) {
  if (err instanceof Anthropic.AuthenticationError) return "The service's Anthropic API key is missing or wrong.";
  if (err instanceof Anthropic.RateLimitError) return 'Claude is busy (rate limit). Try again in a minute.';
  if (err instanceof Anthropic.BadRequestError) return `Claude could not take this conversation (${err.message}). Type /new to start again.`;
  if (err instanceof Anthropic.APIError) return `Claude API error ${err.status}: ${err.message}`;
  return err && err.message ? err.message : String(err);
}

// Run Claude until it answers or calls the notebook. Returns the messages it added to the conversation,
// the notebook calls for the page, and the results of the library tools called in the same turn (the
// page sends them back together with the notebook's answers, in one message).
export async function converse(env, history, container, send, signal) {
  // in a browser the visitor's own key goes straight to Anthropic
  if (!env.MCP_URL) throw new Error('The BRG MCP server is not set: MCP_URL (the Worker) or mcpEndpoint (library-config.js).');
  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, baseURL: env.ANTHROPIC_BASE_URL || undefined, dangerouslyAllowBrowser: !!env.BROWSER });
  const added = [];
  const push = (message) => { history.push(message); added.push(message); };
  const usage = { input: 0, output: 0, cache_read: 0, cache_write: 0 };
  let jsonRetries = 0;

  for (let round = 0; round < MAX_ROUNDS; round++) {
    const stream = client.beta.messages.stream({
      model: env.MODEL || DEFAULT_MODEL,
      max_tokens: 64000,
      betas: ['server-side-fallback-2026-07-01', 'mcp-client-2025-11-20'],
      fallbacks: 'default', // a declined request runs again on the model Anthropic recommends for that case
      thinking: { type: 'adaptive', display: 'summarized' },
      output_config: { effort: env.EFFORT || DEFAULT_EFFORT },
      cache_control: { type: 'ephemeral' }, // the conversation so far
      system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }], // tools and instructions
      tools: TOOLS,
      mcp_servers: [{ type: 'url', url: env.MCP_URL, name: 'brg' }], // mcp-server-brg over Streamable HTTP
      messages: history,
      ...(container ? { container } : {}),
    }, signal ? { signal } : undefined);
    stream.on('thinking', (d) => send({ t: 'thinking', d }));
    stream.on('text', (d) => send({ t: 'text', d }));
    stream.on('streamEvent', (event) => {
      if (event.type === 'content_block_start' && event.content_block.type === 'server_tool_use') send({ t: 'tool', name: event.content_block.name });
    });
    // MCP tools run at the API; the page shows each call with its input (look_at_figure shows the figure)
    stream.on('contentBlock', (block) => { if (block.type === 'mcp_tool_use') send({ t: 'tool', name: block.name, input: block.input }); });

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
    if (!calls.length) return { messages: added, container, page: [], results: [], usage, model: env.MODEL || DEFAULT_MODEL, cost: costOf(env.MODEL || DEFAULT_MODEL, usage), stop: message.stop_reason };

    // A turn cut off by max_tokens or declined may hold incomplete tool inputs: run none of them,
    // but answer each, so the conversation stays valid.
    if (message.stop_reason !== 'tool_use') {
      push({ role: 'user', content: calls.map((c) => ({ type: 'tool_result', tool_use_id: c.id, is_error: true, content: `Not run: the turn ended with ${message.stop_reason}.` })) });
      return { messages: added, container, page: [], results: [], usage, model: env.MODEL || DEFAULT_MODEL, cost: costOf(env.MODEL || DEFAULT_MODEL, usage), stop: message.stop_reason };
    }

    const results = [], page = [];
    for (const call of calls) {
      if (call.name === 'notebook') {
        const { file, cells } = call.input || {};
        if (typeof file === 'string' && /^[\w .-]+\.ipynb$/.test(file) && Array.isArray(cells) && cells.length
          && cells.every((c) => c && (c.type === 'code' || c.type === 'markdown') && typeof c.source === 'string')) {
          page.push({ id: call.id, file, cells: cells.slice(0, 200) });
        } else {
          results.push({ type: 'tool_result', tool_use_id: call.id, is_error: true, content: 'notebook needs a file name ending in .ipynb and a list of markdown/code cells.' });
        }
        continue;
      }
      results.push({ type: 'tool_result', tool_use_id: call.id, is_error: true, content: `No tool named ${call.name}.` });
    }
    if (page.length) return { messages: added, container, page, results, usage, model: env.MODEL || DEFAULT_MODEL, cost: costOf(env.MODEL || DEFAULT_MODEL, usage), stop: 'tool_use' };
    push({ role: 'user', content: results });
  }
  return { messages: added, container, page: [], results: [], usage, model: env.MODEL || DEFAULT_MODEL, cost: costOf(env.MODEL || DEFAULT_MODEL, usage), stop: 'rounds' };
}
