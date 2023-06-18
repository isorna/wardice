<template>
  <div class="list-wrapper" v-if="appStore.activeListId === '' || activeList === undefined">
    <h1>No saved list yet</h1>
  </div>
  <div class="list-wrapper" v-else>
    <h1>{{ activeList?.name || activeList.id.replaceAll('-', ' ').toUpperCase() }} ({{ totalPoints }}p)</h1>
    <ul class="list-profiles">
      <li
        class="list-profile"
        v-for="(profile, index) in activeList.profiles"
        :key="`profile-${index}`">
        <p>- <strong>{{ profile.name }}</strong> ({{ profile.qty }}): {{ profile.points }}p</p>
        <button
          class="delete-profile"
          :title="i18n.REMOVE"
          @click="listsStore.removeProfileFromList({ listId: appStore.activeListId, index })">-</button>
      </li>
    </ul>
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
const activeList = listsStore.getListById(appStore.activeListId)

// TODO: validar la lista
const totalPoints = computed(() => {
  if (activeList.profiles.length === 0) return 0
  return activeList.profiles
    .map((item) => item.points)
    .reduce((previousValue, currentValue) => {
      return previousValue + currentValue
    }) || 0
})

defineProps(['listid'])
</script>

<style scoped>
h1 {
  color: var(--darkest-blue);
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

.list-profiles {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}

.list-profile {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  line-height: 40px;
}

.delete-profile {
  background-color: var(--brand-color);
  clip-path: circle(30%);
  color: var(--darkest-blue);
  font-family: var(--font-family-titles);
  font-size: 30px;
  opacity: .6;
  line-height: 20px;
}

.delete-profile:hover {
  background-color: var(--light-orange-gradient);
  opacity: 1;
}
</style>
