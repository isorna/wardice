<template>
  <div class="v2-warhacker-unit-detail">
    <!-- Hero Section -->
    <section class="v2-hero-section group">
      <div class="v2-hero-gradient"></div>
      <img alt="Slayer Warjack" class="v2-hero-img grayscale-contrast" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeUgk7AtCYdiyUKgtFsMhgKKU9E_kII6U8x4J_BnMC_bjAPd1Cwa4Bq1whxtssYj2HuJufcXkk42dr8_oV9-NeqN-1irQBvj9b4Odm2AJcX9EF0KF5xRvuo514-jc8w7qGpBoXBWlMCnYQs4iS82jiNrMkCnFfsICI2Y793jhcflbH_sLd3fzEONeBYzCtHF-f_vWgGGGKoRyt0w-8QIkbo5B97dmTzaAP2FCoe9BP57xnMIL7BTHkIa5Vmu-r-ieXzTsqJ5EqISOU"/>
      <div class="v2-hero-info">
        <h1 class="font-headline v2-hero-title">SLAYER_V4</h1>
        <div class="v2-hero-tags">
          <span class="v2-hero-tag tag-primary">HEAVY_CHASSIS</span>
          <span class="v2-hero-tag tag-secondary">EXPERIMENTAL</span>
        </div>
      </div>
      <div class="v2-hero-pts-box">
        <span class="font-headline v2-hero-pts">16 PT</span>
      </div>
    </section>

    <!-- Stats Grid -->
    <section class="v2-stats-readout">
      <div v-for="(val, label) in stats" :key="label" class="v2-stat-card-v2" :class="{ 'border-secondary': label === 'THR' }">
        <span class="v2-stat-card-label">{{ label }}</span>
        <span class="font-headline v2-stat-card-val" :class="{ 'text-secondary': label === 'THR' }">{{ val }}</span>
      </div>
    </section>

    <!-- Critical Status: Damage Grid -->
    <section class="v2-damage-grid-section">
      <div class="v2-section-header-v2">
        <h3 class="font-headline v2-section-title-v2">
          <span class="material-symbols-outlined v2-section-icon-v2">monitor_heart</span>
          Hull_Integrity_Grid
        </h3>
        <span class="v2-warning-pulse">SYSTEM_WARNING</span>
      </div>
      <div class="v2-hull-grid-container">
        <!-- Row 1 -->
        <div class="v2-hull-row">
          <div class="v2-hull-cell cell-ok"></div>
          <div class="v2-hull-cell cell-ok"></div>
        </div>
        <!-- Row 2 -->
        <div class="v2-hull-row">
          <div class="v2-hull-cell cell-ok"></div>
          <div class="v2-hull-cell cell-empty"><span class="material-symbols-outlined v2-cell-icon">close</span></div>
          <div class="v2-hull-cell cell-ok"></div>
          <div class="v2-hull-cell cell-ok"></div>
        </div>
        <!-- Row 3 -->
        <div class="v2-hull-row">
          <div v-for="cell in hullRow3" :key="cell.label" class="v2-hull-stack">
            <div class="v2-hull-cell cell-ok"></div>
            <span class="font-label v2-hull-label">{{ cell.label }}</span>
          </div>
        </div>
      </div>
      <!-- Grid Underglow -->
      <div class="v2-grid-underglow"></div>
    </section>

    <!-- Combat Directives & Weapons -->
    <section class="v2-combat-systems">
      <div>
        <h4 class="font-label v2-system-group-label">Tactical_Directives</h4>
        <div class="v2-directives-grid">
          <button class="v2-directive-btn btn-primary-v2">
            OVERDRIVE_MODE
            <span class="material-symbols-outlined v2-directive-icon">bolt</span>
          </button>
          <button class="v2-directive-btn btn-outline-v2">
            GUARD_STANCE
            <span class="material-symbols-outlined v2-directive-icon">shield</span>
          </button>
        </div>
      </div>
      <div>
        <h4 class="font-label v2-system-group-label">Weapon_Systems</h4>
        <div class="v2-weapons-stack">
          <div v-for="weapon in weapons" :key="weapon.name" class="v2-weapon-item-v2" :class="{ 'border-offline': weapon.offline }">
            <div>
              <span class="font-headline v2-weapon-name-v2" :class="weapon.offline ? 'text-secondary' : 'text-primary'">{{ weapon.name }}</span>
              <span class="font-body v2-weapon-stats-v2">{{ weapon.stats }}</span>
            </div>
            <div class="v2-weapon-status-box">
              <span v-if="weapon.offline" class="font-label v2-offline-tag">OFFLINE</span>
              <span v-else class="material-symbols-outlined v2-system-icon">settings_input_component</span>
              <div class="v2-status-dot" :class="weapon.offline ? 'bg-secondary-dim' : 'bg-primary'"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ability Chips -->
    <section class="v2-abilities-section">
      <h4 class="font-label v2-system-group-label">Special_Abilities</h4>
      <div class="v2-abilities-wrap">
        <span v-for="ability in abilities" :key="ability.name" class="v2-ability-chip" :class="ability.type">
          {{ ability.name }}
        </span>
      </div>
    </section>
  </div>
