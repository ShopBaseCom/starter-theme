<template>
  <section class="section product-carousel">
    <div class="container">
      <div class="row justify-center">
        <h2
          v-if="settings.heading"
          class="h3 text-align-center product-carousel__heading"
        >
          {{ settings.heading }}
        </h2>
      </div>
      <Carousel
        v-if="settings.layout === 'slider'"
        :navigation-enabled="true"
        :per-page-custom="[[0, 2], [768, settings.product_per_row || 4]]"
        :per-page="4"
        :pagination-enabled="!settings.show_view_more_button"
        :max-pagination-dot-count="maxPaginationDot"
        :pagination-size="8"
        :pagination-padding="3"
        pagination-color="rgba(191, 191, 191, 0.5)"
        pagination-active-color="#4d4d4d"
        navigation-next-label="<svg class='svg-24' fill='#ffffff'><use xlink:href='#ic_keyboard_arrow_right_24px'></use></svg><div class='overlay'></div>"
        navigation-prev-label="<svg class='svg-24' fill='#ffffff'><use xlink:href='#ic_keyboard_arrow_left_24px'></use></svg><div class='overlay'></div>"
      >
        <template v-if="products.length > 0">
          <Slide v-for="(product, index) in products" :key="index">
            <ProductTile
              ref="productTile"
              :product="product"
              :collection="settings.collection"
            >
            </ProductTile>
          </Slide>
        </template>
        <template v-else>
          <Slide
            v-for="product in formattedPlaceholderProducts"
            :key="product.name"
          >
            <PlaceholderProduct
              ref="productTile"
              :product="product"
              :is-homepage-placeholder="true"
            />
          </Slide>
        </template>
      </Carousel>
      <template v-else>
        <div v-if="products.length > 0" class="row">
          <div
            v-for="product in products"
            :key="product.id"
            :class="[
              `col-${12 /
                (productSettings.products_per_row_on_mobile || 1)} col-md-${12 /
                (settings.product_per_row || 4)} col-wrap`,
              { 'col-md-one-fifth': settings.product_per_row === 5 },
            ]"
          >
            <ProductTile
              ref="productTile"
              :product="product"
              :adjust-height="productSettings.crop_product_images"
              :show-second-product-image="
                productSettings.show_secondary_product_image
              "
              :collection="settings.collection"
              :show-sale-banners="productSettings.show_sale_banners"
            >
            </ProductTile>
          </div>
        </div>
        <div v-else class="row">
          <div
            v-for="product in formattedPlaceholderProducts"
            :key="product.name"
            :class="[
              `col-${12 /
                (productSettings.products_per_row_on_mobile || 1)} col-md-${12 /
                (settings.product_per_row || 4)} col-wrap`,
              { 'col-md-one-fifth': settings.product_per_row === 5 },
            ]"
          >
            <PlaceholderProduct
              ref="productTile"
              :product="product"
              :is-homepage-placeholder="true"
            />
          </div>
        </div>
      </template>
      <div
        v-if="
          settings.show_view_more_button &&
            settings.collection &&
            settings.collection.handle
        "
        class="flex justify-center mt24"
      >
        <router-link
          :to="$routeToCollection(settings.collection)"
          class="view-more btn btn-outline"
        >
          {{ settings.view_more_button_label }}
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { Carousel, Slide } from '@jambonn/vue-carousel'
import ProductTile from '../../blocks/Product/ProductTile'
import PlaceholderProduct from '../../blocks/Product/PlaceholderProduct'
import getDefaultImages from '../../utils/defaultImages'

export default {
  name: 'FeaturedCollection',
  components: {
    Carousel,
    Slide,
    ProductTile,
    PlaceholderProduct,
  },
  props: {
    settings: {
      type: Object,
      default: () => {},
    },
    products: {
      type: Array,
      default: () => [],
    },
    productSettings: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    maxPaginationDot() {
      let product_per_page = 2
      if (!this.$isMobile()) {
        product_per_page = this.settings.product_per_row
      }
      return this.products.length > 9 * product_per_page ? 9 : -1
    },
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
  mounted() {
    this.calculatePositionCarouselNavigation()

    window.addEventListener('resize', () => {
      this.calculatePositionCarouselNavigation()
    })
  },
  methods: {
    calculatePositionCarouselNavigation() {
      setTimeout(() => {
        const productTile = this.getProductTile()
        if (!productTile) return

        const imageContainer = this.getImageContainer(productTile)
        if (!imageContainer) return

        const height = imageContainer.clientHeight
        const carousel = this.$el.querySelector('.VueCarousel-navigation')
        if (!carousel) return

        carousel.style.top = `${height / 2}px`
      }, 100)
    },

    getProductTile() {
      if (
        this.$refs &&
        this.$refs.productTile &&
        Array.isArray(this.$refs.productTile)
      ) {
        return this.$refs.productTile[0]
      }

      return null
    },

    getImageContainer(productTile) {
      if (
        productTile &&
        productTile.$refs &&
        productTile.$refs.collectionImageContainer
      ) {
        return productTile.$refs.collectionImageContainer
      }

      return null
    },
  },
}
</script>
