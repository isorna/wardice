<template>
  <div class="stratagem"
    :class="{ 'full-view': isFullView }">
    <div class="stratagem-header">
      <h1 class="stratagem-name"
        :title="(isFullView) ? i18n.HIDE : i18n.SHOW"
        @click="isFullView = !isFullView;">
        <a>
          <span>{{ stratagem.title }}</span>
        </a>
      </h1>
      <span class="subtype">&nbsp;{{ stratagem.cost }}p</span>
    </div>
    <template v-if="isFullView">
      <div class="stratagem-section">
        <p><strong>{{ stratagem.category }}</strong></p>
        <p><strong>{{ i18n.PHASE }}</strong>: <em>{{ stratagem.phase.join(', ') }}</em></p>
        <p><strong>{{ i18n.WHEN }}</strong>: {{ stratagem.rules.when  }}</p>
        <p><strong>{{ i18n.TARGET }}</strong>: {{ stratagem.rules.target  }}</p>
        <p><strong>{{ i18n.EFFECT }}</strong>: {{ stratagem.rules.effect  }}</p>
        <p v-if="stratagem.rules.restrictions"><strong>{{ i18n.RESTRICTIONS }}</strong>: {{ stratagem.rules.restrictions  }}</p>
      </div>
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

defineProps(['stratagem'])
</script>

<style scoped>
h1:hover,
h1:focus,
h1:active {
  text-decoration: underline;
  text-decoration-color: var(--brand-color-light);
  text-decoration-style: dotted;
}

.stratagem {
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

.stratagem-header {
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  gap: 1rem;
  justify-content: space-between;
}

.stratagem-name {
  display: flex;
  flex-flow: row;
  line-height: 40px;
  width: calc(100% - 50px);
  gap: 1rem;
}

.stratagem-section p {
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
