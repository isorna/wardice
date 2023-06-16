<template>
  <article class="page index-page">
    <router-link to="/40k"><img class="logo" src="/logo.v3.svg" /></router-link>
  </article>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  setTimeout(() => { router.push({ path: '/40k', replace: true }) }, 500)
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
  max-width: 300px;
}
</style>
