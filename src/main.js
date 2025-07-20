import './assets/main.css'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import { createApp } from 'vue'
import App from './App.vue'

const queryClient = new QueryClient()

const app = createApp(App)
app.use(VueQueryPlugin, { queryClient })
app.mount('#app')
