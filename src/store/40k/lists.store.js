import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useListsStore = defineStore('lists', () => {
  // State
  const lists = ref([])
  // Getters
  const getListById = computed((id) => {
    return (id) => lists.value.find((list) => list.id === id)
  })
  // Actions
  function createList ({ id, faction, name }) {
    const list = {
      id,
      faction,
      name,
      profiles: [],
      enhancements: []
    }
    lists.value.push(list)
  }

  function addToList ({ id, value, category = 'profiles' }) {
    const listIndex = lists.value.findIndex(list => list.id === id)
    const list = listIndex >= 0 ? lists.value.splice(listIndex, 1)[0] : { id, profiles: [], enhancements: [] }

    if (category === 'profiles' && list.profiles === undefined) {
      list.profiles = []
    }
    if (category === 'enhancements' && list.profiles === undefined) {
      list.enhancements = []
    }
    list[category].push(value)
    // console.log({ id, value, category }, list.value)
    lists.value.push(list)
  }

  function setListName ({ id, name }) {
    const listIndex = lists.value.findIndex(list => list.id === id)
    const list = listIndex >= 0 ? lists.value.splice(listIndex, 1)[0] : { id, profiles: [], enhancements: [] }

    // change active list id

    list.name = name
    lists.value.push(list)
  }

  function removeFromList ({ id, index, category = 'profiles' }) {
    const list = lists.value.splice(lists.value.findIndex(list => list.id === id), 1)[0]

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
    setListName,
    removeFromList,
    deleteListById
  }
}, {
  persist: true
})
