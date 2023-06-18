<template>
  <article class="page">
    <site-header path="/40k" :title="pageTitle" />
    <FilterForm v-model:nameFilter="nameFilter" />
    <SavedList v-if="appStore.isListVisible" />
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
import ProfilesList from '@/components/40k/ProfilesList.vue'
import PageFooter from '@/components/PageFooter.vue'
import { useAppStore } from '@/store/app.store'
import factions from '@/data/40k/factions.json'

const route = useRoute()
const appStore = useAppStore()
const API = `/api/40k/40k-index-${route.params.faction}.json`
const listId = route.params.faction
const nameFilter = ref('')
const profiles = ref([])
const filteredProfiles = computed(() => {
  return profiles.value.filter((profile) => profile.name.toLowerCase().indexOf(nameFilter.value.toLowerCase()) >= 0)
})
const pageTitle = computed(() => `WH40k: ${factions.filter((item) => item.slug === route.params.faction)[0].name}`)

async function fetchData () {
  const res = await fetch(API)
  profiles.value = await res.json()
}

onMounted(() => {
  fetchData()
})

appStore.setActiveList(listId)
</script>
