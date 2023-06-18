import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { routes40k } from './40k/routes'

const NotFoundPage = () => import('@/views/NotFoundPage.vue')

export const router = createRouter({
  routes: [
    ...routes,
    ...routes40k,
    { name: 'NotFound', path: '/404', component: NotFoundPage },
    { path: '/:pathMatch(.*)', component: NotFoundPage }
  ],
  scrollBehavior (to, from, savedPosition) {
    // always scroll to top: https://router.vuejs.org/guide/advanced/scroll-behavior.html#delaying-the-scroll
    return { top: 0 }
  },
  history: createWebHistory()
})
