<template>
  <div class="profile"
    :class="{ 'full-view': isFullView }">
    <div class="profile-header">
      <h1 class="profile-name"
        :title="(isFullView) ? i18n.HIDE : i18n.SHOW"
        @click="isFullView = !isFullView">
        <a>
          <span>{{ profile.name }}</span>
          <span class="subtype" v-if="profile.subtype !== ''">&nbsp;{{ profile.subtype }}</span>
        </a>
      </h1>
      <div class="points-value" v-if="!appStore.isFilterVisible">
        <button
          :title="i18n.ADD"
          @click="isSelectorVisible = !isSelectorVisible">+</button>
        <!-- TODO: ADD profile wargear options -->
        <ul class="selector" v-show="isSelectorVisible">
          <li
            @click="saveToList(item)"
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
            <template v-if="weapon.text === undefined">
              <tr>
                <th colspan="6" v-html="weapon.name"></th>
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
            <template v-else>
              <tr>
                <td colspan="7" class="weapon-rules">
                  <strong>{{ weapon.name }}:&nbsp;</strong>
                  <span>{{ weapon.text }}</span>
                </td>
              </tr>
            </template>
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
            <template v-if="weapon.text === undefined">
              <tr>
                <th colspan="6" v-html="weapon.name"></th>
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
            <template v-else>
              <tr>
                <td colspan="7" class="weapon-rules">
                  <strong>{{ weapon.name }}:&nbsp;</strong>
                  <span>{{ weapon.text }}</span>
                </td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
      <div class="profile-section" v-if="profile?.footnotes">
        <p>&#10145; <em>{{ profile.footnotes.footnotes }}</em></p>
      </div>
      <div class="profile-section" v-if="profile?.abilities">
        <template
          v-for="(ability, index) in profile.abilities"
          :key="`${profile.id}-abilities-${index}`">
          <h2 class="profile-subtitle">{{ i18n[ability.title] || ability.title }}</h2>
          <p
            v-for="(abilityValue, abIndex) in ability.values"
            :key="`${profile.id}-abilities-${index}-value-${abIndex}`">
            <strong>{{ abilityValue.title }}:&nbsp;</strong>
            {{ abilityValue.text }}
          </p>
        </template>
      </div>
      <div class="profile-section" v-if="profile?.wargearAbilities">
        <template
          v-for="(ability, index) in profile.wargearAbilities"
          :key="`${profile.id}-wargearAbilities-${index}`">
          <h2 class="profile-subtitle">{{ i18n[ability.title] || ability.title }}</h2>
          <p
            v-for="(abilityValue, abIndex) in ability.values"
            :key="`${profile.id}-wargearAbilities-${index}-value-${abIndex}`">
            <strong>{{ abilityValue.title }}:&nbsp;</strong>
            {{ abilityValue.text }}
          </p>
        </template>
      </div>
      <div class="profile-section" v-if="profile?.invulnerable">
        <template
          v-for="(invulnerable, index) in profile.invulnerable"
          :key="`${profile.id}-invulnerable-${index}`">
          <h2 class="profile-subtitle">{{ i18n[invulnerable.title] || invulnerable.title }}</h2>
          <p
            v-for="(invulnerableValue, iIndex) in invulnerable.values"
            :key="`${profile.id}-invulnerable-${index}-value-${iIndex}`">
            {{ invulnerableValue.text }}
          </p>
        </template>
      </div>
      <div class="profile-section" v-if="profile?.damaged">
        <template
          v-for="(damaged, index) in profile.damaged"
          :key="`${profile.id}-damaged-${index}`">
          <h2 class="profile-subtitle">{{ i18n[damaged.title] || damaged.title }}</h2>
          <p
            v-for="(damagedValue, iIndex) in damaged.values"
            :key="`${profile.id}-damaged-${index}-value-${iIndex}`">
            {{ damagedValue.text }}
          </p>
        </template>
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
          <strong>{{ keysSet.keywordGroup }}:&nbsp;</strong>
          {{ keysSet.value.join(', ') }}
        </p>
      </div>
      <div class="profile-section"
        v-for="(item, index) in profile.wargear"
        :key="`${profile.id}-wargearOptions-${index}`">
        <h2 class="profile-subtitle">{{ i18n[item.title] || item.title }}</h2>
        <div
          v-for="(itemValue, iIndex) in item.values"
          :key="`${profile.id}-wargearOptions-${index}-value-${iIndex}`">
          <template v-if="itemValue.list">
            <ul class="profile-list">
              <template
                v-for="(listItem, liIndex) in itemValue.list"
                :key="`${profile.id}-wargearOptions-${index}-value-${iIndex}-LI-${liIndex}`">
                <template
                  v-if="Array.isArray(listItem)">
                    <li
                      class="child-item"
                      v-for="(childListItem, cliIndex) in listItem"
                      :key="`${profile.id}-wargearOptions-${index}-value-${iIndex}-LI-${liIndex}-${cliIndex}`">
                      <template v-if="childListItem?.startsWith('*')">
                        <em>{{ childListItem }}</em>
                      </template>
                      <template v-else>{{ childListItem }}</template>
                    </li>
                </template>
                <template v-else>
                  <li class="parent-item">{{ listItem }}</li>
                </template>
              </template>
            </ul>
          </template>
          <p>
            <strong v-if="itemValue.title">{{ itemValue.title }}:&nbsp;</strong>
            <template v-if="itemValue?.text?.startsWith('*')">
              <em>{{ itemValue.text }}</em>
            </template>
            <template v-else>{{ itemValue.text }}</template>
          </p>
        </div>
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

const props = defineProps(['profile'])

const i18n = {
  ...i18nApp,
  ...i18n40k
}
const appStore = useAppStore()
const listsStore = useListsStore()
const isFullView = ref(false)
const isSelectorVisible = ref(false)

function saveToList (item) {
  if (appStore.activeListId === '' || appStore.activeListId === undefined) {
    const newListId = `${props.profile.faction}-${Date.now()}`
    listsStore.createList({
      id: newListId,
      faction: props.profile.faction,
      name: `${props.profile.faction.replaceAll('-', ' ').toUpperCase()} ${(new Date()).toLocaleDateString()}`
    })
    appStore.setActiveList(newListId)
  }
  listsStore.addToList({
    id: appStore.activeListId,
    value: {
      id: props.profile.id,
      faction: props.profile.faction,
      name: props.profile.name,
      subtype: props.profile?.subtype,
      qty: item.per,
      points: item.points,
      keywords: parseKeywordsForList(props.profile.keywords)
    },
    category: 'profiles'
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
  gap: 0.5rem;
}

.subtype {
  color: var(--bright-turquoise);
  font-family: var(--font-family-text);
  font-size: 0.8em;
  font-weight: normal;
}

.points-value {
  position: relative;
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

.weapon-rules {
  line-height: 1.5em;
  padding: 10px;
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
  font-size: 18px;
  gap: 10px;
  margin: 10px;
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
    font-size: 0.8rem;
  }
}
</style>
