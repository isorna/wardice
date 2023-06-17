<template>
  <form @submit="onSubmit" class="filter-form">
    <fieldset class="profile-name">
      <legend>Profile name</legend>
      <input type="search"
        placeholder="Filter by name"
        :value="nameFilter"
        @input="$emit('update:nameFilter', $event.target.value)" />
    </fieldset>
    <button class="list-button" @click="appStore.toggleList()">LIST</button>
  </form>
</template>

<script setup>
import { useAppStore } from '@/store/app.store'

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
  background-color: var(--brand-color);
  border-radius: 10px;
  color: var(--darkest-blue);
  font-family: var(--font-family-titles);
  font-size: 30px;
  line-height: 20px;
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
