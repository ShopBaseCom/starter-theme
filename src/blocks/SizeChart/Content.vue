<template>
  <div v-html="sizeChart.description_html"></div>
</template>

<script>
import { getCoreMixin } from '../../shared/mixin'

export default {
  name: 'SizeChartContent',
  mixins: [getCoreMixin('sizeChartContentMixin')],
}
</script>
