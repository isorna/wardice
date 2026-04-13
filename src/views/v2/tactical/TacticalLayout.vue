<template>
  <div class="v2-theme v2-tactical-layout">
    <!-- TopNavBar Implementation -->
    <header class="v2-header tonal-shift-glass v2-tactical-header">
      <div class="v2-header-logo-box">
        <span class="font-headline v2-tactical-logo">TACTICAL COMMAND</span>
      </div>
      <div class="hidden-md-down v2-header-nav">
        <router-link to="/v2/tactical/factions" class="font-headline v2-nav-link" active-class="active">Factions</router-link>
        <router-link to="/v2/tactical/builder" class="font-headline v2-nav-link" active-class="active">Active Army</router-link>
        <router-link to="/v2/tactical/unit" class="font-headline v2-nav-link" active-class="active">Unit Intel</router-link>
      </div>
      <div class="v2-header-actions">
        <div class="v2-search-box">
          <span class="material-symbols-outlined v2-search-icon">search</span>
          <input class="font-label v2-search-input" placeholder="FILTER ENCRYPTED FEED..." type="text"/>
        </div>
        <span class="material-symbols-outlined v2-action-icon">notifications_active</span>
        <span class="material-symbols-outlined v2-action-icon">settings</span>
      </div>
    </header>

    <!-- SideNavBar Implementation -->
    <aside class="v2-aside hidden-lg-down v2-tactical-aside">
      <div class="v2-aside-profile">
        <div class="v2-profile-box">
          <div class="v2-profile-avatar">
            <span class="material-symbols-outlined v2-avatar-icon">account_circle</span>
          </div>
          <div>
            <div class="font-headline v2-profile-name">STRATOS-01</div>
            <div class="v2-profile-rank">Field Commander</div>
          </div>
        </div>
      </div>
      <nav class="v2-aside-nav">
        <router-link to="/v2/tactical/factions" class="v2-side-link" active-class="active">
          <span class="material-symbols-outlined">shield</span>
          <span class="font-headline">Factions</span>
        </router-link>
        <router-link to="/v2/tactical/builder" class="v2-side-link" active-class="active">
          <span class="material-symbols-outlined">military_tech</span>
          <span class="font-headline">Active Army</span>
        </router-link>
        <router-link to="/v2/tactical/unit" class="v2-side-link" active-class="active">
          <span class="material-symbols-outlined">biotech</span>
          <span class="font-headline">Unit Intel</span>
        </router-link>
        <a class="v2-side-link" href="#">
          <span class="material-symbols-outlined">inventory_2</span>
          <span class="font-headline">Archive</span>
        </a>
      </nav>
      <button class="v2-button v2-button-primary v2-aside-btn">
        <span class="material-symbols-outlined">add_box</span>
        NEW ARMY
      </button>
    </aside>

    <!-- Main Content Canvas -->
    <main class="v2-main tactical-main-bg v2-tactical-main">
      <div class="content-container">
        <router-view />
      </div>
    </main>

    <!-- BottomNavBar Implementation -->
    <nav class="v2-bottom-nav lg-hidden v2-tactical-bottom-nav">
      <router-link to="/v2/tactical/factions" class="v2-bottom-link" active-class="active">
        <span class="material-symbols-outlined">hub</span>
        <span class="font-body v2-bottom-label">HQ</span>
      </router-link>
      <router-link to="/v2/tactical/builder" class="v2-bottom-link" active-class="active">
        <span class="material-symbols-outlined">grid_view</span>
        <span class="font-body v2-bottom-label">Barracks</span>
      </router-link>
      <router-link to="/v2/tactical/unit" class="v2-bottom-link" active-class="active">
        <span class="material-symbols-outlined">analytics</span>
        <span class="font-body v2-bottom-label">Intel</span>
      </router-link>
      <router-link to="/v2/tactical/summary" class="v2-bottom-link" active-class="active">
        <span class="material-symbols-outlined">format_list_bulleted</span>
        <span class="font-body v2-bottom-label">Summary</span>
      </router-link>
    </nav>

    <!-- FAB for Quick Creation (Mobile Only) -->
    <button class="v2-fab md-hidden v2-tactical-fab">
      <span class="material-symbols-outlined">add</span>
    </button>
  </div>
</template>

<style>
@import '@/style.v2.css';
@import '@/wardice.app.v2.css';
</style>

<style scoped>
.v2-tactical-layout {
  display: flex;
  flex-direction: column;
}

