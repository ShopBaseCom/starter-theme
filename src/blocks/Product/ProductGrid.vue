<template>
  <div class="row mt32">
    <div
      v-for="product in products"
      :key="product.id"
      :class="
        `col-${12 /
          (themeSettings.products_per_row_on_mobile || 1)} col-sm-3 mb24`
      "
    >
      <ProductTile
        :product="product"
        :adjust-height="themeSettings.crop_product_images"
        :show-second-product-image="themeSettings.show_secondary_product_image"
        :show-sale-banners="themeSettings.show_sale_banners"
        :judge-me="judgeMe"
        :turn-off-lazy-load="turnOffLazyLoad"
        :collection="collection"
      >
      </ProductTile>
    </div>
  </div>
</template>

<script>
import ProductTile from './ProductTile'
export default {
  name: 'ProductGrid',
  components: {
    ProductTile,
  },
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    collection: {
      type: Object,
      default: () => ({
        name: '',
      }),
    },
    themeSettings: {
      type: Object,
      default: () => {},
    },
    judgeMe: {
      type: Boolean,
      default: false,
    },
    turnOffLazyLoad: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
