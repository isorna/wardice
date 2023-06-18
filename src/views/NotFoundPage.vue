<template>
  <article class="page">
    <site-header path="/" title="Page not found" />
    <section class="page">
      <h1>Error 404</h1>
      <p><router-link to="/">Go back to Home.</router-link></p>
    </section>
    <PageFooter />
  </article>
</template>

<script setup>
import SiteHeader from '@/components/SiteHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
</script>
