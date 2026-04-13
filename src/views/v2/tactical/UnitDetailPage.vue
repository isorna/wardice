<template>
  <div class="v2-unit-detail-page">
    <!-- Unit Header Header Section -->
    <header class="v2-unit-header">
      <div class="scanline v2-header-scanline"></div>
      <div>
        <div class="v2-badge-row">
          <span class="v2-badge-v2 badge-primary">Heavy Warjack</span>
          <span class="v2-badge-v2 badge-secondary">Class 03</span>
        </div>
        <h1 class="font-headline v2-unit-title">Slayer Warjack</h1>
        <p class="font-headline v2-unit-subtitle">Cryx Faction // Dragon-Lich Chassis</p>
      </div>
      <div class="v2-pts-col">
        <div class="v2-pts-box-v2">
          <div class="pts-box-corner"></div>
          <span class="font-headline pts-box-label">Points</span>
          <span class="font-headline pts-box-value">10</span>
        </div>
      </div>
    </header>

    <!-- Tactical Grid Layout -->
    <div class="v2-detail-grid">
      <!-- Left Column: Unit Portrait & Bio -->
      <div class="v2-detail-col-left">
        <div class="v2-portrait-container-v2">
          <img class="v2-portrait-img-v2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQHa5dX_1BdRqDoc1EvRjR-C5yy1CSEn-ySNuR_ajHfLxUjbAegYWn9rhIHdRR05lcJiqEJ6aWa7_uc6aaWNQ9mFd8autkuZkKF_LTibc7VNhIRJO3N2Dj0ZgfyGpp6bdhf_T8cECH6Rt6DVFxrIlBNuEknYuvPz0mqOE_2e6lt-ZmLkYpbV8l04hEG5-OUFxh0G58BHXfLJIxz0zrdmQvElvx1oR7e_jQGHEzD0qA9OOglUl2lKKr5nw92yFr1QtICmmvt69hioe_"/>
          <div class="portrait-overlay"></div>
          <div class="portrait-bio">
            <div class="bio-accent-bars">
              <div class="bar-full"></div>
              <div class="bar-mid"></div>
              <div class="bar-small"></div>
            </div>
            <p class="font-body bio-text">
              Built for pure destruction, the Slayer is the apex of necro-mechanika. Its twin tusks and hydraulic talons are designed to shred iron and bone with equal ease.
            </p>
          </div>
        </div>
        <!-- Keywords Chip Cloud -->
        <div class="v2-keywords-row">
          <div v-for="keyword in keywords" :key="keyword" class="v2-keyword-chip">{{ keyword }}</div>
        </div>
      </div>

      <!-- Right Column: Stats & Data -->
      <div class="v2-detail-col-right">
        <!-- Stats Readout - HUD Style -->
        <section class="v2-stats-hud">
          <div class="scanline hud-scanline-inner"></div>
          <div class="hud-header">
            <span class="material-symbols-outlined hud-icon">analytics</span>
            <h2 class="font-headline hud-title">Core Performance Metrics</h2>
          </div>
          <div class="v2-stats-row">
            <div v-for="(val, stat) in stats" :key="stat" class="v2-stat-item">
              <div class="v2-stat-box-inner">
                <div class="stat-glow"></div>
                <span class="font-headline v2-stat-val">{{ val }}</span>
              </div>
              <span class="font-headline v2-stat-label">{{ stat }}</span>
            </div>
          </div>
        </section>

        <!-- Armament & Systems -->
        <section class="v2-weapon-section">
          <div class="weapon-section-header">
            <h2 class="font-headline weapon-section-title">Weapon Systems</h2>
            <div class="weapon-section-accents">
              <div class="accent-dot"></div>
              <div class="accent-dot"></div>
              <div class="accent-dot dim"></div>
            </div>
          </div>
          <div v-for="weapon in weapons" :key="weapon.name" class="v2-weapon-card-v2">
            <div class="weapon-card-info">
              <div class="font-headline weapon-type-label">{{ weapon.type }}</div>
              <h3 class="font-headline weapon-name-v2">{{ weapon.name }}</h3>
            </div>
            <div class="weapon-card-stats">
              <div v-for="(val, label) in weapon.stats" :key="label" :class="{ 'text-primary': label === 'P+S' }">
                <div class="font-headline weapon-stat-label">{{ label }}</div>
                <div class="font-headline weapon-stat-value">{{ val }}</div>
              </div>
            </div>
            <div v-if="weapon.note" class="weapon-note-badge">{{ weapon.note }}</div>
          </div>
        </section>

        <!-- Special Rules -->
        <section class="v2-rules-section">
          <h2 class="font-headline rules-section-title">Combat Directives</h2>
          <div class="v2-rules-grid">
            <div v-for="rule in specialRules" :key="rule.name" class="v2-rule-box-v2" :style="{ borderTopColor: rule.borderColorValue }">
              <h4 class="font-headline rule-title-v2" :style="{ color: rule.textColorValue }">{{ rule.name }}</h4>
              <p class="rule-desc-v2">{{ rule.description }}</p>
            </div>
          </div>
        </section>

        <!-- Damage Grid Visualization -->
        <section class="v2-damage-section">
          <div class="damage-section-header">
            <h2 class="font-headline damage-section-title">Damage Tracking Overlay</h2>
            <div class="font-headline damage-legend">
              <span class="legend-item"><span class="dot-ok"></span> OK</span>
              <span class="legend-item"><span class="dot-crit"></span> CRIT</span>
            </div>
          </div>
          <div class="v2-damage-grid-v2">
            <div v-for="(cell, i) in damageGrid" :key="i"
              class="damage-cell-v2"
              :class="[
                cell.type === 'empty' ? 'cell-empty' : cell.type === 'crit' ? 'cell-crit' : 'cell-ok',
                cell.filled ? 'cell-filled' : ''
              ]">
              {{ cell.label }}
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
const keywords = ['Construct', 'Pathfinder', 'Abomination', 'Soul Taker']
const stats = { SPD: 6, STR: 10, MAT: 6, RAT: 3, DEF: 17, ARM: 17 }
const weapons = [
  { type: 'Melee Weapon', name: 'Death Claw (L)', stats: { RNG: '2"', POW: 6, 'P+S': 16 }, note: 'Open Fist' },
  { type: 'Melee Weapon', name: 'Death Claw (R)', stats: { RNG: '2"', POW: 6, 'P+S': 16 } }
]
const specialRules = [
  { name: 'Combo Strike', description: 'During its activation, this model can make one melee attack with both Death Claws. The POW is equal to the STR of this model plus twice the POW of the weapons.', borderColorValue: '#ffb68b', textColorValue: '#ffb68b' },
  { name: 'Sustained Attack', description: 'During its activation, this model can spend 1 focus point to automatically hit with all subsequent attacks against the same target.', borderColorValue: '#4fd7f0', textColorValue: '#4fd7f0' }
]

