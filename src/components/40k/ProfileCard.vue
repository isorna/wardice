<template>
  <div class="profile"
    :class="{ 'full-view': isFullView }">
    <div class="profile-header">
      <h1 class="profile-name"
        :title="(isFullView) ? i18n.HIDE : i18n.SHOW"
        @click="isFullView = !isFullView; getWargearOptions(profile)">
        <span>{{ profile.name }}</span>
        <span class="subtype" v-if="profile.subtype !== ''">{{ profile.subtype }}</span>
      </h1>
      <div class="points-value">
        <button
          :title="i18n.ADD"
          @click="isSelectorVisible = !isSelectorVisible">+</button>
        <ul class="selector" v-show="isSelectorVisible">
          <li
            @click="saveToList({ name: profile.name, qty: item.per, points: item.points, keywords: parseKeywordsForList(profile.keywords)  })"
            v-for="(item, index) in profile.points"
            :key="`${profile.id}-points-${index}`">
            {{ item.per }}: <em>{{ item.points }}p</em>
          </li>
        </ul>
      </div>
    </div>
    <template v-if="isFullView">
      <template v-if="Array.isArray(profile.stats)">
        <table
          class="profile-stats"
          v-for="(stats, index) in profile.stats"
          :key="`${profile.id}-stats-${index}`">
          <caption>{{ stats.name }}</caption>
          <thead>
            <tr>
              <th>M</th>
              <th>T</th>
              <th>SV</th>
              <th>W</th>
              <th>LD</th>
              <th>OC</th>
            </tr>
          </thead>
          <tr>
            <td>{{ stats.m }}</td>
            <td>{{ stats.t }}</td>
            <td>{{ stats.sv }}</td>
            <td>{{ stats.w }}</td>
            <td>{{ stats.ld }}</td>
            <td>{{ stats.oc }}</td>
          </tr>
        </table>
      </template>
      <table
        v-else
        class="profile-stats">
        <thead>
          <tr>
            <th>M</th>
            <th>T</th>
            <th>SV</th>
            <th>W</th>
            <th>LD</th>
            <th>OC</th>
          </tr>
        </thead>
        <tr>
          <td>{{ profile.stats.m }}</td>
          <td>{{ profile.stats.t }}</td>
          <td>{{ profile.stats.sv }}</td>
          <td>{{ profile.stats.w }}</td>
          <td>{{ profile.stats.ld }}</td>
          <td>{{ profile.stats.oc }}</td>
        </tr>
      </table>
      <table
        v-if="profile?.weapons?.ranged?.length > 0"
        class="profile-weapons">
        <caption>{{ i18n.RANGED_WEAPONS }}</caption>
        <thead>
          <tr>
            <!-- <th></th> -->
            <th>{{ i18n.RANGE }}</th>
            <th>{{ i18n.A }}</th>
            <th>{{ i18n.BS }}</th>
            <th>{{ i18n.S }}</th>
            <th>{{ i18n.AP }}</th>
            <th>{{ i18n.D }}</th>
          </tr>
        </thead>
        <tbody>
          <template
            v-for="(weapon, index) in profile.weapons.ranged"
            :key="`${profile.id}-ranged-weapons-${index}`">
            <tr>
              <th colspan="6">{{ weapon.name }}</th>
            </tr>
            <tr>
              <td>{{ weapon.range }}</td>
              <td>{{ weapon.a }}</td>
              <td>{{ weapon.bws }}</td>
              <td>{{ weapon.s }}</td>
              <td>{{ weapon.ap }}</td>
              <td>{{ weapon.d }}</td>
            </tr>
          </template>
        </tbody>
      </table>
      <table
        v-if="profile?.weapons?.melee?.length > 0"
        class="profile-weapons">
        <caption>{{ i18n.MELEE_WEAPONS }}</caption>
        <thead>
          <tr>
            <!-- <th></th> -->
            <th>{{ i18n.RANGE }}</th>
            <th>{{ i18n.A }}</th>
            <th>{{ i18n.WS }}</th>
            <th>{{ i18n.S }}</th>
            <th>{{ i18n.AP }}</th>
            <th>{{ i18n.D }}</th>
          </tr>
        </thead>
        <tbody>
          <template
            v-for="(weapon, index) in profile.weapons.melee"
            :key="`${profile.id}-melee-weapons-${index}`">
            <tr>
              <th colspan="6">{{ weapon.name }}</th>
            </tr>
            <tr>
              <td>{{ weapon.range }}</td>
              <td>{{ weapon.a }}</td>
              <td>{{ weapon.bws }}</td>
              <td>{{ weapon.s }}</td>
              <td>{{ weapon.ap }}</td>
              <td>{{ weapon.d }}</td>
            </tr>
          </template>
        </tbody>
      </table>
      <div class="profile-section" v-if="profile?.footnotes">
        <p>&#10145; <em>{{ profile.footnotes.footnotes }}</em></p>
      </div>
      <div class="profile-section" v-if="profile?.specialRules">
        <h2 class="profile-subtitle">{{ profile.specialRules.name }}</h2>
        <p
          v-for="(ability, index) in profile.specialRules.abilities"
          :key="`${profile.id}-specialRules-${index}`">
          <strong>{{ ability.split(':')[0] }}:</strong>
          {{ ability.split(':')[1] }}
        </p>
      </div>
      <div class="profile-section" v-if="profile?.abilities">
        <h2 class="profile-subtitle">{{ i18n.ABILITIES }}</h2>
        <p v-if="profile.abilities.core">{{ i18n.CORE }}: <strong>{{ profile.abilities.core.join(', ') }}</strong></p>
        <p v-if="profile.abilities.faction">{{ i18n.FACTION }}: <strong>{{ profile.abilities.faction.join(', ') }}</strong></p>
        <p
          v-for="(ability, index) in profile.abilities.special"
          :key="`${profile.id}-abilities-${index}`">
          <strong>{{ ability.name }}:</strong>
          {{ ability.text }}
        </p>
      </div>
      <div class="profile-section" v-if="profile?.wargearAbilities">
        <h2 class="profile-subtitle">{{ i18n.WARGEAR_ABILITIES }}</h2>
        <p
          v-for="(ability, index) in profile.wargearAbilities.special"
          :key="`${profile.id}-abilities-${index}`">
          <strong>{{ ability.name }}:</strong>
          {{ ability.text }}
        </p>
      </div>
      <div class="profile-section" v-if="profile?.invulnerable">
        <h2 class="profile-subtitle">{{ i18n.INVULNERABLE }} <strong>{{ profile.invulnerable }}</strong></h2>
      </div>
      <div class="profile-section" v-if="profile?.damaged">
        <h2 class="profile-subtitle">{{ i18n.DAMAGED }}</h2>
        <p>{{ profile.damaged }}</p>
      </div>
      <div class="profile-section" v-if="profile?.factionKeywords">
        <h2 class="profile-subtitle">{{ i18n.FACTION_KEYWORDS }}</h2>
        <!-- TODO: añadir links de cada keyword -->
        <p>{{ profile.factionKeywords.join(', ') }}</p>
      </div>
      <div class="profile-section" v-if="profile?.keywords">
        <h2 class="profile-subtitle">{{ i18n.KEYWORDS }}</h2>
        <!-- TODO: añadir links de cada keyword -->
        <p v-if="typeof profile.keywords[0] === 'string'">
          {{ profile.keywords.join(', ') }}
        </p>
        <p
          v-else
          v-for="(keysSet, index) in profile.keywords"
          :key="`${profile.id}-keywords-${index}`">
          <strong>{{ keysSet.keywordGroup }}:</strong>
          {{ keysSet.value.join(', ') }}
        </p>
      </div>
      <div class="profile-section"
        v-for="(item, index) in getWargearOptions(profile)"
        :key="`${profile.id}-wargearOptions-${index}`">
        <h2 class="profile-subtitle">{{ item.name }}</h2>
        <ul class="profile-list">
          <li
            :class="{
              'parent-item': subitem.parent !== undefined,
              'child-item': subitem.child !== undefined,
              'note-item': subitem.note !== undefined
            }"
            v-for="(subitem, subindex) in item.values"
            :key="`${profile.id}-wargearOptions-${index}-${subindex}`">
            <template v-if="item.name === i18n.UNIT_COMPOSITION || item.name === i18n.LEADER">
            <strong>{{ subitem.parent }}</strong>
            </template>
            <template v-else>
            {{ subitem.parent }}
            </template>
            {{ subitem.line || subitem.child || subitem.note }}
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/store/app.store'
import { useListsStore } from '@/store/40k/lists.store'
import i18nApp from '@/i18n/en.i18n.json'
import i18n40k from '@/i18n/40k/en.i18n.40k.json'

