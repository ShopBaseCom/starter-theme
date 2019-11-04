<template>
  <section v-if="youTubeVideoSrc" class="section video text-align-center">
    <div ref="video-container" class="container">
      <div v-if="settings.autoplay_video" ref="video" class="mediaWrapper">
        <iframe
          :src="
            `${youTubeVideoSrc}?&autoplay=${inView}&loop=1&rel=0&hd=1&showinfo=0&color=white&controls=0`
          "
          frameborder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
        ></iframe>
      </div>
      <template v-else>
        <div v-if="!handleAutoplay" class="video__media">
          <div class="video-wrap">
            <web-image
              :src="settings.image"
              width="1140"
              height="0"
              :alt="settings.alt_text"
              @load="imageLoaded = true"
            />
            <div class="overlay"></div>
            <div
              v-show="imageLoaded"
              class="content-wrap"
              :class="[
                textPosition(settings.text_position),
                textAlignment(settings.text_alignment),
              ]"
            >
              <div
                v-if="settings.display_solid_text_background"
                :class="
                  enableBackground(settings.display_solid_text_background)
                "
              ></div>
              <LinkFormatter
                v-if="
                  settings.first_button_label &&
                    settings.first_button_link &&
                    settings.first_button_link.type
                "
                class="btn link-initial mr15 override-content"
                target="_blank"
                :class="highlightButton(settings.highlight_first_button_link)"
                :link="settings.first_button_link"
              >
                {{ settings.first_button_label }}
              </LinkFormatter>
              <button
                v-else-if="
                  settings.first_button_label &&
                    settings.first_button_link &&
                    !settings.first_button_link.type
                "
                class="btn link-initial override-content"
                :class="highlightButton(settings.highlight_first_button_link)"
                @click.prevent="handleClick"
              >
                {{ settings.first_button_label }}
              </button>
              <LinkFormatter
                v-if="
                  settings.second_button_label &&
                    settings.second_button_link &&
                    settings.second_button_link.type
                "
                class="btn link-initial override-content"
                target="_blank"
                :class="highlightButton(settings.highlight_second_button_link)"
                :link="settings.second_button_link"
              >
                {{ settings.second_button_label }}
              </LinkFormatter>
              <button
                v-else-if="
                  settings.second_button_label &&
                    settings.second_button_link &&
                    !settings.second_button_link.type
                "
                class="btn link-initial override-content"
                :class="highlightButton(settings.highlight_second_button_link)"
                @click.prevent="handleClick"
              >
                {{ settings.second_button_label }}
              </button>
              <div class="text-desktop">
                <div
                  class="is-uppercase has-text-white mt24"
                  v-html="settings.preheading"
                ></div>
                <h2 class="h3 has-text-white mt12">{{ settings.heading }}</h2>
                <p class="has-text-white">{{ settings.subheading }}</p>
              </div>
            </div>
          </div>
          <div
            v-show="imageLoaded"
            class="text-mobile mt24"
            :class="textAlignment(settings.text_alignment)"
          >
            <div
              class="is-uppercase has-text-black mt24"
              v-html="settings.preheading"
            ></div>
            <h2 class="h3 has-text-black mt12">{{ settings.heading }}</h2>
            <p class="has-text-black">{{ settings.subheading }}</p>
          </div>
        </div>

        <div v-else class="mediaWrapper">
          <iframe
            :src="
              `${youTubeVideoSrc}?&loop=1&rel=0&hd=1&showinfo=0&color=white&controls=0`
            "
            frameborder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
          ></iframe>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import LinkFormatter from '../../components/LinkFormatter'
export default {
  name: 'FeaturedVideo',
  components: {
    LinkFormatter,
  },
  props: {
    settings: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      handleAutoplay: false,
      inView: 0,
      imageLoaded: false,
    }
  },
  computed: {
    youTubeVideoSrc() {
      return this.settings && this.settings.link
        ? this.toEmbedUrl(this.settings.link)
        : ''
    },
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollAutoPlay)
  },
  mounted() {
    window.addEventListener('scroll', this.scrollAutoPlay)
  },
  methods: {
    scrollAutoPlay() {
      if (
        this.settings &&
        this.settings.autoplay_video &&
        this.youTubeVideoSrc
      ) {
        const iframeVideo = this.$refs.video
        if (
          iframeVideo.getBoundingClientRect().top <= 0 ||
          iframeVideo.getBoundingClientRect().bottom <=
            (window.innerHeight || document.documentElement.clientHeight)
        ) {
          if (!this.inView) {
            this.$nextTick(() => {
              this.inView = 1
              this.$forceUpdate()
            })
          }
        }
      }
    },
    toEmbedUrl(url) {
      const youTubeGetID = (url) => {
        url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/)
        return undefined !== url[2] ? url[2].split(/[^0-9a-z_]/i)[0] : url[0]
      }
      return `//www.youtube.com/embed/${youTubeGetID(url)}`
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
    textPosition(text_position) {
      switch (text_position) {
        case 'left':
          return 'content-wrap--left'
        case 'right':
          return 'content-wrap--right'
        case 'centre':
          return ''
        default:
          return ''
      }
    },
    highlightButton(setting) {
      return setting ? 'btn-primary' : 'btn-outline-white'
    },
    enableBackground(setting) {
      return setting ? 'overlay-content' : ''
    },
    handleClick() {
      this.handleAutoplay = true
    },
  },
}
</script>
