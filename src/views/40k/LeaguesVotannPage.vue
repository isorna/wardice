<template>
  <article class="page">
    <site-header path="/40k" title="WH40k: Leagues of Votann" />
    <FilterForm v-model:nameFilter="nameFilter" />
    <SavedList v-if="appStore.isListVisible" />
    <ProfilesList :profiles="filteredProfiles" />
    <PageFooter />
  </article>
</template>

<script setup>
import { computed, ref } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import FilterForm from '@/components/40k/FilterForm.vue'
import SavedList from '@/components/40k/SavedList.vue'
import ProfilesList from '@/components/40k/ProfilesList.vue'
import PageFooter from '@/components/40k/PageFooter.vue'
import profiles from '@/api/40k/40k-index-leagues-votann.json'
import { useAppStore } from '@/store/app.store'

const appStore = useAppStore()
const nameFilter = ref('')
const listId = 'leagues-votann'

const filteredProfiles = computed(() => {
  return profiles.filter((profile) => profile.name.toLowerCase().indexOf(nameFilter.value.toLowerCase()) >= 0)
})

// onMounted(() => {
appStore.setActiveList(listId)
// })
</script>
