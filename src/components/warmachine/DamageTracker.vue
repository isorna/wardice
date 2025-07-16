<template>
  <div class="damage-tracker">
    <div v-if="isWarbeast" class="damage-spiral-wrapper">
      <h4>{{ i18n.DAMAGE_SPIRALS }} (Total: {{ health.total }})</h4>
      <svg class="damage-spiral-svg" :viewBox="`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`">
        <g v-for="(column, index) in health.grid.columns" :key="index">
          <circle
            v-for="i in column.boxes"
            :key="`box-${index}-${i}`"
            class="life-box"
            :class="[aspectClasses[index], { damaged: isDamaged(getSpiralBoxId(index, i)) }]"
            :cx="getSpiralBoxPosition(index, i).x"
            :cy="getSpiralBoxPosition(index, i).y"
            :r="CIRCLE_RADIUS"
            @click="toggleDamage(getSpiralBoxId(index, i))"
          />
          <text
            class="spiral-number"
            :x="getSpiralTextPosition(index).x"
            :y="getSpiralTextPosition(index).y"
          >
            {{ index + 1 }}
          </text>
        </g>
      </svg>
      <button class="reset-button" @click="resetDamage">{{ i18n.RESET_DAMAGE }}</button>
    </div>
    <div v-else-if="health.grid && health.grid.columns" class="damage-grid-container">
       <h4>{{ i18n.DAMAGE_GRID }} (Total: {{ health.total }})</h4>
      <svg class="damage-grid-svg" :style="{ width: gridWidth + 'px', height: gridHeight + 'px' }" :viewBox="`0 -2 ${gridWidth} ${gridHeight}`">
        <g v-for="(column, colIndex) in health.grid.columns" :key="colIndex">
          <g v-for="i in column.boxes" :key="`box-${colIndex}-${i}`">
            <rect
              class="damage-box"
              :class="{ damaged: isDamaged(getGridBoxId(colIndex, i)) }"
              :x="getGridBoxPosition(colIndex).x"
              :y="getGridBoxPosition(colIndex, i).y"
              :width="BOX_SIZE"
              :height="BOX_SIZE"
              @click="toggleDamage(getGridBoxId(colIndex, i))"
            ></rect>
            <text
              v-if="getSystem(column, i)"
              class="system-text"
              :class="{ damaged: isDamaged(getGridBoxId(colIndex, i)) }"
              :x="getGridBoxPosition(colIndex).x + BOX_SIZE / 2"
              :y="getGridBoxPosition(colIndex, i).y + BOX_SIZE / 2"
            >
              {{ getSystem(column, i) }}
            </text>
          </g>
        </g>
      </svg>
       <button class="reset-button" @click="resetDamage">{{ i18n.RESET_DAMAGE }}</button>
    </div>
     <div v-else-if="typeof health === 'number'" class="life-indicators">
        <h4>{{ i18n.HEALTH }}: {{ health }}</h4>
        <div
          v-for="i in health"
          :key="i"
          class="life-box"
          :class="{ damaged: isDamaged(i - 1) }"
          @click="toggleDamage(i - 1)"
        ></div>
        <br />
        <button class="reset-button" @click="resetDamage">{{ i18n.RESET_DAMAGE }}</button>
      </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import i18nApp from '@/i18n/en.i18n.json';
import i18nGame from '@/i18n/warmachine/en.i18n.json';

const i18n = {
  ...i18nApp,
  ...i18nGame,
};

const props = defineProps({
  health: [Object, Number],
  keywords: Array,
  profileKey: String,
});

const damagedState = ref({});

const isWarbeast = computed(() => props.keywords?.map(k => k.toLowerCase()).includes('warbeast'));

const VIEWBOX_SIZE = 400;
const CENTER = VIEWBOX_SIZE / 2;
const CIRCLE_RADIUS = 12;
const BASE_RADIUS = 70;
const RADIUS_INCREMENT = 18;
const ANGLE_INCREMENT_DEG = 12;
const BOX_SIZE = 30;
const PADDING = 2;

const aspectClasses = ['spiral-aspect-1', 'spiral-aspect-1', 'spiral-aspect-2', 'spiral-aspect-2', 'spiral-aspect-3', 'spiral-aspect-3'];


