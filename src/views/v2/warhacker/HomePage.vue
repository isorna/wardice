<template>
  <div class="v2-warhacker-home">
    <!-- Hero HUD Section (Desktop: Screen 11, Mobile: Screen 12) -->
    <section class="v2-warhacker-hero-container">
      <div class="v2-warhacker-hero-main group">
        <div class="v2-hero-glow"></div>
        <div class="v2-hero-content">
          <div class="v2-hero-status-row">
            <span class="v2-hero-tag">Sector Alpha-9</span>
            <span class="v2-mobile-status">CONNECTION STATUS: SECURE</span>
          </div>
          <h1 class="font-headline v2-hero-title">
            COMMAND <span class="v2-text-glow">LINK</span> <br class="hidden-mobile"/>ESTABLISHED
          </h1>
          <p class="v2-hero-desc">
            Deploy your tactical assets. Synchronize orbital support. Override enemy network protocols. Your legion awaits the neural handshake.
          </p>
          <div class="v2-hero-actions">
            <button class="v2-warhacker-btn-primary">
              INITIALIZE NEURAL LINK
              <span class="material-symbols-outlined hidden-mobile">arrow_forward</span>
            </button>
            <button class="v2-warhacker-btn-outline">
              SYSTEM DIAGNOSTICS
              <span class="material-symbols-outlined opacity-50">analytics</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Terminal / Status Panel (Desktop Only) -->
      <div class="v2-warhacker-terminal hidden-mobile">
        <div class="terminal-header">
          <h3 class="font-headline">Terminal Status</h3>
          <div class="terminal-dots">
            <div class="dot bg-error"></div>
            <div class="dot bg-secondary"></div>
            <div class="dot bg-primary"></div>
          </div>
        </div>
        <div class="terminal-body font-mono">
          <p class="animate-pulse">&gt; UPLINK SECURED...</p>
          <p>&gt; AUTHENTICATING COMMANDER_01...</p>
          <p class="text-secondary">&gt; WARNING: VOID INTERFERENCE DETECTED</p>
          <p>&gt; SCRYING FACTION DATA: 100%</p>
          <p>&gt; ASSET RECOVERY: COMPLETE</p>
          <p>&gt; LOCAL TIME: 04:22:19_ZULU</p>
          <p>&gt; ENCRYPTION: AES-2048-WAR</p>
          <p class="text-logs-header">// RECENT LOGS</p>
          <p class="text-log-entry">04:21 - List 'Cinder-Fall' updated</p>
          <p class="text-log-entry">04:19 - New mercenary pack added</p>
          <p class="text-log-entry">04:15 - Deployment zone identified</p>
        </div>
        <div class="terminal-footer">
          <span>WARDICE.APP CORE v4.0.2</span>
          <span class="material-symbols-outlined v2-footer-icon">bolt</span>
        </div>
      </div>
    </section>

    <!-- Navigation Bento Grid / Tactical Modules -->
    <section class="v2-bento-grid">
      <div v-for="mod in modules" :key="mod.title" class="v2-bento-item group">
        <img class="v2-bento-bg" :src="mod.image" :alt="mod.title"/>
        <div class="v2-bento-overlay"></div>
        <div class="v2-bento-content">
          <span class="material-symbols-outlined v2-bento-icon" :style="{ color: mod.color }">{{ mod.icon }}</span>
          <h3 class="font-headline">{{ mod.title }}</h3>
          <p>{{ mod.description }}</p>
        </div>
      </div>
    </section>

    <!-- Active Army Lists (Desktop: Screen 11) / Recent Lists (Mobile: Screen 12) -->
    <section class="v2-deployment-section">
      <div class="v2-deployment-header">
        <div>
          <h2 class="font-headline v2-deployment-title">Deployment Lists</h2>
          <p class="font-headline v2-deployment-subtitle hidden-mobile">Active Neural Configurations</p>
        </div>
        <button class="v2-view-all-btn">View All Files</button>
      </div>

      <div class="v2-lists-grid">
        <div v-for="list in recentLists" :key="list.name" class="v2-list-card group">
          <div class="list-pts-badge">{{ list.points }} PTS</div>
          <div class="list-card-inner glass-panel">
            <div class="list-image-box">
              <img :src="list.image" :alt="list.name"/>
            </div>
            <div class="list-info">
              <h4 class="font-headline">{{ list.name }}</h4>
              <div class="list-tags">
                <span class="text-secondary">{{ list.system }}</span>
                <span class="text-outline">{{ list.faction }}</span>
              </div>
              <div class="list-meta">
                <span class="flex-center gap-1"><span class="material-symbols-outlined v2-meta-icon">calendar_today</span> {{ list.lastAccess }}</span>
                <span class="flex-center gap-1 hidden-mobile"><span class="material-symbols-outlined v2-meta-icon">format_list_bulleted</span> {{ list.units }} Units</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAB -->
    <button class="v2-warhacker-fab">
      <span class="material-symbols-outlined v2-fab-icon">add</span>
    </button>

    <!-- Visual Accents (HUD Elements) (Desktop Only) -->
    <div class="v2-hud-accents hidden-mobile">
      <div class="v2-hud-top-right">
        SYSTEM_OVERRIDE: ACTIVE<br/>
        LOCAL_TIME: 22:41:09<br/>
        SIGNAL_STRENGTH: 98%<br/>
        ENCRYPTION: AES-ARCANE-256
      </div>
      <div class="v2-hud-bottom-left">
        <div class="v2-hud-line"></div>
        <div class="v2-hud-text">Visualizing Strategic Projection</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const modules = [
  {
    title: 'Faction Intel',
    icon: 'public',
    color: '#4fd7f0',
    description: 'Browse the Encyclopedia of War',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCG_gx_CpieMRyG0sGdVYdxKR19rFh7DZXml18u6zdbQbQdWcajB5n39pb7UA5RuKs8g6PA0JVE5FtdtbvNk5wdbSz70l0NJIUA3ECY1cQRW5Of20feqn3m6Ct40t6Rv7xW1KKHWHMueMFHcMNUHmTdKxaaTRJAdkfBmrJncA8I-8O0342hlsTpz-TChsdImDY3MXzFM8uVbgfG01RjwHhvMWEsPxf_Gr8hmM41ZJNBcviOe-HNIvloaQVF3A9G71o9-_m6t-zgqklY'
  },
  {
    title: 'Active Engagement',
    icon: 'swords',
    color: '#ffb68b',
    description: 'Join Current Live Game Session',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOPMzMQvXJWZSUjky1GGso0XCzXBtTsGO-KqyS3yybcj11mD0x8Q809iJDQxuHojinap54-Fil6_5LFxWQAVHP5cCTLUmdehJnG0D0XlfHRWpb51w-FTRpmsO18huQ9vWXy5sRUqZVcGuhFdT0XBDhpu8l8DMb1CdjQrI1v1MrI2o1H8IRi1Q_9tDS4lrtKp9FfdTRYbZrcmE9R-oiW6l9R8Z5v6rajhZkbsOKp7vIOcwg90BP2bfgZ04Q54nGFxBwP3KGy1a-uc3F'
  },
  {
    title: 'Unit Archives',
    icon: 'database',
    color: '#00daf3',
    description: 'Manage Your Tactical Collection',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAc6zriupNzKLzIubMbCWiyr4Y_t3TlaNEBv3XU0N3YuRbrsZmXthKfioxWg8dwyy-Xx4j3eW0RKb_4Pj6P16aWZte3zvSTuqfzYxhC-FImT5Ww8ROOAr2J-JcDgQEA6-JOLyPfYKl32y2uEcp9z-2DsZDeUAx3pGiEZDYNszLJY1WcUt3PeJbnqfNXR7nLXBYlmrJG-eaXu7pRla8IuNU2FmHNmHnFlSI66X47kqUzTCNwfZ1c2nzqaHyXJnXyXKO4iEAagYeEKnN4'
  }
]

