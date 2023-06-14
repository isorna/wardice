<template>
  <article class="page">
    <site-header path="/" title="WH40k 10th edition profiles" />
    <section class="page">
      <h1>Select a faction</h1>
      <ul>
        <li><router-link to="/40k/adeptus-astartes">Adeptus Astartes</router-link></li>
        <li><router-link to="/40k/black-templars">Black Templars</router-link></li>
        <li><router-link to="/40k/blood-angels">Blood Angels</router-link></li>
        <li><router-link to="/40k/chaos-daemons">Chaos Daemons</router-link></li>
        <li><router-link to="/40k/chaos-space-marines">Chaos Space Marines</router-link></li>
        <li><router-link to="/40k/dark-angels">Dark Angels</router-link></li>
        <li><router-link to="/40k/death-guard">Death Guard</router-link></li>
        <li><router-link to="/40k/space-wolves">Space Wolves</router-link></li>
        <li><router-link to="/40k/thousand-sons">Thousand Sons</router-link></li>
        <li><router-link to="/40k/tyranids">Tyranids</router-link></li>
        <li><router-link to="/40k/world-eaters">World Eaters</router-link></li>
        <!-- <li><router-link to=""></router-link></li> -->
      </ul>
    </section>
    <PageFooter40k />
  </article>
</template>

<script setup>
import SiteHeader from '@/components/SiteHeader.vue'
import PageFooter40k from '@/components/40k/PageFooter40k.vue'
</script>

<style scoped>
h1 {
  font-size: 30px;
  line-height: 40px;
}

ul {
  margin-top: 20px;
}

li {
  font-size: 30px;
  line-height: 40px;
}

/*
@media (width >= 768px) {
  h1 {
    font-size: 30px;
  }
} */
</style>
