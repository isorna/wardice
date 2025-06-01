<template>
  <div class="rule"
    :class="{ 'full-view': isFullView }">
    <div class="rule-header">
      <h1 class="rule-name"
        :title="(isFullView) ? i18n.HIDE : i18n.SHOW"
        @click="isFullView = !isFullView;">
        <a>
          <span>{{ title }}</span>
        </a>
      </h1>
      <!-- <span class="subtype">&nbsp;{{ rule.cost }}p</span> -->
    </div>
    <template v-if="isFullView">
      <div class="rule-section"
        v-for="(rule, index) in rules"
        :key="`rule-${index}`">
        <p><strong>{{ rule.text }}</strong></p>
      </div>
      <div class="rule-section"
        v-for="(subsection, index) in subsections"
        :key="`rule-${index}`">
        <h2>{{ subsection.title }}</h2>
        <p v-for="(rule, index) in subsection.content" :key="`rule-${index}`"><strong>{{ rule.text }}</strong></p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import i18nApp from '@/i18n/en.i18n.json'
import i18nGame from '@/i18n/warmachine/en.i18n.json'

const i18n = {
  ...i18nApp,
  ...i18nGame
}
const isFullView = ref(false)

defineProps(['rules', 'title', 'subsections'])
</script>

<style scoped>
h1:hover,
h1:focus,
h1:active {
  text-decoration: underline;
  text-decoration-color: var(--brand-color-light);
  text-decoration-style: dotted;
}

.rule {
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

.rule-header {
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  gap: 1rem;
  justify-content: space-between;
}

.rule-name {
  display: flex;
  flex-flow: row;
  line-height: 40px;
  width: calc(100% - 50px);
  gap: 1rem;
}

.rule-section p {
  font-size: 18px;
  margin-top: 10px;
}

.subtype {
  color: var(--bright-turquoise);
  line-height: 40px;
  font-family: var(--font-family-titles);
  font-size: 20px;
}
</style>
