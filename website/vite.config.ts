import fs from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

import vuetify from 'vite-plugin-vuetify'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

const DATA_DIR = fileURLToPath(new URL('./data', import.meta.url))

/**
 * The gallery list is NOT a file an author maintains: it is whatever
 * data/view_*.json happens to be there.  Drop a drawing in and it appears;
 * delete it and the card is gone on the next refresh — no bookkeeping, and
 * never a card pointing at a drawing that no longer exists.
 *
 * A browser cannot list a directory on a static host, so the list has to be
 * produced by the server: this plugin answers /views.json in dev by scanning
 * data/, and emits the same file into dist/ at build time.
 */
function viewsIndex(): Plugin {
  const ids = () =>
    fs
      .readdirSync(DATA_DIR)
      .map((name) => /^view_(.+)\.json$/.exec(name)?.[1])
      .filter((id): id is string => Boolean(id))
      .sort((a, b) => {
        const na = Number(a)
        const nb = Number(b)
        return Number.isNaN(na) || Number.isNaN(nb) ? a.localeCompare(b) : na - nb
      })

  return {
    name: 'equilibrium-views-index',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.split('?')[0]?.endsWith('/views.json')) return next()
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Cache-Control', 'no-store')
        res.end(JSON.stringify(ids()))
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'views.json', source: JSON.stringify(ids()) })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // relative base: the built dist/ works from ANY folder of a static host
  // (GitHub Pages publishes the Teaching repo verbatim, so no fixed prefix)
  base: './',
  // the drawings live in ONE folder, data/: the COMPAS JSON of every drawing
  // and the card pictures.  Vite serves it as the static root, so
  // data/view_1.json is fetched as ./view_1.json and is copied to dist/
  // verbatim on build.  Authors only ever touch data/ and drawings/.
  publicDir: 'data',
  plugins: [
    viewsIndex(),

    vue(),

    vuetify({ autoImport: true }),

    AutoImport({
      imports: ['vue', 'vue-router'],
      dirs: ['src/composables'],
      dts: 'src/auto-imports.d.ts',
    }),

    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true,
      dts: 'src/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
