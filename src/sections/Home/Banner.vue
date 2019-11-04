<template>
  <section class="section slideshow-carousel banner special-block">
    <div class="container-fluid">
      <div ref="banner" class="VueCarousel">
        <div class="VueCarousel-slide">
          <div class="carousel-background mb24">
            <web-image
              v-if="settings.background_image"
              :src="settings.background_image"
              width="2048"
              height="0"
              :alt="settings.alt_text"
            />
            <img v-else v-lazy="bigImage" :alt="settings.alt_text" />
            <div class="overlay" :style="opacityLevel"></div>
          </div>
          <div class="text-wrap px15" :class="[textAlign, textPosition]">
            <div class="content">
              <p
                v-if="settings.preheading"
                class="is-uppercase ls-2 mt0 mb12"
                v-html="settings.preheading"
              ></p>
              <h2 v-if="settings.heading" class="h2 mt0 mb12">
                {{ settings.heading }}
              </h2>
              <p
                v-if="settings.subheading"
                class="is-uppercase ls-2 mt0 mb24"
                v-html="settings.subheading"
              ></p>
              <LinkFormatter
                v-if="settings.first_button_label && settings.first_button_link"
                :link="settings.first_button_link"
                class="btn carousel__first-link mb12"
                :class="{
                  'btn-outline': !settings.highlight_first_button_link,
                  'btn-primary banner-button':
                    settings.highlight_first_button_link,
                }"
              >
                {{ settings.first_button_label }}
              </LinkFormatter>
              <LinkFormatter
                v-if="
                  settings.second_button_label && settings.second_button_link
                "
                :link="settings.second_button_link"
                class="btn carousel__second-link"
                :class="{
                  'btn-outline': !settings.highlight_second_button_link,
                  'btn-primary banner-button':
                    settings.highlight_second_button_link,
                }"
              >
                {{ settings.second_button_label }}
              </LinkFormatter>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LinkFormatter from '../../components/LinkFormatter'
import getDefaultImages from '../../utils/defaultImages'
export default {
  name: 'Banner',
  components: {
    LinkFormatter,
  },
  props: {
    settings: {
      type: Object,
      default: () => {},
    },
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
    textPosition() {
      switch (this.settings.text_position) {
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
    textAlign() {
      switch (this.settings.text_alignment) {
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
  },
}
</script>
