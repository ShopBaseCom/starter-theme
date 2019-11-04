<template>
  <div class="base-checkbox">
    <label
      ref="label"
      class="relative s-checkbox"
      @click="focus"
      @keydown.prevent.enter="$refs.label.click()"
    >
      <input
        ref="input"
        v-model="computedValue"
        class="m0"
        type="checkbox"
        :disabled="disabled"
        :indeterminate.prop="indeterminate"
        :name="name"
        :value="nativeValue"
        :true-value="trueValue"
        :false-value="falseValue"
        @keyup.enter="$emit('click')"
        @click="$emit('click')"
        @blur="$emit('blur')"
        @change="$emit('change')"
      />
      <span class="s-check pointer"></span>
      <span class="pl6 pointer">
        <slot />
      </span>
    </label>
    <ValidationMessages v-if="validations" :validations="validations" />
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages.vue'

export default {
  name: 'BaseCheckbox',
  components: {
    ValidationMessages,
  },
  props: {
    value: {
      type: [Boolean, String, Number, Array],
      required: true,
    },
    nativeValue: {
      type: [Boolean, String, Number, Array],
      required: true,
    },
    indeterminate: Boolean,
    name: {
      type: String,
      default: null,
    },
    trueValue: {
      type: [String, Number, Boolean, Array],
      default: true,
    },
    falseValue: {
      type: [String, Number, Boolean, Array],
      default: false,
    },
    validations: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      newValue: this.value,
    }
  },
  computed: {
    computedValue: {
      get() {
        return this.newValue
      },
      set(value) {
        this.newValue = value
        this.$emit('input', value)
      },
    },
  },
  watch: {
    /**
     * When v-model change, set internal value.
     */
    value(value) {
      this.newValue = value
    },
  },
  methods: {
    focus() {
      // MacOS FireFox and Safari do not focus when clicked
      this.$refs.input.focus()
    },
  },
}
</script>
