import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useCollectionStore = defineStore('collection', () => {
  const collection = ref([])
  const getCharacterById = computed(() => {
    return (characterId) => collection.value.find((character) => character.id === characterId)
  })

  function collectCharacter (character) {
    collection.value.push(character)
  }

  function releaseCharacterById (characterId) {
    collection.value.splice(collection.value.findIndex(character => character.id === characterId), 1)
  }

  return {
    collection,
    getCharacterById,
    collectCharacter,
    releaseCharacterById
  }
}, {
  persist: true
})
