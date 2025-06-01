<template>
  <section class="rules-list">
    <RuleCard
      :rules="rules"
      :title="title"
      :subsections="subsections" />
  </section>
</template>

<script setup>
import i18nApp from '@/i18n/en.i18n.json'
import i18nGame from '@/i18n/warmachine/en.i18n.json'
import RuleCard from '@/components/warmachine/RuleCard.vue'

const i18n = {
  ...i18nApp,
  ...i18nGame
}
defineProps(['rules', 'title', 'subsections'])
</script>

<style scoped>
.rules-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
}
</style>
