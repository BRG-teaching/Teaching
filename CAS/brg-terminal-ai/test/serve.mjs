// The Worker on a local port, for trying the website against it without Cloudflare:
//     ANTHROPIC_API_KEY=... node test/serve.mjs            (real Claude)
//     node test/serve.mjs --mock                           (the mock Claude API and library)
// then open library.html?chat=http://localhost:8788#/terminal from a local copy of the website.
import http from 'node:http';
import worker from '../src/worker.js';
import { startMock } from './mock-anthropic.mjs';

const mock = process.argv.includes('--mock');
if (mock) await startMock(8790);
const env = {
  ANTHROPIC_API_KEY: mock ? 'test-key' : process.env.ANTHROPIC_API_KEY,
  ANTHROPIC_BASE_URL: mock ? 'http://localhost:8790' : process.env.ANTHROPIC_BASE_URL,
  LIBRARY_BASE: mock ? 'http://localhost:8790/library' : (process.env.LIBRARY_BASE || 'https://pub-c082064d3c234b25bcb6abd4240e637c.r2.dev'),
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || '',
  ACCESS_KEY: process.env.ACCESS_KEY || '',
  MODEL: process.env.MODEL, EFFORT: process.env.EFFORT,
};
http.createServer(async (req, res) => {
  let body = '';
  for await (const chunk of req) body += chunk;
  const response = await worker.fetch(new Request(`http://localhost${req.url}`, {
    method: req.method, headers: req.headers, body: ['GET', 'HEAD', 'OPTIONS'].includes(req.method) ? undefined : body,
  }), env, { waitUntil() {} });
  res.writeHead(response.status, Object.fromEntries(response.headers));
  if (response.body) for await (const chunk of response.body) res.write(chunk);
  res.end();
}).listen(8788, () => console.log(`BRG terminal service on http://localhost:8788${mock ? ' (mock Claude)' : ''}`));
