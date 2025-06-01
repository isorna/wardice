import factions from '@/data/warmachine/factions.json'
import steamroller from '@/data/warmachine/steamroller.json'

const HomePage = () => import('@/views/warmachine/HomePage.vue')
const FactionPage = () => import('@/views/warmachine/FactionPage.vue')
const ScenarioPage = () => import('@/views/warmachine/ScenarioPage.vue')

export const routesWarmachine = [
  {
    path: '/warmachine',
    name: 'Warmachine Home',
    component: HomePage
  },
  {
    path: '/warmachine/scenario/:scenario',
    name: 'Warmachine Scenario',
    component: ScenarioPage,
    beforeEnter: (to, from) => {
      const slugs = steamroller.sections[5].scenarios.map((item) => item.name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, ''))
      if (to?.params?.scenario && slugs.indexOf(to.params.scenario) >= 0) {
        // console.log(to?.params?.scenario)
      } else {
        return { name: 'NotFound' }
      }
    },
    props: scenario => ({
      scenario: steamroller.sections[5].scenarios.find((item) => item.name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '') === scenario.params.scenario)
    })
  },
  {
    path: '/warmachine/:faction',
    name: 'Warmachine Faction',
    component: FactionPage,
    beforeEnter: (to, from) => {
      const slugs = factions.map((item) => item.slug)
      if (to?.params?.faction && slugs.indexOf(to.params.faction) >= 0) {
        // console.log(to?.params?.faction)
      } else {
        return { name: 'NotFound' }
      }
    }
  }
]
