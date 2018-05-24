<template>
  <circle :cx="xScale(load.time)" :cy="yScale(load.value)" r="2" :style="circleStyle"/>
</template>

<script>
export default {
  name: 'LoadCircle',
  props: ['load', 'xScale', 'yScale', 'margin'],
  computed: {
    circleStyle () {
      return {
        fill: (this.load.value > 1.0) ? 'red' : '#0b81e2',
        transform: `translate(${this.margin.left}px,${this.margin.top}px)`
      }
    }
  }
}
</script>