const recentLists = [
  {
    name: 'Iron Aegis Legion',
    points: 75,
    lastAccess: '2 Days Ago',
    system: 'Warmachine',
    faction: 'Khador',
    units: 14,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3D-L9l7N8thHmdLezosBwmgYWasT7PM4LCEVy3KUE1aOO0Wvf3DFrKZd_sSHdEIA0t303p__GQoZ5AlxSXWjHTJgLl-OiOuCqz1rcotyslLoWRzN30QVyvYhZrgaRR1X-ZWn8nokJ7p9EDyJaZK6rg1yslcxg8MlcqN04wOHuv2TIrPzlhET_Wyx_fjYzGSwZ4BtB0XQ6vTxLLtA4pIKw1--wbxX-uK2D-QsBFRzqLP4k6PfKstTThMwJWpkE1VvZoJ9-a4tvZL1e'
  },
  {
    name: 'Shadow Protocol',
    points: 100,
    lastAccess: '5 Hours Ago',
    system: 'Hordes',
    faction: 'Circle Orboros',
    units: 9,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYloeRmij8pS8kpF7_h2bDZegU8b_Dtmkivsx-PrS5ig4LCXlMI0lcWzN_mv068BawKcerrjJJWkrT7ZouJj4UKgEjh6eB90ofTGsiBG-Rrgc3V46tRhrMTAhOQFba0F2wij3pZl5OPErye-fFwF7BzNE_5Np-fHSXTCv7Y3ekMoid3rEVAuDZyeWw2lEGi1Y8bcXFYFOXIp9o8HaCk5h4FDVfZpQZJISlsyFu9_DZ4mERYE5UO6m5eDy81_fhWqav4yD3nnXec6mM'
  }
]
</script>