.v2-tactical-header {
  border-bottom: 1px solid rgba(8, 71, 93, 0.3);
  background-color: rgba(2, 6, 23, 0.8);
  backdrop-filter: blur(16px);
  box-shadow: 0 0 15px rgba(79, 215, 240, 0.1);
}

.v2-header-logo-box {
  display: flex;
  align-items: center;
  gap: 16px;
}

.v2-tactical-logo {
  color: var(--v2-primary);
  font-weight: 900;
  letter-spacing: -0.05em;
  font-style: italic;
  font-size: 20px;
  text-transform: uppercase;
}

.v2-header-nav {
  display: flex;
  gap: 32px;
  align-items: center;
  height: 100%;
}

.v2-nav-link {
  color: #64748b;
  text-decoration: none;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 14px;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 8px;
  transition: all 0.3s ease;
}

.v2-nav-link:hover {
  color: #5eead4;
  background-color: rgba(21, 94, 117, 0.2);
}

.v2-nav-link.active {
  color: var(--v2-primary);
  border-bottom: 2px solid var(--v2-primary);
}

.v2-header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--v2-primary);
}

.v2-search-box {
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--v2-surface-container-lowest);
  border-bottom: 1px solid var(--v2-outline-variant);
  padding: 4px 12px;
}

.v2-search-icon {
  font-size: 14px;
  margin-right: 8px;
}

.v2-search-input {
  background: transparent;
  border: none;
  color: white;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  width: 128px;
  padding: 0;
}

.v2-action-icon {
  cursor: pointer;
}

.v2-tactical-aside {
  border-right: 1px solid rgba(8, 71, 93, 0.2);
  background-color: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(24px);
}

.v2-aside-profile {
  margin-bottom: 40px;
  padding: 0 16px;
}

.v2-profile-box {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.v2-profile-avatar {
  width: 40px;
  height: 40px;
  background-color: var(--v2-surface-container-highest);
  border: 1px solid rgba(79, 215, 240, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.v2-avatar-icon {
  color: var(--v2-primary);
  font-variation-settings: 'FILL' 1;
}

.v2-profile-name {
  color: var(--v2-tertiary);
  font-weight: 800;
  font-size: 14px;
  letter-spacing: -0.025em;
}

.v2-profile-rank {
  color: #94a3b8;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.v2-aside-nav {
  flex-grow: 1;
}

.v2-side-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #94a3b8;
  text-decoration: none;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.025em;
  transition: all 0.3s ease;
}

.v2-side-link:hover {
  background-color: rgba(30, 41, 59, 0.5);
  color: #bae6fd;
}

.v2-side-link.active {
  background-color: rgba(79, 215, 240, 0.1);
  color: var(--v2-primary);
  border-right: 4px solid var(--v2-primary);
}

.v2-aside-btn {
  margin: auto 16px 0;
  width: calc(100% - 32px);
}

.v2-tactical-main {
  padding: 96px 24px 96px;
}

.tactical-main-bg {
  background: radial-gradient(circle at 50% 50%, rgba(5, 34, 47, 1) 0%, rgba(0, 22, 32, 1) 100%);
}

.v2-tactical-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(2, 6, 23, 0.9);
  backdrop-filter: blur(16px);
  border-top: 1px solid rgba(79, 215, 240, 0.2);
  z-index: 50;
}

.v2-bottom-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #64748b;
  text-decoration: none;
  padding: 8px;
  transition: transform 0.2s ease;
}

.v2-bottom-link:active {
  transform: scale(0.9);
}

.v2-bottom-link.active {
  color: var(--v2-primary);
  background-color: rgba(8, 51, 68, 0.4);
  border-top: 2px solid var(--v2-primary);
}

.v2-bottom-label {
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.v2-tactical-fab {
  position: fixed;
  bottom: 80px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 40;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: var(--v2-primary);
  color: var(--v2-on-primary);
  box-shadow: 0 0 20px rgba(79, 215, 240, 0.4);
}

.v2-tactical-fab:active {
  transform: scale(0.95);
}

@media (min-width: 1024px) {
  .v2-tactical-main {
    padding-left: 288px !important;
  }
}

@media (max-width: 1023px) {
  .lg-hidden {
    display: flex !important;
  }
  .hidden-lg-down {
    display: none !important;
  }
}

@media (min-width: 1024px) {
  .lg-hidden {
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
