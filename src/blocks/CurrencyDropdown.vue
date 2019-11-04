<template>
  <div v-show="isShowDropdown" class="currency-converter-dropdown">
    <div class="currency-converter-dropdown__title">
      {{ $t('Currency') }}
    </div>
    <div class="currency-converter-dropdown__content">
      <div
        v-for="(item, index) in currencies"
        :key="index"
        class="currency-converter-dropdown__item"
        :class="{ active: item.code === currency.code }"
        @click="changeCurrency(item.code)"
      >
        <svg :class="`currency-icon currency-${item.code}`">
          <use :xlink:href="`#${item.code}`"></use>
        </svg>
        <span class="currency-converter-dropdown__item__code">
          {{ item.code }}
        </span>
        <span class="currency-converter-dropdown__item__name">
          {{ item.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrencyDropdown',

  props: {
    isShowDropdown: {
      type: Boolean,
      default: false,
    },
    currency: {
      type: Object,
      default: () => {
        return { code: '', name: '' }
      },
    },
    currencies: {
      type: Array,
      default: () => [],
    },
    currencyRight: {
      type: Number,
      default: 0,
    },
  },

  watch: {
    currencyRight(right) {
      this.$el.style.right = `${right}px`
    },

    isShowDropdown(isShow) {
      if (isShow) {
        this.$nextTick(() => {
          if (this.$el.clientHeight > 446) {
            this.$el.style.height = '446px'
          } else {
            this.$el.style.height = 'unset'
          }
        })
      } else {
        this.$el.style.height = 'unset'
      }
    },
  },

  mounted() {
    document.addEventListener('click', (event) => {
      if (
        !this.$el.contains(event.target) &&
        !this.$parent.currencyButton.contains(event.target)
      ) {
        this.$emit('update:isShowDropdown', false)
      }
    })
  },

  methods: {
    changeCurrency(currency) {
      this.$emit('change', currency)
      this.$emit('update:isShowDropdown', false)
    },
  },
}
</script>
