<template>
  <div class="thumbnail-carousel-bar flex justify-center">
    <div
      v-if="visible"
      :style="{ minWidth: thumbnailBarWidth }"
      :class="[
        'thumbnail-carousel-bar__wrapper flex justify-center',
        { 'brdr-toplr10': !thumbnailBarVisible },
      ]"
    >
      <div
        v-show="thumbnailBarVisible"
        class="thumbnail-carousel-bar__container flex flow-column items-center w-100"
      >
        <button
          class="thumbnail-carousel-bar__hide-thumbnails flex items-center pointer"
          @click="thumbnailBarVisible = false"
        >
          <span class="thumbnail-carousel-bar__down"></span>
        </button>
        <Carousel
          ref="thumbnailCarousel"
          :per-page="imagesPerPage"
          class="thumbnail-carousel-bar__thumbnails flex justify-center w-100"
          :navigation-enabled="true"
          :pagination-enabled="false"
          :loop="false"
          navigation-next-label="<svg class='svg-24' fill='#ffffff'><use xlink:href='#ic_keyboard_arrow_right_24px'></use></svg>"
          navigation-prev-label="<svg class='svg-24' fill='#ffffff'><use xlink:href='#ic_keyboard_arrow_left_24px'></use></svg>"
        >
          <Slide
            v-for="(images, index) in gallery"
            :key="images.src"
            :class="[
              'thumbnail-carousel-bar__slide pointer flex justify-center',
              {
                'thumbnail-carousel-bar__slide-active': currentPage === index,
              },
            ]"
          >
            <web-image
              ref="images"
              :src="images.src"
              :alt="images.alt || alt"
              :src-resolution="true"
              sizes="76px"
              class="pointer"
              @click="$emit('updateCurrentPage', index)"
            />
          </Slide>
        </Carousel>
      </div>
      <button
        v-show="!thumbnailBarVisible"
        class="thumbnail-carousel-bar__show-thumbnails flex items-center pointer"
        @click="thumbnailBarVisible = true"
      >
        <span class="thumbnail-carousel-bar__up"> </span>
        <span class="label ml8">Show thumbnails</span>
      </button>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from '@jambonn/vue-carousel'
export default {
  name: 'ThumbnailBar',
  components: {
    Carousel,
    Slide,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    gallery: {
      type: Array,
      required: true,
    },
    currentPage: {
      type: Number,
      default: 0,
    },
    stickyBarVisible: {
      type: Boolean,
      default: true,
    },
    alt: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      thumbnailBarVisible: !this.stickyBarVisible,
      imagesPerPage: 0,
      thumbnailBarWidth: '',
    }
  },
  watch: {
    currentPage(val) {
      if (
        this.$refs['thumbnailCarousel'] &&
        !this.$refs['thumbnailCarousel'].$children[val].isActive
      ) {
        this.changeCarouselPage(val)
      }
    },
    thumbnailBarVisible(val) {
      if (val && this.$refs['thumbnailCarousel']) {
        this.changeCarouselPage(this.currentPage)
      }
    },
  },
  mounted() {
    this.calculateImagesPerPage()
  },
  methods: {
    calculateImagesPerPage() {
      if (this.$isServer) return
      const windowWidth = window.innerWidth
      const images = this.gallery.length
      let slideWidth
      if (this.$isMobile()) {
        /**
         * slideWidth = imageWidth + marginRight = 32 + 8
         * padding of thumbnail-carousel-bar__container on mobile is 8px
         * => padding-left + padding-right = 8px
         * => (windowWidth - 8)
         * */
        slideWidth = 40
        if (images * slideWidth < windowWidth) {
          this.imagesPerPage = images
          this.thumbnailBarWidth = this.imagesPerPage * slideWidth + 8 + 'px'
        } else {
          this.imagesPerPage = Math.floor((windowWidth - 8) / slideWidth)
          this.thumbnailBarWidth = 'auto'
        }
      } else {
        /**
         * slideWidth = imageWidth + marginRight = 48 + 12
         * padding of thumbnail-carousel-bar__container on desktop is 12px
         * => padding-left + padding-right = 12px
         * => (windowWidth - 12)
         * */
        slideWidth = 60
        this.imagesPerPage =
          images * slideWidth < windowWidth
            ? images
            : Math.floor((windowWidth - 12) / slideWidth)
        this.thumbnailBarWidth = this.imagesPerPage * slideWidth + 12 + 'px'
      }
    },
    changeCarouselPage(page) {
      this.$nextTick(() => {
        this.$refs['thumbnailCarousel'].goToPage(
          Math.floor(page / this.imagesPerPage)
        )
      })
    },
  },
}
</script>
