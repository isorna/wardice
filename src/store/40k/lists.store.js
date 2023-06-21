import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useListsStore = defineStore('lists', () => {
  // State
  const lists = ref([])
  // Getters
  const getListById = computed((listId) => {
    return (id) => lists.value.find((list) => list.id === id)
  })
  // Actions
  function createList ({ list }) {
    lists.value.push(list)
  }

  function addToList ({ listId, value, category = 'profiles' }) {
    const listIndex = lists.value.findIndex(list => list.id === listId)
    const list = listIndex >= 0 ? lists.value.splice(listIndex, 1)[0] : { id: listId, profiles: [], enhancements: [] }

    if (category === 'profiles' && list.profiles === undefined) {
      list.profiles = []
    }
    if (category === 'enhancements' && list.profiles === undefined) {
      list.enhancements = []
    }
    list[category].push(value)
    console.log({ listId, value, category }, list.value)
    lists.value.push(list)
  }

  function removeFromList ({ listId, index, category = 'profiles' }) {
    const list = lists.value.splice(lists.value.findIndex(list => list.id === listId), 1)[0]

    list[category].splice(index, 1)
    lists.value.push(list)
  }

  function deleteListById ({ id }) {
    lists.value.splice(lists.value.findIndex(list => list.id === id), 1)
  }

  return {
    lists,
    getListById,
    createList,
    addToList,
    removeFromList,
    deleteListById
  }
}, {
  persist: true
})
