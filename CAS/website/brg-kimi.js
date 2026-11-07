(() => {
  const DEFAULT_MODEL = 'kimi-k2.7-code';

  function declarations(tools) {
    const notebook = window.BRG_TERMINAL_CONTEXT.notebookTool;
    return tools.filter((tool) => !/_add$/.test(tool.name)).map((tool) => ({
      type: 'function',
      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.inputSchema || { type: 'object', properties: {} },
      },
    })).concat({
      type: 'function',
      function: { name: notebook.name, description: notebook.description, parameters: notebook.input_schema },
    });
  }

  function completeMessage(message, finishReason, onEvent) {
    if (message.reasoning_content) onEvent({ t: 'thinking', d: message.reasoning_content });
    if (message.content) onEvent({ t: 'text', d: message.content });
    return { message, stop: finishReason || 'stop' };
  }

  async function streamMessage(res, onEvent) {
    const message = { role: 'assistant', content: '' };
    const calls = new Map();
    let reasoning = '', stop = '';
    const consume = (chunk) => {
      const delta = chunk.choices?.[0]?.delta;
      if (delta?.reasoning_content) {
        reasoning += delta.reasoning_content;
        onEvent({ t: 'thinking', d: delta.reasoning_content });
      }
      if (delta?.content) {
        message.content += delta.content;
        onEvent({ t: 'text', d: delta.content });
      }
      for (const part of delta?.tool_calls || []) {
        const index = part.index ?? 0;
        const call = calls.get(index) || { id: '', type: 'function', function: { name: '', arguments: '' } };
        if (part.id) call.id += part.id;
        if (part.type) call.type = part.type;
        if (part.function?.name) call.function.name += part.function.name;
        if (part.function?.arguments) call.function.arguments += part.function.arguments;
        calls.set(index, call);
      }
      if (chunk.choices?.[0]?.finish_reason) stop = chunk.choices[0].finish_reason;
    };
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '', done = false;
    const consumeBlock = (block) => {
      const data = block.split(/\r?\n/).filter((line) => line.startsWith('data:')).map((line) => line.slice(5).trim()).join('\n');
      if (!data || data === '[DONE]') { if (data === '[DONE]') done = true; return; }
      consume(JSON.parse(data));
    };
    while (!done) {
      const { value, done: end } = await reader.read();
      if (end) break;
      buffer += decoder.decode(value, { stream: true });
      let match;
      while ((match = buffer.match(/\r?\n\r?\n/))) {
        const block = buffer.slice(0, match.index);
        buffer = buffer.slice(match.index + match[0].length);
        consumeBlock(block);
        if (done) break;
      }
    }
    buffer += decoder.decode();
    if (buffer.trim()) consumeBlock(buffer);
    if (reasoning) message.reasoning_content = reasoning;
    if (calls.size) message.tool_calls = [...calls.values()].filter((call) => call.function.name);
    return { message, stop: stop || 'stop' };
  }

  async function request({ apiKey, model, endpoint, contents, tools, signal, onEvent }) {
    const res = await fetch(endpoint, {
      method: 'POST', signal,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: window.BRG_TERMINAL_CONTEXT.prompt + '\n\nThis Kimi session has no code-execution tool. When numbers matter, show the calculation explicitly and do not claim to have executed Python.' }, ...contents],
        max_tokens: 16384,
        stream: true,
        tools: declarations(tools),
        tool_choice: 'auto',
      }),
    });
    const contentType = res.headers.get('content-type') || '';
    if (!res.ok) {
      const reply = await res.json().catch(() => null);
      const error = new Error(reply?.error?.message || `Kimi answered HTTP ${res.status}.`);
      error.status = res.status;
      throw error;
    }
    if (contentType.includes('text/event-stream')) return streamMessage(res, onEvent);
    const reply = await res.json();
    const choice = reply?.choices?.[0];
    if (!choice?.message) throw new Error('Kimi returned an empty answer.');
    return completeMessage(choice.message, choice.finish_reason, onEvent);
  }

  function notebookResult(input) {
    const { file, cells } = input || {};
    if (typeof file !== 'string' || !/^[\w .-]+\.ipynb$/.test(file) || !Array.isArray(cells) || !cells.length || cells.length > 200 ||
        !cells.every((cell) => cell && (cell.type === 'code' || cell.type === 'markdown') && typeof cell.source === 'string')) {
      throw new Error('The notebook needs a file name ending in .ipynb and a list of markdown/code cells.');
    }
    return { file, cells };
  }

  async function executeTool(call, tools, callTool, writeNotebook, signal) {
    try {
      const name = call.function?.name;
      const args = JSON.parse(call.function?.arguments || '{}');
      if (name === 'notebook') {
        const notebook = notebookResult(args);
        return { text: await writeNotebook(notebook.file, notebook.cells), images: [] };
      }
      if (!tools.some((tool) => tool.name === name)) throw new Error(`No BRG tool named ${name}.`);
      const result = await callTool(name, args, signal);
      const content = Array.isArray(result.content) ? result.content : [];
      const text = content.filter((part) => part.type === 'text').map((part) => part.text || '').join('\n');
      const images = content.filter((part) => part.type === 'image' && part.data && part.mimeType)
        .map((part) => ({ type: 'image_url', image_url: { url: `data:${part.mimeType};base64,${part.data}` } }));
      return { text: result.isError ? `Error: ${text || `${name} failed.`}` : text || 'Tool completed.', images };
    } catch (error) {
      if (error.name === 'AbortError') throw error;
      return { text: `Error: ${error.message || String(error)}`, images: [] };
    }
  }

  async function converse(options) {
    const { history, onEvent, signal } = options;
    const tools = options.tools.filter((tool) => !/_add$/.test(tool.name));
    const contents = [...history], added = [];
    for (let round = 0; round < 16; round++) {
      const answer = await request({ ...options, contents, tools });
      const message = answer.message;
      added.push(message);
      const calls = message.tool_calls || [];
      if (!calls.length) return { messages: added, stop: answer.stop };
      const responses = [], images = [];
      for (const call of calls) {
        let input = {};
        try { input = JSON.parse(call.function.arguments || '{}'); } catch { /* the tool receives the argument error instead */ }
        onEvent({ t: 'tool', name: call.function.name, input });
        const result = await executeTool(call, tools, options.callTool, options.writeNotebook, signal);
        responses.push({ role: 'tool', tool_call_id: call.id, name: call.function.name, content: result.text });
        images.push(...result.images);
      }
      if (images.length) responses.push({ role: 'user', content: [{ type: 'text', text: 'Images returned by the BRG tools.' }, ...images] });
      contents.push(message, ...responses);
      added.push(...responses);
    }
    return { messages: added, stop: 'rounds' };
  }

  window.BRGKimi = { converse, DEFAULT_MODEL };
})();
