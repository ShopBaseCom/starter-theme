<template>
  <div id="online-store-page">
    <div v-if="page.title" class="container pt40">
      <div class="text-align-center text-align-left-md cart__breadcrumbs">
        <Breadcrumbs :routes="routes" :current="page.title"></Breadcrumbs>
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
            <div v-html="bodyHtml"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '../../components/Breadcrumbs'
export default {
  name: 'TemplatePageDefault',
  components: {
    Breadcrumbs,
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
    routes: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
