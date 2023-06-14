<template>
  <article class="page">
    <site-header path="/40k" title="WH40k 10th edition profiles" />
    <FilterForm v-model:nameFilter="nameFilter" />
    <ProfilesList :profiles="filteredProfiles" />
    <PageFooter40k />
  </article>
</template>

<script setup>
import { computed, ref } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import FilterForm from '@/components/FilterForm.vue'
import ProfilesList from '@/components/ProfilesList.vue'
import PageFooter40k from '@/components/40k/PageFooter40k.vue'
import profiles from '@/api/40k-index-dark-angels.json'

const nameFilter = ref('')

const filteredProfiles = computed(() => {
  return profiles.filter((profile) => profile.name.toLowerCase().indexOf(nameFilter.value.toLowerCase()) >= 0)
})
</script>
