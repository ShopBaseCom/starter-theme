<template>
  <button
    class="btn btn-primary"
    :disabled="isProductDisabled || loading"
    v-bind="$attrs"
    @click="addToCart"
  >
    <div v-if="loading" class="button-dual-ring"></div>
    <span>
      <slot>{{ $t('Add to cart') }}</slot>
    </span>
  </button>
</template>

<script>
import { getCoreFilter } from '../shared/filter'
import focusClean from './directives/focusClean'
export default {
  directives: { focusClean },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: 'add-to-cart',
    },
    onAddToCart: {
      type: Function,
      default: () => {},
    },
    product: {
      required: true,
      type: Object,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isProductDisabled() {
      return (
        this.disabled || this.formatProductMessages(this.product.errors) !== ''
      )
    },
  },
  methods: {
    addToCart() {
      this.onAddToCart(this.product, this.name)
      this.$emit('update:loading', true)
    },
    formatProductMessages: getCoreFilter('formatProductMessages'),
  },
}
</script>
