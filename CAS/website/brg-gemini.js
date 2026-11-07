(() => {
  const DEFAULT_MODEL = 'gemini-3.8-flash';
  const API = 'https://generativelanguage.googleapis.com/v1beta/models';

  function schema(value) {
    if (Array.isArray(value)) return value.map(schema);
    if (!value || typeof value !== 'object') return value;
    const out = {};
    for (const [key, item] of Object.entries(value)) {
      if (key === '$schema' || key === 'additionalProperties' || (key === 'default' && item === null)) continue;
      out[key] = schema(item);
    }
    if (Array.isArray(out.anyOf)) {
      const variants = out.anyOf;
      const nullable = variants.some((item) => item.type === 'null' || item.type === 'NULL');
      const remaining = variants.filter((item) => item.type !== 'null' && item.type !== 'NULL');
      if (remaining.length === 1) {
        delete out.anyOf;
        Object.assign(out, remaining[0]);
        if (nullable) out.nullable = true;
      }
    }
    if (typeof out.type === 'string') out.type = out.type.toUpperCase();
    return out;
  }

  function declarations(tools) {
    const notebook = window.BRG_TERMINAL_CONTEXT.notebookTool;
    return tools.filter((tool) => !/_add$/.test(tool.name)).map((tool) => ({
      name: tool.name,
      description: tool.description,
      parameters: schema(tool.inputSchema || { type: 'object', properties: {} }),
    })).concat({ name: notebook.name, description: notebook.description, parameters: schema(notebook.input_schema) });
  }

  async function request({ apiKey, model, endpoint, contents, tools, signal }) {
    const context = window.BRG_TERMINAL_CONTEXT;
    const url = `${endpoint.replace(/\/$/, '')}/${encodeURIComponent(model)}:generateContent`;
    const res = await fetch(url, {
      method: 'POST', signal,
      headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': apiKey },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: context.prompt + '\n\nThis Gemini session has no code-execution tool. When numbers matter, show the calculation explicitly and do not claim to have executed Python.' }] },
        tools: [{ functionDeclarations: declarations(tools) }],
        toolConfig: { functionCallingConfig: { mode: 'AUTO' } },
      }),
    });
    const reply = await res.json().catch(() => null);
    if (!res.ok) {
      const error = new Error(reply?.error?.message || `Gemini answered HTTP ${res.status}.`);
      error.status = res.status;
      throw error;
    }
    const candidate = reply?.candidates?.[0];
    if (!candidate?.content?.parts) {
      const reason = reply?.promptFeedback?.blockReason || candidate?.finishReason;
      throw new Error(reason ? `Gemini did not answer (${reason.toLowerCase().replaceAll('_', ' ')}).` : 'Gemini returned an empty answer.');
    }
    return candidate;
  }

  function notebookResult(input) {
    const { file, cells } = input || {};
    if (typeof file !== 'string' || !/^[\w .-]+\.ipynb$/.test(file) || !Array.isArray(cells) || !cells.length || cells.length > 200 ||
        !cells.every((cell) => cell && (cell.type === 'code' || cell.type === 'markdown') && typeof cell.source === 'string')) {
      throw new Error('The notebook needs a file name ending in .ipynb and a list of markdown/code cells.');
    }
    return { file, cells };
  }

  async function toolResult(call, tools, callTool, writeNotebook, signal) {
    const response = { name: call.name, ...(call.id ? { id: call.id } : {}) };
    try {
      if (call.name === 'notebook') {
        const notebook = notebookResult(call.args);
        response.response = { output: await writeNotebook(notebook.file, notebook.cells) };
        return { functionResponse: response };
      }
      if (!tools.some((tool) => tool.name === call.name)) throw new Error(`No BRG tool named ${call.name}.`);
      const result = await callTool(call.name, call.args || {}, signal);
      const content = Array.isArray(result.content) ? result.content : [];
      const text = content.filter((part) => part.type === 'text').map((part) => part.text || '').join('\n');
      const images = content.filter((part) => part.type === 'image' && part.data && /^image\/(png|jpeg|webp)$/i.test(part.mimeType))
        .map((part) => ({ inlineData: { mimeType: part.mimeType, data: part.data } }));
      response.response = result.isError ? { error: text || `${call.name} failed.` } : { output: text || 'Tool completed.' };
      if (images.length) response.parts = images;
    } catch (error) {
      if (error.name === 'AbortError') throw error;
      response.response = { error: error.message || String(error) };
    }
    return { functionResponse: response };
  }

  async function converse(options) {
    const { history, onEvent, signal } = options;
    const tools = options.tools.filter((tool) => !/_add$/.test(tool.name));
    const contents = [...history], added = [];
    for (let round = 0; round < 16; round++) {
      const answer = await request({ ...options, contents, tools });
      const content = { ...answer.content, role: 'model' };
      added.push(content);
      const calls = [];
      for (const part of content.parts) {
        if (part.text) onEvent({ t: part.thought ? 'thinking' : 'text', d: part.text });
        if (part.functionCall) calls.push(part.functionCall);
      }
      if (!calls.length) return { messages: added, stop: answer.finishReason };
      const parts = [];
      for (const call of calls) {
        onEvent({ t: 'tool', name: call.name, input: call.args || {} });
        parts.push(await toolResult(call, tools, options.callTool, options.writeNotebook, signal));
      }
      const result = { role: 'user', parts };
      contents.push(content, result);
      added.push(result);
    }
    return { messages: added, stop: 'rounds' };
  }

  window.BRGGemini = { converse, DEFAULT_MODEL };
})();
