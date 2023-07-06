<template>
  <div class="list-wrapper" v-if="appStore.activeListId === '' || activeList === undefined">
    <h1 class="list-title">{{ i18n.NO_TITLE }}</h1>
  </div>
  <section class="list-wrapper saved" ref="listContent" v-else>
    <h1 class="list-title">
      <button
        class="edit-list-name"
        v-if="activeList.enhancements.length > 0 || activeList.profiles.length > 0"
        @click="editListName({ id: activeList.id })"
        :title="i18n.EDIT"><Icon icon="ic:baseline-edit" /></button>
        <span>{{ activeList?.name || activeList.id.replaceAll('-', ' ').toUpperCase() }}</span>&nbsp;<em>({{ totalPoints }}p)</em>
    </h1>
    <button
      class="copy-list"
      v-if="activeList.enhancements.length > 0 || activeList.profiles.length > 0"
      @click="copyListToClipboard()"
      :title="i18n.COPY"><Icon icon="ic:baseline-content-copy" /></button>
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
            @click="listsStore.removeFromList({ id: appStore.activeListId, index, category: 'enhancements' })">-</button>
          <p class="enhancement">
            <strong class="name">{{ enhancement.name }}</strong>
            <em class="points">{{ enhancement.points }}p</em>
          </p>
        </li>
      </ul>
    </template>
    <template v-if="characterProfiles && characterProfiles.length > 0">
      <h2 class="list-section-title">{{ i18n.CHARACTER }}</h2>
      <ul class="list-profiles">
        <li
          class="list-profile"
          v-for="(profile, index) in characterProfiles"
          :key="`profile-${index}`">
          <button
            class="delete-profile"
            :title="i18n.REMOVE"
            @click="listsStore.removeFromList({ id: appStore.activeListId, index: profile.index, category: 'profiles' })">-</button>
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
    <template v-if="battlelineProfiles && battlelineProfiles.length > 0">
      <h2 class="list-section-title">{{ i18n.BATTLELINE }}</h2>
      <ul class="list-profiles">
        <li
          class="list-profile"
          v-for="(profile, index) in battlelineProfiles"
          :key="`profile-${index}`">
          <button
            class="delete-profile"
            :title="i18n.REMOVE"
            @click="listsStore.removeFromList({ id: appStore.activeListId, index: profile.index, category: 'profiles' })">-</button>
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
    <template v-if="dedicatedTransportProfiles && dedicatedTransportProfiles.length > 0">
      <h2 class="list-section-title">{{ i18n.DEDICATED_TRANSPORT }}</h2>
      <ul class="list-profiles">
        <li
          class="list-profile"
          v-for="(profile, index) in dedicatedTransportProfiles"
          :key="`profile-${index}`">
          <button
            class="delete-profile"
            :title="i18n.REMOVE"
            @click="listsStore.removeFromList({ id: appStore.activeListId, index: profile.index, category: 'profiles' })">-</button>
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
    <template v-if="otherProfiles && otherProfiles.length > 0">
      <h2 class="list-section-title">{{ i18n.OTHER_DATASHEETS }}</h2>
      <ul class="list-profiles">
        <li
          class="list-profile"
          v-for="(profile, index) in otherProfiles"
          :key="`profile-${index}`">
          <button
            class="delete-profile"
            :title="i18n.REMOVE"
            @click="listsStore.removeFromList({ id: appStore.activeListId, index: profile.index, category: 'profiles' })">-</button>
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
    <button
      class="delete-list"
      @click="deleteList(activeList.id)"
      :title="i18n.DELETE"><Icon icon="ic:baseline-delete" /></button>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAppStore } from '@/store/app.store'
