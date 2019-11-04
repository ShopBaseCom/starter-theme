<template>
  <div class="product-page spacing-bottom">
    <div class="container pt40">
      <div class="row justify-space-between product__main-content">
        <div
          :class="[
            'col-12 col-md-6',
            { 'order-sm-2': settings.image_position === 'right' },
          ]"
        >
          <div class="aspect-ratio is-1by1">
            <img v-lazy="defaultImage" alt class="w-100" />
          </div>
        </div>
        <div
          :class="[
            'col-12 col-md-5',
            { 'order-sm-1': settings.image_position === 'right' },
          ]"
        >
          <div class="product__details">
            <h2 class="h3 product__name is-uppercase mt0 mb12" itemprop="name">
              {{ $t('Example product title') }}
            </h2>
            <div>
              <div class="product__price mt0 mb12">
                {{ 99.99 | price }}
              </div>
              <div class="product__variants">
                <div class="mb16">
                  <div class="product__variant-label mb8">
                    {{ $t('Color') }}
                  </div>
                  <div>
                    <button
                      class="mr16"
                      :class="[
                        'product__option',
                        {
                          'product__option--active': currentColor === 1,
                        },
                      ]"
                      :aria-label="$t('Select black')"
                      @click="currentColor = 1"
                    >
                      {{ $t('Black') }}
                    </button>
                    <button
                      class="mr16"
                      :class="[
                        'product__option',
                        {
                          'product__option--active': currentColor === 2,
                        },
                      ]"
                      :aria-label="$t('Select blue violet')"
                      @click="currentColor = 2"
                    >
                      {{ $t('Blue violet') }}
                    </button>
                  </div>
                </div>
                <div class="mb16">
                  <div class="product__variant-label mb8">
                    {{ $t('Size') }}
                  </div>
                  <div>
                    <button
                      class="mr16"
                      :class="[
                        'product__option',
                        {
                          'product__option--active': currentSize === 1,
                        },
                      ]"
                      :aria-label="$t('Select large')"
                      @click="currentSize = 1"
                    >
                      {{ $t('Large') }}
                    </button>
                    <button
                      class="mr16"
                      :class="[
                        'product__option',
                        {
                          'product__option--active': currentSize === 2,
                        },
                      ]"
                      :aria-label="$t('Select small')"
                      @click="currentSize = 2"
                    >
                      {{ $t('Small') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt0 mb30">
              <div>
                <label class="product__quantity-label mt0 mb8">
                  {{ $t('Quantity') }}
                </label>
                <Quantity v-model.number="quantity" :min="1" />
              </div>
            </div>
            <div class="m0 mb24">
              <button class="btn btn-primary">
                <span
                  ><slot>{{ $t('Add to cart') }}</slot></span
                >
              </button>
            </div>
            <a href>{{ $t('View product details') }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getDefaultImages from '../../utils/defaultImages'
import Quantity from '../../components/Quantity'
export default {
  name: 'ProductPlaceholder',
  components: {
    Quantity,
  },
  inheritAttrs: false,
  props: {
    settings: {
      type: Object,
      default: () => {
        return {
          image_position: 'left',
        }
      },
    },
  },
  data() {
    return {
      currentSize: 1,
      currentColor: 1,
      quantity: 1,
    }
  },
  computed: {
    defaultImage() {
      return getDefaultImages('featureCollection')['watch']
    },
  },
}
</script>
