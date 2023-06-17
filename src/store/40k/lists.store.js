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

  function addToList ({ listId, value }) {
    let list = lists.value.splice(lists.value.findIndex(list => list.id === listId), 1)[0]

    if (list === undefined || Array.isArray(list)) {
      list = { id: listId, profiles: [] }
    }

    list.profiles.push(value)
    lists.value.push(list)
  }

  function removeProfileFromList ({ listId, index }) {
    console.log('remove from list', listId, index)
    const list = lists.value.splice(lists.value.findIndex(list => list.id === listId), 1)[0]

    list.profiles.splice(index, 1)
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
    removeProfileFromList,
    deleteListById
  }
}, {
  persist: true
})
