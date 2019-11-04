<template>
  <div class="collection-product-wrap relative">
    <a class=":hover-no-underline" target="_blank" :href="adminUrl">
      <div
        ref="collectionImageContainer"
        class="collection-detail__product-image mb12"
      >
        <div
          class="collection-image-container image-wrap"
          :class="{
            'adjust-height': adjustHeight,
          }"
        >
          <img v-lazy="product.image" alt />
        </div>
      </div>
      <div class="collection-detail__product-details text-align-center">
        <span
          class="title has-text-gray-nero d-block is-uppercase"
          itemprop="name"
        >
          {{ $t('Example product title') }}
        </span>
        <span class="d-block mt8 price">
          <span class="has-text-weight-medium money">
            {{ 99.99 | price }}
          </span>
        </span>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'PlaceholderProduct',
  props: {
    adjustHeight: {
      type: Boolean,
      default: true,
    },
    product: {
      type: Object,
      default: () => {},
    },
    isHomepagePlaceholder: {
      type: Boolean,
      default: () => {},
    },
  },
  computed: {
    adminUrl() {
      return this.isHomepagePlaceholder
        ? this.$themeEditorUrl
        : this.$createProductUrl
    },
  },
}
</script>
