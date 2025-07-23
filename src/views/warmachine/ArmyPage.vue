<template>
  <section class="army-section">
    <section v-if="error">
      <p class="error-message"><strong>Error:</strong> {{ error.message }}</p>
    </section>
    <template v-else-if="profiles">
      <div class="builder-view-container">
        <div id="builder-container" v-if="armyList.profiles && Object.keys(armyList.profiles).length > 0">
          <ArmyBuilder
            :army-list="armyList"
            :profiles="profiles"
            @remove-from-army="removeFromArmy"
            @save-list="saveArmyList"
            v-model:armyList="armyList"
          />
        </div>
        <div id="army-list-container">
          <ProfileList
            :profiles="profiles"
            :army-list="armyList"
            @add-to-army="addToArmy"
            @view-profile="viewProfile"
          />
        </div>
      </div>
      <div id="card-details-container" v-if="selectedProfileKey">
        <ProfileCard
          :profile="profiles[selectedProfileKey]"
          :profile-key="selectedProfileKey"
          :abilities-data="abilities"
          :spells-data="spells"
          @close-card="selectedProfileKey = null"
        />
      </div>
    </template>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useFetch } from '@/helpers/useFetch.js';
import ProfileList from '@/components/warmachine/ProfileList.vue';
import ArmyBuilder from '@/components/warmachine/ArmyBuilder.vue';
import ProfileCard from '@/components/warmachine/ProfileCard.vue';

const route = useRoute();
const factionId = route.params.faction;
const armyId = route.params.army;

const dataHost = 'https://raw.githubusercontent.com/isorna/wardice/refs/heads/main/src/data/warmachine';
const profilesApi = computed(() => `${dataHost}/profiles/${factionId}/${factionId}.${armyId}.profiles.json?${Date.now()}`);
const abilitiesApi = computed(() => `${dataHost}/abilities/${factionId}.${armyId}.abilities.json?${Date.now()}`);
const spellsApi = computed(() => `${dataHost}/spells/${factionId}.${armyId}.spells.json?${Date.now()}`);

const { data: profiles, error } = useFetch(profilesApi);
const { data: abilities } = useFetch(abilitiesApi);
const { data: spells } = useFetch(spellsApi);

const armyList = ref({
  id: `list_${Date.now()}`,
  name: 'Untitled List',
  faction: factionId,
  theme: armyId,
  totalPoints: 0,
  profiles: {},
});
const selectedProfileKey = ref(null);

const addToArmy = (profileKey) => {
  const profile = profiles.value[profileKey];
  if (!profile) return;

  const currentCount = armyList.value.profiles[profileKey] || 0;
  armyList.value.profiles[profileKey] = currentCount + 1;
  armyList.value.totalPoints += profile.points || 0;
};

const removeFromArmy = (profileKey) => {
  const profile = profiles.value[profileKey];
  if (!profile) return;

  const currentCount = armyList.value.profiles[profileKey];
  if (currentCount > 0) {
    armyList.value.profiles[profileKey] = currentCount - 1;
    armyList.value.totalPoints -= profile.points || 0;
    if (armyList.value.profiles[profileKey] === 0) {
      delete armyList.value.profiles[profileKey];
    }
  }
};

const viewProfile = (profileKey) => {
  selectedProfileKey.value = profileKey;
};

const saveArmyList = () => {
  const savedLists = JSON.parse(localStorage.getItem('warmachine_lists')) || {};
  const listKey = `${armyList.value.faction}_${armyList.value.theme}`.toLowerCase().replace(/\s+/g, '_');
  if (!savedLists[listKey]) {
    savedLists[listKey] = [];
  }
  const listIndex = savedLists[listKey].findIndex(l => l.id === armyList.value.id);
  if (listIndex > -1) {
    savedLists[listKey][listIndex] = { ...armyList.value };
  } else {
    savedLists[listKey].push({ ...armyList.value });
  }
  localStorage.setItem('warmachine_lists', JSON.stringify(savedLists));
  alert(`List "${armyList.value.name}" saved!`);
};

// TODO: Implement load list functionality
</script>

<style scoped>
.builder-view-container {
	margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
#army-list-container {
	margin-top: 2rem;
  /* flex: 2; */
}
#builder-container {
	margin-top: 2rem;
  /* flex: 1; */
}
#card-details-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 80px;
  /* overflow-y: auto; */
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media screen and (max-width: 768px) {
  #card-details-container {
    /* margin: 10px; */
    padding: 10px;
    height: auto;
  }
}
</style>
