<template>
  <article class="page">
    <site-header path="/40k" title="WH40k: Blood Angels" />
    <FilterForm v-model:nameFilter="nameFilter" />
    <ProfilesList :profiles="filteredProfiles" />
    <PageFooter />
  </article>
</template>

<script setup>
import { computed, ref } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import FilterForm from '@/components/40k/FilterForm.vue'
import ProfilesList from '@/components/40k/ProfilesList.vue'
import PageFooter from '@/components/40k/PageFooter.vue'
import profiles from '@/api/40k/40k-index-blood-angels.json'

const nameFilter = ref('')

const filteredProfiles = computed(() => {
  return profiles.filter((profile) => profile.name.toLowerCase().indexOf(nameFilter.value.toLowerCase()) >= 0)
})
</script>
