<template>
  <div class="v2-warhacker-intel">
    <!-- Tactical Header: Timer & VPs -->
    <section class="v2-intel-header">
      <div class="intel-stat-v2 border-primary-dim">
        <span class="font-label v2-intel-label">Player 01</span>
        <span class="font-headline v2-intel-val-primary">14 <span class="v2-intel-val-meta">VP</span></span>
      </div>
      <div class="intel-stat-v2 active-timer border-primary">
        <span class="font-label v2-intel-label-primary">Turn Timer</span>
        <span class="font-headline v2-intel-val-on-surface">60:00</span>
      </div>
      <div class="intel-stat-v2 border-secondary-dim text-right">
        <span class="font-label v2-intel-label">Enemy 02</span>
        <span class="font-headline v2-intel-val-secondary">09 <span class="v2-intel-val-meta">VP</span></span>
      </div>
    </section>

    <!-- Scenario Map Trigger -->
    <button class="v2-map-trigger">
      <div class="v2-map-trigger-info">
        <div class="radar-box">
          <span class="material-symbols-outlined v2-radar-icon">map</span>
          <div class="radar-pulse"></div>
        </div>
        <div>
          <span class="font-label v2-radar-tag">Engagement Sector</span>
          <span class="font-headline v2-radar-title">Scenario_Map_04</span>
        </div>
      </div>
      <span class="material-symbols-outlined v2-radar-arrow">chevron_right</span>
    </button>

    <!-- Tab Switcher -->
    <div class="v2-tab-switcher">
      <button class="tab-btn active">MY ARMY</button>
      <button class="tab-btn">OPPONENT</button>
    </div>

    <!-- Unit List -->
    <div class="v2-intel-unit-list">
      <div v-for="unit in units" :key="unit.name" class="v2-intel-unit-card" :class="{ 'border-command': unit.type === 'command' }">
        <div class="card-header-v2" :class="{ 'bg-command': unit.type === 'command' }">
          <div class="v2-unit-header-flex">
            <div class="intel-unit-portrait" :class="unit.type === 'command' ? 'bg-primary-soft' : 'bg-variant-soft'">
              <img v-if="unit.image" :alt="unit.name" class="v2-unit-img" :src="unit.image"/>
              <span v-else class="material-symbols-outlined v2-unit-icon">{{ unit.icon }}</span>
            </div>
            <div>
              <span class="font-headline v2-unit-card-name">{{ unit.name }}</span>
              <span class="font-label v2-unit-card-type" :style="{ color: unit.type === 'command' ? '#4fd7f0' : (unit.subTypeColorValue || 'rgba(79, 215, 240, 0.7)') }">{{ unit.subType }}</span>
            </div>
          </div>
          <div class="intel-pts-badge" :class="unit.type === 'command' ? 'badge-command' : 'badge-normal'">
            {{ unit.points }}
          </div>
        </div>
        <div v-if="unit.type !== 'command'" class="card-body-v2">
          <div class="v2-health-section">
            <div class="v2-health-labels">
              <span class="v2-health-tag">{{ unit.healthLabel }}</span>
              <span class="v2-health-val" :style="{ color: unit.healthColorValue || 'var(--v2-primary)' }">{{ unit.health }}%</span>
            </div>
            <div class="v2-health-bar-container">
              <div class="v2-health-bar" :style="{ width: unit.health + '%', backgroundColor: unit.healthBgValue || 'var(--v2-primary)' }"></div>
            </div>
            <div v-if="unit.grid" class="v2-damage-grid-row">
              <div v-for="n in 6" :key="n" class="v2-damage-dot" :style="{ backgroundColor: n <= unit.gridFilled ? (unit.healthBgValue || 'var(--v2-primary)') : 'var(--v2-surface-container-highest)' }"></div>
            </div>
          </div>
          <div class="v2-intel-stats">
            <div v-for="(val, stat) in unit.stats" :key="stat" class="v2-intel-stat-item">
              <span class="font-label v2-intel-stat-label">{{ stat }}</span>
              <span class="font-headline v2-intel-stat-val">{{ val }}</span>
            </div>
          </div>
        </div>
        <div v-else class="card-footer-v2">
          <div class="v2-buff-row">
            <span class="material-symbols-outlined v2-buff-icon">bolt</span>
            <span class="font-label v2-buff-label">Active Buff: {{ unit.buff }}</span>
          </div>
          <p class="v2-buff-desc">{{ unit.buffDesc }}</p>
        </div>
      </div>
    </div>

    <!-- FAB Ghost Element -->
    <div class="v2-intel-fab-container">
      <button class="v2-intel-fab">
        <span class="material-symbols-outlined v2-fab-icon">add</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const units = [
  { name: 'Razorwing_Strider', subType: 'Fast Attack • Elite', points: '125 PTS', health: 85, healthLabel: 'Structural Integrity', healthColorValue: '#4fd7f0', healthBgValue: '#4fd7f0', grid: true, gridFilled: 4, stats: { SPD: '07', ARM: '19', DEF: '14' }, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuzJpB24pAKt53dq0WZcyC2g74UNBYUaW5dmFHvxF7sPgoYr9bmq6kIkx0jy6b7xBRkXjVeBISFi7J8Ab8yUeQzt90k1gclLhA_Fmb9tEQTWeqw2b2PtBh8Hkr-lLoOhzpY4WwIBjMl0v0P8lpIfHm4TgKvsVSzenm7GSIgyubZqutxyOUymv2vaIqJYLS6QYh2czcuY1LYlmfMUpga7MweaHlP-r87V6466Yd48QwjTPKmw_W_sU332c5YlmUfllxjnOiQzlQfrKb' },
  { name: 'Colossus_Chassis', subType: 'Heavy • Frontline', subTypeColorValue: 'rgba(255, 182, 139, 0.7)', points: '240 PTS', health: 30, healthLabel: 'Damage Taken', healthColorValue: '#ffb4ab', healthBgValue: '#ffb4ab', grid: true, gridFilled: 1, stats: { SPD: '04', ARM: '22', DEF: '10' }, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7YoWJZ5NawJFkbvxHCh0no5rSIenHbO52tN4SWpN2smivU_6H0OCrU2D3oqw6qSm90NBWB-SLVx0FdmBoye6avkMocOsiTD-XCSUpWuZXOdOsLewuFreQrhqt2o13whgfgNJGR2X4DsJm5dsBWGIvNWFiZexi_kwdo5nyl7WSzBpojIGOmZ3Cf56g6TxAn5JJiWRRbT_JQsKWATEGnOLaZe0H2d52EahMpRSLKuiUzjs8DtNOV8mXai9sTZxdRNUFQ0IJDqYk4VRB' },
  { name: 'Commander_Vance', subType: 'Warhacker Alpha', type: 'command', icon: 'military_tech', points: 'COMMAND', buff: 'OVERDRIVE_PULSE', buffDesc: 'Units within 5" gain +2 Movement and Reroll failed Attack rolls.' }
]
</script>

<style scoped>
.v2-warhacker-intel {
  padding: 16px; min-height: 100vh; box-sizing: border-box; padding-bottom: 96px;
}

.v2-intel-header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  margin-bottom: 24px;
}

.intel-stat-v2 {
  background-color: var(--v2-surface-container-low);
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-width: 1px;
  border-top-style: solid;
}

.border-primary-dim { border-top-color: rgba(79, 215, 240, 0.2); }
.border-primary { border-top-color: var(--v2-primary); }
.border-secondary-dim { border-top-color: rgba(255, 182, 139, 0.2); }

.v2-intel-label { font-size: 10px; letter-spacing: 0.1em; color: var(--v2-on-surface-variant); text-transform: uppercase; }
.v2-intel-val-primary { font-size: 24px; font-weight: 700; color: var(--v2-primary); }
.v2-intel-val-meta { font-size: 10px; opacity: 0.6; }

.intel-stat-v2.active-timer {
  background-color: rgba(79, 215, 240, 0.1);
  border-top-width: 2px;
}

.v2-intel-label-primary { font-size: 10px; letter-spacing: 0.1em; color: var(--v2-primary); text-transform: uppercase; }
.v2-intel-val-on-surface { font-size: 24px; font-weight: 700; color: var(--v2-on-surface); }

.v2-intel-val-secondary { font-size: 24px; font-weight: 700; color: var(--v2-secondary); }

.text-right { text-align: right; }

.v2-map-trigger {
  width: 100%;
  background-color: var(--v2-surface-container);
  border: 1px solid rgba(79, 215, 240, 0.1);
  padding: 16px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.v2-map-trigger:hover {
  background-color: rgba(79, 215, 240, 0.05);
}

.v2-map-trigger-info { display: flex; align-items: center; gap: 12px; text-align: left; }

.radar-box {
  position: relative;
  width: 48px;
  height: 48px;
  background-color: var(--v2-surface-container-highest);
  display: flex;
  align-items: center;
  justify-content: center;
}

.v2-radar-icon { color: var(--v2-primary); }

.radar-pulse {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(79, 215, 240, 0.2);
  animation: v2-pulse 2s infinite;
}

@keyframes v2-pulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.1); opacity: 0; }
}

