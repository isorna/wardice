<template>
  <article class="page">
    <site-header path="/" title="WH40k 10th edition" />
    <section class="page">
      <h1 class="home-title">Select a faction</h1>
      <ul class="faction-list">
        <li class="faction-item"><router-link to="/40k/adepta-sororitas">Adepta Sororitas (WIP)</router-link></li>
        <li class="faction-item"><router-link to="/40k/adeptus-astartes">Adeptus Astartes (WIP)</router-link></li>
        <li class="faction-item"><router-link to="/40k/adeptus-custodes">Adeptus Custodes</router-link></li>
        <li class="faction-item"><router-link to="/40k/adeptus-mechanicus">Adeptus Mechanicus (WIP)</router-link></li>
        <li class="faction-item"><router-link to="/40k/aeldari">Aeldari (WIP)</router-link></li>
        <li class="faction-item"><router-link to="/40k/agents-imperium">Agents of the Imperium (WIP)</router-link></li>
        <li class="faction-item"><router-link to="/40k/astra-militarum">Astra Militarum (WIP)</router-link></li>
        <li class="faction-item"><router-link to="/40k/black-templars">Black Templars (WIP)</router-link></li>
        <li class="faction-item"><router-link to="/40k/blood-angels">Blood Angels (WIP)</router-link></li>
        <li class="faction-item"><router-link to="/40k/chaos-daemons">Chaos Daemons (WIP)</router-link></li>
        <li class="faction-item"><router-link to="/40k/chaos-knights">Chaos Knights (WIP)</router-link></li>
        <li class="faction-item"><router-link to="/40k/chaos-space-marines">Chaos Space Marines (WIP)</router-link></li>
        <li class="faction-item"><router-link to="/40k/dark-angels">Dark Angels (WIP)</router-link></li>
        <li class="faction-item"><router-link to="/40k/death-guard">Death Guard (WIP)</router-link></li>
        <li class="faction-item"><router-link to="/40k/deathwatch">Deathwatch (WIP)</router-link></li>
        <li class="faction-item"><router-link to="/40k/drukhari">Drukhari (WIP)</router-link></li>
        <li class="faction-item"><router-link to="/40k/genestealer-cults">Genestealer Cults (WIP)</router-link></li>
        <li class="faction-item"><router-link to="/40k/grey-knights">Grey Knights (WIP)</router-link></li>
        <li class="faction-item"><router-link to="/40k/imperial-knights">Imperial Knights (WIP)</router-link></li>
        <li class="faction-item"><router-link to="/40k/leagues-votann">Leagues of Votann</router-link></li>
        <li class="faction-item"><router-link to="/40k/necrons">Necrons (WIP)</router-link></li>
        <li class="faction-item"><router-link to="/40k/orks">Orks (WIP)</router-link></li>
        <li class="faction-item"><router-link to="/40k/space-wolves">Space Wolves (WIP)</router-link></li>
        <li class="faction-item"><router-link to="/40k/tau-empire">T'au Empire</router-link></li>
        <li class="faction-item"><router-link to="/40k/thousand-sons">Thousand Sons (WIP)</router-link></li>
        <li class="faction-item"><router-link to="/40k/tyranids">Tyranids</router-link></li>
        <li class="faction-item"><router-link to="/40k/world-eaters">World Eaters (WIP)</router-link></li>
        <!-- <li><router-link to=""></router-link></li> -->
      </ul>
    </section>
    <PageFooter />
  </article>
</template>

<script setup>
import SiteHeader from '@/components/SiteHeader.vue'
import PageFooter from '@/components/PageFooter.vue'

// TODO: facciones favoritas y ordenarlas
</script>

<style scoped>
.home-title {
  font-size: 30px;
  line-height: 40px;
}

.faction-list {
  display: flex;
  flex-flow: column;
  font-size: 30px;
  line-height: 40px;
  margin-top: 20px;
  gap: 1rem;
}

.faction-item {
  background: linear-gradient(var(--medium-blue), var(--dark-turquoise-gradient));
  border: 1px dotted var(--border-color);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
}

.faction-item:hover,
.faction-item:focus,
.faction-item:active {
  text-decoration: underline;
  text-decoration-color: var(--brand-color-light);
  text-decoration-style: dotted;
}

/*
@media (width >= 768px) {
  h1 {
    font-size: 30px;
  }
} */
</style>
