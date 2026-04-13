<template>
  <div class="v2-summary-page">
    <!-- Header Section -->
    <div class="v2-summary-header">
      <div>
        <h1 class="font-headline v2-summary-title">Battalion Summary</h1>
        <p class="font-label v2-summary-subtitle">Force Designation: VANGUARD-79 // Point Total: 1,985/2,000</p>
      </div>
      <div class="v2-summary-actions">
        <button class="v2-action-btn">
          <span class="material-symbols-outlined v2-action-icon">content_copy</span> Copy to Clipboard
        </button>
        <button class="v2-action-btn">
          <span class="material-symbols-outlined v2-action-icon">picture_as_pdf</span> Export PDF
        </button>
        <button class="v2-share-btn">
          <span class="material-symbols-outlined v2-share-icon">share</span> Share Link
        </button>
      </div>
    </div>

    <!-- Army Bento Grid -->
    <div class="v2-summary-grid">
      <!-- Command Structure -->
      <div class="summary-col-main v2-card-flat v2-command-card">
        <div class="v2-card-tag">Core Command</div>
        <h2 class="font-headline v2-card-title">
          <span class="material-symbols-outlined">stars</span> Command Structure
        </h2>
        <div class="v2-unit-stack">
          <!-- Unit Entry -->
          <div v-for="commander in commandStructure" :key="commander.name" class="v2-unit-entry-v2">
            <div>
              <h3 class="font-headline v2-commander-name">{{ commander.name }}</h3>
              <p class="v2-commander-role">{{ commander.role }}</p>
              <div v-if="commander.traits" class="v2-traits-row">
                <span v-for="trait in commander.traits" :key="trait.name" class="v2-mini-tag" :style="{ color: trait.colorValue || '#ffb68b' }">{{ trait.name }}</span>
              </div>
            </div>
            <div class="v2-commander-pts">
              <div class="font-headline v2-pts-val">{{ commander.points }}</div>
              <div class="font-label v2-pts-label">PTS</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detachment Rules -->
      <div class="summary-col-side v2-card-flat v2-detachment-card">
        <h2 class="font-headline v2-detachment-title">
          <span class="material-symbols-outlined">bolt</span> Force Traits
        </h2>
        <ul class="v2-traits-list">
          <li v-for="trait in forceTraits" :key="trait.name">
            <div class="font-label v2-trait-name">{{ trait.name }}</div>
            <p class="v2-trait-desc">{{ trait.description }}</p>
          </li>
        </ul>
      </div>

      <!-- Main Battle Line -->
      <div class="summary-col-full v2-card-flat v2-battle-line-card">
        <h2 class="font-headline v2-battle-line-title">
          <span class="material-symbols-outlined">group</span> Battle Line Units
        </h2>
        <div class="battle-line-grid">
          <div v-for="unit in battleLine" :key="unit.name" class="v2-summary-unit-card">
            <div class="v2-unit-card-header">
              <h4 class="font-headline v2-unit-card-name">{{ unit.name }}</h4>
              <span class="font-headline v2-unit-card-pts">{{ unit.points }} PTS</span>
            </div>
            <p class="v2-unit-card-equip">Equipment: {{ unit.equipment }}</p>
            <div class="unit-stat-bar-v2">
              <div v-for="(val, stat) in unit.stats" :key="stat">
                <div class="font-label v2-unit-stat-label">{{ stat }}</div>
                <div class="v2-unit-stat-val">{{ val }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Heavy Support & Armor -->
      <div class="summary-col-l-7 v2-card-flat v2-heavy-support-card">
        <h2 class="font-headline v2-heavy-support-title">
          <span class="material-symbols-outlined">rocket_launch</span> Heavy Support
        </h2>
        <div class="v2-heavy-stack">
          <div v-for="support in heavySupport" :key="support.name" class="v2-heavy-item-v2 group">
            <img class="v2-heavy-img" :src="support.image"/>
            <div class="v2-heavy-info">
              <div class="v2-heavy-header">
                <h3 class="font-headline v2-heavy-name">{{ support.name }}</h3>
                <span class="font-headline v2-heavy-pts">{{ support.points }} PTS</span>
              </div>
              <p class="v2-heavy-desc">{{ support.description }}</p>
              <div class="v2-heavy-integrity">
                <div class="v2-integrity-bg">
                  <div class="v2-integrity-bar" :style="{ width: support.integrity + '%' }"></div>
                </div>
                <span class="font-label v2-integrity-text">{{ support.statusText }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Strategic Summary / Notes -->
      <div class="summary-col-l-5 v2-card-flat v2-strategic-card">
        <h2 class="font-headline v2-strategic-title">
          <span class="material-symbols-outlined">analytics</span> Strategic Assets
        </h2>
        <div class="v2-strategic-stack">
          <div class="v2-cp-box">
            <div class="font-label v2-cp-label">Command Points (CP)</div>
            <div class="font-headline v2-cp-val">12 <span class="v2-cp-meta">STARTING</span></div>
          </div>
          <div class="v2-memo-box">
            <h4 class="font-label v2-memo-title">Tactical Memo</h4>
            <p class="v2-memo-text">"Focus fire on enemy heavy transport in turn 1. Use Storm-Strider to anchor the left flank while scouts screen for deep strikes. Conserve CP for 'Overcharged Void Shields' in late game."</p>
          </div>
          <div class="v2-strategic-stats">
            <div class="v2-strat-stat-item">
              <div class="v2-strat-stat-label">Unit Count</div>
              <div class="font-headline v2-strat-stat-val">14</div>
            </div>
            <div class="v2-strat-stat-item">
              <div class="v2-strat-stat-label">Model Count</div>
              <div class="font-headline v2-strat-stat-val">58</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const commandStructure = [
  { name: 'Arch-Commander Malacor', role: 'Leader, Master of the Void, Tactical Analyst', points: 245, traits: [{ name: 'Relic: Obsidian Plate', colorValue: '#ffb68b' }, { name: 'Trait: Inspiring Focus', colorValue: '#00daf3' }] },
  { name: 'Shield-Captain Vane', role: 'Second-in-Command, Frontline Specialist', points: 180 }
]

const forceTraits = [
  { name: 'Relentless Advance', description: 'Infantry units ignore movement penalties when shooting heavy weapons.' },
  { name: 'Neural Linkage', description: '+1 to hit rolls for units within 6" of a COMMAND unit.' },
  { name: 'Void Shielding', description: 'First wound dealt each turn to a Vehicle is ignored.' }
]

const battleLine = [
  { name: 'Ironclad Vanguard (x10)', points: 150, equipment: 'Plasma Rifles, Power Blades', stats: { SPD: '6"', STR: 4, MAT: '3+', WND: 2 } },
  { name: 'Ironclad Vanguard (x10)', points: 150, equipment: 'Plasma Rifles, Power Blades', stats: { SPD: '6"', STR: 4, MAT: '3+', WND: 2 } },
  { name: 'Pathfinder Scouts (x5)', points: 90, equipment: 'Rail Snipers, Camo Cloaks', stats: { SPD: '8"', STR: 3, MAT: '4+', WND: 1 } }
]

const heavySupport = [
  { name: 'Storm-Strider Walker', points: 420, description: 'Heavy Armor // Multi-Launcher // Void Array', integrity: 85, statusText: 'STRUCTURAL INTEGRITY: 85%', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKObaej7aiBHPGRmdqNgOVdEUWcwCQ13atiHIJ1fkSxzxuZC-lU5C5kokTq47UfHexowSppfzNJWP8CvGOOL0Yv9Mt7ksTeF6ridjfbrrGrvFMOU65za3Xabzv9MkYXRIKvdAdoXSR9wgFznlPP8dfH-vguJRAzdSrGkUFl7SIjM6h5GiIFl4dTkrL1bmTSqO_31Q-163qZ3iOq9N6EeOYGvUlZkxEdPGt7r8c47ac9kpAtMPlw421MKUMwrm8Eh1rRriCjHhbjdaI' },
  { name: 'Hellstorm Battery', points: 310, description: 'Artillery // Incendiary Rounds', integrity: 100, statusText: 'READY FOR DEPLOYMENT', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3OBmPFnVgP-UtypMGj2lnC7uHcS_24cosymuSrIJqFfG6aEkx0vYni_AjblZdRPWvTvND_nmhwrpccdUJh899X0AKQcPEb4Bl_iM7yGHYffeX11EbdMpAUeWbW6QKxy7kFbNAN1nDG-ivIPZ05zL62JVY3jT0FtdG-wOYlnOVd9E-NNmC5JK4Zpv6jMrC5PJOo1bR86rlxqo9chFuCwN2VSnqm6b7Q6bGURahds5CtUOyScg-uR2IMRb-mjc1PCSe9vk9TlkXnneb' }
]
</script>

<style scoped>
.v2-summary-page {
  max-width: 1152px;
  margin: 0 auto;
  padding-bottom: 48px;
}

.v2-summary-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;
  border-left: 4px solid var(--v2-primary);
  padding-left: 24px;
  padding-top: 8px;
  padding-bottom: 8px;
}

@media (min-width: 768px) {
  .v2-summary-header {
    flex-direction: row;
    align-items: flex-end;
  }
}

.v2-summary-title {
  font-size: 36px;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: var(--v2-on-surface);
  margin-bottom: 8px;
  text-transform: uppercase;
}

.v2-summary-subtitle {
  color: var(--v2-primary-container);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 14px;
}

.v2-summary-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.v2-action-btn {
  background-color: var(--v2-surface-container-high);
  color: var(--v2-primary);
  border-top: 1px solid rgba(79, 215, 240, 0.3);
  padding: 8px 20px;
  font-family: var(--v2-font-label);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border-left: none; border-right: none; border-bottom: none;
  transition: background-color 0.3s ease;
}

.v2-action-btn:hover {
  background-color: var(--v2-surface-container-highest);
}

.v2-action-icon {
  font-size: 18px;
}

.v2-share-btn {
  background: linear-gradient(to right, var(--v2-primary), var(--v2-primary-container));
  color: var(--v2-on-primary);
  padding: 8px 20px;
  font-family: var(--v2-font-label);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border: none;
  box-shadow: 0 0 15px rgba(79, 215, 240, 0.3);
}

.v2-share-icon {
  font-size: 18px;
  font-variation-settings: 'FILL' 1;
}

.v2-summary-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4px;
}

@media (min-width: 768px) {
  .v2-summary-grid {
    grid-template-columns: repeat(12, 1fr);
  }
  .summary-col-main { grid-column: span 8; }
  .summary-col-side { grid-column: span 4; }
  .summary-col-full { grid-column: span 12; }
  .summary-col-l-7 { grid-column: span 12; }
  .summary-col-l-5 { grid-column: span 12; }
}

@media (min-width: 1024px) {
  .summary-col-l-7 { grid-column: span 7; }
  .summary-col-l-5 { grid-column: span 5; }
}

.v2-card-flat {
  background-color: var(--v2-surface-container-low);
  position: relative;
  box-sizing: border-box;
}

.v2-command-card {
  border-top: 1px solid rgba(79, 215, 240, 0.2);
  padding: 24px;
}

.v2-card-tag {
  position: absolute;
  top: 0;
  right: 0;
  padding: 12px;
  background-color: rgba(0, 178, 202, 0.1);
  font-family: var(--v2-font-label);
  font-size: 10px;
  color: var(--v2-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.v2-card-title {
  font-size: 24px;
  font-weight: 900;
  color: var(--v2-primary);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
}

.v2-unit-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.v2-unit-entry-v2 {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid rgba(60, 73, 76, 0.3);
  padding-bottom: 16px;
}

.v2-commander-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--v2-on-surface);
}

.v2-commander-role {
  font-size: 14px;
  color: #94a3b8;
  font-style: italic;
}

.v2-traits-row {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.v2-mini-tag {
  background-color: var(--v2-surface-container-highest);
  padding: 2px 8px;
  font-family: var(--v2-font-label);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.05em;
}

.v2-commander-pts {
  text-align: right;
}

.v2-pts-val {
  font-size: 20px;
  font-weight: 900;
  color: var(--v2-primary);
}

.v2-pts-label {
  font-size: 10px;
  color: #64748b;
  text-transform: uppercase;
}

.v2-detachment-card {
  background-color: var(--v2-surface-container);
  border-top: 1px solid rgba(255, 127, 28, 0.2);
  padding: 24px;
}

.v2-detachment-title {
  font-size: 20px;
  font-weight: 900;
  color: var(--v2-secondary);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
}

.v2-traits-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0;
  list-style: none;
}

.v2-trait-name {
  font-weight: 700;
  color: var(--v2-on-surface);
  font-size: 14px;
  text-transform: uppercase;
}

.v2-trait-desc {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 4px;
}

.v2-battle-line-card {
  border-top: 1px solid rgba(79, 215, 240, 0.2);
  padding: 24px;
}

.v2-battle-line-title {
  font-size: 24px;
  font-weight: 900;
  color: var(--v2-primary);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
}

.battle-line-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .battle-line-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .battle-line-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.v2-summary-unit-card {
  background-color: var(--v2-surface-container);
  padding: 16px;
  border-left: 2px solid rgba(79, 215, 240, 0.4);
}

.v2-unit-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.v2-unit-card-name {
  font-weight: 700;
  color: var(--v2-on-surface);
  text-transform: uppercase;
}

.v2-unit-card-pts {
  font-weight: 900;
  color: var(--v2-primary);
  font-size: 14px;
}

.v2-unit-card-equip {
  font-size: 11px;
  color: #64748b;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.unit-stat-bar-v2 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  text-align: center;
  background-color: var(--v2-surface-container-lowest);
  padding: 8px 0;
}

.v2-unit-stat-label {
  font-size: 9px;
  color: #64748b;
  text-transform: uppercase;
}

.v2-unit-stat-val {
  font-size: 12px;
  font-weight: 700;
}

.v2-heavy-support-card {
  border-top: 1px solid rgba(79, 215, 240, 0.2);
  padding: 24px;
}

.v2-heavy-support-title {
  font-size: 24px;
  font-weight: 900;
  color: var(--v2-primary);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
}

.v2-heavy-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.v2-heavy-item-v2 {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px;
  background-color: var(--v2-surface-container);
  transition: background-color 0.3s ease;
}

.v2-heavy-item-v2:hover {
  background-color: var(--v2-surface-container-high);
}

.v2-heavy-img {
  width: 96px;
  height: 96px;
  object-fit: cover;
  border: 1px solid rgba(79, 215, 240, 0.3);
}

.v2-heavy-info {
  flex: 1;
}

.v2-heavy-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.v2-heavy-name {
  font-weight: 700;
  color: var(--v2-on-surface);
  font-size: 20px;
}

.v2-heavy-pts {
  font-weight: 900;
  color: var(--v2-primary);
}

.v2-heavy-desc {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.v2-heavy-integrity {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.v2-integrity-bg {
  height: 4px;
  flex: 1;
  background-color: var(--v2-surface-container-highest);
  overflow: hidden;
}

.v2-integrity-bar {
  height: 100%;
  background-color: var(--v2-primary);
  box-shadow: 0 0 8px rgba(79, 215, 240, 0.5);
}

.v2-integrity-text {
  font-size: 10px;
  color: var(--v2-primary);
  line-height: 1;
}

.v2-strategic-card {
  background-color: var(--v2-surface-container);
  border-top: 1px solid rgba(0, 178, 202, 0.2);
  padding: 24px;
}

.v2-strategic-title {
  font-size: 20px;
  font-weight: 900;
  color: var(--v2-tertiary);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
}

.v2-strategic-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.v2-cp-box {
  background-color: var(--v2-surface-container-low);
  padding: 16px;
  position: relative;
}

.v2-cp-label {
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.v2-cp-val {
  font-size: 30px;
  font-weight: 900;
  color: var(--v2-on-surface);
}

.v2-cp-meta {
  font-size: 14px;
  font-weight: 400;
  color: #64748b;
}

.v2-memo-box {
  padding: 16px;
  border: 1px solid rgba(60, 73, 76, 0.2);
}

.v2-memo-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--v2-primary);
  text-transform: uppercase;
  margin-bottom: 8px;
}

.v2-memo-text {
  font-size: 14px;
  color: #cbd5e1;
  font-style: italic;
  line-height: 1.625;
}

.v2-strategic-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.v2-strat-stat-item {
  background-color: var(--v2-surface-container-highest);
  padding: 12px;
  text-align: center;
}

.v2-strat-stat-label {
  font-size: 9px;
  color: #94a3b8;
  text-transform: uppercase;
}

.v2-strat-stat-val {
  font-size: 20px;
  font-weight: 700;
}
</style>
