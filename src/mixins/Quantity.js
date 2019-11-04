export const Quantity = {
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: 0,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    min: {
      type: Number,
      default: -Infinity,
    },
    usingBlur: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      internalValue: this.value,
    }
  },
  watch: {
    value(val) {
      this.internalValue = val
    },
  },
  methods: {
    validateMinMax(value) {
      if (value < this.min) {
        value = this.min
      }

      if (value > this.max) {
        value = this.max
      }

      return value
    },

    changeQuantity(change) {
      let qty = this.internalValue + change
      this.internalValue = this.validateMinMax(qty)

      this.$emit('input', this.internalValue)
      this.$emit('blur', this.internalValue)
    },

    updateValue(e) {
      let qty = e.target.value
      if (typeof qty === 'string' && (qty === '' || Number(qty) < 0)) qty = 1
      qty = this.validateMinMax(Number(qty))

      this.$forceUpdate()
      return qty
    },

    inputValue(e) {
      if (this.usingBlur) return
      this.internalValue = this.updateValue(e)
      this.$emit('input', this.internalValue)
    },

    blurValue(e) {
      if (!this.usingBlur) return
      this.internalValue = this.updateValue(e)
      this.$emit('input', this.internalValue)
      this.$emit('blur', this.internalValue)
    },
  },
}
