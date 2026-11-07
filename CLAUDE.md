# Claude instructions

- Keep source files outside `docs/`; never edit the generated deployment.
- Build the deployment with `python tools/build_site.py`. The script reads the local `equilibrium` branch unless `--equilibrium` supplies a checkout.
- Build JupyterLite into `docs/CAS/website/jupyter/` and upload only `docs/` to GitHub Pages.
- The first notebook visit starts with the file browser collapsed to the left icon rail and the terminal hidden. Keep the file browser available on demand and restore its last open/closed state. Navigation must hide rather than remount the notebook iframe, preserving its editor, sidebar and live kernel. Keep full Jupyter functionality with the black theme, and preserve the terminal conversation.
- Use the shared `--nav-font` token for navigation: 13px Open Sans with compact spacing.
- Preserve the shared Claude/Gemini/Kimi instructions in `CAS/website/terminal-context.js` and the existing BRG MCP connection. The bottom provider menu offers token links and masked key forms for Claude, Gemini and Kimi Platform (`https://api.moonshot.ai/v1/chat/completions`, `kimi-k2.7-code`). Personal keys remain browser-local. `/key` and `/model` commands remain supported.
- Verify changes with the docs build, JupyterLite build, and headless Chrome at desktop and mobile sizes.