const damageGrid = [
  { label: 'L', type: 'ok' }, { label: '', type: 'ok' }, { label: '', type: 'ok' }, { label: '', type: 'ok' }, { label: '', type: 'ok' }, { label: 'R', type: 'ok' },
  { label: '', type: 'ok' }, { label: '', type: 'ok' }, { label: 'M', type: 'crit' }, { label: 'M', type: 'crit' }, { label: '', type: 'ok' }, { label: '', type: 'ok' },
  { label: '', type: 'ok' }, { label: 'C', type: 'crit' }, { label: '', type: 'empty' }, { label: '', type: 'empty' }, { label: 'C', type: 'crit' }, { label: '', type: 'ok' },
  { label: '', type: 'ok' }, { label: '', type: 'empty' }, { label: '', type: 'empty' }, { label: '', type: 'empty' }, { label: '', type: 'empty' }, { label: '', type: 'ok' }
]
</script>

<style scoped>
.v2-unit-detail-page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px;
}

.v2-unit-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 48px;
  position: relative;
  overflow: hidden;
  padding: 32px;
  border-left: 4px solid var(--v2-primary);
  background: linear-gradient(to right, var(--v2-surface-container-high), transparent);
}

.v2-header-scanline {
  position: absolute;
  inset: 0;
  opacity: 0.1;
}

