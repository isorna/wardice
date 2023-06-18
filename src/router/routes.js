const IndexPage = () => import('@/views/IndexPage.vue')
const HomePage40k = () => import('@/views/40k/HomePage.vue')
const AdeptusAstartesPage = () => import('@/views/40k/AdeptusAstartesPage.vue')
const AdeptusCustodesPage = () => import('@/views/40k/AdeptusCustodesPage.vue')
const AdeptusMechanicusPage = () => import('@/views/40k/AdeptusMechanicusPage.vue')
const AdeptaSororitasPage = () => import('@/views/40k/AdeptaSororitasPage.vue')
const AeldariPage = () => import('@/views/40k/AeldariPage.vue')
const AgentsImperiumPage = () => import('@/views/40k/AgentsImperiumPage.vue')
const AstraMilitarumPage = () => import('@/views/40k/AstraMilitarumPage.vue')
const BlackTemplarsPage = () => import('@/views/40k/BlackTemplarsPage.vue')
const BloodAngelsPage = () => import('@/views/40k/BloodAngelsPage.vue')
const ChaosDaemonsPage = () => import('@/views/40k/ChaosDaemonsPage.vue')
const ChaosKnightsPage = () => import('@/views/40k/ChaosKnightsPage.vue')
const ChaosSpaceMarinesPage = () => import('@/views/40k/ChaosSpaceMarinesPage.vue')
const DarkAngelsPage = () => import('@/views/40k/DarkAngelsPage.vue')
const DeathGuardPage = () => import('@/views/40k/DeathGuardPage.vue')
const DeathwatchPage = () => import('@/views/40k/DeathwatchPage.vue')
const DrukhariPage = () => import('@/views/40k/DrukhariPage.vue')
const GenestealerCultsPage = () => import('@/views/40k/GenestealerCultsPage.vue')
const GreyKnightsPage = () => import('@/views/40k/GreyKnightsPage.vue')
const ImperialKnightsPage = () => import('@/views/40k/ImperialKnightsPage.vue')
const LeaguesVotannPage = () => import('@/views/40k/LeaguesVotannPage.vue')
const NecronsPage = () => import('@/views/40k/NecronsPage.vue')
const OrksPage = () => import('@/views/40k/OrksPage.vue')
const SpaceWolvesPage = () => import('@/views/40k/SpaceWolvesPage.vue')
const TauEmpirePage = () => import('@/views/40k/TauEmpirePage.vue')
const ThousandSonsPage = () => import('@/views/40k/ThousandSonsPage.vue')
const TyranidsPage = () => import('@/views/40k/TyranidsPage.vue')
const WorldEatersPage = () => import('@/views/40k/WorldEatersPage.vue')

// import Page from '@/views/Page.vue'

export const routes = [
  {
    path: '/',
    name: 'Index',
    component: IndexPage
  },
  {
    path: '/40k',
    name: '40k Home',
    component: HomePage40k
  },
  {
    path: '/40k/adepta-sororitas',
    name: 'Adepta Sororitas',
    component: AdeptaSororitasPage
  },
  {
    path: '/40k/adeptus-astartes',
    name: 'Adeptus Astartes',
    component: AdeptusAstartesPage
  },
  {
    path: '/40k/adeptus-custodes',
    name: 'Adeptus Custodes',
    component: AdeptusCustodesPage
  },
  {
    path: '/40k/adeptus-mechanicus',
    name: 'Adeptus Mechanicus',
    component: AdeptusMechanicusPage
  },
  {
    path: '/40k/aeldari',
    name: 'Aeldari',
    component: AeldariPage
  },
  {
    path: '/40k/agents-imperium',
    name: 'Agents of the Imperium',
    component: AgentsImperiumPage
  },
  {
    path: '/40k/astra-militarum',
    name: 'Astra Militarum',
    component: AstraMilitarumPage
  },
  {
    path: '/40k/black-templars',
    name: 'Black Templars',
    component: BlackTemplarsPage
  },
  {
    path: '/40k/blood-angels',
    name: 'Blood Angels',
    component: BloodAngelsPage
  },
  {
    path: '/40k/chaos-daemons',
    name: 'Chaos Daemons',
    component: ChaosDaemonsPage
  },
  {
    path: '/40k/chaos-knights',
    name: 'Chaos Knights',
    component: ChaosKnightsPage
  },
  {
    path: '/40k/chaos-space-marines',
    name: 'Chaos Space Marines',
    component: ChaosSpaceMarinesPage
  },
  {
    path: '/40k/dark-angels',
    name: 'Dark Angels',
    component: DarkAngelsPage
  },
  {
    path: '/40k/death-guard',
    name: 'Death Guard',
    component: DeathGuardPage
  },
  {
    path: '/40k/deathwatch',
    name: 'Deathwatch',
    component: DeathwatchPage
  },
  {
    path: '/40k/drukhari',
    name: 'Drukhari',
    component: DrukhariPage
  },
  {
    path: '/40k/genestealer-cults',
    name: 'Genestealer Cults',
    component: GenestealerCultsPage
  },
  {
    path: '/40k/grey-knights',
    name: 'Grey Knights',
    component: GreyKnightsPage
  },
  {
    path: '/40k/imperial-knights',
    name: 'Imperial Knights',
    component: ImperialKnightsPage
  },
  {
    path: '/40k/leagues-votann',
    name: 'Leagues of Votann',
    component: LeaguesVotannPage
  },
  {
    path: '/40k/necrons',
    name: 'Necrons',
    component: NecronsPage
  },
  {
    path: '/40k/orks',
    name: 'Orks',
    component: OrksPage
  },
  {
    path: '/40k/space-wolves',
    name: 'Space Wolves',
    component: SpaceWolvesPage
  },
  {
    path: '/40k/thousand-sons',
    name: 'Thousand Sons',
    component: ThousandSonsPage
  },
  {
    path: '/40k/tau-empire',
    name: 'T\'au Empire',
    component: TauEmpirePage
  },
  {
    path: '/40k/tyranids',
    name: 'Tyranids',
    component: TyranidsPage
  },
  {
    path: '/40k/world-eaters',
    name: 'World Eaters',
    component: WorldEatersPage
  }
  // {
  //   path: '/',
  //   name: '',
  //   component:
  // },
]