.v2-radar-tag { display: block; font-size: 10px; color: rgba(79, 215, 240, 0.6); text-transform: uppercase; letter-spacing: -0.025em; }
.v2-radar-title { display: block; font-size: 14px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
.v2-radar-arrow { color: var(--v2-primary); }

.v2-tab-switcher {
  display: flex;
  width: 100%;
  margin-bottom: 24px;
  background-color: var(--v2-surface-container-lowest);
  padding: 4px;
  box-sizing: border-box;
}

.tab-btn {
  flex: 1;
  padding: 12px 0;
  text-align: center;
  font-family: var(--v2-font-label);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  background: transparent;
  color: var(--v2-on-surface-variant);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.tab-btn.active {
  background-color: var(--v2-primary);
  color: var(--v2-on-primary);
}

.v2-intel-unit-list { display: flex; flex-direction: column; gap: 16px; }

.v2-intel-unit-card {
  background-color: var(--v2-surface-container);
  overflow: hidden;
  border-left: 2px solid transparent;
}

.v2-intel-unit-card.border-command { border-left-color: var(--v2-primary); }

.card-header-v2 {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px;
  background-color: var(--v2-surface-container-high);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.card-header-v2.bg-command {
  background-color: rgba(79, 215, 240, 0.05);
}

.v2-unit-header-flex { display: flex; gap: 12px; }

.intel-unit-portrait {
  width: 40px;
  height: 40px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-primary-soft { background-color: rgba(79, 215, 240, 0.2); }
.bg-variant-soft { background-color: rgba(30, 56, 69, 0.5); }

.v2-unit-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; }
.v2-unit-icon { color: var(--v2-primary); scale: 1.25; }

.v2-unit-card-name { display: block; font-size: 14px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }
.v2-unit-card-type { font-size: 10px; text-transform: uppercase; }

.intel-pts-badge {
  padding: 4px 8px;
  border-width: 1px;
  border-style: solid;
  text-transform: uppercase;
  font-family: var(--v2-font-label);
  font-size: 10px;
  font-weight: 700;
}

.badge-command { background-color: rgba(79, 215, 240, 0.2); border-color: transparent; color: var(--v2-primary); }
.badge-normal { background-color: rgba(0, 178, 202, 0.2); border-color: rgba(79, 215, 240, 0.3); color: var(--v2-primary); }

.card-body-v2 {
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.v2-health-section { display: flex; flex-direction: column; gap: 8px; }

.v2-health-labels { display: flex; justify-content: space-between; align-items: center; font-size: 9px; text-transform: uppercase; }
.v2-health-tag { color: var(--v2-on-surface-variant); }
.v2-health-val { font-weight: 700; }

.v2-health-bar-container { height: 4px; background-color: var(--v2-surface-container-highest); display: flex; }
.v2-health-bar { height: 100%; }

.v2-damage-grid-row { display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px; margin-top: 4px; }
.v2-damage-dot { height: 8px; }

.v2-intel-stats { display: flex; justify-content: flex-end; gap: 12px; text-transform: uppercase; }
.v2-intel-stat-item { text-align: center; }
.v2-intel-stat-label { display: block; font-size: 8px; color: var(--v2-on-surface-variant); letter-spacing: -0.025em; }
.v2-intel-stat-val { display: block; font-size: 18px; font-weight: 700; }

.card-footer-v2 {
  padding: 16px;
  background-color: var(--v2-surface-container-low);
}

.v2-buff-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.v2-buff-icon { color: var(--v2-primary); font-size: 12px; }
.v2-buff-label { font-size: 10px; color: var(--v2-primary); font-weight: 700; text-transform: uppercase; }
.v2-buff-desc { font-size: 10px; color: var(--v2-on-surface-variant); line-height: 1.5; }

.v2-intel-fab-container { position: fixed; bottom: 96px; right: 16px; display: flex; flex-direction: column; gap: 8px; z-index: 50; }

.v2-intel-fab {
  width: 56px;
  height: 56px;
  background-color: var(--v2-primary);
  color: var(--v2-on-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(79, 215, 240, 0.4);
  transition: transform 0.1s ease;
}

.v2-intel-fab:active {
  transform: scale(0.95);
}

.v2-fab-icon { font-size: 24px; }
</style>
