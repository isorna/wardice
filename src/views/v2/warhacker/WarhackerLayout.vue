<template>
  <div class="v2-theme warhacker-layout">
    <!-- TopAppBar -->
    <header class="v2-header warhacker-header">
      <div class="v2-header-left">
        <span class="material-symbols-outlined v2-header-icon">radar</span>
        <span class="font-headline warhacker-logo">WARHACKER_HUD</span>
      </div>
      <div class="hidden-lg-down v2-header-center">
        <div class="v2-header-stat">
          <span class="font-label v2-stat-tag">VANGUARD-79</span>
          <div class="font-headline v2-stat-time">52:14</div>
        </div>
        <div class="v2-header-round">
          <span class="font-label v2-round-tag">Round 3</span>
          <div class="font-headline v2-round-status">Active Turn</div>
        </div>
      </div>
      <div class="v2-header-right">
        <span class="material-symbols-outlined">signal_cellular_alt</span>
        <span class="material-symbols-outlined v2-cursor-pointer">settings</span>
      </div>
    </header>

    <!-- SideNavBar (Desktop) -->
    <aside class="v2-aside hidden-md-down warhacker-aside">
      <div class="v2-aside-profile">
        <div class="v2-profile-box">
          <div class="v2-profile-avatar">
             <span class="material-symbols-outlined v2-avatar-icon">account_circle</span>
          </div>
          <div>
            <div class="font-headline v2-profile-name">STRATOS-01</div>
            <div class="font-label v2-profile-phase">Phase: Engaged</div>
          </div>
        </div>
      </div>
      <nav class="v2-side-nav">
        <router-link to="/v2/warhacker/home" class="warhacker-side-link" active-class="active">
          <span class="material-symbols-outlined">grid_view</span>
          <span class="font-label">Competitive View</span>
        </router-link>
        <router-link to="/v2/warhacker/factions" class="warhacker-side-link" active-class="active">
          <span class="material-symbols-outlined">groups</span>
          <span class="font-label">Factions</span>
        </router-link>
        <router-link to="/v2/warhacker/builder" class="warhacker-side-link" active-class="active">
          <span class="material-symbols-outlined">format_list_bulleted</span>
          <span class="font-label">Army Lists</span>
        </router-link>
        <router-link to="/v2/warhacker/intel" class="warhacker-side-link" active-class="active">
          <span class="material-symbols-outlined">query_stats</span>
          <span class="font-label">Intel</span>
        </router-link>
      </nav>
      <div class="v2-aside-footer">
        <button class="v2-button warhacker-action-button">
          END ACTIVE TURN
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="v2-main warhacker-main">
      <router-view />
    </main>

    <!-- BottomNavBar (Mobile) -->
    <nav class="warhacker-bottom-nav md-hidden">
      <router-link to="/v2/warhacker/factions" class="warhacker-bottom-link" active-class="active">
        <span class="material-symbols-outlined">groups</span>
        <span class="font-headline">Factions</span>
      </router-link>
      <router-link to="/v2/warhacker/builder" class="warhacker-bottom-link" active-class="active">
        <span class="material-symbols-outlined">format_list_bulleted</span>
        <span class="font-headline">Army</span>
      </router-link>
      <router-link to="/v2/warhacker/intel" class="warhacker-bottom-link" active-class="active">
        <span class="material-symbols-outlined">query_stats</span>
        <span class="font-headline">Intel</span>
      </router-link>
      <router-link to="/v2/warhacker/home" class="warhacker-bottom-link" active-class="active">
        <span class="material-symbols-outlined">history_edu</span>
        <span class="font-headline">Logs</span>
      </router-link>
    </nav>

    <!-- UI Overlay elements -->
    <div class="warhacker-overlay-frame"></div>
  </div>
</template>

<style>
@import '@/style.v2.css';
@import '@/wardice.app.v2.css';
</style>

<style scoped>
.warhacker-layout {
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle at 50% -20%, #05222f 0%, #001620 70%);
}

.warhacker-header {
  background-color: rgba(8, 51, 68, 0.2);
  backdrop-filter: blur(24px);
  border-bottom: 2px solid rgba(79, 215, 240, 0.3);
  box-shadow: 0 0 20px rgba(0, 178, 202, 0.15);
}

.v2-header-left { display: flex; align-items: center; gap: 12px; }
.v2-header-icon { color: var(--v2-primary); }