import { useListsStore } from '@/store/40k/lists.store'
import { Icon } from '@iconify/vue'
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
const textListContent = computed(() => {
  const headerFragment = `
${activeList.value?.name || activeList.value?.id || i18n.NO_TITLE} (${totalPoints.value}p)
  `
  const enhancementsFragment = (activeList.value?.enhancements?.length > 0)
    ? `
# ${i18n.ENHANCEMENTS}
${activeList.value.enhancements.map((item) => `  * ${item.name} (${item.points}p)`).join('\n')}`
    : ''
  const charactersFragment = (characterProfiles.value?.length > 0)
    ? `
# ${i18n.CHARACTER}
${characterProfiles.value.map((item) => `  * ${item.name} ${(item.subtype !== undefined && item.subtype !== '') ? `- ${item.subtype}` : ''} (${item.qty}, ${item.points}p)`).join('\n')}`
    : ''
  const battlelineFragment = (battlelineProfiles.value?.length > 0)
    ? `
# ${i18n.BATTLELINE}
${battlelineProfiles.value.map((item) => `  * ${item.name} ${(item.subtype !== undefined && item.subtype !== '') ? `- ${item.subtype}` : ''} (${item.qty}, ${item.points}p)`).join('\n')}`
    : ''
  const dedicatedTransportsFragment = (dedicatedTransportProfiles.value?.length > 0)
    ? `
# ${i18n.DEDICATED_TRANSPORT}
${dedicatedTransportProfiles.value.map((item) => `  * ${item.name} ${(item.subtype !== undefined && item.subtype !== '') ? `- ${item.subtype}` : ''} (${item.qty}, ${item.points}p)`).join('\n')}`
    : ''
  const otherDatasheetsFragment = (otherProfiles.value?.length > 0)
    ? `
# ${i18n.OTHER_DATASHEETS}
${otherProfiles.value.map((item) => `  * ${item.name} ${(item.subtype !== undefined && item.subtype !== '') ? `- ${item.subtype}` : ''} (${item.qty}, ${item.points}p)`).join('\n')}`
    : ''
  const profilesFragment = (activeList.value?.profiles?.length > 0)
    ? `
${charactersFragment}
${battlelineFragment}
${dedicatedTransportsFragment}
${otherDatasheetsFragment}`
    : ''
  const footerFragment = `\n\n==========\n\n${i18n.CREATED_WITH_WARDICE}`
  return `
${headerFragment}
${enhancementsFragment}
${profilesFragment}
${footerFragment}
  `
})
// TODO: validar la lista
const totalPoints = computed(() => {
  if (!activeList.value) {
    return 0
  }
  const enhancementsPoints = (activeList.value?.enhancements?.length === 0) ? 0 : addPoints(activeList.value.enhancements)
  const profilesPoints = (activeList.value?.profiles?.length === 0) ? 0 : addPoints(activeList.value.profiles)

  return profilesPoints + enhancementsPoints
})

const characterProfiles = computed(() => {
  const keyword = 'CHARACTER'
  return filterByKeyword(activeList.value?.profiles, keyword)
})
const battlelineProfiles = computed(() => {
  const keyword = 'BATTLELINE'
  return filterByKeyword(activeList.value?.profiles, keyword)
})
const dedicatedTransportProfiles = computed(() => {
  const keyword = 'DEDICATED TRANSPORT'
  return filterByKeyword(activeList.value?.profiles, keyword)
})
const otherProfiles = computed(() => {
  const keywords = ['CHARACTER', 'BATTLELINE', 'DEDICATED TRANSPORT']
  return activeList.value?.profiles
    .filter((item) => {
      let returnValue = true
      let itemsArray = item.keywords
      if (typeof item.keywords[0] !== 'string') {
        itemsArray = item.keywords
          .map((composedKeywords) => composedKeywords.value)
          .flat()
      }
      returnValue = itemsArray.findIndex((value) => String(value).toUpperCase() === keywords[0]) === -1 &&
          itemsArray.findIndex((value) => String(value).toUpperCase() === keywords[1]) === -1 &&
          itemsArray.findIndex((value) => String(value).toUpperCase() === keywords[2]) === -1
      return returnValue
    })
    .sort((a, b) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })
})

function addPoints (items) {
  return items.map((item) => item.points)
    .reduce((previousValue, currentValue) => {
      return previousValue + currentValue
    }) || 0
}

function editListName ({ id }) {
  const oldListName = activeList.value?.name || activeList.value?.id.replaceAll('-', ' ').toUpperCase()
  const name = window.prompt(i18n.EDIT_LIST_NAME, oldListName)

  if (name !== '') {
    listsStore.setListName({ id, name })
  }
}

function deleteList ({ id }) {
  if (window.confirm(i18n.DELETE_LIST_CONFIRM)) {
    listsStore.deleteListById({ id })
  }
}

defineProps(['listid'])

// TODO: copy list text
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard
// https://web.dev/i18n/en/async-clipboard/
async function copyListToClipboard () {
  try {
    await navigator.clipboard.writeText(textListContent.value)
  } catch (err) {
    console.error('fallo al copiar', err, textListContent.value)
  }
}

function filterByKeyword (profiles, keyword) {
  return profiles
    .sort((a, b) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })
    .map((item, index) => {
      return {
        ...item,
        index
      }
    })
    .filter((item) => {
      let returnValue = true
      if (typeof item.keywords[0] === 'string') {
        returnValue = item.keywords.findIndex((value) => String(value).toUpperCase() === keyword) > -1
      } else {
        returnValue = item.keywords
          .map((composedKeywords) => composedKeywords.value)
          .flat()
          .findIndex((value) => String(value).toUpperCase() === keyword) > -1
      }
      return returnValue
    })
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

.list-title em {
  font-family: var(--font-family-text);
  font-style: normal;
}

/* .saved .list-title {
  cursor: copy;
} */

/* .saved .list-title:hover {
  text-decoration: 4px underline dotted var(--brand-color);
} */

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
  position: relative;
}

.edit-list-name {
  background-color: transparent;
}

.delete-list {
  align-self: flex-end;
  background-color: transparent;
}

.copy-list {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
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

svg {
  font-size: 40px;
  line-height: 40px;
  vertical-align: middle;
}
</style>
