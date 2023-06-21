<template>
  <div class="list-wrapper" v-if="appStore.activeListId === '' || activeList === undefined">
    <h1 class="list-title">No saved list yet</h1>
  </div>
  <div class="list-wrapper" v-else>
    <h1 class="list-title">{{ activeList?.name || activeList.id.replaceAll('-', ' ').toUpperCase() }} ({{ totalPoints }}p)</h1>
    <template v-if="activeList.enhancements && activeList.enhancements.length > 0">
      <h2 class="list-section-title">{{ i18n.ENHANCEMENTS }}</h2>
      <ul class="list-enhancements">
        <li
          class="list-enhancement"
          v-for="(enhancement, index) in activeList.enhancements"
          :key="`enhancement-${index}`">
          <button
            class="delete-enhancement"
            :title="i18n.REMOVE"
            @click="listsStore.removeFromList({ listId: appStore.activeListId, index, category: 'enhancements' })">-</button>
          <p><strong>{{ enhancement.name }}</strong> {{ enhancement.points }}p</p>
        </li>
      </ul>
    </template>
    <template v-if="activeList.profiles && activeList.profiles.length > 0">
      <h2 class="list-section-title">{{ i18n.PROFILES }}</h2>
      <ul class="list-profiles">
        <li
          class="list-profile"
          v-for="(profile, index) in activeList.profiles"
          :key="`profile-${index}`">
          <button
            class="delete-profile"
            :title="i18n.REMOVE"
            @click="listsStore.removeFromList({ listId: appStore.activeListId, index, category: 'profiles' })">-</button>
          <p><strong>{{ profile.name }}</strong> ({{ profile.qty }}): {{ profile.points }}p</p>
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/app.store'
import { useListsStore } from '@/store/40k/lists.store'
import i18nApp from '@/i18n/en.i18n.json'
import i18n40k from '@/i18n/40k/en.i18n.40k.json'

const i18n = {
  ...i18nApp,
  ...i18n40k
}

const appStore = useAppStore()
const listsStore = useListsStore()
const activeList = computed(() => {
  return listsStore.getListById(appStore.activeListId)
})

// TODO: validar la lista
const totalPoints = computed(() => {
  if (!activeList.value || activeList.value?.profiles.length === 0) return 0
  return activeList.value.profiles
    .map((item) => item.points)
    .reduce((previousValue, currentValue) => {
      return previousValue + currentValue
    }) || 0
})

defineProps(['listid'])
</script>

<style scoped>
.list-title,
.list-section-title {
  color: var(--darkest-blue);
}

.list-section-title {
  font-family: var(--font-family-text);
}

.list-wrapper {
  background: linear-gradient(white, var(--bright-turquoise));
  border-bottom: 1px dotted var(--brand-color);
  color: var(--darkest-blue);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
}

.list-profiles,
.list-enhancements {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
}

.list-enhancement,
.list-profile {
  display: flex;
  justify-content: flex-start;
  font-size: 18px;
  gap: 10px;
  line-height: 40px;
}
</style>
