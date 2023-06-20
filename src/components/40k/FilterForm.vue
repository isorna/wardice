<template>
  <form @submit="onSubmit" class="filter-form">
    <fieldset class="profile-name">
      <legend>{{ i18n.PROFILE_NAME }}</legend>
      <input type="search"
        :placeholder="i18n.FILTER_BY_NAME"
        :value="nameFilter"
        @input="$emit('update:nameFilter', $event.target.value)" />
    </fieldset>
    <button class="list-button" @click="appStore.toggleList()">{{ i18n.LIST }}</button>
  </form>
</template>

<script setup>
import { useAppStore } from '@/store/app.store'
import i18nApp from '@/i18n/en.i18n.json'
import i18n40k from '@/i18n/40k/en.i18n.40k.json'

const i18n = {
  ...i18nApp,
  ...i18n40k
}
const appStore = useAppStore()

defineProps(['nameFilter'])
defineEmits(['update:nameFilter'])

function onSubmit (e) {
  e.preventDefault()
}
</script>

<style scoped>
.filter-form {
  background: linear-gradient(var(--dark-blue), var(--medium-blue));
  border-bottom: 1px dotted var(--border-color);
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 40px;
  justify-content: space-between;
  padding: 20px;
}

.profile-name {
  width: 100%;
}

.list-button {
  padding: 0 20px;
}

@media (width >= 768px) {
  .filter-form {
    flex-direction: row;
  }

  .profile-name {
    width: calc(100% - 80px);
  }
}
</style>
