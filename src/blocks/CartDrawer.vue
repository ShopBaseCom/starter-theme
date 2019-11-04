<template>
  <no-ssr>
    <div
      class="cart-drawer-container"
      :class="{ 'is-empty': !products.length }"
    >
      <div v-if="!products.length" class="cart-drawer-empty">
        <p class="mt24 ml16 mb24 cart-drawer-empty__text">
          There are no items in your cart
        </p>
      </div>
      <div v-else class="col-12 cart-drawer-wrapper">
        <div class="product-cart-wrapper">
          <ProductCart
            v-for="eachProduct in products"
            :key="eachProduct.id"
            :product="eachProduct"
            :is-cart-drawer="true"
            @qty="onChangeQuantity"
            @click="$emit('before-redirect')"
          ></ProductCart>
        </div>
        <hr />
        <div class="cart-drawer-summary pb16 pt24">
          <div class="mini-total-line mb16 cart__table">
            <span class="h5 mini-total-line__name">Subtotal</span>
            <span class="h5 mini-total-line__price cart__subtotal-price">
              {{ subTotalPrice | price }}
            </span>
          </div>
          <div
            v-if="cartSettings.show_total_savings && totalSaving > 0"
            class="mini-total-line mb24"
          >
            <span class="h5 mini-total-line__name-emphasis is-capitalized">
              Total Savings
            </span>
            <span
              class="h5 mini-total-line__price-emphasis is-capitalized ls-2"
            >
              {{ totalSaving | price }}
            </span>
          </div>
          <p class="mini-total-line__text mb16">
            Taxes and shipping calculated at checkout
          </p>
          <button
            v-if="!cartSettings.mini_cart_checkout"
            class="btn btn-outline fullwidth cart-drawer-summary__go-to-cart "
            @click="
              goToCart()
              $emit('before-redirect')
            "
          >
            Go to Cart
          </button>
          <button
            type="button"
            name="checkout"
            class="btn btn-primary fullwidth cart-drawer-summary__checkout"
            @click="
              onCheckout()
              $emit('before-redirect')
            "
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </no-ssr>
</template>

<script>
import ProductCart from './Product/ProductCart'
import { getCoreMixin } from '../shared/mixin'
export default {
  name: 'BlockCartDrawer',
  components: {
    ProductCart,
  },
  mixins: [getCoreMixin('cartDrawerMixin')],
  computed: {
    cartSettings() {
      return this.$getThemeSettings('cart')
    },
    totalBeforeSaving() {
      return this.products.reduce((acc, eachProduct) => {
        let price

        if (
          parseFloat(eachProduct.price) <
          parseFloat(eachProduct.compare_at_price)
        ) {
          price = eachProduct.compare_at_price * eachProduct.qty
        } else {
          price = eachProduct.price * eachProduct.qty
        }

        return acc + price
      }, 0)
    },
    totalSaving() {
      return this.totalBeforeSaving - this.subTotalPrice
    },
    subTotalPrice() {
      if (this.products.length > 0) {
        return this.products.reduce(
          (acc, product) => acc + product.price * product.qty,
          0
        )
      }
      return 0
    },
  },
  methods: {
    goToCart() {
      this.$emit('offCartDrawer')
      this.$router.push('/cart')
    },
  },
}
</script>
