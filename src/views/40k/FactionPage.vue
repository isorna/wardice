<template>
  <article class="page">
    <site-header path="/40k" :title="pageTitle" />
    <FilterForm v-model:nameFilter="nameFilter" />
    <SavedList v-if="appStore.isListVisible" />
    <FactionRulesList :rules="rules" :detachments="detachments" />
    <template
      v-for="(detachment, index) in detachments"
      :key="`detachment-${index}`">
      <section>
        <h1 class="detachment-title">{{ i18n.DETACHMENT }} : <em class="detachment-name">{{ detachment.title }}</em></h1>
        <DetachmentRulesCard :rules="detachment.rules" />
        <StratagemsList :stratagems="detachment.stratagems" />
        <EnhancementsList :enhancements="detachment.enhancements" />
      </section>
    </template>
    <TauDrones v-if="drones?.length > 0" :drones="drones" />
    <ProfilesList :profiles="filteredProfiles" />
    <PageFooter />
  </article>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import FilterForm from '@/components/40k/FilterForm.vue'
import SavedList from '@/components/40k/SavedList.vue'
import FactionRulesList from '@/components/40k/FactionRulesList.vue'
import DetachmentRulesCard from '@/components/40k/DetachmentRulesCard.vue'
import StratagemsList from '@/components/40k/StratagemsList.vue'
import EnhancementsList from '@/components/40k/EnhancementsList.vue'
import TauDrones from '@/components/40k/TauDrones.vue'
import ProfilesList from '@/components/40k/ProfilesList.vue'
import PageFooter from '@/components/PageFooter.vue'
import { useAppStore } from '@/store/app.store'
import factions from '@/data/40k/factions.json'
import i18nApp from '@/i18n/en.i18n.json'
import i18n40k from '@/i18n/40k/en.i18n.40k.json'

const i18n = {
  ...i18nApp,
  ...i18n40k
}
const route = useRoute()
const appStore = useAppStore()
const API = `https://raw.githubusercontent.com/isorna/wardice-40k-api/main/40k-index-${route.params.faction}.json`
const listId = route.params.faction
const nameFilter = ref('')
const rules = ref({})
const detachments = ref([])
const drones = ref([])
const profiles = ref([])
const filteredProfiles = computed(() => {
  const returnValue = (Array.isArray(profiles.value) && profiles.value.length > 0)
    ? profiles.value.filter((profile) => profile.name.toLowerCase().indexOf(nameFilter.value.toLowerCase()) >= 0)
    : []
  return returnValue
})
const pageTitle = computed(() => `WH40k: ${factions.filter((item) => item.slug === route.params.faction)[0].name}`)

async function fetchData () {
  const res = await fetch(`${API}?${Date.now()}`)
  const data = await res.json()
    .catch(error => console.log('Authorization failed : ' + error.message))

  console.log(data)
  rules.value = data?.rules
  detachments.value = data?.detachments
  drones.value = data?.drones
  profiles.value = data?.profiles
}

onMounted(() => {
  fetchData()
})

appStore.setActiveList(listId)
</script>

<style scoped>
.detachment-title {
  border-bottom: 4px dotted var(--brand-color);
}

.detachment-name {
  color: var(--bright-turquoise);
  font-style: normal;
}
</style>
