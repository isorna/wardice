import { ref, watchEffect, toValue } from 'vue'

export function useFetch (url) {
  const data = ref(null)
  const error = ref(null)

  watchEffect(async () => {
    // reset state before fetching..
    data.value = null
    error.value = null
    // resolve the url value synchronously so it's tracked as a
    // dependency by watchEffect()
    // toValue() unwraps potential refs or getters
    const urlValue = toValue(url)

    try {
      const res = await fetch(urlValue)
      data.value = await res.json()
    } catch (e) {
      error.value = e
    }
  })

  return { data, error }
}
