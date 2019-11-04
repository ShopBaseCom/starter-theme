<template>
  <div class="collection-product-wrap relative">
    <router-link
      class=":hover-no-underline d-block"
      :to="
        collection && collection.id
          ? $routeToProductWithCollection(collection, product)
          : $routeToProduct(product)
      "
    >
      <div class="collection-detail__product-image mb12">
        <div
          ref="collectionImageContainer"
          class="collection-image-container hover-no-effect image-wrap text-align-center"
          :class="{
            'adjust-height': adjustHeight,
          }"
        >
          <web-image
            v-for="(image, index) in images(product)"
            :key="index"
            :src="image.src"
            width="500"
            height="0"
            :alt="image.alt || product.title | htmlDecode"
            :class="{ 'hover-secondary': images(product).length > 1 }"
          ></web-image>
          <div v-if="!$isPreview" class="loader-balls w-100 h-100">
            <div
              class="loader-balls__wrapper flex justify-space-between items-center"
            >
              <span class="loader-balls__item"></span>
              <span class="loader-balls__item"></span>
              <span class="loader-balls__item"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="collection-detail__product-details text-align-center">
        <span class="title d-block" itemprop="name">
          {{ product.title | htmlDecode }}
        </span>
        <div
          v-if="judgeMe"
          class="jdgm-widget jdgm-preview-badge my10"
          :data-id="product.id"
        ></div>
        <span class="d-block mt16 price">
          <span class="has-text-weight-medium money">
            {{ product.variants[0].price | price }}
          </span>
          <span v-if="isOnSale(product.variants[0])" class="was_price ml12">
            <span class="has-text-weight-medium money">
              {{ product.variants[0].compare_at_price | price }}
            </span>
          </span>
        </span>
      </div>
    </router-link>
    <div v-if="showBanner" class="banner_holder">
      <div
        v-if="
          showSaleBanners &&
            !isSoldOut(product) &&
            isOnSale(product.variants[0])
        "
        class="sale_banner thumbnail_banner"
      >
      </div>
      <div v-if="isSoldOut(product)" class="soldout_banner thumbnail_banner">
      </div>
      <div v-if="isNew(product)" class="new_banner thumbnail_banner"></div>
    </div>
  </div>
</template>

<script>
import { getCoreMixin } from '../../shared/mixin'
export default {
  name: 'ProductTile',
  mixins: [getCoreMixin('judgemeMixin')],
  props: {
    product: {
      type: Object,
      default: () => {},
    },
    collection: {
      type: Object,
      default: () => {},
    },
    adjustHeight: {
      type: Boolean,
      default: true,
    },
    showSecondProductImage: {
      type: Boolean,
      default: false,
    },
    showSaleBanners: {
      type: Boolean,
      default: true,
    },
    showBanner: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    images() {
      return (product) => {
        let gallery = []
        const numberImg = this.showSecondProductImage ? 2 : 1

        if (product.images && product.images.length) {
          gallery = product.images
            .slice()
            .sort((a, b) => a.pos - b.pos)
            .slice(0, numberImg)
          gallery = gallery.map(({ alt, src }) => {
            return { src, alt }
          })
        }

        return gallery.length ? gallery : [{ src: '' }]
      }
    },
  },
  methods: {
    isOnSale(product) {
      return (
        parseFloat(product.compare_at_price) > 0 &&
        parseFloat(product.price) < parseFloat(product.compare_at_price)
      )
    },
    isNew(product) {
      return product.new === '1'
    },
    isSoldOut(product) {
      return !product.available
    },
  },
}
</script>
