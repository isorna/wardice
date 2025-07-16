<template>
  <div class="profile-card" v-if="profile">
    <a href="#" @click.prevent="$emit('close-card')">{{ i18n.BACK_TO_BUILDER }}</a>
    <h3 class="card-title">{{ profile.name }} ({{ keywords }})</h3>
    <p>{{ i18n.FIELD_ALLOWANCE }}: {{ profile.fieldAllowance || 'N/A' }} | {{ i18n.POINT_COST }}: {{ profile.points || 'N/A' }}</p>

    <div v-if="profile.statistics && profile.statistics.health">
      <DamageTracker :health="profile.statistics.health" :keywords="profile.keywords" :profile-key="profileKey" />
    </div>

    <div class="stat-block" v-html="statBlock(profile.statistics)"></div>
    <div v-html="abilitiesBlock(profile.abilities)"></div>
    <div v-if="profile.feat" v-html="featBlock(profile.feat)"></div>
    <div v-html="weaponsBlock(profile.weapons)"></div>
    <div v-html="spellsBlock(profile.spells, i18n.SPELLS)"></div>
    <div v-if="profile.animus" v-html="spellsBlock([profile.animus], i18n.ANIMUS)"></div>

    <div v-if="profile.profiles">
      <div v-for="(subProfile, subProfileKey) in profile.profiles" :key="subProfileKey">
        <h4>{{ subProfileKey.charAt(0).toUpperCase() + subProfileKey.slice(1) }} Profile</h4>
        <div v-if="subProfile.statistics && subProfile.statistics.health">
          <DamageTracker :health="subProfile.statistics.health" :keywords="profile.keywords" :profile-key="`${profileKey}-${subProfileKey}`" />
        </div>
        <div class="stat-block" v-html="statBlock(subProfile.statistics)"></div>
        <div v-html="abilitiesBlock(subProfile.abilities)"></div>
        <div v-html="weaponsBlock(subProfile.weapons)"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import DamageTracker from './DamageTracker.vue';
import i18nApp from '@/i18n/en.i18n.json';
import i18nGame from '@/i18n/warmachine/en.i18n.json';

const i18n = {
  ...i18nApp,
  ...i18nGame,
};

const props = defineProps({
  profile: Object,
  profileKey: String,
  abilitiesData: Object,
  spellsData: Object,
});

defineEmits(['close-card']);

const keywords = computed(() => (props.profile?.keywords ? props.profile.keywords.join(', ') : 'N/A'));

const statBlock = (stats) => {
  if (!stats) return '';
  const statKeys = Object.keys(stats);
  const preferredOrder = ['speed', 'meleeAttack', 'rangedAttack', 'arcaneAttack', 'defense', 'armour', 'fury', 'threshold', 'controlRange', 'health', 'range', 'rateOfFire', 'areaOfEffect', 'power'];
  statKeys.sort((a, b) => {
    const iA = preferredOrder.indexOf(a);
    const iB = preferredOrder.indexOf(b);
    if (iA !== -1 && iB !== -1) return iA - iB;
    if (iA !== -1) return -1;
    if (iB !== -1) return 1;
    return a.localeCompare(b);
  });
  let statHtml = '';
  statKeys.forEach(statKey => {
    if (statKey !== 'health') {
      statHtml += `<strong>${statKey.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> ${stats[statKey]} | `;
    }
  });
  return statHtml.slice(0, -3);
};

const abilitiesBlock = (abilities) => {
  if (!abilities || abilities.length === 0) return '';
  let blockHtml = '<div class="ability-block"><h4>Abilities</h4>';
  abilities.flat().forEach(abilityKey => {
    const ability = props.abilitiesData[abilityKey];
    if (ability) {
      blockHtml += `<p><strong>${ability.name}:</strong> ${ability.description}</p>`;
    } else if (typeof abilityKey === 'string') {
      blockHtml += `<p><strong>${abilityKey.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()}:</strong> (Full text not found)</p>`;
    }
  });
  return blockHtml + '</div>';
};

const featBlock = (feat) => {
  if (!feat) return '';
  return `<div class="ability-block"><h4>FEAT - ${feat.name}</h4><p>${feat.rules}</p></div>`;
};

const weaponsBlock = (weapons) => {
  if (!weapons) return '';
  let blockHtml = '';
  for (const weaponKey in weapons) {
    const weapon = weapons[weaponKey];
    blockHtml += `<div class="weapon-block"><h4>${weapon.name} ${weapon.quantity > 1 ? `x${weapon.quantity}` : ''}</h4><p>${statBlock(weapon.statistics)}</p>`;
    if (weapon.abilities) {
      weapon.abilities.forEach(abilityItem => {
        if (Array.isArray(abilityItem)) {
          const groupKey = abilityItem[0];
          const groupAbility = props.abilitiesData[groupKey];
          if (groupAbility) {
            blockHtml += `<p><strong>${groupAbility.name}:</strong> ${groupAbility.description}</p>`;
          }
          blockHtml += `<ul class="attack-type-options">`;
          for (let i = 1; i < abilityItem.length; i++) {
            const optionKey = abilityItem[i];
            const optionAbility = props.abilitiesData[optionKey];
            if (optionAbility) {
              blockHtml += `<li><strong>${optionAbility.name}:</strong> ${optionAbility.description}</li>`;
            }
          }
          blockHtml += `</ul>`;
        } else {
          const ability = props.abilitiesData[abilityItem];
          if (ability) {
            blockHtml += `<p><strong>${ability.name}:</strong> ${ability.description}</p>`;
          }
        }
      });
    }
    blockHtml += '</div>';
  }
  return blockHtml;
};

const spellsBlock = (spells, title) => {
  if (!spells || spells.length === 0) return '';
  let blockHtml = `<div class="spell-block"><h4>${title}</h4>`;
  spells.forEach(spellKey => {
    const spell = title === "Animus" ? props.abilitiesData[spellKey] : props.spellsData[spellKey];
    if (spell) {
      blockHtml += `<p><strong>${spell.name}:</strong> ${spell.description}</p>`;
    } else {
      blockHtml += `<p><strong>${spellKey.replace(/([A-Z])/g, ' $1')}:</strong> (Full text not found)</p>`;
    }
  });
  return blockHtml + '</div>';
};
</script>

<style scoped>
.profile-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #fdfdfd;
}
.card-title {
  background-color: #e0e0e0;
  padding: 5px 10px;
  border-radius: 3px;
  margin-top: 0;
}
.stat-block,
.weapon-block,
.ability-block,
.spell-block {
  margin-bottom: 10px;
  padding-left: 10px;
  border-left: 3px solid #8c6239;
}
.attack-type-options {
  list-style-type: '• ';
  padding-left: 20px;
  text-align: left;
}
</style>
