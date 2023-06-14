<template>
  <section class="profiles-list">
    <ProfileCard
      v-for="(profile) in profiles"
      :key="profile.id"
      :profile="profile" />
  </section>
</template>

<script setup>
import ProfileCard from '@/components/ProfileCard.vue'
defineProps(['profiles'])
</script>

<style scoped>
.profiles-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>