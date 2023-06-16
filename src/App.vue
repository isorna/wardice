<template>
  <router-view v-slot="{ Component }">
    <transition
      name="custom-classes"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
// import { onMounted } from 'vue'
// import { useRouter } from 'vue-router'

// const router = useRouter()

// onMounted(() => {
//   setTimeout(() => { router.push({ path: '/40k', replace: true }) }, 500)
// })
</script>

<style scoped>
/* TODO: styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
