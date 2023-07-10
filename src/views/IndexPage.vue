<template>
  <article class="page index-page">
    <router-link to="/games"><img class="logo" src="/logo.animated.svg" /></router-link>
    <h1>War Dice <em>Beta</em></h1>
    <p>{{ i18n.HOME_P1 }}</p>
    <p>{{ i18n.HOME_P2 }}</p>
    <p>{{ i18n.HOME_P3 }}</p>
  </article>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { router } from '@/router'
import i18nApp from '@/i18n/en.i18n.json'

const i18n = {
  ...i18nApp
}
const timerId = ref(null)

onMounted(() => {
  timerId.value = window.setTimeout(() => router.push('/games'), 5000)
})

onBeforeRouteLeave((to, from) => {
  clearTimeout(timerId.value)
})
</script>

<style scoped>
.index-page {
  align-items: center;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}

.logo {
  width: 300px;
}
</style>
