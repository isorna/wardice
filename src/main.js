import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
// VueJsTour: https://globalhive.github.io/vuejs-tour/
import VueJsTour from '@globalhive/vuejs-tour'
import '@globalhive/vuejs-tour/dist/style.css'
import { router } from '@/router'
import '@/reset.css'
import 'animate.css'
import '@/style.css'
import '@/tour.theme.css'
import App from '@/App.vue'

const pinia = createPinia()
  .use(piniaPluginPersistedState)
const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(VueJsTour)

app.mount('#app')
