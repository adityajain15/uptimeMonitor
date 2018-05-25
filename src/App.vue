<template>
  <div id="app">
    <div id="chartContainer">
      <Chart/>
      <span>Two minute average load: {{this.$store.getters.twoMinAverage.toFixed(2)}}</span>
    </div>
    <History/>
  </div>
</template>

<script>
import Chart from './components/Chart.vue'
import History from './components/History.vue'
import { store } from './store'
export default {
  name: 'app',
  store,
  components: {
    Chart,
    History
  }
}
</script>

<style>
#app {
  font-family: 'Courier New', Courier, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}
#chartContainer{
  width: 58vw;
  margin: 0px 1vw;
  display: inline-block;
}
span{
  display: block;
  text-align: center;
  font-weight: bold;
  margin-top: 5vh;
}
</style>
