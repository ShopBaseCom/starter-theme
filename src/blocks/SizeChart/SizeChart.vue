<template>
  <Modal :visible="true" @close="onClose">
    <template v-if="content && content.length > 1">
      <h3 class="product__size-chart__title">
        {{ $t('SIZE CHART') }}
      </h3>
      <BaseSelect
        :options="options"
        :selected="optionDefault"
        :label="$t('PRODUCT')"
        class="product__size-chart__select mb16"
        @input="changeSizeChart"
      >
      </BaseSelect>
    </template>

    <template v-else-if="content && content[0] && content[0].baseProduct">
      <div
        v-if="content[0].baseProduct.title"
        class="product__size-chart__title"
      >
        {{ content[0].baseProduct.title }}
      </div>
    </template>

    <SizeChartContent :size-chart="sizeChartDefault"></SizeChartContent>
  </Modal>
</template>

<script>
import { getCoreMixin } from '../../shared/mixin'
import BaseSelect from '../../components/BaseSelect'
import Modal from '../../components/Modal'
import Content from './Content'

export default {
  name: 'SizeChart',
  components: {
    BaseSelect,
    Modal,
    SizeChartContent: Content,
  },
  mixins: [getCoreMixin('sizeChartMixin')],
  methods: {
    onClose() {
      this.$emit('close')
    },
  },
}
</script>
