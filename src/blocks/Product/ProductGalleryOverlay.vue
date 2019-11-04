<template>
  <div class="thumbnail-media-zoom">
    <div class="thumbnail-media-zoom__background">
      <div class="thumbnail-media-zoom__close">
        <svg class="thumbnail-media-zoom__close-icon" @click="$emit('close')">
          <use xlink:href="#ic_close_24px"></use>
        </svg>
      </div>
      <div
        ref="thumbnailMediaZoomContainer"
        class="thumbnail-media-zoom__container
        "
      >
        <div class="thumbnail-media-zoom__carousel">
          <swiper
            ref="gallerySwiper"
            :options="swiperOptions"
            :style="{ height: `calc(100vh - ${thumbnailBarBottom})` }"
            class="flex items-center"
            @slideChangeTransitionEnd="onSlideChange(swiper.activeIndex)"
          >
            <swiper-slide
              v-for="(images, index) in gallery"
              :key="images.src"
              class="flex justify-center items-center"
            >
              <div
                class="swiper-zoom-container flex items-center justify-center h-100 w-100"
              >
                <web-image
                  v-show="hideImageAtIndex !== index"
                  :id="`image-${index}`"
                  ref="images"
                  :src="images.src"
                  :alt="images.alt || productTitle | htmlDecode"
                  width="300"
                  height="0"
                  itemprop="image"
                  @click="onZoomSlide"
                />
              </div>
            </swiper-slide>
            <div
              slot="button-prev"
              class="swiper-navigation-btn swiper-button-prev"
            >
              <span class="left-arrow"></span>
            </div>
            <div
              slot="button-next"
              class="swiper-navigation-btn swiper-button-next"
            >
              <span class="right-arrow"></span>
            </div>
          </swiper>
        </div>
      </div>
      <ThumbnailBar
        ref="thumbnailBar"
        :style="{ bottom: thumbnailBarBottom }"
        :visible="thumbnailCarouselVisible"
        :is-display-sticky="isDisplaySticky"
        :gallery="gallery"
        :current-page="currentPage"
        :alt="productTitle || htmlDecode"
        @updateCurrentPage="onSlideChange"
      />
    </div>
  </div>
</template>

<script>
import ThumbnailBar from './ThumbnailBar'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'ProductGalleryOverlay',
  components: {
    ThumbnailBar,
    swiper,
    swiperSlide,
  },
  props: {
    currentSlide: {
      type: Number,
      required: false,
      default: 0,
    },
    isDisplaySticky: {
      type: Boolean,
      default: true,
    },
    gallery: {
      type: Array,
      required: true,
    },
    productTitle: {
      type: String,
      required: false,
      default: '',
    },
    thumbnailCarouselVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      carouselTransitionSpeed: 300,
      hideImageAtIndex: null,
      currentPage: 0,
      thumbnailBarBottom: 0,
      swiperOptions: {
        autoHeight: true,
        keyboard: {
          enabled: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    }
  },
  beforeMount() {
    this.$bus.$on('change-variant', this.onChangeVariant)
  },
  mounted() {
    this.$toggleOverlay(true)
    this.$nextTick(() => {
      this.onSlideChange(this.currentSlide)
      let stickyBar = document.getElementById('sticky-bar')
      if (stickyBar) {
        this.thumbnailBarBottom = stickyBar.offsetHeight + 'px'
      }

      this.navigate(this.currentSlide)
      if (this.$refs.zoomCarousel) {
        let navigation = this.$refs.zoomCarousel.$children.find(
          (c) => c.$el.className === 'VueCarousel-navigation'
        )
        let pagination = this.$refs.zoomCarousel.$children.find(
          (c) => c.$el.className === 'VueCarousel-pagination'
        )
        if (navigation !== undefined) {
          navigation.$on(
            'navigationclick',
            this.increaseCarouselTransitionSpeed
          )
        }
        if (pagination !== undefined) {
          pagination.$on(
            'paginationclick',
            this.increaseCarouselTransitionSpeed
          )
        }
      }
    })
  },
  beforeDestroy() {
    this.$bus.$off('change-variant', this.onChangeVariant)
  },
  destroyed() {
    this.$toggleOverlay(false)
  },
  methods: {
    navigate(key) {
      if (this.$refs.zoomCarousel) {
        this.$refs.zoomCarousel.goToPage(key)
      }
    },
    increaseCarouselTransitionSpeed() {
      this.carouselTransitionSpeed = 500
    },
    pageChange(index) {
      this.currentPage = index
      this.hideImageAtIndex = null
    },
    onChangeVariant(key) {
      this.navigate(key)
    },
    onSlideChange(page) {
      const image = document.getElementById(`image-${page}`)
      if (image) {
        const dataSrc = image.getAttribute('data-src')
        image.setAttribute('src', dataSrc)
        image.setAttribute('lazy', 'loaded')
        this.$refs.gallerySwiper.swiper.activeIndex = page
        this.currentPage = page
      }
    },
  },
}
</script>
