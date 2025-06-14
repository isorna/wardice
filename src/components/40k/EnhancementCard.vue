<template>
  <div class="enhancement"
    :class="{ 'full-view': isFullView }">
    <div class="enhancement-header">
      <h1 class="enhancement-name"
        :title="(isFullView) ? i18n.HIDE : i18n.SHOW"
        @click="isFullView = !isFullView">
        <a>
          <span>{{ enhancement.title }}</span>
        </a>
      </h1>
      <span class="subtype" v-if="!appStore.isFilterVisible">&nbsp;{{ enhancement.points }}p</span>
      <div class="points-value" v-if="!appStore.isFilterVisible">
        <button
          :title="i18n.ADD"
          @click="saveToList()">+</button>
      </div>
    </div>
    <template v-if="isFullView">
      <div class="enhancement-section">
        <p
          v-for="(rule, index) in enhancement.rules"
          :key="`rule-${index}`">
          <strong v-if="rule.title">{{ rule.title }}:&nbsp;</strong>
          <template v-if="rule?.text?.startsWith('*')">
            <em>{{ rule.text }}</em>
          </template>
          <template v-else>{{ rule.text }}</template>
        </p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/store/app.store'
import { useListsStore } from '@/store/40k/lists.store'
import i18nApp from '@/i18n/en.i18n.json'
import i18n40k from '@/i18n/40k/en.i18n.json'

const i18n = {
  ...i18nApp,
  ...i18n40k
}
const appStore = useAppStore()
const listsStore = useListsStore()
const isFullView = ref(false)

const props = defineProps(['enhancement'])

function saveToList () {
  if (appStore.activeListId === '' || appStore.activeListId === undefined) {
    const newListId = `${props.enhancement.faction}-${Date.now()}`
    listsStore.createList({
      id: newListId,
      faction: props.enhancement.faction,
      name: `${props.enhancement.faction.replaceAll('-', ' ').toUpperCase()} ${(new Date()).toLocaleDateString()}`
    })
    appStore.setActiveList(newListId)
  }
  listsStore.addToList({
    id: appStore.activeListId,
    value: {
      id: props.enhancement.id,
      faction: props.enhancement.faction,
      name: props.enhancement.title,
      points: props.enhancement.points
    },
    category: 'enhancements'
  })
}
</script>

<style scoped>
h1:hover,
h1:focus,
h1:active {
  text-decoration: underline;
  text-decoration-color: var(--brand-color-light);
  text-decoration-style: dotted;
}

.enhancement {
  background: linear-gradient(var(--medium-blue), var(--dark-turquoise-gradient));
  border: 1px dotted var(--border-color);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
}

.full-view {
  background: linear-gradient(var(--dark-turquoise-gradient), var(--medium-blue));
  border: 2px solid var(--brand-color);
}

.enhancement-header {
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  gap: 1rem;
  justify-content: space-between;
}

.enhancement-name {
  display: flex;
  flex-flow: row;
  line-height: 40px;
  width: calc(100% - 50px);
  gap: 1rem;
}

.enhancement-section p {
  font-size: 18px;
  margin-top: 10px;
}

.subtype {
  color: var(--bright-turquoise);
  line-height: 40px;
  font-family: var(--font-family-titles);
  font-size: 20px;
}

.points-value {
  position: relative;
}
</style>
