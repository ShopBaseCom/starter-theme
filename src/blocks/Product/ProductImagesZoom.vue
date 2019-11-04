<template>
  <div>
    <div
      v-if="thumbnailCarouselVisible"
      class="thumbnail-media-zoom"
      :style="{ height: `calc(100% - ${thumbnailBarBottom})` }"
    >
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
            <div
              v-show="imageZoomed.status"
              ref="zoomed"
              class="thumbnail-media-zoom__carousel__zoomed"
              @click="checkDoubleClick()"
            >
              <img
                ref="zoomedImage"
                :src="imageZoomed.src"
                @load="checkImageZoomed()"
              />
            </div>
            <swiper
              ref="gallerySwiper"
              :options="swiperOptions"
              class="flex items-center"
              @slideChangeTransitionEnd="onSlideChange(swiper.activeIndex)"
            >
              <swiper-slide
                v-for="(image, index) in images"
                :key="image.src"
                class="flex justify-center items-center"
              >
                <div
                  class="swiper-zoom-container flex items-center justify-center h-100 w-100"
                >
                  <web-image
                    v-show="hideImageAtIndex !== index"
                    :id="`image-${index}`"
                    ref="images"
                    :src="image.src"
                    :alt="image.alt || productTitle | htmlDecode"
                    width="300"
                    height="0"
                    itemprop="image"
                    @click="checkDoubleClick(image.src)"
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
          :visible="thumbnailCarouselVisible"
          :gallery="images"
          :sticky-bar-visible="stickyBarVisible"
          :current-page="currentPage"
          :alt="productTitle || htmlDecode"
          @updateCurrentPage="onSlideChange"
        />
      </div>
    </div>
    <div v-else class="media-zoom">
      <div class="media-zoom__background"></div>
      <div class="media-zoom__container">
        <div class="media-zoom__close p15">
          <svg class="media-zoom__close-icon svg-24" @click="$emit('close')">
            <use xlink:href="#ic_close_24px"></use>
          </svg>
        </div>
        <div class="media-zoom__carousel">
          <Carousel
            ref="zoomCarousel"
            :per-page="1"
            :mouse-drag="false"
            :navigation-enabled="true"
            :pagination-enabled="false"
            :adjustable-height="true"
            :loop="true"
            navigation-next-label="<svg class='svg-24' fill='#ffffff'><use xlink:href='#ic_keyboard_arrow_right_24px'></use></svg>"
            navigation-prev-label="<svg class='svg-24' fill='#ffffff'><use xlink:href='#ic_keyboard_arrow_left_24px'></use></svg>"
            :speed="carouselTransitionSpeed"
            @pageChange="pageChange"
          >
            <Slide
              v-for="(image, index) in images"
              :key="image.src"
              class="product-gallery-image"
            >
              <web-image
                v-show="hideImageAtIndex !== index"
                ref="images"
                :src="image.src"
                :alt="image.alt || productTitle | htmlDecode"
                width="750"
                height="0"
                itemprop="image"
              />
            </Slide>
          </Carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from '@jambonn/vue-carousel'
import ThumbnailBar from './ThumbnailBar'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'ProductGalleryOverlay',
  components: {
    Carousel,
    Slide,
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
    images: {
      type: Array,
      required: true,
    },
    productTitle: {
      type: String,
      required: false,
      default: '',
    },
    stickyBarVisible: {
      type: Boolean,
      default: true,
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
      imageZoomed: {
        status: false,
        src: '',
      },
      touchtime: 0,
    }
  },
  computed: {
    swiper() {
      return this.$refs.gallerySwiper.swiper
    },
  },
  beforeMount() {
    this.$bus.$on('change-variant', this.onChangeVariant)
  },
  mounted() {
    this.$toggleOverlay(true)
    this.$nextTick(() => {
      if (this.thumbnailCarouselVisible) {
        this.onSlideChange(this.currentSlide)
        this.getThumbnailBarBottom()
        window.addEventListener('resize', () => {
          setTimeout(() => {
            this.getThumbnailBarBottom()
          }, 500)
        })
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
      const dataSrc = image.getAttribute('data-src')
      image.setAttribute('src', dataSrc)
      image.setAttribute('lazy', 'loaded')
      this.swiper.activeIndex = page
      this.currentPage = page
    },
    getThumbnailBarBottom() {
      let stickyBar = document.getElementById('sticky-bar')
      if (stickyBar) {
        this.thumbnailBarBottom = stickyBar.offsetHeight + 'px'
      }
    },
    checkDoubleClick(src) {
      if (this.touchtime === 0) {
        // first click
        this.touchtime = new Date().getTime()
      } else {
        if (new Date().getTime() - this.touchtime < 400) {
          // double click
          this.checkZoomImage(src)
          this.touchtime = 0
        } else {
          // current click
          this.touchtime = new Date().getTime()
        }
      }
    },
    checkZoomImage(src) {
      if (src) {
        this.zoomInImage(src)
      } else {
        this.zoomOutImage()
      }
    },
    zoomInImage(src) {
      this.imageZoomed.status = true
      this.imageZoomed.src = src
    },
    zoomOutImage() {
      this.imageZoomed.status = false
      this.imageZoomed.src = ''

      this.$refs.zoomedImage.style = null
    },
    checkImageZoomed() {
      this.setImageMarginTop()
      this.setImageScroll()
    },
    setImageMarginTop() {
      const parentHeight = this.$refs.zoomed.clientHeight
      const childHeight = this.$refs.zoomedImage.clientHeight

      if (childHeight < parentHeight) {
        const marginTop = (parentHeight - childHeight) / 2
        this.$refs.zoomedImage.style.marginTop = `${marginTop}px`
      }
    },
    setImageScroll() {
      this.checkScrollTop()
      this.checkScrollLeft()
    },
    checkScrollTop() {
      const parentHeight = this.$refs.zoomed.clientHeight
      const childHeight = this.$refs.zoomedImage.clientHeight

      if (parentHeight < childHeight) {
        const scrollTop = (childHeight - parentHeight) / 2
        this.$refs.zoomed.scrollTop = scrollTop
      }
    },
    checkScrollLeft() {
      const parentWidth = this.$refs.zoomed.clientWidth
      const childWidth = this.$refs.zoomedImage.clientWidth

      if (parentWidth < childWidth) {
        const scrollLeft = (childWidth - parentWidth) / 2
        this.$refs.zoomed.scrollLeft = scrollLeft
      }
    },
  },
}
</script>
