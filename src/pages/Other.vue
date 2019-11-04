<template>
  <component
    :is="templateComponent"
    :routes="routes"
    :page="page"
    :body-html="bodyHtml"
  >
  </component>
</template>

<script>
import TemplateContactUs from '../templates/Page/ContactUs'
import TemplateDefault from '../templates/Page/Default'

export default {
  name: 'OnlineStorePage',
  components: {
    TemplateContactUs,
    TemplateDefault,
  },
  props: {
    page: {
      type: Object,
      default: () => {},
    },
    bodyHtml: {
      type: String,
      default: '',
    },
  },
  computed: {
    routes() {
      return [{ name: this.$t('Home'), route_link: '/' }]
    },
    templateComponent() {
      if (this.page.template_suffix === 'contact') {
        return 'TemplateContactUs'
      }

      return 'TemplateDefault'
    },
  },
}
</script>
