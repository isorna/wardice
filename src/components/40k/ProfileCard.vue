<template>
  <div class="profile">
    <div class="profile-header" @click="isFullView = !isFullView;console.log(profile)">
      <h1 class="profile-name">{{ profile.name }}</h1>
      <p v-if="profile.subtype !== ''">{{ profile.subtype }}</p>
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
        <p v-if="profile.abilities.core">{{ i18n.CORE }}: <strong>{{ profile.abilities.core }}</strong></p>
        <p v-if="profile.abilities.faction">{{ i18n.FACTION }}: <strong>{{ profile.abilities.faction }}</strong></p>
        <p
          v-for="(ability, index) in profile.abilities.special"
          :key="`${profile.id}-abilities-${index}`">
          <strong>{{ ability.split(':')[0] }}:</strong>
          {{ ability.split(':').slice(0).join(':') }}
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
    </template>
  </div>
</template>

<script setup>
// import { computed, ref } from 'vue'
import { ref } from 'vue'
import i18n from '@/api/40k/en.i18n.json'

// const props = defineProps(['profile'])
defineProps(['profile'])

const isFullView = ref(false)
// const keywords = computed(() => {
//   return props.profile.keywords.split('| ')
// })
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

.profile-header {
  cursor: pointer;
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
  justify-content: flex-start;
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

@media (width >= 768px) {
  .profile-header {
    flex-direction: row;
  }
}
</style>