const i18n = {
  ...i18nApp,
  ...i18n40k
}
const appStore = useAppStore()
const listsStore = useListsStore()

defineProps(['profile'])

const isFullView = ref(false)
const isSelectorVisible = ref(false)

function saveToList ({ name, qty, points, keywords }) {
  listsStore.addToList({
    listId: appStore.activeListId,
    value: { name, qty, points, keywords }
  })
  isSelectorVisible.value = !isSelectorVisible.value
}

function parseKeywordsForList (keywords) {
  let returnValue = [...keywords]

  if (typeof keywords[0] !== 'string') {
    returnValue = keywords.map((item) => {
      return [...item.value]
    }).flat()
  }
  return returnValue
}

function getWargearOptions (profile) {
  let returnValue = profile.wargear

  returnValue = returnValue.map((item) => {
    return {
      name: item.name,
      values: item.values.map((subitem, index, array) => {
        if (subitem === '■') {
          return {
            parent: array[index + 1]
          }
        } else if (subitem === '◦') {
          return {
            child: array[index + 1]
          }
        } else if (subitem === '*') {
          return {
            note: array[index + 1]
          }
        } else if ((index === 0 &&
          subitem !== '■' &&
          subitem !== '◦' &&
          subitem !== '*') ||
          (index > 0 &&
          array[index - 1] !== '■' &&
          array[index - 1] !== '◦' &&
          array[index - 1] !== '*')) {
          // if subitem === profile.name !!!
          return {
            line: subitem
          }
        } else {
          return {
            empty: subitem
          }
        }
      })
        .filter((item) => item !== null)
        .filter((item) => item.empty === undefined)
    }
  })

  console.log(returnValue)
  return returnValue
    .filter((item) => item.empty === undefined)
}
</script>

