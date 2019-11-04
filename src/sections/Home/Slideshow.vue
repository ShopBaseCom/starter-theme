<template>
  <section
    v-if="settings.blocks.length"
    class="section slideshow-carousel special-block"
  >
    <div class="container-fluid">
      <Carousel
        id="gallery-carousel"
        ref="carousel"
        :per-page="1"
        :navigation-enabled="true"
        :mouse-drag="false"
        :touch-drag="false"
        :adjustable-height="true"
        :class="{ 'carousel--fade': settings.gallery_transition === 'fade' }"
        pagination-active-color="#1a1a1a"
        pagination-color="#e6e6e6"
        navigation-next-label="<svg class='svg-24' fill='#ffffff'><use xlink:href='#ic_keyboard_arrow_right_24px'></use></svg><div class='overlay'></div>"
        navigation-prev-label="<svg class='svg-24' fill='#ffffff'><use xlink:href='#ic_keyboard_arrow_left_24px'></use></svg><div class='overlay'></div>"
        :autoplay-timeout="
          (settings.change_slides_every ? settings.change_slides_every : 4) *
            1000
        "
        :autoplay="isAutoPlay"
        :loop="isAutoPlay"
        @pageChange="(page) => (currentSlide = page)"
      >
        <Slide
          v-for="(block, index) in settings.blocks"
          :key="index"
          :class="{ 'VueCarousel-slide-active': currentSlide === index }"
        >
          <div class="carousel-background mb24">
            <div class="overlay" :style="opacityLevel"></div>
            <web-image
              v-if="block.background_image"
              :src="block.background_image"
              width="2048"
              height="0"
              :alt="block.alt_text"
            />
            <img v-else v-lazy="bigImage" :alt="block.alt_text" />
          </div>
          <div
            class="text-wrap px15"
            :class="[
              textAlignment(block.text_position),
              textPosition(block.text_alignment),
              textAnimation(settings.text_animation),
            ]"
          >
            <div class="content">
              <p
                v-if="block.preheading"
                class="is-uppercase ls-2 mt0 mb12"
                v-html="block.preheading"
              ></p>
              <h2 v-if="block.heading" class="h2 mt0 mb12">
                {{ block.heading }}
              </h2>
              <p
                v-if="block.subheading"
                class="is-uppercase ls-2 mt0 mb24"
                v-html="block.subheading"
              ></p>
              <LinkFormatter
                v-if="block.first_button_label && block.first_button_link"
                :link="block.first_button_link"
                class="btn carousel__first-link mb12"
                :class="{
                  'btn-outline': !block.highlight_first_button_link,
                  'btn-primary banner-button':
                    block.highlight_first_button_link,
                }"
              >
                {{ block.first_button_label }}
              </LinkFormatter>
              <LinkFormatter
                v-if="block.second_button_label && block.second_button_link"
                :link="block.second_button_link"
                class="btn carousel__second-link"
                :class="{
                  'btn-outline': !block.highlight_second_button_link,
                  'btn-primary banner-button':
                    block.highlight_second_button_link,
                }"
              >
                {{ block.second_button_label }}
              </LinkFormatter>
            </div>
          </div>
        </Slide>
      </Carousel>
    </div>
  </section>
</template>

<script>
import { Carousel, Slide } from '@jambonn/vue-carousel'
import { getCoreMixin } from '../../shared/mixin'
import LinkFormatter from '../../components/LinkFormatter'
import getDefaultImages from '../../utils/defaultImages'
export default {
  name: 'Slideshow',
  components: {
    Carousel,
    Slide,
    LinkFormatter,
  },
  mixins: [getCoreMixin('carouselTouchMixin')],
  props: {
    settings: {
      type: Object,
      default: () => {},
    },
    forceSettings: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      currentSlide: 0,
    }
  },
  computed: {
    bigImage() {
      return getDefaultImages('homepage')['bigImage']
    },
    opacityLevel() {
      return {
        opacity: this.settings.opacity
          ? parseFloat(this.settings.opacity) / 100
          : 0,
      }
    },
    isAutoPlay() {
      return !(typeof this.forceSettings.autoplay !== 'undefined')
    },
  },
  watch: {
    forceSettings: {
      handler: function(val) {
        if (val) {
          this.$forceUpdate()
          this.$refs.carousel.goToPage(val.navigateTo)
        }
      },
      deep: true,
    },
  },
  methods: {
    textPosition(text_position) {
      switch (text_position) {
        case 'left':
          return 'text-wrap--left'
        case 'right':
          return 'text-wrap--right'
        case 'centre':
          return 'text-wrap--center'
        default:
          return 'text-wrap--left'
      }
    },
    textAlignment(text_alignment) {
      switch (text_alignment) {
        case 'left':
          return 'text-align-left'
        case 'centre':
          return 'text-align-center'
        case 'right':
          return 'text-align-right'
        default:
          return 'text-align-left'
      }
    },
    textAnimation(text_animation) {
      switch (text_animation) {
        case 'fade_in':
          return 'text-wrap--fade-in'
        case 'fade_up':
          return 'text-wrap--fade-up'
        case 'fade_down':
          return 'text-wrap--fade-down'
        default:
          return ''
      }
    },
  },
}
</script>