@media (min-width: 768px) {
  .v2-unit-header {
    flex-direction: row;
    align-items: flex-end;
  }
}

.v2-badge-row {
  display: flex;
  align-items: center; gap: 12px; margin-bottom: 8px;
}

.v2-badge-v2 {
  padding: 4px 12px;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-width: 1px;
  border-style: solid;
}

.badge-primary { background-color: rgba(79, 215, 240, 0.1); color: var(--v2-primary); border-color: rgba(79, 215, 240, 0.2); }
.badge-secondary { background-color: rgba(255, 182, 139, 0.1); color: var(--v2-secondary); border-color: rgba(255, 182, 139, 0.2); }

.v2-unit-title {
  font-size: 48px;
  font-weight: 900;
  color: var(--v2-on-surface);
  letter-spacing: -0.05em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.v2-unit-subtitle {
  color: rgba(79, 215, 240, 0.6);
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: 14px;
}

.v2-pts-col {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.v2-pts-box-v2 {
  background-color: var(--v2-primary-container);
  color: var(--v2-on-primary-container);
  padding: 24px;
  width: 96px;
  height: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
}

.pts-box-corner {
  position: absolute;
  top: -4px;
  left: -4px;
  width: 12px;
  height: 12px;
  border-top: 2px solid var(--v2-primary);
  border-left: 2px solid var(--v2-primary);
}

.pts-box-label {
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  opacity: 0.7;
}

.pts-box-value {
  font-size: 36px;
  font-weight: 900;
  font-style: italic;
  line-height: 1;
}

.v2-detail-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

@media (min-width: 1024px) {
  .v2-detail-grid {
    grid-template-columns: repeat(12, 1fr);
  }
  .v2-detail-col-left { grid-column: span 5; }
  .v2-detail-col-right { grid-column: span 7; }
}

.v2-portrait-container-v2 {
  position: relative;
  aspect-ratio: 4/5;
  background-color: var(--v2-surface-container-low);
  overflow: hidden;
}

.v2-portrait-img-v2 {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) brightness(0.75);
  transition: all 0.7s ease;
  opacity: 0.8;
}

.v2-portrait-container-v2:hover .v2-portrait-img-v2 {
  filter: grayscale(0);
  transform: scale(1.05);
}

.portrait-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--v2-surface), transparent, transparent);
}

.portrait-bio {
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
}

.bio-accent-bars {
  display: flex;
  gap: 4px;
  margin-bottom: 16px;
}

.bar-full { height: 4px; width: 32px; background-color: var(--v2-primary); }
.bar-mid { height: 4px; width: 16px; background-color: rgba(79, 215, 240, 0.3); }
.bar-small { height: 4px; width: 8px; background-color: rgba(79, 215, 240, 0.3); }

.bio-text {
  font-size: 14px;
  color: var(--v2-on-surface-variant);
  font-style: italic;
  line-height: 1.625;
}

.v2-keywords-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
}

.v2-keyword-chip {
  background-color: var(--v2-surface-container-highest);
  padding: 8px 16px;
  font-family: var(--v2-font-headline);
  font-size: 10px;
  font-weight: 900;
  color: var(--v2-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 1px solid rgba(79, 215, 240, 0.1);
}

.v2-stats-hud {
  background-color: var(--v2-surface-container-low);
  padding: 32px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.hud-scanline-inner {
  position: absolute;
  inset: 0;
  opacity: 0.05;
}

.hud-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
}

.hud-icon {
  color: var(--v2-primary);
  font-size: 14px;
}

.hud-title {
  font-weight: 900;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--v2-primary);
}

.v2-stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (min-width: 768px) {
  .v2-stats-row {
    grid-template-columns: repeat(6, 1fr);
  }
}

