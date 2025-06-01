<template>
  <article class="page">
    <site-header path="/" :title="i18n.GAMES_TITLE" @show-help="tour.resetTour()" />
    <section class="games-section">
      <h2>{{ i18n.GAMES_P1 }}</h2>
      <ul class="games-list">
        <!-- <li>
          <strong><router-link data-step="1" to="/40k">Warhammer 40.000 10th edition</router-link></strong>
          &nbsp;property of <a href="https://www.games-workshop.com" target="_blank">&copy; Games Workshop Ltd.</a>
        </li> -->
        <li>
          <strong><router-link data-step="1" to="/warmachine">Warmachine MK4</router-link></strong>
          &nbsp;property of <a href="https://www.steamforged.com" target="_blank">&copy; Steamforged Gamess Ltd.</a>
        </li>
      </ul>
      <div class="reset-data">
        <p>
          <em>Have any problem with local data?</em>
          <button class="reset-button" @click="resetAppData()" data-step="2">reset app</button>
        </p>
      </div>
    </section>
    <VTour ref="tour" :steps="steps" :buttonLabels="tourButtonLabels" autoStart highlight />
    <PageFooter />
  </article>
</template>

<script setup>
import { ref, computed } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import i18nApp from '@/i18n/en.i18n.json'
import { useAppStore } from '@/store/app.store'
import { useListsStore } from '@/store/40k/lists.store'

const tour = ref(null)
const i18n = {
  ...i18nApp
}
const appStore = useAppStore()
const listsStore = useListsStore()
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
      placement: 'top'
    }
  ]
})

function resetAppData () {
  if (window.confirm(i18n.RESET_APP_CONFIRM)) {
    appStore.resetAppData()
    listsStore.resetListsStore()
  }
}
</script>

<style scoped>
.page {
  height: 100vh;
}

.games-section {
  position: relative;
}

.games-list {
  margin-top: 20px;
  font-size: 20px;
  line-height: 40px;
}

.games-list li {
  list-style-type: square;
}

.reset-data {
  font-size: 18px;
  font-weight: bold;
  line-height: 30px;
  position: absolute;
  bottom: 0;
}

.reset-button {
  font-family: var(--font-family-text);
  font-size: 18px;
  line-height: 30px;
  margin-left: 2rem;
}
</style>
