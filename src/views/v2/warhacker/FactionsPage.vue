<template>
  <div class="v2-warhacker-factions">
    <!-- Header Section -->
    <section class="v2-factions-header">
      <div class="v2-header-accent-row">
        <div class="v2-accent-bar"></div>
        <span class="font-label v2-header-status">System Status: Ready</span>
      </div>
      <h1 class="font-headline v2-factions-title">SELECT_FACTION</h1>
      <p class="font-body v2-factions-desc">Initialize neural link with desired legion. Strategic protocols will be calibrated based on origin.</p>
    </section>

    <!-- Faction Scroll List -->
    <div class="v2-factions-list">
      <article v-for="faction in factions" :key="faction.name" class="v2-faction-article">
        <div class="v2-faction-marker"></div>
        <div class="v2-faction-card-v2 glass-panel">
          <div class="v2-faction-hero">
            <img class="v2-faction-img grayscale-luminosity" :src="faction.image" :alt="faction.name"/>
            <div class="v2-faction-gradient"></div>
            <div class="v2-faction-origin">
              ORIGIN: {{ faction.origin }}
            </div>
          </div>
          <div class="v2-faction-details">
            <div class="v2-faction-name-row">
              <h2 class="font-headline v2-faction-name-title">{{ faction.name }}</h2>
              <span class="material-symbols-outlined v2-faction-icon-v2">{{ faction.icon }}</span>
            </div>
            <p class="font-body v2-faction-bio">{{ faction.description }}</p>
            <button class="v2-button v2-button-primary v2-faction-btn-v2">
              <span>Initialize Command</span>
              <span class="material-symbols-outlined v2-terminal-icon">terminal</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
const factions = [
  { name: 'CRYX', icon: 'skull', origin: 'NIGHTMARE_EMPIRE', description: 'Master the necrotic arts. The Dragon Father\'s legions rise from the black waters to consume the mainland. High speed, high casualties, absolute victory.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfRRXuT8MusHklEpUoXZoNMMFwhvlaZfZwx9bmNzeia9Lg5i3G0dCCHI7SqOHS8_N9Rzo9jSG0sJSz5dzRZkd8d2cpJU5X3yrNXmPXkFQa0x9nzn8Ez5WVLZPu0fr_keU55lJI9bDDGk03lGNCo4QY-cphjilsxPQt4ZMLZd46DpbqQgfnCtNg1c7r4xj8Gtm9g-HvSFLGN89-R12pWkSHQSzbZtBCIeXI8351jvzroTd7oLo9ann8OL_24DD3eYzj8ONPOKAhUiax' },
  { name: 'CYGNAR', icon: 'bolt', origin: 'CASPIA', description: 'The pinnacle of arcane science. Control the battlefield with precision firepower and storm-powered warjacks. Strike with the speed of lightning.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWny6bm3R-zR9Ab2MzolTJjeMO-sLa6ZjRyjDwesSi8SqExrWw_N0ptI-4rzG8D0NnltKMNTOu9M5HZsouJ7NvRiiv2gx10QK3tnv23iLv0u1c5PArdSU9cGzhe-YSA99JdWHt_1kipy_K_HC4iDcJieJkQvqwo6C0knby5rVs_g9jXIo37SNL_N_qM6XUyx8A6D4yNwQmyYmK7OZC03KGWoMhHv3e-iYHWWeCegMmcApdFQ4QZcOt0s8Aw8faHNoOQFqZGYB3Bhx0' },
  { name: 'KHADOR', icon: 'shield', origin: 'KORSK', description: 'Unbreakable resolve. Field massive, heavy-plated steamjacks and iron-willed infantry. Weather any storm and crush opposition under heavy treads.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzBY3NtbZRzavcb-KiACa1ShXHzrLQgPI9_Z1CKlVS0fr9rcWa-YTi_DBG6A7hqDnZ73I2lhveAIpokZ8msaMWqbB2AAFvdF8CqbiVPpORcZ5Cv1ml2xZtkP1ZPVgirMQeoWPTROAn6Zij71Fdt1LN4M1Jwnn3dqW0cg009f5Aym1uhTodO5qacH9TuOFo9l6gyFz8ANicqmEotmZm5OuTIp2E67LPnLBKV3EtRdH14KPr2_7eaLCZ-CVngKVjlVdHbTJ0tLM9oCZY' }
]
</script>

<style scoped>
.v2-warhacker-factions { padding: 24px 16px; min-height: 100vh; }

.v2-factions-header { margin-bottom: 32px; }

.v2-header-accent-row { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.v2-accent-bar { height: 4px; width: 32px; background-color: var(--v2-primary); }
.v2-header-status { font-size: 12px; letter-spacing: 0.1em; color: var(--v2-primary); text-transform: uppercase; }

.v2-factions-title { font-size: 30px; font-weight: 700; letter-spacing: -0.025em; color: var(--v2-on-surface); }

.v2-factions-desc { font-size: 14px; color: var(--v2-on-surface-variant); max-width: 320px; margin-top: 8px; line-height: 1.5; }

.v2-factions-list { display: flex; flex-direction: column; gap: 32px; padding-bottom: 48px; }

.v2-faction-article { position: relative; border-left: 2px solid rgba(79, 215, 240, 0.3); }

.v2-faction-marker { position: absolute; left: -2px; top: 0; height: 32px; width: 2px; background-color: var(--v2-primary); }

.v2-faction-card-v2 { background-color: var(--v2-surface-container-low); overflow: hidden; }

.v2-faction-hero { height: 192px; width: 100%; position: relative; }

.v2-faction-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.6; }
.grayscale-luminosity { filter: grayscale(1); }

.v2-faction-gradient { position: absolute; inset: 0; background: linear-gradient(to top, var(--v2-surface-container-low), transparent); }

.v2-faction-origin {
  position: absolute; top: 16px; right: 16px; background-color: var(--v2-primary-container); color: var(--v2-on-primary-container);
  padding: 4px 12px; font-family: var(--v2-font-label); font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
}

.v2-faction-details { padding: 20px; position: relative; }

.v2-faction-name-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }

.v2-faction-name-title { font-size: 24px; font-weight: 800; letter-spacing: 0.1em; color: var(--v2-primary); }

.v2-faction-icon-v2 { color: rgba(79, 215, 240, 0.5); }

.v2-faction-bio { font-size: 14px; color: var(--v2-on-surface-variant); line-height: 1.625; margin-bottom: 24px; }

.v2-faction-btn-v2 { width: 100%; padding: 16px; gap: 8px; font-size: 14px; }

.v2-terminal-icon { font-size: 14px; }
</style>
