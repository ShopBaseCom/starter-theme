<template>
  <div class="media-gallery">
    <ProductImagesZoom
      v-if="zoomEnable && isZoomOpen"
      :images="product.images"
      :current-slide="currentSlide"
      :product-title="product.title"
      :variant-id="variantId"
      :thumbnail-carousel-visible="thumbnailCarouselVisible"
      :sticky-bar-visible="stickyBarVisible"
      @close="closeOverlay"
    >
    </ProductImagesZoom>

    <ProductImagesCarousel
      :images="product.images"
      :product-title="product.title"
      :featured-product-settings="featuredProductSettings"
      :theme-settings="themeSettings"
      :variant-id="variantId"
      @click-thumbnail="$emit('click-thumbnail', $event)"
      @toggle="openOverlay"
    >
    </ProductImagesCarousel>
  </div>
</template>

<script>
import { getCoreMixin } from '../../shared/mixin'
import ProductImagesCarousel from './ProductImagesCarousel'
const ProductImagesZoom = () =>
  import(/* webpackPrefetch: true */ './ProductImagesZoom')

export default {
  name: 'ProductImages',
  components: {
    ProductImagesCarousel,
    ProductImagesZoom,
  },
  mixins: [getCoreMixin('onEscapePressMixin')],
  props: {
    product: {
      type: Object,
      required: true,
    },
    variantId: {
      type: Number,
      default: 0,
    },
    zoomEnable: {
      type: Boolean,
      required: false,
      default: true,
    },
    thumbnailUsingCarousel: {
      type: Boolean,
      default: false,
    },
    thumbnailCarouselCurrentPage: {
      type: Number,
      default: 0,
    },
    thumbnailCarouselVisible: {
      type: Boolean,
      default: false,
    },
    stickyBarVisible: {
      type: Boolean,
      default: false,
    },
    optionBarVisible: {
      type: Boolean,
      default: false,
    },
    onThumbnailCarouselPageChange: {
      type: Function,
      default: () => {},
    },
    featuredProductSettings: {
      type: Object,
      default: () => {},
    },
    themeSettings: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isZoomOpen: false,
      currentSlide: 0,
    }
  },
  methods: {
    toggleZoom() {
      this.isZoomOpen = !this.isZoomOpen
    },
    onEscapePress() {
      if (this.isZoomOpen) {
        this.toggleZoom()

        if (!this.$isMobile()) {
          this.$emit('closeZoom')
        }
      }
    },
    openOverlay(currentSlide) {
      this.currentSlide = currentSlide
      this.toggleZoom()
      this.$emit('clickZoom')
    },
    closeOverlay() {
      this.toggleZoom()
      this.$emit('closeZoom')
    },
  },
}
</script>