.warhacker-logo {
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 0.2em;
  color: var(--v2-primary);
  filter: drop-shadow(0 0 8px rgba(79, 215, 240, 0.6));
  text-transform: uppercase;
}

.v2-header-center {
  display: flex;
  align-items: center;
  gap: 32px;
  background-color: var(--v2-surface-container-low);
  border-left: 1px solid rgba(134, 147, 150, 0.2);
  border-right: 1px solid rgba(134, 147, 150, 0.2);
  padding: 0 32px;
  height: 100%;
}

.v2-header-stat { display: flex; flex-direction: column; align-items: center; }
.v2-stat-tag { font-size: 8px; color: var(--v2-primary); text-transform: uppercase; letter-spacing: 0.1em; }
.v2-stat-time { font-size: 20px; font-weight: 700; color: var(--v2-primary); }

.v2-header-round {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
  border-left: 1px solid rgba(134, 147, 150, 0.1);
  border-right: 1px solid rgba(134, 147, 150, 0.1);
}
.v2-round-tag { font-size: 8px; color: var(--v2-outline); text-transform: uppercase; letter-spacing: 0.2em; }
.v2-round-status { font-size: 12px; font-weight: 900; color: var(--v2-tertiary); letter-spacing: 0.1em; text-transform: uppercase; }

.v2-header-right { display: flex; align-items: center; gap: 16px; color: var(--v2-primary); }
.v2-cursor-pointer { cursor: pointer; }

.warhacker-aside {
  background-color: rgba(2, 6, 23, 0.4);
  backdrop-filter: blur(32px);
  border-right: 1px solid rgba(79, 215, 240, 0.2);
}

.v2-aside-profile { margin-bottom: 32px; padding: 0 8px; }
.v2-profile-box { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
.v2-profile-avatar { width: 40px; height: 40px; border: 1px solid rgba(79, 215, 240, 0.5); display: flex; align-items: center; justify-content: center; padding: 4px; }
.v2-avatar-icon { color: var(--v2-primary); }
.v2-profile-name { color: var(--v2-primary); font-weight: 700; font-size: 14px; letter-spacing: 0.1em; }
.v2-profile-phase { font-size: 10px; color: rgba(79, 215, 240, 0.6); text-transform: uppercase; }

.v2-side-nav { flex-grow: 1; display: flex; flex-direction: column; gap: 4px; }

.warhacker-side-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #155e75;
  text-decoration: none;
  font-size: 12px;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.warhacker-side-link:hover {
  background-color: rgba(8, 51, 68, 0.3);
  color: #a5f3fc;
}

.warhacker-side-link.active {
  background-color: rgba(79, 215, 240, 0.1);
  color: var(--v2-primary);
  border-right: 4px solid var(--v2-primary);
}

.v2-aside-footer { margin-top: auto; padding: 0 8px; }

.warhacker-action-button {
  background-color: var(--v2-primary-container);
  color: white;
  padding: 12px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  border: none;
  cursor: pointer;
  width: 100%;
}

.warhacker-action-button:hover {
  background-color: var(--v2-primary);
}

.warhacker-main {
  background: transparent;
  padding-top: 64px;
}

.warhacker-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(8, 51, 68, 0.4);
  backdrop-filter: blur(32px);
  border-top: 1px solid rgba(79, 215, 240, 0.2);
  padding-bottom: env(safe-area-inset-bottom);
  box-sizing: border-box;
  z-index: 50;
}

.warhacker-bottom-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(21, 94, 117, 0.8);
  text-decoration: none;
  padding: 4px 8px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.warhacker-bottom-link.active {
  color: var(--v2-primary);
  border-top: 2px solid var(--v2-primary);
  background-color: rgba(79, 215, 240, 0.05);
}

.warhacker-overlay-frame {
  position: fixed;
  inset: 0;
  pointer-events: none;
  border: 12px solid rgba(79, 215, 240, 0.05);
  z-index: 60;
}

@media (min-width: 768px) {
  .warhacker-main {
    margin-left: 256px !important;
  }
}

@media (max-width: 1023px) {
  .hidden-lg-down {
    display: none !important;
  }
}

@media (max-width: 767px) {
  .md-hidden {
    display: flex !important;
  }
  .hidden-md-down {
    display: none !important;
  }
}

@media (min-width: 768px) {
  .md-hidden {
    display: none !important;
  }
}
</style>
