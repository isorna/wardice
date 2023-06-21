<template>
  <section class="profiles-list">
    <h1>{{ i18n.PROFILES }}</h1>
    <ProfileCard
      v-for="(profile) in profiles"
      :key="profile.id"
      :profile="profile" />
  </section>
</template>

<script setup>
import i18nApp from '@/i18n/en.i18n.json'
import i18n40k from '@/i18n/40k/en.i18n.40k.json'
import ProfileCard from '@/components/40k/ProfileCard.vue'

const i18n = {
  ...i18nApp,
  ...i18n40k
}
defineProps(['profiles'])
</script>

<style scoped>
.profiles-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
