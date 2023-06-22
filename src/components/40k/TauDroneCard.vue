<template>
  <div class="drone"
    :class="{ 'full-view': isFullView }">
    <div class="drone-header">
      <h1 class="drone-name"
        :title="(isFullView) ? i18n.HIDE : i18n.SHOW"
        @click="isFullView = !isFullView; console.log(drone)">
        <a>
          <span>{{ drone.name }}</span>
        </a>
      </h1>
    </div>
    <template v-if="isFullView">
      <div class="drone-section">
        <p>{{ drone.text }}</p>
      </div>
      <table
        v-if="drone?.weapons?.ranged?.length > 0"
        class="drone-weapons">
        <caption>{{ i18n.RANGED_WEAPONS }}</caption>
        <thead>
          <tr>
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
            v-for="(weapon, index) in drone.weapons.ranged"
            :key="`drone-ranged-weapons-${index}`">
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
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import i18nApp from '@/i18n/en.i18n.json'
import i18n40k from '@/i18n/40k/en.i18n.40k.json'

const i18n = {
  ...i18nApp,
  ...i18n40k
}
const isFullView = ref(false)

defineProps(['drone'])
</script>

<style scoped>
h1:hover,
h1:focus,
h1:active {
  text-decoration: underline;
  text-decoration-color: var(--brand-color-light);
  text-decoration-style: dotted;
}

.drone {
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

.drone-header {
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  gap: 1rem;
  justify-content: space-between;
}

.drone-name {
  display: flex;
  flex-flow: row;
  line-height: 40px;
  width: calc(100% - 50px);
  gap: 1rem;
}

.drone-section p {
  font-size: 18px;
  margin-top: 10px;
}

.drone-weapons {
  font-size: 18px;
  line-height: 40px;
  text-align: center;
}

.weapon-rules {
  line-height: 1.5em;
  padding: 10px;
}

caption {
  color: var(--brand-color);
  font-family: var(--font-family-text);
  font-weight: normal;
  text-align: left;
  text-transform: uppercase;
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
</style>
