<template>
  <svg
    width="600"
    height="600"
    viewBox="0 0 600 600"
    xmlns="http://www.w3.org/2000/svg"
    class="scenario-map"
  >
    <!-- Backgrounds -->
    <rect class="bg-player2" x="0" y="0" width="600" :height="defenderDeployHeight" />
    <rect class="bg-neutral" x="0" :y="defenderDeployHeight" width="600" :height="neutralHeight" />
    <rect class="bg-player1" x="0" :y="600 - attackerDeployHeight" width="600" :height="attackerDeployHeight" />

    <!-- Center Line -->
    <line x1="0" y1="300" x2="600" y2="300" stroke="#808080" stroke-width="2" stroke-dasharray="5 5" />

    <!-- Deployment Zone Labels -->
    <text class="label-text" x="500" :y="defenderDeployHeight / 2 - 10">Defender</text>
    <text class="label-text" x="500" :y="defenderDeployHeight / 2 + 10">Deployment Zone</text>
    <text class="label-text" x="500" :y="600 - attackerDeployHeight / 2 - 10">Attacker</text>
    <text class="label-text" x="500" :y="600 - attackerDeployHeight / 2 + 10">Deployment Zone</text>

    <!-- Deployment Measurements -->
    <text class="measurement-text" x="70" :y="defenderDeployHeight / 2">{{ defenderDeploy }}"</text>
    <line x1="50" y1="0" x2="50" :y2="defenderDeployHeight" stroke="white" stroke-width="4" stroke-dasharray="10 5" />

    <text class="measurement-text" x="70" :y="600 - attackerDeployHeight / 2">{{ attackerDeploy }}"</text>
    <line x1="50" :y1="600 - attackerDeployHeight" x2="50" y2="600" stroke="white" stroke-width="4" stroke-dasharray="10 5" />

    <!-- Objectives -->
    <g v-for="(obj, index) in computedObjectives" :key="index">
      <!-- Measurement Lines -->
      <!-- X Line -->
      <line
        :x1="obj.lineX.x1" :y1="obj.lineX.y1"
        :x2="obj.lineX.x2" :y2="obj.lineX.y2"
        :class="`line-${obj.owner}`"
        stroke-width="4" stroke-dasharray="10 5"
      />
      <!-- Y Line -->
      <line
        :x1="obj.lineY.x1" :y1="obj.lineY.y1"
        :x2="obj.lineY.x2" :y2="obj.lineY.y2"
        :class="`line-${obj.owner}`"
        stroke-width="4" stroke-dasharray="10 5"
      />

      <!-- Measurement Text -->
      <text class="measurement-text" :class="`measurement-text--${obj.owner}`" :x="obj.textX.x" :y="obj.textX.y">{{ obj.raw.x }}"</text>
      <text class="measurement-text" :class="`measurement-text--${obj.owner}`" :x="obj.textY.x" :y="obj.textY.y">{{ obj.raw.y }}"</text>

      <!-- Circle -->
      <circle
        :cx="obj.cx" :cy="obj.cy" :r="obj.r"
        :class="[obj.typeClass]"
        :style="obj.fillStyle"
      />

      <!-- Label -->
      <text
        :x="obj.cx" :y="obj.cy"
        :class="[obj.textClass, `text-${obj.owner}`]"
      >
        {{ obj.label }}
      </text>
    </g>

  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  attackerDeploy: {
    type: Number,
    default: 6
  },
  defenderDeploy: {
    type: Number,
    default: 11
  },
  objectives: {
    type: Array,
    default: () => []
  }
})

const SCALE = 12.5 // units per inch
const OBJECTIVE__ATTACKER_COLOR = 'red'
const OBJECTIVE__ATTACKER_FILL_COLOR = '#505050'
const OBJECTIVE__defender_COLOR = 'blue'
const OBJECTIVE__defender_FILL_COLOR = '#a7a7a7'
const OBJECTIVE_NEUTRAL_COLOR = 'black'
const OBJECTIVE_NEUTRAL_FILL_COLOR = '#303030'

const attackerDeployHeight = computed(() => props.attackerDeploy * SCALE)
const defenderDeployHeight = computed(() => props.defenderDeploy * SCALE)
const neutralHeight = computed(() => 600 - attackerDeployHeight.value - defenderDeployHeight.value)

