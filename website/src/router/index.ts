import { createRouter, createWebHashHistory } from 'vue-router'
import GalleryView from '@/views/GalleryView.vue'
import DrawingView from '@/views/DrawingView.vue'

// hash history: deep links like …/#/view/1 work on any static host
// (GitHub Pages) with zero server configuration
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'gallery', component: GalleryView },
    { path: '/view/:id', name: 'view', component: DrawingView, props: true },
  ],
})

export default router
