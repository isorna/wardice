<template>
  <section class="rules-list">
    <div
      class="rule"
      v-for="(rule, index) in rules"
      :key="`rule-${index}`">
      <p v-if="rule.title || rule.text">
        <strong v-if="rule.title">{{ rule.title }}:&nbsp;</strong>
        <template v-if="rule?.text?.startsWith('*')">
          <em>{{ rule.text }}</em>
        </template>
        <template v-else>{{ rule.text }}</template>
      </p>
      <ul class="rule-list" v-if="rule.list">
        <li
          class="parent-item"
          v-for="(item, iIndex) in rule.list"
          :key="`rule-${index}-${iIndex}`">
          <strong v-if="item.title">{{ item.title }}:&nbsp;</strong>
          <template v-if="item?.text?.startsWith('*')">
            <em>{{ item.text }}</em>
          </template>
          <template v-else>{{ item.text || item }}</template>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
// import i18nApp from '@/i18n/en.i18n.json'
// import i18n40k from '@/i18n/40k/en.i18n.40k.json'

// const i18n = {
//   ...i18nApp,
//   ...i18n40k
// }
defineProps(['rules'])
</script>

<style scoped>
.rules-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
}

.rule-list {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 10px;
  margin: 10px;
}

.rule-list li.parent-item {
  list-style-type: '■';
  padding-left: 1rem;
  margin-left: 10px;
}
</style>