const computedObjectives = computed(() => {
  return props.objectives.map(obj => {
    // Determine Radius
    let diameterMm = 0
    let label = ''
    let typeClass = ''
    let textClass = ''

    switch (obj.type) {
      case 'flag':
        diameterMm = 30
        label = 'F'
        typeClass = 'flag-cache'
        textClass = 'flag-cache-text'
        break
      case 'cache':
        diameterMm = 30
        label = 'C'
        typeClass = 'flag-cache'
        textClass = 'flag-cache-text'
        break
      case '40mm':
        diameterMm = 40
        label = '40'
        typeClass = 'objective'
        textClass = 'objective-text'
        break
      case '50mm':
        diameterMm = 50
        label = '50'
        typeClass = 'objective'
        textClass = 'objective-text'
        break
      default:
        diameterMm = 50
        label = '?'
        typeClass = 'objective'
        textClass = 'objective-text'
    }

    // Radius in SVG units (Using the 2x visual scale from example: DrawnRadius = DiameterMm / 25.4 * 12.5)
    // Actually, based on analysis: DrawnRadius ~= RealDiameterInInches * 12.5
    // RealDiameterInInches = diameterMm / 25.4
    // So r = (diameterMm / 25.4) * 12.5
    const r = (diameterMm / 25.4) * SCALE

    // Coordinates
    const xDist = obj.x * SCALE
    const yDist = obj.y * SCALE

    let cx = 0
    let cy = 0

    // Lines
    let lineX = { x1: 0, y1: 0, x2: 0, y2: 0 }
    let lineY = { x1: 0, y1: 0, x2: 0, y2: 0 }
    let textX = { x: 0, y: 0 }
    let textY = { x: 0, y: 0 }

    if (obj.xFrom === 'right') {
      cx = 600 - (xDist + r)
      lineX = { x1: 600, y1: cx, x2: 600 - xDist, y2: cx } // y will be fixed later
      textX = { x: 600 - xDist / 2, y: 0 } // y fixed later
    } else {
      // default left
      cx = xDist + r
      lineX = { x1: 0, y1: cx, x2: xDist, y2: cx }
      textX = { x: xDist / 2, y: 0 }
    }

    if (obj.yFrom === 'bottom') {
      cy = 600 - (yDist + r)
      lineY = { x1: cx, y1: 600, x2: cx, y2: 600 - yDist } // x fixed later
      textY = { x: 0, y: 600 - yDist / 2 } // x fixed later
    } else {
      // default top
      cy = yDist + r
      lineY = { x1: cx, y1: 0, x2: cx, y2: yDist }
      textY = { x: 0, y: yDist / 2 }
    }

    // Fix line coordinates that depend on the other axis
    lineX.y1 = cy
    lineX.y2 = cy
    textX.y = cy - 10 // Slightly above the line

    lineY.x1 = cx
    lineY.x2 = cx
    textY.x = cx + 20 // Slightly to the right of the line

    // Colors
    const owner = obj.owner || 'neutral'
    let fillStyle = {}

    if (owner === 'p1' || owner === 'attacker') {
      fillStyle = { fill: OBJECTIVE__ATTACKER_FILL_COLOR, stroke: OBJECTIVE__ATTACKER_COLOR }
    } else if (owner === 'p2' || owner === 'defender') {
      fillStyle = { fill: OBJECTIVE__defender_FILL_COLOR, stroke: OBJECTIVE__defender_COLOR }
    } else {
      fillStyle = { fill: OBJECTIVE_NEUTRAL_FILL_COLOR, stroke: OBJECTIVE_NEUTRAL_COLOR }
      if (['40mm', '50mm'].includes(obj.type)) {
         fillStyle.fill = OBJECTIVE_NEUTRAL_FILL_COLOR
      }
    }

    return {
      raw: obj,
      cx,
      cy,
      r,
      label,
      typeClass,
      textClass,
      fillStyle,
      owner,
      lineX,
      lineY,
      textX,
      textY
    }
  })
})
</script>

<style scoped>
.scenario-map {
  font-family: Arial, sans-serif;
}
.bg-player1 { fill: #E0B0B0; }
.bg-player2 { fill: #B0B0E0; }
.bg-neutral { fill: #D0D0D0; }
.objective { stroke: black; stroke-width: 1; }
.objective-text { fill: white; font-size: 20px; text-anchor: middle; dominant-baseline: central; }
.flag-cache { stroke: black; stroke-width: 1; }
.flag-cache-text { fill: white; font-size: 18px; text-anchor: middle; dominant-baseline: central; }
.label-text { fill: black; font-size: 14px; font-weight: bold; text-shadow: 1px 1px white; text-anchor: middle; }
.measurement-text { fill: black; font-size: 14px; font-weight: bold; text-shadow: 1px 1px white; text-anchor: middle; }
.measurement-text--attacker { fill: red; }
.measurement-text--defender { fill: blue; }

.text-attacker { fill: red; }
.text-defender { fill: blue; }
.text-neutral { fill: white; }

.line-attacker { stroke: red; }
.line-defender { stroke: blue; }
.line-neutral { stroke: white; }
</style>
