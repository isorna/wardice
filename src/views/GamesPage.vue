<template>
  <article class="page">
    <site-header path="/" :title="i18n.GAMES_TITLE" />
    <section>
      <h2>{{ i18n.GAMES_P1 }}</h2>
      <ul class="games-list">
        <li>
          <strong><router-link to="/40k">Warhammer 40.000 10th edition</router-link></strong>
          &nbsp;property of <a href="https://www.games-workshop.com" target="_blank">&copy; Games Workshop Ltd.</a>
        </li>
      </ul>
    </section>
    <PageFooter />
  </article>
</template>

<script setup>
import SiteHeader from '@/components/SiteHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import i18nApp from '@/i18n/en.i18n.json'

const i18n = {
  ...i18nApp
}
</script>

<style scoped>
.games-list {
  margin-top: 20px;
  font-size: 20px;
  line-height: 40px;
}

.games-list li {
  list-style-type: square;
}
</style>
