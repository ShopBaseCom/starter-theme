export default {
  data() {
    return {
      bottom: false,
    }
  },
  beforeMount() {
    window.addEventListener(
      'scroll',
      () => {
        this.bottom = this.bottomVisible()
      },
      { passive: true }
    )
  },
  methods: {
    bottomVisible() {
      let isVisible = false
      const domColEnd = document.querySelector('.collection-end')
      if (domColEnd) {
        const rect = domColEnd.getBoundingClientRect()
        const elemTop = rect.top

        isVisible = elemTop <= window.innerHeight
      }
      return isVisible
    },
  },
  watch: {
    bottom(bottom) {
      if (
        bottom &&
        this.pagination.page * this.pagination.perPage <= this.pagination.total
      ) {
        this.pagination.onPageChange(this.pagination.page + 1, false)
      }
    },
    isLoading(val) {
      if (val) {
        this.bottom = false
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('scroll', () => {})
  },
}
