<template>
  <div class="v2-factions-page">
    <!-- Dashboard Header -->
    <div class="v2-page-header">
      <h1 class="font-headline v2-title-main">Select <span class="v2-text-italic">Faction</span></h1>
      <div class="v2-header-accent">
        <div class="v2-accent-line"></div>
        <p class="font-label v2-header-subtitle">Deploy your arcane legion to the frontlines</p>
      </div>
    </div>
    <!-- Faction Bento Grid -->
    <div class="faction-bento-grid">
      <div v-for="faction in factions" :key="faction.id" class="faction-card-v2 chiseled-top inner-glow">
        <div class="card-gradient-overlay"></div>
        <img :alt="faction.name" class="card-bg-image" :src="faction.image"/>
        <div class="card-content-v2">
          <div class="card-top-right">
            <div class="faction-code-badge">{{ faction.code }}</div>
          </div>
          <div class="faction-info-box">
            <div class="faction-type-row">
              <span class="material-symbols-outlined faction-type-icon">{{ faction.icon }}</span>
              <span class="font-label faction-type-label">{{ faction.type }}</span>
            </div>
            <h3 class="font-headline faction-name-v2">{{ faction.name }}</h3>
          </div>
          <p class="font-body faction-desc-v2">{{ faction.description }}</p>
          <button class="v2-button v2-button-outline faction-btn-v2">Initialize Command</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const factions = [
  { id: 1, name: 'Cryx', code: 'CRX', type: 'Necro-Industrial', icon: 'skull', description: 'The Nightmare Empire rises from the Scharde Isles, fueled by necromancy and dragon blight.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8gPxeQx_3lDUpLTgay69R-rsFUAxhWvk2arjev0y7gSLepW4i_fMa6tdwm_k3OXKRolFqYvIEjy7j-XKXW5-bw7NhcG_gtH_sugTk6A2lBBARWPxFHtTcUjX_P0xPSgp6Wy3_PrOEI4jmYRVcrAyBnebdqTmz9ah7STaYtMdZ-2xL0Tm7XegAQpGuq_vF6Ph2hOdFwdlhjewHG_FspJFjtN_UlGFzROopX6Txip_NVShTCTtsC84yjj00B6AFyZt4iog8rewfB4fy' },
  { id: 2, name: 'Cygnar', code: 'CYG', type: 'Storm-Tech', icon: 'bolt', description: 'Master of lightning and sophisticated steam-tech, defending the heart of the Iron Kingdoms.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaFvnT5hjY5V46Qp9-StA3eLb1aYDKiV53dgDO8Gt7tXEvaR-HlY_VaVq0CLXK5P6Ql0h6VsiYhSGeJekYHMI_kr2u9SMx_kJn889C2W8FEEKBB_6LPFruRGv2uOUBKimUmH7OPv7tCRz47UBqb9FqyyIrqHEKgficZnNTm7nBmSHnYZxeXMyGwkdx0HYkDiW9Pvk0SHF7UCtp4-Kk1h2ROyP-SYgRKZsGEgY5_kGa0BI0I8rN_7P3MXv0LsUHcyLAHZzyCA952y31' },
  { id: 3, name: 'Khador', code: 'KHA', type: 'Heavy Armor', icon: 'shield', description: 'The Motherland\'s brute force, fielding massive warjacks that crush all in their path.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDj-2Iq9XzvZVZB8XVRUMZYi5ZJb35ObsNOfU_QZV2vA2D9_FvQ1Pebo8u6DmKtFitdy5TNFICAjFIQIE-azU1DcE2NKQU2Kv3CWpFBFwjA3fQBUBbW3tofjX49rebyuZS4yfbq1d1FZ5wQs6hZOpIi452bVn8zynYxv3hM8NBVUd-qBMj18GldB9IigemEWFRt0v5Une7RzDFSsrTImyChvTNNuyPJqnkx5p8OIliZ5fabxTqj6gxTjaEsgl0gjuUlI-6vfUVAlKEl' },
  { id: 4, name: 'Protectorate', code: 'MEN', type: 'Holy Zeal', icon: 'local_fire_department', description: 'Fanatical warriors of Menoth, purging the unfaithful with cleansing fire and holy law.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUAZ6TzQIAVLKLQWCWxMJsMOkq2FuWtaAWyKHDDb7FhGV0ClQT7BTi2j311vqcxYquDoy_1BKzTbBVDX37SA5RrvEdif0D2GMRUFp33JkloI5Q9Ejud0kApe-GITBwnpQm8OhTM-J9YlISg0zhAOoLczUVRv3hO-6Ka9K8lU8U5HDS62P9wR106a7kvLlmgVBIS7GfmFbvcPju1FJwY0wxGpOiZSG3bsX5q2cUm8Z9y4MbGRg4rk0HmEGSxf9V4wNJY1GTvb4asuoY' },
  { id: 5, name: 'Convergence', code: 'COC', type: 'Clockwork Soul', icon: 'settings_gear_alt', description: 'The Great Machine seeks perfection through clockwork engineering and celestial alignment.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrMXterZU_SaA-gfY5pi-j7GQ2dyoh7GRGVKiEqXd_Mx4Hzhoj7d4XTfWn_tANfqVmbo6ggpWCT18yCqQMfuzQkMSzpJRS7bNieGkDUDGXbvxiInGg1XDuI6h8obTBnxkOBa0hoXC2gLfmt9EHbfxgqYudiw9B5hBQ9BAnl-VDTwabLEFtXsUQ7QwNx-Wqoy-2YNrOwK19P_resDbwApKLgSuluP4tqlylvoyjwb8sqzOvszpK0HrMv9B5Fy_pIJt7-WnAeX8E-Grm' },
  { id: 6, name: 'Retribution', code: 'ROS', type: 'Mage Hunter', icon: 'auto_awesome', description: 'Elven hunters determined to save their dying gods by eliminating human magic users.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaCx8H2A9qClYs0t8kAq4yJciS8pZGjivgZB-9AuzVa4O0AuSC8OGYrVe1m8y2Rt_Uqta4WJxTdXxs9nzKy6GgucyGxB0dJVaGVpOl96iExiq8TtIkc6cqPQky0tNWEcvk0M6sZHhKtJqrtVSBLTm2fKdueS26tHTb29vB-DBpWGk4c_Ugi3u-hERDBu9MpEiP5ihhQs1Cl4RlxLlbBDT8FXeMMdUfCVTxzVtJhitW8b7I-cGmtHs8RXATpPb8IAXEjuZBdDPa3iVh' }
]
</script>

