// Dev-only config: same as vite.config.ts but served over self-signed HTTPS,
// for browsers that force HTTPS on every navigation.  Use with:
//   npx vite --config vite.config.dev-ssl.ts
import { defineConfig, mergeConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import baseConfig from './vite.config'

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [basicSsl()],
  }),
)
