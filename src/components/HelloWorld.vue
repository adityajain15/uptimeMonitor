<template>
  <svg>
    <path :d="line"/>
    <g id="circles">
      <LoadCircle v-for="(loadData, loadIndex) of getLoad" :key="loadIndex" :load="loadData" :xScale="xScale" :yScale="yScale" :margin="margin"/>
    </g>
    <g id="xAxis"></g>
    <g id="yAxis"></g>
    <g id="yGrid"></g>
  </svg>
</template>

<script>
import { mapGetters } from 'vuex'
import { line as d3Line } from 'd3-shape'
import { scaleLinear, scaleTime } from 'd3-scale'
import { axisBottom, axisLeft } from 'd3-axis'
import { select, selectAll } from 'd3-selection'
import { transition } from 'd3-transition'
import { timeFormat } from 'd3-time-format'
import LoadCircle from './LoadCircle'

export default {
  name: 'HelloWorld',
  components: {
    LoadCircle
  },
  data () {
    return {
      height: 0,
      width: 0,
      margin: {
        left: 30,
        bottom: 20,
        top: 20,
        right: 30
      }
    }
  },
  mounted () {
    window.onresize = this.resize
    this.resize()
  },
  computed: {
    line () {
      const line = d3Line()
        .x((d) => { return this.xScale(d.time) })
        .y((d) => { return this.yScale(d.value) })

      return line(this.getLoad)
    },
    xScale () {
      return scaleTime()
        .domain(this.getTimeDomain)
        .range([0, this.width - this.margin.left - this.margin.right])
    },
    xAxis () {
      return axisBottom(this.xScale)
        .tickSizeOuter(0)
        .tickFormat(timeFormat("%I:%M"))
    },
    yScale () {
      return scaleLinear()
        .domain([this.getMaxValue, 0])
        .range([0, this.height - this.margin.bottom - this.margin.top])
    },
    yAxis () {
      return axisLeft(this.yScale)
        .tickSizeOuter(0)
    },
    yGrid () {
      return axisLeft(this.yScale)
        .tickSizeInner(this.width - this.margin.left - this.margin.right)
        .tickSizeOuter(0)
        .tickFormat(function(d){return ""})
    },
    ...mapGetters([
        'getTimeDomain',
        'getMaxValue',
        'getLoad'
      ])
  },
  watch: {
    getTimeDomain (newVal, oldVal) {
      this.drawXAxis()
    },
    getMaxValue (newVal, oldVal) {
      this.drawYAxis()
      this.drawYGrid()
    }
  },
  methods: {
    resize () {
      this.height = this.$el.clientHeight
      this.width = this.$el.clientWidth

      select('svg > path').attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)

      this.drawXAxis()
      this.drawYAxis()
      this.drawYGrid()
    },
    drawXAxis () {
      select('#xAxis')
        .attr('transform', `translate(${this.margin.left},${this.height - this.margin.bottom})`)
        .call(this.xAxis)
    },
    drawYAxis () {
      select('#yAxis')
        .transition()
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
        .call(this.yAxis)
    },
    drawYGrid () {
      select('#yGrid')
        .attr('transform', `translate(${this.width - this.margin.right}, ${this.margin.top})`)
        .call(this.yGrid)

      selectAll('#yGrid .tick line')
        .attr('stroke', 'black')
        .attr('stroke-dasharray', '1,2')

      select(`#yGrid > :nth-child(${this.yScale.ticks().indexOf(1) + 2}) line`)
        .attr('stroke', 'red')
        .attr('stroke-dasharray', '1,0')
    }
  }
}
</script>

<style scoped>
  svg{
    height: 40vh;
    width: 58vw;
    margin-right: 1vw;
    margin-left: 1vw;
    margin-top: 30vh;
    border: 2px solid black;
  }
  path{
    stroke: black;
    stroke-width: 1px;
    fill: none;
  }
</style>

<style>
#yGrid > g{
    stroke-dasharray: 1, 2;
}

#yGrid > path{
  display: none;
}
</style>