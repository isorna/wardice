<template>
  <nav class="menu-wrapper">
    <!--
    <Icon icon="game-icons:rank-1" />
    <Icon icon="game-icons:rank-2" />
    <Icon icon="game-icons:rank-3" />
    <Icon icon="game-icons:steeltoe-boots" />
    <Icon icon="game-icons:star-medal" />
    <Icon icon="game-icons:tank-tread" />
    <Icon icon="game-icons:truck" />
    <Icon icon="game-icons:binoculars" />
    <Icon icon="game-icons:allied-star" />
    <Icon icon="game-icons:android-mask" />
    <Icon icon="game-icons:ammo-box" />
    <Icon icon="game-icons:artificial-hive" />
    <Icon icon="game-icons:book-pile" />
    <Icon icon="game-icons:calculator" />
    <Icon icon="game-icons:calendar" />
    <Icon icon="game-icons:family-tree" />
    <Icon icon="game-icons:compass" />
    <Icon icon="game-icons:cryo-chamber" />
    <Icon icon="game-icons:divert" />
    <Icon icon="game-icons:enlightenment" />
    <Icon icon="game-icons:laurels" />
    <Icon icon="game-icons:medal" />
    <Icon icon="game-icons:moon-orbit" />
    <Icon icon="game-icons:mono-wheel-robot" />
    <Icon icon="game-icons:open-book" />
    <Icon icon="game-icons:passport" />
    -->
    <ol class="menu">
      <li class="menu-item">
        <button class="list-button"
          :title="i18n.FILTER"
          :class="{ 'active': appStore.isFilterVisible }"
          @click="appStore.toggleFilter()">
          <Icon icon="game-icons:airtight-hatch" />
          </button>
          <!-- @click="appStore.toggleFilter()">{{ i18n.FILTER }}</button> -->
      </li>
      <li class="menu-item">
        <button class="list-button"
          :title="i18n.LIST"
          :class="{ 'active': appStore.isListVisible }"
          @click="appStore.toggleList()">
          <Icon icon="game-icons:notebook" /></button>
      </li>
      <li class="menu-item">
        <button class="list-button"
          :title="i18n.RULES"
          :class="{ 'active': appStore.isRulesVisible }"
          @click="appStore.toggleRules()">
          <Icon icon="game-icons:bookmarklet" /></button>
      </li>
      <li class="menu-item">
        <button class="list-button"
          :title="i18n.DETACHMENTS"
          :class="{ 'active': appStore.isDetachmentsVisible }"
          @click="appStore.toggleDetachments()">
          <Icon icon="game-icons:checkbox-tree" /></button>
      </li>
      <li class="menu-item">
        <button class="list-button"
          :title="i18n.STRATAGEMS"
          :class="{ 'active': appStore.isStratagemsVisible }"
          @click="appStore.toggleStratagems()">
          <Icon icon="game-icons:files" /></button>
      </li>
      <li class="menu-item">
        <button class="list-button"
          :title="i18n.ENHANCEMENTS"
          :class="{ 'active': appStore.isEnhancementsVisible }"
          @click="appStore.toggleEnhancements()">
          <Icon icon="game-icons:gear-hammer" /></button>
      </li>
      <li class="menu-item"
        v-if="faction === 'tau-empire'">
        <button class="list-button"
          :title="i18n.DRONES"
          :class="{ 'active': appStore.isDronesVisible }"
          @click="appStore.toggleDrones()">
          <Icon icon="game-icons:vintage-robot" /></button>
      </li>
      <li class="menu-item">
        <button class="list-button"
          :title="i18n.PROFILES"
          :class="{ 'active': appStore.isProfilesVisible }"
          @click="appStore.toggleProfiles()">
          <Icon icon="game-icons:ages" /></button>
      </li>
    </ol>
  </nav>
</template>

<!-- TODO: usar https://github.com/Locequen/40k-Data-Card -->

<script setup>
import { useAppStore } from '@/store/app.store'
import { Icon } from '@iconify/vue'
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

svg {
  font-size: 40px;
  line-height: 40px;
  vertical-align: middle;
}
</style>
