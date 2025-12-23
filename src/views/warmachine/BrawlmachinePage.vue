<template>
  <article class="page">
    <site-header path="/warmachine" :title="pageTitle" @show-help="tour.resetTour()" @translate="$emit('translate')" />
    <section class="rules-section">
      <h1 class="section-title">{{i18n.BRAWLMACHINE_2025 || 'Brawlmachine 2025'}}</h1>
      <template v-if="brawlmachine?.sections">
        <template v-for="(section, index) in brawlmachine.sections" :key="`section-${index}`">
          <RulesList v-if="section.content || section.sub_sections" :rules="section.content" :title="section.title" :subsections="section.sub_sections" />
        </template>
      </template>
    </section>
    <!-- <VTour ref="tour" :steps="steps" :buttonLabels="tourButtonLabels" autoStart highlight /> -->
    <PageFooter />
  </article>
</template>

<script setup>
import SiteHeader from '@/components/SiteHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import RulesList from '@/components/warmachine/RulesList.vue'
import { computed, ref } from 'vue'
import { useLocalizedData } from '@/helpers/data-loader.js'
import i18nApp from '@/i18n/en.i18n.json'
import i18nGame from '@/i18n/warmachine/en.i18n.json'

const { data: brawlmachine } = useLocalizedData('brawlmachine-rules')

const i18n = {
  ...i18nApp,
  ...i18nGame
}

const pageTitle = computed(() => `${i18n.GAME_TITLE} ${i18n.GAME_EDITION}: Brawlmachine`)
// Mock tour to avoid crashes if triggered, consistent with other pages structure
const tour = ref({ resetTour: () => {} })

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
