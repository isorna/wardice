import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useResultsStore = defineStore('results', () => {
  const results = ref([])
  const totalResults = ref(0)
  const page = ref(1)
  const statusFilter = ref('All')

  function updateResults (payload) {
    results.value = payload
  }

  function updateTotalResults (payload) {
    totalResults.value = payload
  }

  function updatePage (payload) {
    page.value = payload
  }

  function updateStatusFilter (payload) {
    statusFilter.value = payload
  }

  return {
    results,
    updateResults,
    totalResults,
    updateTotalResults,
    page,
    updatePage,
    statusFilter,
    updateStatusFilter
  }
})