<style scoped>
.v2-warhacker-home {
  padding: 32px 16px;
  box-sizing: border-box;
}

@media (min-width: 1024px) {
  .v2-warhacker-home {
    padding-left: 32px;
    padding-right: 32px;
  }
}

.v2-warhacker-hero-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 48px;
}

@media (min-width: 1024px) {
  .v2-warhacker-hero-container {
    grid-template-columns: repeat(12, 1fr);
  }
}

.v2-warhacker-hero-main {
  position: relative;
  overflow: hidden;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-left: 4px solid var(--v2-primary);
  background-color: var(--v2-surface-container-low);
}

@media (min-width: 1024px) {
  .v2-warhacker-hero-main {
    grid-column: span 8;
    min-height: 400px;
  }
}

.v2-hero-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top right, rgba(79, 215, 240, 0.2), transparent);
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.v2-warhacker-hero-main:hover .v2-hero-glow {
  opacity: 0.7;
}

.v2-hero-content {
  position: relative;
  z-index: 10;
  padding: 32px;
}

.v2-hero-status-row { margin-bottom: 16px; }

.v2-hero-tag {
  background-color: rgba(79, 215, 240, 0.2);
  color: var(--v2-primary);
  padding: 4px 12px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border: 1px solid rgba(79, 215, 240, 0.3);
}

.v2-mobile-status {
  display: block;
  margin-top: 8px;
  font-size: 10px;
  color: var(--v2-primary);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.7;
}

@media (min-width: 768px) {
  .v2-mobile-status { display: none; }
  .v2-hero-tag { display: inline-block; }
}

@media (max-width: 767px) {
  .v2-hero-tag { display: none; }
}

.v2-hero-title {
  font-size: 36px;
  font-weight: 900;
  color: var(--v2-on-surface);
  letter-spacing: -0.05em;
  line-height: 1;
  margin-bottom: 24px;
}

@media (min-width: 768px) {
  .v2-hero-title { font-size: 72px; }
}

.v2-text-glow {
  color: var(--v2-primary);
  text-shadow: 0 0 12px rgba(79, 215, 240, 0.6);
}

.v2-hero-desc {
  color: var(--v2-on-surface-variant);
  max-width: 512px;
  font-size: 14px;
  margin-bottom: 32px;
  line-height: 1.625;
  font-weight: 300;
}

@media (min-width: 768px) {
  .v2-hero-desc { font-size: 16px; }
}

.v2-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.v2-warhacker-btn-primary {
  background-color: var(--v2-primary);
  color: var(--v2-on-primary);
  font-family: var(--v2-font-headline);
  font-weight: 900;
  padding: 16px 40px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: none;
  cursor: pointer;
  box-shadow: 0 0 30px rgba(79, 215, 240, 0.2);
  transition: all 0.3s ease;
}

.v2-warhacker-btn-primary:hover {
  transform: scale(1.05);
}

.v2-warhacker-btn-outline {
  background-color: transparent;
  border: 1px solid var(--v2-outline-variant);
  color: var(--v2-on-surface);
  font-family: var(--v2-font-headline);
  font-weight: 900;
  padding: 16px 40px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.v2-warhacker-btn-outline:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.v2-warhacker-terminal {
  grid-column: span 4;
  display: flex;
  flex-direction: column;
  background-color: rgba(5, 34, 47, 0.4);
  backdrop-filter: blur(12px);
  border-right: 4px solid rgba(255, 182, 139, 0.4);
  padding: 24px;
  box-sizing: border-box;
}

.terminal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--v2-outline-variant);
  padding-bottom: 8px;
}

.terminal-header h3 {
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--v2-secondary);
}

.terminal-dots { display: flex; gap: 4px; }
.terminal-dots .dot { width: 8px; height: 8px; }
.bg-error { background-color: var(--v2-error); }
.bg-secondary { background-color: var(--v2-secondary); }
.bg-primary { background-color: var(--v2-primary); }

.terminal-body {
  flex-grow: 1;
  font-size: 11px;
  line-height: 1.625;
  color: rgba(79, 215, 240, 0.8);
  overflow: hidden;
  text-shadow: 0 0 8px rgba(79, 215, 240, 0.5);
}

.text-secondary { color: var(--v2-secondary); }
.text-logs-header { color: var(--v2-outline); margin-top: 16px; }
.text-log-entry { color: var(--v2-outline); opacity: 0.8; }

