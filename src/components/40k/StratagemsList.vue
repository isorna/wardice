<template>
  <section class="stratagems-list">
    <h1>{{ i18n.STRATAGEMS }}</h1>
    <StratagemCard
      v-for="(stratagem, index) in stratagems"
      :key="`stratagem-${index}`"
      :stratagem="stratagem" />
  </section>
</template>

<script setup>
import i18nApp from '@/i18n/en.i18n.json'
import i18n40k from '@/i18n/40k/en.i18n..json'
import StratagemCard from '@/components/40k/StratagemCard.vue'

const i18n = {
  ...i18nApp,
  ...i18n40k
}
defineProps(['stratagems'])
</script>

<style scoped>
.stratagems-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
}
</style>
