<template>
  <div class="list-wrapper" v-if="appStore.activeListId === '' || activeList === undefined">
    <h1 class="list-title">No saved list yet</h1>
  </div>
  <section class="list-wrapper saved" ref="listContent" v-else>
    <h1 class="list-title" @click="copyListToClipboard()">{{ activeList?.name || activeList.id.replaceAll('-', ' ').toUpperCase() }} ({{ totalPoints }}p)</h1>
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
          <p class="enhancement">
            <strong class="name">{{ enhancement.name }}</strong>
            <em class="points">{{ enhancement.points }}p</em>
          </p>
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
          <p class="profile">
            <span class="item-title">
              <strong class="name">{{ profile.name }}</strong>
              <em class="points">{{ profile.points }}p</em>
            </span>
            <span class="info subtype" v-if="profile.subtype">{{ profile.subtype }}</span>
            <span class="info qty">{{ profile.qty }}</span>
          </p>
        </li>
      </ul>
    </template>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
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
const listContent = ref('')

// TODO: validar la lista
const totalPoints = computed(() => {
  if (!activeList.value) {
    return 0
  }
  const enhancementsPoints = (activeList.value?.enhancements?.length === 0) ? 0 : addPoints(activeList.value.enhancements)
  const profilesPoints = (activeList.value?.profiles?.length === 0) ? 0 : addPoints(activeList.value.profiles)

  return profilesPoints + enhancementsPoints
})

function addPoints (items) {
  return items.map((item) => item.points)
    .reduce((previousValue, currentValue) => {
      return previousValue + currentValue
    }) || 0
}

defineProps(['listid'])

// TODO: copy list text
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard
// https://web.dev/i18n/en/async-clipboard/
async function copyListToClipboard () {
  try {
    await navigator.clipboard.writeText(listContent.value.innerText)
    console.log('copiado', listContent.value.innerText)
  } catch (err) {
    console.error('fallo al copiar', err)
  }
}
</script>

<style scoped>
section.list-wrapper {
  border-radius: 8px;
  margin-bottom: 20px;
}

.list-title,
.list-section-title {
  color: var(--darkest-blue);
}

.saved .list-title {
  cursor: copy;
}

.saved .list-title:hover {
  text-decoration: 4px underline dotted var(--brand-color);
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
  font-size: 20px;
  gap: 10px;
}

.enhancement,
.profile {
  display: flex;
  flex-flow: wrap row;
  gap: 0;
  justify-content: space-between;
  width: 100%;
}

.item-title {
  display: flex;
  flex-flow: nowrap row;
  gap: 0;
  justify-content: space-between;
  width: 100%;
}

.name {
  font-weight: bold;
  line-height: 40px;
}

.points {
  color: var(--medium-blue);
  line-height: 40px;
  text-align: right;
}

.qty {
  color: var(--medium-blue);
}

/* .subtype {

} */

.info {
  font-size: 14px;
  line-height: 20px;
  width: 100%;
}

.delete-enhancement,
.delete-profile {
  height: 40px;
}
</style>
