<template>
  <article class="page">
    <site-header path="/warmachine" :title="pageTitle" @show-help="tour.resetTour()" />
    <section>
      <h1>{{ scenario.name }}</h1>
      <template v-for="(rule, index) in scenarioRules" :key="`rules-${index}`">
        <p class="scenario-rule"><strong>{{index.replaceAll('_', ' ')}}</strong></p>
        <ol v-if="Array.isArray(rule)">
          <li v-for="(item, index) in rule" :key="`rule-${index}`">{{ item }}</li>
        </ol>
        <p v-else>{{ rule }}</p>
      </template>
      <div class="scenario-map">
        <InlineSvg
          :src="import(`@/data/warmachine/scenarios/${ fileName }.svg`)"
          :alt="scenario.name" />
      </div>
    </section>
    <PageFooter />
  </article>
</template>

<script setup>
import SiteHeader from '@/components/SiteHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import InlineSvg from '@/components/InlineSvg.vue'
import { computed, ref, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/app.store'
import i18nApp from '@/i18n/en.i18n.json'
import i18nGame from '@/i18n/warmachine/en.i18n.json'

const props = defineProps({
  scenario: Object
})
const route = useRoute()
const appStore = useAppStore()
const i18n = {
  ...i18nApp,
  ...i18nGame
}
const pageTitle = computed(() => `${i18n.GAME_TITLE} ${i18n.GAME_EDITION}: Scenario`)
const fileName = computed(() => {
  return props.scenario.map_image_filename.replace(/^.*\/|\.svg$/g, '')
})
const scenarioRules = computed(() => {
  return props.scenario.rules
})
</script>

<style scoped>
.scenario-map {
  margin-top: 2rem;
  text-align: center;
}
.scenario-rule {
  margin-top: 1rem;

  strong {
    text-transform: capitalize;
  }

  &+ol {
    padding-left: 2rem;
    li {
      list-style-type: disc;
    }
  }
}
</style>