<template>
  <header>
    <h1><router-link :to="path" >{{ title }}</router-link></h1>
  </header>
</template>

<script setup>
defineProps(['title', 'path'])
// <Icon icon="game-icons:spaceship" />
// import { Icon } from '@iconify/vue';
</script>

<style scoped>
header {
  background-color: var(--dark-blue);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  padding: 20px;
}

h1 {
  font-size: 24px;
  line-height: 40px;
}

h1:hover {
  color: var(--light-orange-gradient);
}

@media (width >= 768px) {
  header {
    padding: 20px 40px;
  }

  h1 {
    font-size: 40px;
    line-height: 50px;
  }
}
</style>
