<template>
  <div class="textarea-base">
    <label v-if="label" class="d-block has-text-weight-bold">{{ label }}</label>
    <textarea
      ref="textarea"
      class="w-100 s-textarea"
      :class="{
        'brdr-cl-red': validations.filter((validation) => validation.condition)
          .length,
      }"
      :value="nativeInputValue"
      v-bind="$attrs"
      @input="onInput"
    >
    </textarea>

    <ValidationMessages v-if="validations" :validations="validations" />
  </div>
</template>
<script>
import ValidationMessages from './ValidationMessages.vue'
export default {
  name: 'BaseTextarea',
  components: {
    ValidationMessages,
  },
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    validations: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    nativeInputValue() {
      return this.value === null || this.value === undefined ? '' : this.value
    },
  },
  methods: {
    onInput(event) {
      if (event.target.value !== this.value) {
        this.$emit('input', event.target.value)
      }
    },
  },
}
</script>