<style scoped>
.profile {
  background: linear-gradient(var(--dark-blue), var(--medium-blue));
  border: 1px dotted var(--border-color);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
}

.full-view {
  background: linear-gradient(var(--medium-blue), var(--dark-blue));
  border: 2px solid var(--brand-color);
}

.profile-header {
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  gap: 1rem;
  justify-content: space-between;
}

.profile-name {
  display: flex;
  flex-flow: column;
  line-height: 40px;
  width: calc(100% - 50px);
  gap: .5rem;
}

.profile-name:hover {
  color: var(--light-orange-gradient);
}

.subtype {
  color: var(--bright-turquoise);
  font-family: var(--font-family-text);
  font-size: .8em;
  font-weight: normal;
}

.points-value {
  position: relative;
}

.points-value button {
  background-color: var(--brand-color);
  clip-path: circle(30%);
  color: var(--darkest-blue);
  font-family: var(--font-family-titles);
  font-size: 30px;
  line-height: 20px;
}

.points-value button:hover {
  background-color: var(--light-orange-gradient);
}

.points-value .selector {
  background-color: var(--darkest-blue);
  border: 1px solid var(--brand-color);
  border-radius: 8px;
  display: flex;
  filter: drop-shadow(0 0 4px var(--brand-color-light));
  flex-direction: column;
  padding: 4px;
  position: absolute;
  right: 0;
  top: 50px;
  z-index: 100;
}

.points-value .selector li {
  cursor: pointer;
  font-size: 20px;
  line-height: 40px;
  padding: 0 5px;
  white-space: nowrap;
}

.points-value .selector li + li {
  border-top: 1px dotted var(--brand-color-light);
}

.points-value .selector li:hover {
  background-color: var(--medium-blue);
}

.points-value .selector li em {
  color: var(--brand-color);
  font-style: normal;
  font-weight: bold;
}

h1:hover,
h1:focus,
h1:active {
  text-decoration: underline;
  text-decoration-color: var(--brand-color-light);
  text-decoration-style: dotted;
}

.profile-stats,
.profile-weapons {
  font-size: 18px;
  line-height: 40px;
  text-align: center;
}

caption,
.profile-subtitle {
  color: var(--brand-color);
  font-family: var(--font-family-text);
  font-weight: normal;
  text-align: left;
  text-transform: uppercase;
}

.profile-subtitle strong {
  font-family: var(--font-family-titles);
  font-size: 20px;
}

thead th {
  border: 1px solid var(--bright-turquoise);
}

tbody th {
  font-weight: normal;
  text-align: left;
}

td {
  background-color: var(--bright-turquoise);
  color: var(--dark-turquoise);
  padding: 0;
  width: 20px;
}

.profile-section p {
  font-size: 18px;
  margin-top: 10px;
}

.profile-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.profile-list li.parent-item {
  list-style-type: '■';
  padding-left: 1rem;
  margin-left: 10px;
}

.profile-list li.child-item {
  list-style-type: circle;
  padding-left: 1rem;
  margin-left: 20px;
}

.profile-list li.note-item {
  list-style-type: '*';
  padding-left: 1rem;
  font-style: italic;
}

@media (width >= 768px) {
  .profile-header {
    flex-direction: row;
  }

  .profile-name {
    flex-flow: row;
    gap: 1rem;
  }

  .subtype {
    flex-flow: row;
    font-size: .8rem;
  }
}
</style>
