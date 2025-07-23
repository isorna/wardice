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
          <tr class="group-header" :class="{ collapsed: collapsedGroups[groupType], expanded: !collapsedGroups[groupType] }" @click="toggleGroup(groupType)">
            <td colspan="5">
              <span class="toggle-icon">{{ collapsedGroups[groupType] ? '&#9654;' : '&#9660;' }}</span>
              {{ groupType.charAt(0).toUpperCase() + groupType.slice(1) }}s
            </td>
          </tr>
          <template v-if="!collapsedGroups[groupType]">
            <tr v-for="item in group" :key="item.key">
              <td class="center-col">{{ item.data.points || '—' }}</td>
              <td class="center-col">{{ (item.data.fieldAllowance || '—').toString().toUpperCase() }}</td>
              <td>{{ item.data.name }}</td>
              <td class="center-col">
                <button @click.stop="$emit('view-profile', item.key)">{{ i18n.VIEW }}</button>
              </td>
              <td class="center-col">
                <button @click.stop="$emit('add-to-army', item.key)" :disabled="isAddDisabled(item.key)">+</button>
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
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

const collapsedGroups = ref({
  warcaster: false,
  warlock: false,
  warjack: true,
  warbeast: true,
  battleEngine: true,
  unit: true,
  commandAttachment: true,
  solo: true,
});

const toggleGroup = (groupType) => {
  collapsedGroups.value[groupType] = !collapsedGroups.value[groupType];
};

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
.group-header {
  cursor: pointer;
  user-select: none;

  &.collapsed {
    color: #eee;
  }
  &.expanded {
    color: var(--brand-color);
  }
}
.group-header td {
  /* background-color: #eee; */
  background-color: var(--medium-blue);
  font-weight: bold;
}
.toggle-icon {
  display: inline-block;
  width: 1em;
  margin-right: 5px;
  text-align: center;
}
</style>
