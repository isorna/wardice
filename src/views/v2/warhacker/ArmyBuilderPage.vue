<template>
  <div class="v2-warhacker-builder">
    <!-- POINTS HUD (Bento Style) -->
    <section class="v2-warhacker-stats-grid">
      <div class="v2-hud-card hud-card-primary">
        <p class="font-label v2-hud-label">Combat Efficiency</p>
        <div class="v2-hud-value-row">
          <span class="font-headline v2-hud-val-main">41</span>
          <span class="font-headline v2-hud-val-total">/ 75</span>
        </div>
        <div class="v2-hud-progress-bg">
          <div class="v2-hud-progress-bar bg-primary shadow-primary" :style="{ width: '54.6%' }"></div>
        </div>
      </div>
      <div class="v2-hud-card hud-card-tertiary">
        <p class="font-label v2-hud-label">Warjack Points</p>
        <div class="v2-hud-value-row">
          <span class="font-headline v2-hud-val-tertiary">12</span>
          <span class="font-headline v2-hud-val-total">/ 28</span>
        </div>
        <div class="v2-hud-progress-bg">
          <div class="v2-hud-progress-bar bg-tertiary shadow-tertiary" :style="{ width: '42.8%' }"></div>
        </div>
      </div>
    </section>

    <!-- DIAGNOSTIC WARNINGS -->
    <section class="v2-warhacker-diagnostic glass-panel">
      <span class="material-symbols-outlined v2-diag-icon">warning</span>
      <div>
        <h4 class="font-label v2-diag-title">Critical System Error</h4>
        <p class="v2-diag-desc">COMMAND LIMIT BREACH: FACTION PROTOCOL REQUIRES SECONDARY ATTACHMENT.</p>
      </div>
    </section>

    <!-- ARMY LIST SECTION -->
    <div class="v2-warhacker-list-stack">
      <!-- WARCASTERS -->
      <section class="v2-builder-list-section">
        <div class="v2-builder-list-header">
          <h2 class="font-headline v2-list-section-title">Leadership_Core</h2>
          <span class="font-label v2-list-section-meta">01 / 01</span>
        </div>
        <div class="v2-warhacker-unit-card-v2 border-primary-dim">
          <div class="v2-card-flex">
            <div class="v2-card-portrait-box">
              <img class="v2-img-unit grayscale-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMxyuf_URR49y8ujHkgLO6yFFdG1klLckvuCX9uAYpZ_L_TFvz6LUFkusgDaopma-xkHAUia0c_fsvUhwQPXJcjGHUbzh36U8quhCAty9GmmdPPk_WixwpByQ7AqwlYt1ZCbogjezWIBgoOilBRpS-T27V-0uCfvCbX1JwQhBP3oqkpF20jq61mEeUl3tre-EoiPCDoXYKilQPoKtFNli_ONPuivyDsmnDcXALuoLdt1mEnE7Z7yjIYV1DmdPmYHNz3dkRZjWKW5TW"/>
            </div>
            <div class="v2-card-details">
              <div class="v2-pts-overlay">00 PTS</div>
              <h3 class="font-headline v2-unit-card-title">Commander Stryker</h3>
              <p class="font-label v2-unit-card-subtitle">Cygnar Warcaster</p>
              <div class="v2-unit-stats-grid">
                <div class="v2-unit-stat-item"><p class="font-label v2-stat-label">SPD</p><p class="font-headline v2-stat-val">6</p></div>
                <div class="v2-unit-stat-item"><p class="font-label v2-stat-label">STR</p><p class="font-headline v2-stat-val">6</p></div>
                <div class="v2-unit-stat-item"><p class="font-label v2-stat-label">ARM</p><p class="font-headline v2-stat-val">16</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- WARJACKS -->
      <section class="v2-builder-list-section">
        <div class="v2-builder-list-header">
          <h2 class="font-headline v2-list-section-title">Heavy_Chassis_Support</h2>
          <span class="font-label v2-list-section-meta">02 / --</span>
        </div>
        <!-- Expanded Card -->
        <div class="v2-warhacker-jack-expanded">
          <div class="v2-jack-header">
            <div class="v2-jack-identity">
              <span class="material-symbols-outlined text-tertiary">robot_2</span>
              <div>
                <h3 class="font-headline v2-jack-name">Ironclad</h3>
                <p class="font-label v2-jack-type">Heavy Warjack</p>
              </div>
            </div>
            <div class="v2-jack-pts-row">
              <span class="font-headline v2-jack-pts">12 PTS</span>
              <span class="material-symbols-outlined v2-expand-icon">expand_less</span>
            </div>
          </div>
          <div class="v2-jack-details">
            <div class="v2-jack-stats-grid">
              <div v-for="stat in ['MAT', 'RAT', 'DEF', 'ARM']" :key="stat" class="v2-jack-stat-box">
                <p class="font-label v2-jack-stat-label">{{ stat }}</p>
                <p class="font-headline v2-jack-stat-val">7</p>
              </div>
            </div>
            <div>
              <p class="font-label v2-weapon-section-label">Weapon Systems</p>
              <div class="v2-weapon-row">
                <span class="v2-weapon-name">Quake Hammer</span>
                <span class="font-label v2-weapon-pow">POW 18</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Collapsed Card -->
        <div class="v2-warhacker-unit-item-v2">
          <div class="v2-jack-identity">
            <span class="material-symbols-outlined v2-collapsed-icon">robot_2</span>
            <div>
              <h3 class="font-headline v2-jack-name">Charger</h3>
              <p class="font-label v2-jack-type">Light Warjack</p>
            </div>
          </div>
          <div class="v2-jack-pts-row">
            <span class="font-headline v2-jack-pts-collapsed">09 PTS</span>
            <span class="material-symbols-outlined v2-expand-icon">expand_more</span>
          </div>
        </div>
      </section>

      <!-- UNITS -->
      <section class="v2-builder-list-section p-bottom-48">
        <div class="v2-builder-list-header">
          <h2 class="font-headline v2-list-section-title">Infantry_Divisions</h2>
          <span class="font-label v2-list-section-meta">01 / --</span>
        </div>
        <div class="v2-warhacker-unit-item-v2 border-top-soft">
          <div class="v2-jack-identity">
            <span class="material-symbols-outlined v2-collapsed-icon">groups</span>
            <div>
              <h3 class="font-headline v2-jack-name">Stormblades</h3>
              <p class="font-label v2-jack-type">Unit (5 Models)</p>
            </div>
          </div>
          <div class="v2-jack-pts-row">
            <span class="font-headline v2-jack-pts-collapsed">10 PTS</span>
            <span class="material-symbols-outlined v2-expand-icon">expand_more</span>
          </div>
        </div>
      </section>
    </div>

    <!-- FAB: Add Unit -->
    <button class="v2-warhacker-fab-add">
      <span class="material-symbols-outlined v2-fab-icon">add</span>
    </button>
  </div>
