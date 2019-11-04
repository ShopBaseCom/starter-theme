<template>
  <div id="cart">
    <div
      class="cart container pt40 pb96"
      :class="{ 'is-empty': !isPageFetching && !products.length }"
    >
      <h1
        class="h3 cart__heading text-align-center text-align-left-md mt16 mb32"
      >
        {{ $t('Shopping Cart') }}
      </h1>
      <div v-if="!isPageFetching && !products.length" class="cart-empty mb96">
        <p class="mt0 mb24 cart-empty__text">
          {{ $t('There are no items in your cart.') }}
        </p>
        <router-link
          class="btn btn-primary cart__continue"
          :to="$routeToHome()"
        >
          {{ $t('Continue shopping') }}
        </router-link>
      </div>
      <div v-if="!isPageFetching && products.length" class="row">
        <div class="col-12 col-sm-8 mb20">
          <div class="product-cart-wrapper">
            <ProductCart
              v-for="product in products"
              :key="product.id"
              :product="product"
              :is-loading="isLoading"
              @qty="onUpdateCartItem"
            />
          </div>
        </div>
        <div class="col-12 col-sm-4 cart-summary-container">
          <div class="cart-summary mb24 pt24">
            <div class="total-line mb5 cart__table">
              <div class="h5 total-line__name">{{ $t('Subtotal') }}</div>
              <div class="h5 total-line__price cart__subtotal-price">
                {{ totalPrice | price }}
              </div>
            </div>
            <p class="total-line__text mb16">
              {{ $t('Taxes and shipping calculated at checkout') }}
            </p>
            <button
              type="button"
              :disabled="isLoading"
              name="checkout"
              class="btn btn-primary cart-summary__checkout cart__checkout mb16 cart-summary__checkout-new"
              @click="onNavigateCheckout()"
            >
              <svg class="cart-summary__icon">
                <use xlink:href="#ic_shield_24px"></use>
              </svg>
              {{ $t('Checkout') }}
            </button>
            <div class="banner-trust">
              <img v-lazy="imageTrustBadge" :alt="$t('Trust badge')" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCart from '../blocks/Product/ProductCart'
export default {
  name: 'Cart',
  components: {
    ProductCart,
  },
  props: {
    isPageFetching: {
      type: Boolean,
      default: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    products: {
      type: Array,
      default: () => [],
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    onChangeQuantity: {
      type: Function,
      default: () => {},
    },
    onNavigateCheckout: {
      type: Function,
      default: () => {},
    },
    onUpdateCartItem: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      userHasScrolled: false,
    }
  },
  computed: {
    totalBeforeSaving() {
      return this.products.reduce((acc, product) => {
        let price

        if (parseFloat(product.price) < parseFloat(product.compare_at_price)) {
          price = product.compare_at_price * product.qty
        } else {
          price = product.price * product.qty
        }

        return acc + price
      }, 0)
    },
    totalSaving() {
      return this.totalBeforeSaving - this.totalPrice
    },
    imageTrustBadge() {
      return require('../assets/images/default/cart-trust-badge.png')
    },
    routes() {
      return [{ name: this.$t('Home'), route_link: '/' }]
    },
  },
  watch: {
    isPageFetching: {
      handler(val) {
        setTimeout(() => {
          if (!this.userHasScrolled && !val && this.products.length) {
            this.scrollPassHeader()
          }
        }, 3000)
      },
      immediate: true,
    },
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.userHasScrolled = true
    })
  },
  methods: {
    scrollPassHeader() {
      const elemHeader = document.querySelector('[data-id="header"]')
      if (elemHeader) {
        const heightHeader = elemHeader.clientHeight
        let i = 10
        const int = setInterval(() => {
          window.scrollTo(0, i)
          i += 10
          if (i > heightHeader + 10) clearInterval(int)
        }, 20)
      }
    },
  },
}
</script>
