<template>
	<section class="army-section">
		<section v-if="error">
      <p class="error-message"><strong>{{ i18n.ERROR_TITLE }}:</strong> {{ error.message }}</p>
    </section>
    <template v-else-if="data">
			<ul class="items-list">
				<li class="items-list__item" v-for="profile in filteredProfiles" :key="profile.id">
					<h2>{{ profile.data.name }}</h2>
				</li>
			</ul>
		</template>
	</section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useFetch } from '@/helpers/useFetch.js'
const route = useRoute()
const factionId = route.params.faction
const armyId = route.params.army
const dataHost = 'https://raw.githubusercontent.com/isorna/wardice/refs/heads/army-builder/src/data/warmachine/profiles'
const API = computed(() => {
  return route?.params?.faction === undefined || route?.params?.army === undefined
    ? undefined
    : `${dataHost}/${factionId}/${factionId}.${armyId}.profiles.json?${Date.now()}`
		// TODO: averiguar porqué no carga desde local:
    // : `@/data/warmachine/profiles/${factionId}.${armyId}.profiles.json?${Date.now()}`
})
const { data, error } = useFetch(API)

const filteredProfiles = computed(() => {
	// data.value is an keyed object, translate to an array of objects
	const parsedDataValue =  Object.entries(data.value).map(([key, value]) => ({ id: key, data: value }))
  const returnValue = (Array.isArray(parsedDataValue) && parsedDataValue.length > 0)
    ? parsedDataValue
      // .filter((profile) => profile.name.toLowerCase().indexOf(nameFilter.value.toLowerCase()) >= 0)
      // .map((profile, index) => {
      //   return {
      //     // TODO: crear este dato directamente en los JSON?
      //     faction: factionId,
      //     ...profile
      //     // TODO: transformar el array de puntos para que incluya las opciones de wargear?
      //   }
      // })
      // .filter((profile) => {
      //   return activeList.value === undefined ||
      //     activeList.value.profiles === undefined ||
      //     activeList.value.profiles.length === 0 ||
      //     !appStore.isFilterVisible ||
      //     (activeList.value.profiles.length > 0 &&
      //     appStore.isFilterVisible &&
      //     activeList.value.profiles
      //       .findIndex((item) => item.id === profile.id) > -1)
      // })
    : []
  return returnValue
})
</script>
