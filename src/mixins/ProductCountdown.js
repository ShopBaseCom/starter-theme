import getTime from 'date-fns/getTime'
import addMinutes from 'date-fns/addMinutes'
import Countdown from '../components/Countdown'

export default {
  name: 'ProductCountdown',
  components: { Countdown },
  data() {
    return {
      countdownTime: 0,
    }
  },
  computed: {
    settingCountdownTime() {
      return 0
    },
  },
  methods: {
    getTimer() {
      let countdownTime = 0
      const settingCountdownTime = this.settingCountdownTime
      const unixCountdownTime = getTime(
        addMinutes(new Date(), settingCountdownTime)
      )
      const cacheCountdownTime = this.$getStorage('current_countdown_time')
      const cacheUnixCountdownTime = this.$getStorage('unix_countdown_time')

      if (
        cacheCountdownTime &&
        cacheUnixCountdownTime &&
        cacheCountdownTime === settingCountdownTime &&
        cacheUnixCountdownTime > new Date()
      ) {
        countdownTime = cacheUnixCountdownTime
      } else {
        countdownTime = unixCountdownTime
        this.saveTimerToStorage(settingCountdownTime, unixCountdownTime)
      }
      this.countdownTime = countdownTime
    },
    saveTimerToStorage(time, unixTime) {
      this.$setStorage('current_countdown_time', time)
      this.$setStorage('unix_countdown_time', unixTime)
    },
  },
}
