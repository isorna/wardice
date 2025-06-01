<template>
  <section class="profiles-list">
    <h1>{{ i18n.PROFILES }}</h1>
    <h2 class="category-title">
      <button
        class="visibility-button"
        :class="{ active: isCharacterVisible }"
        :title="i18n.VIEW"
        @click="isCharacterVisible = !isCharacterVisible"><Icon :icon="isCharacterVisible ? 'ic:baseline-visibility' : 'ic:baseline-visibility-off'" /></button>
      <span>{{ i18n.CHARACTER }}</span>
    </h2>
    <template
      v-if="isCharacterVisible">
      <ProfileCard
        v-for="(profile) in characterProfiles"
        :key="profile.id"
        :profile="profile" />
    </template>
    <h2 class="category-title">
      <button
        class="visibility-button"
        :class="{ active: isBattlelineVisible }"
        :title="i18n.VIEW"
        @click="isBattlelineVisible = !isBattlelineVisible"><Icon :icon="isBattlelineVisible ? 'ic:baseline-visibility' : 'ic:baseline-visibility-off'" /></button>
      <span>{{ i18n.BATTLELINE }}</span>
    </h2>
    <template
      v-if="isBattlelineVisible">
      <ProfileCard
        v-for="(profile) in battlelineProfiles"
        :key="profile.id"
        :profile="profile" />
    </template>
    <h2 class="category-title">
      <button
        class="visibility-button"
        :class="{ active: isDedicatedTransportVisible }"
        :title="i18n.VIEW"
        @click="isDedicatedTransportVisible = !isDedicatedTransportVisible"><Icon :icon="isDedicatedTransportVisible ? 'ic:baseline-visibility' : 'ic:baseline-visibility-off'" /></button>
      <span>{{ i18n.DEDICATED_TRANSPORT }}</span>
    </h2>
    <template
      v-if="isDedicatedTransportVisible">
      <ProfileCard
        v-for="(profile) in dedicatedTransportProfiles"
        :key="profile.id"
        :profile="profile" />
    </template>
    <h2 class="category-title">
      <button
        class="visibility-button"
        :class="{ active: isOtherProfilesVisible }"
        :title="i18n.VIEW"
        @click="isOtherProfilesVisible = !isOtherProfilesVisible"><Icon :icon="isOtherProfilesVisible ? 'ic:baseline-visibility' : 'ic:baseline-visibility-off'" /></button>
      <span>{{ i18n.OTHER_DATASHEETS }}</span>
    </h2>
    <template
      v-if="isOtherProfilesVisible">
      <ProfileCard
        v-for="(profile) in otherProfiles"
        :key="profile.id"
        :profile="profile" />
    </template>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import i18nApp from '@/i18n/en.i18n.json'
import i18n40k from '@/i18n/40k/en.i18n..json'
import ProfileCard from '@/components/40k/ProfileCard.vue'

const i18n = {
  ...i18nApp,
  ...i18n40k
}
const isCharacterVisible = ref(true)
const characterProfiles = computed(() => {
  const keyword = 'CHARACTER'
  return filterByKeyword(props.profiles, keyword)
})
const isBattlelineVisible = ref(true)
const battlelineProfiles = computed(() => {
  const keyword = 'BATTLELINE'
  return filterByKeyword(props.profiles, keyword)
})
const isDedicatedTransportVisible = ref(true)
const dedicatedTransportProfiles = computed(() => {
  const keyword = 'DEDICATED TRANSPORT'
  return filterByKeyword(props.profiles, keyword)
})
const isOtherProfilesVisible = ref(true)
const otherProfiles = computed(() => {
  const keywords = ['CHARACTER', 'BATTLELINE', 'DEDICATED TRANSPORT']
  return props.profiles
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
const props = defineProps(['profiles'])

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
h1 {
  font-size: 24px;
}

.profiles-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.category-title {
  display: flex;
  gap: 10px;
  line-height: 40px;
}

.visibility-button {
  align-items: center;
  background-color: var(--darkest-blue);
  border: 2px dotted var(--brand-color);
  color: var(--brand-color);
  display: flex;
  flex-direction: column;
  padding: 0;
  place-content: center;
  width: 40px;
}

.visibility-button:hover {
  border-style: solid;
}

.visibility-button.active {
  background-color: var(--light-orange-gradient);
  border: 2px solid var(--brand-color);
  color: var(--darkest-blue);
}
</style>
