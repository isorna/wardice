<template>
  <article class="page">
    <site-header path="/40k" title="WH40k: Aeldari" />
    <FilterForm v-model:nameFilter="nameFilter" />
    <SavedList v-if="appStore.isListVisible" />
    <ProfilesList :profiles="filteredProfiles" />
    <PageFooter />
  </article>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import FilterForm from '@/components/40k/FilterForm.vue'
import SavedList from '@/components/40k/SavedList.vue'
import ProfilesList from '@/components/40k/ProfilesList.vue'
import PageFooter from '@/components/PageFooter.vue'
import { useAppStore } from '@/store/app.store'

const appStore = useAppStore()
const API = '/api/40k/40k-index-aeldari.json'
const listId = 'aeldari'
const nameFilter = ref('')
const profiles = ref([])
const filteredProfiles = computed(() => {
  return profiles.value.filter((profile) => profile.name.toLowerCase().indexOf(nameFilter.value.toLowerCase()) >= 0)
})

async function fetchData () {
  const res = await fetch(API)
  profiles.value = await res.json()
}

onMounted(() => {
  fetchData()
})

appStore.setActiveList(listId)
</script>
