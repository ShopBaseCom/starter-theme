<template>
  <div
    v-lazy-container="{ selector: 'img', error: imgError }"
    class="product__description-right mt24"
  >
    <div
      v-for="(block, index) in tabs"
      :key="index"
      class="product_collapse mt16 pt15 brdr-top-1 brdr-cl-whisper"
    >
      <h6
        v-if="tabs.length > 1"
        class="h5 has-text-weight-medium is-uppercase pointer flex items-center"
        @click.prevent="changeTab(index)"
      >
        <span class="toggle_heading flex-grow">
          {{ tabHeading(block) }}
        </span>
        <span
          class="flex-basis icon-plus-arrow"
          :class="{ 'is-active': tabVisible[index] }"
        ></span>
      </h6>

      <SCollapseTransition>
        <div v-show="tabVisible[index]" class="toggle_content">
          <div v-html="tabBody(block)"></div>
        </div>
      </SCollapseTransition>
    </div>
  </div>
</template>

<script>
import SCollapseTransition from '../../utils/collapse'

export default {
  name: 'ProductDescriptionRight',
  components: { SCollapseTransition },
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
