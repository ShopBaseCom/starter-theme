<template>
  <div id="policy">
    <div v-if="page.title" class="container pt40">
      <div class="text-align-center text-align-left-md cart__breadcrumbs">
        <Breadcrumbs :routes="routes" :current="$t('Policies')"></Breadcrumbs>
      </div>
      <section class="scoped my24">
        <div class="row">
          <div class="col-12">
            <div class="text-wrapper">
              <h3
                class="text-align-center text-align-left-md cart__breadcrumbs"
              >
                {{ page.title }}
              </h3>
            </div>
          </div>
        </div>
      </section>
      <div class="container px16 mb55">
        <div class="row flex--justify-center">
          <div class="col-12 page-content">
            <pre style="white-space: pre-line;font-family: inherit;">
              {{ page.body }}
            </pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs'

export default {
  name: 'Policy',
  components: {
    Breadcrumbs,
  },
  props: {
    page: {
      type: Object,
      default: () => {},
    },
    breadcrumbs: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    routes() {
      return [{ name: this.$t('Home'), route_link: '/' }]
    },
  },
}
</script>
