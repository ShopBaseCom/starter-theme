<template>
  <div class="media-gallery">
    <ProductGalleryOverlay
      v-if="zoomEnable && isZoomOpen"
      :current-slide="currentSlide"
      :product-title="product.title"
      :gallery="gallery"
      :is-display-sticky="isDisplaySticky"
      :thumbnail-carousel-visible="thumbnailCarouselVisible"
      @close="onOverlayClose"
    />
  </div>
</template>

<script>
import { getCoreMixin } from '../../shared/mixin'
const ProductGalleryOverlay = () =>
  import(/* webpackPrefetch: true */ './ProductGalleryOverlay')
export default {
  components: {
    ProductGalleryOverlay,
  },
  mixins: [getCoreMixin('onEscapePressMixin')],
  props: {
    gallery: {
      type: Array,
      required: true,
    },
    configuration: {
      type: Object,
      required: true,
    },
    thumbnailUsingCarousel: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Object,
      required: true,
    },
    zoomEnable: {
      type: Boolean,
      required: false,
      default: true,
    },
    featuredProductSettings: {
      type: Object,
      default: () => {},
    },
    themeSettings: {
      type: Object,
      default: () => {},
    },
    isDisplaySticky: {
      type: Boolean,
      default: false,
    },
    thumbnailCarouselVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isZoomOpen: false,
      currentSlide: 0,
      carouselLoaded: false,
    }
  },
  methods: {
    openOverlay(currentSlide) {
      this.currentSlide = currentSlide
      this.toggleZoom()
      this.$emit('clickZoom')
    },
    validateRoute() {
      this.$forceUpdate()
    },
    toggleZoom() {
      this.isZoomOpen = !this.isZoomOpen
    },
    onEscapePress() {
      if (this.isZoomOpen) {
        this.toggleZoom()
        if (!this.$isMobile()) this.$emit('closeZoom')
      }
    },
    onOverlayClose() {
      this.toggleZoom()
      this.$emit('closeZoom')
    },
  },
}
</script>
