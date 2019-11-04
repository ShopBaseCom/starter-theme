<template>
  <transition name="slide-top">
    <div
      v-if="isOpen"
      id="sticky-bar"
      :class="[
        'sticky-bar-action sticky-bar-action--bottom flex flow-column items-center',
        {
          'z-index-2': !thumbnailCarouselVisible,
        },
      ]"
    >
      <div class="container">
        <div class="row align-center">
          <div class="col-xl-3 product-detail">
            <div class="product-detail__image mr10">
              <Carousel
                ref="carousel"
                :per-page="1"
                :mouse-drag="false"
                :pagination-enabled="false"
                :navigate-to="navigateImgWithVariant()"
              >
                <Slide v-for="image in images" :key="image.src">
                  <div class="aspect-ratio-img aspect-ratio-img--68">
                    <web-image
                      ref="images"
                      :src="image.src"
                      width="180"
                      height="0"
                      :alt="image.alt || productTitle | htmlDecode"
                      :src-resolution="true"
                      itemprop="image"
                    />
                  </div>
                </Slide>
              </Carousel>
            </div>
            <div class="product-detail__content">
              <h2 class="h5 product-detail__name is-uppercase mb8">
                {{ truncate(productTitle, 50) | htmlDecode }}
              </h2>

              <div>
                <div
                  v-if="
                    parseFloat(variant.price) <
                      parseFloat(variant.compare_at_price)
                  "
                >
                  <span class="product-detail__price">
                    {{ variant.price | price }}
                  </span>
                  &nbsp;
                  <span class="product-detail__price--original">
                    {{ variant.compare_at_price | price }}
                  </span>
                </div>
                <div v-else class="product-detail__price">
                  {{ variant.price | price }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-xl-9">
            <div class="row product-action">
              <div
                class="product-action__variants brdr-top-1"
                :class="{ visibility: product.variants.length === 1 }"
              >
                <template
                  v-if="
                    currentOption &&
                      Object.keys(currentOption).length > 0 &&
                      product.variants &&
                      product.variants.length > 1
                  "
                >
                  <div
                    v-for="(option, index) in product.options"
                    :key="index"
                    class="product-action__variant"
                  >
                    <div class="variants-label">
                      {{ $t('Select ') + option.label }}
                    </div>
                    <div class="variants-wrapper">
                      <div class="localnav relative">
                        <input
                          :id="`ln-menustate-${index}`"
                          type="checkbox"
                          class="ln-menustate"
                          name="menu"
                        />
                        <label
                          :for="`ln-menustate-${index}`"
                          class="ln-menulabel"
                          >{{ currentOption[option.code].label }}</label
                        >
                        <div class="ln-submenu">
                          <div
                            v-for="(v, i) in option.values"
                            :key="i"
                            class="ln-submenu-content"
                          >
                            <a
                              href="#"
                              :class="{
                                disabled: unavailableOptionItems[v.id],
                              }"
                              @click.prevent="
                                changeOption(option.code, v.id, v.label, index)
                              "
                            >
                              {{ v.label }}
                            </a>
                          </div>
                        </div>
                        <label
                          :id="`ln-curtain-${index}`"
                          ref="menuOverlay"
                          class="ln-curtain"
                          :for="`ln-menustate-${index}`"
                        ></label>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              <div
                v-if="themeSettings.show_quantity_box"
                class="product-action__quantity brdr-top-1"
                :class="{ visibility: product.variants.length === 1 }"
              >
                <input
                  type="number"
                  min="0"
                  max="999"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  :disabled="isDisabledAddCart"
                  class="no-outline qty-input px10 bg-cl-transparent"
                  :value="internalValue"
                  @keydown="keyhandler"
                  @input="updateQty"
                />
                <button
                  class="qty-input__increase"
                  :disabled="!variant.available || unavailableVariant"
                  @keydown.enter="increase"
                  @click="increase"
                >
                  <span class="qty-input__up"> </span>
                </button>
                <button
                  class="qty-input__decrease"
                  :disabled="
                    !variant.available ||
                      unavailableVariant ||
                      !variant.quantity
                  "
                  @keydown.enter="decrease"
                  @click="decrease"
                >
                  <span class="qty-input__down"> </span>
                </button>
              </div>

              <div
                v-if="themeSettings.show_quantity_box"
                class="product-action__quantity-desktop"
              >
                <div class="quantity-label">
                  {{ $t('Quantity') }}
                </div>
                <Quantity v-model.number="internalValue" :min="1" />
              </div>
              <ButtonAddToCart
                id="sticky-add-to-cart"
                :data-cart-form-id="cartFormId"
                :product="product"
                :loading.sync="isAddingToCart"
                :disabled="isDisabledAddCart"
                class="product-action__add-cart"
                :class="{
                  'is-soldout': isDisabledAddCart,
                  'product-action__checkout': $cartSettings.type === 'checkout',
                }"
                :on-add-to-cart="addToCart"
              >
                <template v-if="unavailableVariant">
                  {{ $t('Unavailable') }}
                </template>
                <template v-else-if="!variant.available">
                  {{ $t('Sold out') }}
                </template>
                <template v-else-if="$cartSettings.type === 'checkout'">
                  {{ $t('Buy Now') }}
                </template>
              </ButtonAddToCart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { Carousel, Slide } from '@jambonn/vue-carousel'
