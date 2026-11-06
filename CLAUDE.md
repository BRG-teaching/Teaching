# Claude instructions

- Keep source files outside `docs/`; never edit the generated deployment.
- Build the deployment with `python tools/build_site.py`. The script reads the local `equilibrium` branch unless `--equilibrium` supplies a checkout.
- Build JupyterLite into `docs/CAS/website/jupyter/` and upload only `docs/` to GitHub Pages.
- The notebook editor starts full width with the terminal hidden. Preserve both sessions when toggling the terminal; do not remount the iframe or clear the conversation.
- Use the shared `--nav-font` token for navigation: 13px Open Sans with compact spacing.
- Preserve the Claude/Anthropic instructions and the existing BRG MCP connection. No Gemini provider integration is present.
- Verify changes with the docs build, JupyterLite build, and headless Chrome at desktop and mobile sizes.
