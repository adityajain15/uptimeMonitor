import Vue from 'vue'
import { store } from '../../src/store'
import History from '../../src/components/History'

var chai = require('chai')
var expect = chai.expect
const vm = new Vue(History).$mount()

describe('Store', () => {
  it('Adds load', () => {
    expect(store.state.load.length).to.equal(0)
    store.dispatch('addLoad', '0.3')
    store.dispatch('addLoad', '0.11') // 60 seconds ago
    store.dispatch('addLoad', '0.11') // 50 seconds ago
    store.dispatch('addLoad', '0.11') // 40 seconds ago
    store.dispatch('addLoad', '0.11') // 30 seconds ago
    store.dispatch('addLoad', '0.33') // 20 seconds ago
    store.dispatch('addLoad', '0.32') // 10 seconds ago
    store.dispatch('addLoad', '0.86') // now
    expect(store.state.load.length).to.equal(8)
  }),
  it('Triggers alarm on high load', () => {
    expect(vm.$el.children[1].children.length).to.equal(0)
    expect(store.getters.getAlarm).false
    store.dispatch('addLoad', '3.0')
    expect(store.getters.getAlarm).true
    Vue.nextTick(() => {
      expect(vm.$el.children[1].children.length).to.equal(1)
    })
  }),
  it('Resets the alarm on system recovery', () => {
    expect(store.getters.getAlarm).true
    expect(vm.$el.children[1].children.length).to.equal(1)
    store.dispatch('addLoad', '0.11') // now, 60 seconds ago would be 0.11 (2 min avg = 0.11)
    expect(store.getters.getAlarm).false
    Vue.nextTick(() => {
      expect(vm.$el.children[1].children.length).to.equal(2)
    })
  }),
  it('Calculates the correct 2 minute average', () => {
    store.dispatch('addLoad', '0.11') // 70 seconds ago
    store.dispatch('addLoad', '1.0') // 60 seconds ago
    store.dispatch('addLoad', '1.0') // 50 seconds ago
    store.dispatch('addLoad', '0.22') // 40 seconds ago
    store.dispatch('addLoad', '0.11') // 30 seconds ago
    store.dispatch('addLoad', '0.44') // 20 seconds ago
    store.dispatch('addLoad', '0.32') // 10 seconds ago
    store.dispatch('addLoad', '0.86') // now
    expect(store.getters.twoMinAverage).to.equal((parseFloat(1.0) + parseFloat(0.86)) / 2 )
  })
})