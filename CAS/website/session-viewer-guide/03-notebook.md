# Step 3: Write the notebook

This example creates one pink edge between two nodes. For a real solver and force-scaled edges, see [`05-solvers/06-session-viewer.ipynb`](../notebooks/05-solvers/06-session-viewer.ipynb).

## 3.1 Install the packages

Use a separate first code cell so installation finishes before imports:

```python
%pip install -q compas==2.15.1 pythreejs==2.4.2
%pip install -q compas_notebook==0.11.0 --no-deps
%pip install -q https://brg-teaching.github.io/Teaching/CAS/website/session-viewer/session_py-0.260.0-py3-none-any.whl
```

The first two lines are needed only for the COMPAS fallback. A viewer-only example can omit them and their imports.

## 3.2 Import both viewer APIs

```python
from IPython.display import display
from compas.geometry import Line as CompasLine
from compas_notebook import Viewer
from compas_notebook.config import Config
from session_py import Color, Line, Point, Session, show
from session_py.viewer import supports_webgpu
```

The alias `CompasLine` avoids confusing the COMPAS geometry class with `session_py.Line`.

## 3.3 Build the session

```python
session = Session("viewer_example")
pink = Color(220 / 255, 75 / 255, 141 / 255)

start = Point(0, 0, 0, name="start")
start.width = 6.0
start.pointcolor = pink
session.add_point(start, None)

end = Point(2, 1, 1, name="end")
end.width = 6.0
end.pointcolor = pink
session.add_point(end, None)

edge = Line.from_points(start, end)
edge.name = "edge"
edge.width = 2.0
edge.linecolor = pink
session.add_line(edge, None)
```

`Color` channels are floats from 0 to 1. The second argument to `add_point()` and `add_line()` is the parent group; `None` places the object at the session root.

For solver output, construct these objects after solving. Convert numeric values to ordinary floats when a display property expects them, for example `float(force)`.

## 3.4 Embed the viewer

```python
if await supports_webgpu():
    display(show(session, height=420))
else:
    config = Config()
    config.view.width, config.view.height = 700, 360
    config.view.camera.position = [4, -6, 4]
    config.view.camera.target = [1, 0.5, 0.5]
    viewer = Viewer(config=config)
    viewer.scene.add(CompasLine([0, 0, 0], [2, 1, 1]), color="#dc4b8d")
    viewer.show()
```

`show(session)` returns an `IPython.display.IFrame`; it does not start a server in JupyterLite. The explicit `display()` is important inside the conditional: a value created there is not automatically displayed as the cell's final expression.

`await supports_webgpu()` works as top-level notebook code in Pyodide. It requests a WebGPU adapter and returns a boolean, allowing the same notebook to retain its fallback.

## 3.5 Run in order

Choose **Run → Run All Cells**. Do not skip the installation or import cells. If a class such as `Mesh`, `Point`, or `Session` is undefined, rerun those cells before diagnosing a package version.

Next: [Publish and verify](04-publish.md).
