# Create one presentation slide

A presentation is a list of topics, and each topic is a list of ordinary Session objects. For one independent slide, use one topic containing one session: `deck = [[scene]]`. The exporter writes exactly one protobuf file and a `presentation.yaml` that references it. The existing Rust renderer and WGSL shaders draw the geometry and typeset the mathematics; there is no browser-side Python or second renderer during playback.

[Open the finished one-slide example](https://brg-teaching.github.io/Teaching/CAS/website/session-viewer/?presentation=one-slide/presentation.yaml) or [download its Python source](one_slide.py).

## 1. Save the Python file

Save this as `one_slide.py` in `session/session_viewer/examples/linkwitz/`:

```python
import threading
import webbrowser
from pathlib import Path

from session_py import Session
from session_py.viewer import MatrixEquation, serve

scene = Session("1 · Matrix multiplication\nWatch the first row multiply the column vector.")
equation = MatrixEquation(scene, left=900, center_y=280, cell=64)
a = equation.matrix("A", [[1, 2], [3, 4]], r"\mathbf{A}")
equation.symbol(r"\times", "times")
x = equation.matrix("x", [[5], [6]], r"\mathbf{x}")
equation.symbol("=", "equals")
b = equation.matrix("B", [[17], [39]], r"\mathbf{B}")
equation.product(a, x, b, row=0, col=0, at=(1240, 520))
deck = [[scene]]

if __name__ == "__main__":
    viewer = serve(deck, directory=Path(__file__).with_name("generated-one-slide"))
    webbrowser.open(viewer.url)
    print(viewer.url)
    try:
        threading.Event().wait()
    except KeyboardInterrupt:
        pass
    finally:
        viewer.close()
```

The session name is the slide title, followed by a newline and its caption. `MatrixEquation` creates ordinary Session matrices, TeX text, and animation relationships. The example reveals `1 × 5 + 2 × 6 = 17` and flashes the corresponding matrix cells. Positive presentation-matrix cells use the website's pink `#dc4b8d`; coordinate-axis and ordinary non-presentation matrix colors are unchanged.

## 2. Build only if the viewer changed

The prebuilt viewer does not need a Rust rebuild for a new slide. If its Rust or WGSL source changed, use the workspace's established build slot from `session/session_viewer`:

```bash
bash ../../wood/tools/buildslot.sh viewer-open env CARGO_BUILD_JOBS=8 NO_COLOR=false trunk build
```

## 3. Generate and open the slide

From the configured Session Python environment:

```bash
cd session/session_py
uv run --offline --no-sync python ../session_viewer/examples/linkwitz/one_slide.py
```

The script writes this local output, starts a loopback server, and opens the slide in your default browser. Use a WebGPU-enabled Chrome browser.

```text
generated-one-slide/
├── presentation.yaml
└── steps/
    └── 00_00.pb
```

Press **Ctrl+C** to stop the local server. The exported files remain available. A single slide has no next slide; the arrow keys become useful when you add another session.

## 4. Publish the static slide

Keep `bridge.js` and the existing viewer runtime. Copy only the generated deck into a new `one-slide` child directory of the deployed viewer:

```text
CAS/website/session-viewer/one-slide/
├── presentation.yaml
└── steps/
    └── 00_00.pb
```

Do not add a `generated-one-slide` path component: `presentation.yaml` resolves `steps/00_00.pb` relative to itself. Commit the deck under `CAS/website/session-viewer/`, push `main`, and wait for the **Deploy static site to GitHub Pages** workflow. The public address is:

```text
https://brg-teaching.github.io/Teaching/CAS/website/session-viewer/?presentation=one-slide/presentation.yaml
```

## Add content without changing the renderer

- Change the title/caption with `Session("Title\nCaption")`.
- Add kernel points, lines, meshes, text, or matrices to the same session.
- Use `scene.graph.set_vertex_attribute(item.guid, "grow", 900.0)` for a reveal.
- Keep the 1600 × 760 authoring area in mind: the left 56% is navigable 3D; the right side is flat mathematics.
- Use `serve([[scene, reveal]], ...)` for a second reveal in the same topic, or `serve([[scene], [scene2]], ...)` for an independent second slide.

Do not use the notebook's `show(deck)` bridge for a presentation: it accepts one Session, not a presentation deck. Static protobuf hosting or the local `serve(deck, ...)` route is the supported path for slides.

Return to the [Session Viewer guide](00-start-here.md).
