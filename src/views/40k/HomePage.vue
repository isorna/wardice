<template>
  <article class="page">
    <site-header path="/" title="WH40k 10th edition" />
    <section class="page">
      <h1>Select a faction</h1>
      <ul>
        <li><router-link to="/40k/adepta-sororitas">Adepta Sororitas</router-link></li>
        <li><router-link to="/40k/adeptus-astartes">Adeptus Astartes</router-link></li>
        <li><router-link to="/40k/adeptus-custodes">Adeptus Custodes</router-link></li>
        <li><router-link to="/40k/adeptus-mechanicus">Adeptus Mechanicus</router-link></li>
        <li><router-link to="/40k/aeldari">Aeldari</router-link></li>
        <li><router-link to="/40k/agents-imperium">Agents of the Imperium</router-link></li>
        <li><router-link to="/40k/astra-militarum">Astra Militarum</router-link></li>
        <li><router-link to="/40k/black-templars">Black Templars</router-link></li>
        <li><router-link to="/40k/blood-angels">Blood Angels</router-link></li>
        <li><router-link to="/40k/chaos-daemons">Chaos Daemons</router-link></li>
        <li><router-link to="/40k/chaos-knights">Chaos Knights</router-link></li>
        <li><router-link to="/40k/chaos-space-marines">Chaos Space Marines</router-link></li>
        <li><router-link to="/40k/dark-angels">Dark Angels</router-link></li>
        <li><router-link to="/40k/death-guard">Death Guard</router-link></li>
        <li><router-link to="/40k/deathwatch">Deathwatch</router-link></li>
        <li><router-link to="/40k/drukhari">Drukhari</router-link></li>
        <li><router-link to="/40k/genestealer-cults">Genestealer Cults</router-link></li>
        <li><router-link to="/40k/grey-knights">Grey Knights</router-link></li>
        <li><router-link to="/40k/imperial-knights">Imperial Knights</router-link></li>
        <li><router-link to="/40k/leagues-votann">Leagues of Votann</router-link></li>
        <li><router-link to="/40k/necrons">Necrons</router-link></li>
        <li><router-link to="/40k/orks">Orks</router-link></li>
        <li><router-link to="/40k/space-wolves">Space Wolves</router-link></li>
        <li><router-link to="/40k/tau-empire">T'au Empire</router-link></li>
        <li><router-link to="/40k/thousand-sons">Thousand Sons</router-link></li>
        <li><router-link to="/40k/tyranids">Tyranids</router-link></li>
        <li><router-link to="/40k/world-eaters">World Eaters</router-link></li>
        <!-- <li><router-link to=""></router-link></li> -->
      </ul>
    </section>
    <PageFooter />
  </article>
</template>

<script setup>
import SiteHeader from '@/components/SiteHeader.vue'
import PageFooter from '@/components/40k/PageFooter.vue'
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

a:hover {
  color: white;
}

/*
@media (width >= 768px) {
  h1 {
    font-size: 30px;
  }
} */
</style>
