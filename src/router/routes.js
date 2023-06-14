import IndexPage from '@/views/IndexPage.vue'
import Home40kPage from '@/views/40k/Home40kPage.vue'
import AdeptusAstartesPage from '@/views/40k/AdeptusAstartesPage.vue'
import BlackTemplarsPage from '@/views/40k/BlackTemplarsPage.vue'
import BloodAngelsPage from '@/views/40k/BloodAngelsPage.vue'
import ChaosDaemonsPage from '@/views/40k/ChaosDaemonsPage.vue'
import ChaosSpaceMarinesPage from '@/views/40k/ChaosSpaceMarinesPage.vue'
import DarkAngelsPage from '@/views/40k/DarkAngelsPage.vue'
import DeathGuardPage from '@/views/40k/DeathGuardPage.vue'
import SpaceWolvesPage from '@/views/40k/SpaceWolvesPage.vue'
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
    component: Home40kPage
  },
  {
    path: '/40k/adeptus-astartes',
    name: 'Adeptus Astartes',
    component: AdeptusAstartesPage
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
    path: '/40k/space-wolves',
    name: 'Space Wolves',
    component: SpaceWolvesPage
  },
  {
    path: '/40k/thousand-sons',
    name: 'ThousandSonsPage',
    component: ThousandSonsPage
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
