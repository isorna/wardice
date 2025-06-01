<template>
  <article class="page">
    <site-header path="/warmachine" :title="pageTitle" @show-help="tour.resetTour()" />
    <section v-if="error">
      <p class="error-message"><strong>{{ i18n.ERROR_TITLE }}:</strong> {{ error.message }}</p>
    </section>
    <template v-else-if="data">
      <FactionMenu :faction="factionId" />
      <!-- <FilterForm v-if="appStore.isFilterVisible" v-model:nameFilter="nameFilter" /> -->
      <SavedList v-if="appStore.isListVisible" />
      <FactionRulesList v-if="appStore.isRulesVisible" :rules="data.rules" :detachments="data.detachments" />
      <template
        v-for="(detachment, index) in filteredDetachments"
        :key="`detachment-${index}`">
        <section v-if="appStore.isDetachmentsVisible || appStore.isStratagemsVisible || appStore.isEnhancementsVisible">
          <h1 v-if="appStore.isDetachmentsVisible" class="detachment-title">{{ i18n.DETACHMENT }} : <em class="detachment-name">{{ detachment.title }}</em></h1>
          <DetachmentRulesCard v-if="appStore.isDetachmentsVisible" :rules="detachment.rules" />
          <StratagemsList v-if="appStore.isStratagemsVisible" :stratagems="detachment.stratagems" />
          <EnhancementsList v-if="appStore.isEnhancementsVisible" :enhancements="detachment.enhancements" />
        </section>
      </template>
      <TauDrones v-if="data.drones?.length > 0 && appStore.isDronesVisible" :drones="data.drones" />
      <ProfilesList v-if="appStore.isProfilesVisible" :profiles="filteredProfiles" />
    </template>
    <section v-else>
      <p class="loading-message"><em>{{ i18n.LOADING }}...</em></p>
    </section>
    <VTour ref="tour" :steps="steps" :buttonLabels="tourButtonLabels" autoStart highlight />
    <PageFooter />
  </article>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import FactionMenu from '@/components/40k/FactionMenu.vue'
// import FilterForm from '@/components/40k/FilterForm.vue'
import SavedList from '@/components/40k/SavedList.vue'
import FactionRulesList from '@/components/40k/FactionRulesList.vue'
import DetachmentRulesCard from '@/components/40k/DetachmentRulesCard.vue'
import StratagemsList from '@/components/40k/StratagemsList.vue'
import EnhancementsList from '@/components/40k/EnhancementsList.vue'
import TauDrones from '@/components/40k/TauDrones.vue'
import ProfilesList from '@/components/40k/ProfilesList.vue'
import PageFooter from '@/components/PageFooter.vue'
import { useAppStore } from '@/store/app.store'
import { useListsStore } from '@/store/40k/lists.store'
import { useFetch } from '@/helpers/useFetch.js'
import factions from '@/data/40k/factions.json'
import i18nApp from '@/i18n/en.i18n.json'
import i18n40k from '@/i18n/40k/en.i18n.json'

const i18n = {
  ...i18nApp,
  ...i18n40k
}
const route = useRoute()
const appStore = useAppStore()
const listsStore = useListsStore()
const activeList = computed(() => {
  return listsStore.getListById(appStore.activeListId)
})
const API = computed(() => {
  return route?.params?.faction === undefined
    ? undefined
    : `https://raw.githubusercontent.com/isorna/wardice-40k-api/main/40k-index-${route.params.faction}.json?${Date.now()}`
})
const factionId = route.params.faction
const nameFilter = ref('')
const { data, error } = useFetch(API)
const filteredProfiles = computed(() => {
  const returnValue = (Array.isArray(data.value.profiles) && data.value.profiles.length > 0)
    ? data.value.profiles
      .filter((profile) => profile.name.toLowerCase().indexOf(nameFilter.value.toLowerCase()) >= 0)
      .map((profile, index) => {
        return {
          // TODO: crear este dato directamente en los JSON?
          faction: factionId,
          ...profile
          // TODO: transformar el array de puntos para que incluya las opciones de wargear?
        }
      })
      .filter((profile) => {
        return activeList.value === undefined ||
          activeList.value.profiles === undefined ||
          activeList.value.profiles.length === 0 ||
          !appStore.isFilterVisible ||
          (activeList.value.profiles.length > 0 &&
          appStore.isFilterVisible &&
          activeList.value.profiles
            .findIndex((item) => item.id === profile.id) > -1)
      })
    : []
  return returnValue
})
const filteredDetachments = computed(() => {
  const returnValue = (Array.isArray(data.value.detachments) && data.value.detachments.length > 0)
    ? data.value.detachments
      .map((detachment, index) => {
        const detachmentId = `${detachment.title.replaceAll(' ', '-').toLowerCase()}`
        return {
          id: detachmentId,
          faction: factionId,
          ...detachment,
          enhancements: detachment.enhancements
            .map((enhancement) => {
              return {
                id: `${detachmentId}-${enhancement.title.replaceAll(' ', '-').toLowerCase()}`,
                faction: factionId,
                ...enhancement
              }
            })
            .filter((enhancement) => {
              return activeList.value === undefined ||
                activeList.value.enhancements === undefined ||
                activeList.value.enhancements.length === 0 ||
                !appStore.isFilterVisible ||
                (activeList.value.enhancements.length > 0 &&
                appStore.isFilterVisible &&
                activeList.value.enhancements
                  .findIndex((item) => item.id === enhancement.id) > -1)
            })
        }
      })
    : []
  return returnValue
})
const pageTitle = computed(() => `WH40k: ${factions.filter((item) => item.slug === factionId)[0].name}`)
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
      content: i18n.HELP_FACTION_STEP_1,
      placement: 'bottom'
    },
    {
      target: '[data-step="2"]',
      content: i18n.HELP_FACTION_STEP_2,
      placement: 'bottom'
    },
    {
      target: '[data-step="3"]',
      content: i18n.HELP_FACTION_STEP_3,
      placement: 'bottom'
    },
    {
      target: '[data-step="4"]',
      content: i18n.HELP_FACTION_STEP_4,
      placement: 'bottom'
    },
    {
      target: '[data-step="5"]',
      content: i18n.HELP_FACTION_STEP_5,
      placement: 'bottom'
    },
    {
      target: '[data-step="6"]',
      content: i18n.HELP_FACTION_STEP_6,
      placement: 'bottom'
    },
    {
      target: '[data-step="7"]',
      content: i18n.HELP_FACTION_STEP_7,
      placement: 'bottom'
    }
  ]
})
</script>

<style scoped>
.error-message {
  line-height: 40px;
  font-family: var(--font-family-text);
  font-size: 30px;
}

.loading-message {
  line-height: 40px;
  font-family: var(--font-family-text);
  font-size: 20px;
  text-align: center;
}

.detachment-title {
  border-bottom: 4px dotted var(--brand-color);
}

.detachment-name {
  color: var(--bright-turquoise);
  font-style: normal;
}
</style>
