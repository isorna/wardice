<template>
  <section class="drones-list">
    <h1>{{ i18n.DRONES }}</h1>
    <TauDroneCard
      v-for="(drone) in drones"
      :key="drone.id"
      :drone="drone" />
  </section>
</template>

<script setup>
import i18nApp from '@/i18n/en.i18n.json'
import i18n40k from '@/i18n/40k/en.i18n..json'
import TauDroneCard from '@/components/40k/TauDroneCard.vue'

const i18n = {
  ...i18nApp,
  ...i18n40k
}
defineProps(['drones'])
</script>

<style scoped>
.drones-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}
</style>