</template>

<script setup>
const stats = { SPD: '06', STR: '12', MAT: '07', DEF: '13', ARM: '17', CMD: '--', THR: '09', VOL: '05' }
const hullRow3 = [{ label: 'L' }, { label: 'M' }, { label: 'C' }, { label: 'C' }, { label: 'M' }, { label: 'R' }]
const weapons = [
  { name: 'Death_Claw (L)', stats: 'RNG: 1 | POW: 16 | P+S: 28' },
  { name: 'Death_Claw (R)', stats: 'RNG: 1 | POW: 16 | P+S: 28' },
  { name: 'Hellfire_Cannon', stats: 'RNG: 10 | ROF: 1 | AOE: 3', offline: true }
]
const abilities = [
  { name: 'STEALTH_CIRCUIT', type: 'primary' },
  { name: 'VOID_STRIKE', type: 'primary' },
  { name: 'EXPERIMENTAL_DRIVE', type: 'secondary' },
  { name: 'GHOST_WALKER', type: 'primary' }
]
</script>

<style scoped>
.v2-warhacker-unit-detail {
  padding-bottom: 96px;
  flex-grow: 1;
}

.v2-hero-section {
  margin-top: 16px;
  position: relative;
  height: 256px;
  width: 100%;
  background-color: var(--v2-surface-container-low);
  overflow: hidden;
}

.v2-hero-gradient {
  position: absolute;
  inset: 0;
  z-index: 10;
  background: linear-gradient(to top, var(--v2-background), transparent, rgba(79, 215, 240, 0.1));
}

.v2-hero-img {
  width: 100%; height: 100%; object-fit: cover;
}

.grayscale-contrast {
  filter: grayscale(1) brightness(0.75) contrast(1.25);
}

.v2-hero-info {
  position: absolute;
  bottom: 16px;
  left: 16px;
  z-index: 20;
}

.v2-hero-title {
  font-size: 30px;
  font-weight: 900;
  color: var(--v2-primary);
  letter-spacing: -0.05em;
  text-transform: uppercase;
}

.v2-hero-tags { display: flex; gap: 8px; margin-top: 4px; }

.v2-hero-tag {
  font-family: var(--v2-font-label);
  font-size: 10px;
  padding: 2px 8px;
  border-width: 1px;
  border-style: solid;
}

.tag-primary { background-color: rgba(79, 215, 240, 0.2); color: var(--v2-primary); border-color: rgba(79, 215, 240, 0.3); }
.tag-secondary { background-color: rgba(255, 127, 28, 0.2); color: var(--v2-secondary); border-color: rgba(255, 127, 28, 0.3); }

.v2-hero-pts-box {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 20;
  background-color: var(--v2-primary-container);
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v2-hero-pts { font-weight: 900; text-transform: uppercase; font-size: 20px; letter-spacing: -0.025em; color: var(--v2-on-primary-container); }

.v2-stats-readout {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 0 16px;
}

.v2-stat-card-v2 {
  background-color: var(--v2-surface-container);
  padding: 12px;
  border-top-width: 2px;
  border-top-style: solid;
  border-top-color: rgba(79, 215, 240, 0.4);
}

.v2-stat-card-v2.border-secondary { border-top-color: rgba(255, 182, 139, 0.4); }

.v2-stat-card-label {
  display: block; font-family: var(--v2-font-label); font-size: 10px; color: var(--v2-on-surface-variant); letter-spacing: 0.2em;
}

.v2-stat-card-val { font-size: 24px; font-weight: 700; color: var(--v2-primary); }
.text-secondary { color: var(--v2-secondary); }

.v2-damage-grid-section {
  margin-top: 32px;
  background-color: var(--v2-surface-container-low);
  padding: 24px;
  position: relative;
}

.v2-section-header-v2 { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }

.v2-section-title-v2 {
  font-weight: 700; color: var(--v2-primary); letter-spacing: 0.1em; font-size: 14px; text-transform: uppercase; display: flex; align-items: center; gap: 8px;
}

.v2-section-icon-v2 { font-size: 18px; }

.v2-warning-pulse { font-size: 10px; color: var(--v2-secondary); font-family: var(--v2-font-label); animation: v2-pulse 2s infinite; }

@keyframes v2-pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }

