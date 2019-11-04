<template>
  <div class="perment-wrap">
    <template v-for="({ id, type, settings }, index) in pageSettings">
      <Slideshow
        v-if="type === 'slideshow'"
        :key="id"
        :settings="settings"
        :force-settings="forceSlideshowSettings"
        :data-id="id"
      />
      <RichText
        v-if="type === 'rich_text'"
        :key="id"
        :settings="settings"
        :data-id="id"
      />
      <Banner
        v-if="type === 'banner'"
        :key="id"
        :settings="settings"
        :data-id="id"
      />
      <ImageWithText
        v-if="type === 'image_with_text'"
        :key="id"
        :settings="settings"
        :data-id="id"
      />
      <LogoList
        v-if="type === 'logo_list'"
        :key="id"
        :settings="settings"
        :data-id="id"
      />
      <Testimonial
        v-if="type === 'customer_testimonial'"
        :key="id"
        :settings="settings"
        :force-settings="forceTestimonialSettings"
        :data-id="id"
      />
      <Newsletter
        v-if="type === 'newsletter'"
        :key="id"
        :settings="settings"
        :data-id="id"
      />
      <FeaturedVideo
        v-if="type === 'video'"
        :key="id"
        :settings="settings"
        :data-id="id"
      />
      <CollectionList
        v-if="type === 'collection_list'"
        :key="id"
        :settings="settings"
        :collections="collectionList[id]"
        :data-id="id"
      />
      <FeaturedCollection
        v-if="type === 'featured_collection'"
        :key="id"
        :settings="settings"
        :products="featuredCollections[id] || []"
        :product-settings="productSettings"
        :data-id="id"
      />
      <FeaturedProduct
        v-if="type === 'featured_product'"
        :key="id"
        :featured-index="index"
        :featured-settings="settings"
        :product="getProductByHandle(settings)"
        :data-id="id"
        :cart-form-id="id"
      >
      </FeaturedProduct>
    </template>
  </div>
</template>

<script>
import {
  RichText,
  Banner,
  ImageWithText,
  Newsletter,
  FeaturedVideo,
  CollectionList,
  FeaturedProduct,
  LogoList,
  FeaturedCollection,
  Slideshow,
  Testimonial,
} from '../sections/Home'

export default {
  components: {
    FeaturedProduct,
    RichText,
    Banner,
    ImageWithText,
    Newsletter,
    FeaturedVideo,
    CollectionList,
    LogoList,
    Slideshow,
    Testimonial,
    FeaturedCollection,
  },
  props: {
    collectionList: {
      type: Object,
      default: () => {},
    },
    featuredCollections: {
      type: Object,
      default: () => {},
    },
    featuredProducts: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    pageSettings() {
      return this.$getPageSettings('homepage')
    },
    forceSlideshowSettings() {
      return this.$getForceSettings('slideshow')
    },
    forceTestimonialSettings() {
      return this.$getForceSettings('testimonial')
    },
    productSettings() {
      return this.$getThemeSettings('product_grid')
    },
  },
  methods: {
    getProductByHandle(settings) {
      let product = {}
      const handle =
        settings.product && settings.product.handle
          ? settings.product.handle
          : ''
      if (this.featuredProducts.length && handle) {
        const findProductByHandle = this.featuredProducts.find(
          (product) => product.handle === handle
        )
        if (findProductByHandle) {
          product = findProductByHandle
        }
      }
      return product
    },
  },
}
</script>
