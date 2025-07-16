<template>
  <div class="army-builder">
    <div id="builder-header">
      <h2>{{ i18n.CURRENT_ARMY_LIST }}</h2>
      <input type="text" id="list-name-input" v-model="armyList.name" @change="updateListName" />
      <h3>{{ i18n.TOTAL_POINTS }}: <span id="total-points">{{ armyList.totalPoints }}</span> / 100</h3>
      <button id="save-list-btn" class="action-button" @click="$emit('save-list')">{{ i18n.SAVE_LIST }}</button>
    </div>
    <ul id="builder-list">
      <li v-for="(count, key) in sortedArmyProfiles" :key="key">
        <span>{{ profiles[key].name }} ({{ profiles[key].points || 0 }}pts) x{{ count }}</span>
        <button class="remove-btn" @click="$emit('remove-from-army', key)">-</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import i18nApp from '@/i18n/en.i18n.json';
import i18nGame from '@/i18n/warmachine/en.i18n.json';

const i18n = {
  ...i18nApp,
  ...i18nGame,
};

const props = defineProps({
  armyList: {
    type: Object,
    required: true,
  },
  profiles: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['save-list', 'remove-from-army', 'update:armyList']);

const sortedArmyProfiles = computed(() => {
  return Object.entries(props.armyList.profiles)
    .sort(([keyA], [keyB]) => {
      const nameA = props.profiles[keyA]?.name || '';
      const nameB = props.profiles[keyB]?.name || '';
      return nameA.localeCompare(nameB);
    })
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
});


const updateListName = (event) => {
  const updatedList = { ...props.armyList, name: event.target.value };
  emit('update:armyList', updatedList);
};
</script>

<style scoped>
.army-builder {
  border-left: 2px solid #eee;
  padding-left: 20px;
}
#builder-list {
  list-style-type: none;
  padding: 0;
}
#builder-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-bottom: 1px solid #f0f0f0;
}
#builder-header {
  margin-bottom: 15px;
}
#builder-header input {
  width: calc(100% - 10px);
  padding: 5px;
  margin-bottom: 10px;
}
.action-button {
  font-size: 16px;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  border: 1px solid #5a2a2a;
  background-color: #fff;
  color: #5a2a2a;
  border-radius: 5px;
}
.action-button:hover {
  background-color: #5a2a2a;
  color: white;
}
.remove-btn {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
  padding: 3px 8px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 3px;
  border: 1px solid;
}
</style>
