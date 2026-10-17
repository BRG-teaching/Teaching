// The BRG terminal's Claude in the browser, with the visitor's own Anthropic API key (/key sk-ant-…): the same
// agent as the Worker, bundled for the website by `npm run build:browser` into CAS/website/vendor/brg-claude.js.
import { converse, explain } from './agent.js';

window.BRGClaude = { converse, explain };
