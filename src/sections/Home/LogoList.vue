<template>
  <section class="section logo-list">
    <div class="container">
      <div class="row justify-center">
        <h2 v-if="settings.heading" class="h3 text-align-center mb24">
          {{ settings.heading }}
        </h2>
      </div>
      <Carousel
        class="logo-list-carousel"
        :mouse-drag="false"
        :per-page="1"
        :pagination-enabled="true"
      >
        <template v-if="logoGroupsOfSix.length > 0">
          <Slide
            v-for="(group, index) in logoGroupsOfSix"
            :key="index"
            class="flex flex-wrap align-center"
            :class="{ 'justify-center': logoGroupsOfSix.length === 1 }"
          >
            <div
              v-for="(logo, i) in group"
              :key="i"
              ref="logo"
              class="col-6 col-md-2 logo-wrap flex align-center justify-center"
            >
              <LinkFormatter v-if="logo.link" :link="logo.link">
                <web-image
                  v-if="logo.image"
                  :src="logo.image"
                  width="240"
                  height="0"
                  :alt="logo.alt_text"
                />
                <img v-else v-lazy="defaultLogo" :alt="logo.alt_text" />
              </LinkFormatter>
              <a v-else href="#">
                <web-image
                  v-if="logo.image"
                  :src="logo.image"
                  width="240"
                  height="0"
                  :alt="logo.alt_text"
                />
                <img v-else v-lazy="defaultLogo" :alt="logo.alt_text" />
              </a>
            </div>
          </Slide>
        </template>
        <template v-else>
          <Slide class="flex flex-wrap align-center justify-center">
            <div
              v-for="index in 6"
              :key="index"
              class="col-6 col-md-2 logo-wrap flex align-center justify-center"
            >
              <a href="#">
                <img v-lazy="defaultLogo" alt />
              </a>
            </div>
          </Slide>
        </template>
      </Carousel>
    </div>
  </section>
</template>

<script>
import { Carousel, Slide } from '@jambonn/vue-carousel'
import LinkFormatter from '../../components/LinkFormatter'
import getDefaultImages from '../../utils/defaultImages'
export default {
  name: 'LogoList',
  components: {
    LinkFormatter,
    Carousel,
    Slide,
  },
  props: {
    settings: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    defaultLogo() {
      return getDefaultImages('logoPlaceholder')
    },
    logoGroupsOfSix() {
      if (this.settings.blocks && this.settings.blocks.length) {
        return this.settings.blocks.reduce((resultArray, item, index) => {
          const chunkIndex = Math.floor(index / 6)
          if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []
          }
          resultArray[chunkIndex].push(item)

          return resultArray
        }, [])
      } else {
        return []
      }
    },
  },
}
</script>
