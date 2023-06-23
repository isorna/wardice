<template>
  <nav class="menu-wrapper">
    <ol class="menu">
      <li class="menu-item">
        <button class="list-button"
          :class="{ 'active': appStore.isFilterVisible }"
          @click="appStore.toggleFilter()">{{ i18n.FILTER }}</button>
      </li>
      <li class="menu-item">
        <button class="list-button"
          :class="{ 'active': appStore.isListVisible }"
          @click="appStore.toggleList()">{{ i18n.LIST }}</button>
      </li>
      <li class="menu-item">
        <button class="list-button"
          :class="{ 'active': appStore.isRulesVisible }"
          @click="appStore.toggleRules()">{{ i18n.RULES }}</button>
      </li>
      <li class="menu-item">
        <button class="list-button"
          :class="{ 'active': appStore.isDetachmentsVisible }"
          @click="appStore.toggleDetachments()">{{ i18n.DETACHMENTS }}</button>
      </li>
      <li class="menu-item">
        <button class="list-button"
          :class="{ 'active': appStore.isStratagemsVisible }"
          @click="appStore.toggleStratagems()">{{ i18n.STRATAGEMS }}</button>
      </li>
      <li class="menu-item">
        <button class="list-button"
          :class="{ 'active': appStore.isEnhancementsVisible }"
          @click="appStore.toggleEnhancements()">{{ i18n.ENHANCEMENTS }}</button>
      </li>
      <li class="menu-item"
        v-if="faction === 'tau-empire'">
        <button class="list-button"
          :class="{ 'active': appStore.isDronesVisible }"
          @click="appStore.toggleDrones()">{{ i18n.DRONES }}</button>
      </li>
      <li class="menu-item">
        <button class="list-button"
          :class="{ 'active': appStore.isProfilesVisible }"
          @click="appStore.toggleProfiles()">{{ i18n.PROFILES }}</button>
      </li>
    </ol>
  </nav>
</template>

<!-- TODO: usar https://github.com/Locequen/40k-Data-Card -->

<script setup>
import { useAppStore } from '@/store/app.store'
import i18nApp from '@/i18n/en.i18n.json'
import i18n40k from '@/i18n/40k/en.i18n.40k.json'

const i18n = {
  ...i18nApp,
  ...i18n40k
}
const appStore = useAppStore()

defineProps(['faction'])
</script>

<style scoped>
.menu-wrapper {
  border-bottom: 1px dotted var(--border-color);
  padding: 10px 20px;
}

.menu {
  display: flex;
  flex-flow: row wrap;
  font-size: 14px;
  gap: 10px;
  justify-content: flex-start;
}

/* .menu-item {
} */

.list-button {
  background-color: var(--darkest-blue);
  border: 2px dotted var(--brand-color);
  color: var(--brand-color);
}

.list-button:hover {
  border-style: solid;
}

.list-button.active {
  background-color: var(--brand-color);
  border: 2px solid var(--light-orange-gradient);
  color: var(--darkest-blue);
}
</style>
