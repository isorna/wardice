import factions from '@/data/40k/factions.json'

const HomePage40k = () => import('@/views/40k/HomePage.vue')
const FactionPage40k = () => import('@/views/40k/FactionPage.vue')

export const routes40k = [
  {
    path: '/40k',
    name: '40k Home',
    component: HomePage40k
  },
  {
    path: '/40k/:faction',
    name: '40k Faction',
    component: FactionPage40k,
    beforeEnter: (to, from) => {
      const slugs = factions.map((item) => item.slug)
      if (to?.params?.faction && slugs.indexOf(to.params.faction) >= 0) {
        console.log(to?.params?.faction)
      } else {
        return { name: 'NotFound' }
      }
    }
  }
]
