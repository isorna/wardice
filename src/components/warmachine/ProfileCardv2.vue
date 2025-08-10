<template>
  <div class="profile-card-v2">
    <div class="a5-horizontal-container shadow-lg p-3 page-break a5-page">
      <img src="/public/assets/ui/faction-icon.svg" class="skorne-icon-bg" />
      <div class="content-wrapper flex flex-col flex-grow">
        <div class="header-bar text-center flex items-center justify-center relative">
          <img src="/public/assets/ui/faction-icon-stroke.svg" class="w-8 h-8 absolute left-3" />
          <h1 class="font-cinzel text-2xl tracking-widest">{{ profile.name }}</h1>
          <img src="/public/assets/ui/faction-icon-stroke.svg" class="w-8 h-8 absolute right-3" />
        </div>
        <div class="grid grid-cols-12 gap-3 flex-grow mt-2">
          <div class="col-span-4 flex flex-col space-y-2">
            <div class="flex-grow flex flex-col justify-between">
              <div>
                <div class="text-center font-cinzel text-[10px] text-[var(--text-color)] leading-tight mt-1">
                  <p class="font-bold text-sm">{{ profile.title }}</p>
                  <p>{{ profile.subtitle }}</p>
                  <p class="text-[9px] mt-1">Field Allowance: {{ profile.fieldAllowance }} | Point Cost: {{ profile.points }} | Base Size: {{ profile.baseSize }}</p>
                </div>
                <div class="flex justify-center items-center py-4">
                  <div class="w-32 h-32 rounded-full border-4 border-[var(--border-color)] bg-[var(--stat-bg)] shadow-lg">
                    <img :alt="`${profile.name} Portrait`" class="w-full h-full rounded-full object-cover" :src="`/assets/portraits/${profileKey}-portrait.jpg`" />
                  </div>
                </div>
                <div class="grid grid-cols-4 gap-1" v-if="profile.statistics">
                  <div class="stat-box"><span class="stat-label">SPD</span><span class="stat-value">{{ profile.statistics.speed }}</span></div>
                  <div class="stat-box"><span class="stat-label">STR</span><span class="stat-value">{{ profile.statistics.strength }}</span></div>
                  <div class="stat-box"><span class="stat-label">MAT</span><span class="stat-value">{{ profile.statistics.meleeAttack }}</span></div>
                  <div class="stat-box"><span class="stat-label">RAT</span><span class="stat-value">{{ profile.statistics.rangedAttack }}</span></div>
                  <div class="stat-box"><span class="stat-label">DEF</span><span class="stat-value">{{ profile.statistics.defense }}</span></div>
                  <div class="stat-box"><span class="stat-label">ARM</span><span class="stat-value">{{ profile.statistics.armour }}</span></div>
                  <div class="stat-box"><span class="stat-label">CMD</span><span class="stat-value">{{ profile.statistics.command }}</span></div>
                  <div class="stat-box" v-if="profile.statistics.fury"><span class="stat-label">FURY</span><span class="stat-value">{{ profile.statistics.fury }}</span></div>
                  <div class="stat-box" v-if="profile.statistics.focus"><span class="stat-label">FOCUS</span><span class="stat-value">{{ profile.statistics.focus }}</span></div>
                </div>
                <div class="flex flex-col items-center justify-around space-y-1 pt-3">
                  <div class="damage-grid" v-if="profile.statistics.health">
                    <div class="damage-box" v-for="n in profile.statistics.health" :key="n"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-8 flex flex-col space-y-2 text-[var(--text-color)]">
            <div class="space-y-1 text-xs flex-grow">
              <div class="ability-box" v-for="weapon in weapons" :key="weapon.name">
                <div class="weapon-header p-1 px-2 flex justify-between items-center font-bold text-sm text-[var(--header-text)]">
                  <div class="flex items-center gap-2">
                    <span class="material-icons text-base text-[var(--accent-color)]">{{ weapon.type === 'ranged' ? 'gps_fixed' : 'hardware' }}</span>
                    <span class="font-cinzel tracking-wider">{{ weapon.name }}</span>
                  </div>
                  <div class="flex items-center gap-3 text-xs" v-if="weapon.statistics">
                    <span>RNG {{ weapon.statistics.range }}</span>
                    <span v-if="weapon.statistics.rateOfFire">ROF {{ weapon.statistics.rateOfFire }}</span>
                    <span v-if="weapon.statistics.areaOfEffect">AOE {{ weapon.statistics.areaOfEffect }}</span>
                    <span>POW {{ weapon.statistics.power }}</span>
                  </div>
                </div>
                <div class="p-1 px-2 space-y-1 text-[10px]" v-if="weapon.abilities">
                  <div v-for="ability in weapon.abilities" :key="ability.name">
                    <p><strong>{{ ability.name }}</strong> - {{ ability.description }}</p>
                    <ul v-if="ability.options">
                      <li v-for="option in ability.options" :key="option.name"><strong>{{ option.name }}</strong> - {{ option.description }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="feat-box p-1 px-2 mt-auto" v-if="profile.feat">
              <h2 class="font-cinzel text-center text-lg text-[var(--accent-color)] tracking-widest">FEAT: {{ profile.feat.name }}</h2>
              <p class="text-center text-[10px] mt-1">{{ profile.feat.rules }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="a5-horizontal-container shadow-lg p-3 a5-page">
      <img src="/assets/ui/faction-icon.svg" class="skorne-icon-bg" />
      <div class="content-wrapper flex flex-col flex-grow">
        <div class="header-bar text-center">
          <h1 class="font-cinzel text-2xl tracking-widest">{{ profile.name }} - ABILITIES & SPELLS</h1>
        </div>
        <div class="grid grid-cols-2 gap-3 flex-grow mt-2 text-[var(--text-color)] text-xs">
          <div class="flex flex-col space-y-2">
            <div class="ability-box p-2 space-y-1 h-full text-[11px]">
              <p v-for="ability in abilities" :key="ability.name"><strong>{{ ability.name }}</strong> - {{ ability.description }}</p>
            </div>
          </div>
          <div class="flex-grow space-y-1">
            <div class="flex justify-between items-center bg-[var(--header-bg)] text-[var(--header-text)] p-1 px-2 font-bold font-cinzel">
              <span class="text-sm tracking-wider">SPELLS</span>
              <div class="flex space-x-3 text-xs"><span>COST</span><span>RNG</span><span>AOE</span><span>POW</span><span>UP</span><span>OFF</span></div>
            </div>
            <div class="ability-box p-1 px-2" v-for="spell in spells" :key="spell.name">
              <div class="flex justify-between items-center font-bold">
                <span class="font-cinzel text-xs tracking-wider">{{ spell.name }}</span>
                <div class="flex space-x-4 text-center text-sm">
                  <span>{{ spell.cost }}</span>
                  <span>{{ spell.range }}</span>
                  <span>{{ spell.aoe }}</span>
                  <span>{{ spell.pow }}</span>
                  <span>{{ spell.upkeep ? 'Yes' : 'No' }}</span>
                  <span>{{ spell.offensive ? 'Yes' : 'No' }}</span>
                </div>
              </div>
              <p class="mt-1 text-[10px]">{{ spell.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  profile: Object,
  profileKey: String,
  abilitiesData: Object,
  spellsData: Object,
});

const getAbility = (key) => props.abilitiesData[key];
const getSpell = (key) => props.spellsData[key];

const spells = computed(() => {
  if (!props.profile || !props.profile.spells) return [];
  return props.profile.spells.map(key => getSpell(key));
});

const abilities = computed(() => {
  if (!props.profile || !props.profile.abilities) return [];
  return props.profile.abilities.flat().map(key => getAbility(key));
});

const weapons = computed(() => {
  if (!props.profile || !props.profile.weapons) return [];
  return Object.values(props.profile.weapons).map(weapon => {
    const abilities = weapon.abilities ? weapon.abilities.map(abilityItem => {
        if (Array.isArray(abilityItem)) {
          const groupKey = abilityItem[0];
          const groupAbility = getAbility(groupKey);
          const options = abilityItem.slice(1).map(optionKey => getAbility(optionKey));
          return { ...groupAbility, options };
        } else {
          return getAbility(abilityItem);
        }
      }) : [];
    return { ...weapon, abilities };
  });
});

</script>

<style scoped>
:root {
  --bg-color: #FDFBF8;
  --border-color: #D4AF37;
  --header-bg: #4A2424;
  --header-text: #FDFBF8;
  --stat-bg: #F3EFE9;
  --stat-border: #D4AF37;
  --text-color: #38241C;
  --accent-color: #B8860B;
  --light-bg: #F9F6F2;
}
.profile-card-v2 {
  font-family: 'Roboto', sans-serif;
}
.a5-horizontal-container {
  width: 210mm;
  height: 148mm;
  box-sizing: border-box;
  background-color: var(--bg-color);
  border: 2px solid var(--border-color);
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><g fill="%23D4AF37" fill-opacity="0.05"><rect x="50" width="50" height="50"/><rect y="50" width="50" height="50"/></g></svg>');
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  margin-bottom: 1rem;
}
.font-cinzel {
  font-family: 'Cinzel', serif;
}
.header-bar {
  background-color: var(--header-bg);
  color: var(--header-text);
  padding: 4px 12px;
  border-bottom: 2px solid var(--border-color);
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}
.stat-box {
  background-color: var(--stat-bg);
  border: 1px solid var(--stat-border);
  text-align: center;
  padding: 2px 0;
}
.stat-label {
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--accent-color);
  font-family: 'Cinzel', serif;
}
.stat-value {
  font-size: 1.4rem;
  line-height: 1.4rem;
  font-weight: 700;
  color: var(--text-color);
}
.ability-box {
  border: 1px solid var(--border-color);
  background-color: var(--light-bg);
}
.weapon-header {
  background-color: #6B4226;
  border-bottom: 1px solid var(--border-color);
  border-top: 1px solid var(--border-color);
}
.damage-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 3px;
}
.damage-box {
  width: 20px;
  height: 20px;
  border: 1px solid var(--accent-color);
  background-color: #fff;
}
.feat-box {
  border: 2px solid var(--accent-color);
  background-color: rgba(212, 175, 55, 0.1);
}
.fury-stat-label {
  font-family: 'Cinzel', serif;
  font-weight: 700;
  color: var(--header-text);
  font-size: 0.8rem;
}
.fury-stat-value {
  font-family: 'Cinzel', serif;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2rem;
  color: var(--text-color);
}
.skorne-icon-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  opacity: 0.05;
  z-index: 0;
  pointer-events: none;
}
.content-wrapper {
  position: relative;
  z-index: 1;
}
</style>
