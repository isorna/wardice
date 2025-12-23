<template>
  <article class="page">
    <site-header path="/games" :title="pageTitle" @show-help="tour.resetTour()" />
		<section class="links-section">
			<h1 class="section-title">Content</h1>
			<ul class="links-list">
				<li class="link-list__item">
					<router-link to="/warmachine/rules">MK4 Rules</router-link>
				</li>
				<li class="link-list__item">
					<router-link to="/warmachine/steamroller">Steamroller 2025 Rules</router-link>
				</li>
				<li class="link-list__item">
					<router-link to="/warmachine/brawlmachine">Brawlmachine 2025 Rules</router-link>
				</li>
			</ul>
      <h2 class="section-title__secondary">Custom Scenarios</h2>
      <ol class="links-list">
        <li class="link-list__item">
          <router-link
            :to="'/warmachine/scenario/king-of-the-hill'">King of the Hill (3 players)</router-link>
        </li>
      </ol>
      <h2 class="section-title__secondary">Tools</h2>
			<ul class="links-list">
				<li class="link-list__item">
					<router-link to="/warmachine/army-builder">Army Builder</router-link>
				</li>
			</ul>
		</section>
    <VTour ref="tour" :steps="steps" :buttonLabels="tourButtonLabels" autoStart highlight />
    <PageFooter />
  </article>
</template>

<script setup>
import SiteHeader from '@/components/SiteHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import { computed, ref } from 'vue'
import i18nApp from '@/i18n/en.i18n.json'
import i18nGame from '@/i18n/warmachine/en.i18n.json'

const i18n = {
  ...i18nApp,
  ...i18nGame
}
const pageTitle = computed(() => `${i18n.GAME_TITLE} ${i18n.GAME_EDITION}`)
const tour = ref(null)
const tourButtonLabels = computed(() => {
  return {
    next: i18n.NEXT,
    prev: i18n.BACK,
    finish: i18n.FINISH,
    skip: i18n.SKIP
  }
})
const steps = computed(() => {
  return [
    {
      target: '[data-step="1"]',
      content: i18n.HELP_HOME_STEP_1,
      placement: 'bottom'
    },
    {
      target: '[data-step="2"]',
      content: i18n.HELP_HOME_STEP_2,
      placement: 'left'
    }
  ]
})
</script>

<style scoped>

</style>
