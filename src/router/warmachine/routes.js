import factions from '@/data/warmachine/factions.json'
import steamroller from '@/data/warmachine/steamroller.json'
import scenarios from '@/data/warmachine/scenarios.json'

const HomePage = () => import('@/views/warmachine/HomePage.vue')
const RulesPage = () => import('@/views/warmachine/RulesPage.vue')
const SteamrollerPage = () => import('@/views/warmachine/SteamrollerPage.vue')
const ArmyBuilderPage = () => import('@/views/warmachine/ArmyBuilder.vue')
const ArmyPage = () => import('@/views/warmachine/ArmyPage.vue')
const FactionPage = () => import('@/views/warmachine/FactionPage.vue')
const ScenarioPage = () => import('@/views/warmachine/ScenarioPage.vue')

export const routesWarmachine = [
  {
    path: '/warmachine',
    name: 'Warmachine Home',
    component: HomePage
  },
  {
    path: '/warmachine/rules',
    name: 'Warmachine Rules',
    component: RulesPage
  },
  {
    path: '/warmachine/steamroller',
    name: 'Steamroller 2025',
    component: SteamrollerPage
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
      const customScenarioSlugs = scenarios.map((item) => item.name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, ''))
      if (to?.params?.scenario &&
        (slugs.indexOf(to.params.scenario) >= 0 || customScenarioSlugs.indexOf(to.params.scenario) >= 0)) {
        // console.log(to?.params?.scenario)
      } else {
        return { name: 'NotFound' }
      }
    },
    props: scenario => ({
      scenario: steamroller.sections[5].scenarios.find((item) => item.name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '') === scenario.params.scenario) || scenarios.find((item) => item.name
        .toLowerCase()
        .replace(/ /g, '-') === scenario.params.scenario)
    })
  },
  {
    path: '/warmachine/army-builder',
    name: 'Army Builder',
    component: ArmyBuilderPage
  },
  {
    path: '/warmachine/faction/:faction',
    name: 'Warmachine Faction',
    component: FactionPage,
    children: [
      {
        path: ':army',
        name: 'Army',
        component: ArmyPage,
        beforeEnter: (to, from) => {
          // Search for army slug inside each faction
          const slugs = factions.map((item) => item.armies.map((army) => army.slug)).flat()
          if (to?.params?.army && slugs.indexOf(to.params.army) >= 0) {
            // console.log(to?.params?.faction)
          } else {
            return { name: 'NotFound' }
          }
        }
      }
    ],
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
