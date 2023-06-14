<template>
  <form @submit="onSubmit" class="filter-form">
    <fieldset>
      <legend>Profile name</legend>
      <input type="search"
        class="profile-name"
        placeholder="Filter by name"
        :value="nameFilter"
        @input="$emit('update:nameFilter', $event.target.value)" />
    </fieldset>
  </form>
</template>

<script setup>
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
  justify-content: flex-start;
  padding: 20px;
}
.profile-name {
  width: 100%;
}
@media (width >= 768px) {
  .filter-form {
    flex-direction: row;
  }
  .profile-name {
    width: 30rem;
  }
}
</style>