.terminal-footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--v2-outline-variant);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
  color: var(--v2-outline);
  letter-spacing: 0.1em;
}

.v2-footer-icon { font-size: 14px; color: var(--v2-primary); }

.v2-bento-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 48px;
}

@media (min-width: 768px) {
  .v2-bento-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.v2-bento-item {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  border: 1px solid var(--v2-outline-variant);
  cursor: pointer;
  transition: border-color 0.3s ease;
}

@media (min-width: 768px) {
  .v2-bento-item { height: 256px; aspect-ratio: auto; }
}

.v2-bento-item:hover {
  border-color: var(--v2-primary);
}

.v2-bento-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.4;
  transition: transform 0.7s ease;
}

.v2-bento-item:hover .v2-bento-bg {
  transform: scale(1.1);
}

.v2-bento-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--v2-background), transparent);
}

.v2-bento-content {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 24px;
}

.v2-bento-icon { margin-bottom: 8px; }

.v2-bento-content h3 {
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.v2-bento-content p {
  font-size: 12px;
  color: var(--v2-on-surface-variant);
  font-weight: 500;
}

.v2-deployment-section { margin-top: 64px; }

.v2-deployment-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 32px; }

.v2-deployment-title { font-size: 24px; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; }

.v2-deployment-subtitle { color: var(--v2-outline); font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; }

.v2-view-all-btn {
  color: var(--v2-primary);
  font-family: var(--v2-font-headline);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: transparent;
  border: none;
  cursor: pointer;
}

.v2-view-all-btn:hover { text-decoration: underline; }

.v2-lists-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

@media (min-width: 1024px) {
  .v2-lists-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.v2-list-card {
  position: relative;
}

.list-pts-badge {
  position: absolute;
  top: -12px;
  right: 16px;
  background-color: var(--v2-primary);
  color: var(--v2-on-primary);
  font-family: var(--v2-font-headline);
  font-weight: 900;
  padding: 8px 16px;
  font-size: 20px;
  z-index: 10;
}

.list-card-inner {
  padding: 32px;
  display: flex;
  gap: 24px;
  background-color: rgba(5, 34, 47, 0.4);
  transition: background-color 0.3s ease;
}

.v2-list-card:hover .list-card-inner {
  background-color: var(--v2-surface-container-high);
}

.list-image-box {
  width: 128px;
  height: 128px;
  background-color: var(--v2-surface-container-highest);
  border: 1px solid var(--v2-outline-variant);
  overflow: hidden;
  flex-shrink: 0;
}

.list-image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) brightness(0.75);
  transition: all 0.3s ease;
}

.v2-list-card:hover .list-image-box img {
  filter: grayscale(0);
}

.list-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.list-info h4 {
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.v2-list-card:hover .list-info h4 {
  color: var(--v2-primary);
}

.list-tags {
  display: flex; gap: 8px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px;
}

.list-meta {
  display: flex; gap: 24px; font-size: 11px; font-weight: 700; color: var(--v2-outline); text-transform: uppercase; letter-spacing: 0.1em;
}

.v2-meta-icon { font-size: 12px; }

.v2-warhacker-fab {
  position: fixed;
  bottom: 96px;
  right: 24px;
  width: 64px;
  height: 64px;
  background-color: var(--v2-primary);
  color: var(--v2-on-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  border: none;
  box-shadow: 0 0 20px rgba(79, 215, 240, 0.4);
  cursor: pointer;
  z-index: 40;
  transition: all 0.3s ease;
}

@media (min-width: 768px) {
  .v2-warhacker-fab { bottom: 32px; right: 32px; }
}

.v2-fab-icon { font-size: 30px; }

.v2-warhacker-fab:hover {
  transform: scale(1.05);
}

.v2-warhacker-fab:active {
  transform: scale(0.9);
}

.v2-hud-accents {
  pointer-events: none;
  opacity: 0.2;
}

.v2-hud-top-right {
  position: fixed;
  top: 80px;
  right: 16px;
  font-family: monospace;
  font-size: 8px;
  color: var(--v2-primary);
  line-height: 1.2;
  text-align: right;
  z-index: 60;
}

.v2-hud-bottom-left {
  position: fixed;
  bottom: 32px;
  left: 272px; /* Layout aside is 256px + some margin */
  z-index: 60;
  opacity: 0.5;
}

.v2-hud-line {
  width: 192px;
  height: 1px;
  background: linear-gradient(to right, var(--v2-primary), transparent);
}

.v2-hud-text {
  margin-top: 4px;
  font-size: 8px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--v2-primary);
}

.flex-center { display: flex; align-items: center; }
.gap-1 { gap: 4px; }

@media (max-width: 767px) {
  .hidden-mobile { display: none !important; }
}
</style>
