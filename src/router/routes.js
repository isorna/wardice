const IndexPage = () => import('@/views/IndexPage.vue')
const GamesPage = () => import('@/views/GamesPage.vue')

export const routes = [
  {
    path: '/',
    name: 'Index',
    component: IndexPage
  },
  {
    path: '/games',
    name: 'Games',
    component: GamesPage
  }
]
