<template>
  <header>
    <h1><router-link :to="path" >{{ title }}</router-link></h1>
    <button
      class="help-button"
      :title="i18n.HELP"
      @click="$emit('showHelp')"><Icon icon="ic:baseline-live-help" /></button>
  </header>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import i18nApp from '@/i18n/en.i18n.json'

defineProps(['title', 'path'])

const i18n = {
  ...i18nApp
}
</script>

<style scoped>
header {
  background-color: var(--dark-blue);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

h1 {
  font-size: 24px;
  line-height: 40px;
}

.help-button {
  align-items: center;
  background-color: var(--darkest-blue);
  border: 2px dotted var(--brand-color);
  color: var(--brand-color);
  display: flex;
  flex-direction: column;
  height: 40px;
  padding: 0;
  place-content: center;
  width: 40px;
}

.help-button:hover {
  border-style: solid;
}

@media (width >= 768px) {
  header {
    padding: 20px 40px;
  }

  h1 {
    font-size: 40px;
    line-height: 50px;
  }
}
</style>
