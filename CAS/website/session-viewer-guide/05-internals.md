# Step 5: Inspect the internals

Use this flow when the notebook executes but the viewer does not render.

## 5.1 `supports_webgpu()`

In Pyodide, `supports_webgpu()` accesses `navigator.gpu` and awaits `navigator.gpu.requestAdapter()`. It returns `False` outside Emscripten, when WebGPU is absent, or when adapter creation fails.

This check happens before choosing the static viewer or COMPAS fallback.

## 5.2 `show()` creates an iframe

In Emscripten, `show()` calls `_browser_url()` and returns:

```python
IFrame(src=browser_url, width="100%", height=height)
```

The browser URL has this form:

```text
https://brg-teaching.github.io/Teaching/CAS/website/session-viewer/
?scene=notebook.yaml&data=off&live=off#session=<base64-protobuf>
```

The query asks for a scene manifest, disables separate data loading, and disables live updates. The fragment contains `base64.b64encode(session.pb_dumps())`.

## 5.3 `bridge.js` supplies the scene locally

[`bridge.js`](../session-viewer/bridge.js) runs before the viewer's module script. When the fragment begins with `#session=` it:

1. Decodes the base64 string into bytes.
2. Creates a small `notebook.yaml` manifest naming `notebook.pb`.
3. Wraps `window.fetch()`.
4. Returns the manifest for the `notebook.yaml` request.
5. Returns the decoded bytes for the `notebook.pb` request.
6. Passes every other request to the original `fetch()`.

There is no scene POST request and no viewer backend.

## 5.4 The static application renders

[`index.html`](../session-viewer/index.html) loads the hashed JavaScript and initializes the matching WASM module. The viewer requests the manifest and protobuf through the bridge, then renders to the canvas with WebGPU.

The iframe is same-origin on the deployed site. Browser automation must select the nested `/session-viewer/` frame, not the outer page whose route may also be named `session-viewer`.

## 5.5 Limits

- Browser `Presentation` playback is not implemented in this path. `_browser_url()` raises `NotImplementedError` for a presentation deck; use ordinary local Python and `serve()` for that case.
- Large scenes produce long iframe URLs and more serialization work. Keep teaching examples small.
- WebGPU requires a compatible browser and HTTPS or localhost. The fallback remains necessary.

Next: [Troubleshoot](06-troubleshooting.md).
