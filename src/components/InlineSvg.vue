<template>
  <component :is="svgComponent"/>
</template>

<script setup>
  // READ: https://stackoverflow.com/a/76829708
  import { shallowRef } from 'vue'

  const props = defineProps({
    src: {
      type: Object,
      required: true
    }
  })

  let svgComponent = shallowRef(null)

  props.src
    .then((module) => {
      svgComponent.value = module.default
    })
</script>