<template>
  <div class="v2-game-page">
    <!-- Scenario Map Header -->
    <section class="glass-panel v2-game-scenario-header">
      <div class="map-overlay-layer"></div>
      <div class="v2-game-header-top">
        <div class="v2-mini-map-box">
          <!-- Trench Warfare Tactical Map Mock -->
          <div class="v2-map-grid-overlay">
            <div class="v2-map-crosshair">
              <div class="v2-crosshair-h"></div>
              <div class="v2-crosshair-v"></div>
            </div>
          </div>
          <!-- Zones and Objectives -->
          <div class="v2-map-objectives">
            <div class="v2-map-zone zone-a animate-pulse">
              <span class="font-label v2-zone-label">ZONE A</span>
            </div>
            <div class="v2-map-zone zone-b">
              <span class="font-label v2-zone-label secondary">ZONE B</span>
            </div>
          </div>
        </div>
        <div class="v2-scenario-info">
          <h2 class="font-headline v2-scenario-title">SCENARIO: TRENCH WARFARE</h2>
          <p class="font-label v2-scenario-meta">Theater: Sector-9 / Grid 52.22N 21.01E</p>
          <div class="scenario-stats-grid">
            <div v-for="item in scenarioStatus" :key="item.label" class="v2-status-item-v2" :style="{ borderLeftColor: item.borderColorValue }">
              <div class="v2-status-label">{{ item.label }}</div>
              <div class="font-headline v2-status-value" :style="{ color: item.textColorValue }">{{ item.status }}</div>
            </div>
          </div>
        </div>
        <!-- Collapsed Log -->
        <div class="hidden-xl-down v2-combat-log glass-panel">
          <div class="v2-log-header">
            <span class="material-symbols-outlined v2-log-icon">history</span>
            <span class="font-headline v2-log-title">Combat Feed</span>
          </div>
          <div class="v2-log-entries">
            <p v-for="log in logs" :key="log.msg" class="v2-log-entry">
              <span class="v2-log-tag" :style="{ color: log.tagColor }">{{ log.tag }}:</span> {{ log.msg }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Two Player Main View -->
    <div class="v2-game-grid">
      <!-- Player 1 -->
      <div class="v2-player-column">
        <div class="v2-player-header border-primary">
          <div class="v2-player-identity">
            <span class="v2-player-number bg-primary-soft">1</span>
            <h2 class="font-headline v2-player-name text-primary">VANGUARD-79</h2>
          </div>
          <span class="font-label v2-player-commander text-primary-dim">Commander: Stryker</span>
        </div>
        <div class="glass-panel v2-warcaster-card border-primary-dim">
          <div class="v2-warcaster-row">
            <div class="v2-warcaster-portrait border-primary-dim">
              <img alt="Stryker" class="v2-img-grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfOv-9meJyEcO6-vQurAPPQxLRBzy2PsquiUUVoeolqIJcO4vm1BJsnXHC5PoischVlXHDm0pclD3Xe4RXomexU7Pml_UHysP0B2JjFbtXr3tYengsur5nUwBf4oUeCMZhyENwoo8-gRm34pEYOxpZFbi9_gUMwfpyM7ZNjIU_eqcrfV-Vail8txljEaGMjKJC0gn1KS3iWURpMRjBwtidkGFA6sqR1tyFGP4bBnCz8egg2xng7GRCk6VjRz5agvhT01L6AzAKvAtY"/>
            </div>
            <div class="v2-warcaster-info">
              <div class="v2-warcaster-header">
                <h3 class="font-headline v2-warcaster-name">Major Stryker</h3>
                <span class="font-label v2-warcaster-status status-active">Active</span>
              </div>
              <div class="v2-game-stats-row">
                <div class="v2-game-stat-box"><div class="stat-label-mini">FOC</div><div class="stat-val-mini text-tertiary">6/6</div></div>
                <div class="v2-game-stat-box"><div class="stat-label-mini">DEF</div><div class="stat-val-mini">16</div></div>
                <div class="v2-game-stat-box"><div class="stat-label-mini">ARM</div><div class="stat-val-mini">18</div></div>
              </div>
              <div class="v2-health-bar-container">
                <div class="v2-health-bar bg-primary" :style="{ width: '85%' }"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="v2-jacks-row">
          <div class="glass-panel v2-jack-mini-card border-primary-dim-soft">
            <div class="v2-jack-mini-header">
              <span class="font-headline v2-jack-mini-name">Ironclad</span>
              <span class="v2-jack-mini-type">Heavy</span>
            </div>
            <div class="v2-damage-grid-mini">
              <div v-for="n in 18" :key="n" class="v2-grid-cell" :class="{ filled: n <= 10, damaged: n === 11 }"></div>
            </div>
          </div>
          <div class="glass-panel v2-jack-mini-card border-primary-dim-soft">
            <div class="v2-jack-mini-header">
              <span class="font-headline v2-jack-mini-name">Charger</span>
              <span class="v2-jack-mini-type">Light</span>
            </div>
            <div class="v2-damage-grid-mini grid-4">
              <div v-for="n in 8" :key="n" class="v2-grid-cell" :class="{ filled: n <= 7 }"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Player 2 -->
      <div class="v2-player-column">
        <div class="v2-player-header border-secondary">
          <div class="v2-player-identity">
            <span class="v2-player-number bg-secondary-soft">2</span>
            <h2 class="font-headline v2-player-name text-secondary">IRON-CLAW</h2>
          </div>
          <span class="font-label v2-player-commander text-secondary-dim">Commander: Sorscha</span>
        </div>
        <div class="glass-panel v2-warcaster-card border-secondary-dim">
          <div class="v2-warcaster-row">
            <div class="v2-warcaster-portrait border-secondary-dim">
              <img alt="Sorscha" class="v2-img-grayscale-bright" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD79THejQ89wmAbJovEUjopNGKXrdx2tIA_FbsTGZWOngJ1NnlZEjR2jDEKmjBihjBCkQI3OZu2VG969ZlaILWbiODnYlC9VLLDZ_iAdGoTCisCeGgWlyNkn9GdPH5Yr5qg4EpsEzGPnAlJfJ_9nKDYvVvkG3x7mJSl7buGHmYeTE6PazES6O4TpdeXbOiBez_gIFy2XPaUAgTTaeUW1sjSlwmG3CgbzPnqd4IKNQvnX3FVLyPXhweuYFCPrgCBoOQXHMBpoA1s5Z-3"/>
            </div>
            <div class="v2-warcaster-info">
              <div class="v2-warcaster-header">
                <h3 class="font-headline v2-warcaster-name">Forward Kommander Sorscha</h3>
                <span class="font-label v2-warcaster-status status-standby">Standby</span>
              </div>
              <div class="v2-game-stats-row">
                <div class="v2-game-stat-box"><div class="stat-label-mini">FOC</div><div class="stat-val-mini text-secondary">4/6</div></div>
                <div class="v2-game-stat-box"><div class="stat-label-mini">DEF</div><div class="stat-val-mini">15</div></div>
                <div class="v2-game-stat-box"><div class="stat-label-mini">ARM</div><div class="stat-val-mini">17</div></div>
              </div>
              <div class="v2-health-bar-container">
                <div class="v2-health-bar bg-secondary" :style="{ width: '100%' }"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="v2-jacks-row">
          <div class="glass-panel v2-jack-mini-card border-secondary-dim-soft">
            <div class="v2-jack-mini-header">
              <span class="font-headline v2-jack-mini-name">Juggernaut</span>
              <span class="v2-jack-mini-type">Heavy</span>
            </div>
            <div class="v2-damage-grid-mini">
              <div v-for="n in 18" :key="n" class="v2-grid-cell filled opponent-filled"></div>
            </div>
          </div>
          <div class="glass-panel v2-jack-mini-card border-secondary-dim-soft opacity-50">
            <div class="v2-jack-mini-header">
              <span class="font-headline v2-jack-mini-name text-error">Destroyer</span>
              <span class="v2-jack-mini-type text-error">Destroyed</span>
            </div>
            <div class="v2-damage-grid-mini opacity-30">
              <div v-for="n in 6" :key="n" class="v2-grid-cell damaged"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const scenarioStatus = [
  { label: 'Zone A', status: 'Contested', borderColorValue: '#4fd7f0', textColorValue: '#4fd7f0' },
  { label: 'Zone B', status: 'Enemy Controlled', borderColorValue: '#ffb68b', textColorValue: '#ffb68b' },
  { label: 'Objective 1', status: 'Secured', borderColorValue: '#00daf3', textColorValue: '#00daf3' },
  { label: 'Objective 2', status: 'Destroyed', borderColorValue: '#ffb4ab', textColorValue: '#ffb4ab' }
]

const logs = [
  { tag: 'V-79', msg: 'Stryker cast Arcane Shield.', tagColor: '#4fd7f0' },
  { tag: 'I-CLAW', msg: 'Ironclad sustains 4 DMG.', tagColor: '#ffb68b' },
  { tag: 'ALERT', msg: 'Objective 2 down.', tagColor: '#ffb4ab' }
]
</script>

<style scoped>
.v2-game-page {
  padding-bottom: 48px;
}

.v2-game-scenario-header {
  margin-bottom: 32px;
  border: 1px solid rgba(134, 147, 150, 0.2);
  padding: 16px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.v2-game-header-top {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
}

@media (min-width: 768px) {
  .v2-game-header-top {
    flex-direction: row;
  }
}

.v2-mini-map-box {
  flex-shrink: 0;
  width: 256px;
  height: 160px;
  background-color: var(--v2-surface-container-lowest);
  border: 1px solid rgba(79, 215, 240, 0.3);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v2-map-grid-overlay {
  position: absolute;
  inset: 0;
  opacity: 0.2;
  border: 1px solid rgba(79, 215, 240, 0.1);
}

.v2-map-crosshair {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v2-crosshair-h { width: 100%; height: 1px; background-color: rgba(79, 215, 240, 0.2); }
.v2-crosshair-v { height: 100%; width: 1px; background-color: rgba(79, 215, 240, 0.2); }

.v2-map-objectives {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 8px;
  box-sizing: border-box;
}

.v2-map-zone {
  grid-row-start: 2;
  width: 48px;
  height: 48px;
  border: 2px dashed rgba(79, 215, 240, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zone-a { grid-column-start: 2; border-color: rgba(79, 215, 240, 0.6); }
.zone-b { grid-column-start: 3; border-color: rgba(255, 182, 139, 0.6); }

.v2-zone-label { font-size: 6px; color: var(--v2-primary); }
.v2-zone-label.secondary { color: var(--v2-secondary); }

.v2-scenario-info {
  flex-grow: 1;
}

.v2-scenario-title {
  font-size: 20px;
  font-weight: 900;
  color: var(--v2-primary);
  letter-spacing: -0.05em;
  margin-bottom: 4px;
  text-transform: uppercase;
  font-style: italic;
}

.v2-scenario-meta {
  font-size: 10px;
  color: var(--v2-outline);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 16px;
}

.scenario-stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (min-width: 768px) {
  .scenario-stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.v2-status-item-v2 {
  background-color: var(--v2-surface-container-high);
  padding: 8px;
  border-left-width: 2px;
  border-left-style: solid;
}

.v2-status-label { font-size: 8px; color: var(--v2-outline); text-transform: uppercase; }
.v2-status-value { font-size: 12px; font-weight: 700; text-transform: uppercase; }

.v2-combat-log {
  width: 256px;
  border: 1px solid rgba(60, 73, 76, 0.3);
  padding: 12px;
  height: 160px;
  overflow-y: auto;
  box-sizing: border-box;
}

@media (max-width: 1279px) {
  .hidden-xl-down { display: none !important; }
}

.v2-log-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(60, 73, 76, 0.3);
}

.v2-log-icon { color: var(--v2-primary); font-size: 14px; }
.v2-log-title { font-size: 9px; font-weight: 700; color: var(--v2-on-surface); text-transform: uppercase; letter-spacing: 0.1em; }

.v2-log-entries { display: flex; flex-direction: column; gap: 8px; }
.v2-log-entry { font-size: 9px; color: var(--v2-on-surface-variant); line-height: 1.2; }
.v2-log-tag { font-weight: 700; }

.v2-game-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

@media (min-width: 1024px) {
  .v2-game-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.v2-player-column { display: flex; flex-direction: column; gap: 24px; }

.v2-player-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  padding-bottom: 8px;
}

.v2-player-header.border-primary { border-bottom-color: var(--v2-primary); }
.v2-player-header.border-secondary { border-bottom-color: var(--v2-secondary); }

.v2-player-identity { display: flex; align-items: center; gap: 12px; }

.v2-player-number {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid currentColor;
  font-weight: 900;
}

.bg-primary-soft { background-color: rgba(79, 215, 240, 0.2); border-color: var(--v2-primary); color: var(--v2-primary); }
.bg-secondary-soft { background-color: rgba(255, 182, 139, 0.2); border-color: var(--v2-secondary); color: var(--v2-secondary); }

.v2-player-name {
  font-size: 20px;
  font-weight: 900;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  font-style: italic;
}

.text-primary { color: var(--v2-primary); }
.text-secondary { color: var(--v2-secondary); }

.v2-player-commander { font-size: 10px; text-transform: uppercase; }
.text-primary-dim { color: rgba(79, 215, 240, 0.6); }
.text-secondary-dim { color: rgba(255, 182, 139, 0.6); }

.v2-warcaster-card {
  padding: 16px;
  border-top-width: 1px;
  border-top-style: solid;
}

.border-primary-dim { border-top-color: rgba(79, 215, 240, 0.3); }
.border-secondary-dim { border-top-color: rgba(255, 182, 139, 0.3); }

.v2-warcaster-row { display: flex; gap: 16px; }

.v2-warcaster-portrait {
  width: 64px;
  height: 64px;
  background-color: var(--v2-surface-container-high);
  border-width: 1px;
  border-style: solid;
}

.v2-warcaster-portrait.border-primary-dim { border-color: rgba(79, 215, 240, 0.3); }
.v2-warcaster-portrait.border-secondary-dim { border-color: rgba(255, 182, 139, 0.3); }

.v2-img-grayscale { width: 100%; height: 100%; object-fit: cover; filter: grayscale(1); }
.v2-img-grayscale-bright { width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) brightness(1.25); }

.v2-warcaster-info { flex-grow: 1; }

.v2-warcaster-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px; }

.v2-warcaster-name { font-weight: 700; color: var(--v2-on-surface); text-transform: uppercase; font-size: 14px; }

.v2-warcaster-status { font-size: 8px; padding: 0 4px; border-width: 1px; border-style: solid; text-transform: uppercase; }
.status-active { color: var(--v2-tertiary); border-color: rgba(0, 218, 243, 0.3); }
.status-standby { color: var(--v2-outline); border-color: rgba(134, 147, 150, 0.3); }

.v2-game-stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; margin-bottom: 8px; }

.v2-game-stat-box {
  background-color: var(--v2-surface-container-lowest);
  padding: 4px 8px;
  box-sizing: border-box;
}

.stat-label-mini { font-size: 7px; color: var(--v2-outline); text-transform: uppercase; }
.stat-val-mini { font-size: 10px; font-weight: 700; color: white; }
.text-tertiary { color: var(--v2-tertiary) !important; }

.v2-health-bar-container { width: 100%; height: 4px; background-color: var(--v2-surface-container-highest); }
.v2-health-bar { height: 100%; }
.bg-primary { background-color: var(--v2-primary); }
.bg-secondary { background-color: var(--v2-secondary); }

.v2-jacks-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .v2-jacks-row {
    grid-template-columns: 1fr 1fr;
  }
}

.v2-jack-mini-card {
  padding: 16px;
  border-top-width: 1px;
  border-top-style: solid;
}

.border-primary-dim-soft { border-top-color: rgba(79, 215, 240, 0.2); }
.border-secondary-dim-soft { border-top-color: rgba(255, 182, 139, 0.2); }

.v2-jack-mini-header { display: flex; justify-content: space-between; margin-bottom: 8px; }

.v2-jack-mini-name { font-size: 10px; font-weight: 700; color: var(--v2-on-surface); text-transform: uppercase; }
.v2-jack-mini-type { font-size: 8px; color: var(--v2-outline); text-transform: uppercase; }

.v2-damage-grid-mini {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2px;
  border: 1px solid rgba(60, 73, 76, 0.3);
  padding: 4px;
  background-color: var(--v2-surface-container-lowest);
}

.grid-4 { grid-template-columns: repeat(4, 1fr); }

.text-error { color: var(--v2-error) !important; }
.opacity-50 { opacity: 0.5; }
.opacity-30 { opacity: 0.3; }
</style>
