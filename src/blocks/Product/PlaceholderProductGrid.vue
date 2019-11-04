<template>
  <div class="row mt32">
    <div
      v-for="product in formattedPlaceholderProducts"
      :key="product.name"
      :class="
        `col-${12 /
          (themeSettings.products_per_row_on_mobile || 1)} col-sm-3 mb24`
      "
    >
      <PlaceholderProduct
        :adjust-height="themeSettings.crop_product_images"
        :product="product"
        :is-homepage-placeholder="false"
      />
    </div>
  </div>
</template>

<script>
import getDefaultImages from '../../utils/defaultImages'
import PlaceholderProduct from './PlaceholderProduct'
export default {
  name: 'PlaceholderProductGrid',
  components: {
    PlaceholderProduct,
  },
  props: {
    category: {
      type: Object,
      default: () => ({
        name: '',
      }),
    },
    themeSettings: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    placeholderProducts() {
      return getDefaultImages('featureCollection')
    },
    formattedPlaceholderProducts() {
      return Object.keys(this.placeholderProducts).map((key) => {
        return {
          name: key,
          image: this.placeholderProducts[key],
        }
      })
    },
  },
}
</script>
