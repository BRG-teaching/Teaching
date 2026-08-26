import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { vuetify } from './plugin/vuetify'

import '@compas-dev/compas-threejs-ts/style.css'
import './assets/drawing.css'

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
