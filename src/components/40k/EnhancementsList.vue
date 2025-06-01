<template>
  <section class="enhancement-list">
    <h1>{{ i18n.ENHANCEMENTS }}</h1>
    <EnhancementCard
      v-for="(enhancement) in enhancements"
      :key="enhancement.id"
      :enhancement="enhancement" />
  </section>
</template>

<script setup>
import i18nApp from '@/i18n/en.i18n.json'
import i18n40k from '@/i18n/40k/en.i18n.json'
import EnhancementCard from '@/components/40k/EnhancementCard.vue'

const i18n = {
  ...i18nApp,
  ...i18n40k
}
defineProps(['enhancements'])
</script>

<style scoped>
.enhancement-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
}
</style>
