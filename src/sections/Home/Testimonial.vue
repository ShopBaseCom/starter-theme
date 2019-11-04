<template>
  <section
    v-if="settings.blocks.length > 0"
    class="section testimonial-carousel"
  >
    <div class="container testimonial-container">
      <div class="container-wrap">
        <p class="h3 text-align-center mb24">{{ settings.title }}</p>
        <Carousel
          ref="carousel"
          :autoplay="isAutoPlay"
          :autoplay-timeout="settings.change_slides_every * 1000"
          :loop="isAutoPlay"
          :navigation-enabled="true"
          :per-page="slidePerPage || 1"
          :pagination-size="8"
          :class="{
            'fade--testimonial': settings.text_animation !== 'None',
          }"
          pagination-active-color="#4d4d4d"
          pagination-color="#bfbfbf"
          navigation-next-label="<svg class='svg-24' fill='#ffffff'><use xlink:href='#ic_keyboard_arrow_right_24px'></use></svg><div class='overlay'></div>"
          navigation-prev-label="<svg class='svg-24' fill='#ffffff'><use xlink:href='#ic_keyboard_arrow_left_24px'></use></svg><div class='overlay'></div>"
          @pageChange="(page) => (currentSlide = page)"
        >
          <Slide
            v-for="(block, index) in settings.blocks"
            :key="index"
            :class="[
              'items-center flex w-100 justify-center',
              { 'VueCarousel-slide-active': isActive(currentSlide, index) },
            ]"
          >
            <div
              class="overlay"
              :class="[{ 'darken-background': block.darken_background_image }]"
            ></div>
            <web-image
              v-if="block.use_image && !block.darken_background_image"
              :src="block.background_image"
              width="1140"
              height="0"
              :alt="block.alt_text"
            />
            <div
              class="testimonial-wrap w-100"
              :class="[
                textAlignment(block.text_alignment),
                textAnimation(settings.text_animation),
              ]"
            >
              <div
                class="testimonial-content"
                :class="[textPosition(block.text_position)]"
              >
                <h2 class="h3">{{ settings.title }}</h2>
                <div v-html="block.content"></div>
                <p class="testimonial-name is-uppercase">
                  {{ block.customer_name }}
                </p>
                <LinkFormatter
                  v-if="block.store_link"
                  class="testimonial-company"
                  target="_blank"
                  :link="block.store_link"
                >
                  {{ block.store_name }}
                </LinkFormatter>
                <a v-else href="#" class="testimonial-company">
                  {{ block.store_name }}
                </a>
              </div>
            </div>
          </Slide>
        </Carousel>
      </div>
    </div>
  </section>
</template>

<script>
import { Carousel, Slide } from '@jambonn/vue-carousel'
import LinkFormatter from '../../components/LinkFormatter'
import { getCoreMixin } from '../../shared/mixin'

export default {
  name: 'Testimonial',
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
    isAutoPlay() {
      return !(typeof this.forceSettings.autoplay !== 'undefined')
    },
    slidePerPage() {
      return this.$isMobile()
        ? 1
        : this.settings.blocks.length > 3
        ? 3
        : this.settings.blocks.length
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
    isActive(currSlide, index) {
      if (!this.$isMobile()) {
        if (this.settings.blocks.length > 3) {
          const numberBlock = 3 - (this.settings.blocks.length % 3) //get the number of block that is lacking in a last slide
          return (
            currSlide * 3 - numberBlock <= index && index < (currSlide + 1) * 3 //get the image in the current slide
          )
        } else {
          return true
        }
      }
      return currSlide === index
    },
    textPosition(text_position) {
      switch (text_position) {
        case 'left':
          return 'testimonial-content--left'
        case 'right':
          return 'testimonial-content--right'
        case 'centre':
          return ''
        default:
          return ''
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
          return 'text-align-center'
      }
    },
    textAnimation(text_animation) {
      switch (text_animation) {
        case 'fade_in':
          return 'testimonial-wrap--fade-in'
        case 'fade_up':
          return 'testimonial-wrap--fade-up'
        case 'fade_down':
          return 'testimonial-wrap--fade-down'
        default:
          return ''
      }
    },
  },
}
</script>