</template>

<style scoped>
.v2-warhacker-builder {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-sizing: border-box;
}

.v2-warhacker-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.v2-hud-card {
  background-color: var(--v2-surface-container-low);
  padding: 16px;
  position: relative;
  overflow: hidden;
  border-top: 1px solid transparent;
}

.hud-card-primary { border-top-color: rgba(79, 215, 240, 0.3); }
.hud-card-tertiary { border-top-color: rgba(0, 218, 243, 0.3); }

.v2-hud-label {
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--v2-on-surface-variant);
  text-transform: uppercase;
  margin-bottom: 4px;
}

.v2-hud-value-row {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.v2-hud-val-main { font-size: 36px; font-weight: 700; color: var(--v2-primary); }
.v2-hud-val-tertiary { font-size: 36px; font-weight: 700; color: var(--v2-tertiary); }
.v2-hud-val-total { font-size: 20px; color: var(--v2-on-surface-variant); }

.v2-hud-progress-bg {
  margin-top: 12px;
  width: 100%;
  background-color: var(--v2-surface-container);
  height: 4px;
}

.v2-hud-progress-bar {
  height: 100%;
}

.bg-primary { background-color: var(--v2-primary); }
.bg-tertiary { background-color: var(--v2-tertiary); }
.shadow-primary { box-shadow: 0 0 8px var(--v2-primary); }
.shadow-tertiary { box-shadow: 0 0 8px var(--v2-tertiary); }

.v2-warhacker-diagnostic {
  background-color: rgba(255, 182, 139, 0.05);
  border-left: 2px solid var(--v2-secondary);
  padding: 12px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.v2-diag-icon { color: var(--v2-secondary); font-variation-settings: 'FILL' 1; }
.v2-diag-title { font-size: 11px; font-weight: 700; color: var(--v2-secondary); letter-spacing: 0.1em; text-transform: uppercase; }
.v2-diag-desc { font-size: 12px; color: rgba(255, 182, 139, 0.8); font-weight: 500; }

.v2-warhacker-list-stack {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.v2-builder-list-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.v2-builder-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(134, 147, 150, 0.2);
  padding-bottom: 4px;
}

.v2-list-section-title {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--v2-on-surface-variant);
  text-transform: uppercase;
}

.v2-list-section-meta {
  font-size: 10px;
  color: rgba(79, 215, 240, 0.6);
}

.v2-warhacker-unit-card-v2 {
  background-color: var(--v2-surface-container);
  position: relative;
  border-top-width: 1px;
  border-top-style: solid;
}

.border-primary-dim { border-top-color: rgba(79, 215, 240, 0.2); }

.v2-card-flex { display: flex; }

.v2-card-portrait-box {
  width: 80px;
  height: 96px;
  background-color: var(--v2-surface-variant);
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.v2-img-unit { width: 100%; height: 100%; object-fit: cover; }
.grayscale-80 { filter: grayscale(1); opacity: 0.8; }

.v2-card-details {
  flex: 1;
  padding: 16px;
  position: relative;
  box-sizing: border-box;
}

.v2-pts-overlay {
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--v2-primary-container);
  color: var(--v2-on-primary-container);
  padding: 4px 12px;
  font-family: var(--v2-font-headline);
  font-weight: 700;
  font-size: 12px;
}

.v2-unit-card-title {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--v2-primary);
  text-transform: uppercase;
}

