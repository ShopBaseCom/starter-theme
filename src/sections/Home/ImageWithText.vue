<template>
  <section
    v-if="settings.choose_layout === 'image_with_text_on_the_right'"
    class="section feature-set"
  >
    <div class="container justify-center">
      <div
        v-for="(block, index) in settings.blocks"
        :key="index"
        class="row feature-set-content-wrap"
      >
        <div ref="imageWithText" class="col-12 col-md-6 feature-image">
          <web-image
            v-if="block.image"
            :src="block.image"
            width="555"
            height="0"
            :alt="block.alt_text"
          />
          <img v-else v-lazy="imagePlaceholder" :alt="block.alt_text" />
        </div>
        <div
          class="col-12 col-md-5 feature-content"
          :class="textAlignmentClass"
        >
          <h2 v-if="block.heading" class="h3 mb16">{{ block.heading }}</h2>
          <p v-if="block.text" class="mb24" v-html="block.text"></p>
          <div v-if="block.button_label" class="btn-wrap">
            <LinkFormatter
              v-if="block.button_link"
              :link="block.button_link"
              :class="{ 'btn btn-primary': block.show_button }"
            >
              {{ block.button_label }}
            </LinkFormatter>
            <a v-else href :class="{ 'btn btn-primary': block.show_button }">
              {{ block.button_label }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-else class="feature-block-1 special-block">
    <div class="container-fluid">
      <div class="row justify-center">
        <template v-for="(block, index) in settings.blocks">
          <div
            :key="index"
            ref="imageWithText"
            :class="[
              'col-12',
              'col-md-' + ((12 / (settings.images_per_row || 3)) % 10),
              'content-block',
              'text-align-center',
            ]"
          >
            <div class="overlay"></div>
            <web-image
              v-if="block.image"
              :src="block.image"
              width="960"
              height="0"
              :alt="block.alt_text"
            />
            <img v-else v-lazy="imagePlaceholder" :alt="block.alt_text" />
            <div class="content has-text-white mb4" :class="textAnimation">
              <h2 v-if="block.heading" class="h3 has-text-white">{{
                block.heading
              }}</h2>
              <div class="hover-content">
                <p v-if="block.text" class="mb16" v-html="block.text"></p>
                <LinkFormatter
                  v-if="block.button_link && block.button_label"
                  :link="block.button_link"
                  :class="{
                    'btn btn-primary banner-button': block.show_button,
                  }"
                >
                  {{ block.button_label }}
                </LinkFormatter>
                <a
                  v-else-if="!block.button_link && block.button_label"
                  href
                  :class="{
                    'btn btn-primary banner-button': block.show_button,
                  }"
                >
                  {{ block.button_label }}
                </a>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import LinkFormatter from '../../components/LinkFormatter'
import getDefaultImages from '../../utils/defaultImages'
export default {
  name: 'ImageWithText',
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
    imagePlaceholder() {
      return getDefaultImages('imagePlaceholder')
    },
    textAlignmentClass() {
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
    textAnimation() {
      switch (this.settings.promotions_animation) {
        case 'fade_in':
          return 'content--fade-in'
        case 'fade_up':
          return 'content--fade-up'
        case 'fade_down':
          return 'content--fade-down'
        default:
          return ''
      }
    },
  },
}
</script>
