(() => {
  const marker = '#session=';
  if (!location.hash.startsWith(marker)) return;

  let bytes;
  try {
    const encoded = location.hash.slice(marker.length);
    const binary = atob(encoded);
    bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  } catch (error) {
    const showError = () => {
      const panel = document.getElementById('viewer-error');
      document.getElementById('viewer-error-message').textContent = `The notebook scene could not be read: ${error.message}`;
      panel.hidden = false;
    };
    if (document.readyState === 'loading') addEventListener('DOMContentLoaded', showError, { once: true });
    else showError();
    return;
  }

  const manifest = new TextEncoder().encode(JSON.stringify({
    name: 'COMPAS · session_viewer',
    items: [{ file: 'notebook.pb', at: [0, 0, 0] }],
    view: 'iso',
    grid: false,
  }));
  const originalFetch = window.fetch.bind(window);
  window.fetch = (resource, options) => {
    const url = new URL(resource instanceof Request ? resource.url : String(resource), location.href);
    const body = url.pathname.endsWith('/notebook.yaml') ? manifest : url.pathname.endsWith('/notebook.pb') ? bytes : null;
    if (!body) return originalFetch(resource, options);
    const type = url.pathname.endsWith('.yaml') ? 'application/yaml' : 'application/octet-stream';
    return Promise.resolve(new Response(body, { status: 200, headers: { 'Content-Type': type, 'Content-Length': String(body.byteLength) } }));
  };
})();
