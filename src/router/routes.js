import IndexPage from '@/views/IndexPage.vue'
import HomePage40k from '@/views/40k/HomePage.vue'
import AdeptusAstartesPage from '@/views/40k/AdeptusAstartesPage.vue'
import AdeptusCustodesPage from '@/views/40k/AdeptusCustodesPage.vue'
import AdeptusMechanicusPage from '@/views/40k/AdeptusMechanicusPage.vue'
import AdeptaSororitasPage from '@/views/40k/AdeptaSororitasPage.vue'
import AeldariPage from '@/views/40k/AeldariPage.vue'
import AgentsImperiumPage from '@/views/40k/AgentsImperiumPage.vue'
import AstraMilitarumPage from '@/views/40k/AstraMilitarumPage.vue'
import BlackTemplarsPage from '@/views/40k/BlackTemplarsPage.vue'
import BloodAngelsPage from '@/views/40k/BloodAngelsPage.vue'
import ChaosDaemonsPage from '@/views/40k/ChaosDaemonsPage.vue'
import ChaosKnightsPage from '@/views/40k/ChaosKnightsPage.vue'
import ChaosSpaceMarinesPage from '@/views/40k/ChaosSpaceMarinesPage.vue'
import DarkAngelsPage from '@/views/40k/DarkAngelsPage.vue'
import DeathGuardPage from '@/views/40k/DeathGuardPage.vue'
import DeathwatchPage from '@/views/40k/DeathwatchPage.vue'
import DrukhariPage from '@/views/40k/DrukhariPage.vue'
import GenestealerCultsPage from '@/views/40k/GenestealerCultsPage.vue'
import GreyKnightsPage from '@/views/40k/GreyKnightsPage.vue'
import ImperialKnightsPage from '@/views/40k/ImperialKnightsPage.vue'
import LeaguesVotannPage from '@/views/40k/LeaguesVotannPage.vue'
import NecronsPage from '@/views/40k/NecronsPage.vue'
import OrksPage from '@/views/40k/OrksPage.vue'
import SpaceWolvesPage from '@/views/40k/SpaceWolvesPage.vue'
import TauEmpirePage from '@/views/40k/TauEmpirePage.vue'
import ThousandSonsPage from '@/views/40k/ThousandSonsPage.vue'
import TyranidsPage from '@/views/40k/TyranidsPage.vue'
import WorldEatersPage from '@/views/40k/WorldEatersPage.vue'
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
    path: '/40k/aledari',
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