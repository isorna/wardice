<template>
  <article class="page">
    <site-header path="/warmachine" :title="pageTitle" @show-help="tour.resetTour()" />
    <section class="rules-section">
      <h1 class="section-title">{{i18n.STEAMROLLER_2025}}</h1>
      <template v-for="(section, index) in steamroller.sections" :key="`section-${index}`">
        <template v-if="index !== 5">
          <RulesList v-if="section.content" :rules="section.content" :title="section.title" :subsections="section.sub_sections" />
        </template>
        <template v-else>
          <h2>{{ section.title }}</h2>
          <ol class="links-list">
            <li class="links-item"
              v-for="(scenario, index) in filteredScenarios"
              :key="`scenarios-${index}`">
              <router-link
                :to="scenario.link">{{ scenario.name }}</router-link>
            </li>
          </ol>
        </template>
      </template>
    </section>
    <VTour ref="tour" :steps="steps" :buttonLabels="tourButtonLabels" autoStart highlight />
    <PageFooter />
  </article>
</template>

<script setup>
import SiteHeader from '@/components/SiteHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import RulesList from '@/components/warmachine/RulesList.vue'
import { computed, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useAppStore } from '@/store/app.store'
import { useLocalizedData } from '@/helpers/data-loader.js'
// section 1: Player responsibilities
// section 2: Army lists
// section 3: Setup and deployment
// section 4: Scenario elements
// section 5: Objectives
// section 6: Scenarios
// section 7: Modelling, painting & conversions
// section 8: Conversions
// section 9: Sportmanship
// section 10: Tournament organizer responsibilities
// Section 11: Recording the game
// Section 12: Prizes
import i18nApp from '@/i18n/en.i18n.json'
import i18nGame from '@/i18n/warmachine/en.i18n.json'

const { data: steamroller } = useLocalizedData('steamroller')

const filteredScenarios = computed(() => {
  if (!steamroller.value) {
    return []
  }
  return steamroller.value
    .sections[5]
    .scenarios
    .map((scenario) => {
      const slug = scenario.name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
      return {
        id: slug,
        name: scenario.name,
        link: `/warmachine/scenario/${slug}`
      }
    })
})

const itemRefs = ref([])
const i18n = {
  ...i18nApp,
  ...i18nGame
}
const appStore = useAppStore()
const pageTitle = computed(() => `${i18n.GAME_TITLE} ${i18n.GAME_EDITION}: ${i18n.SR2025_TITLE}`)
const tour = ref(null)
const tourButtonLabels = computed(() => {
  return {
    next: i18n.NEXT,
    prev: i18n.BACK,
    finish: i18n.FINISH,
    skip: i18n.SKIP
  }
})
const steps = computed(() => {
  return [
    {
      target: '[data-step="1"]',
      content: i18n.HELP_HOME_STEP_1,
      placement: 'bottom'
    },
    {
      target: '[data-step="2"]',
      content: i18n.HELP_HOME_STEP_2,
      placement: 'left'
    }
  ]
})
</script>

<style scoped>
</style>
