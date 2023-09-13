import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import './styles/main.scss'

import { plugin, defaultConfig } from '@formkit/vue'
import '@formkit/themes/genesis'

import router from './router/router'


import { createPinia } from 'pinia'


createApp(App).use(router).use(createPinia()).use(autoAnimatePlugin)
.use(plugin, defaultConfig).mount('#app')