<style scoped>
.v2-factions-page {
  padding: 0;
}

.v2-page-header {
  margin-bottom: 48px;
}

.v2-title-main {
  font-size: 48px;
  font-weight: 900;
  color: var(--v2-on-surface);
  letter-spacing: -0.05em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.v2-text-italic {
  color: var(--v2-primary);
  font-style: italic;
}

.v2-header-accent {
  display: flex;
  align-items: center;
  gap: 16px;
}

.v2-accent-line {
  height: 2px;
  width: 96px;
  background-color: var(--v2-primary);
}

.v2-header-subtitle {
  font-size: 14px;
  color: var(--v2-outline);
  text-transform: uppercase;
  letter-spacing: 0.2em;
}

.faction-info-box {
  margin-bottom: 16px;
}

.faction-type-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.faction-type-icon {
  color: var(--v2-primary);
  font-size: 14px;
}

.faction-type-label {
  font-size: 12px;
  color: var(--v2-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.faction-name-v2 {
  font-size: 30px;
  font-weight: 900;
  letter-spacing: -0.025em;
  text-transform: uppercase;
}

.faction-desc-v2 {
  font-size: 14px;
  color: var(--v2-on-surface-variant);
  margin-bottom: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.faction-btn-v2 {
  width: 100%;
  font-size: 12px;
}

.faction-bento-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;
}

@media (min-width: 768px) {
  .faction-bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1280px) {
  .faction-bento-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.faction-card-v2 {
  position: relative;
  overflow: hidden;
  background-color: var(--v2-surface-container-low);
  border: 1px solid rgba(134, 147, 150, 0.1);
  transition: all 0.5s ease;
}

.faction-card-v2:hover {
  border-color: rgba(79, 215, 240, 0.5);
}

.card-gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--v2-background), transparent, transparent);
  z-index: 10;
}

.card-bg-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  transition: transform 0.7s ease;
}

.faction-card-v2:hover .card-bg-image {
  transform: scale(1.1);
}

.card-content-v2 {
  position: relative;
  z-index: 20;
  padding: 24px;
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
}

.card-top-right {
  position: absolute;
  top: 0;
  right: 0;
  padding: 24px;
}

.faction-code-badge {
  background-color: var(--v2-primary-container);
  color: var(--v2-on-primary-container);
  font-weight: 900;
  padding: 12px;
  font-size: 20px;
  line-height: 1;
}
</style>
