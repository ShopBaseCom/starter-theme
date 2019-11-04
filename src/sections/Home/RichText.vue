<template>
  <section class="section annouce-block">
    <div class="container text-align-center">
      <h2 v-if="settings.heading" class="h3 mb12">{{ settings.heading }}</h2>
      <div
        v-if="settings.text"
        :class="textAlignmentClass"
        class="small-text"
        v-html="settings.text"
      ></div>
      <template v-if="settings.link && settings.link_label">
        <LinkFormatter :link="settings.link" class="small-text">
          {{ settings.link_label }}
        </LinkFormatter>
      </template>
    </div>
  </section>
</template>

<script>
import LinkFormatter from '../../components/LinkFormatter'
export default {
  name: 'RichText',
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
  },
}
</script>
