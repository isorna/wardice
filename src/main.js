import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import { router } from '@/router'
import '@/reset.css'
import 'animate.css'
import '@/style.css'
import App from '@/App.vue'

const pinia = createPinia()
const app = createApp(App)

pinia.use(piniaPluginPersistedState)

app.use(pinia)
app.use(router)
app.mount('#app')