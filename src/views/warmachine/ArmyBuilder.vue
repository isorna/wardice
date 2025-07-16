<template>
  <article class="page">
    <site-header path="/warmachine" :title="pageTitle" @show-help="tour.resetTour()" />

    <section class="factions-section">
      <h1 class="section-title">Select a faction</h1>
      <ul class="faction-list">
        <li class="faction-list__item"
          :class="{'animate__animated animate__bounce': faction.favorite}"
          ref="itemRefs"
          v-for="(faction, index) in filteredFactions"
          :key="`factions-${index}`">
          <router-link
            :data-step="index === 0 ? '1' : undefined"
            :to="faction.link">{{ faction.name }}</router-link>
          <Icon
            icon="ic:outline-bookmark"
            @click="removeBookmark(index, faction.id)"
            :data-step="index === 0 ? '2' : undefined"
            v-if="faction.favorite"
            :title="i18n.FAVORITE" />
          <Icon
            @click="saveBookmark(index, faction.id)"
            :data-step="index === 0 ? '2' : undefined"
            icon="ic:outline-bookmark-border"
            v-else
            :title="i18n.FAVORITE" />
        </li>
      </ul>
    </section>
    <VTour ref="tour" :steps="steps" :buttonLabels="tourButtonLabels" autoStart highlight />
    <PageFooter />
  </article>
</template>

<script setup>
import SiteHeader from '@/components/SiteHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import RulesList from '@/components/warmachine/RulesList.vue'
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useAppStore } from '@/store/app.store'
import factions from '@/data/warmachine/factions.json'
import i18nApp from '@/i18n/en.i18n.json'
import i18nGame from '@/i18n/warmachine/en.i18n.json'

const itemRefs = ref([])
const i18n = {
  ...i18nApp,
  ...i18nGame
}
const appStore = useAppStore()
const pageTitle = computed(() => `${i18n.GAME_TITLE} ${i18n.GAME_EDITION}: ${i18n.ARMY_BUILDER_TITLE}`)
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
const filteredFactions = computed(() => {
  let returnValue = factions
    .map((faction) => {
      return {
        id: faction.slug,
        name: faction.name,
        link: `/warmachine/faction/${faction.slug}`,
        favorite: false
      }
    })

  if (appStore.favoriteFactions.length > 0) {
    returnValue = [
      ...returnValue.filter((faction) => appStore.favoriteFactions.indexOf(faction.id) > -1)
        .map((faction) => {
          return {
            ...faction,
            favorite: true
          }
        }),
      ...returnValue.filter((faction) => appStore.favoriteFactions.indexOf(faction.id) === -1)
    ]
  }

  return returnValue
})

function saveBookmark (index, factionId) {
  itemRefs.value[index].classList.add('animate__animated', 'animate__bounceOutUp')
  itemRefs.value[index].addEventListener('animationend', () => {
    itemRefs.value[index].classList.remove('animate__animated', 'animate__bounceOutUp')
    appStore.favoriteFaction(factionId)
  }, { once: true })
}

function removeBookmark (index, factionId) {
  itemRefs.value[index].classList.add('animate__animated', 'animate__bounceOutDown')
  itemRefs.value[index].addEventListener('animationend', () => {
    itemRefs.value[index].classList.remove('animate__animated', 'animate__bounceOutDown')
    appStore.unfavoriteFaction(factionId)
  }, { once: true })
}
</script>

<style scoped>
svg {
  cursor: pointer;
  font-size: 40px;
  line-height: 40px;
  vertical-align: middle;
}
</style>
