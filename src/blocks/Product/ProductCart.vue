<template>
  <div class="product-cart">
    <div class="product-cart__image aspect-ratio">
      <router-link
        :to="$routeToProduct(product)"
        @click.native="$emit('click')"
      >
        <web-image
          :alt="product.product_title"
          :src="product.image"
          :src-resolution="true"
          :small="true"
          :is-lazy="false"
          width="180"
          height="0"
          :square="true"
          @load="imageLoaded = true"
        />
      </router-link>
    </div>
    <div class="product-cart__details">
      <div class="product-cart__name">
        <router-link
          class="h5"
          :to="$routeToProduct(product)"
          @click.native="$emit('click')"
        >
          {{ product.product_title | htmlDecode }}
        </router-link>
      </div>
      <p
        v-if="optionsVariant"
        class="product-cart__options"
        :class="{ mb2: product.properties, mb8: !product.properties }"
      >
        {{ optionsVariant }}
      </p>
      <div
        v-if="product.properties && product.properties.length"
        class="product-cart__property-container mb8"
      >
        <p
          v-for="(property, index) in product.properties"
          :key="index"
          class="product-cart__property mb4 word-break-all"
        >
          {{ property.name }}: {{ property.value }}
        </p>
      </div>
      <p class="h5 product-cart__price">
        <span>{{ product.price | price }}</span>
        {{ ' ' }}
        <span
          v-if="product.compare_at_price > product.price"
          class="product-cart__price--original"
        >
          {{ product.compare_at_price | price }}
        </span>
      </p>
      <div class="product-cart__quantity">
        <Quantity
          v-model.number="qty"
          :min="0"
          :disable="isDisable || isLoading"
          :using-blur="true"
          @blur="changeQty(...arguments)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import Quantity from '../../components/Quantity'
export default {
  name: 'ProductCart',
  components: {
    Quantity,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    isCartDrawer: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imageLoaded: false,
      qty: this.product.qty,
      isDisable: false,
    }
  },
  computed: {
    optionsVariant() {
      return this.product && this.product.options && this.product.options.length
        ? this.product.options.map((option) => option.value).join(' / ')
        : ''
    },
  },
  watch: {
    product: {
      handler: function(val) {
        if (val) {
          this.qty = val.qty
        }
      },
      deep: true,
    },
  },
  beforeMount() {
    if (this.isCartDrawer)
      this.$bus.$on('cart-item-updated', this.onCartItemChanged)
  },
  beforeDestroy() {
    if (this.isCartDrawer)
      this.$bus.$off('cart-item-updated', this.onCartItemChanged)
  },
  methods: {
    changeQty: debounce(function() {
      if (this.product.qty !== this.qty) {
        if (this.isCartDrawer) this.isDisable = true
        this.$emit('qty', {
          item_id: this.product.item_id,
          qty: this.qty,
          properties: this.product.properties,
          variant_id: this.product.variant_id,
        })
      }
    }, 500),
    onCartItemChanged() {
      this.isDisable = false
    },
  },
}
</script>
