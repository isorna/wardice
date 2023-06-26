import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  // State
  const isFilterVisible = ref(false)
  const isListVisible = ref(false)
  const isRulesVisible = ref(false)
  const isDetachmentsVisible = ref(false)
  const isStratagemsVisible = ref(false)
  const isEnhancementsVisible = ref(false)
  const isDronesVisible = ref(false)
  const isProfilesVisible = ref(true)
  const activeListId = ref('')
  // Getters
  // const getListVisibility = computed(() => isListVisible.value)
  // const getActiveList = computed(() => activeListId.value)
  // Actions
  function toggleList () {
    isListVisible.value = !isListVisible.value
  }

  function toggleFilter () {
    isFilterVisible.value = !isFilterVisible.value
    // if (isFilterVisible.value === true) isProfilesVisible.value = isFilterVisible.value
  }

  function toggleRules () {
    isRulesVisible.value = !isRulesVisible.value
  }

  function toggleDetachments () {
    isDetachmentsVisible.value = !isDetachmentsVisible.value
  }

  function toggleStratagems () {
    isStratagemsVisible.value = !isStratagemsVisible.value
  }

  function toggleEnhancements () {
    isEnhancementsVisible.value = !isEnhancementsVisible.value
  }

  function toggleDrones () {
    isDronesVisible.value = !isDronesVisible.value
  }

  function toggleProfiles () {
    isProfilesVisible.value = !isProfilesVisible.value
  }

  function setActiveList (newListId) {
    activeListId.value = newListId
  }

  function restActiveList () {
    activeListId.value = ''
  }

  return {
    activeListId,
    isFilterVisible,
    isListVisible,
    isRulesVisible,
    isDetachmentsVisible,
    isStratagemsVisible,
    isEnhancementsVisible,
    isDronesVisible,
    isProfilesVisible,
    // getListVisibility,
    // getActiveList,
    toggleList,
    toggleFilter,
    toggleRules,
    toggleDetachments,
    toggleStratagems,
    toggleEnhancements,
    toggleDrones,
    toggleProfiles,
    setActiveList,
    restActiveList
  }
}, {
  persist: true
})
