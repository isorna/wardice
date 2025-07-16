<template>
  <article class="page">
    <site-header path="/warmachine" :title="pageTitle" @show-help="tour.resetTour()" />
    <section>
      <h1>WORK IN PROGRESS</h1>
    </section>
    <PageFooter />
  </article>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import i18nApp from '@/i18n/en.i18n.json'
import i18nGame from '@/i18n/warmachine/en.i18n.json'

const i18n = {
  ...i18nApp,
  ...i18nGame
}
const route = useRoute()
const pageTitle = computed(() => `${i18n.GAME_TITLE} ${i18n.GAME_EDITION}: ${i18n.RULES_TITLE}`)
</script>

<style scoped>

</style>
