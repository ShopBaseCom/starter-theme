<template>
  <section class="container-fluid no-padding">
    <div class="row no-gutters">
      <div class="col-12">
        <div
          class="product__description"
          :class="{ 'no-padding': tabs.length > 1 }"
        >
          <div class="container">
            <div class="row justify-center">
              <div
                v-lazy-container="{ selector: 'img', error: imgError }"
                class="col-12 col-md-10"
              >
                <BaseTabs :class="['hidden-xs', { 'is-hide': !tabs.length }]">
                  <TabItem
                    v-for="(block, index) in tabs"
                    :key="index"
                    :label="tabHeading(block)"
                  >
                    <div v-html="tabBody(block)"></div>
                  </TabItem>
                </BaseTabs>
                <div class="hidden-sm product-column-wrapper collapse-tab">
                  <div
                    v-for="(block, index) in tabs"
                    :key="index"
                    class="block"
                  >
                    <div
                      v-if="tabs.length > 1"
                      class="is-uppercase has-text-weight-medium block__heading"
                      :class="{ 'block__is-inactive': !tabVisible[index] }"
                      @click.prevent="changeTab(index)"
                    >
                      {{ tabHeading(block) }}
                    </div>
                    <div
                      :class="{
                        'collapse-tab__content': tabs.length > 1,
                      }"
                      v-html="tabBody(block)"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseTabs from '../../components/BaseTabs'
import TabItem from '../../components/TabItem'

export default {
  name: 'ProductDescriptionBottom',
  components: {
    BaseTabs,
    TabItem,
  },
  props: {
    tabs: {
      type: Array,
      required: true,
      default: () => [],
    },
    tabVisible: {
      type: Object,
      default: () => {},
    },
    imgError: {
      type: String,
      default: '',
    },
    tabHeading: {
      type: Function,
      default: () => {},
    },
    tabBody: {
      type: Function,
      default: () => {},
    },
    changeTab: {
      type: Function,
      default: () => {},
    },
  },
}
</script>
