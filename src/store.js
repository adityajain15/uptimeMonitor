import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    load: [],
    logs: [],
    alarm: false
  },
  mutations: {
    add (state, payload) {
      if(state.load.length >= 60) {
        state.load.shift()
      }
      state.load.push({
        value: payload,
        time: new Date()
      })
    },
    setAlarm (state, payload) {
      state.alarm = payload
    },
    addLog (state, payload) {
      state.logs.push(payload)
    }
  },
  actions: {
    addLoad ({commit, getters}, load) {
      commit('add', load)
      
      function addLog () {
        commit('addLog', {
          alarm: getters.getAlarm,
          time: new Date(),
          value: getters.twoMinAverage
        })
      }
      
      if (!getters.getAlarm && getters.twoMinAverage >= 1) {
        commit('setAlarm', true)
        addLog()
      } else if (getters.getAlarm && getters.twoMinAverage <= 1) {
        commit('setAlarm', false)
        addLog()
      }
    }
  },
  getters: {
    getTimeDomain (state) {
      const allTimes = state.load.map(d=>d.time)
      const maxTime = Math.max(...allTimes)
      const minTime = Math.min(...allTimes)
      return [new Date(minTime), new Date(maxTime)]
    },
    getMaxValue (state) {
      const allValues = state.load.map(d=>d.value)
      let maxValue = Math.ceil(Math.max(...allValues))
      if (maxValue <= 1) { maxValue = 2 }
      return maxValue
    },
    getLoad (state) {
      return state.load
    },
    getAlarm (state) {
      return state.alarm
    },
    getLogs (state) {
      return state.logs
    },
    twoMinAverage (state) {
      const lastSix = state.load.slice(-7).map(d=>parseFloat(d.value))
      const twoMinuteAverage = (lastSix[0] + lastSix[lastSix.length - 1]) / 2
      return twoMinuteAverage
    }
  }
})