.v2-unit-card-subtitle {
  font-size: 10px;
  color: var(--v2-on-surface-variant);
  text-transform: uppercase;
  margin-top: 4px;
  letter-spacing: -0.025em;
}

.v2-unit-stats-grid {
  display: flex;
  gap: 16px;
  margin-top: 12px;
}

.v2-unit-stat-item { text-align: center; }
.v2-stat-label { font-size: 8px; color: var(--v2-on-surface-variant); text-transform: uppercase; }
.v2-stat-val { font-size: 12px; font-weight: 700; }

.v2-warhacker-jack-expanded {
  background-color: var(--v2-surface-container-high);
  border-top: 2px solid var(--v2-tertiary);
}

.v2-jack-header {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.v2-jack-identity { display: flex; align-items: center; gap: 12px; }

.text-tertiary { color: var(--v2-tertiary); }

.v2-jack-name { font-size: 14px; font-weight: 700; color: var(--v2-on-surface); text-transform: uppercase; }
.v2-jack-type { font-size: 9px; color: var(--v2-on-surface-variant); text-transform: uppercase; }

.v2-jack-pts-row { display: flex; align-items: center; gap: 16px; }
.v2-jack-pts { font-size: 14px; font-weight: 700; color: var(--v2-tertiary); }
.v2-expand-icon { color: var(--v2-on-surface-variant); }

.v2-jack-details {
  padding: 0 16px 16px;
  border-top: 1px solid rgba(134, 147, 150, 0.1);
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.v2-jack-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }

.v2-jack-stat-box {
  background-color: var(--v2-surface-container-lowest);
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid rgba(0, 218, 243, 0.3);
}

.v2-jack-stat-label { font-size: 8px; color: var(--v2-on-surface-variant); text-transform: uppercase; }
.v2-jack-stat-val { font-size: 14px; font-weight: 700; }

.v2-weapon-section-label {
  font-size: 10px;
  color: var(--v2-tertiary);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 4px;
}

.v2-weapon-row {
  background-color: var(--v2-surface-container);
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.v2-weapon-name { font-size: 11px; font-weight: 500; text-transform: uppercase; }
.v2-weapon-pow { font-size: 10px; color: var(--v2-on-surface-variant); }

.v2-warhacker-unit-item-v2 {
  background-color: var(--v2-surface-container);
  border-top: 1px solid rgba(134, 147, 150, 0.2);
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.v2-collapsed-icon { color: var(--v2-on-surface-variant); }
.v2-jack-pts-collapsed { font-size: 14px; font-weight: 700; color: var(--v2-on-surface-variant); }

.border-top-soft { border-top: 1px solid rgba(134, 147, 150, 0.2); }
.p-bottom-48 { padding-bottom: 48px; }

.v2-warhacker-fab-add {
  position: fixed;
  bottom: 96px;
  right: 24px;
  width: 56px;
  height: 56px;
  background-color: var(--v2-primary);
  color: var(--v2-on-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  border: none;
  box-shadow: 0 0 20px rgba(79, 215, 240, 0.4);
  z-index: 50;
  transition: all 0.3s ease;
  cursor: pointer;
}

.v2-fab-icon { font-size: 36px; }

.v2-warhacker-fab-add:hover {
  box-shadow: 0 0 30px rgba(79, 215, 240, 0.6);
  transform: scale(1.05);
}

.v2-warhacker-fab-add:active { transform: scale(0.9); }
</style>
