<template>
  <div v-if="duration" class="countdown-timer">
    <div class="flex align-center countdown-timer__block">
      <svg class="countdown-timer__icon mr5">
        <use xlink:href="#ic_countdown_24px"></use>
      </svg>
      <div class="countdown-timer__digit">
        {{ hours | twoDigits }}:{{ minutes | twoDigits }}:{{
          seconds | twoDigits
        }}
      </div>
      <div class="countdown-timer__message">
        &nbsp;left to buy
      </div>
    </div>
  </div>
</template>
<script>
import getTime from 'date-fns/getTime'
import getMinutes from 'date-fns/getMinutes'
import getSeconds from 'date-fns/getSeconds'
import differenceInHours from 'date-fns/differenceInHours'

export default {
  name: 'Countdown',
  filters: {
    twoDigits(val) {
      if (val < 10) {
        return `0${val}`
      }

      return val
    },
  },
  props: {
    time: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      hours: 0,
      duration: 0,
      interval: null,
    }
  },
  computed: {
    minutes() {
      return getMinutes(this.duration)
    },
    seconds() {
      return getSeconds(this.duration)
    },
  },
  watch: {
    time() {
      this.init()
    },
  },
  mounted() {
    if (this.time) {
      this.init()
    }
  },
  beforeDestroy() {
    this.clear()
  },
  methods: {
    init() {
      this.interval = setInterval(() => {
        let diff = 0
        const date = new Date()
        const current = getTime(date)

        if (this.time > current) {
          diff = this.time - current
          this.hours = differenceInHours(this.time, date)
        } else {
          this.clear()
        }
        this.duration = diff
      }, 1000)
    },
    clear() {
      if (this.interval) {
        clearInterval(this.interval)
      }
    },
  },
}
</script>
