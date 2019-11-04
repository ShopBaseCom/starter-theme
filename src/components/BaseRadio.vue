<template>
  <div class="base-radio">
    <label
      ref="label"
      class="relative s-radio"
      :class="{ 'is-disabled': disabled }"
      :disabled="disabled"
      @click="focus"
      @keydown.prevent.enter="$refs.label.click()"
    >
      <input
        ref="input"
        v-model="computedValue"
        type="radio"
        :disabled="disabled"
        :name="name"
        :value="nativeValue"
        @click.stop
      />
      <span class="s-check pointer" :class="type"></span>
      <span class="control-label pointer pl6">
        <slot />
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'BaseRadio',
  props: {
    value: {
      type: [String, Number, Boolean],
      required: true,
    },
    nativeValue: {
      type: [String, Number, Boolean],
      required: true,
    },
    type: {
      type: String,
      default: '',
    },
    disabled: Boolean,
    name: {
      type: String,
      default: null,
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
