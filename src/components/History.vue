<template>
  <div id="logContainer">
    <h1>Troubleshooting Log</h1>
    <div id="logs">
      <template v-for="(log, i) in getLogs">
        <p v-if="log.alarm" class="warning" :key="i">{{log.time.toLocaleString()}} <span>HIGH LOAD: {{log.value.toFixed(2)}}</span></p>
        <p v-else :key="i"><span>{{log.time.toLocaleString()}} Recovered from high load</span></p>
      </template>
    </div>
  </div>
</template>

<script>
import { store } from '../store'
import { mapGetters } from 'vuex'

export default {
  name: 'History',
  store,
  computed: {
    ...mapGetters([
        'getLogs'
    ])
  }
}
</script>

<style scoped>
#logContainer{
  height: 100vh;
  width: 39vw;
  box-sizing: border-box;
  padding: 10px;
  display: inline-block;
  vertical-align: top;
  background: black;
  color: white;
  font-weight: bold;
  position: relative;
}
#logs{
  height: 95vh;
  overflow-y: scroll;
}
p{
  display: block;
  text-align: left;
  font-size: 14px;
}
.warning span{
  text-decoration: underline;
  text-decoration-color: red;
}
.warning:not(:first-of-type){
  margin-top: 15px;
}
h1{
  background: black;
  font-size: 18px;
  width: 100%;
  padding: 2px;
}
</style>
