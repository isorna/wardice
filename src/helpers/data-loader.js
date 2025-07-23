import { ref } from 'vue'
import { useRoute } from 'vue-router'

export function useLocalizedData (dataName) {
  const route = useRoute()
  const data = ref(null)
  const lang = route.params.lang || 'en'

  console.log(`Loading data for ${dataName} (${lang})`)

  const loadData = async () => {
    try {
      let module
      if (lang === 'es') {
        module = await import(`../data/warmachine/${dataName}.es.json`)
      } else {
        module = await import(`../data/warmachine/${dataName}.json`)
      }
      data.value = module.default
    } catch (error) {
      console.error(`Failed to load data for ${dataName}:`, error)
    }
  }

  loadData()

  return {
    data
  }
}
