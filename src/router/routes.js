const IndexPage = () => import('@/views/IndexPage.vue')
const GamesPage = () => import('@/views/GamesPage.vue')

// V2 Layouts
const TacticalLayout = () => import('@/views/v2/tactical/TacticalLayout.vue')
const WarhackerLayout = () => import('@/views/v2/warhacker/WarhackerLayout.vue')

// V2 Tactical Pages
const TacticalFactions = () => import('@/views/v2/tactical/FactionsPage.vue')
const TacticalBuilder = () => import('@/views/v2/tactical/ArmyBuilderPage.vue')
const TacticalSummary = () => import('@/views/v2/tactical/SummaryPage.vue')
const TacticalUnit = () => import('@/views/v2/tactical/UnitDetailPage.vue')
const TacticalUnitV2 = () => import('@/views/v2/tactical/UnitDetailPageV2.vue')
const TacticalGame = () => import('@/views/v2/tactical/GamePage.vue')

// V2 Warhacker Pages
const WarhackerFactions = () => import('@/views/v2/warhacker/FactionsPage.vue')
const WarhackerBuilder = () => import('@/views/v2/warhacker/ArmyBuilderPage.vue')
const WarhackerHome = () => import('@/views/v2/warhacker/HomePage.vue')
const WarhackerUnit = () => import('@/views/v2/warhacker/UnitDetailPage.vue')
const WarhackerIntel = () => import('@/views/v2/warhacker/IntelPage.vue')

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
  },
  {
    path: '/v2/tactical',
    component: TacticalLayout,
    children: [
      { path: '', redirect: 'factions' },
      { path: 'factions', name: 'TacticalFactions', component: TacticalFactions },
      { path: 'builder', name: 'TacticalBuilder', component: TacticalBuilder },
      { path: 'summary', name: 'TacticalSummary', component: TacticalSummary },
      { path: 'unit', name: 'TacticalUnit', component: TacticalUnit },
      { path: 'unit-v2', name: 'TacticalUnitV2', component: TacticalUnitV2 },
      { path: 'game', name: 'TacticalGame', component: TacticalGame }
    ]
  },
  {
    path: '/v2/warhacker',
    component: WarhackerLayout,
    children: [
      { path: '', redirect: 'home' },
      { path: 'home', name: 'WarhackerHome', component: WarhackerHome },
      { path: 'factions', name: 'WarhackerFactions', component: WarhackerFactions },
      { path: 'builder', name: 'WarhackerBuilder', component: WarhackerBuilder },
      { path: 'unit', name: 'WarhackerUnit', component: WarhackerUnit },
      { path: 'intel', name: 'WarhackerIntel', component: WarhackerIntel }
    ]
  }
]