const maxRows = computed(() => {
    if (!props.health.grid || !props.health.grid.columns) return 0;
    return Math.max(...props.health.grid.columns.map(c => c.boxes || 0));
});
const gridWidth = computed(() => (props.health.grid?.columns?.length || 0) * (BOX_SIZE + PADDING));
const gridHeight = computed(() => maxRows.value * (BOX_SIZE + PADDING));


const getSpiralBoxId = (col, row) => `s-${col}-${row}`;
const getGridBoxId = (col, row) => `g-${col}-${row}`;

const getSpiralBoxPosition = (index, i) => {
  const startAngleDeg = index * 60 - 90;
  const currentRadius = BASE_RADIUS + (i - 1) * RADIUS_INCREMENT;
  const currentAngleDeg = startAngleDeg + (i - 1) * ANGLE_INCREMENT_DEG;
  const currentAngleRad = currentAngleDeg * (Math.PI / 180);
  return {
    x: CENTER + currentRadius * Math.cos(currentAngleRad),
    y: CENTER + currentRadius * Math.sin(currentAngleRad),
  };
};

const getSpiralTextPosition = (index) => {
    const column = props.health.grid.columns[index];
    const startAngleDeg = index * 60 - 90;
    const textAngleDeg = startAngleDeg + (column.boxes) * ANGLE_INCREMENT_DEG;
    const textAngleRad = textAngleDeg * (Math.PI / 180);
    const textRadius = BASE_RADIUS + (column.boxes) * RADIUS_INCREMENT + (CIRCLE_RADIUS);
    return {
        x: CENTER + textRadius * Math.cos(textAngleRad),
        y: CENTER + textRadius * Math.sin(textAngleRad),
    };
};

const getGridBoxPosition = (colIndex, rowIndex) => {
    const x = colIndex * (BOX_SIZE + PADDING);
    const y = gridHeight.value - ((rowIndex) * (BOX_SIZE + PADDING));
    return { x, y };
};

const getSystem = (column, boxIndex) => {
    return column.systems?.[column.boxes - boxIndex + 1] || '';
};

const isDamaged = (id) => !!damagedState.value[id];

const toggleDamage = (id) => {
  damagedState.value[id] = !damagedState.value[id];
  saveState();
};

const resetDamage = () => {
  damagedState.value = {};
  saveState();
};

const saveState = () => {
  localStorage.setItem(`damage_${props.profileKey}`, JSON.stringify(damagedState.value));
};

const loadState = () => {
  const saved = localStorage.getItem(`damage_${props.profileKey}`);
  if (saved) {
    damagedState.value = JSON.parse(saved);
  }
};

onMounted(() => {
  loadState();
});
</script>

<style scoped>
.damage-grid-container,
.life-indicators,
.damage-spiral-wrapper {
  margin-top: 15px;
  text-align: center;
}
.life-box {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid #aaa;
  background-color: #fff;
  margin: 2px;
  cursor: pointer;
}
.life-box.damaged {
  background-color: #d9534f;
  border-color: #d9534f;
}
.damage-grid-svg .damage-box {
  fill: #fff;
  stroke: #aaa;
  stroke-width: 1;
  cursor: pointer;
}
.damage-grid-svg .damage-box.damaged {
  fill: #d9534f;
}
.damage-grid-svg .system-text {
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  text-anchor: middle;
  dominant-baseline: central;
  fill: #333;
  pointer-events: none;
}
.damage-grid-svg .system-text.damaged {
  fill: #fff;
}
.damage-spiral-svg {
  width: 400px;
  height: 400px;
  display: inline-block;
}
.damage-spiral-svg .life-box {
  stroke-width: 2px;
  fill: #fff;
  cursor: pointer;
  transition: fill 0.2s;
}
.damage-spiral-svg .life-box.damaged {
  fill: #d9534f;
  stroke-opacity: 0.7;
}
.damage-spiral-svg .spiral-aspect-1 {
  stroke: #00c;
}
.damage-spiral-svg .spiral-aspect-2 {
  stroke: #c00;
}
.damage-spiral-svg .spiral-aspect-3 {
  stroke: #080;
}
.damage-spiral-svg .spiral-number {
  font-size: 20px;
  font-weight: bold;
  font-family: Arial, sans-serif;
  text-anchor: middle;
  dominant-baseline: middle;
  fill: #333;
}
.reset-button {
    margin-top: 10px;
}
</style>