.v2-hull-grid-container { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.v2-hull-row { display: flex; gap: 8px; }

.v2-hull-cell {
  width: 48px; height: 48px; border-width: 1px; border-style: solid; display: flex; align-items: center; justify-content: center;
}

.cell-ok { background-color: rgba(79, 215, 240, 0.1); border-color: rgba(79, 215, 240, 0.3); }
.cell-empty { background-color: var(--v2-surface-container-highest); border-color: rgba(79, 215, 240, 0.1); }

.v2-cell-icon { color: var(--v2-secondary); opacity: 0.5; font-size: 24px; }

.v2-hull-stack { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.v2-hull-label { font-size: 10px; color: var(--v2-on-surface-variant); font-weight: 700; }

.v2-grid-underglow {
  position: absolute; bottom: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(to right, transparent, rgba(79, 215, 240, 0.2), transparent);
}

.v2-combat-systems { margin-top: 32px; padding: 0 16px; display: flex; flex-direction: column; gap: 32px; }

.v2-system-group-label { font-size: 10px; color: var(--v2-on-surface-variant); margin-bottom: 12px; letter-spacing: 0.3em; text-transform: uppercase; }

.v2-directives-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }

.v2-directive-btn {
  font-family: var(--v2-font-label); font-size: 12px; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; border: none; cursor: pointer;
}

.btn-primary-v2 { background-color: var(--v2-primary); color: var(--v2-on-primary); border-left: 4px solid #a5f3fc; }
.btn-outline-v2 { background-color: var(--v2-surface-container-high); color: var(--v2-on-surface); border-left: 4px solid var(--v2-outline-variant); }

.v2-directive-icon { font-size: 16px; }

.v2-weapons-stack { display: flex; flex-direction: column; gap: 8px; }

.v2-weapon-item-v2 {
  background-color: var(--v2-surface-container); padding: 16px; display: flex; justify-content: space-between; align-items: center; border: 1px solid transparent;
}

.v2-weapon-item-v2.border-offline { border-color: rgba(255, 182, 139, 0.2); }

.v2-weapon-name-v2 { display: block; font-weight: 700; font-size: 14px; text-transform: uppercase; }
.text-primary { color: var(--v2-primary); }
.text-secondary { color: var(--v2-secondary); }

.v2-weapon-stats-v2 { font-size: 10px; color: var(--v2-on-surface-variant); text-transform: uppercase; }

.v2-weapon-status-box { display: flex; align-items: center; gap: 8px; }

.v2-offline-tag { font-size: 8px; color: var(--v2-secondary); text-transform: uppercase; }
.v2-system-icon { color: rgba(79, 215, 240, 0.4); font-size: 20px; }

.v2-status-dot { width: 8px; height: 8px; }
.bg-secondary-dim { background-color: var(--v2-secondary); opacity: 0.2; }
.bg-primary { background-color: var(--v2-primary); }

.v2-abilities-section { margin-top: 32px; padding: 0 16px; }

.v2-abilities-wrap { display: flex; flex-wrap: wrap; gap: 8px; }

.v2-ability-chip {
  padding: 4px 12px; font-family: var(--v2-font-label); font-size: 10px; border-width: 1px; border-style: solid;
}

.v2-ability-chip.primary { background-color: var(--v2-surface-container-highest); color: var(--v2-primary); border-color: rgba(79, 215, 240, 0.2); }
.v2-ability-chip.secondary { background-color: var(--v2-surface-container-highest); color: var(--v2-secondary); border-color: rgba(255, 182, 139, 0.2); }
</style>
