export default {
  components: {
    SizeChart: () => import('../blocks/SizeChart/SizeChart'),
  },

  data() {
    return {
      isVisibleSizeChart: false,
      sizeChart: {},
    }
  },

  computed: {
    hasVariantSize() {
      const index = this.options.findIndex(
        (option) => option.code.toLowerCase() === 'size'
      )

      return index > -1
    },
  },

  methods: {
    async showSizeChart() {
      this.sizeChart = await this.onFetchSizeChart()
      this.isVisibleSizeChart = true
    },

    onCloseSizeChart() {
      this.isVisibleSizeChart = false
    },
  },
}
