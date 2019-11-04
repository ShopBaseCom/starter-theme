<template>
  <div v-if="validations">
    <span
      v-for="(validation, index) in validations"
      v-show="validation.condition"
      :key="index"
      class="d-block cl-red display-8 mt5"
    >
      {{ validation.text }}
    </span>
  </div>
</template>
<script>
export default {
  props: {
    validations: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
