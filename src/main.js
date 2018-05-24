import Vue from 'vue'
import App from './App.vue'
import { store } from './store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

const webSocket = new WebSocket("ws://127.0.0.1:8888/")

webSocket.onmessage = function (payload) {
  store.dispatch('addLoad', payload.data)
}