<template>
  <div class="profile-list">
    <h2>{{ i18n.AVAILABLE_PROFILES }}</h2>
    <table>
      <thead>
        <tr>
          <th class="center-col">{{ i18n.PC }}</th>
          <th class="center-col">{{ i18n.FA }}</th>
          <th>{{ i18n.CARD }}</th>
          <th class="center-col">{{ i18n.VIEW }}</th>
          <th class="center-col">{{ i18n.ADD }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(group, groupType) in groupedProfiles" :key="groupType">
          <tr class="group-header">
            <td colspan="5">{{ groupType.charAt(0).toUpperCase() + groupType.slice(1) }}s</td>
          </tr>
          <tr v-for="item in group" :key="item.key">
            <td class="center-col">{{ item.data.points || '—' }}</td>
            <td class="center-col">{{ (item.data.fieldAllowance || '—').toString().toUpperCase() }}</td>
            <td>{{ item.data.name }}</td>
            <td class="center-col">
              <button @click="$emit('view-profile', item.key)">{{ i18n.VIEW }}</button>
            </td>
            <td class="center-col">
              <button @click="$emit('add-to-army', item.key)" :disabled="isAddDisabled(item.key)">+</button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
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
  profiles: {
    type: Object,
    required: true,
  },
  armyList: {
    type: Object,
    required: true,
  },
});

defineEmits(['add-to-army', 'view-profile']);

const groupedProfiles = computed(() => {
  const groups = {};
  for (const key in props.profiles) {
    const profile = props.profiles[key];
    const type = profile.type || 'unknown';
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push({ key, data: profile });
  }
  const groupOrder = ['warcaster', 'warlock', 'warjack', 'warbeast', 'battleEngine', 'unit', 'commandAttachment', 'solo'];
  const sortedGroups = {};
  groupOrder.forEach(groupType => {
    if (groups[groupType]) {
      sortedGroups[groupType] = groups[groupType].sort((a, b) => a.data.name.localeCompare(b.data.name));
    }
  });
  return sortedGroups;
});

const isAddDisabled = (profileKey) => {
  const profile = props.profiles[profileKey];
  const currentCount = props.armyList.profiles[profileKey] || 0;
  const fa = (profile.fieldAllowance || 'U').toString().toUpperCase();
  let faLimit = Infinity;
  if (fa === 'C' || fa === 'c') {
    faLimit = 1;
  } else if (!isNaN(parseInt(fa, 10))) {
    faLimit = parseInt(fa, 10);
  }
  return currentCount >= faLimit;
};
</script>

<style scoped>
.profile-list {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  /* background-color: #fdfdfd; */
	background: linear-gradient(var(--dark-turquoise-gradient), var(--medium-blue));
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
}
th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
  vertical-align: middle;
}
th {
  /* background-color: #f0f0f0; */
  background-color: var(--medium-blue);
}
th.center-col,
td.center-col {
  text-align: center;
  width: 50px;
}
.group-header td {
  /* background-color: #eee; */
  background-color: var(--medium-blue);
  font-weight: bold;
}
</style>
