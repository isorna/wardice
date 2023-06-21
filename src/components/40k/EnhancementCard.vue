<template>
  <div class="enhancement">
    <div class="enhancement-header">
      <h1 class="enhancement-name">
        <a>
          <span>{{ enhancement.title }}</span>
          <span class="subtype">&nbsp;{{ enhancement.points }}p</span>
        </a>
      </h1>
      <div class="points-value">
        <button
          :title="i18n.ADD"
          @click="saveToList({ name: enhancement.title, points: enhancement.points })">+</button>
      </div>
    </div>
  </div>
</template>

<script setup>
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

defineProps(['enhancement'])

function saveToList ({ name, points }) {
  listsStore.addToList({
    listId: appStore.activeListId,
    value: { name, points },
    category: 'enhancements'
  })
}
</script>

<style scoped>
.enhancement {
  background: linear-gradient(var(--medium-blue), var(--dark-turquoise-gradient));
  border: 1px dotted var(--border-color);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
}

.enhancement-header {
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

.subtype {
  color: var(--bright-turquoise);
  font-size: 20px;
}

.points-value {
  position: relative;
}
</style>