.v2-stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.v2-stat-box-inner {
  width: 100%;
  aspect-ratio: 1/1;
  border: 1px solid rgba(60, 73, 76, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.v2-stat-val {
  font-size: 24px;
  font-weight: 900;
  color: var(--v2-on-surface);
  position: relative;
}

.v2-stat-label {
  margin-top: 8px;
  font-size: 10px;
  font-weight: 900;
  color: var(--v2-outline);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.stat-glow {
  position: absolute;
  inset: 0;
  background-color: rgba(79, 215, 240, 0.05);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.v2-stat-box-inner:hover .stat-glow {
  opacity: 1;
}

.v2-weapon-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 32px;
}

.weapon-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(60, 73, 76, 0.2);
  padding-bottom: 16px;
}

.weapon-section-title {
  font-weight: 900;
  text-transform: uppercase;
  font-size: 18px;
  letter-spacing: -0.025em;
  color: var(--v2-on-surface);
}

.weapon-section-accents {
  display: flex;
  gap: 4px;
}

.accent-dot { width: 4px; height: 4px; background-color: var(--v2-primary); }
.accent-dot.dim { background-color: rgba(79, 215, 240, 0.2); }

.v2-weapon-card-v2 {
  background-color: var(--v2-surface-container);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .v2-weapon-card-v2 {
    flex-direction: row;
  }
  .weapon-card-info { width: 33.333333%; }
}

.weapon-type-label {
  font-size: 10px;
  font-weight: 900;
  color: var(--v2-primary);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 4px;
}

.weapon-name-v2 {
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--v2-on-surface);
}

.weapon-card-stats {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  border-left: 1px solid rgba(60, 73, 76, 0.2);
  padding-left: 24px;
}

.text-primary { color: var(--v2-primary); }

.weapon-stat-label {
  font-size: 10px;
  font-weight: 500;
  color: var(--v2-outline);
  text-transform: uppercase;
}

.weapon-stat-value {
  font-size: 20px;
  font-weight: 900;
}

.weapon-note-badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(79, 215, 240, 0.1);
  color: var(--v2-primary-fixed-dim);
  padding: 4px 12px;
  font-size: 8px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.05em;
}

.v2-rules-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
}

.rules-section-title {
  font-weight: 900;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--v2-outline);
}

.v2-rules-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .v2-rules-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.v2-rule-box-v2 {
  background-color: var(--v2-surface-container-high);
  padding: 16px;
  border-top-width: 2px;
  border-top-style: solid;
}

.rule-title-v2 {
  font-weight: 900;
  text-transform: uppercase;
  font-size: 14px;
  margin-bottom: 4px;
}

.rule-desc-v2 {
  font-size: 12px;
  color: var(--v2-on-surface-variant);
  line-height: 1.625;
}

.v2-damage-section {
  background-color: var(--v2-surface-container-low);
  padding: 24px;
  border: 1px solid rgba(134, 147, 150, 0.1);
  box-sizing: border-box;
  margin-top: 32px;
}

.damage-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.damage-section-title {
  font-weight: 900;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--v2-primary);
}

.damage-legend {
  display: flex;
  gap: 8px;
  font-size: 10px;
  color: var(--v2-outline);
}

.legend-item { display: flex; align-items: center; gap: 4px; }
.dot-ok { width: 8px; height: 8px; background-color: var(--v2-primary); }
.dot-crit { width: 8px; height: 8px; background-color: var(--v2-error); }

.v2-damage-grid-v2 {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  max-width: 384px;
  margin: 0 auto;
}

.damage-cell-v2 {
  aspect-ratio: 1/1;
  border-width: 1px;
  border-style: solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  font-weight: 900;
  box-sizing: border-box;
}

.cell-empty { border-color: rgba(60, 73, 76, 0.2); color: transparent; }
.cell-crit { border-color: rgba(255, 180, 171, 0.4); background-color: rgba(255, 180, 171, 0.2); color: var(--v2-error); }
.cell-ok { border-color: rgba(79, 215, 240, 0.4); background-color: rgba(79, 215, 240, 0.2); color: var(--v2-primary); }
.cell-filled.cell-crit { background-color: rgba(255, 180, 171, 0.4); }
.cell-filled.cell-ok { background-color: rgba(79, 215, 240, 0.4); }
</style>
