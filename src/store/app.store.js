import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  // State
  const isListVisible = ref(false)
  const activeListId = ref('')
  // Getters
  // const getListVisibility = computed(() => isListVisible.value)
  // const getActiveList = computed(() => activeListId.value)
  // Actions
  function toggleList () {
    isListVisible.value = !isListVisible.value
  }

  function setActiveList (newListId) {
    activeListId.value = newListId
  }

  function restActiveList () {
    activeListId.value = ''
  }

  return {
    activeListId,
    isListVisible,
    // getListVisibility,
    // getActiveList,
    toggleList,
    setActiveList,
    restActiveList
  }
}, {
  persist: true
})