import { getCoreMixin } from '../../shared/mixin'
import { truncate } from '../../utils/string'
import Quantity from '../../components/Quantity'
import ButtonAddToCart from '../../components/AddToCart'

export default {
  name: 'ProductStickyBar',
  components: {
    Carousel,
    Slide,
    Quantity,
    ButtonAddToCart,
  },
  mixins: [getCoreMixin('productImagesMixin')],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    thumbnailCarouselVisible: {
      type: Boolean,
      default: true,
    },
    thumbnailCarouselCurrentPage: {
      type: Number,
      default: 0,
    },
    product: {
      type: Object,
      default: () => {},
    },
    variant: {
      type: Object,
      default: () => {},
    },
    currentOption: {
      type: Object,
      default: () => {},
    },
    unavailableVariant: {
      type: Boolean,
      default: false,
    },
    isDisabledAddCart: {
      type: Boolean,
      default: false,
    },
    unavailableOptionItems: {
      type: Object,
      default: () => {},
    },
    onChangeOption: {
      type: Function,
      default: () => {},
    },
    onAddToCart: {
      type: Function,
      default: () => {},
    },
    themeSettings: {
      type: Object,
      default: () => {},
    },
    cartFormId: {
      type: String,
      default: 'default',
    },
  },
  data() {
    return {
      isAddingToCart: false,
      internalValue: this.value,
    }
  },
  watch: {
    isAddingToCart(val) {
      if (
        window &&
        window.document &&
        document.getElementsByClassName('sticky').length === 0 &&
        !val
      ) {
        window.scrollTo(0, 0)
      }
    },
    internalValue(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.internalValue = val
    },
    'variant.id': function() {
      this.internalValue = this.value
    },
  },
  methods: {
    truncate,
    keyhandler: function(event) {
      if (event.key === '+' || event.key === '-') {
        event.preventDefault()
      }
    },
    changeOption(code, id, label, index) {
      // Hide menu variant
      if (this.$refs.menuOverlay[index]) this.$refs.menuOverlay[index].click()
      this.onChangeOption({ id, code, label })
    },
    updateQty(e) {
      if (e.target.value > this.variant.quantity) {
        e.target.value = this.variant.quantity
      } else if (e.target.value > 999) {
        e.target.value = 999
      }
      this.internalValue = e.target.value
    },

    increase() {
      this.internalValue = this.internalValue + 1
    },
    decrease() {
      this.internalValue = this.internalValue - 1
    },
    addToCart() {
      this.onAddToCart(this.product, 'add-to-cart')
    },
  },
}
</script>
