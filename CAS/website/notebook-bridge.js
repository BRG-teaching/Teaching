(() => {
  const tools = () => window.BRG_TERMINAL_CONTEXT.notebookTools;
  const isTool = (name) => tools().some((tool) => tool.name === name);
  const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const stopped = () => new DOMException('Stopped.', 'AbortError');
  const checkAbort = (signal) => { if (signal?.aborted) throw stopped(); };

  async function abortable(promise, signal) {
    if (!signal) return promise;
    checkAbort(signal);
    return new Promise((resolve, reject) => {
      const abort = () => reject(stopped());
      signal.addEventListener('abort', abort, { once: true });
      promise.then(resolve, reject).finally(() => signal.removeEventListener('abort', abort));
    });
  }

  function notebookPanel(app) {
    const current = app?.shell.currentWidget;
    if (current?.content?.model?.sharedModel?.cells && current.sessionContext) return current;
    return app && [...app.shell.widgets('main')].find((widget) => widget.content?.model?.sharedModel?.cells && widget.sessionContext);
  }

  async function getPanel(frame) {
    const app = frame?.contentWindow?.jupyterapp;
    if (!app) throw new Error('Jupyter is not ready. Open the notebook first, then try again.');
    await app.restored;
    const panel = notebookPanel(app);
    if (!panel) throw new Error('No notebook is open in Jupyter.');
    await panel.context.ready;
    return { app, panel };
  }

  function cellIndex(panel, number) {
    const count = panel.content.model.sharedModel.cells.length;
    if (!count) throw new Error('The notebook has no cells.');
    const active = Math.max(0, Math.min(panel.content.activeCellIndex, count - 1));
    const index = number === undefined ? active : Number(number) - 1;
    if (!Number.isInteger(index) || index < 0 || index >= count) throw new Error(`Choose a cell from 1 to ${count}.`);
    return index;
  }

  function plain(value) {
    if (Array.isArray(value)) return value.join('');
    if (typeof value === 'string') return value;
    if (value === undefined || value === null) return '';
    return JSON.stringify(value, null, 2);
  }

  function clip(value, limit = 10000) {
    const text = plain(value).replace(/\x1b\][^\x07]*(?:\x07|\x1b\\)/g, '').replace(/\x1b\[[0-?]*[ -/]*[@-~]/g, '');
    return text.length > limit ? `${text.slice(0, limit)}\n… ${text.length - limit} characters omitted` : text;
  }

  function outputText(output) {
    if (output.output_type === 'error') {
      return `${output.ename || 'Error'}: ${output.evalue || ''}\n${plain(output.traceback)}`.trim();
    }
    if (output.output_type === 'stream') return plain(output.text);
    const data = output.data || {};
    if (data['text/plain'] !== undefined) return plain(data['text/plain']);
    const formats = Object.keys(data);
    return formats.length ? `[Rich output: ${formats.join(', ')}]` : '';
  }

  function outputsOf(panel, index) {
    const model = panel.content.widgets[index]?.model;
    if (!model?.outputs?.toJSON) return [];
    try { return model.outputs.toJSON(); } catch { return []; }
  }

  function formatOutputs(outputs) {
    const text = outputs.map((output) => {
      const label = output.output_type === 'error' ? 'Error' : output.output_type === 'stream' ? `Output (${output.name || 'stream'})` : 'Result';
      return `${label}:\n${clip(outputText(output))}`;
    }).filter((part) => !part.endsWith(':\n'));
    return text.join('\n\n') || 'No output.';
  }

  async function inspect(frame, args = {}) {
    const { panel } = await getPanel(frame);
    const shared = panel.content.model.sharedModel;
    const selected = args.cell === undefined ? shared.cells.map((_, index) => index) : [cellIndex(panel, args.cell)];
    const kernel = panel.sessionContext.session?.kernel;
    const lines = [
      `Notebook: ${panel.context.path}`,
      `Cells: ${shared.cells.length}; active cell: ${Math.min(panel.content.activeCellIndex + 1, shared.cells.length)}`,
      `Kernel: ${kernel?.name || panel.sessionContext.kernelDisplayName || 'not running'}; status: ${kernel?.status || panel.sessionContext.kernelDisplayStatus || 'unknown'}`,
    ];
    for (const index of selected) {
      const cell = shared.cells[index];
      const execution = panel.content.widgets[index]?.model?.executionCount;
      lines.push(`\nCell ${index + 1} · ${cell.cell_type}${execution === null || execution === undefined ? '' : ` · execution ${execution}`}`);
      if (args.include_source !== false) lines.push(`Source:\n${clip(cell.getSource(), 16000) || '[empty]'}`);
      if (cell.cell_type === 'code') lines.push(formatOutputs(outputsOf(panel, index)));
    }
    return clip(lines.join('\n'), 60000);
  }

  async function kernelFor(panel) {
    await panel.sessionContext.ready;
    const kernel = panel.sessionContext.session?.kernel;
    if (!kernel) throw new Error('The notebook has no running kernel. Start or restart its Python kernel first.');
    return kernel;
  }

  async function waitForIdle(panel, signal) {
    const kernel = await kernelFor(panel);
    const started = Date.now();
    let idleSince = 0;
    while (Date.now() - started < 240000) {
      checkAbort(signal);
      if (kernel.status === 'idle') {
        idleSince ||= Date.now();
        if (Date.now() - idleSince >= 350) return kernel;
      } else idleSince = 0;
      await pause(100);
    }
    throw new Error(`The notebook is still ${kernel.status} after 240 seconds. Its code may still be running; inspect it before trying again.`);
  }

  async function run(frame, args = {}, signal) {
    const { app, panel } = await getPanel(frame);
    await kernelFor(panel);
    app.shell.activateById(panel.id);
    const index = args.all ? -1 : cellIndex(panel, args.cell);
    if (index >= 0) panel.content.activeCellIndex = index;
    const command = args.all ? 'notebook:run-all-cells' : app.commands.hasCommand('notebook:run-cell') ? 'notebook:run-cell' : 'notebook:run-cell-and-select-next';
    await abortable(app.commands.execute(command), signal);
    await waitForIdle(panel, signal);
    const summary = args.all ? 'Ran all cells.' : `Ran cell ${index + 1}.`;
    return `${summary}\n${await inspect(frame, { ...(args.all ? {} : { cell: index + 1 }), include_source: false })}`;
  }

  function messageOutput(message) {
    const type = message.header?.msg_type;
    const content = message.content || {};
    if (type === 'stream') return { output_type: 'stream', name: content.name, text: content.text };
    if (type === 'error') return { output_type: 'error', ...content };
    if (type === 'display_data' || type === 'execute_result') return { output_type: type, data: content.data || {} };
    return null;
  }

  async function execute(frame, args = {}, signal) {
    if (typeof args.code !== 'string' || !args.code.trim()) throw new Error('Python code is required.');
    const { panel } = await getPanel(frame);
    const kernel = await kernelFor(panel);
    const future = kernel.requestExecute({ code: args.code, silent: false, store_history: false });
    const outputs = [];
    future.onIOPub = (message) => {
      if (message.header?.msg_type === 'clear_output') outputs.length = 0;
      else {
        const output = messageOutput(message);
        const previous = outputs[outputs.length - 1];
        if (output?.output_type === 'stream' && previous?.output_type === 'stream' && previous.name === output.name) previous.text = plain(previous.text) + plain(output.text);
        else if (output) outputs.push(output);
      }
    };
    let timer;
    try {
      await Promise.race([
        abortable(future.done, signal),
        new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Python execution timed out after 240 seconds; the kernel was interrupted.')), 240000); }),
      ]);
    } catch (error) {
      if (error.name === 'AbortError' || /timed out/.test(error.message)) await kernel.interrupt();
      throw error;
    } finally {
      clearTimeout(timer);
    }
    return `Executed in ${panel.context.path}.\n${formatOutputs(outputs)}`;
  }

  async function update(frame, args = {}) {
    if (typeof args.source !== 'string') throw new Error('The replacement cell source is required.');
    const { app, panel } = await getPanel(frame);
    const index = cellIndex(panel, args.cell);
    const cell = panel.content.model.sharedModel.cells[index];
    cell.setSource(args.source);
    panel.content.activeCellIndex = index;
    app.shell.activateById(panel.id);
    return `Updated cell ${index + 1} (${cell.cell_type}) in ${panel.context.path}. Its previous output is still shown until the cell is run.`;
  }

  async function insert(frame, args = {}) {
    if (typeof args.source !== 'string') throw new Error('The new cell source is required.');
    if (!['code', 'markdown'].includes(args.type)) throw new Error('Cell type must be code or markdown.');
    const { app, panel } = await getPanel(frame);
    const count = panel.content.model.sharedModel.cells.length;
    const after = args.after === undefined ? Math.min(panel.content.activeCellIndex + 1, count) : Number(args.after);
    if (!Number.isInteger(after) || after < 0 || after > count) throw new Error(`The insertion point must be from 0 to ${count}.`);
    panel.content.model.sharedModel.insertCell(after, { cell_type: args.type, source: args.source });
    panel.content.activeCellIndex = after;
    app.shell.activateById(panel.id);
    return `Inserted a ${args.type} cell at position ${after + 1} in ${panel.context.path}.`;
  }

  async function restart(frame, args = {}, signal) {
    const { app, panel } = await getPanel(frame);
    await kernelFor(panel);
    await abortable(panel.sessionContext.restartKernel(), signal);
    await waitForIdle(panel, signal);
    if (args.run_all) {
      app.shell.activateById(panel.id);
      await abortable(app.commands.execute('notebook:run-all-cells'), signal);
      await waitForIdle(panel, signal);
    }
    return `Restarted the Python kernel for ${panel.context.path}.${args.run_all ? ' Ran all cells.' : ' Variables from the previous kernel are gone.'}\n${await inspect(frame, { include_source: false })}`;
  }

  async function call(frame, name, args, signal) {
    if (!isTool(name)) throw new Error(`No notebook tool named ${name}.`);
    const actions = { notebook_inspect: inspect, notebook_run: run, notebook_execute: execute, notebook_update: update, notebook_insert: insert, notebook_restart: restart };
    return actions[name](frame, args || {}, signal);
  }

  window.BRGNotebook = { call, isTool };
})();
