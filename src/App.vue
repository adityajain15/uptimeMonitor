<template>
  <div id="app">
    <HelloWorld/>
    <History/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import History from './components/History.vue'
import { store } from './store'
export default {
  name: 'app',
  store,
  components: {
    HelloWorld,
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
</style>
